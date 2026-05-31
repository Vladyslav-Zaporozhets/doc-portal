"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Wallet,
  Settings,
  ShieldAlert,
  Info,
  LogOut,
  Monitor,
  Smartphone,
  MapPin,
  Clock,
  Users2,
  Tag,
  Download,
  RefreshCw,
  XCircle,
  AlertTriangle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ТИПИ ТА ДАНІ ---

type Tab = "bookings" | "wallet" | "profile" | "rewards" | "waitlist" | "b2b";
type BookingStatus = "confirmed" | "pending" | "cancelled";
type SubscriptionStatus =
  | "active"
  | "paused"
  | "pending_cancellation"
  | "unpaid";
type SubscriptionTier = "individual" | "family" | "premium";

interface Subscription {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  nextBilling: string;
  amount: string;
  cardLast4: string;
}

interface ServicePackage {
  total: number;
  used: number;
  validUntil: string;
}
type TimeFilter = "upcoming" | "past";

interface Booking {
  id: string;
  date: string;
  time: string;
  location: string;
  service: string;
  amount: string;
  status: BookingStatus;
  guests: string;
  canModify: boolean; // чи можна змінювати (понад 24 год)
}

const INSIGHTS = {
  bookings: {
    title: "Self-Service Buchungsverwaltung",
    text: "Hier sehen Kunden ihre anstehenden und vergangenen Termine. Mit der Amelia-Integration können sie Termine mit einem Klick stornieren oder umbuchen (gemäß Ihren Fristen). Das reduziert die Anrufe an der Rezeption um bis zu 40%.",
  },
  wallet: {
    title: "Digitales Guthaben & Pakete",
    text: "Das Wallet-System. Kunden können 5er- oder 10er-Karten kaufen. Das sichert Ihnen sofortigen Cashflow im Voraus (Upfront Revenue). Das System zieht bei jeder Buchung automatisch eine Einheit ab – kein Stempeln von Papierkarten mehr.",
  },
  profile: {
    title: "DSGVO & Marketing-Einwilligung",
    text: "Das Profil dient als zentrales Hub für Kundendaten. Hier können Kunden ihre Familie (Kinder) verwalten und DSGVO-konform dem E-Mail-Marketing (Newsletter) zustimmen, was Ihnen eine legale Re-Marketing-Basis verschafft.",
  },
  rewards: {
    title: "Empfehlungen & Gutscheine",
    text: "Das Empfehlungsprogramm generiert neue Leads ohne Werbekosten. Kunden werben Freunde und erhalten Store Credit. Digitale Gutscheine binden Kunden langfristig und steigern den Umsatz.",
  },
  waitlist: {
    title: "Warteliste & automatische Nachrücker",
    text: "Wenn ein Kunde absagt, informiert das System automatisch alle Wartenden per E-Mail oder WhatsApp. Der erste, der klickt, bekommt den Platz – ohne manuelles Eingreifen der Rezeption.",
  },
  b2b: {
    title: "B2B-Marktplatz für Franchisepartner",
    text: "Ein geschlossener Beschaffungs-Hub für Franchisenehmer. Sichert einheitliche Qualitätsstandards im gesamten Netzwerk und generiert zusätzliche Einnahmen durch Großhandelsmargen.",
  },
};

const getMondayOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? 6 : day - 1;
  result.setDate(result.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("bookings");
  const [deviceView, setDeviceView] = useState<"mobile" | "desktop">("mobile");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("upcoming");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [refundMethod, setRefundMethod] = useState<"card" | "credit">("card");
  const INITIAL_WAITLIST = [
    {
      id: "wl1",
      date: "28.06.2026",
      time: "10:00",
      location: "Salzraum Forchheim",
      service: "Salzraum Familien-Session",
      channel: "WhatsApp",
    },
  ];
  const [waitlistItems, setWaitlistItems] = useState(INITIAL_WAITLIST);
  // Стани для профілю
  const [profileName, setProfileName] = useState("Julia");
  const [profileSurname, setProfileSurname] = useState("Doe");
  const [profilePhone, setProfilePhone] = useState("+49 176 1234567");
  const [profileEmail, setProfileEmail] = useState("julia.doe@email.de");
  const [profileAllergies, setProfileAllergies] = useState(
    "Heuschnupfen, Gräser",
  );
  const [profileChannel, setProfileChannel] = useState<
    "email" | "sms" | "whatsapp"
  >("whatsapp");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Стани для B2B
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showSepaModal, setShowSepaModal] = useState(false);
  const [sepaIban, setSepaIban] = useState("");
  const [sepaActive, setSepaActive] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(
    null,
  );
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [hoverInsight, setHoverInsight] = useState<{
    title: string;
    text: string;
  } | null>(null);
  const DEMO_SUBSCRIPTION: Subscription = {
    tier: "family",
    status: "active",
    nextBilling: "01.07.2026",
    amount: "49,00 €",
    cardLast4: "4242",
  };

  const DEMO_PACKAGE: ServicePackage = {
    total: 10,
    used: 3,
    validUntil: "31.12.2026",
  };

  const [subscription, setSubscription] =
    useState<Subscription>(DEMO_SUBSCRIPTION);
  const [servicePackage, setServicePackage] =
    useState<ServicePackage>(DEMO_PACKAGE);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showChangeTierModal, setShowChangeTierModal] = useState(false);
  const [showCancelSubModal, setShowCancelSubModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(
    subscription.tier,
  );
  const [bookForOtherWallet, setBookForOtherWallet] = useState(false);
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [miniCalendarDate, setMiniCalendarDate] = useState<Date>(
    getMondayOfWeek(new Date()),
  );
  const [activeMiniDay, setActiveMiniDay] = useState<number>(
    (new Date().getDay() + 6) % 7,
  );
  const [otherNameWallet, setOtherNameWallet] = useState("");
  const [otherEmailWallet, setOtherEmailWallet] = useState("");
  const DEMO_BOOKINGS: Booking[] = [
    {
      id: "#2458",
      date: "22.06.2026",
      time: "12:00 - 12:45",
      location: "La Salina München",
      service: "Salzraum Familien-Session",
      amount: "42,50 €",
      status: "confirmed",
      guests: "1 Erw., 2 Kinder, 1 Baby",
      canModify: true,
    },
    {
      id: "#2401",
      date: "15.05.2026",
      time: "10:00 - 10:45",
      location: "La Salina Forchheim",
      service: "Kreativraum",
      amount: "0,00 €",
      status: "confirmed",
      guests: "1 Erw., 1 Kind",
      canModify: false, // минув дедлайн
    },
    {
      id: "#2390",
      date: "01.02.2026",
      time: "14:00 - 14:45",
      location: "La Salina München",
      service: "Salzraum Kindergeburtstag",
      amount: "120,00 €",
      status: "cancelled",
      guests: "5 Kinder, 2 Erw.",
      canModify: false,
    },
  ];

  const filteredBookings = DEMO_BOOKINGS.filter((b) => {
    const bookingDate = new Date(b.date.split(".").reverse().join("-"));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (timeFilter === "upcoming")
      return bookingDate >= today && b.status !== "cancelled";
    return bookingDate < today || b.status === "cancelled";
  });

  // Динамічний інсайт залежно від активної вкладки
  const currentInsight = INSIGHTS[activeTab];

  return (
    <div className="min-h-screen p-6 lg:px-12 lg:pt-4 lg:pb-12 animate-in fade-in duration-1000 flex flex-col">
      {/* Шапка сторінки */}
      <header className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-salina-dark mb-2 md:mt-1">
            Kundenkonto <span className="text-salina-orange">(Dashboard)</span>
          </h1>
          <p className="text-slate-500 max-w-xl text-lg">
            Simulation des persönlichen Kundenbereichs. Klicken Sie auf die
            Tabs, um die Geschäftslogik zu entdecken.
          </p>
        </div>
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

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-400 w-full mx-auto">
        {/* === ЛІВА ЧАСТИНА: СИМУЛЯЦІЯ КАБІНЕТУ === */}
        <div className="xl:col-span-7 flex flex-col gap-6 relative">
          <div className="bg-white rounded-4xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row h-full min-h-[600px]">
            {/* Бокове меню кабінету (Sidebar) */}
            <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-salina-orange/10 flex items-center justify-center text-salina-orange font-bold text-xl">
                  JD
                </div>
                <div>
                  <div className="font-bold text-salina-dark">Julia Doe</div>
                  <div className="text-xs text-slate-500">Premium Mitglied</div>
                </div>
              </div>

              <nav className="flex flex-col gap-2 flex-1">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium",
                    activeTab === "bookings"
                      ? "bg-white text-salina-orange shadow-sm border border-slate-100"
                      : "text-slate-500 hover:bg-slate-100 hover:text-salina-dark",
                  )}
                >
                  <CalendarCheck className="w-5 h-5" /> Meine Buchungen
                </button>

                <button
                  onClick={() => setActiveTab("wallet")}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium",
                    activeTab === "wallet"
                      ? "bg-white text-salina-orange shadow-sm border border-slate-100"
                      : "text-slate-500 hover:bg-slate-100 hover:text-salina-dark",
                  )}
                >
                  <Wallet className="w-5 h-5" /> Guthaben & Pakete
                </button>
                <button
                  onClick={() => setActiveTab("rewards")}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium",
                    activeTab === "rewards"
                      ? "bg-white text-salina-orange shadow-sm border border-slate-100"
                      : "text-slate-500 hover:bg-slate-100 hover:text-salina-dark",
                  )}
                >
                  <Tag className="w-5 h-5" /> Empfehlungen & Gutscheine
                </button>
                <button
                  onClick={() => setActiveTab("waitlist")}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium",
                    activeTab === "waitlist"
                      ? "bg-white text-salina-orange shadow-sm border border-slate-100"
                      : "text-slate-500 hover:bg-slate-100 hover:text-salina-dark",
                  )}
                >
                  <Clock className="w-5 h-5" /> Warteliste
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium",
                    activeTab === "profile"
                      ? "bg-white text-salina-orange shadow-sm border border-slate-100"
                      : "text-slate-500 hover:bg-slate-100 hover:text-salina-dark",
                  )}
                >
                  <Settings className="w-5 h-5" /> Profil & DSGVO
                </button>
              </nav>
              {deviceView === "desktop" && (
                <button
                  onClick={() => setActiveTab("b2b")}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium",
                    activeTab === "b2b"
                      ? "bg-white text-salina-orange shadow-sm border border-slate-100"
                      : "text-slate-500 hover:bg-slate-100 hover:text-salina-dark",
                  )}
                >
                  <Tag className="w-5 h-5" /> B2B Marktplatz
                </button>
              )}
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium text-slate-400 hover:bg-slate-100 hover:text-red-500 mt-auto">
                <LogOut className="w-5 h-5" /> Abmelden
              </button>
            </div>

            {/* Основний контент кабінету */}
            <div className="flex-1 p-8 bg-white relative overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* КОНТЕНТ: БРОНЮВАННЯ */}
                {activeTab === "bookings" && (
                  <motion.div
                    key="bookings"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-salina-dark">
                      Meine Buchungen
                    </h2>

                    {/* Таби фільтрації */}
                    <div className="flex bg-slate-100 rounded-full p-1 w-fit">
                      <button
                        onClick={() => setTimeFilter("upcoming")}
                        className={cn(
                          "px-5 py-2 rounded-full text-sm font-medium transition-all",
                          timeFilter === "upcoming"
                            ? "bg-white shadow text-salina-dark"
                            : "text-slate-500 hover:text-salina-dark",
                        )}
                      >
                        Bevorstehend
                      </button>
                      <button
                        onClick={() => setTimeFilter("past")}
                        className={cn(
                          "px-5 py-2 rounded-full text-sm font-medium transition-all",
                          timeFilter === "past"
                            ? "bg-white shadow text-salina-dark"
                            : "text-slate-500 hover:text-salina-dark",
                        )}
                      >
                        Vergangen
                      </button>
                    </div>

                    {/* Список бронювань */}
                    <div className="space-y-4">
                      {filteredBookings.length === 0 && (
                        <p className="text-slate-500 text-center py-6">
                          Keine Buchungen gefunden.
                        </p>
                      )}
                      {filteredBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-100"
                        >
                          {/* Основна інформація */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-salina-dark">
                              <CalendarDays className="w-4 h-4 text-salina-orange" />{" "}
                              {booking.date}
                              <Clock className="w-4 h-4 text-salina-orange ml-2" />{" "}
                              {booking.time}
                            </div>
                            <span
                              className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium",
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700",
                              )}
                            >
                              {booking.status === "confirmed"
                                ? "Bestätigt"
                                : "Storniert"}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span>{booking.location}</span>
                              <div
                                className="w-5 h-5 bg-white rounded-full shadow border border-slate-200 flex items-center justify-center cursor-help ml-1"
                                onMouseEnter={() =>
                                  setHoverInsight({
                                    title: "Multi-Location Dashboard",
                                    text: "Selbst wenn der Kunde in München und Forchheim bucht, sieht er alle Buchungen gesammelt. Keine Verwirrung, wohin er fahren muss.",
                                  })
                                }
                                onMouseLeave={() => setHoverInsight(null)}
                              >
                                <Info className="w-3 h-3 text-salina-orange" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users2 className="w-4 h-4 text-slate-400" />{" "}
                              {booking.guests}
                            </div>
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-slate-400" />{" "}
                              {booking.service}
                            </div>
                            <div className="flex items-center gap-2 font-medium text-salina-dark">
                              <DollarSign className="w-4 h-4 text-slate-400" />{" "}
                              {booking.amount}
                            </div>
                          </div>

                          {/* Кнопки дій */}
                          {booking.status === "confirmed" && (
                            <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-200">
                              {booking.canModify ? (
                                <>
                                  <button
                                    onClick={() => {
                                      setRescheduleBookingId(booking.id);
                                      setRescheduleDate("");
                                      setShowRescheduleModal(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                                  >
                                    <RefreshCw className="w-4 h-4" /> Umbuchen
                                  </button>
                                  <button
                                    onClick={() => {
                                      setCancelBookingId(booking.id);
                                      setShowCancelModal(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <XCircle className="w-4 h-4" /> Stornieren
                                  </button>
                                </>
                              ) : (
                                <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-xl">
                                  <AlertTriangle className="w-4 h-4" />{" "}
                                  Stornierungsfrist abgelaufen
                                </div>
                              )}

                              <div className="flex gap-2 ml-auto">
                                <button
                                  onClick={() =>
                                    alert("E-Ticket wird heruntergeladen...")
                                  }
                                  className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-500 hover:text-salina-dark hover:bg-white rounded-lg transition-colors"
                                  title="E-Ticket herunterladen"
                                >
                                  <Download className="w-4 h-4" /> Ticket
                                </button>
                                <button
                                  onClick={() =>
                                    alert("Rechnung wird heruntergeladen...")
                                  }
                                  className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-500 hover:text-salina-dark hover:bg-white rounded-lg transition-colors"
                                  title="Rechnung herunterladen"
                                >
                                  <Download className="w-4 h-4" /> Rechnung
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Модальне вікно скасування */}
                    <AnimatePresence>
                      {showCancelModal && (
                        <motion.div
                          key="cancel-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                          onClick={() => setShowCancelModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 200,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 max-w-sm w-full mx-auto relative"
                          >
                            <h4 className="text-xl font-bold text-salina-dark mb-4">
                              Buchung stornieren
                            </h4>
                            <p className="text-slate-500 mb-6 text-sm">
                              Möchten Sie den Betrag zurück auf Ihre Karte oder
                              als virtuelles Guthaben speichern?
                            </p>
                            <div className="space-y-3 mb-6">
                              <label
                                className={cn(
                                  "flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all",
                                  refundMethod === "card"
                                    ? "border-salina-orange bg-orange-50"
                                    : "border-slate-200 hover:border-salina-orange/30",
                                )}
                              >
                                <input
                                  type="radio"
                                  name="refund"
                                  value="card"
                                  checked={refundMethod === "card"}
                                  onChange={() => setRefundMethod("card")}
                                  className="w-4 h-4 text-salina-orange"
                                />
                                <div>
                                  <span className="text-sm font-medium text-slate-700">
                                    Auf Karte zurück
                                  </span>
                                  <p className="text-xs text-slate-500">
                                    Rückerstattung über Stripe
                                  </p>
                                </div>
                              </label>
                              <label
                                className={cn(
                                  "flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all",
                                  refundMethod === "credit"
                                    ? "border-salina-orange bg-orange-50"
                                    : "border-slate-200 hover:border-salina-orange/30",
                                )}
                              >
                                <input
                                  type="radio"
                                  name="refund"
                                  value="credit"
                                  checked={refundMethod === "credit"}
                                  onChange={() => setRefundMethod("credit")}
                                  className="w-4 h-4 text-salina-orange"
                                />
                                <div>
                                  <span className="text-sm font-medium text-slate-700">
                                    Guthaben speichern
                                  </span>
                                  <p className="text-xs text-slate-500">
                                    Geld bleibt im Kundenkonto
                                  </p>
                                </div>
                                <div
                                  className="w-5 h-5 bg-white rounded-full shadow border border-slate-200 flex items-center justify-center cursor-help ml-auto"
                                  onMouseEnter={() =>
                                    setHoverInsight({
                                      title: "Store Credit – Cashflow schützen",
                                      text: "Anstatt die Stripe-Gebühr bei Rückerstattung zu verlieren, bleibt das Geld im Unternehmen. Der Kunde kommt sicher wieder.",
                                    })
                                  }
                                  onMouseLeave={() => setHoverInsight(null)}
                                >
                                  <Info className="w-3 h-3 text-salina-orange" />
                                </div>
                              </label>
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  alert(
                                    "Buchung storniert. Betrag wird gemäß Auswahl erstattet.",
                                  );
                                  setShowCancelModal(false);
                                  setCancelBookingId(null);
                                }}
                                className="flex-1 py-3 bg-salina-orange text-white font-bold rounded-xl hover:bg-salina-orange/90 transition-colors"
                              >
                                Bestätigen
                              </button>
                              <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                              >
                                Abbrechen
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Модальне вікно перенесення */}
                    <AnimatePresence>
                      {showRescheduleModal && (
                        <motion.div
                          key="reschedule-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                          onClick={() => setShowRescheduleModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 200,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 max-w-sm w-full mx-auto relative"
                          >
                            <h4 className="text-xl font-bold text-salina-dark mb-4">
                              Buchung umbuchen
                            </h4>
                            <p className="text-slate-500 mb-4 text-sm">
                              Wählen Sie einen neuen Termin für Ihre Buchung.
                            </p>
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-slate-600 mb-2">
                                Neues Datum
                              </label>
                              <input
                                type="date"
                                value={rescheduleDate}
                                onChange={(e) =>
                                  setRescheduleDate(e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                min={new Date().toISOString().split("T")[0]}
                              />
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  if (rescheduleDate) {
                                    const formatted = new Date(
                                      rescheduleDate,
                                    ).toLocaleDateString("de-DE");
                                    alert(
                                      `✅ Buchung auf ${formatted} umgebucht.`,
                                    );
                                  } else {
                                    alert("Bitte wählen Sie ein Datum aus.");
                                  }
                                  setShowRescheduleModal(false);
                                  setRescheduleBookingId(null);
                                }}
                                className="flex-1 py-3 bg-salina-orange text-white font-bold rounded-xl hover:bg-salina-orange/90 transition-colors"
                              >
                                Bestätigen
                              </button>
                              <button
                                onClick={() => setShowRescheduleModal(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                              >
                                Abbrechen
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* КОНТЕНТ: ГАМАНЕЦЬ */}
                {activeTab === "wallet" && (
                  <motion.div
                    key="wallet"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <h2 className="text-2xl font-bold text-salina-dark">
                      Abonnements & Pakete
                    </h2>

                    {/* === БЛОК А: ПІДПИСКА SALINAPASS === */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-salina-dark">
                            Salinapass{" "}
                            {subscription.tier === "family"
                              ? "Family"
                              : subscription.tier === "premium"
                                ? "Premium"
                                : "Individual"}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={cn(
                                "w-2 h-2 rounded-full",
                                subscription.status === "active"
                                  ? "bg-green-500"
                                  : subscription.status === "unpaid"
                                    ? "bg-red-500"
                                    : "bg-yellow-500",
                              )}
                            ></span>
                            <span className="text-sm text-slate-500">
                              {subscription.status === "active"
                                ? "Aktiv"
                                : subscription.status === "unpaid"
                                  ? "Zahlung fehlgeschlagen"
                                  : subscription.status === "paused"
                                    ? "Pausiert"
                                    : "Kündigung geplant"}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">
                            Nächste Abbuchung
                          </p>
                          <p className="font-bold text-salina-dark">
                            {subscription.nextBilling}
                          </p>
                          <p className="text-lg font-bold text-salina-orange">
                            {subscription.amount}
                          </p>
                        </div>
                      </div>

                      {subscription.status === "unpaid" && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                          ⚠️ Zahlung nicht möglich. Ihre 100%-Rabatt wurde
                          pausiert. Bitte aktualisieren Sie Ihre Karte.
                          <div
                            className="inline-flex items-center gap-1 ml-2 cursor-help underline text-red-800"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "Dunning & Automator",
                                text: "Was passiert, wenn die Karte leer ist? Stripe sendet automatisch Mahnungen. Uncanny Automator entzieht dem Kunden sofort die VIP-Rolle – er kann nicht mehr gratis buchen, bis die Karte aktualisiert wurde.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3 h-3" /> Wie funktioniert das?
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setShowPauseModal(true)}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          ⏸{" "}
                          {subscription.status === "paused"
                            ? "Fortsetzen"
                            : "Pausieren"}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTier(subscription.tier);
                            setShowChangeTierModal(true);
                          }}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          ⬆️ Tarif ändern
                        </button>
                        <button
                          onClick={() =>
                            alert("Weiterleitung zum Stripe Customer Portal...")
                          }
                          className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors relative"
                        >
                          💳 Karte aktualisieren
                          <div
                            className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "PCI-DSS Sicherheit",
                                text: "Wir speichern keine Kreditkartendaten! Der Kunde wird zum sicheren Stripe Customer Portal weitergeleitet. Selbst bei einem Hack Ihrer Website gibt es nichts zu stehlen – 100% PCI-DSS-konform.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3 h-3 text-salina-orange" />
                          </div>
                        </button>
                        <button
                          onClick={() => setShowCancelSubModal(true)}
                          className="px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          ❌ Kündigen
                        </button>
                      </div>
                    </div>

                    {/* === БЛОК Б: 10er-KARTE === */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-salina-dark">
                            10er-Karte
                          </h3>
                          <p className="text-sm text-slate-500">
                            Gültig bis {servicePackage.validUntil}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Verbleibend</p>
                          <p className="text-2xl font-bold text-salina-dark">
                            {servicePackage.total - servicePackage.used}
                          </p>
                        </div>
                      </div>

                      {/* Прогрес-бар */}
                      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(servicePackage.used / servicePackage.total) * 100}%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-linear-to-r from-salina-orange to-salina-pink rounded-full"
                        />
                      </div>
                      <p className="text-xs text-slate-400 text-right">
                        {servicePackage.used} von {servicePackage.total} genutzt
                      </p>

                      <div className="flex flex-wrap gap-2 items-center">
                        <button
                          onClick={() => setShowMiniCalendar(true)}
                          disabled={servicePackage.used >= servicePackage.total}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                            servicePackage.used >= servicePackage.total
                              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                              : "bg-salina-orange text-white hover:bg-salina-orange/90",
                          )}
                        >
                          ⚡ Mit Paket buchen
                        </button>

                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={bookForOtherWallet}
                            onChange={(e) =>
                              setBookForOtherWallet(e.target.checked)
                            }
                            className="w-4 h-4 rounded border-slate-300 text-salina-orange focus:ring-salina-orange"
                          />
                          Für Oma / Nanny
                        </label>
                        <div
                          className="w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight({
                              title: "Szenario: Oma mit Enkel",
                              text: "Mama bucht, Oma begleitet. Das Ticket mit QR-Code wird direkt an Omas E-Mail gesendet, abgebucht wird von Mamas 10er-Karte. Kein Papier, keine Verwirrung an der Rezeption.",
                            })
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3 h-3 text-salina-orange" />
                        </div>
                      </div>

                      {bookForOtherWallet && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-3 pl-2 border-l-2 border-salina-orange/20"
                        >
                          <input
                            type="text"
                            value={otherNameWallet}
                            onChange={(e) => setOtherNameWallet(e.target.value)}
                            placeholder="Name der Begleitperson"
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                          />
                          <input
                            type="email"
                            value={otherEmailWallet}
                            onChange={(e) =>
                              setOtherEmailWallet(e.target.value)
                            }
                            placeholder="E-Mail der Begleitperson"
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                          />
                          {/* Міні-календар для бронювання з пакету */}
                          <AnimatePresence>
                            {showMiniCalendar && (
                              <motion.div
                                key="mini-calendar-modal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                                onClick={() => setShowMiniCalendar(false)}
                              >
                                <motion.div
                                  initial={{ scale: 0.9, y: 20 }}
                                  animate={{ scale: 1, y: 0 }}
                                  exit={{ scale: 0.9, y: 20 }}
                                  transition={{
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 200,
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 max-w-md w-full mx-auto relative max-h-[90%] overflow-y-auto"
                                >
                                  <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-xl font-bold text-salina-dark">
                                      Schnellbuchung mit Paket
                                    </h4>
                                    <button
                                      onClick={() => setShowMiniCalendar(false)}
                                      className="p-2 rounded-full hover:bg-slate-100"
                                    >
                                      <XCircle className="w-5 h-5 text-slate-400" />
                                    </button>
                                  </div>

                                  {/* Навігація по тижнях */}
                                  <div className="flex items-center justify-between mb-4">
                                    <button
                                      onClick={() => {
                                        const prev = new Date(miniCalendarDate);
                                        prev.setDate(prev.getDate() - 7);
                                        setMiniCalendarDate(prev);
                                      }}
                                      className="p-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full"
                                    >
                                      <ChevronLeft className="w-4 h-4 text-slate-600" />
                                    </button>
                                    <span className="font-bold text-salina-dark text-sm">
                                      {miniCalendarDate.toLocaleDateString(
                                        "de-DE",
                                        { month: "long", year: "numeric" },
                                      )}
                                    </span>
                                    <button
                                      onClick={() => {
                                        const next = new Date(miniCalendarDate);
                                        next.setDate(next.getDate() + 7);
                                        setMiniCalendarDate(next);
                                      }}
                                      className="p-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full"
                                    >
                                      <ChevronLeft className="w-4 h-4 rotate-180 text-slate-600" />
                                    </button>
                                  </div>

                                  {/* Сітка днів тижня */}
                                  <div className="grid grid-cols-7 gap-2 mb-4">
                                    {Array.from({ length: 7 }).map((_, i) => {
                                      const date = new Date(miniCalendarDate);
                                      date.setDate(date.getDate() + i);
                                      const isToday =
                                        date.toDateString() ===
                                        new Date().toDateString();
                                      const isSelected = activeMiniDay === i;
                                      const isPast =
                                        date <
                                        new Date(
                                          new Date().setHours(0, 0, 0, 0),
                                        );

                                      return (
                                        <button
                                          key={i}
                                          disabled={isPast}
                                          onClick={() => {
                                            if (!isPast) {
                                              setActiveMiniDay(i);
                                            }
                                          }}
                                          className={cn(
                                            "p-2 rounded-lg text-xs font-medium text-center transition-all border",
                                            isPast
                                              ? "bg-slate-50 text-slate-300 cursor-not-allowed"
                                              : "",
                                            !isPast && isSelected
                                              ? "bg-salina-orange text-white border-salina-orange shadow-md"
                                              : "",
                                            !isPast && !isSelected
                                              ? "bg-white border-slate-200 text-slate-700 hover:border-salina-orange/30"
                                              : "",
                                            isToday ? "border-blue-300" : "",
                                          )}
                                        >
                                          {date.toLocaleDateString("de-DE", {
                                            weekday: "short",
                                          })}
                                          <br />
                                          <span className="text-xs">
                                            {date.getDate()}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Слоти часу для вибраного дня */}
                                  <div className="space-y-2 mb-6">
                                    <p className="text-sm font-medium text-slate-500">
                                      Verfügbare Zeiten
                                    </p>
                                    {[
                                      "10:00",
                                      "11:00",
                                      "12:00",
                                      "13:00",
                                      "14:00",
                                      "15:00",
                                      "16:00",
                                    ].map((time) => {
                                      const selectedDate = new Date(
                                        miniCalendarDate,
                                      );
                                      selectedDate.setDate(
                                        selectedDate.getDate() + activeMiniDay,
                                      );
                                      const isPast = selectedDate < new Date();
                                      const isAvailable = !isPast;

                                      return (
                                        <div
                                          key={time}
                                          onClick={() => {
                                            if (isAvailable) {
                                              const formattedDate =
                                                selectedDate.toLocaleDateString(
                                                  "de-DE",
                                                );
                                              setServicePackage({
                                                ...servicePackage,
                                                used: servicePackage.used + 1,
                                              });
                                              alert(
                                                `✅ 1 Session von Ihrer 10er-Karte für ${formattedDate} um ${time} gebucht! (0 €)`,
                                              );
                                              setShowMiniCalendar(false);
                                            }
                                          }}
                                          className={cn(
                                            "p-3 rounded-lg text-sm font-medium flex items-center justify-between border transition-all",
                                            isAvailable
                                              ? "bg-green-50 border-green-200 text-green-800 cursor-pointer hover:shadow-md active:scale-95"
                                              : "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed",
                                          )}
                                        >
                                          <span>{time}</span>
                                          {isAvailable && (
                                            <span className="text-xs bg-white/80 rounded-full px-2 py-0.5 text-green-700 font-medium">
                                              Verfügbar
                                            </span>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}

                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        💡 Bei Stornierung (24h vorher) wird die Session
                        automatisch zurückerstattet.
                        <span
                          className="cursor-help underline"
                          onMouseEnter={() =>
                            setHoverInsight({
                              title: "Smart Refund",
                              text: "Kein Geld zurück – der Session-Credit bleibt im System. So vermeiden wir Stripe-Rückbuchungsgebühren und das Geld bleibt in Ihrem Unternehmen.",
                            })
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3 h-3 inline" />
                        </span>
                      </p>
                    </div>

                    {/* Модальне вікно: Призупинити підписку */}
                    <AnimatePresence>
                      {showPauseModal && (
                        <motion.div
                          key="pause-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                          onClick={() => setShowPauseModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 200,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 max-w-sm w-full"
                          >
                            <h4 className="text-xl font-bold text-salina-dark mb-4">
                              Abonnement pausieren
                            </h4>
                            <p className="text-slate-500 mb-6 text-sm">
                              Ihre Zahlungen werden ausgesetzt. Sie können das
                              Abo jederzeit fortsetzen.
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  setSubscription({
                                    ...subscription,
                                    status:
                                      subscription.status === "paused"
                                        ? "active"
                                        : "paused",
                                  });
                                  setShowPauseModal(false);
                                }}
                                className="flex-1 py-3 bg-salina-orange text-white font-bold rounded-xl hover:bg-salina-orange/90 transition-colors"
                              >
                                {subscription.status === "paused"
                                  ? "Fortsetzen"
                                  : "Pausieren"}
                              </button>
                              <button
                                onClick={() => setShowPauseModal(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                              >
                                Abbrechen
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Модальне вікно: Змінити тариф */}
                    <AnimatePresence>
                      {showChangeTierModal && (
                        <motion.div
                          key="tier-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                          onClick={() => setShowChangeTierModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 200,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 max-w-sm w-full"
                          >
                            <h4 className="text-xl font-bold text-salina-dark mb-4">
                              Tarif ändern
                            </h4>
                            <p className="text-slate-500 mb-4 text-sm">
                              Die Differenz wird automatisch berechnet
                              (Proration).
                            </p>
                            <div className="space-y-3 mb-6">
                              {(
                                [
                                  "individual",
                                  "family",
                                  "premium",
                                ] as SubscriptionTier[]
                              ).map((tier) => (
                                <label
                                  key={tier}
                                  className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all",
                                    selectedTier === tier
                                      ? "border-salina-orange bg-orange-50"
                                      : "border-slate-200 hover:border-salina-orange/30",
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="tier"
                                    value={tier}
                                    checked={selectedTier === tier}
                                    onChange={() => setSelectedTier(tier)}
                                    className="w-4 h-4 text-salina-orange"
                                  />
                                  <div>
                                    <span className="text-sm font-medium text-slate-700">
                                      {tier === "individual"
                                        ? "Individual (29 €)"
                                        : tier === "family"
                                          ? "Family (49 €)"
                                          : "Premium (79 €)"}
                                    </span>
                                    <p className="text-xs text-slate-500">
                                      {tier === "individual"
                                        ? "1 Kind"
                                        : tier === "family"
                                          ? "Bis zu 4 Kinder"
                                          : "Unbegrenzt + Events"}
                                    </p>
                                  </div>
                                </label>
                              ))}
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  setSubscription({
                                    ...subscription,
                                    tier: selectedTier,
                                  });
                                  setShowChangeTierModal(false);
                                  alert(
                                    "✅ Tarif geändert. Neue Rate ab nächster Abbuchung.",
                                  );
                                }}
                                className="flex-1 py-3 bg-salina-orange text-white font-bold rounded-xl hover:bg-salina-orange/90 transition-colors"
                              >
                                Bestätigen
                              </button>
                              <button
                                onClick={() => setShowChangeTierModal(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                              >
                                Abbrechen
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Модальне вікно: Скасувати підписку */}
                    <AnimatePresence>
                      {showCancelSubModal && (
                        <motion.div
                          key="cancel-sub-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                          onClick={() => setShowCancelSubModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 200,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 max-w-sm w-full"
                          >
                            <h4 className="text-xl font-bold text-salina-dark mb-4">
                              Abonnement kündigen
                            </h4>
                            <p className="text-slate-500 mb-6 text-sm">
                              Ihr Abo läuft bis zum Ende der aktuellen Periode
                              weiter und wird dann beendet. Keine weiteren
                              Kosten.
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  setSubscription({
                                    ...subscription,
                                    status: "pending_cancellation",
                                  });
                                  setShowCancelSubModal(false);
                                }}
                                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                              >
                                Kündigen
                              </button>
                              <button
                                onClick={() => setShowCancelSubModal(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                              >
                                Abbrechen
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* КОНТЕНТ: ПРОФІЛЬ */}
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <h2 className="text-2xl font-bold text-salina-dark">
                      Profil & DSGVO
                    </h2>

                    {/* БЛОК А: Персональні дані та Безпека */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                      <h3 className="text-lg font-bold text-salina-dark">
                        Persönliche Daten
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-2">
                            Vorname
                          </label>
                          <input
                            type="text"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-2">
                            Nachname
                          </label>
                          <input
                            type="text"
                            value={profileSurname}
                            onChange={(e) => setProfileSurname(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-2">
                            Telefon
                          </label>
                          <input
                            type="text"
                            value={profilePhone}
                            onChange={(e) => setProfilePhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-600 mb-2">
                            E-Mail
                          </label>
                          <input
                            type="email"
                            value={profileEmail}
                            onChange={(e) => setProfileEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                          Allergien / Gesundheitliche Hinweise
                        </label>
                        <textarea
                          value={profileAllergies}
                          onChange={(e) => setProfileAllergies(e.target.value)}
                          rows={2}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all resize-none"
                        />
                        <div
                          className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight({
                              title: "Echtzeit-Synchronisation",
                              text: "Aktualisierte Allergien erscheinen sofort auf dem Tablet Ihrer Rezeption. So wird verhindert, dass einem Kind ein ungeeigneter Snack angeboten wird – Ihr Schutz vor Unfällen.",
                            })
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3.5 h-3.5 text-salina-orange" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-3">
                          Bevorzugter Kanal für Erinnerungen
                        </label>
                        <div className="flex flex-wrap gap-4 relative">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="profileChannel"
                              value="email"
                              checked={profileChannel === "email"}
                              onChange={() => setProfileChannel("email")}
                              className="w-4 h-4 text-salina-orange"
                            />{" "}
                            <span className="text-sm text-slate-600">
                              E-Mail
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="profileChannel"
                              value="sms"
                              checked={profileChannel === "sms"}
                              onChange={() => setProfileChannel("sms")}
                              className="w-4 h-4 text-salina-orange"
                            />{" "}
                            <span className="text-sm text-slate-600">SMS</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="profileChannel"
                              value="whatsapp"
                              checked={profileChannel === "whatsapp"}
                              onChange={() => setProfileChannel("whatsapp")}
                              className="w-4 h-4 text-salina-orange"
                            />{" "}
                            <span className="text-sm text-slate-600">
                              WhatsApp
                            </span>
                          </label>
                          <div
                            className="w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "Zero No-Shows",
                                text: "WhatsApp-Erinnerungen haben eine Öffnungsrate von 98%. Kunden, die diesen Kanal wählen, verpassen ihren Termin fast nie.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3 h-3 text-salina-orange" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors relative"
                        >
                          🔑 Passwort ändern
                          <div
                            className="w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "Weniger Support-Anfragen",
                                text: "Ca. 30% der Anrufe an der Rezeption sind 'Passwort vergessen'. Diese einfache Self-Service-Funktion spart Ihrem Team wertvolle Zeit.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3 h-3 text-salina-orange" />
                          </div>
                        </button>
                        <button
                          onClick={() => alert("Einstellungen gespeichert!")}
                          className="px-6 py-2 bg-salina-orange text-white font-bold rounded-xl hover:bg-salina-orange/90 transition-colors"
                        >
                          Änderungen speichern
                        </button>
                      </div>
                    </div>

                    {/* БЛОК Б: Приватність (DSGVO) */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6">
                      <h3 className="text-lg font-bold text-salina-dark">
                        Privatsphäre & DSGVO
                      </h3>
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          onClick={() =>
                            alert(
                              "Sie wurden von allen Marketing-Listen abgemeldet. Ticket-E-Mails bleiben aktiv.",
                            )
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors relative"
                        >
                          🔕 Vom Newsletter abmelden
                          <div
                            className="w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help ml-2"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "Getrennte Kanäle",
                                text: "Trotz Abmeldung erhält der Kunde weiterhin seine Buchungstickets und Rechnungen. Marketing- und System-E-Mails sind streng getrennt.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3 h-3 text-salina-orange" />
                          </div>
                        </button>

                        <button
                          onClick={() =>
                            alert(
                              "Datenexport (JSON) an Ihre E-Mail gesendet! (DSGVO Art. 15)",
                            )
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors relative"
                        >
                          📥 Datenexport (Art. 15)
                          <div
                            className="w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help ml-2"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "Automatisierte Auskunft",
                                text: "Kein manuelles Suchen mehr. Das System stellt alle Buchungen, Rechnungen und Profildaten vollautomatisch als JSON-Archiv zusammen.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3 h-3 text-salina-orange" />
                          </div>
                        </button>

                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          🗑 Account löschen
                        </button>
                      </div>
                    </div>

                    {/* Модальне вікно: Зміна пароля */}
                    <AnimatePresence>
                      {showPasswordModal && (
                        <motion.div
                          key="pwd-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                          onClick={() => setShowPasswordModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 200,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 max-w-sm w-full"
                          >
                            <h4 className="text-xl font-bold text-salina-dark mb-4">
                              Passwort ändern
                            </h4>
                            <p className="text-slate-500 mb-6 text-sm">
                              Wir senden Ihnen einen Link an {profileEmail}, mit
                              dem Sie sicher ein neues Passwort setzen können.
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  alert("Link zum Zurücksetzen gesendet!");
                                  setShowPasswordModal(false);
                                }}
                                className="flex-1 py-3 bg-salina-orange text-white font-bold rounded-xl hover:bg-salina-orange/90 transition-colors"
                              >
                                Senden
                              </button>
                              <button
                                onClick={() => setShowPasswordModal(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                              >
                                Abbrechen
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Модальне вікно: Видалення акаунта */}
                    <AnimatePresence>
                      {showDeleteModal && (
                        <motion.div
                          key="del-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                          onClick={() => setShowDeleteModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 200,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 max-w-sm w-full"
                          >
                            <h4 className="text-xl font-bold text-salina-dark mb-4">
                              Account wirklich löschen?
                            </h4>
                            <p className="text-slate-500 mb-2 text-sm">
                              Ihr Profil wird vollständig anonymisiert und kann
                              nicht wiederhergestellt werden.
                            </p>
                            <p className="text-xs text-slate-400 mb-6">
                              Fiskalische Belege bleiben gesetzeskonform
                              (GoBD/KassenSichV) gespeichert.
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  alert("Account anonymisiert.");
                                  setShowDeleteModal(false);
                                }}
                                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                              >
                                Unwiderruflich löschen
                              </button>
                              <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                              >
                                Abbrechen
                              </button>
                            </div>
                            <div
                              className="flex items-center gap-1 mt-4 text-xs text-salina-orange cursor-help"
                              onMouseEnter={() =>
                                setHoverInsight({
                                  title: "Rechtssicherheit",
                                  text: "Profil und Kontaktdaten werden gelöscht. Rechnungen und TSE-Belege bleiben zur Erfüllung gesetzlicher Aufbewahrungspflichten erhalten.",
                                })
                              }
                              onMouseLeave={() => setHoverInsight(null)}
                            >
                              <Info className="w-3 h-3" /> Was passiert mit
                              meinen Daten?
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {activeTab === "rewards" && (
                  <motion.div
                    key="rewards"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <h2 className="text-2xl font-bold text-salina-dark">
                      Empfehlungen & Gutscheine
                    </h2>

                    {/* БЛОК А: Реферальна програма */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-salina-dark">
                            Freunde werben
                          </h3>
                          <p className="text-sm text-slate-500">
                            Ihr persönlicher Code
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Ihr Guthaben</p>
                          <p className="text-2xl font-bold text-salina-orange">
                            25,00 €
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 relative">
                        <span className="text-lg font-bold tracking-widest text-salina-dark">
                          MARIA-2026
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("MARIA-2026");
                            alert("Code kopiert!");
                          }}
                          className="ml-auto flex items-center gap-1 px-3 py-1.5 bg-salina-orange/10 text-salina-orange rounded-lg text-sm font-medium hover:bg-salina-orange/20 transition-colors"
                        >
                          <Download className="w-4 h-4" /> Kopieren
                        </button>
                        <div
                          className="absolute -right-2 -top-2 w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight({
                              title: "Cookie-less Tracking (DSGVO-sicher)",
                              text: "Warum ein Code statt eines Links? Klassische Affiliate-Links werden von AdBlockern und DSGVO-Browsereinstellungen oft blockiert. Unser Code funktioniert ohne Cookies – 100% zuverlässig und legal.",
                            })
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3 h-3 text-salina-orange" />
                        </div>
                      </div>

                      <p className="text-sm text-slate-600">
                        🎁 Ihr Freund erhält 15% Rabatt auf den ersten Besuch.
                        Sie bekommen 10 € Guthaben nach seinem Besuch.
                      </p>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-600">
                          📊 Status Ihrer Einladungen:
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span>Hanna M.</span>
                          <span className="text-green-600 font-medium">
                            ✅ Abgeschlossen (+10 €)
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm relative">
                          <span>Max T.</span>
                          <span className="text-amber-600 font-medium">
                            ⏳ Erwartet Besuch
                          </span>
                          <div
                            className="w-4 h-4 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help ml-2"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "Schutz vor Betrug",
                                text: "Der Bonus wird erst gutgeschrieben, wenn der geworbene Freund tatsächlich bezahlt und die Location besucht hat. So schützen wir Sie vor Fake-Anmeldungen.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-2.5 h-2.5 text-salina-orange" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* БЛОК Б: Подарункові сертифікати */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                      <h3 className="text-lg font-bold text-salina-dark">
                        Ihr Guthaben aus Geschenken
                      </h3>
                      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4">
                        <div>
                          <p className="text-sm text-slate-500">Aktiver Code</p>
                          <p className="font-mono font-bold text-salina-dark">
                            X9K2-M4B1
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Restguthaben</p>
                          <p className="text-xl font-bold text-salina-orange">
                            60,00 €
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        ⏳ Gültig bis 31.12.2029
                        <span
                          className="cursor-help underline text-salina-orange"
                          onMouseEnter={() =>
                            setHoverInsight({
                              title: "Automatische Gültigkeit",
                              text: "Nach deutschem Recht sind Gutscheine 3 Jahre ab Kaufdatum gültig. Unser System setzt dieses Datum automatisch – kein manuelles Rechnen mehr.",
                            })
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3 h-3 inline" />
                        </span>
                      </p>
                      <button
                        onClick={() => alert("Weiterleitung zum Shop...")}
                        className="flex items-center gap-2 px-4 py-2 bg-salina-orange text-white rounded-xl text-sm font-medium hover:bg-salina-orange/90 transition-colors"
                      >
                        🎁 Geschenkgutschein kaufen
                      </button>
                      <div className="relative text-sm text-slate-600 bg-white rounded-xl p-3 border border-slate-100">
                        💡 Sie haben noch 60 € offen. Bei Ihrem nächsten Besuch
                        können Sie diesen Betrag einlösen.
                        <div
                          className="absolute -right-2 -top-2 w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight({
                              title: "Zusatzverkäufe durch Restguthaben",
                              text: "Kunden mit Restguthaben kommen fast immer wieder – und geben meist mehr aus, um den Betrag nicht verfallen zu lassen. Durchschnittlich 20–30 € zusätzlich pro Besuch.",
                            })
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3 h-3 text-salina-orange" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {activeTab === "waitlist" && (
                  <motion.div
                    key="waitlist"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-salina-dark">
                      Warteliste
                    </h2>
                    {waitlistItems.length === 0 && (
                      <p className="text-slate-500 text-center py-6">
                        Keine aktiven Wartelisten.
                      </p>
                    )}
                    <AnimatePresence>
                      {waitlistItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4 relative"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-salina-dark">
                              <CalendarDays className="w-4 h-4 text-salina-orange" />{" "}
                              {item.date}
                              <Clock className="w-4 h-4 text-salina-orange ml-2" />{" "}
                              {item.time}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-400" />{" "}
                              {item.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-slate-400" />{" "}
                              {item.service}
                            </div>
                            <div className="flex items-center gap-2">
                              🔔 Benachrichtigung via {item.channel}
                            </div>
                          </div>
                          <p className="text-sm text-slate-500">
                            💡 Sobald jemand absagt, erhalten Sie sofort eine
                            Nachricht. Wer zuerst klickt, bekommt den Platz.
                          </p>
                          <button
                            onClick={() =>
                              setWaitlistItems(
                                waitlistItems.filter((w) => w.id !== item.id),
                              )
                            }
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="w-4 h-4" /> Verlassen
                          </button>
                          {/* Підказка для Корнелії */}
                          <div
                            className="absolute -right-2 top-2 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "Automatische Nachrücker",
                                text: "Die Warteliste füllt Ausfälle automatisch auf. Ihr Admin muss niemanden anrufen – das System verschickt sofort Nachrichten an alle Wartenden.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3.5 h-3.5 text-salina-orange" />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
                {activeTab === "b2b" && deviceView === "desktop" && (
                  <motion.div
                    key="b2b"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <h2 className="text-2xl font-bold text-salina-dark">
                      B2B Marktplatz
                    </h2>

                    {/* БЛОК А: Корпоративний каталог */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                      <h3 className="text-lg font-bold text-salina-dark">
                        Beschaffungs-Hub
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {
                            id: "salz",
                            name: "Himalaya-Salz 25 kg",
                            basePrice: 49,
                            bulkPrice: 42,
                            unit: "Sack",
                          },
                          {
                            id: "socken",
                            name: "Stoppersocken 100er-Pack",
                            basePrice: 89,
                            bulkPrice: 75,
                            unit: "Pack",
                          },
                          {
                            id: "uniform",
                            name: "LaSalina Uniform (kurz)",
                            basePrice: 35,
                            bulkPrice: 29,
                            unit: "Stück",
                          },
                        ].map((item) => {
                          const qty = cart[item.id] || 0;
                          const price =
                            qty >= 10 ? item.bulkPrice : item.basePrice;
                          return (
                            <div
                              key={item.id}
                              className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between"
                            >
                              <div>
                                <h4 className="font-bold text-salina-dark">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-slate-500">
                                  Mindestbestellung: 5 {item.unit}(e)
                                </p>
                                <motion.p
                                  key={price}
                                  initial={{ scale: 1 }}
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 0.3 }}
                                  className={cn(
                                    "text-lg font-bold mt-2",
                                    qty >= 10
                                      ? "text-green-600"
                                      : "text-salina-dark",
                                  )}
                                >
                                  {price},00 €
                                </motion.p>
                                {qty >= 10 && (
                                  <p className="text-xs text-green-600">
                                    Großhandelspreis aktiv!
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                <button
                                  onClick={() =>
                                    setCart({
                                      ...cart,
                                      [item.id]: Math.max(0, qty - 1),
                                    })
                                  }
                                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                                >
                                  −
                                </button>
                                <span className="font-bold">{qty}</span>
                                <button
                                  onClick={() =>
                                    setCart({ ...cart, [item.id]: qty + 1 })
                                  }
                                  className="w-8 h-8 rounded-full bg-salina-orange/10 flex items-center justify-center text-salina-orange hover:bg-salina-orange/20"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* БЛОК Б: Фінанси та Документообіг */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                      <h3 className="text-lg font-bold text-salina-dark">
                        Finanzen & Dokumente
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowSepaModal(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors relative"
                        >
                          🏦 SEPA-Lastschrift{" "}
                          {sepaActive ? "✅ aktiv" : "einrichten"}
                          <div
                            className="w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help ml-2"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "Automatischer Zahlungseinzug",
                                text: "Partner binden einmalig ihr Konto ein – bei jeder Bestellung zieht Stripe automatisch ein. Keine offenen Forderungen zwischen Zentrale und Franchisenehmer.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3 h-3 text-salina-orange" />
                          </div>
                        </button>
                        <button
                          onClick={() =>
                            alert("B2B-Rechnung (PDF/XML) heruntergeladen!")
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors relative"
                        >
                          📄 Bestellhistorie / Rechnung
                          <div
                            className="w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help ml-2"
                            onMouseEnter={() =>
                              setHoverInsight({
                                title: "Automatische DATEV-Exporte",
                                text: "Jede Bestellung erzeugt einen gesetzeskonformen B2B-Beleg (EN 16931) mit ausgewiesener USt. und allen beiderseitigen Firmendaten – fertig für den Steuerberater.",
                              })
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3 h-3 text-salina-orange" />
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Модальне вікно: SEPA einrichten */}
                    <AnimatePresence>
                      {showSepaModal && (
                        <motion.div
                          key="sepa-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                          onClick={() => setShowSepaModal(false)}
                        >
                          <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{
                              type: "spring",
                              damping: 20,
                              stiffness: 200,
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 max-w-sm w-full"
                          >
                            <h4 className="text-xl font-bold text-salina-dark mb-4">
                              SEPA-Lastschrift einrichten
                            </h4>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              IBAN
                            </label>
                            <input
                              type="text"
                              value={sepaIban}
                              onChange={(e) => setSepaIban(e.target.value)}
                              placeholder="DE89 3704 0044 0532 0130 00"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all mb-6"
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  if (sepaIban.trim()) {
                                    setSepaActive(true);
                                    setShowSepaModal(false);
                                    alert("SEPA-Mandat aktiviert!");
                                  }
                                }}
                                className="flex-1 py-3 bg-salina-orange text-white font-bold rounded-xl hover:bg-salina-orange/90 transition-colors"
                              >
                                Aktivieren
                              </button>
                              <button
                                onClick={() => setShowSepaModal(false)}
                                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                              >
                                Abbrechen
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Плаваючий віджет підтримки всередині кабінету */}
            <div className="absolute bottom-4 right-4 z-50 flex flex-col items-end gap-3">
              <AnimatePresence>
                {showChat && (
                  <motion.div
                    key="chat-window"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 200 }}
                    className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-72 sm:w-80 overflow-hidden"
                  >
                    {/* Шапка чату */}
                    <div className="bg-salina-orange/10 border-b border-slate-100 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-salina-orange flex items-center justify-center text-white font-bold text-sm">
                          🤖
                        </div>
                        <div>
                          <p className="font-bold text-salina-dark text-xs">
                            LaSalina Assist
                          </p>
                          <p className="text-[10px] text-green-600">Online</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowChat(false)}
                        className="p-1 rounded-full hover:bg-white/50 transition-colors"
                      >
                        <XCircle className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                    {/* Тіло чату */}
                    <div className="p-3 h-48 overflow-y-auto space-y-2 bg-slate-50 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-salina-orange flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          🤖
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-none px-3 py-2 shadow-sm border border-slate-100 max-w-[85%]">
                          <p className="text-xs text-slate-700">
                            Hallo! 👋 Wie kann ich helfen?
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Поле вводу */}
                    <div className="p-3 border-t border-slate-100 bg-white flex gap-2">
                      <input
                        type="text"
                        placeholder="Ihre Frage..."
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            alert(
                              "Danke für Ihre Frage! Unser Team meldet sich in Kürze.",
                            );
                          }
                        }}
                      />
                      <button className="p-2 bg-salina-orange text-white rounded-xl hover:bg-salina-orange/90 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    {/* WhatsApp */}
                    <div className="px-3 pb-3 bg-white">
                      <button
                        onClick={() =>
                          alert("WhatsApp Chat mit Manager wird geöffnet...")
                        }
                        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-green-50 border border-green-200 rounded-xl text-xs font-medium text-green-700 hover:bg-green-100 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        schreiben
                      </button>
                    </div>
                    {/* Підказка */}
                    <div
                      className="px-3 pb-3 bg-white flex items-center gap-1.5 text-[10px] text-salina-orange cursor-help"
                      onMouseEnter={() =>
                        setHoverInsight({
                          title: "Zero Hallucination & DSGVO",
                          text: "Der Bot antwortet nur auf Basis der LaSalina-Regeln. Keine erfundenen Antworten, DSGVO-konform.",
                        })
                      }
                      onMouseLeave={() => setHoverInsight(null)}
                    >
                      <Info className="w-3 h-3" /> Wie funktioniert der
                      KI-Assistent?
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Кнопка відкриття */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChat(!showChat)}
                className="w-12 h-12 rounded-full bg-salina-orange text-white shadow-lg flex items-center justify-center hover:bg-salina-orange/90 transition-colors relative"
              >
                {showChat ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  <MessageCircle className="w-5 h-5" />
                )}
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* === ПРАВА ЧАСТИНА: БІЗНЕС АНАЛІТИКА === */}
        <div className="xl:col-span-5 flex flex-col gap-6">
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 font-medium text-sm mb-6">
                <ShieldAlert className="w-4 h-4" />
                <span>{hoverInsight ? "Hover Insight" : "Geschäftslogik"}</span>
              </div>
              <h3 className="text-3xl font-bold text-salina-dark mb-4 leading-tight">
                {hoverInsight ? hoverInsight.title : currentInsight.title}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {hoverInsight ? hoverInsight.text : currentInsight.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
