# 🚂 Railway Backend Deployment Guide

Step-by-step guide to deploy your TVMS backend to Railway.

---

## 🎯 Why Railway?

✅ **Modern Platform** - Built for developers, by developers  
✅ **Zero Config** - Auto-detects Node.js projects  
✅ **Free Tier** - $5 credit monthly (more than enough for development)  
✅ **WebSocket Support** - Full support for real-time features  
✅ **Auto-Deploy** - Push to GitHub → Auto-deploy  
✅ **Easy Environment Variables** - Simple UI for secrets  
✅ **Fast Deployments** - Usually 2-3 minutes

---

## 📋 Prerequisites

Before starting, make sure you have:

- [ ] **GitHub account** with your TVMS code pushed
- [ ] **MongoDB Atlas** connection string ready
- [ ] **Cloudinary** credentials ready
- [ ] **JWT secret** generated

📖 **Get credentials:** [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)

---

## 🚀 Step-by-Step Deployment

### Step 1: Sign Up for Railway

1. **Go to [railway.app](https://railway.app)**
2. **Click "Login"** (top right)
3. **Choose "Login with GitHub"**
4. **Authorize Railway** to access your repositories
5. You'll be redirected to Railway dashboard

**Narration:** "Railway integrates seamlessly with GitHub, making deployment super easy."

---

### Step 2: Create New Project

1. **Click "New Project"** (big blue button)
2. **Choose "Deploy from GitHub repo"**
3. **Find "TV-management-System"** in the list
4. **Click "Deploy Now"**

**Narration:** "Railway will automatically detect this is a Node.js project and configure it for us."

---

### Step 3: Configure Service

Railway will automatically:

- ✅ Detect it's a Node.js project
- ✅ Set up the build process
- ✅ Create a service

**You need to configure:**

1. **Click on your service** (it will have a random name like "tvms-xyz")
2. **Click "Settings"** tab
3. **Set Root Directory:**
   ```
   TVMSFB/backend
   ```
4. **Set Start Command:**
   ```
   npm start
   ```

**Narration:** "We need to tell Railway where our backend code lives and how to start it."

---

### Step 4: Add Environment Variables

1. **Click "Variables"** tab
2. **Add each variable one by one:**

#### Required Variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tvms?retryWrites=true&w=majority
JWT_SECRET=your-generated-jwt-secret-here
PORT=3002
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

#### How to Add Each Variable:

1. **Click "New Variable"**
2. **Enter the key** (e.g., `MONGO_URI`)
3. **Enter the value** (your actual connection string)
4. **Click "Add"**
5. **Repeat for all variables**

**Narration:** "Environment variables are crucial for security. We never commit these secrets to Git."

---

### Step 5: Deploy and Test

1. **Click "Deployments"** tab
2. **Watch the build process** (usually 2-3 minutes)
3. **Wait for "Deployed"** status
4. **Copy your service URL** (e.g., `https://tvms-xyz-production.up.railway.app`)

#### Test Your Backend:

1. **Visit your service URL** in a browser
2. **You should see** a response (or try `/api/health`)
3. **Test API endpoint:** `https://your-service-url.up.railway.app/api/health`

**Expected response:**

```json
{ "status": "OK" }
```

**Narration:** "Railway's deployment is fast and reliable. Let's test that everything is working."

---

## 🔧 Advanced Configuration

### Custom Domain (Optional)

1. **Go to Settings** → **Domains**
2. **Click "Custom Domain"**
3. **Enter your domain** (e.g., `api.yourdomain.com`)
4. **Follow DNS instructions**
5. **Railway auto-provisions SSL**

### Resource Limits

Railway free tier includes:

- **$5 credit monthly** (usually enough for 1-2 small apps)
- **512MB RAM**
- **1GB storage**
- **Unlimited bandwidth**

### Monitoring

1. **Go to "Metrics"** tab
2. **View CPU, Memory, Network usage**
3. **Check logs** in "Deployments" tab

---

## 🧪 Testing Your Deployment

### Test 1: Health Check

```bash
curl https://your-service-url.up.railway.app/api/health
```

**Expected:** `{"status":"OK"}`

### Test 2: API Endpoints

```bash
# Test TV registration
curl -X POST https://your-service-url.up.railway.app/api/tv/register-tv \
  -H "Content-Type: application/json" \
  -d '{"tvId":"TEST001","name":"Test TV","location":"Test Room","resolution":"1920x1080"}'
```

### Test 3: WebSocket Connection

1. **Open browser console** on your frontend
2. **Check for WebSocket connection** to your Railway URL
3. **Should see connection established**

---

## 🔄 Auto-Deployment Setup

Railway automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update backend feature"
git push origin main

# Railway automatically:
# 1. Detects the push
# 2. Builds your project
# 3. Deploys the changes
# 4. Updates your live service
```

**No manual deployment needed!** 🎉

---

## 🐛 Troubleshooting

### Issue 1: "Build Failed"

**Common causes:**

- Missing dependencies in `package.json`
- Incorrect start command
- Wrong root directory

**Fix:**

1. Check **Deployments** tab for build logs
2. Verify `package.json` has all dependencies
3. Ensure start command is `npm start`
4. Check root directory is `TVMSFB/backend`

### Issue 2: "Service Won't Start"

**Common causes:**

- Missing environment variables
- Wrong PORT configuration
- MongoDB connection issues

**Fix:**

1. Check **Variables** tab - all required vars set?
2. Verify `PORT=3002` is set
3. Test MongoDB connection string
4. Check **Logs** tab for specific errors

### Issue 3: "WebSocket Not Working"

**Common causes:**

- CORS configuration
- Frontend URL not set
- Network issues

**Fix:**

1. Set `FRONTEND_URL` in environment variables
2. Check CORS settings in your code
3. Verify WebSocket URL in frontend

### Issue 4: "Out of Credits"

**Railway free tier:** $5 credit monthly

**Solutions:**

1. **Monitor usage** in dashboard
2. **Upgrade to paid plan** ($5/month)
3. **Optimize resource usage**

---

## 💰 Cost Breakdown

### Free Tier

- **$5 credit monthly** (usually enough for development)
- **512MB RAM**
- **1GB storage**
- **Unlimited bandwidth**

### Paid Plans

- **Developer:** $5/month (no credit limits)
- **Team:** $20/month (team features)
- **Enterprise:** Custom pricing

**For TVMS:** Free tier is usually sufficient for development and small production use.

---

## 🔗 Connecting with Frontend

Once your backend is deployed on Railway:

### Update Frontend Environment Variables

In your frontend deployment (Vercel/Netlify):

```env
NEXT_PUBLIC_API_URL=https://your-service-url.up.railway.app/api
NEXT_PUBLIC_WS_URL=https://your-service-url.up.railway.app
```

### Update Backend CORS

Add your frontend URL to Railway environment variables:

```env
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## 📊 Railway vs Other Platforms

| Feature           | Railway    | Render   | Heroku  |
| ----------------- | ---------- | -------- | ------- |
| **Free Tier**     | $5 credit  | 750 hrs  | ❌ No   |
| **WebSocket**     | ✅ Full    | ✅ Full  | ✅ Full |
| **Auto-Deploy**   | ✅ Yes     | ✅ Yes   | ✅ Yes  |
| **Ease of Use**   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐  |
| **Build Speed**   | 2-3 min    | 5-7 min  | 3-5 min |
| **Documentation** | Excellent  | Good     | Good    |

**Railway wins for:** Developer experience, speed, modern tooling

---

## 🎯 Next Steps

### After Successful Deployment:

1. **✅ Test all API endpoints**
2. **✅ Verify WebSocket connection**
3. **✅ Update frontend environment variables**
4. **✅ Test full application flow**
5. **✅ Set up monitoring/alerts**

### Optional Enhancements:

1. **Custom domain** for professional URLs
2. **Database backups** (MongoDB Atlas handles this)
3. **Monitoring setup** for production use
4. **CI/CD optimization** for faster deployments

---

## 📞 Getting Help

### Railway Support

- **Documentation:** [docs.railway.app](https://docs.railway.app)
- **Discord:** [discord.gg/railway](https://discord.gg/railway)
- **GitHub:** [github.com/railwayapp](https://github.com/railwayapp)

### Common Issues

- Check **Deployments** tab for build logs
- Check **Logs** tab for runtime errors
- Verify all **environment variables** are set
- Test **API endpoints** manually

---

## 🎉 Success!

Your TVMS backend is now deployed on Railway!

**What you've achieved:**

- ✅ **Live API** accessible worldwide
- ✅ **Auto-deployment** on every push
- ✅ **WebSocket support** for real-time features
- ✅ **Environment variables** securely managed
- ✅ **Professional hosting** with SSL

**Your backend URL:** `https://your-service-url.up.railway.app`

**Next:** Deploy your frontend and connect them together!

---

<p align="center">
  <strong>Ready to deploy?</strong>
  <br>
  <a href="https://railway.app">🚂 Deploy to Railway Now</a>
</p>
