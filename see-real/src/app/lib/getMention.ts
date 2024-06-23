import { prisma } from '@/app/lib/Prisma';

export const getMention = async (): Promise<void> => {

  prisma.$connect

  const mentions = await prisma.problem.findMany({
    where: { 
      related_user: {
        has: localStorage.getItem("user_id")
      }
    },
    select: {
      created_at: true,
      post_id: true,
      user_id: true,
      id: true,
    },
  })


  try {
    localStorage.setItem("mentions",JSON.stringify(mentions))

  } catch (e) {

  }
  finally {
      prisma.$disconnect
  }
}