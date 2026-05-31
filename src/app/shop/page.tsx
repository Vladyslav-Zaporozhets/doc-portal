"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Gift,
  CreditCard,
  ShieldAlert,
  Info,
  Monitor,
  Smartphone,
  Crown,
  CheckCircle2,
  CalendarDays,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ТИПИ ТА ДАНІ ---

type Tab = "all" | "gutscheine" | "pakete" | "salinaPass";
type DeviceView = "mobile" | "desktop";

const INSIGHTS = {
  all: {
    title: "Das E-Commerce Ökosystem",
    text: "Willkommen im Shop. Hier sehen Sie alle digitalen Assets, die Kunden erwerben können, um das Erlebnis zu verlängern oder zu verschenken. Jedes Asset nutzt eine spezialisierte Engine: WooCommerce für Gutscheine & Abos, Amelia für Pakete.",
  },
  gutscheine: {
    title: "Gutscheine als Cashflow-Booster",
    text: "Der Verkauf von Wertgutscheinen bringt sofortige Liquidität (Upfront Revenue). Da laut Statistik ca. 15-20% der Gutscheine nie eingelöst werden, ist dies reiner Gewinn. Die PDF-Generierung und der Versand erfolgen 100% automatisiert über WooCommerce & PDF Vouchers.",
  },
  pakete: {
    title: "Kundenbindung durch 10er-Karten",
    text: "Abonnements und Pakete (z.B. die 10er-Karte) binden den Kunden langfristig an La Salina. Das System bucht beim Einbuchen automatisch eine Einheit ab – kein manuelles Abstempeln vor Ort, keine Fehler, maximale Effizienz an der Rezeption. Verwaltet von Amelia Packages.",
  },
  salinaPass: {
    title: "Salinapass (Abonnement)",
    text: "Die Königsdisziplin: Kunden zahlen monatlich/jährlich und erhalten VIP-Status mit unbegrenzten Besuchen. WooCommerce Subscriptions + Stripe Billing sorgen für automatische Verlängerungen, Mahnwesen und sichere SEPA-Lastschriften. Der Uncanny Automator verleiht dem Kunden die VIP-Member-Rolle für Zero-Checkout bei Amelia.",
  },
  cart: {
    title: "Der Checkout-Prozess",
    text: "Trennung von Amelia und WooCommerce. Buchungen (Amelia) und Shop-Käufe (WooCommerce) sind getrennte Wege, um die geniale Architektur für Stripe Connect (Split-Payments für Franchises) nicht zu gefährden. Im Shop-Checkout werden Gutscheine, Pakete und Abos gesammelt und mit den nötigen Zahlungsarten abgeschlossen.",
  },
};

