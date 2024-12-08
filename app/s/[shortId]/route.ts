import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import prisma from "@/lib/prisma";

type Params = Promise<{ shortId: string }>;

export async function GET(req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;

  const shortId = params.shortId;

  try {
    const shortUrl = await prisma.url.findUnique({
      where: { shortId },
    });

    if (shortUrl) {
      try {
        const response = await fetch(shortUrl.originalUrl);

        const contentType = response.headers.get("content-type");

        const body = await response.text();

        return new NextResponse(body, {
          headers: {
            "Content-Type": contentType || "text/html",
          },
        });
      } catch (fetchError) {
        return NextResponse.json(
          { error: "Error fetching the original URL" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }
  } catch (dbError) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
