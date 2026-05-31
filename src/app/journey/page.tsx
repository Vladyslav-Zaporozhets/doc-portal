"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  Clock,
  Users,
  UserCircle,
  Crown,
  Wallet,
  MessageCircle,
  ShieldCheck,
  Coffee,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Share2,
  Gift,
  Bot,
  HeartPulse,
  Ticket,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ДАНІ СЦЕН ---
const SCENES = [
  {
    id: "fomo",
    title: "Psychologie der Knappheit",
    description:
      "Wir haben den langweiligen Zeitplan durch eine interaktive «Ampel» ersetzt. Wenn die Plätze knapp werden, ändern die Slots ihre Farbe. Dies erzeugt auf natürliche Weise ein Gefühl der Dringlichkeit (FOMO) und beschleunigt die Kaufentscheidung um 40%, ganz ohne Druck.",
    insight:
      "Garantierte frühzeitige Auslastung der Räume. Und falls keine Plätze mehr frei sind, trägt sich der Kunde mit einem Klick in die Warteliste ein.",
  },
  {
    id: "smart-cart",
    title: "Unsichtbare Sicherheit & Cross-Sell",
    description:
      "Das Frontend agiert wie ein unsichtbarer Jurist. Es blockiert algorithmisch Transaktionen mit Kindern ohne begleitende Erwachsene (Aufsichtspflicht). Sobald diese Regel erfüllt ist, bietet das System organisch eine Auszeit für die Eltern an.",
    insight:
      "Absoluter Schutz vor Strafen und eine automatische Steigerung des durchschnittlichen Warenkorbwerts (AOV) um 15-25% durch den Verkauf von Eltern-Lounge-Zugängen.",
  },
  {
    id: "guest-checkout",
    title: "Geschwindigkeit ohne Barrieren",
    description:
      "Zwangsregistrierungen vor dem Kauf «töten» bis zu 35% der Conversion. Wir haben einen Guest-First Checkout implementiert. Der Kunde gibt nur Name, E-Mail und Telefonnummer an. Ein Account wird im Hintergrund automatisch erstellt, völlig reibungslos für den Gast.",
    insight:
      "Der Kunde kauft sein Ticket schneller, als er darüber nachdenken kann. Dies senkt die Zahl der abgebrochenen Warenkörbe fast auf null.",
  },
  {
    id: "zero-checkout",
    title: "Die Magie des Zero-Checkout",
    description:
      "Erkennt das System einen autorisierten Besitzer eines Salinapasses oder einer 10er-Karte, ändert sich der Bezahlvorgang radikal. Keine Kreditkarten, kein 3D-Secure. Die Buchung wird mit nur einem Tippen bestätigt.",
    insight:
      "Dieses barrierefreie Erlebnis erzeugt den «Amazon 1-Click Effekt» und formt die stärkste Gewohnheit, genau Ihre Einrichtung zu besuchen (Steigerung des Customer Lifetime Value).",
  },
  {
    id: "digital-concierge",
    title: "Service auf 5-Sterne Niveau",
    description:
      "Die Kommunikation endet nicht nach der Zahlung. Der Kunde erhält sein Geo-Ticket im Apple Wallet sowie eine fürsorgliche WhatsApp-Nachricht mit vorausgefüllter Buchungsnummer für die sofortige Identifikation am Empfang.",
    insight:
      "Das Ticket poppt automatisch 100 Meter vor der Filiale auf dem Display auf. Die WhatsApp-Erinnerung reduziert No-Shows fast auf null.",
  },
  {
    id: "dsgvo-compliance",
    title: "DSGVO-Panzer & Zero-Party Data",
    description:
      "Wir sammeln Daten völlig legal. Die Checkbox für den Marketing-Newsletter ist niemals vorausgewählt (keine «Dark Patterns»). Statt Cookie-basiertem Tracking nutzen wir zu 100% rechtskonforme serverseitige Analytik.",
    insight:
      "Absoluter Schutz vor Millionen-Strafen. Ihre Kundendatenbank wächst durch Double-Opt-In und garantiert höchste Kontaktqualität für das Brevo-Marketing.",
  },
];

// --- КОМПОНЕНТИ ---

