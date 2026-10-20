import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /media paso a llamarse /charlas. La URL vieja esta indexada.
      { source: "/media", destination: "/charlas", permanent: true },
      // /newsletter y /blog hacian lo mismo: las dos listaban el archivo
      // completo con formulario de suscripcion. Quedo /blog, que ademas
      // tiene busqueda y filtro por pilar.
      { source: "/newsletter", destination: "/blog", permanent: true },
      // Archivo viejo de LinkedIn escrito en ingles: se servia bajo lang="es".
      { source: "/blog/first-interaction-with-ai-agents", destination: "/en/blog/first-interaction-with-ai-agents", permanent: true },
      { source: "/blog/its-ok-to-feel-silly-when-you-are-learning-something-new", destination: "/en/blog/its-ok-to-feel-silly-when-you-are-learning-something-new", permanent: true },
      { source: "/blog/project-management-with-devops", destination: "/en/blog/project-management-with-devops", permanent: true },
      { source: "/blog/run-a-marathon-using-some-kind-of-project-management", destination: "/en/blog/run-a-marathon-using-some-kind-of-project-management", permanent: true },
      { source: "/blog/the-future-of-sap-basis-navigating-the-rise-in-the-ai-era", destination: "/en/blog/the-future-of-sap-basis-navigating-the-rise-in-the-ai-era", permanent: true },
      { source: "/blog/the-ultimate-feedback-framework-for-sap-technical-teams-drive-excellence-not-dra", destination: "/en/blog/the-ultimate-feedback-framework-for-sap-technical-teams-drive-excellence-not-dra", permanent: true },
      { source: "/blog/why-a-little-paranoia-about-the-future-might-save-your-career", destination: "/en/blog/why-a-little-paranoia-about-the-future-might-save-your-career", permanent: true },
      { source: "/blog/why-your-tech-team-disagrees-and-must-do-it-and-how-to-harness-it", destination: "/en/blog/why-your-tech-team-disagrees-and-must-do-it-and-how-to-harness-it", permanent: true },
      // Las 3 traducciones legacy vivian en content/posts/ y se servian en la
      // ruta española con lang="es". Al moverlas a /en/blog sus URLs viejas
      // quedaron sin destino, y estaban indexadas.
      { source: "/blog/above-average-os-v1-0-why-brute-force-is-failing-deepseek-vs-you", destination: "/en/blog/above-average-os-v1-0-why-brute-force-is-failing-deepseek-vs-you", permanent: true },
      { source: "/blog/i-sold-my-bike-to-buy-a-career-a-venezuela-story", destination: "/en/blog/i-sold-my-bike-to-buy-a-career-a-venezuela-story", permanent: true },
      { source: "/blog/the-zombie-erp-and-the-technical-privilege-gap-chronicling-a-race-against-the-20", destination: "/en/blog/the-zombie-erp-and-the-technical-privilege-gap-chronicling-a-race-against-the-20", permanent: true },
      { source: "/blog/the-death-of-the-man-hour-are-you-paid-for-your-time-or-your-token-budget", destination: "/en/blog/the-death-of-the-man-hour-are-you-paid-for-your-time-or-your-token-budget", permanent: true },
    ];
  },
};

export default nextConfig;
