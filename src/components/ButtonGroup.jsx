import React from 'react';
import { Plus, LayoutList, LayoutGrid, Save, TrainTrack  } from 'lucide-react';
import listIcon from '../assets/list-icon.svg';
import gridIcon from "../assets/grid-vieww.svg"
import trainTrack from "../assets/train-track.svg"

const ButtonGroup = () => {
    return (
        <div className="flex items-center  gap-y-[10px] md:flex-row px-[10px] gap-x-[5px] md:px-[30px] py-[10px] w-full justify-between sticky left-0 z-20 bg-white">
            {/* Add Milestone Group Button */}
            <button className=" w-[120px] md:w-auto justify-center flex items-center px-[6px] md:px-[12px] py-2 border border-gray-300 rounded-md text-black  hover:bg-[#1B1B1B] hover:text-white group text-[8px] md:text-[14px]">
                <Plus className="mr-2 group-hover:text-white size-2 md:size-5"   />
                Add Milestone Group
            </button>
            <div className='flex  gap-x-[5px] md:gap-x-[10px] w-full md:w-auto max-w-[160px] md:max-w-[270px] '>
            {/* View Mode Toggle Buttons */}
            <div className="flex items-center space-x-1 ">
                <button className="p-0 border  rounded-[5.97px] hover:border-[#4F46E5] border-[#4F46E5] list-switcher size-[26px] md:size-9 inline-flex justify-center items-center">
                   <img src={listIcon} alt="list icon" className='size-3 md:size-5' />
                </button>
                <button className="p-0 border border-[#DADADA] rounded-[5.97px] size-[26px] md:size-9  hover:border-[#4F46E5] list-switcher size-9 inline-flex justify-center items-center">
                  <img src={gridIcon} alt="grid icon" className='size-3 md:size-5' />
                </button>
            </div>

            {/* Save as Template Button */}
            <button className="flex w-full md:w-auto md:max-auto max-w-[calc(100%-61px)] items-center px-[6px] md:px-[12px] py-2 border border-gray-300 rounded-md text-black  hover:bg-[#1B1B1B] hover:text-white group text-[8px] md:text-[14px]">
               <img src={trainTrack} alt="track" className="mr-2 group-hover:text-white size-2 md:size-5" />
                Save as Template
            </button>
            </div>
        </div>
    );
};

export default ButtonGroup;
