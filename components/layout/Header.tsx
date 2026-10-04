import { primaryNavigation } from "@/lib/navigation";

interface HeaderProps { currentPath: string; }

function isCurrent(currentPath: string, href: string) {
  return currentPath === href || (href !== "/" && currentPath.startsWith(href));
}

export function Header({ currentPath }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brand" href="/" aria-label="MIZAN home"><span className="brand-logo" aria-hidden="true"></span><span className="brand-text"><span>MIZAN</span><span className="arabic" lang="ar" dir="rtl">ميزان</span></span></a>
        <nav className="primary-nav" id="primary-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <a key={item.href} href={item.href} className={item.cta ? "nav-cta" : undefined} aria-current={isCurrent(currentPath, item.href) ? "page" : undefined}>{item.label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="language-toggle" type="button" data-lang-toggle aria-label="Switch to Arabic">العربية</button>
          <button className="mobile-toggle" type="button" aria-label="Open navigation" aria-controls="primary-nav" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>
  );
}
