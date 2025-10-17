import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AppNav } from "@/components/shared/app-nav"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen">
      <AppNav user={session.user} />
      <main>{children}</main>
    </div>
  )
}

