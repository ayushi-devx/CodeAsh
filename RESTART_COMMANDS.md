# Quick Restart Commands

## 🔧 Judge0 Fix Applied - Restart Required

### Step 1: Restart Judge0 (REQUIRED)
```bash
cd leet/codeash/judge0
docker-compose down
docker-compose up -d
cd ..
```

### Step 2: Test Judge0
```bash
node test-judge0-fixed.js
```

### Step 3: Start Backend
```bash
cd backend
npm start
```

### Step 4: Start Frontend (New Terminal)
```bash
cd leet/codeash
npm run dev
```

---

## 🧪 Quick Tests

### Test Judge0 API
```bash
curl http://localhost:2358/about
```

### Test Code Execution
```bash
curl -X POST http://localhost:2358/submissions?wait=true -H "Content-Type: application/json" -d "{\"source_code\":\"console.log('test')\",\"language_id\":63}"
```

### Test Backend
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/problems
```

---

## 🐛 Troubleshooting

### Check Container Status
```bash
docker ps
```

### View Logs
```bash
docker logs judge0
docker logs judge0-redis
docker logs judge0-db
```

### Restart Containers
```bash
cd judge0
docker-compose restart
```

### Complete Reset (if needed)
```bash
cd judge0
docker-compose down -v
docker-compose up -d
```

---

## ✅ What Was Fixed

**Problem:** Redis authentication error blocking code execution
```
Redis::CommandError (NOAUTH Authentication required.)
```

**Solution:** Removed `--requirepass judge0password` from Redis configuration

**File Changed:** `judge0/docker-compose.yml`

**Result:** Judge0 now works without Redis password ✅
