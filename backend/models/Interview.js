import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  expectedTopics: [String],
  userAnswer: {
    type: String,
    default: ''
  },
  transcript: String,
  timeSpent: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  feedback: String,
  answeredAt: Date
});

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Data Scientist',
      'DevOps Engineer',
      'Mobile Developer',
      'Machine Learning Engineer',
      'Product Manager'
    ]
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Staff/Principal']
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  questions: [questionSchema],
  currentQuestionIndex: {
    type: Number,
    default: 0
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  strengths: [String],
  improvements: [String],
  recommendations: [String],
  videoPresenceScore: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'abandoned'],
    default: 'in-progress'
  },
  totalTimeSpent: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate overall score
interviewSchema.methods.calculateOverallScore = function() {
  if (this.questions.length === 0) return 0;
  
  const totalScore = this.questions.reduce((sum, q) => sum + q.score, 0);
  this.overallScore = (totalScore / this.questions.length) * 10; // Convert to 100 scale
  return this.overallScore;
};

// Get completion percentage
interviewSchema.virtual('completionPercentage').get(function() {
  if (this.questions.length === 0) return 0;
  const answeredQuestions = this.questions.filter(q => q.userAnswer).length;
  return (answeredQuestions / this.questions.length) * 100;
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
