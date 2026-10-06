/*
 * CampusConnect — Home page + College section (Navbar → Hero → About → Explore Colleges)
 * Single file. No extra components, no extra CSS file, no hardcoded college data.
 * College + course data is fetched live from the json-server API.
 */

/* -------------------------------------------------------------------- imports */
import { useEffect, useState } from "react";
import axios from "axios";

/* --------------------------------------------------------------------- api */
const API_ORIGIN = "http://localhost:5000";
const API_BASE = import.meta.env.VITE_API_URL || API_ORIGIN;

const http = axios.create({ baseURL: API_BASE, timeout: 10000 });

/* -------------------------------------------------------------------- icons */
const paths = {
  cap: "M2 9l10-5 10 5-10 5L2 9zm4 3v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  check: "M4.5 12.5l4.5 4.5L19.5 6.5",
  grid: "M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z",
  sparkle: "M12 3.5L13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  pin: "M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z",
};

function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

/* -------------------------------------------------------------------- data */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Colleges", href: "#colleges" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "12", label: "Colleges listed" },
  { value: "16", label: "Courses available" },
  { value: "60", label: "College-course options" },
  { value: "9", label: "Cities covered" },
];

const ABOUT_POINTS = [
  "College, course and fee data in one place",
  "Campus photo galleries for every college",
  "Application status with a clear timeline",
];

const COLLEGE_SORTS = [
  { value: "rating-desc", label: "Rating: high to low" },
  { value: "rating-asc", label: "Rating: low to high" },
  { value: "fee-asc", label: "Fee: low to high" },
  { value: "fee-desc", label: "Fee: high to low" },
];

/* ----------------------------------------------------------------- helpers */
const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const toList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value === undefined || value === null || value === "") return [];
  return [value];
};

const toText = (value) => {
  if (Array.isArray(value)) return value.map(toText).filter(Boolean).join(" · ");
  if (value && typeof value === "object") return value.name || value.title || "";
  return value === undefined || value === null ? "" : String(value);
};

const courseLabel = (course) => (course ? toText(course.name || course.title || course.courseName) : "");

const formatFee = (value) => {
  const num = toNumber(value);
  if (num <= 0) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
};

const resolveImage = (value) => {
  const raw = Array.isArray(value) ? value[0] : value;
  const src = typeof raw === "string" ? raw.trim() : raw && typeof raw === "object" ? raw.url || raw.src : "";
  if (!src) return "";
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  return `${API_ORIGIN}/${src.replace(/^\.?\//, "")}`;
};

const hideBrokenImage = (event) => {
  event.currentTarget.style.display = "none";
};

const collegePlace = (college) => [college.city, college.state].filter(Boolean).join(", ");

const isAutonomous = (college) => {
  const raw = college.autonomous;
  if (typeof raw === "boolean") return raw;
  const text = toText(raw).trim().toLowerCase();
  return text === "true" || text === "yes" || text === "1";
};

const autonomyLabel = (college) => (isAutonomous(college) ? "Yes" : "No");

const collegeYear = (college) => {
  const year = toNumber(college.established);
  return year > 0 ? String(year) : "—";
};

const collegeWebsite = (college) => {
  const raw = toText(college.website || college.websiteUrl || college.url).trim();
  return /^(https?:)?\/\//i.test(raw) ? (raw.startsWith("http") ? raw : `https:${raw}`) : "";
};

const courseNamesOf = (college, courseIndex) => {
  const ids = Array.isArray(college.courseIds)
    ? college.courseIds
    : college.courseIds === undefined || college.courseIds === null
      ? []
      : [college.courseIds];
  const names = ids.map((id) => courseLabel(courseIndex[String(id)])).filter(Boolean);
  return [...new Set(names)];
};

const matchesQuery = (college, courseNames, needle) => {
  const haystack = [
    college.name,
    college.city,
    college.state,
    college.type,
    college.about,
    college.autonomyNote,
    college.affiliation,
    ...courseNames,
  ]
    .map(toText)
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
};

const sortColleges = (list, sort) => {
  const copy = [...list];
  if (sort === "rating-desc") return copy.sort((a, b) => toNumber(b.rating) - toNumber(a.rating));
  if (sort === "rating-asc") return copy.sort((a, b) => toNumber(a.rating) - toNumber(b.rating));
  if (sort === "fee-asc") return copy.sort((a, b) => toNumber(a.fee) - toNumber(b.fee));
  if (sort === "fee-desc") return copy.sort((a, b) => toNumber(b.fee) - toNumber(a.fee));
  return copy;
};

