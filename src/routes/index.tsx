import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import hero from "@/assets/hero.jpg";
import prop1 from "@/assets/prop1.jpg";
import prop2 from "@/assets/prop2.jpg";
import prop3 from "@/assets/prop3.jpg";
import gal1 from "@/assets/gal1.jpg";
import gal2 from "@/assets/gal2.jpg";
import gal3 from "@/assets/gal3.jpg";
import gal4 from "@/assets/gal4.jpg";
import gal5 from "@/assets/gal5.jpg";
import prop4 from "@/assets/prop4.jpg";
import { listings, formatAED } from "@/lib/listings";
import { MeltingWordmark } from "@/components/MeltingWordmark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Med Estate — Boutique property on the UAE coast" },
      { name: "description", content: "A small, specialist brokerage for villas, penthouses and beachfront homes in Dubai, Abu Dhabi and Ras Al Khaimah." },
      { property: "og:title", content: "Med Estate — Property, with a different perspective" },
      { property: "og:description", content: "Hand-picked residences across Dubai, Abu Dhabi and Ras Al Khaimah, with one advisor from viewing to keys." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["Properties", "#properties"],
  ["Categories", "#categories"],
  ["Journal", "#journal"],
  ["About", "#about"],
] as const;

function Index() {
  return (
    <main>
      <Hero />
      <Collection />
      <Categories />
      <Featured />
      <About />
      <Journal />
      <Approach />
      <Testimonials />
      <Enquire />
      <Footer />
    </main>
  );
}

const wrap = "mx-auto w-full max-w-6xl px-6 md:px-10";

function Hero() {
  return (
    <section className="relative h-[92svh] min-h-[600px] overflow-hidden text-on-image">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        poster={hero}
        autoPlay
        muted
        loop
        playsInline
        aria-label="Low concrete villa with a date palm, facing the Gulf at sunset"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-overlay/40 via-transparent to-overlay/60" />
      <header className={`${wrap} relative flex items-center justify-between py-6`}>
        <a href="/" className="font-serif text-2xl">
          Med Estate <span className="eyebrow ml-1 opacity-70">UAE</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map(([l, h]) => (
            <a key={l} href={h} className="eyebrow opacity-80 transition hover:opacity-100">
              {l}
            </a>
          ))}
          <a href="#contact" className="eyebrow border border-on-image/60 px-4 py-2 transition hover:bg-on-image hover:text-ink">
            Enquire
          </a>
        </nav>
      </header>
      <div className={`${wrap} absolute inset-x-0 bottom-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between`}>
        <h1 className="font-serif text-6xl leading-[0.95] md:text-8xl">
          Property,
          <br />
          <em className="pl-[0.6em]">with a different</em>
          <br />
          perspective.
        </h1>
        <div className="w-full max-w-xs backdrop-blur-sm">
          <p className="eyebrow border-b border-on-image/40 pb-2 opacity-80">Location index</p>
          {[
            ["01", "Dubai", "25.20° N"],
            ["02", "Abu Dhabi", "24.45° N"],
            ["03", "Ras Al Khaimah", "25.80° N"],
          ].map(([n, c, lat]) => (
            <div key={n} className="flex justify-between border-b border-on-image/25 py-2 text-sm">
              <span><span className="mr-3 opacity-60">{n}</span>{c}</span>
              <span className="opacity-70">{lat}</span>
            </div>
          ))}
          <a href="#properties" className="eyebrow mt-4 inline-block border border-on-image/60 px-4 py-2 transition hover:bg-on-image hover:text-ink">
            View the collection →
          </a>
        </div>
      </div>
    </section>
  );
}

const priceBands = {
  any: () => true,
  low: (p: number) => p < 10_000_000,
  mid: (p: number) => p >= 10_000_000 && p <= 25_000_000,
  high: (p: number) => p > 25_000_000,
};

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label className="block border-b border-input pb-2">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full cursor-pointer appearance-none bg-transparent font-serif text-xl outline-none">
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </label>
  );
}

