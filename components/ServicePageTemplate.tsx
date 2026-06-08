import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import {ArrowLeft, ArrowRight, Quote} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButton from '@/components/FloatingButton';

export interface SolutionItem {
    id: string;          // "01"
    title: string;       // "Smart Contract Development"
    target: string;      // short anchor id e.g. "SC"
    tags: string[];      // pill labels
    body: ReactNode;     // paragraph(s)
}

export interface FaqItem {
    q: string;
    a: ReactNode;
}

export interface StatItem {
    label: string;
    value: number;
    suffix?: string;
}

export interface Testimonial {
    name: string;
    title: string;
    message: ReactNode;
}

export interface ServicePageProps {
    /** Big H1 in the hero */
    title: string;
    /** Lead paragraph under the hero title */
    intro: ReactNode;
    /** Hero image src (under /public) */
    heroImage: string;
    /** Optional mid section image */
    midImage?: string;
    /** Small uppercase eyebrow in the intro section */
    eyebrow: ReactNode;
    /** Big intro heading */
    introHeading: ReactNode;
    /** Two-column intro body paragraphs */
    introBody: [ReactNode, ReactNode];
    /** "Our X Solutions" heading */
    solutionsHeading: string;
    solutions: SolutionItem[];
    faqs?: FaqItem[];
    stats?: StatItem[];
    testimonials?: Testimonial[];
}

const defaultStats: StatItem[] = [
    {label: 'Years Experience', value: 8, suffix: '+'},
    {label: 'Team Members', value: 10, suffix: '+'},
    {label: 'Products Launched', value: 150, suffix: '+'},
    {label: 'Projects Delivered', value: 200, suffix: '+'},
    {label: 'Client Satisfaction', value: 98, suffix: '%'},
];

