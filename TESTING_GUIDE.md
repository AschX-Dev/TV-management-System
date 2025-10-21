# 🧪 TVMS Testing Guide

## Complete System Testing Checklist

This guide will walk you through testing **every feature** of your TV Management System to ensure everything works before deploying to actual TVs.

---

## 🚀 Pre-Testing Setup

### 1. Start Both Servers

**Terminal 1 - Backend:**

```powershell
cd "C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB\backend"
npm run dev
```

**Terminal 2 - Frontend:**

```powershell
cd "C:\books store\4th 2nd SECE\D. com\TVMS\TVMSFB\frontend"
npm run dev
```

**Expected Output:**

- Backend: `✅ DataBase Connected Successfully!` and `Server running on port 3002`
- Frontend: `✓ Ready in X.Xs` and `Local: http://localhost:3000`

### 2. Verify MongoDB Connection

Check backend terminal for:

```
✅ DataBase Connected Successfully!
📊 Database Name: tvms
```

If you see errors, check `NETWORK_ACCESS_GUIDE.md` troubleshooting section.

---

## 📋 Test 1: Authentication System

### Test Admin Login

1. **Open Browser**: `http://localhost:3000/auth/login`
2. **Enter Credentials**:
   - Email: `admin@test.com`
   - Password: `admin123`
3. **Click "Login"**

**Expected Result:**

- ✅ Redirects to `/admin/home` (Dashboard)
- ✅ No redirect loop back to login
- ✅ Console shows: `✅ Token stored in localStorage`

**Backend Console Should Show:**

```
🍪 Cookie set for user: new ObjectId('...')
🔐 Token check: Token found
✅ Token verified for user: ...
```

**Browser Console Should Show:**

```
🔵 handleLogin called!
📥 Login response: {success: true, token: "...", ...}
✅ Token stored in localStorage: eyJhbGciOiJIUz...
🚀 Redirecting to /admin/home
```

### Test Token Persistence

1. **Refresh the page** (F5)
2. **Expected**: Should stay on `/admin/home`, not redirect to login

**Check localStorage:**

```javascript
// In browser console:
localStorage.getItem("token");
// Should return a JWT token string
```

### Test Logout (if implemented)

1. Click logout button
2. Should redirect to `/auth/login`
3. `localStorage` should be cleared

---

## 📋 Test 2: TV Registration

### Register a New TV

1. **Navigate**: `/admin/manageTV/registerNewTV`
2. **Fill in the form**:
   - **TV ID**: `TV001` (or any unique ID)
   - **Name**: `Main Lobby TV`
   - **Location**: `Building A - Lobby`
   - **Resolution**: `1920x1080`
3. **Click "Register TV"**

**Expected Result:**

- ✅ Success toast: "TV registered successfully"
- ✅ TV ID appears on the page or in a list

**Backend Console:**

```
POST /api/tv/register-tv
TV registered: TV001
```

### Verify TV Registration

1. **Navigate**: `/admin/fetchAllTV`
2. **Expected**: See your registered TV with:
   - TV ID: `TV001`
   - Name: `Main Lobby TV`
   - Location: `Building A - Lobby`
   - Resolution: `1920x1080`
   - Status: 🔴 Offline (initially)

### Register Multiple TVs

Repeat the process with:

- `TV002` - Conference Room A
- `TV003` - Cafeteria

This will help test multi-device scenarios.

---

## 📋 Test 3: Media Upload

### Upload Image Media

1. **Navigate**: `/admin/uploadMedia/direct`
2. **Select TV**: Choose `TV001` from dropdown
3. **Fill in Details**:
   - **Title**: `Welcome Banner`
   - **Category**: Select a category
   - **Duration**: `10` (seconds)
4. **Upload File**: Click upload area, select an image (PNG/JPG)
5. **Click "Upload Media"**

**Expected Result:**

- ✅ Upload progress indicator
- ✅ Success message: "Media uploaded successfully"
- ✅ Image preview appears

**Backend Console:**

```
POST /api/media/save
Cloudinary upload successful
Media saved for TV: TV001
```

### Upload Video Media

1. Repeat the process with a **video file** (MP4)
2. **Expected**: Video preview should show

### Test File Validation

Try uploading:

- ❌ **Too large file** (>50MB) - should show error
- ❌ **Invalid format** (.txt, .exe) - should show error
- ✅ **Valid formats** (jpg, png, mp4, mov) - should work

### Verify Media in Library

