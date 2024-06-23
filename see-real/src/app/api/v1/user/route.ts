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

  try {
    prisma.$connect
    const req = await request.json();

    const company = await prisma.company.findUnique({
      where:{
        company_code: req.company_code
      }
    });
    console.log("get company id")
    if (!company) {
      return NextResponse.json(
        { message:"企業コードが存在しません" },
        { statusText:"Failed" },
      )
    }
    console.log("company id find")
    try {
      await prisma.user.create({
        data: {
          name: req.name,
          email: req.email,
          company_id: company.id,
          hashed_password: crypto.createHash('sha256').update(req.password).digest('hex')
        }
      })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ data: err }, { statusText: "Failed" })
    }

    return NextResponse.json(
      { data: req },
      { statusText: "Success" },
    )
  } finally {
    await prisma.$disconnect
  }
}