import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";
import { SITE_I18N } from "@/lib/i18n";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { AnimatedStats } from "@/components/motion/animated-stats";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE.url}/en`,
    languages: {
      es: SITE.url,
      en: `${SITE.url}/en`,
      "x-default": `${SITE.url}/en`,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pablo Marichal",
  url: `${SITE.url}/en`,
  sameAs: [
    SITE.social.linkedin,
    SITE.social.x,
    SITE.social.instagram,
    SITE.social.tiktok,
    SITE.social.youtube,
  ],
  jobTitle: "Tech Lead",
  description: SITE_I18N.en.description,
};

const entryPoints = [
  {
    title: "In Production",
    desc: "The weekly newsletter on enterprise and AI. Out on Tuesdays, from inside the machine.",
    cta: "Read the archive",
    href: "/en/blog",
    external: false,
  },
  {
    title: "Videos",
    desc: "Running past forty, coming back from injury, emigrating and raising kids. Short pieces, in my own voice.",
    cta: "See the selection",
    href: "/en/videos",
    external: false,
  },
  {
    title: "Talks and podcasts",
    desc: "Conferences where I spoke and conversations I was invited to. And how to invite me to yours.",
    cta: "Watch and listen",
    href: "/en/talks",
    external: false,
  },
];

export default function HomeEn() {
  const allPosts = getAllPosts({ locale: "en" });
  const recentPosts = allPosts.slice(0, 3);
  const stats = [
    { value: "20+", label: "years in tech" },
    { value: "12+", label: "years in SAP" },
    { value: `${getAllPosts().length}`, label: "articles" },
    { value: "19", label: "marathons" },
    { value: "10+", label: "years writing" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="space-y-16 lg:relative lg:left-1/2 lg:w-[960px] lg:-translate-x-1/2">
        <section className="space-y-8">
          <div className="grid items-start gap-8 sm:grid-cols-[1fr_200px] lg:grid-cols-[1fr_260px] lg:gap-12">
            <div className="space-y-6">
              <p className="text-sm text-neutral-400">
                Pablo Marichal · Work, ideas and everyday life
              </p>
              <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Execution is cheap in the age of AI.
                <span className="mt-3 block text-neutral-200">
                  <span className="text-accent">Judgment</span> and context are not.
                </span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-neutral-300">
                I lead SAP engineering teams and AI adoption inside large
                corporations. I write about what that is doing to work and to
                people — from the inside, not from the news.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-neutral-400">
                I also write about what happens outside work: running, emigrating,
                raising kids and cooking. The videos are where that side shows up.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <Link href="/en/videos" className="text-accent underline underline-offset-4">
                  Watch the videos &rarr;
                </Link>
                <Link href="/en/about" className="text-neutral-300 underline underline-offset-4">
                  My story &rarr;
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-2xl ring-1 ring-neutral-800 sm:w-full">
              <Image
                src="/images/pablo-hero-2026.jpg"
                alt="Pablo Marichal"
                fill
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 200px, 160px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
          <AnimatedStats stats={stats} />
        </section>

        {recentPosts.length > 0 && (
          <section className="space-y-6">
            <FadeIn>
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-2xl text-white">Latest posts</h2>
                <Link
                  href="/en/blog"
                  className="text-sm font-medium text-neutral-500 transition-colors hover:text-accent"
                >
                  See all &rarr;
                </Link>
              </div>
            </FadeIn>
            <StaggerChildren className="flex flex-col gap-8" staggerDelay={0.06}>
              {recentPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <div className="border-b border-neutral-800/50 pb-8 last:border-0 last:pb-0">
                    <Link href={`/en/blog/${post.slug}`} className="group block">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                        <h3 className="font-serif text-xl text-white">
                          <span className="hover-underline">{post.title}</span>
                        </h3>
                        <time className="shrink-0 text-sm text-neutral-600 tabular-nums">
                          {post.date
                            ? format(parseISO(post.date), "MMM yyyy", { locale: enUS })
                            : ""}
                          <span className="mx-2">&middot;</span>
                          <span>{post.readTime}</span>
                        </time>
                      </div>
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </section>
        )}

        <section className="grid gap-6 rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 sm:grid-cols-2 sm:p-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-neutral-400">The newsletter</p>
            <h2 className="font-serif text-3xl text-white">In Production</h2>
            <p className="text-sm leading-relaxed text-neutral-300">{SITE_I18N.en.tagline}</p>
          </div>
          <div className="self-center">
            <NewsletterForm locale="en" />
          </div>
        </section>

        <section className="space-y-6">
          <FadeIn>
            <h2 className="font-serif text-2xl text-white">Where to go next</h2>
          </FadeIn>
          <StaggerChildren className="grid gap-4 sm:grid-cols-3" staggerDelay={0.08}>
            {entryPoints.map((entry) => (
              <StaggerItem key={entry.title}>
                <Link
                  href={entry.href}
                  {...(entry.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 backdrop-blur-sm transition-colors hover:border-accent/50"
                >
                  <h3 className="font-serif text-lg text-white">{entry.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500 tracking-[-0.01em]">{entry.desc}</p>
                  <span className="mt-4 text-sm font-medium text-accent">{entry.cta} &rarr;</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>
      </div>
    </>
  );
}
