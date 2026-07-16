import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/authority")({
  head: () => ({
    meta: [
      { title: "Mars Interplanetary Authority — Visit Mars 2075" },
      { name: "description", content: "The MIA governs tourism, research, and settlement on Mars under the Outer Space Treaty (2067 rev.). Learn about the four settlements and the sol calendar." },
      { property: "og:title", content: "The Mars Interplanetary Authority" },
      { property: "og:description", content: "How Mars is governed — settlements, permits, and the sol calendar." },
    ],
  }),
  component: AuthorityPage,
});

const events = [
  { sol: "Sol 402", name: "Ls 45° transit opens", body: "First Earth-departure of the cycle. Aeternum-9 boards from Kourou." },
  { sol: "Sol 488", name: "Perseverance Landing Day", body: "Ceremony at Jezero Heritage Park. Free public access." },
  { sol: "Sol 550", name: "Aphelion Sky Festival", body: "Clear-air observatory nights across Tharsis." },
  { sol: "Sol 612", name: "Settlement Charter Day", body: "Anniversary of the Four-City Compact." },
  { sol: "Sol 690", name: "Phobos–Deimos double eclipse", body: "Best viewed from Hellas Basin resorts." },
];

function AuthorityPage() {
  return (
    <div className="container-page py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Mars Interplanetary Authority</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold md:text-6xl">
        One planet, one authority, four settlements.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        The MIA was chartered in 2058 under the Outer Space Treaty (2067 rev.). It governs entry,
        research permits, cultural site protection, and dispute resolution across all Martian
        territory.
      </p>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold">The four settlements</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Aresopolis", "Utopia Planitia", "Capital · pop. 42,000"],
            ["Tharsis Ridge", "Tharsis", "Research corridor · pop. 18,000"],
            ["Hellas Central", "Hellas", "Trade & tourism · pop. 24,000"],
            ["New Cydonia", "Cydonia", "Culture & arts · pop. 9,000"],
          ].map(([name, region, meta]) => (
            <div key={name} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{region}</p>
              <p className="mt-1 font-display text-lg font-semibold">{name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold">Sol calendar</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Mars year 2075 · Ls 217° · Sol 388 of 669. Upcoming events.
        </p>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {events.map((e) => (
            <li key={e.sol} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-6">
              <p className="w-32 font-mono text-sm text-dust">{e.sol}</p>
              <div className="flex-1">
                <p className="font-semibold">{e.name}</p>
                <p className="text-sm text-muted-foreground">{e.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-2xl border border-border bg-card p-8">
        <h2 className="font-display text-2xl font-semibold">Charter & compliance</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "MIA Data Charter — you own your data, always exportable.",
            "Outer Space Treaty (2067 rev.) — Mars is common heritage.",
            "Accessibility Statute AS-2071 — all public sites step-free.",
            "Heritage Protection Order 12 — Jezero, Viking-1, Cydonia.",
          ].map((l) => (
            <li key={l} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 size-1.5 rounded-full bg-accent" aria-hidden />
              {l}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/visa" className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">Visa & entry</Link>
          <Link to="/safety" className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">Safety guide</Link>
        </div>
      </section>
    </div>
  );
}
