import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import productImg from "../assets/product.png";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"; // Arrow icon from lucide-react

// Sample data for products
const products = [
  {
    id: 1,
    name: "Pink Water Color Bibs",
    sku: "BBU-WCF-BIB-AOPPNK",
    imageUrl: productImg, // Replace with actual image URL
  },
  {
    id: 2,
    name: "Pink Water Color Bibs",
    sku: "BBU-WCF-BIB-AOPPNK",
    imageUrl: productImg,
  },
  {
    id: 3,
    name: "Pink Water Color Bibs",
    sku: "BBU-WCF-BIB-AOPPNK",
    imageUrl: productImg,
  },
  {
    id: 4,
    name: "Pink Water Color Bibs",
    sku: "BBU-WCF-BIB-AOPPNK",
    imageUrl: productImg,
  },  {
    id: 5,
    name: "Pink Water Color Bibs",
    sku: "BBU-WCF-BIB-AOPPNK",
    imageUrl: productImg,
  },  {
    id: 6,
    name: "Pink Water Color Bibs",
    sku: "BBU-WCF-BIB-AOPPNK",
    imageUrl: productImg,
  },
];

export function Sidebar() {

    const [isProductExpanded, setIsProductExpanded] = useState(false);

    return (
        <div className="w-[228px] shrink-0">
          {/* Header */}
          <div className="flex flex-col justify-end items-baseline flex-wrap h-[199px] border-b-[1px] pb-[20px] sticky top-0 z-10 bg-white ps-[24px]">
            <h3 className="text-base font-semibold w-full flex items-end gap-x-[5px]">
              Product <span className="text-gray-500 text-[12px]">({products.length} products)</span>
            </h3>
            <Button className="flex items-center space-x-2 px-[19px] bg-transparent text-gray border border-[#DADADA] shadow-none hover:bg-transparent mt-[7px]">
              <span className="text-black text-[14px]">+ Add Product</span>
            </Button>
          </div>
    
          {/* Product List */}
          <div className="">
            {products.map((product) => (
              <Card key={product.id} className=" pl-24 flex items-center flex-wrap p-4 px-0 relative shadow-none rounded-none border-x-0 border-t-0 h-[162px] border-b-[1px]">
                {/* Product Image */}
                <div className="w-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 rounded mr-4"
                />
                </div>
    
                {/* Product Info */}
                <div className="flex flex-col mt-[21px]">
                  <h4 className="font-medium text-gray-800 text-[13px] text-[#1B1B1B]">{product.name}</h4>
                  <p className="text-gray-500 text-[10px] text-[#667085]">{product.sku}</p>
                </div>
    
                {/* Expand Icon */}
                <ChevronDown className="absolute top-[10px] right-[10px]  w-5 h-5 text-[#1b1b1b]" />
              </Card>
            ))}
          </div>
        </div>
      );
}
