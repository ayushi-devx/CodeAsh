import mongoose from 'mongoose';

const battleSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    unique: true,
    sparse: true
  },
  type: {
    type: String,
    enum: ['random', 'room'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  players: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: String,
    rating: Number,
    status: {
      type: String,
      enum: ['waiting', 'ready', 'coding', 'submitted', 'disconnected'],
      default: 'waiting'
    },
    code: String,
    language: String,
    testsPassed: {
      type: Number,
      default: 0
    },
    totalTests: {
      type: Number,
      default: 0
    },
    submittedAt: Date,
    timeTaken: Number // in seconds
  }],
  status: {
    type: String,
    enum: ['waiting', 'ready', 'in-progress', 'completed', 'cancelled'],
    default: 'waiting'
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  startTime: Date,
  endTime: Date,
  timeLimit: {
    type: Number,
    default: 2700 // 45 minutes in seconds
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique room code
battleSchema.statics.generateRoomCode = function() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Calculate winner
battleSchema.methods.calculateWinner = function() {
  const completedPlayers = this.players.filter(p => p.status === 'submitted');
  
  if (completedPlayers.length === 0) return null;
  
  // Sort by: tests passed (desc), then time taken (asc)
  completedPlayers.sort((a, b) => {
    if (b.testsPassed !== a.testsPassed) {
      return b.testsPassed - a.testsPassed;
    }
    return a.timeTaken - b.timeTaken;
  });
  
  return completedPlayers[0].userId;
};

// Update ELO ratings
battleSchema.methods.updateRatings = async function() {
  if (this.players.length !== 2) return;
  
  const [player1, player2] = this.players;
  const User = mongoose.model('User');
  
  const user1 = await User.findById(player1.userId);
  const user2 = await User.findById(player2.userId);
  
  if (!user1 || !user2) return;
  
  const K = 32; // K-factor
  const rating1 = user1.battleRating || 1200;
  const rating2 = user2.battleRating || 1200;
  
  // Expected scores
  const expected1 = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
  const expected2 = 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
  
  // Actual scores
  let actual1, actual2;
  if (this.winner.equals(player1.userId)) {
    actual1 = 1;
    actual2 = 0;
  } else if (this.winner.equals(player2.userId)) {
    actual1 = 0;
    actual2 = 1;
  } else {
    actual1 = 0.5;
    actual2 = 0.5;
  }
  
  // New ratings
  const newRating1 = Math.round(rating1 + K * (actual1 - expected1));
  const newRating2 = Math.round(rating2 + K * (actual2 - expected2));
  
  // Update users
  user1.battleRating = newRating1;
  user1.battlesPlayed = (user1.battlesPlayed || 0) + 1;
  if (actual1 === 1) user1.battlesWon = (user1.battlesWon || 0) + 1;
  
  user2.battleRating = newRating2;
  user2.battlesPlayed = (user2.battlesPlayed || 0) + 1;
  if (actual2 === 1) user2.battlesWon = (user2.battlesWon || 0) + 1;
  
  await user1.save();
  await user2.save();
  
  return {
    player1: { old: rating1, new: newRating1, change: newRating1 - rating1 },
    player2: { old: rating2, new: newRating2, change: newRating2 - rating2 }
  };
};

const Battle = mongoose.model('Battle', battleSchema);

export default Battle;
