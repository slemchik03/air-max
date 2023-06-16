import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const sortBy = <"asc" | "desc">searchParams.get("sortBy");
  const availibleCategories = searchParams.get("availibleCategories");

  const data = await prisma.goodItem.findMany({
    include: { category: true },
    orderBy: {
      price: sortBy ? sortBy : "desc",
    },

    where: {
      title: {
        startsWith: search || undefined,
      },
      category: availibleCategories
        ? {
          title: {
            in: availibleCategories?.split(","),
          },
        }
        : undefined,
    },
    take: Number(limit) ?? 100,
  });
  const count = await prisma.goodItem.count();
  return NextResponse.json({ data, count });
}
