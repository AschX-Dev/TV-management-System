# TV Management System (TVMS) - API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

Most endpoints require JWT token in cookies. Obtain token via `/api/admin/login`.

---

## 🔐 Admin & Authentication

### Register Admin

```http
POST /api/admin/register
Authorization: Bearer {token} (SuperAdmin only)
Content-Type: application/json

{
  "name": "John Doe",
  "ID": "ADMIN001",
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

### Login

```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securePassword123"
}

Response: Sets JWT cookie + returns user object
```

### Logout

```http
POST /api/admin/logout
Authorization: Bearer {token}
```

### Check Authentication

```http
POST /api/admin/check-auth
Authorization: Bearer {token}

Response: Current user details
```

### Forgot Password

```http
POST /api/admin/forgot-password
Content-Type: application/json

{
  "email": "admin@example.com"
}
```

### Reset Password

```http
POST /api/admin/reset-password/:token
Content-Type: application/json

{
  "password": "newPassword123"
}
```

### Get All Admins

```http
GET /api/admin/get-all-admin
Authorization: Bearer {token} (SuperAdmin only)
```

### Delete Admin

```http
POST /api/admin/delete
Authorization: Bearer {token} (SuperAdmin only)
Content-Type: application/json

{
  "userId": "ADMIN001"
}
```

### Block/Unblock Admin

```http
POST /api/admin/block-admin
Authorization: Bearer {token} (SuperAdmin only)
Content-Type: application/json

{
  "userId": "ADMIN001"
}
```

---

## 📺 TV/Device Management

### Register TV

```http
POST /api/tv/register-tv
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)
Content-Type: application/json

{
  "tvId": "TV001",
  "name": "Main Lobby Display",
  "tvModel": "Samsung 55\"",
  "tvSize": "55",
  "location": "Building A - Lobby",
  "channelID": "announcement",
  "resolution": "1920x1080"
}
```

### Get All TVs

```http
GET /api/tv/all
Authorization: Bearer {token}

Response: Array of TV objects with status, lastSeen, etc.
```

### Update TV

```http
POST /api/tv/update/:tvId
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)
Content-Type: application/json

{
  "name": "Updated Name",
  "location": "New Location",
  "resolution": "3840x2160"
}
```

### Delete TV

```http
POST /api/tv/delete/:tvId
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)
```

### Validate Device

```http
GET /api/tv/validate-device/:deviceId

Response: { "valid": true/false }
```

### Heartbeat (Device Status Update)

```http
POST /api/tv/heartbeat
Content-Type: application/json

{
  "tvId": "TV001",
  "resolution": "1920x1080"
}

Updates status to 'online' and lastSeen timestamp
```

### Get Current Media for TV

```http
GET /api/tv/display/:tvId

Response: { "mediaUrl": "https://..." }
```

### Push Content Now

```http
POST /api/tv/push-now
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin, ContentManager)
Content-Type: application/json

{
  "tvId": "TV001",
  "mediaUrl": "https://cloudinary.com/..."
}

Sends real-time update via WebSocket
```

### Remote Command

```http
POST /api/tv/command
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)
Content-Type: application/json

{
  "tvId": "TV001",
  "command": "pause" | "resume" | "reboot"
}

Sends command via WebSocket to device
```

---

## 📁 Media Library

### Upload Media (Direct)

```http
POST /api/media/upload
Content-Type: multipart/form-data

tvId: TV001
media: [file]

Response: { "mediaUrl": "...", "meta": { format, width, height, bytes, duration } }
```

### Store Media (to library without displaying)

```http
POST /api/media/store
Content-Type: application/json

{
  "title": "Promotional Video",
  "mediaUrl": "https://cloudinary.com/...",
  "description": "Q4 2024 Campaign",
  "mediaCategory": "video",
  "public_id": "cloudinary_public_id",
  "durationSeconds": 30,
  "format": "mp4",
  "width": 1920,
  "height": 1080,
  "sizeBytes": 5242880
}
```

### Save Media (store + display)

```http
POST /api/media/save
Content-Type: application/json

{
  "title": "Welcome Message",
  "tvId": "TV001",
  "mediaUrl": "https://...",
  "description": "...",
  "mediaType": "image",
  "public_id": "...",
  "durationSeconds": 10,
  "format": "jpg",
  "width": 1920,
  "height": 1080,
  "sizeBytes": 524288
}
```

### Display to TV

```http
POST /api/media/display-to-tv
Content-Type: application/json

