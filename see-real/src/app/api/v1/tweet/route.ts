import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest): NextResponse {
  console.log("GET /tweet")

  return NextResponse.json(
    { message: 'GET /tweet'},
    { status: 200}
  )
}

export function POST(request: NextRequest): NextResponse {
  console.log("GET /tweet")

  return NextResponse.json(
    { message: 'GET /tweet'},
    { status: 200}
  )
}