# Visit Mars 2075 — Official Tourism Website Plan

## Assumptions
- Year 2075: regular Earth↔Mars transit (~3–6 mo), 4 permanent settlements, low-orbit relay CDN, sub-second Mars↔Earth sync via edge caching (light-lag is real; site is served from Earth + Mars edge nodes).
- Governed by the **Mars Interplanetary Authority (MIA)**; tourism regulated under the Outer Space Treaty (2067 revision).
- Bookings are advisory + reservation-holding; actual transit sold through licensed carriers (SpaceX Aeternum, ESA-JAXA Ares, CNSA Zhurong Lines).
- English is default; site is multilingual from day one.
- Budget/team: mid-size product team, 6–12 month roadmap.

## Target Audience
| Segment | Share | Primary need |
|---|---|---|
| Space tourists (leisure, 2–8 wk stays) | 55% | Inspiration, itineraries, price, safety |
| Researchers / academic missions | 20% | Permits, lab access, data on sites |
| New settlers (relocation candidates) | 15% | Visa, housing, governance, health |
| Press, educators, students | 10% | Facts, media kit, virtual tours |

## Success Metrics
- **North-star:** Verified bookings (reservation holds) / month.
- Activation: itinerary planner completion rate ≥ 35%.
- Engagement: 3D map interaction ≥ 60% of sessions; virtual preview completion ≥ 40%.
- Trust: visa/safety page bounce < 30%; support ticket deflection ≥ 50%.
- Performance: LCP < 2.0s (Earth), < 3.5s (Mars edge); CLS < 0.1.
- Accessibility: WCAG 2.2 AA, 0 critical axe issues.
- SEO: top-3 for "travel to mars", "mars visa", "mars space hotel".

---

## 1. Tone & Voice
Welcoming, factual, awe-preserving. "Grand but grounded." No hype adjectives ("epic", "insane"). Always pair wonder with a safety or logistics note. Reading level: Grade 8. Inclusive: gravity-adaptive language ("low-g accessible"), neurodivergent-friendly formatting (short paragraphs, clear headings, no auto-play motion).

**Example home hero copy:**
> **Welcome to Mars.**
> Two worlds. One journey. Plan your visit, research trip, or new life on the fourth planet — with official guidance from the Mars Interplanetary Authority.
> [Plan a trip]  [Explore destinations]  [Apply for a visa]

**Example safety banner:**
> Dust season advisory: Elysium regional tours paused Sol 412–460. [See current conditions]

## 2. Content Strategy

### Destinations (regions)
- **Olympus Mons Base** — summit tram, caldera walks
- **Valles Marineris Rim** — canyon gliders, overlooks
- **Jezero Heritage Park** — Perseverance landing site, museum
- **Hellas Basin Resorts** — highest-pressure atmosphere, spa hotels
- **Tharsis Research Corridor** — labs, observatories
- **Phobos & Deimos Orbital Stops** — moon excursions
- **Cydonia Cultural Quarter** — arts, settler heritage

### Activities
Tours (surface rover, EVA-lite, canyon flight), Research experiences (lab residencies, sample collection ride-alongs), Space hotels (Hellas Grand, Olympus Skyline, Phobos Loop Station), Cultural (settler markets, low-g sports arenas, observatory nights).

### Seasonal / event calendar
Aligned to Martian sols and Ls (solar longitude). Dust storm season, aphelion clear-sky festivals, Perseverance Landing Day (Feb 18), Settlement Charter Day, dual-moon eclipses.

### Safety
Radiation, pressure suits, low-g adaptation, comms blackout during solar conjunction, emergency shelters, medevac to Earth.

### Governance
MIA structure, settlement councils, laws (property, science permits, cultural site protection), tax/tariff on Earth imports, dispute resolution.

## 3. User Journey
```text
Home → Inspire (destinations, hotels)
     → Plan (itinerary planner: dates, group, budget, medical)
     → Verify (visa + health eligibility check)
     → Book (hold reservation, hand off to carrier)
     → Prepare (pre-flight training checklist, packing, comms)
     → Onboard (offline PWA travel companion)
     → Return / Settle
```

## 4. Features
- **Interactive 3D map** (MOLA elevation + settlement overlays)
- **Virtual previews** — 360° / volumetric captures per attraction
- **Itinerary planner** — sol-aware calendar, transit windows, budget
- **Booking module** — reservation holds, carrier handoff via API
- **Visa checker** — questionnaire → eligibility + document list
- **Multilingual** — EN, ES, ZH, HI, AR, FR, JA, PT, DE, SW; RTL support
- **Offline PWA** — cached maps, itinerary, safety guides (critical during comms blackout)
- **Accessibility** — WCAG 2.2 AA, reduced-motion, screen-reader tours, captioned videos, low-g mobility filters
- **Privacy** — GDPR + MIA Data Charter; medical data segregated, encrypted at rest, user-owned export

### Performance targets
LCP < 2.0s Earth / < 3.5s Mars edge; JS < 180KB gz initial; images AVIF; 3D lazy-loaded behind intent.

