export default function Testimonials() {
  const testimonials = [
    {
      name: "Fabio Martinelli",
      location: "Milano",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
      text: "Lavoro eseguito a regola d'arte in appena 20 giorni. A sei mesi dall'installazione, la bolletta si è ridotta del 65%. Squadra competente e reattiva.",
      date: "Installato a Marzo 2024"
    },
    {
      name: "Chiara Ferrante",
      location: "Roma",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
      text: "Non ho dovuto occuparmi di nulla. Hanno seguito loro tutte le pratiche: comune, GSE, Enel. Ho firmato e mi sono goduta il risultato. Li raccomando.",
      date: "Installato a Gennaio 2024"
    },
    {
      name: "Andrea Santini",
      location: "Torino",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5,
      text: "Grazie alla batteria di accumulo ho raggiunto una quasi totale autonomia. Uso l'energia solare anche nelle ore serali. Una scelta azzeccata.",
      date: "Installato a Novembre 2023"
    }
  ];

  return (
    <section id="recensioni" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Opinioni reali
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            Le esperienze di chi ci ha scelto
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Più di 10.000 famiglie hanno deciso di affidarsi a noi. Scopri le loro testimonianze.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow"
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
            <span className="text-gray-600">Giudizio</span>
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
            Calcolato su <span className="font-medium text-dark">2.847 recensioni</span> Trustpilot
          </div>
        </div>
      </div>
    </section>
  );
}
