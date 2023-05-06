import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const itemsId = searchParams.get("itemsId");
  const itemsIdArr = itemsId?.split(",");

  
  if (itemsIdArr) {
    const result = await Promise.all(
      itemsIdArr?.map(async (id) => {
        const data = prisma.goodItem.findUnique({
          where: {
            id,
          },
        });
        return data;
      })
    );
    return NextResponse.json(result);
  }

  return NextResponse.json({ ok: false });
}
