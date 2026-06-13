import React from 'react';
import '@/app/globals.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const CookiesPolicy = () => {
    return (
        <div className="bg-gray-50 text-black min-h-screen pb-12">
            <Header/>
            <div
                className="relative top-0 left-0 lg:pl-12 md:pl-12 sm:pl-8 w-full h-full flex flex-col py-48 mb-20 justify-center items-start bg-black">
                <h1 className="text-white lg:text-7xl md:text-5xl text-4xl sm:text-4xl  mb-1 font-bold">Cookies
                    Policy</h1>
            </div>
            <div className="min-h-screen text-left justify-left bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-8">Privacy Statement:
                        How We Use Cookies</h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        Cookies are very small text files that are stored on your computer when you visit some websites.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        We use cookies to help identify your computer so we can tailor your user experience, track
                        shopping
                        basket contents and remember where you are in the order process.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        You can disable any cookies already stored on your computer, but these may stop our website from
                        functioning properly.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Functional Cookies
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-black font-bold'>This Website Will:</a> Track the pages you visits via
                        <Link href='/services/seo' className='text-black font-bold'> Google</Link> Analytics.
                    </p>
                    <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                        Targeting Cookies
                    </h1>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-black font-bold'>This Website Will:</a> Allow you to share pages with social
                        networks such as Facebook and Twitter.
                    </p>
                    <p className="text-[15px] text-gray-600 mb-6">
                        <a className='text-black font-bold'>This Website Will not:</a> Share any personal information
                        with third parties.
                    </p>
                    <div className="mt-8 flex flex-col border-b md:flex-row justify-between items-center"/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default CookiesPolicy;