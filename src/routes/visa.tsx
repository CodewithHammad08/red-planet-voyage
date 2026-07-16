import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/visa")({
  head: () => ({
    meta: [
      { title: "Mars Visa & Entry Requirements — Visit Mars 2075" },
      { name: "description", content: "Visitor, research, and settler visas issued by the Mars Interplanetary Authority. Eligibility, medical screening, and document checklist." },
      { property: "og:title", content: "Mars Visa & Entry Requirements" },
      { property: "og:description", content: "How to apply for a Mars visa — visitor, research, or settler." },
    ],
  }),
  component: VisaPage,
});

const visas = [
  {
    code: "MV-1",
    name: "Visitor",
    duration: "Up to 90 sols",
    for: "Tourism and short cultural stays",
    docs: ["Earth passport", "Return transit booking", "Medical fitness certificate (30 days)", "Radiation dosage baseline"],
  },
  {
    code: "MR-2",
    name: "Research",
    duration: "Up to 2 Mars years",
    for: "Academic and industrial missions",
    docs: ["Sponsoring institution letter", "MIA site permit", "Ethical review sign-off", "Extended medical panel"],
  },
  {
    code: "MS-5",
    name: "Settler",
    duration: "Permanent (5-year review)",
    for: "Relocation to a chartered settlement",
    docs: ["Settlement sponsor ID", "Skills self-declaration", "Full medical & psych evaluation", "Dependents manifest"],
  },
];

function VisaPage() {
  return (
    <div className="container-page py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Visa & entry</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold md:text-6xl">
        Getting cleared for Mars.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A few quick questions to find the right visa. Takes about 4 minutes. Your medical details
        stay encrypted and never leave your account without consent.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {visas.map((v) => (
          <div key={v.code} className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">{v.code}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{v.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{v.for}</p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">Duration · {v.duration}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {v.docs.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-accent" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted">
              Start {v.code} application
            </button>
          </div>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-border bg-card p-8">
        <h2 className="font-display text-2xl font-semibold">Health screening</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          All visitors complete a low-g adaptation panel and radiation baseline before departure. The
          MIA does not share medical data with carriers or third parties. You can export or delete
          your record at any time under the MIA Data Charter.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/safety" className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            Read safety guide
          </Link>
          <Link to="/plan" className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">
            Continue itinerary
          </Link>
        </div>
      </section>
    </div>
  );
}
