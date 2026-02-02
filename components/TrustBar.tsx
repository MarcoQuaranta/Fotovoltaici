export default function TrustBar() {
  const features = [
    {
      title: "Partner fidati",
      description:
        "Non siamo legati a un solo marchio. Selezioniamo i migliori sul mercato per offrirti la soluzione più adatta alla tua casa.",
    },
    {
      title: "Massimo risparmio",
      description:
        "Collaboriamo con una vasta rete di installatori per creare offerte su misura, al miglior prezzo. E con il pagamento a rate, iniziare è ancora più facile.",
    },
    {
      title: "Supporto costante",
      description:
        "Siamo qui per te anche dopo l'installazione, con garanzie estese e soluzioni su misura per ogni fase della vita del tuo impianto.",
    },
  ];

  return (
    <section className="bg-primary py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Left: Heading */}
          <div className="col-span-12 md:col-span-6 mb-8 md:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white text-balance">
              La scelta di oltre 10.000 famiglie in Italia.
            </h2>
          </div>

          {/* Right: Description */}
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="text-lg md:text-xl text-white/80">
              Dal preventivo all'installazione e oltre: siamo con te in ogni passo per una scelta sicura e duratura.
            </p>
          </div>

          {/* Full Width Image */}
          <div className="col-span-12 mt-8 md:mt-10 xl:mt-16 mb-10">
            <img
              src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=2000&q=80"
              alt="Case con pannelli solari"
              className="w-full h-auto aspect-[21/9] object-cover rounded-xl shadow-2xl"
            />
          </div>

          {/* Features Grid */}
          <div className="col-span-12">
            <dl className="grid md:grid-cols-3 gap-8 md:gap-16">
              {features.map((feature, index) => (
                <div key={index} className="border-t border-white/20 pt-8">
                  <dt className="text-xl md:text-2xl font-semibold text-white/90 mb-3">
                    {feature.title}
                  </dt>
                  <dd className="text-white/60 leading-relaxed">
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
