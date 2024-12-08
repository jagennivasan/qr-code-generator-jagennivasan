"use client";

import React, { useRef, useState, useEffect } from "react";
import QRCodeColors from "../customization/QRCodeColors";
import QRCodeShapes from "../customization/QRCodeShapes";
import LogoOptions from "../customization/LogoOptions";

import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import VCardNav from "../Navbar/VCardNav";
type DotType =
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded"
  | "square";
type CornerType = "square" | "extra-rounded";
type CornerDotType = "dot" | "square";

export default function VCardComponent() {
  const [name, setName] = useState<string>("Jane Smith");
  const [profileImage, setProfileImage] = useState<string>("");
  const [mobile, setMobile] = useState<string>("+971 123-456-7890");
  const [email, setEmail] = useState<string>("janesmith@example.com");
  const [website, setWebsite] = useState<string>("www.example.com");
  const [company, setCompany] = useState<string>("ABC Corporation ");
  const [street, setStreet] = useState<string>("123 Dubai Street ");
  const [city, setCity] = useState<string>("Dubai");
  const [zip, setZip] = useState<string>("54321");
  const [country, setCountry] = useState<string>("United Arab Emirates");
  const [userId, setUserId] = useState<number | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [dotsColor, setDotsColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [markerBorderColor, setMarkerBorderColor] = useState<string>("#000000");
  const [markerCenterColor, setMarkerCenterColor] = useState<string>("#000000");
  const [pageColor, setPageColor] = useState("#ffffff"); // Default color is white
  const router = useRouter();
  const [dotsType, setDotsType] = useState<DotType>("rounded");
  const [cornersType, setCornersType] = useState<CornerType>("square");
  const [cornersDotType, setCornersDotType] = useState<CornerDotType>("dot");
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [shortUrl, setShortUrl] = useState<string>("");
  const [userdataId, setUserdataId] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const qrCode = useRef<any>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      currentSection === 2 &&
      !qrCode.current
    ) {
      import("qr-code-styling")
        .then((QRCodeStylingModule) => {
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
            data: shortUrl || "", // Make sure to regenerate with the current short URL
          });

          if (ref.current) {
            ref.current.innerHTML = ""; // Clear previous QR code
            qrCode.current.append(ref.current); // Append new QR code
          }
        })
        .catch((error) => {
          console.error("Error importing QRCodeStyling:", error);
        });
    }
  }, [
    currentSection,
    logo,
    dotsColor,
    backgroundColor,
    markerBorderColor,
    markerCenterColor,
    dotsType,
    cornersType,
    cornersDotType,
    shortUrl,
  ]);

  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
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
        data: shortUrl, // Ensure that the short URL or other data is updated
      });
    }
  }, [
    logo,
    dotsColor,
    backgroundColor,
    markerBorderColor,
    markerCenterColor,
    dotsType,
    cornersType,
    cornersDotType,
    shortUrl, // Watch for changes in shortUrl as well
  ]);

  const handleSubmit = async () => {
    setCurrentSection(2);

    if (!name || !mobile) {
      console.error("Some fields are missing");
      alert("Please fill out all required fields.");
      setCurrentSection(1);
      return;
    }

    const data = {
      id: userId, // Ensure you have the user ID stored in state
      name,
      profileImage,
      mobile,
      email,
      website,
      company,
      street,
      city,
      zip,
      country,
      pageColor,
    };

    try {
      let response;

      if (shortUrl) {
        response = await fetch("/api/vcard-data", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("/api/vcard-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        if (shortUrl) {
          // Update was successful
          const updatedUser = await response.json();
          // console.log("User data updated successfully:", updatedUser);
        } else {
          // Handle initial save
          const userData = await response.json();
          setUserId(userData.id); // Store the user ID for future updates
          setUserdataId(userData.id);

          const originalUrl = `${window.location.origin}/users/${userData.id}`;

          const shortenResponse = await fetch("/api/shorten-url", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              originalUrl,
            }),
          });

          const { shortUrl } = await shortenResponse.json();
          setShortUrl(shortUrl);

          if (qrCode.current) {
            qrCode.current.update({ data: shortUrl });
          }
        }
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
      }
    } catch (error) {
      console.error("Network or server error:", error);
    }
  };

  const handleSaveQRCode = async () => {
    if (!ref.current) return;
    const canvas = ref.current.querySelector("canvas");

    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    // Safely access the canvas data
    const imageData = canvas.toDataURL("image/png");

    try {
      const response = await fetch("/api/qr-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ QRImage: imageData, userdataId }),
      });

      if (response.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const errorData = await response.json();
        console.error("Failed to save QR code:", errorData);
      }
    } catch (error) {
      console.error("Error saving QR code:", error);
    }
  };

  const handleBack = () => {
    setCurrentSection(1);

    if (qrCode.current) {
      qrCode.current = null;
    }
  };
  const onDownloadClick = (extension: "png" | "svg") => {
    if (qrCode.current) {
      qrCode.current.download({ extension });
    }
  };
  return (
    <div>
      <VCardNav />

      <div className="m-10 flex flex-col space-y-5">
        {currentSection === 1 && (
          <div className="flex justify-center">
            <div className="w-[800px]">
              <h2 className="text-xl font-bold mb-5">User Information</h2>
              <div className="space-y-3 mb-5">
                <div className="flex flex-col">
                  <Label htmlFor="colorPicker">Choose Page Color:</Label>
                  <Input
                    type="color"
                    id="colorPicker"
                    value={pageColor}
                    className="w-[100px] h-[50px]"
                    onChange={(e) => setPageColor(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label>Profile Image</Label>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfileImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your contact number"
                  />
                </div>
                <div>
                  <Label> E-mail Address</Label>
                  <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label>Website</Label>
                  <Input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter your website url"
                  />
                </div>
                <div>
                  <Label>Company Name</Label>
                  <Input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter your company"
                  />
                </div>
                <div>
                  <Label>Street Address</Label>
                  <Input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Enter street"
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <Label>ZIP Code</Label>
                  <Input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Enter your ZIP code"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter your country"
                  />
                </div>
              </div>
              <Button onClick={handleSubmit} variant={"default"}>
                Continue
              </Button>
            </div>
            <div className="hidden md:block m-10">
              <div className="phone-frame">
                <style jsx>{`
                  .phone-frame {
                    position: relative;
                    width: 360px;
                    height: 640px;
                    border-radius: 40px;
                    background: #fd7f20;
                    padding: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                  }

                  .screen {
                    width: 100%;
                    height: 100%;
                    border-radius: 25px;
                    overflow: hidden;
                    background: #fff;
                  }

                  .phone-edge {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 80px;
                    background: #fd7f20;
                    border-radius: 10px;
                  }

                  .power-button {
                    width: 5px;
                    height: 50px;
                    background: #555;
                    border-radius: 3px;
                    margin: 10px 0;
                  }

                  .phone-edge-left {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 120px;
                    background: #fd7f20;
                    border-radius: 10px;
                  }

                  .volume-button {
                    width: 5px;
                    height: 30px;
                    background: #555;
                    border-radius: 3px;
                    margin: 10px 0;
                  }

                  .border {
                    border: 1px solid #ddd;
                  }
                `}</style>

                <div className="phone-edge">
                  <div className="power-button"></div>
                </div>

                <div
                  className="screen"
                  style={{
                    backgroundColor: pageColor,
                  }}
                >
                  <div className="border p-4 mt-5 rounded-md max-w-xs mx-auto shadow-lg bg-white relative border-black">
                    <div className="w-full h-10 bg-gray-200 rounded-t-md flex items-center justify-between px-4">
                      <span className="text-gray-700">9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                    <div className="p-4 text-black">
                      <h3 className="text-lg font-bold mb-3 text-center">
                        Live Preview of Your VCard
                      </h3>
                      <div className="flex flex-col items-center space-y-4">
                        {profileImage && (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-3 shadow-md"
                          />
                        )}

                        {name && <p className="text-xl">{name}</p>}

                        {company && (
                          <p className="opacity-50">Founder at {company}</p>
                        )}
                        {mobile && (
                          <p>
                            <strong>Phone:</strong> {mobile}
                          </p>
                        )}

                        {email && (
                          <p>
                            <strong>Email:</strong> {email}
                          </p>
                        )}

                        {website && (
                          <p>
                            <strong>Website:</strong> {website}
                          </p>
                        )}

                        {street && city && zip && country && (
                          <p>
                            <strong>Address:</strong> {street}, {city}, {zip},{" "}
                            {country}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="phone-edge-left">
                  <div className="volume-button"></div>
                  <div className="volume-button"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="w-full p-4 sm:p-6 md:p-8 grid place-content-center">
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-center md:text-left">
              QR Code Customization
            </h2>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-5 lg:space-y-0 md:w-[800px] justify-between">
              <div className="w-full lg:w-1/2">
                <QRCodeColors
                  dotsColor={dotsColor}
                  setDotsColor={setDotsColor}
                  backgroundColor={backgroundColor}
                  setBackgroundColor={setBackgroundColor}
                  markerBorderColor={markerBorderColor}
                  setMarkerBorderColor={setMarkerBorderColor}
                  markerCenterColor={markerCenterColor}
                  setMarkerCenterColor={setMarkerCenterColor}
                />

                <QRCodeShapes
                  dotsType={dotsType}
                  setDotsType={setDotsType}
                  cornersType={cornersType}
                  setCornersType={setCornersType}
                  cornersDotType={cornersDotType}
                  setCornersDotType={setCornersDotType}
                />

                <LogoOptions
                  logo={logo}
                  onLogoSelect={setLogo}
                  onFileChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLogo(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="justify-center flex flex-col items-center">
                <div
                  ref={ref}
                  // className="w-full lg:w-1/2 mt-5 lg:mt-0"
                  style={{ position: "relative" }}
                >
                  {/* QR Code will stay fixed in position regardless of accordion */}
                </div>
                <div className="text-center md:flex-col justify-center items-center my-5">
                  <button
                    onClick={() => onDownloadClick("png")}
                    className="px-3 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition my-3 mx-3"
                  >
                    Download PNG
                  </button>

                  <button
                    onClick={() => onDownloadClick("svg")}
                    className="px-3 py-2 bg-black border  text-white rounded-lg shadow-md hover:bg-white hover:text-black transition mx-3"
                  >
                    Download SVG
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 justify-between items-center md:w-[500px] mt-5">
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleSaveQRCode}
                className="px-4 py-2 bg-orange-700 hover:bg-orange-600 text-white rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
