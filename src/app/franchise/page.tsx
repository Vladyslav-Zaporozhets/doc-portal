"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Info,
  Globe,
  ArrowLeftRight,
  FileSpreadsheet,
  ShoppingCart,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ТИПИ ТА ДАНІ ---

type Tab = "finances" | "clearing" | "b2b" | "security";

const INSIGHTS = {
  finances: {
    title: "Stripe Connect & Multi-Token",
    text: "Geld fließt dank Direct Charge direkt an den Franchisee, während Ihr 10%-Royalty vollautomatisch abgezogen und an das HQ gesendet wird. Das System nutzt dynamisch das korrekte ready2order-Token der jeweiligen GmbH für eine 100% getrennte Fiskalisierung.",
  },
  clearing: {
    title: "Automatisches Clearing",
    text: "Kauft ein Kunde online einen Gutschein (Geld geht ans HQ) und löst ihn in Berlin ein, berechnet der Clearing-Report am Monatsende automatisch die Ausgleichszahlung. Volle Transparenz ohne Excel-Chaos.",
  },
  b2b: {
    title: "B2B Procurement Hub",
    text: "Ein zentraler Marktplatz für Ihre Partner. MOQ (Mindestbestellmengen) verhindern unrentable Kleinlieferungen. Tiered Pricing belohnt Großbestellungen. Die Zahlung erfolgt automatisch via SEPA-Lastschrift.",
  },
  security: {
    title: "MDM & Synthetic Testing",
    text: "Überwachen Sie alle Filialen in Echtzeit. Synthetische Bots testen Buchungsstrecken und warnen vor Ausfällen. Bei Diebstahl eines Tablets greift der MDM Kill-Switch und löscht alle sensiblen DSGVO-Daten remote.",
  },
};

