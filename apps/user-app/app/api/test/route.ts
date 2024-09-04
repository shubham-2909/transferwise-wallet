import prisma from '@repo/db/client'
export const GET = async () => {
  const user = await prisma.user.findFirst({
    where: {
      email: 'sg234@gmail.com',
    },
  })
  return Response.json(user)
}
