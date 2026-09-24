# Catch Fever

A dating app for UNC students that matches people on personality, not looks. Instead of endless swiping, everyone gets a small set of matches once a week.

> 🚧 In early development.

## How it works

1. **Verified signup.** Only `@unc.edu` emails can create an account (Supabase Auth).
2. **Personality profile.** Users answer prompts about values, interests and how they spend their time.
3. **AI matchmaking.** Answers are embedded with sentence-transformers, enriched with Claude Haiku 4.5, and pairs are ranked with a LightGBM model.
4. **Weekly match drop.** A Supabase pg_cron job releases new matches each week, and an Expo push notification lets users know.

## Tech stack

| Layer | Tools |
|---|---|
| Mobile app | TypeScript, React Native, Expo, Expo Router |
| Backend | Supabase (Postgres, Auth, Edge Functions, pg_cron) |
| Matching | Python, sentence-transformers, Claude Haiku 4.5, LightGBM |
| Notifications | Expo push notifications |

## Architecture

```
signup (@unc.edu) → profile answers → embeddings + trait extraction
      → LightGBM pair ranking → weekly pg_cron drop → push notification
```

## Project structure

```
catch-fever/
├── app/        Expo / React Native app
├── supabase/   migrations, edge functions, cron jobs
├── ml/         matching pipeline
└── docs/       architecture notes and decision records
```

## Getting started

Requirements: Node.js LTS, Python 3.12, and Expo Go on your phone (or an Android emulator).

```bash
cd app
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` to open the Android emulator.

Copy `.env.example` to `.env` and fill in your own keys. Never commit `.env`.

## Roadmap

- [x] Project scaffold
- [ ] `@unc.edu` signup and email verification
- [ ] Profile and personality prompts
- [ ] Embedding and trait extraction pipeline
- [ ] LightGBM ranking model (trained on synthetic data)
- [ ] Weekly match drop with pg_cron
- [ ] Push notifications
- [ ] Chat between matches

## Disclaimer

This is an independent student project. It is not affiliated with, sponsored by, or endorsed by the University of North Carolina at Chapel Hill.
