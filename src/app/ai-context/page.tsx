import { Sparkles, FileDown, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FriendlyAIPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
      {/* Декоративний фоновий елемент – легкий блюр */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.1),transparent_50%)] pointer-events-none" />

      {/* Головний контент */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        {/* Бейдж */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-salina-orange/10 text-salina-orange font-medium text-sm mb-8 border border-salina-orange/20 shadow-[0_0_15px_rgba(251,146,60,0.2)]">
          <Sparkles className="w-4 h-4" />
          <span>AI-Friendly Markdown</span>
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl font-bold text-salina-dark mb-6 leading-tight">
          Dein Projekt.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-salina-orange to-salina-pink">
            Befragbar für jede KI.
          </span>
        </h1>

        <p className="text-lg text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed">
          Eine einzelne, strukturierte Markdown-Datei mit allen relevanten
          Informationen zu La Salina – von der Architektur über Finanzen bis hin
          zur Marketingstrategie. Einfach an ein beliebiges LLM anhängen und
          sofort fundierte Antworten erhalten.
        </p>

        {/* Картка з файлом */}
        <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-lg mb-8 transition-all">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-6">
            <FileDown className="w-8 h-8 text-salina-orange" />
          </div>

          <h2 className="text-2xl font-bold text-salina-dark mb-3">
            salina-knowledge-base.md
          </h2>

          <div className="flex items-center justify-center gap-2 text-amber-600 mb-4">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">In Entwicklung</span>
          </div>

          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            Diese Datei wird derzeit mit allen relevanten Daten, Prozessen und
            Spezifikationen befüllt. Bald kannst du sie mit einem Klick
            herunterladen und mit jeder KI nutzen.
          </p>

          {/* Кнопка завантаження (поки неактивна) */}
          <button
            disabled
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-200 text-slate-400 font-semibold cursor-not-allowed transition-all"
          >
            <FileDown className="w-5 h-5" />
            Bald verfügbar
          </button>
        </div>
      </div>
    </div>
  );
}
