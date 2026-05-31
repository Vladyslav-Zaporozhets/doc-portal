"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  ShieldAlert,
  Info,
  Lock,
  Camera,
  Delete,
  CheckCircle2,
  Construction,
} from "lucide-react";

import { cn } from "@/lib/utils";

// --- ТИПИ ---

type PosStep = "lock" | "dashboard";

export default function PosPage() {
  const [step, setStep] = useState<PosStep>("lock");

  const [pin, setPin] = useState("");

  const [pinError, setPinError] = useState(false);

  const [cameraFlash, setCameraFlash] = useState(false);

  const [hoverInsight, setHoverInsight] = useState<{
    title: string;

    text: string;
  } | null>(null);

  // Правильний PIN для симуляції

  const CORRECT_PIN = "1234";

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;

      setPin(newPin);

      setPinError(false);

      // Коли введено 4 цифри, перевіряємо

      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          // Спалах камери (імітація фотофіксації)

          setCameraFlash(true);

          setTimeout(() => {
            setCameraFlash(false);

            setStep("dashboard");
          }, 600);
        } else {
          // Помилка

          setPinError(true);

          setTimeout(() => {
            setPin("");

            setPinError(false);
          }, 800);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {step === "lock" && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-slate-600 flex items-center gap-2.5 text-sm font-bold bg-white/90 px-5 py-3 rounded-full border border-slate-200 shadow-lg backdrop-blur-md z-20">
          <Camera className="w-4 h-4 text-salina-orange" />
          <span className="w-2.5 h-2.5 bg-salina-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(251,146,60,0.8)]"></span>
          Kamera aktiv
        </div>
      )}

      {/* Ефект спалаху камери */}

      <AnimatePresence>
        {cameraFlash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* === EKRAN 1: LOCK SCREEN === */}

      {step === "lock" && (
        <motion.div
          key="lock"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-4xl shadow-[0_20px_50px_rgba(51,65,85,0.05)] border border-slate-100 p-8 sm:p-10 text-center">
            {/* Іконка замка */}

            <div className="w-20 h-20 rounded-full bg-salina-orange/10 flex items-center justify-center mx-auto mb-6 shadow-sm border border-orange-50">
              <Lock className="w-8 h-8 text-salina-orange" />
            </div>

            <h2 className="text-2xl font-bold text-salina-dark mb-2 flex items-center justify-center gap-2">
              Mitarbeiter-Login
              <span
                className="relative flex items-center justify-center w-5 h-5 cursor-help ml-1"
                onMouseEnter={() =>
                  setHoverInsight({
                    title: "Schutz vor Buddy Punching & Audit",

                    text: "Keine geteilten Logins! Bei PIN-Eingabe macht die Frontkamera diskret ein Foto. Jede Aktion wird unter dem Namen des Mitarbeiters im unveränderlichen Security Log gespeichert – Schutz vor internen Betrugsfällen.",
                  })
                }
                onMouseLeave={() => setHoverInsight(null)}
              >
                <span className="absolute inset-0 bg-salina-orange/20 rounded-full animate-pulse"></span>

                <Info className="w-4 h-4 text-salina-orange relative z-10" />
              </span>
            </h2>

            <p className="text-sm font-medium text-slate-500 mb-8 px-4">
              Geben Sie Ihren persönlichen PIN ein oder halten Sie Ihren NFC-Tag
              an das Gerät.
            </p>

            {/* Поле вводу PIN з анімацією помилки */}

            <motion.div
              animate={pinError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="flex justify-center gap-3 mb-8"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-14 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl font-black transition-all duration-300 shadow-sm",

                    i < pin.length
                      ? pinError
                        ? "border-red-400 bg-red-50 text-red-500"
                        : "border-salina-orange bg-orange-50 text-salina-dark"
                      : "border-slate-100 bg-white text-slate-300",
                  )}
                >
                  {i < pin.length ? (pinError ? "!" : "•") : ""}
                </div>
              ))}
            </motion.div>

            {/* Цифрова клавіатура */}

            <div className="grid grid-cols-3 gap-3">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handlePinInput(digit)}
                  className="py-5 rounded-2xl bg-white shadow-sm border border-slate-100 text-2xl font-bold text-salina-dark hover:border-salina-orange hover:text-salina-orange hover:bg-orange-50 transition-all active:scale-95 active:shadow-inner"
                >
                  {digit}
                </button>
              ))}
              <div /> {/* Пуста клітинка */}
              <button
                onClick={() => handlePinInput("0")}
                className="py-5 rounded-2xl bg-white shadow-sm border border-slate-100 text-2xl font-bold text-salina-dark hover:border-salina-orange hover:text-salina-orange hover:bg-orange-50 transition-all active:scale-95 active:shadow-inner"
              >
                0
              </button>
              {/* Кнопка видалення */}
              <button
                onClick={handleDelete}
                className="py-5 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all active:scale-95"
              >
                <Delete className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Підказка для Корнелії (Static block below Auth) */}

          <div
            className="mt-6 mx-auto max-w-sm flex items-start gap-3 text-sm text-slate-600 bg-white/80 backdrop-blur-lg rounded-3xl p-5 border border-slate-100 shadow-lg cursor-help transition-all hover:shadow-xl hover:border-salina-orange/30 group"
            onMouseEnter={() =>
              setHoverInsight({
                title: "Schutz vor Buddy Punching & Audit",

                text: "Keine geteilten Logins! Bei PIN-Eingabe macht die Frontkamera diskret ein Foto. Jede Aktion wird unter dem Namen des Mitarbeiters im unveränderlichen Security Log gespeichert – Schutz vor internen Betrugsfällen.",
              })
            }
            onMouseLeave={() => setHoverInsight(null)}
          >
            <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Info className="w-4 h-4 text-salina-orange" />
            </div>

            <span>
              <strong className="text-salina-dark block mb-0.5">
                Security Insight:
              </strong>{" "}
              Warum kein generischer Login?
            </span>
          </div>
        </motion.div>
      )}

      {/* === EKRAN 2: DASHBOARD (Після розблокування) === */}

      {step === "dashboard" && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-5xl"
        >
          <div className="bg-white rounded-4xl shadow-[0_20px_50px_rgba(51,65,85,0.05)] border border-slate-100 p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-xs mb-4 border border-green-100">
                <CheckCircle2 className="w-4 h-4" /> Erfolgreich autorisiert
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-salina-dark mb-2">
                Tagesdashboard
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
                <Construction className="w-3.5 h-3.5" />
                Simulation in Entwicklung
              </span>
              <p className="text-slate-500 text-lg">
                Willkommen zurück, <strong>Admin</strong>. Ihre Schicht hat
                begonnen.
              </p>
            </div>

            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 shadow-sm shrink-0">
              <ShieldAlert className="w-8 h-8 text-salina-dark" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Плаваючий тултип з поясненнями */}

      <AnimatePresence>
        {hoverInsight && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-6 right-6 md:bottom-12 md:right-12 max-w-sm bg-white/95 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 shadow-2xl z-50"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 text-salina-orange font-bold text-xs mb-3">
              <Info className="w-4 h-4" /> Stakeholder Insight
            </div>

            <h3 className="text-lg font-bold text-salina-dark mb-2">
              {hoverInsight.title}
            </h3>

            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              {hoverInsight.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
