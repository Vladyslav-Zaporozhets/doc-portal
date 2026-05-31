"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  Package,
  AlertTriangle,
  ClipboardCheck,
  ShoppingCart,
  Building2,
  FileText,
  TrendingUp,
  RefreshCw,
  Phone,
  ShieldCheck,
  CreditCard,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Bell,
  Zap,
  Eye,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "realtime-deduction",
    product: "Dynamische POS‑Kopplung & virtuelles Lager",
    title: "Ein Lager, das sich selbst aktualisiert",
    description:
      "Wenn der Administrator einen Kaffee oder Marken‑Stoppersocken über die Kasse bucht, muss er diese Artikel nicht manuell in Berichten abschreiben. Das System verbindet die Kasse nahtlos mit der zentralen Datenbank. Sekundenbruchteile nach der erfolgreichen Zahlung verschwindet exakt eine Einheit des Artikels automatisch aus dem virtuellen Lager dieser Filiale.",
    insight:
      "100 % Schutz vor nicht gebuchten Verkäufen (Anti‑Fraud‑Sperre). Es entsteht eine starre, unauflösbare mathematische Verbindung zwischen dem physischen Warenbestand im Regal und der Anzahl der gebuchten Belege. Das Personal weiß, dass jede Abweichung sofort eine Fehlmenge aufdeckt.",
  },
  {
    id: "low-stock-alerts",
    product: "Analytisches Monitoring kritischer Bestände",
    title: "Engpässe, die niemals eintreten",
    description:
      "Die Plattform überwacht die Bestände nach dem Just‑in‑Time‑Prinzip. Sobald sich die Menge an Kassenrollen oder Kaffeebohnen einem kritischen Schwellenwert nähert, registriert das System dies nicht nur. Es sendet proaktiv eine Warnung auf das Arbeits‑Tablet der Rezeption und das persönliche Telefon des Managers mit dem Hinweis: „Dieser Rest reicht nur noch für 2 Tage“.",
    insight:
      "Garantie für ein makelloses Kundenerlebnis (Zero Out‑of‑Stock). Das Unternehmen verliert niemals wieder Umsatz und Reputation, weil an einem stark frequentierten Wochenende plötzlich Wasser oder Kaffee fehlt.",
  },
  {
    id: "blind-count",
    product: "Geschützter Zählmodus auf dem Tablet",
    title: "Manipulationssichere Blind-Inventur",
    description:
      "Die monatliche Inventur wird vollständig digitalisiert. Während der Zählung zeigt das Tablet dem Administrator ausschließlich das Foto und die Bezeichnung des Artikels an, aber das System verbirgt grundsätzlich und kategorisch, wie viele Einheiten laut Datenbank vorhanden sein sollten.",
    insight:
      "Radikaler Kapitalschutz (Shrinkage Prevention). Der Administrator wird physisch gezwungen, jeden Artikel von Hand zu zählen, was Manipulationen oder das „Anpassen“ der Zahlen an den Sollbestand mathematisch und psychologisch unmöglich macht. Jede Abweichung wird augenblicklich registriert.",
  },
  {
    id: "smart-reorder",
    product: "Automatische Generierung elektronischer Bestellungen",
    title: "Nachbestellungen mit einem Klick",
    description:
      "Um lokale Waren (Wasser, Milch) aufzufüllen, muss der Manager keine Lieferanten anrufen oder lange E‑Mails schreiben. Erhält er eine Warnung über einen niedrigen Bestand, klickt er einfach auf „Bestellen“. Das System erstellt automatisch ein perfektes Geschäftsschreiben mit den benötigten Artikelnummern und der Adresse der Filiale und sendet es sofort an den lokalen Händler.",
    insight:
      "Vollständige Zeitoptimierung und Eliminierung menschlicher Fehler. Die Beschaffung läuft unterbrechungsfrei, und die exakten Artikelnummern und Adressen schließen Situationen aus, in denen der Lieferant die falsche Ware oder an die falsche Adresse liefert.",
  },
  {
    id: "b2b-extranet",
    product: "Verborgener Unternehmens‑E‑Commerce",
    title: "Ein elitärer Shop nur für Partner",
    description:
      "Wenn Sie das Netzwerk skalieren, erhalten Ihre Franchisepartner Zugang zu einem vollständig geschlossenen Unternehmensportal. Normale Kunden oder Google sehen diesen Bereich nicht. Hier können Franchisenehmer mit wenigen Klicks – wie auf einem gewöhnlichen Marktplatz – zertifiziertes Himalaya‑Salz, Markenverpackungen und Uniformen für ihr Personal direkt bei der Zentrale bestellen.",
    insight:
      "Generierung einer starken passiven B2B‑Einnahmequelle. Die Zentrale wird zum exklusiven Distributor, garantiert einen einheitlichen Premium‑Qualitätsstandard im gesamten Netzwerk und blockiert vollständig die Möglichkeit, dass Partner billige Fälschungen kaufen.",
  },
  {
    id: "b2b-invoicing",
    product: "Generator für legale Handelsrechnungen (Invoicing)",
    title: "Eine Buchhaltung, die selbstständig arbeitet",
    description:
      "Da der Franchisenehmer eine eigenständige juristische Person ist, stellt der Kauf von Unternehmenswaren bei der Zentrale ein Handelsgeschäft dar. Nachdem die Bestellung im B2B‑Marktplatz abgeschlossen ist, erstellt das System automatisch und sofort eine rechtlich einwandfreie Handelsrechnung (B2B‑Invoice) und sendet sie an die Buchhaltung des Partners.",
    insight:
      "100 % Automatisierung des Dokumentenverkehrs. Die Buchhaltung der Zentrale muss keine Rechnungen manuell in Word oder Excel ausstellen. Die Dokumente enthalten die korrekten Steuernummern und Mehrwertsteuersätze und garantieren eine perfekte Vorbereitung auf Prüfungen.",
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
export default function InventoryB2BPage() {
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
              Inventory &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                B2B Supply Chain
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie aus chaotischer Lagerhaltung ein präzises, automatisiertes
              System wird – und warum Ihre Franchisenehmer den neuen B2B‑Shop
              lieben werden.
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
                        Inventory &
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        B2B Chain
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
                      {/* 1. Package (Real-Time Deduction) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Package className="w-5 h-5" />
                      </div>
                      {/* 2. AlertTriangle (Low-Stock Alerts) - 60° */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      {/* 3. ClipboardCheck (Blind Count) - 120° */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <ClipboardCheck className="w-5 h-5" />
                      </div>
                      {/* 4. ShoppingCart (Smart Reorder) - 180° */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                      {/* 5. Building2 (B2B Extranet) - 240° */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <Building2 className="w-5 h-5" />
                      </div>
                      {/* 6. FileText (B2B Invoicing) - 300° */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <FileText className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: Real-Time Deduction */}
              {activeSceneId === "realtime-deduction" && (
                <motion.div
                  key="realtime-deduction"
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
                      <p className="text-sm font-bold text-salina-dark mb-4">
                        Kindersocken
                      </p>
                      <button className="px-6 py-3 bg-green-500 text-white rounded-2xl font-bold text-sm">
                        Bezahlen
                      </button>
                    </div>
                    <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2rem] p-6 shadow-lg text-center">
                      <p className="text-xs text-slate-500 mb-2">
                        Lagerbestand
                      </p>
                      <div className="text-4xl font-black text-salina-dark">
                        <motion.span
                          key="stock"
                          initial={{ scale: 1.2, color: "#fb923c" }}
                          animate={{ scale: 1, color: "#0f172a" }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        >
                          44
                        </motion.span>
                      </div>
                      <p className="text-xs text-green-600 mt-2">
                        −1 automatisch
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Low-Stock Alerts */}
              {activeSceneId === "low-stock-alerts" && (
                <motion.div
                  key="low-stock-alerts"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="w-full h-32 relative">
                      <svg viewBox="0 0 200 100" className="w-full h-full">
                        <motion.path
                          d="M0,20 Q50,40 100,60 T200,90"
                          fill="none"
                          stroke="#fb923c"
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <line
                          x1="0"
                          y1="80"
                          x2="200"
                          y2="80"
                          stroke="#ef4444"
                          strokeWidth="1"
                          strokeDasharray="5 5"
                        />
                      </svg>
                      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-red-500 font-bold">
                        Kritischer Schwellenwert
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl p-3">
                      <Bell className="w-5 h-5 text-amber-500" />
                      <p className="text-xs font-bold text-amber-700">
                        Nur noch 2 Kästen Wasser! Jetzt bestellen!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Blind Count */}
              {activeSceneId === "blind-count" && (
                <motion.div
                  key="blind-count"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <ClipboardCheck className="w-10 h-10 text-salina-orange mx-auto mb-4" />
                    <p className="text-sm font-bold text-salina-dark mb-2">
                      Kindersäfte
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-xs text-slate-500">Erwartet:</span>
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span className="text-xs text-slate-400">Verborgen</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Gezählt..."
                      className="w-24 px-4 py-3 rounded-xl border border-slate-200 text-center text-xl font-black"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-4 bg-red-50 border border-red-200 rounded-2xl p-3 inline-block"
                    >
                      <p className="text-xs font-bold text-red-700">
                        Manko: 4 Einheiten – stiller Alarm
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Smart Reorder */}
              {activeSceneId === "smart-reorder" && (
                <motion.div
                  key="smart-reorder"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <Package className="w-10 h-10 text-salina-orange mx-auto mb-4" />
                    <p className="text-sm font-bold text-salina-dark mb-2">
                      Mineralwasser
                    </p>
                    <button className="px-6 py-3 bg-salina-dark text-white rounded-2xl font-bold text-sm mb-4">
                      Bestand auffüllen
                    </button>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-left"
                    >
                      <p className="text-xs text-slate-500">
                        Bestellung an Lieferant:
                      </p>
                      <p className="text-xs text-salina-dark font-bold mt-1">
                        Betreff: Nachbestellung · 5 Kästen · Filiale München
                      </p>
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-2 mx-auto" />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: B2B Extranet */}
              {activeSceneId === "b2b-extranet" && (
                <motion.div
                  key="b2b-extranet"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-500">
                      <Building2 className="w-5 h-5 text-salina-orange" />{" "}
                      B2B‑Marktplatz
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "Himalaya‑Salz 25 kg", price: "42 €" },
                        { name: "Marken‑Poloshirt", price: "29 €" },
                        { name: "Kassenrolle 50er", price: "12 €" },
                        { name: "Stoppersocken", price: "8 €" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center cursor-pointer hover:border-salina-orange/30"
                        >
                          <p className="text-xs font-bold text-salina-dark">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-salina-orange mt-1">
                            {item.price}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 6: B2B Invoicing */}
              {activeSceneId === "b2b-invoicing" && (
                <motion.div
                  key="b2b-invoicing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <FileText className="w-10 h-10 text-salina-orange mx-auto mb-4" />
                    <p className="text-sm font-bold text-salina-dark mb-2">
                      B2B‑Invoice
                    </p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm inline-block"
                    >
                      <p className="text-xs text-slate-500">
                        Rechnung an Partner Berlin
                      </p>
                      <p className="text-lg font-black text-salina-dark mt-1">
                        150,00 €
                      </p>
                      <p className="text-[10px] text-green-600 mt-1">
                        inkl. MwSt. · DATEV‑bereit
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="mt-4 text-green-600 font-bold text-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 inline mr-1" />{" "}
                      Exportiert nach DATEV
                    </motion.div>
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
            Das Logistik‑Cockpit
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese unsichtbaren Mechanismen schützen Ihre Warenbestände,
            automatisieren die Beschaffung und machen Ihre Franchisepartner zu
            zufriedenen Kunden.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: Tiered Pricing & MOQ (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Großhandelspreise & Mindestmengen (MOQ)"
            description="Im B2B‑Marktplatz gelten automatisch Mengenrabatte und Mindestbestellmengen. Das System erlaubt einem Partner schlicht nicht, nur 1 Sack Salz zu bestellen, wenn die Mindestpartie 5 Säcke beträgt."
            insight="Sie animieren Franchisenehmer, mehr, aber seltener zu kaufen. Dies entlastet die Lagerlogistik der Zentrale enorm und reduziert Ihre Kosten für den Kurierdienst von Kleinstpartien radikal."
            icon={TrendingUp}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="text-center">
                <p className="text-sm font-black text-salina-dark">2</p>
                <p className="text-[10px] text-slate-500">Säcke</p>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                →
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <p className="text-sm font-black text-green-600">5</p>
                <p className="text-[10px] text-green-600">Säcke (MOQ)</p>
              </motion.div>
              <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-1 text-xs font-bold text-green-700">
                –15 % Rabatt
              </div>
            </div>
          </BentoCard>

          {/* Блок 2: Restocking (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Rückführung ins Lager (Restocking)"
            description="Wenn ein Kunde einen an der Rezeption gekauften Artikel zurückgibt und der Administrator eine Stornierung des Belegs vornimmt, führt die Plattform diese Einheit automatisch wieder dem virtuellen Lager zu."
            insight="Perfekte Bilanz ohne manuelle Korrekturen. Der menschliche Faktor, dass der Administrator vergisst, den retournierten Artikel in die Bestandsliste aufzunehmen, wird ausgeschlossen – das bewahrt vor falschen Fehlmengen am Monatsende."
            icon={RefreshCw}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <p className="text-xs font-bold text-red-700">Storno</p>
                <p className="text-[10px] text-red-600 mt-1">−1 Socken</p>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <RefreshCw className="w-6 h-6 text-salina-orange" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center"
              >
                <p className="text-xs font-bold text-green-700">Lager</p>
                <p className="text-[10px] text-green-600 mt-1">+1 Socken</p>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 3: Institutional Memory */}
          <BentoCard
            title="Institutionelles Gedächtnis"
            description="Im Backend jeder Filiale wird ein digitales Verzeichnis aller lokalen Lieferanten mit ihren genauen Arbeitszeiten und Konditionen zuverlässig gespeichert."
            insight="Völlige Unabhängigkeit von einzelnen Mitarbeitern. Fällt der Hauptmanager wegen Krankheit aus, weiß jeder Neuling an der Rezeption genau, wen er bei einem Rohrbruch oder Wassermangel anrufen muss."
            icon={Phone}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <Phone className="w-4 h-4" /> Wasserversorger
              </div>
              <p className="text-xs font-bold text-salina-dark">
                Tel: +49 30 123456
              </p>
              <p className="text-[10px] text-green-600 mt-1">
                Lieferung jeden Dienstag
              </p>
            </div>
          </BentoCard>

          {/* Блок 4: Safety Stock (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Dynamische Sicherheitsbestände (Safety Stock)"
            description="Für jeden Artikel wird ein individueller Mindestbestand festgelegt, der auf der Verkaufsgeschwindigkeit und der Lieferzeit des Lieferanten basiert."
            insight="Sie setzen lebendiges Geld frei (Cash Flow). Die Standorte kaufen Waren nicht mehr mit übermäßigem Puffer aus Angst vor Engpässen. Das Kapital des Unternehmens wird nicht in Lagern gebunden, sondern in Wachstum investiert."
            icon={ShieldCheck}
          >
            <div className="flex items-end justify-center gap-8 w-full h-20">
              <div className="text-center">
                <motion.div
                  initial={{ height: 20 }}
                  animate={{ height: [20, 40, 20] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-8 bg-salina-orange rounded-t-md mx-auto"
                />
                <p className="text-[10px] text-slate-500 mt-1">Socken</p>
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ height: 10 }}
                  animate={{ height: [10, 25, 10] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="w-8 bg-blue-400 rounded-t-md mx-auto"
                />
                <p className="text-[10px] text-slate-500 mt-1">Kassenrolle</p>
              </div>
            </div>
          </BentoCard>

          {/* Блок 5: Automatic Escalation */}
          <BentoCard
            title="Automatische Eskalation"
            description="Ignoriert der Filialleiter die Warnung über einen kritischen Bestand länger als 24 Stunden, eskaliert das System das Problem automatisch und sendet eine Warnung an den Chief Operating Officer (COO) in der Zentrale."
            insight="Garantierte Betriebsstabilität. Ein Problem wird niemals aufgrund menschlicher Nachlässigkeit vor Ort ignoriert und schützt so den Premium‑Service des Unternehmens."
            icon={Bell}
          >
            <div className="flex items-center justify-center gap-3 w-full">
              <div className="text-center">
                <p className="text-xs text-slate-500">Ungelesen</p>
                <p className="text-2xl font-black text-amber-500">24h</p>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Zap className="w-6 h-6 text-red-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-red-50 border border-red-200 rounded-xl px-3 py-1 text-xs font-bold text-red-700"
              >
                COO alarmiert
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 6: SEPA Direct Debit */}
          <BentoCard
            title="B2B‑Auto‑Zahlung (SEPA Direct Debit)"
            description="Der Franchisenehmer kann in seinem B2B‑Konto einmalig eine automatische Abbuchung von seinem Bankkonto einrichten (SEPA‑Mandat)."
            insight="Absolute Nahtlosigkeit der Abrechnung. Der Franchisenehmer verschwendet keine Zeit mit der Eingabe von Kartendaten bei jeder Bestellung von Salz oder Uniformen, und die Zentrale erhält eine garantierte und pünktliche Zahlung."
            icon={CreditCard}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center"
            >
              <CreditCard className="w-6 h-6 text-salina-orange mx-auto mb-2" />
              <p className="text-xs font-bold text-salina-dark">
                SEPA‑Mandat aktiv
              </p>
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-2 mx-auto" />
            </motion.div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
