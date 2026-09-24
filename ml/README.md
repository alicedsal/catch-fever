# ml

Matchmaking pipeline for Catch Fever.

1. **Embed** — turn profile answers into vectors with sentence-transformers.
2. **Enrich** — use Claude Haiku 4.5 to extract personality traits from free-text answers.
3. **Rank** — score candidate pairs with a LightGBM model.
4. **Drop** — write each user's weekly matches back to Supabase.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

`data/` and `models/` are git-ignored. Use synthetic data only until there are real users and a privacy policy.
