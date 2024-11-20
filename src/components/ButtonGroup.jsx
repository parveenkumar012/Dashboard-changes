import React from 'react';
import { Plus, LayoutList, LayoutGrid, Save, TrainTrack  } from 'lucide-react';
import listIcon from '../assets/list-icon.svg';

const ButtonGroup = () => {
    return (
        <div className="flex items-center px-[30px] py-[10px] w-full justify-between">
            {/* Add Milestone Group Button */}
            <button className="flex items-center px-[12px] py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 text-[14px]">
                <Plus className="mr-2" size={16} />
                Add Milestone Group
            </button>
            <div className='flex gap-x-[10px]'>
            {/* View Mode Toggle Buttons */}
            <div className="flex items-center space-x-1 ">
                <button className="p-0 border border-[#DADADA] rounded-[5.97px] hover:border-[#4F46E5]  size-9 inline-flex justify-center items-center">
                   <img src={listIcon} alt="list icon" />
                </button>
                <button className="p-0 border border-[#DADADA] rounded-[5.97px] hover:border-[#4F46E5] size-9 inline-flex justify-center items-center">
                    <LayoutGrid className="text-gray-500" size={16} />
                </button>
            </div>

            {/* Save as Template Button */}
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-[14px ] text-gray-700 hover:bg-gray-100">
                <TrainTrack className="mr-2" size={16} />
                Save as Template
            </button>
            </div>
        </div>
    );
};

export default ButtonGroup;
