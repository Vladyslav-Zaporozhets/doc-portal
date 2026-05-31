"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  Globe,
  Network,
  ArrowRight,
  CreditCard,
  Receipt,
  Database,
  RefreshCcw,
  EyeOff,
  MapPin,
  Search,
  Lock,
  Building2,
  Users,
  Wallet,
  Crown,
  ShieldCheck,
  MessageCircle,
  Clock,
  CheckCircle2,
  Map,
  Gift,
  FileText,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ДАНІ СЦЕН SCROLLYTELLING (Multi-Location) ---
const SCENES = [
  {
    id: "sub-routing",
    title: "Eine Plattform. Dutzende Standorte.",
    description:
      "Wir haben auf schwache Einzel-Websites für jeden Standort verzichtet. Alle Filialen laufen auf der zentralen Trust-Domain, haben aber isolierte URLs (z.B. /munich/booking). Gibt es vorerst nur einen Standort, wird die Stadtauswahl zur Conversion-Steigerung algorithmisch ausgeblendet.",
    insight:
      "Der gesamte SEO-Traffic sammelt sich auf der Hauptdomain. Eröffnen Sie eine neue Filiale in Berlin, rankt diese dank der Autorität der Mutterseite sofort ganz oben bei Google.",
  },
  {
    id: "cell-isolation",
    title: "Globale Engine. Lokale Regeln.",
    description:
      "Jede Filiale agiert als isolierte «Zelle». Das lokale Management kann eigene Raumkapazitäten, individuelle Tarife (z.B. Wochenendaufschläge) und lokale Feiertage festlegen, ohne den Zeitplan anderer Städte zu beeinträchtigen.",
    insight:
      "Eine Preisänderung in München gilt ausschließlich dort und berührt die Preispolitik in Forchheim nicht im Geringsten. Volle operative Flexibilität pro Standort.",
  },
  {
    id: "capacity-override",
    title: "Die Magie der Kapazität",
    description:
      "Da das Kernsystem erwartet, dass ein «Mitarbeiter» nur einen Kunden empfängt, haben wir virtuelle Filial-Profile erschaffen. Ein solches Profil hat unendliche Kapazität (100+), das reale Limit wird auf die physischen Räume übertragen.",
    insight:
      "Dieser Architektur-Hack erlaubt es einer Filiale, dutzende Buchungen parallel in verschiedene Räume zu leiten, ohne den Kalender künstlich zu blockieren (Overbooking-Schutz).",
  },
  {
    id: "edge-cdn",
    title: "CDN-Routing & gezielte Cache-Löschung",
    description:
      "Filialseiten laden dank Edge-CDN blitzschnell. Um Doppelbuchungen zu vermeiden, gehen alle Schreibvorgänge in die globale Datenbank. Bei einer Buchung wird der Cache ausschließlich für die jeweilige Stadt geleert.",
    insight:
      "Wenn ein Admin in München den Kalender ändert, wird der Cache nur für München invalidiert. Berliner Kunden spüren keinerlei Performance-Einbußen.",
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
        "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl hover:shadow-[0_20px_60px_rgba(251,146,60,0.1)] hover:border-salina-orange/40 rounded-[2rem] p-6 lg:p-8 flex flex-col relative group transition-all duration-500 overflow-visible",
        className,
      )}
    >
      {/* Tooltip Інсайту */}
      <div className="absolute top-6 right-6 z-50 flex flex-col items-end group/tooltip">
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover/tooltip:bg-slate-900 group-hover/tooltip:text-salina-orange group-hover/tooltip:border-salina-orange/50 group-hover/tooltip:shadow-[0_0_15px_rgba(251,146,60,0.3)] transition-all cursor-help">
          <Info className="w-4 h-4" />
        </div>
        <div className="absolute top-10 right-0 w-64 p-4 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium leading-relaxed rounded-2xl shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none origin-top-right">
          <span className="block text-salina-orange font-bold uppercase tracking-wider mb-1">
            Architect Insight
          </span>
          {insight}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 pr-10">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-salina-orange shrink-0 shadow-inner border border-white/5">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg md:text-xl font-black text-white leading-tight">
          {title}
        </h3>
      </div>

      <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6 z-10 max-w-[90%]">
        {description}
      </p>

      {/* Зона для анімації (Темна) */}
      <div className="mt-auto relative z-10 bg-slate-900/50 rounded-2xl border border-white/5 p-4 min-h-[160px] flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// 3. Головний Компонент
