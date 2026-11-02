import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* ============================================================================
   COLLEGE DASHBOARD + STUDENT LEADS  (ONE FILE, TWO ROUTES)
   App.jsx:  <Route path="/college/dashboard" element={<CollegeDashboard />} />
             <Route path="/college/leads"     element={<CollegeDashboard />} />
   (the same component shows the dashboard on /college/dashboard and the full leads page on /college/leads)
   Glass bento layout · aurora background · lots of animations · fully responsive · LIVE data from backend
   (auto-refresh every 15s + optional realtime stream, new-lead alerts, rolling number animations)

   BACKEND CONNECTION  (change only the 3 lines below)
   1) .env  ->  VITE_API_URL=http://localhost:5000
   2) GET  {API}/api/college/dashboard          -> stats, leads, courses, activity of the LOGGED-IN college
   3) POST {API}/api/college/students/:id/unlock -> unlock a student profile (₹100)  [backend must verify payment]
   Auth: sends "Authorization: Bearer <token>" from the saved login session (+ cookies).
   If the backend is not reachable, SAMPLE data is shown with a small "Sample data" tag,
   and the page switches to real data automatically as soon as the API answers.

   Expected JSON (extra / missing fields are fine, common alternate names are also read):
   {
     "college":   { "name": "...", "district": "...", "state": "...", "code": "...", "logo": "...", "verified": true },
     "plan":      { "name": "Gold", "expiresAt": "2027-03-01" },
     "stats":     { "totalInterested": 125, "newLeads": 23, "profilesPurchased": 18, "totalSpent": 1800 },
     "listing":   { "profileViews": 1840, "searchAppearances": 5320, "profileCompletion": 78 },
     "leads":     [ { "studentId": "STU10234", "name": "Keerthi", "course": "B.Tech CSE", "location": "Coimbatore",
                      "percentage": 82, "status": "New", "unlocked": false } ],
     "courses":   [ { "name": "B.Tech CSE", "leads": 42, "seats": 120 } ],
     "activities":[ { "title": "New student lead", "text": "Keerthi showed interest", "time": "2 min ago" } ]
   }
   ============================================================================ */

const API_BASE = (import.meta.env && import.meta.env.VITE_API_URL) || "http://localhost:5000";
const DASHBOARD_PATH = "/api/college/dashboard";
const UNLOCK_PATH = (id) => `/api/college/students/${encodeURIComponent(id)}/unlock`;

/* LIVE UPDATES
   - POLL_MS: the dashboard silently re-fetches {DASHBOARD_PATH} every N ms while the tab is open (works with any backend).
   - STREAM_PATH: OPTIONAL realtime push (Server-Sent Events). If your backend exposes it, every event it sends
     triggers an instant refresh. If it does not exist, nothing breaks - polling keeps the data live. */
const POLL_MS = 15000;
const STREAM_PATH = "/api/college/stream";
/* OPTIONAL full list of leads for the Student Leads view (falls back to the "leads" inside the dashboard answer) */
const LEADS_PATH = "/api/college/leads";

/* where the buttons go (add these routes in App.jsx when those pages are ready) */
const ROUTES = {
  profile: "/college/profile",
  leads: "/college/leads",
  courses: "/college/courses",
  plans: "/college/home?view=plans",
  home: "/college/home",
  login: "/college/register?mode=login",
};

/* UI SCALE: every px in the CSS (sizes, fonts, breakpoints) and every icon is multiplied by this number.
   0.8 = comfortable on laptops (1366-1920px). Use 0.67 for a more compact look or 1 for bigger. */
const UI_SCALE = 0.8;
const scaleCache = new Map();
const scalePx = (css) => {
  if (!scaleCache.has(css)) {
    scaleCache.set(css, css.replace(/(\d*\.?\d+)px/g, (_, n) => `${Math.round(parseFloat(n) * UI_SCALE * 100) / 100}px`));
  }
  return scaleCache.get(css);
};

/* ---------------- login session (same as the college home page) ---------------- */
const SESSION_KEY = "campusconnect_college_session";
const AFTER_LOGIN_KEY = "campusconnect_after_login";
const LOGOUT_ALSO_CLEAR = []; // extra localStorage keys your login saves (so Logout wipes them too)

const sessionGone = (x) => {
  if (!x) return false;
  const n = typeof x === "number" ? x : Number(x);
  const ms = Number.isFinite(n) ? (n < 1e12 ? n * 1000 : n) : Date.parse(x);
  return Number.isFinite(ms) && ms <= Date.now();
};

function parseSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const v = raw.trim();
    if (["", "null", "undefined", "false", "0", "{}", "[]"].includes(v)) return null;
    let data = v;
    try { data = JSON.parse(v); } catch { /* plain token string */ }
    if (data === null || data === false) return null;
    if (typeof data === "object") {
      if (Object.keys(data).length === 0) return null;
      if (sessionGone(data.expiresAt || data.expires || data.exp)) return null;
    }
    const token = typeof data === "string" ? data : data.token || data.accessToken || data.jwt;
    if (typeof token === "string" && token.split(".").length === 3) {
      try {
        const b = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(b + "=".repeat((4 - (b.length % 4)) % 4)));
        if (sessionGone(payload.exp)) return null;
      } catch { /* not a readable JWT: keep as logged in */ }
    }
    return data;
  } catch {
    return null;
  }
}

const tokenOf = (s) => (typeof s === "string" ? s : (s && (s.token || s.accessToken || s.jwt || (s.user && s.user.token))) || "");

/* college info saved at login (used until the live data arrives) */
function collegeFromSession(s) {
  const none = { name: "Your College", place: "", code: "", logo: "", verified: false };
  if (!s || typeof s !== "object") return none;
  const src = { ...s, ...(s.user || {}), ...(s.profile || {}), ...(s.college || {}) };
  const pick = (...keys) => {
    for (const k of keys) {
      const v = src[k];
      if (typeof v === "string" && v.trim()) return v.trim();
      if (typeof v === "number") return String(v);
    }
    return "";
  };
  const code = pick("collegeCode", "code", "collegeId", "college_id", "regNo");
  return {
    name: pick("collegeName", "college_name", "instituteName", "institutionName", "name") || none.name,
    place: [pick("district", "city"), pick("state")].filter(Boolean).join(", "),
    code: code.length <= 16 ? code : "",
    logo: pick("logo", "logoUrl", "logo_url", "photo", "image"),
    verified: src.verified === true || src.isVerified === true || ["verified", "approved", "active"].includes(String(src.status || "").toLowerCase()),
  };
}

/* ---------------- backend answer -> one clean shape ---------------- */
const num = (...v) => {
  for (const x of v) {
    const n = typeof x === "string" ? Number(x.replace(/[₹,%\s,]/g, "")) : x;
    if (typeof n === "number" && Number.isFinite(n)) return n;
  }
  return 0;
};
const str = (...v) => {
  for (const x of v) if (typeof x === "string" && x.trim()) return x.trim();
  return "";
};

function normalize(raw) {
  const d = (raw && (raw.data || raw)) || {};
  const s = d.stats || d.summary || d;
  const l = d.listing || d.performance || d.profileStats || d;
  const c = d.college || d.profile || {};
  const plan = d.plan || d.subscription || {};
  const place = [str(c.district, c.city), str(c.state)].filter(Boolean).join(", ");
  return {
    college: {
      name: str(c.collegeName, c.college_name, c.name),
      place,
      code: str(String(c.code || c.collegeCode || c.id || "")),
      logo: str(c.logo, c.logoUrl, c.logo_url),
      verified: c.verified === true || c.isVerified === true || ["verified", "approved", "active"].includes(String(c.status || c.verificationStatus || "").toLowerCase()),
    },
    plan: { name: str(typeof plan === "string" ? plan : plan.name || plan.plan), expiresAt: str(plan.expiresAt, plan.expiry, plan.endDate) },
    stats: {
      interested: num(s.totalInterested, s.interested, s.totalStudentsInterested, s.total_interested),
      newLeads: num(s.newLeads, s.newStudents, s.new_leads),
      purchased: num(s.profilesPurchased, s.purchased, s.purchasedProfiles, s.profiles_purchased),
      spent: num(s.totalSpent, s.amountSpent, s.totalAmountSpent, s.total_spent),
    },
    listing: {
      views: num(l.profileViews, l.views, l.profile_views),
      appearances: num(l.searchAppearances, l.impressions, l.search_appearances),
      completion: Math.min(100, Math.max(0, num(l.profileCompletion, l.completion, l.profile_completion))),
    },
    leads: (d.leads || d.recentLeads || d.students || []).map((x, i) => ({
      id: str(String(x.studentId || x.student_id || x.id || `L${i}`)),
      name: str(x.name, x.studentName, x.fullName) || "Student",
      course: str(x.course, x.preferredCourse, x.interestedCourse) || "—",
      location: str(x.location, x.district, x.city) || "—",
      score: x.percentage != null || x.twelfthPercentage != null || x.score != null ? `${num(x.percentage, x.twelfthPercentage, x.score)}%` : "—",
      status: str(x.status) || "New",
      unlocked: x.unlocked === true || x.purchased === true || x.isUnlocked === true,
    })),
    courses: (d.courses || d.courseDemand || []).map((x) => {
      const leads = num(x.leads, x.interested, x.enquiries);
      const seats = num(x.seats, x.availableSeats, x.totalSeats);
      return { name: str(x.name, x.courseName, x.course) || "Course", leads, seats, progress: x.progress != null ? num(x.progress) : seats ? Math.min(100, Math.round((leads / seats) * 100)) : 0 };
    }),
    trend: (d.trend || d.weekly || d.last7Days || []).map((x) => ({
      label: str(x.label, x.day, x.date),
      interested: num(x.interested, x.leads, x.count),
      purchased: num(x.purchased, x.unlocked),
    })),
    activities: (d.activities || d.recentActivity || d.activity || []).map((x) => ({
      title: str(x.title, x.type) || "Update",
      text: str(x.text, x.message, x.description),
      time: str(x.time, x.timeAgo, x.createdAt),
    })),
  };
}

const EMPTY = normalize({});

/* SAMPLE data, shown only while the backend is not reachable.
   It is generated from the logged-in college's name, so every college sees its OWN different numbers
   (once the backend answers, the real numbers of that college replace it). */
