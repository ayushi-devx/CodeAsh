import TypingRace from '../models/TypingRace.js';
import User from '../models/User.js';
import { getRandomSnippet } from '../data/codeSnippets.js';

// Create race room
export const createRace = async (req, res) => {
  try {
    const { language, difficulty } = req.body;
    const userId = req.user.id;

    // Get random code snippet
    const codeSnippet = getRandomSnippet(language, difficulty);

    // Generate unique room code
    let roomCode;
    let isUnique = false;
    while (!isUnique) {
      roomCode = TypingRace.generateRoomCode();
      const existing = await TypingRace.findOne({ roomCode });
      if (!existing) isUnique = true;
    }

    // Get user info
    const user = await User.findById(userId);

    // Create race
    const race = await TypingRace.create({
      roomCode,
      language,
      difficulty,
      codeSnippet,
      players: [{
        userId,
        username: user.firstName,
        progress: 0,
        wpm: 0,
        accuracy: 100,
        currentPosition: 0,
        errors: 0
      }],
      status: 'waiting'
    });

    res.json({
      success: true,
      data: {
        raceId: race._id,
        roomCode: race.roomCode,
        language: race.language,
        difficulty: race.difficulty
      }
    });
  } catch (error) {
    console.error('Create race error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating race',
      error: error.message
    });
  }
};

// Join race room
export const joinRace = async (req, res) => {
  try {
    const { roomCode } = req.body;
    const userId = req.user.id;

    const race = await TypingRace.findOne({ roomCode });

    if (!race) {
      return res.status(404).json({
        success: false,
        message: 'Race room not found'
      });
    }

    if (race.status !== 'waiting') {
      return res.status(400).json({
        success: false,
        message: 'Race already started or completed'
      });
    }

    if (race.players.length >= race.maxPlayers) {
      return res.status(400).json({
        success: false,
        message: 'Race room is full'
      });
    }

    // Check if user already in race
    if (race.players.some(p => p.userId.equals(userId))) {
      return res.status(400).json({
        success: false,
        message: 'You are already in this race'
      });
    }

    // Get user info
    const user = await User.findById(userId);

    // Add player
    race.players.push({
      userId,
      username: user.firstName,
      progress: 0,
      wpm: 0,
      accuracy: 100,
      currentPosition: 0,
      errors: 0
    });

    await race.save();

    res.json({
      success: true,
      data: {
        raceId: race._id,
        players: race.players,
        status: race.status
      }
    });
  } catch (error) {
    console.error('Join race error:', error);
    res.status(500).json({
      success: false,
      message: 'Error joining race',
      error: error.message
    });
  }
};

// Start race
export const startRace = async (req, res) => {
  try {
    const { raceId } = req.params;
    const userId = req.user.id;

    const race = await TypingRace.findById(raceId);

    if (!race) {
      return res.status(404).json({
        success: false,
        message: 'Race not found'
      });
    }

    // Check if user is in race
    const player = race.players.find(p => p.userId.equals(userId));
    if (!player) {
      return res.status(403).json({
        success: false,
        message: 'You are not in this race'
      });
    }

    if (race.status !== 'waiting') {
      return res.status(400).json({
        success: false,
        message: 'Race cannot be started'
      });
    }

    // Start race
    race.status = 'countdown';
    race.startTime = new Date();

    await race.save();

    res.json({
      success: true,
      data: {
        race,
        codeSnippet: race.codeSnippet
      }
    });
  } catch (error) {
    console.error('Start race error:', error);
    res.status(500).json({
      success: false,
      message: 'Error starting race',
      error: error.message
    });
  }
};

// Update progress
export const updateProgress = async (req, res) => {
  try {
    const { raceId } = req.params;
    const { currentPosition, errors, wpm, accuracy } = req.body;
    const userId = req.user.id;

    const race = await TypingRace.findById(raceId);

    if (!race) {
      return res.status(404).json({
        success: false,
        message: 'Race not found'
      });
    }

    const player = race.players.find(p => p.userId.equals(userId));
    if (!player) {
      return res.status(403).json({
        success: false,
        message: 'You are not in this race'
      });
    }

    // Update player progress
    player.currentPosition = currentPosition;
    player.errors = errors;
    player.wpm = wpm;
    player.accuracy = accuracy;
    player.progress = Math.round((currentPosition / race.codeSnippet.length) * 100);

    await race.save();

    res.json({
      success: true,
      data: {
        progress: player.progress,
        wpm: player.wpm,
        accuracy: player.accuracy
      }
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
};

// Finish race
export const finishRace = async (req, res) => {
  try {
    const { raceId } = req.params;
    const userId = req.user.id;

    const race = await TypingRace.findById(raceId);

    if (!race) {
      return res.status(404).json({
        success: false,
        message: 'Race not found'
      });
    }

    const player = race.players.find(p => p.userId.equals(userId));
    if (!player) {
      return res.status(403).json({
        success: false,
        message: 'You are not in this race'
      });
    }

    // Mark player as finished
    player.finishedAt = new Date();
    player.timeTaken = Math.floor((player.finishedAt - race.startTime) / 1000);
    player.progress = 100;

    // Calculate final WPM
    player.wpm = race.calculateWPM(userId, player.timeTaken);

    // Check if all players finished
    const allFinished = race.players.every(p => p.finishedAt);

    if (allFinished || race.players.filter(p => p.finishedAt).length === race.players.length) {
      race.status = 'completed';
      race.endTime = new Date();
      race.winner = race.determineWinner();
    }

    await race.save();

    res.json({
      success: true,
      data: {
        race,
        isCompleted: race.status === 'completed',
        rank: player.rank
      }
    });
  } catch (error) {
    console.error('Finish race error:', error);
    res.status(500).json({
      success: false,
      message: 'Error finishing race',
      error: error.message
    });
  }
};

// Get race status
export const getRaceStatus = async (req, res) => {
  try {
    const { raceId } = req.params;

    const race = await TypingRace.findById(raceId)
      .populate('winner', 'firstName');

    if (!race) {
      return res.status(404).json({
        success: false,
        message: 'Race not found'
      });
    }

    res.json({
      success: true,
      data: race
    });
  } catch (error) {
    console.error('Get race status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting race status',
      error: error.message
    });
  }
};

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const { language, difficulty } = req.query;

    const query = { status: 'completed' };
    if (language) query.language = language;
    if (difficulty) query.difficulty = difficulty;

    const races = await TypingRace.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    // Extract all winners with their stats
    const leaderboard = [];
    
    for (const race of races) {
      const winner = race.players.find(p => p.userId.equals(race.winner));
      if (winner) {
        leaderboard.push({
          userId: winner.userId,
          username: winner.username,
          wpm: winner.wpm,
          accuracy: winner.accuracy,
          timeTaken: winner.timeTaken,
          language: race.language,
          difficulty: race.difficulty,
          date: race.endTime
        });
      }
    }

    // Sort by WPM
    leaderboard.sort((a, b) => b.wpm - a.wpm);

    res.json({
      success: true,
      data: leaderboard.slice(0, 50)
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting leaderboard',
      error: error.message
    });
  }
};

export default {
  createRace,
  joinRace,
  startRace,
  updateProgress,
  finishRace,
  getRaceStatus,
  getLeaderboard
};
