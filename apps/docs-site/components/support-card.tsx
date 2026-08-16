import { Heart } from 'lucide-react';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

function SponsorBanner({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative h-20 overflow-hidden rounded-xl bg-white text-black ring-1 ring-inset ring-black/10 dark:bg-black dark:text-white dark:ring-white/10',
        className,
      )}
    >
      <div className="absolute inset-y-0 start-0 z-10 flex w-3/5 flex-col justify-center px-3">
        <span className="text-[10px] font-medium uppercase tracking-wider opacity-60">Open notes</span>
        <span className="mt-0.5 text-xs font-semibold leading-tight">Keep learning accessible</span>
      </div>
      <Image
        src="/images/status/success/200.webp"
        alt=""
        fill
        sizes="(min-width: 1280px) 240px, 100vw"
        className="object-contain object-right"
      />
    </div>
  );
}

export function SupportCard({ className, mobile = false }: { className?: string; mobile?: boolean }) {
  return (
    <aside
      className={cn(
        'bg-fd-card p-1 shadow-[0_0_0_1px_var(--color-fd-border),0_0_0_3px_var(--color-fd-card),0_0_0_4px_var(--color-fd-border)]',
        mobile ? 'mx-auto w-full max-w-2xl rounded-xl' : 'rounded-2xl',
        className,
      )}
    >
      <SponsorBanner className={mobile ? 'h-24 sm:h-28 md:h-32' : undefined} />
      <div className="p-2.5">
        <h3 className="text-sm font-semibold text-fd-foreground">Help keep these notes growing</h3>
        <p className="mt-1 text-xs leading-relaxed text-fd-muted-foreground">
          Researching and maintaining these notes takes real work. A small contribution keeps them free;
          monthly sponsors can also feature their brand across the docs.
        </p>
        <div className="mt-2.5 flex gap-1.5">
          <a
            href="https://github.com/sponsors/wizaye/sponsorships"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'min-w-0 flex-1 cursor-pointer')}
          >
            <Heart className="size-4 fill-pink-500 text-pink-500" />
            Sponsor
          </a>
          <a
            href="https://github.com/sponsors/wizaye"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'min-w-0 flex-1 cursor-pointer')}
          >
            Know more
          </a>
        </div>
      </div>
    </aside>
  );
}
