import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Signal lost</p>
        <h1 className="mt-4 font-display text-7xl font-bold">404</h1>
        <h2 className="mt-2 text-xl">This page is off-map</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The coordinates you followed don't lead anywhere on Mars — yet.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Return to Earth base
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Comms glitch</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something interrupted the signal. Try again, or head back to the home base.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Visit Mars 2075 — Official Tourism, Research & Settlement" },
      {
        name: "description",
        content:
          "Plan a trip, research mission, or new life on Mars. Official guidance from the Mars Interplanetary Authority — destinations, hotels, visas, safety, and live sol advisories.",
      },
      { name: "author", content: "Mars Interplanetary Authority" },
      { name: "theme-color", content: "#221510" },
      { property: "og:title", content: "Visit Mars 2075" },
      { property: "og:description", content: "The official tourism, research and settlement portal for the planet Mars." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Visit Mars 2075" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@VisitMars" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteHeader() {
  const nav = [
    { to: "/destinations", label: "Destinations" },
    { to: "/plan", label: "Plan a trip" },
    { to: "/visa", label: "Visa & entry" },
    { to: "/safety", label: "Safety" },
    { to: "/authority", label: "MIA" },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/40">
            <span className="size-3 rounded-full bg-primary shadow-glow" aria-hidden />
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            Visit Mars <span className="text-muted-foreground">/ 2075</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-foreground bg-muted" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/plan"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90"
        >
          Plan a trip
        </Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="size-3 rounded-full bg-primary shadow-glow" aria-hidden />
            <span className="font-display font-semibold">Visit Mars 2075</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The official portal of the Mars Interplanetary Authority. Two worlds. One journey.
          </p>
        </div>
        <FooterCol title="Explore" links={[
          ["/destinations", "Destinations"],
          ["/plan", "Itinerary planner"],
          ["/authority", "Events & calendar"],
        ]} />
        <FooterCol title="Before you go" links={[
          ["/visa", "Visa & entry"],
          ["/safety", "Health & safety"],
          ["/authority", "Governance"],
        ]} />
        <div>
          <h3 className="text-sm font-semibold">Advisory line</h3>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            Sol 388 · Ls 217°<br />
            Global dust index: <span className="text-dust">moderate</span><br />
            Comms window: open
          </p>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2075 Mars Interplanetary Authority · Chartered under OST 2067 rev.</p>
          <p>All bookings held pending carrier confirmation. Not medical advice.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly (readonly [string, string])[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map(([to, label]) => (
          <li key={to}>
            <Link to={to} className="transition hover:text-foreground">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
