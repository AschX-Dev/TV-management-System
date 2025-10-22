# 🚀 TVMS Deployment Guide

This guide will help you deploy your TV Management System **completely FREE** using industry-standard platforms.

## 📋 Table of Contents

- [Deployment Architecture](#deployment-architecture)
- [Prerequisites](#prerequisites)
- [Option 1: Vercel + Render (Recommended)](#option-1-vercel--render-recommended)
- [Option 2: Netlify + Railway](#option-2-netlify--railway)
- [Option 3: All-in-One with Render](#option-3-all-in-one-with-render)
- [Environment Variables Setup](#environment-variables-setup)
- [Testing Your Deployment](#testing-your-deployment)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Your TVMS System                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend (Next.js)          Backend (Node.js/Express)  │
│  ↓ Deploy to:                ↓ Deploy to:               │
│  • Vercel (Best)             • Render (Best)            │
│  • Netlify                   • Railway                   │
│  • Render                    • Cyclic                    │
│                                                          │
│  Database: MongoDB Atlas (Already Cloud-based)          │
│  Storage: Cloudinary (Already Cloud-based)              │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account with your code pushed
- ✅ MongoDB Atlas account (you already have this)
- ✅ Cloudinary account (you already have this)
- ✅ Your repository: `https://github.com/AschX-Dev/TV-management-System`

---

## 🌟 Option 1: Vercel + Render (Recommended)

### **Best for:** Production-ready, fast, reliable, with excellent CI/CD

### Part A: Deploy Frontend to Vercel

#### Step 1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

#### Step 2: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find `TV-management-System` repository
3. Click **"Import"**

#### Step 3: Configure Build Settings

```
Framework Preset: Next.js
Root Directory: TVMSFB/frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
NEXT_PUBLIC_WS_URL=https://your-backend-url.onrender.com
```

> **Note:** You'll get the backend URL in Part B. You can add it later.

#### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your frontend will be live at: `https://your-project.vercel.app`

---

### Part B: Deploy Backend to Render

#### Step 1: Sign Up for Render

1. Go to [render.com](https://render.com)
2. Click **"Get Started"**
3. Choose **"Sign in with GitHub"**
4. Authorize Render

#### Step 2: Create a Web Service

1. Click **"New +"** → **"Web Service"**
2. Find `TV-management-System` repository
3. Click **"Connect"**

#### Step 3: Configure Service

```
Name: tvms-backend
Region: Choose closest to you
Root Directory: TVMSFB/backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

#### Step 4: Add Environment Variables

Click **"Environment"** → **"Add Environment Variable"**

```env
MONGO_URI=mongodb+srv://your-username:password@cluster.mongodb.net/tvms
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=3002
NODE_ENV=production

# Cloudinary (from your cloudinary.js)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (if using SendGrid)
SENDGRID_API_KEY=your_sendgrid_key
FROM_EMAIL=noreply@yourdomain.com

# Frontend URL (for CORS)
FRONTEND_URL=https://your-project.vercel.app
```

#### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 5-7 minutes for first deployment
3. Your backend will be live at: `https://tvms-backend.onrender.com`

#### Step 6: Update Frontend Environment Variables

1. Go back to Vercel dashboard
2. Go to your project → **Settings** → **Environment Variables**
3. Update:

```env
NEXT_PUBLIC_API_URL=https://tvms-backend.onrender.com/api
NEXT_PUBLIC_WS_URL=https://tvms-backend.onrender.com
```

4. Click **"Deployments"** → **"Redeploy"** (with "Use existing Build Cache" unchecked)

---

## 🎯 Option 2: Netlify + Railway

### Part A: Deploy Frontend to Netlify

#### Step 1: Sign Up

1. Go to [netlify.com](https://netlify.com)
2. **"Sign up with GitHub"**

#### Step 2: Import Project

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **GitHub**
3. Select `TV-management-System`

#### Step 3: Build Settings

```
Base directory: TVMSFB/frontend
Build command: npm run build
Publish directory: TVMSFB/frontend/.next
```

#### Step 4: Environment Variables

Go to **Site settings** → **Environment variables**:

```env
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
NEXT_PUBLIC_WS_URL=https://your-backend.up.railway.app
```

---

### Part B: Deploy Backend to Railway

#### Step 1: Sign Up

1. Go to [railway.app](https://railway.app)
2. **"Login with GitHub"**

#### Step 2: New Project

1. Click **"New Project"**
2. Choose **"Deploy from GitHub repo"**
3. Select `TV-management-System`

#### Step 3: Configure

1. Click on the service
2. Go to **Settings**
3. Set **Root Directory**: `TVMSFB/backend`
4. Set **Start Command**: `npm start`

#### Step 4: Environment Variables

Add all the same environment variables as in the Render option

#### Step 5: Generate Domain

1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy the URL: `https://your-backend.up.railway.app`

---

## 🔧 Option 3: All-in-One with Render

Deploy **both** frontend and backend on Render (free tier).

### Step 1: Deploy Backend (Same as Option 1, Part B)

### Step 2: Deploy Frontend as Static Site

1. In Render, click **"New +"** → **"Static Site"**
2. Connect `TV-management-System`
3. Configure:

```
Root Directory: TVMSFB/frontend
Build Command: npm run build && npm run export
Publish Directory: TVMSFB/frontend/out
```

> **Note:** You need to modify `next.config.mjs` for static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

---

## 🔐 Environment Variables Setup

### Backend Environment Variables (Critical!)

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tvms?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-random-secret-min-32-characters-long

# Server
PORT=3002
NODE_ENV=production

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
SENDGRID_API_KEY=SG.your_key_here
FROM_EMAIL=noreply@yourdomain.com

# Frontend (for CORS)
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
NEXT_PUBLIC_WS_URL=https://your-backend-url.onrender.com
```

### Where to Find Your Credentials:

#### MongoDB Atlas:

1. Log in to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual password

#### Cloudinary:

1. Log in to [cloudinary.com](https://cloudinary.com)
2. Go to **Dashboard**
3. Find: Cloud Name, API Key, API Secret

---

## 🧪 Testing Your Deployment

### 1. Test Backend Health

```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response: `{"status": "OK"}`

### 2. Test Frontend

1. Visit: `https://your-project.vercel.app`
2. Should see the homepage
3. Try logging in: `https://your-project.vercel.app/auth/login`

### 3. Test Full Flow

1. **Login** with admin credentials
2. **Register a TV** device
3. **Upload media**
4. **Open TV display** in incognito: `https://your-project.vercel.app/display/TV001`
5. Media should appear!

---

## 🐛 Troubleshooting

### Issue 1: "Cannot connect to backend"

**Solution:**

- Check if backend is running: Visit `https://your-backend-url.onrender.com`
- Verify `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Check browser console for CORS errors

### Issue 2: "MongoDB connection failed"

**Solution:**

- Verify `MONGO_URI` is correct in Render environment variables
- Check MongoDB Atlas **Network Access**: Add `0.0.0.0/0` to whitelist
- Ensure database user has read/write permissions

### Issue 3: "WebSocket not connecting"

**Solution:**

- Render free tier may sleep after inactivity (takes 30s to wake up)
- Upgrade to paid tier for 24/7 uptime
- Or use a cron job to ping your backend every 10 minutes

### Issue 4: "Images not uploading"

**Solution:**

- Verify Cloudinary credentials in backend environment variables
- Check Cloudinary dashboard for upload quota (free tier: 25GB)
- Check backend logs in Render dashboard

### Issue 5: "Build failed on Vercel/Render"

**Solution:**

- Check build logs for specific errors
- Ensure `package.json` has all dependencies
- For Next.js: Make sure you're using compatible versions
- Try adding `--legacy-peer-deps` to install command

---

## 📊 Free Tier Limits

| Platform          | Limit                          | Workaround                              |
| ----------------- | ------------------------------ | --------------------------------------- |
| **Vercel**        | 100GB bandwidth/month          | More than enough for small-medium usage |
| **Render**        | 750 hours/month                | Enough for 1 service 24/7               |
| **Render**        | Sleeps after 15 min inactivity | Use UptimeRobot to ping every 5 min     |
| **MongoDB Atlas** | 512MB storage                  | Enough for ~10,000 media records        |
| **Cloudinary**    | 25GB storage, 25GB bandwidth   | Enough for ~1000 images                 |

---

## 🎯 Recommended Setup Summary

### **For Best Performance (Recommended):**

```
Frontend: Vercel (fastest CDN, zero config)
Backend: Render (free SSL, auto-deploy)
Database: MongoDB Atlas (already set up)
Storage: Cloudinary (already set up)
```

### **Total Cost:** $0/month ✅

### **Deployment Time:** ~30 minutes

### **Auto-Deploy:** Every git push automatically deploys! 🚀

---

## 🔄 Auto-Deployment Workflow

Once set up, your workflow is:

```bash
# Make changes locally
git add .
git commit -m "Updated feature"
git push origin main

# Automatic magic happens:
# ✅ Vercel detects push → builds frontend → deploys (2-3 min)
# ✅ Render detects push → builds backend → deploys (5-7 min)
# ✅ Your site is live!
```

---

## 🎉 What You Get After Deployment

✅ **Global CDN** - Fast loading worldwide  
✅ **Free SSL** - HTTPS by default  
✅ **Auto-scaling** - Handles traffic spikes  
✅ **Zero downtime** - Deploys without interruption  
✅ **Custom domain** - Add your own domain (optional)  
✅ **Automatic backups** - MongoDB Atlas handles this  
✅ **CI/CD pipeline** - Push code → Auto deploy

---

## 📞 Need Help?

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. View platform-specific logs:
   - Vercel: Dashboard → Deployments → Click deployment → View logs
   - Render: Dashboard → Logs tab
3. Check MongoDB Atlas: Network Access and Database Access settings

---

**Ready to deploy?** Start with [Option 1: Vercel + Render](#option-1-vercel--render-recommended)! 🚀
