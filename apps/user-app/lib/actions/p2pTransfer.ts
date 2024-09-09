'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import prisma from '@repo/db/client'

export async function p2pTransfer(amount: number, to: string) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }
  const toUser = await prisma.user.findUnique({
    where: {
      number: to,
    },
  })
  if (!toUser) {
    return {
      message: 'User not found',
    }
  }
  await prisma.$transaction(async (tx) => {
    //TODO add more security so sql injection is avoided
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`
    const fromBalance = await tx.balance.findFirst({
      where: {
        userId: Number(session.user.id),
      },
    })
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error('Insufficient funds')
    }
    await tx.balance.update({
      where: { userId: Number(session.user.id) },
      data: {
        amount: {
          decrement: amount,
        },
      },
    })

    await tx.balance.update({
      where: { userId: toUser.id },
      data: {
        amount: {
          increment: amount,
        },
      },
    })

    await tx.p2pTransfer.create({
      data: {
        amount,
        fromUserId: Number(session.user.id),
        toUserId: toUser.id,
        timestamp: new Date(),
      },
    })
  })

  return {
    message: 'Transfer successfull',
    status: 200,
  }
}
