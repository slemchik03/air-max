"use server";

import prisma from "@/utils/prisma";

export async function searchGoodItems(search: string, limit: number = 10) {
  const goodListResponse = await prisma.goodItem.findMany({
    where: {
      title: {
        startsWith: search,
      },
    },
  });
  return goodListResponse.slice(0, limit) || [];
}

export async function searchFilteredGoodItems(params: {
  [k: string]: string[] | string;
}) {
  const limit = params["limit"];
  const search = params["search"] as string;
  const sortBy = Array.isArray(params["sortBy"])
    ? <"asc"|"desc">params["sortBy"][0]
    : <"asc"|"desc">params["sortBy"];
  const availibleCategories = params["availibleCategories"] as string[];
  const priceConstraints = params["priceConstraints"] as string[];

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
              in: availibleCategories,
            },
          }
        : undefined,
    },
    take: 10,
  });
  const count = await prisma.goodItem.count();
  return data || [];
}