function Collection() {
  const [loc, setLoc] = useState("all");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState<keyof typeof priceBands>("any");
  const list = useMemo(
    () =>
      listings.filter(
        (l) =>
          (loc === "all" || l.emirate === loc) &&
          (type === "all" || l.types.includes(type as never)) &&
          priceBands[price](l.price),
      ),
    [loc, type, price],
  );
  return (
    <section id="properties" className={`${wrap} py-16`}>
      <div className="flex justify-between">
        <p className="eyebrow">Search the collection</p>
        <p className="eyebrow text-muted-foreground">{list.length} of {listings.length} residences</p>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Select label="Location" value={loc} onChange={setLoc} options={[["all", "All emirates"], ["Dubai", "Dubai"], ["Abu Dhabi", "Abu Dhabi"], ["Ras Al Khaimah", "Ras Al Khaimah"]]} />
        <Select label="Property type" value={type} onChange={setType} options={[["all", "Any type"], ["Villa", "Villa"], ["Apartment", "Apartment"], ["Beachfront", "Beachfront"]]} />
        <Select label="Price" value={price} onChange={(v) => setPrice(v as keyof typeof priceBands)} options={[["any", "Any price"], ["low", "Under AED 10M"], ["mid", "AED 10M – 25M"], ["high", "Above AED 25M"]]} />
      </div>
      <ol className="mt-6">
        {list.map((l) => {
          const inner = (
            <>
              <span className="eyebrow w-8 text-muted-foreground">{l.no}</span>
              <img src={l.img} alt="" className="h-12 w-16 object-cover" loading="lazy" />
              <span className="flex-1">
                <span className="block font-serif text-xl">{l.name}</span>
                <span className="eyebrow text-muted-foreground">{l.area}, {l.emirate}</span>
              </span>
              <span className="hidden text-sm text-muted-foreground md:block">{l.beds} bed · {l.baths} bath · {l.sqft} sq ft</span>
              <span className="w-36 text-right text-sm">{formatAED(l.price)}</span>
              <span className="transition group-hover:translate-x-1">→</span>
            </>
          );
          const cls = "group flex items-center gap-5 border-b border-border py-3 transition hover:bg-secondary/60";
          return (
            <li key={l.no}>
              {l.href ? <Link to="/property/palm-villa" className={cls}>{inner}</Link> : <a href="#contact" title="Full listing on request — enquire" className={cls}>{inner}</a>}
            </li>
          );
        })}
        {list.length === 0 && <li className="py-6 text-sm text-muted-foreground">No residences match — try widening the filters.</li>}
      </ol>
      <p className="mt-4 text-xs text-muted-foreground">Villa Azzurra has a full listing page. Other residences are shared on request through the enquiry form.</p>
    </section>
  );
}

const cats = [
  { n: "01", name: "Villas", count: "4 in collection", img: prop1, cap: "Detached homes with land", href: "#properties" },
  { n: "02", name: "Apartments", count: "1 in collection", img: prop2, cap: "High floors, city views", href: "#properties" },
  { n: "03", name: "Beachfront", count: "2 in collection", img: gal5, cap: "Sand at the threshold", href: "#properties" },
  { n: "04", name: "Off-plan", count: "On request", img: prop3, cap: "Before the first stone", href: "#contact" },
  { n: "05", name: "Private Listings", count: "On request", img: gal2, cap: "Never publicly advertised", href: "#contact" },
];

