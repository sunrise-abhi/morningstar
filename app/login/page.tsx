import { Metadata } from "next"
import { LoginForm } from "@/components/features/auth/login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Morningstar account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">⭐</h1>
          <h2 className="text-3xl font-semibold mb-2">Morningstar</h2>
          <p className="text-muted-foreground">
            Your minimalist productivity companion
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

