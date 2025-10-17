import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getPrimaryGoal } from "@/lib/services/goal.service"
import { GoalSetupForm } from "@/components/features/quest/goal-setup-form"

export default async function SetupGoalPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const existingGoal = await getPrimaryGoal(session.user.id)

  if (existingGoal) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🎯 Your Quest</h1>
          <p className="text-lg text-muted-foreground">
            What's your #1 life goal? This will guide your journey.
          </p>
        </div>
        <GoalSetupForm userId={session.user.id} />
      </div>
    </div>
  )
}

