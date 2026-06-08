'use client';

import React, {useState, useMemo, useCallback} from 'react';
import Head from 'next/head';

const FORM_TYPE = 'QuoteRequest';
const MAX_FILE_SIZE_MB = 20;

interface QuoteFormData {
    name: string;
    email: string;
    company: string;
    phone: string;
    projectType: string;
    otherProjectType: string;
    currency: string;
    budget: string; // localized label (e.g. "$5,000 - $10,000" or "Over $50,000" in selected currency)
    timeline: string;
    description: string;
    requirements: File[];
    message: string;
}

interface BudgetRange {
    usd: string;
    min: number;
    max: number | null;
}

const projectTypeOptions = [
    'AI/ML Solutions', 'API Development & Integration', 'Blockchain Development', 'Cloud Solutions',
    'CRM/ERP Systems', 'Custom Software Development', 'Data Analytics Platform', 'Database Design & Development',
    'Desktop Application', 'DevOps & Infrastructure', 'E-commerce Platform', 'Enterprise Software',
    'IoT Solutions', 'Mobile App Development', 'SaaS Platform', 'System Integration', 'UI/UX Design',
    'Web Application', 'Web Development', 'Website Redesign', 'Consulting Services', 'Maintenance & Support', 'Other'
].sort();

const exchangeRates: Record<string, number> = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    CAD: 1.35,
    AUD: 1.50,
    INR: 83,
    NGN: 1550
};

const budgetRanges: BudgetRange[] = [
    {usd: 'Under $500', min: 0, max: 500},
    {usd: '$500 - $1,000', min: 500, max: 1000},
    {usd: '$1,000 - $2,500', min: 1000, max: 2500},
    {usd: '$2,500 - $5,000', min: 2500, max: 5000},
    {usd: '$5,000 - $10,000', min: 5000, max: 10000},
    {usd: '$10,000 - $25,000', min: 10000, max: 25000},
    {usd: '$25,000 - $50,000', min: 25000, max: 50000},
    {usd: 'Over $50,000', min: 50000, max: null}
];

const formatCurrency = (amount: number, currency: string): string => {
    const symbols: Record<string, string> = {USD: '$', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', INR: '₹', NGN: '₦'};
    return `${symbols[currency] ?? ''}${amount.toLocaleString()}`;
};

const parseBudget = (label: string, currency: string) => {
    if (!label) {
        return {
            budgetLabel: '',
            budgetMinUSD: null as number | null,
            budgetMaxUSD: null as number | null,
            budgetMin: null as number | null,
            budgetMax: null as number | null
        };
    }
    // Reconstruct mapping used for display to find index
    const rate = exchangeRates[currency];
    const localized = budgetRanges.map(r =>
        r.max !== null
            ? `${formatCurrency(Math.round(r.min * rate), currency)} - ${formatCurrency(Math.round(r.max * rate), currency)}`
            : `Over ${formatCurrency(Math.round(r.min * rate), currency)}`
    );
    const idx = localized.indexOf(label);
    if (idx === -1) {
        return {
            budgetLabel: label,
            budgetMinUSD: null,
            budgetMaxUSD: null,
            budgetMin: null,
            budgetMax: null
        };
    }
    const br = budgetRanges[idx];
    const minLocal = Math.round(br.min * rate);
    const maxLocal = br.max !== null ? Math.round(br.max * rate) : null;
    return {
        budgetLabel: label,
        budgetMinUSD: br.min,
        budgetMaxUSD: br.max,
        budgetMin: minLocal,
        budgetMax: maxLocal
    };
};

const CustomDropdown: React.FC<{
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    required?: boolean;
    className?: string;
}> = ({options, value, onChange, placeholder, required, className}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <label className={`block text-sm font-medium text-gray-700 mb-2 ${className || ''}`}>
                {placeholder} {required && <span className="text-red-500">*</span>}
            </label>
            <button
                type="button"
                className="w-full p-3 border-b border-gray-300 text-left bg-white"
                onClick={() => setOpen(o => !o)}
            >
                {value || `Select ${placeholder.toLowerCase()}`}
            </button>
            {open && (
                <ul
                    className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-auto"
                    style={{msOverflowStyle: 'none', scrollbarWidth: 'none'}}
                >
                    {options.map(option => (
                        <li
                            key={option}
                            className="p-3 cursor-pointer hover:bg-teal-50"
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                        >
                            {option}
                        </li>
                    ))}
                    <style jsx>{`ul::-webkit-scrollbar {
                        display: none;
                    }`}</style>
                </ul>
            )}
        </div>
    );
};

