LNS Unified — Full package (styled dashboards & seeded demo data)

Generated: 2025-09-06T19:21:53.375726Z

This package includes a production-like scaffold for the LNS system:
- Next.js app with Tailwind CSS and styled dashboards for Learner, Coach, Provider, Hiring, Evaluator, Manager, Admin.
- API routes for assessment (adaptive IRT), recommendations (explainable), persona (OpenAI-powered if OPENAI_API_KEY is set), ads logging and progress tracking.
- Supabase migration SQL and seed scripts (you will run these on your Supabase project).
- data/courses.dataset.json with 5 roles real + placeholders for other 20 roles.
- Demo auth seeder script to create email/password demo users.

Important:
- Do NOT commit your SUPABASE_SERVICE_ROLE_KEY or OPENAI_API_KEY to public repos.
- Run migrations in Supabase SQL editor before running seed scripts.
- Seed scripts expect SUPABASE_SERVICE_ROLE_KEY to be set in your environment when running locally.

Quickstart (local):
1. npm install
2. Create Supabase project and run SQL in supabase/migrations/20250906_lns_full.sql
3. Copy .env.example -> .env.local and fill values (including SUPABASE_SERVICE_ROLE_KEY for seeding)
4. npm run seed-db
5. npm run seed-auth
6. npm run dev
7. Open http://localhost:3000

If you provided OPENAI_API_KEY earlier, the app will use it (via process.env.OPENAI_API_KEY). If not present, the app runs in fallback mode for AI features.
