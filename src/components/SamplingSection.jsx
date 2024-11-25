import React from 'react';
import {
    Card
  } from "@/components/ui/card"

  import ReviewCard from './ReviewCard';
import { EllipsisVertical, Plus } from 'lucide-react';

const SamplingSection = ({color}) => {
    const cardsData = [
        { tag: 'Strike-off', title: 'Initial Review Initial Review Initial Review', viewCount: 2, progress: '1/4', commentCount: 34, cardCount: '4 Cards' },
        { tag: 'Sampling', title: 'Initial Review', viewCount: 2, progress: '1/4', commentCount: 34, cardCount: '4 Cards' },
        { tag: 'Reshipment Inspection', title: 'Initial Review', viewCount: 2, progress: '1/4', commentCount: 34, cardCount: 'N/A' }
    ];

    return (
        <div className="">
            {/* Section Header */}
            <div className={`flex justify-between items-center p-2 rounded-lg mb-4`} style={{ backgroundColor: color }} >
                <h2 className="text-gray-700 font-semibold text-white">Sampling</h2>
                <div className='flex gap-x-[5px] items-center'>
                <button className="p-1 bg-[#E4E2FF] rounded hover:bg-gray-400">
                    <Plus size={16} />
                </button>
                <button className="p-1 bg-[#E4E2FF] rounded hover:bg-gray-400">
                <EllipsisVertical size={16} />
                </button>
                </div>
            </div>

            {/* Cards */}
            <div className="flex space-x-4  ">
                {cardsData.map((card, index) => (
                    <ReviewCard
                        key={index}
                        tag={card.tag}
                        title={card.title}
                        viewCount={card.viewCount}
                        progress={card.progress}
                        commentCount={card.commentCount}
                        cardCount={card.cardCount}
                    />
                ))}
            </div>
        </div>
    );
};

export default SamplingSection;
