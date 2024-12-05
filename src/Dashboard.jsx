import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card"
import { Header } from "./components/Header";
import MainSidebar from "./components/MainSidebar";
import ButtonGroup from "./components/ButtonGroup";
import SamplingSection from "./components/SamplingSection";
import { TaskCard } from "./components/Task";
import productImg from "./assets/product.png";
import { Button } from "@/components/ui/button"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"; // Arrow icon from lucide-react

  
function Dashboard({
    title = "Task Title", status = "PENDING", startDate = "Mar 30", endDate = "Apr 13", applicableCards = ["Packaging", "Inspection"], 
    metrics= {approved: 2, pending: 4, issues: 1, days: 34}
  }) {

  const [products, setProducts] = useState([]);

  function expandCollapse(data){
    const row = data[0]-1;
    var allProducts = [
      {
        id: 1,
        name: "Pink Water Color Bibs",
        sku: "BBU-WCF-BIB-AOPPNK",
        imageUrl: productImg, // Replace with actual image URL
        firstSample : {
            task1:1,task2:2,task3:3
        },
        secondSample : {
            task1:1,task2:2,task3:3
        },
        status : ["OVERDUE","DONE","PENDING"],
        isExpand:false
      }, {
        id: 2,
        name: "Pink Water Color Bibs",
        sku: "BBU-WCF-BIB-AOPPNK",
        imageUrl: productImg,
        firstSample : {
            task1:1,task2:2,task3:3
        },
        secondSample : {
            task1:1,task2:2,task3:3
        },
        status : ["OVERDUE","DONE","PENDING"],
        isExpand:false
      }, {
        id: 3,
        name: "Pink Water Color Bibs",
        sku: "BBU-WCF-BIB-AOPPNK",
        imageUrl: productImg,
        firstSample : {
            task1:1,task2:2,task3:3
        },
        secondSample : {
            task1:1,task2:2,task3:3
        },
        status : ["OVERDUE","DONE","PENDING"],
        isExpand:false
      }, {
        id: 4,
        name: "Pink Water Color Bibs",
        sku: "BBU-WCF-BIB-AOPPNK",
        imageUrl: productImg,
        firstSample : {
            task1:1,task2:2,task3:3
        },
        secondSample : {
            task1:1,task2:2,task3:3
        },
        status : ["OVERDUE","DONE","PENDING"],
        isExpand:false
      }, {
        id: 5,
        name: "Pink Water Color Bibs",
        sku: "BBU-WCF-BIB-AOPPNK",
        imageUrl: productImg,
        firstSample : {
            task1:1,task2:2,task3:3
        },
        secondSample : {
            task1:1,task2:2,task3:3
        },
        status : ["OVERDUE","DONE","PENDING"],
        isExpand:false
      }, {
        id: 6,
        name: "Pink Water Color Bibs",
        sku: "BBU-WCF-BIB-AOPPNK",
        imageUrl: productImg,
        firstSample : {
            task1:1,task2:2,task3:3
        },
        secondSample : {
            task1:1,task2:2,task3:3
        },
        status : ["OVERDUE","DONE","PENDING"],
        isExpand:false
      }
    ];
    if(data[1] == true){
        allProducts[row].isExpand = false;
    }
    else{
        allProducts[row].isExpand = true;
    }
    setProducts(()=>allProducts);
    products[row].isExpand = true;
  }
  useEffect(() => {
    // Sample data for products
    const allProducts = [
        {
          id: 1,
          name: "Pink Water Color Bibs",
          sku: "BBU-WCF-BIB-AOPPNK",
          imageUrl: productImg, // Replace with actual image URL
          firstSample : {
              task1:1,task2:2,task3:3
          },
          secondSample : {
              task1:1,task2:2,task3:3
          },
          status : ["OVERDUE","DONE","PENDING"],
          isExpand:false
        }, {
          id: 2,
          name: "Pink Water Color Bibs",
          sku: "BBU-WCF-BIB-AOPPNK",
          imageUrl: productImg,
          firstSample : {
              task1:1,task2:2,task3:3
          },
          secondSample : {
              task1:1,task2:2,task3:3
          },
          status : ["OVERDUE","DONE","PENDING"],
          isExpand:false
        }, {
          id: 3,
          name: "Pink Water Color Bibs",
          sku: "BBU-WCF-BIB-AOPPNK",
          imageUrl: productImg,
          firstSample : {
              task1:1,task2:2,task3:3
          },
          secondSample : {
              task1:1,task2:2,task3:3
          },
          status : ["OVERDUE","DONE","PENDING"],
          isExpand:false
        }, {
          id: 4,
          name: "Pink Water Color Bibs",
          sku: "BBU-WCF-BIB-AOPPNK",
          imageUrl: productImg,
          firstSample : {
              task1:1,task2:2,task3:3
          },
          secondSample : {
              task1:1,task2:2,task3:3
          },
          status : ["OVERDUE","DONE","PENDING"],
          isExpand:false
        }, {
          id: 5,
          name: "Pink Water Color Bibs",
          sku: "BBU-WCF-BIB-AOPPNK",
          imageUrl: productImg,
          firstSample : {
              task1:1,task2:2,task3:3
          },
          secondSample : {
              task1:1,task2:2,task3:3
          },
          status : ["OVERDUE","DONE","PENDING"],
          isExpand:false
        }, {
          id: 6,
          name: "Pink Water Color Bibs",
          sku: "BBU-WCF-BIB-AOPPNK",
          imageUrl: productImg,
          firstSample : {
              task1:1,task2:2,task3:3
          },
          secondSample : {
              task1:1,task2:2,task3:3
          },
          status : ["OVERDUE","DONE","PENDING"],
          isExpand:false
        }
    ];
    setProducts(allProducts)
  }, []);

  const renderTaskCards = (tasks, isExpand) => (
    tasks.map((task, index) => (
      <TaskCard key={index} status={task} isExpand={isExpand}/>
    ))
  );

  return (
    <>
      <MainSidebar/>
      <div className="ps-[50px] md:ps-[86px]">
        <Header />
        <div className="">
          <div className=" shrink-0">
              {/* Header */}
              <div className="overflow-auto max-h-[calc(100vh-170px)]" >
                <ButtonGroup  />
                <div className="flex border-b-[1px]  sticky top-0 z-30 bg-white w-[1920px]  lg:w-[calc(100%+122.9%)] xl:w-[calc(100%+335px)]">
                  <div className="flex flex-col justify-end items-baseline flex-wrap h-[220px] sticky left-0 z-20 max-w-[116px] min-w-[116px]  md:max-w-[175px] md:min-w-[175px]  w-full lg:max-w-[227px] pl-3 lg:pl-6 lg:min-w-[227px] pr-[13px] bg-white pt-4 pb-5">
                    <h3 className=" text-sm md:text-base font-semibold w-full flex flex-col md:flex-row  md:items-end gap-x-[5px]">
                      Products <span className="text-gray-500 text-[8px] md:text-[12px]">({products.length} products)</span>
                    </h3>
                    <Button className="flex items-center space-x-2 px-[10px] md:px-[19px] bg-transparent hover:bg-[#1B1B1B] text-gray border border-[#DADADA] shadow-none mt-[7px] group">
                      <span className="text-black text-[10px] md:text-[14px] group-hover:text-white">+ Add Product</span>
                    </Button>
                  </div>
                  <div className="sticky top-0 z-[10] bg-white w-full  min-w-[932px] pr-[12px] lg:pr-[25px] pt-4 pb-5" ><SamplingSection color="#818094"/></div>
                  <div className="sticky top-0 z-[10] bg-white  min-w-[932px] pl-[12px] lg:pl-[25px] pt-4 pb-5" ><SamplingSection color="#4F46E5"/></div>
                </div>
                {products.map((product) => (
                  <div className="flex border-b-[1px] bg-white w-[1920px]  lg:w-[calc(100%+122.9%)] xl:w-[calc(100%+335px)]">
                    <div className="sticky left-0 z-20  w-full max-w-[116px] min-w-[116px] md:max-w-[175px] md:min-w-[175px] lg:max-w-[227px] pl-3 lg:pl-6 lg:min-w-[227px] pr-[13px] bg-white pt-4 pb-5" >
                      <Card key={product.id} className=" pl-24 flex items-center flex-wrap  px-0 relative shadow-none rounded-none border-x-0 border-t-0  border-b-[0px]">
                        {/* Product Image */}
                        <div className="w-full">
                          <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded mr-4"/>
                        </div>
            
                        {/* Product Info */}
                        <div className="flex flex-col mt-[21px]">
                          <h4 className="font-medium text-[#1B1B1B] text-[13px]">{product.name}</h4>
                          <p className="text-[#667085] text-[10px]">{product.sku}</p>
                        </div>
            
                        {/* Expand Icon */}
                        <Button className="" onClick={()=>(expandCollapse([product?.id,product?.isExpand]))}>
                            {product?.isExpand == true ? 
                              <ChevronUpIcon className="absolute top-[10px] right-[10px]  w-5 h-5 text-[#1b1b1b]"/>
                              :
                              <ChevronDownIcon className="absolute top-[10px] right-[10px]  w-5 h-5 text-[#1b1b1b]"/>
                            }
                        </Button>
                      </Card>
                    </div>
                    <div className="bg-white w-full items-start  min-w-[932px] pr-[12px] lg:pr-[25px] grid grid-cols-3 space-x-4 pt-4 pb-5">
                      {renderTaskCards(product.status, product.isExpand)}
                    </div>
                    <div className="bg-white  min-w-[932px] lg:pl-[25px] pl-[12px]  grid grid-cols-3 space-x-4 items-start pt-4 pb-5">
                      {renderTaskCards(product.status, product.isExpand)}
                    </div>  
                  </div>
                ))}
              </div>
          </div> 
        </div>
      </div>
    </>
  );
}


export default Dashboard;
