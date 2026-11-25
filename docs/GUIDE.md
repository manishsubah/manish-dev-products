# Project Guide (for mobile developers)

This explains the project using ideas you already know from Android, iOS and Flutter.

---

## 1. Tech stack: what each part is

| Tool | What it does | What it's like in mobile |
|---|---|---|
| **Node.js + npm** | Runs JavaScript tools on your computer and installs packages | Gradle / CocoaPods / `flutter pub` |
| **TypeScript** | The language (JavaScript with types) | Kotlin / Swift / Dart |
| **React** | Declarative UI: describe the UI as a function of data | Jetpack Compose / SwiftUI / Flutter widgets |
| **Next.js** | Framework around React: routing, building, optimizing | The Flutter framework + its navigation, or the Android app framework |
| **Tailwind CSS** | Styling via short class names like `p-4 text-lg` | Compose `Modifier`s / SwiftUI view modifiers |
| **JSON files** | Where your data lives (projects, profile) | A bundled local JSON asset / local DB |

**React in one line:** a component is a function that takes data and returns UI.

```tsx
// React (TypeScript)                        // Jetpack Compose (Kotlin)
function Greeting({ name }: { name: string }) {   // @Composable fun Greeting(name: String) {
  return <h1 className="text-2xl">Hi {name}</h1>;  //   Text("Hi $name", fontSize = 24.sp)
}                                                  // }
```

The `<h1>…</h1>` syntax inside TypeScript is called **JSX/TSX**. It's just how React writes UI,
the same way Flutter nests `Text(...)` inside `Column(...)`.

---

## 2. Project structure

```
my_product/
│
├── content/                    ◀ DATA: you edit this most
│   ├── projects.json           your apps, links, APKs, store URLs
│   └── profile.json            your name, bio, skills, experience
│
├── public/                     ◀ ASSETS (like res/drawable or assets/ in Flutter)
│   ├── images/projects/        app icons & screenshots
│   ├── apks/                   (optional) small APK files
│   └── resume/                 resume.pdf
│
├── src/                        ◀ ALL CODE
│   ├── app/                    ◀ PAGES / SCREENS (routing)
│   │   ├── layout.tsx          wraps every page (header + footer) ≈ Scaffold
│   │   ├── globals.css         ◀ DESIGN SYSTEM: colors / theme
│   │   ├── page.tsx            Home screen          →  /
│   │   ├── projects/
│   │   │   ├── page.tsx        Projects list screen →  /projects
│   │   │   └── [slug]/page.tsx Project detail       →  /projects/<any-slug>
│   │   └── portfolio/
│   │       └── page.tsx        Portfolio screen     →  /portfolio
│   │
│   ├── components/             ◀ UI: reusable widgets
│   │   ├── Header.tsx          top nav bar
│   │   ├── Footer.tsx          bottom bar with social links
│   │   ├── ProjectCard.tsx     one card in the projects grid
│   │   ├── PlatformBadges.tsx  "Android / iOS / Web / Live" chips
│   │   └── StoreLinks.tsx      Play Store / App Store / APK / Web buttons
│   │
│   ├── lib/                    ◀ LOGIC: like a Repository
│   │   └── content.ts          reads JSON, sorts, filters, finds by slug
│   │
│   └── types/                  ◀ MODELS: like data classes
│       └── content.ts          Project, Profile, ProjectLinks types
│
├── docs/                       plan + this guide
├── package.json                ◀ dependencies + scripts ≈ build.gradle / pubspec.yaml
├── next.config.ts              build settings
├── tsconfig.json               TypeScript compiler settings
├── postcss.config.mjs          turns on Tailwind (don't touch)
├── node_modules/               downloaded packages (auto-generated; never edit, not in git)
├── .next/ , out/               build output (auto-generated; not in git)
└── .gitignore
```

### Where is what? (quick lookup)

| You want to change… | Open this file |
|---|---|
| Add/edit an app, its links or APK | `content/projects.json` |
| Your bio, skills, experience | `content/profile.json` |
| Colors / theme / dark mode | `src/app/globals.css` |
| How a project card looks | `src/components/ProjectCard.tsx` |
| The download buttons | `src/components/StoreLinks.tsx` |
| Top menu items | `src/components/Header.tsx` |
| Home page layout | `src/app/page.tsx` |
| Project detail page layout | `src/app/projects/[slug]/page.tsx` |
| Portfolio page layout | `src/app/portfolio/page.tsx` |
| Sorting/filtering logic | `src/lib/content.ts` |
| Add a new field to projects | `src/types/content.ts` first, then the JSON, then the UI |

---

## 3. The three layers: UI, logic, pages

Same layering as a typical MVVM / clean-architecture mobile app:

```
content/*.json       →  src/lib/content.ts   →  src/app/**/page.tsx   →  src/components/*.tsx
(data source)           (repository/logic)      (screens)                (widgets)
                        src/types/content.ts
                        (models)
```

- **Pages code** = `src/app/`. Each `page.tsx` is one screen.
- **UI code** = `src/components/`. Small reusable pieces the pages put together.
- **Logic code** = `src/lib/`. Plain functions, no UI.
- **Models** = `src/types/`. The data shapes, so TypeScript catches typos (like a Kotlin data class).
- **Data** = `content/`. No code at all.

