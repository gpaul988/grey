export interface ApiResult<T = unknown> {
    ok: boolean;
    status: number;
    data: T | null;
    error?: string;
}

type Primitive = string | number | boolean | null | undefined | Date;
export type SubmissionPayload = Record<string, Primitive>;

function extractError(body: unknown, fallback: string): string | undefined {
    if (typeof body === 'object' && body !== null && 'error' in body) {
        const possible = (body as { error?: unknown }).error;
        if (typeof possible === 'string') return possible;
    }
    return fallback;
}

async function parseResponse<T = unknown>(res: Response): Promise<ApiResult<T>> {
    let body: unknown = null;
    try {
        body = await res.json();
    } catch {
        /* ignore non‑JSON */
    }
    if (!res.ok) {
        return {
            ok: false,
            status: res.status,
            data: (body as T) ?? null,
            error: extractError(body, res.statusText)
        };
    }
    return {ok: true, status: res.status, data: (body as T) ?? null};
}

export async function submitNotification<TResponse = unknown>(
    payload: SubmissionPayload,
    files?: File[]
): Promise<ApiResult<TResponse>> {
    if (files && files.length) {
        const fd = new FormData();
        Object.entries(payload).forEach(([k, v]) => {
            if (v === null || v === undefined || v === '') return;
            fd.append(k, v instanceof Date ? v.toISOString() : String(v));
        });
        files.forEach(f => fd.append('files', f));
        return parseResponse<TResponse>(await fetch('/api/submit-form', {method: 'POST', body: fd}));
    }
    return parseResponse<TResponse>(await fetch('/api/submit-form', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }));
}

// Common email regex (lightweight)
export const emailValid = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// Normalizes boolean to string accepted by backend
export const boolString = (b: boolean) => (b ? 'true' : 'false');