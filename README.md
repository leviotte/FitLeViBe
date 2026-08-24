# Fit met Levi

Public site for **Levi Otte**, persoonlijk coach in Roosdaal, België.

- Visible name: **Fit met Levi**
- Legal / social / domain handle: FitLeViBe (`fitlevibe.com`, Instagram & Facebook `@FitLeViBe`)
- Levi is an independent Herbalife member. This is not herbalife.com.

## Locales

Dutch (nl-BE) is the default at `/`. Language editions:

| Locale | Path |
| --- | --- |
| Dutch (Belgium) | `/` |
| French | `/fr` |
| English | `/en` |
| Spanish | `/es` |

Copy lives in `messages/{nl,fr,en,es}.json`. The public name **Fit met Levi** is unchanged in every language.

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

FitCheck (`submitFitCheckAction` on `/` and `/fitcheck`, including `/fr` `/en` `/es` equivalents — never `/start`) emails each lead to **fitlevibe@icloud.com** via [Resend](https://resend.com).

| Variable | Required | Role |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for mail to send | Add this on Vercel. Without it the form shows a clear error instead of fake success. |

From-address is hardcoded: `Fit met Levi <noreply@myfiletracker.com>` (the verified Resend domain). Do not send from `fitlevibe.com` until that domain is verified in Resend.

The one.com Website Builder contact form is not used. Do not put secrets in the repo.

## Pages

| Path (Dutch / others) | Role |
| --- | --- |
| `/`, `/fr`, `/en`, `/es` | Homepage |
| `/programmas`, `/fr/programmes`, `/en/programs`, `/es/programas` | Three programs → FitCheck with goal prefilled |
| `/fitcheck` (same segment in every locale) | Dedicated FitCheck form |
| `/start` (same segment in every locale) | Enroll + Telegram community |
| `/over`, `/fr/a-propos`, `/en/about`, `/es/sobre` | About Levi |
| `/privacy`, `/fr/confidentialite`, `/en/privacy`, `/es/privacidad` | Short privacy note |

The enroll URL on `/start` is exact (query `locale=nl-BE` is not rewritten per page language). Telegram is only https://t.me/fitlevibe.

Production branch: `main`.
