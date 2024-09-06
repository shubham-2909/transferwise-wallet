'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import prisma from '@repo/db/client'

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error('Unauthoriized')
  }
  const token = Math.random().toString()
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(session.user.id),
      token,
      amount,
      status: 'Processing',
      startTime: new Date(),
      provider,
    },
  })

  return {
    message: 'On ramp transaction added',
  }
}
