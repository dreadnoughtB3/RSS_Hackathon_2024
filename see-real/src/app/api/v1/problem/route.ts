import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/lib/Prisma';

export async function GET(request: NextRequest){
  prisma.$connect
  console.log("GET /problem")
  const req = await request.json();

  try{
    if(req.type == "getMention") {
      const data = await prisma.problem.findMany({
        where: { 
          related_user: {
            has: req.user_id
          }
        },
        select: {
          created_at: true,
          post_id: true,
          user_id: true,
          id: true,
        },
      })
      return NextResponse.json(
        { data: data },
        { status: 200 },
      )
    }else{
      const data = await prisma.problem.findMany({})
      return NextResponse.json(
        { data: data },
        { status: 200 },
      )
    }
  }finally{
    prisma.$disconnect
  }


}

export async function POST(request: NextRequest){
  console.log("POST /problem")
  prisma.$connect
  const req = await request.json();

  try {
    await prisma.problem.create({
      data: {
        post_id: req.post_id,
        user_id: req.user_id,
        keywords: req.keywords,
      }
    })
  } catch (err) {
    console.error(err)
    prisma.$disconnect
    return NextResponse.json({ data: err })
  }

  prisma.$disconnect

  return NextResponse.json(
    { data: "Problem was created!",req },
    { status: 200 },
  )
}