import { db } from "@/lib/db"
import { startOfDay } from "date-fns"

export async function createJournalEntry(
  userId: string,
  data: {
    title?: string
    content: string
    mood?: string
    tags?: string[]
    isPrivate?: boolean
  }
) {
  const wordCount = data.content.trim().split(/\s+/).filter(Boolean).length

  return db.journalEntry.create({
    data: {
      userId,
      title: data.title,
      content: data.content,
      wordCount,
      mood: data.mood,
      tags: data.tags ?? [],
      isPrivate: data.isPrivate ?? false,
      date: startOfDay(new Date()),
    },
  })
}

export async function updateJournalEntry(
  entryId: string,
  data: {
    title?: string
    content?: string
    mood?: string
    tags?: string[]
    isPrivate?: boolean
  }
) {
  const updateData: any = { ...data }
  
  if (data.content) {
    updateData.wordCount = data.content.trim().split(/\s+/).filter(Boolean).length
  }

  return db.journalEntry.update({
    where: { id: entryId },
    data: updateData,
  })
}

export async function deleteJournalEntry(entryId: string) {
  return db.journalEntry.delete({
    where: { id: entryId },
  })
}

export async function getJournalEntry(entryId: string) {
  return db.journalEntry.findUnique({
    where: { id: entryId },
    include: {
      aiAnalysis: true,
    },
  })
}

export async function getUserJournalEntries(
  userId: string,
  options?: {
    limit?: number
    offset?: number
    mood?: string
    tags?: string[]
  }
) {
  const where: any = { userId }

  if (options?.mood) {
    where.mood = options.mood
  }

  if (options?.tags && options.tags.length > 0) {
    where.tags = {
      hasSome: options.tags,
    }
  }

  return db.journalEntry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: options?.limit,
    skip: options?.offset,
    include: {
      aiAnalysis: true,
    },
  })
}

export async function getJournalEntryCount(userId: string) {
  return db.journalEntry.count({
    where: { userId },
  })
}

