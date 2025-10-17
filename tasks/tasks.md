# Morningstar - Development Tasks

## Phase 0: Project Setup & Infrastructure
**Goal**: Initialize project with proper tooling and core dependencies

- [ ] Initialize Next.js project with TypeScript
- [ ] Install and configure TailwindCSS
- [ ] Set up ShadCN UI (init + core components)
- [ ] Install and configure Prisma
- [ ] Set up PostgreSQL database (local + production)
- [ ] Configure ESLint and Prettier
- [ ] Set up environment variables structure
- [ ] Initialize Git repository and .gitignore
- [ ] Create basic project structure (folders)
- [ ] Install core dependencies (NextAuth, OpenAI SDK, Zod, etc.)

**Estimated Time**: 4-6 hours

---

## Phase 1: Authentication & User Management
**Goal**: Implement secure authentication with NextAuth

### Tasks
- [ ] Install NextAuth.js v5 and adapters
- [ ] Configure Prisma adapter for NextAuth
- [ ] Set up email provider (magic link authentication)
- [ ] Optional: Set up Google OAuth provider
- [ ] Create authentication pages:
  - [ ] `/login` - Login page with email input
  - [ ] `/verify` - Email verification pending page
- [ ] Configure NextAuth callbacks and session handling
- [ ] Create middleware for route protection
- [ ] Build user profile model in Prisma
- [ ] Test authentication flow end-to-end

**Acceptance Criteria**:
- Users can sign in via email magic link
- Protected routes redirect to login
- Session persists across page reloads
- User profile created on first login

**Estimated Time**: 8-10 hours

---

## Phase 2: Database Schema & Migrations
**Goal**: Implement complete database schema and run migrations

### Tasks
- [ ] Review and finalize Prisma schema (already created)
- [ ] Run initial Prisma migration
  ```bash
  npx prisma migrate dev --name init
  ```
- [ ] Generate Prisma Client
- [ ] Create database seeding script for development
- [ ] Test database connections
- [ ] Set up Prisma Studio for database management
- [ ] Create utility functions for common queries
- [ ] Set up database connection singleton

**Acceptance Criteria**:
- All tables created successfully
- Indexes applied correctly
- Relations working as expected
- Prisma Studio accessible

**Estimated Time**: 3-4 hours

---

## Phase 3: Core UI Components
**Goal**: Build reusable UI components with ShadCN

### Tasks
- [ ] Install ShadCN components:
  - [ ] Button, Input, Textarea
  - [ ] Card, Dialog, Sheet
  - [ ] Form components (Label, Select, Switch)
  - [ ] Toast notifications
  - [ ] Calendar, DatePicker
  - [ ] Tabs, Accordion
  - [ ] Avatar, Badge
  - [ ] Progress, Skeleton
- [ ] Create app layout structure:
  - [ ] Root layout with providers
  - [ ] Dashboard layout with navigation
  - [ ] Empty states components
- [ ] Build shared components:
  - [ ] Header/Navigation
  - [ ] Loading states
  - [ ] Error boundaries
  - [ ] Page containers
- [ ] Set up theme configuration (colors, fonts)
- [ ] Implement responsive design patterns

**Acceptance Criteria**:
- All ShadCN components installed and themed
- Navigation works across all pages
- Responsive design verified on mobile/tablet/desktop
- Loading and error states display correctly

**Estimated Time**: 6-8 hours

---

## Phase 4: Morning Pages Feature
**Goal**: Build the morning pages entry system with gating logic

### Tasks
- [ ] Create morning pages database service
- [ ] Build morning pages gate middleware logic
- [ ] Create `/morning-pages` route and page
- [ ] Build morning pages editor component:
  - [ ] Minimalist textarea with autosave
  - [ ] Word count display
  - [ ] Gentle prompt ("What's on your mind?")
- [ ] Build voice recorder component:
  - [ ] Integrate Web Speech API
  - [ ] Real-time transcription display
  - [ ] Voice/text toggle
- [ ] Implement completion logic:
  - [ ] Save entry to database
  - [ ] Mark as complete for the day
  - [ ] Unlock access to rest of app
- [ ] Create time-based bypass logic (after cutoff hour)
- [ ] Build completion state indicator
- [ ] Test gating across different times of day

**Acceptance Criteria**:
- Morning pages block access until completed (before cutoff)
- Voice-to-text works smoothly
- Entries save with proper date association
- One entry per day constraint enforced
- User redirected to dashboard after completion

**Estimated Time**: 10-12 hours

---

## Phase 5: Goal (Quest) System
**Goal**: Allow users to define and display their #1 life goal

### Tasks
- [ ] Create goal service functions
- [ ] Build onboarding flow for first-time users:
  - [ ] `/onboarding/setup-goal` page
  - [ ] Goal input form with validation
