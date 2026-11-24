import type { LinkProps } from './link-props';
import NextLink from 'next/link';

export type { LinkProps } from './link-props';

/** Web (Next.js). The native build uses `link.native.tsx`, so it never imports Next. */
export function Link({
  ref,
  href,
  children,
  className,
  target,
  hrefAttrs,
  ...props
}: LinkProps & { ref?: React.Ref<HTMLAnchorElement> }) {
  return (
    <NextLink
      href={href}
      ref={ref}
      className={className}
      target={target}
      {...hrefAttrs}
      {...props}
    >
      {children}
    </NextLink>
  );
}

Link.displayName = 'Link';
