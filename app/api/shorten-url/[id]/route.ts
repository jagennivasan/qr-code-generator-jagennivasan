import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

 
  const { id } = await params; // Await the params before destructuring

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const deletedQRCode = await prisma.url.delete({
      where: { id: Number(id) },
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
