import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserPreferences } from "@/lib/services/user.service"
import { SettingsForm } from "@/components/features/settings/settings-form"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const preferences = await getUserPreferences(session.user.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">
          Customize your Morningstar experience
        </p>

        <SettingsForm preferences={preferences} />
      </div>
    </div>
  )
}

