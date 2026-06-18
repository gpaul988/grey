CREATE TABLE "analytics_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"event_type" text NOT NULL,
	"event_name" text NOT NULL,
	"properties" jsonb DEFAULT '{}'::jsonb,
	"session_id" text,
	"url" text,
	"timestamp" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_executions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"endpoint" text NOT NULL,
	"method" text NOT NULL,
	"request_body" jsonb,
	"response_status" integer,
	"response_body" jsonb,
	"execution_time" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audits" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"findings" jsonb DEFAULT '[]'::jsonb,
	"score" integer,
	"report_url" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"content" text,
	"excerpt" text,
	"author" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"published" boolean DEFAULT false,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "code_analysis" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"repository_url" text NOT NULL,
	"branch" text DEFAULT 'main',
	"analysis_type" text NOT NULL,
	"findings" jsonb DEFAULT '[]'::jsonb,
	"score" integer,
	"recommendations" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "demo_environments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"service_id" integer,
	"container_id" text,
	"url" text,
	"status" text DEFAULT 'running' NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"email" text,
	"amount" numeric(10, 2),
	"currency" text DEFAULT 'USD',
	"provider" text NOT NULL,
	"transaction_id" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"description" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "payments_transaction_id_unique" UNIQUE("transaction_id")
);
--> statement-breakpoint
CREATE TABLE "performance_benchmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"test_type" text NOT NULL,
	"results" jsonb DEFAULT '{}'::jsonb,
	"score" numeric(5, 2),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"icon" text,
	"category" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"subject" text,
	"project_type" text,
	"budget" text,
	"message" text,
	"source" text DEFAULT 'website' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tech_stack_detection" (
	"id" serial PRIMARY KEY NOT NULL,
	"website_url" text NOT NULL,
	"technologies" jsonb DEFAULT '[]'::jsonb,
	"confidence" numeric(3, 2),
	"last_scanned" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"language" text DEFAULT 'en',
	"theme" text DEFAULT 'light',
	"notifications" boolean DEFAULT true,
	"preferences" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "user_preferences_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text,
	"role" text DEFAULT 'staff' NOT NULL,
	"avatar" text,
	"phone" text,
	"status" text DEFAULT 'active' NOT NULL,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"email" text,
	"token" text NOT NULL,
	"type" text NOT NULL,
	"totp_secret" text,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "verification_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "webhook_deliveries" (
	"id" serial PRIMARY KEY NOT NULL,
	"subscription_id" integer,
	"event_type" text NOT NULL,
	"payload" jsonb,
	"status_code" integer,
	"response" jsonb,
	"retries" integer DEFAULT 0,
	"next_retry" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webhook_subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"endpoint" text NOT NULL,
	"events" jsonb DEFAULT '[]'::jsonb,
	"active" boolean DEFAULT true,
	"secret" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_analytics_events_user_id" ON "analytics_events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_analytics_events_event_type" ON "analytics_events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "idx_analytics_events_timestamp" ON "analytics_events" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "idx_api_executions_user_id" ON "api_executions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_api_executions_endpoint" ON "api_executions" USING btree ("endpoint");--> statement-breakpoint
CREATE INDEX "idx_audits_status" ON "audits" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_blog_posts_slug" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_blog_posts_published" ON "blog_posts" USING btree ("published");--> statement-breakpoint
CREATE INDEX "idx_code_analysis_user_id" ON "code_analysis" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_code_analysis_repository_url" ON "code_analysis" USING btree ("repository_url");--> statement-breakpoint
CREATE INDEX "idx_demo_environments_user_id" ON "demo_environments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_demo_environments_status" ON "demo_environments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_payments_user_id" ON "payments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_payments_status" ON "payments" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_payments_transaction_id" ON "payments" USING btree ("transaction_id");--> statement-breakpoint
CREATE INDEX "idx_performance_benchmarks_name" ON "performance_benchmarks" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_services_slug" ON "services" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_services_category" ON "services" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_submissions_email" ON "submissions" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_submissions_status" ON "submissions" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_tech_stack_detection_url" ON "tech_stack_detection" USING btree ("website_url");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_preferences_user_id" ON "user_preferences" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_users_role" ON "users" USING btree ("role");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_verification_tokens_token" ON "verification_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX "idx_verification_tokens_user_id" ON "verification_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_webhook_deliveries_subscription_id" ON "webhook_deliveries" USING btree ("subscription_id");--> statement-breakpoint
CREATE INDEX "idx_webhook_deliveries_event_type" ON "webhook_deliveries" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "idx_webhook_subscriptions_user_id" ON "webhook_subscriptions" USING btree ("user_id");