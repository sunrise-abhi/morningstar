import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getPrimaryGoal, getUserGoals } from "@/lib/services/goal.service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GoalDisplay } from "@/components/features/quest/goal-display"

export default async function QuestPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const [primaryGoal, allGoals] = await Promise.all([
    getPrimaryGoal(session.user.id),
    getUserGoals(session.user.id),
  ])

  if (!primaryGoal) {
    redirect("/onboarding/setup-goal")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Your Quest</h1>
        <p className="text-muted-foreground mb-8">
          Your #1 life goal guides everything
        </p>

        <div className="space-y-6">
          <GoalDisplay goal={primaryGoal} />

          {allGoals.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Other Goals</CardTitle>
                <CardDescription>
                  Goals you&apos;re tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {allGoals
                    .filter((g) => !g.isPrimary)
                    .map((goal) => (
                      <div
                        key={goal.id}
                        className="p-4 border rounded-lg"
                      >
                        <h3 className="font-medium">{goal.title}</h3>
                        {goal.description && (
                          <p className="text-sm text-muted-foreground">
                            {goal.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

