import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/app/lib/Prisma';

export async function GET(request: NextRequest){
  prisma.$connect
  console.log("GET /company")

  const data = await prisma.company.findMany({})

  prisma.$disconnect

  return NextResponse.json(
    { message: data},
    { status: 200}
  )
}

export async function POST(request: NextRequest){
  console.log("POST /company")
  prisma.$connect
  const req = await request.json();

  try {
    await prisma.company.create({
      data: {
        company_code: require('crypto').randomBytes(200).toString('base64').replace(/[\/\+\=]/g,'').substring(0,8),
        company_name: req.company_name
      }
    })
  } catch (err) {
    console.error(err)
    prisma.$disconnect
    return NextResponse.json({ data: err })
  }

  prisma.$disconnect

  return NextResponse.json(
    { data: "Company was created!",req },
    { status: 200 },
  )
}