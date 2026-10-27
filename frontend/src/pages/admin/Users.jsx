import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

/* =====================================================================
   USERS (User Management)  -  single file (JSX + CSS)
   Usage:  import Users from "./Users";
           <Users />
   Same sidebar / topbar / card sizes as the Reports & Analytics page.
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
  {
    key: "users",
    label: "Total Users",
    value: 12458,
    trend: 8,
    up: true,
    icon: "👥",
    tone: "blue",
  },
  {
    key: "students",
    label: "Total Students",
    value: 10832,
    trend: 12,
    up: true,
    icon: "🎓",
    tone: "green",
  },
  {
    key: "colleges",
    label: "Total Colleges",
    value: 325,
    trend: 5,
    up: true,
    icon: "🏛",
    tone: "violet",
  },
  {
    key: "active",
    label: "Active Users",
    value: 11620,
    trend: 7,
    up: true,
    icon: "◉",
    tone: "orange",
  },
  {
    key: "inactive",
    label: "Inactive Users",
    value: 838,
    trend: 3,
    up: false,
    icon: "⊘",
    tone: "red",
  },
  {
    key: "pending",
    label: "Pending Approvals",
    value: 24,
    trend: 2,
    up: true,
    icon: "◔",
    tone: "teal",
  },
];

/* limit = student profiles allowed, price = plan payment, months = how long one plan lasts */
const PLAN_INFO = {
  Elite: { limit: 50, price: 3500, months: 3, color: "#2d8cff" },
  Gold: { limit: 100, price: 5000, months: 6, color: "#ffb02e" },
  Diamond: { limit: 200, price: 12000, months: 12, color: "#6c5ce7" },
};

const PLANS = [
  { key: "Elite", count: 120, pct: 37, color: "#2d8cff" },
  { key: "Gold", count: 135, pct: 42, color: "#ffb02e" },
  { key: "Diamond", count: 70, pct: 21, color: "#6c5ce7" },
];

const ACTIVITY = [
  {
    icon: "🏛",
    tone: "blue",
    text: "SNS College purchased 50 student profiles",
    time: "2 hours ago",
  },
  {
    icon: "⬆",
    tone: "violet",
    text: "KG College plan upgraded to Diamond",
    time: "4 hours ago",
  },
  {
    icon: "＋",
    tone: "orange",
    text: "New college registration: ABC Arts & Science",
    time: "6 hours ago",
  },
  {
    icon: "₹",
    tone: "green",
    text: "Payment received from PSG College",
    time: "8 hours ago",
  },
  {
    icon: "⊘",
    tone: "red",
    text: "User account deactivated: Bharathi College",
    time: "10 hours ago",
  },
];

const DISTRICTS = [
  "Coimbatore",
  "Chennai",
  "Erode",
  "Salem",
  "Madurai",
  "Tiruchirappalli",
  "Tiruppur",
  "Vellore",
];

/* ---------------------------------------------------------------------
   2. SMALL HELPERS / HOOKS
   --------------------------------------------------------------------- */
const money = (n) => `₹${n.toLocaleString("en-IN")}`;

/* ----- dates (all shown as DD-MM-YYYY) ----- */
const DAY = 86400000;
const p2 = (n) => String(n).padStart(2, "0");
const fmt = (d) =>
  `${p2(d.getDate())}-${p2(d.getMonth() + 1)}-${d.getFullYear()}`;
