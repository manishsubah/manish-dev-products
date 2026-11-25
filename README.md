# My Product Showcase

A personal website listing every app I've built (with Play Store / App Store / APK / web links)
plus my portfolio.

Built with **Next.js + TypeScript + Tailwind CSS**, exported as a static site.
See [docs/PLAN.md](docs/PLAN.md) for the full plan and roadmap.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Add or edit a project

1. Open `content/projects.json` and add an entry (copy an existing one).
2. Put the icon/screenshots in `public/images/projects/<slug>/`.
3. For APKs, upload to GitHub Releases and paste the download URL into `links.apk`.

Edit your bio, skills and experience in `content/profile.json`.
Put your resume at `public/resume/resume.pdf`.

## Build

```bash
npm run build      # static site generated in out/
```
