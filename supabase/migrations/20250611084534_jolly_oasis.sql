/*
  # Initial Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `platform` (text)
      - `created_at` (timestamp)
    
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `tags` (text array)
      - `category_id` (uuid, foreign key)
      - `platform` (text)
      - `file_url` (text)
      - `thumb_url` (text, nullable)
      - `download_count` (integer, default 0)
      - `like_count` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `uploads`
      - `id` (uuid, primary key)
      - `user_id` (text)
      - `title` (text)
      - `description` (text)
      - `file_url` (text)
      - `category_id` (uuid, foreign key)
      - `platform` (text)
      - `tags` (text array)
      - `status` (enum: pending, approved, rejected)
      - `approval_notes` (text, nullable)
      - `created_at` (timestamp)
    
    - `requests`
      - `id` (uuid, primary key)
      - `user_email` (text)
      - `title` (text)
      - `description` (text)
      - `platform` (text)
      - `fulfilled` (boolean, default false)
      - `created_at` (timestamp)
    
    - `comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key)
      - `user_id` (text)
      - `content` (text)
      - `created_at` (timestamp)
    
    - `votes`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key)
      - `user_id` (text)
      - `created_at` (timestamp)
    
    - `admin_logs`
      - `id` (uuid, primary key)
      - `admin_id` (text)
      - `action` (text)
      - `entity_type` (text)
      - `entity_id` (text)
      - `details` (text)
      - `created_at` (timestamp)
    
    - `settings`
      - `key` (text, primary key)
      - `value` (text)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-only policies for sensitive operations
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  platform text NOT NULL DEFAULT 'all',
  created_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  tags text[] DEFAULT '{}',
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  platform text NOT NULL,
  file_url text NOT NULL,
  thumb_url text,
  download_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create uploads table
CREATE TABLE IF NOT EXISTS uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  file_url text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  platform text NOT NULL,
  tags text[] DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approval_notes text,
  created_at timestamptz DEFAULT now()
);

-- Create requests table
CREATE TABLE IF NOT EXISTS requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  platform text NOT NULL,
  fulfilled boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create admin_logs table
CREATE TABLE IF NOT EXISTS admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id text NOT NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  details text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Posts policies (public read)
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  TO public
  USING (true);

-- Uploads policies (users can create, admins can manage)
CREATE POLICY "Users can create uploads"
  ON uploads FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own uploads"
  ON uploads FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Requests policies (anyone can create, public read)
CREATE POLICY "Anyone can create requests"
  ON requests FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Requests are viewable by everyone"
  ON requests FOR SELECT
  TO public
  USING (true);

-- Comments policies (authenticated users)
CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Votes policies (authenticated users, one per post)
CREATE POLICY "Authenticated users can vote"
  ON votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can view all votes"
  ON votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete their own votes"
  ON votes FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Admin logs policies (admin only)
CREATE POLICY "Admin logs are admin only"
  ON admin_logs FOR ALL
  TO authenticated
  USING (auth.uid()::text IN (
    SELECT user_id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
  ));

-- Settings policies (public read, admin write)
CREATE POLICY "Settings are viewable by everyone"
  ON settings FOR SELECT
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_category_id ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_platform ON posts(platform);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_download_count ON posts(download_count DESC);
CREATE INDEX IF NOT EXISTS idx_posts_like_count ON posts(like_count DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_votes_post_id ON votes(post_id);
CREATE INDEX IF NOT EXISTS idx_uploads_user_id ON uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_uploads_status ON uploads(status);

-- Insert default categories
INSERT INTO categories (name, slug, platform) VALUES
  ('Games', 'games', 'all'),
  ('Apps', 'apps', 'all'),
  ('Tools', 'tools', 'all'),
  ('Resources', 'resources', 'all'),
  ('PC Games', 'pc-games', 'pc'),
  ('Mobile Games', 'mobile-games', 'mobile'),
  ('Android Apps', 'android-apps', 'android'),
  ('iOS Apps', 'ios-apps', 'ios'),
  ('Utilities', 'utilities', 'pc'),
  ('Productivity', 'productivity', 'all')
ON CONFLICT (slug) DO NOTHING;

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('site_title', 'Archive'),
  ('site_description', 'Your Ultimate Resource Hub'),
  ('uploads_enabled', 'true'),
  ('requests_enabled', 'true'),
  ('comments_enabled', 'true'),
  ('voting_enabled', 'true'),
  ('max_upload_size', '100'),
  ('featured_categories', '["games", "apps", "tools", "resources"]')
ON CONFLICT (key) DO NOTHING;