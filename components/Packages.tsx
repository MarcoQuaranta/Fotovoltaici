export default function Packages() {
  const packages = [
    {
      name: "Starter",
      subtitle: "Per piccole abitazioni",
      power: "3 kWp",
      price: "6.900",
      priceNote: "IVA e installazione incluse",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
      features: [
        "8-10 pannelli ad alta efficienza",
        "Inverter di ultima generazione",
        "Produzione ~4.000 kWh/anno",
        "Monitoraggio via app",
        "Garanzia 25 anni"
      ],
      color: "bg-gray-50",
      popular: false
    },
    {
      name: "Family",
      subtitle: "Il più richiesto",
      power: "6 kWp",
      price: "11.500",
      priceNote: "IVA e installazione incluse",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80",
      features: [
        "16-18 pannelli premium",
        "Inverter ibrido",
        "Produzione ~8.000 kWh/anno",
        "Ottimizzatori inclusi",
        "Assistenza prioritaria"
      ],
      color: "bg-secondary/5",
      popular: true
    },
    {
      name: "Premium",
      subtitle: "Massima indipendenza",
      power: "10 kWp + Batteria",
      price: "18.900",
      priceNote: "IVA e installazione incluse",
      image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=600&q=80",
      features: [
        "26-30 pannelli top di gamma",
        "Batteria accumulo 10 kWh",
        "Produzione ~13.000 kWh/anno",
        "Backup in caso di blackout",
        "Colonnina EV predisposta"
      ],
      color: "bg-primary/5",
      popular: false
    }
  ];

  return (
    <section id="prezzi" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            I nostri pacchetti
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Scegli la soluzione perfetta
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tre configurazioni studiate per ogni esigenza. Tutti i prezzi sono chiavi in mano.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 ${
                pkg.popular ? "ring-2 ring-secondary lg:scale-105" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Più scelto
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white/80 text-sm">{pkg.subtitle}</p>
                  <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-dark">€{pkg.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{pkg.priceNote}</p>

                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Potenza</p>
                    <p className="font-semibold text-dark">{pkg.power}</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#preventivo"
                  className={`block w-full py-4 rounded-2xl font-semibold text-center transition-all ${
                    pkg.popular
                      ? "btn-secondary"
                      : "bg-gray-100 text-dark hover:bg-primary hover:text-white"
                  }`}
                >
                  Richiedi preventivo
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-12">
          💡 Detrazione fiscale del 50% disponibile. Possibilità di finanziamento a tasso zero.
        </p>
      </div>
    </section>
  );
}
