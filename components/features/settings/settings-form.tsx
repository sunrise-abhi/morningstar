"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Preferences {
  morningPagesCutoffTime: number
  enableVoiceInput: boolean
  notificationsEnabled: boolean
  morningPagesReminder: boolean
  morningPagesReminderTime: string
  habitReminders: boolean
  habitRemindersTime: string
  emailNotifications: boolean
  aiAnalysisEnabled: boolean
  aiAnalysisFrequency: string
  theme: string
  showMoodboardBackground: boolean
}

export function SettingsForm({ preferences }: { preferences: Preferences | null }) {
  const [cutoffTime, setCutoffTime] = useState(
    preferences?.morningPagesCutoffTime ?? 12
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          morningPagesCutoffTime: cutoffTime,
        }),
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to update settings:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Morning Pages</CardTitle>
          <CardDescription>
            Configure when morning pages access is granted
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cutoff">
              Cutoff Time (hour of day in 24-hour format)
            </Label>
            <Input
              id="cutoff"
              type="number"
              min="0"
              max="23"
              value={cutoffTime}
              onChange={(e) => setCutoffTime(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              After this hour, you can access the app without completing morning
              pages
            </p>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  )
}

