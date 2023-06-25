import { FilterItem } from "../../../utils/server/get/getFilters";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url);
  const search = params.searchParams.get("search");
  const categories = await prisma.category.findMany();

  const rangePrice = await prisma.goodItem.findMany({
    where: { title: { startsWith: search || undefined } },
    orderBy: { price: "desc" },
  });

  const filters: FilterItem[] = [
    {
      type: "checkbox",
      title: "Availible categories",
      paramName: "availibleCategories",
      values: [...categories.map((v) => v.title)],
    },
    {
      type: "radio",
      title: "Sort by price",
      paramName: "sortBy",
      values: ["desc", "asc"],
    },
    {
      type: "range",
      title: "Price constraints",
      paramName: "priceConstraints",
      values: [rangePrice.at(-1)?.price!, rangePrice[0].price],
    },
  ];

  return NextResponse.json({ data: filters }, { status: 200 });
}
