# 🚀 Quick Start - Battle Arena Testing

## ⚡ TL;DR (Too Long; Didn't Read)

**Problem:** Incognito mode not working  
**Solution:** LOGIN FIRST in incognito!

---

## 📱 Visual Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    MAIN BROWSER                             │
│                                                             │
│  1. Open: http://localhost:5174                            │
│  2. Login with Google ✅                                    │
│  3. Click: Game Room → Room Match → Create Room            │
│  4. Copy Code: "ABC123" 📋                                  │
│  5. Wait...                                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 INCOGNITO BROWSER                           │
│                                                             │
│  1. Open incognito window                                   │
│  2. Go to: http://localhost:5174                           │
│  3. ⚠️ LOGIN FIRST! (Google or new account) ✅              │
│  4. Click: Game Room → Room Match → Join Room              │
│  5. Enter Code: "ABC123"                                    │
│  6. Click: Join Room                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    BOTH BROWSERS                            │
│                                                             │
│  🎮 Battle Arena Opens!                                     │
│  ⏱️ Timer: 45:00                                            │
│  📝 Same Problem                                            │
│  💻 Start Coding!                                           │
│  🏆 Winner Screen                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 3-Step Process

### Step 1: Main Browser
```
Open → Login → Create Room → Copy Code
```

### Step 2: Incognito Browser
```
Open → LOGIN! → Join Room → Enter Code
```

### Step 3: Battle!
```
Code → Test → Submit → Winner!
```

---

## ⚠️ CRITICAL MISTAKE TO AVOID

### ❌ WRONG:
```
Incognito → Open localhost:5174 → Try to join room
Result: "Not authorized" error
```

### ✅ CORRECT:
```
Incognito → Open localhost:5174 → LOGIN FIRST → Join room
Result: Battle starts successfully!
```

---

## 🔑 Why Login is Required

```
No Login:
❌ No JWT token
❌ API rejects requests
❌ Can't create/join battles
❌ No real-time updates

With Login:
✅ JWT token saved
✅ API accepts requests
✅ Can create/join battles
✅ Real-time updates work
```

---

## 📋 Quick Checklist

Before testing, make sure:

- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5174)
- [ ] MongoDB running
- [ ] Main browser: Logged in
- [ ] Incognito browser: Logged in (different account)

---

## 🎮 Testing Commands

### Check if logged in:
```javascript
// In browser console (F12):
localStorage.getItem('codeash_token')
// Should show token, not null
```

### Check backend:
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"OK"}
```

---

## 💡 Pro Tips

1. **Use 2 Google accounts** - Easier than creating new accounts
2. **Copy room code immediately** - It's only shown once
3. **Start with Easy difficulty** - Focus on testing flow
4. **Check backend logs** - See what's happening in real-time

---

## 🐛 Quick Fixes

### "Not authorized"
→ Login first!

### "Room not found"
→ Create new room

### "Can't see Game Room tab"
→ Login first!

### "No opponent found"
→ Use Room Match (not Random Match)

---

## 🎉 Success Looks Like

```
Main Browser:
✅ Room code: "ABC123"
✅ Waiting for opponent...

Incognito Browser:
✅ Logged in
✅ Entered code
✅ Joined room

Both:
✅ Battle Arena loaded
✅ Timer started
✅ Can code
✅ Can test
✅ Can submit
✅ Winner screen
```

---

## 📞 Still Stuck?

1. Check both browsers are logged in
2. Check backend is running
3. Check MongoDB is running
4. Restart everything
5. Try again

---

**Remember:** LOGIN IN INCOGNITO MODE FIRST! 🔑

That's the only thing you were missing! 🎯
