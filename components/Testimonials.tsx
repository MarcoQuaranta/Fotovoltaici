export default function Testimonials() {
  const testimonials = [
    {
      name: "Marco Rossi",
      location: "Milano",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
      text: "Installazione impeccabile in soli 20 giorni. Dopo 6 mesi ho già visto una riduzione del 65% sulla bolletta. Team professionale e sempre disponibile.",
      savings: "€980/anno",
      date: "Installato a Marzo 2024"
    },
    {
      name: "Laura Bianchi",
      location: "Roma",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
      text: "Zero pensieri! Hanno gestito tutto loro: pratiche comunali, GSE, allacciamento Enel. Io ho solo firmato e aspettato. Consigliatissimi.",
      savings: "€1.200/anno",
      date: "Installato a Gennaio 2024"
    },
    {
      name: "Giuseppe Verdi",
      location: "Napoli",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
      text: "Con la batteria di accumulo sono praticamente autonomo. Anche di sera uso l'energia accumulata durante il giorno. Investimento top!",
      savings: "€1.450/anno",
      date: "Installato a Novembre 2023"
    }
  ];

  return (
    <section id="recensioni" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Recensioni verificate
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Cosa dicono i nostri clienti
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oltre 10.000 famiglie hanno già scelto di risparmiare con noi. Ecco le loro storie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Savings Badge */}
              <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                Risparmio: {testimonial.savings}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-dark">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot Badge */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Valutazione</span>
            <span className="text-2xl font-bold text-dark">Eccellente</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-semibold text-dark">4.8 su 5</span>
          </div>
          <div className="text-gray-500">
            Basato su <span className="font-medium text-dark">2.847 recensioni</span> su Trustpilot
          </div>
        </div>
      </div>
    </section>
  );
}