export default function QuoteRequest() {
    const [formData, setFormData] = useState<QuoteFormData>({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        otherProjectType: '',
        currency: 'USD',
        budget: '',
        timeline: '',
        description: '',
        requirements: [],
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
    const [currentStep, setCurrentStep] = useState(1);

    const clearNotice = useCallback(() => {
        setMessage('');
        setMessageType('');
    }, []);
    const setNotice = useCallback((n: { type: 'success' | 'error' | ''; text: string }) => {
        setMessageType(n.type);
        setMessage(n.text);
    }, []);

    const budgetOptions = useMemo(() => {
        const rate = exchangeRates[formData.currency];
        return budgetRanges.map(range => {
            const convertedMin = Math.round(range.min * rate);
            const convertedMax = range.max !== null ? Math.round(range.max * rate) : null;
            return convertedMax !== null
                ? `${formatCurrency(convertedMin, formData.currency)} - ${formatCurrency(convertedMax, formData.currency)}`
                : `Over ${formatCurrency(convertedMin, formData.currency)}`;
        });
    }, [formData.currency]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        clearNotice();
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'currency' && {budget: ''}) // reset budget if currency changes
        }));
    };

    const handleDropdownChange = (name: keyof QuoteFormData, value: string) => {
        clearNotice();
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;
        clearNotice();
        const valid: File[] = [];
        const rejected: string[] = [];
        Array.from(files).forEach(f => {
            if (f.size <= MAX_FILE_SIZE_MB * 1024 * 1024) valid.push(f);
            else rejected.push(f.name);
        });
        if (rejected.length) {
            setNotice({type: 'error', text: `File(s) too large: ${rejected.join(', ')}`});
        }
        if (valid.length) {
            setFormData(prev => ({...prev, requirements: [...prev.requirements, ...valid]}));
        }
    };

    const removeFile = (index: number) => {
        clearNotice();
        setFormData(prev => ({
            ...prev,
            requirements: prev.requirements.filter((_, i) => i !== index)
        }));
    };

    const isStepValid = (step: number) => {
        if (step === 1) return !!(formData.name && formData.email);
        if (step === 2) return !!(formData.projectType && formData.budget);
        if (step === 3) return !!formData.description;
        return false;
    };

    const nextStep = () => {
        if (currentStep < 3 && isStepValid(currentStep)) setCurrentStep(s => s + 1);
    };
    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(s => s - 1);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            projectType: '',
            otherProjectType: '',
            currency: 'USD',
            budget: '',
            timeline: '',
            description: '',
            requirements: [],
            message: ''
        });
        setCurrentStep(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isStepValid(3)) {
            setNotice({type: 'error', text: 'Please complete required fields.'});
            return;
        }
        clearNotice();
        setIsSubmitting(true);
        try {
            const emailPromise = fetch('/api/submit-form', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    formType: FORM_TYPE,
                    ...formData,
                    message: formData.message || formData.description,
                    requirements: formData.requirements.map(f => f.name)
                })
            });
            setNotice({type: 'success', text: 'Quote request submitted.'});
            resetForm();
        } catch (err) {
            console.error('Submission error:', err);
            setNotice({type: 'error', text: 'Submission failed.'});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Head>
                <title>{FORM_TYPE} - Grey InfoTech</title>
                <meta name="description" content="Get a custom quote for your project from Grey InfoTech"/>
                <meta name="form:type" content={FORM_TYPE}/>
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-indigo-50 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{FORM_TYPE}</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Tell us about your project and we&apos;ll provide you with a detailed quote within 24 hours
                        </p>
                    </div>
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {[1, 2, 3].map(step => (
                                <div key={step} className="flex items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                            currentStep >= step ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
                                        }`}
                                    >
                                        {step}
                                    </div>
                                    <div
                                        className={`ml-3 text-sm font-medium ${
                                            currentStep >= step ? 'text-teal-600' : 'text-gray-500'
                                        }`}
                                    >
                                        {step === 1 && 'Contact Info'}
                                        {step === 2 && 'Project Details'}
                                        {step === 3 && 'Requirements'}
                                    </div>
                                    {step < 3 && (
                                        <div
                                            className={`hidden sm:block w-24 h-1 ml-4 ${
                                                currentStep > step ? 'bg-teal-600' : 'bg-gray-200'
                                            }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="formType" value={FORM_TYPE}/>
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full p-3 border-b border-gray-300"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full p-3 border-b border-gray-300"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border-b border-gray-300"
                                                placeholder="Your company name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone
                                                Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border-b border-gray-300"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Details</h2>
                                    <div>
                                        <CustomDropdown
                                            options={projectTypeOptions}
                                            value={formData.projectType}
                                            onChange={val => handleDropdownChange('projectType', val)}
                                            placeholder="Project Type"
                                            required
                                        />
                                        {formData.projectType === 'Other' && (
                                            <input
                                                type="text"
                                                name="otherProjectType"
                                                value={formData.otherProjectType}
                                                onChange={handleInputChange}
                                                placeholder="Please specify the project type"
                                                required
                                                className="w-full p-3 border-b border-gray-300 mt-3"
                                            />
                                        )}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                                            <select
                                                name="currency"
                                                value={formData.currency}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border-b border-gray-300"
                                            >
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                                <option value="CAD">CAD (C$)</option>
                                                <option value="AUD">AUD (A$)</option>
                                                <option value="INR">INR (₹)</option>
                                                <option value="NGN">NGN (₦)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Budget Range {formData.currency !== 'USD' && (
                                                <span className="text-xs text-gray-500 ml-2">(Converted from USD)</span>
                                            )}
                                            </label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border-b border-gray-300"
                                            >
                                                <option value="">Select budget range</option>
                                                {budgetOptions.map((option, i) => (
                                                    <option key={i} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Project
                                            Timeline</label>
                                        <select
                                            name="timeline"
                                            value={formData.timeline}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border-b border-gray-300"
                                        >
                                            <option value="">Select timeline</option>
                                            <option value="ASAP (Rush)">ASAP (Rush)</option>
                                            <option value="Less than 1 month">Less than 1 month</option>
                                            <option value="1-3 months">1-3 months</option>
                                            <option value="3-6 months">3-6 months</option>
                                            <option value="6+ months">6+ months</option>
                                            <option value="Flexible">Flexible</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Requirements</h2>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Project Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={6}
                                            required
                                            className="w-full p-3 border-b border-gray-300"
                                            placeholder="Please provide a detailed description..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Requirements
                                            Documents</label>
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors">
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                multiple
                                                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                                                className="hidden"
                                                id="file-upload"
                                            />
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <div className="text-teal-600 font-medium">Click to upload files</div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    PDF, DOC, TXT, PNG, JPG (Max {MAX_FILE_SIZE_MB}MB each)
                                                </div>
                                            </label>
                                        </div>
                                        {formData.requirements.length > 0 && (
                                            <div className="mt-4 space-y-2">
                                                {formData.requirements.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                                    >
                                                        <span className="text-sm text-gray-700">{file.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFile(index)}
                                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                        currentStep === 1 ? 'invisible' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Previous
                                </button>
                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!isStepValid(currentStep)}
                                        className="px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next Step
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isStepValid(3)}
                                        className="px-8 py-3 bg-gradient-to-r from-teal-400 to-teal-800 text-white rounded-lg font-medium hover:from-teal-500 hover:to-teal-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                                    </button>
                                )}
                            </div>
                        </form>
                        {message && (
                            <div
                                className={`mt-6 p-4 rounded-lg ${
                                    messageType === 'success'
                                        ? 'bg-green-50 border border-green-200 text-green-700'
                                        : 'bg-red-50 border border-red-200 text-red-700'
                                }`}
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">{messageType === 'success' ? '✅' : '❌'}</div>
                                    <div className="ml-3">{message}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}