"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Habit {
  id: string
  name: string
  type: string
}

interface HabitLog {
  habitId: string
  completed: boolean
}

export function HabitQuickLog({
  habits,
  todayLogs,
}: {
  habits: Habit[]
  todayLogs: HabitLog[]
}) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const isLogged = (habitId: string) => {
    return todayLogs.some((log) => log.habitId === habitId && log.completed)
  }

  async function toggleHabit(habitId: string, currentlyLogged: boolean) {
    setLoading(habitId)

    try {
      await fetch("/api/habits/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habitId,
          completed: !currentlyLogged,
        }),
      })

      router.refresh()
    } catch (error) {
      console.error("Failed to log habit:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {habits.map((habit) => {
            const logged = isLogged(habit.id)
            return (
              <Button
                key={habit.id}
                variant="outline"
                className="w-full justify-between"
                onClick={() => toggleHabit(habit.id, logged)}
                disabled={loading === habit.id}
              >
                <span>{habit.name}</span>
                {logged ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </Button>
            )
          })}

          {habits.length === 0 && (
            <p className="text-center text-muted-foreground py-4 text-sm">
              No habits yet. Create your first habit to start tracking.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

