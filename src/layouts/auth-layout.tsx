import { type ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-6">
        {/* Logo Space */}
        <div className="h-20 flex items-center justify-center">
          <div className="text-2xl font-bold text-primary">WIM PERÚ</div>
        </div>
        {children}
      </div>
    </div>
  )
} 