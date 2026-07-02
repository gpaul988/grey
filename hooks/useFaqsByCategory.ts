import { useEffect, useState } from 'react';

export interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

export interface FaqCategory {
    name: string;
    items: FaqItem[];
}

export function useFaqsByCategory(category?: string) {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch('/api/faqs');
                const data = await response.json();

                if (data.categories) {
                    if (category) {
                        // Find FAQs matching the category
                        const cat = data.categories.find((c: FaqCategory) => 
                            c.name.toLowerCase() === category.toLowerCase()
                        );
                        setFaqs(cat?.items || []);
                    } else {
                        // Flatten all FAQs
                        const allFaqs = data.categories.reduce((acc: FaqItem[], cat: FaqCategory) => [
                            ...acc,
                            ...cat.items
                        ], []);
                        setFaqs(allFaqs);
                    }
                }
                setError(null);
            } catch (err) {
                console.error('Failed to fetch FAQs:', err);
                setError('Failed to load FAQs');
                setFaqs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, [category]);

    return { faqs, loading, error };
}
