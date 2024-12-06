import { Button } from "@/components/ui/button";
import productImage from "../assets/product.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TooltipDemo = ({children})=>{
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-pointer bg-[#1B1B1B]  rounded-[5px] px-[9px] py-[1px]" asChild>
          <Button className="text-[10px] text-white h-auto w-auto p-0" >{children}</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-white shadow-md">
        <div className="" >
             <div className="flex" >
              <span className="size-10 rounded-full overflow-hidden">
                <img src={productImage} alt="product image" />
              </span>
              <div className="w-full max-w-[calc(100%-50px)] pl-[10px]">
              <h4 className="text-[13px] text-[#667085] leading-[13px] font-medium mb-1" >PP Solid - Green Cap</h4>
              <span className="text-[#1B1B1B] text-[10px] leading-[10px]">Materials</span>
              </div>
             </div>
             <div className="inline-flex bg-[#FFF7E4] rounded-full p-[5.5px_10px_5.5px_5.5px] gap-2 mt-[10px]">
                <span className="size-2 rounded-full bg-[#F0AF1D]"></span>
                <p className="uppercase text-[#F0AF1D] text-[9px] leading-[11px] m-0"> Pending</p>

                 </div>
            </div>  
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default TooltipDemo;