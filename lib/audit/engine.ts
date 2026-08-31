/**
 * Audit engine — blunt, no-holds-barred website + GitHub repo auditor.
 *
 * Pure server-side, zero extra dependencies (uses native fetch). Designed to be
 * called from a Next.js API route and shared by both the public /audit page and
 * the admin dashboard tool.
 *
 * It does NOT sugar-coat: every missing best practice is reported as a concrete
 * finding with a severity and a direct "what it lacks / fix" line.
 */

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'pass';

export interface Finding {
    id: string;
    title: string;
    severity: Severity;
    detail: string;
    fix?: string;
    implementation?: string; // Step-by-step fix guidance
}

export interface AuditSection {
    name: string;
    score: number; // 0-100
    findings: Finding[];
}

export interface AuditReport {
    target: {website?: string; repo?: string};
    generatedAt: string;
    overallScore: number;
    grade: string;
    summary: string;
    detailedSummary?: string; // Enhanced summary with context
    sections: AuditSection[];
    error?: string;
}

const TIMEOUT_MS = 12000;

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
        return await fetch(url, {
            ...init,
            signal: ctrl.signal,
            redirect: 'follow',
            headers: {
                'User-Agent': 'GreyInfoTech-Auditor/1.0 (+https://greyinfotech.com.ng)',
                ...(init?.headers || {}),
            },
        });
    } finally {
        clearTimeout(t);
    }
}

const SEV_WEIGHT: Record<Severity, number> = {critical: 0, high: 0, medium: 0, low: 0, pass: 1};

function scoreFromFindings(findings: Finding[]): number {
    if (findings.length === 0) return 100;
    // Deduct by severity; passes add nothing negative.
    let penalty = 0;
    for (const f of findings) {
        if (f.severity === 'critical') penalty += 28;
        else if (f.severity === 'high') penalty += 16;
        else if (f.severity === 'medium') penalty += 8;
        else if (f.severity === 'low') penalty += 3;
    }
    void SEV_WEIGHT;
    return Math.max(0, 100 - penalty);
}

function gradeFor(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 55) return 'D';
    if (score >= 40) return 'E';
    return 'F';
}

/* ──────────────────────────── Website audit ──────────────────────────────── */

function attr(html: string, re: RegExp): string | null {
    const m = html.match(re);
    if (!m) return null;
    // Some regexes are existence-only (no capture group) — fall back to the
    // full match so callers using `attr()` as a boolean check still work.
    const v = m[1] != null ? m[1] : m[0];
    return typeof v === 'string' ? v.trim() : null;
}