const defaultPartners = [
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

const ServicePageTemplate: React.FC<ServicePageProps> = ({
    title,
    intro,
    heroImage,
    midImage,
    eyebrow,
    introHeading,
    introBody,
    solutionsHeading,
    solutions,
    faqs = [],
    stats = defaultStats,
    testimonials = [],
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [current, setCurrent] = useState(0);

    // Floating button visibility
    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 200);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Day/Night theme
    const [isDayTime, setIsDayTime] = useState<boolean>(() => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18;
    });
    useEffect(() => {
        const id = setInterval(() => {
            const hour = new Date().getHours();
            setIsDayTime(prev => {
                const next = hour >= 6 && hour < 18;
                return prev === next ? prev : next;
            });
        }, 60_000);
        return () => clearInterval(id);
    }, []);

    // Intro background invert on scroll
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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Solutions active-section highlight
    useEffect(() => {
        const handleScroll = () => {
            for (const s of solutions) {
                const section = document.getElementById(s.target);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveId(s.target);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [solutions]);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({behavior: 'smooth', block: 'start'});
            setActiveId(target);
        }
    };

    const prev = () => testimonials.length && setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => testimonials.length && setCurrent((current + 1) % testimonials.length);
    const active = testimonials[current];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <Header/>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${isVisible ? 'mb-16' : 'mb-0'}`}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                <h1 className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5.45em] md:text-[5.45em] sm:text-[2em] text-[2.5em] lg:mt-[2.5em] md:mt-[2.5em] mt-[1em] leading-[1.1] font-[600]`}>
                    {title}
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>{intro}</p>
                <div className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] md:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={heroImage}
                        alt={title}
                        width={1920}
                        height={1080}
                        style={{objectFit: 'cover', objectPosition: 'center'}}
                    />
                </div>
            </div>

            {/* Introductory section */}
            <section ref={sectionRef}
                     className={`py-12 transition-colors duration-500 ${
                         isBackgroundActive
                             ? (isDayTime ? 'bg-black text-white' : 'bg-white text-black')
                             : (isDayTime ? 'bg-white text-black' : 'bg-black text-white')
                     }`}>
                <div className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            {eyebrow}
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            {introHeading}
                        </h3>
                        <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div><p>{introBody[0]}</p></div>
                            <div><p>{introBody[1]}</p></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[1em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[3em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <div>
                            <h2 className={`lg:text-[3.12em] md:text-[3.12em] text-[1.5em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                {solutionsHeading}
                            </h2>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] tracking-tight constant-text ${isDayTime ? 'text-black' : 'text-white'}`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                {solutions.map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-4 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[400]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[400]'}`
                                            }`}
                                        >
                                            <div className={'flex gap-4'}>
                                                <span className={'shrink-0'}>{item.id}</span>
                                                <span className={`opacity-0 transition-opacity text-[2em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[30em] md:mb-[30em]'}>
                            <div className='grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start'>
                                {solutions.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>{item.id}/</div>
                                        <div className={`${index < solutions.length - 1 ? 'lg:mb-44 mb-14' : ''} ${isDayTime ? 'text-black' : 'text-white'}`} id={item.target}>
                                            <h2 className={`text-[1.5em] font-[500] mb-3`}>{item.title}</h2>
                                            <div className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                                {item.tags.map((tag, t) => (
                                                    <span key={t} className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>{tag}</span>
                                                ))}
                                            </div>
                                            <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>{item.body}</p>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image */}
            {midImage && (
                <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto lg:-mt-[34em] md:-mt-[34em]'}>
                    <Image
                        className={'object-fill'}
                        src={midImage}
                        alt={title}
                        width={2560}
                        height={1440}
                        style={{objectFit: 'fill', objectPosition: 'center'}}
                    />
                </div>
            )}

            {/* Testimonials */}
            {testimonials.length > 0 && active && (
                <div className={`relative py-24 lg:mb-16 mb-10 max-w-full w-full h-auto ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                    <div className={`relative mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <div>
                            <h5 className="uppercase text-xs font-[500] tracking-widest mb-4">What our clients say</h5>
                        </div>
                        <div className={'lg:ml-[-20em] md:ml-[-20em] sm:ml-[-10em]'}>
                            <div className="flex items-start gap-4 text-[1.5em] font-[500] mb-6">
                                <Quote className="w-6 h-6 shrink-0"/>
                                <p className="leading-tight text-justify border-b-[0.1em] border-gray-300/20 pb-12">
                                    {active.message}
                                </p>
                            </div>
                            <div className="flex ml-10 items-center gap-4">
                                <div>
                                    <p className="font-semibold text-[1.3em]">{active.name}</p>
                                    <p className="text-[0.8em]">{active.title}</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-1">
                                <button onClick={prev} aria-label="Previous testimonial"><ArrowLeft className="w-8 h-6"/></button>
                                <button onClick={next} aria-label="Next testimonial"><ArrowRight className="w-8 h-6"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Partners */}
            <div id={'partners'} className={`relative max-w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div className={`justify-self-start text-start lg:pt-[5em] md:pt-[5em] pt-[2em] lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div className={`grid lg:grid-cols-5 grid-cols-2 gap-6 lg:pb-[5em] md:pb-[5em] pb-[2em]`}>
                    {defaultPartners.map((partner) => (
                        <div key={partner.id} className={`flex justify-center items-center`}>
                            <Image
                                src={`/assets/partners/${isDayTime ? partner.dayImage : partner.nightImage}`}
                                alt={partner.name}
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            {faqs.length > 0 && (
                <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                    <div id={'FAQ'} className={`relative lg:py-24 py-12 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <h2 className={'lg:text-[3em] text-[1.8em] font-[600] leading-[1.1] mb-[0.8em]'}>
                            Frequently Asked Questions
                        </h2>
                        <div className={'divide-y divide-gray-500/30'}>
                            {faqs.map((faq, i) => (
                                <div key={i} className={'py-5'}>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className={'w-full flex justify-between items-center text-left gap-6'}
                                        aria-expanded={openFaq === i}
                                    >
                                        <span className={'text-[1.05em] font-[500]'}>{faq.q}</span>
                                        <span className={'text-[1.6em] leading-none shrink-0'}>{openFaq === i ? '−' : '+'}</span>
                                    </button>
                                    {openFaq === i && (
                                        <p className={'mt-4 text-[0.873em] font-[300] leading-[1.6] text-justify lg:pr-[20em]'}>
                                            {faq.a}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Trusted partner CTA + Countup */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div className={`relative lg:py-14 md:py-16 lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <h1 className={'lg:text-[5em] md:text-[4em] sm:text-[3em] text-[2em] font-[600] leading-[1.1] mb-[0.6em]'}>
                        Your trusted <br className={'lg:block md:block hidden'}/>digital partner
                    </h1>
                    <p className={'text-[0.873em] font-[300] leading-[1.5] text-justify lg:pr-[33em] mb-10'}>
                        We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                        applications that drive real results. From funded startups to established businesses, we&#39;ve
                        helped a wide range of clients bring their digital products to life—delivering standout
                        experiences that fuel growth, engagement, and long-term success.
                    </p>
                    <Link href='/contact'>
                        <button className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em] border tracking-tighter rounded-full py-2 px-6'>
                            <span className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                            <span className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                            <span className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-300' : 'text-black group-hover:text-gray-800'}`}>
                                Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span>
                            </span>
                            <span className={`absolute inset-0 border-[1px] rounded-full ${isDayTime ? 'border-white' : 'border-black'}`}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-500 lg:mb-[4em] md:mb-[4em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col justify-center items-center">
                                <h2 className="lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.5em] text-start font-[600]">
                                    <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''}/>
                                </h2>
                                <p className="text-[0.873em] font-[400] mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ServicePageTemplate;
