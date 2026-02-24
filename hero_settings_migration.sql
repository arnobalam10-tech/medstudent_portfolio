-- Hero Settings Table (single-row)
CREATE TABLE hero_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  greeting TEXT DEFAULT 'Hi, There!',
  name TEXT DEFAULT 'Nafisa Alam',
  subtitle TEXT DEFAULT 'Medical student, researcher, and clinical enthusiast dedicated to bridging the gap between innovative research and patient care.',
  badge_text TEXT DEFAULT 'MBBS Candidate · Class of 2026',
  profile_image_url TEXT,
  cta_primary_text TEXT DEFAULT 'View Research',
  cta_primary_link TEXT DEFAULT '#research',
  cta_secondary_text TEXT DEFAULT 'Contact Me',
  cta_secondary_link TEXT DEFAULT '#contact',
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_linkedin TEXT,
  stats JSONB DEFAULT '[
    {"icon": "BookOpen", "value": "MBBS", "label": "Degree Program"},
    {"icon": "TrendingUp", "value": "5+", "label": "Research Projects"},
    {"icon": "Users", "value": "2000+", "label": "Patients Served"},
    {"icon": "Award", "value": "10+", "label": "Certifications"}
  ]',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default row
INSERT INTO hero_settings (id) VALUES (uuid_generate_v4());

-- ═══════════ RLS Policies ═══════════

-- Allow anyone to READ hero_settings (public site)
CREATE POLICY "Allow public read on hero_settings"
  ON hero_settings FOR SELECT
  USING (true);

-- Allow authenticated users to INSERT
CREATE POLICY "Allow authenticated insert on hero_settings"
  ON hero_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to UPDATE
CREATE POLICY "Allow authenticated update on hero_settings"
  ON hero_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to DELETE
CREATE POLICY "Allow authenticated delete on hero_settings"
  ON hero_settings FOR DELETE
  TO authenticated
  USING (true);
