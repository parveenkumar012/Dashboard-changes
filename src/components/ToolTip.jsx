import React, { useState } from "react";
import ToolTip from "../assets/tooltip-icon.svg";
import productImage from "../assets/product.png";

const Tooltip = ({ children, content, position = "top",hide_bottom_arrow }) => {
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
          className={`absolute z-[20]  p-[10px] border-[#DADADA ] border text-sm text-[#6b7280] leading-1 bg-white rounded-md shadow-md w-full min-w-[213px] ${
            position === "top"
              ? "bottom-full mb-2 left-1/2 transform -translate-x-1/2"
              : position === "bottom"
              ? "top-full mt-2 left-1/2 transform -translate-x-1/2"
              : position === "left"
              ? "right-full mr-2 top-1/2 transform -translate-y-1/2"
              : "left-full ml-2 top-1/2 transform -translate-y-1/2"
          }`}
        >
          {/* {content} */}


            <div className="" >
             <div className="flex" >
              <span className="size-10 rounded-full overflow-hidden">
                <img src={productImage} alt="product image" />
              </span>
              <div className="w-full max-w-[calc(100%-50px)] pl-[10px]">
              <h4 className="text-[13px] text-[#667085] leading-[13px] font-medium mb-1" >PP Solid - Green Cap</h4>
              <span className="text-[#1B1B1B] text-[10px] leading-[10px]">Materials</span>
              </div>
             </div>
             <div className="inline-flex bg-[#FFF7E4] rounded-full p-[5.5px_10px_5.5px_5.5px] gap-2 mt-[10px]">
                <span className="size-2 rounded-full bg-[#F0AF1D]"></span>
                <p className="uppercase text-[#F0AF1D] text-[9px] leading-[11px] m-0"> Pending</p>

                 </div>
            </div>          

          {(!hide_bottom_arrow) && (
            <img src={ToolTip} className="absolute -bottom-[8px] -translate-x-2/4 left-2/4" alt="" />
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
