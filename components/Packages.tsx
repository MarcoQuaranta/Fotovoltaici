"use client";

import Link from "next/link";
import offerte from "@/data/offerte.json";

export default function Packages() {
  // Trova prezzo minimo per marca
  const prezzoMinTrinasolar = Math.min(
    ...offerte.configurazioni.filter(c => c.marca === "trinasolar").map(c => c.prezzoBase)
  );
  const prezzoMinCanadian = Math.min(
    ...offerte.configurazioni.filter(c => c.marca === "canadian").map(c => c.prezzoBase)
  );

  const marcaTrinasolar = offerte.marche.find(m => m.id === "trinasolar");
  const marcaCanadian = offerte.marche.find(m => m.id === "canadian");

  return (
    <section id="prezzi" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Le nostre proposte
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Trova l'impianto giusto per te
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tecnologia di qualità, installazione completa e 25 anni di garanzia su ogni soluzione.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Trinasolar */}
          <div className="relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Immagine */}
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
                alt="Pannelli Trinasolar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-dark mb-1">{marcaTrinasolar?.nome}</h3>
                <p className="text-gray-500 text-sm">{marcaTrinasolar?.modello}</p>
              </div>

              <div className="mb-5">
                <p className="text-sm text-gray-500 mb-1">A partire da</p>
                <p className="text-3xl font-bold text-dark">
                  €{prezzoMinTrinasolar.toLocaleString("it-IT")}
                </p>
                <p className="text-sm text-gray-500">IVA e installazione incluse</p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {[
                  "Moduli ad alto rendimento",
                  "Celle half-cut di ultima generazione",
                  "25 anni di garanzia inclusa",
                  "Controllo remoto tramite app"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/preventivo?marca=trinasolar"
                className="block w-full py-3 rounded-lg font-semibold text-center transition-all bg-gray-100 text-dark hover:bg-primary hover:text-white cursor-pointer"
              >
                Configura
              </Link>
            </div>
          </div>

          {/* Canadian Solar */}
          <div className="relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 ring-2 ring-secondary md:scale-105 md:-my-4 z-10">
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                Consigliato
              </span>
            </div>

            {/* Immagine */}
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
                alt="Pannelli Canadian Solar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-dark mb-1">{marcaCanadian?.nome}</h3>
                <p className="text-gray-500 text-sm">{marcaCanadian?.modello}</p>
              </div>

              <div className="mb-5">
                <p className="text-sm text-gray-500 mb-1">A partire da</p>
                <p className="text-3xl font-bold text-dark">
                  €{prezzoMinCanadian.toLocaleString("it-IT")}
                </p>
                <p className="text-sm text-gray-500">IVA e installazione incluse</p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {[
                  "Moduli premium con certificazione",
                  "Efficienza energetica ottimale",
                  "25 anni di garanzia inclusa",
                  "Supporto tecnico dedicato"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/preventivo?marca=canadian"
                className="block w-full py-3 rounded-lg font-semibold text-center transition-all btn-secondary cursor-pointer"
              >
                Configura
              </Link>
            </div>
          </div>

          {/* Preventivo personalizzato */}
          <div className="relative rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Immagine */}
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=600&q=80"
                alt="Consulenza personalizzata"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-dark mb-1">Personalizzato</h3>
                <p className="text-gray-500 text-sm">Soluzione su misura</p>
              </div>

              <div className="mb-5">
                <p className="text-sm text-gray-500 mb-1">Richiedi</p>
                <p className="text-xl font-bold text-dark">
                  Una proposta dedicata
                </p>
                <p className="text-sm text-gray-500">Senza alcun impegno</p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {[
                  "Sopralluogo senza costi",
                  "Studio dei tuoi consumi",
                  "Progetto personalizzato",
                  "Valutazione delle opzioni"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#preventivo"
                className="block w-full py-3 rounded-lg font-semibold text-center transition-all bg-primary text-white hover:bg-primary-light cursor-pointer"
              >
                Richiedi preventivo
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-12">
          Approfitta della detrazione fiscale al 50%. Disponibile anche il finanziamento a tasso zero.
        </p>
      </div>
    </section>
  );
}
