/**
 * Generates App Router page.tsx wrappers for every screen.
 * Each wrapper imports the corresponding screen (client component) and
 * attaches per-route metadata via buildMetadata() from lib/seo.ts.
 *
 * Idempotent: overwrites generated wrappers only. Never touches screens/.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SCREENS = path.join(ROOT, 'screens');
const APP = path.join(ROOT, 'app');

// Map a screen file (relative to screens/, no ext) -> route segment path under app/.
// Screen file names keep their original casing to match imports; route paths match original URLs.
function screenToRoute(rel) {
    // rel uses forward slashes, no extension. e.g. "services/seo", "Home", "store/account/login"
    if (rel === 'Home') return ''; // root handled separately
    return rel;
}

// Build a clean import path alias for a screen file.
function importAlias(rel) {
    return `@/screens/${rel}`;
}

// Walk screens dir recursively.
function walk(dir, base = '') {
    const out = [];
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, entry.name);
        const rel = base ? `${base}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
            out.push(...walk(full, rel));
        } else if (entry.name.endsWith('.tsx')) {
            out.push(rel.replace(/\.tsx$/, ''));
        }
    }
    return out;
}

const all = walk(SCREENS);

// Files to skip (dead/neutralized, handled elsewhere, or not real routes)
const SKIP = new Set(['empty', 'feeling', 'Form']);

// Routes that map to a SEO registry path differing from the file path.
// The SEO registry keys are by URL path (with leading slash).
function seoPathFor(rel) {
    // dynamic segments handled separately
    return '/' + rel;
}

const dynamicRoutes = []; // {rel, paramName}
const staticRoutes = [];

for (const rel of all) {
    if (SKIP.has(rel)) continue;
    if (rel === 'Home') {
        staticRoutes.push({rel, route: '', seo: '/'});
        continue;
    }
    const isDynamic = /\[([^\]]+)\]/.test(rel);
    if (isDynamic) {
        const m = rel.match(/\[([^\]]+)\]/);
        dynamicRoutes.push({rel, param: m[1]});
    } else {
        // "index" screens map to their parent directory route.
        // e.g. store/index -> /store, store/account/index -> /store/account
        const route = rel.replace(/\/index$/, '');
        staticRoutes.push({rel, route, seo: seoPathFor(route)});
    }
}

function writeFile(p, content) {
    fs.mkdirSync(path.dirname(p), {recursive: true});
    fs.writeFileSync(p, content);
}

// ---- Static route wrappers ----
let count = 0;
for (const r of staticRoutes) {
    const outDir = r.route === '' ? APP : path.join(APP, r.route);
    const outFile = path.join(outDir, 'page.tsx');
    const importName = 'Screen';
    const alias = r.rel === 'Home' ? '@/screens/Home' : importAlias(r.rel);
    const content = `import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import ${importName} from '${alias}';

export const metadata: Metadata = buildMetadata('${r.seo}');

export default function Page() {
    return <${importName}/>;
}
`;
    writeFile(outFile, content);
    count++;
}

// ---- Dynamic route wrappers ----
// blog/[slug], case-studies/[slug], store/products/[slug], store/orders/[ref]
const DYNAMIC_META = {
    'blog/[slug]': {
        param: 'slug',
        importName: 'BlogPostScreen',
        generate: `import {getBlogPostBySlug, blogPosts} from '@/data/blogPosts';
export function generateStaticParams() {
    return blogPosts.map((p) => ({slug: p.slug}));
}
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return buildMetadata('/blog');
    return buildMetadata('/blog/' + slug, {
        title: post.title + ' — Grey InfoTech Blog',
        description: post.excerpt || post.title,
        image: post.heroImage,
    });
}`,
    },
    'case-studies/[slug]': {
        param: 'slug',
        importName: 'CaseStudyScreen',
        generate: `const CASE_SLUGS = ['healthcare-platform-transformation','logistics-dashboard-optimization','fintech-product-launch','education-platform-expansion','enterprise-saas-rebrand'];
export function generateStaticParams() {
    return CASE_SLUGS.map((slug) => ({slug}));
}
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const title = slug.replace(/-/g, ' ').replace(/\\b\\w/g, (c) => c.toUpperCase());
    return buildMetadata('/case-studies/' + slug, {
        title: title + ' — Case Study | Grey InfoTech',
        description: 'How Grey InfoTech delivered measurable results: ' + title + '.',
    });
}`,
    },
    'store/products/[slug]': {
        param: 'slug',
        importName: 'ProductScreen',
        generate: `export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const title = slug.replace(/-/g, ' ').replace(/\\b\\w/g, (c) => c.toUpperCase());
    return buildMetadata('/store/products/' + slug, {
        title: title + ' — Store | Grey InfoTech',
        description: 'Buy ' + title + ' from the Grey InfoTech store.',
    });
}`,
    },
    'store/orders/[ref]': {
        param: 'ref',
        importName: 'OrderScreen',
        generate: `export async function generateMetadata({params}: {params: Promise<{ref: string}>}): Promise<Metadata> {
    const {ref} = await params;
    return buildMetadata('/store/orders', {
        title: 'Order ' + ref + ' — Grey InfoTech Store',
        description: 'View your order details and status.',
        noindex: true,
    });
}`,
    },
};

for (const d of dynamicRoutes) {
    const meta = DYNAMIC_META[d.rel];
    const outFile = path.join(APP, d.rel, 'page.tsx');
    const alias = importAlias(d.rel);
    if (!meta) {
        // fallback generic
        const content = `import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '${alias}';

export const metadata: Metadata = buildMetadata('/${d.rel.replace(/\/\[[^\]]+\]/, '')}');

export default function Page() {
    return <Screen/>;
}
`;
        writeFile(outFile, content);
        count++;
        continue;
    }
    const content = `import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import ${meta.importName} from '${alias}';

${meta.generate}

export default function Page() {
    return <${meta.importName}/>;
}
`;
    writeFile(outFile, content);
    count++;
}

console.log('Generated', count, 'app route wrappers.');
console.log('Static:', staticRoutes.length, 'Dynamic:', dynamicRoutes.length);
