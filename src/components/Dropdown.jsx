import React from "react";
import navIcon from "../assets/dropdown-icon.svg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Dropdown = ({ children,number,id,handleEditClick,handleDeleteComment }) => {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="border-transparent  px-0 cursor-pointer text-[10px] hover:bg-[#1B1B1B] shadow-none !bg-transparent hover:text-white text-[#667085]  py-[1px] rounded-[5px] bg-[#F6F6F6]" >{children}</TooltipTrigger>
        <TooltipContent className="bg-white shadow-md" >
          <div className="">
          {number == 1 &&
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
          }
          {number == 2 &&
            <ul className="flex flex-col" >
              <li className="p-2 flex items-center gap-2 text-[14px] text-[#1B1B1B] font-medium hover:bg-[#F1F5F9] active:bg-[#F1F5F9]" onClick={() => handleEditClick(id)} >
                <FaEdit className='cursor-pointer text-[20px]' />
                <p className="m-0 " >Edit </p>
              </li>
              <li className="p-2 flex items-center gap-2 text-[14px] text-[#1B1B1B] font-medium hover:bg-[#F1F5F9]"  onClick={() => handleDeleteComment(id)} >
                <MdDelete className='cursor-pointer text-[20px]' />
                <p className="m-0 ">Delete</p>
              </li>
            </ul>
          }
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>


  );
};

export default Dropdown;
