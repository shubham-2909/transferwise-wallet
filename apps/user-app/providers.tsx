'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
type Props = {
  children: React.ReactNode
}
export function Providers({ children }: Props) {
  return (
    <RecoilRoot>
      <SessionProvider>{children}</SessionProvider>
    </RecoilRoot>
  )
}
