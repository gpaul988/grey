import React from "react";
import '../app/globals.css';
import Header from "../components/Header";
import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";

const OurApproach = () => {
    return (
        (<div className="bg-gray-50 text-black min-h-screen lg:pb-12 pb-0">
            <Header/>
            <div className="relative w-full h-[70vh] lg:mb-20 mb-9">
                <Image
                    src="/assets/header/approach.jpg"
                    alt="company"
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                    }}/>
                <div
                    className="relative top-0 left-0 w-full h-full flex flex-col justify-center items-start pl-8 bg-black/30">
                    <h1 className="text-white text-6xl pb-3 font-bold">Our Approach</h1>
                </div>
            </div>
            <div className="min-h-screen bg-gray-50 leading-7 lg:pt-14 lg:pb-0 pt-8">
                <div className="max-w-full lg:pl-0 pl-5 mx-auto">
                    <h1 className="lg:text-5xl text-2xl font-bold lg:justify-center lg:text-center text-left justify-start text-gray-800 lg:mb-12 mb-7">
                        Our Approach
                    </h1>
                    <p className="text-[16px] text-gray-600 lg:text-center  lg:px-52 text-left mb-28">We understand that
                        starting to build a website or app can
                        be a daunting process so we’d like to share a little about how we work and the process we
                        follow.</p>
                </div>
                {/* Section 1 */}
                <section className="flex flex-col lg:grid lg:grid-cols-2 items-center lg:px-0">
                    {/* Left Text */}
                    <div className=" lg:px-[68px] lg:leading-7 pl-5 lg:text-left">
                        <h2 className="lg:text-5xl text-2xl font-bold text-left justify-start text-gray-800 lg:mb-12 mb-6">Enquiry</h2>
                        <p className="text-[16px] text-gray-600  lg:px-0 text-left mb-6">
                            From your initial telephone call or enquiry, we’ll get to understand your
                            requirements, the level of budget available for your project, and your timescale. If the
                            project
                            is similar to something we have already produced, we will or may be able to provide
                            guideline prices.
                        </p>
                    </div>
                    {/* Right Icon */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="bg-blue-500 w-full h-full flex items-center justify-center lg:mb-0 mb-6">
                            <Image
                                src="/assets/approach/icon-enquiry.png"
                                alt='enquiry'
                                width={500}
                                height={100}
                                className='lg:h-[540] h-[670px] lg:w-[675px] w-[730px] '
                            />
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="flex flex-col lg:grid lg:grid-cols-2 items-center lg:px-0">
                    <div className="flex justify-center lg:order-first order-last lg:justify-start">
                        <div className="bg-blue-500 w-full h-full flex items-center justify-center lg:mb-0 mb-6">
                            <Image
                                src="/assets/approach/icon-discovery.png"
                                alt='Discovery'
                                width={500}
                                height={500}
                                className='lg:h-[540] h-[670px] lg:w-[675px] w-[730px] '/>
                        </div>
                    </div>
                    <div className=" lg:px-16 pl-5 lg:text-left">
                        <h2 className="text-3xl font-bold mb-4">Discovery</h2>
                        <p className="text-[16px] text-gray-600  lg:px-0 text-left mb-6">
                            If guideline prices are agreeable, we can begin a more detailed planning phase for
                            your project. The <Link href="/grey_infotech/pages/discovery-phase"
                                                    className='text-gray-800 hover:text-teal-600 font-bold underline decoration-gray-300 underline-offset-[7px]'>discovery
                            phase</Link> is key to understanding your requirements in detail.
                            We take everything into account, and this includes your deadlines, budget, how your
                            business works, what your goals are and which challenges you need to overcome. We’ll
                            proactively come forward with ideas. This phase can include reviewing competitors,
                            exploring strategies as well as taking into account market and design trends and
                            technologies. Once we have a complete understanding of your project we can agree on
                            the exact specifications.
                        </p>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="flex flex-col lg:grid lg:grid-cols-2 items-center lg:px-0">
                    {/* Left Text */}
                    <div className=" lg:px-[68px] lg:leading-7 pl-5 lg:text-left">
                        <h2 className="lg:text-5xl text-2xl font-bold text-left justify-start text-gray-800 lg:mb-12 mb-6">Design</h2>
                        <p className="text-[16px] text-gray-600  lg:px-0 text-left mb-6">
                            We have a fast, fun and flexible approach to designing your site with you.<br/><br/>
                            We swiftly determine the primary layout of the pages you&#39;ll need on your website
                            and create fully interactive, colorful mockups of important pages to show how the
                            website or application will function.Establishing color schemes, message, and the
                            positioning of important components and calls to action are all essential components
                            of the design phase in order to boost site conversions and signups.<br/><br/>
                            <Link href='/services/Web-Design'
                                  className='text-gray-800 hover:text-teal-600 font-bold underline decoration-gray-300 underline-offset-[7px]'>Learn
                                More About Our Website Design {'>'}</Link>
                        </p>
                    </div>
                    {/* Right Icon */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="bg-blue-500 w-full h-full flex items-center justify-center lg:mb-0 mb-6">
                            <Image
                                src="/assets/approach/icon-design.png"
                                alt='Design'
                                width={500}
                                height={500}
                                className='lg:h-[540] h-[670px] lg:w-[675px] w-[730px] '
                            />
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="flex flex-col lg:grid lg:grid-cols-2 items-center lg:px-0">
                    <div className="flex justify-center lg:order-first order-last lg:justify-start">
                        <div className="bg-blue-500 w-full h-full flex items-center justify-center lg:mb-0 mb-6">
                            <Image
                                src="/assets/approach/icon-development.png"
                                alt='Development'
                                width={500}
                                height={500}
                                className='lg:h-[540] h-[670px] lg:w-[675px] w-[730px] '/>
                        </div>
                    </div>
                    <div className=" lg:px-16 pl-5 lg:text-left">
                        <h2 className="text-3xl font-bold mb-4">Development</h2>
                        <p className="text-[16px] text-gray-600  lg:px-0 text-left mb-6">
                            The website or <Link href='/services/Web-Application'
                                                 className='text-gray-800 hover:text-teal-600 font-bold underline decoration-gray-300 underline-offset-[7px]'>web
                            app</Link> can be
                            developed once the specifications have been agreed upon and designs have started to take
                            shape.
                            At this point, the project begins to take shape. We will use WordPress, Drupal, or Ruby on
                            Rails to make your project a reality, depending on the project specifications. In addition
                            to
                            being involved at every stage of the project, our clients get complete access to the project
                            on our development server.<br/><br/>
                            <Link href='/services/Web-Development'
                                  className='text-gray-800 hover:text-teal-600 font-bold underline decoration-gray-300 underline-offset-[7px]'>Learn
                                More About Our Website Development {'>'}</Link><br/>
                            Head this way for our <Link href='/services/Software-Development'
                                                        className='text-gray-800 hover:text-teal-600 font-bold underline decoration-gray-300 underline-offset-[7px]'>
                            Software Development Services {'>'}</Link>
                        </p>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="flex flex-col lg:grid lg:grid-cols-2 items-center lg:px-0">
                    {/* Left Text */}
                    <div className=" lg:px-[68px] lg:leading-7 pl-5 lg:text-left">
                        <h2 className="lg:text-5xl text-2xl font-bold text-left justify-start text-gray-800 lg:mb-12 mb-6">Testing</h2>
                        <p className="text-[16px] text-gray-600  lg:px-0 text-left mb-6">
                            To ensure that we provide a top-notch product, we have a rigorous quality assurance
                            procedure.
                            We test every element of your app or website, resolving any issues we discover. For
                            websites,
                            this includes cross-browser testing to ensure that your site works flawlessly across all
                            popular platforms, including phones, tablets, and desktop browsers. Tests for accessibility
                            make sure that we can accommodate all of your clients and that everyone can visit your
                            website
                            correctly.
                        </p>
                    </div>
                    {/* Right Icon */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="bg-blue-500 w-full h-full flex items-center justify-center lg:mb-0 mb-6">
                            <Image
                                src="/assets/approach/icon-testing.png"
                                alt='Testing'
                                width={500}
                                height={500}
                                className='lg:h-[540] h-[670px] lg:w-[675px] w-[730px] '
                            />
                        </div>
                    </div>
                </section>

                {/* Section 6 */}
                <section className="flex flex-col lg:grid lg:grid-cols-2 items-center lg:px-0">
                    <div className="flex justify-center lg:order-first order-last lg:justify-start">
                        <div className="bg-blue-500 w-full h-full flex items-center justify-center lg:mb-0 mb-6">
                            <Image
                                src="/assets/approach/icon-launch.png"
                                alt='Launch'
                                width={500}
                                height={500}
                                className='lg:h-[540] h-[670px] lg:w-[675px] w-[730px] '
                            />
                        </div>
                    </div>
                    <div className=" lg:px-16 pl-5 lg:text-left">
                        <h2 className="text-3xl font-bold mb-4">Launch</h2>
                        <p className="text-[16px] text-gray-600  lg:px-0 text-left mb-6">
                            When we&#39;ve addressed all of the defects discovered during acceptance testing, validated
                            the
                            site, and checked accessibility, it&#39;s ready to go live!<br/><br/>
                            We provide maintenance and assistance to help you get the most out of your website, and we
                            strongly encourage frequent post-launch evaluations to track progress.

                        </p>
                    </div>
                </section>

                {/* Section 7 */}
                <section className="flex flex-col lg:grid lg:grid-cols-2 items-center lg:px-0">
                    {/* Left Text */}
                    <div className=" lg:px-[68px] lg:leading-7 pl-5 lg:text-left">
                        <h2 className="lg:text-5xl text-2xl font-bold text-left justify-start text-gray-800 lg:mb-12 mb-6">Review</h2>
                        <p className="text-[16px] text-gray-600  lg:px-0 text-left mb-6">
                            As your website settles in, we&#39;ll assess its progress with you and address any new
                            issues that
                            may arise. Going live might be only the beginning, and we are always available to assist
                            with
                            future upgrades that will help your business succeed. Our <Link
                            href='/grey_infotech/pages/seo'
                            className='text-gray-800 hover:text-teal-600 font-bold underline decoration-gray-300 underline-offset-[7px]'> SEO</Link> and
                            SEM experts can help you enhance your site&#39;s ranks and attract a larger
                            audience. <br/><br/>
                            <Link href='/grey_infotech/pages/digital-marketing'
                                  className='text-gray-800 hover:text-teal-600 font-bold underline decoration-gray-300 underline-offset-[7px]'>Learn
                                More About Our SEO and Marketing Services {'>'}</Link>

                        </p>
                    </div>
                    {/* Right Icon */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="bg-blue-500 w-full h-full flex items-center justify-center lg:mb-0 mb-6 ">
                            <Image
                                src="/assets/approach/icon-review.png"
                                alt='Review'
                                width={500}
                                height={500}
                                className='lg:h-[540] h-[670px] lg:w-[675px] w-[730px] '
                            />
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>)
    );
};

export default OurApproach;
