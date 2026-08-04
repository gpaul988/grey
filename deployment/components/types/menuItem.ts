export interface MenuItem {
    id: string;
    title: string;
    path?: string;
    children?: MenuItem[];
}


export const menuItem: MenuItem[] = [
  {
    id: '1',
    title: 'Services',
    children: [
      {
        id: '1-1',
        title: 'Digital & Web',
        path: '/services/digital-web',
        children: [
          {
            id: '1-1-1',
            title: 'Overview',
            path: '/services/digital-web/overview',
          },
          {
            id: '1-1-2',
            title: 'Web Application Development',
            path: '/services/digital-web/web-application-development',
          },
            {
            id: '1-1-3',
            title: 'Web Application Design',
            path: '/services/digital-web/web-application-design',
          },
          {
            id: '1-1-4',
            title: 'Web Development',
            path: '/services/digital-web/web-development',
          },
          {
            id: '1-1-5',
            title: 'E-commerce Development',
            path: '/services/digital-web/e-commerce-development',
          },
          {
            id: '1-1-6',
            title: 'CMS Development',
            path: '/services/digital-web/cms-development',
          },
          {
            id: '1-1-7',
            title: 'Reactjs Development',
            path: '/services/digital-web/reactjs-development',
          },
          {
            id: '1-1-8',
            title: 'Angular Development',
            path: '/services/digital-web/angular-development',
          },
          {
            id: '1-1-9',
            title: 'Vuejs Development',
            path: '/services/digital-web/vuejs-development',
          },
            {
                id: '1-1-10',
                title: 'Nodejs Development',
                path: '/services/digital-web/nodejs-development',
            },
            {
                id: '1-1-11',
                title: 'PHP Development',
                path: '/services/digital-web/php-development',
            },
            {
                id: '1-1-12',
                title: 'Laravel Development',
                path: '/services/digital-web/laravel-development',
            },
            {
                id: '1-1-13',
                title: 'WordPress Development',
                path: '/services/digital-web/wordpress-development',
            },
            {
                id: '1-1-14',
                title: 'Shopify Development',
                path: '/services/digital-web/shopify-development',
            },
            {
                id: '1-1-15',
                title: 'Drupal Development',
                path: '/services/digital-web/drupal-development',
            },
            {
                id: '1-1-16',
                title: 'Squarespace Development',
                path: '/services/digital-web/squarespace-development',
            },
            {
                id: '1-1-17',
                title: 'Wix Development',
                path: '/services/digital-web/wix-development',
            },
        ],
      },
      {
        id: '1-2',
        title: 'Software Services',
        children: [
          {
            id: '1-2-1',
            title: 'Software Development',
            path: '/services/software-services/software-development',
          },
            {
                id: '1-2-2',
                title: 'Mobile Application Development',
                path: '/services/software-services/mobile-application-development',
            },
            {
                id: '1-2-3',
                title: 'Android Development',
                path: '/services/software-services/android-development',
            },
            {
                id: '1-2-4',
                title: 'iOS Development',
                path: '/services/software-services/ios-development',
            },
            {
                id: '1-2-5',
                title: 'Cross Platform Development',
                path: '/services/software-services/cross-platform-development',
            },
            {
                id: '1-2-6',
                title: 'React Native Development',
                path: '/services/software-services/react-native-development',
            },
            {
                id: '1-2-7',
                title: 'Flutter Development',
                path: '/services/software-services/flutter-development',
            },
            {
                id: '1-2-8',
                title: 'Windows Development',
                path: '/services/software-services/windows-development',
            },
            {
                id: '1-2-9',
                title: 'Mac Development',
                path: '/services/software-services/mac-development',
            },
            {
                id: '1-2-10',
                title: 'Linux Development',
                path: '/services/software-services/linux-development',
            },
            {
                id: '1-2-11',
                title: 'AI Development',
                path: '/services/software-services/ai-development',
            },
            {
                id: '1-2-12',
                title: 'Blockchain Development',
                path: '/services/software-services/blockchain-development',
            },
            {
                id: '1-2-13',
                title: 'IoT Development',
                path: '/services/software-services/iot-development',
            },
        ],
      },
        {
            id: '1-3',
            title: 'Digital Marketing',
            children: [
            {
                id: '1-3-1',
                title: 'SEO',
                path: '/services/digital-marketing/seo',
            },
            {
                id: '1-3-2',
                title: 'Social Media Marketing',
                path: '/services/digital-marketing/social-media-marketing',
            },
            {
                id: '1-3-3',
                title: 'App Store Optimization',
                path: '/services/digital-marketing/app-store-optimization',
            },
            ],
        },
    ],
  },
  {
    id: '2',
    title: 'Company',
    path: '/Company',
  },
  {
    id: '3',
    title: 'careers',
    path: '/Careers',
  },
  {
    id: '4',
    title: 'contact',
    path: '/Contact',
  },
];
