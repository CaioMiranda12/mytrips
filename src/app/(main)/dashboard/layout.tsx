'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/app/shared/providers/AuthProvider'
import LoadingScreen from '@/app/shared/ui/loading/loadingScreen'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [loading, user, router])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
