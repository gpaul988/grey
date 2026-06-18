import React from 'react';


import { PersonalizedGreeting } from '@/components/PersonalizedGreeting';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const BlockchainDevelopment = () => (
    <ServicePageTemplate
        title={<>Blockchain <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro={
            <>
                Secure, scalable decentralised systems—smart contracts, dApps, tokenisation and enterprise
                ledgers engineered for trust, transparency and real-world performance.
            </>
        }
        eyebrow={<>Decentralised systems <br className={'lg:block md:block hidden'}/>built for trust and scale</>}
        introHeading={<>Demystifying Blockchain <br className={'lg:block md:block hidden'}/>How We Engineer Trust</>}
        introBody={[
            <>
                Blockchain is reshaping how value, data and ownership move across the internet, yet most
                organisations struggle to move beyond proofs of concept into production. At Grey InfoTech we
                bridge that gap. We help businesses cut through the hype and design decentralised architectures
                that solve concrete problems around trust, traceability, settlement and disintermediation.
                Whether you are exploring tokenisation, launching a decentralised application, modernising
                back-office reconciliation, or building a permissioned consortium network, we translate complex
                distributed-ledger concepts into production-grade systems your users, regulators and auditors
                can rely on. Our delivery model pairs blockchain specialists with senior product engineers, so
                what we build is not an isolated experiment but a maintainable part of your wider technology
                estate.
            </>,
            <>
                Our engineers work across leading ecosystems—Ethereum and EVM-compatible chains such as Polygon,
                Arbitrum and BSC, alongside Solana and permissioned frameworks like Hyperledger Fabric—pairing
                rigorous smart-contract development with thorough security review. We treat audits, gas
                optimisation, key management and upgradeability as first-class concerns rather than
                afterthoughts. Every contract is unit-tested, fuzz-tested and statically analysed before it ever
                touches mainnet, and we design clear upgrade and governance paths so your protocol can evolve
                safely. The result is decentralised software that is not only innovative but safe, cost-efficient
                and ready to scale with your business and your community.
            </>,
        ]}
        solutionsHeading={<>Blockchain <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From smart contracts and decentralised applications to enterprise ledgers and token economies,
                Grey InfoTech delivers a complete blockchain capability. Based in Nigeria and serving clients
                worldwide, we build secure, audited, gas-efficient systems that turn distributed-ledger
                technology into measurable business value—without compromising on compliance or reliability.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Smart Contract Development', target: 'SC',
                tags: ['Solidity', 'Rust', 'Auditing', 'Gas Optimisation'],
                body: <>We design, develop and audit smart contracts that automate trust without intermediaries.
                    From token standards (ERC-20, ERC-721, ERC-1155) to complex DeFi vaults, staking, escrow and
                    governance logic, we write clean, well-documented Solidity and Rust code. Every contract is
                    hardened through static analysis, comprehensive unit and fuzz testing, invariant checks and
                    third-party-style security review—minimising attack surface and runtime cost while giving
                    your stakeholders verifiable assurance before deployment.</>,
            },
            {
                id: '02', title: 'Decentralised Apps (dApps)', target: 'DA',
                tags: ['Web3', 'React', 'Wallet Integration', 'The Graph'],
                body: <>We build full-stack decentralised applications with intuitive front-ends and reliable
                    on-chain back-ends. Using Ethers.js, Wagmi, Viem and modern React, we connect wallets, index
                    events with The Graph, and deliver responsive UX that hides blockchain complexity from end
                    users while preserving the transparency and self-custody that make decentralisation valuable.
                    We handle gasless transactions, account abstraction and multi-chain support where it improves
                    adoption.</>,
            },
            {
                id: '03', title: 'Tokenisation & NFTs', target: 'TK',
                tags: ['Token Design', 'Minting', 'Royalties', 'Marketplaces'],
                body: <>We help businesses tokenise real-world and digital assets, launch utility or governance
                    tokens, and build NFT platforms with secure minting, on-chain royalties and full marketplace
                    functionality. Our token-economics guidance and compliant contract design ensure your digital
                    assets are robust, interoperable and aligned with your commercial goals, with careful
                    attention to vesting, supply mechanics and regulatory considerations in your jurisdiction.</>,
            },
            {
                id: '04', title: 'DeFi Platforms', target: 'DF',
                tags: ['Lending', 'DEX', 'Staking', 'Yield'],
                body: <>We engineer decentralised finance protocols—lending and borrowing markets, automated
                    market makers, staking and yield strategies—with security and capital efficiency at their
                    core. We model economic attack vectors, integrate trusted oracles such as Chainlink, and
                    build the monitoring and circuit-breakers needed to operate financial primitives responsibly
                    on-chain.</>,
            },
            {
                id: '05', title: 'Enterprise Blockchain', target: 'EB',
                tags: ['Hyperledger', 'Supply Chain', 'Permissioned Ledgers'],
                body: <>For organisations that need privacy and control, we implement permissioned ledgers using
                    Hyperledger Fabric and similar frameworks. These power use cases like supply-chain
                    traceability, cross-party settlement, provenance and tamper-evident record keeping—delivering
                    the auditability of blockchain within the governance, identity and confidentiality controls
                    enterprises require.</>,
            },
            {
                id: '06', title: 'Audits, Integration & Support', target: 'AI',
                tags: ['Security Review', 'Oracles', 'APIs', 'Maintenance'],
                body: <>Beyond building, we secure and connect. We conduct structured smart-contract security
                    reviews, build oracles, indexers and middleware that bridge on-chain logic with your existing
                    databases, ERPs and back-office systems, and provide ongoing monitoring, upgrades and support
                    so your blockchain solution stays secure and performant long after launch.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Security-First Engineering', image: '/assets/services/Development.jpg',
                description: <>Every line of contract code we ship is tested, analysed and reviewed before it
                    reaches mainnet. We design for the worst case—reentrancy, oracle manipulation, key
                    compromise—so your protocol and your users&apos; funds stay protected.</>,
            },
            {
                id: 2, title: 'Multi-Chain Expertise', image: '/assets/services/digital-transformatio.jpg',
                description: <>We are not tied to one ecosystem. We select the right chain for your performance,
                    cost and governance needs—EVM chains, Solana or permissioned Hyperledger networks—and build
                    interoperable systems that can grow across them.</>,
            },
            {
                id: 3, title: 'Production, Not Prototypes', image: '/assets/services/services.jpg',
                description: <>Many blockchain efforts stall at proof of concept. We bring senior product
                    engineering discipline—CI/CD, monitoring, documentation and clear upgrade paths—so your
                    solution actually ships and stays maintainable.</>,
            },
            {
                id: 4, title: 'Transparent Partnership', image: '/assets/services/digital-optimisation.jpg',
                description: <>You stay in control throughout. Clear communication, early demos, honest timelines
                    and full ownership of code and keys mean you always know exactly where your project stands.</>,
            },
        ]}
        ctaHeading={<>Build on <br className={'lg:block md:block hidden'}/>decentralised rails</>}
        ctaBody={<>From smart contracts and DeFi to tokenisation and enterprise ledgers, Grey InfoTech turns
            blockchain ambition into secure, production-ready systems. Let&apos;s scope your idea, model the risks,
            and ship something your users—and your auditors—can trust.</>}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 13, suffix: '+'},
            {label: 'Smart Contracts Shipped', value: 60, suffix: '+'},
            {label: 'Projects Delivered', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Obinna Eze', title: 'CEO, ProTask Hub', message: <>Grey InfoTech delivered our token platform with airtight smart contracts and clear documentation. Their security-first approach gave our investors real confidence, and the audit trail made fundraising far smoother.</>},
            {name: 'Amina Diallo', title: 'Director of Operations, LogiFleet Systems', message: <>The supply-chain traceability solution they built on Hyperledger transformed how we verify shipments. Tamper-proof, auditable, and surprisingly easy for our non-technical team to use day to day.</>},
            {name: 'Daniel Okonkwo', title: 'Founder, YieldNest', message: <>They engineered our DeFi staking protocol end to end—contracts, oracles, monitoring and front-end. The economic modelling they did up front saved us from mistakes that sink most projects.</>},
        ]}
    />
);

export default BlockchainDevelopment;
