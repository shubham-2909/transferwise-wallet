import { Overview } from '@/components/Overview'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import prisma from '@repo/db/client'
async function getUserData(userId: number) {
  const [currentBalance, totalSent, totalReceived, totalWithdrawn] =
    await Promise.all([
      prisma.balance.findUnique({
        where: {
          userId: userId,
        },
        select: {
          amount: true,
        },
      }),
      prisma.p2pTransfer.aggregate({
        where: {
          fromUserId: userId,
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.p2pTransfer.aggregate({
        where: {
          toUserId: userId,
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.onRampTransaction.aggregate({
        where: {
          userId: userId,
          status: 'Success',
        },
        _sum: {
          amount: true,
        },
      }),
    ])
  const responseData = {
    currentBalance: currentBalance?.amount ?? 0,
    totalSent: totalSent._sum.amount ?? 0,
    totalReceived: totalReceived._sum.amount ?? 0,
    totalWithdrawn: totalWithdrawn._sum.amount ?? 0,
  }
  return responseData
}

export default async function () {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw Error('Unauthorized mothafuckaaa')
  }

  const userId = parseInt(session.user.id!)
  const userData = await getUserData(userId)

  return (
    <div className='border-b container'>
      <div className='flex flex-wrap items-center justify-between gap-6 py-8'>
        <p className='font-bold text-3xl'>Hello {session.user.name} 👋</p>
        <div className='flex items-center gap-3'>
          <Link
            href={`/transfer`}
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border shadow-sm h-9 px-4 py-2 text-white border-emerald-500 bg-emerald-950 hover:bg-emerald-700 hover:text-white'
            type='button'
            aria-haspopup='dialog'
            aria-expanded='false'
            aria-controls='radix-:Rcpujt6ja:'
            data-state='closed'
          >
            Withdraw Money
          </Link>
          <Link
            href={`/p2p`}
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border shadow-sm h-9 px-4 py-2 text-white hover:text-white bg-rose-950 border-rose-500 hover:bg-rose-700'
            type='button'
            aria-haspopup='dialog'
            aria-expanded='false'
            aria-controls='radix-:Rkpujt6ja:'
            data-state='closed'
          >
            Transfer Money
          </Link>
        </div>
      </div>
      <Overview
        totalReceived={userData.totalReceived}
        totalSent={userData.totalSent}
        totalWithDrawn={userData.totalWithdrawn}
        currentBalance={userData.currentBalance}
      />
    </div>
  )
}
