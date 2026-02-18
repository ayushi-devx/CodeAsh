# CodeAsh Problems System - Complete Implementation Guide

## 🚀 Production-Ready LeetCode-Style Coding Platform

This is a comprehensive MERN stack implementation with all features requested.

## 📁 Project Structure

```
codeash/
├── backend/
│   ├── models/
│   │   ├── Problem.js          # Problem schema with test cases
│   │   └── User.js              # User schema with progress tracking
│   ├── controllers/
│   │   ├── problemController.js # Problem CRUD & filters
│   │   └── submissionController.js # Code execution & submission
│   ├── routes/
│   │   ├── problemRoutes.js
│   │   └── submissionRoutes.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── server.js                # Express server
│   ├── seedData.js              # Sample problems
│   └── package.json
├── src/
│   └── components/
│       └── Dashboard/
│           ├── Problems/
│           │   ├── ProblemsList.jsx      # Enhanced with all filters
│           │   ├── ProblemDetail.jsx     # Split view with Monaco
│           │   └── ProblemsContainer.jsx
│           ├── DashboardNavbar.jsx
│           └── Dashboard.jsx
└── README.md
```

## 🎯 Features Implemented

### ✅ Backend (Complete)

1. **MongoDB Schemas**
   - Problem model with test cases, examples, starter code
   - User model with solved/attempted tracking, streak counter
   - Submission history with runtime/memory stats

2. **REST API Endpoints**
   - `GET /api/problems` - List with filters (difficulty, tags, companies, search)
   - `GET /api/problems/:slug` - Get single problem
   - `GET /api/problems/stats` - User statistics
   - `POST /api/problems/:id/bookmark` - Toggle bookmark
   - `POST /api/submissions/run` - Run code with test cases
   - `POST /api/submissions/submit` - Submit solution

3. **Code Execution Engine**
   - Judge0 API integration
   - Support for JavaScript, Python, Java, C++, C
   - Sandbox execution with time/memory limits
   - Public & hidden test cases
   - Runtime and memory tracking

4. **User Progress Tracking**
   - Solved/attempted problems
   - Daily streak counter
   - Language statistics
   - Submission history
   - Acceptance rate calculation

### ✅ Frontend Features

1. **Problems List Page**
   - Search by title/tags
   - Filter by difficulty, status, tags, companies
   - Sort by: Most Solved, Acceptance, Newest, Difficulty
   - Bookmark functionality
   - Status indicators (solved/attempted/unsolved)
   - Progress bar and statistics
   - Premium badge support
   - Infinite scroll ready

2. **Problem Detail Page**
   - Split view layout (description + editor)
   - Monaco Editor with VS Code features
   - Multi-language support
   - Syntax highlighting
   - Test case execution
   - Custom test input
   - Results with pass/fail indicators
   - Runtime and memory display

3. **User Experience**
   - Loading skeletons
   - Smooth animations
   - Toast notifications ready
   - Keyboard shortcuts ready
   - Auto-save in localStorage
   - Responsive design

## 🛠️ Setup Instructions

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Environment Variables**
Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeash
JWT_SECRET=your_secret_key_here
JUDGE0_API_KEY=your_judge0_api_key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

3. **Get Judge0 API Key**
- Sign up at RapidAPI: https://rapidapi.com/judge0-official/api/judge0-ce
- Subscribe to free tier
- Copy API key to `.env`

4. **Start MongoDB**
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

5. **Seed Database**
```bash
node seedData.js
```

6. **Start Server**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. **Install Axios**
```bash
cd ..
npm install axios
```

2. **Update API Base URL**
In components, change `http://localhost:5000` to your backend URL

3. **Start Frontend**
```bash
npm run dev
```

## 🎨 UI Components Status

### ✅ Completed
- DashboardNavbar with all sections
- ProblemsList with advanced filters
- ProblemDetail with Monaco Editor
- User profile dropdown
- Notifications panel
- Stats dashboard

### 🔄 Ready to Implement
- Contest section
- Game Room
- ChatnCode
- Streak Dashboard
- AI Interview Prep

## 📊 Database Schema

### Problem Schema
```javascript
{
  title: String,
  slug: String (unique),
  description: String,
  difficulty: Enum['Easy', 'Medium', 'Hard'],
  tags: [String],
  companies: [String],
  acceptanceRate: Number,
  constraints: [String],
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  testCases: [{
    input: String,
    output: String,
    isHidden: Boolean
  }],
  starterCode: [{
    language: String,
    code: String
  }],
  hints: [String],
  likes: Number,
  totalSubmissions: Number,
  totalAccepted: Number,
  isPremium: Boolean
}
```

