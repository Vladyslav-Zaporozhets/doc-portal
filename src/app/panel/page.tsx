"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  ArrowRight,
  CreditCard,
  Receipt,
  EyeOff,
  Search,
  Lock,
  Building2,
  Users,
  Wallet,
  Crown,
  ShieldCheck,
  MessageCircle,
  Clock,
  CheckCircle2,
  Database,
  Package,
  ShieldAlert,
  User,
  LayoutDashboard,
  CalendarDays,
  FileText,
  HeartPulse,
  Gift,
  RefreshCcw,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ДАНІ СЦЕН SCROLLYTELLING (Customer Panel) ---
const SCENES = [
  {
    id: "unified-hub",
    title: "Einheitlicher Kunden-Hub.",
    description:
      "Wir haben die Fragmentierung beseitigt. Statt getrennter Konten für Shop und Buchungen ist das Amelia-Interface nahtlos in das WooCommerce 'My Account'-Dashboard integriert. Der Kunde sieht eine zentrale Übersicht seiner anstehenden und vergangenen Besuche, den Abo-Status sowie ausstehende Zahlungen.",
    insight:
      "Der Kunde wird nicht verwirrt. Bricht eine Zahlung z.B. wegen schlechtem Internet ab, klickt er einfach auf «Pay Now» neben seiner Reservierung im Dashboard und schließt die Transaktion ab. Das rettet Ihre Conversion.",
  },
  {
    id: "smart-refunds",
    title: "Umbuchung & Auto-Refund ohne Rezeption.",
    description:
      "Kunden verwalten ihre Pläne selbstständig. Storniert ein Kunde rechtzeitig (vor der Stornofrist), gibt das System den Slot im Live-Kalender frei und erstattet das Geld automatisch via Stripe. Zur Kapitalbindung kann der Kunde wählen, ob die Stornierung in Store Credit (virtuelle Euros) umgewandelt wird.",
    insight:
      "Ihre Administratoren müssen keine hunderten Anrufe («Bitte verschieben Sie meinen Termin») mehr beantworten oder manuelle Rückerstattungen durchführen. Alles läuft wie ein Schweizer Uhrwerk.",
  },
  {
    id: "digital-passes",
    title: "Das Ende der Papierstempelkarten.",
    description:
      "Besitzer von Dienstleistungspaketen (10er-Karten) sehen im Dashboard einen visuellen Zähler ihrer verbleibenden Sitzungen und das Ablaufdatum (FOMO). Buchungen über Pakete erfolgen in 2 Sekunden – das System erkennt das Guthaben und aktiviert die Zero-Checkout Magie (0 €) ohne Stripe-Aufruf.",
    insight:
      "Ein Kunde kann sogar einen Termin für die Großmutter buchen (Family Sharing). Das System bucht 1 Sitzung vom Guthaben der Mutter ab und sendet das E-Ticket direkt an die Großmutter.",
  },
  {
    id: "subscription-control",
    title: "Abonnement-Verwaltung (Self-Service).",
    description:
      "Besitzer des Salinapasses haben die volle Kontrolle: Sie können abgelaufene Kreditkarten über das sichere Stripe Customer Portal aktualisieren, den Tarif wechseln oder das Abo während des Urlaubs pausieren.",
    insight:
      "Schlägt eine Zahlung fehl, setzt das System das Abo automatisch auf 'On-Hold' und entzieht dem Kunden den VIP-Rabatt (Zero-Checkout), bis die Schuld beglichen ist. Keine Besuche auf Pump!",
  },
  {
    id: "ai-concierge",
    title: "Virtueller Concierge 24/7.",
    description:
      "Unten im Dashboard ist stets ein Smart-Support-Widget verfügbar. Ein KI-Bot, trainiert exklusiv auf Ihrer Wissensdatenbank, löst 80% der Routinefragen. Möchte ein Kunde nach Ablauf der Deadline stornieren, führt der Bot eine Smart Escalation direkt zu WhatsApp durch.",
    insight:
      "Der WhatsApp-Link enthält die Booking-ID (%appointment_id%). Der Rezeptionist sieht sofort, wer schreibt, und kann bei Bedarf manuell einen Kulanz-Gutschein ausstellen.",
  },
];

// --- КОМПОНЕНТИ ---

// 1. Блок тексту (Scroll Section)
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
    if (isInView) setActiveScene(id);
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

