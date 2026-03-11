# CodeAsh - LeetCode Style Coding Platform

A modern, production-ready coding platform built with MERN stack featuring real-time code execution, multi-language support, and comprehensive problem-solving features.

## ⚡ Quick Start

### 1. Start Backend
```bash
cd backend
npm start
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Open Browser
```
http://localhost:5174
```

## 🌐 Judge0 Configuration

This platform uses AWS EC2 Judge0 server for code execution:
- **Server**: `http://100.53.209.86:2358`
- **Languages**: 22+ programming languages
- **Configuration**: See `backend/.env`

### Supported Languages:
JavaScript, Python, Java, C++, C, C#, Go, Rust, Kotlin, Swift, TypeScript, PHP, Ruby, Scala, R, Perl, Lua, Haskell, Elixir, Clojure, Bash, SQL

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
- Judge0 (AWS EC2)
- 22+ Programming Languages
- Secure sandboxed execution

---

## 📦 Installation

### Prerequisites
- Node.js 16+
- MongoDB

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
# Edit .env with your configuration:
# - MongoDB URI
# - JWT secret
# - Judge0 URL (already configured for AWS)
```

3. **Seed Database**
```bash
node seedData.js
```

4. **Start Application**
```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
cd ..
npm run dev
```

5. **Open Browser**
```
http://localhost:5174
```

---

## 📚 Documentation

- `README.md` - This file (project overview)
- `backend/README.md` - Backend API documentation
- `backend/.env.example` - Environment variables template

---

## 🧪 Testing

### Test Backend
```bash
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
│   │   ├── Intro/           # Intro sequence
│   │   └── Dashboard/       # Dashboard & Problems
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Auth middleware
│   ├── utils/               # Utilities
│   └── server.js
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

### Backend Issues
```bash
# Check MongoDB connection
# Verify .env configuration
# Ensure port 5000 is available
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Ensure port 5174 is available
```

### Judge0 Issues
- Verify AWS Judge0 server is accessible
- Check `backend/.env` for correct JUDGE0_URL
- Test connection: `curl http://100.53.209.86:2358/about`

---

## 🎉 Success Criteria

✅ Backend API responding
✅ Frontend loading
✅ User can register/login
✅ Problems list showing
✅ Code editor working
✅ Code execution via AWS Judge0
✅ Test cases passing
✅ Submissions saving

---

**Status:** ✅ Production Ready!

**Last Updated:** January 2024
