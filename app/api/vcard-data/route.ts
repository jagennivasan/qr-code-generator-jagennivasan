import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const {
      id,
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
    } = await req.json();

    // Validate required fields
    if (!name || !mobile || !email) {
      return NextResponse.json(
        { error: "Name, contact number, and email are required" },
        { status: 400 }
      );
    }

    // Check if image is provided and process it
    let imageBuffer: Buffer | null = null;
    if (profileImage) {
      const base64Data = profileImage.split(",")[1]; // Check if the image has base64 format
      imageBuffer = Buffer.from(base64Data, "base64");
    }

    let user;

    if (id) {
      // If an ID is provided, update the existing user
      user = await prisma.userData.update({
        where: { id: Number(id) }, // Convert id to number if needed
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
          userId: session.user.id,
          
        },
      });
    } else {
      // Create a new user if no ID is provided
      user = await prisma.userData.create({
        data: {
          name,
          profileImage: imageBuffer || Buffer.from(""), // Save empty buffer if no image provided
          mobile,
          email,
          website,
          company,
          street,
          city,
          zip,
          country,
          pageColor,
          userId: session.user.id,
        },
      });
    }

    return NextResponse.json(user, { status: id ? 200 : 201 });
  } catch (error) {
    console.error("Error saving or updating user data:", error);
    return NextResponse.json(
      { error: "Failed to save or update user data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    const {
      id, // Ensure the ID is sent from the client
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

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required for update." },
        { status: 400 }
      );
    }

    let imageBuffer: Buffer | null = null;
    if (profileImage) {
      const base64Data = profileImage.split(",")[1]; // Check if the image has base64 format
      imageBuffer = Buffer.from(base64Data, "base64");
    }

    // Update the user in the database
    const updatedUser = await prisma.userData.update({
      where: { id: Number(id) },
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

    return NextResponse.json(
      { message: "User updated successfully.", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating user data:", error);

    // Handle specific Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
