import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

/** Fuera del nav, del footer y del sitemap, igual que su par en español. */
export const metadata: Metadata = {
  title: "Let's talk",
  description: "Talks, panels, podcasts and writing collaborations with Pablo Marichal.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/en/contact` },
};

const formats = [
  {
    tag: "Stage",
    title: "Talks and panels",
    desc: "In English or Spanish, in person or remote, for engineering teams, executive committees and industry events. The topics: what is actually happening with AI inside large enterprises, real adoption versus the announcement, and professional performance after forty.",
    subject: "Talk%20or%20panel",
  },
  {
    tag: "Microphone",
    title: "Podcasts and interviews",
    desc: "Long conversations, no marketing script. If you run a show where someone can think out loud and change their mind halfway through, write to me.",
    subject: "Podcast%20or%20interview",
  },
  {
    tag: "Text",
    title: "Writing collaborations",
    desc: "Columns, essays and analysis for outlets that want something written by someone inside the problem rather than reading about it.",
    subject: "Writing%20collaboration",
  },
];

export default function ContactEn() {
  return (
    <div className="space-y-14 max-w-2xl">
      <header className="space-y-4">
        <FadeIn duration={0.5}>
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">Contact</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-serif text-4xl leading-tight text-white">Let&apos;s talk.</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg leading-relaxed text-neutral-400 tracking-[-0.01em]">
            I write every week about what AI is doing to work inside corporations.
            Sometimes that leads to talking about it somewhere else: a stage, a
            microphone, a page.
          </p>
        </FadeIn>
      </header>

      <StaggerChildren className="space-y-4" staggerDelay={0.1}>
        {formats.map((f) => (
          <StaggerItem key={f.title}>
            <div className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors hover:border-neutral-700">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">{f.tag}</p>
              <h2 className="font-serif text-xl text-white">{f.title}</h2>
              <p className="text-sm leading-relaxed text-neutral-400 tracking-[-0.01em]">{f.desc}</p>
              <a href={`${SITE.social.email}?subject=${f.subject}`} className="inline-block pt-1 text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:decoration-accent">
                Write to me &rarr;
              </a>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeIn>
        <section className="space-y-3 rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 backdrop-blur-sm">
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            I answer personally. No intermediaries. If the link does not open your
            mail client, write to{" "}
            <a href={SITE.social.email} className="text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:decoration-accent">
              pablomarichal@gmail.com
            </a>
            .
          </p>
        </section>
      </FadeIn>
    </div>
  );
}
