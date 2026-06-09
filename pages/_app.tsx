import Head from 'next/head';
import Timebased from '@/components/timebased';
import type {AppProps} from 'next/app';
import React from 'react';
import TawkChat from "@/components/TawkChat";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Timebased/>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico" sizes="any"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <title>Grey InfoTech Limited</title>
            </Head>

            <TawkChat
                propertyId="6a1ba828a3242d1c2ed9db1d"
                widgetId="1jpu0ho3p"
            />

            <Component {...pageProps} />
        </>
    );
}

export default MyApp;