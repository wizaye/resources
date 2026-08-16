type Contributor = { name: string; href: string };

const formatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });

export function PageDates({ created, updated }: { created: Date; updated: Date }) {
  const showUpdated = created.getTime() !== updated.getTime();

  return (
    <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fd-muted-foreground">
      <div className="flex gap-1">
        <dt>Created</dt>
        <dd>
          <time dateTime={created.toISOString()}>{formatter.format(created)}</time>
        </dd>
      </div>
      {showUpdated && (
        <>
          <span aria-hidden="true">·</span>
          <div className="flex gap-1">
            <dt>Updated</dt>
            <dd>
              <time dateTime={updated.toISOString()}>{formatter.format(updated)}</time>
            </dd>
          </div>
        </>
      )}
    </dl>
  );
}

export function PageCredits({ contributors }: { contributors: Contributor[] }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
      <span className="font-medium">
        Credits
      </span>
      <p className="text-fd-muted-foreground">
        {contributors.map((contributor, index) => (
          <span key={contributor.href}>
            {index > 0 && ', '}
            <a
              href={contributor.href}
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-fd-border underline-offset-4 hover:text-fd-foreground"
            >
              {contributor.name}
            </a>
          </span>
        ))}
      </p>
    </div>
  );
}
