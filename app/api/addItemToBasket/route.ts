import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId, userId } = await request.json();

  if (itemId && userId) {
    const currentBasket = await prisma.basket.findUnique({
      where: { userId },
    });
    if (currentBasket) {
      const currentBasketItem = await prisma.basketItem.findFirst({
        where: { basket: currentBasket, itemId },
      });
      if (currentBasketItem) {
        await prisma.basketItem.update({
          where: { id: currentBasketItem.id },
          data: { count: currentBasketItem.count + 1 },
        });
      } else {
        const basketItem = await prisma.basketItem.create({
            data: { basketId: currentBasket.userId, itemId, count: 1 },
          });
      }
    } else {
      const basket = await prisma.basket.create({ data: { userId } });
      const basketItem = await prisma.basketItem.create({
        data: { basketId: basket.userId, itemId, count: 1 },
      });
    }
    return NextResponse.json({ok: true});
  }
  return NextResponse.json({ ok: false }, { status: 404 });
}
