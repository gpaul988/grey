'use client';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import QuoteRequest from "@/components/QuoteRequest";

type FloatingButtonProps = {
    className?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({className}) => {
    const [isDark, setIsDark] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hoisted helper: declared before any effects that use it
    function getTextBrightness(color: string): number {
        const match = color.match(/\d+/g);
        if (!match || match.length < 3) return 255;
        const [r, g, b] = match.map(Number);
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll("section"));

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible?.isIntersecting) {
                    const el = visible.target as HTMLElement;
                    const computedStyle = window.getComputedStyle(el);
                    const textColor = computedStyle.color;

                    const brightness = getTextBrightness(textColor);
                    setIsDark(brightness < 128);
                }
            },
            {
                root: null,
                threshold: 0.6,
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                onClick={handleOpenModal}
                data-request-quote-floating-button="true"
                className={`${className ?? ''} rounded-full text-[1em] lg:block hidden font-medium py-[0.6em] px-[0.8em] border transition-colors duration-200 text-white hover:text-teal-600 border-black hover:border-teal-600 bg-black hover:bg-white fixed bottom-8 right-8 z-50 shadow-lg group items-center`}
                aria-label="Start a new project"
            >
                <span className="text-[0.85em]">Request Quote</span>
                <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-3 transition-transform duration-200 group-hover:translate-x-2"
                />
            </button>

            {isModalOpen && (
                <div
                    className={`fixed inset-0 z-50 ${isDark ? 'bg-black/65' : 'bg-white/65'} backdrop-blur-md flex items-center justify-center p-4`}
                    onClick={handleCloseModal}
                >
                    <div
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className={`absolute top-4 right-4 z-10 ${
                                isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'
                            } transition-colors duration-200`}
                            aria-label="Close modal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <QuoteRequest/>
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingButton;