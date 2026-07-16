import { createFileRoute, Link } from "@tanstack/react-router";
import { destinations } from "@/lib/destinations";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations on Mars — Visit Mars 2075" },
      {
        name: "description",
        content:
          "Every official Martian destination: Olympus Mons, Valles Marineris, Jezero Heritage Park, Hellas Basin resorts, Phobos orbital, and more.",
      },
      { property: "og:title", content: "Destinations on Mars" },
      { property: "og:description", content: "Official Martian destinations, tours, and space hotels." },
    ],
  }),
  component: DestinationsIndex,
});

function DestinationsIndex() {
  return (
    <div className="container-page py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Destinations</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold md:text-6xl">
        Every corner of the fourth planet.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Official destinations chartered by the Mars Interplanetary Authority. Each is rated for
        accessibility, safety, and current sol conditions.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {destinations.map((d) => (
          <Link
            key={d.slug}
            to="/destinations/$slug"
            params={{ slug: d.slug }}
            className="group grid grid-cols-5 overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/50"
          >
            <div className="col-span-2 aspect-square overflow-hidden">
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                width={1280}
                height={900}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="col-span-3 flex flex-col justify-between p-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {d.region}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold">{d.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{d.tagline}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">From ₡ {d.fromPrice.toLocaleString()} · {d.sols}</span>
                <span className="text-accent">Details →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
