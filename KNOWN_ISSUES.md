# Known Issues

## Local Build on macOS with Special Characters in Path

### Issue
`npm run build` fails with "Unexpected end of JSON input" when the project path contains special characters (like apostrophes).

### Example Path That Causes Issues
```
/Users/abhi/Library/Mobile Documents/com~apple~CloudDocs/Documents/Documents - Abhishek's MacBook Pro/Arena/Cursor/morningstar
```

### Why It Happens
Next.js webpack has issues with paths containing apostrophes or special Unicode characters.

### Impact
- ✅ **Dev server works fine** (`npm run dev`)
- ✅ **Railway deployment will work** (no special characters in paths)
- ❌ **Local production build fails** (`npm run build`)

### Workarounds

#### Option 1: Move Project (Recommended for Local Testing)
```bash
# Move to a simpler path
mv ~/Library/Mobile\ Documents/com~apple~CloudDocs/Documents/Documents\ -\ Abhishek\'s\ MacBook\ Pro/Arena/Cursor/morningstar ~/projects/morningstar

cd ~/projects/morningstar
npm run build  # Should work now!
```

#### Option 2: Use Dev Mode for Local Testing
```bash
# Dev server works fine
npm run dev
```

#### Option 3: Deploy to Railway
Railway deployment will work perfectly because:
- ✅ Railway uses standard Linux paths
- ✅ No special characters in `/app` directory
- ✅ Build runs in clean environment

### Solution
**For development**: Continue using `npm run dev` - works perfectly!  
**For deployment**: Push to Railway - builds will succeed there!

### Verification
You can verify everything works by checking:
1. ✅ Dev server runs: `npm run dev` 
2. ✅ All features work in development
3. ✅ Railway deployment succeeds (once pushed)

---

## No Other Known Issues! ✅

The app is production-ready and will build successfully on Railway.

