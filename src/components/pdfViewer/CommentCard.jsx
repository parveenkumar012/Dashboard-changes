import ReplySection from './ReplySection';
import FileAttachment from './FileAttachment';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import MessageIcon from "../../assets/message-image.png";
import { Input } from "@/components/ui/input";
import Dropdown from '../Dropdown';

const CommentCard = ({ Key, comment, handleLikeClick, handleReplyClick, handleEditClick, handleDeleteComment, currentReply, setCurrentReply, addCommentReply, getAssignedUser, handleResolveCheck, formatDate, readyForReply,handleReplyLikeClick,readyForPreview}) => {
    return (
        <div className='px-[17px] mb-3' key={Key}>
            <Card className={`custm_card overflow-hidden ${readyForPreview==comment?.id ? 'border-t border-b shadow-[0_0px_10px_0px_#ecbd69]':''}`}>
                {comment?.assignedUser && (
                    <CardHeader className='p-[6px_8px]'>
                        <div className='flex items-center justify-between w-full'>
                            <form className='text-[12px] flex gap-1 items-center'>
                                <Input type="checkbox" name="checkbox"  checked={comment?.status == '2'} onChange={handleResolveCheck} value={comment?.id}/>
                                <span className={`${comment?.status == '2' && 'text-green-600'}`}>
                                    {comment?.status == '2' ? 'Resolved' : 'Resolve'}
                                </span>
                            </form>
                            <p className={`text-[12px] ${comment.status == '2' && 'text-green-600 line-through'}`}>
                                Assigned to <span className='font-semibold'>{getAssignedUser(comment?.assignedUser)}</span>
                            </p>
                        </div>
                    </CardHeader>
                )}
                <CardContent className='px-[10px] pt-3 text-[#1b1b1b]'>
                    <div className='flex justify-between items-center p-[4px_0px]'>
                        <div className='mb-0'>
                            <div className='flex items-center text-[12px]'>
                                {comment?.addToPdf && (
                                    <span className='relative mr-2'>
                                        <img src={MessageIcon} alt="Message" className='w-[22px]' />
                                        <span className='flex gap-2 absolute text-[#0E00FF] top-[1px] left-[8px]'>{Key + 1}</span>
                                    </span>
                                )}
                                <span className='font-bold'>User Test</span>
                            </div>
                        </div>
                        <div className='flex gap-2 mt-0'>
                            <div className='flex items-center text-[12px]'>
                                <span className='text-[12px] text-[#1b1b1b] opacity-50 m-1'>{formatDate(comment?.timestamp)}</span>
                                <Dropdown content="done" position="bottom" number={2} id={comment?.id} handleEditClick={handleEditClick} handleDeleteComment={handleDeleteComment}> <BsThreeDotsVertical /></Dropdown>
                            </div>
                        </div>
                    </div>
                    <p className='text-left text-sm pt-[30px] pb-[40px]'>{comment?.comment}</p>
                    <FileAttachment imageUrl={comment?.imageUrl} />
                </CardContent>
                <ReplySection
                    comment={comment} handleReplyClick={handleReplyClick} currentReply={currentReply} setCurrentReply={setCurrentReply}
                    addCommentReply={addCommentReply} readyForReply={readyForReply} handleLikeClick={handleLikeClick}
                    handleReplyLikeClick={handleReplyLikeClick} formatDate={formatDate}
                />
            </Card>
        </div>
    );
};

export default CommentCard;