export default function FranchiseMasterControl() {
  const [activeTab, setActiveTab] = useState<Tab>("finances");

  const [hoverInsight, setHoverInsight] = useState<{
    title: string;
    text: string;
  } | null>(null);

  const currentInsight = INSIGHTS[activeTab];

  return (
    <div className="min-h-screen p-6 lg:px-12 lg:pt-4 lg:pb-12 animate-in fade-in duration-1000 flex flex-col">
      {/* --- ШАПКА ПОРТАЛУ --- */}
      <header className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-salina-dark mb-2 md:mt-1">
            Franchise Master Control{" "}
            <span className="text-salina-orange">(HQ)</span>
          </h1>
          <p className="text-slate-500 max-w-xl text-lg">
            Executive Control Center für Finanzen, Clearing, B2B und Compliance.
          </p>
        </div>
      </header>

      {/* --- ОСНОВНИЙ КОНТЕЙНЕР (ТЕПЕР НА GRID) --- */}
      {/* Grid на 12 колонок гарантує, що ніщо не буде стискатися */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-[1800px] mx-auto items-start">
        {/* === Ліва ЧАСТИНА: СИМУЛЯТОР (Займає 8 або 9 колонок) === */}
        <div className="lg:col-span-8 xl:col-span-9 w-full flex flex-col">
          <motion.div
            layout
            className="w-full h-[80vh] min-h-[700px] bg-slate-50 rounded-3xl border border-slate-200 shadow-2xl flex overflow-hidden"
          >
            {/* Бокове меню симулятора (жорстко 256px) */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-10">
              <div className="h-20 flex items-center px-8 border-b border-slate-100 shrink-0">
                <div className="font-black text-2xl tracking-tighter flex items-center gap-2">
                  <Globe className="w-6 h-6 text-salina-orange" />
                  <span className="text-salina-dark">HQ</span>
                  <span className="text-salina-orange">Control</span>
                </div>
              </div>

              <nav className="flex-1 flex flex-col gap-2 p-4">
                {[
                  {
                    id: "finances",
                    icon: ArrowLeftRight,
                    label: "Live-Finanzen",
                  },
                  {
                    id: "clearing",
                    icon: FileSpreadsheet,
                    label: "Clearing Report",
                  },
                  { id: "b2b", icon: ShoppingCart, label: "B2B Procurement" },
                  {
                    id: "security",
                    icon: ShieldCheck,
                    label: "Compliance & MDM",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium text-sm border",
                      activeTab === item.id
                        ? "bg-orange-50 border-orange-100 text-salina-orange shadow-sm"
                        : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-salina-dark",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5 shrink-0",
                        activeTab === item.id
                          ? "text-salina-orange"
                          : "text-slate-400",
                      )}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-salina-dark">
                      Cornelia
                    </p>
                    <p className="text-[10px] font-bold text-salina-orange uppercase tracking-wider">
                      CEO / Founder
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Робоча область симулятора */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50">
              <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 shrink-0 bg-white/80 backdrop-blur-md z-20">
                <h2 className="text-xl font-bold text-salina-dark flex items-center gap-3">
                  {activeTab === "finances" &&
                    "Globale Finanzen & Split-Payments"}
                  {activeTab === "clearing" && "Clearing & Intercompany"}
                  {activeTab === "b2b" && "Procurement Hub (B2B)"}
                  {activeTab === "security" && "Monitoring & Compliance"}
                </h2>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                    System Healthy
                  </span>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto p-8 relative">
                <AnimatePresence mode="wait">
                  {activeTab === "finances" && (
                    <motion.div
                      key="finances"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6 h-full"
                    >
                      <div className="border-2 border-slate-200 bg-white rounded-3xl p-8 flex items-center justify-center h-full border-dashed shadow-sm">
                        <p className="text-slate-400 font-bold">
                          Placeholder: Karte DACH, Stripe Split-Payment
                          Animation
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "clearing" && (
                    <motion.div
                      key="clearing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6 h-full"
                    >
                      <div className="border-2 border-slate-200 bg-white rounded-3xl p-8 flex items-center justify-center h-full border-dashed shadow-sm">
                        <p className="text-slate-400 font-bold">
                          Placeholder: Clearing Report Generator, Datenabgleich
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "b2b" && (
                    <motion.div
                      key="b2b"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6 h-full"
                    >
                      <div className="border-2 border-slate-200 bg-white rounded-3xl p-8 flex items-center justify-center h-full border-dashed shadow-sm">
                        <p className="text-slate-400 font-bold">
                          Placeholder: B2B Katalog, MOQ, Tiered Pricing, SEPA
                          Checkout
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "security" && (
                    <motion.div
                      key="security"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6 h-full"
                    >
                      <div className="border-2 border-slate-200 bg-white rounded-3xl p-8 flex items-center justify-center h-full border-dashed shadow-sm">
                        <p className="text-slate-400 font-bold">
                          Placeholder: Synthetic Testing Radar, MDM Kill-Switch,
                          Matomo Stats
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </main>
          </motion.div>
        </div>

        {/* === Права ЧАСТИНА: БІЗНЕС-ІНСАЙТИ (Займає 4 або 3 колонки) === */}
        <div className="lg:col-span-4 xl:col-span-3 w-full sticky top-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoverInsight ? hoverInsight.title : currentInsight.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-lg p-5 md:p-8 rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(51,65,85,0.05)] relative overflow-hidden"
            >
              {/* Повернув bg-gradient-to-b для надійності в усіх версіях Tailwind */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-salina-orange to-salina-pink"></div>

              <div
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-sm mb-6 transition-colors",
                  hoverInsight
                    ? "bg-orange-50 text-salina-orange"
                    : "bg-slate-100 text-slate-500",
                )}
              >
                {hoverInsight ? (
                  <Info className="w-4 h-4" />
                ) : (
                  <ShieldAlert className="w-4 h-4" />
                )}
                <span>
                  {hoverInsight ? "Executive Insight" : "Geschäftslogik"}
                </span>
              </div>

              <h3 className="text-xl font-bold text-salina-dark mb-4 leading-tight">
                {hoverInsight ? hoverInsight.title : currentInsight.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {hoverInsight ? hoverInsight.text : currentInsight.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
