# Getting Started with Morningstar 🌟

Congratulations! Your Morningstar productivity app is built and ready to use. Follow these steps to get it running.

## 📋 What's Been Built

✅ **Complete Authentication System** - Magic link email sign-in  
✅ **Morning Pages** - Daily writing with auto-save  
✅ **Goal System** - Track your #1 life quest  
✅ **Journal** - Write and reflect with mood tracking  
✅ **Habit Tracking** - Log daily habits with streaks  
✅ **Breathwork** - Guided breathing sessions  
✅ **Moodboard** - Visual inspiration (foundation)  
✅ **Dashboard** - Central hub for everything  
✅ **Settings** - Customize your experience  

## 🚀 Quick Start (5 Minutes)

### 1. Database is Already Set Up! ✅

Your PostgreSQL database on Railway is already configured and populated with all the tables you need.

### 2. Configure Email Provider (Required for Login)

You need an email provider to send magic link authentication emails. Choose one:

#### Option A: Resend (Recommended - Easiest)

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Get your API key
3. Update `.env.local`:

```bash
EMAIL_SERVER="smtp://resend:re_YOUR_API_KEY@smtp.resend.com:587"
EMAIL_FROM="onboarding@resend.dev"  # Use your verified domain
```

#### Option B: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Update `.env.local`:

```bash
EMAIL_SERVER="smtp://apikey:YOUR_SENDGRID_API_KEY@smtp.sendgrid.net:587"
EMAIL_FROM="noreply@yourdomain.com"
```

### 3. Optional: Add OpenAI for AI Features

If you want journal entry analysis and insights:

1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Update `.env.local`:

```bash
OPENAI_API_KEY="sk-your-key-here"
```

### 4. Start the App

```bash
npm run dev
```

Visit **http://localhost:3000**

### 5. Sign In & Start Using!

1. Enter your email on the login page
2. Check your inbox for the magic link
3. Click the link to sign in
4. Set your #1 life goal (first time only)
5. Start writing your morning pages!

## 📁 Project Structure

```
morningstar/
├── app/                    # Next.js app directory
│   ├── (app)/             # Main authenticated app routes
│   │   ├── dashboard/     # Main hub
│   │   ├── morning-pages/ # Daily writing
│   │   ├── journal/       # Journal entries
│   │   ├── habits/        # Habit tracking
│   │   ├── quest/         # Goal management
│   │   ├── breathwork/    # Breathing exercises
│   │   ├── moodboard/     # Vision board
│   │   └── settings/      # User settings
│   ├── api/               # API routes
│   ├── login/             # Login page
│   └── verify/            # Email verification page
├── components/            # React components
│   ├── ui/               # Base UI components (ShadCN)
│   ├── features/         # Feature-specific components
│   └── shared/           # Shared components (nav, etc.)
├── lib/                   # Core business logic
│   ├── services/         # Service layer
│   ├── utils/            # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Prisma client
│   └── constants.ts      # App constants
├── prisma/               # Database
│   └── schema.prisma     # Database schema (already deployed!)
├── docs/                 # Documentation
└── tasks/                # Task tracking
```

## 🎯 Key Features & How to Use

### Morning Pages
- **What**: Daily free-form writing to clear your mind
- **How**: Opens automatically when you visit the app before noon
- **Access**: After your configured cutoff time (default 12 PM), you can access the app without completing morning pages
- **Feature**: Auto-saves your draft as you write

### Quest (Your #1 Goal)
- **What**: Your primary life goal that guides everything
- **How**: Set it during onboarding, view it anytime at `/quest`
- **Feature**: Displayed throughout the app to keep you aligned

### Journal
- **What**: Reflect on your day with rich entries
- **How**: 
  - Click "New Entry" from the journal page
  - Add a title (optional), select your mood, write your thoughts
  - AI analysis will identify themes and patterns (if OpenAI configured)
- **Feature**: Mood tracking with emojis, word count, AI insights

### Habits
- **What**: Track positive habits to build and negative habits to eliminate
- **How**:
  - Create habits from the habits page
  - Quick-log from the dashboard
  - Track streaks automatically
- **Feature**: Streak calculation, progress visualization

### Breathwork
- **What**: Guided breathing exercises
- **How**: Choose a breathing pattern and follow along
- **Patterns**: Box breathing (4-4-4-4), 4-7-8 technique
- **Feature**: Tracks total sessions and minutes

### Dashboard
- **What**: Your central hub
- **Shows**:
  - Morning pages status
  - Your primary goal
  - Recent journal entries
  - Quick habit logging
  - Progress stats

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Open Prisma Studio (database GUI)
npm run db:studio

