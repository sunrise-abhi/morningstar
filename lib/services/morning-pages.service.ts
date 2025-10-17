import { db } from "@/lib/db"
import { startOfDay } from "date-fns"
import { DEFAULT_MORNING_PAGES_CUTOFF } from "@/lib/constants"

export async function checkMorningPagesAccess(userId: string): Promise<{
  hasAccess: boolean
  reason: string
  morningPage?: any
}> {
  const today = startOfDay(new Date())
  const currentHour = new Date().getHours()

  // Get user's cutoff time preference
  const prefs = await db.userPreferences.findUnique({
    where: { userId },
    select: { morningPagesCutoffTime: true },
  })

  const cutoffHour = prefs?.morningPagesCutoffTime ?? DEFAULT_MORNING_PAGES_CUTOFF

  // After cutoff time, grant access
  if (currentHour >= cutoffHour) {
    return {
      hasAccess: true,
      reason: "after_cutoff",
    }
  }

  // Check if morning pages completed today
  const morningPage = await db.morningPage.findUnique({
    where: {
      userId_date: {
        userId,
        date: today,
      },
    },
  })

  if (morningPage) {
    return {
      hasAccess: true,
      reason: "completed",
      morningPage,
    }
  }

  return {
    hasAccess: false,
    reason: "not_completed",
  }
}

export async function createMorningPage(
  userId: string,
  content: string,
  isVoiceEntry: boolean = false,
  audioUrl?: string
) {
  const today = startOfDay(new Date())
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  return db.morningPage.create({
    data: {
      userId,
      content,
      wordCount,
      date: today,
      isVoiceEntry,
      audioUrl,
      completedAt: new Date(),
    },
  })
}

export async function getTodaysMorningPage(userId: string) {
  const today = startOfDay(new Date())

  return db.morningPage.findUnique({
    where: {
      userId_date: {
        userId,
        date: today,
      },
    },
  })
}

export async function getRecentMorningPages(userId: string, limit: number = 7) {
  return db.morningPage.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    take: limit,
  })
}

