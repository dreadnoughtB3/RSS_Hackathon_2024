import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/lib/Prisma';
const crypto = require('crypto');

export async function GET(request: NextRequest){
  prisma.$connect
  console.log("GET /user")

  const data = await prisma.user.findMany({})

  prisma.$disconnect

  return NextResponse.json(
    { message: data},
    { status: 200}
  )
}

export async function POST(request: NextRequest){
  console.log("POST /user")
  prisma.$connect
  const req = await request.json();

  try {
    await prisma.user.create({
      data: {
        name: req.name,
        email: req.email,
        hashed_password: crypto.createHash('sha256').update(req.pass).digest('hex')
      }
    })
  } catch (err) {
    console.error(err)
    prisma.$disconnect
    return NextResponse.json({ data: err })
  }

  prisma.$disconnect

  return NextResponse.json(
    { data: req },
    { status: 200 },
  )
}