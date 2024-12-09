import { Button } from "../ui/button";
import { CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import profileIcon from "../../assets/Frame 1000003152.png";

const ReplySection = ({ comment, handleReplyClick, currentReply, setCurrentReply, addCommentReply, readyForReply, handleLikeClick }) => {
    return (
        <>
            {(comment?.id != readyForReply) && (
                <div className='flex items-center justify-between px-[10px] py-[10px] border-t border-[#ddd]'>
                    <span onClick={() => { handleLikeClick(comment?.id) }} className='cursor-pointer'> {comment?.like ? <BiSolidLike /> : <BiLike />} </span>
                    <span className='text-[12px] text-[#444] font-semibold cursor-pointer' onClick={() => handleReplyClick(comment?.id)}>
                        <span>{(comment?.reply) ? comment?.reply.length : '0'}</span> Reply
                    </span>
                </div>
            )}
            {comment?.reply?.map((message, key) => (
                <div key={key}>
                    <div className='flex gap-2 pt-4 mb-1'>
                        <div className='flex items-center gap-2'>
                            <div className='size-7'>
                                <img src={profileIcon} className='w-full h-full' alt="" />
                            </div>
                            <span> <span className='font-bold text-[14px]'>User Test</span> </span>
                        </div>
                    </div>
                    <p className='text-left text-sm pt-[6px] pb-[8px]'>{message.commentReply}</p>
                </div>
            ))}
            {(comment?.id == readyForReply) && (
                <CardFooter className='p-0 px-[10px] py-[10px]'>
                    <p className='flex gap-1'>
                        <Input className='outline-none custom_reply' placeholder='Add Reply' value={currentReply} onChange={(e) => (setCurrentReply(e.target.value))} />
                        <Button onClick={() => addCommentReply(comment?.id, null, null)} className="AddReply" value={comment?.id}>Add Reply</Button>
                    </p>
                </CardFooter>
            )}
        </>
    );
};

export default ReplySection;
