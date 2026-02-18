# WSL Ubuntu me Judge0 Setup Guide

## 🎯 Steps to Setup Judge0 in WSL Ubuntu

### Step 1: WSL Ubuntu me jao
```bash
wsl
```

### Step 2: Project directory banao
```bash
mkdir -p ~/judge0
cd ~/judge0
```

### Step 3: docker-compose.yml file banao
```bash
nano docker-compose.yml
```

**File content (copy-paste karo):**
```yaml
version: '3.7'

services:
  judge0:
    image: judge0/judge0:1.13.0
    container_name: judge0
    privileged: true
    ports:
      - "2358:2358"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5432
      - POSTGRES_DB=judge0
      - POSTGRES_USER=judge0
      - POSTGRES_PASSWORD=judge0password
    depends_on:
      - db
      - redis
    restart: always

  workers:
    image: judge0/judge0:1.13.0
    command: ["./scripts/workers"]
    privileged: true
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5432
      - POSTGRES_DB=judge0
      - POSTGRES_USER=judge0
      - POSTGRES_PASSWORD=judge0password
    depends_on:
      - db
      - redis
    restart: always

  db:
    image: postgres:13.0
    container_name: judge0-db
    environment:
      - POSTGRES_DB=judge0
      - POSTGRES_USER=judge0
      - POSTGRES_PASSWORD=judge0password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:6.0
    container_name: judge0-redis
    command: redis-server
    volumes:
      - redis-data:/data
    restart: always

volumes:
  postgres-data:
  redis-data:
```

### Step 4: Judge0 start karo
```bash
docker-compose up -d
```

### Step 5: Containers check karo
```bash
docker ps
```
4 containers dikhne chahiye: judge0, judge0-workers-1, judge0-db, judge0-redis

### Step 6: Judge0 test karo
```bash
# About endpoint test
curl http://localhost:2358/about

# Code execution test
curl -X POST http://localhost:2358/submissions?wait=true \
  -H "Content-Type: application/json" \
  -d '{"source_code":"console.log(\"Hello WSL Judge0!\")","language_id":63}'
```

### Step 7: Port forwarding check karo
WSL se Windows me port forward hona chahiye automatically. Agar nahi ho raha:

```bash
# WSL me IP check karo
ip addr show eth0

# Windows me WSL IP use karo
# Example: http://172.x.x.x:2358
```

## 🔧 Windows Backend Configuration

Windows backend me WSL Judge0 use karne ke liye:

**backend/.env:**
```env
JUDGE0_LOCAL=true
JUDGE0_URL=http://localhost:2358
```

Agar port forwarding issue ho to:
```env
JUDGE0_LOCAL=true
JUDGE0_URL=http://172.x.x.x:2358  # WSL IP
```

## 🧪 Testing

### WSL me test:
```bash
curl http://localhost:2358/about
```

### Windows me test:
```powershell
curl http://localhost:2358/about
```

### Backend test:
```bash
cd backend
npm start
```

### Frontend test:
```bash
npm run dev
```

## 🐛 Troubleshooting

### Port forwarding issue:
```bash
# WSL me
netstat -tlnp | grep 2358

# Windows me
netstat -an | findstr 2358
```

### Docker not running:
```bash
sudo service docker start
```

### Containers not starting:
```bash
docker-compose logs judge0
docker-compose logs judge0-redis
```

## ✅ Success Criteria

- [ ] WSL me 4 containers running
- [ ] `curl http://localhost:2358/about` working in WSL
- [ ] `curl http://localhost:2358/about` working in Windows
- [ ] Backend connecting to Judge0
- [ ] Code execution working in browser

---

**Next:** WSL me ye commands run karo aur batao kya output aata hai!