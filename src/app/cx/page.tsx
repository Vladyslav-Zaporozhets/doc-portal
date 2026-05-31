"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Info,
  ArrowRight,
  ShieldAlert,
  Monitor,
  Smartphone,
  Sparkles,
  Map,
  CalendarDays,
  ChevronLeft,
  ChevronDown,
  Mail,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ТИПИ ТА ДАНІ ---

type Step =
  | "landing"
  | "booking"
  | "family"
  | "calendar"
  | "checkout"
  | "confirmation";
type DeviceView = "mobile" | "desktop";

const LOCATIONS = [
  { id: "forchheim", name: "Forchheim", price: "12,50", bg: "bg-slate-100" },
  { id: "munich", name: "München (Neu)", price: "15,00", bg: "bg-orange-50" },
];

const ROOMS = [
  {
    id: "salt",
    name: "Salzzimmer",
    desc: "Spielen im Himalaya-Salz",
    locations: ["forchheim", "munich"],
  },
  {
    id: "creative",
    name: "Kreativraum",
    desc: "Spielen & Lernen",
    locations: ["forchheim", "munich"],
  },
  {
    id: "event",
    name: "Eventraum",
    desc: "Geburtstage & Feiern",
    locations: ["munich"],
  },
];

const INSIGHTS = {
  landing: {
    title: "Phase 0: Die Landingpage",
    text: "Hier sind wir noch nicht im Buchungsprozess. Die Standortwahl ändert die gesamte Website (Texte, Fotos, SEO). Wir leiten den Kunden physisch auf /forchheim oder /munich weiter, ohne nervige Cookie-Banner für die Standortwahl zu benötigen.",
  },
  bookingStart: {
    title: "Phase 1: Das Booking-Widget",
    text: "Sobald der Kunde auf 'Buchen' klickt, öffnet sich das Widget. Hier ist die Preislogik auf das Kind zentriert (Basispreis pro Kind). Die Standortwahl bleibt erhalten, falls der Kunde sich umentscheidet.",
  },
  family: {
    title: "Phase 2: Familienauswahl (Mobil)",
    text: "Auf dem Smartphone vermeiden wir einen Warenkorb. Stattdessen erscheinen große, fingerfreundliche Zähler für Erwachsene, Kinder und Babys. Das beschleunigt den mobilen Checkout drastisch.",
  },
  calendar: {
    title: "Phase 3: Live-Kalender",
    text: "Der Kalender zeigt die Auslastung in Echtzeit an. Farben signalisieren Verfügbarkeit. Ein Klick auf einen belegten Slot öffnet die Warteliste.",
  },
  checkoutDetails: {
    title: "Phase 4: Checkout",
    text: "Phase 4 umfasst den barrierefreien Checkout und die vollständige Post-Booking Automatisierung. Nach dem Klick auf 'Kostenpflichtig buchen' verarbeitet das System die Zahlung, erstellt vollautomatisch einen KassenSichV-konformen TSE-Beleg über ready2order und generiert ein digitales E-Ticket.",
  },
  checkoutPayment: {
    title: "Phase 5: Zahlung & Bestätigung",
    text: "Live-Preisberechnung mit allen Familienrabatten. Nach Wahl der Zahlungsmethode wird die Buchung sofort bestätigt – sicher und DSGVO-konform.",
  },
  confirmation: {
    title: "Phase 5: Buchungsbestätigung",
    text: "Buchung erfolgreich! E-Ticket, QR-Code, rechtssichere Hinweise und eine automatisierte Omnichannel-Kommunikation bilden den krönenden Abschluss der Customer Journey.",
  },
};

const TOOLTIPS = {
  location: {
    title: "Geo-Routing & Cookie-less",
    text: "Die Standortwahl ändert die URL physisch (/forchheim -> /munich). Perfekt für Local SEO.",
  },
  widget: {
    title: "All-in-One Booking Widget",
    text: "Auf dem Desktop bündeln wir Raum und Familie im Hero-Bereich (Booking.com Style). Das spart Klicks und führt schneller zum Kalender.",
  },
  family: {
    title: "Aufsichtspflicht & Validierung",
    text: "Hier wird die Familiengröße abgefragt. '0 Erwachsene' wird vom System sofort blockiert.",
  },
  price: {
    title: "Basispreis pro Kind",
    text: "Der Preisanker liegt auf dem Kind. Wir verzichten auf einen komplexen Warenkorb am Start.",
  },
  adultMin: {
    title: "Aufsichtspflicht & min=1",
    text: "Warum kann man nicht 0 Erwachsene wählen? Das System bildet die Aufsichtspflicht ab. Selbst wenn ein Hacker den Client umgeht, blockt der Server-Filter (amelia_before_booking_added_filter) die Transaktion zuverlässig.",
  },
  capacityCheck: {
    title: "Capacity Override im Hintergrund",
    text: "Warum fragen wir die Familie VOR dem Kalender? Jetzt prüft das System nicht nur die Salzkapazität, sondern auch Plätze in Ihrer Eltern-Lounge. Wir verkaufen nie einen Kinderplatz, wenn die Mutter keinen Sitzplatz hat.",
  },
  trafficLight: {
    title: "Auslastungsampel & FOMO",
    text: "Gelbe Slots erzeugen ein Gefühl der Dringlichkeit (FOMO). Kunden buchen schneller, um den letzten Platz zu sichern.",
  },
  waitingList: {
    title: "Warteliste & WhatsApp",
    text: "Bei einem vollen Slot kann der Kunde sich auf die Warteliste setzen. Sagt jemand ab, versendet Amelia automatisch WhatsApp-Nachrichten an alle Wartenden – ohne manuellen Aufwand.",
  },
  bufferTime: {
    title: "Pufferzeiten",
    text: "Zwischen den Sessions liegen 15 Minuten für Belüftung und Desinfektion. Das System blockt diese Zeiten automatisch.",
  },
  financialSecurity: {
    title: "Finanzielle Sicherheit",
    text: "Warum blockieren wir volle Slots nicht einfach? Stornierungen sind unvermeidbar. Die Warteliste verwandelt dieses Risiko in einen Vorteil: Bei einer Absage füllt sich der freie Slot automatisch, ohne dass Ihr Admin eingreifen muss. So rettet das System Ihren Umsatz.",
  },
  whatsAppMarketing: {
    title: "Meta Cloud API Compliance",
    text: "Warum achten wir so streng auf den Nachrichtentyp? Laut Meta-Richtlinien gilt die Einladung, einen freigewordenen Slot zu buchen, als Marketing. Unser System kennzeichnet diese Nachrichten automatisch als 'Marketing Template'. Das schützt Ihre Firmennummer zu 100% vor Spam-Sperren.",
  },
  selfServiceExit: {
    title: "Self-Service: Warteliste verlassen",
    text: "Warum kann der Kunde selbst austreten? Das ist Respekt und Budgetschutz zugleich. Wenn jemand kein Interesse mehr hat, erhält er keine weiteren (kostenpflichtigen) WhatsApp-Nachrichten. Self-Service spart Ihnen bares Geld.",
  },
  guestCheckout: {
    title: "Guest-First Checkout",
    text: "Warum zwingen wir Kunden nicht zur Registrierung? Statistiken zeigen, dass eine Pflichtregistrierung bis zu 30–35% der Conversions tötet. Wir speichern den Kunden trotzdem sicher in der Amelia-Datenbank, aber ohne ihn mit Passwörtern zu belasten.",
  },
  dsgvoConsent: {
    title: "DSGVO Compliance",
    text: "Beachten Sie den Marketing-Checkbox. Sie ist standardmäßig NICHT vorausgewählt. Wenn der Kunde sie anklickt, startet ein Double-Opt-In-Mechanismus. Das schützt Sie zu 100% vor hohen DSGVO-Bußgeldern.",
  },
  allergyValidation: {
    title: "Backend-Validierung",
    text: "Wenn ein Hacker die Allergie-Felder im Browser umgeht, blockiert der Server die Transaktion trotzdem. So weiß Ihr Personal immer über besondere Bedürfnisse Bescheid.",
  },
  familyDiscount: {
    title: "Geschwisterrabatt & Babypreis",
    text: "Warum sieht der Kunde den detaillierten Rabatt erst jetzt? Der PHP-Filter amelia_modify_payment_amount berechnet ihn serverseitig: Babys werden kostenlos, Geschwister bekommen Rabatt. Ihr Personal muss nie wieder mit dem Taschenrechner arbeiten.",
  },
  ttlBump: {
    title: "TTL Bump & Session-Schutz",
    text: "Was passiert, wenn der Kunde FaceID scannt? Statt ihn durch Timeout zu verlieren, verlängert Redis das Slot-Lock auf 5 Minuten. Die Buchung wartet garantiert auf ihren Kunden.",
  },
  friendlyCaptcha: {
    title: "Friendly Captcha (DSGVO-konform)",
    text: "Warum keine Bilderrätsel? Herkömmliche Captchas nerven und senden IP-Daten in die USA. Wir nutzen Friendly Captcha – es prüft Nutzer mathematisch im Hintergrund, DSGVO-konform und unsichtbar.",
  },
  b2bInvoice: {
    title: "B2B Invoice Bypass",
    text: "Wie zahlen Kitas? Da Bildungseinrichtungen nicht mit Karte zahlen können, erkennt das System große Gruppen und blendet Stripe aus. Stattdessen wird eine professionelle Rechnung generiert.",
  },
  localPersistence: {
    title: "Local Storage Persistence",
    text: "Warum gehen Daten bei F5 nicht verloren? Das System speichert Eingaben ohne Cookies (Same-origin) im localStorage. Das rettet abgebrochene Buchungen und ist 100% DSGVO-konform.",
  },
  gracefulDegradation: {
    title: "Graceful Degradation",
    text: "Was passiert, wenn Stripe ausfällt? Statt die Seite zu blockieren, blendet das System Kreditkarten aus und bietet 'Später zahlen' oder 'Barzahlung vor Ort' an. So verlieren Sie keine Kunden bei technischen Störungen.",
  },
  communicationChannelInfo: {
    title: "Kommunikationskanal",
    text: "Warum lassen wir den Kunden wählen? SMS und WhatsApp erreichen den Gast zuverlässiger als E-Mail. Das senkt No-Shows und schützt Ihren Umsatz.",
  },
  zeroCheckoutMagic: {
    title: "Magie des Zero-Checkout",
    text: "Warum sind diese Buttons ganz oben? Wenn ein Stammkunde mit Salinapass oder 10er-Karte sich anmeldet, erkennt das System ihn und setzt den Gesamtpreis auf 0 €. Keine Zahlungsgateways – die Buchung wird sofort in einem Klick bestätigt!",
  },
  guestFirstCheckout: {
    title: "Guest-First Checkout",
    text: "Warum ist die Registrierung nur optional? Statistiken zeigen, dass eine Pflichtregistrierung bis zu 30–35% der Conversions tötet. Wir speichern den Kunden trotzdem sicher in der Amelia-Datenbank über E-Mail und Telefon – ohne ihn mit Passwörtern zu belasten. Kaufen so einfach wie bei Amazon!",
  },
  grandmaScenario: {
    title: "Szenario: Oma mit Enkel",
    text: "Ein sehr beliebtes Szenario! Wenn Mama den Ausflug bucht, aber Oma oder das Kindermädchen das Kind begleiten, kann sie hier deren Kontaktdaten eingeben. Das E-Ticket mit QR-Code geht direkt auf das Handy der Begleitperson – nichts muss weitergeschickt werden.",
  },

  whatsAppReminder: {
    title: "Digitaler Concierge",
    text: "Warum WhatsApp? Die Öffnungsrate von Messenger-Nachrichten liegt bei 98%. Eine automatische Erinnerung, die 24 Stunden vor dem Termin hier ankommt, senkt No-Shows drastisch und rettet Ihren Umsatz.",
  },
  discountAutomation: {
    title: "Automatisierung der Rabatte",
    text: "Achten Sie auf die Zahlen: Ein serverseitiges Skript hat soeben den Warenkorb dynamisch neu berechnet. Es macht Babys automatisch kostenlos und wendet den Geschwisterrabatt für das zweite Kind an. Ihr Personal muss diese Kombinationen nie wieder mit dem Taschenrechner ausrechnen!",
  },
  dsgvoOptIn: {
    title: "Juristische Festung",
    text: "Warum ist der Haken nicht vorausgewählt? Nach deutschem Recht ist das streng verboten. Wenn der Kunde ihn selbst anklickt, startet ein Double-Opt-In-Mechanismus. Das ist Ihr 100%iger Schutz vor hohen Bußgeldern und Abmahnungen.",
  },

  finalButtonMagic: {
    title: "Unsichtbare Fiskalisierung & Captcha",
    text: "Der Kunde klickt nur 'Bezahlen'. Aber in dieser Millisekunde passiert viel: 1) Anbindung an die Cloud-TSE ready2order, 2) ein legaler, kryptografisch signierter Beleg wird erstellt und versendet. Und: Haben Sie bemerkt, dass es keine nervigen Bilder-Rätsel gibt? Unser deutsches Friendly Captcha hat den Nutzer bereits unsichtbar im Hintergrund geprüft!",
  },
  legalLinks: {
    title: "Rechtssicherheit im Checkout",
    text: "Warum stehen hier so viele Links? In Deutschland ist ein Checkout ohne Impressum, AGB, Datenschutzerklärung und Widerrufsbelehrung illegal. Diese Links schützen Sie vor Abmahnungen.",
  },
  sepaInfo: {
    title: "SEPA-Lastschrift (Lokaler Markt)",
    text: "Warum ist SEPA so wichtig? Für Abonnements (wie den Salinapass) ist die SEPA-Lastschrift in Deutschland der Zahlungsfavorit. Ohne sie würden Sie bis zu 40% der wiederkehrenden Umsätze verlieren.",
  },
  wowEffect: {
    title: "Wow-Effekt & Geo-Erinnerung",
    text: "Das schafft ein unglaubliches Premium-Erlebnis. Wenn der Kunde das Ticket zu seinem Wallet hinzufügt, erscheint es automatisch auf seinem Sperrbildschirm, sobald er sich Ihrer Filiale nähert. Kein Suchen in E-Mails nötig.",
  },
  legalArmor: {
    title: "Ihre juristische Rüstung",
    text: "Warum sind diese Regeln hier und in der E-Mail so prominent? Wenn ein Kunde ohne Stoppersocken erscheint oder eine Rückerstattung in letzter Minute verlangt, können Sie sich immer darauf berufen, dass die Regeln mit dem Ticket zugestellt wurden.",
  },
  digitalConcierge: {
    title: "Digitaler Concierge",
    text: "Der Link enthält eine eingebettete ID (z. B. %appointment_id%). Wenn der Kunde hier klickt, steht in seinem WhatsApp bereits ein vorformulierter Text mit seiner Buchungsnummer. Ihr Admin weiß sofort, mit wem er spricht, und muss keine Zeit mit Nachfragen verschwenden.",
  },
  tseFiscalization: {
    title: "Automatisierte Fiskalisierung (TSE)",
    text: "Während diese Seite geladen wurde, hat das System bereits die Cloud-TSE ready2order angebunden. Diese Rechnung enthält eine legale, kryptografische TSE-Signatur gemäß KassenSichV. Ihr Buchhalter muss nichts mehr manuell buchen – die Steuerreporting ist zu 100% automatisiert.",
  },
  backgroundMagic: {
    title: "Hintergrund-Magie",
    text: "Der Kunde sieht nur ein hübsches Ticket, aber im Hintergrund ist gerade Folgendes passiert: 1) Eine automatische WhatsApp-Nachricht wurde gesendet. 2) Dieser Zeitslot wurde im Google-Kalender Ihrer Admins blockiert (Zwei-Wege-Sync) – 100% Schutz vor Doppelbuchungen.",
  },
};

