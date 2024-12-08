"use client"

import React from "react";
import { Button } from "../ui/button";

interface QRCode {
  id: number;
  QRImage: string | null; 
}

const QRCodeDownload: React.FC<{ qrCode: QRCode }> = ({ qrCode }) => {

  const downloadQRCode = (qrCode: QRCode, format: "png" ) => {
    const link = document.createElement("a");
    const qrDataUrl =
      format === "png"
        ? `data:image/png;base64,${qrCode.QRImage}` // PNG data URL
        : ``; 
  
    link.href = qrDataUrl;
    link.download = `QRCode_${qrCode.id}.${format}`; // Dynamic file extension based on selected format
  
    link.click(); // Programmatically trigger the download
  };
  return (
    <Button className="mt-2 px-16" onClick={() => downloadQRCode(qrCode,"png")}>Download</Button>

  );
};

export default QRCodeDownload;
