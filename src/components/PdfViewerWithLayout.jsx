import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { PDFDocument, PDFName, PDFDict, PDFString } from 'pdf-lib'; // Import pdf-lib for PDF manipulation
import test_pdf from '../assets/pdfs/test_pdf.pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';
import commentIcon from '../assets/comment-icon.png';
import likeIcon from "../assets/like.png";
import likedIcon from "../assets/liked.png";
import DeleteIcon from "../assets/delete.png";
import EditIcon from "../assets/edit_button.png";
import MessageIcon from "../assets/message-image.png";
import CommentSection from './pdfViewer/CommentSection';

const PdfViewerWithLayout = () => {
    const defaultLayout = defaultLayoutPlugin();
    const [annotations, setAnnotations] = useState([]); // Store annotations (positions and comments of all)
    const [newComment, setNewComment] = useState(''); // Store the current comment input
    const [showInput, setShowInput] = useState(false); // Control visibility of the comment input box
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 }); // Store the click position in PDF
    const [pdfUrl, setPdfUrl] = useState(test_pdf); // Path to the PDF file
    const [scale, setScale] = useState({scale: 1}); // To store and track the PDF scale factor
    const [readyForReply, setReadyForReply] = useState(null); // Text of the current comment
    const [currentReply, setCurrentReply] = useState(""); // Text of the current comment
    const [currentPageIndex, setCurrentPageIndex] = useState(0); //Clicked page index
    const [initialPage, setInitialPage] = useState(0); //Page on screen after pdf load
    const [users, setUsers] = useState([]); // all users
    const [showUsers, setShowUsers] = useState(null); //just store the status that have to show users listing or not
    const [assignedUser, setAssignedUser] = useState(null); // assign the user for comment
    const [errors, setErrors] = useState({}); // capture errors
    const [editAbleComment, setEditAbleComment] = useState(null); //store user curretly want to edit the comment
    const [currentStatus, setCurrentStatus] = useState(null); // for capturing current status from showing all, open etc
    const [imageSrc, setImageSrc] = useState(null); //set the image url when user select the image
    let [count, setCount] = useState(0); // count comments
    const addingCommentEventRef = useRef(false); //verify that currently user want to add or edit the comment 

    const handlePdfClick = (e) => {
        const pdfCanvas = e.target.closest('.rpv-core__text-layer');
        if (pdfCanvas) {

            //if click of pdf close tooltip first
            const tooltips = document.querySelectorAll('.custom-tooltip');
            tooltips.forEach(tooltip => {
                tooltip.style.display = 'none';
            });

            const container = pdfCanvas.getBoundingClientRect();
            const testId = pdfCanvas.getAttribute('data-testid');
            const pageNumber = testId.split('-')[2];

            const x = e.clientX - container.left;
            const y = e.clientY - container.top;

            // Apply the scale factor to adjust the coordinates
            const scaledX = x / scale.scale;
            const scaledY = y / scale.scale;
            
            // Set position for the input box to appear at clicked position
            setClickPosition({ x: scaledX, y: scaledY });
            setShowInput(true); // Show the comment input box
            setCurrentPageIndex(pageNumber);
        }
    };

    // Handle comment text input
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };


    const filteredAnnotations = useMemo(() => {
        if (currentStatus) {
            return annotations.filter(annotation => annotation.status == currentStatus);
        } else {
            return annotations;
        }
    }, [annotations, currentStatus]);

    // Save annotation (icon) and position when user submits it
    const saveAnnotation = async () => {
        if (newComment.trim()) {
            let updatedAnnotations;
            count = count + 1;
            setAnnotations(prevAnnotations => {
                updatedAnnotations = [...prevAnnotations, {
                    id: count, x: clickPosition.x, y: clickPosition.y, comment: newComment, pageIndex: currentPageIndex, addToPdf: showInput, assignedUser: assignedUser, status: 1, imageUrl: imageSrc,
                    timestamp: new Date().toLocaleDateString()
                }];
                return updatedAnnotations;
            });

            setCount(count);
            setNewComment(''); // Clear the input after saving
            setShowInput(false); // Hide the input box
            setAssignedUser(false);
            setImageSrc(null);
            setErrors({ ...errors, commentErr: '' })
            addingCommentEventRef.current = true;
            if (showInput) {
                await saveAnnotationsToPdf(updatedAnnotations, 1);
            }
        } else {
            setErrors({ ...errors, commentErr: 'Please add comment first' })
        }
    };

    const saveAnnotationsToPdf = async (annotations, check) => {
        let url = (check == 0) ? test_pdf : pdfUrl;
        const pdfBytes = await fetch(url).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const logoImageBytes = await fetch(commentIcon).then((res) => res.arrayBuffer());
        const logo = await pdfDoc.embedPng(logoImageBytes);
        const logoDims = logo.scale(0.05); // Scale the logo
        annotations.forEach((annotation, key) => {
            if (!annotation.added && annotation.addToPdf == true) {
                const page = pdfDoc.getPages()[annotation.pageIndex || 0]; // Get the page for annotation

                const scaledX = annotation.x * scale.scale;
                const scaledY = page.getHeight() - (annotation.y * scale.scale); // Adjust Y for PDF coordinates

                // Create the popup annotation (tooltip)
                const popupAnnotation = PDFDict.withContext(pdfDoc.context);
                popupAnnotation.set(PDFName.of('Type'), PDFName.of('Annot'));
                popupAnnotation.set(PDFName.of('Subtype'), PDFName.of('Text')); // Tooltip subtype
                popupAnnotation.set(PDFName.of('Rect'), pdfDoc.context.obj([
                    scaledX, scaledY, scaledX + logoDims.width, scaledY + logoDims.height
                ]));
                popupAnnotation.set(PDFName.of('Contents'), PDFString.of(`${annotation.timestamp}\n${annotation.comment}`)); // Tooltip text with timestamp
                popupAnnotation.set(PDFName.of('Name'), PDFName.of('Comment')); // Annotation name

                const annots = page.node.get(PDFName.of('Annots')) || pdfDoc.context.obj([]);
                annots.push(popupAnnotation);
                page.node.set(PDFName.of('Annots'), annots);
                annotation.added = true;
            }
        });

        const modifiedPdfBytes = await pdfDoc.save();
        const modifiedPdfUrl = URL.createObjectURL(new Blob([modifiedPdfBytes], { type: 'application/pdf' }));

        // Update the PDF URL with annotations
        setPdfUrl(modifiedPdfUrl);

        //set page index
        setInitialPage(currentPageIndex);
        setCurrentPageIndex(0);
    };

    const formatDate = (dateString) => {
        // Split the dateString in DD/MM/YYYY format
        const [day, month, year] = dateString.split('/');
        // Create a new Date object (months are 0-indexed in JavaScript)
        const inputDate = new Date(year, month - 1, day);

        // Get the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentDate - inputDate;

        // Convert milliseconds to days
        const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));

        // Handle negative daysAgo (if the date is in the future)
        if (daysAgo < 0) {
            return "In the future";
        }
        // Return the result
        if (daysAgo === 0) {
            return "Today";
        } else if (daysAgo === 1) {
            return "1 day ago";
        } else {
            return `${daysAgo} days ago`;
        }
    }

    //open the reply tab
    const handleReplyClick = async (id) => {
        setReadyForReply(id);
        setAnnotations(() => annotations);
    }

    const addCommentReply = async (id, reply, image) => {
        const commentReply = (!reply) ? currentReply : reply;
        const annotation = annotations.filter(annotation => annotation.id == id);
        let total = annotation[0]?.reply?.length;

        if (!total) {
            annotation[0].reply = [];
            annotation[0].reply[0] = { commentReply: commentReply, imageUrl: image, date: new Date().toLocaleDateString() };
            setAnnotations(annotations);
        } else {
            annotation[0].reply[total] = { commentReply: commentReply, imageUrl: image, date: new Date().toLocaleDateString() };
            setAnnotations(annotations);
        }
    }

    //get user name by id
    const getAssignedUser = (userId) => {
        if (userId) {
            const user = users.filter(user => user.id == userId);
            return user[0].name;
        }
    }

    // Function to insert custom tooltips in the annotations
    const addTooltipsToAnnotations = async () => {
        const annotationIcons = document.querySelectorAll('.rpv-core__annotation-layer');
        let counting = 0;
        let z_index = annotationIcons.length;
        annotationIcons.forEach((iconContainer, index) => {
            const pageContainer = iconContainer.closest('.rpv-core__inner-page-container');

            z_index = z_index - 1;
            pageContainer.style.zIndex = z_index;
            pageContainer.style.position = 'relative';

            //remove all message icon first if exist
            const msgIconContainer = iconContainer.querySelectorAll('.msgIconContainer');
            if (msgIconContainer) {
                if (addingCommentEventRef.current == false) {
                    //hide all icons
                    msgIconContainer.forEach(item => {
                        item.innerHTML = '';
                    });
                }

                // hide all tooltips
                const tooltips = document.querySelectorAll('.custom-tooltip');
                tooltips.forEach(tooltip => {
                    tooltip.style.display = 'none';
                });

            }
            const dataTestId = iconContainer.getAttribute('data-testid');
            const dataId = dataTestId.charAt(dataTestId.length - 1);

            const AllfilteredAnnotations = filteredAnnotations
                .map((annotation, index) => ({ ...annotation, originalIndex: index }))  // Add the original index to each annotation
                .filter(annotation => annotation.pageIndex == dataId && annotation.addToPdf == true);  // Filter by pageIndex and annotation

            AllfilteredAnnotations.forEach((annotation, mainIndex) => {
                const annotationElements = iconContainer.querySelectorAll('.rpv-core__annotation');
                const annotationElement = annotationElements[mainIndex];
                const annotationCon = annotationElement.querySelector('.rpv-core__annotation-text-icon');
                const exitMsgIconContainer = annotationCon.querySelector('.msgIconContainer');
                if (exitMsgIconContainer && exitMsgIconContainer.innerHTML.trim() != '') {
                    // Tooltip already exists, no need to create a new one
                    return;
                }
                counting = counting + 1;
                const annotationNumber = parseInt(annotation.originalIndex, 10) + 1;

                let AllReplys = '';
                annotation?.reply?.forEach((item, key) => {
                    AllReplys+= `<div class="inner mt-1">
                                    <div class="top_row">
                                        <h3><span>UT</span>User Test</h3>
                                        <p>${formatDate(item?.date)}</p>
                                    </div>
                                    <p>${item?.commentReply}</p>
                                    ${(item?.imageUrl) ?
                                    `<p>
                                        <img src=" ${item?.imageUrl}" alt="">
                                    </p>` : ''}
                                    <div class="footer_row">
                                        <div class="cooment" data-id="${annotation[0]?.id}" data-key="${key}">
                                            <img src="${item?.like ? likedIcon : likeIcon}" alt="" class="commentReplyImg">
                                        </div>
                                    </div>
                                </div>`;
                });

                // Append the tooltip to the annotation icon
                const tooltip = `<div class="custom-tooltip" style="position: absolute;top: -1px;right: 25px;padding: 5px;background-color: white;color: black;font-size: 12px;border-radius: 3px;z-index: 1000;display: none;" data-id="${annotation?.id}">
                                    <div class="inner_wraper">
                                        <div class="card_main">
                                            <div class="top_row">
                                                <h3><span>UT</span>User Test</h3>
                                                <p>${formatDate(annotation?.timestamp)}</p>
                                            </div>
                                            <p>${annotation?.comment}</p>
                                            <p> 
                                                <img src="${annotation?.imageUrl}" alt="" style={{ maxWidth: '20%', maxHeight: '20px' }}>
                                            </p>
                                            <button class="editComment" value="${annotation?.id}">
                                                <img src="${EditIcon}" alt="Edit" class="editCommentImg"/>
                                            </button> 
                                            <button class="deleteComment" value="${annotation?.id}">
                                                <img src="${DeleteIcon}" alt="Delete" class="DeleteCommentImg"/>
                                            </button>
                                            <div class="footer_row like_reply_total_container">
                                                <div class="commentLikeButtonContainer" data-id="${annotation?.id}">
                                                    <img src="${annotation?.like ? likedIcon : likeIcon}" alt="" class="commentLikeButton">
                                                </div>
                                                <div class="reply">
                                                    <p class="ClickCommentReplyTooltip" data-id="${annotation?.id}">${(annotation?.reply) ? annotation?.reply.length : '0'} reply</p>
                                                </div>
                                            </div>
                                            <div class="show_hide_div_main hide">
                                                <div class="show_hide_div reply_container" data-id="${annotation?.id}">
                                                    ${AllReplys}
                                                </div>
                                                <div class="show_hide_div">
                                                    <form action="">
                                                        <textarea name="" id="" class="toolTipReply"></textarea>
                                                        <div class="attach_file replyInputContainer">
                                                            <div class="attach-wrap ">
                                                                <i class="fa fa-paperclip" aria-hidden="true"></i>
                                                                <p>Attach files</p>
                                                                <input type="file" id="myFile" name="filename" class="uploadPdfFile" accept="image/*" >
                                                            </div>
                                                            <div class="uploadedImage">
                                                            </div>
                                                            <button type="button" value="${annotation?.id}" class="addReplyFromTooltip">Add Reply</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

                annotationCon.innerHTML =  `<div class="msgIconContainer" data-id="${annotation?.id}" data-status="${annotation?.status}">
                                                <span class="messageText" data-id="${annotation?.id}">${annotationNumber}</span>
                                                <img src="${MessageIcon}" class="message_icon" alt="Message" data-id="${annotation?.id}" />
                                            </div>${tooltip}`;

            });

        });
    }

    //set all users
    const addMembers = () => {
        const AllUsers = [
            { id: 1, name: 'Test User' },
            { id: 2, name: 'Test User2' },
            { id: 3, name: 'Test User3' },
            { id: 4, name: 'Test User4' },
        ];
        setUsers(AllUsers);
    }

    const handleUserChange = (e) => {
        setAssignedUser(e.target.value);
        setShowUsers(false);
    }

    const handleResolveCheck = (e) => {
        const commentId = e.target.value;
        const checked = e.target.checked;
        const updatedAnnotations = annotations.map((item, key) => {
            if (item?.id == commentId) {
                let resolve = null;
                if (checked == true) { resolve = 2; } else { resolve = 1; }
                return { ...item, status: resolve }
            }
            return item;
        });
        // return;
        setAnnotations(updatedAnnotations);
    }

    const handleDeleteComment = async (id) => {
        const filteredAnnotations = annotations
            .map((annotation, index) => ({ ...annotation, added: null }))
            .filter(annotation => annotation.id != id);

        setAnnotations(filteredAnnotations);
        await saveAnnotationsToPdf(filteredAnnotations, 0);
    }

    const handleEditClick = async (id) => {
        setEditAbleComment(id);
        const annotation = annotations.filter(annotation => annotation.id == id);
        setNewComment(annotation[0].comment);
    }

    const updateAnnotation = async () => {
        if (newComment.trim()) {
            const updatedAnnotations = annotations.map((item, key) => {
                if (item.id == editAbleComment) {
                    return { ...item, comment: newComment, imageUrl: imageSrc, timestamp: new Date().toLocaleDateString() }
                }
                return item;
            });

            addingCommentEventRef.current = true;
            setAnnotations(updatedAnnotations);
            await saveAnnotationsToPdf(updatedAnnotations, 1);

            setNewComment(''); // Clear the input after saving
            setShowInput(false); // Hide the input box
            setAssignedUser(false);
            setEditAbleComment(null);
            setImageSrc(null);
            setErrors({ ...errors, commentErr: '' })
        } else {
            setErrors({ ...errors, commentErr: 'Please add comment first' })
        }
    }

    const handleFilterRecords = async (e) => {
        let num = e.target.value;
        if (num == 0) {
            setCurrentStatus(null);
            return;
        }
        setCurrentStatus(num);
        addingCommentEventRef.current = false;
    }

    const changeDocument = async (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);  // Create a URL for the uploaded image
            setImageSrc(imageUrl);
            e.target.value = null;
        } else {
            alert('Please upload a valid image file.');
        }
    }

    const handleLikeClick = async (id) => {
        const updatedAnnotations = annotations.map((annotation) => {
            if (annotation.id == id) {
                if (annotation.like == true) {
                    // return { ...annotation, like: false };
                    annotation.like = false;
                    return annotation;
                } else {
                    // return { ...annotation, like: true };
                    annotation.like = true;
                    return annotation;
                }
            } else {
                return annotation;
            }
        });
        setAnnotations(updatedAnnotations);
    }

    useEffect(() => {
        addMembers();

        const handleClick = async (event) => {
            if (event.target && (event.target.matches('.message_icon') || event.target.matches('.messageText'))) {
                const dataId = event.target.dataset.id;
                setReadyForReply(dataId);

                //firstly close all others tooltips 
                const tooltips = document.querySelectorAll('.custom-tooltip');
                tooltips.forEach(tooltip => {
                    tooltip.style.display = 'none';
                });

                const msgIconContainer = event.target.closest('.msgIconContainer');
                const tooltip = msgIconContainer.nextElementSibling;
                tooltip.style.display = 'block';

            } else if (event.target && (event.target.matches('.editCommentImg'))) {
                const editable = event.target.closest('.editComment').value;
                handleEditClick(editable)
            } else if (event.target && (event.target.matches('.DeleteCommentImg'))) {
                const deleteAble = event.target.closest('.deleteComment').value;
                handleDeleteComment(deleteAble)
            } else if (event.target && (event.target.matches('.AddReply'))) {
                const reply_containers = document.querySelectorAll('.reply_container');
                reply_containers.forEach((replyContainer) => {
                    if (replyContainer.getAttribute('data-id') == event.target.value) {
                        const annotation = annotations.filter(annotation => annotation.id == event.target.value);
                        let AllReplys = '';
                        annotation[0].reply.forEach((item, key) => {
                            AllReplys+= `<div class="inner mt-1">
                                            <div class="top_row">
                                                <h3><span>UT</span>User Test</h3>
                                                <p>${formatDate(item?.date)}</p>
                                            </div>
                                            <p>${item?.commentReply}</p>
                                            ${(item?.imageUrl) ?
                                            `<p><img src=" ${item?.imageUrl}" alt=""></p>`: ''}
                                            <div class="footer_row">
                                                <div class="cooment" data-id="${annotation[0]?.id}" data-key="${key}">
                                                    <img src="${item?.like ? likedIcon : likeIcon}" alt="" class="commentReplyImg">
                                                </div>
                                            </div>
                                        </div>`;
                        });
                        setCurrentReply('');
                        replyContainer.innerHTML = AllReplys;

                        //update reply count in tooltip
                        const main_container = replyContainer.closest('.show_hide_div_main');
                        const like_reply_total_container = main_container.previousElementSibling;
                        like_reply_total_container.querySelector('.ClickCommentReplyTooltip').innerHTML = `${annotation[0].reply.length} reply`;
                    }
                });
            } else if (event.target && (event.target.matches('.ClickCommentReplyTooltip'))) {
                const footerElement = event.target.closest('.footer_row');
                const showHideDivMain = footerElement.nextElementSibling && footerElement.nextElementSibling.matches('.show_hide_div_main') ? footerElement.nextElementSibling : null;
                if (showHideDivMain.classList.contains('hide')) {
                    showHideDivMain.classList.remove("hide");
                } else {
                    showHideDivMain.classList.add("hide");
                }
            } else if (event.target && (event.target.matches('.addReplyFromTooltip'))) {
                const parent = event.target.closest('.attach_file');
                const reply = parent.previousElementSibling.value;
                const imageElement = parent.querySelector('.imageSrc');
                let imageSrc = null;
                if (imageElement) {
                    imageSrc = imageElement.src
                }
                setCurrentReply(reply);
                await addCommentReply(event.target.value, reply, imageSrc);
                const annotation = annotations.filter(annotation => annotation.id == event.target.value);

                let AllReplys = '';
                annotation[0].reply.forEach((item, key) => {
                    AllReplys+= `<div class="inner mt-1">
                                    <div class="top_row">
                                        <h3><span>UT</span>User Test</h3>
                                        <p>${formatDate(item?.date)}</p>
                                    </div>
                                    <p>${item?.commentReply}</p>
                                    ${(item?.imageUrl) ? `<p> <img src=" ${item?.imageUrl}" alt=""></p>` : ''}
                                    <div class="footer_row">
                                            <div class="cooment" data-id="${annotation[0].id}" data-key="${key}">
                                            <img src="${item?.like ? likedIcon : likeIcon}" alt="" class="commentReplyImg">
                                            </div>
                                    </div>
                                </div>`;
                });
                setCurrentReply('');
                const replyContainer = event.target.closest('.show_hide_div_main').querySelector('.reply_container');
                replyContainer.innerHTML = AllReplys;

                parent.previousElementSibling.value = '';
                parent.querySelector('.uploadedImage').innerHTML = '';

                //update reply count in tooltip
                const main_container = replyContainer.closest('.show_hide_div_main');
                const like_reply_total_container = main_container.previousElementSibling;
                like_reply_total_container.querySelector('.ClickCommentReplyTooltip').innerHTML = `${annotation[0].reply.length} reply`;
            } else if (event.target && (event.target.matches('.uploadPdfFile'))) {
                event.target.addEventListener('change', (e) => {
                    const file = e.target.files[0]; // Get the selected file
                    if (file && file.type.startsWith('image/')) {
                        // Create an object URL for the selected image file
                        const imageUrl = URL.createObjectURL(file);
                        const imageContainer = e.target.closest('.replyInputContainer').querySelector('.uploadedImage');
                        imageContainer.innerHTML = `<img class="imageSrc" src="${imageUrl}" alt="Image Preview" style="max-width: 15px;">`;
                        e.target.value = null
                    }
                });
            } else if(event.target && (event.target.matches('.commentLikeButton'))) {
                const commentLikeButtonContainer = event.target.closest('.commentLikeButtonContainer');
                const commentId = commentLikeButtonContainer.getAttribute('data-id')

                handleLikeClick(commentId);
                if (event.target.classList.contains('liked')) {
                    event.target.src = likeIcon;
                    event.target.classList.remove("liked");
                } else {
                    event.target.src = likedIcon;
                    event.target.classList.add("liked");
                }
            } else if (event.target && (event.target.matches('.commentReplyImg'))) {
                const commentLikeImgContainer = event.target.closest('.cooment');
                const replyKey = commentLikeImgContainer.getAttribute('data-key');
                const commentId = commentLikeImgContainer.getAttribute('data-id');

                let likeStatus = false;
                if (event.target.classList.contains('liked')) {
                    event.target.src = likeIcon;
                    event.target.classList.remove("liked");
                } else {
                    event.target.src = likedIcon;
                    event.target.classList.add("liked");
                    likeStatus = true;
                }

                const updatedAnnotations = annotations.map((item, mainkey) => {
                    if (item.id == commentId) {
                        item.reply = item.reply.map((reply, key) => {
                            if (key == replyKey) {
                                return { ...reply, like: likeStatus };
                            }
                            return reply;
                        });
                        return item;
                    } else {
                        return item;
                    }
                });
                setAnnotations(updatedAnnotations);
            }

        };

        document.body.addEventListener('click', handleClick);
        let callCount = 0; // Keep track of how many times the function has been called
        // Call the function to add tooltips after the PDF is loaded
        const startTimer = () => {
            const timer = setInterval(() => {
                if (document.querySelector('.rpv-core__annotation-text-icon')) {
                    addTooltipsToAnnotations();
                    callCount += 1;
                    if (callCount >= 2) {
                        clearInterval(timer);  // Stop after 2 calls
                    } else {
                        clearInterval(timer);  // Stop the current interval
                        startTimer();  // Start a new interval
                    }
                }
            }, 1000);
        };
        startTimer();

        return () => {
            document.body.removeEventListener('click', handleClick);
        }
    }, [pdfUrl, currentStatus]);

    return (
        <div className='flex lg:h-[100vh] lg:flex-nowrap flex-wrap lg:max-h-none max-h-[100vh] lg:overflow-y-hidden overflow-y-auto bg-[#f3f4f6]'>
            <div className='relative w-full lg:max-w-[calc(100%-350px)] max-w-[100%]' onClick={handlePdfClick}>
                <Worker workerUrl={workerSrc}>
                    <Viewer fileUrl={pdfUrl} plugins={[defaultLayout]} defaultScale={1.0} initialPage={initialPage} onZoom={(scale) => setScale(scale)} />
                </Worker>
            </div>
            <CommentSection filteredAnnotations={filteredAnnotations} handleFilterRecords={handleFilterRecords}
                handleLikeClick={handleLikeClick} handleReplyClick={handleReplyClick} handleEditClick={handleEditClick}
                handleDeleteComment={handleDeleteComment} currentReply={currentReply} setCurrentReply={setCurrentReply}
                addCommentReply={addCommentReply} showUsers={showUsers} users={users} assignedUser={assignedUser}
                handleUserChange={handleUserChange} getAssignedUser={getAssignedUser} errors={errors} handleResolveCheck={handleResolveCheck}
                formatDate={formatDate} handleCommentChange={handleCommentChange} setShowUsers={setShowUsers} newComment={newComment} changeDocument={changeDocument}
                imageSrc={imageSrc} saveAnnotation={saveAnnotation} editAbleComment={editAbleComment} showInput={showInput}
                updateAnnotation={updateAnnotation} readyForReply={readyForReply}
            />
        </div>
    );
};
export default PdfViewerWithLayout;
