import {
  startOfDay,
  endOfDay,
  format,
  isToday,
  isYesterday,
  isSameDay,
  subDays,
  addDays,
  differenceInDays,
} from "date-fns"

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  
  if (isToday(d)) return "Today"
  if (isYesterday(d)) return "Yesterday"
  
  return format(d, "MMM d, yyyy")
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return format(d, "h:mm a")
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return `${formatDate(d)} at ${formatTime(d)}`
}

export function getStartOfDay(date?: Date): Date {
  return startOfDay(date ?? new Date())
}

export function getEndOfDay(date?: Date): Date {
  return endOfDay(date ?? new Date())
}

export function getDaysAgo(days: number): Date {
  return subDays(new Date(), days)
}

export function getDaysFromNow(days: number): Date {
  return addDays(new Date(), days)
}

export function daysBetween(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === "string" ? new Date(date1) : date1
  const d2 = typeof date2 === "string" ? new Date(date2) : date2
  return differenceInDays(d1, d2)
}

export { startOfDay, endOfDay, isToday, isYesterday, isSameDay, subDays, addDays }