/* ------------------------------------------------------------------ styles */
const STYLE = `
html { scroll-behavior: smooth; }
#root { width: 100%; max-width: none; margin: 0; text-align: left; border-inline: 0; }

.cc-root {
  --brand: #2478FC;
  --brand-dark: #1b62d8;
  --deep: #01459A;
  --navy: #061F3A;
  --blue-25: #EEF7FE;
  --muted: #64748B;
  --muted-dark: #475569;
  --border: #E2E8F0;
  --success: #12805C;
  --radius: 16px;
  --radius-lg: 22px;
  --shadow-md: 0 10px 30px rgba(6,31,58,.10);
  --shadow-lg: 0 20px 45px rgba(6,31,58,.14);
  --shadow-brand: 0 12px 28px rgba(36,120,252,.28);
  --ease: cubic-bezier(.4,0,.2,1);

  color-scheme: light only;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  color: #0F1C33;
  background: #fff;
  text-align: left;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
.cc-root *, .cc-root *::before, .cc-root *::after { box-sizing: border-box; }
.cc-root h1, .cc-root h2, .cc-root h3 { font-family: inherit; color: var(--navy); font-weight: 700; line-height: 1.25; letter-spacing: -.02em; margin: 0; }
.cc-root p { margin: 0; color: var(--muted); }
.cc-root ul { margin: 0; padding: 0; list-style: none; }
.cc-root a { color: inherit; text-decoration: none; }
.cc-root img { display: block; max-width: 100%; }
.cc-root label { cursor: pointer; }
.cc-root [id] { scroll-margin-top: 84px; }

.cc-wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.cc-section { padding: 84px 0; }

.cc-eyebrow {
  display: inline-block; font-size: .78rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
  color: var(--brand); background: var(--blue-25); border: 1px solid #d5e6fb; padding: 6px 14px; border-radius: 999px; margin-bottom: 14px;
}

/* buttons */
.cc-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid transparent; border-radius: 999px;
  padding: 12px 24px; font-size: .95rem; font-weight: 700; cursor: pointer; white-space: nowrap;
  transition: transform .2s var(--ease), box-shadow .2s var(--ease), background .2s var(--ease), color .2s var(--ease);
}
.cc-btn:hover { transform: translateY(-2px); }
.cc-btn-primary { background: var(--brand); color: #fff; box-shadow: var(--shadow-brand); }
.cc-btn-primary:hover { background: var(--brand-dark); }
.cc-btn-ghost { background: #fff; color: var(--navy); border-color: var(--border); }
.cc-btn-ghost:hover { border-color: var(--brand); color: var(--brand); }
.cc-btn-outline { background: transparent; color: var(--brand); border-color: #bcd8fb; }
.cc-btn-outline:hover { background: var(--blue-25); }
.cc-btn-sm { padding: 9px 18px; font-size: .88rem; }
.cc-btn-lg { padding: 14px 30px; font-size: 1rem; }
.cc-btn-block { display: flex; width: 100%; }

/* navbar */
.cc-nav { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,.92); backdrop-filter: blur(14px); border-bottom: 1px solid var(--border); }
.cc-nav-toggle { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
.cc-nav-inner { display: flex; align-items: center; gap: 20px; height: 76px; }
.cc-logo { display: flex; align-items: center; gap: 11px; }
.cc-logo-mark { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 13px; background: linear-gradient(135deg, var(--brand), var(--deep)); color: #fff; flex-shrink: 0; }
.cc-logo-text { display: flex; flex-direction: column; line-height: 1.2; }
.cc-logo-text strong { font-size: 1.08rem; color: var(--navy); font-weight: 800; }
.cc-logo-text small { font-size: .68rem; color: var(--muted); }
.cc-menu { display: flex; align-items: center; gap: 2px; margin-left: auto; }
.cc-menu a { padding: 9px 15px; border-radius: 999px; font-size: .95rem; font-weight: 600; color: var(--muted-dark); transition: background .2s var(--ease), color .2s var(--ease); }
.cc-menu a:hover, .cc-menu a.is-active { color: var(--brand); background: var(--blue-25); }
.cc-nav-actions { display: flex; align-items: center; gap: 10px; }
.cc-icon-btn { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; border: 1px solid var(--border); background: #fff; color: var(--navy); }
.cc-icon-btn:hover { border-color: var(--brand); color: var(--brand); }
.cc-burger { display: none; }
.cc-icon-close { display: none; }
.cc-mobile { display: none; flex-direction: column; padding: 8px 24px 26px; border-top: 1px solid var(--border); background: #fff; }
.cc-mobile a { padding: 13px 4px; font-weight: 600; color: var(--navy); }
.cc-mobile .cc-btn { margin-top: 14px; }

/* hero */
.cc-hero { position: relative; background: linear-gradient(160deg, #f4f9ff 0%, #e9f2fe 46%, #fff 100%); padding: 76px 0 0; overflow: hidden; }
.cc-hero-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 48px; align-items: center; padding-bottom: 68px; }
.cc-pill { display: inline-flex; align-items: center; gap: 7px; padding: 7px 15px; border-radius: 999px; background: #fff; border: 1px solid #d5e6fb; color: var(--deep); font-size: .8rem; font-weight: 700; }
.cc-hero h1 { font-size: clamp(2.1rem, 4.6vw, 3.3rem); margin-top: 20px; }
.cc-hero h1 em { font-style: normal; color: var(--brand); }
.cc-hero-text { margin-top: 18px; font-size: 1.06rem; color: var(--muted-dark); max-width: 52ch; }
.cc-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.cc-points { display: flex; flex-wrap: wrap; gap: 10px 24px; margin-top: 26px; font-size: .9rem; color: var(--muted-dark); }
.cc-points li { display: flex; align-items: center; gap: 7px; }
.cc-points svg { color: var(--success); }
.cc-hero-visual { position: relative; }
.cc-hero-img { height: 430px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); background: linear-gradient(135deg, #0b3a6f, #2f7de1); }
.cc-hero-img img { width: 100%; height: 100%; object-fit: cover; }
.cc-float { position: absolute; display: flex; align-items: center; gap: 11px; padding: 12px 16px; border-radius: var(--radius); background: #fff; border: 1px solid var(--border); box-shadow: var(--shadow-md); animation: ccFloat 5.5s ease-in-out infinite; }
.cc-float strong { display: block; font-size: 1.1rem; color: var(--navy); line-height: 1.2; }
.cc-float small { font-size: .74rem; color: var(--muted); }
.cc-float-b { bottom: 56px; right: -16px; animation-delay: 1.2s; }
.cc-float-c { bottom: -20px; left: 30px; animation-delay: 2.4s; }
@keyframes ccFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
.cc-icon-circle { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 13px; background: var(--blue-25); color: var(--brand); flex-shrink: 0; }
.cc-strip { background: var(--navy); padding: 30px 0 24px; }
.cc-strip-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 20px; text-align: center; }
.cc-strip-grid strong { display: block; font-size: 2rem; color: #fff; line-height: 1.1; }
.cc-strip-grid span { font-size: .85rem; color: #9DB8D4; }
.cc-strip-note { text-align: center; margin-top: 18px; font-size: .78rem; color: #7F9BB8 !important; }

/* about */
.cc-about { display: grid; grid-template-columns: 1.05fr .95fr; gap: 56px; align-items: center; }
.cc-about h2 { font-size: clamp(1.5rem, 2.6vw, 2rem); }
.cc-about-text { margin-top: 16px; font-size: 1.02rem; color: var(--muted-dark); max-width: 60ch; }
.cc-about-list { display: grid; gap: 12px; margin-top: 24px; }
.cc-about-list li { display: flex; align-items: center; gap: 10px; font-size: .95rem; color: var(--navy); font-weight: 500; }
.cc-about-list svg { color: var(--success); flex-shrink: 0; }
.cc-about-img { height: 380px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); background: linear-gradient(135deg, #0b3a6f, #2f7de1); }
.cc-about-img img { width: 100%; height: 100%; object-fit: cover; }

/* colleges */
.cc-colleges { background: linear-gradient(180deg, #fff 0%, #f7fbff 100%); border-top: 1px solid var(--border); }
.cc-col-head { max-width: 660px; margin-bottom: 30px; }
.cc-col-head h2 { font-size: clamp(1.6rem, 2.8vw, 2.1rem); }
.cc-col-head p { margin-top: 12px; font-size: 1.02rem; color: var(--muted-dark); }

.cc-tools { display: grid; grid-template-columns: 1.7fr 1fr 1fr 1.2fr; gap: 12px; }
.cc-field { position: relative; display: flex; align-items: center; }
.cc-field > svg { position: absolute; left: 15px; color: var(--muted); pointer-events: none; }
.cc-input, .cc-select {
  width: 100%; height: 48px; border: 1px solid var(--border); border-radius: 999px; background: #fff;
  font: inherit; font-size: .92rem; font-weight: 500; color: var(--navy);
  transition: border-color .2s var(--ease), box-shadow .2s var(--ease);
}
.cc-input { padding: 0 18px; }
.cc-input::placeholder { color: #94A3B8; }
.cc-field > svg + .cc-input { padding-left: 44px; }
.cc-select { appearance: none; -webkit-appearance: none; padding: 0 42px 0 18px; cursor: pointer; }
.cc-select-wrap { position: relative; }
.cc-select-wrap::after {
  content: ""; position: absolute; right: 19px; top: 50%; width: 8px; height: 8px;
  border-right: 2px solid var(--muted); border-bottom: 2px solid var(--muted);
  transform: translateY(-70%) rotate(45deg); pointer-events: none;
}
.cc-input:focus, .cc-select:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 4px rgba(36,120,252,.14); }

.cc-meta-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin: 22px 0 18px; }
.cc-count { font-size: .9rem; font-weight: 700; color: var(--muted-dark); }
.cc-link-btn { background: none; border: 0; padding: 0; font: inherit; font-size: .9rem; font-weight: 700; color: var(--brand); cursor: pointer; }
.cc-link-btn:hover { text-decoration: underline; }

.cc-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.cc-card {
  display: flex; flex-direction: column; background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg);
  overflow: hidden; box-shadow: var(--shadow-md);
  transition: transform .25s var(--ease), box-shadow .25s var(--ease), border-color .25s var(--ease);
}
.cc-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: #d5e6fb; }
.cc-card-media { position: relative; height: 190px; background: linear-gradient(135deg, #0b3a6f, #2f7de1); }
.cc-card-media img { width: 100%; height: 100%; object-fit: cover; }
.cc-card-type { position: absolute; top: 14px; left: 14px; padding: 6px 12px; border-radius: 999px; background: rgba(6,31,58,.78); color: #fff; font-size: .74rem; font-weight: 700; }
.cc-card-rating { position: absolute; right: 14px; bottom: 14px; display: inline-flex; align-items: center; gap: 6px; padding: 6px 13px; border-radius: 999px; background: #fff; color: var(--navy); font-size: .82rem; font-weight: 800; box-shadow: var(--shadow-md); }
.cc-card-rating svg { color: #f59e0b; }
.cc-card-body { display: flex; flex-direction: column; gap: 12px; padding: 20px; flex: 1; }
.cc-card-title { font-size: 1.1rem; }
.cc-card-loc { display: flex; align-items: center; gap: 8px; font-size: .88rem; color: var(--muted-dark); }
.cc-card-loc svg { color: var(--brand); flex-shrink: 0; }
.cc-card-fact { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: .88rem; }
.cc-card-fact span { color: var(--muted); }
.cc-card-fact strong { color: var(--navy); font-weight: 700; }
.cc-card-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
.cc-tag { padding: 6px 12px; border-radius: 999px; background: var(--blue-25); border: 1px solid #d5e6fb; color: var(--deep); font-size: .78rem; font-weight: 600; }
.cc-card-foot { padding: 18px 20px 20px; }

.cc-state { display: grid; place-items: center; gap: 12px; padding: 58px 24px; text-align: center; border: 1px dashed var(--border); border-radius: var(--radius-lg); background: #fff; }
.cc-state strong { display: block; color: var(--navy); font-size: 1.05rem; }
.cc-state svg { color: var(--brand); }
.cc-spinner { width: 30px; height: 30px; border-radius: 50%; border: 3px solid #dbeafe; border-top-color: var(--brand); animation: ccSpin .8s linear infinite; }
@keyframes ccSpin { to { transform: rotate(360deg); } }

.cc-modal-backdrop { position: fixed; inset: 0; z-index: 120; display: grid; place-items: center; padding: 24px; background: rgba(6,31,58,.58); }
.cc-modal { position: relative; width: min(620px, 100%); max-height: 88vh; overflow: auto; background: #fff; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); animation: ccPop .22s var(--ease); }
@keyframes ccPop { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.cc-modal-close { position: absolute; top: 14px; right: 14px; z-index: 2; display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--border); background: #fff; color: var(--navy); cursor: pointer; }
.cc-modal-close:hover { color: var(--brand); border-color: var(--brand); }
.cc-modal-hero { height: 220px; background: linear-gradient(135deg, #0b3a6f, #2f7de1); }
.cc-modal-hero img { width: 100%; height: 100%; object-fit: cover; }
.cc-modal-body { display: grid; gap: 16px; padding: 24px; }
.cc-modal-body h3 { font-size: 1.3rem; padding-right: 44px; }
.cc-modal-place { display: flex; align-items: center; gap: 8px; font-size: .9rem; color: var(--muted-dark); }
.cc-modal-place svg { color: var(--brand); }
.cc-modal-facts { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
.cc-modal-fact { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 11px 14px; border: 1px solid var(--border); border-radius: 14px; font-size: .86rem; }
.cc-modal-fact span { color: var(--muted); }
.cc-modal-fact strong { color: var(--navy); }
.cc-modal-block h4 { margin: 0 0 7px; font-size: .76rem; letter-spacing: .09em; text-transform: uppercase; color: var(--muted); font-weight: 700; }
.cc-modal-block p { font-size: .95rem; color: var(--muted-dark); }

/* responsive */
@media (max-width: 1024px) {
  .cc-menu { display: none; }
  .cc-nav-actions { margin-left: auto; }
  .cc-burger { display: grid; }
  .cc-nav-toggle:checked ~ .cc-nav-inner .cc-icon-burger { display: none; }
  .cc-nav-toggle:checked ~ .cc-nav-inner .cc-icon-close { display: block; }
  .cc-nav-toggle:checked ~ .cc-mobile { display: flex; }
  .cc-hero-grid, .cc-about { grid-template-columns: 1fr; }
  .cc-hero-img { height: 340px; }
  .cc-float-b { right: 0; }
  .cc-tools { grid-template-columns: 1fr 1fr; }
  .cc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 680px) {
  .cc-root { font-size: 15px; }
  .cc-wrap { padding: 0 18px; }
  .cc-section { padding: 58px 0; }
  .cc-hero { padding-top: 52px; }
  .cc-strip-grid { grid-template-columns: 1fr 1fr; }
  .cc-hero-actions .cc-btn { width: 100%; }
  .cc-about-img { height: 280px; }
  .cc-nav-actions .cc-btn-outline { display: none; }
  .cc-tools { grid-template-columns: 1fr; }
  .cc-grid { grid-template-columns: 1fr; }
  .cc-modal-facts { grid-template-columns: 1fr; }
  .cc-modal-hero { height: 170px; }
}
`;