// 1. Блок тексту (Scroll Section) з функцією "Тріщітки" (Snap)
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

  // Визначаємо, коли блок знаходиться по центру екрана
  const isInView = useInView(ref, { root: containerRef, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setActiveScene(id);
    }
  }, [isInView, id, setActiveScene]);

  return (
    // h-[100dvh] + snap-center гарантують ефект "тріщітки" при скролі
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

// 2. Блок Bento Grid (Картка)
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
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(251,146,60,0.08)] hover:border-salina-orange/30 rounded-[2rem] p-6 lg:p-8 flex flex-col relative group transition-all duration-500 overflow-visible",
        className,
      )}
    >
      {/* Кнопка Інсайту (Hover Tooltip) у правому верхньому кутку */}
      <div className="absolute top-6 right-6 z-50 flex flex-col items-end group/tooltip">
        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover/tooltip:bg-white group-hover/tooltip:text-salina-orange group-hover/tooltip:border-salina-orange/30 group-hover/tooltip:shadow-md transition-all cursor-help">
          <Info className="w-4 h-4" />
        </div>
        <div className="absolute top-10 right-0 w-64 p-4 bg-slate-900 text-white text-xs font-medium leading-relaxed rounded-2xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none origin-top-right">
          <span className="block text-salina-orange font-bold uppercase tracking-wider mb-1">
            Business Insight
          </span>
          {insight}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 pr-10">
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-salina-orange shrink-0 shadow-sm border border-orange-100">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg md:text-xl font-black text-salina-dark leading-tight">
          {title}
        </h3>
      </div>

      <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 z-10 max-w-[90%]">
        {description}
      </p>

      {/* Зона для анімації (Візуал) */}
      <div className="mt-auto relative z-10 bg-slate-50/80 rounded-2xl border border-slate-100 p-4 min-h-[160px] flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// 2. Головний Компонент
