"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import offerte from "@/data/offerte.json";

type Marca = typeof offerte.marche[0];
type Configurazione = typeof offerte.configurazioni[0];

interface ConfigState {
  marcaId: string;
  numeroPannelli: number;
  accessoriSelezionati: string[];
}

function PreventivoContent() {
  const searchParams = useSearchParams();
  const pacchetto = searchParams.get("pacchetto");
  const marcaParam = searchParams.get("marca");
  const address = searchParams.get("address") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<"acquisto" | "rate">("acquisto");
  const [showContactForm, setShowContactForm] = useState(false);

  // Stato configurazione
  const [config, setConfig] = useState<ConfigState>(() => {
    // Se arriva da un pacchetto predefinito, usa quella configurazione
    if (pacchetto) {
      const pkg = offerte.pacchetti.find(p => p.id === pacchetto);
      if (pkg) {
        const conf = offerte.configurazioni.find(c => c.id === pkg.configurazione);
        if (conf) {
          return {
            marcaId: conf.marca,
            numeroPannelli: conf.numeroPannelli,
            accessoriSelezionati: [...pkg.accessoriInclusi]
          };
        }
      }
    }
    // Se arriva con marca specifica
    if (marcaParam && (marcaParam === "trinasolar" || marcaParam === "canadian")) {
      return {
        marcaId: marcaParam,
        numeroPannelli: 10,
        accessoriSelezionati: []
      };
    }
    // Default: Trinasolar 10 pannelli
    return {
      marcaId: "trinasolar",
      numeroPannelli: 10,
      accessoriSelezionati: []
    };
  });

  const loadingSteps = [
    "Analizzando la tua configurazione",
    "Calcolando la potenza ottimale",
    "Stimando la produzione energetica",
    "Preparando la tua offerta personalizzata"
  ];

  useEffect(() => {
    if (isLoading) {
      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 1000);

      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 4000);

      return () => {
        clearInterval(stepInterval);
        clearTimeout(loadingTimeout);
      };
    }
  }, [isLoading]);

  // Trova la configurazione corrente
  const getConfigurazioneCorrente = (): Configurazione | null => {
    return offerte.configurazioni.find(
      c => c.marca === config.marcaId && c.numeroPannelli === config.numeroPannelli
    ) || null;
  };

  // Calcola prezzo totale
  const calcolaPrezzo = () => {
    const conf = getConfigurazioneCorrente();
    if (!conf) return 0;

    let prezzo = conf.prezzoBase;
    config.accessoriSelezionati.forEach(accId => {
      const acc = offerte.accessori.find(a => a.id === accId);
      if (acc) prezzo += acc.prezzo;
    });

    return prezzo;
  };

  // Calcola risparmio annuo stimato
  const calcolaRisparmioAnnuo = () => {
    const conf = getConfigurazioneCorrente();
    if (!conf) return 0;
    return Math.round(conf.produzioneAnnua * offerte.prezzoKwhMedio);
  };

  // Ottieni marca corrente
  const getMarcaCorrente = (): Marca | undefined => {
    return offerte.marche.find(m => m.id === config.marcaId);
  };

  // Ottieni numeri pannelli disponibili per marca
  const getNumeriPannelliDisponibili = (): number[] => {
    return offerte.configurazioni
      .filter(c => c.marca === config.marcaId)
      .map(c => c.numeroPannelli)
      .sort((a, b) => a - b);
  };

  const prezzoTotale = calcolaPrezzo();
  const detrazione = Math.round(prezzoTotale * offerte.detrazioneFiscale / 100);
  const prezzoNetto = prezzoTotale - detrazione;
  const rataMensile = Math.round((prezzoTotale * 1.12) / 120); // 120 mesi, interesse ~12%
  const configCorrente = getConfigurazioneCorrente();
  const marcaCorrente = getMarcaCorrente();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col relative">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/85" />
        </div>
        <nav className="relative z-10 flex w-full items-center bg-white/80 backdrop-blur-sm px-6 shadow-sm md:px-8 py-4">
          <div className="flex-1 text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Nexevo"
                width={120}
                height={35}
                className="h-8 w-auto [filter:brightness(0)_saturate(100%)_invert(30%)_sepia(50%)_saturate(500%)_hue-rotate(70deg)_brightness(80%)]"
              />
            </Link>
          </div>
        </nav>

        <main className="relative z-10 flex-1 flex items-center justify-center">
          <div className="max-w-xl mx-auto px-4 pt-10 text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#B3FE85] to-[#9FE870] rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            <ul className="space-y-4 text-left max-w-md mx-auto">
              {loadingSteps.map((step, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-4 text-lg font-medium transition-opacity duration-500 ${
                    index <= currentStep ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index <= currentStep ? "bg-black" : "bg-gray-200"
                  }`}>
                    {index < currentStep ? (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : index === currentStep ? (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <svg className="w-12 h-12 mx-auto text-[#B3FE85] animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#B3FE85]/[0.04] flex flex-col relative">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <nav className="relative z-10 flex w-full items-center justify-between bg-white/90 backdrop-blur-sm px-6 border-b border-gray-200 md:px-8 py-4">
        <Link href="/" className="inline-block">
          <Image
            src="/images/logo.png"
            alt="Nexevo"
            width={120}
            height={35}
            className="h-8 w-auto [filter:brightness(0)_saturate(100%)_invert(30%)_sepia(50%)_saturate(500%)_hue-rotate(70deg)_brightness(80%)]"
          />
        </Link>
      </nav>

      <main className="relative z-10 flex-1 py-4 md:py-8 px-3 md:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <span className="inline-block bg-[#B3FE85]/15 text-black font-medium text-xs md:text-sm uppercase tracking-wide px-3 py-1 md:px-4 md:py-1.5 rounded mb-2 md:mb-3">
              Configura il tuo impianto
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-3">
              Crea il tuo preventivo
            </h1>
            {address && (
              <p className="text-sm md:text-base flex items-center justify-center gap-1.5 md:gap-2 px-2 text-gray-500">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#B3FE85] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium text-black bg-[#B3FE85]/10 px-2 py-0.5 rounded">{address}</span>
              </p>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Configuratore */}
            <div className="lg:col-span-2 space-y-4">
                {/* Selezione Marca */}
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full text-sm flex items-center justify-center">1</span>
                    Scegli la marca
                  </h3>
                  <div className="space-y-3">
                    {offerte.marche.map(marca => (
                      <button
                        key={marca.id}
                        onClick={() => setConfig(prev => ({ ...prev, marcaId: marca.id }))}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          config.marcaId === marca.id
                            ? "border-[#4CAF50] bg-[#B3FE85]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{marca.nome}</p>
                            <p className="text-sm text-gray-500">{marca.modello}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            config.marcaId === marca.id ? "border-[#2E7D32] bg-[#2E7D32]" : "border-gray-300"
                          }`}>
                            {config.marcaId === marca.id && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{marca.descrizione}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selezione Numero Pannelli */}
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full text-sm flex items-center justify-center">2</span>
                    Numero di pannelli
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {getNumeriPannelliDisponibili().map(num => {
                      const conf = offerte.configurazioni.find(c => c.marca === config.marcaId && c.numeroPannelli === num);
                      return (
                        <button
                          key={num}
                          onClick={() => setConfig(prev => ({ ...prev, numeroPannelli: num }))}
                          className={`p-4 rounded-lg border-2 transition-all text-center cursor-pointer ${
                            config.numeroPannelli === num
                              ? "border-[#4CAF50] bg-[#B3FE85]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <p className="text-2xl font-bold text-gray-900">{num}</p>
                          <p className="text-xs text-gray-500">pannelli</p>
                          <p className="text-sm font-semibold text-black mt-1">{conf?.potenzaKw} kW</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
            </div>

            {/* Riepilogo Preventivo */}
            <div className="lg:col-span-3">
              {/* Configurazione selezionata */}
              <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900">La tua configurazione</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Marca</p>
                    <p className="font-semibold text-gray-900">{marcaCorrente?.nome}</p>
                  </div>
                  <div className="bg-black/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Pannelli</p>
                    <p className="font-semibold text-gray-900">{config.numeroPannelli}x {marcaCorrente?.potenzaPannello}W</p>
                  </div>
                  <div className="bg-black/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Potenza</p>
                    <p className="font-semibold text-gray-900">{configCorrente?.potenzaKw} kWp</p>
                  </div>
                  <div className="bg-black/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Produzione</p>
                    <p className="font-semibold text-gray-900">~{configCorrente?.produzioneAnnua.toLocaleString("it-IT")} kWh/anno</p>
                  </div>
                </div>

              </div>

              {/* Incluso nel preventivo */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 text-sm mb-3">Sempre incluso:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z", title: "Pannelli solari" },
                    { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Inverter" },
                    { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", title: "Installazione" },
                    { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Pratiche GSE" },
                    { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Garanzia 25 anni" },
                    { icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Monitoraggio app" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-[#2E7D32] rounded-lg">
                      <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                      <span className="text-white text-sm font-medium">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risparmio stimato */}
              <div className="bg-[#B3FE85]/10 border border-[#B3FE85]/25 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#B3FE85]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Risparmio stimato in bolletta</p>
                      <p className="text-gray-600 text-sm">Basato su {configCorrente?.produzioneAnnua.toLocaleString("it-IT")} kWh/anno</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#4CAF50]">€{calcolaRisparmioAnnuo().toLocaleString("it-IT")}</p>
                    <p className="text-gray-600 text-sm">/anno</p>
                  </div>
                </div>
              </div>

              {/* Opzioni pagamento */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-4">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setSelectedPlan("acquisto")}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-all text-sm cursor-pointer ${
                      selectedPlan === "acquisto"
                        ? "bg-[#4CAF50] text-white"
                        : "bg-slate-50 text-gray-600 hover:bg-slate-100"
                    }`}
                  >
                    Acquisto Diretto
                  </button>
                  <button
                    onClick={() => setSelectedPlan("rate")}
                    className={`flex-1 py-3 px-4 text-center font-medium transition-all text-sm cursor-pointer ${
                      selectedPlan === "rate"
                        ? "bg-[#B3FE85] text-black"
                        : "bg-slate-50 text-gray-600 hover:bg-slate-100"
                    }`}
                  >
                    Finanziamento
                  </button>
                </div>

                <div className="p-5">
                  {selectedPlan === "acquisto" ? (
                    <div>
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-500 mb-1">Prezzo chiavi in mano</p>
                        <p className="text-4xl font-bold text-gray-900">€{prezzoTotale.toLocaleString("it-IT")}</p>
                        <p className="text-sm text-gray-500">IVA agevolata 10% inclusa</p>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-emerald-700">Detrazione fiscale 50%</p>
                            <p className="text-sm text-gray-600">Recuperi in 10 anni</p>
                          </div>
                          <p className="text-2xl font-semibold text-emerald-600">-€{detrazione.toLocaleString("it-IT")}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Costo effettivo netto</span>
                          <span className="text-2xl font-bold text-black">€{prezzoNetto.toLocaleString("it-IT")}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-500 mb-1">A partire da</p>
                        <div className="flex items-baseline justify-center gap-1">
                          <p className="text-4xl font-bold text-gray-900">€{rataMensile}</p>
                          <span className="text-lg text-gray-500">/mese</span>
                        </div>
                        <p className="text-sm text-gray-500">TAN 6,65% - TAEG 7,82%</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <p className="text-xs text-gray-500">Durata</p>
                          <p className="font-semibold text-gray-900">120 mesi</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <p className="text-xs text-gray-500">Importo</p>
                          <p className="font-semibold text-gray-900">€{prezzoTotale.toLocaleString("it-IT")}</p>
                        </div>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                        <p className="text-sm font-medium text-emerald-700">Detrazione fiscale 50%</p>
                        <p className="text-sm text-gray-600">Recuperi €{detrazione.toLocaleString("it-IT")} in 10 anni</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="mx-5 mb-5 bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="font-medium text-slate-600">Nota:</span> Il prezzo indicato è puramente indicativo e può subire variazioni in base alla tipologia e alle caratteristiche specifiche della tua copertura. Verranno inoltre eseguiti controlli relativi ai vincoli ambientali e alle disposizioni normative locali. Richiedi una consulenza gratuita per avere il tuo preventivo finale.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="px-5 pb-5">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-[#B3FE85] hover:bg-[#9FE870] text-black font-semibold py-3.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Richiedi una consulenza gratuita
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Form Contatto */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowContactForm(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            {/* Close button */}
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              Richiedi una consulenza gratuita
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              Ti contatteremo per confermare la configurazione o per trovare la soluzione migliore per te.
            </p>

            {/* Riepilogo config */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-5">
              <p className="text-xs text-slate-500 mb-1">La tua configurazione</p>
              <p className="font-medium text-slate-800">
                {marcaCorrente?.nome} - {config.numeroPannelli} pannelli ({configCorrente?.potenzaKw} kW)
              </p>
              <p className="text-lg font-bold text-black mt-1">€{prezzoTotale.toLocaleString("it-IT")}</p>
            </div>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="Nome e Cognome"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-primary focus:outline-none text-sm"
              />
              <input
                type="tel"
                placeholder="Numero di telefono"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-primary focus:outline-none text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-primary focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="w-full bg-[#B3FE85] hover:bg-[#9FE870] text-black font-semibold py-3 rounded-lg transition-colors cursor-pointer"
              >
                Invia richiesta
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4 text-center">
              I tuoi dati sono al sicuro e non verranno condivisi con terzi.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function PreventivoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-black border-t-transparent rounded-full"></div>
      </div>
    }>
      <PreventivoContent />
    </Suspense>
  );
}
