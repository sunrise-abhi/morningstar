import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Goal {
  id: string
  title: string
  description: string | null
}

export function GoalDisplay({ goal }: { goal: Goal }) {
  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🎯</span>
          <span>Your Quest</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
        {goal.description && (
          <p className="text-muted-foreground">{goal.description}</p>
        )}
      </CardContent>
    </Card>
  )
}

