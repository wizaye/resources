import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';
import { defineConfig } from 'fumadocs-mdx/config';

function remarkRemoveFirstHeading() {
  return (tree: { children: Array<{ type: string; depth?: number }> }) => {
    const index = tree.children.findIndex((node) => node.type === 'heading' && node.depth === 1);
    if (index !== -1) tree.children.splice(index, 1);
  };
}

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkRemoveFirstHeading, remarkMdxMermaid],
  },
});
