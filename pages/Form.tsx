import React, {useState} from 'react';
import '../app/globals.css';

const Form: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, subject, message}),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const result: { success: boolean; message: string } = await res.json();

            if (result.success) {
                setSuccess('Message sent!');
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                setError(result.message || 'Failed to send message.');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'An unexpected error occurred.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <input
                className="border p-2 w-full"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                required
                disabled={loading}
            />
            <input
                className="border p-2 w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                type="email"
                disabled={loading}
            />
            <input
                className="border p-2 w-full"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Subject"
                disabled={loading}
            />
            <textarea
                className="border p-2 w-full"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Message"
                disabled={loading}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Sending...' : 'Send'}
            </button>
            {success && <div className="text-green-600">{success}</div>}
            {error && <div className="text-red-600">{error}</div>}
        </form>
    );
};

export default Form;