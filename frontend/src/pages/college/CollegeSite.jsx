import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollegeExplorer, INDIA_DISTRICTS, TOTAL_DISTRICTS } from "./CollegeProfile"; // college explorer + every district of India, state-wise

/* COLLEGE SIDE — ONE FILE (route: /college/home)

   Contains BOTH pages:
   1. Public college website (no login): hero, district explorer, counters, how it works,
      plans, pricing, benefits, about, contact
   2. Subscription pricing view (LOGIN ONLY): Elite / Gold / Diamond with 1 Month, 6 Months, 1 Year
      -> opens inside this same page when a logged-in college clicks "View Plans & Prices".
      -> not logged in: the prices are never rendered and the college is sent to the login page.

   NAV ORDER (the page sections scroll in this SAME order, one after another):
   Start Here · Student Pool · College Radar · Boost Plans · How We Work · Just ₹100 · Why Us · Our Mission · Reach Us

   NOTE: the login check here only controls what the screen shows. Real protection must be on the backend:
   plans/prices API and payment API must require the college's JWT, and payment success must be verified by the backend. */

const SESSION_KEY = "campusconnect_college_session"; // same key used by Registeration.jsx
const AFTER_LOGIN_KEY = "campusconnect_after_login"; // login page can read this and redirect back (value: "/college/home?view=plans")

const MENU = [
  ["home", "Start Here", "", "🏁"],
  ["downloads", "Student Pool", "", "🎯"],
  ["districts", "College Radar", "fancy", "🎓"],
  ["plans", "Boost Plans", "", "🚀"],
  ["how", "How We Work", "", "⚙️"],
  ["pricing", "Just ₹100", "", "💸"],
  ["benefits", "Why Us", "", "🏆"],
  ["about", "Our Mission", "", "🌱"],
  ["contact", "Reach Us", "", "📞"],
];
const SPY_IDS = MENU.map(([id]) => id);

/* Counter numbers — SAMPLE values.  [value, suffix, label, ring %, hue] */
const STATS = [
  [12450, "+", "student leads downloaded", 0.86, "#19c3e6"],
  [325, "+", "colleges registered", 0.68, "#a78bfa"],
  [TOTAL_DISTRICTS, "", "districts listed across India", 1, "#34d399"],
  [100, "%", "consent-based sharing", 1, "#fbbf24"],
];

/* Subscription tiers — features are SAMPLE content. Prices live only on the login-protected page. */
const PLANS = [
  {
    id: "elite",
    name: "Elite",
    icon: "🥈",
    tagline: "Get started with more visibility",
    features: ["College listing in search", "Browse all student lead previews", "Email support"],
  },
  {
    id: "gold",
    name: "Gold",
    icon: "🥇",
    tagline: "More reach for growing colleges",
    features: ["Everything in Elite", "Featured badge on college profile", "Priority in district search", "Lead export (CSV)"],
  },
  {
    id: "diamond",
    name: "Diamond",
    icon: "💎",
    tagline: "Maximum reach and support",
    features: ["Everything in Gold", "Top placement in search results", "Dedicated account manager", "Admission campaign support"],
  },
];

const STEPS = [
  ["Register & get verified", "Create your college account with official email, affiliation and accreditation. Admin verifies it before you go live.", "📝"],
  ["Complete profile & courses", "Add courses, fees, seats and eligibility so matching students can find you.", "🏫"],
  ["Browse student leads", "See interested students. The free preview shows Student ID, 12th %, preferred course and location.", "👀"],
  ["Unlock for ₹100", "Pick a lead and pay ₹100 securely. Our server verifies the payment before unlocking.", "🔓"],
  ["Receive full details", "Get the student's name, mobile and email, saved in My Purchased Leads.", "📲"],
  ["Follow up & track", "Contact the student and check payment history and receipts on your dashboard.", "📈"],
];

const BENEFITS = [
  ["💸", "Pay only for what you use", "Buy single leads at ₹100 each, or pick a subscription plan after login."],
  ["⭐", "Better quality leads", "Students already searched for and chose your course."],
  ["🔒", "Consent-based sharing", "Students agree to share their profile with colleges."],
  ["📉", "Save marketing cost", "Skip costly ads and cold calling for admissions."],
  ["🧾", "Transparent records", "Every payment and purchased lead is stored with receipts."],
  ["⚡", "Reach students early", "Connect right after 12th results, before others do."],
];

const LEADS = [
  ["STU10231", "82%", "B.Tech CSE", "Chennai", "S"],
  ["STU10232", "91%", "MBBS", "Coimbatore", "M"],
  ["STU10233", "76%", "B.Sc Nursing", "Salem", "N"],
  ["STU10234", "88%", "B.Com", "Erode", "B"],
];

/* SAMPLE prices (monthly base, ₹) and discounts. Shown ONLY after login. */
const MONTHLY = { elite: 999, gold: 1999, diamond: 3999 };
// [id, label, months, discount %]
const PERIODS = [
  ["1m", "1 Month", 1, 0],
  ["6m", "6 Months", 6, 10],
  ["12m", "1 Year", 12, 20],
];
const rupee = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const RIBBON_A = ["Search by district", "₹100 per lead", "Verified colleges", "Consent-based leads", "Secure payments", "Instant unlock"];
const RIBBON_B = ["🎯 Course-matched students", "📲 Direct mobile numbers", "⚡ Unlock in one tap", "🧾 Receipt for every lead", "🎓 Fresh after 12th results", "🔒 Server-verified payments", "📈 Track every follow-up"];

const SPARKS = [
  [6, 14], [14, 62], [22, 30], [31, 80], [41, 12], [52, 70], [60, 22], [68, 88], [76, 40], [84, 10], [90, 66], [95, 30], [47, 46], [10, 90],
];

/* ---------- logo ---------- */
function CCLogo() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 19 24 11l16 8-16 8-16-8Z" />
      <path d="M15 23.5v7c0 3 4 5.5 9 5.5s9-2.5 9-5.5v-7" />
      <path d="M40 19v9" />
      <circle cx="40" cy="31" r="1.8" fill="#fff" stroke="none" />
      <circle cx="10" cy="40" r="2" fill="#fff" stroke="none" />
      <circle cx="24" cy="43" r="2" fill="#fff" stroke="none" />
      <circle cx="38" cy="40" r="2" fill="#fff" stroke="none" />
      <path d="M12 40l10 2.4M26 42.4l10-2.4" strokeWidth="1.6" opacity=".8" />
    </svg>
  );
}

/* ---------- small helpers ---------- */

/* 3D tilt + moving light on hover */
function Tilt({ as: Tag = "div", className = "", max = 8, children, ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - y) * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <Tag ref={ref} className={`cs-tilt ${className}`} onMouseMove={move} onMouseLeave={leave} {...rest}>
      {children}
    </Tag>
  );
}

/* circular counter: ring draws itself and the number counts up when it scrolls into view */
function StatRing({ to, suffix, label, pct, hue }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setGo(true);
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / 1800, 1);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  const C = 2 * Math.PI * 54;
  return (
    <div ref={ref} className="cs-stat" style={{ "--h": hue }}>
      <div className="cs-stat-ring">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle className="trk" cx="60" cy="60" r="54" />
          <circle className="bar" cx="60" cy="60" r="54" style={{ strokeDasharray: C, strokeDashoffset: go ? C * (1 - pct) : C }} />
        </svg>
        <strong>
          {n.toLocaleString("en-IN")}
          {suffix}
        </strong>
      </div>
      <span>{label}</span>
    </div>
  );
}

/* animated campus illustration */
function Campus() {
  return (
    <svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMax slice" className="cs-campus" aria-hidden="true">
      <defs>
        <linearGradient id="csSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe3ff" />
          <stop offset="1" stopColor="#f2f9ff" />
        </linearGradient>
        <linearGradient id="csRoof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1558d6" />
          <stop offset="1" stopColor="#19a7e6" />
        </linearGradient>
        <linearGradient id="csGrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7be0a8" />
          <stop offset="1" stopColor="#3cbf80" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill="url(#csSky)" />
      <g className="cs-sun">
        <circle cx="388" cy="78" r="54" fill="#ffd66b" opacity=".35" />
        <circle cx="388" cy="78" r="36" fill="#ffc83d" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="388" y1="78" x2="388" y2="22" stroke="#ffc83d" strokeWidth="5" strokeLinecap="round" opacity=".55" transform={`rotate(${a} 388 78)`} />
        ))}
        <circle cx="388" cy="78" r="38" fill="#ffc83d" />
      </g>
      <g className="cs-cloud c1"><ellipse cx="90" cy="70" rx="42" ry="15" fill="#fff" /><ellipse cx="116" cy="60" rx="28" ry="16" fill="#fff" /><ellipse cx="70" cy="62" rx="22" ry="12" fill="#fff" /></g>
      <g className="cs-cloud c2"><ellipse cx="250" cy="40" rx="34" ry="12" fill="#fff" opacity=".9" /><ellipse cx="270" cy="33" rx="22" ry="12" fill="#fff" opacity=".9" /></g>
      <g className="cs-bird b1"><path d="M0 0q8-9 16 0q8-9 16 0" fill="none" stroke="#2a4a7a" strokeWidth="3" strokeLinecap="round" /></g>
      <g className="cs-bird b2"><path d="M0 0q6-7 12 0q6-7 12 0" fill="none" stroke="#2a4a7a" strokeWidth="2.5" strokeLinecap="round" /></g>

      <ellipse cx="240" cy="330" rx="300" ry="64" fill="url(#csGrass)" />
      <path d="M210 340 Q240 300 270 340Z" fill="#f6e7c1" />

      {/* building */}
      <rect x="86" y="170" width="308" height="150" rx="10" fill="#fff" />
      <rect x="86" y="300" width="308" height="20" rx="6" fill="#dfeaf7" />
      <polygon points="66,174 240,100 414,174" fill="url(#csRoof)" />
      <rect x="196" y="76" width="88" height="96" rx="8" fill="#fff" />
      <path d="M186 80 Q240 14 294 80Z" fill="#102b4b" />
      <circle cx="240" cy="116" r="19" fill="#e6f1ff" stroke="#1558d6" strokeWidth="4" />
      <line x1="240" y1="116" x2="240" y2="104" stroke="#102b4b" strokeWidth="3" strokeLinecap="round" />
      <line x1="240" y1="116" x2="250" y2="120" stroke="#102b4b" strokeWidth="3" strokeLinecap="round" className="cs-hand" />
      <line x1="240" y1="47" x2="240" y2="12" stroke="#102b4b" strokeWidth="3" />
      <path className="cs-flag" d="M240 12 L274 22 L240 32Z" fill="#ff7a59" />
      {[112, 156, 292, 336].map((x, i) => (
        <rect key={x} x={x} y="198" width="34" height="52" rx="17" fill="#bfd9fb" className="cs-win" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
      <path d="M212 320V260a28 28 0 0 1 56 0V320Z" fill="#173d6b" />
      <circle cx="258" cy="280" r="3.5" fill="#ffd66b" />

      {/* trees */}
      <g className="cs-tree t1"><rect x="40" y="262" width="9" height="60" fill="#8a5a2b" /><circle cx="44" cy="248" r="30" fill="#2fae6d" /><circle cx="64" cy="268" r="20" fill="#3cc27d" /></g>
      <g className="cs-tree t2"><rect x="436" y="266" width="9" height="56" fill="#8a5a2b" /><circle cx="440" cy="252" r="28" fill="#2fae6d" /><circle cx="420" cy="272" r="18" fill="#3cc27d" /></g>

      {/* graduation cap */}
      <g className="cs-cap">
        <polygon points="96,70 140,52 184,70 140,88" fill="#102b4b" />
        <rect x="124" y="84" width="32" height="18" rx="3" fill="#173d6b" />
        <line x1="184" y1="70" x2="184" y2="98" stroke="#ffc83d" strokeWidth="4" strokeLinecap="round" />
        <circle cx="184" cy="102" r="5" fill="#ffc83d" />
      </g>
    </svg>
  );
}

/* the sample student lead: details lock and unlock in a loop */
function LeadCard({ onUnlock }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setOpen((o) => !o), 3400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`cs-lead ${open ? "open" : ""}`}>
      <div className="cs-lead-top">
        <span className="cs-av">S</span>
        <div>
          <b>Sample Student Lead</b>
          <small>Interested in your college</small>
        </div>
        <span className="cs-live"><i /> Live</span>
      </div>
      <p><span>Student ID</span><em>STU10234</em></p>
      <p><span>12th %</span><em>82%</em></p>
      <p><span>Course</span><em>B.Tech CSE</em></p>
      <p><span>Name</span><em key={`n${open}`} className={`swap ${open ? "" : "lock"}`}>{open ? "Keerthana" : "K••••••• 🔒"}</em></p>
      <p><span>Mobile</span><em key={`m${open}`} className={`swap ${open ? "" : "lock"}`}>{open ? "98765 43210" : "98•••••••• 🔒"}</em></p>
      <button className="cs-unlock-btn" onClick={onUnlock}>
        {open ? "✓ Details unlocked" : "Unlock Details – ₹100"}
      </button>
    </div>
  );
}

function Wave({ fill, pos = "top" }) {
  return (
    <svg className={`cs-wave ${pos}`} viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
      <path fill={fill} d="M0 0H1440V38C1290 92 1110 92 930 52S570 -6 390 34 90 80 0 50Z" />
    </svg>
  );
}

/* ---------- scroll-reveal helpers ---------- */

/* splits heading text into words: each word slides up (masked) one after another */
function Words({ children }) {
  let k = 0;
  const out = [];
  React.Children.toArray(children).forEach((c) => {
    if (typeof c === "string" || typeof c === "number") {
      String(c).split(/(\s+)/).forEach((t) => {
        if (!t) return;
        if (/^\s+$/.test(t)) {
          out.push(" ");
          return;
        }
        out.push(<span key={k} className="cs-wd" style={{ "--wi": k }}><span>{t}</span></span>);
        k += 1;
      });
    } else {
      out.push(<span key={k} className="cs-wd" style={{ "--wi": k }}><span>{c}</span></span>);
      k += 1;
    }
  });
  return <>{out}</>;
}

/* one line of a paragraph: lines appear one by one */
function Ln({ i = 0, children }) {
  return <span className="cs-ln" style={{ "--li": i }}>{children}</span>;
}

/* ---------- hero: Live Admission Pulse (live bars + unlock ticker + travelling ₹ coin) ---------- */
const HP_STEPS = [["🎓", "Student shows interest"], ["💳", "College pays ₹100"], ["📲", "Admission call"]];
const HP_FEED = [
  ["Salem", "B.Tech CSE", "STU10235"],
  ["Coimbatore", "MBBS", "STU10236"],
  ["Erode", "B.Com", "STU10237"],
  ["Chennai", "B.Sc Nursing", "STU10238"],
  ["Tiruppur", "B.E ECE", "STU10239"],
];
const HP_BARS = 12;
const rndBars = () => Array.from({ length: HP_BARS }, () => 25 + Math.round(Math.random() * 70));

