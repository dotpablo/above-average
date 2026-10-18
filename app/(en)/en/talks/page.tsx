import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Talks and podcasts",
  description:
    "Talks, conferences and podcasts by Pablo Marichal on AI inside large enterprises, real adoption versus announcements, and professional performance after forty.",
  alternates: {
    canonical: `${SITE.url}/en/talks`,
    languages: {
      es: `${SITE.url}/charlas`,
      en: `${SITE.url}/en/talks`,
      "x-default": `${SITE.url}/en/talks`,
    },
  },
};

interface Appearance {
  venue: string;
  title: string;
  date?: string;
  description: string;
  language?: string;
  links: { label: string; href: string }[];
}

/** TODO Pablo: las conferencias ya dadas van acá, igual que en /charlas. */
const talks: Appearance[] = [];

const podcasts: Appearance[] = [
  {
    venue: "Hablamos de SAP",
    title: "Ep. 076 — SAP and Artificial Intelligence",
    language: "In Spanish",
    description:
      "A conversation about the Full Stack Human idea, SAP's RISE migration, the real limits of Joule next to frontier models, and why the marathon and physical discipline are part of a professional strategy.",
    links: [
      { label: "Listen to the episode", href: "https://hablamosdesap.com/episodios/076-sap-y-la-inteligencia-artificial" },
      { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=L6peRmF8ulo" },
    ],
  },
];

const topics = [
  "AI inside corporate environments",
  "Real adoption versus the announcement",
  "Professional performance after forty",
];

function AppearanceCard({ item }: { item: Appearance }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors hover:border-neutral-700">
      <p className="mb-1 flex flex-wrap items-baseline gap-x-2 text-xs font-medium uppercase tracking-widest text-neutral-600">
        <span>{item.venue}</span>
        {item.date && <span className="text-neutral-700">· {item.date}</span>}
        {item.language && <span className="text-neutral-700">· {item.language}</span>}
      </p>
      <h3 className="font-serif text-lg text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-500 tracking-[-0.01em]">{item.description}</p>
      {item.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {item.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:decoration-accent">
              {link.label} &rarr;
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TalksEn() {
  return (
    <div className="space-y-12">
      <FadeIn>
        <div>
          <h1 className="font-serif text-3xl text-white">Talks and podcasts</h1>
          <p className="mt-3 text-base text-neutral-400 tracking-[-0.01em]">
            Conferences where I spoke and conversations I was invited to. All of
            it comes out of real work inside corporations, not out of reading the news.
          </p>
        </div>
      </FadeIn>

      {talks.length > 0 && (
        <section className="space-y-4">
          <FadeIn>
            <h2 className="font-serif text-2xl text-white">Conferences and talks</h2>
          </FadeIn>
          <StaggerChildren className="space-y-4" staggerDelay={0.1}>
            {talks.map((item) => (
              <StaggerItem key={item.title}>
                <AppearanceCard item={item} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      )}

      <section className="space-y-4">
        <FadeIn>
          <h2 className="font-serif text-2xl text-white">Podcasts</h2>
        </FadeIn>
        <StaggerChildren className="space-y-4" staggerDelay={0.1}>
          {podcasts.map((item) => (
            <StaggerItem key={item.title}>
              <AppearanceCard item={item} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
          <h2 className="font-serif text-2xl text-white">To invite me to speak</h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            I speak in English and Spanish, in person or remote, for engineering
            teams, executive committees and industry events. The topics:
          </p>
          <ul className="mt-4 space-y-2">
            {topics.map((topic) => (
              <li key={topic} className="flex gap-2.5 text-base text-neutral-400 tracking-[-0.01em]">
                <span className="text-accent" aria-hidden="true">&mdash;</span>
                {topic}
              </li>
            ))}
          </ul>
          <a href={`${SITE.social.email}?subject=Speaking%20invitation`} className="mt-6 inline-block rounded-lg bg-accent px-6 py-2.5 text-base font-medium text-neutral-900 transition-opacity hover:opacity-90">
            pablomarichal@gmail.com
          </a>
        </section>
      </FadeIn>
    </div>
  );
}
