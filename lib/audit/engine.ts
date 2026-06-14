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
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

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
                    },
                ],
            },
        ];
    }
    const ttfb = Date.now() - start;
    const h = (name: string) => res.headers.get(name);
    const headLower = html.slice(0, 200000).toLowerCase();

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
                fix: 'Install a TLS certificate (Let’s Encrypt is free) and force-redirect all HTTP to HTTPS.',
            });
        }
        if (!h('strict-transport-security')) {
            f.push({
                id: 'no-hsts',
                title: 'Missing HSTS header',
                severity: 'high',
                detail: 'No Strict-Transport-Security header. Users are exposed to SSL-stripping / downgrade attacks on first visit.',
                fix: 'Add: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
            });
        }
        sections.push({name: 'Transport Security (HTTPS/HSTS)', score: scoreFromFindings(f), findings: f});
    }

    // ── Security headers ──
    {
        const f: Finding[] = [];
        const checks: {hdr: string; title: string; sev: Severity; fix: string}[] = [
            {hdr: 'content-security-policy', title: 'No Content-Security-Policy', sev: 'high', fix: 'Define a CSP that allowlists only the scripts/styles you actually load. Mitigates XSS.'},
            {hdr: 'x-frame-options', title: 'No X-Frame-Options / frame-ancestors', sev: 'medium', fix: 'Send X-Frame-Options: DENY (or CSP frame-ancestors) to block clickjacking.'},
            {hdr: 'x-content-type-options', title: 'No X-Content-Type-Options', sev: 'medium', fix: 'Send X-Content-Type-Options: nosniff to stop MIME sniffing.'},
            {hdr: 'referrer-policy', title: 'No Referrer-Policy', sev: 'low', fix: 'Send Referrer-Policy: strict-origin-when-cross-origin to avoid leaking URLs.'},
            {hdr: 'permissions-policy', title: 'No Permissions-Policy', sev: 'low', fix: 'Lock down powerful features (camera, geolocation, etc.) via Permissions-Policy.'},
        ];
        for (const c of checks) {
            if (!h(c.hdr)) {
                f.push({id: c.hdr, title: c.title, severity: c.sev, detail: `Response is missing the ${c.hdr} header.`, fix: c.fix});
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
            });
        }
        sections.push({name: 'HTTP Security Headers', score: scoreFromFindings(f), findings: f});
    }

    // ── SEO / meta ──
    {
        const f: Finding[] = [];
        const title = attr(html, /<title[^>]*>([^<]*)<\/title>/i);
        if (!title) f.push({id: 'no-title', title: 'Missing <title>', severity: 'high', detail: 'No page title — kills search ranking and tab/share labels.', fix: 'Add a unique, descriptive <title> (50–60 chars).'});
        else if (title.length < 10 || title.length > 65) f.push({id: 'title-len', title: 'Title length is off', severity: 'low', detail: `Title is ${title.length} chars ("${title.slice(0, 70)}"). Ideal is 50–60.`, fix: 'Tighten the title to 50–60 characters.'});

        const desc = attr(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
        if (!desc) f.push({id: 'no-desc', title: 'Missing meta description', severity: 'medium', detail: 'No meta description — Google writes its own snippet, hurting CTR.', fix: 'Add a 150–160 char meta description per page.'});

        if (!attr(html, /<meta[^>]+name=["']viewport["']/i)) f.push({id: 'no-viewport', title: 'Missing viewport meta', severity: 'high', detail: 'No responsive viewport tag — mobile rendering and ranking suffer.', fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.'});

        if (!attr(html, /<link[^>]+rel=["']canonical["']/i)) f.push({id: 'no-canonical', title: 'No canonical URL', severity: 'low', detail: 'No rel="canonical" — risks duplicate-content dilution.', fix: 'Add a canonical link on every page.'});

        const h1Count = (headLower.match(/<h1[\s>]/g) || []).length;
        if (h1Count === 0) f.push({id: 'no-h1', title: 'No <h1> heading', severity: 'medium', detail: 'Page has no H1 — weakens topical relevance and accessibility.', fix: 'Add exactly one descriptive <h1>.'});
        else if (h1Count > 1) f.push({id: 'multi-h1', title: `Multiple <h1> tags (${h1Count})`, severity: 'low', detail: 'More than one H1 muddies document structure.', fix: 'Keep a single H1 per page.'});

        if (!attr(html, /<meta[^>]+property=["']og:/i)) f.push({id: 'no-og', title: 'No Open Graph tags', severity: 'low', detail: 'No og:* tags — links shared on social/WhatsApp render with no preview.', fix: 'Add og:title, og:description, og:image, og:url.'});

        if (!headLower.includes('application/ld+json')) f.push({id: 'no-schema', title: 'No structured data (JSON-LD)', severity: 'low', detail: 'No Schema.org markup — you forfeit rich results in search.', fix: 'Add Organization/WebSite/Breadcrumb JSON-LD.'});

        // images without alt (rough heuristic)
        const imgs = (html.match(/<img\b[^>]*>/gi) || []);
        const noAlt = imgs.filter((t) => !/\balt\s*=/i.test(t)).length;
        if (noAlt > 0) f.push({id: 'img-alt', title: `${noAlt} image(s) missing alt text`, severity: 'low', detail: `${noAlt} of ${imgs.length} <img> tags have no alt attribute — bad for SEO and screen readers.`, fix: 'Add meaningful alt text to every content image.'});

        sections.push({name: 'SEO & Metadata', score: scoreFromFindings(f), findings: f});
    }

    // ── Performance / delivery ──
    {
        const f: Finding[] = [];
        if (ttfb > 1500) f.push({id: 'slow-ttfb', title: `Slow response (${ttfb}ms)`, severity: 'high', detail: `Time-to-first-byte was ${ttfb}ms. Anything over ~800ms feels sluggish; over 1.5s actively loses users.`, fix: 'Add caching/CDN, optimise server queries, enable keep-alive.'});
        else if (ttfb > 800) f.push({id: 'meh-ttfb', title: `Mediocre response (${ttfb}ms)`, severity: 'medium', detail: `TTFB ${ttfb}ms — acceptable but not fast.`, fix: 'Cache HTML at the edge / CDN to push this under 200ms.'});

        const enc = h('content-encoding');
        if (!enc) f.push({id: 'no-compression', title: 'No compression (gzip/brotli)', severity: 'medium', detail: 'No Content-Encoding header — HTML/CSS/JS are sent uncompressed, wasting bandwidth.', fix: 'Enable Brotli or gzip on the server/CDN.'});

        if (!h('cache-control')) f.push({id: 'no-cache', title: 'No Cache-Control header', severity: 'low', detail: 'No caching directives — repeat visits re-download everything.', fix: 'Set sensible Cache-Control for static assets (immutable, long max-age).'});

        const bytes = Buffer.byteLength(html, 'utf8');
        if (bytes > 250000) f.push({id: 'heavy-html', title: `Bloated HTML (${Math.round(bytes / 1024)} KB)`, severity: 'low', detail: `The HTML document alone is ${Math.round(bytes / 1024)} KB. Large DOM payloads slow first paint.`, fix: 'Trim inline data, defer non-critical markup, paginate.'});

        // mixed content on https pages
        if ((res.url || url).startsWith('https://') && /<(?:img|script|link|iframe)\b[^>]+(?:src|href)=["']http:\/\//i.test(html)) {
            f.push({id: 'mixed-content', title: 'Mixed content (http:// assets on https page)', severity: 'high', detail: 'Page loads insecure http:// resources over HTTPS — browsers block them and show warnings.', fix: 'Switch all asset URLs to https:// or protocol-relative.'});
        }
        sections.push({name: 'Performance & Delivery', score: scoreFromFindings(f), findings: f});
    }

    return sections;
}

/* ──────────────────────────── GitHub repo audit ───────────────────────────── */

function parseRepo(input: string): {owner: string; repo: string} | null {
    const s = input.trim().replace(/\.git$/, '');
    const m =
        s.match(/github\.com[/:]([^/]+)\/([^/?#]+)/i) ||
        s.match(/^([^/\s]+)\/([^/\s]+)$/);
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
        return [{name: 'Repository', score: 0, findings: [{id: 'bad-repo', title: 'Unrecognised repo reference', severity: 'critical', detail: `"${input}" is not a valid GitHub repo URL or owner/repo slug.`, fix: 'Use https://github.com/owner/repo or owner/repo.'}]}];
    }
    const {owner, repo} = parsed;
    const meta = await gh<any>(`/repos/${owner}/${repo}`);
    if (!meta.ok || !meta.data) {
        const detail = meta.status === 404 ? 'Repository not found or private (no access token configured).' : meta.status === 403 ? 'GitHub API rate-limited. Set GITHUB_TOKEN to lift the limit.' : `GitHub API returned status ${meta.status}.`;
        return [{name: 'Repository', score: 0, findings: [{id: 'repo-fetch', title: 'Could not read repository', severity: 'critical', detail, fix: meta.status === 403 ? 'Add a GITHUB_TOKEN env var.' : 'Check the URL / make the repo public.'}]}];
    }

    const sections: AuditSection[] = [];
    const m = meta.data;

    // Pull supporting data in parallel.
    const [contents, community, langs] = await Promise.all([
        gh<any[]>(`/repos/${owner}/${repo}/contents`),
        gh<any>(`/repos/${owner}/${repo}/community/profile`),
        gh<Record<string, number>>(`/repos/${owner}/${repo}/languages`),
    ]);
    const files = new Set((Array.isArray(contents.data) ? contents.data : []).map((c: any) => String(c.name).toLowerCase()));
    const has = (name: string) => files.has(name.toLowerCase());

    // ── Repo hygiene ──
    {
        const f: Finding[] = [];
        if (!m.license) f.push({id: 'no-license', title: 'No LICENSE', severity: 'high', detail: 'Repo has no license — legally nobody can safely reuse it; for a product it signals neglect.', fix: 'Add a LICENSE (MIT/Apache-2.0/proprietary as appropriate).'});
        if (!(community.data?.files?.readme) && !has('readme.md') && !has('readme')) f.push({id: 'no-readme', title: 'No README', severity: 'high', detail: 'No README — onboarding, setup and intent are undocumented.', fix: 'Add a README with setup, scripts, and architecture overview.'});
        if (!has('.gitignore')) f.push({id: 'no-gitignore', title: 'No .gitignore', severity: 'medium', detail: 'No .gitignore — risk of committing node_modules, build output, secrets.', fix: 'Add a language-appropriate .gitignore.'});
        if (!has('.env.example') && !has('.env.sample')) f.push({id: 'no-env-example', title: 'No .env.example', severity: 'low', detail: 'No env template — contributors must guess required config.', fix: 'Commit a .env.example with placeholder keys.'});
        if (m.size === 0) f.push({id: 'empty-repo', title: 'Repository is empty', severity: 'critical', detail: 'Repo has zero content.', fix: 'Push your code.'});
        sections.push({name: 'Repo Hygiene', score: scoreFromFindings(f), findings: f});
    }

    // ── Engineering practices ──
    {
        const f: Finding[] = [];
        if (!community.data?.files?.contributing) f.push({id: 'no-contributing', title: 'No CONTRIBUTING guide', severity: 'low', detail: 'No contribution guidelines.', fix: 'Add CONTRIBUTING.md.'});
        if (!community.data?.files?.code_of_conduct) f.push({id: 'no-coc', title: 'No Code of Conduct', severity: 'low', detail: 'No CODE_OF_CONDUCT.', fix: 'Add a Code of Conduct for public repos.'});
        // CI
        const workflows = await gh<any>(`/repos/${owner}/${repo}/contents/.github/workflows`);
        if (!workflows.ok || !Array.isArray(workflows.data) || workflows.data.length === 0) {
            f.push({id: 'no-ci', title: 'No CI pipeline', severity: 'high', detail: 'No GitHub Actions workflows — nothing automatically builds/tests/lints on push. Regressions ship silently.', fix: 'Add a CI workflow that runs typecheck, lint, tests on every PR.'});
        }
        if (!has('dependabot.yml') && !files.has('.github')) {
            // best-effort; dependabot lives under .github
            f.push({id: 'no-dependabot', title: 'No automated dependency updates', severity: 'medium', detail: 'No Dependabot/renovate config detected — dependencies rot and accumulate CVEs.', fix: 'Enable Dependabot (.github/dependabot.yml) or Renovate.'});
        }
        const hasTests = (Array.isArray(contents.data) ? contents.data : []).some((c: any) => /test|spec|__tests__/i.test(c.name));
        if (!hasTests) f.push({id: 'no-tests', title: 'No visible test suite', severity: 'high', detail: 'No test/spec directory at the repo root — correctness is unverified and refactors are risky.', fix: 'Add automated tests (unit + integration).'});
        sections.push({name: 'Engineering Practices', score: scoreFromFindings(f), findings: f});
    }

    // ── Maintenance & risk ──
    {
        const f: Finding[] = [];
        const pushedDaysAgo = m.pushed_at ? Math.floor((Date.now() - new Date(m.pushed_at).getTime()) / 86400000) : 9999;
        if (pushedDaysAgo > 365) f.push({id: 'stale', title: `Stale (last push ${pushedDaysAgo} days ago)`, severity: 'high', detail: 'No commits in over a year — likely abandoned, dependencies are insecure by now.', fix: 'Resume maintenance or archive it.'});
        else if (pushedDaysAgo > 120) f.push({id: 'aging', title: `Aging (last push ${pushedDaysAgo} days ago)`, severity: 'medium', detail: 'Months since the last push.', fix: 'Ship regular maintenance commits.'});

        if ((m.open_issues_count ?? 0) > 50) f.push({id: 'issue-backlog', title: `Large issue backlog (${m.open_issues_count})`, severity: 'low', detail: 'A big open-issue count signals triage debt.', fix: 'Triage, label, and close stale issues.'});

        if (m.archived) f.push({id: 'archived', title: 'Repository is archived', severity: 'medium', detail: 'Archived repos are read-only and unmaintained.', fix: 'Un-archive if still in use.'});

        if (m.private === false && /secret|password|token|api[_-]?key/i.test(JSON.stringify(Object.keys(langs.data || {})))) {
            // placeholder; real secret scanning needs content access
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

    let summary: string;
    if (overall >= 90) summary = `Solid. ${allFindings.length} issue(s) flagged, none severe — polish the edges and ship.`;
    else if (overall >= 70) summary = `Decent but leaky. ${crit} critical, ${high} high, ${med} medium issues. Fix the highs before you call this production-ready.`;
    else if (overall >= 50) summary = `Rough. ${crit} critical and ${high} high-severity problems. This needs real work before it's trustworthy.`;
    else summary = `Failing. ${crit} critical and ${high} high-severity findings. Right now this is not safe to put in front of users or clients.`;

    return {
        target: {website: opts.website, repo: opts.repo},
        generatedAt: new Date().toISOString(),
        overallScore: overall,
        grade: gradeFor(overall),
        summary,
        sections,
    };
}
