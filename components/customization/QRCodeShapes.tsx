import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type DotType =
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded"
  | "square";
type CornerType = "square" | "extra-rounded";
type CornerDotType = "dot" | "square";

interface QRCodeShapesProps {
  dotsType: DotType; // Now it uses the specific DotType union
  cornersType: CornerType; // Specific CornerType union
  cornersDotType: CornerDotType; // Specific CornerDotType union
  setDotsType: (value: DotType) => void; // Update the setter function to expect the correct type
  setCornersType: (value: CornerType) => void; // Expect CornerType
  setCornersDotType: (value: CornerDotType) => void; // Expect CornerDotType
}

const QRCodeShapes: React.FC<QRCodeShapesProps> = ({
  dotsType,
  cornersType,
  cornersDotType,
  setDotsType,
  setCornersType,
  setCornersDotType,
}) => {
  return (
    <div className="">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Shapes</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col m-2">
              <Label className="text-sm font-semibold mb-1">Dots</Label>
              <Select
                onValueChange={(e) => setDotsType(e as DotType)}
                value={dotsType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="dots">Dots</SelectItem>
                  <SelectItem value="classy">Classy</SelectItem>
                  <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                  <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col m-2">
              <Label className="text-sm font-semibold mb-1">
                Marker Border
              </Label>
              <Select
                onValueChange={(e) => setCornersType(e as CornerType)}
                value={cornersType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col m-2">
              <Label className="text-sm font-semibold mb-1">
                Marker Center
              </Label>
              <Select
                onValueChange={(e) => setCornersDotType(e as CornerDotType)}
                value={cornersDotType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dot">Dot</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default QRCodeShapes;
