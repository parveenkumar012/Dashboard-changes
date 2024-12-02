import React, { useState, useRef, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FaComment } from 'react-icons/fa'; // Comment icon
import { PDFDocument, PDFName, PDFDict, PDFString } from 'pdf-lib'; // Import pdf-lib for PDF manipulation
import test_pdf from '../assets/pdfs/test_pdf.pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';
import { pdfjs } from 'react-pdf';
import logoImage from '../assets/comment-icon.png';
import { Textarea } from "@/components/ui/textarea";
import { Button } from './ui/button';
import { PiSortDescendingLight } from "react-icons/pi";
import profileIcon from "../assets/Frame 1000003152.png";
import { CiChat2 } from "react-icons/ci";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { FilterIcon, SearchCheckIcon, SearchIcon} from 'lucide-react';
import MessageIcon from "../assets/message-image.png";
import { format, formatDistance, formatRelative, subDays,formatDistanceToNow } from 'date-fns'
import { LuUserPlus } from "react-icons/lu";
import ProductImage from "../assets/product_watch.jpeg";
import { BiLike } from "react-icons/bi";
import { RxExit } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";

const PdfViewerWithLayout = () => {
    const defaultLayout = defaultLayoutPlugin();
    const [annotations, setAnnotations] = useState([]); // Store annotations (positions and comments of all)
    const [newComment, setNewComment] = useState(''); // Store the current comment input
    const [showInput, setShowInput] = useState(false); // Control visibility of the comment input box
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 }); // Store the click position in PDF
    const [pdfUrl, setPdfUrl] = useState(test_pdf); // Path to the PDF file
    const [scale, setScale] = useState(1); // To store and track the PDF scale factor
    const [readyForReply, setReadyForReply] = useState(null); // Text of the current comment
    const [currentReply, setCurrentReply] = useState(""); // Text of the current comment
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [hoveredAnnotation, setHoveredAnnotation] = useState(null);
    const [annotationPositions, setAnnotationPositions] = useState([]);
    const [initialPage,setInitialPage] = useState(0);
    const viewerRef = useRef(null);

    const handlePdfClick = (e) => {
        const pdfCanvas = e.target.closest('.rpv-core__text-layer');
        if (pdfCanvas) {
            const container = pdfCanvas.getBoundingClientRect();
            const testId = pdfCanvas.getAttribute('data-testid');
            const pageNumber = testId.split('-')[2];
            const x = e.clientX - container.left;
            const y = e.clientY - container.top;

            // Apply the scale factor to adjust the coordinates
            const scaledX = x / scale;
            const scaledY = y / scale;

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

    // Save annotation (icon) and position when user submits it
    const saveAnnotation = async () => {
        if (newComment.trim()) {
            let updatedAnnotations;

            setAnnotations(prevAnnotations => {
                updatedAnnotations = [...prevAnnotations,{ x: clickPosition.x, y: clickPosition.y, comment: newComment, pageIndex: currentPageIndex }];
                return updatedAnnotations;
            });

            setNewComment(''); // Clear the input after saving
            setShowInput(false); // Hide the input box
            await saveAnnotationsToPdf(updatedAnnotations);
        }
    };

    const saveAnnotationsToPdf = async (annotations) => {
        const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        const logoImageBytes = await fetch(logoImage).then((res) => res.arrayBuffer());
        const logo = await pdfDoc.embedPng(logoImageBytes);
        const logoDims = logo.scale(0.05); // Scale the logo
        annotations.forEach((annotation,key) => {
            if (!annotation.timestamp) {
                // Add timestamp when saving the annotation
                const timestamp = new Date().toLocaleString(); // You can customize the format if needed
                annotation.timestamp = timestamp;
                const page = pdfDoc.getPages()[annotation.pageIndex || 0]; // Get the page for annotation
        
                const scaledX = annotation.x * scale;
                const scaledY = page.getHeight() - (annotation.y * scale); // Adjust Y for PDF coordinates
        
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
            }
        });
        
        const modifiedPdfBytes = await pdfDoc.save();
        const modifiedPdfUrl = URL.createObjectURL(new Blob([modifiedPdfBytes], { type: 'application/pdf' }));
        
        // Update the PDF URL with annotations
        setPdfUrl(modifiedPdfUrl);
    };

    const clickComment = async (index) => {
        setReadyForReply(index);
        setAnnotations(() => annotations);
    }

    const addReply = (index) => {
        let total = annotations[index]?.reply?.length;

        if (!total) {
            annotations[index].reply = [];
            annotations[index].reply[0] = [currentReply];
            setAnnotations(annotations);
            setCurrentReply('');
        }
        else {
            annotations[index].reply[total] = [currentReply];
            setAnnotations(annotations);
            setCurrentReply('');
        }
    }

    // Function to insert custom tooltips in the annotations
    const addTooltipsToAnnotations = async () => {
        const annotationIcons = document.querySelectorAll('.rpv-core__annotation-layer');
        var count = 0;
        annotationIcons.forEach((iconContainer, index) => {

            const dataTestId = iconContainer.getAttribute('data-testid');
            const dataId = dataTestId.charAt(dataTestId.length - 1);
            const filteredAnnotations = annotations
            .map((annotation, index) => ({ ...annotation, originalIndex: index }))  // Add the original index to each annotation
            .filter(annotation => annotation.pageIndex == dataId);  // Filter by pageIndex

            filteredAnnotations.forEach((annotation, mainIndex) => {
                    const annotationElements = iconContainer.querySelectorAll('.rpv-core__annotation');
                    const annotationElement = annotationElements[mainIndex];
                    // console.log(annotationElement);
                    const annotationCon = annotationElement.querySelector('.rpv-core__annotation-text-icon');
                    const existingTooltip = annotationCon.querySelector('.custom-tooltip');
                    if (existingTooltip) {
                        // Tooltip already exists, no need to create a new one
                        return;
                    }
                    const annotationNumber = parseInt(annotation.originalIndex, 10) + 1;
                
                    // Append the tooltip to the annotation icon
                    const tooltip = `<div class="custom-tooltip" style="position: absolute;top: -1px;right: 25px;padding: 5px;background-color: white;color: black;font-size: 12px;border-radius: 3px;z-index: 1000;display: none;">
                    <div class="inner_wraper">
                        <div class="card_main">
                            <div class="top_row">
                                <h3><span>PM</span>Product Managar</h3>
                                <p>5 month ago</p>
                            </div>
                            <p>${annotation?.comment}</p>
                            <div class="footer_row">
                                <div class="cooment">
                                    <img src="src/assets/Frame 1000003152.png" alt="">
                                </div>
                                <div class="reply">
                                    <p>0 reply</p>
                                </div>
                            </div>
                            <div class="show_hide_div">
                                <div class="inner">
                                <div class="top_row">
                                    <h3><span>PM</span>Product Managar</h3>
                                    <p>5 month ago</p>
                                </div>
                                <p>See attached</p>
                                <div class="footer_row">
                                    <div class="cooment">
                                        <img src="src/assets/Frame 1000003152.png" alt="">
                                    </div>
                                </div>
                            </div>
                                <form action="">
                                    <textarea name="" id=""></textarea>
                                    <div class="attach_file">
                                        <div class="attach-wrap">
                                            <i class="fa fa-paperclip" aria-hidden="true"></i>
                                            <p>Attach files</p>
                                            <input type="file" id="myFile" name="filename">
                                        </div>
                                        <button type="button">Add Comment</button>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    </div>`;

                    annotationCon.innerHTML = `<div class="msgIconContainer" data-id="${annotationNumber}"><span class="messageText" data-id="${annotationNumber}">${annotationNumber}</span><img src="${MessageIcon}" class="message_icon" alt="Message" data-id="${annotationNumber}" /></div>${tooltip}`;

                    // Hide tooltip on mouse out
                    annotationCon.addEventListener('mouseleave', () => {
                        const tooltip = annotationCon.querySelector('.custom-tooltip');
                        tooltip.style.display = 'none'; // Add your desired style
                    });
    
                    // Show tooltip on mouse hover
                    annotationCon.addEventListener('mouseenter', () => {
                        const tooltip = annotationCon.querySelector('.custom-tooltip');
                        tooltip.style.display = 'block'; // Add your desired style
                    });
            });
        });
    };
        
    const handleCommentClick = (key) => {
        const annotation = annotations[key];
        const inputElement = document.querySelector('.rpv-core__textbox[data-testid="page-navigation__current-page-input"]');
        if (inputElement) {
            console.log(annotation.pageIndex+1);
            inputElement.value = annotation.pageIndex; // Set the value to the desired page number
        }

    }
    const formatDate = (dateString) => {
        console.log(dateString);
        const inputDate = new Date(dateString);
        return `${formatDistanceToNow(inputDate)} ago`;
    }

    // rpv-core__annotation-text-icon
    useEffect(() => {       
        const handleClick = (event) => {
            if (event.target && (event.target.matches('.message_icon') || event.target.matches('.messageText'))) {
                const dataId = event.target.dataset.id;
                setReadyForReply(dataId-1);
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
    }, [pdfUrl]);

    return (
        <div className='flex lg:h-[100vh] lg:flex-nowrap flex-wrap lg:max-h-none max-h-[100vh] lg:overflow-y-hidden overflow-y-auto'>
            <div className='relative w-full lg:max-w-[calc(100%-350px)] max-w-[100%]' onClick={handlePdfClick}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                    <Viewer
                        fileUrl={pdfUrl}
                        plugins={[defaultLayout]}
                        defaultScale={1.0}
                        initialPage={initialPage}
                        onZoom={(scale) => setScale(scale)} // Track the zoom scale
                    />
                </Worker>
            </div>
            {/* Show comment input box when clicked */}
            <div className='py-8 px-0 w-full lg:max-w-[350px] max-w-[100%] border-[#ccc] border-left-1 overflow-y-auto bg-[#f3f4f6] lg:mt-[0px] mt-[30px]'>
                <h3 className='text-[14px] font-semibold mb-5 text-[#1B1B1B] flex justify-between items-center w-full border-b border-[#ddd] px-[17px] pb-[15px]'> Comment <span className='rotate-180 text-[20px]'> <RxExit /> </span> </h3>
                <div className='relative'>
                    {/* <input type="search" placeholder='Type to search' className='border-[#ccc] caret-none border rounded-md w-full h-10 ps-10 pe-2 text-base text-[#1b1b1b] focus:ring-none focus:outline-none pr-4' />
                    <SearchIcon className='absolute  top-[7px] left-[10px]' /> */}

                </div>
                <div className='flex border-b border-[#f8f8f8] my-4 gap-8 items-center px-[17px]'>
                    <select className='custom-select-box bg-white p-[8px_18px] ring-0 outline-[0] appearance-none rounded-md' name="" id="">
                        <option value="">Showing All</option>
                        <option value="">Open</option>
                        <option value="">Resolved</option>
                    </select>
                </div>
                {annotations.length === 0 && <p className='px-[17px] text-center'>No Comments yet.</p>}
                {
                    annotations.map((comment, key) =>
                        <div className='px-[17px] mb-3'>
                        <Card className='custm_card overflow-hidden' >
                            <CardHeader className='p-[6px_8px]'>
                            <div className='flex items-center justify-between w-full'>
                                <form className='text-[12px] flex gap-1 items-center' action="">
                                    <input className='' type="checkbox" name="" id="" />
                                    Resolve
                                </form>
                                <p className='text-[12px]'>Assigned to  <span className='font-semibold'>Test User</span></p>
                            </div>
                            </CardHeader>
                            <CardContent className='px-[10px] pt-3 text-[#1b1b1b]'>
                                <div className='flex justify-between items-center p-[4px_0px]'>
                                    <div className='mb-0'>
                                        {/* <img src={profileIcon} className='w-full h-full' alt="" /> */}
                                        <div className='flex items-center text-[12px]'>
                                            <span className='relative mr-2' onClick={()=>{handleCommentClick(key)}}>
                                                {/* <CiChat2 size={25}/> */}
                                                <img src={MessageIcon} alt="Message" className='w-[22px]'/>
                                                <span className='flex gap-2 absolute text-[#0E00FF] top-[1px] left-[8px]'>{key + 1}</span>
                                            </span>
                                           <span className='font-bold'>User Test</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 mt-0'>
                                        <div className='flex items-center text-[12px]'>
                                            {/* <span className='relative mr-2' onClick={()=>{handleCommentClick(key)}}><CiChat2 size={25}/><span className='flex gap-2 absolute text-[8px] top-[5px] left-[11px]'>{key + 1}</span></span> */}
                                            <span> <span className='text-[12px] text-[#1b1b1b] opacity-50 m-1'>2d Ago</span></span>
                                            <p><BsThreeDotsVertical /></p>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-left text-sm pt-[30px] pb-[40px]'>{comment?.comment}</p>
                                <div>
                                    <img className='w-full max-w-[150px]' src={ProductImage} alt="product" />
                                </div>
                                {comment?.reply?.map((message) =>
                                    <div>
                                        <div className='flex gap-2 pt-4 mb-1'>
                                            <div className='flex items-center'>
                                                <div className='size-7'>
                                                    <img src={profileIcon} className='w-full h-full' alt="" />
                                                </div>
                                                <span> <span className='font-bold'>User Test</span> <span className='text-[12px] text-[#1b1b1b] opacity-50 m-1'>2d ago</span> </span>
                                            </div>
                                        </div>
                                        <p className='text-left text-sm pt-[20px] pb-[40px]'>{message}</p>
                                    </div>
                                )}
                                {/* {comment?.reply && (
                                    <div>
                                        <div className='size-7'>
                                                <img src={profileIcon} className='w-full h-full' alt="" />
                                            </div>
                                        <div className='flex gap-2 pt-4 mb-1'>
                                            <div className='flex items-center'>
                                                <span> <span className='font-bold'>User Test</span> <span className='text-[12px] text-[#1b1b1b] opacity-50 m-1'>2d ago</span> </span>
                                            </div>
                                        </div>
                                      
                                    </div>
                                )} */}
                            </CardContent>
                            {
                                (key != readyForReply) && (
                                    <div className='flex items-center justify-between px-[10px] py-[10px] border-t border-[#ddd]'>
                                        {/* <img src="" alt="" /> */}
                                        <BiLike />
                                    {/* <Button  onClick={() => clickComment(key)} >Reply</Button> */}
                                    <button className='text-[12px] text-[#444] font-semibold' onClick={() => clickComment(key)}><span>0</span> Reply </button>
                                   </div>
                                )
                            }
                            {(key == readyForReply) && (
                                <CardFooter className='p-0 px-[10px] py-[10px]'>
                                    <p className='flex gap-1'>
                                        <Input className='outline-none' placeholder='Add Reply' value={currentReply} onChange={(e) => (setCurrentReply(e.target.value))} />
                                        <Button onClick={() => addReply(key)}>Add Reply</Button>
                                    </p>
                                </CardFooter>
                            )
                            }
                        </Card>
                        </div>
                    )
                }
                    <div className='w-full fixed lg:max-w-[330px] max-w-[280px] bg-white bottom-[0px] pb-[15px] right-[10px] '>
                        {showInput && (
                        <div className='px-[10px] pb-[10px]'>
                            <div className='py-[15px] text-[14px] flex items-center gap-[20px]'>
                                <p>Add Comment</p>
                                <p className='flex flex-1 items-center gap-2 text-[14px]'><button className='max-w-[30px] h-[30px] w-full flex justify-center items-center shadow-lg rounded-full'><LuUserPlus /></button>No Assignee</p>
                            </div>
                            <div className='border border-[#ddd] rounded-[4px]'>
                            <form action="">
                            <Textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Enter your comment"
                                rows="2"
                                className='w-full border-0 focus:outline-none focus-visible:outline-none focus-visible:ring-[0] resize-none custm_textar'
                            />
                               <div className='flex items-center justify-between border-t border-[#ddd] px-[12px] py-[10px]'>
                                <div className='flex items-center relative gap-2 bg-[#d4d4d454] p-[6px_10px] rounded-full'>
                                <i class="fa fa-paperclip text-[#444]" aria-hidden="true"></i>
                                <p className='text-[#444] text-[12px]'>Attach files</p>
                                <input className='absolute top-0 left-0 w-full opacity-0 cursor-pointer z-10' type="file" id="myFile" name="filename" />
                                </div>
                            <Button className='mt-0 bg-[#0000ff85] text-[12px]' onClick={saveAnnotation}>Add Comment</Button>
                               </div>
                            </form>
                            </div>
                            </div>
                           
                            )}
                    </div>
            </div>
        </div>
    );
};
export default PdfViewerWithLayout;
