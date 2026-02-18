# 🧪 CodeAsh Testing Guide

## ✅ System Status

- ✅ Judge0 Running (http://localhost:2358)
- ✅ Backend Running (http://localhost:5000)
- ✅ Frontend Running (http://localhost:5174)
- ✅ MongoDB Connected
- ✅ 3 Sample Problems Loaded

## 🎯 Test Scenarios

### 1. User Authentication

**Test Signup:**
1. Go to http://localhost:5174
2. Complete intro animation
3. Fill signup form:
   - First Name: Test User
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
4. Click "Create Account"
5. Watch connecting animation
6. ✅ Should redirect to dashboard

**Test Login:**
- User data saved in localStorage
- Refresh page → Should stay logged in
- Logout → Should redirect to home

### 2. Problems List

**Test Filters:**
1. Click "Problems" in navbar
2. ✅ Should see 3 problems
3. Test search: Type "two"
   - ✅ Should show "Two Sum"
4. Test difficulty filter: Select "Easy"
   - ✅ Should show only Easy problems
5. Test sort: Select "Acceptance"
   - ✅ Problems sorted by acceptance rate

**Test Advanced Filters:**
1. Click "Filters" button
2. Select tags: "Array", "Hash Table"
   - ✅ Should filter by tags
3. Select companies: "Amazon", "Google"
   - ✅ Should filter by companies
4. Click "Clear All Filters"
   - ✅ Should reset filters

### 3. Code Editor

**Test Editor Loading:**
1. Click "Two Sum" problem
2. ✅ Monaco editor should load
3. ✅ Starter code should appear
4. ✅ Problem description on left
5. ✅ Editor on right

**Test Language Switch:**
1. Change language dropdown
2. ✅ Starter code should change
3. Test languages:
   - JavaScript ✅
   - Python ✅
   - Java ✅
   - C++ ✅
   - C ✅

**Test Theme Toggle:**
1. Click Sun/Moon icon
2. ✅ Should switch between light/dark
3. ✅ Editor theme should change

### 4. Code Execution

**Test Run Code (Success):**

JavaScript:
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

1. Paste code
2. Click "Run"
3. ✅ Should show "3/3 test cases passed"
4. ✅ Each test case should show:
   - Input
   - Expected Output
   - Your Output
   - Runtime
   - Memory

**Test Run Code (Compilation Error):**

JavaScript:
```javascript
function twoSum(nums, target) {
    return [0, 1  // Missing closing bracket
}
```

1. Paste code
2. Click "Run"
3. ✅ Should show "Compilation Error"
4. ✅ Error message should display

**Test Run Code (Runtime Error):**

JavaScript:
```javascript
function twoSum(nums, target) {
    return nums[100].toString(); // Array out of bounds
}
```

1. Paste code
2. Click "Run"
3. ✅ Should show "Runtime Error"
4. ✅ Error details should display

**Test Run Code (Wrong Answer):**

JavaScript:
```javascript
function twoSum(nums, target) {
    return [0, 0]; // Wrong answer
}
```

1. Paste code
2. Click "Run"
3. ✅ Should show "1/3 test cases passed" or similar
4. ✅ Failed test case should show expected vs actual

### 5. Custom Input

**Test Custom Input:**
1. Click "Custom Input" tab
2. Enter: `[2,7,11,15]\n9`
3. Click "Run"
4. ✅ Should execute with custom input
5. ✅ Should show output

### 6. Submit Code

**Test Submit (Accepted):**
1. Write correct solution
2. Click "Submit"
3. ✅ Should run all test cases (including hidden)
4. ✅ Should show "Accepted" status
5. ✅ Problem should mark as "Solved" (green checkmark)
6. ✅ Streak should update

**Test Submit (Wrong Answer):**
1. Write incorrect solution
2. Click "Submit"
3. ✅ Should show "Wrong Answer"
4. ✅ Should show which test case failed
5. ✅ Problem should mark as "Attempted" (yellow circle)

### 7. Progress Tracking

**Test Statistics:**
1. Go to Problems list
2. ✅ Should show:
   - Total solved count
   - Easy/Medium/Hard breakdown
   - Progress bar
   - Acceptance rate

**Test Streak:**
1. Solve a problem
2. ✅ Streak should increase
3. Check next day
4. ✅ Streak should continue if solved
5. ✅ Streak should reset if missed

### 8. Bookmarks

**Test Bookmark:**
1. Click bookmark icon on problem
2. ✅ Icon should fill with yellow
3. Refresh page
4. ✅ Bookmark should persist

### 9. Auto-Save

**Test Auto-Save:**
1. Write code in editor
2. Wait 1 second
3. Refresh page
4. Open same problem
5. ✅ Code should be restored

### 10. Responsive Design

**Test Mobile View:**
1. Open DevTools (F12)
2. Toggle device toolbar
3. Select mobile device
4. ✅ Layout should stack vertically
5. ✅ All features should work

## 🐛 Common Issues & Solutions

### Issue: Code execution timeout
**Solution:** Judge0 first run is slow. Wait 2-3 seconds.

### Issue: "Cannot connect to server"
**Solution:** Check backend is running on port 5000

### Issue: Problems not loading
**Solution:** Run `node seedData.js` in backend folder

### Issue: Editor not loading
**Solution:** Check browser console for errors

### Issue: Test results not showing
**Solution:** Check Judge0 is running: `curl http://localhost:2358/about`

## 📊 Performance Benchmarks

**Expected Performance:**
- Page Load: < 2 seconds
- Code Execution: 1-3 seconds
- API Response: < 100ms
- Editor Load: < 1 second

## ✅ Acceptance Criteria

All tests should pass:
- [ ] User can sign up
- [ ] User can log in
- [ ] Problems list loads
- [ ] Filters work
- [ ] Search works
- [ ] Editor loads
- [ ] Code executes
- [ ] Test results display
- [ ] Submit works
- [ ] Progress tracks
- [ ] Bookmarks work
- [ ] Auto-save works
- [ ] Theme toggle works
- [ ] Responsive design works

## 🎉 Success Indicators

✅ All 3 sample problems can be solved
✅ Code execution works in all 5 languages
✅ Compilation errors display correctly
✅ Runtime errors display correctly
✅ Progress tracking updates
✅ Streak counter works
✅ UI is responsive and smooth

---

**Test everything and report any issues! 🚀**
