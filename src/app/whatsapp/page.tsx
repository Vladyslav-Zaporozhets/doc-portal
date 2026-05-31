"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  MessageCircle,
  Ticket,
  Bot,
  Bell,
  Phone,
  ShieldCheck,
  Gift,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Radio,
  Megaphone,
  BadgeCheck,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "auto-notifications",
    product: "System-WhatsApp-Assistent",
    title: "Ihr Ticket immer zur Hand",
    description:
      "Sobald der Gast seine Buchung erfolgreich abgeschlossen hat, sendet das System automatisch eine elegante Benachrichtigung mit dem elektronischen Ticket direkt per WhatsApp. Und genau 24 Stunden vor Beginn der Session erhält der Kunde eine fürsorgliche Erinnerung mit guten Wünschen für einen schönen Aufenthalt und einem Link zum Navigator.",
    insight:
      "Absolute Eliminierung von No‑Shows. Kunden werden ihre Besuche nie wieder vergessen, was 100 % Ihrer Einnahmen sichert und eine volle Auslastung garantiert.",
  },
  {
    id: "prefilled-context",
    product: "Intelligente Kontakt-Links",
    title: "Wir wissen, wer uns schreibt",
    description:
      "Wenn ein Kunde sich verspätet, muss er nicht anrufen. Er klickt einfach auf den Button „Kontakt zum Administrator“ in seinem Ticket. In seinem Chat erscheint automatisch ein vorbereiteter Text mit seiner Buchungsnummer. Der Rezeptionist sieht sofort alle Informationen über den Gast, ohne lästige Rückfragen stellen zu müssen.",
    insight:
      "Radikale Beschleunigung des Service. Ihr Personal verschwendet keine wertvolle Zeit mit der Suche nach Namen in der Datenbank, und der Kunde fühlt sich wie in einem Fünf‑Sterne‑Hotel.",
  },
  {
    id: "smart-escalation",
    product: "KI-Assistent & WhatsApp",
    title: "Nahtloser Übergang zum Live-Chat",
    description:
      "Unser smarter Bot auf der Website filtert 80 % der typischen Fragen. Beschreibt der Kunde jedoch eine komplexe höhere Gewalt, stoppt der Bot fürsorglich und bietet einen Button zum Wechsel in WhatsApp an. Der Dialog wird dann nahtlos mit einem echten Administrator fortgesetzt.",
    insight:
      "Das Rezeptionspersonal wird vollständig von Routinearrufen entlastet („Brauchen wir Stoppersocken?“), greift aber rechtzeitig bei wichtigen Kunden ein und stellt so sicher, dass kein Verkauf durch KI-Limits verloren geht.",
  },
  {
    id: "waiting-list",
    product: "Trigger-Benachrichtigungen",
    title: "Die Warteliste, die sich selbst füllt",
    description:
      "Ist der Wunschtermin ausverkauft, reihen sich Kunden in eine digitale Warteliste ein. Sobald jemand seinen Besuch storniert, versendet das System augenblicklich und ohne Eingreifen des Administrators WhatsApp‑Nachrichten an alle Wartenden: „Ein Platz ist freigeworden!“.",
    insight:
      "Lücken im Zeitplan durch kurzfristige Absagen werden innerhalb von Minuten geschlossen. Sie erreichen 100 % Raumauslastung ohne jeden zusätzlichen Aufwand für das Personal.",
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
export default function WhatsAppOmnichannelPage() {
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
              WhatsApp
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Omnichannel
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie aus einer einfachen Nachricht ein vollautomatischer,
              persönlicher Concierge-Service wird – und warum Ihre Kunden das
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
                        WhatsApp
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Concierge
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

                    {/* Зовнішня орбіта (6 Іконок етапів WhatsApp-екосистеми) */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                      }}
                      className="absolute inset-[-70px] border border-slate-200 rounded-full"
                    >
                      {/* 1. Ticket (Buchung) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Ticket className="w-5 h-5" />
                      </div>

                      {/* 2. Clock (Erinnerung) - Справа зверху (60°) */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Clock className="w-5 h-5" />
                      </div>

                      {/* 3. Bot (KI-Assistent) - Справа знизу (120°) */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <Bot className="w-5 h-5" />
                      </div>

                      {/* 4. Bell (Warteliste) - Знизу (180°) */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <Bell className="w-5 h-5" />
                      </div>

                      {/* 5. MessageCircle (Live-Chat) - Зліва знизу (240°) */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-green-500">
                        <MessageCircle className="w-5 h-5" />
                      </div>

                      {/* 6. Phone (Rezeption) - Зліва зверху (300°) */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <Phone className="w-5 h-5" />
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
              {/* ВІЗУАЛ 1: Auto Notifications */}
              {activeSceneId === "auto-notifications" && (
                <motion.div
                  key="auto-notifications"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-[300px] h-[580px] bg-slate-950 border-[10px] border-slate-800 rounded-[3.5rem] overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 opacity-80" />
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
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl"
                      >
                        <div className="flex items-start gap-3">
                          <MessageCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-white mb-0.5">
                              WhatsApp
                            </p>
                            <p className="text-[11px] text-white/70 font-medium leading-snug">
                              🎟️ Ihre Buchung ist bestätigt! Hier ist Ihr
                              Ticket.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 1.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl"
                      >
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-white mb-0.5">
                              Erinnerung
                            </p>
                            <p className="text-[11px] text-white/70 font-medium leading-snug">
                              Wir erwarten Sie morgen um 14:00. Parkroute hier
                              📍
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Pre-filled Context */}
              {activeSceneId === "prefilled-context" && (
                <motion.div
                  key="prefilled-context"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-500">
                      <MessageCircle className="w-5 h-5 text-green-500" />{" "}
                      WhatsApp Chat
                    </div>
                    <div className="bg-slate-100 rounded-2xl p-4 text-sm text-slate-700 mb-4">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      >
                        Guten Tag! Ich habe eine Frage zu Buchung #2458...
                      </motion.span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-green-700 text-sm font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Gesendet
                      </div>
                    </div>
                    <div className="mt-4 bg-salina-orange/10 rounded-xl p-3 text-xs text-salina-orange flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Admin sieht sofort Buchung #2458
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Smart Escalation */}
              {activeSceneId === "smart-escalation" && (
                <motion.div
                  key="smart-escalation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2rem] p-6 shadow-lg">
                      <div className="text-xs text-slate-500 mb-3">
                        Website Chat
                      </div>
                      <div className="bg-slate-100 rounded-2xl p-3 text-sm text-slate-700 mb-3">
                        Ich möchte meinen Besuch stornieren...
                      </div>
                      <div className="bg-salina-orange/10 rounded-2xl p-3 text-sm text-salina-dark mb-3">
                        Ich verbinde Sie mit einem Mitarbeiter.
                      </div>
                      <button className="w-full py-2 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" /> In WhatsApp
                        fortfahren
                      </button>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2rem] p-6 shadow-lg"
                    >
                      <div className="text-xs text-slate-500 mb-3">
                        WhatsApp (Live)
                      </div>
                      <div className="bg-green-50 rounded-2xl p-3 text-sm text-green-700">
                        Guten Tag, wie kann ich helfen?
                      </div>
                      <div className="mt-2 flex items-center justify-center text-green-600 text-xs font-bold">
                        <Users className="w-4 h-4 mr-1" /> Administrator ist
                        online
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Waiting List */}
              {activeSceneId === "waiting-list" && (
                <motion.div
                  key="waiting-list"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-[300px] h-[580px] bg-slate-950 border-[10px] border-slate-800 rounded-[3.5rem] overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 opacity-80" />
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
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl"
                      >
                        <div className="flex items-start gap-3">
                          <Bell className="w-5 h-5 text-salina-orange shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-white mb-0.5">
                              Warteliste
                            </p>
                            <p className="text-[11px] text-white/70 font-medium leading-snug">
                              🔥 Ein Platz um 14:00 wurde frei! Jetzt buchen →
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="flex items-center justify-center"
                      >
                        <div className="bg-green-500/20 rounded-2xl px-4 py-2 text-green-400 text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Gebucht!
                        </div>
                      </motion.div>
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
            Kommunikations‑Cockpit
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese Werkzeuge geben Ihnen die volle Kontrolle über jede Nachricht
            – professionell, rechtskonform und immer mit dem gewissen Extra an
            Service.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: WhatsApp Business (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Einheitlicher Rezeptions‑Arbeitsplatz (WhatsApp Business)"
            description="Administratoren nutzen keine privaten Handys. Die gesamte Live‑Kommunikation läuft über die offizielle WhatsApp Business App auf einem großen Tablet an der Rezeption."
            insight="Volle Kontrolle über die Servicequalität. Der gesamte Chatverlauf bleibt dauerhaft Eigentum des Unternehmens, nicht auf privaten Geräten von Aushilfskräften. Höchster Standard an professioneller Kommunikation."
            icon={Phone}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500">
                  Aktive Chats
                </span>
                <span className="text-xs text-green-600">3 online</span>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: i * 0.5,
                    }}
                    className="flex items-center justify-between bg-white rounded-xl p-3 border border-slate-100"
                  >
                    <span className="text-xs text-slate-600">Gast #{i}234</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Блок 2: WhatsApp Channels (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Marketing ohne Spam (WhatsApp Channels)"
            description="Für Aktionen und „heiße“ freie Slots nutzt jede Filiale offizielle Kanäle (WhatsApp Channels). Eine einseitige Übertragung von Neuigkeiten an Abonnenten."
            insight="Absoluter Schutz der Firmennummer vor Sperrungen durch Meta. Abonnenten sehen die Nummern der anderen nicht (100 % DSGVO‑konform), und Sie erhalten einen Marketingkanal mit bis zu 90 % Öffnungsrate."
            icon={Megaphone}
          >
            <div className="space-y-3 w-full">
              <div className="bg-salina-orange/5 rounded-2xl p-4 border border-salina-orange/10">
                <p className="text-xs font-bold text-salina-dark">
                  Heute: 20 % Rabatt!
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-400">
                    Gepostet vor 5 Min.
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-xs text-salina-orange font-bold"
                  >
                    500 Views
                  </motion.span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Radio className="w-4 h-4 text-salina-orange" />
                Reichweite wächst automatisch
              </div>
            </div>
          </BentoCard>

          {/* Блок 3: Kulanz-Management */}
          <BentoCard
            title="Kulanz‑Gutscheine per Drag‑and‑Drop"
            description="Wird ein Kunde kurz vor der Session krank, generiert der Admin mit einem Klick einen 100‑%‑Kulanzgutschein und sendet ihn direkt in den Chat."
            insight="Das Geld bleibt auf dem Firmenkonto (Cashflow geschützt). Der Kunde erhält ein positives Problemlösungserlebnis und kommt garantiert in der nächsten Woche wieder."
            icon={Gift}
          >
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              className="bg-salina-orange/10 rounded-2xl p-4 border border-salina-orange/20 text-center cursor-grab active:cursor-grabbing"
            >
              <Gift className="w-8 h-8 text-salina-orange mx-auto mb-2" />
              <p className="text-xs font-bold text-salina-dark">100 % Kulanz</p>
              <p className="text-[10px] text-slate-500 mt-1">In Chat ziehen</p>
            </motion.div>
          </BentoCard>

          {/* Блок 4: Ads that Click to WhatsApp (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Werbung, die konvertiert (Click‑to‑WhatsApp Ads)"
            description="Wenn Sie auf Instagram werben, können Kunden mit einem Klick in Ihren Firmen‑WhatsApp gelangen. Meta öffnet automatisch ein 72‑Stunden‑Fenster für kostenlose Kommunikation."
            insight="Radikale Steigerung des ROAS. Ihre Administratoren haben drei volle Tage Zeit, um warme Instagram‑Leads bequem zu beraten und zu einer erfolgreichen Buchung zu führen – völlig kostenlos."
            icon={Star}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white text-center">
                <p className="text-xs font-bold">Instagram</p>
                <p className="text-lg">📸</p>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-2xl"
              >
                →
              </motion.div>
              <div className="bg-green-500 rounded-2xl p-4 text-white text-center">
                <MessageCircle className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs font-bold">WhatsApp</p>
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="bg-green-50 border border-green-200 rounded-full px-3 py-1 text-green-700 text-xs font-bold"
              >
                72 Std.
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 5: DSGVO Compliance */}
          <BentoCard
            title="Juristische Sicherheit (DSGVO Compliance)"
            description="Die gesamte Integration basiert auf offiziellen Tools (keine zwielichtigen Versanddienste). Kunden erhalten ausschließlich erlaubte Transaktionsbelege und Erinnerungen."
            insight="Volle Immunität gegen Abmahnungen europäischer Regulierungsbehörden. Ihre Kommunikation ist zu 100 % DSGVO‑konform und garantiert der Inhaberin und den Franchisenehmern absolute Rechtssicherheit."
            icon={ShieldCheck}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto"
            >
              <BadgeCheck className="w-8 h-8 text-green-600" />
            </motion.div>
            <p className="text-xs text-green-600 mt-3 text-center font-bold">
              DSGVO Approved
            </p>
          </BentoCard>

          {/* Блок 6: Offizielles Profil */}
          <BentoCard
            title="Marken‑Wiedererkennung (Offizielles Profil)"
            description="Dank der Integration über die Cloud API erhält Ihr System‑Bot eine offizielle Verifizierung. Statt einer unbekannten Telefonnummer sehen die Kunden Ihr schönes Logo und den Namen „La Salina“."
            insight="Maximales Kundenvertrauen (Brand Trust). Nutzer werden Ihre Tickets niemals als Spam wahrnehmen, was das Ansehen und die Premium‑Wahrnehmung des Unternehmens enorm steigert."
            icon={BadgeCheck}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold mx-auto mb-1">
                  +49
                </div>
                <p className="text-[10px] text-slate-400">Unbekannt</p>
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
                <div className="w-12 h-12 rounded-full bg-salina-orange/10 border-2 border-salina-orange/20 flex items-center justify-center mx-auto mb-1">
                  <Star className="w-6 h-6 text-salina-orange" />
                </div>
                <p className="text-[10px] text-salina-orange font-bold">
                  La Salina ✓
                </p>
              </motion.div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
