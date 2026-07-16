import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { destinations } from "@/lib/destinations";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Plan a Trip to Mars — Itinerary Planner | Visit Mars 2075" },
      { name: "description", content: "Build your Martian itinerary, hold a reservation, and get carrier-ready. Sol-aware planning tool from the MIA." },
      { property: "og:title", content: "Plan a Trip to Mars" },
      { property: "og:description", content: "Sol-aware itinerary planner for tourists, researchers, and settlers." },
    ],
  }),
  component: Planner,
});

function Planner() {
  const [selected, setSelected] = useState<string[]>([]);
  const [party, setParty] = useState(2);
  const [purpose, setPurpose] = useState<"tourism" | "research" | "settlement">("tourism");
  const [sol, setSol] = useState(400);

  const items = destinations.filter((d) => selected.includes(d.slug));
  const total = useMemo(() => items.reduce((s, d) => s + d.fromPrice, 0) * party, [items, party]);
  const totalSols = items.length * 2 + 30; // rough transit + stay

  const toggle = (slug: string) =>
    setSelected((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]));

  return (
    <div className="container-page py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Itinerary planner</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold md:text-6xl">Plan your trip to Mars.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A few quick choices. Your medical details stay encrypted and never leave your account without
        consent.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Step 1 */}
          <Section n={1} title="Who's going & why">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Travellers</span>
                <input
                  type="number" min={1} max={12} value={party}
                  onChange={(e) => setParty(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
                  className="bg-transparent text-2xl font-semibold outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Purpose</span>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as typeof purpose)}
                  className="bg-transparent text-lg font-semibold outline-none"
                >
                  <option value="tourism">Tourism</option>
                  <option value="research">Research</option>
                  <option value="settlement">Settlement</option>
                </select>
              </label>
            </div>
          </Section>

          {/* Step 2 */}
          <Section n={2} title="Choose your departure window">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Target arrival sol</span>
                <span className="font-mono text-lg font-semibold">Sol {sol}</span>
              </div>
              <input
                type="range" min={388} max={720} value={sol}
                onChange={(e) => setSol(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
              <p className="mt-3 text-xs text-muted-foreground">
                Next Earth–Mars transit windows: Sol 402 (Aeternum-9), Sol 488 (Ares-14), Sol 610 (Zhurong-3).
              </p>
            </div>
          </Section>

          {/* Step 3 */}
          <Section n={3} title="Pick your destinations">
            <div className="grid gap-3 sm:grid-cols-2">
              {destinations.map((d) => {
                const on = selected.includes(d.slug);
                return (
                  <button
                    type="button"
                    key={d.slug}
                    onClick={() => toggle(d.slug)}
                    className={`flex items-center gap-4 rounded-lg border p-3 text-left transition ${
                      on ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"
                    }`}
                    aria-pressed={on}
                  >
                    <img src={d.image} alt="" className="size-14 rounded-md object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{d.name}</p>
                      <p className="text-xs text-muted-foreground">₡ {d.fromPrice.toLocaleString()} · {d.sols}</p>
                    </div>
                    <span className={`grid size-6 place-items-center rounded-full border ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                      {on ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>
        </div>

        {/* Sidebar summary */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Your itinerary</h2>
            {items.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">Add at least one destination to hold a reservation.</p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm">
                {items.map((d) => (
                  <li key={d.slug} className="flex justify-between gap-3">
                    <span>{d.name}</span>
                    <span className="text-muted-foreground">₡ {d.fromPrice.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <Row label="Travellers" value={String(party)} />
              <Row label="Est. duration" value={`${totalSols} sols`} />
              <Row label="Purpose" value={purpose} />
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Estimated total</span>
                <span className="font-display text-2xl font-semibold">₡ {total.toLocaleString()}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Carrier fees confirmed at booking.</p>
            </div>
            <button
              type="button"
              disabled={items.length === 0}
              className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-40 disabled:shadow-none"
              onClick={() => alert("Reservation held. Carrier confirmation within 14 Earth days.")}
            >
              Hold reservation
            </button>
            <Link to="/visa" className="mt-2 block text-center text-xs text-accent hover:underline">
              Check visa requirements →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="flex items-center gap-3 font-display text-xl font-semibold">
        <span className="grid size-7 place-items-center rounded-full bg-primary/15 font-mono text-xs text-primary ring-1 ring-primary/40">{n}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground capitalize">{label}</span>
      <span className="capitalize">{value}</span>
    </div>
  );
}
