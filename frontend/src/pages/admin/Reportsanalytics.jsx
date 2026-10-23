import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

/* =====================================================================
   REPORTS & ANALYTICS  -  single file (JSX + CSS)
   Usage:  import ReportsAnalytics from "./ReportsAnalytics";
           <ReportsAnalytics />
   No external libraries needed.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. DATA
   --------------------------------------------------------------------- */
const MENU = [
  { label: "Dashboard", icon: "⌂", path: "/admin/dashboard" },
  { label: "Students", icon: "♙", path: "/admin/students" },
  { label: "Colleges", icon: "▥", path: "/admin/colleges" },
  { label: "Courses", icon: "▱", path: "/admin/courses" },
  { label: "Applications", icon: "✉", path: "/admin/applications" },
  { label: "Transactions", icon: "₹", path: "/admin/transactions" },
  { label: "Reports", icon: "◑", path: "/admin/reports" },
  { label: "Users", icon: "♧", path: "/admin/users" },
  { label: "Settings", icon: "⚙", path: "/admin/settings" },
];

const STATS = [
  { label: "Total Leads", value: 2480, trend: 12, icon: "👥", tone: "violet" },
  {
    label: "Purchased Profiles",
    value: 612,
    trend: 18,
    icon: "⛛",
    tone: "green",
  },
  {
    label: "Conversion Rate",
    value: 24.7,
    trend: 6.3,
    icon: "%",
    tone: "blue",
    suffix: "%",
    decimals: 1,
  },
  {
    label: "Total Revenue",
    value: 61200,
    trend: 22,
    icon: "₹",
    tone: "orange",
    prefix: "₹",
  },
  {
    label: "Active Colleges",
    value: 128,
    trend: 8,
    icon: "🏛",
    tone: "indigo",
  },
  {
    label: "Total Transactions",
    value: 642,
    trend: 16,
    icon: "▤",
    tone: "teal",
  },
];

const FUNNEL = [
  {
    label: "Total Leads",
    value: 2480,
    pct: "100%",
    width: 100,
    color: "violet",
  },
  { label: "Interested", value: 1892, pct: "76.4%", width: 84, color: "blue" },
  {
    label: "Profile Viewed",
    value: 1246,
    pct: "50.2%",
    width: 68,
    color: "green",
  },
  { label: "Purchased", value: 612, pct: "24.7%", width: 52, color: "orange" },
];

/* Lead Drop-off Analysis: worked out from the funnel stages above */
const DROP_COLORS = ["#6c5ce7", "#2d8cff", "#ffb02e"];
const DROPOFF = FUNNEL.slice(1).map((f, i) => {
  const prev = FUNNEL[i];
  const lost = prev.value - f.value;
  return {
    from: prev.label,
    to: f.label,
    lost,
    pct: Math.round((lost / prev.value) * 1000) / 10,
    color: DROP_COLORS[i % DROP_COLORS.length],
  };
});
const DROP_WORST = DROPOFF.reduce((a, b) => (b.pct > a.pct ? b : a));

const REVENUE = [
  {
    title: "Profile Purchase Revenue",
    sub: "From college profile purchases",
    amount: "₹48,600",
    pct: "74.9%",
    tone: "green",
    icon: "▣",
  },
  {
    title: "Successful Payments",
    sub: "Completed transactions",
    amount: "₹12,840",
    pct: "19.8%",
    tone: "blue",
    icon: "✔",
  },
  {
    title: "Failed Payments",
    sub: "Failed transactions",
    amount: "₹1,320",
    pct: "2.0%",
    tone: "red",
    icon: "✕",
  },
  {
    title: "Refunds",
    sub: "Refunded amount",
    amount: "₹450",
    pct: "0.7%",
    tone: "violet",
    icon: "↻",
  },
];

const LEAD_STATUS = [
  { label: "New", value: 32, color: "#6c5ce7" },
  { label: "Contacted", value: 27, color: "#2d8cff" },
  { label: "Interested", value: 24, color: "#14b88a" },
  { label: "Purchased", value: 17, color: "#ffb02e" },
];

const COLLEGES = [
  {
    name: "Sri Ram Engineering College",
    district: "Coimbatore",
    profiles: 86,
    conv: "42.5%",
  },
  {
    name: "KG College of Arts & Science",
    district: "Coimbatore",
    profiles: 64,
    conv: "35.7%",
  },
  {
    name: "PSG College of Technology",
    district: "Coimbatore",
    profiles: 48,
    conv: "28.9%",
  },
  {
    name: "RVS College of Engineering",
    district: "Coimbatore",
    profiles: 42,
    conv: "25.4%",
  },
  {
    name: "Government Arts College",
    district: "Tiruchirappalli",
    profiles: 36,
    conv: "22.1%",
  },
];

const COURSE_DEMAND = [
  { name: "B.Tech Computer Science", value: 28, color: "#6c5ce7" },
  { name: "B.Tech Information Technology", value: 18, color: "#2d8cff" },
  { name: "BCA", value: 14, color: "#14b88a" },
  { name: "B.Sc Computer Science", value: 11, color: "#ff5c5c" },
  { name: "B.Tech AI & Data Science", value: 9, color: "#ff6fb1" },
  { name: "B.Tech ECE", value: 7, color: "#a08cf5" },
  { name: "B.Sc IT", value: 5, color: "#4aa8ff" },
];

/* bubble layouts: card = small chart (viewBox 200 x 190), big = modal chart (viewBox 260 x 240) */
const DISTRICTS = [
  {
    name: "Coimbatore",
    short: "Coimbatore",
    pct: 28,
    leads: 694,
    growth: "+14%",
    card: { x: 62, y: 66 },
    big: { x: 60, y: 62 },
  },
  {
    name: "Chennai",
    short: "Chennai",
    pct: 22,
    leads: 546,
    growth: "+11%",
    card: { x: 142, y: 58 },
    big: { x: 130, y: 58 },
  },
  {
    name: "Tiruchirappalli",
    short: "Trichy",
    pct: 18,
    leads: 446,
    growth: "+9%",
    card: { x: 50, y: 142 },
    big: { x: 196, y: 66 },
  },
  {
    name: "Madurai",
    short: "Madurai",
    pct: 16,
    leads: 397,
    growth: "+7%",
    card: { x: 112, y: 138 },
    big: { x: 50, y: 136 },
  },
  {
    name: "Salem",
    short: "Salem",
    pct: 12,
    leads: 297,
    growth: "+5%",
    card: { x: 168, y: 134 },
    big: { x: 108, y: 128 },
  },
  {
    name: "Erode",
    short: "Erode",
    pct: 9,
    leads: 223,
    growth: "+4%",
    big: { x: 160, y: 130 },
  },
  {
    name: "Tirunelveli",
    short: "Tirunelveli",
    pct: 7,
    leads: 173,
    growth: "+3%",
    big: { x: 214, y: 136 },
  },
  {
    name: "Vellore",
    short: "Vellore",
    pct: 6,
    leads: 149,
    growth: "+3%",
    big: { x: 70, y: 200 },
  },
  {
    name: "Thanjavur",
    short: "Thanjavur",
    pct: 5,
    leads: 124,
    growth: "+2%",
    big: { x: 130, y: 196 },
  },
  {
    name: "Tiruppur",
    short: "Tiruppur",
    pct: 4,
    leads: 99,
    growth: "+2%",
    big: { x: 190, y: 200 },
  },
];

const BUBBLE_COLORS = [
  "#6c5ce7",
  "#2d8cff",
  "#14b88a",
  "#ff9f43",
  "#ff6fb1",
  "#a08cf5",
  "#4aa8ff",
  "#25d3a2",
  "#ffb02e",
  "#ff5c5c",
];

const TXN_HEALTH = [
  { label: "Successful", value: 84, color: "#14b88a" },
  { label: "Failed", value: 11, color: "#ff5c5c" },
  { label: "Refunded", value: 5, color: "#ffb02e" },
];

const LEADERBOARD = [
  {
    name: "B.Tech Computer Science",
    interests: "1,240 interests",
    pct: 18.6,
    color: "#6c5ce7",
  },
  {
    name: "B.Tech Information Technology",
    interests: "980 interests",
    pct: 14.7,
    color: "#2d8cff",
  },
  { name: "BCA", interests: "760 interests", pct: 11.4, color: "#6c5ce7" },
  {
    name: "B.Sc Computer Science",
    interests: "690 interests",
    pct: 10.3,
    color: "#6c5ce7",
  },
  {
    name: "B.Tech AI & Data Science",
    interests: "540 interests",
    pct: 8.1,
    color: "#6c5ce7",
  },
];

const INSIGHTS = [
  {
    title: "Conversion rate increased by 6.3%",
    sub: "Compared to last month",
    icon: "◎",
    tone: "green",
  },
  {
    title: "B.Tech CSE is the most preferred course",
    sub: "28% of total interests",
    icon: "🎓",
    tone: "violet",
  },
  {
    title: "Coimbatore has the highest student leads",
    sub: "28% of total district-wise leads",
    icon: "⌖",
    tone: "pink",
  },
  {
    title: "Revenue grew by 22%",
    sub: "₹61,200 this month",
    icon: "₹",
    tone: "orange",
  },
];

/* ---------------------------------------------------------------------
   EXPORT HELPERS  (PDF = browser print dialog, Excel = .xls download)
   --------------------------------------------------------------------- */
const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const stamp = () => new Date().toISOString().slice(0, 10);
const today = () =>
  new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const num = (n, d = 0) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });

