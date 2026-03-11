# 🔧 Battle Arena - Troubleshooting Guide

## ✅ Backend Status: Running on Port 5000

---

## 🐛 Common Issues & Solutions

### Issue 1: "Game Room" Tab Not Showing
**Problem:** Battle Arena tab missing in navbar

**Solution:**
```javascript
// Check DashboardNavbar.jsx has "gameroom" option
// Should have icon and text for Game Room
```

**Quick Fix:**
1. Open Dashboard
2. Look for "Game Room" in navbar
3. If missing, check DashboardNavbar.jsx

---

### Issue 2: API Errors (401 Unauthorized)
**Problem:** "Not authorized" errors

**Solution:**
```javascript
// Check if JWT token exists
console.log(localStorage.getItem('codeash_token'));

// If null, login again
```

**Quick Fix:**
1. Logout
2. Login again with Google or email
3. Token will be refreshed

---

### Issue 3: Socket.io Not Connecting
**Problem:** Real-time updates not working

**Solution:**
```javascript
// Check Socket.io connection
// Should see in backend logs:
// "User connected: <socket-id>"
```

**Quick Fix:**
1. Check backend is running (port 5000)
2. Check browser console for Socket errors
3. Restart backend if needed

---

### Issue 4: Monaco Editor Not Loading
**Problem:** Code editor blank or not showing

**Solution:**
```bash
# Check if @monaco-editor/react is installed
npm list @monaco-editor/react

# If not installed:
npm install @monaco-editor/react
```

---

### Issue 5: "Room Not Found" Error
**Problem:** Can't join room with code

**Possible Causes:**
1. Room code expired (creator left)
2. Wrong code entered
3. Room already full (2 players max)

**Solution:**
- Create new room
- Get fresh code
- Try again

---

### Issue 6: Battle Not Starting
**Problem:** Stuck on "Waiting for opponent"

**Possible Causes:**
1. Only 1 player in room
2. Socket.io not connected
3. Backend not receiving events

**Solution:**
1. Check backend logs for Socket events
2. Open another browser/incognito
3. Join with second account
4. Battle should start automatically

---

### Issue 7: Tests Not Running
**Problem:** "Run Tests" button not working

**Possible Causes:**
1. Judge0 not responding
2. Code has syntax errors
3. Problem ID missing

**Solution:**
```javascript
// Check Judge0 connection
// Backend should have:
JUDGE0_URL=http://98.81.157.121:2358

// Test manually:
curl http://98.81.157.121:2358/about
```

---

### Issue 8: Winner Not Showing
**Problem:** Battle completes but no winner screen

**Possible Causes:**
1. Both players didn't submit
2. Socket event not received
3. Rating calculation error

**Solution:**
1. Both players must click "Submit"
2. Check backend logs for "Battle completed"
3. Refresh page if stuck

---

## 🧪 Testing Steps

### Test 1: Create Room
```
1. Click "Game Room"
2. Click "Room Match"
3. Click "Create Room"
4. Select difficulty
5. Click "Create Room"
6. Should see room code (e.g., "ABC123")
```

**Expected:** ✅ Room code displayed

### Test 2: Join Room
```
1. Copy room code
2. Open incognito/another browser
3. Login with different account
4. Click "Game Room" → "Room Match"
5. Click "Join Room"
6. Enter code
7. Click "Join Room"
```

**Expected:** ✅ Battle arena opens

### Test 3: Battle Flow
```
1. Both players see same problem
2. Timer starts (45:00)
3. Write code in editor
4. Click "Run Tests"
5. See test results
6. Click "Submit"
7. Wait for opponent to submit
8. Winner screen appears
```

**Expected:** ✅ Winner determined, rating changes shown

---

## 📊 Backend Logs to Check

