"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Links = [
  { href: "/", label: "Home" },
  { href: "/match", label: "Match" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/discover", label: "Discover" },
];

export default function Navbar() {
  const pathname = usePathname(); // helps show which page user is on, hightlight link

  return (
    <nav className="mx-auto flex h-22 w-full max-w-[1440px] items-center justify-between px-6 md:px-20">
      <Link href="/" className="flex items-center gap-3">
        <span className="text-[32px] leading-10 text-lavender">◉</span>
        <span className="text-2xl font-semibold tracking-[-0.04em]">
          taste matcher
        </span>
      </Link>

      <ul className="hidden gap-10 text-sm font-medium md:flex">
        {Links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                pathname === link.href
                  ? "text-lavender"
                  : "text-muted hover:text-foreground"
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <Link
          href="/match"
          aria-label="Search"
          className="flex size-6 items-center justify-center opacity-90 hover:opacity-100"
        >
          <Image src="/icons/nav-search.svg" alt="" width={19} height={19} />
        </Link>
        <button
          aria-label="Notifications"
          className="flex size-6 items-center justify-center opacity-90 hover:opacity-100"
        >
          <Image src="/icons/bell.svg" alt="" width={20} height={21} />
        </button>
        <Link
          href="/match"
          className="hidden h-12 items-center rounded-3xl bg-purple px-6 text-sm font-medium hover:bg-purple/85 sm:flex">
            Start a Match&nbsp;&nbsp;↗
        </Link>
      </div>
    </nav>
  );
}
