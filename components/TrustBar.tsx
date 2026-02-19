export default function TrustBar() {
  const features = [
    {
      title: "Indipendenza dai brand",
      description:
        "Lavoriamo con i migliori produttori del settore, senza vincoli. Questo ci permette di consigliarti sempre la soluzione ideale per le tue esigenze.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Prezzi competitivi",
      description:
        "Grazie alla nostra rete di installatori qualificati, offriamo preventivi vantaggiosi e la possibilità di pagare comodamente a rate.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Assistenza continua",
      description:
        "Il nostro supporto non finisce con l'installazione. Ti accompagniamo nel tempo con garanzie estese e manutenzione dedicata.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="chi-siamo" className="bg-black py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background: stars only (glows are in sticky wrapper) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-field absolute inset-0" />
        {/* Neon accent line top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-[#B3FE85]/50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Left: Heading */}
          <div className="col-span-12 md:col-span-6 mb-8 md:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white text-balance">
              Già <span className="text-[#B3FE85] neon-text-glow">10.000</span> famiglie italiane ci hanno scelto.
            </h2>
          </div>

          {/* Right: Description */}
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="text-lg md:text-xl text-white/70">
              Ti seguiamo dalla consulenza iniziale fino all'attivazione dell'impianto, e restiamo al tuo fianco anche dopo.
            </p>
          </div>

          {/* Full Width Image */}
          <div className="col-span-12 mt-8 md:mt-10 xl:mt-16 mb-10 relative group">
            {/* Neon border glow around image */}
            <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-[#B3FE85]/30 via-[#B3FE85]/10 to-[#B3FE85]/30 blur-[3px]" />
            <img
              src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=2000&q=80"
              alt="Case con pannelli solari"
              className="relative w-full h-auto aspect-[21/9] object-cover rounded-lg shadow-2xl"
            />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B3FE85]/60 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B3FE85]/60 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#B3FE85]/60 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B3FE85]/60 rounded-br-lg" />
          </div>

          {/* Features Grid */}
          <div className="col-span-12">
            <dl className="grid md:grid-cols-3 gap-8 md:gap-16">
              {features.map((feature, index) => (
                <div key={index} className="border-t border-[#B3FE85]/25 pt-8">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#B3FE85]/10 flex items-center justify-center text-[#B3FE85] mb-4 neon-box-glow">
                    {feature.icon}
                  </div>
                  <dt className="text-xl md:text-2xl font-semibold text-white mb-3">
                    {feature.title}
                  </dt>
                  <dd className="text-white/55 leading-relaxed">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
