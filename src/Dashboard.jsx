import React from "react";
// import { Badge, Card, CardHeader, CardContent, CardFooter } from "@shadcn/ui";
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import { CheckCircle, Clock, AlertTriangle, Calendar } from "lucide-react"; // Using Lucide icons for similar icons
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import MainSidebar from "./components/MainSidebar";
import ButtonGroup from "./components/ButtonGroup";
import SamplingSection from "./components/SamplingSection";
import ReviewCard from "./components/ReviewCard";
import { TaskCard } from "./components/Task";

 function Dashboard({ title, status, startDate, endDate, applicableCards, metrics }) {
  const statusStyles = {
    OVERDUE: "bg-red-50 text-red-600 border-red-200",
    PENDING: "bg-yellow-50 text-yellow-600 border-yellow-200",
    DONE: "bg-green-50 text-green-600 border-green-200",
  };

  return (
    <>
    <MainSidebar/>
    <div className="ps-[86px]">
    <Header />
    <ButtonGroup />
    <div className="flex ">
        <Sidebar />
        <div className="w-full flex gap-x-[50px] overflow-x-auto overflow-y-auto max-h-[calc(100vh-170px)] pl-5">
        <div className=" w-[907px] shrink-0">
        <div className="sticky top-0 z-[10] bg-white" ><SamplingSection color="#818094"/></div>
        {/* <ReviewCard/> */}
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard  status="OVERDUE"/>
            <TaskCard status="DONE"/>
            <TaskCard />
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard isExpand={true}/>
            <TaskCard isExpand={true}/>
            <TaskCard isExpand={true}/>
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard />
            <TaskCard />
            <TaskCard />
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard />
            <TaskCard />
            <TaskCard />
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard />
            <TaskCard />
            <TaskCard />
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard />
            <TaskCard />
            <TaskCard />
        </div>
        </div>

        <div className="w-[907px] shrink-0">
        <div className="sticky top-0 z-[10] bg-white" > <SamplingSection color="#4F46E5"/></div>
        {/* <ReviewCard/> */}
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard status="DONE"/>
            <TaskCard />
            <TaskCard />
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard status="DONE" isExpand={true}/>
            <TaskCard isExpand={true}/>
            <TaskCard isExpand={true}/>
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard status="DONE"/>
            <TaskCard />
            <TaskCard />
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard status="DONE"/>
            <TaskCard />
            <TaskCard />
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard status="DONE"/>
            <TaskCard />
            <TaskCard />
        </div>
        <div className="space-x-4 flex border-t-[1px] border-[#E9E9E9] py-[15px]">
            <TaskCard status="DONE"/>
            <TaskCard />
            <TaskCard />
        </div>
        </div>
        </div>
    </div>
    
    </div>
    </>
  );
}

// Default Props
Dashboard.defaultProps = {
  title: "Task Title",
  status: "PENDING",
  startDate: "Mar 30",
  endDate: "Apr 13",
  applicableCards: ["Packaging", "Inspection"],
  metrics: {
    approved: 2,
    pending: 4,
    issues: 1,
    days: 34,
  },
};

export default Dashboard;
