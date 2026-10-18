import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { SITE } from "@/lib/constants";
import { SITE_I18N } from "@/lib/i18n";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "Uruguay, Venezuela, Uruguay again. Twenty years inside large enterprises, 19 marathons and two kids. Pablo Marichal's story.",
  alternates: {
    canonical: `${SITE.url}/en/about`,
    languages: {
      es: `${SITE.url}/about`,
      en: `${SITE.url}/en/about`,
      "x-default": `${SITE.url}/en/about`,
    },
  },
};

export default function AboutEn() {
  return (
    <div className="space-y-14">
      <FadeIn>
        <section className="space-y-4">
          <h1 className="font-serif text-3xl text-white">Pablo Marichal</h1>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            In 2014 I was in Venezuela, training for triathlon and working as a full stack developer. That world was not going well for me. I owned a racing bike I had put real time and money into. At the same time I was trying to climb out of a comfort zone that had turned into mediocrity, and I saw that SAP was the door to the next level of my career. I priced the certification and made the call: I sold the bike.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            It was not a dramatic sacrifice. It was a calculated bet — and triathlon was definitely not my thing, at least not then. That is what I mean by a system: identify the right resource, move it to the right place, at the right time. That decision opened the door that brought me here.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="relative space-y-4 pl-6">
          <div className="absolute left-0 top-0 h-0 w-[2px] bg-neutral-800 animate-[draw-line_0.8s_ease-out_0.3s_forwards]" />
          <h2 className="font-serif text-2xl text-white">Where I come from</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            I was born in Uruguay in 1980 and moved three times before I was old enough to have an opinion: to Venezuela at two, back to Uruguay at four, to Venezuela again at ten. That is where I stayed. That is where I grew up, studied computer engineering and project management, and built an entire life.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Leaving Venezuela in January 2018 was not just another emigration. It was getting out of a disaster: the country was chaos.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            My wife was the one who saw me off. We met again two or three months later, once I had settled here. I landed at my sister&apos;s place, lived there for a month, then rented something near my job — which I started earning roughly what a junior earns. I took it because it was my field, SAP, and from there I could start building again.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Paperwork was not the problem: being Uruguayan made all of that easy. But it was a clean slate. Saying goodbye to a life, giving away almost everything because selling it was close to pointless. The house, the car, my books.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            The books felt like that scene from the film where they burn them. I did not burn mine: I listed them, and people carried them off for a price that was almost a joke. Something like ten books for the cost of a coffee here in Uruguay.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            The hard part is rebuilding. Something I always had in my head was Naval&apos;s line: that if you drop someone into a society with nothing but what they know, in five years or less they can be back where they were, or better. That happened to me. The reboot cost, but it worked.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white">The work</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            I have worked in enterprise technology for over twenty years, the last stretch as a tech lead in large corporations. I lead AI adoption in teams that run critical processes, and I present in English to executive committees. Everything I write comes out of that, not out of reading the news.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="relative space-y-4 pl-6">
          <div className="absolute left-0 top-0 h-0 w-[2px] bg-neutral-800 animate-[draw-line_0.8s_ease-out_0.3s_forwards]" />
          <h2 className="font-serif text-2xl text-white">The body is the deadline</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            I started running in 2010 because I had gained weight and wanted a real change. I took it seriously: that year I ran a half marathon, a full marathon, and in September my first Major — Berlin.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Nineteen marathons so far — Berlin (2), Chicago (2), New York, Tokyo, Buenos Aires (5), Caracas (5), Punta del Este, Montevideo (2) — on the way to the six World Majors and working to go under three hours.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            I apply to my body the same logic I apply to a system that has to last years: a standard core — sleep, nutrition, movement — with no toxic customizations layered on top. To hold up teams in critical situations you need a machine that can take it. Without that, you are a zombie system waiting to fall over.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white">Why I write this</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            The philosopher Éric Sadin writes about the <em>vegetalization of humanity</em>: delegating so much cognitive agency to algorithms that we end up as passive nodes in the system rather than agents in it. I see it every day in the corporate world: people copying prompts without understanding what they execute, managers who think Copilot replaces judgment, juniors who cannot debug because they never learned the error from the ground up.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            That is what I write about every Tuesday: what is actually happening with AI inside large enterprises, without the smoke and without the hype. That is <strong className="text-neutral-200">In Production</strong>.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            <strong className="text-neutral-200">Above Average</strong> is something else: the system I arrived at along the way, and the book I am writing about it. Three layers — the biological kernel (a body in shape), the technical extensions (AI, SAP, architecture) and cognitive sovereignty (judgment no AI can replace). Version 1.0 is published and free, in{" "}
            <Link href="/recursos/above-average-os" className="text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:decoration-accent">
              Resources
            </Link>
            .
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="relative space-y-4 pl-6">
          <div className="absolute left-0 top-0 h-0 w-[2px] bg-neutral-800 animate-[draw-line_0.8s_ease-out_0.3s_forwards]" />
          <h2 className="font-serif text-2xl text-white">For Max and Mía</h2>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            I also write this for my kids. So that one day, when they are adults and the world has changed again in ways I cannot picture, they find here a record of how their old man navigated uncertainty without freezing.
          </p>
          <p className="text-base leading-relaxed text-neutral-400 tracking-[-0.01em]">
            Not because he was special. Because he had systems and used them every day.
          </p>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
          <p className="mb-1 text-sm font-medium text-white">In Production</p>
          <p className="mb-4 text-sm text-neutral-500 tracking-[-0.01em]">
            {SITE_I18N.en.tagline}
          </p>
          <div className="max-w-md">
            <NewsletterForm locale="en" />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