// 2. Блок Bento Grid (ТЕМНА ТЕМА)
const DarkBentoCard = ({
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
        "bg-slate-900/50 backdrop-blur-2xl border border-white/5 shadow-2xl hover:shadow-[0_20px_60px_rgba(251,146,60,0.1)] hover:border-salina-orange/40 rounded-[2rem] p-6 lg:p-8 flex flex-col relative group transition-all duration-500 overflow-visible",
        className,
      )}
    >
      {/* Tooltip Інсайту */}
      <div className="absolute top-6 right-6 z-50 flex flex-col items-end group/tooltip">
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover/tooltip:bg-slate-900 group-hover/tooltip:text-salina-orange group-hover/tooltip:border-salina-orange/50 group-hover/tooltip:shadow-[0_0_15px_rgba(251,146,60,0.3)] transition-all cursor-help">
          <Info className="w-4 h-4" />
        </div>
        <div className="absolute top-10 right-0 w-64 p-4 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium leading-relaxed rounded-2xl shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none origin-top-right">
          <span className="block text-salina-orange font-bold uppercase tracking-wider mb-1">
            Business Insight
          </span>
          {insight}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 pr-10">
        <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-salina-orange shrink-0 shadow-inner border border-white/5">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg md:text-xl font-black text-white leading-tight">
          {title}
        </h3>
      </div>

      <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6 z-10 max-w-[90%]">
        {description}
      </p>

      {/* Зона для анімації (Темна) */}
      <div className="mt-auto relative z-10 bg-slate-950/50 rounded-2xl border border-white/5 p-4 min-h-[160px] flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// 3. Головний Компонент