{
  "_id": "media_id",
  "title": "...",
  "tvId": "TV001",
  "mediaUrl": "...",
  "description": "...",
  "mediaCategory": "video",
  "public_id": "..."
}
```

### Get Recent Media

```http
GET /api/media/recent-media?limit=10

Response: Array of recent media items
```

### Get Media by ID

```http
GET /api/media/find-media/:mediaID

Response: Media object
```

### Delete Media

```http
POST /api/media/deleteMedia
Content-Type: application/json

{
  "id": "media_id",
  "public_id": "cloudinary_public_id",
  "mediaType": "video"
}
```

---

## 👥 Screen Groups

### Create Group

```http
POST /api/groups
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)
Content-Type: application/json

{
  "name": "Floor 1 - Main Hall",
  "description": "All screens in main hall",
  "location": "Building A",
  "screenIds": ["TV001", "TV002", "TV003"]
}
```

### List Groups

```http
GET /api/groups
Authorization: Bearer {token}

Response: Array of groups
```

### Update Group

```http
PUT /api/groups/:id
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)
Content-Type: application/json

{
  "name": "Updated Name",
  "screenIds": ["TV001", "TV004"]
}
```

### Delete Group

```http
DELETE /api/groups/:id
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)
```

---

## 📅 Campaigns

### Create Campaign

```http
POST /api/campaigns
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin, ContentManager)
Content-Type: application/json

{
  "name": "Black Friday 2024",
  "description": "Black Friday promotional campaign",
  "mediaItems": [
    {
      "mediaId": "media_id_1",
      "durationSeconds": 15,
      "order": 1
    },
    {
      "mediaId": "media_id_2",
      "durationSeconds": 20,
      "order": 2
    }
  ],
  "targetScreens": ["TV001", "TV002"],
  "targetGroups": ["group_id_1"],
  "priority": 5,
  "schedule": {
    "startDateTime": "2024-11-25T00:00:00Z",
    "endDateTime": "2024-11-30T23:59:59Z",
    "recurrence": "daily"
  },
  "status": "Draft"
}
```

### List Campaigns

```http
GET /api/campaigns
Authorization: Bearer {token}

Response: Array of campaigns
```

### Get Campaign by ID

```http
GET /api/campaigns/:id
Authorization: Bearer {token}
```

### Update Campaign

```http
PUT /api/campaigns/:id
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin, ContentManager)
Content-Type: application/json

{
  "status": "Active",
  "priority": 10
}
```

### Delete Campaign

```http
DELETE /api/campaigns/:id
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)
```

### Pause Campaign

```http
POST /api/campaigns/:id/pause
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)

Sets status to 'Paused'
```

### Resume Campaign

```http
POST /api/campaigns/:id/resume
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)

Sets status to 'Active'
```

---

## 🎨 Layouts

### Create Layout

```http
POST /api/layouts
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin, ContentManager)
Content-Type: application/json

{
  "name": "3-Zone Split Screen",
  "description": "Main content + ticker + clock",
  "resolution": "1920x1080",
  "zones": [
    {
      "name": "Main Content",
      "position": { "x": 0, "y": 0 },
      "size": { "width": 1920, "height": 900 },
      "widget": "media",
      "props": {}
    },
    {
      "name": "Bottom Ticker",
      "position": { "x": 0, "y": 900 },
      "size": { "width": 1720, "height": 180 },
      "widget": "ticker",
      "props": { "speed": 50, "text": "Breaking news..." }
    },
    {
      "name": "Clock",
      "position": { "x": 1720, "y": 900 },
      "size": { "width": 200, "height": 180 },
      "widget": "clock",
      "props": { "format": "24h" }
    }
  ]
}
```

### List Layouts

```http
GET /api/layouts
Authorization: Bearer {token}
```

### Update Layout

```http
PUT /api/layouts/:id
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin, ContentManager)
```

### Delete Layout

```http
DELETE /api/layouts/:id
Authorization: Bearer {token} (SuperAdmin, RegionalAdmin)
```

---

## 📋 Schedules (Legacy - use Campaigns instead)

### Set Schedule

```http
POST /api/schedule/setSchedule
Content-Type: application/json

{
  "mediaId": "media_id",
  "tvId": "TV001",
  "title": "Morning Announcement",
  "public_id": "cloudinary_id",
  "mediaCategory": "video",
  "description": "...",
  "mediaUrl": "https://...",
  "startDateTime": "2024-10-20T08:00:00Z",
  "endDateTime": "2024-10-20T09:00:00Z"
}
```

### Get All Schedules

```http
GET /api/schedule/getAllSchedules

Response: Array of schedules
```

### Cancel Schedule

```http
POST /api/schedule/cancel
Content-Type: application/json

