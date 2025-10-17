import { db } from "@/lib/db"

export async function getPrimaryGoal(userId: string) {
  return db.goal.findFirst({
    where: {
      userId,
      isPrimary: true,
      status: "active",
    },
  })
}

export async function createGoal(
  userId: string,
  title: string,
  description?: string,
  isPrimary: boolean = false
) {
  // If setting as primary, unset other primary goals
  if (isPrimary) {
    await db.goal.updateMany({
      where: {
        userId,
        isPrimary: true,
      },
      data: {
        isPrimary: false,
      },
    })
  }

  return db.goal.create({
    data: {
      userId,
      title,
      description,
      isPrimary,
      status: "active",
    },
  })
}

export async function updateGoal(
  goalId: string,
  data: {
    title?: string
    description?: string
    status?: string
  }
) {
  return db.goal.update({
    where: { id: goalId },
    data,
  })
}

export async function getUserGoals(userId: string) {
  return db.goal.findMany({
    where: { userId },
    orderBy: [
      { isPrimary: "desc" },
      { createdAt: "desc" },
    ],
  })
}

export async function createGoalReflection(
  goalId: string,
  userId: string,
  reflectionText: string,
  alignmentScore?: number
) {
  return db.goalReflection.create({
    data: {
      goalId,
      userId,
      reflectionText,
      alignmentScore,
    },
  })
}

