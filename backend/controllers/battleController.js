import Battle from '../models/Battle.js';
import Problem from '../models/Problem.js';
import User from '../models/User.js';

// Matchmaking queue
const matchmakingQueue = new Map(); // difficulty -> [userId]

// Create room match
export const createRoom = async (req, res) => {
  try {
    const { difficulty } = req.body;
    const userId = req.user.id;

    // Get random problem of difficulty
    const problems = await Problem.find({ difficulty });
    if (problems.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No problems found for this difficulty'
      });
    }

    const randomProblem = problems[Math.floor(Math.random() * problems.length)];

    // Generate unique room code
    let roomCode;
    let isUnique = false;
    while (!isUnique) {
      roomCode = Battle.generateRoomCode();
      const existing = await Battle.findOne({ roomCode });
      if (!existing) isUnique = true;
    }

    // Get user info
    const user = await User.findById(userId);

    // Create battle
    const battle = await Battle.create({
      roomCode,
      type: 'room',
      difficulty,
      problem: randomProblem._id,
      players: [{
        userId,
        username: user.firstName,
        rating: user.battleRating || 1200,
        status: 'ready'
      }],
      status: 'waiting'
    });

    await battle.populate('problem');

    res.json({
      success: true,
      data: {
        battleId: battle._id,
        roomCode: battle.roomCode,
        problem: battle.problem,
        difficulty: battle.difficulty
      }
    });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating room',
      error: error.message
    });
  }
};

// Join room match
export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.body;
    const userId = req.user.id;

    const battle = await Battle.findOne({ roomCode }).populate('problem');

    if (!battle) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    if (battle.status !== 'waiting') {
      return res.status(400).json({
        success: false,
        message: 'Battle already started or completed'
      });
    }

    if (battle.players.length >= 2) {
      return res.status(400).json({
        success: false,
        message: 'Room is full'
      });
    }

    // Check if user already in room
    if (battle.players.some(p => p.userId.equals(userId))) {
      return res.status(400).json({
        success: false,
        message: 'You are already in this room'
      });
    }

    // Get user info
    const user = await User.findById(userId);

    // Add player
    battle.players.push({
      userId,
      username: user.firstName,
      rating: user.battleRating || 1200,
      status: 'ready'
    });

    // Start battle if 2 players
    if (battle.players.length === 2) {
      battle.status = 'ready';
    }

    await battle.save();

    res.json({
      success: true,
      data: {
        battleId: battle._id,
        problem: battle.problem,
        players: battle.players,
        status: battle.status
      }
    });
  } catch (error) {
    console.error('Join room error:', error);
    res.status(500).json({
      success: false,
      message: 'Error joining room',
      error: error.message
    });
  }
};

// Find random match
export const findMatch = async (req, res) => {
  try {
    const { difficulty } = req.body;
    const userId = req.user.id;

    // Check if user already in queue
    for (const [diff, queue] of matchmakingQueue.entries()) {
      const index = queue.findIndex(id => id === userId);
      if (index !== -1) {
        queue.splice(index, 1);
      }
    }

    // Get or create queue for difficulty
    if (!matchmakingQueue.has(difficulty)) {
      matchmakingQueue.set(difficulty, []);
    }

    const queue = matchmakingQueue.get(difficulty);

    // If someone waiting, match them
    if (queue.length > 0) {
      const opponentId = queue.shift();

      // Get random problem
      const problems = await Problem.find({ difficulty });
      const randomProblem = problems[Math.floor(Math.random() * problems.length)];

      // Get users
      const user = await User.findById(userId);
      const opponent = await User.findById(opponentId);

      // Create battle
      const battle = await Battle.create({
        type: 'random',
        difficulty,
        problem: randomProblem._id,
        players: [
          {
            userId,
            username: user.firstName,
            rating: user.battleRating || 1200,
            status: 'ready'
          },
          {
            userId: opponentId,
            username: opponent.firstName,
            rating: opponent.battleRating || 1200,
            status: 'ready'
          }
        ],
        status: 'ready'
      });

      await battle.populate('problem');

      res.json({
        success: true,
        matched: true,
        data: {
          battleId: battle._id,
          problem: battle.problem,
          opponent: {
            username: opponent.firstName,
            rating: opponent.battleRating || 1200
          }
        }
      });
    } else {
      // Add to queue
      queue.push(userId);

      res.json({
        success: true,
        matched: false,
        message: 'Searching for opponent...'
      });
    }
  } catch (error) {
    console.error('Find match error:', error);
    res.status(500).json({
      success: false,
      message: 'Error finding match',
      error: error.message
    });
  }
};

