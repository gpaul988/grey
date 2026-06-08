import React, {useEffect, useRef, useState} from 'react';
import '../../app/globals.css';
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Header from "@/components/Header";

const AiDevelopmentServices = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

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

                if (top < windowHeight * -0.2 || bottom < windowHeight * -0.1) {
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
            "CACA",
            "BPA",
            "ACIS",
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

    // Countup hook for Digital partners
    const stats = [
        {label: 'Years Experience', value: 8, suffix: '+'},
        {label: 'Team Members', value: 10, suffix: '+'},
        {label: 'Products Launched', value: 150, suffix: '+'},
        {label: 'Successful rebrands', value: 27, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];

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

    // Reasons
    const reasons = [
        {
            id: 1,
            title: 'Creative Innovation',
            description: (
                <>
                    Innovation drives everything we do at Grey InfoTech. Whether it’s integrating the latest
                    technologies, enhancing user experiences, or building robust, scalable backends, we’re always
                    looking for smarter, more effective ways to give your business a competitive edge. Our team combines
                    creative thinking with technical expertise to develop solutions that not only look great and
                    function flawlessly but also help you achieve measurable business results in a rapidly evolving
                    digital landscape.
                </>
            ),
            images: ['/assets/ads/inn.jpg']
        },
        {
            id: 2,
            title: 'Experienced Team',
            description: (
                <>
                    Our strength lies in the depth and diversity of our team. Since 2018, we’ve brought together a
                    powerhouse of seasoned developers, UI/UX designers, project managers, and industry consultants with
                    hands-on experience across sectors including fintech, logistics, healthcare, education, and
                    e-commerce. This rich blend of cross-industry expertise allows us to grasp complex business
                    challenges quickly and craft high-performance applications that are strategically aligned with your
                    goals. Our team’s ability to adapt and innovate ensures that we deliver tailored solutions that not
                    only meet technical requirements but also drive measurable business outcomes.
                </>
            ),
            images: ['/assets/ads/exp.jpg']
        },
        {
            id: 3,
            title: 'Customer Service',
            description: (
                <>
                    From day one, you’ll experience a service culture grounded in professionalism, responsiveness, and
                    transparency. At Grey InfoTech, we prioritize clear and consistent communication, keeping you
                    informed at every stage of the development process. Our team is committed to staying on schedule,
                    proactively managing expectations, and addressing challenges before they become issues—ensuring a
                    seamless, collaborative, and stress-free experience from concept to launch.
                </>
            ),
            images: ['/assets/ads/cust.jpg']
        },
        {
            id: 4,
            title: 'Scalability Of Services',
            description: (
                <>
                    As your business expands, your software requirements evolve too. At Grey InfoTech, we provide
                    flexible and scalable solutions tailored to every stage—from Minimum Viable Products (MVPs) for
                    startups to robust, enterprise-grade systems. Our modular development approach allows your
                    applications to grow seamlessly with your organization, minimizing costly rebuilds and enabling
                    efficient enhancements that keep pace with your changing needs.
                </>
            ),
            images: ['/assets/ads/scal.jpg']
        },
        {
            id: 5,
            title: 'Proactive, Client Facing',
            description: (
                <>
                    We go beyond simply executing tasks — we become your strategic partner. By taking a proactive
                    approach, we anticipate your needs, recommend improvements, and offer valuable insights throughout
                    the development journey. With Grey InfoTech, you’re not just hiring a vendor; you’re gaining a
                    dedicated technology partner fully invested in driving your success.
                </>
            ),
            images: ['/assets/ads/pro.jpg']
        },
    ];

    // Why Grey infoTech For Your App Project Hook
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [reasons.length]);

    // FAQ Hook
    const [onIndex, setOnIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOnIndex(onIndex === index ? null : index);
    }


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <Header/>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[3em] md:mt-[3em] mt-[1.5em] leading-[1.1] font-[600] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    Artificial Intelligence <br className={'lg:block md:block hidden'}/>Development <br
                    className={'lg:block md:block hidden'}/> Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Empower your company with next-generation AI solutions designed to simplify processes, strengthen
                    business insights, and ignite innovation.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/ads/hero.jpg'}
                        alt={'Artificial Intelligence Development Hero'}
                        width={1920}
                        height={1080}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.8em] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            ai development agency
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='capitalize lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Innovative, intelligent <br className={'lg:block md:block hidden'}/>and scalable AI
                            solutions
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Grey InfoTech is a forward-thinking AI development company headquartered in Port
                                    Harcourt, Nigeria, with a mission to help businesses embrace the future through
                                    intelligent digital solutions. With a strong foundation in custom software
                                    development and deep expertise in artificial intelligence, we partner with both
                                    startups and enterprises across diverse sectors—including fintech, healthcare,
                                    logistics, real estate, and more. Our work is driven by a results-oriented mindset:
                                    we aim not only to introduce AI but to apply it in ways that drive meaningful
                                    change—whether that’s automating routine operations, enhancing customer experiences,
                                    improving business forecasting, or enabling data-driven innovation. By combining a
                                    strategic understanding of business goals with strong technical proficiency, Grey
                                    InfoTech delivers AI solutions that are impactful, scalable, and future-ready. We
                                    don’t just build software—we help companies rethink what’s possible.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Our comprehensive suite of AI development services is designed to meet the evolving
                                    needs of modern businesses seeking competitive advantage through innovation. From
                                    ideation to deployment, we guide clients through every step of their AI
                                    journey—offering consulting, solution design, model development, and ongoing
                                    support. We specialise in areas such as machine learning, computer vision, natural
                                    language processing, recommendation systems, intelligent automation, and predictive
                                    analytics. Whether you&#39;re enhancing an existing digital product with AI
                                    capabilities
                                    or building an entirely new AI-powered application, our team leverages
                                    state-of-the-art frameworks, robust data pipelines, and cloud-native architectures
                                    to ensure speed, scalability, and reliability. At Grey InfoTech, we pride ourselves
                                    on building solutions that don’t just meet requirements—they deliver measurable
                                    business outcomes. With an agile, collaborative approach and a commitment to
                                    excellence, we work as an extension of your team to deliver transformative value and
                                    position your organisation at the forefront of AI-driven growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Development Services */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] lg:pt-[2em]  ${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div id={'development service'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative border-b pb-[1em] border-gray-500 max-w-full mx-auto`}>
                        <h2 className='lg:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                            AI development services
                        </h2>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div className='lg:sticky top-28 lg:h-screen overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-100'
                            }`}>
                                {[
                                    {id: "01", title: "Business Process Automation With AI", target: "BPA"},
                                    {id: "02", title: "AI Consultancy & Implementation Strategy", target: "ACIS"},
                                    {id: "03", title: "Custom AI Chatbots & Agents", target: "CACA"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-400 font-[300]'}`
                                            }`}
                                        >
                                            <div className={'flex gap-4'}>
                                                <span className={'shrink-0'}>{item.id}</span>
                                                <span
                                                    className={`opacity-0 transition-opacity text-[2em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[7em] lg:mb-[23em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BPA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Business Process Automation With
                                        AI</h2>

                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Supercharge your internal workflows by embedding AI directly into your core
                                        business operations. At Grey InfoTech, we help organisations transform
                                        efficiency and scale intelligently by integrating Artificial Intelligence into
                                        everyday processes. From intelligent document classification and automated data
                                        entry to predictive analytics and AI-driven decision support, our solutions are
                                        designed to solve real operational challenges. Leveraging technologies like
                                        natural language processing, computer vision, and machine learning, we automate
                                        tasks such as sorting customer inquiries, extracting data from unstructured
                                        documents, and generating insights from large datasets. These AI-powered systems
                                        reduce manual effort, minimise human error, and speed up decision-making,
                                        enabling faster, more accurate, and cost-effective operations. Whether it’s
                                        auto-triaging support tickets, forecasting inventory, or streamlining compliance
                                        processes, our AI solutions deliver measurable benefits—saving time, lowering
                                        costs, and freeing teams to focus on strategic goals.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ACIS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>AI Consultancy & Implementation
                                        Strategy</h2>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Not sure where to start with AI? At Grey InfoTech, our AI consultancy and
                                        strategy services are designed to demystify artificial intelligence and help you
                                        harness its potential effectively. We partner with CTOs, technology leaders, and
                                        business stakeholders to identify the most impactful use cases for AI within
                                        your organisation—whether it&#39;s improving customer service, automating
                                        operations, or uncovering insights from complex data. Our process begins with
                                        in-depth workshops to understand your challenges, followed by a detailed AI
                                        readiness assessment. We then create a clear, actionable AI adoption roadmap
                                        tailored to your business objectives. This includes selecting the right
                                        technologies—such as OpenAI, Claude, or Google AI—ensuring your data
                                        infrastructure can support AI integration, and aligning every step with
                                        compliance and long-term value creation. From proof-of-concept development to
                                        full-scale implementation, we provide strategic guidance and hands-on expertise
                                        to ensure your AI journey delivers measurable results and competitive advantage.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CACA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Custom AI Chatbots & Agents</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Technology consultation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>In-house dev team</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>MVP</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Market research</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Engage your users around the clock and streamline communication with
                                        intelligent, AI-driven <span className={'font-[600]'}>chatbots</span> and
                                        virtual agents tailored to your business. At Grey InfoTech, we specialise in
                                        building custom AI assistants that go far beyond simple Q&A. Whether it&#39;s
                                        resolving customer support issues, guiding users through your services,
                                        onboarding new clients, or serving as internal knowledge hubs for employees, our
                                        bots are designed to deliver value at every interaction. Leveraging powerful
                                        frameworks like <span className={'font-[600]'}>LangChain</span> and
                                        state-of-the-art natural language processing (NLP) models, we craft chatbots
                                        capable of understanding context, executing multi-step tasks, and even making
                                        dynamic decisions based on user intent. These AI agents can be embedded
                                        seamlessly into your website, mobile app, or messaging platforms like WhatsApp,
                                        Slack, or Microsoft Teams. The result is faster response times, increased user
                                        satisfaction, reduced workload on your human teams, and ultimately, more
                                        scalable and cost-effective customer and employee engagement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'-mt-[30em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/ads/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Web app business benefits – need content */}
            <div
                className={`relative max-w-full w-full py-16 lg:mt-[3em] md:mt-[3em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h2 className='lg:text-[3em] capitalize md:text-[2em] sm:text-[1em] font-[500] justify-center tracking-tight leading-[1.2]'>
                            Web app <br className={'lg:block md:block hidden'}/>business benefits <br
                            className={'lg:block md:block hidden'}/>– need content
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.87em] font-[300] justify-center tracking-normal text-justify leading-[1.3] lg:-ml-[1.2em] md:-ml-[1.2em]'>
                            Custom web applications provide all the capabilities of traditional software, but with
                            greater flexibility, cost-efficiency, and scalability to match your business goals. At Grey
                            InfoTech, we&#39;ve delivered tailored solutions across industries such as finance,
                            technology,
                            construction, and recruitment. Partner with us for accelerated delivery, reliable
                            performance, and a hassle-free development experience from start to finish.
                        </p>
                    </div>
                </div>
                <div
                    className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 lg:mb-8 mb-8'>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/ads/icon/rel.svg' : '/assets/ads/icon/rel1.svg'}
                            alt='Reliability'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            reliability
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            A well-architected web application is the foundation of reliable, high-performing software.
                            By applying best practices in design, development, and infrastructure, we ensure your app is
                            stable, scalable, and secure from the ground up. This not only reduces the likelihood of
                            downtime or performance issues but also minimises long-term maintenance costs. Clear
                            architecture makes it easier to identify and resolve bugs quickly, adapt to changing
                            business requirements, and onboard new developers with ease. At Grey InfoTech, we build
                            robust web apps that grow with your business, saving you time and money while delivering a
                            consistently smooth user experience.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/ads/icon/thi.svg' : '/assets/ads/icon/thi1.svg'}
                            alt='Cost Savings'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Cost Savings
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Web applications offer a fast and cost-effective path to getting your digital product to
                            market. Unlike traditional desktop software, web apps can be developed, updated, and
                            distributed quickly—without the need for platform-specific deployment or manual updates for
                            users. This streamlined approach reduces development time and overhead costs, allowing you
                            to focus resources on functionality, user experience, and growth. At Grey InfoTech, we
                            leverage modern frameworks and agile practices to deliver powerful web applications that
                            meet your business goals efficiently and affordably.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/ads/icon/sca.svg' : '/assets/ads/icon/sca1.svg'}
                            alt='Scalability'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Scalability
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Custom web applications offer the flexibility and scalability that modern businesses need to
                            stay competitive. As your company evolves, your software can evolve too—tailored web apps
                            can be updated and expanded to meet shifting operational needs, user demands, and market
                            conditions. Built on scalable server architectures, these applications allow you to adjust
                            resources dynamically, scaling up during peak periods and down when demand is lower. This
                            ensures optimal performance, cost-efficiency, and future readiness. At Grey InfoTech, we
                            build adaptive, scalable web apps that grow alongside your business, ensuring long-term
                            value and resilience.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/ads/icon/speed.svg' : '/assets/ads/icon/speed1.svg'}
                            alt='Speed Development'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            speed development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            With access to a wide range of open-source frameworks, pre-built components, and powerful
                            development toolkits, we accelerate the custom software development process—reducing both
                            time and cost. These resources enable us to build robust, tailored solutions without
                            starting from scratch, allowing businesses to launch their products faster and respond
                            swiftly to market demands. At Grey InfoTech, we leverage these modern development
                            accelerators to deliver high-quality, scalable software that gives you a competitive edge
                            and gets your ideas into the hands of users with speed and precision.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/ads/icon/web.svg' : '/assets/ads/icon/web1.svg'}
                            alt='Web App Security'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            web app security</h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Our dedicated security team implements robust measures to protect your web applications
                            against common vulnerabilities such as SQL injection, cross-site scripting (XSS), and
                            cross-site request forgery (CSRF). By integrating best-in-class security practices and
                            continuously monitoring for threats, we ensure your application and sensitive data remain
                            safe. Business owners can rest assured that both their operational integrity and their
                            customers&#39; information are protected—building trust, ensuring compliance, and reducing
                            risk
                            in today’s increasingly digital landscape.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/ads/icon/thi.svg' : '/assets/ads/icon/thi1.svg'}
                            alt='Third-Party Integration'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            third-party integration
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Web apps offer powerful integration capabilities, enabling seamless connectivity with
                            essential third-party services such as payment gateways, CRM systems, analytics platforms,
                            and marketing automation tools. This flexibility allows businesses to enhance their software
                            with extended functionality, streamline operations, and deliver a more cohesive user
                            experience. By connecting your web app with the tools you already use—or plan to use—you can
                            unlock greater efficiency, improve customer engagement, and scale your digital ecosystem
                            with ease.
                        </p>
                    </div>
                </div>
            </div>

            {/* AI Technologies we use */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:py-14 py-8 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3em] capitalize text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            AI Technologies <br className={'lg:block md:block hidden'}/>we use
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            Technology to construct our AI solutions, selecting the most appropriate one for every
                            project. Our toolset consists of:
                        </p>
                    </div>
                </div>

                {/* Open AI */}
                <div id={'open'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Open AI
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[4.8em] md:pl-[18em] md:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/ads/open.png'
                                alt='Open AI'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We deliver natural language understanding, content generation, and conversational AI to help
                            your business communicate smarter and automate engagement.
                        </p>
                    </div>
                </div>

                {/* Anthropic Claude */}
                <div id={'claude'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Anthropic Claude
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.8em] md:pl-[18em] md:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/ads/claude.png'
                                alt='Anthropic Claude'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            A powerful AI assistant model recognized for its advanced long-form reasoning capabilities
                            and consistent, reliable performance across complex tasks.
                        </p>
                    </div>
                </div>

                {/* Google Vertex AI & PaLM */}
                <div id={'google'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Google Vertex <br className={'lg:block md:block hidden'}/>AI & PaLM
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/ads/google.png'
                                alt='Google Vertex AI & PaLM'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Scalable cloud-based AI deployment and seamless integration within the Google Cloud
                            ecosystem to accelerate your AI initiatives.
                        </p>
                    </div>
                </div>

                {/* LangChain */}
                <div id={'lang'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            LangChain
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[4.8em] md:pl-[18em] md:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/ads/lang.jpg'
                                alt='LangChain'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            A powerful framework for building advanced AI agents and chatbots by orchestrating multiple
                            models and data sources into a unified system.
                        </p>
                    </div>
                </div>

                {/* Vector Databases */}
                <div id={'vector'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                            Vector Databases
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] md:pl-[18em] lg:-mt-[4.5em] md:-mt-[4.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/ads/vector.png'
                                alt='Vector Databases'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Enables storage and retrieval of embeddings to power Retrieval-Augmented Generation (RAG),
                            grounding AI responses in your proprietary data.
                        </p>
                    </div>
                </div>

                {/* Custom Integrations & APIs */}
                <div id={'custom'}
                     className={`grid lg:grid-cols-2  md:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4  ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Custom <br className={'lg:block md:block hidden'}/>Integrations & APIs
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] md:pl-[18em] lg:-mt-[4.5em] md:-mt-[4.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/ads/api.jpg'
                                alt='Custom Integrations & APIs'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Integrating AI with your existing systems, databases, and third-party services to deliver
                            seamless, end-to-end solutions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div
                className={`relative py-16 lg:mb-10 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                    isDayTime ? 'text-black' : 'text-white'
                }`}>
                <h1 className={'lg:text-5em] md:text-[4em] sm:text-[3em] text-[2em] font-[600] leading-[1.1]  mb-[0.6em]'}>
                    Your trusted <br className={'lg:block md:block hidden'}/>digital partner
                </h1>
                <p className={'text-[0.873em] font-[300] leading-[1.5] text-justify lg:pr-[33em] mb-10'}>
                    We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                    applications that drive real results. From funded startups to established businesses, we&#39;ve
                    helped a wide range of clients bring their digital products to life—delivering standout experiences
                    that fuel growth, engagement, and long-term success.
                </p>
                <Link href='/contact'>
                    <button
                        className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[3%]`}></span>
                        <span
                            className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                        <span
                            className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                        <span
                            className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                    </button>
                </Link>

                {/* Countup */}
                <div
                    className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-300 ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}
                    id={'countup'}
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center "
                        >
                            <h2 className="lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.5em] text-start font-[600]">
                                <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''}/>
                            </h2>
                            <p className="text-[0.873em] font-[400] mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stages of our development process */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'development process'}
                     className={`pt-[5em] relative -mt-14 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Process Header */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] capitalize lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                Stages of our <br className={'lg:block md:block hidden'}/>AI development process
                            </h2>
                            <p className={'text-[0.87em] font-[300] leading-[1.5] tracking-tight'}>
                                We follow a structured, business-driven approach to AI development—ensuring each
                                solution is practical, scalable, and tailored to real-world use.
                            </p>
                        </div>
                    </div>

                    {/* X-Scroll */}
                    <section ref={targetRef} className="h-[250vh]">
                        <div
                            className="sticky top-[11em] flex h-[80vh] w-full max-w-full items-center overflow-hidden">
                            <motion.div
                                style={{x}}
                                className="flex lg:gap-[15em] md:gap-[15em] gap-[10em]" // Add padding for centering
                            >
                                {[
                                    {
                                        id: 1,
                                        subtitle: "01",
                                        title: (
                                            <>
                                                Discovery & Strategy
                                            </>
                                        ),
                                        description: (
                                            <div>
                                                <p className={'mb-3'}>We begin by aligning AI capabilities with your
                                                    business goals through a structured discovery phase. This involves
                                                    deep engagement with your stakeholders to uncover challenges,
                                                    opportunities, and strategic objectives. Key activities in this
                                                    stage include:</p>
                                                <ul className={'list-disc mb-3 ml-4'}>
                                                    <li className={'mb-2'}>Business needs assessment
                                                    </li>
                                                    <li className={'mb-2'}>Use case identification
                                                    </li>
                                                    <li className={'mb-2'}>Feasibility analysis
                                                    </li>
                                                    <li className={'mb-2'}>ROI estimation and roadmap planning</li>
                                                </ul>
                                                <p><span className={'font-[500]'}>Outcome:</span> A well-defined AI
                                                    strategy and actionable roadmap that ensures every step aligns with
                                                    your business objectives and delivers real value.</p>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: "Data Audit & Preparation",
                                        description: (
                                            <div>
                                                <p className={'mb-3'}>Data is the cornerstone of effective AI solutions.
                                                    In this stage, we thoroughly evaluate and prepare your data assets
                                                    to ensure they are accurate, relevant, and usable for model
                                                    development. Our process includes:</p>
                                                <ul className={'list-disc mb-3 ml-4'}>
                                                    <li className={'mb-2'}>Data collection and aggregation
                                                    </li>
                                                    <li className={'mb-2'}>Data cleaning and transformation
                                                    </li>
                                                    <li className={'mb-2'}>Exploratory Data Analysis (EDA)
                                                    </li>
                                                    <li className={'mb-2'}>Data labeling (if required)</li>
                                                </ul>
                                                <p><span className={'font-[500]'}>Outcome:</span> A high-quality,
                                                    structured dataset that forms a reliable foundation for training,
                                                    testing, and validating AI models, ensuring dependable outputs and
                                                    accurate predictions.</p>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: "Model Design & Development",
                                        description: (
                                            <div>
                                                <p className={'mb-3'}>At this stage, our data scientists and AI
                                                    engineers collaborate to design and develop machine learning models
                                                    tailored specifically to your business challenge. We apply rigorous
                                                    scientific and engineering principles to ensure the model performs
                                                    accurately and reliably in real-world scenarios. This includes:</p>
                                                <ul className={'list-disc mb-3 ml-4'}>
                                                    <li className={'mb-2'}>Model selection and architecture design
                                                    </li>
                                                    <li className={'mb-2'}>Model training and tuning
                                                    </li>
                                                    <li className={'mb-2'}>Algorithm optimization
                                                    </li>
                                                    <li className={'mb-2'}>Evaluation using relevant metrics</li>
                                                </ul>
                                                <p><span className={'font-[500]'}>Outcome:</span> A thoroughly
                                                    validated, high-performing AI model built to deliver actionable
                                                    insights or automation capabilities, ready for deployment in
                                                    real-world environments.</p>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        subtitle: "04",
                                        title: (
                                            <>
                                                Validation & Testing
                                            </>
                                        ),
                                        description: (
                                            <div>
                                                <p>
                                                    Before any AI solution is deployed into production, it must undergo
                                                    rigorous testing to ensure it performs reliably and delivers
                                                    consistent results. At this stage, we validate the model using
                                                    cross-validation techniques and independent test datasets to confirm
                                                    its ability to generalise across unseen data. We benchmark
                                                    performance against relevant metrics, such as accuracy, precision,
                                                    recall, and F1-score, to evaluate how well the model meets defined
                                                    success criteria. Additionally, we conduct stress tests to identify
                                                    how the model handles edge cases and rare scenarios, ensuring
                                                    robustness under varying conditions. Equally important is the
                                                    assessment of bias and fairness, especially in applications that may
                                                    impact decision-making processes—our team tests the model for
                                                    unintended bias and makes necessary adjustments to maintain ethical
                                                    standards. The goal is not only to confirm technical soundness but
                                                    also to build trust in the solution’s reliability.
                                                    <br/><span className={'font-[500]'}>Outcome:</span> A robust,
                                                    high-confidence AI model that is fully validated and ready for
                                                    real-world deployment
                                                </p>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 5,
                                        subtitle: "05",
                                        title: (
                                            <>
                                                Integration & Deployment
                                            </>
                                        ),
                                        description: (
                                            <div>
                                                <p>
                                                    Once the AI model has been validated, we move to the critical phase
                                                    of integration and deployment. Our team ensures the AI solution is
                                                    seamlessly embedded into your existing digital infrastructure—be it
                                                    a web application, mobile app, backend system, or enterprise
                                                    platform. This involves deploying the model through scalable APIs or
                                                    microservices that enable real-time or batch interactions with other
                                                    components of your software ecosystem. We also manage smooth
                                                    integration with enterprise tools such as CRM, ERP, or BI systems,
                                                    ensuring the AI capabilities enhance, rather than disrupt, existing
                                                    workflows. If applicable, we refine the user interface and
                                                    experience to accommodate AI-driven features, ensuring they are
                                                    intuitive, accessible, and add tangible value to the end-user.
                                                    Security and compliance are prioritised at every step, with thorough
                                                    reviews to meet data privacy regulations and industry standards. By
                                                    the end of this phase, you receive a fully operational,
                                                    production-ready AI solution that’s tightly aligned with your
                                                    technology stack and business processes.
                                                    <br/><span className={'font-[500]'}>Outcome:</span> A seamlessly
                                                    deployed AI system integrated into your environment and ready to
                                                    deliver value from day one.
                                                </p>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 6,
                                        subtitle: "06",
                                        title: (
                                            <>
                                                Monitoring & Continuous Improvement
                                            </>
                                        ),
                                        description: (
                                            <div>
                                                <p>
                                                    AI deployment marks the beginning of an ongoing journey rather than
                                                    a final destination. To ensure your AI solution continues to deliver
                                                    optimal performance and adapts to changing data and business needs,
                                                    we provide comprehensive monitoring and continuous improvement
                                                    services. Our team tracks model performance in real-time using
                                                    advanced analytics and alerting systems, quickly identifying any
                                                    drift, degradation, or anomalies that could impact accuracy or
                                                    reliability. We implement automated retraining pipelines to keep the
                                                    models updated with fresh data, maintaining relevance and precision
                                                    without manual intervention. Additionally, we address error handling
                                                    and anomaly detection proactively to minimise disruptions and ensure
                                                    smooth operation. Based on user feedback and evolving business
                                                    goals, we work with you to enhance existing features or introduce
                                                    new capabilities, ensuring the AI system grows and evolves alongside
                                                    your organisation. This proactive, iterative approach transforms
                                                    your AI investment into a dynamic asset that consistently drives
                                                    business value.
                                                    <br/><span className={'font-[500]'}>Outcome:</span> An adaptive,
                                                    resilient AI system that improves continuously, supporting your
                                                    long-term success.
                                                </p>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 7,
                                        subtitle: "07",
                                        title: (
                                            <>
                                                User Training & Documentation
                                            </>
                                        ),
                                        description: (
                                            <div>
                                                <p>
                                                    To maximise the value of your AI solution and ensure smooth
                                                    adoption, we provide tailored training and comprehensive
                                                    documentation designed to empower your team. Our custom training
                                                    sessions equip your staff with the knowledge and skills needed to
                                                    effectively operate, manage, and optimise the AI system. Alongside
                                                    hands-on learning, we deliver clear, detailed user manuals and API
                                                    documentation that serve as ongoing resources for reference and
                                                    troubleshooting. We also share industry best practices to help your
                                                    team maintain system performance, handle updates, and leverage AI
                                                    capabilities confidently. By investing in user education and robust
                                                    documentation, we help you achieve seamless integration and
                                                    sustained success with your AI initiatives.
                                                </p>
                                            </div>
                                        ),
                                    },
                                ].map((card, index, array) => (
                                    <div
                                        key={card.id}
                                        className={`group relative h-[450px] w-[450px] overflow-hidden flex flex-col items-start justify-self-start text-start ${
                                            isDayTime ? 'text-white' : 'text-black'
                                        } ${index === array.length - 1 ? 'ml-auto' : ''}`} // Ensure last item aligns
                                    >
                                        <h3 className="text-[1em] font-[400] text-gray-500">{card.subtitle}</h3>
                                        <h2 className="sm:text-[1.5em] md:text-[2.3em] lg:text-[2.3em] font-[500] mt-4 leading-[1.1]">{card.title}</h2>
                                        <div
                                            className="text-[0.873em] font-[300] mt-4 text-justify">{card.description}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative max-w-full  mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
                     isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div className={`justify-self-start text-start lg:mt-12 mt-6 lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div className={`grid lg:grid-cols-5 grid-cols-2 gap-6 lg:pb-12 lg:mb-10 mb-8`}>
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

            {/* last image*/}
            <div id={'last-image'} className={' h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/ads/last.jpg'}
                    alt={'Last Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why Grey InfoTech for your app project */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div
                    className={`relative lg:pt-32 lg:pb-14 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative lg:max-w-full mx-auto border-b-[0.001em] pb-2`}>
                        <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tight leading-[1.1] lg:pb-6'>
                            Why Grey InfoTech For <br className={'lg:block md:block hidden'}/>Your App Project
                        </h2>
                    </div>
                    <div
                        className='relative lg:mt-[6em] md:mt-[6em] mt-[3em]mx-auto px-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-24 md:mb-24 mb-12'>
                        {/* Left Section */}
                        <div
                            className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4`}>
                            {reasons.map((reason, index) => (
                                <div
                                    key={reason.id}
                                    className={`relative mb-6 ${
                                        index + 1 === activeIndex
                                            ? isDayTime
                                                ? 'bg-gray-50 py-5'
                                                : 'bg-gray-950 py-5'
                                            : ''
                                    }`}
                                >
                                    <h3
                                        className={`relative leading-[1.2] lg:text-[1.5em] md:text-[1.5em] text-[1em] mb-4 font-[600] cursor-pointer transition-all ${
                                            index + 1 === activeIndex
                                                ? isDayTime
                                                    ? 'text-black font-[600]'
                                                    : 'text-white font-[600]'
                                                : 'text-gray-500'
                                        }`}
                                        onClick={() => setActiveIndex(index + 1)}
                                    >
                                        {reason.title}
                                    </h3>
                                    <div className={'lg:pr-[9.3em] md:pr-[9.3em]'}>
                                        <AnimatePresence mode="wait">
                                            {index + 1 === activeIndex && (
                                                <motion.div
                                                    key={reason.id}
                                                    initial={{opacity: 0, y: -20}}
                                                    animate={{opacity: 1, y: 0}}
                                                    exit={{opacity: 0, y: -20}}
                                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                                    className={`relative text-justify inline-block ${
                                                        isDayTime ? 'text-black font-[300]' : 'text-white font-[300]'
                                                    }`}
                                                >
                                                    {reason.description}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Right Section */}
                        <div className='lg:mt-[2em] md:mt-[2em] h-auto w-full max-w-full sticky'>
                            {reasons[activeIndex - 1]?.images?.map((image, idx) => (
                                <Image
                                    key={idx}
                                    src={image}
                                    alt={`Reason ${activeIndex} Image ${idx + 1}`}
                                    width={1024}
                                    height={583}
                                    className="mb-4 object-cover"
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        className={`items-center ${isDayTime ? 'text-black' : 'text-white'} justify-center`}>
                        <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.1] pb-6 text-center'>
                            Ready to start the <br className={'lg:block md:block hidden'}/>conversation?
                        </h2><br/>
                        <Link href='../contact.tsx' className='flex items-center justify-center-safe text-center'>
                            <button
                                className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em] border tracking-tighter rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-[4em] -translate-y-[2.8em] absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                                <span
                                    className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                <span
                                    className={`relative w-full text-left text-black ${isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>Get
                                started <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                <span className="absolute inset-0 rounded-full "></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* FAQ section */}
            <div id={'faq'} className={`relative lg:-mt-[5em] lg:py-36 mb-16 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>FAQ
                            About AI Development
                        </h2>
                        <p className={'text-[0.83em] font-[300] '}>The most effective way to address these questions is
                            through an initial consultation, where <br className={'lg:block md:block hidden'}/>we can
                            assess the
                            scope and requirements of your app.
                        </p>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-2'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>What types of AI solutions do you develop?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <div
                                className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p className={'mb-3'}>
                                    We build a wide range of AI-powered solutions, including:
                                </p>
                                <ul className={'list-disc mb-3 ml-4'}>
                                    <li className={'mb-2'}>Predictive analytics and forecasting models</li>
                                    <li className={'mb-2'}>Natural Language Processing (NLP) for chatbots and sentiment
                                        analysis
                                    </li>
                                    <li className={'mb-2'}>Computer vision for image and video analysis</li>
                                    <li className={'mb-2'}>Recommendation engines</li>
                                    <li className={'mb-2'}>Intelligent automation (e.g., document processing, fraud
                                        detection)
                                    </li>
                                </ul>
                                <p>
                                    Our team customizes each solution to align with your business goals and industry
                                    needs.
                                </p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do I know if AI is right for my business?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                If your business deals with large volumes of data, repetitive tasks, or requires
                                real-time decision-making, AI can provide significant value. During our consultation, we
                                assess your use case and advise whether AI will provide measurable ROI or if another
                                tech solution is more suitable.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to develop an AI solution?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <div
                                className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p className={'mb-3'}>
                                    Development timelines vary depending on project complexity, data availability, and
                                    required integrations. Typically:
                                </p>
                                <ul className={'list-disc mb-3 ml-4'}>
                                    <li className={'mb-2'}>Proof of Concept (PoC): 2–6 weeks</li>
                                    <li className={'mb-2'}>MVP or Pilot: 2–6 months</li>
                                    <li className={'mb-2'}>Full-scale deployment: 4–10+ months</li>
                                </ul>
                                <p>
                                    We follow agile methodology to deliver value incrementally.
                                </p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do I need to provide my own data?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                In most cases, yes — AI models need data to learn. We’ll work with your existing data,
                                help clean and prepare it, and where needed, supplement it with third-party datasets. If
                                you don&#39;t have data, we can explore synthetic data or public sources depending on
                                the
                                use case.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How accurate are your AI models?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Accuracy depends on the quality and quantity of data, the problem being solved, and
                                model complexity. We benchmark model performance throughout development and use
                                continuous learning and optimization to improve results over time. Transparency and
                                explainability are part of our delivery.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Can AI be integrated into my existing systems?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes, we specialize in integrating AI models into existing applications, CRM systems,
                                ERPs, and mobile/web platforms. We design APIs and microservices for seamless
                                integration and minimal disruption to your workflows.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you ensure data privacy and compliance?</span>
                            {onIndex === 6 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 6 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We follow strict data protection protocols aligned with regulations such as GDPR, HIPAA,
                                and local laws. Our AI solutions are developed with security-first principles and
                                anonymization techniques where applicable. All client data is handled with full
                                confidentiality.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What industries do you serve with AI solutions?</span>
                            {onIndex === 7 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 7 && (
                            <div
                                className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p className={'mb-3'}>
                                    We deliver tailored AI solutions across a wide range of industries, helping
                                    businesses solve real-world problems and drive innovation:
                                </p>
                                <ul className={'list-disc mb-3 ml-4'}>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Fintech</span> – Fraud detection, credit risk
                                        assessment, and intelligent automation
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Healthcare</span> – Diagnostic support, patient
                                        triage, and predictive analytics
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Logistics</span> – Route optimisation, demand
                                        forecasting, and supply chain intelligence
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Retail & E-commerce</span> – Recommendation
                                        engines, customer behaviour insights, and inventory forecasting
                                    </li>
                                    <li className={'mb-2'}>
                                        <span className={'font-[500]'}>Education</span> – Adaptive learning platforms,
                                        performance analytics, and intelligent tutoring systems
                                    </li>
                                </ul>
                                <p>
                                    Whether you&#39;re a startup or an enterprise, our AI solutions are built to meet
                                    the
                                    unique demands of your industry and deliver measurable results.
                                </p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you provide post-launch support and maintenance?</span>
                            {onIndex === 8 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 8 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes, at Grey InfoTech, our commitment doesn’t end at deployment. We offer comprehensive
                                post-launch support, including system monitoring, model retraining, performance
                                optimisation, and ongoing maintenance. As your data evolves, we ensure your AI models
                                stay accurate, relevant, and aligned with your business objectives—delivering continuous
                                value over time.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What makes Grey InfoTech the right partner for AI development?</span>
                            {onIndex === 9 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 9 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Grey InfoTech stands out by combining deep technical expertise with real-world business
                                insight. Our multidisciplinary team—consisting of data scientists, AI engineers, and
                                industry consultants—works collaboratively to build intelligent solutions tailored to
                                your needs. We align technology with your goals, emphasise transparent communication,
                                and focus on agile, result-driven delivery. With us, you gain a partner that’s fully
                                invested in your success from concept to long-term impact.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default AiDevelopmentServices;