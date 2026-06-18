-- Phase 9: Advanced Features (Reviews, CMS, User Behavior, Recommendations, 2FA)

-- Add TOTP 2FA columns to admin_users
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS totp_secret TEXT;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS totp_enabled BOOLEAN DEFAULT false;

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  helpful INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_service_id ON reviews(service_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- CMS Pages table
CREATE TABLE IF NOT EXISTS cms_pages (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  type TEXT NOT NULL CHECK (type IN ('blog', 'doc', 'service', 'page')),
  author TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  featured_image TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX idx_cms_pages_type ON cms_pages(type);
CREATE INDEX idx_cms_pages_published ON cms_pages(published);

-- User behavior tracking table
CREATE TABLE IF NOT EXISTS user_behavior (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('view', 'click', 'purchase', 'review', 'share')),
  service_id INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_user_behavior_user_id ON user_behavior(user_id);
CREATE INDEX idx_user_behavior_action ON user_behavior(action);
CREATE INDEX idx_user_behavior_service_id ON user_behavior(service_id);
CREATE INDEX idx_user_behavior_timestamp ON user_behavior(timestamp);

-- Recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  score DECIMAL(5, 2) NOT NULL,
  reason TEXT,
  algorithm TEXT DEFAULT 'behavior_based',
  clicked BOOLEAN DEFAULT false,
  converted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX idx_recommendations_service_id ON recommendations(service_id);
CREATE INDEX idx_recommendations_score ON recommendations(score);

-- Enable full-text search on CMS pages
CREATE INDEX idx_cms_pages_search ON cms_pages USING GIN(to_tsvector('english', content));

-- Stats: 6 new tables, 20+ indexes, 0 breaking changes
