# 🎬 TVMS Deployment Tutorial Script

This is a step-by-step script for creating a deployment tutorial video or following along manually.

---

## 🎯 Tutorial Overview

**Duration:** ~30 minutes  
**Difficulty:** Beginner-friendly  
**What You'll Deploy:**
- Frontend: Next.js app on Vercel
- Backend: Node.js API on Render
- Result: Fully functional TV Management System accessible worldwide

---

## 📌 Part 1: Prerequisites (5 minutes)

### What You Need:
1. ✅ GitHub account
2. ✅ Your code pushed to GitHub
3. ✅ MongoDB Atlas account (free tier)
4. ✅ Cloudinary account (free tier)
5. ✅ Email address for account creation

### Before Starting:
- [ ] Close all old terminal windows
- [ ] Open your GitHub repository
- [ ] Have MongoDB Atlas connection string ready
- [ ] Have Cloudinary credentials ready

---

## 🔧 Part 2: Deploy Backend to Render (12 minutes)

### Step 1: Sign Up for Render
**Screencast:**
1. Open [render.com](https://render.com)
2. Click "Get Started for Free"
3. Click "Sign in with GitHub"
4. Authorize Render to access your GitHub account
5. You'll be redirected to Render dashboard

**Narration:**
> "First, we'll deploy our backend to Render. Render is a cloud platform that offers free hosting for web services. Let's sign up using our GitHub account."

---

### Step 2: Create New Web Service
**Screencast:**
1. Click "New +" button (top right)
2. Select "Web Service"
3. Click "Connect GitHub account" (if not connected)
4. Find "TV-management-System" in the list
5. Click "Connect"

**Narration:**
> "Now we'll create a new web service. Render will automatically detect our GitHub repository and set up continuous deployment."

---

### Step 3: Configure Service Settings
**Screencast:**
Fill in the form:
```
Name: tvms-backend
Region: Oregon (US-West) [or closest to you]
Branch: main
Root Directory: TVMSFB/backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

**Narration:**
> "Let's configure our backend service. We'll name it 'tvms-backend' and set the root directory to where our backend code lives. For the free tier, we get 750 hours per month, which is plenty for our needs."

---

### Step 4: Add Environment Variables
**Screencast:**
Click "Advanced" → "Add Environment Variable"

Add these one by one:

1. **MONGO_URI**
   - Show MongoDB Atlas dashboard
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with actual password
   - Paste into Render

2. **JWT_SECRET**
   - Open terminal
   - Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Copy the generated string
   - Paste into Render

3. **Other variables:**
   ```
   PORT = 3002
   NODE_ENV = production
   CLOUDINARY_CLOUD_NAME = [from Cloudinary dashboard]
   CLOUDINARY_API_KEY = [from Cloudinary dashboard]
   CLOUDINARY_API_SECRET = [from Cloudinary dashboard]
   ```

**Narration:**
> "Environment variables are crucial for security. We never commit these secrets to Git. Instead, we add them directly in Render's dashboard. Let me show you how to get each credential."

---

### Step 5: Deploy Backend
**Screencast:**
1. Click "Create Web Service"
2. Show deployment logs
3. Wait for "Your service is live 🎉"
4. Click on the service URL at the top
5. Should see the backend respond (or try /api/health)

**Narration:**
> "Now we click deploy and wait. The first deployment usually takes 5-7 minutes. Render is installing dependencies and starting our server. Once it's done, we'll get a live URL."

**Important:** Copy the backend URL: `https://tvms-backend-xxxx.onrender.com`

---

## 🎨 Part 3: Deploy Frontend to Vercel (10 minutes)

### Step 1: Sign Up for Vercel
**Screencast:**
1. Open [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

**Narration:**
> "Vercel is created by the makers of Next.js, so it's the perfect platform for our frontend. Let's sign up using GitHub."

---

### Step 2: Import Project
**Screencast:**
1. Click "Add New..." → "Project"
2. Find "TV-management-System"
3. Click "Import"

**Narration:**
> "Vercel automatically detects that this is a Next.js project and will configure the build settings for us."

---

### Step 3: Configure Build Settings
**Screencast:**
```
Framework Preset: Next.js (auto-detected)
Root Directory: TVMSFB/frontend [click Edit]
Build Command: npm run build (auto)
Output Directory: .next (auto)
Install Command: npm install (auto)
```

**Narration:**
> "We just need to set the root directory to point to our frontend folder. Vercel handles the rest automatically."

---

### Step 4: Add Environment Variables
**Screencast:**
Click "Environment Variables"

Add:
```
NEXT_PUBLIC_API_URL = https://tvms-backend-xxxx.onrender.com/api
NEXT_PUBLIC_WS_URL = https://tvms-backend-xxxx.onrender.com
```

**Important:** Use the backend URL from Part 2, Step 5

**Narration:**
> "We need to tell our frontend where to find the backend. We'll use the Render URL we just deployed."

---

### Step 5: Deploy Frontend
**Screencast:**
1. Click "Deploy"
2. Show build logs
3. Wait for "Congratulations!" confetti
4. Click "Visit" button
5. Show the homepage loading

**Narration:**
> "Vercel's deployment is lightning fast, usually taking just 2-3 minutes. And we're done! Our frontend is now live."

**Copy the frontend URL:** `https://your-project.vercel.app`

---

## 🔗 Part 4: Connect Frontend and Backend (3 minutes)

### Update Backend CORS
**Screencast:**
1. Go back to Render dashboard
2. Click on "tvms-backend" service
3. Click "Environment" tab
4. Add new variable:
   ```
   FRONTEND_URL = https://your-project.vercel.app
   ```
5. Click "Save Changes"
6. Service automatically redeploys

**Narration:**
> "One last step: we need to tell our backend to accept requests from our frontend. We add the Vercel URL to our CORS whitelist."

---

## 🧪 Part 5: Testing Your Deployment (8 minutes)

### Test 1: Homepage
**Screencast:**
1. Visit: `https://your-project.vercel.app`
2. Show homepage loading
3. Open browser DevTools (F12) → Console
4. No errors should appear

**Narration:**
> "Let's test everything. First, the homepage should load without any errors in the console."

---

### Test 2: Login
**Screencast:**
1. Click "Login" or go to `/auth/login`
2. Enter admin credentials
3. Click "Login"
4. Should redirect to admin dashboard

**Narration:**
> "Now let's test authentication. If we can log in, it means the frontend is successfully talking to the backend."

---

### Test 3: Register TV
**Screencast:**
1. Go to "Manage TV" → "Register New TV"
2. Fill in:
   ```
   TV ID: DEMO001
   Name: Demo Display
   Location: Tutorial Room
   Resolution: 1920x1080
   ```
3. Click "Register TV"
4. Show success message

**Narration:**
> "Let's register our first TV device. This tests our database connection through MongoDB Atlas."

---

### Test 4: Upload Media
**Screencast:**
1. Go to "Upload Media" → "Direct Upload"
2. Select "DEMO001" from dropdown
3. Add title and description
4. Drag and drop an image
5. Show upload progress
6. Show success message

**Narration:**
> "Now we'll test media upload. This verifies our Cloudinary integration is working correctly."

---

### Test 5: TV Display
**Screencast:**
1. Open new incognito tab
2. Go to: `https://your-project.vercel.app/display`
3. Enter TV ID: DEMO001
4. Show validation and redirect
5. Show media appearing on display
6. Point out "Online" status indicator

**Narration:**
> "And finally, the TV display. This is what would be shown on a physical TV or digital signage display. The media we just uploaded appears automatically."

---

### Test 6: Real-time Updates
**Screencast:**
1. Keep TV display tab open (side-by-side)
2. In admin tab, upload a new image to DEMO001
3. Show the TV display updating automatically

**Narration:**
> "Here's the magic: real-time updates via WebSockets. When we upload new media, the TV display updates instantly without refreshing."

---

## 🎉 Part 6: Wrap Up (2 minutes)

### What We Accomplished:
**Screencast:** Show split screen
- Left: Admin panel
- Right: TV display

**Narration:**
> "Congratulations! You've successfully deployed a full-stack TV Management System. Your application is now:
> - Hosted on professional cloud platforms
> - Accessible from anywhere in the world
> - Secured with HTTPS
> - Automatically deployed when you push to GitHub
> - Running on free tiers with room to grow
>
> Every time you push code to GitHub, both Vercel and Render will automatically redeploy your changes. That's continuous deployment in action!"

---

### URLs to Save:
```
Admin Panel: https://your-project.vercel.app/admin
TV Display: https://your-project.vercel.app/display
Backend API: https://tvms-backend-xxxx.onrender.com/api
```

---

### Next Steps:
1. ✅ Customize your admin credentials
2. ✅ Register your actual TV devices
3. ✅ Upload your content
4. ✅ (Optional) Add a custom domain
5. ✅ (Optional) Upgrade to paid tiers for more resources

---

## 🎬 Optional: Advanced Topics

### Adding a Custom Domain (Vercel)
1. Go to Vercel project → Settings → Domains
2. Add your domain (e.g., tvms.yourcompany.com)
3. Follow DNS configuration steps
4. Vercel auto-provisions SSL certificate

### Setting Up Uptime Monitoring
1. Sign up for [UptimeRobot](https://uptimerobot.com) (free)
2. Add monitor for your Render backend
3. Ping every 5 minutes to prevent sleeping
4. Get email alerts if site goes down

### Viewing Logs
**Vercel:**
- Dashboard → Deployments → Click deployment → Logs

**Render:**
- Dashboard → Your service → Logs tab

---

## 📝 Troubleshooting Scenarios

### Scenario 1: "Application Failed to Respond"
**Show:**
1. Check Render logs
2. Look for error messages
3. Common fix: Check MongoDB connection
4. Verify environment variables

### Scenario 2: Frontend Can't Connect to Backend
**Show:**
1. Open browser DevTools → Network tab
2. Look for CORS errors
3. Check `FRONTEND_URL` in Render
4. Verify `NEXT_PUBLIC_API_URL` in Vercel

### Scenario 3: Images Not Uploading
**Show:**
1. Check Render logs for Cloudinary errors
2. Verify Cloudinary credentials
3. Check Cloudinary dashboard for quota
4. Test with smaller image file

---

## 🎥 B-Roll Suggestions

- Dashboard overviews
- Deployment progress bars
- Success animations
- Split-screen comparisons
- Mobile device testing
- Network diagram animations

---

## 📚 Resources to Mention

- Deployment Guide: `DEPLOYMENT_GUIDE.md`
- Deployment Checklist: `DEPLOYMENT_CHECKLIST.md`
- Environment Variables Guide: `ENV_SETUP_GUIDE.md`
- GitHub Repository: `https://github.com/AschX-Dev/TV-management-System`

---

**End of Tutorial Script**

**Total Duration:** ~30 minutes  
**Skill Level:** Beginner to Intermediate  
**Result:** Fully deployed, production-ready TV Management System

