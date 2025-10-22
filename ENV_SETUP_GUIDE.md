# 🔐 Environment Variables Setup Guide

This guide will help you set up environment variables for development and production.

---

## 📋 Quick Reference

### Backend Variables (8 required)
1. `MONGO_URI` - MongoDB connection string
2. `JWT_SECRET` - Secret key for JWT tokens
3. `PORT` - Server port (3002)
4. `NODE_ENV` - Environment (development/production)
5. `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
6. `CLOUDINARY_API_KEY` - Cloudinary API key
7. `CLOUDINARY_API_SECRET` - Cloudinary API secret
8. `FRONTEND_URL` - Frontend URL for CORS

### Frontend Variables (2 required)
1. `NEXT_PUBLIC_API_URL` - Backend API endpoint
2. `NEXT_PUBLIC_WS_URL` - WebSocket endpoint

---

## 🖥️ Local Development Setup

### Step 1: Create Backend .env File

1. Navigate to `TVMSFB/backend/`
2. Create a file named `.env` (no extension)
3. Copy and paste this template:

```env
# MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tvms?retryWrites=true&w=majority

# JWT Secret (generate a random 32+ character string)
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string

# Server
PORT=3002
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SendGrid (Optional - for email features)
SENDGRID_API_KEY=SG.your_sendgrid_key
FROM_EMAIL=noreply@yourdomain.com

# Frontend (for CORS)
FRONTEND_URL=http://localhost:3000
```

4. **Replace placeholder values** with your actual credentials (see below)

### Step 2: Create Frontend .env.local File

1. Navigate to `TVMSFB/frontend/`
2. Create a file named `.env.local`
3. Copy and paste:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
NEXT_PUBLIC_WS_URL=http://localhost:3002
```

---

## 🔑 How to Get Your Credentials

### 1. MongoDB URI (MONGO_URI)

**Step-by-step:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Log in to your account
3. Click **"Database"** in the left sidebar
4. Click **"Connect"** button on your cluster
5. Choose **"Connect your application"**
6. Copy the connection string
7. It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
8. Replace `<username>` and `<password>` with your actual database user credentials
9. Add your database name after `.net/` (e.g., `/tvms`)