async function auditWebsite(rawUrl: string): Promise<AuditSection[]> {
    let url = rawUrl.trim();
    if (!/^https?:\/\//.test(url)) url = 'https://' + url;

    const sections: AuditSection[] = [];
    let res: Response;
    let html = '';
    const start = Date.now();
    try {
        res = await fetchWithTimeout(url, {method: 'GET'});
        html = await res.text();
    } catch (e) {
        return [
            {
                name: 'Reachability',
                score: 0,
                findings: [
                    {
                        id: 'unreachable',
                        title: 'Site is unreachable',
                        severity: 'critical',
                        detail: `Could not load ${url}: ${(e as Error).message}. The auditor timed out or the host refused the connection.`,
                        fix: 'Confirm the URL is correct, the server is up, TLS is valid, and it is not blocking bot user-agents.',
                        implementation: '1. Test the URL in your browser. 2. Check server logs for errors. 3. Verify firewall/proxy allows the request. 4. Add bot-friendly User-Agent if blocking bots.',
                    },
                ],
            },
        ];
    }
    const ttfb = Date.now() - start;
    const h = (name: string) => res.headers.get(name);
    const headLower = html.slice(0, 200000).toLowerCase();
    const htmlLower = html.toLowerCase();

    // ── Transport / HTTPS ──
    {
        const f: Finding[] = [];
        const finalUrl = res.url || url;
        if (!finalUrl.startsWith('https://')) {
            f.push({
                id: 'no-https',
                title: 'Not served over HTTPS',
                severity: 'critical',
                detail: `Final URL resolved to ${finalUrl}. Traffic is unencrypted and browsers flag the site as "Not secure".`,
                fix: 'Install a TLS certificate (Let\'s Encrypt is free) and force-redirect all HTTP to HTTPS.',
                implementation: '1. Obtain a TLS cert (use certbot for Let\'s Encrypt on Linux). 2. Install cert on server. 3. Force-redirect HTTP→HTTPS: `if ($server_port !~ 443) { return 301 https://$server_name$request_uri; }` (nginx). 4. Test with https://www.ssllabs.com.',
            });
        }
        if (!h('strict-transport-security')) {
            f.push({
                id: 'no-hsts',
                title: 'Missing HSTS header',
                severity: 'high',
                detail: 'No Strict-Transport-Security header. Users are exposed to SSL-stripping / downgrade attacks on first visit.',
                fix: 'Add: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
                implementation: 'In your server config, add the header:\n- Nginx: `add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;`\n- Express: `app.use((req, res, next) => { res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload"); next(); });`',
            });
        }
        sections.push({name: 'Transport Security (HTTPS/HSTS)', score: scoreFromFindings(f), findings: f});
    }

    // ── Security headers ──
    {
        const f: Finding[] = [];
        const checks: {hdr: string; title: string; sev: Severity; fix: string; impl: string}[] = [
            {
                hdr: 'content-security-policy',
                title: 'No Content-Security-Policy',
                sev: 'high',
                fix: 'Define a CSP that allowlists only the scripts/styles you actually load. Mitigates XSS.',
                impl: 'Start with a strict policy: `Content-Security-Policy: default-src \'self\'; script-src \'self\' trusted-cdn.com; style-src \'self\' \'unsafe-inline\';`. Use CSP builder tools or check nonce-based strategies for inline scripts.',
            },
            {
                hdr: 'x-frame-options',
                title: 'No X-Frame-Options / frame-ancestors',
                sev: 'medium',
                fix: 'Send X-Frame-Options: DENY (or CSP frame-ancestors) to block clickjacking.',
                impl: 'Add header: `X-Frame-Options: DENY` (or SAMEORIGIN if you need embedding). Or use CSP: `frame-ancestors \'none\';`',
            },
            {
                hdr: 'x-content-type-options',
                title: 'No X-Content-Type-Options',
                sev: 'medium',
                fix: 'Send X-Content-Type-Options: nosniff to stop MIME sniffing.',
                impl: 'Add header: `X-Content-Type-Options: nosniff`. This prevents browsers from guessing file types (e.g., treating .txt as .js).',
            },
            {
                hdr: 'referrer-policy',
                title: 'No Referrer-Policy',
                sev: 'low',
                fix: 'Send Referrer-Policy: strict-origin-when-cross-origin to avoid leaking URLs.',
                impl: 'Add header: `Referrer-Policy: strict-origin-when-cross-origin`. This limits what URL info is sent in the Referer header.',
            },
            {
                hdr: 'permissions-policy',
                title: 'No Permissions-Policy',
                sev: 'low',
                fix: 'Lock down powerful features (camera, geolocation, etc.) via Permissions-Policy.',
                impl: 'Add header: `Permissions-Policy: geolocation=(), camera=(), microphone=()`. Restrict only what you use.',
            },
        ];
        for (const c of checks) {
            if (!h(c.hdr)) {
                f.push({
                    id: c.hdr,
                    title: c.title,
                    severity: c.sev,
                    detail: `Response is missing the ${c.hdr} header.`,
                    fix: c.fix,
                    implementation: c.impl,
                });
            }
        }
        const server = h('server') || h('x-powered-by');
        if (server) {
            f.push({
                id: 'server-banner',
                title: 'Server/tech stack disclosed in headers',
                severity: 'low',
                detail: `Header reveals: "${server}". This hands attackers version info to target known CVEs.`,
                fix: 'Strip or obfuscate Server / X-Powered-By headers.',
                implementation: 'In your server config, remove the Server header:\n- Nginx: `server_tokens off;` in http/server block.\n- Express: `app.disable("x-powered-by");` and use middleware to suppress Server header.',
            });
        }
        sections.push({name: 'HTTP Security Headers', score: scoreFromFindings(f), findings: f});
    }

    // ── SEO / meta ──
    {
        const f: Finding[] = [];
        const title = attr(html, /<title[^>]*>([^<]*)<\/title>/i);
        if (!title) {
            f.push({
                id: 'no-title',
                title: 'Missing <title>',
                severity: 'high',
                detail: 'No page title — kills search ranking and tab/share labels.',
                fix: 'Add a unique, descriptive <title> (50–60 chars).',
                implementation: 'In your <head>, add: `<title>YourBrand - What Your Page Does | Main Keyword</title>`. Include your brand, benefit, and keyword in 50–60 chars.',
            });
        } else if (title.length < 10 || title.length > 65) {
            f.push({
                id: 'title-len',
                title: 'Title length is off',
                severity: 'low',
                detail: `Title is ${title.length} chars ("${title.slice(0, 70)}"). Ideal is 50–60.`,
                fix: 'Tighten the title to 50–60 characters.',
                implementation: `Current: ${title}. Rewrite to 50–60 chars. Example pattern: "Brand - Benefit | Keyword". Test length at tools like Moz's SERP preview.`,
            });
        }

        const desc = attr(html, /<meta[^>]+name=['"']description['"'][^>]+content=['"']([^'"]*)['"']/i);
        if (!desc) {
            f.push({
                id: 'no-desc',
                title: 'Missing meta description',
                severity: 'medium',
                detail: 'No meta description — Google writes its own snippet, hurting CTR.',
                fix: 'Add a 150–160 char meta description per page.',
                implementation: 'In your <head>, add: `<meta name="description" content="Clear, benefit-driven summary (150–160 chars) of your page.">`. Test at https://www.google.com/search (check preview snippet).',
            });
        }

        if (!attr(html, /<meta[^>]+name=['"']viewport['"']/i)) {
            f.push({
                id: 'no-viewport',
                title: 'Missing viewport meta',
                severity: 'high',
                detail: 'No responsive viewport tag — mobile rendering and ranking suffer.',
                fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
                implementation: 'In your <head>, add: `<meta name="viewport" content="width=device-width, initial-scale=1">`. This enables mobile-responsive design.',
            });
        }

        if (!attr(html, /<link[^>]+rel=['"']canonical['"']/i)) {
            f.push({
                id: 'no-canonical',
                title: 'No canonical URL',
                severity: 'low',
                detail: 'No rel="canonical" — risks duplicate-content dilution.',
                fix: 'Add a canonical link on every page.',
                implementation: 'In your <head>, add: `<link rel="canonical" href="https://yoursite.com/page">`. Use absolute URLs. For dynamic pages, include all key params.',
            });
        }

        const h1Count = (headLower.match(/<h1[\s>]/g) || []).length;
        if (h1Count === 0) {
            f.push({
                id: 'no-h1',
                title: 'No <h1> heading',
                severity: 'medium',
                detail: 'Page has no H1 — weakens topical relevance and accessibility.',
                fix: 'Add exactly one descriptive <h1>.',
                implementation: 'Ensure your main content has exactly one <h1> that matches or closely aligns with the <title>. Example: `<h1>Professional Web Audit Services for E-Commerce</h1>`.',
            });
        } else if (h1Count > 1) {
            f.push({
                id: 'multi-h1',
                title: `Multiple <h1> tags (${h1Count})`,
                severity: 'low',
                detail: 'More than one H1 muddies document structure.',
                fix: 'Keep a single H1 per page.',
                implementation: `Found ${h1Count} H1s. Keep only one as the primary heading. Convert others to <h2> or <h3> as needed.`,
            });
        }

        if (!attr(html, /<meta[^>]+property=['"']og:/i)) {
            f.push({
                id: 'no-og',
                title: 'No Open Graph tags',
                severity: 'low',
                detail: 'No og:* tags — links shared on social/WhatsApp render with no preview.',
                fix: 'Add og:title, og:description, og:image, og:url.',
                implementation: 'In your <head>, add:\n```\n<meta property="og:title" content="Your Page Title">\n<meta property="og:description" content="Brief description">\n<meta property="og:image" content="https://yoursite.com/image.jpg">\n<meta property="og:url" content="https://yoursite.com/page">\n```',
            });
        }

        if (!headLower.includes('application/ld+json')) {
            f.push({
                id: 'no-schema',
                title: 'No structured data (JSON-LD)',
                severity: 'low',
                detail: 'No Schema.org markup — you forfeit rich results in search.',
                fix: 'Add Organization/WebSite/Breadcrumb JSON-LD.',
                implementation: 'Add a <script type="application/ld+json"> block in your <head> with Organization or BreadcrumbList schema. Use https://schema.org/Organization or https://www.google.com/search/howsearchworks/structured-data/ for examples.',
            });
        }

        // images without alt (rough heuristic)
        const imgs = html.match(/<img\b[^>]*>/gi) || [];
        const noAlt = imgs.filter((t) => !/\balt\s*=/i.test(t)).length;
        if (noAlt > 0) {
            f.push({
                id: 'img-alt',
                title: `${noAlt} image(s) missing alt text`,
                severity: 'low',
                detail: `${noAlt} of ${imgs.length} <img> tags have no alt attribute — bad for SEO and screen readers.`,
                fix: 'Add meaningful alt text to every content image.',
                implementation: `Audit your images and add descriptive alt text. Example: <img src="product.jpg" alt="Blue ceramic mug with grey handle, 12oz capacity">. Alt text should be 8–125 chars, descriptive but concise.`,
            });
        }

        sections.push({name: 'SEO & Metadata', score: scoreFromFindings(f), findings: f});
    }

    // ── Performance / delivery ──
    {
        const f: Finding[] = [];
        if (ttfb > 1500) {
            f.push({
                id: 'slow-ttfb',
                title: `Slow response (${ttfb}ms)`,
                severity: 'high',
                detail: `Time-to-first-byte was ${ttfb}ms. Anything over ~800ms feels sluggish; over 1.5s actively loses users.`,
                fix: 'Add caching/CDN, optimise server queries, enable keep-alive.',
                implementation: `1. Profile server with tools like New Relic or DataDog. 2. Enable HTTP keep-alive. 3. Deploy to a CDN (Cloudflare, Vercel, Netlify). 4. Cache HTML at the edge with short TTLs. 5. Optimize database queries. Target <200ms TTFB.`,
            });
        } else if (ttfb > 800) {
            f.push({
                id: 'meh-ttfb',
                title: `Mediocre response (${ttfb}ms)`,
                severity: 'medium',
                detail: `TTFB ${ttfb}ms — acceptable but not fast.`,
                fix: 'Cache HTML at the edge / CDN to push this under 200ms.',
                implementation: `Use a CDN with edge caching. For static/semi-static HTML, cache with 1hr–1day TTL. For dynamic content, use streaming or short-lived cache (5–10min).`,
            });
        }

        const enc = h('content-encoding');
        if (!enc) {
            f.push({
                id: 'no-compression',
                title: 'No compression (gzip/brotli)',
                severity: 'medium',
                detail: 'No Content-Encoding header — HTML/CSS/JS are sent uncompressed, wasting bandwidth.',
                fix: 'Enable Brotli or gzip on the server/CDN.',
                implementation: 'Nginx: add `gzip on; gzip_types text/plain text/css application/json application/javascript;` to your config. Express: use `compression` package. Most CDNs auto-enable brotli.',
            });
        }

        if (!h('cache-control')) {
            f.push({
                id: 'no-cache',
                title: 'No Cache-Control header',
                severity: 'low',
                detail: 'No caching directives — repeat visits re-download everything.',
                fix: 'Set sensible Cache-Control for static assets (immutable, long max-age).',
                implementation: 'For static assets (CSS/JS with hash in name): `Cache-Control: public, immutable, max-age=31536000`. For HTML: `Cache-Control: public, max-age=0, must-revalidate`.',
            });
        }

        const bytes = Buffer.byteLength(html, 'utf8');
        if (bytes > 250000) {
            f.push({
                id: 'heavy-html',
                title: `Bloated HTML (${Math.round(bytes / 1024)} KB)`,
                severity: 'low',
                detail: `The HTML document alone is ${Math.round(bytes / 1024)} KB. Large DOM payloads slow first paint.`,
                fix: 'Trim inline data, defer non-critical markup, paginate.',
                implementation: `Analyze the payload with DevTools Network tab. Move large JSON blobs to separate endpoints. Lazy-load off-screen sections with IntersectionObserver. Use server-side pagination for lists.`,
            });
        }

        // mixed content on https pages
        if ((res.url || url).startsWith('https://') && /<(?:img|script|link|iframe)\b[^>]+(?:src|href)=["']http:\/\//i.test(html)) {
            f.push({
                id: 'mixed-content',
                title: 'Mixed content (http:// assets on https page)',
                severity: 'high',
                detail: 'Page loads insecure http:// resources over HTTPS — browsers block them and show warnings.',
                fix: 'Switch all asset URLs to https:// or protocol-relative.',
                implementation: 'Search your templates for `http://` resource URLs. Replace with `https://` or `//` (protocol-relative). Test in browser DevTools Security tab to confirm no mixed-content warnings.',
            });
        }

        sections.push({name: 'Performance & Delivery', score: scoreFromFindings(f), findings: f});
    }

    // ── Accessibility (new section) ──
    {
        const f: Finding[] = [];
        
        // Check for basic ARIA landmarks
        if (!htmlLower.includes('role="main"') && !htmlLower.includes('<main')) {
            f.push({
                id: 'no-main-landmark',
                title: 'Missing main content landmark',
                severity: 'low',
                detail: 'No <main> tag or role="main" — screen readers can\'t easily locate primary content.',
                fix: 'Wrap main content in a <main> tag.',
                implementation: 'Ensure your primary content area is wrapped: `<main>...content...</main>`. This helps screen readers navigate efficiently.',
            });
        }

        // Check for color contrast (basic check—just warns if no explicit contrast)
        if (!htmlLower.includes('contrast') && !htmlLower.includes('wcag')) {
            f.push({
                id: 'no-contrast-info',
                title: 'No explicit contrast guidelines',
                severity: 'low',
                detail: 'No documented color contrast ratios. May fail WCAG AA standards.',
                fix: 'Ensure text has at least 4.5:1 contrast ratio (WCAG AA).',
                implementation: 'Test colors with https://webaim.org/resources/contrastchecker/. Aim for 4.5:1 for normal text, 3:1 for large text (18px+).',
            });
        }

        // Check for form labels
        const inputs = html.match(/<input\b[^>]*>/gi) || [];
        const labelsWithFor = (html.match(/<label[^>]+for=/gi) || []).length;
        if (inputs.length > labelsWithFor && inputs.length > 0) {
            f.push({
                id: 'form-labels',
                title: `Form inputs may lack associated labels (${inputs.length} found, ${labelsWithFor} labeled)`,
                severity: 'low',
                detail: 'Unlabeled form fields are inaccessible to screen readers.',
                fix: 'Associate labels with inputs using <label for="id">.',
                implementation: 'For each <input>, add: `<label for="input-id">Label text</label><input id="input-id" ...>`. The `for` attribute must match the input\'s `id`.',
            });
        }

        sections.push({name: 'Accessibility', score: scoreFromFindings(f), findings: f});
    }

    return sections;
}

/* ──────────────────────────── GitHub repo audit ───────────────────────────── */

function parseRepo(input: string): {owner: string; repo: string} | null {
    const s = input.trim().replace(/\.git$/, '');
    const m =
        s.match(/github\.com[/:]([\w-]+)\/([\w.-]+)/i) ||
        s.match(/^([\w-]+)\/([\w.-]+)$/);
    if (!m) return null;
    return {owner: m[1], repo: m[2]};
}

async function gh<T = unknown>(path: string): Promise<{ok: boolean; status: number; data: T | null}> {
    const headers: Record<string, string> = {Accept: 'application/vnd.github+json'};
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    try {
        const r = await fetchWithTimeout(`https://api.github.com${path}`, {headers});
        const data = r.status === 204 ? null : ((await r.json().catch(() => null)) as T | null);
        return {ok: r.ok, status: r.status, data};
    } catch {
        return {ok: false, status: 0, data: null};
    }
}

async function auditRepo(input: string): Promise<AuditSection[]> {
    const parsed = parseRepo(input);
    if (!parsed) {
        return [
            {
                name: 'Repository',
                score: 0,
                findings: [
                    {
                        id: 'bad-repo',
                        title: 'Unrecognised repo reference',
                        severity: 'critical',
                        detail: `"${input}" is not a valid GitHub repo URL or owner/repo slug.`,
                        fix: 'Use https://github.com/owner/repo or owner/repo.',
                        implementation: 'Valid formats: "https://github.com/greyinfotech/grey" or "greyinfotech/grey"',
                    },
                ],
            },
        ];
    }
    const {owner, repo} = parsed;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = await gh<any>(`/repos/${owner}/${repo}`);
    if (!meta.ok || !meta.data) {
        const detail = meta.status === 404 ? 'Repository not found or private (no access token configured).' : meta.status === 403 ? 'GitHub API rate-limited. Set GITHUB_TOKEN to lift the limit.' : `GitHub API returned status ${meta.status}.`;
        return [
            {
                name: 'Repository',
                score: 0,
                findings: [
                    {
                        id: 'repo-fetch',
                        title: 'Could not read repository',
                        severity: 'critical',
                        detail,
                        fix: meta.status === 403 ? 'Add a GITHUB_TOKEN env var.' : 'Check the URL / make the repo public.',
                        implementation: meta.status === 403 ? 'Create a GitHub personal access token (Settings > Developer Settings > Personal Access Tokens) and set GITHUB_TOKEN env var.' : 'Verify the repo URL and ensure it\'s public.',
                    },
                ],
            },
        ];
    }

    const sections: AuditSection[] = [];
    const m = meta.data;

    // Pull supporting data in parallel.
    const [contents, community, langs] = await Promise.all([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gh<any[]>(`/repos/${owner}/${repo}/contents`),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gh<any>(`/repos/${owner}/${repo}/community/profile`),
        gh<Record<string, number>>(`/repos/${owner}/${repo}/languages`),
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const files = new Set((Array.isArray(contents.data) ? contents.data : []).map((c: any) => String(c.name).toLowerCase()));
    const has = (name: string) => files.has(name.toLowerCase());

    // ── Repo hygiene ──
    {
        const f: Finding[] = [];
        if (!m.license) {
            f.push({
                id: 'no-license',
                title: 'No LICENSE',
                severity: 'high',
                detail: 'Repo has no license — legally nobody can safely reuse it; for a product it signals neglect.',
                fix: 'Add a LICENSE (MIT/Apache-2.0/proprietary as appropriate).',
                implementation: 'Choose a license at https://choosealicense.com/. Create a LICENSE file in the repo root with the full license text. For open source: MIT (permissive) or Apache-2.0 (with patent protection).',
            });
        }
        if (!(community.data?.files?.readme) && !has('readme.md') && !has('readme')) {
            f.push({
                id: 'no-readme',
                title: 'No README',
                severity: 'high',
                detail: 'No README — onboarding, setup and intent are undocumented.',
                fix: 'Add a README with setup, scripts, and architecture overview.',
                implementation: 'Create README.md with: 1) Brief project description. 2) Installation steps. 3) Usage examples. 4) Directory structure. 5) Contributing guidelines. Use markdown headings (# ## ###).',
            });
        }
        if (!has('.gitignore')) {
            f.push({
                id: 'no-gitignore',
                title: 'No .gitignore',
                severity: 'medium',
                detail: 'No .gitignore — risk of committing node_modules, build output, secrets.',
                fix: 'Add a language-appropriate .gitignore.',
                implementation: 'Create .gitignore with: node_modules/, dist/, .env, .DS_Store, *.log. Use https://gitignore.io/ to generate for your stack.',
            });
        }
        if (!has('.env.example') && !has('.env.sample')) {
            f.push({
                id: 'no-env-example',
                title: 'No .env.example',
                severity: 'low',
                detail: 'No env template — contributors must guess required config.',
                fix: 'Commit a .env.example with placeholder keys.',
                implementation: 'Create .env.example with all required vars as placeholders: DATABASE_URL=postgres://localhost/dbname STRIPE_KEY=sk_test_... API_SECRET=your-secret-here',
            });
        }
        if (m.size === 0) {
            f.push({
                id: 'empty-repo',
                title: 'Repository is empty',
                severity: 'critical',
                detail: 'Repo has zero content.',
                fix: 'Push your code.',
                implementation: 'Run: git add . && git commit -m "initial commit" && git push origin main',
            });
        }
        sections.push({name: 'Repo Hygiene', score: scoreFromFindings(f), findings: f});
    }

    // ── Engineering practices ──
    {
        const f: Finding[] = [];
        if (!community.data?.files?.contributing) {
            f.push({
                id: 'no-contributing',
                title: 'No CONTRIBUTING guide',
                severity: 'low',
                detail: 'No contribution guidelines.',
                fix: 'Add CONTRIBUTING.md.',
                implementation: 'Create CONTRIBUTING.md with: 1) How to fork/clone. 2) How to run locally. 3) Code style. 4) PR process. 5) How to test changes.',
            });
        }
        if (!community.data?.files?.code_of_conduct) {
            f.push({
                id: 'no-coc',
                title: 'No Code of Conduct',
                severity: 'low',
                detail: 'No CODE_OF_CONDUCT.',
                fix: 'Add a Code of Conduct for public repos.',
                implementation: 'Add CODE_OF_CONDUCT.md using the Contributor Covenant: https://www.contributor-covenant.org/. Copy the latest version and customize with your contact email.',
            });
        }
        // CI
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const workflows = await gh<any>(`/repos/${owner}/${repo}/contents/.github/workflows`);
        if (!workflows.ok || !Array.isArray(workflows.data) || workflows.data.length === 0) {
            f.push({
                id: 'no-ci',
                title: 'No CI pipeline',
                severity: 'high',
                detail: 'No GitHub Actions workflows — nothing automatically builds/tests/lints on push. Regressions ship silently.',
                fix: 'Add a CI workflow that runs typecheck, lint, tests on every PR.',
                implementation: 'Create .github/workflows/ci.yml:\n```yaml\nname: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: 18\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run test\n```',
            });
        }
        if (!has('dependabot.yml') && !files.has('.github')) {
            f.push({
                id: 'no-dependabot',
                title: 'No automated dependency updates',
                severity: 'medium',
                detail: 'No Dependabot/renovate config detected — dependencies rot and accumulate CVEs.',
                fix: 'Enable Dependabot (.github/dependabot.yml) or Renovate.',
                implementation: 'Create .github/dependabot.yml:\n```yaml\nversion: 2\nupdates:\n  - package-ecosystem: npm\n    directory: "/"\n    schedule:\n      interval: weekly\n```',
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasTests = (Array.isArray(contents.data) ? contents.data : []).some((c: any) => /test|spec|__tests__/i.test(c.name));
        if (!hasTests) {
            f.push({
                id: 'no-tests',
                title: 'No visible test suite',
                severity: 'high',
                detail: 'No test/spec directory at the repo root — correctness is unverified and refactors are risky.',
                fix: 'Add automated tests (unit + integration).',
                implementation: 'Create tests/ or __tests__/ directory. Use Jest, Vitest, or similar. Start with: `npm install -D vitest && npx vitest` then add test files like `math.test.ts`.',
            });
        }
        sections.push({name: 'Engineering Practices', score: scoreFromFindings(f), findings: f});
    }

    // ── Maintenance & risk ──
    {
        const f: Finding[] = [];
        const pushedDaysAgo = m.pushed_at ? Math.floor((Date.now() - new Date(m.pushed_at).getTime()) / 86400000) : 9999;
        if (pushedDaysAgo > 365) {
            f.push({
                id: 'stale',
                title: `Stale (last push ${pushedDaysAgo} days ago)`,
                severity: 'high',
                detail: 'No commits in over a year — likely abandoned, dependencies are insecure by now.',
                fix: 'Resume maintenance or archive it.',
                implementation: 'Either: 1) Audit dependencies (npm audit) and update, or 2) Archive the repo if no longer maintained. Run `npm update && npm audit fix` to patch CVEs.',
            });
        } else if (pushedDaysAgo > 120) {
            f.push({
                id: 'aging',
                title: `Aging (last push ${pushedDaysAgo} days ago)`,
                severity: 'medium',
                detail: 'Months since the last push.',
                fix: 'Ship regular maintenance commits.',
                implementation: 'Set a reminder to review and update deps quarterly. Use Dependabot or Renovate to automate this.',
            });
        }

        if ((m.open_issues_count ?? 0) > 50) {
            f.push({
                id: 'issue-backlog',
                title: `Large issue backlog (${m.open_issues_count})`,
                severity: 'low',
                detail: 'A big open-issue count signals triage debt.',
                fix: 'Triage, label, and close stale issues.',
                implementation: `Use GitHub issue filters to find "updated:<2021" and close inactive ones. Add labels (bug, feature, blocked) for org. Consider setting templates for bug reports.`,
            });
        }

        if (m.archived) {
            f.push({
                id: 'archived',
                title: 'Repository is archived',
                severity: 'medium',
                detail: 'Archived repos are read-only and unmaintained.',
                fix: 'Un-archive if still in use.',
                implementation: 'If still needed: Settings > General > Un-archive this repository.',
            });
        }

        sections.push({name: 'Maintenance & Risk', score: scoreFromFindings(f), findings: f});
    }

    return sections;
}

/* ──────────────────────────── Orchestration ──────────────────────────────── */

export async function runAudit(opts: {website?: string; repo?: string}): Promise<AuditReport> {
    const sections: AuditSection[] = [];
    const tasks: Promise<AuditSection[]>[] = [];
    if (opts.website) tasks.push(auditWebsite(opts.website));
    if (opts.repo) tasks.push(auditRepo(opts.repo));

    const results = await Promise.all(tasks);
    for (const r of results) sections.push(...r);

    const overall = sections.length ? Math.round(sections.reduce((a, s) => a + s.score, 0) / sections.length) : 0;
    const allFindings = sections.flatMap((s) => s.findings);
    const crit = allFindings.filter((f) => f.severity === 'critical').length;
    const high = allFindings.filter((f) => f.severity === 'high').length;
    const med = allFindings.filter((f) => f.severity === 'medium').length;
    const low = allFindings.filter((f) => f.severity === 'low').length;

    let summary: string;
    if (overall >= 90) summary = `Solid. ${allFindings.length} issue(s) flagged, none severe — polish the edges and ship.`;
    else if (overall >= 70) summary = `Decent but leaky. ${crit} critical, ${high} high, ${med} medium issues. Fix the highs before you call this production-ready.`;
    else if (overall >= 50) summary = `Rough. ${crit} critical and ${high} high-severity problems. This needs real work before it's trustworthy.`;
    else summary = `Failing. ${crit} critical and ${high} high-severity findings. Right now this is not safe to put in front of users or clients.`;

    // Enhanced detailed summary
    let detailedSummary = `**Audit Overview**\n\n`;
    detailedSummary += `Overall Score: **${overall}/100 (${gradeFor(overall)})**\n\n`;
    detailedSummary += `**Finding Breakdown:**\n`;
    detailedSummary += `- 🔴 Critical: ${crit}\n`;
    detailedSummary += `- 🟠 High: ${high}\n`;
    detailedSummary += `- 🟡 Medium: ${med}\n`;
    detailedSummary += `- 🔵 Low: ${low}\n\n`;
    
    detailedSummary += `**Key Recommendations:**\n`;
    const criticalFindings = allFindings.filter((f) => f.severity === 'critical');
    const highFindings = allFindings.filter((f) => f.severity === 'high');
    if (criticalFindings.length > 0) {
        detailedSummary += `\n**Critical (Fix First):**\n`;
        criticalFindings.slice(0, 3).forEach((f) => {
            detailedSummary += `- ${f.title}: ${f.detail.substring(0, 100)}...\n`;
        });
    }
    if (highFindings.length > 0) {
        detailedSummary += `\n**High Priority (Fix Next):**\n`;
        highFindings.slice(0, 3).forEach((f) => {
            detailedSummary += `- ${f.title}\n`;
        });
    }
    detailedSummary += `\n*Full details with step-by-step fixes available below.*`;

    return {
        target: {website: opts.website, repo: opts.repo},
        generatedAt: new Date().toISOString(),
        overallScore: overall,
        grade: gradeFor(overall),
        summary,
        detailedSummary,
        sections,
    };
}
