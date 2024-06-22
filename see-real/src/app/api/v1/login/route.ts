import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
  const body = await request.json();

  try {
    prisma.$connect();
    const user = await prisma.user.findUnique({
      where:{
        email: body.email
      }
    });

    if(!user){
      return NextResponse.json({message:"ユーザーが存在しません",flag:false})
    }
    if(user.hashed_password !== )
  }
}