function hashStr(t) {
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const NAMES = ["Keerthi", "Rahul K", "Ananya R", "Arun P", "Priya S", "Karthik M", "Divya L", "Vignesh T", "Meena S", "Suresh B", "Harini V", "Naveen R", "Sneha G", "Deepak J", "Lakshmi N"];
const COURSE_POOL = ["B.Tech CSE", "B.Tech IT", "B.Tech ECE", "B.Tech AI & DS", "BCA", "B.Sc CS", "B.Com", "MBA", "B.Tech Mechanical", "B.Sc Maths"];
const CITIES = ["Coimbatore", "Chennai", "Erode", "Salem", "Madurai", "Tiruppur", "Trichy", "Namakkal"];
const PLAN_POOL = ["Elite", "Gold", "Diamond"];

function makeSample() {
  const c = collegeFromSession(parseSession());
  const r = rng(hashStr(`${c.name}|${c.code}`));
  const ri = (a, b) => Math.round(a + r() * (b - a));
  const pick = (arr) => arr[Math.floor(r() * arr.length)];
  const shuffle = (arr) => arr.map((v) => [r(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);

  const interested = ri(60, 420);
  const purchased = ri(Math.round(interested * 0.08), Math.round(interested * 0.35));
  const newLeads = ri(8, Math.max(12, Math.round(interested * 0.25)));
  const leads = shuffle(NAMES).slice(0, 5).map((name, i) => ({
    id: `STU${10200 + ri(10, 899)}`,
    name,
    course: pick(COURSE_POOL),
    location: pick(CITIES),
    score: `${ri(62, 96)}%`,
    status: pick(["New", "New", "Interested", "Contacted"]),
    unlocked: i % 3 === 2,
  }));
  const courses = shuffle(COURSE_POOL).slice(0, 4).map((name) => {
    const l = ri(8, Math.max(14, Math.round(interested * 0.4)));
    const seats = ri(60, 180);
    return { name, leads: l, seats, progress: Math.min(100, Math.round((l / seats) * 100)) };
  }).sort((a, b) => b.leads - a.leads);
  const trend = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(Date.now() - (6 - i) * 864e5);
    const it = ri(3, Math.max(8, Math.round(interested / 9)));
    return { label: day.toLocaleDateString("en-IN", { weekday: "short" }), interested: it, purchased: ri(0, Math.max(1, Math.round(it / 3))) };
  });
  return {
    college: { name: "", place: "", code: "", logo: "", verified: false },
    plan: { name: pick(PLAN_POOL), expiresAt: "" },
    stats: { interested, newLeads, purchased, spent: purchased * 100 },
    listing: { views: ri(600, 4800), appearances: ri(2000, 12000), completion: ri(55, 95) },
    leads,
    courses,
    trend,
    activities: [
      { title: "New student lead", text: `${leads[0].name} showed interest in ${leads[0].course}`, time: "2 min ago" },
      { title: "Profile unlocked", text: `₹100 payment completed for ${leads[2].id}`, time: "24 min ago" },
      { title: "Course updated", text: `${courses[0].name} seats updated to ${courses[0].seats}`, time: "1 hour ago" },
      { title: "New enquiry", text: `A student from ${pick(CITIES)} is interested`, time: "3 hours ago" },
    ],
  };
}

/* ---------------- small helpers ---------------- */
const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const compact = (n) => (n >= 100000 ? `${(n / 100000).toFixed(1)}L` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n));

function useCountUp(target, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

const ICONS = {
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-3a4 4 0 0 1 0 8m4 5v-2a4 4 0 0 0-3-3.87",
  spark: "M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4L12 3Z",
  unlock: "M7 11V8a5 5 0 0 1 9.6-2M5 11h14v10H5V11Zm7 4v2",
  money: "M12 1v22M17 5.5C16.2 4.6 14.7 4 12.8 4 9.8 4 8 5.5 8 7.6c0 2.4 2.2 3.3 4.8 3.9 2.4.6 4.2 1.5 4.2 3.7 0 2.3-2 3.8-5 3.8-2.1 0-3.9-.7-5-2",
  building: "M4 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M2 21h20M8 7h2m2 0h2M8 11h2m2 0h2M8 15h2m2 0h2",
  logout: "M10 17l5-5-5-5m5 5H3m9-9V3h9v18h-9v-2",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6 6 18",
  refresh: "M20 11a8 8 0 0 0-14.9-3M4 4v4h4M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4",
  pin: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0ZM12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  search: "M21 21l-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  check: "m5 12 4 4L19 6",
  lock: "M5 11h14v10H5V11Zm3 0V7a4 4 0 0 1 8 0v4",
  bolt: "M13 2 3 14h8l-1 8 10-12h-8l1-8Z",
  trend: "M3 17l6-6 4 4 8-8M15 7h6v6",
  crown: "M3 18h18l-1.5-9-4.5 4-3-7-3 7-4.5-4L3 18Z",
};
function Icon({ name, size = 18 }) {
  const px = Math.round(size * UI_SCALE * 100) / 100;
  return (
    <svg width={px} height={px} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

function Avatar({ college, className }) {
  const [bad, setBad] = useState(false);
  const ok = college.logo && !bad && /^(https?:|data:image|\/)/.test(college.logo);
  return <div className={className}>{ok ? <img src={college.logo} alt="" onError={() => setBad(true)} /> : (college.name || "C").trim().charAt(0).toUpperCase()}</div>;
}

/* ---------------- animation helpers ---------------- */
/* fade/slide in when the card scrolls into view */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* typewriter text */
function useTyped(text, speed = 38) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    if (!text) return undefined;
    const t = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return text.slice(0, n);
}

/* glass card: reveal on scroll + cursor spotlight + optional 3D tilt */
function Glass({ className = "", delay = 0, tilt = false, children }) {
  const ref = useReveal();
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      el.style.setProperty("--rx", `${(y / r.height - 0.5) * -9}deg`);
      el.style.setProperty("--ry", `${(x / r.width - 0.5) * 9}deg`);
    }
  };
  const leave = () => {
    const el = ref.current;
    if (el && tilt) { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); }
  };
  return (
    <div ref={ref} className={`cd-glass ${tilt ? "tilt" : ""} ${className}`} style={{ "--d": `${delay}s` }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </div>
  );
}

/* counts smoothly from the previous value to the new one (so live updates "roll" instead of jumping) */
function useRoll(target, ms = 900) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    let raf;
    const start = from.current;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      const cur = Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3)));
      from.current = cur;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* returns "flash" for ~1.2s every time the value changes (not on first render) */
function useFlash(value) {
  const prev = useRef(value);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (prev.current === value) return undefined;
    prev.current = value;
    setOn(true);
    const t = setTimeout(() => setOn(false), 1300);
    return () => clearTimeout(t);
  }, [value]);
  return on;
}

function Num({ v, prefix = "" }) {
  const shown = useRoll(v, 1100);
  const flash = useFlash(v);
  return <span className={`cd-num ${flash ? "flash" : ""}`}>{prefix}{shown.toLocaleString("en-IN")}</span>;
}

/* "Updated 12s ago" - re-renders every second */
function useAgo(ts) {
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);
  if (!ts) return "";
  const s = Math.max(0, Math.round((Date.now() - ts) / 1000));
  return s < 5 ? "just now" : s < 60 ? `${s}s ago` : `${Math.floor(s / 60)}m ago`;
}

