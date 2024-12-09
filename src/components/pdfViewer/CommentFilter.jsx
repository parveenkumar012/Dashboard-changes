import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CommentFilter = ({ handleFilterRecords, currentStatus }) => {
    return (
        <div className='flex border-b border-[#f8f8f8] my-4 gap-8 items-center px-[17px] custom-select-boxs'>
            <Select onValueChange={handleFilterRecords} className=' bg-white p-[8px_18px] ring-0 outline-[0] appearance-none rounded-md cursor-pointer'>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Showing All" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Showing All</SelectItem>
                    <SelectItem value="1">Open</SelectItem>
                    <SelectItem value="2">Resolved</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default CommentFilter;
