# WSL Ubuntu me Judge0 Complete Configuration

## 📁 Files jo WSL me banani hain

### 1. docker-compose.yml (~/judge0/docker-compose.yml)

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
      - /sys/fs/cgroup:/sys/fs/cgroup:rw
      - /var/run/docker.sock:/var/run/docker.sock
    cap_add:
      - SYS_ADMIN
    security_opt:
      - apparmor:unconfined

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
      - /sys/fs/cgroup:/sys/fs/cgroup:rw
      - /var/run/docker.sock:/var/run/docker.sock
    cap_add:
      - SYS_ADMIN
    security_opt:
      - apparmor:unconfined

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

### 2. judge0.conf (~/judge0/judge0.conf)

```bash
################################################################################
# Judge0 Configuration File
################################################################################

# PostgreSQL
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=judge0
POSTGRES_USER=judge0
POSTGRES_PASSWORD=judge0password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Judge0
JUDGE0_VERSION=1.13.0
JUDGE0_HOMEPAGE=https://judge0.com

# Maintenance
ENABLE_WAIT_RESULT=true
ENABLE_COMPILER_OPTIONS=true

# Security
ALLOW_ENABLE_NETWORK=false
ALLOW_ENABLE_PER_PROCESS_AND_THREAD_TIME_LIMIT=true
ALLOW_ENABLE_PER_PROCESS_AND_THREAD_MEMORY_LIMIT=true

# Limits
MAX_QUEUE_SIZE=100
MAX_CPU_TIME_LIMIT=15
MAX_CPU_EXTRA_TIME=5
MAX_WALL_TIME_LIMIT=20
MAX_MEMORY_LIMIT=512000
MAX_STACK_LIMIT=128000
MAX_PROCESSES_AND_OR_THREADS=60
MAX_FILE_SIZE=1024

# Timeouts
SUBMISSION_CACHE_DURATION=1h

# Isolate Configuration
ISOLATE_MAX_PROCESSES_AND_OR_THREADS=60
ISOLATE_MAX_MEMORY_LIMIT=512000
ISOLATE_MAX_STACK_LIMIT=128000
```

### 3. setup-cgroups.sh (~/judge0/setup-cgroups.sh)

```bash
#!/bin/bash

echo "🔧 Setting up cgroups for Judge0..."

# Create cgroup directories
sudo mkdir -p /sys/fs/cgroup/memory
sudo mkdir -p /sys/fs/cgroup/cpu
sudo mkdir -p /sys/fs/cgroup/cpuset
sudo mkdir -p /sys/fs/cgroup/devices
sudo mkdir -p /sys/fs/cgroup/freezer
sudo mkdir -p /sys/fs/cgroup/net_cls
sudo mkdir -p /sys/fs/cgroup/blkio
sudo mkdir -p /sys/fs/cgroup/perf_event
sudo mkdir -p /sys/fs/cgroup/hugetlb
sudo mkdir -p /sys/fs/cgroup/pids

# Mount cgroups v1
echo "📁 Mounting cgroups..."
sudo mount -t cgroup -o memory cgroup /sys/fs/cgroup/memory 2>/dev/null || echo "Memory cgroup already mounted"
sudo mount -t cgroup -o cpu cgroup /sys/fs/cgroup/cpu 2>/dev/null || echo "CPU cgroup already mounted"
sudo mount -t cgroup -o cpuset cgroup /sys/fs/cgroup/cpuset 2>/dev/null || echo "CPUSet cgroup already mounted"
sudo mount -t cgroup -o devices cgroup /sys/fs/cgroup/devices 2>/dev/null || echo "Devices cgroup already mounted"
sudo mount -t cgroup -o freezer cgroup /sys/fs/cgroup/freezer 2>/dev/null || echo "Freezer cgroup already mounted"
sudo mount -t cgroup -o net_cls cgroup /sys/fs/cgroup/net_cls 2>/dev/null || echo "Net_cls cgroup already mounted"
sudo mount -t cgroup -o blkio cgroup /sys/fs/cgroup/blkio 2>/dev/null || echo "Blkio cgroup already mounted"
sudo mount -t cgroup -o perf_event cgroup /sys/fs/cgroup/perf_event 2>/dev/null || echo "Perf_event cgroup already mounted"
sudo mount -t cgroup -o hugetlb cgroup /sys/fs/cgroup/hugetlb 2>/dev/null || echo "Hugetlb cgroup already mounted"
sudo mount -t cgroup -o pids cgroup /sys/fs/cgroup/pids 2>/dev/null || echo "Pids cgroup already mounted"

# Set permissions
echo "🔐 Setting permissions..."
sudo chmod 755 /sys/fs/cgroup/memory
sudo chmod 755 /sys/fs/cgroup/cpu
sudo chmod 755 /sys/fs/cgroup/cpuset
sudo chmod 755 /sys/fs/cgroup/devices
sudo chmod 755 /sys/fs/cgroup/freezer

# Initialize cpuset
echo "⚙️ Initializing cpuset..."
if [ -f /sys/fs/cgroup/cpuset/cpuset.cpus ]; then
    sudo sh -c 'echo 0 > /sys/fs/cgroup/cpuset/cpuset.cpus' 2>/dev/null || true
    sudo sh -c 'echo 0 > /sys/fs/cgroup/cpuset/cpuset.mems' 2>/dev/null || true
fi

# Check if everything is mounted
echo "✅ Checking cgroup mounts..."
mount | grep cgroup

echo "🎉 Cgroup setup complete!"
echo "📋 Available cgroups:"
ls -la /sys/fs/cgroup/
```

