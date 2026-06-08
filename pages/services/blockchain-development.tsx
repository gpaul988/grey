import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const BlockchainDevelopment = () => (
    <ServicePageTemplate
        title="Blockchain Development"
        heroImage="/assets/services/Development.jpg"
        midImage="/assets/services/services.jpg"
        intro={
            <>
                We build secure, scalable blockchain solutions—from smart contracts and decentralised
                applications (dApps) to tokenisation and enterprise distributed ledgers,{' '}
                <br className={'lg:block md:block hidden'}/>engineered for trust, transparency and
                real-world performance.
            </>
        }
        eyebrow={<>Decentralised systems <br className={'lg:block md:block hidden'}/>built for trust</>}
        introHeading="Blockchain Engineering"
        introBody={[
            <>
                Blockchain is reshaping how value, data and ownership move across the internet. At Grey
                InfoTech we help businesses move beyond the hype—designing decentralised architectures that
                solve concrete problems around trust, traceability and disintermediation. Whether you are
                exploring tokenisation, building a dApp, or modernising back-office settlement, we translate
                complex distributed-ledger concepts into production-grade systems that your users and
                auditors can rely on.
            </>,
            <>
                Our engineers work across leading ecosystems—Ethereum and EVM-compatible chains, Solana,
                Hyperledger Fabric and Polygon—pairing rigorous smart-contract development with thorough
                security review. We treat audits, gas optimisation and key management as first-class
                concerns, not afterthoughts, so the solutions we ship are not only innovative but safe,
                cost-efficient and ready to scale with your business.
            </>,
        ]}
        solutionsHeading="Our Blockchain Solutions"
        solutions={[
            {
                id: '01', title: 'Smart Contract Development', target: 'SC',
                tags: ['Solidity', 'Auditing', 'Gas Optimisation'],
                body: <>We design, develop and audit smart contracts that automate trust without intermediaries.
                    From token standards (ERC-20, ERC-721, ERC-1155) to complex DeFi and escrow logic, we write
                    clean, well-tested Solidity and Rust code, then harden it through static analysis, unit and
                    fuzz testing, and third-party-style security review—minimising attack surface and runtime cost.</>,
            },
            {
                id: '02', title: 'Decentralised Apps (dApps)', target: 'DA',
                tags: ['Web3', 'React', 'Wallet Integration'],
                body: <>We build full-stack decentralised applications with intuitive front-ends and reliable
                    on-chain back-ends. Using Web3.js, Ethers and modern React, we connect wallets, index events,
                    and deliver responsive UX that hides blockchain complexity from end users while preserving the
                    transparency and self-custody that make decentralisation valuable.</>,
            },
            {
                id: '03', title: 'Tokenisation & NFTs', target: 'TK',
                tags: ['Token Design', 'Minting', 'Marketplaces'],
                body: <>We help businesses tokenise assets, launch utility or governance tokens, and build NFT
                    platforms with secure minting, royalties and marketplace functionality. Our token economics
                    guidance and compliant contract design ensure your digital assets are robust, interoperable
                    and aligned with your commercial goals.</>,
            },
            {
                id: '04', title: 'Enterprise Blockchain', target: 'EB',
                tags: ['Hyperledger', 'Supply Chain', 'Permissioned Ledgers'],
                body: <>For organisations that need privacy and control, we implement permissioned ledgers using
                    Hyperledger Fabric and similar frameworks. These power use cases like supply-chain traceability,
                    cross-party settlement and tamper-evident record keeping—delivering the auditability of
                    blockchain within the governance enterprises require.</>,
            },
        ]}
        faqs={[
            {q: 'Which blockchain platforms do you work with?', a: 'We work across Ethereum and EVM-compatible chains (Polygon, BSC, Arbitrum), Solana, and permissioned ledgers like Hyperledger Fabric—choosing the right platform based on your performance, cost and governance needs.'},
            {q: 'Do you audit smart contracts?', a: 'Yes. Every contract goes through automated analysis, comprehensive testing, and a structured manual security review before deployment. We can also coordinate independent third-party audits for high-value systems.'},
            {q: 'Can blockchain integrate with our existing systems?', a: 'Absolutely. We build APIs, oracles and middleware that bridge on-chain logic with your existing databases, ERPs and back-office tools, so blockchain becomes part of your stack rather than a silo.'},
        ]}
        testimonials={[
            {name: 'Obinna Eze', title: 'CEO, ProTask Hub', message: <>Grey InfoTech delivered our token platform with airtight smart contracts and clear documentation. Their security-first approach gave our investors real confidence.</>},
            {name: 'Amina Diallo', title: 'Director of Operations, LogiFleet Systems', message: <>The supply-chain traceability solution they built transformed how we verify shipments. Tamper-proof, auditable, and surprisingly easy for our team to use.</>},
        ]}
    />
);

export default BlockchainDevelopment;
