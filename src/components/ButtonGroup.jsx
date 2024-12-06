import React from 'react'
import { PlusIcon } from 'lucide-react'
import listIcon from '../assets/list-icon.svg'
import gridIcon from "../assets/grid-vieww.svg"
import trainTrack from "../assets/train-track.svg"
import { Button } from "@/components/ui/button"

const ButtonGroup = () => {
    return (
        <div className="flex items-center  gap-y-[10px] md:flex-row px-[10px] gap-x-[5px] md:px-[30px] py-[10px] w-full justify-between sticky left-0 z-20 bg-white">
            {/* Add Milestone Group Button */}
            <Button className=" w-[120px] bg-transparent font-normal gap-0  md:w-auto justify-center flex items-center px-[8px] md:px-[12px] h-10 shadow-none  border border-gray-300 rounded-md text-black  hover:bg-[#1B1B1B] hover:text-white group text-[8px] md:text-[14px]">
                <PlusIcon className="mr-2 group-hover:text-white size-5 md:!size-5"   />
                Add Milestone Group
            </Button>
            <div className='flex  gap-x-[5px] md:gap-x-[10px] w-full md:w-auto max-w-[160px] md:max-w-[270px] '>
                {/* View Mode Toggle Buttons */}
                <div className="flex items-center space-x-1 ">
                    <Button className="p-0 border hover:bg-transparent rounded-[5.97px] bg-white hover:border-[#4F46E5] border-[#4F46E5] list-switcher size-[26px] md:size-9 inline-flex justify-center items-center">
                        <img src={listIcon} alt="list icon" className='size-3 md:size-5' />
                    </Button>
                    <Button className="p-0 border border-[#DADADA] hover:bg-transparent bg-white rounded-[5.97px] size-[26px] md:size-9  hover:border-[#4F46E5] list-switcher inline-flex justify-center items-center">
                        <img src={gridIcon} alt="grid icon" className='size-3 md:size-5' />
                    </Button>
                </div>
                {/* Save as Template Button */}
                <Button className="flex template w-full md:w-auto bg-white hover:text-white  group md:max-auto max-w-[calc(100%-61px)] items-center px-[6px] md:px-[12px] py-2 border border-gray-300 rounded-md text-black  hover:bg-[#1B1B1B] group text-[8px] md:text-[14px]">
                    <img src={trainTrack} alt="track" className="mr-2 group-hover:text-white size-2 md:size-5" />
                    Save as Template
                </Button>
            </div>
        </div>
    );
};

export default ButtonGroup;
