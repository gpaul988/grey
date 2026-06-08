import '../globals.css';
import Link from 'next/link';
import Image from "next/image";
import React from "react";

export const metadata = {
    title: 'Grey InfoTech Admin'
};

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <html>
        <body>
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/#">
                        <Image
                            src="/logon.png"
                            alt="Grey InfoTech Logo"
                            width={300}
                            height={50}
                            className="h-5 w-auto md:h-8 lg:h-10 object-contain"
                            priority
                            loading="eager"
                        />
                    </Link>
                    <nav>
                        <Link href="/admin/login"
                              className="text-sm text-gray-600 hover:text-gray-900 mr-4">Login</Link>
                        <Link href="/admin/dashboard"
                              className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6">{children}</main>

            <footer className="border-t mt-12 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500">Grey InfoTech
                    © {new Date().getFullYear()}</div>
            </footer>
        </div>
        </body>
        </html>
    );
}

