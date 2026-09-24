# supabase

backend for catch fever: database schema, auth rules and scheduled jobs.

planned contents (created with the supabase cli via `npx supabase init`):

- `migrations/`: sql for tables (profiles, answers, matches) and row-level security policies
- `functions/`: edge functions, e.g. sending expo push notifications and calling claude
- pg_cron job that runs the weekly match drop

signup is restricted to verified `@unc.edu` emails through supabase auth.
