# Medicine Chart Generator - Full Stack Deployment

## 🏗️ Architecture

**Frontend**: Netlify (Static Site)  
**Backend**: Render.com (Node.js API)  
**Database**: JSON file on Render.com persistent disk

---

## 📦 What's Included

### Backend (Render.com)
- `server.js` - Express API with CRUD endpoints
- `package.json` - Node.js dependencies
- `render.yaml` - Render.com configuration
- `data/medicines.json` - Medicine database

### Frontend (Netlify)
- `ubat.html` or `index.html` - Main application
- Auto-syncs with backend API

---

## 🚀 Quick Start Deployment

### 1. Deploy Backend to Render.com

```bash
# Initialize git if not done
git init

# Add all backend files
git add server.js package.json render.yaml data/medicines.json .gitignore
git commit -m "Backend API for Render.com"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/ubat-backend.git
git push -u origin main
```

Then on **Render.com**:
1. Sign in at https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Settings:
   - **Name**: `ubat-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click "Create Web Service"
6. **Copy your API URL**: `https://ubat-api-xxxxx.onrender.com`

### 2. Update Frontend with API URL

Open `ubat.html` and find this line (around line 430):

```javascript
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'  // Local development
    : 'https://YOUR-API-NAME.onrender.com';  // ← UPDATE THIS!
```

Replace `YOUR-API-NAME.onrender.com` with your actual Render.com URL.

### 3. Deploy Frontend to Netlify

```bash
# Rename for Netlify (index.html is default)
cp ubat.html index.html

# Option A: Drag & Drop
# Go to https://app.netlify.com/drop and drag index.html

# Option B: Git Deploy (recommended)
git add index.html
git commit -m "Frontend with API integration"
git push

# Then connect GitHub repo to Netlify
```

---

## ✅ Verification

After deployment:

1. **Test Backend**:
   ```bash
   curl https://your-api.onrender.com/
   curl https://your-api.onrender.com/api/medicines
   ```

2. **Test Frontend**:
   - Open your Netlify URL
   - Check browser console for "Loaded X medicines from API"
   - Try adding/editing a medicine
   - Should see "synced to server" message

---

## 🔄 How It Works

```
User → Netlify Frontend → API calls → Render Backend → medicines.json
  ↑                                                           ↓
  └─────────── Response with data ──────────────────────────┘
```

**Add/Edit Medicine**:
1. User submits form in Admin Panel
2. Saves to IndexedDB (browser cache)
3. Sends to Render.com API
4. API updates `data/medicines.json`
5. Changes persist forever! ✅

**Load Medicines**:
1. Page loads
2. Fetches from Render.com API
3. Populates IndexedDB
4. Shows in dropdown

---

## 💰 Costs

**Free Tier (Both)**:
- ✅ Render.com: 750 hours/month
- ✅ Netlify: Unlimited

**Limitations**:
- ⚠️ Render free tier: Sleeps after 15 min inactivity (30s cold start)
- ✅ Netlify: No limitations for static site

**Upgrade (Optional)**:
- Render: $7/month (always on, no cold starts)

---

## 🛠️ Local Development

### Backend
```bash
cd /path/to/ubat
npm install
npm start
# Runs on http://localhost:3000
```

### Frontend
```bash
# Just open in browser
open ubat.html
# OR use live server
python3 -m http.server 8000
```

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/medicines` | Get all medicines |
| POST | `/api/medicines` | Replace all medicines |
| POST | `/api/medicines/add` | Add/update medicine |
| PUT | `/api/medicines/:code` | Update medicine |
| DELETE | `/api/medicines/:code` | Delete medicine |

---

## 🐛 Troubleshooting

### "Failed to load medicines from API"
- Check API URL in frontend code
- Verify Render.com service is running
- Check browser console for CORS errors

### "API returned 500 error"
- Check Render.com logs
- Verify `data/medicines.json` exists
- Check file permissions

### Cold Start Delays
- First request after 15 min takes ~30 seconds
- Upgrade to paid plan for always-on

### CORS Errors
- Server already configured for CORS
- If issues persist, check API_URL matches deployed URL

---

## 📚 Documentation

See detailed guides:
- `DEPLOYMENT_GUIDE.md` - Full deployment instructions
- `MEDICINE_MANAGEMENT_GUIDE.md` - How to use Admin Panel
- `QUICK_REFERENCE.md` - Quick tips

---

## 🎉 Benefits of This Setup

✅ **Auto-Sync**: Changes save to server automatically  
✅ **No Manual Export**: No need to download/upload JSON files  
✅ **Multi-User**: Multiple people can edit (with latest changes)  
✅ **Backup**: Export still available for local backup  
✅ **Free Hosting**: Both services offer generous free tiers  
✅ **Easy Updates**: Git push to update backend or frontend  

---

**Last Updated**: 14 November 2025