/* --------------------------------------------------------------------- page */
export default function StudentDashboard() {
  /* ------------------------------------------------------- college section */
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("rating-desc");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const [collegeRes, courseRes] = await Promise.all([
          http.get("/colleges"),
          http.get("/courses").catch(() => ({ data: [] })),
        ]);
        if (!active) return;
        setColleges(Array.isArray(collegeRes.data) ? collegeRes.data : []);
        setCourses(Array.isArray(courseRes.data) ? courseRes.data : []);
      } catch {
        if (!active) return;
        setColleges([]);
        setError("Unable to load colleges.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [reload]);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const courseIndex = {};
  courses.forEach((course) => {
    if (course && course.id !== undefined) courseIndex[String(course.id)] = course;
  });

  const cityOptions = [...new Set(colleges.map((college) => college.city).filter(Boolean))].sort();
  const typeOptions = [...new Set(colleges.map((college) => college.type).filter(Boolean))].sort();

  const needle = search.trim().toLowerCase();
  const visibleColleges = sortColleges(
    colleges.filter((college) => {
      if (city && college.city !== city) return false;
      if (type && college.type !== type) return false;
      if (!needle) return true;
      return matchesQuery(college, courseNamesOf(college, courseIndex), needle);
    }),
    sort,
  );

  const statCards = [
    { value: loading ? STATS[0].value : String(colleges.length), label: "Colleges listed" },
    { value: loading ? STATS[1].value : String(courses.length), label: "Courses available" },
    {
      value: loading
        ? STATS[2].value
        : String(colleges.reduce((total, college) => total + toList(college.courseIds).length, 0)),
      label: "College-course options",
    },
    {
      value: loading ? STATS[3].value : String(new Set(colleges.map((college) => college.city)).size),
      label: "Cities covered",
    },
  ];

  const filtersActive = Boolean(search || city || type);
  const clearFilters = () => {
    setSearch("");
    setCity("");
    setType("");
  };
  const retry = () => setReload((value) => value + 1);

  const selectedCourses = selected ? courseNamesOf(selected, courseIndex) : [];
  const selectedFacilities = selected ? toList(selected.facilities) : [];

  return (
    <>
      <style>{STYLE}</style>

      <div className="cc-root" id="home">
        {/* NAVBAR: Home | About | Colleges | Courses | Contact | Search | Login | Register */}
        <header className="cc-nav">
          <input type="checkbox" id="cc-nav-toggle" className="cc-nav-toggle" />

          <div className="cc-wrap cc-nav-inner">
            <a href="#home" className="cc-logo">
              <span className="cc-logo-mark">
                <Icon name="cap" size={24} />
              </span>
              <span className="cc-logo-text">
                <strong>Student College</strong>
                <small>Student-College Admission Platform</small>
              </span>
            </a>

            <nav className="cc-menu">
              {NAV.map((item) => (
                <a key={item.label} href={item.href} className={item.label === "Home" ? "is-active" : ""}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="cc-nav-actions">
              <a href="#colleges" className="cc-icon-btn" aria-label="Search colleges">
                <Icon name="search" size={18} />
              </a>
              <a href="/login" className="cc-btn cc-btn-outline cc-btn-sm">Login</a>
              <a href="/register" className="cc-btn cc-btn-primary cc-btn-sm">Register</a>
              <label htmlFor="cc-nav-toggle" className="cc-icon-btn cc-burger" aria-label="Toggle menu">
                <span className="cc-icon-burger"><Icon name="menu" size={20} /></span>
                <span className="cc-icon-close"><Icon name="close" size={20} /></span>
              </label>
            </div>
          </div>

          <nav className="cc-mobile">
            {NAV.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
            <a href="/login" className="cc-btn cc-btn-outline cc-btn-block">Login</a>
            <a href="/register" className="cc-btn cc-btn-primary cc-btn-block">Register</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="cc-hero">
          <div className="cc-wrap cc-hero-grid">
            <div>
              <span className="cc-pill">
                <Icon name="sparkle" size={15} /> Admissions open
              </span>

              <h1>
                Find the Right College for <em>Your Future</em>
              </h1>

              <p className="cc-hero-text">
                Explore colleges, discover courses, compare fees and eligibility, and submit your
                applications from a single platform built for students.
              </p>

              <div className="cc-hero-actions">
                <a href="#colleges" className="cc-btn cc-btn-primary cc-btn-lg">
                  Explore Colleges <Icon name="arrow" size={18} />
                </a>
                <a href="#courses" className="cc-btn cc-btn-ghost cc-btn-lg">Explore Courses</a>
              </div>

              <ul className="cc-points">
                <li><Icon name="check" size={16} /> Compare courses, fees and eligibility</li>
                <li><Icon name="check" size={16} /> Apply online and track status</li>
              </ul>
            </div>

            <div className="cc-hero-visual">
              <div className="cc-hero-img">
                <img
                  src="/src/assets/home student.png"
                  alt="Students on a college campus"
                />
              </div>

              <div className="cc-float cc-float-b">
                <span className="cc-icon-circle"><Icon name="grid" size={22} /></span>
                <div>
                  <strong>{STATS[1].value}+</strong>
                  <small>Courses (demo)</small>
                </div>
              </div>

              <div className="cc-float cc-float-c">
                <span className="cc-icon-circle"><Icon name="check" size={22} /></span>
                <div>
                  <strong>Easy</strong>
                  <small>Applications</small>
                </div>
              </div>
            </div>
          </div>

          <div className="cc-strip">
            <div className="cc-wrap cc-strip-grid">
              {statCards.map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="cc-section" id="about">
          <div className="cc-wrap cc-about">
            <div>
              <span className="cc-eyebrow">About us</span>
              <h2>Built for students planning their next step</h2>
              <p className="cc-about-text">
                CampusConnect is a Student-College Admission Platform. Students can explore colleges,
                compare courses, check eligibility and fees, and submit applications without
                repeating the same information for every college.
              </p>
              <p className="cc-about-text">
                College information is maintained in a single database, so course lists, fees,
                facilities and campus photos stay consistent across the whole site.
              </p>

              <ul className="cc-about-list">
                {ABOUT_POINTS.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={18} /> {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cc-about-img">
              <img
                src="/src/assets/about student.jpg"
                alt="College campus"
              />
            </div>
          </div>
        </section>

        {/* COLLEGES (data from http://localhost:5000) */}
        <section className="cc-section cc-colleges" id="colleges">
          <div className="cc-wrap">
            <div className="cc-col-head">
              <span className="cc-eyebrow">College directory</span>
              <h2>Explore Colleges</h2>
              <p>
                 Find Your Perfect College

Explore a wide range of colleges and discover the right place to build your future. Search and compare colleges based on location, college type, courses, fees, ratings, and other important details.

Whether you are looking for a college near you or exploring new opportunities, our college directory makes it easier to find the information you need. View college details, explore available courses, check eligibility, and learn about facilities before making your decision.


              </p>
            </div>

            <div className="cc-tools">
              <div className="cc-field">
                <Icon name="search" size={18} />
                <input
                  className="cc-input"
                  type="search"
                  aria-label="Search colleges"
                  placeholder="Search by college, city or course"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="cc-select-wrap">
                <select
                  className="cc-select"
                  aria-label="Filter by city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                >
                  <option value="">All cities</option>
                  {cityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="cc-select-wrap">
                <select
                  className="cc-select"
                  aria-label="Filter by college type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="">All college types</option>
                  {typeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="cc-select-wrap">
                <select
                  className="cc-select"
                  aria-label="Sort colleges"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  {COLLEGE_SORTS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {!loading && !error ? (
              <div className="cc-meta-row">
                <span className="cc-count">
                  Showing {visibleColleges.length} of {colleges.length} colleges
                </span>
                {filtersActive ? (
                  <button type="button" className="cc-link-btn" onClick={clearFilters}>
                    Clear filters
                  </button>
                ) : null}
              </div>
            ) : null}

            {loading ? (
              <div className="cc-state">
                <span className="cc-spinner" aria-hidden="true" />
                <strong>Loading colleges...</strong>
              </div>
            ) : error ? (
              <div className="cc-state">
                <Icon name="close" size={26} />
                <strong>{error}</strong>
                <button type="button" className="cc-btn cc-btn-primary cc-btn-sm" onClick={retry}>
                  Try again
                </button>
              </div>
            ) : visibleColleges.length === 0 ? (
              <div className="cc-state">
                <Icon name="search" size={26} />
                <strong>No colleges found.</strong>
                {filtersActive ? (
                  <button type="button" className="cc-link-btn" onClick={clearFilters}>
                    Clear filters
                  </button>
                ) : null}
              </div>
            ) : (
              <div className="cc-grid">
                {visibleColleges.map((college) => {
                  const names = courseNamesOf(college, courseIndex);
                  const place = collegePlace(college);
                  const image = resolveImage(college.image);
                  const rating = toNumber(college.rating);

                  return (
                    <article className="cc-card" key={college.id}>
                      <div className="cc-card-media">
                        {image ? (
                          <img src={image} alt={`${toText(college.name)} campus`} loading="lazy" onError={hideBrokenImage} />
                        ) : null}
                        <span className="cc-card-type">{toText(college.type) || "College"}</span>
                        {rating > 0 ? (
                          <span className="cc-card-rating">
                            <Icon name="star" size={14} /> {rating.toFixed(1)}
                          </span>
                        ) : null}
                      </div>

                      <div className="cc-card-body">
                        <h3 className="cc-card-title">{toText(college.name)}</h3>

                        {place ? (
                          <p className="cc-card-loc">
                            <Icon name="pin" size={15} /> {place}
                          </p>
                        ) : null}

                        <p className="cc-card-fact">
                          <span>Starting fee</span>
                          <strong>{formatFee(college.fee)}</strong>
                        </p>

                        <div className="cc-card-tags">
                          {names.length === 0 ? (
                            <span className="cc-tag">Courses on request</span>
                          ) : (
                            names.slice(0, 2).map((name, index) => (
                              <span className="cc-tag" key={`${name}-${index}`}>{name}</span>
                            ))
                          )}
                          {names.length > 2 ? (
                            <span className="cc-tag">+{names.length - 2} more</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="cc-card-foot">
                        <button
                          type="button"
                          className="cc-btn cc-btn-primary cc-btn-block"
                          onClick={() => setSelected(college)}
                        >
                          View Details <Icon name="arrow" size={16} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* COLLEGE DETAILS (same file, no new route/component) */}
        {selected ? (
          <div
            className="cc-modal-backdrop"
            role="presentation"
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <div className="cc-modal" role="dialog" aria-modal="true" aria-label={`${toText(selected.name)} details`}>
              <button
                type="button"
                className="cc-modal-close"
                aria-label="Close college details"
                onClick={() => setSelected(null)}
              >
                <Icon name="close" size={18} />
              </button>

              {resolveImage(selected.image) ? (
                <div className="cc-modal-hero">
                  <img src={resolveImage(selected.image)} alt={`${toText(selected.name)} campus`} onError={hideBrokenImage} />
                </div>
              ) : null}

              <div className="cc-modal-body">
                <h3>{toText(selected.name)}</h3>

                {collegePlace(selected) ? (
                  <p className="cc-modal-place">
                    <Icon name="pin" size={16} /> {collegePlace(selected)}
                  </p>
                ) : null}

                <div className="cc-modal-facts">
                  <p className="cc-modal-fact">
                    <span>College type</span>
                    <strong>{toText(selected.type) || "—"}</strong>
                  </p>
                  <p className="cc-modal-fact">
                    <span>Autonomous</span>
                    <strong>{autonomyLabel(selected)}</strong>
                  </p>
                  <p className="cc-modal-fact">
                    <span>Established</span>
                    <strong>{collegeYear(selected)}</strong>
                  </p>
                  <p className="cc-modal-fact">
                    <span>Affiliation</span>
                    <strong>{toText(selected.affiliation) || "—"}</strong>
                  </p>
                  <p className="cc-modal-fact">
                    <span>Rating</span>
                    <strong>{toNumber(selected.rating) > 0 ? toNumber(selected.rating).toFixed(1) : "—"}</strong>
                  </p>
                  <p className="cc-modal-fact">
                    <span>Starting fee</span>
                    <strong>{formatFee(selected.fee)}</strong>
                  </p>
                  <p className="cc-modal-fact">
                    <span>Eligibility</span>
                    <strong>{toText(selected.eligibility) || "—"}</strong>
                  </p>
                </div>

                {toText(selected.autonomyNote) ? (
                  <div className="cc-modal-block">
                    <h4>Autonomy status</h4>
                    <p>{toText(selected.autonomyNote)}</p>
                  </div>
                ) : null}

                {toText(selected.about) ? (
                  <div className="cc-modal-block">
                    <h4>About</h4>
                    <p>{toText(selected.about)}</p>
                  </div>
                ) : null}

                {selectedCourses.length ? (
                  <div className="cc-modal-block">
                    <h4>Courses available</h4>
                    <div className="cc-card-tags">
                      {selectedCourses.map((name, index) => (
                        <span className="cc-tag" key={`${name}-${index}`}>{name}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedFacilities.length ? (
                  <div className="cc-modal-block">
                    <h4>Facilities</h4>
                    <div className="cc-card-tags">
                      {selectedFacilities.map((facility, index) => (
                        <span className="cc-tag" key={`${toText(facility)}-${index}`}>{toText(facility)}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {collegeWebsite(selected) ? (
                  <a
                    className="cc-btn cc-btn-ghost cc-btn-block"
                    href={collegeWebsite(selected)}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Visit official website <Icon name="arrow" size={16} />
                  </a>
                ) : null}

                <button type="button" className="cc-btn cc-btn-primary cc-btn-block" onClick={() => setSelected(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}