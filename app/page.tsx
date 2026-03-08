import { NewsletterForm } from "@/components/newsletter-form";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-6">
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          Above Average
        </h1>
        <p className="text-lg leading-relaxed text-neutral-600">
          Soy Pablo Marichal. Escribo sobre crecimiento personal, liderazgo y
          lo que significa vivir por encima del promedio. No se trata de ser
          mejor que otros — se trata de ser mejor que la version anterior de
          vos mismo.
        </p>
        <div className="max-w-md">
          <p className="mb-3 text-sm font-medium text-neutral-700">
            Suscribite al newsletter:
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="space-y-8">
          <h2 className="font-serif text-2xl font-semibold tracking-tight">
            Ultimos posts
          </h2>
          <div className="space-y-10">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
