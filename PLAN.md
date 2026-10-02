# Uzhavar Bhoomi — Product Roadmap

Uzhavar Bhoomi (உழவர் பூமி) connects Indian farmers directly with consumers, and gives farmers a smart-agriculture toolkit. The roadmap is split into small, self-contained milestones. Each one leaves the product working end to end.

## Milestone 1 — Product surface ✅ (done)

- Branded landing page with the vision, middleman price comparison, "how it works", and Sign In / Register CTAs. It does not show portal content.
- Top bar with hamburger drawer: Dashboard link, Website Settings (theme, font size, voice toggle), and a language dropdown with English plus all 22 scheduled Indian languages.
- LOGIN / REGISTER card modal with a Customer / Farmer role toggle, phone/email + password fields, and "Enter Portal" / "Register Now" CTAs. After sign-in it redirects to `/farmer-dashboard` or `/customer-portal`.
- Portal guard: both portals require a signed-in user with the right role.
- Customer Portal: 12 category chips, search, a catalog of about 100 items showing fair price vs market price and the farmer's name, a cart drawer, and order placement.
- Agri-Buddy assistant: chat UI with real Web Speech voice input and spoken replies in the selected language. It currently uses rule-based sample answers.
- Farmer Dashboard: crop sowing tracker, rainwater tank analytics, remote irrigation control with reminders, AI security alert feed with a test alert, and a 7-day weather panel with advisories.
- All sample data lives in `src/lib/fixtures.ts`.

## Milestone 2 — Data model (Netlify Database)

- Drizzle schema in `db/schema.ts`: `users` (role, name, contact, language), `farms`, `products` (owned by a farmer, price, stock, unit, category), `orders` + `order_items`, `crops`, `tanks` + `tank_readings`, `irrigation_zones`, `reminders`, `security_alerts`.
- Seed the product catalog from the current fixtures.
- Note: the original spec mentions MongoDB/Mongoose. The platform's managed Postgres (Netlify Database) is used instead, so no external database is needed.

## Milestone 3 — Real accounts & roles

- Replace the localStorage sample session with Netlify Identity (email or phone + password) and store the role in user metadata.
- Server-side route protection for `/customer-portal` and `/farmer-dashboard`.

## Milestone 4 — Marketplace APIs

- Server functions for listing, searching, and filtering products from the database.
- Cart persistence and checkout, order history for customers, and incoming orders for farmers.
- Farmer "My listings": add, edit, and restock produce, set fair prices, upload photos (Netlify Blobs).

## Milestone 5 — Agri-Buddy on Gemini

- Server endpoint that calls Gemini through Netlify AI Gateway, grounded with live catalog prices and nutrition data.
- Personalised diet plans for health conditions, with tappable product recommendations added to the cart.
- Replies in the user's chosen language. Voice input/output already works through the Web Speech API.

## Milestone 6 — Live weather

- Server function that calls OpenWeatherMap (`OPENWEATHER_API_KEY`) for the farm's location: current conditions, 7-day forecast, and rainfall.
- Rule- and Gemini-based farming advisories, e.g. pause irrigation before heavy rain or delay spraying.

## Milestone 7 — Farm tools on real data

- Persist crops, tank readings, irrigation zones, and reminders. Calculate days of water remaining from real crop water needs.
- Device integration endpoint for IoT valve controllers and tank level sensors. Scheduled functions send reminders and run auto-irrigation.
- Security alerts ingested from camera/edge devices, with a Gemini vision check for animals/intruders, plus push/SMS notifications.

## Milestone 8 — Polish

- Full UI translations for every language (only key strings in 10 languages so far), with a fallback to English.
- A unique photograph for each product. Cards currently use category photography.
- PWA/offline support for low-connectivity rural areas, accessibility audit, and analytics.
