
import { LuUserPlus } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CommentInputSection = ({ showUsers, setShowUsers, users, assignedUser, handleUserChange, errors, getAssignedUser, handleCommentChange, newComment, changeDocument, imageSrc, saveAnnotation, editAbleComment, showInput, updateAnnotation }) => {
    return (
        <div className='w-full fixed lg:max-w-[330px] max-w-[280px] bottom-[0px] pb-[15px] right-[10px]'>
            <div className='py-[15px] text-[14px] flex items-center gap-[20px]'>
                <p className='font-bold'>Add Comment</p>
                <p className='flex flex-1 items-center gap-2 text-[14px] custom-select-box custom-button'>
                    <Button className='max-w-[30px] h-[30px] user_icon w-full flex justify-center items-center shadow-lg rounded-full' onClick={() => setShowUsers(true)}><LuUserPlus /></Button>
                    {(users?.length > 0 && showUsers) && (
                        <Select onValueChange={handleUserChange} className='bg-white p-[8px_18px] ring-0 outline-[0] rounded-md' key={1}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Choose User" />
                            </SelectTrigger>
                            <SelectContent>
                            {users.map(item => (
                                <SelectItem value={item?.id} selected={item.id === assignedUser}>{item?.name}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    )}
                    {assignedUser ? 'Assigned to ' + getAssignedUser(assignedUser) : 'No Assignee'}
                </p>
            </div>
            <span className='text-red-700'>{errors?.commentErr}</span>
            <div className='bg-white'>
                <div className='border border-[#ddd] rounded-[4px]'>
                    <form action="">
                        <Textarea value={newComment} onChange={handleCommentChange} rows="2" className='w-full border-0 focus:outline-none focus-visible:outline-none focus-visible:ring-[0] resize-none custm_textar' />
                        <div className='flex items-center justify-between border-t border-[#ddd] px-[12px] py-[10px]'>
                            <div className='flex items-center relative gap-2 bg-[#d4d4d454] p-[6px_10px] rounded-full'>
                                <i className="fa fa-paperclip text-[#444]" aria-hidden="true"></i>
                                <p className='text-[#444] text-[12px]'>Attach files</p>
                                <Input className='absolute top-0 left-0 w-full opacity-0 cursor-pointer z-10' type="file" id="myFile" name="filename" onChange={changeDocument} accept="image/*" />
                            </div>
                            {imageSrc && <img src={imageSrc} alt="Uploaded" className='max-w-5 max-h-5' />}
                            {(editAbleComment && !showInput) && (
                                <Button type='button' className='mt-0 bg-[#0000ff85] text-[12px]' onClick={updateAnnotation}>Edit Comment</Button>
                            )}
                            {!editAbleComment && (
                                <Button type='button' className='mt-0 bg-[#0000ff85] text-[12px]' onClick={saveAnnotation}>Add Comment</Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentInputSection;
