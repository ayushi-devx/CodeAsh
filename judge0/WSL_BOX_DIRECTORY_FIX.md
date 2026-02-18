# WSL Judge0 /box Directory Fix

## 🔍 Current Error Analysis

Error: `No such file or directory @ rb_sysopen - /box/script.js`

**Problem**: Judge0 container ke andar `/box` directory create nahi ho pa rahi hai isolation ke liye.

## 🛠️ Complete Fix

### 1. Updated docker-compose.yml

WSL me `~/judge0/docker-compose.yml` ko replace karo:

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
      - ENABLE_WAIT_RESULT=true
      - ENABLE_COMPILER_OPTIONS=true
    depends_on:
      - db
      - redis
    restart: always
    volumes:
      - /sys/fs/cgroup:/sys/fs/cgroup:ro
      - /tmp:/tmp:rw
      - judge0-tmp:/tmp:rw
      - judge0-box:/box:rw
    tmpfs:
      - /run
      - /tmp
    cap_add:
      - SYS_ADMIN
      - DAC_OVERRIDE
      - SETUID
      - SETGID
    security_opt:
      - apparmor:unconfined
      - seccomp:unconfined
    sysctls:
      - kernel.unprivileged_userns_clone=1

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
      - ENABLE_WAIT_RESULT=true
      - ENABLE_COMPILER_OPTIONS=true
    depends_on:
      - db
      - redis
    restart: always
    volumes:
      - /sys/fs/cgroup:/sys/fs/cgroup:ro
      - /tmp:/tmp:rw
      - judge0-tmp:/tmp:rw
      - judge0-box:/box:rw
    tmpfs:
      - /run
      - /tmp
    cap_add:
      - SYS_ADMIN
      - DAC_OVERRIDE
      - SETUID
      - SETGID
    security_opt:
      - apparmor:unconfined
      - seccomp:unconfined
    sysctls:
      - kernel.unprivileged_userns_clone=1

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
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    restart: always

volumes:
  postgres-data:
  redis-data:
  judge0-tmp:
  judge0-box:
```

### 2. Pre-setup Script

`~/judge0/fix-judge0.sh` banao:

```bash
#!/bin/bash

echo "🔧 Fixing Judge0 /box directory issue..."

# Stop containers
docker-compose down

# Remove old volumes
docker volume rm judge0_judge0-tmp 2>/dev/null || true
docker volume rm judge0_judge0-box 2>/dev/null || true

# Create host directories for mounting
sudo mkdir -p /tmp/judge0-box
sudo mkdir -p /tmp/judge0-tmp
sudo chmod 777 /tmp/judge0-box
sudo chmod 777 /tmp/judge0-tmp

# Enable user namespaces
echo 'kernel.unprivileged_userns_clone=1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Start containers
docker-compose up -d

# Wait for startup
echo "⏳ Waiting for containers to start..."
sleep 20

# Create /box directory inside container
echo "📁 Creating /box directory in container..."
docker exec -u root judge0 mkdir -p /box
docker exec -u root judge0 chmod 777 /box
docker exec -u root judge0 chown judge0:judge0 /box

# Test
echo "🧪 Testing Judge0..."
sleep 5
curl -X POST http://localhost:2358/submissions?wait=true \
  -H "Content-Type: application/json" \
  -d '{"source_code":"console.log(\"Hello Judge0!\")","language_id":63}' \
  | grep -q "Accepted" && echo "✅ Judge0 is working!" || echo "❌ Still having issues"

echo "🎉 Fix applied!"
```

### 3. Alternative: Use Judge0 Extra CE

Agar upar ka fix kaam nahi kare to Judge0 Extra CE use karo:

`~/judge0/docker-compose-extra.yml`:

```yaml
version: '3.7'

services:
  judge0:
    image: judge0/judge0:1.13.0-extra
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
    image: judge0/judge0:1.13.0-extra
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
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    restart: always

volumes:
  postgres-data:
  redis-data:
```

## 🚀 WSL me Commands

### Option 1: Main Fix
```bash
cd ~/judge0

# Replace docker-compose.yml with updated version above
nano docker-compose.yml

# Create fix script
nano fix-judge0.sh
chmod +x fix-judge0.sh

# Run fix
./fix-judge0.sh
```

### Option 2: Judge0 Extra CE
```bash
cd ~/judge0

# Use extra CE version
docker-compose -f docker-compose-extra.yml down
docker-compose -f docker-compose-extra.yml up -d

# Test
sleep 20
curl -X POST http://localhost:2358/submissions?wait=true \
  -H "Content-Type: application/json" \
  -d '{"source_code":"console.log(\"test\")","language_id":63}'
```

### Option 3: Manual Container Fix
```bash
# Start containers normally
docker-compose up -d
sleep 15

# Fix /box directory manually
docker exec -u root judge0 mkdir -p /box
docker exec -u root judge0 chmod 777 /box
docker exec -u root judge0 ls -la /box

# Test
curl -X POST http://localhost:2358/submissions?wait=true \
  -H "Content-Type: application/json" \
  -d '{"source_code":"console.log(\"test\")","language_id":63}'
```

## 🎯 Expected Result

After fix, response should be:
```json
{
  "stdout": "test\n",
  "time": "0.001",
  "memory": 2048,
  "status": {"id": 3, "description": "Accepted"}
}
```

---

**Try Option 3 first (manual fix) - sabse simple hai!**