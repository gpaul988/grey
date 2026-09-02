'use client';

import { useEffect } from 'react';

// Theme init script inline to avoid circular imports
const themeInitScript = `
(function(){try{
  var k='grey-theme';var t=localStorage.getItem(k)||'system';
  var h=new Date().getHours();var night=h>=18||h<6;
  var sysDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
  var r=t==='system'?((sysDark||night)?'dark':'light'):t;
  var d=document.documentElement;d.classList.toggle('dark',r==='dark');
  d.setAttribute('data-theme',r);d.style.colorScheme=r;
}catch(e){}})();
`;

export default function ThemeScript() {
    useEffect(() => {
        // Execute the theme init script on client side
        try {
            eval(themeInitScript);
        } catch (e) {
            console.error('Failed to initialize theme:', e);
        }
    }, []);

    return null;
}
