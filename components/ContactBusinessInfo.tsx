'use client';

import {motion} from 'framer-motion';
import type {Transition} from 'framer-motion';
import Link from 'next/link';
import {FaClock, FaBolt} from 'react-icons/fa';
import { useIsDayTime } from './useIsDayTime';

const fadeUp: { transition: Transition } = {
    transition: {duration: 0.6, ease: [0.22, 1, 0.36, 1]}
};

type ContactBusinessInfoProps = {
    email?: string;
    emailRecruiting?: string;
    emailPartnerships?: string;
    phone?: string;
    companyName?: string;
    address?: {
        line1: string;
        line2: string;
        line3: string;
        line4: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    mapsLink?: string;
};

export default function ContactBusinessInfo({
                                                email = 'hello@greyinfotech.com.ng',
                                                emailRecruiting = 'jobs@greyinfotech.com.ng',
                                                emailPartnerships = 'partners@greyinfotech.com.ng',
                                                phone = '+2348028095571',
                                                companyName = 'Grey InfoTech',
                                                address = {
                                                    line1: '9 Godfery Tata Close,',
                                                    line2: 'Rumuewhara New Layout,',
                                                    line3: 'Off Eneke- Igwurita Road,',
                                                    line4: 'Port Harcourt,',
                                                    city: 'Port Harcourt',
                                                    state: 'Rivers State - 500102',
                                                    zip: '500102',
                                                    country: 'Nigeria'
                                                },
                                                mapsLink = 'https://www.google.com/maps/place/Grey+InfoTech/@4.8296335,7.0918961,20z/data=!4m10!1m2!2m1!1sgrey+infotech!3m6!1s0x453603b184ab9def:0xb0873632272adac6!8m2!3d4.8296335!4d7.092231!15sCg1ncmV5IGluZm90ZWNokgEQc29mdHdhcmVfY29tcGFueeABAA!16s%2Fg%2F11vr8fcymy?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D'
                                            }: ContactBusinessInfoProps) {
    const isDayTime = useIsDayTime();
    const cardBase = `rounded-2xl shadow-lg p-8 md:p-10 border ${isDayTime ? 'bg-white border-gray-100 text-black' : 'bg-gray-900 border-gray-700 text-gray-100'}`;
    const smallCard = `rounded-2xl p-5 border ${isDayTime ? 'bg-gray-50 border-gray-100 text-gray-700' : 'bg-gray-800 border-gray-700 text-gray-200'}`;
    const linkCls = 'contact-link hover:underline focus:underline';
    const accentCls = 'contact-accent';
    const btnCls = 'contact-btn inline-block mt-4 px-5 py-2 rounded-lg shadow transition';
    return (
        <motion.aside
            initial={{opacity: 0, y: 28}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            {...fadeUp}
            className="order-1 lg:order-2"
        >
            <div className={cardBase}>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${accentCls}`}>Contact Us</h2>

                <ul className="space-y-4 text-lg">
                    <li>
                        <strong>Project enquiries:</strong>{' '}
                        <a
                            href={`mailto:${email}`}
                                                        className={linkCls}
                        >
                            {email}
                        </a>
                    </li>
                    <li>
                        <strong>Recruitment:</strong>{' '}
                        <a
                            href={`mailto:${emailRecruiting}`}
                                                        className={linkCls}
                        >
                            {emailRecruiting}
                        </a>
                    </li>
                    <li>
                        <strong>Partnerships:</strong>{' '}
                        <a
                            href={`mailto:${emailPartnerships}`}
                                                        className={linkCls}
                        >
                            {emailPartnerships}
                        </a>
                    </li>
                    <li>
                        <strong>Call:</strong>{' '}
                        <a href={`tel:${phone}`} className={linkCls}>
                            {phone.replace('+', '')}
                        </a>
                    </li>
                </ul>

                <div className="mt-8">
                    <h3 className={`font-bold text-xl mb-3 ${accentCls}`}>Office</h3>
                    <address className={`not-italic text-base ${isDayTime ? 'text-gray-700' : 'text-gray-200'} leading-relaxed`}>
                        {companyName} <br/>
                        {address.line1} <br/>
                        {address.line2} <br/>
                        {address.line3} <br/>
                        {address.line4} <br/>
                        {address.state} <br/>
                        {address.country}.
                    </address>

                    <Link
                        href={mapsLink}
                        className={btnCls}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Get Directions
                    </Link>
                </div>

                {/* Business Hours and Response Time */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={smallCard}>
                        <div className={`flex items-center gap-3 mb-2 ${accentCls}`}>
                            <FaClock/>
                            <h4 className="font-bold">Business Hours</h4>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Monday - Saturday
                            <br/>
                            8:00 AM - 5:00 PM
                        </p>
                    </div>

                    <div className={smallCard}>
                        <div className={`flex items-center gap-3 mb-2 ${accentCls}`}>
                            <FaBolt/>
                            <h4 className="font-bold">Response Time</h4>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Usually within 1 business hour
                        </p>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}