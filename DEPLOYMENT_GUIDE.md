# Medicine Chart - Deployment Guide

## 🏗️ Architecture

**Frontend**: Netlify (Static hosting)  
**Backend**: Render.com (Node.js API)

```
┌─────────────────────────────┐
│  Netlify                    │
│  https://ubat.netlify.app   │
│  - index.html (frontend)    │
└──────────┬──────────────────┘
           │ Fetch API calls
           ▼
┌─────────────────────────────┐
│  Render.com                 │
│  https://ubat-api.onrender  │
│  - Express.js server        │
│  - medicines.json (disk)    │
└─────────────────────────────┘
```

---

## 📁 Project Structure

```
ubat/
├── Backend (Render.com):
│   ├── server.js              # Express API
│   ├── package.json           # Dependencies
│   ├── render.yaml            # Render config
│   └── data/
│       └── medicines.json     # Medicine database
│
└── Frontend (Netlify):
    ├── index.html             # Main app (rename ubat.html)
    └── netlify.toml           # Netlify config (optional)
```

---

## 🚀 Step 1: Deploy Backend to Render.com

### 1.1 Push to GitHub

```bash
cd /Users/muhammadsallahuddinhamzah/Desktop/ubat

# Initialize git (if not already done)
git init

# Create .gitignore
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore

# Commit backend files
git add server.js package.json render.yaml data/medicines.json .gitignore
git commit -m "Add backend API for Render.com"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/ubat-backend.git
git branch -M main
git push -u origin main
```

### 1.2 Deploy on Render.com

1. Go to https://render.com
2. Sign in with GitHub
3. Click **"New +" → "Web Service"**
4. Connect your repository
5. Configure:
   - **Name**: `ubat-api` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Click **"Create Web Service"**
7. Wait ~2-3 minutes for deployment
8. Note your API URL: `https://ubat-api.onrender.com`

### 1.3 Test API

```bash
# Test if API is running
curl https://YOUR-API-URL.onrender.com/

# Get medicines
curl https://YOUR-API-URL.onrender.com/api/medicines
```

---

## 🌐 Step 2: Deploy Frontend to Netlify

### 2.1 Prepare Frontend

```bash
cd /Users/muhammadsallahuddinhamzah/Desktop/ubat

# Rename ubat.html to index.html
cp ubat.html index.html

# Note: You'll need to update index.html to use your Render API URL
# (I'll do this in the next step)
```

### 2.2 Update Frontend to Use API

Open `index.html` and find the `loadMedicinesFromFile()` function.
Change it to use your Render.com API URL.

**I'll do this for you automatically in the next step!**

### 2.3 Deploy to Netlify

**Option A: Drag & Drop**
1. Go to https://app.netlify.com/drop
2. Drag `index.html` file
3. Done!

**Option B: Git (Recommended)**
1. Create new GitHub repo for frontend
2. Push `index.html`
3. Connect to Netlify
4. Auto-deploy enabled

---

## 🔧 Step 3: Configure CORS

In Render.com dashboard:

1. Go to your web service
2. Click "Environment"
3. Add environment variable:
   - **Key**: `ALLOWED_ORIGIN`
   - **Value**: `https://YOUR-NETLIFY-SITE.netlify.app`
4. Update server.js to use it (already configured)

---

## 📝 Environment Variables (Optional)

### Render.com

```
NODE_ENV=production
PORT=3000
```

### Netlify

Create `.env` file:
```
VITE_API_URL=https://ubat-api.onrender.com
```

---

## ✅ Verification Checklist

- [ ] Backend deployed to Render.com
- [ ] API responds at `/api/medicines`
- [ ] Frontend deployed to Netlify
- [ ] Frontend can fetch medicines from API
- [ ] Admin Panel can add/edit/delete medicines
- [ ] Changes persist (no need to export!)

---

## 🔄 Update Workflow

### Adding/Editing Medicines

**Users**:
1. Open Netlify site
2. Click "Admin Panel"
3. Add/Edit/Delete medicines
4. Changes auto-save to Render.com ✅
5. No manual export needed!

### Updating Code

**Backend**:
```bash
git add server.js
git commit -m "Update API"
git push
# Render auto-deploys!
```

**Frontend**:
```bash
git add index.html
git commit -m "Update UI"
git push
# Netlify auto-deploys!
```

---

## 💰 Costs

**Free Tier**:
- ✅ Render.com: 750 hours/month (enough for 24/7 with cold starts)
- ✅ Netlify: Unlimited static hosting

**Paid (Optional)**:
- Render.com: $7/month (no cold starts, always on)
- Netlify: Free is fine for this use case

---

## 🐛 Troubleshooting

### API not responding
- Check Render.com logs
- Service might be sleeping (free tier) - first request wakes it up

### CORS errors
- Add your Netlify URL to CORS allowlist in server.js
- Already configured to allow all origins for now

### Medicines not saving
- Check browser console for errors
- Verify API URL in frontend code
- Check Render.com logs

---

## 📞 Support

API Health Check: `https://YOUR-API.onrender.com/`  
API Docs: See server.js for all endpoints

---

**Next Steps**: 
1. I'll update your frontend code to use the API
2. You deploy both to Render + Netlify
3. Medicine management will work automatically!

Ready for me to update the frontend code? 🚀
