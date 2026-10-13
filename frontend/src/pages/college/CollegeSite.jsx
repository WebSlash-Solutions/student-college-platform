import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* COLLEGE SIDE — ONE FILE (route: /college/home)

   Contains BOTH pages:
   1. Public college website (no login): banner, district search, counters, how it works, plans, pricing, benefits, about, contact
   2. Subscription pricing view (LOGIN ONLY): Elite / Gold / Diamond with 1 Month, 6 Months, 1 Year
      -> opens inside this same page when a logged-in college clicks "View Plans & Prices".
      -> not logged in: the prices are never rendered and the college is sent to the login page.

   CONNECT YOUR REAL COLLEGES (college profile data):
     import CollegeSite from "./CollegeSite";
     import { COLLEGES } from "./your-college-data-file";      // <- the list your College Profile page uses
     <Route path="/college/home" element={<CollegeSite colleges={COLLEGES} />} />
   If you don't pass `colleges`, SAMPLE_COLLEGES below are shown.
   Clicking a college card opens  /college/profile?college=<id>

   NOTE: the login check here only controls what the screen shows. Real protection must be on the backend:
   plans/prices API and payment API must require the college's JWT, and payment success must be verified by the backend. */

const SESSION_KEY = "campusconnect_college_session"; // same key used by Registeration.jsx
const AFTER_LOGIN_KEY = "campusconnect_after_login"; // login page can read this and redirect back (value: "/college/home?view=plans")
const ROTATE_MS = 5000; // search bar changes district every 5 seconds

const MENU = [
  ["home", "Home"],
  ["search", "Colleges"],
  ["how", "How It Works"],
  ["plans", "Plans"],
  ["pricing", "Pricing"],
  ["benefits", "Benefits"],
  ["about", "About"],
  ["contact", "Contact"],
];

const DISTRICTS = ["Coimbatore", "Chennai", "Erode", "Salem", "Tiruppur"];

/* SAMPLE DATA — replaced by the `colleges` prop when you pass your real list */
const SAMPLE_COLLEGES = [
  { id: "chn-1", name: "IIT Madras", district: "Chennai", type: "Engineering", courses: ["B.Tech", "M.Tech", "Research"] },
  { id: "chn-2", name: "Anna University – CEG Campus", district: "Chennai", type: "Engineering", courses: ["B.E", "M.E", "MBA"] },
  { id: "chn-3", name: "Loyola College", district: "Chennai", type: "Arts & Science", courses: ["B.Sc", "B.Com", "BBA"] },
  { id: "chn-4", name: "Madras Christian College", district: "Chennai", type: "Arts & Science", courses: ["B.A", "B.Sc", "B.Com"] },
  { id: "cbe-1", name: "PSG College of Technology", district: "Coimbatore", type: "Engineering", courses: ["B.E", "B.Tech", "M.E"] },
  { id: "cbe-2", name: "Coimbatore Institute of Technology", district: "Coimbatore", type: "Engineering", courses: ["B.E", "B.Tech", "MBA"] },
  { id: "cbe-3", name: "Kumaraguru College of Technology", district: "Coimbatore", type: "Engineering", courses: ["B.E", "B.Tech", "M.E"] },
  { id: "cbe-4", name: "PSG College of Arts & Science", district: "Coimbatore", type: "Arts & Science", courses: ["B.Sc", "B.Com", "BCA"] },
  { id: "erd-1", name: "Kongu Engineering College", district: "Erode", type: "Engineering", courses: ["B.E", "B.Tech", "MBA"] },
  { id: "erd-2", name: "Bannari Amman Institute of Technology", district: "Erode", type: "Engineering", courses: ["B.E", "B.Tech", "M.E"] },
  { id: "erd-3", name: "Erode Sengunthar Engineering College", district: "Erode", type: "Engineering", courses: ["B.E", "B.Tech"] },
  { id: "slm-1", name: "Government College of Engineering, Salem", district: "Salem", type: "Engineering", courses: ["B.E", "M.E"] },
  { id: "slm-2", name: "Sona College of Technology", district: "Salem", type: "Engineering", courses: ["B.E", "B.Tech", "MBA"] },
  { id: "slm-3", name: "Government Arts College, Salem", district: "Salem", type: "Arts & Science", courses: ["B.A", "B.Sc", "B.Com"] },
  { id: "tpr-1", name: "Chikkanna Government Arts College", district: "Tiruppur", type: "Arts & Science", courses: ["B.A", "B.Sc", "B.Com"] },
  { id: "tpr-2", name: "Tiruppur Kumaran College for Women", district: "Tiruppur", type: "Arts & Science", courses: ["B.Sc", "B.Com", "BCA"] },
  { id: "tpr-3", name: "Angel College of Engineering & Technology", district: "Tiruppur", type: "Engineering", courses: ["B.E", "B.Tech"] },
];

/* make any college object shape usable */
const normalize = (c, i) => ({
  id: c.id ?? c.collegeId ?? c._id ?? `college-${i}`,
  name: c.name ?? c.collegeName ?? c.college_name ?? "College",
  district: String(c.district ?? c.city ?? c.location ?? ""),
  type: c.type ?? c.collegeType ?? c.category ?? "",
  logo: c.logo ?? c.logoUrl ?? c.image ?? "",
  ranking: c.ranking ?? c.rank ?? "",
  courses: (c.courses ?? [])
    .map((x) => (typeof x === "string" ? x : x?.name ?? x?.courseName ?? ""))
    .filter(Boolean),
});

const initials = (name) =>
  name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/* Counter numbers — SAMPLE values, change to your real numbers or load from API */
