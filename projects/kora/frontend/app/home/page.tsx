'use client'
import Loader from '../components/loader'
import MainContent from '../components/main'
import Menu from '../components/menu'
import Topbar from '../components/topbar'
import { withRegistrationCheck } from '../components/withRegistrationCheck'
import { useUserStore } from '../store/userStore'
import React, { useState, useEffect } from 'react';

function HomePage() {
    const { organizer } = useUserStore();
    const [isMounted, setIsMounted] = useState(false);
   
    useEffect(() => {
        setIsMounted(true);

    }, []);

    if (!isMounted) {
        return <div className='flex justify-center items-center h-screen'><Loader /></div>;
    }
    
    return (
        <div className="bg-gray-100">
            <Topbar pageName='zucal' toggleIsVisible={false} avatar={organizer.photo} />
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg shadow ">
                            <Menu isDrawer={false} />
                        </div>
                        <MainContent />
                    </div>
                </div>
            </main>
        </div>
    )
}
export default withRegistrationCheck(HomePage);
