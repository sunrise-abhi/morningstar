"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { MOODS } from "@/lib/constants"
import { getMoodEmoji } from "@/lib/utils/mood"
import { countWords } from "@/lib/utils/text"

export function JournalEditor({
  userId,
  initialData,
}: {
  userId: string
  initialData?: {
    id: string
    title: string | null
    content: string
    mood: string | null
  }
}) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [mood, setMood] = useState(initialData?.mood || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const wordCount = countWords(content)

  async function handleSubmit() {
    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch(
        initialData ? `/api/journal/${initialData.id}` : "/api/journal",
        {
          method: initialData ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, mood: mood || null }),
        }
      )

      if (response.ok) {
        router.push("/journal")
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to save entry:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">
          {initialData ? "Edit Entry" : "New Journal Entry"}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title (Optional)</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mood">How are you feeling?</Label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <Button
                key={m}
                type="button"
                variant={mood === m ? "default" : "outline"}
                size="sm"
                onClick={() => setMood(m)}
              >
                {getMoodEmoji(m)} {m}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Your thoughts</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            className="min-h-[400px] text-base"
            autoFocus
          />
          <p className="text-sm text-muted-foreground">{wordCount} words</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={!content.trim() || isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Entry"}
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

