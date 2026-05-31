"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  ArrowRight,
  Receipt,
  RefreshCcw,
  Search,
  Lock,
  Wallet,
  Crown,
  ShieldCheck,
  MessageCircle,
  Clock,
  CheckCircle2,
  Database,
  ShieldAlert,
  User,
  Smartphone,
  Undo2,
  Ticket,
  Mail,
  UserX,
  CreditCard,
  Ban,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ДАНІ СЦЕН SCROLLYTELLING ---
const SCENES = [
  {
    id: "auto-refund",
    title: "Auto-Refund ohne Rezeption.",
    description:
      "Ändern sich die Pläne des Kunden und er storniert rechtzeitig (vor der Stornofrist, z.B. 24h vorher), arbeitet das System völlig autonom. Das Amelia-Plugin gibt den Zeitslot im Live-Kalender der Website sofort wieder frei.",
    insight:
      "Über die API weist das System Stripe an, automatisch 100% des Betrags auf die Kreditkarte des Gastes zu erstatten. Kein manuelles Eingreifen der Buchhaltung, keine Anrufe von verärgerten Kunden («Wo ist mein Geld?»).",
  },
  {
    id: "smart-refunds",
    title: "Smart Refunds für Leistungspakete.",
    description:
      "Wurde ein stornierter Besuch nicht mit Geld, sondern über eine 10er-Karte abgebucht, wird der klassische finanzielle Refund über Stripe algorithmisch blockiert. Stattdessen wendet das System einen «Smart Refund» an.",
    insight:
      "Das System erkennt den Ursprung der Transaktion perfekt. Statt Gelder zu bewegen, bucht es einfach 1 virtuelle Sitzung auf das Guthabenkonto des Kunden zurück.",
  },
  {
    id: "store-credit",
    title: "Umwandlung in virtuelles Guthaben.",
    description:
      "Bei rechtzeitiger Stornierung geben wir dem Kunden die Wahl: Erstattung auf die Karte (dauert 3-5 Tage) ODER sofortige Gutschrift auf das virtuelle Wallet im Profil (Store Credit).",
    insight:
      "Ein geniales Tool zur Kapitalbindung. Das Unternehmen spart sich die Stripe-Gebühren (die bei einem Refund nicht erstattet werden) und garantiert, dass der Kunde das Geld definitiv bei La Salina ausgeben wird.",
  },
  {
    id: "waiting-list",
    title: "Automatisches Schließen von Terminlücken.",
    description:
      "Sobald ein Kunde erfolgreich storniert hat und der Slot frei wird, prüft das System die digitale Warteliste. Gab es für diese Uhrzeit Interessenten, agiert die Plattform als automatischer Sales-Manager.",
    insight:
      "Das System sendet sofort und ohne Ihr Zutun eine WhatsApp/E-Mail-Benachrichtigung an alle Wartenden. Sie verlieren kein Geld durch die Stornierung, der Slot wird in Minuten neu verkauft.",
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

// 2. Блок Bento Grid (ТЕМНА ТЕМА)
const DarkBentoCard = ({
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
        "bg-slate-900/50 backdrop-blur-2xl border border-white/5 shadow-2xl hover:shadow-[0_20px_60px_rgba(251,146,60,0.1)] hover:border-salina-orange/40 rounded-[2rem] p-6 lg:p-8 flex flex-col relative group transition-all duration-500 overflow-visible",
        className,
      )}
    >
      <div className="absolute top-6 right-6 z-50 flex flex-col items-end group/tooltip">
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover/tooltip:bg-slate-900 group-hover/tooltip:text-salina-orange group-hover/tooltip:border-salina-orange/50 group-hover/tooltip:shadow-[0_0_15px_rgba(251,146,60,0.3)] transition-all cursor-help">
          <Info className="w-4 h-4" />
        </div>
        <div className="absolute top-10 right-0 w-64 p-4 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium leading-relaxed rounded-2xl shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none origin-top-right">
          <span className="block text-salina-orange font-bold uppercase tracking-wider mb-1">
            Business Insight
          </span>
          {insight}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 pr-10">
        <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-salina-orange shrink-0 shadow-inner border border-white/5">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg md:text-xl font-black text-white leading-tight">
          {title}
        </h3>
      </div>

      <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6 z-10 max-w-[90%]">
        {description}
      </p>

      <div className="mt-auto relative z-10 bg-slate-950/50 rounded-2xl border border-white/5 p-4 min-h-[160px] flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// 3. Головний Компонент
export default function RefundAndRevenuePolicy() {
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
              <span className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-salina-dark">
                Refunds &
              </span>
              <br />
              Revenue Protection
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Automatisierte Rückerstattungen für Kunden, eiserner
              algorithmischer Umsatzschutz für Ihr Unternehmen.
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
                      Business Insight
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
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          System Armed
                        </span>
                      </div>

                      <span className="font-black text-salina-dark text-xl tracking-tight leading-none mb-1">
                        Revenue
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Protection
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
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Undo2 className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-700">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-pink">
                        <Receipt className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-green-500">
                        <MessageCircle className="w-5 h-5" />
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
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-salina-orange rounded-full shadow-[0_0_15px_rgba(251,146,60,1)]"></div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 1: Auto-Refund */}
              {activeSceneId === "auto-refund" && (
                <motion.div
                  key="auto-refund"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[2rem] shadow-2xl p-6 overflow-hidden">
                    {/* Notification */}
                    <motion.div
                      animate={{ y: [-60, 0, 0, -60], opacity: [0, 1, 1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        times: [0, 0.1, 0.9, 1],
                      }}
                      className="absolute top-4 left-4 right-4 bg-green-500 text-white text-[10px] font-bold p-3 rounded-xl shadow-lg flex items-center gap-2 z-20"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Slot
                      freigegeben. 35,00€ automatisch an Karte erstattet.
                    </motion.div>

                    {/* Appointment Card */}
                    <motion.div
                      animate={{
                        scale: [1, 1, 0.9, 0.9],
                        opacity: [1, 1, 0, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        times: [0, 0.3, 0.4, 1],
                      }}
                      className="mt-12 bg-slate-50 border border-slate-100 p-4 rounded-2xl relative"
                    >
                      <div className="text-lg font-black text-salina-dark mb-1">
                        Morgen, 10:00
                      </div>
                      <div className="text-xs text-slate-500 mb-4">
                        Salzraum (2 Kinder)
                      </div>
                      <button className="w-full bg-slate-200 text-slate-600 text-xs font-bold py-2 rounded-xl flex justify-center items-center gap-2">
                        <Undo2 className="w-3 h-3" /> Besuch stornieren
                      </button>

                      {/* Fake Cursor click */}
                      <motion.div
                        animate={{
                          x: [40, 0],
                          y: [40, 0],
                          scale: [1, 0.8, 1],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 6,
                          times: [0, 0.2, 0.3, 0.4],
                        }}
                        className="absolute bottom-2 right-1/2 w-4 h-4 rounded-full border-2 border-salina-orange bg-salina-orange/20"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Smart Refunds (10er-Karte) */}
              {activeSceneId === "smart-refunds" && (
                <motion.div
                  key="smart-refunds"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[2rem] shadow-2xl p-6">
                    {/* Appointment Card (Cancels) */}
                    <motion.div
                      animate={{
                        height: [120, 120, 0, 0],
                        opacity: [1, 1, 0, 0],
                        marginBottom: [16, 16, 0, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        times: [0, 0.3, 0.5, 1],
                      }}
                      className="bg-red-50 border border-red-100 p-4 rounded-2xl overflow-hidden"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm font-black text-salina-dark">
                          Morgen, 14:00
                        </div>
                        <div className="bg-white px-2 py-0.5 rounded text-[8px] font-bold text-slate-400 border border-slate-200">
                          Mit 10er-Karte bezahlt
                        </div>
                      </div>
                      <button className="w-full bg-red-500 text-white text-xs font-bold py-2 rounded-xl flex justify-center items-center">
                        Stornieren
                      </button>
                    </motion.div>

                    {/* 10er Karte Counter */}
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                          10er-Karte Salzraum
                        </div>
                        <div className="text-sm font-bold text-salina-dark">
                          Verbleibende Sitzungen:
                        </div>
                      </div>
                      <div className="bg-white w-14 h-14 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
                        <motion.div
                          animate={{ y: [0, 0, 40, 40] }}
                          transition={{
                            repeat: Infinity,
                            duration: 5,
                            times: [0, 0.4, 0.6, 1],
                          }}
                          className="text-xl font-black text-slate-400 absolute"
                        >
                          6
                        </motion.div>
                        <motion.div
                          animate={{ y: [-40, -40, 0, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 5,
                            times: [0, 0.4, 0.6, 1],
                          }}
                          className="text-xl font-black text-green-500 absolute"
                        >
                          7
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Store Credit */}
              {activeSceneId === "store-credit" && (
                <motion.div
                  key="store-credit"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[2rem] shadow-2xl p-6 overflow-hidden">
                    {/* Header Wallet */}
                    <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                      <div className="text-sm font-bold text-salina-dark">
                        Mein Profil
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 relative">
                        <motion.div
                          animate={{
                            scale: [1, 1, 1.2, 1],
                            color: ["#94a3b8", "#94a3b8", "#fb923c", "#94a3b8"],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 5,
                            times: [0, 0.4, 0.5, 1],
                          }}
                        >
                          <Wallet className="w-4 h-4" />
                        </motion.div>
                        <motion.div
                          animate={{
                            color: ["#64748b", "#64748b", "#22c55e", "#64748b"],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 5,
                            times: [0, 0.4, 0.5, 1],
                          }}
                          className="text-xs font-mono font-bold"
                        >
                          <motion.span
                            animate={{ opacity: [1, 1, 0, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              times: [0, 0.4, 0.5, 1],
                            }}
                            className="absolute right-3"
                          >
                            0,00 €
                          </motion.span>
                          <motion.span
                            animate={{ opacity: [0, 0, 1, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              times: [0, 0.4, 0.5, 1],
                            }}
                          >
                            + 35,00 €
                          </motion.span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Modal */}
                    <motion.div
                      animate={{
                        scale: [1, 1, 0.9, 0.9],
                        opacity: [1, 1, 0, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        times: [0, 0.3, 0.4, 1],
                      }}
                      className="bg-white border border-slate-200 shadow-xl p-5 rounded-2xl relative z-10"
                    >
                      <div className="text-sm font-black text-salina-dark mb-4 text-center">
                        Stornierungs-Optionen
                      </div>
                      <div className="space-y-2">
                        <button className="w-full bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold py-3 rounded-xl flex items-center gap-2 px-4">
                          <CreditCard className="w-4 h-4" /> Auf Karte (3-5
                          Tage)
                        </button>
                        <button className="w-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold py-3 rounded-xl flex items-center gap-2 px-4 relative overflow-hidden">
                          <Wallet className="w-4 h-4" /> Sofort als Store Credit
                          {/* Click Ripple */}
                          <motion.div
                            animate={{ scale: [0, 3], opacity: [0.5, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              times: [0.3, 0.4],
                            }}
                            className="absolute right-4 w-4 h-4 bg-orange-400 rounded-full"
                          />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Waiting List Trigger */}
              {activeSceneId === "waiting-list" && (
                <motion.div
                  key="waiting-list"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-[300px] h-[580px] bg-slate-950 border-[10px] border-slate-800 rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-col">
                    {/* Phone Notch (Чубчик з динаміком) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-30 flex items-center justify-center gap-2">
                      <div className="w-12 h-1 bg-slate-900 rounded-full"></div>
                      <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                    </div>

                    {/* Wallpaper */}
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 opacity-80" />

                    {/* Lock Screen Clock */}
                    <div className="absolute top-20 w-full text-center text-white/50 text-6xl font-extralight tracking-tighter z-10">
                      14:02
                    </div>

                    {/* Notifications Area (Під годинником) */}
                    <div className="w-full h-full relative z-20 flex flex-col pt-48 px-4 gap-3">
                      <motion.div
                        initial={{ y: -20, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                            <MessageCircle className="w-5 h-5 text-green-400" />
                          </div>
                          <div className="mt-0.5">
                            <p className="text-sm font-bold text-white mb-0.5">
                              WhatsApp{" "}
                              <span className="text-[9px] font-normal text-white/40 ml-1">
                                Gerade eben
                              </span>
                            </p>
                            <p className="text-[11px] text-white/80 font-medium leading-snug">
                              🔔 <span className="font-bold">La Salina:</span>{" "}
                              Ein Platz um 14:00 wurde frei! Jetzt buchen →
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- ЧАСТИНА 2: ENTERPRISE BENTO GRID (ТЕМНА ТЕМА) --- */}
      <div className="w-full snap-start py-24 px-6 lg:px-16 relative z-20 bg-slate-950 border-t border-slate-800 rounded-[40px]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-salina-pink/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider mb-6 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-salina-pink" /> Enterprise Revenue
            Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Absoluter Schutz Ihres Einkommens
          </h2>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Algorithmische Stornofristen, automatische Fiskal-Korrekturen und
            intelligentes No-Show Management.
          </p>
        </div>

        {/* Сітка Bento Grid 3x3 */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Блок 1: Algorithmic Blocker (Late Cancel) */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Algorithmischer Umsatzschutz (Stornofrist)"
            description="Die Inhaberin definiert die Deadline (z.B. 24h vor dem Termin). Ist diese Zeit verstrichen, blockiert das System automatisch die Storno-Buttons im Kunden-Dashboard."
            insight="Der Kunde kann das Geld in letzter Minute physisch nicht zurückfordern (Auto-Refund wird deaktiviert). Er muss die Rezeption kontaktieren. Ihre Einnahmen sind vor impulsiven Absagen geschützt."
            icon={Clock}
          >
            <div className="flex w-full gap-4 items-center">
              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-bold text-white">
                    Heute, 18:00
                  </div>
                  <div className="text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                    in 1 Std 45 Min
                  </div>
                </div>
                <div className="text-xs text-slate-400 mb-4">Salzraum</div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-700 text-slate-400 text-xs font-bold py-2 rounded-lg opacity-50 cursor-not-allowed flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Umbuchen
                  </button>
                  <button className="flex-1 bg-slate-700 text-slate-400 text-xs font-bold py-2 rounded-lg opacity-50 cursor-not-allowed flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Stornieren
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-300 mb-1">
                      Stornofrist abgelaufen
                    </div>
                    <div className="text-[10px] text-slate-500 leading-snug">
                      Bitte kontaktieren Sie die Rezeption für eine Klärung.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 3: Two-step Fiscal Storno (Високий) */}
          <DarkBentoCard
            className="lg:row-span-2"
            title="Zweistufiges Fiskal-Storno (ready2order)"
            description="Bei einem 100% Refund fängt das Backend den Webhook ab und muss den Beleg steuerlich annullieren. Zuerst wird der Stornogrund erstellt (storno_id), dann der originale Beleg mit diesem Key gelöscht."
            insight="Diese Architektur garantiert, dass das Finanzamt eine transparente Spur jedes stornierten Cents (KassenSichV) sieht. Sie zahlen niemals Steuern (MwSt) auf erstattete Transaktionen."
            icon={Database}
          >
            <div className="w-full h-full flex flex-col py-2 relative">
              <div className="bg-slate-800 border border-slate-700 p-2 rounded-lg text-[10px] text-slate-300 font-mono flex items-center gap-2 relative z-10 shadow-sm mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>{" "}
                Stripe: charge.refunded
              </div>

              <div className="flex-1 border-l-2 border-dashed border-slate-700 ml-4 relative pl-4 flex flex-col justify-center space-y-6">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[23px] top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 border-2 border-slate-500 rounded-full"></div>
                  <div className="bg-slate-900 border border-slate-800 p-2 rounded text-[10px] font-mono text-slate-400">
                    POST /v1/storno <br />
                    <span className="text-blue-400">Response: id_884</span>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[23px] top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 border-2 border-slate-500 rounded-full"></div>
                  <div className="bg-slate-900 border border-slate-800 p-2 rounded text-[10px] font-mono text-slate-400">
                    DELETE /v1/receipts <br />
                    <span className="text-blue-400">With Key: id_884</span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="mt-4 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold p-2 rounded-lg flex items-center justify-center gap-2 relative z-10"
              >
                <CheckCircle2 className="w-4 h-4" /> Fiskalisch annulliert
              </motion.div>
            </div>
          </DarkBentoCard>

          {/* Блок 2: Kulanz-Gutscheine (Широкий) */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Kulanz-Gutscheine statt Rückerstattung"
            description="Schreibt ein Gast 2 Stunden vor dem Termin wegen höherer Gewalt (Krankheit), gibt der Admin den Slot im Dashboard manuell frei und generiert mit 1 Klick einen digitalen Kompensationsgutschein (Kulanz)."
            insight="Sie bieten perfekten Kundenservice, aber das «echte» Geld verlässt die Konten von La Salina nicht (Cashflow gesichert). Der Kunde nutzt den Gutschein einfach zur Umbuchung."
            icon={Ticket}
          >
            <div className="flex w-full gap-6 items-center">
              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4">
                <div className="text-xs font-bold text-slate-400 uppercase mb-3">
                  Admin Dashboard
                </div>
                <button className="w-full bg-salina-orange hover:bg-orange-500 text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-lg shadow-orange-500/20">
                  Kulanz-Gutschein erstellen
                </button>
              </div>

              <div className="relative h-20 w-32 flex items-center justify-center">
                <motion.div
                  animate={{
                    x: [-20, 80],
                    y: [0, -20],
                    scale: [1, 0.6],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute z-20"
                >
                  <div className="bg-yellow-400 text-yellow-900 border border-yellow-500 px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-black tracking-wider flex items-center gap-1">
                    <Ticket className="w-3 h-3" /> KULANZ-100%
                  </div>
                </motion.div>
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 10 }}
                >
                  <path
                    d="M 0 40 Q 60 -10 120 10"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    fill="none"
                  />
                </svg>
              </div>

              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-700 pb-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-[10px] font-bold text-white">
                    WhatsApp an Gast
                  </span>
                </div>
                <div className="text-[9px] text-slate-300 leading-snug">
                  Hier ist Ihr Gutscheincode für den nächsten Besuch! Gute
                  Besserung.
                </div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 4: Partial Refund Guard */}
          <DarkBentoCard
            className="lg:col-span-1"
            title="Schutz vor Partial-Refunds"
            description="Wird in Stripe manuell ein Teilbetrag erstattet, blockiert das Backend sofort das Auto-Storno in ready2order, um Z-Bon Diskrepanzen zu verhindern."
            insight="Das System lässt nicht zu, dass Teilrückerstattungen die tägliche Kasse ruinieren. Stattdessen wird ein Alert an die Buchhaltung zur manuellen Korrektur gesendet."
            icon={ShieldAlert}
          >
            <div className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl font-mono text-[9px] leading-relaxed relative overflow-hidden">
              <div className="text-slate-500 mb-1">
                Webhook received: charge.refunded
              </div>
              <div className="text-slate-400 mb-2">
                Amount: 30.00€ (Original: 100.00€)
              </div>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  times: [0, 0.1, 0.9],
                }}
                className="bg-red-500/20 text-red-400 border border-red-500/30 p-1.5 rounded mb-2 flex items-center gap-1"
              >
                <Ban className="w-3 h-3" /> Partial Refund Detected. API
                Blocked.
              </motion.div>
              <motion.div
                animate={{ y: [20, 0], opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.2] }}
                className="flex items-center gap-1 text-yellow-500"
              >
                <Mail className="w-3 h-3" /> Alert an Buchhaltung gesendet.
              </motion.div>
            </div>
          </DarkBentoCard>

          {/* Блок 5: No-Show Management (Stretch to col-span-2 for symmetry) */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Kompromisslose No-Show Kontrolle"
            description="Erscheint ein Gast nicht und sagt nicht ab, verfällt das Ticket. Der Administrator weist dem Profil mit einem Klick den System-Tag 'No-Show' zu."
            insight="Das Geld bleibt zu 100% im Unternehmen. Sammelt ein Kunde mehrere No-Shows, blockiert das System ihn automatisch für zukünftige Online-Buchungen (Schutz vor blockierten Slots)."
            icon={UserX}
          >
            <div className="flex items-center gap-6 bg-slate-800 border border-slate-700 p-4 rounded-xl relative overflow-hidden w-full max-w-sm">
              <div className="relative">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-slate-400">
                  <User className="w-6 h-6" />
                </div>
                <motion.div
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                  className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg border border-slate-800"
                >
                  No-Show (1)
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white mb-1">
                  Thomas M.
                </div>
                <div className="text-xs text-slate-400">
                  Termin: 15:00 (Verpasst)
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <div className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                  Status: Paid
                </div>
                <motion.button
                  animate={{
                    backgroundColor: ["#334155", "#ef4444", "#334155"],
                    color: ["#94a3b8", "#fff", "#94a3b8"],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Als No-Show markieren
                </motion.button>
              </div>
            </div>
          </DarkBentoCard>
        </div>
      </div>
    </div>
  );
}
