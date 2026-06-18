'use client';

import { useEffect, useState } from 'react';

interface LocationData {
  country?: string;
  countryCode?: string;
  city?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
}

interface UserPreferences {
  username?: string;
  language?: string;
  location?: LocationData;
}

export const PersonalizedGreeting = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  // Detect geolocation
  useEffect(() => {
    const initializePreferences = async () => {
      try {
        // Check localStorage first
        const stored = localStorage.getItem('userPreferences');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setPreferences(parsed);
            setIsLoading(false);
            return;
          } catch (e) {
            console.error('Failed to parse stored preferences:', e);
          }
        }

        // Try IP-based geolocation first
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();

          const locationData: LocationData = {
            country: data.country_name,
            countryCode: data.country_code,
            city: data.city,
            timezone: data.timezone,
            latitude: data.latitude,
            longitude: data.longitude,
          };

          const newPreferences: UserPreferences = {
            username: getStoredUsername(),
            language: getLanguageFromCountry(data.country_code),
            location: locationData,
          };

          setPreferences(newPreferences);
          localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
          setIsLoading(false);
        } catch (ipError) {
          console.warn('IP-based geolocation failed, trying Browser API:', ipError);

          // Fallback to Browser Geolocation API
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                  // Reverse geocode using Nominatim (OpenStreetMap)
                  const geoResponse = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                  );
                  const geoData = await geoResponse.json();

                  const locationData: LocationData = {
                    city: geoData.address?.city || geoData.address?.town,
                    country: geoData.address?.country,
                    latitude,
                    longitude,
                  };

                  const newPreferences: UserPreferences = {
                    username: getStoredUsername(),
                    language: 'en',
                    location: locationData,
                  };

                  setPreferences(newPreferences);
                  localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
                } catch (reverseGeoError) {
                  console.warn('Reverse geocoding failed:', reverseGeoError);
                  const newPreferences: UserPreferences = {
                    username: getStoredUsername(),
                    language: 'en',
                    location: { latitude, longitude },
                  };
                  setPreferences(newPreferences);
                  localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
                }

                setIsLoading(false);
              },
              (error) => {
                console.warn('Browser geolocation error:', error);
                const newPreferences: UserPreferences = {
                  username: getStoredUsername(),
                  language: 'en',
                };
                setPreferences(newPreferences);
                localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
                setIsLoading(false);
              },
              { timeout: 5000 }
            );
          } else {
            const newPreferences: UserPreferences = {
              username: getStoredUsername(),
              language: 'en',
            };
            setPreferences(newPreferences);
            localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error initializing preferences:', error);
        setPreferences({ username: getStoredUsername(), language: 'en' });
        setIsLoading(false);
      }
    };

    initializePreferences();
  }, []);

  const getStoredUsername = (): string => {
    if (typeof window === 'undefined') return '';
    
    const stored = localStorage.getItem('userName');
    if (stored) return stored;
    return '';
  };

  const getLanguageFromCountry = (countryCode: string): string => {
    const countryToLanguage: Record<string, string> = {
      US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en',
      ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es',
      FR: 'fr', CH: 'de', BE: 'fr', DE: 'de', AT: 'de', IT: 'it', PT: 'pt',
      BR: 'pt', CN: 'zh', TW: 'zh', SG: 'zh', JP: 'ja', RU: 'ru', KZ: 'ru',
      BY: 'ru', SA: 'ar', AE: 'ar', EG: 'ar', JO: 'ar', LB: 'ar', IN: 'hi',
      TZ: 'sw', KE: 'sw', UG: 'sw', NG: 'yo', BJ: 'yo',
    };
    return countryToLanguage[countryCode?.toUpperCase()] || 'en';
  };

  const handleLanguageChange = (lang: string) => {
    const updated = { ...preferences, language: lang };
    setPreferences(updated);
    localStorage.setItem('userPreferences', JSON.stringify(updated));
    localStorage.setItem('i18nextLng', lang);
  };

  const handleUsernameChange = (username: string) => {
    localStorage.setItem('userName', username);
    const updated = { ...preferences, username };
    setPreferences(updated);
    localStorage.setItem('userPreferences', JSON.stringify(updated));
  };

  const getGreetingTime = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const greetings: Record<string, Record<string, string>> = {
    en: {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
    },
    es: {
      morning: 'Buenos días',
      afternoon: 'Buenas tardes',
      evening: 'Buenas noches',
    },
    fr: {
      morning: 'Bonjour',
      afternoon: 'Bon après-midi',
      evening: 'Bonsoir',
    },
    de: {
      morning: 'Guten Morgen',
      afternoon: 'Guten Nachmittag',
      evening: 'Guten Abend',
    },
    pt: {
      morning: 'Bom dia',
      afternoon: 'Boa tarde',
      evening: 'Boa noite',
    },
    zh: {
      morning: '早上好',
      afternoon: '下午好',
      evening: '晚上好',
    },
    ar: {
      morning: 'صباح الخير',
      afternoon: 'مساء الخير',
      evening: 'تصبح على خير',
    },
    sw: {
      morning: 'Habari za asubuhi',
      afternoon: 'Habari za jioni',
      evening: 'Usiku mwema',
    },
    yo: {
      morning: 'Ekú àárọ̀',
      afternoon: 'Ewu ọ̀san',
      evening: 'Kúrọ̀ẹ̀ ni',
    },
    ig: {
      morning: 'Ụtụtụ ọma',
      afternoon: 'Ehihie ọma',
      evening: 'Mgbede ọma',
    },
    ja: {
      morning: 'おはよう',
      afternoon: 'こんにちは',
      evening: 'こんばんは',
    },
    ru: {
      morning: 'Доброе утро',
      afternoon: 'Добрый день',
      evening: 'Добрый вечер',
    },
    hi: {
      morning: 'नमस्ते',
      afternoon: 'नमस्कार',
      evening: 'शुभ संध्या',
    },
    it: {
      morning: 'Buongiorno',
      afternoon: 'Buonpomeriggio',
      evening: 'Buonasera',
    },
  };

  const timeOfDay = getGreetingTime();
  const lang = preferences.language || 'en';
  const baseGreeting = greetings[lang]?.[timeOfDay] || 'Hello';
  const username = preferences.username || 'Guest';
  const location = preferences.location?.city || preferences.location?.country || '';
  const greeting = `${baseGreeting}, ${username}! ${location ? `(${location})` : ''}`;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
    { code: 'zh', name: '简体中文' },
    { code: 'ar', name: 'العربية' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'yo', name: 'Yorùbá' },
    { code: 'ig', name: 'Igbo' },
    { code: 'ja', name: '日本語' },
    { code: 'ru', name: 'Русский' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'it', name: 'Italiano' },
  ];

  if (isLoading) {
    return (
      <div className="greeting-skeleton animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-64" />
      </div>
    );
  }

  return (
    <div className="personalized-greeting space-y-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700">
      {/* Main Greeting */}
      <div className="greeting-text">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {greeting}
        </h2>
      </div>

      {/* User Controls */}
      <div className="controls flex flex-wrap gap-4 items-center text-sm">
        {/* Username Input */}
        <div className="username-control">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Name:
          </label>
          <input
            type="text"
            value={preferences.username || ''}
            onChange={(e) => handleUsernameChange(e.target.value)}
            placeholder="Enter your name"
            className="mt-1 px-3 py-1.5 rounded text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Language Selector */}
        <div className="language-control relative">
          <button
            onClick={() => setShowLanguageSelector(!showLanguageSelector)}
            className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center gap-2 transition"
          >
            <span>🌍</span>
            {languages.find((l) => l.code === lang)?.name || 'English'}
            <span>▼</span>
          </button>

          {showLanguageSelector && (
            <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-300 dark:border-gray-600 z-50 grid grid-cols-2 gap-2 p-2 w-48">
              {languages.map((langOption) => (
                <button
                  key={langOption.code}
                  onClick={() => {
                    handleLanguageChange(langOption.code);
                    setShowLanguageSelector(false);
                  }}
                  className={`px-2 py-1 rounded text-xs font-semibold transition ${
                    lang === langOption.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {langOption.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Display */}
        {location && (
          <div className="location-display flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
            <span>📍</span>
            <span className="font-semibold">{location}</span>
          </div>
        )}
      </div>
    </div>
  );
};
