# 🚀 TVMS Quick Start Guide

## System Overview

**TV Management System (TVMS)** is a full-stack digital signage solution that allows you to:

- 📺 Manage multiple TV displays remotely
- 🖼️ Upload and schedule media (images/videos)
- 🔴 Monitor TV status in real-time
- 🌐 Access from any device on your network

---

## ⚡ Quick Setup (5 Minutes)

### 1. Prerequisites

- ✅ Node.js installed
- ✅ WiFi connection
- ✅ MongoDB Atlas account (already configured)

### 2. Start the System

**Option A: Using PowerShell Script (Recommended)**

```powershell
cd "C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB"
.\START_SERVERS.ps1
```

**Option B: Manual Start**

Terminal 1 - Backend:

```powershell
cd "C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB\backend"
npm run dev
```

Terminal 2 - Frontend:

```powershell
cd "C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB\frontend"
npm run dev
```

### 3. Access the System

**On Your Computer:**

- Admin Panel: `http://localhost:3000/auth/login`
- TV Display: `http://localhost:3000/display/[TV_ID]`

**On Other Devices (same WiFi):**

- Admin Panel: `http://192.168.100.150:3000/auth/login`
- TV Display: `http://192.168.100.150:3000/display/[TV_ID]`

**Default Login:**

- Email: `admin@test.com`
- Password: `admin123`

---

## 📱 Basic Workflow

### Step 1: Register a TV

1. Login to admin panel
2. Go to **Manage TV** → **Register New TV**
3. Fill in:
   - TV ID: `TV001`
   - Name: `Main Lobby`
   - Location: `Building A`
   - Resolution: `1920x1080`
4. Click **Register**

### Step 2: Upload Media

1. Go to **Upload Media** → **Direct Upload**
2. Select TV: `TV001`
3. Fill in media details
4. Upload image/video
5. Click **Upload**

### Step 3: View on TV Display

1. Open new browser tab/device
2. Navigate to: `http://192.168.100.150:3000/display/TV001`
3. Press **F11** for full-screen
4. Media plays automatically!

---

## 🎯 Common Tasks

### How to Add a New Admin

1. Go to **Manage Admin** → **Add New Admin**
2. Fill in details
3. Click **Register**
4. Admin receives email with credentials

### How to Change Media on a TV

1. Go to **Upload Media** → **Direct Upload**
2. Select the TV
3. Upload new media
4. **TV display updates automatically** (real-time!)

### How to View All TVs

1. Go to **Fetch All TV**
2. See status (🟢 Online / 🔴 Offline)
3. Click TV for details

### How to View Media Library

1. Go to **Recent Upload**
2. See all uploaded media
3. Filter by category/date
4. Click for preview

---

## 🌐 Network Access Setup

### For Other Devices on Same WiFi

1. **Get Your WiFi IP:**

   ```powershell
   ipconfig | Select-String -Pattern "IPv4"
   ```

   Look for IP like: `192.168.100.150` (not `169.254.x.x`)

2. **Allow Through Firewall:**

   - Press `Win + R`, type `wf.msc`, Enter
   - **Inbound Rules** → **New Rule**
   - Select **Program** → Browse to `C:\Program Files\nodejs\node.exe`
   - **Allow the connection**
   - Check all profiles (Domain, Private, Public)
   - Name: "Node.js TVMS"

3. **Access from Other Device:**
   - Use URL: `http://YOUR_IP:3000/display/TV001`
   - Example: `http://192.168.100.150:3000/display/TV001`

**See `NETWORK_ACCESS_GUIDE.md` for detailed instructions**

---

## 🖥️ Setting Up a Physical TV

### For Windows PC/Smart TV:

1. Connect to WiFi
2. Open Chrome browser
3. Navigate to: `http://192.168.100.150:3000/display/TV001`
4. Press **F11** for full-screen
5. Disable screensaver/sleep in Windows settings

### For Auto-Start on Boot:

1. Press `Win + R`, type `shell:startup`, Enter
2. Create shortcut to Chrome:
   ```
   "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --app=http://192.168.100.150:3000/display/TV001
   ```
3. TV will auto-start display on boot!

**See `TV_SETUP_GUIDE.md` for detailed instructions**

---

## 🧪 Testing Checklist

Before using in production, test:

- [ ] Login works
- [ ] TV registration works
- [ ] Media upload works (images + videos)
- [ ] TV display shows media
- [ ] Real-time updates work (upload media, see it instantly on TV)
- [ ] Network access works from another device
- [ ] Full-screen mode works (F11)
- [ ] Multiple TVs work independently

**See `TESTING_GUIDE.md` for comprehensive testing**

---

## 📁 Project Structure

