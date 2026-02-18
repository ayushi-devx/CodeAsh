# 🚀 START HERE - CodeAsh Setup

## 📁 Files Location

```
codeash/
├── judge0/
│   ├── docker-compose.yml     ✅ CREATED
│   ├── judge0.conf            ✅ CREATED
│   └── README.md              ✅ CREATED
├── backend/
│   ├── All backend files      ✅ CREATED
│   └── .env.example           ✅ CREATED
├── src/
│   └── All frontend files     ✅ CREATED
└── Documentation/
    ├── COMPLETE_SETUP.md      ✅ Full setup guide
    ├── QUICK_COMMANDS.md      ✅ Command reference
    └── CURRENT_STATUS.md      ✅ Implementation status
```

## 🎯 Setup Steps (20 minutes)

### 1️⃣ Install Docker Desktop (5 min)

**Windows:**
- Download: https://www.docker.com/products/docker-desktop
- Install and restart
- Open Docker Desktop

**Mac:**
```bash
brew install --cask docker
```

### 2️⃣ Start Judge0 (2 min)

```bash
cd judge0
docker-compose up -d
```

Wait 30 seconds, then test:
```bash
curl http://localhost:2358/about
```

### 3️⃣ Setup Backend (5 min)

```bash
cd ../backend
npm install
copy .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeash
JWT_SECRET=mysecretkey123
JUDGE0_LOCAL=true
JUDGE0_URL=http://localhost:2358
```

Start MongoDB:
```bash
# Windows
mongod

# Mac
brew services start mongodb-community
```

Seed database:
```bash
node seedData.js
```

Start backend:
```bash
npm run dev
```

### 4️⃣ Start Frontend (2 min)

New terminal:
```bash
cd ..
npm run dev
```

### 5️⃣ Test! (5 min)

1. Open http://localhost:5173
2. Sign up
3. Go to Problems
4. Click "Two Sum"
5. Write code:
```javascript
function twoSum(nums, target) {
    return [0, 1];
}
```
6. Click "Run"
7. See results! ✅

## ✅ Verification

- [ ] Docker Desktop running
- [ ] Judge0 containers running (4 containers)
- [ ] MongoDB running
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5173)
- [ ] Can see problems
- [ ] Can run code

## 📚 Documentation

1. **`COMPLETE_SETUP.md`** - Detailed setup guide
2. **`QUICK_COMMANDS.md`** - Command reference
3. **`judge0/README.md`** - Judge0 setup
4. **`CURRENT_STATUS.md`** - What's implemented

## 🆘 Quick Fixes

**Judge0 not working?**
```bash
cd judge0
docker-compose down
docker-compose up -d
docker-compose logs -f
```

**MongoDB not connecting?**
```bash
mongod --version
# If not installed, install MongoDB
```

**Port conflicts?**
- Change ports in `docker-compose.yml` or `.env`

**Problems not loading?**
```bash
cd backend
node seedData.js
```

## 🎉 What's Working

✅ User authentication
✅ Problems list with filters
✅ Monaco code editor
✅ Code execution (Judge0)
✅ Test case validation
✅ Progress tracking
✅ Streak counter
✅ Bookmarks
✅ Light/Dark theme
✅ Auto-save

## 📞 Need Help?

1. Check `COMPLETE_SETUP.md`
2. Check `QUICK_COMMANDS.md`
3. Check browser console (F12)
4. Check backend terminal
5. Check Docker logs

## 🚀 Daily Workflow

```bash
# Start everything
cd judge0 && docker-compose up -d
cd ../backend && npm run dev
# New terminal
npm run dev
```

## 🎯 Next Steps

1. ✅ Complete setup (20 min)
2. ✅ Test all features
3. ✅ Add more problems
4. ✅ Customize theme
5. ✅ Deploy to production

---

**Everything is ready! Follow the steps above and start coding! 🚀**

**Judge0 files are in `judge0/` folder - docker-compose.yml and judge0.conf are already created!**
