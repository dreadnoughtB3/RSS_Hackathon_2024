import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/lib/Prisma';

export async function GET(request: NextRequest){
  prisma.$connect
  console.log("GET /problem")

  const data = await prisma.problem.findMany({})

  prisma.$disconnect

  return NextResponse.json(
    { message: data},
    { status: 200}
  )
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