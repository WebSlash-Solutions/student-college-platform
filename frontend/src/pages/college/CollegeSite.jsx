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

   COLLEGE SEARCH: the "Explore colleges" section on this page is the <CollegeExplorer embedded /> component
   exported from CollegeProfile.jsx (search box, district dropdown, category tabs, college cards, Learn more / Edit profile).
   The full page is still available at /college/profile (and /college/profile?district=Salem).

   NAV ORDER: Home · Downloads · Dream Campus (= Explore colleges) · Subscription (4th) · How It Works · Pricing · Benefits · About · Contact
   SUBSCRIPTION (4th menu item): logged in -> opens the prices page. Not logged in -> a "Please login" popup is shown and NO price is rendered.

   NOTE: the login check here only controls what the screen shows. Real protection must be on the backend:
   plans/prices API and payment API must require the college's JWT, and payment success must be verified by the backend. */

const SESSION_KEY = "campusconnect_college_session"; // same key used by Registeration.jsx
const AFTER_LOGIN_KEY = "campusconnect_after_login"; // login page can read this and redirect back (value: "/college/home?view=plans")

/* menu: [section id, label, kind]
   kind "fancy" = animated highlight item (Explore colleges section, id "districts")
   kind "plans" = Subscription: opens the login-only prices page (or the "Please login" popup) instead of scrolling */
const MENU = [
  ["home", "Home"],
  ["downloads", "Downloads"],
  ["districts", "Dream Campus", "fancy"],
  ["plans", "Subscription", "plans"],
  ["how", "How It Works"],
  ["pricing", "Pricing"],
  ["benefits", "Benefits"],
  ["about", "About"],
  ["contact", "Contact"],
];
const SPY_IDS = MENU.map(([id]) => id);

/* Counter numbers — SAMPLE values, change to your real numbers or load from API.  [value, suffix, label, ring %, hue] */
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

/* SAMPLE prices (monthly base, ₹) and discounts — change to your real pricing. Shown ONLY after login. */
const MONTHLY = { elite: 999, gold: 1999, diamond: 3999 };
// [id, label, months, discount %]
const PERIODS = [
  ["1m", "1 Month", 1, 0],
  ["6m", "6 Months", 6, 10],
  ["12m", "1 Year", 12, 20],
];
const rupee = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const RIBBON_A = ["Search by district", "₹100 per lead", "Verified colleges", "Consent-based leads", "Secure payments", `${TOTAL_DISTRICTS} districts`];
const RIBBON_B = ["Coimbatore", "Chennai", "Erode", "Salem", "Tiruppur", "Madurai", "Trichy", "Vellore", "Tirunelveli"];

const SPARKS = [
  [6, 14], [14, 62], [22, 30], [31, 80], [41, 12], [52, 70], [60, 22], [68, 88], [76, 40], [84, 10], [90, 66], [95, 30], [47, 46], [10, 90],
];

/* ---------- logo (replaces the "CC" text) ---------- */
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

/* animated campus illustration: sun, clouds, birds, swaying trees, waving flag */
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
        <span className="cs-av">K</span>
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

/* ---------- LEAD DOWNLOADS (counter page between Home and Colleges) ----------
   "Download" = a college pays Rs.100 to UNLOCK one student's full details (name, mobile, email) and save them.
   (Student_Lead.docx -> sections 13, 14, 15.)  Numbers below are SAMPLE values from the spec's admin dashboard:
   12,450 transactions x Rs.100 = Rs.12,45,000. Replace with your API values.  The demo rows use fake data only. */
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
        <span className="cs-eyebrow cs-rv">LEAD DOWNLOADS</span>
        <h2 className="cs-h2 cs-rv">Every download is a <span className="cs-grad">student ready to talk</span></h2>
        <p className="cs-sub cs-rv">
          A <b>download</b> means a college unlocks one student's full contact details for <b>₹{DL_BASE.price}</b> and saves
          them. Here is the live counter, how it works, and a sample you can try.
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

