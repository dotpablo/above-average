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
    ];
  },
};

export default nextConfig;
