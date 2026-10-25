import { createFileRoute, Link } from "@tanstack/react-router";
import prop1 from "@/assets/prop1.jpg";
import gal1 from "@/assets/gal1.jpg";
import gal2 from "@/assets/gal2.jpg";
import gal5 from "@/assets/gal5.jpg";

export const Route = createFileRoute("/property/palm-villa")({
  head: () => ({
    meta: [
      { title: "Villa Azzurra, Palm Jumeirah — Med Estate" },
      { name: "description", content: "Six-bedroom beachfront villa on Palm Jumeirah's West Crescent with twelve metres of private beach. AED 42.5M." },
      { property: "og:title", content: "Villa Azzurra — Palm Jumeirah, Dubai" },
      { property: "og:description", content: "6 bed · 7 bath · 12,400 sq ft with private beach facing the sunset." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Villa,
});

function Villa() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <Link to="/" className="eyebrow">← Med Estate</Link>
      <p className="eyebrow mt-10 text-muted-foreground">Palm Jumeirah · West Crescent · Dubai</p>
      <h1 className="mt-2 font-serif text-6xl md:text-7xl">Villa Azzurra</h1>
      <img src={prop1} alt="Villa Azzurra at dusk" className="mt-8 h-[60vh] max-h-[560px] w-full object-cover" />
      <div className="mt-10 grid gap-10 md:grid-cols-[2fr_1fr]">
        <p className="text-sm leading-relaxed text-muted-foreground">
          A six-bedroom residence on the West Crescent, opening directly onto twelve metres of private sand. Living spaces flow to a
          pool terrace oriented to the sunset, with a separate guest wing, cinema and staff quarters.
        </p>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          {[["Price", "AED 42,500,000"], ["Beds", "6"], ["Baths", "7"], ["Sq ft", "12,400"]].map(([k, v]) => (
            <div key={k}><dt className="eyebrow text-muted-foreground">{k}</dt><dd className="mt-1">{v}</dd></div>
          ))}
        </dl>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[gal1, gal2, gal5].map((g) => <img key={g} src={g} alt="" className="aspect-[4/3] w-full object-cover" />)}
      </div>
      <a href="/#contact" className="eyebrow mt-10 inline-block bg-primary px-5 py-3 text-primary-foreground">Schedule a viewing →</a>
    </main>
  );
}
