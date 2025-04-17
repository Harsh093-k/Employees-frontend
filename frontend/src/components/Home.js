import React from 'react';
import Hearder from './Hearder';
import MainCard from './mainCard';
import SideBar from './SideBar';

function Home() {
   
   
    return (
        <div className="h-screen flex flex-col">
            <Hearder />
            <div className="flex flex-1 overflow-hidden">
                <SideBar/>
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <MainCard/>
                </div>
            </div>
        </div >
    );
}

export default Home;

