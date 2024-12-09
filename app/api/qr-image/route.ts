import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const QRCode = await req.json();
    const { QRImage, userdataId } = QRCode;

    const userData = await prisma.userData.findUnique({
      where: { id: userdataId },
    });

    if (!userData) {
      return NextResponse.json(
        { message: "UserData not found" },
        { status: 404 }
      );
    }
    let imageBuffer: Buffer | null = null;
    if (QRImage) {
      const base64Data = QRImage.split(",")[1];
      imageBuffer = Buffer.from(base64Data, "base64");
    }
    const newQRCode = await prisma.qRCode.create({
      data: {
        QRImage: imageBuffer,
        userId: session.user.id,
        userdataId:userData.id,
      },
      include: {
        userdata: true,
      },
    });

    return NextResponse.json(
      { message: "QR code saved successfully.", user: newQRCode },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving QR code:", error); // Log the full error for debugging
    return NextResponse.json(
      { message: "Failed to save or update QR code data" },
      { status: 500 }
    );
  }
}

