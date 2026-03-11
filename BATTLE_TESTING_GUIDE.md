# 🎮 Battle Arena - Complete Testing Guide

## ⚠️ IMPORTANT: Authentication Required

The Battle Arena requires you to be logged in. In incognito mode, you need to login first!

---

## 🧪 Testing Steps (Room Match - Recommended)

### Step 1: Setup Main Browser
1. Open your main browser
2. Go to `http://localhost:5174`
3. Make sure you're logged in (if not, login with Google or email)
4. Click "Game Room" in the navbar
5. Click "Room Match"
6. Click "Create Room"
7. Select difficulty (Easy/Medium/Hard)
8. Click "Create Room"
9. **COPY THE ROOM CODE** (e.g., "ABC123")

### Step 2: Setup Incognito Browser
1. Open incognito/private window
2. Go to `http://localhost:5174`
3. **YOU MUST LOGIN FIRST!** (This is the key step)
   - Click "Continue with Google" OR
   - Create a new account with different email
4. After login, click "Game Room" in navbar
5. Click "Room Match"
6. Click "Join Room"
7. Enter the room code you copied
8. Click "Join Room"

### Step 3: Battle Starts!
- Both browsers should now show the Battle Arena
- Timer starts at 45:00
- Same problem appears for both players
- Start coding!

---

## 🔑 Why Incognito Wasn't Working

**Problem:** "incognito pr yeh chl ni rha given localhost url"

**Reason:** You weren't logged in! 

The Battle Arena needs:
- ✅ JWT token (from login)
- ✅ User ID (to identify players)
- ✅ Socket.io connection (requires authentication)

**Solution:** Login in incognito mode first, then join the room!

---

## 🎯 Quick Test Checklist

### Main Browser:
- [ ] Logged in
- [ ] On http://localhost:5174
- [ ] Created room
- [ ] Copied room code
- [ ] Waiting for opponent

### Incognito Browser:
- [ ] Opened incognito window
- [ ] Went to http://localhost:5174
- [ ] **LOGGED IN** (Google or new account)
- [ ] Clicked "Game Room"
- [ ] Joined room with code
- [ ] Battle arena loaded

---

## 🚀 Alternative: Use Two Different Accounts

Instead of incognito, you can:

1. **Browser 1:** Login with your main Google account
2. **Browser 2:** Login with a different Google account (or create new account)

This way both browsers are logged in and can battle!

---

## 🐛 Common Issues

### Issue 1: "Not authorized to access this route"
**Cause:** Not logged in  
**Fix:** Login first!

### Issue 2: "Room not found"
**Cause:** Room code expired or wrong  
**Fix:** Create new room, get fresh code

### Issue 3: Socket.io not connecting
**Cause:** Backend not running  
**Fix:** Check backend is running on port 5000

### Issue 4: Can't see "Game Room" tab
**Cause:** Not logged in  
**Fix:** Login first!

---

## 📊 Expected Flow

```
Main Browser:
1. Login ✅
2. Game Room → Room Match → Create Room ✅
3. Copy code: "ABC123" ✅
4. Wait for opponent... ⏳

Incognito Browser:
1. Go to localhost:5174 ✅
2. LOGIN FIRST! ✅ ← CRITICAL STEP
3. Game Room → Room Match → Join Room ✅
4. Enter code: "ABC123" ✅
5. Click Join ✅

Both Browsers:
🎮 Battle Arena loads!
⏱️ Timer starts
💻 Start coding
🏆 First to solve wins!
```

---

## 🎮 Battle Arena Features

### Real-time Updates:
- ✅ Opponent status (coding, tested, submitted)
- ✅ Timer countdown
- ✅ Test results
- ✅ Winner determination

### Code Editor:
- ✅ Monaco editor (VS Code style)
- ✅ Multiple languages (C++, Java, Python, JavaScript)
- ✅ Syntax highlighting
- ✅ Auto-completion

### Testing:
- ✅ Run tests before submit
- ✅ See test results
- ✅ Output console

### Winner Calculation:
1. Most test cases passed wins
2. If equal, faster time wins
3. ELO rating changes

---

## 🔍 Debug Commands

### Check if logged in:
```javascript
// In browser console:
console.log(localStorage.getItem('codeash_token'));
// Should show JWT token, not null
```

### Check user data:
```javascript
// In browser console:
console.log(localStorage.getItem('codeash_user'));
// Should show user info
```

### Check backend:
```bash
# In terminal:
curl http://localhost:5000/api/health
# Should return: {"status":"OK"}
```

---

## ✅ Success Indicators

You'll know it's working when:

### Main Browser:
- ✅ Room code displayed (e.g., "ABC123")
- ✅ "Waiting for opponent..." message
- ✅ Can copy room code

### Incognito Browser (after login):
- ✅ Can see "Game Room" tab
- ✅ Can enter room code
- ✅ "Join Room" button works

### Both Browsers:
- ✅ Battle Arena loads
- ✅ Same problem shown
- ✅ Timer starts at 45:00
- ✅ Can write code
- ✅ Can run tests
- ✅ Can submit solution

---

## 🎯 Pro Tips

1. **Always login first in incognito!**
   - This is the most common mistake
   - No token = No battle access

2. **Use Google login for speed**
   - Faster than creating new account
   - Can use multiple Google accounts

3. **Keep room code ready**
   - Copy it immediately after creating room
   - Room expires if creator leaves

4. **Test with simple problem**
   - Start with "Easy" difficulty
   - Focus on testing the battle flow

5. **Check backend logs**
   - Should see "User joined battle"
   - Should see "Battle started"

---

## 📝 Testing Scenarios

### Scenario 1: Basic Flow
1. Create room (Easy)
2. Join from incognito (after login)
3. Both solve problem
4. Check winner screen

### Scenario 2: Partial Solve
1. Create room (Medium)
2. Join from incognito
3. One player solves, other doesn't
4. Check winner determination

### Scenario 3: Time Pressure
1. Create room (Hard)
2. Join from incognito
3. Both submit with different test results
4. Check ELO rating changes

---

## 🆘 Still Not Working?

### Checklist:
1. ✅ Backend running on port 5000?
2. ✅ Frontend running on port 5174?
3. ✅ MongoDB running?
4. ✅ Logged in on BOTH browsers?
5. ✅ Room code correct?
6. ✅ No console errors?

### If still stuck:
1. Restart backend
2. Refresh both browsers
3. Login again on both
4. Create new room
5. Try again

---

## 🎉 Expected Result

When everything works:

```
Main Browser:
👤 Player 1 (You)
📝 Writing code...
✅ Tests: 3/5 passed
📤 Submitted!

Incognito Browser:
👤 Player 2 (Opponent)
📝 Writing code...
✅ Tests: 5/5 passed
📤 Submitted!

Winner Screen:
🏆 Player 2 Wins!
📊 Rating: 1200 → 1232 (+32)
```

---

## 🔑 Key Takeaway

**ALWAYS LOGIN IN INCOGNITO MODE FIRST!**

The Battle Arena is not accessible without authentication. This is by design for security and user tracking.

---

**Backend:** 🟢 Running on port 5000  
**Frontend:** 🟢 Running on port 5174  
**Authentication:** 🔑 Required for both players  

**Ready to battle? Login first, then fight!** 🎮