## 5. Technical Stack

| Layer | Choice |
|---|---|
| Frontend | TanStack Start (React 19, SSR + edge) |
| Styling | Tailwind v4, semantic tokens |
| 3D / Map | MapLibre GL + three.js/react-three-fiber; MOLA tiles |
| CMS | Headless (Sanity or Payload) — regions, attractions, events |
| Backend | Server functions on Cloudflare Workers edge |
| DB | Postgres (Lovable Cloud) — bookings, users, itineraries |
| Media | Object storage + image CDN (AVIF/WebP), HLS video |
| Search | Typesense / Meilisearch |
| Auth | Passkeys + OAuth; MIA ID federation |
| Payments | Stripe (Earth rails) + carrier settlement API |
| i18n | ICU messages, per-route locale segments |
| Analytics | Privacy-first (Plausible) + server events |
| Hosting | Cloudflare (Earth); Mars edge relay mirrors |
| Observability | Sentry, structured logs, SLO dashboards |

### High-level APIs
- `GET /api/destinations` · `GET /api/destinations/:slug`
- `GET /api/attractions?region=&activity=&accessibility=`
- `GET /api/events?fromSol=&toSol=`
- `POST /api/itineraries` · `PATCH /api/itineraries/:id`
- `POST /api/bookings/hold` → carrier webhook
- `POST /api/visa/check` (questionnaire → eligibility)
- `GET /api/conditions/live` (dust, radiation, comms)
- `POST /api/webhooks/carriers/:carrier` (signed)

## 6. Data Model (core entities)
```text
Region(id, name, slug, hero_media, climate, coords_bbox)
Attraction(id, region_id, type, accessibility_flags, media[], safety_notes)
Hotel(id, region_id, tier, pressure_rating, rooms, amenities)
Event(id, region_id, ls_start, ls_end, category)
User(id, auth_id, locale, accessibility_prefs)
MedicalProfile(user_id, encrypted_blob) -- segregated
Itinerary(id, user_id, sols[], items[], status)
Booking(id, itinerary_id, carrier, hold_expires_at, status)
VisaApplication(id, user_id, category, docs[], status)
Advisory(id, region_id, severity, sol_range, message)
```

## 7. Content Governance
- **Cadence:** advisories real-time; events weekly; destinations monthly; policy quarterly.
- **Workflow:** Author → Editor → Domain reviewer (MIA liaison for safety/governance) → Legal (visa/medical) → Publish. All changes versioned.
- **Revenue:** commission on carrier + hotel bookings, sponsored (labeled) research programs, MIA public-info grant, premium API for carriers.
- **Compliance:** MIA Data Charter, GDPR, CCPA, Outer Space Treaty '67 rev., accessibility statute AS-2071, export controls on geospatial data > 1 m resolution.

## 8. MVP (Weeks 0–10)
1. Home, 7 destination pages, 3 hotel pages, safety, visa overview, about MIA.
2. Interactive 2D map with region hotspots (3D deferred to phase 2).
3. Itinerary planner (dates, region picks, party size) → email hold.
4. Multilingual scaffolding (EN + ES + ZH launch).
5. WCAG 2.2 AA pass, PWA offline shell.

## 9. Phased Roadmap (6–12 mo)
- **M3:** 3D terrain views, virtual previews, live advisories.
- **M4–5:** Full booking with carrier APIs, payments, visa checker.
- **M6–7:** Research portal, permit workflow, settler relocation hub.
- **M8–9:** All 10 locales incl. RTL, offline maps, comms-blackout mode.
- **M10–12:** AR pre-visit app companion, personalized recommendations, community reviews (moderated).

## 10. Deliverables
- IA sitemap + wireframes (home, destination, attraction, planner, booking, visa, safety).
- Design system (tokens, components, motion, accessibility rules).
- Data model + migration plan.
- API spec (OpenAPI) — high level above, expanded per endpoint.
- Content inventory sheet (per region/attraction: copy, media, translations status).
- Analytics & SLO dashboard.
- Deployment plan: preview → staging → prod, feature flags, blue/green, Mars edge cache warmers, incident runbook (comms blackout, carrier outage, dust advisories).

---

## Example UI Copy

**Destination card — Olympus Mons Base**
> Stand on the tallest mountain in the solar system. Summit tram departs daily; low-g accessible. From ₡ 42,000 · 3 sols recommended.

**Visa checker intro**
> A few quick questions to find the right visa. Takes about 4 minutes. Your medical details stay encrypted and never leave your account without consent.

**Safety page lede**
> Mars is beautiful, and it is not Earth. Here's what you need to know before you go — from radiation and pressure to what to do if comms go quiet.

**Booking hold confirmation**
> Reservation held until Sol 388. We've emailed your itinerary and next steps. Your carrier will finalize seat assignment within 14 Earth days.

**Offline banner (PWA)**
> You're offline. Your itinerary, maps, and safety guides are ready. New bookings will sync when a signal returns.

---

Approve this plan and I'll scaffold the MVP: home, destination template, 2D interactive map, itinerary planner, and the design system.