export default function CustomerPanel() {
  const [activeSceneId, setActiveSceneId] = useState<string>("header");
  const containerRef = useRef<HTMLDivElement>(null);

  const allSteps = ["header", ...SCENES.map((s) => s.id)];

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] w-full bg-transparent overflow-y-auto snap-y snap-mandatory scroll-smooth relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {/* СТАТУС-БАР СПРАВА */}
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
        {/* ЛІВА КОЛОНКА (Скролл) */}
        <div className="w-full lg:w-1/2 relative z-10 pl-6 lg:pl-16">
          <ScrollSection
            id="header"
            setActiveScene={setActiveSceneId}
            containerRef={containerRef}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink">
              <span className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-salina-dark">
                Customer
              </span>{" "}
              Self-Service
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Ein Apple-ähnliches, zentrales Portal. Ermächtigt Ihre Kunden,
              alles selbst zu regeln und entlastet Ihre Rezeption massiv.
            </p>
            <div className="mt-12 flex items-center gap-4 text-salina-orange font-bold animate-bounce">
              Scrollen Sie nach unten{" "}
              <ArrowRight className="w-5 h-5 rotate-90" />
            </div>
          </ScrollSection>

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
                <div className="bg-orange-50/80 backdrop-blur-md border border-orange-200 rounded-3xl p-6 relative group hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-salina-orange shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-salina-dark uppercase tracking-wider">
                      Business Insight
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
        <div className="hidden lg:flex lg:w-1/2 sticky top-0 h-[100dvh] items-center justify-center p-12 overflow-hidden pointer-events-none">
          <div className="w-full max-w-lg relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* ВІЗУАЛ 0: Header (Клієнтський портал) */}
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
                          Portal Online
                        </span>
                      </div>

                      <span className="font-black text-salina-dark text-xl tracking-tight leading-none mb-1">
                        Self-Service
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Hub
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
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <LayoutDashboard className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-700">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Crown className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-pink">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-green-500">
                        <MessageCircle className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: Unified Hub (Дашборд з оплатою) */}
              {activeSceneId === "unified-hub" && (
                <motion.div
                  key="unified-hub"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden flex"
                >
                  {/* Sidebar */}
                  <div className="w-1/3 bg-slate-50 border-r border-slate-100 p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-salina-dark font-black text-sm mb-4">
                      <User className="w-4 h-4 text-salina-orange" /> Hanna M.
                    </div>
                    <div className="bg-orange-50 text-salina-orange text-xs font-bold p-2 rounded-lg cursor-pointer">
                      Termine
                    </div>
                    <div className="text-slate-500 text-xs font-bold p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                      Abonnements
                    </div>
                    <div className="text-slate-500 text-xs font-bold p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                      Wallet
                    </div>
                  </div>
                  {/* Main Content */}
                  <div className="w-2/3 p-4 flex flex-col justify-center">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">
                      Anstehende Besuche
                    </div>
                    <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm font-bold text-salina-dark">
                            Heute, 14:00
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Salzraum München
                          </div>
                        </div>
                        <motion.div
                          animate={{ opacity: [1, 0, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 4,
                            times: [0, 0.4, 1],
                          }}
                          className="bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded"
                        >
                          Pending
                        </motion.div>
                        <motion.div
                          animate={{ opacity: [0, 0, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 4,
                            times: [0, 0.6, 1],
                          }}
                          className="absolute top-3 right-3 bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2 h-2" /> Approved
                        </motion.div>
                      </div>
                      <motion.div
                        animate={{ opacity: [1, 0, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          times: [0, 0.4, 1],
                        }}
                      >
                        <button className="w-full mt-2 bg-salina-dark text-white text-xs font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 animate-pulse">
                          Pay Now <ArrowRight className="w-3 h-3" />
                        </button>
                      </motion.div>
                      {/* Stripe Loading Overlay */}
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          times: [0, 0.4, 0.6],
                        }}
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center"
                      >
                        <RefreshCcw className="w-5 h-5 text-blue-500 animate-spin" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Smart Refunds (Авто-повернення) */}
              {activeSceneId === "smart-refunds" && (
                <motion.div
                  key="smart-refunds"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[2rem] shadow-2xl p-6 overflow-hidden">
                    {/* Notification */}
                    <motion.div
                      animate={{ y: [-50, 0, 0, -50], opacity: [0, 1, 1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        times: [0, 0.1, 0.9, 1],
                      }}
                      className="absolute top-4 left-4 right-4 bg-green-500 text-white text-[10px] font-bold p-2 rounded-xl shadow-lg flex items-center gap-2 z-20"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> Slot
                      freigegeben. 35,00€ an Karte erstattet.
                    </motion.div>

                    <div className="mt-8 mb-4">
                      <div className="text-lg font-black text-salina-dark mb-1">
                        Morgen, 10:00
                      </div>
                      <div className="text-xs text-slate-500">
                        Kreativraum (2 Kinder)
                      </div>
                    </div>

                    {/* Modal Simulation */}
                    <motion.div
                      animate={{ opacity: [1, 1, 0, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        times: [0, 0.4, 0.5, 1],
                      }}
                      className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-end p-4 z-10"
                    >
                      <div className="bg-white w-full p-4 rounded-2xl shadow-2xl mb-4">
                        <div className="text-sm font-bold text-salina-dark mb-3 text-center">
                          Stornierungs-Optionen
                        </div>
                        <button className="w-full bg-slate-100 text-slate-600 text-xs font-bold py-2 rounded-xl mb-2 hover:bg-slate-200">
                          In Store Credit umwandeln (35€)
                        </button>
                        <motion.button
                          animate={{
                            backgroundColor: ["#fee2e2", "#f87171", "#fee2e2"],
                            color: ["#b91c1c", "#fff", "#b91c1c"],
                          }}
                          transition={{ duration: 1, repeat: 2 }}
                          className="w-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold py-2 rounded-xl flex justify-center items-center"
                        >
                          Auf Karte erstatten
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Digital Passes (Цифрові абонементи) */}
              {activeSceneId === "digital-passes" && (
                <motion.div
                  key="digital-passes"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[2rem] shadow-2xl p-6 w-full max-w-sm text-center relative overflow-hidden">
                    <div className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                      10er-Karte Salzraum
                    </div>

                    <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#f1f5f9"
                          strokeWidth="12"
                          fill="none"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#fb923c"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="351.8"
                          animate={{ strokeDashoffset: [105.5, 140.7, 105.5] }}
                          transition={{
                            repeat: Infinity,
                            duration: 4,
                            times: [0, 0.5, 1],
                          }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-center">
                        <motion.div
                          className="text-3xl font-black text-salina-dark"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 4,
                            times: [0, 0.4, 1],
                          }}
                        >
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              times: [0, 0.4, 1],
                            }}
                          >
                            7
                          </motion.span>
                          <motion.span
                            className="absolute left-0 right-0 top-0 bottom-0 flex justify-center"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              times: [0, 0.4, 1],
                            }}
                          >
                            6
                          </motion.span>
                        </motion.div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">
                          von 10
                        </div>
                      </div>
                    </div>

                    <motion.button
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        times: [0, 0.4, 1],
                      }}
                      className="w-full bg-salina-orange text-white text-sm font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(251,146,60,0.3)]"
                    >
                      Sitzung buchen
                    </motion.button>

                    {/* Success Overlay */}
                    <motion.div
                      animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        times: [0, 0.4, 1],
                      }}
                      className="absolute inset-0 bg-white/95 backdrop-blur flex flex-col items-center justify-center p-6 z-10 pointer-events-none"
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                      <div className="text-xl font-black text-salina-dark mb-2">
                        Gebucht!
                      </div>
                      <div className="text-sm text-slate-500 text-center">
                        0,00 € (Zero-Checkout)
                        <br />1 Sitzung abgezogen.
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Subscription Control */}
              {activeSceneId === "subscription-control" && (
                <motion.div
                  key="subscription-control"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-[2rem] shadow-2xl p-6 w-full max-w-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 relative">
                          <User className="w-4 h-4" />
                          <motion.div
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              times: [0, 0.5, 1],
                            }}
                            className="absolute -top-1 -right-1 text-yellow-500"
                          >
                            👑
                          </motion.div>
                        </div>
                        <div className="text-sm font-bold text-salina-dark">
                          Max Mustermann
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-sm font-black text-salina-dark mb-1">
                            Salinapass Family
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <CreditCard className="w-3 h-3" /> **** 4242
                          </div>
                        </div>
                        <motion.div
                          animate={{
                            backgroundColor: ["#dcfce7", "#fef3c7", "#dcfce7"],
                            color: ["#15803d", "#b45309", "#15803d"],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 5,
                            times: [0, 0.5, 1],
                          }}
                          className="text-[9px] font-bold px-2 py-1 rounded"
                        >
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              times: [0, 0.5, 1],
                            }}
                          >
                            Active
                          </motion.span>
                          <motion.span
                            className="absolute left-2"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              times: [0, 0.5, 1],
                            }}
                          >
                            On-Hold
                          </motion.span>
                        </motion.div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold py-2 rounded-xl">
                          Upgrade
                        </button>
                        <motion.button
                          animate={{
                            backgroundColor: ["#f1f5f9", "#fb923c", "#f1f5f9"],
                            color: ["#475569", "#fff", "#475569"],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 5,
                            times: [0, 0.2, 1],
                          }}
                          className="flex-1 bg-slate-100 text-slate-600 text-xs font-bold py-2 rounded-xl"
                        >
                          Pausieren
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: AI-Concierge */}
              {activeSceneId === "ai-concierge" && (
                <motion.div
                  key="ai-concierge"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="bg-slate-50 border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-sm flex flex-col h-80">
                    <div className="bg-white p-3 border-b border-slate-200 flex items-center gap-2">
                      <div className="w-8 h-8 bg-salina-orange/10 rounded-full flex items-center justify-center text-salina-orange">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-salina-dark">
                          La Salina Support
                        </div>
                        <div className="text-[9px] text-green-500 font-bold">
                          Online (KI-Agent)
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-end space-y-3">
                      <div className="bg-salina-orange text-white text-xs p-3 rounded-2xl rounded-tr-sm ml-auto max-w-[85%] shadow-sm">
                        Mein Kind ist krank, wie kann ich für heute absagen?
                      </div>
                      <motion.div
                        animate={{ opacity: [0, 1] }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="bg-white border border-slate-200 text-slate-600 text-xs p-3 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm"
                      >
                        Die kostenfreie Stornofrist ist leider abgelaufen. Ich
                        verbinde Sie direkt mit der Rezeption für eine
                        Kulanzlösung!
                      </motion.div>
                      <motion.button
                        animate={{ opacity: [0, 1], y: [10, 0] }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="w-full bg-green-500 text-white text-xs font-bold py-3 rounded-xl shadow-lg flex justify-center items-center gap-2 mt-2 hover:bg-green-600"
                      >
                        <MessageCircle className="w-4 h-4" /> In WhatsApp klären
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- ЧАСТИНА 2: ENTERPRISE BENTO GRID (ТЕМНА ТЕМА) --- */}
      <div className="w-full snap-start py-24 px-6 lg:px-16 relative z-20 bg-slate-950 border-t border-slate-800 rounded-[40px]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-salina-orange/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider mb-6 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-salina-orange" /> Data & Security
            Control
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Das Enterprise Kundenportal
          </h2>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Vollständige DSGVO-Konformität, automatisches Dokumentenmanagement
            und ein Cookie-freies Loyalitätsprogramm.
          </p>
        </div>

        {/* Сітка Bento Grid 3x3 */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Блок 1: Invoice Hub (Широкий) */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Invoice Hub: Alle Dokumente griffbereit"
            description="Das Dashboard speichert alle Transaktionsdokumente sicher. Der Kunde kann mit einem Klick die B2B-Rechnung (PDF/XML) oder das E-Ticket mit QR-Code für jeden vergangenen oder zukünftigen Besuch herunterladen."
            insight="Perfekt für Firmenkunden (Kitas, Schulen), die Belege für die Buchhaltung benötigen. Keine manuellen E-Mails durch die Rezeption mehr nötig."
            icon={FileText}
          >
            <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-xl p-4 overflow-hidden relative group/invoice">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm font-bold text-white">
                  Besuch: 12. Mai
                </div>
                <div className="text-xs text-slate-400 font-mono">#ORD-992</div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors">
                  <Receipt className="w-3 h-3" /> PDF Rechnung
                </button>
                <button className="flex-1 bg-salina-orange hover:bg-orange-500 text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors">
                  <Smartphone className="w-3 h-3" /> QR-Ticket
                </button>
              </div>
              {/* Hover QR Preview */}
              <div className="absolute -bottom-10 right-4 w-16 h-16 bg-white rounded-lg shadow-2xl p-1 opacity-0 group-hover/invoice:opacity-100 group-hover/invoice:-translate-y-12 transition-all duration-300 flex flex-col items-center justify-center pointer-events-none">
                <div className="w-full h-full bg-slate-900 rounded-sm"></div>
                <div className="text-[6px] font-bold text-salina-dark mt-0.5">
                  Apple Wallet
                </div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 2: Store Credit (Високий) */}
          <DarkBentoCard
            className="lg:row-span-2"
            title="Cookie-less Empfehlungen"
            description="Der Kunde sieht seinen persönlichen Promo-Code für Freunde und das Guthaben (virtuelle Euros), das er durch deren Besuche verdient hat. Das System trackt Leads streng ohne Cookies (AdBlocker- und DSGVO-sicher)."
            insight="Nutzt ein Freund den Code, bindet das virtuelle Geld (Store Credit) das Kapital auf Ihrer Plattform und zwingt den Botschafter (Kunden) zu einer erneuten Buchung."
            icon={Gift}
          >
            <div className="w-full h-full flex flex-col justify-center items-center py-4 relative">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-0 right-4 text-2xl"
              >
                🎉
              </motion.div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                Dein Promo-Code
              </div>
              <div className="bg-slate-800 border border-dashed border-salina-orange/50 px-4 py-2 rounded-xl text-lg font-mono text-white mb-6">
                MARIA2026
              </div>

              <div className="bg-slate-800 border border-slate-700 w-full rounded-2xl p-4 text-center relative overflow-hidden">
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    times: [0, 0.2, 0.4],
                  }}
                  className="absolute top-2 left-0 right-0 text-[9px] text-green-400 font-bold bg-green-500/10 py-1"
                >
                  Ein Freund hat gebucht! +5€
                </motion.div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 mt-4">
                  Wallet Balance
                </div>
                <motion.div
                  className="text-3xl font-black text-salina-orange"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    times: [0, 0.2, 0.4],
                  }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      times: [0, 0.2, 0.4],
                    }}
                  >
                    15,00 €
                  </motion.span>
                  <motion.span
                    className="absolute left-0 right-0 flex justify-center"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      times: [0, 0.2, 0.4],
                    }}
                  >
                    20,00 €
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 3: DSGVO Löschfunktion */}
          <DarkBentoCard
            className="lg:col-span-1"
            title="Recht auf Vergessenwerden"
            description="Der Nutzer hat die native Möglichkeit, sein Profil mit einem Klick zu löschen und persönliche Daten (PII) zu anonymisieren. Ein Daten-Archiv (Auskunftsrecht) ist ladbar."
            insight="Sie handeln 100% gesetzeskonform. Depersonalisierte Finanzbelege (ready2order) bleiben für das Finanzamt unangetastet erhalten."
            icon={ShieldAlert}
          >
            <div className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl relative overflow-hidden">
              <div className="text-sm font-bold text-white mb-3">
                Privatsphäre
              </div>
              <motion.button
                animate={{ opacity: [1, 0, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  times: [0, 0.2, 1],
                }}
                className="w-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold py-2 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                Konto löschen
              </motion.button>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  times: [0, 0.3, 0.9],
                }}
                className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center"
              >
                <ShieldCheck className="w-8 h-8 text-green-500 mb-2" />
                <div className="text-xs font-bold text-green-400">
                  Daten anonymisiert
                </div>
              </motion.div>
            </div>
          </DarkBentoCard>

          {/* Блок 4: Stornofrist (Широкий) */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Algorithmischer Umsatzschutz (Stornofrist)"
            description="Die Inhaberin definiert die Deadline für kostenfreie Stornierungen. Verstreicht diese Zeit (z.B. <24h vor dem Termin), werden die Storno-Buttons im Dashboard algorithmisch gesperrt."
            insight="Der Kunde kann das Geld in letzter Minute physisch nicht zurückfordern (Auto-Refund wird blockiert). Die finanziellen Interessen des Unternehmens sind sicher geschützt."
            icon={Clock}
          >
            <div className="flex w-full gap-4 items-center">
              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4">
                <div className="text-sm font-bold text-white mb-1">
                  Heute, 18:00
                </div>
                <div className="text-xs text-slate-400 mb-4">Salzraum</div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-700 text-slate-300 text-xs font-bold py-2 rounded-lg opacity-50 cursor-not-allowed flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Umbuchen
                  </button>
                  <button className="flex-1 bg-slate-700 text-slate-300 text-xs font-bold py-2 rounded-lg opacity-50 cursor-not-allowed flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Stornieren
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-red-400 mb-1">
                      Stornofrist abgelaufen
                    </div>
                    <div className="text-[10px] text-slate-300 leading-snug">
                      Weniger als 24h bis zum Termin. Bitte kontaktieren Sie die
                      Rezeption.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 5: Medical Custom Fields */}
          <DarkBentoCard
            className="lg:col-span-1"
            title="Medizinisches Profil (CRM)"
            description="Kunden können Allergien oder Besonderheiten jederzeit im Profil aktualisieren. Diese Custom Fields synchronisieren sich in Echtzeit mit der globalen CRM-Datenbank."
            insight="Der Rezeptionist sieht aktuelle rote Warnmarker, noch bevor der Gast die Einrichtung betritt."
            icon={HeartPulse}
          >
            <div className="w-full flex items-center gap-3 bg-slate-800 border border-slate-700 p-3 rounded-xl relative overflow-hidden">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                  Allergien eingeben:
                </div>
                <div className="bg-slate-900 border border-slate-600 text-xs text-white p-1.5 rounded font-mono">
                  Laktose
                </div>
              </div>
              <motion.div
                animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute right-4 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,1)]"
              ></motion.div>
            </div>
          </DarkBentoCard>

          {/* Блок 6: Restguthaben */}
          <DarkBentoCard
            className="lg:col-span-1"
            title="Smarte Restguthaben"
            description="Hat der Kunde einen 100€ Gutschein und 40€ ausgegeben, zeigt das Dashboard den Code und das verbleibende Restguthaben präzise an."
            insight="Perfekte Einhaltung der deutschen Gesetzgebung (3 Jahre Gültigkeit). Der Kunde weiß, dass er Geld hat und wird garantiert zurückkehren."
            icon={CreditCard}
          >
            <div className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-center relative overflow-hidden">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Gutschein Code
              </div>
              <div className="text-sm font-mono text-white mb-4 bg-slate-900 py-1 rounded">
                GIFT-2026-XYZ
              </div>
              <div className="flex justify-between items-end px-2">
                <div className="text-xs text-slate-500 line-through">
                  100,00 €
                </div>
                <div className="text-xl font-black text-salina-orange">
                  60,00 €
                </div>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"
              ></motion.div>
            </div>
          </DarkBentoCard>
        </div>
      </div>
    </div>
  );
}
