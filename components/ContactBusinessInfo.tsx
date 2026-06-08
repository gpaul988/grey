'use client';

import {motion} from 'framer-motion';
import type {Transition} from 'framer-motion';
import Link from 'next/link';
import {FaClock, FaBolt} from 'react-icons/fa';

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
                                                companyName = 'Grey InfoTech Limited',
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
    return (
        <motion.aside
            initial={{opacity: 0, y: 28}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            {...fadeUp}
            className="order-1 lg:order-2"
        >
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-700">Contact Us</h2>

                <ul className="space-y-4 text-lg">
                    <li>
                        <strong>Project enquiries:</strong>{' '}
                        <a
                            href={`mailto:${email}`}
                            className="text-teal-600 hover:underline focus:underline"
                        >
                            {email}
                        </a>
                    </li>
                    <li>
                        <strong>Recruitment:</strong>{' '}
                        <a
                            href={`mailto:${emailRecruiting}`}
                            className="text-teal-600 hover:underline focus:underline"
                        >
                            {emailRecruiting}
                        </a>
                    </li>
                    <li>
                        <strong>Partnerships:</strong>{' '}
                        <a
                            href={`mailto:${emailPartnerships}`}
                            className="text-teal-600 hover:underline focus:underline"
                        >
                            {emailPartnerships}
                        </a>
                    </li>
                    <li>
                        <strong>Call:</strong>{' '}
                        <a href={`tel:${phone}`} className="text-teal-600 hover:underline focus:underline">
                            {phone.replace('+', '')}
                        </a>
                    </li>
                </ul>

                <div className="mt-8">
                    <h3 className="font-bold text-xl mb-3 text-teal-700">Office</h3>
                    <address className="not-italic text-base text-gray-700 leading-relaxed">
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
                        className="inline-block mt-4 px-5 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Get Directions
                    </Link>
                </div>

                {/* Business Hours and Response Time */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100">
                        <div className="flex items-center gap-3 mb-2 text-teal-700">
                            <FaClock/>
                            <h4 className="font-bold">Business Hours</h4>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            Monday - Saturday
                            <br/>
                            8:00 AM - 5:00 PM
                        </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100">
                        <div className="flex items-center gap-3 mb-2 text-teal-700">
                            <FaBolt/>
                            <h4 className="font-bold">Response Time</h4>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            Usually within 1 business hour
                        </p>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}