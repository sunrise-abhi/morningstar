import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserJournalEntries } from "@/lib/services/journal.service"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { JournalEntryCard } from "@/components/features/journal/journal-entry-card"

export default async function JournalPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const entries = await getUserJournalEntries(session.user.id, { limit: 20 })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Journal</h1>
            <p className="text-muted-foreground">Reflect on your journey</p>
          </div>
          <Button asChild>
            <Link href="/journal/new">New Entry</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {entries.map((entry) => (
            <JournalEntryCard key={entry.id} entry={entry} />
          ))}

          {entries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No journal entries yet
              </p>
              <Button asChild>
                <Link href="/journal/new">Write Your First Entry</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

