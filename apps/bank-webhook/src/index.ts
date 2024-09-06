import express from 'express'
import db from '@repo/db/client'
const app = express()

app.post('/hdfcWebhook', async (req, res) => {
  //TODO Add zod validation here?
  //TODO Check this request if it actually came from hdfc bank apis using secret key
  const paymentInformation: { token: string; userId: string; amount: string } =
    {
      token: req.body.token,
      userId: req.body.user_identifier,
      amount: req.body.amount,
    }
  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: 'Success',
        },
      }),
    ])

    res.json({
      message: 'Captured',
    })
  } catch (error) {
    console.error(error)
    res.status(411).json({
      message: 'Internal server error in processing webhook',
    })
  }
})

app.listen(3003)
