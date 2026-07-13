import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const QATesting = () => (
    <ServicePageTemplate
        title={<>QA &amp; Software<br className="lg:block md:block hidden" />Testing</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/ecommerce-web-design.jpg"
        topImages={['/assets/services/product-design.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Comprehensive quality assurance—manual, automated and performance testing—that catches defects before your users do and ships confidence with every release."
        eyebrow="Quality built into every release cycle"
        introHeading={<>Ship With<br className="lg:block md:block hidden" />Confidence</>}
        introBody={[
            <>Quality assurance is not a gate at the end of development—it is a discipline woven through
            the entire engineering process. At Grey InfoTech our QA engineers embed alongside your development
            teams, writing tests in parallel with code, automating regression suites and defining acceptance
            criteria before features are built. This shift-left approach means defects are caught when they
            are cheapest to fix and releases go out with documented evidence of their quality.</>,
            <>We combine manual exploratory testing with robust automated suites, covering functional,
            regression, integration, performance and security testing. Our test automation engineers build
            maintainable frameworks rather than brittle scripts, and we measure the quality of the test
            suite itself—coverage, flakiness rate and time-to-feedback. Whether you need a dedicated QA
            team, automation uplift or a one-time audit before a major launch, we deliver measurable
            improvement in software quality.</>,
        ]}
        solutionsHeading={<>QA &amp; Testing<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From manual exploratory testing to full CI-integrated automation frameworks, Grey InfoTech provides the quality assurance capability your product deserves."
        solutions={[
            {
                id: '01', title: 'Manual & Exploratory Testing', target: 'MT',
                tags: ['Functional', 'Regression', 'Exploratory', 'UAT'],
                body: <>Our QA engineers conduct structured manual testing for functional correctness, edge cases
                and user experience. We run exploratory sessions to uncover issues automated tests miss, manage
                detailed test cases in tools like TestRail or Zephyr, and produce comprehensive defect reports
                with reproduction steps, severity ratings and screenshots or screen recordings.</>,
            },
            {
                id: '02', title: 'Test Automation', target: 'TA',
                tags: ['Playwright', 'Cypress', 'Selenium', 'Appium', 'Jest'],
                body: <>We build automation frameworks that run in your CI pipeline and give fast, reliable
                feedback on every pull request. Our front-end automation uses Playwright or Cypress for
                end-to-end tests; mobile automation uses Appium or Detox. We design page-object patterns,
                data-driven test structures and retry logic so suites stay maintainable as your product evolves.</>,
            },
            {
                id: '03', title: 'API & Integration Testing', target: 'AT',
                tags: ['Postman', 'REST Assured', 'Pact', 'Contract Testing'],
                body: <>APIs are the backbone of modern applications and a prime source of defects. We build
                API test suites covering happy paths, error handling, authentication, rate limiting and schema
                validation. For microservices we implement contract testing with Pact to catch integration
                breaks between services before they reach a shared environment.</>,
            },
            {
                id: '04', title: 'Performance & Load Testing', target: 'PL',
                tags: ['k6', 'Gatling', 'JMeter', 'Locust'],
                body: <>Performance problems under load destroy user trust. We design load test scenarios
                that simulate realistic traffic patterns, identify throughput ceilings, measure latency
                percentiles and expose memory leaks or connection pool exhaustion. Using k6 or Gatling with
                cloud execution, we run tests at scale and provide actionable optimisation recommendations
                with before/after benchmarks.</>,
            },
            {
                id: '05', title: 'Mobile App Testing', target: 'MB',
                tags: ['iOS', 'Android', 'Device Farm', 'Appium', 'XCUITest'],
                body: <>Mobile testing is uniquely complex—device fragmentation, OS versions, gesture
                interactions and network conditions all affect quality. We test across real devices using
                cloud device farms (AWS Device Farm, BrowserStack), write Appium and XCUITest suites for
                automated regression, and conduct manual testing across the device matrix most representative
                of your user base.</>,
            },
            {
                id: '06', title: 'Security & Accessibility Testing', target: 'SA',
                tags: ['OWASP', 'WCAG 2.1', 'Axe', 'ZAP'],
                body: <>Quality extends beyond functional correctness. We integrate OWASP ZAP into CI for
                automated security scanning, conduct manual OWASP Top 10 reviews and run accessibility
                audits against WCAG 2.1 AA standards using Axe and manual assistive-technology testing.
                Products that pass our quality bar are not just bug-free—they are secure and inclusive.</>,
            },
        ]}
        ctaHeading={<>Quality is not<br className="lg:block md:block hidden" />optional</>}
        ctaBody="Every bug that reaches production costs 10× more to fix than one caught in development. Grey InfoTech makes quality a competitive advantage, not an afterthought."
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Enterprise Testing Automation',
                description: 'Build comprehensive test automation frameworks covering UI, API and database testing to accelerate release cycles and improve software quality.'
            },
            {
                id: 'vs2',
                title: 'Performance & Load Testing',
                description: 'Conduct load, stress and scalability testing to ensure applications perform under real-world traffic and identify optimization opportunities.'
            },
            {
                id: 'vs3',
                title: 'Security & Compliance Testing',
                description: 'Execute penetration testing, security code reviews and compliance validation against industry standards like OWASP, SOC2 and PCI-DSS.'
            }
        ]}/>
);

export default QATesting;

