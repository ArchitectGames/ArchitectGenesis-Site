# ArchitectGenesis Website

Public gateway into the ArchitectGenesis universe.

The homepage is a living civilization, not a brochure. Visitors observe a world, choose among ten demonstration civilizations, enter through the ArchitectGenesis Portal, and play a rule-based Situation Room demo with Time Travel.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

```bash
npm run build
npm run preview
```

## Deploy to architectgenesis.com

The repository is configured to deploy automatically to GitHub Pages when changes reach `main`. The custom domain is stored in `public/CNAME`.

In the domain provider for `architectgenesis.com`, add:

- `CNAME` record for `www` pointing to `architectgames.github.io`
- `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`

Then, in GitHub, open **Settings > Pages**, choose **GitHub Actions** as the source, and enable **Enforce HTTPS** after the first deployment completes. Redirect the root domain to `www` through the domain provider if it does not support the GitHub Pages apex records.

## What is in this preview

- Cinematic homepage with eagle-like aerial camera over ten handcrafted worlds
- Civilization carousel (auto-rotate, previous/next, direct select, pause on interaction)
- Signature portal transition into the Situation Room
- Rule-based demo: 3–5 chapters per civilization, no AI requests
- Time Travel rewind with Already Explored locks for the session
- About, Gameplay, Features, Demo, Pricing, Store, FAQ, Community, Support, Login
- Email signup, social rail, App Store QR plaque, session-persistent audio controls
- Store catalog, gift certificate print view, redeem codes, referral dashboard (local demonstration ledger; no cards are charged)

## Before public launch

Update `src/config.js`:

- `LINKS.appStore` — live iOS App Store listing (QR codes read this)
- Social URLs — X, Instagram, Facebook, TikTok, Discord, YouTube
- Billing — replace preview codes with Stripe or platform storefronts
- Mail — connect the homepage Join field to the live list

Founder ID `#00000001` is reserved for the Creator of ArchitectGenesis.

## Motto

*Every civilization begins with a single year.*
