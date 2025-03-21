import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { lighten } from "lib/lighten";

export const Tag = ({ color = "#918955", text = "Tag", className }) => {
  const [bg, setBg] = useState(color);
  
  const handleMouseEnter = (e) => {
    e.stopPropagation();
    setBg(lighten(color, 30));
  };
  
  const handleMouseLeave = (e) => {
    e.stopPropagation();
    setBg(color);
  };
  
  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "px-2 py-1 rounded text-xs font-medium text-white cursor-default",
        className
      )}
      style={{ backgroundColor: bg }}
    >
      {text}
    </span>
  );
};