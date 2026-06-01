"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  ArrowRight,
  CreditCard,
  Receipt,
  RefreshCcw,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ДАНІ СЦЕН SCROLLYTELLING (Franchise) ---
const SCENES = [
  {
    id: "franchise-hub",
    title: "Globaler Motor. Lokale Freiheit.",
    description:
      "Alle Franchisenehmer arbeiten unter einem Dach auf der Trust-Domain (Master-Layout), erhalten aber physisch eigene URLs. Das bündelt den gesamten SEO-Traffic, sodass neue Filialen sofort in Google aufsteigen. Dabei hat jeder Partner absolute Autonomie über Raumkapazitäten, Preise und Feiertage.",
    insight:
      "Eine Preisänderung in Berlin hat technisch keine Auswirkungen auf München. Volle kommerzielle Unabhängigkeit innerhalb eines Portals.",
  },
  {
    id: "tenant-isolation",
    title: "Privacy by Design: Schutz der Daten.",
    description:
      "Franchisenehmer sind unabhängige Unternehmen. Daher ist auf Datenbankebene eine strikte kryptografische Trennung (Tenant Isolation) implementiert. Ein Partner hat technisch keinen Zugriff auf die Kundendatenbank, den Zeitplan oder die Finanzen einer anderen Stadt.",
    insight:
      "Verlässt ein Partner das Netzwerk, kann er die globale Kundendatenbank von La Salina nicht kopieren oder «mitnehmen». Alle Daten sind durch Backend-Filter blockiert.",
  },
  {
    id: "silent-launch",
    title: "Sicherer Start (Silent Launch).",
    description:
      "Die Eröffnung einer neuen Filiale darf kein Chaos verursachen. Ein neuer Standort kann vorab im versteckten Modus (Inactive) konfiguriert werden. Das Personal testet Kassen, Tablets und Prozesse auf geschlossenen URLs, bevor die Stadt für Kunden sichtbar wird.",
    insight:
      "Sicheres Onboarding-Training des Personals unter Live-Bedingungen, ohne das Risiko, echte Kunden zu verwirren oder den Betrieb zu stören.",
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
export default function FranchiseMasterControl() {
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="text-salina-dark">Franchise Master</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink">
                Control
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Die ultimative Plattform zur Skalierung und Verwaltung Ihres
              Franchise-Imperiums. Absolute Autonomie gepaart mit zentraler
              Kontrolle.
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
              {/* ВІЗУАЛ 0: Анімація для Заголовка (Header - Орбіти) */}
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
                      {/* SaaS Статус 'HQ Online' */}
                      <div className="flex items-center gap-2 mb-3 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          HQ Online
                        </span>
                      </div>

                      {/* Текст */}
                      <span className="font-black text-salina-dark text-xl tracking-tight leading-none mb-1">
                        Franchise Control
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
                      {/* 1. Час */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Clock className="w-5 h-5" />
                      </div>

                      {/* 2. Люди */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Users className="w-5 h-5" />
                      </div>

                      {/* 3. Гаманець */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-700">
                        <Wallet className="w-5 h-5" />
                      </div>

                      {/* 4. VIP */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Crown className="w-5 h-5" />
                      </div>

                      {/* 5. Безпека */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-pink">
                        <ShieldCheck className="w-5 h-5" />
                      </div>

                      {/* 6. Комунікація */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-green-500">
                        <MessageCircle className="w-5 h-5" />
                      </div>

                      {/* Ефект "Потоку клієнтів" */}
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

              {/* ВІЗУАЛ 1: Franchise Hub (Дашборд Спліт) */}
              {activeSceneId === "franchise-hub" && (
                <motion.div
                  key="franchise-hub"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="flex gap-4">
                    {/* Left Cell */}
                    <div className="flex-1 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-5 shadow-xl">
                      <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-blue-500" /> München
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-100">
                        <div className="text-[10px] text-slate-500 mb-1">
                          Sitzungspreis
                        </div>
                        <div className="text-lg font-black text-blue-600">
                          15,00 €
                        </div>
                      </div>
                      <div className="bg-green-50 text-green-700 text-xs font-bold p-2 rounded-lg text-center border border-green-200">
                        Regulärer Betrieb
                      </div>
                    </div>
                    {/* Right Cell */}
                    <div className="flex-1 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-5 shadow-xl">
                      <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-salina-orange" />{" "}
                        Berlin (Franchise)
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-100">
                        <div className="text-[10px] text-slate-500 mb-1">
                          Sitzungspreis
                        </div>
                        <div className="text-lg font-black text-orange-600">
                          12,50 €
                        </div>
                      </div>
                      <div className="bg-red-50 text-red-700 text-xs font-bold p-2 rounded-lg text-center border border-red-200">
                        15. Aug: Feiertag (Zu)
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Tenant Isolation */}
              {activeSceneId === "tenant-isolation" && (
                <motion.div
                  key="tenant-isolation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl p-6 w-full max-w-md">
                    <div className="flex items-center gap-3 mb-4 bg-slate-100 p-3 rounded-xl border border-slate-200">
                      <Search className="w-5 h-5 text-slate-400" />
                      <span className="text-sm font-mono text-slate-600">
                        SELECT * FROM customers
                      </span>
                    </div>

                    <div className="relative mt-6 p-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-red-500/10"
                      />
                      <div className="flex items-center gap-2 text-[10px] font-mono text-red-400 mb-2 relative z-10">
                        <Lock className="w-3 h-3" />
                        <span>Security Filter Injected:</span>
                      </div>
                      <div className="text-sm font-mono text-green-400 relative z-10 bg-slate-950 p-2 rounded">
                        WHERE location_id = &apos;Berlin&apos;
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Silent Launch */}
              {activeSceneId === "silent-launch" && (
                <motion.div
                  key="silent-launch"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center gap-8 items-center"
                >
                  {/* Dashboard */}
                  <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl p-5 w-48">
                    <div className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                      Standort Status
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-xl mb-4">
                      <span className="text-sm font-bold text-slate-700">
                        Bremen
                      </span>
                      <motion.div
                        animate={{
                          backgroundColor: ["#cbd5e1", "#22c55e", "#cbd5e1"],
                        }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="w-10 h-5 rounded-full relative px-0.5 flex items-center"
                      >
                        <motion.div
                          animate={{ x: [0, 20, 0] }}
                          transition={{ repeat: Infinity, duration: 4 }}
                          className="w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Smartphone Mockup */}
                  <div className="relative w-40 h-72 bg-slate-950 border-[6px] border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col pt-6 px-4">
                    <div className="text-white font-bold text-sm mb-4 text-center">
                      Standort
                    </div>
                    <div className="space-y-2">
                      <div className="bg-slate-800 rounded-lg p-2 text-xs text-center text-slate-300">
                        München
                      </div>
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="bg-salina-orange rounded-lg p-2 text-xs text-center text-white font-bold shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                      >
                        📍 Bremen (Neu)
                      </motion.div>
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
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Franchise Back-Office
          </h2>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Automatisierte Finanzen, strikte fiskalische Trennung und ein
            integrierter B2B-Marktplatz für sorgenfreies Skalieren.
          </p>
        </div>

        {/* Сітка Bento Grid 3x3 */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Блок 1: Stripe Connect (Широкий) */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Royalty auf Autopilot (Stripe Connect)"
            description="Wir nutzen das Direct Charge Modell. Kauft ein Kunde einen Besuch, geht die Zahlung direkt auf das Konto des Franchisenehmers, und die Plattform behält automatisch die Provision (Application Fee) ein."
            insight="Der Franchisenehmer erhält «echtes» Geld sofort. Das HQ bekommt seine Royalties garantiert und verzögerungsfrei. Keine Schulden, kein manueller Abgleich von Kontoauszügen."
            icon={CreditCard}
          >
            <div className="flex flex-col items-center justify-center w-full h-full pt-4">
              <motion.div
                animate={{ y: [0, 40], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-12 h-12 bg-yellow-400 rounded-full border-4 border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.5)] flex items-center justify-center font-black text-yellow-900 text-sm z-20"
              >
                50€
              </motion.div>
              <div className="w-full flex justify-center gap-8 -mt-2">
                <motion.div
                  animate={{
                    opacity: [0, 0, 1, 1, 0],
                    x: [20, 0, 0, 0, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-green-500/20 border border-green-500/40 rounded-xl p-3 text-center w-32"
                >
                  <div className="text-[10px] text-green-400 font-bold mb-1 uppercase">
                    Bank Franchise
                  </div>
                  <div className="text-lg font-black text-green-400">45€</div>
                </motion.div>
                <motion.div
                  animate={{
                    opacity: [0, 0, 1, 1, 0],
                    x: [-20, 0, 0, 0, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-salina-orange/20 border border-salina-orange/40 rounded-xl p-3 text-center w-32 shadow-[0_0_15px_rgba(251,146,60,0.2)]"
                >
                  <div className="text-[10px] text-salina-orange font-bold mb-1 uppercase">
                    La Salina HQ
                  </div>
                  <div className="text-lg font-black text-salina-orange">
                    5€
                  </div>
                </motion.div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 2: API Multiplexer (Високий) */}
          <DarkBentoCard
            className="lg:row-span-2"
            title="Multi-Token Fiskalisierung"
            description="Jeder Franchisenehmer ist ein eigenständiges Unternehmen. Unser Dynamic API Multiplexer erkennt den Buchungsort dynamisch, entschlüsselt das individuelle Account Token der Filiale (AES-256-GCM) und sendet den Beleg in die richtige Steuerdatenbank (KassenSichV)."
            insight="Das Finanzamt sieht jeden Franchisenehmer als eigenes Geschäft. Die Muttergesellschaft La Salina trägt keine rechtliche Verantwortung für deren Berichterstattung."
            icon={Receipt}
          >
            <div className="w-full h-full flex flex-col justify-between py-2 relative">
              <div className="bg-slate-800 border border-slate-700 p-2 rounded-lg text-xs text-slate-300 font-mono text-center relative z-10">
                POST /api/checkout <br />
                <span className="text-blue-400">Location: Berlin</span>
              </div>
              <div className="flex justify-center py-4 relative z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear",
                  }}
                  className="w-8 h-8 rounded-md bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                >
                  🔑
                </motion.div>
                <div className="absolute top-0 right-10 text-[9px] text-blue-300 bg-blue-900/50 p-1 rounded border border-blue-500/30">
                  Token_Berlin
                </div>
              </div>
              <div className="relative bg-slate-800 border border-slate-700 h-24 rounded-t-xl overflow-hidden flex justify-center items-end border-b-0 z-10">
                <div className="absolute top-2 text-[10px] text-slate-500 font-bold">
                  Virtual Printer (TSE)
                </div>
                <motion.div
                  animate={{ y: [-60, 0, 0, -60] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-3/4 bg-white rounded-t-sm border-x border-t border-slate-300 p-2 flex flex-col items-center"
                >
                  <div className="w-full h-1 bg-slate-200 mb-1 rounded"></div>
                  <div className="w-2/3 h-1 bg-slate-200 mb-2 rounded"></div>
                  <div className="w-8 h-8 bg-slate-900 rounded-sm flex items-center justify-center text-[6px] text-white">
                    QR
                  </div>
                </motion.div>
              </div>
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 0 }}
              >
                <line
                  x1="50%"
                  y1="20%"
                  x2="50%"
                  y2="80%"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
              </svg>
            </div>
          </DarkBentoCard>

          {/* Блок 3: Clearing Report (Широкий) */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Clearing Universaler Gutscheine"
            description="Ein Gutschein wurde auf der Hauptseite gekauft (Geld im HQ), aber beim Franchisenehmer eingelöst. Ein monatliches CRON-Skript gleicht die Logs ab und generiert automatisch einen Schuldenbericht."
            insight="Das System garantiert 100% faire Beziehungen. Das Hauptbüro weiß genau, wie viel es dem Partner für die physische Betreuung der Gäste erstatten muss."
            icon={RefreshCcw}
          >
            <div className="flex w-full gap-4 items-center">
              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
                <div className="text-[10px] text-slate-400 mb-2 uppercase">
                  Filiale Berlin
                </div>
                <div className="bg-white/10 px-2 py-1 rounded text-white font-mono text-xs border border-white/20 mb-2">
                  CODE: X79L
                </div>
                <div className="text-salina-orange font-bold text-sm">
                  Einlösung: 100€
                </div>
              </div>
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight className="text-slate-600" />
              </motion.div>
              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 relative overflow-hidden">
                <div className="text-[10px] text-slate-400 mb-2 uppercase flex justify-between">
                  HQ Buchhaltung
                </div>
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="bg-green-500/10 border border-green-500/30 p-2 rounded text-xs text-green-400 font-mono mb-1"
                >
                  Schuld an Berlin: 90€
                </motion.div>
                <div className="text-[9px] text-slate-500 italic mb-2">
                  (100€ minus 10% Royalty)
                </div>
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                  className="flex items-center gap-1 text-[10px] text-green-500 font-bold"
                >
                  <CheckCircle2 className="w-3 h-3" /> Exportiert in DATEV
                </motion.div>
              </div>
            </div>
          </DarkBentoCard>

          {/* Блок 4: B2B Procurement Hub */}
          <DarkBentoCard
            className="lg:col-span-1"
            title="B2B-Marktplatz & Auto-Zahlung"
            description="Franchisenehmer haben Zugang zu einem geschlossenen Extranet für Markensalz, Uniformen etc. Das System wendet Staffelpreise an, kontrolliert Mindestbestellmengen (MOQ) und generiert B2B-Rechnungen."
            insight="Garantierte Qualitätsstandards. Franchisenehmer können ein SEPA-Mandat für die automatische Bezahlung ihrer operativen Einkäufe einrichten."
            icon={Package}
          >
            <div className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl">
              <div className="text-sm font-bold text-slate-200 mb-2">
                Himalaya-Salz (25kg)
              </div>
              <div className="flex items-center justify-between mb-3">
                <motion.div
                  animate={{
                    backgroundColor: ["#1e293b", "#fb923c", "#1e293b"],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="border border-slate-600 rounded px-2 py-1 text-xs text-white font-mono"
                >
                  Menge: 10
                </motion.div>
                <motion.div
                  animate={{ color: ["#94a3b8", "#fb923c", "#94a3b8"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-lg font-black text-salina-orange"
                >
                  12,50 € / Sack
                </motion.div>
              </div>
              <motion.button
                animate={{
                  backgroundColor: ["#334155", "#fb923c", "#334155"],
                  color: ["#94a3b8", "#fff", "#94a3b8"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-full py-2 text-xs font-bold rounded-lg flex justify-center gap-2 items-center"
              >
                B2B-Rechnung generieren <ArrowRight className="w-3 h-3" />
              </motion.button>
            </div>
          </DarkBentoCard>

          {/* Блок 5: DSGVO CRM Isolation */}
          <DarkBentoCard
            className="lg:col-span-2"
            title="Legale CRM-Isolation (DSGVO)"
            description="Die Kundendatenbank wird im Mailing-System (Brevo) über Sub-Accounts streng fragmentiert. Transaktions-E-Mails verwenden dynamische Absender, wodurch Kunden fest an die Liste des jeweiligen Franchisenehmers gebunden werden."
            insight="Jeder Partner hat ausschließlich Zugriff auf seine eigenen Kunden. Ein Datenleck zwischen den Standorten ist unmöglich, was das gesamte Netzwerk vor empfindlichen DSGVO-Strafen schützt."
            icon={ShieldAlert}
          >
            <div className="w-full h-full flex flex-col relative pt-4">
              {/* Lead In */}
              <motion.div
                animate={{ y: [0, 50], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute left-1/2 -translate-x-1/2 top-0 bg-blue-500/20 border border-blue-500/50 text-blue-300 text-[10px] font-bold px-3 py-1.5 rounded-full z-20"
              >
                Lead: Hanna (Forchheim)
              </motion.div>

              <div className="mt-8 flex gap-8 flex-1 items-end justify-center pb-2">
                {/* Forchheim Vault */}
                <div className="bg-slate-800 border-2 border-blue-500/30 rounded-t-xl p-3 w-32 h-24 relative flex flex-col items-center justify-end shadow-lg">
                  <Database className="w-8 h-8 text-blue-400 mb-2" />
                  <div className="text-[10px] text-slate-300 font-bold">
                    List: Forchheim
                  </div>
                </div>

                {/* Munich Manager Attempt */}
                <div className="relative">
                  <div className="bg-slate-900 border border-slate-700 rounded-t-xl p-3 w-32 h-20 flex flex-col items-center justify-end opacity-50">
                    <div className="text-[10px] text-slate-500 font-bold mb-1">
                      München Admin
                    </div>
                  </div>
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.9, 1.1, 0.9] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1 whitespace-nowrap"
                  >
                    <Lock className="w-3 h-3" /> Access Denied
                  </motion.div>
                </div>
              </div>
            </div>
          </DarkBentoCard>
        </div>
      </div>
    </div>
  );
}
