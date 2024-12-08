import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
const prisma = new PrismaClient();

type Params = Promise<{ id: string }>;

export async function GET(req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  try {
    const user = await prisma.userData.findUnique({
      where: { userId: session.user.id ,
        id: Number(id) },
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

export async function PUT(request: Request, segmentData: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  try {
    const data = await request.json();

    const {
      name,
      profileImage,
      mobile,
      email,
      website,
      company,
      street,
      city,
      zip,
      country,
      pageColor,
    } = data;
    const params = await segmentData.params;
    const id = params.id;
    let imageBuffer: Buffer | null = null;
    if (profileImage) {
      const base64Data = profileImage.split(",")[1]; // Check if the image has base64 format
      imageBuffer = Buffer.from(base64Data, "base64");
    }

    // Update the user in the database
    const updatedUser = await prisma.userData.update({
      where: { id: Number(id), userId: session.user.id },
      data: {
        name,
        profileImage: imageBuffer || undefined, // Update image if new image provided
        mobile,
        email,
        website,
        company,
        street,
        city,
        zip,
        country,
        pageColor,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      { error: "An error occurred while updating user data" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  segmentData: { params: Params }
) {
  
  const params = await segmentData.params;
  const id = params.id;
  // Validate the ID to ensure it's numeric
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const deletedUser = await prisma.userData.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("Error deleting user data:", error);
    return NextResponse.json(
      { error: "Failed to delete user data" },
      { status: 500 }
    );
  }
}
