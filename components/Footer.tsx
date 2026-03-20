import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-2">
              <Image
                src="/images/logo.png"
                alt="Nexevo"
                width={140}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-[#6C757D] mb-8 leading-relaxed">
              Your Next Step In Evolution
            </p>
            <div className="flex gap-3">
              {([
                { name: "facebook", href: "https://www.facebook.com/profile.php?id=61588325690468" },
                { name: "instagram", href: "https://www.instagram.com/nexevo.it/" },
                { name: "linkedin", href: "https://www.linkedin.com/company/nexevo-evolution/posts/?feedView=all" },
              ] as const).map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#B3FE85] hover:text-black transition-colors"
                >
                  {social.name === "facebook" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                  )}
                  {social.name === "instagram" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                  {social.name === "linkedin" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Menu principale */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Menu</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#chi-siamo" className="text-[#6C757D] hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#vantaggi" className="text-[#6C757D] hover:text-white transition-colors">
                  Perché noi
                </Link>
              </li>
              <li>
                <Link href="#prezzi" className="text-[#6C757D] hover:text-white transition-colors">
                  Soluzioni
                </Link>
              </li>
              <li>
                <Link href="#recensioni" className="text-[#6C757D] hover:text-white transition-colors">
                  Dicono di noi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contatti</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[#6C757D]">
                <svg className="w-5 h-5 text-[#B3FE85] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>800 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-[#6C757D]">
                <svg className="w-5 h-5 text-[#B3FE85] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@nexevo.it</span>
              </li>
              <li className="flex items-start gap-3 text-[#6C757D]">
                <svg className="w-5 h-5 text-[#B3FE85] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Via Aniello Falcone 394,<br />80127 Napoli (NA)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#6C757D] text-sm">
            © 2026 NEXEVO S.R.L. — P.IVA 10924601213. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-[#6C757D] hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie" className="text-[#6C757D] hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/termini" className="text-[#6C757D] hover:text-white transition-colors">
              Termini
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
