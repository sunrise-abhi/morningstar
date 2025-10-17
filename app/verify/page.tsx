import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Check Your Email",
  description: "Verify your email to sign in",
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="text-4xl mb-4 text-center">📧</div>
          <CardTitle className="text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            A sign-in link has been sent to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>Click the link in your email to sign in to your account.</p>
          <p className="mt-4">
            You can close this window once you've clicked the link.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

