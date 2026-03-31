"use client";

import Link from "next/link";

const pacchetti = [
  {
    id: "3kw",
    nome: "3 kW",
    sottotitolo: "Ideale per piccole abitazioni",
    prezzo: 7100,
    features: [
      "Impianto da 3 kW",
      "Inverter incluso",
      "Produzione ~3.900 kWh/anno",
      "Monitoraggio via app",
      "Garanzia 25 anni"
    ],
    popolare: false,
  },
  {
    id: "6kw",
    nome: "6 kW",
    sottotitolo: "Il più scelto dalle famiglie",
    prezzo: 7900,
    features: [
      "Impianto da 6 kW",
      "Inverter incluso",
      "Produzione ~7.800 kWh/anno",
      "Ottimizzazione dei consumi",
      "Garanzia 25 anni"
    ],
    popolare: true,
  },
  {
    id: "9kw",
    nome: "9 kW",
    sottotitolo: "Massima indipendenza energetica",
    prezzo: 11700,
    features: [
      "Impianto da 9 kW",
      "Inverter incluso",
      "Produzione ~11.700 kWh/anno",
      "Ideale per grandi consumi",
      "Garanzia 25 anni"
    ],
    popolare: false,
  },
];

export default function Packages() {
  return (
    <section id="prezzi" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[#6C757D] font-semibold text-sm uppercase tracking-wider mb-4">
            Le nostre proposte
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Trova l&apos;impianto giusto per te
          </h2>
          <p className="text-lg text-[#6C757D] max-w-2xl mx-auto">
            Tecnologia di qualità, installazione completa e 25 anni di garanzia su ogni soluzione.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pacchetti.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-lg overflow-hidden bg-white border shadow-sm hover:shadow-lg transition-all duration-300 ${
                pkg.popolare
                  ? "border-gray-200 shadow-md hover:shadow-xl ring-2 ring-[#B3FE85] md:scale-105 md:-my-4 z-10"
                  : "border-gray-200"
              }`}
            >
              {pkg.popolare && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-[#B3FE85] text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Consigliato
                  </span>
                </div>
              )}

              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
                  alt={`Impianto ${pkg.nome}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-dark mb-1">{pkg.nome}</h3>
                  <p className="text-[#6C757D] text-sm">{pkg.sottotitolo}</p>
                </div>

                <div className="mb-5">
                  <p className="text-sm text-[#6C757D] mb-1">A partire da</p>
                  <p className="text-3xl font-bold text-dark">
                    €{pkg.prezzo.toLocaleString("it-IT")}
                  </p>
                  <p className="text-sm text-[#6C757D]">IVA e installazione incluse</p>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#B3FE85] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#6C757D] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/preventivo`}
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition-all cursor-pointer ${
                    pkg.popolare
                      ? "btn-secondary"
                      : "bg-gray-100 text-black hover:bg-black hover:!text-white"
                  }`}
                >
                  Configura
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[#6C757D] mt-12">
          Approfitta della detrazione fiscale al 50%. Disponibile anche il finanziamento a tasso zero.
        </p>
      </div>
    </section>
  );
}
