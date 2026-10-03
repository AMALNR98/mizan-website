import type { PageContent } from "@/lib/pages";
import { HomeOrbitAnimation } from "@/components/animation/HomeOrbitAnimation";
import { BodyClass } from "./BodyClass";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface PageShellProps { page: PageContent; }

export function PageShell({ page }: PageShellProps) {
  return (
    <>
      <BodyClass className={page.bodyClass} />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header currentPath={page.route} />
      {page.route === "/" ? <HomeOrbitAnimation /> : null}
      <main id="main" dangerouslySetInnerHTML={{ __html: page.mainHtml }} />
      <Footer />
    </>
  );
}