1. **Navigate**: `/admin/recentUpload`
2. **Expected**: See all uploaded media with:
   - Thumbnail
   - Title
   - Category
   - Upload date
   - Assigned TVs

---

## 📋 Test 4: TV Display Page

### Access Display Page (Same Device)

1. **Open New Browser Tab/Window**
2. **Navigate**: `http://localhost:3000/display/TV001`

**Expected Result:**

- ✅ TV display page loads
- ✅ Shows uploaded media (Welcome Banner)
- ✅ Media plays for specified duration
- ✅ Transitions to next media (if multiple)

**Browser Console:**

```
Connected to WebSocket: ws://localhost:3002
Fetching media for TV: TV001
Media loaded: [...]
```

### Test Device Validation Flow

1. **Navigate**: `http://localhost:3000/display`
2. **Enter TV ID**: `TV001`
3. **Click "Validate"**
4. **Expected**: Redirects to `http://localhost:3000/display/TV001`

### Test Invalid TV ID

1. **Navigate**: `http://localhost:3000/display/INVALID123`
2. **Expected**: Redirects to validation page with error message

---

## 📋 Test 5: Real-Time Updates (WebSocket)

### Test Live Media Update

**Setup:**

1. Open **2 browser windows side-by-side**:
   - Window 1: `/admin/uploadMedia/direct` (Admin panel)
   - Window 2: `/display/TV001` (TV display)

**Test:**

1. In **Window 1**: Upload a **new image** for `TV001`
2. Watch **Window 2** (TV display)

**Expected Result:**

- ✅ New media appears on TV display **without page refresh**
- ✅ Smooth transition from current media to new media
- ✅ Backend console shows: `Emitting media update to TV: TV001`

**Browser Console (Window 2):**

```
WebSocket message received: {type: "media-update", tvId: "TV001"}
Refreshing media...
```

### Test Connection Status

1. **Stop the backend server** (Ctrl+C in backend terminal)
2. **Check TV display** (Window 2)

**Expected:**

- ✅ Connection status shows "Disconnected" or "Offline"
- ✅ Media continues playing from cache (if implemented)

3. **Restart backend**: `npm run dev`

**Expected:**

- ✅ Connection status shows "Connected" or "Online"
- ✅ TV status in `/admin/fetchAllTV` changes to 🟢 Online

---

## 📋 Test 6: Network Access (Multi-Device)

### Test from Another Device (Phone/Tablet)

**Prerequisites:**

- Other device on **same WiFi network**
- Windows Firewall allows Node.js (see `NETWORK_ACCESS_GUIDE.md`)

**Get Your WiFi IP:**

```powershell
ipconfig | Select-String -Pattern "IPv4"
# Use the IP like: 192.168.100.150 (not 169.254.x.x)
```

**On Your Phone/Tablet:**

1. **Open Browser** (Chrome/Safari)
2. **Navigate**: `http://192.168.100.150:3000/display/TV001`
   - Replace `192.168.100.150` with your actual IP

**Expected Result:**

- ✅ TV display page loads
- ✅ Shows media from backend
- ✅ WebSocket connects (check browser console if possible)
- ✅ Real-time updates work

**Test Admin Panel Access:**

1. **Navigate**: `http://192.168.100.150:3000/auth/login`
2. **Login** with admin credentials
3. **Upload media** from your phone
4. **Verify** it appears on the TV display

### Troubleshooting Network Access

If it doesn't work:

1. **Check Firewall**: See `NETWORK_ACCESS_GUIDE.md` → Windows Firewall Setup
2. **Verify IP**: Make sure the IP in `.env.local` matches your current WiFi IP
3. **Check CORS**: Backend console should NOT show CORS errors
4. **Test Backend Directly**:
   ```
   http://192.168.100.150:3002/api/tv/all
   ```
   Should return JSON with TV list

---

## 📋 Test 7: Edge Cases & Error Handling

### Test Offline Behavior

1. **Disconnect WiFi** on the device running TV display
2. **Expected**:
   - Connection status shows offline
   - Error message appears
   - Media stops playing or continues from cache

### Test Concurrent Uploads

1. Open **3 browser tabs** with `/admin/uploadMedia/direct`
2. Upload **3 different media files simultaneously**
3. **Expected**: All uploads complete without errors

### Test Large File Upload

1. Try uploading a **10MB+ video**
2. **Expected**:
   - Progress bar shows upload status
   - Cloudinary processes the video
   - Success message after completion

### Test Session Expiration

