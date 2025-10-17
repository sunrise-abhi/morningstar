"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { countWords } from "@/lib/utils/text"

export function MorningPagesEditor({ userId }: { userId: string }) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const wordCount = countWords(content)

  async function handleSubmit() {
    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/morning-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })

      if (response.ok) {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to save morning pages:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.trim()) {
        localStorage.setItem("morningPagesDraft", content)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [content])

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("morningPagesDraft")
    if (draft) {
      setContent(draft)
    }
  }, [])

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Morning Pages</CardTitle>
        <CardDescription>
          Let your thoughts flow freely. No judgment, no editing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="min-h-[400px] text-base resize-none"
          autoFocus
        />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {wordCount} words
          </span>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            size="lg"
          >
            {isSubmitting ? "Saving..." : "Complete & Continue"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Your morning pages are auto-saved as you write
        </p>
      </CardContent>
    </Card>
  )
}

