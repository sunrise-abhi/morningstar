import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function MoodboardPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Moodboard</h1>
            <p className="text-muted-foreground">
              Visualize your future self
            </p>
          </div>
          <Button>Upload Images</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">No images yet</p>
              <p className="text-sm">
                Upload images that represent your goals and aspirations
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

