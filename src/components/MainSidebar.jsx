import React from 'react';
import { Home, RefreshCcw, Box, Link, Share2, Grid, FileText, Settings, HelpCircle } from 'lucide-react'; // Icons from lucide-react

const MainSidebar = () => {
    return (
        <div className="h-screen bg-gray-900 w-[50px] md:w-[86px] text-white flex flex-col items-center py-4 space-y-0 md:space-y-6 fixed left-0 top-0">
            {/* Icons */}
            <button className="hover:bg-gray-700 p-2 rounded">
                <Home size={24} />
            </button>
            <button className="hover:bg-gray-700 p-2 rounded">
                <RefreshCcw size={24} />
            </button>
            <button className="hover:bg-gray-700 p-2 rounded">
                <Box size={24} />
            </button>
            <button className="hover:bg-gray-700 p-2 rounded">
                <Link size={24} />
            </button>
            <button className="hover:bg-gray-700 p-2 rounded">
                <Share2 size={24} />
            </button>
            <button className="hover:bg-gray-700 p-2 rounded">
                <Grid size={24} />
            </button>
            <button className="hover:bg-gray-700 p-2 rounded">
                <FileText size={24} />
            </button>
            <button className="hover:bg-gray-700 p-2 rounded">
                <Settings size={24} />
            </button>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Help icon */}
            <button className="hover:bg-gray-700 p-2 rounded mb-4">
                <HelpCircle size={24} />
            </button>
        </div>
    );
};

export default MainSidebar;
