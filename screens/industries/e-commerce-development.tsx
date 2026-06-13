'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const ECommerceDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");


    // Floating button visibility hook
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200); // Show the button after scrolling 200px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // isDaytime react hook
    const [isDayTime, setIsDayTime] = useState<boolean>(() => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18;
    });

// Optional: if you want the value to update over time, use an interval (does not set state synchronously on mount)
    useEffect(() => {
        const id = setInterval(() => {
            const hour = new Date().getHours();
            setIsDayTime(prev => {
                const next = hour >= 6 && hour < 18;
                return prev === next ? prev : next;
            });
        }, 60_000); // check every minute

        return () => clearInterval(id);
    }, []);

    // Introductory section hook
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight * -0.1 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Development Solutions hook
    const handleScroll = () => {
        const sections = [
            "EWD",
            "MSMP",
            "EPSG",
            "ISCO",
            "ESEM",
        ];

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    setActiveId(sectionId);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
            setActiveId(target); // Ensure the arrow icon is displayed when a section is clicked
        }
    };

    // Partners Section hook
    const partners = [
        {id: 1, name: 'Partner 1', dayImage: 'poawd1.svg', nightImage: 'poawd.svg'},
        {id: 2, name: 'Partner 2', dayImage: 'hub1.svg', nightImage: 'hub.svg'},
        {id: 3, name: 'Partner 3', dayImage: 'car1.svg', nightImage: 'car.svg'},
        {id: 4, name: 'Partner 4', dayImage: 'pet1.svg', nightImage: 'pet.svg'},
        {id: 5, name: 'Partner 5', dayImage: 'sew1.svg', nightImage: 'sew.svg'},
        {id: 6, name: 'Partner 6', dayImage: 'tim1.svg', nightImage: 'tim.svg'},
        {id: 7, name: 'Partner 7', dayImage: 'pat1.svg', nightImage: 'pat.svg'},
        {id: 8, name: 'Partner 8', dayImage: 'kow1.svg', nightImage: 'kow.svg'},
        {id: 9, name: 'Partner 9', dayImage: 'afro1.svg', nightImage: 'afro.svg'},
        {id: 10, name: 'Partner 10', dayImage: 'cane1.svg', nightImage: 'cane.svg'},
    ];


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            {/* Header now provided globally by app/layout.tsx — duplicate render disabled to fix doubled header */ false && <Header/>}
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={"relative overflow-hidden lg:w-full lg:h-[720px] justify-center items-center md:w-full md:h-[700] w-full h-[700] pb-6"}>
                <video
                    src="/assets/ecom/hero.mp4"
                    autoPlay
                    loop
                    muted
                    className="lg:w-full lg:h-[720px] md:w-full md:h-[700] w-full h-[700] object-cover"
                />
                <div
                    className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-[90em] px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                        isDayTime ? 'text-white' : 'text-white'}`}>
                    <div
                        className="flex flex-col justify-start items-start border-b pb-[0.3em] border-gray-500/50 max-w-full w-full mx-auto ">
                        <h1
                            className={`px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[4em] w-auto h-auto leading-[1.1] font-[600]`}>
                            eCommerce Website <br className={'lg:block md:block hidden'}/>Design Agency
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Shopify, Magento, Big Cartel, WooCommerce—whatever your ecommerce platform, we&#39;ve
                                got
                                the expertise to support and scale your online store.
                            </p>
                        </div>
                        <div
                            className={'relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[8em]'}>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>8+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Years Experience</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>13+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Team Members</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>123+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Products Launched</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Introductory section */}
            <section ref={sectionRef}
                     className={`py-12 transition-colors duration-500 ${
                         isBackgroundActive
                             ? isDayTime
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                             : isDayTime
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                     }`}>
                <div
                    className='relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 md:gap-8 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className={'pt-2'}>
                        <h6 className='constant-text uppercase text-[0.85em] leading-[1.3]lg:font-[600] font-[600] tracking-wider'>
                            High-performing <br className={'lg:block md:block hidden'}/>eCommerce solutions
                        </h6>
                    </div>
                    <div
                        className='lg:-ml-[25em] md:-ml-[16em] md:pl-[6em] mx-auto w-auto sm:break-words sm:whitespace-normal'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            eCommerce Web Development
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    At Grey InfoTech, we deliver high-performance eCommerce solutions designed to help
                                    businesses sell online effectively and competitively. Our expert team specializes in
                                    creating tailored eCommerce platforms that not only showcase your products or
                                    services but also drive measurable results through increased traffic, conversions,
                                    and revenue. Every platform we build is designed with user experience, speed, and
                                    functionality in mind, ensuring your customers enjoy a seamless and engaging online
                                    shopping journey.<br/><br/>

                                    Our experience spans across diverse industries, having successfully supported
                                    retailers, manufacturers, wholesalers, and service providers in both
                                    Business-to-Consumer (B2C) and Business-to-Business (B2B) markets. From intuitive
                                    storefronts and product catalogs to secure payment gateways and multi-channel
                                    integration, we ensure every solution is scalable, reliable, and fully aligned with
                                    your operational and growth objectives. By implementing modern technologies and best
                                    practices, we build eCommerce platforms that are prepared to handle both current
                                    demands and future expansion.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Beyond development, we recognize that launching an eCommerce website is only part of
                                    the journey. Driving traffic, acquiring customers, and generating consistent online
                                    sales requires a comprehensive strategy. That’s why our services extend beyond
                                    technical delivery to include strategic consultation on digital marketing, customer
                                    engagement, and conversion optimization. This ensures your online store not only
                                    functions efficiently but also thrives in a competitive marketplace.<br/><br/>

                                    At Grey InfoTech, our approach combines technical excellence with business insight
                                    to create solutions that support sustainable growth. From initial planning and
                                    design to development, deployment, and long-term optimization, we provide end-to-end
                                    eCommerce services that deliver lasting value. By partnering with us, you gain more
                                    than just a website—you gain a digital asset designed to enhance your market
                                    presence, strengthen customer relationships, and drive measurable business success.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* eCommerce solutions */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[0.5em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'ecommerce solutions'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.3em] md:text-[2.5em] sm:text-[2em] text-[2em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                eCommerce <br className={'lg:block md:block hidden'}/>Solutions
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[3.5em] tracking-noromal'>
                                Our eCommerce solutions empower businesses to sell smarter with secure, scalable, and
                                user-friendly online stores. From seamless product management to optimized checkout
                                experiences, we deliver platforms designed to drive sales and enhance customer
                                satisfaction.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[6em] gap-6 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[6em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-white' : 'text-black'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] font-[300] relative space-y-1 md:break-words md:whitespace-normal ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-600' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "eCommerce Web Design", target: "EWD"},
                                    {id: "02", title: "Membership Site & Marketplaces", target: "MSMP"},
                                    {id: "03", title: "eCommerce Payment Systems & Gateways", target: "EPSG"},
                                    {id: "04", title: "Increase Sales & Conversions Online", target: "ISCO"},
                                    {id: "05", title: "eCommerce SEO, eCommerce Marketing", target: "ESEM"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 md:mt-3 mt-2'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
                                            }`}
                                        >
                                            <div className={'flex gap-2'}>
                                                <span className={'shrink-0'}>{item.id}</span>
                                                <span
                                                    className={`opacity-0 transition-opacity text-[1.5em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[8em] md:-ml-[4em] lg:mb-[19em] md:mb-[23em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 md:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'EWD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        eCommerce Web Design
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Shopify Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Online Store Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>eCommerce Strategy</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        At Grey InfoTech, we work with a wide range of leading eCommerce platforms to
                                        deliver solutions tailored to your unique business requirements. Our team has
                                        successfully implemented solutions using Shopify, Big Cartel, WooCommerce,
                                        and <Link href='/services/cms-development'
                                                  className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white  border-gray-800' : 'hover:border-black border-gray-300'}`}>Drupal</Link> Commerce,
                                        each selected based on its strengths and suitability for the
                                        project. By carefully evaluating your goals, operational needs, and scalability
                                        requirements, we determine the most effective platform to power your online
                                        store and support long-term growth.<br/><br/>

                                        Our eCommerce design team combines deep technical expertise with practical
                                        knowledge of online consumer behavior to create high-converting digital
                                        storefronts. From strategically placing purchase actions like “Buy” buttons to
                                        implementing best practices in product photography and designing persuasive
                                        calls to action, every element is optimized to enhance user experience and drive
                                        sales. This attention to detail ensures your eCommerce website is not only
                                        visually compelling but also functionally effective, helping you achieve
                                        measurable success in the competitive online marketplace.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'MSMP'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Membership Sites & Marketplaces
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Paywall Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Membership Site Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Custom eCommerce Development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, our eCommerce expertise extends far beyond selling physical
                                        products. We have successfully developed advanced solutions such as
                                        paywall-enabled membership platforms that securely process recurring payments
                                        for premium content and online services. Additionally, we have built
                                        marketplace-style websites that empower users to upload, manage, and sell
                                        products directly to one another, creating dynamic, revenue-generating
                                        ecosystems. Our ability to deliver these diverse eCommerce models ensures that
                                        we can meet the unique digital requirements of businesses seeking innovative
                                        ways to monetize their products, services, and content.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'EPSG'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        eCommerce Payment Systems & Gateways
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Online Payment System</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Innovative Payment Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>                                </span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Selecting the right payment system is a critical step in launching a successful
                                        eCommerce business, as it directly impacts revenue collection, customer
                                        experience, and operational efficiency. Today, businesses have access to a wide
                                        range of secure and innovative payment solutions, from widely trusted platforms
                                        like Stripe, PayPal, Google Checkout, SagePay, and Worldpay to emerging digital
                                        payment technologies that empower seamless online transactions. Leveraging the
                                        right payment gateway not only ensures smooth and reliable payment processing
                                        but also provides businesses and entrepreneurs with the flexibility and
                                        scalability needed to confidently sell and grow online.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'ISCO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Increase Sales & Conversions Online
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Experience Improvement</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Conversion Rate Strategies</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>A/B Testing Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, we offer a comprehensive approach to boosting your online
                                        sales by combining strategic visibility with optimized on-site conversions. From
                                        presenting your products and services effectively to guiding customers through a
                                        seamless purchasing journey, we leverage a range of proven tools and strategies
                                        to maximize results. Our team utilizes analytics, A/B testing, and funnel
                                        visualization to gain actionable insights into user behavior, allowing us to
                                        measure, refine, and enhance the customer experience continuously. By leaving no
                                        aspect of the sales process unexplored, we ensure your eCommerce platform
                                        performs at its best, driving engagement, conversions, and sustained revenue
                                        growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'ESEM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        eCommerce SEO, eCommerce Marketing
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>eCommerce Marketing Strategy</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Search Engine Visibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Sales-driven Marketing Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Building or relaunching your eCommerce website is only the first step—success
                                        depends on ensuring your customers can find and engage with your products
                                        online. This requires a comprehensive eCommerce marketing strategy designed to
                                        drive traffic, attract the right audience, and convert visits into
                                        sales.<br/><br/>

                                        At Grey InfoTech, we integrate eCommerce marketing and <Link
                                        href='/services/seo'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>SEO</Link> strategies
                                        into the
                                        foundation of every project. For new websites, we implement best practices from
                                        the very beginning to optimize visibility in search engines. For existing
                                        stores, we conduct detailed assessments to recommend improvements, enhancing
                                        your online presence and setting your sales on the right trajectory.<br/><br/>

                                        To maximize product discoverability, we leverage advanced techniques such as
                                        structured product schema, Google Merchant Center integration, and optimized
                                        product sitemaps. These strategies ensure that your products are accurately
                                        indexed, visible across relevant marketplaces, and positioned to convert
                                        potential customers into loyal buyers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'}
                 className={'lg:-mt-[28em] md:-mt-[27em] sm:-mt-[3em] -mt-[3em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/ecom/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative max-w-full  mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
                     isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div className={`justify-self-start text-start lg:pt-[5em] md:pt-[5em] pt-[2em] lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div
                    className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-6 lg:pb-[14em] md:pb-[14em] pb-[6em]`}>
                    {partners.map((partner) => (
                        <div key={partner.id} className={`flex justify-center items-center`}>
                            <Image
                                src={`/assets/partners/${isDayTime ? partner.dayImage || 'default.svg' : partner.nightImage || 'default.svg'}`}
                                alt={partner.name}
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default ECommerceDevelopment;