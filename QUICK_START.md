# ⚡ Quick Start - CodeAsh Platform

## 🚀 Get Running in 5 Minutes!

### Step 1: Backend Setup (2 minutes)

```bash
# Terminal 1
cd backend
npm install
copy .env.example .env
```

**Edit `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeash
JWT_SECRET=mysecretkey123
JUDGE0_API_KEY=your_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

**Get FREE Judge0 API Key:**
1. Go to: https://rapidapi.com/judge0-official/api/judge0-ce
2. Sign up (free)
3. Subscribe to "Basic" plan (FREE)
4. Copy API key to `.env`

### Step 2: Start MongoDB (30 seconds)

```bash
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 3: Seed Database (30 seconds)

```bash
# Still in backend folder
node seedData.js
```

Expected output:
```
✅ MongoDB connected
🗑️  Cleared existing problems
✅ Seeded 3 problems
```

### Step 4: Start Backend (10 seconds)

```bash
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Step 5: Start Frontend (1 minute)

```bash
# Terminal 2 (new terminal)
cd ..
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

### Step 6: Test It! (1 minute)

1. Open http://localhost:5173
2. Complete intro animation
3. Sign up with any email
4. Watch connecting animation
5. Click "Problems" in navbar
6. See 3 sample problems
7. Click "Two Sum"
8. Write code:
```javascript
function twoSum(nums, target) {
    return [0, 1];
}
```
9. Click "Run"
10. See test results! ✅

## ✅ Verification

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can see problems list
- [ ] Can open problem detail
- [ ] Monaco editor loads
- [ ] Can run code

## 🐛 Quick Fixes

**MongoDB not starting?**
```bash
# Check if running
mongod --version

# Try different port
mongod --port 27018
```

**Port 5000 in use?**
```bash
# Change in backend/.env
PORT=5001
```

**Judge0 not working?**
- Check API key in .env
- Verify RapidAPI subscription
- Free tier: 50 requests/day

## 🎯 What You Get

✅ Full LeetCode-style platform
✅ 3 sample problems
✅ Monaco code editor
✅ Code execution
✅ Progress tracking
✅ User authentication
✅ Streak counter
✅ Bookmarks

## 📚 Next Steps

1. Read `SETUP_GUIDE.md` for detailed setup
2. Read `IMPLEMENTATION_SUMMARY.md` for features
3. Add more problems in `backend/seedData.js`
4. Customize theme in `tailwind.config.js`
5. Deploy to production!

## 🆘 Need Help?

Check browser console (F12) and backend terminal for errors.

Common issues:
- MongoDB not running → Start MongoDB
- API key missing → Add to .env
- Port in use → Change PORT in .env

---

**You're all set! Happy coding! 🎉**
