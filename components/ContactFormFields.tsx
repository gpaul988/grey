import React, {useState} from 'react';
import {submitNotification, emailValid, boolString} from '@/lib/forms/api';

const FORM_TYPE = 'ContactFormFields';

interface ContactFormState {
    name: string;
    email: string;
    telephone: string;
    country: string;
    otherCountry: string;
    companyOrPersonal: string;
    companyName: string;
    companySize: string;
    projectType: string;
    otherProjectType: string;
    industryType: string;
    otherIndustryType: string;
    subject: string;
    otherSubject: string;
    howDidYouHear: string;
    otherHowDidYouHear: string;
    meeting: string;
    message: string;
    file?: File;
    privacyPolicy: boolean;
}

interface DbPayload {
    [key: string]: string | undefined;

    formType: string;
    name: string;
    email: string;
    telephone: string;
    country: string;
    companyOrPersonal: string;
    projectType: string;
    industryType: string;
    subject: string;
    privacyPolicy: string;
    message: string;
    companyName?: string;
    companySize?: string;
    meeting?: string;
    howDidYouHear?: string;
    otherHowDidYouHear?: string;
    otherProjectType?: string;
    otherIndustryType?: string;
    otherSubject?: string;
}

const select = (arr: string[]) => arr.slice().sort().concat('Other');

const projectTypeOptions = select([
    'AI Development', 'Android Development', 'App Store Optimization', 'Blockchain Development',
    'Cross Platform Development', 'Digital Marketing', 'Flutter Development', 'IoT Development',
    'Mac Development', 'Mobile Application Development', 'React Native Development', 'SEO',
    'Social Media Marketing', 'Software Development', 'Web Application Design', 'Web Development',
    'Windows Development', 'Wix Development'
]);
const industryTypeOptions = select([
    'Automation', 'Building & Construction', 'Education', 'Event Management', 'Finance', 'Government',
    'Healthcare', 'Hospitality', 'Manufacturing', 'Media', 'Oil and Gas', 'Pharmaceutical', 'Retail',
    'Technology', 'Trade', 'Transportation and Logistics'
]);
const subjectOptions = select([
    'Design', 'Development', 'Consultation', 'Support', 'Branding', 'Migration', 'New Project', 'Partnership'
]);
const howDidYouHearOptions = select(['Google', 'Social Media', 'Referral', 'Advertisement']);
const companySizeOptions = ['1-10', '11-50', '51-200', '201-500', '500+'];
const countryOptions = [
    'Nigeria', 'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'India', 'South Africa',
    'Australia', 'China', 'Japan', 'Brazil', 'Other'
].sort();

const initial: ContactFormState = {
    name: '', email: '', telephone: '', country: '', otherCountry: '', companyOrPersonal: '',
    companyName: '', companySize: '', projectType: '', otherProjectType: '',
    industryType: '', otherIndustryType: '', subject: '', otherSubject: '',
    howDidYouHear: '', otherHowDidYouHear: '', meeting: '', message: '',
    file: undefined, privacyPolicy: false
};

