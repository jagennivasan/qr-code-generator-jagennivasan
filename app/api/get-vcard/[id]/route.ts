import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Params = Promise<{ id: string }>;

export async function GET(req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const id = params.id;

  try {
    const user = await prisma.userData.findUnique({
      where: {
        id: Number(id),
        
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userResponse = {
      ...user,
      profileImage: user.profileImage
        ? user.profileImage.toString("base64")
        : null,
    };

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
