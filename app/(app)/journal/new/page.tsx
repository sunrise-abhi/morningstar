import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { JournalEditor } from "@/components/features/journal/journal-editor"

export default async function NewJournalPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <JournalEditor userId={session.user.id} />
      </div>
    </div>
  )
}

