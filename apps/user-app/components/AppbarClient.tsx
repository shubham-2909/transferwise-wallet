'use client'
import { Appbar } from '@repo/ui/appbar'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function AppbarClient() {
  const session = useSession()
  const router = useRouter()
  return (
    <div>
      <Appbar
        user={session.data?.user}
        onSignout={async () => {
          await signOut({ callbackUrl: '/signin' })
        }}
      />
    </div>
  )
}
