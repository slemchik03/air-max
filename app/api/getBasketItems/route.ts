import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const  url = new URL(request.url);
  const data = await prisma.basket.findFirst({
    where: { userId: url.searchParams.get("userId")! },
    include: { basketItems: {include: {item: true}} },
  });
  if (data){
    return NextResponse.json(data);
  }
  return NextResponse.json({ok: false});
}
