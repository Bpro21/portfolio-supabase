-- RUN THIS SCRIPT if you already have the "profiles" table
-- This will only add the missing columns for the "Get In Touch" section

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS social_links TEXT,
ADD COLUMN IF NOT EXISTS contact_title TEXT,
ADD COLUMN IF NOT EXISTS contact_description TEXT;
