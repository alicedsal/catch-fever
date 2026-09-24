# ml

matchmaking pipeline for catch fever.

1. **embed**: turn profile answers into vectors with sentence-transformers.
2. **enrich**: use claude haiku 4.5 to extract personality traits from free-text answers.
3. **rank**: score candidate pairs with a lightgbm model.
4. **drop**: write each user's weekly matches back to supabase.

## setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

`data/` and `models/` are git-ignored. use synthetic data only until there are real users and a privacy policy.
