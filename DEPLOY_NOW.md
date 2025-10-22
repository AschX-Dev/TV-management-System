# 🚀 Deploy TVMS in 15 Minutes

The fastest way to get your TV Management System online!

---

## ⚡ Quick Deploy: Vercel + Render

### 🎯 Step 1: Deploy Backend (7 minutes)

1. **Go to [render.com](https://render.com)** → Sign up with GitHub

2. **Click "New +" → "Web Service"**

3. **Select:** `TV-management-System` repository

4. **Configure:**
   ```
   Name: tvms-backend
   Root Directory: TVMSFB/backend
   Build: npm install
   Start: npm start
   Plan: Free
   ```

5. **Add Environment Variables:**
   ```
   MONGO_URI = [Your MongoDB Atlas connection string]
   JWT_SECRET = [Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
   PORT = 3002
   NODE_ENV = production
   CLOUDINARY_CLOUD_NAME = [From Cloudinary dashboard]
   CLOUDINARY_API_KEY = [From Cloudinary dashboard]
   CLOUDINARY_API_SECRET = [From Cloudinary dashboard]
   ```

6. **Click "Create Web Service"** → Wait 5 minutes

7. **Copy your backend URL:** `https://tvms-backend-xxxx.onrender.com`

---

### 🎨 Step 2: Deploy Frontend (5 minutes)

1. **Go to [vercel.com](https://vercel.com)** → Sign up with GitHub

2. **Click "Add New..." → "Project"**

3. **Import:** `TV-management-System`

4. **Configure:**
   ```
   Root Directory: TVMSFB/frontend
   Framework: Next.js (auto)
   ```

5. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL = https://tvms-backend-xxxx.onrender.com/api
   NEXT_PUBLIC_WS_URL = https://tvms-backend-xxxx.onrender.com
   ```
   *(Use your Render URL from Step 1)*

6. **Click "Deploy"** → Wait 2 minutes

7. **Copy your frontend URL:** `https://your-project.vercel.app`

---

### 🔗 Step 3: Connect Them (3 minutes)

1. **Go back to Render** → Your backend service

2. **Click "Environment"** → Add variable:
   ```
   FRONTEND_URL = https://your-project.vercel.app
   ```
   *(Use your Vercel URL from Step 2)*

3. **Save** → Auto-redeploys in 2 minutes

---

## ✅ Test It!

1. **Visit:** `https://your-project.vercel.app`
2. **Login** → Register a TV → Upload media
3. **Open TV display:** `https://your-project.vercel.app/display/TV001`
4. **Done!** 🎉

---

## 📋 Credentials You'll Need

Before starting, have these ready:

| Service | What You Need | Where to Get It |
|---------|---------------|-----------------|
| **MongoDB Atlas** | Connection string | [cloud.mongodb.com](https://cloud.mongodb.com) → Connect → Application |
| **Cloudinary** | Cloud name, API key, API secret | [cloudinary.com/console](https://cloudinary.com/console) → Dashboard |
| **JWT Secret** | Random string | Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

---

## 🆘 Quick Fixes

### Backend won't start?
- Check MongoDB connection string format
- Ensure MongoDB IP whitelist includes `0.0.0.0/0`
- Verify all environment variables are set

### Frontend can't connect?
- Double-check `NEXT_PUBLIC_API_URL` has `/api` at the end
- Ensure `FRONTEND_URL` is set in backend
- Check for typos in URLs

### Images won't upload?
- Verify all 3 Cloudinary credentials
- Check Cloudinary free tier quota (25GB)
- Look at backend logs in Render dashboard

---

## 💰 Cost

**Total: $0/month** ✅

- Vercel: Free (100GB bandwidth)
- Render: Free (750 hours/month)
- MongoDB Atlas: Free (512MB)
- Cloudinary: Free (25GB)

---

## 📚 Detailed Guides

Need more help?

- **Full Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Checklist:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Environment Setup:** [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)
- **Video Script:** [DEPLOYMENT_VIDEO_SCRIPT.md](./DEPLOYMENT_VIDEO_SCRIPT.md)

---

## 🎯 After Deployment

Your app now has:
- ✅ Global CDN (fast worldwide)
- ✅ Free SSL (HTTPS)
- ✅ Auto-deploy (push to GitHub → auto-update)
- ✅ 99.9% uptime
- ✅ Custom domain support (optional)

**URLs to save:**
```
Admin: https://your-project.vercel.app/admin
TV Display: https://your-project.vercel.app/display
API: https://tvms-backend-xxxx.onrender.com/api
```

---

## 🚀 One More Thing

**Every time you push to GitHub, your app auto-deploys!**

```bash
git add .
git commit -m "New feature"
git push origin main
# ✨ Magic happens - your site updates automatically!
```

---

**Ready? Start with Step 1!** 👆

