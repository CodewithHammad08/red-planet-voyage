import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/mars-hero.jpg";
import { destinations } from "@/lib/destinations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visit Mars 2075 — Plan Your Journey to the Fourth Planet" },
      {
        name: "description",
        content:
          "Explore Mars destinations, book space hotels, apply for a visa, and prepare for a journey unlike any on Earth — with official guidance from the Mars Interplanetary Authority.",
      },
      { property: "og:title", content: "Visit Mars 2075" },
      { property: "og:description", content: "The official tourism portal for the planet Mars." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>
        <div className="container-page relative flex min-h-[86vh] flex-col justify-end pb-20 pt-32">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-dust">
            Mars Interplanetary Authority · Sol 388, year 2075
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[1.02] text-balance md:text-7xl lg:text-8xl">
            Welcome to Mars.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl">
            Two worlds. One journey. Plan your visit, research trip, or new life on the fourth
            planet — with official guidance from the MIA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/plan"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90"
            >
              Plan a trip
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center rounded-md border border-border bg-card/60 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-card"
            >
              Explore destinations
            </Link>
            <Link
              to="/visa"
              className="inline-flex items-center rounded-md px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Apply for a visa →
            </Link>
          </div>
        </div>
      </section>

      {/* Advisory */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="container-page flex flex-col gap-3 py-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <span className="inline-block size-2 animate-pulse rounded-full bg-dust" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-widest text-dust">Advisory</span>
            <span className="text-muted-foreground">
              Dust season active in Elysium — regional tours paused Sol 412–460.
            </span>
          </p>
          <Link to="/safety" className="text-xs font-medium text-accent hover:underline">
            See live conditions →
          </Link>
        </div>
      </section>

      {/* Destinations */}
      <section className="container-page py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">01 · Destinations</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold md:text-5xl">
              Seven regions. One planet you'll never forget.
            </h2>
          </div>
          <Link to="/destinations" className="hidden shrink-0 text-sm text-accent hover:underline md:block">
            View all →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((d) => (
            <Link
              key={d.slug}
              to="/destinations/$slug"
              params={{ slug: d.slug }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/40"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  width={1280}
                  height={900}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {d.region}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{d.tagline}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">From ₡ {d.fromPrice.toLocaleString()}</span>
                  <span className="text-accent">{d.sols} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive map */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="container-page py-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">02 · Interactive map</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold md:text-5xl">
            Chart your course.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A live view of open regions, active advisories, and settled outposts. Hover a marker to
            preview — click to open the destination.
          </p>
          <div className="mt-10">
            <MarsMap />
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="container-page py-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">03 · Who's going</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold md:text-5xl">
          Tourists, researchers, and new settlers.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              tag: "Space tourists",
              title: "A journey unlike any on Earth",
              body: "Multi-week itineraries across summits, canyons, and space hotels — with pre-flight training baked in.",
              cta: ["/plan", "Plan a trip"],
            },
            {
              tag: "Researchers",
              title: "Labs, sites, and permits",
              body: "Apply for site access at Jezero, Tharsis, and the polar caps. Permitting handled through MIA.",
              cta: ["/authority", "Research portal"],
            },
            {
              tag: "New settlers",
              title: "Move to Mars",
              body: "Housing, health screening, and long-stay visas for the four chartered settlements.",
              cta: ["/visa", "Settler visa"],
            },
          ].map((a) => (
            <div key={a.tag} className="rounded-2xl border border-border bg-card p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{a.tag}</p>
              <h3 className="mt-3 font-display text-xl font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
              <Link to={a.cta[0] as "/plan"} className="mt-4 inline-block text-sm text-accent hover:underline">
                {a.cta[1]} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="hero-grain overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16">
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-balance md:text-5xl">
            Your reservation window opens in 42 sols.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Next Earth–Mars transit window: Ls 45°. Hold your spot with MIA now — carrier confirmation
            follows within 14 Earth days.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/plan" className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90">
              Start planning
            </Link>
            <Link to="/safety" className="rounded-md border border-border px-6 py-3 text-sm font-medium hover:bg-muted">
              Read safety guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MarsMap() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-[#3a1a0e] to-[#1a0a05] p-6">
      <div
        className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, oklch(0.55 0.16 40) 0%, oklch(0.42 0.14 35) 35%, oklch(0.28 0.10 30) 70%, oklch(0.18 0.06 25) 100%)",
        }}
        role="img"
        aria-label="Simplified surface map of Mars showing seven official destinations."
      >
        {/* graticule */}
        <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
          <defs>
            <pattern id="grid" width="8%" height="16%" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="oklch(0.85 0.06 70)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* polar caps */}
        <div className="absolute inset-x-0 top-0 h-[10%] bg-white/10 blur-xl" />
        <div className="absolute inset-x-0 bottom-0 h-[8%] bg-white/8 blur-xl" />
        {/* markers */}
        {destinations.map((d) => (
          <Link
            key={d.slug}
            to="/destinations/$slug"
            params={{ slug: d.slug }}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${d.coords.x}%`, top: `${d.coords.y}%` }}
            aria-label={`${d.name}, ${d.region}`}
          >
            <span className="relative flex size-3">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative size-3 rounded-full bg-primary ring-2 ring-background" />
            </span>
            <span className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-background/95 px-2.5 py-1 text-xs font-medium shadow-lg group-hover:block group-focus-visible:block">
              {d.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" /> Open destination</span>
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-dust" /> Advisory in effect</span>
        <span className="ml-auto font-mono">Projection: MOLA simple cylindrical · not to scale</span>
      </div>
    </div>
  );
}
