export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  readTime: string;
  date: string;
  featured?: boolean;
  heroImage?: string;
  author?: string;
  authorRole?: string;
  authorAvatar?: string;
  tags?: string[];
  status?: 'draft' | 'published';
  updatedAt?: string;
  sections?: BlogSection[];
}

export interface BlogSection {
  title: string;
  body: string;
  image?: string;
  caption?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'designing-for-scale',
    title: 'Designing for Scale: What Growing Teams Miss',
    tag: 'Product Strategy',
    readTime: '6 min read',
    date: '2026-05-28',
    featured: true,
    excerpt: 'Practical patterns for avoiding rework when your product starts moving from MVP to growth stage.',
    content: `When you're shipping fast at the MVP stage, design decisions often prioritize speed over structure. 
    
This works beautifully until it doesn't.

We've seen countless teams hit a wall around 50–100k users. The patterns that got them there suddenly become bottlenecks. Features interact in ways no one predicted. Performance degrades. User friction compounds.

The difference between teams that scale smoothly and those that stall comes down to a few core principles:

**1. Async clarity beats sync perfection**
Rather than endless alignment meetings, document decisions clearly and let teams move in parallel. This requires discipline, but it's the only way to maintain velocity at scale.

**2. Systems before features**
Before you add post-notification aggregation or advanced filtering, get your core data model and API response patterns right. One small mistake here costs you months of rework later.

**3. Friction surfaces early**
The best teams instrument their products heavily from day one. Not for vanity metrics—for real friction points. Where do users get stuck? Where do they drop off? What paths are slow?

**4. Progressive enhancement over rewrites**
Fresh starts feel good but waste months. Instead, incrementally upgrade your systems. Keep shipping features while you strengthen the foundation.

Scale is a design problem, not just an engineering one. Get it right early and your growth compounds. Miss it and you spend the next year rebuilding.`
  },
  {
    id: '2',
    slug: 'scope-mvp-delivery',
    title: 'How to Scope an MVP Without Slowing Delivery',
    tag: 'Delivery',
    readTime: '5 min read',
    date: '2026-05-21',
    excerpt: 'A lightweight framework we use to protect budget while still delivering measurable user value.',
    content: `Scope creep kills MVPs. But too little scope leaves you with a toy instead of a testable product.

We've found a simple framework that balances both:

**The Must/Should/Could model**
- Must: Core value prop that users would pay for
- Should: Features that make the experience feel complete
- Could: Nice-to-haves that don't block launch

Most teams get this backwards. They build everything and ship late. Instead, ship Must + best Should features, then let real usage guide what's next.

**Time-box by layer**
- Backend: 2 weeks max
- Frontend: 2 weeks max
- Polish + testing: 1 week

This forces trade-offs. It prevents perfectionism. And it keeps morale high because you ship something real within a month.

**Measure from day one**
Don't wait for "launch" to start collecting data. Instrument your MVP to understand what users actually do, not what you assumed they'd do.

The best MVPs aren't minimal—they're focused. Every feature earns its place by solving a core user problem. Shipping that fast is possible. It just requires discipline.`
  },
  {
    id: '3',
    slug: 'refactor-vs-rebuild',
    title: 'When to Refactor vs When to Rebuild',
    tag: 'Engineering',
    readTime: '7 min read',
    date: '2026-05-14',
    excerpt: 'Signals that indicate whether incremental modernization or a full reset is the better business move.',
    content: `The refactor-or-rebuild decision has killed more engineering momentum than almost any other choice.

Most teams default to "we should refactor." It feels safer. But sometimes rebuilding is faster, cheaper, and less risky.

**Refactor if:**
- Your core architecture is sound but implementation is messy
- You have strong test coverage to work against
- The team knows why the current code is structured that way
- Most of your system can stay, just parts need updating
- You have 2–4 weeks to complete it

**Rebuild if:**
- Your architecture has fundamental flaws (wrong database pattern, bad abstractions)
- You have almost no tests and can't safely refactor
- Most of the code needs changing (60%+)
- New team members struggle to understand basic patterns
- Performance is limited by architectural choices, not implementation
- You can ship a limited version of the new system in 4–6 weeks

**The sneaky middle ground:**
Parallel building. Keep the old system alive while you build the new one. Gradually route traffic to the new version. This lowers risk dramatically and gives you an escape hatch if problems emerge.

The worst choice? Trying to refactor something that needs rebuilding. You get all the pain of a rebuild stretched over 6 months with none of the benefits.

Be honest about your architecture. If it's fundamentally broken, rebuilding will be faster than pretending otherwise.`
  },
  {
    id: '4',
    slug: 'internal-tools-adoption',
    title: 'Building Internal Tools That Teams Actually Adopt',
    tag: 'Operations',
    readTime: '4 min read',
    date: '2026-05-07',
    excerpt: 'Why workflows, not features, determine success for internal platforms and operational dashboards.',
    content: `You ship an internal tool. The team doesn't use it. Classic story.

The problem isn't usually the tool. It's that you optimized for features instead of workflows.

**Features vs workflows:**
A feature is "export to CSV." A workflow is "I need my weekly report in my inbox every Monday by 9am."

Build workflows and internal adoption skyrockets. Build features and your tool sits unused.

**Three workflow principles:**

1. **Eliminate a daily pain point**
Interview your team. Find the task they do repeatedly that sucks. Make that one task 80% faster. Ignore everything else.

2. **Move to where they already work**
If your team lives in Slack, put what they need there. If they're in their email every morning, send summaries there. Don't ask them to adopt a new app.

3. **Reduce cognitive load**
Every click, every decision point, every field makes adoption harder. Ruthlessly eliminate options. One well-designed workflow beats ten features.

**The adoption metric:**
DAU / Total Team = Adoption Rate. Aim for 80%+ on your friction-reducing workflows.

If you're below 50%, you didn't solve a real workflow problem. Talk to your team and reframe it.

Most "failed" internal tools just had the wrong value prop. Fix that and adoption follows.`
  },
  {
    id: '5',
    slug: 'performance-budgets',
    title: 'Performance Budgets for Business Websites',
    tag: 'Web Performance',
    readTime: '5 min read',
    date: '2026-04-30',
    excerpt: 'A simple way to set measurable speed goals that improve SEO, conversion, and user satisfaction.',
    content: `"Our site should be fast" isn't a strategy.

A performance budget is. It's a constraint on your codebase size, image sizes, and request counts that keeps your site performant as it grows.

**How to set one:**
1. Pick your target device (mid-range Android phone over 4G is a good baseline)
2. Aim for 3-second Time to Interactive (TTI)
3. Work backwards: what total JavaScript, CSS, and image budget supports that?
4. Build that budget into your CI/CD. Reject PRs that exceed it.

**A realistic example:**
- JavaScript: 150KB (gzipped)
- CSS: 30KB (gzipped)
- Images: 200KB per page (optimized)
- Fonts: 40KB (2 fonts max, optimized)

That gets you to ~3 seconds on 4G.

**Why this matters for SEO:**
Google now ranks faster sites higher. Page Speed is a ranking factor. A 1-second improvement can lift your organic traffic 7–10%.

**And revenue:**
Every 100ms improvement correlates with 1% conversion lift on e-commerce. For a $1M/month site, that's $10k/month.

Performance isn't a feature to add later. It's a structural choice you make from day one.

Set the budget. Commit to it. Watch your users (and your bottom line) thank you.`
  },
  {
    id: '6',
    slug: 'shipping-ux-revisions',
    title: 'Shipping Better UX with Fewer Revisions',
    tag: 'UX',
    readTime: '6 min read',
    date: '2026-04-23',
    excerpt: 'How tighter discovery and clearer feedback loops reduce redesign cycles and accelerate launch.',
    content: `The most expensive design work is redoing it.

We shipped a redesign recently that required exactly zero revisions. Not because we got it right the first time—but because we structured the process to make revisions unnecessary.

**Three things changed:**

1. **Discovery interviews before design**
We sat with 8 users and watched them use the old flow. We asked "what's confusing?" and "where do you get stuck?" This gave us specific problems to solve, not just aesthetic opinions.

2. **Design in the browser, not in Figma**
High-fidelity mockups look good but don't feel like the real interface. We built rough prototypes in React. Real scrolling. Real interactions. This caught 80% of problems that would have emerged in dev.

3. **Review with actual users before dev started**
Not stakeholder reviews. Not design team reviews. Real users. "Here's your flow—try it and tell me what's confusing."

**The result:**
We eliminated the "dev finishes, stakeholders hate it, redesign begins" cycle. Instead, we shipped and hit our timeline exactly.

**Why this works:**
Because real feedback is always more useful than expert opinion. And catching problems during design costs 10x less than catching them during dev.

Your instinct is probably right. But your users' needs are always righter. Do discovery. Build in the browser. Test with real people.

Then ship with confidence.`
  },
  {
    id: '7',
    slug: 'api-design-mistakes',
    title: 'Five API Design Mistakes We Fix Constantly',
    tag: 'Backend',
    readTime: '5 min read',
    date: '2026-04-16',
    excerpt: 'Common patterns that create years of maintainability debt.',
    content: `Bad API design compounds. A wrong decision in month one takes six months to fix.

We see the same mistakes repeatedly:

**1. Versioning too late**
You launch v1. Six months later you need breaking changes. Now you're maintaining v1 and v2 forever. Instead, assume you'll need v2. Design for it from day one.

**2. Inconsistent response shapes**
Users get inconsistent, items get an array, pagination is sometimes missing. Frontend code becomes defensive. Defensive code is fragile and buggy. Consistency is a feature.

**3. Timestamps without timezones**
"2026-04-16 14:30:00" — in what timezone? Always use ISO 8601 with timezone: "2026-04-16T14:30:00Z"

**4. Pagination without sort order**
You return 100 items, but not deterministically. Second request might return different items. Your frontend can't build reliable infinite scroll. Always specify sort order.

**5. Assuming status codes are enough**
HTTP 400 tells you nothing. "Invalid email" or "Username taken"? Add a specific error code. Make developer lives better.

**The pattern:**
Good API design thinks about the developer using it, not just the data flowing through it. Small choices compound into either a joy or a nightmare.

Get these right and your API is still usable years later. Get them wrong and you're rebuilding it every 18 months.`
  },
  {
    id: '8',
    slug: 'testing-strategy',
    title: 'A Testing Strategy That Actually Ships Features',
    tag: 'Quality',
    readTime: '6 min read',
    date: '2026-04-09',
    excerpt: 'How to test enough to avoid disasters without slowing down your ship cycle.',
    content: `Your test coverage is 85% and you shipped a bug that should have been caught by tests.

This happens constantly because coverage percentage is a vanity metric. It doesn't measure what matters: are your tests catching real bugs?

**A better strategy:**

1. **Test user journeys, not code paths**
"User creates account, sets up profile, makes first payment" — test that flow end-to-end. One test catches more bugs than 50 unit tests.

2. **Treat UI tests as expensive insurance**
They're slow. They're brittle. Use them for critical flows only. "User can log in" and "Payment completes" get tested. Edge cases get manual testing before shipping.

3. **Unit test domain logic, not components**
Your React component probably doesn't need 20 unit tests. Your business logic (discount calculation, permission checking) absolutely does.

4. **Ship fast, monitor closely**
Some bugs only manifest with real traffic patterns. Use feature flags. Ship to 5% of users first. Monitor error rates. Ship more if it's stable.

**The math:**
100% coverage of everything takes 3x longer to ship. 60% coverage of critical paths ships 3x faster and catches 90% of production bugs.

Quality isn't about perfect tests. It's about strategic tests that protect what matters.

Test strategically. Ship fast. Monitor closely. Iterate.`
  },
  {
    id: '9',
    slug: 'technical-debt-payoff',
    title: 'Technical Debt: When to Pay It Off vs When to Ignore It',
    tag: 'Engineering',
    readTime: '5 min read',
    date: '2026-04-02',
    excerpt: 'A framework for deciding which technical debt actually matters.',
    content: `"We need to refactor this" is the most common statement that goes nowhere.

Because most technical debt doesn't actually matter. It feels like it matters. But it doesn't slow down shipping.

**Debt that matters:**
- Slows down new feature velocity (takes 2x longer to build)
- Creates production incidents or data integrity risks
- Makes hiring hard (new developers can't understand the code)
- Blocks a specific roadmap initiative

**Debt that doesn't:**
- Is messy but fast
- Is in code that rarely changes
- Is understood only by one person (hire them well and it's fine)
- Lives in non-critical systems

**The test:**
How much faster would we ship if we fixed it? If the answer is "2–3x faster" or "we'd unblock our roadmap," fix it. If the answer is "the code would be cleaner," skip it.

**When to pay:**
Q: "Are we blocked by this debt?"
If yes — pay it immediately. Everything else waits.

If no — ship features and keep a log of what slows you down. When the answer becomes yes, pay it then.

Most of our engineering time goes to "fixing technical debt" while features back up. This is backwards.

Ship features. Track friction. Pay debt strategically.`
  },
  {
    id: '10',
    slug: 'hiring-engineers',
    title: 'Hiring Engineers: What Actually Predicts Success',
    tag: 'People',
    readTime: '7 min read',
    date: '2026-03-26',
    excerpt: 'Interview techniques that work, and the ones that waste your time.',
    content: `Standard interview questions are useless.

"What's your greatest weakness?" tells you nothing. "Reverse a linked list on a whiteboard" tells you nothing about whether someone can build your product.

**What actually predicts success:**

1. **Can they learn your stack fast?**
Not: "Do you know React?" (Anyone can learn React)
Ask: "What's a recent technology you learned well?" Listen for intellectual curiosity and learning speed.

2. **Do they communicate clearly?**
Have them explain a technical concept to you like you're not a programmer. Confused explanations reveal confused thinking.

3. **Have they shipped something?**
A side project. An open source contribution. Anything. Shipping teaches lessons that resumes don't capture.

4. **Can they debug?**
Give them a broken piece of code and watch them debug it. Not for speed, but for methodology. Do they form hypotheses? Test them systematically? Or do they flail?

5. **Would you want to sit next to them for 8 hours?**
People work in teams. Working with someone brilliant but difficult costs more than it's worth.

**Red flags:**
- Can't explain their previous work clearly
- Defensive about feedback
- Focuses only on technologies, not problems solved
- Can't debug systematically

**Green flags:**
- Asks thoughtful questions about your product
- Talks about learning from mistakes
- Can explain complex things simply
- Listens more than talks

Interview for learning ability, communication, shipping experience, and fit. Everything else is optimizable.`
  },
  {
    id: '11',
    slug: 'product-analytics-setup',
    title: 'Setting Up Product Analytics That Actually Drive Decisions',
    tag: 'Product',
    readTime: '6 min read',
    date: '2026-03-19',
    excerpt: 'How to instrument your product so data informs every decision.',
    content: `You have Google Analytics. You have 10k sessions/month. And you have no idea what your users actually do.

Most analytics setups capture vanity metrics: pageviews, session duration, bounce rate. These don't tell you anything useful.

**Real analytics answers these questions:**
- Which features do users adopt?
- Where do users get stuck?
- What's the conversion flow for your core action?
- Which user segments are most valuable?
- How does product change impact revenue?

**How to set it up:**

1. **Define core events**
Not pageviews. User actions: "started trial," "uploaded file," "invited teammate," "upgraded to paid."

2. **Tag every state change**
When a user does something that matters, log it with context. Not just "button clicked" but "upgrade button clicked from pricing page at $29/mo tier."

3. **Set up conversion funnels**
"Trial signup → first feature use → upgrade" — visualize this. Where do users drop?

4. **Create a metrics dashboard**
Updated daily. What's our key metric (usually revenue per user)? How does it trend?

**Sample dashboard:**
- Signups/day
- Trial-to-paid conversion rate
- Features used in first 7 days
- Revenue per user cohort
- Churn rate by feature usage

**The discipline:**
Before shipping anything, predict the impact on these metrics. After shipping, measure it. Did you predict correctly? Why or why not?

This closes the feedback loop. Decision → data → learning → better decision.

Most analytics is theater. Real analytics drives choices.`
  },
  {
    id: '12',
    slug: 'customer-support-structure',
    title: 'Customer Support Strategy That Scales',
    tag: 'Operations',
    readTime: '5 min read',
    date: '2026-03-12',
    excerpt: 'Building support processes that grow with your company.',
    content: `Support at 10 customers is you answering emails. Support at 1000 customers is chaos without structure.

We've scaled support from founder-managed to a team. Here's what worked:

**Stage 1: Founder does support (0–100 customers)**
You learn what confuses people. This is invaluable. Don't outsource it yet.

**Stage 2: Hire first support person (100–500 customers)**
Document everything you've learned. Create runbooks for common issues. Hire someone who is naturally helpful, not just efficient.

**Stage 3: Build self-service (500+ customers)**
Most support requests are predictable. Build an FAQ. Record videos. Let users answer their own questions at 11pm when they get stuck.

**Stage 4: Create tiers (1000+ customers)**
Not everyone needs 1-hour response times. Tier by value: premium customers get fast support, free tier reads the FAQ first.

**What doesn't scale:**
- Email only (add chat, maybe even phone for enterprise)
- One person answering everything (specialize: billing, technical, onboarding)
- No documentation (your support team becomes the documentation)

**The metric that matters:**
Time to resolution, not response time. A thoughtful 4-hour response that solves the problem beats a 15-minute "I don't know, email support@..."

Good support is a product feature. It's how users experience your values.`
  },
  {
    id: '13',
    slug: 'remote-team-culture',
    title: 'Building Real Culture in Remote Teams',
    tag: 'People',
    readTime: '6 min read',
    date: '2026-03-05',
    excerpt: 'How to create belonging when everyone works from home.',
    content: `Async doesn't mean no culture. It means different culture.

Video calls and Slack messages can feel disconnected. But intentional practices create genuine connection:

**1. Document everything, over-communicate**
Lack of hallway conversations means people don't know what's happening. Write decision docs. Share context liberally. Over-index on communication.

**2. Schedule intentional connection time**
Not "stand up meeting." That's work. Intentional: "Friday 3pm PT office hours" where anyone can join and hang out. Some people do, some don't. Zero pressure.

**3. Give people autonomy and trust fully**
If you're tracking hours or who's online when, your team feels it. And they'll leave. Async teams require real trust. If you can't give it, don't hire remote.

**4. Hire self-motivated people**
Not everyone works well remote. Some people need a structured environment. Hire people who are motivated by the work itself, not by being watched.

**5. Higher touch onboarding**
New remote hires need more structure. Pair with someone. Regular 1:1s. Deliberate integration into the team.

**6. In-person occasionally**
If you can, get together 2–3x per year. Not for work meetings (do that remotely). For building real relationships.

**The truth:**
Remote teams that feel disconnected chose disconnection. They didn't decide what culture meant, so it defaulted to none.

Deliberate culture scales better remote than in-office. You're forced to be intentional.`
  },
  {
    id: '14',
    slug: 'pricing-strategy',
    title: 'Pricing Strategy That Aligns With Your Customers',
    tag: 'Business',
    readTime: '6 min read',
    date: '2026-02-26',
    excerpt: 'How to price your product so customers feel good and you can hire great people.',
    content: `Pricing is psychology, not math.

Most teams price by:
- Competitor pricing (race to the bottom)
- Cost + margin (ignores value)
- "What people will pay" (leaves money on table)

Better approach: value-based pricing.

**What does your product save or earn your customer?**
Monthly: $500 in time savings? Price at $100/mo.
Annually: $50k in new revenue? Price at $8k/yr.

**Tie it to outcomes:**
Customers care about what they get, not what you built. "Saves 5 hours/week" is $100/mo. "Generates 10 qualified leads/month" is worth $2k.

**Test and iterate:**
- Version A: $50/mo → 5% conversion
- Version B: $100/mo → 4% conversion
- Version B makes more revenue

Higher prices often *increase* conversion because customers believe higher = better.

**Segment by use case:**
Small startup needs basic features at $50/mo. Enterprise needs compliance + support at $2k/mo.

Let them self-select into the right tier by use case, not arbitrary feature restrictions.

**The surprising outcome:**
Higher prices mean:
1. Better customers (they're invested)
2. Better support (you can afford it)
3. Better product (happy customers give feedback)
4. Better team (you can hire A-players)

Cheap pricing attracts price-sensitive customers who churn fast and demand lots of support.

Premium pricing attracts committed customers who stick around.

**One rule:** If everyone is buying your product, you're priced too low.`
  },
  {
    id: '15',
    slug: 'data-privacy-compliance',
    title: 'Data Privacy and Compliance Without Losing Velocity',
    tag: 'Security',
    readTime: '5 min read',
    date: '2026-02-19',
    excerpt: 'Building security and compliance into your product design, not bolted on.',
    content: `Privacy and compliance feel like they slow down shipping. They do, if you bolt them on at the end.

Built in from the start? They're just normal engineering.

**GDPR and privacy start with architecture:**

1. **Collect only what you need**
If you don't need it, don't collect it. Less data = fewer compliance obligations = simpler systems.

2. **Data minimization by default**
10 fields or 100? Collect 10. Add more only when users ask for more value.

3. **User control built in**
Export my data. Delete my data. Not a feature request. A baseline expectation. Let users own their data.

**Compliance early:**

- Use platform services that handle PCI/HIPAA/SOC2 (Stripe, AWS, etc.)
- Don't build what others do better
- Audit trails for everything (who changed what, when)
- Encryption in transit (TLS) and at rest (database encryption)

**The surprising part:**
Security doesn't slow down shipping if built in. It's the refitting that kills velocity.

Startup shipping fast? That's great. But if you collected data without consent or stored passwords in plaintext, you're shipping toward a deadline: when regulators show up.

Build for privacy and compliance from day one. Your future self will thank you. And your customers will trust you more.`
  },
  {
    id: '16',
    slug: 'team-communication-async',
    title: `Async Communication: Different Doesn't Mean Slower`,
    tag: 'Process',
    readTime: '5 min read',
    date: '2026-02-12',
    excerpt: 'How async teams ship faster when done right.',
    content: `Synchronous communication feels productive. Everyone nods. You feel aligned.

But 15 people in a meeting for 30 minutes is 7.5 hours of humanity spent for 30 minutes of wall time.

Async communication done right:
- Gets the same alignment
- Creates a written record
- Lets people think before responding
- Scales to larger teams

**How to do it:**

1. **Propose, don't ask**
Not: "What should we do about the API?"
Say: "I propose we upgrade the API like this [details]. Comments?"

This frames the discussion. People respond with specific feedback, not general opinions.

2. **Decisions in writing**
"We're upgrading the API next quarter because [reasons]. Expected impact: [metrics]. Questions?"

This creates a decision record. New people onboard reading the why, not guessing.

3. **Response expectations clear**
"Responses due by Thursday 3pm PT. Will move forward if no objections."

This prevents infinite discussion. People prioritize threads that need their input.

4. **Use channels and threads**
Slack's thread feature is underutilized. One conversation per thread. Easy to follow. Easy to reference later.

**What doesn't work async:**
- Brainstorming (do this live, briefly)
- Conflict resolution (do this 1:1 or small group)
- Whiteboard/planning sessions (too collaborative for async)

Async for decisions and documentation. Synchronous for creativity and conflict.

Most teams flip it. They brainstorm in every meeting and make critical decisions in Slack.

Reverse it. Better outcomes, more time for actual work.`
  },
  {
    id: '17',
    slug: 'database-design-fundamentals',
    title: `Database Design: Foundations That Last`,
    tag: 'Engineering',
    readTime: '6 min read',
    date: '2026-02-05',
    excerpt: `How to design database schemas that don't become legacy nightmares.`,
    content: `Database design compounds like technical debt.

A poor schema decision in month one costs months to fix at scale.

**Principles that last:**

1. **Normalize for clarity, denormalize for performance**
Your schema tells a story. Each table should represent one thing. Related-order items go in one table, not scattered across five.

But denormalize when performance demands it. Store the customer name on the order for fast queries. Just do it intentionally, not accidentally.

2. **Immutable events over mutable state**
Don't just store "account balance = $1000." Also store "received $500, spent $200, received $300."

Immutable events let you recompute state, debug issues, and audit everything. Mutable state is brittle.

3. **Explicit nulls, not magic values**
Don't use 0 or empty string to mean "not set." Nullable columns are clearer.

But make nullability intentional. Can this field be NULL? If yes, why?

4. **Foreign keys and constraints**
Let the database enforce data integrity, not your application.

Lazy here and you get inconsistent data that breaks in production under weird circumstances.

5. **Soft deletes by date**
Don't delete data. Mark it as deleted. You'll need to examine it later.

But actually, usually you don't. Purge data after retention period. Data you hide forever is still data you maintain.

**Scaling considerations:**

- Can you shard this table later if needed?
- Can you partition by time (useful for old data)?
- Are your indexes actually used?

Think about these early, not when a table has 500M rows.

**The meta principle:**
A great schema is boring. Tables map clearly to concepts. Queries are easy to write. New engineers understand it immediately.

If your database feels complex, talk to customers more. You're probably storing the wrong things.

Simplify. Normalize. Constrain. Audit.

Good schemas last years. Bad ones last quarters before rebuilding.`
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find(post => post.featured);
}

export function getLatestPosts(limit: number = 6): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tag === tag);
}

export function getAllTags(): string[] {
  const tags = new Set(blogPosts.map(post => post.tag));
  return Array.from(tags).sort();
}


