# Atelier Toile — Peintures personnalisées par IA

Plateforme web où un utilisateur décrit la peinture de ses rêves, une IA (DALL-E 3) génère une visualisation, et un artiste partenaire réalise ensuite la peinture à la main.

## Stack technique

- **Frontend + Backend** : Next.js 15 (App Router, TypeScript)
- **Styling** : Tailwind CSS
- **Base de données** : Supabase (PostgreSQL + Storage)
- **Génération d'image** : DALL-E 3 via API OpenAI
- **Emails** : Resend
- **i18n** : next-intl (FR / EN)

## Prérequis

- Node.js 18+
- Un projet Supabase (gratuit)
- Une clé API OpenAI
- Une clé API Resend (optionnel pour le dev)

## Installation

```bash
# Cloner le repo
git clone <repo-url>
cd art

# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Lancer en développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## Configuration Supabase

1. Créer un nouveau projet sur [supabase.com](https://supabase.com)
2. Exécuter la migration SQL dans l'éditeur SQL :
   - Fichier : `supabase/migrations/001_initial_schema.sql`
3. Créer un bucket Storage nommé `paintings` (public)
4. Copier l'URL du projet et les clés dans `.env.local`

## Variables d'environnement

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role Supabase |
| `OPENAI_API_KEY` | Clé API OpenAI |
| `RESEND_API_KEY` | Clé API Resend |
| `ADMIN_EMAIL` | Email admin pour les notifications |

## Structure du projet

```
src/
├── app/
│   ├── [locale]/          # Pages avec i18n (FR/EN)
│   │   ├── page.tsx       # Page d'accueil
│   │   └── create/        # Interface de création
│   └── api/               # API Routes
│       ├── generate/      # Génération DALL-E 3
│       └── order/         # Soumission commande
├── components/            # Composants React
├── i18n/                  # Configuration next-intl
└── lib/                   # Utilitaires (Supabase, styles, email)
messages/                  # Fichiers de traduction FR/EN
supabase/migrations/       # Schéma SQL
```

## Déploiement Vercel

1. Connecter le repo à Vercel
2. Ajouter toutes les variables d'environnement
3. Déployer
