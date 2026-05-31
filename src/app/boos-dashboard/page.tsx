"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  LayoutDashboard,
  Calendar,
  Sidebar,
  RefreshCw,
  Sliders,
  PieChart,
  ShieldCheck,
  UserPlus,
  ListChecks,
  Globe,
  Lock,
  Moon,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Star,
  Gift,
  Eye,
  Crown,
  StickyNote,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "global-dashboard",
    product: "Zentrale Analyse-Übersicht (KPI Dashboard)",
    title: "Ihr Unternehmen in Echtzeit",
    description:
      "Sobald Sie sich einloggen, sehen Sie keine langweiligen Tabellen mehr. Ein luxuriöses, visuelles Dashboard zeigt Ihnen sofort das Wichtigste: Gesamtumsatz, Auslastungsprozentsatz der Standorte und die tägliche Belegung. Sie sehen den Puls Ihres Unternehmens aus der Vogelperspektive und erkennen klar, welche Filiale am besten arbeitet.",
    insight:
      "Absolute finanzielle Transparenz und Zeitersparnis. Sie müssen keine Berichte Ihrer Administratoren mehr abwarten – Sie treffen jederzeit präzise Managemententscheidungen auf Basis von Echtzeitdaten.",
  },
  {
    id: "drag-and-drop",
    product: "Master-Zeitplan (Drag-and-Drop)",
    title: "Ein Zeitplan, der einer einzigen Bewegung gehorcht",
    description:
      "Die Verwaltung von Buchungen wird unglaublich einfach. Wenn ein Kunde um eine Terminverschiebung bittet, müssen Sie keine komplizierten Menüs öffnen oder Daten neu eingeben. Sie greifen einfach die Buchungskarte mit der Maus und ziehen sie sanft auf einen anderen Tag oder eine andere Uhrzeit. Das System speichert die Änderung automatisch und sendet dem Gast unbemerkt ein neues Ticket.",
    insight:
      "Radikale Beschleunigung der Back-Office-Arbeit. Prozesse, die früher mehrere Minuten dauerten und höchste Aufmerksamkeit erforderten, werden jetzt in einer Sekunde mit einer einzigen Bewegung ausgeführt – das Fehlerrisiko ist eliminiert.",
  },
  {
    id: "quick-sidebar",
    product: "Ausziehbare Info-Seite (Quick Sidebar)",
    title: "Die gesamte Gästehistorie in einer Sekunde",
    description:
      "Um die Details eines Besuchs zu erfahren, müssen Sie nicht auf andere Seiten wechseln und den Kontext des Zeitplans verlieren. Ein kurzer Klick auf einen Eintrag – und seitlich fährt elegant eine halbtransparente Leiste heraus. Sie zeigt alles: von der Zahlungshistorie und dem VIP-Abonnement-Status bis hin zu persönlichen Notizen über die Allergien des Kindes.",
    insight:
      "Schaffung eines Premium-Service-Erlebnisses. Sie und Ihr Team sind stets bereit, einen Gast so zu empfangen, als würden Sie ihn seit Jahren kennen – das steigert die Loyalität und die Bereitschaft zur Wiederkehr enorm.",
  },
  {
    id: "two-way-sync",
    product: "Zwei-Wege-Kalendersynchronisation",
    title: "Ein Arbeitsplan, der sich Ihnen anpasst",
    description:
      "Die La Salina-Plattform verbindet sich nahtlos mit Ihrem persönlichen Google- oder Apple-Kalender. Wenn Sie in Ihrem Smartphone für morgen 11:00 Uhr einen Termin mit dem Steuerberater eintragen, erkennt das System dies automatisch und blockiert diese Zeit sofort auf der Website für Kunden.",
    insight:
      "Absoluter Schutz vor Doppelbuchungen und Wahrung Ihrer persönlichen Zeit. Ihr Zeitplan ist stets aktuell, ganz ohne manuelle Anpassungen.",
  },
  {
    id: "no-code-pricing",
    product: "Dynamische Tarife (No-Code)",
    title: "Preisverwaltung mit einem Fingertipp",
    description:
      "Sie können Geschäftsregeln ohne jeden IT-Spezialisten ändern. Möchten Sie spezielle Wochenendtarife festlegen oder 15 Minuten Pufferzeit für die Reinigung nach jeder Session hinzufügen? Sie verschieben einfach einen Regler in den Einstellungen, und der Zeitplan passt sich automatisch den neuen Regeln an.",
    insight:
      "Völlige Unabhängigkeit und Flexibilität. Sie reagieren sofort auf die Nachfrage, erhöhen die Preise an „heißen“ Tagen zur Gewinnmaximierung, und Ihre IT-Betriebskosten bleiben bei null.",
  },
  {
    id: "event-dashboard",
    product: "Spezialisiertes Event-Dashboard",
    title: "Präzise Berechnung der lukrativsten Leistungen",
    description:
      "Kindergeburtstage und Workshops sind eine völlig andere Art von Dienstleistung mit anderer Marge. Unser System trennt sie automatisch von den regulären Salzkammerbesuchen. Sie erhalten eine eigene, luxuriöse Analyseübersicht, die ausschließlich privaten Veranstaltungen gewidmet ist.",
    insight:
      "Kristallklare Rentabilitätsanalyse (ROI). Sie wissen genau, wie viel Reingewinn die Feste bringen, und können so Ihr Marketingbudget effizienter verteilen und die lukrativste Sparte skalieren.",
  },
];

