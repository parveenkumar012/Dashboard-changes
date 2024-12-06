import React from "react";
import ProductDescription from "./ProductDescription/ProductDescription";
import ActivityCard from "./ActivityCard/ActivityCard";

const ProductRow = ({ product, renderTaskCards, expandCollapse }) => {
  return (
    <div className="flex border-b-[1px] bg-white w-[1920px] lg:w-[calc(100%+122.9%)] xl:w-[calc(100%+335px)]">
      {/* Product Description */}
      <ProductDescription product={product} expandCollapse={expandCollapse} />

      {/* Task Cards (First Column) */}
      <div className="bg-white w-full items-start min-w-[932px] pr-[12px] lg:pr-[25px] grid grid-cols-3 space-x-4 pt-4 pb-5">
        <ActivityCard status={product.status} isExpand={product.isExpand} renderTaskCards={renderTaskCards} />
      </div>

      {/* Task Cards (Second Column) */}
      <div className="bg-white min-w-[932px] lg:pl-[25px] pl-[12px] grid grid-cols-3 space-x-4 items-start pt-4 pb-5">
        <ActivityCard status={product.status} isExpand={product.isExpand} renderTaskCards={renderTaskCards} />
      </div>
    </div>
  );
};

export default ProductRow;
