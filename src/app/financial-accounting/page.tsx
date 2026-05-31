"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  TrendingUp,
  CreditCard,
  FileText,
  Building2,
  CalendarCheck,
  Download,
  ShieldCheck,
  Lock,
  Server,
  PieChart,
  Gift,
  Bell,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Store,
  Building,
  Receipt,
  Ticket,
  Send,
  Printer,
  Banknote,
  FileSpreadsheet,
  FolderDown,
  ShieldAlert,
  Tag,
  RotateCcw,
  XCircle,
  Percent,
  Undo2,
  Clock,
  Monitor,
  Eye,
  AlertCircle,
  Fingerprint,
  MapPin,
  Key,
  Calendar,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "live-dashboard",
    product: "Echtzeit-Finanzanalyse",
    title: "Echtzeit-Finanzkontrolle aller Filialen",
    description:
      "Sobald Sie Ihr Notebook öffnen, sehen Sie keine komplizierten Kontoauszüge oder unverständlichen Berichte mehr. Ein luxuriöses visuelles Dashboard zeigt Ihnen sofort die wichtigsten Finanzkennzahlen aller Filialen: Gesamtumsatz, Anteil der Geschenkgutscheine und Rentabilitätsprozentsatz. Alles in Echtzeit.",
    insight:
      "Präzision in der Führung. Sie treffen strategische Finanzentscheidungen sofort auf Basis aktueller Daten, statt auf die konsolidierten Berichte des Buchhalters am Monatsende warten zu müssen.",
  },
  {
    id: "stripe-connect",
    product: "Split‑Routing für Franchise‑Zahlungen",
    title: "Ihre Lizenzgebühr auf Autopilot",
    description:
      "Wenn Sie das Franchise starten, wird der Geldfluss vollständig autonom. Bezahlt ein Gast einen Besuch auf der Seite Ihres Partners in Berlin, teilt das System diese Zahlung im Millisekundenbereich auf. Der Hauptbetrag geht sofort auf das Konto des Partners, und Ihre Lizenzgebühr (Plattformprovision) geht auf das Hauptkonto von La Salina. Keine Verzögerungen und keine manuelle Rechnungsstellung an die Partner.",
    insight:
      "Garantiertes passives Einkommen. Sie werden niemals Forderungen gegenüber Franchisenehmern haben, und die Partner erhalten ihr „lebendiges“ Geld sofort zur Auszahlung von Gehältern und Mieten.",
  },
  {
    id: "clearing-report",
    product: "Clearing von Geschenkgutscheinen",
    title: "Transparenz bei netzweiten Geschenken",
    description:
      "Universelle Gutscheine funktionieren im gesamten Netzwerk. Wenn ein Gutschein auf der Hauptseite gekauft (das Geld haben Sie erhalten) und am Standort des Franchisenehmers eingelöst wurde, verliert das System diese Daten nicht. Am Monatsende erstellt das Backend automatisch einen konsolidierten Verrechnungsbericht (Clearing Report), der genau angibt, wem wie viel zu erstatten ist.",
    insight:
      "Absolutes Vertrauen in der Partnerschaft. Der Clearing‑Prozess ist vollständig automatisiert und beseitigt jegliche finanziellen Konflikte oder Undurchsichtigkeiten zwischen der Zentrale und den Franchisenehmern.",
  },
  {
    id: "b2b-invoice",
    product: "Kauf auf Rechnung & Rechnungserstellung",
    title: "Firmenkunden ohne Barrieren",
    description:
      "Wenn ein Kindergarten oder ein Unternehmen einen Gruppenbesuch buchen, können sie nicht mit Kreditkarte bezahlen. Das System bietet ihnen die Methode „Kauf auf Rechnung“ an und umgeht dabei das Zahlungsgateway. Sofort danach erstellt die Plattform automatisch eine perfekte Handelsrechnung im PDF‑ oder XML‑Format (nach dem europäischen Standard EN 16931) und sendet sie an die Buchhaltung des Kunden.",
    insight:
      "Sie erschließen sofort das margenstarke B2B‑Segment. Die Erstellung legaler Rechnungen erfolgt autonom, ohne dass Ihr Administrator Zeit für die manuelle Erstellung von Dokumenten in Word oder Excel aufwenden muss.",
  },
  {
    id: "tagesabschluss",
    product: "Täglicher Kassenabschluss auf der Rezeption",
    title: "Schichtwechsel in einer Sekunde",
    description:
      "Der größte Stress für das Personal ist der abendliche Kassensturz und die Suche nach Differenzen. Dank des La Salina‑Systems drückt der Manager am Ende der Schicht einfach eine Taste „Schicht schließen“ auf dem Arbeits‑Tablet. Die Kasse ready2order gleicht selbstständig Bargeld, Terminalzahlungen und Online‑Bestellungen ab und erstellt einen perfekten täglichen Z‑Bericht.",
    insight:
      "Ausschluss des menschlichen Faktors (Human Error). Die Schicht wird einwandfrei abgeschlossen, das Personal geht pünktlich nach Hause, und Sie sind stets sicher, dass die Zahlen in der Kasse centgenau stimmen.",
  },
  {
    id: "datev-export",
    product: "Automatische Monatsberichterstattung",
    title: "Ihre perfekte Steuererklärung",
    description:
      "Alle Verkäufe (von nächtlichen Online‑Buchungen bis zum physischen Kaffeekauf) laufen über ein einziges Cloud‑Zentrum. Am Ende des Monats klicken Sie einfach auf „Export“ – und das System generiert eine vollständig fertige, perfekt abgestimmte Datei im deutschen DATEV‑Standard. Jeder Cent wird auf die richtigen Buchhaltungskonten verteilt.",
    insight:
      "Sie senken die Kosten für den Steuerberater um mindestens 60 % pro Monat. Ihr Buchhalter muss nicht mehr Tausende von Stripe‑Transaktionen und Papierbelege manuell sortieren.",
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
export default function FinancialAccountingPage() {
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
              Financial &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Accounting
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie aus chaotischer Buchhaltung ein präzises, automatisiertes
              System wird, das Ihnen jede Nacht ruhigen Schlaf schenkt.
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
                        Financial &
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Accounting
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
                      {/* 1. TrendingUp (Live Dashboard) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      {/* 2. CreditCard (Stripe Connect) - 60° */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      {/* 3. FileText (Clearing Report) - 120° */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <FileText className="w-5 h-5" />
                      </div>
                      {/* 4. Building2 (B2B) - 180° */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <Building2 className="w-5 h-5" />
                      </div>
                      {/* 5. CalendarCheck (Tagesabschluss) - 240° */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <CalendarCheck className="w-5 h-5" />
                      </div>
                      {/* 6. Download (DATEV Export) - 300° */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <Download className="w-5 h-5" />
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

              {activeSceneId === "live-dashboard" && (
                <motion.div
                  key="live-dashboard"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full flex justify-center p-2"
                >
                  {/* Картка: ПРИБРАНО rotateX/Y, щоб запобігти блюру при ховері */}
                  <motion.div
                    whileHover={{
                      scale: 1.01,
                      y: -3, // М'яке спливання картки вгору
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      },
                    }}
                    className="relative bg-white/80 backdrop-blur-3xl border border-white/60 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-8 w-full overflow-visible"
                  >
                    {/* Шапка */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2.5 text-sm font-extrabold text-salina-dark">
                        <TrendingUp className="w-5 h-5 text-salina-orange" />
                        <span className="tracking-tight">Umsatz heute</span>
                      </div>
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.8,
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        className="text-[11px] font-bold text-green-700 bg-green-50/90 border border-green-200 px-3 py-1 rounded-full shadow-sm"
                      >
                        +12%{" "}
                        <span className="font-medium text-green-600 hidden sm:inline">
                          vs. gestern
                        </span>
                      </motion.span>
                    </div>

                    {/* Інтерактивний 3D Графік (стовпчики все ще анімуються окремо) */}
                    <div className="flex items-end justify-between gap-2 h-32 mb-8 px-1 relative">
                      {[
                        { day: "Mo", h: 40, sales: "€1.1k" },
                        { day: "Di", h: 55, sales: "€1.5k" },
                        { day: "Mi", h: 35, sales: "€0.9k" },
                        { day: "Do", h: 70, sales: "€1.9k" },
                        { day: "Fr", h: 60, sales: "€1.6k" },
                        { day: "Sa", h: 85, sales: "€2.3k", peak: true },
                        { day: "So", h: 50, sales: "€1.3k" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.day}
                          className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative"
                          whileHover={{
                            scale: 1.05,
                            y: -3,
                            transition: { duration: 0.2 },
                          }}
                        >
                          {/* Спливаюча підказка (Тултип) */}
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            whileHover={{ opacity: 1, y: -5, scale: 1 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap z-10"
                          >
                            <span className="font-bold text-salina-orange">
                              {item.sales}
                            </span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 rounded-sm" />
                          </motion.div>

                          {/* Стовпчик з імітацією об'єму */}
                          <div className="w-full h-full flex items-end relative overflow-visible group">
                            {/* Легка внутрішня тінь */}
                            <div className="absolute inset-0 bg-salina-orange/5 rounded-t-xl transform translate-y-1 scale-x-105 group-hover:bg-salina-orange/15 transition-all duration-300" />
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${item.h}%` }}
                              transition={{
                                duration: 1.2,
                                delay: 0.2 + i * 0.1,
                                ease: [0.23, 1, 0.32, 1],
                              }}
                              className={cn(
                                "w-full bg-salina-orange rounded-t-xl relative border-t border-salina-orange/80 shadow-sm transition-shadow duration-300 group-hover:shadow-salina-orange/30 group-hover:shadow-md",
                                item.peak &&
                                  "ring-1 ring-salina-orange ring-offset-1 ring-offset-white/80",
                              )}
                            />
                          </div>

                          {/* Підпис дня */}
                          <span className="text-[10px] font-bold text-slate-400 group-hover:text-salina-dark group-hover:scale-110 transition-all">
                            {item.day}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Сегменти оплат */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        {
                          label: "Bar",
                          pct: 30,
                          color: "bg-emerald-500",
                          icon: "€",
                        },
                        {
                          label: "Karten",
                          pct: 50,
                          color: "bg-blue-500",
                          icon: "💳",
                        },
                        {
                          label: "Online",
                          pct: 20,
                          color: "bg-purple-500",
                          icon: "🌐",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          className="flex flex-col w-full cursor-pointer"
                          whileHover={{ y: -2 }} // Легке спливання сегмента
                        >
                          <div className="flex items-center justify-between mb-1.5 px-0.5">
                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                              <span>{item.icon}</span> {item.label}
                            </span>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.2 + i * 0.2 }}
                              className="text-[10px] font-extrabold text-slate-700"
                            >
                              {item.pct}%
                            </motion.span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.pct}%` }}
                              transition={{
                                duration: 1.5,
                                delay: 1 + i * 0.2,
                                ease: "easeOut",
                              }}
                              className={cn(
                                "h-full rounded-full shadow-sm",
                                item.color,
                              )}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Кнопка статусу (повністю інтерактивна) */}
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(22, 163, 74, 0.05)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 pt-4 pb-1 border-t border-slate-100 mt-2 rounded-b-[2rem] text-center text-green-600 font-semibold group transition-colors"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [1, 0.8, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut",
                        }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </motion.div>
                      <span className="text-[11px] tracking-tight">
                        Alle Filialen synchronisiert
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-green-400 group-hover:text-green-600 transition-colors" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
              {/* ВІЗУАЛ 2: Stripe Connect */}
              {activeSceneId === "stripe-connect" && (
                <motion.div
                  key="stripe-connect"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full flex justify-center p-2"
                >
                  <motion.div
                    whileHover={{
                      y: -3,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      },
                    }}
                    className="relative bg-white/80 backdrop-blur-3xl border border-white/60 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-8 w-full max-w-sm flex flex-col items-center"
                  >
                    {/* Індикатор Live */}
                    <div className="flex items-center gap-2 mb-6 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Split-Payment
                      </span>
                    </div>

                    {/* Головна сума (Клієнт) */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", damping: 20 }}
                      className="relative z-10 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl shadow-slate-200/40 w-36 flex flex-col items-center"
                    >
                      <CreditCard className="w-4 h-4 text-slate-400 mb-1.5" />
                      <span className="text-[10px] font-medium text-slate-400 mb-0.5">
                        Kunde zahlt
                      </span>
                      <span className="text-2xl font-black text-slate-800 tracking-tight">
                        50,00 €
                      </span>
                    </motion.div>

                    {/* Анімовані лінії розщеплення (Плавні криві + ефект потоку) */}
                    <div className="relative w-full h-20 -my-2 z-0">
                      <svg
                        viewBox="0 0 200 80"
                        className="w-full h-full overflow-visible"
                      >
                        {/* Базові світлі лінії (треки) */}
                        <path
                          d="M 100 10 C 100 45, 40 45, 40 80"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 100 10 C 100 45, 160 45, 160 80"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />

                        {/* Анімація промальовування ліній */}
                        <motion.path
                          d="M 100 10 C 100 45, 40 45, 40 80"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: "easeOut",
                          }}
                        />
                        <motion.path
                          d="M 100 10 C 100 45, 160 45, 160 80"
                          fill="none"
                          stroke="#eab308"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.6,
                            ease: "easeOut",
                          }}
                        />

                        {/* Ефект рухомих грошей (Flow) - безперервна анімація */}
                        <motion.path
                          d="M 100 10 C 100 45, 40 45, 40 80"
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="4 16"
                          initial={{ strokeDashoffset: 20, opacity: 0 }}
                          animate={{ strokeDashoffset: 0, opacity: 1 }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 1,
                          }}
                        />
                        <motion.path
                          d="M 100 10 C 100 45, 160 45, 160 80"
                          fill="none"
                          stroke="#ca8a04"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="4 16"
                          initial={{ strokeDashoffset: 20, opacity: 0 }}
                          animate={{ strokeDashoffset: 0, opacity: 1 }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 1.2,
                          }}
                        />
                      </svg>
                    </div>

                    {/* Отримувачі (Destinations) */}
                    <div className="flex items-center justify-between w-full gap-3 relative z-10">
                      {/* Партнер */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        className="flex-1 bg-green-50/80 backdrop-blur-md border border-green-200/60 rounded-2xl p-3 flex flex-col items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Store className="w-3.5 h-3.5 text-green-500 mb-1" />
                        <span className="text-[10px] font-medium text-green-600/80 mb-0.5">
                          Partner Berlin
                        </span>
                        <span className="text-lg font-black text-green-700">
                          45,00 €
                        </span>
                      </motion.div>

                      {/* Платформа (Royalty) */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        className="flex-1 bg-yellow-50/80 backdrop-blur-md border border-yellow-200/60 rounded-2xl p-3 flex flex-col items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Building className="w-3.5 h-3.5 text-yellow-500 mb-1" />
                        <span className="text-[10px] font-medium text-yellow-600/80 mb-0.5">
                          Royalty HQ
                        </span>
                        <span className="text-lg font-black text-yellow-700">
                          5,00 €
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Clearing Report */}
              {activeSceneId === "clearing-report" && (
                <motion.div
                  key="clearing-report"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full flex justify-center p-2"
                >
                  <motion.div
                    whileHover={{
                      y: -3,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      },
                    }}
                    className="relative bg-white/80 backdrop-blur-3xl border border-white/60 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-8 w-full max-w-sm overflow-visible"
                  >
                    {/* Шапка "Документа" */}
                    <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-dashed border-slate-200/70">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-salina-orange/10 rounded-lg">
                          <Receipt className="w-5 h-5 text-salina-orange" />
                        </div>
                        <h3 className="text-[15px] font-extrabold text-salina-dark tracking-tight">
                          Clearing Report
                        </h3>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-100/80 px-2.5 py-1 rounded-md shadow-inner border border-slate-200/50">
                        August 2026
                      </span>
                    </div>

                    {/* Список купонів (Транзакції) */}
                    <div className="space-y-3 mb-8 relative">
                      {[
                        {
                          gutschein: "Gutschein #1234",
                          betrag: "– 25,00 €",
                          farbe: "text-salina-orange",
                        },
                        {
                          gutschein: "Gutschein #5678",
                          betrag: "– 50,00 €",
                          farbe: "text-salina-orange",
                        },
                        {
                          gutschein: "Gutschein #9012",
                          betrag: "– 75,00 €",
                          farbe: "text-salina-orange",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.2 + i * 0.15,
                            type: "spring",
                            damping: 20,
                          }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          className="flex justify-between items-center bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-salina-orange/10 transition-colors">
                              <Ticket className="w-4 h-4 text-slate-400 group-hover:text-salina-orange transition-colors" />
                            </div>
                            <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                              {item.gutschein}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "font-black text-sm tracking-tight",
                              item.farbe,
                            )}
                          >
                            {item.betrag}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Підсумок (Ausgleich) */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, type: "spring", damping: 20 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-2xl p-5 border border-green-200/60 shadow-sm cursor-pointer group"
                    >
                      {/* Декоративний фон для об'єму */}
                      <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors" />

                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-green-600/80 mb-0.5 uppercase tracking-wider">
                            Summe Erstattung
                          </span>
                          <p className="text-base font-black text-green-800">
                            Ausgleich Berlin
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xl font-black text-green-700 bg-white/60 px-3 py-1 rounded-xl shadow-sm border border-green-100/50">
                            150,00 €
                          </span>
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="bg-green-500 rounded-full p-1 shadow-md shadow-green-500/30"
                          >
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Мікро-взаємодія при наведенні */}
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: B2B Invoice */}
              {activeSceneId === "b2b-invoice" && (
                <motion.div
                  key="b2b-invoice"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full flex justify-center p-2"
                >
                  <motion.div
                    whileHover={{
                      y: -3,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      },
                    }}
                    className="relative bg-white/80 backdrop-blur-3xl border border-white/60 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-8 w-full max-w-sm flex flex-col items-center"
                  >
                    {/* Шапка: B2B Kauf auf Rechnung */}
                    <div className="flex items-center gap-3 mb-6 bg-slate-50/80 border border-slate-100 px-4 py-2 rounded-2xl shadow-sm">
                      <Building2 className="w-5 h-5 text-salina-orange" />
                      <span className="text-[14px] font-extrabold text-salina-dark tracking-tight">
                        Kauf auf Rechnung
                      </span>
                    </div>

                    {/* Візуалізація рахунку (Документ) */}
                    <div className="relative w-full flex justify-center mb-6">
                      {/* Тінь/Фон для ефекту стопки документів */}
                      <div className="absolute inset-x-6 -bottom-3 h-10 bg-slate-200/60 rounded-2xl blur-md" />

                      <motion.div
                        initial={{ y: 30, opacity: 0, rotate: -3 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring", damping: 20 }}
                        whileHover={{ y: -5, rotate: 1, scale: 1.02 }}
                        className="relative w-full max-w-[260px] bg-white border border-slate-200 rounded-2xl p-5 shadow-lg shadow-slate-200/50 cursor-pointer group overflow-hidden"
                      >
                        {/* Декоративна верхня лінія документа */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500 opacity-90" />

                        {/* Водяний знак "B2B" */}
                        <motion.div
                          initial={{ scale: 2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.04 }}
                          transition={{ delay: 0.8, type: "spring" }}
                          className="absolute right-2 bottom-6 -rotate-12 pointer-events-none"
                        >
                          <div className="border-4 border-slate-900 text-slate-900 font-black text-4xl px-2 py-1 rounded-lg uppercase tracking-widest">
                            B2B
                          </div>
                        </motion.div>

                        <div className="flex items-start gap-3 relative z-10">
                          {/* Іконка документа */}
                          <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                            <FileText className="w-6 h-6 text-blue-600" />
                          </div>

                          <div className="text-left flex-1">
                            <p className="text-xs font-black text-salina-dark mb-0.5 uppercase tracking-wide">
                              Rechnung
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono mb-3">
                              #2026-0815
                            </p>

                            {/* Теги характеристик */}
                            <div className="flex flex-col gap-2 mb-4">
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md w-fit shadow-sm border border-slate-200/50">
                                <ShieldCheck className="w-3 h-3 text-slate-400" />{" "}
                                EN 16931 (ZUGFeRD)
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md w-fit shadow-sm border border-emerald-100">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />{" "}
                                DATEV-bereit
                              </span>
                            </div>

                            {/* Сума (відділена пунктиром) */}
                            <div className="pt-3 border-t-2 border-dashed border-slate-100">
                              <p className="text-2xl font-black text-salina-dark tracking-tight">
                                150,00 €
                              </p>
                              <p className="text-[9px] font-medium text-slate-400 mt-0.5">
                                inkl. MwSt. / PDF + XML
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Статус відправки з анімованою іконкою */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, type: "spring", damping: 20 }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-green-50/80 backdrop-blur-sm border border-green-200/60 rounded-2xl p-3.5 flex items-center justify-center gap-2.5 cursor-pointer hover:bg-green-50 transition-colors shadow-sm"
                    >
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="bg-white p-1 rounded-full shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5 text-green-600 ml-[-1px]" />
                      </motion.div>
                      <span className="text-xs text-green-700 font-bold tracking-tight">
                        Automatisch an Kunden gesendet
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: Tagesabschluss */}
              {activeSceneId === "tagesabschluss" && (
                <motion.div
                  key="tagesabschluss"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full flex justify-center p-2"
                >
                  <motion.div
                    whileHover={{
                      y: -3,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      },
                    }}
                    className="relative bg-white/80 backdrop-blur-3xl border border-white/60 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-8 w-full max-w-sm flex flex-col items-center"
                  >
                    {/* Головна інтерактивна кнопка (Call to Action) */}
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative w-full overflow-hidden bg-gradient-to-br from-salina-orange to-orange-500 text-white rounded-2xl p-4 shadow-lg shadow-salina-orange/30 transition-all group mb-8 border border-orange-400/50"
                    >
                      {/* Анімація "блиску" на кнопці */}
                      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />

                      <div className="flex items-center justify-center gap-2.5 relative z-10">
                        <Printer className="w-5 h-5 text-white/90" />
                        <span className="font-extrabold text-lg tracking-tight">
                          Kassen-Tagesabschluss
                        </span>
                      </div>
                    </motion.button>

                    {/* Картки способів оплати */}
                    <div className="grid grid-cols-3 gap-3 w-full mb-6">
                      {[
                        {
                          icon: Banknote,
                          label: "Bar",
                          betrag: "120,00 €",
                          color: "text-emerald-500",
                          bg: "bg-emerald-50",
                          border: "border-emerald-100",
                        },
                        {
                          icon: CreditCard,
                          label: "Karte",
                          betrag: "340,00 €",
                          color: "text-blue-500",
                          bg: "bg-blue-50",
                          border: "border-blue-100",
                        },
                        {
                          icon: Gift,
                          label: "Gutschein",
                          betrag: "50,00 €",
                          color: "text-purple-500",
                          bg: "bg-purple-50",
                          border: "border-purple-100",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.2 + i * 0.15,
                            type: "spring",
                            damping: 20,
                          }}
                          whileHover={{ scale: 1.05, y: -4 }}
                          className="flex flex-col items-center bg-white border border-slate-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div
                            className={`p-2 rounded-xl mb-2 transition-colors ${item.bg} ${item.border}`}
                          >
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                            {item.label}
                          </p>
                          <p className="text-xs font-black text-slate-800 tracking-tight">
                            {item.betrag}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Розділювач (імітація відривного чека) */}
                    <div className="w-full border-t-2 border-dashed border-slate-200/80 mb-6 relative">
                      <div className="absolute -top-1.5 left-[-36px] w-3 h-3 bg-slate-100/50 rounded-full" />
                      <div className="absolute -top-1.5 right-[-36px] w-3 h-3 bg-slate-100/50 rounded-full" />
                    </div>

                    {/* Статус: Z-Bon & DATEV (стилізовано під фінансове підтвердження) */}
                    <motion.div
                      initial={{ opacity: 0, y: -10, rotateX: -20 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full bg-gradient-to-r from-emerald-50 to-green-50 border border-green-200/80 rounded-2xl p-4 shadow-sm cursor-pointer group relative overflow-hidden"
                    >
                      <div className="absolute -right-4 -top-4 w-12 h-12 bg-green-500/10 rounded-full blur-lg" />

                      <div className="flex flex-col items-center gap-2 relative z-10">
                        <div className="flex items-center gap-1.5 text-green-700">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="font-extrabold text-sm tracking-tight">
                            Z-Bon erfolgreich gedruckt
                          </span>
                        </div>

                        <div className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-lg border border-green-100/50 shadow-sm mt-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] font-bold text-emerald-800 tracking-wide uppercase">
                            KassenSichV & DATEV bereit
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
              {/* ВІЗУАЛ 6: DATEV Export */}
              {activeSceneId === "datev-export" && (
                <motion.div
                  key="datev-export"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full flex justify-center p-2"
                >
                  <motion.div
                    whileHover={{
                      y: -3,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      },
                    }}
                    className="relative bg-white/80 backdrop-blur-3xl border border-white/60 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-8 w-full max-w-sm flex flex-col items-center"
                  >
                    {/* Шапка */}
                    <div className="flex items-center gap-2.5 mb-8 bg-slate-50/80 border border-slate-100 px-4 py-2 rounded-xl shadow-sm">
                      <FileSpreadsheet className="w-5 h-5 text-salina-orange" />
                      <span className="text-[14px] font-extrabold text-salina-dark tracking-tight uppercase">
                        Monatsabschluss
                      </span>
                    </div>

                    {/* Анімація "збору" документів у папку */}
                    <div className="relative w-full h-32 flex justify-center mb-4">
                      {/* Документи, що падають/збираються */}
                      <div className="absolute inset-x-0 bottom-10 flex justify-center gap-1 z-0">
                        {[
                          {
                            icon: FileText,
                            color: "text-blue-500",
                            delay: 0.1,
                            x: -30,
                            rot: -15,
                          },
                          {
                            icon: CreditCard,
                            color: "text-purple-500",
                            delay: 0.3,
                            x: -10,
                            rot: -5,
                          },
                          {
                            icon: Banknote,
                            color: "text-emerald-500",
                            delay: 0.5,
                            x: 10,
                            rot: 5,
                          },
                          {
                            icon: FileText,
                            color: "text-salina-orange",
                            delay: 0.7,
                            x: 30,
                            rot: 15,
                          },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{
                              y: -60,
                              opacity: 0,
                              scale: 0.5,
                              x: item.x,
                              rotate: item.rot,
                            }}
                            animate={{
                              y: 20,
                              opacity: [0, 1, 0],
                              scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              delay: item.delay,
                              repeat: Infinity,
                              repeatDelay: 1.5,
                              ease: "easeInOut",
                            }}
                            className="absolute"
                          >
                            <div
                              className={`p-2 bg-white rounded-lg shadow-sm border border-slate-100 ${item.color}`}
                            >
                              <item.icon className="w-5 h-5" />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Папка / Архів внизу (приймає документи) */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          delay: 0.8,
                        }}
                        className="absolute bottom-0 z-10 p-4 bg-salina-orange/10 rounded-2xl border border-salina-orange/20"
                      >
                        <FolderDown className="w-10 h-10 text-salina-orange" />
                      </motion.div>
                    </div>

                    {/* Готовий файл для експорту */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, type: "spring", damping: 20 }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full relative overflow-hidden bg-white border border-green-200/80 rounded-2xl p-5 shadow-lg shadow-green-100/50 cursor-pointer group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50" />

                      <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 bg-green-500 rounded-xl shadow-inner group-hover:bg-green-600 transition-colors">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>

                        <div className="text-left flex-1">
                          <p className="text-sm font-black text-green-800 tracking-tight mb-1">
                            DATEV-Export bereit
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
                              512 Transaktionen
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
                              3 Filialen
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
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
            Finanzieller & Juristischer Schutzschild
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese unsichtbaren Sicherheits- und Compliance‑Mechanismen arbeiten
            rund um die Uhr, damit Sie sich auf das Wesentliche konzentrieren
            können.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: Security Logs (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Unveränderliches Audit‑Log (Security Logs)"
            description="Alle bedeutenden finanziellen oder administrativen Aktionen (Rabattvergabe, Rückerstattung, Buchungsstornierung) werden kontinuierlich in einer System‑Logdatei aufgezeichnet. Dieses Journal speichert die genaue Uhrzeit, die IP‑Adresse und den Namen des Mitarbeiters. Es kann weder gelöscht noch bearbeitet werden."
            insight="Absoluter Schutz vor internem Betrug (Fraud) und Insider‑Manipulationen. Die Verantwortung des Personals ist stets personalisiert und schafft eine Kultur der Transparenz und Ehrlichkeit im Team."
            icon={Lock}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200">
              {/* Заголовки таблиці */}
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
                <span className="flex-1">Aktion & Details</span>
                <span className="w-28 hidden sm:block">Benutzer / IP</span>
                <span className="w-12 text-right">Status</span>
              </div>

              {/* Список логів (Тільки базова анімація появи, БЕЗ анімацій при наведенні) */}
              <div className="space-y-2">
                {[
                  {
                    action: "Stornierung",
                    detail: "Rechnung #1042",
                    user: "Anna (Admin)",
                    time: "14:05:12",
                    ip: "192.168.1.12",
                    icon: AlertCircle,
                    iconColor: "text-red-500",
                  },
                  {
                    action: "Rabatt 10%",
                    detail: "Manuelle Eingabe",
                    user: "Tom (Kasse)",
                    time: "15:22:45",
                    ip: "192.168.1.14",
                    icon: Tag,
                    iconColor: "text-amber-500",
                  },
                  {
                    action: "Refund 35€",
                    detail: "Bar ausgezahlt",
                    user: "Lisa (Manager)",
                    time: "16:47:03",
                    ip: "10.0.0.42",
                    icon: RotateCcw,
                    iconColor: "text-blue-500",
                  },
                ].map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.3 }}
                    // Взаємодія реалізована виключно через CSS класи (швидко і без блюру)
                    className="flex items-center justify-between bg-white border border-slate-100 rounded-xl p-3 hover:bg-slate-100 hover:border-slate-300 transition-colors duration-200"
                  >
                    {/* Колонка 1: Дія */}
                    <div className="flex items-center gap-3 flex-1">
                      <log.icon className={`w-4 h-4 ${log.iconColor}`} />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">
                          {log.action}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {log.time} · {log.detail}
                        </span>
                      </div>
                    </div>

                    {/* Колонка 2: Користувач / IP */}
                    <div className="flex-col w-28 hidden sm:flex">
                      <span className="text-[10px] font-bold text-slate-700">
                        {log.user}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono tracking-tight">
                        {log.ip}
                      </span>
                    </div>

                    {/* Колонка 3: Статус (Незмінно) */}
                    <div className="w-12 flex justify-end">
                      <Lock className="w-4 h-4 text-emerald-500" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Нижній системний статус */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Live Logging aktiv
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-100">
                  SHA-256
                </span>
              </div>
            </div>
          </BentoCard>
          {/* Блок 2: KassenSichV & TSE (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Steuerliche Einwandfreiheit (KassenSichV & TSE)"
            description="Jede Transaktion, unabhängig von ihrer Quelle, erhält eine legale kryptografische Signatur vom zertifizierten TSE‑Modul über die Integration mit der Kasse ready2order. Alle fiskalischen Anforderungen des KassenSichV‑Gesetzes werden automatisch im Hintergrund erfüllt."
            insight="Compliance‑as‑a‑Service. Jede unangekündigte Steuerprüfung (Kassen‑Nachschau) wird in 15 Minuten absolut erfolgreich abgeschlossen. Sie und Ihre Franchisenehmer sind vor ruinösen Strafen (bis zu 25 000 €) für Kassenmanipulationen geschützt."
            icon={ShieldCheck}
          >
            <div className="group relative w-full h-40 flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50/50 rounded-2xl p-4 border border-slate-100 shadow-inner overflow-hidden">
              {/* Фонові плаваючі квитанції (потік транзакцій) */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: [0, -15 - i * 3, 0],
                    opacity: [0.2, 0.6, 0.2],
                    x: [0, i % 2 === 0 ? 5 : -5, 0],
                  }}
                  transition={{
                    duration: 2 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className="absolute text-3xl select-none pointer-events-none"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 15}%`,
                  }}
                >
                  🧾
                </motion.div>
              ))}

              {/* Центральний TSE-модуль */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Пульсуючі індикатори активності */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-20 h-20 bg-green-400/20 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="absolute w-20 h-20 bg-green-300/15 rounded-full"
                />

                {/* Іконка щита */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-full w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                </motion.div>

                {/* Статус */}
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-green-600 font-bold mt-3 text-center"
                >
                  TSE‑Signatur aktiv
                </motion.p>
              </motion.div>

              {/* Hover-панель: деталі останньої транзакції + кнопка */}
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                whileHover={{ opacity: 1, y: 0, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-3 shadow-md opacity-0 group-hover:opacity-100 z-20 cursor-default"
              >
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>Letzte Transaktion: #2026-0815</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                  <Fingerprint className="w-3 h-3" />
                  <span>Signatur: g7f8a9b... (SHA-256)</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full bg-green-600 text-white text-[10px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 hover:bg-green-700 transition-colors"
                >
                  <FileText className="w-3 h-3" /> Zertifikat anzeigen
                </motion.button>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 3: Multi-Token Isolation */}
          <BentoCard
            title="Steuerliche Franchise‑Isolation (Multi‑Token)"
            description="Das System setzt automatisch unterschiedliche Fiskalschlüssel (Account Tokens) ein, je nachdem, in welcher Stadt der Verkauf stattfindet. Die Belege des Partners in Berlin gelangen niemals in die Berichterstattung des Partners in München."
            insight="100 % finanzielle Isolation der juristischen Personen. Die Hauptgesellschaft (HQ) trägt keinerlei Verantwortung für die Steuerberichterstattung oder mögliche Fehler ihrer Franchisepartner."
            icon={Server}
          >
            <div className="w-full bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-center gap-4">
                {/* Berlin */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex-1 bg-white rounded-2xl p-4 border border-blue-100 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <Building2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-800">
                      Berlin GmbH
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 rounded-lg px-2.5 py-1">
                    <Key className="w-3 h-3 text-blue-600" />
                    <span className="text-[10px] font-mono font-bold text-blue-700">
                      Token_B
                    </span>
                  </div>
                </motion.div>

                {/* Роздільник */}
                <div className="flex flex-col items-center shrink-0">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="bg-emerald-100 p-1.5 rounded-full"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </motion.div>
                  <div className="w-px h-8 bg-gradient-to-b from-slate-300 to-transparent my-2" />
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] rotate-90 origin-center whitespace-nowrap select-none">
                    Isoliert
                  </span>
                </div>

                {/* München */}
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="flex-1 bg-white rounded-2xl p-4 border border-salina-orange/20 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <Building2 className="w-4 h-4 text-salina-orange flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-800">
                      München UG
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-salina-orange/10 rounded-lg px-2.5 py-1">
                    <Key className="w-3 h-3 text-salina-orange" />
                    <span className="text-[10px] font-mono font-bold text-salina-dark">
                      Token_M
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 4: Event ROI Dashboard (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Event‑Rentabilitätsanalyse (Event ROI Dashboard)"
            description="Kinderfeste und Geburtstage sind ein margenstarkes Segment. Die Plattform trennt sie automatisch von den regulären Besuchen und zeigt sie auf einem separaten Dashboard an."
            insight="Kristallklare Rentabilitätsberechnung (ROI). Sie wissen genau, welchen Anteil des Reingewinns die privaten Feiern generieren, und können so Ihre Marketingbudgets effizient auf die lukrativsten Sparten umverteilen."
            icon={PieChart}
          >
            <div className="w-full bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-5 border border-slate-200 shadow-inner">
              <div className="flex gap-4">
                {/* Regular */}
                <div className="flex-1 bg-slate-50/80 rounded-2xl p-4 border border-slate-200 shadow-sm">
                  <p className="text-xs font-medium text-slate-500 mb-3">
                    Regulär
                  </p>
                  <div className="flex items-end justify-center gap-2 h-16">
                    {[40, 60, 80, 70].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.1,
                          ease: "easeOut",
                        }}
                        className="w-3 bg-slate-300 rounded-t-sm"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 text-center">
                    4 Wochen
                  </p>
                </div>

                {/* Events */}
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="flex-1 bg-yellow-50/80 rounded-2xl p-4 border border-yellow-200 shadow-sm"
                >
                  <p className="text-xs font-bold text-yellow-700 mb-3">
                    Events
                  </p>
                  <div className="flex items-end justify-center gap-2 h-16">
                    {[60, 80, 95, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.2,
                          ease: "easeOut",
                        }}
                        className="w-3 bg-yellow-400 rounded-t-sm"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-green-600 mt-2 text-center font-bold">
                    +25 %
                  </p>
                </motion.div>
              </div>

              {/* Додаткова інформація внизу */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500"
              >
                <span>
                  Gesamtumsatz Events:{" "}
                  <span className="font-bold text-slate-700">12.450 €</span>
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-yellow-700 font-bold hover:text-yellow-800 transition-colors"
                >
                  Details →
                </motion.button>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 5: Kulanz / Ваучери */}
          <BentoCard
            title="Loyalitäts‑Management (Kulanz / Gutscheine)"
            description="Wenn ein Gast die Stornierungsregeln aufgrund von Krankheit verletzt, führt der Administrator keine Bank‑Rückerstattung (Refund) über Stripe durch. Mit einem Klick erstellt er einen 100 %‑Kulanzgutschein und sendet ihn dem Gast per WhatsApp."
            insight="Kompromisslose Erhaltung der Liquidität (Cash Flow). Das Geld bleibt physisch auf den Konten des Unternehmens, Sie zahlen keine Bankgebühren für die Rückerstattung, und der dankbare Kunde kommt garantiert in der nächsten Woche wieder."
            icon={Gift}
          >
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group relative bg-yellow-50/80 backdrop-blur-sm border border-yellow-200 rounded-2xl p-4 text-center cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Іконка подарунка з анімацією */}
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="mx-auto mb-1 w-fit"
              >
                <Gift className="w-8 h-8 text-yellow-600" />
              </motion.div>

              {/* Основний текст */}
              <p className="text-xs font-bold text-yellow-700 mb-1">
                100 % Kulanz
              </p>
              <p className="text-[10px] text-yellow-600">In WhatsApp ziehen</p>

              {/* Додаткова панель, яка з'являється при наведенні */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileHover={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 mt-3 border-t border-yellow-200/60 text-left space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <Hash className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="font-mono">GIFT-7A3B9</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span>Gültig bis 31.12.</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-green-600 text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-green-700 transition-colors"
                  >
                    <Send className="w-3 h-3" /> Per WhatsApp senden
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </BentoCard>

          {/* Блок 6: New Year Watchdog */}
          <BentoCard
            title="Intelligenter Finanz‑Wächter (New Year Watchdog)"
            description="Jedes Jahr am 27. Dezember sendet das System automatisch eine Erinnerungs‑Anleitung an die Inhaberin und den Hauptbuchhalter, das neue Geschäftsjahr in der Cloud‑Kasse ready2order zu eröffnen."
            insight="Beseitigung des Risikos eines vollständigen Kassenstopps am 1. Januar. Das System warnt proaktiv vor menschlicher Vergesslichkeit und garantiert, dass das Unternehmen das neue Jahr ohne HTTP‑400‑Fehler beginnt und kein Kunde ohne Fiskalbeleg geht."
            icon={Bell}
          >
            {/* group додано сюди – hover спрацьовує на весь блок */}
            <div className="group w-full bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-5 border border-slate-200 shadow-inner">
              {/* Основний ряд: дата → дзвінок → успіх */}
              <div className="flex items-center justify-center gap-6">
                {/* 27 грудня */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-center min-w-[44px]"
                >
                  <p className="text-2xl font-black text-salina-dark leading-none">
                    27
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                    Dezember
                  </p>
                </motion.div>

                {/* Анімований дзвінок – м'яке коливання + пульсація тіні */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                  }}
                  className="relative flex items-center justify-center"
                >
                  <motion.div
                    animate={{ opacity: [0.15, 0, 0.15] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "easeInOut",
                    }}
                    className="absolute w-10 h-10 bg-salina-orange/20 rounded-full"
                  />
                  <Bell className="w-6 h-6 text-salina-orange relative z-10" />
                </motion.div>

                {/* 1 січня ✓ */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="text-center min-w-[44px]"
                >
                  <p className="text-2xl font-black text-green-600 leading-none">
                    1
                  </p>
                  <p className="text-[10px] text-green-600 font-bold mt-1 leading-tight">
                    Januar ✓
                  </p>
                </motion.div>
              </div>

              {/* Панель дії – з'являється при наведенні на ВСЮ картку (group-hover) */}
              <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden">
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                  <span className="text-[10px] text-slate-500 leading-tight">
                    Automatisch gesendet am{" "}
                    <span className="font-bold text-slate-700">27.12.</span>
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="shrink-0 bg-salina-orange text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-orange-600 transition-colors"
                  >
                    <Send className="w-3 h-3" /> Erneut senden
                  </motion.button>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
