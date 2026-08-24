# Fit met Levi

Public site for **Levi Otte**, persoonlijk coach in Roosdaal, België.

- Visible name: **Fit met Levi**
- Legal / social / domain handle: FitLeViBe (`fitlevibe.com`, Instagram & Facebook `@FitLeViBe`)
- Levi is an independent Herbalife member. This is not herbalife.com.

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

FitCheck (`submitFitCheckAction` on `/` and `/fitcheck` only — never `/start`) emails each lead to **fitlevibe@icloud.com** via [Resend](https://resend.com).

| Variable | Required | Role |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for mail to send | Add this on Vercel. Without it the form shows a clear error instead of fake success. |
| `RESEND_FROM` | No | Defaults to `Fit met Levi <noreply@fitlevibe.com>`. If that domain is not verified, the mailer retries `Fit met Levi <onboarding@resend.dev>`. |

The one.com Website Builder contact form is not used. Do not put secrets in the repo.

## Pages

| Path | Role |
| --- | --- |
| `/` | Homepage |
| `/programmas` | Three programs → FitCheck with goal prefilled |
| `/fitcheck` | Dedicated FitCheck form |
| `/start` | Enroll + Telegram community |
| `/over` | About Levi |
| `/privacy` | Short privacy note |

Production branch: `main`.
