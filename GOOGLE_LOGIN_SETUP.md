# 🔐 Google Login Setup Guide

## ✅ What Was Implemented

### Backend Changes
1. ✅ Added `googleId` and `photoURL` fields to User model
2. ✅ Created `/api/auth/google` endpoint
3. ✅ Updated CORS to allow ports 5176, 5177
4. ✅ Google authentication controller

### Frontend Changes
1. ✅ Installed Firebase SDK
2. ✅ Created Firebase config file
3. ✅ Updated GetInTouch component with Google Sign-In
4. ✅ Integrated Firebase Auth with backend

---

## 🔧 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: "CodeAsh" (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Go to **Sign-in method** tab
4. Click on **Google**
5. Toggle "Enable"
6. Select support email
7. Click "Save"

### Step 3: Register Your Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click **Web** icon (</>)
4. Enter app nickname: "CodeAsh Web"
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the Firebase configuration

### Step 4: Update Firebase Config

Open `src/config/firebase.js` and replace with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**Example:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBxxx...",
  authDomain: "codeash-12345.firebaseapp.com",
  projectId: "codeash-12345",
  storageBucket: "codeash-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### Step 5: Add Authorized Domains

1. In Firebase Console → **Authentication** → **Settings** tab
2. Scroll to "Authorized domains"
3. Add your domains:
   - `localhost` (should be there by default)
   - Your production domain (when deploying)

### Step 6: Restart Backend

```bash
# Kill existing backend process
taskkill /F /PID 13108

# Start backend again
cd leet/codeash/backend
npm start
```

### Step 7: Test Google Login

1. Open browser: `http://localhost:5177` (or your port)
2. Click "Continue with Google" button
3. Select your Google account
4. Allow permissions
5. Should redirect to dashboard

---

## 🎯 How It Works

### Flow Diagram

```
User clicks "Continue with Google"
    ↓
Firebase popup opens
    ↓
User selects Google account
    ↓
Firebase returns user data (email, name, photo, uid)
    ↓
Frontend sends to backend: POST /api/auth/google
    ↓
Backend checks if user exists
    ↓
If exists: Login user
If not: Create new user
    ↓
Backend returns JWT token
    ↓
Frontend saves token & redirects to dashboard
```

### Backend Logic

```javascript
// Check if user exists by email
let user = await User.findOne({ email });

if (user) {
  // User exists - update Google ID
  user.googleId = googleId;
  user.photoURL = photoURL;
  await user.save();
} else {
  // Create new user
  user = await User.create({
    firstName: displayName,
    email: email,
    googleId: googleId,
    photoURL: photoURL,
    password: randomPassword // Auto-generated
  });
}

// Return JWT token
return { token, user };
```

---

## 🔐 Security Features

1. ✅ **Firebase Authentication** - Secure OAuth 2.0
2. ✅ **JWT Tokens** - Backend authentication
3. ✅ **CORS Protection** - Only allowed origins
4. ✅ **Password Hashing** - bcrypt for security
5. ✅ **Token Expiry** - 30 days validity

---

## 📊 User Data Stored

### From Google:
- Email
- Display Name
- Photo URL
- Google UID

### In Database:
```javascript
{
  firstName: "John Doe",
  email: "john@gmail.com",
  googleId: "google-uid-123",
  photoURL: "https://lh3.googleusercontent.com/...",
  password: "auto-generated-random",
  solvedProblems: [],
  currentStreak: 0,
  // ... other fields
}
```

---

## 🐛 Troubleshooting

### Issue 1: "Firebase not configured"
**Solution:** Update `src/config/firebase.js` with your Firebase credentials

### Issue 2: "Popup blocked"
**Solution:** Allow popups in browser settings for localhost

### Issue 3: "CORS error"
**Solution:** 
1. Check backend CORS config includes your port
2. Restart backend server
3. Clear browser cache

### Issue 4: "auth/unauthorized-domain"
**Solution:** Add your domain to Firebase Authorized Domains

### Issue 5: Backend not accepting Google login
**Solution:**
1. Check User model has `googleId` field
2. Check `/api/auth/google` route exists
3. Restart backend

---

## ✅ Testing Checklist

- [ ] Firebase project created
- [ ] Google authentication enabled
- [ ] Web app registered in Firebase
- [ ] Firebase config updated in code
- [ ] Backend restarted
- [ ] Can click "Continue with Google"
- [ ] Google popup opens
- [ ] Can select account
- [ ] Redirects to dashboard
- [ ] Token saved in localStorage
- [ ] User data saved in MongoDB

---

## 🎨 UI Features

### Google Button
- Google logo (4 colors)
- "Continue with Google" text
- Hover effects
- Loading state during sign-in

### User Experience
1. Click button
2. Popup opens (Firebase)
3. Select Google account
4. Connecting screen shows
5. Redirect to dashboard
6. Profile shows Google photo

---

## 📝 API Endpoint

### POST `/api/auth/google`

**Request:**
```json
{
  "email": "user@gmail.com",
  "firstName": "John Doe",
  "googleId": "google-uid-123",
  "photoURL": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user-id",
    "firstName": "John Doe",
    "email": "user@gmail.com",
    "photoURL": "https://...",
    "token": "jwt-token"
  }
}
```

---

## 🚀 Benefits

### For Users:
- ✅ One-click sign-in
- ✅ No password to remember
- ✅ Secure authentication
- ✅ Profile photo automatically set

### For Platform:
- ✅ Higher conversion rate
- ✅ Verified email addresses
- ✅ Better user experience
- ✅ Reduced support tickets

---

## 📈 Next Steps (Optional)

1. Add GitHub login
2. Add Facebook login
3. Add email verification
4. Add password reset
5. Add 2FA (Two-Factor Authentication)

---

## 🎊 Status

- ✅ Backend: Google auth endpoint ready
- ✅ Frontend: Firebase integrated
- ✅ User Model: Updated with Google fields
- ✅ CORS: Fixed for all ports
- ⚠️ Firebase Config: Needs your credentials

**Next:** Update Firebase config and test!

---

**Created:** February 20, 2026
**Status:** Ready for Firebase setup
