import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { SITE } from "@/lib/constants";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free resources by Pablo Marichal: AI prompts, systems and frameworks for the tech professional who does not want to end up deprecated.",
  alternates: {
    canonical: `${SITE.url}/en/resources`,
    languages: {
      es: `${SITE.url}/recursos`,
      en: `${SITE.url}/en/resources`,
      "x-default": `${SITE.url}/en/resources`,
    },
  },
};

const resources = [
  {
    title: "Above Average OS v1.0",
    description:
      "The architecture of the Full Stack Human. Three modules of AI prompts for performance, training and productivity — built for the tech professional with a blown-up calendar.",
    tag: "Free",
    href: "/recursos/above-average-os",
    note: "In Spanish",
  },
  {
    title: "Obsidian + Claude: your second brain",
    description:
      "How to turn Obsidian into a system that thinks with you. Structure, plugins, workflows and the exact prompts to close the loop between what you consume and what you produce.",
    tag: "Free",
    href: "/recursos/obsidian-claude",
    note: "In Spanish",
  },
  {
    title: "AI training prompts",
    description:
      "The exact prompts I used to prepare the 2025 Buenos Aires Marathon (3h14) with AI as a coach. Adaptable to any distance.",
    tag: "Coming soon",
    href: null,
    note: null,
  },
];

export default function ResourcesEn() {
  return (
    <div className="space-y-12">
      <FadeIn>
        <div>
          <h1 className="font-serif text-3xl text-white">Resources</h1>
          <p className="mt-3 text-base text-neutral-400 tracking-[-0.01em]">
            Tools and systems I actually use. Not theory — frameworks with
            instructions you can run today.
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="space-y-4" staggerDelay={0.1}>
        {resources.map((resource) => (
          <StaggerItem key={resource.title}>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-colors hover:border-neutral-700">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="font-serif text-lg text-white">{resource.title}</h2>
                  <p className="mt-2 text-sm text-neutral-500 tracking-[-0.01em]">{resource.description}</p>
                  {resource.href && (
                    <Link href={resource.href} hrefLang="es" className="mt-4 inline-block text-sm font-medium text-accent underline underline-offset-4 decoration-accent/40 transition-colors hover:decoration-accent">
                      Open the resource &rarr;
                      {resource.note && <span className="ml-2 text-neutral-600">({resource.note})</span>}
                    </Link>
                  )}
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs ${resource.tag === "Free" ? "border-accent/40 text-accent" : "border-neutral-800 text-neutral-600"}`}>
                  {resource.tag}
                </span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeIn>
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-sm">
          <p className="mb-1 text-sm font-medium text-white">Subscribers get the resources first:</p>
          <p className="mb-4 text-xs text-neutral-500">
            Every new resource goes out in the newsletter before it lands here.
          </p>
          <div className="max-w-md">
            <NewsletterForm locale="en" />
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
