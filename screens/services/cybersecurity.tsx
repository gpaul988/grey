import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Cybersecurity = () => (
    <ServicePageTemplate
        title={<>Cybersecurity<br className="lg:block md:block hidden" />Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/digital-optimisation.jpg"
        topImages={['/assets/services/services.jpg', '/assets/services/Research-strategy.jpg']}
        intro="Proactive security engineering, penetration testing and compliance programmes that protect your products, data and reputation before attackers find the gaps."
        eyebrow="Security engineered in, not bolted on"
        introHeading={<>Security Is<br className="lg:block md:block hidden" />An Engineering Problem</>}
        introBody={[
            <>Cyber threats are not abstract—they are persistent, sophisticated and targeted at businesses of
            every size. At Grey InfoTech we approach security as an engineering discipline, embedding controls
            into development workflows and infrastructure rather than layering on tools after the fact. Our
            security team combines offensive security expertise with defensive architecture knowledge, so we
            understand how attackers think and design systems that are genuinely difficult to compromise.</>,
            <>Our engagements produce measurable outcomes: a reduced attack surface, documented controls, trained
            developers, and the evidence packs needed to achieve certifications like ISO 27001, SOC 2 and PCI DSS.
            We also provide ongoing managed security services so your security posture improves continuously
            rather than degrading between annual assessments. Whether you need a one-time pen test or a
            comprehensive security programme, we deliver practical, prioritised recommendations your team
            can act on immediately.</>,
        ]}
        solutionsHeading={<>Cybersecurity<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From penetration testing to full security programmes, Grey InfoTech builds defences that hold under real-world attack conditions."
        solutions={[
            {
                id: '01', title: 'Penetration Testing', target: 'PT',
                tags: ['Web App', 'API', 'Mobile', 'Network', 'Red Team'],
                body: <>Our ethical hackers conduct thorough penetration tests across web applications, APIs,
                mobile apps, internal networks and cloud infrastructure. We use a combination of automated
                scanning and manual exploitation, producing detailed findings reports with CVSS scores, attack
                chains, proof-of-concept evidence and prioritised remediation steps your developers can act
                on immediately.</>,
            },
            {
                id: '02', title: 'Security Architecture Review', target: 'SA',
                tags: ['Threat Modelling', 'STRIDE', 'Zero Trust', 'Defence in Depth'],
                body: <>We review your system architecture through an attacker&apos;s lens—identifying trust boundary
                violations, privilege escalation paths, insecure data flows and misconfigured controls. We use
                STRIDE threat modelling to systematically identify threats and produce an architecture remediation
                roadmap aligned to your risk tolerance and engineering capacity.</>,
            },
            {
                id: '03', title: 'DevSecOps & Secure SDLC', target: 'DS',
                tags: ['SAST', 'DAST', 'SCA', 'Secret Detection'],
                body: <>We integrate security into your development pipeline so vulnerabilities are caught before
                they ship. Our SDLC tooling covers static analysis, dependency auditing, container scanning,
                secret detection and dynamic testing in staging. We also run developer security training
                sessions covering OWASP Top 10, secure coding patterns and security-focused code review.</>,
            },
            {
                id: '04', title: 'Cloud Security', target: 'CS',
                tags: ['AWS Security', 'GCP', 'Azure', 'CSPM', 'CWPP'],
                body: <>Cloud misconfigurations are the leading cause of breaches. We audit your cloud estate
                against CIS benchmarks, harden IAM policies, enable threat detection services, configure SIEM
                pipelines and implement preventive controls using policy-as-code. We also set up continuous
                cloud security posture management so regressions are caught automatically.</>,
            },
            {
                id: '05', title: 'Compliance & Certification', target: 'CC',
                tags: ['ISO 27001', 'SOC 2', 'PCI DSS', 'GDPR', 'NDPC'],
                body: <>Achieving and maintaining compliance requires rigorous process, documentation and
                evidence collection. We run gap assessments, design and implement the required controls,
                draft the necessary policies and procedures, and prepare the evidence packs your auditors need.
                We support ISO 27001, SOC 2 Type I and II, PCI DSS, GDPR and Nigeria Data Protection Act
                compliance programmes.</>,
            },
            {
                id: '06', title: 'Incident Response', target: 'IR',
                tags: ['DFIR', 'Forensics', 'Containment', 'Recovery'],
                body: <>When a breach occurs, response speed determines the blast radius. Our incident response
                retainer gives you access to a senior DFIR team within hours, covering containment, evidence
                preservation, root-cause analysis, stakeholder communication and technical recovery. Post-incident
                we produce a detailed report with timeline reconstruction and control improvements to prevent
                recurrence.</>,
            },
        ]}
        ctaHeading={<>Security that<br className="lg:block md:block hidden" />never sleeps</>}
        ctaBody="Every day without proper security is a day your business is exposed. Grey InfoTech builds defences that protect what you have built and the customers who trust you."/>
);

export default Cybersecurity;

