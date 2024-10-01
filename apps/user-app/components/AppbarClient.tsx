'use client'
import { Appbar } from '@repo/ui/appbar'
import { signOut, useSession } from 'next-auth/react'

export function AppbarClient() {
  const session = useSession()
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
