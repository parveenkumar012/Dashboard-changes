import React, { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FaComment } from 'react-icons/fa'; // Comment icon
import CommentIcon from './comment-icon.png';
import { PDFDocument, rgb ,StandardFonts } from 'pdf-lib'; // Import pdf-lib for PDF manipulation
import test_pdf from '../assets/pdfs/test_pdf.pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js';
import logoImage from './comment-icon.png';
import { Textarea } from "@/components/ui/textarea";
import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";

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

    const handlePdfClick = (e) => {
        const pdfCanvas = e.target.closest('.rpv-core__text-layer');

        if (pdfCanvas) {
            const container = pdfCanvas.getBoundingClientRect();
            const x = e.clientX - container.left;
            const y = e.clientY - container.top;

            // Apply the scale factor to adjust the coordinates
            const scaledX = x / scale;
            const scaledY = y / scale;

            // Set position for the input box to appear at clicked position
            setClickPosition({ x: scaledX, y: scaledY });
            setShowInput(true); // Show the comment input box
        }
    };
    // Handle comment text input
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // Save annotation (icon) and position when user submits it
    const saveAnnotation = () => {
        if (newComment.trim()) {
            setAnnotations([
                ...annotations,
                { x: clickPosition.x, y: clickPosition.y, comment: newComment }
            ]);
            setNewComment(''); // Clear the input after saving
            setShowInput(false); // Hide the input box
        }
    };

    const saveAnnotationsToPdf = async () => {
        // Load the existing PDF
        const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
      
        // Embed the annotation logo as an image
        const logoImageBytes = await fetch(logoImage).then((res) => res.arrayBuffer());
        const logo = await pdfDoc.embedPng(logoImageBytes);
        const logoDims = logo.scale(0.05); // Scale the image to fit as an icon
      
        // Loop over the annotations and add them to the PDF
        annotations.forEach((annotation) => {
          const page = pdfDoc.getPages()[0]; // Assume annotations are on the first page
      
          // Apply the same scaling factor used on the frontend to match PDF coordinates
          const scaledX = annotation.x * scale;
          const scaledY = annotation.y * scale;
      
          // Draw the logo image at the click position
          page.drawImage(logo, {
            x: scaledX,
            y: scaledY,
            width: logoDims.width,
            height: logoDims.height,
          });
      
          // Create a widget annotation (interactive annotation for a comment)
          const widget = page.addWidget({
            x: scaledX,
            y: scaledY,
            width: logoDims.width,
            height: logoDims.height,
            type: 'popup',
            text: annotation.comment, // Comment text
          });
      
          // Assign the tooltip text (comment) to the widget annotation
          widget.setText(annotation.comment);
        });
      
        // Save the PDF with the added annotations
        const modifiedPdfBytes = await pdfDoc.save();
        const modifiedPdfUrl = URL.createObjectURL(
          new Blob([modifiedPdfBytes], { type: 'application/pdf' })
        );
      
        setPdfUrl(modifiedPdfUrl); // Update the PDF to the one with annotations
    };
    const clickComment = async (index) => {
        setReadyForReply(index);
        setAnnotations(() => annotations);
    
    }

    const addReply = (index) =>{
        let total = annotations[index]?.reply?.length;
    
        if(!total){
            annotations[index].reply = [];
            annotations[index].reply[0] = [currentReply];
            setAnnotations(annotations);
            setCurrentReply('');
        }
        else{
            annotations[index].reply[total] = [currentReply];
            setAnnotations(annotations);
            setCurrentReply('');
        }
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '70%', position: 'relative' }} onClick={handlePdfClick}>
            <Worker workerUrl={workerSrc}>
                <Viewer
                    fileUrl={pdfUrl}
                    plugins={[defaultLayout]}
                    onZoom={(scale) => setScale(scale)} // Track the zoom scale
                />
            </Worker>

            {/* Render annotation icons at saved positions */}
            {annotations.map((annotation, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: annotation.y * scale, // Scale the y position for proper alignment
                        left: annotation.x * scale, // Scale the x position for proper alignment
                        cursor: 'pointer',
                    }}
                >
                    {/* <FaComment
                        size={20}
                        color="blue"
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: '5px',
                            boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                        }}
                        title={annotation.comment} // Show the comment on hover
                    /> */}
                    <img src={CommentIcon} 
                     color="blue"
                     style={{
                         backgroundColor: 'white',
                         borderRadius: '50%',
                         padding: '5px',
                         boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                         width:'2em'
                     }}
                     title={annotation.comment} // Show the comment on hover
                    />
                </div>
            ))}
        </div>

        {/* Show comment input box when clicked */}

        <div style={{ width: '30%', padding: '10px', borderLeft: '1px solid #ccc', overflowY: 'auto' }}>
            <h3>Comments</h3>
            {annotations.length === 0 && <p>No Comments yet.</p>}
            {
                annotations.map((comment,key) => 
                    <Card onClick={() => clickComment(key)} >
                        <CardHeader> User Test
                        </CardHeader>
                        <CardContent>
                            <p className='text-center'>{comment?.comment}</p>
                            {comment?.reply && (
                                <div>
                                    <h2 className='text-xl font-bold'>Conversation:</h2>
                                    {comment?.reply?.map((message) => 
                                        <p>
                                            {message}
                                        </p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                        {(key == readyForReply) && (
                        <CardFooter>
                            <p>
                                <Input placeholder='Add Reply' value={currentReply} onChange={(e)=>(setCurrentReply(e.target.value))}/>
                                <Button onClick={() => addReply(key)}>Reply</Button>
                            </p>
                        </CardFooter>
                            )
                        } 
                    </Card>
                )
            }
            {showInput && (
                <div>
                    <Textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="Enter your comment"
                        rows="4"
                        style={{ width: '200px' }}
                    />
                    <Button onClick={saveAnnotation}>Add Comment</Button>
                </div>
            )}
        </div>

        {/* Save to PDF Button */}
        
    </div>
    );
};

export default PdfViewerWithLayout;
