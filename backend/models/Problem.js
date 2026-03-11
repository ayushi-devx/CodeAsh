import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
  explanation: String
});

const exampleSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: String
});

const starterCodeSchema = new mongoose.Schema({
  language: { type: String, required: true },
  code: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  companies: [{
    type: String,
    trim: true
  }],
  externalLinks: {
    leetcode: String,
    gfg: String,
    youtube: String
  },
  acceptanceRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  constraints: [String],
  examples: [exampleSchema],
  testCases: [testCaseSchema],
  starterCode: [starterCodeSchema],
  solution: {
    type: String,
    select: false // Only admins can see
  },
  editorial: {
    type: String,
    default: ''
  },
  hints: [String],
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  totalSubmissions: {
    type: Number,
    default: 0
  },
  totalAccepted: {
    type: Number,
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  videoUrl: String,
  coderArmyVideo: String,
  discussionCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
problemSchema.index({ difficulty: 1 });
problemSchema.index({ tags: 1 });
problemSchema.index({ companies: 1 });
problemSchema.index({ acceptanceRate: -1 });
problemSchema.index({ totalSubmissions: -1 });
problemSchema.index({ slug: 1 });

// Virtual for acceptance rate calculation
problemSchema.virtual('calculatedAcceptanceRate').get(function() {
  if (this.totalSubmissions === 0) return 0;
  return ((this.totalAccepted / this.totalSubmissions) * 100).toFixed(1);
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
