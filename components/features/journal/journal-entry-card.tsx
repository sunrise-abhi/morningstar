import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { formatDateTime } from "@/lib/utils/date"
import { truncate } from "@/lib/utils/text"
import { getMoodEmoji } from "@/lib/utils/mood"

interface JournalEntry {
  id: string
  title: string | null
  content: string
  mood: string | null
  createdAt: Date
  wordCount: number
}

export function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  return (
    <Link href={`/journal/${entry.id}`}>
      <Card className="hover:bg-accent transition-colors cursor-pointer">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg">
              {entry.title || "Untitled Entry"}
            </h3>
            {entry.mood && (
              <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
            )}
          </div>
          <p className="text-muted-foreground mb-3">
            {truncate(entry.content, 200)}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{formatDateTime(entry.createdAt)}</span>
            <span>{entry.wordCount} words</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

