# Uzhavar Bhoomi (உழவர் பூமி)

An AI-powered direct farmer-to-consumer platform and smart agriculture suite. Farmers sell fresh produce at fair prices without middlemen. Customers buy straight from the farm at affordable rates. Farmers also get tools to track crops, water, irrigation, security, and weather.

## What's live

- **Landing page** (`/`): vision, the middleman problem, how it works, and Sign In / Register.
- **Login / Register modal**: Customer or Farmer role, phone/email + password. It redirects to the correct portal.
- **Customer Portal** (`/customer-portal`): 12 categories, about 100 products, search, cart, and the **Agri-Buddy** voice-enabled diet & market assistant.
- **Farmer Dashboard** (`/farmer-dashboard`): crop sowing tracker, rainwater tank analytics, remote irrigation control, AI intrusion alerts, and a smart weather panel.
- **Hamburger menu**: Dashboard, theme (light/dark/auto), font size, voice toggle, and all Indian languages.

Accounts, the catalog, and farm data use sample data for now (`src/lib/fixtures.ts`). Sign in with any valid 10-digit mobile number or email and a password of 6+ characters.

## Tech stack

- TanStack Start (React 19, file-based routing, SSR) on Netlify
- Tailwind CSS 4, Lucide icons
- Web Speech API for voice input and spoken replies
- Netlify Image CDN for optimized photography
- Planned: Netlify Database (Postgres + Drizzle), Netlify Identity, Gemini via Netlify AI Gateway, OpenWeatherMap

## Run locally

```bash
pnpm install
cp .env.example .env   # optional for now; needed from the AI/weather milestones
netlify dev            # or: pnpm dev
```

## Roadmap

See [PLAN.md](./PLAN.md). Next up: the database data model, real accounts, marketplace APIs, Gemini-powered Agri-Buddy, and live OpenWeatherMap data.
