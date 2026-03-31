"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const CONFIGURAZIONI = [
  {
    id: "3kw",
    potenza: "3 kW",
    label: "3 kW",
    produzioneAnnua: 3900,
    prezzi: {
      base: 7100,
      batteria: 10050,
      batteriaColonna: 11700,
    },
  },
  {
    id: "6kw",
    potenza: "6 kW",
    label: "6 kW",
    produzioneAnnua: 7800,
    prezzi: {
      base: 7900,
      batteria: 11050,
      batteriaColonna: 12700,
    },
  },
  {
    id: "9kw",
    potenza: "9 kW",
    label: "9 kW",
    produzioneAnnua: 11700,
    prezzi: {
      base: 11700,
      batteria: 12700,
      batteriaColonna: 13650,
    },
  },
];

function PreventivoContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<"acquisto" | "rate">("acquisto");
  const [showContactForm, setShowContactForm] = useState(false);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([1]));
  const [isMobile, setIsMobile] = useState(false);

  const [configId, setConfigId] = useState("3kw");
  const [batteria, setBatteria] = useState(false);
  const [colonnaRicarica, setColonnaRicarica] = useState(false);

  // Form contatto
  const [contactForm, setContactForm] = useState({ nome: "", telefono: "", email: "" });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleSection = (n: number) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(n)) {
        next.delete(n);
      } else {
        if (isMobile) next.clear();
        next.add(n);
      }
      return next;
    });
  };

  // Se disattivi batteria, disattiva anche colonna
  useEffect(() => {
    if (!batteria) setColonnaRicarica(false);
  }, [batteria]);

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
          if (prev < loadingSteps.length - 1) return prev + 1;
          return prev;
        });
      }, 1000);
      const loadingTimeout = setTimeout(() => setIsLoading(false), 4000);
      return () => {
        clearInterval(stepInterval);
        clearTimeout(loadingTimeout);
      };
    }
  }, [isLoading]);

  const config = CONFIGURAZIONI.find(c => c.id === configId)!;

  const calcolaPrezzo = () => {
    if (batteria && colonnaRicarica) return config.prezzi.batteriaColonna;
    if (batteria) return config.prezzi.batteria;
    return config.prezzi.base;
  };

  const prezzoTotale = calcolaPrezzo();
  const detrazione = Math.round(prezzoTotale * 50 / 100);
  const prezzoNetto = prezzoTotale - detrazione;
  const rataMensile = Math.round((prezzoTotale * 1.12) / 120);
  const risparmioAnnuo = Math.round(config.produzioneAnnua * 0.25);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const digits = contactForm.telefono.replace(/\D/g, "");
    if (digits.length < 7) {
      setPhoneError(true);
      return;
    }

    try {
      const submitted: string[] = JSON.parse(localStorage.getItem("nexevo_leads") || "[]");
      if (submitted.includes(contactForm.telefono)) {
        setDuplicateError(true);
        return;
      }
    } catch {
      // silent
    }

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/lead-preventivo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: contactForm.nome,
          telefono: contactForm.telefono,
          email: contactForm.email || null,
          potenza: config.potenza,
          batteria,
          colonna_ricarica: colonnaRicarica,
          prezzo: prezzoTotale,
          indirizzo: address || null,
        }),
      });
      if (res.ok) {
        try {
          const submitted: string[] = JSON.parse(localStorage.getItem("nexevo_leads") || "[]");
          submitted.push(contactForm.telefono);
          localStorage.setItem("nexevo_leads", JSON.stringify(submitted));
        } catch {
          // silent
        }
        setFormSubmitted(true);
      }
    } catch {
      // silent
    }
    setFormSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col relative">
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
    <div className="min-h-screen bg-[#B3FE85]/[0.01] flex flex-col relative">
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

          <div className="grid gap-6 lg:gap-16 lg:grid-cols-3">
            {/* Configuratore */}
            <div className="lg:col-span-1 space-y-5">
              {/* Selezione Potenza */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(1)}
                  className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full text-sm flex items-center justify-center">1</span>
                    Potenza impianto
                  </h3>
                  <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openSections.has(1) ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openSections.has(1) ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  <div className="px-5 pb-5">
                    <div className="grid grid-cols-3 gap-3">
                      {CONFIGURAZIONI.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setConfigId(c.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-center cursor-pointer ${
                            configId === c.id
                              ? "border-[#4CAF50] bg-[#B3FE85]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <p className="text-2xl font-bold text-gray-900">{c.label}</p>
                          <p className="text-xs text-gray-500 mt-1">~{c.produzioneAnnua.toLocaleString("it-IT")} kWh/anno</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Batteria */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(2)}
                  className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full text-sm flex items-center justify-center">2</span>
                    Batteria di accumulo
                  </h3>
                  <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openSections.has(2) ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openSections.has(2) ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  <div className="px-5 pb-5">
                    <p className="text-xs text-gray-500 mb-4">Accumula energia per usarla di sera e di notte</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => setBatteria(false)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          !batteria
                            ? "border-[#4CAF50] bg-[#B3FE85]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">Senza batteria</p>
                            <p className="text-sm text-gray-500">Utilizzo diretto dell&apos;energia prodotta</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            !batteria ? "border-[#2E7D32] bg-[#2E7D32]" : "border-gray-300"
                          }`}>
                            {!batteria && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setBatteria(true)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          batteria
                            ? "border-[#4CAF50] bg-[#B3FE85]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">Con batteria</p>
                            <p className="text-sm text-gray-500">Massima autonomia energetica</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            batteria ? "border-[#2E7D32] bg-[#2E7D32]" : "border-gray-300"
                          }`}>
                            {batteria && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonna di ricarica */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(3)}
                  className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full text-sm flex items-center justify-center">3</span>
                    Colonna di ricarica
                  </h3>
                  <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openSections.has(3) ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openSections.has(3) ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  <div className="px-5 pb-5">
                    <p className="text-xs text-gray-500 mb-4">Ricarica la tua auto elettrica con energia solare</p>
                    {!batteria && (
                      <p className="text-amber-600 text-sm mb-3">Seleziona prima la batteria per aggiungere la colonna di ricarica</p>
                    )}
                    <div className="space-y-2">
                      <button
                        onClick={() => batteria && setColonnaRicarica(false)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          batteria ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                        } ${
                          !colonnaRicarica
                            ? "border-[#4CAF50] bg-[#B3FE85]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-900">Senza colonna</p>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            !colonnaRicarica ? "border-[#2E7D32] bg-[#2E7D32]" : "border-gray-300"
                          }`}>
                            {!colonnaRicarica && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => batteria && setColonnaRicarica(true)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          batteria ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                        } ${
                          colonnaRicarica
                            ? "border-[#4CAF50] bg-[#B3FE85]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">Con colonna di ricarica</p>
                            <p className="text-sm text-gray-500">Wallbox per veicoli elettrici</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            colonnaRicarica ? "border-[#2E7D32] bg-[#2E7D32]" : "border-gray-300"
                          }`}>
                            {colonnaRicarica && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Riepilogo Preventivo */}
            <div className="lg:col-span-2">
              {/* Configurazione selezionata */}
              <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900">La tua configurazione</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-black/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Potenza</p>
                    <p className="font-semibold text-gray-900">{config.potenza}</p>
                  </div>
                  <div className="bg-black/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Produzione</p>
                    <p className="font-semibold text-gray-900">~{config.produzioneAnnua.toLocaleString("it-IT")} kWh/anno</p>
                  </div>
                  <div className="bg-black/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Batteria</p>
                    <p className="font-semibold text-gray-900">{batteria ? "Inclusa" : "Non inclusa"}</p>
                  </div>
                  <div className="bg-black/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">Colonna di ricarica</p>
                    <p className="font-semibold text-gray-900">{colonnaRicarica ? "Inclusa" : "Non inclusa"}</p>
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
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#B3FE85]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Risparmio stimato in bolletta</p>
                      <p className="text-gray-600 text-sm">Basato su {config.produzioneAnnua.toLocaleString("it-IT")} kWh/anno</p>
                    </div>
                  </div>
                  <div className="text-right ml-auto">
                    <p className="text-3xl font-bold text-[#4CAF50]">{risparmioAnnuo.toLocaleString("it-IT")}</p>
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
                        <p className="text-4xl font-bold text-gray-900">{prezzoTotale.toLocaleString("it-IT")}</p>
                        <p className="text-sm text-gray-500">IVA agevolata 10% inclusa</p>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-emerald-700">Detrazione fiscale 50%</p>
                            <p className="text-sm text-gray-600">Recuperi in 10 anni</p>
                          </div>
                          <p className="text-2xl font-semibold text-emerald-600">-{detrazione.toLocaleString("it-IT")}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Costo effettivo netto</span>
                          <span className="text-2xl font-bold text-black">{prezzoNetto.toLocaleString("it-IT")}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-500 mb-1">A partire da</p>
                        <div className="flex items-baseline justify-center gap-1">
                          <p className="text-4xl font-bold text-gray-900">{rataMensile}</p>
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
                          <p className="font-semibold text-gray-900">{prezzoTotale.toLocaleString("it-IT")}</p>
                        </div>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                        <p className="text-sm font-medium text-emerald-700">Detrazione fiscale 50%</p>
                        <p className="text-sm text-gray-600">Recuperi {detrazione.toLocaleString("it-IT")} in 10 anni</p>
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
                    className="w-full font-semibold py-3.5 rounded-lg transition-colors bg-[#B3FE85] hover:bg-[#9FE870] text-[#1B5E20] cursor-pointer"
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
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowContactForm(false)}
          ></div>

          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {formSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#B3FE85]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Richiesta inviata!</h3>
                <p className="text-gray-500">
                  Grazie {contactForm.nome}! Ti contatteremo entro 24 ore per confermare la tua configurazione.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Richiedi una consulenza gratuita
                </h3>
                <p className="text-gray-500 text-sm mb-5">
                  Ti contatteremo per confermare la configurazione o per trovare la soluzione migliore per te.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-5">
                  <p className="text-xs text-slate-500 mb-1">La tua configurazione</p>
                  <p className="font-medium text-slate-800">
                    Impianto {config.potenza}{batteria ? " + Batteria" : ""}{colonnaRicarica ? " + Colonna di ricarica" : ""}
                  </p>
                  <p className="text-lg font-bold text-black mt-1">{prezzoTotale.toLocaleString("it-IT")}</p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Nome e Cognome"
                    value={contactForm.nome}
                    onChange={e => setContactForm(prev => ({ ...prev, nome: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Numero di telefono"
                    value={contactForm.telefono}
                    onChange={e => {
                      let val = e.target.value.replace(/[^\d+]/g, "");
                      if (val.indexOf("+") > 0) val = val.replace(/\+/g, "");
                      setContactForm(prev => ({ ...prev, telefono: val }));
                      if (phoneError) setPhoneError(false);
                      if (duplicateError) setDuplicateError(false);
                    }}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email (opzionale)"
                    value={contactForm.email}
                    onChange={e => {
                      setContactForm(prev => ({ ...prev, email: e.target.value }));
                      if (duplicateError) setDuplicateError(false);
                    }}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-primary focus:outline-none text-sm"
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm text-center">
                      Inserisci un numero di telefono valido (almeno 7 cifre).
                    </p>
                  )}
                  {duplicateError && (
                    <p className="text-red-500 text-sm text-center">
                      Hai già inviato una richiesta con questo numero di telefono.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-[#B3FE85] hover:bg-[#9FE870] text-black font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {formSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Invio in corso...
                      </span>
                    ) : (
                      "Invia richiesta"
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-400 mt-4 text-center">
                  I tuoi dati sono al sicuro e non verranno condivisi con terzi.
                </p>
              </>
            )}
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