/* every block that can go into a report */
const REPORT_SECTIONS = [
  {
    key: "overview",
    title: "Overview",
    head: ["Metric", "Value", "Change vs last month"],
    rows: () =>
      STATS.map((s) => [
        s.label,
        `${s.prefix || ""}${num(s.value, s.decimals || 0)}${s.suffix || ""}`,
        `+${s.trend}%`,
      ]),
  },
  {
    key: "funnel",
    title: "Lead Conversion Funnel",
    head: ["Stage", "Count", "Share"],
    rows: () => FUNNEL.map((f) => [f.label, num(f.value), f.pct]),
  },
  {
    key: "revenue",
    title: "Revenue Breakdown",
    head: ["Source", "Description", "Amount", "Share"],
    rows: () => REVENUE.map((r) => [r.title, r.sub, r.amount, r.pct]),
  },
  {
    key: "status",
    title: "Lead Status Distribution",
    head: ["Status", "Share (%)"],
    rows: () => LEAD_STATUS.map((l) => [l.label, l.value]),
  },
  {
    key: "colleges",
    title: "Top Performing Colleges",
    head: ["#", "College", "District", "Purchased Profiles", "Conversion"],
    rows: () => COLLEGES.map((c, i) => [i + 1, c.name, c.district, c.profiles, c.conv]),
  },
  {
    key: "courses",
    title: "Course Demand Analysis",
    head: ["Course", "Share (%)"],
    rows: () => COURSE_DEMAND.map((c) => [c.name, c.value]),
  },
  {
    key: "districts",
    title: "Student Interest by District",
    head: ["#", "District", "Leads", "Share (%)", "Growth"],
    rows: () => DISTRICTS.map((d, i) => [i + 1, d.name, num(d.leads), d.pct, d.growth]),
  },
  {
    key: "transactions",
    title: "Transaction Health",
    head: ["Status", "Share (%)"],
    rows: () => TXN_HEALTH.map((t) => [t.label, t.value]),
  },
  {
    key: "leaderboard",
    title: "Course Popularity Leaderboard",
    head: ["#", "Course", "Interests", "Share (%)"],
    rows: () => LEADERBOARD.map((l, i) => [i + 1, l.name, l.interests, l.pct]),
  },
  {
    key: "insights",
    title: "Quick Insights",
    head: ["Insight", "Detail"],
    rows: () => INSIGHTS.map((n) => [n.title, n.sub]),
  },
];
const ALL_SECTION_KEYS = REPORT_SECTIONS.map((x) => x.key);

const PRINT_CSS = `
@page { size: A4; margin: 14mm; }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; color: #0f1b33; font: 12px/1.5 "Segoe UI", Arial, sans-serif; }
.hd { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 3px solid #2563eb; }
h1 { margin: 0; font-size: 22px; }
h2 { margin: 20px 0 6px; color: #2563eb; font-size: 13px; letter-spacing: .06em; text-transform: uppercase; page-break-after: avoid; }
p { margin: 4px 0 0; color: #66758f; }
.tot { text-align: right; }
.tot span { display: block; color: #66758f; }
.tot strong { color: #2563eb; font-size: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 7px 8px; border: 1px solid #e1e7f2; text-align: left; vertical-align: top; }
thead th { background: #0f2447; color: #fff; font-size: 11px; }
tbody tr:nth-child(even) td { background: #f6f8fd; }
tr { page-break-inside: avoid; }
`;

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function saveExcel(fileName, sheetName, tableHtml) {
  const html =
    `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">` +
    `<head><meta charset="utf-8" />` +
    `<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${esc(sheetName)}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->` +
    `<style>td,th{border:1px solid #cbd5e1;padding:4px 8px;font-family:Calibri,Arial,sans-serif}th{background:#0f2447;color:#ffffff;font-weight:bold;text-align:left}</style>` +
    `</head><body>${tableHtml}</body></html>`;
  saveBlob(
    new Blob(["\ufeff", html], { type: "application/vnd.ms-excel;charset=utf-8" }),
    `${fileName}.xls`,
  );
}

function printPdf(title, bodyHtml) {
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText =
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";
  document.body.appendChild(frame);
  const doc = frame.contentWindow.document;
  doc.open();
  doc.write(
    `<!doctype html><html><head><meta charset="utf-8" /><title>${esc(title)}</title><style>${PRINT_CSS}</style></head><body>${bodyHtml}</body></html>`,
  );
  doc.close();
  frame.contentWindow.onafterprint = () => setTimeout(() => frame.remove(), 500);
  setTimeout(() => {
    frame.contentWindow.focus();
    frame.contentWindow.print();
  }, 300);
  setTimeout(() => frame.remove(), 120000); /* safety clean-up */
}

/* keys = which sections to include, format = "pdf" | "excel" */
function exportReport(keys, format) {
  const picked = REPORT_SECTIONS.filter((x) => keys.includes(x.key));
  if (!picked.length) return;
  const name = `reports-analytics-${stamp()}`;

  if (format === "excel") {
    const html = picked
      .map(
        (x) =>
          `<table><tr><th colspan="${x.head.length}" style="font-size:14px">${esc(x.title)}</th></tr>` +
          `<tr>${x.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>` +
          x
            .rows()
            .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
            .join("") +
          `</table><br/>`,
      )
      .join("");
    saveExcel(name, "Reports", html);
    return;
  }

  const body = picked
    .map(
      (x) =>
        `<h2>${esc(x.title)}</h2><table><thead><tr>${x.head
          .map((h) => `<th>${esc(h)}</th>`)
          .join("")}</tr></thead><tbody>${x
          .rows()
          .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table>`,
    )
    .join("");
  printPdf(
    name,
    `<div class="hd"><div><h1>Reports &amp; Analytics</h1><p>StudentCollege Admission Platform · ${esc(today())} · ${picked.length} section${picked.length > 1 ? "s" : ""}</p></div>` +
      `<div class="tot"><span>Total revenue</span><strong>₹${num(STATS[3].value)}</strong></div></div>${body}`,
  );
}

/* smoke hover effect: remembers where the cursor is (CSS draws the smoke) */
function glow(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
  /* touch / pen: :hover is unreliable, so switch it on with a class */
  if (e.pointerType && e.pointerType !== "mouse") {
    el.classList.add("is-glowing");
    clearTimeout(el._glowTimer);
    el._glowTimer = setTimeout(() => el.classList.remove("is-glowing"), 1200);
  }
}
const glowProps = { onPointerMove: glow, onPointerEnter: glow, onPointerDown: glow };

/* ---------------------------------------------------------------------
   2. SMALL HELPERS / HOOKS
   --------------------------------------------------------------------- */
/* animated count-up number */
function useCountUp(target, decimals = 0, duration = 1400) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return val.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/* flips to true shortly after mount - used to trigger CSS transitions */
function useReady(delay = 150) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return ready;
}

/* ---------------------------------------------------------------------
   3. REUSABLE COMPONENTS
   --------------------------------------------------------------------- */
