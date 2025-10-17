import OpenAI from "openai"
import { db } from "@/lib/db"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
})

export async function analyzeJournalEntry(
  entryId: string,
  userId: string,
  userGoal?: string
) {
  // Skip if no API key
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OpenAI API key not configured")
    return null
  }

  const entry = await db.journalEntry.findUnique({
    where: { id: entryId },
  })

  if (!entry) {
    throw new Error("Journal entry not found")
  }

  const prompt = `
Analyze the following journal entry for a user whose primary life goal is: "${userGoal || "Not specified"}"

Journal Entry:
${entry.content}

Provide analysis in the following JSON format:
{
  "detectedMood": "primary emotion",
  "moodScore": -1 to 1,
  "themes": ["theme1", "theme2"],
  "sentiment": "positive/negative/neutral/mixed",
  "keyPhrases": ["phrase1", "phrase2"],
  "observations": "Brief observations about patterns or notable elements",
  "patterns": "Any recurring themes or patterns",
  "encouragement": "A brief, genuine encouraging message",
  "goalAlignment": 0 to 1 score
}
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI coach helping users reflect on their personal growth journey.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    })

    const result = JSON.parse(completion.choices[0].message.content ?? "{}")

    // Save analysis to database
    const analysis = await db.aIAnalysis.create({
      data: {
        journalEntryId: entry.id,
        userId: entry.userId,
        detectedMood: result.detectedMood,
        moodScore: result.moodScore,
        themes: result.themes,
        sentiment: result.sentiment,
        keyPhrases: result.keyPhrases,
        observations: result.observations,
        patterns: result.patterns,
        encouragement: result.encouragement,
        goalAlignment: result.goalAlignment,
        tokensUsed: completion.usage?.total_tokens,
      },
    })

    return analysis
  } catch (error) {
    console.error("AI analysis failed:", error)
    return null
  }
}

export async function getRecentInsights(userId: string, limit: number = 5) {
  return db.aIInsight.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  })
}

export async function createInsight(
  userId: string,
  data: {
    type: string
    title: string
    content: string
    priority?: number
    validUntil?: Date
    metadata?: any
  }
) {
  return db.aIInsight.create({
    data: {
      userId,
      ...data,
    },
  })
}

