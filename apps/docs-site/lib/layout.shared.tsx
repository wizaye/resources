import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <Image
            src="/images/retro-developer-404-complete.png"
            alt=""
            width={48}
            height={48}
            className="size-12 object-cover object-center"
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
