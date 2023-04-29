import exclude from "@/utils/exclude";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const params = new URL(request.url);
  const slug = params.searchParams.get("slug");
  if (slug) {
    const response = (await prisma.goodItem.findUnique({
      where: { slug },
    }))!;

    return NextResponse.json(exclude(response, ["createdAt", "updatedAt"]));
  }
  return NextResponse.json({ ok: false }, { status: 404 });
}