const parseDate = (text) => {
  const [d, m, y] = text.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const now = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
const addMonths = (d, n) => {
  const r = new Date(d.getFullYear(), d.getMonth() + n, 1);
  r.setDate(
    Math.min(
      d.getDate(),
      new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate(),
    ),
  );
  return r;
};
const spanDays = (t) => Math.max(1, Math.round((t.end - t.start) / DAY));

/* how long is left on a plan period -> label + colour tone */
const planState = (t) => {
  const days = Math.round((t.end - now()) / DAY);
  if (days < 0)
    return {
      tone: "off",
      label: `Expired ${-days} day${days === -1 ? "" : "s"} ago`,
    };
  if (days === 0) return { tone: "warn", label: "Expires today" };
  if (days <= 30)
    return {
      tone: "warn",
      label: `Expires in ${days} day${days === 1 ? "" : "s"}`,
    };
  return { tone: "ok", label: `${days} days left` };
};

/* plans = [[planName, "DD-MM-YYYY activated"], ...] oldest first, the last one is the current plan.
   A plan ends when its time is over, or earlier if the college moved to another plan. */
const buildTimeline = (plans) =>
  plans.map(([plan, from], i) => {
    const start = parseDate(from);
    const expiry = addMonths(start, PLAN_INFO[plan].months);
    const next = plans[i + 1] ? parseDate(plans[i + 1][1]) : null;
    return { plan, start, end: next && next < expiry ? next : expiry };
  });

const makeCollege = (id, name, email, district, used, active, plans, pay) => {
  const timeline = buildTimeline(plans);
  const plan = timeline[timeline.length - 1].plan;
  const info = PLAN_INFO[plan];
  return {
    id,
    name,
    email,
    district,
    plan,
    used,
    limit: info.limit,
    pay: pay || info.price,
    active,
    date: plans[0][1],
    timeline,
  };
};

const SEED = [
  makeCollege(
    "SNS001",
    "SNS College",
    "sns@college.ac.in",
    "Coimbatore",
    50,
    true,
    [
      ["Elite", "12-08-2025"],
      ["Gold", "15-06-2026"],
    ],
  ),
  makeCollege(
    "KG002",
    "KG College",
    "kg@college.ac.in",
    "Coimbatore",
    35,
    true,
    [
      ["Elite", "15-08-2025"],
      ["Gold", "20-01-2026"],
      ["Elite", "05-08-2026"],
    ],
  ),
  makeCollege(
    "PSG003",
    "PSG College",
    "psg@college.ac.in",
    "Coimbatore",
    28,
    true,
    [
      ["Gold", "18-08-2025"],
      ["Diamond", "10-03-2026"],
    ],
  ),
  makeCollege(
    "BRH004",
    "Bharathi College",
    "bharathi@college.ac.in",
    "Erode",
    20,
    false,
    [
      ["Gold", "20-08-2025"],
      ["Elite", "10-03-2026"],
    ],
    2000,
  ),
  makeCollege(
    "KCT005",
    "Kumaraguru College",
    "kct@college.ac.in",
    "Coimbatore",
    64,
    true,
    [
      ["Elite", "22-08-2025"],
      ["Gold", "22-11-2025"],
      ["Diamond", "01-04-2026"],
    ],
  ),
  makeCollege(
    "AUC006",
    "Anna Arts College",
    "anna@college.ac.in",
    "Chennai",
    41,
    true,
    [
      ["Elite", "25-08-2025"],
      ["Gold", "20-05-2026"],
    ],
  ),
  makeCollege(
    "SON007",
    "Sona College",
    "sona@college.ac.in",
    "Salem",
    18,
    false,
    [
      ["Gold", "28-08-2025"],
      ["Elite", "05-02-2026"],
    ],
  ),
  makeCollege(
    "TCE008",
    "Thiagarajar College",
    "tce@college.ac.in",
    "Madurai",
    57,
    true,
    [
      ["Elite", "02-09-2025"],
      ["Gold", "01-07-2026"],
    ],
  ),
  makeCollege(
    "RVS009",
    "RVS College",
    "rvs@college.ac.in",
    "Coimbatore",
    44,
    true,
    [
      ["Gold", "05-09-2025"],
      ["Gold", "01-06-2026"],
    ],
  ),
  makeCollege(
    "CIT010",
    "Coimbatore Institute",
    "cit@college.ac.in",
    "Coimbatore",
    20,
    true,
    [
      ["Elite", "08-09-2025"],
      ["Diamond", "12-01-2026"],
    ],
  ),
  makeCollege(
    "VIT011",
    "Vellore Institute College",
    "vit@college.ac.in",
    "Vellore",
    92,
    true,
    [
      ["Gold", "10-09-2025"],
      ["Diamond", "20-12-2025"],
    ],
  ),
  makeCollege(
    "NIC012",
    "Nehru Institute College",
    "nic@college.ac.in",
    "Coimbatore",
    31,
    true,
    [
      ["Elite", "12-09-2025"],
      ["Elite", "20-08-2026"],
    ],
  ),
  makeCollege(
    "SRM013",
    "SRM Arts College",
    "srm@college.ac.in",
    "Chennai",
    76,
    true,
    [
      ["Diamond", "15-09-2025"],
      ["Diamond", "20-09-2026"],
    ],
  ),
  makeCollege(
    "KEC014",
    "Kongu Engineering College",
    "kec@college.ac.in",
    "Erode",
    38,
    false,
    [
      ["Elite", "17-09-2025"],
      ["Gold", "05-03-2026"],
    ],
  ),
  makeCollege(
    "PSN015",
    "PSNA College",
    "psna@college.ac.in",
    "Dindigul",
    22,
    true,
    [
      ["Elite", "19-09-2025"],
      ["Gold", "15-02-2026"],
      ["Elite", "10-09-2026"],
    ],
  ),
  makeCollege(
    "NPR016",
    "National Polytechnic College",
    "npr@college.ac.in",
    "Tiruchirappalli",
    49,
    true,
    [
      ["Gold", "22-09-2025"],
      ["Gold", "01-05-2026"],
    ],
  ),
  makeCollege(
    "SSN017",
    "SSN College",
    "ssn@college.ac.in",
    "Chennai",
    58,
    true,
    [
      ["Elite", "24-09-2025"],
      ["Gold", "24-12-2025"],
      ["Diamond", "15-05-2026"],
    ],
  ),
  makeCollege(
    "CMS018",
    "CMS Arts & Science",
    "cms@college.ac.in",
    "Tiruppur",
    15,
    false,
    [
      ["Elite", "27-09-2025"],
      ["Elite", "01-03-2026"],
    ],
  ),
  makeCollege(
    "PKC019",
    "Park College",
    "park@college.ac.in",
    "Coimbatore",
    36,
    true,
    [
      ["Gold", "30-09-2025"],
      ["Diamond", "18-07-2026"],
    ],
  ),
  makeCollege(
    "JCT020",
    "JCT College",
    "jct@college.ac.in",
    "Coimbatore",
    27,
    true,
    [
      ["Elite", "04-10-2025"],
      ["Elite", "12-10-2026"],
    ],
  ),
];

/* cursor / touch position for the smoke glow on the stat cards */
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
const glowProps = {
  onPointerMove: glow,
  onPointerEnter: glow,
  onPointerDown: glow,
};

/* animated count-up number */
function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setVal(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return Math.round(val).toLocaleString("en-IN");
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

function CountNum({ value }) {
  return <>{useCountUp(value, 1000)}</>;
}

/* clears the session, fades the page out and goes to the login page */
function useLogout() {
  return () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      /* storage not available - ignore */
    }
    document.querySelector(".um-app")?.classList.add("is-leaving");
    setTimeout(() => window.location.replace("/login"), 350);
  };
}

/* ---------------------------------------------------------------------
   3. LAYOUT  (sidebar + topbar - same as the Reports page)
   --------------------------------------------------------------------- */
