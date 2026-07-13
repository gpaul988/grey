-- Migration: Add Submissions table
-- Purpose: Store form submissions from the contact/quote request form

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT,
    project_type TEXT,
    budget TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    status TEXT DEFAULT 'new',
    company_name TEXT,
    currency TEXT DEFAULT 'USD',
    timeline TEXT,
    project_type_other TEXT,
    additional_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_project_type ON submissions(project_type);

-- Create trigger to auto-update updated_at
CREATE TRIGGER IF NOT EXISTS submissions_update_timestamp
AFTER UPDATE ON submissions
FOR EACH ROW
BEGIN
    UPDATE submissions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
