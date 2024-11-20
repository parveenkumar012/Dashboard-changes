import React from "react";
// import { Button, Badge } from "@shadcn/ui";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Bell, CircleFadingPlus, LayoutList , GraduationCap , User, Users, Settings, Activity, List, ChevronDown, Plus  } from "lucide-react"; // Importing necessary icons


export function Header() {
    return (
        <div className="flex items-center justify-between flex-wrap">
          {/* Left Section */}
          <div className="flex items-center justify-between w-full px-[30px] py-[15px]">
            {/* Back Button */}
            <Button variant="ghost" className="flex items-center text-gray-600 bg-secondary rounded-[10px] px-[10px]">
              <ChevronLeft className="w-[15px] h-[15px] rounded-[2px] border border-[#4A505A] text-[#4A505A]" />
              <span className="text-base font-['Inter'] font-medium text-[#4A505A]">Back to Workflows</span>
            </Button>
    <div className="flex gap-x-[15px]">
        <Button className="w-[41px] h-[41px] p-0 flex items-center justify-center [&_svg]:size-[20px] rounded-[8px] bg-secondary shadow-none hover:bg-secondary"><GraduationCap className="text-black"/></Button>
           {/* Notification Icon */}
           <div className="w-[41px] h-[41px] flex items-center justify-center relative">
           <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
              <Bell className="w-[20px] h-[20px] text-black" />
              {/* Notification Badge */}
              <Badge variant="dot" className="absolute top-[3px] right-[4px] text-[10px]">5</Badge>
            </Button>
            </div>
    
            {/* Profile Picture */}
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[28px] h-[28px] text-xs rounded-full bg-[#394AFF] flex items-center justify-center text-white font-medium">
                PM
              </div>
              <span className="text-gray-700 text-[#4A505A] text-sm font-['Inter']">Product Manager</span>
              <ChevronDown className="w-[15px]"/>
            </div>
          </div>
          </div>
        <div className="flex items-center justify-between px-[30px] py-[10px] w-full">
          {/* Center Navigation Tabs */}
          <div className="flex items-center ">
             {/* Project Title */}
              <h2 className="text-2xl font-semibold">Demo Project: August 2024</h2>
          </div>
    
          {/* Right Section - User Profile & Notifications */}
          <div className="flex items-center gap-x-[10px]">
            
    
            {/* Workflow Members Button */}
            <Button variant="outline" className="flex items-center px-[12px] py-1">
              <span className="font-['Inter'] font-normal text-[14px]">Workflow Members</span>
              <Plus />
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

<div className="w-full px-[30px]">
          <div className="flex items-center gap-x-[25px] w-full border-b-[1px] border-[#E4E4E7]">
          <Button variant="link" className="flex items-center text-gray-500 hover:text-black p-0 h-auto py-[11px]">
          <CircleFadingPlus />
              <span>Product Tracker</span>
            </Button>
            <Button variant="link" className="flex items-center text-gray-500 hover:text-black p-0 h-auto py-[11px]">
              <LayoutList />
              <span>Products</span>
            </Button>
            <Button variant="link" className="flex items-center text-gray-500 hover:text-black p-0 h-auto py-[11px]">
              <Activity className="w-4 h-4 mr-1 text-gray-500" />
              <span>Activities</span>
            </Button>
            <Button variant="link" className="flex items-center text-gray-500 hover:text-black p-0 h-auto py-[11px]">
              <Users className="w-4 h-4 mr-1 text-gray-500" />
              <span>Workflow Members</span>
            </Button>
            <Button variant="link" className="flex items-center text-gray-500 hover:text-black p-0 h-auto py-[11px]">
              <Settings className="w-4 h-4 mr-1 text-gray-500" />
              <span>Settings</span>
            </Button>
          </div>
        </div>
        </div>
      );
}
