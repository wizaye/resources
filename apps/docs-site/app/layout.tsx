import { RootProvider } from 'fumadocs-ui/provider/next';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { appDescription, appName, siteUrl } from '@/lib/shared';
import './global.css';
import { Banner } from '@/components/banner';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: appName,
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
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
            variant="normal"
          > The Site Is Still In Beta, Please Expect Issues and Also Missing Content </Banner>
          {children}

        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
