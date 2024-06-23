import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";
const crypto = require('crypto');

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
    const sended_password = crypto.createHash('sha256').update(body.password).digest('hex')
    if(user.hashed_password !== sended_password){
      return NextResponse.json({message:"パスワードが間違っています",flag:false})
    }

    const secretkey = new TextEncoder().encode("rss2024-burend-swift");

    const payload = {
      email: body.email,
      username: user.name,
    }

    const token = await new SignJWT(payload).setProtectedHeader({alg:"HS256"})
    .setExpirationTime("1d")
    .sign(secretkey);
    // localStorage.setItem("user_id", user.id)
    return NextResponse.json({message: "ログイン成功", flag: true, TOKEN: token})
  } catch (error) {
    return NextResponse.json({message:"ログイン失敗", flg:false})
  } finally {
    await prisma.$disconnect();
  }
}