{
  "_id": "schedule_id"
}
```

### Delete Schedule

```http
POST /api/schedule/delete
Content-Type: application/json

{
  "_id": "schedule_id"
}
```

---

## 📊 Logs & Analytics

### Get Playback Logs

```http
GET /api/logs/playback?tvId=TV001
Authorization: Bearer {token}

Response: Array of playback events (last 200)
```

### Create Playback Log

```http
POST /api/logs/playback
Content-Type: application/json

{
  "tvId": "TV001",
  "mediaId": "media_id",
  "campaignId": "campaign_id",
  "startedAt": "2024-10-18T10:00:00Z",
  "endedAt": "2024-10-18T10:00:30Z",
  "status": "completed"
}
```

### Get Audit Logs

```http
GET /api/logs/audit
Authorization: Bearer {token} (SuperAdmin only)

Response: Array of audit events (last 200)
```

### Create Audit Log

```http
POST /api/logs/audit
Authorization: Bearer {token}
Content-Type: application/json

{
  "actorId": "ADMIN001",
  "actorRole": "SuperAdmin",
  "action": "DELETE_TV",
  "resourceType": "TV",
  "resourceId": "TV001",
  "metadata": { "reason": "Decommissioned" }
}
```

---

## 🔌 WebSocket Events

Connect to: `ws://localhost:3001`

### Client → Server

**Join Room (for TV to receive updates)**

```javascript
socket.emit("joinRoom", "TV001");
```

### Server → Client

**Media Update**

```javascript
socket.on("mediaUpdate", (data) => {
  console.log(data.mediaUrl); // New media URL to display
});
```

**Device Command**

```javascript
socket.on("deviceCommand", (data) => {
  console.log(data.command); // 'pause', 'resume', or 'reboot'
});
```

---

## 🔑 User Roles & Permissions

| Role               | Permissions                                          |
| ------------------ | ---------------------------------------------------- |
| **SuperAdmin**     | Full access: manage admins, all CRUD operations      |
| **RegionalAdmin**  | Manage devices, groups, campaigns in assigned region |
| **ContentManager** | Upload/manage media, create campaigns, layouts       |
| **Viewer**         | Read-only access to dashboards and reports           |

---

## 🚀 Quick Start Examples

### 1. Register and Login

```bash
# Register new admin (requires SuperAdmin token)
curl -X POST http://localhost:3001/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","ID":"ADMIN001","email":"admin@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"admin@test.com","password":"pass123"}'
```

### 2. Register a TV

```bash
curl -X POST http://localhost:3001/api/tv/register-tv \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"tvId":"TV001","name":"Lobby TV","tvModel":"Samsung","tvSize":"55","location":"Lobby","resolution":"1920x1080"}'
```

### 3. Upload and Display Media

```bash
# Upload media to store
curl -X POST http://localhost:3001/api/media/store \
  -H "Content-Type: application/json" \
  -d '{"title":"Welcome","mediaUrl":"https://example.com/video.mp4","description":"Welcome video","mediaCategory":"video","public_id":"abc123"}'

# Display to TV
curl -X POST http://localhost:3001/api/media/display-to-tv \
  -H "Content-Type: application/json" \
  -d '{"_id":"media_id","title":"Welcome","tvId":"TV001","mediaUrl":"https://...","description":"...","mediaCategory":"video","public_id":"abc123"}'
```

### 4. Create Campaign

```bash
curl -X POST http://localhost:3001/api/campaigns \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name":"Morning Campaign","mediaItems":[{"mediaId":"media_id","durationSeconds":30,"order":1}],"targetScreens":["TV001"],"priority":5,"schedule":{"startDateTime":"2024-10-20T08:00:00Z","endDateTime":"2024-10-20T18:00:00Z","recurrence":"daily"}}'
```

---

## 📝 Environment Variables

Create `.env` file in `backend/` directory:

```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/tvms

# Auth
JWT_SECRET=your-secret-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (optional)
EMAIL_ENABLED=false
SENDGRID_API_KEY=SG.key
SENDER_EMAIL=admin@example.com
```

---

## 🛠️ Error Codes

| Code | Meaning                                        |
| ---- | ---------------------------------------------- |
| 200  | Success                                        |
| 201  | Created                                        |
| 400  | Bad Request (missing fields, validation error) |
| 401  | Unauthorized (no token or invalid token)       |
| 403  | Forbidden (insufficient permissions)           |
| 404  | Not Found                                      |
| 500  | Internal Server Error                          |

---

## 📞 Support

For issues or questions, contact: admin@tvms.example.com






