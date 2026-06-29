import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const CloudSolutions = () => (
    <ServicePageTemplate
        title={<>Cloud<br className="lg:block md:block hidden" />Solutions</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Scalable, secure cloud infrastructure engineered to reduce costs, accelerate delivery and give your teams the agility to ship at speed."
        eyebrow="Cloud-first architecture for modern businesses"
        introHeading={<>Engineered for Scale<br className="lg:block md:block hidden" />Built for Resilience</>}
        introBody={[
            <>Cloud is no longer a destination—it is the operating model. At Grey InfoTech we design and deliver
            cloud architectures that match your workload characteristics, compliance requirements and cost profile.
            Whether you are lifting legacy systems off on-premise hardware, re-platforming monoliths into
            microservices, or building cloud-native from day one, we provide the engineering depth to do it right.
            We work across AWS, Google Cloud and Azure, selecting the best-fit services rather than forcing a
            single vendor.</>,
            <>Our cloud practice covers infrastructure-as-code, containerisation, Kubernetes orchestration,
            CI/CD pipelines, observability stacks and FinOps. We embed security from the first line of
            Terraform—IAM, network segmentation, secrets management, encryption at rest and in transit—and
            we deliver architecture review documents and runbooks so your team owns what we build. The result
            is cloud infrastructure that performs predictably, costs less to operate and scales on demand.</>,
        ]}
        solutionsHeading={<>Cloud<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From lift-and-shift migrations to cloud-native architectures, Grey InfoTech delivers the full cloud stack—designed for scale, security and speed."
        solutions={[
            {
                id: '01', title: 'Cloud Architecture & Design', target: 'CA',
                tags: ['AWS', 'GCP', 'Azure', 'Multi-Cloud'],
                body: <>We architect cloud environments that balance performance, cost and compliance. Starting
                from your workload requirements and growth projections, we produce reference architectures with
                network topology, compute strategy, data-tier design and disaster-recovery runbooks. We document
                every decision so your team can maintain and evolve the platform independently.</>,
            },
            {
                id: '02', title: 'Cloud Migration', target: 'CM',
                tags: ['Lift & Shift', 'Re-platform', 'Re-factor'],
                body: <>Moving to cloud without disruption requires careful sequencing. We run discovery workshops,
                dependency mapping and risk assessment before writing a single migration script. Our migration
                factory approach handles wave planning, cutover testing and rollback procedures, minimising
                downtime and protecting your data throughout the transition.</>,
            },
            {
                id: '03', title: 'Kubernetes & Containers', target: 'K8',
                tags: ['Kubernetes', 'Docker', 'Helm', 'Service Mesh'],
                body: <>We containerise applications, build Helm charts and deploy production-grade Kubernetes
                clusters on EKS, GKE or AKS. Our work covers horizontal pod autoscaling, resource quotas,
                network policies, Istio service-mesh configuration and GitOps pipelines—giving your engineering
                teams a self-service platform that scales automatically under load.</>,
            },
            {
                id: '04', title: 'DevOps & CI/CD', target: 'DC',
                tags: ['GitHub Actions', 'Terraform', 'ArgoCD', 'Monitoring'],
                body: <>Fast, reliable delivery pipelines are the engine of software velocity. We design CI/CD
                workflows using GitHub Actions, GitLab or CircleCI, pair them with infrastructure-as-code in
                Terraform or Pulumi, and instrument everything with Prometheus, Grafana and distributed tracing
                so issues surface before they reach production.</>,
            },
            {
                id: '05', title: 'Cloud Cost Optimisation (FinOps)', target: 'FO',
                tags: ['FinOps', 'Reserved Instances', 'Spot', 'Rightsizing'],
                body: <>Cloud bills spiral quickly without discipline. We audit your existing spend, rightsize
                compute, migrate eligible workloads to spot or savings plans, implement tagging governance and
                deploy real-time cost dashboards. Clients typically see 25–40 % spend reduction within the
                first quarter without sacrificing reliability or performance.</>,
            },
            {
                id: '06', title: 'Cloud Security & Compliance', target: 'CS',
                tags: ['IAM', 'SIEM', 'SOC 2', 'PCI DSS'],
                body: <>Security in cloud is continuous, not a one-time audit. We configure IAM least-privilege
                policies, enable GuardDuty or Security Command Center, integrate SIEM pipelines and run
                automated compliance checks against CIS benchmarks. We also prepare the evidence packs needed
                for SOC 2, ISO 27001 and PCI DSS assessments.</>,
            },
        ]}
        ctaHeading={<>Your cloud,<br className="lg:block md:block hidden" />perfected</>}
        ctaBody="Ready to move faster, spend less, and scale on demand? Grey InfoTech designs and operates cloud infrastructure that grows with your business."
        faqs={[
            {q: 'Which cloud providers do you work with?', a: 'AWS, Google Cloud and Azure. We also support multi-cloud and hybrid architectures where the workload justifies it.'},
            {q: 'How long does a typical cloud migration take?', a: 'Small workloads can migrate in 4–6 weeks. Enterprise migrations with 50+ services typically run 3–6 months in phased waves.'},
            {q: 'Do you manage infrastructure ongoing?', a: 'Yes. We offer managed services including 24/7 monitoring, incident response, patching and cost governance post-migration.'},
            {q: 'How do you handle data security during migration?', a: 'We encrypt data in transit and at rest, enforce MFA throughout, and use phased cut-overs with rollback points to ensure zero data loss.'},
        ]}
    />
);

export default CloudSolutions;
