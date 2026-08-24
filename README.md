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

Copy `.env.example` to `.env.local`. Nothing is required for the UI.

FitCheck is a server action (`submitFitCheckAction`):

1. If `RESEND_API_KEY`, `RESEND_FROM`, and `FITCHECK_TO_EMAIL` are set, a notification email is sent.
2. Else if Firebase Admin env vars are set, the row is written to the `fitchecks` collection.
3. Else the UI still shows success and the server logs an error so production never dies on a missing key.

Do not put secrets in the repo.

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
