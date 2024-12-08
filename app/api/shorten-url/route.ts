import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure prisma is set up properly
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function POST(request: Request) {
  const { originalUrl } = await request.json();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  if (!originalUrl) {
    return NextResponse.json({ error: "Original URL is required" }, { status: 400 });
  }

  try {
    // Check if URL already exists
    const existingUrl = await prisma.url.findFirst({
      where: { originalUrl },
    });

    if (existingUrl) {
      return NextResponse.json({ shortUrl: existingUrl.shortUrl });
    }

    // Generate a shortId for the URL
    const shortId = Math.random().toString(36).substring(2, 8); 
    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/s/${shortId}`;

    // Save to the database
    const newUrl = await prisma.url.create({
      data: {
        originalUrl,
        shortUrl,
        shortId,
      userId:session.user.id,
        
      },
    });

    return NextResponse.json({ shortUrl: newUrl.shortUrl });
  } catch (error) {
    return NextResponse.json({ error: "Error shortening URL" }, { status: 500 });
  }
}
