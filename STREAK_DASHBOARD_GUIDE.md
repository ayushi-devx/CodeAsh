# Streak Dashboard - Complete Guide

## Overview
The Streak Dashboard provides a comprehensive view of your coding activity, similar to LeetCode's profile page with GitHub-style activity tracking.

## Features Implemented

### 1. Streak Cards
- **Current Streak**: Shows your current consecutive days of solving problems
- **Longest Streak**: Your best streak ever achieved
- **Total Active Days**: Total number of unique days you've solved problems

### 2. Activity Heatmap
- GitHub-style contribution graph showing 52 weeks of activity
- Color-coded by submission count:
  - White/Gray: No submissions
  - Light Green: 1-2 submissions
  - Medium Green: 3-5 submissions
  - Dark Green: 6-10 submissions
  - Bright Green: 10+ submissions
- Hover to see exact date and submission count

### 3. Solved Problems Breakdown
- Total problems solved
- Breakdown by difficulty:
  - Easy (Green)
  - Medium (Yellow)
  - Hard (Red)

### 4. Submission Statistics
- Total submissions count
- Accepted submissions count
- Acceptance rate with visual progress bar

### 5. Language Statistics
- Shows how many problems you've solved in each language
- Dynamically updates based on your submissions

### 6. Recent Activity
- Lists your 5 most recently solved problems
- Shows language used and runtime

## How It Works

### Data Flow
1. User navigates to Streak Dashboard
2. Frontend fetches user data from `/api/auth/profile`
3. Backend returns complete user object with:
   - `currentStreak`: Current consecutive days
   - `longestStreak`: Best streak achieved
   - `solvedProblems`: Array with problemId, language, runtime, difficulty
   - `submissions`: Complete submission history
   - `totalSubmissions`: Total count
   - `acceptedSubmissions`: Accepted count
   - `languageStats`: Submissions per language

### Streak Calculation
Streaks are automatically updated when you solve a problem:
- First solve: `currentStreak = 1`, `longestStreak = 1`
- Consecutive day: `currentStreak++`, update `longestStreak` if needed
- Missed day: `currentStreak = 1` (streak broken)
- Same day: No change (already counted)

### Heatmap Generation
- Generates 52 weeks (364 days) of data
- Groups submissions by date
- Assigns color level based on submission count
- Displays in grid format with month labels

## Database Schema Updates

### User Model Changes
```javascript
// Added fields
currentStreak: Number (default: 0)
longestStreak: Number (default: 0)

// Updated solvedProblems schema
solvedProblems: [{
  problemId: ObjectId,
  solvedAt: Date,
  language: String,
  runtime: Number,
  difficulty: String  // NEW: Easy/Medium/Hard
}]
```

### Submission Controller Updates
- Now stores `difficulty` when adding to `solvedProblems`
- Calls `user.updateStreak()` on first solve of a problem
- Updates `longestStreak` automatically

## API Endpoints

### GET /api/auth/profile
Returns complete user profile with all statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "firstName": "John",
    "email": "john@example.com",
    "currentStreak": 5,
    "longestStreak": 12,
    "solvedProblems": [...],
    "submissions": [...],
    "totalSubmissions": 45,
    "acceptedSubmissions": 32,
    "languageStats": {
      "javascript": 15,
      "python": 10,
      "cpp": 7
    }
  }
}
```

## Testing the Feature

### 1. Start the Backend
```bash
cd backend
npm start
```

### 2. Start the Frontend
```bash
npm run dev
```

### 3. Navigate to Streak Dashboard
- Login to your account
- Click on "Streak" in the navigation bar
- You should see your activity dashboard

### 4. Test Streak Updates
- Solve a problem today → `currentStreak` should increase
- Solve another problem tomorrow → Streak continues
- Skip a day → Streak resets to 1

### 5. Verify Heatmap
- Submit multiple problems on different days
- Check the heatmap for color changes
- Hover over squares to see submission counts

## UI Components

### Color Scheme
- Background: `#0a0a0a` (dark)
- Cards: `#1a1a1a` with white/5 border
- Accent colors:
  - Orange/Red: Current streak
  - Yellow/Orange: Longest streak
  - Green/Emerald: Total active days
  - Green shades: Heatmap levels

### Animations
- Cards fade in with stagger effect (framer-motion)
- Smooth transitions on hover
- Progress bar animation for acceptance rate

### Icons (lucide-react)
- Flame: Current streak
- Trophy: Longest streak, solved problems
- Calendar: Total active days
- TrendingUp: Submission stats
- Code2: Language stats
- CheckCircle2: Recent activity

## Troubleshooting

### Issue: Streak not updating
**Solution:** Check if `user.updateStreak()` is being called in submission controller

### Issue: Heatmap shows no data
**Solution:** Ensure you have submissions in the database with valid dates

### Issue: Difficulty breakdown shows 0
**Solution:** Re-submit problems after the schema update to store difficulty

### Issue: Language stats empty
**Solution:** Check if `languageStats` object exists in User model

## Future Enhancements
- Weekly/Monthly activity charts
- Comparison with friends
- Streak freeze feature (1 day grace period)
- Achievements and badges
- Problem category breakdown
- Time-based analytics (best solving time)

## Files Modified
1. `src/components/Dashboard/Streak/StreakDashboard.jsx` - Main component
2. `src/components/Dashboard/Dashboard.jsx` - Added route
3. `backend/models/User.js` - Added currentStreak, longestStreak, difficulty
4. `backend/controllers/submissionController.js` - Store difficulty on solve
5. `backend/routes/authRoutes.js` - Added /profile alias

## Conclusion
The Streak Dashboard is now fully functional and dynamically updates based on your coding activity. All statistics are calculated in real-time from your MongoDB data.
