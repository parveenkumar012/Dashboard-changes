import { Button } from "../ui/button";
import { CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

const ReplySection = ({ comment, handleReplyClick, currentReply, setCurrentReply, addCommentReply, readyForReply, handleLikeClick,handleReplyLikeClick,formatDate }) => {
    return (
        <>
            {(comment?.id != readyForReply) && (
                <div className='flex items-center justify-between px-[10px] py-[10px] border-t border-[#ddd]'>
                    <span onClick={() => { handleLikeClick(comment?.id) }} className='cursor-pointer text-[19px]'> 
                        {comment?.like ? <BiSolidLike /> : <BiLike />} 
                    </span>
                    <span className='text-[12px] text-[#444] font-semibold cursor-pointer' onClick={() => handleReplyClick(comment?.id)}>
                        <span>{(comment?.reply) ? comment?.reply.length : '0'}</span> Reply
                    </span>
                </div>
            )}
            {comment?.reply?.map((message, key) => (
                <div className="px-[10px] mb-3" key={key}>
                    <div className=" pl-5 border-l border-l-[#444]">
                        <div className='flex gap-2 pt-4 mb-1 w-full'>
                            <div className='flex items-center gap-2 w-full'>
                                <div class="text-[10px] top_row flex items-center justify-between w-full">
                                    <h3 className="flex text-[10px] items-center gap-1" ><span className="w-[25px] h-[25px] bg-[#0000ff85] flex justify-center items-center rounded-full text-white text-[10px]">UT</span>User Test</h3>
                                    <p>{formatDate(message?.date)}</p>
                                </div>
                            </div>
                        </div>
                        <p className='text-left text-sm pt-[6px] pb-[8px]'>{message?.commentReply}</p>
                        <span onClick={() => { handleReplyLikeClick(comment?.id,key,message?.like) }} className='cursor-pointer text-[18px]'> 
                                    {message?.like ? <BiSolidLike /> : <BiLike />} 
                        </span>
                    </div>
                </div>
            ))}
            {(comment?.id == readyForReply) && (
                <CardFooter className='p-0 px-[10px] py-[10px]'>
                    <p className='flex gap-1'>
                        <Input 
                            className='outline-none custom_reply' placeholder='Add Reply' value={currentReply} 
                            onChange={(e) => (setCurrentReply(e.target.value))} 
                        />
                        <Button onClick={() => addCommentReply(comment?.id, null, null)} className="AddReply" value={comment?.id}>
                            Add Reply
                        </Button>
                    </p>
                </CardFooter>
            )}
        </>
    );
};

export default ReplySection;
