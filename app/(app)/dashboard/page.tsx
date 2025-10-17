import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getPrimaryGoal } from "@/lib/services/goal.service"
import { getTodaysMorningPage } from "@/lib/services/morning-pages.service"
import { getUserJournalEntries } from "@/lib/services/journal.service"
import { getUserHabits, getTodaysHabitLogs } from "@/lib/services/habits.service"
import { GoalDisplay } from "@/components/features/quest/goal-display"
import { DashboardStats } from "@/components/features/dashboard/dashboard-stats"
import { RecentEntries } from "@/components/features/journal/recent-entries"
import { HabitQuickLog } from "@/components/features/habits/habit-quick-log"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const [goal, morningPage, recentEntries, habits, todayLogs] = await Promise.all([
    getPrimaryGoal(session.user.id),
    getTodaysMorningPage(session.user.id),
    getUserJournalEntries(session.user.id, { limit: 3 }),
    getUserHabits(session.user.id),
    getTodaysHabitLogs(session.user.id),
  ])

  if (!goal) {
    redirect("/onboarding/setup-goal")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session.user.name || "friend"} 👋
          </h1>
          <p className="text-muted-foreground">
            {morningPage
              ? "You've completed your morning pages today"
              : "Ready to continue your journey"}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <DashboardStats
            morningPagesComplete={!!morningPage}
            journalEntriesCount={recentEntries.length}
            habitsLoggedToday={todayLogs.length}
            totalHabits={habits.length}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <GoalDisplay goal={goal} />
            {recentEntries.length > 0 && <RecentEntries entries={recentEntries} />}
          </div>

          <div className="space-y-6">
            {habits.length > 0 && (
              <HabitQuickLog habits={habits} todayLogs={todayLogs} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

