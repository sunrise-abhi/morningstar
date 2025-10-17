# 🚀 Railway Deployment Checklist

Quick checklist for deploying Morningstar to Railway.

## Pre-Deployment

- [ ] Code is committed and pushed to GitHub
- [ ] All features tested locally
- [ ] Database schema is finalized
- [ ] No errors in `npm run build` locally

## Railway Setup

- [ ] Created Railway account
- [ ] Created new project
- [ ] Connected GitHub repository
- [ ] Railway detected as Next.js project

## Environment Variables

Copy these to Railway Variables section:

### Required (Copy-Paste Ready)

```bash
DATABASE_URL=postgresql://postgres:swFxAAKNRdlVlNRkpCeEIpICnTTzXdfF@trolley.proxy.rlwy.net:49370/railway
```

### Generate This

```bash
# Run locally to generate:
openssl rand -base64 32

# Then add to Railway as:
NEXTAUTH_SECRET=<paste-generated-secret-here>
```

### Update After First Deploy

```bash
# After getting your Railway URL, update these:
NEXTAUTH_URL=https://your-actual-app.up.railway.app
NEXT_PUBLIC_APP_URL=https://your-actual-app.up.railway.app
```

### Set This

```bash
NODE_ENV=production
```

## Deployment Steps

1. [ ] Click "Deploy" in Railway
2. [ ] Wait 2-5 minutes for build
3. [ ] Copy your Railway app URL
4. [ ] Update `NEXTAUTH_URL` variable with real URL
5. [ ] Update `NEXT_PUBLIC_APP_URL` variable with real URL  
6. [ ] Click "Redeploy" to apply changes

## Post-Deployment Testing

- [ ] Visit your Railway URL
- [ ] Sign in works (test@morningstar.app / password)
- [ ] Dashboard loads
- [ ] Can create journal entry
- [ ] Can log habits
- [ ] Morning pages work
- [ ] Navigation between pages works
- [ ] No errors in browser console

## Verification Commands

```bash
# Test the deployment
curl https://your-app.up.railway.app

# Should return 307 redirect to /login
```

## Troubleshooting

### Build Fails
- Check Railway logs for error
- Verify `prisma generate` runs in build
- Check `package.json` scripts

### Auth Errors
- Verify `NEXTAUTH_SECRET` is set
- Confirm `NEXTAUTH_URL` matches Railway domain exactly
- Check `NODE_ENV=production`

### Database Errors
- Verify `DATABASE_URL` is correct
- Test connection from local: `psql $DATABASE_URL`
- Check Railway PostgreSQL service is running

### 404 Errors
- Ensure build completed successfully
- Check `npm run build` works locally
- Verify all routes are in `app/` directory

## Optional Enhancements

- [ ] Add custom domain
- [ ] Configure email provider (for notifications)
- [ ] Add OpenAI API key (for AI features)
- [ ] Set up monitoring/alerts
- [ ] Configure Vercel Blob (for moodboard images)

## Success Criteria

✅ App is live and accessible  
✅ Authentication works  
✅ All features functional  
✅ Database connected  
✅ No console errors  
✅ SSL/HTTPS working  

## Your Deployment URL

```
Production URL: https://______________.up.railway.app
Custom Domain: https://______________ (if configured)
```

## Support Resources

- Railway Docs: https://docs.railway.app
- Morningstar Docs: See RAILWAY_DEPLOYMENT.md
- GitHub Issues: For code issues

---

**Time Estimate**: 10-15 minutes  
**Difficulty**: Easy  
**Cost**: $5-10/month  

Good luck! 🚂✨

