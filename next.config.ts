import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produktionsservern har bara ~2 GB RAM och type-check/lint-fasen i
  // `next build` slår i heap-taket (OOM). Typkontroll och lint körs i det
  // lokala bygget i stället; här hoppar vi över dem så bygget ryms i
  // standard-heapen utan att riskera OOM-killern på den delade servern.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // Arkiv av den gamla hemsidan ligger statiskt i public/old (byggt från
  // git-commit efb95e0). Riktiga filer (assets, .html) serveras av
  // filsystemet först; dessa rewrites pekar bara "snygga" URL:er utan
  // .html-ändelse till rätt fil.
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/old", destination: "/old/index.html" },
        { source: "/old/:path*", destination: "/old/:path*.html" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
