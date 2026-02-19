"use client";

import { useRouter } from "next/navigation";
import AddressAutocomplete, { type AddressResult } from "./AddressAutocomplete";

export default function Hero() {
  const router = useRouter();

  const handleAddressSelect = (address: AddressResult) => {
    // Navigate to preventivo page with address data
    const params = new URLSearchParams({
      address: address.display_name,
      lat: address.lat,
      lon: address.lon
    });
    router.push(`/preventivo?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay — lighter */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/50"></div>
        {/* Blur overlay - stronger on left */}
        <div className="absolute inset-0 backdrop-blur-md" style={{ maskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 75%)', WebkitMaskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 75%)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#B3FE85]/15 text-black px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Oltre 10.000 famiglie soddisfatte
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            Il fotovoltaico che
            <span className="text-[#4CAF50]"> conviene davvero</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[#1a1a1a] mb-8 leading-relaxed">
            Scopri quanto puoi risparmiare con un impianto su misura per la tua casa.
            Preventivo gratuito in 2 minuti, installazione in 30 giorni.
          </p>

          {/* Search Form */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <AddressAutocomplete
                onSelect={handleAddressSelect}
                placeholder="Inserisci il tuo indirizzo"
              />
            </div>
            <p className="text-sm text-[#6C757D] mt-2">
              Seleziona il tuo indirizzo per ricevere un <span className="font-medium text-black">preventivo stimato gratuito</span>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-medium">M</div>
                <div className="w-8 h-8 rounded-full bg-[#B3FE85] flex items-center justify-center text-black text-xs font-medium">L</div>
                <div className="w-8 h-8 rounded-full bg-[#6C757D] flex items-center justify-center text-white text-xs font-medium">G</div>
              </div>
              <span className="text-[#6C757D]">+10.000 clienti</span>
            </div>
            <a href="#recensioni" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[#6C757D]">4.8/5 Trustpilot</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Stats Card */}
      <div className="hidden lg:block absolute bottom-20 right-20 bg-white rounded-lg shadow-2xl p-6 max-w-xs z-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-[#B3FE85]/15 rounded-lg flex items-center justify-center">
            <svg className="w-7 h-7 text-[#B3FE85]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#6C757D]">Risparmio medio annuo</p>
            <p className="text-2xl font-bold text-dark">€2.200</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#6C757D]">
          <svg className="w-4 h-4 text-[#B3FE85]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Rientro investimento in 5 anni
        </div>
      </div>
    </section>
  );
}
