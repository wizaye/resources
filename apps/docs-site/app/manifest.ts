import type { MetadataRoute } from 'next';
import { appDescription, appName } from '@/lib/shared';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appName,
    short_name: appName,
    description: appDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '1536x1024',
        type: 'image/png',
      },
    ],
  };
}
