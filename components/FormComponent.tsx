import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    memo
} from 'react';

const FORM_TYPE = 'FormComponent' as const;

/* ------------ Types ------------ */
interface FormDataShape {
    name: string;
    telephone: string;
    companyOrPersonal: 'company' | 'personal' | '';
    companyName: string;
    email: string;
    projectType: string;
    otherProjectType: string;
    industryType: string;
    otherIndustryType: string;
    subject: string;
    otherSubject: string;
    companySize: string;
    howDidYouHear: string;
    otherHowDidYouHear: string;
    message: string;
    file?: File;
    privacyPolicy: boolean;
}

type FormErrors = Partial<Record<keyof FormDataShape, string>>;

/* ------------ Option Constants ------------ */
const PROJECT_TYPE_OPTIONS = Object.freeze([
    'AI Development', 'Web Development', 'Mobile Application Development', 'Software Development',
    'React Native Development', 'Flutter Development', 'Blockchain Development', 'Digital Marketing',
    'SEO', 'Social Media Marketing', 'Cross Platform Development', 'Windows Development', 'Mac Development',
    'IoT Development', 'Wix Development', 'App Store Optimization', 'Web Application Design', 'Other'
]);

const INDUSTRY_TYPE_OPTIONS = Object.freeze([
    'Automation', 'Building & Construction', 'Education', 'Event Management', 'Finance', 'Government',
    'Healthcare', 'Hospitality', 'Manufacturing', 'Media', 'Oil and Gas', 'Pharmaceutical', 'Retail',
    'Technology', 'Trade', 'Transportation and Logistics', 'Other'
]);

const SUBJECT_OPTIONS = Object.freeze([
    'Design', 'Development', 'Consultation', 'Support', 'Branding', 'Migration', 'New Project', 'Partnership', 'Other'
]);

const COMPANY_SIZE_OPTIONS = Object.freeze(['1-10', '11-50', '51-200', '201-500', '500+']);
const HEAR_OPTIONS = Object.freeze(['Google', 'Social Media', 'Referral', 'Advertisement', 'Other']);

/* ------------ Initial State ------------ */
const initialForm: FormDataShape = {
    name: '',
    telephone: '',
    companyOrPersonal: '',
    companyName: '',
    email: '',
    projectType: '',
    otherProjectType: '',
    industryType: '',
    otherIndustryType: '',
    subject: '',
    otherSubject: '',
    companySize: '',
    howDidYouHear: '',
    otherHowDidYouHear: '',
    message: '',
    file: undefined,
    privacyPolicy: false
};

/* ------------ Reusable Dropdown ------------ */
interface DropdownProps {
    options: readonly string[];
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    required?: boolean;
    className?: string;
}

