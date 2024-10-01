import prisma from '@repo/db/client'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id)

  try {
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
