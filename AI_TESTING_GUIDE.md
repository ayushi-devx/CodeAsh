# AI Features Testing Guide 🧪

## Quick Start

### 1. Verify Backend is Running
```bash
# Check if backend is on port 5000
netstat -ano | findstr :5000
```
✅ Backend is already running (PID 13108)

### 2. Verify Frontend is Running
```bash
# Check if frontend is on port 5175
netstat -ano | findstr :5175
```
✅ Frontend is already running (PID 25852)

### 3. Test AI Features in Browser

#### Step-by-Step:
1. **Open Browser**: Go to `http://localhost:5175`

2. **Login/Register**: 
   - Use existing account or create new one
   - Make sure you're authenticated

3. **Navigate to Problems**:
   - Click on "Problems" in the dashboard
   - Select any problem from the list

4. **Open AI Assistant**:
   - Look for the purple **"AI Assistant"** button with sparkles icon ✨
   - Click it to open the AI panel (slides in from right)

5. **Test Each Feature**:

   **a) Chat Tab 💬**
   - Type: "How should I approach this problem?"
   - Press Enter or click Send
   - Wait for AI response
   - Try follow-up questions

   **b) Explain Tab 📝**
   - Write some code in the editor first
   - Click "Explain" tab
   - AI will automatically analyze your code
   - Shows: overview, step-by-step logic, complexity, improvements

   **c) Hints Tab 💡**
   - Click "Hints" tab
   - AI generates 3 progressive hints
   - Helps without spoiling the solution

### 4. Backend API Testing (Optional)

Run the test script:
```bash
cd leet/codeash/backend
node testAI.js
```

**Note**: Update `TEST_USER` credentials in `testAI.js` first!

## Expected Behavior

### ✅ Success Indicators:
- AI Assistant button appears in problem toolbar
- Panel slides in smoothly from right
- All 3 tabs are clickable
- Chat messages send and receive responses
- Code explanation generates automatically
- Hints load when tab is clicked
- Loading spinners show during API calls
- Error messages display if something fails

### ❌ Common Issues:

**1. "AI Assistant button not showing"**
- Solution: Refresh the page (Ctrl+R)
- Check browser console for errors

**2. "API calls failing"**
- Check backend is running: `netstat -ano | findstr :5000`
- Verify Gemini API key in `.env`
- Check browser console for CORS errors

**3. "Loading forever"**
- Check internet connection (Gemini API needs internet)
- Verify API key is valid
- Check backend logs for errors

**4. "Authentication error"**
- Make sure you're logged in
- Token might be expired - logout and login again

## API Endpoints Reference

All endpoints require authentication header:
```javascript
Authorization: Bearer <your_jwt_token>
```

### 1. Explain Code
```
POST /api/ai/explain-code
Body: {
  code: string,
  language: string,
  problemTitle: string
}
```

### 2. Chat with AI
```
POST /api/ai/chat
Body: {
  message: string,
  problemContext: { title, description },
  conversationHistory: array
}
```

### 3. Get Hints
```
POST /api/ai/hints
Body: {
  problemTitle: string,
  problemDescription: string,
  userCode: string (optional)
}
```

### 4. Generate Problem
```
POST /api/ai/generate-problem
Body: {
  topic: string,
  difficulty: string,
  style: string (optional)
}
```

## Testing Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5175
- [ ] Can login successfully
- [ ] Can open a problem
- [ ] AI Assistant button visible
- [ ] AI panel opens/closes smoothly
- [ ] Chat tab works
- [ ] Explain tab works
- [ ] Hints tab works
- [ ] Loading states show properly
- [ ] Error handling works
- [ ] Can close AI panel

## Troubleshooting

### Backend Logs
Check terminal where backend is running for:
- API request logs
- Gemini API errors
- Authentication issues

### Browser Console
Press F12 and check:
- Network tab for failed requests
- Console tab for JavaScript errors
- Response data from API calls

### Quick Fixes

**Restart Backend:**
```bash
# Kill process
taskkill /F /PID 13108

# Start again
cd leet/codeash/backend
npm start
```

**Restart Frontend:**
```bash
# Kill and restart
cd leet/codeash
npm run dev
```

**Clear Cache:**
- Clear browser cache
- Clear localStorage
- Hard refresh (Ctrl+Shift+R)

## Demo Flow

1. Login → Dashboard
2. Click "Problems"
3. Select "Two Sum" (or any problem)
4. Click "AI Assistant" button (purple with sparkles)
5. **Chat Tab**: Ask "What data structure should I use?"
6. Write some code in editor
7. **Explain Tab**: Get code analysis
8. **Hints Tab**: Get progressive hints
9. Close AI panel with X button

## Success! 🎉

If all tests pass, you have:
- ✅ Working AI Chat Tutor
- ✅ Working Code Explanation
- ✅ Working Hints System
- ✅ Beautiful UI with animations
- ✅ Full Gemini AI integration

Ready for production! 🚀
