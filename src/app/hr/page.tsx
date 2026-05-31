"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  MapPin,
  Smartphone,
  Lock,
  RefreshCw,
  Users,
  TrendingUp,
  ShieldCheck,
  CalendarClock,
  FileText,
  Download,
  UserPlus,
  UserX,
  ClipboardCheck,
  HeartPulse,
  GaugeCircle,
  PiggyBank,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  Bell,
  FileSpreadsheet,
  Globe,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "geofencing",
    product: "Mobile Zeiterfassung & Kiosk‑Modus",
    title: "Manipulationssichere Zeiterfassung",
    description:
      "Die Ära der Stundenzettel ist vorbei. Der Schichtbeginn lässt sich bequem per Smartphone erfassen, sobald das GPS den Mitarbeiter im 50-Meter-Radius der Filiale bestätigt. Am Tablet der Rezeption sorgt ein persönlicher PIN-Code samt unauffälliger Foto-Verifizierung dafür, dass niemand für Kollegen einstempelt.",
    insight:
      "Absolute Rechtssicherheit und Ersparnis. Sie erhalten ein makelloses, digital verifiziertes Arbeitszeitkonto, das auch der strengsten Prüfung durch das Finanzamt oder den Zoll standhält und das Risiko hoher Bußgelder eliminiert.",
  },
  {
    id: "shift-swap",
    product: "Algorithmischer Schichttausch",
    title: "Intelligente interne Schichtbörse",
    description:
      "Fällt ein Mitarbeiter spontan aus, muss der Manager nicht mehr das gesamte Personal abtelefonieren. Ein Klick auf „Schicht abgeben“ in der App genügt: Der Algorithmus filtert Kollegen mit passender Qualifikation und sendet eine Push-Anfrage. Wer zuerst annimmt, rettet die Schicht.",
    insight:
      "Betriebsstabilität ohne Stress. Der Plan aktualisiert sich automatisch, die Schicht ist garantiert von einem qualifizierten Mitarbeiter besetzt, und der Manager erhält lediglich eine beruhigende Benachrichtigung über den erfolgreichen Tausch – das spart Nerven und Zeit.",
  },
  {
    id: "demand-driven",
    product: "Auslastungsabhängige Personalplanung",
    title: "Personal nur bei echtem Bedarf",
    description:
      "Der Manager erstellt den Plan nicht mehr blind. Der Arbeitskalender des Personals wird nahtlos mit der Kundenbasis verbunden. Sind am Samstag um 14:00 Uhr alle Räume ausverkauft, hebt das System diesen Slot automatisch hervor und signalisiert, dass für die Vollbelegung eine zusätzliche Kraft benötigt wird.",
    insight:
      "Maximale Optimierung der Lohnkosten (OPEX). Sie zahlen niemals zu viel für zusätzliches Personal, wenn der Saal leer ist, und garantieren gleichzeitig einen erstklassigen, schnellen Service, indem Sie in den Stoßzeiten Verstärkung bereitstellen.",
  },
  {
    id: "minijob-guard",
    product: "538‑€‑Minijob‑Schutz",
    title: "Schutz vor steuerlichen Überraschungen",
    description:
      "In Deutschland darf ein Minijobber nicht mehr als 538 € verdienen. Bereits 1 € mehr führt sofort zu einem anderen Steuerstatus. Unser System berechnet fortlaufend das voraussichtliche Einkommen der Studenten. Würde eine neue Schicht mathematisch zur Überschreitung des Limits führen, blockiert das System diese Zuweisung hart.",
    insight:
      "Granitharter Finanzschutz. Ihr Unternehmen ist gegen die plötzliche Notwendigkeit abgesichert, hohe ungeplante Sozialabgaben allein aufgrund der Unachtsamkeit eines Managers bei der Planerstellung zahlen zu müssen.",
  },
  {
    id: "arbzg",
    product: "Automatische Pausen‑ & Ruhezeitkontrolle",
    title: "Makellose Einhaltung des Arbeitsrechts",
    description:
      "Die Algorithmen der Plattform arbeiten wie Ihr persönlicher Anwalt. Arbeitet eine Studentin eine intensive 7‑Stunden‑Schicht und vergisst, eine Pause zu buchen, zieht das System automatisch die gesetzlich vorgeschriebenen 30 Minuten Ruhezeit von ihrer bezahlten Zeit ab. Ebenso verhindert das System, einen Mitarbeiter für die Frühschicht einzuteilen, wenn seit seiner Spätschicht weniger als 11 Stunden vergangen sind.",
    insight:
      "Vollständige Indulgenz gegenüber den Prüfbehörden. Die Geschäftsinhaberin ist zu 100 % vor dem Vorwurf der Verletzung von Arbeitnehmerrechten geschützt. Alle Systemlogs belegen, dass das Unternehmen die Erholungszeiten des Personals zwingend gewährleistet.",
  },
  {
    id: "datev-hr",
    product: "Automatisierte Lohnabrechnung",
    title: "Gehälter, die sich selbst berechnen",
    description:
      "Am letzten Tag des Monats müssen Sie die Stunden nicht mehr manuell konsolidieren, Verspätungen herausrechnen oder Nachtzuschläge in komplizierten Tabellen kalkulieren. Die Geschäftsinhaberin drückt einfach eine Taste, und das System erstellt eine perfekt strukturierte, verschlüsselte Datei für die Gehaltsabrechnung.",
    insight:
      "Null Fehler in der Lohnbuchhaltung. Die Datei ist vollständig für den Export in das System DATEV LODAS vorbereitet. Das spart monatlich bis zu 10 Stunden manuelle Arbeit und senkt Ihre Kosten für den Steuerberater radikal.",
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
      className="h-dvh w-full snap-center flex flex-col justify-center p-6 lg:p-16 relative"
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
export default function HRWorkforcePage() {
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
              HR, Workforce &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Compliance
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie aus chaotischer Personaleinsatzplanung ein präzises,
              rechtskonformes System wird – und warum Ihre Mitarbeiter die neue
              App lieben werden.
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
                        HR &
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Workforce
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

                    {/* Зовнішня орбіта (6 Іконок) */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                      }}
                      className="absolute inset-[-70px] border border-slate-200 rounded-full"
                    >
                      {/* 1. MapPin (Geofencing) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <MapPin className="w-5 h-5" />
                      </div>

                      {/* 2. RefreshCw (Shift Swap) - Справа зверху (60°) */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <RefreshCw className="w-5 h-5" />
                      </div>

                      {/* 3. TrendingUp (Demand-Driven) - Справа знизу (120°) */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <TrendingUp className="w-5 h-5" />
                      </div>

                      {/* 4. ShieldCheck (Minijob Guard) - Знизу (180°) */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <ShieldCheck className="w-5 h-5" />
                      </div>

                      {/* 5. Clock (ArbZG) - Зліва знизу (240°) */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <Clock className="w-5 h-5" />
                      </div>

                      {/* 6. FileText (DATEV Export) - Зліва зверху (300°) */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <FileText className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: Geofencing */}
              {activeSceneId === "geofencing" && (
                <motion.div
                  key="geofencing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2rem] p-6 shadow-lg text-center">
                      <MapPin className="w-8 h-8 text-salina-orange mx-auto mb-3" />
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 relative">
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute inset-0 rounded-full border-2 border-green-400"
                        />
                        <span className="text-2xl">📍</span>
                      </div>
                      <p className="text-xs text-green-700 font-bold">
                        Im Umkreis von 50 m
                      </p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2rem] p-6 shadow-lg text-center">
                      <Lock className="w-8 h-8 text-salina-orange mx-auto mb-3" />
                      <div className="text-2xl font-black text-salina-dark mb-2">
                        ••••
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-xs font-bold text-green-700 inline-block"
                      >
                        Schicht gestartet 09:00
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Shift Swap */}
              {activeSceneId === "shift-swap" && (
                <motion.div
                  key="shift-swap"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <RefreshCw className="w-10 h-10 text-salina-orange mx-auto mb-4" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-salina-orange/10 border border-salina-orange/20 rounded-2xl p-4 mb-4"
                    >
                      <p className="text-sm font-bold text-salina-dark">
                        Freie Schicht morgen
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        60 € extra verdienen?
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Schicht übernommen
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Demand-Driven */}
              {activeSceneId === "demand-driven" && (
                <motion.div
                  key="demand-driven"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          time: "12:00",
                          count: 2,
                          color: "bg-green-50 border-green-200",
                          text: "OK",
                        },
                        {
                          time: "14:00",
                          count: 1,
                          color: "bg-red-50 border-red-200",
                          text: "+1 nötig",
                          pulse: true,
                        },
                        {
                          time: "16:00",
                          count: 3,
                          color: "bg-green-50 border-green-200",
                          text: "Optimal",
                        },
                      ].map((slot) => (
                        <motion.div
                          key={slot.time}
                          animate={slot.pulse ? { scale: [1, 1.03, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className={cn(
                            "p-4 rounded-2xl border text-center font-bold text-sm",
                            slot.color,
                          )}
                        >
                          {slot.time}
                          <span className="block text-[10px] mt-1">
                            {slot.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Minijob Guard */}
              {activeSceneId === "minijob-guard" && (
                <motion.div
                  key="minijob-guard"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <div className="text-xs text-slate-500 mb-2">
                      Verdienstgrenze
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "99%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-red-500 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mb-4">
                      <span>0 €</span>
                      <span>538 €</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-xs font-bold text-red-700 inline-flex items-center gap-2"
                    >
                      🚫 Limit erreicht – Schicht blockiert
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: ArbZG */}
              {activeSceneId === "arbzg" && (
                <motion.div
                  key="arbzg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <Clock className="w-10 h-10 text-salina-orange mx-auto mb-4" />
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 inline-block">
                      <p className="text-sm font-bold text-salina-dark">
                        7 Std. Schicht
                      </p>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ delay: 0.5 }}
                        className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-2 text-xs text-amber-700"
                      >
                        –30 Min. gesetzliche Pause
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="mt-4 text-green-600 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" /> ArbZG konform
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 6: DATEV Export */}
              {activeSceneId === "datev-hr" && (
                <motion.div
                  key="datev-hr"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <button className="px-8 py-4 bg-salina-orange text-white rounded-2xl font-bold text-lg shadow-lg mb-6">
                      An DATEV senden
                    </button>
                    <div className="flex justify-center gap-3">
                      {["🕒", "🏥", "🎉"].map((icon, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -10, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: i * 0.3,
                          }}
                          className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-2xl"
                        >
                          {icon}
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-3 inline-block"
                    >
                      <p className="text-sm font-bold text-green-700 flex items-center gap-1">
                        <Download className="w-4 h-4" /> DATEV‑Export bereit
                      </p>
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
            Das HR‑Cockpit
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese Werkzeuge machen Ihre Personalverwaltung effizient,
            rechtskonform und bereit für schnelles Wachstum – ohne zusätzliche
            Kopfschmerzen.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: 1-Click Onboarding (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Nahtloses Onboarding (1‑Klick)"
            description="Wenn Sie einen neuen Mitarbeiter einstellen, geben Sie einfach seine Basisdaten ein. Das System erstellt automatisch einen eingeschränkten Account, generiert einen API‑Token für das Kassensystem ready2order, erstellt eine Firmen‑E‑Mail und versendet eine Willkommens‑E‑Mail mit allen Anweisungen."
            insight="Sofortige Bereitstellung des Arbeitsplatzes. Sie verschwenden keine Zeit mit der manuellen Einrichtung von Servern, Zugängen und Datenbanken. Der Neue erhält alles, was er für die Arbeit braucht, in Sekunden – völlig ohne IT‑Spezialisten."
            icon={UserPlus}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <button className="px-4 py-2 bg-salina-dark text-white rounded-xl text-sm font-bold">
                + Profil erstellen
              </button>
              <div className="flex gap-3">
                {[
                  {
                    icon: Globe,
                    color: "bg-blue-50",
                    textColor: "text-blue-500",
                  },
                  {
                    icon: CreditCard,
                    color: "bg-emerald-50",
                    textColor: "text-emerald-500",
                  },
                  {
                    icon: CalendarClock,
                    color: "bg-purple-50",
                    textColor: "text-purple-500",
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
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      item.color,
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", item.textColor)} />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Блок 2: Kill-Switch (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Protokoll „Kill‑Switch“ (Sofort‑Sperrung)"
            description="Wenn ein Mitarbeiter ausscheidet, drückt die Inhaberin nur eine Deaktivierungstaste. In weniger als einer Sekunde löscht der Algorithmus seinen Zugang zum Admin‑Panel, entfernt unwiderruflich den PIN‑Code im Fiskalsystem und sperrt die E‑Mail."
            insight="Beseitigung von Insider‑Cyberrisiken (Zero Trust). Kein ehemaliger, emotional instabiler Mitarbeiter kann die La Salina‑Kundendatenbank stehlen oder eine falsche Rückerstattung an der Kasse vornehmen. Ihr Geschäftsgeheimnis ist absolut geschützt."
            icon={UserX}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full bg-red-50 rounded-2xl p-4 border border-red-200 text-center cursor-pointer"
            >
              <p className="text-sm font-bold text-red-700 mb-2">
                Profil deaktivieren
              </p>
              <div className="flex justify-center gap-3">
                {[Lock, Lock, Lock].map((Icon, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.3 }}
                    className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"
                  >
                    <Icon className="w-4 h-4 text-red-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </BentoCard>

          {/* Блок 3: Skill-Based Routing */}
          <BentoCard
            title="Qualifikations‑Matrix (Skill‑Routing)"
            description="Das System versieht Mitarbeiter mit speziellen Kompetenz‑Tags (z. B. „Kassierer“ oder „Ersthelfer“). Der Algorithmus verhindert das Speichern des Plans, wenn keine Person mit den obligatorischen Zertifikaten in der Schicht ist."
            insight="Garantierte Betriebssicherheit. Sie sind stets sicher, dass der Standort legal arbeitet und in der Schicht garantiert eine kompetente Person anwesend ist, die Erste Hilfe leisten oder mit Finanzen umgehen kann."
            icon={ClipboardCheck}
          >
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2 py-1 bg-green-50 border border-green-200 rounded-lg text-green-700 font-bold">
                Ersthelfer
              </span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-slate-500">Plan freigegeben</span>
            </div>
          </BentoCard>

          {/* Блок 4: eAU & Rote Karte (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Digitale Personalakte (eAU & Rote Karte)"
            description="Alle medizinischen Bescheinigungen und Hygiene‑Zulassungen des Personals (IfSG) werden in einer geschützten digitalen Akte gespeichert. Krankmeldungen (eAU) werden automatisch vom Steuerberater direkt bei der Krankenkasse abgerufen."
            insight="Null Papier‑Bürokratie. Sie müssen keine „gelben Scheine“ mehr sammeln. Dank der systemseitigen Erinnerungen 30 Tage vor Ablauf der Hygiene‑Zulassungen erhalten Sie niemals ein Bußgeld vom Gesundheitsamt."
            icon={HeartPulse}
          >
            <div className="flex items-center justify-center gap-6 w-full">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-2">
                  <HeartPulse className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-xs text-slate-500">Rote Karte</p>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Bell className="w-6 h-6 text-amber-500" />
              </motion.div>
              <div className="text-center">
                <p className="text-2xl font-black text-amber-500">30</p>
                <p className="text-xs text-slate-500">Tage bis Ablauf</p>
              </div>
            </div>
          </BentoCard>

          {/* Блок 5: Predictive Availability */}
          <BentoCard
            title="Prädiktive Verfügbarkeit (Heatmap)"
            description="Bis zum 15. eines jeden Monats versendet das System automatisch Push‑Nachrichten an die Studenten mit der Bitte, ihre Verfügbarkeit für den Folgemonat anzugeben."
            insight="Maximaler Komfort für den Manager. Sie müssen Wünsche nicht mehr manuell über Chats sammeln. Das System erstellt selbstständig eine visuelle „Heatmap“ der Personalverfügbarkeit und macht die Planung intuitiv und schnell."
            icon={GaugeCircle}
          >
            <div className="flex items-center gap-1 w-full h-8 rounded-lg overflow-hidden">
              {[30, 60, 90, 50, 80, 40, 70].map((v, i) => (
                <div
                  key={i}
                  className="flex-1 h-full rounded-sm"
                  style={{
                    backgroundColor: `rgba(251, 146, 60, ${v / 100})`,
                  }}
                />
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-center">
              Grün = viele frei · Orange = knapp
            </p>
          </BentoCard>

          {/* Блок 6: Überstundenkonto */}
          <BentoCard
            title="Virtuelle Stundenbank (Überstundenkonto)"
            description="„Überschüssige“ Minuten oder Minderstunden des Personals werden automatisch auf einem individuellen Konto kumuliert. Arbeit an Feiertagen und Sonntagen wird vom System ebenfalls automatisch für die Berechnung der steuerfreien Zuschläge markiert."
            insight="Transparente Abrechnung und Team‑Motivation. Sie sparen Überstundenzahlungen, indem Sie sie durch bezahlte Freizeit ausgleichen. Jeder Mitarbeiter sieht eine faire Abrechnung seiner Arbeit, was Sie zu einem Premium‑Arbeitgeber macht."
            icon={PiggyBank}
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-4xl mb-2"
              >
                🪙
              </motion.div>
              <p className="text-xs text-salina-orange font-bold">
                + Zuschlag gespeichert
              </p>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
