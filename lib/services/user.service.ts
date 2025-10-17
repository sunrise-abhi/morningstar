import { db } from "@/lib/db"

export async function getUserProfile(userId: string) {
  return db.userProfile.findUnique({
    where: { userId },
  })
}

export async function createOrUpdateUserProfile(
  userId: string,
  data: {
    bio?: string
    timezone?: string
  }
) {
  return db.userProfile.upsert({
    where: { userId },
    create: {
      userId,
      ...data,
    },
    update: data,
  })
}

export async function getUserPreferences(userId: string) {
  return db.userPreferences.findUnique({
    where: { userId },
  })
}

export async function createOrUpdateUserPreferences(
  userId: string,
  data: Partial<{
    morningPagesCutoffTime: number
    enableVoiceInput: boolean
    notificationsEnabled: boolean
    morningPagesReminder: boolean
    morningPagesReminderTime: string
    habitReminders: boolean
    habitRemindersTime: string
    emailNotifications: boolean
    aiAnalysisEnabled: boolean
    aiAnalysisFrequency: string
    theme: string
    showMoodboardBackground: boolean
  }>
) {
  return db.userPreferences.upsert({
    where: { userId },
    create: {
      userId,
      ...data,
    },
    update: data,
  })
}

export async function initializeNewUser(userId: string) {
  // Create default preferences for new users
  await db.userPreferences.create({
    data: {
      userId,
    },
  })

  return true
}

