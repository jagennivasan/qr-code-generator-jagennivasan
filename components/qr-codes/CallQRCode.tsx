"use client";
import React, { useRef, useState, useEffect } from "react";
import QRCodeColors from "../customization/QRCodeColors";
import QRCodeShapes from "../customization/QRCodeShapes";
import LogoOptions from "../customization/LogoOptions";
import CountryCode from "@/public/countryCodes.json";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DotType =
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded"
  | "square";
type CornerType = "square" | "extra-rounded";
type CornerDotType = "dot" | "square";

export default function CallQRCode() {
  const [callForm, setCallForm] = useState({
    countryCode: "",
    phoneNumber: "",
  });

  const [logo, setLogo] = useState<string | null>(null);
  const [dotsColor, setDotsColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [markerBorderColor, setMarkerBorderColor] = useState<string>("#000000");
  const [markerCenterColor, setMarkerCenterColor] = useState<string>("#000000");
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
          margin: 8,
          image: logo || "",
          dotsOptions: {
            color: dotsColor,
            type: dotsType, // Should now be correctly recognized
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
          data:data,

        });

        if (ref.current) {
          ref.current.innerHTML = ""; // Clear previous QR code

          qrCode.current.append(ref.current);
        }
      });
    }
  }, [
    logo,
    dotsColor,
    dotsType, // Ensure this is a valid DotType
    backgroundColor,
    markerBorderColor,
    cornersType,
    markerCenterColor,
    cornersDotType,
  ]);
  const data =
  callForm.countryCode || callForm.phoneNumber
    ? `tel:${callForm.countryCode}${callForm.phoneNumber}`
    : "";
  useEffect(() => {
    if (qrCode.current && callForm.phoneNumber) {
      

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
    callForm.countryCode,
    callForm.phoneNumber,

    logo,
    dotsColor,
    backgroundColor,
    markerBorderColor,
    markerCenterColor,
    dotsType,
    cornersType,
    cornersDotType,
  ]);

  const onLogoSelect = (select: string | null) => {
    setLogo(select); // Now this works with both `string` and `null`
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional chaining
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

  const handelFormChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCallForm((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };
  const handleCountryCodeChange = (value: string) => {
    setCallForm((prevForm) => ({
      ...prevForm,
      countryCode: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full space-y-5 md:space-y-0 md:space-x-5 items-center">
      <div className="w-full md:w-2/3 lg:w-3/4 max-w-3xl px-4">
        <h1 className="text-2xl mb-2">Phone Call </h1>
        <div className="space-y-5 mb-2">
          <div>
            <Label>Country Code</Label>

            <Select
              name="countryCode"
              value={callForm.countryCode}
              onValueChange={handleCountryCodeChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {CountryCode.map((code) => (
                  <SelectItem key={code.code} value={code.dial_code}>
                    {code.name} ({code.dial_code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              type="number"
              value={callForm.phoneNumber}
              onChange={handelFormChange}
              placeholder="Phone Number"
            />
          </div>
        </div>
        <small>QR Code for Direct Dial. </small>
        <QRCodeColors
          setDotsColor={setDotsColor}
          setBackgroundColor={setBackgroundColor}
          setMarkerBorderColor={setMarkerBorderColor}
          setMarkerCenterColor={setMarkerCenterColor}
          backgroundColor={backgroundColor}
          dotsColor={dotsColor}
          markerBorderColor={markerCenterColor}
          markerCenterColor={markerCenterColor}
        />{" "}
        <QRCodeShapes
          setDotsType={setDotsType}
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
            className={`px-3 py-2  bg-black border text-white rounded-lg  transition mx-3 ${
              !isPresent
                ? " cursor-not-allowed"
                : "hover:bg-white hover:text-black "
            }`}
            disabled={!isPresent}
          >
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}
