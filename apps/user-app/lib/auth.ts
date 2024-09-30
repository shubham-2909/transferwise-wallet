import db from '@repo/db/client'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { userSchema } from './types'
import { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Phone number',
      credentials: {
        phone: {
          label: 'phone',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { success, data } = userSchema.safeParse(credentials)
        if (!success) {
          throw new Error('Incorrect credentials')
        }

        // Find the user by phone number
        const existingUser = await db.user.findFirst({
          where: {
            number: data.phone,
          },
        })

        if (existingUser) {
          // Compare the provided password with the stored hashed password
          const passwordValidation = await bcrypt.compare(
            data.password,
            existingUser.password
          )
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
            }
          } else {
            throw new Error('Invalid password')
          }
        } else {
          // If the user doesn't exist, create a new user with a hashed password
          const hashedPassword = await bcrypt.hash(data.password, 10)

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
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
}
