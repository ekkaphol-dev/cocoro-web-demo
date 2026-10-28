"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

type Unit = {
  id: string;
  tag: string;
  number: string;
  project: string;
  warrantyEnd: string;
  image: string; // ใส่ path รูป เช่น "/units/2077-9.jpg" (ว่างไว้ = แสดงพื้นที่ว่าง)
};

const units: Unit[] = [
  {
    id: "1",
    tag: "Stay",
    number: "2077/9",
    project: "COCORO APP PRODUCTION",
    warrantyEnd: "15/10/2027",
    image: "",
  },
  {
    id: "2",
    tag: "Stay",
    number: "88/12",
    project: "COCORO APP PRODUCTION",
    warrantyEnd: "01/03/2028",
    image: "",
  },
  {
    id: "3",
    tag: "Rent",
    number: "1024/5",
    project: "COCORO APP PRODUCTION",
    warrantyEnd: "20/08/2027",
    image: "",
  },
];

const menus: { label: string; icon: ReactNode; badge?: boolean }[] = [
  { label: "พัสดุ", icon: <ParcelIcon />, badge: true },
  { label: "แจ้งงานซ่อม", icon: <RepairIcon /> },
  { label: "ส่วนกลางและบริการ", icon: <FacilityIcon /> },
  { label: "บิลค่าใช้จ่าย", icon: <BillIcon /> },
  { label: "We Hear Your Voice", icon: <VoiceIcon /> },
];

// image: ใส่ path รูป (ว่างไว้ = แสดงพื้นที่ว่าง)
const announcements = [
  {
    id: "1",
    title: "แจ้งปิดให้บริการพื้นที่จุดรับ-ส่ง (Drop-off) บริเวณหน้าทางเข้าล็อบบี้ชั่วคราว",
    date: "28/10/2026",
    image: "",
  },
  {
    id: "2",
    title: "แจ้งปิดให้บริการพื้นที่จุดรับ-ส่ง (Drop-off) บริเวณหน้าทางเข้าล็อบบี้ชั่วคราว",
    date: "24/10/2026",
    image: "",
  },
];

const tabs = [
  { label: "หน้าแรก", icon: <HomeIcon /> },
  { label: "ประกาศ", icon: <NewsIcon /> },
  { label: "สิทธิพิเศษ", icon: <GiftIcon className="h-7 w-7" /> },
  { label: "แจ้งเตือน", icon: <BellIcon /> },
  { label: "ตั้งค่า", icon: <GearIcon /> },
];

