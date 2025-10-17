"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BREATHWORK_TYPES } from "@/lib/constants"

export function BreathworkSelector({ userId }: { userId: string }) {
  function startSession(type: string) {
    // In a full implementation, this would open a modal with the breathing animation
    alert(`Starting ${type} session...`)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(BREATHWORK_TYPES).map(([key, value]) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle>{value.name}</CardTitle>
            <CardDescription>{value.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Pattern: {value.pattern.join("-")} seconds
            </p>
            <Button onClick={() => startSession(key)} className="w-full">
              Start Session
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

