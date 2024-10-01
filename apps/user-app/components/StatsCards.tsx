import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { Card } from '@repo/ui/currency-card'
import CountUp from 'react-countup'
import { ReactNode } from 'react'
type Props = {
  currentBalance: number
  totalSent: number
  totalReceived: number
  totalWithDrawn: number
}

export function StatsCards({
  currentBalance,
  totalSent,
  totalReceived,
  totalWithDrawn,
}: Props) {
  return (
    <div className='relative flex w-full flex-wrap gap-2 lg:flex-nowrap justify-center items-center'>
      <StatCard
        value={totalReceived}
        title='Money Received'
        icon={
          <TrendingUp className='h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10' />
        }
      />
      <StatCard
        title={'Money Sent'}
        value={totalSent}
        icon={
          <TrendingDown className='h-12 w-12 items-center rounded-lg p-2 text-rose-500 bg-red-400/10' />
        }
      />
      <StatCard
        title='Balance'
        value={currentBalance}
        icon={
          <Wallet className='h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10' />
        }
      />
      <StatCard
        title='Balance'
        value={currentBalance}
        icon={
          <Wallet className='h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10' />
        }
      />
    </div>
  )
}

function StatCard({
  value,
  title,
  icon,
}: {
  icon: ReactNode
  title: String
  value: number
}) {
  return (
    <Card className='flex h-24 w-full items-center gap-2 p-4'>
      {icon}
      <div className='flex flex-col items-start gap-0'>
        <p className='text-muted-foreground'>{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          className='text-2xl'
        />
      </div>
    </Card>
  )
}
