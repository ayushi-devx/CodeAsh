# ⚡ Quick Test Guide - Battle Arena

## 🚨 IMPORTANT: You MUST Login in BOTH Browsers!

---

## 🎯 3-Minute Testing Guide

### Browser 1 (Main Window):
```
1. http://localhost:5174
2. Login with Google ✅
3. Game Room → Room Match → Create Room
4. Copy code: "ABC123" 📋
5. Wait...
```

### Browser 2 (Incognito):
```
1. Open incognito window
2. http://localhost:5174
3. Login with DIFFERENT Google account ✅ (CRITICAL!)
4. Game Room → Room Match → Join Room
5. Enter code: "ABC123"
6. Join! 🎮
```

### Result:
```
✅ Both see Battle Arena
✅ Timer starts
✅ Start coding!
```

---

## ❌ Common Mistake

### WRONG:
```
Browser 1: Login ✅
Browser 2: No login ❌ → ERROR!
```

### CORRECT:
```
Browser 1: Login with account1@gmail.com ✅
Browser 2: Login with account2@gmail.com ✅ → SUCCESS!
```

---

## 🔑 Why Login is Required

Without login:
- ❌ No JWT token
- ❌ API returns 401 error
- ❌ Can't create/join battles
- ❌ No user tracking
- ❌ No ELO rating

With login:
- ✅ JWT token stored
- ✅ API works
- ✅ Can battle
- ✅ User tracked
- ✅ ELO updates

---

## 🎮 Alternative Testing Methods

### Method 1: Two Different Browsers
```
Chrome: Player 1 (login with account1)
Firefox: Player 2 (login with account2)
```

### Method 2: Two Browser Profiles
```
Chrome Profile 1: Player 1
Chrome Profile 2: Player 2
```

### Method 3: Two Devices
```
Computer: Player 1
Phone: Player 2
```

---

## 🐛 Troubleshooting

### "Not authorized" error:
→ You forgot to login! Login first.

### "Room not found":
→ Create new room, get fresh code.

### "Can't see Game Room tab":
→ Not logged in! Login first.

### "Same user in both windows":
→ Use DIFFERENT accounts!

---

## ✅ Quick Check

Before testing:
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5174)
- [ ] Have 2 different Google accounts ready
- [ ] Both accounts can login

---

## 🎊 Expected Flow

```
0:00 - Player 1 creates room
0:10 - Player 1 gets code "ABC123"
0:20 - Player 2 joins with code
0:22 - Battle starts!
0:23 - Timer: 45:00
1:00 - Both coding...
2:00 - Player 1 runs tests → Player 2 sees "tested: 8/10"
3:00 - Player 2 submits → Player 1 sees "submitted"
3:30 - Player 1 submits → Winner screen!
3:31 - Rating changes shown
```

---

## 💡 Pro Tip

**Easiest way to test:**
1. Main browser: Your main Google account
2. Incognito: Your secondary Google account (or create new one)
3. Both login → One creates, other joins → Battle!

---

**Remember: LOGIN IN BOTH BROWSERS!** 🔑

**Backend:** 🟢 Port 5000  
**Frontend:** 🟢 Port 5174  
**Auth:** 🔑 Required  

**Go test! ⚔️**
