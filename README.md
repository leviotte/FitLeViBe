# Fit met Levi

Public site for **Levi Otte**, persoonlijk coach in Roosdaal, België.

- Visible name: **Fit met Levi**
- Canonical host: `https://www.fitlevibe.com` (apex 308s to www)
- Legal / social / domain handle: FitLeViBe (`fitlevibe.com`, Instagram & Facebook `@FitLeViBe`)
- Levi is an independent Herbalife member. This is not herbalife.com.

## Locales

Dutch (nl-BE) is the default at `/`. Language editions:

| Locale | Path |
| --- | --- |
| Dutch (Belgium) | `/` |
| French | `/fr` |
| English | `/en` |

Copy lives in `messages/{nl,fr,en}.json`. Spanish was removed on 2026-10-03; every `/es` and `/es/*` URL 301s to the Dutch page (see `next.config.ts`). The public name **Fit met Levi** is unchanged in every language.

## Run locally

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Environment

Copy `.env.example` to `.env.local`.

FitCheck (`submitFitCheckAction` on `/` and `/fitcheck`, including `/fr` `/en` equivalents — never `/start`) emails each lead to **fitlevibe@icloud.com** via [Resend](https://resend.com).

| Variable | Required | Role |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for mail to send | Add this on Vercel. Without it the form shows a clear error instead of fake success. |
| `GOOGLE_PLACES_API_KEY` | Optional | Server-only key restricted to Places API (New). Powers the Google reviews section on the homepage. |
| `FITLEVIBE_PLACE_ID` | Optional | Google place id of the business profile: `ChIJz7JbPl-5w0cRFfg8dEa0_Bg`. |

The Google reviews section (rating, count, up to 3 reviews, Google Maps attribution, link to the profile) is fetched server-side from Places API (New) Place Details and cached 24 h per language (≈4 calls/day, free tier). If either variable is missing or Google fails, the section renders nothing. There is deliberately **no** `AggregateRating`/`Review` structured data for the business.

From-address is hardcoded: `Fit met Levi <noreply@myfiletracker.com>` (the verified Resend domain). Do not send from `fitlevibe.com` until that domain is verified in Resend.

The one.com Website Builder contact form is not used. Do not put secrets in the repo.

## Pages

| Path (Dutch / others) | Role |
| --- | --- |
| `/`, `/fr`, `/en` | Homepage |
| `/programmas`, `/fr/programmes`, `/en/programs` | Three programs → FitCheck with goal prefilled |
| `/fitcheck` (same segment in every locale) | Dedicated FitCheck form |
| `/start` (same segment in every locale) | Enroll + Telegram community |
| `/over`, `/fr/a-propos`, `/en/about` | About Levi |
| `/privacy`, `/fr/confidentialite`, `/en/privacy` | Short privacy note |

The enroll URL on `/start` is exact (query `locale=nl-BE` is not rewritten per page language). Telegram is only https://t.me/fitlevibe.

Production branch: `main`.
