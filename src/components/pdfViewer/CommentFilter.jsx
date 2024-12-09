const CommentFilter = ({ handleFilterRecords }) => {
    return (
        <div className='flex border-b border-[#f8f8f8] my-4 gap-8 items-center px-[17px]'>
            <select
                className='custom-select-box bg-white p-[8px_18px] ring-0 outline-[0] appearance-none rounded-md cursor-pointer'
                name=""
                id=""
                onChange={handleFilterRecords}
            >
                <option value="">Showing All</option>
                <option value="1">Open</option>
                <option value="2">Resolved</option>
            </select>
        </div>
    );
};

export default CommentFilter;