// ============================================================================
// КОМПОНЕНТ SCROLLSECTION (стандартний)
// ============================================================================
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
    if (isInView) {
      setActiveScene(id);
    }
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

// ============================================================================
// КОМПОНЕНТ BENTOCARD (біла картка)
// ============================================================================
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
  const [showInsight, setShowInsight] = useState(false);

  return (
    <div
      className={cn(
        "bg-white border border-slate-200 hover:border-salina-orange/30 hover:shadow-[0_20px_60px_rgba(251,146,60,0.1)] rounded-[2rem] p-6 lg:p-8 flex flex-col relative group transition-all duration-500 overflow-visible",
        className,
      )}
    >
      {/* Кнопка Інсайту */}
      <div className="absolute top-6 right-6 z-50 flex flex-col items-end group/tooltip">
        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover/tooltip:bg-white group-hover/tooltip:text-salina-orange group-hover/tooltip:border-salina-orange/30 group-hover/tooltip:shadow-md transition-all cursor-help">
          <Info className="w-4 h-4" />
        </div>
        <div className="absolute top-10 right-0 w-64 p-4 bg-slate-900 text-white text-xs font-medium leading-relaxed rounded-2xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none origin-top-right z-50">
          <span className="block text-salina-orange font-bold uppercase tracking-wider mb-1">
            Business Insight
          </span>
          {insight}
        </div>
      </div>

      {/* Заголовок */}
      <div className="flex items-center gap-3 mb-3 pr-10">
        <div className="w-10 h-10 bg-salina-orange/10 rounded-xl flex items-center justify-center text-salina-orange shrink-0 shadow-sm border border-salina-orange/20">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg md:text-xl font-black text-salina-dark leading-tight">
          {title}
        </h3>
      </div>

      <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6 z-10 max-w-[90%]">
        {description}
      </p>

      {/* Зона для візуалізації */}
      <div className="mt-auto relative z-10 bg-slate-50 rounded-2xl border border-slate-100 p-4 min-h-[160px] flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// ОСНОВНИЙ КОМПОНЕНТ
// ============================================================================
export default function MasterCommandCenterPage() {
  const [activeSceneId, setActiveSceneId] = useState<string>("header");
  const containerRef = useRef<HTMLDivElement>(null);

  const allSteps = ["header", ...SCENES.map((s) => s.id)];

  return (
    <div
      ref={containerRef}
      className="h-dvh w-full bg-transparent overflow-y-auto snap-y snap-mandatory scroll-smooth relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* СТАТУС-БАР */}
      <div className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-center pointer-events-none">
        {allSteps.map((id) => (
          <div
            key={id}
            className={cn(
              "w-2 rounded-full transition-all duration-500 ease-out",
              activeSceneId === id
                ? "h-10 bg-linear-to-b from-salina-orange to-salina-pink shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                : "h-2 bg-slate-300",
            )}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full relative">
        {/* ЛІВА КОЛОНКА (Текст) */}
        <div className="w-full lg:w-1/2 relative z-10 pl-12 lg:pl-16">
          {/* Шапка */}
          <ScrollSection
            id="header"
            setActiveScene={setActiveSceneId}
            containerRef={containerRef}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-salina-dark">
              Master
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Command Center
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie Sie Ihr gesamtes Unternehmen von einem einzigen Bildschirm aus
              steuern – in Echtzeit, sicher und völlig mühelos.
            </p>
            <div className="mt-12 flex items-center gap-4 text-salina-orange font-bold animate-bounce">
              Scrollen Sie nach unten{" "}
              <ArrowRight className="w-5 h-5 rotate-90" />
            </div>
          </ScrollSection>

          {/* Сцени */}
          {SCENES.map((scene) => (
            <ScrollSection
              key={scene.id}
              id={scene.id}
              setActiveScene={setActiveSceneId}
              containerRef={containerRef}
            >
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-salina-orange/5 border border-salina-orange/10 text-salina-orange text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> {scene.product}
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-salina-dark mb-6 leading-tight">
                  {scene.title}
                </h2>
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10">
                  {scene.description}
                </p>

                {/* Інсайт */}
                <div className="bg-orange-50/80 backdrop-blur-md border border-orange-200 rounded-3xl p-6 relative group hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-salina-orange shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-salina-dark uppercase tracking-wider">
                      Stakeholder Insight
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
        <div className="hidden lg:flex lg:w-1/2 sticky top-0 h-[100dvh] items-center justify-center p-12 overflow-hidden">
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
                          System Online
                        </span>
                      </div>
                      <span className="font-black text-salina-dark text-xl tracking-tight leading-none mb-1">
                        Master
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Command Center
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
                      {/* 1. LayoutDashboard (KPI) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <LayoutDashboard className="w-5 h-5" />
                      </div>
                      {/* 2. Calendar (Drag-and-Drop) - 60° */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Calendar className="w-5 h-5" />
                      </div>
                      {/* 3. Sidebar (Quick View) - 120° */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <Sidebar className="w-5 h-5" />
                      </div>
                      {/* 4. RefreshCw (Two-Way Sync) - 180° */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      {/* 5. Sliders (No-Code Pricing) - 240° */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <Sliders className="w-5 h-5" />
                      </div>
                      {/* 6. PieChart (Events) - 300° */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <PieChart className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: Global Dashboard */}
              {activeSceneId === "global-dashboard" && (
                <motion.div
                  key="global-dashboard"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-500">
                      <LayoutDashboard className="w-5 h-5 text-salina-orange" />{" "}
                      KPI Dashboard
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-end gap-2 h-20">
                        {[40, 65, 80, 90, 85].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="flex-1 bg-salina-orange/20 rounded-t-xl relative overflow-hidden"
                          >
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{ height: "100%" }}
                              className="absolute bottom-0 left-0 right-0 bg-salina-orange rounded-t-xl"
                            />
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Mo</span>
                        <span>Di</span>
                        <span>Mi</span>
                        <span>Do</span>
                        <span>Fr</span>
                      </div>
                      <div className="flex gap-3 mt-4">
                        {[85, 92, 100].map((p, i) => (
                          <div
                            key={i}
                            className="flex-1 text-center bg-slate-50 rounded-2xl p-4 border border-slate-100"
                          >
                            <div className="text-2xl font-black text-salina-dark">
                              {p}%
                            </div>
                            <div className="text-[10px] text-slate-500 mt-1">
                              Raum {i + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Drag-and-Drop */}
              {activeSceneId === "drag-and-drop" && (
                <motion.div
                  key="drag-and-drop"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="grid grid-cols-2 gap-3">
                      {["14:00", "15:00", "16:00", "17:00"].map((time, i) => (
                        <motion.div
                          key={time}
                          drag
                          dragConstraints={{
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                          }}
                          className={cn(
                            "p-4 rounded-2xl text-center font-bold text-sm cursor-grab active:cursor-grabbing border",
                            i === 1
                              ? "bg-blue-50 border-blue-200 text-blue-700"
                              : "bg-slate-50 border-slate-100 text-slate-500",
                          )}
                        >
                          {time}
                          {i === 1 && (
                            <span className="block text-[10px] text-blue-500 mt-1">
                              Familie Müller
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-4 text-center text-xs text-green-600 font-bold">
                      <CheckCircle2 className="w-4 h-4 inline mr-1" /> Kunde
                      benachrichtigt
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Quick Sidebar */}
              {activeSceneId === "quick-sidebar" && (
                <motion.div
                  key="quick-sidebar"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex gap-4">
                      <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100 opacity-50">
                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-slate-200 rounded w-1/2" />
                      </div>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="w-40 bg-white rounded-2xl p-4 border border-slate-200 shadow-lg"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Crown className="w-5 h-5 text-salina-orange" />
                          <span className="text-xs font-bold text-salina-dark">
                            VIP Abo
                          </span>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-2 text-xs text-yellow-700 flex items-start gap-2">
                          <StickyNote className="w-4 h-4 shrink-0 mt-0.5" />
                          Kind liebt Malen
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Two-Way Sync */}
              {activeSceneId === "two-way-sync" && (
                <motion.div
                  key="two-way-sync"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                        <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-xs text-slate-500">
                          Google Kalender
                        </p>
                        <p className="text-sm font-bold text-salina-dark mt-1">
                          11:00 · Auditor
                        </p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center"
                      >
                        <LayoutDashboard className="w-8 h-8 text-salina-orange mx-auto mb-2" />
                        <p className="text-xs text-slate-500">La Salina</p>
                        <p className="text-sm font-bold text-red-500 mt-1">
                          11:00 · Blockiert
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: No-Code Pricing */}
              {activeSceneId === "no-code-pricing" && (
                <motion.div
                  key="no-code-pricing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-bold text-slate-500">
                        Wochenend-Tarif
                      </span>
                      <motion.div
                        animate={{ x: [0, 24, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          times: [0, 0.4, 1],
                        }}
                        className="w-12 h-6 rounded-full bg-salina-orange flex items-center px-0.5"
                      >
                        <motion.div className="w-5 h-5 bg-white rounded-full shadow-md" />
                      </motion.div>
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-black text-slate-300 line-through mr-3">
                        12,50 €
                      </span>
                      <motion.span
                        initial={{ scale: 1.2, color: "#fb923c" }}
                        animate={{ scale: 1, color: "#0f172a" }}
                        className="text-3xl font-black text-salina-dark"
                      >
                        15,00 €
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 6: Event Dashboard */}
              {activeSceneId === "event-dashboard" && (
                <motion.div
                  key="event-dashboard"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex gap-2 mb-4">
                      <button className="px-4 py-2 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold">
                        Regulär
                      </button>
                      <button className="px-4 py-2 bg-salina-orange/10 text-salina-orange rounded-xl text-xs font-bold border border-salina-orange/20">
                        Events
                      </button>
                    </div>
                    <div className="flex items-end gap-2 h-20">
                      {[40, 60, 80, 95, 70].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className="flex-1 bg-yellow-400/20 rounded-t-xl relative overflow-hidden"
                        >
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            className="absolute bottom-0 left-0 right-0 bg-yellow-400 rounded-t-xl"
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-green-600 font-bold text-sm flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4" /> +25 % in diesem Monat
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* ЧАСТИНА 2: ENTERPRISE BENTO GRID (Прозорий фон, білі блоки)        */}
      {/* ================================================================== */}
      <div className="w-full snap-start py-24 px-6 lg:px-16 relative z-20">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-salina-dark tracking-tight mb-4">
            Sicherheit & Skalierung
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese unsichtbaren Schutzmechanismen und Komfortfunktionen machen
            Ihre Plattform zu einer uneinnehmbaren Festung – und gleichzeitig zu
            einem Vergnügen für jeden Administrator.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: Security Logs (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Unveränderliches Audit-Log (Security Logs)"
            description="Jede bedeutende Aktion im System (Rabattvergabe, Buchungsstornierung, Rückerstattung) wird für immer festgehalten. Die Geschäftsinhaberin kann jederzeit das Log öffnen und die genaue Uhrzeit sowie den Namen des Mitarbeiters sehen, der die Entscheidung getroffen hat."
            insight="100 % Schutz Ihres Kapitals vor Insider-Manipulationen oder Personalfehlern. Kompromisslose Transparenz schafft eine Kultur der Ehrlichkeit und Verantwortung im Team."
            icon={ShieldCheck}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.3 }}
                    className="flex items-center justify-between text-xs text-slate-600 bg-white rounded-xl p-2 border border-slate-100"
                  >
                    <span>Storno · Admin: Anna · 14:05</span>
                    <Lock className="w-3 h-3 text-amber-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Блок 2: 1-Click Onboarding (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Nahtloser Personalstart (1‑Klick Onboarding)"
            description="Um einen neuen Mitarbeiter hinzuzufügen, geben Sie einfach seinen Namen ein. Das System erstellt automatisch und sofort eine Firmen‑E‑Mail, einen isolierten Arbeitszeitplan und Zugang zur Kasse – alle Anweisungen werden in einer Willkommens‑E‑Mail versendet."
            insight="Enorme Zeitersparnis für Sie und null Kosten für IT‑Administratoren. Selbst bei hoher Personalfluktuation ist ein neuer Mitarbeiter innerhalb weniger Minuten sicher einsatzbereit."
            icon={UserPlus}
          >
            <div className="w-full text-center">
              <button className="px-6 py-3 bg-salina-dark text-white rounded-2xl font-bold text-sm mb-4">
                + Mitarbeiter hinzufügen
              </button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-center gap-4"
              >
                {[
                  {
                    icon: Globe,
                    color: "text-blue-500",
                    bg: "bg-blue-50",
                    label: "Mail",
                  },
                  {
                    icon: Calendar,
                    color: "text-emerald-500",
                    bg: "bg-emerald-50",
                    label: "Plan",
                  },
                  {
                    icon: CreditCard,
                    color: "text-purple-500",
                    bg: "bg-purple-50",
                    label: "Kasse",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.3,
                    }}
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      item.bg,
                    )}
                  >
                    <item.icon className={cn("w-6 h-6", item.color)} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 3: Bulk Actions */}
          <BentoCard
            title="Massenverwaltung (Bulk Actions)"
            description="Wenn Sie 20 Spam‑Buchungen stornieren oder den Status vieler Kunden gleichzeitig ändern müssen, müssen Sie dies nicht einzeln tun. Das System erlaubt Ihnen, die gesamte Liste auszuwählen und eine Massenaktion mit einem Klick anzuwenden."
            insight="Maximale Optimierung der Routine. Ihre administrative Arbeit verwandelt sich von langweiligem Klicken in einen schnellen, effizienten Prozess und gibt Ihnen persönliche Zeit für die Strategie."
            icon={ListChecks}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-slate-600 py-1"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Buchung #{i}234 bestätigt</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Блок 4: Master-Layout (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Globales Netzwerk‑Panorama (Master‑Layout)"
            description="Wenn Sie Franchises verkaufen, müssen Sie nicht 10 verschiedene Websites öffnen. Ihr gesamtes nationales La Salina‑Imperium wird von dieser einen luxuriösen Oberfläche aus gesteuert, wobei jede Filiale autonom arbeitet, aber Ihrer Master‑Kontrolle unterliegt."
            insight="Investitionsattraktivität der Skalierung. Sie erhalten eine Technologie, mit der Sie Hunderte von Standorten verwalten können, ohne Ihr eigenes Team aus Programmierern oder Back‑Office‑Managern erweitern zu müssen."
            icon={Globe}
          >
            <div className="relative w-full h-32 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
              {[
                { x: "40%", y: "50%", name: "München" },
                { x: "70%", y: "15%", name: "Berlin" },
              ].map((city) => (
                <div
                  key={city.name}
                  className="absolute"
                  style={{ left: city.x, top: city.y }}
                >
                  <motion.div
                    animate={{ height: [20, 40, 20] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-4 bg-salina-orange rounded-t-sm mx-auto"
                  />
                  <p className="text-[10px] text-slate-600 mt-1 text-center">
                    {city.name}
                  </p>
                </div>
              ))}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </BentoCard>

          {/* Блок 5: Tenant Data Isolation */}
          <BentoCard
            title="Daten-Isolation (Tenant Privacy)"
            description="Das System garantiert absolute rechtliche Isolation. Der Franchisenehmer in Forchheim kann keinen einzigen Namen, Finanzbericht oder Zeitplan der Berliner Filiale einsehen – die Datenbank blockiert solche Anfragen programmatisch."
            insight="100 % Schutz Ihres Geschäftsgeheimnisses und Ihrer Kundendaten vor Datenlecks. Kein Franchisenehmer kann die Daten der Nachbarn „stehlen“, was die einwandfreie Konformität mit den strengen Anforderungen der europäischen DSGVO garantiert."
            icon={Lock}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto"
            >
              <Lock className="w-8 h-8 text-red-500" />
            </motion.div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Access Denied für andere Standorte
            </p>
          </BentoCard>

          {/* Блок 6: Dark Mode & Tooltips */}
          <BentoCard
            title="Ergonomie & Lernen (Dark Mode & Tooltips)"
            description="Die Verwaltungsoberfläche passt sich Ihnen an. Sie können den komfortablen Dark Mode für die Abendarbeit aktivieren, und intelligente Tooltips auf jeder Seite führen Sie sanft in neue Funktionen ein, ohne dass Sie lange Anleitungen lesen müssen."
            insight="Senkung der kognitiven Belastung und Ermüdung. Die Arbeit mit dem Geschäftssystem wird zum ästhetischen Vergnügen, und die Einarbeitungszeit für neues Personal in administrative Funktionen verkürzt sich um zwei Drittel."
            icon={Moon}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 text-center">
                <span className="text-xs text-slate-500">Light</span>
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Moon className="w-6 h-6 text-salina-orange" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-700 text-center"
              >
                <span className="text-xs text-slate-300">Dark</span>
              </motion.div>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Hover für Tooltip: „Klicken Sie hier, um den Preis zu ändern“
            </p>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
