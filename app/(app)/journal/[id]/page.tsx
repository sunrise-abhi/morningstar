import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { getJournalEntry } from "@/lib/services/journal.service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDateTime } from "@/lib/utils/date"
import { getMoodEmoji } from "@/lib/utils/mood"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function JournalEntryPage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const { id } = await params
  const entry = await getJournalEntry(id)

  if (!entry || entry.userId !== session.user.id) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/journal">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Journal
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">
                  {entry.title || "Untitled Entry"}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{formatDateTime(entry.createdAt)}</span>
                  <span>{entry.wordCount} words</span>
                  {entry.mood && (
                    <span className="flex items-center gap-1">
                      {getMoodEmoji(entry.mood)} {entry.mood}
                    </span>
                  )}
                </div>
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary rounded-md text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/journal/${entry.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-neutral max-w-none">
              <div className="whitespace-pre-wrap">{entry.content}</div>
            </div>

            {entry.aiAnalysis && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
                <div className="space-y-4">
                  {entry.aiAnalysis.detectedMood && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Detected Mood
                      </h4>
                      <p className="flex items-center gap-2">
                        {getMoodEmoji(entry.aiAnalysis.detectedMood)}
                        {entry.aiAnalysis.detectedMood}
                      </p>
                    </div>
                  )}

                  {entry.aiAnalysis.themes && entry.aiAnalysis.themes.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Themes
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {entry.aiAnalysis.themes.map((theme) => (
                          <span
                            key={theme}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.aiAnalysis.observations && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Observations
                      </h4>
                      <p className="text-sm">{entry.aiAnalysis.observations}</p>
                    </div>
                  )}

                  {entry.aiAnalysis.encouragement && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm text-blue-900 mb-1">
                        Encouragement
                      </h4>
                      <p className="text-sm text-blue-800">
                        {entry.aiAnalysis.encouragement}
                      </p>
                    </div>
                  )}

                  {entry.aiAnalysis.goalAlignment !== null && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">
                        Goal Alignment
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{
                              width: `${(entry.aiAnalysis.goalAlignment || 0) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round((entry.aiAnalysis.goalAlignment || 0) * 100)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

