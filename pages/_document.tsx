/**
 * Pages Router _document — kept ONLY because the Pages Router still serves
 * pages/api/*. It must NOT duplicate <title>/viewport/TawkChat (those live in
 * app/layout.tsx now). We keep just the reCAPTCHA script needed by API-backed
 * forms. The previous duplicate TawkChat mount has been removed (audit fix).
 */
import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from "react";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;