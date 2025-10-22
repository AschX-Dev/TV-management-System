# ⚡ Vercel Full-Stack Deployment Guide

Deploy both frontend and backend on Vercel for your TVMS.

---

## 🎯 Can You Deploy Both on Vercel?

**Short Answer:** Yes, but with limitations.

**Long Answer:**

- ✅ **Frontend:** Perfect for Vercel (Next.js)
- ⚠️ **Backend:** Possible but with restrictions
- ❌ **WebSocket:** Limited support on Vercel (serverless functions)

---

## 📊 Vercel vs Other Platforms

| Feature             | Vercel Frontend    | Vercel Backend | Railway Backend | Render Backend |
| ------------------- | ------------------ | -------------- | --------------- | -------------- |
| **Next.js Support** | ⭐⭐⭐⭐⭐ Perfect | ⭐⭐⭐ Good    | ⭐⭐⭐ Good     | ⭐⭐⭐ Good    |
| **WebSocket**       | ❌ No              | ⚠️ Limited     | ✅ Full         | ✅ Full        |
| **Real-time**       | ❌ No              | ⚠️ Limited     | ✅ Full         | ✅ Full        |
| **API Routes**      | ✅ Yes             | ✅ Yes         | ✅ Yes          | ✅ Yes         |
| **Database**        | ✅ Yes             | ✅ Yes         | ✅ Yes          | ✅ Yes         |
| **File Upload**     | ✅ Yes             | ✅ Yes         | ✅ Yes          | ✅ Yes         |
| **Cost**            | Free               | Free           | $5 credit       | Free           |
| **Ease**            | ⭐⭐⭐⭐⭐         | ⭐⭐⭐⭐       | ⭐⭐⭐⭐        | ⭐⭐⭐⭐       |

**Recommendation:** Frontend on Vercel + Backend on Railway/Render for best results.

---

## 🚀 Option 1: Vercel Frontend + Backend (Limited)

### What Works:

- ✅ API routes
- ✅ Database connections
- ✅ File uploads
- ✅ Authentication
- ✅ Static content

### What Doesn't Work:

- ❌ WebSocket connections
- ❌ Real-time updates
- ❌ Long-running processes
- ❌ Persistent connections

### When to Use:

- Simple CRUD operations
- No real-time features needed
- Prototype/demo purposes
- Learning Next.js API routes

---

## 🎯 Option 2: Vercel Frontend + Railway Backend (Recommended)

### Why This is Better:

- ✅ **Vercel:** Best Next.js hosting
- ✅ **Railway:** Full WebSocket support
- ✅ **Real-time:** Complete functionality
- ✅ **Cost:** Both free tiers
- ✅ **Performance:** Optimized for each platform

### Architecture:

```
Frontend (Vercel) ←→ Backend (Railway) ←→ Database (MongoDB)
     ↓                    ↓
Static CDN          WebSocket Server
```

---

## 🛠️ How to Deploy Both on Vercel

If you still want to try Vercel for both, here's how:

### Step 1: Convert Backend to Vercel API Routes

1. **Move backend logic** to `frontend/app/api/` directory
2. **Convert Express routes** to Next.js API routes
3. **Remove WebSocket** functionality (not supported)
4. **Update database connections** for serverless

### Step 2: Create API Routes

Example: `frontend/app/api/tv/register/route.js`

```javascript
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TV from "@/models/TV";

export async function POST(request) {
  try {
    await connectDB();

    const { tvId, name, location, resolution } = await request.json();

    const tv = new TV({
      tvId,
      name,
      location,
      resolution,
      status: "offline",
    });

    await tv.save();

    return NextResponse.json({
      success: true,
      message: "TV registered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### Step 3: Update Frontend to Use API Routes

```javascript
// Instead of: http://localhost:3002/api/tv/register-tv
// Use: /api/tv/register

