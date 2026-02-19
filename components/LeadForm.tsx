"use client";

import { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    nome: "",
    telefono: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="preventivo" className="py-20 lg:py-28 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg p-8 lg:p-12 shadow-2xl">
            <div className="w-20 h-20 bg-[#B3FE85]/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#B3FE85]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-dark mb-4">
              Richiesta ricevuta!
            </h3>
            <p className="text-lg text-[#6C757D] mb-8">
              Grazie {formData.nome}! Verrai ricontattato da un nostro esperto entro 24 ore per ricevere un preventivo gratuito e personalizzato.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ nome: "", telefono: "", email: "" });
              }}
              className="text-black font-semibold hover:underline cursor-pointer"
            >
              Invia una nuova richiesta
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="preventivo" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="200" fill="white"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-white">
            <span className="inline-block text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">
              Consulenza gratuita
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Calcola il tuo <span className="text-[#B3FE85]">risparmio</span>
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Compila il modulo per ottenere una stima personalizzata.
              Nessun vincolo, consulenza senza costi.
            </p>

            <div className="space-y-4">
              {[
                "Sopralluogo gratuito senza obblighi",
                "Preventivo completo in 24 ore",
                "Supporto per pratiche e agevolazioni",
                "Possibilità di finanziamento a tasso zero"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#B3FE85]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#B3FE85]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg p-6 lg:p-8 shadow-2xl">
            <h3 className="text-xl font-semibold text-dark mb-1">
              Parla con un nostro esperto
            </h3>
            <p className="text-[#6C757D] text-sm mb-6">
              Ti ricontatteremo per individuare la soluzione ideale per te.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#B3FE85] focus:ring-1 focus:ring-[#B3FE85] focus:outline-none transition-colors"
                  placeholder="Nome e Cognome"
                />
              </div>

              <div>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#B3FE85] focus:ring-1 focus:ring-[#B3FE85] focus:outline-none transition-colors"
                  placeholder="Numero di telefono"
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#B3FE85] focus:ring-1 focus:ring-[#B3FE85] focus:outline-none transition-colors"
                  placeholder="Email"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-secondary py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Elaborazione...
                  </span>
                ) : (
                  "Richiedi preventivo"
                )}
              </button>

              <p className="text-xs text-[#6C757D] text-center">
                I tuoi dati sono protetti e non saranno ceduti a terzi.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
