"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  ShieldCheck,
  Settings2,
  Zap,
  Palette,
  GitBranch,
  Cpu,
  Lock,
  Server,
  UserCheck,
  Globe,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Eye,
    TrendingUp,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "eu-hosting",
    product: "EU‑Managed‑Infrastruktur",
    title: "Ihre Daten unter absolutem Schutz",
    description:
      "Der Kern der La Salina‑Plattform wird auf Premium‑Servern des Anbieters Raidboxes ausschließlich in Deutschland gehostet. Wir verzichten bewusst auf amerikanische Transitdienste. Sämtliche Kundendaten, Zeitpläne und Finanzberichte werden lokal in einer vollständig isolierten digitalen Umgebung verarbeitet.",
    insight:
      "100 % Rechtskonformität mit den strengsten Anforderungen der Datenschutzgesetze (DSGVO und TDDDG). Sie erhalten absolute Immunität gegen hohe Bußgelder und garantieren Investoren sowie Kunden höchste Sicherheit.",
  },
  {
    id: "no-code",
    product: "100 % No‑Code‑Paradigma",
    title: "Steuern Sie Ihr Imperium ohne IT‑Abteilung",
    description:
      "Sie müssen nicht mehr auf einen Programmierer warten, um den Ticketpreis zu ändern oder einen neuen Raum hinzuzufügen. Die Basisarchitektur ermöglicht es Ihnen, das gesamte Sortiment, den Zeitplan und die Rabatte über schöne visuelle Oberflächen zu verwalten. Alle komplexen Algorithmen sind tief im Inneren verborgen und lassen Ihnen nur intuitive Schieberegler und Schaltflächen.",
    insight:
      "Enorme Einsparungen beim Betriebsbudget (OPEX). Ihre Ausgaben für den technischen Support der Website sinken auf null. Sie reagieren sofort auf Marktveränderungen und aktualisieren Ihre Angebote in Sekundenschnelle.",
  },
  {
    id: "lightweight",
    product: "Nativer Gutenberg‑Editor & Verzicht auf schwere Builder",
    title: "Seiten, die sofort laden",
    description:
      "Wir verbieten kategorisch den Einsatz schwerer visueller Builder (wie Elementor), die die Website ausbremsen. Die La Salina‑Plattform wird auf einem ultraleichten Premium‑Theme und nativen Blöcken aufgebaut. Dies garantiert blitzschnelle Ladezeiten selbst bei schwachem Mobilfunkempfang des Kunden.",
    insight:
      "Die Geschwindigkeit der Website beeinflusst direkt die Verkäufe. Die sofortige Ladezeit beseitigt Störfaktoren für den Kunden in der Kaufphase (Frictionless Checkout), steigert die Conversion radikal und verbessert Ihre Position bei Google SEO.",
  },
  {
    id: "design-tokens",
    product: "Design‑Kapselung durch globale Variablen",
    title: "Ihr Stil ist immer makellos",
    description:
      "Unabhängig davon, wie viele neue Seiten oder Filialen Sie hinzufügen, der visuelle Stil bleibt stets perfekt. Die Himalaya‑Salz‑Farben, die Firmenschriften und die Button‑Rundungen werden auf Systemebene festgehalten (Design Tokens). Content‑Manager können gar nicht erst versehentlich den falschen Farbton verwenden oder das Layout „zerbrechen“.",
    insight:
      "Garantie für das Premium‑Image des Unternehmens auf nationaler Ebene. Das La Salina‑Netzwerk sieht immer und überall teuer und konsistent aus und schafft so höchstes Vertrauen bei Kunden und Franchise‑Investoren.",
  },
  {
    id: "staging",
    product: "Testen im Schatten (Canary‑Releases)",
    title: "Innovation ohne Verkaufsstopp",
    description:
      "Wenn wir neue Funktionen veröffentlichen, werden Ihre Kunden es nicht einmal bemerken. Alle Updates werden zunächst auf einer vollständig versteckten Kopie der Website (Staging) bereitgestellt. Erst nach perfektem Testen schaltet das System den Datenverkehr sanft auf die neue Version um, ohne eine einzige Sekunde Ausfallzeit (Blue/Green Deployments).",
    insight:
      "Absolute Geschäftskontinuität (Zero‑Downtime). Ihre Website wird niemals wegen eines Updates „down“ sein. Sie akzeptieren rund um die Uhr Online‑Zahlungen, ohne einen einzigen Euro zu verlieren.",
  },
  {
    id: "automator",
    product: "Interne Automatisierung statt externer Dienste",
    title: "Ihr unsichtbarer Betriebs‑Dirigent",
    description:
      "Statt Ihre Daten an angreifbare externe Dienste zu senden, implementieren wir einen lokalen Aufgaben‑Dispatcher (Uncanny Automator). Er verwaltet autonom alle Prozesse innerhalb des Systems: von der Vergabe des VIP‑Status nach Abo‑Zahlung bis zum Routing von Transaktions‑E‑Mails für eine bestimmte Filiale.",
    insight:
      "Sie zahlen keine monatliche Abo‑Gebühr für externe Cloud‑Automatisierungsdienste. Die gesamte Logik arbeitet lokal, blitzschnell und ohne jegliches Risiko, dass vertrauliche Informationen Ihrer Gäste nach außen dringen.",
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
export default function DigitalFoundationPage() {
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
              Digital
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Foundation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie eine hochmoderne Architektur die Stabilität, Sicherheit und
              Flexibilität der gesamten Plattform garantiert – und warum Sie
              sich nie wieder um Technik sorgen müssen.
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
                        Digital
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Foundation
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
                      {/* 1. ShieldCheck (EU Hosting) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      {/* 2. Settings2 (No-Code) - 60° */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Settings2 className="w-5 h-5" />
                      </div>
                      {/* 3. Zap (Lightweight) - 120° */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <Zap className="w-5 h-5" />
                      </div>
                      {/* 4. Palette (Design Tokens) - 180° */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <Palette className="w-5 h-5" />
                      </div>
                      {/* 5. GitBranch (Staging) - 240° */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <GitBranch className="w-5 h-5" />
                      </div>
                      {/* 6. Cpu (Automator) - 300° */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <Cpu className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: EU Sovereign Hosting */}
              {activeSceneId === "eu-hosting" && (
                <motion.div
                  key="eu-hosting"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-4 relative">
                      <ShieldCheck className="w-10 h-10 text-green-600" />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-green-300"
                      />
                    </div>
                    <p className="text-sm font-bold text-salina-dark mb-2">
                      Hosted in Germany
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3 inline-block">
                      <p className="text-xs font-bold text-green-700">
                        DSGVO Approved
                      </p>
                      <p className="text-[10px] text-green-600 mt-1">
                        Keine US‑Datenübermittlung
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: No-Code */}
              {activeSceneId === "no-code" && (
                <motion.div
                  key="no-code"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-bold text-slate-500">
                        Wochenend‑Tarif
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
                    <p className="text-xs text-slate-400 mt-4 text-center">
                      Keine Zeile Code nötig
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Lightweight Frontend */}
              {activeSceneId === "lightweight" && (
                <motion.div
                  key="lightweight"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full -rotate-90"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-salina-dark">
                          100
                        </span>
                        <span className="text-[10px] text-green-600 font-bold">
                          /100
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-green-700">
                      Core Web Vitals
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Bestnoten für SEO
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Design Tokens */}
              {activeSceneId === "design-tokens" && (
                <motion.div
                  key="design-tokens"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <Palette className="w-10 h-10 text-salina-orange mx-auto mb-4" />
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-salina-orange" />
                      <div className="w-8 h-8 rounded-full bg-salina-pink" />
                      <div className="w-8 h-8 rounded-full bg-salina-dark" />
                    </div>
                    <p className="text-xs text-slate-500">
                      Ein Design – alle Filialen perfekt abgestimmt
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: Staging / Blue-Green */}
              {activeSceneId === "staging" && (
                <motion.div
                  key="staging"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center justify-center gap-6 w-full">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 1, 0.5] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          times: [0, 0.2, 0.8, 1],
                        }}
                        className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center"
                      >
                        <GitBranch className="w-8 h-8 text-slate-500" />
                      </motion.div>
                      <motion.div
                        animate={{ x: [0, 0, 0], opacity: [0, 1, 1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          times: [0, 0.2, 0.8, 1],
                        }}
                      >
                        →
                      </motion.div>
                      <motion.div
                        animate={{ opacity: [0, 0.5, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          times: [0, 0.6, 1],
                        }}
                        className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center border-2 border-green-300"
                      >
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </motion.div>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 text-center">
                      Update ohne Ausfallzeit – Besucher merken nichts
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 6: Uncanny Automator */}
              {activeSceneId === "automator" && (
                <motion.div
                  key="automator"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-16 h-16 bg-salina-orange/10 rounded-full flex items-center justify-center"
                      >
                        <Cpu className="w-8 h-8 text-salina-orange" />
                      </motion.div>
                      <motion.div
                        animate={{ x: [-30, 0, 0], opacity: [0, 1, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          delay: 0.5,
                        }}
                        className="absolute left-1/4 top-1/2 -translate-y-1/2"
                      >
                        <Crown className="w-6 h-6 text-yellow-500" />
                      </motion.div>
                      <motion.div
                        animate={{ x: [30, 0, 0], opacity: [0, 1, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                        className="absolute right-1/4 top-1/2 -translate-y-1/2"
                      >
                        <Globe className="w-6 h-6 text-blue-500" />
                      </motion.div>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 text-center">
                      Alles läuft lokal – keine externen Abhängigkeiten
                    </p>
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
            Architektur‑Schutzschild & Stabilität
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese unsichtbaren Sicherheits- und Architektur‑Mechanismen machen
            Ihre Plattform zu einer uneinnehmbaren Festung – Tag und Nacht.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: Custom Hooks Isolation (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Isolation der Geschäftslogik (Custom Hooks)"
            description="Wir werden niemals die Core‑Dateien bearbeiten. Die gesamte spezifische Logik (z. B. Aufsichtspflicht‑Regeln oder komplexe Familienrabatte) wird zuverlässig in isolierten Hooks des Child‑Themes gekapselt."
            insight="Ihr Business‑Portal wird „unzerstörbar“. Sie können alle Plugins und den Core bedenkenlos aktualisieren – Ihre einzigartigen Verkaufsregeln bleiben garantiert erhalten und gehen nie nach einem Update verloren."
            icon={Lock}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-center gap-4">
                <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-xs text-red-600 font-bold">
                  Update
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-xs text-amber-700 font-bold"
                >
                  Child Theme Schutz
                </motion.div>
                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-xs text-green-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Regeln erhalten
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 2: Traffic Shaping (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Lastabwurf (Traffic Shaping)"
            description="Bei großen Werbekampagnen oder Abverkäufen, wenn Tausende von Menschen gleichzeitig auf die Website strömen, nutzt die Serverarchitektur Algorithmen zur Verkehrsglättung (Rate Limiting und Token Bucket)."
            insight="Absolute Stabilität (High Availability). Der Besucheransturm in der Münchner Filiale legt niemals die Kasse in Berlin lahm. Ihr Unternehmen verdient auch in Momenten extremer Nachfrage ununterbrochen Geld."
            icon={Server}
          >
            <div className="w-full h-32 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 flex justify-center gap-1">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, 80, 80] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.1,
                    }}
                    className="w-2 h-2 bg-salina-orange/30 rounded-full"
                  />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/80 backdrop-blur-sm border-t border-slate-200 flex items-center justify-center">
                <p className="text-[10px] text-slate-500 font-bold">
                  Server stabil – Überlast verhindert
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Блок 3: RBAC */}
          <BentoCard
            title="Granulare Zugriffe (RBAC)"
            description="Der Zugriff auf die Systemverwaltung basiert auf präzisen Mikro‑Berechtigungen (Capabilities). Der Administrator einer Filiale erhält ausschließlich Zugriff auf seinen eigenen Zeitplan und kann physisch keine globalen Finanzeinstellungen des Unternehmens öffnen."
            insight="Beseitigung des menschlichen Faktors und von Insider‑Bedrohungen. Sie delegieren Arbeit an Ihr Personal ohne das Risiko, dass jemand versehentlich die Kundendatenbank löscht oder die Preise verfälscht."
            icon={UserCheck}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500">
                  Rolle: Filial‑Admin
                </span>
                <span className="text-xs text-green-600 font-bold">
                  Zugriff erlaubt
                </span>
              </div>
              <div className="space-y-1">
                <div className="h-2 bg-green-100 rounded-full w-full" />
                <div className="h-2 bg-green-100 rounded-full w-3/4" />
                <div className="flex gap-2">
                  <div className="h-2 bg-red-100 rounded-full w-1/2" />
                  <Lock className="w-3 h-3 text-red-400" />
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 4: CDN Anycast (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Intelligentes Routing (CDN Anycast)"
            description="Die statischen Inhalte der Website (Fotos, Schriften) werden auf dem nächstgelegenen Edge‑Server des globalen Netzwerks zwischengespeichert und an den Kunden ausgeliefert."
            insight="Beispiellose Geschwindigkeit für jeden Kunden. Die Seiten laden sofort, halten die Aufmerksamkeit der Besucher und senken die Absprungrate (Bounce Rate) auf ein Minimum, was die Verkäufe direkt steigert."
            icon={Globe}
          >
            <div className="relative w-full h-32 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-salina-orange rounded-full shadow-lg" />
              {[
                { x: "30%", y: "30%" },
                { x: "70%", y: "20%" },
                { x: "20%", y: "70%" },
                { x: "80%", y: "60%" },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-sm"
                  style={{ left: pos.x, top: pos.y }}
                />
              ))}
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">
                Nächster Edge‑Server liefert aus
              </p>
            </div>
          </BentoCard>

          {/* Блок 5: Server Cron */}
          <BentoCard
            title="Hintergrund‑Stabilität (Server‑Cron)"
            description="Wir deaktivieren den unzuverlässigen internen WordPress‑Task‑Scheduler vollständig. Alle Hintergrundprozesse (Berichtserstellung, E‑Mail‑Versand, Stornoprüfungen) werden zuverlässig direkt auf Serverebene gestartet (Raidboxes Dashboard Cron)."
            insight="Pünktlichkeit und Präzision. Ihre Kunden erhalten die Besuchserinnerung exakt 24 Stunden vorher, und die Steuerberichte werden ohne Verzögerung erstellt – das garantiert perfekte Betriebsdisziplin."
            icon={Clock}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="w-16 h-16 rounded-full border-2 border-salina-orange/30 flex items-center justify-center mx-auto"
            >
              <Clock className="w-8 h-8 text-salina-orange" />
            </motion.div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Alle Jobs starten pünktlich
            </p>
          </BentoCard>

          {/* Блок 6: URL Routing */}
          <BentoCard
            title="Physisches URL‑Routing"
            description="Wir verzichten auf instabile Cookies für die Filialumschaltung. Jeder Standort erhält seine eigene, klare, physische Seite (z. B. /munich/booking/), auf der alle Leistungen architektonisch verankert sind."
            insight="Perfektes lokales SEO und null Konflikte im Warenkorb. Sie dominieren garantiert die Google‑Ergebnisse in jeder Stadt, und Kunden buchen niemals versehentlich eine Leistung in der falschen Filiale aufgrund eines Caching‑Fehlers."
            icon={MapPin}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <Globe className="w-4 h-4" /> lasalina.de
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs font-bold text-salina-orange font-mono"
              >
                /berlin/booking/
              </motion.div>
              <div className="mt-2 bg-white rounded-lg p-2 border border-slate-100">
                <p className="text-[10px] text-slate-400">
                  Nur Berlin‑Inhalte werden geladen
                </p>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
