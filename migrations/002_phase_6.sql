-- Phase 6 Schema: Analytics, Payments, i18n

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  properties JSONB DEFAULT '{}',
  url TEXT,
  user_agent TEXT,
  ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT event_type_check CHECK (event_type IN ('page_view', 'conversion', 'click', 'form_submit', 'error', 'custom'))
);

CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_properties ON analytics_events USING GIN(properties);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50) NOT NULL,
  stripe_intent_id VARCHAR(255),
  stripe_charge_id VARCHAR(255),
  paypal_order_id VARCHAR(255),
  paypal_capture_id VARCHAR(255),
  error TEXT,
  metadata JSONB DEFAULT '{}',
  refunded_amount DECIMAL(10, 2) DEFAULT 0,
  refunded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT provider_check CHECK (provider IN ('stripe', 'paypal', 'square', 'wise')),
  CONSTRAINT status_check CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded', 'cancelled'))
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_provider ON payments(provider);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created ON payments(created_at DESC);
CREATE INDEX idx_payments_stripe_intent ON payments(stripe_intent_id) WHERE stripe_intent_id IS NOT NULL;
CREATE INDEX idx_payments_paypal_order ON payments(paypal_order_id) WHERE paypal_order_id IS NOT NULL;

-- User Preferences Table (for language, locale, etc.)
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  language VARCHAR(5) DEFAULT 'en',
  currency VARCHAR(3) DEFAULT 'USD',
  timezone VARCHAR(50) DEFAULT 'UTC',
  theme VARCHAR(20) DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT true,
  email_frequency VARCHAR(50) DEFAULT 'weekly',
  marketing_consent BOOLEAN DEFAULT false,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_prefs_user ON user_preferences(user_id);
CREATE INDEX idx_user_prefs_language ON user_preferences(language);

-- Analytics Cohorts (for cohort analysis)
CREATE TABLE IF NOT EXISTS analytics_cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  property VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  user_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(property, value)
);

CREATE INDEX idx_cohorts_property ON analytics_cohorts(property);
CREATE INDEX idx_cohorts_value ON analytics_cohorts(value);

-- Conversion Funnels (for funnel analysis)
CREATE TABLE IF NOT EXISTS conversion_funnels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  steps TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS funnel_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funnel_id UUID NOT NULL REFERENCES conversion_funnels(id) ON DELETE CASCADE,
  step_name VARCHAR(255) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX_ORDER INTEGER
);

CREATE INDEX idx_funnel_steps_funnel ON funnel_steps(funnel_id);
CREATE INDEX idx_funnel_steps_session ON funnel_steps(session_id);
CREATE INDEX idx_funnel_steps_user ON funnel_steps(user_id);

-- Webhooks Delivery Log (for reliability)
CREATE TABLE IF NOT EXISTS webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id UUID REFERENCES webhooks(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  response_code INTEGER,
  response_body TEXT,
  attempts INTEGER DEFAULT 1,
  last_attempted_at TIMESTAMP,
  next_retry_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT delivery_status_check CHECK (status IN ('pending', 'delivered', 'failed', 'skipped'))
);

CREATE INDEX idx_deliveries_webhook ON webhook_deliveries(webhook_id);
CREATE INDEX idx_deliveries_event ON webhook_deliveries(event_id);
CREATE INDEX idx_deliveries_status ON webhook_deliveries(status);
CREATE INDEX idx_deliveries_retry ON webhook_deliveries(next_retry_at) WHERE status = 'pending';

-- Transactions for Audit Trail
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(255) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_resource ON audit_log(resource_type, resource_id);
CREATE INDEX idx_audit_created ON audit_log(created_at DESC);

-- Phase 6 Migration Metadata
CREATE TABLE IF NOT EXISTS migrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO migrations (name) VALUES ('002_phase_6') ON CONFLICT DO NOTHING;
