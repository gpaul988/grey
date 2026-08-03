import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/**
 * Creates all tables if they do not exist. Idempotent — safe to run on every boot.
 * Accepts the db instance directly to avoid a circular-import race with ./index.
 * Falls back to requiring ./index when called without an argument.
 * Accepts any database-like object (better-sqlite3 or MySQL adapter).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function migrate(database?: any): void {

     
    // Require the db module directly; index.ts exports via CommonJS (module.exports).
    const db = database ?? require('./index');
    db.exec(`
        CREATE TABLE IF NOT EXISTS users
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255),
            role VARCHAR(50) NOT NULL DEFAULT 'staff',
            avatar VARCHAR(255),
            phone VARCHAR(20),
            status VARCHAR(50) NOT NULL DEFAULT 'active',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS submissions
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            subject VARCHAR(255),
            project_type VARCHAR(100),
            budget VARCHAR(100),
            message TEXT,
            source VARCHAR(50) NOT NULL DEFAULT 'website',
            status VARCHAR(50) NOT NULL DEFAULT 'new',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS leads
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            company VARCHAR(255),
            phone VARCHAR(20),
            source VARCHAR(50) NOT NULL DEFAULT 'website',
            stage VARCHAR(50) NOT NULL DEFAULT 'new',
            value DECIMAL(10,2) NOT NULL DEFAULT 0,
            owner_id INT REFERENCES users(id) ON DELETE SET NULL,
            notes TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS clients
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            company VARCHAR(255),
            phone VARCHAR(20),
            avatar VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS projects
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            client_id INT REFERENCES clients(id) ON DELETE SET NULL,
            client_name VARCHAR(255),
            status VARCHAR(50) NOT NULL DEFAULT 'planning',
            progress INT NOT NULL DEFAULT 0,
            budget DECIMAL(10,2) NOT NULL DEFAULT 0,
            start_date VARCHAR(255),
            end_date VARCHAR(255),
            description TEXT,
            manager_id INT REFERENCES users(id) ON DELETE SET NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS tickets
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            subject VARCHAR(255) NOT NULL,
            requester VARCHAR(255) NOT NULL,
            requester_email VARCHAR(255),
            priority VARCHAR(50) NOT NULL DEFAULT 'medium',
            status VARCHAR(50) NOT NULL DEFAULT 'open',
            assignee_id INT REFERENCES users(id) ON DELETE SET NULL,
            body TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS ticket_messages
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            ticket_id INT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
            author VARCHAR(255) NOT NULL,
            is_staff INT NOT NULL DEFAULT 1,
            body TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS invoices
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            number VARCHAR(255) NOT NULL UNIQUE,
            client_id INT REFERENCES clients(id) ON DELETE SET NULL,
            client_name VARCHAR(255) NOT NULL,
            client_email VARCHAR(255),
            amount DECIMAL(10,2) NOT NULL DEFAULT 0,
            tax DECIMAL(10,2) NOT NULL DEFAULT 0,
            total DECIMAL(10,2) NOT NULL DEFAULT 0,
            currency VARCHAR(10) NOT NULL DEFAULT 'NGN',
            status VARCHAR(50) NOT NULL DEFAULT 'draft',
            issued_date VARCHAR(255),
            due_date VARCHAR(255),
            items JSON NOT NULL DEFAULT '[]',
            notes TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS case_studies
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            client VARCHAR(255),
            industry VARCHAR(255),
            summary TEXT,
            body TEXT,
            image VARCHAR(255),
            results TEXT,
            published INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS blog_posts
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            excerpt TEXT,
            body TEXT,
            cover VARCHAR(255),
            author VARCHAR(255) NOT NULL DEFAULT 'Grey InfoTech',
            tags JSON NOT NULL DEFAULT '[]',
            status VARCHAR(50) NOT NULL DEFAULT 'draft',
            published_at VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS conversations
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            client_id INT REFERENCES clients(id) ON DELETE CASCADE,
            subject VARCHAR(255),
            last_message TEXT,
            unread INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS messages
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            conversation_id INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
            sender VARCHAR(50) NOT NULL,
            sender_name VARCHAR(255),
            body TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS activity_log
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE SET NULL,
            user_name VARCHAR(255),
            action VARCHAR(255) NOT NULL,
            entity VARCHAR(100),
            entity_id INT,
            detail TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
        CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
        CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
        CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
        CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
        CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
        CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id);

        CREATE TABLE IF NOT EXISTS client_tokens
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            client_id INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
            token VARCHAR(255) NOT NULL UNIQUE,
            purpose VARCHAR(50) NOT NULL DEFAULT 'login',
            used_at VARCHAR(255),
            expires_at VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_client_tokens_token ON client_tokens(token);

        CREATE TABLE IF NOT EXISTS project_briefs
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            client_id INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
            project_id INT REFERENCES projects(id) ON DELETE SET NULL,
            service VARCHAR(255),
            title VARCHAR(255) NOT NULL,
            goals TEXT,
            target_audience TEXT,
            design_style VARCHAR(255),
            color_prefs VARCHAR(255),
            references_links TEXT,
            budget_range VARCHAR(255),
            timeline VARCHAR(255),
            details TEXT,
            status VARCHAR(50) NOT NULL DEFAULT 'submitted',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS email_verifications
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            subject_type VARCHAR(50) NOT NULL,
            subject_id INT NOT NULL,
            email VARCHAR(255) NOT NULL,
            token VARCHAR(255) NOT NULL UNIQUE,
            code VARCHAR(255) NOT NULL,
            purpose VARCHAR(50) NOT NULL DEFAULT 'verify',
            used_at VARCHAR(255),
            expires_at VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(token);

        CREATE TABLE IF NOT EXISTS client_staff
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            client_id INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            avatar VARCHAR(255),
            password_hash VARCHAR(255),
            role_title VARCHAR(255),
            status VARCHAR(50) NOT NULL DEFAULT 'invited',
            email_verified INT NOT NULL DEFAULT 0,
            last_login VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_client_email (client_id, email)
        );
        CREATE INDEX IF NOT EXISTS idx_client_staff_client ON client_staff(client_id);

        CREATE TABLE IF NOT EXISTS conversation_participants
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            conversation_id INT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
            participant_type VARCHAR(50) NOT NULL,
            participant_id INT NOT NULL,
            name VARCHAR(255),
            added_by VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_participant (conversation_id, participant_type, participant_id)
        );
        CREATE INDEX IF NOT EXISTS idx_conv_participants_conv ON conversation_participants(conversation_id);

        CREATE TABLE IF NOT EXISTS uploads
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            client_id INT REFERENCES clients(id) ON DELETE CASCADE,
            project_id INT REFERENCES projects(id) ON DELETE SET NULL,
            brief_id INT REFERENCES project_briefs(id) ON DELETE SET NULL,
            uploader VARCHAR(50) NOT NULL DEFAULT 'client',
            uploader_id INT,
            filename VARCHAR(255) NOT NULL,
            original VARCHAR(255) NOT NULL,
            mime VARCHAR(100),
            size INT NOT NULL DEFAULT 0,
            url VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);

    /* ---------------- Idempotent column migrations ---------------- */
    const addColumnIfMissing = (table: string, column: string, definition: string): void => {
        const cols = db.prepare(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=? AND TABLE_SCHEMA=DATABASE()`).all(table) as { COLUMN_NAME: string }[];
        if (!cols.some((c) => c.COLUMN_NAME === column)) {
            db.exec(`ALTER TABLE ${table}
                ADD COLUMN ${column} ${definition}`);
        }
    };

    addColumnIfMissing('clients', 'password_hash', 'TEXT');
    addColumnIfMissing('clients', 'status', "TEXT NOT NULL DEFAULT 'active'");
    addColumnIfMissing('clients', 'last_login', 'TEXT');
    // Email-verification state for client portal accounts.
    addColumnIfMissing('clients', 'email_verified', 'INTEGER NOT NULL DEFAULT 0');
    addColumnIfMissing('clients', 'verified_at', 'TEXT');
    // Per-user custom permission overrides (JSON map), beyond the base role.
    addColumnIfMissing('users', 'permissions', 'TEXT');
    // Email-verification state for team accounts. Existing/seeded users are
    // treated as already verified so we never lock anyone out on upgrade.
    addColumnIfMissing('users', 'email_verified', 'INTEGER NOT NULL DEFAULT 0');
    addColumnIfMissing('users', 'verified_at', 'TEXT');
    // Link a conversation to a project for client messaging context.
    addColumnIfMissing('conversations', 'project_id', 'INTEGER');

    // ---- Biodata columns for users (team) ----
    addColumnIfMissing('users', 'bio', 'TEXT');
    addColumnIfMissing('users', 'date_of_birth', 'TEXT');
    addColumnIfMissing('users', 'gender', 'TEXT');
    addColumnIfMissing('users', 'address', 'TEXT');
    addColumnIfMissing('users', 'city', 'TEXT');
    addColumnIfMissing('users', 'state', 'TEXT');
    addColumnIfMissing('users', 'country', "TEXT NOT NULL DEFAULT 'Nigeria'");
    addColumnIfMissing('users', 'linkedin', 'TEXT');
    addColumnIfMissing('users', 'twitter', 'TEXT');
    addColumnIfMissing('users', 'whatsapp', 'TEXT');

    // ---- Biodata columns for clients ----
    addColumnIfMissing('clients', 'bio', 'TEXT');
    addColumnIfMissing('clients', 'date_of_birth', 'TEXT');
    addColumnIfMissing('clients', 'gender', 'TEXT');
    addColumnIfMissing('clients', 'address', 'TEXT');
    addColumnIfMissing('clients', 'city', 'TEXT');
    addColumnIfMissing('clients', 'state', 'TEXT');
    addColumnIfMissing('clients', 'country', "TEXT NOT NULL DEFAULT 'Nigeria'");
    addColumnIfMissing('clients', 'website', 'TEXT');
    addColumnIfMissing('clients', 'industry', 'TEXT');

    // ---- Store: multi-currency + coupons (added incrementally) ----
    const tableExists = (t: string): boolean =>
        !!db.prepare("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?").get(t);
    if (tableExists('products')) addColumnIfMissing('products', 'price_usd', 'DECIMAL(10,2)');
    if (tableExists('orders')) {
        addColumnIfMissing('orders', 'coupon_code', 'TEXT');
        addColumnIfMissing('orders', 'currency', "TEXT NOT NULL DEFAULT 'NGN'");
    }

    // ---- Career applications: new columns added in v2 ----
    addColumnIfMissing('career_applications', 'job_opening_id', 'INTEGER REFERENCES job_openings(id) ON DELETE SET NULL');
    addColumnIfMissing('career_applications', 'documents_paths', "TEXT NOT NULL DEFAULT '[]'");

    // ---- Blog post extended fields (Lightflows-style template) ----
    addColumnIfMissing('blog_posts', 'read_time', 'TEXT');
    addColumnIfMissing('blog_posts', 'hero_image', 'TEXT');
    addColumnIfMissing('blog_posts', 'author_avatar', 'TEXT');
    addColumnIfMissing('blog_posts', 'author_role', 'TEXT');
    addColumnIfMissing('blog_posts', 'sections', "TEXT NOT NULL DEFAULT '[]'"); // JSON: [{title,body,image,caption}]

    // ---- Case study extended fields (Lightflows /work-style template) ----
    addColumnIfMissing('case_studies', 'hero_image', 'TEXT');
    addColumnIfMissing('case_studies', 'services', "TEXT NOT NULL DEFAULT '[]'"); // JSON array of service strings
    addColumnIfMissing('case_studies', 'sections', "TEXT NOT NULL DEFAULT '[]'"); // JSON: [{title,body,image,caption}]
    addColumnIfMissing('case_studies', 'tagline', 'TEXT');
    addColumnIfMissing('case_studies', 'website', 'TEXT');

    // ---- Site-wide settings ----
    db.exec(`
        CREATE TABLE IF NOT EXISTS site_settings
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            key VARCHAR(255) NOT NULL UNIQUE,
            value TEXT NOT NULL DEFAULT '',
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // ---- Store: new tables ----
    db.exec(`
        CREATE TABLE IF NOT EXISTS store_settings
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            key VARCHAR(255) NOT NULL UNIQUE,
            value TEXT NOT NULL DEFAULT '',
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS product_categories
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            parent_id INT REFERENCES product_categories(id) ON DELETE SET NULL,
            icon TEXT,
            description TEXT,
            sort_order INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS product_brands
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            logo TEXT,
            description TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS products
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            sku VARCHAR(255) UNIQUE,
            category_id INT REFERENCES product_categories(id) ON DELETE SET NULL,
            brand_id INT REFERENCES product_brands(id) ON DELETE SET NULL,
            description TEXT,
            specs TEXT NOT NULL DEFAULT '{}',
            price DECIMAL(10,2) NOT NULL DEFAULT 0,
            compare_price DECIMAL(10,2),
            stock INT NOT NULL DEFAULT 0,
            images TEXT NOT NULL DEFAULT '[]',
            thumbnail TEXT,
            status VARCHAR(50) NOT NULL DEFAULT 'draft',
            featured INT NOT NULL DEFAULT 0,
            tags TEXT NOT NULL DEFAULT '[]',
            weight DECIMAL(10,2),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
        CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
        CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

        CREATE TABLE IF NOT EXISTS customers
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE,
            phone VARCHAR(20) NOT NULL,
            address TEXT,
            city VARCHAR(100),
            state VARCHAR(100),
            country VARCHAR(100) NOT NULL DEFAULT 'Nigeria',
            bio TEXT,
            date_of_birth VARCHAR(255),
            gender VARCHAR(50),
            avatar VARCHAR(255),
            password_hash VARCHAR(255),
            email_verified INT NOT NULL DEFAULT 0,
            verified_at VARCHAR(255),
            last_login VARCHAR(255),
            status VARCHAR(50) NOT NULL DEFAULT 'active',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
        CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);

        CREATE TABLE IF NOT EXISTS customer_password_resets
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
            token_hash VARCHAR(255) NOT NULL,
            expires_at VARCHAR(255) NOT NULL,
            used_at VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cpr_token ON customer_password_resets(token_hash);
        CREATE INDEX IF NOT EXISTS idx_cpr_customer ON customer_password_resets(customer_id);

        CREATE TABLE IF NOT EXISTS orders
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_number VARCHAR(255) NOT NULL UNIQUE,
            customer_id INT REFERENCES customers(id) ON DELETE SET NULL,
            customer_type VARCHAR(50) NOT NULL DEFAULT 'guest',
            guest_name VARCHAR(255),
            guest_email VARCHAR(255),
            guest_phone VARCHAR(20),
            shipping_address TEXT NOT NULL DEFAULT '{}',
            billing_address TEXT NOT NULL DEFAULT '{}',
            status VARCHAR(50) NOT NULL DEFAULT 'pending',
            payment_status VARCHAR(50) NOT NULL DEFAULT 'unpaid',
            payment_method VARCHAR(100),
            payment_gateway VARCHAR(100),
            payment_ref VARCHAR(255),
            payment_data TEXT NOT NULL DEFAULT '{}',
            subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
            shipping_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
            tax DECIMAL(10,2) NOT NULL DEFAULT 0,
            discount DECIMAL(10,2) NOT NULL DEFAULT 0,
            total DECIMAL(10,2) NOT NULL DEFAULT 0,
            notes TEXT,
            staff_notes TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
        CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
        CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

        CREATE TABLE IF NOT EXISTS order_items
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
            product_id INT REFERENCES products(id) ON DELETE SET NULL,
            product_name VARCHAR(255) NOT NULL,
            product_image VARCHAR(255),
            product_sku VARCHAR(255),
            quantity INT NOT NULL DEFAULT 1,
            unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
            total_price DECIMAL(10,2) NOT NULL DEFAULT 0
        );
        CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

        CREATE TABLE IF NOT EXISTS cart_sessions
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            session_key VARCHAR(255) NOT NULL UNIQUE,
            items TEXT NOT NULL DEFAULT '[]',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS product_reviews
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
            customer_id INT REFERENCES customers(id) ON DELETE SET NULL,
            reviewer_name VARCHAR(255) NOT NULL,
            rating INT NOT NULL DEFAULT 5,
            comment TEXT,
            status VARCHAR(50) NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id);

        CREATE TABLE IF NOT EXISTS coupons
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            code VARCHAR(255) NOT NULL UNIQUE,
            type VARCHAR(50) NOT NULL DEFAULT 'percent',
            value DECIMAL(10,2) NOT NULL DEFAULT 0,
            min_subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
            max_discount DECIMAL(10,2),
            usage_limit INT,
            used_count INT NOT NULL DEFAULT 0,
            starts_at VARCHAR(255),
            expires_at VARCHAR(255),
            status VARCHAR(50) NOT NULL DEFAULT 'active',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS wishlists
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
            product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(customer_id, product_id)
        );
    `);

    // ---- Content: Partners / Client logos + Client reviews (testimonials) ----
    db.exec(`
        CREATE TABLE IF NOT EXISTS partners
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            logo VARCHAR(255) NOT NULL DEFAULT '',
            url VARCHAR(255) NOT NULL DEFAULT '',
            sort_order INT NOT NULL DEFAULT 0,
            active INT NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS client_reviews
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            author VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL DEFAULT '',
            company VARCHAR(255) NOT NULL DEFAULT '',
            avatar VARCHAR(255) NOT NULL DEFAULT '',
            quote TEXT NOT NULL,
            rating INT NOT NULL DEFAULT 5,
            sort_order INT NOT NULL DEFAULT 0,
            active INT NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        -- ---- Partnership inquiries (submitted from /partners page) ----
        CREATE TABLE IF NOT EXISTS partner_inquiries
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            company VARCHAR(255) NOT NULL,
            contact_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            website VARCHAR(255),
            country VARCHAR(100),
            reg_authority VARCHAR(255),            -- e.g. CAC (Nigeria) or equivalent body
            reg_number VARCHAR(255),            -- registration / incorporation number
            partnership_type VARCHAR(255),            -- Technology | Reseller | Referral | Strategic | Integration | Other
            message TEXT,
            status VARCHAR(50) NOT NULL DEFAULT 'new', -- new | reviewing | approved | declined | archived
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        -- ---- FAQs (central FAQ page + admin CRUD) ----
        CREATE TABLE IF NOT EXISTS faqs
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            category VARCHAR(100) NOT NULL DEFAULT 'General',
            sort_order INT NOT NULL DEFAULT 0,
            active INT NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        -- ---- Ads / Adverts (frontend banners + social share) ----
        CREATE TABLE IF NOT EXISTS ads
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            body TEXT NOT NULL DEFAULT '',
            image VARCHAR(255) NOT NULL DEFAULT '',   -- upload URL or external URL
            link_url VARCHAR(255) NOT NULL DEFAULT '',   -- destination on CTA click
            cta_label VARCHAR(255) NOT NULL DEFAULT 'Learn more',
            placement VARCHAR(100) NOT NULL DEFAULT 'home_banner',
            share_caption TEXT NOT NULL DEFAULT '',   -- caption pushed to social share intents
            variant VARCHAR(50) NOT NULL DEFAULT 'gradient', -- gradient | image | minimal
            status VARCHAR(50) NOT NULL DEFAULT 'draft',    -- draft | published
            starts_at VARCHAR(255),
            ends_at VARCHAR(255),
            impressions INT NOT NULL DEFAULT 0,
            clicks INT NOT NULL DEFAULT 0,
            sort_order INT NOT NULL DEFAULT 0,
            active INT NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        -- ---- Newsletter subscribers ----
        CREATE TABLE IF NOT EXISTS subscribers
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL DEFAULT '',
            source VARCHAR(100) NOT NULL DEFAULT 'footer',
            status VARCHAR(50) NOT NULL DEFAULT 'subscribed', -- subscribed | unsubscribed
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        -- ---- Site-wide announcement bar ----
        CREATE TABLE IF NOT EXISTS announcements
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            message TEXT NOT NULL,
            link_url VARCHAR(255) NOT NULL DEFAULT '',
            link_label VARCHAR(255) NOT NULL DEFAULT '',
            variant VARCHAR(50) NOT NULL DEFAULT 'info', -- info | success | warning | promo
            active INT NOT NULL DEFAULT 1,
            starts_at VARCHAR(255),
            ends_at VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );

        -- ---- Per-page SEO overrides ----
        CREATE TABLE IF NOT EXISTS page_seo
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            path VARCHAR(255) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL DEFAULT '',
            description TEXT NOT NULL DEFAULT '',
            keywords TEXT NOT NULL DEFAULT '',
            og_image VARCHAR(255) NOT NULL DEFAULT '',
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        -- ---- Lightweight analytics events ----
        CREATE TABLE IF NOT EXISTS analytics_events
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type VARCHAR(50) NOT NULL DEFAULT 'pageview', -- pageview | click | conversion
            path VARCHAR(255) NOT NULL DEFAULT '',
            ref VARCHAR(255) NOT NULL DEFAULT '',
            label VARCHAR(255) NOT NULL DEFAULT '',
            ua TEXT NOT NULL DEFAULT '',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);
        CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(type);

        -- ---- Media / asset library ----
        CREATE TABLE IF NOT EXISTS media
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            url VARCHAR(255) NOT NULL,
            filename VARCHAR(255) NOT NULL DEFAULT '',
            mime VARCHAR(100) NOT NULL DEFAULT '',
            size INT NOT NULL DEFAULT 0,
            alt VARCHAR(255) NOT NULL DEFAULT '',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        -- ---- Website & GitHub audits ----
        CREATE TABLE IF NOT EXISTS audits
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            website VARCHAR(255),                           -- audited website URL
            repo VARCHAR(255),                           -- audited GitHub repo
            overall_score INT NOT NULL DEFAULT 0,  -- 0-100
            grade VARCHAR(10) NOT NULL DEFAULT 'F',  -- A-F
            summary TEXT NOT NULL DEFAULT '',   -- verdict summary
            sections TEXT NOT NULL DEFAULT '[]', -- JSON: AuditSection[]
            findings TEXT NOT NULL DEFAULT '[]', -- JSON: all findings denormalized
            external_id VARCHAR(255) NOT NULL UNIQUE,       -- nanoid() for shareable URLs
            is_public INT NOT NULL DEFAULT 1,    -- 1=public, 0=private
            view_count INT NOT NULL DEFAULT 0,    -- shareable link views
            ip_address VARCHAR(45),                          -- requester IP (for analytics)
            user_agent TEXT,                          -- requester user agent
            expires_at VARCHAR(255),                          -- auto-delete after 30 days
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_audits_external_id ON audits(external_id);
        CREATE INDEX IF NOT EXISTS idx_audits_website ON audits(website);
        CREATE INDEX IF NOT EXISTS idx_audits_repo ON audits(repo);
        CREATE INDEX IF NOT EXISTS idx_audits_created ON audits(created_at);
        CREATE INDEX IF NOT EXISTS idx_audits_expires ON audits(expires_at);

        CREATE TABLE IF NOT EXISTS audit_submissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_name VARCHAR(255) NOT NULL,
            user_email VARCHAR(255) NOT NULL,
            user_phone VARCHAR(20),
            user_company VARCHAR(255),
            audit_report_id VARCHAR(255),
            website VARCHAR(255),
            github_repo VARCHAR(255),
            priority VARCHAR(50) NOT NULL DEFAULT 'medium',
            budget_estimate VARCHAR(255),
            specific_issues TEXT,
            preferred_contact VARCHAR(50) NOT NULL DEFAULT 'email',
            audit_data TEXT NOT NULL DEFAULT '{}',
            status VARCHAR(50) NOT NULL DEFAULT 'new',
            admin_notes TEXT,
            proposed_solution TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            responded_at VARCHAR(255)
        );
        CREATE INDEX IF NOT EXISTS idx_audit_submissions_email ON audit_submissions(user_email);
        CREATE INDEX IF NOT EXISTS idx_audit_submissions_status ON audit_submissions(status);

        CREATE TABLE IF NOT EXISTS career_applications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            form_type VARCHAR(50) NOT NULL DEFAULT 'cv_submission', -- cv_submission | self_introduction
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            country VARCHAR(100),
            role_interest VARCHAR(255),
            experience_years VARCHAR(100),
            linkedin_url VARCHAR(255),
            portfolio_url VARCHAR(255),
            cover_letter TEXT,
            cv_path VARCHAR(255),
            cv_filename VARCHAR(255),
            status VARCHAR(50) NOT NULL DEFAULT 'new', -- new | reviewed | shortlisted | rejected | archived
            admin_notes TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_career_apps_email ON career_applications(email);
        CREATE INDEX IF NOT EXISTS idx_career_apps_status ON career_applications(status);
        CREATE INDEX IF NOT EXISTS idx_career_apps_type ON career_applications(form_type);

        -- ---- Job Openings (career portal postings) ----
        CREATE TABLE IF NOT EXISTS job_openings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            department VARCHAR(255) NOT NULL DEFAULT '',
            location VARCHAR(255) NOT NULL DEFAULT 'Remote',
            type VARCHAR(50) NOT NULL DEFAULT 'full-time', -- full-time | part-time | contract | remote
            experience_level VARCHAR(255) NOT NULL DEFAULT '',
            salary_range VARCHAR(255) NOT NULL DEFAULT '',
            description TEXT NOT NULL DEFAULT '',
            responsibilities TEXT NOT NULL DEFAULT '[]', -- JSON array
            requirements TEXT NOT NULL DEFAULT '[]',     -- JSON array
            nice_to_have TEXT NOT NULL DEFAULT '[]',     -- JSON array
            benefits TEXT NOT NULL DEFAULT '[]',         -- JSON array
            status VARCHAR(50) NOT NULL DEFAULT 'draft',        -- draft | published | closed
            deadline VARCHAR(255),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_job_openings_status ON job_openings(status);
    `);

    // ---- Store default settings (idempotent) ----
    const insertSetting = db.prepare(
        `INSERT
        OR IGNORE INTO store_settings (key, value) VALUES (@key, @value)`
    );
    const defaultSettings: Record<string, string> = {
        'store.name': 'Grey TechStore',
        'store.currency': 'NGN',
        'store.currency_symbol': '\u20a6',
        'store.shipping_fee': '2500',
        'store.tax_rate': '0',
        'store.usd_enabled': '1',
        'store.usd_rate': '1600',
        'payment.paystack.enabled': '0',
        'payment.paystack.public_key': '',
        'payment.paystack.secret_key': '',
        'payment.flutterwave.enabled': '0',
        'payment.flutterwave.public_key': '',
        'payment.flutterwave.secret_key': '',
        'payment.monnify.enabled': '0',
        'payment.monnify.api_key': '',
        'payment.monnify.secret_key': '',
        'payment.monnify.contract_code': '',
        'payment.monnify.base_url': 'https://sandbox.monnify.com',
        'payment.bank_transfer.enabled': '1',
        'payment.bank_transfer.bank_name': '',
        'payment.bank_transfer.account_number': '',
        'payment.bank_transfer.account_name': '',
    };
    for (const [key, value] of Object.entries(defaultSettings)) {
        insertSetting.run({key, value});
    }
}