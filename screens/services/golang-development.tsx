import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const GolangDevelopment = () => (
    <ServicePageTemplate
        title={<>Go (Golang)<br className="lg:block md:block hidden" />Development</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/digital-optimisation.jpg"
        topImages={['/assets/services/services.jpg', '/assets/services/product-design.jpg']}
        intro="High-performance Go services, APIs and distributed systems engineered for the demands of modern infrastructure -fast, reliable and built to scale under real load."
        eyebrow="Go: built for performance at scale"
        introHeading={<>When Performance<br className="lg:block md:block hidden" />Is Non-Negotiable</>}
        introBody={[
            <>Go was designed for the problems that matter most in production -high concurrency, fast startup,
            minimal memory footprint and simple deployment. At Graham Sobiribo Paul our Go engineers build the
            backend services, microservices, CLI tools and infrastructure software that power demanding
            systems where performance and reliability are non-negotiable. We use Go where it delivers real
            competitive advantage: API gateways, real-time data processors, DevOps tooling and
            high-throughput backend services.</>,
            <>Our Go practice follows the language&apos;s idioms rather than fighting them. We design clear package
            boundaries, use interfaces for testability, handle errors explicitly, and write table-driven tests
            that document expected behaviour. We containerise with minimal base images, profile for CPU and
            memory allocations using pprof and benchmark critical paths. The result is Go services that
            are not only fast but readable, well-tested and straightforward for your team to maintain
            and extend.</>,
        ]}
        solutionsHeading={<>Go Development<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From high-throughput APIs to distributed systems and CLI tooling, Graham Sobiribo Paul builds Go software that performs under real-world production load."
        solutions={[
            {
                id: '01', title: 'REST & gRPC APIs', target: 'API',
                tags: ['REST', 'gRPC', 'Protobuf', 'OpenAPI', 'Chi', 'Gin'],
                body: <>We build Go APIs with clean layered architecture, middleware chains for auth, logging
                and tracing, and generated OpenAPI/Swagger documentation. For internal service communication
                we use gRPC with Protobuf -strongly typed, efficient over the wire and easy to version. Both
                REST and gRPC services are load-tested, rate-limited and hardened for production traffic.</>,
            },
            {
                id: '02', title: 'Microservices & Distributed Systems', target: 'MS',
                tags: ['Microservices', 'Event Sourcing', 'CQRS', 'NATS', 'Kafka'],
                body: <>We design microservice systems in Go with well-defined service contracts, event-driven
                communication via Kafka or NATS, and distributed tracing with OpenTelemetry. Our architects
                apply CQRS and event sourcing where the complexity is justified, and keep services simple
                and independently deployable where it is not. We design for failure: circuit breakers,
                timeouts, bulkheads and graceful degradation.</>,
            },
            {
                id: '03', title: 'High-Performance Data Processing', target: 'DP',
                tags: ['Concurrency', 'Goroutines', 'Channels', 'Stream Processing'],
                body: <>Go&apos;s goroutines and channels make it ideal for high-throughput data processing pipelines.
                We build ingestion workers, transformation engines and streaming processors that handle millions
                of events per second on commodity hardware. We profile every critical path, eliminate allocations
                in hot loops and tune garbage collection to keep latency predictable under load.</>,
            },
            {
                id: '04', title: 'CLI Tools & Developer Tooling', target: 'CLI',
                tags: ['Cobra', 'Viper', 'Homebrew', 'Cross-platform'],
                body: <>Go produces statically linked binaries that run anywhere without a runtime dependency -
                making it the ideal language for CLIs and developer tools. We build polished command-line
                applications with Cobra and Viper, distribute via package managers, and write comprehensive
                integration tests to ensure reliability across Windows, macOS and Linux.</>,
            },
            {
                id: '05', title: 'Infrastructure & Platform Engineering', target: 'IP',
                tags: ['Kubernetes Operators', 'Custom Controllers', 'Webhooks', 'Helm'],
                body: <>Many of the cloud-native ecosystem&apos;s most important tools are written in Go -and for good
                reason. We build Kubernetes operators, custom resource definitions, admission webhooks and
                controller-runtime based automation that extends Kubernetes with your business-specific
                logic. We also build Go-based internal tooling for infrastructure automation, secret rotation
                and compliance checks.</>,
            },
            {
                id: '06', title: 'Go Migration & Code Modernisation', target: 'GM',
                tags: ['Python to Go', 'Node to Go', 'Refactoring', 'Performance'],
                body: <>Existing services in Python or Node.js that are hitting performance walls often benefit
                from strategic migration to Go. We profile the bottlenecks, identify which components will
                benefit most from rewriting, and execute a phased migration that keeps the system running
                throughout. Before migrating we establish a full test suite against the existing behaviour
                so the rewrite is validated automatically.</>,
            },
        ]}
        ctaHeading={<>Performance<br className="lg:block md:block hidden" />delivered in Go</>}
        ctaBody="When your system needs to handle serious load without serious hardware costs, Go is the answer. Graham Sobiribo Paul builds Go services that perform at scale."
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Microservices Architecture',
                description: 'Build distributed systems with lightweight Go services, containerization with Docker, Kubernetes orchestration and service mesh patterns.'
            },
            {
                id: 'vs2',
                title: 'High-performance APIs',
                description: 'Develop REST and gRPC APIs with minimal latency and resource overhead, perfect for high-throughput systems and real-time data processing.'
            },
            {
                id: 'vs3',
                title: 'Cloud Infrastructure Tools',
                description: 'Create infrastructure automation, deployment tools and cloud-native applications that take advantage of Go\'s concurrency and performance.'
            }
        ]}/>
);

export default GolangDevelopment;

