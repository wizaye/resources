import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Callout } from 'fumadocs-ui/components/callout';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Children, cloneElement, isValidElement, type ComponentProps, type ReactElement, type ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from './mermaid';

const alertTypes = {
  NOTE: 'info',
  TIP: 'idea',
  IMPORTANT: 'info',
  WARNING: 'error',
} as const;

function Blockquote({ children, ...props }: ComponentProps<'blockquote'>) {
  const paragraph = Children.toArray(children).find(isValidElement) as ReactElement<{ children?: ReactNode }> | undefined;
  const content = paragraph ? Children.toArray(paragraph.props.children) : [];
  const match = typeof content[0] === 'string' && content[0].match(/^\[!(NOTE|TIP|IMPORTANT|WARNING)]\s*/);

  if (paragraph && match) {
    const label = match[1] as keyof typeof alertTypes;
    content[0] = (content[0] as string).slice(match[0].length);
    return (
      <Callout title={label[0] + label.slice(1).toLowerCase()} type={alertTypes[label]}>
        {cloneElement(paragraph, {}, content)}
      </Callout>
    );
  }

  return <blockquote {...props}>{children}</blockquote>;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    blockquote: Blockquote,
    img: (props) => <ImageZoom {...(props as ComponentProps<typeof ImageZoom>)} />,
    Mermaid,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
