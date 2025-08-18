import ProjectsStepCard from '@/components/cards/ProjectsStepCard';
import RevenueCard from '@/components/cards/RevenueCard';
import StaffCard from '@/components/cards/StaffCard';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: 'Sales Admin',
};

const Sales = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Dashboard
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Sales</span>
                    </li>
                </ul>
                <div className="pt-5">
                    <div className="mb-6 grid gap-6 xl:grid-cols-1">
                        <RevenueCard/>
                        <div className='grid gap-2 xl:grid-cols-2'>
                            <ProjectsStepCard/>
                            <StaffCard/>
                        </div>
                        
                    </div>
                </div>        
        </div>
    );
};

export default Sales;
