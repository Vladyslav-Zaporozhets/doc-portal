"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Sparkles,
  FileDown,
  Terminal,
  Wand2,
  MessageSquare,
  Zap,
  Bot,
  ArrowRight,
  Brain,
  Cpu,
  Rocket,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

// Анімаційні константи для плавного скролу
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FriendlyAIPage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center overflow-x-hidden bg-[#FAFAFA] font-sans">
      {/* Пульсуючий фоновий елемент */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.15),transparent_50%)] pointer-events-none"
      />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-32 space-y-32">
        {/* --- 1. HERO SECTION --- */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center flex flex-col items-center"
        >
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-salina-orange/10 text-salina-orange font-medium text-sm mb-8 border border-salina-orange/20 shadow-[0_0_15px_rgba(251,146,60,0.2)]"
          >
            <Sparkles className="w-4 h-4" />
            <span>La Salina AI Workspace</span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-6xl font-bold text-salina-dark mb-6 leading-tight max-w-4xl"
          >
            Dein Projekt.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink">
              Bereit für jede KI.
            </span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Die gesamte La Salina Architektur, Finanzen und Compliance in einer
            einzigen Datei. Lade das Master-Dokument herunter und starte die
            Arbeit mit deinem Lieblings-Assistenten.
          </motion.p>

          {/* Активна картка файлу з анімацією Hover */}
          <motion.div
            variants={staggerItem}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 40px -15px rgba(251,146,60,0.15)",
            }}
            className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center gap-4 max-w-md w-full transition-all"
          >
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 ml-1">
              <FileDown className="w-7 h-7 text-salina-orange" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-[15px] text-salina-dark">
                llms-full.md
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 mb-1">
                Letztes Update: 01. Juni 2026
              </p>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Bereit zum Download
              </p>
            </div>

            <motion.a
              whileTap={{ scale: 0.95 }}
              href="/llms-full.md"
              download
              className="px-5 py-3 bg-salina-orange text-white rounded-xl text-sm font-semibold mr-1 flex items-center gap-2 hover:bg-orange-500 shadow-md shadow-orange-500/20"
            >
              <FileDown className="w-4 h-4" />
              Download
            </motion.a>
          </motion.div>
        </motion.section>

        {/* --- 2. ПІДТРИМКА МОДЕЛЕЙ --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Getestet und optimiert für
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              {
                name: "ChatGPT",
                icon: Bot,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                name: "Claude 3.5",
                icon: Cpu,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                name: "Gemini Pro",
                icon: Sparkles,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                name: "DeepSeek",
                icon: Brain,
                color: "text-indigo-600",
                bg: "bg-indigo-50",
              },
              {
                name: "Qwen",
                icon: Rocket,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
            ].map((model, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-200/80 rounded-full shadow-sm hover:shadow-md hover:border-slate-300 transition-colors cursor-default"
              >
                <div
                  className={`w-7 h-7 rounded-full ${model.bg} flex items-center justify-center shrink-0`}
                >
                  <model.icon className={`w-4 h-4 ${model.color}`} />
                </div>
                <span className="text-[15px] font-semibold text-slate-700">
                  {model.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- 3. ЯК ПОЧАТИ --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-salina-dark">
              Wie funktioniert es?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Datei laden",
                desc: "Lade die .md Datei herunter. Sie enthält alle Systemregeln, Prompts und das Wissen von La Salina.",
              },
              {
                step: "02",
                title: "KI öffnen",
                desc: "Ziehe die Datei einfach in den Chat deines bevorzugten KI-Modells (z.B. Claude oder DeepSeek).",
              },
              {
                step: "03",
                title: "Chatten",
                desc: "Die KI übernimmt sofort die Rolle deines Produkt-Guides. Du kannst direkt loslegen!",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:border-salina-orange/40 hover:shadow-md transition-colors"
              >
                <div className="inline-block px-3 py-1.5 bg-orange-50 text-salina-orange font-mono text-xs font-bold rounded-lg mb-5 border border-orange-100">
                  Schritt {item.step}
                </div>
                <h4 className="text-xl font-bold text-salina-dark mb-3">
                  {item.title}
                </h4>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- 4. MAGIC COMMANDS --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-salina-dark mb-4">
              Magic Commands
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Nutze diese Kurzbefehle im Chat. Klicke auf einen Befehl, um ihn
              direkt zu kopieren.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                cmd: "/task",
                icon: Terminal,
                title: "Entwickler-Ticket",
                desc: "Generiert ein fertiges Jira-Ticket für Vladyslav inkl. Architektur-Check.",
              },
              {
                cmd: "/stresstest",
                icon: Zap,
                title: "Advocatus Diaboli",
                desc: "Sucht kritische Fehler in deiner Idee (DSGVO, Offline, KassenSichV).",
              },
              {
                cmd: "/mockup",
                icon: Wand2,
                title: "UI-Skizze",
                desc: "Zeichnet dir ein visuelles Wireframe der neuen Funktion in ASCII.",
              },
              {
                cmd: "/erklaere",
                icon: MessageSquare,
                title: "Einfache Analogien",
                desc: "Erklärt IT-Begriffe anhand von Beispielen aus der Salzgrotte.",
              },
              {
                cmd: "/simuliere",
                icon: Bot,
                title: "Rollenspiel",
                desc: "Die KI schlüpft in die Rolle eines Kunden und testet die UX.",
              },
              {
                cmd: "/handoff",
                icon: FileDown,
                title: "Dev-Export",
                desc: "Fasst den Chat als perfektes Markdown-Dokument zusammen.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="group relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-salina-orange/40 transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-salina-orange/10 group-hover:border-salina-orange/20 transition-colors">
                    <item.icon
                      className="w-5 h-5 text-slate-500 group-hover:text-salina-orange transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Кнопка копіювання команди */}
                  <button
                    onClick={() => handleCopy(item.cmd)}
                    className="flex items-center gap-1.5 font-mono text-[13px] font-bold text-salina-orange bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-100 transition-colors"
                  >
                    {copiedCmd === item.cmd ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedCmd === item.cmd ? "Kopiert" : item.cmd}
                  </button>
                </div>
                <h4 className="font-bold text-salina-dark mb-2 text-lg">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- 5. CHAT PREVIEW --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-slate-400 font-mono tracking-widest uppercase">
                KI Chat Preview
              </span>
            </div>

            <div className="p-6 md:p-10 space-y-8">
              {/* User Message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-end"
              >
                <div className="bg-slate-900 text-white px-6 py-5 rounded-3xl rounded-tr-sm max-w-[80%] shadow-md">
                  <p className="text-[15px] font-light leading-relaxed">
                    Können wir den Check-in mit einem NFC-Armband am Drehkreuz
                    machen?
                  </p>
                  <div className="mt-3 inline-block">
                    <span className="text-salina-orange font-mono text-sm bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                      /stresstest Check-in
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* AI Message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex gap-4 md:gap-6"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-1 border border-orange-200">
                  <Zap
                    className="w-5 h-5 text-salina-orange"
                    fill="currentColor"
                  />
                </div>
                <div className="bg-slate-50 border border-slate-100 text-slate-800 px-6 md:px-8 py-6 rounded-3xl rounded-tl-sm max-w-[85%] shadow-sm">
                  <p className="font-bold text-salina-dark mb-4 text-base">
                    Stresstest initiiert (Advocatus Diaboli):
                  </p>
                  <p className="text-[15px] leading-relaxed mb-5 text-slate-600">
                    Die Idee ist großartig für VIPs, aber hier sind 2 kritische
                    System-Risiken für das La Salina-Setup:
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex gap-3 text-[15px] text-slate-600">
                      <span className="text-salina-orange font-bold text-lg leading-none">
                        •
                      </span>
                      <span>
                        <strong>Aufsichtspflicht:</strong> Das Drehkreuz kann
                        nicht prüfen, ob ein Erwachsener dabei ist. Kinder
                        könnten alleine eintreten.
                      </span>
                    </li>
                    <li className="flex gap-3 text-[15px] text-slate-600">
                      <span className="text-salina-orange font-bold text-lg leading-none">
                        •
                      </span>
                      <span>
                        <strong>Offline-Fallback:</strong> Wenn das Internet
                        ausfällt, kann das Drehkreuz die 10er-Karte nicht im
                        System abfragen.
                      </span>
                    </li>
                  </ul>

                  <div className="pt-5 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                    <span className="text-[13px] text-slate-500 font-semibold uppercase tracking-wider">
                      Aktion erforderlich
                    </span>
                    <button className="flex items-center gap-2 text-sm font-bold text-salina-orange bg-white border border-slate-200 px-4 py-2 rounded-xl hover:border-salina-orange hover:shadow-sm transition-all active:scale-95">
                      /task generieren <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
