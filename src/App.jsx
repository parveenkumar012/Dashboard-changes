import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Dashboard';
import SupplierOnBoard from './supplier/onboard.jsx';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import PdfViewer  from './components/PdfViewer';
import PdfView from './components/PdfView';
import PdfViewerWithLayout from './components/PdfViewerWithLayout';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<Dashboard />} />
        <Route path="/supplier-onboarding" element={<SupplierOnBoard />} />
        <Route path="/pdf-viewer" element={<PdfViewer />} />
        <Route path="/pdf-view" element={<PdfView />} />
        <Route path="/pdf-viewers" element={<PdfViewerWithLayout />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
