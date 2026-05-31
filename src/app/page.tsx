"use client";

import {
  ArrowRight,
  Sparkles,
  Users,
  Volume2,
  VolumeX,
  CalendarCheck,
  UserCheck,
  Undo2,
  Gift,
  Bot,
  MessageCircle,
  Search,
  Monitor,
  Package,
  Shield,
  BarChart3,
  Building2,
  CreditCard,
  Calendar,
  Settings,
  Terminal,
  Cloud,
  Store,
  Megaphone,
  Factory,
  Globe,
  Server,
  MonitorPlay,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
  initialScale: number;
  targetY: number;
  targetX: number;
  animDuration: number;
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [vipName, setVipName] = useState<string | null>(null);

  // Стан для піщинок (лазерний ефект видалено)
  const [trail, setTrail] = useState<Particle[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);

      const params = new URLSearchParams(window.location.search);
      const vip = params.get("vip");
      if (vip) {
        setVipName(vip);
      }
    }, 0);

    const handleMouseMove = (e: MouseEvent) => {
      // Тільки пісок, лазер видалено
      setTrail((prev) => [
        ...prev.slice(-30),
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color:
            Math.random() > 0.5 ? "bg-salina-orange/70" : "bg-salina-pink/70",
          initialScale: Math.random() * 0.4 + 0.4,
          targetY: e.clientY + 50 + Math.random() * 60,
          targetX: e.clientX + (Math.random() - 0.5) * 60,
          animDuration: 1 + Math.random() * 0.5,
        },
      ]);
    };
    window.addEventListener("mousemove", handleMouseMove);

    audioRef.current = new Audio("https://ice1.somafm.com/lush-128-mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current
        ?.play()
        .catch((err) => console.log("Audio play blocked by browser:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    /* Прибрано overflow-hidden, додано min-h-screen та overflow-x-hidden для вертикального скролу */
    <div className="relative w-full min-h-screen flex flex-col justify-center overflow-x-hidden cursor-default">
      {/* Лазерний слід повністю видалено */}

      {/* Плавний магічний пісок (без лазера) */}
      {isMounted &&
        trail.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 0,
              scale: 0,
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0, particle.initialScale, 0],
              y: particle.targetY,
              x: particle.targetX,
            }}
            transition={{
              duration: particle.animDuration,
              ease: "easeInOut",
            }}
            className={`pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full ${particle.color} blur-[1px] z-50`}
          />
        ))}

      {/* Кнопка аудіо (Ambient Lounge) */}
      <div className="absolute top-8 right-8 z-50">
        <button
          onClick={toggleAudio}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-salina-orange/20 text-salina-dark hover:bg-white/60 transition-all shadow-sm cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-5 h-5 text-salina-orange animate-pulse" />
              <span className="text-sm font-medium">Lounge Audio: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-500">
                Lounge Audio: Off
              </span>
            </>
          )}
        </button>
      </div>

      {/* Головний контент */}
      <div className="relative z-10 max-w-5xl mx-auto animate-in fade-in duration-1000">
        {/* Головний заголовок */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-salina-orange/10 text-salina-orange font-medium text-sm mb-6 border border-salina-orange/20 shadow-[0_0_15px_rgba(251,146,60,0.2)]">
            <Sparkles className="w-4 h-4" />
            <span>Interactive DocPortal v1.0</span>
          </div>
          <h1 className="text-5xl font-bold text-salina-dark mb-6 leading-tight">
            {vipName ? (
              <>
                Willkommen,{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-salina-orange to-salina-pink">
                  {vipName}
                </span>
                . <br />
                Entdecke unsere Architektur.
              </>
            ) : (
              <>
                Show, Don&apos;t Tell. <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-salina-orange to-salina-pink">
                  Die lebendige Architektur von La Salina.
                </span>
              </>
            )}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
            Anstelle von starren PDF-Dokumenten und trockenen technischen
            Spezifikationen (BRD, ADR) haben wir unsere Geschäftsprozesse in
            dynamische Präsentationen und interaktive Simulationen verwandelt.
            Klicken, erkunden und erleben Sie den konkreten Business-Wert hinter
            jeder technologischen Entscheidung.
          </p>
        </div>

        {/* Картки швидкого доступу */}
        <div className="mb-12 relative z-20">
          {/* ===== 🖥️ Simulatoren ===== */}
          <h3 className="text-2xl font-bold text-salina-dark mb-6 flex items-center gap-2">
            <MonitorPlay className="w-6 h-6 text-salina-orange" /> Simulatoren
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Kundenerlebnis */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-orange/50 hover:shadow-[0_8px_30px_rgb(251,146,60,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-7 h-7 text-salina-orange" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Kundenerlebnis
              </h2>
              <p className="text-slate-500 mb-6">
                Interaktive Simulation der gesamten Customer Journey – von der
                ersten Berührung bis zur langfristigen Bindung.
              </p>
              <Link
                href="/cx"
                className="inline-flex items-center gap-2 text-salina-orange font-semibold group-hover:gap-4 transition-all"
              >
                Simulation starten <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Kundenkonto */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-orange/50 hover:shadow-[0_8px_30px_rgb(251,146,60,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <UserCheck className="w-7 h-7 text-salina-orange" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Kundenkonto
              </h2>
              <p className="text-slate-500 mb-6">
                Erleben Sie das Self-Service-Portal aus Gastperspektive:
                Buchungen, Gutscheine und persönliche Daten.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-salina-orange font-semibold group-hover:gap-4 transition-all"
              >
                Konto erkunden <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Shop & Gutscheine */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-pink/50 hover:shadow-[0_8px_30px_rgb(244,114,182,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Gift className="w-7 h-7 text-salina-pink" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Shop & Gutscheine
              </h2>
              <p className="text-slate-500 mb-6">
                Simulation des Abverkaufs: 10er-Karten, Salinapass und die
                Einlösung digitaler Gutscheine.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-salina-pink font-semibold group-hover:gap-4 transition-all"
              >
                Shop testen <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* POS & Rezeption */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Monitor className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                POS & Rezeption
              </h2>
              <p className="text-slate-500 mb-6">
                Der Tablet-optimierte Vor-Ort-Modus: QR-Check-In, Walk-Ins und
                Echtzeit-Kassenansicht.
              </p>
              <Link
                href="/pos"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all"
              >
                Rezeption simulieren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Franchise (HQ) */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-sky-500/50 hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Building2 className="w-7 h-7 text-sky-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Franchise (HQ)
              </h2>
              <p className="text-slate-500 mb-6">
                Zentrale Steuerung aller Standorte: Echtzeit-KPIs,
                mandantenfähige Daten und Audit-Logs.
              </p>
              <Link
                href="/franchise"
                className="inline-flex items-center gap-2 text-sky-600 font-semibold group-hover:gap-4 transition-all"
              >
                Dashboard öffnen <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          {/* ===== B2C & Sales (іконка Store) ===== */}
          <h3 className="text-2xl font-bold text-salina-dark mb-6 flex items-center gap-2">
            <Store className="w-6 h-6 text-salina-orange" /> B2C & Sales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Buchung */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-orange/50 hover:shadow-[0_8px_30px_rgb(251,146,60,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <CalendarCheck className="w-7 h-7 text-salina-orange" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Buchung
              </h2>
              <p className="text-slate-500 mb-6">
                Reibungslose Conversion. Gastbuchungen, dynamische
                Familienrabatte und Zero-Checkout für ein nahtloses
                Kundenerlebnis.
              </p>
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 text-salina-orange font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Kundenportal */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-orange/50 hover:shadow-[0_8px_30px_rgb(251,146,60,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <UserCheck className="w-7 h-7 text-salina-orange" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Kundenportal
              </h2>
              <p className="text-slate-500 mb-6">
                Volle Autonomie für Gäste. Terminverwaltung, Auto-Refunds und
                DSGVO-konforme Datenhoheit sicher an einem Ort.
              </p>
              <Link
                href="/panel"
                className="inline-flex items-center gap-2 text-salina-orange font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Storno & Kulanz */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-orange/50 hover:shadow-[0_8px_30px_rgb(251,146,60,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Undo2 className="w-7 h-7 text-salina-orange" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Storno & Kulanz
              </h2>
              <p className="text-slate-500 mb-6">
                Automatisierter Umsatzschutz. Intelligente Refund-Regeln bei
                rechtzeitiger Absage und digitale Kulanz-Gutscheine bei
                Verspätungen.
              </p>
              <Link
                href="/return"
                className="inline-flex items-center gap-2 text-salina-orange font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Loyalty & Shop */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-orange/50 hover:shadow-[0_8px_30px_rgb(251,146,60,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Gift className="w-7 h-7 text-salina-orange" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Loyalty & Shop
              </h2>
              <p className="text-slate-500 mb-6">
                Wiederkehrende Umsätze generieren. Zentrale Verwaltung von
                Abonnements (Salinapass), 10er-Karten und smarten
                Empfehlungsprogrammen.
              </p>
              <Link
                href="/loyalty-ecommerce"
                className="inline-flex items-center gap-2 text-salina-orange font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* ===== Marketing (іконка Megaphone) ===== */}
          <h3 className="text-2xl font-bold text-salina-dark mb-6 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-salina-pink" /> Marketing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* AI-Bot */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-pink/50 hover:shadow-[0_8px_30px_rgb(244,114,182,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Bot className="w-7 h-7 text-salina-pink" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                AI-Bot
              </h2>
              <p className="text-slate-500 mb-6">
                Intelligenter 24/7-Support. Ein KI-Assistent, der Routinefragen
                filtert und bei Bedarf nahtlos an echte Mitarbeiter eskaliert.
              </p>
              <Link
                href="/chatbot"
                className="inline-flex items-center gap-2 text-salina-pink font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* WhatsApp */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-pink/50 hover:shadow-[0_8px_30px_rgb(244,114,182,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <MessageCircle className="w-7 h-7 text-salina-pink" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                WhatsApp
              </h2>
              <p className="text-slate-500 mb-6">
                Direkter Kundenkontakt auf Autopilot. Automatisierte E-Tickets,
                pre-filled Links und Live-Support für null No-Shows.
              </p>
              <Link
                href="/whatsapp"
                className="inline-flex items-center gap-2 text-salina-pink font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* SEO & Analytics */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-salina-pink/50 hover:shadow-[0_8px_30px_rgb(244,114,182,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Search className="w-7 h-7 text-salina-pink" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                SEO & Analytics
              </h2>
              <p className="text-slate-500 mb-6">
                Cookie-less Tracking & Sichtbarkeit. Server-Side Matomo und
                automatisiertes lokales SEO für Top-Rankings ohne DSGVO-Risiken.
              </p>
              <Link
                href="/analytics"
                className="inline-flex items-center gap-2 text-salina-pink font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* ===== Operations (іконка Factory) ===== */}
          <h3 className="text-2xl font-bold text-salina-dark mb-6 flex items-center gap-2">
            <Factory className="w-6 h-6 text-emerald-600" /> Operations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Reception */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Monitor className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Reception
              </h2>
              <p className="text-slate-500 mb-6">
                Das digitale Herz der Filiale. Tablet-optimierter Vor-Ort-Modus
                für blitzschnellen QR-Check-In und müheloses Walk-In-Management.
              </p>
              <Link
                href="/reception"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Warenwirtschaft */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Package className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Warenwirtschaft
              </h2>
              <p className="text-slate-500 mb-6">
                Smarte Bestandsüberwachung. Proaktive Low-Stock-Alerts,
                B2B-Einkauf und manipulationssichere Blind-Count-Inventur.
              </p>
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* HR & Compliance */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                HR & Compliance
              </h2>
              <p className="text-slate-500 mb-6">
                Rechtssicheres Personalmanagement. GPS-Zeiterfassung,
                bedarfsorientierte Schichtplanung und garantierte
                ArbZG-Konformität.
              </p>
              <Link
                href="/hr"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* ===== HQ & Finanzen (іконка Globe) ===== */}
          <h3 className="text-2xl font-bold text-salina-dark mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-sky-600" /> HQ & Finanzen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* HQ Dashboard */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-sky-500/50 hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <BarChart3 className="w-7 h-7 text-sky-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                HQ Dashboard
              </h2>
              <p className="text-slate-500 mb-6">
                Zentrale Kontrolle auf einen Blick. Echtzeit-KPIs,
                Event-Analysen und manipulationssichere Audit-Logs für das
                gesamte Unternehmen.
              </p>
              <Link
                href="/boos-dashboard"
                className="inline-flex items-center gap-2 text-sky-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Multi-Location */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-sky-500/50 hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Building2 className="w-7 h-7 text-sky-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Multi-Location
              </h2>
              <p className="text-slate-500 mb-6">
                Skalierung ohne Grenzen. Zentrale Verwaltung aller eigenen
                Filialen mit lokaler Autonomie und intelligentem
                Traffic-Routing.
              </p>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-sky-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Franchise */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-sky-500/50 hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-7 h-7 text-sky-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Franchise
              </h2>
              <p className="text-slate-500 mb-6">
                Mandantenfähiges Partner-Ökosystem. Automatisierte
                Split-Payments via Stripe Connect und DSGVO-sichere
                Datenisolation.
              </p>
              <Link
                href="/fran"
                className="inline-flex items-center gap-2 text-sky-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Finanzen */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-sky-500/50 hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <CreditCard className="w-7 h-7 text-sky-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Finanzen
              </h2>
              <p className="text-slate-500 mb-6">
                100 % KassenSichV-konform. Automatisierte
                ready2order-TSE-Fiskalisierung und DATEV-Exporte für eine
                stressfreie Buchhaltung.
              </p>
              <Link
                href="/financial-accounting"
                className="inline-flex items-center gap-2 text-sky-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* ===== IT & System (іконка Server) ===== */}
          <h3 className="text-2xl font-bold text-salina-dark mb-6 flex items-center gap-2">
            <Server className="w-6 h-6 text-violet-600" /> IT & System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Booking Engine */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-violet-500/50 hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Calendar className="w-7 h-7 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Booking Engine
              </h2>
              <p className="text-slate-500 mb-6">
                Das technische Herzstück. Zuverlässiges Kapazitätsmanagement,
                Live-Kalender und Schutz vor Doppelbuchungen.
              </p>
              <Link
                href="/amelia"
                className="inline-flex items-center gap-2 text-violet-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Automatisierung */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-violet-500/50 hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Settings className="w-7 h-7 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Automatisierung
              </h2>
              <p className="text-slate-500 mb-6">
                Der unsichtbare Dirigent. Lokaler DSGVO-konformer Dispatcher für
                Workflows, VIP-Zuweisungen und Hintergrundprozesse.
              </p>
              <Link
                href="/ecosystem"
                className="inline-flex items-center gap-2 text-violet-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Hardware & MDM */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-violet-500/50 hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Terminal className="w-7 h-7 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Hardware & MDM
              </h2>
              <p className="text-slate-500 mb-6">
                Maximale Ausfallsicherheit und Kontrolle. Zentrales Management
                für Terminals, Kiosk-Mode und Remote-Wipe für absoluten
                Datenschutz.
              </p>
              <Link
                href="/hardware"
                className="inline-flex items-center gap-2 text-violet-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Infrastruktur */}
            <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 hover:border-violet-500/50 hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)] transition-all duration-500 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Cloud className="w-7 h-7 text-violet-600" />
              </div>
              <h2 className="text-2xl font-bold text-salina-dark mb-3">
                Infrastruktur
              </h2>
              <p className="text-slate-500 mb-6">
                Enterprise-Stabilität für den Alltag. Cloud-CDN, Edge-Security
                und Dual-WAN-Failover für einen ununterbrochenen Betrieb.
              </p>
              <Link
                href="/digital-faundation"
                className="inline-flex items-center gap-2 text-violet-600 font-semibold group-hover:gap-4 transition-all"
              >
                Mehr erfahren <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        {/* кінець Картки швидкого доступу */}
      </div>
    </div>
  );
}
