import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const select = searchParams.get("select");
  const selectParams = select
    ? select.split(",").reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {} as { [key: string]: boolean })
    : {};
  const requestParams: { [key: string]: any } = {
    take: Number(limit) ?? 100,
  };
  select && (requestParams.select = { ...selectParams});
  const data = await prisma.goodItem.findMany({
    select: { category: true, ...requestParams.select },
  });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json()

  if (typeof body === "object") {
    const result = await prisma.goodItem.create({
      data: body
    })

    return NextResponse.json(result)
  }

  return NextResponse.json({ok: false})
}