### User Schema
```javascript
{
  firstName: String,
  email: String (unique),
  password: String (hashed),
  level: Enum['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  rank: Number,
  solvedProblems: [{
    problemId: ObjectId,
    solvedAt: Date,
    language: String,
    runtime: Number
  }],
  attemptedProblems: [ObjectId],
  bookmarkedProblems: [ObjectId],
  submissions: [{
    problemId: ObjectId,
    language: String,
    code: String,
    status: String,
    runtime: Number,
    memory: Number,
    submittedAt: Date
  }],
  streakCount: Number,
  lastSolvedDate: Date,
  languageStats: {
    javascript: Number,
    python: Number,
    java: Number,
    cpp: Number,
    c: Number
  }
}
```

## 🔐 Authentication Flow

1. User signs up/logs in
2. JWT token generated
3. Token stored in localStorage as `codeash_token`
4. Token sent in Authorization header: `Bearer <token>`
5. Protected routes verify token

## 🎯 Code Execution Flow

1. User writes code in Monaco Editor
2. Click "Run" → POST to `/api/submissions/run`
3. Backend sends code to Judge0 API
4. Judge0 executes in sandbox
5. Results returned (stdout, stderr, time, memory)
6. Frontend displays test case results

## 📝 Adding New Problems

Use the seed data format:

```javascript
{
  title: 'Problem Title',
  slug: 'problem-title',
  description: 'Problem description...',
  difficulty: 'Medium',
  tags: ['Array', 'Hash Table'],
  companies: ['Google', 'Amazon'],
  examples: [
    {
      input: 'nums = [1,2,3]',
      output: '6',
      explanation: 'Sum of all elements'
    }
  ],
  testCases: [
    { input: '[1,2,3]', output: '6', isHidden: false },
    { input: '[5,5,5]', output: '15', isHidden: true }
  ],
  starterCode: [
    {
      language: 'javascript',
      code: 'function solve(nums) {\n    // Your code here\n}'
    }
  ],
  hints: ['Try using a loop', 'Consider edge cases']
}
```

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Push to GitHub
2. Connect to Railway/Heroku
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy dist folder
3. Update API URLs

### Database (MongoDB Atlas)
1. Create cluster
2. Get connection string
3. Update MONGODB_URI

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#22c55e',  // Green
  secondary: '#10b981', // Emerald
}
```

### Monaco Editor Theme
In `ProblemDetail.jsx`, modify `codeash-dark` theme

## 📱 Responsive Design

- Mobile: Stack layout vertically
- Tablet: 2-column grid
- Desktop: Full split view

## ⚡ Performance Optimizations

1. **Database Indexes**
   - Indexed on difficulty, tags, companies
   - Slug index for fast lookups

2. **Frontend**
   - Lazy loading components
   - Debounced search
   - Virtualized lists for 1000+ problems

3. **Code Execution**
   - Async execution
   - Result caching
   - Rate limiting

## 🔒 Security

1. **JWT Authentication**
2. **Password Hashing** (bcrypt)
3. **Sandbox Execution** (Judge0)
4. **Input Validation**
5. **Rate Limiting** (ready to add)
6. **CORS Configuration**

## 📈 Next Steps

1. Add more problems (use seedData.js format)
2. Implement Contest system
3. Add Discussion forum
4. Create Editorial section
5. Build AI Hint system
6. Add Code Review feature
7. Implement Leaderboard
8. Create Company-wise problem lists

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify .env file exists
- Check port 5000 is available

### Code execution fails
- Verify Judge0 API key
- Check RapidAPI subscription
- Test with simple code first

### Frontend can't connect
- Check backend URL in axios calls
- Verify CORS is enabled
- Check network tab for errors

## 📚 Resources

- Judge0 API: https://judge0.com
- Monaco Editor: https://microsoft.github.io/monaco-editor/
- MongoDB: https://www.mongodb.com/docs/
- Express: https://expressjs.com/

## 🎉 Features Ready to Use

✅ Problem listing with filters
✅ Problem detail with Monaco Editor  
✅ Code execution with Judge0
✅ User authentication
✅ Progress tracking
✅ Streak counter
✅ Bookmark system
✅ Multi-language support
✅ Test case validation
✅ Runtime/memory tracking

## 💡 Tips

1. Start backend first, then frontend
2. Test with simple problems first
3. Monitor Judge0 API usage
4. Use MongoDB Compass for database viewing
5. Check browser console for errors

---

**Built with ❤️ for CodeAsh Platform**
