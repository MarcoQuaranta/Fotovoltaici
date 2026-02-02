"use client";

import { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    indirizzo: "",
    consumo: "",
    messaggio: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      <section id="preventivo" className="py-20 lg:py-28 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-dark mb-4">
              Richiesta inviata con successo!
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Grazie {formData.nome}! Un nostro consulente ti contatterà entro 24 ore per fornirti un preventivo personalizzato e gratuito.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ nome: "", email: "", telefono: "", indirizzo: "", consumo: "", messaggio: "" });
              }}
              className="text-primary font-semibold hover:underline"
            >
              ← Invia un&apos;altra richiesta
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="preventivo" className="py-20 lg:py-28 bg-primary relative overflow-hidden">
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
              Preventivo gratuito
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Scopri quanto puoi risparmiare
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Compila il form e ricevi un preventivo personalizzato in base alle tue esigenze.
              Nessun impegno, consulenza gratuita.
            </p>

            <div className="space-y-4">
              {[
                "Sopralluogo gratuito e senza impegno",
                "Preventivo dettagliato entro 24 ore",
                "Assistenza per pratiche e incentivi",
                "Finanziamento a tasso zero disponibile"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-dark mb-2">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-dark mb-2">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    placeholder="333 1234567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="mario.rossi@email.com"
                />
              </div>

              <div>
                <label htmlFor="indirizzo" className="block text-sm font-medium text-dark mb-2">
                  Indirizzo installazione *
                </label>
                <input
                  type="text"
                  id="indirizzo"
                  name="indirizzo"
                  required
                  value={formData.indirizzo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Via Roma 123, Milano"
                />
              </div>

              <div>
                <label htmlFor="consumo" className="block text-sm font-medium text-dark mb-2">
                  Spesa mensile in bolletta
                </label>
                <select
                  id="consumo"
                  name="consumo"
                  value={formData.consumo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white"
                >
                  <option value="">Seleziona...</option>
                  <option value="0-50">Meno di €50</option>
                  <option value="50-100">€50 - €100</option>
                  <option value="100-150">€100 - €150</option>
                  <option value="150-200">€150 - €200</option>
                  <option value="200+">Più di €200</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-secondary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Invio in corso...
                  </span>
                ) : (
                  "Richiedi preventivo gratuito →"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                🔒 I tuoi dati sono al sicuro. Niente spam, solo il tuo preventivo.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
