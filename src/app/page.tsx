import { prismaClient } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function generateShortUrlAction(formData: FormData) {
  'use server'

  const url = formData.get('url');

  fetch('http://localhost:3000/api/shorten', {
    method: 'POST',
    body: JSON.stringify({ url })
  });

  return revalidatePath('/');
}


export default async function Home() {
  const urls = await prismaClient.urls.findMany();

  return (
    <main className="h-full grid place-items-center">
      <form className="bg-slate-200 rounded flex gap-2 p-10" action={generateShortUrlAction}>
        <input placeholder="type a long url" type="text" name="url" className="border" />

        <button type="submit" className="bg-green-400 rounded px-2">Register</button>
      </form>

      <div className="flex flex-col gap-3 bg-slate-200 p-4 rounded">
        {
          urls.length > 0 ? urls.map(({ longUrl, shortUrl, visitsCount }) => (
            <div key={shortUrl} className="border border-black rounded px-2 flex flex-col gap-2">
              <Link href={longUrl}>Long version: {longUrl}</Link>
              <Link href={`http://localhost:3000/${shortUrl}`}>Short version: {shortUrl}</Link>
              <p>Visits: {visitsCount}</p>
            </div>
          ))
            :

            <p>No urls created</p>
        }
      </div>
    </main>
  );
}
