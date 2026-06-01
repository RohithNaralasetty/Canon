"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/compare", label: "Compare" },
  { href: "/login", label: "Login" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-logo">
          BookRank
        </Link>
        <nav aria-label="Main">
          <ul className="site-nav">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
