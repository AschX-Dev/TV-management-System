# ✅ TVMS Deployment Checklist

Use this checklist to ensure a smooth deployment process.

---

## 📋 Pre-Deployment Checklist

### 1. Code & Repository

- [ ] All code is committed and pushed to GitHub
- [ ] Repository URL: `https://github.com/AschX-Dev/TV-management-System`
- [ ] All recent changes are on the `main` branch
- [ ] No sensitive data (passwords, API keys) in code

### 2. Environment Setup

- [ ] MongoDB Atlas cluster is running
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs for cloud deployment)
- [ ] MongoDB database user has read/write permissions
- [ ] Cloudinary account is active
- [ ] Cloudinary credentials are ready

### 3. Configuration Files

- [ ] `backend/package.json` has `"start": "node server.js"` script
- [ ] `frontend/package.json` has proper build scripts
- [ ] `.gitignore` excludes `.env` and `.env.local` files

---

## 🚀 Deployment Steps (Vercel + Render)

### Step 1: Deploy Backend to Render ⏱️ ~10 minutes

- [ ] **1.1** Go to [render.com](https://render.com)
- [ ] **1.2** Sign in with GitHub
- [ ] **1.3** Click **"New +"** → **"Web Service"**
- [ ] **1.4** Connect `TV-management-System` repository
- [ ] **1.5** Configure settings:
  ```
  Name: tvms-backend
  Root Directory: TVMSFB/backend
  Build Command: npm install
  Start Command: npm start
  Instance Type: Free
  ```
- [ ] **1.6** Add environment variables (see below)
- [ ] **1.7** Click **"Create Web Service"**
- [ ] **1.8** Wait for deployment (5-7 minutes)
- [ ] **1.9** Copy your backend URL: `https://tvms-backend-xxxx.onrender.com`
- [ ] **1.10** Test backend: Visit `https://your-backend-url.onrender.com/api/health`

### Step 2: Deploy Frontend to Vercel ⏱️ ~5 minutes

- [ ] **2.1** Go to [vercel.com](https://vercel.com)
- [ ] **2.2** Sign in with GitHub
- [ ] **2.3** Click **"Add New..."** → **"Project"**
- [ ] **2.4** Import `TV-management-System`
- [ ] **2.5** Configure settings:
  ```
  Framework: Next.js
  Root Directory: TVMSFB/frontend
  Build Command: npm run build
  Output Directory: .next
  ```
- [ ] **2.6** Add environment variables:
  ```
  NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
  NEXT_PUBLIC_WS_URL=https://your-backend-url.onrender.com
  ```
- [ ] **2.7** Click **"Deploy"**
- [ ] **2.8** Wait for deployment (2-3 minutes)
- [ ] **2.9** Copy your frontend URL: `https://your-project.vercel.app`

### Step 3: Update Backend CORS ⏱️ ~2 minutes

- [ ] **3.1** Go to Render dashboard → Your backend service
- [ ] **3.2** Click **"Environment"**
- [ ] **3.3** Add:
  ```
  FRONTEND_URL=https://your-project.vercel.app
  ```
- [ ] **3.4** Click **"Save Changes"**
- [ ] **3.5** Backend will auto-redeploy

---

## 🔐 Environment Variables Reference

### Backend (Render)

Copy and paste these, replacing with your actual values:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tvms?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long-please-change-this
PORT=3002
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SENDGRID_API_KEY=SG.your_sendgrid_key_if_using_email
FROM_EMAIL=noreply@yourdomain.com
FRONTEND_URL=https://your-project.vercel.app
```

### Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=https://tvms-backend-xxxx.onrender.com/api
NEXT_PUBLIC_WS_URL=https://tvms-backend-xxxx.onrender.com
```

---

## 🧪 Post-Deployment Testing

### Test 1: Backend Health ✅

- [ ] Visit: `https://your-backend-url.onrender.com`
- [ ] Should see a response (not 404)

### Test 2: Frontend Access ✅

- [ ] Visit: `https://your-project.vercel.app`
- [ ] Homepage loads correctly
- [ ] No console errors in browser DevTools

### Test 3: Login ✅

- [ ] Go to: `https://your-project.vercel.app/auth/login`
- [ ] Login with admin credentials
- [ ] Should redirect to dashboard
- [ ] Check browser console for errors

### Test 4: Register TV ✅

- [ ] Go to: "Manage TV" → "Register New TV"
- [ ] Fill in TV details:
  ```
  TV ID: TV001
  Name: Test Display
  Location: Office Lobby
  Resolution: 1920x1080
  ```
- [ ] Click "Register TV"
- [ ] Should see success message

### Test 5: View Registered TVs ✅

- [ ] Go to: "Fetch All TVs"
- [ ] Should see TV001 in the list
- [ ] Status should show (may be offline)

### Test 6: Upload Media ✅

- [ ] Go to: "Upload Media" → "Direct Upload"
- [ ] Select TV: TV001
- [ ] Fill in title and description
- [ ] Choose media type
- [ ] Upload an image/video
- [ ] Should see upload progress
- [ ] Should see success message

### Test 7: TV Display ✅

- [ ] Open new incognito tab
- [ ] Visit: `https://your-project.vercel.app/display`
- [ ] Enter TV ID: TV001
- [ ] Should validate and redirect to display
- [ ] Should show uploaded media
- [ ] Check WebSocket status (top right corner)

### Test 8: Real-time Update ✅

- [ ] Keep TV display tab open
- [ ] In admin tab, upload new media to TV001
- [ ] TV display should update automatically (within 5-10 seconds)

---

## 🐛 Common Issues & Quick Fixes

### ❌ Backend shows "Application failed to respond"

**Fix:**

- Check Render logs for errors
- Verify `MONGO_URI` is correct
- Ensure MongoDB Atlas whitelist includes `0.0.0.0/0`
- Wait 30 seconds (free tier wakes up slowly)

### ❌ Frontend shows "Failed to fetch"

**Fix:**

- Verify `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Check if backend URL is accessible
- Look for CORS errors in browser console
- Ensure `FRONTEND_URL` is set in backend environment

### ❌ "Unauthorized" errors after login

**Fix:**

- Check if `JWT_SECRET` is set in backend
- Clear browser cookies and localStorage
- Try logging in again
- Check backend logs for JWT errors

### ❌ Images not uploading

**Fix:**

- Verify Cloudinary credentials in backend environment
- Check Cloudinary dashboard for quota
- Look for upload errors in backend logs
- Ensure file size is under 10MB

### ❌ WebSocket not connecting on TV display

**Fix:**

- Check if `NEXT_PUBLIC_WS_URL` is correct
- Verify backend is running (visit the URL)
- Render free tier may sleep - wait 30 seconds
- Check browser console for WebSocket errors

---

## 📊 Monitoring Your Deployment

### Vercel Dashboard

- View deployment history
- Check build logs
- Monitor bandwidth usage
- View analytics

### Render Dashboard

- Check service status
- View application logs
- Monitor CPU/Memory usage
- Check deployment history

### MongoDB Atlas

- Monitor database size
- Check connection count
- View slow queries
- Set up alerts

---

## 🎯 Success Criteria

Your deployment is successful when:

✅ Frontend loads at your Vercel URL  
✅ You can log in to admin panel  
✅ You can register a TV device  
✅ You can upload media  
✅ TV display shows uploaded media  
✅ Real-time updates work (upload → display updates)  
✅ No console errors in browser  
✅ No errors in backend logs

---

## 🔄 Future Updates

After initial deployment, updates are automatic:

```bash
# Make changes locally
git add .
git commit -m "New feature"
git push origin main

# Both platforms auto-deploy! 🚀
# Vercel: ~2-3 minutes
# Render: ~5-7 minutes
```

---

## 📞 Platform Support Links

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Render Docs:** [render.com/docs](https://render.com/docs)
- **MongoDB Atlas:** [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Cloudinary:** [cloudinary.com/documentation](https://cloudinary.com/documentation)

---

## 🎉 Deployment Complete!

Once all checkboxes are ticked, your TVMS is live and accessible worldwide! 🌍

**Share your deployment:**

- Admin Panel: `https://your-project.vercel.app/admin`
- TV Display: `https://your-project.vercel.app/display/TV001`

---

**Need help?** Refer to `DEPLOYMENT_GUIDE.md` for detailed instructions!
