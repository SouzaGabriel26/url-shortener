import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shortUrl: string }> }
) {
  const { shortUrl } = await params;

  const shortUrlExists = await prismaClient.urls.findUnique({
    where: {
      shortUrl,
    },
  });

  if (!shortUrlExists) {
    return NextResponse.json({ message: "Does not exists" }, { status: 400 });
  }

  return NextResponse.json(
    { longUrl: shortUrlExists.longUrl },
    { status: 201 }
  );
}
