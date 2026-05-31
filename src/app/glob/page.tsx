"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  ArrowRight,
  ShieldCheck,
  Database,
  CreditCard,
  Receipt,
  Cpu,
  ShoppingCart,
  MessageCircle,
  Mail,
  Server,
  Map,
  Lock,
  Smartphone,
  TerminalSquare,
  Bot,
  CheckCircle2,
  User,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ДАНІ СЦЕН SCROLLYTELLING ---
const SCENES = [
  {
    id: "frontend-security",
    title: "Das Gesicht der Plattform: Speed & DSGVO.",
    description:
      "Der Kunden-Einstieg basiert auf dem leichten Blocksy/Kadence-Theme und dem Next.js-Framework. Eine Design-Token-System ersetzt schwere Page-Builder. Ab der ersten Sekunde schützt 'Friendly Captcha' (Proof-of-Work) vor Bots – ohne nervige Bilderrätsel. Analysen sammelt der Server via Matomo (Self-Hosted) zu 100% Cookie-frei.",
    insight:
      "Maximale Ladezeiten (Core Web Vitals) und 100%iger Schutz vor DSGVO-Strafen durch amerikanische Tracker (wie Google Analytics oder reCAPTCHA).",
  },
  {
    id: "booking-engine",
    title: "Das Herz: Amelia Booking Engine & Redis.",
    description:
      "Das Amelia-Plugin verwaltet Kalender, Raumkapazitäten und Personal. Um Doppelbuchungen zu verhindern, nutzt das System einen hybriden serverseitigen Redis-Mutex. Während der Kunde bucht, wird der Slot für 10-15 Minuten gesperrt.",
    insight:
      "Schließt der Kunde den Browser, prüft ein Hintergrund-Skript (Zombie Collector) minütlich die Redis-Locks und gibt den Slot sofort wieder für andere Gäste frei.",
  },
  {
    id: "payment-gateway",
    title: "Der Finanz-Motor: Online & Offline.",
    description:
      "Alle Zahlungen laufen über Stripe. Online (Apple Pay, SEPA, Kreditkarte) und Offline an der Rezeption via Server-Driven Integration mit BBPOS WisePOS E Terminals. Bei Franchises splittet Stripe Connect die Zahlung automatisch zwischen Partner und HQ.",
    insight:
      "Das Terminal benötigt keine lokale Verbindung zum Tablet. Das Backend sendet den Betrag über die Stripe Cloud-API direkt auf den Bildschirm des Geräts (verhindert 'Fat Finger Errors').",
  },
  {
    id: "fiscal-cloud",
    title: "Automatisierte Fiskalisierung (TSE).",
    description:
      "Nach der Zahlung ruft das System die REST-API des Kassensystems ready2order auf. Dieser Service signiert die Transaktion kryptografisch (TSE von Fiskaly) gemäß KassenSichV und initiiert den Cloud-Druck auf einen lokalen Epson-Drucker.",
    insight:
      "Für Franchise-Nehmer nutzt ein Dynamic API Multiplexer das spezifische Account-Token der Filiale, um absolute steuerliche Isolation zu garantieren.",
  },
  {
    id: "orchestrator",
    title: "Die Nerven: Lokale Automatisierung.",
    description:
      "Statt DSGVO-problematischer Transit-Dienste (Make/Zapier) steuert 'Uncanny Automator Pro' die Kommunikation lokal On-Site. Er lauscht auf Events und löst Ketten aus: Kunden zu Brevo hinzufügen, VIP-Rollen vergeben oder WhatsApp-Nachrichten routen.",
    insight:
      "Dieses Plugin verwandelt isolierte Datenbanken in eine zentrale Data Fabric (Customer 360). Zieht Stripe Geld für das Abo ein, schaltet der Automator sofort 100% Rabatt in Amelia frei.",
  },
];

// --- КОМПОНЕНТИ ---

