"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isOpen
        ? "bg-white/90 backdrop-blur-sm border-b border-gray-100"
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center [filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.5))_drop-shadow(0_4px_12px_rgba(0,0,0,0.3))]">
            <Image
              src="/images/logo.png"
              alt="Nexevo"
              width={140}
              height={40}
              className="h-10 w-auto [filter:brightness(0)_saturate(100%)_invert(82%)_sepia(47%)_saturate(530%)_hue-rotate(52deg)_brightness(104%)_contrast(99%)]"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <Link href="#chi-siamo" className="text-dark hover:text-primary transition-colors font-medium">
              About us
            </Link>
            <Link href="#vantaggi" className="text-dark hover:text-primary transition-colors font-medium">
              Perché noi
            </Link>
            <Link href="#prezzi" className="text-dark hover:text-primary transition-colors font-medium">
              Soluzioni
            </Link>
            <Link href="#recensioni" className="text-dark hover:text-primary transition-colors font-medium">
              Dicono di noi
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="#preventivo"
              className="inline-block bg-[#B3FE85] hover:bg-[#9FE870] text-[#1B5E20] px-6 py-2.5 rounded-lg font-semibold transition-colors"
            >
              Richiedi consulenza
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
        <div className={`lg:hidden absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-sm ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2">
              <Link href="#chi-siamo" className="py-3 text-dark hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
                About us
              </Link>
              <Link href="#vantaggi" className="py-3 text-dark hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
                Perché noi
              </Link>
              <Link href="#prezzi" className="py-3 text-dark hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
                Soluzioni
              </Link>
              <Link href="#recensioni" className="py-3 text-dark hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
                Dicono di noi
              </Link>
              <div className="pt-2">
                <Link href="#preventivo" className="btn-secondary block text-center" onClick={() => setIsOpen(false)}>
                  Richiedi consulenza
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
