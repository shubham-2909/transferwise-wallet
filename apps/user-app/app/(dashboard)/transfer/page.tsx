import { AddMoney } from '@/components/AddMoneyCard'
import { BalanceCard } from '@/components/BalanceCard'
import { OnRampTransactions } from '@/components/OnRampTransactions'
import { authOptions } from '@/lib/auth'
import prisma from '@repo/db/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function getBalance(userId: number) {
  const balance = await prisma.balance.findFirst({
    where: {
      userId,
    },
    select: {
      amount: true,
      locked: true,
    },
  })

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  }
}

async function getTransactions(userId: number) {
  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId,
    },
  })

  return transactions.map((tx) => ({
    amount: tx.amount,
    time: tx.startTime,
    status: tx.status,
    provider: tx.provider,
  }))
}
export default async function page() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/api/auth/signin')
  }

  const transactions = await getTransactions(Number(session.user.id))
  const balance = await getBalance(Number(session.user.id))

  return (
    <div className="w-screen">
      <h1 className="text-4xl text-[#6a51a6] pt-8 mb-8 font-semibold">
        Transfer
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}
