# 🚀 CodeAsh Complete Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Git

## Step-by-Step Setup

### 1️⃣ Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env file with your credentials
# Required:
# - MONGODB_URI (local or MongoDB Atlas)
# - JWT_SECRET (any random string)
# - JUDGE0_API_KEY (from RapidAPI)
```

### 2️⃣ Get Judge0 API Key (FREE)

1. Go to https://rapidapi.com/judge0-official/api/judge0-ce
2. Click "Sign Up" (free account)
3. Click "Subscribe to Test"
4. Select "Basic" plan (FREE - 50 requests/day)
5. Copy your API key
6. Paste in `.env` file as `JUDGE0_API_KEY`

### 3️⃣ Start MongoDB

**Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or run mongod directly
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

### 4️⃣ Seed Database with Sample Problems

```bash
# Still in backend folder
node seedData.js
```

You should see:
```
✅ MongoDB connected
🗑️  Cleared existing problems
✅ Seeded 3 problems
```

### 5️⃣ Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

Test it: Open http://localhost:5000/api/health

### 6️⃣ Frontend Setup

Open a NEW terminal:

```bash
# Navigate to frontend (root of codeash)
cd ..

# Dependencies already installed, just start
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### 7️⃣ Test the Application

1. Open http://localhost:5173
2. Complete the intro sequence
3. Sign up with your details
4. After connecting screen, you'll be redirected to dashboard
5. Click "Problems" in navbar
6. You should see 3 sample problems
7. Click any problem to open the editor
8. Write code and click "Run" to test!

## 🎯 Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected
- [ ] Can see problems list
- [ ] Can open problem detail
- [ ] Monaco editor loads
- [ ] Can run code (test with simple console.log)
- [ ] Test results show

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Check if MongoDB is running: `mongod --version`
- Verify MONGODB_URI in .env
- Try: `mongodb://127.0.0.1:27017/codeash`

### Issue: "Judge0 API error"
**Solution:**
- Verify API key in .env
- Check RapidAPI subscription is active
- Free tier: 50 requests/day limit

### Issue: "CORS error"
**Solution:**
- Backend has CORS enabled by default
- Check backend is running on port 5000
- Verify axios calls use correct URL

### Issue: "Problems not loading"
**Solution:**
- Run seedData.js again
- Check MongoDB connection
- Open MongoDB Compass and verify 'problems' collection exists

### Issue: "Code execution timeout"
**Solution:**
- Judge0 free tier can be slow
- Wait 2-3 seconds
- Try simpler code first

## 📊 Database Verification

Use MongoDB Compass:
1. Connect to `mongodb://localhost:27017`
2. Open `codeash` database
3. Check collections:
   - `problems` (should have 3 documents)
   - `users` (will populate after signup)

## 🎨 Customization

### Add More Problems

Edit `backend/seedData.js` and add problems in the same format, then run:
```bash
node seedData.js
```

### Change Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Modify Starter Code

In problem schema, update `starterCode` array with your template.

## 🚀 Production Deployment

### Backend (Railway.app - FREE)

1. Push code to GitHub
2. Go to https://railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Select your repo
5. Add environment variables
6. Deploy!

### Frontend (Vercel - FREE)

1. Run `npm run build`
2. Go to https://vercel.com
3. Import your GitHub repo
4. Deploy!

### Database (MongoDB Atlas - FREE)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster (512MB)
3. Get connection string
4. Update MONGODB_URI in Railway

## 📱 Mobile Testing

The UI is responsive! Test on:
- Chrome DevTools (F12 → Toggle device toolbar)
- Real mobile device
- Tablet

## 🎓 Learning Resources

- **Monaco Editor:** https://microsoft.github.io/monaco-editor/
- **Judge0 Docs:** https://ce.judge0.com/
- **MongoDB:** https://university.mongodb.com/
- **Express:** https://expressjs.com/en/starter/installing.html

## 💡 Pro Tips

1. **Auto-save:** Code is saved in localStorage automatically
2. **Keyboard Shortcuts:** 
   - Ctrl+Enter: Run code (coming soon)
   - Ctrl+S: Save (Monaco default)
3. **Test Cases:** Hidden test cases only run on Submit
4. **Streak:** Solve 1 problem daily to maintain streak
5. **Bookmarks:** Star problems to save for later

## 🎉 You're All Set!

Your production-ready coding platform is now running!

### What's Working:
✅ User authentication
✅ Problem listing with filters
✅ Monaco code editor
✅ Code execution with Judge0
✅ Test case validation
✅ Progress tracking
✅ Streak counter
✅ Bookmark system
✅ Multi-language support

### Next Steps:
1. Add more problems
2. Customize theme
3. Deploy to production
4. Share with friends!

## 🆘 Need Help?

Check:
1. Browser console (F12)
2. Backend terminal logs
3. MongoDB Compass
4. Network tab in DevTools

Common fixes:
- Restart backend: Ctrl+C, then `npm run dev`
- Clear localStorage: F12 → Application → Local Storage → Clear
- Reseed database: `node seedData.js`

---

**Happy Coding! 🚀**
