-- Add section_visibility column to hero_settings
-- This stores which sections are visible on the public site

ALTER TABLE hero_settings
ADD COLUMN IF NOT EXISTS section_visibility JSONB DEFAULT '{
  "stats": true,
  "academics": true,
  "experience": true,
  "research": true,
  "awards": true,
  "extracurriculars": true
}';
