import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserHabits } from "@/lib/services/habits.service"
import { Button } from "@/components/ui/button"
import { HabitsList } from "@/components/features/habits/habits-list"

export default async function HabitsPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const habits = await getUserHabits(session.user.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Habits</h1>
            <p className="text-muted-foreground">Track your daily progress</p>
          </div>
        </div>

        <HabitsList habits={habits} />
      </div>
    </div>
  )
}

