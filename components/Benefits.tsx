"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type PanInfo,
} from "framer-motion";

/* ───────── Slide data ───────── */
const slides = [
  {
    label: "CHI SIAMO",
    title: "Giovani, concreti, diretti",
    description:
      "Siamo una realtà giovane con un'idea chiara: portare il fotovoltaico in modo smart, veloce e realmente vantaggioso. Niente promesse vaghe, solo risultati misurabili.",
    stat: "Solo risultati concreti",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "MISSION",
    title: "Il tuo tetto, la tua leva",
    description:
      "Ti accompagniamo verso una gestione energetica più efficiente e sostenibile. Casa, azienda o terreno: trasformiamo il tuo spazio in bollette ridotte, indipendenza energetica e valore aggiunto all'immobile.",
    stat: "Risparmio da subito",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    label: "COSA FACCIAMO",
    title: "Su misura, dalla A alla Z",
    description:
      "Studiamo i tuoi consumi reali — non stime generiche. Selezioniamo il fornitore più vantaggioso per te, progettiamo l'impianto su misura e installiamo con team specializzati, in tempi certi.",
    stat: "Chiavi in mano",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "ASSISTENZA",
    title: "Sempre al tuo fianco",
    description:
      "Ti seguiamo dopo il collaudo: assistenza diretta, monitoraggio e risoluzione problemi in prima persona. Il nostro supporto non finisce con l'installazione.",
    stat: "Supporto diretto",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "I TUOI VANTAGGI",
    title: "Risparmio concreto, da subito",
    description:
      "Bollette ridotte fin dal primo mese. Maggiore indipendenza dai fornitori di energia. Valore aggiunto all'immobile. Contributo reale alla riduzione delle emissioni.",
    stat: "Fino a -70% in bolletta",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "PERCHÉ NEXEVO",
    title: "Il futuro dell'energia è oggi",
    description:
      "Non vendiamo pannelli: consegniamo risparmio, efficienza e tranquillità a lungo termine. Un partner affidabile, moderno e orientato al tuo valore. Il futuro dell'energia non è domani — è oggi.",
    stat: "Partner, non venditori",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

/* ───────── Hook: window width ───────── */
function useWindowWidth() {
  const [width, setWidth] = useState(1024);
  useEffect(() => {
    setWidth(window.innerWidth);
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

/* ───────── Component ───────── */
export default function Benefits() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const width = useWindowWidth();
  const total = slides.length;

  /* ── Navigation helpers ── */
  const go = useCallback(
    (idx: number, dir?: number) => {
      void dir; // direction used only for intent
      const next = ((idx % total) + total) % total;
      setActive(next);
    },
    [total]
  );

  const prev = useCallback(() => go(active - 1), [go, active]);
  const next = useCallback(() => go(active + 1), [go, active]);

  /* ── Auto-play ── */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(active + 1), 5000);
    return () => clearInterval(id);
  }, [active, paused, go]);

  /* ── Keyboard nav ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  /* ── Drag / Swipe ── */
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  /* ── Card offset (circular) ── */
  const getOffset = (index: number) => {
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  /* ── Responsive spacing ── */
  const cardGap = width >= 1024 ? 340 : width >= 640 ? 280 : 240;

  /* ── Visible slides ── */
  const visibleIndices: number[] = [];
  for (let d = -2; d <= 2; d++) {
    visibleIndices.push(((active + d) % total + total) % total);
  }
  // Deduplicate (in case total < 5)
  const uniqueVisible = [...new Set(visibleIndices)];

  return (
    <section
      id="vantaggi"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-black relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background: stars only (glows are in sticky wrapper) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars-field absolute inset-0" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[#B3FE85] font-semibold text-sm uppercase tracking-wider mb-4">
            Scopri Nexevo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Next Step In Evolution
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Innovazione, affidabilità e sostenibilità: tutto ciò che serve per la tua rivoluzione energetica.
          </p>
        </motion.div>

        {/* ── Carousel ── */}
        <div className="relative">
          {/* Cards container */}
          <motion.div
            className="relative flex items-center justify-center min-h-[440px] sm:min-h-[420px] cursor-grab active:cursor-grabbing select-none"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence mode="popLayout">
              {uniqueVisible.map((idx) => {
                const offset = getOffset(idx);
                const isActive = offset === 0;
                const absOffset = Math.abs(offset);

                if (absOffset > 2) return null;

                return (
                  <motion.div
                    key={idx}
                    layout
                    animate={{
                      x: offset * cardGap,
                      scale: isActive ? 1 : 0.85,
                      opacity: absOffset >= 2 ? 0 : isActive ? 1 : 0.5,
                      rotateY: isActive ? 0 : offset > 0 ? -8 : 8,
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                      zIndex: 10 - absOffset,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{ position: "absolute" }}
                    className="w-[260px] sm:w-[280px] lg:w-[310px]"
                    onClick={() => {
                      if (!isActive) go(idx);
                    }}
                  >
                    <div
                      className={`
                        relative bg-[#111] rounded-2xl p-7 sm:p-8 border-t-2
                        transition-shadow duration-500
                        ${isActive ? "border-t-[#B3FE85] pulse-glow-shadow" : "border-t-white/10"}
                      `}
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 bg-[#B3FE85]/15 rounded-full flex items-center justify-center text-[#B3FE85] mb-5">
                        {slides[idx].icon}
                      </div>

                      {/* Label */}
                      <span className="text-[#B3FE85] text-xs font-bold tracking-widest uppercase">
                        {slides[idx].label}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mt-2 mb-3">
                        {slides[idx].title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {slides[idx].description}
                      </p>

                      {/* Stat */}
                      {slides[idx].stat && (
                        <div className="inline-block bg-[#B3FE85]/10 rounded-full px-4 py-1.5">
                          <span className="text-[#B3FE85] text-sm font-semibold">
                            {slides[idx].stat}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Navigation: arrows + dots */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Arrow Left */}
            <button
              onClick={prev}
              aria-label="Slide precedente"
              className="flex w-10 h-10 rounded-full bg-white/10 hover:bg-[#B3FE85]/20 items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => go(idx)}
                  aria-label={`Vai alla slide ${idx + 1}`}
                  className="relative p-1"
                >
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: idx === active ? 32 : 8,
                      height: 8,
                      backgroundColor:
                        idx === active ? "#B3FE85" : "rgba(255,255,255,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </button>
              ))}
            </div>

            {/* Arrow Right */}
            <button
              onClick={next}
              aria-label="Slide successiva"
              className="flex w-10 h-10 rounded-full bg-white/10 hover:bg-[#B3FE85]/20 items-center justify-center text-white transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <motion.div
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 bg-[#111] rounded-2xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
