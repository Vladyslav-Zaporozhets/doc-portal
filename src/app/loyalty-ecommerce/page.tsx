"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  Crown,
  Ticket,
  Gift,
  Heart,
  CreditCard,
  Repeat,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wallet,
  TrendingUp,
  Mail,
  CheckCircle2,
  Pause,
  TicketCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "salinapass",
    product: "Monatliches Abo (Salinapass)",
    title: "Das Gefühl grenzenlosen Zugangs",
    description:
      "Wir schaffen einen exklusiven Premium‑Club für Ihre besten Kunden. Mit dem Abonnement erhält der Gast eine digitale goldene Krone. Das System erkennt ihn bei jeder neuen Buchung sofort – ohne erneute Karteneingabe oder Bankbestätigung. Der Preis verschwindet einfach, und die Buchung wird mit einem Fingertipp bestätigt.",
    insight:
      "Die Magie des «Null‑Checkouts». Kunden buchen häufiger und spontaner, wenn die Zahlungsbarriere nach dem ersten Kauf für immer verschwindet.",
  },
  {
    id: "10er-karte",
    product: "Mehrfach‑Paket (10er‑Karte)",
    title: "Das Ende der verlorenen Papierkarten",
    description:
      "Nie wieder Stempelkarten aus Papier. Der Kunde kauft ein Paket mit 10 Besuchen und sieht einen schönen digitalen Zähler auf seinem Smartphone. Dieses Guthaben lässt sich sogar teilen: Bringt die Oma das Kind zur Session, zieht die Rezeption einfach einen Besuch vom virtuellen Konto der Mutter ab – ohne Suchen nach Tickets oder Geldbörsen.",
    insight:
      "Familien‑Sharing stärkt die Bindung, denn das gesamte Umfeld des Käufers wird mit dem Produkt vertraut. Gleichzeitig entfällt der Verwaltungsaufwand für physische Karten.",
  },
  {
    id: "gutscheine",
    product: "Geschenkgutscheine (Wertgutscheine)",
    title: "Das perfekte Last‑Minute‑Geschenk",
    description:
      "Ihre Kunden können luxuriöse digitale Gutscheine direkt auf der Website kaufen. Die größte Magie ist die zeitversetzte Zustellung: Ein heute gekaufter Gutschein kann exakt um 09:00 Uhr am Geburtstag des Empfängers in dessen Postfach landen. Bleibt nach dem Einlösen ein Restguthaben, bewahrt das System es automatisch für den nächsten Besuch auf.",
    insight:
      "Geschenkgutscheine generieren sofortigen Cashflow – oft Wochen oder Monate, bevor die Leistung tatsächlich erbracht wird. Und das Restguthaben garantiert einen Wiederbesuch.",
  },
  {
    id: "empfehlung",
    product: "Empfehlungsprogramm (Affiliate)",
    title: "Ihre kostenlose Werbeagentur",
    description:
      "Wir machen aus zufriedenen Kunden messbare Botschafter. Eine Kundin teilt ihren persönlichen Promo‑Code mit einer Freundin. Die Freundin erhält einen Rabatt auf ihren ersten Besuch, und die Kundin bekommt automatisch virtuelle Euro auf ihr Kundenkonto gutgeschrieben – ein starker Anreiz, wieder zu kommen.",
    insight:
      "Empfehlungsmarketing senkt die Kosten für Neukundengewinnung drastisch. Gleichzeitig steigt der Lifetime Value der Bestandskunden, da sie für wiederholte Besuche belohnt werden.",
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
// КОМПОНЕНТ BENTOCARD (біла картка для світлої теми)
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
export default function LoyaltyEcommercePage() {
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink">
              <span className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-salina-dark">
                Loyalty &
              </span>
              <br />
              E‑Commerce
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie aus einmaligen Gästen eine treue Community wird – und wie
              digitale Produkte ganz nebenbei für stetigen Umsatz sorgen.
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
                {/* Додаємо відображення продукту */}
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
                        Loyalty &
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        E‑Commerce
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

                    {/* Зовнішня орбіта (6 Іконок етапів) */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                      }}
                      className="absolute inset-[-70px] border border-slate-200 rounded-full"
                    >
                      {/* 1. Crown (VIP) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Crown className="w-5 h-5" />
                      </div>

                      {/* 2. Ticket (10er‑Karte) - Справа зверху (60°) */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Ticket className="w-5 h-5" />
                      </div>

                      {/* 3. Gift (Geschenke) - Справа знизу (120°) */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <Gift className="w-5 h-5" />
                      </div>

                      {/* 4. Heart (Loyalty) - Знизу (180°) */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <Heart className="w-5 h-5" />
                      </div>

                      {/* 5. Repeat (Smart Refund) - Зліва знизу (240°) */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <Repeat className="w-5 h-5" />
                      </div>

                      {/* 6. Users (Empfehlung) - Зліва зверху (300°) */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <Users className="w-5 h-5" />
                      </div>

                      {/* Ефект "Потоку клієнтів" (Сяюча крапка) */}
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

              {/* ВІЗУАЛ 1: Salinapass */}
              {activeSceneId === "salinapass" && (
                <motion.div
                  key="salinapass"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Crown className="w-6 h-6 text-salina-orange" />
                      <span className="text-sm font-bold text-slate-500">
                        VIP‑Status aktiv
                      </span>
                    </div>
                    <div className="relative h-24 flex items-center justify-center mb-6">
                      <motion.span
                        initial={{ opacity: 1 }}
                        animate={{
                          opacity: 0,
                          textDecoration: "line-through",
                          y: -20,
                          scale: 0.7,
                        }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="text-4xl font-black text-slate-300 absolute"
                      >
                        12,50 €
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 1.3,
                          duration: 0.5,
                          type: "spring",
                        }}
                        className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink absolute"
                      >
                        0,00 €
                      </motion.span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-bold"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Besuch bestätigt
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: 10er‑Karte */}
              {activeSceneId === "10er-karte" && (
                <motion.div
                  key="10er-karte"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <h3 className="font-black text-salina-dark mb-4">
                      10er‑Karte
                    </h3>
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <svg
                        className="w-32 h-32 -rotate-90"
                        viewBox="0 0 100 100"
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
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 0 }}
                          animate={{ strokeDashoffset: 85 }}
                          transition={{ delay: 0.5, duration: 1 }}
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#fb923c" />
                            <stop offset="100%" stopColor="#f472b6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                          key="count"
                          initial={{ scale: 1.2, color: "#fb923c" }}
                          animate={{ scale: 1, color: "#0f172a" }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                          className="text-4xl font-black"
                        >
                          7
                        </motion.span>
                        <span className="text-sm text-slate-400">/10</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">
                      1 Session für Oma abgebucht
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Gutscheine */}
              {activeSceneId === "gutscheine" && (
                <motion.div
                  key="gutscheine"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <Gift className="w-12 h-12 text-salina-orange mx-auto mb-4" />
                    <p className="text-sm font-bold text-salina-dark mb-2">
                      Geschenkgutschein
                    </p>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-2xl font-black text-slate-300 line-through">
                        50,00 €
                      </span>
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="bg-green-50 border border-green-200 rounded-xl px-3 py-1 text-green-700 text-xs font-bold"
                      >
                        Restguthaben 20,00 €
                      </motion.div>
                    </div>
                    <p className="text-xs text-slate-500">
                      Zustellung: 24. Dez., 09:00 Uhr
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Empfehlung */}
              {activeSceneId === "empfehlung" && (
                <motion.div
                  key="empfehlung"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                        <p className="text-xs text-slate-500 mb-2">
                          Freundin (Gast)
                        </p>
                        <div className="text-lg font-black text-salina-dark">
                          –15 %
                        </div>
                        <p className="text-[10px] text-green-600 mt-1">
                          Code HANNA15
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                        <p className="text-xs text-slate-500 mb-2">
                          Hanna (Botschafterin)
                        </p>
                        <motion.div
                          initial={{ scale: 1.2, color: "#fb923c" }}
                          animate={{ scale: 1, color: "#0f172a" }}
                          transition={{ delay: 1, duration: 0.5 }}
                          className="text-lg font-black text-salina-dark"
                        >
                          + 10,00 €
                        </motion.div>
                        <p className="text-[10px] text-amber-600 mt-1">
                          Guthaben
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-xs text-slate-400">
                      Cookie‑less Tracking – 100 % DSGVO‑konform
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
            Das Loyalty‑Cockpit
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese unsichtbaren Mechanismen sorgen für wiederkehrende Umsätze,
            schützen Ihre Erträge und machen aus Kunden eine Community.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: Salinapass Dashboard (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Garantierter Monatsumsatz (Salinapass Dashboard)"
            description="Sie sehen auf einen Blick, wie viele Abos aktiv sind. Die Gebühren werden jeden Monat automatisch von den Karten der Kunden abgebucht – ohne Ihr Zutun."
            insight="Ein verlässlicher Grundumsatz (MRR) am ersten jedes Monats. Unabhängig von Saison oder Ferien – Ihr Business bleibt stabil und planbar."
            icon={TrendingUp}
          >
            <div className="w-full h-32 relative">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                <motion.path
                  d="M0,80 Q50,60 100,40 T200,20"
                  fill="none"
                  stroke="#fb923c"
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
                  fill="#fb923c"
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
            </div>
          </BentoCard>

          {/* Блок 2: Auto‑Dunning (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Sanfte Zahlungserinnerungen (Auto‑Dunning)"
            description="Läuft eine Karte ab oder ist sie nicht gedeckt, kündigt das System nicht sofort. Es sendet eine Reihe freundlicher Erinnerungen mit der Bitte, die Karte mit einem Klick zu aktualisieren."
            insight="Kein Stress für Ihr Team. Das System holt bis zu 60 % der scheinbar verlorenen Abonnements automatisch zurück, wahrt die Würde Ihrer Gäste und schützt Ihren Umsatz."
            icon={Mail}
          >
            <div className="space-y-3 w-full">
              <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-salina-dark">
                    Zahlung fehlgeschlagen
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Karte aktualisieren
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Mail className="w-6 h-6 text-salina-orange mx-auto" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex items-center gap-3 bg-green-50 rounded-xl p-3 border border-green-100"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-700">Bezahlt</p>
                  <p className="text-[10px] text-green-600">Abonnement aktiv</p>
                </div>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 3: Smart Refunds */}
          <BentoCard
            title="Intelligente Rückerstattungen (Smart Refunds)"
            description="Storniert ein Gast mit einer 10er‑Karte rechtzeitig, gibt es kein Geld zurück. Das System schreibt einfach eine virtuelle Session auf sein Konto gut."
            insight="Das Geld bleibt auf Ihrem Konto (Cashflow geschützt). Sie sparen zudem die Bankgebühren für Rückerstattungen."
            icon={Repeat}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="text-center">
                <p className="text-2xl font-black text-salina-dark">5</p>
                <p className="text-xs text-slate-500">Sessions</p>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <TicketCheck className="w-6 h-6 text-salina-orange" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <p className="text-2xl font-black text-green-600">6</p>
                <p className="text-xs text-green-600">Sessions</p>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 4: Cookie‑less Tracking (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Datenschutz‑konformes Empfehlungsmarketing"
            description="Ohne Cookies, ohne Tracking – rein über persönliche Promo‑Codes. Kunden teilen ihren Code, Freunde erhalten Rabatt, und der Werber bekommt virtuelles Guthaben."
            insight="100 % immun gegen AdBlocker und DSGVO‑Strafen. Sie erhalten kostenlose Neukunden bei null Risiko."
            icon={ShieldCheck}
          >
            <div className="flex items-center justify-center gap-6 w-full">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                <span className="text-sm font-mono font-black text-salina-dark">
                  HANNA15
                </span>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                →
              </motion.div>
              <div className="flex gap-3">
                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-green-700 text-sm font-bold">
                  –15 % Rabatt
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-amber-700 text-sm font-bold">
                  +10 € Guthaben
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 5: Restguthaben */}
          <BentoCard
            title="Restguthaben als Wiederkomm‑Garant"
            description="Löst ein Gast einen 100‑€‑Gutschein für eine 40‑€‑Leistung ein, bleiben 60 € als Guthaben gespeichert. Das Geld verfällt nicht, sondern motiviert zum nächsten Besuch."
            insight="Gesetzlich konform (3 Jahre Gültigkeit) und zugleich ein starker psychologischer Anker für Wiederbesuche – oft mit Zusatzkäufen."
            icon={Wallet}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-4xl text-center"
            >
              🪙
            </motion.div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs text-slate-400">100 €</span>
              <span className="text-xs text-salina-orange font-bold">
                → 40 € bezahlt
              </span>
              <span className="text-xs text-green-600 font-bold">
                60 € gespeichert
              </span>
            </div>
          </BentoCard>

          {/* Блок 6: Abo‑Pause */}
          <BentoCard
            title="Pause statt Kündigung (Abo‑Hold)"
            description="Fährt die Familie in den Urlaub, kann das Abo einfach pausiert werden. Kein Grund zur Kündigung – nach der Pause läuft die Mitgliedschaft automatisch weiter."
            insight="Psychologisch viel leichter als eine Kündigung. Kunden bleiben erhalten und kehren nach dem Urlaub selbstständig zurück – ohne manuelles Eingreifen."
            icon={Pause}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                <p className="text-xs font-bold text-green-700">Salinapass</p>
                <p className="text-xs text-green-600">Aktiv</p>
              </div>
              <motion.div
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  times: [0, 0.3, 0.7, 1],
                }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center"
              >
                <p className="text-xs font-bold text-slate-500">Salinapass</p>
                <p className="text-xs text-slate-400">Pausiert (30 Tage)</p>
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-1 bg-salina-orange/30 rounded-full mt-2 overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="h-full w-1/3 bg-salina-orange rounded-full"
                  />
                </motion.div>
              </motion.div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
