import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: "test@morningstar.app" },
    update: {},
    create: {
      email: "test@morningstar.app",
      name: "Test User",
      emailVerified: new Date(),
    },
  })

  console.log("✅ Created test user:", testUser.email)

  // Create user preferences
  await prisma.userPreferences.upsert({
    where: { userId: testUser.id },
    update: {},
    create: {
      userId: testUser.id,
      morningPagesCutoffTime: 12,
      enableVoiceInput: true,
      notificationsEnabled: true,
      aiAnalysisEnabled: true,
    },
  })

  console.log("✅ Created user preferences")

  // Create a sample goal
  const goal = await prisma.goal.upsert({
    where: { 
      id: `${testUser.id}-primary-goal`,
    },
    update: {},
    create: {
      id: `${testUser.id}-primary-goal`,
      userId: testUser.id,
      title: "Build a successful startup that helps people live intentionally",
      description: "Create a product that helps people align their daily actions with their long-term goals and values. Focus on meaningful productivity over busyness.",
      isPrimary: true,
      status: "active",
    },
  })

  console.log("✅ Created primary goal")

  // Create a sample morning page
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const morningPage = await prisma.morningPage.upsert({
    where: {
      userId_date: {
        userId: testUser.id,
        date: today,
      },
    },
    update: {},
    create: {
      userId: testUser.id,
      date: today,
      content: `Good morning! Today I'm feeling motivated and ready to work on my goals. I've been thinking a lot about what really matters and I'm excited to make progress on building something meaningful.

I want to focus on being present and intentional with my time today. No distractions, just deep work on the things that align with my vision.

Let's make today count!`,
      wordCount: 68,
      isVoiceEntry: false,
    },
  })

  console.log("✅ Created sample morning page")

  // Create sample journal entries
  const journalEntry1 = await prisma.journalEntry.create({
    data: {
      userId: testUser.id,
      title: "Reflections on Progress",
      content: `Today was a good day. I made significant progress on the project and I'm feeling aligned with my goals. The morning pages practice is really helping me stay focused and intentional.

I notice that when I start the day with clear intentions, I'm much more productive and satisfied with my work. This is exactly the kind of life I want to build - one where I'm conscious of my choices and aligned with my values.

Tomorrow I want to dive deeper into the habit tracking feature and make sure it's really helping people build positive routines.`,
      mood: "motivated",
      tags: ["progress", "alignment", "productivity"],
      wordCount: 103,
      date: today,
    },
  })

  console.log("✅ Created sample journal entry")

  // Create sample habits
  const habit1 = await prisma.habit.create({
    data: {
      userId: testUser.id,
      name: "Morning meditation",
      description: "10 minutes of mindfulness meditation",
      type: "positive",
      frequency: "daily",
      color: "#8B5CF6",
      icon: "brain",
      isActive: true,
    },
  })

  const habit2 = await prisma.habit.create({
    data: {
      userId: testUser.id,
      name: "Exercise",
      description: "30 minutes of physical activity",
      type: "positive",
      frequency: "daily",
      color: "#10B981",
      icon: "dumbbell",
      isActive: true,
    },
  })

  const habit3 = await prisma.habit.create({
    data: {
      userId: testUser.id,
      name: "Check social media",
      description: "Mindless scrolling",
      type: "negative",
      frequency: "daily",
      color: "#EF4444",
      icon: "smartphone",
      isActive: true,
    },
  })

  console.log("✅ Created sample habits")

  // Create habit logs for today
  await prisma.habitLog.create({
    data: {
      habitId: habit1.id,
      userId: testUser.id,
      date: today,
      completed: true,
      count: 1,
    },
  })

  await prisma.habitLog.create({
    data: {
      habitId: habit2.id,
      userId: testUser.id,
      date: today,
      completed: true,
      count: 1,
    },
  })

  console.log("✅ Created habit logs")

  // Create a breathwork session
  await prisma.breathworkSession.create({
    data: {
      userId: testUser.id,
      type: "box_breathing",
      durationSeconds: 300, // 5 minutes
      targetDuration: 300,
      completed: true,
      moodBefore: "anxious",
      moodAfter: "calm",
      notes: "Felt much more centered after this session",
    },
  })

  console.log("✅ Created breathwork session")

  console.log("\n🎉 Database seeding completed!")
  console.log("\n📝 Test Account:")
  console.log("   Email: test@morningstar.app")
  console.log("   Password: password (or any password)")
  console.log("\n✨ You can now sign in and explore the app!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

