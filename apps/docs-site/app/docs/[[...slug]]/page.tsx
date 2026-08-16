import { getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { appDescription, gitConfig } from '@/lib/shared';
import { PageCredits, PageDates } from '@/components/page-details';
import { getPageHistory } from '@/lib/page-history';
import { SupportCard } from '@/components/support-card';
import { PageViews } from '@/components/page-views';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  if (!params.slug) redirect('/docs/ds-algo/roadmap');
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const history = getPageHistory(page.path);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ footer: <SupportCard className="mt-5" /> }}
    >
      <header className="border-b pb-4">
        <DocsTitle>{page.data.title}</DocsTitle>
        {page.data.description && (
          <DocsDescription className="mt-1 mb-0">{page.data.description}</DocsDescription>
        )}
        <div className="mt-2 space-y-0.5">
          <div className="flex flex-wrap items-center gap-x-2 text-sm text-fd-muted-foreground">
            <PageDates created={history.created} updated={history.updated} />
            <PageViews path={page.url} />
          </div>
          <PageCredits contributors={history.contributors} />
        </div>
        <div className="mt-3 flex flex-row items-center gap-2">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
          />
        </div>
      </header>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <SupportCard mobile className="mt-4 xl:hidden" />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description ?? appDescription,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
