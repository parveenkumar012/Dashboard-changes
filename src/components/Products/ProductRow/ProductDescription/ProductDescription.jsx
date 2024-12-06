import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const ProductDescription = ({ product, expandCollapse }) => {
  return (
    <div className="sticky left-0 z-20 w-full max-w-[116px] min-w-[116px] md:max-w-[175px] md:min-w-[175px] lg:max-w-[227px] pl-3 lg:pl-6 lg:min-w-[227px] pr-[13px] bg-white pt-4 pb-5">
      <Card className="pl-24 flex items-center flex-wrap px-0 relative shadow-none rounded-none border-x-0 border-t-0 border-b-[0px]">
        {/* Product Image */}
        <div className="w-full">
          <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded mr-4" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col mt-[21px]">
          <h4 className="font-medium text-[#1B1B1B] text-[13px]">{product.name}</h4>
          <p className="text-[#667085] text-[10px]">{product.sku}</p>
        </div>

        {/* Expand/Collapse Button */}
        <Button className="absolute top-[10px] right-[10px] p-0 bg-transparent hover:bg-transparent h-auto border-0 shadow-none" onClick={() => expandCollapse([product?.id, product?.isExpand])}>
          {product?.isExpand ? (
            <ChevronUpIcon className="w-5 h-5 text-[#1b1b1b]" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-[#1b1b1b]" />
          )}
        </Button>
      </Card>
    </div>
  );
};

export default ProductDescription;