const STATS = [
  [12500, "", "+", "student leads downloaded"],
  [320, "", "+", "colleges registered"],
  [5, "", "", "districts covered"],
  [100, "", "%", "consent-based sharing"],
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

const FEATURES = [
  ["🎯", "Real student interest", "Every lead is a student who showed interest in a college or course."],
  ["🔓", "Free preview, pay to unlock", "See ID, 12th % and course free. Pay ₹100 only for contact details."],
  ["📍", "Chennai · Coimbatore · Erode · Salem · Tiruppur", "Engineering, Arts & Science, Medical, Nursing, Management and more."],
  ["📊", "Private dashboard", "Track leads, purchases, spending and receipts in one place."],
];

const STEPS = [
  ["Register & get verified", "Create your college account with official email, affiliation and accreditation. Admin verifies it before you go live."],
  ["Complete profile & courses", "Add courses, fees, seats and eligibility so matching students can find you."],
  ["Browse student leads", "See interested students. The free preview shows Student ID, 12th %, preferred course and location."],
  ["Unlock for ₹100", "Pick a lead and pay ₹100 securely. Our server verifies the payment before unlocking."],
  ["Receive full details", "Get the student's name, mobile and email, saved in My Purchased Leads."],
  ["Follow up & track", "Contact the student and check payment history and receipts on your dashboard."],
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
  ["STU10231", "82%", "B.Tech CSE", "Chennai"],
  ["STU10232", "91%", "MBBS", "Coimbatore"],
  ["STU10233", "76%", "B.Sc Nursing", "Salem"],
  ["STU10234", "88%", "B.Com", "Erode"],
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

const MARQUEE = ["Chennai", "Coimbatore", "Erode", "Salem", "Tiruppur", "₹100 per lead", "Verified colleges", "Consent-based leads", "Secure payments"];

function CountUp({ to, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / 1600, 1);
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
  return (
    <strong ref={ref}>
      {prefix}
      {n.toLocaleString("en-IN")}
      {suffix}
    </strong>
  );
}

function Campus() {
  return (
    <svg viewBox="0 0 420 300" className="cs-campus" aria-hidden="true">
      <circle cx="330" cy="70" r="38" fill="#ffd66b" opacity=".9" />
      <rect x="0" y="250" width="420" height="50" fill="#d6e7fb" />
      <rect x="60" y="130" width="300" height="120" rx="6" fill="#fff" />
      <polygon points="40,132 210,60 380,132" fill="#1769e0" />
      <rect x="180" y="170" width="60" height="80" rx="4" fill="#173d6b" />
      {[85, 125, 255, 295].map((x) => (
        <rect key={x} x={x} y="160" width="28" height="42" rx="3" fill="#bcd8fa" />
      ))}
      <rect x="196" y="96" width="28" height="28" rx="14" fill="#fff" />
      <path d="M205 110l5-6 5 6" stroke="#1769e0" strokeWidth="2.5" fill="none" />
      <g className="cs-cap">
        <polygon points="70,60 105,45 140,60 105,75" fill="#102b4b" />
        <rect x="92" y="72" width="26" height="16" fill="#102b4b" />
        <line x1="140" y1="60" x2="140" y2="86" stroke="#ffd66b" strokeWidth="3" />
      </g>
    </svg>
  );
}

function CollegeSite({ colleges }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const barRef = useRef(null);

  const list = (colleges && colleges.length ? colleges : SAMPLE_COLLEGES).map(normalize);

  /* ---- search state ---- */
  const [auto, setAuto] = useState(true); // auto-rotating district mode
  const [idx, setIdx] = useState(0); // which district is showing in auto mode
  const [typed, setTyped] = useState(""); // typewriter text in auto mode
  const [paused, setPaused] = useState(false); // pause while mouse is over results
  const [q, setQ] = useState(""); // manual text
  const [district, setDistrict] = useState(""); // manual selection
  const [focus, setFocus] = useState(false);

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
  const [period, setPeriod] = useState("6m");
  const [selected, setSelected] = useState("gold");

  const goLogin = () => navigate("/college/register?mode=login");
  const goRegister = () => navigate("/college/register");
  const goDashboard = () => navigate("/college/dashboard");

  // Subscription prices are login-only
  const goPlans = () => {
    if (loggedIn) {
      setView("pricing");
      setMenu(false);
      window.scrollTo({ top: 0 });
      return;
    }
    try {
      sessionStorage.setItem(AFTER_LOGIN_KEY, "/college/home?view=plans");
    } catch {
      /* ignore */
    }
    goLogin();
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

  /* ---- auto-rotate: type "Best colleges in X", wait 5s, go to next district ---- */
  useEffect(() => {
    if (!auto || paused) return undefined;
    const full = `Best colleges in ${DISTRICTS[idx]}`;
    let i = 0;
    setTyped("");
    const typer = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(typer);
    }, 45);
    const next = setTimeout(() => setIdx((p) => (p + 1) % DISTRICTS.length), ROTATE_MS);
    return () => {
      clearInterval(typer);
      clearTimeout(next);
    };
  }, [auto, paused, idx]);

  /* ---- manual search ---- */
  const term = q
    .toLowerCase()
    .replace(/\b(best|colleges|college|in)\b/g, "")
    .trim();
  const suggestions = DISTRICTS.filter((d) => !term || d.toLowerCase().includes(term));
  const showSuggest = focus && !auto && !district && suggestions.length > 0;

  const shown = auto ? DISTRICTS[idx] : district; // district whose colleges are displayed
  const results = shown ? list.filter((c) => c.district.toLowerCase() === shown.toLowerCase()) : [];
  const countOf = (d) => list.filter((c) => c.district.toLowerCase() === d.toLowerCase()).length;

  const pickDistrict = (d) => {
    setAuto(false);
    setDistrict(d);
    setQ(`Best colleges in ${d}`);
    setFocus(false);
  };
  const clearSearch = () => {
    setQ("");
    setDistrict("");
    setAuto(true);
  };
  const onSearchFocus = () => {
    if (auto) {
      setAuto(false);
      setQ("");
      setDistrict("");
    }
    setFocus(true);
  };
  const onSearchBlur = () => {
    setFocus(false);
    if (!q && !district) setAuto(true);
  };
  const onSearchKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length) pickDistrict(suggestions[0]);
    }
    if (e.key === "Escape") e.currentTarget.blur();
  };

  const openCollege = (c) => navigate(`/college/profile?college=${encodeURIComponent(c.id)}`);

  /* ---- subscription pricing (login only) ---- */
  const showPricing = view === "pricing" && loggedIn;
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
    const items = document.querySelectorAll(".cs-rv");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));

    // active menu item
    const secs = MENU.map(([id]) => document.getElementById(id)).filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    secs.forEach((el) => spy.observe(el));

    // progress bar + header shadow
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1)) * 100;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      setScrolled(h.scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [view]);

  return (
    <div className="cs">
      <style>{styles}</style>
      <div className="cs-bar" ref={barRef} />

      {/* FIXED NAV BAR */}
      <header className="cs-header">
        <div className="cs-wrap cs-header-in">
          <button className="cs-brand" onClick={() => scrollTo("home")}>
            <span className="cs-logo">CC</span>
            <span>
              <strong>CampusConnect</strong>
              <small>Student Leads · Better Admissions</small>
            </span>
          </button>

          <nav className={menu ? "open" : ""}>
            {MENU.map(([id, label]) => (
              <button key={id} className={active === id ? "on" : ""} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
            {loggedIn ? (
              <>
                <button className="cs-ghost" onClick={() => navigate("/college/profile")}>My College</button>
                <button className="cs-solid" onClick={goDashboard}>Go to Dashboard →</button>
              </>
            ) : (
              <>
                <button className="cs-ghost" onClick={goLogin}>College Login</button>
                <button className="cs-solid" onClick={goRegister}>Register College</button>
              </>
            )}
          </nav>

          <button className="cs-burger" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? "✕" : "☰"}</button>
        </div>
      </header>

      {showPricing ? (
        /* ============ SUBSCRIPTION PRICING (LOGIN ONLY) ============ */
        <main className="sp-main">
          <span className="cs-blob b4" /><span className="cs-blob b5" />
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
      {/* HOME / HERO BANNER */}
      <section id="home" className="cs-hero">
        <span className="cs-blob b1" /><span className="cs-blob b2" /><span className="cs-blob b3" />
        <div className="cs-wrap cs-hero-in">
          <div className="cs-rv left">
            <span className="cs-tag"><i className="cs-dot" /> ADMISSION SEASON · FOR COLLEGES</span>
            <h1>
              Find students who are already looking for a <span className="cs-grad">college like yours</span>
            </h1>
            <p>
              CampusConnect connects colleges with prospective students after 12th standard.
              Browse interested students, unlock their contact details for just ₹100 per lead
              and start your admission conversation.
            </p>
            <div className="cs-row">
              <button className="cs-solid big" onClick={loggedIn ? goDashboard : goRegister}>
                {loggedIn ? "Open Dashboard" : "Register Your College"}
              </button>
              <button className="cs-ghost big" onClick={() => scrollTo("search")}>Search Colleges</button>
            </div>
          </div>

          <div className="cs-rv right cs-hero-art">
            <span className="cs-ring" />
            <span className="cs-orb o1">🎓</span>
            <span className="cs-orb o2">📚</span>
            <span className="cs-orb o3">🏫</span>
            <Campus />
            <div className="cs-lead cs-float">
              <b>Sample Student Lead</b>
              <p><span>Student ID</span><em>STU10234</em></p>
              <p><span>12th %</span><em>82%</em></p>
              <p><span>Course</span><em>B.Tech CSE</em></p>
              <p><span>Mobile</span><em className="lock">98•••••••• 🔒</em></p>
              <button className="cs-dark" onClick={() => scrollTo("pricing")}>Unlock Details – ₹100</button>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="cs-marquee" aria-hidden="true">
        <div className="cs-track">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i}>{t}<i>✦</i></span>
          ))}
        </div>
      </div>

      {/* SEARCH — one full page */}
      <section id="search" className="cs-search">
        <span className="cs-blob b4" /><span className="cs-blob b5" />
        <div className="cs-wrap cs-search-in">
          <div className="cs-rv zoom">
            <span className="cs-eyebrow">SEARCH COLLEGES</span>
            <h2 className="cs-h2">Search colleges by district</h2>

            <div className="cs-sbox">
              <div className={`cs-sfield ${auto ? "auto" : ""}`}>
                <span className="cs-sicon">🔍</span>
                <input
                  value={auto ? typed : q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setDistrict("");
                  }}
                  onFocus={onSearchFocus}
                  onBlur={onSearchBlur}
                  onKeyDown={onSearchKey}
                  placeholder="Best colleges in Coimbatore"
                  aria-label="Search colleges by district"
                  autoComplete="off"
                />
                {auto && <span className="cs-caret" />}
                {!auto && (q || district) && (
                  <button className="cs-sclear" onMouseDown={(e) => e.preventDefault()} onClick={clearSearch} aria-label="Clear search">
                    ✕
                  </button>
                )}
              </div>

              {auto && !paused && <span className="cs-prog" key={idx} />}

              {showSuggest && (
                <ul className="cs-sug" onMouseDown={(e) => e.preventDefault()}>
                  {suggestions.map((d) => (
                    <li key={d}>
                      <button onClick={() => pickDistrict(d)}>
                        <span>📍</span> Best colleges in <b>{d}</b>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="cs-chips">
              {DISTRICTS.map((d) => (
                <button key={d} className={shown === d ? "on" : ""} onClick={() => pickDistrict(d)}>
                  {d} <em>{countOf(d)}</em>
                </button>
              ))}
            </div>

            <p className="cs-auto-note">
              {auto ? (
                <><i className="cs-dot" /> Auto-showing the next district every 5 seconds{paused ? " (paused)" : ""}</>
              ) : (
                <button onClick={clearSearch}>▶ Resume auto-play</button>
              )}
            </p>
          </div>

          <div
            className="cs-results"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {shown ? (
              <>
                <p className="cs-rcount" key={`count-${shown}`}>
                  <b>{results.length}</b> {results.length === 1 ? "college" : "colleges"} in <b>{shown}</b>
                </p>
                {results.length ? (
                  <div className="cs-grid3">
                    {results.slice(0, 6).map((c, i) => (
                      <article
                        key={`${shown}-${c.id}`}
                        className="cs-college"
                        style={{ animationDelay: `${i * 0.08}s` }}
                        onClick={() => openCollege(c)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && openCollege(c)}
                      >
                        <div className="cs-chead">
                          <span className="cs-clogo">
                            <b>{initials(c.name)}</b>
                            {c.logo && <img src={c.logo} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
                          </span>
                          <div>
                            {c.type && <span className="cs-ctype">{c.type}</span>}
                            {c.ranking && <span className="cs-crank">🏆 {c.ranking}</span>}
                          </div>
                        </div>
                        <h3>{c.name}</h3>
                        <p>📍 {c.district}, Tamil Nadu</p>
                        {c.courses.length > 0 && (
                          <div className="cs-ctags">
                            {c.courses.slice(0, 3).map((x) => <span key={x}>{x}</span>)}
                            {c.courses.length > 3 && <span>+{c.courses.length - 3}</span>}
                          </div>
                        )}
                        <span className="cs-cview">View profile →</span>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="cs-empty">No colleges listed in {shown} yet.</p>
                )}
                {results.length > 6 && <p className="cs-more">+ {results.length - 6} more colleges in {shown}</p>}
              </>
            ) : (
              <p className="cs-empty">Pick a district to see its colleges.</p>
            )}
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="cs-wrap cs-stats">
        {STATS.map(([to, prefix, suffix, label], i) => (
          <div key={label} className="cs-rv zoom" style={{ "--d": `${i * 0.1}s` }}>
            <CountUp to={to} prefix={prefix} suffix={suffix} />
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="cs-wrap cs-sec">
        <h2 className="cs-h2 cs-rv">Why colleges use CampusConnect</h2>
        <div className="cs-grid4">
          {FEATURES.map(([ic, t, d], i) => (
            <article key={t} className="cs-card cs-rv zoom" style={{ "--d": `${i * 0.1}s` }}>
              <span className="cs-ic">{ic}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="cs-band">
        <div className="cs-wrap cs-sec">
          <span className="cs-eyebrow cs-rv">HOW IT WORKS</span>
          <h2 className="cs-h2 cs-rv">From registration to student contact in six steps</h2>
          <div className="cs-steps">
            {STEPS.map(([t, d], i) => (
              <article key={t} className={`cs-step cs-rv ${i % 2 ? "right" : "left"}`}>
                <div className="cs-num">{i + 1}</div>
                <div><h3>{t}</h3><p>{d}</p></div>
              </article>
            ))}
          </div>

          {/* public -> private explained */}
          <div className="cs-flow cs-rv">
            <div><b>1</b><span>Public website</span><small>You are here</small></div>
            <i>→</i>
            <div><b>2</b><span>Register / Login</span><small>Private access</small></div>
            <i>→</i>
            <div><b>3</b><span>College profile</span><small>Your saved college</small></div>
            <i>→</i>
            <div><b>4</b><span>Dashboard</span><small>Buy leads for ₹100</small></div>
          </div>

          <div className="cs-preview cs-rv">
            <div className="cs-preview-head">
              <b>Inside the private dashboard</b>
              <span>Preview · login required to unlock</span>
            </div>
            <div className="cs-table-wrap">
              <table>
                <thead><tr><th>Student ID</th><th>12th %</th><th>Course</th><th>Location</th><th>Mobile</th><th /></tr></thead>
                <tbody>
                  {LEADS.map(([id, pc, c, l]) => (
                    <tr key={id}>
                      <td><b>{id}</b></td><td>{pc}</td><td>{c}</td><td>{l}</td>
                      <td className="lock">••••••••• 🔒</td>
                      <td><button className="cs-unlock" onClick={goLogin}>Unlock ₹100</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cs-privacy cs-rv">
            <h3>🔒 Student privacy is protected</h3>
            <p>Mobile number and email stay hidden until a college unlocks the lead. The unlock is recorded only after the server verifies payment.</p>
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION PLANS (prices only after login) */}
      <section id="plans" className="cs-wrap cs-sec">
        <span className="cs-eyebrow cs-rv">SUBSCRIPTION</span>
        <h2 className="cs-h2 cs-rv">Choose a plan that fits your college</h2>
        <div className="cs-plans">
          {PLANS.map((p, i) => (
            <article key={p.id} className={`cs-plan ${p.id} cs-rv zoom`} style={{ "--d": `${i * 0.12}s` }}>
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
            </article>
          ))}
        </div>
        <p className="cs-plans-note cs-rv">
          Plans are available for 1 month, 6 months and 1 year. {loggedIn ? "Open any plan to compare durations." : "Prices are shown to registered colleges after login."}
        </p>
      </section>

      {/* PRICING (per lead) */}
      <section id="pricing" className="cs-band">
        <div className="cs-wrap cs-sec">
          <span className="cs-eyebrow cs-rv">PRICING</span>
          <h2 className="cs-h2 cs-rv">One simple price for every student lead</h2>
          <div className="cs-price cs-rv zoom">
            <div className="cs-price-box">
              <small>Per student lead</small>
              <strong>₹100</strong>
              <span>one-time · per lead</span>
              <button className="cs-white" onClick={loggedIn ? goDashboard : goRegister}>
                {loggedIn ? "Buy Leads" : "Register & Start Buying"}
              </button>
            </div>
            <ul>
              {["Free preview of every lead", "Name, mobile and email after unlock", "Saved forever in My Purchased Leads", "Secure payment, verified by server", "Receipts and transaction history", "Pay only for the leads you unlock"].map((x) => (
                <li key={x}><i>✓</i>{x}</li>
              ))}
            </ul>
          </div>
          <div className="cs-est">
            {[[10, "₹1,000"], [50, "₹5,000"], [100, "₹10,000"], [500, "₹50,000"]].map(([n, t], i) => (
              <div key={n} className="cs-rv zoom" style={{ "--d": `${i * 0.1}s` }}><b>{n} leads</b><span>{t}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="cs-wrap cs-sec">
        <span className="cs-eyebrow cs-rv">BENEFITS</span>
        <h2 className="cs-h2 cs-rv">Why colleges choose CampusConnect</h2>
        <div className="cs-grid3">
          {BENEFITS.map(([ic, t, d], i) => (
            <article key={t} className="cs-card cs-rv zoom" style={{ "--d": `${(i % 3) * 0.12}s` }}>
              <span className="cs-ic">{ic}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="cs-band">
        <div className="cs-wrap cs-sec cs-about">
          <div className="cs-rv left">
            <span className="cs-eyebrow">ABOUT US</span>
            <h2 className="cs-h2 left">Connecting students and colleges</h2>
            <p>Students who finish 12th create a profile, search colleges and courses, and show interest. Colleges that register on our platform see those interested students and can pay ₹100 to access the complete contact details of the students they want to reach.</p>
            <p>We protect student privacy: contact details are hidden until purchase, and students agree to share their profile for admission purposes only.</p>
          </div>
          <div className="cs-rv right"><Campus /></div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="cs-wrap cs-sec">
        <span className="cs-eyebrow cs-rv">CONTACT</span>
        <h2 className="cs-h2 cs-rv">We'd love to hear from you</h2>
        <form
          className="cs-form cs-rv zoom"
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
            <select defaultValue="Chennai">
              {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label className="full">Message<textarea required rows="4" placeholder="How can we help?" /></label>
          <button className="cs-solid big full" type="submit">Send Message</button>
          {sent && <p className="cs-ok full">✓ Thank you! We will contact you soon.</p>}
        </form>
      </section>

      <section className="cs-wrap cs-ctawrap">
        <div className="cs-banner cs-rv zoom">
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
          <div>
            <strong>CampusConnect</strong>
            <p>Student contact details are shared only with consent and after purchase.</p>
          </div>
          <div className="cs-flinks">
            {MENU.map(([id, l]) => <button key={id} onClick={() => scrollTo(id)}>{l}</button>)}
            <button onClick={goLogin}>College Login</button>
            <button onClick={goRegister}>Register</button>
          </div>
        </div>
      </footer>

        </>
      )}

      <button className={`cs-top ${scrolled ? "show" : ""}`} onClick={() => scrollTo("home")} aria-label="Back to top">↑</button>
    </div>
  );
}

const styles = `
/* full-width page, equal margin on all sides */
html{scroll-behavior:smooth}
body{display:block!important;background:#f4f8fd!important;color-scheme:light;margin:0!important}
#root{width:100%!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;text-align:left!important;display:block!important;min-height:0!important}
.cs{--pad:clamp(22px,5vw,80px);--nav:78px;min-height:100vh;padding-top:var(--nav);color:#12284a;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;font-size:17px;text-align:left;overflow-x:hidden}
.cs *{box-sizing:border-box}
.cs h1,.cs h2,.cs h3,.cs p{margin:0;letter-spacing:normal;font-family:inherit;text-align:inherit}
.cs button{font:inherit;cursor:pointer}
.cs-wrap{width:100%;max-width:none;margin:0;padding-inline:var(--pad)}
.cs-bar{position:fixed;top:0;left:0;height:4px;width:0;z-index:400;background:linear-gradient(90deg,#1458d8,#10a5df,#8b5cf6)}

/* FIXED nav */
.cs-header{position:fixed;top:0;left:0;right:0;z-index:300;height:var(--nav);background:rgba(255,255,255,.95);backdrop-filter:blur(14px);border-bottom:1px solid #e0e9f3;box-shadow:0 4px 18px rgba(26,65,112,.08)}
.cs-header-in{display:flex;align-items:center;justify-content:space-between;gap:16px;height:100%}
.cs-brand{display:flex;align-items:center;gap:12px;border:0;background:none;padding:0;text-align:left}
.cs-logo{width:48px;height:48px;border-radius:13px;background:linear-gradient(135deg,#1458d8,#10a5df);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;animation:pulse 3s ease-in-out infinite}
.cs-brand strong{display:block;color:#173d6b;font-size:20px;font-weight:850}
.cs-brand small{display:block;margin-top:2px;color:#6f89a8;font-size:12.5px;font-weight:700;white-space:nowrap}
.cs-header nav{display:flex;align-items:center;gap:2px}
.cs-header nav button:not(.cs-ghost):not(.cs-solid){position:relative;border:0;background:none;padding:11px 13px;border-radius:10px;color:#526d8c;font-size:15.5px;font-weight:700;white-space:nowrap;transition:.2s}
.cs-header nav button:not(.cs-ghost):not(.cs-solid)::after{content:"";position:absolute;left:50%;bottom:4px;width:0;height:3px;border-radius:3px;background:#1767c9;transition:.25s;transform:translateX(-50%)}
.cs-header nav button.on::after,.cs-header nav button:not(.cs-ghost):not(.cs-solid):hover::after{width:55%}
.cs-header nav button.on,.cs-header nav button:not(.cs-ghost):not(.cs-solid):hover{color:#1767c9}
.cs-solid,.cs-ghost,.cs-dark,.cs-white,.cs-outline{position:relative;overflow:hidden;min-height:46px;padding:0 22px;border-radius:11px;font-size:16px;font-weight:800;border:0;white-space:nowrap;transition:transform .2s,box-shadow .2s,background .2s}
.cs-solid{color:#fff;background:linear-gradient(100deg,#1458d8,#1673e8,#10a5df);box-shadow:0 7px 18px rgba(22,103,224,.25)}
.cs-solid::after,.cs-white::after{content:"";position:absolute;top:0;left:-80%;width:45%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.5),transparent);transform:skewX(-20deg);animation:shine 3.4s infinite}
.cs-ghost{color:#1c5eb9;background:#edf5ff;border:1px solid #d7e8fb;margin-left:8px}
.cs-solid:hover,.cs-white:hover,.cs-dark:hover{transform:translateY(-3px);box-shadow:0 12px 24px rgba(22,103,224,.3)}
.cs-ghost:hover{background:#dcecff;transform:translateY(-2px)}
.cs-solid.big,.cs-ghost.big{min-height:54px;padding:0 28px;margin-left:0;font-size:17px}
.cs-dark{background:#102b4b;color:#fff;width:100%;margin-top:16px}
.cs-white{background:#fff;color:#1458d8}
.cs-outline{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.7)}
.cs-outline:hover{background:rgba(255,255,255,.15)}
.cs-burger{display:none;width:46px;height:46px;border:1px solid #d7e8fb;background:#edf5ff;color:#1767c9;border-radius:10px;font-size:22px}

/* hero banner */
.cs-hero{position:relative;overflow:hidden;padding:var(--pad) 0;background:linear-gradient(160deg,#eaf3ff 0%,#f7fbff 55%,#e6f6ff 100%);min-height:calc(100vh - var(--nav));display:flex;align-items:center}
.cs-blob{position:absolute;border-radius:50%;filter:blur(10px);opacity:.5;animation:blob 9s ease-in-out infinite;pointer-events:none}
.cs-blob.b1{width:420px;height:420px;background:#bcd8fa;top:-140px;left:-120px}
.cs-blob.b2{width:320px;height:320px;background:#c7f0ff;bottom:-100px;right:8%;animation-delay:-4s}
.cs-blob.b3{width:200px;height:200px;background:#e0d4ff;top:18%;right:42%;animation-delay:-2s}
.cs-hero-in{position:relative;display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(24px,4vw,70px);align-items:center;width:100%}
.cs-tag,.cs-eyebrow{display:inline-block;color:#1769d2;font-size:13px;font-weight:900;letter-spacing:1.4px}
.cs-tag{display:inline-flex;align-items:center;gap:9px;padding:9px 16px;border-radius:999px;background:#dcecff}
.cs-dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:#10b981;box-shadow:0 0 0 0 rgba(16,185,129,.6);animation:ping 1.8s infinite}
.cs-hero h1{margin:20px 0!important;font-size:clamp(34px,4.8vw,66px);line-height:1.1;color:#102b4d;font-weight:900;text-align:left}
.cs-grad{background:linear-gradient(90deg,#1458d8,#10a5df,#8b5cf6,#1458d8);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:grad 6s linear infinite}
.cs-hero p{margin-bottom:28px;color:#4d6785;font-size:clamp(17px,1.5vw,20px);line-height:1.7;max-width:660px}
.cs-row{display:flex;gap:14px;flex-wrap:wrap}.cs-row.center{justify-content:center}
.cs-hero-art{position:relative;display:flex;justify-content:center}
.cs-ring{position:absolute;top:50%;left:50%;width:min(440px,92%);aspect-ratio:1;margin:calc(min(440px,92%)/-2) 0 0 calc(min(440px,92%)/-2);border-radius:50%;border:3px dashed rgba(23,103,201,.28);animation:spin 28s linear infinite}
.cs-orb{position:absolute;z-index:2;width:58px;height:58px;border-radius:17px;background:#fff;box-shadow:0 14px 30px rgba(34,74,117,.2);display:flex;align-items:center;justify-content:center;font-size:28px;animation:bob 5s ease-in-out infinite}
.cs-orb.o1{top:2%;left:6%}.cs-orb.o2{top:10%;right:2%;animation-delay:-1.6s}.cs-orb.o3{bottom:34%;left:-1%;animation-delay:-3s}
.cs-campus{position:relative;width:100%;max-width:520px;height:auto;filter:drop-shadow(0 22px 30px rgba(23,80,160,.18))}
.cs-cap{animation:bob 3.2s ease-in-out infinite;transform-origin:center}
.cs-lead{position:absolute;z-index:3;right:0;bottom:-26px;width:min(300px,78%);padding:20px;border-radius:18px;background:#fff;border:1px solid #dce6f1;box-shadow:0 20px 45px rgba(34,74,117,.18)}
.cs-float{animation:bob 4s ease-in-out infinite}
.cs-lead b{display:block;margin-bottom:6px;color:#173b65;font-size:17px}
.cs-lead p{display:flex!important;justify-content:space-between;gap:10px;margin:0!important;padding:9px 0;border-bottom:1px solid #edf1f5;font-size:15.5px!important}
.cs-lead span{color:#6f8195}.cs-lead em{font-style:normal;font-weight:800;color:#1a304d}
.lock{color:#98a6b8!important}

/* marquee */
.cs-marquee{overflow:hidden;background:#102b4b;color:#dbe9fb;padding:15px 0;white-space:nowrap}
.cs-track{display:inline-flex;gap:0;animation:marq 28s linear infinite}
.cs-marquee:hover .cs-track{animation-play-state:paused}
.cs-track span{display:inline-flex;align-items:center;font-size:17px;font-weight:750;padding:0 26px}
.cs-track i{margin-left:52px;font-style:normal;color:#10a5df}

/* search (full page) */
.cs-search{position:relative;overflow:hidden;min-height:calc(100vh - var(--nav));display:flex;align-items:center;background:linear-gradient(180deg,#f4f8fd 0%,#e9f3ff 100%)}
.cs-blob.b4{width:340px;height:340px;background:#cfe3fb;top:-100px;right:-80px}
.cs-blob.b5{width:260px;height:260px;background:#d9f3ff;bottom:-80px;left:-60px;animation-delay:-5s}
.cs-search-in{position:relative;width:100%;padding-block:var(--pad)}
.cs-search .cs-h2{margin-bottom:26px!important}
.cs-sbox{position:relative;width:min(100%,980px);margin:0 auto;z-index:20}
.cs-sfield{display:flex;align-items:center;gap:12px;padding:0 14px 0 24px;height:76px;border-radius:22px;background:#fff;border:2px solid #cfe0f3;box-shadow:0 18px 44px rgba(34,74,117,.14);transition:.25s}
.cs-sfield.auto{border-color:#9fc6f3}
.cs-sfield:focus-within{border-color:#1767c9;box-shadow:0 0 0 6px rgba(23,103,201,.14),0 18px 44px rgba(34,74,117,.14)}
.cs-sicon{font-size:25px}
.cs-sfield input{flex:1;min-width:0;height:100%;border:0;outline:0;background:transparent;font:inherit;font-size:clamp(18px,2vw,24px);font-weight:700;color:#12284a}
.cs-sfield input::placeholder{color:#8aa2bd;font-weight:500}
.cs-caret{width:3px;height:30px;margin-left:-8px;border-radius:2px;background:#1767c9;animation:blink 1s steps(1) infinite}
.cs-sclear{width:40px;height:40px;border:0;border-radius:50%;background:#edf5ff;color:#1767c9;font-size:16px;font-weight:800;transition:.2s}
.cs-sclear:hover{background:#dcecff;transform:rotate(90deg)}
.cs-prog{position:absolute;left:22px;right:22px;bottom:0;height:4px;border-radius:4px;background:linear-gradient(90deg,#1458d8,#10a5df,#8b5cf6);transform-origin:left;animation:prog ${ROTATE_MS}ms linear forwards}
.cs-sug{position:absolute;top:calc(100% + 10px);left:0;right:0;margin:0;padding:8px;list-style:none;background:#fff;border:1px solid #dce6f1;border-radius:18px;box-shadow:0 24px 48px rgba(34,74,117,.2);animation:pop .18s ease}
.cs-sug button{display:flex;align-items:center;gap:10px;width:100%;padding:14px 16px;border:0;background:none;border-radius:12px;text-align:left;font-size:17.5px;color:#35506c}
.cs-sug button:hover{background:#eef6ff;color:#1767c9}
.cs-sug b{color:#102b4d}
.cs-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:22px}
.cs-chips button{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:999px;border:1px solid #cfe0f3;background:#fff;color:#35506c;font-size:15.5px;font-weight:750;transition:.25s}
.cs-chips button em{font-style:normal;min-width:24px;padding:1px 7px;border-radius:999px;background:#eaf3ff;color:#1767c9;font-size:12.5px;font-weight:850}
.cs-chips button:hover{border-color:#1767c9;color:#1767c9;transform:translateY(-3px)}
.cs-chips button.on{background:linear-gradient(100deg,#1458d8,#10a5df);border-color:transparent;color:#fff;box-shadow:0 10px 22px rgba(22,103,224,.3);transform:translateY(-3px) scale(1.04)}
.cs-chips button.on em{background:rgba(255,255,255,.25);color:#fff}
.cs-auto-note{margin-top:16px!important;text-align:center!important;color:#6f8195;font-size:15px;display:flex;align-items:center;justify-content:center;gap:9px}
.cs-auto-note button{border:0;background:#fff;color:#1767c9;font-weight:800;padding:8px 16px;border-radius:999px;border:1px solid #cfe0f3}
.cs-results{margin-top:30px;min-height:330px}
.cs-rcount{margin-bottom:16px!important;color:#566f8d;font-size:18px;animation:pop .35s ease both}
.cs-rcount b{color:#102b4d}
.cs-college{position:relative;overflow:hidden;cursor:pointer;padding:22px;border-radius:20px;background:#fff;border:1px solid #dce6f1;box-shadow:0 8px 24px rgba(34,74,117,.07);animation:pop .5s cubic-bezier(.2,.8,.2,1) both;transition:transform .3s,box-shadow .3s,border-color .3s}
.cs-college::before{content:"";position:absolute;left:0;top:0;width:100%;height:5px;background:linear-gradient(90deg,#1458d8,#10a5df,#8b5cf6);transform:scaleX(0);transform-origin:left;transition:transform .4s}
.cs-college:hover{transform:translateY(-8px);border-color:#b9d6f7;box-shadow:0 24px 44px rgba(34,74,117,.18)}
.cs-college:hover::before{transform:scaleX(1)}
.cs-chead{display:flex;align-items:center;gap:14px;margin-bottom:12px}
.cs-clogo{position:relative;flex:0 0 auto;width:58px;height:58px;border-radius:15px;background:linear-gradient(135deg,#eaf3ff,#dff2ff);display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid #d3e4f7}
.cs-clogo b{color:#1767c9;font-size:19px;font-weight:900}
.cs-clogo img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#fff;padding:4px}
.cs-ctype{display:inline-block;padding:5px 11px;border-radius:8px;background:#e3f3ff;color:#0a68b8;font-size:13px;font-weight:850}
.cs-crank{display:block;margin-top:6px;color:#b87100;font-size:13px;font-weight:800}
.cs-college h3{margin:4px 0 6px!important;font-size:19px;line-height:1.3;color:#173b65}
.cs-college p{color:#566f8d;font-size:15.5px}
.cs-ctags{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.cs-ctags span{padding:5px 11px;border-radius:999px;background:#f0f5fb;color:#44607e;font-size:13.5px;font-weight:700}
.cs-cview{display:inline-block;margin-top:16px;color:#1767c9;font-weight:850;font-size:15px;transition:transform .25s}
.cs-college:hover .cs-cview{transform:translateX(6px)}
.cs-more{margin-top:14px!important;color:#6f8195;font-size:15.5px;text-align:center!important}
.cs-empty{padding:30px;border-radius:18px;background:#fff;border:1px dashed #cfe0f3;color:#566f8d;text-align:center!important}

/* counters */
.cs-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding-block:var(--pad)}
.cs-stats>div{padding:28px;border-radius:20px;background:#fff;border:1px solid #dce6f1;text-align:center;border-top:5px solid #1677ee;box-shadow:0 8px 24px rgba(34,74,117,.06);transition:transform .3s,box-shadow .3s}
.cs-stats>div:hover{transform:translateY(-8px);box-shadow:0 22px 40px rgba(34,74,117,.14)}
.cs-stats>div:nth-child(2){border-top-color:#10b981}.cs-stats>div:nth-child(3){border-top-color:#f59e0b}.cs-stats>div:nth-child(4){border-top-color:#8b5cf6}
.cs-stats strong{display:block;font-size:clamp(34px,3.6vw,50px);color:#1767c9;font-weight:900}
.cs-stats span{color:#566f8d;font-size:17px}

/* sections */
.cs-sec{padding-block:var(--pad)}
.cs-band{background:#fff;border-block:1px solid #e3ecf6}
.cs-eyebrow{display:block;text-align:center}
.cs-h2{margin:10px auto 36px!important;text-align:center;font-size:clamp(28px,3.2vw,44px);line-height:1.2;color:#102b4d;font-weight:900;max-width:980px}
.cs-h2::after{content:"";display:block;width:0;height:5px;margin:14px auto 0;border-radius:5px;background:linear-gradient(90deg,#1458d8,#10a5df,#8b5cf6);transition:width .8s ease .3s}
.cs-h2.in::after,.cs-search .cs-rv.in .cs-h2::after{width:90px}
.cs-h2.left{text-align:left;margin-left:0!important}
.cs-h2.left::after{margin-left:0}
.cs-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.cs-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.cs-card{position:relative;overflow:hidden;padding:30px;border-radius:22px;background:#fff;border:1px solid #dce6f1;box-shadow:0 8px 24px rgba(34,74,117,.06);transition:transform .3s,box-shadow .3s}
.cs-card::before{content:"";position:absolute;top:0;left:-120%;width:80%;height:100%;background:linear-gradient(100deg,transparent,rgba(23,114,232,.1),transparent);transform:skewX(-20deg);transition:left .7s}
.cs-card:hover::before{left:140%}
.cs-band .cs-card{background:#f7fafe}
.cs-card:hover{transform:translateY(-10px);box-shadow:0 24px 44px rgba(34,74,117,.15)}
.cs-ic{display:flex;width:58px;height:58px;margin-bottom:14px;border-radius:16px;background:#eaf3ff;align-items:center;justify-content:center;font-size:28px;transition:.3s}
.cs-card:hover .cs-ic{transform:rotate(-10deg) scale(1.15);background:#d9ebff}
.cs-card h3{margin-bottom:8px!important;font-size:20px;color:#173b65}
.cs-card p{color:#566f8d;font-size:16.5px;line-height:1.6}

/* steps */
.cs-steps{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.cs-step{display:flex;gap:18px;padding:26px;border-radius:20px;background:#f7fafe;border:1px solid #dce6f1;transition:transform .3s,box-shadow .3s}
.cs-step:hover{transform:translateX(6px);box-shadow:0 14px 30px rgba(34,74,117,.1)}
.cs-num{flex:0 0 auto;width:54px;height:54px;border-radius:15px;background:linear-gradient(135deg,#1458d8,#10a5df);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:20px}
.cs-step h3{margin-bottom:6px!important;color:#173b65;font-size:20px}
.cs-step p{color:#566f8d;font-size:16.5px;line-height:1.65}
.cs-flow{display:flex;align-items:stretch;justify-content:center;gap:12px;margin:36px 0;flex-wrap:wrap}
.cs-flow div{flex:1 1 180px;padding:20px;border-radius:18px;background:#eaf3ff;text-align:center;display:flex;flex-direction:column;gap:4px;transition:transform .3s}
.cs-flow div:hover{transform:translateY(-6px)}
.cs-flow div:last-of-type{background:#102b4b;color:#fff}
.cs-flow b{width:36px;height:36px;margin:0 auto 4px;border-radius:50%;background:#1767c9;color:#fff;display:flex;align-items:center;justify-content:center}
.cs-flow span{font-weight:800;font-size:17px}.cs-flow small{opacity:.75;font-size:14px}
.cs-flow i{align-self:center;font-style:normal;font-size:28px;color:#1767c9;animation:nudge 1.6s ease-in-out infinite}
.cs-preview{border-radius:22px;border:1px solid #dce6f1;background:#fff;box-shadow:0 14px 36px rgba(34,74,117,.1);overflow:hidden}
.cs-preview-head{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:18px 24px;background:#f3f8ff;border-bottom:1px solid #e3ecf6}
.cs-preview-head b{font-size:18px;color:#173b65}.cs-preview-head span{color:#6f8195;font-size:15px}
.cs-table-wrap{overflow-x:auto}
.cs-preview table{width:100%;border-collapse:collapse;min-width:640px}
.cs-preview th{padding:14px 22px;text-align:left;font-size:13.5px;text-transform:uppercase;letter-spacing:.5px;color:#52657a;background:#fbfcfe}
.cs-preview td{padding:16px 22px;border-top:1px solid #edf1f5;font-size:16.5px;color:#263f5c;white-space:nowrap}
.cs-preview tbody tr{transition:background .2s}
.cs-preview tbody tr:hover{background:#f1f7ff}
.cs-unlock{border:1px solid #b8d8fa;background:#eff7ff;color:#0869d8;padding:10px 16px;border-radius:9px;font-size:15px;font-weight:850;animation:ring 2.4s infinite}
.cs-unlock:hover{background:#0869d8;color:#fff}
.cs-privacy{margin-top:26px;padding:28px;border-radius:20px;background:#102b4b;color:#fff}
.cs-privacy h3{margin-bottom:8px!important;font-size:20px}.cs-privacy p{color:#b5cdea;line-height:1.7;font-size:16.5px}

/* subscription plans */
.cs-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:stretch}
.cs-plan{--pc:100,116,139;display:flex;flex-direction:column;padding:34px 30px;border-radius:26px;background:#fff;border:1px solid #dce6f1;border-top:6px solid rgb(var(--pc));animation:glow 3.6s ease-in-out infinite;transition:transform .3s}
.cs-plan:hover{transform:translateY(-10px)}
.cs-plan.gold{--pc:245,158,11;animation-delay:-1.2s}
.cs-plan.diamond{--pc:139,92,246;animation-delay:-2.4s}
.cs-plan-ic{display:inline-block;font-size:42px;line-height:1;animation:bob 3.6s ease-in-out infinite}
.cs-plan h3{margin:12px 0 4px!important;font-size:28px;color:#102b4d;font-weight:900}
.cs-plan-tag{color:#6f8195;font-size:15.5px;margin-bottom:18px!important}
.cs-plan ul{list-style:none;margin:0 0 26px;padding:0;display:flex;flex-direction:column;gap:12px;flex:1}
.cs-plan li{display:flex;gap:10px;align-items:flex-start;color:#35506c;font-size:16.5px;line-height:1.45}
.cs-plan li i{flex:0 0 auto;width:24px;height:24px;margin-top:1px;border-radius:50%;background:rgba(var(--pc),.14);color:rgb(var(--pc));font-style:normal;font-weight:900;font-size:13px;display:flex;align-items:center;justify-content:center}
.cs-plan .cs-solid{width:100%}
.cs-plans-note{margin-top:24px!important;text-align:center!important;color:#6f8195;font-size:16px}

/* pricing */
.cs-price{width:100%;display:grid;grid-template-columns:380px 1fr;gap:36px;padding:36px;border-radius:28px;background:#f7fafe;border:1px solid #dce6f1;box-shadow:0 22px 50px rgba(34,74,117,.1)}
.cs-price-box{padding:32px;border-radius:22px;background:linear-gradient(135deg,#1458d8,#10a5df);color:#fff;text-align:center;display:flex;flex-direction:column;gap:6px;justify-content:center}
.cs-price-box small{font-size:16px;opacity:.9}
.cs-price-box strong{font-size:80px;line-height:1;font-weight:900}
.cs-price-box span{margin-bottom:16px;opacity:.92;font-size:16px}
.cs-price ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:16px 28px;align-content:center}
.cs-price li{display:flex;gap:12px;color:#35506c;font-size:17px;align-items:center}
.cs-price li i{flex:0 0 auto;width:26px;height:26px;border-radius:50%;background:#eaf3ff;color:#1672d3;font-style:normal;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center}
.cs-est{width:100%;margin:24px 0 0;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.cs-est div{padding:22px;border-radius:18px;background:#f7fafe;border:1px solid #dce6f1;text-align:center;transition:transform .3s}
.cs-est div:hover{transform:translateY(-6px)}
.cs-est b{display:block;color:#566f8d;font-size:16px}.cs-est span{display:block;margin-top:4px;font-size:28px;font-weight:900;color:#1767c9}

/* about / contact */
.cs-about{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,64px);align-items:center}
.cs-about p{margin-top:14px;color:#44607e;font-size:18px;line-height:1.75}
.cs-about .cs-eyebrow{text-align:left}
.cs-form{width:100%;display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:36px;border-radius:24px;background:#fff;border:1px solid #dce6f1;box-shadow:0 14px 36px rgba(34,74,117,.08)}
.cs-form label{display:flex;flex-direction:column;gap:8px;color:#344f6d;font-size:15.5px;font-weight:800}
.cs-form .full{grid-column:1/-1}
.cs-form input,.cs-form textarea,.cs-form select{width:100%;border:1px solid #d3e0ee;border-radius:12px;padding:14px 16px;font:inherit;font-size:16.5px;background:#fff;outline:none;transition:.2s}
.cs-form input:focus,.cs-form textarea:focus,.cs-form select:focus{border-color:#1767c9;box-shadow:0 0 0 4px rgba(23,103,201,.12)}
.cs-ok{color:#087a50;font-weight:800;font-size:17px}
.cs-ctawrap{padding-bottom:var(--pad)}
.cs-banner{margin:0;padding:clamp(36px,5vw,64px) 24px;border-radius:30px;text-align:center;color:#fff;background:linear-gradient(120deg,#0a3f9e,#0b6bdc,#12a7e0,#0b6bdc,#0a3f9e);background-size:300% 100%;animation:grad 9s ease infinite}
.cs-banner h2{margin-bottom:10px!important;font-size:clamp(26px,3.4vw,42px);color:#fff;text-align:center}
.cs-banner p{margin-bottom:24px;font-size:18px;opacity:.93;text-align:center}
.cs-footer{background:#102b4b;color:#cfe0f5;padding:var(--pad) 0}
.cs-footer-in{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap}
.cs-footer strong{color:#fff;font-size:21px}
.cs-footer p{margin-top:8px!important;color:#9fbbdc;max-width:440px;line-height:1.6;font-size:16px}
.cs-flinks{display:flex;flex-wrap:wrap;gap:6px 22px;align-content:flex-start}
.cs-flinks button{border:0;background:none;color:#9fbbdc;font-size:16px;padding:4px 0;transition:.2s}
.cs-flinks button:hover{color:#fff;transform:translateX(3px)}
.cs-top{position:fixed;right:24px;bottom:24px;width:50px;height:50px;border-radius:50%;border:0;background:#1767c9;color:#fff;font-size:22px;box-shadow:0 10px 24px rgba(23,103,201,.35);opacity:0;pointer-events:none;transform:translateY(16px);transition:.3s;z-index:250}
.cs-top.show{opacity:1;pointer-events:auto;transform:none}

/* scroll reveal */
.cs-rv{opacity:0;transform:translateY(36px);transition:opacity .8s ease var(--d,0s),transform .8s cubic-bezier(.2,.8,.2,1) var(--d,0s)}
.cs-rv.left{transform:translateX(-60px)}.cs-rv.right{transform:translateX(60px)}
.cs-rv.zoom{transform:scale(.9) translateY(24px)}
.cs-rv.in{opacity:1;transform:none}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes blob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,24px) scale(1.12)}}
@keyframes grad{0%{background-position:0 50%}100%{background-position:300% 50%}}
@keyframes ring{0%{box-shadow:0 0 0 0 rgba(8,105,216,.35)}70%{box-shadow:0 0 0 10px rgba(8,105,216,0)}100%{box-shadow:0 0 0 0 rgba(8,105,216,0)}}
@keyframes pop{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:none}}
@keyframes shine{0%{left:-80%}55%,100%{left:150%}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes ping{0%{box-shadow:0 0 0 0 rgba(16,185,129,.55)}70%{box-shadow:0 0 0 10px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(22,103,224,.35)}50%{box-shadow:0 0 0 9px rgba(22,103,224,0)}}
@keyframes marq{to{transform:translateX(-50%)}}
@keyframes blink{50%{opacity:0}}
@keyframes prog{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
@keyframes glow{0%,100%{box-shadow:0 10px 28px rgba(var(--pc),.14)}50%{box-shadow:0 20px 48px rgba(var(--pc),.38)}}
@media(prefers-reduced-motion:reduce){.cs *{animation:none!important;transition:none!important}.cs-rv{opacity:1;transform:none}html{scroll-behavior:auto}.cs-track{animation:none!important}}

/* subscription pricing view (login only) */
.sp-main{position:relative;overflow:hidden;min-height:calc(100vh - var(--nav));background:linear-gradient(160deg,#eaf3ff 0%,#f7fbff 55%,#e6f6ff 100%)}
.sp-in{position:relative;padding-block:var(--pad)}
.sp-back{margin:0!important;min-height:42px}
.sp-head{text-align:center;margin-top:8px}
.sp-head h1{margin:18px 0 10px!important;font-size:clamp(32px,4vw,54px);line-height:1.12;color:#102b4d;font-weight:900;text-align:center}
.sp-head p{color:#566f8d;font-size:19px;text-align:center}
.sp-toggle{--i:0;position:relative;display:grid;grid-template-columns:repeat(3,1fr);width:min(100%,640px);margin:34px auto 38px;padding:6px;border-radius:18px;background:#fff;border:1px solid #d3e4f7;box-shadow:0 14px 34px rgba(34,74,117,.1)}
.sp-pill{position:absolute;top:6px;bottom:6px;left:6px;width:calc((100% - 12px)/3);border-radius:13px;background:linear-gradient(100deg,#1458d8,#10a5df);box-shadow:0 8px 18px rgba(22,103,224,.3);transform:translateX(calc(var(--i)*100%));transition:transform .45s cubic-bezier(.2,.9,.3,1.2)}
.sp-toggle button{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:13px 8px;border:0;background:none;border-radius:13px;color:#526d8c;font-size:16.5px;font-weight:800;transition:color .3s}
.sp-toggle button.on{color:#fff}
.sp-toggle em{font-style:normal;font-size:12px;font-weight:800;opacity:.85}
.sp-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:stretch}
.sp-plan{--pc:100,116,139;position:relative;display:flex;flex-direction:column;padding:34px 30px;border-radius:26px;background:#fff;border:2px solid #dce6f1;border-top:7px solid rgb(var(--pc));cursor:pointer;animation:pop .55s cubic-bezier(.2,.8,.2,1) both;transition:transform .3s,box-shadow .3s,border-color .3s}
.sp-plan.gold{--pc:245,158,11}
.sp-plan.diamond{--pc:139,92,246}
.sp-plan:hover{transform:translateY(-10px);box-shadow:0 26px 48px rgba(var(--pc),.25)}
.sp-plan.sel{border-color:rgb(var(--pc));box-shadow:0 22px 46px rgba(var(--pc),.3);transform:translateY(-6px)}
.sp-ribbon{position:absolute;top:-16px;right:22px;padding:6px 14px;border-radius:999px;background:#f59e0b;color:#fff;font-size:13px;font-weight:850;box-shadow:0 8px 18px rgba(245,158,11,.4);animation:bob 3s ease-in-out infinite}
.sp-ic{display:inline-block;font-size:44px;line-height:1;animation:bob 3.6s ease-in-out infinite}
.sp-plan h3{margin:12px 0 4px!important;font-size:28px;color:#102b4d;font-weight:900}
.sp-tg{color:#6f8195;font-size:15.5px;margin-bottom:20px!important}
.sp-price{display:flex;align-items:baseline;gap:8px}
.sp-price strong{font-size:clamp(38px,3.6vw,52px);line-height:1;color:rgb(var(--pc));font-weight:900;animation:pop .4s ease both}
.sp-price span{color:#6f8195;font-size:16px;font-weight:700}
.sp-per{margin:8px 0 22px!important;color:#566f8d;font-size:15.5px;display:flex;gap:10px;align-items:center}
.sp-per s{color:#98a6b8}
.sp-plan ul{list-style:none;margin:0 0 26px;padding:0;display:flex;flex-direction:column;gap:12px;flex:1}
.sp-plan li{display:flex;gap:10px;align-items:flex-start;color:#35506c;font-size:16.5px;line-height:1.45}
.sp-plan li i{flex:0 0 auto;width:24px;height:24px;margin-top:1px;border-radius:50%;background:rgba(var(--pc),.14);color:rgb(var(--pc));font-style:normal;font-weight:900;font-size:13px;display:flex;align-items:center;justify-content:center}
.sp-plan>button{width:100%;margin:0!important}
.sp-summary{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:32px;padding:22px 26px;border-radius:22px;background:#102b4b;color:#fff;box-shadow:0 20px 44px rgba(16,43,75,.3);animation:pop .45s ease both}
.sp-summary small{display:block;color:#9fbbdc;font-size:14px}
.sp-summary b{font-size:20px}
.sp-total{font-size:clamp(28px,3vw,40px);font-weight:900;color:#7dd3fc}
.sp-note{margin-top:20px!important;text-align:center!important;color:#6f8195;font-size:15.5px}
@media(max-width:1020px){.sp-plans{grid-template-columns:1fr;max-width:560px;margin-inline:auto}}
@media(max-width:640px){.sp-summary{flex-direction:column;align-items:stretch;text-align:center}.sp-summary .big{width:100%}}

/* responsive */
.cs section[id]{scroll-margin-top:var(--nav)}
@media(max-width:1180px){
  .cs-brand small{display:none}
  .cs-header nav button:not(.cs-ghost):not(.cs-solid){padding:10px 8px;font-size:14.5px}
  .cs-ghost{margin-left:4px;padding:0 16px}.cs-solid{padding:0 16px}
}
@media(max-width:1020px){
  .cs-burger{display:block}
  .cs-header nav{display:none;position:absolute;top:100%;left:0;right:0;background:#fff;flex-direction:column;align-items:stretch;padding:14px var(--pad) 22px;border-bottom:1px solid #e0e9f3;box-shadow:0 18px 30px rgba(26,65,112,.1);max-height:calc(100vh - var(--nav));overflow:auto}
  .cs-header nav.open{display:flex}
  .cs-header nav button:not(.cs-ghost):not(.cs-solid){text-align:left;font-size:16.5px}
  .cs-ghost{margin:6px 0 0}
  .cs-hero,.cs-search{min-height:0}
  .cs-hero-in,.cs-about,.cs-price,.cs-steps{grid-template-columns:1fr}
  .cs-lead{position:relative;right:auto;bottom:auto;margin:-40px auto 0}
  .cs-hero-art{flex-direction:column;align-items:center}
  .cs-stats,.cs-grid4{grid-template-columns:repeat(2,1fr)}
  .cs-grid3,.cs-plans{grid-template-columns:repeat(2,1fr)}
  .cs-rv.left,.cs-rv.right{transform:translateY(30px)}
  .cs-flow i{display:none}
}
@media(max-width:640px){
  .cs{font-size:16px;--nav:70px}
  .cs-stats,.cs-grid4,.cs-grid3,.cs-plans,.cs-form,.cs-price ul{grid-template-columns:1fr}
  .cs-est{grid-template-columns:repeat(2,1fr)}
  .cs-price{padding:20px}
  .cs-price-box strong{font-size:62px}
  .cs-form{padding:22px}
  .cs-row .big{width:100%}
  .cs-sfield{height:64px;padding-left:16px}
  .cs-orb{width:48px;height:48px;font-size:23px}
}
`;

export default CollegeSite;
