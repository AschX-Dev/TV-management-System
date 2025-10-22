# TV Device Setup Guide

## For Standalone TV Devices

### Method 1: Using player.html (Simplest)

1. **Copy `player.html` to the TV device**
2. **Open in browser with parameters:**

   ```
   file:///path/to/player.html?tvId=TV001&apiUrl=https://your-backend.com
   ```

3. **OR edit player.html directly:**
   - Line 127: Change `const TV_ID = "TV001";` (set your TV ID)
   - Line 128: Change `const API_URL = "https://your-backend.com";`

### Method 2: Using Web URL

1. **Deploy frontend** to hosting (Vercel, Netlify, etc.)
2. **On TV browser, navigate to:**
   ```
   https://your-frontend.com/display/TV001
   ```

### Method 3: Kiosk Mode (Auto-start)

**Windows PC:**

```cmd
chrome.exe --kiosk --app=https://your-frontend.com/display/TV001
```

**Linux/Raspberry Pi:**

```bash
chromium-browser --kiosk --app=https://your-frontend.com/display/TV001
```

**Android TV:**

- Install "Fully Kiosk Browser"
- Set URL: `https://your-frontend.com/display/TV001`
- Enable auto-start

---

## Quick Test with Local Network

If your TV is on the same network:

1. **Find your computer's IP:**

   ```powershell
   ipconfig  # Look for IPv4 Address
   ```

2. **On TV browser, navigate to:**

   ```
   http://YOUR_COMPUTER_IP:3000/display/TV001
   ```

   Example: `http://192.168.1.100:3000/display/TV001`

3. **Make sure your firewall allows port 3000 and 3002**

---

## Production Deployment

### Backend (Render, Railway, Heroku):

```bash
cd TVMSFB/backend
# Set environment variables on hosting platform:
# - MONGO_URI
# - JWT_SECRET
# - PORT
npm start
```

### Frontend (Vercel, Netlify):

```bash
cd TVMSFB/frontend
# Set environment variables:
# - NEXT_PUBLIC_API_URL=https://your-backend.com/api
# - NEXT_PUBLIC_WS_URL=wss://your-backend.com
npm run build
```

---

## Troubleshooting

**TV shows "Waiting for content":**

- Check if TV is registered in admin panel
- Upload media to that specific TV ID
- Check WebSocket connection (green indicator)

**Can't connect:**

- Verify TV ID matches exactly
- Check network connectivity
- Ensure backend is running and accessible
- Check CORS settings in backend

**Media not updating:**

- Check WebSocket connection status
- Verify media was uploaded to correct TV ID
- Check browser console for errors (F12)

---

## Hardware Recommendations

**Budget Setup:**

- Raspberry Pi 4 (4GB RAM) - $55
- HDMI cable
- MicroSD card (16GB+)
- Install Raspberry Pi OS Lite + Chromium

**Commercial Setup:**

- Android TV box - $50-200
- Install Fully Kiosk Browser
- Set to auto-start on boot

**Premium Setup:**

- Smart TV with built-in browser
- Configure auto-start URL
- Disable sleep mode