const TOOLTIPS = {
  scheduledDelivery: {
    title: "WOW-Service: Scheduled Delivery",
    text: "Der Kunde kauft im November, aber das System sendet das PDF exakt am 24.12. um 09:00 Uhr an die Beschenkte. Der Kunde ist glücklich, und Sie haben das Geld einen Monat früher.",
  },
  restguthaben: {
    title: "Rechtssicherheit & Upsell",
    text: "Nach deutschem Recht gelten Gutscheine 3 Jahre. Unser System speichert Restbeträge automatisch unter demselben Code ab (Restguthaben). Um die restlichen 60€ auszugeben, kommt der Kunde wieder!",
  },
  zeroCheckout: {
    title: "Zero-Checkout Magie",
    text: "Sobald das Abo gekauft ist, macht Uncanny Automator den Kunden zum 'VIP_Member'. Bucht dieser Kunde nun im normalen Kalender, wird der Preis automatisch auf 0 € gesetzt. Reiner Club-Service!",
  },
  sepa: {
    title: "Lokale Zahlungsmethoden (SEPA)",
    text: "Für Abos in Deutschland reicht Apple Pay nicht. Die meisten Deutschen bevorzugen das SEPA-Lastschriftverfahren. Wir haben dies via Stripe integriert, um keinen Kunden zu verlieren.",
  },
  dunning: {
    title: "Stripe Billing Dunning (Autopilot)",
    text: "Kreditkarte leer? Stripe sendet automatisch höfliche E-Mails zur Aktualisierung und pausiert temporär den VIP-Status samt Rabatt. Kein manuelles Nachfassen nötig!",
  },
  isolation: {
    title: "Architektur-Isolation",
    text: "Warum kann man hier keine Termine buchen? Bewusste Isolation! Termine laufen über Amelia, E-Commerce über WooCommerce. Das schützt unser 'Stripe Connect' Split-Payment-System für Franchisees.",
  },
};

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [deviceView, setDeviceView] = useState<DeviceView>("mobile");

  // Стани для Gutscheine
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedDesign, setSelectedDesign] = useState<
    "salz" | "spiel" | "entspannung"
  >("salz");
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [giftDeliveryDate, setGiftDeliveryDate] = useState("");

  // Стани для Salinapass
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  // Кошик та Checkout
  const [cartItems, setCartItems] = useState<
    { type: string; name: string; price: number }[]
  >([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Ховер-підказки
  const [hoverInsight, setHoverInsight] = useState<{
    title: string;
    text: string;
  } | null>(null);

  const currentInsight = INSIGHTS[showCheckout ? "cart" : activeTab];

  // --- ЛОГІКА ДЛЯ DRAG-TO-SCROLL (МИШКОЮ ЯК ПАЛЬЦЕМ) ---
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tabsRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tabsRef.current.offsetLeft);
    setScrollLeft(tabsRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabsRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Швидкість скролу
    tabsRef.current.scrollLeft = scrollLeft - walk;
  };
  // -----------------------------------------------------

  return (
    <div className="min-h-screen p-6 lg:px-12 lg:pt-4 lg:pb-12 animate-in fade-in duration-1000 flex flex-col">
      {/* Шапка сторінки */}
      <header className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-salina-dark mb-2 md:mt-1">
            E-Commerce <span className="text-salina-orange">(Shop)</span>
          </h1>
          <p className="text-slate-500 max-w-xl text-lg">
            Verkauf von digitalen Assets: Gutscheine, Pakete & Abos.
          </p>
        </div>

        {/* Device Toggle */}
        <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm md:mt-1">
          <button
            onClick={() => setDeviceView("mobile")}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300",
              deviceView === "mobile"
                ? "bg-salina-dark text-white shadow-md"
                : "text-slate-500 hover:text-salina-dark hover:bg-white",
            )}
          >
            <Smartphone className="w-5 h-5" /> Mobile
          </button>
          <button
            onClick={() => setDeviceView("desktop")}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300",
              deviceView === "desktop"
                ? "bg-salina-dark text-white shadow-md"
                : "text-slate-500 hover:text-salina-dark hover:bg-white",
            )}
          >
            <Monitor className="w-5 h-5" /> Desktop
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-[1400px] w-full mx-auto">
        {/* === ЛІВА ЧАСТИНА: СИМУЛЯЦІЯ ШОПУ === */}
        <div className="xl:col-span-7 flex justify-center items-start relative">
          <motion.div
            layout
            className={cn(
              "relative flex flex-col transition-all duration-500 bg-white",
              deviceView === "mobile"
                ? "w-full max-w-[400px] h-[80vh] min-h-[600px] bg-white/60 backdrop-blur-xl rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden"
                : "w-full max-w-[1000px] h-[80vh] min-h-[600px] rounded-3xl border border-slate-200 shadow-2xl overflow-hidden",
            )}
          >
            {deviceView === "mobile" && (
              <div className="w-full h-7 bg-salina-dark/5 flex items-center justify-center shrink-0 z-50">
                <div className="w-1/3 h-1.5 bg-salina-dark/20 rounded-full"></div>
              </div>
            )}

            <div className="flex-1 flex flex-col relative w-full h-full bg-slate-50 min-h-0">
              {/* Шапка магазину */}
              <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-100 z-10">
                <div className="font-bold text-xl text-salina-dark">
                  La<span className="text-salina-orange">Salina</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Ізоляція Інсайт */}
                  <div
                    className="relative group cursor-help flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100"
                    onMouseEnter={() => setHoverInsight(TOOLTIPS.isolation)}
                    onMouseLeave={() => setHoverInsight(null)}
                  >
                    <div className="absolute -left-1 -top-1 w-3 h-3 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-salina-orange z-30 animate-pulse">
                      <Info className="w-2 h-2" />
                    </div>
                    <ShieldAlert className="w-4 h-4 text-slate-400" />
                  </div>

                  <button
                    onClick={() => {
                      if (cartItems.length > 0) setShowCheckout(true);
                      else alert("Warenkorb ist leer.");
                    }}
                    className={cn(
                      "relative p-2 rounded-xl transition-all duration-300 border",
                      showCheckout
                        ? "bg-salina-orange text-white border-salina-orange shadow-md"
                        : "bg-slate-50 text-salina-dark border-slate-100 hover:bg-slate-100 hover:border-slate-200",
                    )}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <AnimatePresence>
                      {cartItems.length > 0 && (
                        <motion.span
                          key="cart-badge"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-salina-pink text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-sm"
                        >
                          {cartItems.length}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              {/* Навігація магазину (Таби з Drag-to-Scroll) */}
              <div
                ref={tabsRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={cn(
                  "bg-white px-4 pt-4 pb-0 flex gap-2 items-center overflow-x-auto shrink-0 hide-scrollbar border-b border-slate-100",
                  isDragging ? "cursor-grabbing" : "cursor-grab",
                )}
              >
                {[
                  { tab: "all", label: "Alle" },
                  { tab: "gutscheine", label: "🎁 Gutscheine" },
                  { tab: "pakete", label: "🎟 Pakete" },
                  { tab: "salinaPass", label: "👑 Salinapass" },
                ].map(({ tab, label }) => (
                  <button
                    key={tab}
                    onClick={() => {
                      if (!isDragging) {
                        // Запобігаємо кліку, якщо користувач просто скролив
                        setActiveTab(tab as Tab);
                        setShowCheckout(false);
                      }
                    }}
                    className={cn(
                      "px-4 py-3 font-bold flex items-center gap-2 transition-all whitespace-nowrap border-b-2 select-none",
                      activeTab === tab && !showCheckout
                        ? "text-salina-orange border-salina-orange"
                        : "text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50 rounded-t-xl",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Основний Контент */}
              <div
                className={cn(
                  "flex-1 overflow-y-auto min-h-0",
                  deviceView === "desktop" ? "p-8 pb-24" : "p-5 pb-24",
                )}
              >
                <AnimatePresence mode="wait">
                  {/* --- ВКЛАДКА: ALLE --- */}
                  {activeTab === "all" && !showCheckout && (
                    <motion.div
                      key="all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-salina-dark">
                        Entdecken Sie unsere Angebote
                      </h2>
                      <p className="text-slate-500">
                        Wählen Sie eine Kategorie, um die Produkte zu
                        durchsuchen.
                      </p>
                      <div
                        className={cn(
                          "grid gap-4",
                          deviceView === "desktop"
                            ? "grid-cols-2"
                            : "grid-cols-1",
                        )}
                      >
                        <div
                          onClick={() => setActiveTab("gutscheine")}
                          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-salina-orange/50 hover:shadow-md cursor-pointer group transition-all"
                        >
                          <Gift className="w-8 h-8 text-salina-orange mb-4 group-hover:scale-110 transition-transform" />
                          <h3 className="font-bold text-salina-dark text-lg">
                            Wertgutscheine
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Freude & Entspannung verschenken.
                          </p>
                        </div>
                        <div
                          onClick={() => setActiveTab("pakete")}
                          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-salina-orange/50 hover:shadow-md cursor-pointer group transition-all"
                        >
                          <CreditCard className="w-8 h-8 text-salina-orange mb-4 group-hover:scale-110 transition-transform" />
                          <h3 className="font-bold text-salina-dark text-lg">
                            10er-Karten
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Smarte Pakete für Familien.
                          </p>
                        </div>
                        <div
                          onClick={() => setActiveTab("salinaPass")}
                          className={cn(
                            "bg-white rounded-3xl p-6 shadow-sm border border-salina-orange/30 hover:border-salina-orange cursor-pointer relative group transition-all hover:shadow-md overflow-hidden",
                            deviceView === "desktop"
                              ? "col-span-2"
                              : "col-span-1",
                          )}
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all group-hover:bg-salina-orange/20"></div>
                          <Crown className="w-8 h-8 text-salina-orange mb-4 group-hover:scale-110 transition-transform relative z-10" />
                          <h3 className="font-bold text-salina-dark text-lg relative z-10">
                            Salinapass
                          </h3>
                          <p className="text-sm text-slate-500 mt-1 relative z-10">
                            Unbegrenzter VIP-Zugang zur Anlage.
                          </p>
                          <span className="absolute top-6 right-6 bg-linear-to-r from-salina-orange to-salina-pink text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                            Top Abo
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* --- ВКЛАДКА: СЕРТИФІКАТИ --- */}
                  {activeTab === "gutscheine" && !showCheckout && (
                    <motion.div
                      key="gutscheine"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div
                        className={cn(
                          "bg-white rounded-3xl shadow-sm border border-slate-100 space-y-8",
                          deviceView === "desktop" ? "p-8" : "p-5",
                        )}
                      >
                        <h2 className="text-2xl font-bold text-salina-dark">
                          Wertgutschein La Salina
                        </h2>

                        {/* Вибір номіналу */}
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                            Betrag wählen
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {[25, 50, 100].map((amt) => (
                              <button
                                key={amt}
                                onClick={() => {
                                  setSelectedAmount(amt);
                                  setCustomAmount("");
                                }}
                                className={cn(
                                  "rounded-2xl border-2 font-bold transition-all duration-300",
                                  deviceView === "desktop"
                                    ? "py-3"
                                    : "py-2 text-sm",
                                  selectedAmount === amt && !customAmount
                                    ? "border-salina-orange bg-orange-50 text-salina-orange shadow-sm"
                                    : "border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50 bg-white",
                                )}
                              >
                                {amt} €
                              </button>
                            ))}
                          </div>
                          <div className="mt-4 relative">
                            <input
                              type="number"
                              value={customAmount}
                              onChange={(e) => {
                                setCustomAmount(e.target.value);
                                if (e.target.value) setSelectedAmount(0);
                              }}
                              placeholder="Oder eigener Betrag"
                              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-sm font-bold text-slate-700 shadow-sm focus:border-salina-orange focus:ring-4 focus:ring-salina-orange/10 focus:bg-white outline-none transition-all"
                            />
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                              €
                            </span>
                          </div>
                        </div>

                        {/* Вибір дизайну */}
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                            Design
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { id: "salz", emoji: "🧂", label: "Salz" },
                              { id: "spiel", emoji: "🎨", label: "Spiel" },
                              { id: "entspannung", emoji: "🌸", label: "Ruhe" },
                            ].map((d) => (
                              <button
                                key={d.id}
                                onClick={() =>
                                  setSelectedDesign(
                                    d.id as typeof selectedDesign,
                                  )
                                }
                                className={cn(
                                  "py-4 rounded-2xl border-2 text-3xl flex flex-col items-center gap-2 transition-all duration-300",
                                  selectedDesign === d.id
                                    ? "border-salina-orange bg-orange-50 shadow-sm scale-[1.02]"
                                    : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50",
                                )}
                              >
                                <span>{d.emoji}</span>
                                <span
                                  className={cn(
                                    "text-xs font-bold",
                                    selectedDesign === d.id
                                      ? "text-salina-orange"
                                      : "text-slate-500",
                                  )}
                                >
                                  {d.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Опції відправки */}
                        <div className="pt-6 border-t border-slate-100">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={showGiftForm}
                                onChange={() => setShowGiftForm(!showGiftForm)}
                                className="w-6 h-6 rounded-[0.4rem] border-2 border-slate-300 text-salina-orange focus:ring-salina-orange focus:ring-offset-0 transition-colors cursor-pointer"
                              />
                            </div>
                            <span className="font-bold text-slate-700 group-hover:text-salina-dark transition-colors">
                              Für jemand anderen (als Geschenk)
                            </span>
                          </label>

                          <AnimatePresence>
                            {showGiftForm && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4 mt-5 overflow-hidden border-l-2 border-salina-orange/20 pl-4 md:pl-6"
                              >
                                <input
                                  type="text"
                                  placeholder="Name des Empfängers"
                                  value={recipientName}
                                  onChange={(e) =>
                                    setRecipientName(e.target.value)
                                  }
                                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm shadow-sm focus:border-salina-orange focus:bg-white focus:ring-4 focus:ring-salina-orange/10 outline-none transition-all"
                                />
                                <input
                                  type="email"
                                  value={recipientEmail}
                                  onChange={(e) =>
                                    setRecipientEmail(e.target.value)
                                  }
                                  placeholder="E-Mail des Empfängers"
                                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm shadow-sm focus:border-salina-orange focus:bg-white focus:ring-4 focus:ring-salina-orange/10 outline-none transition-all"
                                />
                                <textarea
                                  value={giftMessage}
                                  onChange={(e) =>
                                    setGiftMessage(e.target.value)
                                  }
                                  placeholder="Persönliche Nachricht..."
                                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm shadow-sm resize-none min-h-24 focus:border-salina-orange focus:bg-white focus:ring-4 focus:ring-salina-orange/10 outline-none transition-all"
                                />

                                <div className="pt-2">
                                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Zustelldatum (optional)
                                  </label>
                                  <div
                                    className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 shadow-sm cursor-help hover:border-salina-orange transition-all group"
                                    onMouseEnter={() =>
                                      setHoverInsight(
                                        TOOLTIPS.scheduledDelivery,
                                      )
                                    }
                                    onMouseLeave={() => setHoverInsight(null)}
                                  >
                                    <div className="absolute -left-2 -top-2 w-5 h-5 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-salina-orange z-30 animate-pulse">
                                      <Info className="w-3 h-3" />
                                    </div>
                                    <CalendarDays className="w-5 h-5 text-salina-orange mr-3" />
                                    <input
                                      type="date"
                                      value={giftDeliveryDate}
                                      onChange={(e) =>
                                        setGiftDeliveryDate(e.target.value)
                                      }
                                      className="flex-1 bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div
                          className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 cursor-help w-fit hover:border-salina-orange/30 transition-colors"
                          onMouseEnter={() =>
                            setHoverInsight(TOOLTIPS.restguthaben)
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <div className="w-5 h-5 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center text-salina-orange animate-pulse shrink-0">
                            <Info className="w-3 h-3" />
                          </div>
                          <span className="font-medium">
                            Gültig 3 Jahre. Restguthaben bleibt gespeichert.
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            const price = customAmount
                              ? parseFloat(customAmount)
                              : selectedAmount;
                            setCartItems([
                              ...cartItems,
                              {
                                type: "gutschein",
                                name: `Gutschein (${price} €)`,
                                price,
                              },
                            ]);
                            alert("✅ In den Warenkorb gelegt!");
                          }}
                          disabled={!(customAmount || selectedAmount)}
                          className={cn(
                            "w-full py-4 rounded-2xl font-bold text-white transition-all bg-linear-to-r from-salina-orange to-salina-pink shadow-lg flex justify-center items-center gap-2 text-lg",
                            !(customAmount || selectedAmount)
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:shadow-xl hover:-translate-y-0.5",
                          )}
                        >
                          <ShoppingBag className="w-5 h-5" /> In den Warenkorb
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* --- СЕКЦІЯ 2: ПАКЕТИ --- */}
                  {activeTab === "pakete" && !showCheckout && (
                    <motion.div
                      key="pakete"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-salina-pink text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest shadow-sm">
                          Amelia Native
                        </div>

                        <h2 className="text-2xl font-bold text-salina-dark pt-4">
                          10er-Karte Salzraum
                        </h2>

                        <div className="bg-slate-50 p-5 rounded-2xl space-y-4 border border-slate-100">
                          <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            10 Besuche im Salzraum für 1 Erw. & 1 Kind
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                            <CalendarDays className="w-5 h-5 text-slate-400 shrink-0" />
                            Gültig 6 Monate ab Kaufdatum
                          </div>
                        </div>

                        <div
                          className={cn(
                            "flex justify-between border-t border-slate-100 pt-6 gap-4",
                            deviceView === "desktop"
                              ? "flex-row items-end"
                              : "flex-col items-start",
                          )}
                        >
                          <div>
                            <div className="text-sm font-bold text-slate-400 line-through mb-1">
                              125,00 €
                            </div>
                            <div className="text-4xl font-black text-salina-dark">
                              110,00 €
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setCartItems([
                                ...cartItems,
                                {
                                  type: "paket",
                                  name: "10er-Karte Salzraum",
                                  price: 110,
                                },
                              ]);
                              alert("✅ In den Warenkorb gelegt!");
                            }}
                            className="w-full sm:w-auto py-4 px-8 rounded-2xl font-bold text-white transition-all bg-salina-dark hover:bg-slate-800 shadow-lg flex items-center justify-center gap-2"
                          >
                            <CreditCard className="w-5 h-5" /> Kaufen
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* --- СЕКЦІЯ 3: SALINAPASS --- */}
                  {activeTab === "salinaPass" && !showCheckout && (
                    <motion.div
                      key="salinaPass"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="bg-salina-dark rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-salina-orange/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                        <div className="flex items-center justify-between relative z-10 mb-8">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-linear-to-br from-salina-orange to-salina-pink rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                              <Crown className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                Salinapass Family
                              </h2>
                              <span className="text-salina-orange text-xs md:text-sm font-bold">
                                Premium Abonnement
                              </span>
                            </div>
                          </div>
                          <span
                            className={cn(
                              "bg-linear-to-r from-salina-orange to-salina-pink text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg",
                              deviceView === "desktop"
                                ? "inline-block"
                                : "hidden",
                            )}
                          >
                            Bestseller
                          </span>
                        </div>

                        <div className="space-y-4 mb-8 relative z-10 bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 backdrop-blur-md">
                          <div
                            className="absolute -right-3 -top-3 w-8 h-8 bg-slate-700 rounded-full shadow-lg border border-slate-600 flex items-center justify-center text-salina-orange z-30 cursor-help hover:bg-slate-600 transition-colors"
                            onMouseEnter={() =>
                              setHoverInsight(TOOLTIPS.zeroCheckout)
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <div className="absolute -left-1 -top-1 w-3 h-3 bg-salina-orange rounded-full animate-pulse"></div>
                            <Info className="w-4 h-4" />
                          </div>

                          <div className="flex items-start gap-3 text-sm font-medium text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-salina-orange shrink-0" />
                            Unbegrenzte Besuche für die ganze Familie
                          </div>
                          <div className="flex items-start gap-3 text-sm font-medium text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-salina-orange shrink-0" />
                            Exklusiver Zugang zur Eltern-Lounge
                          </div>
                          <div className="flex items-start gap-3 text-sm font-medium text-slate-300">
                            <CheckCircle2 className="w-5 h-5 text-salina-orange shrink-0" />
                            Jederzeit flexibel kündbar im Dashboard
                          </div>
                        </div>

                        <div className="bg-slate-900/50 p-2 rounded-2xl flex mb-8 relative z-10">
                          <button
                            onClick={() => setBillingCycle("monthly")}
                            className={cn(
                              "flex-1 py-3 text-[10px] md:text-sm font-bold rounded-xl transition-all duration-300",
                              billingCycle === "monthly"
                                ? "bg-salina-orange text-white shadow-md"
                                : "text-slate-400 hover:text-white",
                            )}
                          >
                            Monatlich
                          </button>
                          <button
                            onClick={() => setBillingCycle("yearly")}
                            className={cn(
                              "flex-1 py-3 text-[10px] md:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1",
                              billingCycle === "yearly"
                                ? "bg-salina-orange text-white shadow-md"
                                : "text-slate-400 hover:text-white",
                            )}
                          >
                            Jährlich{" "}
                            <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                              -16%
                            </span>
                          </button>
                        </div>

                        <div
                          className={cn(
                            "flex justify-between gap-6 relative z-10",
                            deviceView === "desktop"
                              ? "flex-row items-end"
                              : "flex-col items-start",
                          )}
                        >
                          <div>
                            <div className="text-4xl font-black text-white">
                              {billingCycle === "monthly"
                                ? "49,00 €"
                                : "490,00 €"}
                            </div>
                            <div className="text-sm font-medium text-slate-400 mt-1">
                              {billingCycle === "monthly"
                                ? "/ Monat"
                                : "/ Jahr (2 Monate gratis)"}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const price =
                                billingCycle === "yearly" ? 490 : 49;
                              setCartItems([
                                ...cartItems,
                                {
                                  type: "salinaPass",
                                  name: `Salinapass (${billingCycle})`,
                                  price,
                                },
                              ]);
                              alert("✅ In den Warenkorb gelegt!");
                            }}
                            className="w-full sm:w-auto py-4 px-8 rounded-2xl font-bold text-salina-dark transition-all bg-white hover:bg-slate-50 shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:shadow-[0_0_30px_rgba(251,146,60,0.5)] flex items-center justify-center gap-2 text-lg"
                          >
                            <Crown className="w-5 h-5" /> Abonnieren
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* --- СЕКЦІЯ 4: CHECKOUT (КОШИК) --- */}
                  {showCheckout && (
                    <motion.div
                      key="checkout"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={cn(
                        "space-y-6 bg-white rounded-3xl shadow-sm border border-slate-200 relative",
                        deviceView === "desktop" ? "p-8" : "p-5",
                      )}
                    >
                      <button
                        onClick={() => setShowCheckout(false)}
                        className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-salina-dark flex items-center gap-1 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
                      >
                        <ChevronLeft className="w-4 h-4" /> Zurück
                      </button>

                      <h2 className="text-2xl font-bold text-salina-dark mb-6">
                        Kasse
                      </h2>

                      <div className="bg-slate-50 rounded-2xl p-4 md:p-6 space-y-4 border border-slate-100">
                        {cartItems.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="font-bold text-slate-700 flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-salina-orange shadow-sm shrink-0"></div>
                              {item.name}
                            </span>
                            <span className="font-bold text-salina-dark bg-white px-2 py-1 rounded-lg shadow-sm border border-slate-100 whitespace-nowrap">
                              {item.price.toFixed(2)} €
                            </span>
                          </div>
                        ))}

                        <div
                          className={cn(
                            "flex justify-between items-center font-black border-t border-slate-200 pt-5 mt-5",
                            deviceView === "desktop" ? "text-xl" : "text-lg",
                          )}
                        >
                          <span className="text-slate-800 uppercase tracking-wider text-xs md:text-sm">
                            Gesamtsumme
                          </span>
                          <span
                            className={cn(
                              "text-salina-orange whitespace-nowrap",
                              deviceView === "desktop"
                                ? "text-3xl"
                                : "text-2xl",
                            )}
                          >
                            {cartItems
                              .reduce((s, i) => s + i.price, 0)
                              .toFixed(2)}{" "}
                            €
                          </span>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "flex gap-3 pt-2",
                          deviceView === "desktop" ? "flex-row" : "flex-col",
                        )}
                      >
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Empfehlungscode"
                          className="flex-1 px-5 py-4 rounded-2xl border-2 border-slate-100 text-sm font-bold text-slate-700 focus:border-salina-orange focus:ring-4 focus:ring-salina-orange/10 outline-none transition-all bg-slate-50 focus:bg-white shadow-sm"
                        />
                        <button
                          onClick={() => alert("Code angewendet!")}
                          className="px-8 py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-salina-dark rounded-2xl text-sm font-bold transition-all shadow-sm"
                        >
                          Einlösen
                        </button>
                      </div>

                      <label className="flex items-start gap-4 cursor-pointer mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 group">
                        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="w-5 h-5 rounded-[0.4rem] border-2 border-slate-300 text-salina-orange focus:ring-salina-orange focus:ring-offset-0 transition-colors cursor-pointer"
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                          Ja, ich möchte Neuigkeiten erhalten. Mit der
                          Bestellung akzeptiere ich die{" "}
                          <span className="underline font-bold text-slate-700">
                            AGB
                          </span>{" "}
                          und die{" "}
                          <span className="underline font-bold text-slate-700">
                            Datenschutzerklärung
                          </span>
                          .
                        </span>
                      </label>

                      <div className="space-y-4 pt-4">
                        <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Zahlungsmethode
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="py-4 px-2 bg-slate-800 hover:bg-black text-white rounded-2xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md">
                            💳 Karte
                          </button>
                          <button className="py-4 px-2 bg-slate-800 hover:bg-black text-white rounded-2xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md">
                            📱 Apple Pay
                          </button>

                          <div
                            className="col-span-2 relative group cursor-help"
                            onMouseEnter={() => setHoverInsight(TOOLTIPS.sepa)}
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <div className="absolute -left-2 -top-2 w-6 h-6 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-salina-orange z-30 animate-pulse">
                              <Info className="w-3.5 h-3.5" />
                            </div>
                            <button className="w-full py-5 px-4 bg-white border-2 border-slate-200 hover:border-salina-orange hover:bg-orange-50 rounded-2xl text-sm font-bold text-slate-700 transition-all shadow-sm">
                              🏦 SEPA-Lastschrift
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <span
                            className="text-xs font-bold text-slate-400 flex items-center gap-1.5 cursor-help hover:text-salina-orange transition-colors bg-slate-50 px-3 py-2 rounded-xl border border-slate-100"
                            onMouseEnter={() =>
                              setHoverInsight(TOOLTIPS.dunning)
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <ShieldAlert className="w-3.5 h-3.5" /> Gesichert
                            durch Stripe
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          alert(
                            "✅ Kostenpflichtig bestellt! Simulation abgeschlossen.",
                          );
                          setCartItems([]);
                          setShowCheckout(false);
                          setActiveTab("all");
                        }}
                        className="w-full py-5 mt-6 rounded-2xl font-bold text-white bg-linear-to-r from-salina-orange to-salina-pink shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg flex items-center justify-center gap-2"
                      >
                        Kostenpflichtig bestellen{" "}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* === ПРАВА ЧАСТИНА: БІЗНЕС АНАЛІТИКА === */}
        <div className="xl:col-span-5 flex flex-col gap-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoverInsight ? hoverInsight.title : currentInsight.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-lg p-8 md:p-10 rounded-4xl border border-slate-100 shadow-[0_20px_50px_rgba(51,65,85,0.05)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-salina-orange to-salina-pink"></div>
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
                <span>{hoverInsight ? "Hover Insight" : "Geschäftslogik"}</span>
              </div>
              <h3 className="text-3xl font-bold text-salina-dark mb-4 leading-tight">
                {hoverInsight ? hoverInsight.title : currentInsight.title}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {hoverInsight ? hoverInsight.text : currentInsight.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
