import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const sortBy = <"asc" | "desc">searchParams.get("sortBy");
  const availibleCategories = searchParams.get("availibleCategories");
  const priceConstraints = searchParams.get("priceConstraints")?.split(",");

  const data = await prisma.goodItem.findMany({
    include: { category: true },
    orderBy: {
      price: sortBy ? sortBy : "desc",
    },

    where: {
      price: priceConstraints
        ? {
          gte: +priceConstraints[0],
          lte: +priceConstraints[1],
        }
        : undefined,
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
