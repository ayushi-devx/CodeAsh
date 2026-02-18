# 🚀 CodeAsh - Complete Setup Guide (With Docker Judge0)

## Overview

Yeh guide aapko step-by-step batayegi ki kaise CodeAsh platform ko setup karein with local Judge0 Docker instance.

## Prerequisites

✅ Node.js (v16+)
✅ MongoDB
✅ Docker Desktop
✅ Git

## Part 1: Judge0 Docker Setup (10 minutes)

### Step 1: Install Docker

**Windows:**
1. Download: https://www.docker.com/products/docker-desktop
2. Install and restart computer
3. Open Docker Desktop
4. Verify: `docker --version`

**Mac:**
```bash
brew install --cask docker
```

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Step 2: Download Judge0

```bash
# Create directory
mkdir judge0
cd judge0

# Download docker-compose
curl -L https://github.com/judge0/judge0/releases/download/v1.13.0/docker-compose.yml -o docker-compose.yml
```

### Step 3: Start Judge0

```bash
# Start all services
docker-compose up -d

# Wait 30 seconds for services to start

# Check status
docker-compose ps
```

Expected output:
```
NAME                STATUS
judge0-server       Up
judge0-workers      Up
judge0-db           Up
judge0-redis        Up
```

### Step 4: Test Judge0

```bash
curl http://localhost:2358/about
```

Should return JSON with version info.

## Part 2: Backend Setup (5 minutes)

```bash
# Navigate to backend
cd ../backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

### Edit .env file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeash
JWT_SECRET=your_secret_key_123

# Judge0 Local Docker
JUDGE0_LOCAL=true
JUDGE0_URL=http://localhost:2358
```

### Start MongoDB

**Windows:**
```bash
mongod
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Seed Database

```bash
node seedData.js
```

Expected:
```
✅ MongoDB connected
🗑️  Cleared existing problems
✅ Seeded 3 problems
```

### Start Backend

```bash
npm run dev
```

Expected:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

## Part 3: Frontend Setup (2 minutes)

Open NEW terminal:

```bash
# Navigate to frontend root
cd ..

# Start frontend
npm run dev
```

Expected:
```
➜  Local:   http://localhost:5173/
```

## Part 4: Test Everything! (5 minutes)

### Test 1: Backend Health
```bash
curl http://localhost:5000/api/health
```

### Test 2: Judge0
```bash
curl http://localhost:2358/about
```

### Test 3: Frontend
1. Open http://localhost:5173
2. Complete intro
3. Sign up
4. Go to Problems
5. Click "Two Sum"
6. Write simple code:
```javascript
function twoSum(nums, target) {
    return [0, 1];
}
```
7. Click "Run"
8. See results! ✅

## 🎯 Verification Checklist

- [ ] Docker Desktop running
- [ ] Judge0 containers running (4 containers)
- [ ] MongoDB running
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can see problems list
- [ ] Can open problem
- [ ] Monaco editor loads
- [ ] Can run code
- [ ] Test results show

## 🐛 Troubleshooting

### Judge0 not working?

```bash
# Check containers
docker-compose ps

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Stop and start fresh
docker-compose down
docker-compose up -d
```

### MongoDB not connecting?

```bash
# Check if running
mongod --version

# Try different URI
MONGODB_URI=mongodb://127.0.0.1:27017/codeash
```

### Port conflicts?

**Judge0 port 2358 in use:**
Edit `judge0/docker-compose.yml`:
```yaml
ports:
  - "3000:2358"  # Change 2358 to 3000
```

Then update `.env`:
```env
JUDGE0_URL=http://localhost:3000
```

**Backend port 5000 in use:**
Edit `backend/.env`:
```env
PORT=5001
```

### Code execution slow?

Judge0 first run is slow (downloads language images).
Subsequent runs are fast (< 2 seconds).

## 📊 What's Running

| Service | Port | Status |
|---------|------|--------|
| Frontend | 5173 | ✅ |
| Backend | 5000 | ✅ |
| MongoDB | 27017 | ✅ |
| Judge0 | 2358 | ✅ |

## 🎨 Features Working

✅ User authentication
✅ Problems list with filters
✅ Search and sort
✅ Monaco code editor
✅ Multi-language support
✅ Code execution (Judge0)
✅ Test case validation
✅ Progress tracking
✅ Streak counter
✅ Bookmarks
✅ Light/Dark theme
✅ Auto-save code
✅ Custom test input

## 🚀 Next Steps

### Add More Problems

Edit `backend/seedData.js`:
```javascript
{
  title: 'Your Problem',
  slug: 'your-problem',
  description: '...',
  difficulty: 'Medium',
  tags: ['Array', 'DP'],
  // ... rest of problem data
}
```

Run:
```bash
node seedData.js
```

### Customize Theme

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color'
}
```

### Deploy to Production

**Backend:** Railway.app or Heroku
**Frontend:** Vercel or Netlify
**Database:** MongoDB Atlas
**Judge0:** Keep Docker or use Judge0 Cloud

## 📚 Documentation

- `QUICK_START.md` - 5-minute quickstart
- `SETUP_GUIDE.md` - Detailed setup
- `backend/JUDGE0_DOCKER_SETUP.md` - Judge0 details
- `IMPLEMENTATION_SUMMARY.md` - All features
- `backend/README.md` - API docs

## 🆘 Common Issues

**"Cannot connect to Docker"**
→ Start Docker Desktop

**"Judge0 timeout"**
→ Wait 1 minute after starting Docker

**"MongoDB connection failed"**
→ Check MongoDB is running: `mongod --version`

**"Problems not loading"**
→ Run `node seedData.js` again

**"Code execution error"**
→ Check Judge0: `curl http://localhost:2358/about`

## 💡 Pro Tips

1. **Auto-save:** Code saves automatically to localStorage
2. **Keyboard shortcuts:** Ctrl+S in editor
3. **Theme toggle:** Sun/Moon icon in editor
4. **Custom input:** Test with your own inputs
5. **Reset code:** Resets to starter template
6. **Copy code:** One-click copy button

## 🎉 You're Done!

Sab kuch setup ho gaya! Ab aap:
- Problems solve kar sakte ho
- Code run kar sakte ho
- Progress track kar sakte ho
- Streak maintain kar sakte ho

## 📞 Need Help?

1. Check browser console (F12)
2. Check backend terminal
3. Check Docker logs: `docker-compose logs`
4. Check MongoDB: Use MongoDB Compass

## 🔄 Daily Workflow

```bash
# Start Judge0 (if not running)
cd judge0
docker-compose up -d

# Start MongoDB
mongod

# Start Backend
cd backend
npm run dev

# Start Frontend (new terminal)
cd ..
npm run dev
```

## 🛑 Stop Everything

```bash
# Stop frontend: Ctrl+C
# Stop backend: Ctrl+C

# Stop Judge0
cd judge0
docker-compose down

# Stop MongoDB
# Windows: Ctrl+C in mongod terminal
# Mac: brew services stop mongodb-community
# Linux: sudo systemctl stop mongod
```

---

**Happy Coding! 🚀**

Jab Judge0 Docker setup ho jaaye, tab mujhe batana. Main aur features add kar dunga!