function Card({
  title,
  sub,
  icon,
  delay = 0,
  className = "",
  children,
  action,
}) {
  return (
    <section
      className={`ra-card ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <header className="ra-card-head">
        <div>
          <h3>{title}</h3>
          {sub && <p>{sub}</p>}
        </div>
        {icon && <span className="ra-card-icon">{icon}</span>}
        {action}
      </header>
      {children}
    </section>
  );
}

function Donut({ segments, total, label }) {
  const ready = useReady();
  const R = 42;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="ra-donut">
      <svg viewBox="0 0 100 100">
        <circle className="ra-donut-bg" cx="50" cy="50" r={R} />
        {segments.map((s) => {
          const len = (s.value / 100) * C;
          const dashOffset = -offset;
          offset += len;
          return (
            <circle
              key={s.label}
              className="ra-donut-seg"
              cx="50"
              cy="50"
              r={R}
              stroke={s.color}
              strokeDasharray={`${ready ? Math.max(len - 1.2, 0) : 0} ${C}`}
              strokeDashoffset={dashOffset}
            />
          );
        })}
      </svg>
      <div className="ra-donut-center">
        <strong>{total}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Legend({ items, dot = "square" }) {
  return (
    <ul className="ra-legend">
      {items.map((i) => (
        <li key={i.label}>
          <i className={dot} style={{ background: i.color }} />
          <span>{i.label}</span>
          <b>{i.value}%</b>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------------
   4. SECTIONS
   --------------------------------------------------------------------- */
const LOGIN_PATH = "/login";

/* clears the session, fades the page out and goes to the login page */
function useLogout() {
  return () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0].trim();
        if (name)
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });
    } catch {
      /* storage not available - ignore */
    }
    document.querySelector(".ra-app")?.classList.add("is-leaving");
    setTimeout(() => window.location.replace(LOGIN_PATH), 350);
  };
}

function Sidebar({ open, onClose }) {
  const logout = useLogout();

  return (
    <>
      <div className={`ra-overlay ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`ra-sidebar ${open ? "open" : ""}`}>
        <div className="ra-brand">
          <div className="ra-logo">🎓</div>
          <div>
            <strong>
              Student<span>College</span>
            </strong>
            <small>Admission Platform</small>
          </div>
        </div>

        <p className="ra-menu-title">Main Menu</p>
        <nav>
          {MENU.map((m, i) => (
            <NavLink
              key={m.label}
              style={{ "--i": i }}
              to={m.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={onClose}
            >
              <span>{m.icon}</span>
              {m.label}
            </NavLink>
          ))}
        </nav>

        <div className="ra-sidebar-foot">
          <div className="ra-user">
            <span className="ra-avatar">A</span>
            <div>
              <strong>Admin</strong>
              <small>Super Admin</small>
            </div>
          </div>
          <button type="button" className="ra-logout" onClick={logout}>
            ↪ Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenu }) {
  const logout = useLogout();

  return (
    <header className="ra-topbar">
      <button
        type="button"
        className="ra-burger"
        onClick={onMenu}
        aria-label="Open navigation menu"
      >
        ☰
      </button>

      <button type="button" className="ra-bell" aria-label="Notifications">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3.5L18.5 10L12 16.5L5.5 10L12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle className="dot" cx="19.5" cy="4.5" r="3" />
        </svg>
      </button>

      <button
        type="button"
        className="ra-profile"
        title="Logout"
        aria-label="Admin - click to logout"
        onClick={logout}
      >
        <span className="ra-profile-icon">A</span>
        <span className="ra-profile-copy">
          <strong>Admin</strong>
          <small>Super Admin</small>
        </span>
        <span className="ra-profile-chev">⌄</span>
      </button>
    </header>
  );
}

/* "Export Report" button: opens a small PDF / Excel menu */
function DownloadMenu({ onPick, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("pointerdown", away, true);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const pick = (format) => {
    setOpen(false);
    onPick(format);
  };

  return (
    <div className="ra-dl" ref={ref}>
      <button
        type="button"
        className="ra-btn primary"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {children}
      </button>
      {open && (
        <div className="ra-dl-pop" role="menu">
          <p className="ra-dl-title">Download as</p>
          <button type="button" role="menuitem" className="ra-dl-item" onClick={() => pick("pdf")}>
            <span className="ra-dl-ico pdf">PDF</span>
            <span>
              <strong>PDF document</strong>
              <small>Choose “Save as PDF” in the dialog</small>
            </span>
          </button>
          <button type="button" role="menuitem" className="ra-dl-item" onClick={() => pick("excel")}>
            <span className="ra-dl-ico xls">XLS</span>
            <span>
              <strong>Excel sheet</strong>
              <small>Opens directly in Excel</small>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

function PageHeader({ onExport }) {
  return (
    <div className="ra-header">
      <div className="ra-title">
        <span className="ra-title-icon">
          <i />
          <i />
          <i />
        </span>
        <div>
          <h1>Reports &amp; Analytics</h1>
          <p>
            Track platform performance, analyse trends and make data-driven
            decisions.
          </p>
        </div>
      </div>
      <div className="ra-actions">
        <DownloadMenu onPick={(f) => onExport(ALL_SECTION_KEYS, f)}>
          ⇩ Export Report
        </DownloadMenu>
      </div>
    </div>
  );
}

function StatCard({ stat, index }) {
  const value = useCountUp(stat.value, stat.decimals || 0);
  return (
    <div
      className={`ra-stat ra-glow ra-tone-${stat.tone}`}
      style={{ animationDelay: `${index * 80}ms` }}
      {...glowProps}
    >
      <span className={`ra-badge ${stat.tone}`}>
        <i
          className="ra-blink"
          style={{ animationDelay: `${index * 0.25}s` }}
        >
          {stat.icon}
        </i>
      </span>
      <p>{stat.label}</p>
      <h2>
        {stat.prefix}
        {value}
        {stat.suffix}
      </h2>
      <small>
        <b>↑ +{stat.trend}%</b> vs. last month
      </small>
    </div>
  );
}

function FunnelValue({ value }) {
  const shown = useCountUp(value, 0, 1800);
  return <b>{shown}</b>;
}

function FunnelCard() {
  const ready = useReady();
  return (
    <Card
      title="Lead Conversion Funnel"
      sub="From student interest to purchased profile"
      icon="▥"
      delay={100}
      className="ra-funnel-card"
    >
      <div className="ra-funnel">
        {FUNNEL.map((f, i) => (
          <div
            className="ra-funnel-row"
            key={f.label}
            style={{ "--d": `${i * 0.2}s` }}
          >
            <div className="ra-funnel-shape">
              <div
                className={`ra-funnel-bar ${f.color}`}
                style={{
                  width: ready ? `${f.width}%` : "0%",
                  transitionDelay: `${i * 160}ms`,
                }}
              >
                <span>{f.label}</span>
              </div>
            </div>
            <div className="ra-funnel-val">
              <FunnelValue value={f.value} />
              <small>{f.pct}</small>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DropNum({ value, decimals = 0 }) {
  const shown = useCountUp(value, decimals, 1400);
  return <>{shown}</>;
}

/* Lead Drop-off Analysis: animated bars (same motion as Lead Status) + highest drop-off tip */
function LeadDropoffCard() {
  const ready = useReady();
  return (
    <Card
      title="Lead Drop-off Analysis"
      sub="Where do most leads get lost? Track drop-off at each stage."
      delay={160}
    >
      <div className="ra-do-list">
        {DROPOFF.map((d, i) => (
          <div
            key={d.from}
            className="ra-do-row"
            style={{
              "--c": d.color,
              "--pd": `${i * 0.35}s`,
              animationDelay: `${i * 90}ms`,
            }}
            tabIndex={0}
          >
            <span className="ra-do-pin" />
            <div className="ra-do-main">
              <div className="ra-do-top">
                <strong>
                  {d.from} → {d.to}
                </strong>
                <em>
                  <DropNum value={d.pct} decimals={1} />% drop-off
                </em>
              </div>
              <div className="ra-do-bar">
                <i
                  style={{
                    width: ready ? `${d.pct}%` : "0%",
                    transitionDelay: `${i * 140}ms`,
                  }}
                />
              </div>
              <small>
                <DropNum value={d.lost} /> leads lost
              </small>
            </div>
          </div>
        ))}
      </div>

      <div className="ra-do-tip">
        <span className="ra-do-tip-ico">💡</span>
        <div>
          <strong>
            Highest drop-off: {DROP_WORST.from} → {DROP_WORST.to}
          </strong>
          <small>Review lead quality and the purchase flow.</small>
        </div>
      </div>
    </Card>
  );
}

function RevenueCard() {
  return (
    <Card
      title="Revenue Breakdown"
      sub="Total revenue and payment status"
      icon="▥"
      delay={180}
    >
      <div className="ra-revenue">
        {REVENUE.map((r, i) => (
          <div
            className="ra-revenue-row"
            key={r.title}
          >
            <span className={`ra-badge round ${r.tone}`}>
              <i
                className="ra-blink"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                {r.icon}
              </i>
            </span>
            <div className="ra-revenue-text">
              <strong>{r.title}</strong>
              <small>{r.sub}</small>
            </div>
            <div className={`ra-revenue-amt ${r.tone}`}>
              <b>{r.amount}</b>
              <small>{r.pct}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="ra-rev-summary">
        <div className="ra-rev-total">
          <div>
            <small>Total Revenue</small>
            <b>{`₹${num(STATS[3].value)}`}</b>
          </div>
          <span className="ra-rev-trend">↑ +{STATS[3].trend}% vs. last month</span>
        </div>

        <p className="ra-rev-label">Revenue Distribution</p>
        <div className="ra-rev-bar">
          {REVENUE.map((r) => (
            <span
              key={r.title}
              className={`ra-rev-seg ${r.tone}`}
              style={{ width: r.pct }}
              title={`${r.title} - ${r.pct}`}
            />
          ))}
        </div>
        <div className="ra-rev-legend">
          {REVENUE.map((r) => (
            <span key={r.title}>
              <i className={`ra-rev-dot ${r.tone}`} />
              {r.title}
            </span>
          ))}
        </div>

        <div className="ra-rev-stats">
          <div>
            <small>Avg. Order Value</small>
            <b>{`₹${num(Math.round(STATS[3].value / STATS[5].value))}`}</b>
          </div>
          <div>
            <small>Success Rate</small>
            <b>{TXN_HEALTH[0].value}%</b>
          </div>
        </div>
      </div>
    </Card>
  );
}

const LEAD_TOTAL = 2480;
/* turns the % values into lead counts (last one takes the remainder so the sum is exact) */
const LEAD_ROWS = (() => {
  let left = LEAD_TOTAL;
  return LEAD_STATUS.map((l, i) => {
    const count =
      i === LEAD_STATUS.length - 1
        ? left
        : Math.round((l.value / 100) * LEAD_TOTAL);
    left -= count;
    return { ...l, count };
  });
})();

/* Lead Status Distribution: interactive donut + status rows + detail popup */
function LeadStatusCard() {
  const ready = useReady();
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const toggle = (label) => setSelected((cur) => (cur === label ? null : label));

  const shown = hover || selected;
  const R = 56;
  const C = 2 * Math.PI * R;
  const GAP = 3;

  let acc = 0;
  const segs = LEAD_ROWS.map((l) => {
    const len = (l.value / 100) * C;
    const seg = { ...l, len, offset: acc };
    acc += len;
    return seg;
  });

  const active = LEAD_ROWS.find((l) => l.label === shown);
  const picked = selected
    ? LEAD_ROWS.find((l) => l.label === (hover || selected))
    : null;

  return (
    <Card
      title="Lead Status Distribution"
      sub="Current status of all student leads"
      icon="◔"
      delay={260}
    >
      <div className="ra-ld">
        <div className="ra-ld-donut">
          <svg viewBox="0 0 140 140" role="img" aria-label="Lead status distribution">
            <circle className="ra-ld-track" cx="70" cy="70" r={R} />
            {segs.map((s) => (
              <circle
                key={s.label}
                className={`ra-ld-seg ${shown === s.label ? "on" : ""} ${
                  shown && shown !== s.label ? "dim" : ""
                }`}
                cx="70"
                cy="70"
                r={R}
                stroke={s.color}
                strokeDasharray={`${ready ? Math.max(s.len - GAP, 0) : 0} ${C}`}
                strokeDashoffset={-s.offset}
                onMouseEnter={() => setHover(s.label)}
                onMouseLeave={() => setHover(null)}
                onClick={() => toggle(s.label)}
              />
            ))}
          </svg>
          <div
            className="ra-ld-center"
            style={active ? { "--c": active.color } : undefined}
          >
            <strong>
              {(active ? active.count : LEAD_TOTAL).toLocaleString("en-IN")}
            </strong>
            <span>{active ? `${active.label} leads` : "Total Leads"}</span>
            <b>{active ? `${active.value}% of total` : "All statuses"}</b>
          </div>
        </div>

        <div className="ra-ld-list">
          {LEAD_ROWS.map((l, i) => (
            <div
              key={l.label}
              className={`ra-ld-row ${shown === l.label ? "on" : ""}`}
              style={{ "--c": l.color, animationDelay: `${i * 70}ms` }}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setHover(l.label)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(l.label)}
              onBlur={() => setHover(null)}
              onClick={() => toggle(l.label)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(l.label);
                }
              }}
            >
              <div className="ra-ld-row-top">
                <i />
                {l.label}
                <b>{l.value}%</b>
              </div>
              <div className="ra-ld-bar">
                <i style={{ width: `${l.value}%`, animationDelay: `${i * 70}ms` }} />
              </div>
            </div>
          ))}
        </div>

        {picked && (
          <div className="ra-ld-pop" style={{ "--c": picked.color }} role="status">
            <div className="ra-ld-pop-head">
              <i />
              <strong>{picked.label} leads</strong>
              <button
                type="button"
                className="ra-ld-pop-x"
                aria-label="Close details"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>
            <div className="ra-ld-pop-grid">
              <div>
                <span>Leads</span>
                <b>{picked.count.toLocaleString("en-IN")}</b>
              </div>
              <div>
                <span>Share</span>
                <b>{picked.value}%</b>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function CollegesCard() {
  return (
    <Card
      title="Top Performing Colleges"
      sub="Based on profile purchases"
      icon="♛"
      delay={100}
      className="crown"
    >
      <div className="ra-table-wrap">
        <table className="ra-table">
          <thead>
            <tr>
              <th>#</th>
              <th>College Name</th>
              <th>District</th>
              <th>Purchased Profiles</th>
              <th>Conversion</th>
            </tr>
          </thead>
          <tbody>
            {COLLEGES.map((c, i) => (
              <tr key={c.name}>
                <td>{i + 1}</td>
                <td>
                  <span className="ra-college">
                    <i>🏛</i>
                    {c.name}
                  </span>
                </td>
                <td>{c.district}</td>
                <td>{c.profiles}</td>
                <td className="up">
                  {c.conv} <em>↗</em>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function DemandValue({ value }) {
  const shown = useCountUp(value, 0, 1500);
  return <b>{shown}%</b>;
}

function CourseDemandCard() {
  const ready = useReady();
  return (
    <Card
      title="Course Demand Analysis"
      sub="Most preferred courses by students"
      icon="▥"
      delay={180}
    >
      <div className="ra-bars">
        {COURSE_DEMAND.map((c, i) => (
          <div
            className="ra-bar-row demand"
            key={c.name}
            style={{ animationDelay: `${i * 90}ms`, "--sd": `${1.2 + i * 0.35}s` }}
          >
            <span className="ra-bar-name">{c.name}</span>
            <div className="ra-bar-track">
              <div
                className="ra-bar-fill"
                style={{
                  width: ready ? `${(c.value / 28) * 100}%` : "0%",
                  background: c.color,
                  transitionDelay: `${i * 90}ms`,
                }}
              />
            </div>
            <DemandValue value={c.value} />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* Tamil Nadu district map with blinking location pins */
const TN_OUTLINE =
  "M190 16 L165 10 L149 23 L136 21 L109 37 L90 41 L77 46 L66 64 L75 82 L77 93 L55 95 L46 109 L19 109 L23 127 L32 149 L50 163 L55 185 L59 208 L55 230 L59 248 L66 258 L86 244 L93 228 L109 212 L131 203 L145 203 L127 176 L138 158 L156 156 L169 158 L169 136 L169 118 L167 93 L169 73 L178 50 L188 33 Z";

const TN_LINES =
  "M136 21 L128 52 L141 74 L125 96 L137 118 L118 136 M90 41 L96 66 L84 82 L93 97 L75 111 L56 122 M149 23 L158 60 L150 88 L167 93 M118 136 L100 150 L91 175 L109 190 L109 212 M91 175 L72 190 L59 208 M93 97 L110 112 L118 136 M66 64 L84 82 M55 95 L73 111";

/* x, y = pin tip on the map; lx / ly / anchor = label placement on the big map */
const PIN_POS = {
  Coimbatore: { x: 39, y: 127, lx: -9, ly: 3, anchor: "end" },
  Chennai: { x: 184, y: 34, lx: -9, ly: 3, anchor: "end" },
  Tiruchirappalli: { x: 118, y: 136, lx: 0, ly: -9, anchor: "middle" },
  Madurai: { x: 91, y: 175, lx: 9, ly: 3, anchor: "start" },
  Salem: { x: 93, y: 97, lx: 9, ly: 3, anchor: "start" },
  Erode: { x: 73, y: 111, lx: 9, ly: 3, anchor: "start" },
  Tirunelveli: { x: 72, y: 229, lx: 9, ly: 3, anchor: "start" },
  Vellore: { x: 137, y: 40, lx: -9, ly: 3, anchor: "end" },
  Thanjavur: { x: 137, y: 136, lx: 9, ly: 3, anchor: "start" },
  Tiruppur: { x: 56, y: 122, lx: 8, ly: 14, anchor: "start" },
};

function BubbleCluster({ items, mode }) {
  const big = mode === "big";
  const scale = big ? 0.85 : 1.05;

  return (
    <svg
      className={`ra-tamilnadu-map ${big ? "big" : ""}`}
      viewBox={big ? "-34 -2 256 272" : "-2 -2 204 272"}
      role="img"
      aria-label="Tamil Nadu map showing student interest by district"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="raTnFill" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#e4deff" />
          <stop offset="100%" stopColor="#b9acf8" />
        </linearGradient>
        <filter id="raTnShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#5b4ff0" floodOpacity="0.22" />
        </filter>
      </defs>

      <path className="ra-tn-shape" d={TN_OUTLINE} filter="url(#raTnShadow)" />
      <path className="ra-tn-lines" d={TN_LINES} />

      {items.map((d, i) => {
        const p = PIN_POS[d.name];
        if (!p) return null;
        const color = BUBBLE_COLORS[i % BUBBLE_COLORS.length];
        return (
          <g
            key={d.name}
            className="ra-pin"
            transform={`translate(${p.x} ${p.y})`}
            style={{ "--pd": `${i * 0.28}s` }}
          >
            <ellipse className="ra-pin-ripple" cx="0" cy="0" rx="7" ry="3" fill={color} />
            <ellipse cx="0" cy="0" rx="2.6" ry="1.2" fill={color} opacity="0.55" />
            <g transform={`scale(${scale})`}>
              <g className="ra-pin-body">
                <path
                  d="M0 0 C-2 -5 -8 -9 -8 -16 A8 8 0 1 1 8 -16 C8 -9 2 -5 0 0 Z"
                  fill={color}
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="0" cy="-16" r="3.2" fill="#fff" />
              </g>
            </g>
            {big && (
              <text className="ra-pin-label" x={p.lx} y={p.ly - 8} textAnchor={p.anchor}>
                {d.short}
              </text>
            )}
            <title>{`${d.name} - ${d.pct}% (${d.leads} leads)`}</title>
          </g>
        );
      })}
    </svg>
  );
}

function DistrictCard({ onViewAll }) {
  const top5 = DISTRICTS.slice(0, 5);
  return (
    <Card
      title="Student Interest by District"
      sub="Top districts with highest student leads"
      icon="⌖"
      delay={260}
    >
      <div className="ra-district">
        <BubbleCluster items={top5} mode="card" />
        <ol className="ra-rank">
          {top5.map((d, i) => (
            <li key={d.name}>
              <span>{i + 1}</span>
              <em>{d.name}</em>
              <b>{d.pct}%</b>
            </li>
          ))}
        </ol>
      </div>
      <button className="ra-viewall" onClick={onViewAll}>
        View all →
      </button>
    </Card>
  );
}

function TransactionCard() {
  return (
    <Card
      title="Transaction Health"
      sub="Payment performance overview"
      icon="▤"
      delay={100}
    >
      <div className="ra-split">
        <Donut segments={TXN_HEALTH} total="642" label="Total Transactions" />
        <Legend items={TXN_HEALTH} />
      </div>
    </Card>
  );
}

function LeaderboardCard() {
  const ready = useReady();
  return (
    <Card
      title="Course Popularity Leaderboard"
      sub="Courses with highest student interest"
      icon="▥"
      delay={180}
    >
      <ul className="ra-board">
        {LEADERBOARD.map((l, i) => (
          <li key={l.name}>
            <span className={`ra-rank-no n${i + 1}`}>{i + 1}</span>
            <div className="ra-board-body">
              <div className="ra-board-top">
                <strong>{l.name}</strong>
                <small>{l.interests}</small>
              </div>
              <div className="ra-bar-track thin">
                <div
                  className="ra-bar-fill"
                  style={{
                    width: ready ? `${(l.pct / 18.6) * 100}%` : "0%",
                    background: l.color,
                    transitionDelay: `${i * 100}ms`,
                  }}
                />
              </div>
            </div>
            <b>{l.pct}%</b>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function InsightsCard() {
  return (
    <Card title="Quick Insights" icon="💡" delay={260} className="plain-icon">
      <ul className="ra-insights">
        {INSIGHTS.map((n) => (
          <li key={n.title}>
            <span className={`ra-badge round ${n.tone}`}>{n.icon}</span>
            <div>
              <strong>{n.title}</strong>
              <small>{n.sub}</small>
            </div>
            <em>›</em>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function DownloadBar({ onExport, onCustom }) {
  return (
    <div className="ra-download">
      <span className="ra-download-icon">📄</span>
      <div className="ra-download-text">
        <strong>Need a detailed report?</strong>
        <small>
          Download comprehensive reports in PDF or Excel format for offline
          analysis and presentations.
        </small>
      </div>
      <div className="ra-download-btns">
        <button
          type="button"
          className="ra-btn primary"
          onClick={() => onExport(ALL_SECTION_KEYS, "pdf")}
        >
          ⇩ Download PDF
        </button>
        <button
          type="button"
          className="ra-btn light"
          onClick={() => onExport(ALL_SECTION_KEYS, "excel")}
        >
          ▦ Download Excel
        </button>
        <button type="button" className="ra-btn light" onClick={onCustom}>
          ⛛ Custom Report
        </button>
      </div>
    </div>
  );
}

/* pick the sections + format, then download */
function CustomReportModal({ onClose, onExport }) {
  const [picked, setPicked] = useState(ALL_SECTION_KEYS);
  const [format, setFormat] = useState("pdf");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const toggle = (key) =>
    setPicked((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]));

  const download = () => {
    onExport(
      ALL_SECTION_KEYS.filter((k) => picked.includes(k)),
      format,
    );
    onClose();
  };

  return (
    <div className="ra-modal-back" onClick={onClose}>
      <div
        className="ra-modal small"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className="ra-modal-head">
          <div>
            <h3>Custom Report</h3>
            <p>Choose what to include in your report</p>
          </div>
          <button className="ra-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="ra-custom">
          <div className="ra-custom-top">
            <span>
              {picked.length} of {REPORT_SECTIONS.length} selected
            </span>
            <span>
              <button type="button" className="ra-link" onClick={() => setPicked(ALL_SECTION_KEYS)}>
                Select all
              </button>
              <button type="button" className="ra-link" onClick={() => setPicked([])}>
                Clear
              </button>
            </span>
          </div>

          <div className="ra-checks">
            {REPORT_SECTIONS.map((x) => (
              <label key={x.key} className={`ra-check ${picked.includes(x.key) ? "on" : ""}`}>
                <input
                  type="checkbox"
                  checked={picked.includes(x.key)}
                  onChange={() => toggle(x.key)}
                />
                {x.title}
              </label>
            ))}
          </div>

          <div className="ra-custom-top">
            <span>Format</span>
            <div className="ra-seg" role="group" aria-label="Report format">
              <button type="button" className={format === "pdf" ? "on" : ""} onClick={() => setFormat("pdf")}>
                PDF
              </button>
              <button type="button" className={format === "excel" ? "on" : ""} onClick={() => setFormat("excel")}>
                Excel
              </button>
            </div>
          </div>

          <div className="ra-custom-foot">
            <button type="button" className="ra-btn light" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="ra-btn primary" disabled={!picked.length} onClick={download}>
              ⇩ Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* medium-size popup opened by "View all" */
function DistrictModal({ onClose }) {
  const ready = useReady(250);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const totalLeads = DISTRICTS.reduce((sum, d) => sum + d.leads, 0);

  return (
    <div className="ra-modal-back" onClick={onClose}>
      <div
        className="ra-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className="ra-modal-head">
          <div>
            <h3>Student Interest by District</h3>
            <p>All districts ranked by student leads</p>
          </div>
          <button
            className="ra-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <div className="ra-modal-sums">
          <div>
            <small>Total Districts</small>
            <b>{DISTRICTS.length}</b>
          </div>
          <div>
            <small>Total Leads</small>
            <b>{totalLeads.toLocaleString("en-IN")}</b>
          </div>
          <div>
            <small>Top District</small>
            <b>{DISTRICTS[0].name}</b>
          </div>
        </div>

        <div className="ra-modal-body">
          <div className="ra-modal-map">
            <BubbleCluster items={DISTRICTS} mode="big" />
          </div>

          <ul className="ra-modal-list">
            {DISTRICTS.map((d, i) => (
              <li key={d.name} style={{ animationDelay: `${i * 50}ms` }}>
                <span className="no">{i + 1}</span>
                <div className="info">
                  <div className="row">
                    <strong>{d.name}</strong>
                    <small>{d.leads.toLocaleString("en-IN")} leads</small>
                  </div>
                  <div className="ra-bar-track thin">
                    <div
                      className="ra-bar-fill"
                      style={{
                        width: ready ? `${(d.pct / 28) * 100}%` : "0%",
                        transitionDelay: `${i * 70}ms`,
                      }}
                    />
                  </div>
                </div>
                <div className="end">
                  <b>{d.pct}%</b>
                  <em>{d.growth}</em>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   5. PAGE
   --------------------------------------------------------------------- */
export default function ReportsAnalytics({ embedded = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDistricts, setShowDistricts] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const runExport = (keys, format) => {
    if (!keys.length) return;
    exportReport(keys, format);
    setToast(
      format === "excel"
        ? "Excel report downloaded"
        : "PDF ready - choose “Save as PDF” in the print dialog",
    );
  };

  return (
    <div className={`ra-app ${embedded ? "ra-embedded" : ""}`}>
      <style>{CSS}</style>

      {!embedded && (
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}

      <main className="ra-main">
        {!embedded && <Topbar onMenu={() => setMenuOpen(true)} />}

        <div className="ra-content">
          <PageHeader onExport={runExport} />

          <div className="ra-stats">
            {STATS.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </div>

          <div className="ra-row three">
            <div className="ra-col">
              <FunnelCard />
              <LeadDropoffCard />
            </div>
            <RevenueCard />
            <LeadStatusCard />
          </div>

          <div className="ra-row three">
            <CollegesCard />
            <CourseDemandCard />
            <DistrictCard onViewAll={() => setShowDistricts(true)} />
          </div>

          <div className="ra-row three">
            <TransactionCard />
            <LeaderboardCard />
            <InsightsCard />
          </div>

          <DownloadBar onExport={runExport} onCustom={() => setShowCustom(true)} />
        </div>
      </main>

      {showDistricts && (
        <DistrictModal onClose={() => setShowDistricts(false)} />
      )}

      {showCustom && (
        <CustomReportModal
          onClose={() => setShowCustom(false)}
          onExport={runExport}
        />
      )}

      {toast && (
        <div className="ra-toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   6. CSS  (injected through the <style> tag above)
   --------------------------------------------------------------------- */
const CSS = `
/* ===== base ===== */ .ra-app {
  --navy: #0f2447;
  --navy-2: #16315f;
  --nav-blue: #2563eb;
  --primary: #5b4ff0;
  --primary-2: #7a6cf5;
  --text: #0f1b33;
  --muted: #66758f;
  --line: #e6ebf3;
  --bg: #f4f7fc;
  --card: #ffffff;
  --green: #14b88a;
  --red: #ff5c5c;
  --blue: #2d8cff;
  --orange: #ffb02e;
  position: fixed;
  inset: 0;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  text-align: left;
  font-size: 14px;
  line-height: 1.45;
  color-scheme: light;
  background: var(--bg);
  color: var(--text);
  font-family: "Inter", "Segoe UI", system-ui, sans-serif;
}
.ra-app *, .ra-app *::before, .ra-app *::after {
  box-sizing: border-box;
}
.ra-app h1, .ra-app h2, .ra-app h3, .ra-app p, .ra-app ul, .ra-app ol {
  margin: 0;
  padding: 0;
}
.ra-app ul, .ra-app ol {
  list-style: none;
}
:where(.ra-app) button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: none;
  color: inherit;
  border-radius: 0;
}
.ra-app small {
  color: var(--muted);
}
/* ===== keyframes ===== */ @keyframes raFadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes raFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes raPop {
  from {
    opacity: 0;
    transform: scale(.92) translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes raSlide {
  from {
    opacity: 0;
    transform: translateX(-14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes raIconBlink {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: .2;
    transform: scale(.85);
  }
}
@keyframes raBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .25;
  }
}
@keyframes raRing {
  0% {
    transform: scale(.6);
    opacity: .8;
  }
  100% {
    transform: scale(3.4);
    opacity: 0;
  }
}
@keyframes raShine {
  0% {
    transform: translateX(-130%);
  }
  55%, 100% {
    transform: translateX(130%);
  }
}
@keyframes raFunnelIn {
  from {
    opacity: 0;
    transform: translateY(-18px) scale(.9);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes raGlow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.12);
  }
}
@keyframes raBubble {
  0%, 100% {
    opacity: .95;
  }
  50% {
    opacity: .55;
  }
}
@keyframes raBubbleRing {
  0% {
    transform: scale(1);
    opacity: .45;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
@keyframes raMapIn {
  from {
    opacity: 0;
    transform: scale(.9);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes raFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
@keyframes raBell {
  0%, 90%, 100% {
    transform: rotate(0);
  }
  93% {
    transform: rotate(14deg);
  }
  96% {
    transform: rotate(-12deg);
  }
}
/* ===== sidebar (same as the Applications page sidebar) ===== */ .ra-sidebar {
  position: sticky;
  top: 0;
  width: 236px;
  height: 100vh;
  height: 100dvh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #112746;
  color: #fff;
  overflow: hidden;
  z-index: 60;
  transition: transform .35s cubic-bezier(.4,0,.2,1);
}
.ra-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  height: 82px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.ra-logo {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-size: 20px;
  background: rgba(255,255,255,.1);
  border-radius: 11px;
}
.ra-sidebar .ra-brand strong {
  display: block;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
}
.ra-sidebar .ra-brand strong span {
  color: #58a1ff;
}
.ra-sidebar .ra-brand small {
  display: block;
  margin-top: 3px;
  color: #91a5c2;
  font-size: 9px;
}
.ra-sidebar .ra-menu-title {
  width: 100%;
  margin: 24px 0 10px;
  padding: 0;
  color: #6f86a7;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
}
.ra-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-height: 0;
  overflow-y: scroll;
  width: calc(100% + 40px);
  margin-right: -40px;
  padding: 0 52px 0 12px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.ra-sidebar nav::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}
.ra-sidebar nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  height: 43px;
  padding: 0 13px;
  border-radius: 8px;
  color: #afbdd1;
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
  transition: background .2s, color .2s;
  animation: raNavIn .45s both;
  animation-delay: calc(var(--i, 0) * 45ms);
}
.ra-sidebar nav a span {
  width: 20px;
  text-align: center;
  font-size: 16px;
}
.ra-sidebar nav a:hover {
  background: rgba(255,255,255,.07);
  color: #fff;
}
.ra-sidebar nav a.active {
  background: #2177e8;
  color: #fff;
  font-weight: 400;
  box-shadow: 0 6px 18px rgba(33,119,232,.2);
}
@keyframes raNavIn {
  from {
    opacity: 0;
    transform: translateX(-18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.ra-sidebar-foot {
  flex-shrink: 0;
  margin-top: 0;
  padding: 14px;
  border-top: 1px solid rgba(255,255,255,.07);
}
.ra-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255,255,255,.055);
  border-radius: 10px;
}
.ra-sidebar .ra-user strong {
  display: block;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}
.ra-sidebar .ra-user small {
  display: block;
  margin-top: 2px;
  color: #8196b5;
  font-size: 9px;
}
.ra-avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  background: #28558e;
  border-radius: 50%;
}
.ra-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 34px;
  margin-top: 8px;
  padding: 0;
  color: #93a6c0;
  font-size: 11px;
  border-radius: 8px;
  transition: background .2s, color .2s;
}
.ra-logout:hover {
  background: rgba(255,255,255,.07);
  color: #fff;
}
.ra-overlay {
  display: none;
}
.ra-app {
  transition: opacity .35s ease;
}
.ra-app.is-leaving {
  opacity: 0;
  pointer-events: none;
}
/* embedded: rendered inside AdminDashboard (it already has sidebar + topbar) */ .ra-app.ra-embedded {
  position: relative;
  inset: auto;
  z-index: auto;
  display: block;
  overflow: visible;
  background: transparent;
}
.ra-embedded .ra-main {
  overflow: visible;
}
.ra-embedded .ra-content {
  padding: 0;
  max-width: none;
}
/* ===== main ===== */ .ra-main {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: clip;
}
.ra-content {
  position: relative;
  z-index: 1;
  padding: 24px 28px 32px;
  max-width: 1500px;
  margin: 0 auto;
}
/* ===== topbar (same look as the Transactions page) ===== */ .ra-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 72px;
  box-sizing: border-box;
  padding: 0 30px;
  background: rgba(255,255,255,.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.ra-burger {
  display: none;
  width: 40px;
  height: 40px;
  font-size: 18px;
  color: var(--text);
  background: var(--bg);
  border-radius: 10px;
  transition: background .2s;
}
.ra-burger:hover {
  background: #eaf1ff;
}
.ra-bell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  margin-left: auto;
  padding: 6px;
  color: #64748b;
  border-radius: 8px;
  transition: background .2s;
}
.ra-bell:hover {
  background: #eef3fb;
}
.ra-bell svg {
  display: block;
  width: 20px;
  height: 20px;
}
.ra-bell .dot {
  fill: #f05260;
  animation: raBlink 1.2s ease-in-out infinite;
}
.ra-profile {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 10px;
  padding: 4px 0 4px 8px;
  color: #17365f;
  text-align: left;
  border-radius: 10px;
  transition: background .2s;
}
.ra-profile:hover {
  background: #eef3fb;
}
.ra-profile:hover .ra-profile-chev {
  color: #e0384a;
}
.ra-profile-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  background: #194781;
  border-radius: 50%;
}
.ra-profile-copy strong, .ra-profile-copy small {
  display: block;
  white-space: nowrap;
}
.ra-profile-copy strong {
  color: #18385f;
  font-size: 12px;
}
.ra-profile-copy small {
  margin-top: 3px;
  color: #8294af;
  font-size: 10px;
}
.ra-profile-chev {
  color: #7186a6;
  font-size: 11px;
}
/* ===== smoke hover effect on the 6 stat cards ===== */ .ra-stat {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
.ra-tone-violet {
  --glow: 108, 92, 231;
}
.ra-tone-green {
  --glow: 20, 184, 138;
}
.ra-tone-blue {
  --glow: 45, 140, 255;
}
.ra-tone-orange {
  --glow: 245, 147, 0;
}
.ra-tone-indigo {
  --glow: 91, 79, 240;
}
.ra-tone-teal {
  --glow: 20, 170, 160;
}
.ra-glow::before, .ra-glow::after {
  content: "";
  position: absolute;
  z-index: -1;
  left: var(--mx, 50%);
  top: var(--my, 50%);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  filter: blur(14px);
  transform: scale(.5);
}
.ra-glow::before {
  width: 120px;
  height: 120px;
  margin: -60px 0 0 -60px;
  background: radial-gradient(circle, rgba(var(--glow), .5) 0%, rgba(var(--glow), .2) 45%, transparent 70%);
  transition: left .45s ease-out, top .45s ease-out, opacity .35s, transform .45s;
}
.ra-glow::after {
  width: 190px;
  height: 190px;
  margin: -95px 0 0 -95px;
  background: radial-gradient(circle, rgba(var(--glow), .3) 0%, rgba(var(--glow), .1) 50%, transparent 72%);
  transition: left .95s ease-out, top .95s ease-out, opacity .5s, transform .7s;
}
.ra-glow:hover::before, .ra-glow:hover::after, .ra-glow.is-glowing::before, .ra-glow.is-glowing::after {
  opacity: 1;
  transform: scale(1);
  animation: raGlowDrift 2.6s ease-in-out infinite alternate;
}
.ra-glow:hover::after, .ra-glow.is-glowing::after {
  animation-duration: 3.4s;
  animation-direction: alternate-reverse;
}
@keyframes raGlowDrift {
  0% {
    transform: scale(.95) translate(0, 0);
  }
  50% {
    transform: scale(1.12) translate(10px, -6px);
  }
  100% {
    transform: scale(1) translate(-8px, 5px);
  }
}
/* ===== download menu + toast + custom report ===== */ .ra-header {
  position: relative;
  z-index: 20;
}
.ra-dl {
  position: relative;
  display: inline-flex;
}
.ra-dl > .ra-btn {
  width: 100%;
}
.ra-dl-pop {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 60;
  width: 250px;
  max-width: calc(100vw - 32px);
  padding: 6px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 16px 40px rgba(15,36,71,.18);
  animation: raPop .18s ease both;
}
.ra-dl-title {
  padding: 6px 8px 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--muted);
}
.ra-dl-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 9px 8px;
  text-align: left;
  border-radius: 10px;
  transition: background .15s;
}
.ra-dl-item:hover {
  background: var(--bg);
}
.ra-dl-item strong {
  display: block;
  font-size: 13px;
  font-weight: 600;
}
.ra-dl-item small {
  font-size: 11px;
}
.ra-dl-ico {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  font-size: 11px;
  font-weight: 800;
  border-radius: 10px;
}
.ra-dl-ico.pdf {
  color: var(--red);
  background: #ffe3e3;
}
.ra-dl-ico.xls {
  color: var(--green);
  background: #daf5ec;
}
.ra-toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 120;
  max-width: calc(100vw - 32px);
  padding: 11px 18px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background: var(--navy);
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(10,20,60,.3);
  transform: translateX(-50%);
  animation: raToast .3s ease both;
}
@keyframes raToast {
  from {
    opacity: 0;
    transform: translate(-50%, 12px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
.ra-modal.small {
  max-width: 520px;
}
.ra-custom {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 22px 20px;
  overflow-y: auto;
}
.ra-custom-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--muted);
}
.ra-link {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
}
.ra-link + .ra-link {
  margin-left: 12px;
}
.ra-checks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.ra-check {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  background: #fafbff;
  border: 1px solid var(--line);
  border-radius: 10px;
  transition: background .2s, border-color .2s;
}
.ra-check:hover {
  background: #f2f0ff;
}
.ra-check.on {
  background: #f2f0ff;
  border-color: var(--primary-2);
}
.ra-check input {
  width: 16px;
  height: 16px;
  margin: 0;
  flex-shrink: 0;
  accent-color: var(--primary);
}
.ra-seg {
  display: inline-flex;
  padding: 3px;
  background: #f1f2f9;
  border-radius: 10px;
}
.ra-seg button {
  padding: 7px 18px;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  border-radius: 8px;
  transition: background .2s, color .2s;
}
.ra-seg button.on {
  color: var(--primary);
  background: #fff;
  box-shadow: 0 2px 6px rgba(40,50,110,.12);
}
.ra-custom-foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 4px;
}
.ra-btn:disabled {
  opacity: .5;
  cursor: not-allowed;
  transform: none;
}
/* ===== header ===== */ .ra-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 22px;
  animation: raFadeUp .6s .1s both;
}
.ra-title {
  display: flex;
  align-items: center;
  gap: 14px;
}
.ra-title-icon {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 30px;
}
.ra-title-icon i {
  width: 7px;
  background: var(--primary);
  border-radius: 2px;
  animation: raFloat 2.4s ease-in-out infinite;
}
.ra-title-icon i:nth-child(1) {
  height: 14px;
}
.ra-title-icon i:nth-child(2) {
  height: 28px;
  animation-delay: .25s;
}
.ra-title-icon i:nth-child(3) {
  height: 20px;
  animation-delay: .5s;
}
.ra-title h1 {
  font-size: 26px;
  font-weight: 800;
  color: #1d1a63;
}
.ra-title p {
  margin-top: 4px;
  font-size: 14px;
  color: var(--muted);
}
.ra-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.ra-btn {
  height: 44px;
  padding: 0 22px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  transition: transform .2s, box-shadow .25s, background .25s;
}
.ra-btn:hover {
  transform: translateY(-2px);
}
.ra-btn.primary {
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  box-shadow: 0 8px 18px rgba(91,79,240,.3);
}
.ra-btn.primary:hover {
  box-shadow: 0 12px 24px rgba(91,79,240,.42);
}
.ra-btn.light {
  color: var(--text);
  background: #fff;
  border: 1px solid var(--line);
}
.ra-btn.light:hover {
  box-shadow: 0 8px 18px rgba(30,40,90,.1);
}
/* ===== stat cards ===== */ .ra-stats {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.ra-stat {
  padding: 18px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  transition: transform .3s, box-shadow .3s;
  animation: raFadeUp .6s backwards;
}
.ra-stat:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(40,50,110,.12);
}
.ra-stat p {
  margin: 14px 0 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
}
.ra-stat h2 {
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -.5px;
  color: #000;
}
.ra-blink {
  display: inline-block;
  font-style: normal;
  line-height: 1;
  animation: raIconBlink 1.6s ease-in-out infinite;
}
.ra-stat small {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.ra-stat small b {
  color: var(--green);
}
/* ===== colored badges ===== */ .ra-badge {
  width: 42px;
  height: 42px;
  display: inline-grid;
  place-items: center;
  font-size: 18px;
  font-weight: 700;
  border-radius: 12px;
  flex-shrink: 0;
}
.ra-badge.round {
  border-radius: 50%;
}
.ra-badge.violet {
  color: #6c5ce7;
  background: #ece9ff;
}
.ra-badge.green {
  color: var(--green);
  background: #daf5ec;
}
.ra-badge.blue {
  color: var(--blue);
  background: #dcecff;
}
.ra-badge.orange {
  color: #f59300;
  background: #fff0d6;
}
.ra-badge.indigo {
  color: #5b4ff0;
  background: #e6e3ff;
}
.ra-badge.teal {
  color: #14b88a;
  background: #d9f6ee;
}
.ra-badge.red {
  color: var(--red);
  background: #ffe3e3;
}
.ra-badge.pink {
  color: #e0489a;
  background: #ffe2f1;
}
/* ===== rows + cards ===== */ .ra-row {
  display: grid;
  gap: 16px;
  margin-bottom: 20px;
}
.ra-row.three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.ra-card {
  padding: 20px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  min-width: 0;
  transition: transform .3s, box-shadow .3s;
  animation: raFadeUp .7s backwards;
}
.ra-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(40,50,110,.1);
}
.ra-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 16px;
}
.ra-card-head h3 {
  font-size: 17px;
  font-weight: 700;
  color: #1d1a63;
}
.ra-card-head p {
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--muted);
}
.ra-card-icon {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 14px;
  color: var(--primary);
  background: #ece9ff;
  border-radius: 50%;
}
.ra-card.crown .ra-card-icon {
  color: #f59300;
  background: #fff0d6;
}
/* ===== funnel ===== */ .ra-funnel-card {
  align-self: start;
}
.ra-funnel {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ra-funnel-row {
  display: flex;
  align-items: center;
  gap: 12px;
  animation: raFunnelIn .8s both;
  animation-delay: var(--d, 0s);
}
.ra-funnel-shape {
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 0;
}
.ra-funnel-bar {
  position: relative;
  height: 38px;
  display: grid;
  place-items: center;
  overflow: hidden;
  white-space: nowrap;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  clip-path: polygon(0 0, 100% 0, 94% 100%, 6% 100%);
  transition: width 1.1s cubic-bezier(.2,.8,.2,1), transform .3s;
  animation: raGlow 3s ease-in-out infinite;
  animation-delay: var(--d, 0s);
}
.ra-funnel-bar span {
  position: relative;
  z-index: 1;
}
.ra-funnel-bar::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.5) 50%, transparent 70%);
  transform: translateX(-130%);
  animation: raShine 3.2s ease-in-out infinite;
  animation-delay: calc(var(--d, 0s) + 1.2s);
}
.ra-funnel-row:hover .ra-funnel-bar {
  transform: scale(1.05);
}
.ra-funnel-bar.violet {
  background: linear-gradient(135deg, #5b4ff0, #7a6cf5);
}
.ra-funnel-bar.blue {
  background: linear-gradient(135deg, #2d8cff, #4aa8ff);
}
.ra-funnel-bar.green {
  background: linear-gradient(135deg, #14b88a, #25d3a2);
}
.ra-funnel-bar.orange {
  background: linear-gradient(135deg, #ffb02e, #ffc55c);
}
.ra-funnel-val {
  width: 62px;
  text-align: right;
}
.ra-funnel-val b {
  display: block;
  font-size: 15px;
}
.ra-funnel-val small {
  font-size: 11px;
}
/* ===== lead drop-off ===== */ .ra-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.ra-col > .ra-card {
  align-self: stretch;
  width: 100%;
}
@keyframes raDoPulse {
  0% {
    transform: scale(1);
    opacity: .45;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}
.ra-do-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ra-do-row {
  --c: var(--primary);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  animation: raSlide .5s backwards;
  transition: border-color .2s, box-shadow .2s, transform .2s;
}
.ra-do-row:hover, .ra-do-row:focus-visible {
  border-color: var(--c);
  box-shadow: 0 6px 16px rgba(15,36,71,.08);
  transform: translateX(2px);
  outline: none;
}
.ra-do-pin {
  position: relative;
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-top: 4px;
  border-radius: 50%;
  background: var(--c);
}
.ra-do-pin::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--c);
  animation: raDoPulse 2s ease-out infinite;
  animation-delay: var(--pd, 0s);
}
.ra-do-main {
  flex: 1;
  min-width: 0;
}
.ra-do-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
}
.ra-do-top strong {
  font-weight: 600;
  min-width: 0;
}
.ra-do-top em {
  flex-shrink: 0;
  font-style: normal;
  font-size: 12px;
  font-weight: 700;
  color: var(--c);
}
.ra-do-bar {
  height: 6px;
  margin: 8px 0 6px;
  overflow: hidden;
  background: #eef0f8;
  border-radius: 99px;
}
.ra-do-bar i {
  display: block;
  height: 100%;
  background: var(--c);
  border-radius: 99px;
  transition: width 1.1s cubic-bezier(.2,.8,.2,1);
}
.ra-do-main small {
  font-size: 11.5px;
}
.ra-do-tip {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 10px 12px;
  background: #fff8ea;
  border: 1px solid #ffe7b8;
  border-radius: 12px;
  animation: raFadeUp .6s .5s backwards;
}
.ra-do-tip-ico {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 14px;
  background: #ffefc9;
  border-radius: 50%;
  animation: raFloat 3s ease-in-out infinite;
}
.ra-do-tip strong {
  display: block;
  font-size: 12px;
}
.ra-do-tip small {
  font-size: 11.5px;
}
/* ===== revenue ===== */ .ra-revenue {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ra-revenue-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fafbff;
  border: 1px solid var(--line);
  border-radius: 12px;
  transition: transform .25s, background .25s;
}
.ra-revenue-row:hover {
  background: #f2f0ff;
}
.ra-revenue-text {
  flex: 1;
  min-width: 0;
}
.ra-revenue-text strong {
  display: block;
  font-size: 13px;
}
.ra-revenue-text small {
  font-size: 11px;
}
.ra-revenue-amt {
  text-align: right;
}
.ra-revenue-amt b {
  display: block;
  font-size: 14px;
}
.ra-revenue-amt small {
  font-size: 12px;
  font-weight: 600;
}
.ra-revenue-amt.green small {
  color: var(--green);
}
.ra-revenue-amt.blue small {
  color: var(--blue);
}
.ra-revenue-amt.red small {
  color: var(--red);
}
.ra-revenue-amt.violet small {
  color: #6c5ce7;
}
/* ===== revenue summary (fills empty space) ===== */
.ra-rev-summary {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.ra-rev-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f2f0ff;
}
.ra-rev-total small {
  display: block;
  font-size: 11px;
  color: var(--muted);
}
.ra-rev-total b {
  font-size: 24px;
  color: var(--navy);
}
.ra-rev-trend {
  font-size: 11px;
  font-weight: 600;
  color: var(--green);
  background: #e6f8f2;
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
}
.ra-rev-label {
  margin: 16px 0 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}
.ra-rev-bar {
  display: flex;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--line);
}
.ra-rev-seg.green { background: var(--green); }
.ra-rev-seg.blue { background: var(--blue); }
.ra-rev-seg.red { background: var(--red); }
.ra-rev-seg.violet { background: #6c5ce7; }
.ra-rev-legend {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 10px;
  margin-top: 12px;
  font-size: 11px;
  color: var(--muted);
}
.ra-rev-legend span {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.ra-rev-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ra-rev-dot.green { background: var(--green); }
.ra-rev-dot.blue { background: var(--blue); }
.ra-rev-dot.red { background: var(--red); }
.ra-rev-dot.violet { background: #6c5ce7; }
.ra-rev-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 16px;
}
.ra-rev-stats > div {
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fafbff;
}
.ra-rev-stats small {
  display: block;
  font-size: 11px;
  color: var(--muted);
}
.ra-rev-stats b {
  font-size: 15px;
}
/* ===== donut + legend ===== */ .ra-split {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 18px;
  flex-wrap: wrap;
}
.ra-donut {
  position: relative;
  width: 150px;
  height: 150px;
  flex-shrink: 0;
}
.ra-donut svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.ra-donut circle {
  fill: none;
  stroke-width: 15;
}
.ra-donut-bg {
  stroke: #eef0f8;
}
.ra-donut-seg {
  transition: stroke-dasharray 1.3s cubic-bezier(.2,.8,.2,1);
}
.ra-donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.ra-donut-center strong {
  font-size: 22px;
  font-weight: 800;
}
.ra-donut-center span {
  max-width: 70px;
  font-size: 10px;
  color: var(--muted);
}
.ra-legend {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 150px;
}
.ra-legend li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}
.ra-legend i {
  width: 11px;
  height: 11px;
  border-radius: 3px;
}
.ra-legend span {
  flex: 1;
}
.ra-legend b {
  font-weight: 600;
  color: var(--muted);
}
/* ===== lead status (interactive donut) ===== */ @keyframes raPopIn {
  from {
    opacity: 0;
    transform: scale(.94);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes raBarGrow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
.ra-ld {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.ra-ld-donut {
  position: relative;
  flex-shrink: 0;
  width: 168px;
  height: 168px;
  animation: raPopIn .5s ease both;
}
.ra-ld-donut svg {
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  overflow: visible;
}
.ra-ld-track {
  fill: none;
  stroke: #eef0f8;
  stroke-width: 14;
}
.ra-ld-seg {
  fill: none;
  stroke-width: 14;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: stroke-dasharray 1.1s cubic-bezier(.2,.8,.2,1), stroke-width .25s, opacity .25s;
}
.ra-ld-seg.on {
  stroke-width: 19;
}
.ra-ld-seg.dim {
  opacity: .25;
}
.ra-ld-center {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  text-align: center;
  pointer-events: none;
}
.ra-ld-center strong {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -.01em;
}
.ra-ld-center span {
  margin-top: 2px;
  font-size: 11.5px;
  color: var(--muted);
}
.ra-ld-center b {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 700;
  color: var(--c, var(--primary));
}
.ra-ld-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;
}
.ra-ld-row {
  --c: var(--primary);
  padding: 10px 12px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  cursor: pointer;
  animation: raSlide .5s backwards;
  transition: border-color .2s, box-shadow .2s, transform .2s;
}
.ra-ld-row:hover, .ra-ld-row.on {
  border-color: var(--c);
  box-shadow: 0 6px 16px rgba(15,36,71,.08);
  transform: translateX(2px);
}
.ra-ld-row:focus-visible {
  outline: 2px solid var(--c);
  outline-offset: 2px;
}
.ra-ld-row-top {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
}
.ra-ld-row-top i {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--c);
}
.ra-ld-row-top b {
  margin-left: auto;
  font-weight: 700;
}
.ra-ld-bar {
  height: 6px;
  margin-top: 8px;
  overflow: hidden;
  background: #eef0f8;
  border-radius: 99px;
}
.ra-ld-bar i {
  display: block;
  height: 100%;
  background: var(--c);
  border-radius: 99px;
  transform-origin: left;
  animation: raBarGrow .9s ease backwards;
}
.ra-ld-pop {
  --c: var(--primary);
  width: 100%;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid var(--c);
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(15,36,71,.12);
  animation: raPopIn .25s ease;
}
.ra-ld-pop-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.ra-ld-pop-head i {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--c);
}
.ra-ld-pop-x {
  margin-left: auto;
  width: 28px;
  height: 28px;
  font-size: 13px;
  color: var(--muted);
  border-radius: 8px;
}
.ra-ld-pop-x:hover {
  background: var(--bg);
}
.ra-ld-pop-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}
.ra-ld-pop-grid div {
  padding: 8px 10px;
  background: var(--bg);
  border-radius: 10px;
}
.ra-ld-pop-grid span {
  display: block;
  font-size: 11.5px;
  color: var(--muted);
}
.ra-ld-pop-grid b {
  display: block;
  margin-top: 2px;
  font-size: 17px;
  color: var(--c);
}
/* ===== colleges table ===== */ .ra-table-wrap {
  overflow-x: auto;
  margin: 0 -4px;
  padding: 0 4px;
}
.ra-table {
  width: 100%;
  min-width: 460px;
  border-collapse: collapse;
  font-size: 12px;
}
.ra-table th {
  padding: 10px 6px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  background: #f8f9fd;
}
.ra-table td {
  padding: 12px 6px;
  border-bottom: 1px solid var(--line);
}
.ra-table tbody tr {
  transition: background .2s;
}
.ra-table tbody tr:hover {
  background: #f6f4ff;
}
.ra-college {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}
.ra-college i {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-style: normal;
  font-size: 13px;
  background: #e4ecff;
  border-radius: 50%;
}
.ra-table td.up {
  color: var(--green);
  font-weight: 600;
  white-space: nowrap;
}
.ra-table td.up em {
  font-style: normal;
  margin-left: 6px;
}
/* ===== bars ===== */ .ra-bars {
  display: flex;
  flex-direction: column;
  gap: 17px;
}
.ra-bar-row {
  display: grid;
  grid-template-columns: clamp(96px, 38%, 150px) 1fr 34px;
  align-items: center;
  gap: 10px;
  font-size: 11px;
}
.ra-bar-name {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ra-bar-row b {
  text-align: right;
  font-weight: 700;
}
.ra-bar-track {
  height: 9px;
  overflow: hidden;
  background: #eef0f8;
  border-radius: 99px;
}
.ra-bar-track.thin {
  height: 7px;
}
.ra-bar-row.demand {
  animation: raSlide .6s backwards;
  transition: transform .25s;
}
.ra-bar-row.demand:hover {
  transform: translateX(4px);
}
.ra-bar-row.demand .ra-bar-name {
  transition: color .2s;
}
.ra-bar-row.demand:hover .ra-bar-name {
  color: var(--primary);
}
.ra-bar-row.demand .ra-bar-fill {
  position: relative;
  overflow: hidden;
}
.ra-bar-row.demand .ra-bar-fill::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%);
  transform: translateX(-130%);
  animation: raShine 3.6s ease-in-out infinite;
  animation-delay: var(--sd, 1.2s);
}
.ra-bar-row.demand:hover .ra-bar-fill {
  filter: brightness(1.12);
}
.ra-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-2));
  border-radius: 99px;
  transition: width 1.1s cubic-bezier(.2,.8,.2,1);
}
/* ===== district + map ===== */ .ra-district {
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 12px;
}
.ra-tamilnadu-map {
  display: block;
  width: 100%;
  height: 250px;
  max-height: 250px;
  overflow: visible;
}
.ra-tamilnadu-map.big {
  height: 380px;
  max-height: 380px;
}
.ra-tn-shape {
  fill: url(#raTnFill);
  stroke: #9b8be9;
  stroke-width: 1.4;
  stroke-linejoin: round;
}
.ra-tn-lines {
  fill: none;
  stroke: #fff;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: .75;
}
.ra-pin {
  cursor: default;
}
.ra-pin-body {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  filter: drop-shadow(0 2px 2px rgba(60,50,150,.3));
  animation: raPinBlink 1.8s ease-in-out infinite;
  animation-delay: var(--pd, 0s);
}
.ra-pin-ripple {
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: raPinRipple 1.8s ease-out infinite;
  animation-delay: var(--pd, 0s);
}
.ra-pin-label {
  fill: #3f3597;
  font-size: 7.5px;
  font-weight: 700;
  paint-order: stroke;
  stroke: #f8f7ff;
  stroke-width: 2.4px;
  stroke-linejoin: round;
  pointer-events: none;
}
@keyframes raPinBlink {
  0%, 100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: .35;
    transform: translateY(-2px) scale(1.08);
  }
}
@keyframes raPinRipple {
  0% {
    transform: scale(.4);
    opacity: .6;
  }
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}
.ra-rank {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.ra-rank li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  font-size: 12px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 9px;
  transition: transform .25s, border-color .25s;
}
.ra-rank li:hover {
  transform: translateX(4px);
  border-color: var(--primary-2);
}
.ra-rank span {
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 11px;
  color: var(--primary);
  background: #ece9ff;
  border-radius: 50%;
}
.ra-rank em {
  flex: 1;
  font-style: normal;
  font-weight: 600;
}
.ra-rank b {
  color: var(--muted);
}
.ra-viewall {
  display: block;
  margin: 14px 0 0 auto;
  padding: 4px 2px;
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  background: none;
  transition: transform .2s;
}
.ra-viewall:hover {
  transform: translateX(4px);
}
/* ===== leaderboard ===== */ .ra-board {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ra-board li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #fafbff;
  border: 1px solid var(--line);
  border-radius: 10px;
  transition: transform .25s, background .25s;
}
.ra-board li:hover {
  transform: translateX(5px);
  background: #f2f0ff;
}
.ra-rank-no {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 800;
  border-radius: 50%;
}
.ra-rank-no.n1 {
  color: #f59300;
  background: #ffecc8;
}
.ra-rank-no.n2 {
  color: var(--blue);
  background: #dcecff;
}
.ra-rank-no.n3 {
  color: #e8742a;
  background: #ffe5d2;
}
.ra-rank-no.n4, .ra-rank-no.n5 {
  color: var(--primary);
  background: #ece9ff;
}
.ra-board-body {
  flex: 1;
  min-width: 0;
}
.ra-board-top {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 7px;
  font-size: 11px;
}
.ra-board-top strong {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ra-board-top small {
  flex-shrink: 0;
}
.ra-board li > b {
  font-size: 11px;
  color: var(--muted);
}
/* ===== insights ===== */ .ra-card.plain-icon .ra-card-icon {
  background: none;
  font-size: 18px;
}
.ra-insights {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ra-insights li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #fafbff;
  border: 1px solid var(--line);
  border-radius: 12px;
  cursor: pointer;
  transition: transform .25s, background .25s, box-shadow .25s;
}
.ra-insights li:hover {
  transform: translateY(-3px);
  background: #f2f0ff;
  box-shadow: 0 8px 18px rgba(40,50,110,.08);
}
.ra-insights .ra-badge {
  width: 38px;
  height: 38px;
  font-size: 16px;
}
.ra-insights li > div {
  flex: 1;
  min-width: 0;
}
.ra-insights strong {
  display: block;
  font-size: 12px;
}
.ra-insights small {
  font-size: 11px;
}
.ra-insights em {
  font-style: normal;
  font-size: 20px;
  color: var(--muted);
  transition: transform .2s;
}
.ra-insights li:hover em {
  transform: translateX(4px);
  color: var(--primary);
}
/* ===== download bar ===== */ .ra-download {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  padding: 20px 24px;
  background: linear-gradient(135deg, #eeebff, #f6f4ff);
  border: 1px solid #e0dcff;
  border-radius: 14px;
  animation: raFadeUp .7s .4s both;
}
.ra-download-icon {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 26px;
  background: #e4e0ff;
  border-radius: 14px;
  animation: raFloat 3s ease-in-out infinite;
}
.ra-download-text {
  flex: 1;
  min-width: 220px;
}
.ra-download-text strong {
  display: block;
  margin-bottom: 4px;
  font-size: 15px;
}
.ra-download-text small {
  font-size: 12px;
}
.ra-download-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
/* ===== modal (View all) ===== */ .ra-modal-back {
  overscroll-behavior: contain;
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 18px;
  background: rgba(12, 22, 50, .55);
  backdrop-filter: blur(6px);
  animation: raFadeIn .25s both;
}
.ra-modal {
  width: 100%;
  max-width: 760px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 30px 70px rgba(10, 20, 60, .35);
  animation: raPop .4s cubic-bezier(.2,.9,.3,1.1) both;
}
.ra-modal-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 22px 14px;
  border-bottom: 1px solid var(--line);
}
.ra-modal-head h3 {
  font-size: 17px;
  font-weight: 800;
  color: #1d1a63;
}
.ra-modal-head p {
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--muted);
}
.ra-modal-close {
  width: 36px;
  height: 36px;
  font-size: 14px;
  color: var(--muted);
  background: #f1f2f9;
  border-radius: 50%;
  transition: transform .25s, background .25s, color .25s;
}
.ra-modal-close:hover {
  color: #fff;
  background: var(--red);
  transform: rotate(90deg);
}
.ra-modal-sums {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px 22px 0;
}
.ra-modal-sums div {
  padding: 12px 14px;
  background: #f6f5ff;
  border-radius: 12px;
}
.ra-modal-sums small {
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
}
.ra-modal-sums b {
  font-size: 20px;
  color: #1d1a63;
}
.ra-modal-body {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 18px;
  padding: 18px 22px 22px;
  overflow-y: auto;
}
.ra-modal-map {
  display: grid;
  place-items: center;
  align-self: start;
  padding: 14px 10px;
  background: #f8f7ff;
  border-radius: 14px;
}
.ra-modal-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ra-modal-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #fafbff;
  border: 1px solid var(--line);
  border-radius: 12px;
  transition: transform .25s, background .25s;
  animation: raSlide .5s both;
}
.ra-modal-list li:hover {
  transform: translateX(5px);
  background: #f2f0ff;
}
.ra-modal-list .no {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  background: #ece9ff;
  border-radius: 50%;
}
.ra-modal-list .info {
  flex: 1;
  min-width: 0;
}
.ra-modal-list .row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 12px;
}
.ra-modal-list .end {
  text-align: right;
}
.ra-modal-list .end b {
  display: block;
  font-size: 13px;
}
.ra-modal-list .end em {
  font-style: normal;
  font-size: 11px;
  font-weight: 600;
  color: var(--green);
}
/* ===== responsive ===== */ @media (max-width: 1180px) {
  .ra-stats {
    grid-template-columns: repeat(3, 1fr);
  }
  .ra-row.three {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 980px) {
  .ra-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    transition: transform .35s cubic-bezier(.4,0,.2,1);
  }
  .ra-sidebar.open {
    transform: none;
    box-shadow: 12px 0 40px rgba(0,0,0,.35);
  }
  .ra-overlay {
    position: fixed;
    inset: 0;
    z-index: 55;
    display: block;
    background: rgba(10,20,50,.5);
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s;
  }
  .ra-overlay.show {
    opacity: 1;
    pointer-events: auto;
  }
  .ra-burger {
    display: grid;
    place-items: center;
  }
  .ra-content {
    padding: 16px 18px 28px;
  }
}
@media (max-width: 760px) {
  .ra-row.three {
    grid-template-columns: 1fr;
  }
  .ra-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .ra-topbar {
    padding: 10px 16px;
  }
  .ra-title h1 {
    font-size: 22px;
  }
  .ra-actions {
    width: 100%;
  }
  .ra-modal-body {
    grid-template-columns: 1fr;
  }
  .ra-tamilnadu-map.big {
    height: 300px;
    max-height: 300px;
  }
}
@media (max-width: 520px) {
  .ra-content {
    padding: 14px 12px 24px;
  }
  .ra-profile-copy, .ra-profile-chev {
    display: none;
  }
  .ra-stat {
    padding: 14px;
  }
  .ra-stat h2 {
    font-size: 23px;
  }
  .ra-bar-row {
    grid-template-columns: 110px 1fr 32px;
  }
  .ra-district {
    grid-template-columns: 1fr;
  }
  .ra-btn {
    flex: 1;
    padding: 0 14px;
  }
  .ra-download-btns {
    width: 100%;
  }
  .ra-modal-sums {
    grid-template-columns: 1fr;
  }
  .ra-modal-sums div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ra-modal-sums small {
    margin: 0;
  }
}
@media (max-width: 640px) {
  .ra-checks {
    grid-template-columns: 1fr;
  }
  .ra-actions .ra-dl {
    flex: 1;
  }
  .ra-custom, .ra-modal-head {
    padding-left: 16px;
    padding-right: 16px;
  }
}
@media (max-width: 360px) {
  .ra-stats {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 380px) {
  .ra-title h1 {
    font-size: 20px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .ra-app * {
    animation: none !important;
    transition: none !important;
  }
}
`;