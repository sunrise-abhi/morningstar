# Morningstar - System Architecture

## Overview
Morningstar is a minimalist productivity and self-reflection app designed to help users stay connected to their #1 life goal through daily practices including morning pages, journaling, habit tracking, moodboards, breathwork, and AI-based feedback.

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Component Library**: ShadCN UI + Radix UI
- **Styling**: TailwindCSS
- **State Management**: React Server Components, nuqs (URL state)
- **Forms**: React Hook Form + Zod validation
- **Voice Recording**: Web Speech API / MediaRecorder API

### Backend
- **Framework**: Next.js API Routes / Server Actions
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js (v5/Auth.js)
- **AI Integration**: OpenAI API (GPT-4 for analysis)
- **File Storage**: Vercel Blob / AWS S3 (for moodboard images)
- **Background Jobs**: Vercel Cron / Inngest (for notifications)

### Infrastructure
- **Hosting**: Vercel
- **Database Hosting**: Vercel Postgres / Supabase / Railway
- **CDN**: Vercel Edge Network
- **Monitoring**: Vercel Analytics

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Browser   │  │  Voice Input │  │  Push Notif      │   │
│  │   (React)   │  │  (Web API)   │  │  (Web Push)      │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js App Router                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Middleware (Auth Check, Morning Pages Gate)         │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │   API        │  │   Server     │      │
│  │   (RSC)      │  │   Routes     │  │   Actions    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Auth       │  │   Journal    │  │   Habits     │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   AI         │  │   Moodboard  │  │   Breathwork │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Prisma     │  │   OpenAI     │  │   Blob       │      │
│  │   ORM        │  │   API        │  │   Storage    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                                     │              │
│         ▼                                     ▼              │
│  ┌──────────────┐                    ┌──────────────┐       │
│  │  PostgreSQL  │                    │  File Store  │       │
│  └──────────────┘                    └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Authentication System
- **NextAuth Configuration**: Email magic links + optional OAuth (Google)
- **Session Management**: JWT-based sessions with secure httpOnly cookies
- **Middleware Protection**: Route protection at middleware level
- **User Onboarding Flow**: Goal setup on first login

### 2. Morning Pages Gate System
- **Time-Based Logic**: Check if user has completed morning pages for current day
- **Middleware Check**: Intercept routes and redirect to morning pages if incomplete
- **Bypass Logic**: After 12 PM, allow access without completion (configurable)
- **Voice-to-Text**: Optional voice recording with Web Speech API transcription

### 3. Journal & AI Analysis System
- **Rich Text Editor**: Minimalist editor for entries (TipTap or Textarea)
- **Entry Storage**: PostgreSQL with full-text search capability
- **AI Analysis Pipeline**:
  - Scheduled batch analysis (daily/weekly)
  - Sentiment analysis using OpenAI
  - Pattern detection (recurring themes, mood trends)
  - Personalized insights generation
- **Trend Visualization**: Charts showing mood, themes over time

### 4. Goal (Quest) System
- **Single Primary Goal**: User defines their #1 life goal
- **Goal Context**: AI uses this as context for all insights
- **Goal Alignment**: Reflect on alignment in journal prompts
- **Goal Evolution**: Track changes/updates to goal over time

### 5. Habit Tracking System
- **Habit Types**: Positive (to build) and Negative (to eliminate)
- **Daily Logging**: Simple checkbox or counter interface
- **Streak Tracking**: Calculate current streaks and best streaks
- **Visualization**: Calendar heatmap, trend graphs
- **Habit Insights**: AI-generated observations on habit patterns

### 6. Moodboard System
- **Image Upload**: Drag-and-drop interface for images
- **Storage**: Blob storage with CDN delivery
- **Organization**: Optional tagging/categorization
- **Display Modes**: Grid view, slideshow, ambient background
- **Goal Connection**: Link moodboard items to #1 goal

### 7. Breathwork System
- **Session Types**: Box breathing, 4-7-8, custom timers
- **Visual Guide**: Animated circle for breathing rhythm
- **Audio Cues**: Optional sound guidance
- **Session Logging**: Track completed sessions
- **Progress**: Insights on consistency and impact on mood

