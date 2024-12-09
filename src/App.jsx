import './App.css';
import Dashboard from './Dashboard';
import SupplierOnBoard from './supplier/onboard.jsx';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import PdfViewerWithLayout from './components/PdfViewerWithLayout';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/supplier-onboarding" element={<SupplierOnBoard />} />
        <Route path="/" element={<PdfViewerWithLayout />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true, // Opting into the v7_startTransition behavior
      },
    }
  );

  return <RouterProvider router={router} />;
}

export default App;