"use client";

import { useState } from "react";

export default function Hero() {
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const leadForm = document.getElementById("preventivo");
    if (leadForm) {
      leadForm.scrollIntoView({ behavior: "smooth" });
    }
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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/30"></div>
        {/* Blur overlay - stronger on left */}
        <div className="absolute inset-0 backdrop-blur-md" style={{ maskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 70%)', WebkitMaskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 70%)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Oltre 10.000 famiglie soddisfatte
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
            Il fotovoltaico che
            <span className="text-primary"> conviene davvero</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Scopri quanto puoi risparmiare con un impianto su misura per la tua casa.
            Preventivo gratuito in 2 minuti, installazione in 30 giorni.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Inserisci il tuo indirizzo"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark text-lg shadow-sm"
                />
              </div>
              <button type="submit" className="btn-secondary whitespace-nowrap text-lg px-8">
                Calcola risparmio
              </button>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">M</div>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-medium">L</div>
                <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white text-xs font-medium">G</div>
              </div>
              <span className="text-gray-600">+10.000 clienti</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">4.8/5 Trustpilot</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats Card */}
      <div className="hidden lg:block absolute bottom-20 right-20 bg-white rounded-3xl shadow-2xl p-6 max-w-xs z-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center">
            <svg className="w-7 h-7 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Risparmio medio annuo</p>
            <p className="text-2xl font-bold text-dark">€1.200</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Rientro investimento in 5 anni
        </div>
      </div>
    </section>
  );
}
