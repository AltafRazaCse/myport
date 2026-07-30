# Admin Dashboard + AI — Setup Guide

Your whole site's text lives in `src/content/*.json` and is editable from a visual
admin dashboard at **`/admin`** (Decap CMS). Saving in the dashboard commits to
GitHub → Netlify rebuilds → site updates in ~1 minute.

API keys are **never** stored in the repo — only in Netlify environment variables.

---

## 1. GitHub OAuth App (so you can log into `/admin`)

1. Go to https://github.com/settings/developers → **New OAuth App**
2. Fill in:
   - **Application name:** Altaf Portfolio CMS
   - **Homepage URL:** `https://your-site-url.netlify.app`
   - **Authorization callback URL:** `https://your-site-url.netlify.app/.netlify/functions/callback`
3. Create it, then copy the **Client ID** and generate a **Client Secret**.

## 2. Netlify environment variables

Netlify → your site → **Site settings → Environment variables** → add:

| Key | Value |
| --- | --- |
| `OAUTH_GITHUB_CLIENT_ID` | (from step 1) |
| `OAUTH_GITHUB_CLIENT_SECRET` | (from step 1) |
| `AI_PROVIDER` | `groq` (or `gemini`) |
| `GROQ_API_KEY` | free key from https://console.groq.com/keys |
| `GEMINI_API_KEY` | (only if `AI_PROVIDER=gemini`) from https://aistudio.google.com/apikey |

Then **redeploy** (Netlify → Deploys → Trigger deploy).

## 3. Use it

- Open `https://your-site-url.netlify.app/admin`
- Click **Login with GitHub**
- Edit any section (Hero, About, Projects, AI Assistant, …) → **Publish**
- Wait ~1 min for the rebuild → changes are live.

> The repo is **public**, so only **content text** is committed. API keys stay in
> Netlify env and are never exposed.

---

## Local editing (optional)

```bash
# terminal 1 — Decap local proxy (lets /admin write to your local files)
npx decap-server

# terminal 2 — the site
npm run dev
```

Then open http://localhost:5173/admin (uses `local_backend`, no GitHub login needed locally).

For the local AI to answer, copy `.env.example` → `.env` and add your key.
