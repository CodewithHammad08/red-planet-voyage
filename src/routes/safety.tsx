import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Health & Safety on Mars — Visit Mars 2075" },
      { name: "description", content: "Radiation, pressure, low-g adaptation, comms blackouts, and emergency procedures — the official MIA safety guide for Mars." },
      { property: "og:title", content: "Health & Safety on Mars" },
      { property: "og:description", content: "Official MIA safety and emergency guidance." },
    ],
  }),
  component: SafetyPage,
});

const topics = [
  {
    title: "Radiation",
    body: "Cumulative dose is tracked from launch. All habitats provide certified shielded sleeping quarters. EVA windows are capped by real-time solar flux.",
  },
  {
    title: "Pressure & atmosphere",
    body: "The Martian surface is ~0.6% of Earth's pressure. Class MIA-3 suits or pressurised habitats are mandatory outside domes.",
  },
  {
    title: "Low-gravity adaptation",
    body: "Mars gravity is 38% of Earth. Expect balance drift for 24–72 hours. All hotels offer low-g rooms, handrails, and adaptive footwear.",
  },
  {
    title: "Comms blackout",
    body: "During solar conjunction (every 26 months), Earth–Mars comms drop for up to 14 sols. Offline itinerary and safety pack sync automatically.",
  },
  {
    title: "Emergency shelters",
    body: "All authorised tours run within 20 minutes of a rated emergency shelter. Your MIA wristband transmits location every 30 seconds.",
  },
  {
    title: "Medevac to Earth",
    body: "Serious cases stabilise at Hellas General and return on the next transit window. Insurance is included in every MIA-verified booking.",
  },
];

function SafetyPage() {
  return (
    <div className="container-page py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Health & safety</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold md:text-6xl">
        Mars is beautiful, and it is not Earth.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Here's what you need to know before you go — from radiation and pressure to what to do if
        comms go quiet.
      </p>

      <div className="mt-10 rounded-2xl border border-dust/40 bg-dust/5 p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-dust">Live advisory · Sol 388</p>
        <p className="mt-2 text-lg">Elysium regional tours paused Sol 412–460 (dust season). Global comms window open.</p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {topics.map((t) => (
          <article key={t.title} className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold">{t.title}</h2>
            <p className="mt-2 text-muted-foreground">{t.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/plan" className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Plan a trip
        </Link>
        <Link to="/authority" className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">
          About the MIA
        </Link>
      </div>
    </div>
  );
}
