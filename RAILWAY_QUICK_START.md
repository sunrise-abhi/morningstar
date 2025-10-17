# 🚂 Railway Quick Start (5 Minutes)

Your app is **100% ready** for Railway deployment! Just follow these steps.

## What's Already Done ✅

- ✅ Railway configuration files created (`railway.json`, `nixpacks.toml`)
- ✅ Build scripts configured in `package.json`
- ✅ `.gitignore` and `.railwayignore` set up
- ✅ Database already on Railway (same one you're using!)
- ✅ All features working in development

## Quick Deploy Steps

### 1. Push to GitHub (2 minutes)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Morningstar app ready for Railway"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/morningstar.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Railway (3 minutes)

1. Go to **[railway.app](https://railway.app)** and sign in
2. Click "**New Project**"
3. Select "**Deploy from GitHub repo**"
4. Choose your `morningstar` repository
5. Railway auto-detects Next.js ✅

### 3. Add Environment Variables

In Railway dashboard, go to **Variables** and add:

```bash
# Your existing database (already works!)
DATABASE_URL=postgresql://postgres:swFxAAKNRdlVlNRkpCeEIpICnTTzXdfF@trolley.proxy.rlwy.net:49370/railway

# Generate this secret (run locally):
# openssl rand -base64 32
NEXTAUTH_SECRET=paste-your-generated-secret-here

# Temporary (you'll update after first deploy)
NEXTAUTH_URL=https://temporary.up.railway.app
NEXT_PUBLIC_APP_URL=https://temporary.up.railway.app

# Set environment
NODE_ENV=production
```

### 4. Deploy & Update URLs

1. Click "**Deploy**" (wait 2-3 minutes)
2. Copy your Railway URL (e.g., `https://morningstar-production.up.railway.app`)
3. Update these variables:
   ```bash
   NEXTAUTH_URL=https://your-actual-url.up.railway.app
   NEXT_PUBLIC_APP_URL=https://your-actual-url.up.railway.app
   ```
4. Railway will auto-redeploy

### 5. Test It! 🎉

Visit your Railway URL and sign in:
```
Email: test@morningstar.app
Password: password
```

**Done!** Your app is live! 🌟

## Troubleshooting

### "Missing Secret" Error
- Add `NEXTAUTH_SECRET` in Railway Variables
- Generate with: `openssl rand -base64 32`

### Authentication Not Working
- Update `NEXTAUTH_URL` to match your Railway domain exactly
- Redeploy after changing

### Build Fails
- Check Railway build logs
- Verify `DATABASE_URL` is correct
- Should work automatically with our configuration!

## What Railway Does Automatically

- ✅ Installs dependencies
- ✅ Generates Prisma Client
- ✅ Builds Next.js app
- ✅ Provides HTTPS/SSL
- ✅ Auto-scales based on traffic
- ✅ Provides monitoring

## Your Data

All your development data is already in the Railway database:
- ✅ Test account (test@morningstar.app)
- ✅ Sample journal entries
- ✅ Habits and logs
- ✅ Morning pages
- ✅ All seeded data

## Cost

**~$5-10/month** on Railway Hobby plan

## Need Help?

See **RAILWAY_DEPLOYMENT.md** for detailed guide or **DEPLOYMENT_CHECKLIST.md** for step-by-step checklist.

---

**Time to deploy**: 5 minutes  
**Difficulty**: Easy  
**Your app is ready!** 🚀

