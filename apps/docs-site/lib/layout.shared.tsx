import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <Image
            src="/images/logo.webp"
            alt=""
            width={72}
            height={48}
            className="h-12 w-[72px] shrink-0 object-contain"
          />
          <span>{appName}</span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}

export function docsSidebarOptions() {
  return {
    defaultOpenLevel: 0,
  };
}
