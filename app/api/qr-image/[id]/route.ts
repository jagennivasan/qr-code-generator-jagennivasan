import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
type Params = Promise<{ id: string }>;

export async function GET(
  req: Request, segmentData: { params: Params }
) {
  const params = await segmentData.params;
  const id = params.id;
  const session = await getServerSession(authOptions);

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const qrCode = await prisma.qRCode.findUnique({
      where: { id: Number(id),userId:session?.user.id },
    });

    return NextResponse.json(qrCode);
  } catch (error) {
    console.error("Error fetching QR code:", error);
    return NextResponse.json(
      { error: "Failed to fetch QR code" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const id = params.id;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userdata = await prisma.userData.findUnique({
      where: { id: Number(id) },
    });

    if (!userdata) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }

    if (userdata.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized to delete QR code" },
        { status: 403 }
      );
    }

    const deletedQRCode = await prisma.qRCode.delete({
      where: { userdataId: userdata.id },
    });

    return NextResponse.json(deletedQRCode);
  } catch (error) {
    console.error("Error deleting QR code:", error);
    return NextResponse.json(
      { error: "Failed to delete QR code" },
      { status: 500 }
    );
  }
}