const CustomDropdown: React.FC<DropdownProps> = memo(({
                                                          options,
                                                          value,
                                                          onChange,
                                                          placeholder,
                                                          required,
                                                          className
                                                      }) => {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const close = useCallback(() => setOpen(false), []);
    const toggle = useCallback(() => setOpen(o => !o), []);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            if (!btnRef.current?.contains(e.target as Node) &&
                !listRef.current?.contains(e.target as Node)) close();
        };
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('mousedown', handleClick);
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('mousedown', handleClick);
            window.removeEventListener('keydown', handleEsc);
        };
    }, [open, close]);

    return (
        <div className="relative" data-subcomponent="CustomDropdown">
            <label className={`block text-sm font-medium mb-1 ${className}`}>
                {placeholder} {required && <span className="text-red-500">*</span>}
            </label>
            <button
                type="button"
                ref={btnRef}
                onClick={toggle}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={`w-full border-b border-gray-300 bg-transparent p-3 rounded-md text-left ${className}`}
                data-dd-trigger={placeholder}
            >
                {value || placeholder}
            </button>
            {open && (
                <ul
                    ref={listRef}
                    role="listbox"
                    className="absolute z-10 w-full bg-white border rounded-md shadow-md mt-1 max-h-60 overflow-auto"
                    data-dd-list={placeholder}
                >
                    {options.map(opt => (
                        <li
                            key={opt}
                            role="option"
                            aria-selected={value === opt}
                            tabIndex={0}
                            onClick={() => {
                                onChange(opt);
                                close();
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    onChange(opt);
                                    close();
                                }
                            }}
                            className="p-2 cursor-pointer hover:bg-teal-500 hover:text-white focus:bg-teal-500 focus:text-white outline-none"
                            data-dd-option={opt}
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});
CustomDropdown.displayName = 'CustomDropdown';

/* ------------ Component ------------ */
const FormComponent: React.FC = () => {
    const [formData, setFormData] = useState<FormDataShape>(initialForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
    const [isDayTime, setIsDayTime] = useState(true);

    useEffect(() => {
        const hr = new Date().getHours();
        setIsDayTime(hr >= 6 && hr < 18);
    }, []);

    const validate = useCallback((): FormErrors => {
        const e: FormErrors = {};
        const req: (keyof FormDataShape)[] = [
            'name', 'telephone', 'companyOrPersonal', 'email',
            'projectType', 'industryType', 'subject'
        ];
        req.forEach(k => {
            if (!formData[k]) e[k] = 'Required';
        });

        if (formData.companyOrPersonal === 'company') {
            if (!formData.companyName) e.companyName = 'Required';
            if (!formData.companySize) e.companySize = 'Required';
        }
        if (formData.projectType === 'Other' && !formData.otherProjectType) e.otherProjectType = 'Required';
        if (formData.industryType === 'Other' && !formData.otherIndustryType) e.otherIndustryType = 'Required';
        if (formData.subject === 'Other' && !formData.otherSubject) e.otherSubject = 'Required';
        if (formData.howDidYouHear === 'Other' && !formData.otherHowDidYouHear) e.otherHowDidYouHear = 'Required';
        if (!formData.privacyPolicy) e.privacyPolicy = 'Required';

        if (formData.telephone && !/^[\d+()\-\s]{6,}$/.test(formData.telephone)) e.telephone = 'Invalid phone';
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email';

        if (formData.file) {
            if (formData.file.size > 5 * 1024 * 1024) e.file = 'File > 5MB';
            const ok = ['application/pdf', 'image/png', 'image/jpeg'];
            if (!ok.includes(formData.file.type)) e.file = 'Bad file type';
        }
        return e;
    }, [formData]);

    // Replace the existing handleBasicChange with this version
    const handleBasicChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const target = e.target; // or e.currentTarget
            const {name, value} = target;

            // Narrow to input elements that can have 'checked'
            if ('checked' in target) {
                const input = target as HTMLInputElement;
                if (input.type === 'checkbox') {
                    setFormData(prev => ({...prev, [name]: input.checked}));
                    return;
                }
                if (input.type === 'radio') {
                    if (input.checked) {
                        setFormData(prev => ({...prev, [name]: value}));
                    }
                    return;
                }
            }

            // Fallback for textarea or other input types
            setFormData(prev => ({...prev, [name]: value}));
        },
        []
    );

    const handleDropdownChange = useCallback(
        (key: keyof FormDataShape, value: string) => {
            setFormData(prev => ({...prev, [key]: value}));
        },
        []
    );

    const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        setFormData(prev => ({...prev, file: f}));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialForm);
        setErrors({});
    }, []);

    const buildErrorMessage = useCallback(async (res: Response, fallback: string) => {
        try {
            const data = await res.json();
            return (data.error || data.message || fallback);
        } catch {
            return fallback;
        }
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus(null);
        const v = validate();
        if (Object.keys(v).length) {
            setErrors(v);
            return;
        }
        setErrors({});
        setIsSubmitting(true);
        try {
            // multipart (email / primary endpoint)
            const fd = new FormData();
            Object.entries(formData).forEach(([k, v]) => {
                if (v === undefined || v === null) return;
                if (k === 'file' && v instanceof File) fd.append(k, v);
                else if (typeof v === 'boolean') fd.append(k, v ? 'true' : 'false');
                else if (v !== '') fd.append(k, String(v));
            });
            fd.append('formType', FORM_TYPE);

            const [r1] = await Promise.all([
                fetch('/api/submit-form', {method: 'POST', body: fd})
            ]);

            if (!r1.ok) {
                setSubmissionStatus(await buildErrorMessage(r1, 'Submit failed'));
                return;
            }

            setSubmissionStatus('Submitted successfully.');
            resetForm();
            setTimeout(() => setSubmissionStatus(null), 6000);
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Submission error';
            setSubmissionStatus(message);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validate, buildErrorMessage, resetForm]);

    const themeText = isDayTime ? 'text-black' : 'text-white';
    const inputCls = `w-full border-b border-gray-300 bg-transparent p-3 rounded-md focus:outline-none ${themeText}`;

    return (
        <div
            className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 mt-12"
            data-component={FORM_TYPE}
            data-theme={isDayTime ? 'day' : 'night'}
        >
            <h2
                className={`text-2xl sm:text-3xl lg:text-5xl mb-9 text-center font-bold ${themeText}`}
                data-heading={FORM_TYPE}
            >
                Start a project
            </h2>
            <p className={`leading-relaxed text-base sm:text-lg mb-9 ${themeText}`} data-intro="true">
                Starting a project? Need a quote or advice? Feel free to contact us with your query.
            </p>
            <form
                id={FORM_TYPE}
                data-form-type={FORM_TYPE}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                noValidate
                aria-describedby={submissionStatus ? `${FORM_TYPE}-status` : undefined}
            >
                {/* Name */}
                <div>
                    <label className={`block text-sm font-medium ${themeText}`}>
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleBasicChange}
                        className={inputCls}
                        aria-invalid={!!errors.name}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Telephone */}
                <div>
                    <label className={`block text-sm font-medium ${themeText}`}>
                        Telephone <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleBasicChange}
                        className={inputCls}
                        aria-invalid={!!errors.telephone}
                        required
                    />
                    {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className={`block text-sm font-medium ${themeText}`}>
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleBasicChange}
                        className={inputCls}
                        aria-invalid={!!errors.email}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Company or Personal */}
                <div>
          <span className={`block text-sm font-medium ${themeText}`}>
            Company or Personal <span className="text-red-500">*</span>
          </span>
                    <div className="mt-1 flex gap-6">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="companyOrPersonal"
                                value="personal"
                                checked={formData.companyOrPersonal === 'personal'}
                                onChange={handleBasicChange}
                                required
                            />
                            <span className={`ml-2 ${themeText}`}>Personal</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="companyOrPersonal"
                                value="company"
                                checked={formData.companyOrPersonal === 'company'}
                                onChange={handleBasicChange}
                                required
                            />
                            <span className={`ml-2 ${themeText}`}>Company</span>
                        </label>
                    </div>
                    {errors.companyOrPersonal &&
                        <p className="text-red-500 text-xs mt-1">{errors.companyOrPersonal}</p>}
                </div>

                {/* Company fields */}
                {formData.companyOrPersonal === 'company' && (
                    <>
                        <div>
                            <label className={`block text-sm font-medium ${themeText}`}>
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleBasicChange}
                                className={inputCls}
                                required
                            />
                            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                        </div>
                        <div>
                            <CustomDropdown
                                options={COMPANY_SIZE_OPTIONS}
                                value={formData.companySize}
                                onChange={val => handleDropdownChange('companySize', val)}
                                placeholder="Company Size"
                                required
                                className={themeText}
                            />
                            {errors.companySize && <p className="text-red-500 text-xs mt-1">{errors.companySize}</p>}
                        </div>
                    </>
                )}

                {/* Project Type */}
                <div>
                    <CustomDropdown
                        options={PROJECT_TYPE_OPTIONS}
                        value={formData.projectType}
                        onChange={val => handleDropdownChange('projectType', val)}
                        placeholder="Project Type"
                        required
                        className={themeText}
                    />
                    {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
                    {formData.projectType === 'Other' && (
                        <input
                            name="otherProjectType"
                            value={formData.otherProjectType}
                            onChange={handleBasicChange}
                            className={`${inputCls} mt-2`}
                            placeholder="Specify project type"
                            required
                        />
                    )}
                    {errors.otherProjectType && <p className="text-red-500 text-xs mt-1">{errors.otherProjectType}</p>}
                </div>

                {/* Industry Type */}
                <div>
                    <CustomDropdown
                        options={INDUSTRY_TYPE_OPTIONS}
                        value={formData.industryType}
                        onChange={val => handleDropdownChange('industryType', val)}
                        placeholder="Industry Type"
                        required
                        className={themeText}
                    />
                    {errors.industryType && <p className="text-red-500 text-xs mt-1">{errors.industryType}</p>}
                    {formData.industryType === 'Other' && (
                        <input
                            name="otherIndustryType"
                            value={formData.otherIndustryType}
                            onChange={handleBasicChange}
                            className={`${inputCls} mt-2`}
                            placeholder="Specify industry"
                            required
                        />
                    )}
                    {errors.otherIndustryType &&
                        <p className="text-red-500 text-xs mt-1">{errors.otherIndustryType}</p>}
                </div>

                {/* Subject */}
                <div>
                    <CustomDropdown
                        options={SUBJECT_OPTIONS}
                        value={formData.subject}
                        onChange={val => handleDropdownChange('subject', val)}
                        placeholder="Subject"
                        required
                        className={themeText}
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    {formData.subject === 'Other' && (
                        <input
                            name="otherSubject"
                            value={formData.otherSubject}
                            onChange={handleBasicChange}
                            className={`${inputCls} mt-2`}
                            placeholder="Specify subject"
                            required
                        />
                    )}
                    {errors.otherSubject && <p className="text-red-500 text-xs mt-1">{errors.otherSubject}</p>}
                </div>

                {/* How did you hear */}
                <div>
                    <CustomDropdown
                        options={HEAR_OPTIONS}
                        value={formData.howDidYouHear}
                        onChange={val => handleDropdownChange('howDidYouHear', val)}
                        placeholder="How did you hear about us?"
                        className={themeText}
                    />
                    {formData.howDidYouHear === 'Other' && (
                        <input
                            name="otherHowDidYouHear"
                            value={formData.otherHowDidYouHear}
                            onChange={handleBasicChange}
                            className={`${inputCls} mt-2`}
                            placeholder="Specify source"
                            required
                        />
                    )}
                    {errors.otherHowDidYouHear &&
                        <p className="text-red-500 text-xs mt-1">{errors.otherHowDidYouHear}</p>}
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${themeText}`}>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleBasicChange}
                        className={inputCls}
                        rows={4}
                    />
                </div>

                {/* Privacy Policy */}
                <div className="md:col-span-2 flex items-center mt-2">
                    <input
                        type="checkbox"
                        name="privacyPolicy"
                        checked={formData.privacyPolicy}
                        onChange={handleBasicChange}
                        className="h-5 w-5"
                        required
                        aria-invalid={!!errors.privacyPolicy}
                    />
                    <span className={`ml-3 text-sm ${themeText}`}>
            I understand that Grey InfoTech Ltd will securely hold my data in accordance with their privacy policy.
          </span>
                </div>
                {errors.privacyPolicy && (
                    <p className="text-red-500 text-xs mt-1">{errors.privacyPolicy}</p>
                )}

                {/* File (company only) */}
                {formData.companyOrPersonal === 'company' && (
                    <div className="md:col-span-2">
                        <label className={`block text-sm font-medium ${themeText}`}>Upload Company Brochure</label>
                        <input
                            type="file"
                            accept=".pdf,image/png,image/jpeg"
                            onChange={handleFile}
                            className={`mt-1 block w-full ${themeText}`}
                        />
                        {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                    </div>
                )}

                {/* Submit */}
                <div className="md:col-span-2 flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className={`px-6 py-2 bg-teal-500 ${themeText} hover:bg-teal-600 rounded-md font-medium disabled:opacity-60`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>

                {submissionStatus && (
                    <div className="md:col-span-2 text-center mt-4" id={`${FORM_TYPE}-status`}>
                        <p className={themeText}>{submissionStatus}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

FormComponent.displayName = FORM_TYPE;

export {FormComponent, FORM_TYPE};
export default FormComponent;