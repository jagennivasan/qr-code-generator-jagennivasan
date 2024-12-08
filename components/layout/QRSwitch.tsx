"use client";

import {
  FaLink,
  FaWhatsapp,
  FaWifi,
  FaPaypal,
  FaFilePdf,
  FaImages,
  FaPlayCircle,
  FaShareAlt,
} from "react-icons/fa";
import { FaCommentSms } from "react-icons/fa6";
import { MdEmail, MdCall, MdOutlinePhoneAndroid } from "react-icons/md";
import { CiTextAlignJustify } from "react-icons/ci";
import { BsPersonVcard, BsFillCalendar2EventFill } from "react-icons/bs";
import { useState } from "react";

import LinkQRCode from "../qr-codes/LinkQRCode";
import EmailQRCode from "../qr-codes/EmailQRCode";
import TextQRCode from "../qr-codes/TextQRCode";
import CallQRCode from "../qr-codes/CallQRCode";
import SMSQRCode from "../qr-codes/SMSQRCode";
import VCardQRCode from "../qr-codes/VCardQRCode";
import WhatsappQRCode from "../qr-codes/WhatsappQRCode";
import WifiQRCode from "../qr-codes/WifiQRCode";
import PayPalQRCode from "../qr-codes/PayPalQRCode";
import EventQRCode from "../qr-codes/EventQRCode";
import PDFQRCode from "../qr-codes/PDFQRCode";
import AppQRCode from "../qr-codes/AppQRCode";
import ImageQRcode from "../qr-codes/ImageQRCode";
import VideoQRCode from "../qr-codes/VideoQRCode";
import SocialMediaQRCode from "../qr-codes/SocialMediaQRCode";

type QRComponentType =
  | "link"
  | "email"
  | "text"
  | "call"
  | "sms"
  | "vcard"
  | "whatsapp"
  | "wifi"
  | "paypal"
  | "event"
  | "pdf"
  | "app"
  | "image"
  | "video"
  | "social";

export default function QRSwitch() {
  const [activeComponent, setActiveComponent] = useState<string>("link");

  const toggleComponent = (component: QRComponentType) => {
    setActiveComponent(component);
  };

  return (
    <div className="m-5 justify-center items-center flex ">
      {/* QR Component switch */}
      <div className="w-[1200px] m-5 px-5 pb-5 rounded-2xl border border-gray-500 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full max-w-6xl mx-auto m-5 dark:bg-black bg-slate-200 p-5 border rounded-lg">
          <a
            onClick={() => toggleComponent("link")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200 ${
              activeComponent === "link" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <FaLink className="mx-2" />
            Link
          </a>
          <a
            onClick={() => toggleComponent("email")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer  transition-all duration-200${
              activeComponent === "email" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <MdEmail className="mx-2" /> E-mail
          </a>
          <a
            onClick={() => toggleComponent("text")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer  transition-all duration-200${
              activeComponent === "text" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <CiTextAlignJustify className="mx-2" /> Text
          </a>
          <a
            onClick={() => toggleComponent("call")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "call" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <MdCall className="mx-2" /> Call
          </a>
          <a
            onClick={() => toggleComponent("sms")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "sms" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <FaCommentSms className="mx-2" /> SMS
          </a>
          <a
            onClick={() => toggleComponent("vcard")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer  transition-all duration-200${
              activeComponent === "vcard" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <BsPersonVcard className="mx-2" /> VCard
          </a>
          <a
            onClick={() => toggleComponent("whatsapp")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "whatsapp" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <FaWhatsapp className="mx-2" /> Whatsapp
          </a>
          <a
            onClick={() => toggleComponent("wifi")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200 ${
              activeComponent === "wifi" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <FaWifi className="mx-2" /> Wifi
          </a>
          <a
            onClick={() => toggleComponent("paypal")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "paypal" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <FaPaypal className="mx-2" /> PayPal
          </a>
          <a
            onClick={() => toggleComponent("event")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "event" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <BsFillCalendar2EventFill className="mx-2" /> Event
          </a>
          <a
            onClick={() => toggleComponent("pdf")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "pdf" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <FaFilePdf className="mx-2" /> PDF
          </a>
          <a
            onClick={() => toggleComponent("app")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "app" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <MdOutlinePhoneAndroid className="mx-2" /> App
          </a>
          <a
            onClick={() => toggleComponent("image")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "image" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <FaImages className="mx-2" /> Image
          </a>
          <a
            onClick={() => toggleComponent("video")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "video" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <FaPlayCircle className="mx-2" /> Video
          </a>
          <a
            onClick={() => toggleComponent("social")}
            className={`px-2 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-200${
              activeComponent === "social" ? " bg-orange-600 text-white" : ""
            }`}
          >
            <FaShareAlt className="mx-2" /> Social
          </a>
        </div>

        {/* QR Components */}
        <div className="grid w-full max-w-[1200px] md:pl-4   ">
          {activeComponent === "link" && <LinkQRCode />}
          {activeComponent === "email" && <EmailQRCode />}
          {activeComponent === "text" && <TextQRCode />}
          {activeComponent === "call" && <CallQRCode />}
          {activeComponent === "sms" && <SMSQRCode />}
          {activeComponent === "vcard" && <VCardQRCode />}
          {activeComponent === "whatsapp" && <WhatsappQRCode />}
          {activeComponent === "wifi" && <WifiQRCode />}
          {activeComponent === "paypal" && <PayPalQRCode />}
          {activeComponent === "event" && <EventQRCode />}
          {activeComponent === "pdf" && <PDFQRCode />}
          {activeComponent === "app" && <AppQRCode />}
          {activeComponent === "image" && <ImageQRcode />}
          {activeComponent === "video" && <VideoQRCode />}
          {activeComponent === "social" && <SocialMediaQRCode />}
        </div>
      </div>
    </div>
  );
}
