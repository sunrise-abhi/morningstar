import { db } from "@/lib/db"
import { subDays, startOfDay } from "date-fns"

export async function createBreathworkSession(
  userId: string,
  data: {
    type: string
    durationSeconds: number
    targetDuration?: number
    completed?: boolean
    notes?: string
    moodBefore?: string
    moodAfter?: string
  }
) {
  return db.breathworkSession.create({
    data: {
      userId,
      ...data,
    },
  })
}

export async function getUserBreathworkSessions(
  userId: string,
  days: number = 30
) {
  const startDate = subDays(new Date(), days)

  return db.breathworkSession.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getBreathworkStats(userId: string) {
  const sessions = await db.breathworkSession.findMany({
    where: { userId },
  })

  const totalSessions = sessions.length
  const totalMinutes = Math.floor(
    sessions.reduce((sum, s) => sum + s.durationSeconds, 0) / 60
  )

  const today = startOfDay(new Date())
  const todaySessions = sessions.filter(
    (s) => startOfDay(s.createdAt).getTime() === today.getTime()
  )

  return {
    totalSessions,
    totalMinutes,
    todaySessions: todaySessions.length,
    averageSessionLength: totalSessions > 0
      ? Math.floor(totalMinutes / totalSessions)
      : 0,
  }
}

