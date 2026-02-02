"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-dark">
              Solar<span className="text-secondary">Pro</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="#soluzioni" className="text-dark hover:text-primary transition-colors font-medium">
              Soluzioni
            </Link>
            <Link href="#prezzi" className="text-dark hover:text-primary transition-colors font-medium">
              Prezzi
            </Link>
            <Link href="#vantaggi" className="text-dark hover:text-primary transition-colors font-medium">
              Perché noi
            </Link>
            <Link href="#recensioni" className="text-dark hover:text-primary transition-colors font-medium">
              Recensioni
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="#preventivo"
              className="btn-primary inline-block"
            >
              Calcola risparmio
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col gap-2">
              <Link href="#soluzioni" className="px-4 py-3 text-dark hover:bg-gray-50 rounded-xl font-medium" onClick={() => setIsOpen(false)}>
                Soluzioni
              </Link>
              <Link href="#prezzi" className="px-4 py-3 text-dark hover:bg-gray-50 rounded-xl font-medium" onClick={() => setIsOpen(false)}>
                Prezzi
              </Link>
              <Link href="#vantaggi" className="px-4 py-3 text-dark hover:bg-gray-50 rounded-xl font-medium" onClick={() => setIsOpen(false)}>
                Perché noi
              </Link>
              <Link href="#recensioni" className="px-4 py-3 text-dark hover:bg-gray-50 rounded-xl font-medium" onClick={() => setIsOpen(false)}>
                Recensioni
              </Link>
              <div className="px-4 pt-2">
                <Link href="#preventivo" className="btn-secondary block text-center" onClick={() => setIsOpen(false)}>
                  Calcola risparmio
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
