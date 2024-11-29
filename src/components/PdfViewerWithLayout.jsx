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
import { FilterIcon, SearchCheckIcon, SearchIcon, SortDesc, SortDescIcon } from 'lucide-react';
import MessageIcon from "../assets/message.png";

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
            setAnnotations([
                ...annotations,
                { x: clickPosition.x, y: clickPosition.y, comment: newComment, pageIndex: currentPageIndex }
            ]);
            setNewComment(''); // Clear the input after saving
            setShowInput(false); // Hide the input box
            // setInterval(async () =>{
            //     await saveAnnotationsToPdf();
            // }, 500);
        }
    };

    const saveAnnotationsToPdf = async () => {
        const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const logoImageBytes = await fetch(logoImage).then((res) => res.arrayBuffer());
        const logo = await pdfDoc.embedPng(logoImageBytes);
        const logoDims = logo.scale(0.05); // Scale the logo

        annotations.forEach((annotation) => {
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
        setInterval(async () => {
            await addTooltipsToAnnotations();
        }, 500);
    };

    const handleScroll = () => {
        if (viewerRef.current) {
            const viewer = viewerRef.current;
            const pages = viewer.querySelectorAll('.rpv-core__text-layer');
            let pageIndex = 0;

            // Loop through the pages and check which one is in view
            pages.forEach((page, index) => {
                const rect = page.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    pageIndex = index;
                }
            });

            // Update the current page index
            setCurrentPageIndex(pageIndex);
        }
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
        const annotationIcons = document.querySelectorAll('.rpv-core__annotation-text-icon');
        // console.log(annotationIcons);
        annotationIcons.forEach((iconContainer, index) => {
            const annotation = annotations[index]; // Assuming annotations are in order
            if (annotation) {
                const existingTooltip = iconContainer.querySelector('.custom-tooltip');
                if (existingTooltip) {
                    // Tooltip already exists, no need to create a new one
                    return;
                }
                iconContainer.innerHTML = `<div class="msgIconContainer" data-id="${index+1}"><span class="messageText">${index+1}</span><img src="${MessageIcon}" class="message_icon" alt="Message" /></div>`;

                // Create a custom tooltip and append it to the annotation icon
                const tooltip = document.createElement('div');
                tooltip.style.position = 'absolute';
                tooltip.style.top = '-1px';
                tooltip.style.right = '25px';
                tooltip.style.padding = '5px';
                tooltip.style.backgroundColor = 'white';
                tooltip.style.color = 'black';
                tooltip.style.fontSize = '12px';
                tooltip.style.borderRadius = '3px';
                tooltip.style.zIndex = '1000';
                tooltip.style.display = 'none';
                tooltip.innerText = `Added on: ${annotation.timestamp}\n${annotation.comment}`;
                tooltip.classList.add('custom-tooltip');
                // Append the tooltip to the annotation icon
                iconContainer.appendChild(tooltip);

                // Hide tooltip on mouse out
                iconContainer.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });

                // Show tooltip on mouse hover
                iconContainer.addEventListener('mouseenter', () => {
                    tooltip.style.display = 'block';
                });
            }
        });
    };
    
    // rpv-core__annotation-text-icon
    useEffect(() => {
        const elements = document.querySelectorAll('.msgIconContainer');

        const handleClick = (event) => {
            const container = event.currentTarget;
            const dataId = container.dataset.id;
            console.log(dataId);
        };

        // Add event listener to each element with the class
        elements.forEach((el) => {
            el.addEventListener('click', handleClick);
        });

        // Call the function to add tooltips after the PDF is loaded
        const timer = setInterval(() => {
            if (document.querySelector('.rpv-core__annotation-text-icon')) {
                addTooltipsToAnnotations();
                clearInterval(timer); // Stop checking once annotations are available
            }
        }, 100);

        return () => {
            elements.forEach((el) => {
                el.removeEventListener('click', handleClick);
            });

            clearInterval(timer);
        }
    }, []);
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div className='relative w-full max-w-[calc(100%-350px)]' onClick={handlePdfClick}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                    <Viewer
                        fileUrl={pdfUrl}
                        plugins={[defaultLayout]}
                        defaultScale={1.0}
                        onZoom={(scale) => setScale(scale)} // Track the zoom scale
                    />
                </Worker>
            </div>
            {/* Show comment input box when clicked */}
            <div className='py-8 px-5 w-full max-w-[350px] border-[#ccc] border-left-1 overflow-y-auto'>
                <h3 className='text-[14px] font-semibold mb-5 text-[#1B1B1B]'> Annotations</h3>
                <div className='relative'>
                    <input type="search" placeholder='Type to search' className='border-[#ccc] caret-none border rounded-md w-full h-10 p-2 text-base text-[#1b1b1b] focus:ring-none focus:outline-none pr-4' />
                    <SearchIcon className='absolute  top-[7px] right-[10px]' />
                </div>

                <div className='flex border-b border-[#f8f8f8] my-4 gap-8 items-center'>
                    <li className='list-none ' >
                        <span className='flex item-center gap-2 font-medium text-[#1b1b1b] py-2 font-semibold border-b border-b-[2px]  border-[#4F46E5]' >All
                            <span className='size-6 border border-1 border-[#ccc] inline-flex justify-center items-center rounded-full text-[12px]' >0</span>
                        </span>
                    </li>
                    <li className='list-none ' >
                        <span className='flex item-center gap-1  text-[#1b1b1b] py-2 border-b border-b-[2px] border-tranasparent border-b-transparent' >Unresolved</span>
                    </li>
                    {/* <PiSortDescendingLight className='size-7 ml-auto' /> */}
                    <li className='list-none'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/></svg>
                    </li>
                </div>
                {annotations.length === 0 && <p>No Comments yet.</p>}
                {
                    annotations.map((comment, key) =>
                        <Card onClick={() => clickComment(key)} className='p-5 mb-2' >
                            <CardHeader className='p-0'>
                                <div className='flex gap-2'>
                                    <div className='size-7'>
                                        <img src={profileIcon} className='w-full h-full' alt="" />
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='relative mr-2'><CiChat2 size={25} /><span className='flex gap-2 absolute text-[8px] top-[5px] left-[11px] ' >{key + 1}</span></span>
                                        <span> User Test <span className='text-[12px] text-[#1b1b1b] opacity-50 m-1'>2d ago</span></span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className='p-0 pt-3 text-[#1b1b1b]'>
                                <p className='text-left text-sm'>{comment?.comment}</p>
                                {comment?.reply && (
                                    <div>
                                        <div className='flex gap-2 pt-4 mb-1'>
                                            <div className='size-7'>
                                                <img src={profileIcon} className='w-full h-full' alt="" />
                                            </div>
                                            <div className='flex items-center'>
                                                <span> User Test <span className='text-[12px] text-[#1b1b1b] opacity-50 m-1'>2d ago</span> </span>
                                            </div>
                                        </div>
                                        {comment?.reply?.map((message) =>
                                            <p className='text-sm text-[#1b1b1b]' >
                                                {message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                            {(key == readyForReply) && (
                                <CardFooter className='p-0 pt-3'>
                                    <p className='flex gap-1'>
                                        <Input placeholder='Add Reply' value={currentReply} onChange={(e) => (setCurrentReply(e.target.value))} />
                                        <Button onClick={() => addReply(key)}>Reply</Button>
                                    </p>
                                </CardFooter>
                            )
                            }
                        </Card>
                    )
                }
                    <div className='w-full fixed  bottom-px max-w-[300px] bg-white'>
                        {showInput && (
                            <div>
                            <Textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Enter your comment"
                                rows="4"
                                className='w-full focus:outline-none'
                            />
                            <Button className='mt-2 ' onClick={saveAnnotation}>Add Comment</Button>
                            </div>
                            )}
                        {/* Save to PDF Button */}
                        {(annotations.length > 0 && !showInput) && (
                            <Button onClick={saveAnnotationsToPdf} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                                Save PDF
                            </Button>
                        )}
                    </div>
            </div>
        </div>
    );
};
export default PdfViewerWithLayout;
