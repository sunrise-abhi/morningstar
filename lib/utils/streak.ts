import { isSameDay, startOfDay, subDays } from "date-fns"

interface LogEntry {
  date: Date | string
  completed: boolean
}

export function calculateStreak(logs: LogEntry[]): {
  currentStreak: number
  longestStreak: number
  lastLoggedDate: Date | null
} {
  if (logs.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastLoggedDate: null }
  }

  // Sort logs by date descending
  const sortedLogs = logs
    .filter((log) => log.completed)
    .map((log) => ({
      date: startOfDay(typeof log.date === "string" ? new Date(log.date) : log.date),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  if (sortedLogs.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastLoggedDate: null }
  }

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  let expectedDate = startOfDay(new Date())

  for (const log of sortedLogs) {
    const logDate = log.date

    if (isSameDay(logDate, expectedDate) || isSameDay(logDate, subDays(expectedDate, 1))) {
      tempStreak++
      
      if (isSameDay(logDate, expectedDate) || isSameDay(logDate, subDays(new Date(), 0))) {
        currentStreak = tempStreak
      }
      
      expectedDate = subDays(logDate, 1)
    } else {
      tempStreak = 1
      expectedDate = subDays(logDate, 1)
    }

    longestStreak = Math.max(longestStreak, tempStreak)
  }

  return {
    currentStreak,
    longestStreak,
    lastLoggedDate: sortedLogs[0].date,
  }
}

export function isStreakActive(lastLoggedDate: Date | null): boolean {
  if (!lastLoggedDate) return false
  
  const today = startOfDay(new Date())
  const lastLogged = startOfDay(lastLoggedDate)
  const yesterday = subDays(today, 1)

  return isSameDay(lastLogged, today) || isSameDay(lastLogged, yesterday)
}

