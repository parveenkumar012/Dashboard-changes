import React, { useState } from "react";
// import ToolTip from "../assets/tooltip-icon.svg";
import productImage from "../assets/product.png";
import navIcon from "../assets/dropdown-icon.svg";

const Dropdown = ({ children, content, position = "top",hide_bottom_arrow }) => {
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
          className={`absolute z-[20] !p-0 !left-[100%] !m-0 border-[#DADADA ] border text-sm text-[#6b7280] leading-1 bg-white rounded-md shadow-md w-full min-w-[213px] ${
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


            <div className="">
             <ul className="flex flex-col" >
              <li className="p-3 flex items-center gap-3 text-[14px] text-[#1B1B1B] font-medium hover:bg-[#F1F5F9] active:bg-[#F1F5F9]">
                <img src={navIcon} alt="icon nav" />
                <p className="m-0 " >Accessories </p>
              </li>
              <li className="p-3 flex items-center gap-3 text-[14px] text-[#1B1B1B] font-medium hover:bg-[#F1F5F9]">
              <img src={navIcon} alt="icon nav" />
              <p className="m-0 ">Packaging</p>
              </li>
              <li className="p-3 flex items-center gap-3 text-[14px] text-[#1B1B1B] font-medium hover:bg-[#F1F5F9]">
              <img src={navIcon} alt="icon nav" />
              <p className="m-0" >Packaging 2</p>
              </li>
              <li className="p-3 flex items-center gap-3 text-[14px] text-[#1B1B1B] font-medium hover:bg-[#F1F5F9]">
              <img src={navIcon} alt="icon nav" />
              <p className="m-0" >Artwork</p>
              </li>
              <li className="p-3 flex items-center gap-3 text-[14px] font-medium hover:bg-[#F1F5F9]">
              <span className="text-[#667085] underline" >View All</span>
              </li>
            </ul>
            </div>          

        </div>
      )}
    </div>
  );
};

export default Dropdown;
