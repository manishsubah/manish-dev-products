# Project Plan — Personal Product Showcase & Portfolio

## 1. Goal

One website where anyone can see everything I have built:

- **Products / Projects** — every app with its description, screenshots, tech stack, and
  download/visit links (APK, Google Play, App Store, web app URL, source code).
- **Portfolio** — who I am, my skills, experience, and contact links, so recruiters/clients
  can understand my work at a glance.

## 2. Tech stack (and why)

| Choice | Why |
|---|---|
| **Next.js** (React framework) | Most popular way to build websites with React; huge community, easy to learn, great docs. |
| **TypeScript** | JavaScript with types — similar feel to Kotlin/Swift/Dart, catches mistakes early. |
| **Tailwind CSS** | Style directly in markup with small utility classes; no separate CSS files to manage. |
| **Static export** (`output: "export"`) | The site builds to plain HTML/CSS/JS files. No server, no database, free hosting. |
| **JSON content files** | Projects and profile live in `content/*.json`. Adding a new app = editing one file, no UI code. |

Flutter Web was considered and rejected: slower first load, poor SEO (search engines can't
read it well), and not the normal tool for a content website.

## 3. Pages

| Route | Purpose |
|---|---|
| `/` | Home — short intro + featured projects. |
| `/projects` | Grid of all projects with platform badges. |
| `/projects/[slug]` | One project: description, features, screenshots, tech stack, all store/download links. |
| `/portfolio` | About me, skills, experience, contact, resume download. |

## 4. Content model

Each project in `content/projects.json`:

```jsonc
{
  "slug": "expense-tracker",          // used in the URL: /projects/expense-tracker
  "name": "Expense Tracker",
  "tagline": "One line summary",
  "description": "Longer paragraph",
  "platforms": ["android", "ios", "web"],
  "status": "live",                    // live | beta | in-development | archived
  "featured": true,                    // show on home page
  "icon": "/images/projects/expense-tracker/icon.png",
  "screenshots": ["/images/projects/expense-tracker/1.png"],
  "techStack": ["Flutter", "Firebase"],
  "features": ["Offline mode", "Charts"],
  "links": {
    "playStore": "https://play.google.com/store/apps/details?id=...",
    "appStore": "https://apps.apple.com/app/...",
    "apk": "https://github.com/<you>/<repo>/releases/download/v1.0.0/app.apk",
    "web": "https://...",
    "source": "https://github.com/..."
  },
  "releasedOn": "2025-06-01"
}
```

Every link is optional — only the ones you fill in are shown.

Profile/portfolio data lives in `content/profile.json` (name, role, bio, skills, experience,
socials, resume path).

### Where to put APK files

Do **not** commit APKs into this repo (they are large and bloat git history). Instead:

1. Upload the APK to **GitHub Releases** of the app's own repo (or this repo), and
2. Put the release download URL into `links.apk`.

Small APKs (< ~20 MB) *can* go in `public/apks/` as a fallback, but Releases is preferred.

## 5. Folder structure

```
my_product/
├── content/                 # ← YOU EDIT THESE to add/change projects & profile
│   ├── projects.json
│   └── profile.json
├── docs/
│   └── PLAN.md              # this file
├── public/                  # static files served as-is
│   ├── images/projects/     # icons + screenshots, one folder per project slug
│   ├── apks/                # (optional) small APK files
│   └── resume/              # resume.pdf
├── src/
│   ├── app/                 # pages (Next.js "App Router": folder = URL)
│   │   ├── layout.tsx       # shared header/footer around every page
│   │   ├── page.tsx         # home  "/"
│   │   ├── globals.css
│   │   ├── projects/
│   │   │   ├── page.tsx     # "/projects"
│   │   │   └── [slug]/page.tsx  # "/projects/<slug>"
│   │   └── portfolio/
│   │       └── page.tsx     # "/portfolio"
│   ├── components/          # reusable UI pieces (like Flutter widgets)
│   ├── lib/                 # helpers: reading content files
│   └── types/               # TypeScript types for projects/profile
├── next.config.ts
├── package.json
└── tsconfig.json
```

Mobile-dev mental map: `components/` ≈ widgets, `app/` folders ≈ routes/screens,
`content/*.json` ≈ a local data source, `types/` ≈ model classes.

## 6. Roadmap

**Phase 1 — Foundation (this step)**
- [x] Plan & folder structure
- [x] Basic pages wired to sample JSON content
- [ ] Create GitHub repo and push

**Phase 2 — Real content & design**
- [ ] Replace sample data with real projects, icons, screenshots
- [ ] Add real profile, resume PDF
- [ ] Polish design (colors, typography, dark mode, animations)
- [ ] Screenshot gallery / lightbox on project page

**Phase 3 — Launch**
- [ ] Deploy on **Vercel** (free, auto-deploys on every git push) — or GitHub Pages
- [ ] Custom domain (optional)
- [ ] SEO: page titles, descriptions, Open Graph preview images, sitemap
- [ ] Analytics (optional, e.g. Vercel Analytics)

**Phase 4 — Nice to have**
- [ ] Filter/search projects by platform or tech
- [ ] Blog / changelog per project
- [ ] Contact form
- [ ] Download counter

## 7. How to run

```bash
npm install      # once
npm run dev      # open http://localhost:3000
npm run build    # produces static site in out/
```
