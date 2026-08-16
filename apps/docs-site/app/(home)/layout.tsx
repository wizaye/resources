import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions, docsSidebarOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <DocsLayout tree={source.getPageTree()} sidebar={docsSidebarOptions()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
