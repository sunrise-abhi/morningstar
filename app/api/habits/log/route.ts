import { auth } from "@/lib/auth"
import { logHabit } from "@/lib/services/habits.service"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { habitId, completed, count, notes } = await request.json()

    if (!habitId) {
      return NextResponse.json(
        { error: "Habit ID is required" },
        { status: 400 }
      )
    }

    const log = await logHabit(habitId, session.user.id, {
      completed: completed ?? true,
      count,
      notes,
    })

    return NextResponse.json({ success: true, log })
  } catch (error) {
    console.error("Error logging habit:", error)
    return NextResponse.json(
      { error: "Failed to log habit" },
      { status: 500 }
    )
  }
}