### Successful Flow:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
💬 Socket.io ready for ChatnCode
User connected: <socket-id>
User <userId> joined battle <battleId>
Battle <battleId> started
User <userId> submitted solution in battle <battleId>
Battle <battleId> completed. Winner: <userId>
```

### Error Indicators:
```
❌ MongoDB connection error
❌ Port already in use
❌ Battle not found
❌ Not authorized
❌ Judge0 error
```

---

## 🔍 Debug Checklist

### Backend
- [ ] MongoDB running (port 27017)
- [ ] Backend running (port 5000)
- [ ] No port conflicts
- [ ] Battle routes loaded
- [ ] Socket.io initialized
- [ ] Judge0 accessible

### Frontend
- [ ] Frontend running (port 5177)
- [ ] User logged in
- [ ] JWT token present
- [ ] Socket.io-client installed
- [ ] Monaco editor installed
- [ ] No console errors

### Database
- [ ] Battle collection exists
- [ ] User model has battle fields
- [ ] Problems collection has data

---

## 🚀 Quick Start (If Nothing Works)

### Complete Reset:
```bash
# 1. Stop everything
Get-Process -Name node | Stop-Process -Force

# 2. Start backend
cd leet/codeash/backend
npm start

# 3. Start frontend (new terminal)
cd leet/codeash
npm run dev

# 4. Check MongoDB
# Make sure MongoDB is running

# 5. Test
# Open http://localhost:5177
# Login
# Click "Game Room"
```

---

## 📝 Required Dependencies

### Backend
```json
{
  "socket.io": "^4.8.3",
  "mongoose": "^8.0.0",
  "express": "^4.18.2",
  "axios": "^1.6.0"
}
```

### Frontend
```json
{
  "socket.io-client": "^4.8.3",
  "@monaco-editor/react": "^4.6.0",
  "framer-motion": "^11.0.0",
  "axios": "^1.6.0"
}
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeash
JWT_SECRET=codeash_secret_key_2024
JUDGE0_URL=http://98.81.157.121:2358
OPENROUTER_API_KEY=sk-or-v1-fc29b8...
```

---

## 💡 Pro Tips

1. **Always check backend logs first**
   - Most issues are backend-related
   - Socket.io events show in logs

2. **Use browser DevTools**
   - Network tab for API calls
   - Console for errors
   - Application tab for localStorage

3. **Test with 2 browsers**
   - Regular + Incognito
   - Or 2 different browsers
   - Different accounts

4. **Check MongoDB**
   - Make sure it's running
   - Check collections exist
   - Verify data is saved

5. **Restart if stuck**
   - Kill all node processes
   - Restart backend
   - Refresh frontend
   - Login again

---

## 🆘 Still Not Working?

### Check These:

1. **Backend Running?**
   ```bash
   curl http://localhost:5000/api/health
   # Should return: {"status":"OK"}
   ```

2. **MongoDB Running?**
   ```bash
   mongosh
   # Should connect
   ```

3. **JWT Token Valid?**
   ```javascript
   // In browser console:
   localStorage.getItem('codeash_token')
   // Should return long string
   ```

4. **Socket.io Connected?**
   ```javascript
   // Check browser console for:
   // "Socket connected" or similar
   ```

5. **Battle Routes Loaded?**
   ```bash
   # Check backend logs for:
   # No errors about battleRoutes
   ```

---

## 📞 Common Error Messages

### "Not authorized to access this route"
**Fix:** Login again, token expired

### "Room not found"
**Fix:** Create new room, old one expired

### "Battle not found"
**Fix:** Refresh page, rejoin room

### "Failed to start battle"
**Fix:** Check both players joined

### "Judge0 error"
**Fix:** Check JUDGE0_URL in .env

### "Socket connection failed"
**Fix:** Restart backend

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ "Game Room" tab visible
- ✅ Can create room and get code
- ✅ Can join room with code
- ✅ Battle arena loads
- ✅ Can write code in editor
- ✅ Tests run successfully
- ✅ Can submit solution
- ✅ Winner screen appears
- ✅ Rating changes shown

---

**Backend Status:** 🟢 Running  
**Port:** 5000  
**Socket.io:** 🟢 Ready  

**If still having issues, share the exact error message!** 🔍
