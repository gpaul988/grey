'use client';

import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import '@/app/globals.css';

const Careers: React.FC = () => {
    return (
        <div className="bg-gray-50 text-black min-h-screen pb-12">
            <Header/>
            <div className="relative w-full h-[70vh] mb-20">
                <Image
                    src="/assets/header/careers.jpg"
                    alt="Careers"
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                    }} />
                <div
                    className="relative top-0 left-0 w-full h-full flex flex-col justify-center items-start pl-8 bg-black bg-opacity-45">
                    <h1 className="text-white text-6xl font-bold">Jobs at Grey InfoTech</h1>
                    <p className="text-white text-xl font-normal">Check out our current jobs and opportunities</p>
                </div>
            </div>
            {/* header ends here */}
            {/* main content starts here */}
            <div className="min-h-screen text-left justify-left bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-bold  text-gray-800 mb-8">
                        Jobs at Grey InfoTech
                    </h1>
                    <p className="text-md  text-gray-600 mb-4">
                        If you’re looking for jobs in a progressive company with a varied,
                        highly respectable clientele, you’ve come to the right place. Check
                        out all our current jobs at Grey InfoTech below.
                    </p>
                    <p className="text-md  text-gray-600 mb-12">
                        We look forward to receiving your application!
                    </p>
                    <div className="mt-8 flex flex-col border-b  md:flex-row justify-between items-center"/>
                    {/* job listing starts here */}
                    {/***
                     <div className="bg-white rounded-lg shadow-md p-6">
                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                     Experienced Digital Project Manager
                     </h2>
                     <div className="space-y-2">
                     <p>
                     <span className="font-medium">Employment Type:</span>{" "}
                     Full Time
                     </p>
                     <p>
                     <span className="font-medium">Role:</span> Experienced Digital
                     Project Manager
                     </p>
                     <p>
                     <span className="font-medium">Location:</span> Hybrid and
                     flexible working options
                     </p>
                     </div>
                     <p className="mt-6 text-gray-700 leading-relaxed">
                     We are looking for an experienced Digital Project Manager to join
                     us to manage the day-to-day running of various digital projects.
                     You’ll be involved in creating high-end websites, apps, and web
                     applications for well-known luxury and tech brands. Our ideal
                     candidate has a passion for technology and a track record of
                     delivering high-quality projects.
                     </p>
                     </div>
                     ***/}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Careers;