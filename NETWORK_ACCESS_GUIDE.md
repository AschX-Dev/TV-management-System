# 🌐 Network Access Setup Guide

## ✅ What's Been Configured

Your TV Management System is now configured for **network access** on your WiFi network!

### Current Configuration:

- **WiFi IP Address**: `192.168.100.150`
- **Backend Port**: `3002`
- **Frontend Port**: `3000`

### URLs for Network Access:

- **Admin Panel**: `http://192.168.100.150:3000/auth/login`
- **TV Display**: `http://192.168.100.150:3000/display/[TV_ID]`

---

## 🔥 Windows Firewall Setup (REQUIRED)

For other devices on your WiFi to access the system, you need to allow Node.js through Windows Firewall:

### Option 1: Automatic (When Prompted)

1. When you start the servers, Windows will show a **firewall popup**
2. Check **both** "Private networks" and "Public networks"
3. Click **"Allow access"**

### Option 2: Manual Setup

1. Press `Win + R`, type `wf.msc`, press Enter
2. Click **"Inbound Rules"** in left panel
3. Click **"New Rule..."** in right panel
4. Select **"Program"** → Next
5. Click **"Browse..."** and navigate to: `C:\Program Files\nodejs\node.exe`
6. Select **"Allow the connection"** → Next
7. Check **all three**: Domain, Private, Public → Next
8. Name: **"Node.js TVMS Server"** → Finish

### Verify Firewall Status:

```powershell
# Run in PowerShell to check:
netsh advfirewall firewall show rule name=all | Select-String -Pattern "Node"
```

---

## 📱 Testing on Other Devices

### Step 1: Get Your WiFi IP

Your current WiFi IP is: **`192.168.100.150`**

To verify or update:

```powershell
ipconfig | Select-String -Pattern "IPv4"
```

Look for the **non-APIPA address** (not 169.254.x.x)

### Step 2: Make Sure Both Servers Are Running

```powershell
# Backend (in C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB\backend)
npm run dev

# Frontend (in C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB\frontend)
npm run dev
```

### Step 3: Test from Another Device (Phone/Tablet/Another PC)

**Requirements:**

- Device must be on the **same WiFi network** as your computer
- Windows Firewall must allow Node.js (see above)

**Test URLs:**

1. **Admin Login (for testing):**

   ```
   http://192.168.100.150:3000/auth/login
   ```

   - Email: `admin@test.com`
   - Password: `admin123`

2. **TV Display Page:**

   ```
   http://192.168.100.150:3000/display/TV001
   ```

   (Replace `TV001` with your actual TV ID)

3. **Device Validation:**
   ```
   http://192.168.100.150:3000/display
   ```
   Enter your TV ID when prompted

---

## 🖥️ Setting Up an Actual TV Display

### For Kiosk Mode (Full-Screen Display):

**On Windows PC/TV:**

1. Open Chrome/Edge
2. Navigate to: `http://192.168.100.150:3000/display/TV001`
3. Press **F11** for full-screen
4. Disable sleep mode in Windows settings

**On Android TV/Tablet:**

1. Install **Chrome** or **Kiosk Browser**
2. Navigate to: `http://192.168.100.150:3000/display/TV001`
3. Use kiosk mode settings to prevent exit

**For Auto-Start on Boot:**

- See `TV_SETUP_GUIDE.md` for detailed instructions

---

## 🧪 Troubleshooting Network Access

### Problem: "Connection Refused" or "ERR_CONNECTION_REFUSED"

**Solution 1: Check Servers Are Running**

```powershell
# Check if Node.js processes are running:
Get-Process -Name node -ErrorAction SilentlyContinue
```

Should show 2 Node processes (frontend + backend)

**Solution 2: Verify Firewall**

- Temporarily disable Windows Firewall to test
- If it works, the firewall is blocking - add the rule above

**Solution 3: Check WiFi IP**
Your IP might have changed. Get the current IP:

```powershell
ipconfig | Select-String -Pattern "IPv4"
```

If different from `192.168.100.150`, update:

1. `TVMSFB/frontend/.env.local`
2. `TVMSFB/backend/server.js` (CORS origins)

### Problem: "ERR_CONNECTION_TIMED_OUT"

**Causes:**

1. Backend not running on port 3002
2. Firewall blocking connection
3. Devices on different WiFi networks
4. Router blocking inter-device communication

**Solution:**

```powershell
# Test if backend is listening:
Test-NetConnection -ComputerName 192.168.100.150 -Port 3002
```

### Problem: TV Display Shows But No Media

**Check:**

1. TV is registered in admin panel: `/admin/fetchAllTV`
2. Media has been uploaded: `/admin/recentUpload`
3. Media is assigned to the TV: `/admin/uploadMedia/direct`
4. WebSocket connection is active (check console for "Connected to WebSocket")

### Problem: CORS Error

**Error:** `Access-Control-Allow-Origin header is missing`

**Solution:**
Add your IP to `TVMSFB/backend/server.js`:

```javascript
app.use(
  cors({
    origin: [
      // ... existing origins
      "http://YOUR_IP:3000", // Add this
    ],
    credentials: true,
  })
);
```

---

## 📊 Testing Checklist

Before deploying to actual TVs, test everything:

- [ ] **Login from another device** (`http://192.168.100.150:3000/auth/login`)
- [ ] **Register a new TV** from admin panel
- [ ] **Upload media** (image/video) from admin panel
- [ ] **Assign media to TV** via direct upload
- [ ] **Open TV display** on another device (`http://192.168.100.150:3000/display/TV001`)
- [ ] **Verify media shows** on TV display
- [ ] **Test real-time updates**: Upload new media, verify it appears on TV without refresh
- [ ] **Test full-screen mode** (F11)
- [ ] **Verify WebSocket connection** (check browser console for "Connected")

---

## 🚀 Quick Start Commands

### Start Both Servers (PowerShell):

```powershell
# Terminal 1 - Backend
cd "C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB\backend"
npm run dev

# Terminal 2 - Frontend
cd "C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB\frontend"
npm run dev
```

### Or Use the PowerShell Script:

```powershell
cd "C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB"
.\START_SERVERS.ps1
```

---

## 📝 Important Notes

1. **Local Network Only**: This setup works only on your local WiFi network. For internet access, you'd need to deploy to cloud services (Vercel, Render, etc.)

2. **IP Address Changes**: Your WiFi IP (`192.168.100.150`) might change if your router restarts or reassigns IPs. To make it static:

   - Go to Router settings → DHCP → Reserve IP for your PC's MAC address
   - Or set a static IP in Windows Network settings

3. **Security**: The current setup is for **local development**. For production:

   - Enable HTTPS
   - Change JWT secret in `.env`
   - Enable email verification
   - Set stronger admin passwords

4. **Performance**: For best performance on TV displays:
   - Use wired Ethernet instead of WiFi if possible
   - Optimize media file sizes (compress videos/images)
   - Use modern browsers (Chrome/Edge)

---

## ✅ Configuration Files Updated

The following files have been configured for network access:

1. **`TVMSFB/frontend/.env.local`**

   ```
   NEXT_PUBLIC_API_URL=http://192.168.100.150:3002/api
   NEXT_PUBLIC_WS_URL=ws://192.168.100.150:3002
   ```

2. **`TVMSFB/backend/server.js`**

   - CORS whitelist updated with `http://192.168.100.150:3000`

3. **`TVMSFB/backend/.env`**
   - MongoDB Atlas connection string
   - JWT secret
   - Port configuration

---

**Need Help?** Check the console logs in both frontend and backend terminals for detailed error messages!


