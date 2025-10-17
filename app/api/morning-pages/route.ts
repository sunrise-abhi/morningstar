import { auth } from "@/lib/auth"
import { createMorningPage } from "@/lib/services/morning-pages.service"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { content, isVoiceEntry, audioUrl } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }

    const morningPage = await createMorningPage(
      session.user.id,
      content,
      isVoiceEntry,
      audioUrl
    )

    return NextResponse.json({ success: true, morningPage })
  } catch (error) {
    console.error("Error creating morning page:", error)
    return NextResponse.json(
      { error: "Failed to create morning page" },
      { status: 500 }
    )
  }
}

