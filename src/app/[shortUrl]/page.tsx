import { prismaClient } from "@/lib/prismaClient";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    shortUrl: string;
  }>
}

export default async function Page({ params }: Props) {
  const { shortUrl } = await params


  if (shortUrl) {
    const response = await fetch(`http://localhost:3000/api/${shortUrl}`);

    const responseBody = await response.json();

    const shortUrlExists = await prismaClient.urls.findUnique({
      where: {
        shortUrl
      }
    });

    if (shortUrlExists) {
      await prismaClient.urls.update({
        where: {
          shortUrl
        },
        data: {
          visitsCount: shortUrlExists.visitsCount + 1
        }
      })
    }

    redirect(responseBody.longUrl);
  }

  if (!shortUrl) return (
    <div>
      Unexistent Url
    </div>
  )
}