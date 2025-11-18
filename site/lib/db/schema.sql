-- Wetherbee Foundation Database Schema
-- PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Applications Table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Applicant Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  oxford_house VARCHAR(255) NOT NULL,
  move_in_date DATE NOT NULL,

  -- Application Content
  story TEXT NOT NULL,
  why_deserve TEXT NOT NULL,

  -- Admin Management
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'selected', 'declined', 'contacted')),
  admin_notes TEXT,
  reviewed_by VARCHAR(255),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  selected_at TIMESTAMP WITH TIME ZONE,
  notified_at TIMESTAMP WITH TIME ZONE,

  -- Tracking
  ip_address VARCHAR(45),
  user_agent TEXT,
  application_number SERIAL
);

-- Indexes for Applications
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_move_in_date ON applications(move_in_date);

-- Winners Table
CREATE TABLE winners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Winner Information
  name VARCHAR(255) NOT NULL,
  oxford_house VARCHAR(255) NOT NULL,
  month_awarded VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL,

  -- Photo
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT,
  photo_uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Optional Content
  story TEXT,
  testimonial TEXT,
  social_media_shared BOOLEAN DEFAULT FALSE,

  -- Admin Management
  uploaded_by VARCHAR(255) NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,

  -- Link to Application (optional)
  application_id UUID REFERENCES applications(id) ON DELETE SET NULL
);

-- Indexes for Winners
CREATE INDEX idx_winners_year ON winners(year DESC);
CREATE INDEX idx_winners_published ON winners(is_published, display_order);
CREATE INDEX idx_winners_application_id ON winners(application_id);

-- Admin Users Table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Log Table
CREATE TABLE email_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  template VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  gmail_message_id VARCHAR(255),
  related_application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
  sent_by VARCHAR(255) NOT NULL
);

-- Indexes for Email Log
CREATE INDEX idx_email_log_sent_at ON email_log(sent_at DESC);
CREATE INDEX idx_email_log_related_app ON email_log(related_application_id);
CREATE INDEX idx_email_log_to_email ON email_log(to_email);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed initial admin user
INSERT INTO admin_users (email, name, role)
VALUES ('wetherbeefoundation@oxfordhouse.us', 'Foundation Admin', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- Comments for documentation
COMMENT ON TABLE applications IS 'Scholarship applications from Oxford House residents';
COMMENT ON TABLE winners IS 'Selected scholarship recipients with photos';
COMMENT ON TABLE admin_users IS 'Whitelisted admin users for dashboard access';
COMMENT ON TABLE email_log IS 'Log of all emails sent by the system';

COMMENT ON COLUMN applications.move_in_date IS 'Must be within 60 days of application';
COMMENT ON COLUMN applications.status IS 'Application status: pending, selected, declined, contacted';
COMMENT ON COLUMN winners.display_order IS 'Order in which winners appear in gallery (lower = earlier)';
