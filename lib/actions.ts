"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function fetchUserQRCodes() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const qrCodes = await prisma.qRCode.findMany({
    where: { userId: session.user.id },
    include: { userdata: true },
    orderBy: { createdAt: "desc" },
  });

  const processedQRCodes = qrCodes.map((qr) => ({
    ...qr,
    userdata: qr.userdata ? qr.userdata.name : null,
    QRImage: qr.QRImage ? Buffer.from(qr.QRImage).toString("base64") : null,
  }));

  return processedQRCodes;
}
