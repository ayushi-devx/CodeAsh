# Judge0 Docker Setup

## Files Included

- `docker-compose.yml` - Docker compose configuration
- `judge0.conf` - Judge0 configuration file

## Quick Setup

### Step 1: Install Docker Desktop

**Windows:**
- Download: https://www.docker.com/products/docker-desktop
- Install and restart
- Open Docker Desktop

**Mac:**
```bash
brew install --cask docker
```

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Step 2: Start Judge0

```bash
# Navigate to judge0 folder
cd judge0

# Start all services
docker-compose up -d
```

Wait 30-60 seconds for all services to start.

### Step 3: Verify

```bash
# Check if containers are running
docker-compose ps
```

You should see 4 containers:
- judge0-server (Up)
- judge0-workers (Up)
- judge0-db (Up)
- judge0-redis (Up)

### Step 4: Test

```bash
# Test Judge0 API
curl http://localhost:2358/about
```

Expected response:
```json
{
  "version": "1.13.0",
  "homepage": "https://judge0.com"
}
```

## Configuration

### Change Passwords (Recommended)

Edit `judge0.conf`:
```bash
POSTGRES_PASSWORD=YourStrongPassword123
REDIS_PASSWORD=YourStrongPassword456
```

Then restart:
```bash
docker-compose down
docker-compose up -d
```

### Change Port

If port 2358 is in use, edit `docker-compose.yml`:
```yaml
ports:
  - "3000:2358"  # Change 2358 to 3000
```

Then update backend `.env`:
```env
JUDGE0_URL=http://localhost:3000
```

## Common Commands

```bash
# Start Judge0
docker-compose up -d

# Stop Judge0
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f server

# Restart all services
docker-compose restart

# Check status
docker-compose ps

# Stop and remove everything (including data)
docker-compose down -v
```

## Troubleshooting

### Containers not starting?

```bash
# Check Docker is running
docker ps

# View logs
docker-compose logs

# Restart Docker Desktop (Windows/Mac)
```

### Port already in use?

```bash
# Check what's using port 2358
# Windows
netstat -ano | findstr :2358

# Mac/Linux
lsof -i :2358

# Change port in docker-compose.yml
```

### Slow execution?

First execution is slow (downloads language images).
Subsequent executions are fast (< 2 seconds).

### Out of memory?

Increase Docker resources:
- Docker Desktop → Settings → Resources
- RAM: 4GB minimum
- CPU: 2 cores minimum

## Testing Code Execution

### Test JavaScript

```bash
curl -X POST http://localhost:2358/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "source_code": "console.log(\"Hello World\");",
    "language_id": 63,
    "stdin": ""
  }'
```

### Test Python

```bash
curl -X POST http://localhost:2358/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "source_code": "print(\"Hello World\")",
    "language_id": 71,
    "stdin": ""
  }'
```

## Language IDs

- JavaScript (Node.js): 63
- Python: 71
- Java: 62
- C++: 54
- C: 50

Full list: https://ce.judge0.com/#statuses-and-languages-language-get

## Performance

**Local Docker Judge0:**
- ✅ Execution: 0.5-2 seconds
- ✅ No API limits
- ✅ Free forever
- ✅ Works offline

## Next Steps

1. ✅ Judge0 is running
2. ✅ Test with curl
3. ✅ Update backend `.env`:
   ```env
   JUDGE0_LOCAL=true
   JUDGE0_URL=http://localhost:2358
   ```
4. ✅ Start backend: `npm run dev`
5. ✅ Test code execution in CodeAsh!

## Resources

- Judge0 Docs: https://ce.judge0.com/
- GitHub: https://github.com/judge0/judge0
- Docker Docs: https://docs.docker.com/

---

**Judge0 is ready! Start your backend and test code execution! 🚀**
