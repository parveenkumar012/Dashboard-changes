import React from 'react'
import { EllipsisVerticalIcon, PaperclipIcon, CircleCheckIcon, MessagesSquareIcon, InboxIcon } from 'lucide-react'
import { Button } from "../components/ui/button"

const ReviewCard = ({ tag, title, viewCount, progress, commentCount, cardCount }) => {
    return (
        <div className="w-[33.33%] bg-[#F1F5F9] rounded-lg shadow-md p-4 space-y-[10px] relative">
            {/* Tag and More Options */}
            <div className='flex items-center justify-between'>
                <div className="flex justify-between items-center">
                    <span className="bg-white text-[#667085] font-semibold text-[12px] px-2 py-1 text-xs rounded">{tag}</span>
                </div>
                <div className='flex'>
                    <Button className=" text-sm h-6 font-medium text-[14px] leading-[12px] hover:bg-[#1B1B1B] hover:text-white hover:border-[#1B1B1B]  text-[#4F46E5] border border-[#4F46E5] bg-white rounded-[3px] py-[2px] px-[6px]">
                        View all
                    </Button>
                    <Button className="p-1 ms-[10px] text-gray-500 bg-transparent hover:text-gray-700 hover:bg-transparent shadow-none m-0 h-6">
                        <EllipsisVerticalIcon size={16} />
                    </Button>
                </div>
            </div>
            <h3 className="text-gray-800 text-[16px] font-medium leading-[16px] min-h-[32px] mb-2">{title}</h3>
            <div className="flex items-center text-gray-500 space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                    <PaperclipIcon className='text-[#667085] -rotate-45' size={16} />
                    <span className='text-[11px] text-[#1B1B1B]'>{viewCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                   <span className='relative'>
                    <span className='bg-[#C11574] size-[6px] rounded-full  block absolute left-[15px] -top-[5px]' ></span>
                    <CircleCheckIcon className='text-[#667085]' size={16} />
                   </span> 
                    <span className='text-[11px] text-[#1B1B1B]'>{progress}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span className='relative'>
                    <span className='bg-[#C11574] rounded-full size-[6px] block absolute left-0 top-0 left-[15px] -top-[5px]' ></span>
                    <MessagesSquareIcon className='text-[#667085]' size={16} /></span>
                    <span className='text-[11px] text-[#1B1B1B]'>{commentCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <InboxIcon className='text-[#667085]' size={16} />
                    <span className='text-[11px] text-[#1B1B1B]'>{cardCount}</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