const response = await fetch("/api/tv/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### Step 4: Deploy to Vercel

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

---

## 🔄 Migration from Express to Next.js API Routes

### Express Route → Next.js API Route

**Before (Express):**

```javascript
// backend/routes/TVRoutes.js
app.post("/api/tv/register-tv", async (req, res) => {
  // logic here
});
```

**After (Next.js API):**

```javascript
// frontend/app/api/tv/register/route.js
export async function POST(request) {
  // logic here
}
```

### Key Changes:

1. **Import/Export:** Use ES6 modules
2. **Request/Response:** Use Next.js `NextRequest`/`NextResponse`
3. **Middleware:** Convert to Next.js middleware
4. **File Structure:** Move to `app/api/` directory

---

## ⚠️ Limitations of Vercel Backend

### 1. No WebSocket Support

```javascript
// ❌ This won't work on Vercel
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  // Real-time updates
});
```

### 2. Serverless Functions Only

- **Cold starts:** 1-2 seconds
- **Execution time:** Max 10 seconds (free), 60 seconds (pro)
- **Memory:** 1024MB max
- **No persistent connections**

### 3. No File System Access

```javascript
// ❌ This won't work on Vercel
const fs = require("fs");
fs.writeFileSync("file.txt", "content");
```

### 4. Limited Environment Variables

- **Size limit:** 4KB total
- **No runtime changes**
- **Must be set at build time**

---

## 🎯 Recommended Architecture

### For TVMS (Best Performance):

```
┌─────────────────────────────────────────────────┐
│  Frontend (Vercel) - Next.js App               │
│  ├─ Static pages                               │
│  ├─ API routes (simple CRUD)                  │
│  └─ Client-side logic                         │
└─────────────────┬───────────────────────────────┘
                  │ HTTP API calls
┌─────────────────▼───────────────────────────────┐
│  Backend (Railway) - Express + Socket.IO       │
│  ├─ Complex business logic                     │
│  ├─ WebSocket connections                      │
│  ├─ Real-time updates                          │
│  └─ File processing                            │
└─────────────────┬───────────────────────────────┘
                  │ Database connections
┌─────────────────▼───────────────────────────────┐
│  Database (MongoDB Atlas)                      │
│  ├─ User data                                  │
│  ├─ TV devices                                 │
│  └─ Media metadata                             │
└─────────────────────────────────────────────────┘
```

### Why This Works Best:

- **Vercel:** Handles static content and simple API calls
- **Railway:** Handles complex logic and real-time features
- **MongoDB:** Centralized data storage
- **Cloudinary:** Media storage and CDN

---

## 💰 Cost Comparison

### Vercel Only:

- **Frontend:** Free (100GB bandwidth)
- **Backend:** Free (100GB bandwidth)
- **Total:** $0/month
- **Limitations:** No WebSocket, limited functionality

### Vercel + Railway (Recommended):

- **Frontend:** Free (100GB bandwidth)
- **Backend:** Free ($5 credit monthly)
- **Total:** $0/month
- **Benefits:** Full functionality, WebSocket support

### Vercel + Render:

- **Frontend:** Free (100GB bandwidth)
- **Backend:** Free (750 hours monthly)
- **Total:** $0/month
- **Benefits:** Full functionality, WebSocket support

---

## 🚀 Quick Start: Vercel + Railway

### Step 1: Deploy Backend to Railway

1. **Follow:** [RAILWAY_DEPLOYMENT_GUIDE.md](./RAILWAY_DEPLOYMENT_GUIDE.md)
2. **Get backend URL:** `https://your-backend.up.railway.app`

### Step 2: Deploy Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Set Root Directory:** `TVMSFB/frontend`
4. **Add environment variables:**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
   NEXT_PUBLIC_WS_URL=https://your-backend.up.railway.app
   ```
5. **Deploy**

### Step 3: Connect Them

1. **Update Railway environment:**
   ```env
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
2. **Test the connection**

---

## 🎯 Final Recommendation

### For TVMS, I recommend:

**Vercel (Frontend) + Railway (Backend)** ⭐

**Why:**

- ✅ Best performance for each component
- ✅ Full WebSocket support for real-time features
- ✅ Both platforms are free
- ✅ Easy to set up and maintain
- ✅ Industry best practices

**Alternative:**
**Vercel (Frontend) + Render (Backend)**

**Only use Vercel for both if:**

- You don't need real-time features
- You want to learn Next.js API routes
- You're building a simple CRUD app
- You're okay with limited functionality

---

## 📞 Need Help Deciding?

### Questions to Ask:

1. **Do you need real-time updates?** → Use Railway/Render for backend
2. **Is this a simple CRUD app?** → Vercel for both is fine
3. **Do you want to learn Next.js API routes?** → Try Vercel for both
4. **Do you want the best performance?** → Vercel + Railway

### My Recommendation:

**Start with Vercel + Railway** - you can always migrate later if needed!

---

<p align="center">
  <strong>Ready to deploy?</strong>
  <br>
  <a href="./RAILWAY_DEPLOYMENT_GUIDE.md">🚂 Deploy Backend to Railway</a> •
  <a href="./DEPLOY_NOW.md">⚡ Deploy Frontend to Vercel</a>
</p>
