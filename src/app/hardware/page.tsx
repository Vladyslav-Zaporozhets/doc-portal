"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Info,
  Package,
  Lock,
  Wifi,
  ShieldOff,
  GraduationCap,
  ClipboardCheck,
  Zap,
  Battery,
  CloudDownload,
  FileText,
  Activity,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  RefreshCw,
  Monitor,
  Calendar,
  CreditCard,
  MessageCircle,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// ДАНІ СЦЕН (SCROLLYTELLING)
// ============================================================================
const SCENES = [
  {
    id: "zero-touch",
    product: "Cloud‑Initialisierung der Hardware",
    title: "Einsatzbereit in 3 Minuten",
    description:
      "Wenn ein neuer Franchisenehmer sein Starterpaket erhält, muss er keinen Techniker rufen. Sobald er das Tablet aus der Verpackung nimmt und es zum ersten Mal mit dem WLAN verbindet, nimmt das Gerät automatisch Kontakt zum zentralen Server des Unternehmens auf. Das Tablet lädt selbstständig die Unternehmenseinstellungen, installiert die benötigten Apps und ist vollständig für den Kundenempfang vorbereitet.",
    insight:
      "Das ideale „Plug‑and‑Play“‑Skalierungsmodell. Die Eröffnung einer neuen Filiale erfordert keine IT‑Infrastrukturarbeiten vor Ort, was die Kosten radikal senkt und den Start neuer Franchise‑Standorte erheblich beschleunigt.",
  },
  {
    id: "kiosk-mode",
    product: "Strikter Kiosk‑Modus",
    title: "Ein Tablet, das ausschließlich für das Geschäft bestimmt ist",
    description:
      "Das Arbeits‑Tablet an der Rezeption wird fest in einem „Ein‑Fenster“‑Modus gesperrt. Der Administrator sieht nur vier erlaubte Symbole: den Arbeitsplan, die Kasse, den Messenger für den Kundensupport und das Akademie‑Portal. Das System verhindert physisch, dass der Mitarbeiter einen Browser öffnet, soziale Netzwerke lädt, Spiele spielt oder versehentlich schädliche Programme installiert.",
    insight:
      "Maximale Produktivität des Personals und 100 % Schutz vor Viren oder Phishing. Die Mitarbeiter konzentrieren sich ausschließlich auf die Gäste, und das Unternehmensnetzwerk ist vor menschlicher Nachlässigkeit geschützt.",
  },
  {
    id: "dual-wan",
    product: "Automatische Internet‑Reserve",
    title: "Eine Kasse, die niemals stillsteht",
    description:
      "Zahlungsterminals und die Kasse benötigen eine ständige Verbindung. Sollte auf der Straße versehentlich das Internetkabel durchtrennt werden, hält der La Salina‑Standort seinen Betrieb keine Sekunde lang an. Der intelligente Router der Filiale schaltet innerhalb von 1–2 Sekunden den gesamten Datenverkehr automatisch auf das Reserve‑Mobilfunknetz (über ein 5G‑Modem) um.",
    insight:
      "Absolute Einkommensstabilität. Selbst bei einem Ausfall des Providers läuft die Hintergrundmusik im Saal weiter, und die Kunden bezahlen erfolgreich mit ihrer Bankkarte – völlig ohne Unannehmlichkeiten.",
  },
  {
    id: "remote-wipe",
    product: "Fernlöschung von Unternehmensdaten",
    title: "Ihre Daten sind nicht zu stehlen",
    description:
      "Wenn ein Arbeits‑Tablet plötzlich verloren geht oder der Standort ausgeraubt wird, verwandelt sich das Gerät für die Angreifer in ein absolut nutzloses Stück Plastik. Ein Spezialist der Zentrale sperrt das Tablet per Knopfdruck aus der Ferne und löscht unwiderruflich sämtliche Zugangsschlüssel zur Kundendatenbank.",
    insight:
      "Fundamentaler Schutz des Geschäftsgeheimnisses und Konformität mit den höchsten Anforderungen des Datenschutzgesetzes. Im Falle eines Diebstahls verliert das Unternehmen keine Kundendaten und vermeidet vollständig hohe Bußgelder.",
  },
  {
    id: "lms-microlearning",
    product: "Interne Unternehmensakademie",
    title: "Premium‑Service, der sich skalieren lässt",
    description:
      "Die Inhaberin muss keine Tage mehr für die persönliche Einarbeitung jedes neuen studentischen Animateurs aufwenden. Jeder neue Mitarbeiter erhält Zugang zur Digitalen Akademie von La Salina. Die Schulung erfolgt in Form von Mikro‑Lektionen (3–5 Minuten), in denen die Gastfreundschaftsstandards, die Sicherheitsregeln und die Arbeit mit der Kasse detailliert gezeigt werden.",
    insight:
      "Bis zu 80 % Zeitersparnis für das Top‑Management. Alle Franchisenehmer und ihr Personal werden nach einem einheitlichen, makellosen Standard geschult und garantieren so eine gleichbleibend hohe Servicequalität in jeder Stadt des Netzwerks.",
  },
  {
    id: "skill-blocker",
    product: "Algorithmische Verknüpfung von Schulung und Zeitplan",
    title: "Zu den Kunden dürfen nur die Besten",
    description:
      "Das Schulungssystem wird untrennbar mit dem Arbeitsplan verbunden. Hat ein Mitarbeiter die Sicherheitsunterweisung nicht angesehen oder den internen Erste‑Hilfe‑Test nicht bestanden, verbietet der Algorithmus dem Manager physisch, diese Person in eine Arbeitsschicht einzuteilen.",
    insight:
      "Garantierte Betriebssicherheit. Der Franchisegeber hat die absolute Gewissheit, dass mit Kindern und Premium‑Kunden ausschließlich kompetente, zertifizierte Personen arbeiten, die wissen, wie sie in jeder Situation zu handeln haben.",
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
export default function InfrastructureCybersecurityPage() {
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
              Infrastructure &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink pr-1">
                Cybersecurity
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-xl leading-relaxed">
              Wie eine uneinnehmbare digitale Festung den reibungslosen Betrieb
              garantiert – und warum Ihre Mitarbeiter die neue Akademie lieben
              werden.
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
                        Infrastructure &
                      </span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink text-2xl tracking-tight">
                        Cybersecurity
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
                      {/* 1. Package (Zero-Touch) - Зверху (0°) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange">
                        <Package className="w-5 h-5" />
                      </div>
                      {/* 2. Lock (Kiosk) - 60° */}
                      <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-blue-500">
                        <Lock className="w-5 h-5" />
                      </div>
                      {/* 3. Wifi (Failover) - 120° */}
                      <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-emerald-500">
                        <Wifi className="w-5 h-5" />
                      </div>
                      {/* 4. ShieldOff (Remote Wipe) - 180° */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-red-500">
                        <ShieldOff className="w-5 h-5" />
                      </div>
                      {/* 5. GraduationCap (LMS) - 240° */}
                      <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-amber-500">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      {/* 6. ClipboardCheck (Skill Blocker) - 300° */}
                      <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-purple-500">
                        <ClipboardCheck className="w-5 h-5" />
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

              {/* ВІЗУАЛ 1: Zero-Touch Provisioning */}
              {activeSceneId === "zero-touch" && (
                <motion.div
                  key="zero-touch"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <Package className="w-12 h-12 text-salina-orange mx-auto mb-4" />
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-green-500 rounded-full"
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="bg-green-50 border border-green-200 rounded-2xl p-4 inline-block"
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-1" />
                      <p className="text-sm font-bold text-green-700">
                        Bereit für den Empfang
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 2: Kiosk Mode */}
              {activeSceneId === "kiosk-mode" && (
                <motion.div
                  key="kiosk-mode"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {[Calendar, CreditCard, MessageCircle, GraduationCap].map(
                        (Icon, i) => (
                          <div
                            key={i}
                            className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center"
                          >
                            <Icon className="w-6 h-6 text-salina-orange" />
                          </div>
                        ),
                      )}
                    </div>
                    <div className="flex items-center justify-center">
                      <Lock className="w-8 h-8 text-red-400" />
                      <span className="text-xs text-slate-500 ml-2">
                        Kein Zugriff auf andere Apps
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 3: Dual-WAN Failover */}
              {activeSceneId === "dual-wan" && (
                <motion.div
                  key="dual-wan"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <motion.div
                        animate={{ opacity: [1, 0, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          times: [0, 0.2, 1],
                        }}
                      >
                        <Wifi className="w-8 h-8 text-red-400" />
                      </motion.div>
                      <motion.div
                        animate={{ opacity: [0, 1, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          times: [0, 0.2, 1],
                        }}
                      >
                        <Wifi className="w-8 h-8 text-green-500" />
                      </motion.div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 inline-block">
                      <p className="text-sm font-bold text-green-700">
                        5G‑Failover aktiv – Transaktion erfolgreich
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 4: Remote Wipe */}
              {activeSceneId === "remote-wipe" && (
                <motion.div
                  key="remote-wipe"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2rem] p-6 shadow-lg text-center">
                      <button className="px-6 py-3 bg-red-500 text-white rounded-2xl font-bold text-sm mb-4">
                        Gerät sperren
                      </button>
                      <ShieldOff className="w-8 h-8 text-red-400 mx-auto" />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-slate-900 rounded-[2rem] p-6 shadow-lg text-center"
                    >
                      <Lock className="w-10 h-10 text-white mx-auto mb-2" />
                      <p className="text-xs text-white/70">Gerät deaktiviert</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 5: LMS Microlearning */}
              {activeSceneId === "lms-microlearning" && (
                <motion.div
                  key="lms-microlearning"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
                    <GraduationCap className="w-10 h-10 text-salina-orange mx-auto mb-4" />
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-salina-orange rounded-full"
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, type: "spring" }}
                      className="bg-yellow-50 border border-yellow-200 rounded-2xl p-3 inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-600" />
                      <span className="text-xs font-bold text-yellow-700">
                        Zertifikat erhalten!
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* ВІЗУАЛ 6: Skill Blocker */}
              {activeSceneId === "skill-blocker" && (
                <motion.div
                  key="skill-blocker"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl text-center">
                    <ClipboardCheck className="w-10 h-10 text-salina-orange mx-auto mb-4" />
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-4">
                      <p className="text-sm font-bold text-salina-dark">
                        Erste‑Hilfe‑Test
                      </p>
                      <p className="text-xs text-red-500 mt-1">
                        Nicht bestanden
                      </p>
                    </div>
                    <motion.div
                      animate={{ x: [0, -5, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-xs font-bold text-red-700 inline-flex items-center gap-2"
                    >
                      🚫 Zugang zur Schicht blockiert
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
            Hardware‑Resilienz & Audit
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Diese unsichtbaren Schutzmechanismen stellen sicher, dass Ihr
            Betrieb selbst bei Ausfällen reibungslos weiterläuft und jede
            Schulung rechtssicher dokumentiert ist.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Блок 1: Hot Swap (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Heißtausch der Ausrüstung (Hot Swap)"
            description="Wenn der Administrator am Freitagabend versehentlich das Smart‑Terminal zerbricht, steht das Geschäft nicht still. In der Zentrale wird stets eine konfigurierte Reserve bereitgehalten, die per Kurier sofort an den Standort geliefert und nahtlos ausgetauscht wird."
            insight="Minimierung der finanziellen Ausfallverluste (Downtime). Der Franchisenehmer erhält ein neues, bereits für seine Filiale programmiertes Gerät und nimmt sofort wieder Zahlungen entgegen – ohne technisches Personal."
            icon={RefreshCw}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <p className="text-xs font-bold text-red-700">Defekt</p>
              </div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <RefreshCw className="w-6 h-6 text-salina-orange" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                <p className="text-xs text-green-700 font-bold mt-1">Bereit</p>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 2: Predictive Maintenance (Високий) */}
          <BentoCard
            className="lg:row-span-2"
            title="Vorausschauender Service (Predictive Maintenance)"
            description="Das System analysiert aus der Ferne den „Gesundheitszustand“ jedes Geräts im Netzwerk. Wenn der Akku des Terminals in München auf 60 % degradiert, erfährt die Zentrale dies automatisch und sendet proaktiv Ersatz."
            insight="Idealer Lebenszyklus der Ausrüstung. Probleme werden gelöst, bevor sie kritisch werden und den Gästeservice an der Rezeption beeinträchtigen."
            icon={Battery}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <motion.div
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-center"
              >
                <Battery className="w-10 h-10 text-amber-500 mx-auto" />
                <p className="text-xs text-amber-600 font-bold mt-1">60 %</p>
              </motion.div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Zap className="w-6 h-6 text-salina-orange" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <Battery className="w-10 h-10 text-green-500 mx-auto" />
                <p className="text-xs text-green-600 font-bold mt-1">100 %</p>
              </motion.div>
            </div>
          </BentoCard>

          {/* Блок 3: Over-the-Air Updates */}
          <BentoCard
            title="Nächtliche Updates (Over‑the‑Air)"
            description="Die Aktualisierung von Kassenprogrammen oder Sicherheitsrichtlinien erfolgt zentral und unbemerkt. Das System lädt alle neuen Versionen automatisch um 03:00 Uhr nachts auf sämtliche Tablets des Netzwerks."
            insight="Null Eingriff in den Arbeitsablauf. Das Rezeptionspersonal verschwendet keine Zeit mit technischen Fenstern oder App‑Neustarts mitten im Arbeitstag."
            icon={CloudDownload}
          >
            <div className="text-center">
              <p className="text-2xl font-black text-salina-dark">03:00</p>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <CloudDownload className="w-8 h-8 text-salina-orange mx-auto my-2" />
              </motion.div>
              <p className="text-xs text-green-600 font-bold">
                Update abgeschlossen
              </p>
            </div>
          </BentoCard>

          {/* Блок 4: Compliance Audit Trail (Широкий) */}
          <BentoCard
            className="lg:col-span-2"
            title="Juristische Schulungsspur (Compliance Audit Trail)"
            description="Im Falle einer Prüfung durch die Gesundheitsbehörde oder die Arbeitsschutzbehörde liefert das Akademie‑System unwiderlegbare Beweise. Es speichert eine unveränderliche digitale Spur: den genauen Zeitpunkt, das Datum und die IP‑Adresse, von der aus jeder Mitarbeiter die Sicherheitsunterweisung angesehen hat."
            insight="Absoluter Rechtsschutz für die Geschäftsinhaberin. Das Unternehmen verfügt über einen dokumentarischen Nachweis der Erfüllung seiner Personalschulungspflichten, was das Risiko der rechtlichen Haftung vollständig beseitigt."
            icon={FileText}
          >
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-500">
                Video angesehen
              </div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FileText className="w-6 h-6 text-salina-orange" />
              </motion.div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-xs text-green-700 font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Unveränderlich gespeichert
              </div>
            </div>
          </BentoCard>

          {/* Блок 5: Device Health Monitoring */}
          <BentoCard
            title="Globale Telemetrie (Device Health)"
            description="Die IT‑Abteilung der Zentrale sieht jederzeit die WLAN‑Signalqualität, den Speicherstand und die Prozessorauslastung jedes Tablets in jeder Filiale."
            insight="Senkung der Kosten für den technischen Support. Wenn die App bei einem Franchisenehmer hängt, erkennt der Ingenieur die Ursache aus der Ferne in Sekundenschnelle und vermeidet lange telefonische Erklärungen oder den Einsatz eines Technikers."
            icon={Monitor}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Alle Standorte online
            </p>
          </BentoCard>

          {/* Блок 6: Role-Based Curriculum */}
          <BentoCard
            title="Rollenspezifische Lernpfade (Role‑Based Curriculum)"
            description="Die Schulungsmaterialien in der Akademie passen sich algorithmisch der Position an. Der Animateur erhält Lektionen zur Kommunikationspsychologie mit Kindern, der leitende Administrator hingegen vertiefte Anweisungen zu finanziellen Stornierungen (Storno)."
            insight="Fokus und Effizienz. Die Mitarbeiter verschwenden keine Zeit mit dem Erlernen überflüssiger Informationen, sondern eignen sich maximal schnell die Fähigkeiten an, die für ihre tägliche Arbeit wirklich benötigt werden."
            icon={BookOpen}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 text-center">
                <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-blue-700 font-bold">Animateur</p>
                <p className="text-[10px] text-blue-500 mt-1">3 Kurse</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
