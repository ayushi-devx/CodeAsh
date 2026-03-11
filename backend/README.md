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

## Judge0 Setup (AWS EC2 Production Server)

### ✅ Current Configuration
Your Judge0 server is running on AWS EC2 Ubuntu at `http://100.53.209.86:2358`

**Supported Languages (22+):**
- JavaScript (Node.js 12.14.0) - ID: 63
- Python (3.8.1) - ID: 71
- Java (OpenJDK 13.0.1) - ID: 62
- C++ (GCC 9.2.0) - ID: 54
- C (GCC 9.2.0) - ID: 50
- C# (Mono 6.6.0.161) - ID: 51
- Go (1.13.5) - ID: 60
- Rust (1.40.0) - ID: 73
- Kotlin (1.3.70) - ID: 78
- Swift (5.2.3) - ID: 83
- TypeScript (3.7.4) - ID: 74
- PHP (7.4.1) - ID: 68
- Ruby (2.7.0) - ID: 72
- And 10+ more languages...

### Backend Configuration

**backend/.env:**
```env
# AWS EC2 Judge0 Server (Production)
JUDGE0_LOCAL=true
JUDGE0_URL=http://100.53.209.86:2358
ENABLE_FALLBACK_EXECUTOR=false
```

### Benefits of AWS Judge0:
- ✅ **22+ Programming Languages** - Full language support
- ✅ **Production Grade** - Proper isolation and security
- ✅ **Scalable** - Handle multiple concurrent executions
- ✅ **Reliable** - Linux environment with proper cgroups
- ✅ **Fast** - Dedicated server resources

### Testing AWS Judge0

```bash
# Test from your local machine
curl http://100.53.209.86:2358/about

# Test code execution
curl -X POST http://100.53.209.86:2358/submissions?wait=true \
  -H "Content-Type: application/json" \
  -d '{"source_code":"console.log(\"Hello AWS Judge0\")","language_id":63}'
```

### AWS Server Management

**SSH to your EC2 instance:**
```bash
ssh -i your-key.pem ubuntu@100.53.209.86
```

**Check Judge0 status:**
```bash
cd ~/judge0
docker ps
docker-compose logs judge0-server-1
```

**Restart if needed:**
```bash
docker-compose restart
```

### Troubleshooting

**If Judge0 fails:**
1. Backend automatically uses fallback executor for JavaScript/Python/Go
2. Check AWS EC2 instance resources (CPU/Memory)
3. Verify Security Group allows port 2358
4. Check Judge0 container logs

**AWS Security Group Requirements:**
- Inbound Rule: Port 2358, Source: 0.0.0.0/0 (or your IP range)
- Outbound Rules: All traffic allowed

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

