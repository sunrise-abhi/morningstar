export const APP_NAME = "Morningstar"
export const APP_DESCRIPTION = "Your minimalist productivity and self-reflection companion"

export const DEFAULT_MORNING_PAGES_CUTOFF = 12 // 12 PM

export const MOODS = [
  "happy",
  "motivated",
  "calm",
  "grateful",
  "excited",
  "neutral",
  "anxious",
  "sad",
  "frustrated",
  "tired",
] as const

export const HABIT_TYPES = ["positive", "negative"] as const

export const BREATHWORK_TYPES = {
  box_breathing: {
    name: "Box Breathing",
    description: "4-4-4-4 breathing pattern",
    pattern: [4, 4, 4, 4], // inhale, hold, exhale, hold
  },
  "4_7_8": {
    name: "4-7-8 Breathing",
    description: "Relaxing breath technique",
    pattern: [4, 7, 8, 0], // inhale, hold, exhale, no hold
  },
  custom: {
    name: "Custom",
    description: "Set your own timing",
    pattern: [4, 4, 4, 4],
  },
} as const

export const AI_ANALYSIS_FREQUENCY = {
  daily: "Daily",
  weekly: "Weekly",
  manual: "Manual only",
} as const

export const NOTIFICATION_TYPES = {
  morning_pages_reminder: "Morning Pages Reminder",
  habit_reminder: "Habit Check-in",
  insight: "New Insight Available",
  milestone: "Milestone Achieved",
} as const

