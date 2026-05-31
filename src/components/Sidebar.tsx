"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Server,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CircleUser,
  ShoppingBag,
  Store,
  Globe,
  Route,
  TrendingUp,
  UserRound,
  ShieldCheck,
  Blocks,
  CalendarCheck,
  Lightbulb,
  Gift,
  MessageCircle,
  Bot,
  ClipboardList,
  ChartColumn,
  Calculator,
  Database,
  BarChart3,
  Workflow,
  Package,
  UserCheck,
  Lock,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface MenuItem {
  name: string;
  href?: string;
  icon: LucideIcon;
  isGroup: boolean;
  subItems?: SubMenuItem[];
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Натхнення: false,
    "Технічна реалізація": false,
    Симулятори: false,
  });

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
    if (isCollapsed) setIsCollapsed(false);
  };

  const menuConfig: MenuItem[] = [
    {
      name: "Startseite",
      href: "/",
      icon: LayoutDashboard,
      isGroup: false,
    },
    {
      name: "Inspiration",
      icon: Lightbulb,
      isGroup: true,
      subItems: [
        { name: "Buchung", href: "/journey", icon: Route },
        { name: "Kundenportal", href: "/panel", icon: UserRound },
        { name: "Storno & Kulanz", href: "/return", icon: ShieldCheck },
        {
          name: "Loyalty & Shop",
          href: "/loyalty-ecommerce",
          icon: Gift,
        },
        {
          name: "AI-Bot",
          href: "/chatbot",
          icon: Bot,
        },
        {
          name: "WhatsApp",
          href: "/whatsapp",
          icon: MessageCircle,
        },
        { name: "SEO & Analytics", href: "/analytics", icon: BarChart3 },
        {
          name: "Reception",
          href: "/reception",
          icon: ClipboardList,
        },
        { name: "Warenwirtschaft", href: "/inventory", icon: Package },
        { name: "HR & Compliance", href: "/hr", icon: UserCheck },
        { name: "HQ Dashboard", href: "/boos-dashboard", icon: ChartColumn },
        { name: "Multi-Location", href: "/locations", icon: Globe },
        { name: "Franchise", href: "/fran", icon: TrendingUp },
        {
          name: "Finanzen",
          href: "/financial-accounting",
          icon: Calculator,
        },
        { name: "Booking Engine", href: "/amelia", icon: CalendarCheck },
        { name: "Automatisierung", href: "/ecosystem", icon: Workflow },
        { name: "Hardware & MDM", href: "/hardware", icon: Lock },
        {
          name: "Infrastruktur",
          href: "/digital-faundation",
          icon: Database,
        },
      ],
    },
    {
      name: "Technische Umsetzung",
      icon: Server,
      isGroup: true,
      subItems: [
        { name: "Global Tech Stack", href: "/glob", icon: Blocks },
        { name: "Test", href: "/test", icon: Globe },
      ],
    },
    {
      name: "Simulatoren",
      icon: Users,
      isGroup: true,
      subItems: [
        { name: "Kundenerlebnis", href: "/cx", icon: Users },
        { name: "Kundenkonto", href: "/dashboard", icon: CircleUser },
        { name: "Shop & Gutscheine", href: "/shop", icon: ShoppingBag },
        { name: "POS & Rezeption", href: "/pos", icon: Store },
        { name: "Franchise (HQ)", href: "/franchise", icon: Globe },
      ],
    },
    {
      name: "KI-Center",
      href: "/ai-context",
      icon: BrainCircuit,
      isGroup: false,
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen py-6 flex flex-col border-r border-slate-200/50 bg-white/40 backdrop-blur-xl transition-all duration-300 relative z-50",
        isCollapsed ? "w-24 px-3 items-center" : "w-72 px-4",
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-10 flex items-center justify-center w-7 h-7 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-salina-orange hover:border-salina-orange hover:shadow-md transition-all z-50 cursor-pointer"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div
        className={cn(
          "mb-8 transition-all w-full",
          isCollapsed ? "text-center" : "pl-4",
        )}
      >
        {isCollapsed ? (
          <h1 className="text-2xl font-bold tracking-tight text-salina-dark">
            La<span className="text-salina-orange">S</span>
          </h1>
        ) : (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-salina-dark">
              La<span className="text-salina-orange">Salina</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium truncate">
              Dokumentation als Inspiration
            </p>
          </>
        )}
      </div>

      {/* ДОДАНО: Класи для приховування системного скролбару (Tailwind Arbitrary Variants) */}
      <nav className="flex-1 w-full overflow-y-auto overflow-x-hidden pr-2 space-y-2 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        {menuConfig.map((item) => {
          if (!item.isGroup) {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href!}
                className={cn(
                  "flex items-center rounded-2xl transition-all duration-300 font-medium group relative",
                  isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
                  isActive
                    ? "bg-orange-50 text-salina-orange border border-orange-100 shadow-sm"
                    : "text-slate-500 hover:text-salina-dark hover:bg-white/60",
                )}
              >
                <Icon
                  className={cn(
                    "shrink-0 transition-transform duration-300",
                    isCollapsed ? "w-6 h-6 group-hover:scale-110" : "w-5 h-5",
                  )}
                />

                {/* ДОДАНО: min-w-0 та truncate для обрізання довгого тексту */}
                {!isCollapsed && (
                  <span className="truncate min-w-0">{item.name}</span>
                )}

                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-salina-dark text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl border border-slate-700 z-50">
                    {item.name}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-salina-dark rotate-45 border-l border-b border-slate-700"></div>
                  </div>
                )}
              </Link>
            );
          }

          const isOpen = openGroups[item.name];
          const GroupIcon = item.icon;
          const hasActiveSubItem =
            item.subItems?.some((sub) => pathname === sub.href) || false;

          return (
            <div key={item.name} className="flex flex-col space-y-1">
              <button
                onClick={() => toggleGroup(item.name)}
                className={cn(
                  "flex items-center w-full rounded-2xl transition-all duration-300 font-medium group relative",
                  isCollapsed
                    ? "justify-center p-3"
                    : "gap-3 px-4 py-3 justify-between",
                  hasActiveSubItem
                    ? "bg-orange-50 text-salina-orange border border-orange-100 shadow-sm"
                    : "text-slate-500 hover:text-salina-dark hover:bg-white/60",
                )}
              >
                {/* ДОДАНО: flex-1 та min-w-0 щоб текст міг стискатися, не виштовхуючи іконку Chevron */}
                <div
                  className={cn(
                    "flex items-center",
                    !isCollapsed && "gap-3 flex-1 min-w-0",
                  )}
                >
                  <GroupIcon
                    className={cn(
                      "shrink-0 transition-transform duration-300",
                      isCollapsed ? "w-6 h-6 group-hover:scale-110" : "w-5 h-5",
                    )}
                  />
                  {!isCollapsed && (
                    <span className="truncate text-left">{item.name}</span>
                  )}
                </div>

                {!isCollapsed && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 shrink-0 transition-transform duration-300",
                      isOpen ? "rotate-180" : "rotate-0",
                    )}
                  />
                )}

                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-salina-dark text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl border border-slate-700 z-50">
                    {item.name}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-salina-dark rotate-45 border-l border-b border-slate-700"></div>
                  </div>
                )}
              </button>

              {!isCollapsed && isOpen && (
                <div className="flex flex-col space-y-1 mt-1 pl-4 border-l-2 border-slate-100 ml-6">
                  {item.subItems?.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium",
                          isSubActive
                            ? "bg-orange-50 text-salina-orange font-semibold"
                            : "text-slate-500 hover:text-salina-dark hover:bg-slate-50",
                        )}
                      >
                        {/* ДОДАНО: shrink-0 для іконки та truncate для тексту підпункту */}
                        <subItem.icon
                          className={cn(
                            "w-4 h-4 shrink-0",
                            isSubActive
                              ? "text-salina-orange"
                              : "text-slate-400",
                          )}
                        />
                        <span className="truncate min-w-0">{subItem.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
