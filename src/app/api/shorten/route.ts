import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { z } from "zod";

const schema = z.object({
  url: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsedInput = schema.safeParse(body);

  if (parsedInput.error) {
    return NextResponse.json(
      { message: "Zod validation error" },
      { status: 400 }
    );
  }

  const { data } = parsedInput;

  const hash = randomBytes(6).toString("hex");

  const isHashAlreadyCreated = await prismaClient.urls.findUnique({
    where: {
      shortUrl: hash,
    },
  });

  if (isHashAlreadyCreated) {
    return NextResponse.json(
      { message: "ShortUrl already stored." },
      { status: 400 }
    );
  }

  await prismaClient.urls.create({
    data: {
      longUrl: data.url,
      shortUrl: hash,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
