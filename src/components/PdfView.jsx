import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import test_pdf from '../assets/pdfs/test_pdf.pdf';


const PdfView = () => {
  // State to manage PDF file, comments, current comment input, and pagination
  const [pdfUrl, setPdfUrl] = useState(test_pdf); // Replace with your PDF URL
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false); // toggle comment mode
  const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Handle page change (previous or next)
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle adding a comment
  const handleAddComment = (e) => {
    if (isAddingComment && currentComment) {
      const boundingRect = e.target.getBoundingClientRect();
      const x = e.clientX - boundingRect.left;
      const y = e.clientY - boundingRect.top;
      
      const newComment = {
        text: currentComment,
        position: { x, y },
      };

      setComments([...comments, newComment]);
      setIsAddingComment(false); // disable comment mode after adding comment
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '800px' }}>
      {/* PDF Viewer with Pagination */}
      <Worker workerUrl={`//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={pdfUrl}
          renderMode="canvas"
          onClick={handleAddComment} // Enable click to add comments
          initialPage={currentPage - 1} // Set the initial page
          onLoadSuccess={({ numPages }) => setTotalPages(numPages)} // Set total number of pages
        />
      </Worker>

      {/* Display Comments */}
      {comments.map((comment, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: comment.position.y,
            left: comment.position.x,
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            maxWidth: '200px',
          }}
        >
          {comment.text}
        </div>
      ))}

      {/* Input and Button for Adding Comment */}
      <div>
        <input
          type="text"
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={() => setIsAddingComment(!isAddingComment)}>
          {isAddingComment ? 'Cancel' : 'Add Comment'}
        </button>
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfView;
