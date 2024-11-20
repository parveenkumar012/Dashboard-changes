import React, { useState } from "react";
import ToolTip from "../assets/tooltip-icon.svg";

const Tooltip = ({ children, content, position = "top" }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Target Element */}
      {children}

      {/* Tooltip Content */}
      {visible && (
        <div
          className={`absolute z-10 px-3 py-1 text-sm text-[#6b7280] leading-1 bg-white rounded-md shadow-md w-full min-w-[346px] ${
            position === "top"
              ? "bottom-full mb-2 left-1/2 transform -translate-x-1/2"
              : position === "bottom"
              ? "top-full mt-2 left-1/2 transform -translate-x-1/2"
              : position === "left"
              ? "right-full mr-2 top-1/2 transform -translate-y-1/2"
              : "left-full ml-2 top-1/2 transform -translate-y-1/2"
          }`}
        >
          {content}
  <img src={ToolTip} className="absolute -bottom-[8px] -translate-x-2/4 left-2/4" alt="" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
