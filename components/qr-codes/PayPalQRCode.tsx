"use client";
import React, { useRef, useState, useEffect } from "react";
import QRCodeColors from "../customization/QRCodeColors";
import QRCodeShapes from "../customization/QRCodeShapes";
import LogoOptions from "../customization/LogoOptions";

import { Input } from "../ui/input";

import currencies from "../customization/currencies";
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

export default function PayPalQRCode() {
  const [payPalForm, setPayPalForm] = useState({
    paymentType: "add to cart",
    email: "",
    itemName: "",
    itemId: "",
    price: "",
    currency: "USD",
    shipping: "",
    taxRate: "",
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
          data:url,
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
  const url = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(
    payPalForm.email
  )}&item_name=${encodeURIComponent(
    payPalForm.itemName
  )}&item_number=${encodeURIComponent(payPalForm.itemId)}&amount=${
    payPalForm.price
  }&currency_code=${payPalForm.currency}&shipping=${
    payPalForm.shipping
  }&tax_rate=${payPalForm.taxRate}&paymentaction=${payPalForm.paymentType}`;

  useEffect(() => {
    if (
      qrCode.current &&
      payPalForm.paymentType &&
      payPalForm.email &&
      payPalForm.itemName &&
      payPalForm.itemId &&
      payPalForm.currency &&
      payPalForm.price &&
      payPalForm.shipping &&
      payPalForm.taxRate
    ) {
    
      qrCode.current.update({
        data: url,
        image: logo || "", // Ensure the logo state is correctly passed
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
    payPalForm.paymentType,
    payPalForm.email,
    payPalForm.itemName,
    payPalForm.itemId,
    payPalForm.price,
    payPalForm.currency,
    payPalForm.shipping,
    payPalForm.taxRate,
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
  const handelFormChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPayPalForm((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };
  const handleAddtoCard = (value: string) => {
    setPayPalForm((prevForm) => ({
      ...prevForm,
      paymentType: value,
    }));
  };
  const handleCountryChange = (value: string) => {
    setPayPalForm((prevForm) => ({
      ...prevForm,
      currency: value,
    }));
  };
  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full space-y-5 md:space-y-0 md:space-x-5 items-center">
      <div className="w-full md:w-2/3 lg:w-3/4 max-w-3xl px-4">
        <h1 className="text-2xl mb-2">Pay pal</h1>
        <div className="space-y-2 mb-3">
          <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-5 md:flex-row">
            <div>
              <Label>Payment Type</Label>
              <Select
                name="paymentType"
                value={payPalForm.paymentType}
                onValueChange={handleAddtoCard}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy now">Buy now</SelectItem>
                  <SelectItem value="add to cart">Add to cart</SelectItem>
                  <SelectItem value="donation">Donation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={payPalForm.email}
                onChange={handelFormChange}
                placeholder="Enter PayPal email"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-5 md:flex-row">
            <div>
              <Label>Item Name</Label>
              <Input
                name="itemName"
                type="text"
                value={payPalForm.itemName}
                onChange={handelFormChange}
                placeholder="Enter item name"
              />
            </div>
            <div>
              <Label>Item ID</Label>
              <Input
                name="itemId"
                type="text"
                value={payPalForm.itemId}
                onChange={handelFormChange}
                placeholder="Enter item ID"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-5 md:flex-row ">
            <div className="w-full">
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                value={payPalForm.price}
                onChange={handelFormChange}
                placeholder="Enter price"
              />
            </div>
            <div className="w-full">
              <Label>Currency</Label>
              <Select
                name="currency"
                value={payPalForm.currency}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label>Shipping</Label>
              <Input
                type="number"
                name="shipping"
                value={payPalForm.shipping}
                onChange={handelFormChange}
                placeholder="Enter shipping cost"
              />
            </div>
            <div className="w-full">
              <Label>Tax Rate</Label>
              <Input
                name="taxRate"
                type="number"
                value={payPalForm.taxRate}
                onChange={handelFormChange}
                placeholder="Enter tax rate"
              />
            </div>
          </div>
        </div>
        <small>PayPal Transaction Code.</small>
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
                : "hover:bg-white hover:text-black"
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
