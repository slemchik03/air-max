import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { basketId, userId } = await request.json();

  if (basketId && userId) {
    const basket = await prisma.basket.findUnique({ where: { userId } });
    if (basket) {
      const basketItems = await prisma.basketItem.deleteMany({
        where: { basketId },
      });
      return NextResponse.json({ ok: true });
    }
  }
  return NextResponse.json({ ok: false }, { status: 404 });
}