/* ---------- "Please login" popup (shown instead of subscription prices when the college is not logged in) ----------
   No real price is ever rendered here — only blurred placeholders. */
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

  // one handler for the menu and the footer links
  const onNav = (id, kind) => (kind === "plans" ? goPlans() : scrollTo(id));

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
    // reveal on scroll (robust: threshold 0, picks up elements added later, shows anything already scrolled past,
    // and a safety sweep so no section can stay invisible)
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

    // progress bar + header + timeline line
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1)) * 100;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      setScrolled(h.scrollTop > 400);
      const tl = lineRef.current;
      if (tl) {
        const r = tl.getBoundingClientRect();
        const p = Math.min(Math.max((window.innerHeight * 0.62 - r.top) / r.height, 0), 1);
        tl.style.setProperty("--p", p.toFixed(3));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // soft light that follows the mouse
    const onMove = (e) => {
      if (glowRef.current) glowRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      clearInterval(sweepTimer);
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
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
            {MENU.map(([id, label, kind]) => (
              <button
                key={id}
                className={`${navActive === id ? "on" : ""} ${kind === "fancy" ? "cs-fancy" : ""} ${kind === "plans" ? "cs-subnav" : ""}`.trim()}
                onClick={() => onNav(id, kind)}
              >
                {kind === "fancy" && <span className="cs-fi" aria-hidden="true">🎓</span>}
                <span className="cs-nl">{label}</span>
                {kind === "fancy" && <em className="cs-new">NEW</em>}
                {kind === "plans" && <span className={`cs-key ${loggedIn ? "ok" : "lk"}`} aria-hidden="true">{loggedIn ? "💎" : "🔒"}</span>}
              </button>
            ))}
            <span className="cs-navcta">
              <button className="cs-ghost" onClick={goLogin}>College Login</button>
              <button className="cs-solid" onClick={goRegister}>Register College</button>
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
            <button className="cs-ghost sp-back" onClick={() => scrollTo("home")}>← Back to Home</button>

            <div className="sp-head cs-rv">
              <span className="cs-tag"><i className="cs-dot" /> REGISTERED COLLEGES ONLY</span>
              <h1>Pick a plan and a duration</h1>
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
          <section id="home" className="cs-hero" ref={heroRef} onMouseMove={onHeroMove}>
            <span className="cs-blob b1" /><span className="cs-blob b2" /><span className="cs-blob b3" />
            {SPARKS.map(([x, y], i) => (
              <span key={i} className="cs-spark" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 7) * 0.45}s` }}>✦</span>
            ))}

            <div className="cs-wrap cs-hero-in">
              <div className="cs-hero-copy">
                <span className="cs-tag cs-pop"><i className="cs-dot" /> ADMISSION SEASON · FOR COLLEGES</span>
                <h1>
                  {headWords.map((w, i) => (
                    <React.Fragment key={w + i}>
                      <span className="cs-w" style={{ "--w": i }}>{w}</span>{" "}
                    </React.Fragment>
                  ))}
                  <span className="cs-w cs-grad" style={{ "--w": headWords.length }}>college like yours</span>
                </h1>
                <p className="cs-lede">
                  CampusConnect connects colleges with prospective students after 12th standard.
                  Browse interested students, unlock their contact details for just <b>₹100 per lead</b> and
                  start your admission conversation.
                </p>
                <div className="cs-row">
                  <button className="cs-solid big" onClick={loggedIn ? goDashboard : goRegister}>
                    {loggedIn ? "Open Dashboard" : "Register Your College"} <i className="cs-arr">→</i>
                  </button>
                  <button className="cs-ghost big" onClick={() => scrollTo("districts")}>
                    <span className="cs-mag">🔍</span> Search Colleges
                  </button>
                </div>
                <div className="cs-trust">
                  <span><b>₹100</b> per lead</span>
                  <span><b>{TOTAL_DISTRICTS}</b> districts</span>
                  <span><b>100%</b> consent-based</span>
                </div>
              </div>

              <div className="cs-stage">
                <span className="cs-ring" />
                <span className="cs-ring r2" />
                <div className="cs-orbit">
                  <span className="cs-orb o1"><i>🎓</i></span>
                  <span className="cs-orb o2"><i>📚</i></span>
                  <span className="cs-orb o3"><i>🏫</i></span>
                </div>
                <div className="cs-blobframe">
                  <Campus />
                </div>
                <div className="cs-lead-wrap">
                  <LeadCard onUnlock={() => scrollTo("pricing")} />
                </div>
                <div className="cs-toast">
                  <span>🔔</span>
                  <div><b>New lead</b><small>STU10235 · B.E ECE · Salem</small></div>
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

          {/* ================= LEAD DOWNLOADS COUNTER (after Home, before Colleges) ================= */}
          <DownloadsSection onRegister={goRegister} onBrowse={() => scrollTo("districts")} />

          {/* ================= EXPLORE COLLEGES (same page as /college/profile) ================= */}
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
              <h2 className="cs-h2 cs-rv">Why colleges use <span className="cs-grad">CampusConnect</span></h2>
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

          {/* ================= HOW IT WORKS ================= */}
          <section id="how" className="cs-how">
            <span className="cs-blob b4" />
            <div className="cs-wrap cs-sec">
              <span className="cs-eyebrow cs-rv">HOW IT WORKS</span>
              <h2 className="cs-h2 cs-rv">From registration to student contact in <span className="cs-grad">six steps</span></h2>

              <div className="cs-tl" ref={lineRef}>
                <span className="cs-tl-line"><i /></span>
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

          {/* ================= PLANS (prices only after login) ================= */}
          <section id="plans" className="cs-light">
            <div className="cs-wrap cs-sec">
              <span className="cs-eyebrow cs-rv">SUBSCRIPTION</span>
              <h2 className="cs-h2 cs-rv">Choose a plan that <span className="cs-grad">fits your college</span></h2>
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

          {/* ================= PRICING (per lead) ================= */}
          <section id="pricing" className="cs-pricing">
            <Wave fill="#f5f8ff" />
            <Wave fill="#f5f8ff" pos="bottom" />
            <span className="cs-blob b6" /><span className="cs-blob b7" />
            <div className="cs-wrap cs-sec">
              <span className="cs-eyebrow dark cs-rv">PRICING</span>
              <h2 className="cs-h2 light cs-rv">One simple price for every <span className="cs-grad">student lead</span></h2>
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
              <span className="cs-eyebrow cs-rv">BENEFITS</span>
              <h2 className="cs-h2 cs-rv">Why colleges choose <span className="cs-grad">CampusConnect</span></h2>
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
                <span className="cs-eyebrow">ABOUT US</span>
                <h2 className="cs-h2 left">Connecting <span className="cs-grad">students and colleges</span></h2>
                <p>Students who finish 12th create a profile, search colleges and courses, and show interest. Colleges that register on our platform see those interested students and can pay ₹100 to access the complete contact details of the students they want to reach.</p>
                <p>We protect student privacy: contact details are hidden until purchase, and students agree to share their profile for admission purposes only.</p>
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
              <span className="cs-eyebrow cs-rv">CONTACT</span>
              <h2 className="cs-h2 cs-rv">We'd love to <span className="cs-grad">hear from you</span></h2>
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
                {MENU.map(([id, l, kind]) => <button key={id} onClick={() => onNav(id, kind)}>{l}</button>)}
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

@property --ang { syntax: "<angle>"; inherits: false; initial-value: 0deg; }

html{scroll-behavior:smooth}
body{display:block!important;background:#f5f8ff!important;color-scheme:light;margin:0!important}
#root{width:100%!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;text-align:left!important;display:block!important;min-height:0!important}

.cs{--pad:clamp(20px,5vw,84px);--nav:76px;--ink:#0b1b3a;--blue:#1558d6;--sky:#19b3e6;--violet:#8b5cf6;--sun:#ffc83d;--coral:#ff7a59;--muted:#52698a;
  min-height:100vh;color:var(--ink);font-family:"Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",sans-serif;font-size:18px;line-height:1.55;text-align:left;overflow-x:hidden;position:relative}
.cs *{box-sizing:border-box}
:where(.cs) h1,:where(.cs) h2,:where(.cs) h3,:where(.cs) p{margin:0;letter-spacing:normal;font-family:inherit;text-align:inherit}
:where(.cs) h1,:where(.cs) h2,:where(.cs) h3{font-family:"Bricolage Grotesque","Plus Jakarta Sans",sans-serif}
:where(.cs) button{font:inherit;cursor:pointer}
.cs button:focus-visible,.cs a:focus-visible,.cs input:focus-visible,.cs select:focus-visible,.cs textarea:focus-visible{outline:3px solid rgba(21,88,214,.5);outline-offset:3px}
.cs-wrap{width:100%;max-width:1680px;margin:0 auto;padding-inline:var(--pad)}
.cs-sec{padding-block:clamp(70px,9vw,130px);position:relative}
.cs-center{display:flex;justify-content:center}

/* progress bar + mouse glow */
.cs-bar{position:fixed;top:0;left:0;height:5px;width:0;z-index:400;border-radius:0 5px 5px 0;background:linear-gradient(90deg,#1458d8,#19b3e6,#8b5cf6,#ffc83d)}
.cs-glow{position:fixed;top:0;left:0;width:460px;height:460px;margin:-230px 0 0 -230px;border-radius:50%;background:radial-gradient(circle,rgba(60,130,255,.17),transparent 65%);pointer-events:none;z-index:2;mix-blend-mode:multiply;transition:transform .14s linear}
@media (hover:none){.cs-glow{display:none}}

/* ---------- floating pill nav ---------- */
.cs-header{position:fixed;top:14px;left:0;right:0;z-index:300;padding-inline:clamp(10px,2vw,28px);pointer-events:none}
.cs-pill{pointer-events:auto;position:relative;display:flex;align-items:center;justify-content:space-between;gap:16px;max-width:1680px;margin:0 auto;height:var(--nav);padding:0 14px 0 12px;border-radius:999px;background:rgba(255,255,255,.76);backdrop-filter:blur(18px) saturate(1.6);-webkit-backdrop-filter:blur(18px) saturate(1.6);border:1px solid rgba(255,255,255,.95);box-shadow:0 12px 40px rgba(21,60,140,.14);transition:background .35s,box-shadow .35s}
.cs-header.sc .cs-pill{background:rgba(255,255,255,.93);box-shadow:0 18px 50px rgba(21,60,140,.24)}
.cs-brand{display:flex;align-items:center;gap:12px;border:0;background:none;padding:0;text-align:left;color:inherit}
.cs-logo svg{width:66%;height:66%;display:block}
.cs-logo{display:grid;place-items:center;width:52px;height:52px;border-radius:50% 50% 50% 16%;background:linear-gradient(135deg,#1458d8,#19b3e6);color:#fff;font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:20px;box-shadow:0 10px 22px rgba(21,88,214,.35);animation:morph 9s ease-in-out infinite}
.cs-brand strong{display:block;color:#0f2a5c;font-family:"Bricolage Grotesque",sans-serif;font-size:22px;font-weight:800;letter-spacing:-.3px;line-height:1.1}
.cs-brand small{display:block;margin-top:2px;color:#6d86a6;font-size:12.5px;font-weight:700;white-space:nowrap}
.cs-header nav{display:flex;align-items:center;gap:2px}
.cs-header nav>button{position:relative;border:0;background:none;padding:11px 15px;border-radius:999px;color:#47608a;font-size:16.5px;font-weight:700;white-space:nowrap;transition:background .25s,color .25s,transform .25s}
.cs-header nav>button:hover{background:#eaf2ff;color:var(--blue);transform:translateY(-2px)}
.cs-header nav>button.on{background:linear-gradient(100deg,#e3eeff,#dff4ff);color:var(--blue)}
.cs-navcta{display:flex;align-items:center;gap:8px;margin-left:10px}
.cs-burger{display:none;place-items:center;width:50px;height:50px;border:0;background:#eaf2ff;color:var(--blue);border-radius:50%;font-size:22px}

/* buttons: all pill shaped */
.cs-solid,.cs-ghost,.cs-white,.cs-outline{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:50px;padding:0 26px;border-radius:999px;font-size:16.5px;font-weight:800;border:0;white-space:nowrap;transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,background-position .5s}
.cs-solid{color:#fff;background:linear-gradient(100deg,#1349c2,#1766e6,#19b3e6,#1349c2);background-size:300% 100%;box-shadow:0 12px 26px rgba(22,103,224,.32)}
.cs-solid::after,.cs-white::after{content:"";position:absolute;top:0;left:-80%;width:45%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);animation:shine 3.6s infinite}
.cs-solid:hover{transform:translateY(-4px) scale(1.03);background-position:100% 0;box-shadow:0 18px 34px rgba(22,103,224,.42)}
.cs-ghost{color:#1c5eb9;background:#fff;border:2px solid #cfe1fb}
.cs-ghost:hover{background:#eef5ff;border-color:var(--blue);transform:translateY(-3px)}
.cs-white{background:#fff;color:#1349c2;box-shadow:0 14px 30px rgba(0,0,0,.18)}
.cs-white:hover{transform:translateY(-4px) scale(1.04)}
.cs-outline{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.75)}
.cs-outline:hover{background:rgba(255,255,255,.18);transform:translateY(-3px)}
.cs-solid.big,.cs-ghost.big{min-height:60px;padding:0 34px;font-size:18px}
.cs-arr{font-style:normal;display:inline-block;transition:transform .25s}
.cs-solid:hover .cs-arr{transform:translateX(7px)}
.cs-mag{display:inline-block;animation:wiggle 4s ease-in-out infinite}

/* ---------- headings ---------- */
.cs-eyebrow{display:table;margin:0 auto 18px;padding:9px 20px;border-radius:999px;background:#e1ecff;color:var(--blue);font-size:13.5px;font-weight:800;letter-spacing:2.2px}
.cs-eyebrow.dark{background:rgba(255,255,255,.13);color:#a9dcff}
.cs-h2{margin-bottom:18px!important;font-size:clamp(34px,4.6vw,66px);line-height:1.06;font-weight:800;letter-spacing:-1.4px;text-align:center!important;color:var(--ink)}
.cs-h2.left{text-align:left!important}
.cs-h2.light{color:#fff}
.cs-sub{max-width:640px;margin:0 auto 54px;text-align:center!important;font-size:20px;color:var(--muted)}
.cs-grad{display:inline-block;background:linear-gradient(90deg,#1458d8,#19b3e6,#8b5cf6,#ff7a59,#1458d8);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:grad 7s linear infinite}
.cs-tag{display:inline-flex;align-items:center;gap:10px;padding:10px 20px;border-radius:999px;background:rgba(255,255,255,.85);border:1px solid #d4e4fb;color:var(--blue);font-size:13.5px;font-weight:800;letter-spacing:1.6px;box-shadow:0 8px 22px rgba(21,88,214,.12)}
.cs-dot{display:inline-block;width:10px;height:10px;border-radius:50%;background:#10b981;animation:ping 1.8s infinite}

/* reveal on scroll (uses translate/scale so it never fights the 3D tilt transform) */
.cs-rv{opacity:0;translate:0 46px;transition:opacity .85s ease var(--d,0s),translate .85s cubic-bezier(.2,.8,.2,1) var(--d,0s),scale .85s cubic-bezier(.2,.8,.2,1) var(--d,0s),transform .25s ease-out,box-shadow .3s}
.cs-rv.left{translate:-70px 0}.cs-rv.right{translate:70px 0}.cs-rv.zoom{translate:0 30px;scale:.86}
.cs-rv.in{opacity:1;translate:0 0;scale:1}

/* 3D tilt + moving light */
.cs-tilt{--spot:rgba(21,88,214,.11);position:relative;transform:perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transform-style:preserve-3d;will-change:transform}
.cs-tilt::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:3;background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),var(--spot),transparent 55%)}
.cs-tilt:hover::before{opacity:1}

/* ---------- blobs / sparks / waves ---------- */
.cs-blob{position:absolute;opacity:.5;pointer-events:none;filter:blur(2px);animation:morph 12s ease-in-out infinite,drift 18s ease-in-out infinite}
.cs-blob.b1{width:520px;height:520px;background:#bcd6ff;top:-180px;left:-160px}
.cs-blob.b2{width:420px;height:420px;background:#c1f1ff;bottom:-140px;right:6%;animation-delay:-4s}
.cs-blob.b3{width:240px;height:240px;background:#e3d6ff;top:16%;right:44%;animation-delay:-8s}
.cs-blob.b4{width:380px;height:380px;background:#cfe3fb;top:-100px;right:-90px}
.cs-blob.b5{width:300px;height:300px;background:#d9f3ff;bottom:-90px;left:-70px;animation-delay:-6s}
.cs-blob.b6{width:460px;height:460px;background:#2563eb;top:-120px;left:-120px;opacity:.28}
.cs-blob.b7{width:420px;height:420px;background:#19b3e6;bottom:-140px;right:-100px;opacity:.25;animation-delay:-5s}
.cs-spark{position:absolute;color:#6f9dff;font-size:18px;opacity:0;pointer-events:none;animation:twinkle 4.5s ease-in-out infinite}
.cs-wave{position:absolute;left:0;width:100%;height:clamp(44px,6vw,96px);display:block;z-index:1;pointer-events:none}
.cs-wave.top{top:-1px}
.cs-wave.bottom{bottom:-1px;transform:scaleY(-1)}

/* ---------- hero ---------- */
.cs-hero{--px:0;--py:0;position:relative;overflow:hidden;min-height:100vh;display:flex;align-items:center;padding:calc(var(--nav) + 64px) 0 110px;background:radial-gradient(900px 500px at 85% 10%,rgba(139,92,246,.14),transparent 70%),radial-gradient(800px 500px at 0% 90%,rgba(25,179,230,.16),transparent 70%),linear-gradient(160deg,#eaf3ff 0%,#f8fbff 55%,#e8f6ff 100%)}
.cs-hero::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(21,88,214,.2) 1.6px,transparent 1.6px);background-size:34px 34px;-webkit-mask-image:radial-gradient(ellipse at 70% 40%,#000,transparent 70%);mask-image:radial-gradient(ellipse at 70% 40%,#000,transparent 70%);pointer-events:none}
.cs-hero-in{position:relative;z-index:3;display:grid;grid-template-columns:1.02fr .98fr;gap:clamp(24px,4vw,70px);align-items:center}
.cs-hero h1{margin:24px 0 22px!important;font-size:clamp(42px,5.6vw,92px);line-height:1.02;font-weight:800;letter-spacing:-2.4px;color:var(--ink);text-align:left!important}
.cs-w{display:inline-block;opacity:0;animation:wordIn .9s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--w) * .09s + .25s)}
.cs-pop{animation:pop .8s cubic-bezier(.2,.8,.2,1) both}
.cs-lede{max-width:640px;margin-bottom:34px!important;font-size:clamp(18px,1.5vw,21px);line-height:1.75;color:#46608a;animation:pop 1s .9s cubic-bezier(.2,.8,.2,1) both}
.cs-lede b{color:var(--blue)}
.cs-row{display:flex;gap:16px;flex-wrap:wrap;animation:pop 1s 1.1s cubic-bezier(.2,.8,.2,1) both}.cs-row.center{justify-content:center}
.cs-trust{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px;animation:pop 1s 1.3s cubic-bezier(.2,.8,.2,1) both}
.cs-trust span{padding:10px 18px;border-radius:999px;background:rgba(255,255,255,.8);border:1px solid #d9e7fb;font-size:15.5px;font-weight:700;color:#47608a;box-shadow:0 8px 18px rgba(21,60,140,.07)}
.cs-trust b{color:var(--blue);font-family:"Bricolage Grotesque",sans-serif;font-size:18px}

.cs-stage{position:relative;display:grid;place-items:center;min-height:clamp(420px,46vw,620px);animation:pop 1.1s .5s cubic-bezier(.2,.8,.2,1) both}
.cs-blobframe{position:relative;z-index:2;width:min(540px,100%);aspect-ratio:1/.96;overflow:hidden;border:9px solid #fff;background:linear-gradient(#bfe3ff,#eaf6ff);box-shadow:0 40px 80px rgba(21,70,150,.28);border-radius:58% 42% 52% 48%/48% 56% 44% 52%;animation:morph 14s ease-in-out infinite;translate:calc(var(--px) * -14px) calc(var(--py) * -14px)}
.cs-blobframe.sm{width:min(480px,100%)}
.cs-campus{display:block;width:100%;height:100%}
.cs-ring{position:absolute;z-index:1;top:50%;left:50%;width:min(620px,112%);aspect-ratio:1;margin:calc(min(620px,112%) / -2) 0 0 calc(min(620px,112%) / -2);border-radius:50%;border:3px dashed rgba(21,88,214,.28);animation:spin 40s linear infinite}
.cs-ring.r2{width:min(720px,128%);margin:calc(min(720px,128%) / -2) 0 0 calc(min(720px,128%) / -2);border:2px solid rgba(139,92,246,.18);animation-direction:reverse;animation-duration:60s}
.cs-orbit{position:absolute;z-index:4;inset:-3%;animation:spin 32s linear infinite;pointer-events:none;translate:calc(var(--px) * 26px) calc(var(--py) * 26px)}
.cs-orb{position:absolute;display:grid;place-items:center;width:68px;height:68px;border-radius:50% 50% 50% 14%;background:#fff;box-shadow:0 18px 36px rgba(21,70,150,.25)}
.cs-orb i{font-style:normal;font-size:32px;display:block;animation:spinrev 32s linear infinite}
.cs-orb.o1{top:2%;left:46%}.cs-orb.o2{top:50%;right:-1%}.cs-orb.o3{bottom:6%;left:16%}
.cs-orb.sm{width:58px;height:58px;z-index:4;animation:bob 5s ease-in-out infinite}.cs-orb.sm i{animation:none;font-size:28px}
.cs-orb.sm.o1{top:4%;left:4%}.cs-orb.sm.o2{top:auto;bottom:10%;right:2%;animation-delay:-2s}

.cs-lead-wrap{position:absolute;z-index:6;right:-3%;bottom:-5%;width:min(330px,76%);translate:calc(var(--px) * 22px) calc(var(--py) * 22px)}
.cs-lead{padding:20px 22px 22px;border-radius:34px 34px 34px 10px;background:rgba(255,255,255,.93);backdrop-filter:blur(14px);border:1px solid #fff;box-shadow:0 30px 60px rgba(21,70,150,.28);animation:bob 5.5s ease-in-out infinite}
.cs-lead-top{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.cs-lead-top b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-size:18px;color:#0f2a5c;line-height:1.2}
.cs-lead-top small{color:#7389a8;font-size:13.5px;font-weight:600}
.cs-av{display:grid;place-items:center;flex:0 0 auto;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#19b3e6);color:#fff;font-weight:800;font-size:19px}
.cs-live{display:inline-flex;align-items:center;gap:6px;margin-left:auto;padding:5px 11px;border-radius:999px;background:#e3fbef;color:#0f8a52;font-size:12.5px;font-weight:800}
.cs-live i{width:8px;height:8px;border-radius:50%;background:#10b981;animation:ping 1.6s infinite}
.cs-lead p{display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px dashed #dde8f6;font-size:15.5px}
.cs-lead p span{color:#7389a8;font-weight:600}.cs-lead p em{font-style:normal;font-weight:800;color:#12284a}
.cs-lead em.swap{animation:swapIn .55s cubic-bezier(.2,.8,.2,1)}
.lock{background:linear-gradient(90deg,#8d9db3 30%,#d3deec 50%,#8d9db3 70%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;animation:shimmerText 2.4s linear infinite}
.cs-unlock-btn{width:100%;min-height:50px;margin-top:14px;border:0;border-radius:999px;color:#fff;font-size:16.5px;font-weight:800;background:linear-gradient(100deg,#1349c2,#19b3e6);box-shadow:0 12px 24px rgba(21,88,214,.35);transition:background .5s,transform .25s}
.cs-unlock-btn:hover{transform:translateY(-3px)}
.cs-lead.open .cs-unlock-btn{background:linear-gradient(100deg,#059669,#34d399);box-shadow:0 12px 24px rgba(5,150,105,.35)}
.cs-toast{position:absolute;z-index:7;top:4%;left:-4%;display:flex;align-items:center;gap:12px;padding:12px 22px 12px 14px;border-radius:999px;background:#fff;box-shadow:0 18px 40px rgba(21,70,150,.25);animation:toast 8s ease-in-out infinite}
.cs-toast>span{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#ffc83d,#ff7a59);font-size:20px;animation:wiggle 2s infinite}
.cs-toast b{display:block;font-size:16px;color:#0f2a5c;line-height:1.2}.cs-toast small{color:#6d86a6;font-size:13.5px;font-weight:600}

/* svg scene */
.cs-sun{transform-origin:388px 78px;animation:spin 50s linear infinite}
.cs-cloud.c1{animation:cloud 16s ease-in-out infinite alternate}.cs-cloud.c2{animation:cloud 22s ease-in-out infinite alternate-reverse}
.cs-bird.b1{animation:fly 13s linear infinite}.cs-bird.b2{animation:fly 17s linear infinite;animation-delay:-8s}
.cs-tree{transform-box:fill-box;transform-origin:50% 100%;animation:sway 4.5s ease-in-out infinite}.cs-tree.t2{animation-delay:-2s}
.cs-flag{transform-origin:240px 12px;animation:waveflag 1.4s ease-in-out infinite}
.cs-hand{transform-origin:240px 116px;animation:spin 8s linear infinite}
.cs-win{animation:winBlink 6s ease-in-out infinite}
.cs-cap{animation:bob 3.4s ease-in-out infinite}

/* ---------- tilted ribbons ---------- */
.cs-ribbons{position:relative;z-index:6;height:150px;margin-top:-86px;overflow:hidden;pointer-events:none}
.cs-ribbon{position:absolute;left:-4%;width:108%;overflow:hidden;white-space:nowrap;padding:15px 0;box-shadow:0 14px 30px rgba(13,33,80,.25)}
.cs-ribbon.a{top:22px;rotate:-1.8deg;background:linear-gradient(100deg,#0c1f55,#123a8f);color:#dbe9fb}
.cs-ribbon.b{top:66px;rotate:1.6deg;background:linear-gradient(100deg,#1558d6,#19b3e6 55%,#8b5cf6);color:#fff;z-index:2}
.cs-track{display:inline-flex;animation:marq 42s linear infinite}.cs-track.rev{animation-direction:reverse;animation-duration:50s}
.cs-track span{display:inline-flex;align-items:center;padding:0 28px;font-family:"Bricolage Grotesque",sans-serif;font-size:21px;font-weight:700}
.cs-track i{margin-left:56px;font-style:normal;color:#ffd66b}

/* ---------- district bubbles ---------- */
.cs-districts{position:relative;overflow:hidden;background:#f5f8ff;padding:clamp(50px,6vw,90px) 0 clamp(50px,6vw,90px)}
.cs-districts .cp-embedded{position:relative;z-index:1}

/* ---------- counters (dark) ---------- */
.cs-stats{position:relative;overflow:hidden;color:#fff;padding:clamp(120px,14vw,200px) 0;background:linear-gradient(155deg,#0a1744,#0d2f7a 60%,#0b4f9e)}
.cs-stats-in{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);gap:30px}
.cs-stat{text-align:center}
.cs-stat-ring{position:relative;width:clamp(150px,15vw,214px);aspect-ratio:1;margin:0 auto 20px}
.cs-stat-ring svg{width:100%;height:100%;rotate:-90deg}
.cs-stat-ring .trk{fill:none;stroke:rgba(255,255,255,.12);stroke-width:7}
.cs-stat-ring .bar{fill:none;stroke:var(--h);stroke-width:7;stroke-linecap:round;transition:stroke-dashoffset 2.2s cubic-bezier(.2,.8,.2,1);filter:drop-shadow(0 0 9px var(--h))}
.cs-stat-ring strong{position:absolute;inset:0;display:grid;place-items:center;font-family:"Bricolage Grotesque",sans-serif;font-size:clamp(30px,3.3vw,50px);font-weight:800}
.cs-stat>span{display:block;max-width:230px;margin:0 auto;font-size:18px;font-weight:600;color:#bcd2f2}

/* ---------- light sections ---------- */
.cs-light{position:relative;background:#f5f8ff;overflow:hidden}

/* bento */
.cs-bento{display:grid;grid-template-columns:repeat(6,1fr);gap:clamp(16px,2vw,30px);margin-top:56px}
.bn{display:flex;flex-direction:column;min-height:330px;padding:clamp(28px,3vw,46px);overflow:hidden;background:#fff;border:1px solid #dce8f7;box-shadow:0 22px 50px -24px rgba(21,60,140,.3)}
.bn1{grid-column:span 4;border-radius:64px 64px 64px 14px;color:#fff;background:linear-gradient(135deg,#1349c2,#1766e6 55%,#19b3e6);--spot:rgba(255,255,255,.3)}
.bn2{grid-column:span 2;border-radius:64px 64px 14px 64px}
.bn3{grid-column:span 2;border-radius:64px 14px 64px 64px}
.bn4{grid-column:span 4;border-radius:14px 64px 64px 64px;color:#fff;background:linear-gradient(135deg,#5b21b6,#7c3aed 50%,#1558d6);--spot:rgba(255,255,255,.28)}
.bn-ic{display:grid;place-items:center;width:70px;height:70px;margin-bottom:18px;font-size:34px;background:#e6f0ff;border-radius:60% 40% 55% 45%/50% 55% 45% 50%;animation:morph 8s ease-in-out infinite}
.bn1 .bn-ic,.bn4 .bn-ic{background:rgba(255,255,255,.2)}
.bn h3{margin-bottom:10px!important;font-size:clamp(23px,2.1vw,32px);line-height:1.15;font-weight:800;letter-spacing:-.4px}
.bn p{font-size:18px;line-height:1.65;color:var(--muted)}.bn1 p,.bn4 p{color:rgba(255,255,255,.88)}
.bn-feed{display:grid;gap:10px;margin-top:auto;padding-top:24px}
.bn-feed div{display:flex;align-items:center;gap:12px;padding:10px 16px 10px 10px;border-radius:999px;background:rgba(255,255,255,.17);border:1px solid rgba(255,255,255,.28);font-weight:700;font-size:16px;backdrop-filter:blur(6px)}
.bn-feed div:first-child{animation:glowPulse 2.6s ease-in-out infinite}
.bn-feed i{display:grid;place-items:center;flex:0 0 auto;width:34px;height:34px;border-radius:50%;background:#fff;color:var(--blue);font-style:normal;font-weight:800}
.bn-feed em{margin-left:auto;font-style:normal;font-size:13px;opacity:.8}
.bn-lock{display:grid;place-items:center;margin-top:auto;padding-top:20px}
.bn-lock span{display:grid;place-items:center;width:96px;height:96px;border-radius:50%;background:radial-gradient(#e6f0ff,#cfe0fb);font-size:44px;box-shadow:0 0 0 12px rgba(21,88,214,.08),0 0 0 26px rgba(21,88,214,.05);animation:lockShake 3.6s ease-in-out infinite}
.bn-bars{display:flex;align-items:flex-end;gap:12px;height:110px;margin-top:auto;padding-top:20px}
.bn-bars i{flex:1;border-radius:12px 12px 6px 6px;background:linear-gradient(#19b3e6,#1558d6);transform-origin:bottom;animation:bar 2.8s ease-in-out infinite}
.bn-bars i:nth-child(1){height:45%}.bn-bars i:nth-child(2){height:70%;animation-delay:.2s}.bn-bars i:nth-child(3){height:55%;animation-delay:.4s}.bn-bars i:nth-child(4){height:90%;animation-delay:.6s}.bn-bars i:nth-child(5){height:75%;animation-delay:.8s}
.bn-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;padding-top:24px}
.bn-chips span{padding:9px 18px;border-radius:999px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);font-weight:700;font-size:15.5px;animation:bob 5s ease-in-out infinite}
.bn-chips span:nth-child(2n){animation-delay:-1.4s}.bn-chips span:nth-child(3n){animation-delay:-2.8s}

/* ---------- how it works ---------- */
.cs-how{position:relative;overflow:hidden;margin:0 clamp(10px,2vw,28px);border-radius:clamp(36px,6vw,84px);background:linear-gradient(160deg,#e3eeff 0%,#f0f6ff 50%,#e1f4ff 100%)}
.cs-tl{--p:0;position:relative;display:grid;gap:clamp(26px,3.4vw,50px);margin-top:70px}
.cs-tl-line{position:absolute;left:50%;top:0;bottom:0;width:7px;margin-left:-3.5px;border-radius:7px;background:#cbdcf4}
.cs-tl-line i{display:block;width:100%;height:calc(var(--p) * 100%);border-radius:7px;background:linear-gradient(#1558d6,#19b3e6,#8b5cf6);box-shadow:0 0 18px rgba(21,88,214,.5)}
.cs-step{display:grid;grid-template-columns:1fr 96px 1fr;align-items:center;position:relative;z-index:2}
.cs-num{grid-column:2;grid-row:1;display:grid;place-items:center;width:76px;height:76px;margin:auto;border-radius:50% 50% 50% 14%;background:#fff;border:5px solid var(--blue);color:var(--blue);box-shadow:0 0 0 12px rgba(21,88,214,.12),0 16px 30px rgba(21,88,214,.25)}
.cs-num b{font-family:"Bricolage Grotesque",sans-serif;font-size:30px;font-weight:800}
.cs-step.in .cs-num{animation:numPop .8s .25s cubic-bezier(.2,.8,.2,1) both}
.cs-step.l .cs-step-card{grid-column:1;grid-row:1;border-radius:40px 40px 10px 40px}
.cs-step.r .cs-step-card{grid-column:3;grid-row:1;border-radius:40px 40px 40px 10px}
.cs-step-card{padding:30px 34px 32px;background:#fff;border:1px solid #d9e7f8;box-shadow:0 22px 46px -22px rgba(21,60,140,.3)}
.cs-step-ic{display:grid;place-items:center;width:64px;height:64px;margin-bottom:14px;font-size:32px;border-radius:50%;background:#e6f0ff}
.cs-step-card h3{margin-bottom:8px!important;font-size:clamp(23px,2vw,30px);font-weight:800;letter-spacing:-.3px;line-height:1.15}
.cs-step-card p{font-size:18px;line-height:1.65;color:var(--muted)}

.cs-flow{display:flex;align-items:center;gap:14px;margin-top:90px;padding:30px clamp(20px,3vw,46px);border-radius:90px;background:#fff;border:1px solid #d9e7f8;box-shadow:0 24px 50px -26px rgba(21,60,140,.3)}
.cs-flow>div{display:grid;justify-items:center;gap:3px;text-align:center}
.cs-flow b{display:grid;place-items:center;width:62px;height:62px;margin-bottom:6px;border-radius:50% 50% 50% 14%;background:linear-gradient(135deg,#1349c2,#19b3e6);color:#fff;font-family:"Bricolage Grotesque",sans-serif;font-size:26px;font-weight:800;box-shadow:0 12px 24px rgba(21,88,214,.3)}
.cs-flow span{font-weight:800;font-size:18px;color:#0f2a5c}.cs-flow small{color:#7389a8;font-size:14.5px;font-weight:600}
.cs-flow i{flex:1;min-width:24px;height:5px;border-radius:5px;background:repeating-linear-gradient(90deg,#1558d6 0 14px,transparent 14px 26px);background-size:26px 5px;animation:dash 1s linear infinite}

.cs-preview{margin-top:40px}
.cs-preview-head{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px 20px;margin-bottom:18px;padding-inline:14px}
.cs-preview-head b{font-family:"Bricolage Grotesque",sans-serif;font-size:clamp(24px,2.4vw,34px);font-weight:800}
.cs-preview-head span{color:#6d86a6;font-weight:700;font-size:15.5px}
.cs-leadrow{display:flex;align-items:center;flex-wrap:wrap;gap:12px 14px;margin-bottom:14px;padding:12px 16px 12px 12px;border-radius:999px;background:#fff;border:1px solid #d9e7f8;box-shadow:0 14px 30px -18px rgba(21,60,140,.3);transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s}
.cs-leadrow:hover{transform:translateX(12px) scale(1.01);box-shadow:0 22px 40px -18px rgba(21,60,140,.4)}
.cs-leadrow .av{display:grid;place-items:center;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#1558d6,#19b3e6);color:#fff;font-weight:800;font-size:20px}
.cs-leadrow:nth-child(2n) .av{background:linear-gradient(135deg,#8b5cf6,#ec4899)}
.cs-leadrow .id{font-size:18px;color:#0f2a5c;min-width:104px}
.cs-leadrow .chip{padding:7px 16px;border-radius:999px;background:#e6f0ff;color:#1349c2;font-weight:800;font-size:15.5px}
.cs-leadrow .chip.c2{background:#f1e9ff;color:#6d28d9}.cs-leadrow .chip.c3{background:#e0f7ef;color:#0b7a4f}
.cs-leadrow .mob{margin-left:auto;font-weight:800;font-size:18px}
.cs-unlock{min-height:46px;padding:0 24px;border:0;border-radius:999px;color:#fff;font-weight:800;font-size:16px;background:linear-gradient(100deg,#1349c2,#19b3e6);box-shadow:0 10px 20px rgba(21,88,214,.3);transition:transform .25s}
.cs-unlock:hover{transform:translateY(-3px) scale(1.04)}

.cs-privacy{display:flex;align-items:center;gap:24px;margin-top:34px;padding:30px 40px;border-radius:56px 56px 56px 14px;color:#fff;background:linear-gradient(110deg,#0c2a78,#1558d6 70%,#19b3e6)}
.cs-privacy .shield{display:grid;place-items:center;flex:0 0 auto;width:78px;height:78px;border-radius:50%;background:rgba(255,255,255,.18);font-size:36px;animation:ping2 2.4s infinite}
.cs-privacy h3{margin-bottom:6px!important;font-size:clamp(23px,2.2vw,32px);font-weight:800}
.cs-privacy p{font-size:18px;line-height:1.65;color:rgba(255,255,255,.9)}

/* ---------- plans ---------- */
.cs-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,2.4vw,36px);align-items:stretch;margin-top:64px}
.cs-plan{display:flex;flex-direction:column;padding:48px 34px 36px;text-align:center;border-radius:60px 60px 60px 14px;background:#fff;border:1px solid #dce8f7;box-shadow:0 26px 54px -26px rgba(21,60,140,.35)}
.cs-plan.elite{background:linear-gradient(#fff,#f1f5fb)}
.cs-plan.gold{margin-top:-26px;margin-bottom:26px;padding-top:62px;background:linear-gradient(#fff,#fff8e6);border-color:transparent;box-shadow:0 40px 80px -26px rgba(245,158,11,.5)}
.cs-plan.gold::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:4px;pointer-events:none;background:conic-gradient(from var(--ang),#1558d6,#19b3e6,#8b5cf6,#ffc83d,#ff7a59,#1558d6);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);animation:ang 5s linear infinite}
.cs-plan.diamond{color:#fff;background:linear-gradient(160deg,#0c1f55,#1b3f9a);--spot:rgba(255,255,255,.22)}
.cs-pop-badge{position:absolute;top:18px;left:50%;transform:translateX(-50%);padding:7px 18px;border-radius:999px;background:linear-gradient(90deg,#f59e0b,#ff7a59);color:#fff;font-size:13.5px;font-weight:800;letter-spacing:.6px;white-space:nowrap;box-shadow:0 10px 20px rgba(245,158,11,.4)}
.cs-plan-ic{font-size:60px;line-height:1;animation:bob 4s ease-in-out infinite}
.cs-plan h3{margin:12px 0 6px!important;font-size:38px;font-weight:800;letter-spacing:-.6px}
.cs-plan-tag{margin-bottom:6px!important;color:var(--muted);font-size:18px}.cs-plan.diamond .cs-plan-tag{color:#bcd2f2}
.cs-plan ul,.sp-plan ul{list-style:none;display:grid;gap:13px;margin:24px 0 30px;padding:0;text-align:left;flex:1}
.cs-plan li,.sp-plan li{display:flex;align-items:flex-start;gap:12px;font-size:17.5px;font-weight:600;line-height:1.4}
.cs-plan li i,.sp-plan li i{display:grid;place-items:center;flex:0 0 auto;width:26px;height:26px;margin-top:1px;border-radius:50%;background:#dcf7e9;color:#0f9158;font-style:normal;font-size:14px;font-weight:900}
.cs-plan.diamond li i{background:rgba(255,255,255,.18);color:#7ff0c1}
.cs-plans-note{margin-top:40px!important;text-align:center!important;color:var(--muted);font-size:18px}

/* ---------- pricing (dark) ---------- */
.cs-pricing{position:relative;overflow:hidden;color:#fff;padding:clamp(40px,5vw,70px) 0;background:linear-gradient(155deg,#0a1744,#0e3283 60%,#0b4f9e)}
.cs-pricing .cs-sec{padding-block:clamp(90px,11vw,150px)}
.cs-price{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(30px,5vw,90px);align-items:center;margin-top:56px}
.cs-coinwrap{position:relative;display:grid;place-items:center;width:100%;max-width:430px;aspect-ratio:1;margin:0 auto}
.cs-coin-ring{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from var(--ang),#ffc83d,#ff7a59,#8b5cf6,#19b3e6,#ffc83d);animation:ang 6s linear infinite;box-shadow:0 0 70px rgba(255,200,61,.35)}
.cs-coin{position:relative;display:grid;align-content:center;justify-items:center;width:88%;aspect-ratio:1;border-radius:50%;text-align:center;background:radial-gradient(circle at 30% 24%,#2358d0,#0a1a4a 70%);box-shadow:inset 0 0 50px rgba(255,255,255,.14),0 30px 60px rgba(0,0,0,.4);animation:coinTilt 7s ease-in-out infinite}
.cs-coin small{font-size:17px;font-weight:700;color:#b9d2f5;letter-spacing:.5px}
.cs-coin strong{font-family:"Bricolage Grotesque",sans-serif;font-size:clamp(70px,9vw,128px);font-weight:800;line-height:1;background:linear-gradient(180deg,#fff2b8,#ffc83d 60%,#ff9b3d);-webkit-background-clip:text;background-clip:text;color:transparent}
.cs-coin span{font-size:17px;font-weight:600;color:#b9d2f5}
.cs-mini{position:absolute;display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:linear-gradient(145deg,#ffd66b,#f59e0b);color:#7a4a00;font-weight:900;font-size:27px;box-shadow:0 14px 26px rgba(0,0,0,.3);animation:float 5s ease-in-out infinite}
.cs-mini.m1{top:2%;right:4%}.cs-mini.m2{bottom:8%;left:-2%;width:46px;height:46px;font-size:22px;animation-delay:-2s}.cs-mini.m3{bottom:-2%;right:20%;width:38px;height:38px;font-size:18px;animation-delay:-3.4s}
.cs-price-right ul{list-style:none;display:grid;gap:16px;margin:0 0 34px;padding:0}
.cs-price-right li{display:flex;align-items:center;gap:14px;font-size:clamp(18px,1.6vw,22px);font-weight:600}
.cs-price-right.in li{animation:liIn .6s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * .1s + .3s)}
.cs-price-right li i{display:grid;place-items:center;flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#34d399,#10b981);color:#fff;font-style:normal;font-size:16px;font-weight:900}
.cs-est{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:80px}
.cs-est>div{display:grid;gap:4px;padding:26px 20px;text-align:center;border-radius:44px 44px 44px 10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(8px)}
.cs-est b{font-size:19px;font-weight:700;color:#bcd2f2}.cs-est span{font-family:"Bricolage Grotesque",sans-serif;font-size:clamp(28px,3vw,42px);font-weight:800;color:#ffd66b}

/* ---------- benefits ---------- */
.cs-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(18px,2.2vw,32px);margin-top:60px}
.cs-ben{padding:40px 34px 38px;border-radius:50px 50px 50px 12px;background:#fff;border:1px solid #dce8f7;box-shadow:0 22px 46px -26px rgba(21,60,140,.3);transition:box-shadow .3s,transform .25s ease-out}
.cs-ben:nth-child(even){border-radius:50px 50px 12px 50px}
.cs-ben:hover{box-shadow:0 34px 60px -24px rgba(21,60,140,.45)}
.cs-ben-ic{display:grid;place-items:center;width:80px;height:80px;margin-bottom:20px;font-size:40px;background:#e6f0ff;border-radius:60% 40% 55% 45%/50% 55% 45% 50%;animation:morph 9s ease-in-out infinite;transition:scale .3s,rotate .3s}
.cs-ben:nth-child(6n+2) .cs-ben-ic{background:#f1e9ff}.cs-ben:nth-child(6n+3) .cs-ben-ic{background:#dff7ee}.cs-ben:nth-child(6n+4) .cs-ben-ic{background:#fff0d9}.cs-ben:nth-child(6n+5) .cs-ben-ic{background:#ffe6ec}.cs-ben:nth-child(6n) .cs-ben-ic{background:#dff4ff}
.cs-ben:hover .cs-ben-ic{scale:1.14;rotate:12deg}
.cs-ben h3{margin-bottom:10px!important;font-size:clamp(23px,2vw,29px);font-weight:800;letter-spacing:-.3px;line-height:1.15}
.cs-ben p{font-size:18px;line-height:1.65;color:var(--muted)}

/* ---------- about ---------- */
.cs-about-sec{position:relative;overflow:hidden;margin:0 clamp(10px,2vw,28px);border-radius:clamp(36px,6vw,84px);background:linear-gradient(160deg,#eaf1ff,#e0f2ff)}
.cs-about{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(30px,5vw,90px);align-items:center}
.cs-about .cs-eyebrow{margin-left:0}
.cs-about p{margin-bottom:18px!important;font-size:19.5px;line-height:1.8;color:#46608a}
.cs-pills{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
.cs-pills span{padding:11px 20px;border-radius:999px;background:#fff;border:1px solid #d4e4fb;color:#1349c2;font-weight:800;font-size:16px;box-shadow:0 10px 20px -12px rgba(21,60,140,.4)}
.cs-about-art{position:relative;display:grid;place-items:center}

/* ---------- contact ---------- */
.cs-contact{display:grid;grid-template-columns:.78fr 1.22fr;margin-top:56px;overflow:hidden;border-radius:72px 72px 72px 16px;background:#fff;border:1px solid #dbe7f6;box-shadow:0 34px 80px -30px rgba(21,60,140,.4)}
.cs-contact-side{position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:12px;padding:clamp(34px,4vw,60px);color:#fff;background:linear-gradient(150deg,#0f3fb5,#1766e6 60%,#19b3e6)}
.cs-contact-side>*{position:relative;z-index:2}
.cs-env{display:grid;place-items:center;width:92px;height:92px;border-radius:50% 50% 50% 14%;background:rgba(255,255,255,.2);font-size:44px;animation:bob 4s ease-in-out infinite}
.cs-contact-side h3{font-size:clamp(32px,3vw,46px);font-weight:800}
.cs-contact-side p{font-size:19px;line-height:1.7;color:rgba(255,255,255,.9)}
.cs-c-blob{position:absolute!important;border-radius:50%;background:rgba(255,255,255,.14);animation:morph 10s ease-in-out infinite,drift 14s ease-in-out infinite}
.cs-c-blob.a{width:260px;height:260px;right:-90px;bottom:-80px}.cs-c-blob.b{width:140px;height:140px;left:-40px;top:-40px;animation-delay:-5s}.cs-c-blob.c{width:200px;height:200px;left:40%;bottom:-120px;animation-delay:-3s}
.cs-form{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:clamp(28px,4vw,56px)}
.cs-form label{display:grid;gap:8px;font-size:15.5px;font-weight:800;color:#23406e}
.cs-form .full{grid-column:1/-1}
.cs-form input,.cs-form select,.cs-form textarea{width:100%;min-height:58px;padding:0 22px;border:2px solid #d7e5f7;border-radius:22px;background:#f7faff;font:inherit;font-size:17.5px;font-weight:600;color:var(--ink);outline:none;transition:border-color .25s,box-shadow .25s,background .25s}
.cs-form textarea{padding:16px 22px;border-radius:26px;resize:vertical}
.cs-form input:focus,.cs-form select:focus,.cs-form textarea:focus{border-color:var(--blue);background:#fff;box-shadow:0 0 0 5px rgba(21,88,214,.14)}
.cs-ok{padding:14px 22px;border-radius:999px;background:#dcf7e9;color:#0b7a4f;font-weight:800;animation:pop .4s both}

/* ---------- CTA + footer ---------- */
.cs-ctawrap{padding-block:clamp(50px,7vw,100px)}
.cs-banner{position:relative;overflow:hidden;padding:clamp(54px,7vw,100px) 30px;border-radius:90px 90px 90px 24px;text-align:center;color:#fff;background:linear-gradient(120deg,#1349c2,#1766e6 40%,#19b3e6 75%,#8b5cf6 100%);background-size:200% 200%;animation:gradMove 10s ease-in-out infinite;box-shadow:0 40px 80px -30px rgba(21,88,214,.6)}
.cs-banner>*{position:relative;z-index:2}
.cs-banner h2{margin-bottom:14px!important;font-size:clamp(32px,4.6vw,66px);line-height:1.06;font-weight:800;letter-spacing:-1.2px;text-align:center!important}
.cs-banner p{max-width:640px;margin:0 auto 34px!important;font-size:clamp(18px,1.6vw,22px);color:rgba(255,255,255,.92);text-align:center!important}
.cs-footer{position:relative;overflow:hidden;padding-top:clamp(50px,6vw,80px);border-radius:clamp(36px,6vw,84px) clamp(36px,6vw,84px) 0 0;background:#081538;color:#bdd0ee}
.cs-footer-in{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:30px}
.cs-fbrand strong{display:block;margin-bottom:8px;font-family:"Bricolage Grotesque",sans-serif;font-size:30px;font-weight:800;color:#fff}
.cs-fbrand p{max-width:420px;font-size:17px;line-height:1.7}
.cs-flinks{display:flex;flex-wrap:wrap;gap:6px 8px;max-width:640px}
.cs-flinks button{border:0;background:rgba(255,255,255,.07);padding:10px 18px;border-radius:999px;color:#d4e3fa;font-size:16px;font-weight:700;transition:background .25s,transform .25s}
.cs-flinks button:hover{background:rgba(255,255,255,.2);transform:translateY(-3px)}
.cs-wordmark{margin-top:40px;font-family:"Bricolage Grotesque",sans-serif;font-size:clamp(54px,14.5vw,250px);font-weight:800;line-height:.88;letter-spacing:-.04em;text-align:center;white-space:nowrap;user-select:none;background:linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,0) 85%);-webkit-background-clip:text;background-clip:text;color:transparent}
.cs-top{position:fixed;right:24px;bottom:24px;z-index:250;display:grid;place-items:center;width:58px;height:58px;border:0;border-radius:50% 50% 50% 14%;color:#fff;font-size:26px;font-weight:800;background:linear-gradient(135deg,#1349c2,#19b3e6);box-shadow:0 14px 30px rgba(21,88,214,.45);opacity:0;translate:0 90px;transition:opacity .35s,translate .45s cubic-bezier(.2,.8,.2,1),scale .25s}
.cs-top.show{opacity:1;translate:0 0}.cs-top:hover{scale:1.12}

/* ---------- subscription pricing view (login only) ---------- */
.sp-main{position:relative;overflow:hidden;min-height:100vh;padding:calc(var(--nav) + 64px) 0 90px;background:radial-gradient(900px 500px at 90% 0%,rgba(139,92,246,.14),transparent 70%),linear-gradient(160deg,#eaf3ff,#f8fbff 55%,#e8f6ff)}
.sp-in{position:relative;z-index:2}
.sp-back{margin-bottom:26px}
.sp-head{text-align:center}
.sp-head h1{margin:20px 0 12px!important;font-size:clamp(36px,5vw,70px);line-height:1.05;font-weight:800;letter-spacing:-1.6px;text-align:center!important}
.sp-head p{color:var(--muted);font-size:20px;text-align:center!important}
.sp-toggle{position:relative;display:grid;grid-template-columns:repeat(3,1fr);width:min(100%,600px);margin:34px auto 52px;padding:7px;border-radius:999px;background:#fff;border:1px solid #d7e5f7;box-shadow:0 18px 40px -22px rgba(21,60,140,.4)}
.sp-pill{position:absolute;top:7px;bottom:7px;left:7px;width:calc((100% - 14px) / 3);border-radius:999px;background:linear-gradient(100deg,#1349c2,#19b3e6);box-shadow:0 10px 22px rgba(21,88,214,.35);transform:translateX(calc(var(--i) * 100%));transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.sp-toggle button{position:relative;z-index:1;display:grid;justify-items:center;border:0;background:none;padding:12px 8px;border-radius:999px;color:#35506c;font-size:17px;font-weight:800;transition:color .3s}
.sp-toggle button em{font-style:normal;font-size:12.5px;font-weight:800;color:#16a34a}
.sp-toggle button.on{color:#fff}.sp-toggle button.on em{color:#d9f6ff}
.sp-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,2.4vw,34px);align-items:stretch}
.sp-plan{position:relative;display:flex;flex-direction:column;padding:42px 32px 34px;text-align:center;cursor:pointer;border-radius:56px 56px 56px 14px;background:#fff;border:2px solid #dce8f7;box-shadow:0 24px 50px -28px rgba(21,60,140,.35);animation:planIn .7s cubic-bezier(.2,.8,.2,1) both;transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s,border-color .35s}
.sp-plan:hover{transform:translateY(-8px)}
.sp-plan.sel{border-color:var(--blue);box-shadow:0 0 0 7px rgba(21,88,214,.14),0 36px 70px -26px rgba(21,60,140,.5);transform:translateY(-12px)}
.sp-ribbon{position:absolute;top:-15px;left:50%;transform:translateX(-50%);padding:7px 18px;border-radius:999px;background:linear-gradient(90deg,#f59e0b,#ff7a59);color:#fff;font-size:13.5px;font-weight:800;white-space:nowrap}
.sp-ic{font-size:56px;line-height:1;animation:bob 4s ease-in-out infinite}
.sp-plan h3{margin:10px 0 4px!important;font-size:36px;font-weight:800}
.sp-tg{color:var(--muted);font-size:17.5px}
.sp-price{display:flex;align-items:baseline;justify-content:center;gap:8px;margin-top:18px}
.sp-price strong{font-family:"Bricolage Grotesque",sans-serif;font-size:clamp(40px,3.6vw,54px);font-weight:800;color:var(--ink)}
.sp-price span{color:var(--muted);font-weight:700}
.sp-per{margin-top:4px!important;color:var(--muted);font-weight:700;font-size:16.5px}
.sp-per s{margin-left:10px;color:#9aaec8}
.sp-summary{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;margin-top:52px;padding:22px 26px 22px 40px;border-radius:999px;background:#fff;border:1px solid #d7e5f7;box-shadow:0 26px 56px -28px rgba(21,60,140,.45);animation:pop .45s cubic-bezier(.2,.8,.2,1) both}
.sp-summary small{display:block;color:#7389a8;font-weight:700;font-size:14.5px}.sp-summary b{font-size:21px;color:#0f2a5c}
.sp-total{font-family:"Bricolage Grotesque",sans-serif;font-size:clamp(34px,3.6vw,50px);font-weight:800;color:var(--blue)}
.sp-note{margin-top:26px!important;text-align:center!important;color:var(--muted);font-weight:600}

/* ---------- lead downloads counter ---------- */
.dl{position:relative;overflow:hidden;background:linear-gradient(180deg,#fff 0%,#eef5ff 100%)}
.dl .cs-sec{padding-block:clamp(60px,7vw,100px)}
.dl .cs-sub{margin-bottom:44px}
.dl-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(20px,2.4vw,34px);align-items:stretch;margin-bottom:34px}
.dl-total{position:relative;overflow:hidden;padding:clamp(28px,3vw,46px);border-radius:52px 52px 52px 14px;color:#fff;background:linear-gradient(135deg,#1349c2 0%,#1766e6 55%,#19b3e6 100%);box-shadow:0 36px 70px -30px rgba(21,60,140,.7)}
.dl-total::before,.dl-total::after{content:"";position:absolute;border-radius:50%;background:rgba(255,255,255,.12);pointer-events:none}
.dl-total::before{width:300px;height:300px;right:-90px;top:-110px;animation:drift 14s ease-in-out infinite}
.dl-total::after{width:200px;height:200px;left:-60px;bottom:-90px;animation:drift 11s ease-in-out infinite reverse}
.dl-total>*{position:relative;z-index:1}
.dl-total small{display:block;font-size:13.5px;font-weight:800;letter-spacing:2.2px;opacity:.88}
.dl-big{margin:14px 0 6px;font-family:"Bricolage Grotesque",sans-serif;font-size:clamp(56px,7.4vw,112px);font-weight:800;line-height:1;letter-spacing:-2px;animation:dlPulse .6s cubic-bezier(.2,.8,.2,1)}
.dl-sub{font-size:19px;opacity:.92}
.dl-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:28px}
.dl-mini div{padding:14px 16px;border-radius:22px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(6px)}
.dl-mini b{display:block;font-family:"Bricolage Grotesque",sans-serif;font-size:clamp(20px,2.1vw,30px);font-weight:800;line-height:1.15}
.dl-mini span{font-size:13.5px;font-weight:600;opacity:.92}
.dl-flow{padding:clamp(26px,2.6vw,40px);border-radius:52px 52px 14px 52px;background:#fff;border:1px solid #d7e5f7;box-shadow:0 26px 56px -30px rgba(21,60,140,.4)}
.dl-flow h3{margin-bottom:18px!important;font-size:clamp(24px,2.4vw,32px);font-weight:800;color:var(--ink)}
.dl-flow ol{list-style:none;margin:0;padding:0;display:grid;gap:14px}
.dl-flow li{display:flex;align-items:center;gap:16px;padding:12px 16px;border-radius:24px;background:#f5f9ff;border:1px solid #e1ecfb;transition:transform .25s,background .25s}
.dl-flow li:hover{transform:translateX(6px);background:#eaf3ff}
.dl-ic{flex:0 0 auto;width:52px;height:52px;display:grid;place-items:center;border-radius:50%;background:#fff;box-shadow:0 8px 18px -8px rgba(21,88,214,.5);font-size:26px}
.dl-flow li b{display:block;font-size:17.5px;color:var(--ink)}
.dl-flow li small{display:block;color:var(--muted);font-size:15px;line-height:1.4}
.dl-demo{padding:clamp(22px,2.4vw,36px);border-radius:48px;background:#fff;border:1px solid #d7e5f7;box-shadow:0 30px 60px -32px rgba(21,60,140,.45)}
.dl-demo-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;margin-bottom:22px}
.dl-demo-head h3{font-size:clamp(22px,2.2vw,30px);font-weight:800;color:var(--ink)}
.dl-demo-head small{display:block;color:var(--muted);font-size:15px;max-width:520px}
.dl-session{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;font-weight:700;color:#35506c}
.dl-session b{font-family:"Bricolage Grotesque",sans-serif;font-size:24px;color:var(--blue)}
.dl-session .cs-ghost{min-height:46px;padding:0 20px;font-size:15.5px}
.dl-session .cs-ghost:disabled,.dl-reset:disabled{opacity:.45;cursor:not-allowed}
.dl-reset{border:0;background:none;color:#5a6f8a;font-weight:800;text-decoration:underline}
.dl-rows{display:grid;gap:12px}
.dl-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;padding:14px 18px;border-radius:30px;background:#f5f9ff;border:1.5px solid #e1ecfb;animation:dlRowIn .6s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:var(--i,0ms);transition:background .35s,border-color .35s,box-shadow .35s}
.dl-row:hover{box-shadow:0 14px 30px -18px rgba(21,60,140,.5)}
.dl-row.open{background:#effbf4;border-color:#a7e5c3}
.dl-av{width:46px;height:46px;flex:0 0 auto;display:grid;place-items:center;border-radius:50%;background:linear-gradient(135deg,#1349c2,#19b3e6);color:#fff;font-weight:800;font-size:19px}
.dl-row.open .dl-av{background:linear-gradient(135deg,#059669,#34d399)}
.dl-c{flex:1 1 90px;min-width:0}
.dl-c.wide{flex:1.4 1 150px}
.dl-c small{display:block;color:#7389a8;font-size:12.5px;font-weight:700}
.dl-c b{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:16.5px;color:var(--ink)}
.dl-c b.lock{color:#8aa0bd;letter-spacing:.5px}
.dl-c b.swap{animation:swapIn .5s both;color:#047857}
.dl-btn{flex:0 0 auto;min-width:168px;min-height:48px;padding:0 20px;border:0;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:800;font-size:15.5px;color:#fff;background:linear-gradient(100deg,#1349c2,#1766e6,#19b3e6);box-shadow:0 10px 22px -8px rgba(22,103,224,.6);transition:transform .2s,box-shadow .2s,filter .2s}
.dl-btn:hover:not(:disabled){transform:translateY(-2px);filter:brightness(1.07)}
.dl-btn:disabled{cursor:default}
.dl-btn.paying{background:#6b8bc0;box-shadow:none}
.dl-btn.done{background:#059669;box-shadow:0 10px 22px -10px rgba(5,150,105,.7)}
.dl-spin{width:16px;height:16px;border-radius:50%;border:3px solid rgba(255,255,255,.4);border-top-color:#fff;animation:spin .7s linear infinite}
.dl-cta{display:flex;flex-wrap:wrap;justify-content:center;gap:16px;margin-top:40px}
@keyframes dlPulse{from{transform:scale(.9);opacity:.4}to{transform:none;opacity:1}}
@keyframes dlRowIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@media (max-width:1000px){
  .dl-grid{grid-template-columns:1fr}
  .dl-mini{grid-template-columns:1fr 1fr 1fr}
}
@media (max-width:640px){
  .dl-mini{grid-template-columns:1fr}
  .dl-total,.dl-flow,.dl-demo{border-radius:36px}
  .dl-btn{width:100%}
}

/* ---------- nav: Dream Campus (explore colleges) + Subscription ---------- */
.cs-header nav>button.cs-fancy,.cs-header nav>button.cs-subnav{display:inline-flex;align-items:center;gap:6px}
.cs-header nav>button.cs-fancy{isolation:isolate;margin-inline:2px;color:#fff;background:linear-gradient(100deg,#1349c2,#8b5cf6,#19b3e6,#1349c2);background-size:300% 100%;animation:grad 6s linear infinite;box-shadow:0 8px 20px rgba(21,88,214,.3)}
.cs-header nav>button.cs-fancy::before{content:"";position:absolute;inset:-4px;z-index:-1;border-radius:999px;background:conic-gradient(from var(--ang),#19b3e6,#8b5cf6,#ffc83d,#ff7a59,#19b3e6);filter:blur(7px);opacity:.55;animation:ang 4s linear infinite;transition:opacity .3s}
.cs-header nav>button.cs-fancy:hover,.cs-header nav>button.cs-fancy.on{color:#fff;background:linear-gradient(100deg,#1349c2,#8b5cf6,#19b3e6,#1349c2);background-size:300% 100%;transform:translateY(-3px) scale(1.05)}
.cs-header nav>button.cs-fancy:hover::before,.cs-header nav>button.cs-fancy.on::before{opacity:.95}
.cs-fi{display:inline-block;font-size:18px;line-height:1;animation:capToss 3.6s ease-in-out infinite}
.cs-new{position:absolute;top:-7px;right:-6px;font-style:normal;padding:2px 7px;border-radius:999px;background:linear-gradient(90deg,#ffc83d,#ff7a59);color:#5a2200;font-size:10.5px;font-weight:800;letter-spacing:.8px;animation:newPing 2s infinite}
.cs-key{display:inline-block;font-size:14px;line-height:1}
.cs-key.lk{animation:lockShake 3.6s ease-in-out infinite}
.cs-key.ok{animation:bob 3s ease-in-out infinite}
.cs-header nav>button.cs-subnav:hover .cs-key{animation:keyPop .5s cubic-bezier(.2,.8,.2,1)}

/* ---------- "Please login" popup ---------- */
.lg-back{position:fixed;inset:0;z-index:500;display:grid;place-items:center;padding:20px;background:rgba(8,21,56,.58);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);animation:lgFade .3s both}
.lg-card{position:relative;overflow:hidden;width:min(560px,100%);padding:46px clamp(22px,4vw,48px) 38px;text-align:center;border-radius:58px 58px 58px 14px;background:linear-gradient(#fff,#f4f8ff);box-shadow:0 50px 100px -30px rgba(8,21,56,.75);animation:lgPop .65s cubic-bezier(.2,1.15,.3,1) both}
.lg-card::before{content:"";position:absolute;top:0;left:0;right:0;height:7px;background:linear-gradient(90deg,#1458d8,#19b3e6,#8b5cf6,#ffc83d,#1458d8);background-size:300% 100%;animation:grad 5s linear infinite}
.lg-card>*{position:relative;z-index:2}
.lg-blob{position:absolute!important;z-index:1!important;border-radius:50%;background:#dbe9ff;opacity:.7;animation:morph 10s ease-in-out infinite,drift 14s ease-in-out infinite;pointer-events:none}
.lg-blob.a{width:200px;height:200px;right:-70px;top:-60px}.lg-blob.b{width:150px;height:150px;left:-50px;bottom:-50px;background:#d6f2ff;animation-delay:-5s}
.lg-x{position:absolute!important;top:18px;right:18px;display:grid;place-items:center;width:42px;height:42px;border:0;border-radius:50%;background:#eaf2ff;color:var(--blue);font-size:17px;font-weight:800;transition:transform .3s,background .25s}
.lg-x:hover{background:#dbe9ff;transform:rotate(90deg) scale(1.1)}
.lg-lock{position:relative;display:grid;place-items:center;width:112px;height:112px;margin:0 auto 18px}
.lg-ring{position:absolute;inset:0;border-radius:50%;border:3px solid rgba(21,88,214,.45);animation:lgRing 2.6s ease-out infinite}
.lg-ring.r2{animation-delay:1.3s}
.lg-ico{position:relative;display:grid;place-items:center;width:88px;height:88px;border-radius:50% 50% 50% 16%;background:linear-gradient(135deg,#1349c2,#19b3e6);font-size:42px;box-shadow:0 18px 34px rgba(21,88,214,.4);animation:lockShake 3.2s ease-in-out infinite,morph 9s ease-in-out infinite}
.lg-eye{margin-bottom:14px!important}
.lg-card h3{margin-bottom:10px!important;font-size:clamp(28px,3.4vw,38px);font-weight:800;line-height:1.1;letter-spacing:-.6px;color:var(--ink)}
.lg-p{max-width:420px;margin:0 auto!important;font-size:17.5px;line-height:1.65;color:var(--muted);text-align:center!important}
.lg-teaser{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:24px 0 26px}
.lg-teaser div{display:grid;gap:2px;padding:12px 8px;border-radius:24px 24px 24px 8px;background:#fff;border:1px solid #d9e7f8;box-shadow:0 12px 24px -16px rgba(21,60,140,.4);animation:planIn .6s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * .1s + .3s)}
.lg-teaser b{font-size:15px;color:#0f2a5c}
.lg-teaser span{font-family:"Bricolage Grotesque",sans-serif;font-size:22px;font-weight:800}
.lg-actions{display:grid;gap:12px}
.lg-actions .cs-solid,.lg-actions .cs-ghost{width:100%}

/* ---------- keyframes ---------- */
@keyframes morph{0%,100%{border-radius:58% 42% 52% 48%/48% 56% 44% 52%}33%{border-radius:42% 58% 40% 60%/56% 42% 58% 44%}66%{border-radius:52% 48% 60% 40%/42% 60% 40% 58%}}
@keyframes drift{0%,100%{translate:0 0}50%{translate:40px 30px}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes spinrev{to{transform:rotate(-360deg)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-20px) rotate(1.5deg)}}
@keyframes twinkle{0%,100%{opacity:0;transform:scale(.5) rotate(0)}50%{opacity:.9;transform:scale(1.2) rotate(90deg)}}
@keyframes wordIn{from{opacity:0;transform:translateY(46px) rotate(5deg);filter:blur(6px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes pop{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:none}}
@keyframes ping{0%{box-shadow:0 0 0 0 rgba(16,185,129,.65)}80%,100%{box-shadow:0 0 0 12px rgba(16,185,129,0)}}
@keyframes ping2{0%{box-shadow:0 0 0 0 rgba(255,255,255,.45)}80%,100%{box-shadow:0 0 0 22px rgba(255,255,255,0)}}
@keyframes marq{to{transform:translateX(-33.3333%)}}
@keyframes grad{to{background-position:300% 0}}
@keyframes gradMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes shine{0%,60%{left:-80%}100%{left:140%}}
@keyframes wiggle{0%,86%,100%{transform:rotate(0)}90%{transform:rotate(-14deg)}95%{transform:rotate(12deg)}}
@keyframes toast{0%,6%{opacity:0;transform:translateX(-40px) scale(.85)}12%,64%{opacity:1;transform:none}72%,100%{opacity:0;transform:translateX(-30px) scale(.9)}}
@keyframes swapIn{from{opacity:0;transform:translateY(10px) scale(.9)}to{opacity:1;transform:none}}
@keyframes shimmerText{to{background-position:-220% 0}}
@keyframes ang{to{--ang:360deg}}
@keyframes coinTilt{0%,100%{transform:perspective(900px) rotateY(-14deg) rotateX(4deg)}50%{transform:perspective(900px) rotateY(14deg) rotateX(-4deg)}}
@keyframes dash{to{background-position-x:26px}}
@keyframes bar{0%,100%{transform:scaleY(.55)}50%{transform:scaleY(1)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.5)}60%{box-shadow:0 0 0 14px rgba(255,255,255,0)}}
@keyframes lockShake{0%,80%,100%{transform:rotate(0)}84%{transform:rotate(-12deg)}88%{transform:rotate(10deg)}92%{transform:rotate(-6deg)}}
@keyframes numPop{0%{transform:scale(0) rotate(-120deg)}70%{transform:scale(1.18) rotate(8deg)}100%{transform:scale(1) rotate(0)}}
@keyframes liIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
@keyframes planIn{from{opacity:0;transform:translateY(46px) scale(.94)}to{opacity:1;transform:none}}
@keyframes cloud{from{transform:translateX(-20px)}to{transform:translateX(70px)}}
@keyframes fly{0%{transform:translate(-60px,130px)}100%{transform:translate(540px,50px)}}
@keyframes sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}
@keyframes waveflag{0%,100%{transform:skewY(-6deg) scaleX(1)}50%{transform:skewY(6deg) scaleX(.84)}}
@keyframes capToss{0%,60%,100%{transform:translateY(0) rotate(0)}70%{transform:translateY(-7px) rotate(-18deg)}80%{transform:translateY(-3px) rotate(14deg)}90%{transform:translateY(0) rotate(-4deg)}}
@keyframes newPing{0%{box-shadow:0 0 0 0 rgba(255,200,61,.8)}80%,100%{box-shadow:0 0 0 9px rgba(255,200,61,0)}}
@keyframes keyPop{0%{transform:scale(1)}40%{transform:scale(1.5) rotate(-14deg)}100%{transform:scale(1)}}
@keyframes lgFade{from{opacity:0}to{opacity:1}}
@keyframes lgPop{0%{opacity:0;transform:translateY(60px) scale(.82) rotate(-2deg)}100%{opacity:1;transform:none}}
@keyframes lgRing{0%{transform:scale(.7);opacity:.9}100%{transform:scale(1.55);opacity:0}}
@keyframes winBlink{0%,70%,100%{fill:#bfd9fb}80%,90%{fill:#ffe9a8}}

/* ---------- responsive ---------- */
@media (max-width:2000px){
  .cs-header nav>button{padding:10px 10px;font-size:15px}
  .cs-navcta{margin-left:6px}
  .cs-navcta .cs-ghost,.cs-navcta .cs-solid{min-height:46px;padding:0 18px;font-size:15px}
  .cs-brand small{display:none}
}
@media (max-width:1660px){
  .cs-burger{display:grid}
  .cs-header nav{position:absolute;top:calc(100% + 12px);left:0;right:0;display:none;flex-direction:column;align-items:stretch;gap:4px;padding:16px;border-radius:36px;background:rgba(255,255,255,.97);backdrop-filter:blur(18px);box-shadow:0 30px 60px rgba(21,60,140,.28);animation:pop .25s both}
  .cs-header nav.open{display:flex}
  .cs-header nav>button{text-align:left;padding:14px 20px}
  .cs-header nav>button.cs-fancy,.cs-header nav>button.cs-subnav{justify-content:flex-start;margin-inline:0}
  .cs-navcta{flex-direction:column;align-items:stretch;margin:8px 0 0}
  .cs-navcta .cs-ghost,.cs-navcta .cs-solid{width:100%}
}
@media (max-width:1000px){
  .cs-hero{padding-bottom:90px}
  .cs-hero-in{grid-template-columns:1fr}
  .cs-stage{margin-top:30px}
  .cs-lead-wrap{right:2%}.cs-toast{left:0}
  .cs-stats-in{grid-template-columns:repeat(2,1fr);row-gap:50px}
  .cs-bento{grid-template-columns:repeat(2,1fr)}.bn1,.bn2,.bn3,.bn4{grid-column:span 2}.bn2,.bn3{grid-column:span 1}
  .cs-plans,.sp-plans{grid-template-columns:1fr;max-width:560px;margin-inline:auto}
  .cs-plan.gold{margin:0}
  .cs-price{grid-template-columns:1fr}
  .cs-est{grid-template-columns:repeat(2,1fr)}
  .cs-grid3{grid-template-columns:repeat(2,1fr)}
  .cs-about{grid-template-columns:1fr}
  .cs-contact{grid-template-columns:1fr;border-radius:48px 48px 48px 14px}
  .cs-flow{border-radius:48px;flex-wrap:wrap;justify-content:center}.cs-flow i{display:none}
}
@media (max-width:760px){
  .cs{font-size:17px}
  .cs-tl-line{left:34px}
  .cs-step{grid-template-columns:70px 1fr;gap:8px}
  .cs-num{grid-column:1;width:62px;height:62px;box-shadow:0 0 0 8px rgba(21,88,214,.12)}
  .cs-step.l .cs-step-card,.cs-step.r .cs-step-card{grid-column:2;border-radius:30px 30px 30px 8px;padding:22px 22px 24px}
  .cs-rv.left,.cs-rv.right{translate:0 40px}
  .cs-leadrow{border-radius:34px;padding:14px}
  .cs-leadrow .mob{margin-left:0}
  .cs-privacy{flex-direction:column;align-items:flex-start;padding:28px 26px;border-radius:40px 40px 40px 10px}
  .cs-form{grid-template-columns:1fr}
  .sp-summary{border-radius:40px;padding:24px;justify-content:center;text-align:center}
}
@media (max-width:640px){
  .cs-brand small{display:none}
  .cs-brand strong{font-size:19px}
  .cs-logo{width:44px;height:44px;font-size:17px}
  .cs-pill{height:68px}
  .cs-grid3,.cs-bento{grid-template-columns:1fr}.bn1,.bn2,.bn3,.bn4{grid-column:auto}
  .cs-est{grid-template-columns:1fr 1fr;gap:14px}
  .cs-stats-in{gap:34px 10px}
  .cs-orb{width:54px;height:54px}.cs-orb i{font-size:26px}
  .cs-lead-wrap{width:min(300px,86%);right:0;bottom:-8%}
  .cs-toast{top:0;left:0;padding:9px 16px 9px 10px}
  .cs-row .cs-solid.big,.cs-row .cs-ghost.big{width:100%}
  .cs-banner{border-radius:50px 50px 50px 16px}
  .cs-top{right:14px;bottom:14px;width:52px;height:52px}
  .lg-card{border-radius:42px 42px 42px 12px}
  .lg-teaser{gap:8px}.lg-teaser span{font-size:18px}
}
@media (prefers-reduced-motion:reduce){
  .cs *,.cs *::before,.cs *::after{animation-duration:.001s!important;animation-iteration-count:1!important;transition-duration:.001s!important}
  .cs-w{opacity:1}
  .cs-rv{opacity:1;translate:0 0;scale:1}
}
`;

export default CollegeSite;
