import db from '@repo/db/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { userSchema } from './types'
import { AuthOptions, User } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Phone number',
      credentials: {
        phone: {
          label: 'Phone number',
          type: 'text',
          placeholder: '1231231231',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Do zod validation, OTP validation here
        console.log(credentials)

        const { success, data } = userSchema.safeParse(credentials)
        if (!success) {
          throw new Error('Incorrect credentials')
        }
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const existingUser = await db.user.findFirst({
          where: {
            number: data.phone,
          },
        })

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            data.password,
            existingUser.password
          )
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
            }
          }
        } else {
          const user = await db.user.create({
            data: {
              number: data.phone,
              password: hashedPassword,
            },
          })

          return {
            id: user.id.toString(),
            name: user.name,
          }
        }

        return null
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ token, session }) {
      session.user.id = token.sub
      return session
    },
  },
}
