-- Add revised_prompt column to store DALL-E 3's internally rewritten prompt
-- This allows debugging which style instructions survive the rewriting process
ALTER TABLE generations ADD COLUMN IF NOT EXISTS revised_prompt TEXT;
