import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/components/mdx';
import { source } from '@/lib/source';
import { SupportCard } from '@/components/support-card';

export default function HomePage() {
  const page = source.getPage(['README']);
  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      breadcrumb={{ enabled: false }}
      footer={{ enabled: false }}
      tableOfContent={{ footer: <SupportCard className="mt-5" /> }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description && <DocsDescription>{page.data.description}</DocsDescription>}
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
      <SupportCard mobile className="mt-4 xl:hidden" />
    </DocsPage>
  );
}
