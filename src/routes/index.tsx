import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, MapPin, Phone, Mail, Instagram, MessageCircle, Leaf, Sofa, Mountain, Users } from "lucide-react";
import { site } from "@/content/site";
import { instagramLink, phoneLink, roomDetails, whatsappLink } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Gallery, PhotoPlaceholder } from "@/components/cottage/Gallery";
import { Reviews } from "@/components/cottage/Reviews";

const title = `${site.name} — Peaceful Cottage in Matheran`;
const description = "A cozy cottage in Matheran, Maharashtra. Explore our rooms, read guest reviews and enquire on WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#about", label: "About" },
  { href: "#rooms", label: "Rooms & Photos" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

const wa = (msg = site.contact.whatsappMessage) => whatsappLink(site.contact.whatsapp, msg) ?? "#contact";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const highlightIcons = [Leaf, Sofa, Mountain, Users];

function Logo() {
  return site.logoSrc ? (
    <img src={site.logoSrc} alt={`${site.name} logo`} className="h-10 w-auto" />
  ) : (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-lg text-primary-foreground" aria-hidden>
      {site.name.charAt(0)}
    </span>
  );
}

function WhatsAppButton({ children = "Enquire on WhatsApp", msg, className = "" }: { children?: React.ReactNode; msg?: string; className?: string }) {
  return (
    <Button asChild size="lg" className={`h-12 rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 ${className}`}>
      <a href={wa(msg)} {...ext}><MessageCircle className="h-5 w-5" />{children}</a>
    </Button>
  );
}

/** Shown in place of a contact button whose detail has not been added yet. */
function ComingSoon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border border-dashed border-border px-6 text-sm text-muted-foreground/70 ${className}`}>
      {children}
    </span>
  );
}

function Section({ id, eyebrow, heading, children, className = "" }: { id: string; eyebrow: string; heading: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-5 py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">{heading}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const { contact, location } = site;
  const directions = location.mapsUrl || (location.address ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}` : "");
  const embed = location.embedQuery ? `https://www.google.com/maps?q=${encodeURIComponent(location.embedQuery)}&output=embed` : "";
  const call = phoneLink(contact.phone);
  const insta = instagramLink(contact.instagram);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2"><Logo /><span className="font-display text-xl font-semibold">{site.name}</span></a>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            {nav.map((n) => <a key={n.href} href={n.href} className="text-sm hover:text-primary">{n.label}</a>)}
            {insta && <a href={insta} {...ext} aria-label="Instagram profile" className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-secondary"><Instagram className="h-5 w-5" /></a>}
          </nav>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="h-11 w-11 md:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetTitle className="font-display text-2xl">{site.name}</SheetTitle>
              <nav className="mt-6 flex flex-col" aria-label="Mobile">
                {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-border py-4 text-lg">{n.label}</a>)}
              </nav>
              <div className="mt-6 flex gap-3">
                <WhatsAppButton className="flex-1" />
                {call && <Button asChild size="lg" variant="outline" className="h-12 w-14 shrink-0 rounded-full px-0" aria-label="Call us"><a href={call}><Phone className="h-5 w-5" /></a></Button>}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main id="top">
        <section className="relative">
          <div className="relative h-[82vh] min-h-[520px] overflow-hidden">
            {site.heroImage ? <img src={site.heroImage} alt={`${site.name} in Matheran`} className="h-full w-full object-cover" fetchPriority="high" /> : <PhotoPlaceholder label="Your cottage photo here" className="h-full w-full !items-start !bg-forest-deep pt-20 !text-primary-foreground/70" />}
            <div className="absolute inset-0 bg-hero-overlay" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-12">
              <div className="fade-up mx-auto max-w-5xl text-primary-foreground">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{site.tagline}</p>
                <h1 className="mt-3 max-w-2xl text-5xl font-semibold leading-[1.05] sm:text-7xl">{site.heroHeadline}</h1>
                <p className="mt-4 max-w-xl text-base opacity-90 sm:text-lg">{site.heroText}</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <WhatsAppButton />
                  <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="#rooms">Explore Our Rooms</a></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section id="about" eyebrow="About the cottage" heading="Slow days in the hills">
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">{site.about.map((p, i) => <p key={i}>{p}</p>)}</div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {site.highlights.map((h, i) => {
              const Icon = highlightIcons[i % highlightIcons.length] ?? Leaf;
              return (
                <li key={h.title} className="flex gap-4 rounded-2xl bg-card p-5 shadow-soft">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Icon className="h-5 w-5" /></span>
                  <div><h3 className="text-xl font-semibold">{h.title}</h3><p className="mt-1 text-sm text-muted-foreground">{h.text}</p></div>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="rooms" eyebrow="Rooms & photos" heading="Where you'll stay" className="bg-secondary/60">
          <div className="grid gap-8 md:grid-cols-2">
            {site.rooms.map((room) => {
              const details = roomDetails(room);
              return (
                <article key={room.name} className="overflow-hidden rounded-2xl bg-card shadow-soft">
                  <Gallery images={room.images} title={room.name} />
                  <div className="p-5">
                    <h3 className="text-2xl font-semibold">{room.name}</h3>
                    <p className="mt-2 text-muted-foreground">{room.description}</p>
                    {details.length > 0 && (
                      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        {details.map((d) => <div key={d.label}><dt className="text-muted-foreground">{d.label}</dt><dd className="font-medium">{d.value}</dd></div>)}
                      </dl>
                    )}
                    {room.facilities.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">{room.facilities.map((f) => <li key={f} className="rounded-full bg-secondary px-3 py-1 text-xs">{f}</li>)}</ul>
                    )}
                    <WhatsAppButton className="mt-5 w-full" msg={`Hello! I am interested in the ${room.name} at your cottage in Matheran. Could you please share availability and details?`}>Enquire about this room</WhatsAppButton>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-10 text-center"><WhatsAppButton>Ask About Availability</WhatsAppButton></div>
        </Section>

        <Section id="reviews" eyebrow="Guest reviews" heading="Kind words from guests"><Reviews /></Section>

        <Section id="location" eyebrow="Location" heading="Find us in Matheran" className="bg-secondary/60">
          <div className="overflow-hidden rounded-2xl shadow-soft">
            {embed ? <iframe title="Cottage location on Google Maps" src={embed} className="h-80 w-full border-0 sm:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <PhotoPlaceholder label="Map appears once the address is added" className="h-80 w-full" />}
          </div>
          <p className="mt-5 flex items-start gap-2 text-muted-foreground"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{location.address || "Address coming soon — Matheran, Maharashtra"}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {directions && <Button asChild size="lg" variant="outline" className="h-12 rounded-full"><a href={directions} {...ext}>Get Directions</a></Button>}
            <WhatsAppButton>Ask us the way</WhatsAppButton>
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" heading="Plan your stay">
          <p className="max-w-xl text-lg text-muted-foreground">The quickest way to check availability is a message on WhatsApp. We'll reply as soon as we can.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <WhatsAppButton className="w-full">Chat on WhatsApp</WhatsAppButton>
            {call ? (
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full">
                <a href={call}><Phone className="h-5 w-5" />{contact.phone}</a>
              </Button>
            ) : (
              <ComingSoon className="w-full"><Phone className="h-5 w-5" />Phone number coming soon</ComingSoon>
            )}
            {insta ? (
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full">
                <a href={insta} {...ext}><Instagram className="h-5 w-5" />Follow us on Instagram</a>
              </Button>
            ) : (
              <ComingSoon className="w-full"><Instagram className="h-5 w-5" />Instagram coming soon</ComingSoon>
            )}
            {contact.email && <Button asChild size="lg" variant="outline" className="h-12 rounded-full"><a href={`mailto:${contact.email}`}><Mail className="h-5 w-5" />Email</a></Button>}
          </div>
        </Section>
      </main>

      <footer className="bg-forest-deep px-5 pt-12 pb-28 text-primary-foreground md:pb-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><Logo /><div><p className="font-display text-xl">{site.name}</p><p className="text-sm opacity-75">Matheran, Maharashtra</p></div></div>
          <div className="flex flex-wrap items-center gap-5 text-sm">
            {insta ? <a href={insta} {...ext} className="hover:underline">Instagram</a> : <span className="opacity-60">Instagram coming soon</span>}
            <a href={wa()} {...ext} className="hover:underline">WhatsApp</a>
            {call ? <a href={call} className="hover:underline">{contact.phone}</a> : <span className="opacity-60">Phone coming soon</span>}
            {location.mapsUrl && <a href={location.mapsUrl} {...ext} className="hover:underline">Google Maps</a>}
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-5xl text-xs opacity-60">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        {call ? (
          <div className="flex gap-3">
            <WhatsAppButton className="w-full flex-1" />
            <Button asChild size="lg" variant="outline" className="h-12 w-14 shrink-0 rounded-full px-0" aria-label="Call us"><a href={call}><Phone className="h-5 w-5" /></a></Button>
          </div>
        ) : (
          <WhatsAppButton className="w-full" />
        )}
      </div>
    </div>
  );
}
