'use client';
{/*
import { useState } from 'react';
import { MenuItem } from './types/menuItem';
import Link from "next/link";
import FormComponent from './FormComponent'; // Import the FormComponent

interface MenuItemProps {
    item: MenuItem;
    depth?: number;
}

const MenuItemComponent = ({ item, depth = 0 }: MenuItemProps) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;

    return (
        <div className="relative">
            <div className="flex items-center space-x-1 peer">
                {item.path ? (
                    <Link
                        href={item.path}
                        className="px-4 py-2 text-gray-800 hover:text-white hover:bg-teal-500 rounded-md text-sm font-medium transition duration-300"
                    >
                        {item.title}
                    </Link>
                ) : (
                    <span className="px-4 py-2 text-gray-800 hover:text-white hover:bg-teal-500 rounded-md text-sm font-medium inline-flex items-center transition duration-300">
                        {item.title}
                    </span>
                )}
            </div>

            {hasChildren && (
                <div className={`absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
          ${depth === 0 ? 'top-full' : 'top-0 left-full'} hidden peer-hover:block md:peer-hover:block`}>
                    <div className="py-1">
                        {item.children?.map((child) => (
                            <MenuItemComponent
                                key={child.id}
                                item={child}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

interface MenuProps {
    items: MenuItem[];
}

const Menu = ({ items }: MenuProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <>
            <nav className="flex items-center space-x-4">
                {items.map((item) => (
                    <MenuItemComponent key={item.id} item={item}/>
                ))}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="ml-4 px-4 py-2 bg-teal-500 text-white hover:bg-teal-700 rounded-md text-sm font-medium"
                >
                    Start a project
                </button>
            </nav>

            {isModalOpen && (
                <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-gray-700/70 z-50">
                    <div className="bg-gray-700/70 w-full max-w-3xl p-8 rounded-lg relative shadow-lg overflow-y-auto max-h-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <div style={{ overflowY: 'scroll', height: '100%', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-white hover:text-gray-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
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
                            <h2 className="text-5xl mb-6 text-white text-center font-bold">Start a Project</h2>
                            <p className="text-white text-center mb-6">Starting a project? Need a quote or just some advice
                                about how to get started with a digital project? Feel free to contact us with your query.</p>
                            {isSubmitted ? (
                                <p className="text-green-500 text-lg font-semibold">Form submitted successfully!</p>
                            ) : (
                                <FormComponent />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Menu;*/}