import React from 'react';
import CommentFilter from './CommentFilter';
import CommentCard from './CommentCard';
import CommentInputSection from './CommonInputSection';
import { RxExit } from "react-icons/rx";

const CommentSection = ({ filteredAnnotations, handleFilterRecords, handleLikeClick, handleReplyClick, handleEditClick, handleDeleteComment, currentReply, setCurrentReply, addCommentReply, showUsers, users, assignedUser, handleUserChange, getAssignedUser, errors, handleResolveCheck, formatDate, handleCommentChange, setShowUsers, newComment, changeDocument, imageSrc, saveAnnotation, editAbleComment, showInput, updateAnnotation, readyForReply,currentStatus,handleReplyLikeClick,readyForPreview }) => {
    return (
        <div className='py-8 px-0 w-full lg:max-w-[350px] max-w-[100%] border-[#ccc] border-left-1 overflow-y-auto bg-[#f3f4f6] lg:mt-[0px] mt-[30px] right_side-bar'>
            <h3 className='text-[14px] font-semibold mb-5 text-[#1B1B1B] flex justify-between items-center w-full border-b border-[#ddd] px-[17px] pb-[15px]'> 
                Comment <span className='rotate-180 text-[20px]'> <RxExit /> </span> 
            </h3>
            <CommentFilter handleFilterRecords={handleFilterRecords} currentStatus={currentStatus} />
            {filteredAnnotations?.length === 0 && <p className='px-[17px] text-center'>No Comments yet.</p>}
            {filteredAnnotations.map((comment, key) => (
                <CommentCard
                    Key={key} comment={comment} handleLikeClick={handleLikeClick}
                    handleReplyClick={handleReplyClick} handleEditClick={handleEditClick} handleDeleteComment={handleDeleteComment} currentReply={currentReply}
                    setCurrentReply={setCurrentReply} addCommentReply={addCommentReply} getAssignedUser={getAssignedUser}
                    handleResolveCheck={handleResolveCheck} formatDate={formatDate} readyForReply={readyForReply} key={key}
                    handleReplyLikeClick= {handleReplyLikeClick} readyForPreview = {readyForPreview}
                />
            ))}

            <CommentInputSection
                showUsers={showUsers} setShowUsers={setShowUsers} users={users} assignedUser={assignedUser}
                handleUserChange={handleUserChange} errors={errors} getAssignedUser={getAssignedUser} handleCommentChange={handleCommentChange}
                newComment={newComment} changeDocument={changeDocument} imageSrc={imageSrc} saveAnnotation={saveAnnotation}
                editAbleComment={editAbleComment} showInput={showInput} updateAnnotation={updateAnnotation}
            />
        </div>
    );
};

export default CommentSection;
