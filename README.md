# catch fever

a dating app for unc students that matches people on personality, not looks. instead of endless swiping, everyone gets a small set of matches once a week.

> 🫟 in early development.

## how it works

1. **verified signup.** only `@unc.edu` emails can create an account (supabase auth).
2. **personality profile.** users answer prompts about values, interests and how they spend their time.
3. **ai matchmaking.** answers are embedded with sentence-transformers, enriched with claude haiku 4.5, and pairs are ranked with a lightgbm model.
4. **weekly match drop.** a supabase pg_cron job releases new matches each week, and an expo push notification lets users know.

## tech stack

| layer | tools |
|---|---|
| mobile app | typescript, react native, expo, expo router |
| backend | supabase (postgres, auth, edge functions, pg_cron) |
| matching | python, sentence-transformers, claude haiku 4.5, lightgbm |
| notifications | expo push notifications |

## architecture

```
signup (@unc.edu) → profile answers → embeddings + trait extraction
      → lightgbm pair ranking → weekly pg_cron drop → push notification
```

## project structure

```
catch-fever/
├── app/        expo / react native app
├── supabase/   migrations, edge functions, cron jobs
├── ml/         matching pipeline
└── docs/       architecture notes and decision records
```

## getting started

requirements: node.js lts, python 3.12, and expo go on your phone (or an android emulator).

```bash
cd app
npm install
npx expo start
```

scan the qr code with expo go, or press `a` to open the android emulator.

copy `.env.example` to `app/.env` and fill in your own keys. never commit `.env`.

## roadmap

- [x] project scaffold
- [x] connect app to supabase
- [ ] `@unc.edu` signup and email verification
- [ ] profile and personality prompts
- [ ] embedding and trait extraction pipeline
- [ ] lightgbm ranking model (trained on synthetic data)
- [ ] weekly match drop with pg_cron
- [ ] push notifications
- [ ] chat between matches

## disclaimer

this is an independent student project. it is not affiliated with, sponsored by, or endorsed by the university of north carolina at chapel hill.
