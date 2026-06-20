# TradeSafe Access Manager — Documentation Site

Static documentation for the **TradeSafe Access Manager** WordPress plugin. Lives in `Zeroday-all-assets/` (not shipped with the plugin).

## Features

- 19 sections covering installation, concepts, every admin screen, storefront flows, database, architecture, FAQ, and changelog
- Real admin screenshots captured from the local dev site
- Search bar with suggestion dropdown (keyboard: ↑↓ Enter, ⌘K to focus)
- Responsive sidebar navigation grouped by category
- Deployed on Vercel

## Local preview

```bash
cd docs-site
npm install
npm run dev
```

Open http://localhost:3456

## Refresh screenshots

Requires local site at `http://zeroday-access-manager.local` (admin / 123):

```bash
npm run capture
```

## Deploy (free — GitHub Pages)

Live site: **https://mdhemalakanda.github.io/tradesafe-access-manager-docs/**

From this directory after changes:

```bash
git add -A && git commit -m "Update docs" && git push
```

First-time setup (already done):

```bash
git init
git add -A && git commit -m "Initial docs site"
gh repo create tradesafe-access-manager-docs --public --source=. --remote=origin --push
gh api repos/mdhemalakanda/tradesafe-access-manager-docs/pages -X POST \
  -f build_type=legacy \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

## Deploy to Vercel (optional)

From this directory:

```bash
npx vercel --prod
```

Or connect the repo folder `Zeroday-all-assets/docs-site` in the Vercel dashboard as a static project (root = `docs-site`, no build command).

## Structure

```
docs-site/
├── index.html
├── vercel.json
├── assets/
│   ├── css/docs.css
│   ├── js/content.js   # All doc sections + search keywords
│   ├── js/search.js    # Fuzzy search
│   ├── js/app.js       # Nav + routing
│   └── img/*.png       # Admin screenshots
└── scripts/capture-screenshots.mjs
```
