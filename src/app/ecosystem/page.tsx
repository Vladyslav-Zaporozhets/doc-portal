"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  ShieldCheck,
  Eye,
  Calendar,
  CreditCard,
  ShoppingCart,
  FileText,
  Lock,
  MessageCircle,
  Bot,
  Cpu,
  Gift,
  Mail,
  Users,
  Globe,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  GraduationCap,
  Server,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "captcha-matomo",
    product: "Friendly Captcha & Matomo",
    title: "Unsichtbare Wächter für Ihren Traffic",
    description:
      "Sobald ein Kunde die Website betritt, prüft das europäische Friendly Captcha unsichtbar, ob es sich um einen echten Menschen handelt, und blockiert Spam‑Bots ohne störende Bilderrätsel. Gleichzeitig erfasst die Server‑Analytics Matomo völlig legal die Herkunft des Kunden – ohne verbotene Cookies.",
    insight:
      "Sie erhalten 100 % genaue Analysen zur Werbewirksamkeit und absoluten Schutz vor Hackerangriffen, ohne dass der Kunde auch nur einen Hauch von Unbehagen verspürt oder aggressive Datenschutzbanner sieht.",
  },
  {
    id: "amelia",
    product: "Amelia Booking Engine",
    title: "Zentrale Booking-Engine",
    description:
      "Das Plugin Amelia steuert den gesamten Live‑Kalender. Wenn ein Gast eine Zeit auswählt, prüft Amelia automatisch die Anwesenheit von Aufsichtspersonen und die verfügbaren Plätze im Ruheraum. Nach der Auswahl wird der Slot zuverlässig für andere Besucher gesperrt und ein elektronisches Ticket (E‑Ticket) erstellt.",
    insight:
      "Volle Kontrolle über die Kapazität und die Eliminierung von Doppelbuchungen. Das System garantiert, dass kein Kunde einen Platz kauft, der physisch nicht existiert.",
  },
  {
    id: "stripe-woo",
    product: "Stripe & WooCommerce",
    title: "Zentrale Drehscheibe für Ihr Kapital",
    description:
      "Wenn Amelia den zu zahlenden Betrag übergibt, kommt Stripe ins Spiel. Es zieht die Mittel sofort und sicher von der Karte oder dem Smartphone des Kunden ein (Apple Pay). Handelt es sich um einen Franchise‑Standort, teilt Stripe Connect die Zahlung automatisch auf – die Lizenzgebühr an Sie, den Umsatz an den Partner. Für wiederkehrende Abonnements (Salinapass) initiiert WooCommerce monatlich automatische Abbuchungen ohne Ihr Zutun.",
    insight:
      "Absolute finanzielle Transparenz und garantierte Liquidität. Sie müssen keine manuellen Überweisungen an Franchisenehmer vornehmen, und die monatlichen Abo‑Zahlungen werden vollkommen selbstständig eingezogen.",
  },
  {
    id: "ready2order",
    product: "ready2order & Fiskaly (TSE)",
    title: "Automatisierte TSE-Fiskalisierung",
    description:
      "Sobald Stripe die erfolgreiche Zahlung meldet, sendet unser System ein Hintergrundsignal an die Cloud‑Kasse ready2order. Das Modul Fiskaly versieht die Transaktion sofort mit einer kryptografischen Signatur (TSE). Anschließend wird der legale Beleg automatisch an die E‑Mail des Kunden angehängt oder auf dem Bondrucker der Filiale ausgedruckt.",
    insight:
      "Compliance‑as‑a‑Service. Ihr Unternehmen ist vollständig vor Bußgeldern des deutschen Finanzamts (KassenSichV) geschützt. Die Berichterstattung erfolgt perfekt und ohne jegliches manuelles Eingreifen des Rezeptionspersonals.",
  },
  {
    id: "ai-whatsapp",
    product: "AI Engine & WhatsApp Cloud API",
    title: "Smarter Omnichannel-Service",
    description:
      "Ein intelligenter Bot (auf Basis der AI Engine) beantwortet Kundenfragen auf der Website und filtert Routinearbeiten heraus. Nach erfolgreicher Buchung sendet das System über die offizielle WhatsApp Cloud API sofort eine fürsorgliche Nachricht mit dem Ticket und den genauen Besuchsregeln an den Gast.",
    insight:
      "Fünf‑Sterne‑Service ohne Personalaufstockung. Ihr Team wird von Routineanrufen entlastet, und Ihre Kunden verpassen dank rechtzeitiger und bequemer Erinnerungen in ihrem Lieblings‑Messenger niemals ihre Sitzungen.",
  },
  {
    id: "automator",
    product: "Uncanny Automator",
    title: "Der Dirigent Ihres digitalen Ökosystems",
    description:
      "Damit all diese Werkzeuge reibungslos zusammenarbeiten, setzen wir einen lokalen Aufgaben‑Dispatcher ein – den Uncanny Automator. Er erkennt, dass ein Kunde ein Abo bezahlt hat, und verleiht ihm sofort den VIP‑Status. Er liest die Marketing‑Einwilligung aus und überträgt den Kontakt mit dem korrekten Standort‑Tag an das Marketingsystem.",
    insight:
      "Absolute Datensicherheit (DSGVO) und null Kosten für externe Dienste. Die gesamte Übertragungslogik arbeitet lokal auf Ihren Servern, ohne angreifbare externe Vermittlerplattformen.",
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
export default function TechEcosystemPage() {
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
              Tech Ecosystem
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Orchestration
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie perfekt aufeinander abgestimmte Werkzeuge eine nahtlose
              Service‑Symphonie erzeugen – und warum Sie sich um die Technik nie
              wieder Gedanken machen müssen.
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
                        Tech Ecosystem
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Orchestration
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
                      {/* 1. ShieldCheck (Friendly Captcha) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      {/* 2. Calendar (Amelia) - 60° */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Calendar className="w-5 h-5" />
                      </div>
                      {/* 3. CreditCard (Stripe) - 120° */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      {/* 4. FileText (ready2order) - 180° */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <FileText className="w-5 h-5" />
                      </div>
                      {/* 5. MessageCircle (WhatsApp) - 240° */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-green-500">
                        <MessageCircle className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: Captcha & Matomo */}
              {activeSceneId === "captcha-matomo" && (
                <motion.div
                  key="captcha-matomo"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-green-500 rounded-full"
                        />
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-xs text-green-700 font-bold mb-4">
                      Friendly Captcha: Mensch erkannt
                    </p>
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
                    <p className="text-xs text-slate-500 mt-3 text-center">
                      Matomo: Besucherquelle erfasst
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Amelia */}
              {activeSceneId === "amelia" && (
                <motion.div
                  key="amelia"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="text-sm font-bold text-slate-500 mb-4">
                      Live‑Kalender
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {["12:00", "13:00", "14:00"].map((time, i) => (
                        <div
                          key={time}
                          className={cn(
                            "p-4 rounded-2xl border text-center font-bold text-sm",
                            i === 2
                              ? "bg-salina-orange/10 border-salina-orange/30 text-salina-dark relative overflow-hidden"
                              : "bg-slate-50 border-slate-100 text-slate-500",
                          )}
                        >
                          {time}
                          {i === 2 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <Lock className="w-6 h-6 text-salina-orange" />
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-4 text-center">
                      Slot erfolgreich blockiert
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Stripe & WooCommerce */}
              {activeSceneId === "stripe-woo" && (
                <motion.div
                  key="stripe-woo"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="text-center">
                      <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-4xl mb-4"
                      >
                        🪙 50,00 €
                      </motion.div>
                      <div className="flex items-center justify-center gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 text-green-700 font-bold text-sm"
                        >
                          45,00 € Partner
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 }}
                          className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3 text-yellow-700 font-bold text-sm"
                        >
                          5,00 € Royalty
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: ready2order & Fiskaly */}
              {activeSceneId === "ready2order" && (
                <motion.div
                  key="ready2order"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="text-center">
                      <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-5xl mb-4"
                      >
                        🧾
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="bg-green-50 border-2 border-green-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto"
                      >
                        <ShieldCheck className="w-8 h-8 text-green-600" />
                      </motion.div>
                      <p className="text-xs text-green-700 font-bold mt-3">
                        TSE‑Signatur aktiv
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: AI Engine & WhatsApp */}
              {activeSceneId === "ai-whatsapp" && (
                <motion.div
                  key="ai-whatsapp"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2rem] p-6 shadow-lg">
                      <Bot className="w-8 h-8 text-salina-orange mx-auto mb-3" />
                      <div className="bg-salina-orange/10 rounded-2xl p-3 text-xs text-salina-dark">
                        Alles klar! Ihr Parkplatz ist direkt hinter dem Gebäude.
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-slate-900 rounded-[2rem] p-6 shadow-lg"
                    >
                      <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                      <div className="bg-white/10 rounded-2xl p-3 text-xs text-white/70">
                        🎟️ Ihr La Salina Ticket ist bereit! Bis morgen.
                      </div>
                    </motion.div>
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
                        <Star className="w-6 h-6 text-yellow-500" />
                      </motion.div>
                      <motion.div
                        animate={{ x: [30, 0, 0], opacity: [0, 1, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                        className="absolute right-1/4 top-1/2 -translate-y-1/2"
                      >
                        <MessageCircle className="w-6 h-6 text-green-500" />
                      </motion.div>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 text-center">
                      Alle Systeme arbeiten lokal zusammen
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
            Das Arsenal der Inhaberin
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese Werkzeuge bilden das Fundament, auf dem Ihr gesamtes
            Unternehmen ruht – zuverlässig, sicher und jederzeit bereit für
            Wachstum.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: WooCommerce (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="E‑Commerce‑Boutique (WooCommerce)"
            description="Modul zum Verkauf digitaler Geschenkgutscheine, physischer Begleitprodukte und eines internen, geschlossenen B2B‑Marktplatzes zur Versorgung der Franchisenehmer."
            insight="Generierung zusätzlicher Einnahmen. Sie verkaufen nicht nur Dienstleistungen, sondern auch materielle Waren und Gutscheine, die Kunden automatisch zu einem späteren Zeitpunkt an Freunde versenden können (zeitversetzte Zustellung) – das steigert die Markenbekanntheit."
            icon={Gift}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center cursor-pointer mx-auto w-32"
            >
              <Gift className="w-8 h-8 text-yellow-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-yellow-700">
                100 € Gutschein
              </p>
            </motion.div>
          </BentoCard>

          {/* Блок 2: Brevo (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Hochpräzises Marketing (Brevo)"
            description="Europäisches CRM‑System für E‑Mail‑Marketing. Es segmentiert Kunden automatisch nach Städten und deren Aktionen."
            insight="Automatische Kundenbindung (Retention) und einwandfreier DSGVO‑Schutz. Das System gratuliert dem Kunden selbstständig zum Feiertag oder bietet einem „schlafenden“ Gast einen Rabatt an – und generiert so Wiederholungskäufe ohne manuelle Arbeit des Marketings."
            icon={Mail}
          >
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                Geburtstag
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                München
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                VIP
              </div>
            </div>
          </BentoCard>

          {/* Блок 3: AffiliateWP */}
          <BentoCard
            title="Virales Wachstum (AffiliateWP)"
            description="Motor des Empfehlungsprogramms. Er generiert einzigartige Promo‑Codes für Kunden und schreibt virtuelle Euro (Store Credit) für geworbene Freunde gut."
            insight="Organische Neukundengewinnung ohne Werbebudget. Durch den vollständigen Verzicht auf Cookies arbeitet dieses System zu 100 % zuverlässig und legal und verwandelt loyale Gäste in kostenlose Markenbotschafter."
            icon={Users}
          >
            <div className="text-center">
              <div className="text-lg font-mono font-black text-salina-dark">
                MARIA20
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-2xl mt-2"
              >
                🪙
              </motion.div>
              <p className="text-xs text-salina-orange font-bold mt-1">
                + 10 € Store Credit
              </p>
            </div>
          </BentoCard>

          {/* Блок 4: Amelia Backend (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Globaler Master‑Control (Amelia Backend)"
            description="Geschlossene Verwaltungsoberfläche für Zeitpläne, Filialen, Kapazitäten und Preise. Hier sieht die Inhaberin die konsolidierte Analyse und steuert das gesamte Unternehmen mit einem Klick."
            insight="100 % No‑Code‑Unternehmenssteuerung. Sie brauchen keine IT‑Fachleute, um den Wochenendpreis zu ändern oder einen neuen Raum hinzuzufügen. Alles geschieht visuell, schnell und absolut zuverlässig."
            icon={TrendingUp}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span>12:00 – Familie Müller</span>
                <span className="text-salina-orange font-bold">→ 14:00</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  className="h-full bg-green-500 rounded-full"
                />
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-2 mx-auto" />
            </div>
          </BentoCard>

          {/* Блок 5: Raidboxes & Next.js */}
          <BentoCard
            title="Digitale Souveränität (Raidboxes & Next.js)"
            description="Raidboxes bietet sicheres Premium‑Hosting in Deutschland. Next.js und native Blöcke sorgen für blitzschnelles Frontend‑Rendering ohne schwere Builder."
            insight="Granitharte Stabilität, Barrierefreiheit und sofortige Ladezeiten. Ihre Website fällt bei Besucheranstürmen niemals aus, und die Seitengeschwindigkeit garantiert Spitzenplätze in der lokalen Google‑Suche (SEO)."
            icon={Server}
          >
            <div className="w-32 h-32 mx-auto relative">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
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
          </BentoCard>

          {/* Блок 6: LMS Portal */}
          <BentoCard
            title="Akademie der Standards (LMS Portal)"
            description="Internes Lernmanagementsystem für das Onboarding neuer Franchisenehmer und ihrer Mitarbeiter durch Video‑Mikrolernen."
            insight="Skalierbarer Wissenstransfer. Sie müssen nicht zu Dienstreisen antreten, um das Personal jeder neuen Filiale zu schulen. Alle Qualitätsstandards werden automatisiert vermittelt und garantieren einheitlichen Premium‑Service im gesamten Netzwerk."
            icon={GraduationCap}
          >
            <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
              <GraduationCap className="w-8 h-8 text-salina-orange mx-auto mb-2" />
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="h-full bg-salina-orange rounded-full"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-2 inline-flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1 text-xs font-bold text-yellow-700"
              >
                <Star className="w-3 h-3" /> Zertifiziert
              </motion.div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