### 8. Notification System
- **Gentle Reminders**: Morning pages reminder (configurable time)
- **Habit Reminders**: Optional daily check-in prompts
- **Delivery**: Web push notifications + optional email
- **Tone**: Inviting, non-intrusive copy
- **User Control**: Easy opt-out, frequency control

## Data Flow

### Morning Pages Flow
```
User opens app → Middleware checks completion status → 
If not complete & before noon → Redirect to /morning-pages → 
User writes/records → Save to DB → Mark complete → Unlock app
```

### AI Analysis Flow
```
Daily cron job → Fetch recent unanalyzed entries → 
Send to OpenAI with user's goal context → 
Parse insights (mood, themes, patterns) → 
Store analysis results → Display in dashboard
```

### Habit Tracking Flow
```
User logs habit → Update habit_logs table → 
Calculate streak → Update habit record → 
Trigger AI analysis on milestones → 
Update visualizations
```

## Security Considerations

1. **Authentication**: Secure session management with NextAuth
2. **Authorization**: All mutations require authenticated user
3. **Data Privacy**: User data isolated per account
4. **API Security**: Rate limiting on AI endpoints
5. **File Upload**: Validated file types, size limits, virus scanning
6. **Environment Secrets**: All keys in environment variables
7. **SQL Injection**: Prevented via Prisma parameterized queries
8. **XSS Prevention**: Input sanitization, CSP headers

## Performance Considerations

1. **Server Components**: Maximize use of RSC for data fetching
2. **Streaming**: Use streaming for AI response generation
3. **Image Optimization**: Next.js Image component for moodboard
4. **Caching**: Aggressive caching of static content
5. **Database Indexes**: Proper indexing on userId, date fields
6. **Lazy Loading**: Code split by route and feature
7. **AI Batching**: Batch AI analysis requests to reduce API costs

## Scalability

1. **Database**: PostgreSQL with connection pooling
2. **File Storage**: CDN-backed blob storage
3. **API Rate Limits**: Implement per-user rate limits
4. **Monitoring**: Track key metrics (response times, error rates)
5. **Caching Strategy**: Redis for session caching (if needed)

## Module Boundaries

### `/app` - Application Routes
- `/morning-pages` - Morning pages entry (gated)
- `/dashboard` - Main hub (post-morning pages)
- `/journal` - Journal entries and analysis
- `/quest` - Goal definition and tracking
- `/habits` - Habit tracking interface
- `/moodboard` - Visual moodboard
- `/breathwork` - Guided breathing sessions
- `/settings` - User preferences and notifications

### `/components` - Reusable UI Components
- `/ui` - ShadCN components
- `/shared` - App-specific shared components
- `/features` - Feature-specific components

### `/lib` - Business Logic
- `/services` - Core business logic (journal, habits, AI, etc.)
- `/utils` - Helper functions
- `/validators` - Zod schemas
- `/db` - Prisma client and queries

### `/prisma` - Database
- `schema.prisma` - Database schema
- `/migrations` - Migration history

## Dependencies Between Modules

- All features depend on Authentication
- AI Analysis depends on Journal entries
- Dashboard aggregates data from all modules
- Middleware gates access based on Morning Pages completion
- Notification system can trigger from any module

## Integration Points

### External APIs
1. **OpenAI API**: Text analysis, insight generation
2. **Web Speech API**: Voice-to-text for morning pages
3. **Push Notification API**: Browser notifications

### Internal APIs
1. **NextAuth API**: `/api/auth/*` - Authentication endpoints
2. **Journal API**: CRUD operations for entries
3. **Habits API**: CRUD operations for habits and logs
4. **AI Analysis API**: Trigger and fetch analysis results
5. **Moodboard API**: Upload and manage images

## Future Considerations

1. **Multi-user collaboration**: Team journals, shared goals
2. **Mobile apps**: React Native or PWA optimization
3. **Advanced analytics**: More sophisticated AI insights
4. **Integration**: Calendar sync, health app data
5. **Export**: PDF reports, data export functionality
6. **Themes**: Light/dark mode, custom color schemes
7. **Localization**: Multi-language support

