# Judge0 Docker Setup Guide

## 🐳 Local Judge0 Installation (Recommended)

Judge0 Docker setup is faster and free with no API limits!

## Quick Setup (5 minutes)

### Step 1: Install Docker

**Windows:**
- Download Docker Desktop: https://www.docker.com/products/docker-desktop
- Install and restart
- Verify: `docker --version`

**Mac:**
```bash
brew install --cask docker
```

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Step 2: Download Judge0 Docker Compose

```bash
# Create judge0 directory
mkdir judge0
cd judge0

# Download docker-compose.yml
curl -L https://github.com/judge0/judge0/releases/download/v1.13.0/docker-compose.yml -o docker-compose.yml
```

### Step 3: Start Judge0

```bash
# Start all services
docker-compose up -d

# Check if running
docker-compose ps
```

You should see:
```
NAME                COMMAND                  SERVICE             STATUS
judge0-server       "./scripts/server"       server              Up
judge0-workers      "./scripts/workers"      workers             Up
judge0-db           "docker-entrypoint.s…"   db                  Up
judge0-redis        "docker-entrypoint.s…"   redis               Up
```

### Step 4: Test Judge0

```bash
# Test endpoint
curl http://localhost:2358/about
```

Expected response:
```json
{
  "version": "1.13.0",
  "homepage": "https://judge0.com"
}
```

### Step 5: Update Backend .env

```env
# Use local Judge0
JUDGE0_LOCAL=true
JUDGE0_URL=http://localhost:2358
```

## 🎯 That's It!

Judge0 is now running locally on port 2358.

## Common Commands

```bash
# Start Judge0
docker-compose up -d

# Stop Judge0
docker-compose down

# View logs
docker-compose logs -f

# Restart Judge0
docker-compose restart

# Check status
docker-compose ps
```

## Troubleshooting

### Port 2358 already in use?
```bash
# Change port in docker-compose.yml
# Find: "2358:2358"
# Change to: "3000:2358"

# Update .env
JUDGE0_URL=http://localhost:3000
```

### Services not starting?
```bash
# Check Docker is running
docker ps

# Restart Docker Desktop (Windows/Mac)
# Or restart Docker service (Linux)
sudo systemctl restart docker
```

### Slow execution?
```bash
# Increase Docker resources
# Docker Desktop → Settings → Resources
# RAM: 4GB minimum
# CPU: 2 cores minimum
```

## Language Support

Judge0 Docker supports:
- JavaScript (Node.js 16)
- Python 3.10
- Java 17
- C++ (GCC 11)
- C (GCC 11)
- And 60+ more languages!

## Performance

**Local Judge0:**
- ✅ Execution time: 0.5-2 seconds
- ✅ No API limits
- ✅ No rate limiting
- ✅ Free forever
- ✅ Works offline

**RapidAPI Judge0:**
- ⚠️ Execution time: 2-5 seconds
- ⚠️ 50 requests/day (free tier)
- ⚠️ Rate limited
- ⚠️ Requires internet
- ⚠️ Paid plans for more

## Production Deployment

For production, you can:
1. Deploy Judge0 on your own server
2. Use Judge0 Cloud (paid)
3. Use RapidAPI (paid plans)

## Resources

- Judge0 Docs: https://ce.judge0.com/
- Docker Compose: https://github.com/judge0/judge0
- Language IDs: https://ce.judge0.com/#statuses-and-languages-language-get

---

**Recommended: Use Local Docker Judge0 for development! 🚀**
