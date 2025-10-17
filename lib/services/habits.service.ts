import { db } from "@/lib/db"
import { startOfDay, subDays } from "date-fns"
import { calculateStreak } from "@/lib/utils/streak"

export async function createHabit(
  userId: string,
  data: {
    name: string
    description?: string
    type: "positive" | "negative"
    frequency?: string
    target?: number
    unit?: string
    color?: string
    icon?: string
  }
) {
  return db.habit.create({
    data: {
      userId,
      ...data,
    },
  })
}

export async function updateHabit(
  habitId: string,
  data: Partial<{
    name: string
    description: string
    frequency: string
    target: number
    unit: string
    color: string
    icon: string
    isActive: boolean
  }>
) {
  return db.habit.update({
    where: { id: habitId },
    data,
  })
}

export async function archiveHabit(habitId: string) {
  return db.habit.update({
    where: { id: habitId },
    data: {
      isActive: false,
      archivedAt: new Date(),
    },
  })
}

export async function getUserHabits(userId: string, includeArchived: boolean = false) {
  return db.habit.findMany({
    where: {
      userId,
      isActive: includeArchived ? undefined : true,
    },
    orderBy: { createdAt: "asc" },
  })
}

export async function logHabit(
  habitId: string,
  userId: string,
  data: {
    date?: Date
    completed: boolean
    count?: number
    notes?: string
  }
) {
  const logDate = startOfDay(data.date ?? new Date())

  return db.habitLog.upsert({
    where: {
      habitId_date: {
        habitId,
        date: logDate,
      },
    },
    create: {
      habitId,
      userId,
      date: logDate,
      completed: data.completed,
      count: data.count ?? 1,
      notes: data.notes,
    },
    update: {
      completed: data.completed,
      count: data.count ?? 1,
      notes: data.notes,
    },
  })
}

export async function getHabitLogs(
  habitId: string,
  days: number = 30
) {
  const startDate = subDays(startOfDay(new Date()), days)

  return db.habitLog.findMany({
    where: {
      habitId,
      date: {
        gte: startDate,
      },
    },
    orderBy: { date: "desc" },
  })
}

export async function getHabitStreak(habitId: string) {
  const logs = await db.habitLog.findMany({
    where: {
      habitId,
      completed: true,
    },
    orderBy: { date: "desc" },
    take: 365, // Get up to a year of logs for streak calculation
  })

  return calculateStreak(logs)
}

export async function getTodaysHabitLogs(userId: string) {
  const today = startOfDay(new Date())

  return db.habitLog.findMany({
    where: {
      userId,
      date: today,
    },
    include: {
      habit: true,
    },
  })
}

