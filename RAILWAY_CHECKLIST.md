# ✅ Railway Deployment Checklist

Follow this checklist to deploy your TVMS backend to Railway successfully.

---

## 📋 Pre-Deployment Checklist

### Account Setup

- [ ] **Railway account** created (railway.app)
- [ ] **GitHub connected** to Railway
- [ ] **Repository access** granted

### Credentials Ready

- [ ] **MongoDB Atlas** connection string
- [ ] **Cloudinary** credentials (3 values)
- [ ] **JWT secret** generated
- [ ] **Frontend URL** (for CORS)

---

## 🚀 Deployment Steps

### Step 1: Create Project (5 minutes)

- [ ] **Go to [railway.app](https://railway.app)**
- [ ] **Click "New Project"**
- [ ] **Select "Deploy from GitHub repo"**
- [ ] **Find "TV-management-System"**
- [ ] **Click "Deploy Now"**

### Step 2: Configure Service (3 minutes)

- [ ] **Click on your service**
- [ ] **Go to "Settings" tab**
- [ ] **Set Root Directory:** `TVMSFB/backend`
- [ ] **Set Start Command:** `npm start`

### Step 3: Add Environment Variables (5 minutes)

- [ ] **Click "Variables" tab**
- [ ] **Add MONGO_URI** (MongoDB connection string)
- [ ] **Add JWT_SECRET** (generated secret)
- [ ] **Add PORT** = `3002`
- [ ] **Add NODE_ENV** = `production`
- [ ] **Add CLOUDINARY_CLOUD_NAME**
- [ ] **Add CLOUDINARY_API_KEY**
- [ ] **Add CLOUDINARY_API_SECRET**
- [ ] **Add FRONTEND_URL** = `http://localhost:3000` (update later)

### Step 4: Deploy and Test (5 minutes)

- [ ] **Go to "Deployments" tab**
- [ ] **Wait for "Deployed" status**
- [ ] **Copy service URL**
- [ ] **Test health endpoint:** `https://your-url.up.railway.app/api/health`
- [ ] **Should return:** `{"status":"OK"}`

---

## 🧪 Testing Checklist

### Backend Health

- [ ] **Service URL accessible** in browser
- [ ] **Health endpoint working** (`/api/health`)
- [ ] **No errors in logs**

### API Testing

- [ ] **TV registration** works
- [ ] **Media upload** works
- [ ] **Authentication** works
- [ ] **WebSocket** connects

### Environment Variables

- [ ] **All variables set** correctly
- [ ] **No typos** in values
- [ ] **MongoDB connection** successful
- [ ] **Cloudinary upload** works

---

## 🔗 Frontend Integration

### Update Frontend Environment

- [ ] **Get Railway service URL**
- [ ] **Update NEXT_PUBLIC_API_URL** = `https://your-url.up.railway.app/api`
- [ ] **Update NEXT_PUBLIC_WS_URL** = `https://your-url.up.railway.app`

### Update Backend CORS

- [ ] **Get frontend URL** (Vercel/Netlify)
- [ ] **Update FRONTEND_URL** in Railway variables
- [ ] **Redeploy backend** (automatic)

---

## 🎯 Final Verification

### Full Application Test

- [ ] **Frontend loads** without errors
- [ ] **Login works** (admin panel)
- [ ] **TV registration** works
- [ ] **Media upload** works
- [ ] **TV display** shows content
- [ ] **Real-time updates** work

### Performance Check

- [ ] **API response time** < 2 seconds
- [ ] **WebSocket connection** stable
- [ ] **No console errors**
- [ ] **Mobile responsive**

---

## 🐛 Common Issues & Fixes

### Build Fails

- [ ] **Check package.json** dependencies
- [ ] **Verify start command** = `npm start`
- [ ] **Check root directory** = `TVMSFB/backend`

### Service Won't Start

- [ ] **Check all environment variables** set
- [ ] **Verify PORT=3002**
- [ ] **Test MongoDB connection**

### WebSocket Issues

- [ ] **Check FRONTEND_URL** is set
- [ ] **Verify CORS configuration**
- [ ] **Test WebSocket URL** in frontend

### Out of Credits

- [ ] **Check usage** in Railway dashboard
- [ ] **Consider upgrading** to paid plan
- [ ] **Optimize resource usage**

---

## 📊 Success Metrics

Your deployment is successful when:

✅ **Service URL accessible**  
✅ **Health endpoint returns OK**  
✅ **All API endpoints working**  
✅ **WebSocket connection established**  
✅ **Frontend can connect to backend**  
✅ **No errors in logs**  
✅ **Real-time features working**

---

## 🎉 You're Done!

**Your Railway backend is live at:**
`https://your-service-url.up.railway.app`

**Next steps:**

1. **Deploy frontend** (Vercel/Netlify)
2. **Update environment variables**
3. **Test full application**
4. **Share your URLs!**

---

## 📞 Need Help?

- **Railway Docs:** [docs.railway.app](https://docs.railway.app)
- **Railway Discord:** [discord.gg/railway](https://discord.gg/railway)
- **Check logs** in Railway dashboard
- **Test endpoints** manually

---

<p align="center">
  <strong>Ready to deploy?</strong>
  <br>
  <a href="https://railway.app">🚂 Start Railway Deployment</a>
</p>

