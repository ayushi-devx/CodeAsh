# 🚀 Quick Test Guide - AI Features

## ✅ Pre-Test Verification

### 1. Backend Status
```bash
curl http://localhost:5000/api/health
```
**Expected**: `{"status":"OK","message":"CodeAsh API is running"}`
✅ **VERIFIED**: Backend is running!

### 2. Frontend Status
- URL: `http://localhost:5175`
- Status: ✅ **RUNNING**

### 3. Services Running
- Backend: Port 5000 (PID 13108) ✅
- Frontend: Port 5175 (PID 25852) ✅
- MongoDB: localhost:27017 ✅

---

## 🎯 Testing Steps

### Step 1: Open Browser
```
http://localhost:5175
```

### Step 2: Login
- Use your existing account
- Or register a new one

### Step 3: Navigate to Problems
1. Click "Problems" in dashboard
2. You'll see list of problems with:
   - Status column
   - Title column
   - Links column (LeetCode, GFG icons)
   - Difficulty column
   - Tags column

### Step 4: Open Any Problem
- Click on any problem title
- Problem detail page will open

### Step 5: Find AI Assistant Button
Look for this button in the top toolbar:
```
[✨ AI Assistant]  [☀️]  [↻ Reset]  [▶ Run]  [📤 Submit]
```
- Purple button with sparkles icon
- Located before the theme toggle

### Step 6: Click AI Assistant
- Panel will slide in from right side
- Width: ~384px
- Dark theme with purple accents

### Step 7: Test Chat Tab 💬
1. Should be selected by default
2. Type a question: "How should I approach this problem?"
3. Press Enter or click Send button
4. Wait 2-5 seconds
5. AI response will appear
6. Try follow-up questions

**Example Questions:**
- "What data structure should I use?"
- "Can you explain the two-pointer technique?"
- "What's the time complexity of using a hash map?"

### Step 8: Test Explain Tab 📝
1. First, write some code in the editor:
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```
2. Click "Explain" tab
3. AI will automatically analyze your code
4. Wait for response (2-5 seconds)
5. You'll see:
   - Overview of what code does
   - Step-by-step explanation
   - Time & space complexity
   - Improvement suggestions

### Step 9: Test Hints Tab 💡
1. Click "Hints" tab
2. AI will automatically generate hints
3. Wait for response (2-5 seconds)
4. You'll see 3 progressive hints:
   - Hint 1: Gentle nudge
   - Hint 2: More specific approach
   - Hint 3: Implementation details

### Step 10: Close AI Panel
- Click X button in top-right of panel
- Panel will slide out smoothly

---

## ✅ Success Checklist

- [ ] Backend health check passes
- [ ] Frontend loads successfully
- [ ] Can login/register
- [ ] Can see problems list
- [ ] Can open a problem
- [ ] AI Assistant button is visible
- [ ] AI panel opens smoothly
- [ ] Chat tab works (sends & receives messages)
- [ ] Explain tab works (analyzes code)
- [ ] Hints tab works (generates hints)
- [ ] Loading spinners show during API calls
- [ ] Can close AI panel
- [ ] No console errors

---

## 🎨 Visual Indicators

### Loading States
- Chat: "Thinking..." with spinner
- Explain: Spinning loader icon
- Hints: Spinning loader icon

### Success States
- Chat: Messages appear in bubbles
- Explain: Text explanation appears
- Hints: Numbered hints appear

### Error States
- Error messages in red
- "Sorry, I encountered an error. Please try again."

---

## 🐛 Troubleshooting

### Issue: AI button not visible
**Solution:**
1. Hard refresh: Ctrl+Shift+R
2. Clear cache
3. Check browser console (F12)

### Issue: API calls failing
**Check:**
1. Backend running: `netstat -ano | findstr :5000`
2. Internet connection (Gemini API needs internet)
3. Browser console for errors
4. Network tab in DevTools

### Issue: "Authentication error"
**Solution:**
1. Logout and login again
2. Token might be expired
3. Check localStorage for token

### Issue: Loading forever
**Check:**
1. Internet connection
2. Backend logs for errors
3. Gemini API key in .env
4. API rate limits

---

## 📊 Expected Response Times

- Chat: 2-5 seconds
- Explain: 3-6 seconds
- Hints: 2-4 seconds

*Times may vary based on internet speed and API load*

---

## 🎯 Test Scenarios

### Scenario 1: First Time User
1. Register new account
2. Go to problems
3. Open "Two Sum"
4. Click AI Assistant
5. Ask: "I'm new to this, where do I start?"
6. Should get beginner-friendly guidance

### Scenario 2: Code Review
1. Write a solution
2. Click AI Assistant
3. Go to Explain tab
4. Should get detailed code analysis

### Scenario 3: Stuck on Problem
1. Open a hard problem
2. Click AI Assistant
3. Go to Hints tab
4. Should get progressive hints

---

## 🎉 Success Criteria

If all these work, you're good to go:
✅ AI responds to chat messages
✅ Code explanation is detailed and accurate
✅ Hints are progressive and helpful
✅ UI is smooth and responsive
✅ No errors in console
✅ Loading states work properly

---

## 📸 Screenshot Checklist

Take screenshots of:
1. AI Assistant button in toolbar
2. AI panel open with Chat tab
3. Chat conversation with AI
4. Explain tab with code analysis
5. Hints tab with progressive hints

---

## 🚀 Ready to Test!

Everything is set up and ready. Just follow the steps above and enjoy your AI-powered coding platform!

**Time to test**: ~5-10 minutes
**Difficulty**: Easy
**Fun level**: 🔥🔥🔥

---

**Last Updated**: February 20, 2026
**Status**: ✅ READY FOR TESTING
