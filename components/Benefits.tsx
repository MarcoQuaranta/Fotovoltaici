export default function Benefits() {
  const benefits = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Risparmio fino al 70%",
      description: "Riduci drasticamente la bolletta elettrica e proteggiti dagli aumenti dei prezzi dell'energia."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Garanzia 25 anni",
      description: "Pannelli garantiti con assistenza completa e monitoraggio da remoto incluso nel prezzo."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Installazione in 30 giorni",
      description: "Dalla firma del contratto all'accensione dell'impianto in meno di un mese."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Zero burocrazia",
      description: "Ci occupiamo di tutto noi: permessi, pratiche, allacciamenti e richiesta incentivi."
    }
  ];

  return (
    <section id="vantaggi" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            I nostri vantaggi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Perché scegliere noi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Qualità certificata, prezzi competitivi e un servizio completo dalla A alla Z.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 hover:bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary rounded-2xl flex items-center justify-center text-primary group-hover:text-white mb-6 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 bg-primary rounded-3xl p-8 lg:p-12">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2">10K+</p>
            <p className="text-white/80">Clienti soddisfatti</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2">25</p>
            <p className="text-white/80">Anni di garanzia</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2">30</p>
            <p className="text-white/80">Giorni installazione</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2">4.8</p>
            <p className="text-white/80">Valutazione media</p>
          </div>
        </div>
      </div>
    </section>
  );
}