// 1. Блок тексту (Scroll Section)
const ScrollSection = ({
  id,
  children,
  setActiveScene,
  containerRef,
}: {
  id: string;
  children: React.ReactNode;
  setActiveScene: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { root: containerRef, amount: 0.5 });

  useEffect(() => {
    if (isInView) setActiveScene(id);
  }, [isInView, id, setActiveScene]);

  return (
    <div
      ref={ref}
      className="h-[100dvh] w-full snap-center flex flex-col justify-center p-6 lg:p-16 relative"
    >
      <motion.div
        initial={{ opacity: 0.2, scale: 0.95 }}
        animate={{ opacity: isInView ? 1 : 0.2, scale: isInView ? 1 : 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// 2. Блок Bento Grid (СВІТЛА ТЕМА ЯК У BOOKING FLOW)
const BentoCard = ({
  title,
  description,
  insight,
  icon: Icon,
  className,
  children,
}: {
  title: string;
  description: string;
  insight: string;
  icon: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(251,146,60,0.08)] hover:border-salina-orange/30 rounded-[2rem] p-6 lg:p-8 flex flex-col relative group transition-all duration-500 overflow-visible",
        className,
      )}
    >
      {/* Інсайт Тултип */}
      <div className="absolute top-6 right-6 z-50 flex flex-col items-end group/tooltip">
        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover/tooltip:bg-white group-hover/tooltip:text-salina-orange group-hover/tooltip:border-salina-orange/30 group-hover/tooltip:shadow-md transition-all cursor-help">
          <Info className="w-4 h-4" />
        </div>
        <div className="absolute top-10 right-0 w-64 p-4 bg-slate-900 text-white text-xs font-medium leading-relaxed rounded-2xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none origin-top-right">
          <span className="block text-salina-orange font-bold uppercase tracking-wider mb-1">
            Architect Insight
          </span>
          {insight}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 pr-10">
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-salina-orange shrink-0 shadow-sm border border-orange-100">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg md:text-xl font-black text-salina-dark leading-tight">
          {title}
        </h3>
      </div>

      <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 z-10 max-w-[90%]">
        {description}
      </p>

      {/* Зона для анімації */}
      <div className="mt-auto relative z-10 bg-slate-50/80 rounded-2xl border border-slate-100 p-4 min-h-[160px] flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// 3. Головний Компонент
export default function TechStackArchitecture() {
  const [activeSceneId, setActiveSceneId] = useState<string>("header");
  const containerRef = useRef<HTMLDivElement>(null);

  const allSteps = ["header", ...SCENES.map((s) => s.id)];

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] w-full bg-transparent overflow-y-auto snap-y snap-mandatory scroll-smooth relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* СТАТУС-БАР СПРАВА */}
      <div className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-center pointer-events-none">
        {allSteps.map((id) => (
          <div
            key={id}
            className={cn(
              "w-2 rounded-full transition-all duration-500 ease-out",
              activeSceneId === id
                ? "h-10 bg-gradient-to-b from-salina-orange to-salina-pink shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                : "h-2 bg-slate-300",
            )}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full relative">
        {/* ЛІВА КОЛОНКА (Скролл) */}
        <div className="w-full lg:w-1/2 relative z-10 pl-6 lg:pl-16">
          <ScrollSection
            id="header"
            setActiveScene={setActiveSceneId}
            containerRef={containerRef}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink">
              Global Tech Stack
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Eine Orchester-Architektur. High-Performance, DSGVO-konform und
              gebaut für unendliche Skalierung.
            </p>
            <div className="mt-12 flex items-center gap-4 text-salina-orange font-bold animate-bounce">
              Scrollen Sie nach unten{" "}
              <ArrowRight className="w-5 h-5 rotate-90" />
            </div>
          </ScrollSection>

          {SCENES.map((scene) => (
            <ScrollSection
              key={scene.id}
              id={scene.id}
              setActiveScene={setActiveSceneId}
              containerRef={containerRef}
            >
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-black text-salina-dark mb-6 leading-tight">
                  {scene.title}
                </h2>
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10">
                  {scene.description}
                </p>
                <div className="bg-orange-50/80 backdrop-blur-md border border-orange-200 rounded-3xl p-6 relative group hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-salina-orange shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-salina-dark uppercase tracking-wider">
                      Architect Insight
                    </p>
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {scene.insight}
                  </p>
                </div>
              </div>
            </ScrollSection>
          ))}
          <div className="h-[20vh]"></div>
        </div>

        {/* ПРАВА КОЛОНКА (Sticky Візуал) */}
        <div className="hidden lg:flex lg:w-1/2 sticky top-0 h-[100dvh] items-center justify-center p-12 overflow-hidden pointer-events-none">
          <div className="w-full max-w-lg relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* ВІЗУАЛ 0: Header (Орбіти) */}
              {activeSceneId === "header" && (
                <motion.div
                  key="header"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-[500px] flex items-center justify-center relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                    className="absolute w-72 h-72 bg-gradient-to-tr from-salina-orange to-salina-pink rounded-full blur-[80px]"
                  />

                  <div className="relative w-56 h-56 rounded-full border border-slate-200/60 flex items-center justify-center bg-white/60 backdrop-blur-2xl shadow-2xl z-10">
                    <div className="text-center flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-3 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Infrastructure Live
                        </span>
                      </div>

                      <span className="font-black text-salina-dark text-xl tracking-tight leading-none mb-1">
                        Enterprise
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Architecture
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                      }}
                      className="absolute inset-[-30px] border border-dashed border-slate-300 rounded-full"
                    />

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                      }}
                      className="absolute inset-[-70px] border border-slate-200 rounded-full"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Database className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-700">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-green-500">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-pink">
                        <Receipt className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-400">
                        <TerminalSquare className="w-5 h-5" />
                      </div>

                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full origin-center"
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)]"></div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 1: Frontend & Security */}
              {activeSceneId === "frontend-security" && (
                <motion.div
                  key="frontend-security"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-[320px] bg-white border-[8px] border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 flex flex-col items-center">
                    <div className="w-16 h-24 bg-slate-50 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center z-20">
                      <Smartphone className="w-8 h-8 text-salina-dark mb-2" />
                      <span className="text-[8px] font-bold text-slate-500">
                        Kunde
                      </span>
                    </div>

                    <motion.div
                      animate={{ height: [0, 40, 0], opacity: [0, 1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        times: [0, 0.5, 1],
                      }}
                      className="w-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10"
                    />

                    <div className="w-full bg-slate-50 border-2 border-blue-200 rounded-xl p-4 flex items-center justify-between shadow-sm z-20 relative overflow-hidden">
                      <motion.div
                        animate={{ opacity: [0, 0.1, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute inset-0 bg-blue-500"
                      />
                      <div className="flex items-center gap-2 relative z-10">
                        <ShieldCheck className="w-6 h-6 text-blue-500" />
                        <div className="text-[10px] font-bold text-salina-dark uppercase tracking-wider">
                          Friendly Captcha
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500 relative z-10" />
                    </div>

                    <div className="flex w-full mt-4 justify-between">
                      <div className="flex flex-col items-center opacity-40">
                        <div className="w-1 h-10 bg-red-200 mb-2 border-l border-dashed border-red-400" />
                        <div className="bg-red-50 border border-red-200 p-2 rounded-lg text-center relative">
                          <span className="text-[8px] text-red-500 font-bold uppercase">
                            Google Analytics
                          </span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={{ height: [0, 40, 0], opacity: [0, 1, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 3,
                            delay: 1,
                          }}
                          className="w-1 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] mb-2"
                        />
                        <div className="bg-green-50 border border-green-200 p-2 rounded-lg text-center shadow-sm">
                          <span className="text-[8px] text-green-600 font-bold uppercase">
                            Matomo (Self-Hosted)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Booking Engine (Redis Lock) */}
              {activeSceneId === "booking-engine" && (
                <motion.div
                  key="booking-engine"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-8 flex flex-col items-center">
                    <div className="flex justify-between w-full mb-8 relative">
                      <div className="text-center z-10 bg-slate-50 p-2 rounded-xl shadow-sm border border-slate-100">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                          <User className="w-4 h-4 text-salina-orange" />
                        </div>
                        <div className="text-[10px] font-bold text-slate-500">
                          Kunde A
                        </div>
                      </div>
                      <div className="text-center z-10 bg-slate-50 p-2 rounded-xl shadow-sm border border-slate-100 opacity-50">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                          <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="text-[10px] font-bold text-slate-500">
                          Kunde B
                        </div>
                      </div>

                      {/* Signal A */}
                      <motion.div
                        animate={{
                          left: ["10%", "50%"],
                          top: ["20%", "80%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          times: [0, 0.4, 1],
                        }}
                        className="absolute w-3 h-3 bg-salina-orange rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)] z-20"
                      />
                      {/* Signal B (Blocked) */}
                      <motion.div
                        animate={{
                          right: ["10%", "45%", "10%"],
                          top: ["20%", "60%", "30%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          times: [0.2, 0.6, 1],
                        }}
                        className="absolute w-3 h-3 bg-slate-300 rounded-full shadow-[0_0_10px_rgba(148,163,184,0.5)] z-20"
                      />
                    </div>

                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          borderColor: ["#fecaca", "#ef4444", "#fecaca"],
                        }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="bg-red-50 border-2 border-red-400 w-32 h-24 rounded-2xl flex flex-col items-center justify-center relative shadow-sm"
                      >
                        <Lock className="w-8 h-8 text-red-500 mb-1" />
                        <div className="text-[10px] font-bold text-red-700 uppercase">
                          Redis Mutex
                        </div>
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="absolute -top-3 bg-white text-slate-600 text-[9px] font-mono px-2 py-0.5 rounded border border-slate-200 shadow-sm"
                        >
                          14:59 min
                        </motion.div>
                      </motion.div>
                    </div>

                    <div className="mt-4 bg-blue-50 border border-blue-100 px-6 py-3 rounded-xl shadow-sm flex items-center gap-3 w-full justify-center">
                      <Database className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                          Amelia Engine
                        </div>
                        <div className="text-[10px] text-blue-600 font-mono">
                          Slot 14:00 (Protected)
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Payment Gateway (Stripe) */}
              {activeSceneId === "payment-gateway" && (
                <motion.div
                  key="payment-gateway"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-8 flex flex-col items-center">
                    <div className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xl font-black px-6 py-2 rounded-xl shadow-sm mb-8 relative z-20 flex items-center gap-2">
                      <CreditCard className="w-6 h-6" /> Stripe API
                    </div>

                    {/* Signals */}
                    <motion.div
                      animate={{ y: [0, 60], x: [0, -60], opacity: [0, 1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        times: [0, 0.5, 1],
                      }}
                      className="absolute top-24 left-1/2 w-4 h-4 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10"
                    />
                    <motion.div
                      animate={{ y: [0, 60], x: [0, 60], opacity: [0, 1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        times: [0, 0.5, 1],
                        delay: 0.5,
                      }}
                      className="absolute top-24 left-1/2 w-4 h-4 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10"
                    />

                    <div className="flex w-full justify-between gap-4 mt-8 relative z-20">
                      {/* Web */}
                      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center shadow-sm">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Web Checkout
                        </div>
                        <div className="bg-salina-dark text-white px-3 py-1.5 rounded-lg flex items-center gap-1 w-full justify-center shadow-sm">
                          <span className="text-[10px]"></span>{" "}
                          <span className="font-bold text-xs">Pay</span>
                        </div>
                      </div>

                      {/* Terminal */}
                      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center shadow-sm">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Rezeption
                        </div>
                        <div className="w-16 h-20 bg-slate-900 rounded-xl border-4 border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
                          <motion.div
                            animate={{ opacity: [0, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              times: [0, 0.5],
                            }}
                            className="text-[10px] font-bold text-white"
                          >
                            35,00€
                          </motion.div>
                          <div className="absolute bottom-1 w-1/2 h-0.5 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Fiscal Cloud (TSE) */}
              {activeSceneId === "fiscal-cloud" && (
                <motion.div
                  key="fiscal-cloud"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-8 flex flex-col items-center">
                    <div className="flex items-center justify-between w-full mb-8">
                      <div className="bg-slate-50 text-salina-dark text-xs font-bold px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2">
                        <Server className="w-4 h-4 text-blue-500" /> ready2order
                        API
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "linear",
                        }}
                        className="w-8 h-8 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center text-blue-500 shadow-sm z-20"
                      >
                        🔑
                      </motion.div>
                    </div>

                    <motion.div
                      animate={{ height: [0, 60, 0], opacity: [0, 1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        times: [0, 0.5, 1],
                      }}
                      className="w-1 bg-slate-200 border-l border-dashed border-slate-300 absolute top-20 z-10"
                    />

                    <div className="w-full mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-6 items-center shadow-inner relative z-20">
                      {/* Printer Mock */}
                      <div className="relative w-20 h-16 bg-slate-800 rounded-t-xl rounded-b-sm border-b-8 border-slate-900 flex justify-center shadow-lg">
                        <motion.div
                          animate={{ y: [-40, -10, -40] }}
                          transition={{
                            repeat: Infinity,
                            duration: 4,
                            times: [0, 0.5, 1],
                          }}
                          className="absolute -top-8 bg-white border border-slate-200 w-12 h-16 flex flex-col items-center p-1 shadow-md"
                        >
                          <div className="w-full h-1 bg-slate-200 mb-1"></div>
                          <div className="w-2/3 h-1 bg-slate-200 mb-2"></div>
                          <div className="w-6 h-6 bg-slate-800 rounded-sm"></div>{" "}
                          {/* QR */}
                        </motion.div>
                      </div>

                      <div className="flex-1">
                        <div className="text-xs font-bold text-salina-dark mb-1">
                          Cloud Printing (Epson)
                        </div>
                        <div className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded inline-flex items-center gap-1 font-bold border border-green-200">
                          <CheckCircle2 className="w-3 h-3" /> TSE Signatur
                          aktiv
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: Automator */}
              {activeSceneId === "orchestrator" && (
                <motion.div
                  key="orchestrator"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-full max-w-md h-[400px] bg-slate-50 border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

                    {/* Center Node */}
                    <div className="relative z-20 w-24 h-24 bg-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.2)] flex flex-col items-center justify-center border-4 border-blue-400">
                      <Cpu className="w-8 h-8 text-blue-500 mb-1" />
                      <span className="text-[8px] font-black text-salina-dark uppercase tracking-wider">
                        Automator
                      </span>
                    </div>

                    {/* Trigger (Stripe) */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white border border-slate-200 p-2 rounded-xl flex items-center gap-2 z-20 shadow-sm">
                      <CreditCard className="w-4 h-4 text-indigo-500" />
                      <span className="text-[10px] text-slate-600 font-mono font-bold">
                        Abo bezahlt
                      </span>
                    </div>
                    <motion.div
                      animate={{ height: [0, 40], opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute top-16 left-1/2 w-0.5 bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.5)] z-10"
                    />

                    {/* Actions (Amelia, Brevo, WA) */}
                    {/* Amelia */}
                    <div className="absolute bottom-12 left-8 bg-white border border-slate-200 p-2 rounded-xl flex flex-col items-center z-20 shadow-sm">
                      <Database className="w-5 h-5 text-salina-orange mb-1" />
                      <span className="text-[8px] text-slate-500 font-bold uppercase">
                        Amelia
                      </span>
                      <span className="text-[8px] text-green-600 font-bold">
                        100% Rabatt
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        width: [0, 60],
                        y: [0, 40],
                        x: [0, -60],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                      className="absolute top-1/2 left-1/2 h-0.5 bg-salina-orange origin-top-left transform rotate-[140deg] shadow-[0_0_8px_rgba(251,146,60,0.5)] z-10"
                    />

                    {/* Brevo */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-slate-200 p-2 rounded-xl flex flex-col items-center z-20 shadow-sm">
                      <Mail className="w-5 h-5 text-blue-500 mb-1" />
                      <span className="text-[8px] text-slate-500 font-bold uppercase">
                        Brevo
                      </span>
                      <span className="text-[8px] text-green-600 font-bold">
                        Tag: VIP
                      </span>
                    </div>
                    <motion.div
                      animate={{ height: [0, 60], opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                      className="absolute top-1/2 left-1/2 w-0.5 bg-blue-400 origin-top shadow-[0_0_8px_rgba(96,165,250,0.5)] z-10"
                    />

                    {/* WhatsApp */}
                    <div className="absolute bottom-12 right-8 bg-white border border-slate-200 p-2 rounded-xl flex flex-col items-center z-20 shadow-sm">
                      <MessageCircle className="w-5 h-5 text-green-500 mb-1" />
                      <span className="text-[8px] text-slate-500 font-bold uppercase">
                        WhatsApp
                      </span>
                      <span className="text-[8px] text-green-600 font-bold">
                        Nachricht
                      </span>
                    </div>
                    <motion.div
                      animate={{
                        width: [0, 60],
                        y: [0, 40],
                        x: [0, 60],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                      className="absolute top-1/2 left-1/2 h-0.5 bg-green-500 origin-top-left transform rotate-[40deg] shadow-[0_0_8px_rgba(34,197,94,0.5)] z-10"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- ЧАСТИНА 2: ENTERPRISE BENTO GRID (СВІТЛА ТЕМА ЯК У BOOKING FLOW) --- */}
      <div className="w-full snap-start py-24 px-6 lg:px-16 relative z-20 bg-transparent">
        <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-salina-dark tracking-tight mb-4">
            Ecosystem Synergy
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Tools, die nicht nur funktionieren, sondern nahtlos
            ineinandergreifen, um Loyalität, Sicherheit und Sichtbarkeit zu
            maximieren.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Блок 1: E-Commerce & Loyalität */}
          <BentoCard
            className="lg:col-span-2"
            title="E-Commerce & Loyalität (WooCommerce)"
            description="Das Amelia-Kernsystem bearbeitet nur die Raumreservierungen. Das gesamte Waren- und Gutscheingeschäft läuft sicher über WooCommerce. Die AffiliateWP-Integration ordnet über manuelle Promo-Codes im Warenkorb jedem Botschafter sein verdientes Store Credit zu."
            icon={ShoppingCart}
            insight="Volle Kontrolle über B2B-Verkäufe und Geschenkgutscheine, ohne das Buchungssystem zu überlasten."
          >
            <div className="flex w-full gap-4 items-center justify-center">
              <div className="bg-white border border-slate-200 p-4 rounded-xl flex-1 flex flex-col items-center relative overflow-hidden shadow-sm">
                <ShoppingCart className="w-6 h-6 text-slate-400 mb-2" />
                <div className="text-[10px] text-slate-600 font-mono bg-slate-50 border border-slate-100 px-2 py-1 rounded">
                  Promo: MARIA2026
                </div>
                <motion.div
                  animate={{ y: [-40, 40], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute w-1 h-12 bg-salina-orange right-0"
                />
              </div>
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight className="text-slate-400" />
              </motion.div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl flex-1 flex flex-col items-center shadow-sm">
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                  Store Credit Wallet
                </div>
                <motion.div
                  animate={{ color: ["#0f172a", "#22c55e", "#0f172a"] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-2xl font-black text-salina-dark"
                >
                  + 10,00 €
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 2: AI & WhatsApp */}
          <BentoCard
            className="lg:row-span-2"
            title="AI & Omnichannel (RAG Bot)"
            description="Ein KI-Bot (OpenAI API), der streng auf Ihre Wissensdatenbank trainiert ist (Zero Hallucination), löst 80% der Kundenanfragen. Bei komplexen Problemen generiert er einen personalisierten 'wa.me'-Link für einen nahtlosen Übergang in Ihr WhatsApp Business."
            icon={Bot}
            insight="Der Bot erfindet keine falschen Preise oder Regeln. Er leitet nahtlos an echte Mitarbeiter weiter, bevor der Kunde frustriert ist."
          >
            <div className="w-full h-full flex flex-col pt-4">
              <div className="bg-slate-100 border border-slate-200 p-3 rounded-2xl rounded-tr-sm ml-auto text-xs text-slate-600 max-w-[80%] mb-3 shadow-sm">
                Gibt es bei euch Parkplätze für SUVs?
              </div>
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl rounded-tl-sm text-xs text-blue-700 max-w-[80%] mb-4 shadow-sm">
                Unser Parkplatz hat eine Höhe von 2,10m, perfekt für SUVs! 🚙
                Brauchen Sie noch Hilfe?
              </div>
              <motion.button
                animate={{
                  scale: [1, 1.02, 1],
                  backgroundColor: ["#22c55e", "#16a34a", "#22c55e"],
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="mt-auto w-full py-3 rounded-xl flex justify-center items-center gap-2 text-white text-xs font-bold shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> Chat in WhatsApp
                fortsetzen
              </motion.button>
            </div>
          </BentoCard>

          {/* Блок 3: DSGVO Email Marketing */}
          <BentoCard
            className="lg:col-span-1"
            title="DSGVO E-Mail Marketing (Brevo)"
            description="Aufgrund von EU-Server-Vorschriften ersetzt Brevo Mailchimp. Das Double-Opt-In erfolgt nativ im Checkout. Automator weist Kunden automatisch Standort-Tags zu, sodass jede Filiale streng isoliert kommuniziert."
            icon={Mail}
            insight="Absoluter Schutz vor DSGVO-Strafen. Keine Daten verlassen die Europäische Union."
          >
            <div className="w-full flex justify-between items-end mt-4">
              <div className="flex flex-col items-center">
                <div className="bg-white border border-slate-200 shadow-sm w-16 h-12 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{ y: [-30, 10, 30], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute text-[8px] bg-blue-500 text-white px-1 rounded font-bold"
                  >
                    MUC
                  </motion.div>
                </div>
                <div className="text-[10px] font-bold text-slate-500 mt-2">
                  München
                </div>
              </div>
              <div className="flex flex-col items-center opacity-40">
                <div className="bg-slate-100 border border-slate-200 w-16 h-12 rounded-t-lg flex items-center justify-center relative">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 mt-2">
                  Berlin
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white border border-slate-200 shadow-sm w-16 h-12 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{ y: [-30, 10, 30], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
                    className="absolute text-[8px] bg-salina-orange text-white px-1 rounded font-bold"
                  >
                    FOR
                  </motion.div>
                </div>
                <div className="text-[10px] font-bold text-slate-500 mt-2">
                  Forchheim
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 4: Server Infrastructure (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="High Availability & Sicherheit (Raidboxes + WAF)"
            description="Gehostet in Deutschland (Raidboxes) für 100% DSGVO-Compliance, geschützt durch ein Edge CDN/WAF. Bei Serverausfällen der Finanzbehörde puffert ein Circuit Breaker Algorithmus die Fiskal-Anfragen in einer 'Dead Letter Queue', um Datenverlust zu verhindern."
            icon={ShieldCheck}
            insight="Ihre Website bleibt online, selbst wenn Zehntausende Kunden gleichzeitig zugreifen. Fiskaldaten gehen nie verloren."
          >
            <div className="flex w-full gap-4 items-center h-24">
              <div className="bg-white border border-slate-200 shadow-sm p-3 rounded-xl flex flex-col items-center w-32">
                <Receipt className="w-5 h-5 text-slate-400 mb-1" />
                <span className="text-[10px] font-bold text-slate-600">
                  TSE API
                </span>
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    times: [0, 0.5, 1],
                  }}
                  className="text-[8px] bg-red-100 text-red-600 px-2 rounded border border-red-200 mt-1 font-bold"
                >
                  OFFLINE
                </motion.div>
              </div>

              <div className="flex-1 flex justify-center relative">
                <motion.div
                  animate={{ color: ["#16a34a", "#dc2626", "#16a34a"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    times: [0, 0.5, 1],
                  }}
                  className="text-xs font-mono font-bold flex flex-col items-center"
                >
                  Circuit Breaker
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      times: [0, 0.5, 1],
                    }}
                  >
                    [OPEN]
                  </motion.span>
                </motion.div>
                {/* Redirect Line */}
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    times: [0, 0.5, 1],
                  }}
                  className="absolute w-full h-16 top-6 left-0 pointer-events-none"
                >
                  <svg className="w-full h-full">
                    <path
                      d="M 50 0 Q 50 40 100 40"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      fill="none"
                    />
                  </svg>
                </motion.div>
              </div>

              <motion.div
                animate={{
                  borderColor: ["#e2e8f0", "#f59e0b", "#e2e8f0"],
                  boxShadow: [
                    "none",
                    "0px 0px 15px rgba(245,158,11,0.2)",
                    "none",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  times: [0, 0.5, 1],
                }}
                className="bg-amber-50 border-2 p-3 rounded-xl flex flex-col items-center w-32"
              >
                <Database className="w-5 h-5 text-amber-600 mb-1" />
                <span className="text-[10px] font-bold text-amber-700 text-center leading-tight">
                  Dead Letter
                  <br />
                  Queue (Safe)
                </span>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 5: Local SEO */}
          <BentoCard
            className="lg:col-span-1"
            title="Lokales SEO & Schema.org"
            description="Da alle Filialen auf einer Domain laufen, generiert Next.js (SSR) automatisch unsichtbares JSON-LD Markup. Google zieht die Filialen so organisch in das 'Google Local Pack' der jeweiligen Stadt."
            icon={Map}
            insight="Automatisches und kostenloses Marketing. Sie dominieren die Suchergebnisse für 'Salzraum in meiner Nähe'."
          >
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col mt-2 shadow-sm">
              <div className="bg-white p-2 border-b border-slate-200 flex items-center gap-2">
                <div className="w-4 h-4 text-blue-500 bg-slate-100 rounded-full flex items-center justify-center text-[8px] font-bold">
                  G
                </div>
                <div className="bg-slate-100 h-4 flex-1 rounded-full border border-slate-200 flex items-center px-2 text-[8px] text-slate-500">
                  Salzraum in meiner Nähe...
                </div>
              </div>
              <div className="p-3 relative flex-1 bg-white">
                <div className="text-xs font-bold text-blue-600 mb-1">
                  La Salina Forchheim
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-400 text-[10px]">★★★★★</span>{" "}
                  <span className="text-[8px] text-slate-500">(128)</span>
                </div>
                <div className="text-[9px] text-slate-500">
                  Geöffnet ⋅ Schließt um 18:00
                </div>
                <div className="absolute top-2 right-2 w-10 h-10 bg-green-50 border border-green-100 rounded flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-red-500 fill-red-500/20" />
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
