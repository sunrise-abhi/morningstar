# Morningstar - Technical Specifications

## Tech Stack Details

### Core Technologies
- **Next.js**: 14.2.0+ (App Router with Server Components)
- **React**: 18.3.0+
- **TypeScript**: 5.4.0+
- **Node.js**: 20.x LTS

### UI Framework
- **ShadCN UI**: Latest (Radix UI primitives)
- **TailwindCSS**: 3.4.0+
- **Lucide Icons**: For iconography
- **Recharts**: For data visualization
- **TipTap** or **Textarea**: For rich text editing

### Backend & Data
- **Prisma ORM**: 5.x
- **PostgreSQL**: 15+
- **NextAuth.js**: 5.x (Auth.js)
- **Zod**: 3.x (Schema validation)

### AI & External Services
- **OpenAI API**: GPT-4 for text analysis
- **Vercel AI SDK**: Streaming AI responses
- **Web Speech API**: Browser-native voice-to-text
- **Vercel Blob**: File storage for images/audio

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **TypeScript**: Strict mode enabled

## Project Structure

```
morningstar/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth-related routes
│   │   ├── login/
│   │   └── verify/
│   ├── (onboarding)/             # First-time user flow
│   │   └── setup-goal/
│   ├── (app)/                    # Main app (requires auth)
│   │   ├── morning-pages/        # Morning pages entry
│   │   ├── dashboard/            # Main hub
│   │   ├── journal/              # Journal entries
│   │   │   ├── page.tsx
│   │   │   ├── [id]/             # Individual entry
│   │   │   └── new/              # New entry
│   │   ├── quest/                # Goal management
│   │   ├── habits/               # Habit tracking
│   │   ├── moodboard/            # Visual moodboard
│   │   ├── breathwork/           # Guided breathing
│   │   └── settings/             # User settings
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth endpoints
│   │   ├── ai/                   # AI analysis endpoints
│   │   ├── upload/               # File upload
│   │   └── cron/                 # Background jobs
│   ├── layout.tsx                # Root layout
│   ├── middleware.ts             # Auth & morning pages gate
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # ShadCN components
│   ├── shared/                   # Shared app components
│   │   ├── header.tsx
│   │   ├── navigation.tsx
│   │   └── footer.tsx
│   └── features/                 # Feature-specific components
│       ├── morning-pages/
│       │   ├── morning-pages-editor.tsx
│       │   ├── voice-recorder.tsx
│       │   └── completion-gate.tsx
│       ├── journal/
│       │   ├── journal-entry-card.tsx
│       │   ├── journal-editor.tsx
│       │   ├── mood-selector.tsx
│       │   └── ai-insights-panel.tsx
│       ├── habits/
│       │   ├── habit-list.tsx
│       │   ├── habit-log-button.tsx
│       │   ├── habit-calendar.tsx
│       │   └── streak-display.tsx
│       ├── moodboard/
│       │   ├── image-uploader.tsx
│       │   ├── moodboard-grid.tsx
│       │   └── moodboard-slideshow.tsx
│       ├── breathwork/
│       │   ├── breathwork-timer.tsx
│       │   ├── breathing-animation.tsx
│       │   └── session-selector.tsx
│       └── quest/
│           ├── goal-form.tsx
│           ├── goal-display.tsx
│           └── alignment-indicator.tsx
├── lib/                          # Core business logic
│   ├── services/                 # Business logic services
│   │   ├── auth.service.ts
│   │   ├── journal.service.ts
│   │   ├── morning-pages.service.ts
│   │   ├── habits.service.ts
│   │   ├── ai.service.ts
│   │   ├── moodboard.service.ts
│   │   ├── breathwork.service.ts
│   │   └── notifications.service.ts
│   ├── validators/               # Zod schemas
│   │   ├── journal.schema.ts
│   │   ├── habits.schema.ts
│   │   └── user.schema.ts
│   ├── utils/                    # Utility functions
│   │   ├── date.ts
│   │   ├── text.ts
│   │   ├── streak.ts
│   │   └── mood.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-morning-pages.ts
│   │   ├── use-journal.ts
│   │   ├── use-habits.ts
│   │   └── use-breathwork.ts
│   ├── db.ts                     # Prisma client singleton
│   ├── auth.ts                   # NextAuth config
│   └── constants.ts              # App constants
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Migration files
│   └── seed.ts                   # Database seeding
├── public/                       # Static assets
│   ├── breathwork/               # Audio files for guidance
│   └── images/
├── docs/                         # Documentation
│   ├── architecture.md
│   ├── technical.md
│   ├── status.md
│   └── dev_log.md
├── tasks/
│   └── tasks.md                  # Current tasks
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables (gitignored)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Database Schema Patterns

### Naming Conventions
- **Tables**: Plural, snake_case (e.g., `journal_entries`, `habit_logs`)
- **Columns**: camelCase in Prisma, snake_case in DB
- **Relations**: Descriptive names (e.g., `user`, `journalEntry`)

### Key Indexes
```prisma
// Frequently queried patterns
@@index([userId, date])        // Time-based user queries
@@index([userId, isActive])    // Active items per user
@@index([userId, createdAt])   // Chronological listings
@@unique([userId, date])       // One per day constraints
```

### Soft Deletes
- Use `archivedAt` or `deletedAt` fields instead of hard deletes
- Keep data for potential AI training or user restoration

## Authentication Flow

### NextAuth Configuration
```typescript
// lib/auth.ts
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
    newUser: "/onboarding/setup-goal",
  },
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id
      return session
    },
  },
})
```

### Middleware Protection
```typescript
// middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/login")
  const isMorningPages = req.nextUrl.pathname.startsWith("/morning-pages")
  
  // Redirect logic
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  
  // Morning pages gate (check in middleware for performance)
  if (isLoggedIn && !isMorningPages && !isAuthPage) {
    // Check if morning pages completed today
    // Implement check or delegate to app route
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
```

## Morning Pages Gate Logic

### Time-Based Gate
```typescript
// lib/services/morning-pages.service.ts
export async function checkMorningPagesAccess(userId: string): Promise<{
  hasAccess: boolean
  reason: string
  morningPage?: MorningPage
}> {
  const today = startOfDay(new Date())
  const currentHour = new Date().getHours()
  
  // Get user's cutoff time preference
  const prefs = await db.userPreferences.findUnique({
    where: { userId },
    select: { morningPagesCutoffTime: true },
  })
  
  const cutoffHour = prefs?.morningPagesCutoffTime ?? 12
  
  // After cutoff time, grant access
  if (currentHour >= cutoffHour) {
    return {
      hasAccess: true,
      reason: "after_cutoff",
    }
  }
  
  // Check if morning pages completed today
  const morningPage = await db.morningPage.findUnique({
    where: {
      userId_date: {
        userId,
        date: today,
      },
    },
  })
  
  if (morningPage) {
    return {
      hasAccess: true,
      reason: "completed",
      morningPage,
    }
  }
  
  return {
    hasAccess: false,
    reason: "not_completed",
  }
}
```

## AI Analysis Implementation

### OpenAI Integration
```typescript
// lib/services/ai.service.ts
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeJournalEntry(
  entry: JournalEntry,
  userGoal?: string
): Promise<AIAnalysis> {
  const prompt = `
Analyze the following journal entry for a user whose primary life goal is: "${userGoal || "Not specified"}"

Journal Entry:
${entry.content}

Provide analysis in the following JSON format:
{
  "detectedMood": "primary emotion",
  "moodScore": -1 to 1,
  "themes": ["theme1", "theme2"],
  "sentiment": "positive/negative/neutral/mixed",
  "keyPhrases": ["phrase1", "phrase2"],
  "observations": "Brief observations about patterns or notable elements",
  "patterns": "Any recurring themes or patterns",
  "encouragement": "A brief, genuine encouraging message",
  "goalAlignment": 0 to 1 score
}
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a compassionate AI coach helping users reflect on their personal growth journey.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  })

  const result = JSON.parse(completion.choices[0].message.content)
  
  // Save analysis to database
  const analysis = await db.aIAnalysis.create({
    data: {
      journalEntryId: entry.id,
      userId: entry.userId,
      detectedMood: result.detectedMood,
      moodScore: result.moodScore,
      themes: result.themes,
      sentiment: result.sentiment,
      keyPhrases: result.keyPhrases,
      observations: result.observations,
      patterns: result.patterns,
      encouragement: result.encouragement,
      goalAlignment: result.goalAlignment,
      tokensUsed: completion.usage?.total_tokens,
    },
  })

  return analysis
}
```

### Batch Analysis (Cron Job)
```typescript
// app/api/cron/analyze-entries/route.ts
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Find entries from yesterday that haven't been analyzed
  const yesterday = subDays(startOfDay(new Date()), 1)
  
  const unanalyzedEntries = await db.journalEntry.findMany({
    where: {
      date: yesterday,
      aiAnalysis: null,
      user: {
        preferences: {
          aiAnalysisEnabled: true,
        },
      },
    },
    include: {
      user: {
        include: {
          goals: {
            where: { isPrimary: true },
          },
        },
      },
    },
  })

  // Analyze each entry
  const results = await Promise.allSettled(
    unanalyzedEntries.map(async (entry) => {
      const primaryGoal = entry.user.goals[0]?.description
      return analyzeJournalEntry(entry, primaryGoal)
    })
  )

  return Response.json({
    analyzed: results.filter((r) => r.status === "fulfilled").length,
    failed: results.filter((r) => r.status === "rejected").length,
  })
}
```

## Habit Streak Calculation

```typescript
// lib/utils/streak.ts
export async function calculateHabitStreak(
  habitId: string
): Promise<{
  currentStreak: number
  longestStreak: number
  lastLoggedDate: Date | null
}> {
  const logs = await db.habitLog.findMany({
    where: {
      habitId,
      completed: true,
    },
    orderBy: { date: "desc" },
  })

  if (logs.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastLoggedDate: null }
  }

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  let expectedDate = startOfDay(new Date())

  for (const log of logs) {
    const logDate = startOfDay(new Date(log.date))
    
    if (isSameDay(logDate, expectedDate) || isSameDay(logDate, subDays(expectedDate, 1))) {
      tempStreak++
      if (isSameDay(logDate, expectedDate) || isYesterday(logDate)) {
        currentStreak = tempStreak
      }
      expectedDate = subDays(logDate, 1)
    } else {
      tempStreak = 1
      expectedDate = subDays(logDate, 1)
    }
    
    longestStreak = Math.max(longestStreak, tempStreak)
  }

  return {
    currentStreak,
    longestStreak,
    lastLoggedDate: logs[0].date,
  }
}
```

## Voice-to-Text Implementation

```typescript
// components/features/morning-pages/voice-recorder.tsx
"use client"

import { useState, useRef, useEffect } from "react"

export function VoiceRecorder({ onTranscript }: { onTranscript: (text: string) => void }) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + " "
          } else {
            interimTranscript += transcriptPiece
          }
        }

        setTranscript((prev) => prev + finalTranscript)
        if (finalTranscript) {
          onTranscript(finalTranscript)
        }
      }
    }
  }, [])

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {transcript && <p>{transcript}</p>}
    </div>
  )
}
```

## Server Actions Pattern

```typescript
// app/actions/journal.actions.ts
"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { journalEntrySchema } from "@/lib/validators/journal.schema"
import { revalidatePath } from "next/cache"

export async function createJournalEntry(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
    mood: formData.get("mood"),
    tags: formData.getAll("tags"),
  }

  const validated = journalEntrySchema.parse(data)

  const entry = await db.journalEntry.create({
    data: {
      ...validated,
      userId: session.user.id,
      wordCount: validated.content.split(/\s+/).length,
    },
  })

  revalidatePath("/journal")
  return { success: true, entry }
}
```

## Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/morningstar"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (for magic links)
EMAIL_SERVER="smtp://user:password@smtp.example.com:587"
EMAIL_FROM="noreply@morningstar.app"

# OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="sk-your-openai-key"

# File Storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Cron Jobs
CRON_SECRET="your-cron-secret"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Performance Optimizations

### 1. Database Query Optimization
- Use Prisma's `select` to fetch only needed fields
- Implement cursor-based pagination for lists
- Use `include` sparingly; prefer multiple targeted queries

### 2. Image Optimization
- Use Next.js `Image` component for moodboard images
- Generate thumbnails on upload
- Implement lazy loading for image grids

### 3. Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting (automatic with App Router)

### 4. Caching Strategy
- Server Components cache by default
- Use `revalidatePath` for targeted cache invalidation
- Implement SWR or React Query for client-side caching if needed

## Testing Strategy

### Unit Tests
- Utils functions (streak calculation, date helpers)
- Validators (Zod schemas)
- Service functions (isolated business logic)

### Integration Tests
- API routes
- Server actions
- Database operations

### E2E Tests
- Critical user flows (morning pages → dashboard)
- Authentication flow
- Habit logging flow

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] NextAuth configured with production URL
- [ ] OpenAI API key valid and funded
- [ ] File storage configured
- [ ] Cron jobs scheduled on Vercel
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured
- [ ] Domain configured
- [ ] SSL certificate active

## Future Technical Considerations

1. **Real-time Features**: WebSockets for live updates
2. **Mobile App**: React Native or capacitor for mobile
3. **Offline Support**: PWA with service workers
4. **Advanced AI**: Fine-tuned models on user data
5. **Data Export**: Generate PDF reports
6. **API for Third-party**: Public API for integrations