export default function HomeScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["1"]));
  const [selectedUnit, setSelectedUnit] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveSlide(index);
    if (units[index]) setSelectedUnit(units[index].id);
  };

  const goTo = (index: number) => {
    const el = sliderRef.current;
    el?.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  const onSelectUnit = (id: string) => {
    setSelectedUnit(id);
    const index = units.findIndex((u) => u.id === id);
    if (index >= 0) goTo(index);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white">
      {/* Header */}
      <header className="bg-brand text-white">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 pb-16 pt-10 sm:px-6 md:gap-6 md:px-8 md:pb-20 md:pt-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80">
            <UserIcon />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-lg">สวัสดี</p>
            <p className="truncate text-xl text-pink-200">Welcome Goodsday</p>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {tabs.map((t, i) => (
              <button
                key={t.label}
                aria-label={t.label}
                title={t.label}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-base transition-colors lg:px-4 [&_svg]:h-5 [&_svg]:w-5 ${
                  i === activeTab ? "bg-white/15 font-medium" : "text-white/75 hover:bg-white/10"
                }`}
              >
                {t.icon}
                <span className="hidden lg:inline">{t.label}</span>
              </button>
            ))}
          </nav>

          <button aria-label="สิทธิพิเศษ" className="p-1 md:hidden">
            <GiftIcon className="h-8 w-8" />
          </button>
          <button aria-label="ปฏิทิน" className="p-1">
            <CalendarIcon />
          </button>
        </div>
      </header>

      <main className="-mt-8 flex-1 rounded-t-[28px] bg-white md:-mt-10 md:rounded-t-[36px]">
        <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 md:px-8 md:pb-16 md:pt-8">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-8">
            <div>
              {/* Unit selector */}
              <div className="relative">
                <select
                  value={selectedUnit}
                  onChange={(e) => onSelectUnit(e.target.value)}
                  className="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-12 text-lg text-gray-500 outline-none focus:border-brand"
                >
                  <option value="" disabled>
                    ห้องทั้งหมดที่คุณมี
                  </option>
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.number} · {u.project}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-dark" />
              </div>

              {/* Unit carousel */}
              <div
                ref={sliderRef}
                onScroll={onScroll}
                className="no-scrollbar mt-5 flex snap-x snap-mandatory overflow-x-auto rounded-xl"
              >
                {units.map((u, i) => (
                  <div key={u.id} className="w-full shrink-0 snap-center">
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-linear-to-br from-slate-300 to-slate-500">
                      {u.image && (
                        <Image
                          src={u.image}
                          alt={`${u.project} ${u.number}`}
                          fill
                          sizes="(min-width: 1024px) 700px, 100vw"
                          className="object-cover"
                          priority={i === 0}
                        />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-[#0b1440]/90 via-[#0b1440]/20 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-md bg-accent px-3 py-1 text-sm text-white sm:text-base">
                        {u.tag}
                      </span>
                      <button
                        aria-label="รายการโปรด"
                        onClick={() => toggleFavorite(u.id)}
                        className="absolute right-3 top-3"
                      >
                        <HeartIcon filled={favorites.has(u.id)} />
                      </button>
                      <div className="absolute bottom-3 left-4 right-4 text-white sm:bottom-5 sm:left-5">
                        <p className="text-3xl font-semibold leading-none sm:text-4xl md:text-5xl">
                          {u.number}
                        </p>
                        <p className="mt-1 truncate text-lg font-medium tracking-wide sm:mt-2 sm:text-xl md:text-2xl">
                          {u.project}
                        </p>
                        <p className="flex items-center gap-1 text-xs sm:text-sm md:text-base">
                          <ShieldIcon />
                          วันหมดประกัน : {u.warrantyEnd}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="mt-2 flex items-center gap-1">
                {units.map((u, i) => (
                  <button
                    key={u.id}
                    aria-label={`สไลด์ ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeSlide ? "w-6 bg-brand" : "w-2 bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Menu grid */}
            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-5 lg:mt-0 lg:grid-cols-3">
              {menus.map((m) => (
                <button
                  key={m.label}
                  className="relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-white p-2 text-center shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] active:scale-95 sm:gap-3 [&_svg]:h-10 [&_svg]:w-10 sm:[&_svg]:h-12 sm:[&_svg]:w-12"
                >
                  {m.badge && (
                    <span className="absolute right-3 top-3 h-3 w-3 rounded-full bg-accent sm:h-3.5 sm:w-3.5" />
                  )}
                  <span className="text-accent">{m.icon}</span>
                  <span className="text-sm leading-tight text-gray-800 sm:text-[15px]">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <section className="mt-8 md:mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900 md:text-2xl">ประกาศจากนิติ</h2>
              <a href="#" className="text-lg text-brand-dark underline underline-offset-4">
                ดูเพิ่มเติม
              </a>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8">
              {announcements.map((a) => (
                <li key={a.id} className="min-w-0">
                  <a href="#" className="flex gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-slate-200 to-slate-400 sm:h-28 sm:w-28">
                      {a.image && (
                        <Image src={a.image} alt={a.title} fill sizes="112px" className="object-cover" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                      <p className="truncate text-lg font-medium text-gray-800 sm:text-xl">{a.title}</p>
                      <p className="text-base text-brand-dark sm:text-lg">{a.date}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-6 h-0.5 bg-brand md:mt-10" />

          {/* Highlights */}
          <section className="mt-6">
            <h2 className="text-xl font-medium text-gray-900 md:text-2xl">ไฮไลท์</h2>
          </section>
        </div>
      </main>

      {/* Bottom navigation (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t-4 border-brand bg-white pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 md:hidden">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActiveTab(i)}
            className={`flex flex-col items-center gap-0.5 text-xs min-[380px]:text-sm ${
              i === activeTab ? "font-medium text-brand-dark" : "text-gray-500"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ---------- Icons ---------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-gray-500" fill="currentColor">
      <circle cx="12" cy="9" r="4" />
      <path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5" />
    </svg>
  );
}

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M3 13h18M8 8l2-3 2 3 2-3 2 3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M7.5 14h.01M12 14h.01M16.5 14h.01M7.5 17.5h.01M12 17.5h.01M16.5 17.5h.01" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2.5}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 drop-shadow">
      <path
        d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.5 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.5 0 6 3.5 4.5 7.2C19.5 16.4 12 21 12 21z"
        fill={filled ? "#e0325f" : "rgba(255,255,255,0.3)"}
        stroke="#fff"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2l8 3v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" stroke="#0b1440" strokeWidth={2} fill="none" />
    </svg>
  );
}

function ParcelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12" {...stroke}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 10h18M10 4v6M14 4v6" />
    </svg>
  );
}

function RepairIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12" {...stroke}>
      <path d="M4 4l6 6M3 7l4-4M14 14l6 6-2 2-6-6M15 3a4 4 0 00-1 5L4 18l2 2 10-10a4 4 0 005-1l-2-1-1-2 2-2a4 4 0 00-5-1z" />
    </svg>
  );
}

function FacilityIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12" {...stroke}>
      <path d="M3 10l9-6 9 6M5 9v11M19 9v11M9 20v-6h6v6M3 20h18M12 4v4" />
    </svg>
  );
}

function BillIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12" {...stroke}>
      <path d="M5 3l2 1.5L9 3l2 1.5L13 3l2 1.5L17 3l2 1.5V21l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L7 21l-2-1.5V3z" />
      <path d="M8.5 9h7M8.5 12.5h7M8.5 16h7" />
    </svg>
  );
}

function VoiceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12" {...stroke}>
      <path d="M3 10v4h3l7 4V6L6 10H3zM6 14l1 5h2l-1-4M17 12h4M16.5 7.5l3-2M16.5 16.5l3 2" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 3l9 8h-3v9h-4v-6h-4v6H6v-9H3l9-8z" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <rect x="5" y="3" width="16" height="18" rx="2" />
      <path d="M5 7H3v12a2 2 0 002 2M9 7h8M9 11h8M9 15h8" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <path d="M6 17V11a6 6 0 1112 0v6l1.5 2h-15L6 17zM10 21h4M12 3v2" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </svg>
  );
}
