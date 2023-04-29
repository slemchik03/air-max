import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url);
  const categoryId = params.searchParams.get("categoryId")!;
  const currentItemId = params.searchParams.get("currentItemId")!;
  if (categoryId && currentItemId) {
    const response = (await prisma.goodItem.findMany({
      where: { categoryId, id: { not: currentItemId } },
      select: {
        title: true,
        image: true,
        id: true,
        sizes: true,
        price: true,
        slug: true,
        category: true,
      },
    }))!;
    return NextResponse.json(response);
  }
  return NextResponse.json({ ok: false }, { status: 404 });
}