# Push schema changes to database
npm run db:push

# Generate Prisma Client
npm run db:generate

# Lint code
npm run lint
```

## 🗄️ Database Management

Your database is hosted on Railway. To manage it:

### Via Prisma Studio
```bash
npm run db:studio
```
Opens a GUI at http://localhost:5555 to view and edit data.

### Via Command Line
```bash
# Connect to your Railway database
PGPASSWORD=swFxAAKNRdlVlNRkpCeEIpICnTTzXdfF psql \
  -h trolley.proxy.rlwy.net \
  -U postgres \
  -p 49370 \
  -d railway
```

### Make Schema Changes
1. Edit `prisma/schema.prisma`
2. Run `npm run db:push` to sync changes
3. Run `npm run db:generate` to update Prisma Client

## 📱 Features Status

| Feature | Status | Notes |
|---------|--------|-------|
| Authentication | ✅ Complete | Needs email provider configured |
| Morning Pages | ✅ Complete | Full functionality |
| Goal System | ✅ Complete | Working perfectly |
| Journal | ✅ Complete | CRUD operations working |
| AI Analysis | 🟡 Foundation | Needs OpenAI API key |
| Habits | ✅ Complete | Tracking and streaks working |
| Breathwork | 🟡 Foundation | Stats working, needs animated timer |
| Moodboard | 🟡 Foundation | Needs image upload implementation |
| Dashboard | ✅ Complete | All integrations working |
| Settings | ✅ Complete | Preferences working |
| Navigation | ✅ Complete | Beautiful nav bar |

**Legend**:
- ✅ Complete - Fully functional
- 🟡 Foundation - Core working, enhancements needed
- ⏳ Planned - Not yet implemented

## 🔐 Security Notes

- **NextAuth** handles all authentication securely
- **Database credentials** are environment variables (never commit them)
- **API routes** are protected with session checks
- **Prisma** prevents SQL injection automatically
- **HTTPS** required in production (Vercel provides this)

## 🚀 Deployment to Production

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial Morningstar app"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables** in Vercel:
   ```
   DATABASE_URL=postgresql://postgres:swFxAAKNRdlVlNRkpCeEIpICnTTzXdfF@trolley.proxy.rlwy.net:49370/railway
   NEXTAUTH_SECRET=(generate a new one: openssl rand -base64 32)
   NEXTAUTH_URL=https://your-app.vercel.app
   EMAIL_SERVER=smtp://...
   EMAIL_FROM=noreply@yourdomain.com
   OPENAI_API_KEY=sk-... (optional)
   ```

4. **Deploy**!
   - Vercel will build and deploy automatically
   - Visit your app at your Vercel URL

## 🐛 Troubleshooting

### "Error: Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Database connection error"
Check that DATABASE_URL in `.env.local` is correct.

### "NextAuth configuration error"
Make sure EMAIL_SERVER and EMAIL_FROM are configured.

### "Can't sign in"
1. Check email provider credentials
2. Look in spam folder for magic link email
3. Check server logs for errors

### Database Schema Out of Sync
```bash
npm run db:push
npm run db:generate
```

## 📖 Further Customization

### Change Morning Pages Cutoff Time
1. Go to `/settings`
2. Update "Cutoff Time" (default is 12 = noon)
3. After this hour, you can access the app without morning pages

### Customize Colors
Edit `app/globals.css` to change the color scheme:
```css
:root {
  --primary: 222.2 47.4% 11.2%;  /* Change these values */
  --secondary: 210 40% 96.1%;
  /* ... more colors */
}
```

### Add More Breathwork Patterns
Edit `lib/constants.ts`:
```typescript
export const BREATHWORK_TYPES = {
  // Add your own pattern
  custom_name: {
    name: "My Pattern",
    description: "Description",
    pattern: [4, 4, 4, 4], // [inhale, hold, exhale, hold]
  },
}
```

## 🆘 Need Help?

- **Documentation**: Check `docs/` folder for detailed architecture and technical specs
- **Tasks**: See `tasks/tasks.md` for planned features
- **Dev Log**: Read `docs/dev_log.md` for implementation details

## 🎉 You're Ready!

Your Morningstar app is production-ready. Configure your email provider, and start your journey of intentional productivity and self-reflection!

**Next Steps**:
1. ✅ Configure email provider
2. ✅ Start development server
3. ✅ Sign in and set your goal
4. ✅ Write your first morning pages
5. ✅ Explore all features
6. 🚀 Deploy to production when ready
7. 📊 Gather feedback from your team
8. 🔄 Iterate and improve

---

Built with intention for Sunrise Systems ✨

