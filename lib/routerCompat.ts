'use client';

/**
 * Compatibility shim: lets components written against the Pages Router
 * (`next/router`) keep working inside the App Router without a rewrite.
 *
 * It maps the old `useRouter()` surface (`query`, `asPath`, `push`,
 * `replace`, `back`, `pathname`) onto `next/navigation`. Dynamic route
 * params are read from `useParams()`, so `router.query.slug` etc. resolve
 * correctly under App Router.
 *
 * Usage: replace `import {useRouter} from 'next/router'`
 *        with    `import {useRouter} from '@/lib/routerCompat'`
 */
import {useMemo} from 'react';
import {
    useRouter as useAppRouter,
    usePathname,
    useSearchParams,
    useParams,
} from 'next/navigation';

/** Pages Router-style URL object accepted by push/replace for back-compat. */
type UrlObject = {pathname?: string; query?: Record<string, string | string[] | undefined>; hash?: string};
type Url = string | UrlObject;

/** Serialize a Pages Router UrlObject (or string) into an App Router href. */
function toHref(url: Url): string {
    if (typeof url === 'string') return url;
    const path = url.pathname || '/';
    const params = new URLSearchParams();
    if (url.query) {
        for (const [k, v] of Object.entries(url.query)) {
            if (v == null) continue;
            if (Array.isArray(v)) v.forEach((vv) => params.append(k, vv));
            else params.append(k, v);
        }
    }
    const qs = params.toString();
    return `${path}${qs ? `?${qs}` : ''}${url.hash ? `#${url.hash}` : ''}`;
}

export function useRouter() {
    const router = useAppRouter();
    const pathname = usePathname();
    const search = useSearchParams();
    const params = useParams();

    return useMemo(() => {
        // Merge dynamic params + search params into a single query object,
        // mirroring the old Pages Router `router.query`.
        const query: Record<string, string | string[]> = {...(params as Record<string, string | string[]>)};
        if (search) {
            for (const [k, v] of search.entries()) {
                query[k] = v;
            }
        }
        const qs = search?.toString();
        const asPath = qs ? `${pathname}?${qs}` : pathname || '/';

        return {
            query,
            params,
            pathname: pathname || '/',
            asPath,
            route: pathname || '/',
            isReady: true,
            push: (url: Url) => router.push(toHref(url)),
            replace: (url: Url) => router.replace(toHref(url)),
            back: () => router.back(),
            forward: () => router.forward(),
            refresh: () => router.refresh(),
            prefetch: (url: string) => router.prefetch(url),
            reload: () => {
                if (typeof window !== 'undefined') window.location.reload();
            },
        };
    }, [router, pathname, search, params]);
}

export default useRouter;