// Start battle
export const startBattle = async (req, res) => {
  try {
    const { battleId } = req.params;
    const userId = req.user.id;

    const battle = await Battle.findById(battleId).populate('problem');

    if (!battle) {
      return res.status(404).json({
        success: false,
        message: 'Battle not found'
      });
    }

    // Check if user is in battle
    const player = battle.players.find(p => p.userId.equals(userId));
    if (!player) {
      return res.status(403).json({
        success: false,
        message: 'You are not in this battle'
      });
    }

    if (battle.status !== 'ready') {
      return res.status(400).json({
        success: false,
        message: 'Battle cannot be started'
      });
    }

    // Start battle
    battle.status = 'in-progress';
    battle.startTime = new Date();
    battle.players.forEach(p => p.status = 'coding');

    await battle.save();

    res.json({
      success: true,
      data: {
        battle,
        timeLimit: battle.timeLimit
      }
    });
  } catch (error) {
    console.error('Start battle error:', error);
    res.status(500).json({
      success: false,
      message: 'Error starting battle',
      error: error.message
    });
  }
};

// Submit solution
export const submitSolution = async (req, res) => {
  try {
    const { battleId } = req.params;
    const { code, language, testsPassed, totalTests } = req.body;
    const userId = req.user.id;

    const battle = await Battle.findById(battleId);

    if (!battle) {
      return res.status(404).json({
        success: false,
        message: 'Battle not found'
      });
    }

    const player = battle.players.find(p => p.userId.equals(userId));
    if (!player) {
      return res.status(403).json({
        success: false,
        message: 'You are not in this battle'
      });
    }

    // Update player
    player.code = code;
    player.language = language;
    player.testsPassed = testsPassed;
    player.totalTests = totalTests;
    player.status = 'submitted';
    player.submittedAt = new Date();
    player.timeTaken = Math.floor((Date.now() - battle.startTime) / 1000);

    // Check if both submitted
    const allSubmitted = battle.players.every(p => p.status === 'submitted');

    if (allSubmitted) {
      battle.status = 'completed';
      battle.endTime = new Date();
      battle.winner = battle.calculateWinner();

      // Update ELO ratings
      await battle.updateRatings();
    }

    await battle.save();
    await battle.populate('problem');

    res.json({
      success: true,
      data: {
        battle,
        isCompleted: allSubmitted
      }
    });
  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting solution',
      error: error.message
    });
  }
};

// Get battle status
export const getBattleStatus = async (req, res) => {
  try {
    const { battleId } = req.params;

    const battle = await Battle.findById(battleId)
      .populate('problem')
      .populate('winner', 'firstName');

    if (!battle) {
      return res.status(404).json({
        success: false,
        message: 'Battle not found'
      });
    }

    res.json({
      success: true,
      data: battle
    });
  } catch (error) {
    console.error('Get battle status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting battle status',
      error: error.message
    });
  }
};

// Get user battle history
export const getBattleHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const battles = await Battle.find({
      'players.userId': userId,
      status: 'completed'
    })
      .populate('problem', 'title difficulty')
      .populate('winner', 'firstName')
      .sort({ createdAt: -1 })
      .limit(20);

    const user = await User.findById(userId);

    res.json({
      success: true,
      data: {
        battles,
        stats: {
          rating: user.battleRating || 1200,
          played: user.battlesPlayed || 0,
          won: user.battlesWon || 0,
          winRate: user.battlesPlayed > 0 
            ? Math.round((user.battlesWon / user.battlesPlayed) * 100) 
            : 0
        }
      }
    });
  } catch (error) {
    console.error('Get battle history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting battle history',
      error: error.message
    });
  }
};

// Cancel matchmaking
export const cancelMatchmaking = async (req, res) => {
  try {
    const userId = req.user.id;

    // Remove from all queues
    for (const [diff, queue] of matchmakingQueue.entries()) {
      const index = queue.findIndex(id => id === userId);
      if (index !== -1) {
        queue.splice(index, 1);
      }
    }

    res.json({
      success: true,
      message: 'Matchmaking cancelled'
    });
  } catch (error) {
    console.error('Cancel matchmaking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling matchmaking',
      error: error.message
    });
  }
};

export default {
  createRoom,
  joinRoom,
  findMatch,
  startBattle,
  submitSolution,
  getBattleStatus,
  getBattleHistory,
  cancelMatchmaking
};
