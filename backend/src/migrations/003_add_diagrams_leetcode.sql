ALTER TABLE topics ADD COLUMN IF NOT EXISTS display_number VARCHAR(10);
ALTER TABLE topics ADD COLUMN IF NOT EXISTS diagram_svg TEXT;
ALTER TABLE topics ADD COLUMN IF NOT EXISTS diagram_description TEXT;

CREATE TABLE IF NOT EXISTS leetcode_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  title VARCHAR(255) NOT NULL,
  link VARCHAR(500) NOT NULL,
  problem_number INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leetcode_topic_id ON leetcode_questions(topic_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_leetcode_topic_problem ON leetcode_questions(topic_id, problem_number);
CREATE INDEX IF NOT EXISTS idx_topics_display_number ON topics(display_number);
