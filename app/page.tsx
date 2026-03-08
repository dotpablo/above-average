import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="flex flex-col-reverse items-center gap-10 sm:flex-row sm:items-start sm:gap-12">
        <div className="flex-1 space-y-5">
          <h1 className="font-serif text-4xl text-white sm:text-5xl">
            Sistemas, no motivacion.
          </h1>
          <p className="text-base leading-relaxed text-neutral-400">
            Soy Pablo Marichal. Escribo sobre crecimiento personal, liderazgo
            y rendimiento. 19 maratones, una carrera en tech, y la conviccion
            de que ser above average es una decision diaria.
          </p>
          <div className="pt-2">
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-neutral-600">
              Newsletter
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl ring-1 ring-neutral-800 sm:h-56 sm:w-56">
          <Image
            src="/images/pablo-hero.jpg"
            alt="Pablo Marichal"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl text-white">Ultimos posts</h2>
            <Link
              href="/blog"
              className="text-xs font-medium uppercase tracking-wider text-neutral-600 transition-colors hover:text-white"
            >
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-neutral-800/50">
            {recentPosts.map((post) => (
              <div key={post.slug} className="py-4 first:pt-0 last:pb-0">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
