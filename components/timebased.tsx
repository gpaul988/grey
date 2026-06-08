import {useEffect, useState} from 'react';

const useDarkTime = () => {
    const [isDarkTime, setIsDarkTime] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const hours = now.getHours();
            setIsDarkTime(hours >= 18 || hours < 6); // 6 PM to 5:59 AM
        };

        checkTime();
        const interval = setInterval(checkTime, 60 * 1000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return isDarkTime;
};

const Timebased = () => {
    const isDarkTime = useDarkTime();

    useEffect(() => {
        const bodyElement = document.body;

        if (isDarkTime) {
            bodyElement.style.backgroundColor = '#000000'; // Black background at night
            bodyElement.style.color = '#ffffff'; // White text at night
        } else {
            bodyElement.style.backgroundColor = ''; // Revert to default background
            bodyElement.style.color = ''; // Revert to default text color
        }
    }, [isDarkTime]);

    return null; // This component doesn't render anything
};

export default Timebased;