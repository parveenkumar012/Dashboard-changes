import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table } from "@/components/ui/table"
import { BoxIcon, PlusCircle, SearchIcon } from 'lucide-react';
import listView from "../../assets/bread-crumb.svg";
import gridView from "../../assets/grid-view.svg";
import workFlows from "../../assets/workflows-sec.svg";
import workFlowsMain from "../../assets/first-tab.svg";
import { Cross1Icon } from '@radix-ui/react-icons';
import toggleIcon from "../../assets/toggle.svg";
import dots from "../../assets/dots.svg";
import sortingIcon from "../../assets/sorting-icon.svg";
import MainSidebar from "../../components/MainSidebar";
import { Header } from "../../components/Header"

const WorkflowApp = () => {
  const [view, setView] = useState("list_view_2"); // Default view
  // const [workflows,setWorkflows] = useState([]);
  const [workflows, setWorkflows] = useState([
    {
      id: "1",
      name: "NPD Workflow: Oct24",
      status: "1",
      products: ["cloth_image1.png", "cloth_image2.png", "cloth_image3.png"],
      uuid: '141D-96475-8531',
      team: ["PM", "SA", "EG"],
      completion_date: "2024-10-25",
    },
    {
      id: "2",
      name: "NPD Workflow: Oct24",
      status: "1",
      products: ["cloth_image1.png", "cloth_image2.png", "cloth_image3.png"],
      uuid: '141D-96475-8531',
      team: ["PM", "EG"],
      completion_date: "2024-10-25",
    },
    {
      id: "3",
      name: "NPD Workflow: Oct24",
      status: "2",
      uuid: '141D-96475-8531',
      products: ["cloth_image1.png", "cloth_image2.png", "cloth_image3.png"],
      team: ["PM", "SA"],
      completion_date: "2024-10-25",
    },
    {
      id: "4",
      name: "NPD Workflow: Oct24",
      status: "2",
      uuid: '141D-96475-8531',
      products: ["cloth_image1.png", "cloth_image2.png", "cloth_image3.png"],
      team: ["SA", "EG"],
      completion_date: "2024-10-25",
    },
    {
      id: "5",
      name: "NPD Workflow: Oct25",
      status: "3",
      products: ["cloth_image1.png", "cloth_image2.png", "cloth_image3.png"],
      uuid: '141D-96475-8531',
      team: ["PM", "SA", "EG"],
      completion_date: "2024-10-25",
    }
    , {
      id: "6",
      name: "NPD Workflow: Oct26",
      status: "3",
      products: ["cloth_image1.png", "cloth_image2.png", "cloth_image3.png"],
      uuid: '141D-96475-8531',
      team: ["PM", "EG"],
      completion_date: "2024-10-26",
    }
    , {
      id: "7",
      name: "NPD Workflow: Oct27",
      status: "4",
      uuid: '141D-96475-8531',
      products: ["cloth_image1.png", "cloth_image2.png", "cloth_image3.png"],
      team: ["PM", "SA"],
      completion_date: "2024-10-27",
    }
    , {
      id: "8",
      name: "NPD Workflow: Oct27",
      status: "4",
      uuid: '141D-96475-8531',
      products: ["cloth_image1.png", "cloth_image2.png"],
      team: ["SA", "EG"],
      completion_date: "2024-10-27",
    },
    {
      id: "9",
      name: "NPD Workflow: Oct28",
      status: "5",
      uuid: '141D-96475-8531',
      products: ["cloth_image1.png", "cloth_image2.png"],
      team: ["PM", "SA"],
      completion_date: "2024-10-27",
    }
    , {
      id: "10",
      name: "NPD Workflow: Oct29",
      status: "5",
      uuid: '141D-96475-8531',
      products: ["cloth_image1.png", "cloth_image3.png"],
      team: ["SA", "EG"],
      completion_date: "2024-10-29",
    }
    // Add more workflow objects or keep empty for testing list_view_1
  ]);
  const [statuses, setStatuses] = useState([
    {
      id: '1',
      name: 'Sampling'
    },
    {
      id: '2',
      name: 'Ideation'
    },
    {
      id: '3',
      name: 'QA Reviews'
    },
    {
      id: '4',
      name: 'Production'
    }, {
      id: '5',
      name: 'Kick Off'
    }
  ]);

  const statusName = (id) => {
    return statuses.filter(status => status.id == id)[0]?.name;
  }

  // Switch Views Based on Data and User Input
  const renderView = () => {
    if (workflows.length === 0) {
      return <NoWorkflows />;
    }
    if (view === "list_view_2") {
      return <ListView2 workflows={workflows} statusName={statusName} />;
    }
    if (view === "list_view_3") {
      return <ListView3 workflows={workflows} statuses={statuses} />;
    }
  };

  return (
    <>
      {/* <MainSidebar /> */}
      <div className="p-[30px] bg-[#F1F5F9] h-screen overflow-y-auto">
        {/* <Header /> */}
        <div className="flex justify-between items-center mb-7">
          <div className='flex items-center gap-6'>
            <h1 className="text-[29.32px] text-[#18181B] leading-[33.33px] font-semibold m-0 ">Workflows</h1>
            <span className='bg-[#18181B] inline-flex text-[13px] leading-[15.73px] rounded-[10px] font-semibold text-white w-12 h-6 justify-center items-center' >Beta</span>
          </div>
          <button className='flex bg-[#1B1B1B] leading-[17px] text-white rounded-[5px] text-[14px] justify-center max-w-[165px] h-[35px] items-center font-normal gap-[14px] w-full'>
            <PlusCircle className='size-4' />Create Workflow
          </button>
        </div>
        <div className="w-full mb-5">
          <div className="flex items-center gap-x-[25px] w-full border-b-[1px] border-[#E4E4E7] pb-0 md-pb-0 overflow-x-auto">
            <Button variant="link" className="flex items-center text-[#4F46E5] group !hover:text-[#4F46E5] nav-item hover:no-underline border-b border-[#4F46E5] rounded-none p-0 h-auto py-[11px]">
              <img src={workFlowsMain} alt="workFlowsMain" />
              <span className=" ">Your Workflows</span>
            </Button>
            <Button variant="link" className="flex items-center text-[#7D8696] group nav-item hover:text-[#4F46E5]  p-0 h-auto py-[11px] border-b border-transparent hover:border-[#4F46E5] rounded-none  hover:no-underline">
              <img src={workFlows} alt="workFlows" />
              <span>Workflows Shared With You</span>
            </Button>
          </div>
        </div>
        <div className=' mb-2 flex justify-between'>
          <div className='w-full max-w-[330px] relative'>
            <input type="search" placeholder='Search' className='!rounded-[10px] border border-[#DADADA] h-9 text-[13px] leading-[16px] w-full pl-[45px]' />
            <button className='absolute left-[16px] top-[11px]'><SearchIcon className='size-[14px] text-[#4A505A]' /></button>
          </div>
          <div className='flex gap-1'>
            <Button className={`bg-white list-view p-0 w-9 h-9 hover:bg-white border border-[#DADADA] rounded-[6px] ${(view == 'list_view_2') ? 'Active' : ''}`} onClick={() => setView("list_view_2")}>
              <img src={listView} alt="list-view" />
            </Button>
            <Button className={`bg-white grid-view p-0 hover:bg-white w-9 h-9 border border-[#DADADA] rounded-[6px] ${(view == 'list_view_3') ? 'Active' : ''}`} onClick={() => setView("list_view_3")}>
              <img src={gridView} alt="grid-view" />
            </Button></div>
        </div>
        <div className='flex gap-2 mb-5 '>
          <button className='flex h-[37px] border leading-[14px]  rounded-[7px] justify-center min-w-[190px] text-[#667085] border-[#DADADA] bg-white p-2 gap-2 items-center'>
            <PlusCircle className='text-[#667085] size-4' />
            Status
            <span className='flex text-[#18181B] font-medium rounded-[5px] bg-[#F1F5F9] gap-[10px] text-[14px] leading-[14px] p-2'>Sampling <Cross1Icon /></span>
          </button>
          <button className='flex h-[37px] leading-[14px] border border-dashed rounded-[7px]  text-[#667085] border-[#DADADA] bg-white p-2 gap-2 items-center'>
            <PlusCircle className='text-[#667085] size-4' />
            Products
          </button>
          <button className='flex h-[37px] leading-[14px] border border-dashed rounded-[7px]  text-[#667085] border-[#DADADA] bg-white p-2 gap-2 items-center'>
            <PlusCircle className='text-[#667085] size-4' />
            Trading Partner
          </button>
          <button className='flex h-[37px] leading-[14px] border border-dashed rounded-[7px]  text-[#667085] border-[#DADADA] bg-white p-2 gap-2 items-center'>
            <PlusCircle className='text-[#667085] size-4' />
            Members
          </button>
          <button className='flex border-0 h-[37px] leading-[14px]  rounded-[7px]  text-[#982848] border-[#DADADA] bg-white p-2 gap-2 items-center'>
            Reset all filters
          </button>
          <button className='flex h-[37px] ml-auto leading-[14px] border rounded-[7px]  text-[#18181B] border-[#DADADA] bg-white p-2 gap-2 items-center'>
            <img src={toggleIcon} alt="toggleIcon" />
            View
          </button>
        </div>
        {renderView()}
      </div>
    </>

  );
};

// View 1: No Workflows Found
const NoWorkflows = () => (
  <Card className="flex items-center justify-center h-64">
    <div className="text-center">
      <BoxIcon name="box" size={48} />
      <h2 className="text-lg font-semibold">No workflows found</h2>
      <p>Available workflows will appear here.</p>
    </div>
  </Card>
);

// View 2: Table View
const ListView2 = ({ workflows, statusName }) => (
  <div>
    <div className='overflow-x-auto '>
      <Table className='border-0 border-separate border-spacing-0 min-w-[1454px]'>
        <thead>
          <tr>
            <th className='relative text-left w-[16%] border-t border-b border-l left-head p-4 border-[#DADADA]  text-[#667085]  font-medium text-[14px] leading-14px'>Workflow Name
              <img src={sortingIcon} className='absolute right-[15px] top-[20px]' />
            </th>
            <th className='relative text-left w-[16%] border-t border-b p-4 border-[#DADADA]  text-[#667085]  font-medium text-[14px] leading-14px'>Workflow Id
              <img src={sortingIcon} className='absolute right-[15px] top-[20px]' />
            </th>
            <th className='relative text-left w-[16%] border-t border-b p-4 border-[#DADADA]  text-[#667085]  font-medium text-[14px] leading-14px'>Products
              <img src={sortingIcon} className='absolute right-[15px] top-[20px]' />
            </th>
            <th className='relative text-left w-[16%] border-t border-b p-4 border-[#DADADA]  text-[#667085]  font-medium text-[14px] leading-14px' >Workflow Teams
              <img src={sortingIcon} className='absolute right-[15px] top-[20px]' />
            </th>
            <th className='relative text-left w-[16%] border-t border-b p-4 border-[#DADADA]  text-[#667085]  font-medium text-[14px] leading-14px' >Completion Date
              <img src={sortingIcon} className='absolute right-[15px] top-[20px]' />
            </th>
            <th className='relative text-left w-[16%] border-t border-b p-4 border-[#DADADA]  text-[#667085]  font-medium text-[14px] leading-14px' >Status
              <img src={sortingIcon} className='absolute right-[15px] top-[20px]' />
            </th>
            <th className='relative text-left w-[16%] border-t border-b border-r right-head  p-4 border-[#DADADA]  text-[#667085]  font-medium text-[14px] leading-14px'></th>
          </tr>
        </thead>
        <tbody>
          {workflows.map((workflow) => (
            <tr key={workflow.id}>
              <td className='bg-white p-4 text-[#18181B] leading-[14px] font-medium'>{workflow.name}</td>
              <td className='bg-white p-4 text-[#18181B] leading-[14px] font-medium'>{workflow.uuid}</td>
              <td className='bg-white p-4 text-[#18181B] leading-[14px] font-medium'>
                <div className='flex -space-x-2'>
                  {
                    workflow.products.map((product, key) => (
                        <img className="w-[36px] h-[36px] rounded-full z-[3] border border-[5px ] border-[#e1e1e1]" src={`/src/assets/${product}`} alt="product" key={key} />
                    ))
                  }
                </div>
              </td>
              <td className='bg-white p-4 text-[#18181B] leading-[14px] font-medium'><span className="flex -space-x-2">
                <div className="w-[36px] h-[36px] rounded-full bg-yellow-400 border-white flex items-center justify-center text-white z-[3] border border-[5px ] border-white">PM</div>
                <div className="w-[36px] h-[36px] rounded-full bg-green-400 border-white flex items-center justify-center text-white z-[2] border border-[5px ] border-white">PM</div>
                <div className="w-[36px] h-[36px] rounded-full bg-purple-400 border-white flex items-center justify-center text-white z-[1]">PM</div>
              </span></td>
              <td className='bg-white p-4 text-[#18181B] leading-[14px] font-medium'>{workflow.completion_date}</td>
              <td className='bg-white p-4 text-[#18181B] leading-[14px] font-medium'><span className='text-[#4F46E5] flex items-center gap-1'><span className='size-2 bg-[#4F46E5] rounded-full block'></span>{statusName(workflow.status)}</span></td>

              <td className='bg-white p-4 text-[#18181B] leading-[14px] font-medium'><img src={dots} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <span className='text-[#7D8696] text-[14px] leading-[17px] block mt-5'>Showing 1 to 4 of 4 results</span>
  </div>
);

// View 3: Card View
const ListView3 = ({ workflows, statuses }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 bg-white p-5 rounded-[10px] border border-[#DADADA]">
      {
        statuses.map((status) => (
          <div>
            <Card className='bg-[#EDECFF] p-4 rounded-[10px] mb-4 shadow-none border-0' key={status.id}>
              <h3 className=" bg-[#E4E2FF] inline-flex p-2 gap-1 rounded-[999px] text-[14px] leading-[14px] text-[#4F46E5] items-center"><span className='size-2 bg-[#4F46E5] rounded-full ' ></span>{status?.name}</h3>
            </Card>
            <div className='p-[10px] rounded-[10px] bg-[#EDECFF] flex flex-col gap-[12px]'>
              {workflows.map((workflow) => (
                (status.id == workflow.status &&
                  <Card className='rounded-[7px] p-[10px] bg-white shadow-none border-0' key={workflow.id}>
                    <h3 className="flex justify-between gap-1 items-center font-medium text-[16px] leading-[16px] mb-2">{workflow.name} <span><img src={dots} alt="dots" className='rotate-90' /></span></h3>
                    <p className='flex flex-col gap-1 mt-4 mb-4'><span className='text-[11px] leading-[11px] text-[#1B1B1B]'>Products:</span>{
                      <div className='flex -space-x-2'>
                        {
                          workflow.products.map((product, key) => (
                              <img className="w-[36px] h-[36px] rounded-full z-[3] border border-[5px ] border-[#e1e1e1]" src={`/src/assets/${product}`} alt="product" key={key} />
                          
                          ))
                        }
                     </div>
                    }
                    </p>
                    <p className='flex flex-col gap-1 '><span className='text-[11px] leading-[11px] text-[#1B1B1B]'>Completion Date:</span> {workflow.completion_date}</p>
                  </Card>
                )
              ))}
            </div>

          </div>
        ))
      }
    </div>
  </div>
);

export default WorkflowApp;