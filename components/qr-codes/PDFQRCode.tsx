"use client";
import React, { useRef, useState, useEffect } from "react";
import QRCodeColors from "../customization/QRCodeColors";
import QRCodeShapes from "../customization/QRCodeShapes";
import LogoOptions from "../customization/LogoOptions";
import { Input } from "../ui/input";

type DotType =
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded"
  | "square";
type CornerType = "square" | "extra-rounded";
type CornerDotType = "dot" | "square";

export default function PDFQRCode() {
  const [pdfUrl, setPdfUrl] = useState("");

  const [logo, setLogo] = useState<string | null>(null);
  const [dotsColor, setDotsColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [markerBorderColor, setMarkerBorderColor] = useState<string>("#000000");
  const [markerCenterColor, setMarkerCenterColor] = useState<string>("#000000");
  const [isUrlValid, setIsUrlValid] = useState(true); // Track URL validity
  const [isPresent, setIspresent] = useState(false);

  const [dotsType, setDotsType] = useState<DotType>("rounded");
  const [cornersType, setCornersType] = useState<CornerType>("square");
  const [cornersDotType, setCornersDotType] = useState<CornerDotType>("dot");
  const ref = useRef<HTMLDivElement | null>(null);
  const qrCode = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("qr-code-styling").then((QRCodeStylingModule) => {
        const QRCodeStyling = QRCodeStylingModule.default;
        qrCode.current = new QRCodeStyling({
          width: 250,
          height: 250,
          margin:8,
          image: logo || "",
          dotsOptions: {
            color: dotsColor,
            type: dotsType,
          },
          backgroundOptions: {
            color: backgroundColor,
          },
          cornersSquareOptions: {
            color: markerBorderColor,
            type: cornersType,
          },
          cornersDotOptions: {
            color: markerCenterColor,
            type: cornersDotType,
          },
          imageOptions: {
            crossOrigin: "anonymous",
          },
          data:pdfUrl,
        });

        if (ref.current) {
          ref.current.innerHTML = ""; 

          qrCode.current.append(ref.current);
        }
      });
    }
  }, [
    logo,
    dotsColor,
    dotsType,
    backgroundColor,
    markerBorderColor,
    cornersType,
    markerCenterColor,
    cornersDotType,
  ]);

  useEffect(() => {
    if (qrCode.current && isUrlValid && pdfUrl) {
      const data = pdfUrl;
      qrCode.current.update({
        data,
        image: logo || "",
        dotsOptions: {
          color: dotsColor,
          type: dotsType,
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        cornersSquareOptions: {
          color: markerBorderColor,
          type: cornersType,
        },
        cornersDotOptions: {
          color: markerCenterColor,
          type: cornersDotType,
        },
      });
      setIspresent(true);
    } else if (ref.current) {
      ref.current.innerHTML = "";
      setIspresent(false);
    }
  }, [
    pdfUrl,

    logo,
    dotsColor,
    backgroundColor,
    markerBorderColor,
    markerCenterColor,
    dotsType,
    cornersType,
    cornersDotType,
  ]);

  const validateUrl = (value: string) => {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    return urlPattern.test(value);
  };
  const onLogoSelect = (select: string | null) => {
    setLogo(select);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onDownloadClick = (extension: "png" | "svg") => {
    if (qrCode.current) {
      qrCode.current.download({ extension });
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPdfUrl(inputValue);
    setIsUrlValid(validateUrl(inputValue));
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full space-y-5 md:space-y-0 md:space-x-5 items-center">
      <div className="w-full md:w-2/3 lg:w-3/4 max-w-3xl px-4">
        <h1 className="text-2xl mb-2"> PDF Url</h1>
        <div className="mb-2">
          <Input
            type="text"
            name="pdfUrl"
            value={pdfUrl}
            onChange={handlePdfChange}
            placeholder="PDF URL"
          />
          {!isUrlValid && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid URL.
            </p>
          )}
        </div>
        <small>
          Enter the URL of a PDF file from Google Drive to generate the QR code.
        </small>
        <QRCodeColors
          setDotsColor={setDotsColor}
          setBackgroundColor={setBackgroundColor}
          setMarkerBorderColor={setMarkerBorderColor}
          setMarkerCenterColor={setMarkerCenterColor}
          backgroundColor={backgroundColor}
          dotsColor={dotsColor}
          markerBorderColor={markerBorderColor}
          markerCenterColor={markerCenterColor}
        />{" "}
        <QRCodeShapes
          setDotsType={setDotsType} // Ensure this accepts the correct type
          setCornersType={setCornersType}
          setCornersDotType={setCornersDotType}
          dotsType={dotsType}
          cornersType={cornersType}
          cornersDotType={cornersDotType}
        />
        <LogoOptions
          logo={logo}
          onLogoSelect={onLogoSelect}
          onFileChange={handleFileChange}
        />
      </div>

      <div className="flex flex-col items-center justify-center md:sticky md:top-5 md:self-start md:w-1/3 lg:w-1/3 m-5 md:m-0">
        <div
          className={` border-2 border-slate-400 rounded-lg dark:border-slate-700 ${
            !isPresent ? "border-none" : ""
          }`}
        >
          <div ref={ref} className="mb-5 md:mb-5 m-5">
            {/* QR Code will be appended here */}
          </div>
        </div>
        <div className="text-center md:flex-col justify-center items-center my-5">
          <button
            onClick={() => onDownloadClick("png")}
            className={`px-3 py-2 bg-orange-500 text-white rounded-lg  transition my-3 mx-3 ${
              !isPresent
                ? "bg-orange-400 cursor-not-allowed"
                : "hover:bg-orange-600"
            }`}
            disabled={!isPresent}
          >
            Download PNG
          </button>
          <button
            onClick={() => onDownloadClick("svg")}
            className={`px-3 py-2 bg-black border text-white rounded-lg  transition mx-3 ${
              !isPresent
                     ? " cursor-not-allowed"
                : "hover:bg-white hover:text-black"
            }`}
            disabled={!isPresent || !isUrlValid}
          >
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}