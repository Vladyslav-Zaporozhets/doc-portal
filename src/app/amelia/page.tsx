"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  ArrowRight,
  CalendarDays,
  Clock,
  Users,
  Coffee,
  CheckCircle2,
  Bell,
  MessageCircle,
  CreditCard,
  FileText,
  Crown,
  Gift,
  RefreshCcw,
  Smartphone,
  HeartPulse,
  PieChart,
  User,
  MapPin,
  ScanFace,
  ChevronDown,
  Wallet,
  Ticket,
  Building2,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ДАНІ СЦЕН SCROLLYTELLING (Amelia Booking Engine) ---
const SCENES = [
  {
    id: "intuitive-start",
    title: "Buchung, die Gedanken liest.",
    description:
      "Wir erschaffen ein Interface, das sofort versteht, was der Kunde will. Besucht ein Gast die Seite einer bestimmten Stadt, zwingt ihn das System nicht mehr, seinen Standort in langen Dropdowns zu suchen.",
    insight:
      "Ihr Kunde macht keinen einzigen überflüssigen Klick. Je einfacher und eleganter der Weg, desto mehr Buchungen werden erfolgreich abgeschlossen.",
  },
  {
    id: "fomo-traffic",
    title: "Organischer Verkauf ohne Druck.",
    description:
      "Tage mit wenigen Restplätzen leuchten in einem warmen Gelb auf. Dies stimuliert auf natürliche Weise den Buchungsimpuls der Eltern (Fear of Missing Out).",
    insight:
      "Sie erreichen eine frühzeitige Auslastung der Räume. Die Kunden beeilen sich von selbst, die letzten begehrten Tickets zu sichern.",
  },
  {
    id: "invisible-protection",
    title: "Sicherheit der Kinder & Eltern-Lounge.",
    description:
      "Das System verhindert physisch, dass eine Sitzung nur für Kinder gebucht wird – es fordert sanft dazu auf, einen aufsichtspflichtigen Erwachsenen hinzuzufügen. Direkt danach bietet es fürsorglich eine Auszeit in der Eltern-Lounge an.",
    insight:
      "Sie sind zu 100% vor rechtlichen Problemen (Aufsichtspflicht) geschützt. Der Upsell für Kaffee in der Lounge steigert den durchschnittlichen Warenkorbwert organisch.",
  },
  {
    id: "smart-family",
    title: "Smarte Familientarife.",
    description:
      "Das Herz des Systems erkennt die Familienkonstellation selbstständig: Babys sind kostenlos, und für das zweite Kind wird automatisch der spezielle Familientarif angewendet.",
    insight:
      "Eltern müssen nicht mehr anrufen, um nach Rabatten zu fragen. Die Loyalität wird noch vor der Zahlung aufgebaut, und Ihr Personal an der Kasse macht keine Fehler bei den Preisen.",
  },
  {
    id: "lightning-checkout",
    title: "Amazon-Niveau Geschwindigkeit.",
    description:
      "Wir verzichten auf Zwangsregistrierungen und Passwort-Erstellung für Neukunden. Der Gast gibt nur Name und Telefonnummer ein und bezahlt den Besuch in Sekundenschnelle via Apple Pay oder Google Pay.",
    insight:
      "Die Pflichtregistrierung tötet bis zu 35% der Conversions. Ihr Kunde kauft sein Ticket schneller, als er darüber nachdenken kann.",
  },
  {
    id: "waiting-list",
    title: "Die Warteschlange arbeitet für Sie.",
    description:
      "Sind alle Plätze ausverkauft, kann sich der Kunde mit einem Klick in die «Virtuelle Warteliste» eintragen. Sobald jemand anderes storniert, sendet das System sofort eine Einladung an alle Wartenden.",
    insight:
      "Lücken im Zeitplan schließen sich vollautomatisch. Sie verlieren kein Geld mehr, weil jemand kurzfristig krankheitsbedingt absagt.",
  },
  {
    id: "digital-concierge",
    title: "5-Sterne-Service nach dem Kauf.",
    description:
      "Direkt nach der Zahlung erhält der Gast ein elegantes E-Ticket in sein Apple Wallet sowie eine WhatsApp-Nachricht mit der Wegbeschreibung zum Parkplatz.",
    insight:
      "Der Kunde fühlt sich wie ein VIP. Das Ticket poppt automatisch 100 Meter vor der Einrichtung auf dem Display auf und reduziert Verspätungen auf null.",
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

// 2. Блок Bento Grid (СВІТЛА ТЕМА)
const BentoCard = ({
  title,
  description,
  icon: Icon,
  className,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(251,146,60,0.08)] hover:border-salina-orange/30 rounded-[2rem] p-6 lg:p-8 flex flex-col relative group transition-all duration-500 overflow-hidden",
        className,
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-salina-orange shrink-0 shadow-sm border border-orange-100">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg md:text-xl font-black text-salina-dark leading-tight">
          {title}
        </h3>
      </div>

      <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 z-10 max-w-[95%]">
        {description}
      </p>

      {/* Зона для анімації (Світла) */}
      <div className="mt-auto relative z-10 bg-slate-50/80 rounded-2xl border border-slate-100 p-4 min-h-[160px] flex items-center justify-center overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// 3. Головний Компонент
export default function AmeliaBookingEngine() {
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 pb-2 lg:pb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink">
              Frictionless Booking
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Von der ersten Berührung bis zum unvergesslichen Erlebnis. Ein
              Buchungsprozess, der alle Barrieren eliminiert.
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
            {/* ЄДИНА РАМКА СМАРТФОНА ДЛЯ ВСІХ СЦЕН (крім Header) */}
            <AnimatePresence mode="wait">
              {/* ВІЗУАЛ 0: Header (Орбіти бронювання) */}
              {activeSceneId === "header" ? (
                <motion.div
                  key="header-visual"
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
                        Amelia Core
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Engine
                      </span>
                    </div>

                    {/* Внутрішня орбіта */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                      }}
                      className="absolute inset-[-30px] border border-dashed border-slate-300 rounded-full"
                    />

                    {/* Зовнішня орбіта з тематичними іконками */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                      }}
                      className="absolute inset-[-70px] border border-slate-200 rounded-full"
                    >
                      {/* 1. Календар */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      {/* 2. Користувачі/Сім'я */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Users className="w-5 h-5" />
                      </div>
                      {/* 3. Lounge (Кава) */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-600">
                        <Coffee className="w-5 h-5" />
                      </div>
                      {/* 4. Оплата */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-700">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      {/* 5. Таймер/Очікування */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-pink">
                        <Clock className="w-5 h-5" />
                      </div>
                      {/* 6. Смартфон (Квитки) */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-green-500">
                        <Smartphone className="w-5 h-5" />
                      </div>

                      {/* Пульсуюча точка, що летить по орбіті */}
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
              ) : (
                <motion.div
                  key="smartphone"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="relative w-[300px] h-[580px] bg-slate-950 border-[10px] border-slate-800 rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-col"
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center gap-2">
                    <div className="w-12 h-1 bg-slate-900 rounded-full"></div>
                    <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                  </div>

                  {/* Внутрішній контент екрана, який змінюється */}
                  <div className="relative w-full h-full bg-slate-50 flex flex-col overflow-hidden pt-10">
                    <AnimatePresence mode="wait">
                      {/* Сцена 1: Інтуїтивний старт */}
                      {activeSceneId === "intuitive-start" && (
                        <motion.div
                          key="sc1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-4 w-full h-full flex flex-col items-center justify-center"
                        >
                          <motion.div
                            animate={{
                              opacity: [1, 0, 0],
                              scale: [1, 0.9, 0.9],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              times: [0, 0.4, 1],
                            }}
                            className="w-full bg-white border border-slate-200 p-4 rounded-xl shadow-lg absolute z-10 flex justify-between items-center"
                          >
                            <span className="text-sm font-bold text-slate-700">
                              München
                            </span>{" "}
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          </motion.div>
                          <motion.div
                            animate={{ opacity: [0, 1, 1], y: [20, 0, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              times: [0, 0.5, 1],
                            }}
                            className="w-full bg-white border border-slate-200 p-4 rounded-xl shadow-lg z-20"
                          >
                            <div className="text-sm font-black text-salina-dark mb-4">
                              Wählen Sie einen Termin
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div
                                  key={i}
                                  className="h-8 bg-slate-100 rounded-lg"
                                ></div>
                              ))}
                            </div>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Сцена 2: Світлофор */}
                      {activeSceneId === "fomo-traffic" && (
                        <motion.div
                          key="sc2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-4 w-full h-full pt-12"
                        >
                          <div className="text-sm font-black text-salina-dark mb-4 text-center">
                            Verfügbarkeit im Salzraum
                          </div>
                          <div className="space-y-3">
                            <div className="bg-green-50 border border-green-200 p-3 rounded-xl flex justify-between items-center">
                              <span className="font-bold text-green-800 text-sm">
                                Freitag, 12. Mai
                              </span>
                              <span className="text-[10px] bg-green-200 text-green-800 px-2 py-1 rounded-md font-bold">
                                Frei
                              </span>
                            </div>
                            <motion.div
                              animate={{
                                scale: [1, 1.02, 1],
                                borderColor: ["#fef08a", "#eab308", "#fef08a"],
                              }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="bg-yellow-50 border-2 border-yellow-400 p-3 rounded-xl flex justify-between items-center relative shadow-md"
                            >
                              <span className="font-bold text-yellow-900 text-sm">
                                Samstag, 13. Mai
                              </span>
                              <span className="text-[10px] bg-yellow-200 text-yellow-900 px-2 py-1 rounded-md font-bold animate-pulse">
                                🔥 Nur 2 Plätze
                              </span>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {/* Сцена 3: Невидимий захист (Lounge) */}
                      {activeSceneId === "invisible-protection" && (
                        <motion.div
                          key="sc3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-4 w-full h-full flex flex-col justify-center"
                        >
                          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm mb-4">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm font-bold text-slate-700">
                                Kind (ab 1 Jahr)
                              </span>
                              <span className="text-lg font-black text-salina-dark">
                                1
                              </span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                              <span className="text-sm font-bold text-salina-orange flex items-center gap-1">
                                <Info className="w-4 h-4" /> Erwachsener
                              </span>
                              <span className="text-lg font-black text-salina-orange">
                                1
                              </span>
                            </div>
                          </div>

                          <motion.div
                            animate={{ y: [50, 0, 0], opacity: [0, 1, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              times: [0, 0.2, 1],
                            }}
                            className="bg-amber-50 border border-amber-200 p-4 rounded-xl shadow-lg relative overflow-hidden"
                          >
                            <motion.div
                              animate={{ x: [-100, 300] }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear",
                              }}
                              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                            />
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 shrink-0">
                                <Coffee className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-amber-900">
                                  Auszeit für Sie?
                                </div>
                                <div className="text-[10px] text-amber-800/80">
                                  Kaffee & Eltern-Lounge zubuchen.
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Сцена 4: Розумні тарифи */}
                      {activeSceneId === "smart-family" && (
                        <motion.div
                          key="sc4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-4 w-full h-full flex flex-col justify-center gap-3"
                        >
                          <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-700">
                              Kind 1
                            </span>
                            <span className="font-mono font-bold text-slate-500">
                              15,00 €
                            </span>
                          </div>
                          <motion.div
                            animate={{
                              scale: [0.95, 1, 1],
                              opacity: [0, 1, 1],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              times: [0, 0.2, 1],
                            }}
                            className="bg-slate-100 border border-slate-200 p-3 rounded-xl flex justify-between items-center relative overflow-hidden"
                          >
                            <span className="text-sm font-bold text-slate-700">
                              Baby (unter 1)
                            </span>
                            <div className="flex flex-col items-end">
                              <span className="text-[10px] font-mono text-slate-400 line-through">
                                15,00 €
                              </span>
                              <span className="font-mono font-black text-green-500">
                                0,00 €
                              </span>
                            </div>
                          </motion.div>
                          <motion.div
                            animate={{
                              scale: [0.95, 1, 1],
                              opacity: [0, 1, 1],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              times: [0, 0.4, 1],
                              delay: 0.5,
                            }}
                            className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex justify-between items-center relative overflow-hidden shadow-md"
                          >
                            <motion.div
                              animate={{ y: [-10, 10, -10] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="absolute left-2 top-2 text-xl"
                            >
                              🎉
                            </motion.div>
                            <span className="text-sm font-bold text-blue-900 ml-6">
                              Kind 2
                            </span>
                            <div className="flex flex-col items-end">
                              <span className="text-[8px] font-bold text-white bg-blue-500 px-1.5 py-0.5 rounded mb-1 uppercase tracking-wider">
                                Family Rabatt
                              </span>
                              <span className="font-mono font-black text-blue-600">
                                10,00 €
                              </span>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Сцена 5: Блискавична покупка */}
                      {activeSceneId === "lightning-checkout" && (
                        <motion.div
                          key="sc5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full h-full bg-slate-100 flex flex-col justify-end"
                        >
                          <motion.div
                            animate={{
                              y: [200, 0, 0, 200],
                              opacity: [1, 1, 1, 1],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              times: [0, 0.2, 0.8, 1],
                            }}
                            className="bg-white rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col items-center"
                          >
                            <div className="text-center mb-6">
                              <div className="text-sm font-bold text-slate-500 mb-1">
                                Zahlung an La Salina
                              </div>
                              <div className="text-3xl font-black text-salina-dark">
                                35,00 €
                              </div>
                            </div>
                            <motion.div
                              animate={{ opacity: [1, 0, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 5,
                                times: [0, 0.4, 1],
                              }}
                              className="w-full bg-black text-white rounded-xl py-4 flex items-center justify-center gap-2 mb-4"
                            >
                              <span className="text-lg"></span>{" "}
                              <span className="font-bold text-sm">Pay</span>
                            </motion.div>

                            {/* FaceID / Success */}
                            <motion.div
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0.8, 1, 1],
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 5,
                                times: [0, 0.45, 0.6],
                              }}
                              className="absolute inset-0 bg-white/95 flex items-center justify-center"
                            >
                              <ScanFace className="w-16 h-16 text-blue-500 animate-pulse" />
                            </motion.div>
                            <motion.div
                              animate={{
                                opacity: [0, 0, 1, 1],
                                scale: [0.8, 0.8, 1, 1],
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 5,
                                times: [0, 0.6, 0.7, 1],
                              }}
                              className="absolute inset-0 bg-green-500 flex flex-col items-center justify-center text-white"
                            >
                              <CheckCircle2 className="w-16 h-16 mb-2" />
                              <div className="font-bold">Bezahlt</div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Сцена 6: Список очікування */}
                      {activeSceneId === "waiting-list" && (
                        <motion.div
                          key="sc6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-4 w-full h-full pt-10 relative"
                        >
                          <div className="text-sm font-black text-salina-dark mb-4 text-center">
                            14:00 Uhr
                          </div>
                          <motion.div
                            animate={{
                              scale: [1, 0.95, 1],
                              opacity: [1, 0, 0],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 6,
                              times: [0, 0.2, 1],
                            }}
                            className="bg-red-50 border border-red-200 p-4 rounded-xl text-center shadow-sm"
                          >
                            <div className="text-red-600 font-bold mb-2">
                              Ausgebucht
                            </div>
                            <button className="bg-white border border-red-200 text-red-600 text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-full mx-auto">
                              <Bell className="w-3 h-3" /> Warteliste
                            </button>
                          </motion.div>

                          {/* Push Notification */}
                          <motion.div
                            animate={{
                              y: [-20, 0, 0, -20],
                              opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 6,
                              times: [0, 0.4, 0.8, 1],
                            }}
                            className="absolute top-12 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white/20 p-3 rounded-2xl flex items-start gap-3 shadow-2xl z-20"
                          >
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                              <Bell className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-[10px] font-bold text-slate-800">
                                La Salina
                              </div>
                              <div className="text-[10px] text-slate-600 leading-snug">
                                Ein Platz um 14:00 ist frei! Buchen Sie jetzt.
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Сцена 7: Цифровий консьєрж */}
                      {activeSceneId === "digital-concierge" && (
                        <motion.div
                          key="sc7"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full h-full bg-slate-900 relative"
                        >
                          {/* Wallpaper */}
                          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 opacity-80" />
                          <div className="absolute top-16 w-full text-center text-white/50 text-5xl font-extralight tracking-tighter">
                            14:02
                          </div>

                          <div className="w-full h-full relative z-20 flex flex-col pt-36 px-3 gap-2">
                            <motion.div
                              animate={{ y: [-20, 0], opacity: [0, 1] }}
                              transition={{ delay: 0.5, type: "spring" }}
                              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl flex items-start gap-3"
                            >
                              <div className="w-8 h-8 bg-black/50 rounded-lg flex items-center justify-center shrink-0">
                                <Wallet className="w-4 h-4 text-white" />
                              </div>
                              <div className="mt-0.5">
                                <p className="text-xs font-bold text-white mb-0.5">
                                  Apple Wallet
                                </p>
                                <p className="text-[10px] text-white/80 leading-snug">
                                  🎟️ Ihr Relax-Besuch startet in 2 Stunden!
                                </p>
                              </div>
                            </motion.div>

                            <motion.div
                              animate={{ y: [-20, 0], opacity: [0, 1] }}
                              transition={{ delay: 1.5, type: "spring" }}
                              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl flex items-start gap-3"
                            >
                              <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center shrink-0">
                                <MessageCircle className="w-4 h-4 text-green-400" />
                              </div>
                              <div className="mt-0.5">
                                <p className="text-xs font-bold text-white mb-0.5">
                                  WhatsApp
                                </p>
                                <p className="text-[10px] text-white/80 leading-snug">
                                  Wir freuen uns auf Sie! Route hier 📍
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- ЧАСТИНА 2: ENTERPRISE BENTO GRID (СВІТЛА ТЕМА) --- */}
      <div className="w-full snap-start py-24 px-6 lg:px-16 relative z-20 bg-transparent">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-salina-orange/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider mb-6 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-salina-orange" /> Enterprise
            Booking Management
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-salina-dark tracking-tight mb-4">
            Kontrolle auf Expertenniveau
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Drag-and-Drop Kalender, vollautomatisierte B2B-Prozesse und
            Echtzeit-Synchronisation für Ihr Back-Office.
          </p>
        </div>

        {/* Сітка Bento Grid: 8 блоків */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Блок 1: Globaler Kalender */}
          <BentoCard
            className="lg:col-span-2"
            title="Der Kalender, den Sie mit einem Finger steuern"
            description="Vergessen Sie komplizierte Tabellen. Ihr Dashboard zeigt alle Filialen und Räume. Um einen Termin zu verschieben, greifen Sie die Buchung einfach mit der Maus und ziehen sie auf einen anderen Tag (Drag & Drop). Das System sendet automatisch das neue E-Ticket."
            icon={CalendarDays}
          >
            <div className="w-full bg-white border border-slate-200 rounded-xl p-4 overflow-hidden relative shadow-sm">
              <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-2 mb-2 text-[10px] font-bold text-slate-400">
                <div>Montag</div>
                <div>Dienstag</div>
                <div>Mittwoch</div>
              </div>
              <div className="grid grid-cols-3 gap-2 h-20 relative">
                <div className="border-r border-slate-100"></div>
                <div className="border-r border-slate-100"></div>
                <div></div>
                <motion.div
                  animate={{
                    x: [0, 140, 0],
                    y: [0, 10, 0],
                    scale: [1, 1.05, 1],
                    boxShadow: ["none", "0 10px 20px rgba(0,0,0,0.1)", "none"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute top-2 left-2 w-[30%] bg-green-50 border border-green-200 rounded-lg p-2 cursor-grab z-10"
                >
                  <div className="text-[9px] text-green-600 font-bold mb-0.5">
                    14:00
                  </div>
                  <div className="text-[10px] text-salina-dark font-bold">
                    Anna M.
                  </div>
                </motion.div>
                <motion.div
                  animate={{
                    x: [10, 150, 10],
                    y: [10, 20, 10],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute top-4 left-10 w-4 h-4 bg-slate-400/50 rounded-full blur-[2px] z-20 pointer-events-none"
                />
              </div>
            </div>
          </BentoCard>

          {/* Блок 2: Loyalitätsclub */}
          <BentoCard
            className="lg:row-span-2"
            title="Loyalitätsclub & Zero-Checkout"
            description="Kunden mit monatlichem Abo erhalten im System eine goldene VIP-Krone. Beim Checkout wird ihr Preis magisch auf 0 € durchgestrichen."
            icon={Crown}
          >
            <div className="w-full h-full flex flex-col items-center justify-center py-4 relative">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
                  <User className="w-8 h-8" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-3 -right-3 text-2xl drop-shadow-md"
                >
                  👑
                </motion.div>
              </div>
              <div className="text-sm font-bold text-salina-dark mb-6">
                Salinapass Member
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center w-full relative overflow-hidden">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                  Zu zahlen
                </div>
                <div className="relative inline-block">
                  <span className="text-2xl font-black text-slate-400">
                    35,00 €
                  </span>
                  <motion.div
                    animate={{ width: ["0%", "120%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="absolute top-1/2 -left-[10%] h-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] transform -rotate-6 origin-left"
                  />
                </div>
                <motion.div
                  animate={{ opacity: [0, 1, 1], scale: [0.5, 1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    times: [0, 0.5, 1],
                  }}
                  className="text-3xl font-black text-green-500 mt-2"
                >
                  0,00 €
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 3: Digitale Pakete */}
          <BentoCard
            className="lg:col-span-1"
            title="Digitale Pakete (10er-Karte)"
            description="Kartonkarten mit Stempeln gehören der Vergangenheit an. Der Kunde sieht einen schönen Zähler auf seinem Smartphone und kann Klicks für die ganze Familie einlösen."
            icon={Ticket}
          >
            <div className="w-full flex items-center justify-between bg-white border border-slate-200 shadow-sm p-4 rounded-xl">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Verbleibend
                </div>
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ y: [0, -20, 0], opacity: [1, 0, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      times: [0, 0.4, 1],
                    }}
                    className="text-2xl font-black text-salina-dark"
                  >
                    7
                  </motion.span>
                  <span className="text-sm text-slate-400 font-bold">/ 10</span>
                </div>
              </div>
              <motion.button
                animate={{ backgroundColor: ["#0f172a", "#22c55e", "#0f172a"] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  times: [0, 0.4, 1],
                }}
                className="bg-salina-dark text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Buchen
              </motion.button>
            </div>
          </BentoCard>

          {/* Блок 4: Geschenke-Boutique */}
          <BentoCard
            className="lg:col-span-1"
            title="Geschenke mit Timing"
            description="Kunden kaufen digitale Gutscheine und wählen exakt Tag und Uhrzeit der Lieferung. Das Restguthaben bleibt automatisch für künftige Besuche erhalten."
            icon={Gift}
          >
            <div className="w-full bg-white border border-slate-200 shadow-sm rounded-xl p-4 text-center relative overflow-hidden group/gift">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-2 right-4 text-xl opacity-0 group-hover/gift:opacity-100 transition-opacity"
              >
                🎉
              </motion.div>
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="w-6 h-6 text-salina-orange" />
              </div>
              <div className="text-xs font-bold text-salina-dark mb-1">
                Gutschein 100€
              </div>
              <div className="text-[9px] text-slate-500 bg-slate-50 border border-slate-100 py-1 rounded font-mono group-hover/gift:hidden">
                Lieferung: 24. Dez, 09:00
              </div>
              <div className="text-[10px] text-green-600 font-bold hidden group-hover/gift:block mt-1">
                Restguthaben aktiv
              </div>
            </div>
          </BentoCard>

          {/* Блок 5: B2B-Buchungen */}
          <BentoCard
            className="lg:col-span-2"
            title="Einfache B2B-Buchungen (Kitas & Schulen)"
            description="Große Gruppen können nicht per Kreditkarte zahlen. Für Kitas blendet das System den Stripe-Checkout automatisch aus und bietet «Kauf auf Rechnung» an, um große Deals nicht zu verlieren."
            icon={Building2}
          >
            <div className="flex w-full gap-6 items-center">
              <div className="flex-1 bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-xl relative overflow-hidden h-24 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [1, 0, 1], y: [0, 20, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    times: [0, 0.4, 1],
                  }}
                  className="absolute flex flex-col items-center"
                >
                  <CreditCard className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-[10px] text-slate-500 font-bold">
                    Kreditkarte
                  </span>
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 1, 0], y: [-20, 0, -20] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    times: [0, 0.4, 1],
                  }}
                  className="absolute flex flex-col items-center"
                >
                  <FileText className="w-8 h-8 text-blue-500 mb-1 drop-shadow-sm" />
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                    Kauf auf Rechnung
                  </span>
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-salina-dark mb-2">
                  Automatischer PDF-Invoice
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm h-10 w-3/4 flex items-center px-3">
                  <div className="w-full h-1.5 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 6: Zwei-Wege-Sync */}
          <BentoCard
            className="lg:row-span-2"
            title="Die Magie der Synchronisation"
            description="Der Arbeitskalender synchronisiert sich in Echtzeit mit Ihrem persönlichen Apple/Google Kalender. Blockieren Sie 15:00 Uhr auf Ihrem iPhone, verschwindet der Slot sofort auf der Website."
            icon={RefreshCcw}
          >
            <div className="w-full h-full flex flex-col items-center justify-center relative py-4">
              <div className="flex justify-between w-full items-center gap-4">
                <div className="w-20 h-32 bg-white border-4 border-slate-200 rounded-2xl p-2 relative shadow-md">
                  <div className="w-full h-4 bg-red-50 border border-red-200 rounded mb-1 flex items-center justify-center text-[5px] text-red-600 font-bold">
                    14:00 Reparatur
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded mb-1"></div>
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute right-0 top-3 w-2 h-2 bg-blue-500 rounded-full"
                  />
                </div>
                <div className="flex-1 h-0.5 bg-slate-200 relative overflow-hidden">
                  <motion.div
                    animate={{ x: [-50, 150] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                    className="w-10 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                </div>
                <div className="w-24 h-24 bg-slate-50 border border-slate-200 rounded-xl p-2 flex flex-col gap-1 shadow-sm">
                  <div className="text-[6px] text-slate-400 font-bold mb-1">
                    Website Live
                  </div>
                  <motion.div
                    animate={{
                      backgroundColor: ["#22c55e", "#cbd5e1", "#22c55e"],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-full h-4 rounded"
                  />
                  <div className="w-full h-4 bg-green-500 rounded"></div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Блок 7: 360° Gästeprofil */}
          <BentoCard
            className="lg:col-span-1"
            title="360° Gästeprofil (CRM)"
            description="Kunden hinterlegen Allergien direkt beim Checkout. Die Rezeption sieht rote Warnmarker im Profil, bevor der Gast eintrifft."
            icon={HeartPulse}
          >
            <div className="w-full bg-white border border-slate-200 shadow-sm rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-salina-dark">
                  Felix S.
                </div>
                <div className="text-[10px] text-slate-500">
                  Besuch: Heute, 16:00
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-50 border border-red-200 text-red-600 text-[8px] font-black uppercase px-2 py-1 rounded shadow-sm"
              >
                ⚠️ Allergie: Laktose
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 8: Event-Dashboard */}
          <BentoCard
            className="lg:col-span-1"
            title="Event-Dashboard"
            description="Kindergeburtstage und Workshops haben ihren eigenen analytischen Raum, getrennt vom Tagesgeschäft, für perfekte Rentabilitätsanalysen."
            icon={PieChart}
          >
            <div className="w-full flex items-end justify-around h-20 bg-white border border-slate-200 shadow-sm rounded-xl p-4 pb-2 relative group/chart">
              <div className="w-4 bg-slate-200 rounded-t-sm h-1/3"></div>
              <div className="w-4 bg-slate-200 rounded-t-sm h-1/2"></div>
              <motion.div
                animate={{ height: ["20%", "80%"] }}
                transition={{ duration: 1, type: "spring", delay: 0.5 }}
                className="w-6 bg-salina-orange shadow-md rounded-t-sm h-[80%] relative flex justify-center"
              >
                <div className="absolute -top-6 text-[8px] font-bold text-salina-dark bg-white border border-slate-200 px-1.5 py-0.5 rounded opacity-0 group-hover/chart:opacity-100 transition-opacity shadow-sm">
                  Geburtstage
                </div>
              </motion.div>
              <div className="w-4 bg-slate-200 rounded-t-sm h-1/4"></div>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
