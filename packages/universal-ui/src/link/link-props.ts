export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  hrefAttrs?: {
    target?: string;
    rel?: string;
  };
}
