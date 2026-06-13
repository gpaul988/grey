import React from 'react';
import '@/app/globals.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Links = () => {
    return (
        <div className="bg-gray-50 text-black min-h-screen pb-12">
            <Header/>
            <div className="min-h-screen text-left justify-left bg-gray-50 py-8">
                <div className="max-w-7xl ml-14 mt-52 mx-auto px-4">
                    <p className="text-[15px] text-gray-600 mb-6">
                        We have several profiles relating to digital services that you might find useful. Head over to
                        following sites to see more of our work in context.<br/><br/>
                        Find us elsewhere on the web
                    </p>
                    <ol className=' text-gray-600 mb-6'>
                        <li className='mb-4 before:content-["—"] hover:text-teal-600 before:mr-2'>
                            <a href='https://www.facebook.com/greyinfotechltd' className='underline-offset-8 font-semibold hover:text-teal-600 text-[18px] underline'>Facebook</a>
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            <a href='https://linkedin.com/company/greyinfotechltd' className='underline-offset-8 font-semibold hover:text-teal-600 text-[18px] underline'>Linkedin</a>
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            <a href='https://github.com/GREY-INFOTECH-LTD' className='underline-offset-8 font-semibold hover:text-teal-600 text-[18px] underline'>GitHub</a>
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            <a href='https://gitlab.com/grey-infotech' className='underline-offset-8 font-semibold hover:text-teal-600 text-[18px] underline'>GitLab</a>
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            <a href='https://x.com/greyinfotechltd' className='underline-offset-8 font-semibold hover:text-teal-600 text-[18px] underline'>X</a>
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            <a href='https://instagram.com/greyinfotechltd' className='underline-offset-8 font-semibold hover:text-teal-600 text-[18px] underline'>Instagram</a>
                        </li>
                        <li className='mb-4 before:content-["—"] before:mr-2'>
                            <a href='https://threads.net/greyinfotechltd' className='underline-offset-8 font-semibold hover:text-teal-600 text-[18px] underline'>Thresds</a>
                            </li>
                    </ol>
                </div>
            </div>
            <Footer/>
                </div>
                );
                };

                export default Links;