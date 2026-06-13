'use client';
import {useEffect, useState} from 'react';

type Submission = {
    id: number;
    title: string;
    // Add other fields if needed
};

export default function Submissions() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/submissions')
            .then(res => res.json())
            .then(data => setSubmissions(data));
    }, []);

    return (
        <ul>
            {submissions.map(sub => (
                <li key={sub.id}>{sub.title}</li>
            ))}
        </ul>
    );
}