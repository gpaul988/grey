import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const DevOpsServices = () => (
    <ServicePageTemplate
        title={<>DevOps<br className="lg:block md:block hidden" />Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/ecommerce-web-design.jpg"
        topImages={['/assets/services/product-design.jpg', '/assets/services/ecommerce-web-design.jpg']}
        intro="Continuous delivery pipelines, infrastructure as code, and platform engineering that compress release cycles from weeks to hours."
        eyebrow="Ship faster. Break less. Scale effortlessly."
        introHeading={<>DevOps That<br className="lg:block md:block hidden" />Eliminates Friction</>}
        introBody={[
            <>Great software dies on the altar of slow deployments. At Grey InfoTech our DevOps practice removes
            the friction between writing code and running it in production. We design CI/CD pipelines that
            build, test, scan and deploy automatically, infrastructure-as-code stacks that version-control your
            entire environment, and platform-engineering layers that give your developers self-service tools
            without sacrificing governance. Every pipeline we build is observable, auditable and recoverable.</>,
            <>We approach DevOps as a culture shift as much as a toolchain decision. That means embedding
            engineers inside your team, running blameless post-mortems, and coaching developers on observability
            and on-call practices. The artefacts we leave behind -runbooks, architecture decision records,
            disaster-recovery playbooks -ensure your team can own and evolve the platform long after the
            engagement ends. The result is faster releases, fewer incidents and measurably higher developer
            satisfaction.</>,
        ]}
        solutionsHeading={<>DevOps<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From CI/CD pipelines to full platform engineering, Grey InfoTech delivers DevOps capabilities that make your engineering team dramatically more productive."
        solutions={[
            {
                id: '01', title: 'CI/CD Pipeline Design', target: 'CI',
                tags: ['GitHub Actions', 'GitLab CI', 'CircleCI', 'Jenkins'],
                body: <>We design and implement end-to-end CI/CD pipelines with parallel test execution, static
                analysis, dependency scanning, container building, semantic versioning and blue/green or canary
                deployments. Every pipeline includes rollback automation and deployment notifications so your
                team always knows what shipped and can reverse it in under a minute if needed.</>,
            },
            {
                id: '02', title: 'Infrastructure as Code', target: 'IAC',
                tags: ['Terraform', 'Pulumi', 'CDK', 'Ansible'],
                body: <>We codify your entire infrastructure in Terraform or Pulumi -compute, networking, databases,
                IAM, DNS, CDN -managed in version control with peer-reviewed pull requests and automated plan
                diffs. State is stored remotely with locking to prevent concurrent modifications, and all
                sensitive values are managed through Vault or native cloud secrets services.</>,
            },
            {
                id: '03', title: 'Observability & Monitoring', target: 'OB',
                tags: ['Prometheus', 'Grafana', 'OpenTelemetry', 'PagerDuty'],
                body: <>Observability is the feedback loop that keeps systems healthy. We instrument services
                with OpenTelemetry for distributed traces, configure Prometheus metrics with SLI/SLO dashboards
                in Grafana, and wire alerting through PagerDuty or Opsgenie with escalation policies and runbook
                links. We also set up synthetic monitoring and real-user monitoring for user-facing applications.</>,
            },
            {
                id: '04', title: 'Platform Engineering', target: 'PE',
                tags: ['Internal Developer Platform', 'Backstage', 'Golden Paths'],
                body: <>Platform engineering gives developers self-service infrastructure without raw cloud console
                access. We build internal developer platforms using Backstage or custom portals, define golden
                paths for common service templates, and implement guardrails that enforce security and cost
                policies automatically. The result is a paved road that speeds up onboarding and reduces
                toil for every developer in the organisation.</>,
            },
            {
                id: '05', title: 'Site Reliability Engineering', target: 'SRE',
                tags: ['SLOs', 'Error Budgets', 'Chaos Engineering', 'Incident Response'],
                body: <>We embed SRE practices -defining SLIs and SLOs, tracking error budgets, running
                chaos experiments, and conducting structured incident retrospectives. By treating reliability
                as an engineering problem with measurable targets rather than a hope, we help teams balance
                feature velocity against the need to keep systems available and performant.</>,
            },
            {
                id: '06', title: 'Security in DevOps (DevSecOps)', target: 'DS',
                tags: ['SAST', 'DAST', 'Container Scanning', 'Supply Chain'],
                body: <>Security shifts left in modern engineering. We integrate SAST, dependency auditing,
                container image scanning and secret detection into pull-request checks so vulnerabilities are
                caught before they merge. We also implement software supply chain controls -signing artefacts,
                generating SBOMs and enforcing policy-as-code with Open Policy Agent or Kyverno.</>,
            },
        ]}
        ctaHeading={<>Ship confidently.<br className="lg:block md:block hidden" />Every time.</>}
        ctaBody="Your engineering team deserves tooling that helps them go faster without burning out. Let's build the DevOps platform that makes production feel safe."
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Cloud Migration & Modernization',
                description: 'Plan and execute migrations to AWS, Azure or GCP with minimal downtime, leveraging containerization, serverless and managed services.'
            },
            {
                id: 'vs2',
                title: 'CI/CD Pipeline Automation',
                description: 'Build reliable, automated deployment pipelines with infrastructure-as-code, automated testing, canary releases and instant rollback capabilities.'
            },
            {
                id: 'vs3',
                title: 'Infrastructure Security & Compliance',
                description: 'Implement secure cloud architecture with IAM, encryption, network segmentation, compliance automation for SOC2, HIPAA, PCI-DSS and audit readiness.'
            }
        ]}/>
);

export default DevOpsServices;

