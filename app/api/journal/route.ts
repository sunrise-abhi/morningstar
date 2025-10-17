import { auth } from "@/lib/auth"
import { createJournalEntry } from "@/lib/services/journal.service"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, content, mood, tags, isPrivate } = await request.json()

    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }

    const entry = await createJournalEntry(session.user.id, {
      title,
      content,
      mood,
      tags,
      isPrivate,
    })

    return NextResponse.json({ success: true, entry })
  } catch (error) {
    console.error("Error creating journal entry:", error)
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    )
  }
}

