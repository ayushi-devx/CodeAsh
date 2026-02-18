# CodeAsh Backend API

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your credentials

# Seed database with sample problems
node seedData.js

# Start development server
npm run dev
```

## API Endpoints

### Problems
- `GET /api/problems` - Get all problems with filters
- `GET /api/problems/:slug` - Get single problem
- `GET /api/problems/stats` - Get user statistics
- `POST /api/problems/:id/bookmark` - Toggle bookmark

### Submissions
- `POST /api/submissions/run` - Run code with test cases
- `POST /api/submissions/submit` - Submit solution

## Query Parameters for GET /api/problems

```
?search=two sum
&difficulty=Easy
&tags=Array,Hash Table
&companies=Google,Amazon
&sortBy=mostSolved
&page=1
&limit=50
```

## Example Request

```javascript
// Run Code
POST /api/submissions/run
{
  "code": "function twoSum(nums, target) { return [0,1]; }",
  "language": "javascript",
  "problemId": "507f1f77bcf86cd799439011",
  "customInput": "[2,7,11,15]\n9"
}

// Submit Code
POST /api/submissions/submit
Headers: { Authorization: "Bearer <token>" }
{
  "code": "function twoSum(nums, target) { ... }",
  "language": "javascript",
  "problemId": "507f1f77bcf86cd799439011"
}
```

## Response Format

```javascript
{
  "success": true,
  "data": {
    "results": [
      {
        "input": "[2,7,11,15]\n9",
        "expectedOutput": "[0,1]",
        "actualOutput": "[0,1]",
        "passed": true,
        "runtime": "0.02",
        "memory": "512",
        "status": "Accepted"
      }
    ],
    "passed": 3,
    "total": 3,
    "allPassed": true
  }
}
```

## Judge0 Language IDs

- JavaScript (Node.js): 63
- Python: 71
- Java: 62
- C++: 54
- C: 50

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeash
JWT_SECRET=your_secret_key

# Judge0 Configuration (Local Docker - Recommended)
JUDGE0_LOCAL=true
JUDGE0_URL=http://localhost:2358

# OR use RapidAPI (Alternative)
# JUDGE0_LOCAL=false
# JUDGE0_API_KEY=your_rapidapi_key
# JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

## Judge0 Setup (Local Docker)

### ✅ Redis Fix Applied
The Redis authentication issue has been fixed. Judge0 now works without Redis password.

### Start Judge0
```bash
cd ../judge0
docker-compose down
docker-compose up -d
```

### Verify Judge0 is Running
```bash
# Check containers
docker ps

# Test API
curl http://localhost:2358/about

# Test code execution
curl -X POST http://localhost:2358/submissions?wait=true ^
  -H "Content-Type: application/json" ^
  -d "{\"source_code\":\"console.log('test')\",\"language_id\":63}"
```

### Troubleshooting
If you get errors, check logs:
```bash
docker logs judge0
docker logs judge0-redis
```

See `../judge0/REDIS_FIX.md` for detailed troubleshooting.

## Database Collections

- `problems` - All coding problems
- `users` - User accounts and progress
- `submissions` - Embedded in users

## Testing

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test get problems
curl http://localhost:5000/api/problems

# Test get single problem
curl http://localhost:5000/api/problems/two-sum

```

