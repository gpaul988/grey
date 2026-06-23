-- Migration: Add FAQs table
-- Created: 2024-06-23
-- Purpose: Support FAQ management for the FAQ page

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(active);

-- Insert initial FAQ data (from Admin/db/faqs-seed.json)
INSERT INTO faqs (question, answer, category, sort_order, active)
VALUES 
  ('How long does a typical project take?', 'Most websites ship in 4–8 weeks; full web/mobile apps run 8–16 weeks depending on scope. We share a clear timeline after the discovery call.', 'General', 0, true),
  ('How much does a project cost?', 'Pricing depends on scope and complexity. Simple sites start from a fixed package; custom platforms are quoted after discovery. Use our instant estimator for a ballpark.', 'Pricing', 1, true),
  ('Do you offer ongoing support and maintenance?', 'Yes. We offer monthly care plans covering updates, security, backups, monitoring and priority support.', 'Support', 2, true),
  ('What technologies do you work with?', 'React, Next.js, Node, Laravel, React Native, Flutter and more. We pick the stack that best fits your goals, not the other way round.', 'General', 3, true),
  ('Do you work with clients outside Nigeria?', 'Absolutely. We partner with startups and enterprises across Africa, Europe and North America, working async across time zones.', 'General', 4, true),
  ('How do payments work?', 'Typically milestone-based: a deposit to begin, then payments tied to delivery stages. Terms are agreed upfront in your proposal.', 'Pricing', 5, true),
  ('Who are Grey InfoTech?', 'Grey InfoTech is a vibrant digital agency based in Port Harcourt, Nigeria, established in 2018. We''re passionate about crafting stunning websites, building strong brands, creating dynamic eCommerce platforms, and developing innovative mobile apps. As a web, software development company, we also specialize in digital transformation and digital marketing strategies aiming to bring our clients'' visions to life with creativity and expertise.', 'General', 6, true),
  ('How do i get started with Grey InfoTech?', 'Getting started with Grey InfoTech is simple! You can reach out to us through our contact form, email, or phone number to discuss your project requirements. Once we understand your needs, we will provide you with a detailed proposal and timeline for your project. Upon your approval, we will begin the design and development process, keeping you informed and involved at every step. Our goal is to deliver a digital solution that exceeds your expectations and drives your business forward.', 'General', 7, true),
  ('Who are your typical clients?', 'We partner with a diverse array of clients, ranging from innovative startups to established enterprises across multiple industries, including retail, healthcare, education, finance, and technology. Whether you are a small business or a large corporation, we are dedicated to helping you achieve success and visibility in the digital landscape.', 'General', 8, true),
  ('Can you describe your web design process?', 'Certainly! Our web design process is both comprehensive and enjoyable. We begin by understanding your goals and vision, which allows us to plan the website''s structure and content effectively. Next, we move into the design phase, creating visually appealing mockups and prototypes. Once approved, we proceed to development, followed by thorough testing and the final launch. Throughout the process, we maintain open communication, ensuring that your feedback is integrated at every stage. On average, our projects are completed within 8-16 weeks.', 'General', 9, true),
  ('What type of website does Grey InfoTech create?', 'We specialize in creating a wide variety of websites, including sophisticated corporate sites, feature-rich eCommerce platforms, visually striking portfolio sites, engaging blogs, and custom web applications. Our designs are fully responsive, ensuring optimal performance and a seamless user experience across all devices, whether desktop, tablet, or smartphone.', 'General', 10, true);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_faq_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS faq_timestamp_trigger ON faqs;
CREATE TRIGGER faq_timestamp_trigger
BEFORE UPDATE ON faqs
FOR EACH ROW
EXECUTE FUNCTION update_faq_timestamp();
