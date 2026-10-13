import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Mail, Check, ArrowRight, Send } from "lucide-react";
import examplePlumber from "../assets/example-plumber.jpg";
import exampleBarber from "../assets/example-barber.jpg";
import exampleCafe from "../assets/example-cafe.jpg";
import exampleLandscaper from "../assets/example-landscaper.jpg";

const WHATSAPP_URL =
  "https://wa.me/447957163127?text=" +
  encodeURIComponent("Hi Oliver! I'd like a website built.");
const EMAIL_URL =
  "mailto:osmithy888@gmail.com?subject=" +
  encodeURIComponent("Website enquiry");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oliver Smith — Websites from £30" },
      {
        name: "description",
        content:
          "Affordable websites built fast. £30 for 3 pages, £50 for 4 pages, £70 for 7 pages. Get in touch on WhatsApp or by email.",
      },
      { property: "og:title", content: "Oliver Smith — Websites from £30" },
      {
        property: "og:description",
        content:
          "Affordable websites built fast. £30 for 3 pages, £50 for 4 pages, £70 for 7 pages. Get in touch on WhatsApp or by email.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const packages = [
  {
    price: "£30",
    pages: "3 pages",
    tagline: "Perfect for getting started",
    features: [
      "3 custom pages",
      "Mobile-friendly design",
      "Your text & photos",
      "Contact details included",
    ],
    featured: false,
  },
  {
    price: "£50",
    pages: "4 pages",
    tagline: "Most popular",
    features: [
      "4 custom pages",
      "Mobile-friendly design",
      "Your text & photos",
      "Gallery or services page",
    ],
    featured: true,
  },
  {
    price: "£70",
    pages: "7 pages",
    tagline: "The full package",
    features: [
      "7 custom pages",
      "Mobile-friendly design",
      "Your text & photos",
      "Room to grow your site",
    ],
    featured: false,
  },
];

const examples = [
  { name: "Local plumber", price: "£30", image: examplePlumber, pages: ["Home", "Services", "Contact"], desc: "Simple and clear — what you do, where you work, and a WhatsApp button." },
  { name: "Barber shop", price: "£50", image: exampleBarber, pages: ["Home", "Prices", "Gallery", "Find us"], desc: "Show off your best cuts with a photo gallery and opening hours." },
  { name: "Local café", price: "£50", image: exampleCafe, pages: ["Home", "Menu", "About", "Find us"], desc: "A tidy menu, your story, and a map so people can find you." },
  { name: "Landscaping business", price: "£70", image: exampleLandscaper, pages: ["Home", "About", "Gardens", "Patios", "Fencing", "Projects", "FAQ"], desc: "A page for each service, a project gallery and answers to common questions." },
];

const comparison = [
  ["Number of pages", "3", "4", "7"],
  ["Works on phones", "Yes", "Yes", "Yes"],
  ["WhatsApp & email buttons", "Yes", "Yes", "Yes"],
  ["Photo gallery", "A few photos", "Full gallery page", "Gallery + projects"],
  ["Services", "On one page", "Own page", "A page per service"],
  ["FAQ page", "—", "—", "Yes"],
  ["Best for", "Getting started", "Small shops & trades", "Bigger businesses"],
];

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (sent) {
    return (
      <div className="mx-auto mt-12 max-w-md rounded-3xl border border-border bg-background p-8 text-center">
        <Check className="mx-auto h-8 w-8 text-primary" />
        <p className="mt-4 font-display text-xl font-bold text-foreground">
          Message sent!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for getting in touch — I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={(e) => {
        const form = e.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const message = String(data.get("message") || "").trim();
        if (!name || !email || !message) {
          e.preventDefault();
          setError("Please fill in your name, email and message.");
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          e.preventDefault();
          setError("That email address doesn't look right.");
          return;
        }
        setError("");
        setSent(true);
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
        }).catch(() => {});
      }}
      className="mx-auto mt-12 max-w-md rounded-3xl border border-border bg-background p-8 text-left"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don't fill this out: <input name="bot-field" />
        </label>
      </p>
      <h3 className="font-display text-xl font-bold text-foreground">
        Or send me a message here
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        It goes straight to my email inbox.
      </p>
      <label className="mt-6 block text-sm font-medium text-foreground">
        Your name
        <input
          type="text"
          name="name"
          required
          maxLength={100}
          className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground outline-none focus:border-primary"
          placeholder="Jane Smith"
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-foreground">
        Your email
        <input
          type="email"
          name="email"
          required
          maxLength={255}
          className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground outline-none focus:border-primary"
          placeholder="jane@example.com"
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-foreground">
        Your message
        <textarea
          name="message"
          required
          maxLength={1000}
          rows={4}
          className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground outline-none focus:border-primary"
          placeholder="Hi Oliver! I'd like a website for my business..."
        />
      </label>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
      >
        <Send className="h-4 w-4" />
        Send message
      </button>
    </form>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <p className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          Websites built by Oliver Smith
        </p>
        <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-7xl">
          A proper website,
          <br />
          <span className="text-primary">from just £30.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          I build clean, fast, mobile-friendly websites for small businesses and
          individuals. Pick a package, message me, and let's get you online.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-base font-semibold text-whatsapp-foreground shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp me
          </a>
          <a
            href={EMAIL_URL}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-semibold text-card-foreground transition-colors hover:bg-accent"
          >
            <Mail className="h-5 w-5" />
            Email me
          </a>
        </div>
      </header>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Simple, honest pricing
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.price}
              className={
                pkg.featured
                  ? "relative rounded-3xl border-2 border-primary bg-card p-8 shadow-xl shadow-primary/20"
                  : "relative rounded-3xl border border-border bg-card p-8"
              }
            >
              {pkg.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                  Most popular
                </span>
              )}
              <p className="text-sm font-medium text-muted-foreground">
                {pkg.tagline}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-5xl font-extrabold text-foreground">
                  {pkg.price}
                </span>
                <span className="text-lg text-muted-foreground">
                  / {pkg.pages}
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-card-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  pkg.featured
                    ? "mt-8 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                    : "mt-8 flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                }
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-4 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Example websites
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
          Here's the kind of site you could get with each package.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {examples.map((ex) => (
            <div key={ex.name} className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="border-b border-border">
                <img
                  src={ex.image}
                  alt={`${ex.name} website example`}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="aspect-[8/5] w-full object-cover object-top"
                />
                <div className="flex flex-wrap gap-2 p-4">
                  {ex.pages.map((p) => (
                    <span key={p} className="rounded-full bg-muted px-3 py-1 text-xs text-foreground">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-bold text-card-foreground">{ex.name}</h3>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-semibold text-primary">
                    {ex.price}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{ex.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
          Compare the packages
        </h2>
        <div className="overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-muted-foreground">What you get</th>
                <th className="p-4 font-display text-lg text-card-foreground">£30</th>
                <th className="p-4 font-display text-lg text-primary">£50</th>
                <th className="p-4 font-display text-lg text-card-foreground">£70</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row[0]} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium text-card-foreground">{row[0]}</td>
                  {row.slice(1).map((cell, i) => (
                    <td key={i} className="p-4 text-muted-foreground">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-bold text-card-foreground sm:text-4xl">
            Ready to get online?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The quickest way to reach me is WhatsApp or email — I don't take
            phone calls, so drop me a message and I'll get back to you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-base font-semibold text-whatsapp-foreground shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              07957 163127
            </a>
            <a
              href={EMAIL_URL}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Mail className="h-5 w-5" />
              osmithy888@gmail.com
            </a>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Oliver Smith — Websites from £30
      </footer>
    </div>
  );
}