- [ ] Create `/quest` page for goal management:
  - [ ] Display current primary goal
  - [ ] Edit/update goal functionality
  - [ ] Goal history/timeline view
- [ ] Build goal display component (for dashboard)
- [ ] Implement goal reflection form
- [ ] Create alignment indicator component
- [ ] Add goal context to user session

**Acceptance Criteria**:
- New users prompted to set goal on first login
- Only one primary goal allowed at a time
- Goal visible throughout app (subtle presence)
- Goal can be updated with history preserved
- Alignment reflections can be logged

**Estimated Time**: 6-8 hours

---

## Phase 6: Journal System
**Goal**: Build full journal entry system with listing and creation

### Tasks
- [ ] Create journal service functions (CRUD)
- [ ] Build `/journal` page:
  - [ ] List view with infinite scroll or pagination
  - [ ] Filter by date, mood, tags
  - [ ] Search functionality
- [ ] Create `/journal/new` page:
  - [ ] Rich text editor (TipTap or simple textarea)
  - [ ] Mood selector component
  - [ ] Tag input component
  - [ ] Save as draft functionality
- [ ] Build `/journal/[id]` page:
  - [ ] Display entry with formatting
  - [ ] Edit functionality
  - [ ] Delete with confirmation
  - [ ] AI insights panel
- [ ] Create journal entry card component
- [ ] Implement autosave for entries
- [ ] Add word count tracker

**Acceptance Criteria**:
- Users can create, read, update, delete journal entries
- Entries properly associated with user and date
- Mood and tags captured correctly
- UI is minimalist and distraction-free
- Entries auto-save to prevent data loss

**Estimated Time**: 12-15 hours

---

## Phase 7: AI Analysis System
**Goal**: Integrate OpenAI for journal analysis and insights

### Tasks
- [ ] Set up OpenAI API client
- [ ] Create AI service functions:
  - [ ] `analyzeJournalEntry()` - Single entry analysis
  - [ ] `generateWeeklyInsights()` - Batch analysis
  - [ ] `detectPatterns()` - Pattern recognition
- [ ] Build API route for AI analysis
- [ ] Create cron job for batch analysis:
  - [ ] `/api/cron/analyze-entries`
  - [ ] Schedule in vercel.json
- [ ] Build AI insights components:
  - [ ] Insights panel (sidebar or modal)
  - [ ] Mood trend chart
  - [ ] Theme cloud/list
  - [ ] Encouragement display
- [ ] Implement streaming for real-time analysis
- [ ] Add loading states for AI operations
- [ ] Error handling for API failures
- [ ] Token usage tracking and cost management

**Acceptance Criteria**:
- Journal entries analyzed for mood and themes
- AI insights displayed in readable format
- Cron job runs daily for batch analysis
- User's primary goal included in analysis context
- Graceful degradation if API fails

**Estimated Time**: 10-12 hours

---

## Phase 8: Habit Tracking System
**Goal**: Build habit definition and logging system

### Tasks
- [ ] Create habit service functions
- [ ] Build `/habits` page:
  - [ ] List of active habits
  - [ ] Add new habit form
  - [ ] Positive/negative habit toggle
  - [ ] Habit archive functionality
- [ ] Create habit logging interface:
  - [ ] Daily checkbox/counter for each habit
  - [ ] Quick log from dashboard
  - [ ] Undo/edit log functionality
- [ ] Implement streak calculation utility
- [ ] Build habit visualization components:
  - [ ] Calendar heatmap (like GitHub contributions)
  - [ ] Streak display
  - [ ] Progress charts
- [ ] Create habit detail view:
  - [ ] Individual habit page with analytics
  - [ ] Edit habit settings
  - [ ] View log history
- [ ] Implement habit reminders (in-app)

**Acceptance Criteria**:
- Users can create positive and negative habits
- Daily logging works smoothly
- Streaks calculated accurately
- Visual progress indicators motivating and clear
- One log per habit per day enforced

**Estimated Time**: 12-14 hours

---

## Phase 9: Moodboard System
**Goal**: Build image upload and moodboard visualization

### Tasks
- [ ] Set up Vercel Blob storage
- [ ] Create moodboard service functions
- [ ] Build image upload component:
  - [ ] Drag-and-drop interface
  - [ ] File validation (type, size)
  - [ ] Upload progress indicator
  - [ ] Generate thumbnails
- [ ] Create `/moodboard` page:
  - [ ] Grid view of images
  - [ ] Image reordering (drag to reorder)
  - [ ] Image detail modal
  - [ ] Delete functionality
- [ ] Build moodboard display modes:
  - [ ] Grid view (masonry layout)
  - [ ] Slideshow mode
  - [ ] Ambient background option