export default function ContactFormFields() {
    const [form, setForm] = useState(initial);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<{ kind: '', msg: '' } | { kind: 'error' | 'success', msg: string }>({
        kind: '',
        msg: ''
    });

    const setField = <K extends keyof ContactFormState>(k: K, v: ContactFormState[K]) =>
        setForm(f => ({...f, [k]: v}));

    const required: (keyof ContactFormState)[] = [
        'name', 'email', 'telephone', 'country', 'companyOrPersonal', 'projectType', 'industryType', 'subject'
    ];

    const validate = (): string | null => {
        for (const key of required) {
            if (!String(form[key]).trim()) return `Missing ${key}`;
        }
        if (!emailValid(form.email)) return 'Invalid email';
        if (form.country === 'Other' && !form.otherCountry.trim()) return 'Specify country';
        if (form.projectType === 'Other' && !form.otherProjectType.trim()) return 'Specify project type';
        if (form.industryType === 'Other' && !form.otherIndustryType.trim()) return 'Specify industry type';
        if (form.subject === 'Other' && !form.otherSubject.trim()) return 'Specify subject';
        if (form.howDidYouHear === 'Other' && !form.otherHowDidYouHear.trim()) return 'Specify source';
        if (!form.privacyPolicy) return 'Accept privacy policy';
        return null;
    };
    
    const buildNotificationPayload = () => ({
        formType: FORM_TYPE,
        name: form.name,
        email: form.email,
        telephone: form.telephone,
        message: form.message,
        projectType: form.projectType,
        country: form.country
    });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const v = validate();
        if (v) {
            setStatus({kind: 'error', msg: v});
            return;
        }
        setSubmitting(true);
        setStatus({kind: '', msg: ''});
        try {
            const notif = await submitNotification(buildNotificationPayload(), form.file ? [form.file] : undefined);
            if (!notif.ok) {
                setStatus({kind: 'error', msg: notif.error || 'Notification failed'});
                setSubmitting(false);
                return;
            }

            setStatus({kind: 'success', msg: 'Submitted successfully'});
            setForm(initial);
        } catch (err) {
            console.error('Submission error:', err);
            setStatus({kind: 'error', msg: 'Unexpected error'});
        } finally {
            setSubmitting(false);
        }
    };

    const inputCls = 'w-full border p-2 rounded text-sm';
    const selectOptions = (arr: string[]) => arr.map(o => <option key={o} value={o}>{o}</option>);

    return (
        <form onSubmit={submit} className="space-y-4 p-6 bg-white rounded-md shadow">
            <h2 className="font-semibold text-lg">Contact Form</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <input className={inputCls} placeholder="Name *" value={form.name}
                       onChange={e => setField('name', e.target.value)}/>
                <input className={inputCls} placeholder="Email *" type="email" value={form.email}
                       onChange={e => setField('email', e.target.value)}/>
                <input className={inputCls} placeholder="Telephone *" value={form.telephone}
                       onChange={e => setField('telephone', e.target.value)}/>
                <select className={inputCls} value={form.country} onChange={e => setField('country', e.target.value)}>
                    <option value="">Country *</option>
                    {selectOptions(countryOptions)}
                </select>
                {form.country === 'Other' && (
                    <input className={inputCls} placeholder="Other Country *" value={form.otherCountry}
                           onChange={e => setField('otherCountry', e.target.value)}/>
                )}
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1 text-sm">
                        <input type="radio" name="companyOrPersonal" checked={form.companyOrPersonal === 'personal'}
                               onChange={() => setField('companyOrPersonal', 'personal')}/> Personal
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                        <input type="radio" name="companyOrPersonal" checked={form.companyOrPersonal === 'company'}
                               onChange={() => setField('companyOrPersonal', 'company')}/> Company
                    </label>
                </div>
                {form.companyOrPersonal === 'company' && (
                    <>
                        <input className={inputCls} placeholder="Company Name *" value={form.companyName}
                               onChange={e => setField('companyName', e.target.value)}/>
                        <select className={inputCls} value={form.companySize}
                                onChange={e => setField('companySize', e.target.value)}>
                            <option value="">Company Size *</option>
                            {selectOptions(companySizeOptions)}
                        </select>
                    </>
                )}
                <select className={inputCls} value={form.projectType}
                        onChange={e => setField('projectType', e.target.value)}>
                    <option value="">Project Type *</option>
                    {selectOptions(projectTypeOptions)}
                </select>
                {form.projectType === 'Other' && (
                    <input className={inputCls} placeholder="Other Project Type *" value={form.otherProjectType}
                           onChange={e => setField('otherProjectType', e.target.value)}/>
                )}
                <select className={inputCls} value={form.industryType}
                        onChange={e => setField('industryType', e.target.value)}>
                    <option value="">Industry Type *</option>
                    {selectOptions(industryTypeOptions)}
                </select>
                {form.industryType === 'Other' && (
                    <input className={inputCls} placeholder="Other Industry Type *" value={form.otherIndustryType}
                           onChange={e => setField('otherIndustryType', e.target.value)}/>
                )}
                <select className={inputCls} value={form.subject} onChange={e => setField('subject', e.target.value)}>
                    <option value="">Subject *</option>
                    {selectOptions(subjectOptions)}
                </select>
                {form.subject === 'Other' && (
                    <input className={inputCls} placeholder="Other Subject *" value={form.otherSubject}
                           onChange={e => setField('otherSubject', e.target.value)}/>
                )}
                <select className={inputCls} value={form.howDidYouHear}
                        onChange={e => setField('howDidYouHear', e.target.value)}>
                    <option value="">How did you hear?</option>
                    {selectOptions(howDidYouHearOptions)}
                </select>
                {form.howDidYouHear === 'Other' && (
                    <input className={inputCls} placeholder="Other Source *" value={form.otherHowDidYouHear}
                           onChange={e => setField('otherHowDidYouHear', e.target.value)}/>
                )}
                <input className={inputCls} type="datetime-local" value={form.meeting}
                       onChange={e => setField('meeting', e.target.value)} placeholder="Meeting"/>
                <input className={inputCls} type="file" onChange={e => setField('file', e.target.files?.[0])}/>
            </div>
            <textarea className={inputCls} rows={4} placeholder="Message" value={form.message}
                      onChange={e => setField('message', e.target.value)}/>
            <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.privacyPolicy}
                       onChange={e => setField('privacyPolicy', e.target.checked)}/> Accept privacy policy *
            </label>
            <button disabled={submitting} className="bg-teal-600 text-white px-4 py-2 rounded text-sm w-full">
                {submitting ? 'Submitting...' : 'Submit'}
            </button>
            {status.kind &&
                <p className={`text-sm mt-2 ${status.kind === 'error' ? 'text-red-600' : 'text-green-600'}`}>{status.msg}</p>}
        </form>
    );
}