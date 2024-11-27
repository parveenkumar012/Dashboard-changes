import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb,StandardFonts } from 'pdf-lib';
import test_pdf from '../assets/pdfs/test_pdf.pdf';
import { Button } from './ui/button';
import { Textarea } from "@/components/ui/textarea";
// import { Tooltip } from '@mui/material';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null); // Store total number of pages
  const [readyForComment, setReadyForComment] = useState(null); // Store total number of pages
  const [pageNumber, setPageNumber] = useState(1); // Track current page number
  const [comments, setComments] = useState([]); // Store comments for the current page
  const [currentComment, setCurrentComment] = useState(""); // Text of the current comment
  const [readyForReply, setReadyForReply] = useState(null); // Text of the current comment
  const [currentReply, setCurrentReply] = useState(""); // Text of the current comment
  const [commentPosition, setCommentPosition] = useState(null); // Position for the current comment
  const [pdfUrl, setPdfUrl] = useState(test_pdf); // Path to your PDF

  // Static PDF URL (use your own PDF file path here)
  const pdfFile = pdfUrl;

  // Handle document load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);  // Set total pages
    setPageNumber(1);        // Start on the first page
  };

   // Handle the comment submission and update the PDF
   const addComment = async () => {
    if (currentComment && commentPosition) {
      // Add the comment to the current comments state
       const newComments = [
        ...comments,
        { text: currentComment, position: commentPosition, page: pageNumber },
      ];

      setComments(newComments);

      // Update the PDF with the comment
      await updatePDFWithComment(newComments);

      // Clear the current comment text and position
      setCurrentComment("");
      setCommentPosition(null);
      setReadyForComment(null);
    }
  };

  const updatePDFWithComment = async (newComments) => {
    try{
    // Fetch the PDF file from the URL (or from local storage, etc.)
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());

    // Load the existing PDF into pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
    // Embed the font for the comment
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    
    pages.forEach((page, pageIndex) => {
        // Add the page number to the page (pageIndex is zero-based)
        page.drawText(`Page ${pageIndex + 1}`, {
          x: 30, // X position of the page number (left-aligned)
          y: page.getHeight() - 30, // Y position of the page number (top of the page)
          size: 12,
          font,
          color: rgb(0, 0, 0), // Black text
        });
  
        // Add the comment icons (message bubbles) to the page at the specified position
        newComments.forEach((comment) => {
          if (comment.page === pageIndex + 1) {  // Check if the comment is for the current page
            // Draw a small circle or icon to represent the comment (for example, a speech bubble)
            const iconSize = 20; // Size of the icon
            page.drawCircle({
              x: comment.position.x,
              y: page.getHeight() - comment.position.y - iconSize / 2, // Adjust Y-position for PDF
              size: iconSize,
              color: rgb(0, 0, 1), // Blue color for the icon
            });
  
            // Store the comment with its position and icon size for use in the frontend
            comment.iconPosition = { x: comment.position.x, y: comment.position.y };
          }
        });
    });
    console.log(newComments);
    // Iterate over each comment and add it to the PDF
    // newComments.forEach((comment) => {
    //   const page = pdfDoc.getPage(pageNumber - 1); // Get the current page (zero-based index)
    //     // Add the comment text to the page at the specified position
    //     page.drawText(comment.text, {
    //     x: comment.position.x,
    //     y: page.getHeight() - comment.position.y, // Invert Y-axis for PDF
    //     size: 12,
    //     font,
    //     color: rgb(0, 0, 0), // Black text
    //   });

    // });

    // Save the updated PDF with comments
    const pdfBytes = await pdfDoc.save();
    
    // Convert the updated PDF into a Blob and create a URL to download/view it
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const newPdfUrl = URL.createObjectURL(pdfBlob); // Create a new URL for the updated PDF
    setPdfUrl(newPdfUrl); // Update the state with the new PDF URL
    }
    catch(err){
        console.log('error',err);
    }
  };

  const ChooseComment = () => {
    setReadyForComment(true);
  }
  const clickComment = async (index) => {
    setReadyForReply(index);
    setComments(() => comments);

  }
  // Handle the click to add a comment
  const handlePageClick = (event) => {
    if(readyForComment){
        const { offsetX, offsetY } = event.nativeEvent;
        console.log(offsetX,offsetY);
        setCommentPosition({ x: offsetX, y: offsetY }); // Get the position where the user clicked
    }
  };

  const addReply = (index) =>{
    let total = comments[index]?.reply?.length;

    if(!total){
        comments[index].reply = [];
        comments[index].reply[0] = [currentReply];
        setComments(comments);
        setCurrentReply('');
    }
    else{
        comments[index].reply[total] = [currentReply];
        setComments(comments);
        setCurrentReply('');
    }
  }

  return (
    <div>
      <h1>PDF Viewer</h1>
       {/* Pagination Controls */}
       {numPages && (
        <div>
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}  // Disable 'Previous' if on the first page
          >
            Previous
          </button>

          {/* Display current page number and total pages */}
          <span>Page {pageNumber} of {numPages}</span>

          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}  // Disable 'Next' if on the last page
          >
            Next
          </button>
        </div>
      )}

      <div className='documentCommentContainer' style={{display:'flex'}}>
            <div className='chooser'>
                <Button onClick={ChooseComment}>Choose Comment</Button>
            </div>
            <div className='document'>
                {/* Render the PDF */}
                <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(error) => console.error('Failed to load PDF:', error)} // Log any errors
                >
                    <Page pageNumber={pageNumber} scale={1.5} onClick={handlePageClick}/>
                </Document>
                 {/* Display Comments on document from frontend */}
                {/* {comments
                // ?.filter((comment) => comment.page === pageNumber)
                ?.map((comment, index) => (
                    <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: comment.position.x,
                        top: comment.position.y,
                        backgroundColor: 'rgba(255, 255, 0, 0.5)',
                        padding: '5px',
                        borderRadius: '5px',
                    }}
                    >
                    <strong>{comment.text}</strong> 
                    </div>
                ))} */}
                <TooltipProvider> 
                  {/* Comment Tooltip */}
                  {comments.map((comment, index) => (
                    <Tooltip key={index} content={comment.text} side="top">
                    {/* Render the icon on the frontend */}
                    <div
                        style={{
                        position: 'absolute',
                        left: comment.position.x,
                        top: comment.position.y,
                        }}
                    >
                        <span role="img" aria-label="comment" style={{ fontSize: '20px', cursor: 'pointer' }}>
                        test
                        </span>
                    </div>
                    </Tooltip>
                 ))}
                 </TooltipProvider>
            </div>
            <div className='comments'>
                <h2 className='text-center text-2xl font-bold'>Comments</h2>
                {
                    comments.map((comment,key) => 
                        <Card onClick={() => clickComment(key)} >
                            <CardHeader> User Test
                            </CardHeader>
                            <CardContent>
                                <p className='text-center'>{comment?.text}</p>
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
                {/* Add Comment */}
                {commentPosition && (
                    <div>
                        <Textarea 
                        value={currentComment}
                        onChange={(e) => setCurrentComment(e.target.value)}
                        placeholder="Add a comment..."
                        />
                        <Button onClick={addComment}>Add Comment</Button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default PDFViewer;