- [ ] Add tagging/categorization for images
- [ ] Implement lazy loading for performance
- [ ] Add image optimization pipeline

**Acceptance Criteria**:
- Images upload successfully to blob storage
- Moodboard displays user's vision beautifully
- Images can be reordered and organized
- Performance remains smooth with many images
- Images properly associated with user

**Estimated Time**: 10-12 hours

---

## Phase 10: Breathwork System
**Goal**: Build guided breathing sessions with timers

### Tasks
- [ ] Create breathwork service functions
- [ ] Build `/breathwork` page:
  - [ ] Session type selector (box breathing, 4-7-8, custom)
  - [ ] Duration selector
  - [ ] Pre-session mood input
- [ ] Create breathing timer component:
  - [ ] Animated circle that expands/contracts
  - [ ] Text instructions (Inhale/Hold/Exhale)
  - [ ] Sound cues (optional)
  - [ ] Pause/resume functionality
- [ ] Build session tracking:
  - [ ] Post-session mood input
  - [ ] Session completion logging
  - [ ] Session history view
- [ ] Create breathwork analytics:
  - [ ] Total sessions completed
  - [ ] Average session length
  - [ ] Mood impact analysis
- [ ] Add preset breathing patterns:
  - [ ] Box breathing (4-4-4-4)
  - [ ] 4-7-8 technique
  - [ ] Custom timer

**Acceptance Criteria**:
- Breathing animations smooth and calming
- Timer accurate and reliable
- Sessions logged with pre/post mood
- Multiple breathing patterns available
- Interface minimalist and distraction-free

**Estimated Time**: 8-10 hours

---

## Phase 11: Dashboard & Home
**Goal**: Build main dashboard aggregating all features

### Tasks
- [ ] Create `/dashboard` page as main hub
- [ ] Build dashboard widgets:
  - [ ] Morning pages completion status
  - [ ] Current goal display
  - [ ] Recent journal entries
  - [ ] Habit quick-log
  - [ ] Moodboard preview
  - [ ] AI insights summary
  - [ ] Breathwork session count
- [ ] Implement dashboard layout (grid or flex)
- [ ] Add quick actions for each feature
- [ ] Create daily snapshot view:
  - [ ] What's completed today
  - [ ] Streaks and progress
  - [ ] Mood trend
- [ ] Build welcome message/greeting
- [ ] Add motivational quote or insight of the day

**Acceptance Criteria**:
- Dashboard provides complete overview at a glance
- Quick access to all major features
- Responsive and performs well
- Personalized to user's data and goal
- Feels calming and inspiring

**Estimated Time**: 8-10 hours

---

## Phase 12: Notifications System
**Goal**: Implement gentle reminder system

### Tasks
- [ ] Set up web push notifications:
  - [ ] Request permission UI
  - [ ] Service worker for push
  - [ ] Push subscription management
- [ ] Create notification service functions
- [ ] Build notification preferences page:
  - [ ] Toggle for each notification type
  - [ ] Time selection for reminders
  - [ ] Frequency settings
- [ ] Implement notification triggers:
  - [ ] Morning pages reminder (cron job)
  - [ ] Habit check-in reminder
  - [ ] New AI insight available
- [ ] Create in-app notification center:
  - [ ] List of recent notifications
  - [ ] Mark as read functionality
  - [ ] Action buttons to navigate
- [ ] Add email notifications (optional):
  - [ ] Weekly summary email
  - [ ] Milestone achievements

**Acceptance Criteria**:
- Push notifications work reliably
- Notification tone is inviting, not demanding
- Users can easily customize preferences
- Notifications drive engagement without annoyance

**Estimated Time**: 8-10 hours

---

## Phase 13: Settings & Preferences
**Goal**: Build comprehensive user settings

### Tasks
- [ ] Create `/settings` page with tabs/sections:
  - [ ] Profile settings
  - [ ] Morning pages preferences
  - [ ] Notification preferences
  - [ ] AI analysis settings
  - [ ] Privacy & data
  - [ ] Account management
- [ ] Implement preference updates:
  - [ ] Form validation with Zod
  - [ ] Server actions for updates
  - [ ] Success/error feedback
- [ ] Build account management:
  - [ ] Change email
  - [ ] Delete account (with confirmation)
  - [ ] Export data
- [ ] Add theme toggle (light/dark mode)
- [ ] Create data export functionality
- [ ] Implement session management UI

**Acceptance Criteria**:
- All user preferences editable
- Changes persist across sessions
- Export generates complete user data
- Account deletion works safely
- Settings organized and easy to navigate

**Estimated Time**: 6-8 hours

---

## Phase 14: Polish & UX Refinement
**Goal**: Enhance user experience with animations and polish

