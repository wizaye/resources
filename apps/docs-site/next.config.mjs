import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  turbopack: {
    root: fileURLToPath(new URL('../..', import.meta.url)),
  },
  images: {
    // Disabled because Vercel Deployment Protection intercepts /_next/image requests
    unoptimized: true,
  },
};

export default withMDX(config);
