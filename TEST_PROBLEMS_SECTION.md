# 🧪 Test Problems Section - Complete Guide

## Quick Start

### 1. Restart Judge0 & Reseed Database
```bash
# Restart Judge0
cd leet/codeash/judge0
docker-compose down && docker-compose up -d
cd ..

# Reseed database (to add editorial)
cd backend
node seedData.js
```

### 2. Start Servers
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd leet/codeash
npm run dev
```

### 3. Open Browser
```
http://localhost:5174
```

---

## 🧪 Testing Checklist

### Problem Listing Page

- [ ] **Search Functionality**
  - Type "two" in search bar
  - Should show "Two Sum" problem
  - Clear search, all problems appear

- [ ] **Difficulty Filter**
  - Select "Easy" → Shows only Easy problems
  - Select "Medium" → Shows only Medium problems
  - Select "Hard" → Shows only Hard problems
  - Select "All Difficulties" → Shows all

- [ ] **Status Filter**
  - Select "Solved" → Shows solved problems
  - Select "Attempted" → Shows attempted problems
  - Select "Todo" → Shows unsolved problems

- [ ] **Sorting**
  - Sort by "Most Solved"
  - Sort by "Acceptance Rate"
  - Sort by "Newest"
  - Sort by "Difficulty"

- [ ] **Problem Cards**
  - Status icon shows (green check for solved)
  - Title is clickable
  - Difficulty is color-coded (green/yellow/red)
  - Acceptance rate displays
  - Tags show (max 2)

- [ ] **Statistics Cards**
  - Solved count updates
  - Attempted count updates
  - Acceptance rate calculates

---

### Problem Detail Page

#### Description Tab

- [ ] **Problem Info**
  - Title displays correctly
  - Difficulty badge shows with correct color
  - Tags display
  - Company tags show
  - Acceptance rate visible

- [ ] **Content**
  - Description renders properly
  - Examples show with input/output
  - Explanations display
  - Constraints list appears
  - Hints section shows (blue box with lightbulb)

#### Editorial Tab

- [ ] **Editorial Content**
  - Click "Editorial" tab
  - Striver-style explanation loads
  - Shows: Approach, Intuition, Algorithm, Complexity
  - Code examples display
  - Formatted properly

#### Solutions Tab

- [ ] **Community Solutions**
  - Click "Solutions" tab
  - Solution cards display
  - Author name shows
  - Language tag visible
  - Upvote count displays
  - Code is formatted
  - Explanation text shows
  - Runtime and memory stats visible

#### Submissions Tab

- [ ] **Submission History**
  - Click "Submissions" tab
  - Shows "No submissions yet" initially
  - After submitting, submissions appear
  - Status color-coded (green for Accepted)
  - Language tag shows
  - Runtime and memory display
  - Submission date shows

---

### Code Editor

#### Basic Features

- [ ] **Editor Loads**
  - Monaco editor appears
  - Starter code loads automatically
  - Line numbers visible
  - Syntax highlighting works

- [ ] **Language Selector**
  - Click language dropdown
  - Select JavaScript → Starter code changes
  - Select Python → Starter code changes
  - Select C++ → Starter code changes
  - Select Java → Starter code changes
  - Select C → Starter code changes

- [ ] **Theme Toggle**
  - Click sun/moon icon
  - Editor switches between dark/light
  - Colors change appropriately

- [ ] **Editor Controls**
  - Copy button copies code
  - Check icon appears after copy
  - Reset button restores starter code
  - Fullscreen button expands editor

#### Code Execution

- [ ] **Run Code (Public Test Cases)**
  - Write simple code or use starter
  - Click "Run" button
  - Button shows "Running..."
  - Test cases panel updates
  - Shows passed/failed count
  - Each test case shows:
    - Input
    - Expected output
    - Your output
    - Runtime
    - Memory
    - Pass/Fail status (green/red)

- [ ] **Custom Input**
  - Click "Custom Input" tab
  - Enter test input (e.g., `2 7 11 15\n9`)
  - Click "Run"
  - Output shows in test cases panel
  - Can see your output

- [ ] **Submit Solution**
  - Write correct solution
  - Click "Submit" button
  - Button shows "Submitting..."
  - Runs all test cases (including hidden)
  - Shows final status:
    - Accepted (if all pass)
    - Wrong Answer (if any fail)
    - Compilation Error
    - Runtime Error
  - Alert shows "🎉 Accepted!" if successful

#### Error Handling

- [ ] **Compilation Error**
  - Write invalid syntax (e.g., `console.log(`)
  - Click "Run"
  - Shows "Compilation Error" status
  - Error message displays

- [ ] **Runtime Error**
  - Write code that crashes (e.g., divide by zero)
  - Click "Run"
  - Shows "Runtime Error" status
  - Error message displays

- [ ] **Wrong Answer**
  - Write incorrect logic (e.g., return `[0, 0]`)
  - Click "Run"
  - Shows failed test case
  - Expected vs actual output visible

---

### Advanced Features

#### Auto-save

- [ ] **Code Persistence**
  - Write some code
  - Wait 1 second
  - Refresh page
  - Code should still be there
  - Change language
  - Code for each language saved separately

#### User Progress

- [ ] **Solve a Problem**
  - Submit correct solution
  - Get "Accepted" status
  - Go back to problems list
  - Problem shows green check mark
  - Solved count increases

- [ ] **Attempt a Problem**
  - Submit wrong solution
  - Get "Wrong Answer" status
  - Go back to problems list
  - Problem shows yellow circle
  - Attempted count increases

#### Bookmark

- [ ] **Bookmark Problem**
  - Click bookmark icon (if implemented)
  - Problem saves to bookmarks
  - Can filter by bookmarked

---

## 🎯 Expected Results

### After Running Code:
```
✅ Test Case 1: Passed
Input: [2,7,11,15], target = 9
Expected: [0,1]
Output: [0,1]
Runtime: 0.02s
Memory: 512KB

✅ Test Case 2: Passed
Input: [3,2,4], target = 6
Expected: [1,2]
Output: [1,2]
Runtime: 0.01s
Memory: 510KB
```

### After Submitting:
```
🎉 Accepted!
Passed: 4/4 test cases
Runtime: 0.02s
Memory: 512KB
```

---

## 🐛 Common Issues

### Judge0 Not Working
```bash
# Check containers
docker ps

# Should see 3 containers running:
# - judge0
# - judge0-db
# - judge0-redis

# If not, restart:
cd judge0
docker-compose down
docker-compose up -d
```

### Editorial Not Showing
```bash
# Reseed database
cd backend
node seedData.js
```

### Submissions Not Saving
- Make sure you're logged in
- Check JWT token in localStorage
- Check backend logs for errors

### Code Not Executing
- Check Judge0 is running: `docker ps`
- Check backend is running: `curl http://localhost:5000/api/health`
- Check browser console for errors

---

## 📸 What You Should See

### Problems List:
- Clean table with problems
- Green/Yellow/Red difficulty badges
- Status icons (check/circle)
- Search and filters working
- Smooth animations

### Problem Detail:
- Split screen (50/50)
- Left: Problem description with tabs
- Right: Code editor with controls
- Bottom right: Test cases panel
- Professional dark theme

### After Running:
- Test cases show pass/fail
- Green boxes for passed
- Red boxes for failed
- Runtime and memory stats
- Clear error messages

### Editorial Tab:
- Professional formatting
- Code blocks with syntax highlighting
- Complexity analysis
- Step-by-step explanation

---

## ✅ Success Criteria

All these should work:
- ✅ Can search problems
- ✅ Can filter by difficulty
- ✅ Can click and open problem
- ✅ Can switch languages
- ✅ Can write code
- ✅ Can run code
- ✅ Test cases pass/fail correctly
- ✅ Can submit solution
- ✅ Submission saves to history
- ✅ Can view editorial
- ✅ Can view solutions
- ✅ Can view submission history
- ✅ Theme toggle works
- ✅ Code auto-saves
- ✅ User progress tracks

---

## 🎉 You're Done!

If all tests pass, your Problems Section is production-ready!

**Next:** Add more problems, build Contest section, Game Room, etc.

Sab kuch sahi se compile ho raha hai! 🚀