function HeroPulse() {
  const [step, setStep] = useState(0);
  const [bars, setBars] = useState(rndBars);
  const [feed, setFeed] = useState(0);
  const [today, setToday] = useState(186);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % HP_STEPS.length), 1500);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setBars(rndBars()), 2600);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => {
      setFeed((f) => (f + 1) % HP_FEED.length);
      setToday((n) => n + 1 + Math.floor(Math.random() * 3));
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const [city, course, id] = HP_FEED[feed];

  return (
    <div className="hp">
      <div className="hp-card">
        <span className="hp-glow" aria-hidden="true" />
        <div className="hp-head">
          <span className="hp-live"><i /> LIVE · ADMISSION PULSE</span>
          <span className="hp-today"><b><AnimatedNumber value={today} /></b>leads unlocked today</span>
        </div>

        <div className="hp-bars" aria-hidden="true">
          {bars.map((h, k) => (
            <i key={k} className={k === bars.length - 1 ? "last" : ""} style={{ "--h": `${h}%`, "--k": k }} />
          ))}
        </div>
        <div className="hp-axis"><span>9 AM</span><span>Now</span></div>

        <div className="hp-feed" key={feed}>
          <span className="hp-pin">📍</span>
          <p><b>{city}</b> college unlocked <em>{id}</em> · {course}</p>
          <span className="hp-rs">₹100</span>
        </div>
      </div>

      <div className="hp-track" aria-label="How a lead works">
        <span className="hp-rail">
          <i style={{ width: `${step * 50}%` }} />
          <span className="hp-coin" style={{ left: `${step * 50}%` }}>₹</span>
        </span>
        {HP_STEPS.map(([ic, t], k) => (
          <div key={t} className={`hp-st ${k <= step ? "on" : ""} ${k === step ? "now" : ""}`.trim()}>
            <b>{ic}</b>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* fixed side rail: a line that fills section by section, in nav order, as you scroll */
function SideRail({ active, show, onGo }) {
  const idx = Math.max(SPY_IDS.indexOf(active), 0);
  const pct = (idx / (MENU.length - 1)) * 100;
  return (
    <aside className={`cs-rail ${show ? "show" : ""}`} aria-label="Page sections">
      <span className="rl-line"><i style={{ height: `${pct}%` }} /></span>
      {MENU.map(([id, label, , icon], i) => (
        <button key={id} className={`rl-dot ${i < idx ? "done" : ""} ${i === idx ? "on" : ""}`.trim()} onClick={() => onGo(id)} aria-label={label}>
          <i className="rl-pt" />
          <span>{String(i + 1).padStart(2, "0")} · {icon} {label}</span>
        </button>
      ))}
    </aside>
  );
}

/* ---------- LEAD DOWNLOADS (counter page between Home and Colleges) ----------
   "Download" = a college pays Rs.100 to UNLOCK one student's full details (name, mobile, email) and save them.
   Numbers below are SAMPLE values. Replace with your API values.  The demo rows use fake data only. */
const DL_BASE = { downloads: 12450, students: 25430, leads: 18250, colleges: 325, price: 100 };

const DL_LEADS = [
  { id: "STU10231", pc: "82%", course: "B.Tech CSE", city: "Chennai", name: "Keerthana R", mobile: "98765 43210", email: "keerthana@example.com" },
  { id: "STU10232", pc: "91%", course: "MBBS", city: "Coimbatore", name: "Mohan S", mobile: "98765 43211", email: "mohan@example.com" },
  { id: "STU10233", pc: "76%", course: "B.Sc Nursing", city: "Salem", name: "Nandhini P", mobile: "98765 43212", email: "nandhini@example.com" },
  { id: "STU10234", pc: "88%", course: "B.Com", city: "Erode", name: "Barath K", mobile: "98765 43213", email: "barath@example.com" },
];

const DL_STEPS = [
  ["Find an interested student", "Free preview: Student ID, 12th %, course and location.", "👀"],
  ["Click Download for ₹100", "Pay securely. Only that one student's profile is unlocked.", "💳"],
  ["Server verifies the payment", "Details unlock only after our backend confirms the payment.", "🛡️"],
  ["Download the full details", "Name, mobile and email are saved in My Purchased Leads (CSV export).", "📥"],
];

/* number that counts up when it scrolls into view and eases to every later change */
function AnimatedNumber({ value, prefix = "", className = "" }) {
  const ref = useRef(null);
  const from = useRef(0);
  const [seen, setSeen] = useState(false);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) return undefined;
    const start = from.current;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / 1100, 1);
      const v = Math.round(start + (value - start) * (1 - Math.pow(1 - p, 3)));
      setShown(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, seen]);
  return <span ref={ref} className={className}>{prefix}{shown.toLocaleString("en-IN")}</span>;
}

function DownloadsSection({ onRegister, onBrowse }) {
  const [state, setState] = useState({}); // id -> "paying" | "done"
  const doneIds = DL_LEADS.filter((l) => state[l.id] === "done").map((l) => l.id);
  const mine = doneIds.length;

  const download = (id) => {
    if (state[id]) return;
    setState((s) => ({ ...s, [id]: "paying" }));
    setTimeout(() => setState((s) => ({ ...s, [id]: "done" })), 1100); // demo of "backend verified the payment"
  };

  const csv = () => {
    const rows = DL_LEADS.filter((l) => state[l.id] === "done");
    const text = [["Student ID", "12th %", "Course", "City", "Name", "Mobile", "Email"]]
      .concat(rows.map((l) => [l.id, l.pc, l.course, l.city, l.name, l.mobile, l.email]))
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob(["\ufeff" + text], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "campusconnect-sample-leads.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const total = DL_BASE.downloads + mine;

  return (
    <section id="downloads" className="dl">
      <span className="cs-blob b4" /><span className="cs-blob b5" />
      <div className="cs-wrap cs-sec">
        <span className="cs-eyebrow cs-rv">STUDENT POOL</span>
        <h2 className="cs-h2 cs-rv"><Words>Every download is a <span className="cs-grad">student ready to talk</span></Words></h2>
        <p className="cs-sub cs-rv">
          <Ln i={0}>A <b>download</b> means a college unlocks one student's full contact details for <b>₹{DL_BASE.price}</b> and saves them.</Ln>
          <Ln i={1}>Here is the live counter, how it works, and a sample you can try.</Ln>
        </p>

        <div className="dl-grid">
          <div className="dl-total cs-rv">
            <small>TOTAL STUDENT LEADS DOWNLOADED</small>
            <div className="dl-big" key={mine}><AnimatedNumber value={total} /></div>
            <p className="dl-sub">by <b>{DL_BASE.colleges}+</b> colleges across Tamil Nadu</p>
            <div className="dl-mini">
              <div><b><AnimatedNumber value={DL_BASE.students} /></b><span>students registered</span></div>
              <div><b><AnimatedNumber value={DL_BASE.leads} /></b><span>student leads available</span></div>
              <div><b><AnimatedNumber value={total * DL_BASE.price} prefix="₹" /></b><span>paid by colleges</span></div>
            </div>
          </div>

          <div className="dl-flow cs-rv">
            <h3>What is a download?</h3>
            <ol>
              {DL_STEPS.map(([t, d, ic], i) => (
                <li key={t} style={{ "--i": `${i * 90}ms` }}>
                  <span className="dl-ic">{ic}</span>
                  <div><b>{t}</b><small>{d}</small></div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="dl-demo cs-rv">
          <div className="dl-demo-head">
            <div>
              <h3>Try it: sample student leads</h3>
              <small>Demo with fake data. A real download needs a college login and a payment verified by our server.</small>
            </div>
            <div className="dl-session">
              <span><b><AnimatedNumber value={mine} /></b> downloaded</span>
              <span><b><AnimatedNumber value={mine * DL_BASE.price} prefix="₹" /></b> spent</span>
              <button className="cs-ghost" onClick={csv} disabled={!mine}>⬇ Download CSV ({mine})</button>
              <button className="dl-reset" onClick={() => setState({})} disabled={!mine}>Reset</button>
            </div>
          </div>

          <div className="dl-rows">
            {DL_LEADS.map((l, i) => {
              const st = state[l.id];
              const open = st === "done";
              return (
                <div key={l.id} className={`dl-row ${open ? "open" : ""}`} style={{ "--i": `${i * 80}ms` }}>
                  <span className="dl-av">{l.name[0]}</span>
                  <div className="dl-c id"><small>Student ID</small><b>{l.id}</b></div>
                  <div className="dl-c"><small>12th %</small><b>{l.pc}</b></div>
                  <div className="dl-c wide"><small>Course · City</small><b>{l.course} · {l.city}</b></div>
                  <div className="dl-c wide"><small>Name</small><b key={`n${open}`} className={open ? "swap" : "lock"}>{open ? l.name : "•••••••• 🔒"}</b></div>
                  <div className="dl-c wide"><small>Mobile</small><b key={`m${open}`} className={open ? "swap" : "lock"}>{open ? l.mobile : "98••• ••••• 🔒"}</b></div>
                  <div className="dl-c wide"><small>Email</small><b key={`e${open}`} className={open ? "swap" : "lock"}>{open ? l.email : "••••••@•••••.com 🔒"}</b></div>
                  <button className={`dl-btn ${st || ""}`} onClick={() => download(l.id)} disabled={Boolean(st)}>
                    {open ? "✓ Downloaded" : st === "paying" ? <><i className="dl-spin" /> Verifying…</> : `⬇ Download ₹${DL_BASE.price}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dl-cta cs-rv">
          <button className="cs-solid big" onClick={onRegister}>Register to download real leads <i className="cs-arr">→</i></button>
          <button className="cs-ghost big" onClick={onBrowse}><span className="cs-mag">🔍</span> Browse colleges</button>
        </div>
      </div>
    </section>
  );
}

/* ---------- "Please login" popup (shown instead of subscription prices when the college is not logged in) ---------- */
function LoginGate({ onLogin, onRegister, onClose }) {
  const btn = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    btn.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="lg-back" onClick={onClose} role="presentation">
      <div className="lg-card" role="dialog" aria-modal="true" aria-labelledby="lg-title" onClick={(e) => e.stopPropagation()}>
        <span className="lg-blob a" /><span className="lg-blob b" />
        <button className="lg-x" onClick={onClose} aria-label="Close">✕</button>

        <div className="lg-lock">
          <span className="lg-ring" /><span className="lg-ring r2" />
          <span className="lg-ico">🔒</span>
        </div>

        <span className="cs-eyebrow lg-eye">REGISTERED COLLEGES ONLY</span>
        <h3 id="lg-title">Please login to view prices</h3>
        <p className="lg-p">Subscription plans and prices are shown only after you login with your college account.</p>

        <div className="lg-teaser" aria-hidden="true">
          {PLANS.map((p, i) => (
            <div key={p.id} style={{ "--i": i }}>
              <b>{p.icon} {p.name}</b>
              <span className="lock">₹ ••••</span>
            </div>
          ))}
        </div>

        <div className="lg-actions">
          <button ref={btn} className="cs-solid big" onClick={onLogin}>Login to view prices <i className="cs-arr">→</i></button>
          <button className="cs-ghost big" onClick={onRegister}>New college? Register</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- HOME HERO (matches the reference design) ---------- */
const HX_ICONS = {
  cap: <><path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" /><path d="M7 12v4c0 1.4 2.2 2.6 5 2.6s5-1.2 5-2.6v-4" /><path d="M21 9.5v5" /></>,
  shield: <><path d="M12 3 5 6v5c0 4.6 3 8 7 10 4-2 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  users: <><circle cx="9" cy="9" r="3.2" /><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><circle cx="17" cy="8" r="2.5" /><path d="M16.5 13.5c2.6 0 4.5 1.7 4.5 4.5" /></>,
  bolt: <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.8-4.8" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /><circle cx="12" cy="15.5" r="1.3" /></>,
  chat: <><path d="M4 5h16v11H10l-4.5 4v-4H4V5Z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />,
};
function Ico({ n }) {
  return (
    <svg className="hx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {HX_ICONS[n]}
    </svg>
  );
}

/* round cartoon student avatar (pure SVG, no image files needed) */
function Student({ skin, hair, shirt, bg, girl, glasses, strap }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" fill={bg} />
      {girl && <path d="M27 48c0-24 10-31 23-31s23 7 23 31c0 14 4 26 4 38H23c0-12 4-24 4-38Z" fill={hair} />}
      <path d="M14 100c0-17 14-27 36-27s36 10 36 27Z" fill={shirt} />
      {strap && <path d="M33 80l-5 20M67 80l5 20" stroke={strap} strokeWidth="5" strokeLinecap="round" />}
      <rect x="43" y="60" width="14" height="16" rx="6" fill={skin} />
      <ellipse cx="50" cy="46" rx="19" ry="21" fill={skin} />
      {girl ? <path d="M31 46c0-17 8-24 19-24s19 7 19 24c-6-5-9-12-10-16-5 8-16 14-28 16Z" fill={hair} /> : <path d="M30 45c-3-20 10-28 21-27 13 1 19 12 18 27-3-6-5-12-6-15-8 4-22 4-33 15Z" fill={hair} />}
      <circle cx="43" cy="48" r="2.2" fill="#1c2b4a" />
      <circle cx="57" cy="48" r="2.2" fill="#1c2b4a" />
      <path d="M44 56q6 5 12 0" stroke="#1c2b4a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {glasses && <g fill="none" stroke="#1c2b4a" strokeWidth="2"><circle cx="43" cy="48" r="6.5" /><circle cx="57" cy="48" r="6.5" /><path d="M49.5 48h1" /></g>}
    </svg>
  );
}

/* a = start angle on the orbit ring (degrees) */
const HX_STU = [
  { a: 232, skin: "#f2b48a", hair: "#16213e", shirt: "#2f7de1", bg: "#9fd0ff", strap: "#1a4fa0", tag: true },
  { a: 308, skin: "#f5c09a", hair: "#1b1b2f", shirt: "#ffb02e", bg: "#ffd9a0", girl: true, tag: true },
  { a: 128, skin: "#f2b48a", hair: "#1b1b2f", shirt: "#ff8fb1", bg: "#ffc9dd", girl: true, strap: "#e0557f", tag: true },
  { a: 52, skin: "#e9a77c", hair: "#16213e", shirt: "#0f6a8a", bg: "#bfe8ff", glasses: true, strap: "#0a4660" },
];
const HX_NODES = [[50, 0], [6.7, 75], [93.3, 75]];
/* student photos for the hero circles (same order as HX_STU) */
const HX_PICS = [
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,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",
];
const HX_H1 = [["Find", "Students", "Who", "Are"], ["Looking", "for", "a", "College"]];
const HX_TRUST = [["shield", "Verified Colleges", "Trusted & Genuine"], ["users", "Real Student Leads", "Verified 12th Students"], ["bolt", "Quick & Easy", "Just ₹100 per Lead"]];
const HX_WORKS = [
  ["search", "Discover Students", "Browse interested students based on course & location."],
  ["users", "Receive Interest", "Students show interest in your college."],
  ["lock", "Unlock Contact", "Pay just ₹100 to get student details."],
  ["chat", "Connect for Admission", "Start your admission conversation directly."],
];

function CollegeSite() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const barRef = useRef(null);
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const lineRef = useRef(null);

  let loggedIn = false;
  try {
    loggedIn = Boolean(localStorage.getItem(SESSION_KEY));
  } catch {
    loggedIn = false;
  }

  // "site" = public website, "pricing" = login-only subscription prices
  const [view, setView] = useState(() => {
    try {
      return loggedIn && new URLSearchParams(window.location.search).get("view") === "plans" ? "pricing" : "site";
    } catch {
      return "site";
    }
  });
  const [gate, setGate] = useState(false); // "Please login" popup for Subscription
  const [period, setPeriod] = useState("6m");
  const [selected, setSelected] = useState("gold");

  const goLogin = () => navigate("/college/register?mode=login");
  const goRegister = () => navigate("/college/register");
  const goDashboard = () => navigate("/college/dashboard");

  // remember where to come back to after login (login page reads this key)
  const rememberPlans = () => {
    try {
      sessionStorage.setItem(AFTER_LOGIN_KEY, "/college/home?view=plans");
    } catch {
      /* ignore */
    }
  };

  // Subscription prices are login-only
  const goPlans = () => {
    setMenu(false);
    if (loggedIn) {
      setGate(false);
      setView("pricing");
      window.scrollTo({ top: 0 });
      return;
    }
    // not logged in: show "Please login" — prices are NOT rendered
    setGate(true);
  };
  const gateLogin = () => {
    rememberPlans();
    setGate(false);
    goLogin();
  };
  const gateRegister = () => {
    rememberPlans();
    setGate(false);
    goRegister();
  };

  const scrollTo = (id) => {
    setMenu(false);
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (view !== "site") {
      setView("site");
      setTimeout(go, 80);
    } else {
      go();
    }
  };

  /* ---- subscription pricing (login only) ---- */
  const showPricing = view === "pricing" && loggedIn;
  const navActive = showPricing ? "plans" : active; // Subscription stays highlighted on the prices page
  const pIndex = Math.max(PERIODS.findIndex(([id]) => id === period), 0);
  const [, pLabel, months, discount] = PERIODS[pIndex];
  const priceOf = (plan) => {
    const full = MONTHLY[plan.id] * months;
    const total = full * (1 - discount / 100);
    return { full, total, perMonth: total / months };
  };
  const chosen = PLANS.find((p) => p.id === selected) || PLANS[0];
  const chosenPrice = priceOf(chosen);
  const proceed = () => {
    // Create a payment order on the backend here; unlock only after the backend verifies payment.
    navigate(`/college/payment?plan=${chosen.id}&period=${period}`);
  };

  useEffect(() => {
    // reveal on scroll
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );
    const watch = () => document.querySelectorAll(".cs-rv:not(.in)").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    const sweep = () =>
      document.querySelectorAll(".cs-rv:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.94) el.classList.add("in");
      });
    const sweepTimer = setInterval(sweep, 500);

    // active menu item
    const secs = SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    secs.forEach((el) => spy.observe(el));

    // progress bar + header + travelling timeline circle
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1)) * 100;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      setScrolled(h.scrollTop > 400);

      const tl = lineRef.current;
      if (tl) {
        const steps = tl.querySelectorAll(".cs-step");
        const centers = Array.from(steps).map((s) => {
          const n = s.querySelector(".cs-num");
          return s.offsetTop + n.offsetTop + n.offsetHeight / 2; // not affected by reveal animations
        });
        if (centers.length) {
          const y0 = centers[0];
          const y1 = centers[centers.length - 1];
          const r = tl.getBoundingClientRect();
          const headY = window.innerHeight * 0.6; // the glowing circle sits here while you scroll
          const p = Math.min(Math.max((headY - r.top - y0) / Math.max(y1 - y0, 1), 0), 1);
          tl.style.setProperty("--y0", `${y0}px`);
          tl.style.setProperty("--len", `${y1 - y0}px`);
          tl.style.setProperty("--p", p.toFixed(4));
          steps.forEach((s, i) => s.classList.toggle("hit", r.top + centers[i] <= headY));
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    // soft light that follows the mouse
    const onMove = (e) => {
      if (glowRef.current) glowRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // click ripple on buttons
    const onDown = (e) => {
      const b = e.target.closest ? e.target.closest(".cs-solid,.cs-ghost,.cs-white,.cs-outline,.dl-btn,.cs-unlock,.cs-unlock-btn") : null;
      if (!b || b.disabled) return;
      const r = b.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.7;
      const s = document.createElement("span");
      s.className = "cs-ripple";
      s.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      b.appendChild(s);
      setTimeout(() => s.remove(), 700);
    };
    window.addEventListener("pointerdown", onDown, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      clearInterval(sweepTimer);
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [view]);

  const onHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  const headWords = ["Find", "students", "who", "are", "already", "looking", "for", "a"];

  return (
    <div className="cs">
      <style>{styles}</style>
      <div className="cs-bar" ref={barRef} />
      <div className="cs-glow" ref={glowRef} aria-hidden="true" />
      {!showPricing && <SideRail active={active} show={scrolled} onGo={scrollTo} />}

      {/* FLOATING PILL NAV */}
      <header className={`cs-header ${scrolled ? "sc" : ""}`}>
        <div className="cs-pill">
          <button className="cs-brand" onClick={() => scrollTo("home")}>
            <span className="cs-logo"><CCLogo /></span>
            <span>
              <strong>CampusConnect</strong>
              <small>Student Leads · Better Admissions</small>
            </span>
          </button>

          <nav className={menu ? "open" : ""}>
            {MENU.map(([id, label, kind, icon], i) => (
              <button
                key={id}
                className={`${navActive === id ? "on" : ""} ${kind === "fancy" ? "cs-fancy" : ""}`.trim()}
                style={{ "--k": i }}
                onClick={() => scrollTo(id)}
              >
                {kind === "fancy" ? <span className="cs-fi" aria-hidden="true">🎓</span> : <span className="cs-ni" aria-hidden="true">{icon}</span>}
                <span className="cs-nl">{label}</span>
                {kind === "fancy" && <em className="cs-new">NEW</em>}
              </button>
            ))}
            <span className="cs-navcta">
              <button className="cs-solid" onClick={goRegister}>Register College <i className="cs-arr">→</i></button>
            </span>
          </nav>

          <button className="cs-burger" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? "✕" : "☰"}</button>
        </div>
      </header>

      {showPricing ? (
        /* ============ SUBSCRIPTION PRICING (LOGIN ONLY) ============ */
        <main className="sp-main">
          <span className="cs-blob b4" /><span className="cs-blob b5" /><span className="cs-blob b3" />
          <div className="cs-wrap sp-in">
            <button className="cs-ghost sp-back" onClick={() => scrollTo("plans")}>← Back to Plans</button>

            <div className="sp-head cs-rv">
              <span className="cs-tag"><i className="cs-dot" /> REGISTERED COLLEGES ONLY</span>
              <h1>Pick a plan and a <span className="cs-grad">duration</span></h1>
              <p>Longer plans cost less per month. Switch between 1 month, 6 months and 1 year.</p>
            </div>

            <div className="sp-toggle cs-rv" style={{ "--i": pIndex }}>
              <span className="sp-pill" />
              {PERIODS.map(([id, label, , off]) => (
                <button key={id} className={period === id ? "on" : ""} onClick={() => setPeriod(id)}>
                  {label}
                  {off > 0 && <em>Save {off}%</em>}
                </button>
              ))}
            </div>

            <div className="sp-plans">
              {PLANS.map((p, i) => {
                const { full, total, perMonth } = priceOf(p);
                return (
                  <article
                    key={`${p.id}-${period}`}
                    className={`sp-plan ${p.id} ${selected === p.id ? "sel" : ""}`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                    onClick={() => setSelected(p.id)}
                  >
                    {p.id === "gold" && <span className="sp-ribbon">Most chosen</span>}
                    <span className="sp-ic">{p.icon}</span>
                    <h3>{p.name}</h3>
                    <p className="sp-tg">{p.tagline}</p>

                    <div className="sp-price">
                      <strong>{rupee(total)}</strong>
                      <span>/ {pLabel.toLowerCase()}</span>
                    </div>
                    <p className="sp-per">
                      {rupee(perMonth)} per month
                      {discount > 0 && <s>{rupee(full)}</s>}
                    </p>

                    <ul>
                      {p.features.map((f) => (
                        <li key={f}><i>✓</i>{f}</li>
                      ))}
                    </ul>

                    <button className={selected === p.id ? "cs-solid" : "cs-ghost"} onClick={() => setSelected(p.id)}>
                      {selected === p.id ? "✓ Selected" : `Choose ${p.name}`}
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="sp-summary" key={`${selected}-${period}`}>
              <div>
                <small>Your selection</small>
                <b>{chosen.icon} {chosen.name} · {pLabel}</b>
              </div>
              <div className="sp-total">{rupee(chosenPrice.total)}</div>
              <button className="cs-solid big" onClick={proceed}>Proceed to Payment →</button>
            </div>

            <p className="sp-note">Student lead unlocks are still ₹100 per lead.</p>
          </div>
        </main>
      ) : (
        <>
          {/* ================= HERO ================= */}
          <section id="home" className="hx" ref={heroRef} onMouseMove={onHeroMove}>
            <span className="cs-blob b1" /><span className="cs-blob b2" /><span className="cs-blob b3" />
            <div className="cs-wrap hx-wrap">
              <div className="hx-in">
                <div className="hx-copy">
                  <span className="hx-tag cs-pop"><Ico n="cap" /> Connecting Colleges &amp; Students</span>
                  <h1>
                    {HX_H1.map((ln, r) => (
                      <span className="hx-ln" key={r}>
                        {ln.map((w, i) => (
                          <React.Fragment key={w}><span className="cs-w" style={{ "--w": r * 4 + i }}>{w}</span>{" "}</React.Fragment>
                        ))}
                      </span>
                    ))}
                    <span className="hx-ln"><span className="cs-w cs-grad" style={{ "--w": 8 }}>Like Yours</span></span>
                  </h1>
                  <p className="cs-lede">
                    <b className="dk">CampusConnect</b> connects colleges with <b className="dk">prospective students</b> after 12th standard.
                    Browse interested students, unlock their contact details for just <b>₹100 per lead</b> and start your admission conversation.
                  </p>
                  <div className="cs-row">
                    <button className="cs-solid hx-btn" onClick={goRegister}>Register College <i className="cs-arr">→</i></button>
                    <button className="cs-ghost hx-btn" onClick={() => scrollTo("how")}><span className="hx-play"><Ico n="play" /></span> Explore How It Works</button>
                  </div>
                  <div className="hx-trust">
                    {HX_TRUST.map(([ic, t, s]) => (
                      <div className={`hx-tr ${ic}`} key={t}><span><Ico n={ic} /></span><div><b>{t}</b><small>{s}</small></div></div>
                    ))}
                  </div>
                </div>

                <div className="hx-stage">
                  <div className="hx-ob">
                    <span className="hx-emit" aria-hidden="true" />
                    <span className="hx-emit e2" aria-hidden="true" />
                    <span className="hx-emit e3" aria-hidden="true" />
                    <div className="hx-sphere"><Campus /></div>
                    <div className="hx-orbit">
                      {/* energy beams: college -> each student circle (rotate together with the orbit) */}
                      <svg className="hx-beams" viewBox="0 0 100 100" aria-hidden="true">
                        <defs>
                          {HX_STU.map(({ a }, i) => {
                            const r = (a * Math.PI) / 180;
                            return (
                              <linearGradient key={a} id={`hxBm${i}`} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2={50 + 38.5 * Math.cos(r)} y2={50 + 38.5 * Math.sin(r)}>
                                <stop offset="0" stopColor="#19b3e6" stopOpacity="0" />
                                <stop offset=".4" stopColor="#19b3e6" stopOpacity=".25" />
                                <stop offset=".7" stopColor="#1f8fe8" stopOpacity=".7" />
                                <stop offset="1" stopColor="#1766e6" stopOpacity=".95" />
                              </linearGradient>
                            );
                          })}
                        </defs>
                        {HX_STU.map(({ a }, i) => {
                          const r = (a * Math.PI) / 180;
                          const d = `M50 50L${(50 + 38.5 * Math.cos(r)).toFixed(2)} ${(50 + 38.5 * Math.sin(r)).toFixed(2)}`;
                          return (
                            <g key={a}>
                              <path d={d} fill="none" stroke={`url(#hxBm${i})`} strokeWidth=".8" strokeLinecap="round" />
                              <path className="hx-flow" d={d} fill="none" stroke={`url(#hxBm${i})`} strokeWidth=".35" strokeLinecap="round" strokeDasharray="1.2 2.6" />
                              <g opacity="0">
                                <circle r="3.2" fill="#19b3e6" opacity=".32" />
                                <circle r="1.5" fill="#fff" stroke="#19b3e6" strokeWidth=".5" />
                                <animateMotion dur="2.6s" begin={`${(i * 0.65).toFixed(2)}s`} repeatCount="indefinite" path={d} />
                                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur="2.6s" begin={`${(i * 0.65).toFixed(2)}s`} repeatCount="indefinite" />
                              </g>
                            </g>
                          );
                        })}
                      </svg>
                      {HX_NODES.map(([x, y]) => <i key={`${x}-${y}`} className="hx-node" style={{ left: `${x}%`, top: `${y}%` }} />)}
                      {HX_STU.map(({ a, tag, ...look }, i) => {
                        const r = (a * Math.PI) / 180;
                        return (
                          <div key={a} className="hx-it" style={{ left: `${50 + 50 * Math.cos(r)}%`, top: `${50 + 50 * Math.sin(r)}%` }}>
                            <div className="hx-up">
                              <span className="hx-av" style={{ "--k": i }}><img src={HX_PICS[i]} alt="Student" draggable="false" /></span>
                              {tag && <em className="hx-int"><i />Interested</em>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="hx-chip"><Ico n="users" /><span><b>Matching Students</b><small>with the Right Colleges</small></span></div>
                  <div className="hx-card"><LeadCard onUnlock={() => scrollTo("pricing")} /></div>
                </div>
              </div>

              <div className="hx-works">
                <svg className="hx-sea" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20Q50 0 100 20T200 20T300 20T400 20V40H0Z" /></svg>
                <svg className="hx-sea s2" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22Q50 38 100 22T200 22T300 22T400 22V40H0Z" /></svg>
                <h3>How CampusConnect Works</h3>
                <div className="hx-steps">
                  {HX_WORKS.map(([ic, t, d], i) => (
                    <React.Fragment key={t}>
                      {i > 0 && <span className="hx-arrow" aria-hidden="true">→</span>}
                      <div className="hx-step" style={{ "--i": i }}>
                        <span className={`hx-ic c${i + 1}`}><Ico n={ic} /><b>{i + 1}</b></span>
                        <div><h4>{t}</h4><p>{d}</p></div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= RIBBONS ================= */}
          <div className="cs-ribbons" aria-hidden="true">
            <div className="cs-ribbon a">
              <div className="cs-track">
                {[...RIBBON_A, ...RIBBON_A, ...RIBBON_A].map((t, i) => (
                  <span key={i}>{t}<i>✦</i></span>
                ))}
              </div>
            </div>
            <div className="cs-ribbon b">
              <div className="cs-track rev">
                {[...RIBBON_B, ...RIBBON_B, ...RIBBON_B].map((t, i) => (
                  <span key={i}>{t}<i>●</i></span>
                ))}
              </div>
            </div>
          </div>

          {/* ================= LEAD DOWNLOADS COUNTER ================= */}
          <DownloadsSection onRegister={goRegister} onBrowse={() => scrollTo("districts")} />

          {/* ================= EXPLORE COLLEGES ================= */}
          <section id="districts" className="cs-districts">
            <span className="cs-blob b4" /><span className="cs-blob b5" />
            <CollegeExplorer embedded />
          </section>

          {/* ================= COUNTERS ================= */}
          <section className="cs-stats">
            <Wave fill="#f5f8ff" />
            <Wave fill="#f5f8ff" pos="bottom" />
            <span className="cs-blob b6" /><span className="cs-blob b7" />
            <div className="cs-wrap cs-stats-in">
              {STATS.map(([to, suffix, label, pct, hue], i) => (
                <div key={label} className="cs-rv zoom" style={{ "--d": `${i * 0.12}s` }}>
                  <StatRing to={to} suffix={suffix} label={label} pct={pct} hue={hue} />
                </div>
              ))}
            </div>
          </section>

          {/* ================= WHY (bento) ================= */}
          <section className="cs-light cs-why">
            <div className="cs-wrap cs-sec">
              <span className="cs-eyebrow cs-rv">WHY CAMPUSCONNECT</span>
              <h2 className="cs-h2 cs-rv"><Words>Why colleges use <span className="cs-grad">CampusConnect</span></Words></h2>
              <div className="cs-bento">
                <Tilt className="bn bn1 cs-rv zoom">
                  <span className="bn-ic">🎯</span>
                  <h3>Real student interest</h3>
                  <p>Every lead is a student who showed interest in a college or course.</p>
                  <div className="bn-feed">
                    <div><i>S</i><span>STU10236 · 84% · B.Sc CS</span><em>just now</em></div>
                    <div><i>R</i><span>STU10237 · 79% · B.E Mech</span><em>2 min</em></div>
                    <div><i>A</i><span>STU10238 · 91% · MBBS</span><em>5 min</em></div>
                  </div>
                </Tilt>
                <Tilt className="bn bn2 cs-rv zoom" style={{ "--d": "0.1s" }}>
                  <span className="bn-ic">🔓</span>
                  <h3>Free preview, pay to unlock</h3>
                  <p>See ID, 12th % and course free. Pay ₹100 only for contact details.</p>
                  <div className="bn-lock"><span>🔒</span></div>
                </Tilt>
                <Tilt className="bn bn3 cs-rv zoom" style={{ "--d": "0.2s" }}>
                  <span className="bn-ic">📊</span>
                  <h3>Private dashboard</h3>
                  <p>Track leads, purchases, spending and receipts in one place.</p>
                  <div className="bn-bars"><i /><i /><i /><i /><i /></div>
                </Tilt>
                <Tilt className="bn bn4 cs-rv zoom" style={{ "--d": "0.3s" }}>
                  <span className="bn-ic">📍</span>
                  <h3>Chennai · Coimbatore · Erode · Salem · Tiruppur and {TOTAL_DISTRICTS - 5} more districts</h3>
                  <p>Engineering, Arts & Science, Medical, Nursing, Management and more.</p>
                  <div className="bn-chips">
                    {["Engineering", "Arts & Science", "Medical", "Nursing", "Management", "Physiotherapy"].map((c) => <span key={c}>{c}</span>)}
                  </div>
                </Tilt>
              </div>
            </div>
          </section>

          {/* ================= PLANS (prices only after login) ================= */}
          <section id="plans" className="cs-light">
            <div className="cs-wrap cs-sec">
              <span className="cs-eyebrow cs-rv">BOOST PLANS</span>
              <h2 className="cs-h2 cs-rv"><Words>Choose a plan that <span className="cs-grad">fits your college</span></Words></h2>
              <div className="cs-plans">
                {PLANS.map((p, i) => (
                  <Tilt key={p.id} className={`cs-plan ${p.id} cs-rv zoom`} style={{ "--d": `${i * 0.12}s` }} max={6}>
                    {p.id === "gold" && <span className="cs-pop-badge">★ Most chosen</span>}
                    <span className="cs-plan-ic">{p.icon}</span>
                    <h3>{p.name}</h3>
                    <p className="cs-plan-tag">{p.tagline}</p>
                    <ul>
                      {p.features.map((f) => (
                        <li key={f}><i>✓</i>{f}</li>
                      ))}
                    </ul>
                    <button className="cs-solid" onClick={goPlans}>
                      {loggedIn ? "View Plans & Prices →" : "🔒 Login to view prices"}
                    </button>
                  </Tilt>
                ))}
              </div>
              <p className="cs-plans-note cs-rv">
                Plans are available for 1 month, 6 months and 1 year. {loggedIn ? "Open any plan to compare durations." : "Prices are shown to registered colleges after login."}
              </p>
            </div>
          </section>

          {/* ================= HOW IT WORKS ================= */}
          <section id="how" className="cs-how">
            <span className="cs-blob b4" />
            <div className="cs-wrap cs-sec">
              <span className="cs-eyebrow cs-rv">HOW WE WORK</span>
              <h2 className="cs-h2 cs-rv"><Words>From registration to student contact in <span className="cs-grad">six steps</span></Words></h2>

              <div className="cs-tl" ref={lineRef}>
                <span className="cs-tl-line"><i /></span>
                <span className="cs-tl-dot" aria-hidden="true" />
                {STEPS.map(([t, d, ic], i) => (
                  <article key={t} className={`cs-step ${i % 2 ? "r" : "l"} cs-rv ${i % 2 ? "right" : "left"}`}>
                    <span className="cs-num"><b>{i + 1}</b></span>
                    <Tilt className="cs-step-card" max={5}>
                      <span className="cs-step-ic">{ic}</span>
                      <h3>{t}</h3>
                      <p>{d}</p>
                    </Tilt>
                  </article>
                ))}
              </div>

              {/* public -> private explained */}
              <div className="cs-flow cs-rv">
                <div><b>1</b><span>Public website</span><small>You are here</small></div>
                <i />
                <div><b>2</b><span>Register / Login</span><small>Private access</small></div>
                <i />
                <div><b>3</b><span>College profile</span><small>Your saved college</small></div>
                <i />
                <div><b>4</b><span>Dashboard</span><small>Buy leads for ₹100</small></div>
              </div>

              <div className="cs-preview cs-rv">
                <div className="cs-preview-head">
                  <b>Inside the private dashboard</b>
                  <span>Preview · login required to unlock</span>
                </div>
                <div className="cs-leads">
                  {LEADS.map(([id, pc, c, l, a], i) => (
                    <div key={id} className="cs-leadrow" style={{ "--i": i }}>
                      <span className="av">{a}</span>
                      <b className="id">{id}</b>
                      <span className="chip">{pc}</span>
                      <span className="chip c2">{c}</span>
                      <span className="chip c3">📍 {l}</span>
                      <span className="mob lock">••••••••• 🔒</span>
                      <button className="cs-unlock" onClick={goLogin}>Unlock ₹100</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cs-privacy cs-rv">
                <span className="shield">🔒</span>
                <div>
                  <h3>Student privacy is protected</h3>
                  <p>Mobile number and email stay hidden until a college unlocks the lead. The unlock is recorded only after the server verifies payment.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= PRICING (per lead) ================= */}
          <section id="pricing" className="cs-pricing">
            <Wave fill="#f5f8ff" />
            <Wave fill="#f5f8ff" pos="bottom" />
            <span className="cs-blob b6" /><span className="cs-blob b7" />
            <div className="cs-wrap cs-sec">
              <span className="cs-eyebrow dark cs-rv">JUST ₹100</span>
              <h2 className="cs-h2 light cs-rv"><Words>One simple price for every <span className="cs-grad">student lead</span></Words></h2>
              <div className="cs-price">
                <div className="cs-coinwrap cs-rv zoom">
                  <span className="cs-coin-ring" />
                  <div className="cs-coin">
                    <small>Per student lead</small>
                    <strong>₹100</strong>
                    <span>one-time · per lead</span>
                  </div>
                  <span className="cs-mini m1">₹</span><span className="cs-mini m2">₹</span><span className="cs-mini m3">₹</span>
                </div>
                <div className="cs-price-right cs-rv right">
                  <ul>
                    {["Free preview of every lead", "Name, mobile and email after unlock", "Saved forever in My Purchased Leads", "Secure payment, verified by server", "Receipts and transaction history", "Pay only for the leads you unlock"].map((x, i) => (
                      <li key={x} style={{ "--i": i }}><i>✓</i>{x}</li>
                    ))}
                  </ul>
                  <button className="cs-white" onClick={loggedIn ? goDashboard : goRegister}>
                    {loggedIn ? "Buy Leads" : "Register & Start Buying"} →
                  </button>
                </div>
              </div>
              <div className="cs-est">
                {[[10, "₹1,000"], [50, "₹5,000"], [100, "₹10,000"], [500, "₹50,000"]].map(([n, t], i) => (
                  <div key={n} className="cs-rv zoom" style={{ "--d": `${i * 0.1}s` }}><b>{n} leads</b><span>{t}</span></div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= BENEFITS ================= */}
          <section id="benefits" className="cs-light">
            <div className="cs-wrap cs-sec">
              <span className="cs-eyebrow cs-rv">WHY US</span>
              <h2 className="cs-h2 cs-rv"><Words>Why colleges choose <span className="cs-grad">CampusConnect</span></Words></h2>
              <div className="cs-grid3">
                {BENEFITS.map(([ic, t, d], i) => (
                  <Tilt key={t} className="cs-ben cs-rv zoom" style={{ "--d": `${(i % 3) * 0.12}s`, "--k": i }}>
                    <span className="cs-ben-ic">{ic}</span>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </Tilt>
                ))}
              </div>
            </div>
          </section>

          {/* ================= ABOUT ================= */}
          <section id="about" className="cs-about-sec">
            <span className="cs-blob b4" />
            <div className="cs-wrap cs-sec cs-about">
              <div className="cs-rv left">
                <span className="cs-eyebrow">OUR MISSION</span>
                <h2 className="cs-h2 left"><Words>Connecting <span className="cs-grad">students and colleges</span></Words></h2>
                <p>
                  <Ln i={0}>Students who finish 12th create a profile, search colleges and courses, and show interest.</Ln>
                  <Ln i={1}>Colleges that register on our platform see those interested students and can pay ₹100 to access the complete contact details of the students they want to reach.</Ln>
                </p>
                <p>
                  <Ln i={2}>We protect student privacy: contact details are hidden until purchase, and students agree to share their profile for admission purposes only.</Ln>
                </p>
                <div className="cs-pills">
                  <span>🔒 Privacy first</span><span>✅ Verified colleges</span><span>🤝 Consent based</span>
                </div>
              </div>
              <div className="cs-rv right cs-about-art">
                <div className="cs-blobframe sm"><Campus /></div>
                <span className="cs-orb o1 sm"><i>🎓</i></span>
                <span className="cs-orb o2 sm"><i>📚</i></span>
              </div>
            </div>
          </section>

          {/* ================= CONTACT ================= */}
          <section id="contact" className="cs-light">
            <div className="cs-wrap cs-sec">
              <span className="cs-eyebrow cs-rv">REACH US</span>
              <h2 className="cs-h2 cs-rv"><Words>We'd love to <span className="cs-grad">hear from you</span></Words></h2>
              <div className="cs-contact cs-rv zoom">
                <div className="cs-contact-side">
                  <span className="cs-env">✉️</span>
                  <h3>Say hello</h3>
                  <p>Tell us about your college and what you need. We will get back to you soon.</p>
                  <span className="cs-c-blob a" /><span className="cs-c-blob b" />
                </div>
                <form
                  className="cs-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                    e.target.reset();
                  }}
                >
                  <label>College Name<input required placeholder="Your college name" /></label>
                  <label>Official Email<input required type="email" placeholder="admissions@college.edu" /></label>
                  <label>Mobile<input required inputMode="tel" placeholder="10-digit number" /></label>
                  <label>District
                    <select defaultValue="Coimbatore">
                      {Object.entries(INDIA_DISTRICTS).map(([st, list]) => (
                        <optgroup key={st} label={st}>
                          {list.map((d) => <option key={`${st}-${d}`} value={d}>{d}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </label>
                  <label className="full">Message<textarea required rows="4" placeholder="How can we help?" /></label>
                  <button className="cs-solid big full" type="submit">Send Message →</button>
                  {sent && <p className="cs-ok full">✓ Thank you! We will contact you soon.</p>}
                </form>
              </div>
            </div>
          </section>

          {/* ================= CTA ================= */}
          <section className="cs-wrap cs-ctawrap">
            <div className="cs-banner cs-rv zoom">
              <span className="cs-c-blob a" /><span className="cs-c-blob b" /><span className="cs-c-blob c" />
              <h2>Ready to reach this year's students?</h2>
              <p>Create your college account in minutes. Admin verifies your college before you go live.</p>
              <div className="cs-row center">
                <button className="cs-white" onClick={goRegister}>Register College</button>
                <button className="cs-outline" onClick={goLogin}>College Login</button>
              </div>
            </div>
          </section>

          <footer className="cs-footer">
            <div className="cs-wrap cs-footer-in">
              <div className="cs-fbrand">
                <strong>CampusConnect</strong>
                <p>Student contact details are shared only with consent and after purchase.</p>
              </div>
              <div className="cs-flinks">
                {MENU.map(([id, l]) => <button key={id} onClick={() => scrollTo(id)}>{l}</button>)}
                <button onClick={goLogin}>College Login</button>
                <button onClick={goRegister}>Register</button>
              </div>
            </div>
            <div className="cs-wordmark" aria-hidden="true">CampusConnect</div>
          </footer>
        </>
      )}

      {gate && !loggedIn && <LoginGate onLogin={gateLogin} onRegister={gateRegister} onClose={() => setGate(false)} />}

      <button className={`cs-top ${scrolled ? "show" : ""}`} onClick={() => scrollTo("home")} aria-label="Back to top">↑</button>
    </div>
  );
}

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");
@property --ang {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
html {
  scroll-behavior:smooth;
}
body {
  display:block!important;
  background:#f5f8ff!important;
  color-scheme:light;
  margin:0!important;
}
#root {
  width:100%!important;
  max-width:none!important;
  margin:0!important;
  padding:0!important;
  border:0!important;
  text-align:left!important;
  display:block!important;
  min-height:0!important;
}
.cs {
  --pad:clamp(20px,5vw,84px);
  --nav:76px;
  --ink:#0b1b3a;
  --blue:#1558d6;
  --sky:#19b3e6;
  --violet:#8b5cf6;
  --sun:#ffc83d;
  --coral:#ff7a59;
  --muted:#52698a;
  min-height:100vh;
  color:var(--ink);
  font-family:"Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:18px;
  line-height:1.55;
  text-align:left;
  overflow-x:hidden;
  position:relative;
}
.cs * {
  box-sizing:border-box;
}
:where(.cs) h1,:where(.cs) h2,:where(.cs) h3,:where(.cs) p {
  margin:0;
  letter-spacing:normal;
  font-family:inherit;
  text-align:inherit;
}
:where(.cs) h1,:where(.cs) h2,:where(.cs) h3 {
  font-family:"Bricolage Grotesque","Plus Jakarta Sans",sans-serif;
}
:where(.cs) button {
  font:inherit;
  cursor:pointer;
}
.cs button:focus-visible,.cs a:focus-visible,.cs input:focus-visible,.cs select:focus-visible,.cs textarea:focus-visible {
  outline:3px solid rgba(21,88,214,.5);
  outline-offset:3px;
}
.cs-wrap {
  width:100%;
  max-width:1680px;
  margin:0 auto;
  padding-inline:var(--pad);
}
.cs-sec {
  padding-block:clamp(70px,9vw,130px);
  position:relative;
}
.cs-center {
  display:flex;
  justify-content:center;
}
/* progress bar + mouse glow */
.cs-bar {
  position:fixed;
  top:0;
  left:0;
  height:5px;
  width:0;
  z-index:400;
  border-radius:0 5px 5px 0;
  background:linear-gradient(90deg,#1458d8,#19b3e6,#8b5cf6,#ffc83d);
}
.cs-glow {
  position:fixed;
  top:0;
  left:0;
  width:460px;
  height:460px;
  margin:-230px 0 0 -230px;
  border-radius:50%;
  background:radial-gradient(circle,rgba(60,130,255,.17),transparent 65%);
  pointer-events:none;
  z-index:2;
  mix-blend-mode:multiply;
  transition:transform .14s linear;
}
@media (hover:none) {
  .cs-glow {
    display:none;
  }
}
/* ---------- floating pill nav ---------- */
.cs-header {
  position:fixed;
  top:14px;
  left:0;
  right:0;
  z-index:300;
  padding-inline:clamp(10px,2vw,28px);
  pointer-events:none;
}
.cs-pill {
  pointer-events:auto;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  width:100%;
  max-width:2600px;
  margin:0 auto;
  height:var(--nav);
  padding:0 18px 0 14px;
  border-radius:999px;
  background:rgba(255,255,255,.76);
  backdrop-filter:blur(18px) saturate(1.6);
  -webkit-backdrop-filter:blur(18px) saturate(1.6);
  border:1px solid rgba(255,255,255,.95);
  box-shadow:0 12px 40px rgba(21,60,140,.14);
  transition:background .35s,box-shadow .35s;
}
.cs-header.sc .cs-pill {
  background:rgba(255,255,255,.93);
  box-shadow:0 18px 50px rgba(21,60,140,.24);
}
.cs-brand {
  display:flex;
  align-items:center;
  gap:12px;
  border:0;
  background:none;
  padding:0;
  text-align:left;
  color:inherit;
}
.cs-logo svg {
  width:66%;
  height:66%;
  display:block;
}
.cs-logo {
  display:grid;
  place-items:center;
  width:52px;
  height:52px;
  border-radius:50% 50% 50% 16%;
  background:linear-gradient(135deg,#1458d8,#19b3e6);
  color:#fff;
  font-family:"Bricolage Grotesque",sans-serif;
  font-weight:800;
  font-size:20px;
  box-shadow:0 10px 22px rgba(21,88,214,.35);
  animation:morph 9s ease-in-out infinite;
}
.cs-brand strong {
  display:block;
  color:#0f2a5c;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:22px;
  font-weight:800;
  letter-spacing:-.3px;
  line-height:1.1;
}
.cs-brand small {
  display:block;
  margin-top:2px;
  color:#6d86a6;
  font-size:12.5px;
  font-weight:700;
  white-space:nowrap;
}
.cs-header nav {
  display:flex;
  align-items:center;
  gap:2px;
}
.cs-header nav>button {
  position:relative;
  border:0;
  background:none;
  padding:11px 15px;
  border-radius:999px;
  color:#47608a;
  font-size:16.5px;
  font-weight:700;
  white-space:nowrap;
  transition:background .25s,color .25s,transform .25s;
}
.cs-header nav>button:hover {
  background:#eaf2ff;
  color:var(--blue);
  transform:translateY(-2px);
}
.cs-header nav>button.on {
  background:linear-gradient(100deg,#e3eeff,#dff4ff);
  color:var(--blue);
}
.cs-navcta {
  display:flex;
  align-items:center;
  gap:8px;
  margin-left:10px;
}
.cs-burger {
  display:none;
  place-items:center;
  width:50px;
  height:50px;
  border:0;
  background:#eaf2ff;
  color:var(--blue);
  border-radius:50%;
  font-size:22px;
}
/* buttons: all pill shaped */
.cs-solid,.cs-ghost,.cs-white,.cs-outline {
  position:relative;
  overflow:hidden;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  min-height:50px;
  padding:0 26px;
  border-radius:999px;
  font-size:16.5px;
  font-weight:800;
  border:0;
  white-space:nowrap;
  transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,background-position .5s;
}
.cs-solid {
  color:#fff;
  background:linear-gradient(100deg,#1349c2,#1766e6,#19b3e6,#1349c2);
  background-size:300% 100%;
  box-shadow:0 12px 26px rgba(22,103,224,.32);
}
.cs-solid::after,.cs-white::after {
  content:"";
  position:absolute;
  top:0;
  left:-80%;
  width:45%;
  height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);
  transform:skewX(-20deg);
  animation:shine 3.6s infinite;
}
.cs-solid:hover {
  transform:translateY(-4px) scale(1.03);
  background-position:100% 0;
  box-shadow:0 18px 34px rgba(22,103,224,.42);
}
.cs-ghost {
  color:#1c5eb9;
  background:#fff;
  border:2px solid #cfe1fb;
}
.cs-ghost:hover {
  background:#eef5ff;
  border-color:var(--blue);
  transform:translateY(-3px);
}
.cs-white {
  background:#fff;
  color:#1349c2;
  box-shadow:0 14px 30px rgba(0,0,0,.18);
}
.cs-white:hover {
  transform:translateY(-4px) scale(1.04);
}
.cs-outline {
  background:transparent;
  color:#fff;
  border:2px solid rgba(255,255,255,.75);
}
.cs-outline:hover {
  background:rgba(255,255,255,.18);
  transform:translateY(-3px);
}
.cs-solid.big,.cs-ghost.big {
  min-height:60px;
  padding:0 34px;
  font-size:18px;
}
.cs-arr {
  font-style:normal;
  display:inline-block;
  transition:transform .25s;
}
.cs-solid:hover .cs-arr {
  transform:translateX(7px);
}
.cs-mag {
  display:inline-block;
  animation:wiggle 4s ease-in-out infinite;
}
/* ---------- headings ---------- */
.cs-eyebrow {
  display:table;
  margin:0 auto 18px;
  padding:9px 20px;
  border-radius:999px;
  background:#e1ecff;
  color:var(--blue);
  font-size:13.5px;
  font-weight:800;
  letter-spacing:2.2px;
}
.cs-eyebrow.dark {
  background:rgba(255,255,255,.13);
  color:#a9dcff;
}
.cs-h2 {
  margin-bottom:18px!important;
  font-size:clamp(34px,4.6vw,66px);
  line-height:1.06;
  font-weight:800;
  letter-spacing:-1.4px;
  text-align:center!important;
  color:var(--ink);
}
.cs-h2.left {
  text-align:left!important;
}
.cs-h2.light {
  color:#fff;
}
.cs-sub {
  max-width:640px;
  margin:0 auto 54px;
  text-align:center!important;
  font-size:20px;
  color:var(--muted);
}
.cs-grad {
  display:inline-block;
  background:linear-gradient(90deg,#1458d8,#19b3e6,#8b5cf6,#ff7a59,#1458d8);
  background-size:300% 100%;
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
  animation:grad 7s linear infinite;
}
.cs-tag {
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 20px;
  border-radius:999px;
  background:rgba(255,255,255,.85);
  border:1px solid #d4e4fb;
  color:var(--blue);
  font-size:13.5px;
  font-weight:800;
  letter-spacing:1.6px;
  box-shadow:0 8px 22px rgba(21,88,214,.12);
}
.cs-dot {
  display:inline-block;
  width:10px;
  height:10px;
  border-radius:50%;
  background:#10b981;
  animation:ping 1.8s infinite;
}
/* reveal on scroll (uses translate/scale so it never fights the 3D tilt transform) */
.cs-rv {
  opacity:0;
  translate:0 46px;
  transition:opacity .85s ease var(--d,0s),translate .85s cubic-bezier(.2,.8,.2,1) var(--d,0s),scale .85s cubic-bezier(.2,.8,.2,1) var(--d,0s),transform .25s ease-out,box-shadow .3s;
}
.cs-rv.left {
  translate:-70px 0;
}
.cs-rv.right {
  translate:70px 0;
}
.cs-rv.zoom {
  translate:0 30px;
  scale:.86;
}
.cs-rv.in {
  opacity:1;
  translate:0 0;
  scale:1;
}
/* 3D tilt + moving light */
.cs-tilt {
  --spot:rgba(21,88,214,.11);
  position:relative;
  transform:perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
  transform-style:preserve-3d;
  will-change:transform;
}
.cs-tilt::before {
  content:"";
  position:absolute;
  inset:0;
  border-radius:inherit;
  pointer-events:none;
  opacity:0;
  transition:opacity .3s;
  z-index:3;
  background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),var(--spot),transparent 55%);
}
.cs-tilt:hover::before {
  opacity:1;
}
/* ---------- blobs / sparks / waves ---------- */
.cs-blob {
  position:absolute;
  opacity:.5;
  pointer-events:none;
  filter:blur(2px);
  animation:morph 12s ease-in-out infinite,drift 18s ease-in-out infinite;
}
.cs-blob.b1 {
  width:520px;
  height:520px;
  background:#bcd6ff;
  top:-180px;
  left:-160px;
}
.cs-blob.b2 {
  width:420px;
  height:420px;
  background:#c1f1ff;
  bottom:-140px;
  right:6%;
  animation-delay:-4s;
}
.cs-blob.b3 {
  width:240px;
  height:240px;
  background:#e3d6ff;
  top:16%;
  right:44%;
  animation-delay:-8s;
}
.cs-blob.b4 {
  width:380px;
  height:380px;
  background:#cfe3fb;
  top:-100px;
  right:-90px;
}
.cs-blob.b5 {
  width:300px;
  height:300px;
  background:#d9f3ff;
  bottom:-90px;
  left:-70px;
  animation-delay:-6s;
}
.cs-blob.b6 {
  width:460px;
  height:460px;
  background:#2563eb;
  top:-120px;
  left:-120px;
  opacity:.28;
}
.cs-blob.b7 {
  width:420px;
  height:420px;
  background:#19b3e6;
  bottom:-140px;
  right:-100px;
  opacity:.25;
  animation-delay:-5s;
}
.cs-spark {
  position:absolute;
  color:#6f9dff;
  font-size:18px;
  opacity:0;
  pointer-events:none;
  animation:twinkle 4.5s ease-in-out infinite;
}
.cs-wave {
  position:absolute;
  left:0;
  width:100%;
  height:clamp(44px,6vw,96px);
  display:block;
  z-index:1;
  pointer-events:none;
}
.cs-wave.top {
  top:-1px;
}
.cs-wave.bottom {
  bottom:-1px;
  transform:scaleY(-1);
}
/* ---------- hero ---------- */
.cs-hero {
  --px:0;
  --py:0;
  position:relative;
  overflow:hidden;
  min-height:100vh;
  display:flex;
  align-items:center;
  padding:calc(var(--nav) + 64px) 0 110px;
  background:radial-gradient(900px 500px at 85% 10%,rgba(139,92,246,.14),transparent 70%),radial-gradient(800px 500px at 0% 90%,rgba(25,179,230,.16),transparent 70%),linear-gradient(160deg,#eaf3ff 0%,#f8fbff 55%,#e8f6ff 100%);
}
.cs-hero::before {
  content:"";
  position:absolute;
  inset:0;
  background-image:radial-gradient(rgba(21,88,214,.2) 1.6px,transparent 1.6px);
  background-size:34px 34px;
  -webkit-mask-image:radial-gradient(ellipse at 70% 40%,#000,transparent 70%);
  mask-image:radial-gradient(ellipse at 70% 40%,#000,transparent 70%);
  pointer-events:none;
}
.cs-hero-in {
  position:relative;
  z-index:3;
  display:grid;
  grid-template-columns:1.02fr .98fr;
  gap:clamp(24px,4vw,70px);
  align-items:center;
}
.cs-hero h1 {
  margin:24px 0 22px!important;
  font-size:clamp(42px,5.6vw,92px);
  line-height:1.02;
  font-weight:800;
  letter-spacing:-2.4px;
  color:var(--ink);
  text-align:left!important;
}
.cs-w {
  display:inline-block;
  opacity:0;
  animation:wordIn .9s cubic-bezier(.2,.8,.2,1) forwards;
  animation-delay:calc(var(--w) * .09s + .25s);
}
.cs-pop {
  animation:pop .8s cubic-bezier(.2,.8,.2,1) both;
}
.cs-lede {
  max-width:640px;
  margin-bottom:34px!important;
  font-size:clamp(18px,1.5vw,21px);
  line-height:1.75;
  color:#46608a;
  animation:pop 1s .9s cubic-bezier(.2,.8,.2,1) both;
}
.cs-lede b {
  color:var(--blue);
}
.cs-row {
  display:flex;
  gap:16px;
  flex-wrap:wrap;
  animation:pop 1s 1.1s cubic-bezier(.2,.8,.2,1) both;
}
.cs-row.center {
  justify-content:center;
}
.cs-trust {
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-top:34px;
  animation:pop 1s 1.3s cubic-bezier(.2,.8,.2,1) both;
}
.cs-trust span {
  padding:10px 18px;
  border-radius:999px;
  background:rgba(255,255,255,.8);
  border:1px solid #d9e7fb;
  font-size:15.5px;
  font-weight:700;
  color:#47608a;
  box-shadow:0 8px 18px rgba(21,60,140,.07);
}
.cs-trust b {
  color:var(--blue);
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:18px;
}
.cs-stage {
  position:relative;
  display:grid;
  place-items:center;
  min-height:clamp(420px,46vw,620px);
  animation:pop 1.1s .5s cubic-bezier(.2,.8,.2,1) both;
}
.cs-blobframe {
  position:relative;
  z-index:2;
  width:min(540px,100%);
  aspect-ratio:1/.96;
  overflow:hidden;
  border:9px solid #fff;
  background:linear-gradient(#bfe3ff,#eaf6ff);
  box-shadow:0 40px 80px rgba(21,70,150,.28);
  border-radius:58% 42% 52% 48%/48% 56% 44% 52%;
  animation:morph 14s ease-in-out infinite;
  translate:calc(var(--px) * -14px) calc(var(--py) * -14px);
}
.cs-blobframe.sm {
  width:min(480px,100%);
}
.cs-campus {
  display:block;
  width:100%;
  height:100%;
}
.cs-ring {
  position:absolute;
  z-index:1;
  top:50%;
  left:50%;
  width:min(620px,112%);
  aspect-ratio:1;
  margin:calc(min(620px,112%) / -2) 0 0 calc(min(620px,112%) / -2);
  border-radius:50%;
  border:3px dashed rgba(21,88,214,.28);
  animation:spin 40s linear infinite;
}
.cs-ring.r2 {
  width:min(720px,128%);
  margin:calc(min(720px,128%) / -2) 0 0 calc(min(720px,128%) / -2);
  border:2px solid rgba(139,92,246,.18);
  animation-direction:reverse;
  animation-duration:60s;
}
.cs-orbit {
  position:absolute;
  z-index:4;
  inset:-3%;
  animation:spin 32s linear infinite;
  pointer-events:none;
  translate:calc(var(--px) * 26px) calc(var(--py) * 26px);
}
.cs-orb {
  position:absolute;
  display:grid;
  place-items:center;
  width:68px;
  height:68px;
  border-radius:50% 50% 50% 14%;
  background:#fff;
  box-shadow:0 18px 36px rgba(21,70,150,.25);
}
.cs-orb i {
  font-style:normal;
  font-size:32px;
  display:block;
  animation:spinrev 32s linear infinite;
}
.cs-orb.o1 {
  top:2%;
  left:46%;
}
.cs-orb.o2 {
  top:50%;
  right:-1%;
}
.cs-orb.o3 {
  bottom:6%;
  left:16%;
}
.cs-orb.sm {
  width:58px;
  height:58px;
  z-index:4;
  animation:bob 5s ease-in-out infinite;
}
.cs-orb.sm i {
  animation:none;
  font-size:28px;
}
.cs-orb.sm.o1 {
  top:4%;
  left:4%;
}
.cs-orb.sm.o2 {
  top:auto;
  bottom:10%;
  right:2%;
  animation-delay:-2s;
}
.cs-lead-wrap {
  position:absolute;
  z-index:6;
  right:-3%;
  bottom:-5%;
  width:min(330px,76%);
  translate:calc(var(--px) * 22px) calc(var(--py) * 22px);
}
.cs-lead {
  padding:20px 22px 22px;
  border-radius:34px 34px 34px 10px;
  background:rgba(255,255,255,.93);
  backdrop-filter:blur(14px);
  border:1px solid #fff;
  box-shadow:0 30px 60px rgba(21,70,150,.28);
  animation:bob 5.5s ease-in-out infinite;
}
.cs-lead-top {
  display:flex;
  align-items:center;
  gap:12px;
  margin-bottom:8px;
}
.cs-lead-top b {
  display:block;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:18px;
  color:#0f2a5c;
  line-height:1.2;
}
.cs-lead-top small {
  color:#7389a8;
  font-size:13.5px;
  font-weight:600;
}
.cs-av {
  display:grid;
  place-items:center;
  flex:0 0 auto;
  width:46px;
  height:46px;
  border-radius:50%;
  background:linear-gradient(135deg,#8b5cf6,#19b3e6);
  color:#fff;
  font-weight:800;
  font-size:19px;
}
.cs-live {
  display:inline-flex;
  align-items:center;
  gap:6px;
  margin-left:auto;
  padding:5px 11px;
  border-radius:999px;
  background:#e3fbef;
  color:#0f8a52;
  font-size:12.5px;
  font-weight:800;
}
.cs-live i {
  width:8px;
  height:8px;
  border-radius:50%;
  background:#10b981;
  animation:ping 1.6s infinite;
}
.cs-lead p {
  display:flex;
  justify-content:space-between;
  gap:10px;
  padding:9px 0;
  border-bottom:1px dashed #dde8f6;
  font-size:15.5px;
}
.cs-lead p span {
  color:#7389a8;
  font-weight:600;
}
.cs-lead p em {
  font-style:normal;
  font-weight:800;
  color:#12284a;
}
.cs-lead em.swap {
  animation:swapIn .55s cubic-bezier(.2,.8,.2,1);
}
.lock {
  background:linear-gradient(90deg,#8d9db3 30%,#d3deec 50%,#8d9db3 70%);
  background-size:220% 100%;
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent!important;
  animation:shimmerText 2.4s linear infinite;
}
.cs-unlock-btn {
  width:100%;
  min-height:50px;
  margin-top:14px;
  border:0;
  border-radius:999px;
  color:#fff;
  font-size:16.5px;
  font-weight:800;
  background:linear-gradient(100deg,#1349c2,#19b3e6);
  box-shadow:0 12px 24px rgba(21,88,214,.35);
  transition:background .5s,transform .25s;
}
.cs-unlock-btn:hover {
  transform:translateY(-3px);
}
.cs-lead.open .cs-unlock-btn {
  background:linear-gradient(100deg,#059669,#34d399);
  box-shadow:0 12px 24px rgba(5,150,105,.35);
}
.cs-toast {
  position:absolute;
  z-index:7;
  top:4%;
  left:-4%;
  display:flex;
  align-items:center;
  gap:12px;
  padding:12px 22px 12px 14px;
  border-radius:999px;
  background:#fff;
  box-shadow:0 18px 40px rgba(21,70,150,.25);
  animation:toast 8s ease-in-out infinite;
}
.cs-toast>span {
  display:grid;
  place-items:center;
  width:42px;
  height:42px;
  border-radius:50%;
  background:linear-gradient(135deg,#ffc83d,#ff7a59);
  font-size:20px;
  animation:wiggle 2s infinite;
}
.cs-toast b {
  display:block;
  font-size:16px;
  color:#0f2a5c;
  line-height:1.2;
}
.cs-toast small {
  color:#6d86a6;
  font-size:13.5px;
  font-weight:600;
}
/* svg scene */
.cs-sun {
  transform-origin:388px 78px;
  animation:spin 50s linear infinite;
}
.cs-cloud.c1 {
  animation:cloud 16s ease-in-out infinite alternate;
}
.cs-cloud.c2 {
  animation:cloud 22s ease-in-out infinite alternate-reverse;
}
.cs-bird.b1 {
  animation:fly 13s linear infinite;
}
.cs-bird.b2 {
  animation:fly 17s linear infinite;
  animation-delay:-8s;
}
.cs-tree {
  transform-box:fill-box;
  transform-origin:50% 100%;
  animation:sway 4.5s ease-in-out infinite;
}
.cs-tree.t2 {
  animation-delay:-2s;
}
.cs-flag {
  transform-origin:240px 12px;
  animation:waveflag 1.4s ease-in-out infinite;
}
.cs-hand {
  transform-origin:240px 116px;
  animation:spin 8s linear infinite;
}
.cs-win {
  animation:winBlink 6s ease-in-out infinite;
}
.cs-cap {
  animation:bob 3.4s ease-in-out infinite;
}
/* ---------- tilted ribbons ---------- */
.cs-ribbons {
  position:relative;
  z-index:6;
  height:150px;
  margin-top:-86px;
  overflow:hidden;
  pointer-events:none;
}
.cs-ribbon {
  position:absolute;
  left:-4%;
  width:108%;
  overflow:hidden;
  white-space:nowrap;
  padding:15px 0;
  box-shadow:0 14px 30px rgba(13,33,80,.25);
}
.cs-ribbon.a {
  top:22px;
  rotate:-1.8deg;
  background:linear-gradient(100deg,#0c1f55,#123a8f);
  color:#dbe9fb;
}
.cs-ribbon.b {
  top:66px;
  rotate:1.6deg;
  background:linear-gradient(100deg,#1558d6,#19b3e6 55%,#8b5cf6);
  color:#fff;
  z-index:2;
}
.cs-track {
  display:inline-flex;
  animation:marq 42s linear infinite;
}
.cs-track.rev {
  animation-direction:reverse;
  animation-duration:50s;
}
.cs-track span {
  display:inline-flex;
  align-items:center;
  padding:0 28px;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:21px;
  font-weight:700;
}
.cs-track i {
  margin-left:56px;
  font-style:normal;
  color:#ffd66b;
}
/* ---------- district bubbles ---------- */
.cs-districts {
  position:relative;
  overflow:hidden;
  background:#f5f8ff;
  padding:clamp(50px,6vw,90px) 0 clamp(50px,6vw,90px);
}
.cs-districts .cp-embedded {
  position:relative;
  z-index:1;
}
/* ---------- counters (dark) ---------- */
.cs-stats {
  position:relative;
  overflow:hidden;
  color:#fff;
  padding:clamp(120px,14vw,200px) 0;
  background:linear-gradient(155deg,#0a1744,#0d2f7a 60%,#0b4f9e);
}
.cs-stats-in {
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:30px;
}
.cs-stat {
  text-align:center;
}
.cs-stat-ring {
  position:relative;
  width:clamp(150px,15vw,214px);
  aspect-ratio:1;
  margin:0 auto 20px;
}
.cs-stat-ring svg {
  width:100%;
  height:100%;
  rotate:-90deg;
}
.cs-stat-ring .trk {
  fill:none;
  stroke:rgba(255,255,255,.12);
  stroke-width:7;
}
.cs-stat-ring .bar {
  fill:none;
  stroke:var(--h);
  stroke-width:7;
  stroke-linecap:round;
  transition:stroke-dashoffset 2.2s cubic-bezier(.2,.8,.2,1);
  filter:drop-shadow(0 0 9px var(--h));
}
.cs-stat-ring strong {
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(30px,3.3vw,50px);
  font-weight:800;
}
.cs-stat>span {
  display:block;
  max-width:230px;
  margin:0 auto;
  font-size:18px;
  font-weight:600;
  color:#bcd2f2;
}
/* ---------- light sections ---------- */
.cs-light {
  position:relative;
  background:#f5f8ff;
  overflow:hidden;
}
/* bento */
.cs-bento {
  display:grid;
  grid-template-columns:repeat(6,1fr);
  gap:clamp(16px,2vw,30px);
  margin-top:56px;
}
.bn {
  display:flex;
  flex-direction:column;
  min-height:330px;
  padding:clamp(28px,3vw,46px);
  overflow:hidden;
  background:#fff;
  border:1px solid #dce8f7;
  box-shadow:0 22px 50px -24px rgba(21,60,140,.3);
}
.bn1 {
  grid-column:span 4;
  border-radius:64px 64px 64px 14px;
  color:#fff;
  background:linear-gradient(135deg,#1349c2,#1766e6 55%,#19b3e6);
  --spot:rgba(255,255,255,.3);
}
.bn2 {
  grid-column:span 2;
  border-radius:64px 64px 14px 64px;
}
.bn3 {
  grid-column:span 2;
  border-radius:64px 14px 64px 64px;
}
.bn4 {
  grid-column:span 4;
  border-radius:14px 64px 64px 64px;
  color:#fff;
  background:linear-gradient(135deg,#5b21b6,#7c3aed 50%,#1558d6);
  --spot:rgba(255,255,255,.28);
}
.bn-ic {
  display:grid;
  place-items:center;
  width:70px;
  height:70px;
  margin-bottom:18px;
  font-size:34px;
  background:#e6f0ff;
  border-radius:60% 40% 55% 45%/50% 55% 45% 50%;
  animation:morph 8s ease-in-out infinite;
}
.bn1 .bn-ic,.bn4 .bn-ic {
  background:rgba(255,255,255,.2);
}
.bn h3 {
  margin-bottom:10px!important;
  font-size:clamp(23px,2.1vw,32px);
  line-height:1.15;
  font-weight:800;
  letter-spacing:-.4px;
}
.bn p {
  font-size:18px;
  line-height:1.65;
  color:var(--muted);
}
.bn1 p,.bn4 p {
  color:rgba(255,255,255,.88);
}
.bn-feed {
  display:grid;
  gap:10px;
  margin-top:auto;
  padding-top:24px;
}
.bn-feed div {
  display:flex;
  align-items:center;
  gap:12px;
  padding:10px 16px 10px 10px;
  border-radius:999px;
  background:rgba(255,255,255,.17);
  border:1px solid rgba(255,255,255,.28);
  font-weight:700;
  font-size:16px;
  backdrop-filter:blur(6px);
}
.bn-feed div:first-child {
  animation:glowPulse 2.6s ease-in-out infinite;
}
.bn-feed i {
  display:grid;
  place-items:center;
  flex:0 0 auto;
  width:34px;
  height:34px;
  border-radius:50%;
  background:#fff;
  color:var(--blue);
  font-style:normal;
  font-weight:800;
}
.bn-feed em {
  margin-left:auto;
  font-style:normal;
  font-size:13px;
  opacity:.8;
}
.bn-lock {
  display:grid;
  place-items:center;
  margin-top:auto;
  padding-top:20px;
}
.bn-lock span {
  display:grid;
  place-items:center;
  width:96px;
  height:96px;
  border-radius:50%;
  background:radial-gradient(#e6f0ff,#cfe0fb);
  font-size:44px;
  box-shadow:0 0 0 12px rgba(21,88,214,.08),0 0 0 26px rgba(21,88,214,.05);
  animation:lockShake 3.6s ease-in-out infinite;
}
.bn-bars {
  display:flex;
  align-items:flex-end;
  gap:12px;
  height:110px;
  margin-top:auto;
  padding-top:20px;
}
.bn-bars i {
  flex:1;
  border-radius:12px 12px 6px 6px;
  background:linear-gradient(#19b3e6,#1558d6);
  transform-origin:bottom;
  animation:bar 2.8s ease-in-out infinite;
}
.bn-bars i:nth-child(1) {
  height:45%;
}
.bn-bars i:nth-child(2) {
  height:70%;
  animation-delay:.2s;
}
.bn-bars i:nth-child(3) {
  height:55%;
  animation-delay:.4s;
}
.bn-bars i:nth-child(4) {
  height:90%;
  animation-delay:.6s;
}
.bn-bars i:nth-child(5) {
  height:75%;
  animation-delay:.8s;
}
.bn-chips {
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:auto;
  padding-top:24px;
}
.bn-chips span {
  padding:9px 18px;
  border-radius:999px;
  background:rgba(255,255,255,.18);
  border:1px solid rgba(255,255,255,.3);
  font-weight:700;
  font-size:15.5px;
  animation:bob 5s ease-in-out infinite;
}
.bn-chips span:nth-child(2n) {
  animation-delay:-1.4s;
}
.bn-chips span:nth-child(3n) {
  animation-delay:-2.8s;
}
/* ---------- how it works ---------- */
.cs-how {
  position:relative;
  overflow:hidden;
  margin:0 clamp(10px,2vw,28px);
  border-radius:clamp(36px,6vw,84px);
  background:linear-gradient(160deg,#e3eeff 0%,#f0f6ff 50%,#e1f4ff 100%);
}
.cs-tl {
  --p:0;
  position:relative;
  display:grid;
  gap:clamp(26px,3.4vw,50px);
  margin-top:70px;
}
.cs-tl-line {
  position:absolute;
  left:50%;
  top:var(--y0,0px);
  height:var(--len,0px);
  width:7px;
  margin-left:-3.5px;
  border-radius:7px;
  background:#cbdcf4;
}
.cs-tl-line i {
  display:block;
  width:100%;
  height:calc(var(--p) * 100%);
  border-radius:7px;
  background:linear-gradient(#1558d6,#19b3e6,#8b5cf6);
  box-shadow:0 0 18px rgba(21,88,214,.5);
}
.cs-tl-dot {
  position:absolute;
  z-index:1;
  left:50%;
  top:calc(var(--y0,0px) + var(--len,0px) * var(--p,0));
  width:26px;
  height:26px;
  margin:-13px 0 0 -13px;
  border-radius:50%;
  pointer-events:none;
  background:radial-gradient(circle at 35% 30%,#fff,#7fd6ff 45%,#1558d6);
  animation:tlPing 1.6s infinite;
}
.cs-step .cs-num {
  transition:background .5s,color .5s,border-color .5s,box-shadow .5s;
}
.cs-step.hit .cs-num {
  background:linear-gradient(135deg,#1349c2,#19b3e6);
  color:#fff;
  border-color:#fff;
  box-shadow:0 0 0 12px rgba(21,88,214,.2),0 16px 34px rgba(21,88,214,.5);
}
.cs-step .cs-step-card {
  transition:border-color .5s,box-shadow .5s;
}
.cs-step.hit .cs-step-card {
  border-color:#9cc3f5;
  box-shadow:0 30px 60px -22px rgba(21,88,214,.5);
}
@keyframes tlPing {
  0% {
    box-shadow:0 0 0 0 rgba(25,179,230,.85),0 0 18px 4px rgba(25,179,230,.7);
  }
  80%,100% {
    box-shadow:0 0 0 22px rgba(25,179,230,0),0 0 18px 4px rgba(25,179,230,.7);
  }
}
.cs-step {
  display:grid;
  grid-template-columns:1fr 96px 1fr;
  align-items:center;
  position:relative;
  z-index:2;
}
.cs-num {
  grid-column:2;
  grid-row:1;
  display:grid;
  place-items:center;
  width:76px;
  height:76px;
  margin:auto;
  border-radius:50% 50% 50% 14%;
  background:#fff;
  border:5px solid var(--blue);
  color:var(--blue);
  box-shadow:0 0 0 12px rgba(21,88,214,.12),0 16px 30px rgba(21,88,214,.25);
}
.cs-num b {
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:30px;
  font-weight:800;
}
.cs-step.in .cs-num {
  animation:numPop .8s .25s cubic-bezier(.2,.8,.2,1) both;
}
.cs-step.l .cs-step-card {
  grid-column:1;
  grid-row:1;
  border-radius:40px 40px 10px 40px;
}
.cs-step.r .cs-step-card {
  grid-column:3;
  grid-row:1;
  border-radius:40px 40px 40px 10px;
}
.cs-step-card {
  padding:30px 34px 32px;
  background:#fff;
  border:1px solid #d9e7f8;
  box-shadow:0 22px 46px -22px rgba(21,60,140,.3);
}
.cs-step-ic {
  display:grid;
  place-items:center;
  width:64px;
  height:64px;
  margin-bottom:14px;
  font-size:32px;
  border-radius:50%;
  background:#e6f0ff;
}
.cs-step-card h3 {
  margin-bottom:8px!important;
  font-size:clamp(23px,2vw,30px);
  font-weight:800;
  letter-spacing:-.3px;
  line-height:1.15;
}
.cs-step-card p {
  font-size:18px;
  line-height:1.65;
  color:var(--muted);
}
.cs-flow {
  display:flex;
  align-items:center;
  gap:14px;
  margin-top:90px;
  padding:30px clamp(20px,3vw,46px);
  border-radius:90px;
  background:#fff;
  border:1px solid #d9e7f8;
  box-shadow:0 24px 50px -26px rgba(21,60,140,.3);
}
.cs-flow>div {
  display:grid;
  justify-items:center;
  gap:3px;
  text-align:center;
}
.cs-flow b {
  display:grid;
  place-items:center;
  width:62px;
  height:62px;
  margin-bottom:6px;
  border-radius:50% 50% 50% 14%;
  background:linear-gradient(135deg,#1349c2,#19b3e6);
  color:#fff;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:26px;
  font-weight:800;
  box-shadow:0 12px 24px rgba(21,88,214,.3);
}
.cs-flow span {
  font-weight:800;
  font-size:18px;
  color:#0f2a5c;
}
.cs-flow small {
  color:#7389a8;
  font-size:14.5px;
  font-weight:600;
}
.cs-flow i {
  flex:1;
  min-width:24px;
  height:5px;
  border-radius:5px;
  background:repeating-linear-gradient(90deg,#1558d6 0 14px,transparent 14px 26px);
  background-size:26px 5px;
  animation:dash 1s linear infinite;
}
.cs-preview {
  margin-top:40px;
}
.cs-preview-head {
  display:flex;
  flex-wrap:wrap;
  align-items:baseline;
  justify-content:space-between;
  gap:8px 20px;
  margin-bottom:18px;
  padding-inline:14px;
}
.cs-preview-head b {
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(24px,2.4vw,34px);
  font-weight:800;
}
.cs-preview-head span {
  color:#6d86a6;
  font-weight:700;
  font-size:15.5px;
}
.cs-leadrow {
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:12px 14px;
  margin-bottom:14px;
  padding:12px 16px 12px 12px;
  border-radius:999px;
  background:#fff;
  border:1px solid #d9e7f8;
  box-shadow:0 14px 30px -18px rgba(21,60,140,.3);
  transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s;
}
.cs-leadrow:hover {
  transform:translateX(12px) scale(1.01);
  box-shadow:0 22px 40px -18px rgba(21,60,140,.4);
}
.cs-leadrow .av {
  display:grid;
  place-items:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background:linear-gradient(135deg,#1558d6,#19b3e6);
  color:#fff;
  font-weight:800;
  font-size:20px;
}
.cs-leadrow:nth-child(2n) .av {
  background:linear-gradient(135deg,#8b5cf6,#ec4899);
}
.cs-leadrow .id {
  font-size:18px;
  color:#0f2a5c;
  min-width:104px;
}
.cs-leadrow .chip {
  padding:7px 16px;
  border-radius:999px;
  background:#e6f0ff;
  color:#1349c2;
  font-weight:800;
  font-size:15.5px;
}
.cs-leadrow .chip.c2 {
  background:#f1e9ff;
  color:#6d28d9;
}
.cs-leadrow .chip.c3 {
  background:#e0f7ef;
  color:#0b7a4f;
}
.cs-leadrow .mob {
  margin-left:auto;
  font-weight:800;
  font-size:18px;
}
.cs-unlock {
  min-height:46px;
  padding:0 24px;
  border:0;
  border-radius:999px;
  color:#fff;
  font-weight:800;
  font-size:16px;
  background:linear-gradient(100deg,#1349c2,#19b3e6);
  box-shadow:0 10px 20px rgba(21,88,214,.3);
  transition:transform .25s;
}
.cs-unlock:hover {
  transform:translateY(-3px) scale(1.04);
}
.cs-privacy {
  display:flex;
  align-items:center;
  gap:24px;
  margin-top:34px;
  padding:30px 40px;
  border-radius:56px 56px 56px 14px;
  color:#fff;
  background:linear-gradient(110deg,#0c2a78,#1558d6 70%,#19b3e6);
}
.cs-privacy .shield {
  display:grid;
  place-items:center;
  flex:0 0 auto;
  width:78px;
  height:78px;
  border-radius:50%;
  background:rgba(255,255,255,.18);
  font-size:36px;
  animation:ping2 2.4s infinite;
}
.cs-privacy h3 {
  margin-bottom:6px!important;
  font-size:clamp(23px,2.2vw,32px);
  font-weight:800;
}
.cs-privacy p {
  font-size:18px;
  line-height:1.65;
  color:rgba(255,255,255,.9);
}
/* ---------- plans ---------- */
.cs-plans {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:clamp(20px,2.4vw,36px);
  align-items:stretch;
  margin-top:64px;
}
.cs-plan {
  display:flex;
  flex-direction:column;
  padding:48px 34px 36px;
  text-align:center;
  border-radius:60px 60px 60px 14px;
  background:#fff;
  border:1px solid #dce8f7;
  box-shadow:0 26px 54px -26px rgba(21,60,140,.35);
}
.cs-plan.elite {
  background:linear-gradient(#fff,#f1f5fb);
}
.cs-plan.gold {
  margin-top:-26px;
  margin-bottom:26px;
  padding-top:62px;
  background:linear-gradient(#fff,#fff8e6);
  border-color:transparent;
  box-shadow:0 40px 80px -26px rgba(245,158,11,.5);
}
.cs-plan.gold::after {
  content:"";
  position:absolute;
  inset:0;
  border-radius:inherit;
  padding:4px;
  pointer-events:none;
  background:conic-gradient(from var(--ang),#1558d6,#19b3e6,#8b5cf6,#ffc83d,#ff7a59,#1558d6);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;
  mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:ang 5s linear infinite;
}
.cs-plan.diamond {
  color:#fff;
  background:linear-gradient(160deg,#0c1f55,#1b3f9a);
  --spot:rgba(255,255,255,.22);
}
.cs-pop-badge {
  position:absolute;
  top:18px;
  left:50%;
  transform:translateX(-50%);
  padding:7px 18px;
  border-radius:999px;
  background:linear-gradient(90deg,#f59e0b,#ff7a59);
  color:#fff;
  font-size:13.5px;
  font-weight:800;
  letter-spacing:.6px;
  white-space:nowrap;
  box-shadow:0 10px 20px rgba(245,158,11,.4);
}
.cs-plan-ic {
  font-size:60px;
  line-height:1;
  animation:bob 4s ease-in-out infinite;
}
.cs-plan h3 {
  color:inherit;
  margin:12px 0 6px!important;
  font-size:38px;
  font-weight:800;
  letter-spacing:-.6px;
}
.cs-plan-tag {
  margin-bottom:6px!important;
  color:var(--muted);
  font-size:18px;
}
.cs-plan.diamond .cs-plan-tag {
  color:#bcd2f2;
}
.cs-plan ul,.sp-plan ul {
  list-style:none;
  display:grid;
  gap:13px;
  margin:24px 0 30px;
  padding:0;
  text-align:left;
  flex:1;
}
.cs-plan li,.sp-plan li {
  display:flex;
  align-items:flex-start;
  gap:12px;
  font-size:17.5px;
  font-weight:600;
  line-height:1.4;
}
.cs-plan li i,.sp-plan li i {
  display:grid;
  place-items:center;
  flex:0 0 auto;
  width:26px;
  height:26px;
  margin-top:1px;
  border-radius:50%;
  background:#dcf7e9;
  color:#0f9158;
  font-style:normal;
  font-size:14px;
  font-weight:900;
}
.cs-plan.diamond li i {
  background:rgba(255,255,255,.18);
  color:#7ff0c1;
}
.cs-plans-note {
  margin-top:40px!important;
  text-align:center!important;
  color:var(--muted);
  font-size:18px;
}
/* ---------- pricing (dark) ---------- */
.cs-pricing {
  position:relative;
  overflow:hidden;
  color:#fff;
  padding:clamp(40px,5vw,70px) 0;
  background:linear-gradient(155deg,#0a1744,#0e3283 60%,#0b4f9e);
}
.cs-pricing .cs-sec {
  padding-block:clamp(90px,11vw,150px);
}
.cs-price {
  display:grid;
  grid-template-columns:.9fr 1.1fr;
  gap:clamp(30px,5vw,90px);
  align-items:center;
  margin-top:56px;
}
.cs-coinwrap {
  position:relative;
  display:grid;
  place-items:center;
  width:100%;
  max-width:430px;
  aspect-ratio:1;
  margin:0 auto;
}
.cs-coin-ring {
  position:absolute;
  inset:0;
  border-radius:50%;
  background:conic-gradient(from var(--ang),#ffc83d,#ff7a59,#8b5cf6,#19b3e6,#ffc83d);
  animation:ang 6s linear infinite;
  box-shadow:0 0 70px rgba(255,200,61,.35);
}
.cs-coin {
  position:relative;
  display:grid;
  align-content:center;
  justify-items:center;
  width:88%;
  aspect-ratio:1;
  border-radius:50%;
  text-align:center;
  background:radial-gradient(circle at 30% 24%,#2358d0,#0a1a4a 70%);
  box-shadow:inset 0 0 50px rgba(255,255,255,.14),0 30px 60px rgba(0,0,0,.4);
  animation:coinTilt 7s ease-in-out infinite;
}
.cs-coin small {
  font-size:17px;
  font-weight:700;
  color:#b9d2f5;
  letter-spacing:.5px;
}
.cs-coin strong {
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(70px,9vw,128px);
  font-weight:800;
  line-height:1;
  background:linear-gradient(180deg,#fff2b8,#ffc83d 60%,#ff9b3d);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.cs-coin span {
  font-size:17px;
  font-weight:600;
  color:#b9d2f5;
}
.cs-mini {
  position:absolute;
  display:grid;
  place-items:center;
  width:58px;
  height:58px;
  border-radius:50%;
  background:linear-gradient(145deg,#ffd66b,#f59e0b);
  color:#7a4a00;
  font-weight:900;
  font-size:27px;
  box-shadow:0 14px 26px rgba(0,0,0,.3);
  animation:float 5s ease-in-out infinite;
}
.cs-mini.m1 {
  top:2%;
  right:4%;
}
.cs-mini.m2 {
  bottom:8%;
  left:-2%;
  width:46px;
  height:46px;
  font-size:22px;
  animation-delay:-2s;
}
.cs-mini.m3 {
  bottom:-2%;
  right:20%;
  width:38px;
  height:38px;
  font-size:18px;
  animation-delay:-3.4s;
}
.cs-price-right ul {
  list-style:none;
  display:grid;
  gap:16px;
  margin:0 0 34px;
  padding:0;
}
.cs-price-right li {
  display:flex;
  align-items:center;
  gap:14px;
  font-size:clamp(18px,1.6vw,22px);
  font-weight:600;
}
.cs-price-right.in li {
  animation:liIn .6s cubic-bezier(.2,.8,.2,1) both;
  animation-delay:calc(var(--i) * .1s + .3s);
}
.cs-price-right li i {
  display:grid;
  place-items:center;
  flex:0 0 auto;
  width:32px;
  height:32px;
  border-radius:50%;
  background:linear-gradient(135deg,#34d399,#10b981);
  color:#fff;
  font-style:normal;
  font-size:16px;
  font-weight:900;
}
.cs-est {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:22px;
  margin-top:80px;
}
.cs-est>div {
  display:grid;
  gap:4px;
  padding:26px 20px;
  text-align:center;
  border-radius:44px 44px 44px 10px;
  background:rgba(255,255,255,.1);
  border:1px solid rgba(255,255,255,.2);
  backdrop-filter:blur(8px);
}
.cs-est b {
  font-size:19px;
  font-weight:700;
  color:#bcd2f2;
}
.cs-est span {
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(28px,3vw,42px);
  font-weight:800;
  color:#ffd66b;
}
/* ---------- benefits ---------- */
.cs-grid3 {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:clamp(18px,2.2vw,32px);
  margin-top:60px;
}
.cs-ben {
  padding:40px 34px 38px;
  border-radius:50px 50px 50px 12px;
  background:#fff;
  border:1px solid #dce8f7;
  box-shadow:0 22px 46px -26px rgba(21,60,140,.3);
  transition:box-shadow .3s,transform .25s ease-out;
}
.cs-ben:nth-child(even) {
  border-radius:50px 50px 12px 50px;
}
.cs-ben:hover {
  box-shadow:0 34px 60px -24px rgba(21,60,140,.45);
}
.cs-ben-ic {
  display:grid;
  place-items:center;
  width:80px;
  height:80px;
  margin-bottom:20px;
  font-size:40px;
  background:#e6f0ff;
  border-radius:60% 40% 55% 45%/50% 55% 45% 50%;
  animation:morph 9s ease-in-out infinite;
  transition:scale .3s,rotate .3s;
}
.cs-ben:nth-child(6n+2) .cs-ben-ic {
  background:#f1e9ff;
}
.cs-ben:nth-child(6n+3) .cs-ben-ic {
  background:#dff7ee;
}
.cs-ben:nth-child(6n+4) .cs-ben-ic {
  background:#fff0d9;
}
.cs-ben:nth-child(6n+5) .cs-ben-ic {
  background:#ffe6ec;
}
.cs-ben:nth-child(6n) .cs-ben-ic {
  background:#dff4ff;
}
.cs-ben:hover .cs-ben-ic {
  scale:1.14;
  rotate:12deg;
}
.cs-ben h3 {
  margin-bottom:10px!important;
  font-size:clamp(23px,2vw,29px);
  font-weight:800;
  letter-spacing:-.3px;
  line-height:1.15;
}
.cs-ben p {
  font-size:18px;
  line-height:1.65;
  color:var(--muted);
}
/* ---------- about ---------- */
.cs-about-sec {
  position:relative;
  overflow:hidden;
  margin:0 clamp(10px,2vw,28px);
  border-radius:clamp(36px,6vw,84px);
  background:linear-gradient(160deg,#eaf1ff,#e0f2ff);
}
.cs-about {
  display:grid;
  grid-template-columns:1.05fr .95fr;
  gap:clamp(30px,5vw,90px);
  align-items:center;
}
.cs-about .cs-eyebrow {
  margin-left:0;
}
.cs-about p {
  margin-bottom:18px!important;
  font-size:19.5px;
  line-height:1.8;
  color:#46608a;
}
.cs-pills {
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-top:26px;
}
.cs-pills span {
  padding:11px 20px;
  border-radius:999px;
  background:#fff;
  border:1px solid #d4e4fb;
  color:#1349c2;
  font-weight:800;
  font-size:16px;
  box-shadow:0 10px 20px -12px rgba(21,60,140,.4);
}
.cs-about-art {
  position:relative;
  display:grid;
  place-items:center;
}
/* ---------- contact ---------- */
.cs-contact {
  display:grid;
  grid-template-columns:.78fr 1.22fr;
  margin-top:56px;
  overflow:hidden;
  border-radius:72px 72px 72px 16px;
  background:#fff;
  border:1px solid #dbe7f6;
  box-shadow:0 34px 80px -30px rgba(21,60,140,.4);
}
.cs-contact-side {
  position:relative;
  overflow:hidden;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:12px;
  padding:clamp(34px,4vw,60px);
  color:#fff;
  background:linear-gradient(150deg,#0f3fb5,#1766e6 60%,#19b3e6);
}
.cs-contact-side>* {
  position:relative;
  z-index:2;
}
.cs-env {
  display:grid;
  place-items:center;
  width:92px;
  height:92px;
  border-radius:50% 50% 50% 14%;
  background:rgba(255,255,255,.2);
  font-size:44px;
  animation:bob 4s ease-in-out infinite;
}
.cs-contact-side h3 {
  font-size:clamp(32px,3vw,46px);
  font-weight:800;
}
.cs-contact-side p {
  font-size:19px;
  line-height:1.7;
  color:rgba(255,255,255,.9);
}
.cs-c-blob {
  position:absolute!important;
  border-radius:50%;
  background:rgba(255,255,255,.14);
  animation:morph 10s ease-in-out infinite,drift 14s ease-in-out infinite;
}
.cs-c-blob.a {
  width:260px;
  height:260px;
  right:-90px;
  bottom:-80px;
}
.cs-c-blob.b {
  width:140px;
  height:140px;
  left:-40px;
  top:-40px;
  animation-delay:-5s;
}
.cs-c-blob.c {
  width:200px;
  height:200px;
  left:40%;
  bottom:-120px;
  animation-delay:-3s;
}
.cs-form {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  padding:clamp(28px,4vw,56px);
}
.cs-form label {
  display:grid;
  gap:8px;
  font-size:15.5px;
  font-weight:800;
  color:#23406e;
}
.cs-form .full {
  grid-column:1/-1;
}
.cs-form input,.cs-form select,.cs-form textarea {
  width:100%;
  min-height:58px;
  padding:0 22px;
  border:2px solid #d7e5f7;
  border-radius:22px;
  background:#f7faff;
  font:inherit;
  font-size:17.5px;
  font-weight:600;
  color:var(--ink);
  outline:none;
  transition:border-color .25s,box-shadow .25s,background .25s;
}
.cs-form textarea {
  padding:16px 22px;
  border-radius:26px;
  resize:vertical;
}
.cs-form input:focus,.cs-form select:focus,.cs-form textarea:focus {
  border-color:var(--blue);
  background:#fff;
  box-shadow:0 0 0 5px rgba(21,88,214,.14);
}
.cs-ok {
  padding:14px 22px;
  border-radius:999px;
  background:#dcf7e9;
  color:#0b7a4f;
  font-weight:800;
  animation:pop .4s both;
}
/* ---------- CTA + footer ---------- */
.cs-ctawrap {
  padding-block:clamp(50px,7vw,100px);
}
.cs-banner {
  position:relative;
  overflow:hidden;
  padding:clamp(54px,7vw,100px) 30px;
  border-radius:90px 90px 90px 24px;
  text-align:center;
  color:#fff;
  background:linear-gradient(120deg,#1349c2,#1766e6 40%,#19b3e6 75%,#8b5cf6 100%);
  background-size:200% 200%;
  animation:gradMove 10s ease-in-out infinite;
  box-shadow:0 40px 80px -30px rgba(21,88,214,.6);
}
.cs-banner>* {
  position:relative;
  z-index:2;
}
.cs-banner h2 {
  margin-bottom:14px!important;
  font-size:clamp(32px,4.6vw,66px);
  line-height:1.06;
  font-weight:800;
  letter-spacing:-1.2px;
  text-align:center!important;
}
.cs-banner p {
  max-width:640px;
  margin:0 auto 34px!important;
  font-size:clamp(18px,1.6vw,22px);
  color:rgba(255,255,255,.92);
  text-align:center!important;
}
.cs-footer {
  position:relative;
  overflow:hidden;
  padding-top:clamp(50px,6vw,80px);
  border-radius:clamp(36px,6vw,84px) clamp(36px,6vw,84px) 0 0;
  background:#081538;
  color:#bdd0ee;
}
.cs-footer-in {
  display:flex;
  flex-wrap:wrap;
  align-items:flex-start;
  justify-content:space-between;
  gap:30px;
}
.cs-fbrand strong {
  display:block;
  margin-bottom:8px;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:30px;
  font-weight:800;
  color:#fff;
}
.cs-fbrand p {
  max-width:420px;
  font-size:17px;
  line-height:1.7;
}
.cs-flinks {
  display:flex;
  flex-wrap:wrap;
  gap:6px 8px;
  max-width:640px;
}
.cs-flinks button {
  border:0;
  background:rgba(255,255,255,.07);
  padding:10px 18px;
  border-radius:999px;
  color:#d4e3fa;
  font-size:16px;
  font-weight:700;
  transition:background .25s,transform .25s;
}
.cs-flinks button:hover {
  background:rgba(255,255,255,.2);
  transform:translateY(-3px);
}
.cs-wordmark {
  margin-top:40px;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(54px,14.5vw,250px);
  font-weight:800;
  line-height:.88;
  letter-spacing:-.04em;
  text-align:center;
  white-space:nowrap;
  user-select:none;
  background:linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,0) 85%);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.cs-top {
  position:fixed;
  right:24px;
  bottom:24px;
  z-index:250;
  display:grid;
  place-items:center;
  width:58px;
  height:58px;
  border:0;
  border-radius:50% 50% 50% 14%;
  color:#fff;
  font-size:26px;
  font-weight:800;
  background:linear-gradient(135deg,#1349c2,#19b3e6);
  box-shadow:0 14px 30px rgba(21,88,214,.45);
  opacity:0;
  translate:0 90px;
  transition:opacity .35s,translate .45s cubic-bezier(.2,.8,.2,1),scale .25s;
}
.cs-top.show {
  opacity:1;
  translate:0 0;
}
.cs-top:hover {
  scale:1.12;
}
/* ---------- subscription pricing view (login only) ---------- */
.sp-main {
  position:relative;
  overflow:hidden;
  min-height:100vh;
  padding:calc(var(--nav) + 64px) 0 90px;
  background:radial-gradient(900px 500px at 90% 0%,rgba(139,92,246,.14),transparent 70%),linear-gradient(160deg,#eaf3ff,#f8fbff 55%,#e8f6ff);
}
.sp-in {
  position:relative;
  z-index:2;
}
.sp-back {
  margin-bottom:26px;
}
.sp-head {
  text-align:center;
}
.sp-head h1 {
  color:var(--ink)!important;
  margin:20px 0 12px!important;
  font-size:clamp(36px,5vw,70px);
  line-height:1.05;
  font-weight:800;
  letter-spacing:-1.6px;
  text-align:center!important;
}
.sp-head p {
  color:var(--muted);
  font-size:20px;
  text-align:center!important;
}
.sp-toggle {
  position:relative;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  width:min(100%,600px);
  margin:34px auto 52px;
  padding:7px;
  border-radius:999px;
  background:#fff;
  border:1px solid #d7e5f7;
  box-shadow:0 18px 40px -22px rgba(21,60,140,.4);
}
.sp-pill {
  position:absolute;
  top:7px;
  bottom:7px;
  left:7px;
  width:calc((100% - 14px) / 3);
  border-radius:999px;
  background:linear-gradient(100deg,#1349c2,#19b3e6);
  box-shadow:0 10px 22px rgba(21,88,214,.35);
  transform:translateX(calc(var(--i) * 100%));
  transition:transform .45s cubic-bezier(.2,.8,.2,1);
}
.sp-toggle button {
  position:relative;
  z-index:1;
  display:grid;
  justify-items:center;
  border:0;
  background:none;
  padding:12px 8px;
  border-radius:999px;
  color:#35506c;
  font-size:17px;
  font-weight:800;
  transition:color .3s;
}
.sp-toggle button em {
  font-style:normal;
  font-size:12.5px;
  font-weight:800;
  color:#16a34a;
}
.sp-toggle button.on {
  color:#fff;
}
.sp-toggle button.on em {
  color:#d9f6ff;
}
.sp-plans {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:clamp(20px,2.4vw,34px);
  align-items:stretch;
}
.sp-plan {
  position:relative;
  display:flex;
  flex-direction:column;
  padding:42px 32px 34px;
  text-align:center;
  cursor:pointer;
  border-radius:56px 56px 56px 14px;
  background:#fff;
  border:2px solid #dce8f7;
  box-shadow:0 24px 50px -28px rgba(21,60,140,.35);
  animation:planIn .7s cubic-bezier(.2,.8,.2,1) both;
  transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s,border-color .35s;
}
.sp-plan:hover {
  transform:translateY(-8px);
}
.sp-plan.sel {
  border-color:var(--blue);
  box-shadow:0 0 0 7px rgba(21,88,214,.14),0 36px 70px -26px rgba(21,60,140,.5);
  transform:translateY(-12px);
}
.sp-ribbon {
  position:absolute;
  top:-15px;
  left:50%;
  transform:translateX(-50%);
  padding:7px 18px;
  border-radius:999px;
  background:linear-gradient(90deg,#f59e0b,#ff7a59);
  color:#fff;
  font-size:13.5px;
  font-weight:800;
  white-space:nowrap;
}
.sp-ic {
  font-size:56px;
  line-height:1;
  animation:bob 4s ease-in-out infinite;
}
.sp-plan h3 {
  color:var(--ink);
  margin:10px 0 4px!important;
  font-size:36px;
  font-weight:800;
}
.sp-tg {
  color:var(--muted);
  font-size:17.5px;
}
.sp-price {
  display:flex;
  align-items:baseline;
  justify-content:center;
  gap:8px;
  margin-top:18px;
}
.sp-price strong {
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(40px,3.6vw,54px);
  font-weight:800;
  color:var(--ink);
}
.sp-price span {
  color:var(--muted);
  font-weight:700;
}
.sp-per {
  margin-top:4px!important;
  color:var(--muted);
  font-weight:700;
  font-size:16.5px;
}
.sp-per s {
  margin-left:10px;
  color:#9aaec8;
}
.sp-summary {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-between;
  gap:20px;
  margin-top:52px;
  padding:22px 26px 22px 40px;
  border-radius:999px;
  background:#fff;
  border:1px solid #d7e5f7;
  box-shadow:0 26px 56px -28px rgba(21,60,140,.45);
  animation:pop .45s cubic-bezier(.2,.8,.2,1) both;
}
.sp-summary small {
  display:block;
  color:#7389a8;
  font-weight:700;
  font-size:14.5px;
}
.sp-summary b {
  font-size:21px;
  color:#0f2a5c;
}
.sp-total {
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(34px,3.6vw,50px);
  font-weight:800;
  color:var(--blue);
}
.sp-note {
  margin-top:26px!important;
  text-align:center!important;
  color:var(--muted);
  font-weight:600;
}
/* ---------- lead downloads counter ---------- */
.dl {
  position:relative;
  overflow:hidden;
  background:linear-gradient(180deg,#fff 0%,#eef5ff 100%);
}
.dl .cs-sec {
  padding-block:clamp(60px,7vw,100px);
}
.dl .cs-sub {
  margin-bottom:44px;
}
.dl-grid {
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:clamp(20px,2.4vw,34px);
  align-items:stretch;
  margin-bottom:34px;
}
.dl-total {
  position:relative;
  overflow:hidden;
  padding:clamp(28px,3vw,46px);
  border-radius:52px 52px 52px 14px;
  color:#fff;
  background:linear-gradient(135deg,#1349c2 0%,#1766e6 55%,#19b3e6 100%);
  box-shadow:0 36px 70px -30px rgba(21,60,140,.7);
}
.dl-total::before,.dl-total::after {
  content:"";
  position:absolute;
  border-radius:50%;
  background:rgba(255,255,255,.12);
  pointer-events:none;
}
.dl-total::before {
  width:300px;
  height:300px;
  right:-90px;
  top:-110px;
  animation:drift 14s ease-in-out infinite;
}
.dl-total::after {
  width:200px;
  height:200px;
  left:-60px;
  bottom:-90px;
  animation:drift 11s ease-in-out infinite reverse;
}
.dl-total>* {
  position:relative;
  z-index:1;
}
.dl-total small {
  display:block;
  font-size:13.5px;
  font-weight:800;
  letter-spacing:2.2px;
  opacity:.88;
}
.dl-big {
  margin:14px 0 6px;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(56px,7.4vw,112px);
  font-weight:800;
  line-height:1;
  letter-spacing:-2px;
  animation:dlPulse .6s cubic-bezier(.2,.8,.2,1);
}
.dl-sub {
  font-size:19px;
  opacity:.92;
}
.dl-mini {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:12px;
  margin-top:28px;
}
.dl-mini div {
  padding:14px 16px;
  border-radius:22px;
  background:rgba(255,255,255,.16);
  border:1px solid rgba(255,255,255,.22);
  backdrop-filter:blur(6px);
}
.dl-mini b {
  display:block;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(20px,2.1vw,30px);
  font-weight:800;
  line-height:1.15;
}
.dl-mini span {
  font-size:13.5px;
  font-weight:600;
  opacity:.92;
}
.dl-flow {
  padding:clamp(26px,2.6vw,40px);
  border-radius:52px 52px 14px 52px;
  background:#fff;
  border:1px solid #d7e5f7;
  box-shadow:0 26px 56px -30px rgba(21,60,140,.4);
}
.dl-flow h3 {
  margin-bottom:18px!important;
  font-size:clamp(24px,2.4vw,32px);
  font-weight:800;
  color:var(--ink);
}
.dl-flow ol {
  list-style:none;
  margin:0;
  padding:0;
  display:grid;
  gap:14px;
}
.dl-flow li {
  display:flex;
  align-items:center;
  gap:16px;
  padding:12px 16px;
  border-radius:24px;
  background:#f5f9ff;
  border:1px solid #e1ecfb;
  transition:transform .25s,background .25s;
}
.dl-flow li:hover {
  transform:translateX(6px);
  background:#eaf3ff;
}
.dl-ic {
  flex:0 0 auto;
  width:52px;
  height:52px;
  display:grid;
  place-items:center;
  border-radius:50%;
  background:#fff;
  box-shadow:0 8px 18px -8px rgba(21,88,214,.5);
  font-size:26px;
}
.dl-flow li b {
  display:block;
  font-size:17.5px;
  color:var(--ink);
}
.dl-flow li small {
  display:block;
  color:var(--muted);
  font-size:15px;
  line-height:1.4;
}
.dl-demo {
  padding:clamp(22px,2.4vw,36px);
  border-radius:48px;
  background:#fff;
  border:1px solid #d7e5f7;
  box-shadow:0 30px 60px -32px rgba(21,60,140,.45);
}
.dl-demo-head {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-between;
  gap:18px;
  margin-bottom:22px;
}
.dl-demo-head h3 {
  font-size:clamp(22px,2.2vw,30px);
  font-weight:800;
  color:var(--ink);
}
.dl-demo-head small {
  display:block;
  color:var(--muted);
  font-size:15px;
  max-width:520px;
}
.dl-session {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:10px 16px;
  font-weight:700;
  color:#35506c;
}
.dl-session b {
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:24px;
  color:var(--blue);
}
.dl-session .cs-ghost {
  min-height:46px;
  padding:0 20px;
  font-size:15.5px;
}
.dl-session .cs-ghost:disabled,.dl-reset:disabled {
  opacity:.45;
  cursor:not-allowed;
}
.dl-reset {
  border:0;
  background:none;
  color:#5a6f8a;
  font-weight:800;
  text-decoration:underline;
}
.dl-rows {
  display:grid;
  gap:12px;
}
.dl-row {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:10px 18px;
  padding:14px 18px;
  border-radius:30px;
  background:#f5f9ff;
  border:1.5px solid #e1ecfb;
  animation:dlRowIn .6s cubic-bezier(.2,.8,.2,1) backwards;
  animation-delay:var(--i,0ms);
  transition:background .35s,border-color .35s,box-shadow .35s;
}
.dl-row:hover {
  box-shadow:0 14px 30px -18px rgba(21,60,140,.5);
}
.dl-row.open {
  background:#effbf4;
  border-color:#a7e5c3;
}
.dl-av {
  width:46px;
  height:46px;
  flex:0 0 auto;
  display:grid;
  place-items:center;
  border-radius:50%;
  background:linear-gradient(135deg,#1349c2,#19b3e6);
  color:#fff;
  font-weight:800;
  font-size:19px;
}
.dl-row.open .dl-av {
  background:linear-gradient(135deg,#059669,#34d399);
}
.dl-c {
  flex:1 1 90px;
  min-width:0;
}
.dl-c.wide {
  flex:1.4 1 150px;
}
.dl-c small {
  display:block;
  color:#7389a8;
  font-size:12.5px;
  font-weight:700;
}
.dl-c b {
  display:block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  font-size:16.5px;
  color:var(--ink);
}
.dl-c b.lock {
  color:#8aa0bd;
  letter-spacing:.5px;
}
.dl-c b.swap {
  animation:swapIn .5s both;
  color:#047857;
}
.dl-btn {
  flex:0 0 auto;
  min-width:168px;
  min-height:48px;
  padding:0 20px;
  border:0;
  border-radius:999px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  font-weight:800;
  font-size:15.5px;
  color:#fff;
  background:linear-gradient(100deg,#1349c2,#1766e6,#19b3e6);
  box-shadow:0 10px 22px -8px rgba(22,103,224,.6);
  transition:transform .2s,box-shadow .2s,filter .2s;
}
.dl-btn:hover:not(:disabled) {
  transform:translateY(-2px);
  filter:brightness(1.07);
}
.dl-btn:disabled {
  cursor:default;
}
.dl-btn.paying {
  background:#6b8bc0;
  box-shadow:none;
}
.dl-btn.done {
  background:#059669;
  box-shadow:0 10px 22px -10px rgba(5,150,105,.7);
}
.dl-spin {
  width:16px;
  height:16px;
  border-radius:50%;
  border:3px solid rgba(255,255,255,.4);
  border-top-color:#fff;
  animation:spin .7s linear infinite;
}
.dl-cta {
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:16px;
  margin-top:40px;
}
@keyframes dlPulse {
  from {
    transform:scale(.9);
    opacity:.4;
  }
  to {
    transform:none;
    opacity:1;
  }
}
@keyframes dlRowIn {
  from {
    opacity:0;
    transform:translateY(24px);
  }
  to {
    opacity:1;
    transform:none;
  }
}
@media (max-width:1000px) {
  .dl-grid {
    grid-template-columns:1fr;
  }
  .dl-mini {
    grid-template-columns:1fr 1fr 1fr;
  }
}
@media (max-width:640px) {
  .dl-mini {
    grid-template-columns:1fr;
  }
  .dl-total,.dl-flow,.dl-demo {
    border-radius:36px;
  }
  .dl-btn {
    width:100%;
  }
}
/* ---------- nav: College Radar (explore colleges) ---------- */
.cs-header nav>button.cs-fancy {
  display:inline-flex;
  align-items:center;
  gap:6px;
}
.cs-header nav>button.cs-fancy {
  isolation:isolate;
  margin-inline:2px;
  color:#fff;
  background:linear-gradient(100deg,#1349c2,#8b5cf6,#19b3e6,#1349c2);
  background-size:300% 100%;
  animation:grad 6s linear infinite;
  box-shadow:0 8px 20px rgba(21,88,214,.3);
}
.cs-header nav>button.cs-fancy::before {
  content:"";
  position:absolute;
  inset:-4px;
  z-index:-1;
  border-radius:999px;
  background:conic-gradient(from var(--ang),#19b3e6,#8b5cf6,#ffc83d,#ff7a59,#19b3e6);
  filter:blur(7px);
  opacity:.55;
  animation:ang 4s linear infinite;
  transition:opacity .3s;
}
.cs-header nav>button.cs-fancy:hover,.cs-header nav>button.cs-fancy.on {
  color:#fff;
  background:linear-gradient(100deg,#1349c2,#8b5cf6,#19b3e6,#1349c2);
  background-size:300% 100%;
  transform:translateY(-3px) scale(1.05);
}
.cs-header nav>button.cs-fancy:hover::before,.cs-header nav>button.cs-fancy.on::before {
  opacity:.95;
}
.cs-fi {
  display:inline-block;
  font-size:18px;
  line-height:1;
  animation:capToss 3.6s ease-in-out infinite;
}
.cs-new {
  position:absolute;
  top:-7px;
  right:-6px;
  font-style:normal;
  padding:2px 7px;
  border-radius:999px;
  background:linear-gradient(90deg,#ffc83d,#ff7a59);
  color:#5a2200;
  font-size:10.5px;
  font-weight:800;
  letter-spacing:.8px;
  animation:newPing 2s infinite;
}
/* ---------- "Please login" popup ---------- */
.lg-back {
  position:fixed;
  inset:0;
  z-index:500;
  display:grid;
  place-items:center;
  padding:20px;
  background:rgba(8,21,56,.58);
  backdrop-filter:blur(9px);
  -webkit-backdrop-filter:blur(9px);
  animation:lgFade .3s both;
}
.lg-card {
  position:relative;
  overflow:hidden;
  width:min(560px,100%);
  padding:46px clamp(22px,4vw,48px) 38px;
  text-align:center;
  border-radius:58px 58px 58px 14px;
  background:linear-gradient(#fff,#f4f8ff);
  box-shadow:0 50px 100px -30px rgba(8,21,56,.75);
  animation:lgPop .65s cubic-bezier(.2,1.15,.3,1) both;
}
.lg-card::before {
  content:"";
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:7px;
  background:linear-gradient(90deg,#1458d8,#19b3e6,#8b5cf6,#ffc83d,#1458d8);
  background-size:300% 100%;
  animation:grad 5s linear infinite;
}
.lg-card>* {
  position:relative;
  z-index:2;
}
.lg-blob {
  position:absolute!important;
  z-index:1!important;
  border-radius:50%;
  background:#dbe9ff;
  opacity:.7;
  animation:morph 10s ease-in-out infinite,drift 14s ease-in-out infinite;
  pointer-events:none;
}
.lg-blob.a {
  width:200px;
  height:200px;
  right:-70px;
  top:-60px;
}
.lg-blob.b {
  width:150px;
  height:150px;
  left:-50px;
  bottom:-50px;
  background:#d6f2ff;
  animation-delay:-5s;
}
.lg-x {
  position:absolute!important;
  top:18px;
  right:18px;
  display:grid;
  place-items:center;
  width:42px;
  height:42px;
  border:0;
  border-radius:50%;
  background:#eaf2ff;
  color:var(--blue);
  font-size:17px;
  font-weight:800;
  transition:transform .3s,background .25s;
}
.lg-x:hover {
  background:#dbe9ff;
  transform:rotate(90deg) scale(1.1);
}
.lg-lock {
  position:relative;
  display:grid;
  place-items:center;
  width:112px;
  height:112px;
  margin:0 auto 18px;
}
.lg-ring {
  position:absolute;
  inset:0;
  border-radius:50%;
  border:3px solid rgba(21,88,214,.45);
  animation:lgRing 2.6s ease-out infinite;
}
.lg-ring.r2 {
  animation-delay:1.3s;
}
.lg-ico {
  position:relative;
  display:grid;
  place-items:center;
  width:88px;
  height:88px;
  border-radius:50% 50% 50% 16%;
  background:linear-gradient(135deg,#1349c2,#19b3e6);
  font-size:42px;
  box-shadow:0 18px 34px rgba(21,88,214,.4);
  animation:lockShake 3.2s ease-in-out infinite,morph 9s ease-in-out infinite;
}
.lg-eye {
  margin-bottom:14px!important;
}
.lg-card h3 {
  margin-bottom:10px!important;
  font-size:clamp(28px,3.4vw,38px);
  font-weight:800;
  line-height:1.1;
  letter-spacing:-.6px;
  color:var(--ink);
}
.lg-p {
  max-width:420px;
  margin:0 auto!important;
  font-size:17.5px;
  line-height:1.65;
  color:var(--muted);
  text-align:center!important;
}
.lg-teaser {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:10px;
  margin:24px 0 26px;
}
.lg-teaser div {
  display:grid;
  gap:2px;
  padding:12px 8px;
  border-radius:24px 24px 24px 8px;
  background:#fff;
  border:1px solid #d9e7f8;
  box-shadow:0 12px 24px -16px rgba(21,60,140,.4);
  animation:planIn .6s cubic-bezier(.2,.8,.2,1) both;
  animation-delay:calc(var(--i) * .1s + .3s);
}
.lg-teaser b {
  font-size:15px;
  color:#0f2a5c;
}
.lg-teaser span {
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:22px;
  font-weight:800;
}
.lg-actions {
  display:grid;
  gap:12px;
}
.lg-actions .cs-solid,.lg-actions .cs-ghost {
  width:100%;
}
/* ================= MOTION LAYER (sections arrive one by one, in nav order) ================= */
.cs-why + .cs-light>.cs-sec {
  padding-top:clamp(10px,2vw,30px);
}
/* headings: word by word (masked slide-up + de-blur) */
.cs-h2.cs-rv,.cs-sub.cs-rv {
  opacity:1;
  translate:0 0;
}
.cs-wd {
  display:inline-block;
  overflow:hidden;
  vertical-align:top;
  padding:.05em .03em .16em;
  margin:-.05em -.03em -.16em;
}
.cs-wd>span {
  display:inline-block;
  opacity:0;
  filter:blur(7px);
  transform:translateY(115%) rotate(5deg);
  transform-origin:0 100%;
  transition:transform .95s cubic-bezier(.2,.8,.2,1),opacity .7s ease,filter .8s ease;
  transition-delay:calc(var(--wi) * .085s + .2s);
}
.cs-rv.in .cs-wd>span {
  opacity:1;
  filter:blur(0);
  transform:none;
}
/* paragraphs: line by line */
.cs-ln {
  display:block;
  opacity:0;
  filter:blur(5px);
  transform:translateY(22px);
  transition:opacity .8s ease,transform .9s cubic-bezier(.2,.8,.2,1),filter .8s ease;
  transition-delay:calc(var(--li) * .24s + .55s);
}
.cs-rv.in .cs-ln {
  opacity:1;
  filter:blur(0);
  transform:none;
}
/* eyebrow chips */
.cs-eyebrow {
  position:relative;
  overflow:hidden;
}
.cs-eyebrow::after {
  content:"";
  position:absolute;
  top:0;
  left:-70%;
  width:45%;
  height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.7),transparent);
  transform:skewX(-20deg);
  animation:shine 4.4s infinite;
}
.cs-eyebrow.in {
  animation:eyeIn 1.1s cubic-bezier(.2,.8,.2,1) both;
}
/* side rail: a line that fills section by section */
.cs-rail {
  position:fixed;
  right:clamp(10px,1.3vw,24px);
  top:50%;
  z-index:240;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
  height:min(58vh,440px);
  padding:4px 0;
  opacity:0;
  translate:40px -50%;
  pointer-events:none;
  transition:opacity .5s ease,translate .7s cubic-bezier(.2,.8,.2,1);
}
.cs-rail.show {
  opacity:1;
  translate:0 -50%;
  pointer-events:auto;
}
.rl-line {
  position:absolute;
  left:50%;
  top:15px;
  bottom:15px;
  width:4px;
  margin-left:-2px;
  border-radius:4px;
  background:rgba(21,88,214,.18);
}
.rl-line i {
  display:block;
  width:100%;
  border-radius:4px;
  background:linear-gradient(#1558d6,#19b3e6,#8b5cf6);
  box-shadow:0 0 12px rgba(21,88,214,.55);
  transition:height .9s cubic-bezier(.2,.8,.2,1);
}
.rl-dot {
  position:relative;
  z-index:1;
  display:grid;
  place-items:center;
  width:26px;
  height:26px;
  padding:0;
  border:0;
  background:none;
}
.rl-pt {
  display:block;
  width:13px;
  height:13px;
  border-radius:50%;
  background:#fff;
  border:3px solid #b7cdee;
  box-shadow:0 0 0 2px rgba(255,255,255,.85);
  transition:width .4s cubic-bezier(.2,1.3,.3,1),height .4s cubic-bezier(.2,1.3,.3,1),background .35s,border-color .35s,transform .25s;
}
.rl-dot.done .rl-pt {
  background:#1558d6;
  border-color:#1558d6;
}
.rl-dot.on .rl-pt {
  width:20px;
  height:20px;
  border-color:#fff;
  background:linear-gradient(135deg,#1349c2,#19b3e6);
  animation:railPing 2s infinite;
}
.rl-dot:hover .rl-pt {
  transform:scale(1.3);
}
.rl-dot span {
  position:absolute;
  right:34px;
  top:50%;
  translate:14px -50%;
  padding:7px 15px;
  border-radius:999px;
  background:#0f2a5c;
  color:#fff;
  font-size:13.5px;
  font-weight:800;
  white-space:nowrap;
  opacity:0;
  pointer-events:none;
  box-shadow:0 12px 24px rgba(8,21,56,.35);
  transition:opacity .25s ease,translate .35s cubic-bezier(.2,.8,.2,1);
}
.rl-dot:hover span,.rl-dot:focus-visible span {
  opacity:1;
  translate:0 -50%;
}
/* nav: unique names slide in one by one, animated underline, icons in the mobile menu */
.cs-header nav>button {
  animation:navIn .65s cubic-bezier(.2,.8,.2,1) backwards;
  animation-delay:calc(var(--k,0) * .06s + .5s);
}
.cs-header nav>button:not(.cs-fancy)::after {
  content:"";
  position:absolute;
  left:50%;
  bottom:5px;
  width:0;
  height:3px;
  border-radius:3px;
  background:linear-gradient(90deg,#1558d6,#19b3e6);
  translate:-50% 0;
  transition:width .35s cubic-bezier(.2,.8,.2,1);
}
.cs-header nav>button:not(.cs-fancy):hover::after {
  width:28%;
}
.cs-header nav>button.on:not(.cs-fancy)::after {
  width:48%;
}
.cs-ni {
  display:none;
  margin-right:10px;
  font-size:18px;
  line-height:1;
}
/* button click ripple */
.dl-btn,.cs-unlock,.cs-unlock-btn {
  position:relative;
  overflow:hidden;
}
.cs-ripple {
  position:absolute;
  border-radius:50%;
  background:rgba(255,255,255,.55);
  pointer-events:none;
  transform:scale(0);
  animation:ripple .65s ease-out forwards;
}
.cs-ghost .cs-ripple,.cs-white .cs-ripple {
  background:rgba(21,88,214,.22);
}
/* things inside each section also arrive one by one */
.dl-flow.in li {
  animation:liIn .6s cubic-bezier(.2,.8,.2,1) backwards;
  animation-delay:calc(var(--i) + .45s);
}
.cs-plan.in li {
  animation:liIn .6s cubic-bezier(.2,.8,.2,1) backwards;
  animation-delay:calc(var(--d,0s) + .5s + var(--n,0) * .11s);
}
.cs-plan li:nth-child(2) {
  --n:1;
}
.cs-plan li:nth-child(3) {
  --n:2;
}
.cs-plan li:nth-child(4) {
  --n:3;
}
.cs-preview.in .cs-leadrow {
  animation:rowIn .75s cubic-bezier(.2,.8,.2,1) backwards;
  animation-delay:calc(var(--i) * .15s + .35s);
}
.cs-flow>*:nth-child(1) {
  --fd:.1s;
}
.cs-flow>*:nth-child(2) {
  --fd:.35s;
}
.cs-flow>*:nth-child(3) {
  --fd:.5s;
}
.cs-flow>*:nth-child(4) {
  --fd:.75s;
}
.cs-flow>*:nth-child(5) {
  --fd:.9s;
}
.cs-flow>*:nth-child(6) {
  --fd:1.15s;
}
.cs-flow>*:nth-child(7) {
  --fd:1.3s;
}
.cs-flow.in>div {
  animation:pop .7s cubic-bezier(.2,.8,.2,1) backwards;
  animation-delay:var(--fd,0s);
}
.cs-flow i {
  scale:0 1;
  transform-origin:left;
  transition:scale .7s cubic-bezier(.2,.8,.2,1) var(--fd,0s);
}
.cs-flow.in i {
  scale:1 1;
}
.cs-rv.in .cs-pills span {
  animation:pop .6s cubic-bezier(.2,1.2,.3,1) backwards;
}
.cs-rv.in .cs-pills span:nth-child(1) {
  animation-delay:1s;
}
.cs-rv.in .cs-pills span:nth-child(2) {
  animation-delay:1.15s;
}
.cs-rv.in .cs-pills span:nth-child(3) {
  animation-delay:1.3s;
}
.cs-contact.in .cs-form>:not(.cs-ok) {
  animation:liIn .6s cubic-bezier(.2,.8,.2,1) backwards;
}
.cs-contact.in .cs-form>:nth-child(1) {
  animation-delay:.4s;
}
.cs-contact.in .cs-form>:nth-child(2) {
  animation-delay:.52s;
}
.cs-contact.in .cs-form>:nth-child(3) {
  animation-delay:.64s;
}
.cs-contact.in .cs-form>:nth-child(4) {
  animation-delay:.76s;
}
.cs-contact.in .cs-form>:nth-child(5) {
  animation-delay:.88s;
}
.cs-contact.in .cs-form>:nth-child(6) {
  animation-delay:1s;
}
.cs-est>div.in {
  animation:bobS 6s ease-in-out infinite;
}
.cs-est>div:nth-child(2).in {
  animation-delay:-1.5s;
}
.cs-est>div:nth-child(3).in {
  animation-delay:-3s;
}
.cs-est>div:nth-child(4).in {
  animation-delay:-4.5s;
}
.cs-privacy.in .shield {
  animation:ping2 2.4s infinite,shieldIn 1s cubic-bezier(.2,1.3,.3,1) backwards .3s;
}
/* ---------- keyframes ---------- */
@keyframes morph {
  0%,100% {
    border-radius:58% 42% 52% 48%/48% 56% 44% 52%;
  }
  33% {
    border-radius:42% 58% 40% 60%/56% 42% 58% 44%;
  }
  66% {
    border-radius:52% 48% 60% 40%/42% 60% 40% 58%;
  }
}
@keyframes drift {
  0%,100% {
    translate:0 0;
  }
  50% {
    translate:40px 30px;
  }
}
@keyframes spin {
  to {
    transform:rotate(360deg);
  }
}
@keyframes spinrev {
  to {
    transform:rotate(-360deg);
  }
}
@keyframes bob {
  0%,100% {
    transform:translateY(0);
  }
  50% {
    transform:translateY(-14px);
  }
}
@keyframes float {
  0%,100% {
    transform:translateY(0) rotate(0);
  }
  50% {
    transform:translateY(-20px) rotate(1.5deg);
  }
}
@keyframes twinkle {
  0%,100% {
    opacity:0;
    transform:scale(.5) rotate(0);
  }
  50% {
    opacity:.9;
    transform:scale(1.2) rotate(90deg);
  }
}
@keyframes wordIn {
  from {
    opacity:0;
    transform:translateY(46px) rotate(5deg);
    filter:blur(6px);
  }
  to {
    opacity:1;
    transform:none;
    filter:blur(0);
  }
}
@keyframes pop {
  from {
    opacity:0;
    transform:translateY(24px) scale(.96);
  }
  to {
    opacity:1;
    transform:none;
  }
}
@keyframes ping {
  0% {
    box-shadow:0 0 0 0 rgba(16,185,129,.65);
  }
  80%,100% {
    box-shadow:0 0 0 12px rgba(16,185,129,0);
  }
}
@keyframes ping2 {
  0% {
    box-shadow:0 0 0 0 rgba(255,255,255,.45);
  }
  80%,100% {
    box-shadow:0 0 0 22px rgba(255,255,255,0);
  }
}
/* ---------- hero: Live Admission Pulse ---------- */
.hp {
  display:grid;
  gap:22px;
  max-width:600px;
  animation:pop 1s 1.1s cubic-bezier(.2,.8,.2,1) both;
}
.hp-card {
  position:relative;
  overflow:hidden;
  padding:20px 22px 16px;
  border-radius:34px 34px 34px 10px;
  color:#fff;
  background:linear-gradient(145deg,#0a1744,#0e3283 65%,#0b4f9e);
  box-shadow:0 34px 64px -28px rgba(10,23,68,.85);
}
.hp-glow {
  position:absolute;
  width:260px;
  height:260px;
  right:-80px;
  top:-100px;
  border-radius:50%;
  background:radial-gradient(circle,rgba(25,179,230,.55),transparent 70%);
  animation:drift 12s ease-in-out infinite;
  pointer-events:none;
}
.hp-card>* {
  position:relative;
  z-index:1;
}
.hp-card>.hp-glow {
  position:absolute;
}
.hp-head {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-between;
  gap:8px 16px;
}
.hp-live {
  display:inline-flex;
  align-items:center;
  gap:8px;
  font-size:11.5px;
  font-weight:800;
  letter-spacing:1.6px;
  color:#a9dcff;
}
.hp-live i {
  width:9px;
  height:9px;
  border-radius:50%;
  background:#34d399;
  animation:ping 1.6s infinite;
}
.hp-today {
  font-size:14px;
  font-weight:600;
  color:#cfe0fa;
}
.hp-today b {
  margin-right:8px;
  font-family:"Bricolage Grotesque",sans-serif;
  font-size:clamp(28px,2.8vw,40px);
  font-weight:800;
  color:#ffd66b;
}
.hp-bars {
  display:flex;
  align-items:flex-end;
  gap:7px;
  height:100px;
  margin-top:18px;
}
.hp-bars i {
  flex:1;
  height:var(--h);
  border-radius:9px 9px 4px 4px;
  background:linear-gradient(#19b3e6,#1558d6);
  opacity:.9;
  transition:height 1.1s cubic-bezier(.2,.8,.2,1);
  transition-delay:calc(var(--k) * .04s);
}
.hp-bars i.last {
  background:linear-gradient(#ffd66b,#ff7a59);
  animation:hpGlow 1.8s infinite;
}
.hp-axis {
  display:flex;
  justify-content:space-between;
  margin-top:8px;
  font-size:12px;
  font-weight:700;
  color:#8fb0e0;
}
.hp-feed {
  display:flex;
  align-items:center;
  gap:12px;
  margin-top:14px;
  padding:10px 14px;
  border-radius:999px;
  background:rgba(255,255,255,.12);
  border:1px solid rgba(255,255,255,.2);
  animation:swapIn .55s cubic-bezier(.2,.8,.2,1) both;
}
.hp-pin {
  flex:none;
  display:grid;
  place-items:center;
  width:34px;
  height:34px;
  border-radius:50%;
  background:rgba(255,255,255,.18);
  font-size:16px;
}
.hp-feed p {
  flex:1;
  min-width:0;
  font-size:14.5px;
  line-height:1.3;
  color:#e6f0ff;
  text-align:left!important;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.hp-feed p b {
  color:#fff;
}
.hp-feed p em {
  font-style:normal;
  font-weight:800;
  color:#ffd66b;
}
.hp-rs {
  flex:none;
  padding:5px 12px;
  border-radius:999px;
  background:linear-gradient(90deg,#34d399,#10b981);
  font-size:13.5px;
  font-weight:800;
}
.hp-track {
  position:relative;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  padding:0 4px;
}
.hp-rail {
  position:absolute;
  left:16.66%;
  right:16.66%;
  top:26px;
  height:6px;
  margin-top:-3px;
  border-radius:6px;
  background:#cfe0fa;
}
.hp-rail>i {
  position:absolute;
  left:0;
  top:0;
  height:100%;
  border-radius:6px;
  background:linear-gradient(90deg,#1558d6,#19b3e6,#8b5cf6);
  transition:width 1s cubic-bezier(.2,.8,.2,1);
}
.hp-coin {
  position:absolute;
  top:50%;
  z-index:3;
  display:grid;
  place-items:center;
  width:38px;
  height:38px;
  margin:-19px 0 0 -19px;
  border-radius:50%;
  background:linear-gradient(145deg,#ffd66b,#f59e0b);
  color:#7a4a00;
  font-weight:900;
  font-size:19px;
  box-shadow:0 10px 22px rgba(245,158,11,.55);
  transition:left 1s cubic-bezier(.2,.8,.2,1);
  animation:hpCoin 1.5s ease-in-out infinite;
}
.hp-st {
  position:relative;
  z-index:2;
  display:grid;
  justify-items:center;
  gap:8px;
  text-align:center;
}
.hp-st b {
  display:grid;
  place-items:center;
  width:52px;
  height:52px;
  border-radius:50% 50% 50% 14%;
  background:#fff;
  border:2px solid #cfe0fa;
  font-size:24px;
  filter:grayscale(.8);
  opacity:.75;
  transition:all .5s cubic-bezier(.2,.8,.2,1);
}
.hp-st span {
  font-size:13.5px;
  font-weight:800;
  line-height:1.25;
  color:#6f86a8;
  transition:color .4s;
}
.hp-st.on b {
  filter:none;
  opacity:1;
  border-color:#19b3e6;
  box-shadow:0 12px 24px -10px rgba(21,88,214,.6);
}
.hp-st.on span {
  color:#1349c2;
}
.hp-st.now b {
  transform:translateY(-6px) scale(1.1);
}
@keyframes hpGlow {
  0%,100% {
    box-shadow:0 0 0 0 rgba(255,200,61,.6);
  }
  60% {
    box-shadow:0 0 0 10px rgba(255,200,61,0);
  }
}
@keyframes hpCoin {
  0%,100% {
    rotate:-8deg;
  }
  50% {
    rotate:8deg;
    scale:1.1;
  }
}
@media (max-width:560px) {
  .hp-st span {
    font-size:12px;
  }
  .hp-st b {
    width:46px;
    height:46px;
    font-size:21px;
  }
  .hp-rail {
    top:23px;
  }
  .hp-card {
    padding:16px;
  }
}
@keyframes marq {
  to {
    transform:translateX(-33.3333%);
  }
}
@keyframes grad {
  to {
    background-position:300% 0;
  }
}
@keyframes gradMove {
  0%,100% {
    background-position:0% 50%;
  }
  50% {
    background-position:100% 50%;
  }
}
@keyframes shine {
  0%,60% {
    left:-80%;
  }
  100% {
    left:140%;
  }
}
@keyframes wiggle {
  0%,86%,100% {
    transform:rotate(0);
  }
  90% {
    transform:rotate(-14deg);
  }
  95% {
    transform:rotate(12deg);
  }
}
@keyframes toast {
  0%,6% {
    opacity:0;
    transform:translateX(-40px) scale(.85);
  }
  12%,64% {
    opacity:1;
    transform:none;
  }
  72%,100% {
    opacity:0;
    transform:translateX(-30px) scale(.9);
  }
}
@keyframes swapIn {
  from {
    opacity:0;
    transform:translateY(10px) scale(.9);
  }
  to {
    opacity:1;
    transform:none;
  }
}
@keyframes shimmerText {
  to {
    background-position:-220% 0;
  }
}
@keyframes ang {
  to {
    --ang:360deg;
  }
}
@keyframes coinTilt {
  0%,100% {
    transform:perspective(900px) rotateY(-14deg) rotateX(4deg);
  }
  50% {
    transform:perspective(900px) rotateY(14deg) rotateX(-4deg);
  }
}
@keyframes dash {
  to {
    background-position-x:26px;
  }
}
@keyframes bar {
  0%,100% {
    transform:scaleY(.55);
  }
  50% {
    transform:scaleY(1);
  }
}
@keyframes glowPulse {
  0%,100% {
    box-shadow:0 0 0 0 rgba(255,255,255,.5);
  }
  60% {
    box-shadow:0 0 0 14px rgba(255,255,255,0);
  }
}
@keyframes lockShake {
  0%,80%,100% {
    transform:rotate(0);
  }
  84% {
    transform:rotate(-12deg);
  }
  88% {
    transform:rotate(10deg);
  }
  92% {
    transform:rotate(-6deg);
  }
}
@keyframes numPop {
  0% {
    transform:scale(0) rotate(-120deg);
  }
  70% {
    transform:scale(1.18) rotate(8deg);
  }
  100% {
    transform:scale(1) rotate(0);
  }
}
@keyframes liIn {
  from {
    opacity:0;
    transform:translateX(40px);
  }
  to {
    opacity:1;
    transform:none;
  }
}
@keyframes planIn {
  from {
    opacity:0;
    transform:translateY(46px) scale(.94);
  }
  to {
    opacity:1;
    transform:none;
  }
}
@keyframes cloud {
  from {
    transform:translateX(-20px);
  }
  to {
    transform:translateX(70px);
  }
}
@keyframes fly {
  0% {
    transform:translate(-60px,130px);
  }
  100% {
    transform:translate(540px,50px);
  }
}
@keyframes sway {
  0%,100% {
    transform:rotate(-2.5deg);
  }
  50% {
    transform:rotate(2.5deg);
  }
}
@keyframes waveflag {
  0%,100% {
    transform:skewY(-6deg) scaleX(1);
  }
  50% {
    transform:skewY(6deg) scaleX(.84);
  }
}
@keyframes capToss {
  0%,60%,100% {
    transform:translateY(0) rotate(0);
  }
  70% {
    transform:translateY(-7px) rotate(-18deg);
  }
  80% {
    transform:translateY(-3px) rotate(14deg);
  }
  90% {
    transform:translateY(0) rotate(-4deg);
  }
}
@keyframes newPing {
  0% {
    box-shadow:0 0 0 0 rgba(255,200,61,.8);
  }
  80%,100% {
    box-shadow:0 0 0 9px rgba(255,200,61,0);
  }
}
@keyframes lgFade {
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
}
@keyframes lgPop {
  0% {
    opacity:0;
    transform:translateY(60px) scale(.82) rotate(-2deg);
  }
  100% {
    opacity:1;
    transform:none;
  }
}
@keyframes lgRing {
  0% {
    transform:scale(.7);
    opacity:.9;
  }
  100% {
    transform:scale(1.55);
    opacity:0;
  }
}
@keyframes winBlink {
  0%,70%,100% {
    fill:#bfd9fb;
  }
  80%,90% {
    fill:#ffe9a8;
  }
}
/* ---------- new keyframes ---------- */
@keyframes navIn {
  from {
    opacity:0;
    transform:translateY(-16px) scale(.88);
  }
}
@keyframes eyeIn {
  from {
    letter-spacing:9px;
    opacity:.2;
  }
  to {
    letter-spacing:2.2px;
    opacity:1;
  }
}
@keyframes railPing {
  0% {
    box-shadow:0 0 0 0 rgba(25,179,230,.7),0 8px 16px rgba(21,88,214,.45);
  }
  80%,100% {
    box-shadow:0 0 0 13px rgba(25,179,230,0),0 8px 16px rgba(21,88,214,.45);
  }
}
@keyframes ripple {
  from {
    opacity:.9;
    transform:scale(0);
  }
  to {
    opacity:0;
    transform:scale(1);
  }
}
@keyframes rowIn {
  from {
    opacity:0;
    transform:translateX(-70px) scale(.96);
  }
  to {
    opacity:1;
    transform:none;
  }
}
@keyframes bobS {
  0%,100% {
    transform:translateY(0);
  }
  50% {
    transform:translateY(-9px);
  }
}
@keyframes shieldIn {
  from {
    transform:scale(0) rotate(-90deg);
  }
  to {
    transform:none;
  }
}
/* ---------- home hero (reference design) ---------- */
.hx {
  position:relative;
  overflow:hidden;
  padding:calc(var(--nav) + 70px) 0 130px;
  background:radial-gradient(900px 520px at 88% 8%,rgba(139,92,246,.12),transparent 70%),radial-gradient(800px 500px at 0% 95%,rgba(25,179,230,.16),transparent 70%),linear-gradient(160deg,#eaf3ff 0%,#f8fbff 55%,#e6f3ff 100%);
}
.hx-wrap {
  position:relative;
  z-index:3;
}
.hx-in {
  display:grid;
  grid-template-columns:minmax(0,1fr);
  gap:44px;
  align-items:center;
}
@media (min-width:1180px) {
  .hx-in {
    grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);
    gap:clamp(24px,3vw,56px);
  }
}
.hx-ico {
  display:block;
  width:100%;
  height:100%;
}
.hx-tag {
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 20px 10px 14px;
  border-radius:999px;
  background:rgba(255,255,255,.85);
  border:1.5px solid #cfe1fb;
  color:var(--blue);
  font-size:16.5px;
  font-weight:700;
}
.hx-tag .hx-ico {
  width:24px;
  height:24px;
}
.hx h1 {
  margin:26px 0 24px!important;
  font-family:"Plus Jakarta Sans",system-ui,sans-serif;
  font-size:clamp(26px,8cqw,78px);
  line-height:1.06;
  font-weight:800;
  letter-spacing:-.045em;
  color:#0d1f4d;
  text-align:left!important;
}
.hx h1 .cs-grad {
  /* 1st third = original blue look, last third = site brand colours (blue > violet > coral) */
  background:linear-gradient(90deg,#1766e6 0%,#19a7e6 20%,#22c0ee 33.3%,#22c0ee 33.4%,#19b3e6 50%,#1458d8 66.6%,#1458d8 66.7%,#8b5cf6 83%,#ff7a59 100%);
  background-size:300% 100%;
  background-position:0% 0;
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  color:transparent;
  animation:wordIn .9s cubic-bezier(.2,.8,.2,1) forwards, heroColorShift 4.5s ease-in-out infinite alternate;
  animation-delay:calc(var(--w) * .09s + .25s), 3s; /* 2nd value = seconds before the colour starts moving */
}
@keyframes heroColorShift {
  from { background-position:0% 0; }
  to { background-position:100% 0; }
}
.hx-copy {
  container-type:inline-size;
}
.hx-ln {
  display:block;
  white-space:nowrap;
}
.hx .cs-lede {
  max-width:640px;
  margin-bottom:34px!important;
}
.hx .cs-lede b.dk {
  color:#16306a;
}
.hx-btn {
  min-height:60px;
  padding:0 34px;
  font-size:18px;
}
.hx-play {
  display:grid;
  place-items:center;
  width:34px;
  height:34px;
  border-radius:50%;
  background:var(--blue);
  color:#fff;
  padding:8px 6px 8px 9px;
}
.hx-trust {
  display:flex;
  flex-wrap:nowrap;
  align-items:center;
  gap:0;
  margin-top:40px;
}
.hx-tr {
  display:flex;
  align-items:center;
  gap:clamp(8px,.8vw,13px);
  min-width:0;
  padding-right:clamp(10px,1.4vw,24px);
}
.hx-tr+.hx-tr {
  padding-left:clamp(10px,1.4vw,24px);
  border-left:1.5px solid #d3e2f7;
}
.hx-tr>span {
  display:grid;
  place-items:center;
  flex:none;
  width:clamp(38px,2.8vw,46px);
  height:clamp(38px,2.8vw,46px);
  padding:0;
  border-radius:50%;
  background:#fff;
  color:#1a5fd8;
  box-shadow:0 6px 18px rgba(21,70,150,.12);
}
.hx-tr .hx-ico {
  width:54%;
  height:54%;
  fill:currentColor;
  stroke:currentColor;
}
.hx-tr.shield .hx-ico path+path {
  fill:none;
  stroke:#fff;
  stroke-width:2.4;
}
.hx-tr.users .hx-ico path {
  fill:none;
  stroke-width:2.2;
}
.hx-tr.bolt .hx-ico {
  stroke-width:1.2;
}
.hx-tr b {
  display:block;
  font-size:clamp(12.5px,.95vw,15px);
  font-weight:700;
  color:#122b5e;
  line-height:1.25;
}
.hx-tr small {
  display:block;
  margin-top:2px;
  font-size:clamp(11.5px,.8vw,13px);
  font-weight:500;
  color:#7b8fae;
  white-space:nowrap;
}
@media (max-width:640px) {
  .hx-trust {
    flex-wrap:wrap;
    gap:18px 0;
  }
  .hx-tr {
    padding-right:0;
    margin-right:26px;
  }
  .hx-tr+.hx-tr {
    padding-left:0;
    border-left:0;
  }
  .hx-tr>span {
    width:42px;
    height:42px;
  }
  .hx-tr b {
    font-size:15px;
  }
  .hx-tr small {
    font-size:13px;
  }
}
.hx-stage {
  position:relative;
  width:100%;
  max-width:900px;
  margin-inline:auto;
  animation:pop 1.1s .4s cubic-bezier(.2,.8,.2,1) both;
}
.hx-ob {
  position:relative;
  width:min(68%,640px);
  aspect-ratio:1;
  margin:8% 0 8% 8%;
}
.hx-sphere {
  position:absolute;
  inset:17%;
  border-radius:50%;
  overflow:hidden;
  border:8px solid #fff;
  background:#cfe8ff;
  box-shadow:0 0 0 12px rgba(255,255,255,.5),0 0 0 26px rgba(120,180,255,.16),0 34px 70px rgba(21,88,214,.3);
  animation:hxFloat 6s ease-in-out infinite;
}
.hx-sphere::after {
  content:"";
  position:absolute;
  inset:0;
  border-radius:50%;
  pointer-events:none;
  background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.6),transparent 40%);
}
.hx-orbit {
  position:absolute;
  inset:0;
  animation:hxSpin 42s linear infinite;
}
.hx-orbit::before {
  content:"";
  position:absolute;
  inset:0;
  border-radius:50%;
  border:2px dashed rgba(21,88,214,.28);
}
.hx-node {
  position:absolute;
  width:12px;
  height:12px;
  margin:-6px 0 0 -6px;
  border-radius:50%;
  background:#2a86e0;
  box-shadow:0 0 0 5px rgba(42,134,224,.2);
}
.hx-it {
  position:absolute;
  width:23%;
  aspect-ratio:1;
  translate:-50% -50%;
}
.hx-up {
  position:relative;
  width:100%;
  height:100%;
  animation:hxRev 42s linear infinite;
}
.hx-av {
  display:block;
  width:100%;
  height:100%;
  border-radius:50%;
  overflow:hidden;
  border:5px solid #fff;
  background:#fff;
  box-shadow:0 14px 30px rgba(21,70,150,.28);
}
.hx-av img {
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
}
.hx-av svg {
  display:block;
  width:100%;
  height:100%;
}
.hx-int {
  position:absolute;
  left:50%;
  top:90%;
  translate:-50% 0;
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:5px 12px;
  border-radius:999px;
  background:#fff;
  color:#0f8a52;
  font-style:normal;
  font-size:13.5px;
  font-weight:800;
  white-space:nowrap;
  box-shadow:0 8px 18px rgba(21,70,150,.18);
}
.hx-int i {
  width:9px;
  height:9px;
  border-radius:50%;
  background:#10b981;
  animation:ping 1.6s infinite;
}
.hx-chip {
  position:absolute;
  z-index:5;
  left:30%;
  bottom:1%;
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 20px 10px 12px;
  border-radius:22px;
  background:#fff;
  box-shadow:0 16px 36px rgba(21,70,150,.2);
  animation:hxFloat 5s ease-in-out infinite;
}
.hx-chip>.hx-ico {
  width:42px;
  height:42px;
  padding:9px;
  border-radius:50%;
  background:#e6f0ff;
  color:var(--blue);
}
.hx-chip b {
  display:block;
  font-size:14.5px;
  color:#13306a;
  line-height:1.2;
}
.hx-chip small {
  display:block;
  font-size:13px;
  font-weight:600;
  color:#7389a8;
}
.hx-card {
  position:absolute;
  z-index:6;
  right:0;
  top:50%;
  translate:0 -46%;
  width:min(310px,38%);
}
.hx .cs-lead {
  padding:18px 20px 20px;
  border-radius:26px;
}
.hx .cs-lead .cs-unlock-btn {
  position:relative;
  overflow:hidden;
  animation:hxBtn 2.2s ease-in-out infinite;
}
.hx .cs-lead .cs-unlock-btn::after {
  content:"";
  position:absolute;
  top:0;
  left:-80%;
  width:45%;
  height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.6),transparent);
  transform:skewX(-20deg);
  animation:shine 2.4s infinite;
}
.hx .cs-lead.open .cs-unlock-btn {
  animation:none;
}
.hx-works {
  position:relative;
  margin-top:clamp(34px,5vw,60px);
  padding:26px clamp(18px,3vw,38px) 32px;
  border-radius:30px;
  background:rgba(255,255,255,.9);
  border:1px solid #fff;
  box-shadow:0 24px 60px rgba(21,70,150,.14);
  overflow:hidden;
}
.hx-works h3 {
  position:relative;
  z-index:1;
  font-size:clamp(20px,1.7vw,24px);
  font-weight:800;
  color:#0f2150;
}
.hx-sea {
  position:absolute;
  left:0;
  bottom:0;
  width:200%;
  height:64px;
  fill:rgba(25,140,230,.08);
  pointer-events:none;
  animation:hxSea 9s linear infinite;
}
.hx-sea.s2 {
  height:48px;
  fill:rgba(139,92,246,.07);
  animation-duration:14s;
  animation-direction:reverse;
}
.hx-steps {
  position:relative;
  z-index:1;
  display:grid;
  grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;
  align-items:center;
  gap:10px 14px;
  margin-top:20px;
}
.hx-step {
  display:flex;
  align-items:center;
  gap:16px;
  animation:hxWave 4s ease-in-out infinite;
  animation-delay:calc(var(--i) * -.7s);
}
.hx-ic {
  position:relative;
  flex:none;
  display:grid;
  place-items:center;
  width:84px;
  height:84px;
  padding:21px;
  border-radius:50%;
}
.hx-ic::after {
  content:"";
  position:absolute;
  inset:-6px;
  border-radius:50%;
  border:2px solid currentColor;
  opacity:0;
  animation:hxRing 2.2s ease-out infinite;
  animation-delay:calc(var(--i) * .4s);
}
.hx-ic .hx-ico {
  animation:hxBlink 2.2s ease-in-out infinite;
  animation-delay:calc(var(--i) * .4s);
}
.hx-ic b {
  position:absolute;
  top:-3px;
  right:-3px;
  display:grid;
  place-items:center;
  width:26px;
  height:26px;
  border-radius:50%;
  border:2px solid #fff;
  color:#fff;
  font-size:13px;
  font-weight:800;
}
.hx-ic.c1 {
  background:#dcecff;
  color:#1d78d6;
}
.hx-ic.c1 b {
  background:#1d78d6;
}
.hx-ic.c2 {
  background:#e9e1ff;
  color:#6d4ae0;
}
.hx-ic.c2 b {
  background:#6d4ae0;
}
.hx-ic.c3 {
  background:#d9f6e6;
  color:#14a05f;
}
.hx-ic.c3 b {
  background:#14a05f;
}
.hx-ic.c4 {
  background:#d8ecff;
  color:#2a86e0;
}
.hx-ic.c4 b {
  background:#2a86e0;
}
.hx-step h4 {
  margin:0 0 4px;
  font:800 17px/1.25 "Bricolage Grotesque","Plus Jakarta Sans",sans-serif;
  color:#0f2a5c;
}
.hx-step p {
  font-size:14.5px;
  line-height:1.45;
  color:#6d82a3;
}
.hx-arrow {
  color:#8fb4ee;
  font-size:24px;
  animation:hxNudge 1.6s ease-in-out infinite;
}
@keyframes hxSpin {
  to {
    transform:rotate(360deg);
  }
}
@keyframes hxRev {
  to {
    transform:rotate(-360deg);
  }
}
/* energy: college -> student circles */
.hx-beams {
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  overflow:visible;
  pointer-events:none;
}
.hx-flow {
  animation:hxFlow 1s linear infinite;
}
.hx-emit {
  position:absolute;
  inset:17%;
  border-radius:50%;
  border:3px solid rgba(25,167,230,.55);
  box-shadow:0 0 28px rgba(25,167,230,.35),inset 0 0 28px rgba(25,167,230,.2);
  pointer-events:none;
  animation:hxEmit 3.9s ease-out infinite;
}
.hx-emit.e2 {
  animation-delay:1.3s;
}
.hx-emit.e3 {
  animation-delay:2.6s;
}
.hx-av {
  animation:hxRecv 2.6s ease-out infinite;
  animation-delay:calc(var(--k,0) * .65s);
}
@keyframes hxFlow {
  to {
    stroke-dashoffset:-3.8;
  }
}
@keyframes hxEmit {
  0% {
    opacity:.75;
    scale:1;
  }
  100% {
    opacity:0;
    scale:1.52;
  }
}
@keyframes hxRecv {
  0%,72%,100% {
    box-shadow:0 14px 30px rgba(21,70,150,.28);
  }
  90% {
    box-shadow:0 0 0 9px rgba(25,167,230,.4),0 0 34px 10px rgba(25,167,230,.65),0 14px 30px rgba(21,70,150,.28);
  }
}
@keyframes hxFloat {
  0%,100% {
    transform:translateY(0);
  }
  50% {
    transform:translateY(-10px);
  }
}
@keyframes hxWave {
  0%,100% {
    transform:translateY(0);
  }
  25% {
    transform:translateY(-10px);
  }
  75% {
    transform:translateY(10px);
  }
}
@keyframes hxBlink {
  0%,100% {
    opacity:1;
    transform:scale(1);
  }
  50% {
    opacity:.3;
    transform:scale(.86);
  }
}
@keyframes hxRing {
  0% {
    opacity:.6;
    transform:scale(.9);
  }
  100% {
    opacity:0;
    transform:scale(1.3);
  }
}
@keyframes hxNudge {
  0%,100% {
    transform:translateX(0);
  }
  50% {
    transform:translateX(6px);
  }
}
@keyframes hxSea {
  to {
    transform:translateX(-50%);
  }
}
@keyframes hxBtn {
  0%,100% {
    transform:scale(1);
    box-shadow:0 12px 24px rgba(21,88,214,.35),0 0 0 0 rgba(25,179,230,.55);
  }
  50% {
    transform:scale(1.04);
    box-shadow:0 14px 28px rgba(21,88,214,.4),0 0 0 12px rgba(25,179,230,0);
  }
}
@media (max-width:1000px) {
  .hx-steps {
    grid-template-columns:1fr 1fr;
    gap:28px 18px;
  }
  .hx-arrow {
    display:none;
  }
}
@media (max-width:720px) {
  .hx {
    padding-bottom:120px;
  }
  .hx-ob {
    width:90%;
    margin:10% auto 5%;
  }
  .hx-card {
    position:relative;
    right:auto;
    top:auto;
    translate:none;
    width:min(350px,100%);
    margin:0 auto;
  }
  .hx-chip {
    position:relative;
    left:auto;
    bottom:auto;
    width:max-content;
    max-width:94%;
    margin:0 auto 22px;
  }
  .hx-int {
    font-size:12px;
    padding:4px 9px;
  }
  .hx-av {
    border-width:3px;
  }
}
@media (max-width:560px) {
  .hx-btn {
    width:100%;
  }
  .hx-steps {
    grid-template-columns:1fr;
  }
  .hx-ic {
    width:70px;
    height:70px;
    padding:17px;
  }
  .hx-tr>span {
    width:46px;
    height:46px;
    padding:12px;
  }
}
/* ---------- responsive ---------- */
@media (max-width:2000px) {
  .cs-header nav>button {
    padding:10px 10px;
    font-size:15px;
  }
  .cs-navcta {
    margin-left:6px;
  }
  .cs-navcta .cs-ghost,.cs-navcta .cs-solid {
    min-height:46px;
    padding:0 18px;
    font-size:15px;
  }
  .cs-brand small {
    display:none;
  }
}
@media (min-width:1900px) and (max-width:2000px) {
  .cs-header nav>button {
    padding:11px 13px;
    font-size:16px;
  }
  .cs-navcta .cs-ghost,.cs-navcta .cs-solid {
    min-height:48px;
    padding:0 22px;
    font-size:16px;
  }
  .cs-brand small {
    display:block;
  }
}
@media (max-width:1660px) {
  .cs-burger {
    display:grid;
  }
  .cs-header nav {
    position:absolute;
    top:calc(100% + 12px);
    left:0;
    right:0;
    display:none;
    flex-direction:column;
    align-items:stretch;
    gap:4px;
    padding:16px;
    border-radius:36px;
    background:rgba(255,255,255,.97);
    backdrop-filter:blur(18px);
    box-shadow:0 30px 60px rgba(21,60,140,.28);
    animation:pop .25s both;
  }
  .cs-header nav.open {
    display:flex;
  }
  .cs-header nav>button {
    text-align:left;
    padding:14px 20px;
  }
  .cs-header nav>button.cs-fancy {
    justify-content:flex-start;
    margin-inline:0;
  }
  .cs-navcta {
    flex-direction:column;
    align-items:stretch;
    margin:8px 0 0;
  }
  .cs-navcta .cs-ghost,.cs-navcta .cs-solid {
    width:100%;
  }
}
@media (max-width:1000px) {
  .cs-hero {
    padding-bottom:90px;
  }
  .cs-hero-in {
    grid-template-columns:1fr;
  }
  .cs-stage {
    margin-top:30px;
  }
  .cs-lead-wrap {
    right:2%;
  }
  .cs-toast {
    left:0;
  }
  .cs-stats-in {
    grid-template-columns:repeat(2,1fr);
    row-gap:50px;
  }
  .cs-bento {
    grid-template-columns:repeat(2,1fr);
  }
  .bn1,.bn2,.bn3,.bn4 {
    grid-column:span 2;
  }
  .bn2,.bn3 {
    grid-column:span 1;
  }
  .cs-plans,.sp-plans {
    grid-template-columns:1fr;
    max-width:560px;
    margin-inline:auto;
  }
  .cs-plan.gold {
    margin:0;
  }
  .cs-price {
    grid-template-columns:1fr;
  }
  .cs-est {
    grid-template-columns:repeat(2,1fr);
  }
  .cs-grid3 {
    grid-template-columns:repeat(2,1fr);
  }
  .cs-about {
    grid-template-columns:1fr;
  }
  .cs-contact {
    grid-template-columns:1fr;
    border-radius:48px 48px 48px 14px;
  }
  .cs-flow {
    border-radius:48px;
    flex-wrap:wrap;
    justify-content:center;
  }
  .cs-flow i {
    display:none;
  }
}
@media (max-width:760px) {
  .cs {
    font-size:17px;
  }
  .cs-tl-line {
    left:34px;
  }
  .cs-tl-dot {
    left:34px;
  }
  .cs-step {
    grid-template-columns:70px 1fr;
    gap:8px;
  }
  .cs-num {
    grid-column:1;
    width:62px;
    height:62px;
    box-shadow:0 0 0 8px rgba(21,88,214,.12);
  }
  .cs-step.l .cs-step-card,.cs-step.r .cs-step-card {
    grid-column:2;
    border-radius:30px 30px 30px 8px;
    padding:22px 22px 24px;
  }
  .cs-rv.left,.cs-rv.right {
    translate:0 40px;
  }
  .cs-leadrow {
    border-radius:34px;
    padding:14px;
  }
  .cs-leadrow .mob {
    margin-left:0;
  }
  .cs-privacy {
    flex-direction:column;
    align-items:flex-start;
    padding:28px 26px;
    border-radius:40px 40px 40px 10px;
  }
  .cs-form {
    grid-template-columns:1fr;
  }
  .sp-summary {
    border-radius:40px;
    padding:24px;
    justify-content:center;
    text-align:center;
  }
}
@media (max-width:640px) {
  .cs-brand small {
    display:none;
  }
  .cs-brand strong {
    font-size:19px;
  }
  .cs-logo {
    width:44px;
    height:44px;
    font-size:17px;
  }
  .cs-pill {
    height:68px;
  }
  .cs-grid3,.cs-bento {
    grid-template-columns:1fr;
  }
  .bn1,.bn2,.bn3,.bn4 {
    grid-column:auto;
  }
  .cs-est {
    grid-template-columns:1fr 1fr;
    gap:14px;
  }
  .cs-stats-in {
    gap:34px 10px;
  }
  .cs-orb {
    width:54px;
    height:54px;
  }
  .cs-orb i {
    font-size:26px;
  }
  .cs-lead-wrap {
    width:min(300px,86%);
    right:0;
    bottom:-8%;
  }
  .cs-toast {
    top:0;
    left:0;
    padding:9px 16px 9px 10px;
  }
  .cs-row .cs-solid.big,.cs-row .cs-ghost.big {
    width:100%;
  }
  .cs-banner {
    border-radius:50px 50px 50px 16px;
  }
  .cs-top {
    right:14px;
    bottom:14px;
    width:52px;
    height:52px;
  }
  .lg-card {
    border-radius:42px 42px 42px 12px;
  }
  .lg-teaser {
    gap:8px;
  }
  .lg-teaser span {
    font-size:18px;
  }
}
@media (prefers-reduced-motion:reduce) {
  .cs *,.cs *::before,.cs *::after {
    animation-duration:.001s!important;
    animation-iteration-count:1!important;
    transition-duration:.001s!important;
  }
  .cs-w {
    opacity:1;
  }
  .cs-rv {
    opacity:1;
    translate:0 0;
    scale:1;
  }
  .cs-ln,.cs-wd>span {
    opacity:1!important;
    transform:none!important;
    filter:none!important;
  }
}

/* ---------- CAMPUSCONNECT HOME: PREMIUM VISUAL REFRESH ---------- */
.hx {
  position:relative;
  isolation:isolate;
  overflow:hidden;
  background:
    radial-gradient(ellipse at 8% 10%,rgba(71,145,255,.16),transparent 34%),
    radial-gradient(ellipse at 88% 18%,rgba(164,119,255,.13),transparent 32%),
    radial-gradient(ellipse at 72% 78%,rgba(47,203,232,.12),transparent 30%);
}
.hx::before,
.hx::after {
  content:"";
  position:absolute;
  pointer-events:none;
  border-radius:50%;
  z-index:-1;
  filter:blur(1px);
}
.hx::before {
  width:340px;
  height:340px;
  top:6%;
  left:-210px;
  background:radial-gradient(circle,rgba(66,143,255,.16),rgba(66,143,255,0) 72%);
  animation:hxAmbientDrift 13s ease-in-out infinite alternate;
}
.hx::after {
  width:420px;
  height:420px;
  right:-240px;
  bottom:2%;
  background:radial-gradient(circle,rgba(68,213,238,.17),rgba(68,213,238,0) 72%);
  animation:hxAmbientDrift 16s ease-in-out infinite alternate-reverse;
}
@keyframes hxAmbientDrift {
  from { transform:translate3d(0,-12px,0) scale(.96); }
  to { transform:translate3d(28px,18px,0) scale(1.08); }
}
.hx-wrap {
  width:min(100%,1680px);
  margin-inline:auto;
  padding-inline:clamp(24px,3.2vw,54px);
}
.hx-in {
  display:grid;
  grid-template-columns:minmax(0,.96fr) minmax(0,1.04fr);
  align-items:center;
  gap:clamp(32px,3.5vw,58px);
}
.hx-copy {
  min-width:0;
  animation:hxContentIn .8s cubic-bezier(.2,.75,.2,1) both;
}
@keyframes hxContentIn {
  from { opacity:0; transform:translateY(18px); }
  to { opacity:1; transform:translateY(0); }
}
.hx h1 {
  font-size:clamp(42px,3.5vw,66px);
  line-height:1.055;
  letter-spacing:-.052em;
  text-wrap:balance;
}
.hx-ln { white-space:normal; }
.hx .cs-lede {
  max-width:620px;
  font-size:clamp(16px,1.05vw,18px);
  line-height:1.75;
}
.hx .cs-row {
  gap:12px;
  flex-wrap:wrap;
}
.hx-btn {
  min-height:52px;
  border-radius:999px;
  transition:transform .25s ease,box-shadow .25s ease,background .25s ease;
}
.hx-btn:hover {
  transform:translateY(-3px);
  box-shadow:0 13px 30px rgba(24,88,210,.2);
}
.hx-trust {
  gap:12px;
}
.hx-trust > * {
  transition:transform .25s ease;
}
.hx-trust > *:hover { transform:translateY(-3px); }
.hx-stage {
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(245px,.62fr);
  grid-template-rows:minmax(0,1fr) auto;
  align-items:center;
  justify-items:stretch;
  gap:14px 18px;
  width:100%;
  max-width:900px;
  min-width:0;
  margin:0 auto;
  padding:12px 0;
  animation:hxContentIn .9s .1s cubic-bezier(.2,.75,.2,1) both;
}
.hx-ob {
  grid-column:1;
  grid-row:1;
  width:100%;
  max-width:470px;
  margin:0 auto;
  min-width:0;
  filter:drop-shadow(0 18px 28px rgba(45,126,222,.1));
}
.hx-card {
  position:relative;
  grid-column:2;
  grid-row:1 / span 2;
  right:auto;
  top:auto;
  translate:none;
  align-self:center;
  width:100%;
  max-width:300px;
  min-width:0;
  margin:0 auto;
  z-index:6;
  animation:hxCardFloat 5s ease-in-out infinite;
}
@keyframes hxCardFloat {
  0%,100% { transform:translateY(0); }
  50% { transform:translateY(-7px); }
}
.hx .cs-lead {
  width:100%;
  min-width:0;
  padding:18px;
  overflow-wrap:anywhere;
  border:1px solid rgba(255,255,255,.9);
  box-shadow:0 22px 55px rgba(31,82,156,.17),0 0 0 7px rgba(255,255,255,.22);
  backdrop-filter:blur(16px);
}
.hx .cs-lead-top,
.hx .cs-lead-top > div,
.hx .cs-lead-top b {
  min-width:0;
  overflow-wrap:anywhere;
}
.hx-chip {
  position:relative;
  grid-column:1;
  grid-row:2;
  left:auto;
  bottom:auto;
  justify-self:center;
  width:max-content;
  max-width:100%;
  margin:0;
  z-index:7;
  animation:hxChipBob 4s ease-in-out infinite;
}
@keyframes hxChipBob {
  0%,100% { transform:translateY(0); }
  50% { transform:translateY(-5px); }
}
.hx-works {
  width:100%;
  margin:clamp(38px,4.5vw,62px) auto 0;
  border:1px solid rgba(255,255,255,.92);
  box-shadow:0 22px 58px rgba(38,88,158,.1);
  animation:hxContentIn .8s .2s both;
}
.hx-steps { min-width:0; }
.hx-step {
  min-width:0;
  transition:transform .28s ease,filter .28s ease;
}
.hx-step:hover {
  transform:translateY(-5px);
  filter:drop-shadow(0 8px 12px rgba(37,105,210,.12));
}
.hx-step > div { min-width:0; }
.hx-step h4,
.hx-step p { overflow-wrap:anywhere; }
@media (min-width:1500px) {
  .hx-in {
    grid-template-columns:minmax(0,.94fr) minmax(0,1.06fr);
    gap:clamp(42px,4vw,68px);
  }
  .hx-stage {
    grid-template-columns:minmax(0,1fr) minmax(265px,.62fr);
    gap:18px 22px;
  }
  .hx-ob { max-width:500px; }
  .hx-card { max-width:320px; }
}
@media (max-width:1179px) {
  .hx-in {
    grid-template-columns:minmax(0,1fr) minmax(0,1fr);
    gap:28px;
  }
  .hx h1 { font-size:clamp(38px,4vw,52px); }
  .hx-stage {
    grid-template-columns:minmax(0,1fr);
    grid-template-rows:auto auto auto;
    gap:14px;
    max-width:620px;
  }
  .hx-ob {
    grid-column:1;
    grid-row:1;
    width:min(100%,440px);
  }
  .hx-chip { grid-column:1; grid-row:2; }
  .hx-card {
    grid-column:1;
    grid-row:3;
    width:min(100%,340px);
    max-width:340px;
  }
}
@media (max-width:900px) {
  .hx-in {
    grid-template-columns:minmax(0,1fr);
    gap:30px;
  }
  .hx-copy { max-width:760px; }
  .hx-stage {
    width:min(100%,720px);
    margin-inline:auto;
    grid-template-columns:minmax(0,1fr) minmax(230px,.72fr);
    grid-template-rows:auto auto;
    gap:14px;
  }
  .hx-ob {
    grid-column:1;
    grid-row:1;
    width:100%;
    max-width:430px;
  }
  .hx-chip { grid-column:1; grid-row:2; }
  .hx-card {
    grid-column:2;
    grid-row:1 / span 2;
    width:100%;
    max-width:300px;
  }
}
@media (max-width:620px) {
  .hx { padding-bottom:84px; }
  .cs-wrap.hx-wrap { padding:30px 18px 22px; }
  .hx h1 { font-size:clamp(35px,8.5vw,48px); }
  .hx-ln { white-space:normal; }
  .hx .cs-lede { font-size:16px; line-height:1.65; }
  .hx-stage {
    grid-template-columns:minmax(0,1fr);
    grid-template-rows:auto auto auto;
    gap:14px;
    padding:8px 0;
  }
  .hx-ob {
    grid-column:1;
    grid-row:1;
    width:min(88%,370px);
    margin-inline:auto;
  }
  .hx-chip { grid-column:1; grid-row:2; justify-self:center; }
  .hx-card {
    grid-column:1;
    grid-row:3;
    width:min(100%,340px);
    max-width:340px;
  }
  .hx-btn { min-height:52px; padding-inline:20px; }
  .hx-trust { flex-wrap:wrap; gap:16px 0; }
}
@media (prefers-reduced-motion:reduce) {
  .hx::before,.hx::after,.hx-copy,.hx-stage,.hx-card,.hx-chip,.hx-works {
    animation:none!important;
  }
  .hx-btn,.hx-trust > *, .hx-step { transition:none!important; }
}

`;

export default CollegeSite;