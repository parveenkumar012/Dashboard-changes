import React from 'react';
import { HomeIcon, RefreshCcwIcon, BoxIcon, LinkIcon, Share2Icon, GridIcon, FileTextIcon, SettingsIcon, HelpCircleIcon } from 'lucide-react'; // Icons from lucide-react
import { Button } from "@/components/ui/button"

const MainSidebar = () => {
    return (
        <div className="h-screen bg-gray-900 w-[50px] md:w-[86px] text-white flex flex-col items-center py-4 space-y-0 md:space-y-6 fixed left-0 top-0">
            {/* Icons */}
            <Button className="hover:bg-gray-700 p-2 rounded">
                <HomeIcon size={24} />
            </Button>
            <Button className="hover:bg-gray-700 p-2 rounded">
                <RefreshCcwIcon size={24} />
            </Button>
            <Button className="hover:bg-gray-700 p-2 rounded">
                <BoxIcon size={24} />
            </Button>
            <Button className="hover:bg-gray-700 p-2 rounded">
                <LinkIcon size={24} />
            </Button>
            <Button className="hover:bg-gray-700 p-2 rounded">
                <Share2Icon size={24} />
            </Button>
            <Button className="hover:bg-gray-700 p-2 rounded">
                <GridIcon size={24} />
            </Button>
            <Button className="hover:bg-gray-700 p-2 rounded">
                <FileTextIcon size={24} />
            </Button>
            <Button className="hover:bg-gray-700 p-2 rounded">
                <SettingsIcon size={24} />
            </Button>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Help icon */}
            <Button className="hover:bg-gray-700 p-2 rounded mb-4">
                <HelpCircleIcon size={24} />
            </Button>
        </div>
    );
};

export default MainSidebar;
