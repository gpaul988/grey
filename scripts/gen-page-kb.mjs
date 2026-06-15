import fs from 'fs';

const services = `IoT-Development Javascript Laravel-Development MVP Mobile-Application-Development Net-Development Nextjs-Development Nodejs-Development PHP-Development Python-Development React-Native-Development Reactjs-Development Ruby-on-Rails Social-Networking Software-Development Typescript Vuejs-Development Web-Application Web-Design Web-Development ai-development-services android-development angular-development app-store-optimization backend-development blockchain-development branding cms-development crm-development cross-platform-development digital-marketing discovery-phase erp-development flutter-development frontend-development hybrid-app-development ios-development seo ui-ux-design unity-development`.split(/\s+/);

const industries = `automation biotech e-commerce-development education fintech healthcare hr-tech logistics music oil-and-gas ondemand real-estate retail saas travel-and-hospitality`.split(/\s+/);

const title = (s) => s.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase());

const svcDocs = services.map(slug => {
  const name = title(slug);
  return {
    title: `${name} Service`,
    url: `/services/${slug}`,
    body: `Grey InfoTech offers ${name} as part of our software, web, mobile, AI and digital services. We deliver ${name.toLowerCase()} end-to-end — from discovery and design through engineering, launch and ongoing support — for startups and enterprises. Learn more at /services/${slug} or request a tailored quote at /quote-request.`,
    tags: ['service', slug.toLowerCase(), ...name.toLowerCase().split(' ')],
  };
});

const indDocs = industries.map(slug => {
  const name = title(slug);
  return {
    title: `${name} Industry Solutions`,
    url: `/industries/${slug}`,
    body: `Grey InfoTech builds tailored digital products for the ${name} industry — web, mobile, AI and platform solutions aligned to ${name.toLowerCase()} workflows, compliance and growth. See /industries/${slug} for examples and capabilities.`,
    tags: ['industry', slug.toLowerCase(), ...name.toLowerCase().split(' ')],
  };
});

const pages = [
  {title:'Our Approach',url:'/Our-Approach',body:'Grey InfoTech follows a clear delivery approach: discovery, design, build, launch and grow. We scope lean, validate with users, and iterate so projects ship on time and on budget.',tags:['approach','process','how you work','methodology']},
  {title:'Startups',url:'/Startups',body:'We partner with startups to go from idea to MVP and beyond — product strategy, lean scope, fast iteration and a roadmap to raise and scale. See /Startups.',tags:['startup','founder','mvp','idea','funding']},
  {title:'Portfolio',url:'/portfolio',body:'Browse Grey InfoTech projects and outcomes across web, mobile and enterprise platforms in our portfolio at /portfolio.',tags:['portfolio','work','projects','examples']},
  {title:'Blog',url:'/blog',body:'The Grey InfoTech blog shares insights on web/mobile development, AI, design and digital marketing. Read at /blog.',tags:['blog','articles','insights','news']},
  {title:'Careers',url:'/careers',body:'Join Grey InfoTech — open roles across engineering, design and marketing. Apply at /careers.',tags:['careers','jobs','hiring','apply','vacancy']},
  {title:'Partners',url:'/partners',body:'Grey InfoTech welcomes partnerships and integrations. Explore partnership paths and apply (we collect your company, contact, partnership type, website, CAC/registration number and message) at /partners.',tags:['partner','partnership','integration','reseller','collaborate','cac']},
  {title:'Quote Request & AI Estimator',url:'/quote-request',body:'Get a tailored estimate fast: request a quote or use our AI Project Estimator at /quote-request. Pricing depends on scope, complexity and timeline — we respond with a fixed-price estimate, often within 24 hours.',tags:['quote','estimate','pricing','cost','how much','budget','ai estimator']},
  {title:'Contact',url:'/contact',body:'Reach Grey InfoTech via /contact, email hello@greyinfotech.com.ng, or WhatsApp +234-802-809-5571. Based in Port Harcourt, Nigeria, serving clients worldwide.',tags:['contact','email','phone','whatsapp','call','reach']},
  {title:'Support & Tickets',url:'/support',body:'Existing clients can open a support ticket at /support or /open-ticket and our team will respond.',tags:['support','help','ticket','issue']},
  {title:'Online Store',url:'/store',body:'Browse and buy products and digital services in the Grey InfoTech store — cart, wishlist, compare and order tracking at /store.',tags:['store','shop','buy','cart','order','product']},
  {title:'Company',url:'/company',body:'Grey InfoTech Limited is a web, mobile, AI and digital marketing agency founded in 2017 in Port Harcourt, Nigeria. We build scalable, user-centered products for startups and enterprises.',tags:['company','about','who','founded','history']},
];

const all = [...pages, ...svcDocs, ...indDocs];

const header = `/**
 * Curated page-content knowledge for the Grey AI assistant.
 *
 * Auto-generated from the live route map (every /services/* and /industries/*
 * slug plus key marketing pages) so the assistant is aware of every page on the
 * site and can cite the correct URL. Regenerate with scripts/gen-page-kb.mjs
 * when routes change.
 */
import type {KbDoc} from './aiKnowledge';

export const PAGE_KB: KbDoc[] = ${JSON.stringify(all, null, 4)};
`;

fs.writeFileSync('lib/aiPageContent.ts', header);
console.log('Wrote lib/aiPageContent.ts with', all.length, 'docs');