/* floating glowing particles inside the hero */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  size: 4 + ((i * 7) % 9),
  dur: 7 + ((i * 5) % 9),
  delay: -((i * 3) % 11),
}));
function Particles() {
  return (
    <div className="cd-particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <i key={i} style={{ left: p.left, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
}

/* click ripple for any button with data-ripple */
function useRipple() {
  useEffect(() => {
    const onDown = (e) => {
      const b = e.target.closest && e.target.closest("button");
      if (!b || b.disabled) return;
      const r = b.getBoundingClientRect();
      const s = document.createElement("span");
      const size = Math.max(r.width, r.height) * 1.6;
      s.className = "cd-ripple";
      s.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      if (getComputedStyle(b).position === "static") b.style.position = "relative";
      b.style.overflow = "hidden";
      b.appendChild(s);
      setTimeout(() => s.remove(), 700);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);
}

/* first-load skeleton */
function Skeleton() {
  return (
    <div className="cd-skel" aria-hidden="true">
      <div className="cd-skel-tiles">{[0, 1, 2, 3].map((i) => <div key={i} className="cd-shimmer" style={{ animationDelay: `${i * 0.12}s` }} />)}</div>
      <div className="cd-skel-row"><div className="cd-shimmer" /><div className="cd-shimmer" /></div>
    </div>
  );
}

function Spark({ vals, color }) {
  if (!vals || vals.length < 2) return <div className="cd-spark-empty" />;
  const W = 120, H = 38;
  const max = Math.max(1, ...vals);
  const pts = vals.map((v, i) => [(i * (W - 6)) / (vals.length - 1) + 3, H - 4 - (v / max) * (H - 10)]);
  const dPath = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <svg className="cd-spark" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <path d={dPath} pathLength="1" className="cd-spark-line" style={{ stroke: color }} />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3.5" fill={color} className="cd-spark-dot" />
    </svg>
  );
}

function Tile({ icon, tone, label, value, prefix, delay, children }) {
  return (
    <Glass className={`cd-tile cd-${tone}`} delay={delay} tilt>
      <div className="cd-tile-top">
        <span className="cd-tile-icon"><Icon name={icon} size={20} /></span>
        <span className="cd-tile-label">{label}</span>
      </div>
      <div className="cd-tile-value"><Num v={value} prefix={prefix} /></div>
      <div className="cd-tile-foot">{children}</div>
    </Glass>
  );
}

/* big orbiting gauge in the hero */
function Orbit({ rate }) {
  const r = 78;
  const c = 2 * Math.PI * r;
  const shown = useRoll(rate, 1400);
  return (
    <div className="cd-orbit">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <linearGradient id="cdOrb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fde68a" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <g className="cd-orb-spin"><circle cx="100" cy="100" r="94" className="cd-orb-dash" /></g>
        <circle cx="100" cy="100" r={r} className="cd-orb-bg" />
        <circle cx="100" cy="100" r={r} className="cd-orb-fg" strokeDasharray={c} strokeDashoffset={c - (c * Math.min(100, rate)) / 100} />
        <g className="cd-orb-rot a"><circle cx="100" cy="6" r="5" fill="#fde68a" /></g>
        <g className="cd-orb-rot b"><circle cx="100" cy="22" r="3.5" fill="#fff" /></g>
        <g className="cd-orb-rot c"><circle cx="100" cy="194" r="4" fill="#67e8f9" /></g>
      </svg>
      <div className="cd-orb-text"><b>{shown}%</b><span>purchase rate</span></div>
    </div>
  );
}

function Ring({ value, label = "complete" }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const shown = useRoll(value, 1200);
  return (
    <div className="cd-ring">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="cdRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1558d6" />
            <stop offset="1" stopColor="#19b3e6" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} className="cd-ring-bg" />
        <circle cx="50" cy="50" r={r} className="cd-ring-fg" strokeDasharray={c} strokeDashoffset={c - (c * value) / 100} />
      </svg>
      <div className="cd-ring-text"><b>{shown}%</b><span>{label}</span></div>
    </div>
  );
}

/* 7-day chart with hover crosshair + tooltip */
function TrendChart({ data }) {
  const W = 640, H = 240, padL = 34, padR = 14, padT = 18, padB = 30;
  const [hover, setHover] = useState(-1);
  const max = Math.max(5, ...data.map((d) => d.interested), ...data.map((d) => d.purchased));
  const top = Math.ceil(max / 5) * 5;
  const x = (i) => padL + (i * (W - padL - padR)) / Math.max(1, data.length - 1);
  const y = (v) => padT + (1 - v / top) * (H - padT - padB);
  const line = (k) => data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(d[k]).toFixed(1)}`).join(" ");
  const area = `${line("interested")} L${x(data.length - 1)} ${H - padB} L${x(0)} ${H - padB} Z`;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - padL) / (W - padL - padR)) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };
  const h = hover >= 0 ? data[hover] : null;
  return (
    <div className="cd-chart-box">
      <svg className="cd-chart" viewBox={`0 0 ${W} ${H}`} onMouseMove={onMove} onMouseLeave={() => setHover(-1)} role="img" aria-label="Last 7 days: interested and purchased students">
        <defs>
          <linearGradient id="cdArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1558d6" stopOpacity=".35" />
            <stop offset="1" stopColor="#1558d6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cdLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1558d6" />
            <stop offset="1" stopColor="#19b3e6" />
          </linearGradient>
        </defs>
        {[0, 0.5, 1].map((t) => (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y(top * t)} y2={y(top * t)} className="cd-grid-line" />
            <text x={padL - 8} y={y(top * t) + 4} textAnchor="end" className="cd-axis">{Math.round(top * t)}</text>
          </g>
        ))}
        <path d={area} fill="url(#cdArea)" className="cd-area" />
        <path d={line("interested")} className="cd-line blue" pathLength="1" />
        <path d={line("purchased")} className="cd-line green" pathLength="1" />
        {hover >= 0 && <line x1={x(hover)} x2={x(hover)} y1={padT} y2={H - padB} className="cd-cross" />}
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(d.interested)} r={hover === i ? 7 : 4.5} className="cd-pt blue" style={{ animationDelay: `${0.8 + i * 0.08}s` }} />
            <circle cx={x(i)} cy={y(d.purchased)} r={hover === i ? 7 : 4.5} className="cd-pt green" style={{ animationDelay: `${0.9 + i * 0.08}s` }} />
            <text x={x(i)} y={H - 8} textAnchor="middle" className="cd-axis">{d.label}</text>
          </g>
        ))}
      </svg>
      {h && (
        <div className="cd-tip" style={{ left: `${(x(hover) / W) * 100}%` }}>
          <b>{h.label}</b>
          <span className="blue">{h.interested} interested</span>
          <span className="green">{h.purchased} purchased</span>
        </div>
      )}
    </div>
  );
}

const PALETTE = ["#1558d6", "#19b3e6", "#7c3aed", "#10b981", "#f59e0b", "#ef4444"];

function Donut({ items }) {
  const [hi, setHi] = useState(-1);
  const total = items.reduce((a, c) => a + c.leads, 0);
  let acc = 0;
  return (
    <div className="cd-donut-wrap">
      <div className="cd-donut">
        <svg viewBox="0 0 42 42" aria-hidden="true">
          <circle cx="21" cy="21" r="15.9155" className="cd-donut-bg" />
          {total > 0 && items.map((c, i) => {
            const pct = (c.leads / total) * 100;
            const off = 25 - acc;
            acc += pct;
            return (
              <circle key={c.name} cx="21" cy="21" r="15.9155" className="cd-seg" onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(-1)}
                style={{ stroke: PALETTE[i % PALETTE.length], strokeDasharray: `${Math.max(0, pct - 0.8)} ${100 - Math.max(0, pct - 0.8)}`, strokeDashoffset: off, opacity: hi < 0 || hi === i ? 1 : 0.28, animationDelay: `${i * 0.15}s` }} />
            );
          })}
        </svg>
        <div className="cd-donut-text"><b>{hi >= 0 ? items[hi].leads : total}</b><span>{hi >= 0 ? items[hi].name : "total leads"}</span></div>
      </div>
      <ul className="cd-legendlist">
        {items.map((c, i) => (
          <li key={c.name} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(-1)} className={hi === i ? "on" : ""}>
            <i style={{ background: PALETTE[i % PALETTE.length] }} />
            <span>{c.name}</span>
            <b>{c.leads}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

const CONFETTI_COLORS = ["#1558d6", "#19b3e6", "#fbbf24", "#10b981", "#a78bfa", "#fb7185"];
const makeConfetti = () => Array.from({ length: 34 }, (_, i) => ({
  tx: (Math.random() - 0.5) * 760,
  ty: -(120 + Math.random() * 380),
  rot: Math.random() * 900 - 450,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  delay: Math.random() * 0.15,
}));

const FILTERS = ["All", "New", "Interested", "Contacted", "Unlocked"];

/* ============ STUDENT LEADS VIEW (route: /college/leads) ============ */
const SORTS = [["recent", "Newest first"], ["score", "Highest 12th %"], ["name", "Name A-Z"]];

function LeadsView({ d, college, live, loading, ago, counts, leads, query, setQuery, filter, setFilter, sort, setSort, busyId, unlock, freshIds, rate, back }) {
  return (
    <>
      <section className="cl-hero">
        <div className="cd-hero-blobs" aria-hidden="true"><i /><i /><i /></div>
        <Particles />
        <div className="cl-hero-in">
          <button className="cl-back" onClick={back}><span className="cl-back-arrow"><Icon name="arrow" size={16} /></span>Dashboard</button>
          <div className="cl-hero-row">
            <span className="cl-hero-icon"><Icon name="users" size={30} /></span>
            <div>
              <h1>Student leads</h1>
              <p>
                <b><Num v={counts.All} /></b> students are interested in {college.name || "your college"}
                <span className={`cd-live ${live ? "on" : ""}`}><i />{live ? `Live · updated ${ago}` : loading ? "Loading…" : "Sample data"}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cd-tiles cl-tiles">
        <Tile icon="users" tone="blue" label="Total leads" value={counts.All} delay={0}>
          <span className="cl-foot">All interested students</span>
        </Tile>
        <Tile icon="spark" tone="green" label="New leads" value={counts.New} delay={0.08}>
          <span className="cd-pulse"><i />Waiting for you</span>
        </Tile>
        <Tile icon="bolt" tone="amber" label="Interested" value={counts.Interested + counts.Contacted} delay={0.16}>
          <span className="cl-foot">Ready to be contacted</span>
        </Tile>
        <Tile icon="unlock" tone="violet" label="Unlocked" value={counts.Unlocked} delay={0.24}>
          <div className="cd-mini"><div className="cd-bar"><i className="f2" style={{ width: `${Math.min(100, rate)}%` }} /></div><span>{rate}% purchase rate</span></div>
        </Tile>
      </section>

      <Glass className="cd-card cd-leads" delay={0.05}>
        <div className="cl-tools">
          <label className="cd-search">
            <Icon name="search" size={16} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, course, city" aria-label="Search leads" />
          </label>
          <select className="cl-sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort leads">
            {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="cd-filters">
          {FILTERS.map((f) => (
            <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>{f}<em>{counts[f]}</em></button>
          ))}
        </div>

        <div className="cd-lead-grid cl-grid">
          {leads.map((l, i) => {
            const p = parseInt(l.score, 10) || 0;
            const fresh = freshIds.includes(l.id);
            return (
              <article className={`cd-lead cl-card st-${l.status.toLowerCase().replace(/\s+/g, "-")} ${fresh ? "fresh" : ""}`} key={l.id} style={{ animationDelay: `${Math.min(i, 14) * 0.05}s` }}>
                {fresh && <span className="cd-newtag">NEW</span>}
                <div className="cd-lead-top">
                  <div className="cd-score" style={{ "--p": p }}><span>{l.name.charAt(0).toUpperCase()}</span></div>
                  <div className="cd-lead-name"><b>{l.name}</b><small>{l.id}</small></div>
                  <span className={`cd-badge s-${l.status.toLowerCase().replace(/\s+/g, "-")}`}>{l.status}</span>
                </div>
                <div className="cd-lead-info">
                  <span><Icon name="building" size={13} />{l.course}</span>
                  <span><Icon name="pin" size={13} />{l.location}</span>
                  <span className="mark">12th: <b>{l.score}</b></span>
                </div>
                <div className="cl-meter" title={`12th mark ${l.score}`}><i style={{ width: `${p}%` }} /></div>
                {l.unlocked ? (
                  <div className="cd-unlocked"><Icon name="check" size={15} />Details unlocked</div>
                ) : (
                  <button className="cd-unlock" disabled={busyId === l.id} onClick={() => unlock(l)}>
                    <Icon name="unlock" size={15} />{busyId === l.id ? "Please wait…" : "Unlock ₹100"}
                  </button>
                )}
              </article>
            );
          })}
          {!leads.length && !loading && (
            <div className="cd-empty wide">{query || filter !== "All" ? "No leads match your search" : "No leads yet — complete your profile to get discovered"}</div>
          )}
        </div>
      </Glass>
    </>
  );
}

/* ================================ PAGE ================================ */
export default function CollegeDashboard() {
  const routerNavigate = useNavigate();
  const { pathname } = useLocation();
  const isLeads = /\/leads\/?$/.test(pathname);
  const [, setAuthTick] = useState(0);
  const session = parseSession();
  const loggedIn = !!session;
  const leaving = useRef(false);

  const [data, setData] = useState(null); // normalized backend data (or this college's sample)
  const [live, setLive] = useState(false); // true = real backend data
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("recent");
  const [busyId, setBusyId] = useState("");
  const [toast, setToast] = useState("");
  const [confetti, setConfetti] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(0);
  const [freshIds, setFreshIds] = useState([]); // lead ids that just arrived (glow for a few seconds)
  const ctrlRef = useRef(null);
  const knownIds = useRef(null); // lead ids we already showed (null until first real load)
  const liveRef = useRef(false);
  useRipple();

  const say = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2800);
  };

  const goLogin = useCallback(() => {
    try { sessionStorage.setItem(AFTER_LOGIN_KEY, "/college/dashboard"); } catch { /* ignore */ }
    routerNavigate(ROUTES.login, { replace: true });
  }, [routerNavigate]);

  /* guard: only for logged-in colleges */
  useEffect(() => {
    if (!loggedIn && !leaving.current) goLogin();
  }, [loggedIn, goLogin]);

  useEffect(() => {
    const sync = () => setAuthTick((n) => n + 1);
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  const logout = () => {
    leaving.current = true;
    try {
      [SESSION_KEY, ...LOGOUT_ALSO_CLEAR].forEach((k) => localStorage.removeItem(k));
      sessionStorage.removeItem(AFTER_LOGIN_KEY);
    } catch { /* ignore */ }
    routerNavigate(ROUTES.home, { replace: true });
  };

  const authHeaders = useCallback(() => {
    const t = tokenOf(parseSession());
    return { Accept: "application/json", "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) };
  }, []);

  /* load this college's own dashboard data */
  const load = useCallback(async (silent = false) => {
    if (ctrlRef.current) ctrlRef.current.abort();
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;
    if (!silent) setLoading(true);
    try {
      const r = await fetch(`${API_BASE}${DASHBOARD_PATH}`, { signal: ctrl.signal, credentials: "include", headers: authHeaders() });
      if (r.status === 401 || r.status === 403) {
        leaving.current = true;
        try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
        goLogin();
        return;
      }
      if (!r.ok) throw new Error(String(r.status));
      const next = normalize(await r.json());
      if (isLeads) {
        /* the leads page asks for the full list; if that route does not exist we keep the dashboard's leads */
        try {
          const lr = await fetch(`${API_BASE}${LEADS_PATH}`, { signal: ctrl.signal, credentials: "include", headers: authHeaders() });
          if (lr.ok) {
            const lj = await lr.json();
            const full = normalize(Array.isArray(lj) ? { leads: lj } : lj).leads;
            if (full.length) next.leads = full;
          }
        } catch (err) { if (err && err.name === "AbortError") return; }
      }
      /* spot brand-new leads (only after the first real load) -> glow + toast */
      const ids = next.leads.map((l) => l.id);
      if (knownIds.current) {
        const fresh = next.leads.filter((l) => !knownIds.current.has(l.id));
        if (fresh.length) {
          setFreshIds(fresh.map((l) => l.id));
          setTimeout(() => setFreshIds([]), 6000);
          setToast(fresh.length === 1 ? `🔔 New lead: ${fresh[0].name} (${fresh[0].course})` : `🔔 ${fresh.length} new student leads arrived`);
          setTimeout(() => setToast(""), 3500);
        }
      }
      knownIds.current = new Set(ids);
      liveRef.current = true;
      setData(next);
      setLive(true);
      setUpdatedAt(Date.now());
    } catch (e) {
      if (e && e.name === "AbortError") return;
      /* keep what we already have; sample numbers only if we never got real data */
      setData((old) => old || makeSample());
      if (!liveRef.current) setLive(false);
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
    }
  }, [authHeaders, goLogin, isLeads]);

  useEffect(() => {
    if (!loggedIn) return undefined;
    load();
    const again = () => document.visibilityState === "visible" && load(true);
    document.addEventListener("visibilitychange", again);
    window.addEventListener("online", again);

    /* 1) polling: silent refresh every POLL_MS while the tab is visible */
    const poll = setInterval(() => document.visibilityState === "visible" && load(true), POLL_MS);

    /* 2) optional realtime push (SSE): any event from the backend = refresh right now */
    let es;
    let debounce;
    try {
      if (typeof EventSource !== "undefined") {
        const t = tokenOf(parseSession());
        const url = `${API_BASE}${STREAM_PATH}${t ? `?token=${encodeURIComponent(t)}` : ""}`;
        es = new EventSource(url, { withCredentials: true });
        es.onmessage = () => {
          clearTimeout(debounce);
          debounce = setTimeout(() => load(true), 400);
        };
        es.onerror = () => { /* stream not available: polling keeps the page live */ };
      }
    } catch { /* ignore */ }

    return () => {
      document.removeEventListener("visibilitychange", again);
      window.removeEventListener("online", again);
      clearInterval(poll);
      clearTimeout(debounce);
      if (es) es.close();
      if (ctrlRef.current) ctrlRef.current.abort();
    };
  }, [loggedIn, load]);

  /* unlock one student (backend creates/verifies the payment; the frontend never decides) */
  const unlock = async (lead) => {
    setBusyId(lead.id);
    try {
      const r = await fetch(`${API_BASE}${UNLOCK_PATH(lead.id)}`, { method: "POST", credentials: "include", headers: authHeaders() });
      const body = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(body.message || "Could not unlock");
      const pay = body.paymentUrl || body.checkoutUrl;
      if (pay) { window.location.href = pay; return; }
      setConfetti(makeConfetti());
      setTimeout(() => setConfetti(null), 2800);
      say(`${lead.name}'s details unlocked 🎉`);
      load();
    } catch (e) {
      say(live ? e.message || "Could not unlock this profile" : "Connect the backend to unlock profiles");
    } finally {
      setBusyId("");
    }
  };

  const fromSession = useMemo(() => collegeFromSession(session), [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps
  const college = { ...fromSession, ...Object.fromEntries(Object.entries((data && data.college) || {}).filter(([, v]) => v)) };
  const typedName = useTyped(college.name);
  const ago = useAgo(updatedAt);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 16 ? "Good afternoon" : h < 20 ? "Good evening" : "Good night";
  }, []);

  const d = data || EMPTY;
  const rate = d.stats.interested ? Math.round((d.stats.purchased / d.stats.interested) * 100) : 0;

  const counts = useMemo(() => {
    const all = d.leads;
    return {
      All: all.length,
      New: all.filter((l) => l.status.toLowerCase() === "new").length,
      Interested: all.filter((l) => l.status.toLowerCase() === "interested").length,
      Contacted: all.filter((l) => l.status.toLowerCase() === "contacted").length,
      Unlocked: all.filter((l) => l.unlocked).length,
    };
  }, [d]);

  const leads = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = d.leads.filter((l) => {
      if (filter === "Unlocked" ? !l.unlocked : filter !== "All" && l.status.toLowerCase() !== filter.toLowerCase()) return false;
      return !q || `${l.name} ${l.id} ${l.course} ${l.location} ${l.status}`.toLowerCase().includes(q);
    });
    if (sort === "score") list.sort((a, b) => (parseInt(b.score, 10) || 0) - (parseInt(a.score, 10) || 0));
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [d, query, filter, sort]);

  if (!loggedIn) return null;

  const sparkInterested = d.trend.map((t) => t.interested);
  const sparkPurchased = d.trend.map((t) => t.purchased);
  const ticker = d.activities.length ? [...d.activities, ...d.activities] : [];

  return (
    <div className="cd-page">
      <style>{GLOBAL}</style>
      <style>{scalePx(CSS)}</style>

      <div className="cd-bgfx" aria-hidden="true"><i /><i /><i /></div>
      {loading && <div className="cd-progress" aria-hidden="true" />}

      {/* ---------- floating header ---------- */}
      <header className="cd-top">
        <div className="cd-top-in">
          <button className="cd-brand" onClick={() => routerNavigate(ROUTES.home)} aria-label="Home">
            <span className="cd-brand-mark"><Icon name="building" size={20} /></span>
            <span><b>CollegeConnect</b><small>Student Leads • Better Admissions</small></span>
          </button>

          <div className="cd-top-right">
            <button className="cd-icon-btn" onClick={() => load()} aria-label="Refresh" title="Refresh data">
              <span className={loading ? "spin" : ""}><Icon name="refresh" size={18} /></span>
            </button>
            <Avatar college={college} className="cd-top-av" />
            <button className="cd-logout" onClick={logout} aria-label="Logout"><Icon name="logout" size={16} /><span>Logout</span></button>
          </div>
        </div>
      </header>

      <main className="cd-wrap">
        {loading && !data && <Skeleton />}
        {isLeads && (
          <LeadsView d={d} college={college} live={live} loading={loading} ago={ago} counts={counts} leads={leads}
            query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} sort={sort} setSort={setSort}
            busyId={busyId} unlock={unlock} freshIds={freshIds} rate={rate} back={() => routerNavigate("/college/dashboard")} />
        )}
        {!isLeads && (<>
        {/* ---------- hero ---------- */}
        <section className="cd-hero">
          <div className="cd-hero-blobs" aria-hidden="true"><i /><i /><i /></div>
          <Particles />
          <div className="cd-hero-left">
            <div className="cd-hero-top">
              <span className="cd-wave">{greeting} 👋</span>
              <span className={`cd-live ${live ? "on" : ""}`}><i />{loading && !data ? "Loading…" : live ? `Live · updated ${ago}` : "Sample data"}</span>
            </div>
            <div className="cd-hero-row">
              <Avatar college={college} className="cd-hero-av" />
              <h1 aria-label={college.name}>{typedName}<span className="cd-caret" /></h1>
            </div>
            <div className="cd-chips">
              <span className="priv"><Icon name="lock" size={14} />Private dashboard</span>
              {college.place && <span><Icon name="pin" size={14} />{college.place}</span>}
              {college.code && <span>ID: {college.code}</span>}
              {d.plan.name && <span className="gold"><Icon name="crown" size={14} />{d.plan.name} plan</span>}
              {college.verified && <span className="ok"><Icon name="check" size={14} />Verified</span>}
            </div>
            <p className="cd-hero-sum">
              <b><Num v={d.stats.interested} /></b> students are interested in your college and your college has purchased <b><Num v={d.stats.purchased} /></b> student profiles so far.
            </p>
            <div className="cd-hero-actions">
              <button className="cd-cta" onClick={() => routerNavigate(ROUTES.leads)}><Icon name="bolt" size={16} />View student leads</button>
              <button className="cd-ghost" onClick={() => routerNavigate(ROUTES.profile)}>Edit profile</button>
            </div>
          </div>
          <Orbit rate={rate} />
        </section>

        {!live && !loading && (
          <div className="cd-note">
            <span>Backend not connected yet — showing sample numbers for your college. They turn into your real data automatically once <code>{DASHBOARD_PATH}</code> responds.</span>
            <button onClick={() => load()}>Retry</button>
          </div>
        )}

        {ticker.length > 0 && (
          <div className="cd-ticker" aria-label="Recent activity">
            <span className="cd-ticker-tag"><i />LIVE</span>
            <div className="cd-ticker-view">
              <div className="cd-ticker-track">
                {ticker.map((a, i) => (
                  <span key={i}><b>{a.title}</b> {a.text}{a.time ? ` · ${a.time}` : ""}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------- stat tiles ---------- */}
        <section className="cd-tiles">
          <Tile icon="users" tone="blue" label="Students interested" value={d.stats.interested} delay={0}>
            <Spark vals={sparkInterested} color="#1558d6" />
          </Tile>
          <Tile icon="spark" tone="green" label="New student leads" value={d.stats.newLeads} delay={0.08}>
            <span className="cd-pulse"><i />Fresh leads waiting</span>
          </Tile>
          <Tile icon="unlock" tone="violet" label="Profiles purchased" value={d.stats.purchased} delay={0.16}>
            <div className="cd-mini"><div className="cd-bar"><i className="f2" style={{ width: `${Math.min(100, rate)}%` }} /></div><span>{rate}% of interested</span></div>
          </Tile>
          <Tile icon="money" tone="amber" label="Total amount spent" value={d.stats.spent} prefix="₹" delay={0.24}>
            <Spark vals={sparkPurchased} color="#f59e0b" />
          </Tile>
        </section>

        {/* ---------- trend + pipeline ---------- */}
        <section className="cd-row r1">
          <Glass className="cd-card" delay={0.05}>
            <div className="cd-card-head">
              <div><h2>Last 7 days</h2><p>Students interested vs profiles purchased · hover the chart</p></div>
              <div className="cd-legend"><span className="blue">Interested</span><span className="green">Purchased</span></div>
            </div>
            {d.trend.length ? <TrendChart data={d.trend} /> : <div className="cd-empty">Weekly numbers will appear here</div>}
          </Glass>

          <Glass className="cd-card" delay={0.12}>
            <div className="cd-card-head"><div><h2>Admission pipeline</h2><p>From interest to purchase</p></div></div>
            {[["Interested", d.stats.interested, "f1", "users"], ["New leads", d.stats.newLeads, "f2", "spark"], ["Purchased", d.stats.purchased, "f3", "unlock"]].map(([label, v, cls, ic], i) => (
              <div className="cd-pipe" key={label}>
                <div className="cd-pipe-top"><span><Icon name={ic} size={15} />{label}</span><b><Num v={v} /></b></div>
                <div className="cd-bar flow"><i className={cls} style={{ width: `${d.stats.interested ? Math.max(3, Math.round((v / d.stats.interested) * 100)) : 0}%`, animationDelay: `${0.3 + i * 0.2}s` }} /></div>
              </div>
            ))}
            <div className="cd-pipe-note"><Icon name="trend" size={16} />Your purchase rate is <b>{rate}%</b></div>
          </Glass>
        </section>

        {/* ---------- leads ---------- */}
        <Glass className="cd-card cd-leads" delay={0.05}>
          <div className="cd-card-head">
            <div><h2>Student leads</h2><p>Students interested in your courses</p></div>
            <label className="cd-search">
              <Icon name="search" size={16} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, course, city" aria-label="Search leads" />
            </label>
          </div>
          <div className="cd-filters">
            {FILTERS.map((f) => (
              <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>{f}<em>{counts[f]}</em></button>
            ))}
          </div>

          <div className="cd-lead-grid">
            {leads.map((l, i) => {
              const p = parseInt(l.score, 10) || 0;
              return (
                <article className={`cd-lead ${freshIds.includes(l.id) ? "fresh" : ""}`} key={l.id} style={{ animationDelay: `${i * 0.06}s` }}>
                  {freshIds.includes(l.id) && <span className="cd-newtag">NEW</span>}
                  <div className="cd-lead-top">
                    <div className="cd-score" style={{ "--p": p }}><span>{l.name.charAt(0).toUpperCase()}</span></div>
                    <div className="cd-lead-name"><b>{l.name}</b><small>{l.id}</small></div>
                    <span className={`cd-badge s-${l.status.toLowerCase().replace(/\s+/g, "-")}`}>{l.status}</span>
                  </div>
                  <div className="cd-lead-info">
                    <span>{l.course}</span>
                    <span><Icon name="pin" size={13} />{l.location}</span>
                    <span className="mark">12th: <b>{l.score}</b></span>
                  </div>
                  {l.unlocked ? (
                    <div className="cd-unlocked"><Icon name="check" size={15} />Details unlocked</div>
                  ) : (
                    <button className="cd-unlock" disabled={busyId === l.id} onClick={() => unlock(l)}>
                      <Icon name="unlock" size={15} />{busyId === l.id ? "Please wait…" : "Unlock ₹100"}
                    </button>
                  )}
                </article>
              );
            })}
            {!leads.length && <div className="cd-empty wide">{query || filter !== "All" ? "No leads match" : "No leads yet — complete your profile to get discovered"}</div>}
          </div>
          <button className="cd-link" onClick={() => routerNavigate(ROUTES.leads)}>View all leads <Icon name="arrow" size={16} /></button>
        </Glass>

        {/* ---------- courses · listing · activity ---------- */}
        <section className="cd-row r3">
          <Glass className="cd-card" delay={0.05}>
            <div className="cd-card-head"><div><h2>Course demand</h2><p>Interested students per course</p></div></div>
            {d.courses.length ? <Donut items={d.courses.slice(0, 6)} /> : <div className="cd-empty">Add courses to see demand here</div>}
          </Glass>

          <Glass className="cd-card" delay={0.12}>
            <div className="cd-card-head"><div><h2>Listing performance</h2><p>How your college profile is doing</p></div></div>
            <div className="cd-perf">
              <Ring value={d.listing.completion} />
              <div className="cd-perf-list">
                <div><Icon name="eye" size={18} /><span><b><Num v={d.listing.views} /></b>Profile views</span></div>
                <div><Icon name="search" size={18} /><span><b><Num v={d.listing.appearances} /></b>Search appearances</span></div>
              </div>
            </div>
            {d.listing.completion < 100 && (
              <button className="cd-cta full" onClick={() => routerNavigate(ROUTES.profile)}>Complete your profile</button>
            )}
          </Glass>

          <Glass className="cd-card" delay={0.19}>
            <div className="cd-card-head"><div><h2>Recent activity</h2><p>Latest updates for your college</p></div></div>
            <ul className="cd-activity">
              {d.activities.map((a, i) => (
                <li key={i} style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
                  <span className="cd-dot" />
                  <div><b>{a.title}</b><p>{a.text}</p></div>
                  <time>{a.time}</time>
                </li>
              ))}
              {!d.activities.length && <li className="cd-empty">Nothing yet</li>}
            </ul>
          </Glass>
        </section>

        {/* ---------- upgrade ---------- */}
        <Glass className="cd-upgrade" delay={0.05}>
          <div className="cd-up-in">
            <span className="cd-up-icon"><Icon name="crown" size={26} /></span>
            <div><b>Get more students with Gold or Diamond</b><p>Top placement in search results, featured badge and priority in district search.</p></div>
            <button onClick={() => routerNavigate(ROUTES.plans)}>View plans <Icon name="arrow" size={16} /></button>
          </div>
        </Glass>
        </>)}
      </main>

      {confetti && (
        <div className="cd-confetti" aria-hidden="true">
          {confetti.map((c, i) => (
            <span key={i} style={{ background: c.color, animationDelay: `${c.delay}s`, "--tx": `${c.tx}px`, "--ty": `${c.ty}px`, "--rot": `${c.rot}deg` }} />
          ))}
        </div>
      )}
      {toast && <div className="cd-toast" role="status">{toast}</div>}
    </div>
  );
}

/* The Vite starter index.css makes #root 1126px wide, centres its text and turns headings white in dark mode.
   These rules are only on the page while the dashboard is open, so no other page is affected. */
const GLOBAL = `
html,body{margin:0;background:#eaf0fd!important;color-scheme:light}
#root{width:100%!important;max-width:none!important;margin:0!important;border:0!important;text-align:left!important;display:block!important;min-height:100vh}
`;

/* ================================ STYLES ================================ */
const CSS = `
.cd-page{--blue:#1558d6;--sky:#19b3e6;--ink:#0b1b3b;--mut:#5b6b88;--line:rgba(255,255,255,.75);
  position:relative;min-height:100vh;color:var(--ink);font-family:system-ui,"Segoe UI",Roboto,sans-serif;font-size:16px;line-height:1.45;letter-spacing:0;text-align:left;overflow-x:hidden}
.cd-page *{box-sizing:border-box}
.cd-page button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}
.cd-page h1,.cd-page h2,.cd-page p{margin:0;font-family:inherit;letter-spacing:0}
.cd-page h2{color:var(--ink);font-weight:800;font-size:18px;line-height:1.25}
.cd-page h1{color:#fff;font-weight:800}

/* aurora background */
.cd-bgfx{position:fixed;inset:0;z-index:0;overflow:hidden;background:linear-gradient(160deg,#eaf1ff,#f4f0ff 55%,#e6f7ff)}
.cd-bgfx:after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(21,88,214,.13) 1px,transparent 1px);background-size:26px 26px;mask-image:radial-gradient(ellipse at 50% 30%,#000 20%,transparent 75%)}
.cd-bgfx i{position:absolute;border-radius:50%;filter:blur(70px);opacity:.55}
.cd-bgfx i:nth-child(1){width:560px;height:560px;left:-120px;top:-140px;background:#7aa7ff;animation:cdfloat1 16s ease-in-out infinite}
.cd-bgfx i:nth-child(2){width:520px;height:520px;right:-140px;top:120px;background:#b69cff;animation:cdfloat2 19s ease-in-out infinite}
.cd-bgfx i:nth-child(3){width:480px;height:480px;left:30%;bottom:-200px;background:#6fe0ff;animation:cdfloat3 22s ease-in-out infinite}
.cd-progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:80;background:linear-gradient(90deg,transparent,var(--blue),var(--sky),transparent);background-size:50% 100%;background-repeat:no-repeat;animation:cdbar 1.1s linear infinite}

/* floating header */
.cd-top{position:sticky;top:12px;z-index:40;padding:0 22px}
.cd-top-in{margin:0 auto;padding:10px 14px 10px 16px;display:flex;align-items:center;gap:22px;border-radius:20px;background:rgba(255,255,255,.72);backdrop-filter:blur(18px) saturate(1.4);border:1px solid var(--line);box-shadow:0 10px 34px rgba(21,60,140,.12)}
.cd-brand{display:flex;align-items:center;gap:12px;text-align:left}
.cd-brand-mark{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--blue),var(--sky));box-shadow:0 8px 18px rgba(21,88,214,.32);animation:cdwiggle 5s ease-in-out infinite}
.cd-brand b{display:block;font-size:18px}
.cd-brand small{display:block;font-size:11px;color:var(--mut)}
.cd-nav{display:flex;gap:4px;margin-left:10px;flex:1}
.cd-nav button{position:relative;padding:9px 15px;border-radius:12px;font-size:14px;font-weight:700;color:var(--mut);transition:.25s}
.cd-nav button:hover{color:var(--blue);background:rgba(21,88,214,.08)}
.cd-nav button.active{color:#fff;background:linear-gradient(135deg,var(--blue),var(--sky));box-shadow:0 8px 18px rgba(21,88,214,.28)}
.cd-nav-logout{display:none}
.cd-top-right{display:flex;align-items:center;gap:10px;margin-left:auto}
.cd-icon-btn{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;color:var(--mut);background:rgba(255,255,255,.8)!important;border:1px solid #e1e9f7!important}
.cd-icon-btn:hover{color:var(--blue)}
.cd-icon-btn .spin{display:grid;animation:cdspin .8s linear infinite}
.cd-burger{display:none}
.cd-top-av{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;overflow:hidden;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--blue),var(--sky));box-shadow:0 0 0 3px #fff,0 0 0 5px rgba(21,88,214,.25)}
.cd-top-av img,.cd-hero-av img{width:100%;height:100%;object-fit:cover}
.cd-logout{display:flex;align-items:center;gap:6px;padding:9px 14px;border-radius:12px;font-size:14px;font-weight:700;color:#dc2626;background:#fef2f2!important}
.cd-logout:hover{background:#fee2e2!important}

.cd-wrap{position:relative;z-index:1;padding:20px 22px 60px}
.cd-wrap>*+*{margin-top:20px}

/* hero */
.cd-hero{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:30px;padding:34px 38px;border-radius:28px;color:#fff;background:linear-gradient(120deg,#0e2f86,#1558d6 55%,#1fa6e8);box-shadow:0 24px 60px rgba(21,70,180,.35);animation:cdrise .8s cubic-bezier(.2,.8,.2,1) both}
.cd-hero-blobs i{position:absolute;border-radius:50%;filter:blur(40px)}
.cd-hero-blobs i:nth-child(1){width:360px;height:360px;right:-60px;top:-120px;background:rgba(255,255,255,.22);animation:cdfloat2 10s ease-in-out infinite}
.cd-hero-blobs i:nth-child(2){width:260px;height:260px;left:30%;bottom:-140px;background:rgba(111,224,255,.45);animation:cdfloat3 12s ease-in-out infinite}
.cd-hero-blobs i:nth-child(3){width:200px;height:200px;left:-60px;top:-60px;background:rgba(167,139,250,.5);animation:cdfloat1 13s ease-in-out infinite}
.cd-hero-left{position:relative;z-index:1;min-width:0;flex:1}
.cd-hero-top{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.cd-wave{font-size:15px;font-weight:600;opacity:.95}
.cd-live{display:inline-flex;align-items:center;gap:7px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(255,255,255,.2)}
.cd-live i{width:8px;height:8px;border-radius:50%;background:#fbbf24}
.cd-live.on i{background:#4ade80;animation:cdpulse 1.8s infinite}
.cd-hero-row{display:flex;align-items:center;gap:18px;margin:14px 0 14px}
.cd-hero-av{flex:none;width:76px;height:76px;border-radius:22px;display:grid;place-items:center;overflow:hidden;font-size:32px;font-weight:800;background:rgba(255,255,255,.22);border:2px solid rgba(255,255,255,.6);animation:cdfloatY 4s ease-in-out infinite}
.cd-hero h1{font-size:36px;line-height:1.15;min-height:1.15em;overflow-wrap:anywhere;text-shadow:0 4px 20px rgba(0,0,0,.18)}
.cd-caret{display:inline-block;width:3px;height:.9em;margin-left:4px;vertical-align:-0.1em;background:#fff;animation:cdblink 1s steps(2) infinite}
.cd-chips{display:flex;flex-wrap:wrap;gap:8px}
.cd-chips span{display:inline-flex;align-items:center;gap:6px;padding:5px 13px;border-radius:999px;font-size:13px;font-weight:700;background:rgba(255,255,255,.2);backdrop-filter:blur(6px)}
.cd-chips .priv{background:rgba(255,255,255,.34)}
.cd-chips .gold{background:#fde68a;color:#7c4a03}
.cd-chips .ok{background:#bbf7d0;color:#14532d}
.cd-hero-sum{margin-top:16px;max-width:620px;font-size:16px;line-height:1.6;opacity:.96}
.cd-hero-sum b{font-size:19px;color:#fde68a}
.cd-hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}
.cd-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:14px;font-size:14px;font-weight:800;color:var(--blue)!important;background:#fff!important;box-shadow:0 10px 24px rgba(0,0,0,.18);position:relative;overflow:hidden;transition:.25s}
.cd-cta:after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(21,88,214,.22),transparent);transform:skewX(-20deg);animation:cdshine 3.2s ease-in-out infinite}
.cd-cta:hover{transform:translateY(-3px)}
.cd-cta.full{width:100%;justify-content:center;margin-top:18px;color:#fff!important;background:linear-gradient(135deg,var(--blue),var(--sky))!important;box-shadow:0 12px 24px rgba(21,88,214,.3)}
.cd-cta.full:after{background:linear-gradient(100deg,transparent,rgba(255,255,255,.5),transparent)}
.cd-ghost{padding:12px 20px;border-radius:14px;font-size:14px;font-weight:700;color:#fff!important;background:rgba(255,255,255,.16)!important;border:1px solid rgba(255,255,255,.5)!important;transition:.25s}
.cd-ghost:hover{background:rgba(255,255,255,.3)!important}

/* orbit gauge */
.cd-orbit{position:relative;z-index:1;flex:none;width:250px;height:250px}
.cd-orbit svg{width:100%;height:100%;overflow:visible}
.cd-orbit circle{fill:none}
.cd-orb-bg{stroke:rgba(255,255,255,.2);stroke-width:12}
.cd-orb-fg{stroke:url(#cdOrb);stroke-width:12;stroke-linecap:round;transform:rotate(-90deg);transform-box:view-box;transform-origin:50% 50%;transition:stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 0 8px rgba(253,230,138,.7))}
.cd-orb-dash{stroke:rgba(255,255,255,.45);stroke-width:1.5;stroke-dasharray:3 9}
.cd-orb-spin{transform-box:view-box;transform-origin:50% 50%;animation:cdspin 40s linear infinite}
.cd-orb-rot{transform-box:view-box;transform-origin:50% 50%;animation:cdspin 7s linear infinite}
.cd-orb-rot.b{animation-duration:11s;animation-direction:reverse}
.cd-orb-rot.c{animation-duration:15s}
.cd-orb-text{position:absolute;inset:0;display:grid;place-content:center;text-align:center}
.cd-orb-text b{font-size:50px;line-height:1;font-weight:800}
.cd-orb-text span{margin-top:4px;font-size:13px;opacity:.9;font-weight:600}

.cd-note{padding:12px 18px;border-radius:14px;font-size:13px;color:#7c4a03;background:rgba(254,243,199,.92);border:1px solid #fde68a;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;animation:cdrise .6s ease both}
.cd-note code{display:inline;font-family:ui-monospace,Consolas,monospace;font-size:12px;color:inherit;background:rgba(0,0,0,.07);padding:1px 6px;border-radius:6px}
.cd-note button{font-weight:800;color:var(--blue)}

/* ticker */
.cd-ticker{display:flex;align-items:center;gap:14px;padding:8px 10px;border-radius:16px;background:rgba(255,255,255,.7);backdrop-filter:blur(12px);border:1px solid var(--line);box-shadow:0 6px 18px rgba(21,60,140,.07);animation:cdrise .7s .1s cubic-bezier(.2,.8,.2,1) both}
.cd-ticker-tag{flex:none;display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:.08em;color:#fff;background:linear-gradient(135deg,#ef4444,#f97316)}
.cd-ticker-tag i{width:7px;height:7px;border-radius:50%;background:#fff;animation:cdblink 1.2s steps(2) infinite}
.cd-ticker-view{overflow:hidden;flex:1;mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)}
.cd-ticker-track{display:inline-flex;gap:46px;white-space:nowrap;animation:cdmarquee 38s linear infinite}
.cd-ticker-view:hover .cd-ticker-track{animation-play-state:paused}
.cd-ticker-track span{font-size:13px;color:var(--mut)}
.cd-ticker-track b{color:var(--ink)}

/* glass cards */
.cd-glass{position:relative;opacity:0;border-radius:24px;background:rgba(255,255,255,.74);backdrop-filter:blur(16px) saturate(1.3);border:1px solid var(--line);box-shadow:0 12px 36px rgba(21,60,140,.09);transition:transform .25s ease,box-shadow .3s ease;overflow:hidden}
.cd-glass.in{opacity:1;animation:cdrise .8s cubic-bezier(.2,.8,.2,1) var(--d) backwards}
.cd-glass:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgba(25,120,230,.14),transparent 55%)}
.cd-glass:hover:before{opacity:1}
.cd-glass:hover{box-shadow:0 20px 48px rgba(21,60,140,.16)}
.cd-glass.tilt.in{transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))}
.cd-card{padding:24px}
.cd-card-head{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:18px}
.cd-card-head p{font-size:13px;color:var(--mut);margin-top:2px}

/* tiles */
.cd-tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.cd-tile{padding:22px 24px}
.cd-tile-top{display:flex;align-items:center;gap:12px}
.cd-tile-icon{width:46px;height:46px;border-radius:15px;display:grid;place-items:center;animation:cdfloatY 3.6s ease-in-out infinite}
.cd-blue .cd-tile-icon{color:#fff;background:linear-gradient(135deg,#1558d6,#4f8cff);box-shadow:0 10px 20px rgba(21,88,214,.35)}
.cd-green .cd-tile-icon{color:#fff;background:linear-gradient(135deg,#059669,#34d399);box-shadow:0 10px 20px rgba(5,150,105,.35)}
.cd-violet .cd-tile-icon{color:#fff;background:linear-gradient(135deg,#7c3aed,#a78bfa);box-shadow:0 10px 20px rgba(124,58,237,.35)}
.cd-amber .cd-tile-icon{color:#fff;background:linear-gradient(135deg,#f59e0b,#fcd34d);box-shadow:0 10px 20px rgba(245,158,11,.35)}
.cd-tile-label{font-size:14px;font-weight:700;color:var(--mut)}
.cd-tile-value{margin:14px 0 8px;font-size:42px;line-height:1;font-weight:800;background:linear-gradient(120deg,#0b1b3b,#1558d6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.cd-tile-foot{min-height:38px;display:flex;align-items:flex-end}
.cd-spark{width:100%;height:38px}
.cd-spark-line{fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:cddraw 1.6s ease .5s forwards}
.cd-spark-dot{opacity:0;animation:cdfade .3s ease 1.8s forwards}
.cd-pulse{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#059669}
.cd-pulse i{width:10px;height:10px;border-radius:50%;background:#10b981;animation:cdpulse2 1.6s infinite}
.cd-mini{width:100%}
.cd-mini span{display:block;margin-top:7px;font-size:12px;font-weight:700;color:#7c3aed}

/* bars */
.cd-bar{height:11px;border-radius:999px;background:rgba(21,88,214,.1);overflow:hidden}
.cd-bar i{display:block;height:100%;border-radius:inherit;transform-origin:left;animation:cdgrow 1.1s cubic-bezier(.2,.8,.2,1) backwards}
.cd-bar i.f1{background:linear-gradient(90deg,#1558d6,#19b3e6)}
.cd-bar i.f2{background:linear-gradient(90deg,#7c3aed,#a78bfa)}
.cd-bar i.f3{background:linear-gradient(90deg,#059669,#34d399)}
.cd-bar.flow i{background-image:linear-gradient(115deg,rgba(255,255,255,.35) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.35) 50%,rgba(255,255,255,.35) 75%,transparent 75%);background-size:28px 28px;animation:cdgrow 1.1s cubic-bezier(.2,.8,.2,1) backwards,cdstripe 1.2s linear infinite}
.cd-bar.flow i.f1{background-color:#1558d6}.cd-bar.flow i.f2{background-color:#7c3aed}.cd-bar.flow i.f3{background-color:#10b981}
.cd-pipe{margin-bottom:20px}
.cd-pipe-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:14px;font-weight:700}
.cd-pipe-top span{display:inline-flex;align-items:center;gap:8px;color:var(--mut)}
.cd-pipe-top b{font-size:18px}
.cd-pipe-note{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;font-size:14px;color:#047857;background:rgba(16,185,129,.12)}

/* rows */
.cd-row{display:grid;gap:20px}
.cd-row.r1{grid-template-columns:minmax(0,2fr) minmax(0,1fr)}
.cd-row.r3{grid-template-columns:repeat(3,minmax(0,1fr))}
.cd-legend{display:flex;gap:16px;font-size:13px;font-weight:700;color:var(--mut)}
.cd-legend span:before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px}
.cd-legend .blue:before{background:#1558d6}.cd-legend .green:before{background:#10b981}

/* chart */
.cd-chart-box{position:relative}
.cd-chart{width:100%;height:auto;display:block;cursor:crosshair}
.cd-grid-line{stroke:rgba(21,88,214,.12);stroke-width:1;stroke-dasharray:4 5}
.cd-axis{fill:#8493ad;font-size:11px;font-family:system-ui,sans-serif}
.cd-line{fill:none;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:cddraw 1.6s ease .2s forwards}
.cd-line.blue{stroke:url(#cdLine)}.cd-line.green{stroke:#10b981}
.cd-area{opacity:0;animation:cdfade 1s ease 1.1s forwards}
.cd-cross{stroke:rgba(21,88,214,.35);stroke-width:1.5;stroke-dasharray:4 4}
.cd-pt{stroke:#fff;stroke-width:2;opacity:0;animation:cdfade .4s ease forwards;transition:r .15s}
.cd-pt.blue{fill:#1558d6}.cd-pt.green{fill:#10b981}
.cd-tip{position:absolute;top:6px;transform:translateX(-50%);display:flex;flex-direction:column;gap:2px;padding:9px 13px;border-radius:12px;font-size:12px;color:#fff;background:rgba(11,27,59,.92);box-shadow:0 10px 24px rgba(0,0,0,.25);pointer-events:none;white-space:nowrap;animation:cdfade .15s ease both}
.cd-tip b{font-size:13px}
.cd-tip .blue{color:#8fb6ff}.cd-tip .green{color:#6ee7b7}

/* leads */
.cd-search{display:flex;align-items:center;gap:8px;padding:0 14px;height:40px;border-radius:12px;color:var(--mut);background:rgba(255,255,255,.9);border:1px solid #dfe8f7;transition:.2s}
.cd-search:focus-within{border-color:var(--blue);box-shadow:0 0 0 4px rgba(21,88,214,.12);width:290px}
.cd-search input{border:0;outline:0;background:transparent;font:inherit;font-size:14px;width:200px;color:var(--ink)}
.cd-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.cd-filters button{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;font-size:13px;font-weight:700;color:var(--mut);background:rgba(21,88,214,.07);transition:.25s}
.cd-filters button em{font-style:normal;padding:1px 8px;border-radius:999px;font-size:11px;background:rgba(21,88,214,.12)}
.cd-filters button:hover{color:var(--blue)}
.cd-filters button.on{color:#fff;background:linear-gradient(135deg,var(--blue),var(--sky));box-shadow:0 8px 16px rgba(21,88,214,.28)}
.cd-filters button.on em{background:rgba(255,255,255,.28)}
.cd-lead-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:16px}
.cd-lead{position:relative;padding:18px;border-radius:20px;background:#fff;border:1px solid #e6edf9;box-shadow:0 6px 16px rgba(21,60,140,.06);transition:.3s;animation:cdrise .6s cubic-bezier(.2,.8,.2,1) backwards}
.cd-lead:hover{transform:translateY(-6px);border-color:#b9ceff;box-shadow:0 18px 34px rgba(21,88,214,.16)}
.cd-lead-top{display:flex;align-items:center;gap:12px}
.cd-score{flex:none;width:50px;height:50px;border-radius:50%;padding:3px;display:grid;place-items:center;background:conic-gradient(var(--blue) calc(var(--p)*1%),#e3ebf9 0);animation:cdspinin 1.2s ease backwards}
.cd-score span{width:100%;height:100%;border-radius:50%;display:grid;place-items:center;font-weight:800;color:var(--blue);background:#fff}
.cd-lead-name{flex:1;min-width:0}
.cd-lead-name b,.cd-lead-name small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cd-lead-name small{font-size:11px;color:var(--mut)}
.cd-lead-info{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}
.cd-lead-info span{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:600;color:#44546f;background:#f1f5fc}
.cd-lead-info .mark{color:#047857;background:#e3f8ee}
.cd-badge{padding:4px 11px;border-radius:999px;font-size:11px;font-weight:800;background:#eef2f7;color:#475569}
.s-new{background:#dbeafe;color:#1d4ed8}
.s-interested{background:#dcfce7;color:#15803d}
.s-contacted{background:#fef3c7;color:#b45309}
.cd-unlock{position:relative;overflow:hidden;width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;border-radius:13px;font-size:14px;font-weight:800;color:#fff!important;background:linear-gradient(135deg,var(--blue),var(--sky))!important;transition:.25s}
.cd-unlock:after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);animation:cdshine 3.4s ease-in-out infinite}
.cd-unlock:hover{box-shadow:0 12px 22px rgba(21,88,214,.32);transform:translateY(-2px)}
.cd-unlock:disabled{opacity:.65;cursor:wait;transform:none}
.cd-unlocked{display:flex;align-items:center;justify-content:center;gap:7px;padding:11px;border-radius:13px;font-size:14px;font-weight:800;color:#047857;background:#e3f8ee}
.cd-empty{padding:26px 12px;text-align:center;color:var(--mut);font-size:14px;list-style:none}
.cd-empty.wide{grid-column:1/-1}
.cd-link{display:inline-flex;align-items:center;gap:6px;margin-top:18px;font-size:14px;font-weight:800;color:var(--blue);transition:.2s}
.cd-link:hover{gap:11px}

/* donut */
.cd-donut-wrap{display:flex;align-items:center;gap:20px;flex-wrap:wrap;justify-content:center}
.cd-donut{position:relative;width:170px;height:170px;flex:none}
.cd-donut svg{width:100%;height:100%;transform:rotate(0deg)}
.cd-donut circle{fill:none;stroke-width:5.2}
.cd-donut-bg{stroke:rgba(21,88,214,.09)}
.cd-seg{cursor:pointer;transition:opacity .25s;animation:cdseg 1.2s cubic-bezier(.2,.8,.2,1) backwards}
.cd-donut-text{position:absolute;inset:0;display:grid;place-content:center;text-align:center;padding:0 26px;pointer-events:none}
.cd-donut-text b{font-size:30px;line-height:1}
.cd-donut-text span{font-size:11px;color:var(--mut);font-weight:700;margin-top:3px}
.cd-legendlist{list-style:none;margin:0;padding:0;flex:1;min-width:150px;display:flex;flex-direction:column;gap:6px}
.cd-legendlist li{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:10px;font-size:13px;font-weight:600;cursor:default;transition:.2s}
.cd-legendlist li.on,.cd-legendlist li:hover{background:rgba(21,88,214,.08)}
.cd-legendlist i{width:11px;height:11px;border-radius:50%;flex:none}
.cd-legendlist span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* listing performance ring */
.cd-perf{display:flex;align-items:center;gap:20px;flex-wrap:wrap;justify-content:center}
.cd-ring{position:relative;width:140px;height:140px;flex:none}
.cd-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.cd-ring circle{fill:none;stroke-width:9}
.cd-ring-bg{stroke:rgba(21,88,214,.1)}
.cd-ring-fg{stroke:url(#cdRing);stroke-linecap:round;transition:stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)}
.cd-ring-text{position:absolute;inset:0;display:grid;place-content:center;text-align:center}
.cd-ring-text b{font-size:28px;line-height:1}
.cd-ring-text span{font-size:12px;color:var(--mut);font-weight:600}
.cd-perf-list{flex:1;min-width:150px;display:flex;flex-direction:column;gap:12px}
.cd-perf-list>div{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;background:rgba(21,88,214,.07);transition:.25s}
.cd-perf-list>div:hover{transform:translateX(6px)}
.cd-perf-list svg{color:var(--blue);flex:none}
.cd-perf-list b{display:block;font-size:20px;line-height:1.1}
.cd-perf-list span{font-size:12px;color:var(--mut)}

/* activity */
.cd-activity{list-style:none;margin:0;padding:0 0 0 4px;position:relative}
.cd-activity:before{content:"";position:absolute;left:9px;top:10px;bottom:10px;width:2px;background:linear-gradient(var(--sky),transparent);opacity:.5}
.cd-activity li{position:relative;display:flex;gap:14px;align-items:flex-start;padding:10px 0;animation:cdslide .6s cubic-bezier(.2,.8,.2,1) backwards}
.cd-dot{flex:none;width:12px;height:12px;border-radius:50%;margin-top:6px;background:var(--sky);box-shadow:0 0 0 4px rgba(25,179,230,.2);animation:cdpulse2 2.4s infinite}
.cd-activity div{flex:1;min-width:0}
.cd-activity b{font-size:14px}
.cd-activity p{font-size:13px;color:var(--mut)}
.cd-activity time{font-size:12px;color:var(--mut);white-space:nowrap}

/* upgrade banner: rotating gradient border */
.cd-glass.cd-upgrade{padding:2px;border:0;backdrop-filter:none;background:linear-gradient(90deg,#fbbf24,#19b3e6,#7c3aed,#fb7185,#fbbf24);background-size:300% 100%}
.cd-glass.cd-upgrade.in{animation:cdrise .8s cubic-bezier(.2,.8,.2,1) var(--d) backwards,cdgradmove 6s linear infinite}
.cd-up-in{position:relative;z-index:1;display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:24px 28px;border-radius:22px;color:#fff;background:linear-gradient(120deg,#0b1f55,#1245b5)}
.cd-up-in>div{flex:1;min-width:220px}
.cd-up-in b{font-size:18px}
.cd-up-in p{font-size:13px;opacity:.85;margin-top:3px}
.cd-up-icon{width:56px;height:56px;border-radius:18px;display:grid;place-items:center;color:#7c4a03;background:linear-gradient(135deg,#fde68a,#fbbf24);animation:cdwiggle 3s ease-in-out infinite}
.cd-up-in button{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:14px;font-size:14px;font-weight:800;color:#7c4a03!important;background:linear-gradient(135deg,#fde68a,#fbbf24)!important;transition:.25s}
.cd-up-in button:hover{transform:translateY(-3px);box-shadow:0 12px 24px rgba(251,191,36,.4)}

/* confetti + toast */
.cd-confetti{position:fixed;left:50%;top:60%;z-index:90;pointer-events:none}
.cd-confetti span{position:absolute;width:10px;height:16px;border-radius:3px;opacity:0;animation:cdconf 1.9s cubic-bezier(.15,.7,.3,1) forwards}
.cd-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:95;padding:13px 24px;border-radius:14px;font-size:14px;font-weight:700;color:#fff;background:#0b1b3b;box-shadow:0 14px 34px rgba(0,0,0,.3);animation:cdrise .35s ease both}

@keyframes cdrise{from{opacity:0;transform:translateY(26px) scale(.97)}to{opacity:1;transform:none}}
@keyframes cdslide{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:none}}
@keyframes cdgrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes cdspin{to{transform:rotate(360deg)}}
@keyframes cdgradmove{to{background-position:300% 0}}
@keyframes cdspinin{from{transform:rotate(-180deg) scale(.4);opacity:0}to{transform:none;opacity:1}}
@keyframes cddraw{to{stroke-dashoffset:0}}
@keyframes cdfade{to{opacity:1}}
@keyframes cdseg{from{stroke-dasharray:0 100}}
@keyframes cdblink{50%{opacity:0}}
@keyframes cdstripe{to{background-position:28px 0}}
@keyframes cdshine{0%{left:-60%}55%,100%{left:140%}}
@keyframes cdmarquee{to{transform:translateX(-50%)}}
@keyframes cdbar{from{background-position:-60% 0}to{background-position:160% 0}}
@keyframes cdfloatY{50%{transform:translateY(-6px)}}
@keyframes cdwiggle{0%,100%{transform:rotate(0)}30%{transform:rotate(-7deg)}60%{transform:rotate(6deg)}}
@keyframes cdfloat1{50%{transform:translate(90px,70px) scale(1.12)}}
@keyframes cdfloat2{50%{transform:translate(-80px,90px) scale(.92)}}
@keyframes cdfloat3{50%{transform:translate(70px,-80px) scale(1.1)}}
@keyframes cdpulse{70%{box-shadow:0 0 0 8px rgba(74,222,128,0)}100%{box-shadow:0 0 0 0 rgba(74,222,128,0)}}
@keyframes cdpulse2{0%{box-shadow:0 0 0 0 rgba(16,185,129,.55)}70%{box-shadow:0 0 0 9px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}
@keyframes cdconf{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--tx),calc(var(--ty) + 520px)) rotate(var(--rot))}}

/* ---------- extra animation layer ---------- */
/* live number flash when a value changes */
.cd-num{display:inline-block}
.cd-num.flash{animation:cdflash 1.2s ease}
/* hero: slowly shifting gradient + rising particles */
.cd-hero{background-size:220% 220%;animation:cdrise .8s cubic-bezier(.2,.8,.2,1) both,cdhero 14s ease-in-out infinite}
.cd-particles{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.cd-particles i{position:absolute;bottom:-20px;border-radius:50%;background:rgba(255,255,255,.55);box-shadow:0 0 12px rgba(255,255,255,.7);animation:cdrisep linear infinite}
/* tiles: glowing sweep on hover */
.cd-tile:after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.7) 50%,transparent 70%);background-size:250% 100%;background-position:120% 0}
.cd-tile:hover:after{opacity:1;animation:cdsweep .9s ease}
/* cards lift a little on hover */
.cd-card:hover{transform:translateY(-3px)}
/* page title/gradient text shimmer */
.cd-tile-value{background-size:200% 100%;animation:cdtext 6s ease-in-out infinite}
/* nav underline grow */
.cd-nav button:not(.active):after{content:"";position:absolute;left:50%;bottom:4px;width:0;height:2px;border-radius:2px;background:var(--sky);transition:.3s;transform:translateX(-50%)}
.cd-nav button:not(.active):hover:after{width:55%}
/* click ripple */
.cd-ripple{position:absolute;border-radius:50%;pointer-events:none;background:rgba(255,255,255,.55);transform:scale(0);animation:cdripple .7s ease-out forwards}
.cd-icon-btn .cd-ripple,.cd-filters .cd-ripple,.cd-logout .cd-ripple{background:rgba(21,88,214,.25)}
/* new lead arrives: pulsing glow + tag */
.cd-lead.fresh{border-color:#4f8cff;animation:cdrise .6s cubic-bezier(.2,.8,.2,1) backwards,cdglow 1.4s ease-in-out 4}
.cd-newtag{position:absolute;top:-9px;right:14px;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:800;letter-spacing:.08em;color:#fff;background:linear-gradient(135deg,#ef4444,#f97316);box-shadow:0 6px 14px rgba(239,68,68,.4);animation:cdbounce 1s ease infinite}
/* upgrade button + live chip */
.cd-up-in button{animation:cdbeat 2.4s ease-in-out infinite}
.cd-live.on{background:rgba(74,222,128,.22)}
/* skeleton shimmer for first load */
.cd-skel{display:grid;gap:20px}
.cd-skel-tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.cd-skel-row{display:grid;grid-template-columns:2fr 1fr;gap:20px}
.cd-shimmer{height:120px;border-radius:24px;background:linear-gradient(100deg,rgba(255,255,255,.5) 30%,rgba(255,255,255,.95) 50%,rgba(255,255,255,.5) 70%);background-size:300% 100%;animation:cdshim 1.4s linear infinite}
.cd-skel-row .cd-shimmer{height:200px}

@keyframes cdflash{0%{transform:scale(1);filter:none}30%{transform:scale(1.18);filter:drop-shadow(0 0 10px rgba(25,179,230,.9)) brightness(1.2)}100%{transform:scale(1);filter:none}}
@keyframes cdhero{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes cdrisep{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:1}100%{transform:translateY(-420px) scale(1.2);opacity:0}}
@keyframes cdsweep{to{background-position:-120% 0}}
@keyframes cdtext{0%,100%{background-position:0% 0}50%{background-position:100% 0}}
@keyframes cdripple{to{transform:scale(1);opacity:0}}
@keyframes cdglow{0%,100%{box-shadow:0 6px 16px rgba(21,60,140,.06)}50%{box-shadow:0 0 0 5px rgba(79,140,255,.28),0 18px 34px rgba(21,88,214,.28)}}
@keyframes cdbounce{50%{transform:translateY(-3px)}}
@keyframes cdbeat{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes cdshim{to{background-position:-300% 0}}


/* ---------- student leads view ---------- */
.cl-hero{position:relative;overflow:hidden;padding:26px 32px;border-radius:28px;color:#fff;background:linear-gradient(120deg,#0e2f86,#1558d6 50%,#7c3aed);background-size:220% 220%;box-shadow:0 24px 60px rgba(21,70,180,.3);animation:cdrise .8s cubic-bezier(.2,.8,.2,1) both,cdhero 14s ease-in-out infinite}
.cl-hero-in{position:relative;z-index:1;display:flex;flex-direction:column;gap:18px}
.cl-back{align-self:flex-start;display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:12px;font-size:14px;font-weight:700;color:#fff!important;background:rgba(255,255,255,.18)!important;border:1px solid rgba(255,255,255,.45)!important;transition:.25s}
.cl-back:hover{background:rgba(255,255,255,.32)!important;transform:translateX(-4px)}
.cl-back-arrow{display:grid;transform:rotate(180deg)}
.cl-hero-row{display:flex;align-items:center;gap:18px}
.cl-hero-icon{flex:none;width:64px;height:64px;border-radius:20px;display:grid;place-items:center;background:rgba(255,255,255,.22);border:2px solid rgba(255,255,255,.55);animation:cdfloatY 4s ease-in-out infinite}
.cl-hero h1{font-size:34px;line-height:1.15}
.cl-hero p{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:6px;font-size:15px;opacity:.96}
.cl-hero p b{font-size:19px;color:#fde68a}
.cl-foot{font-size:13px;font-weight:700;color:var(--mut)}
.cl-tools{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:16px}
.cl-tools .cd-search{flex:1;min-width:200px}
.cl-tools .cd-search input{flex:1;width:auto}
.cl-tools .cd-search:focus-within{width:auto}
.cl-sort{height:40px;padding:0 14px;border-radius:12px;font:inherit;font-size:14px;font-weight:700;color:var(--ink);background:rgba(255,255,255,.9);border:1px solid #dfe8f7;outline:0;cursor:pointer}
.cl-sort:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(21,88,214,.12)}
.cl-grid{grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}
.cl-card{overflow:hidden}
.cl-card:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,var(--blue),var(--sky));transform-origin:left;animation:cdgrow .9s cubic-bezier(.2,.8,.2,1) backwards}
.cl-card.st-interested:before{background:linear-gradient(90deg,#059669,#34d399)}
.cl-card.st-contacted:before{background:linear-gradient(90deg,#f59e0b,#fcd34d)}
.cl-meter{height:6px;border-radius:999px;background:#eaf0fb;overflow:hidden;margin:0 0 14px}
.cl-meter i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#10b981,#34d399);transform-origin:left;animation:cdgrow 1.2s cubic-bezier(.2,.8,.2,1) .2s backwards}
.cl-tiles{margin-top:20px}

/* laptop / tablet */
@media (max-width:1250px){
  .cd-row.r3{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cd-row.r3>.cd-glass:last-child{grid-column:1/-1}
}
@media (max-width:1100px){
  .cd-tiles{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cd-row.r1{grid-template-columns:1fr}
}
/* phone + small tablet */
@media (max-width:900px){
  .cd-top{padding:0 12px;top:8px}
  .cd-top-in{gap:12px;padding:9px 12px}
  .cd-wrap{padding:14px 12px 44px}
  .cd-hero{flex-direction:column;align-items:flex-start;padding:26px 22px}
  .cd-orbit{align-self:center}
  .cd-hero h1{font-size:26px}
  .cd-row.r3{grid-template-columns:1fr}
}
@media (max-width:700px){
  .cl-hero{padding:20px 18px}
  .cl-hero h1{font-size:24px}
  .cl-hero-icon{width:50px;height:50px}
  .cl-sort{flex:1}
  .cl-grid{grid-template-columns:1fr}
}
@media (max-width:480px){
  .cd-logout{padding:9px 11px}
  .cd-logout span{display:none}
  .cd-top-in{gap:8px}
  .cd-top-right{gap:8px}
  .cd-brand b{font-size:16px}
  .cd-hero-actions>button{flex:1;justify-content:center}
  .cd-hero-row{gap:12px}
  .cd-hero h1{font-size:22px}
}
@media (max-width:700px){
  .cd-brand small{display:none}
  .cd-tiles{gap:12px}
  .cd-tile{padding:16px}
  .cd-tile-value{font-size:30px}
  .cd-tile-label{font-size:12px}
  .cd-tile-icon{width:38px;height:38px}
  .cd-card{padding:18px 16px}
  .cd-search,.cd-search input,.cd-search:focus-within{width:100%}
  .cd-search{flex:1}
  .cd-hero-av{width:58px;height:58px;font-size:24px}
  .cd-orbit{width:200px;height:200px}
  .cd-orb-text b{font-size:38px}
  .cd-lead-grid{grid-template-columns:1fr}
  .cd-skel-tiles{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cd-skel-row{grid-template-columns:1fr}
}
@media (prefers-reduced-motion:reduce){
  .cd-page *,.cd-page *:before,.cd-page *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition:none!important}
}
`;

