"use client";
import React, { useRef, useState, useEffect } from "react";
import QRCodeColors from "../customization/QRCodeColors";
import QRCodeShapes from "../customization/QRCodeShapes";
import LogoOptions from "../customization/LogoOptions";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type DotType =
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded"
  | "square";
type CornerType = "square" | "extra-rounded";
type CornerDotType = "dot" | "square";

interface Services {
  wifi: boolean;
  bathroom: boolean;
  handicapped: boolean;
  babiesAllowed: boolean;
  dogsAllowed: boolean;
  parking: boolean;
  food: boolean;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface Contact {
  name: string;
  phone: string;
  email: string;
  website: string;
}

interface EventDetails {
  eventTitle: string;
  eventSummary: string;
  eventStartDate: string;
  eventEndDate: string;
  services: Services;
  address: Address;
  contact: Contact;
}

export default function EventQRCode() {
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    eventTitle: "",
    eventSummary: "",
    eventStartDate: "",
    eventEndDate: "",
    services: {
      wifi: false,
      bathroom: false,
      handicapped: false,
      babiesAllowed: false,
      dogsAllowed: false,
      parking: false,
      food: false,
    },
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    contact: {
      name: "",
      phone: "",
      email: "",
      website: "",
    },
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
          data,
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
  const {
    eventTitle,
    eventSummary,
    eventStartDate,
    eventEndDate,
    services,
    address,
    contact,
  } = eventDetails;

  const data =
    eventTitle || eventSummary || eventStartDate
      ? `  Title: ${eventTitle}
  Summary: ${eventSummary}
  Start Date: ${eventStartDate}
  End Date: ${eventEndDate}
   Services: ${Object.entries(services)
     .filter(([_, checked]) => checked)
     .map(([service]) => service)
     .join(", ")}
  Address: ${address.street}, ${address.city}, ${address.state}, ${
          address.zip
        }, ${address.country}
  Contact: ${contact.name}, ${contact.phone}, ${contact.email}, ${
          contact.website
        }
  `.trim()
      : "";
  useEffect(() => {
    if (
      qrCode.current &&
      eventDetails.address.city &&
      eventDetails.address.country &&
      eventDetails.address.state &&
      eventDetails.address.street &&
      eventDetails.address.zip &&
      eventDetails.contact.email &&
      eventDetails.contact.name &&
      eventDetails.contact.phone &&
      eventDetails.contact.website &&
      eventDetails.eventTitle &&
      eventDetails.eventSummary &&
      eventDetails.eventStartDate &&
      eventDetails.eventEndDate &&
      eventDetails.services
    ) {
      const {
        eventTitle,
        eventSummary,
        eventStartDate,
        eventEndDate,
        services,
        address,
        contact,
      } = eventDetails;

      const data =
        eventTitle || eventSummary || eventStartDate
          ? `  Title: ${eventTitle}
      Summary: ${eventSummary}
      Start Date: ${eventStartDate}
      End Date: ${eventEndDate}
       Services: ${Object.entries(services)
         .filter(([_, checked]) => checked)
         .map(([service]) => service)
         .join(", ")}
      Address: ${address.street}, ${address.city}, ${address.state}, ${
              address.zip
            }, ${address.country}
      Contact: ${contact.name}, ${contact.phone}, ${contact.email}, ${
              contact.website
            }
      `.trim()
          : "";

      qrCode.current.update({
        data: data,
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
    eventDetails,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      services: {
        ...prevDetails.services,
        [name]: checked,
      },
    }));
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "address" | "contact"
  ) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [key]: {
        ...prevDetails[key],
        [name]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full space-y-5 md:space-y-0 md:space-x-5 items-center">
      <div className="w-full md:w-2/3 lg:w-3/4 max-w-3xl px-4">
        <h1 className="text-2xl mb-2">Event</h1>
        <div className="space-y-4">
          <div>
            <Label>Event Title</Label>
            <Input
              type="text"
              name="eventTitle"
              value={eventDetails.eventTitle}
              onChange={handleChange}
              placeholder="Enter Event Title"
            />
          </div>

          <div>
            <Label>Summary</Label>
            <Textarea
              name="eventSummary"
              value={eventDetails.eventSummary}
              onChange={handleChange}
              placeholder="Enter Event Summary"
            />
          </div>
      

          <h3 className="text-2xl">Details</h3>
          <div>
            <Label>Date of the event</Label>
            <Input
              type="date"
              name="eventStartDate"
              value={eventDetails.eventStartDate}
              onChange={handleChange}
              placeholder="Enter Start Date"
            />
          </div>
         
          <div>
            <Input
              type="date"
              name="eventEndDate"
              value={eventDetails.eventEndDate}
              onChange={handleChange}
              placeholder="Enter End Date"
            />
          </div>

          <div className="my-2">
            <p>Choose the services available at the event</p>
            {Object.keys(eventDetails.services).map((service) => (
              <div key={service}>
                <input
                  type="checkbox"
                  name={service}
                  checked={
                    eventDetails.services[
                      service as keyof typeof eventDetails.services
                    ]
                  }
                  onChange={handleServiceChange}
                />
                <Label htmlFor={service} className="form-check-label">
                  {service.charAt(0).toUpperCase() +
                    service.slice(1).replace(/([A-Z])/g, " $1")}
                </Label>
              </div>
            ))}
          </div>

          <h3 className="text-xl mt-3">Address</h3>
          <div>
            <Label>Street</Label>
            <Input
              type="text"
              name="street"
              value={eventDetails.address.street}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="Street"
            />
          </div>

          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={eventDetails.address.city}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="City"
            />
          </div>
          <div>
            <Label>State</Label>
            <Input
              type="text"
              name="state"
              value={eventDetails.address.state}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="State"
            />
          </div>
          <div>
            <Label>Zip</Label>
            <Input
              type="text"
              name="zip"
              value={eventDetails.address.zip}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="Zip"
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              value={eventDetails.address.country}
              onChange={(e) => handleNestedChange(e, "address")}
              placeholder="Country"
            />
          </div>

          <h3 className="text-xl mt-3">Contact</h3>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={eventDetails.contact.name}
              onChange={(e) => handleNestedChange(e, "contact")}
              placeholder="Name"
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              value={eventDetails.contact.phone}
              onChange={(e) => handleNestedChange(e, "contact")}
              placeholder="Phone"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={eventDetails.contact.email}
              onChange={(e) => handleNestedChange(e, "contact")}
              placeholder="Email"
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={eventDetails.contact.website}
              onChange={(e) => handleNestedChange(e, "contact")}
              placeholder="Website"
            />
          </div>
        </div>
        <small>Event Triggered by QR Code.</small>
        <QRCodeColors
          setDotsColor={setDotsColor}
          setBackgroundColor={setBackgroundColor}
          setMarkerBorderColor={setMarkerBorderColor}
          setMarkerCenterColor={setMarkerCenterColor}
          backgroundColor={backgroundColor}
          dotsColor={dotsColor}
          markerBorderColor={markerBorderColor}
          markerCenterColor={markerCenterColor}
        />
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
            disabled={!isPresent}
          >
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}
