'use client';

import { useState } from 'react';
import Link from 'next/link';
import './navbar.styles.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link href="/" className="navbar-logo-link">
              CLUTCH.GG
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="navbar-desktop-links">
            <Link href="/explore" className="navbar-link">Home</Link>
            <Link href="/friends" className="navbar-link">About</Link>
            <Link href="/services" className="navbar-link">Careers</Link>
            <Link href="/contact" className="navbar-link">Contact</Link>
          </div>

          {/* Mobile menu button */}
          <div className="navbar-mobile-button">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="navbar-mobile-toggle"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="navbar-mobile-menu">
          <Link href="/blog" className="navbar-mobile-link">Home</Link>
          <Link href="/about" className="navbar-mobile-link">About</Link>
          <Link href="/services" className="navbar-mobile-link">Services</Link>
          <Link href="/contact" className="navbar-mobile-link">Contact</Link>
        </div>
      )}

    </nav>
  );
}
