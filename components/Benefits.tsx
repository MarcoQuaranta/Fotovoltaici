export default function Benefits() {
  const benefits = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Bollette più leggere",
      description: "Taglia i costi dell'energia fino al 70% e mettiti al riparo dai continui rincari."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Copertura 25 anni",
      description: "I nostri pannelli sono coperti da garanzia completa, con monitoraggio remoto sempre incluso."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Operativi in 30 giorni",
      description: "Dal contratto all'impianto funzionante in meno di quattro settimane."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Pensiamo a tutto noi",
      description: "Gestiamo ogni aspetto burocratico: autorizzazioni, pratiche GSE, allacciamenti e bonus fiscali."
    }
  ];

  return (
    <section id="vantaggi" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            I vantaggi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Cosa ci rende diversi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Prodotti certificati, tariffe trasparenti e assistenza completa in ogni fase.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 hover:bg-white rounded-lg p-8 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-primary/10 group-hover:bg-primary rounded-lg flex items-center justify-center text-primary group-hover:text-white mb-6 transition-all duration-300">
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
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 bg-primary rounded-lg p-8 lg:p-12">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2">10K+</p>
            <p className="text-white/80">Impianti realizzati</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2">25</p>
            <p className="text-white/80">Anni di copertura</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2">30</p>
            <p className="text-white/80">Giorni per l'attivazione</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-white mb-2">4.8</p>
            <p className="text-white/80">Voto su Trustpilot</p>
          </div>
        </div>
      </div>
    </section>
  );
}
