'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@stackframe/stack';
import './navbar.styles.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = useUser();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Close menu when navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    if (!user) return;
    try {
      setIsSigningOut(true);
      await user.signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">PWND.GG</div>

      {/* Hamburger Button */}
      <button
        className={`hamburger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menu Links */}
      <ul className={`nav-links ${open ? 'active' : ''}`}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/features">Features</Link>
        </li>
        <li>
          <Link href="/pricing">Pricing</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        {user ? (
          <li>
            <button
              className="nav-logout-button"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? 'Signing out…' : 'Log out'}
            </button>
          </li>
        ) : (
          <li>
            <Link href="/handler/sign-in">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
