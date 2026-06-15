'use client';
import React, {useEffect, useState} from 'react';
import {useIsDayTime} from './useIsDayTime';

const CookieNotification: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const isDayTime = useIsDayTime();

    useEffect(() => {
        // Check if the user has already accepted cookies
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setIsVisible(true);
        }
    }, []);


    if (!isVisible) return null;

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setIsVisible(false);
    };

    return (
        <div
            className={`fixed mx-[4.6em] bottom-0 left-0 p-4 z-50 ${
                isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className="relative mx-auto flex  items-center">
                <h3>We Value Your Privacy</h3>
                <p className="text-[1em] font-[300]">
                    We use cookies to enhance your browsing experience and analyse our traffic. By clicking &#34;Accept
                    All&#34;, you consent to our use of cookies.
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={handleAccept}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Accept
                    </button>
                    <button
                        onClick={handleDecline}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieNotification;