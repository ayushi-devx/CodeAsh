# Simple Judge0 Setup (Alternative)

Agar docker-compose se issue aa raha hai, toh ye simple method try karo:

## Method 1: Single Container (Easiest)

```bash
docker run -d \
  --name judge0 \
  -p 2358:2358 \
  judge0/judge0:latest
```

Wait 30 seconds, then test:
```bash
curl http://localhost:2358/about
```

## Method 2: Check Current Container

```bash
# Check if judge0 is running
docker ps | findstr judge0

# View logs
docker logs judge0 -f

# Restart container
docker restart judge0

# Stop and remove
docker stop judge0
docker rm judge0
```

## Method 3: Use Docker Desktop UI

1. Open Docker Desktop
2. Go to "Containers" tab
3. Click "Run" button
4. Enter:
   - Image: `judge0/judge0:latest`
   - Port: `2358:2358`
   - Name: `judge0`
5. Click "Run"

## Test Judge0

```bash
# Test endpoint
curl http://localhost:2358/about

# Expected response:
# {"version":"1.13.0","homepage":"https://judge0.com"}
```

## If Still Not Working

Judge0 container ko 1-2 minutes lagta hai fully start hone mein. Wait karo aur phir test karo.

```bash
# Wait and check logs
docker logs judge0 --follow

# When you see "Listening on port 2358", it's ready
```

## Update Backend .env

Once Judge0 is working:

```env
JUDGE0_LOCAL=true
JUDGE0_URL=http://localhost:2358
```

## Troubleshooting

**Port 2358 already in use?**
```bash
# Use different port
docker run -d --name judge0 -p 3000:2358 judge0/judge0:latest

# Update .env
JUDGE0_URL=http://localhost:3000
```

**Container keeps restarting?**
```bash
# Check logs
docker logs judge0

# Try with more memory
docker run -d --name judge0 -p 2358:2358 --memory=2g judge0/judge0:latest
```

---

**Simplest way: Just run the single docker command and wait 1-2 minutes!**
