 /** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // এই লাইনটি ভার্সেল বিল্ডের সময় টাইপস্ক্রিপ্ট এরর চেক করা বন্ধ করবে
    ignoreBuildErrors: true,
  },
  eslint: {
    // এই লাইনটি বিল্ডের সময় ESLint এরর স্কিপ করবে
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
