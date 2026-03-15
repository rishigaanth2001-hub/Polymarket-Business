# Deployment Guide for Polymarket Dashboard

## 🚀 Frontend Deployment (GitHub Pages)

### Prerequisites:
- Node.js installed
- Git configured
- GitHub repository set up

### Step 1: Install gh-pages package
```bash
cd client
npm install gh-pages --save-dev
```

### Step 2: Configure GitHub Pages settings
1. Go to your GitHub repository: https://github.com/rishigaanth2001-hub/Polymarket-Business
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
   - (Or use "Deploy from a branch" if you prefer manual deployment)

### Step 3: Deploy Frontend to GitHub Pages
```bash
cd client
npm run build
npm run deploy
```

**First Deploy:** You may be prompted to authenticate with GitHub. Use your GitHub token or credentials.

**After Deploy:** Your frontend will be live at:
```
https://rishigaanth2001-hub.github.io/Polymarket-Business/
```

---

## 🔧 Backend Deployment Options

Since GitHub Pages only hosts static files, you need to deploy the backend separately:

### Option A: Deploy Backend to Vercel (Recommended)
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add backend URL to frontend `.env`:
```
VITE_API_URL=https://your-vercel-api.vercel.app
```

### Option B: Deploy to Railway
1. Go to https://railway.app
2. Connect GitHub repository
3. Create new service from repository
4. Deploy

### Option C: Deploy to Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Deploy

### Option D: Docker + Cloud Deploy
1. Build Docker image
2. Deploy to AWS, Google Cloud, or DigitalOcean

---

## 📝 Environment Variables Setup

### Client (.env):
```
VITE_API_URL=https://your-backend-api.com
```

### Server (.env):
```
PORT=3001
CORS_ORIGIN=https://rishigaanth2001-hub.github.io
```

---

## 🔄 Continuous Deployment (Recommended)

### Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd client && npm ci
      
      - name: Build
        run: cd client && npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client/dist
          cname: your-custom-domain.com (optional)
```

---

## 🔐 CORS Configuration for Backend

Update your backend CORS settings (`server/routes/*`):

```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://rishigaanth2001-hub.github.io'
  ],
  credentials: true
}));
```

---

## 📊 Testing Deployment

### Test locally:
```bash
cd client
npm run build
npm run preview
```

Then visit: `http://localhost:4173`

### After deployment:
Visit: `https://rishigaanth2001-hub.github.io/Polymarket-Business/`

---

## 🐛 Troubleshooting

### Blank page on GitHub Pages?
- Check browser console for errors
- Verify base path in `vite.config.js`
- Clear browser cache

### API calls failing?
- Verify backend is deployed and accessible
- Check CORS configuration
- Update `VITE_API_URL` in `.env`

### Assets not loading?
- Check `homepage` value in `package.json`
- Verify build output in `dist/` folder

---

## 📚 Useful Links

- GitHub Pages Docs: https://pages.github.com/
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app/
- Render Docs: https://render.com/docs
