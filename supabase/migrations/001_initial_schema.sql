-- Table: generations
CREATE TABLE generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_session_id TEXT NOT NULL,
  prompt_original TEXT NOT NULL,
  style_choisi TEXT NOT NULL,
  prompt_enrichi TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table: commandes
CREATE TABLE commandes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  generation_id UUID REFERENCES generations(id),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  format TEXT NOT NULL,
  message_artiste TEXT,
  statut TEXT DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'en_production', 'livree')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for faster lookups
CREATE INDEX idx_generations_session ON generations(user_session_id);
CREATE INDEX idx_commandes_email ON commandes(email);
CREATE INDEX idx_commandes_statut ON commandes(statut);

-- Storage: create a public bucket for paintings
-- Run in Supabase dashboard or via API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('paintings', 'paintings', true);
