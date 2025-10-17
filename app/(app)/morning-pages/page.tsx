import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getTodaysMorningPage } from "@/lib/services/morning-pages.service"
import { MorningPagesEditor } from "@/components/features/morning-pages/morning-pages-editor"

export default async function MorningPagesPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const existingPage = await getTodaysMorningPage(session.user.id)

  if (existingPage) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Good morning ☀️</h1>
          <p className="text-lg text-muted-foreground">
            What&apos;s on your mind today?
          </p>
        </div>
        <MorningPagesEditor userId={session.user.id} />
      </div>
    </div>
  )
}

