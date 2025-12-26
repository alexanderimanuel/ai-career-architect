# Quick Start - Deploy to Vercel

## 🚀 Fastest Way to Deploy

### 1. Push to GitHub
```bash
cd "c:/PORTO FIROSTACK/WEBSITE CV CAREER"
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
- `GEMINI_API_KEY`: `AIzaSyDOPiILRiy3AwXBAJlfiPIKdp8VfKT2VkA`
- `VITE_API_URL`: (leave empty for now, will auto-configure)

### 4. Deploy!
Click **Deploy** and wait ~2 minutes.

---

## ✅ What's Been Prepared

- ✅ `vercel.json` - Deployment configuration
- ✅ Environment variable support in code
- ✅ API URLs configured for production
- ✅ Backend serverless function ready
- ✅ Frontend build optimized

---

## 📝 Important Notes

1. **Backend Deployment**: The backend will deploy as Vercel Serverless Functions
2. **API Endpoint**: Will be at `https://your-project.vercel.app/api/analyze`
3. **Environment Variables**: Set `GEMINI_API_KEY` in Vercel dashboard
4. **Free Tier**: Sufficient for testing and moderate use

---

## 🔗 After Deployment

Your app will be live at: `https://your-project-name.vercel.app`

Test the deployment:
1. Visit the homepage
2. Upload a CV
3. Check if analysis works

---

## 📚 Full Guide

For detailed instructions, see: `vercel_deployment_guide.md`
