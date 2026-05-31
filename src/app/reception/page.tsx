"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  ScanLine,
  Users,
  CreditCard,
  Printer,
  Gift,
  Heart,
  LayoutDashboard,
  StickyNote,
  UserX,
  Moon,
  WifiOff,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Tablet,
  ShieldCheck,
  Ticket,
  Clock,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "qr-checkin",
    product: "Tablet‑Kamera & QR‑Scanner",
    title: "Eine Begrüßung ohne Barrieren",
    description:
      "Wir verzichten für immer auf veraltete Computer, die eine Barriere zwischen Gast und Personal schaffen. Wenn der Kunde mit einem Online‑Ticket hereinkommt, muss der Administrator nicht nach seinem Nachnamen fragen. Der Mitarbeiter richtet einfach das Arbeits‑Tablet auf den Bildschirm des Gastes. In Sekundenbruchteilen erkennt das System das Ticket und leuchtet grün auf – der Gast wird willkommen geheißen.",
    insight:
      "Sie beseitigen zu 100 % Staus am Eingang zu Stoßzeiten. Der eingebaute Schutz vor doppeltem Scannen (Double Check‑in) stellt sicher, dass niemand mit dem Screenshot eines fremden Tickets kostenlos eintreten kann, und schützt so Ihre Einnahmen.",
  },
  {
    id: "walkin-guard",
    product: "Sicherheits‑Validator auf dem Tablet",
    title: "Schutz vor dem Faktor Mensch",
    description:
      "Wenn Gäste ohne Termin kommen („von der Straße“), wird der Administrator sie direkt auf dem Tablet bedienen. Das System arbeitet jedoch wie ein unsichtbarer Sicherheitsinspektor. Es verhindert physisch den Verkauf von Tickets nur für Kinder – die Zahlungsschaltfläche bleibt gesperrt, bis ein aufsichtspflichtiger Erwachsener in den Warenkorb gelegt wurde.",
    insight:
      "Absolute Rechtssicherheit. Selbst ein müder oder unaufmerksamer Aushilfsstudent an der Rezeption kann die strengen Regeln der Einrichtung nicht verletzen. Sie sind vor Bußgeldern und der Haftung für unbeaufsichtigte Kinder geschützt.",
  },
  {
    id: "fat-finger",
    product: "Smart‑Terminal Stripe WisePOS E",
    title: "Keine manuelle Eingabe von Beträgen",
    description:
      "In klassischen Systemen sieht der Kassierer den Betrag auf dem Bildschirm und tippt ihn dann manuell am Bankterminal ein – mit dem Risiko, 5 € statt 50 € einzugeben. Unser System funktioniert anders: Der Administrator drückt einfach auf „Bezahlen“, und der exakte Betrag wird drahtlos und fehlerfrei auf das schöne Smart‑Terminal übertragen, das dem Kunden zugewandt ist.",
    insight:
      "Null Toleranz für Fehler. Sie werden nie wieder Geld durch einen Tippfehler (Fat Finger Error) des Administrators an der Kasse verlieren. Der Vorgang sieht premium aus und steigert das Ansehen der Einrichtung in den Augen der Kunden.",
  },
  {
    id: "cloud-print",
    product: "Bondrucker Epson & Cloud‑Kasse",
    title: "Legalität, die unsichtbar arbeitet",
    description:
      "Sofort nachdem der Gast seine Karte an das Terminal hält, registriert das System den Verkauf automatisch in der deutschen Steuerdatenbank. Der Kunde muss nicht einmal warten – aus dem eleganten Drucker auf dem Tresen fährt sofort und geräuschlos ein fertiger Fiskalbeleg mit schützendem QR‑Code heraus.",
    insight:
      "100 % Bereitschaft für jede unangekündigte Steuerprüfung (Kassen‑Nachschau) ohne jeden Aufwand für das Personal. Alle Vorgänge sind ideal legal, und Bußgelder sind architektonisch unmöglich.",
  },
  {
    id: "kulanz",
    product: "Gutschein‑Generator (Kulanz)",
    title: "Beschwerden in Loyalität verwandeln",
    description:
      "Wenn ein Kunde eine Stunde vor dem Besuch erkrankt, wird das Geld laut Regeln nicht zurückerstattet. Doch anstelle einer harten Ablehnung oder eines komplizierten Bank‑Rückerstattungsprozesses generiert der Administrator mit einem Klick auf dem Tablet einen 100 %‑Kulanzgutschein und sendet ihn dem Gast direkt in den Chat.",
    insight:
      "Das echte Geld (Cash Flow) bleibt für immer auf den Konten Ihres Unternehmens, Sie zahlen keine Rückerstattungsgebühren. Und der Kunde, beeindruckt von der Menschlichkeit der Marke, kommt garantiert in der nächsten Woche wieder.",
  },
  {
    id: "family-sharing",
    product: "Digitaler 10er‑Karten‑Saldo",
    title: "Service, der die Seinen wiedererkennt",
    description:
      "Wenn die Mutter ein digitales 10er‑Paket gekauft hat und die Oma das Kind zur Session bringt (die weder Smartphone noch Tickets hat), gibt es keinerlei Probleme. Der Administrator gibt einfach den Namen des Kindes auf dem Tablet ein. Das System hebt den aktiven Familiensaldo hervor und bietet an, einen Besuch mit einem Klick abzubuchen.",
    insight:
      "Maximale Bequemlichkeit für Mehrgenerationen‑Familien. Keine vergessenen Papierkarten oder Konflikte an der Rezeption. Das hohe Serviceniveau regt Familien dazu an, immer wieder große Pakete zu kaufen.",
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
export default function ReceptionOperationsPage() {
  const [activeSceneId, setActiveSceneId] = useState<string>("header");
  const containerRef = useRef<HTMLDivElement>(null);

  const allSteps = ["header", ...SCENES.map((s) => s.id)];

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] w-full bg-transparent overflow-y-auto snap-y snap-mandatory scroll-smooth relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* СТАТУС-БАР */}
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
        {/* ЛІВА КОЛОНКА (Текст) */}
        <div className="w-full lg:w-1/2 relative z-10 pl-12 lg:pl-16">
          {/* Шапка */}
          <ScrollSection
            id="header"
            setActiveScene={setActiveSceneId}
            containerRef={containerRef}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-salina-dark">
              Reception &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Operations
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie aus Alltagsroutine ein Fünf‑Sterne‑Service wird – und warum
              Ihre Mitarbeiter die neuen Tablets lieben werden.
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
                        Reception &
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Operations
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
                      {/* 1. ScanLine (QR Check-In) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <ScanLine className="w-5 h-5" />
                      </div>
                      {/* 2. Users (Walk-In) - 60° */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Users className="w-5 h-5" />
                      </div>
                      {/* 3. CreditCard (Smart Terminal) - 120° */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      {/* 4. Printer (Cloud Print) - 180° */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <Printer className="w-5 h-5" />
                      </div>
                      {/* 5. Gift (Kulanz) - 240° */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <Gift className="w-5 h-5" />
                      </div>
                      {/* 6. Heart (Family Sharing) - 300° */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <Heart className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: QR Check-In */}
              {activeSceneId === "qr-checkin" && (
                <motion.div
                  key="qr-checkin"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="w-40 h-40 mx-auto mb-4 bg-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <ScanLine className="w-16 h-16 text-slate-400" />
                      <motion.div
                        animate={{ y: [-60, 60] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "linear",
                        }}
                        className="absolute left-0 right-0 h-1 bg-salina-orange shadow-[0_0_8px_rgba(251,146,60,0.8)]"
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-center"
                    >
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 inline-block">
                        <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-1" />
                        <p className="text-sm font-bold text-green-700">
                          Familie Müller
                        </p>
                      </div>
                    </motion.div>
                    <div className="mt-3 flex justify-center gap-4">
                      <button
                        onClick={() =>
                          alert("❌ Ticket bereits um 10:15 gescannt!")
                        }
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-200"
                      >
                        Duplikat simulieren
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Walk-In Guard */}
              {activeSceneId === "walkin-guard" && (
                <motion.div
                  key="walkin-guard"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <h3 className="font-black text-salina-dark mb-4">
                      Warenkorb
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span>👦 Kinder</span>
                        <span className="font-black text-xl">2</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-200"
                      >
                        <span>👨 Erwachsene</span>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.2, type: "spring" }}
                          className="font-black text-xl text-salina-orange"
                        >
                          1
                        </motion.span>
                      </motion.div>
                    </div>
                    <motion.button
                      initial={{ backgroundColor: "#e2e8f0", color: "#94a3b8" }}
                      animate={{ backgroundColor: "#fb923c", color: "#fff" }}
                      transition={{ delay: 1.5 }}
                      className="w-full py-4 rounded-2xl font-bold mt-4"
                    >
                      Bezahlen
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Smart Terminal */}
              {activeSceneId === "fat-finger" && (
                <motion.div
                  key="fat-finger"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2rem] p-6 shadow-lg text-center">
                      <p className="text-xs text-slate-500 mb-2">
                        Tablet Admin
                      </p>
                      <p className="text-3xl font-black text-salina-dark mb-4">
                        55,00 €
                      </p>
                      <button className="px-6 py-3 bg-green-500 text-white rounded-2xl font-bold text-sm">
                        Bezahlen
                      </button>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-slate-900 rounded-[2rem] p-6 shadow-lg text-center"
                    >
                      <p className="text-xs text-slate-400 mb-2">WisePOS E</p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-3xl font-black text-white"
                      >
                        55,00 €
                      </motion.p>
                      <div className="mt-4 flex justify-center">
                        <CreditCard className="w-8 h-8 text-blue-400" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Cloud Print */}
              {activeSceneId === "cloud-print" && (
                <motion.div
                  key="cloud-print"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <Printer className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm inline-block"
                    >
                      <p className="text-xs text-slate-500 mb-1">Fiskalbeleg</p>
                      <div className="w-24 h-24 bg-slate-100 rounded-lg mx-auto flex items-center justify-center">
                        <span className="text-2xl">🧾</span>
                      </div>
                      <p className="text-[10px] text-green-600 mt-2 font-bold">
                        TSE konform
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: Kulanz */}
              {activeSceneId === "kulanz" && (
                <motion.div
                  key="kulanz"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <Gift className="w-16 h-16 text-salina-orange mx-auto mb-4" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 inline-block"
                    >
                      <p className="text-sm font-bold text-yellow-700">
                        100 % Kulanz
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Gutschein gesendet
                      </p>
                    </motion.div>
                    <div className="mt-4 flex justify-center">
                      <div className="bg-green-50 rounded-2xl p-3 border border-green-200">
                        <MessageCircle className="w-6 h-6 text-green-500 mx-auto" />
                        <p className="text-[10px] text-green-600 mt-1">
                          WhatsApp Chat
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 6: Family Sharing */}
              {activeSceneId === "family-sharing" && (
                <motion.div
                  key="family-sharing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Users className="w-6 h-6 text-salina-orange" />
                      <span className="text-sm font-bold text-slate-500">
                        Familie Müller
                      </span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 inline-block mb-4">
                      <p className="text-xs font-bold text-blue-600">
                        10er‑Karte aktiv
                      </p>
                      <p className="text-2xl font-black text-salina-dark mt-1">
                        <motion.span
                          key="count"
                          initial={{ scale: 1.2, color: "#fb923c" }}
                          animate={{ scale: 1, color: "#0f172a" }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        >
                          5
                        </motion.span>
                        <span className="text-slate-400 text-lg"> / 10</span>
                      </p>
                    </div>
                    <button className="px-6 py-3 bg-salina-dark text-white rounded-2xl font-bold text-sm">
                      1 Besuch abbuchen
                    </button>
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
            Das Rezeptions‑Cockpit
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese Werkzeuge machen den Arbeitsalltag Ihrer Mitarbeiter
            effizienter, sicherer und angenehmer – und schützen gleichzeitig
            Ihren Umsatz.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: Tagesdashboard (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Auslastungsampel (Tagesdashboard)"
            description="Das Rezeptions‑Dashboard ist visuell und extrem einfach. Statt komplizierter Tabellen sieht der Administrator ein Tagesraster, in dem jeder Zeitslot farbig hinterlegt ist: grün (frei), gelb (wenige Plätze), rot (ausverkauft)."
            insight="Das Personal orientiert sich sofort. Auch ein neuer Mitarbeiter ohne Erfahrung kann bereits nach 15 Minuten Einarbeitung Kunden vollwertig bedienen – das senkt Ihre Schulungskosten enorm."
            icon={LayoutDashboard}
          >
            <div className="flex items-center justify-center gap-3 w-full">
              {[
                {
                  time: "12:00",
                  color: "bg-green-50 border-green-200 text-green-700",
                  label: "Frei",
                },
                {
                  time: "13:00",
                  color: "bg-yellow-50 border-yellow-300 text-yellow-700",
                  label: "2 Plätze",
                  pulse: true,
                },
                {
                  time: "14:00",
                  color: "bg-red-50 border-red-200 text-red-400",
                  label: "Ausgebucht",
                },
              ].map((slot) => (
                <motion.div
                  key={slot.time}
                  animate={slot.pulse ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={cn(
                    "px-4 py-3 rounded-2xl border text-center font-bold text-sm",
                    slot.color,
                  )}
                >
                  {slot.time}
                  <span className="block text-[10px] mt-1">{slot.label}</span>
                </motion.div>
              ))}
            </div>
          </BentoCard>

          {/* Блок 2: Quick Notes (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Schnelle Gästenotizen (One‑Click Notes)"
            description="Die Plattform erlaubt dem Administrator, mit einem Klick wichtige Notizen im Gästeprofil zu hinterlassen – z. B. „Kind hat Angst vor lauten Geräuschen“ oder „Lieblingskaffee: Cappuccino mit Hafermilch“."
            insight="Sie schaffen ein institutionelles Gedächtnis für Premium‑Service. Selbst wenn der Administrator wechselt, empfängt der neue Mitarbeiter den Gast so, als würde er ihn seit Jahren kennen – das steigert die Loyalität enorm."
            icon={StickyNote}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <Users className="w-4 h-4" /> Gast: Max Mustermann
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-700 flex items-start gap-2"
              >
                <StickyNote className="w-4 h-4 shrink-0 mt-0.5" />
                Allergie: Laktose
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 3: No-Show */}
          <BentoCard
            title="Kontrolle von No‑Shows"
            description="Wenn ein Kunde nicht zur Session erscheint und nicht Bescheid gibt, drückt der Administrator einfach eine Taste. Das System weist diesem Gast automatisch ein verstecktes „No‑Show“‑Tag in der Datenbank zu."
            insight="Sie schützen Ihr Geschäft vor notorischen Störern. Die Anhäufung solcher Tags ermöglicht es dem System, Betrügern automatisch die Online‑Buchung zu sperren und so Plätze für verantwortungsbewusste Gäste freizugeben."
            icon={UserX}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-1">
                  <Users className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-xs text-slate-500">Max M.</p>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <UserX className="w-6 h-6 text-red-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-red-50 border border-red-200 rounded-xl px-3 py-1 text-xs font-bold text-red-600"
              >
                No‑Show
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 4: Dark Mode */}
          <BentoCard
            title="Ergonomie für die Augen (Dark Mode)"
            description="Da die Lounge‑Bereiche oft über eine gedämpfte, entspannende Beleuchtung verfügen, besitzt das Arbeits‑Tablet einen eingebauten Dark Mode sowie intelligente Tooltips."
            insight="Sorge um die Gesundheit und den Komfort Ihres Personals. Die Verringerung der Augenbelastung des Administrators garantiert weniger Fehler während der Abendschichten und bewahrt die Premium‑Ästhetik des halbdunklen Raums."
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
          </BentoCard>

          {/* Блок 5: Offline Fallback (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Notfallmodus (Offline Fallback & Notfallbeleg)"
            description="Wenn in der Stadt das Internet ausfällt oder die Server des Finanzamts abstürzen, stoppt der Betrieb der Location nicht. Das Tablet schaltet automatisch in den Offline‑Modus und erlaubt die legale Ausstellung eines „Notfallbelegs“ auf Papier."
            insight="Absolute Geschäftskontinuität (Business Continuity). Sie verlieren keinen einzigen Euro durch technische höhere Gewalt. Nach Wiederherstellung des Internets werden alle Daten automatisch synchronisiert und garantieren eine perfekte Steuerberichterstattung."
            icon={WifiOff}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="text-center">
                <WifiOff className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Offline</p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center"
              >
                <p className="text-xs font-bold text-amber-700">Notfallbeleg</p>
                <p className="text-[10px] text-amber-600 mt-1">
                  UUID gespeichert
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-1" />
                <p className="text-[10px] text-green-600">Synchronisiert</p>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 6: Z-Report (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Magie des Schichtendes (1‑Klick Z‑Report)"
            description="Der größte Stress für den Kassierer ist der abendliche Kassenabschluss. In unserem System drückt der Manager am Ende der Schicht einfach eine Taste „Schicht schließen“. Die Kasse gleicht selbstständig Bargeld, Kartenzahlungen und Gutscheine ab."
            insight="Sie sparen Tausende Euro an Steuerberaterkosten. Das System erstellt einen perfekten Fiskalbericht, bereit für den sofortigen Export in das professionelle Buchhaltungssystem DATEV."
            icon={FileText}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
              <button className="px-6 py-3 bg-salina-dark text-white rounded-2xl font-bold text-sm mb-3">
                Kassen‑Tagesabschluss
              </button>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-2 text-green-600 font-bold text-xs"
              >
                <FileText className="w-4 h-4" /> DATEV‑Export bereit
              </motion.div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
