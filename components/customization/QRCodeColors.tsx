import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QRCodeColorsProps {
  backgroundColor: string;
  dotsColor: string;
  markerBorderColor: string;
  markerCenterColor: string;
  setBackgroundColor: (color: string) => void;
  setDotsColor: (color: string) => void;
  setMarkerBorderColor: (color: string) => void;
  setMarkerCenterColor: (color: string) => void;
}

const QRCodeColors: React.FC<QRCodeColorsProps> = ({
  backgroundColor,
  dotsColor,
  markerBorderColor,
  markerCenterColor,
  setBackgroundColor,
  setDotsColor,
  setMarkerBorderColor,
  setMarkerCenterColor,
}) => {
  const handleColorChange =
    (setter: (color: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const style = {
    inputColor: {
      width: "100px",
      height: "50px",
      padding: "5px",
    },
  };

  return (
    <div className="flex flex-col">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <Label>Background Color</Label>
            <Input
              type="color"
              value={backgroundColor}
              onChange={handleColorChange(setBackgroundColor)}
              style={style.inputColor}
            />

            <Label>Dots Color</Label>
            <Input
              type="color"
              value={dotsColor}
              onChange={handleColorChange(setDotsColor)}
              style={style.inputColor}
            />
            <Label>Marker Border Color:</Label>
            <Input
              type="color"
              value={markerBorderColor}
              onChange={handleColorChange(setMarkerBorderColor)}
              style={style.inputColor}
            />
            <Label>Marker Center Color</Label>
            <Input
              type="color"
              value={markerCenterColor}
              onChange={handleColorChange(setMarkerCenterColor)}
              style={style.inputColor}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default QRCodeColors;
