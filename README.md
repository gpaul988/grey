# Grey

Grey is a full-stack digital agency and commerce platform built with Next.js, Express, and SQLite. It combines a polished marketing website, a store experience, and a feature-rich admin backend for managing content, orders, users, SEO, submissions, and business operations.

## Overview

This project is designed to support:

- A premium public-facing website for Grey InfoTech
- Service, industry, blog, FAQ, and company pages
- A storefront and product catalog experience
- An admin dashboard for operations and management
- Store analytics for stock, sales, orders, and delivery status
- Automatic receipt email generation for successful payments
- Lead capture, contact forms, CRM-like data collection, and audit tools

## Tech stack

- Next.js 16
- React 19
- Express + EJS admin views
- TypeScript and Tailwind CSS
- SQLite for local data persistence
- Nodemailer / email integration
- CSRF-protected admin APIs and session handling
- Playwright and Vitest for automated checks

## Project structure

```bash
.
├── app/                  # Next.js app routes and frontend pages
├── Admin/                # Express admin, EJS views, data models, mailer, APIs
├── components/           # Shared frontend components
├── screens/              # Page-level screen components
├── lib/                  # Shared logic, SEO, payments, email helpers
├── public/               # Static assets and generated branding files
├── scripts/              # Setup, migration, and utility scripts
├── tests/                # Test suites
├── e2e/                  # End-to-end Playwright tests
├── server.ts             # Main Express + Next.js bootstrap server
├── package.json          # Scripts and dependencies
├── config.env.example    # Sample env file for app configuration
├── .env.example          # Sample environment file
└── README.md             # Project documentation
```

## Prerequisites

- Node.js 20+
- npm 10+
- Git

## Getting started

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp config.env.example config.env
# and optionally
cp .env.example .env
```

4. Start the application in development mode:

```bash
npm run dev
```

The app runs locally at:

- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin

## Available scripts

```bash
npm run dev          # start the Express + Next.js dev server
npm run dev:next     # run only the Next.js dev server
npm run build        # production build
npm run start        # production server
npm run lint         # run ESLint
npm run test         # run Vitest
npm run test:e2e     # run Playwright end-to-end tests
npm run seed         # seed base data
npm run seed:reset   # reset database and reseed
npm run bootstrap:db # bootstrap required DB structure
```

## Admin and store features

- Admin dashboard and management portal
- Store analytics for revenue, stock, sold units, and delivery status
- Orders and payment flow management
- Customer receipt sending after successful payment
- Role-based admin views and session-protected endpoints
- Business forms, audit tracking, and support workflows

## Environment notes

The project expects environment variables for:

- application URL settings
- admin session/security settings
- database configuration
- SMTP/email delivery values
- payment provider configuration where enabled

Update `config.env` or `.env` with the relevant values before running production builds or live deployments.

## Production

```bash
npm run build
npm run start
```

## Notes

- This project is a hybrid of frontend marketing pages and backend business tooling in one app.
- Local development is SQLite-based and designed for easy setup.
- For real customer email delivery or payment processing, configure valid provider credentials in your environment settings.

## License

This project is distributed under the repository's existing license terms.
