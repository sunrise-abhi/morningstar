import { MOODS } from "@/lib/constants"

export type Mood = (typeof MOODS)[number]

export function getMoodEmoji(mood: string): string {
  const moodMap: Record<string, string> = {
    happy: "😊",
    motivated: "💪",
    calm: "😌",
    grateful: "🙏",
    excited: "🎉",
    neutral: "😐",
    anxious: "😰",
    sad: "😢",
    frustrated: "😤",
    tired: "😴",
  }

  return moodMap[mood.toLowerCase()] ?? "😐"
}

export function getMoodColor(mood: string): string {
  const colorMap: Record<string, string> = {
    happy: "text-yellow-500",
    motivated: "text-orange-500",
    calm: "text-blue-400",
    grateful: "text-purple-500",
    excited: "text-pink-500",
    neutral: "text-gray-500",
    anxious: "text-yellow-600",
    sad: "text-blue-600",
    frustrated: "text-red-500",
    tired: "text-slate-500",
  }

  return colorMap[mood.toLowerCase()] ?? "text-gray-500"
}

export function getMoodScore(mood: string): number {
  const scoreMap: Record<string, number> = {
    happy: 1,
    motivated: 0.9,
    calm: 0.7,
    grateful: 0.8,
    excited: 0.9,
    neutral: 0,
    anxious: -0.4,
    sad: -0.7,
    frustrated: -0.5,
    tired: -0.3,
  }

  return scoreMap[mood.toLowerCase()] ?? 0
}

