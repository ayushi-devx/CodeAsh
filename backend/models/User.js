import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const submissionHistorySchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  language: String,
  code: String,
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error']
  },
  runtime: Number,
  memory: Number,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  photoURL: String,
  avatar: String,
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Beginner'
  },
  rank: {
    type: Number,
    default: 0
  },
  solvedProblems: [{
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem'
    },
    solvedAt: {
      type: Date,
      default: Date.now
    },
    language: String,
    runtime: Number,
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard']
    }
  }],
  attemptedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }],
  bookmarkedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }],
  submissions: [submissionHistorySchema],
  battleRating: {
    type: Number,
    default: 1200
  },
  battlesPlayed: {
    type: Number,
    default: 0
  },
  battlesWon: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastSolvedDate: Date,
  totalSubmissions: {
    type: Number,
    default: 0
  },
  acceptedSubmissions: {
    type: Number,
    default: 0
  },
  languageStats: {
    javascript: { type: Number, default: 0 },
    python: { type: Number, default: 0 },
    java: { type: Number, default: 0 },
    cpp: { type: Number, default: 0 },
    c: { type: Number, default: 0 }
  },
  isPremium: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update streak
userSchema.methods.updateStreak = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!this.lastSolvedDate) {
    this.currentStreak = 1;
    this.longestStreak = Math.max(this.longestStreak || 0, 1);
    this.lastSolvedDate = today;
    return;
  }
  
  const lastSolved = new Date(this.lastSolvedDate);
  lastSolved.setHours(0, 0, 0, 0);
  
  const diffTime = today - lastSolved;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  if (diffDays === 0) {
    // Already solved today
    return;
  } else if (diffDays === 1) {
    // Consecutive day
    this.currentStreak += 1;
    this.longestStreak = Math.max(this.longestStreak || 0, this.currentStreak);
    this.lastSolvedDate = today;
  } else {
    // Streak broken
    this.currentStreak = 1;
    this.lastSolvedDate = today;
  }
};

const User = mongoose.model('User', userSchema);

export default User;
