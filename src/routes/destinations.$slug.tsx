import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getDestination, destinations } from "@/lib/destinations";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const dest = getDestination(params.slug);
    if (!dest) throw notFound();
    return { dest };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Destination not found" }, { name: "robots", content: "noindex" }] };
    }
    const d = loaderData.dest;
    return {
      meta: [
        { title: `${d.name} — Visit Mars 2075` },
        { name: "description", content: d.summary },
        { property: "og:title", content: `${d.name} — Visit Mars 2075` },
        { property: "og:description", content: d.summary },
        { property: "og:image", content: d.image },
        { name: "twitter:image", content: d.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Destination not found</h1>
      <p className="mt-2 text-muted-foreground">This region isn't on the official map.</p>
      <Link to="/destinations" className="mt-6 inline-block text-accent hover:underline">
        Back to destinations →
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="container-page py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
      <button onClick={reset} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
        Retry
      </button>
    </div>
  ),
  component: DestinationDetail,
});

function DestinationDetail() {
  const { dest: d } = Route.useLoaderData();
  const others = destinations.filter((x) => x.slug !== d.slug).slice(0, 3);

  return (
    <article>
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          <img src={d.image} alt="" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        </div>
        <div className="container-page pb-16 pt-24 md:pt-40">
          <Link to="/destinations" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
            ← All destinations
          </Link>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-dust">{d.region}</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold md:text-7xl">{d.name}</h1>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground">{d.tagline}</p>
        </div>
      </div>

      <div className="container-page grid gap-12 pb-24 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-lg text-pretty">{d.summary}</p>

          <h2 className="mt-12 font-display text-2xl font-semibold">What you'll do</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {d.highlights.map((h: string) => (
              <li key={h} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                <span className="text-sm">{h}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-2xl font-semibold">Safety</h2>
          <p className="mt-3 text-muted-foreground">{d.safety}</p>

          <h2 className="mt-12 font-display text-2xl font-semibold">Accessibility</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            {d.accessibility.map((a: string) => (
              <li key={a} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">From</p>
            <p className="mt-1 font-display text-3xl font-semibold">₡ {d.fromPrice.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Recommended stay: {d.sols}</p>
            <Link
              to="/plan"
              search={{ dest: d.slug }}
              className="mt-6 flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90"
            >
              Add to itinerary
            </Link>
            <Link
              to="/visa"
              className="mt-2 flex w-full items-center justify-center rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-muted"
            >
              Check visa requirements
            </Link>
            <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Region</dt><dd>{d.region}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Group size</dt><dd>1–12</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Suit class</dt><dd>MIA-3</dd></div>
            </dl>
          </div>
        </aside>
      </div>

      <section className="border-t border-border/60 bg-card/30">
        <div className="container-page py-16">
          <h2 className="font-display text-2xl font-semibold">Also on the route</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/destinations/$slug"
                params={{ slug: o.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/40"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{o.region}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{o.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
