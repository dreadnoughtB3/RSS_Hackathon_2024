import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/lib/Prisma';
import { checkPost } from "@/app/lib/checkPost";

export async function GET(request: NextRequest){
  prisma.$connect
  console.log("GET /post")

  const data = await prisma.post.findMany({})

  prisma.$disconnect

  return NextResponse.json(
    { message: data},
    { status: 200}
  )
}

export async function POST(request: NextRequest){
  console.log("POST /post")
  prisma.$connect
  const req = await request.json();

  try {
    const post_data = await prisma.post.create({
      data: {
        user_id: req.user_id,
        body: req.body,
      }
    })

    checkPost(post_data)
  } catch (err) {
    console.error(err)
    prisma.$disconnect
    return NextResponse.json({ data: err })
  }

  prisma.$disconnect

  return NextResponse.json(
    { data: "Post was created!",req },
    { status: 200 },
  )
}