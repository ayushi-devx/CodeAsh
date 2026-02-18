# Judge0 on Windows - Known Limitation

## ❌ Issue

Judge0 requires Linux cgroups (control groups) for sandboxing code execution. These are NOT fully supported in Docker Desktop for Windows, causing errors:

```
Failed to create control group /sys/fs/cgroup/memory/box-X/: No such file or directory
chown: cannot access '/box': No such file or directory
```

## 🔍 Why This Happens

- Judge0 uses `isolate` for sandboxing (security)
- `isolate` requires Linux cgroups v1
- Docker Desktop on Windows uses WSL2 which has limited cgroup support
- Even with `privileged: true`, cgroups don't work properly on Windows

## ✅ Solutions

### Option 1: Use RapidAPI Judge0 (RECOMMENDED for Windows)

RapidAPI provides a hosted Judge0 service that works perfectly:

1. **Get API Key:**
   - Go to https://rapidapi.com/judge0-official/api/judge0-ce
   - Sign up (free tier available)
   - Subscribe to Judge0 CE
   - Copy your API key

2. **Update Backend .env:**
```env
# Use RapidAPI instead of local Docker
JUDGE0_LOCAL=false
JUDGE0_API_KEY=your_rapidapi_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

3. **Restart Backend:**
```bash
cd backend
npm start
```

4. **Test:**
- Go to Problems section
- Run code
- Should work perfectly! ✅

### Option 2: Use Linux (Native Judge0)

If you need local Judge0:

1. **Use WSL2 with proper cgroup setup:**
   - Install Ubuntu in WSL2
   - Configure cgroups v1
   - Run Judge0 natively in WSL2

2. **Use a Linux VM:**
   - VirtualBox/VMware with Ubuntu
   - Install Docker
   - Run Judge0

3. **Deploy to Linux server:**
   - AWS EC2 / DigitalOcean / Linode
   - Ubuntu 20.04+
   - Judge0 works perfectly

### Option 3: Use Alternative Code Execution

Implement your own code execution using:
- `vm2` for JavaScript (Node.js)
- `python-shell` for Python
- Docker exec for other languages

## 📊 Comparison

| Solution | Pros | Cons |
|----------|------|------|
| RapidAPI | ✅ Works on Windows<br>✅ No setup<br>✅ Reliable<br>✅ Free tier | ❌ API limits<br>❌ Requires internet |
| Linux Native | ✅ Full control<br>✅ No limits<br>✅ Offline | ❌ Requires Linux<br>❌ Complex setup |
| Alternative | ✅ Simple<br>✅ Works anywhere | ❌ Less secure<br>❌ Limited languages |

## 🎯 Recommendation

**For Development on Windows:** Use RapidAPI Judge0

**For Production:** Deploy to Linux server with native Judge0

## 🚀 Quick Switch to RapidAPI

1. Stop trying to fix local Judge0 on Windows
2. Get RapidAPI key (5 minutes)
3. Update `.env` file
4. Restart backend
5. Everything works! ✅

## 📝 Current Status

- ✅ Redis authentication fixed
- ✅ Docker containers running
- ❌ Code execution failing (Windows cgroup limitation)
- ✅ Backend ready to use RapidAPI
- ✅ Frontend ready to use RapidAPI

## 💡 Next Steps

1. Get RapidAPI key
2. Update `backend/.env`:
   ```env
   JUDGE0_LOCAL=false
   JUDGE0_API_KEY=your_key_here
   JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
   ```
3. Restart backend
4. Test in browser
5. Code execution will work! 🎉

---

**Bottom Line:** Judge0 local Docker doesn't work properly on Windows. Use RapidAPI instead - it's faster, easier, and actually works!
