# 🔥 Incognito Testing Guide - Battle Arena

## ❗ Why Incognito Doesn't Work Directly

**Problem:** Incognito mode has NO login session (no JWT token in localStorage)

**Solution:** You need to login in BOTH windows!

---

## ✅ Complete Testing Steps

### Step 1: Main Window Setup
```
1. Open http://localhost:5174 in normal browser
2. Login with your Google account (or email)
3. Click "Game Room" in navbar
4. Click "Room Match"
5. Click "Create Room"
6. Select difficulty (Easy/Medium/Hard)
7. Click "Create Room"
8. Copy the room code (e.g., "ABC123")
```

### Step 2: Incognito Window Setup
```
1. Open NEW INCOGNITO window
2. Go to http://localhost:5174
3. ⚠️ IMPORTANT: You need to LOGIN with a DIFFERENT account!
   
   Option A: Use different Google account
   Option B: Create new account with email
   
4. After login, click "Game Room"
5. Click "Room Match"
6. Click "Join Room"
7. Enter the room code from Step 1
8. Click "Join Room"
```

### Step 3: Battle Starts!
```
✅ Both windows should now show Battle Arena
✅ Same problem displayed
✅ Timer starts (45:00)
✅ You can code in both windows
✅ Real-time opponent status updates
```

---

## 🎮 Alternative Testing Methods

### Method 1: Two Different Browsers
```
Browser 1: Chrome (Player 1)
Browser 2: Firefox/Edge (Player 2)

Both need to:
- Go to http://localhost:5174
- Login with different accounts
- One creates room, other joins
```

### Method 2: Two Different Computers/Phones
```
Computer 1: Create room
Computer 2/Phone: Join room

Both access: http://localhost:5174
(Make sure backend is accessible on network)
```

### Method 3: Two Browser Profiles
```
Chrome Profile 1: Your main account
Chrome Profile 2: Guest/Different profile

Each profile has separate localStorage
```

---

## 🔑 Quick Account Creation

### If you don't have a second account:

**Option 1: Create Email Account**
```
1. In incognito window
2. Click "Sign Up" (not Google login)
3. Enter:
   - First Name: Test
   - Last Name: User
   - Email: test@test.com
   - Password: test123
4. Click "Sign Up"
5. Now join the room!
```

**Option 2: Use Different Google Account**
```
1. In incognito window
2. Click "Continue with Google"
3. Select different Google account
4. Or create new Google account
5. Login and join room
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "Not authorized" in incognito
**Cause:** Not logged in  
**Fix:** Login first, then join room

### Issue 2: "Room not found"
**Cause:** Room code expired or wrong  
**Fix:** Create new room, get fresh code

### Issue 3: Can't login in incognito
**Cause:** Google OAuth might block incognito  
**Fix:** Use email signup instead

### Issue 4: Both windows show same user
**Cause:** Same account in both windows  
**Fix:** Use different accounts!

---

## 📊 What You Should See

### Main Window (Player 1):
```
✅ "Waiting for opponent..."
✅ Room code displayed (e.g., "ABC123")
✅ Copy button
✅ Difficulty shown
```

### Incognito Window (Player 2):
```
✅ After joining: "Waiting for opponent..." OR
✅ Battle Arena loads immediately
```

### Both Windows (During Battle):
```
✅ Same problem displayed
✅ Timer counting down
✅ Opponent status updates:
   - "coding" when opponent is writing
   - "tested: 8/10" when opponent runs tests
   - "submitted" when opponent submits
```

### After Battle:
```
✅ Winner screen
✅ Rating change (+24 or -8)
✅ Victory/Defeat message
✅ Back to home button
```

---

## 🎯 Quick Test Checklist

Before testing, make sure:
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5174)
- [ ] MongoDB running
- [ ] You have 2 different accounts ready
- [ ] Both accounts can login successfully

---

## 💡 Pro Tips

1. **Keep room code ready**
   - Copy it immediately after creating room
   - Room codes are 6 characters (e.g., "ABC123")

2. **Test with easy problems first**
   - Select "Easy" difficulty
   - Faster to test complete flow

3. **Use email accounts for testing**
   - Easier than managing multiple Google accounts
   - Create test@test.com, test2@test.com, etc.

4. **Check backend logs**
   - Should see "User joined battle"
   - Should see "Battle started"
   - Helps debug issues

5. **Position windows side-by-side**
   - See both screens at once
   - Better testing experience

---

## 🚀 Expected Flow

### Timeline:
```
0:00 - Player 1 creates room
0:10 - Player 1 gets room code "ABC123"
0:20 - Player 2 joins with code
0:21 - Both see "Battle starting..."
0:22 - Battle Arena loads for both
0:23 - Timer starts (45:00)
0:30 - Both start coding
1:00 - Player 1 runs tests → Player 2 sees "tested: 8/10"
2:00 - Player 2 runs tests → Player 1 sees "tested: 10/10"
2:30 - Player 2 submits → Player 1 sees "submitted"
3:00 - Player 1 submits → Winner screen appears
3:01 - Both see winner and rating changes
```

---

## 🔧 Troubleshooting Commands

### Check if backend is running:
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"OK"}
```

### Check if logged in (browser console):
```javascript
localStorage.getItem('codeash_token')
// Should return long string, not null
```

### Check user info:
```javascript
JSON.parse(localStorage.getItem('codeash_user'))
// Should show user object with _id, firstName, etc.
```

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Both windows show Battle Arena
- ✅ Same problem in both windows
- ✅ Timer synced in both windows
- ✅ Opponent status updates in real-time
- ✅ Can code and run tests in both
- ✅ Submit works in both
- ✅ Winner screen appears in both
- ✅ Rating changes shown

---

## 🎊 Ready to Test!

**Remember:**
1. Main window: Login → Create room → Copy code
2. Incognito: Login (different account) → Join room → Enter code
3. Battle starts automatically!

**Backend:** 🟢 Running on port 5000  
**Frontend:** 🟢 Running on port 5174  
**Socket.io:** 🟢 Ready for real-time battles  

**Go test your Battle Arena! ⚔️**
