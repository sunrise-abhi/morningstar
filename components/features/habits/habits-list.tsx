"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface Habit {
  id: string
  name: string
  description: string | null
  type: string
  isActive: boolean
}

export function HabitsList({ habits }: { habits: Habit[] }) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [type, setType] = useState<"positive" | "negative">("positive")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type }),
      })

      if (response.ok) {
        setName("")
        setShowForm(false)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to create habit:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {!showForm && (
        <Button onClick={() => setShowForm(true)}>Add New Habit</Button>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Habit Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Morning meditation"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={type === "positive" ? "default" : "outline"}
                    onClick={() => setType("positive")}
                  >
                    Positive
                  </Button>
                  <Button
                    type="button"
                    variant={type === "negative" ? "default" : "outline"}
                    onClick={() => setType("negative")}
                  >
                    Negative
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Habit"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {habits.map((habit) => (
          <Card key={habit.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{habit.name}</h3>
                  {habit.description && (
                    <p className="text-sm text-muted-foreground">
                      {habit.description}
                    </p>
                  )}
                </div>
                <Badge
                  variant={habit.type === "positive" ? "default" : "destructive"}
                >
                  {habit.type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}

        {habits.length === 0 && !showForm && (
          <p className="text-center text-muted-foreground py-8">
            No habits yet. Create your first one!
          </p>
        )}
      </div>
    </div>
  )
}

