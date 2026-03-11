# 🗄️ Data Storage - Complete Explanation

## 📊 Two Different Databases

### 1️⃣ Judge0 PostgreSQL (AWS Server)
**Purpose**: Temporary code execution data
**Location**: AWS EC2 (100.53.209.86)
**Lifetime**: Temporary (auto-deleted after some time)

### 2️⃣ Your MongoDB (Local)
**Purpose**: Permanent user & submission data
**Location**: localhost:27017
**Lifetime**: Permanent

---

## 🔄 Complete Data Flow

```
USER SUBMITS CODE
       ↓
┌──────────────────────────────────────────────────────────┐
│  STEP 1: Backend Receives Submission                     │
│  - Code, Language, Problem ID                            │
│  - User ID (from JWT)                                    │
└──────────────────────────────────────────────────────────┘
       ↓
┌──────────────────────────────────────────────────────────┐
│  STEP 2: Send to Judge0 for Execution                    │
│                                                           │
│  Backend → AWS Judge0 PostgreSQL                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Judge0 PostgreSQL (Temporary Storage)          │    │
│  │  ─────────────────────────────────────────      │    │
│  │  {                                               │    │
│  │    token: "abc123...",                           │    │
│  │    source_code: "base64...",                     │    │
│  │    language_id: 63,                              │    │
│  │    stdin: "base64...",                           │    │
│  │    status: { id: 1, description: "In Queue" }   │    │
│  │  }                                               │    │
│  │                                                  │    │
│  │  ⏱️ Stored temporarily (few minutes)            │    │
│  │  🗑️ Auto-deleted after retrieval                │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
       ↓
┌──────────────────────────────────────────────────────────┐
│  STEP 3: Judge0 Executes Code                            │
│  - Creates sandbox                                       │
│  - Runs code                                             │
│  - Captures output                                       │
│  - Updates PostgreSQL with result                        │
└──────────────────────────────────────────────────────────┘
       ↓
┌──────────────────────────────────────────────────────────┐
│  STEP 4: Backend Polls for Result                        │
│  - Gets result from Judge0 PostgreSQL                    │
│  - Decodes output                                        │
│  - Compares with expected output                         │
└──────────────────────────────────────────────────────────┘
       ↓
┌──────────────────────────────────────────────────────────┐
│  STEP 5: Save to YOUR MongoDB (PERMANENT)                │
│                                                           │
│  Your MongoDB (Permanent Storage)                        │
│  ┌─────────────────────────────────────────────────┐    │
│  │  users collection                                │    │
│  │  ─────────────────                               │    │
│  │  {                                               │    │
│  │    _id: "user123",                               │    │
│  │    name: "John Doe",                             │    │
│  │    email: "john@example.com",                    │    │
│  │                                                  │    │
│  │    // ✅ YOUR SUBMISSION DATA (PERMANENT)        │    │
│  │    submissions: [                                │    │
│  │      {                                           │    │
│  │        problemId: "problem123",                  │    │
│  │        language: "javascript",                   │    │
│  │        code: "function twoSum(nums, target)...", │    │
│  │        status: "Accepted",                       │    │
│  │        runtime: 0.123,                           │    │
│  │        memory: 15.5,                             │    │
│  │        submittedAt: "2024-01-15T10:30:00Z"      │    │
│  │      },                                          │    │
│  │      // ... more submissions                     │    │
│  │    ],                                            │    │
│  │                                                  │    │
│  │    // ✅ SOLVED PROBLEMS (PERMANENT)             │    │
│  │    solvedProblems: [                             │    │
│  │      {                                           │    │
│  │        problemId: "problem123",                  │    │
│  │        language: "javascript",                   │    │
│  │        runtime: 0.123                            │    │
│  │      }                                           │    │
│  │    ],                                            │    │
│  │                                                  │    │
│  │    // ✅ STATISTICS (PERMANENT)                  │    │
│  │    totalSubmissions: 45,                         │    │
│  │    acceptedSubmissions: 32,                      │    │
│  │    currentStreak: 5,                             │    │
│  │    languageStats: {                              │    │
│  │      javascript: 20,                             │    │
│  │      python: 12                                  │    │
│  │    }                                             │    │
│  │  }                                               │    │
│  │                                                  │    │
│  │  💾 Stored permanently                           │    │
│  │  ♾️ Never auto-deleted                           │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  problems collection                                     │
│  ┌─────────────────────────────────────────────────┐    │
│  │  {                                               │    │
│  │    _id: "problem123",                            │    │
│  │    title: "Two Sum",                             │    │
│  │                                                  │    │
│  │    // ✅ PROBLEM STATISTICS (PERMANENT)          │    │
│  │    totalSubmissions: 1000,                       │    │
│  │    totalAccepted: 452,                           │    │
│  │    acceptanceRate: 45.2                          │    │
│  │  }                                               │    │
│  │                                                  │    │
│  │  💾 Stored permanently                           │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
       ↓
┌──────────────────────────────────────────────────────────┐
│  STEP 6: Return Result to Frontend                       │
│  - Show test results                                     │
│  - Update UI                                             │
└──────────────────────────────────────────────────────────┘
```

---

## 📋 What Gets Stored Where?

