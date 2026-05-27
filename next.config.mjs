/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lenis'],
  },
  images: {
    // Disable Next.js image optimization pipeline.
    // Reason: Sharp on Windows fails for this project — every width other
    // than 640 returns "internal response is invalid" 400. The pre-compressed
    // source JPEGs (~250-600 KB each) are already production-sized after the
    // .compress-photos.py pass, so serving them directly is acceptable.
    // For production deployment on Vercel, re-enable by removing this flag.
    unoptimized: true,
    formats: ['image/webp'],
  },
};

export default nextConfig;
