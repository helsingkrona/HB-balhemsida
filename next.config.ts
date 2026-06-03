import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
