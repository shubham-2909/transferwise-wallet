'use client'
import React from 'react'
import { RecoilRoot } from 'recoil'
type Props = {
  children: React.ReactNode
}
export function Providers({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>
}
