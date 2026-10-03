export interface NavItem { label: string; href: string; cta?: boolean; }

export const primaryNavigation: NavItem[] = [
  { label: "Platform", href: "/platform/" },
  { label: "How it works", href: "/how-it-works/" },
  { label: "Use cases", href: "/use-cases/" },
  { label: "Research and method", href: "/research/" },
  { label: "About", href: "/about/" },
  { label: "Discuss a pilot", href: "/contact/", cta: true },
];

export const footerNavigation: NavItem[] = [
  { label: "Platform", href: "/platform/" },
  { label: "How it works", href: "/how-it-works/" },
  { label: "Use cases", href: "/use-cases/" },
  { label: "Research and method", href: "/research/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Supporting instruments", href: "/ecosystem/" },
  { label: "Privacy", href: "/privacy/" },
  { label: "Accessibility", href: "/accessibility/" },
  { label: "Website terms", href: "/terms/" },
];
