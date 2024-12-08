import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const logoOptions = [
  { value: null, img: "/x.png" }, // Unselect option
  { value: "/link.png", img: "/link.png" },
  { value: "/location.png", img: "/location.png" },
  { value: "/email.png", img: "/email.png" },
  { value: "/whatsapp.png", img: "/whatsapp.png" },
  { value: "/wifi.png", img: "/wifi.png" },
  { value: "/vcard.png", img: "/vcard.png" },
  { value: "/paypal.png", img: "/paypal.png" },
  { value: "/btc.png", img: "/btc.png" },
  { value: "/scan-me-frame.png", img: "/scan-me-frame.png" },
  { value: "/scanning-qr-code.png", img: "/scanning-qr-code.png" },
  { value: "/menu.png", img: "/menu.png" },
  { value: "/scan-me.png", img: "/scan-me.png" },
  { value: "/menu-fork.png", img: "/menu-fork.png" },
];

interface LogoOptionsProps {
  logo: string | null;
  onLogoSelect: (value: string | null) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LogoOptions = ({
  logo,
  onLogoSelect,
  onFileChange,
}: LogoOptionsProps) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxSizeInBytes = 2 * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeInBytes) {
        setError("File size exceeds 2MB. Please select a smaller file.");
        return;
      }
      setError(null);
      onFileChange(e);
    }
  };

  const handleLogoSelect = (value: string | null) => {
    onLogoSelect(value);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Logo</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="mb-3">
                <p className="mb-2 text-sm md:text-base">Upload Logo</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <p className="mb-2 text-sm md:text-base">Or choose from here:</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 md:max-w-5xl max-w-[290px]  bg-white p-5 rounded-lg">
                {logoOptions.map((option) => (
                  <div
                    key={option.value ? option.value : "unselect"}
                    className={`cursor-pointer rounded flex items-center justify-center overflow-hidden  ${
                      logo === option.value ? " border-2 border-orange-600" : ""
                    } transition duration-200 hover:opacity-80`}
                    onClick={() => handleLogoSelect(option.value)}
                  >
                    <Image
                      src={option.img}
                      height={100}
                      width={100}
                      alt="Logo"
                      className="object-cover w-full h-auto max-w-[50px] max-h-[50px] aspect-square"
                    />
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LogoOptions;
