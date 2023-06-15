import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");

  const data = await prisma.goodItem.findMany({
    include: { category: true },
    orderBy: {
      price: !search ? "desc" : undefined,
    },

    where: {
      title: {
        /*         search: search ? `"${search}"` : undefined, */
        startsWith: search || undefined,
      },
    },
    take: Number(limit) ?? 100,
  });
  console.log(data[0]);

  const count = await prisma.goodItem.count();
  return NextResponse.json({ data, count });
}
