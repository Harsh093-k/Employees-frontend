import React, { useState } from 'react';
import Hearder from './Hearder';
import MainCard from './mainCard';
import SideBar from './SideBar';
import { FiMenu } from 'react-icons/fi'; // hamburger icon

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col">
            <Hearder />
           
           
            
                {/* Main content */}
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <MainCard />
                </div>
            </div>
      
    );
}

export default Home;

