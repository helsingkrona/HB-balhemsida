"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Start" },
  { href: "/about", label: "Om" },
  { href: "/anmalan", label: "Anmälan" },
  { href: "/contact", label: "Kontakt" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-navy border-b border-gold/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Vapen + ordnamn */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/shield_color.png" alt="Helsingkrona nations vapen" width={44} height={44} />
          <span className="font-serif text-xl tracking-wide text-parchment">
            Snörsjöaorden
          </span>
        </Link>

        {/* Länkar – desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="navbar-links">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburgerknapp – mobil */}
        <button
          type="button"
          className="md:hidden text-parchment p-2"
          aria-label="Meny"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current" />
        </button>
      </div>

      {/* Länkar – mobil dropdown */}
      {open && (
        <ul className="md:hidden border-t border-gold/30 px-4 pb-4 pt-2 space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="navbar-links block"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