### 4. docker-daemon.json (~/judge0/docker-daemon.json)

```json
{
  "exec-opts": ["native.cgroupdriver=cgroupfs"],
  "cgroup-parent": "docker.slice",
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "default-runtime": "runc",
  "runtimes": {
    "runc": {
      "path": "runc"
    }
  }
}
```

### 5. start-judge0.sh (~/judge0/start-judge0.sh)

```bash
#!/bin/bash

echo "🚀 Starting Judge0 with proper configuration..."

# Setup cgroups first
./setup-cgroups.sh

# Copy docker daemon config
echo "🔧 Configuring Docker daemon..."
sudo cp docker-daemon.json /etc/docker/daemon.json

# Restart docker
echo "🔄 Restarting Docker..."
sudo systemctl restart docker
sleep 5

# Start Judge0 containers
echo "📦 Starting Judge0 containers..."
docker-compose down 2>/dev/null || true
docker-compose up -d

# Wait for containers to start
echo "⏳ Waiting for containers to initialize..."
sleep 15

# Check container status
echo "📊 Container status:"
docker ps

# Test Judge0
echo "🧪 Testing Judge0..."
sleep 5
curl -X POST http://localhost:2358/submissions?wait=true \
  -H "Content-Type: application/json" \
  -d '{"source_code":"console.log(\"Hello Judge0!\")","language_id":63}' \
  2>/dev/null | grep -q "Accepted" && echo "✅ Judge0 is working!" || echo "❌ Judge0 test failed"

echo "🎉 Setup complete! Judge0 should be running on http://localhost:2358"
```

## 🚀 WSL Ubuntu me Setup Commands

```bash
# 1. WSL me jao
wsl

# 2. Judge0 directory me jao
cd ~/judge0

# 3. Ye files banao (upar wali content copy karo)
nano docker-compose.yml
nano judge0.conf  
nano setup-cgroups.sh
nano docker-daemon.json
nano start-judge0.sh

# 4. Scripts ko executable banao
chmod +x setup-cgroups.sh
chmod +x start-judge0.sh

# 5. Judge0 start karo
./start-judge0.sh
```

## 🔧 Manual Steps (Agar script fail ho)

```bash
# 1. Cgroups setup
sudo ./setup-cgroups.sh

# 2. Docker config
sudo cp docker-daemon.json /etc/docker/daemon.json
sudo systemctl restart docker

# 3. Judge0 start
docker-compose down
docker-compose up -d

# 4. Test
curl -X POST http://localhost:2358/submissions?wait=true \
  -H "Content-Type: application/json" \
  -d '{"source_code":"console.log(\"test\")","language_id":63}'
```

## ✅ Success Check

Agar sab kaam kar gaya to ye response aana chahiye:
```json
{
  "stdout": "test\n",
  "status": {"id": 3, "description": "Accepted"}
}
```

Instead of:
```json
{
  "status": {"id": 13, "description": "Internal Error"}
}
```

---

**Ye sab files WSL Ubuntu me ~/judge0/ directory me banao aur start-judge0.sh run karo!**