### Judge0 PostgreSQL (Temporary)
```javascript
// ⏱️ TEMPORARY - Auto-deleted
{
  token: "abc123-def456-ghi789",
  source_code: "ZnVuY3Rpb24gdHdvU3VtKG51bXMsIHRhcmdldCkgeyAuLi4gfQ==",
  language_id: 63,
  stdin: "MiA3IDExIDE1CjkK",
  stdout: "MCAxCg==",
  stderr: null,
  compile_output: null,
  time: "0.123",
  memory: 15360,
  status: {
    id: 3,
    description: "Accepted"
  },
  created_at: "2024-01-15 10:30:00",
  finished_at: "2024-01-15 10:30:01"
}

// 🗑️ This data is deleted after:
// - Backend retrieves the result
// - Or after a few hours/days (Judge0 cleanup)
```

### Your MongoDB (Permanent)
```javascript
// 💾 PERMANENT - Never deleted (unless you delete)

// User Document
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  password: "$2b$10$hashed...",
  
  // ✅ ALL YOUR SUBMISSIONS (PERMANENT)
  submissions: [
    {
      problemId: ObjectId("507f1f77bcf86cd799439012"),
      language: "javascript",
      code: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
      status: "Accepted",
      runtime: 0.123,
      memory: 15.5,
      submittedAt: ISODate("2024-01-15T10:30:00Z")
    },
    {
      problemId: ObjectId("507f1f77bcf86cd799439013"),
      language: "python",
      code: "def two_sum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []",
      status: "Wrong Answer",
      runtime: 0.098,
      memory: 12.3,
      submittedAt: ISODate("2024-01-15T11:00:00Z")
    }
    // ... all your submissions forever
  ],
  
  // ✅ SOLVED PROBLEMS (PERMANENT)
  solvedProblems: [
    {
      problemId: ObjectId("507f1f77bcf86cd799439012"),
      language: "javascript",
      runtime: 0.123,
      solvedAt: ISODate("2024-01-15T10:30:00Z")
    }
  ],
  
  // ✅ STATISTICS (PERMANENT)
  totalSubmissions: 45,
  acceptedSubmissions: 32,
  currentStreak: 5,
  longestStreak: 12,
  languageStats: {
    javascript: 20,
    python: 12,
    cpp: 8,
    java: 5
  },
  
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-01-15T11:00:00Z")
}

// Problem Document
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  title: "Two Sum",
  slug: "two-sum",
  
  // ✅ PROBLEM STATISTICS (PERMANENT)
  totalSubmissions: 1000,
  totalAccepted: 452,
  acceptanceRate: 45.2,
  
  // ... other problem data
}
```

---

## 🔍 Key Differences

| Feature | Judge0 PostgreSQL | Your MongoDB |
|---------|------------------|--------------|
| **Purpose** | Code execution | User data storage |
| **Location** | AWS EC2 | localhost:27017 |
| **Data Type** | Execution results | User submissions |
| **Lifetime** | Temporary (minutes/hours) | Permanent (forever) |
| **Contains** | Token, output, status | Code, user info, stats |
| **Auto-delete** | ✅ Yes | ❌ No |
| **Accessible** | Only during execution | Always |
| **Backup** | Not needed | Should be backed up |

---

## 💡 Why Two Databases?

### Judge0 PostgreSQL
- **Fast execution tracking**: Temporary storage for quick lookups
- **Stateless**: Each execution is independent
- **Auto-cleanup**: Saves storage space
- **Scalable**: Can handle millions of executions

### Your MongoDB
- **User history**: Keep all submissions forever
- **Progress tracking**: Track user improvement over time
- **Analytics**: Generate statistics and insights
- **Persistence**: Data never lost

---

## 🔐 What Code is Saved?

### In Judge0 PostgreSQL (Temporary)
```javascript
// Base64 encoded (temporary)
source_code: "ZnVuY3Rpb24gdHdvU3VtKG51bXMsIHRhcmdldCkgeyAuLi4gfQ=="

// Decoded (not stored, just for execution)
function twoSum(nums, target) { ... }
```

### In Your MongoDB (Permanent)
```javascript
// Plain text (permanent)
code: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}"
```

---

## 📊 Code in submissionController.js

### Where MongoDB Save Happens
```javascript
// Line ~320-340 in submissionController.js

// Add to submission history (MONGODB - PERMANENT)
user.submissions.push({
  problemId,           // Which problem
  language,            // Which language
  code,                // YOUR ACTUAL CODE (PERMANENT)
  status: finalStatus, // Accepted/Wrong Answer/etc
  runtime: totalRuntime / totalCount,
  memory: maxMemory
});

await user.save(); // ✅ SAVED TO MONGODB PERMANENTLY

// Update problem statistics (MONGODB - PERMANENT)
problem.totalSubmissions += 1;
if (allPassed) {
  problem.totalAccepted += 1;
  problem.acceptanceRate = ((problem.totalAccepted / problem.totalSubmissions) * 100).toFixed(1);
}
await problem.save(); // ✅ SAVED TO MONGODB PERMANENTLY
```

---

## 🎯 Summary

### Judge0 PostgreSQL (AWS)
- ⏱️ **Temporary** execution data
- 🔄 Used only during code execution
- 🗑️ Auto-deleted after retrieval
- 🚀 Fast and scalable
- 📍 Location: AWS EC2

### Your MongoDB (Local)
- 💾 **Permanent** user data
- 📝 All submissions saved forever
- 📊 User statistics and progress
- 🔒 Your data, your control
- 📍 Location: localhost:27017

**Conclusion**: Tumhara code aur submission data **permanently** tumhare **MongoDB** mein save ho raha hai. Judge0 ka PostgreSQL sirf execution ke time temporary data store karta hai! 🎉