export default function CustomerJourneyScrollytelling() {
  const [activeSceneId, setActiveSceneId] = useState<string>("header");
  const containerRef = useRef<HTMLDivElement>(null);

  // Створюємо масив усіх ідентифікаторів для статус-бару
  const allSteps = ["header", ...SCENES.map((s) => s.id)];

  return (
    // Головний контейнер: прозорий, 100% висоти екрану, зі скрол-снепінгом, прибрано системний скролбар
    <div
      ref={containerRef}
      className="h-[100dvh] w-full bg-transparent overflow-y-auto snap-y snap-mandatory scroll-smooth relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* --- СТАТУС-БАР (Крапки СПРАВА замість системного скролу) --- */}
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
        {/* ЛІВА КОЛОНКА (Текст зі скролом) */}
        <div className="w-full lg:w-1/2 relative z-10 pl-12 lg:pl-16">
          {/* 1. Шапка (Займає 100vh для плавного старту) */}
          <ScrollSection
            id="header"
            setActiveScene={setActiveSceneId}
            containerRef={containerRef}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-salina-dark">
              Frictionless
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Booking Flow
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Erleben Sie, wie smarte Technologie das Kundenerlebnis
              revolutioniert und Ihren administrativen Aufwand auf null
              reduziert.
            </p>
            <div className="mt-12 flex items-center gap-4 text-salina-orange font-bold animate-bounce">
              Scrollen Sie nach unten{" "}
              <ArrowRight className="w-5 h-5 rotate-90" />
            </div>
          </ScrollSection>

          {/* 2. Сцени (Маппінг) */}
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

                {/* Інсайт Тултип */}
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

          {/* Нижній відступ, щоб можна було доскролити до кінця */}
          <div className="h-[20vh]"></div>
        </div>

        {/* ПРАВА КОЛОНКА (Sticky Візуал) */}
        <div className="hidden lg:flex lg:w-1/2 sticky top-0 h-[100dvh] items-center justify-center p-12 overflow-hidden">
          {/* Сцена для візуалізацій */}
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
                        Smart Booking
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
                      {/* 1. Час (FOMO) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Clock className="w-5 h-5" />
                      </div>

                      {/* 2. Люди (Aufsichtspflicht) - Справа зверху (60°) */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Users className="w-5 h-5" />
                      </div>

                      {/* 3. Гаманець (Smart Cart / Stripe) - Справа знизу (120°) */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-700">
                        <Wallet className="w-5 h-5" />
                      </div>

                      {/* 4. VIP (Zero Checkout) - Знизу (180°) */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Crown className="w-5 h-5" />
                      </div>

                      {/* 5. Безпека (DSGVO) - Зліва знизу (240°) */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-pink">
                        <ShieldCheck className="w-5 h-5" />
                      </div>

                      {/* 6. Комунікація (Concierge) - Зліва зверху (300°) */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-green-500">
                        <MessageCircle className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: FOMO Світлофор */}
              {activeSceneId === "fomo" && (
                <motion.div
                  key="fomo"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2 text-salina-dark text-sm font-bold uppercase tracking-wider">
                        <Clock className="w-4 h-4 text-salina-orange" />{" "}
                        Live-Verfügbarkeit
                      </div>
                      <div className="flex items-end gap-1 h-6">
                        <motion.div
                          animate={{ height: ["40%", "70%", "40%"] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-2 bg-slate-200 rounded-full"
                        />
                        <motion.div
                          animate={{ height: ["60%", "100%", "60%"] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            delay: 0.2,
                          }}
                          className="w-2 bg-salina-orange rounded-full shadow-[0_0_8px_rgba(251,146,60,0.5)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-green-50 border border-green-100 text-green-800 flex flex-col items-center">
                        <span className="text-xl font-bold">10:00</span>
                        <span className="text-[10px] text-green-600 mt-1 uppercase tracking-wider font-bold">
                          Frei
                        </span>
                      </div>
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          borderColor: [
                            "rgba(253,224,71,0.5)",
                            "rgba(250,204,21,1)",
                            "rgba(253,224,71,0.5)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-5 rounded-2xl bg-yellow-50 border-2 relative overflow-hidden flex flex-col items-center shadow-[0_10px_30px_rgba(250,204,21,0.3)] z-10"
                      >
                        <span className="text-xl font-bold text-yellow-900">
                          14:00
                        </span>
                        <span className="text-[10px] text-yellow-700 mt-1 uppercase tracking-wider font-bold animate-pulse">
                          🔥 2 Plätze
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Smart Cart & Aufsichtspflicht */}
              {activeSceneId === "smart-cart" && (
                <motion.div
                  key="smartcart"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl relative">
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                        <span className="text-slate-600 font-medium flex items-center gap-3">
                          👦 Kinder{" "}
                          <span className="text-[10px] text-slate-400">
                            ab 1 Jahr
                          </span>
                        </span>
                        <span className="text-2xl font-black text-salina-dark">
                          2
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100 relative overflow-hidden group">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                          className="absolute left-0 top-0 bottom-0 bg-salina-orange/10"
                        />
                        <span className="text-salina-dark font-medium flex items-center gap-3 relative z-10">
                          👨 Erwachsene{" "}
                          <span className="text-[10px] text-salina-orange font-bold uppercase tracking-wider">
                            Aufsichtspflicht!
                          </span>
                        </span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1, type: "spring" }}
                          className="text-2xl font-black text-salina-orange relative z-10"
                        >
                          1
                        </motion.span>
                      </div>
                    </div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.5, type: "spring" }}
                      className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4 mb-8"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shrink-0 shadow-sm border border-amber-100">
                        <Coffee className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-amber-900 mb-0.5">
                          Eltern-Lounge?
                        </p>
                        <p className="text-[11px] text-amber-700/70">
                          Kaffee & Ruhezone zubuchen.
                        </p>
                      </div>
                      <button className="ml-auto bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                        + 8 €
                      </button>
                    </motion.div>

                    <motion.button
                      initial={{ backgroundColor: "#cbd5e1", color: "#64748b" }}
                      animate={{
                        backgroundColor: "#0f172a",
                        color: "#ffffff",
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ delay: 1, duration: 0.4 }}
                      className="w-full py-4 rounded-2xl font-bold text-lg shadow-xl"
                    >
                      Bezahlen <ArrowRight className="inline w-5 h-5 ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Guest-First Checkout */}
              {activeSceneId === "guest-checkout" && (
                <motion.div
                  key="guestcheckout"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-6 text-slate-400 text-sm font-bold uppercase tracking-wider">
                      <UserCircle className="w-4 h-4" /> Kontaktdaten
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-500 text-sm">
                        Vorname & Nachname
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-500 text-sm">
                        E-Mail Adresse
                      </div>

                      {/* Анімація зникнення пароля */}
                      <motion.div
                        initial={{ height: 56, opacity: 1, marginBottom: 16 }}
                        animate={{ height: 0, opacity: 0, marginBottom: 0 }}
                        transition={{
                          delay: 1,
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                        className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center justify-between overflow-hidden"
                      >
                        <span className="text-red-400 text-sm">
                          Passwort erstellen...
                        </span>
                        <span className="text-xs text-red-400/50 uppercase font-bold">
                          Zwang
                        </span>
                      </motion.div>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-500 text-sm">
                        Telefon (WhatsApp)
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, type: "spring" }}
                      className="mt-8 flex items-center justify-center gap-3 text-green-600 bg-green-50 py-3 rounded-xl border border-green-200 font-bold text-sm shadow-sm"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Account im
                      Hintergrund erstellt
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Zero Checkout */}
              {activeSceneId === "zero-checkout" && (
                <motion.div
                  key="zerocheckout"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-10 shadow-2xl text-center relative overflow-hidden">
                    {/* Конфеті ефект на фоні */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none"
                    ></motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="absolute bottom-0 left-0 w-32 h-32 bg-salina-pink/20 rounded-full blur-2xl pointer-events-none"
                    ></motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 shadow-sm relative z-10"
                    >
                      <Crown className="w-4 h-4" /> Salinapass Active
                    </motion.div>

                    <div className="relative h-24 flex items-center justify-center w-full mb-8 z-10">
                      <motion.span
                        initial={{ opacity: 1 }}
                        animate={{
                          opacity: 0.2,
                          textDecoration: "line-through",
                          y: -30,
                          scale: 0.7,
                        }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="text-5xl font-black text-slate-400 absolute"
                      >
                        35,00 €
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 1.2,
                          duration: 0.5,
                          type: "spring",
                        }}
                        className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink absolute drop-shadow-sm"
                      >
                        0,00 €
                      </motion.span>
                    </div>

                    <motion.div
                      initial={{ height: 120, opacity: 1 }}
                      animate={{ height: 0, opacity: 0 }}
                      transition={{ delay: 1, duration: 0.4 }}
                      className="space-y-3 overflow-hidden text-left mb-4 opacity-40"
                    >
                      <div className="bg-slate-50 rounded-xl p-4 text-slate-400 text-sm border border-slate-100">
                        Kartennummer
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 rounded-xl p-4 text-slate-400 text-sm border border-slate-100">
                          MM/JJ
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 text-slate-400 text-sm border border-slate-100">
                          CVC
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-salina-orange to-salina-pink text-white shadow-[0_10px_30px_rgba(251,146,60,0.3)] hover:scale-[1.02] transition-transform relative z-10"
                    >
                      Besuch bestätigen
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: Digital Concierge */}
              {activeSceneId === "digital-concierge" && (
                <motion.div
                  key="digitalconcierge"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-[300px] h-[580px] bg-slate-950 border-[10px] border-slate-800 rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-col">
                    {/* Smartphone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-30 flex items-center justify-center gap-2">
                      <div className="w-12 h-1 bg-slate-900 rounded-full"></div>
                      <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                    </div>

                    {/* Wallpaper */}
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 opacity-80"></div>
                    <div className="absolute top-20 w-full text-center text-white/50 text-6xl font-extralight tracking-tighter z-10">
                      14:41
                    </div>

                    <div className="w-full h-full relative z-20 flex flex-col justify-end p-4 pb-10 gap-3">
                      <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl flex items-start gap-3"
                      >
                        <div className="w-10 h-10 bg-black/50 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <div className="mt-0.5">
                          <p className="text-sm font-bold text-white mb-0.5">
                            Apple Wallet
                          </p>
                          <p className="text-[11px] text-white/70 font-medium leading-snug">
                            La Salina: Start in 15 Min. Tippen für QR-Code.
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{
                          delay: 1.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl"
                      >
                        <div className="flex items-start gap-3 mb-3">
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
                            <p className="text-[11px] text-white/70 font-medium leading-snug">
                              Wir freuen uns auf Sie! 📍 Route zum Parkplatz
                              hier.
                            </p>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-bold rounded-xl transition-colors border border-green-500/20">
                          Rezeption kontaktieren
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 6: DSGVO Compliance */}
              {activeSceneId === "dsgvo-compliance" && (
                <motion.div
                  key="dsgvo"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center relative overflow-hidden">
                    <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500 shadow-sm relative z-10">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-salina-dark mb-6 relative z-10">
                      Marketing Einwilligung
                    </h3>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left relative overflow-hidden cursor-pointer group shadow-inner">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute inset-0 bg-green-50"
                      />
                      <div className="flex items-start gap-4 relative z-10">
                        <motion.div
                          initial={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                          }}
                          animate={{
                            backgroundColor: "#22c55e",
                            borderColor: "#22c55e",
                          }}
                          transition={{ delay: 1 }}
                          className="w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
                        >
                          <motion.svg
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        </motion.div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          Ja, ich möchte den Newsletter erhalten.{" "}
                          <span className="text-[10px] text-slate-400 block mt-1">
                            (Kein Dark Pattern, Double-Opt-In garantiert).
                          </span>
                        </p>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="mt-8 text-xs font-bold text-salina-dark bg-white inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 shadow-sm relative z-10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> 100%
                      Cookieless Tracking (Server-Side)
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* --- ENTERPRISE BENTO GRID (Новий Блок розширених фіч) --- */}
      {/* Використовуємо snap-start, щоб екран рівно зупинився на початку сітки */}
      <div className="w-full snap-start py-24 px-6 lg:px-16 relative z-20 bg-transparent">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-salina-dark tracking-tight mb-4">
            Erweiterte Booking-Funktionen
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Spezifische B2B-Lösungen, KI-Support und medizinisches
            Datenmanagement – nahtlos integriert in einen einzigen Flow.
          </p>
        </div>

        {/* Сітка Bento Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: B2B Маршрутизація (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="B2B-Buchung: Gateway-Bypass"
            description="Für Kitas und Schulen versteckt das System dynamisch den Stripe-Zahlungsschritt. Stattdessen wird die Buchung auf 'Pending' gesetzt und ein automatischer EN 16931-konformer Rechnungsexport generiert."
            insight="Sie verlieren keine Erzieher, die online nicht mit Firmenkarten zahlen dürfen. Die Rechnung wird automatisch für die Banküberweisung erstellt."
            icon={Building2}
          >
            {/* Додано relative overflow-hidden саме сюди */}
            <div className="w-full flex items-center justify-between max-w-sm mx-auto bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="text-sm font-bold text-slate-500">
                Zahlungsart
              </div>
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                <div className="px-3 py-1 text-xs font-bold text-slate-400">
                  Privat
                </div>
                <motion.div className="bg-salina-dark text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                  B2B
                </motion.div>
              </div>

              {/* Анімація тепер живе ТІЛЬКИ всередині цього білого блоку */}
              <motion.div
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  times: [0, 0.2, 0.8, 1],
                }}
                className="absolute inset-0 bg-white/95 flex items-center justify-center gap-3 z-20 backdrop-blur-sm"
              >
                <FileText className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-salina-dark text-sm">
                  PDF Rechnung generiert
                </span>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 2: Реферальний Маркетинг (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Cookie-less Marketing"
            description="Kunden teilen Promo-Codes. Das System verknüpft Leads ausschließlich über die manuelle Code-Eingabe im Warenkorb und umgeht so AdBlocker und DSGVO-Probleme."
            insight="100% legaler Empfehlungsmarketing-Motor. Das verdiente Store-Credit Guthaben bindet das Kapital fest auf Ihrer Plattform."
            icon={Share2}
          >
            <div className="flex flex-col gap-4 w-full h-full relative">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-full flex-1 flex flex-col justify-center">
                <div className="text-xs font-bold text-slate-400 mb-2 uppercase">
                  Warenkorb (Gast)
                </div>
                <div className="flex gap-2">
                  <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs font-bold font-mono text-salina-dark flex-1">
                    HANNA15
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-bold"
                  >
                    -15%
                  </motion.div>
                </div>
              </div>
              <div className="bg-slate-900 p-4 rounded-2xl shadow-lg w-full flex-1 flex flex-col justify-center relative overflow-hidden">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-2 right-2 text-xl"
                >
                  🎉
                </motion.div>
                <div className="text-xs font-bold text-slate-400 mb-1 uppercase">
                  Ambassador Wallet
                </div>
                <div className="text-2xl font-black text-white">+ 5,00 €</div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 3: Подарункові сертифікати */}
          <BentoCard
            className="lg:col-span-1"
            title="Smarte Restguthaben"
            description="Ist der Gutscheinwert höher als der Warenkorb, wird die Buchung auf 0€ gesetzt. Der Restbetrag bleibt auf dem gleichen Code für zukünftige Besuche erhalten."
            insight="Gesetzeskonform. Kunden verlieren kein Geld, und Sie garantieren sich den nächsten Besuch zur 'Restverwertung'."
            icon={Gift}
          >
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-full max-w-xs relative overflow-visible">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-500 line-through">
                  40,00 €
                </span>
                <span className="text-xl font-black text-salina-orange">
                  0,00 €
                </span>
              </div>
              <motion.div
                animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-2 rounded-lg text-center absolute -bottom-5 left-4 right-4 shadow-md"
              >
                Restguthaben: 60,00 € gespeichert
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 4: AI-Консьєрж (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="AI-Concierge & Smart Escalation"
            description="Zögert ein Kunde im Checkout, beantwortet ein KI-Widget Fragen auf Basis Ihrer Wissensdatenbank. Bei Rückerstattungen leitet die KI an WhatsApp weiter."
            insight="Die KI verhindert Kaufabbrüche durch sofortige Antworten. Die Smart Escalation verbindet frustrierte Kunden nahtlos mit der echten Rezeption."
            icon={Bot}
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-xs">
              <div className="bg-slate-50 p-2 border-b border-slate-100 flex items-center gap-2 font-bold text-salina-dark">
                <Bot className="w-4 h-4 text-salina-orange" /> La Salina KI
              </div>
              <div className="p-3 space-y-3">
                <motion.div
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    times: [0, 0.1, 0.9, 1],
                  }}
                  className="bg-slate-100 p-2 rounded-lg rounded-tl-none text-slate-600 max-w-[80%]"
                >
                  Darf ich eine Torte mitbringen?
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 0, 1, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    times: [0, 0.2, 0.3, 0.9, 1],
                  }}
                  className="bg-orange-50 text-orange-900 p-2 rounded-lg rounded-tr-none ml-auto max-w-[80%]"
                >
                  Ja! Geschirr stellen wir bereit. 🎂
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 0, 0, 1, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    times: [0, 0.4, 0.5, 0.6, 0.9, 1],
                  }}
                  className="bg-slate-100 p-2 rounded-lg rounded-tl-none text-slate-600 max-w-[80%]"
                >
                  Ich brauche eine Stornierung.
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 0, 0, 0, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    times: [0, 0.6, 0.7, 0.9, 1],
                  }}
                  className="bg-green-50 text-green-700 p-2 rounded-lg rounded-tr-none ml-auto max-w-[80%] font-bold text-center border border-green-200"
                >
                  Mit Rezeption in WhatsApp klären
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 5: Медична безпека */}
          <BentoCard
            className="lg:col-span-1"
            title="1-Klick Gesundheitsakten"
            description="Allergien werden beim Checkout abgefragt und für immer in das globale CRM-Profil des Gastes synchronisiert."
            insight="Sicherheit für Kinder. Die Rezeption sieht rote Warnmarker in der Kundenkartei, noch bevor der Gast eintrifft."
            icon={HeartPulse}
          >
            <div className="flex items-center gap-4 w-full">
              <div className="bg-white border border-slate-200 p-2 rounded-xl text-xs font-bold text-slate-500 shadow-sm w-24 text-center z-10">
                Eingabe:
                <br />
                &quot;Laktose&quot;
              </div>
              <motion.div
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="h-1 flex-1 bg-[linear-gradient(90deg,transparent,rgba(251,146,60,1),transparent)] bg-[length:200%_100%]"
              />
              <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-sm z-10 relative">
                <UserCircle className="w-6 h-6 text-slate-300 mx-auto mb-1" />
                <motion.div
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md border border-white"
                >
                  ⚠️ LAKTOSE
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 6: Делеговане бронювання */}
          <BentoCard
            className="lg:col-span-1"
            title="Für jemand anderen buchen"
            description="Der Käufer kann die Kontaktdaten des tatsächlichen Besuchers (z.B. Nanny) angeben. Das E-Ticket wird direkt dorthin gesendet."
            insight="Perfekt für Geschenke. Der Administrator weiß sofort, wen er am Empfang begrüßen muss."
            icon={Ticket}
          >
            <div className="w-full relative flex items-center justify-center">
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm w-32 relative z-10">
                <div className="flex items-center gap-1 text-[10px] font-bold text-salina-dark mb-2">
                  <CheckCircle2 className="w-3 h-3 text-salina-orange" /> Für
                  andere
                </div>
                <div className="h-4 bg-slate-100 rounded mb-1"></div>
                <div className="h-4 bg-slate-100 rounded"></div>
              </div>
              <motion.div
                animate={{
                  x: [0, 80],
                  y: [0, -20],
                  scale: [1, 0.5],
                  opacity: [0, 1, 0],
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                className="absolute z-20"
              >
                <div className="bg-salina-dark text-white p-2 rounded-lg shadow-xl flex items-center gap-1 text-[10px] font-bold">
                  <Ticket className="w-3 h-3" /> E-Ticket
                </div>
              </motion.div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
