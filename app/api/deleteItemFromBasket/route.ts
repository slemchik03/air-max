import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { basketItemId, userId } = await request.json();

  if (basketItemId && userId) {
    const basketItem = await prisma.basketItem.findFirst({
      where: { id: basketItemId },
    });
    if (basketItem && basketItem.count > 1) {
      await prisma.basketItem.update({
        where: { id: basketItemId },
        data: { count: basketItem.count - 1 },
      });
    } else {
      await prisma.basketItem.delete({
        where: { id: basketItemId },
      });
    }
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false }, { status: 404 });
}
