import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

interface DashboardStatsProps {
  morningPagesComplete: boolean
  journalEntriesCount: number
  habitsLoggedToday: number
  totalHabits: number
}

export function DashboardStats({
  morningPagesComplete,
  journalEntriesCount,
  habitsLoggedToday,
  totalHabits,
}: DashboardStatsProps) {
  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Morning Pages</p>
              <p className="text-2xl font-bold">
                {morningPagesComplete ? "Complete" : "Pending"}
              </p>
            </div>
            {morningPagesComplete ? (
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            ) : (
              <Circle className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div>
            <p className="text-sm text-muted-foreground">Journal Entries</p>
            <p className="text-2xl font-bold">{journalEntriesCount}</p>
            <p className="text-xs text-muted-foreground">Recent</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div>
            <p className="text-sm text-muted-foreground">Habits Today</p>
            <p className="text-2xl font-bold">
              {habitsLoggedToday}/{totalHabits}
            </p>
            <p className="text-xs text-muted-foreground">Logged</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

