/** @type {import('next').NextConfig} */
const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Supabase Storage (production image host)
      ...(supabaseHost
        ? [{ protocol: 'https', hostname: supabaseHost, pathname: '/storage/v1/object/public/**' }]
        : [{ protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' }]),
      // Common manufacturer/retail domains used during development sourcing.
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'dlcdnwebimgs.asus.com' },
      { protocol: 'https', hostname: 'asset.msi.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images.samsung.com' },
    ],
  },
};

export default nextConfig;
