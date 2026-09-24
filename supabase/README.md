# supabase

Backend for Catch Fever: database schema, auth rules and scheduled jobs.

Planned contents (created with the Supabase CLI via `npx supabase init`):

- `migrations/` — SQL for tables (profiles, answers, matches) and row-level security policies
- `functions/` — edge functions, e.g. sending Expo push notifications and calling Claude
- pg_cron job that runs the weekly match drop

Signup is restricted to verified `@unc.edu` emails through Supabase Auth.
