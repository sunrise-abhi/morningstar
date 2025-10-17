import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { BreathworkSelector } from "@/components/features/breathwork/breathwork-selector"
import { getBreathworkStats } from "@/lib/services/breathwork.service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function BreathworkPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const stats = await getBreathworkStats(session.user.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Breathwork</h1>
        <p className="text-muted-foreground mb-8">
          Take a moment to center yourself
        </p>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalSessions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Minutes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalMinutes}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.todaySessions}</p>
            </CardContent>
          </Card>
        </div>

        <BreathworkSelector userId={session.user.id} />
      </div>
    </div>
  )
}