1. **Login** to admin panel
2. **Wait 7 days** (or modify JWT expiration in backend to 1 minute for testing)
3. **Try accessing protected route**
4. **Expected**: Redirects to login

---

## 📋 Test 8: Media Playback

### Test Image Display

1. Upload an **image** to `TV001`
2. View on `/display/TV001`
3. **Expected**:
   - Image fills screen (maintains aspect ratio)
   - Displays for specified duration
   - Smooth fade transition to next media

### Test Video Playback

1. Upload a **video** to `TV001`
2. View on `/display/TV001`
3. **Expected**:
   - Video autoplays
   - No controls visible (full-screen kiosk mode)
   - Muted by default
   - Loops or advances to next media when finished

### Test Media Rotation

1. Upload **5 different media files** to `TV001`
2. View on `/display/TV001`
3. **Expected**:
   - Media rotates in order
   - Respects duration settings
   - Smooth transitions
   - Infinite loop

---

## 📋 Test 9: Admin Features

### Test TV List View

1. **Navigate**: `/admin/fetchAllTV`
2. **Expected**:
   - Shows all registered TVs
   - Displays online/offline status
   - Shows TV details (name, location, resolution)
   - Shows last seen timestamp

### Test Recent Media View

1. **Navigate**: `/admin/recentUpload`
2. **Expected**:
   - Shows recently uploaded media
   - Displays thumbnails
   - Shows title, category, date
   - Click to view details

### Test Dashboard

1. **Navigate**: `/admin/home`
2. **Expected**:
   - Shows stats: Total TVs, Online TVs, Total Media
   - Lists recent devices
   - Lists recent media
   - Quick action buttons work

---

## 📋 Test 10: Full-Screen Kiosk Mode

### Test F11 Full-Screen

1. Open **TV display**: `/display/TV001`
2. Press **F11** (or Fn+F11)
3. **Expected**:
   - Browser UI disappears
   - Media fills entire screen
   - No address bar, no browser controls

### Test Auto-Play

1. Ensure browser allows autoplay:
   - Chrome: `chrome://flags/#autoplay-policy` → set to "No user gesture required"
2. Reload display page
3. **Expected**: Video autoplays without user interaction

---

## ✅ Final Checklist

Before deploying to production:

- [ ] ✅ Admin login works from multiple devices
- [ ] ✅ TV registration works
- [ ] ✅ Media upload works (images + videos)
- [ ] ✅ TV display page shows media correctly
- [ ] ✅ Real-time updates via WebSocket work
- [ ] ✅ Network access works from other devices
- [ ] ✅ Full-screen kiosk mode works
- [ ] ✅ Error handling shows user-friendly messages
- [ ] ✅ MongoDB connection is stable
- [ ] ✅ Cloudinary uploads succeed
- [ ] ✅ Session persistence works (refresh doesn't log out)
- [ ] ✅ Multiple TVs can be registered and managed
- [ ] ✅ Media plays smoothly without stuttering

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot read property 'token' of undefined"

**Solution**: Clear `localStorage` and login again

```javascript
localStorage.clear();
```

### Issue: Media doesn't show on TV display

**Solution**:

1. Check if TV is registered: `/admin/fetchAllTV`
2. Check if media is uploaded: `/admin/recentUpload`
3. Check browser console for errors
4. Verify TV ID matches exactly

### Issue: WebSocket not connecting

**Solution**:

1. Check backend is running: `http://localhost:3002/api/tv/all`
2. Check `.env.local` has correct `NEXT_PUBLIC_WS_URL`
3. Check browser console for connection errors

### Issue: CORS errors

**Solution**:

1. Add your IP to `server.js` CORS whitelist
2. Restart backend server
3. Clear browser cache (Ctrl+Shift+R)

---

## 📊 Performance Testing

### Test with Multiple TVs

1. Open **5 browser tabs** with different TV IDs
2. Upload media to all TVs
3. Monitor:
   - CPU usage
   - Network bandwidth
   - Response times

**Expected**: System handles 5-10 simultaneous displays smoothly

### Test Media File Sizes

- Small images (< 500KB): ✅ Should load instantly
- Large images (2-5MB): ✅ Should load in 1-2 seconds
- Short videos (< 10MB): ✅ Should buffer and play smoothly
- Long videos (50MB+): ⚠️ May take time to upload, consider compression

---

**Testing Complete?** You're ready to deploy to actual TV displays! 🎉

See `TV_SETUP_GUIDE.md` for instructions on setting up physical TVs.
