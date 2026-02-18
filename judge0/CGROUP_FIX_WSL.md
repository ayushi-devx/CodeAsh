# WSL Ubuntu me Cgroup Configuration Fix

## 🔍 Current Issue

Judge0 ko cgroups v1 chahiye hote hain code execution ke liye, lekin WSL2 me by default cgroups v2 hote hain ya properly configured nahi hote.

## 🛠️ WSL Ubuntu me Cgroup Fix

### Step 1: WSL Ubuntu me jao
```bash
wsl
```

### Step 2: Current cgroup version check karo
```bash
# Check cgroup version
mount | grep cgroup

# Check if cgroups v1 available
ls -la /sys/fs/cgroup/

# Check memory cgroup
ls -la /sys/fs/cgroup/memory/
```

### Step 3: Cgroups v1 enable karo

**Option A: Kernel parameters update (Recommended)**
```bash
# Edit grub config
sudo nano /etc/default/grub

# Add this line (or modify existing GRUB_CMDLINE_LINUX_DEFAULT):
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash systemd.unified_cgroup_hierarchy=false"

# Update grub
sudo update-grub

# Reboot WSL
exit
# From Windows PowerShell:
wsl --shutdown
wsl
```

**Option B: Systemd configuration**
```bash
# Create systemd override
sudo mkdir -p /etc/systemd/system.conf.d/
sudo nano /etc/systemd/system.conf.d/cgroup.conf

# Add content:
[Manager]
DefaultCPUAccounting=yes
DefaultMemoryAccounting=yes
DefaultTasksAccounting=yes
```

### Step 4: Manual cgroup mount (if needed)
```bash
# Create cgroup directories
sudo mkdir -p /sys/fs/cgroup/memory
sudo mkdir -p /sys/fs/cgroup/cpu
sudo mkdir -p /sys/fs/cgroup/cpuset

# Mount cgroups v1
sudo mount -t cgroup -o memory cgroup /sys/fs/cgroup/memory
sudo mount -t cgroup -o cpu cgroup /sys/fs/cgroup/cpu
sudo mount -t cgroup -o cpuset cgroup /sys/fs/cgroup/cpuset

# Check if mounted
mount | grep cgroup
```

### Step 5: Docker configuration update
```bash
# Edit docker daemon config
sudo nano /etc/docker/daemon.json

# Add/modify:
{
  "exec-opts": ["native.cgroupdriver=cgroupfs"],
  "cgroup-parent": "docker.slice",
  "storage-driver": "overlay2"
}

# Restart docker
sudo systemctl restart docker
```

### Step 6: Judge0 containers restart
```bash
cd ~/judge0
docker-compose down
docker-compose up -d

# Check logs
docker logs judge0
```

## 🧪 Test Commands

### Check cgroup availability:
```bash
# Should show memory cgroup
ls -la /sys/fs/cgroup/memory/

# Should show cpu cgroup  
ls -la /sys/fs/cgroup/cpu/

# Test cgroup creation
sudo mkdir /sys/fs/cgroup/memory/test
ls -la /sys/fs/cgroup/memory/test/
sudo rmdir /sys/fs/cgroup/memory/test
```

### Test Judge0:
```bash
# Simple test
curl -X POST http://localhost:2358/submissions?wait=true \
  -H "Content-Type: application/json" \
  -d '{"source_code":"console.log(\"test\")","language_id":63}'

# Should return status: "Accepted" instead of "Internal Error"
```

## 🔧 Alternative: WSL2 Kernel Rebuild (Advanced)

Agar upar ke methods kaam nahi kare:

```bash
# Install kernel build tools
sudo apt update
sudo apt install build-essential flex bison libssl-dev libelf-dev

# Download WSL2 kernel source
git clone https://github.com/microsoft/WSL2-Linux-Kernel.git
cd WSL2-Linux-Kernel

# Configure kernel with cgroups v1
make KCONFIG_CONFIG=Microsoft/config-wsl menuconfig
# Enable: General setup -> Control Group support -> Memory controller

# Build kernel
make KCONFIG_CONFIG=Microsoft/config-wsl -j$(nproc)

# Copy kernel to Windows
cp arch/x86/boot/bzImage /mnt/c/Users/[USERNAME]/bzImage

# Update .wslconfig in Windows
# File: C:\Users\[USERNAME]\.wslconfig
[wsl2]
kernel=C:\\Users\\[USERNAME]\\bzImage
```

## 🎯 Quick Fix (Easiest)

Agar ye sab complex lage to:

### Option 1: Use RapidAPI
```bash
# Backend .env me:
JUDGE0_LOCAL=false
JUDGE0_API_KEY=your_rapidapi_key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

### Option 2: Use Simple Executor Only
```bash
# Backend me simple executor already implemented hai
# JavaScript aur Python perfect kaam kar rahe hain
```

## 📋 Troubleshooting Commands

```bash
# Check WSL version
wsl --version

# Check Ubuntu version
lsb_release -a

# Check systemd status
systemctl status

# Check docker status
sudo systemctl status docker

# Check cgroup mounts
cat /proc/mounts | grep cgroup

# Check memory cgroup controllers
cat /sys/fs/cgroup/memory/memory.limit_in_bytes 2>/dev/null || echo "Memory cgroup not available"
```

## ✅ Success Indicators

After fix, ye commands successful hone chahiye:

```bash
# 1. Cgroup directories exist
ls -la /sys/fs/cgroup/memory/
ls -la /sys/fs/cgroup/cpu/

# 2. Judge0 test passes
curl -X POST http://localhost:2358/submissions?wait=true \
  -H "Content-Type: application/json" \
  -d '{"source_code":"console.log(\"Hello Judge0!\")","language_id":63}' \
  | grep "Accepted"

# 3. No "Internal Error" in response
```

---

**Recommendation**: Pehle simple commands try karo (Step 2-4), agar kaam nahi kare to RapidAPI use karo!