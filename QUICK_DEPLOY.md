# 🚀 Quick Deployment Guide

## Step 1️⃣: Deploy Frontend to GitHub Pages (5 minutes)

```bash
# Navigate to client directory
cd client

# Install gh-pages
npm install gh-pages --save-dev

# Build and deploy
npm run build
npm run deploy
```

✅ Your frontend is now live at:
```
https://rishigaanth2001-hub.github.io/Polymarket-Business/
```

---

## Step 2️⃣: Deploy Backend (Choose one)

### 🎯 Option A: Railway (Easiest)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select `Polymarket-Business` repository
4. Railway auto-detects Node.js and deploys automatically
5. Copy the public URL from Railway dashboard

### 🎯 Option B: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to server directory
cd server

# Deploy
vercel
```

### 🎯 Option C: Render

1. Go to https://render.com
2. Click "New +" → "Web Service"  
3. Select GitHub repository
4. Set start command: `node server.js`
5. Deploy

---

## Step 3️⃣: Configure API URL

After backend is deployed, you'll get a URL like:
- Railway: `https://your-app-xxxx.railway.app`
- Vercel: `https://your-app.vercel.app`
- Render: `https://your-app.onrender.com`

Update frontend `.env` file:

```bash
# client/.env
VITE_API_URL=https://your-backend-url.app
```

Then redeploy frontend:

```bash
cd client
npm run deploy
```

---

## Step 4️⃣: Verify Everything Works

1. Visit: https://rishigaanth2001-hub.github.io/Polymarket-Business/
2. Check browser console (F12) for API errors
3. Markets should load with live data

---

## 📋 Checklist

- [ ] Frontend deployed to GitHub Pages
- [ ] Backend deployed (Railway/Vercel/Render)
- [ ] Backend URL configured in frontend
- [ ] CORS enabled on backend
- [ ] Markets loading correctly
- [ ] Virtual betting works

---

## 🔄 Auto-Deploy Setup (Optional but Recommended)

GitHub Actions will auto-deploy on each commit to `main`:

1. Push changes to GitHub:
```bash
git add .
git commit -m "Update dashboard"
git push origin main
```

2. GitHub Actions automatically:
   - Builds the frontend
   - Deploys to GitHub Pages
   - Your changes live in ~2 minutes

---

## 🆘 Need Help?

Check `DEPLOYMENT.md` for detailed troubleshooting and configuration options.