// --- КОНФІГ АНІМАЦІЇ ПЕРЕХОДІВ ---
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// Утиліта для пошуку понеділка
const getMondayOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? 6 : day - 1;
  result.setDate(result.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

export default function CXPage() {
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [deviceView, setDeviceView] = useState<DeviceView>("mobile");
  const [direction, setDirection] = useState<number>(1);

  const [activeInsight, setActiveInsight] = useState(INSIGHTS.landing);
  const [hoverInsight, setHoverInsight] = useState<{
    title: string;
    text: React.ReactNode;
  } | null>(null);

  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(1);
  const [infants, setInfants] = useState(0);
  const [adultError, setAdultError] = useState(false);
  const [waitlistSlot, setWaitlistSlot] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [waitlistContact, setWaitlistContact] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  // --- Checkout states ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [bookForOther, setBookForOther] = useState(false);
  const [otherFirstName, setOtherFirstName] = useState("");
  const [otherLastName, setOtherLastName] = useState("");
  const [otherEmail, setOtherEmail] = useState("");
  const [allergies, setAllergies] = useState("");
  const [communicationChannel, setCommunicationChannel] = useState<
    "email" | "sms" | "whatsapp"
  >("email");
  const [giftCode, setGiftCode] = useState("");

  const [giftDiscount, setGiftDiscount] = useState(0);
  const [giftError, setGiftError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "stripe" | "sepa" | "invoice" | "paypal" | "klarna"
  >("stripe");
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSalinapass, setHasSalinapass] = useState(false);
  const [stripeDown, setStripeDown] = useState(false); // Симуляція падіння Stripe

  // Фіксуємо today один раз, щоб календар не стрибав під час сесії
  const [today] = useState(() => new Date());

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() =>
    getMondayOfWeek(today),
  );
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  type MobileCalendarView = "1day" | "3days";
  const [mobileCalendarView, setMobileCalendarView] =
    useState<MobileCalendarView>("1day");
  // Індекс активного дня в межах поточного тижня (0-6)
  const todayDayIndex = (today.getDay() + 6) % 7; // Пн=0, ..., Нд=6
  const [activeDayIndex, setActiveDayIndex] = useState<number>(todayDayIndex);

  // Функції гортання дня (вперед/назад з переходом на наступний/попередній тиждень)
  const goToPreviousDay = () => {
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    const currentDate = new Date(currentWeekStart);
    currentDate.setDate(currentDate.getDate() + activeDayIndex);

    if (currentDate <= todayStart) return;

    if (activeDayIndex > 0) {
      setActiveDayIndex(activeDayIndex - 1);
    } else {
      const prevWeek = new Date(currentWeekStart);
      prevWeek.setDate(prevWeek.getDate() - 7);
      setCurrentWeekStart(prevWeek);
      setActiveDayIndex(6);
    }
  };

  const goToNextDay = () => {
    if (activeDayIndex < 6) {
      setActiveDayIndex(activeDayIndex + 1);
    } else {
      const nextWeek = new Date(currentWeekStart);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setCurrentWeekStart(nextWeek);
      setActiveDayIndex(0);
    }
  };

  // Розумна функція зміни локації
  const handleLocationChange = (loc: (typeof LOCATIONS)[0]) => {
    setSelectedLocation(loc);

    // Перевіряємо за допомогою безпечного оновлення стану
    setSelectedRoom((prevRoom) => {
      // Якщо поточна кімната є в новому місті — залишаємо її
      if (prevRoom.locations.includes(loc.id)) {
        return prevRoom;
      }
      // Якщо ні — беремо першу доступну для нового міста
      return ROOMS.find((r) => r.locations.includes(loc.id)) || prevRoom;
    });
  };

  const startBooking = () => {
    if (deviceView === "mobile") {
      setDirection(1);
      setCurrentStep("booking");
      setActiveInsight(INSIGHTS.bookingStart);
    }
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep("landing");
    setActiveInsight(INSIGHTS.landing);
  };

  const decreaseAdults = () => {
    if (adults <= 1) {
      setAdultError(true);
      setTimeout(() => setAdultError(false), 600);
      return;
    }
    setAdults(adults - 1);
  };

  const applyGiftCode = () => {
    if (giftCode.trim().toUpperCase() === "GESCHENK10") {
      setGiftDiscount(10);
      setGiftError("");
    } else {
      setGiftDiscount(0);
      setGiftError("Ungültiger Code");
    }
  };

  return (
    // 1. Зменшили верхній відступ: lg:p-12 замінено на lg:px-12 lg:pt-4 lg:pb-12
    <div className="min-h-screen p-6 lg:px-12 lg:pt-4 lg:pb-12 animate-in fade-in duration-1000 flex flex-col">
      {/* 2. Зменшили відступ під шапкою (mb-4) і вирівняли по верху (items-start) */}
      <header className="mb-4 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-salina-dark mb-2 md:mt-1">
            Kundenerlebnis <span className="text-salina-orange">(CX)</span>
          </h1>
          <p className="text-slate-500 max-w-xl text-lg">
            Simulation der User Journey. Wechseln Sie zwischen Mobile und
            Desktop.
          </p>
        </div>

        {/* 3. Додали md:mt-1, щоб візуально відцентрувати перемикач з H1 */}
        <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm md:mt-1">
          <button
            onClick={() => {
              setDeviceView("mobile");
              setCurrentStep("landing");
              setActiveInsight(INSIGHTS.landing);
            }}
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
            onClick={() => {
              setDeviceView("desktop");
              setCurrentStep("landing");
              setActiveInsight(INSIGHTS.landing);
            }}
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

      {/* Оновлено max-w-[1600px] -> max-w-400 */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-400 w-full mx-auto">
        <div className="xl:col-span-7 flex justify-center items-start pt-4 relative">
          <motion.div
            layout
            className={cn(
              "relative flex flex-col transition-all duration-500",
              // Оновлені канонічні класи Tailwind
              deviceView === "mobile"
                ? "w-full max-w-100 h-187.5 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden"
                : "w-full max-w-225 h-150 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden",
            )}
          >
            {deviceView === "mobile" && (
              <div className="w-full h-7 bg-salina-dark/5 flex items-center justify-center shrink-0 z-50">
                <div className="w-1/3 h-1.5 bg-salina-dark/20 rounded-full"></div>
              </div>
            )}

            <div
              className={cn(
                "flex-1 overflow-y-auto relative w-full h-full",
                selectedLocation.bg,
              )}
            >
              <AnimatePresence mode="wait">
                {currentStep === "landing" && (
                  <motion.div
                    key="landing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    className="w-full h-full flex flex-col"
                  >
                    <header className="px-6 py-4 flex justify-between items-center bg-white/40 backdrop-blur-md border-b border-slate-200/50">
                      <div className="font-bold text-xl text-salina-dark">
                        La<span className="text-salina-orange">Salina</span>
                      </div>

                      {deviceView === "desktop" && (
                        <div className="flex items-center gap-6">
                          <nav className="flex gap-6 text-sm font-medium text-slate-600">
                            <span className="hover:text-salina-orange cursor-pointer">
                              Konzept
                            </span>
                            <span className="hover:text-salina-orange cursor-pointer">
                              Preise
                            </span>
                            <span className="hover:text-salina-orange cursor-pointer">
                              FAQ
                            </span>
                          </nav>

                          <div
                            onMouseEnter={() =>
                              setHoverInsight(TOOLTIPS.location)
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                            className="relative flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm cursor-pointer hover:border-salina-orange group"
                          >
                            <div className="absolute -left-3 -top-3 w-6 h-6 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-salina-orange z-30 animate-pulse">
                              <Info className="w-3 h-3" />
                            </div>
                            <MapPin className="w-4 h-4 text-salina-orange mr-2" />
                            <select
                              className="bg-transparent outline-none font-bold text-salina-dark cursor-pointer text-sm appearance-none pr-6 z-10 w-full"
                              value={selectedLocation.id}
                              onChange={(e) =>
                                handleLocationChange(
                                  LOCATIONS.find(
                                    (l) => l.id === e.target.value,
                                  )!,
                                )
                              }
                            >
                              {LOCATIONS.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                  {loc.name}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none group-hover:text-salina-orange transition-colors" />
                          </div>
                        </div>
                      )}
                    </header>

                    <div
                      className={cn(
                        "flex-1 flex flex-col justify-center px-6 relative z-10",
                        deviceView === "desktop"
                          ? "items-center text-center"
                          : "items-start text-left",
                      )}
                    >
                      <motion.div
                        key={selectedLocation.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                      >
                        <h2
                          className={cn(
                            "font-bold text-salina-dark mb-4",
                            deviceView === "desktop" ? "text-6xl" : "text-4xl",
                          )}
                        >
                          Willkommen in <br />
                          <span className="text-salina-orange">
                            {selectedLocation.name}
                          </span>
                        </h2>
                        <p className="text-slate-600 max-w-md mx-auto text-lg">
                          Ihre Premium-Familienlounge. Wählen Sie Ihren
                          Standort, um das lokale Angebot zu entdecken.
                        </p>
                      </motion.div>

                      {/* ПК Віджет */}
                      {deviceView === "desktop" ? (
                        <div
                          className="bg-white p-2 rounded-2xl flex items-center gap-2 w-full max-w-4xl shadow-2xl border border-slate-100 relative mt-4"
                          onMouseEnter={() => setHoverInsight(TOOLTIPS.widget)}
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange z-30 animate-pulse">
                            <Info className="w-4 h-4" />
                          </div>

                          {/* 1. СТИЛІЗОВАНИЙ ВИБІР КІМНАТИ */}
                          <div className="flex-[1.5] p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border-r border-slate-100 flex flex-col justify-center relative group">
                            <div className="flex items-center gap-3 relative bg-slate-50/50 border border-slate-200/60 rounded-2xl px-4 py-2.5 hover:border-salina-orange hover:bg-white transition-all duration-300">
                              <Sparkles className="w-5 h-5 text-salina-orange shrink-0" />
                              <select
                                className="w-full bg-transparent outline-none font-bold text-salina-dark cursor-pointer text-base appearance-none pr-6 z-10"
                                value={selectedRoom.id}
                                onChange={(e) =>
                                  setSelectedRoom(
                                    ROOMS.find((r) => r.id === e.target.value)!,
                                  )
                                }
                              >
                                {ROOMS.filter((r) =>
                                  r.locations.includes(selectedLocation.id),
                                ).map((room) => (
                                  <option key={room.id} value={room.id}>
                                    {room.name} (ab {selectedLocation.price}€)
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 pointer-events-none group-hover:text-salina-orange transition-colors" />
                            </div>
                          </div>

                          {/* 2. СТИЛІЗОВАНА СІМ'Я (ДОРОСЛІ / ДІТИ / НЕМОВЛЯТА) */}
                          <div
                            className="w-[380px] p-3 rounded-2xl hover:bg-slate-50 transition-colors border-r border-slate-100 flex items-center gap-3 relative"
                            onMouseEnter={(e) => {
                              e.stopPropagation();
                              setHoverInsight(TOOLTIPS.family);
                            }}
                            onMouseLeave={(e) => {
                              e.stopPropagation();
                              setHoverInsight(null);
                            }}
                          >
                            <Users className="w-5 h-5 text-slate-400 shrink-0" />
                            <div className="flex items-center gap-2 w-full">
                              {/* Дорослі */}
                              <div className="relative flex-1 group flex items-center bg-slate-50/50 border border-slate-200/60 rounded-2xl px-3 py-2 hover:border-salina-orange hover:bg-white transition-all duration-300">
                                <select
                                  className="w-full bg-transparent outline-none font-bold text-salina-dark cursor-pointer text-sm appearance-none pr-4 z-10"
                                  value={adults}
                                  onChange={(e) =>
                                    setAdults(Number(e.target.value))
                                  }
                                >
                                  {[1, 2, 3, 4].map((n) => (
                                    <option key={n} value={n}>
                                      {n} Erw.
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none group-hover:text-salina-orange" />
                              </div>

                              {/* Діти */}
                              <div className="relative flex-1 group flex items-center bg-slate-50/50 border border-slate-200/60 rounded-2xl px-3 py-2 hover:border-salina-orange hover:bg-white transition-all duration-300">
                                <select
                                  className="w-full bg-transparent outline-none font-bold text-salina-dark cursor-pointer text-sm appearance-none pr-4 z-10"
                                  value={kids}
                                  onChange={(e) =>
                                    setKids(Number(e.target.value))
                                  }
                                >
                                  {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>
                                      {n} Kind
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none group-hover:text-salina-orange" />
                              </div>

                              {/* Немовлята */}
                              <div className="relative flex-1 group flex items-center bg-slate-50/50 border border-slate-200/60 rounded-2xl px-3 py-2 hover:border-salina-orange hover:bg-white transition-all duration-300">
                                <select
                                  className="w-full bg-transparent outline-none font-bold text-salina-dark cursor-pointer text-sm appearance-none pr-4 z-10"
                                  value={infants}
                                  onChange={(e) =>
                                    setInfants(Number(e.target.value))
                                  }
                                >
                                  {[0, 1, 2, 3].map((n) => (
                                    <option key={n} value={n}>
                                      {n} Baby(s)
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 pointer-events-none group-hover:text-salina-orange" />
                              </div>
                            </div>
                          </div>

                          {/* 3. КНОПКА КАЛЕНДАРЯ */}
                          <button
                            onClick={() => {
                              setCurrentStep("calendar");
                              setActiveInsight(INSIGHTS.calendar);
                            }}
                            className="bg-salina-dark text-white font-bold rounded-xl px-8 py-5 shadow-md hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap"
                          >
                            <CalendarDays className="w-5 h-5" /> Termin finden
                          </button>
                        </div>
                      ) : (
                        <div className="w-full space-y-2 bg-white p-2 rounded-2xl shadow-xl border border-slate-100 z-10 relative">
                          <div
                            className="absolute -left-3 -top-3 w-7 h-7 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-salina-orange z-30 animate-pulse"
                            onMouseEnter={() =>
                              setHoverInsight(TOOLTIPS.location)
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-4 h-4" />
                          </div>
                          <div className="flex-1 relative flex items-center p-3 rounded-xl bg-slate-50 transition-colors">
                            <MapPin className="w-5 h-5 text-salina-orange mr-3" />
                            <select
                              className="w-full bg-transparent outline-none font-bold text-salina-dark cursor-pointer appearance-none"
                              value={selectedLocation.id}
                              onChange={(e) =>
                                handleLocationChange(
                                  LOCATIONS.find(
                                    (l) => l.id === e.target.value,
                                  )!,
                                )
                              }
                            >
                              {LOCATIONS.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                  {loc.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            onClick={startBooking}
                            className="w-full py-4 bg-salina-dark text-white font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                          >
                            Jetzt Buchen <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === "booking" && deviceView === "mobile" && (
                  <motion.div
                    key="confirmation"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col bg-white"
                  >
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={goBack}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:text-salina-dark transition-all shadow-sm"
                        >
                          <ChevronLeft className="w-4 h-4" /> Zurück
                        </button>

                        <div
                          className="flex items-center gap-2 text-sm font-bold text-salina-dark bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 relative group"
                          onMouseEnter={() =>
                            setHoverInsight(TOOLTIPS.location)
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <div className="absolute -left-2 -top-2 w-5 h-5 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-salina-orange z-30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">
                            <Info className="w-3 h-3" />
                          </div>
                          <Map className="w-4 h-4 text-salina-orange" />
                          <select
                            className="bg-transparent outline-none cursor-pointer appearance-none"
                            value={selectedLocation.id}
                            onChange={(e) =>
                              handleLocationChange(
                                LOCATIONS.find((l) => l.id === e.target.value)!,
                              )
                            }
                          >
                            {LOCATIONS.map((loc) => (
                              <option key={loc.id} value={loc.id}>
                                {loc.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 px-1 pb-1 mt-1">
                        <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                      </div>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto">
                      <h3 className="text-2xl font-bold text-salina-dark mb-6">
                        Was möchten Sie buchen?
                      </h3>

                      <div className="flex flex-col gap-4">
                        {ROOMS.filter((room) =>
                          room.locations.includes(selectedLocation.id),
                        ).map((room) => (
                          <div
                            key={room.id}
                            onClick={() => setSelectedRoom(room)}
                            onMouseEnter={() => setHoverInsight(TOOLTIPS.price)}
                            onMouseLeave={() => setHoverInsight(null)}
                            className={cn(
                              "p-5 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden",
                              selectedRoom.id === room.id
                                ? "border-salina-orange bg-orange-50"
                                : "border-slate-100 hover:border-salina-orange/30",
                            )}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-bold text-lg text-salina-dark">
                                  {room.name}
                                </h4>
                                <p className="text-sm text-slate-500">
                                  {room.desc}
                                </p>
                              </div>
                              <div
                                className={cn(
                                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                                  selectedRoom.id === room.id
                                    ? "border-salina-orange"
                                    : "border-slate-300",
                                )}
                              >
                                {selectedRoom.id === room.id && (
                                  <div className="w-3 h-3 bg-salina-orange rounded-full" />
                                )}
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-baseline justify-between">
                              <span className="text-sm font-medium text-slate-500">
                                Basispreis pro Kind
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-xs text-salina-orange font-bold">
                                  ab
                                </span>
                                <span className="text-xl font-black text-salina-dark">
                                  {selectedLocation.price} €
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Оновлено bg-gradient-to-r -> bg-linear-to-r */}
                    <div className="p-6 border-t border-slate-100 bg-white">
                      <button
                        onClick={() => {
                          setCurrentStep("family");
                          setActiveInsight(INSIGHTS.family);
                        }}
                        className="w-full py-4 bg-linear-to-r from-salina-orange to-salina-pink text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        Weiter zur Terminauswahl{" "}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
                {currentStep === "family" && deviceView === "mobile" && (
                  <motion.div
                    key="family"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-white z-20 flex flex-col"
                  >
                    {/* Прогрес-бар (2 з 3 заповнено) */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                      <div className="flex justify-between items-center mb-3">
                        <button
                          onClick={() => {
                            setDirection(-1);
                            setCurrentStep("booking");
                            setActiveInsight(INSIGHTS.bookingStart);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-sm font-bold text-slate-600"
                        >
                          <ChevronLeft className="w-4 h-4" /> Zurück
                        </button>
                      </div>
                      <div className="flex gap-2 px-1">
                        <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                        <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                      <h3 className="text-2xl font-bold text-salina-dark mb-8">
                        Wer nimmt teil?
                      </h3>

                      <div className="space-y-6">
                        {/* Дорослі */}
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 relative">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-xl font-bold text-salina-dark">
                                Erwachsene
                              </h4>
                              <p className="text-sm text-slate-500">
                                ab 18 Jahren
                              </p>
                            </div>
                            <div className="flex items-center gap-6">
                              <button
                                onClick={decreaseAdults}
                                className="w-12 h-12 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center text-2xl text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                −
                              </button>
                              <span className="text-2xl font-bold w-8 text-center">
                                {adults}
                              </span>
                              <button
                                onClick={() => setAdults(adults + 1)}
                                className="w-12 h-12 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center text-2xl text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          {adultError && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-3 font-medium"
                            >
                              Mindestens 1 Aufsichtsperson erforderlich
                            </motion.p>
                          )}
                          {/* Іконка підказки */}
                          <div
                            className="absolute -right-3 -top-3 w-8 h-8 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                            onMouseEnter={() =>
                              setHoverInsight(TOOLTIPS.adultMin)
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-4 h-4 text-salina-orange" />
                          </div>
                        </div>

                        {/* Діти */}
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-xl font-bold text-salina-dark">
                                Kinder
                              </h4>
                              <p className="text-sm text-slate-500">
                                1–17 Jahre
                              </p>
                            </div>
                            <div className="flex items-center gap-6">
                              <button
                                onClick={() => setKids(Math.max(1, kids - 1))}
                                className="w-12 h-12 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center text-2xl text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                −
                              </button>
                              <span className="text-2xl font-bold w-8 text-center">
                                {kids}
                              </span>
                              <button
                                onClick={() => setKids(kids + 1)}
                                className="w-12 h-12 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center text-2xl text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Немовлята */}
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-xl font-bold text-salina-dark">
                                Babys
                              </h4>
                              <p className="text-sm text-slate-500">
                                0–12 Monate
                              </p>
                            </div>
                            <div className="flex items-center gap-6">
                              <button
                                onClick={() =>
                                  setInfants(Math.max(0, infants - 1))
                                }
                                className="w-12 h-12 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center text-2xl text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                −
                              </button>
                              <span className="text-2xl font-bold w-8 text-center">
                                {infants}
                              </span>
                              <button
                                onClick={() => setInfants(infants + 1)}
                                className="w-12 h-12 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center text-2xl text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Нижня кнопка */}
                    <div className="p-6 border-t border-slate-100 bg-white">
                      <button
                        onClick={() => {
                          setCurrentStep("calendar");
                          setActiveInsight(INSIGHTS.calendar);
                        }}
                        className="w-full py-4 bg-linear-to-r from-salina-orange to-salina-pink text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                      >
                        Weiter zum Kalender <ArrowRight className="w-5 h-5" />
                      </button>
                      <p className="text-xs text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                        Kapazitätsprüfung läuft...
                        <span
                          className="inline-flex w-4 h-4 bg-slate-200 rounded-full items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight(TOOLTIPS.capacityCheck)
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3 h-3 text-slate-500" />
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}
                {currentStep === "calendar" && (
                  <motion.div
                    key="calendar"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col bg-white relative"
                  >
                    {/* Статус-бар для мобілки */}
                    {deviceView === "mobile" && (
                      <div className="p-4 border-b border-slate-100 bg-slate-50">
                        <div className="flex justify-between items-center mb-3">
                          <button
                            onClick={() => {
                              setDirection(-1);
                              setCurrentStep("family");
                              setActiveInsight(INSIGHTS.family);
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-sm font-bold text-slate-600"
                          >
                            <ChevronLeft className="w-4 h-4" /> Zurück
                          </button>
                          <span className="font-bold text-salina-dark text-base">
                            Kalender
                          </span>
                          <div className="w-20" />
                        </div>
                        <div className="flex gap-2 px-1">
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                        </div>
                      </div>
                    )}

                    {/* Заголовок з навігацією (для обох версій) */}
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      {deviceView === "desktop" ? (
                        <button
                          onClick={() => {
                            setDirection(-1);
                            setCurrentStep("landing");
                            setActiveInsight(INSIGHTS.landing);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-sm font-bold text-slate-600"
                        >
                          <ChevronLeft className="w-4 h-4" /> Zurück
                        </button>
                      ) : (
                        <div className="w-20" />
                      )}

                      {/* Стрілочки + місяць */}
                      <div className="flex items-center gap-3">
                        {/* Ліва стрілка */}
                        <button
                          onClick={() => {
                            // Віднімаємо рівно 1 місяць від поточного тижня
                            const targetDate = new Date(currentWeekStart);
                            targetDate.setMonth(targetDate.getMonth() - 1);

                            const mondayOfWeek = getMondayOfWeek(targetDate);

                            // Захист від гортання в минуле (раніше поточного тижня)
                            const todayMonday = getMondayOfWeek(today);
                            if (mondayOfWeek < todayMonday) {
                              mondayOfWeek.setTime(todayMonday.getTime());
                            }

                            setCurrentWeekStart(mondayOfWeek);
                            setActiveDayIndex(0);
                          }}
                          className="w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
                        >
                          <ChevronLeft className="w-4 h-4 text-slate-600" />
                        </button>

                        <button
                          onClick={() => setShowMonthPicker(!showMonthPicker)}
                          className="font-bold text-salina-dark hover:text-salina-orange transition-colors"
                        >
                          {currentWeekStart.toLocaleDateString("de-DE", {
                            month: "long",
                            year: "numeric",
                          })}
                        </button>

                        {/* Права стрілка */}
                        <button
                          onClick={() => {
                            // Додаємо рівно 1 місяць до поточного тижня
                            const targetDate = new Date(currentWeekStart);
                            targetDate.setMonth(targetDate.getMonth() + 1);

                            const mondayOfWeek = getMondayOfWeek(targetDate);

                            setCurrentWeekStart(mondayOfWeek);
                            setActiveDayIndex(0);
                          }}
                          className="w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
                        >
                          <ChevronLeft className="w-4 h-4 rotate-180 text-slate-600" />
                        </button>
                      </div>

                      <div className="w-20" />
                    </div>

                    {/* Місячний пікер */}
                    <AnimatePresence>
                      {showMonthPicker && (
                        <motion.div
                          key="month-picker"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden border-b border-slate-100 bg-white"
                        >
                          <div className="p-4 grid grid-cols-4 gap-3">
                            {Array.from({ length: 12 }, (_, i) => {
                              // Дата для відображення на кнопці
                              const monthDate = new Date(
                                today.getFullYear(),
                                today.getMonth() + i,
                                1,
                              );
                              const isActive =
                                monthDate.getMonth() ===
                                  currentWeekStart.getMonth() &&
                                monthDate.getFullYear() ===
                                  currentWeekStart.getFullYear();

                              return (
                                <button
                                  key={i}
                                  onClick={() => {
                                    // БЕРЕМО 7-МЕ ЧИСЛО!
                                    // Це гарантує, що понеділок цього тижня 100% буде в цьому ж місяці
                                    const targetDate = new Date(
                                      today.getFullYear(),
                                      today.getMonth() + i,
                                      7,
                                    );
                                    const mondayOfWeek =
                                      getMondayOfWeek(targetDate);

                                    setCurrentWeekStart(mondayOfWeek);
                                    setActiveDayIndex(0);
                                    setShowMonthPicker(false);
                                  }}
                                  className={cn(
                                    "py-2 rounded-xl text-sm font-medium transition-colors",
                                    isActive
                                      ? "bg-salina-orange text-white"
                                      : "bg-slate-50 text-slate-600 hover:bg-slate-100",
                                  )}
                                >
                                  {monthDate.toLocaleDateString("de-DE", {
                                    month: "short",
                                  })}
                                </button>
                              );
                            })}
                          </div>
                          <div className="px-4 pb-4">
                            <div className="text-xs text-slate-400 mb-2">
                              Direkt zum Datum
                            </div>
                            <input
                              type="date"
                              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                              onChange={(e) => {
                                if (e.target.value) {
                                  const [year, month, day] = e.target.value
                                    .split("-")
                                    .map(Number);
                                  const picked = new Date(
                                    year,
                                    month - 1,
                                    day,
                                    12,
                                    0,
                                    0,
                                  );

                                  const todayStart = new Date(today);
                                  todayStart.setHours(0, 0, 0, 0);
                                  if (picked < todayStart) return;

                                  const mondayOfWeek = getMondayOfWeek(picked);
                                  const dow = picked.getDay();
                                  const diff = dow === 0 ? 6 : dow - 1;

                                  setCurrentWeekStart(mondayOfWeek);
                                  setActiveDayIndex(diff);
                                  setShowMonthPicker(false);
                                }
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Контент календаря */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                      {deviceView === "desktop" && (
                        <div className="text-sm text-slate-500 mb-4">
                          Woche vom{" "}
                          {currentWeekStart.toLocaleDateString("de-DE", {
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          –{" "}
                          {new Date(
                            new Date(currentWeekStart).setDate(
                              currentWeekStart.getDate() + 6,
                            ),
                          ).toLocaleDateString("de-DE", {
                            day: "numeric",
                            month: "long",
                          })}
                        </div>
                      )}

                      {/* Десктоп: сітка 7 днів зі стрілками з боків */}
                      {deviceView === "desktop" ? (
                        <div className="relative">
                          <div className="flex items-center justify-between mb-1">
                            <button
                              onClick={() => {
                                const prev = new Date(currentWeekStart);
                                prev.setDate(prev.getDate() - 7); // зсуваємо на тиждень назад
                                const todayMonday = new Date(today);
                                const todayDow = today.getDay();
                                const todayDiff =
                                  todayDow === 0 ? 6 : todayDow - 1;
                                todayMonday.setDate(
                                  today.getDate() - todayDiff,
                                );
                                todayMonday.setHours(0, 0, 0, 0);
                                if (prev >= todayMonday) {
                                  setCurrentWeekStart(prev);
                                }
                              }}
                              className="p-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-salina-dark transition"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-slate-400">
                              Woche verschieben
                            </span>
                            <button
                              onClick={() => {
                                const next = new Date(currentWeekStart);
                                next.setDate(next.getDate() + 7); // зсуваємо на тиждень уперед
                                setCurrentWeekStart(next);
                              }}
                              className="p-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-salina-dark transition"
                            >
                              <ChevronLeft className="w-4 h-4 rotate-180" />
                            </button>
                          </div>
                          <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 7 }).map((_, i) => {
                              const date = new Date(currentWeekStart);
                              date.setDate(date.getDate() + i);
                              const isToday =
                                date.toDateString() === today.toDateString();
                              return (
                                <div
                                  key={i}
                                  className={cn(
                                    "text-center text-sm font-medium py-1",
                                    isToday
                                      ? "text-salina-orange font-bold"
                                      : "text-slate-400",
                                  )}
                                >
                                  {date.toLocaleDateString("de-DE", {
                                    weekday: "short",
                                  })}
                                  <br />
                                  <span className="text-xs">
                                    {date.getDate()}
                                  </span>
                                </div>
                              );
                            })}
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                              const date = new Date(currentWeekStart);
                              date.setDate(date.getDate() + dayIndex);
                              return (
                                <div
                                  key={dayIndex}
                                  className="space-y-1.5 mt-2"
                                >
                                  {[
                                    "10:00",
                                    "11:00",
                                    "12:00",
                                    "13:00",
                                    "14:00",
                                    "15:00",
                                    "16:00",
                                  ].map((time) => {
                                    const [hourStr] = time.split(":");
                                    const slotDate = new Date(date);
                                    slotDate.setHours(
                                      parseInt(hourStr),
                                      0,
                                      0,
                                      0,
                                    );
                                    const now = new Date();
                                    const diffHours =
                                      (slotDate.getTime() - now.getTime()) /
                                      (1000 * 60 * 60);
                                    const isPast = slotDate < now;
                                    const isBuffer = !isPast && diffHours < 2;

                                    const seed =
                                      date.toISOString().slice(0, 10) + time;
                                    let hash = 0;
                                    for (let j = 0; j < seed.length; j++) {
                                      hash =
                                        (hash * 31 + seed.charCodeAt(j)) % 1000;
                                    }
                                    const rand = hash / 1000;

                                    let status:
                                      | "free"
                                      | "limited"
                                      | "full"
                                      | "blocked";
                                    if (isPast || isBuffer) status = "blocked";
                                    else if (rand < 0.5) status = "free";
                                    else if (rand < 0.8) status = "limited";
                                    else status = "full";

                                    return (
                                      <div
                                        key={time}
                                        onClick={() => {
                                          if (status === "full") {
                                            setWaitlistSlot(
                                              `${time} am ${date.toLocaleDateString("de-DE")}`,
                                            );
                                          } else if (status !== "blocked") {
                                            setSelectedSlot(
                                              `${time} am ${date.toLocaleDateString("de-DE")}`,
                                            );
                                            setCurrentStep("checkout");
                                            setActiveInsight(
                                              INSIGHTS.checkoutDetails,
                                            );
                                          }
                                        }}
                                        onMouseEnter={() => {
                                          if (status === "limited")
                                            setHoverInsight(
                                              TOOLTIPS.trafficLight,
                                            );
                                          else if (status === "full")
                                            setHoverInsight(
                                              TOOLTIPS.financialSecurity,
                                            );
                                          else if (isBuffer)
                                            setHoverInsight(
                                              TOOLTIPS.bufferTime,
                                            );
                                        }}
                                        onMouseLeave={() =>
                                          setHoverInsight(null)
                                        }
                                        className={cn(
                                          "p-2 rounded-lg text-xs font-medium text-center transition-all border shadow-sm",
                                          status === "free" &&
                                            "bg-green-50 border-green-200 text-green-800 hover:scale-105 hover:shadow-md cursor-pointer",
                                          status === "limited" &&
                                            "bg-yellow-50 border-yellow-300 text-yellow-800 animate-pulse cursor-pointer hover:shadow-md",
                                          status === "full" &&
                                            "bg-red-50 border-red-200 text-red-400 opacity-60 cursor-not-allowed",
                                          status === "blocked" &&
                                            "bg-slate-100 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed",
                                        )}
                                      >
                                        {time}
                                        {status === "limited" && (
                                          <span className="block text-[10px]">
                                            Nur 2 Plätze
                                          </span>
                                        )}
                                        {status === "blocked" && isBuffer && (
                                          <span className="block text-[10px]">
                                            Puffer
                                          </span>
                                        )}
                                        {status === "blocked" && isPast && (
                                          <span className="block text-[10px]">
                                            vorbei
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Перемикач вигляду */}

                          <div className="flex justify-center mb-3">
                            <div className="flex bg-slate-100 rounded-full p-1">
                              <button
                                onClick={() => setMobileCalendarView("1day")}
                                className={cn(
                                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                                  mobileCalendarView === "1day"
                                    ? "bg-white shadow text-salina-dark"
                                    : "text-slate-500",
                                )}
                              >
                                1 Tag
                              </button>
                              <button
                                onClick={() => setMobileCalendarView("3days")}
                                className={cn(
                                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                                  mobileCalendarView === "3days"
                                    ? "bg-white shadow text-salina-dark"
                                    : "text-slate-500",
                                )}
                              >
                                3 Tage
                              </button>
                            </div>
                          </div>

                          {mobileCalendarView === "1day" && (
                            <div className="flex flex-col">
                              {/* Стрілки + дата */}
                              <div className="flex items-center justify-between mb-3">
                                <button
                                  onClick={goToPreviousDay}
                                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-salina-dark transition"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <div className="text-center">
                                  {(() => {
                                    const date = new Date(currentWeekStart);
                                    date.setDate(
                                      date.getDate() + activeDayIndex,
                                    );
                                    return (
                                      <>
                                        <div className="text-sm font-medium text-slate-500">
                                          {date.toLocaleDateString("de-DE", {
                                            weekday: "long",
                                          })}
                                        </div>
                                        <div className="text-2xl font-bold text-salina-dark">
                                          {date.getDate()}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                          {date.toLocaleDateString("de-DE", {
                                            month: "long",
                                            year: "numeric",
                                          })}
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                                <button
                                  onClick={goToNextDay}
                                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-salina-dark transition"
                                >
                                  <ChevronLeft className="w-4 h-4 rotate-180" />
                                </button>
                              </div>

                              {/* Слоти для вибраного дня */}
                              <div className="space-y-2">
                                {[
                                  "10:00",
                                  "11:00",
                                  "12:00",
                                  "13:00",
                                  "14:00",
                                  "15:00",
                                  "16:00",
                                ].map((time) => {
                                  const date = new Date(currentWeekStart);
                                  date.setDate(date.getDate() + activeDayIndex);
                                  const [hourStr] = time.split(":");
                                  const slotDate = new Date(date);
                                  slotDate.setHours(parseInt(hourStr), 0, 0, 0);
                                  const now = new Date();
                                  const diffHours =
                                    (slotDate.getTime() - now.getTime()) /
                                    (1000 * 60 * 60);
                                  const isPast = slotDate < now;
                                  const isBuffer = !isPast && diffHours < 2;

                                  const seed =
                                    date.toISOString().slice(0, 10) + time;
                                  let hash = 0;
                                  for (let j = 0; j < seed.length; j++) {
                                    hash =
                                      (hash * 31 + seed.charCodeAt(j)) % 1000;
                                  }
                                  const rand = hash / 1000;

                                  let status:
                                    | "free"
                                    | "limited"
                                    | "full"
                                    | "blocked";
                                  if (isPast || isBuffer) status = "blocked";
                                  else if (rand < 0.5) status = "free";
                                  else if (rand < 0.8) status = "limited";
                                  else status = "full";

                                  return (
                                    <div
                                      key={time}
                                      onClick={() => {
                                        if (status === "full") {
                                          setWaitlistSlot(
                                            `${time} am ${date.toLocaleDateString("de-DE")}`,
                                          );
                                        } else if (status !== "blocked") {
                                          setSelectedSlot(
                                            `${time} am ${date.toLocaleDateString("de-DE")}`,
                                          );
                                          setCurrentStep("checkout");
                                          setActiveInsight(
                                            INSIGHTS.checkoutDetails,
                                          );
                                        }
                                      }}
                                      onMouseEnter={() => {
                                        if (status === "limited")
                                          setHoverInsight(
                                            TOOLTIPS.trafficLight,
                                          );
                                        else if (status === "full")
                                          setHoverInsight(
                                            TOOLTIPS.financialSecurity,
                                          );
                                        else if (isBuffer)
                                          setHoverInsight(TOOLTIPS.bufferTime);
                                      }}
                                      onMouseLeave={() => setHoverInsight(null)}
                                      className={cn(
                                        "p-3 rounded-lg text-sm font-medium flex items-center justify-between border shadow-sm transition-all",
                                        status === "free" &&
                                          "bg-green-50 border-green-200 text-green-800 active:scale-95 cursor-pointer",
                                        status === "limited" &&
                                          "bg-yellow-50 border-yellow-300 text-yellow-800 animate-pulse active:scale-95 cursor-pointer",
                                        status === "full" &&
                                          "bg-red-50 border-red-200 text-red-400 opacity-60",
                                        status === "blocked" &&
                                          "bg-slate-100 border-slate-200 text-slate-400 opacity-50",
                                      )}
                                    >
                                      <span>{time}</span>
                                      {status === "limited" && (
                                        <span className="text-xs bg-white/80 rounded-full px-2 py-0.5 text-yellow-700 font-medium">
                                          Nur 2 Plätze
                                        </span>
                                      )}
                                      {status === "blocked" && isBuffer && (
                                        <span className="text-xs bg-white/80 rounded-full px-2 py-0.5 text-slate-500">
                                          Puffer
                                        </span>
                                      )}
                                      {status === "blocked" && isPast && (
                                        <span className="text-xs bg-white/80 rounded-full px-2 py-0.5 text-slate-500">
                                          vorbei
                                        </span>
                                      )}
                                      {status === "free" && (
                                        <span className="text-xs bg-white/80 rounded-full px-2 py-0.5 text-green-700 font-medium">
                                          Verfügbar
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {mobileCalendarView === "3days" && (
                            <div className="flex flex-col">
                              {/* Кнопки гортання для 3-денного вигляду */}
                              <div className="flex items-center justify-between mb-3">
                                <button
                                  onClick={goToPreviousDay}
                                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-salina-dark transition"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <div className="text-sm font-medium text-slate-500">
                                  Tage verschieben
                                </div>
                                <button
                                  onClick={goToNextDay}
                                  className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-salina-dark transition"
                                >
                                  <ChevronLeft className="w-4 h-4 rotate-180" />
                                </button>
                              </div>

                              {/* Сітка з 3 колонок */}
                              <div className="grid grid-cols-3 gap-3">
                                {[0, 1, 2].map((offset) => {
                                  const dayIdx = activeDayIndex + offset;
                                  const date = new Date(currentWeekStart);
                                  date.setDate(date.getDate() + dayIdx);
                                  const isToday =
                                    date.toDateString() ===
                                    today.toDateString();

                                  const todayStart = new Date(today);
                                  todayStart.setHours(0, 0, 0, 0);
                                  if (date < todayStart) return null;

                                  return (
                                    <div key={offset} className="space-y-2">
                                      <div
                                        className={cn(
                                          "text-center text-sm font-medium mb-2",
                                          isToday
                                            ? "text-salina-orange font-bold"
                                            : "text-slate-500",
                                        )}
                                      >
                                        {date.toLocaleDateString("de-DE", {
                                          weekday: "short",
                                        })}
                                        <br />
                                        <span className="text-xs">
                                          {date.getDate()}
                                        </span>
                                      </div>
                                      {[
                                        "10:00",
                                        "11:00",
                                        "12:00",
                                        "13:00",
                                        "14:00",
                                        "15:00",
                                        "16:00",
                                      ].map((time) => {
                                        const [hourStr] = time.split(":");
                                        const slotDate = new Date(date);
                                        slotDate.setHours(
                                          parseInt(hourStr),
                                          0,
                                          0,
                                          0,
                                        );
                                        const now = new Date();
                                        const diffHours =
                                          (slotDate.getTime() - now.getTime()) /
                                          (1000 * 60 * 60);
                                        const isPast = slotDate < now;
                                        const isBuffer =
                                          !isPast && diffHours < 2;

                                        const seed =
                                          date.toISOString().slice(0, 10) +
                                          time;
                                        let hash = 0;
                                        for (let j = 0; j < seed.length; j++) {
                                          hash =
                                            (hash * 31 + seed.charCodeAt(j)) %
                                            1000;
                                        }
                                        const rand = hash / 1000;

                                        let status:
                                          | "free"
                                          | "limited"
                                          | "full"
                                          | "blocked";
                                        if (isPast || isBuffer)
                                          status = "blocked";
                                        else if (rand < 0.5) status = "free";
                                        else if (rand < 0.8) status = "limited";
                                        else status = "full";

                                        return (
                                          <div
                                            key={time}
                                            onClick={() => {
                                              if (status === "full") {
                                                setWaitlistSlot(
                                                  `${time} am ${date.toLocaleDateString("de-DE")}`,
                                                );
                                              } else if (status !== "blocked") {
                                                setSelectedSlot(
                                                  `${time} am ${date.toLocaleDateString("de-DE")}`,
                                                );
                                                setCurrentStep("checkout");
                                                setActiveInsight(
                                                  INSIGHTS.checkoutDetails,
                                                );
                                              }
                                            }}
                                            className={cn(
                                              "p-2 rounded-lg text-xs font-medium text-center transition-all border shadow-sm",
                                              status === "free" &&
                                                "bg-green-50 border-green-200 text-green-800 active:scale-95 cursor-pointer",
                                              status === "limited" &&
                                                "bg-yellow-50 border-yellow-300 text-yellow-800 animate-pulse active:scale-95 cursor-pointer",
                                              status === "full" &&
                                                "bg-red-50 border-red-200 text-red-400 opacity-60",
                                              status === "blocked" &&
                                                "bg-slate-100 border-slate-200 text-slate-400 opacity-50",
                                            )}
                                          >
                                            {time}
                                            {status === "limited" && (
                                              <span className="block text-[10px]">
                                                Nur 2
                                              </span>
                                            )}
                                            {status === "blocked" &&
                                              isBuffer && (
                                                <span className="block text-[10px]">
                                                  Puffer
                                                </span>
                                              )}
                                            {status === "blocked" && isPast && (
                                              <span className="block text-[10px]">
                                                vorbei
                                              </span>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Модалка */}
                    <AnimatePresence>
                      {waitlistSlot && (
                        <motion.div
                          key="waitlist-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4"
                          onClick={() => {
                            setWaitlistSlot(null);
                            setWaitlistContact("");
                            setIsWaiting(false);
                          }}
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
                            // 1. Прибрано mx-4, змінено max-w-lg на max-w-md, зменшено padding, додано кастомний скролбар
                            className="bg-white rounded-3xl p-5 md:p-6 shadow-2xl border border-slate-100 max-w-md w-full relative max-h-[95%] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full"
                          >
                            <AnimatePresence mode="wait">
                              {!isWaiting ? (
                                <motion.div
                                  key="form"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                >
                                  <h4 className="text-xl font-bold text-salina-dark mb-2">
                                    Keine Plätze verfügbar
                                  </h4>
                                  <p className="text-slate-500 mb-1">
                                    <strong>{waitlistSlot}</strong>
                                  </p>
                                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                                    Möchten Sie sich für die{" "}
                                    <strong>Warteliste</strong> eintragen? Wir
                                    benachrichtigen Sie automatisch, falls
                                    jemand absagt.
                                  </p>

                                  {/* Поле контакту */}
                                  <label className="block text-sm font-medium text-slate-600 mb-2">
                                    E-Mail oder WhatsApp-Nummer
                                  </label>
                                  <input
                                    type="text"
                                    value={waitlistContact}
                                    onChange={(e) =>
                                      setWaitlistContact(e.target.value)
                                    }
                                    placeholder="z.B. +49 176 12345678"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all text-slate-700 placeholder:text-slate-300 mb-6"
                                  />

                                  <div className="flex gap-3">
                                    <button
                                      onClick={() => {
                                        if (waitlistContact.trim()) {
                                          setIsWaiting(true);
                                        }
                                      }}
                                      disabled={!waitlistContact.trim()}
                                      className={cn(
                                        "flex-1 py-3 bg-salina-orange text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 relative",
                                        waitlistContact.trim()
                                          ? "hover:bg-salina-orange/90 active:scale-95"
                                          : "opacity-50 cursor-not-allowed",
                                      )}
                                      onMouseEnter={() =>
                                        setHoverInsight(
                                          TOOLTIPS.whatsAppMarketing,
                                        )
                                      }
                                      onMouseLeave={() => setHoverInsight(null)}
                                    >
                                      In Warteliste eintragen
                                      {/* Іконка підказки на кнопці */}
                                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center">
                                        <Info className="w-3 h-3 text-salina-orange" />
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setWaitlistSlot(null);
                                        setWaitlistContact("");
                                      }}
                                      className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                                    >
                                      Abbrechen
                                    </button>
                                  </div>

                                  {/* Підказка про фінансову безпеку */}
                                  <p
                                    className="text-xs text-slate-400 mt-4 text-center flex items-center justify-center gap-1 cursor-help"
                                    onMouseEnter={() =>
                                      setHoverInsight(
                                        TOOLTIPS.financialSecurity,
                                      )
                                    }
                                    onMouseLeave={() => setHoverInsight(null)}
                                  >
                                    Warum ist die Warteliste wichtig?
                                    <span className="inline-flex w-3.5 h-3.5 bg-slate-200 rounded-full items-center justify-center">
                                      <Info className="w-2.5 h-2.5 text-slate-500" />
                                    </span>
                                  </p>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="success"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-center flex flex-col items-center w-full"
                                >
                                  {/* 2. Трохи зменшена іконка успіху */}
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 200,
                                      damping: 20,
                                    }}
                                    className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3"
                                  >
                                    <svg
                                      className="w-7 h-7 text-green-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </motion.div>
                                  <h4 className="text-lg md:text-xl font-bold text-salina-dark mb-1">
                                    Sie sind in der Warteliste!
                                  </h4>
                                  <p className="text-slate-500 text-sm mb-5">
                                    Wir melden uns, sobald ein Platz frei wird.
                                  </p>

                                  {/* Візуалізація: Що відбувається далі */}
                                  {/* 3. Оптимізовані відступи p-3 md:p-4 */}
                                  <div className="bg-slate-50 rounded-2xl p-3 md:p-4 text-left space-y-3 mb-2 w-full">
                                    <h5 className="text-sm font-bold text-salina-dark text-center mb-3">
                                      Was passiert jetzt?
                                    </h5>

                                    {/* Крок 1 */}
                                    <div className="flex items-start gap-3">
                                      <div className="w-7 h-7 rounded-full bg-salina-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-salina-orange">
                                          1
                                        </span>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-salina-dark">
                                          Sie warten
                                        </p>
                                        <p className="text-xs text-slate-500">
                                          Ihre Daten werden im System
                                          gespeichert. Keine E-Mail, kein
                                          WhatsApp – die Bestätigung sehen Sie
                                          direkt hier.
                                        </p>
                                      </div>
                                    </div>

                                    {/* Крок 2 */}
                                    <div className="flex items-start gap-3">
                                      <div className="w-7 h-7 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-yellow-700">
                                          2
                                        </span>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-salina-dark">
                                          Platz wird frei
                                        </p>
                                        <p className="text-xs text-slate-500 mb-2">
                                          Sagt jemand ab, verschickt das System
                                          sofort eine Nachricht an{" "}
                                          <strong>alle</strong> Wartenden.
                                        </p>

                                        {/* Прев'ю повідомлень */}
                                        <div className="flex items-center gap-3 justify-start mb-2 flex-wrap">
                                          {/* E-Mail іконка */}
                                          <div
                                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors"
                                            onMouseEnter={() =>
                                              setHoverInsight({
                                                title:
                                                  "E-Mail Benachrichtigung",
                                                text: (
                                                  <div className="space-y-2 text-sm">
                                                    <div className="bg-blue-50/50 rounded-lg p-3">
                                                      <p className="font-medium mb-1">
                                                        Betreff: Ein Platz ist
                                                        frei geworden!
                                                      </p>
                                                      <p>Guten Tag,</p>
                                                      <p className="my-1">
                                                        der gewünschte Termin am{" "}
                                                        <strong>
                                                          {waitlistSlot}
                                                        </strong>{" "}
                                                        ist wieder verfügbar.
                                                      </p>
                                                      <p className="font-medium text-salina-orange">
                                                        Jetzt buchen →
                                                      </p>
                                                    </div>
                                                  </div>
                                                ),
                                              })
                                            }
                                            onMouseLeave={() =>
                                              setHoverInsight(null)
                                            }
                                          >
                                            <Mail className="w-3.5 h-3.5 text-blue-600" />
                                            <span className="text-[11px] font-semibold text-blue-700">
                                              E-Mail
                                            </span>
                                          </div>

                                          {/* WhatsApp іконка */}
                                          <div
                                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition-colors"
                                            onMouseEnter={() =>
                                              setHoverInsight({
                                                title: "WhatsApp Nachricht",
                                                text: (
                                                  <div className="space-y-2 text-sm">
                                                    <div className="bg-green-50/50 rounded-lg p-3">
                                                      <p>
                                                        📅{" "}
                                                        <strong>
                                                          LaSalina
                                                        </strong>
                                                      </p>
                                                      <p className="my-1">
                                                        Ein Platz am{" "}
                                                        <strong>
                                                          {waitlistSlot}
                                                        </strong>{" "}
                                                        wurde frei!
                                                      </p>
                                                      <p>
                                                        🕒 Wer zuerst bucht,
                                                        bekommt ihn.
                                                      </p>
                                                      <p className="text-xs text-slate-400 mt-1">
                                                        Marketing Template ·
                                                        Meta-konform
                                                      </p>
                                                    </div>
                                                  </div>
                                                ),
                                              })
                                            }
                                            onMouseLeave={() =>
                                              setHoverInsight(null)
                                            }
                                          >
                                            <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                                            <span className="text-[11px] font-semibold text-green-700">
                                              WhatsApp
                                            </span>
                                          </div>
                                        </div>
                                        {/* Підказка для Корнелії */}
                                        <span
                                          className="inline-flex items-center gap-1 text-[11px] text-salina-orange cursor-help"
                                          onMouseEnter={() =>
                                            setHoverInsight(
                                              TOOLTIPS.financialSecurity,
                                            )
                                          }
                                          onMouseLeave={() =>
                                            setHoverInsight(null)
                                          }
                                        >
                                          <Info className="w-3 h-3" /> Warum das
                                          Ihren Umsatz rettet
                                        </span>
                                      </div>
                                    </div>

                                    {/* Крок 3 */}
                                    <div className="flex items-start gap-3">
                                      <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-salina-orange">
                                          3
                                        </span>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-salina-dark">
                                          Schnell buchen
                                        </p>
                                        <p className="text-xs text-slate-500">
                                          <strong>
                                            Wir buchen nicht automatisch.
                                          </strong>{" "}
                                          Wer zuerst klickt, bekommt den Platz.
                                        </p>
                                      </div>
                                    </div>

                                    {/* Крок 4 */}
                                    <div className="flex items-start gap-3">
                                      <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-red-500">
                                          4
                                        </span>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-salina-dark">
                                          Selbst austreten
                                        </p>
                                        <p className="text-xs text-slate-500">
                                          Kein Interesse mehr? Sie können die
                                          Warteliste jederzeit verlassen.
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Автоматичне закриття */}
                                  <button
                                    onClick={() => {
                                      setWaitlistSlot(null);
                                      setWaitlistContact("");
                                      setIsWaiting(false);
                                    }}
                                    className="mt-4 px-8 py-2.5 bg-salina-orange text-white font-medium rounded-xl hover:bg-salina-orange/90 transition-colors w-full md:w-auto"
                                  >
                                    Schließen
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
                {currentStep === "checkout" && (
                  <motion.div
                    key="checkout"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col bg-white"
                  >
                    {/* Статус-бар для мобілки (вже додано вище) */}
                    {deviceView === "mobile" && (
                      <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
                        <div className="flex justify-between items-center mb-3">
                          <button
                            onClick={() => {
                              setDirection(-1);
                              setCurrentStep("calendar");
                              setActiveInsight(INSIGHTS.calendar);
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-sm font-bold text-slate-600"
                          >
                            <ChevronLeft className="w-4 h-4" /> Zurück
                          </button>
                          <span className="font-bold text-salina-dark text-base">
                            Checkout
                          </span>
                          <div className="w-20" />
                        </div>
                        <div className="flex gap-2 px-1">
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-slate-200"></div>
                        </div>
                      </div>
                    )}

                    {/* Шапка для десктопу */}
                    {deviceView === "desktop" && (
                      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                        <button
                          onClick={() => {
                            setDirection(-1);
                            setCurrentStep("calendar");
                            setActiveInsight(INSIGHTS.calendar);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-sm font-bold text-slate-600"
                        >
                          <ChevronLeft className="w-4 h-4" /> Zurück
                        </button>
                        <div className="font-bold text-salina-dark text-lg tracking-tight">
                          Checkout
                        </div>
                        <div className="w-20" />
                      </div>
                    )}

                    {/* Основний контент */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {/* Блок авторизації */}
                      <div className="pb-4 border-b border-slate-100 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">
                            Schnell anmelden:
                          </span>
                          <div
                            className="w-5 h-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                            onMouseEnter={() =>
                              setHoverInsight(TOOLTIPS.zeroCheckoutMagic)
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3 h-3 text-salina-orange" />
                          </div>
                        </div>
                        <div
                          className={cn(
                            "flex gap-3",
                            deviceView === "mobile"
                              ? "flex-col"
                              : "flex-wrap items-center",
                          )}
                        >
                          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path
                                fill="#1877F2"
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                              />
                            </svg>
                            Facebook
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                            Google
                          </button>
                          {isLoggedIn ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-sm font-medium text-green-700">
                              ✅ Eingeloggt als VIP
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowLogin(true)}
                              className="flex items-center gap-2 px-4 py-2 bg-salina-orange text-white border border-salina-orange rounded-xl text-sm font-medium hover:bg-salina-orange/90 transition-colors w-full sm:w-auto justify-center"
                            >
                              Anmelden (Konto)
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Термін */}
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays className="w-4 h-4 text-salina-orange" />
                        Ausgewählter Termin: <strong>{selectedSlot}</strong>
                      </div>

                      {/* Основна форма */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Vorname *
                            </label>
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                              placeholder="Max"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Nachname *
                            </label>
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                              placeholder="Mustermann"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              E-Mail *
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                              placeholder="max@beispiel.de"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">
                              Telefon
                            </label>
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                              placeholder="+49 176 12345678"
                            />
                          </div>
                        </div>

                        {/* Чекбокси */}
                        <div className="space-y-3">
                          <div className="relative flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={createAccount}
                              onChange={(e) =>
                                setCreateAccount(e.target.checked)
                              }
                              className="mt-1 w-5 h-5 rounded border-slate-300 text-salina-orange focus:ring-salina-orange"
                            />
                            <span className="text-sm text-slate-600">
                              Konto erstellen (optional)
                            </span>
                            <div
                              className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                              onMouseEnter={() =>
                                setHoverInsight(TOOLTIPS.guestFirstCheckout)
                              }
                              onMouseLeave={() => setHoverInsight(null)}
                            >
                              <Info className="w-3.5 h-3.5 text-salina-orange" />
                            </div>
                          </div>
                          {createAccount && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <label className="block text-sm font-medium text-slate-600 mb-2">
                                Passwort
                              </label>
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                placeholder="••••••••"
                              />
                            </motion.div>
                          )}
                          <div className="relative flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={bookForOther}
                              onChange={(e) =>
                                setBookForOther(e.target.checked)
                              }
                              className="mt-1 w-5 h-5 rounded border-slate-300 text-salina-orange focus:ring-salina-orange"
                            />
                            <span className="text-sm text-slate-600">
                              Für jemand anderen buchen
                            </span>
                            <div
                              className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                              onMouseEnter={() =>
                                setHoverInsight(TOOLTIPS.grandmaScenario)
                              }
                              onMouseLeave={() => setHoverInsight(null)}
                            >
                              <Info className="w-3.5 h-3.5 text-salina-orange" />
                            </div>
                          </div>
                          {bookForOther && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-4 pl-2 border-l-2 border-salina-orange/20"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Vorname (Gast)
                                  </label>
                                  <input
                                    type="text"
                                    value={otherFirstName}
                                    onChange={(e) =>
                                      setOtherFirstName(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                    placeholder="Anna"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-600 mb-2">
                                    Nachname (Gast)
                                  </label>
                                  <input
                                    type="text"
                                    value={otherLastName}
                                    onChange={(e) =>
                                      setOtherLastName(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                    placeholder="Schmidt"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                  E-Mail (Gast)
                                </label>
                                <input
                                  type="email"
                                  value={otherEmail}
                                  onChange={(e) =>
                                    setOtherEmail(e.target.value)
                                  }
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                  placeholder="anna@beispiel.de"
                                />
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Алергії */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-slate-600 mb-2">
                            Allergien oder gesundheitliche Hinweise *
                          </label>
                          <textarea
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all resize-none"
                            placeholder="z.B. Heuschnupfen, Asthma..."
                          />
                          <div
                            className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                            onMouseEnter={() =>
                              setHoverInsight(TOOLTIPS.allergyValidation)
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3.5 h-3.5 text-salina-orange" />
                          </div>
                        </div>

                        {/* Канали зв'язку */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-slate-600 mb-3">
                            Wie möchten Sie erinnert werden? (24h vor Termin)
                          </label>
                          <div className="flex flex-wrap gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="channel"
                                value="email"
                                checked={communicationChannel === "email"}
                                onChange={() =>
                                  setCommunicationChannel("email")
                                }
                                className="w-4 h-4 text-salina-orange focus:ring-salina-orange"
                              />
                              <span className="text-sm text-slate-600">
                                E-Mail
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="channel"
                                value="sms"
                                checked={communicationChannel === "sms"}
                                onChange={() => setCommunicationChannel("sms")}
                                className="w-4 h-4 text-salina-orange focus:ring-salina-orange"
                              />
                              <span className="text-sm text-slate-600">
                                SMS
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="channel"
                                value="whatsapp"
                                checked={communicationChannel === "whatsapp"}
                                onChange={() =>
                                  setCommunicationChannel("whatsapp")
                                }
                                className="w-4 h-4 text-salina-orange focus:ring-salina-orange"
                              />
                              <span className="text-sm text-slate-600">
                                WhatsApp
                              </span>
                            </label>
                          </div>
                          <div
                            className="absolute -right-2 top-0 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                            onMouseEnter={() =>
                              setHoverInsight(TOOLTIPS.communicationChannelInfo)
                            }
                            onMouseLeave={() => setHoverInsight(null)}
                          >
                            <Info className="w-3.5 h-3.5 text-salina-orange" />
                          </div>
                        </div>
                      </div>

                      {/* Order Summary (завжди видимий) */}
                      <div className="border-t border-slate-200 pt-6">
                        <h3 className="text-lg font-bold text-salina-dark mb-4">
                          Ihre Bestellung
                        </h3>
                        {(() => {
                          const basePrice = parseFloat(
                            selectedLocation.price.replace(",", "."),
                          );
                          const kidsTotal = kids * basePrice;
                          let discount = 0;
                          if (kids >= 2) discount += basePrice * 0.2;
                          const subtotal = kidsTotal;
                          const total = hasSalinapass
                            ? 0
                            : Math.max(0, subtotal - discount - giftDiscount);
                          const totalFormatted = total
                            .toFixed(2)
                            .replace(".", ",");
                          const discountFormatted = discount
                            .toFixed(2)
                            .replace(".", ",");
                          const subtotalFormatted = subtotal
                            .toFixed(2)
                            .replace(".", ",");
                          const giftDiscountFormatted = giftDiscount
                            .toFixed(2)
                            .replace(".", ",");

                          return (
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-500">
                                  {adults} Erwachsene
                                </span>
                                <span>0,00 €</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">
                                  {kids} Kinder × {selectedLocation.price} €
                                </span>
                                <span>{subtotalFormatted} €</span>
                              </div>
                              {infants > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    {infants} Babys (kostenlos)
                                  </span>
                                  <span className="text-green-600">0,00 €</span>
                                </div>
                              )}
                              {discount > 0 && (
                                <div className="flex justify-between text-amber-700">
                                  <span>Geschwisterrabatt (–20%)</span>
                                  <span>–{discountFormatted} €</span>
                                </div>
                              )}
                              {/* Сертифікат */}
                              {!hasSalinapass && (
                                <div className="flex gap-2 mt-2">
                                  <input
                                    type="text"
                                    value={giftCode}
                                    onChange={(e) =>
                                      setGiftCode(e.target.value)
                                    }
                                    placeholder="Gutscheincode"
                                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm"
                                  />
                                  <button
                                    onClick={applyGiftCode}
                                    className="px-4 py-2 bg-salina-orange/10 text-salina-orange rounded-lg text-sm font-medium hover:bg-salina-orange/20 transition-colors"
                                  >
                                    Einlösen
                                  </button>
                                </div>
                              )}
                              {giftError && (
                                <p className="text-red-500 text-xs mt-1">
                                  {giftError}
                                </p>
                              )}
                              {giftDiscount > 0 && (
                                <div className="flex justify-between text-green-600">
                                  <span>Gutschein</span>
                                  <span>–{giftDiscountFormatted} €</span>
                                </div>
                              )}
                              <div>
                                <div className="flex justify-between text-lg font-bold border-t border-slate-200 pt-4 mt-4">
                                  <span className="text-salina-dark">
                                    Gesamt
                                  </span>
                                  <span className="text-salina-orange">
                                    {totalFormatted} €
                                  </span>
                                </div>
                                {hasSalinapass && (
                                  <div className="text-sm text-green-600 font-medium mt-1 text-right">
                                    Salinapass: 0,00 € (VIP Zero-Checkout)
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Юридичний блок */}
                      <div className="space-y-3 border-t border-slate-200 pt-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mt-1 w-5 h-5 rounded border-slate-300 text-salina-orange focus:ring-salina-orange"
                          />
                          <span className="text-sm text-slate-600">
                            Ich möchte Neuigkeiten und Aktionen von La Salina
                            erhalten. (DSGVO Opt-In)
                          </span>
                        </label>
                        <p className="text-xs text-slate-400">
                          Mit Klick auf die Zahlungsbutton akzeptieren Sie
                          unsere{" "}
                          <span className="underline cursor-pointer hover:text-salina-orange">
                            AGB
                          </span>
                          ,{" "}
                          <span className="underline cursor-pointer hover:text-salina-orange">
                            Datenschutzerklärung
                          </span>{" "}
                          und{" "}
                          <span className="underline cursor-pointer hover:text-salina-orange">
                            Widerrufsbelehrung
                          </span>
                          .
                        </p>
                      </div>

                      {/* Методи оплати */}
                      {!hasSalinapass && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-slate-600">
                            Zahlungsmethode
                          </h4>
                          <div className="space-y-2">
                            {/* Apple Pay */}
                            <button
                              onClick={() =>
                                alert("Weiterleitung zu Apple Pay...")
                              }
                              className="w-full flex items-center gap-3 p-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors"
                            >
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                              </svg>
                              Apple Pay
                            </button>

                            {/* Google Pay */}
                            <button
                              onClick={() =>
                                alert("Weiterleitung zu Google Pay...")
                              }
                              className="w-full flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                  fill="#4285F4"
                                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                />
                                <path
                                  fill="#34A853"
                                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                  fill="#FBBC05"
                                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                  fill="#EA4335"
                                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                              </svg>
                              Google Pay
                            </button>

                            {/* Kreditkarte (акордеон) */}
                            <details className="group border border-slate-200 rounded-xl overflow-hidden">
                              <summary className="flex items-center justify-between p-4 cursor-pointer list-none bg-white hover:bg-slate-50 transition-colors">
                                <span className="text-sm font-medium text-slate-700">
                                  💳 Kreditkarte
                                </span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                              </summary>
                              <div className="p-4 bg-slate-50 space-y-3 text-sm">
                                <input
                                  type="text"
                                  placeholder="Kartennummer"
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                  <input
                                    type="text"
                                    placeholder="MM/JJ"
                                    className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                  />
                                  <input
                                    type="text"
                                    placeholder="CVC"
                                    className="px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                  />
                                </div>
                              </div>
                            </details>

                            {/* PayPal */}
                            <button
                              onClick={() =>
                                alert("Weiterleitung zu PayPal...")
                              }
                              className="w-full flex items-center gap-3 p-3 bg-[#0070BA] text-white rounded-xl text-sm font-medium hover:bg-[#003087] transition-colors"
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                  fill="white"
                                  d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H8.19c-.524 0-.973.38-1.053.898L5.85 20.433l-.237 1.4c-.087.518-.517.904-1.04.904H7.076z"
                                />
                              </svg>
                              PayPal
                            </button>

                            {/* Klarna */}
                            <button
                              onClick={() =>
                                alert("Weiterleitung zu Klarna...")
                              }
                              className="w-full flex items-center gap-3 p-3 bg-[#FFB3C7] text-[#1A1A1A] rounded-xl text-sm font-medium hover:bg-[#FFA0B9] transition-colors"
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                  fill="#1A1A1A"
                                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM5.72 17.28h2.34v-4.5c0-1.02.78-1.8 1.8-1.8h3.78c1.02 0 1.8.78 1.8 1.8v4.5h2.34V12c0-2.28-1.86-4.14-4.14-4.14H9.86c-2.28 0-4.14 1.86-4.14 4.14v5.28z"
                                />
                              </svg>
                              Klarna (Rechnung/Ratenkauf)
                            </button>

                            {/* SEPA-Lastschrift */}
                            <details className="group border border-slate-200 rounded-xl overflow-hidden">
                              <summary className="flex items-center justify-between p-4 cursor-pointer list-none bg-white hover:bg-slate-50 transition-colors">
                                <span className="text-sm font-medium text-slate-700">
                                  🏦 SEPA-Lastschrift
                                </span>
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                              </summary>
                              <div className="p-4 bg-slate-50 space-y-3 text-sm">
                                <input
                                  type="text"
                                  placeholder="IBAN"
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                />
                                <input
                                  type="text"
                                  placeholder="Kontoinhaber"
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                />
                              </div>
                            </details>

                            {/* B2B Invoice (тільки для 10+ дітей) */}
                            {kids >= 10 && (
                              <button
                                onClick={() =>
                                  alert("Rechnung wird generiert...")
                                }
                                className="w-full flex items-center gap-3 p-3 bg-salina-orange/10 border border-salina-orange rounded-xl text-sm font-medium text-salina-dark hover:bg-salina-orange/20 transition-colors"
                              >
                                📄 Kauf auf Rechnung (B2B)
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Кнопка оплати */}
                      <button
                        onClick={() => {
                          setActiveInsight(INSIGHTS.confirmation);
                          setCurrentStep("confirmation");
                        }}
                        disabled={!firstName || !lastName || !email}
                        className={cn(
                          "w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 bg-linear-to-r from-salina-orange to-salina-pink shadow-lg hover:shadow-xl",
                          !firstName || !lastName || !email
                            ? "opacity-50 cursor-not-allowed"
                            : "",
                        )}
                      >
                        Kostenpflichtig buchen
                      </button>
                    </div>
                    {/* Модалка входу */}
                    <AnimatePresence>
                      {showLogin && (
                        <motion.div
                          key="login-modal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 overflow-hidden"
                          onClick={() => setShowLogin(false)}
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
                              Mitglieder-Login
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                  E-Mail
                                </label>
                                <input
                                  type="email"
                                  value={loginEmail}
                                  onChange={(e) =>
                                    setLoginEmail(e.target.value)
                                  }
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                  placeholder="mitglied@salina.de"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">
                                  Passwort
                                </label>
                                <input
                                  type="password"
                                  value={loginPassword}
                                  onChange={(e) =>
                                    setLoginPassword(e.target.value)
                                  }
                                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-salina-orange focus:ring-2 focus:ring-salina-orange/20 outline-none transition-all"
                                  placeholder="••••••••"
                                />
                              </div>
                              <button
                                onClick={() => {
                                  if (
                                    loginEmail === "vip@salina.de" &&
                                    loginPassword.length > 0
                                  ) {
                                    setIsLoggedIn(true);
                                    setHasSalinapass(true);
                                    setShowLogin(false);
                                    if (!firstName) setFirstName("Max");
                                    if (!lastName) setLastName("Mustermann");
                                    if (!email) setEmail(loginEmail);
                                  } else {
                                    alert(
                                      "Ungültige Anmeldedaten. Versuchen Sie vip@salina.de mit beliebigem Passwort.",
                                    );
                                  }
                                }}
                                className="w-full py-3 bg-salina-orange text-white font-bold rounded-xl hover:bg-salina-orange/90 transition-colors"
                              >
                                Anmelden
                              </button>
                              <button
                                onClick={() => setShowLogin(false)}
                                className="w-full py-2 text-sm text-slate-500 hover:text-slate-700"
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
                {currentStep === "confirmation" && (
                  <motion.div
                    key="confirmation"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col bg-white"
                  >
                    {/* Статус-бар для мобілки (5/5) */}
                    {deviceView === "mobile" && (
                      <div className="p-4 border-b border-slate-100 bg-slate-50 shrink-0">
                        <div className="flex justify-between items-center mb-3">
                          <div className="w-20" />
                          <span className="font-bold text-salina-dark text-base">
                            Buchung bestätigt
                          </span>
                          <div className="w-20" />
                        </div>
                        <div className="flex gap-2 px-1">
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                          <div className="flex-1 h-1.5 rounded-full bg-salina-orange"></div>
                        </div>
                      </div>
                    )}

                    {/* Заголовок для десктопу */}
                    {deviceView === "desktop" && (
                      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                        <div className="w-20" />
                        <div className="font-bold text-salina-dark text-lg tracking-tight">
                          Buchung bestätigt
                        </div>
                        <div className="w-20" />
                      </div>
                    )}

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-center">
                      {/* Заголовок */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                        className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"
                      >
                        <svg
                          className="w-8 h-8 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-salina-dark mb-2">
                        Vielen Dank, {firstName || "Max"}!
                      </h3>
                      <p className="text-slate-500 mb-6">
                        Ihre Zahlung war erfolgreich. Wir freuen uns auf Sie!
                      </p>

                      {/* E-Ticket */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-salina-dark text-lg">
                            La Salina
                          </h4>
                          <span className="text-xs bg-salina-orange/10 text-salina-orange px-3 py-1 rounded-full font-medium">
                            {selectedRoom.name}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-slate-500">📅 Datum:</span>
                          <span className="text-slate-700 font-medium text-right">
                            {selectedSlot || "22.06.2026"}
                          </span>
                          <span className="text-slate-500">👥 Gäste:</span>
                          <span className="text-slate-700 font-medium text-right">
                            {adults} Erw., {kids} Kinder
                            {infants > 0 ? `, ${infants} Baby` : ""}
                          </span>
                          <span className="text-slate-500">
                            🎫 Buchungs-ID:
                          </span>
                          <span className="text-salina-dark font-bold text-right">
                            #2458
                          </span>
                        </div>
                        {/* QR Code Placeholder */}
                        <div className="flex justify-center mt-4">
                          <div className="w-32 h-32 bg-slate-200 rounded-xl flex items-center justify-center">
                            <svg
                              className="w-16 h-16 text-slate-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm12-2h-2v2h-2v2h2v-2h2v-2h2v-2h-2v2zm-2 6h2v-2h-2v2zm4 0h2v-2h-2v2z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Add to Wallet */}
                      <div className="flex gap-3 justify-center mb-6 relative">
                        <button
                          onClick={() => alert("Zu Apple Wallet hinzugefügt!")}
                          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                          </svg>
                          Add to Apple Wallet
                        </button>
                        <button
                          onClick={() => alert("Zu Google Pay hinzugefügt!")}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Add to Google Pay
                        </button>
                        {/* Підказка */}
                        <div
                          className="absolute -right-2 top-0 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight(TOOLTIPS.wowEffect)
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3.5 h-3.5 text-salina-orange" />
                        </div>
                      </div>

                      {/* Доставка повідомлень */}
                      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-left text-sm space-y-2 relative">
                        <p className="font-medium text-slate-700">
                          📨 Checken Sie Ihr Smartphone!
                        </p>
                        <p className="text-slate-500">
                          Wir haben Ihnen soeben gesendet:
                        </p>
                        <p className="text-slate-500">
                          📧 PDF-Ticket & Rechnung an{" "}
                          <strong>
                            {bookForOther && otherEmail
                              ? otherEmail
                              : email || "max@beispiel.de"}
                          </strong>
                        </p>
                        <p className="text-slate-500">
                          💬 Details zu Ihrem Besuch in Ihr WhatsApp
                        </p>
                        {/* Підказка для Корнелії */}
                        <div
                          className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight(TOOLTIPS.backgroundMagic)
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3.5 h-3.5 text-salina-orange" />
                        </div>
                      </div>

                      {/* Важливі правила */}
                      <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-left text-sm space-y-2 relative">
                        <p className="font-medium text-slate-700">
                          ⚠️ Bitte beachten Sie:
                        </p>
                        <p className="text-slate-500">
                          🧦 <strong>Stoppersocken-Pflicht:</strong> Aus
                          hygienischen und Sicherheitsgründen sind rutschfeste
                          Socken für Kinder Pflicht.
                        </p>
                        <p className="text-slate-500">
                          👀 <strong>Aufsichtspflicht:</strong> Kinder dürfen
                          den Salzraum nur in Begleitung eines Erwachsenen
                          betreten.
                        </p>
                        <p className="text-slate-500">
                          ⏱ <strong>Stornierungsbedingungen:</strong> Sie können
                          Ihren Termin bis zu 24 Stunden vorher in Ihrem
                          Kundenkonto kostenlos stornieren oder verschieben.
                        </p>
                        {/* Підказка */}
                        <div
                          className="absolute -right-2 top-0 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight(TOOLTIPS.legalArmor)
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3.5 h-3.5 text-salina-orange" />
                        </div>
                      </div>

                      {/* Адреса та Карта */}
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-sm space-y-2">
                        <p className="font-medium text-slate-700">
                          📍 Adresse:
                        </p>
                        <p className="text-slate-500">
                          Musterstraße 12, 80331 München
                        </p>
                        <button
                          onClick={() => alert("Google Maps wird geöffnet...")}
                          className="text-salina-orange font-medium text-sm hover:underline"
                        >
                          🗺 Route auf Google Maps öffnen
                        </button>
                      </div>

                      {/* WhatsApp Concierge */}
                      <button
                        onClick={() =>
                          alert("WhatsApp Chat mit Manager wird geöffnet...")
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-2xl text-sm font-medium text-green-700 hover:bg-green-100 transition-colors relative"
                      >
                        💬 Auf WhatsApp dem Manager schreiben
                        <div
                          className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight(TOOLTIPS.digitalConcierge)
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3.5 h-3.5 text-salina-orange" />
                        </div>
                      </button>

                      {/* Завантаження документів */}
                      <div className="flex gap-3 justify-center text-sm relative">
                        <button
                          onClick={() =>
                            alert("E-Ticket wird heruntergeladen...")
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          📄 E-Ticket (PDF)
                        </button>
                        <button
                          onClick={() =>
                            alert("Rechnung (TSE) wird heruntergeladen...")
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          🧾 Rechnung (TSE)
                        </button>
                        {/* Підказка */}
                        <div
                          className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center cursor-help"
                          onMouseEnter={() =>
                            setHoverInsight(TOOLTIPS.tseFiscalization)
                          }
                          onMouseLeave={() => setHoverInsight(null)}
                        >
                          <Info className="w-3.5 h-3.5 text-salina-orange" />
                        </div>
                      </div>

                      {/* Кнопка назад */}
                      <button
                        onClick={() => setCurrentStep("landing")}
                        className="w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 bg-linear-to-r from-salina-orange to-salina-pink shadow-lg hover:shadow-xl mt-6"
                      >
                        Zurück zur Startseite
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {deviceView === "mobile" && (
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-salina-orange/5 to-transparent pointer-events-none z-0"></div>
            )}
          </motion.div>
        </div>

        {/* === ПРАВА ЧАСТИНА: БІЗНЕС АНАЛІТИКА === */}
        <div className="xl:col-span-5 flex flex-col gap-6 pt-4">
          <AnimatePresence mode="wait">
            {/* Оновлено rounded-[2rem] -> rounded-4xl та bg-gradient-to-b -> bg-linear-to-b */}
            <motion.div
              key={activeInsight.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-lg p-8 md:p-10 rounded-4xl border border-slate-100 shadow-[0_20px_50px_rgba(51,65,85,0.05)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-salina-orange to-salina-pink"></div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 font-medium text-sm mb-6">
                <ShieldAlert className="w-4 h-4" />
                <span>System Status</span>
              </div>
              <h3 className="text-3xl font-bold text-salina-dark mb-4 leading-tight">
                {activeInsight.title}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {activeInsight.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="sync">
            {hoverInsight && (
              <motion.div
                key={hoverInsight.title}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Оновлено rounded-[2rem] -> rounded-4xl та bg-gradient-to-b -> bg-linear-to-b */}
                <div className="bg-white/80 backdrop-blur-lg p-8 md:p-10 rounded-4xl border border-slate-100 shadow-[0_20px_50px_rgba(51,65,85,0.05)] relative mt-2 overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-salina-orange to-salina-pink"></div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 text-salina-orange font-medium text-sm mb-6">
                    <Info className="w-4 h-4" />
                    <span>Hover Insight</span>
                  </div>
                  <h3 className="text-3xl font-bold text-salina-dark mb-4 leading-tight">
                    {hoverInsight.title}
                  </h3>
                  <div className="text-lg text-slate-600 leading-relaxed">
                    {hoverInsight.text}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
