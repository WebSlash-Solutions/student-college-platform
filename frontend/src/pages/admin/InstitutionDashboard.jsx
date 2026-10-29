import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Settings                                                           */
/* ------------------------------------------------------------------ */

const PROFILE_PRICE = 100; // ₹ per student profile
const LISTING_PRICE = 2000; // ₹ per month for Google top listing
const LISTING_DAYS = 30;
const GOOGLE_QUERY = "best college"; // what the Google mock-up shows being searched
const ROWS_COLLAPSED = 6;
const DAY = 86400000;

// Plans a college can choose. Replace with real plan data from your backend.
// students = profiles included in the plan, days = plan validity
const PLANS = {
  gold: { name: "Gold", students: 8, days: 90 },
  diamond: { name: "Diamond", students: 12, days: 180 },
  elite: { name: "Elite", students: 16, days: 365 },
};
const PLAN_KEYS = Object.keys(PLANS);

// Reads the plan a college really chose from the login / API data.
// Accepts different field names and values like "Elite", "ELITE PLAN", "gold".
const firstValue = (obj, keys) => {
  for (const k of keys) {
    const v = k.split(".").reduce((o, part) => (o == null ? undefined : o[part]), obj);
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
};
const PLAN_FIELDS = ["plan", "planName", "plan_name", "selectedPlan", "subscriptionPlan", "subscription_plan", "package", "packageName", "tier", "membership", "subscription.plan", "subscription.name", "subscription.tier"];
const readPlanKey = (college) => {
  const raw = firstValue(college, PLAN_FIELDS);
  const text = String(typeof raw === "object" && raw ? raw.name || raw.title || "" : raw || "").toLowerCase();
  return PLAN_KEYS.find((k) => text.includes(k)) || null;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const hash = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const makeRng = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const int = (r, min, max) => min + Math.floor(r() * (max - min + 1));
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const shuffle = (r, arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const timeAgo = (ts) => {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return "Just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
};

/* ------------------------------------------------------------------ */
/*  College-specific demo data                                         */
/*  Replace buildCollegeData() with your API call when backend is ready */
/* ------------------------------------------------------------------ */

const CATALOGS = {
  sns: [
    ["B.E Computer Science & Engineering", "B.E CSE"],
    ["B.Tech Artificial Intelligence & Data Science", "B.Tech AI&DS"],
    ["B.Tech Information Technology", "B.Tech IT"],
    ["B.E Electronics & Communication", "B.E ECE"],
    ["B.E Mechanical Engineering", "B.E Mech"],
  ],
  psg: [
    ["B.E Computer Science & Engineering", "B.E CSE"],
    ["B.E Electronics & Communication", "B.E ECE"],
    ["B.E Mechanical Engineering", "B.E Mech"],
    ["B.E Civil Engineering", "B.E Civil"],
    ["B.Tech Textile Technology", "B.Tech Textile"],
    ["B.E Robotics & Automation", "B.E Robotics"],
  ],
  engineering: [
    ["B.E Computer Science", "B.E CSE"],
    ["B.Tech Information Technology", "B.Tech IT"],
    ["B.E Electronics & Communication", "B.E ECE"],
    ["B.E Electrical & Electronics", "B.E EEE"],
    ["B.E Mechanical Engineering", "B.E Mech"],
    ["B.E Civil Engineering", "B.E Civil"],
  ],
  arts: [
    ["B.Sc Computer Science", "B.Sc CS"],
    ["Bachelor of Computer Applications", "BCA"],
    ["B.Com", "B.Com"],
    ["B.Com Computer Applications", "B.Com CA"],
    ["BBA", "BBA"],
    ["B.A English Literature", "B.A English"],
    ["B.Sc Mathematics", "B.Sc Maths"],
  ],
  medical: [
    ["B.Sc Nursing", "B.Sc Nursing"],
    ["B.Pharm", "B.Pharm"],
    ["Bachelor of Physiotherapy", "BPT"],
    ["B.Sc Medical Lab Technology", "B.Sc MLT"],
    ["B.Sc Radiology", "B.Sc Radiology"],
  ],
  polytechnic: [
    ["Diploma in Computer Engineering", "Dip CSE"],
    ["Diploma in Electronics", "Dip ECE"],
    ["Diploma in Mechanical", "Dip Mech"],
    ["Diploma in Civil", "Dip Civil"],
    ["Diploma in EEE", "Dip EEE"],
  ],
  general: [
    ["Bachelor of Computer Applications", "BCA"],
    ["B.Com", "B.Com"],
    ["B.Tech Information Technology", "B.Tech IT"],
    ["B.Sc Computer Science", "B.Sc CS"],
    ["BBA", "BBA"],
  ],
};

const FIRST_NAMES = [
  "Keerthi", "Rahul", "Ananya", "Arun", "Priya", "Karthik", "Divya", "Vignesh", "Meena",
  "Harish", "Sneha", "Naveen", "Lavanya", "Surya", "Pooja", "Dinesh", "Nandhini", "Gokul",
  "Swetha", "Aravind", "Deepak", "Kavya", "Manoj", "Riya", "Sanjay", "Janani", "Prakash", "Bharath",
];
const INITIALS = "ABCDEGHJKLMNPRSTVY".split("");
const CITIES = [
  "Coimbatore", "Chennai", "Erode", "Salem", "Madurai", "Tiruppur", "Trichy",
  "Namakkal", "Karur", "Vellore", "Tirunelveli", "Pollachi", "Dindigul",
];
const STREETS = [
  "Gandhi Nagar", "Anna Nagar", "Nehru Street", "Periyar Colony", "RS Puram",
  "Bharathi Nagar", "Kamaraj Road", "Lakshmi Nagar", "Mettu Street", "Thillai Nagar",
];

const SUBJECTS = {
  science: ["Maths", "Physics", "Chemistry"],
  commerce: ["Accountancy", "Commerce", "Economics"],
  arts: ["English", "History", "Economics"],
};

const streamFor = (short) => {
  if (/Com|BBA/i.test(short)) return "commerce";
  if (/^B\.A/i.test(short)) return "arts";
  return "science";
};

const pickCatalogKey = (college) => {
  const text = `${college.name || ""} ${college.type || ""}`.toLowerCase();
  if (text.includes("sns")) return "sns";
  if (text.includes("psg")) return /arts|science|commerce/.test(text) ? "arts" : "psg";
  if (/polytechnic|diploma/.test(text)) return "polytechnic";
  if (/medical|nursing|pharm|health/.test(text)) return "medical";
  if (/arts|science|commerce/.test(text)) return "arts";
  if (/tech|engineer/.test(text)) return "engineering";
  return "general";
};

const getCollegeKey = (college) =>
  String(college.id ?? college.userId ?? college.name ?? "college");

const buildCollegeData = (college) => {
  const seedKey = `${college.id ?? ""}|${String(college.name || "").toLowerCase()}|${college.userId || ""}`;
  const r = makeRng(hash(seedKey));
  const catalog = CATALOGS[pickCatalogKey(college)];

  const baseCourses = shuffle(r, catalog)
    .slice(0, 4)
    .map(([name, short]) => ({ name, short, seats: pick(r, [60, 90, 120, 180]) }));

  const city = college.city || pick(r, CITIES);
  const locationPool = [city, city, ...shuffle(r, CITIES).slice(0, 5)];

  const total = int(r, 14, 24);
  const names = shuffle(r, FIRST_NAMES).slice(0, total);
  let idCounter = int(r, 10100, 10300);

  const leads = names.map((first) => {
    const initial = pick(r, INITIALS);
    const course = pick(r, baseCourses);
    const location = pick(r, locationPool);
    const roll = r();
    const status = roll < 0.38 ? "New" : roll < 0.72 ? "Interested" : "Contacted";
    idCounter += int(r, 3, 11);

    const pct12 = int(r, 68, 97);
    const stream = streamFor(course.short);
    const subs = SUBJECTS[stream].map((n) => [n, clamp(pct12 + int(r, -6, 6), 55, 100)]);
    const cutoff =
      stream === "science"
        ? subs[0][1] + (subs[1][1] + subs[2][1]) / 2
        : ((subs[0][1] + subs[1][1] + subs[2][1]) / 3) * 2;
    const cutoffRounded = Math.round(cutoff * 100) / 100;
    const tenthPct = clamp(pct12 + int(r, -5, 6), 60, 99);

    return {
      name: `${first} ${initial}`,
      id: `STU${idCounter}`,
      course: course.short,
      location,
      marks: `${pct12}%`,
      status,
      details: {
        email: `${first.toLowerCase()}.${initial.toLowerCase()}${int(r, 10, 99)}@gmail.com`,
        phone: `+91 ${pick(r, [6, 7, 8, 9])}${String(int(r, 0, 999999999)).padStart(9, "0")}`,
        address: `No. ${int(r, 1, 240)}, ${pick(r, STREETS)}, ${location}, Tamil Nadu - 6${String(
          int(r, 0, 99999)
        ).padStart(5, "0")}`,
        tenth: { pct: tenthPct, total: Math.round(tenthPct * 5), outOf: 500 },
        twelfth: { pct: pct12, total: Math.round(pct12 * 6), outOf: 600, subjects: subs },
        cutoff: {
          score: cutoffRounded,
          outOf: 200,
          pct: Math.round((cutoffRounded / 2) * 100) / 100,
          note:
            stream === "science"
              ? "Maths + ½ Physics + ½ Chemistry"
              : "Average of 3 core subjects, scaled to 200",
        },
      },
    };
  });

  /* ---- plan chosen by this college (Diamond / Gold / Elite) ---- */
  const randomPlan = pick(r, PLAN_KEYS); // demo fallback only, used when the college has no plan data
  const planKey = readPlanKey(college) || randomPlan;
  const planCfg = PLANS[planKey];
  const wanted = Number(firstValue(college, ["studentsPurchased", "purchasedStudents", "students_purchased", "profilesPurchased", "subscription.students"]));
  const planCount = clamp(wanted > 0 ? wanted : planCfg.students, 0, leads.length);
  const purchasedIds = shuffle(r, leads.map((l) => l.id)).slice(0, planCount);

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const startOffset = int(r, 7, 45);
  const givenStart = new Date(firstValue(college, ["planStartDate", "planStart", "startDate", "activatedAt", "activationDate", "plan_start_date", "subscription.startDate"])).getTime();
  const givenEnd = new Date(firstValue(college, ["planEndDate", "planEnd", "endDate", "expiresAt", "expiryDate", "plan_end_date", "subscription.endDate"])).getTime();
  const startsAt = Number.isFinite(givenStart) ? givenStart : dayStart.getTime() - startOffset * DAY;
  const endsAt = Number.isFinite(givenEnd) ? givenEnd : startsAt + planCfg.days * DAY;
  const plan = { key: planKey, name: planCfg.name, startsAt, endsAt, purchasedIds };

  const activity = [
    { title: "New student lead received", text: `${leads[0].name} showed interest in ${leads[0].course}`, ago: "2 min ago" },
    { title: "Course updated", text: `${baseCourses[0].short} seats updated to ${baseCourses[0].seats}`, ago: "1 hour ago" },
    { title: "New enquiry received", text: `A student from ${leads[1].location} is interested`, ago: "3 hours ago" },
  ];

  return { city, baseCourses, leads, activity, plan };
};

/* ------------------------------------------------------------------ */
/*  Saved state (per college)                                          */
/* ------------------------------------------------------------------ */

const EMPTY_STORE = { purchased: {}, listing: null, courses: [], events: [] };

const loadStore = (key) => {
  try {
    const raw = localStorage.getItem(`ccDashboard:${key}`);
    const p = raw ? JSON.parse(raw) : {};
    return {
      purchased: p.purchased && typeof p.purchased === "object" ? p.purchased : {},
      listing: p.listing || null,
      courses: Array.isArray(p.courses) ? p.courses : [],
      events: Array.isArray(p.events) ? p.events : [],
    };
  } catch {
    return EMPTY_STORE;
  }
};

/* ------------------------------------------------------------------ */
/*  UI pieces                                                          */
/* ------------------------------------------------------------------ */

const useCountUp = (target, duration = 900) => {
  const [value, setValue] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = prev.current;
    if (reduce || from === target) {
      setValue(target);
      prev.current = target;
      return undefined;
    }
    let raf;
    let start;
    const tick = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
};

const ICONS = {
  cap: (
    <>
      <path d="M12 3 1.5 8.5 12 14l8.5-4.45V15h2V8.5L12 3Z" fill="currentColor" stroke="none" />
      <path d="M5.5 12.2V16c0 1.6 3 3.2 6.5 3.2s6.5-1.6 6.5-3.2v-3.8L12 15.6l-6.5-3.4Z" fill="currentColor" stroke="none" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 19c.4-3.2 3-5 6.2-5s5.8 1.8 6.2 5" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.3c1.8.5 3 2 3.2 4.7" />
    </>
  ),
  userPlus: (
    <>
      <circle cx="9.5" cy="8" r="3.4" />
      <path d="M3 19c.4-3.4 3.1-5.2 6.5-5.2 1.2 0 2.3.2 3.2.7" />
      <path d="M18 9v6M15 12h6" />
    </>
  ),
  unlock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 7.6-1.7" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="3" />
      <path d="M3 10h18M16.5 14.5h.01" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4-4" />
    </>
  ),
  logout: (
    <>
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 8l-4 4 4 4M6 12h10" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.7 7 9.5 4.1-1.8 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.3a11 11 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  ),
  home: <path d="M4 11 12 4l8 7v8.5a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1V11Z" />,
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  bank: <path d="M3 9.5 12 4l9 5.5M5 10v7M9.7 10v7M14.3 10v7M19 10v7M3.5 19.5h17" />,
  mobile: (
    <>
      <rect x="7" y="2.8" width="10" height="18.4" rx="2.4" />
      <path d="M11 18h2" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3Z" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  crown: <path d="m3.5 8 4.5 4 4-6.5 4 6.5 4.5-4-1.8 10H5.3L3.5 8Z" />,
  trend: <path d="m3.5 17 6-6 3.5 3.5L20.5 7M15 7h5.5v5.5" />,
  scan: <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M8 12h8" />,
};

const Icon = ({ name, size = 18 }) => (
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
    {ICONS[name]}
  </svg>
);

const StatCard = ({ icon, label, value, prefix = "", badge, tone, delay }) => {
  const shown = useCountUp(value);
  return (
    <article className={`cd-stat ${tone} cd-anim`} style={{ "--d": `${delay}ms` }}>
      <div className="cd-stat-top">
        <span className="cd-stat-icon">
          <Icon name={icon} />
        </span>
        <span className="cd-badge">{badge}</span>
      </div>
      <strong>
        {prefix}
        {shown.toLocaleString("en-IN")}
      </strong>
      <p>{label}</p>
    </article>
  );
};

const Modal = ({ title, onClose, children, wide = false }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="cd-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`cd-modal ${wide ? "wide" : ""}`}>
        <button className="cd-x" type="button" onClick={onClose} aria-label="Close">
          <Icon name="x" size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};

const Meter = ({ label, value, text }) => (
  <div className="cd-meter">
    <div className="cd-meter-head">
      <span>{label}</span>
      <b>{text}</b>
    </div>
    <div className="cd-progress">
      <span style={{ width: `${clamp(value, 0, 100)}%` }} />
    </div>
  </div>
);

/* ---------------------------- Profile ------------------------------ */

const ProfileModal = ({ lead, onClose }) => {
  const d = lead.details;
  const initials = lead.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Modal title="Student profile" onClose={onClose}>
      <div className="cd-profile-head">
        <span className="cd-avatar big">{initials}</span>
        <div>
          <h3>{lead.name}</h3>
          <p>
            {lead.id} • {lead.course}
          </p>
        </div>
        <span className="cd-owned">
          <Icon name="check" size={13} /> Purchased
        </span>
      </div>

      <div className="cd-section-title">Contact details</div>
      <div className="cd-info">
        <div>
          <Icon name="mail" size={16} />
          <span>
            <small>Email</small>
            <a href={`mailto:${d.email}`}>{d.email}</a>
          </span>
        </div>
        <div>
          <Icon name="phone" size={16} />
          <span>
            <small>Phone</small>
            <a href={`tel:${d.phone.replace(/\s/g, "")}`}>{d.phone}</a>
          </span>
        </div>
        <div className="full">
          <Icon name="home" size={16} />
          <span>
            <small>Address</small>
            {d.address}
          </span>
        </div>
      </div>

      <div className="cd-section-title">Course interest</div>
      <div className="cd-interest-card">
        <span className="cd-interest-icon"><Icon name="cap" size={19} /></span>
        <div>
          <small>Interested course</small>
          <strong>{lead.course}</strong>
          <span>{lead.location}</span>
        </div>
      </div>

      <div className="cd-section-title">Academic details</div>
      <Meter
        label="10th Mark"
        value={d.tenth.pct}
        text={`${d.tenth.total} / ${d.tenth.outOf} • ${d.tenth.pct}%`}
      />
      <Meter
        label="12th Mark"
        value={d.twelfth.pct}
        text={`${d.twelfth.total} / ${d.twelfth.outOf} • ${d.twelfth.pct}%`}
      />
      <div className="cd-subjects">
        {d.twelfth.subjects.map(([name, mark]) => (
          <span key={name}>
            {name} <b>{mark}</b>
          </span>
        ))}
      </div>
      <Meter
        label="Cutoff"
        value={d.cutoff.pct}
        text={`${d.cutoff.score} / ${d.cutoff.outOf} • ${d.cutoff.pct}%`}
      />
      <p className="cd-note">Cutoff = {d.cutoff.note}</p>

      <button className="cd-primary" type="button" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

/* ---------------------------- Add course --------------------------- */

const AddCourseModal = ({ existing, onAdd, onClose }) => {
  const [name, setName] = useState("");
  const [seats, setSeats] = useState("60");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const clean = name.trim().replace(/\s+/g, " ");
    const count = Number(seats);
    if (clean.length < 2) return setError("Enter a course name.");
    if (!Number.isInteger(count) || count < 1 || count > 2000)
      return setError("Seats must be a number between 1 and 2000.");
    if (existing.some((c) => c.name.toLowerCase() === clean.toLowerCase()))
      return setError("This course is already added.");
    onAdd({ name: clean, short: clean, seats: count });
    return onClose();
  };

  return (
    <Modal title="Add new course" onClose={onClose}>
      <h3 className="cd-modal-title">Add New Course</h3>
      <p className="cd-modal-sub">New courses appear in Course Performance right away.</p>
      <form onSubmit={submit} noValidate>
        <label className="cd-label" htmlFor="course-name">
          Course name
        </label>
        <input
          id="course-name"
          className="cd-field"
          autoFocus
          placeholder="e.g. B.Sc Data Science"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />
        <label className="cd-label" htmlFor="course-seats">
          Total seats
        </label>
        <input
          id="course-seats"
          className="cd-field"
          inputMode="numeric"
          value={seats}
          onChange={(e) => {
            setSeats(e.target.value.replace(/\D/g, "").slice(0, 4));
            setError("");
          }}
        />
        {error && <div className="cd-error">{error}</div>}
        <button className="cd-primary" type="submit">
          Add Course
        </button>
      </form>
    </Modal>
  );
};

/* ---------------------------- Payment ------------------------------ */

const BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Indian Bank",
  "Canara Bank",
  "Bank of Baroda",
  "Kotak Mahindra",
];
const UPI_APPS = [
  { label: "Google Pay", short: "G Pay", suffix: "@okaxis", color: "#4285f4", mark: "G" },
  { label: "PhonePe", short: "PhonePe", suffix: "@ybl", color: "#5f259f", mark: "पे" },
  { label: "Paytm", short: "Paytm", suffix: "@paytm", color: "#00a8e1", mark: "paytm" },
  { label: "BHIM UPI", short: "BHIM", suffix: "@upi", color: "#16864b", mark: "▲" },
];
const METHODS = [
  ["upi", "mobile", "UPI", "Pay with any UPI app"],
  ["card", "card", "Card", "Visa, Mastercard, RuPay"],
  ["bank", "bank", "Net Banking", "All major banks"],
];

/* Left panel of the Google top listing payment: shows the college that is paying */
const ListingPromo = ({ collegeName, amount, days }) => (
  <>
    <div className="cd-promo-brand">
      <span className="cd-promo-logo">
        <Icon name="cap" size={22} />
      </span>
      <div>
        <b>CampusConnect</b>
        <small>More Visibility. More Opportunities.</small>
      </div>
    </div>

    <span className="cd-promo-badge">
      <Icon name="crown" size={14} /> Top placement - {days} days
    </span>
    <h3 className="cd-promo-title">Google Top Listing</h3>
    <p className="cd-promo-desc">
      Get your college at the top of Google search and reach more prospective students.
    </p>

    <div className="cd-gmock" aria-label={`Google search for ${GOOGLE_QUERY} showing ${collegeName} first`}>
      <div className="cd-gmock-card">
        <div className="cd-glogo" aria-hidden="true">
          <span style={{ color: "#4285f4" }}>G</span>
          <span style={{ color: "#ea4335" }}>o</span>
          <span style={{ color: "#fbbc05" }}>o</span>
          <span style={{ color: "#4285f4" }}>g</span>
          <span style={{ color: "#34a853" }}>l</span>
          <span style={{ color: "#ea4335" }}>e</span>
        </div>
        <div className="cd-gsearch">
          <span>{GOOGLE_QUERY}</span>
          <Icon name="search" size={15} />
        </div>
        <div className="cd-gresult first">
          <i>1</i>
          <div>
            <p>
              <b title={collegeName}>{collegeName}</b>
              <em>Top Listing</em>
            </p>
            <span className="cd-gline" />
            <span className="cd-gline short" />
          </div>
        </div>
        <div className="cd-gresult dim">
          <i>2</i>
          <div>
            <span className="cd-gline" />
            <span className="cd-gline short" />
          </div>
        </div>
        <div className="cd-gresult dim faint">
          <i>3</i>
          <div>
            <span className="cd-gline" />
          </div>
        </div>
      </div>
      <svg className="cd-gmock-arrow" viewBox="0 0 120 90" fill="none" aria-hidden="true">
        <path d="M6 82C34 80 62 66 84 30" stroke="#3b8cf0" strokeWidth="6" strokeLinecap="round" />
        <path d="M70 26h20v20" stroke="#3b8cf0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>

    <div className="cd-promo-total">
      <small>Total Amount</small>
      <strong>{inr(amount)}</strong>
    </div>

    <div className="cd-promo-steps">
      {[
        ["search", "Better Visibility"],
        ["users", "More Inquiries"],
        ["trend", "Higher Admissions"],
      ].map(([icon, label]) => (
        <div key={label}>
          <span>
            <Icon name={icon} size={16} />
          </span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  </>
);
const METHOD_LABEL = { upi: "UPI", card: "Card", bank: "Net Banking" };

const formatCard = (v) =>
  v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

/* intro smoke: four coloured streams from the four corners meet in the centre and swirl into a round logo */
const SMOKE = Array.from({ length: 16 }, (_, i) => {
  const corner = i % 4; // 0 top-left, 1 top-right, 2 bottom-left, 3 bottom-right
  const a = (i / 16) * Math.PI * 2;
  const wob = (i >> 2) * 4;
  const left = corner % 2 === 0;
  const top = corner < 2;
  return {
    cls: `c${corner}`,
    sx: `${left ? -(58 + wob) : 58 + wob}vw`,
    sy: `${top ? -(52 + wob) : 52 + wob}vh`,
    ex: `${Math.round(Math.cos(a) * 78)}px`,
    ey: `${Math.round(Math.sin(a) * 78)}px`,
    size: 150 + (i % 4) * 36,
    delay: ((i >> 2) * 0.12).toFixed(2),
  };
});

const PROCESS_STEPS = ["Contacting your bank…", "Verifying payment securely…", "Activating your plan…"];

const PaymentModal = ({ title, subtitle, amount, summary, promo, receiptLabel, onPaid, onClose }) => {
  const [method, setMethod] = useState("upi");
  const [phase, setPhase] = useState("form"); // form | processing | success
  const [upi, setUpi] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState(UPI_APPS[0]);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [bank, setBank] = useState("");
  const [errors, setErrors] = useState({});
  const [txn, setTxn] = useState("");
  const [procStep, setProcStep] = useState(0);
  const timer = useRef(null);
  const paid = useRef(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (phase !== "processing") return undefined;
    setProcStep(0);
    const t1 = setTimeout(() => setProcStep(1), 1000);
    const t2 = setTimeout(() => setProcStep(2), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  const close = () => {
    if (phase === "processing") return;
    onClose(paid.current);
  };

  const validate = () => {
    const errs = {};
    if (method === "upi" && !showQr) {
      if (!/^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(upi.trim()))
        errs.upi = "Enter a valid UPI ID, like name@okbank";
    }
    if (method === "card") {
      if (card.number.replace(/\s/g, "").length !== 16) errs.number = "Enter the 16 digit card number";
      if (card.name.trim().length < 2) errs.name = "Enter the name on the card";
      const m = Number(card.expiry.slice(0, 2));
      const y = 2000 + Number(card.expiry.slice(3, 5));
      const endOfMonth = new Date(y, m, 0, 23, 59, 59);
      if (card.expiry.length !== 5 || m < 1 || m > 12 || endOfMonth < new Date())
        errs.expiry = "Enter a valid expiry (MM/YY)";
      if (!/^\d{3,4}$/.test(card.cvv)) errs.cvv = "Enter the CVV";
    }
    if (method === "bank" && !bank) errs.bank = "Select your bank";
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    if (phase === "processing") return;
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setPhase("processing");
    timer.current = setTimeout(() => {
      const id = `CC${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`;
      setTxn(id);
      paid.current = true;
      setPhase("success");
      onPaid(id, method);
    }, 3000);
  };

  const clearError = (k) => setErrors((prev) => ({ ...prev, [k]: undefined }));
  const merchantUpi = "campusconnect@okaxis";
  const upiUri = `upi://pay?pa=${encodeURIComponent(merchantUpi)}&pn=${encodeURIComponent("CampusConnect")}&am=${encodeURIComponent(String(amount))}&cu=INR&tn=${encodeURIComponent(title)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(upiUri)}`;

  const body = (
    <>
      {phase === "success" && (
        <div className="cd-center">
          <div className="cd-tick">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </div>
          <h3 className="cd-modal-title">Payment successful</h3>
          <p className="cd-modal-sub">{receiptLabel || title}</p>
          <div className="cd-receipt">
            <div>
              <span>Amount paid</span>
              <b>{inr(amount)}</b>
            </div>
            <div>
              <span>Method</span>
              <b>{METHOD_LABEL[method]}</b>
            </div>
            <div>
              <span>Transaction ID</span>
              <b>{txn}</b>
            </div>
          </div>
          <button className="cd-primary" type="button" onClick={close} autoFocus>
            Done
          </button>
        </div>
      )}

      {(phase === "form" || phase === "processing") && (
        <form onSubmit={submit} noValidate>
          <h3 className="cd-modal-title">{title}</h3>
          {subtitle && <p className="cd-modal-sub">{subtitle}</p>}

          {!promo && (
            <div className="cd-pay-amount">
              <span>Amount to pay</span>
              <strong>{inr(amount)}</strong>
            </div>
          )}
          {summary}

          <div className="cd-label cd-methods-label">Select Payment Method</div>
          <div className="cd-methods" role="tablist">
            {METHODS.map(([id, icon, label, hint]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={method === id}
                className={method === id ? "active" : ""}
                onClick={() => setMethod(id)}
              >
                <span className="cd-method-check">
                  <Icon name="check" size={12} />
                </span>
                <Icon name={icon} size={26} />
                <b>{label}</b>
                <small>{hint}</small>
              </button>
            ))}
          </div>

          {method === "upi" && (
            <div className="cd-pane">
              <label className="cd-label" htmlFor="upi-id">
                UPI ID
              </label>
              <div className="cd-input-wrap">
                <input
                  id="upi-id"
                  className={`cd-field ${errors.upi ? "bad" : ""}`}
                  placeholder="Enter your UPI ID (optional for QR)"
                  autoComplete="off"
                  value={upi}
                  onChange={(e) => {
                    setUpi(e.target.value);
                    setShowQr(false);
                    clearError("upi");
                  }}
                />
                <button
                  className="cd-input-icon cd-scan-button"
                  type="button"
                  aria-label="Show UPI QR code"
                  title="Scan QR with a UPI app"
                  onClick={() => setShowQr((v) => !v)}
                >
                  <Icon name="scan" size={19} />
                </button>
              </div>
              {errors.upi && <div className="cd-field-error">{errors.upi}</div>}
              <div className="cd-label cd-popular-label">Pay using your favourite UPI app</div>
              <div className="cd-upi-apps">
                {UPI_APPS.map((app) => (
                  <button
                    key={app.label}
                    type="button"
                    className={`cd-upi-app ${selectedUpiApp.label === app.label ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedUpiApp(app);
                      setShowQr(true);
                      clearError("upi");
                    }}
                    aria-label={`Show QR for ${app.label}`}
                  >
                    <span className={`cd-upi-mark ${app.label === "Paytm" ? "paytm" : ""}`} style={{ "--app-color": app.color }}>{app.mark}</span>
                    <span>{app.short}</span>
                  </button>
                ))}
              </div>
              {showQr && (
                <div className="cd-qr-panel">
                  <div className="cd-qr-copy">
                    <strong>Scan with {selectedUpiApp.label}</strong>
                    <span>Amount: {inr(amount)}</span>
                    <small>Demo QR preview. Configure your verified merchant UPI ID for live payments.</small>
                  </div>
                  <img src={qrImageUrl} alt="UPI payment QR code" width="150" height="150" />
                  <a className="cd-qr-open" href={upiUri}>Open UPI app</a>
                </div>
              )}
            </div>
          )}

          {method === "card" && (
            <div className="cd-pane">
              <label className="cd-label" htmlFor="card-number">
                Card number
              </label>
              <input
                id="card-number"
                className={`cd-field ${errors.number ? "bad" : ""}`}
                inputMode="numeric"
                autoComplete="off"
                placeholder="1234 5678 9012 3456"
                value={card.number}
                onChange={(e) => {
                  setCard({ ...card, number: formatCard(e.target.value) });
                  clearError("number");
                }}
              />
              {errors.number && <div className="cd-field-error">{errors.number}</div>}

              <label className="cd-label" htmlFor="card-name">
                Name on card
              </label>
              <input
                id="card-name"
                className={`cd-field ${errors.name ? "bad" : ""}`}
                autoComplete="off"
                placeholder="As printed on the card"
                value={card.name}
                onChange={(e) => {
                  setCard({ ...card, name: e.target.value });
                  clearError("name");
                }}
              />
              {errors.name && <div className="cd-field-error">{errors.name}</div>}

              <div className="cd-two">
                <div>
                  <label className="cd-label" htmlFor="card-expiry">
                    Expiry
                  </label>
                  <input
                    id="card-expiry"
                    className={`cd-field ${errors.expiry ? "bad" : ""}`}
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={(e) => {
                      setCard({ ...card, expiry: formatExpiry(e.target.value) });
                      clearError("expiry");
                    }}
                  />
                  {errors.expiry && <div className="cd-field-error">{errors.expiry}</div>}
                </div>
                <div>
                  <label className="cd-label" htmlFor="card-cvv">
                    CVV
                  </label>
                  <input
                    id="card-cvv"
                    className={`cd-field ${errors.cvv ? "bad" : ""}`}
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="•••"
                    value={card.cvv}
                    onChange={(e) => {
                      setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) });
                      clearError("cvv");
                    }}
                  />
                  {errors.cvv && <div className="cd-field-error">{errors.cvv}</div>}
                </div>
              </div>
            </div>
          )}

          {method === "bank" && (
            <div className="cd-pane">
              <div className="cd-label">Select your bank</div>
              <div className="cd-banks" role="radiogroup" aria-label="Banks">
                {BANKS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    role="radio"
                    aria-checked={bank === b}
                    className={bank === b ? "active" : ""}
                    onClick={() => {
                      setBank(b);
                      clearError("bank");
                    }}
                  >
                    <Icon name="bank" size={16} />
                    {b}
                  </button>
                ))}
              </div>
              {errors.bank && <div className="cd-field-error">{errors.bank}</div>}
            </div>
          )}

          <button className="cd-primary pay" type="submit">
            <span className="cd-pay-left">
              <Icon name="shield" size={18} />
              Pay {inr(amount)}
            </span>
            <Icon name="arrow" size={18} />
          </button>
          <p className="cd-secure">
            <Icon name="shield" size={12} />
            Payments are secure and encrypted.
          </p>
        </form>
      )}
    </>
  );

  return (
    <>
      <Modal title="Payment" onClose={close} wide={!!promo}>
        {promo ? (
          <div className="cd-split">
            <aside className="cd-promo">{promo}</aside>
            <div className="cd-split-main">{body}</div>
          </div>
        ) : (
          body
        )}
      </Modal>

      {phase === "processing" && (
        <div className="cdp-overlay" role="status" aria-live="polite">
          <div className="cdp-card">
            <div className="cdp-ring">
              <i />
              <span>🔒</span>
            </div>
            <h2>Processing payment</h2>
            <p>Please don’t close or refresh this page.</p>
            <ul>
              {PROCESS_STEPS.map((st, i) => (
                <li key={st} className={i < procStep ? "done" : i === procStep ? "on" : ""}>
                  <b>{i < procStep ? "✓" : ""}</b>
                  {st}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CollegeDashboard() {
  const navigate = useNavigate();

  const college = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("collegeUser") || "{}") || {};
    } catch {
      return {};
    }
  }, []);

  const collegeKey = useMemo(() => getCollegeKey(college), [college]);
  const data = useMemo(() => buildCollegeData(college), [college]);

  const [store, setStore] = useState(() => loadStore(collegeKey));
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [payment, setPayment] = useState(null); // { kind: 'unlock'|'listing', lead? }
  const [profile, setProfile] = useState(null);
  const [introOn, setIntroOn] = useState(false);
  const introTimers = useRef([]);

  useEffect(() => () => introTimers.current.forEach(clearTimeout), []);

  /* Pay Now (listing): play the smoke intro first, open the payment modal as the intro fades out */
  const startListingPayment = () => {
    if (introOn) return;
    const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPayment({ kind: "listing" });
      return;
    }
    setIntroOn(true);
    introTimers.current = [
      setTimeout(() => setPayment({ kind: "listing" }), 4400),
      setTimeout(() => setIntroOn(false), 5300),
    ];
  };

  useEffect(() => {
    try {
      localStorage.setItem(`ccDashboard:${collegeKey}`, JSON.stringify(store));
    } catch {
      /* ignore storage errors */
    }
  }, [store, collegeKey]);

  const collegeName = college.name || "Your College";
  const initials =
    collegeName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "C";

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* ---- derived numbers ---- */
  const totalStudents = data.leads.length;
  const newlyAdded = data.leads.filter((l) => l.status === "New").length;
  const plan = data.plan;
  const planIds = useMemo(() => new Set(plan.purchasedIds), [plan]);
  const purchasedCount = plan.purchasedIds.length; // students bought through the plan
  const totalAmount = purchasedCount * PROFILE_PRICE; // PROFILE_PRICE per student
  const planExpired = plan.endsAt < Date.now();
  const planDaysLeft = planExpired ? 0 : Math.max(1, Math.ceil((plan.endsAt - Date.now()) / DAY));
  const planTotalDays = Math.max(1, Math.round((plan.endsAt - plan.startsAt) / DAY));
  const purchasedAnim = useCountUp(purchasedCount);
  const daysLeftAnim = useCountUp(planDaysLeft);
  const planUsedPct = clamp(
    Math.round(((Date.now() - plan.startsAt) / Math.max(1, plan.endsAt - plan.startsAt)) * 100),
    0,
    100
  );

  const listingActive = Boolean(store.listing && store.listing.expiresAt > Date.now());
  const daysLeft = listingActive
    ? Math.max(1, Math.ceil((store.listing.expiresAt - Date.now()) / 86400000))
    : 0;

  const allCourses = useMemo(() => {
    const merged = [...data.baseCourses, ...store.courses].map((c) => ({
      ...c,
      leads: data.leads.filter((l) => l.course === c.short).length,
    }));
    const max = Math.max(1, ...merged.map((c) => c.leads));
    return merged.map((c) => ({
      ...c,
      fill: c.leads === 0 ? 4 : Math.max(10, Math.round((c.leads / max) * 100)),
    }));
  }, [data, store.courses]);

  const filteredLeads = data.leads.filter((lead) =>
    `${lead.name} ${lead.id} ${lead.course} ${lead.location}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );
  const visibleLeads =
    search.trim() || expanded ? filteredLeads : filteredLeads.slice(0, ROWS_COLLAPSED);

  const activity = [
    ...store.events.map((e) => ({ title: e.title, text: e.text, ago: timeAgo(e.ts) })),
    ...data.activity,
  ].slice(0, 5);

  /* ---- actions ---- */
  const addEvent = (s, title, text) =>
    [{ title, text, ts: Date.now() }, ...s.events].slice(0, 20);

  const handleAddCourse = (course) =>
    setStore((s) => ({
      ...s,
      courses: [...s.courses, course],
      events: addEvent(s, "Course added", `${course.name} added with ${course.seats} seats`),
    }));

  const handlePaid = (txn) => {
    if (!payment) return;
    const now = Date.now();
    if (payment.kind === "unlock") {
      const { lead } = payment;
      setStore((s) => ({
        ...s,
        purchased: { ...s.purchased, [lead.id]: { ts: now, txn } },
        events: addEvent(s, "Student profile unlocked", `${inr(PROFILE_PRICE)} paid for ${lead.id} (${lead.name})`),
      }));
    } else {
      setStore((s) => ({
        ...s,
        listing: { paidAt: now, expiresAt: now + LISTING_DAYS * 86400000, txn },
        events: addEvent(s, "Google top listing activated", `${inr(LISTING_PRICE)} paid for ${LISTING_DAYS} days`),
      }));
    }
  };

  const closePayment = (paid) => {
    const current = payment;
    setPayment(null);
    if (paid && current && current.kind === "unlock") setProfile(current.lead);
  };

  const logout = () => {
    sessionStorage.removeItem("collegeUser");
    sessionStorage.removeItem("collegeLoggedIn");
    sessionStorage.removeItem("collegeToken");
    navigate("/admin/login", { replace: true });
  };

  const modalOpen = addCourseOpen || payment || profile;

  return (
    <div className={`cd-shell ${modalOpen ? "cd-lock" : ""}`}>
      <style>{`
        * { box-sizing: border-box; }
        .cd-shell {
          position: fixed;
          inset: 0;
          z-index: 1000;
          width: 100vw;
          height: 100vh;
          overflow: auto;
          text-align: left;
          background: linear-gradient(160deg, #eef4ff 0%, #f7faff 45%, #eaf1fd 100%);
          color: #183453;
          font-family: Inter, "Segoe UI", Arial, sans-serif;
        }
        .cd-shell.cd-lock { overflow: hidden; }
        .cd-shell button { font-family: inherit; }

        /* animations */
        @keyframes cdUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes cdDown { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: none; } }
        @keyframes cdGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes cdFloat { 0%,100% { transform: translate(0,0); } 50% { transform: translate(14px,-10px); } }
        @keyframes cdPulse { 0% { box-shadow: 0 0 0 0 rgba(25,184,139,.5); } 100% { box-shadow: 0 0 0 9px rgba(25,184,139,0); } }
        @keyframes cdFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cdPop { from { opacity: 0; transform: translateY(18px) scale(.97); } to { opacity: 1; transform: none; } }
        @keyframes cdSheet { from { transform: translateY(100%); } to { transform: none; } }
        @keyframes cdSpin { to { transform: rotate(360deg); } }
        @keyframes cdTick { 0% { transform: scale(.4); opacity: 0; } 60% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
        .cd-anim { opacity: 0; animation: cdUp .6s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: var(--d, 0ms); }

        /* top bar */
        .cd-topbar { position: sticky; top: 0; z-index: 5; height: 66px; display: flex; align-items: center; justify-content: space-between; padding: 0 clamp(16px, 4vw, 48px); background: rgba(255,255,255,.88); backdrop-filter: blur(12px); border-bottom: 1px solid #e3ebf7; animation: cdDown .5s ease both; }
        .cd-brand { display: flex; align-items: center; gap: 9px; font-size: 18px; font-weight: 700; letter-spacing: -.3px; color: #12284a; }
        .cd-brand-mark { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 11px; color: #fff; background: linear-gradient(135deg, #1a5fc0, #2c8cf0); box-shadow: 0 6px 14px rgba(26,95,192,.28); }
        .cd-brand b { color: #1f6fe8; font-weight: 700; }
        .cd-top-right { display: flex; align-items: center; gap: 14px; }
        .cd-user { display: flex; align-items: center; gap: 10px; }
        .cd-avatar { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; color: #fff; font-size: 13px; font-weight: 700; background: linear-gradient(135deg, #0f4496, #2c8cf0); flex: 0 0 auto; }
        .cd-avatar.big { width: 52px; height: 52px; font-size: 16px; }
        .cd-user-text { font-size: 12.5px; font-weight: 700; line-height: 1.25; max-width: 240px; }
        .cd-user-text span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cd-user-text small { display: inline-flex; align-items: center; gap: 5px; margin-top: 3px; color: #12906a; font-weight: 600; font-size: 11px; }
        .cd-user-text small i { width: 7px; height: 7px; border-radius: 50%; background: #19b88b; animation: cdPulse 1.8s infinite; }
        .cd-logout { display: inline-flex; align-items: center; gap: 7px; height: 38px; padding: 0 14px; border: 1px solid #dfe8f5; border-radius: 10px; color: #334e70; background: #fff; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: all .18s; }
        .cd-logout:hover { color: #c2362b; border-color: #f3c9c5; background: #fff6f5; }

        /* content */
        .cd-content { max-width: 1280px; margin: 0 auto; padding: 26px clamp(16px, 4vw, 48px) 40px; }

        .cd-hero { position: relative; overflow: hidden; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 28px 30px; border-radius: 20px; color: #fff; background: linear-gradient(110deg, #0f3f94 0%, #1566d2 55%, #2c93f2 100%); box-shadow: 0 16px 34px rgba(21,102,210,.25); }
        .cd-hero::before, .cd-hero::after { content: ""; position: absolute; border-radius: 50%; background: rgba(255,255,255,.08); pointer-events: none; animation: cdFloat 9s ease-in-out infinite; }
        .cd-hero::before { width: 260px; height: 260px; right: 6%; top: -120px; }
        .cd-hero::after { width: 170px; height: 170px; right: -40px; bottom: -80px; animation-delay: -4s; }
        .cd-hero-text { position: relative; z-index: 1; min-width: 0; }
        .cd-date { margin: 0 0 8px; font-size: 12px; opacity: .8; }
        .cd-hero h2 { margin: 0 0 12px; font-size: clamp(20px, 2.6vw, 28px); line-height: 1.25; letter-spacing: -.5px; overflow-wrap: anywhere; }
        .cd-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .cd-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; border-radius: 999px; background: rgba(255,255,255,.16); font-size: 11.5px; font-weight: 600; }
        .cd-btn { position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 0; border-radius: 11px; padding: 12px 18px; color: #0b5cc4; background: #fff; font-size: 12.5px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: transform .18s, box-shadow .18s; }
        .cd-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,.16); }

        /* stats */
        .cd-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin: 18px 0; }
        .cd-stat { padding: 18px 20px; border: 1px solid #e3ebf7; border-radius: 16px; background: #fff; box-shadow: 0 8px 22px rgba(23,59,103,.06); transition: transform .25s, box-shadow .25s; }
        .cd-stat:hover { transform: translateY(-4px); box-shadow: 0 16px 30px rgba(23,59,103,.12); }
        .cd-stat-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .cd-stat-icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; color: var(--c); background: var(--bg); }
        .cd-stat.blue { --c: #1f6fe8; --bg: #eaf2ff; }
        .cd-stat.green { --c: #12a07a; --bg: #e6f8f1; }
        .cd-stat.amber { --c: #e19a0f; --bg: #fff4dc; }
        .cd-stat.purple { --c: #7c4de0; --bg: #f1eaff; }
        .cd-badge { padding: 6px 9px; border-radius: 999px; color: #0b8461; background: #e8faf3; font-size: 10.5px; font-weight: 700; white-space: nowrap; }
        .cd-stat strong { display: block; margin: 16px 0 3px; font-size: 30px; letter-spacing: -.8px; color: #14335a; }
        .cd-stat p { margin: 0; font-size: 12.5px; font-weight: 600; color: #647a93; }

        /* cards */
        .cd-grid { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(280px, .9fr); gap: 16px; align-items: start; }
        .cd-card { overflow: hidden; border: 1px solid #e3ebf7; border-radius: 18px; background: #fff; box-shadow: 0 8px 24px rgba(23,59,103,.06); }
        .cd-card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 20px; border-bottom: 1px solid #edf2f8; }
        .cd-card-head h3 { margin: 0; font-size: 16px; letter-spacing: -.2px; }
        .cd-card-head p { margin: 5px 0 0; font-size: 11.5px; color: #8392a6; }
        .cd-head-actions { display: flex; align-items: center; gap: 12px; }
        .cd-search { position: relative; }
        .cd-search svg { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #8a9bb0; }
        .cd-search input { width: 200px; height: 36px; padding: 0 12px 0 34px; border: 1px solid #e0e8f4; border-radius: 10px; outline: none; background: #f7f9fd; font-size: 12px; transition: all .2s; }
        .cd-search input:focus { width: 230px; border-color: #3b8cf0; background: #fff; box-shadow: 0 0 0 3px rgba(59,140,240,.12); }
        .cd-link { border: 0; background: none; color: #1569d0; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; padding: 6px 2px; }
        .cd-link:hover { text-decoration: underline; }

        .cd-table-wrap { overflow: auto; }
        .cd-table { width: 100%; min-width: 620px; border-collapse: collapse; font-size: 12px; }
        .cd-table th { padding: 13px 16px; text-align: left; font-size: 10.5px; letter-spacing: .5px; color: #667b94; background: #fafcff; }
        .cd-table td { padding: 14px 16px; border-top: 1px solid #eef3f9; white-space: nowrap; }
        .cd-table tbody tr { opacity: 0; animation: cdUp .5s ease forwards; animation-delay: var(--d, 0ms); transition: background .15s; }
        .cd-table tbody tr:hover { background: #f6faff; }
        .cd-student { font-weight: 700; }
        .cd-student small { display: block; margin-top: 3px; color: #8e9bad; font-weight: 400; }
        .cd-status { padding: 6px 10px; border-radius: 999px; font-size: 10.5px; font-weight: 700; color: #0877c8; background: #e6f4ff; }
        .cd-status.interested { color: #a9740a; background: #fff3d9; }
        .cd-status.contacted { color: #12855c; background: #e4f8ee; }
        .cd-unlock { display: inline-flex; align-items: center; gap: 6px; padding: 8px 11px; border: 1px solid #cfe1f8; border-radius: 9px; color: #1269c2; background: #f3f8ff; font-size: 11px; font-weight: 700; cursor: pointer; transition: all .18s; }
        .cd-unlock:hover { color: #fff; border-color: #1f6fe8; background: #1f6fe8; }
        .cd-unlock.owned { color: #0f8a62; border-color: #bfe9d8; background: #effaf5; }
        .cd-unlock.owned:hover { color: #fff; border-color: #12a07a; background: #12a07a; }
        .cd-empty { padding: 28px 16px !important; text-align: center; color: #8392a6; }

        .cd-side { display: grid; gap: 16px; }

        /* Google listing card */
        .cd-listing { position: relative; overflow: hidden; padding: 22px; border-radius: 18px; color: #fff; background: linear-gradient(130deg, #0b4fb0, #1f8cf0); box-shadow: 0 14px 28px rgba(21,102,210,.25); }
        .cd-listing::after { content: ""; position: absolute; width: 160px; height: 160px; right: -50px; top: -60px; border-radius: 50%; background: rgba(255,255,255,.1); animation: cdFloat 8s ease-in-out infinite; }
        .cd-listing > * { position: relative; z-index: 1; }
        .cd-listing-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .cd-listing small { font-size: 10.5px; letter-spacing: 1px; opacity: .85; font-weight: 600; }
        .cd-live { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; background: rgba(255,255,255,.18); font-size: 10.5px; font-weight: 700; }
        .cd-live i { width: 7px; height: 7px; border-radius: 50%; background: #4ff0b4; }
        .cd-listing h4 { margin: 12px 0 6px; font-size: 16px; line-height: 1.35; letter-spacing: -.2px; }
        .cd-listing p { margin: 0 0 16px; font-size: 12px; line-height: 1.6; opacity: .88; }
        .cd-listing-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; }
        .cd-price { font-size: 30px; font-weight: 800; letter-spacing: -.8px; line-height: 1; }
        .cd-price span { font-size: 12px; font-weight: 600; opacity: .8; letter-spacing: 0; }
        .cd-listing .cd-btn { padding: 11px 16px; }

        .cd-list { padding: 4px 20px 14px; }
        .cd-activity { position: relative; padding: 14px 0 14px 20px; border-bottom: 1px solid #edf2f8; }
        .cd-activity:last-child { border-bottom: 0; }
        .cd-activity::before { content: ""; position: absolute; left: 0; top: 19px; width: 8px; height: 8px; border-radius: 50%; background: #2587e8; box-shadow: 0 0 0 4px #eaf4ff; }
        .cd-activity strong { font-size: 12px; }
        .cd-activity p { margin: 6px 0; font-size: 11.5px; color: #75869b; overflow-wrap: anywhere; }
        .cd-activity small { font-size: 10.5px; color: #9aa6b6; }

        .cd-courses { margin-top: 16px; }
        .cd-course-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 34px; padding: 6px 20px 16px; }
        .cd-course { padding: 15px 0; border-bottom: 1px solid #edf2f8; }
        .cd-course-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; font-size: 12px; font-weight: 700; }
        .cd-course-head span { min-width: 0; overflow-wrap: anywhere; }
        .cd-course-head small { color: #8493a6; font-weight: 500; font-size: 11px; white-space: nowrap; }
        .cd-progress { height: 7px; margin-top: 10px; overflow: hidden; border-radius: 10px; background: #edf2f9; }
        .cd-progress span { display: block; height: 100%; border-radius: 10px; background: linear-gradient(90deg, #1668d6, #45aaf7); transform-origin: left; animation: cdGrow 1.1s cubic-bezier(.2,.7,.2,1) both; animation-delay: var(--d, 0ms); }

        .cd-footer { padding: 26px 0 0; text-align: center; font-size: 11px; color: #8795a8; }

        /* modal */
        .cd-overlay { position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(13,30,58,.55); backdrop-filter: blur(4px); animation: cdFade .2s ease both; }
        .cd-modal { position: relative; width: 100%; max-width: 460px; max-height: calc(100vh - 40px); overflow: auto; padding: 26px 24px 22px; border-radius: 20px; background: #fff; box-shadow: 0 30px 70px rgba(10,25,55,.35); animation: cdPop .3s cubic-bezier(.2,.8,.2,1) both; color: #183453; }
        .cd-x { position: absolute; top: 14px; right: 14px; display: grid; place-items: center; width: 32px; height: 32px; border: 0; border-radius: 50%; color: #62768f; background: #f1f5fb; cursor: pointer; transition: background .15s; }
        .cd-x:hover { background: #e3ebf7; }
        .cd-modal-title { margin: 0 34px 6px 0; font-size: 19px; letter-spacing: -.4px; }
        .cd-modal-sub { margin: 0 0 18px; font-size: 12.5px; line-height: 1.55; color: #7a8ba0; }
        .cd-label { display: block; margin: 14px 0 7px; font-size: 12px; font-weight: 700; color: #29415f; }
        .cd-field { width: 100%; height: 44px; padding: 0 14px; border: 1.5px solid #e1e8f3; border-radius: 11px; outline: none; background: #f6f8fc; color: #183453; font-size: 14px; font-family: inherit; transition: all .18s; }
        .cd-field:focus { border-color: #3b8cf0; background: #fff; box-shadow: 0 0 0 3px rgba(59,140,240,.13); }
        .cd-field.bad { border-color: #e66a62; background: #fff8f7; }
        .cd-field-error { margin-top: 6px; font-size: 11.5px; color: #c2362b; }
        .cd-error { margin-top: 14px; padding: 10px 12px; border-radius: 10px; border: 1px solid #ffd4d4; color: #b42318; background: #fff4f4; font-size: 12px; }
        .cd-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 46px; margin-top: 20px; border: 0; border-radius: 12px; color: #fff; background: #1f6fe8; box-shadow: 0 8px 16px rgba(31,111,232,.25); font-size: 14px; font-weight: 700; cursor: pointer; transition: background .18s, transform .18s; }
        .cd-primary:hover { background: #1a62d0; transform: translateY(-1px); }

        .cd-pay-amount { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 13px 15px; border-radius: 13px; background: #eef5ff; }
        .cd-pay-amount span { font-size: 12px; font-weight: 600; color: #4d6586; }
        .cd-pay-amount strong { font-size: 22px; letter-spacing: -.5px; color: #0f4fb0; }
        .cd-teaser { display: flex; align-items: center; gap: 12px; margin-top: 12px; padding: 12px 14px; border: 1px dashed #cdd9ea; border-radius: 13px; font-size: 12px; line-height: 1.45; }
        .cd-teaser b { display: block; font-size: 13px; }
        .cd-teaser span { color: #7a8ba0; }
        .cd-teaser p { margin: 4px 0 0; color: #8a99ac; font-size: 11px; }
        .cd-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 16px; padding: 4px; border-radius: 13px; background: #f1f5fb; }
        .cd-tabs button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 38px; border: 0; border-radius: 10px; color: #5c7390; background: transparent; font-size: 12px; font-weight: 700; cursor: pointer; transition: all .18s; }
        .cd-tabs button.active { color: #0f5bc8; background: #fff; box-shadow: 0 3px 10px rgba(23,59,103,.12); }
        .cd-pane { animation: cdFade .25s ease both; }
        .cd-suffixes { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px; }
        .cd-suffixes button { padding: 6px 10px; border: 1px solid #dce6f4; border-radius: 999px; color: #3d5a80; background: #fff; font-size: 11.5px; font-weight: 600; cursor: pointer; transition: all .15s; }
        .cd-suffixes button:hover { border-color: #3b8cf0; color: #0f5bc8; background: #f2f8ff; }
        .cd-two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .cd-banks { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .cd-banks button { display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 8px 11px; border: 1.5px solid #e1e8f3; border-radius: 11px; color: #29415f; background: #fff; font-size: 11.5px; font-weight: 600; text-align: left; cursor: pointer; transition: all .15s; }
        .cd-banks button svg { flex: 0 0 auto; color: #7d93b0; }
        .cd-banks button:hover { border-color: #9cc3f5; }
        .cd-banks button.active { border-color: #1f6fe8; color: #0f5bc8; background: #f1f7ff; }
        .cd-banks button.active svg { color: #1f6fe8; }
        .cd-secure { margin: 12px 0 0; text-align: center; font-size: 11px; color: #8d9bae; }

        .cd-center { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 14px 0 2px; }
        .cd-center .cd-modal-title { margin-right: 0; }
        .cd-spinner { width: 54px; height: 54px; margin: 10px 0 18px; border: 5px solid #e3ecf9; border-top-color: #1f6fe8; border-radius: 50%; animation: cdSpin .8s linear infinite; }
        .cx-intro { position: fixed; inset: 0; z-index: 10000; display: grid; place-items: center; overflow: hidden; background: radial-gradient(700px 480px at 50% 50%, #241347, #08040f 72%); animation: cxOut .8s 4.4s ease forwards; }
        .cx-ring { position: absolute; left: 50%; top: 50%; width: 0; height: 0; animation: cxSpin 4.4s ease-in-out both; }
        .cx-ring i { position: absolute; left: 0; top: 0; width: var(--s); height: var(--s); border-radius: 50%; filter: blur(16px); mix-blend-mode: screen; opacity: 0; animation: cxPuff 3.6s ease-in-out both; }
        .cx-ring i.c0 { background: radial-gradient(circle, rgba(255,200,230,.95), rgba(255,70,150,.5) 45%, transparent 70%); }
        .cx-ring i.c1 { background: radial-gradient(circle, rgba(255,235,185,.95), rgba(255,170,40,.5) 45%, transparent 70%); }
        .cx-ring i.c2 { background: radial-gradient(circle, rgba(190,255,225,.95), rgba(30,200,130,.5) 45%, transparent 70%); }
        .cx-ring i.c3 { background: radial-gradient(circle, rgba(220,205,255,.95), rgba(140,90,255,.5) 45%, transparent 70%); }
        .cx-center { position: absolute; left: 50%; top: 50%; display: grid; place-items: center; transform: translate(-50%, -50%); }
        .cx-core, .cx-logo { grid-area: 1/1; border-radius: 50%; }
        .cx-core { width: 190px; height: 190px; background: radial-gradient(circle at 35% 30%, #fff, #ffd1ec 32%, #a56bff 70%, #3b1d8f); box-shadow: 0 0 70px 24px rgba(165,107,255,.5); opacity: 0; animation: cxCore 4.4s ease both; }
        .cx-logo { display: grid; place-items: center; width: 120px; height: 120px; background: #fff; box-shadow: 0 14px 40px -10px rgba(0,0,0,.5); opacity: 0; animation: cxPop .7s 3s cubic-bezier(.3,1.5,.5,1) both; }
        .cx-logo svg { width: 72px; height: 72px; }
        .cx-brandtxt { position: absolute; left: 0; right: 0; top: calc(50% + 122px); margin: 0; text-align: center; color: #fff; font-size: 28px; font-weight: 800; letter-spacing: -.3px; opacity: 0; animation: cxFade2 .6s 3.4s ease both; }
        .cx-brandtxt em { font-style: normal; color: #f9a8d4; }
        @keyframes cxPuff {
          0% { transform: translate(-50%,-50%) translate(var(--sx),var(--sy)) scale(.5); opacity: 0; }
          22% { opacity: .8; }
          55% { transform: translate(-50%,-50%) translate(var(--ex),var(--ey)) scale(1); opacity: .85; }
          75% { transform: translate(-50%,-50%) translate(var(--ex),var(--ey)) scale(1.05); opacity: .8; }
          100% { transform: translate(-50%,-50%) translate(calc(var(--ex) * 2.6),calc(var(--ey) * 2.6)) scale(2.4); opacity: 0; }
        }
        @keyframes cxSpin { 0%, 40% { transform: rotate(0); } 100% { transform: rotate(200deg); } }
        @keyframes cxCore { 0%, 28% { opacity: 0; transform: scale(.3); filter: blur(14px); } 52% { opacity: .9; transform: scale(1); filter: blur(5px); } 70%, 100% { opacity: 1; transform: scale(1); filter: blur(0); } }
        @keyframes cxPop { from { opacity: 0; transform: scale(.4); } to { opacity: 1; transform: scale(1); } }
        @keyframes cxFade2 { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes cxOut { to { opacity: 0; visibility: hidden; transform: scale(1.08); } }
        @media (max-width: 600px) { .cx-core { width: 150px; height: 150px; } .cx-logo { width: 96px; height: 96px; } .cx-logo svg { width: 58px; height: 58px; } .cx-brandtxt { top: calc(50% + 100px); font-size: 24px; } }
        .cdp-overlay { position: fixed; inset: 0; z-index: 3000; display: grid; place-items: center; padding: 16px; overflow-y: auto; background: rgba(11,27,58,.62); backdrop-filter: blur(8px); animation: cdFade .25s both; }
        .cdp-card { width: min(380px, 100%); padding: 30px 26px 26px; text-align: center; border-radius: 28px; background: #fff; color: #0b1b3a; box-shadow: 0 40px 80px -20px rgba(0,0,0,.5); animation: cdpPop .4s cubic-bezier(.2,1.2,.4,1) both; }
        .cdp-ring { position: relative; display: grid; place-items: center; width: 76px; height: 76px; margin: 0 auto 16px; }
        .cdp-ring i { position: absolute; inset: 0; border-radius: 50%; border: 5px solid #e3eefc; border-top-color: #1558d6; border-right-color: #8fe3ff; animation: cdSpin .9s linear infinite; }
        .cdp-ring span { font-size: 28px; }
        .cdp-card h2 { margin: 0; font-size: 23px; font-weight: 800; letter-spacing: -.4px; }
        .cdp-card p { margin: 6px 0 0; font-size: 14px; color: #52698a; }
        .cdp-card ul { display: grid; gap: 12px; margin: 20px 0 0; padding: 0; list-style: none; text-align: left; }
        .cdp-card li { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: #9fb1cb; transition: color .3s; }
        .cdp-card li b { display: grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #d7e5f7; font-size: 12px; color: #fff; transition: all .3s; }
        .cdp-card li.on { color: #0b1b3a; }
        .cdp-card li.on b { border-color: #1558d6; border-top-color: transparent; animation: cdSpin .7s linear infinite; }
        .cdp-card li.done { color: #0b7d60; }
        .cdp-card li.done b { background: #10b981; border-color: #10b981; }
        @keyframes cdpPop { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: none; } }
        .cd-tick { display: grid; place-items: center; width: 66px; height: 66px; margin-bottom: 14px; border-radius: 50%; background: linear-gradient(135deg, #14b88c, #0e9d77); box-shadow: 0 10px 22px rgba(20,184,140,.35); animation: cdTick .5s cubic-bezier(.2,.8,.2,1) both; }
        .cd-receipt { width: 100%; margin-top: 6px; padding: 6px 14px; border-radius: 13px; background: #f6f9fd; }
        .cd-receipt div { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e8eef7; font-size: 12px; }
        .cd-receipt div:last-child { border-bottom: 0; }
        .cd-receipt span { color: #7a8ba0; }
        .cd-receipt b { overflow-wrap: anywhere; text-align: right; }


        /* method tiles + upi extras */
        .cd-methods-label { margin-top: 20px; font-size: 14px; }
        .cd-methods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cd-methods button { position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 16px 8px 13px; border: 1.5px solid #e4ebf5; border-radius: 14px; color: #1f6fe8; background: #fff; cursor: pointer; font-family: inherit; transition: all .18s; }
        .cd-methods button b { margin-top: 6px; font-size: 13px; color: #183453; }
        .cd-methods button small { font-size: 10.5px; line-height: 1.35; color: #8392a6; text-align: center; }
        .cd-methods button:hover { border-color: #a9c9f6; }
        .cd-methods button.active { border-color: #2f7ee8; background: #f1f7ff; box-shadow: 0 6px 16px rgba(47,126,232,.16); }
        .cd-method-check { position: absolute; top: 8px; right: 8px; display: none; place-items: center; width: 20px; height: 20px; border-radius: 50%; color: #fff; background: #1f6fe8; }
        .cd-methods button.active .cd-method-check { display: grid; }
        .cd-input-wrap { position: relative; }
        .cd-input-wrap .cd-field { padding-right: 44px; background: #fff; }
        .cd-input-icon { position: absolute; top: 0; right: 8px; display: grid; place-items: center; height: 44px; width: 34px; color: #175da8; }
        .cd-scan-button { border: 0; border-radius: 8px; background: transparent; cursor: pointer; pointer-events: auto; }
        .cd-scan-button:hover { background: #eaf4ff; color: #075dcc; }
        .cd-upi-apps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px; margin-top: 10px; }
        .cd-upi-app { display: flex; min-width: 0; min-height: 76px; flex-direction: column; align-items: center; justify-content: center; gap: 7px; padding: 10px 5px; border: 1px solid #e3ebf5; border-radius: 12px; background: #fff; color: #234461; font-size: 11px; font-weight: 700; cursor: pointer; transition: .18s ease; }
        .cd-upi-app:hover, .cd-upi-app.selected { border-color: #8abaf4; background: #f0f7ff; box-shadow: 0 5px 14px rgba(35, 111, 210, .10); }
        .cd-upi-mark { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; color: #fff; background: var(--app-color); font-size: 16px; font-weight: 800; letter-spacing: -.4px; }
        .cd-upi-mark.paytm { width: 54px; border-radius: 7px; background: transparent; color: var(--app-color); font-size: 14px; font-style: italic; }
        .cd-qr-panel { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 14px; padding: 15px; border: 1px solid #d8e8fa; border-radius: 14px; background: linear-gradient(145deg, #f7fbff, #edf6ff); text-align: center; animation: cdFade .2s ease both; }
        .cd-qr-copy { display: flex; flex-direction: column; gap: 4px; }
        .cd-qr-copy strong { color: #153a5d; font-size: 13px; }
        .cd-qr-copy span { color: #1265c2; font-size: 12px; font-weight: 800; }
        .cd-qr-copy small { max-width: 280px; color: #778ba2; font-size: 10px; line-height: 1.4; }
        .cd-qr-panel img { display: block; padding: 6px; border: 1px solid #e1eaf4; border-radius: 10px; background: #fff; }
        .cd-qr-open { display: inline-flex; align-items: center; justify-content: center; padding: 9px 16px; border-radius: 9px; background: #1265d8; color: #fff; font-size: 11px; font-weight: 700; text-decoration: none; }
        .cd-qr-open:hover { background: #064cae; }
        .cd-popular-label { margin-top: 16px; font-size: 11.5px; color: #6f8099; font-weight: 600; }
        .cd-suffixes { margin-top: 0; }
        .cd-suffixes button { display: inline-flex; align-items: center; gap: 7px; padding: 7px 13px 7px 8px; }
        .cd-suffixes button i { width: 18px; height: 18px; border-radius: 50%; }
        @media (max-width: 540px) { .cd-upi-apps { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        .cd-primary.pay { justify-content: space-between; padding: 0 18px; margin-top: 22px; height: 50px; }
        .cd-pay-left { display: inline-flex; align-items: center; gap: 10px; flex: 1; justify-content: center; padding-left: 18px; }
        .cd-secure { display: flex; align-items: center; justify-content: center; gap: 6px; }

        /* wide split modal (Google top listing) */
        .cd-modal.wide { max-width: 1000px; padding: 0; overflow: auto; }
        .cd-split { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr); }
        .cd-split-main { padding: 36px 30px 24px; min-width: 0; }
        .cd-split-main .cd-modal-title { font-size: 25px; font-weight: 800; letter-spacing: -.6px; margin-top: 4px; }
        .cd-split-main .cd-modal-sub { font-size: 14px; max-width: 360px; }
        .cd-promo { position: relative; display: flex; flex-direction: column; padding: 28px 30px 26px; color: #fff; overflow: hidden; background: radial-gradient(120% 80% at 80% 10%, #1e56c8 0%, rgba(30,86,200,0) 60%), linear-gradient(165deg, #0a2a72 0%, #0a3490 55%, #082463 100%); }
        .cd-promo-brand { display: flex; align-items: center; gap: 10px; }
        .cd-promo-logo { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 11px; background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.22); }
        .cd-promo-brand b { display: block; font-size: 17px; letter-spacing: -.3px; line-height: 1.1; }
        .cd-promo-brand small { font-size: 9.5px; color: #9fc2f7; }
        .cd-promo-badge { display: inline-flex; align-items: center; align-self: flex-start; gap: 7px; margin-top: 30px; padding: 7px 13px; border-radius: 10px; background: #12b38a; font-size: 12px; font-weight: 700; }
        .cd-promo-title { margin: 14px 0 8px; font-size: 31px; line-height: 1.1; letter-spacing: -.9px; font-weight: 800; }
        .cd-promo-desc { margin: 0; max-width: 300px; font-size: 12.5px; line-height: 1.55; color: #cfe0fb; }
        .cd-gmock { position: relative; margin: 22px 8px 0 4px; padding: 12px; border-radius: 20px; background: rgba(120,170,255,.18); border: 1px solid rgba(255,255,255,.14); }
        .cd-gmock-card { padding: 14px 14px 10px; border-radius: 14px; color: #183453; background: linear-gradient(180deg, #f3f7ff 0%, #dfe9fb 100%); box-shadow: 0 14px 28px rgba(3,15,50,.35); }
        .cd-glogo { font: 700 22px/1 "Product Sans", Arial, sans-serif; letter-spacing: -.5px; }
        .cd-gsearch { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 9px; padding: 8px 12px; border-radius: 999px; background: #fff; font-size: 12px; font-weight: 600; box-shadow: 0 1px 4px rgba(20,50,100,.12); }
        .cd-gsearch svg { color: #2f6fe0; flex: 0 0 auto; }
        .cd-gresult { display: flex; gap: 9px; margin-top: 9px; padding: 9px 10px; border-radius: 10px; }
        .cd-gresult.first { background: #fff; box-shadow: 0 6px 14px rgba(25,70,150,.14); }
        .cd-gresult i { flex: 0 0 auto; display: grid; place-items: center; width: 19px; height: 19px; border-radius: 50%; font-style: normal; font-size: 10.5px; font-weight: 700; color: #fff; background: #2f7ee8; }
        .cd-gresult.dim i { color: #6f84a6; background: #c9d6ec; }
        .cd-gresult.dim.faint { opacity: .55; }
        .cd-gresult > div { flex: 1; min-width: 0; }
        .cd-gresult p { display: flex; align-items: center; gap: 8px; margin: 0 0 6px; font-size: 12px; }
        .cd-gresult p b { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cd-gresult p em { flex: 0 0 auto; padding: 2px 8px; border-radius: 6px; font-style: normal; font-size: 9.5px; font-weight: 700; color: #0f9a72; background: #dcf6ec; }
        .cd-gline { display: block; height: 5px; margin-top: 5px; border-radius: 4px; background: #d3deef; }
        .cd-gline.short { width: 62%; }
        .cd-gmock-arrow { position: absolute; right: -8px; bottom: -6px; width: 84px; height: 62px; opacity: .95; }
        .cd-promo-total { margin-top: auto; padding-top: 22px; }
        .cd-promo-total small { display: block; font-size: 11.5px; color: #b9d0f3; }
        .cd-promo-total strong { font-size: 32px; letter-spacing: -1px; }
        .cd-promo-steps { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 14px; }
        .cd-promo-steps::before { content: ""; position: absolute; left: 12%; right: 12%; top: 16px; height: 3px; border-radius: 3px; background: linear-gradient(90deg, #2f7ee8, #5aa6ff); }
        .cd-promo-steps > div { position: relative; display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center; }
        .cd-promo-steps > div span { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; border: 2px solid #3d8bf2; color: #fff; background: #0a2f7a; }
        .cd-promo-steps small { font-size: 11px; line-height: 1.3; color: #e4eeff; max-width: 70px; }
        @media (max-width: 860px) {
          .cd-split { grid-template-columns: 1fr; }
          .cd-promo { padding: 20px 18px 18px; }
          .cd-promo-badge { margin-top: 16px; }
          .cd-promo-title { font-size: 25px; }
          .cd-promo-desc, .cd-promo-steps, .cd-promo-total { display: none; }
          .cd-split-main { padding: 22px 18px 20px; }
          .cd-modal.wide { padding: 0; border-radius: 22px 22px 0 0; }
        }
        @media (max-width: 420px) {
          .cd-methods { gap: 7px; }
          .cd-methods button { padding: 14px 4px 11px; }
          .cd-methods button small { font-size: 9.5px; }
        }

        /* profile */
        .cd-profile-head { display: flex; align-items: center; gap: 14px; padding-right: 34px; }
        .cd-interest-card { display: flex; align-items: center; gap: 12px; padding: 13px; border: 1px solid #dce9f8; border-radius: 12px; background: #f5f9ff; }
        .cd-interest-icon { display: grid; place-items: center; flex: 0 0 38px; height: 38px; border-radius: 11px; background: #e0efff; color: #1265c2; }
        .cd-interest-card div { display: flex; min-width: 0; flex-direction: column; gap: 3px; }
        .cd-interest-card small, .cd-interest-card span { color: #7a8ba0; font-size: 11px; }
        .cd-interest-card strong { color: #183453; font-size: 13px; }
        .cd-profile-head h3 { margin: 0 0 4px; font-size: 18px; letter-spacing: -.3px; }
        .cd-profile-head p { margin: 0; font-size: 12px; color: #7a8ba0; }
        .cd-owned { display: inline-flex; align-items: center; gap: 5px; margin-left: auto; padding: 5px 9px; border-radius: 999px; color: #0f8a62; background: #e6f8f1; font-size: 10.5px; font-weight: 700; white-space: nowrap; }
        .cd-section-title { margin: 20px 0 10px; font-size: 11px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; color: #8392a6; }
        .cd-info { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .cd-info > div { display: flex; align-items: flex-start; gap: 10px; padding: 11px 12px; border: 1px solid #e8eef7; border-radius: 12px; background: #fafcff; font-size: 12.5px; line-height: 1.5; min-width: 0; }
        .cd-info > div.full { grid-column: 1 / -1; }
        .cd-info svg { flex: 0 0 auto; margin-top: 2px; color: #2f7ee8; }
        .cd-info small { display: block; margin-bottom: 2px; font-size: 10.5px; color: #8a99ac; }
        .cd-info a { color: #183453; text-decoration: none; overflow-wrap: anywhere; font-weight: 600; }
        .cd-info a:hover { color: #1f6fe8; }
        .cd-meter { margin-bottom: 12px; }
        .cd-meter-head { display: flex; justify-content: space-between; gap: 10px; font-size: 12px; font-weight: 700; }
        .cd-meter-head b { color: #0f5bc8; font-weight: 700; text-align: right; }
        .cd-subjects { display: flex; flex-wrap: wrap; gap: 7px; margin: -2px 0 14px; }
        .cd-subjects span { padding: 5px 10px; border-radius: 999px; background: #f1f5fb; color: #5a7190; font-size: 11px; }
        .cd-subjects b { color: #183453; }
        .cd-note { margin: -4px 0 0; font-size: 11px; color: #8a99ac; }

        /* plan card */
        .cd-bought { margin-left: 8px; padding: 2px 8px; border-radius: 999px; font-style: normal; font-size: 10px; font-weight: 700; color: #0b8461; background: #e8faf3; }
        .cd-plan { position: relative; overflow: hidden; isolation: isolate; --pc: #e19a0f; --pbg: #fff4dc; --pgrad: linear-gradient(135deg, #f5b73a, #d98a05); margin-bottom: 18px; padding: 20px 22px; border: 1px solid #e3ebf7; border-top: 4px solid var(--pc); border-radius: 16px; background: #fff; box-shadow: 0 8px 22px rgba(23,59,103,.06); }
        .cd-plan.diamond { --pc: #0e9bc4; --pbg: #e3f6fc; --pgrad: linear-gradient(135deg, #3cc4ea, #0b7fb0); }
        .cd-plan.elite { --pc: #7c4de0; --pbg: #f1eaff; --pgrad: linear-gradient(135deg, #9a72f0, #5a2fc0); }
        .cd-plan > *:not(.cd-smoke) { position: relative; z-index: 1; }
        .cd-plan::after { content: ""; position: absolute; top: 0; bottom: 0; left: -40%; width: 30%; z-index: 0; pointer-events: none; background: linear-gradient(100deg, transparent, rgba(255,255,255,.55), transparent); transform: skewX(-18deg); animation: cdSheen 7s 1.2s ease-in-out infinite; }
        .cd-smoke { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .cd-smoke i { position: absolute; bottom: -70px; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle, var(--pc) 0%, transparent 68%); filter: blur(24px); opacity: 0; animation: cdSmoke 10s ease-in-out infinite; }
        @keyframes cdSmoke { 0% { transform: translate(0, 30px) scale(.6); opacity: 0; } 25% { opacity: .26; } 100% { transform: translate(var(--x, 30px), -190px) scale(1.7); opacity: 0; } }
        @keyframes cdSheen { 0%, 55% { left: -40%; } 100% { left: 140%; } }
        @keyframes cdIconFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes cdGlow { 0%, 100% { box-shadow: 0 8px 16px rgba(0,0,0,.12), 0 0 0 0 var(--pc); } 50% { box-shadow: 0 8px 16px rgba(0,0,0,.12), 0 0 0 7px transparent; } }
        @keyframes cdShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        .cd-plan-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .cd-plan-title { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .cd-plan-icon { display: grid; place-items: center; flex: 0 0 auto; width: 46px; height: 46px; border-radius: 14px; color: #fff; background: var(--pgrad); box-shadow: 0 8px 16px rgba(0,0,0,.12); animation: cdIconFloat 3.6s ease-in-out infinite, cdGlow 2.8s ease-out infinite; }
        .cd-plan-title small { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: .8px; color: #8392a6; }
        .cd-plan-title h3 { margin: 2px 0 0; font-size: 20px; letter-spacing: -.3px; color: var(--pc); }
        .cd-plan-status { display: inline-flex; align-items: center; gap: 6px; flex: 0 0 auto; padding: 6px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 700; }
        .cd-plan-status i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; animation: cdPulse 1.8s infinite; }
        .cd-plan-status.active { color: #0b8461; background: #e8faf3; }
        .cd-plan-status.expired { color: #c2362b; background: #fdeceb; }
        .cd-plan-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; margin: 18px 0; }
        .cd-plan-grid > div { padding: 12px 14px; border-radius: 12px; border: 1px solid transparent; background: var(--pbg); min-width: 0; opacity: 0; animation: cdUp .6s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: calc(var(--i, 0) * 80ms + 500ms); transition: transform .25s, box-shadow .25s, border-color .25s; }
        .cd-plan-grid > div:hover { transform: translateY(-3px); border-color: var(--pc); box-shadow: 0 10px 20px rgba(23,59,103,.1); }
        .cd-plan-grid .cd-left b { color: #0b8461; }
        .cd-plan-grid .cd-left.warn b { color: #c47a05; }
        .cd-plan-grid .cd-left.expired b { color: #c2362b; }
        .cd-plan-grid span { display: block; font-size: 11px; font-weight: 600; color: #647a93; }
        .cd-plan-grid b { display: block; margin-top: 5px; font-size: 16px; color: #14335a; overflow-wrap: anywhere; }
        .cd-plan-grid b small { font-size: 12px; font-weight: 600; color: #8392a6; }
        .cd-plan-track { height: 8px; border-radius: 999px; background: #edf2f9; overflow: hidden; }
        .cd-plan-track span { display: block; height: 100%; border-radius: inherit; background: var(--pgrad); background-size: 200% 100%; transform-origin: left; animation: cdGrow 1.1s .6s cubic-bezier(.2,.7,.2,1) both, cdShimmer 3s 1.7s linear infinite; }
        .cd-plan-bar-text { display: flex; justify-content: space-between; gap: 8px; margin-top: 8px; font-size: 11.5px; color: #8392a6; }
        .cd-plan-bar-text b { color: var(--pc); font-weight: 700; text-align: center; }

        @media (prefers-reduced-motion: reduce) {
          .cd-smoke i, .cd-plan::after, .cd-plan-icon, .cd-plan-status i, .cd-plan-track span { animation: none !important; }
          .cd-plan-grid > div { animation: none !important; opacity: 1 !important; }
        }
        @media (max-width: 1050px) {
          .cd-plan-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .cd-plan { padding: 16px; }
          .cd-plan-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
          .cd-plan-title h3 { font-size: 17px; }
          .cd-plan-bar-text { font-size: 10.5px; }
        }

        @media (max-width: 1050px) {
          .cd-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .cd-grid { grid-template-columns: 1fr; }
          .cd-course-list { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .cd-user-text { display: none; }
          .cd-hero { flex-direction: column; align-items: flex-start; padding: 22px; }
          .cd-hero .cd-btn { width: 100%; }
          .cd-card-head { flex-wrap: wrap; }
          .cd-search input, .cd-search input:focus { width: 100%; }
          .cd-head-actions { width: 100%; }
          .cd-search { flex: 1; }
          .cd-stats { gap: 10px; }
          .cd-stat { padding: 14px; }
          .cd-stat strong { font-size: 24px; }
          .cd-badge { font-size: 9.5px; padding: 5px 7px; }

          /* table becomes cards on phones */
          .cd-table { min-width: 0; }
          .cd-table thead { display: none; }
          .cd-table, .cd-table tbody, .cd-table tr, .cd-table td { display: block; width: 100%; }
          .cd-table tbody tr { margin: 0; padding: 12px 16px; border-top: 1px solid #eef3f9; }
          .cd-table td { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 6px 0; border: 0; white-space: normal; text-align: right; }
          .cd-table td::before { content: attr(data-label); color: #8392a6; font-size: 11px; font-weight: 600; text-align: left; }
          .cd-table td.cd-empty::before { content: none; }

          .cd-overlay { align-items: flex-end; padding: 0; }
          .cd-modal { max-width: none; max-height: 92vh; padding: 24px 18px 20px; border-radius: 22px 22px 0 0; animation: cdSheet .32s cubic-bezier(.2,.8,.2,1) both; }
          .cd-info { grid-template-columns: 1fr; }
          .cd-banks { grid-template-columns: 1fr; }
          .cd-listing-row { flex-direction: column; align-items: stretch; }
          .cd-listing .cd-btn { width: 100%; }
        }
        @media (max-width: 360px) {
          .cd-two { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cd-anim, .cd-table tbody tr, .cd-progress span, .cd-topbar { animation: none !important; opacity: 1 !important; }
          .cd-hero::before, .cd-hero::after, .cd-listing::after, .cd-user-text small i, .cd-spinner { animation-duration: 0s !important; }
          .cd-overlay, .cd-modal, .cd-tick, .cd-pane, .cdp-overlay, .cdp-card { animation: none !important; }
        }
      `}</style>

      <header className="cd-topbar">
        <div className="cd-brand">
          <span className="cd-brand-mark">
            <Icon name="cap" size={20} />
          </span>
          <span>
            Campus<b>Connect</b>
          </span>
        </div>
        <div className="cd-top-right">
          <div className="cd-user">
            <span className="cd-avatar">{initials}</span>
            <div className="cd-user-text">
              <span>{collegeName}</span>
              <small>
                <i /> Verified College
              </small>
            </div>
          </div>
          <button className="cd-logout" onClick={logout}>
            <Icon name="logout" size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="cd-content">
        <section className="cd-hero cd-anim">
          <div className="cd-hero-text">
            <p className="cd-date">{today}</p>
            <h2>
              {greeting}, {collegeName} 👋
            </h2>
            <div className="cd-chips">
              <span className="cd-chip">
                <Icon name="cap" size={14} />
                {college.type || "College"}
              </span>
              <span className="cd-chip">
                <Icon name="shield" size={14} />
                Verified
              </span>
            </div>
          </div>
        </section>

        <section className="cd-stats">
          <StatCard
            icon="users"
            tone="blue"
            label="Total Students"
            value={totalStudents}
            badge="All time"
            delay={80}
          />
          <StatCard
            icon="userPlus"
            tone="green"
            label="Newly Added"
            value={newlyAdded}
            badge="New leads"
            delay={160}
          />
          <StatCard
            icon="unlock"
            tone="amber"
            label="Profiles Purchased"
            value={purchasedCount}
            badge={`${plan.name} plan`}
            delay={240}
          />
          <StatCard
            icon="wallet"
            tone="purple"
            label="Total Amount Spent"
            value={totalAmount}
            prefix="₹"
            badge={`${purchasedCount} × ${inr(PROFILE_PRICE)}`}
            delay={320}
          />
        </section>

        <section className={`cd-plan ${plan.key} cd-anim`} style={{ "--d": "360ms" }}>
          <div className="cd-smoke" aria-hidden="true">
            <i style={{ "--x": "40px", left: "4%", animationDelay: "0s", animationDuration: "9s" }} />
            <i style={{ "--x": "-30px", left: "22%", animationDelay: "-3s", animationDuration: "11s" }} />
            <i style={{ "--x": "50px", left: "45%", animationDelay: "-6s", animationDuration: "10s" }} />
            <i style={{ "--x": "-40px", left: "68%", animationDelay: "-2s", animationDuration: "12s" }} />
            <i style={{ "--x": "30px", left: "88%", animationDelay: "-5s", animationDuration: "9.5s" }} />
          </div>
          <div className="cd-plan-head">
            <div className="cd-plan-title">
              <span className="cd-plan-icon">
                <Icon name="shield" size={22} />
              </span>
              <div>
                <small>CURRENT PLAN</small>
                <h3>{plan.name} Plan</h3>
              </div>
            </div>
            <span className={`cd-plan-status ${planExpired ? "expired" : "active"}`}>
              <i /> {planExpired ? "Expired" : "Active"}
            </span>
          </div>

          <div className="cd-plan-grid">
            <div style={{ "--i": 0 }}>
              <span>Students Purchased</span>
              <b>
                {purchasedAnim}
                <small> / {totalStudents}</small>
              </b>
            </div>
            <div style={{ "--i": 1 }}>
              <span>Plan Amount</span>
              <b>{inr(totalAmount)}</b>
            </div>
            <div style={{ "--i": 2 }}>
              <span>Activated On</span>
              <b>{fmtDate(plan.startsAt)}</b>
            </div>
            <div style={{ "--i": 3 }}>
              <span>Valid Till</span>
              <b>{fmtDate(plan.endsAt)}</b>
            </div>
            <div style={{ "--i": 4 }}>
              <span>Validity</span>
              <b>{planTotalDays} days</b>
            </div>
            <div style={{ "--i": 5 }} className={planExpired ? "cd-left expired" : planDaysLeft <= 7 ? "cd-left warn" : "cd-left"}>
              <span>Days Left</span>
              <b>
                {daysLeftAnim}
                <small> day{planDaysLeft === 1 ? "" : "s"}</small>
              </b>
            </div>
          </div>

          <div className="cd-plan-bar">
            <div className="cd-plan-track">
              <span style={{ width: `${planUsedPct}%` }} />
            </div>
            <div className="cd-plan-bar-text">
              <span>{fmtDate(plan.startsAt)}</span>
              <b>
                {planExpired
                  ? "Plan ended"
                  : `${planDaysLeft} day${planDaysLeft > 1 ? "s" : ""} left`}
              </b>
              <span>{fmtDate(plan.endsAt)}</span>
            </div>
          </div>
        </section>

        <section className="cd-grid">
          <article className="cd-card cd-anim" style={{ "--d": "380ms" }}>
            <div className="cd-card-head">
              <div>
                <h3>Student Leads</h3>
                <p>Students who showed interest in {collegeName}</p>
              </div>
              <div className="cd-head-actions">
                <label className="cd-search">
                  <Icon name="search" size={15} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search students, courses..."
                    aria-label="Search students"
                  />
                </label>
                {totalStudents > ROWS_COLLAPSED && !search.trim() && (
                  <button className="cd-link" onClick={() => setExpanded((v) => !v)}>
                    {expanded ? "Show less ↑" : `View all (${totalStudents}) →`}
                  </button>
                )}
              </div>
            </div>
            <div className="cd-table-wrap">
              <table className="cd-table">
                <thead>
                  <tr>
                    <th>STUDENT</th>
                    <th>COURSE</th>
                    <th>LOCATION</th>
                    <th>12TH %</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleLeads.map((lead, i) => {
                    const fromPlan = planIds.has(lead.id);
                    const owned = fromPlan || Boolean(store.purchased[lead.id]);
                    return (
                      <tr key={lead.id} style={{ "--d": `${Math.min(i, 8) * 60 + 80}ms` }}>
                        <td data-label="Student">
                          <div className="cd-student">
                            {lead.name}
                            <small>
                              {lead.id}
                              {fromPlan && <em className="cd-bought">Purchased</em>}
                            </small>
                          </div>
                        </td>
                        <td data-label="Course">{lead.course}</td>
                        <td data-label="Location">{lead.location}</td>
                        <td data-label="12th %">
                          <b>{lead.marks}</b>
                        </td>
                        <td data-label="Status">
                          <span className={`cd-status ${lead.status.toLowerCase()}`}>{lead.status}</span>
                        </td>
                        <td data-label="Action">
                          {owned ? (
                            <button className="cd-unlock owned" onClick={() => setProfile(lead)}>
                              <Icon name="check" size={13} />
                              View Profile
                            </button>
                          ) : (
                            <button
                              className="cd-unlock"
                              onClick={() => {
                                const now = Date.now();
                                setStore((current) => ({
                                  ...current,
                                  purchased: {
                                    ...current.purchased,
                                    [lead.id]: { ts: now, txn: "FREE-UNLOCK", amountPaid: 0 },
                                  },
                                  events: addEvent(current, "Student profile unlocked", `${lead.id} (${lead.name}) unlocked without payment`),
                                }));
                                setProfile(lead);
                              }}
                            >
                              <Icon name="unlock" size={13} />
                              Unlock Profile
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredLeads.length === 0 && (
                    <tr style={{ "--d": "0ms" }}>
                      <td className="cd-empty" colSpan="6">
                        No students match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <div className="cd-side">
            <article className="cd-listing cd-anim" style={{ "--d": "420ms" }}>
              <div className="cd-listing-top">
                <small>GOOGLE TOP LISTING</small>
                {listingActive && (
                  <span className="cd-live">
                    <i /> Active
                  </span>
                )}
              </div>
              <h4>
                {listingActive
                  ? `${collegeName} is listed on top of Google`
                  : `Show ${collegeName} at the top when students search on Google`}
              </h4>
              <p>
                {listingActive
                  ? `Active until ${fmtDate(store.listing.expiresAt)} • ${daysLeft} day${
                      daysLeft > 1 ? "s" : ""
                    } left`
                  : `Get more student enquiries. Pay ${inr(LISTING_PRICE)} every month to keep your college on top.`}
              </p>
              <div className="cd-listing-row">
                <div className="cd-price">
                  {inr(LISTING_PRICE)} <span>/ month</span>
                </div>
                <button className="cd-btn" onClick={startListingPayment} disabled={introOn}>
                  {listingActive ? "Renew" : "Pay Now"}
                </button>
              </div>
            </article>

            <article className="cd-card cd-anim" style={{ "--d": "500ms" }}>
              <div className="cd-card-head">
                <div>
                  <h3>Recent Activity</h3>
                  <p>Your latest dashboard activity</p>
                </div>
              </div>
              <div className="cd-list">
                {activity.map((item, i) => (
                  <div className="cd-activity" key={`${item.title}-${i}`}>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                    <small>{item.ago}</small>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="cd-card cd-courses cd-anim" style={{ "--d": "560ms" }}>
          <div className="cd-card-head">
            <div>
              <h3>Course Performance</h3>
              <p>Interest received for your active courses</p>
            </div>
          </div>
          <div className="cd-course-list">
            {allCourses.map((course, i) => (
              <div className="cd-course" key={course.name}>
                <div className="cd-course-head">
                  <span>{course.name}</span>
                  <small>
                    {course.leads} leads • {course.seats} seats
                  </small>
                </div>
                <div className="cd-progress">
                  <span style={{ width: `${course.fill}%`, "--d": `${700 + i * 120}ms` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="cd-footer">CampusConnect • Student Lead Management Platform</footer>
      </main>

      {addCourseOpen && (
        <AddCourseModal
          existing={allCourses}
          onAdd={handleAddCourse}
          onClose={() => setAddCourseOpen(false)}
        />
      )}

      {payment && payment.kind === "unlock" && (
        <PaymentModal
          title={`Unlock ${payment.lead.name}'s profile`}
          subtitle="Pay once to see this student's full contact and academic details."
          amount={PROFILE_PRICE}
          summary={
            <div className="cd-teaser">
              <Icon name="lock" size={20} />
              <div>
                <b>{payment.lead.name}</b>
                <span>
                  {payment.lead.id} • {payment.lead.course} • {payment.lead.location}
                </span>
                <p>Email, phone, address, 10th, 12th marks and cutoff unlock after payment.</p>
              </div>
            </div>
          }
          onPaid={handlePaid}
          onClose={closePayment}
        />
      )}

      {payment && payment.kind === "listing" && (
        <PaymentModal
          title="Complete Your Payment"
          receiptLabel={`Google top listing - ${collegeName}`}
          subtitle={`Secure your top listing for ${collegeName} for ${LISTING_DAYS} days.`}
          amount={LISTING_PRICE}
          promo={<ListingPromo collegeName={collegeName} amount={LISTING_PRICE} days={LISTING_DAYS} />}
          onPaid={handlePaid}
          onClose={closePayment}
        />
      )}

      {profile && <ProfileModal lead={profile} onClose={() => setProfile(null)} />}

      {introOn && (
        <div className="cx-intro" aria-hidden="true">
          <div className="cx-ring">
            {SMOKE.map((m, i) => (
              <i key={i} className={m.cls} style={{ "--sx": m.sx, "--sy": m.sy, "--ex": m.ex, "--ey": m.ey, "--s": `${m.size}px`, animationDelay: `${m.delay}s` }} />
            ))}
          </div>
          <div className="cx-center">
            <span className="cx-core" />
            <span className="cx-logo">
              <svg viewBox="0 0 32 32" fill="#6d28d9" stroke="#6d28d9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 6 3 12.5 16 19l13-6.5L16 6Z" /><path d="M9 16.5V22c0 1.7 3.1 3.5 7 3.5s7-1.8 7-3.5v-5.5l-7 3.5-7-3.5Z" /><path d="M29 13v7" fill="none" /></svg>
            </span>
          </div>
          <p className="cx-brandtxt">Campus<em>Connect</em></p>
        </div>
      )}
    </div>
  );
}