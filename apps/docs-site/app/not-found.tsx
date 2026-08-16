import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Terminal } from 'lucide-react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <section className="flex flex-1 items-center justify-center px-6 py-16 text-center">
        <div className="flex max-w-xl flex-col items-center">
          <p className="font-mono text-7xl font-black tracking-[-0.08em] text-fd-muted-foreground/20 sm:text-8xl">
            404
          </p>
          <Image
            src="/images/status/404.png"
            alt="Worried developer looking for a missing resource"
            width={1024}
            height={1024}
            loading="eager"
            sizes="(min-width: 640px) 256px, 208px"
            className="-mt-3 h-auto w-52 sm:w-64"
          />
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">This route did not resolve.</h1>
          <p className="mt-5 text-base leading-7 text-fd-muted-foreground">
            The resource may have moved, been renamed, or never shipped. Open the roadmap or return to the docs
            index.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/ds-algo/roadmap"
              className={buttonVariants({
                variant: 'primary',
                size: 'sm',
                className: 'gap-2 transition-transform active:scale-[0.96]',
              })}
            >
              <Terminal className="size-4" />
              Open roadmap
            </Link>
            <Link
              href="/docs/ds-algo"
              className={buttonVariants({
                variant: 'outline',
                size: 'sm',
                className: 'gap-2 transition-transform active:scale-[0.96]',
              })}
            >
              <BookOpen className="size-4" />
              Docs index
            </Link>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}
