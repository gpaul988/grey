import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from "react";
import TawkChat from "@/components/TawkChat";

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