---

## 4. How routing works (no navigation graph needed)

In Next.js, **the folder path is the URL**. You never register routes.

| File | URL |
|---|---|
| `src/app/page.tsx` | `/` |
| `src/app/projects/page.tsx` | `/projects` |
| `src/app/projects/[slug]/page.tsx` | `/projects/anything` |
| `src/app/portfolio/page.tsx` | `/portfolio` |

`[slug]` in square brackets is a **route parameter**, like `/projects/{id}` in Android Navigation or
`go_router`. The page reads it from `params.slug`.

**To add a new page**, e.g. `/contact`, create `src/app/contact/page.tsx`. That's all.

**To navigate**, use `<Link href="/projects">` (≈ `navController.navigate("projects")`).

---

## 5. How a page is shown (the flow)

Example: someone opens `/projects/sample-android-app`.

1. Next.js finds the matching file: `src/app/projects/[slug]/page.tsx`, with `slug = "sample-android-app"`.
2. The page calls `getProject(slug)` from `src/lib/content.ts`.
3. That function looks up the project in `content/projects.json`.
4. The page returns UI built from components (`PlatformBadges`, `StoreLinks`, …) using that data.
5. `layout.tsx` wraps it with the Header and Footer.

**Important difference from mobile:** steps 1–5 run **once at build time**, not on the user's
phone. `npm run build` turns every page into a finished `.html` file in `out/`. Visitors just
download ready-made HTML, which is why the site is fast and needs no server.
(`generateStaticParams()` in the detail page tells Next.js which slugs to pre-build.)

---

## 6. Design system: where styling lives

Styling has two layers:

**a) Theme tokens: `src/app/globals.css`**
Like `colors.xml` / `ThemeData` / Asset Catalog colors. Defines `background`, `foreground`,
`muted`, `card`, `border`, `accent`, with separate values for light and dark mode
(dark mode follows the device setting automatically).
Change `--accent` once and every button and highlight updates.

**b) Tailwind classes: the `className="…"` on each element**
Each class is one small style rule, like a chain of Compose modifiers:

| Tailwind | Meaning | Compose-ish |
|---|---|---|
| `p-4` | padding 16px | `.padding(16.dp)` |
| `px-4 py-2` | horizontal 16, vertical 8 | `.padding(horizontal=16.dp, vertical=8.dp)` |
| `gap-3` | spacing between children | `Arrangement.spacedBy(12.dp)` |
| `flex` / `flex-col` | Row / Column | `Row` / `Column` |
| `grid sm:grid-cols-2` | grid, 2 columns on wider screens | `LazyVerticalGrid` |
| `rounded-xl` | corner radius | `.clip(RoundedCornerShape(12.dp))` |
| `text-lg font-bold` | text size / weight | `fontSize`, `FontWeight.Bold` |
| `text-muted`, `bg-card`, `border-border`, `text-accent` | **your theme colors** from globals.css | `MaterialTheme.colorScheme.*` |
| `hover:border-accent` | style when the mouse is over it | pressed/hovered state |
| `sm:` `lg:` prefix | apply only on wider screens | `WindowSizeClass` checks |

Spacing scale: `1` = 4px, so `p-2` = 8px, `p-4` = 16px, `p-6` = 24px.
Full reference: https://tailwindcss.com/docs

**c) Components** are the third part of the design system: change `ProjectCard.tsx` once and
every card on every page updates.

---

## 7. Running the project yourself

You need **Node.js** installed (you already have v22). Run commands from the project folder.

```bash
npm install        # first time only (or after pulling new dependencies) ≈ flutter pub get
npm run dev        # start dev server → open http://localhost:3000
```

While `npm run dev` is running, save any file and the browser **updates instantly** (like Flutter
hot reload). Stop it with `Ctrl + C`.

```bash
npm run build      # production build → static website in out/
npm start          # preview that built site locally
npm run typecheck  # check for TypeScript errors without building
```

If it says *"Port 3000 is in use"*, another dev server is already running. It will use 3001
instead, which is fine.

### Common everyday tasks

**Add a new app:** copy one block in `content/projects.json`, change the `slug` (lowercase,
dashes, unique), fill in fields, save. It appears on `/projects` right away.

**Add an icon/screenshots:** put files in `public/images/projects/<slug>/` and reference them as
`"/images/projects/<slug>/icon.png"` (path starts at `public/`, without the word `public`).

**Add an APK:** upload it to a GitHub Release, copy the download URL into `links.apk`.

---

## 8. Glossary

| Web term | Meaning |
|---|---|
| Component | A reusable UI function (= widget / composable / SwiftUI View) |
| Props | A component's inputs (= constructor/function parameters) |
| JSX / TSX | HTML-like UI syntax inside TypeScript files |
| Route | A URL path that maps to a page |
| `className` | Where Tailwind style classes go |
| Static export / SSG | Pages pre-built into HTML at build time |
| `npm` package | A library (= Gradle dependency / pub package) |
| `node_modules` | Downloaded libraries (never edit; delete and `npm install` to reset) |
| Dev server | Local server with hot reload for development |
| Deploy | Upload `out/` to a host (Vercel, GitHub Pages) so the world can see it |