```
TVMSFB/
├── backend/                 # Node.js + Express API
│   ├── controllers/         # Business logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── socket/             # WebSocket for real-time
│   ├── .env                # Environment variables
│   └── server.js           # Entry point
│
├── frontend/               # Next.js React app
│   ├── app/
│   │   ├── admin/          # Admin panel pages
│   │   ├── display/        # TV display pages
│   │   ├── auth/           # Login/auth pages
│   │   └── components/     # Reusable components
│   ├── .env.local          # Frontend env vars
│   └── package.json
│
├── START_SERVERS.ps1       # Quick start script
├── QUICK_START.md          # This file
├── NETWORK_ACCESS_GUIDE.md # Network setup guide
├── TESTING_GUIDE.md        # Testing instructions
└── TV_SETUP_GUIDE.md       # TV hardware setup
```

---

## 🔧 Configuration Files

### Backend `.env` (`TVMSFB/backend/.env`)

```env
PORT=3002
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
EMAIL_ENABLED=false
```

### Frontend `.env.local` (`TVMSFB/frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://192.168.100.150:3002/api
NEXT_PUBLIC_WS_URL=ws://192.168.100.150:3002
```

**For localhost testing**, change to:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
NEXT_PUBLIC_WS_URL=ws://localhost:3002
```

---

## 🐛 Troubleshooting

### Servers Won't Start

**Problem**: Port already in use

**Solution**:

```powershell
# Kill all Node processes
Get-Process -Name node | Stop-Process -Force

# Wait 5 seconds, then restart
```

### Login Redirects Back to Login Page

**Problem**: Token not being stored

**Solution**:

1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Hard refresh: Ctrl+Shift+R
4. Login again

### MongoDB Connection Failed

**Problem**: `ETIMEDOUT` or `ECONNREFUSED`

**Solution**:

1. Go to https://cloud.mongodb.com
2. **Network Access** → **Add IP Address**
3. Choose **"Allow from Anywhere"** (0.0.0.0/0)
4. Save and restart backend

### TV Display Shows Blank Screen

**Problem**: No media assigned or TV not registered

**Solution**:

1. Check `/admin/fetchAllTV` - TV should be listed
2. Check `/admin/recentUpload` - Media should exist
3. Upload media via `/admin/uploadMedia/direct`
4. Select the specific TV
5. Refresh TV display page

### Cannot Access from Another Device

**Problem**: Firewall blocking or wrong IP

**Solution**:

1. Check firewall allows Node.js (see Network Access Setup above)
2. Verify IP: `ipconfig | Select-String -Pattern "IPv4"`
3. Update `.env.local` with correct IP
4. Restart frontend server

### Real-Time Updates Not Working

**Problem**: WebSocket not connecting

**Solution**:

1. Check browser console for WebSocket errors
2. Verify backend is running on port 3002
3. Check `.env.local` has correct `NEXT_PUBLIC_WS_URL`
4. Restart both servers

---

## 📊 System Requirements

### Server (Your Computer):

- Windows 10/11
- Node.js 18+
- 4GB RAM minimum
- WiFi connection
- Ports 3000, 3002 available

### TV/Display Device:

- Any device with modern browser (Chrome/Edge recommended)
- WiFi connection (or Ethernet)
- Same network as server
- 1920x1080 or higher resolution recommended

---

## 🎓 Learning Resources

### Key Technologies:

- **Frontend**: Next.js 15, React, TailwindCSS, Socket.io-client
- **Backend**: Node.js, Express, MongoDB, Socket.io
- **Media**: Cloudinary CDN
- **Auth**: JWT tokens, localStorage

### API Endpoints:

- `POST /api/admin/login` - Admin login
- `POST /api/tv/register-tv` - Register new TV
- `GET /api/tv/all` - Get all TVs
- `POST /api/media/save` - Upload media
- `GET /api/tv/display/:tvId` - Get TV media

### WebSocket Events:

- `media-update` - New media uploaded
- `tv-status` - TV online/offline
- `connection` - Client connected

---

## 🚀 Next Steps

After basic setup:

1. **Test Everything**: Follow `TESTING_GUIDE.md`
2. **Setup Network Access**: Follow `NETWORK_ACCESS_GUIDE.md`
3. **Deploy to TVs**: Follow `TV_SETUP_GUIDE.md`
4. **Customize**: Modify layouts, add features
5. **Production Deploy**: Move to cloud (Vercel, Render)

---

## 📞 Quick Reference

### URLs (Local):

- Admin: `http://localhost:3000/auth/login`
- Display: `http://localhost:3000/display/TV001`

### URLs (Network):

- Admin: `http://192.168.100.150:3000/auth/login`
- Display: `http://192.168.100.150:3000/display/TV001`

### Commands:

```powershell
# Start servers
.\START_SERVERS.ps1

# Check processes
Get-Process -Name node

# Stop all
Get-Process -Name node | Stop-Process -Force

# Check IP
ipconfig | Select-String -Pattern "IPv4"

# Test backend
curl http://localhost:3002/api/tv/all
```

### Default Credentials:

- Email: `admin@test.com`
- Password: `admin123`

---

## ✅ You're All Set!

Your TVMS is ready to use. Follow the **Basic Workflow** above to get started, or jump to detailed guides for specific tasks.

**Happy Broadcasting! 📺**
