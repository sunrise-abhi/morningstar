import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDate } from "@/lib/utils/date"
import { truncate } from "@/lib/utils/text"
import { getMoodEmoji } from "@/lib/utils/mood"

interface JournalEntry {
  id: string
  title: string | null
  content: string
  mood: string | null
  createdAt: Date
}

export function RecentEntries({ entries }: { entries: JournalEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Journal Entries</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/journal">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.id}`}
              className="block p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">
                  {entry.title || "Untitled Entry"}
                </h4>
                {entry.mood && (
                  <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {truncate(entry.content, 150)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(entry.createdAt)}
              </p>
            </Link>
          ))}
          
          {entries.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No journal entries yet. Start writing to see them here.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

