# 🔑 How to Get RapidAPI Judge0 Key

## Why RapidAPI?

Judge0 local Docker doesn't work on Windows due to Linux cgroup requirements. RapidAPI provides a hosted Judge0 service that works perfectly on any OS!

---

## Step-by-Step Guide (5 Minutes)

### Step 1: Go to RapidAPI
Open this link in your browser:
```
https://rapidapi.com/judge0-official/api/judge0-ce
```

### Step 2: Sign Up / Login
- Click "Sign Up" (top right)
- Use Google/GitHub or email
- Verify your email if needed

### Step 3: Subscribe to Judge0 CE
- Click "Subscribe to Test" button
- Choose "Basic" plan (FREE)
  - 50 requests per day
  - Perfect for development
- Click "Subscribe"

### Step 4: Get Your API Key
- After subscribing, you'll see "Code Snippets" section
- Look for `X-RapidAPI-Key` header
- Copy the key (looks like: `abc123def456...`)

### Step 5: Update Backend .env
Open `leet/codeash/backend/.env` and update:

```env
# Replace 'your_rapidapi_key_here' with your actual key
JUDGE0_LOCAL=false
JUDGE0_API_KEY=paste_your_copied_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

### Step 6: Start Backend
```bash
cd leet/codeash/backend
npm start
```

### Step 7: Start Frontend
```bash
cd leet/codeash
npm run dev
```

### Step 8: Test in Browser
1. Open http://localhost:5174
2. Register/Login
3. Go to Problems
4. Select "Two Sum"
5. Click "Run Code"
6. Test cases should PASS! ✅

---

## 📸 Visual Guide

### What the RapidAPI Page Looks Like:

```
┌─────────────────────────────────────────────────┐
│  Judge0 CE                                      │
│  ┌──────────────────────────────────────────┐  │
│  │  Subscribe to Test                       │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  Pricing:                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Basic   │  │   Pro    │  │  Ultra   │     │
│  │  FREE    │  │  $10/mo  │  │  $50/mo  │     │
│  │ 50 req/d │  │ 1000/d   │  │ 10000/d  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                 │
│  Code Snippets:                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  X-RapidAPI-Key: abc123def456...        │  │ ← Copy this!
│  │  X-RapidAPI-Host: judge0-ce.p.rapidapi  │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 🎯 What You Get

### Free Tier (Basic Plan):
- ✅ 50 requests per day
- ✅ All languages supported
- ✅ Same API as local Judge0
- ✅ Reliable and fast
- ✅ No credit card required

### Perfect For:
- ✅ Development
- ✅ Testing
- ✅ Learning
- ✅ Small projects
- ✅ Demos

### Upgrade Later If Needed:
- Pro: $10/month - 1000 requests/day
- Ultra: $50/month - 10000 requests/day

---

## ✅ Verification

After updating .env and starting servers:

### Test 1: Backend Health
```bash
curl http://localhost:5000/api/health
```
Should return: `{"status":"ok"}`

### Test 2: Problems List
```bash
curl http://localhost:5000/api/problems
```
Should return array of problems

### Test 3: Code Execution (in browser)
1. Go to Problems
2. Select "Two Sum"
3. Click "Run Code"
4. Should see: ✅ Test Case 1: Passed

---

## 🐛 Troubleshooting

### Error: "Invalid API Key"
- Check key is copied correctly (no spaces)
- Check key is in quotes in .env
- Restart backend after updating .env

### Error: "Rate Limit Exceeded"
- You've used 50 requests today
- Wait 24 hours or upgrade plan
- Or create new RapidAPI account

### Error: "Network Error"
- Check internet connection
- Check RapidAPI is not down
- Try again in a few minutes

---

## 💡 Tips

1. **Save Your Key:** Keep it safe, don't share publicly
2. **Monitor Usage:** Check RapidAPI dashboard for usage stats
3. **Upgrade If Needed:** If you hit 50/day limit often
4. **Alternative:** Deploy Judge0 on Linux server for unlimited use

---

## 🚀 After Getting Key

Once you have the key and updated .env:

```bash
# Terminal 1
cd leet/codeash/backend
npm start

# Terminal 2
cd leet/codeash
npm run dev

# Browser
http://localhost:5174
```

Test code execution:
1. Register/Login
2. Problems → Two Sum
3. Run Code
4. Should work perfectly! ✅

---

## 📊 Comparison

| Feature | Local Docker | RapidAPI |
|---------|-------------|----------|
| Works on Windows | ❌ No | ✅ Yes |
| Setup Time | 30+ min | 5 min |
| Requires Docker | ✅ Yes | ❌ No |
| Free | ✅ Yes | ✅ Yes (50/day) |
| Reliable | ❌ Issues | ✅ Very |
| Internet Required | ❌ No | ✅ Yes |

---

## ✨ Summary

1. Go to: https://rapidapi.com/judge0-official/api/judge0-ce
2. Sign up & subscribe to Basic (FREE)
3. Copy API key
4. Update `backend/.env`
5. Start servers
6. Test in browser
7. Everything works! 🎉

**Time Required:** 5 minutes
**Cost:** FREE (50 requests/day)
**Difficulty:** Easy

---

**Ready?** Get your key now and start coding! 🚀
