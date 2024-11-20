import React from "react";
import { Button } from "../components/ui/button"; // Assuming a Button component
import { Card, CardContent } from "../components/ui/card"; // Assuming Card components
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible"; // Collapsible component
import { Badge } from "../components/ui/badge"; // Badge component
import { Progress } from "../components/ui/progress"; // Progress bar component
import {Alert, AlertDescription} from "../components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons"; // Radix icons
import { ChevronDown, Info } from "lucide-react"; // Icon components
import Tooltip from "../components/ToolTip";

import productImg from "../assets/Frame_1000004018.jpg";
import kidsImg from "../assets/Frame 1000004017.jpg";
import fruitImg from "../assets/Rectangle626.jpg";
import tenantLogo from "../assets/Frame 1000003152.png";
import HeaderLogo from "../assets/SupplyScope Logo.svg";
import alertIcon from "../assets/alert.svg";
import checkIcon from "../assets/check-svg.svg";
import fileUpload from "../assets/file-upload.svg";

const products = [
  {
    id: 1,
    name: "EUROCHEF Air Fryer Oven 16L Digital Electric Airfryer Rotisserie Large Big Dry Cooker, Silver",
    brand: "EUROCHEF",
    sku: "812869",
    image: productImg,
    status: "Warning",
    testPlans: [
      {
        name: "Mandatory Electrical Home Appliance Test Matrix",
        description: "Lorem ipsum dolor sit amet consectetur. Ut aliquet lectus in faucibus ornare enim ut. Id dictumst eget sed cum risus. Est velit netus maecenas in id aenean lacus...",
        standards: ["AS 2070", "FDA 21 CFR 177.2600", "HB 295.3.10", "EN 14350"],
        status: "Complete",
      },
      {
        name: "Mandatory Electrical Home Appliance Test Matrix",
        description: "Lorem ipsum dolor sit amet consectetur. Ut aliquet lectus in faucibus ornare enim ut. Id dictumst eget sed cum risus. Est velit netus maecenas in id aenean lacus...",
        standards: ["AS 2070", "FDA 21 CFR 177.2600", "HB 295.3.10", "EN 14350"],
        status: "Complete",
      },
      {
        name: "Food Safety Contact Electrical Home Appliance Test Matrix",
        description: "Lorem ipsum dolor sit amet consectetur. Ut aliquet lectus in faucibus ornare enim ut. Id dictumst eget sed cum risus. Est velit netus maecenas in id aenean lacus...",
        standards: ["AS 2070", "FDA 21 CFR 177.2600", "HB 295.3.10", "EN 14350"],
        status: "Incomplete",
      }
    ],
  },
  {
    id: 2,
    name: "Kids Bubble Lawnmower Bubbles Machine Blower Outdoor Garden Party Toddler Toy",
    brand: "KIDSTOYS",
    sku: "812869",
    image: kidsImg,
    status: "Awaiting",
    testPlans: [],
  },
  {
    id: 3,
    name: "62 Pieces Kitchen Pretend Play Food Set for Kids Cutting Fruits Vegetables Pizza Toys Set",
    sku: 812869,
    image: fruitImg,
    status: "Success",
    testPlans: []
  }
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="flex items-center  border-b bg-black px-12 py-4">
        <div className="flex items-center gap-2 w-full justify-between max-w-[1600px] mx-auto ">
          <div className="flex text-white gap-5 items-center">
            <span className="text-sm ">Powered by</span>
            <img
                src={HeaderLogo}
                alt="SupplyScope"
                width={100}
                height={24}
                className="h-6 min-w-[146px]"
              />
          </div>
        <div className="flex gap-2">
          <Button className="bg-white h-10 font-semibold text-[#18181B]"  variant="ghost">Sign Up</Button>
          <Button className="bg-blue-700 h-10 font-semibold bg-[#4F46E5]" variant="default">Login</Button>
        </div>
        </div>
      </header>

      <div className="mb-6 flex items-center justify-between bg-white py-10 px-12 bg-white">
        <div className="flex items-center gap-2 w-full max-w-[1600px] mx-auto justify-between">
            <div className="flex items-center gap-4">
                <img
                      src={tenantLogo}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
              <div>
                <h1 className="text-[1.563rem] text-[#111827] font-semibold">
                  Product Compliance for MyDeal
                </h1>
                <p className="text-[0.875rem] leading-[1rem] text-[#71717A] text-muted-foreground ">Supplier A</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="h-10 font-semibold border-[#DEDEDE]" variant="outline">Finish later</Button>
              <Button className="h-10 font-semibold" variant="default">Final Submit</Button>
            </div>
          </div>
        </div>
      {/* Main Content */}
      <main className="max-w-[1500px]  mx-auto w-full px-4 py-6">
        {/* Message Section */}
        <Card className="mb-6">
          <CardContent className="p-5 border-[#DADADA] rounded-sm">
            <h2 className="mb-4 text-[1.25rem] text-[#111827] font-semibold [&>*]:text-red-500  leading-[1.5rem]">[messageHeader]</h2>
            <p className="text-muted-foreground">[messageText]</p>
            <Alert className="mt-8 bg-blue-50 flex items-center p-4 bg-[#37319B1A] gap-2">
              <img src={alertIcon} alt="alert-icon" />
              <AlertDescription className="flex items-center gap-2 text-[0.875rem] leading-[1.063] font-medium text-[#4F46E5]">
                Make sure to complete all test plan requirements
                <span className="ms-1 font-bold">[tenantSupportMail]</span>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Submit Product Compliance */}
        <Card>
        <CardContent className="p-0 border-[#DADADA] rounded-sm">
            <div className="p-4">
              <h2 className="text-[1.25rem] leading-[1.513rem] text-[#000000] font-semibold">Submit Product Compliance</h2>
              <div className="flex items-start flex-col gap-4">
                <span className="text-sm text-[#7D8696] font-semibold block pt-2">3 items</span>
                <div className="w-full flex items-center justify-between">
                <Progress value={90} className="h-1 w-full max-w-[calc(100%-130px)] [&>div[data-state='indeterminate']]:bg-[#18181B]" />
                <span className="text-sm text-[#7D8696] font-semibold ">
                  90% Uploaded
                </span>
                </div>
              </div>
            </div>
 <div className="px-5" >
 <Alert className="mb-4 bg-yellow-50 flex items-center p-3 border-yellow-400 text-yellow-500">
              <InfoCircledIcon className="h-4 w-4 text-yellow-600" />
              <AlertDescription className=" pt-1">
                Make sure to complete all test plan requirements
              </AlertDescription>
            </Alert>
 </div>
            

            {/* Product Items */}
            <div className="px-5">
            {products.map((product) => (
              <Collapsible key={product.id} className="mb-4 rounded-lg border bg-white">
                <CollapsibleTrigger className="flex w-full items-center justify-between py-4 pl-8 pr-14">
                  <div className="flex items-center gap-4">
                    {(product.status === 'Warning') && (
                      <span className="border mr-6 border-[#F0AF1D] border-[2px] size-7 rounded-full flex justify-center items-center"><span className="w-2 h-[2px] rounded-full bg-[#F0AF1D] block"></span></span>
                    )}
                     {(product.status === 'Success') && (
                      <span className="border mr-6 border-[#12B76A] border-[2px] size-7 rounded-full flex justify-center items-center bg-[#12B76A]"><span className=""><img src={checkIcon} alt="" /></span></span>
                    )}
                    {(product.status === 'Awaiting') && (
                      <span className="border mr-6 border-[#DADADA] border-[2px] size-7 rounded-full flex justify-center items-center"><span className="size-2 rounded-full bg-[#DADADA] block"></span></span>
                    )}
                   
                    <img
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="font-normal text-left text-sm text-[#18181B] mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-[#667085] font-semibold text-sm">{product.brand}</span>
                        <span className="text-[#667085] text-sm">{product.sku}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="border-t p-4">
                    {product.testPlans.length > 0 ? (
                      <table className="w-full">
                        <thead className="bg-[#F1F5F9] text-sm border-b table-fixed">
                          <tr>
                            <th className="p-3 text-left font-medium text-[0.855rem] text-[#667085] w-[13.375rem]">Test Plan</th>
                            <th className="p-3 text-left font-medium text-[0.855rem] text-[#667085] w-[30rem]">Description</th>
                            <th className="p-3 text-left font-medium text-[0.855rem] text-[#667085] w-[24rem]">Standards</th>
                            <th className="p-3 text-left font-medium text-[0.855rem] text-[#667085]">Status</th>
                            <th className="p-3 text-left font-medium text-[0.855rem] text-[#667085]">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.testPlans.map((plan, index) => (
                            <tr key={index} className="border-0">
                              <td className="p-2 text-sm text-[#18181B]">{plan.name}</td>
                              <td className="p-2 text-sm text-[#18181B]">
                                {plan.description}
                                <button className="text-[#4F46E5] text-[0.75rem] block mt-1.5">Read More</button>
                              </td>
                              <td className="p-2 text-sm">
                                <div className="flex flex-wrap items-center gap-1">

                              
                                {plan.standards.map((standard,index) => (
                                  <span className="inline-flex bg-[#F6F5FF] p-2 gap-2  rounded-sm" key={index} too>
                                      <img src={alertIcon} alt="" />
                                      <div className="flex items-center justify-center  bg-gray-100">
                                        <Tooltip  content="Lorem ipsum dolor sit amet consectetur. Ut aliquet lectus in faucibus ornare enim ut. Id dictumst eget sed cum risus. Est velit netus maecenas in id aenean lacus s..." position="top">
                                          <button className="bg-transparent w-auto h-auto ">
                                            {standard}
                                          </button>
                                        </Tooltip>
                                      </div>                                    
                                    </span>
                                ))}
                                <Button type="button" className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm p-2 leading-none me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-0">+more</Button>
                                </div>
                              </td>

                              <td className="p-2 text-sm">
                                {(plan.status=='Incomplete') ? 
                                    <span className="bg-red-100 font-medium text-[0.875rem] h-7 py-2 px-2 rounded-sm text-[#C11574]">{plan.status}</span>
                                  :
                                    <span className="bg-[#EAF9F2] text-[#12B76A] font-medium text-[0.875rem] h-7 py-2 px-2 rounded-sm">{plan.status}</span>
                                }
                              </td>
                              <td className="p-2 text-sm">
                                <Button className="bg-white text-[#18181B] text-sm text-black text-sm  items-center hover:text-white border border-[#DEDEDE] " >
                                  <img src={fileUpload} alt="" />
                                  Review & Upload</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No Test Plans Available</p>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
            </div>

            <div className="mt-5 p-5">
              <Button className="h-10 w-20 bg-black font-semibold text-white text-[0.875rem] leading-[1.059rem]" variant="default">Submit</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default App;