export default function MultiLocationArchitecture() {
  const [activeSceneId, setActiveSceneId] = useState<string>("header");
  const containerRef = useRef<HTMLDivElement>(null);

  // Прибрали bento-grid зі статусу, щоб не ламати логіку скролу
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
                Multi-Location
              </span>
              <br />
              Architecture
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Die technische Grundlage für unendliche Skalierung. Isoliert,
              sicher und global synchronisiert für all Ihre Filialen.
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
          {/* Прибрано непотрібне рожеве сяйво з бекграунду */}

          <div className="w-full max-w-lg relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* ВІЗУАЛ 0: Анімація для Заголовка (Header) */}
              {activeSceneId === "header" && (
                <motion.div
                  key="header"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-[500px] flex items-center justify-center relative"
                >
                  {/* Пульсуюче ядро (Фон) */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                    className="absolute w-72 h-72 bg-gradient-to-tr from-salina-orange to-salina-pink rounded-full blur-[80px]"
                  />

                  {/* Центральна орбіта (Хаб) */}
                  <div className="relative w-56 h-56 rounded-full border border-slate-200/60 flex items-center justify-center bg-white/60 backdrop-blur-2xl shadow-2xl z-10">
                    <div className="text-center flex flex-col items-center">
                      {/* SaaS Статус 'System Online' */}
                      <div className="flex items-center gap-2 mb-3 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          System Online
                        </span>
                      </div>

                      {/* Текст */}
                      <span className="font-black text-salina-dark text-xl tracking-tight leading-none mb-1">
                        Multi‑Location
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Engine
                      </span>
                    </div>

                    {/* Внутрішня орбіта (Пунктир) */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                      }}
                      className="absolute inset-[-30px] border border-dashed border-slate-300 rounded-full"
                    />

                    {/* Зовнішня орбіта (6 тематичних іконок) */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                      }}
                      className="absolute inset-[-70px] border border-slate-200 rounded-full"
                    >
                      {/* 1. Globe (Master-Layout) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Globe className="w-5 h-5" />
                      </div>

                      {/* 2. CreditCard (Split Payments) - Справа зверху (60°) */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <CreditCard className="w-5 h-5" />
                      </div>

                      {/* 3. FileText (Multi-Token) - Справа знизу (120°) */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <FileText className="w-5 h-5" />
                      </div>

                      {/* 4. Gift (Auto-Clearing) - Знизу (180°) */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <Gift className="w-5 h-5" />
                      </div>

                      {/* 5. Lock (Tenant Isolation) - Зліва знизу (240°) */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <Lock className="w-5 h-5" />
                      </div>

                      {/* 6. Sliders (Backend Independence) - Зліва зверху (300°) */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <Sliders className="w-5 h-5" />
                      </div>

                      {/* Ефект "Потоку клієнтів" (Сяюча крапка, що швидко летить по орбіті) */}
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

              {/* ВІЗУАЛ 1: Sub-routing (Мокап браузера) */}
              {activeSceneId === "sub-routing" && (
                <motion.div
                  key="sub-routing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto">
                    {/* Browser Header */}
                    <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="mx-auto bg-white border border-slate-200 rounded-md px-3 py-1 flex items-center text-xs font-mono text-slate-500 w-2/3 relative overflow-hidden">
                        🔒 https://
                        <motion.span
                          animate={{ color: ["#64748b", "#fb923c", "#64748b"] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          lasalina.de
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: [0, 1, 1, 0], x: [0, 0, 0, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 6,
                            times: [0, 0.4, 0.8, 1],
                          }}
                          className="text-salina-orange"
                        >
                          /munich/booking
                        </motion.span>
                      </div>
                    </div>
                    {/* Browser Content */}
                    <div className="p-8 relative h-64 flex flex-col items-center justify-center bg-slate-50">
                      <motion.div
                        animate={{ opacity: [1, 0, 0, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 6,
                          times: [0, 0.3, 0.9, 1],
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center"
                      >
                        <div className="text-lg font-black text-salina-dark mb-4">
                          Standort wählen
                        </div>
                        <div className="bg-white border border-slate-200 shadow-lg rounded-xl w-48 p-2">
                          <div className="p-2 hover:bg-slate-50 rounded text-sm text-slate-600 cursor-pointer">
                            Berlin
                          </div>
                          <div className="p-2 bg-orange-50 text-salina-orange font-bold rounded text-sm cursor-pointer flex justify-between">
                            München <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div className="p-2 hover:bg-slate-50 rounded text-sm text-slate-600 cursor-pointer">
                            Forchheim
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 6,
                          times: [0, 0.4, 0.8, 1],
                        }}
                        className="absolute inset-0 bg-white flex flex-col items-center justify-center"
                      >
                        <div className="text-xl font-black text-salina-orange mb-2">
                          München Kalender
                        </div>
                        <div className="grid grid-cols-4 gap-2 opacity-50">
                          <div className="w-8 h-8 rounded bg-slate-100"></div>
                          <div className="w-8 h-8 rounded bg-slate-100"></div>
                          <div className="w-8 h-8 rounded bg-salina-orange"></div>
                          <div className="w-8 h-8 rounded bg-slate-100"></div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Cell-Based Isolation (Дашборд Спліт) */}
              {activeSceneId === "cell-isolation" && (
                <motion.div
                  key="cell-isolation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="flex gap-4">
                    {/* Left Cell */}
                    <div className="flex-1 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-5 shadow-xl">
                      <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-blue-500" /> München
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-100">
                        <div className="text-[10px] text-slate-500 mb-1">
                          Basispreis
                        </div>
                        <div className="text-lg font-black text-blue-600">
                          15,00 €
                        </div>
                      </div>
                      <div className="bg-green-50 text-green-700 text-xs font-bold p-2 rounded-lg text-center border border-green-200">
                        15. Aug: Geöffnet
                      </div>
                    </div>
                    {/* Right Cell */}
                    <div className="flex-1 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-5 shadow-xl">
                      <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-salina-orange" />{" "}
                        Forchheim
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-100">
                        <div className="text-[10px] text-slate-500 mb-1">
                          Basispreis
                        </div>
                        <div className="text-lg font-black text-orange-600">
                          12,50 €
                        </div>
                      </div>
                      <div className="bg-red-50 text-red-700 text-xs font-bold p-2 rounded-lg text-center border border-red-200">
                        15. Aug: Geschlossen
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Capacity Override */}
              {activeSceneId === "capacity-override" && (
                <motion.div
                  key="capacity-override"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Incoming Tickets */}
                  <div className="flex gap-2 mb-4 h-10 overflow-hidden relative w-32 justify-center">
                    <motion.div
                      animate={{ y: [0, 40] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-4 h-6 bg-slate-800 rounded-sm absolute top-[-24px]"
                    ></motion.div>
                    <motion.div
                      animate={{ y: [0, 40] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                        delay: 0.3,
                      }}
                      className="w-4 h-6 bg-slate-800 rounded-sm absolute top-[-24px] ml-6"
                    ></motion.div>
                    <motion.div
                      animate={{ y: [0, 40] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                        delay: 0.6,
                      }}
                      className="w-4 h-6 bg-salina-orange rounded-sm absolute top-[-24px] mr-6"
                    ></motion.div>
                  </div>

                  {/* Virtual Employee */}
                  <div className="bg-white/90 backdrop-blur-xl border-2 border-salina-orange/50 shadow-[0_0_30px_rgba(251,146,60,0.2)] rounded-2xl w-full p-4 text-center relative z-10">
                    <div className="text-xs font-bold text-salina-orange uppercase tracking-wider mb-1">
                      Virtuelle Rezeption
                    </div>
                    <div className="text-2xl font-black text-salina-dark">
                      Kapazität: ∞
                    </div>
                  </div>

                  {/* Lines */}
                  <div className="flex w-3/4 justify-between -mt-2 z-0">
                    <div className="w-0.5 h-10 bg-slate-300 ml-8 transform -rotate-12"></div>
                    <div className="w-0.5 h-10 bg-slate-300 mr-8 transform rotate-12"></div>
                  </div>

                  {/* Physical Rooms */}
                  <div className="flex gap-4 w-full px-4 -mt-2">
                    <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-md">
                      <div className="text-xs font-bold text-slate-500 mb-1">
                        Salzraum
                      </div>
                      <div className="text-lg font-black text-slate-800">
                        10 / 10
                      </div>
                    </div>
                    <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-md">
                      <div className="text-xs font-bold text-slate-500 mb-1">
                        Kreativraum
                      </div>
                      <div className="text-lg font-black text-slate-800">
                        5 / 10
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Edge CDN */}
              {activeSceneId === "edge-cdn" && (
                <motion.div
                  key="edge-cdn"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-80 relative flex items-center justify-center bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden"
                >
                  <MapPin className="absolute text-slate-800 w-full h-full opacity-10" />

                  {/* Frankfurt (Global DB) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <Database className="w-8 h-8 text-salina-pink z-10 relative bg-slate-900" />
                    <span className="text-[9px] text-slate-400 mt-1">
                      DB (Global)
                    </span>
                  </div>

                  {/* Munich (Edge) */}
                  <div className="absolute bottom-12 right-12 flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        backgroundColor: ["#1e293b", "#3b82f6", "#1e293b"],
                      }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-4 h-4 rounded-full border-2 border-slate-700 z-10 relative"
                    />
                    <span className="text-[9px] text-blue-400 mt-1 font-bold">
                      München
                    </span>
                    {/* Ping Animation */}
                    <motion.svg
                      className="absolute inset-0 pointer-events-none w-full h-full"
                      style={{
                        top: "-100px",
                        left: "-100px",
                        width: "200px",
                        height: "200px",
                      }}
                    >
                      <motion.circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.5"
                        strokeDasharray="5,5"
                        animate={{ r: [0, 80], opacity: [1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          delay: 0.5,
                        }}
                      />
                    </motion.svg>
                  </div>

                  {/* Berlin (Edge - Static) */}
                  <div className="absolute top-12 right-20 flex flex-col items-center opacity-50">
                    <div className="w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-700 z-10" />
                    <span className="text-[9px] text-slate-500 mt-1">
                      Berlin
                    </span>
                  </div>

                  {/* Signal Line */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 0 }}
                  >
                    <motion.line
                      x1="75%"
                      y1="80%"
                      x2="50%"
                      y2="50%"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="10,10"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      opacity="0.6"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- ЧАСТИНА 2: ENTERPRISE BENTO GRID (ТЕМНА ТЕМА) --- */}
      {/* Прибрано ScrollSection обгортку, яка ламала верстку! */}
      <div className="w-full snap-start py-24 px-6 lg:px-16 relative z-20 bg-slate-950 border-t border-slate-800 rounded-[40px]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-salina-orange/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider mb-6 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-salina-orange" /> Multi-Location
            Back-Office
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Architektur unter der Haube
          </h2>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Sichere Datenisolation, automatisiertes Routing und DSGVO-konforme
            Fiskalisierung für ein sorgenfreies Filial-Wachstum.
          </p>
        </div>

        {/* Сітка Bento Grid 3x3 */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Блок 1: Stripe Connect (Широкий) */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Stripe Connect: Standort-Routing"
            description="Die Plattform routet Zahlungen automatisch an die richtigen Unterkonten. Das HQ behält den Überblick, während lokale Budgets sauber getrennt bleiben."
            insight="Geld landet sofort dort, wo es hingehört. Keine manuelle Buchhaltung zwischen den Standorten. Absolute finanzielle Transparenz."
            icon={CreditCard}
          >
            <div className="flex flex-col items-center justify-center w-full h-full pt-4">
              <motion.div
                animate={{ y: [0, 40], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-12 h-12 bg-yellow-400 rounded-full border-4 border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.5)] flex items-center justify-center font-black text-yellow-900 text-sm z-20"
              >
                50€
              </motion.div>
              <div className="w-full flex justify-center gap-8 -mt-2">
                <motion.div
                  animate={{ opacity: [0, 0, 1, 1, 0], x: [20, 0, 0, 0, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-blue-500/20 border border-blue-500/40 rounded-xl p-3 text-center w-28"
                >
                  <div className="text-[10px] text-blue-400 font-bold mb-1 uppercase">
                    Konto München
                  </div>
                  <div className="text-lg font-black text-blue-400">50€</div>
                </motion.div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 2: API Multiplexer (Високий) */}
          <DarkBentoCard
            className="lg:row-span-2"
            title="Multi-Token Fiskalisierung"
            description="Die Architektur erkennt den Standort dynamisch, entschlüsselt den spezifischen Account-Token und sendet die Transaktion an die isolierte ready2order-Kasse der jeweiligen Filiale."
            insight="Saubere fiskalische Trennung. Das Finanzamt erhält exakt zugeordnete Belege pro Standort, was die zentrale Buchhaltung massiv entlastet."
            icon={Receipt}
          >
            <div className="w-full h-full flex flex-col justify-between py-2 relative">
              <div className="bg-slate-800 border border-slate-700 p-2 rounded-lg text-xs text-slate-300 font-mono text-center relative z-10">
                POST /api/checkout <br />
                <span className="text-blue-400">loc: Berlin</span>
              </div>
              <div className="flex justify-center py-4 relative z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-8 h-8 rounded-md bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                >
                  🔑
                </motion.div>
              </div>
              <div className="relative bg-slate-800 border border-slate-700 h-20 rounded-t-xl overflow-hidden flex justify-center items-end border-b-0 z-10">
                <div className="absolute top-2 text-[10px] text-slate-500 font-bold">
                  ready2order API
                </div>
                <motion.div
                  animate={{ y: [-50, 0, 0, -50] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-3/4 bg-white rounded-t-sm border-x border-t border-slate-300 p-2 flex flex-col items-center"
                >
                  <div className="w-full h-1 bg-slate-200 mb-1 rounded"></div>
                  <div className="w-2/3 h-1 bg-slate-200 mb-2 rounded"></div>
                  <div className="w-8 h-8 bg-slate-900 rounded-sm"></div>
                </motion.div>
              </div>
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 0 }}
              >
                <line
                  x1="50%"
                  y1="20%"
                  x2="50%"
                  y2="80%"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
              </svg>
            </div>
          </DarkBentoCard>

          {/* Блок 3: Tenant Isolation */}
          <DarkBentoCard
            className="lg:col-span-1"
            title="Absolute Datenisolation"
            description="Backend-Filter überschreiben Datenbankabfragen automatisch (Privacy by Design), sodass eine Filiale physisch nicht auf Kunden anderer Standorte zugreifen kann."
            insight="Mitarbeiter einer Filiale können die globale Kundendatenbank von La Salina technisch nicht einsehen. 100% DSGVO-konform."
            icon={Database}
          >
            <div className="w-full space-y-3">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs flex items-center gap-2 text-slate-400">
                <Search className="w-3 h-3" /> Alle Kunden anzeigen...
              </div>
              <div className="relative p-3 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-red-500/10"
                />
                <div className="text-[10px] font-mono text-red-400 mb-2 relative z-10 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Filter injected:
                </div>
                <div className="text-xs font-mono text-green-400 relative z-10">
                  WHERE loc_id = &apos;MUC&apos;
                </div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 4: Clearing Report (Широкий) */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Clearing universaler Gutscheine"
            description="Gutschein im HQ gekauft, in der Filiale eingelöst? Ein monatlicher CRON-Job gleicht Logs ab und erstellt automatisch den DATEV-Verrechnungsbericht."
            insight="Keine Excel-Tapeten. Das System garantiert 100%ige finanzielle Transparenz zwischen Hauptquartier und lokalen Filial-Budgets."
            icon={RefreshCcw}
          >
            <div className="flex w-full gap-4 items-center">
              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
                <div className="text-[10px] text-slate-400 mb-2 uppercase">
                  Filial-Scan
                </div>
                <div className="bg-white/10 px-2 py-1 rounded text-white font-mono text-xs border border-white/20 mb-2">
                  CODE: X79L
                </div>
                <div className="text-salina-orange font-bold text-sm">
                  Einlösung: 100€
                </div>
              </div>
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight className="text-slate-600" />
              </motion.div>
              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 relative overflow-hidden">
                <div className="text-[10px] text-slate-400 mb-2 uppercase flex justify-between">
                  HQ Accounting{" "}
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                </div>
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-green-500/10 border border-green-500/30 p-2 rounded text-xs text-green-400 font-mono"
                >
                  + Schuld (Filiale): 100€
                </motion.div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 5: Silent Launch */}
          <DarkBentoCard
            className="lg:col-span-1"
            title="Silent Launch"
            description="Neue Städte im Verborgenen testen. Kassensysteme und Tablets können live konfiguriert werden, bevor die Stadt im Frontend sichtbar wird."
            insight="Sichere Mitarbeiterschulung unter Live-Bedingungen, ohne echte Kunden zu verwirren."
            icon={EyeOff}
          >
            <div className="w-full flex items-center justify-between bg-slate-800 border border-slate-700 p-3 rounded-xl mb-4">
              <span className="text-sm font-bold text-slate-300">Bremen</span>
              <motion.div
                animate={{ backgroundColor: ["#334155", "#22c55e", "#334155"] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-10 h-5 rounded-full relative px-0.5 flex items-center"
              >
                <motion.div
                  animate={{ x: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </motion.div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-center">
              <span className="text-xs text-slate-500">Frontend Dropdown:</span>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="mt-1 text-sm font-bold text-salina-orange"
              >
                Neu: Bremen
              </motion.div>
            </div>
          </DarkBentoCard>

          {/* Блок 6: Local SEO */}
          <DarkBentoCard
            className="lg:col-span-1"
            title="Automatisiertes Local SEO"
            description="Beim Anlegen einer Filiale generiert das Backend (Next.js SSR) automatisch unsichtbares LocalBusiness JSON-LD Markup mit exakten Koordinaten und Öffnungszeiten."
            insight="Google-Algorithmen ziehen die nächstgelegene Filiale sofort in das prestigeträchtige Local Pack (Near-Me-Phänomen) – ganz ohne Werbekosten."
            icon={Map}
          >
            <div className="w-full h-full bg-slate-800 rounded-xl overflow-hidden relative flex flex-col">
              {/* Google Search Mock */}
              <div className="bg-slate-900 p-2 border-b border-slate-700 flex items-center gap-2">
                <div className="w-4 h-4 text-blue-500 bg-white rounded-full flex items-center justify-center text-[8px] font-bold">
                  G
                </div>
                <div className="bg-slate-800 h-4 flex-1 rounded-full border border-slate-700"></div>
              </div>
              {/* Local Pack Mock */}
              <div className="p-3 relative flex-1">
                <div className="text-xs font-bold text-blue-400 mb-1">
                  La Salina München
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-400 text-[10px]">★★★★★</span>
                </div>
                {/* Map Mock */}
                <div className="absolute bottom-2 right-2 w-16 h-12 bg-green-900/30 border border-green-500/30 rounded-lg overflow-hidden flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <MapPin className="w-4 h-4 text-red-500 fill-red-500/20" />
                  </motion.div>
                </div>
              </div>
            </div>
          </DarkBentoCard>
        </div>
      </div>
    </div>
  );
}
