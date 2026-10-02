# AGENTS.md

Guide for AI agents working on **Uzhavar Bhoomi**, a direct farmer-to-consumer platform and smart agriculture suite built with TanStack Start on Netlify.

**Continue from [PLAN.md](./PLAN.md).** Milestone 1 (the product surface) is done. Pick up the next unfinished milestone.

## Architecture

- **TanStack Start** (React 19, SSR, file-based routes in `src/routes/`). `routeTree.gen.ts` is generated at build time.
- **Tailwind CSS 4.** Design tokens (leaf/soil/turmeric/chilli palettes, fonts) and shared classes (`.card`, `.btn-primary`, `.btn-ghost`, `.input`, `.eyebrow`) are in `src/styles.css`. Dark mode uses the `.dark` class on `<html>` (`@custom-variant dark`).
- **App state** in `src/lib/app-context.tsx` (`AppProvider` / `useApp`): settings (theme, font scale, voice, language) persisted to localStorage, the sample session, auth modal state, the `t()` translator, and `speechLang`. It also exports `img()` for Netlify Image CDN URLs and `portalPath(role)`.
- **i18n** in `src/lib/i18n.ts`: 23 languages with Web Speech BCP-47 tags. Only some strings are translated; anything missing falls back to English.
- **Sample data** lives only in `src/lib/fixtures.ts` (catalog, Agri-Buddy rules, crops, tank, zones, alerts, weather). Replace these exports with DB/API calls in later milestones rather than scattering data elsewhere.

## Key files

| Path | Purpose |
|------|---------|
| `src/routes/__root.tsx` | HTML shell, fonts, `AppProvider`, `TopBar`, `AuthModal` |
| `src/routes/index.tsx` | Landing page (must never render portal content) |
| `src/routes/customer-portal.tsx` | Catalog, categories, search, cart, Agri-Buddy launcher |
| `src/routes/farmer-dashboard.tsx` | Crop tracker, tank, irrigation, security, weather panels |
| `src/components/TopBar.tsx` | Header, hamburger drawer (dashboard/settings/language), `Logo`, `Toggle` |
| `src/components/AuthModal.tsx` | LOGIN/REGISTER card with role toggle and redirection |
| `src/components/PortalGate.tsx` | Role-based client guard for portals |
| `src/components/AgriBuddy.tsx` | Chat + Web Speech STT/TTS assistant |
| `public/img/*.jpg` | AI-generated photography (hero, farmer, 12 categories) |

## Conventions and decisions

- Always serve images through `img(src, w, h?)` (Netlify Image CDN), never the raw files.
- Use only static Tailwind class names. Dynamic strings like `object-${x}` are not detected by the class scanner.
- Persistence must use Netlify Database (Drizzle, `db/schema.ts`), not MongoDB, even though the original spec mentions MongoDB. Keep `MONGODB_URL` only as a placeholder in `.env.example`.
- AI should go through Netlify AI Gateway (Gemini). Auth should use Netlify Identity (`@netlify/identity`).
- The original spec asked for Next.js. The project uses TanStack Start, which keeps the requested React + Tailwind + Lucide stack.
- Components: PascalCase. Imports use the `@/` alias for `src/`.
