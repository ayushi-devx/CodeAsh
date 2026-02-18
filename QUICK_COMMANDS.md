# ⚡ Quick Commands Reference

## Judge0 Docker

```bash
# Navigate to judge0 folder
cd judge0

# Start Judge0
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop Judge0
docker-compose down

# Test Judge0
curl http://localhost:2358/about
```

## Backend

```bash
# Navigate to backend
cd backend

# Install dependencies (first time only)
npm install

# Create .env (first time only)
copy .env.example .env

# Seed database (first time only)
node seedData.js

# Start backend
npm run dev

# Test backend
curl http://localhost:5000/api/health
```

## Frontend

```bash
# Navigate to frontend root
cd ..

# Start frontend
npm run dev

# Open browser
# http://localhost:5173
```

## MongoDB

```bash
# Start MongoDB
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Check if running
mongod --version
```

## Docker

```bash
# Check Docker version
docker --version

# List running containers
docker ps

# List all containers
docker ps -a

# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)
```

## Testing

```bash
# Test Judge0
curl http://localhost:2358/about

# Test Backend
curl http://localhost:5000/api/health

# Test Problems API
curl http://localhost:5000/api/problems

# Test specific problem
curl http://localhost:5000/api/problems/two-sum
```

## Troubleshooting

```bash
# Check ports in use
# Windows
netstat -ano | findstr :2358
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Mac/Linux
lsof -i :2358
lsof -i :5000
lsof -i :5173

# View Docker logs
cd judge0
docker-compose logs -f

# Restart Docker services
docker-compose restart

# Clean restart
docker-compose down
docker-compose up -d
```

## Database

```bash
# Connect to MongoDB
mongo

# Show databases
show dbs

# Use codeash database
use codeash

# Show collections
show collections

# Count problems
db.problems.count()

# Find all problems
db.problems.find()

# Clear problems
db.problems.deleteMany({})

# Reseed database
cd backend
node seedData.js
```

## Git

```bash
# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main
```

## Complete Startup Sequence

```bash
# Terminal 1: Judge0
cd judge0
docker-compose up -d

# Terminal 2: MongoDB
mongod

# Terminal 3: Backend
cd backend
npm run dev

# Terminal 4: Frontend
cd ..
npm run dev
```

## Complete Shutdown Sequence

```bash
# Stop Frontend (Terminal 4)
Ctrl + C

# Stop Backend (Terminal 3)
Ctrl + C

# Stop MongoDB (Terminal 2)
Ctrl + C

# Stop Judge0 (Terminal 1)
cd judge0
docker-compose down
```

## One-Line Commands

```bash
# Start everything (after first setup)
# Terminal 1
cd judge0 && docker-compose up -d && cd ../backend && npm run dev

# Terminal 2
npm run dev
```

## Environment Variables

```bash
# Backend .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codeash
JWT_SECRET=your_secret_key
JUDGE0_LOCAL=true
JUDGE0_URL=http://localhost:2358
```

## Useful Aliases (Optional)

Add to your `.bashrc` or `.zshrc`:

```bash
# CodeAsh aliases
alias codeash-judge0="cd ~/codeash/judge0 && docker-compose up -d"
alias codeash-backend="cd ~/codeash/backend && npm run dev"
alias codeash-frontend="cd ~/codeash && npm run dev"
alias codeash-stop="cd ~/codeash/judge0 && docker-compose down"
```

## Quick Fixes

```bash
# Judge0 not working?
cd judge0
docker-compose down
docker-compose up -d
docker-compose logs -f

# MongoDB not connecting?
mongod --version
# If not installed, install MongoDB

# Port conflict?
# Change port in docker-compose.yml or .env

# Problems not loading?
cd backend
node seedData.js

# Code not executing?
curl http://localhost:2358/about
# If error, restart Judge0
```

## Development Workflow

```bash
# Morning startup
cd judge0 && docker-compose up -d
cd ../backend && npm run dev &
cd .. && npm run dev

# Add new problem
cd backend
# Edit seedData.js
node seedData.js

# Test changes
# Browser: http://localhost:5173

# Evening shutdown
# Ctrl+C in all terminals
cd judge0 && docker-compose down
```

---

**Save this file for quick reference! 📌**
