# Project rules

Personal showcase website (Next.js + TypeScript + Tailwind, static export). See `docs/PLAN.md`
and `docs/GUIDE.md`. The owner is a mobile developer, not a web developer: explain web concepts
in mobile terms.

## Security & repository rules (mandatory: follow on every change)

### 1. Only necessary files go into git
- Commit only source, config and content the site needs to build: `src/`, `content/`, `public/`
  assets, `docs/`, and root config (`package.json`, `package-lock.json`, `tsconfig.json`,
  `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `README.md`, `CLAUDE.md`).
- Never commit generated output or tool-local files: `node_modules/`, `.next/`, `out/`, `.vercel/`,
  `.claude/`, `.impeccable/`, editor folders, `.DS_Store`, logs.
- Never commit binaries: `.apk`, `.aab`, `.ipa`, `.zip`. Publish them on **GitHub Releases** and
  link the URL in `content/projects.json`.
- When a new tool creates files in the project, add them to `.gitignore` before anything is committed.

### 2. No secrets or sensitive data, ever
- No API keys, tokens, passwords, private keys, keystores (`.jks`/`.keystore`), signing
  certificates (`.p12`/`.p8`/`.mobileprovision`), `google-services.json`,
  `GoogleService-Info.plist` or service-account files.
- If a secret is ever needed, it goes in `.env.local` (git-ignored) and an empty
  placeholder in `.env.example`.
- This is a static site: **everything in `src/`, `content/`, `public/` and any `NEXT_PUBLIC_*`
  variable is visible to the whole internet.** Never put a secret there.
- No machine-specific data: absolute local paths, usernames, internal hostnames or IPs.
- Personal data shown on the site (email, phone, location) only when the owner explicitly
  provides it for public display. Prefer a contact link over a phone number or home address.
- If a secret is committed by mistake: treat it as leaked, **rotate it first**, then remove it
  from history. Deleting it in a new commit is not enough.

### 3. Check before every commit
1. `git status` and `git diff --cached --stat`: every staged file must be intentional.
2. Scan staged changes for secrets:
   `git diff --cached | grep -inE "api[_-]?key|secret|token|password|private key|BEGIN .*PRIVATE"`
3. `npm run build` passes.
4. `npm audit` shows no high or critical issues (or they are explained).
- Never use `git add -A` / `git add .` blindly; review what gets staged.
- Commit or push only when the owner asks.

### 4. Safe code practices
- External links: always `target="_blank" rel="noopener noreferrer"`.
- Never use `dangerouslySetInnerHTML` with content that isn't fully controlled by the owner.
- Only `https://` URLs in `content/projects.json` links.
- Add dependencies only when needed, from well-known packages; keep `package-lock.json` committed.
- Downloads (APKs): link only to the owner's own GitHub Releases or official stores, and show
  the version (and SHA-256 checksum when available) next to the APK link.
- When deploying, set security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`) in the host config (e.g. `vercel.json`).

### 5. GitHub account settings (owner action)
- Enable **Secret scanning** and **Push protection**, and **Dependabot alerts**, under
  repo Settings → Code security.
- Turn on 2FA for the GitHub account.
