import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const select = searchParams.get("select");

  const data = await prisma.goodItem.findMany({
    include: { category: true },
    orderBy: {
      price: "desc",
    },
    take: Number(limit) ?? 100,
  });

  const count = await prisma.goodItem.count();
  return NextResponse.json({ data, count });
}
