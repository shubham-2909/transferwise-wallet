'use client'
import { StatsCards } from './StatsCards'
type Props = {
  currentBalance: number
  totalSent: number
  totalReceived: number
  totalWithDrawn: number
}
export function Overview({
  currentBalance,
  totalSent,
  totalReceived,
  totalWithDrawn,
}: Props) {
  return (
    <>
      <div className='container flex flex-wrap justify-between items-end gap-2 py-6'>
        <h2 className='text-3xl font-bold'>Overview</h2>
      </div>
      <div className='container flex flex-col w-full gap-2'>
        <StatsCards
          currentBalance={currentBalance}
          totalReceived={totalReceived}
          totalSent={totalSent}
          totalWithDrawn={totalWithDrawn}
        />
      </div>
    </>
  )
}
