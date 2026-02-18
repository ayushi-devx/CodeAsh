# CodeAsh - LeetCode Style Coding Platform

A modern, production-ready coding platform built with MERN stack featuring real-time code execution, multi-language support, and comprehensive problem-solving features.

## ⚠️ IMPORTANT: Judge0 Setup

### Local Docker Doesn't Work on Windows!

Judge0 requires Linux cgroups which don't work in Docker Desktop on Windows. 

**Solution:** Use RapidAPI Judge0 (FREE & Easy)

### Quick Setup (5 minutes):

1. **Get RapidAPI Key:**
   - Go to: https://rapidapi.com/judge0-official/api/judge0-ce
   - Sign up & subscribe to Basic plan (FREE - 50 requests/day)
   - Copy your API key

2. **Update `backend/.env`:**
   ```env
   JUDGE0_LOCAL=false
   JUDGE0_API_KEY=your_key_here
   JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
   ```

3. **Start servers and test!**

See `GET_RAPIDAPI_KEY.md` for detailed instructions.

---

## 🚀 Features

### ✅ Completed
- **Landing Page** - Hero, achievements, reviews, contact form
- **Authentication** - JWT-based login/register with bcrypt
- **Dashboard** - Modern navbar with multiple sections
- **Problems Section** - Full LeetCode-style problem solving
  - Problems list with filters (difficulty, tags, companies)
  - Monaco code editor with 5 languages
  - Real-time code execution via Judge0
  - Test case validation
  - Submission tracking
- **Backend API** - Complete REST API with MongoDB
- **Judge0 Integration** - Local Docker setup for code execution

### 🔄 In Progress
- Contest section
- Game Room
- ChatnCode collaboration
- Streak Dashboard
- AI Interview Prep

---

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- TailwindCSS
- Monaco Editor
- Axios
- React Router

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt

### Code Execution
- Judge0 (Local Docker)
- Redis
- PostgreSQL
- Multi-language support (JS, Python, C++, Java, C)

---

## 📦 Installation

### Prerequisites
- Node.js 16+
- MongoDB
- Docker Desktop

### Setup

1. **Clone and Install**
```bash
cd leet/codeash
npm install
cd backend
npm install
```

2. **Configure Environment**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. **Start Judge0**
```bash
cd ../judge0
docker-compose up -d
```

4. **Seed Database**
```bash
cd ../backend
node seedData.js
```

5. **Start Servers**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd ..
npm run dev
```

6. **Open Browser**
```
http://localhost:5174
```

---

## 📚 Documentation

- `JUDGE0_FIXED.md` - Judge0 fix details and testing
- `RESTART_COMMANDS.md` - Quick command reference
- `CURRENT_STATUS.md` - Full project status
- `backend/README.md` - Backend API documentation
- `judge0/REDIS_FIX.md` - Detailed troubleshooting

---

## 🧪 Testing

### Test Judge0
```bash
node test-judge0-fixed.js
```

### Test Backend
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/problems
```

### Test in Browser
1. Register/Login
2. Go to Problems
3. Select "Two Sum"
4. Click "Run Code"
5. Verify test cases pass ✅

---

## 📁 Project Structure

```
leet/codeash/
├── src/
│   ├── components/
│   │   ├── Layout/          # Landing page components
│   │   └── Dashboard/       # Dashboard & Problems
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Auth middleware
│   └── server.js
├── judge0/
│   ├── docker-compose.yml   # ✅ Fixed
│   └── judge0.conf
└── package.json
```

---

## 🎯 API Endpoints

### Problems
- `GET /api/problems` - List all problems
- `GET /api/problems/:slug` - Get single problem

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Submissions
- `POST /api/submissions/run` - Run code with test cases
- `POST /api/submissions/submit` - Submit solution

---

## 🐛 Troubleshooting

### Judge0 Issues
```bash
# Check containers
docker ps

# View logs
docker logs judge0
docker logs judge0-redis

# Restart
cd judge0
docker-compose restart
```

### Backend Issues
```bash
# Check MongoDB connection
# Check .env file
# Verify port 5000 is free
```

### Frontend Issues
```bash
# Clear node_modules
rm -rf node_modules
npm install

# Check port 5174 is free
```

---

## 🎉 Success Criteria

✅ Judge0 containers running
✅ Backend API responding
✅ Frontend loading
✅ User can register/login
✅ Problems list showing
✅ Code editor working
✅ Test cases passing
✅ Submissions saving

---

## 📝 Next Steps

1. Test all features in browser
2. Add more problems
3. Implement Contest section
4. Build Game Room
5. Create ChatnCode
6. Add Streak Dashboard
7. Develop AI Interview Prep

---

## 🤝 Contributing

This is a learning project. Feel free to explore and modify!

---

## 📄 License

MIT

---

**Status:** ✅ Judge0 Fixed - Ready to Use!

**Last Updated:** After Redis authentication fix
