# Morningstar ⭐

A minimalist productivity and self-reflection app designed to help you stay connected to your #1 life goal through daily practices.

## Overview

Morningstar combines morning pages, journaling, habit tracking, moodboards, breathwork, and AI-powered insights into a single, calming experience that helps you reflect, grow, and align with your deepest aspirations.

## Core Features

### 🌅 Morning Pages
Start each day with free-form writing or voice recording. Access to the rest of the app is gently gated until you complete your morning pages (before noon).

### 🎯 Quest System
Define and track your #1 life goal. This becomes the central theme woven throughout your experience, from AI insights to daily reflections.

### 📔 Smart Journal
Write journal entries with mood tracking and tagging. AI analyzes your entries to detect patterns, themes, and provides encouraging insights aligned with your goal.

### ✅ Habit Tracking
Track positive habits to build and negative habits to eliminate. Visualize streaks and progress with calming, motivating interfaces.

### 🖼️ Moodboard
Create a visual representation of your future self and aspirations. Upload and organize images that inspire you.

### 🫁 Breathwork
Access guided breathing sessions (box breathing, 4-7-8, custom) with visual timers and mood tracking.

### 🔔 Gentle Reminders
Optional notifications that feel like invitations rather than demands, helping you maintain consistency.

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI**: ShadCN UI + Radix + TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js v5
- **AI**: OpenAI GPT-4
- **Storage**: Vercel Blob
- **Hosting**: Vercel

## Project Structure

```
morningstar/
├── app/              # Next.js App Router (pages, API routes)
├── components/       # React components (UI, features)
├── lib/              # Services, utilities, hooks
├── prisma/           # Database schema and migrations
├── docs/             # Documentation
├── tasks/            # Task tracking
└── public/           # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20.x or later
- PostgreSQL 15 or later
- pnpm/npm/yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd morningstar

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
npx prisma generate
npx prisma db push

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the app.

## Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth
- `NEXTAUTH_URL` - App URL
- `EMAIL_SERVER` - SMTP server for magic links
- `OPENAI_API_KEY` - OpenAI API key
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob token

## Development Workflow

### Database Changes

```bash
# Create a new migration
npx prisma migrate dev --name description

# Update Prisma Client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Code Style

- TypeScript strict mode enabled
- ESLint + Prettier for formatting
- Functional components with hooks
- Server Components by default
- Run `pnpm lint` before committing

## Documentation

- [Architecture](docs/architecture.md) - System design and architecture
- [Technical Specs](docs/technical.md) - Implementation details
- [Tasks](tasks/tasks.md) - Development roadmap
- [Status](docs/status.md) - Current project status
- [Dev Log](docs/dev_log.md) - Development history

## Development Phases

1. ✅ **Planning** - Architecture and schema design (COMPLETE)
2. ⏳ **Phase 0** - Project setup and infrastructure
3. **Phase 1** - Authentication system
4. **Phase 2** - Database migrations
5. **Phase 3** - Core UI components
6. **Phase 4** - Morning pages with gating
7. **Phase 5** - Goal (Quest) system
8. **Phase 6** - Journal system
9. **Phase 7** - AI analysis integration
10. **Phase 8** - Habit tracking
11. **Phase 9** - Moodboard
12. **Phase 10** - Breathwork
13. **Phase 11** - Dashboard
14. **Phase 12** - Notifications
15. **Phase 13** - Settings
16. **Phase 14** - Polish & UX
17. **Phase 15** - Testing
18. **Phase 16** - Deployment
19. **Phase 17** - Documentation

See [tasks/tasks.md](tasks/tasks.md) for detailed breakdown.

## Design Philosophy

- **Minimalist**: Clean, distraction-free interfaces
- **Calming**: Gentle colors and smooth animations
- **Inviting**: Prompts feel like invitations, not demands
- **Goal-Centric**: Your #1 life goal woven throughout
- **Reflective**: Focus on insights over metrics

## Contributing

This is currently a private project for Sunrise Systems. If you're part of the team, please follow the development guidelines in the docs.

## License

Private - All Rights Reserved

---

Built with intention by Sunrise Systems
