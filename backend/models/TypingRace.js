import mongoose from 'mongoose';

const typingRaceSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    unique: true,
    sparse: true
  },
  language: {
    type: String,
    enum: ['javascript', 'python', 'cpp', 'java'],
    default: 'javascript'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  codeSnippet: {
    type: String,
    required: true
  },
  players: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: String,
    progress: {
      type: Number,
      default: 0
    },
    wpm: {
      type: Number,
      default: 0
    },
    accuracy: {
      type: Number,
      default: 100
    },
    currentPosition: {
      type: Number,
      default: 0
    },
    errors: {
      type: Number,
      default: 0
    },
    finishedAt: Date,
    timeTaken: Number, // in seconds
    rank: Number
  }],
  status: {
    type: String,
    enum: ['waiting', 'countdown', 'racing', 'completed'],
    default: 'waiting'
  },
  maxPlayers: {
    type: Number,
    default: 4
  },
  startTime: Date,
  endTime: Date,
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique room code
typingRaceSchema.statics.generateRoomCode = function() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Calculate WPM
typingRaceSchema.methods.calculateWPM = function(userId, timeTaken) {
  const player = this.players.find(p => p.userId.equals(userId));
  if (!player) return 0;
  
  const words = this.codeSnippet.split(' ').length;
  const minutes = timeTaken / 60;
  return Math.round(words / minutes);
};

// Determine winner and ranks
typingRaceSchema.methods.determineWinner = function() {
  const finishedPlayers = this.players
    .filter(p => p.finishedAt)
    .sort((a, b) => a.timeTaken - b.timeTaken);
  
  if (finishedPlayers.length === 0) return null;
  
  // Assign ranks
  finishedPlayers.forEach((player, index) => {
    player.rank = index + 1;
  });
  
  return finishedPlayers[0].userId;
};

const TypingRace = mongoose.model('TypingRace', typingRaceSchema);

export default TypingRace;
