import { RootProvider } from 'fumadocs-ui/provider/next';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { appDescription, appName } from '@/lib/shared';
import './global.css';
import { Banner } from '@/components/banner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: appName,
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: appName,
    title: appName,
    description: appDescription,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">

        <RootProvider>
          <Banner
            variant="rainbow"
            rainbowColors={[
              'rgba(255,100,0, 0.5)',
              'rgba(255,100,0, 0.5)',
              'transparent',
              'rgba(255,100,0, 0.5)',
              'transparent',
              'rgba(255,100,0, 0.5)',
              'transparent',
            ]}
          > The Site Is Still In Beta, Please Expect Issues and Also Missing Content </Banner>
          {children}

        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
