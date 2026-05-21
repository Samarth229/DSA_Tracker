-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  streak_count INT DEFAULT 0,
  last_activity_date DATE,
  email_verified BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP
);

-- Topics
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  tier VARCHAR(20) CHECK (tier IN ('Basic', 'Advanced')),
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  simple_definition TEXT NOT NULL,
  real_world_uses JSONB NOT NULL DEFAULT '{"examples":[]}',
  prerequisites JSONB DEFAULT '[]',
  order_in_sequence INT,
  difficulty_rating DECIMAL(2,1),
  estimated_hours INT,
  youtube_search_query VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Topic attempts
CREATE TABLE IF NOT EXISTS topic_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES topics(id),
  difficulty_selected VARCHAR(20) CHECK (difficulty_selected IN ('easy', 'medium', 'hard')),
  attempt_status VARCHAR(20) CHECK (attempt_status IN ('solved', 'attempted', 'skipped')),
  time_taken INT,
  perceived_difficulty VARCHAR(20),
  timestamp_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  timestamp_logged TIMESTAMP,
  prompt_version VARCHAR(10) DEFAULT '1.0',
  ai_service VARCHAR(50),
  notes TEXT,
  questions_received TEXT
);

CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON topic_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_topic_id ON topic_attempts(topic_id);

-- User topic strength (cached/derived)
CREATE TABLE IF NOT EXISTS user_topic_strength (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES topics(id),
  solved_count INT DEFAULT 0,
  attempted_count INT DEFAULT 0,
  accuracy DECIMAL(5,2),
  avg_time_taken INT,
  last_practiced TIMESTAMP,
  is_weak_topic BOOLEAN DEFAULT FALSE,
  mastery_level VARCHAR(20) DEFAULT 'not_started',
  next_review_date TIMESTAMP,
  UNIQUE(user_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_strength_user_id ON user_topic_strength(user_id);

-- Prompt templates
CREATE TABLE IF NOT EXISTS prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id),
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  template_text TEXT NOT NULL,
  focus_area VARCHAR(100),
  version VARCHAR(10) DEFAULT '1.0',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id UUID,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit_logs(user_id);