### Tasks
- [ ] Add page transitions (Framer Motion or CSS)
- [ ] Implement loading skeletons for all async data
- [ ] Add empty state illustrations/messages
- [ ] Create onboarding tour (first login)
- [ ] Add keyboard shortcuts for power users
- [ ] Implement undo/redo for key actions
- [ ] Add success animations (micro-interactions)
- [ ] Optimize font loading and rendering
- [ ] Add accessibility improvements:
  - [ ] ARIA labels
  - [ ] Keyboard navigation
  - [ ] Screen reader support
- [ ] Conduct UX testing with team
- [ ] Gather feedback and iterate

**Acceptance Criteria**:
- App feels smooth and responsive
- All interactions have appropriate feedback
- Empty states guide users helpfully
- Keyboard navigation works throughout
- Accessibility score high (Lighthouse)

**Estimated Time**: 8-10 hours

---

## Phase 15: Testing & Quality Assurance
**Goal**: Comprehensive testing across all features

### Tasks
- [ ] Write unit tests:
  - [ ] Utility functions (streak, date helpers)
  - [ ] Validators (Zod schemas)
- [ ] Write integration tests:
  - [ ] API routes
  - [ ] Server actions
  - [ ] Database operations
- [ ] Conduct manual testing:
  - [ ] All user flows end-to-end
  - [ ] Edge cases and error scenarios
  - [ ] Cross-browser testing
  - [ ] Mobile responsiveness
- [ ] Performance testing:
  - [ ] Lighthouse audits
  - [ ] Load testing for AI endpoints
- [ ] Security review:
  - [ ] Authentication flows
  - [ ] Data privacy
  - [ ] Input sanitization
- [ ] Fix all critical and high-priority bugs

**Acceptance Criteria**:
- All critical user flows work flawlessly
- No data loss or corruption bugs
- Performance scores meet targets
- Security vulnerabilities addressed
- Tests provide good coverage

**Estimated Time**: 10-12 hours

---

## Phase 16: Deployment & Production Setup
**Goal**: Deploy to production and configure services

### Tasks
- [ ] Set up production database (Vercel Postgres/Supabase)
- [ ] Configure production environment variables
- [ ] Set up Vercel project and connect repo
- [ ] Run database migrations in production
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate
- [ ] Configure cron jobs in Vercel
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics (Vercel Analytics)
- [ ] Set up monitoring and alerts
- [ ] Create deployment documentation
- [ ] Perform smoke tests in production
- [ ] Set up staging environment

**Acceptance Criteria**:
- App deployed and accessible via URL
- All features working in production
- Cron jobs running on schedule
- Error tracking capturing issues
- Analytics collecting data

**Estimated Time**: 6-8 hours

---

## Phase 17: Documentation & Handoff
**Goal**: Complete all project documentation

### Tasks
- [ ] Update README.md with:
  - [ ] Project overview
  - [ ] Setup instructions
  - [ ] Development workflow
  - [ ] Deployment guide
- [ ] Complete dev_log.md with implementation notes
- [ ] Finalize architecture.md
- [ ] Update technical.md with any changes
- [ ] Create user guide/help documentation
- [ ] Document API endpoints (if applicable)
- [ ] Create troubleshooting guide
- [ ] Add code comments for complex logic
- [ ] Record demo video (optional)

**Acceptance Criteria**:
- All documentation complete and accurate
- New developers can set up project from docs
- Common issues documented with solutions
- Code is well-commented

**Estimated Time**: 4-6 hours

---

## Summary

**Total Estimated Time**: 155-195 hours (~4-5 weeks for 1 developer)

### Recommended Development Order:
1. **Week 1**: Phases 0-2 (Setup, Auth, Database)
2. **Week 2**: Phases 3-5 (UI, Morning Pages, Goal)
3. **Week 3**: Phases 6-8 (Journal, AI, Habits)
4. **Week 4**: Phases 9-11 (Moodboard, Breathwork, Dashboard)
5. **Week 5**: Phases 12-17 (Notifications, Settings, Polish, Deploy)

### Critical Path:
Phase 0 → Phase 1 → Phase 2 → Phase 4 (Morning Pages) → Phase 5 (Goal) → Phase 6 (Journal) → Phase 11 (Dashboard)

### Parallel Development Opportunities:
- Phases 7-10 (AI, Habits, Moodboard, Breathwork) can be developed somewhat independently
- Phase 3 (UI Components) can be done alongside other phases as needed
- Phase 12 (Notifications) can be added after core features

### Optional/Future Enhancements:
- Mobile app development
- Advanced AI features (fine-tuning, more sophisticated analysis)
- Social features (team journals, shared goals)
- Integrations (calendar, health apps)
- Gamification elements
- Export to PDF reports