function Sidebar({ open, onClose }) {
  const logout = useLogout();

  return (
    <>
      <div className={`um-overlay ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`um-sidebar ${open ? "open" : ""}`}>
        <div className="um-brand">
          <div className="um-logo">🎓</div>
          <div>
            <strong>
              Student<span>College</span>
            </strong>
            <small>Admission Platform</small>
          </div>
        </div>

        <p className="um-menu-title">Main Menu</p>
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

        <div className="um-sidebar-foot">
          <div className="um-user">
            <span className="um-avatar">A</span>
            <div>
              <strong>Admin</strong>
              <small>Super Admin</small>
            </div>
          </div>
          <button type="button" className="um-logout" onClick={logout}>
            ↪ Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenu, query, setQuery }) {
  const logout = useLogout();

  return (
    <header className="um-topbar">
      <button
        type="button"
        className="um-burger"
        onClick={onMenu}
        aria-label="Open navigation menu"
      >
        ☰
      </button>

      <label className="um-search top">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M20 20l-4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users, colleges, students..."
        />
      </label>

      <button type="button" className="um-bell" aria-label="Notifications">
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
        className="um-profile"
        title="Logout"
        aria-label="Admin - click to logout"
        onClick={logout}
      >
        <span className="um-profile-icon">A</span>
        <span className="um-profile-copy">
          <strong>Admin</strong>
          <small>Super Admin</small>
        </span>
        <span className="um-profile-chev">⌄</span>
      </button>
    </header>
  );
}

function Card({ title, sub, delay = 0, className = "", children, action }) {
  return (
    <section
      className={`um-card ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <header className="um-card-head">
        <div>
          <h3>{title}</h3>
          {sub && <p>{sub}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------------
   4. SECTIONS
   --------------------------------------------------------------------- */
/* 6 stat cards on top - smoke glow follows the cursor / finger */
function StatCard({ stat, index }) {
  const value = useCountUp(stat.value);
  return (
    <div
      className={`um-stat um-glow um-tone-${stat.tone}`}
      style={{ animationDelay: `${index * 80}ms` }}
      {...glowProps}
    >
      <div className="um-stat-top">
        <span className={`um-badge ${stat.tone}`}>
          <i
            className="um-blink"
            style={{ animationDelay: `${index * 0.25}s` }}
          >
            {stat.icon}
          </i>
        </span>
        <p>{stat.label}</p>
      </div>
      <h2 className={stat.tone === "red" ? "red" : ""}>{value}</h2>
      <small>
        <b className={stat.up ? "" : "down"}>
          {stat.up ? "↑" : "↓"} {stat.trend}%
        </b>{" "}
        from last month
      </small>
    </div>
  );
}

function PurchasesCard({ rows }) {
  const ready = useReady();
  /* top 5 colleges by student profiles used - taken from the College Accounts table */
  const PURCHASES = [...rows]
    .sort((a, b) => b.used - a.used)
    .slice(0, 5)
    .map((r) => ({ id: r.id, name: r.name, value: r.used }));
  const max = Math.max(1, ...PURCHASES.map((p) => p.value));

  return (
    <Card
      title="College-wise Student Purchases"
      sub="Top colleges by purchased student profiles"
      delay={120}
      className="fill"
    >
      <div className="um-bars">
        {PURCHASES.map((p, i) => (
          <div className="um-bar-row" key={p.id}>
            <span>{p.name}</span>
            <div className="um-bar-track">
              <i
                className={ready ? "go" : ""}
                style={{
                  width: `${(p.value / max) * 100}%`,
                  animationDelay: `${i * 90}ms`,
                }}
              />
            </div>
            <b>
              <CountNum value={p.value} />
            </b>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* Plan Distribution: same interactive donut as Lead Status, with gaps between the rings */
function PlanCard({ plans, total }) {
  const ready = useReady();
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const toggle = (key) => setSelected((cur) => (cur === key ? null : key));
  const count = useCountUp(total);

  const shown = hover || selected;
  const active = plans.find((p) => p.key === shown);
  const R = 52;
  const C = 2 * Math.PI * R;
  const GAP = 7; /* gap between two rings */

  let acc = 0;
  const segs = plans.map((p) => {
    const len = (p.count / total) * C;
    const seg = { ...p, len, offset: acc };
    acc += len;
    return seg;
  });

  return (
    <Card
      title="Plan Distribution"
      sub="Active plans across all colleges"
      delay={200}
    >
      <div className="um-plan">
        <div className="um-donut">
          <svg viewBox="0 0 140 140" role="img" aria-label="Plan distribution">
            <circle className="um-track" cx="70" cy="70" r={R} />
            {segs.map((s) => (
              <circle
                key={s.key}
                className={`um-seg ${shown === s.key ? "on" : ""} ${shown && shown !== s.key ? "dim" : ""}`}
                cx="70"
                cy="70"
                r={R}
                stroke={s.color}
                strokeDasharray={`${ready ? Math.max(s.len - GAP, 0) : 0} ${C}`}
                strokeDashoffset={-(s.offset + GAP / 2)}
                onMouseEnter={() => setHover(s.key)}
                onMouseLeave={() => setHover(null)}
                onClick={() => toggle(s.key)}
              />
            ))}
          </svg>
          <div
            className="um-donut-center"
            style={active ? { "--c": active.color } : undefined}
          >
            <strong>
              {active ? active.count.toLocaleString("en-IN") : count}
            </strong>
            <span>{active ? `${active.key} Plan` : "Total Colleges"}</span>
            {active && <b>{active.pct}% of total</b>}
          </div>
        </div>

        <div className="um-legend">
          {plans.map((p, i) => (
            <div
              key={p.key}
              className={`um-legend-row ${shown === p.key ? "on" : ""}`}
              style={{ "--c": p.color, animationDelay: `${i * 70}ms` }}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setHover(p.key)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p.key)}
              onBlur={() => setHover(null)}
              onClick={() => toggle(p.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(p.key);
                }
              }}
            >
              <div className="um-legend-top">
                <i />
                <span>{p.key} Plan</span>
                <em>({p.count})</em>
                <b>{p.pct}%</b>
              </div>
              <div className="um-legend-bar">
                <i
                  className={ready ? "go" : ""}
                  style={{ width: `${p.pct}%`, animationDelay: `${i * 90}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ActivityCard({ items }) {
  return (
    <Card title="Recent Activity" delay={280} className="fill um-act">
      <ul className="um-activity">
        {items.map((a, i) => (
          <li key={a.key || a.text} style={{ animationDelay: `${i * 70}ms` }}>
            <span
              className={`um-badge small ${a.tone}`}
              style={{ animationDelay: `${i * 0.9}s` }}
            >
              {a.icon}
            </span>
            <div>
              <p>{a.text}</p>
              <small>{a.time}</small>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

const PAGE_SIZE = 10;

/* College Accounts table (turns into cards on mobile) */
function CollegeTable({ rows, filters, onView, onAdd }) {
  const { query, setQuery, status, setStatus, plan, setPlan, dirty, reset } =
    filters;

  /* 10 colleges per page - back to page 1 whenever search / filters change */
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [query, status, plan]);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const first = (current - 1) * PAGE_SIZE;
  const visible = rows.slice(first, first + PAGE_SIZE);

  return (
    <Card
      title="College Accounts"
      delay={340}
      className="flat"
      action={
        <div className="um-tools">
          <label className="um-search">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 20l-4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search college name, email, plan..."
            />
          </label>
          <select
            className="um-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select
            className="um-select"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            <option>All Plans</option>
            <option>Elite</option>
            <option>Gold</option>
            <option>Diamond</option>
          </select>
          <button
            type="button"
            className="um-btn light um-reset"
            onClick={reset}
            disabled={!dirty}
          >
            ↺ Reset
          </button>
          <button type="button" className="um-btn primary" onClick={onAdd}>
            ＋ Add College Account
          </button>
        </div>
      }
    >
      <div className="um-table-wrap">
        <table className="um-table">
          <thead>
            <tr>
              <th>College Name</th>
              <th>College ID</th>
              <th className="um-col-email">Official Email</th>
              <th>District</th>
              <th>Plan</th>
              <th>Student Profiles</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Registered On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id}>
                <td data-label="College Name" className="name">
                  {r.name}
                </td>
                <td data-label="College ID">{r.id}</td>
                <td data-label="Official Email" className="um-col-email">
                  {r.email}
                </td>
                <td data-label="District">{r.district}</td>
                <td data-label="Plan">{r.plan}</td>
                <td data-label="Student Profiles">
                  {r.used} / {r.limit}
                </td>
                <td data-label="Payment">{money(r.pay)}</td>
                <td data-label="Status">
                  <span className={`um-chip ${r.active ? "ok" : "off"}`}>
                    {r.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td data-label="Registered On">{r.date}</td>
                <td data-label="Actions" className="act">
                  <button
                    type="button"
                    className="um-view"
                    onClick={() => onView(r.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <p className="um-empty">No colleges match your search.</p>
        )}
      </div>
      <div className="um-foot">
        <p>
          Showing {rows.length ? first + 1 : 0}-{first + visible.length} of{" "}
          {rows.length} college accounts
        </p>
        {pages > 1 && (
          <div className="um-pager" role="navigation" aria-label="Pagination">
            <button
              type="button"
              className="um-page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
            >
              ‹ Prev
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i + 1}
                type="button"
                className={`um-page ${current === i + 1 ? "on" : ""}`}
                aria-current={current === i + 1 ? "page" : undefined}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              className="um-page"
              disabled={current === pages}
              onClick={() => setPage(current + 1)}
            >
              Next ›
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------------
   5. POPUPS  (View college / Add college)
   --------------------------------------------------------------------- */
/* closes on Esc, locks the page scroll while open */
function useModal(onClose) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
}

function ViewModal({ college, onClose, onToggle }) {
  useModal(onClose);
  const { timeline } = college;
  const current = timeline[timeline.length - 1];
  const state = planState(current);
  const used = Math.round((college.used / college.limit) * 100);
  const spent = Math.min(
    100,
    Math.max(
      0,
      ((now() - current.start) / (current.end - current.start)) * 100,
    ),
  );

  /* earlier plans, newest first - "early" = college moved to another plan before this one ran out */
  const previous = timeline
    .slice(0, -1)
    .map((t, i) => ({
      ...t,
      next: timeline[i + 1],
      early: t.end < addMonths(t.start, PLAN_INFO[t.plan].months),
    }))
    .reverse();

  const fields = [
    ["Official Email", college.email],
    ["District", college.district],
    ["Payment", money(college.pay)],
    ["Registered On", college.date],
    ["Status", college.active ? "Active" : "Inactive"],
    ["Plans Taken", String(timeline.length)],
  ];

  return (
    <div className="um-modal-back" onClick={onClose}>
      <div
        className="um-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="um-modal-head">
          <span className="um-badge violet">🏛</span>
          <div>
            <h3>{college.name}</h3>
            <p>College ID: {college.id}</p>
          </div>
          <button
            type="button"
            className="um-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="um-modal-body">
          <div className="um-details">
            {fields.map(([label, value]) => (
              <div key={label}>
                <small>{label}</small>
                <b>{value}</b>
              </div>
            ))}
          </div>

          {/* current plan: name, when it started, when it ends */}
          <div
            className={`um-current ${state.tone}`}
            style={{ "--c": PLAN_INFO[current.plan].color }}
          >
            <div className="um-current-top">
              <div>
                <small>Current plan</small>
                <strong>
                  <i />
                  {current.plan} Plan
                </strong>
              </div>
              <span className={`um-chip ${state.tone}`}>{state.label}</span>
            </div>
            <div className="um-bar-track">
              <i className="go" style={{ width: `${spent}%` }} />
            </div>
            <div className="um-dates">
              <span>
                Activated <b>{fmt(current.start)}</b>
              </span>
              <span>
                Expires <b>{fmt(current.end)}</b>
              </span>
            </div>
          </div>

          <div className="um-usage">
            <div>
              <small>Student profiles used</small>
              <b>
                {college.used} / {college.limit}
              </b>
            </div>
            <div className="um-bar-track">
              <i className="go" style={{ width: `${used}%` }} />
            </div>
          </div>

          {/* previous plans: coloured bar + timeline */}
          <div className="um-block">
            <div className="um-block-head">
              <b>Previous Plans</b>
              <small>
                {previous.length ? `${previous.length} earlier` : "none yet"}
              </small>
            </div>

            <div className="um-journey" aria-label="Plan journey">
              {timeline.map((t) => (
                <i
                  key={`${t.plan}-${fmt(t.start)}`}
                  style={{
                    flex: spanDays(t),
                    background: PLAN_INFO[t.plan].color,
                  }}
                  title={`${t.plan}: ${fmt(t.start)} to ${fmt(t.end)}`}
                />
              ))}
            </div>
            <div className="um-journey-key">
              {[...new Set(timeline.map((t) => t.plan))].map((name) => (
                <span key={name} style={{ "--c": PLAN_INFO[name].color }}>
                  <i />
                  {name}
                </span>
              ))}
            </div>

            {previous.length ? (
              <ul className="um-timeline">
                {previous.map((t) => (
                  <li
                    key={`${t.plan}-${fmt(t.start)}`}
                    style={{ "--c": PLAN_INFO[t.plan].color }}
                  >
                    <div className="um-tl-top">
                      <strong>{t.plan} Plan</strong>
                      <em>
                        {t.early ? `Moved to ${t.next.plan}` : "Plan expired"}
                      </em>
                    </div>
                    <div className="um-dates">
                      <span>
                        Activated <b>{fmt(t.start)}</b>
                      </span>
                      <span>
                        Ended <b>{fmt(t.end)}</b>
                      </span>
                      <span>{spanDays(t)} days</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="um-none">
                This college has not used any other plan before.
              </p>
            )}
          </div>
        </div>

        <div className="um-modal-foot">
          <button type="button" className="um-btn light" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className={`um-btn ${college.active ? "danger" : "primary"}`}
            onClick={() => onToggle(college.id)}
          >
            {college.active ? "Deactivate Account" : "Activate Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddModal({ onClose, onSave }) {
  useModal(onClose);
  const [form, setForm] = useState({
    name: "",
    email: "",
    district: DISTRICTS[0],
    plan: "Elite",
  });
  const [error, setError] = useState("");
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Enter the college name.");
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return setError("Enter a valid official email.");
    onSave({ ...form, name: form.name.trim() });
  };

  return (
    <div className="um-modal-back" onClick={onClose}>
      <form
        className="um-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        noValidate
      >
        <div className="um-modal-head">
          <div>
            <h3>Add College Account</h3>
            <p>Create a new college login with a plan</p>
          </div>
          <button
            type="button"
            className="um-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="um-modal-body um-form">
          <label>
            College Name
            <input
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. ABC Arts & Science College"
            />
          </label>
          <label>
            Official Email
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="name@college.ac.in"
            />
          </label>
          <label>
            District
            <select value={form.district} onChange={set("district")}>
              {DISTRICTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <label>
            Plan
            <select value={form.plan} onChange={set("plan")}>
              {Object.keys(PLAN_INFO).map((p) => (
                <option key={p} value={p}>
                  {p} - {money(PLAN_INFO[p].price)} / {PLAN_INFO[p].limit}{" "}
                  profiles
                </option>
              ))}
            </select>
          </label>
          {error && <p className="um-error">{error}</p>}
        </div>

        <div className="um-modal-foot">
          <button type="button" className="um-btn light" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="um-btn primary">
            Add College
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------------------
   6. PAGE
   --------------------------------------------------------------------- */
export default function Users({ embedded = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rows, setRows] = useState(SEED);
  const [activity, setActivity] = useState(ACTIVITY);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const [plan, setPlan] = useState("All Plans");
  const [viewId, setViewId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const log = (icon, tone, text) =>
    setActivity((list) =>
      [{ key: Date.now(), icon, tone, text, time: "Just now" }, ...list].slice(
        0,
        5,
      ),
    );

  /* activate / deactivate from the View popup */
  const toggleStatus = (id) => {
    const target = rows.find((r) => r.id === id);
    if (!target) return;
    setRows((list) =>
      list.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    );
    log(
      target.active ? "⊘" : "✔",
      target.active ? "red" : "green",
      `User account ${target.active ? "deactivated" : "activated"}: ${target.name}`,
    );
    setToast(`${target.name} ${target.active ? "deactivated" : "activated"}`);
  };

  const addCollege = (form) => {
    const info = PLAN_INFO[form.plan];
    const letters = form.name
      .replace(/[^a-z]/gi, "")
      .slice(0, 3)
      .toUpperCase()
      .padEnd(3, "X");
    const row = {
      id: `${letters}${String(rows.length + 1).padStart(3, "0")}`,
      name: form.name,
      email: form.email,
      district: form.district,
      plan: form.plan,
      used: 0,
      limit: info.limit,
      pay: info.price,
      active: true,
      date: fmt(now()),
      timeline: [
        { plan: form.plan, start: now(), end: addMonths(now(), info.months) },
      ],
      added: true,
    };
    setRows((list) => [row, ...list]);
    log("＋", "orange", `New college registration: ${row.name}`);
    setToast(`${row.name} added`);
    setShowAdd(false);
  };

  /* new colleges also move the stat card + donut numbers */
  const added = rows.filter((r) => r.added);
  const stats = STATS.map((s) =>
    s.key === "colleges" ? { ...s, value: s.value + added.length } : s,
  );
  const plans = PLANS.map((p) => ({
    ...p,
    count: p.count + added.filter((r) => r.plan === p.key).length,
  }));
  const totalColleges = plans.reduce((sum, p) => sum + p.count, 0);
  plans.forEach((p) => {
    if (added.length) p.pct = Math.round((p.count / totalColleges) * 100);
  });

  /* Reset button: clears search + both filters */
  const dirty = query !== "" || status !== "All Status" || plan !== "All Plans";
  const reset = () => {
    setQuery("");
    setStatus("All Status");
    setPlan("All Plans");
  };

  const q = query.trim().toLowerCase();
  const shown = rows.filter((r) => {
    if (status !== "All Status" && (status === "Active") !== r.active)
      return false;
    if (plan !== "All Plans" && r.plan !== plan) return false;
    return (
      !q ||
      [r.name, r.id, r.email, r.district, r.plan]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  });

  const viewing = rows.find((r) => r.id === viewId);

  return (
    <div
      className={`um-app ${embedded ? "um-embedded" : ""} ${viewing || showAdd ? "um-paused" : ""}`}
    >
      <style>{CSS}</style>

      {!embedded && (
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}

      <main className="um-main">
        {!embedded && (
          <Topbar
            onMenu={() => setMenuOpen(true)}
            query={query}
            setQuery={setQuery}
          />
        )}

        <div className="um-content">
          <div className="um-header">
            <div className="um-title">
              <h1>User Management</h1>
              <p>Manage students, college accounts, plans and payments</p>
            </div>
          </div>

          <div className="um-stats">
            {stats.map((s, i) => (
              <StatCard key={s.key} stat={s} index={i} />
            ))}
          </div>

          <div className="um-row three">
            <PurchasesCard rows={rows} />
            <PlanCard plans={plans} total={totalColleges} />
            <ActivityCard items={activity} />
          </div>

          <CollegeTable
            rows={shown}
            filters={{
              query,
              setQuery,
              status,
              setStatus,
              plan,
              setPlan,
              dirty,
              reset,
            }}
            onView={setViewId}
            onAdd={() => setShowAdd(true)}
          />
        </div>
      </main>

      {viewing && (
        <ViewModal
          college={viewing}
          onClose={() => setViewId(null)}
          onToggle={toggleStatus}
        />
      )}
      {showAdd && (
        <AddModal onClose={() => setShowAdd(false)} onSave={addCollege} />
      )}

      {toast && (
        <div className="um-toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   7. CSS  (injected through the <style> tag above)
   --------------------------------------------------------------------- */
const CSS = `
/* ===== base ===== */
.um-app {
  --navy: #0f2447;
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
  transition: opacity .35s ease;
}

.um-app.is-leaving {
  opacity: 0;
  pointer-events: none;
}

.um-app *, .um-app *::before, .um-app *::after {
  box-sizing: border-box;
}

.um-app h1, .um-app h2, .um-app h3, .um-app p, .um-app ul {
  margin: 0;
  padding: 0;
}

.um-app ul {
  list-style: none;
}

:where(.um-app) button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: none;
  color: inherit;
}

.um-app small {
  color: var(--muted);
}

.um-app.um-embedded {
  position: relative;
  inset: auto;
  z-index: auto;
  display: block;
  overflow: visible;
  background: transparent;
}

.um-embedded .um-content {
  padding: 0;
  max-width: none;
}

/* ===== keyframes ===== */
@keyframes umFadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes umFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes umPop {
  from {
    opacity: 0;
    transform: scale(.92) translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes umPopIn {
  from {
    opacity: 0;
    transform: scale(.94);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes umSlide {
  from {
    opacity: 0;
    transform: translateX(-14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes umNavIn {
  from {
    opacity: 0;
    transform: translateX(-18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes umBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .25;
  }
}

@keyframes umIconBlink {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: .2;
    transform: scale(.85);
  }
}

@keyframes umBarGrow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes umToast {
  from {
    opacity: 0;
    transform: translate(-50%, 12px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes umGlowDrift {
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

/* ===== sidebar (same size as the Reports page) ===== */
.um-sidebar {
  position: sticky;
  top: 0;
  width: 236px;
  height: 100vh;
  height: 100dvh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #112746;
  color: #fff;
  overflow: hidden;
  z-index: 60;
  transition: transform .35s cubic-bezier(.4, 0, .2, 1);
}

.um-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  height: 82px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, .07);
}

.um-logo {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-size: 20px;
  background: rgba(255, 255, 255, .1);
  border-radius: 11px;
}

.um-sidebar .um-brand strong {
  display: block;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
}

.um-sidebar .um-brand strong span {
  color: #58a1ff;
}

.um-sidebar .um-brand small {
  display: block;
  margin-top: 3px;
  color: #91a5c2;
  font-size: 9px;
}

.um-sidebar .um-menu-title {
  width: 100%;
  margin: 24px 0 10px;
  color: #6f86a7;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
}

.um-sidebar nav {
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
}

.um-sidebar nav::-webkit-scrollbar {
  display: none;
}

.um-sidebar nav a {
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
  transition: background .2s, color .2s;
  animation: umNavIn .45s both;
  animation-delay: calc(var(--i, 0) * 45ms);
}

.um-sidebar nav a span {
  width: 20px;
  text-align: center;
  font-size: 16px;
}

.um-sidebar nav a:hover {
  background: rgba(255, 255, 255, .07);
  color: #fff;
}

.um-sidebar nav a.active {
  background: #2177e8;
  color: #fff;
  box-shadow: 0 6px 18px rgba(33, 119, 232, .2);
}

.um-sidebar-foot {
  flex-shrink: 0;
  padding: 14px;
  border-top: 1px solid rgba(255, 255, 255, .07);
}

.um-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, .055);
  border-radius: 10px;
}

.um-sidebar .um-user strong {
  display: block;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.um-sidebar .um-user small {
  display: block;
  margin-top: 2px;
  color: #8196b5;
  font-size: 9px;
}

.um-avatar {
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

.um-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 34px;
  margin-top: 8px;
  color: #93a6c0;
  font-size: 11px;
  border-radius: 8px;
  transition: background .2s, color .2s;
}

.um-logout:hover {
  background: rgba(255, 255, 255, .07);
  color: #fff;
}

.um-overlay {
  display: none;
}

/* ===== main + topbar (same size as the Reports page) ===== */
.um-main {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: clip;
}

.um-content {
  position: relative;
  z-index: 1;
  padding: 24px 28px 32px;
  max-width: 1500px;
  margin: 0 auto;
}

.um-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 72px;
  padding: 0 30px;
  background: rgba(255, 255, 255, .97);
  border-bottom: 1px solid var(--line);
}

.um-burger {
  display: none;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-size: 18px;
  color: var(--text);
  background: var(--bg);
  border-radius: 10px;
  transition: background .2s;
}

.um-burger:hover {
  background: #eaf1ff;
}

.um-bell {
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

.um-bell:hover {
  background: #eef3fb;
}

.um-bell svg {
  display: block;
  width: 20px;
  height: 20px;
}

.um-bell .dot {
  fill: #f05260;
  animation: umBlink 1.2s ease-in-out infinite;
}

.um-profile {
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

.um-profile:hover {
  background: #eef3fb;
}

.um-profile:hover .um-profile-chev {
  color: #e0384a;
}

.um-profile-icon {
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

.um-profile-copy strong, .um-profile-copy small {
  display: block;
  white-space: nowrap;
}

.um-profile-copy strong {
  color: #18385f;
  font-size: 12px;
}

.um-profile-copy small {
  margin-top: 3px;
  color: #8294af;
  font-size: 10px;
}

.um-profile-chev {
  color: #7186a6;
  font-size: 11px;
}

/* search box (topbar + table) */
.um-search {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 240px;
  min-width: 0;
  max-width: 300px;
  height: 40px;
  padding: 0 12px;
  color: #8294af;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  transition: border-color .2s, box-shadow .2s;
}

.um-search:focus-within {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(45, 140, 255, .12);
}

.um-search.top {
  flex: 1 1 auto;
  width: 100%;
  max-width: 440px;
  background: var(--bg);
}

.um-search svg {
  flex-shrink: 0;
}

.um-search input {
  flex: 1;
  min-width: 0;
  height: 100%;
  font: inherit;
  font-size: 13px;
  color: var(--text);
  background: transparent;
  border: 0;
  outline: 0;
}

/* ===== page header ===== */
.um-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 22px;
  animation: umFadeUp .6s .1s both;
}

.um-title h1 {
  font-size: 26px;
  font-weight: 800;
  color: #1d1a63;
}

.um-title p {
  margin-top: 4px;
  font-size: 14px;
  color: var(--muted);
}

/* ===== buttons ===== */
.um-btn {
  height: 40px;
  padding: 0 18px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 10px;
  transition: transform .2s, box-shadow .25s, background .25s;
}

.um-btn:hover {
  transform: translateY(-2px);
}

.um-btn.primary {
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #2d8cff);
  box-shadow: 0 8px 18px rgba(37, 99, 235, .28);
}

.um-btn.primary:hover {
  box-shadow: 0 12px 24px rgba(37, 99, 235, .4);
}

.um-btn.light {
  color: var(--text);
  background: #fff;
  border: 1px solid var(--line);
}

.um-btn:disabled {
  opacity: .5;
  cursor: not-allowed;
  transform: none;
}

.um-btn.danger {
  color: #fff;
  background: var(--red);
  box-shadow: 0 8px 18px rgba(255, 92, 92, .28);
}

/* ===== stat cards + smoke glow ===== */
.um-stats {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.um-stat {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 18px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  transition: transform .3s, box-shadow .3s;
  animation: umFadeUp .6s backwards;
}

.um-stat:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(40, 50, 110, .12);
}

.um-stat-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.um-stat-top p {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted);
}

.um-stat h2 {
  margin: 14px 0 8px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -.5px;
  color: #0f1b33;
}

.um-stat h2.red {
  color: #e0384a;
}

.um-stat small {
  display: block;
  font-size: 12px;
}

.um-stat small b {
  color: var(--green);
}

.um-stat small b.down {
  color: var(--red);
}

.um-blink {
  display: inline-block;
  font-style: normal;
  line-height: 1;
  animation: umIconBlink 1.6s ease-in-out infinite;
}

.um-tone-violet {
  --glow: 108, 92, 231;
}

.um-tone-green {
  --glow: 20, 184, 138;
}

.um-tone-blue {
  --glow: 45, 140, 255;
}

.um-tone-orange {
  --glow: 245, 147, 0;
}

.um-tone-red {
  --glow: 255, 92, 92;
}

.um-tone-teal {
  --glow: 20, 170, 160;
}

.um-glow::before, .um-glow::after {
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

.um-glow::before {
  width: 120px;
  height: 120px;
  margin: -60px 0 0 -60px;
  background: radial-gradient(circle, rgba(var(--glow), .5) 0%, rgba(var(--glow), .2) 45%, transparent 70%);
  transition: left .45s ease-out, top .45s ease-out, opacity .35s, transform .45s;
}

.um-glow::after {
  width: 190px;
  height: 190px;
  margin: -95px 0 0 -95px;
  background: radial-gradient(circle, rgba(var(--glow), .3) 0%, rgba(var(--glow), .1) 50%, transparent 72%);
  transition: left .95s ease-out, top .95s ease-out, opacity .5s, transform .7s;
}

.um-glow:hover::before, .um-glow:hover::after, .um-glow.is-glowing::before, .um-glow.is-glowing::after {
  opacity: 1;
  transform: scale(1);
  animation: umGlowDrift 2.6s ease-in-out infinite alternate;
}

.um-glow:hover::after, .um-glow.is-glowing::after {
  animation-duration: 3.4s;
  animation-direction: alternate-reverse;
}

/* ===== colored badges ===== */
.um-badge {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
}

.um-badge.small {
  width: 34px;
  height: 34px;
  font-size: 14px;
  border-radius: 10px;
}

.um-badge.violet {
  color: #6c5ce7;
  background: #ece9ff;
}

.um-badge.green {
  color: var(--green);
  background: #daf5ec;
}

.um-badge.blue {
  color: var(--blue);
  background: #dcecff;
}

.um-badge.orange {
  color: #f59300;
  background: #fff0d6;
}

.um-badge.red {
  color: var(--red);
  background: #ffe3e3;
}

.um-badge.teal {
  color: #14aaa0;
  background: #d9f6ee;
}

/* ===== rows + cards ===== */
.um-row {
  display: grid;
  gap: 16px;
  margin-bottom: 20px;
}

.um-row.three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.um-card {
  min-width: 0;
  padding: 20px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  transition: transform .3s, box-shadow .3s;
  animation: umFadeUp .7s backwards;
}

.um-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(40, 50, 110, .1);
}

.um-card.flat:hover {
  transform: none;
  box-shadow: none;
}

.um-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.um-card-head h3 {
  font-size: 17px;
  font-weight: 700;
  color: #1d1a63;
}

.um-card-head p {
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--muted);
}

/* ===== purchases bars ===== */
.um-bars {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.um-bar-row {
  display: grid;
  grid-template-columns: 124px minmax(0, 1fr) 30px;
  align-items: center;
  gap: 12px;
  font-size: 12.5px;
}

.um-bar-row span {
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.um-bar-row b {
  text-align: right;
}

.um-bar-track {
  height: 10px;
  overflow: hidden;
  background: #eef2f9;
  border-radius: 99px;
}

.um-bar-track i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #4aa8ff);
  border-radius: 99px;
  transform: scaleX(0);
  transform-origin: left;
}

.um-bar-track i.go {
  animation: umBarGrow 1s cubic-bezier(.2, .8, .2, 1) both;
}

/* ===== plan distribution (interactive donut, same animation as Lead Status) ===== */
.um-plan {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.um-donut {
  position: relative;
  flex-shrink: 0;
  width: 176px;
  height: 176px;
  animation: umPopIn .5s ease both;
}

.um-donut svg {
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  overflow: visible;
}

.um-track {
  fill: none;
  stroke: #eef0f8;
  stroke-width: 18;
}

.um-seg {
  fill: none;
  stroke-width: 18;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: stroke-dasharray 1.1s cubic-bezier(.2, .8, .2, 1), stroke-width .25s, opacity .25s;
}

.um-seg.on {
  stroke-width: 23;
}

.um-seg.dim {
  opacity: .25;
}

.um-donut-center {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  text-align: center;
  pointer-events: none;
}

.um-donut-center strong {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.1;
}

.um-donut-center span {
  margin-top: 2px;
  font-size: 11.5px;
  color: var(--muted);
}

.um-donut-center b {
  margin-top: 4px;
  font-size: 12px;
  color: var(--c, var(--primary));
}

.um-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;
}

.um-legend-row {
  padding: 10px 12px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  cursor: pointer;
  animation: umSlide .5s backwards;
  transition: border-color .2s, box-shadow .2s, transform .2s;
}

.um-legend-row:hover, .um-legend-row.on {
  border-color: var(--c);
  box-shadow: 0 6px 16px rgba(15, 36, 71, .08);
  transform: translateX(2px);
}

.um-legend-row:focus-visible {
  outline: 2px solid var(--c);
  outline-offset: 2px;
}

.um-legend-top {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
}

.um-legend-top i {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  background: var(--c);
  border-radius: 50%;
}

.um-legend-top span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.um-legend-top em {
  font-style: normal;
  font-weight: 500;
  color: var(--muted);
}

.um-legend-top b {
  margin-left: auto;
  font-weight: 700;
}

.um-legend-bar {
  height: 6px;
  margin-top: 8px;
  overflow: hidden;
  background: #eef2f9;
  border-radius: 99px;
}

.um-legend-bar i {
  display: block;
  height: 100%;
  background: var(--c);
  border-radius: 99px;
  transform: scaleX(0);
  transform-origin: left;
}

.um-legend-bar i.go {
  animation: umBarGrow 1s cubic-bezier(.2, .8, .2, 1) both;
}

/* ===== recent activity ===== */
.um-activity {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.um-activity li {
  display: flex;
  align-items: center;
  gap: 12px;
  animation: umSlide .5s backwards;
}

.um-activity p {
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.35;
}

.um-activity small {
  font-size: 11.5px;
}

/* ===== recent activity: icons blink one by one, then 2 smokes mix and fill the card (10s loop) ===== */
.um-act {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.um-act > * {
  position: relative;
  z-index: 1;
}

.um-act .um-badge {
  animation: umActBlink 10s ease-in-out infinite;
}

.um-act::before, .um-act::after {
  content: "";
  position: absolute;
  z-index: 0;
  width: 210px;
  height: 210px;
  margin: -105px 0 0 -105px;
  border-radius: 50%;
  filter: blur(28px);
  opacity: 0;
  pointer-events: none;
}

/* smoke 1: from top-left corner */
.um-act::before {
  background: radial-gradient(circle, rgba(255, 64, 129, .65) 0%, rgba(255, 64, 129, .25) 50%, transparent 72%);
  animation: umSmokeA 10s ease-in-out infinite;
}

/* smoke 2: from bottom-right corner */
.um-act::after {
  background: radial-gradient(circle, rgba(0, 198, 255, .65) 0%, rgba(0, 198, 255, .25) 50%, transparent 72%);
  animation: umSmokeB 10s ease-in-out infinite;
}

@keyframes umActBlink {
  0%, 9%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  4.5% {
    opacity: .2;
    transform: scale(.85);
  }
}

@keyframes umSmokeA {
  0%, 45% {
    left: 0;
    top: 0;
    opacity: 0;
    transform: scale(.5);
  }
  52% {
    opacity: .9;
  }
  75% {
    left: 50%;
    top: 50%;
    opacity: .9;
    transform: scale(1);
  }
  100% {
    left: 50%;
    top: 50%;
    opacity: 0;
    transform: scale(1.1);
  }
}

@keyframes umSmokeB {
  0%, 45% {
    left: 100%;
    top: 100%;
    opacity: 0;
    transform: scale(.5);
  }
  52% {
    opacity: .9;
  }
  75% {
    left: 50%;
    top: 50%;
    opacity: .9;
    transform: scale(1);
  }
  100% {
    left: 50%;
    top: 50%;
    opacity: 0;
    transform: scale(1.1);
  }
}

/* ===== college accounts table ===== */
.um-tools {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  flex: 1 1 auto;
  justify-content: flex-end;
}

.um-select {
  height: 40px;
  padding: 0 12px;
  font: inherit;
  font-size: 13px;
  color: var(--text);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  outline: 0;
  cursor: pointer;
}

.um-select:focus {
  border-color: var(--blue);
}

.um-table-wrap {
  overflow-x: auto;
}

.um-table {
  width: 100%;
  min-width: 880px;
  border-collapse: collapse;
  font-size: 12.5px;
}

.um-table th {
  padding: 12px;
  font-size: 12px;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  color: #42526e;
  background: #f8fafd;
  border-bottom: 1px solid var(--line);
}

.um-table td {
  padding: 14px 12px;
  white-space: nowrap;
  border-bottom: 1px solid #eef2f8;
}

.um-table tbody tr {
  transition: background .2s;
}

.um-table tbody tr:hover {
  background: #f8fafd;
}

.um-table td.name {
  font-weight: 700;
}

.um-chip {
  display: inline-block;
  padding: 3px 12px;
  font-size: 11.5px;
  font-weight: 600;
  border-radius: 99px;
}

.um-chip.ok {
  color: #0f9d74;
  background: #daf5ec;
}

.um-chip.off {
  color: #e0384a;
  background: #ffe3e3;
}

.um-chip.warn {
  color: #c77700;
  background: #fff0d6;
}

.um-view {
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
  background: #e6f0ff;
  border-radius: 8px;
  transition: background .2s, color .2s;
}

.um-view:hover {
  color: #fff;
  background: #2563eb;
}

.um-empty {
  padding: 28px 0;
  text-align: center;
  color: var(--muted);
}

.um-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 14px;
  font-size: 12px;
  color: var(--muted);
}

.um-pager {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.um-page {
  min-width: 34px;
  height: 34px;
  padding: 0 10px;
  font-size: 12.5px;
  font-weight: 600;
  color: #42526e;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 8px;
  transition: background .2s, color .2s, border-color .2s;
}

.um-page:hover:not(:disabled) {
  color: #2563eb;
  border-color: #2563eb;
}

.um-page.on {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}

.um-page:disabled {
  opacity: .45;
  cursor: not-allowed;
}

/* ===== popups ===== */
.um-modal-back {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 18px;
  overscroll-behavior: contain;
  background: rgba(12, 22, 50, .62);
  animation: umFadeIn .25s both;
}

.um-modal {
  width: 100%;
  max-width: 560px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 30px 70px rgba(10, 20, 60, .35);
  animation: umPop .4s cubic-bezier(.2, .9, .3, 1.1) both;
}

.um-modal-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid var(--line);
}

.um-modal-head > div {
  flex: 1;
  min-width: 0;
}

.um-modal-head h3 {
  font-size: 17px;
  font-weight: 800;
  color: #1d1a63;
}

.um-modal-head p {
  margin-top: 2px;
  font-size: 12.5px;
  color: var(--muted);
}

.um-modal-close {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  font-size: 14px;
  color: var(--muted);
  background: #f1f2f9;
  border-radius: 50%;
  transition: transform .25s, background .25s, color .25s;
}

.um-modal-close:hover {
  color: #fff;
  background: var(--red);
  transform: rotate(90deg);
}

.um-modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px 22px;
  overflow-y: auto;
}

.um-modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 22px 18px;
  border-top: 1px solid var(--line);
}

.um-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.um-details div, .um-usage {
  padding: 12px 14px;
  background: #f6f8fd;
  border-radius: 12px;
}

.um-details small, .um-usage small {
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
}

.um-details b {
  font-size: 13px;
  word-break: break-word;
}

.um-usage > div:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.um-usage small {
  margin: 0;
}

.um-current {
  padding: 14px;
  background: #f6f8fd;
  border: 1px solid var(--line);
  border-left: 4px solid var(--c);
  border-radius: 12px;
}

.um-current-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.um-current-top small {
  display: block;
  font-size: 11px;
}

.um-current-top strong {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
  font-size: 16px;
}

.um-current-top strong i {
  width: 10px;
  height: 10px;
  background: var(--c);
  border-radius: 50%;
}

.um-current .um-bar-track {
  margin: 12px 0 10px;
}

.um-current.ok .um-bar-track i {
  background: linear-gradient(90deg, #14b88a, #4be3b8);
}

.um-current.warn .um-bar-track i {
  background: linear-gradient(90deg, #f59300, #ffc15c);
}

.um-current.off .um-bar-track i {
  background: linear-gradient(90deg, #ff5c5c, #ff9a9a);
}

.um-dates {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 16px;
  font-size: 12px;
  color: var(--muted);
}

.um-dates b {
  color: var(--text);
  font-weight: 600;
}

.um-block {
  padding: 14px;
  background: #f6f8fd;
  border-radius: 12px;
}

.um-block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 13px;
}

.um-journey {
  display: flex;
  gap: 3px;
  height: 10px;
  overflow: hidden;
  border-radius: 99px;
}

.um-journey i {
  min-width: 6px;
  border-radius: 99px;
}

.um-journey-key {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  margin-top: 8px;
  font-size: 11.5px;
  color: var(--muted);
}

.um-journey-key span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.um-journey-key i {
  width: 8px;
  height: 8px;
  background: var(--c);
  border-radius: 50%;
}

.um-timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 16px;
}

.um-timeline::before {
  content: "";
  position: absolute;
  left: 6px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: #dde4f0;
}

.um-timeline li {
  position: relative;
  padding-left: 28px;
}

.um-timeline li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 2px;
  width: 14px;
  height: 14px;
  background: var(--c);
  border: 3px solid #f6f8fd;
  border-radius: 50%;
}

.um-tl-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 2px;
}

.um-tl-top strong {
  font-size: 13px;
}

.um-tl-top em {
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  color: var(--muted);
}

.um-none {
  margin-top: 12px;
  font-size: 12px;
  color: var(--muted);
}

.um-card.fill {
  display: flex;
  flex-direction: column;
}

.um-card.fill > .um-bars, .um-card.fill > .um-activity {
  flex: 1;
  justify-content: space-evenly;
}

.um-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #42526e;
}

.um-form input, .um-form select {
  height: 42px;
  padding: 0 12px;
  font: inherit;
  font-size: 13px;
  font-weight: 400;
  color: var(--text);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  outline: 0;
}

.um-form input:focus, .um-form select:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(45, 140, 255, .12);
}

.um-error {
  font-size: 12px;
  font-weight: 600;
  color: #e0384a;
}

.um-toast {
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
  box-shadow: 0 12px 30px rgba(10, 20, 60, .3);
  transform: translateX(-50%);
  animation: umToast .3s ease both;
}

/* popup open: freeze the endless animations behind it */
.um-app.um-paused .um-main *, .um-app.um-paused .um-main *::before, .um-app.um-paused .um-main *::after {
  animation-play-state: paused !important;
}

/* ===== responsive ===== */
@media (max-width: 1300px) and (min-width: 761px) {
  .um-col-email {
    display: none;
  }
  .um-table {
    min-width: 760px;
  }
}

@media (max-width: 1180px) {
  .um-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .um-row.three {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .um-row.three > :last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 980px) {
  .um-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    transform: translateX(-100%);
  }
  .um-sidebar.open {
    transform: none;
    box-shadow: 12px 0 40px rgba(0, 0, 0, .35);
  }
  .um-overlay {
    position: fixed;
    inset: 0;
    z-index: 55;
    display: block;
    background: rgba(10, 20, 50, .5);
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s;
  }
  .um-overlay.show {
    opacity: 1;
    pointer-events: auto;
  }
  .um-burger {
    display: grid;
    place-items: center;
  }
  .um-content {
    padding: 16px 18px 28px;
  }
}

@media (max-width: 760px) {
  .um-row.three {
    grid-template-columns: 1fr;
  }
  .um-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .um-topbar {
    padding: 0 16px;
    gap: 10px;
  }
  .um-title h1 {
    font-size: 22px;
  }
  .um-tools {
    justify-content: stretch;
    width: 100%;
  }
  .um-tools .um-search {
    flex: 1 1 100%;
    max-width: none;
  }
  .um-tools .um-select {
    flex: 1;
  }
  .um-tools .um-btn.primary {
    flex: 1 1 100%;
  }
  .um-tools .um-reset {
    flex: 1 1 100%;
  }
  .um-card-head > div:first-child {
    width: 100%;
  }
  .um-foot {
    justify-content: center;
    text-align: center;
  }
  /* table -> one card per college */
  .um-table-wrap {
    overflow: visible;
  }
  .um-table {
    min-width: 0;
  }
  .um-table thead {
    display: none;
  }
  .um-table, .um-table tbody {
    display: block;
  }
  .um-table tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 14px;
    margin-bottom: 12px;
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: 12px;
  }
  .um-table td {
    padding: 0;
    white-space: normal;
    border: 0;
    word-break: break-word;
  }
  .um-table td::before {
    content: attr(data-label);
    display: block;
    margin-bottom: 2px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .04em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .um-table td.name, .um-table td.act {
    grid-column: 1 / -1;
  }
  .um-table td.name {
    font-size: 14px;
  }
  .um-table td.act .um-view {
    width: 100%;
    padding: 9px;
  }
}

@media (max-width: 520px) {
  .um-content {
    padding: 14px 12px 24px;
  }
  .um-profile-copy, .um-profile-chev {
    display: none;
  }
  .um-stat {
    padding: 14px;
  }
  .um-stat h2 {
    font-size: 22px;
  }
  .um-bar-row {
    grid-template-columns: 96px minmax(0, 1fr) 28px;
  }
  .um-details {
    grid-template-columns: 1fr;
  }
  .um-modal-body, .um-modal-head, .um-modal-foot {
    padding-left: 16px;
    padding-right: 16px;
  }
  .um-modal-foot .um-btn {
    flex: 1;
  }
}

@media (max-width: 360px) {
  .um-stats {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .um-app * {
    animation: none !important;
    transition: none !important;
  }
}
`;