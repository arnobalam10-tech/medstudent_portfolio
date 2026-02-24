-- Add footer customization fields to hero_settings
ALTER TABLE hero_settings
ADD COLUMN IF NOT EXISTS footer_label TEXT DEFAULT 'Get in Touch',
ADD COLUMN IF NOT EXISTS footer_heading TEXT DEFAULT 'Let''s Connect',
ADD COLUMN IF NOT EXISTS footer_description TEXT DEFAULT 'I''m always open to discussing research collaborations, medical insights, or professional opportunities.',
ADD COLUMN IF NOT EXISTS footer_copyright TEXT DEFAULT '';
