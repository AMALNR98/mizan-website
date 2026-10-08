import type { Metadata } from "next";
import type { PageContent } from "./pages";

export function pageMetadata(page: PageContent): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.canonical },
    openGraph: {
      title: page.ogTitle || page.title,
      description: page.ogDescription || page.description,
      type: "website",
      url: page.canonical,
    },
    icons: { icon: "/assets/favicon.png", apple: "/assets/apple-touch-icon.png" },
  };
}
