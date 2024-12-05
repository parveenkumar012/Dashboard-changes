import React,{useState} from "react";
// import { Button, Badge } from "@shadcn/ui";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeftIcon, ChevronDownIcon, PlusIcon  } from "lucide-react"; // Importing necessary icons
import graduationCap from "../assets/icon-grad.svg";
import Bell from "../assets/bell-icon.svg";
import tracker from "../assets/tracker.svg";
import products from "../assets/products.svg";
import waves from "../assets/waves.svg";
import users from "../assets/user-s.svg";
import cog from "../assets/cog.svg";
export function Header() {

    return (
        <div className="flex items-center justify-between flex-wrap">
          {/* Left Section */}
          <div className="flex  items-center justify-between w-full px-[10px] md:px-[30px]  py-[15px]">
            {/* Back Button */}
            <Button  className="flex items-center rounded-[10px] text-gray-600 bg-[#F1F5F9] shadow-none hover:bg-[#1B1B1B]  group  rounded-[10px] h-[26px] md-h-[36px] py-[5px] md:py-[8px] px-[5px] md:px-[10px]">
              <ChevronLeftIcon className="w-[15px] h-[15px] rounded-[2px] border border-[#4A505A] text-[#4A505A] group-hover:text-white group-hover:border-white " />
              <span className="text-base font-['Inter'] font-medium text-[#4A505A] group-hover:text-white hidden md:block">Back to Workflows</span>
            </Button>
    <div className="flex gap-x-[5px] md:gap-x-[15px]">
        <Button className="w-[26px] h-[26px] md:w-[41px] md:h-[41px] p-0 flex items-center justify-center [&_svg]:size-[20px] rounded-[8px] bg-[#F1F5F9] rounded-[9px] shadow-none hover:bg-secondary "><img src={graduationCap} alt="" /></Button>
           
           <div className="w-[26px] h-[26px] md:w-[41px] md:h-[41px] flex items-center justify-center relative">
           <Button className="p-0 h-auto hover:bg-transparent w-[41px] h-[41px] bg-transparent shadow-none" >
           <img src={Bell} alt="notification" />
              {/* Notification Badge */}
              <Badge variant="dot" className="absolute top-[3px] right-[4px] text-[10px]  text-black count-not font-bold">5</Badge>
            </Button>
            </div>
    
            {/* Profile Picture */}
            <div className="flex items-center gap-x-[5px] md:gap-x-[15px]">
              <div className="w-[26px] h-[26px] md:w-[28px] md:h-[28px] text-[9px] md:text-xs rounded-full bg-[#394AFF] flex items-center justify-center text-white font-medium">
                PM
              </div>
              <span className="text-gray-700 text-[#4A505A] text-[10px] md:text-sm font-['Inter']">Product Manager</span>
              <ChevronDownIcon className="w-[15px] text-[#A3ACBA]"/>
            </div>
          </div>
          </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between px-[10px] md:px-[30px] gap-y-[10px] py-[10px] w-full">
          {/* Center Navigation Tabs */}
          <div className="flex items-center ">
             {/* Project Title */}
              <h2 className=" text-md md:text-2xl font-semibold">Demo Project: August 2024</h2>
          </div>
    
          {/* Right Section - User Profile & Notifications */}
          <div className="flex items-center justify-between md-justify-end gap-x-[10px]">
            
    
            {/* Workflow Members Button */}
            <Button variant="outline" className="flex items-center px-[12px] py-1 border-[#DADADA] shadow-none group hover:bg-[#1B1B1B] hover:border-[#1B1B1B]">
              <span className="font-['Inter'] font-normal text-[14px] text-[#000000] group-hover:text-white">Workflow Members</span>
              <PlusIcon className="text-[#667085] group-hover:text-white" />
            </Button>
            <div>
            <span className="flex -space-x-4">
                <div className="w-[36px] h-[36px] rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-white z-[3]">J</div>
                <div className="w-[36px] h-[36px] rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-white z-[2]">C</div>
                <div className="w-[36px] h-[36px] rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-white z-[1]">A</div>
              </span>
            </div>
          </div>
          </div>

<div className="w-full px-[10px] md:px-[30px]">
          <div className="flex items-center gap-x-[25px] w-full border-b-[1px] border-[#E4E4E7] pb-2 md-pb-0 overflow-x-auto">
          <Button variant="link" className="flex items-center text-[#4F46E5] group !hover:text-[#4F46E5] nav-item hover:no-underline border-b border-[#4F46E5] rounded-none p-0 h-auto py-[11px]">
          <img src={tracker} alt="tracker" className="" />
              <span className=" ">Product Tracker</span>
            </Button>
            <Button variant="link" className="flex items-center text-[#7D8696] group nav-item hover:text-[#4F46E5]  p-0 h-auto py-[11px] border-b border-transparent hover:border-[#4F46E5] rounded-none  hover:no-underline">
              <img src={products} alt="products" />
              <span>Products</span>
            </Button>
            <Button variant="link" className="flex items-center text-[#7D8696] group hover:text-[#4F46E5] nav-item  p-0 h-auto py-[11px] border-b border-transparent hover:border-[#4F46E5] rounded-none hover:no-underline" >
            <img src={waves} alt="products" />
              <span>Activities</span>
            </Button>
            <Button variant="link" className="flex items-center text-[#7D8696] group hover:text-[#4F46E5] nav-item  p-0 h-auto py-[11px] border-b border-transparent hover:border-[#4F46E5] rounded-none  hover:no-underline" >
            <img src={users} alt="products" />
              <span>Workflow Members</span>
            </Button>
            <Button variant="link" className="flex rounded-none items-center text-[#7D8696] group hover:text-[#4F46E5] nav-item  p-0 h-auto py-[11px] border-b hover:border-[#4F46E5] border-transparent  hover:no-underline">
            <img src={cog} alt="products" />
              <span>Settings</span>
            </Button>
          </div>
        </div>
        </div>
      );
}
