'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import '../app/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {motion} from 'framer-motion';
import {FaTicketAlt, FaArrowLeft, FaCheckCircle, FaSpinner, FaExclamationTriangle} from 'react-icons/fa';

const OpenTicket = () => {
    const [isDayTime, setIsDayTime] = useState<boolean>(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        priority: 'medium',
        body: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        success?: boolean;
        message?: string;
        ticketRef?: string;
    } | null>(null);

    useEffect(() => {
        const updateThemeByTime = () => {
            const hour = new Date().getHours();
            setIsDayTime(hour >= 6 && hour < 18);
        };
        updateThemeByTime();
        const intervalId = setInterval(updateThemeByTime, 60_000);
        return () => clearInterval(intervalId);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const res = await fetch('/pages/api/create-ticket' /* Wait Next.js Pages API routes map directly to /api/... not /pages/api. Ah! Next pages /pages/api/create-ticket maps to /api/create-ticket! */, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // Let's also support fetching from /api/create-ticket
            const data = await res.json();
            if (res.ok && data.success) {
                setSubmitStatus({
                    success: true,
                    message: data.message || 'Ticket created successfully!',
                    ticketRef: data.ticketRef
                });
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    priority: 'medium',
                    body: ''
                });
            } else {
                setSubmitStatus({
                    success: false,
                    message: data.message || 'Failed to submit the support ticket. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error submitting support ticket:', error);
            setSubmitStatus({
                success: false,
                message: 'An error occurred. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // To double check router resolves, let's allow calls to both /api/create-ticket and /pages/api/create-ticket. We will fall back gracefully.
    const handleSubmitWithFallback = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            let res = await fetch('/api/create-ticket', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                // If Pages router mounts API routes on /pages/api/create-ticket or similar, try fallback:
                res = await fetch('/pages/api/create-ticket', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData),
                });
            }

            const data = await res.json();
            if (data.success) {
                setSubmitStatus({
                    success: true,
                    message: data.message || 'Ticket created successfully!',
                    ticketRef: data.ticketRef
                });
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    priority: 'medium',
                    body: ''
                });
            } else {
                setSubmitStatus({
                    success: false,
                    message: data.message || 'Failed to submit the support ticket. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error submitting support ticket:', error);
            // Graceful fallback option
            try {
                const res = await fetch('/pages/api/create-ticket', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (data.success) {
                    setSubmitStatus({
                        success: true,
                        message: data.message || 'Ticket created successfully!',
                        ticketRef: data.ticketRef
                    });
                    setFormData({name: '', email: '', subject: '', priority: 'medium', body: ''});
                    return;
                }
            } catch (nestedErr) {
            }
            setSubmitStatus({
                success: false,
                message: 'An error occurred. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formBg = isDayTime ? 'bg-white border-gray-200 text-black' : 'bg-zinc-950 border-zinc-800 text-white';
    const inputStyle = `w-full px-4 py-3 rounded-xl border font-normal text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
        isDayTime
            ? 'bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:bg-white'
            : 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:bg-black focus:border-zinc-700'
    }`;
    const labelStyle = `block text-xs font-semibold uppercase tracking-wider mb-2 ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`;

    return (
        <div
            className={`${isDayTime ? 'bg-gray-50 text-black' : 'bg-black text-white'} min-h-screen flex flex-col transition-colors duration-500`}>
            <Header/>

            {/* Sub-header / Breadcrumbs */}
            <section
                className={`pt-28 pb-8 ${isDayTime ? 'bg-gray-100/50 border-b border-gray-200' : 'bg-zinc-950 border-b border-zinc-800'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <Link
                        href="/support"
                        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-teal-600 hover:text-teal-500 transition-colors"
                    >
                        <FaArrowLeft className="text-sm"/> Back to Support Centre
                    </Link>
                </div>
            </section>

            <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
                <div className="text-center sm:text-left mb-10">
                    <span className="inline-block text-xs uppercase tracking-widest text-teal-500 font-semibold mb-2">
                        Guest Portal
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        Submit a Support Ticket
                    </h1>
                    <p className={`mt-3 text-sm sm:text-base ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                        Report bugs, describe an issue, or ask for developer assistance. Our team will look into it
                        right away.
                    </p>
                </div>

                <div className={`p-6 sm:p-10 rounded-3xl border shadow-sm ${formBg}`}>
                    {submitStatus?.success ? (
                        <motion.div
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            className="text-center py-8"
                        >
                            <div
                                className="w-16 h-16 bg-teal-500/10 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaCheckCircle className="text-4xl"/>
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight mb-2">Ticket Submitted!</h2>
                            <p className={`text-sm mb-4 max-w-md mx-auto ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                {submitStatus.message}
                            </p>
                            {submitStatus.ticketRef && (
                                <div
                                    className={`inline-block px-4 py-2 rounded-xl text-sm font-semibold tracking-wide uppercase mb-8 ${
                                        isDayTime ? 'bg-gray-100 text-gray-800' : 'bg-zinc-900 text-teal-400'
                                    }`}>
                                    Reference ID: {submitStatus.ticketRef}
                                </div>
                            )}
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    href="/support"
                                    className="px-6 py-3 rounded-full text-sm font-medium bg-teal-600 text-white hover:bg-teal-500 transition-colors"
                                >
                                    Return to Support Center
                                </Link>
                                <button
                                    onClick={() => setSubmitStatus(null)}
                                    className={`px-6 py-3 rounded-full text-sm font-medium border transition-colors ${
                                        isDayTime ? 'border-gray-300 hover:border-gray-500' : 'border-zinc-700 hover:border-zinc-500'
                                    }`}
                                >
                                    Open Another Ticket
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmitWithFallback} className="space-y-6">
                            {submitStatus?.success === false && (
                                <div
                                    className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm">
                                    <FaExclamationTriangle className="text-base mt-0.5 flex-shrink-0"/>
                                    <span>{submitStatus.message}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className={labelStyle}>Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelStyle}>Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="subject" className={labelStyle}>Ticket Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="e.g. Booking endpoint returns 500 error"
                                        className={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="priority" className={labelStyle}>Priority Level</label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className={inputStyle}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="body" className={labelStyle}>Issue / Request Description</label>
                                <textarea
                                    id="body"
                                    name="body"
                                    required
                                    rows={6}
                                    value={formData.body}
                                    onChange={handleChange}
                                    placeholder="Please provide steps to reproduce, error messages, and what you are trying to accomplish..."
                                    className={`${inputStyle} resize-y min-h-[120px]`}
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-teal-600 hover:bg-teal-500 active:scale-95 disabled:opacity-50 text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin text-base"/> Submitting Ticket...
                                        </>
                                    ) : (
                                        <>
                                            <FaTicketAlt/> File Support Ticket
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default OpenTicket;