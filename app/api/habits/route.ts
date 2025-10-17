import { auth } from "@/lib/auth"
import { createHabit, getUserHabits } from "@/lib/services/habits.service"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, description, type, frequency, target, unit, color, icon } =
      await request.json()

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    if (!type || !["positive", "negative"].includes(type)) {
      return NextResponse.json(
        { error: "Type must be positive or negative" },
        { status: 400 }
      )
    }

    const habit = await createHabit(session.user.id, {
      name,
      description,
      type,
      frequency,
      target,
      unit,
      color,
      icon,
    })

    return NextResponse.json({ success: true, habit })
  } catch (error) {
    console.error("Error creating habit:", error)
    return NextResponse.json(
      { error: "Failed to create habit" },
      { status: 500 }
    )
  }
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const habits = await getUserHabits(session.user.id)
    return NextResponse.json({ habits })
  } catch (error) {
    console.error("Error fetching habits:", error)
    return NextResponse.json(
      { error: "Failed to fetch habits" },
      { status: 500 }
    )
  }
}

