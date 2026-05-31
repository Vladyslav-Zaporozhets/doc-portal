"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  Bot,
  MessageCircle,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  Zap,
  Edit3,
  Lock,
  Database,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Phone,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "emotion-support",
    product: "24/7 Support in natürlicher Sprache",
    title: "Service, der niemals schläft",
    description:
      "Die meisten Eltern planen ihre Wochenenden spät am Abend. Statt einer trockenen Fragenliste kommuniziert unser KI‑Assistent in lebendiger, warmer Sprache mit freundlichen Emojis. Fragt eine Mutter um 23:30 Uhr: «Ist es bei Ihnen warm genug und darf ich meine eigene Torte mitbringen?», antwortet der Bot sofort fürsorglich auf all ihre Zweifel und hilft ihr, die Buchung noch in diesem Moment abzuschließen.",
    insight:
      "Sie verlieren keine „heißen“ Kunden außerhalb der Geschäftszeiten. Die Conversion steigt, weil der Kunde in der Phase der höchsten emotionalen Kaufbereitschaft erschöpfende Antworten erhält.",
  },
  {
    id: "context-awareness",
    product: "Kontextbewusstsein",
    title: "Antworten, die nur für Ihre Stadt gelten",
    description:
      "Da das La Salina‑Netzwerk viele Standorte haben wird, erkennt der Bot automatisch, auf welcher Seite sich der Kunde befindet. Öffnet ein Nutzer den Chat auf der Forchheim‑Seite und fragt: «Wo kann ich bei euch parken?», liefert der Bot präzise Anweisungen ausschließlich für den Forchheimer Parkplatz – ohne jede Verwechslung mit anderen Standorten.",
    insight:
      "Absolute Beratungspräzision. Der Kunde erhält sofort relevante Informationen, was das Vertrauen in die Premium‑Marke stärkt und das Risiko von Fehlfahrten eliminiert.",
  },
  {
    id: "zero-hallucination",
    product: "Ausschließlich intern geschult",
    title: "Keine erfundenen Versprechen",
    description:
      "Unser Assistent wird streng auf den La Salina‑Richtlinien trainiert (Aufsichtspflicht, Stoppersocken etc.). Es ist ihm hardwaretechnisch verboten, im offenen Internet zu suchen oder nicht existierende Rabatte zu erfinden. Er gibt ausschließlich zu 100 % verlässliche, von Ihnen freigegebene Informationen weiter.",
    insight:
      "Voller Reputationsschutz. Der Bot wird einem Kunden niemals einen kostenlosen Besuch oder eine nicht existierende Leistung versprechen und das Unternehmen so vor finanziellen Verlusten und juristischen Ansprüchen bewahren.",
  },
  {
    id: "smart-escalation",
    product: "Übergabe komplexer Dialoge",
    title: "Wenn ein Mensch gebraucht wird – sind wir da",
    description:
      "Der Bot kennt seine Grenzen genau. Beschreibt der Kunde einen komplizierten Notfall oder möchte er unter Verletzung der Regeln stornieren, hält der Assistent fürsorglich inne und bietet einen Button zum Wechsel in WhatsApp an. Dort setzt ein echter Administrator den Dialog nahtlos fort.",
    insight:
      "Das Rezeptionspersonal wird von Routinefragen entlastet, greift aber rechtzeitig bei wichtigen Kunden mit komplexen Problemen ein. Kein Konflikt bleibt ohne die Aufmerksamkeit eines Menschen.",
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
export default function AIDigitalConciergePage() {
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
              AI Digital
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Concierge
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie ein unsichtbarer Assistent rund um die Uhr Gäste betreut,
              Fragen beantwortet und Buchungen abschließt – ganz ohne Personal.
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
                        AI Digital
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Concierge
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
                      {/* 1. Bot (24/7) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Bot className="w-5 h-5" />
                      </div>
                      {/* 2. Clock (Nacht-Service) - 60° */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Clock className="w-5 h-5" />
                      </div>
                      {/* 3. MapPin (Geo) - 120° */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <MapPin className="w-5 h-5" />
                      </div>
                      {/* 4. ShieldCheck (Zero Hallucination) - 180° */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      {/* 5. MessageCircle (Smart Escalation) - 240° */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      {/* 6. Sparkles (KI-Magie) - 300° */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <Sparkles className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: Emotion Support */}
              {activeSceneId === "emotion-support" && (
                <motion.div
                  key="emotion-support"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-500">
                      <Bot className="w-5 h-5 text-salina-orange" />{" "}
                      KI‑Assistent
                    </div>
                    <div className="space-y-3">
                      <div className="bg-slate-100 rounded-2xl p-3 text-sm text-slate-600 max-w-[80%]">
                        Ist es bei Ihnen warm genug? Darf ich meine eigene Torte
                        mitbringen?
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-salina-orange/10 rounded-2xl p-3 text-sm text-salina-dark max-w-[80%] ml-auto"
                      >
                        Guten Abend! Bei uns sind es immer behagliche 22°C. Sie
                        können Ihre Torte völlig kostenlos mitbringen! 🎂
                        Möchten Sie die freien Zeiten für Ihre Feier sehen?
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Context Awareness */}
              {activeSceneId === "context-awareness" && (
                <motion.div
                  key="context-awareness"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="text-xs text-slate-500 mb-3">
                      📍 Sie sind auf: /forchheim/
                    </div>
                    <div className="bg-slate-100 rounded-2xl p-3 text-sm text-slate-600 mb-3">
                      Wo kann ich bei euch parken?
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-salina-orange/10 rounded-2xl p-3 text-sm text-salina-dark"
                    >
                      In Forchheim gibt es einen großen Parkplatz direkt hinter
                      dem Gebäude (Musterstraße 12).
                    </motion.div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-salina-orange">
                      <MapPin className="w-4 h-4 animate-pulse" /> Mini‑Karte
                      Forchheim
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Zero Hallucination */}
              {activeSceneId === "zero-hallucination" && (
                <motion.div
                  key="zero-hallucination"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="bg-slate-100 rounded-2xl p-3 text-sm text-slate-600 mb-3">
                      Geben Sie 50 % Rabatt für Neukunden?
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-salina-orange/10 rounded-2xl p-3 text-sm text-salina-dark"
                    >
                      Leider gibt es diesen Rabatt nicht, aber ich kann Ihnen
                      unseren vorteilhaften Familien‑Salinapass vorstellen! 😊
                    </motion.div>
                    <div className="mt-3 flex items-center gap-2 text-green-600 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Antwort geprüft
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Smart Escalation */}
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
                        Ich bin schwer erkrankt, bitte stornieren Sie meinen
                        Besuch.
                      </div>
                      <div className="bg-salina-orange/10 rounded-2xl p-3 text-sm text-salina-dark mb-3">
                        Gute Besserung! Diese Frage benötigt einen
                        Administrator.
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
                        <Phone className="w-4 h-4 mr-1" /> Administrator ist
                        online
                      </div>
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
            Das KI‑Cockpit
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese unsichtbaren Mechanismen machen den Concierge jeden Tag ein
            Stück schlauer – und entlasten Ihr Team gleichzeitig von unnötiger
            Routine.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: Фільтрація шуму (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Filterung des Informationsrauschens (Level 1)"
            description="Der KI‑Assistent arbeitet als erste Support‑Ebene. Er beantwortet bis zu 80 % der täglichen Routinefragen zu Preisen, Parkplätzen oder Stoppersocken autonom, ohne das Personal abzulenken."
            insight="Sie senken die operative Belastung radikal. Administratoren sind kein „Auskunftsbüro“ am Telefon mehr, sondern konzentrieren sich zu 100 % auf den hochwertigen Service für die Gäste vor Ort (Upselling)."
            icon={Zap}
          >
            <div className="flex items-center justify-center gap-4 w-full h-24">
              <div className="flex flex-wrap gap-1 w-16 justify-center">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-slate-300" />
                ))}
              </div>
              <div className="w-12 h-12 rounded-full bg-salina-orange/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-salina-orange" />
              </div>
              <div className="flex flex-col gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-yellow-400" />
                ))}
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-slate-500" />
              </div>
            </div>
          </BentoCard>

          {/* Блок 2: No-Code Knowledge Base (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Training ohne Code (No‑Code Wissensdatenbank)"
            description="Um dem Bot neue Regeln beizubringen, brauchen Sie keinen Programmierer. Die gesamte Wissensbasis wird direkt im Admin‑Panel der Website in einem ganz normalen Texteditor gepflegt."
            insight="Völlige Unabhängigkeit von IT‑Spezialisten und null Kosten für den technischen Support des Bots. Sobald Sie einen Preis oder eine Regel auf der Website aktualisieren, liest der Bot sie sofort ein und verwendet sie in seinen Antworten."
            icon={Edit3}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="text-xs text-slate-400 mb-2">
                Wissensdatenbank
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-100 text-sm text-slate-600">
                Neuer Preis: 15 €
              </div>
              <motion.div
                animate={{ x: [0, 10, 0], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-2 flex justify-center"
              >
                <Sparkles className="w-5 h-5 text-salina-orange" />
              </motion.div>
              <div className="bg-salina-orange/10 rounded-xl p-3 border border-salina-orange/20 text-sm text-salina-dark mt-2 flex items-center gap-2">
                <Bot className="w-4 h-4 text-salina-orange" /> Regel übernommen
              </div>
            </div>
          </BentoCard>

          {/* Блок 3: DSGVO Compliance */}
          <BentoCard
            title="Europäische Privatsphäre (100 % DSGVO)"
            description="Unser Bot läuft lokal auf den europäischen Servern der Plattform. Er übermittelt keine Kundenanfragen an Drittanbieter und setzt keine Werbetracker ein."
            insight="Absolute Immunität gegen Bußgelder der Datenschutzbehörden. Ihr Unternehmen ist vollständig konform mit den strengsten europäischen Datenschutzgesetzen."
            icon={ShieldCheck}
          >
            <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-3 text-center font-bold">
              DSGVO Approved
            </p>
          </BentoCard>

          {/* Блок 4: TDDDG Compliance (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Blockierung bis zur Zustimmung (TDDDG Compliance)"
            description="Gemäß dem neuen TDDDG‑Gesetz lädt der Bot erst, wenn der Besucher bewusst auf „Akzeptieren“ im Zustimmungsbanner klickt."
            insight="Sie zeigen Respekt für die Privatsphäre Ihrer Besucher und garantieren die rechtliche Einwandfreiheit Ihrer Plattform. Das Risiko von Klagen wegen unerlaubter Skriptausführung ist eliminiert."
            icon={Lock}
          >
            <div className="flex items-center justify-center gap-6 w-full">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center opacity-60">
                <Lock className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Chat gesperrt</p>
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
                className="bg-white rounded-2xl p-4 border border-green-200 shadow-sm text-center"
              >
                <Bot className="w-6 h-6 text-salina-orange mx-auto mb-2" />
                <p className="text-xs text-green-700 font-bold">
                  Hallo! Wie kann ich helfen?
                </p>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 5: Semantic Cache */}
          <BentoCard
            title="Semantischer Cache (Ressourcen sparen)"
            description="Das System merkt sich die häufigsten Fragen. Wenn Kunden 100‑mal nach dem Parkplatz fragen, fragt der Bot nicht jedes Mal den kostenpflichtigen KI‑Server an, sondern liefert die gespeicherte Antwort blitzschnell aus dem lokalen Cache."
            insight="Maximale Optimierung der IT‑Infrastrukturkosten. Der Bot antwortet sofort und Sie sparen bei jeder getippten Anfrage bares Geld (Token‑Ersparnis)."
            icon={Database}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="text-xs text-slate-500">Anfrage</div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-4 h-4 bg-salina-orange rounded-full"
              />
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-1 text-xs font-bold text-amber-700">
                Cache
              </div>
              <div className="text-xs text-green-600 font-bold">Antwort</div>
            </div>
          </BentoCard>

          {/* Блок 6: Feedback Loop */}
          <BentoCard
            title="Kontinuierliche Verbesserung (Feedback Loop)"
            description="Das System sammelt automatisch alle Kundenfragen, die der Bot nicht beantworten konnte und an den WhatsApp‑Manager weitergeleitet hat."
            insight="Sie erhalten eine fertige Analyse darüber, was auf Ihrer Website fehlt. Indem Sie diese Antworten im Editor hinzufügen, machen Sie den Bot noch intelligenter und steigern kontinuierlich die Qualität des Kundenservice."
            icon={TrendingUp}
          >
            <div className="flex items-center justify-center gap-3 w-full">
              <div className="bg-slate-50 rounded-xl p-2 border border-slate-100 text-xs text-slate-500">
                Unbekannte Fragen
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Sparkles className="w-5 h-5 text-salina-orange" />
              </motion.div>
              <div className="bg-green-50 rounded-xl p-2 border border-green-100 text-xs text-green-700 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Wissen +
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
