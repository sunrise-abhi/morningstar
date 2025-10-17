import { auth } from "@/lib/auth"
import { createOrUpdateUserPreferences } from "@/lib/services/user.service"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    const preferences = await createOrUpdateUserPreferences(
      session.user.id,
      data
    )

    return NextResponse.json({ success: true, preferences })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    )
  }
}

