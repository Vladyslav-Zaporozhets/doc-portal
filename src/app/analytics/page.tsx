"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  MapPin,
  Eye,
  ShieldCheck,
  Star,
  Lock,
  UserX,
  TrendingUp,
  Globe,
  Users,
  Mail,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Server,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "local-seo",
    product: "Automatisierte digitale Standortauszeichnung",
    title: "Top-Ranking bei lokaler Suche",
    description:
      "Bei der Skalierung benötigen Sie keine lokalen SEO-Experten. Unsere Architektur generiert vollautomatisch unsichtbare, Google-optimierte Strukturdaten für jeden Standort. Suchen Eltern nach „Salzraum in der Nähe“, liefert der Algorithmus sofort die exakten Koordinaten und Öffnungszeiten Ihrer passenden Filiale.",
    insight:
      "Garantiertes Dominieren in der lokalen Suche (Google Local Pack). Sie erhalten die heißesten Kunden absolut kostenlos und senken so Ihre Ausgaben für bezahlte Werbung radikal (Senkung der CAC auf null).",
  },
  {
    id: "cookie-less",
    product: "Server‑Analytics Matomo (Self‑Hosted)",
    title: "100 % Einblick in Ihre Verkäufe",
    description:
      "In einer Zeit, in der Nutzer massenhaft Cookies ablehnen oder Werbeblocker verwenden, verlieren normale Websites bis zu 60 % ihrer Analysedaten. Die La Salina‑Plattform sammelt Statistiken tief auf ihren eigenen Servern in Deutschland. Alles geschieht absolut anonym und legal, ohne die Nutzer durch das gesamte Internet zu verfolgen.",
    insight:
      "Kristallklare Rentabilitätsberechnung (ROAS). Sie sehen die genaue Anzahl der Verkäufe aus jeder Werbekampagne, selbst wenn der Kunde einen AdBlocker verwendet. Sie investieren Ihr Marketingbudget nur dort, wo es wirklich wirkt.",
  },
  {
    id: "friendly-captcha",
    product: "Bot‑Schutz auf Proof‑of‑Work‑Basis",
    title: "Keine Ampeln und Barrieren",
    description:
      "Wir verzichten für immer auf nervige amerikanische Systeme, die Kunden zwingen, auf verschwommenen Bildern nach „Fußgängerüberwegen“ zu suchen. Unser europäisches Schutzsystem arbeitet unauffällig im Hintergrund und löst komplexe mathematische Aufgaben mit der Rechenleistung des Nutzergeräts in Sekundenbruchteilen.",
    insight:
      "Maximale Conversion in der Bezahlphase (Frictionless Checkout). Kunden, insbesondere gestresste Eltern am Smartphone, brechen den Kauf nicht mehr ab, weil sie den Menschlichkeitstest nicht bestehen können.",
  },
  {
    id: "smart-review",
    product: "Automatisierter Follow‑up mit Negativ‑Abfang",
    title: "Fünf Sterne auf Autopilot",
    description:
      "Auf dem Höhepunkt der positiven Emotionen – zwei Stunden nach dem Besuch – bittet das System automatisch um eine Bewertung. Zufriedene Gäste (4-5 Sterne) werden direkt zu Google geleitet. Kritisches Feedback landet sicher und unsichtbar für die Öffentlichkeit in einem internen Formular.",
    insight:
      "Volle Kontrolle über das öffentliche Image. Sie erhalten kontinuierlich und kostenlos die höchsten Bewertungen für das lokale SEO und lösen gleichzeitig Konflikte mit unzufriedenen Kunden diskret im privaten Raum.",
  },
  {
    id: "tdddg-consent",
    product: "Intelligenter Zustimmungsbanner",
    title: "Privatsphäre, die Vertrauen schafft",
    description:
      "Die deutschen Gesetze verlangen strikt die Zustimmung des Kunden zu jeglichem Tracking. Unser Zustimmungsbanner ist nicht nur zu 100 % legal (mit gleichwertigen „Akzeptieren“‑ und „Ablehnen“‑Schaltflächen), sondern auch visuell makellos. Bis zum Klick auf „Akzeptieren“ blockiert das System algorithmisch und zuverlässig sämtliche externen Skripte.",
    insight:
      "Absolute Immunität gegen Klagen und Abmahnungen. Sie demonstrieren Ihren Kunden den höchsten Standard an Unternehmensethik, ohne „dunkle Muster“ (Dark Patterns) zu verwenden, und stärken so die Premium‑Wahrnehmung Ihrer Marke.",
  },
  {
    id: "dsgvo-delete",
    product: "Selbstbedienung in Datenschutzfragen",
    title: "Volle Kontrolle mit einem Klick",
    description:
      "Wenn ein Kunde beschließt, die Dienste des Unternehmens nicht mehr zu nutzen, muss er keine formellen Briefe an die Rezeption schreiben und die Löschung seiner Daten verlangen. In seinem persönlichen Konto hat er eine Schaltfläche, mit der er sein Profil mit einem Klick selbst anonymisieren kann.",
    insight:
      "Null operative Belastung für das Back‑Office. Das System erfüllt die Anforderungen der europäischen Datenschutzgesetzgebung (Recht auf Löschung) autonom und bewahrt gleichzeitig die entpersonalisierten Finanzberichte, die für das Finanzamt erforderlich sind.",
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
export default function GrowthSEOAnalyticsPage() {
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
              Growth, SEO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                & Analytics
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie Ihre Marke ohne Werbebudget zum lokalen Marktführer wird – und
              warum Ihre Kunden Ihnen freiwillig ihre Daten anvertrauen.
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
                        Growth
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        & SEO
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
                      {/* 1. MapPin (Local SEO) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <MapPin className="w-5 h-5" />
                      </div>
                      {/* 2. Eye (Cookie-less Analytics) - 60° */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Eye className="w-5 h-5" />
                      </div>
                      {/* 3. ShieldCheck (Friendly Captcha) - 120° */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      {/* 4. Star (Smart Routing) - 180° */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <Star className="w-5 h-5" />
                      </div>
                      {/* 5. Lock (TDDDG Consent) - 240° */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <Lock className="w-5 h-5" />
                      </div>
                      {/* 6. UserX (DSGVO Löschung) - 300° */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <UserX className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: Local SEO */}
              {activeSceneId === "local-seo" && (
                <motion.div
                  key="local-seo"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="bg-slate-100 rounded-xl p-3 mb-4 text-sm text-slate-500">
                      🔍 „Salzraum für Kinder in der Nähe“
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white border border-salina-orange/30 rounded-2xl p-4 flex items-center gap-4 shadow-lg"
                    >
                      <MapPin className="w-6 h-6 text-salina-orange" />
                      <div>
                        <p className="font-bold text-salina-dark">
                          La Salina Forchheim
                        </p>
                        <p className="text-xs text-yellow-500">★★★★★ 5.0</p>
                      </div>
                      <button className="ml-auto px-4 py-2 bg-salina-orange text-white rounded-xl text-sm font-bold animate-pulse">
                        Buchen
                      </button>
                    </motion.div>
                    <p className="text-xs text-slate-400 mt-4 text-center">
                      Google Local Pack – Platz 1
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Cookie-less Analytics */}
              {activeSceneId === "cookie-less" && (
                <motion.div
                  key="cookie-less"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-500">
                      <Eye className="w-5 h-5 text-salina-orange" /> Matomo
                      Dashboard
                    </div>
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
                    <div className="mt-4 text-center">
                      <span className="text-xs text-green-600 font-bold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> 100 % der Daten
                        erfasst (trotz AdBlock)
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Friendly Captcha */}
              {activeSceneId === "friendly-captcha" && (
                <motion.div
                  key="friendly-captcha"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-green-500 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-green-700 font-bold">
                      Geprüft – kein Captcha sichtbar
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Benutzer bemerkt nichts
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Smart Review */}
              {activeSceneId === "smart-review" && (
                <motion.div
                  key="smart-review"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex justify-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-8 h-8 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center"
                    >
                      <p className="text-xs text-slate-500">
                        Weiterleitung zu Google
                      </p>
                      <div className="mt-2 bg-blue-500 text-white rounded-xl py-2 px-4 inline-block text-xs font-bold">
                        Bewertung veröffentlichen
                      </div>
                    </motion.div>
                    <p className="text-[10px] text-slate-400 mt-3 text-center">
                      Nur 4–5 Sterne werden öffentlich weitergeleitet
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: TDDDG Consent */}
              {activeSceneId === "tdddg-consent" && (
                <motion.div
                  key="tdddg-consent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                      <p className="text-xs text-slate-600 mb-3">
                        Wir respektieren Ihre Privatsphäre. Bitte wählen Sie:
                      </p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-green-50 border border-green-200 rounded-xl text-xs font-bold text-green-700">
                          Akzeptieren
                        </button>
                        <button className="flex-1 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500">
                          Ablehnen
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-3 text-center">
                      Gleichwertige Schaltflächen – kein Dark Pattern
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 6: DSGVO Löschung */}
              {activeSceneId === "dsgvo-delete" && (
                <motion.div
                  key="dsgvo-delete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 inline-block mb-4">
                      <UserX className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">Profil löschen</p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Daten anonymisiert
                    </motion.div>
                    <p className="text-[10px] text-slate-400 mt-2">
                      Finanzbelege bleiben gesetzeskonform erhalten
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
            Das Marketing‑Cockpit
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese unsichtbaren Mechanismen machen Ihre Marke unverwundbar, Ihre
            Werbung messbar und Ihre Kunden zu freiwilligen Botschaftern.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: True ROAS Dashboard (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Reingewinn‑Analyse (True ROAS Dashboard)"
            description="Die Inhaberin erhält ein Dashboard, das die Server‑Analytics von Matomo mit den realen Verkaufsdaten aus dem Buchungssystem verbindet. Sie sehen nicht nur Klicks, sondern den exakten finanziellen Ertrag jeder einzelnen Werbekampagne auf Instagram oder Google."
            insight="Kristallklare Transparenz der Marketinginvestitionen. Sie verlieren keine Daten durch AdBlocker der Kunden und wissen exakt, welcher Kanal Geld bringt, um Ihr Werbebudget sicher zu skalieren."
            icon={TrendingUp}
          >
            <div className="w-full h-32 relative">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                <motion.path
                  d="M0,80 Q50,60 100,40 T200,20"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="200"
                  cy="20"
                  r="4"
                  fill="#22c55e"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400 px-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mär</span>
                <span>Apr</span>
                <span>Mai</span>
              </div>
              <div className="absolute top-2 right-4 text-green-600 font-bold text-sm">
                ROAS 450 %
              </div>
            </div>
          </BentoCard>

          {/* Блок 2: Master Domain Authority (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Domain‑Synergie (Master Domain Authority)"
            description="Alle neuen Filialen und Franchises werden nicht auf separaten, schwachen Websites, sondern auf der gemeinsamen Unternehmensdomain von La Salina (über Unterverzeichnisse, z. B. /berlin) gehostet."
            insight="Enorme Ersparnis bei der SEO‑Werbung. Jeder neue Standort erbt sofort die Autorität (SEO‑Juice) der Hauptmarke und besetzt vom ersten Tag an die Spitzenplätze in der lokalen Google‑Suche."
            icon={Globe}
          >
            <div className="w-full h-32 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-salina-orange shadow-lg" />
              {[
                { x: 30, y: 40 },
                { x: 70, y: 30 },
                { x: 20, y: 70 },
                { x: 80, y: 60 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.3 }}
                  className="absolute w-4 h-4 rounded-full bg-green-400 shadow-sm"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                />
              ))}
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-500">
                Starke Wurzeln – schnelles Wachstum
              </p>
            </div>
          </BentoCard>

          {/* Блок 3: Zero-Party Data */}
          <BentoCard
            title="Unsichtbare Segmentierung (Zero‑Party Data)"
            description="Die Plattform segmentiert die Datenbank automatisch und legal. Kunden hinterlassen freiwillig ihre Daten (z. B. Geburtsdaten). Das System versieht sie automatisch mit unsichtbaren Verhaltens‑Tags."
            insight="Ihre Kundendatenbank wird zum wertvollsten Aktivposten des Unternehmens, unabhängig von den Algorithmen sozialer Netzwerke. Sie starten hochpräzise, kostenlose E‑Mail‑Kampagnen, die genau ins Ziel treffen und Wiederholungskäufe bringen."
            icon={Users}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-4 h-4 rounded-full bg-slate-300" />
              <div className="w-4 h-4 rounded-full bg-yellow-400" />
              <div className="w-4 h-4 rounded-full bg-blue-400" />
              <div className="w-4 h-4 rounded-full bg-purple-400" />
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Automatische Segmentierung nach Status
            </p>
          </BentoCard>

          {/* Блок 4: Win-Back Campaigns (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Automatische Rückgewinnung (Win‑Back Kampagnen)"
            description="Wenn ein treuer Kunde plötzlich La Salina nicht mehr besucht und länger als 4 Monate ausbleibt, identifiziert das System ihn automatisch als „Schläfer“. Ohne Eingreifen des Marketingteams wird ihm eine fürsorgliche E‑Mail mit einem persönlichen Rabatt für die Rückkehr gesendet."
            insight="Automatische Steigerung des Customer Lifetime Value (LTV). Sie verlieren Kunden nicht für immer; das System arbeitet wie ein unermüdlicher Retention‑Manager und generiert Gewinne aus einer Datenbank, die Sie vielleicht vergessen haben."
            icon={Mail}
          >
            <div className="flex items-center justify-center gap-6 w-full">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-1">
                  <Users className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-xs text-slate-500">Inaktiv (120 Tage)</p>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Mail className="w-6 h-6 text-salina-orange" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-1">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs text-green-700 font-bold">Reaktiviert</p>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 5: Double-Opt-In */}
          <BentoCard
            title="Schutz vor Rechts‑Trollen (Double‑Opt‑In)"
            description="Jede Erfassung von E‑Mail‑Adressen auf der Website durchläuft ein obligatorisches doppeltes Bestätigungsverfahren. Der Kunde muss auf einen Link in einer speziellen E‑Mail klicken, um offiziell in die Mailingliste aufgenommen zu werden."
            insight="100 % kugelsichere juristische Rüstung. Sie sind vollständig vor Bußgeldern von Verbraucherschutzorganisationen geschützt. Alle Marketing‑Zustimmungen sind zuverlässig dokumentiert."
            icon={ShieldCheck}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="text-xs text-slate-500">E‑Mail</div>
              <motion.div
                animate={{ x: [0, 10, 0], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                →
              </motion.div>
              <div className="w-8 h-8 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-xs text-green-700 font-bold">Bestätigt</div>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 text-center">
              Nur verifizierte Adressen gelangen in die Datenbank
            </p>
          </BentoCard>

          {/* Блок 6: API-First */}
          <BentoCard
            title="Offene Automatisierungs‑Architektur (API‑First)"
            description="Die Plattform wird nach dem API‑First‑Prinzip aufgebaut (auf Basis von Strapi CMS und Webhooks). Das bedeutet, dass Ihre Daten niemals in einem System eingesperrt sind. Sie können Analysen problemlos an beliebige moderne BI‑Systeme übergeben."
            insight="Absolute technologische Freiheit. Ihr Unternehmen ist nicht von einem einzigen Entwickler oder Anbieter abhängig. Die Infrastruktur ist bereit für alle zukünftigen Marketing‑Innovationen."
            icon={Server}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="w-10 h-10 rounded-full bg-salina-orange/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-salina-orange" />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.3,
                    }}
                    className="w-3 h-3 rounded-full bg-green-400"
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Daten fließen in jedes beliebige System
            </p>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
