import { footerNavigation } from "@/lib/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><a className="brand" href="/" aria-label="MIZAN home"><span>MIZAN</span><span className="arabic" lang="ar" dir="rtl">ميزان</span></a><p>MIZAN helps institutions connect AI evidence to accountable human decisions. Developed through the AI for Public Purpose Lab at Arrownex.</p></div>
        <div><div className="footer-label">Explore MIZAN</div><nav className="footer-links" aria-label="Footer navigation">{footerNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></div>
      </div>
      <div className="container footer-meta"><span>Clear, accountable decisions about AI use.</span><span>&copy; 2026 MIZAN</span></div>
    </footer>
  );
}