**Final format:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/tvms?retryWrites=true&w=majority
```

**Important:** 
- Use the **database user** password, not your Atlas account password
- If you forgot the password, create a new database user in **Database Access**

---

### 2. JWT Secret (JWT_SECRET)

**Option A: Generate in Node.js**
```javascript
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option B: Generate Online**
1. Go to [RandomKeygen](https://randomkeygen.com/)
2. Copy a **CodeIgniter Encryption Key** or **256-bit WPA Key**

**Example:**
```
JWT_SECRET=a7f9c8e6d5b4a3f2e1d9c8b7a6f5e4d3c2b1a9f8e7d6c5b4a3f2e1d0c9b8a7f6
```

**Requirements:**
- Minimum 32 characters
- Mix of letters and numbers
- Keep it secret and secure!

---

### 3. Cloudinary Credentials

**Step-by-step:**
1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Log in to your account
3. You'll see your **Dashboard**
4. Find the **Account Details** section
5. Copy these three values:
   - **Cloud Name**
   - **API Key**
   - **API Secret** (click "👁️ Reveal")

**Example:**
```env
CLOUDINARY_CLOUD_NAME=dxxxxx123
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

---

### 4. SendGrid API Key (Optional)

**Only needed if you want email features (password reset, notifications)**

**Step-by-step:**
1. Go to [SendGrid](https://app.sendgrid.com)
2. Sign up for a free account
3. Go to **Settings** → **API Keys**
4. Click **"Create API Key"**
5. Name it: `TVMS Production`
6. Choose **"Full Access"**
7. Click **"Create & View"**
8. **Copy the key immediately** (you won't see it again!)

**Example:**
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
FROM_EMAIL=noreply@yourdomain.com
```

---

## 🚀 Production Deployment Setup

### For Render (Backend)

1. Go to your service in Render dashboard
2. Click **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Add each variable one by one:

```
MONGO_URI = mongodb+srv://user:pass@cluster.mongodb.net/tvms?retryWrites=true&w=majority
JWT_SECRET = your-generated-secret-key
PORT = 3002
NODE_ENV = production
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
FRONTEND_URL = https://your-project.vercel.app
```

5. Click **"Save Changes"**
6. Service will auto-redeploy

---

### For Vercel (Frontend)

1. Go to your project in Vercel dashboard
2. Click **"Settings"**
3. Click **"Environment Variables"**
4. Add each variable:

```
NEXT_PUBLIC_API_URL = https://your-backend.onrender.com/api
NEXT_PUBLIC_WS_URL = https://your-backend.onrender.com
```

5. Choose environment: **Production**, **Preview**, and **Development** (select all)
6. Click **"Save"**
7. Go to **"Deployments"** → Click **"..."** → **"Redeploy"**
8. Uncheck **"Use existing Build Cache"**
9. Click **"Redeploy"**

---

## 🌐 Network Access Setup (WiFi Testing)

To test on multiple devices on the same WiFi network:

### Step 1: Find Your Computer's IP Address

**Windows:**
```powershell
ipconfig
```
Look for **"Wireless LAN adapter Wi-Fi"** → **IPv4 Address**
Example: `192.168.100.150`

**macOS/Linux:**
```bash
ifconfig | grep "inet "
```

### Step 2: Update Frontend .env.local

Replace `localhost` with your IP:

```env
NEXT_PUBLIC_API_URL=http://192.168.100.150:3002/api
NEXT_PUBLIC_WS_URL=http://192.168.100.150:3002
```

### Step 3: Update Backend CORS

Edit `backend/server.js` - add your IP to CORS whitelist:

```javascript
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://192.168.100.150:3000",  // Add this line
  ],
  credentials: true,
};
```

### Step 4: Restart Both Servers

```powershell
# Use the startup script
.\START_SERVERS.ps1
```

### Step 5: Access from Other Devices

On your phone/tablet/another computer (connected to same WiFi):
```
http://192.168.100.150:3000/display/TV001
```

---

## ✅ Verification Checklist

### Backend Environment Variables
- [ ] `MONGO_URI` - Can connect to MongoDB Atlas
- [ ] `JWT_SECRET` - At least 32 characters
- [ ] `PORT` - Set to 3002
- [ ] `NODE_ENV` - Set correctly (development/production)
- [ ] `CLOUDINARY_CLOUD_NAME` - Matches your Cloudinary account
- [ ] `CLOUDINARY_API_KEY` - Valid API key
- [ ] `CLOUDINARY_API_SECRET` - Valid API secret
- [ ] `FRONTEND_URL` - Correct frontend URL

### Frontend Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` - Points to backend API
- [ ] `NEXT_PUBLIC_WS_URL` - Points to backend WebSocket

### Testing
- [ ] Backend starts without errors: `cd backend && npm run dev`
- [ ] Frontend starts without errors: `cd frontend && npm run dev`
- [ ] Can log in to admin panel
- [ ] Can register a TV device
- [ ] Can upload media
- [ ] TV display works

---

## 🐛 Troubleshooting

### Error: "MongoServerError: bad auth"
**Fix:** Your MongoDB username or password is incorrect
- Go to MongoDB Atlas → Database Access
- Create a new user or reset password
- Update `MONGO_URI` with new credentials

### Error: "ETIMEDOUT" connecting to MongoDB
**Fix:** Your IP is not whitelisted
- Go to MongoDB Atlas → Network Access
- Click "Add IP Address"
- Click "Allow Access from Anywhere" (0.0.0.0/0)
- Click "Confirm"

### Error: "Cloudinary upload failed"
**Fix:** Invalid Cloudinary credentials
- Double-check all three values in Cloudinary dashboard
- Ensure no extra spaces in the `.env` file
- API Secret might be hidden - click the eye icon to reveal

### Error: "jwt must be provided"
**Fix:** Frontend can't reach backend
- Check `NEXT_PUBLIC_API_URL` is correct
- Ensure backend is running
- Check browser console for network errors
- Verify CORS settings in `backend/server.js`

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep `.env` and `.env.local` files in `.gitignore`
- Use strong, random JWT secrets
- Rotate secrets periodically
- Use environment-specific values
- Whitelist specific IPs when possible

### ❌ DON'T:
- Never commit `.env` files to Git
- Don't share your secrets publicly
- Don't use simple passwords like "password123"
- Don't use the same JWT secret in dev and production
- Don't hardcode secrets in your code

---

## 📝 Environment Variables Template

Copy this for quick reference:

```bash
# Backend (.env)
MONGO_URI=mongodb+srv://user:pass@cluster.net/tvms
JWT_SECRET=random-32-character-string-here
PORT=3002
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
FRONTEND_URL=http://localhost:3000

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3002/api
NEXT_PUBLIC_WS_URL=http://localhost:3002
```

---

## 🎯 Quick Start Commands

```powershell
# 1. Set up environment files
cd "C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB"

# Create backend .env
cd backend
# Create .env file and add variables (see template above)

# Create frontend .env.local
cd ../frontend
# Create .env.local file and add variables (see template above)

# 2. Start servers
cd ..
.\START_SERVERS.ps1
```

---

**Need help?** Check the full [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for more details!

