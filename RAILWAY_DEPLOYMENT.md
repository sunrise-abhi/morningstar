# 🚂 Railway Deployment Guide for Morningstar

This guide will walk you through deploying your Morningstar app to Railway.

## Prerequisites

- [ ] Railway account (sign up at [railway.app](https://railway.app))
- [ ] GitHub account (to connect your repository)
- [ ] Your code pushed to a GitHub repository

## Step 1: Push Your Code to GitHub

```bash
# Initialize git if you haven't already
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Morningstar app"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/morningstar.git
git push -u origin main
```

## Step 2: Create a New Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `morningstar` repository
5. Railway will automatically detect it's a Next.js project

## Step 3: Configure Environment Variables

In your Railway project dashboard, go to **Variables** and add these:

### Required Variables

```bash
# Database (Already have this!)
DATABASE_URL=postgresql://postgres:swFxAAKNRdlVlNRkpCeEIpICnTTzXdfF@trolley.proxy.rlwy.net:49370/railway

# NextAuth Secret (Generate a new one for production!)
NEXTAUTH_SECRET=<generate-new-secret-see-below>

# NextAuth URL (Will be your Railway domain)
NEXTAUTH_URL=https://your-app.up.railway.app

# App URL (Same as NEXTAUTH_URL)
NEXT_PUBLIC_APP_URL=https://your-app.up.railway.app

# Environment
NODE_ENV=production
```

### Generate a Secure NEXTAUTH_SECRET

Run this command locally:
```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET` in Railway.

## Step 4: Configure Build Settings (Optional)

Railway should auto-detect these, but you can verify:

- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Node Version**: 20.x

These are already configured in `railway.json` and `nixpacks.toml`.

## Step 5: Deploy!

1. Click "Deploy" in Railway
2. Wait for the build to complete (2-5 minutes)
3. Railway will provide you with a URL like: `https://your-app.up.railway.app`

## Step 6: Update NEXTAUTH_URL

After deployment:

1. Copy your Railway app URL
2. Update the `NEXTAUTH_URL` variable in Railway:
   ```
   NEXTAUTH_URL=https://your-actual-app.up.railway.app
   ```
3. Save and redeploy

## Step 7: Verify Deployment

Visit your Railway URL and:
- [ ] Sign in with test account (test@morningstar.app / password)
- [ ] Check dashboard loads
- [ ] Create a journal entry
- [ ] Test habit logging
- [ ] Verify all features work

## Database Connection

Your PostgreSQL database is already set up on Railway at:
```
trolley.proxy.rlwy.net:49370
Database: railway
```

This is the same database you've been using in development, so all your data is already there!

## Troubleshooting

### Build Fails

**Check Prisma Generation**:
```bash
# Ensure prisma generate runs during build
# This is configured in nixpacks.toml
```

**Check Node Version**:
- Railway uses Node 20.x by default
- Verify in `nixpacks.toml`

### "Server error" After Deployment

1. **Check Environment Variables**:
   - Ensure `NEXTAUTH_SECRET` is set
   - Verify `DATABASE_URL` is correct
   - Confirm `NEXTAUTH_URL` matches your Railway domain

2. **Check Logs**:
   - Click "Deployments" in Railway
   - Click on your latest deployment
   - View logs for errors

3. **Common Issues**:
   - Missing `NEXTAUTH_SECRET` → Add it in Variables
   - Wrong `NEXTAUTH_URL` → Update to match Railway domain
   - Database connection → Verify DATABASE_URL

### Authentication Not Working

1. **Update NEXTAUTH_URL**:
   ```bash
   # Must match your Railway domain exactly
   NEXTAUTH_URL=https://your-actual-app.up.railway.app
   ```

2. **Clear Browser Cache**:
   - Sign out
   - Clear cookies
   - Try signing in again

### Database Connection Issues

1. **Verify DATABASE_URL**:
   ```bash
   # Should be:
   postgresql://postgres:swFxAAKNRdlVlNRkpCeEIpICnTTzXdfF@trolley.proxy.rlwy.net:49370/railway
   ```

2. **Check Database Status**:
   - Go to Railway dashboard
   - Check if PostgreSQL service is running

## Custom Domain (Optional)

To use your own domain:

1. Go to your Railway project
2. Click "Settings" → "Domains"
3. Click "Add Custom Domain"
4. Enter your domain (e.g., `morningstar.yourdomain.com`)
5. Add the CNAME record to your DNS:
   ```
   CNAME: your-app.up.railway.app
   ```
6. Update `NEXTAUTH_URL` to your custom domain
7. Redeploy

## Environment Variables Reference

### Production Variables

```bash
# Core
DATABASE_URL=postgresql://postgres:...@trolley.proxy.rlwy.net:49370/railway
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=https://your-app.up.railway.app
NEXT_PUBLIC_APP_URL=https://your-app.up.railway.app
NODE_ENV=production

# Optional: Email (if you want to add email notifications later)
# EMAIL_SERVER=smtp://...
# EMAIL_FROM=noreply@yourdomain.com

# Optional: OpenAI (for AI analysis features)
# OPENAI_API_KEY=sk-...

# Optional: Vercel Blob (for moodboard images)
# BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

## Post-Deployment Checklist

- [ ] App is accessible at Railway URL
- [ ] Can sign in successfully
- [ ] Dashboard loads with data
- [ ] Can create journal entries
- [ ] Can log habits
- [ ] Morning pages work
- [ ] All navigation works
- [ ] Database connection stable
- [ ] No console errors

## Monitoring

### Railway Metrics

Railway provides:
- CPU usage
- Memory usage
- Request metrics
- Deployment logs

Access these in your Railway dashboard.

### Application Logs

View logs in Railway:
1. Go to your project
2. Click "Deployments"
3. Select deployment
4. View "Build Logs" and "Deploy Logs"

## Scaling

Railway automatically handles:
- ✅ Auto-scaling based on traffic
- ✅ SSL certificates (HTTPS)
- ✅ CDN for static assets
- ✅ Automatic restarts on failure

## Cost Estimate

Railway Pricing (as of 2024):
- **Hobby Plan**: $5/month
  - 500 hours of usage
  - $0.000231/GB-hour for memory
  - Perfect for personal use

- **Pro Plan**: $20/month
  - Unlimited hours
  - Better for production/team use

Your current setup:
- Next.js app: ~512MB RAM
- PostgreSQL: ~256MB RAM
- Estimated cost: $5-10/month

## Backup Strategy

### Database Backups

Railway provides automatic backups. To manually backup:

```bash
# Local backup
pg_dump $DATABASE_URL > backup.sql

# Restore if needed
psql $DATABASE_URL < backup.sql
```

### Code Backups

Your code is on GitHub - that's your backup! ✅

## Updates and Redeployment

### Deploy Updates

```bash
# Make changes locally
git add .
git commit -m "Update: description"
git push origin main
```

Railway will automatically:
1. Detect the push
2. Build the new version
3. Deploy with zero downtime

### Manual Redeploy

In Railway dashboard:
1. Click "Deployments"
2. Click "Redeploy" on any deployment

## Security Best Practices

1. **Environment Variables**:
   - ✅ Never commit `.env.local` to git
   - ✅ Use different secrets for prod/dev
   - ✅ Rotate NEXTAUTH_SECRET periodically

2. **Database**:
   - ✅ Use strong password (already set)
   - ✅ Database is behind Railway's network
   - ✅ Only accessible via connection string

3. **Application**:
   - ✅ NextAuth handles session security
   - ✅ HTTPS enforced by Railway
   - ✅ CSRF protection built-in

## Support

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: Community support
- **GitHub Issues**: For app-specific issues

## Quick Deploy Checklist

Use this checklist for fast deployment:

```
1. [ ] Code pushed to GitHub
2. [ ] Created Railway project
3. [ ] Connected GitHub repo
4. [ ] Added DATABASE_URL variable
5. [ ] Generated and added NEXTAUTH_SECRET
6. [ ] Added NEXTAUTH_URL (temp, will update)
7. [ ] Added NEXT_PUBLIC_APP_URL (temp, will update)
8. [ ] Set NODE_ENV=production
9. [ ] Clicked Deploy
10. [ ] Waited for build (2-5 min)
11. [ ] Copied Railway app URL
12. [ ] Updated NEXTAUTH_URL with real URL
13. [ ] Updated NEXT_PUBLIC_APP_URL with real URL
14. [ ] Redeployed
15. [ ] Tested sign in
16. [ ] Verified all features work
```

## You're Live! 🎉

Your Morningstar app is now deployed on Railway and accessible worldwide!

Share your URL: `https://your-app.up.railway.app`

---

**Next Steps**:
- Add custom domain
- Set up monitoring/alerts
- Configure email provider (optional)
- Add OpenAI key for AI features (optional)
- Invite your team!