function Categories() {
  const [active, setActive] = useState(0);
  return (
    <section id="categories" className="bg-ink py-16 text-ink-foreground">
      <div className={`${wrap} grid items-stretch gap-10 md:grid-cols-2`}>
        <div>
          <p className="eyebrow mb-4 text-ink-muted">Index of categories</p>
          <ol className="border-t border-ink-muted/30">
            {cats.map((c, i) => (
              <li key={c.n}>
                <a
                  href={c.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="flex items-baseline gap-5 border-b border-ink-muted/30 py-3"
                >
                  <span className="eyebrow text-ink-muted">{c.n}</span>
                  <span className={`flex-1 font-serif text-4xl transition ${active === i ? "italic text-ink-foreground" : "text-ink-muted"}`}>{c.name}</span>
                  <span className="eyebrow text-ink-muted">{c.count}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative min-h-72 overflow-hidden">
          {cats.map((c, i) => (
            <img key={c.n} src={c.img} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-0"}`} />
          ))}
          <p className="eyebrow absolute bottom-3 left-3 bg-ink/70 px-2 py-1">{cats[active]?.cap}</p>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string | number }) {
  return (
    <div>
      <p className="eyebrow opacity-70">{k}</p>
      <p className="mt-1 text-sm">{v}</p>
    </div>
  );
}

function Featured() {
  return (
    <section className="py-16">
      <div className={`${wrap} grid gap-6 md:grid-cols-[1fr_3fr]`}>
        <p className="eyebrow pt-3 text-muted-foreground">Featured residence · No. 01</p>
        <h2 className="font-serif text-4xl leading-tight md:text-5xl">
          Twelve metres of private beach, <em>facing the sunset.</em>
        </h2>
      </div>
      <Link to="/property/palm-villa" className="group relative mt-10 block h-[58vh] max-h-[560px] min-h-[380px] overflow-hidden text-on-image">
        <img src={prop1} alt="Villa Azzurra on Palm Jumeirah at dusk" className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-overlay/70 via-transparent to-transparent" />
        <div className={`${wrap} absolute inset-x-0 bottom-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between`}>
          <div>
            <p className="eyebrow opacity-80">Palm Jumeirah · West Crescent · Dubai</p>
            <strong className="mt-1 block font-serif text-5xl font-normal md:text-6xl">Villa Azzurra</strong>
            <span className="eyebrow mt-4 inline-block border border-on-image/60 px-4 py-2">Schedule a viewing →</span>
          </div>
          <div className="grid grid-cols-4 gap-8">
            <Stat k="Price" v="AED 42.5M" />
            <Stat k="Beds" v={6} />
            <Stat k="Baths" v={7} />
            <Stat k="Sq ft" v="12,400" />
          </div>
        </div>
      </Link>

      <div className={`${wrap} mt-16 space-y-16`}>
        <article className="grid items-stretch gap-8 md:grid-cols-2 md:gap-14">
          <a href="#contact" className="aspect-[4/3] overflow-hidden">
            <img src={prop2} alt="Marina Penthouse, Dubai Marina" className="h-full w-full object-cover transition duration-700 hover:scale-105" loading="lazy" />
          </a>
          <div className="flex flex-col justify-between border-y border-border py-6">
            <div>
              <p className="eyebrow text-muted-foreground">No. 02 · Dubai Marina, Dubai</p>
              <h3 className="mt-3 font-serif text-4xl md:text-5xl">Marina Penthouse</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">3 bedrooms, 4 bathrooms and 4,100 sq ft above the marina, with floor-to-ceiling glass facing the Burj skyline.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <Stat k="Price" v="AED 11.8M" />
              <Stat k="Beds" v={3} />
              <Stat k="Sq ft" v="4,100" />
            </div>
            <a href="#contact" className="eyebrow mt-8 self-start border-b border-foreground pb-1">Request details →</a>
          </div>
        </article>

        <article className="grid items-stretch gap-8 md:grid-cols-2 md:gap-14">
          <div className="order-2 flex flex-col justify-between border-y border-border py-6 md:order-1">
            <div>
              <p className="eyebrow text-muted-foreground">No. 03 · Saadiyat Island, Abu Dhabi</p>
              <h3 className="mt-3 font-serif text-4xl italic md:text-5xl">Casa del Patio</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">Whitewashed walls, arched doorways and a shaded courtyard garden a short walk from the beach.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <Stat k="Price" v="AED 8.2M" />
              <Stat k="Beds" v={4} />
              <Stat k="Sq ft" v="5,600" />
            </div>
            <a href="#contact" className="eyebrow mt-8 self-start border-b border-foreground pb-1">Request details →</a>
          </div>
          <a href="#contact" className="order-1 aspect-[4/3] overflow-hidden md:order-2">
            <img src={prop3} alt="Casa del Patio, Saadiyat Island" className="h-full w-full object-cover transition duration-700 hover:scale-105" loading="lazy" />
          </a>
        </article>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border py-16">
      <div className={`${wrap} grid items-stretch gap-10 md:grid-cols-[1fr_3fr_1.4fr]`}>
        <p className="eyebrow pt-3">About</p>
        <div>
          <h2 className="font-serif text-5xl leading-[1.05]">
            Small by design.
            <br />
            <em className="text-sage">Specialist</em> by choice.
          </h2>
          <div className="mt-6 grid gap-6 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
            <p>We're a small, specialist agency focused on the homes and coastlines we know best.</p>
            <p>Every property in our collection is chosen with care, and every client is looked after by one advisor — from the first viewing to the day they move in.</p>
          </div>
        </div>
        <img src={gal1} alt="Arched passage opening onto a pool deck" className="h-full min-h-64 w-full object-cover" loading="lazy" />
      </div>
    </section>
  );
}

const journal = [
  { img: gal1, cat: "Architecture", title: "The arch, reconsidered" },
  { img: gal3, cat: "Materials", title: "Stone that remembers the sea" },
  { img: gal2, cat: "Interiors", title: "Rooms built for the evening" },
  { img: gal4, cat: "Coastlines", title: "A slow drive north to Al Hamra" },
  { img: prop4, cat: "Neighbourhoods", title: "Al Barari, under the canopy" },
];

function Journal() {
  return (
    <section id="journal" className="bg-sand py-16">
      <div className={wrap}>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-serif text-5xl md:text-6xl">The Journal</h2>
          <p className="eyebrow max-w-xs text-muted-foreground">Architecture, materials, interiors, coastlines and neighbourhoods. First issue in preparation.</p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {journal.map((j, i) => (
            <article key={j.title} className={`group ${i === 3 ? "lg:col-start-1" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={j.img} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <p className="eyebrow mt-3 text-muted-foreground">0{i + 1} · {j.cat} · Forthcoming</p>
              <h3 className="mt-1 font-serif text-2xl">{j.title}</h3>
            </article>
          ))}
          <div className="hidden flex-col justify-between border border-border p-6 lg:flex">
            <p className="eyebrow text-muted-foreground">Issue 01</p>
            <p className="font-serif text-3xl italic leading-tight">Slow reading on the homes and coastlines of the Emirates.</p>
            <a href="#contact" className="eyebrow self-start border-b border-foreground pb-1">Notify me →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const items = [
    ["Local knowledge", "We know the streets, coastlines and communities we represent."],
    ["Carefully selected", "Every property is considered before it becomes part of our collection."],
    ["A personal approach", "One advisor from the first viewing to the final signature."],
    ["Beyond the sale", "From handover to settling in, we're here after the keys change hands."],
  ];
  return (
    <section className={`${wrap} py-16`}>
      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <p className="eyebrow pt-2">Our approach</p>
        <p className="font-serif text-3xl">Four principles, kept deliberately simple.</p>
      </div>
      <ol className="mt-10 grid border-t border-border sm:grid-cols-2 md:grid-cols-4">
        {items.map(([t, d], i) => (
          <li key={t} className="border-border py-6 pr-6 md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0">
            <span className="font-serif text-5xl text-gold">{i + 1}</span>
            <h3 className="eyebrow mt-4">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const quotes = [
  { q: "They found us a house that wasn't listed anywhere. Two viewings, offer accepted in a week.", who: "Sara & Omar K.", role: "Buyers, Palm Jumeirah" },
  { q: "One person, every call, every question. Selling abroad has never felt this calm.", who: "James L.", role: "Seller, Saadiyat Island" },
  { q: "They told us which villas not to buy. That honesty is why we bought through them.", who: "Nadia R.", role: "Buyer, Al Barari" },
];

function Testimonials() {
  const [i, setI] = useState(0);
  return (
    <section className="bg-sand py-16">
      <div className={`${wrap} grid gap-8 md:grid-cols-[1fr_3fr]`}>
        <div>
          <p className="eyebrow">Client words</p>
          <p className="mt-2 text-xs text-muted-foreground">Placeholder quotes — to be replaced with verified client testimonials.</p>
        </div>
        <div>
          <blockquote className="min-h-[9rem] font-serif text-3xl leading-snug md:text-4xl">“{quotes[i]!.q}”</blockquote>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <p className="eyebrow">{quotes[i]!.who} <span className="ml-2 normal-case tracking-normal text-muted-foreground">{quotes[i]!.role}</span></p>
            <div className="flex gap-2">
              {quotes.map((_, k) => (
                <button key={k} onClick={() => setI(k)} className={`eyebrow border px-2 py-1 ${k === i ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                  0{k + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="eyebrow text-muted-foreground">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button type="button" key={o} onClick={() => onChange(o)} className={`border px-3 py-1.5 text-xs transition ${value === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Enquire() {
  const [intent, setIntent] = useState("Buy");
  const [where, setWhere] = useState("Dubai");
  const [budget, setBudget] = useState("AED 5M – 10M");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\nLooking to: ${intent}\nWhere: ${where}\nBudget: ${budget}\n\n${note}`;
    window.location.href = `mailto:hello@mediestate.ae?subject=${encodeURIComponent(`Enquiry — ${intent} in ${where}`)}&body=${encodeURIComponent(body)}`;
  };
  const input = "mt-1 w-full border-b border-input bg-transparent py-2 text-sm outline-none focus:border-foreground";
  return (
    <section id="contact" className={`${wrap} grid gap-12 border-t border-border py-16 md:grid-cols-[2fr_3fr]`}>
      <div>
        <p className="eyebrow">Enquire</p>
        <h2 className="mt-3 font-serif text-5xl leading-none">Let's find <br /><em>your place.</em></h2>
        <dl className="mt-8 space-y-3 text-sm">
          {[["Sunday — Thursday", "9:00 – 19:00"], ["Friday", "14:00 – 19:00"], ["Saturday", "10:00 – 17:00"]].map(([d, h]) => (
            <div key={d} className="flex justify-between"><dt>{d}</dt><dd className="text-muted-foreground">{h}</dd></div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">Private viewings outside these hours by appointment.</p>
        <ul className="mt-6 space-y-1 text-sm">
          <li><a href="tel:+97145558210">+971 4 555 8210</a></li>
          <li><a href="mailto:hello@mediestate.ae">hello@mediestate.ae</a></li>
          <li className="text-muted-foreground">Jumeirah Bay, Villa 14, Dubai</li>
        </ul>
      </div>
      <form onSubmit={submit} className="space-y-6">
        <Chips label="I'm looking to" options={["Buy", "Sell", "Rent", "Invest"]} value={intent} onChange={setIntent} />
        <Chips label="Where" options={["Dubai", "Abu Dhabi", "Ras Al Khaimah"]} value={where} onChange={setWhere} />
        <Chips label="Budget" options={["Under AED 5M", "AED 5M – 10M", "AED 10M – 25M", "Above AED 25M"]} value={budget} onChange={setBudget} />
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="eyebrow text-muted-foreground">Name<input required value={name} onChange={(e) => setName(e.target.value)} className={input} /></label>
          <label className="eyebrow text-muted-foreground">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></label>
        </div>
        <label className="eyebrow block text-muted-foreground">What you're after (optional)<textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} className={input} /></label>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Opens your email app with the enquiry filled in.</p>
          <button className="eyebrow bg-primary px-5 py-3 text-primary-foreground transition hover:opacity-90">Prepare enquiry →</button>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink pt-16 text-ink-foreground">
      <div className={`${wrap} grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]`}>
        <p className="font-serif text-3xl leading-tight">A boutique brokerage<br />for the UAE coast.</p>
        <div>
          <p className="eyebrow text-ink-muted">Index</p>
          <ul className="mt-3 space-y-1 text-sm">
            {[...nav, ["Contact", "#contact"] as const].map(([l, h]) => <li key={l}><a href={h} className="hover:text-gold">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-ink-muted">Contact</p>
          <p className="mt-3 text-sm">+971 4 555 8210<br />hello@mediestate.ae</p>
        </div>
        <div>
          <p className="eyebrow text-ink-muted">Office</p>
          <p className="mt-3 text-sm">Jumeirah Bay, Villa 14<br />Dubai, UAE</p>
        </div>
      </div>
      <div className={`${wrap} eyebrow mt-12 flex justify-between text-ink-muted`}>
        <span>© 2026 Med Estate</span>
        <span className="hidden md:inline">Dubai · Abu Dhabi · Ras Al Khaimah</span>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top ↑</a>
      </div>
      <MeltingWordmark />
    </footer>
  );
}
