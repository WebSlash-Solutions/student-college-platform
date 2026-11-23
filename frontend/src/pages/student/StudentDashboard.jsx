import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dbData from "./db.json";
import artsData from "./arts.json";
import medicalData from "./medical.json";
import nursingData from "./nursing.json";
import alliedData from "./allied.json";
import physiotherapyData from "./Physiotherapy.json";
import pharmacyData from "./pharmacy.json";
import lawData from "./law.json";
import agricultureData from "./agriculture.json";
import dentalData from "./dental.json";
import veterinaryData from "./veterinary.json";
import homeopathyData from "./homeopathy.json";
import LoginView from "./login.jsx";
import homeStudentImage from "../../assets/home student.png";
import aboutStudentImage from "../../assets/about student.jpg";

const API_ORIGIN = window.location.origin;
const USERS = Array.isArray(dbData?.users) ? dbData.users : [];

/* ---------- icons ---------- */

const paths = {
  cap: "M2 9l10-5 10 5-10 5L2 9zm4 3v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  check: "M4.5 12.5l4.5 4.5L19.5 6.5",
  grid: "M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z",
  sparkle:
    "M12 3.5L13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  pin: "M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  star:
    "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z",
  book:
    "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 016.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z",
  building:
    "M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2",
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

/* ---------- navigation ---------- */

const NAV = [
  { label: "Home", href: "#home", route: "/student/dashboard" },
  { label: "About", href: "#about", route: "/student/about" },
  { label: "Colleges", href: "#colleges", route: "/student/colleges" },
  { label: "Courses", href: "#courses", route: "/student/courses" },
];

/* ---------- apply now: constants (applications are kept in localStorage) ---------- */

const APPLICATIONS_KEY = "scp_applications";

const APPLY_STREAMS = [
  "Bio-Maths",
  "Biology",
  "Computer Science",
  "Arts",
  "Commerce",
  "Vocational",
  "Other",
];

const APPLY_CATEGORIES = [
  { id: "engineering", label: "Engineering", match: ["Engineering"], cutoff: "engineering" },
  { id: "arts", label: "Arts and Science", match: ["Arts"], cutoff: null },
  { id: "law", label: "Law", match: ["Law"], cutoff: null },
  {
    id: "health",
    label: "Health and Medical Science",
    match: ["Medical", "Nursing", "Allied", "Physiotherapy", "Pharmacy"],
    cutoff: "pcb",
  },
  { id: "agriculture", label: "Agriculture", match: ["Agriculture"], cutoff: "agri" },
  { id: "polytechnic", label: "Polytechnic", match: ["Polytechnic"], cutoff: null },
  { id: "veterinary", label: "Veterinary", match: ["Veterinary"], cutoff: "pcb" },
  { id: "homeopathy", label: "Homeopathy", match: ["Homeopathy"], cutoff: "pcb" },
  { id: "dental", label: "Dental", match: ["Dental"], cutoff: "neet" },
];

const APPLY_SUB_LABELS = { Allied: "Allied Health" };

const applyKeyFor = (categoryId, name, place) =>
  `${categoryId}|${name}|${place}`.toLowerCase();

const SUBJECT_FIELDS = {
  maths: "Maths",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  bioMaths: "Biology / Maths (higher mark)",
};

const CUTOFF_RULES = {
  engineering: {
    max: 200,
    fields: ["maths", "physics", "chemistry"],
    weights: { maths: 1, physics: 0.5, chemistry: 0.5 },
    formula: "Maths + Physics/2 + Chemistry/2",
  },
  pcb: {
    max: 200,
    fields: ["biology", "physics", "chemistry"],
    weights: { biology: 1, physics: 0.5, chemistry: 0.5 },
    formula: "Biology + Physics/2 + Chemistry/2",
  },
  pharm: {
    max: 200,
    fields: ["bioMaths", "physics", "chemistry"],
    weights: { bioMaths: 1, physics: 0.5, chemistry: 0.5 },
    formula: "Biology or Maths (higher) + Physics/2 + Chemistry/2",
  },
  agri: {
    max: 200,
    fields: ["bioMaths", "physics", "chemistry"],
    weights: { bioMaths: 1, physics: 0.5, chemistry: 0.5 },
    formula: "Biology or Maths (higher) + Physics/2 + Chemistry/2",
  },
  neet: {
    max: 720,
    fields: [],
    weights: null,
    label: "NEET-UG Score (Cutoff)",
    formula: "your NEET-UG score",
    manual: true,
  },
};

const ruleKeyFor = (category, course) => {
  if (!category || !category.cutoff) return null;

  if (category.id === "health") {
    if (
      /^(M\.?B\.?B\.?S|B\.?D\.?S|B\.?[AHSU]\.?M\.?S|B\.?N\.?Y\.?S)(?![A-Za-z])/i.test(
        course || "",
      )
    ) {
      return "neet";
    }
    if (/pharm/i.test(course || "")) return "pharm";
  }

  return category.cutoff;
};

const EMPTY_APPLY_FORM = {
  categoryId: "",
  collegeKey: "",
  course: "",
  studentName: "",
  mobile: "",
  email: "",
  mark12: "",
  mark10: "",
  stream: "",
  maths: "",
  physics: "",
  chemistry: "",
  biology: "",
  bioMaths: "",
  cutoff: "",
};

const APPLY_FIELD_ORDER = [
  "studentName",
  "mobile",
  "email",
  "categoryId",
  "stream",
  "collegeKey",
  "course",
  "mark10",
  "mark12",
  "maths",
  "biology",
  "bioMaths",
  "physics",
  "chemistry",
  "cutoff",
];

// fields that feed the cutoff; changing one clears a stale cutoff error
const CUTOFF_INPUTS = [
  "categoryId",
  "mark12",
  "mark10",
  "maths",
  "physics",
  "chemistry",
  "biology",
  "bioMaths",
  "course",
];

const CONFETTI_COLORS = [
  "#0f766e",
  "#e08a1e",
  "#2dd4bf",
  "#f59e0b",
  "#10B981",
  "#142033",
];

const CONFETTI = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2;
  const distance = 90 + (i % 3) * 45;

  return {
    x: `${Math.round(Math.cos(angle) * distance)}px`,
    y: `${Math.round(Math.sin(angle) * distance - 20)}px`,
    r: `${(i * 67) % 360}deg`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: `${(i % 5) * 0.04}s`,
  };
});

const readApplications = () => {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

const parseMark = (value) => {
  if (String(value).trim() === "") return null;
  const number = Number(value);
  return Number.isNaN(number) || number < 0 || number > 100 ? null : number;
};

const computeCutoff = (rule, form) => {
  if (!rule.weights) return null;

  let total = 0;

  for (const [key, weight] of Object.entries(rule.weights)) {
    const mark = parseMark(form[key]);
    if (mark === null) return null;
    total += mark * weight;
  }

  return Math.round(total * 100) / 100;
};

const markError = (value, label) => {
  if (String(value).trim() === "") return `${label} mark is required.`;
  const number = Number(value);
  if (Number.isNaN(number) || number < 0 || number > 100) {
    return `${label} mark must be a number between 0 and 100.`;
  }
  return "";
};

const validateApplication = (form, rule, cutoffValue) => {
  const errors = {};

  if (!form.categoryId) errors.categoryId = "Please select a college category.";
  if (!form.collegeKey) errors.collegeKey = "Please select a college.";
  if (!form.course) errors.course = "Please select a course.";

  const name = form.studentName.trim();
  if (!name) {
    errors.studentName = "Student name is required.";
  } else if (name.length < 2 || !/^[A-Za-z][A-Za-z .'-]*$/.test(name)) {
    errors.studentName =
      "Enter a valid name (letters, spaces and . ' - only).";
  }

  if (!form.mobile) {
    errors.mobile = "Mobile number is required.";
  } else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";
  }

  const email = form.email.trim();
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const e12 = markError(form.mark12, "12th");
  if (e12) errors.mark12 = e12;

  const e10 = markError(form.mark10, "10th");
  if (e10) errors.mark10 = e10;

  if (!form.stream) errors.stream = "Please select your stream / group.";

  if (rule) {
    rule.fields.forEach((key) => {
      const message = markError(form[key], SUBJECT_FIELDS[key]);
      if (message) errors[key] = message;
    });

    if (String(cutoffValue).trim() === "") {
      errors.cutoff = "Cutoff mark is required.";
    } else {
      const number = Number(cutoffValue);
      if (Number.isNaN(number) || number < 0 || number > rule.max) {
        errors.cutoff = `Cutoff must be a number between 0 and ${rule.max}.`;
      }
    }
  }

  return errors;
};

const FORM_ICONS = {
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  mail: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6",
  phone:
    "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14zM6.5 17H20v4H6.5a2.5 2.5 0 010-4z",
  building: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01",
  cap: "M2 9l10-5 10 5-10 5L2 9zm4 3v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
  percent: "M19 5L5 19M7.5 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  target:
    "M12 22a10 10 0 100-20 10 10 0 000 20zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  pin: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z",
  check: "M4.5 12.5l4.5 4.5L19.5 6.5",
  "check-circle": "M22 11.1V12a10 10 0 11-5.9-9.1M22 4L12 14l-3-3",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
  "x-circle": "M12 22a10 10 0 100-20 10 10 0 000 20zM15 9l-6 6M9 9l6 6",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h8",
  edit: "M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z",
  id: "M3 5h18v14H3zM7 10h4M7 14h2M15 10h2M15 14h2",
  calendar: "M3 5h18v16H3zM16 3v4M8 3v4M3 10h18",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
};

function FormIcon({ name, size = 18 }) {
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
      <path d={FORM_ICONS[name] || FORM_ICONS.file} />
    </svg>
  );
}

function ApplyField({ id, label, error, full, icon, required = true, children }) {
  return (
    <div
      className={`cc-apply-field${full ? " cc-apply-full" : ""}${error ? " has-error" : ""}`}
    >
      <label htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {icon ? (
        <div className="cc-fld-box has-icon">
          <i className="cc-fld-icon">
            <FormIcon name={icon} size={17} />
          </i>
          {children}
        </div>
      ) : (
        children
      )}
      {error && (
        <small className="cc-apply-error" id={`${id}-error`} role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

const formatAppId = (id) => `APP-${String(id).slice(-6)}`;

/* shared keyframes for the Apply Now modal and the profile dashboard */
const KEYFRAMES_CSS = `
@keyframes ccxFade{from{opacity:0}to{opacity:1}}
@keyframes ccxFadeOut{from{opacity:1}to{opacity:0}}
@keyframes ccxModalIn{from{opacity:0;transform:translateY(26px) scale(.97)}to{opacity:1;transform:none}}
@keyframes ccxModalOut{from{opacity:1;transform:none}to{opacity:0;transform:translateY(18px) scale(.98)}}
@keyframes ccxRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes ccxPanel{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes ccxFloat{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(16px,-20px,0)}}
@keyframes ccxSpin{to{transform:rotate(360deg)}}
@keyframes ccxPop{0%{transform:scale(.6)}70%{transform:scale(1.15)}100%{transform:scale(1)}}
@keyframes ccxToast{from{opacity:0;transform:translate(-50%,14px)}to{opacity:1;transform:translate(-50%,0)}}
.cc-spinner{display:inline-block;width:16px;height:16px;margin-right:8px;border:2px solid rgba(255,255,255,.45);border-top-color:#fff;border-radius:50%;animation:ccxSpin .7s linear infinite;vertical-align:-3px}
`;

/* one field look for every form that uses ApplyField with icons */
const fieldCss = (s) => `
${s} .cc-apply-field label::before{display:none}
${s} .cc-apply-field label{font-size:.84rem;color:var(--navy)}
${s} .cc-fld-box{position:relative}
${s} .cc-fld-icon{position:absolute;left:14px;top:0;z-index:1;display:grid;place-items:center;height:48px;color:var(--muted);pointer-events:none;transition:color .2s ease}
${s} .cc-fld-box:focus-within .cc-fld-icon{color:var(--brand)}
${s} .cc-fld-box small{display:block;margin-top:6px}
${s} .cc-apply-control{height:48px;padding:0 14px;border:1.5px solid #dbe5e2;border-radius:14px;background:#fff;color:var(--navy);transition:border-color .2s ease,box-shadow .2s ease,background .2s ease}
${s} .cc-fld-box.has-icon .cc-apply-control{padding-left:42px}
${s} select.cc-apply-control{appearance:none;-webkit-appearance:none;padding-right:38px;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9l6 6 6-6'/></svg>");background-repeat:no-repeat;background-position:right 14px center}
${s} .cc-apply-control:hover:not(:disabled){border-color:#9fc9c1}
${s} .cc-apply-field .cc-apply-control:focus{border-color:var(--brand);box-shadow:0 0 0 4px rgba(15,118,110,.15);transform:none}
${s} .cc-apply-control:disabled{background:#F1F5F4;color:var(--muted);cursor:not-allowed}
${s} .cc-apply-field.has-error .cc-apply-control{border-color:#DC2626;background:#FFFAFA}
${s} .cc-apply-field.has-error .cc-apply-control:focus{box-shadow:0 0 0 4px rgba(220,38,38,.14)}
${s} .cc-apply-error{padding-left:2px}
${s} .cc-apply-hint{padding-left:2px}
${s} .cc-btn-primary{color:#fff;border:0;background:linear-gradient(135deg,var(--brand),var(--deep));box-shadow:0 10px 22px rgba(15,118,110,.28);transition:transform .2s ease,box-shadow .2s ease,filter .2s ease}
${s} .cc-btn-primary:hover:not(:disabled){transform:translateY(-2px);filter:brightness(1.06);box-shadow:0 14px 28px rgba(15,118,110,.34)}
${s} .cc-btn-ghost{background:#fff;border:1.5px solid #dbe5e2;color:var(--navy)}
${s} .cc-btn-ghost:hover:not(:disabled){border-color:var(--brand);color:var(--brand)}
`;

const APPLY_STYLE = KEYFRAMES_CSS + `
.cc-ap-backdrop{backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);background:rgba(20,32,51,.62)!important;animation:ccxFade .25s ease both}
.cc-ap-backdrop.is-closing{animation:ccxFadeOut .2s ease both}

.cc-ap-modal.cc-apply-modal{
  position:relative;display:flex;flex-direction:column;overflow:hidden;
  width:min(960px,100%);max-height:92vh;max-height:92dvh;
  background:linear-gradient(160deg,#F7FBFA 0%,#EEF6F4 48%,#FCF6EA 100%);
  border-radius:26px;box-shadow:0 30px 80px rgba(8,20,35,.35);
  animation:ccxModalIn .42s cubic-bezier(.2,.8,.2,1) both;
}
.cc-ap-modal.cc-apply-modal::before{display:none}
.cc-ap-modal.is-closing{animation:ccxModalOut .2s ease both}

.cc-ap-orbs{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
.cc-ap-orbs i{position:absolute;border-radius:50%;filter:blur(38px);opacity:.5;animation:ccxFloat 12s ease-in-out infinite}
.cc-ap-orbs i:nth-child(1){width:260px;height:260px;left:-70px;top:-60px;background:#99e0d4}
.cc-ap-orbs i:nth-child(2){width:220px;height:220px;right:-60px;top:38%;background:#fbd9a0;animation-delay:-4s}
.cc-ap-orbs i:nth-child(3){width:200px;height:200px;left:32%;bottom:-100px;background:#c7d7fe;animation-delay:-8s}

.cc-ap-modal .cc-modal-close{top:14px;right:14px}
.cc-ap-scroll{position:relative;z-index:1;flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain}

.cc-apply-form.cc-ap-form{padding:30px 28px 0}
.cc-ap-head{margin-bottom:18px}
.cc-ap-head .cc-eyebrow,.cc-ap-head h2,.cc-ap-head .cc-apply-sub{padding-right:48px}
.cc-ap-head .cc-eyebrow{margin-right:48px;padding-right:12px}
.cc-ap-form h2,.cc-ap-success h2{background:none;-webkit-text-fill-color:var(--navy);color:var(--navy);animation:none;margin:8px 0 0;font-size:clamp(1.5rem,3vw,2rem)}
.cc-ap-head .cc-apply-sub{margin:6px 0 0;color:var(--muted-dark)}

.cc-ap-steps{display:flex;gap:8px;list-style:none;margin:18px 0 10px;padding:0}
.cc-ap-steps li{flex:1;min-width:0;display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:14px;background:rgba(255,255,255,.72);border:1px solid #e1eae7;color:var(--muted);font-size:.82rem;font-weight:700;transition:border-color .25s ease,box-shadow .25s ease,color .25s ease}
.cc-ap-step-dot{flex:none;display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#e6eeec;color:var(--muted-dark);font-size:.78rem}
.cc-ap-step-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cc-ap-steps li.is-current{border-color:var(--brand);color:var(--navy);box-shadow:0 6px 16px rgba(15,118,110,.12)}
.cc-ap-steps li.is-current .cc-ap-step-dot{background:var(--brand);color:#fff}
.cc-ap-steps li.is-done{color:var(--navy)}
.cc-ap-steps li.is-done .cc-ap-step-dot{background:#16a34a;color:#fff;animation:ccxPop .4s ease both}
.cc-ap-bar{height:6px;border-radius:999px;background:#dce8e5;overflow:hidden}
.cc-ap-bar i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--brand),#e08a1e);transition:width .5s cubic-bezier(.2,.8,.2,1)}

.cc-ap-body{display:grid;gap:16px}
.cc-ap-card{background:rgba(255,255,255,.93);border:1px solid #e1eae7;border-radius:20px;padding:22px 24px 24px;box-shadow:0 8px 24px rgba(20,32,51,.06);transition:box-shadow .25s ease,border-color .25s ease;animation:ccxRise .5s cubic-bezier(.2,.8,.2,1) backwards}
.cc-ap-card:nth-child(2){animation-delay:.07s}
.cc-ap-card:nth-child(3){animation-delay:.14s}
.cc-ap-card:focus-within{box-shadow:0 14px 34px rgba(15,118,110,.14);border-color:#b4d9d1}
.cc-ap-card-head{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.cc-ap-card-ico{flex:none;display:grid;place-items:center;width:42px;height:42px;border-radius:13px;color:#fff;background:linear-gradient(135deg,var(--brand),var(--deep));box-shadow:0 8px 18px rgba(15,118,110,.25)}
.cc-ap-card-head h3{margin:0;font-size:1.08rem;color:var(--navy)}
.cc-ap-card-head p{margin:2px 0 0;font-size:.84rem;color:var(--muted)}
.cc-ap-card-state{margin-left:auto;flex:none;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;background:#E3F7EE;color:#047857;font-size:.74rem;font-weight:800;font-style:normal}

.cc-ap-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 18px}
.cc-ap-grid>*{min-width:0}
.cc-ap-cutoff{grid-column:1/-1;padding:16px;border-radius:16px;background:#F1F8F6;border:1px dashed #a9d3ca;animation:ccxRise .4s cubic-bezier(.2,.8,.2,1) backwards}
.cc-ap-cutoff-head{display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:.82rem;font-weight:700;color:var(--deep)}
.cc-ap-note{grid-column:1/-1;display:flex;align-items:center;gap:10px;margin:0;padding:12px 14px;border-radius:14px;background:#FBF6EC;border:1px solid #f0dfbf;color:#7a5a1c;font-size:.86rem}
.cc-ap-note svg{flex:none}

.cc-ap-modal .cc-apply-locked{background:#F1F8F6;border:1.5px solid #a9d3ca;animation:none}

.cc-ap-actions{position:sticky;bottom:0;z-index:4;display:flex;align-items:center;justify-content:flex-end;gap:12px;margin:18px -28px 0;padding:14px 28px;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid #e1eae7}
.cc-ap-actions-hint{margin-right:auto;font-size:.82rem;color:var(--muted)}

.cc-ap-success{position:relative;overflow:hidden;background:transparent;padding:52px 28px 38px}
.cc-ap-receipt{display:grid;grid-template-columns:1fr 1fr;gap:14px 18px;width:100%;max-width:520px;margin:22px 0 0;padding:18px 20px;background:#fff;border:1px solid #e1eae7;border-radius:18px;text-align:left;animation:ccxRise .5s ease .3s backwards}
.cc-ap-receipt dt{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.cc-ap-receipt dd{margin:3px 0 0;font-weight:700;color:var(--navy);overflow-wrap:anywhere}
.cc-ap-success .cc-apply-actions{margin-top:24px}

@media (max-width:680px){
  .cc-ap-backdrop{padding:0;place-items:end center}
  .cc-ap-modal.cc-apply-modal{width:100%;border-radius:22px 22px 0 0;max-height:94vh;max-height:94dvh}
  .cc-apply-form.cc-ap-form{padding:24px 14px 0}
  .cc-ap-card{padding:18px 16px 20px}
  .cc-ap-grid,.cc-ap-receipt{grid-template-columns:1fr}
  .cc-ap-steps li{flex:0 0 auto;padding:8px}
  .cc-ap-steps li.is-current{flex:1 1 auto}
  .cc-ap-steps li:not(.is-current) .cc-ap-step-label{display:none}
  .cc-ap-actions{margin:16px -14px 0;padding:12px 14px}
  .cc-ap-actions-hint{display:none}
  .cc-ap-actions{flex-wrap:nowrap;flex-direction:row}
  .cc-ap-actions .cc-btn{width:auto}
  .cc-ap-actions .cc-btn{flex:1 1 0;min-width:0;justify-content:center;padding-left:12px;padding-right:12px}
  .cc-ap-actions .cc-btn[type=submit]{flex:1.6 1 0}
  .cc-ap-card-state span{display:none}
}

@media (prefers-reduced-motion:reduce){
  .cc-ap-backdrop,.cc-ap-modal,.cc-ap-card,.cc-ap-cutoff,.cc-ap-receipt,.cc-ap-orbs i,.cc-ap-bar i,.cc-ap-step-dot,.cc-apply-field.has-error .cc-apply-control{animation:none!important;transition:none!important}
}
` + fieldCss(".cc-ap-modal");

function ApplyNow({
  college,
  colleges,
  courseIndex,
  helpers,
  user,
  profile,
  userKey,
  myApplications,
  onClose,
  onSubmitted,
  onViewApplications,
}) {
  // Every college tagged with its apply category. A college that appears in
  // two files (e.g. Medical and Allied) is merged into one entry.
  const applyColleges = useMemo(() => {
    const { getCategory, getCollegeName, getLocation, courseDetails, getCourseName } =
      helpers;
    const merged = new Map();

    colleges.forEach((item) => {
      const raw = getCategory(item);
      const category = APPLY_CATEGORIES.find((entry) => entry.match.includes(raw));
      if (!category) return;

      const name = getCollegeName(item);
      const place = getLocation(item);
      const key = applyKeyFor(category.id, name, place);

      const names = courseDetails(item, courseIndex)
        .map((course) => getCourseName(course))
        .filter(Boolean);

      const existing = merged.get(key);

      if (existing) {
        names.forEach((courseName) => {
          if (!existing.courses.includes(courseName)) {
            existing.courses.push(courseName);
          }
        });
        return;
      }

      merged.set(key, {
        key,
        categoryId: category.id,
        name,
        place,
        group: APPLY_SUB_LABELS[raw] || raw,
        courses: [...new Set(names)],
      });
    });

    return [...merged.values()]
      .map((item) => {
        const label = item.place ? `${item.name} — ${item.place}` : item.name;
        return {
          ...item,
          label: item.courses.length
            ? label
            : `${label} (course details unavailable)`,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [colleges, courseIndex, helpers]);

  const [preset] = useState(() => {
    if (!college) return null;

    const raw = helpers.getCategory(college);
    const category = APPLY_CATEGORIES.find((item) => item.match.includes(raw));
    if (!category) return null;

    const key = applyKeyFor(
      category.id,
      helpers.getCollegeName(college),
      helpers.getLocation(college),
    );

    return applyColleges.some((item) => item.key === key)
      ? { categoryId: category.id, collegeKey: key }
      : null;
  });

  const [applyForm, setApplyForm] = useState(() => ({
    ...EMPTY_APPLY_FORM,
    studentName: profile?.fullName || user?.name || "",
    email: user?.email || "",
    mobile: profile?.mobileNumber || "",
    mark12: profile ? String(profile.twelfthMark) : "",
    mark10: profile ? String(profile.tenthMark) : "",
    ...(preset || {}),
  }));
  const [applyErrors, setApplyErrors] = useState({});
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applyLocked, setApplyLocked] = useState(Boolean(preset));

  const applyCategory = APPLY_CATEGORIES.find(
    (item) => item.id === applyForm.categoryId,
  );

  const applyGroups = useMemo(() => {
    const groups = {};
    applyColleges
      .filter((item) => item.categoryId === applyForm.categoryId)
      .forEach((item) => {
        (groups[item.group] = groups[item.group] || []).push(item);
      });
    return Object.entries(groups);
  }, [applyColleges, applyForm.categoryId]);

  const applyCollegeCount = applyGroups.reduce(
    (total, [, items]) => total + items.length,
    0,
  );

  const applyCollege = applyColleges.find(
    (item) =>
      item.key === applyForm.collegeKey &&
      item.categoryId === applyForm.categoryId,
  );

  const ruleKey = ruleKeyFor(applyCategory, applyForm.course);
  const cutoffRule = ruleKey ? CUTOFF_RULES[ruleKey] : null;
  const calculatedCutoff = cutoffRule ? computeCutoff(cutoffRule, applyForm) : null;
  const cutoffValue =
    applyForm.cutoff !== ""
      ? applyForm.cutoff
      : calculatedCutoff !== null
        ? String(calculatedCutoff)
        : "";

  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);
  const closeRef = useRef(null);

  // closes with a short fade; blocked while an application is being sent
  const requestClose = () => {
    if (submitting || closing) return;
    setClosing(true);
    closeTimer.current = window.setTimeout(onClose, 200);
  };
  closeRef.current = requestClose;

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") closeRef.current?.();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const updateApplyField = (name, value) => {
    setApplyForm((prev) => {
      if (name === "categoryId") {
        return { ...prev, categoryId: value, collegeKey: "", course: "", cutoff: "" };
      }
      // the course list depends on the selected college, so clear the old course
      if (name === "collegeKey") {
        return { ...prev, collegeKey: value, course: "" };
      }
      return { ...prev, [name]: value };
    });

    setApplyErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      delete next.form;
      if (name === "categoryId") {
        delete next.collegeKey;
        delete next.course;
      }
      if (name === "collegeKey") delete next.course;
      if (CUTOFF_INPUTS.includes(name)) delete next.cutoff;
      return next;
    });
  };

  const submitApplication = (event) => {
    event.preventDefault();
    if (submitting) return;

    const errors = validateApplication(applyForm, cutoffRule, cutoffValue);

    if (applyCollege && applyCollege.courses.length === 0) {
      errors.course = "Course details for this college are not available yet.";
    }

    if (!errors.course && applyCollege) {
      if (!applyCollege.courses.includes(applyForm.course)) {
        errors.course = "This course is not offered by the selected college.";
      } else if (
        myApplications.some(
          (item) =>
            item.collegeName === applyCollege.name &&
            item.city === applyCollege.place &&
            item.courseName === applyForm.course,
        )
      ) {
        errors.course = "You have already applied for this course here.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setApplyErrors(errors);
      const first = APPLY_FIELD_ORDER.find((field) => errors[field]);
      if (first) document.getElementById(`apply-${first}`)?.focus();
      return;
    }

    const subjects = {};
    (cutoffRule ? cutoffRule.fields : []).forEach((key) => {
      subjects[key] = Number(applyForm[key]);
    });

    const record = {
      id: Date.now(),
      userKey,
      categoryLabel: applyCategory.label,
      collegeName: applyCollege.name,
      city: applyCollege.place,
      courseName: applyForm.course,
      studentName: applyForm.studentName.trim(),
      mobile: applyForm.mobile,
      email: applyForm.email.trim(),
      mark12: Number(applyForm.mark12),
      mark10: Number(applyForm.mark10),
      stream: applyForm.stream,
      subjects,
      cutoff: cutoffRule ? Number(cutoffValue) : null,
      cutoffMax: cutoffRule ? cutoffRule.max : null,
      status: "Pending",
      appliedOn: new Date().toISOString(),
    };

    setApplyErrors({});
    setSubmitting(true);

    // short delay so the loading state is visible
    window.setTimeout(() => {
      const existing = readApplications();

      // re-check against the freshest stored data (another tab may have applied)
      const duplicate = existing.some(
        (item) =>
          item.userKey === userKey &&
          item.collegeName === record.collegeName &&
          item.city === record.city &&
          item.courseName === record.courseName,
      );

      if (duplicate) {
        setSubmitting(false);
        setApplyErrors({ course: "You have already applied for this course here." });
        return;
      }

      const next = [record, ...existing];

      try {
        localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
      } catch {
        setSubmitting(false);
        setApplyErrors({
          form: "Could not save your application. Please enable browser storage and try again.",
        });
        return;
      }

      onSubmitted(next);
      setSubmittedApp(record);
      setSubmitting(false);
      setApplySubmitted(true);
    }, 800);
  };

  /* ---------- progress through the three sections ---------- */

  const nameValue = applyForm.studentName.trim();
  const cutoffNumber = Number(cutoffValue);

  const personalDone =
    nameValue.length >= 2 &&
    /^[A-Za-z][A-Za-z .'-]*$/.test(nameValue) &&
    /^[6-9]\d{9}$/.test(applyForm.mobile) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(applyForm.email.trim());

  const academicDone =
    Boolean(applyForm.stream) &&
    !markError(applyForm.mark10, "10th") &&
    !markError(applyForm.mark12, "12th") &&
    (!cutoffRule ||
      (cutoffRule.fields.every((key) => !markError(applyForm[key], "Subject")) &&
        String(cutoffValue).trim() !== "" &&
        !Number.isNaN(cutoffNumber) &&
        cutoffNumber >= 0 &&
        cutoffNumber <= cutoffRule.max));

  const selectionDone = Boolean(
    applyCollege &&
      applyForm.course &&
      applyCollege.courses.includes(applyForm.course),
  );

  const steps = [
    { id: "personal", label: "Personal", done: personalDone },
    { id: "academic", label: "Academic", done: academicDone },
    { id: "selection", label: "College & Course", done: selectionDone },
  ];
  const doneCount = steps.filter((step) => step.done).length;
  const currentStep = steps.findIndex((step) => !step.done);

  /* ---------- field helpers ---------- */

  const textField = (name, label, props, full) => (
    <ApplyField
      id={`apply-${name}`}
      label={label}
      error={applyErrors[name]}
      full={full}
      icon={props.icon}
    >
      <input
        id={`apply-${name}`}
        className="cc-apply-control"
        value={applyForm[name]}
        aria-invalid={Boolean(applyErrors[name])}
        onChange={(event) =>
          updateApplyField(
            name,
            props.clean ? props.clean(event.target.value) : event.target.value,
          )
        }
        {...props.input}
      />
    </ApplyField>
  );

  const markField = (name, label, placeholder, full, icon = "percent") => (
    <ApplyField
      key={name}
      id={`apply-${name}`}
      label={label}
      error={applyErrors[name]}
      full={full}
      icon={icon}
    >
      <input
        id={`apply-${name}`}
        type="number"
        inputMode="decimal"
        min="0"
        max="100"
        step="0.01"
        className="cc-apply-control"
        placeholder={placeholder}
        value={applyForm[name]}
        aria-invalid={Boolean(applyErrors[name])}
        onChange={(event) => updateApplyField(name, event.target.value)}
      />
    </ApplyField>
  );

  const sectionState = (done) =>
    done ? (
      <em className="cc-ap-card-state">
        <FormIcon name="check" size={13} />
        <span>Complete</span>
      </em>
    ) : null;

  return (
    <>
      <style>{APPLY_STYLE}</style>

      <div
        className={`cc-modal-backdrop cc-apply-backdrop cc-ap-backdrop${closing ? " is-closing" : ""}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) requestClose();
        }}
      >
        <div
          className={`cc-modal cc-apply-modal cc-ap-modal${closing ? " is-closing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-title"
        >
          <div className="cc-ap-orbs" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          <button
            type="button"
            className="cc-modal-close"
            aria-label="Close application form"
            disabled={submitting}
            onClick={requestClose}
          >
            <Icon name="close" size={18} />
          </button>

          <div className="cc-ap-scroll">
            {applySubmitted ? (
              <div className="cc-apply-success cc-ap-success" role="status">
                <div className="cc-confetti" aria-hidden="true">
                  {CONFETTI.map((piece, index) => (
                    <i
                      key={index}
                      style={{
                        "--x": piece.x,
                        "--y": piece.y,
                        "--r": piece.r,
                        "--c": piece.color,
                        animationDelay: piece.delay,
                      }}
                    />
                  ))}
                </div>
                <span className="cc-apply-success-icon">
                  <Icon name="check" size={30} />
                </span>
                <h2 id="apply-title">Application submitted</h2>
                <p>
                  Your application has been submitted successfully! You can
                  track it under My Applications.
                </p>

                {submittedApp && (
                  <dl className="cc-ap-receipt">
                    <div>
                      <dt>Application ID</dt>
                      <dd>{formatAppId(submittedApp.id)}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>
                        <span className="cc-badge cc-badge-pending">⏳ Pending</span>
                      </dd>
                    </div>
                    <div>
                      <dt>College</dt>
                      <dd>{submittedApp.collegeName}</dd>
                    </div>
                    <div>
                      <dt>Course</dt>
                      <dd>{submittedApp.courseName}</dd>
                    </div>
                  </dl>
                )}

                <div className="cc-apply-actions">
                  <button type="button" className="cc-btn cc-btn-ghost" onClick={requestClose}>
                    Close
                  </button>
                  <button
                    type="button"
                    className="cc-btn cc-btn-primary"
                    onClick={onViewApplications}
                  >
                    View my applications
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="cc-apply-form cc-ap-form"
                onSubmit={submitApplication}
                noValidate
              >
                <div className="cc-ap-head">
                  <span className="cc-eyebrow">Admission application</span>
                  <h2 id="apply-title">Apply Now</h2>
                  <p className="cc-apply-sub">
                    Complete the three sections below. Fields marked * are
                    required.
                  </p>

                  <ol className="cc-ap-steps" aria-label="Application progress">
                    {steps.map((step, index) => (
                      <li
                        key={step.id}
                        className={`${step.done ? "is-done" : ""}${index === currentStep ? " is-current" : ""}`}
                      >
                        <span className="cc-ap-step-dot">
                          {step.done ? <FormIcon name="check" size={15} /> : index + 1}
                        </span>
                        <span className="cc-ap-step-label">{step.label}</span>
                      </li>
                    ))}
                  </ol>
                  <div
                    className="cc-ap-bar"
                    role="progressbar"
                    aria-label="Sections completed"
                    aria-valuemin={0}
                    aria-valuemax={3}
                    aria-valuenow={doneCount}
                  >
                    <i style={{ width: `${(doneCount / 3) * 100}%` }} />
                  </div>
                </div>

                {applyErrors.form && (
                  <div className="cc-apply-alert" role="alert">
                    {applyErrors.form}
                  </div>
                )}

                <div className="cc-ap-body">
                  {/* 1. Personal information */}
                  <section className="cc-ap-card">
                    <header className="cc-ap-card-head">
                      <span className="cc-ap-card-ico">
                        <FormIcon name="user" size={20} />
                      </span>
                      <div>
                        <h3>Personal Information</h3>
                        <p>How the admission office can reach you.</p>
                      </div>
                      {sectionState(personalDone)}
                    </header>

                    <div className="cc-ap-grid">
                      {textField(
                        "studentName",
                        "Student Full Name",
                        {
                          icon: "user",
                          input: {
                            type: "text",
                            autoComplete: "name",
                            placeholder: "Enter your full name",
                          },
                        },
                        true,
                      )}

                      {textField("mobile", "Mobile Number", {
                        icon: "phone",
                        clean: (value) => value.replace(/\D/g, "").slice(0, 10),
                        input: {
                          type: "tel",
                          inputMode: "numeric",
                          maxLength: 10,
                          autoComplete: "tel-national",
                          placeholder: "10-digit mobile number",
                        },
                      })}

                      {textField("email", "Email Address", {
                        icon: "mail",
                        input: {
                          type: "email",
                          autoComplete: "email",
                          placeholder: "you@example.com",
                        },
                      })}
                    </div>
                  </section>

                  {/* 2. Academic information */}
                  <section className="cc-ap-card">
                    <header className="cc-ap-card-head">
                      <span className="cc-ap-card-ico">
                        <FormIcon name="book" size={20} />
                      </span>
                      <div>
                        <h3>Academic Information</h3>
                        <p>Your group and board exam marks.</p>
                      </div>
                      {sectionState(academicDone)}
                    </header>

                    <div className="cc-ap-grid">
                      <ApplyField
                        id="apply-stream"
                        label="Academic Category / Group"
                        error={applyErrors.stream}
                        icon="layers"
                        full
                      >
                        <select
                          id="apply-stream"
                          className="cc-apply-control"
                          value={applyForm.stream}
                          aria-invalid={Boolean(applyErrors.stream)}
                          onChange={(event) => updateApplyField("stream", event.target.value)}
                        >
                          <option value="">Select your group (e.g. Bio-Maths)</option>
                          {APPLY_STREAMS.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </ApplyField>

                      {markField("mark10", "10th Standard Mark (%)", "e.g. 90")}
                      {markField("mark12", "12th Standard Mark (%)", "e.g. 85.5")}

                      {cutoffRule ? (
                        <div className="cc-ap-cutoff">
                          <div className="cc-ap-cutoff-head">
                            <FormIcon name="target" size={16} />
                            Cut-off for {applyCategory?.label || "this course"}
                          </div>

                          <div className="cc-ap-grid">
                            {cutoffRule.fields.map((key) =>
                              markField(
                                key,
                                `${SUBJECT_FIELDS[key]} Mark`,
                                "out of 100",
                                false,
                                "book",
                              ),
                            )}

                            <ApplyField
                              id="apply-cutoff"
                              label={cutoffRule.label || "Cut-off Mark"}
                              error={applyErrors.cutoff}
                              icon="target"
                              full
                            >
                              <input
                                id="apply-cutoff"
                                type="number"
                                inputMode="decimal"
                                min="0"
                                max={cutoffRule.max}
                                step="0.01"
                                className="cc-apply-control"
                                placeholder={`Out of ${cutoffRule.max}`}
                                value={cutoffValue}
                                aria-invalid={Boolean(applyErrors.cutoff)}
                                onChange={(event) =>
                                  updateApplyField("cutoff", event.target.value)
                                }
                              />
                              <small className="cc-apply-hint">
                                {cutoffRule.manual
                                  ? `Enter ${cutoffRule.formula} (max ${cutoffRule.max}).`
                                  : `Auto-calculated as ${cutoffRule.formula} (max ${cutoffRule.max}). You can type your own value.`}
                              </small>
                            </ApplyField>
                          </div>
                        </div>
                      ) : (
                        <p className="cc-ap-note">
                          <FormIcon name="target" size={16} />
                          {applyCategory
                            ? `Cut-off mark is not required for ${applyCategory.label} applications.`
                            : "Cut-off fields appear automatically once you choose a college and course below."}
                        </p>
                      )}
                    </div>
                  </section>

                  {/* 3. College and course selection */}
                  <section className="cc-ap-card">
                    <header className="cc-ap-card-head">
                      <span className="cc-ap-card-ico">
                        <FormIcon name="building" size={20} />
                      </span>
                      <div>
                        <h3>College and Course Selection</h3>
                        <p>Only courses offered by the selected college are listed.</p>
                      </div>
                      {sectionState(selectionDone)}
                    </header>

                    <div className="cc-ap-grid">
                      <ApplyField
                        id="apply-categoryId"
                        label="College Category"
                        error={applyErrors.categoryId}
                        icon="cap"
                        full
                      >
                        <select
                          id="apply-categoryId"
                          className="cc-apply-control"
                          value={applyForm.categoryId}
                          disabled={applyLocked}
                          aria-invalid={Boolean(applyErrors.categoryId)}
                          onChange={(event) =>
                            updateApplyField("categoryId", event.target.value)
                          }
                        >
                          <option value="">Select a category</option>
                          {APPLY_CATEGORIES.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </ApplyField>

                      {applyLocked && applyCollege && applyCategory ? (
                        <div className="cc-apply-full cc-apply-locked">
                          <div>
                            <span className="cc-apply-locked-label">Applying to</span>
                            <strong>{applyCollege.name}</strong>
                            <span>
                              {[applyCollege.place, applyCategory.label]
                                .filter(Boolean)
                                .join(" · ")}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="cc-apply-link"
                            onClick={() => setApplyLocked(false)}
                          >
                            Change college
                          </button>
                        </div>
                      ) : (
                        <ApplyField
                          id="apply-collegeKey"
                          label="Select College"
                          error={applyErrors.collegeKey}
                          icon="building"
                          full
                        >
                          <select
                            id="apply-collegeKey"
                            className="cc-apply-control"
                            value={applyForm.collegeKey}
                            disabled={!applyCategory || applyCollegeCount === 0}
                            aria-invalid={Boolean(applyErrors.collegeKey)}
                            onChange={(event) =>
                              updateApplyField("collegeKey", event.target.value)
                            }
                          >
                            <option value="">
                              {!applyCategory
                                ? "Select a category first"
                                : applyCollegeCount === 0
                                  ? "No colleges available for this category yet"
                                  : "Select a college"}
                            </option>
                            {applyGroups.map(([group, items]) =>
                              applyGroups.length > 1 ? (
                                <optgroup key={group} label={group}>
                                  {items.map((item) => (
                                    <option key={item.key} value={item.key}>
                                      {item.label}
                                    </option>
                                  ))}
                                </optgroup>
                              ) : (
                                items.map((item) => (
                                  <option key={item.key} value={item.key}>
                                    {item.label}
                                  </option>
                                ))
                              ),
                            )}
                          </select>
                        </ApplyField>
                      )}

                      <ApplyField
                        id="apply-course"
                        label="Select Course"
                        error={applyErrors.course}
                        icon="cap"
                        full
                      >
                        <select
                          id="apply-course"
                          className="cc-apply-control"
                          value={applyForm.course}
                          disabled={!applyCollege || applyCollege.courses.length === 0}
                          aria-invalid={Boolean(applyErrors.course)}
                          onChange={(event) => updateApplyField("course", event.target.value)}
                        >
                          <option value="">
                            {!applyCollege
                              ? "Select a college first"
                              : applyCollege.courses.length === 0
                                ? "Course details for this college are not available yet"
                                : "Select a course"}
                          </option>
                          {applyCollege?.courses.map((course) => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))}
                        </select>
                        {applyCollege && applyCollege.courses.length > 0 && (
                          <small className="cc-apply-hint">
                            {applyCollege.courses.length} course
                            {applyCollege.courses.length === 1 ? "" : "s"} available at
                            this college
                          </small>
                        )}
                      </ApplyField>
                    </div>
                  </section>
                </div>

                <div className="cc-apply-actions cc-ap-actions">
                  <span className="cc-ap-actions-hint">
                    {doneCount === 3
                      ? "All sections complete — ready to submit."
                      : `${3 - doneCount} section${3 - doneCount === 1 ? "" : "s"} left to complete`}
                  </span>
                  <button
                    type="button"
                    className="cc-btn cc-btn-ghost"
                    disabled={submitting}
                    onClick={requestClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cc-btn cc-btn-primary cc-btn-lg"
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="cc-spinner" aria-hidden="true" />
                        Submitting…
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   COURSE CATALOGUE (general list, not per-college availability)
========================================================= */

const COURSE_CATALOG = [
  {
    id: "engineering",
    label: "Engineering",
    courses: [
      "Computer Science and Engineering (CSE)", "Information Technology (IT)",
      "Artificial Intelligence and Data Science (AI & DS)",
      "Artificial Intelligence and Machine Learning (AI & ML)",
      "Computer Science and Design (CSD)", "Electronics and Communication Engineering (ECE)",
      "Electrical and Electronics Engineering (EEE)", "Mechanical Engineering",
      "Civil Engineering", "Biomedical Engineering", "Biotechnology",
      "Chemical Engineering", "Automobile Engineering", "Robotics and Automation",
      "Mechatronics Engineering", "Aeronautical Engineering", "Agricultural Engineering",
      "Cyber Security", "Data Science", "Food Technology", "Textile Technology",
    ],
  },
  {
    id: "arts",
    label: "Arts and Science",
    courses: [
      "B.Sc Computer Science", "B.Sc Information Technology", "B.Sc Mathematics",
      "B.Sc Physics", "B.Sc Chemistry", "B.Sc Biotechnology", "B.Sc Microbiology",
      "B.Sc Biochemistry", "B.Sc Psychology", "B.Sc Visual Communication",
      "B.Sc Statistics", "BCA", "B.Com", "B.Com Computer Applications", "BBA",
      "BA English", "BA Tamil", "BA Economics", "BA History", "BA Political Science", "BSW",
    ],
  },
  {
    id: "physiotherapy",
    label: "Physiotherapy",
    courses: [
      "Bachelor of Physiotherapy (BPT)", "Master of Physiotherapy (MPT)",
      "MPT Orthopaedics", "MPT Neurology", "MPT Sports Physiotherapy",
      "MPT Cardiopulmonary", "MPT Paediatrics", "MPT Community Physiotherapy",
    ],
  },
  {
    id: "allied",
    label: "Allied Health Sciences",
    courses: [
      "B.Sc Medical Laboratory Technology", "B.Sc Radiology and Imaging Technology",
      "B.Sc Operation Theatre Technology", "B.Sc Cardiac Technology",
      "B.Sc Dialysis Technology", "B.Sc Anaesthesia Technology",
      "B.Sc Respiratory Therapy", "B.Sc Optometry", "B.Sc Physician Assistant",
      "B.Sc Emergency and Trauma Care Technology", "B.Sc Medical Record Science",
      "B.Sc Nuclear Medicine Technology",
    ],
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    courses: [
      "Bachelor of Pharmacy (B.Pharm)", "Diploma in Pharmacy (D.Pharm)",
      "Doctor of Pharmacy (Pharm.D)", "Master of Pharmacy (M.Pharm)",
      "M.Pharm Pharmaceutics", "M.Pharm Pharmacology",
      "M.Pharm Pharmaceutical Chemistry", "M.Pharm Pharmacognosy",
      "M.Pharm Pharmacy Practice",
    ],
  },
  {
    id: "law",
    label: "Law",
    courses: ["BA LLB", "BBA LLB", "B.Com LLB", "B.Sc LLB", "LLB", "LLM", "BBA LLB (Hons.)"],
  },
  {
    id: "agriculture",
    label: "Agriculture",
    courses: [
      "B.Sc Agriculture", "B.Sc Horticulture", "B.Sc Forestry",
      "B.Tech Agricultural Engineering", "B.Sc Sericulture",
      "B.Sc Agribusiness Management", "B.Sc Food Science and Technology",
      "B.Sc Fisheries Science", "B.Sc Seed Science and Technology",
    ],
  },
  {
    id: "veterinary",
    label: "Veterinary",
    courses: [
      "B.V.Sc & A.H. (Veterinary Science)", "B.Tech Dairy Technology",
      "B.Tech Poultry Technology", "B.Tech Food Technology", "M.V.Sc",
    ],
  },
  {
    id: "homeopathy",
    label: "Homeopathy",
    courses: [
      "BHMS", "MD Homoeopathy (Materia Medica)", "MD Homoeopathy (Repertory)",
      "MD Homoeopathy (Practice of Medicine)", "MD Homoeopathy (Organon of Medicine)",
    ],
  },
  {
    id: "dental",
    label: "Dental",
    courses: [
      "BDS", "MDS Orthodontics", "MDS Oral and Maxillofacial Surgery",
      "MDS Periodontology", "MDS Prosthodontics",
      "MDS Conservative Dentistry and Endodontics", "MDS Pedodontics",
      "MDS Oral Pathology", "MDS Public Health Dentistry",
    ],
  },
  {
    id: "medical",
    label: "Medical",
    courses: [
      "MBBS", "BDS", "BAMS", "BHMS", "BSMS", "BUMS", "B.Sc Nursing",
      "B.Sc Medical Imaging Technology", "B.Sc Cardiac Technology", "BPT",
    ],
  },
].map((cat) => ({ ...cat, courses: [...new Set(cat.courses)] }));

/* =========================================================
   STUDENT PROFILE
========================================================= */

const PROFILES_KEY = "scp_profiles";

const PROFILE_COLLEGE_TYPES = [
  "Engineering", "Arts and Science", "Physiotherapy", "Allied Health Sciences",
  "Pharmacy", "Law", "Agriculture", "Medical",
];

const PROFILE_CUTOFF_MAX = {
  Engineering: 200,
  Physiotherapy: 200,
  "Allied Health Sciences": 200,
  Pharmacy: 200,
  Agriculture: 200,
  Medical: 720, // NEET-UG score
};

const PROFILE_LOCATIONS = [
  "Coimbatore", "Chennai", "Madurai", "Salem", "Trichy", "Erode", "Tiruppur",
  "Namakkal", "Karur", "Vellore", "Tirunelveli", "Thanjavur", "Kanchipuram",
  "Dindigul", "Nilgiris", "Krishnagiri", "Dharmapuri",
];

const EMPTY_PROFILE = {
  fullName: "", nativePlace: "", schoolName: "", mobileNumber: "",
  interestedCollegeType: "", interestedLocation: "",
  twelfthMark: "", tenthMark: "", cutoffMark: "",
};

const PROFILE_FIELD_ORDER = [
  "fullName", "nativePlace", "schoolName", "mobileNumber",
  "interestedCollegeType", "interestedLocation",
  "twelfthMark", "tenthMark", "cutoffMark",
];

const PROFILE_LABELS = {
  fullName: "Full Name",
  nativePlace: "Native Place",
  schoolName: "School Name",
  mobileNumber: "Mobile Number",
  interestedCollegeType: "Interested College Type",
  interestedLocation: "Interested Location",
  twelfthMark: "12th Standard Mark (%)",
  tenthMark: "10th Standard Mark (%)",
  cutoffMark: "Cutoff Mark",
};

const readProfiles = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(PROFILES_KEY));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
};

const validateProfile = (p) => {
  const e = {};
  const name = String(p.fullName ?? "").trim();
  if (!name) e.fullName = "Full name is required.";
  else if (name.length < 2 || !/^[A-Za-z][A-Za-z .'-]*$/.test(name))
    e.fullName = "Enter a valid name (letters, spaces and . ' - only).";

  if (String(p.nativePlace ?? "").trim().length < 2)
    e.nativePlace = "Native place is required.";
  if (String(p.schoolName ?? "").trim().length < 2)
    e.schoolName = "School name is required.";

  const mobile = String(p.mobileNumber ?? "");
  if (!mobile) e.mobileNumber = "Mobile number is required.";
  else if (!/^[6-9]\d{9}$/.test(mobile))
    e.mobileNumber = "Enter a valid 10-digit Indian mobile number.";

  if (!PROFILE_COLLEGE_TYPES.includes(p.interestedCollegeType))
    e.interestedCollegeType = "Please select a college type.";
  if (String(p.interestedLocation ?? "").trim().length < 2)
    e.interestedLocation = "Interested location is required.";

  const e12 = markError(p.twelfthMark ?? "", "12th");
  if (e12) e.twelfthMark = e12;
  const e10 = markError(p.tenthMark ?? "", "10th");
  if (e10) e.tenthMark = e10;

  const max = PROFILE_CUTOFF_MAX[p.interestedCollegeType];
  if (max) {
    const raw = String(p.cutoffMark ?? "").trim();
    const n = Number(raw);
    if (raw === "") e.cutoffMark = "Cutoff mark is required.";
    else if (Number.isNaN(n) || n < 0 || n > max)
      e.cutoffMark = `Cutoff must be a number between 0 and ${max}.`;
  }
  return e;
};

const PROFILE_ICONS = {
  fullName: "user",
  nativePlace: "pin",
  schoolName: "building",
  mobileNumber: "phone",
  twelfthMark: "percent",
  tenthMark: "percent",
  cutoffMark: "target",
};

const isProfileComplete = (p) =>
  Boolean(
    p && p.isProfileCompleted === true && Object.keys(validateProfile(p)).length === 0,
  );

function ProfileForm({ initial, mandatory, onSave, onSaved, onCancel, asModal = false, email = "" }) {
  const toForm = (src) =>
    Object.fromEntries(
      Object.keys(EMPTY_PROFILE).map((k) => [
        k,
        src?.[k] === undefined || src?.[k] === null ? "" : String(src[k]),
      ]),
    );

  const [form, setForm] = useState(() => toForm(initial));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const cutoffMax = PROFILE_CUTOFF_MAX[form.interestedCollegeType] || null;

  const set = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      delete next.form;
      if (name === "interestedCollegeType") delete next.cutoffMark;
      return next;
    });
    setDone(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (saving || done) return;

    const errs = validateProfile(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = PROFILE_FIELD_ORDER.find((f) => errs[f]);
      if (first) document.getElementById(`profile-${first}`)?.focus();
      return;
    }

    const data = {
      fullName: form.fullName.trim(),
      nativePlace: form.nativePlace.trim(),
      schoolName: form.schoolName.trim(),
      mobileNumber: form.mobileNumber,
      interestedCollegeType: form.interestedCollegeType,
      interestedLocation: form.interestedLocation.trim(),
      twelfthMark: Number(form.twelfthMark),
      tenthMark: Number(form.tenthMark),
      cutoffMark: cutoffMax ? Number(form.cutoffMark) : null,
      isProfileCompleted: true,
      updatedAt: new Date().toISOString(),
    };

    setSaving(true);
    setTimeout(() => {
      const ok = onSave(data);
      setSaving(false);
      if (!ok) {
        setErrors({ form: "Could not save your profile. Please enable browser storage and try again." });
        return;
      }
      setDone(true);
      setTimeout(() => onSaved(data), 900);
    }, 450);
  };

  const field = (name, props = {}, full = false) => (
    <ApplyField
      id={`profile-${name}`}
      label={PROFILE_LABELS[name]}
      error={errors[name]}
      full={full}
      icon={asModal ? PROFILE_ICONS[name] : undefined}
    >
      <input
        id={`profile-${name}`}
        className="cc-apply-control"
        value={form[name]}
        aria-invalid={Boolean(errors[name])}
        onChange={(e) => set(name, props.clean ? props.clean(e.target.value) : e.target.value)}
        {...props.input}
      />
    </ApplyField>
  );

  const mark = (name, placeholder) =>
    field(name, {
      input: {
        type: "number", inputMode: "decimal", min: "0", max: "100",
        step: "0.01", placeholder,
      },
    });

  const formEl = (
    <form className={asModal ? "cc-pm-form" : "cc-profile-card"} onSubmit={submit} noValidate>
      <span className="cc-eyebrow">{mandatory ? "Step required" : "My profile"}</span>
      <h2>{mandatory ? "Complete Your Profile" : "Edit Profile"}</h2>
      <p className="cc-apply-sub">
        {mandatory
          ? "Please fill in all details to continue. You can use the website once your profile is saved."
          : "Update your details and save the changes."}
      </p>

      {errors.form && <div className="cc-apply-alert" role="alert">{errors.form}</div>}
      {done && (
        <div className="cc-profile-success" role="status">
          {mandatory ? "Profile saved! Taking you to the Home page…" : "Changes saved successfully."}
        </div>
      )}

      <div className="cc-apply-grid">
        <h3 className="cc-apply-full cc-profile-title">Personal Information</h3>
        {asModal && email && (
          <ApplyField id="profile-email" label="Email Address" full icon="mail" required={false}>
            <input id="profile-email" className="cc-apply-control" value={email} disabled readOnly />
            <small className="cc-apply-hint">Linked to your account and cannot be changed here.</small>
          </ApplyField>
        )}
        {field("fullName", { input: { type: "text", placeholder: "Your full name", autoComplete: "name" } }, true)}
        {field("nativePlace", { input: { type: "text", placeholder: "Town / village / city" } })}
        {field("schoolName", { input: { type: "text", placeholder: "Your school name" } })}
        {field("mobileNumber", {
          clean: (v) => v.replace(/\D/g, "").slice(0, 10),
          input: { type: "tel", inputMode: "numeric", maxLength: 10, placeholder: "10-digit mobile number", autoComplete: "tel-national" },
        }, true)}

        <h3 className="cc-apply-full cc-profile-title">Education Details</h3>
        <ApplyField id="profile-interestedCollegeType" label={PROFILE_LABELS.interestedCollegeType} error={errors.interestedCollegeType} icon={asModal ? "cap" : undefined}>
          <select
            id="profile-interestedCollegeType"
            className="cc-apply-control"
            value={form.interestedCollegeType}
            aria-invalid={Boolean(errors.interestedCollegeType)}
            onChange={(e) => set("interestedCollegeType", e.target.value)}
          >
            <option value="">Select college type</option>
            {PROFILE_COLLEGE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </ApplyField>

        <ApplyField id="profile-interestedLocation" label={PROFILE_LABELS.interestedLocation} error={errors.interestedLocation} icon={asModal ? "pin" : undefined}>
          <input
            id="profile-interestedLocation"
            className="cc-apply-control"
            list="profile-locations"
            placeholder="Select or type a city / district"
            value={form.interestedLocation}
            aria-invalid={Boolean(errors.interestedLocation)}
            onChange={(e) => set("interestedLocation", e.target.value)}
          />
          <datalist id="profile-locations">
            {PROFILE_LOCATIONS.map((l) => <option key={l} value={l} />)}
          </datalist>
        </ApplyField>

        {mark("twelfthMark", "e.g. 85.5")}
        {mark("tenthMark", "e.g. 90")}

        {cutoffMax && (
          <ApplyField id="profile-cutoffMark" label={form.interestedCollegeType === "Medical" ? "NEET-UG Score (Cutoff)" : "Cutoff Mark"} error={errors.cutoffMark} full icon={asModal ? "target" : undefined}>
            <input
              id="profile-cutoffMark"
              type="number"
              inputMode="decimal"
              min="0"
              max={cutoffMax}
              step="0.01"
              className="cc-apply-control"
              placeholder={`Out of ${cutoffMax}`}
              value={form.cutoffMark}
              aria-invalid={Boolean(errors.cutoffMark)}
              onChange={(e) => set("cutoffMark", e.target.value)}
            />
            <small className="cc-apply-hint">Maximum {cutoffMax}.</small>
          </ApplyField>
        )}
      </div>

      <div className="cc-apply-actions">
        {mandatory ? (
          <button
            type="button"
            className="cc-btn cc-btn-ghost"
            disabled={saving || done}
            onClick={() => { setForm(toForm(null)); setErrors({}); }}
          >
            Clear Form
          </button>
        ) : (
          <button type="button" className="cc-btn cc-btn-ghost" disabled={saving || done} onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="cc-btn cc-btn-primary cc-btn-lg cc-glow-btn" disabled={saving || done}>
          {saving ? (asModal ? (<><span className="cc-spinner" aria-hidden="true" />Saving…</>) : "Saving…") : mandatory ? "Save Profile" : "Save Changes"}
        </button>
      </div>
    </form>
  );

  if (asModal) return formEl;

  return (
    <section className="cc-section">
      <div className="cc-wrap">{formEl}</div>
    </section>
  );
}

/* ---------- application status ---------- */

const STATUS_STYLE = {
  Pending: { icon: "⏳", cls: "pending" },
  Approved: { icon: "✅", cls: "approved" },
  Rejected: { icon: "❌", cls: "rejected" },
};

const STATUS_FILTERS = ["All", "Pending", "Approved", "Rejected"];

const normalizeStatus = (status) => (STATUS_STYLE[status] ? status : "Pending");

const PD_STATUS_ICON = { Pending: "clock", Approved: "check-circle", Rejected: "x-circle" };

const formatAppDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const hasValue = (value) => value !== undefined && value !== null && String(value).trim() !== "";

const PD_STYLE = KEYFRAMES_CSS + `
.cc-pd{position:relative;overflow:hidden;padding:26px 0 64px;background:linear-gradient(180deg,#F3F8F7 0%,#FBF8F1 100%)}
.cc-pd .cc-wrap{position:relative;z-index:1}

.cc-pd-hero{position:relative;overflow:hidden;display:flex;align-items:center;gap:26px;padding:28px 30px;border-radius:26px;background:linear-gradient(120deg,#E1F2EE 0%,#EEF2FF 55%,#FDF0DB 100%);border:1px solid #d6e6e2;box-shadow:0 14px 36px rgba(20,32,51,.08);animation:ccxRise .55s cubic-bezier(.2,.8,.2,1) backwards}
.cc-pd-orbs{position:absolute;inset:0;pointer-events:none}
.cc-pd-orbs i{position:absolute;border-radius:50%;filter:blur(30px);opacity:.55;animation:ccxFloat 10s ease-in-out infinite}
.cc-pd-orbs i:nth-child(1){width:180px;height:180px;right:-30px;top:-50px;background:#9fe3d6}
.cc-pd-orbs i:nth-child(2){width:140px;height:140px;right:22%;bottom:-70px;background:#fbd28a;animation-delay:-3s}
.cc-pd-orbs i:nth-child(3){width:120px;height:120px;left:30%;top:-60px;background:#c9d6ff;animation-delay:-6s}
.cc-pd-avatar{position:relative;z-index:1;flex:none;display:grid;place-items:center;width:104px;height:104px;overflow:hidden;border-radius:50%;font-family:Fraunces,Georgia,serif;font-size:2rem;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--brand),var(--deep));box-shadow:0 0 0 5px #fff,0 12px 28px rgba(15,118,110,.3)}
.cc-pd-avatar img{width:100%;height:100%;object-fit:cover}
.cc-pd-hero-body{position:relative;z-index:1;flex:1;min-width:0}
.cc-pd-hero h2{margin:0 0 8px;font-size:clamp(1.4rem,3vw,2rem);color:var(--navy);background:none;-webkit-text-fill-color:var(--navy);animation:none}
.cc-pd-meta{display:flex;flex-wrap:wrap;gap:8px 20px;color:var(--muted-dark);font-size:.92rem}
.cc-pd-meta span{display:inline-flex;align-items:center;gap:7px;min-width:0;overflow-wrap:anywhere}
.cc-pd-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.cc-pd-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;background:rgba(255,255,255,.82);border:1px solid #d3e4e0;font-size:.78rem;font-weight:700;color:var(--deep)}
.cc-pd-chip.ok{background:#E3F7EE;border-color:#b6e5cf;color:#047857}
.cc-pd-hero .cc-btn{position:relative;z-index:1;flex:none}

.cc-pd-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:20px 0}
.cc-pd-stat{--t:#4f46e5;--tb:#ECEEFF;display:flex;align-items:center;gap:14px;padding:18px;text-align:left;font:inherit;color:inherit;cursor:pointer;background:#fff;border:1px solid #e3ebe8;border-radius:20px;box-shadow:0 8px 22px rgba(20,32,51,.06);transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;animation:ccxRise .55s cubic-bezier(.2,.8,.2,1) backwards;animation-delay:calc(var(--i) * 70ms)}
.cc-pd-stat:hover,.cc-pd-stat:focus-visible{transform:translateY(-4px);box-shadow:0 16px 34px rgba(20,32,51,.12);border-color:var(--t);outline:none}
.cc-pd-stat.tone-pending{--t:#B45309;--tb:#FEF3D8}
.cc-pd-stat.tone-approved{--t:#047857;--tb:#DDF5EA}
.cc-pd-stat.tone-rejected{--t:#B91C1C;--tb:#FDE6E6}
.cc-pd-stat-ico{flex:none;display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:var(--tb);color:var(--t)}
.cc-pd-stat strong{display:block;font-family:Fraunces,Georgia,serif;font-size:1.7rem;line-height:1;color:var(--navy)}
.cc-pd-stat small{display:block;margin-top:4px;font-size:.8rem;font-weight:600;color:var(--muted)}

.cc-pd-tabs{display:inline-flex;gap:4px;margin-bottom:18px;padding:5px;background:#fff;border:1px solid #e1eae7;border-radius:16px;box-shadow:0 6px 16px rgba(20,32,51,.05)}
.cc-pd-tabs button{display:inline-flex;align-items:center;gap:8px;padding:9px 18px;border:0;border-radius:12px;background:transparent;font:inherit;font-size:.9rem;font-weight:700;color:var(--muted-dark);cursor:pointer;transition:background .2s ease,color .2s ease,box-shadow .2s ease}
.cc-pd-tabs button:hover:not(.is-active){background:#F1F7F5}
.cc-pd-tabs button.is-active{color:#fff;background:linear-gradient(135deg,var(--brand),var(--deep));box-shadow:0 6px 14px rgba(15,118,110,.25)}
.cc-pd-tabs button em{padding:1px 8px;border-radius:999px;background:rgba(15,118,110,.12);font-size:.74rem;font-style:normal}
.cc-pd-tabs button.is-active em{background:rgba(255,255,255,.25)}
.cc-pd-panel{animation:ccxPanel .38s cubic-bezier(.2,.8,.2,1) both}

.cc-pd-cols{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start}
.cc-pd-card{padding:24px;background:#fff;border:1px solid #e3ebe8;border-radius:22px;box-shadow:0 8px 24px rgba(20,32,51,.06);transition:transform .25s ease,box-shadow .25s ease}
.cc-pd-card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(20,32,51,.1)}
.cc-pd-card-head{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.cc-pd-card-head h3{margin:0;font-size:1.08rem;color:var(--navy)}
.cc-pd-card-ico{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;color:#fff;background:linear-gradient(135deg,var(--brand),var(--deep))}
.cc-pd-info{display:grid;gap:10px;margin:0}
.cc-pd-row{display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:14px;background:#F7FAF9;border:1px solid #edf3f1;transition:background .2s ease,border-color .2s ease;animation:ccxRise .45s ease backwards;animation-delay:calc(var(--i) * 45ms)}
.cc-pd-row:hover{background:#EEF7F4;border-color:#cfe5df}
.cc-pd-row-ico{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#DDF0EB;color:var(--deep)}
.cc-pd-row>div{min-width:0}
.cc-pd-row dt{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.cc-pd-row dd{margin:1px 0 0;font-weight:700;color:var(--navy);overflow-wrap:anywhere}
.cc-pd-empty-note{margin:0;padding:14px;border-radius:14px;background:#FBF6EC;border:1px solid #f0dfbf;color:#7a5a1c;font-size:.88rem}

.cc-pd-filters{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:16px}
.cc-pd-filters .cc-btn{margin-left:auto}
.cc-pd-filter{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1.5px solid #dbe5e2;border-radius:999px;background:#fff;font:inherit;font-size:.85rem;font-weight:700;color:var(--muted-dark);cursor:pointer;transition:all .2s ease}
.cc-pd-filter:hover{border-color:var(--brand);color:var(--brand)}
.cc-pd-filter.is-active{border-color:transparent;background:linear-gradient(135deg,var(--brand),var(--deep));color:#fff}
.cc-pd-filter em{font-style:normal;font-size:.75rem;opacity:.85}

.cc-pd-tablewrap{overflow-x:auto;background:#fff;border:1px solid #e3ebe8;border-radius:20px;box-shadow:0 8px 24px rgba(20,32,51,.06)}
.cc-pd-table{width:100%;min-width:700px;border-collapse:collapse}
.cc-pd-table th{padding:14px 16px;text-align:left;font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;color:var(--muted);background:#F5F9F8;border-bottom:1px solid #e3ebe8}
.cc-pd-table td{padding:14px 16px;border-bottom:1px solid #eef3f1;font-size:.9rem;vertical-align:middle;color:var(--navy)}
.cc-pd-table tbody tr{transition:background .2s ease;animation:ccxRise .4s ease backwards;animation-delay:calc(var(--i) * 40ms)}
.cc-pd-table tbody tr:hover{background:#F3FAF8}
.cc-pd-table tbody tr:last-child td{border-bottom:0}
.cc-pd-table td strong{display:block}
.cc-pd-table td small{display:block;color:var(--muted)}
.cc-pd-id{font-weight:700;letter-spacing:.02em;white-space:nowrap}

.cc-pd-cards{display:none;gap:14px}
.cc-pd-appcard{padding:18px;background:#fff;border:1px solid #e3ebe8;border-radius:18px;box-shadow:0 8px 22px rgba(20,32,51,.06);transition:transform .25s ease,box-shadow .25s ease;animation:ccxRise .45s ease backwards;animation-delay:calc(var(--i) * 50ms)}
.cc-pd-appcard:hover{transform:translateY(-3px);box-shadow:0 16px 34px rgba(20,32,51,.1)}
.cc-pd-appcard-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
.cc-pd-appcard h4{margin:0;font-size:1rem;color:var(--navy);overflow-wrap:anywhere}
.cc-pd-appcard p{margin:4px 0 0;font-size:.86rem;color:var(--muted-dark);overflow-wrap:anywhere}
.cc-pd-appcard-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px}
.cc-pd-appcard-foot span{display:inline-flex;align-items:center;gap:6px;font-size:.8rem;color:var(--muted)}

.cc-pd-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;font-size:.78rem;font-weight:800;white-space:nowrap}
.cc-pd-badge-pending{background:#FEF3D8;color:#B45309}
.cc-pd-badge-approved{background:#DDF5EA;color:#047857}
.cc-pd-badge-rejected{background:#FDE6E6;color:#B91C1C}
.cc-pd-link{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border:1.5px solid #cfe3de;border-radius:999px;background:#fff;font:inherit;font-size:.82rem;font-weight:700;color:var(--deep);cursor:pointer;transition:all .2s ease}
.cc-pd-link:hover{background:var(--brand);border-color:var(--brand);color:#fff}

.cc-pd-empty{padding:40px 24px;text-align:center;background:#fff;border:1px dashed #b9d8d1;border-radius:22px}
.cc-pd-empty h3{margin:0 0 6px;color:var(--navy)}
.cc-pd-empty p{margin:0 0 18px;color:var(--muted-dark)}

.cc-pd-backdrop{position:fixed;inset:0;z-index:130;display:grid;place-items:center;padding:20px;background:rgba(20,32,51,.6);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);animation:ccxFade .22s ease both}
.cc-pd-backdrop.is-closing{animation:ccxFadeOut .2s ease both}
.cc-pd-modal{position:relative;display:flex;flex-direction:column;overflow:hidden;width:min(700px,100%);max-height:92vh;max-height:92dvh;background:linear-gradient(160deg,#fff,#F3F9F8);border-radius:24px;box-shadow:0 30px 80px rgba(8,20,35,.35);animation:ccxModalIn .38s cubic-bezier(.2,.8,.2,1) both}
.cc-pd-backdrop.is-closing .cc-pd-modal{animation:ccxModalOut .2s ease both}
.cc-pd-modal-scroll{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain}
.cc-pd-modal .cc-modal-close{top:14px;right:14px}

.cc-pm-form{padding:30px 28px 0}
.cc-pm-form h2{margin:8px 0 0;font-size:1.6rem;color:var(--navy)}
.cc-pm-form .cc-apply-sub{margin:6px 0 20px;color:var(--muted-dark)}
.cc-pm-form .cc-apply-grid>*{animation:none}
.cc-pm-form .cc-profile-title{margin:6px 0 0}
.cc-pm-form .cc-apply-actions{position:sticky;bottom:0;z-index:4;margin:22px -28px 0;padding:14px 28px;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid #e1eae7}

.cc-pd-detail{padding:30px 28px 26px}
.cc-pd-detail h2{margin:8px 0 12px;padding-right:44px;font-size:1.5rem;color:var(--navy);background:none;-webkit-text-fill-color:var(--navy);animation:none}
.cc-pd-detail-top{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:18px;font-weight:700;color:var(--muted-dark)}
.cc-pd-dgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0}
.cc-pd-dgrid>div{padding:11px 14px;border-radius:14px;background:#F5F9F8;border:1px solid #e8f0ee;min-width:0}
.cc-pd-dgrid dt{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.cc-pd-dgrid dd{margin:2px 0 0;font-weight:700;color:var(--navy);overflow-wrap:anywhere}
.cc-pd-detail-actions{display:flex;justify-content:flex-end;margin-top:20px}

.cc-pd-toast{position:fixed;left:50%;bottom:26px;z-index:140;display:inline-flex;align-items:center;gap:8px;max-width:calc(100vw - 32px);padding:12px 20px;border-radius:999px;background:#142033;color:#fff;font-size:.9rem;font-weight:600;box-shadow:0 16px 36px rgba(0,0,0,.28);transform:translateX(-50%);animation:ccxToast .35s ease both}

.cc-pd .cc-btn-primary{color:#fff;border:0;background:linear-gradient(135deg,var(--brand),var(--deep));box-shadow:0 10px 22px rgba(15,118,110,.28);transition:transform .2s ease,box-shadow .2s ease,filter .2s ease}
.cc-pd .cc-btn-primary:hover:not(:disabled){transform:translateY(-2px);filter:brightness(1.06);box-shadow:0 14px 28px rgba(15,118,110,.34)}
.cc-pd .cc-btn .cc-icon-gap{display:inline-block;margin-right:8px;vertical-align:-3px}

@media (max-width:900px){
  .cc-pd-stats{grid-template-columns:1fr 1fr}
  .cc-pd-cols{grid-template-columns:1fr}
}
@media (max-width:760px){
  .cc-pd-tablewrap{display:none}
  .cc-pd-cards{display:grid}
}
@media (max-width:640px){
  .cc-pd{padding:18px 0 48px}
  .cc-pd-hero{flex-direction:column;align-items:center;gap:16px;padding:24px 18px;text-align:center}
  .cc-pd-meta,.cc-pd-chips{justify-content:center}
  .cc-pd-hero .cc-btn{width:100%;justify-content:center}
  .cc-pd-stat{gap:10px;padding:14px}
  .cc-pd-stat-ico{width:40px;height:40px}
  .cc-pd-stat strong{font-size:1.4rem}
  .cc-pd-tabs{display:flex}
  .cc-pd-tabs button{flex:1;justify-content:center;padding:9px 10px}
  .cc-pd-filters .cc-btn{width:100%;margin-left:0;justify-content:center}
  .cc-pd-backdrop{padding:0;place-items:end center}
  .cc-pd-modal{width:100%;border-radius:22px 22px 0 0;max-height:94vh;max-height:94dvh}
  .cc-pm-form{padding:24px 14px 0}
  .cc-pm-form .cc-apply-grid{grid-template-columns:1fr}
  .cc-pm-form .cc-apply-actions{margin:20px -14px 0;padding:12px 14px}
  .cc-pm-form .cc-apply-actions{flex-direction:row}
  .cc-pm-form .cc-apply-actions .cc-btn{flex:1 1 0;width:auto;min-width:0;justify-content:center}
  .cc-pd-detail{padding:24px 16px 20px}
}
@media (prefers-reduced-motion:reduce){
  .cc-pd-hero,.cc-pd-orbs i,.cc-pd-stat,.cc-pd-panel,.cc-pd-row,.cc-pd-table tbody tr,.cc-pd-appcard,.cc-pd-backdrop,.cc-pd-modal,.cc-pd-toast{animation:none!important;transition:none!important}
}
` + fieldCss(".cc-pd-modal");

function PdInfo({ rows }) {
  return (
    <dl className="cc-pd-info">
      {rows.map(([icon, label, value], index) => (
        <div className="cc-pd-row" key={label} style={{ "--i": index }}>
          <span className="cc-pd-row-ico">
            <FormIcon name={icon} size={17} />
          </span>
          <div>
            <dt>{label}</dt>
            <dd>{String(value)}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

function PdBadge({ status }) {
  const meta = STATUS_STYLE[status] || STATUS_STYLE.Pending;
  return (
    <span className={`cc-pd-badge cc-pd-badge-${meta.cls}`}>
      <FormIcon name={PD_STATUS_ICON[status] || "clock"} size={13} />
      {status}
    </span>
  );
}

function PdDetails({ app, closing, onClose }) {
  const subjects = Object.entries(app.subjects || {}).filter(([, value]) => hasValue(value));

  const rows = [
    ["Application ID", formatAppId(app.id)],
    ["Applied on", formatAppDate(app.appliedOn)],
    ["College", app.collegeName],
    ["City", app.city],
    ["Category", app.categoryLabel],
    ["Course", app.courseName],
    ["Student name", app.studentName],
    ["Email", app.email],
    ["Mobile", app.mobile],
    ["Group", app.stream],
    ["10th standard mark", hasValue(app.mark10) ? `${app.mark10}%` : ""],
    ["12th standard mark", hasValue(app.mark12) ? `${app.mark12}%` : ""],
    ...subjects.map(([key, value]) => [`${SUBJECT_FIELDS[key] || key} mark`, String(value)]),
    ["Cut-off mark", hasValue(app.cutoff) ? `${app.cutoff}${app.cutoffMax ? ` / ${app.cutoffMax}` : ""}` : ""],
  ].filter(([, value]) => hasValue(value));

  return (
    <div
      className={`cc-pd-backdrop${closing ? " is-closing" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="cc-pd-modal" role="dialog" aria-modal="true" aria-labelledby="pd-detail-title">
        <button type="button" className="cc-modal-close" aria-label="Close application details" onClick={onClose}>
          <Icon name="close" size={18} />
        </button>
        <div className="cc-pd-modal-scroll">
          <div className="cc-pd-detail">
            <span className="cc-eyebrow">Application details</span>
            <h2 id="pd-detail-title">{app.collegeName}</h2>
            <div className="cc-pd-detail-top">
              <PdBadge status={app.status} />
              <span>{formatAppId(app.id)}</span>
            </div>
            <dl className="cc-pd-dgrid">
              {rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="cc-pd-detail-actions">
              <button type="button" className="cc-btn cc-btn-outline" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileView({ profile, user, applications = [], onSave, onSaved, onApply }) {
  const [tab, setTab] = useState("overview");
  const [filter, setFilter] = useState("All");
  const [editOpen, setEditOpen] = useState(false);
  const [editClosing, setEditClosing] = useState(false);
  const [detail, setDetail] = useState(null);
  const [detailClosing, setDetailClosing] = useState(false);
  const [toast, setToast] = useState("");
  const [photoFailed, setPhotoFailed] = useState(false);
  const timers = useRef([]);

  const later = (fn, ms) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const closeEdit = () => {
    setEditClosing(true);
    later(() => {
      setEditOpen(false);
      setEditClosing(false);
    }, 200);
  };

  const closeDetail = () => {
    setDetailClosing(true);
    later(() => {
      setDetail(null);
      setDetailClosing(false);
    }, 200);
  };

  const showToast = (message) => {
    setToast(message);
    later(() => setToast(""), 3200);
  };

  const handleSaved = (data) => {
    onSaved(data);
    closeEdit();
    showToast("Profile updated successfully.");
  };

  const modalOpen = editOpen || Boolean(detail);

  useEffect(() => {
    if (!modalOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      if (detail) closeDetail();
      else closeEdit();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, Boolean(detail)]);

  const list = useMemo(
    () => applications.map((app) => ({ ...app, status: normalizeStatus(app.status) })),
    [applications],
  );
  const counts = useMemo(
    () => list.reduce((acc, app) => ({ ...acc, [app.status]: (acc[app.status] || 0) + 1 }), {}),
    [list],
  );
  const shown = filter === "All" ? list : list.filter((app) => app.status === filter);
  const latest = list[0];

  // values come only from data that exists
  const name = (profile?.fullName || user?.name || "Student").trim();
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "S";
  const photo = user?.photo || user?.picture || user?.photoURL || user?.avatar || user?.image || "";
  const email = user?.email || "";
  const studentId = user?.studentId ?? user?.id ?? user?._id ?? "";
  const accountStatus = user?.status || user?.accountStatus || "";
  const complete = isProfileComplete(profile);

  const cutoffMax = PROFILE_CUTOFF_MAX[profile?.interestedCollegeType];
  const personalRows = [
    ["user", "Full Name", profile?.fullName],
    ["mail", "Email", email],
    ["phone", "Mobile Number", profile?.mobileNumber],
    ["calendar", "Date of Birth", user?.dob || user?.dateOfBirth],
    ["user", "Gender", user?.gender],
    ["pin", "Address", user?.address],
    ["pin", "Native Place", profile?.nativePlace],
    ["building", "School Name", profile?.schoolName],
  ].filter(([, , value]) => hasValue(value));

  const academicRows = [
    ["percent", "10th Standard Mark", hasValue(profile?.tenthMark) ? `${profile.tenthMark}%` : ""],
    ["percent", "12th Standard Mark", hasValue(profile?.twelfthMark) ? `${profile.twelfthMark}%` : ""],
    ["layers", "Academic Group", latest?.stream],
    ["cap", "Preferred Course", latest?.courseName],
    ["building", "Preferred College", latest ? [latest.collegeName, latest.city].filter(Boolean).join(", ") : ""],
    ["cap", "Interested College Type", profile?.interestedCollegeType],
    ["pin", "Interested Location", profile?.interestedLocation],
    [
      "target",
      profile?.interestedCollegeType === "Medical" ? "NEET-UG Score (Cutoff)" : "Cut-off Mark",
      hasValue(profile?.cutoffMark) ? `${profile.cutoffMark}${cutoffMax ? ` / ${cutoffMax}` : ""}` : "",
    ],
  ].filter(([, , value]) => hasValue(value));

  const stats = [
    { key: "All", label: "Total Applications", value: list.length, icon: "file", tone: "total" },
    { key: "Pending", label: "Pending", value: counts.Pending || 0, icon: "clock", tone: "pending" },
    { key: "Approved", label: "Approved", value: counts.Approved || 0, icon: "check-circle", tone: "approved" },
    { key: "Rejected", label: "Rejected", value: counts.Rejected || 0, icon: "x-circle", tone: "rejected" },
  ];

  return (
    <section className="cc-section cc-pd">
      <style>{PD_STYLE}</style>

      <div className="cc-wrap">
        <div className="cc-pd-hero">
          <div className="cc-pd-orbs" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          <div className="cc-pd-avatar" aria-hidden="true">
            {photo && !photoFailed ? (
              <img src={photo} alt="" onError={() => setPhotoFailed(true)} />
            ) : (
              initials
            )}
          </div>

          <div className="cc-pd-hero-body">
            <h2>{name}</h2>
            <div className="cc-pd-meta">
              {email && (
                <span>
                  <FormIcon name="mail" size={16} />
                  {email}
                </span>
              )}
              {profile?.mobileNumber && (
                <span>
                  <FormIcon name="phone" size={16} />
                  {profile.mobileNumber}
                </span>
              )}
            </div>
            <div className="cc-pd-chips">
              {hasValue(studentId) && (
                <span className="cc-pd-chip">
                  <FormIcon name="id" size={14} />
                  Student ID: {String(studentId)}
                </span>
              )}
              {hasValue(accountStatus) && <span className="cc-pd-chip ok">{String(accountStatus)}</span>}
              {complete && (
                <span className="cc-pd-chip ok">
                  <FormIcon name="check" size={14} />
                  Profile complete
                </span>
              )}
            </div>
          </div>

          <button type="button" className="cc-btn cc-btn-primary" onClick={() => setEditOpen(true)}>
            <span className="cc-icon-gap">
              <FormIcon name="edit" size={16} />
            </span>
            Edit Profile
          </button>
        </div>

        <div className="cc-pd-stats">
          {stats.map((stat, index) => (
            <button
              type="button"
              key={stat.key}
              className={`cc-pd-stat tone-${stat.tone}`}
              style={{ "--i": index }}
              onClick={() => {
                setFilter(stat.key);
                setTab("applications");
              }}
              aria-label={`${stat.label}: ${stat.value}. Show applications`}
            >
              <span className="cc-pd-stat-ico">
                <FormIcon name={stat.icon} size={22} />
              </span>
              <span>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="cc-pd-tabs" role="tablist" aria-label="Profile sections">
          <button type="button" role="tab" aria-selected={tab === "overview"} className={tab === "overview" ? "is-active" : ""} onClick={() => setTab("overview")}>
            Overview
          </button>
          <button type="button" role="tab" aria-selected={tab === "applications"} className={tab === "applications" ? "is-active" : ""} onClick={() => setTab("applications")}>
            Application History
            <em>{list.length}</em>
          </button>
        </div>

        <div className="cc-pd-panel" role="tabpanel" key={tab}>
          {tab === "overview" ? (
            <div className="cc-pd-cols">
              <article className="cc-pd-card">
                <div className="cc-pd-card-head">
                  <span className="cc-pd-card-ico">
                    <FormIcon name="user" size={19} />
                  </span>
                  <h3>Personal Information</h3>
                </div>
                <PdInfo rows={personalRows} />
              </article>

              <article className="cc-pd-card">
                <div className="cc-pd-card-head">
                  <span className="cc-pd-card-ico">
                    <FormIcon name="cap" size={19} />
                  </span>
                  <h3>Academic Information</h3>
                </div>
                <PdInfo rows={academicRows} />
                {!latest && (
                  <p className="cc-pd-empty-note" style={{ marginTop: 12 }}>
                    Your academic group, preferred course and college appear here after you submit an application.
                  </p>
                )}
              </article>
            </div>
          ) : list.length === 0 ? (
            <div className="cc-pd-empty">
              <h3>No applications yet</h3>
              <p>When you apply to a college, your applications and their status will appear here.</p>
              <button type="button" className="cc-btn cc-btn-primary" onClick={onApply}>
                Apply Now
              </button>
            </div>
          ) : (
            <>
              <div className="cc-pd-filters">
                {STATUS_FILTERS.map((status) => (
                  <button
                    type="button"
                    key={status}
                    className={`cc-pd-filter${filter === status ? " is-active" : ""}`}
                    onClick={() => setFilter(status)}
                  >
                    {status}
                    <em>{status === "All" ? list.length : counts[status] || 0}</em>
                  </button>
                ))}
                <button type="button" className="cc-btn cc-btn-primary cc-btn-sm" onClick={onApply}>
                  + New application
                </button>
              </div>

              {shown.length === 0 ? (
                <div className="cc-pd-empty">
                  <h3>No {filter.toLowerCase()} applications</h3>
                  <p>Try another filter to see your other applications.</p>
                </div>
              ) : (
                <>
                  <div className="cc-pd-tablewrap">
                    <table className="cc-pd-table">
                      <thead>
                        <tr>
                          <th scope="col">Application ID</th>
                          <th scope="col">College</th>
                          <th scope="col">Course</th>
                          <th scope="col">Applied on</th>
                          <th scope="col">Status</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shown.map((app, index) => (
                          <tr key={app.id} style={{ "--i": Math.min(index, 10) }}>
                            <td className="cc-pd-id">{formatAppId(app.id)}</td>
                            <td>
                              <strong>{app.collegeName}</strong>
                              {app.city && <small>{app.city}</small>}
                            </td>
                            <td>{app.courseName}</td>
                            <td>{formatAppDate(app.appliedOn)}</td>
                            <td>
                              <PdBadge status={app.status} />
                            </td>
                            <td>
                              <button type="button" className="cc-pd-link" onClick={() => setDetail(app)}>
                                <FormIcon name="eye" size={14} />
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="cc-pd-cards">
                    {shown.map((app, index) => (
                      <article className="cc-pd-appcard" key={app.id} style={{ "--i": Math.min(index, 8) }}>
                        <div className="cc-pd-appcard-top">
                          <span className="cc-pd-id">{formatAppId(app.id)}</span>
                          <PdBadge status={app.status} />
                        </div>
                        <h4>{app.collegeName}</h4>
                        <p>{app.courseName}</p>
                        <div className="cc-pd-appcard-foot">
                          <span>
                            <FormIcon name="calendar" size={14} />
                            {formatAppDate(app.appliedOn)}
                          </span>
                          <button type="button" className="cc-pd-link" onClick={() => setDetail(app)}>
                            <FormIcon name="eye" size={14} />
                            View Details
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {editOpen && (
        <div
          className={`cc-pd-backdrop${editClosing ? " is-closing" : ""}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeEdit();
          }}
        >
          <div className="cc-pd-modal" role="dialog" aria-modal="true" aria-label="Edit profile">
            <button type="button" className="cc-modal-close" aria-label="Close edit profile" onClick={closeEdit}>
              <Icon name="close" size={18} />
            </button>
            <div className="cc-pd-modal-scroll">
              <ProfileForm
                asModal
                email={email}
                initial={profile}
                mandatory={false}
                onSave={onSave}
                onSaved={handleSaved}
                onCancel={closeEdit}
              />
            </div>
          </div>
        </div>
      )}

      {detail && <PdDetails app={detail} closing={detailClosing} onClose={closeDetail} />}

      {toast && (
        <div className="cc-pd-toast" role="status">
          <FormIcon name="check" size={16} />
          {toast}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   COLLEGE DATA HELPERS
========================================================= */

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
  if (typeof value === "boolean") return value ? "Yes" : "No";

  if (Array.isArray(value)) {
    return value.map(toText).filter(Boolean).join(" · ");
  }

  if (value && typeof value === "object") {
    return value.name || value.title || value.value || "";
  }

  return value === undefined || value === null ? "" : String(value);
};

const formatFee = (value) => {
  const num = toNumber(value);

  if (num <= 0) return "";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
};

const resolveImage = (value) => {
  const raw = Array.isArray(value) ? value[0] : value;

  const src =
    typeof raw === "string"
      ? raw.trim()
      : raw && typeof raw === "object"
        ? raw.url || raw.src
        : "";

  if (!src) return "";

  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) {
    return src;
  }

  return `${API_ORIGIN}/${src.replace(/^\.?\//, "")}`;
};

const hideBrokenImage = (event) => {
  event.currentTarget.style.display = "none";
};

const getCollegeName = (college) =>
  toText(
    college?.name ||
      college?.basicDetails?.name ||
      college?.basic_details?.name,
  );

const getLocation = (college) =>
  toText(
    college?.city ||
      college?.location ||
      college?.basicDetails?.location ||
      college?.basic_details?.location,
  );

const getState = (college) =>
  toText(
    college?.state ||
      college?.basicDetails?.state ||
      college?.basic_details?.state ||
      "Tamil Nadu",
  );

const getDistrict = (college) =>
  toText(
    college?.district ||
      college?.basicDetails?.district ||
      college?.basic_details?.district ||
      college?.city,
  );

const getWebsite = (college) =>
  toText(
    college?.website ||
      college?.websiteUrl ||
      college?.url ||
      college?.basicDetails?.website ||
      college?.basic_details?.website,
  );

const getContact = (college) =>
  toText(
    college?.contact ||
      college?.phone ||
      college?.contactNumber ||
      college?.basicDetails?.contact ||
      college?.basic_details?.contact,
  );

const getCollegeType = (college) =>
  toText(
    college?.institutionType?.category ||
      college?.institutionType?.type ||
      college?.type ||
      "Engineering",
  );

const getCategory = (college) =>
  toText(
    college?.category ||
      college?.institutionType?.category ||
      college?.institutionType?.type ||
      college?.type ||
      "Engineering",
  );

const getAffiliation = (college) =>
  toText(
    college?.affiliation ||
      college?.institutionType?.affiliation ||
      college?.basicDetails?.affiliation,
  );

const getRating = (college) =>
  toNumber(college?.rating || college?.reviews?.rating);

const getFee = (college) =>
  college?.fee ||
  college?.fees ||
  college?.startingFee ||
  college?.courseFee ||
  0;

const getCourses = (college) => {
  if (Array.isArray(college?.courses)) return college.courses;
  if (Array.isArray(college?.courseDetails)) return college.courseDetails;
  return [];
};

// reads a course name whatever field the data file uses
const getCourseName = (course) =>
  toText(
    course?.courseName ||
      course?.name ||
      course?.title ||
      course?.basicDetails?.courseName,
  );

const getFacilities = (college) => {
  if (
    college?.facilities &&
    typeof college.facilities === "object" &&
    !Array.isArray(college.facilities)
  ) {
    return college.facilities;
  }

  return {
    hostel: college?.hostel || "",
    placement: college?.placement || "",
    scholarship: college?.scholarship || "",
    transport: college?.transport || "",
    infrastructure: college?.infrastructure || "",
  };
};

const getFacilityList = (college) =>
  Array.isArray(college?.facilities) ? college.facilities.filter(Boolean) : [];

const getAdmission = (college) => {
  if (college?.admission && typeof college.admission === "object") {
    return college.admission;
  }

  return {
    admissionProcess: college?.admissionProcess || "",
    cutoff: college?.cutoff || "",
    counselling: college?.counselling || "",
    importantDates: college?.importantDates || "",
  };
};

// Course ids repeat across the data files (Pharmacy and Law both use 701-706,
// Engineering and Arts overlap), so a course is looked up by the file the
// college came from (_src) first, then by category, and only then by a plain
// id that is unique across all files.
const findCourse = (courseIndex, college, id) =>
  courseIndex[`${college?._src}:${id}`] ||
  courseIndex[`${getCategory(college)}:${id}`] ||
  courseIndex[String(id)] ||
  undefined;

const courseNamesFromOldData = (college, courseIndex) =>
  toList(college?.courseIds)
    .map((id) => {
      const course = findCourse(courseIndex, college, id);
      return course ? getCourseName(course) : "";
    })
    .filter(Boolean);

const courseNames = (college, courseIndex) => {
  const nestedCourses = getCourses(college);

  if (nestedCourses.length > 0) {
    return nestedCourses.map(getCourseName).filter(Boolean);
  }

  return courseNamesFromOldData(college, courseIndex);
};

const courseDetails = (college, courseIndex) => {
  const nestedCourses = getCourses(college);

  if (nestedCourses.length > 0) {
    return nestedCourses;
  }

  return toList(college?.courseIds)
    .map((id) => findCourse(courseIndex, college, id))
    .filter(Boolean)
    .map((course) => ({
      courseName: getCourseName(course),
      degree: toText(course.degree) || "B.E / B.Tech",
      duration: toText(course.duration) || "4 Years",
      eligibility:
        toText(course.eligibility) ||
        toText(college?.eligibility) ||
        "12th with Physics, Chemistry and Mathematics",
      entranceExam: toText(course.entranceExam) || "TNEA",
      fees: formatFee(course.fees || course.fee || getFee(college)),
    }));
};

// helpers handed to ApplyNow so it reads college data the same way
const APPLY_HELPERS = {
  getCategory,
  getCollegeName,
  getLocation,
  courseDetails,
  getCourseName,
};

const matchesCollege = (college, courseIndex, search) => {
  if (!search) return true;

  const admission = getAdmission(college);
  const facilities = getFacilities(college);

  const text = [
    getCollegeName(college),
    getLocation(college),
    getState(college),
    getDistrict(college),
    getCollegeType(college),
    getAffiliation(college),
    getWebsite(college),
    getContact(college),
    college?.about,
    ...courseNames(college, courseIndex),
    ...getFacilityList(college),
    admission.admissionProcess,
    admission.cutoff,
    admission.counselling,
    admission.importantDates,
    facilities.hostel,
    facilities.placement,
    facilities.scholarship,
    facilities.transport,
    facilities.infrastructure,
  ]
    .map(toText)
    .join(" ")
    .toLowerCase();

  return text.includes(search);
};

/* page numbers with "…" so 10+ pages stay compact */
const buildPages = (current, total) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current - 1, current, current + 1]);

  if (current <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }

  if (current >= total - 2) {
    pages.add(total - 1);
    pages.add(total - 2);
    pages.add(total - 3);
  }

  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push("dots-" + page);
    }

    result.push(page);
  });

  return result;
};

/* =========================================================
   DATA LOADING (static JSON, resolved once at module load)
   Every college and course is tagged with the file it came from (_src)
   so course ids that repeat across files are never mixed up.
========================================================= */

const DATA_SOURCES = [
  { src: "eng", data: dbData, linked: true },
  { src: "arts", data: artsData },
  { src: "medical", data: medicalData },
  { src: "nursing", data: nursingData },
  { src: "allied", data: alliedData },
  { src: "physio", data: physiotherapyData },
  { src: "pharmacy", data: pharmacyData },
  { src: "law", data: lawData },
  { src: "agriculture", data: agricultureData, category: "Agriculture" },
  { src: "dental", data: dentalData, category: "Dental" },
  { src: "veterinary", data: veterinaryData, category: "Veterinary" },
  { src: "homeopathy", data: homeopathyData, category: "Homeopathy" },
];

const listOf = (data, key) => (Array.isArray(data?.[key]) ? data[key] : []);

function loadCatalog() {
  // only engineering colleges are linked through the collegeCourses table
  const courseIdsByCollege = {};
  listOf(dbData, "collegeCourses").forEach((link) => {
    const collegeId = link.collegeId ?? link.college_id;
    const courseId = link.courseId ?? link.course_id;
    if (collegeId == null || courseId == null) return;
    if (!courseIdsByCollege[collegeId]) courseIdsByCollege[collegeId] = [];
    courseIdsByCollege[collegeId].push(courseId);
  });

  const colleges = [];
  const courses = [];
  const seen = new Set();

  DATA_SOURCES.forEach(({ src, data, linked, category }) => {
    listOf(data, "colleges").forEach((item) => {
      const college = {
        ...item,
        _src: src,
        courseIds: [
          ...new Set([
            ...toList(item.courseIds),
            ...(linked ? courseIdsByCollege[item.id] || [] : []),
          ]),
        ],
      };

      // the newer files get a canonical category and have duplicates dropped
      if (category) {
        college.category = category;
        const name = getCollegeName(college).trim().toLowerCase();
        const key = `${src}|${name}|${getLocation(college).trim().toLowerCase()}`;
        if (name && seen.has(key)) return;
        seen.add(key);
      }

      colleges.push(college);
    });

    listOf(data, "courses").forEach((course) => courses.push({ ...course, _src: src }));
  });

  return { colleges, courses };
}

const { colleges, courses } = loadCatalog();

/* `${_src}:${id}` and `${category}:${id}` are exact keys. The plain `${id}`
   key is kept only when that id is unique across all files (ambiguous ids
   are stored as null). */
const courseIndex = (() => {
  const index = {};

  courses.forEach((course) => {
    if (course?.id === undefined) return;

    const id = String(course.id);

    if (course._src) index[`${course._src}:${id}`] = course;
    if (course.category) index[`${course.category}:${id}`] = course;

    index[id] = id in index ? null : course;
  });

  return index;
})();

// the newer categories take their course names from their own JSON files
// when present (the static list is only a fallback)
const courseCatalog = COURSE_CATALOG.map((entry) => {
  if (!["dental", "veterinary", "homeopathy"].includes(entry.id)) return entry;
  const fromData = [
    ...new Set(
      courses
        .filter((course) => course._src === entry.id)
        .map(getCourseName)
        .filter(Boolean),
    ),
  ];
  return fromData.length ? { ...entry, courses: fromData } : entry;
});

const cityOptions = [
  ...new Set(colleges.map(getLocation).filter(Boolean)),
].sort();

const typeOptions = [
  ...new Set(colleges.map(getCollegeType).filter(Boolean)),
].sort();

const categoryCounts = colleges.reduce((counts, college) => {
  const cat = getCategory(college);
  counts[cat] = (counts[cat] || 0) + 1;
  return counts;
}, {});

// all healthcare colleges combined (for the umbrella tab)
const healthGroupCount =
  (categoryCounts.Medical ?? 0) +
  (categoryCounts.Nursing ?? 0) +
  (categoryCounts.Allied ?? 0) +
  (categoryCounts.Physiotherapy ?? 0) +
  (categoryCounts.Pharmacy ?? 0);

const totalCourseOptions = colleges.reduce((total, college) => {
  const nested = getCourses(college);
  return total + (nested.length > 0 ? nested.length : toList(college?.courseIds).length);
}, 0);

const stats = [
  { value: colleges.length, label: "Colleges listed" },
  { value: courses.length || "8+", label: "Courses available" },
  { value: totalCourseOptions || "80+", label: "Course options" },
  { value: new Set(colleges.map(getLocation).filter(Boolean)).size, label: "Cities covered" },
];

const COLLEGE_CATEGORIES = [
  "Engineering",
  "Arts",
  "Healthcare & Medical Sciences",
  "Dental",
  "Law",
  "Agriculture",
  "Veterinary",
  "Homeopathy",
];

// subcategories shown under the "Healthcare & Medical Sciences" umbrella
const HEALTH_SUBCATEGORIES = ["Medical", "Nursing", "Allied Health", "Physiotherapy", "Pharmacy"];

// maps a subcategory tab to the `category` value stored on the colleges
const HEALTH_SUB_TO_CATEGORY = {
  Medical: "Medical",
  Nursing: "Nursing",
  "Allied Health": "Allied",
  Physiotherapy: "Physiotherapy",
  Pharmacy: "Pharmacy",
};

const ITEMS_PER_PAGE = 9;

/* =========================================================
   STYLES
========================================================= */

const STYLE = `
html {
  scroll-behavior: smooth;
}

#root {
  width: 100%;
  max-width: none;
  margin: 0;
  text-align: left;
}

.cc-root {
  --brand: #2478FC;
  --brand-dark: #185fc8;
  --deep: #01459A;
  --navy: #061F3A;
  --blue-25: #EEF7FE;
  --blue-50: #E7F1FF;
  --muted: #64748B;
  --muted-dark: #475569;
  --border: #E2E8F0;
  --success: #12805C;
  --warning: #F59E0B;
  --radius: 16px;
  --radius-lg: 22px;
  --shadow-md: 0 10px 30px rgba(6,31,58,.10);
  --shadow-lg: 0 20px 45px rgba(6,31,58,.14);
  --shadow-brand: 0 12px 28px rgba(36,120,252,.28);
  --ease: cubic-bezier(.4,0,.2,1);

  color-scheme: light only;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  color: #0F1C33;
  background: #fff;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

.cc-root *,
.cc-root *::before,
.cc-root *::after {
  box-sizing: border-box;
}

.cc-root h1,
.cc-root h2,
.cc-root h3,
.cc-root h4 {
  color: var(--navy);
  font-weight: 700;
  line-height: 1.25;
  margin: 0;
}

.cc-root p {
  margin: 0;
  color: var(--muted);
}

.cc-root ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cc-root a {
  color: inherit;
  text-decoration: none;
}

.cc-root img {
  display: block;
  max-width: 100%;
}

.cc-root [id] {
  scroll-margin-top: 84px;
}

.cc-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.cc-section {
  padding: 84px 0;
}

.cc-eyebrow {
  display: inline-block;
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: var(--brand);
  background: var(--blue-25);
  border: 1px solid #d5e6fb;
  padding: 6px 14px;
  border-radius: 999px;
  margin-bottom: 14px;
}

/* BUTTONS */

.cc-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: .95rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: .2s ease;
}

.cc-btn:hover {
  transform: translateY(-2px);
}

.cc-btn-primary {
  background: var(--brand);
  color: #fff;
  box-shadow: var(--shadow-brand);
}

.cc-btn-primary:hover {
  background: var(--brand-dark);
}

.cc-btn-ghost {
  background: #fff;
  color: var(--navy);
  border-color: var(--border);
}

.cc-btn-ghost:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.cc-btn-outline {
  background: transparent;
  color: var(--brand);
  border-color: #bcd8fb;
}

.cc-btn-outline:hover {
  background: var(--blue-25);
}

.cc-btn-sm {
  padding: 9px 18px;
  font-size: .88rem;
}

.cc-btn-lg {
  padding: 14px 30px;
  font-size: 1rem;
}

.cc-btn-block {
  display: flex;
  width: 100%;
}

/* NAVBAR */

.cc-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,.94);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}

.cc-nav-toggle {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.cc-nav-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 76px;
}

.cc-logo {
  display: flex;
  align-items: center;
  gap: 11px;
}

.cc-logo-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: linear-gradient(135deg, var(--brand), var(--deep));
  color: #fff;
}

.cc-logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.cc-logo-text strong {
  font-size: 1.08rem;
  color: var(--navy);
  font-weight: 800;
}

.cc-logo-text small {
  font-size: .68rem;
  color: var(--muted);
}

.cc-menu {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
}

.cc-menu a {
  padding: 9px 15px;
  border-radius: 999px;
  font-size: .95rem;
  font-weight: 600;
  color: var(--muted-dark);
}

.cc-menu a:hover {
  color: var(--brand);
  background: var(--blue-25);
}

.cc-nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cc-icon-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--navy);
}

.cc-icon-btn:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.cc-burger {
  display: none;
}

.cc-icon-close {
  display: none;
}

.cc-mobile {
  display: none;
  flex-direction: column;
  padding: 8px 24px 26px;
  border-top: 1px solid var(--border);
  background: #fff;
}

.cc-mobile a {
  padding: 13px 4px;
  font-weight: 600;
  color: var(--navy);
}

/* HERO */

.cc-hero {
  position: relative;
  background: linear-gradient(160deg,#f4f9ff 0%,#e9f2fe 46%,#fff 100%);
  padding: 76px 0 0;
}

.cc-hero-grid {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 48px;
  align-items: center;
  padding-bottom: 68px;
}

.cc-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 15px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #d5e6fb;
  color: var(--deep);
  font-size: .8rem;
  font-weight: 700;
}

.cc-hero h1 {
  font-size: clamp(2.1rem,4.6vw,3.3rem);
  margin-top: 20px;
}

.cc-hero h1 em {
  font-style: normal;
  color: var(--brand);
}

.cc-hero-text {
  margin-top: 18px;
  font-size: 1.06rem;
  color: var(--muted-dark);
  max-width: 52ch;
}

.cc-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.cc-points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 26px;
  font-size: .9rem;
  color: var(--muted-dark);
}

.cc-points li {
  display: flex;
  align-items: center;
  gap: 7px;
}

.cc-points svg {
  color: var(--success);
}

.cc-hero-visual {
  position: relative;
}

.cc-hero-img {
  height: 430px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg,#0b3a6f,#2f7de1);
}

.cc-hero-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cc-float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 16px;
  border-radius: var(--radius);
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}

.cc-float-b {
  bottom: 56px;
  right: -16px;
}

.cc-float-c {
  bottom: -20px;
  left: 30px;
}

.cc-icon-circle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: var(--blue-25);
  color: var(--brand);
}

.cc-float strong {
  display: block;
  font-size: 1.1rem;
  color: var(--navy);
}

.cc-float small {
  font-size: .74rem;
  color: var(--muted);
}

.cc-strip {
  background: var(--navy);
  padding: 30px 0 24px;
}

.cc-strip-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 20px;
  text-align: center;
}

.cc-strip-grid strong {
  display: block;
  font-size: 2rem;
  color: #fff;
}

.cc-strip-grid span {
  font-size: .85rem;
  color: #9DB8D4;
}

/* ABOUT */

.cc-about {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 56px;
  align-items: center;
}

.cc-about h2 {
  font-size: clamp(1.5rem,2.6vw,2rem);
}

.cc-about-text {
  margin-top: 16px;
  font-size: 1.02rem;
  color: var(--muted-dark);
}

.cc-about-list {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

.cc-about-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--navy);
  font-weight: 500;
}

.cc-about-list svg {
  color: var(--success);
}

.cc-about-img {
  height: 380px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.cc-about-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* COLLEGES */

.cc-colleges {
  background: linear-gradient(180deg,#fff 0%,#f7fbff 100%);
  border-top: 1px solid var(--border);
}

.cc-col-head {
  max-width: 850px;
  margin-bottom: 30px;
}

.cc-col-head h2 {
  font-size: clamp(1.6rem,2.8vw,2.1rem);
}

.cc-col-head p {
  margin-top: 12px;
  font-size: 1rem;
  color: var(--muted-dark);
}

/* CATEGORY TABS */

.cc-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

.cc-cat-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--muted-dark);
  font: inherit;
  font-size: .92rem;
  font-weight: 700;
  cursor: pointer;
  transition: .2s ease;
}

.cc-cat-btn:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.cc-cat-active {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
  box-shadow: var(--shadow-brand);
}

.cc-cat-active:hover {
  color: #fff;
}

.cc-cat-count {
  display: grid;
  place-items: center;
  min-width: 24px;
  height: 24px;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--blue-25);
  color: var(--deep);
  font-size: .74rem;
  font-weight: 800;
}

.cc-cat-active .cc-cat-count {
  background: rgba(255,255,255,.22);
  color: #fff;
}

/* SUB-CATEGORY DROPDOWN */

.cc-subcategory-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: -4px 0 18px;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--blue-25);
}

.cc-subcategory-label {
  font-size: .84rem;
  font-weight: 800;
  letter-spacing: .02em;
  text-transform: uppercase;
  color: var(--muted-dark);
}

.cc-subcategory-select {
  flex: 0 1 280px;
  background: #fff;
  border-color: var(--brand);
  font-weight: 700;
  color: var(--deep);
}

/* SEARCH */

.cc-tools {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
  gap: 12px;
}

.cc-field {
  position: relative;
  display: flex;
  align-items: center;
}

.cc-field > svg {
  position: absolute;
  left: 15px;
  color: var(--muted);
  pointer-events: none;
}

.cc-input,
.cc-select {
  width: 100%;
  height: 48px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #fff;
  font: inherit;
  font-size: .92rem;
  color: var(--navy);
}

.cc-input {
  padding: 0 18px 0 44px;
}

.cc-select {
  padding: 0 18px;
}

.cc-input:focus,
.cc-select:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(36,120,252,.14);
}

.cc-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 22px 0 18px;
}

.cc-count {
  font-size: .9rem;
  font-weight: 700;
  color: var(--muted-dark);
}

.cc-link-btn {
  background: none;
  border: 0;
  font: inherit;
  font-weight: 700;
  color: var(--brand);
  cursor: pointer;
}

/* COLLEGE CARDS */

.cc-grid {
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: 24px;
}

.cc-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 38px;
  padding-bottom: 10px;
}

.cc-page-numbers {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cc-page-dots {
  min-width: 24px;
  text-align: center;
  color: var(--muted);
  font-weight: 700;
}

.cc-page-btn {
  min-width: 42px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  color: var(--navy);
  font-size: .9rem;
  font-weight: 700;
  cursor: pointer;
  transition: .2s ease;
}

.cc-page-btn:hover:not(:disabled) {
  border-color: var(--brand);
  color: var(--brand);
  background: var(--blue-25);
}

.cc-page-active {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
  box-shadow: var(--shadow-brand);
}

.cc-page-active:hover {
  background: var(--brand-dark);
  color: #fff;
}

.cc-page-arrow {
  min-width: 90px;
}

.cc-page-btn:disabled {
  opacity: .45;
  cursor: not-allowed;
}

.cc-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: .25s ease;
}

.cc-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: #cfe2fb;
}

.cc-card-media {
  position: relative;
  height: 195px;
  background: linear-gradient(135deg,#0b3a6f,#2f7de1);
}

.cc-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cc-card-type {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(6,31,58,.82);
  color: #fff;
  font-size: .73rem;
  font-weight: 700;
}

.cc-card-rating {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border-radius: 999px;
  background: #fff;
  color: var(--navy);
  font-size: .82rem;
  font-weight: 800;
  box-shadow: var(--shadow-md);
}

.cc-card-rating svg {
  color: var(--warning);
}

.cc-card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  flex: 1;
}

.cc-card-title {
  font-size: 1.1rem;
}

.cc-card-loc {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: .88rem;
  color: var(--muted-dark);
}

.cc-card-loc svg {
  color: var(--brand);
}

.cc-card-fact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: .88rem;
}

.cc-card-fact span {
  color: var(--muted);
}

.cc-card-fact strong {
  color: var(--navy);
}

.cc-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: auto;
}

.cc-tag {
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--blue-25);
  border: 1px solid #d5e6fb;
  color: var(--deep);
  font-size: .75rem;
  font-weight: 600;
}

.cc-card-foot {
  padding: 18px 20px 20px;
}

/* EMPTY STATE */

.cc-state {
  display: grid;
  place-items: center;
  gap: 12px;
  padding: 58px 24px;
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: var(--radius-lg);
  background: #fff;
}

.cc-spinner {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid #dbeafe;
  border-top-color: var(--brand);
  animation: ccSpin .8s linear infinite;
}

@keyframes ccSpin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================================================
   DETAILS MODAL
========================================================= */

.cc-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(6,31,58,.65);
}

.cc-modal {
  position: relative;
  width: min(1050px,100%);
  max-height: 92vh;
  overflow: auto;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 30px 80px rgba(0,0,0,.25);
}

.cc-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 5;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--navy);
  cursor: pointer;
}

.cc-modal-close:hover {
  color: var(--brand);
  border-color: var(--brand);
}

.cc-modal-hero {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg,#0b3a6f,#2f7de1);
}

.cc-modal-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cc-modal-hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 30px;
  background: linear-gradient(transparent,rgba(0,0,0,.72));
}

.cc-modal-hero-overlay h2 {
  color: #fff;
  font-size: clamp(1.5rem,3vw,2.2rem);
  max-width: 800px;
}

.cc-modal-content {
  padding: 30px;
}

.cc-detail-section {
  margin-top: 26px;
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
}

.cc-detail-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 17px 20px;
  background: #f8fbff;
  border-bottom: 1px solid var(--border);
  color: var(--navy);
  font-size: 1rem;
}

.cc-detail-section-title svg {
  color: var(--brand);
}

.cc-detail-section-content {
  padding: 20px;
}

.cc-basic-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 14px;
}

.cc-info-box {
  padding: 15px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: #fff;
}

.cc-info-box span {
  display: block;
  font-size: .74rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: .05em;
  font-weight: 700;
  margin-bottom: 5px;
}

.cc-info-box strong {
  display: block;
  color: var(--navy);
  font-size: .9rem;
  word-break: break-word;
}

.cc-type-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 12px;
}

.cc-type-item {
  padding: 14px;
  border-radius: 14px;
  background: var(--blue-25);
  border: 1px solid #d5e6fb;
}

.cc-type-item span {
  display: block;
  color: var(--muted);
  font-size: .75rem;
}

.cc-type-item strong {
  display: block;
  margin-top: 4px;
  color: var(--deep);
  font-size: .9rem;
}

.cc-course-list {
  display: grid;
  gap: 14px;
}

.cc-course-card {
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}

.cc-course-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 15px 17px;
  background: #f8fbff;
  border-bottom: 1px solid var(--border);
}

.cc-course-header h4 {
  font-size: .95rem;
}

.cc-course-degree {
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--brand);
  color: #fff;
  font-size: .72rem;
  font-weight: 700;
  white-space: nowrap;
}

.cc-course-grid {
  display: grid;
  grid-template-columns: repeat(5,1fr);
}

.cc-course-item {
  padding: 14px;
  border-right: 1px solid var(--border);
}

.cc-course-item:last-child {
  border-right: 0;
}

.cc-course-item span {
  display: block;
  font-size: .7rem;
  color: var(--muted);
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 4px;
}

.cc-course-item strong {
  display: block;
  color: var(--navy);
  font-size: .8rem;
}

.cc-admission-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 14px;
}

.cc-admission-item {
  padding: 17px;
  border: 1px solid var(--border);
  border-radius: 14px;
}

.cc-admission-item span {
  display: block;
  color: var(--brand);
  font-size: .75rem;
  text-transform: uppercase;
  letter-spacing: .05em;
  font-weight: 800;
  margin-bottom: 7px;
}

.cc-admission-item p {
  color: var(--muted-dark);
  font-size: .88rem;
}

.cc-facility-grid {
  display: grid;
  grid-template-columns: repeat(5,1fr);
  gap: 12px;
}

.cc-facility {
  padding: 18px 12px;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: #fff;
}

.cc-facility-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin: 0 auto 9px;
  border-radius: 12px;
  background: var(--blue-25);
  color: var(--brand);
}

.cc-facility strong {
  display: block;
  color: var(--navy);
  font-size: .8rem;
}

.cc-facility p {
  margin-top: 5px;
  font-size: .74rem;
}

.cc-detail-about {
  margin-top: 25px;
  padding: 20px;
  border-radius: 16px;
  background: #f8fbff;
}

.cc-detail-about h4 {
  font-size: .8rem;
  text-transform: uppercase;
  letter-spacing: .07em;
  margin-bottom: 8px;
}

.cc-detail-about p {
  color: var(--muted-dark);
  font-size: .9rem;
}

.cc-modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

/* RESPONSIVE */

@media (max-width: 1024px) {
  .cc-menu {
    display: none;
  }

  .cc-nav-actions {
    margin-left: auto;
  }

  .cc-burger {
    display: grid;
  }

  .cc-nav-toggle:checked ~ .cc-nav-inner .cc-icon-burger {
    display: none;
  }

  .cc-nav-toggle:checked ~ .cc-nav-inner .cc-icon-close {
    display: block;
  }

  .cc-nav-toggle:checked ~ .cc-mobile {
    display: flex;
  }

  .cc-hero-grid,
  .cc-about {
    grid-template-columns: 1fr;
  }

  .cc-hero-img {
    height: 340px;
  }

  .cc-tools {
    grid-template-columns: 1fr 1fr;
  }

  .cc-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .cc-basic-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .cc-course-grid {
    grid-template-columns: repeat(3,1fr);
  }

  .cc-course-item {
    border-bottom: 1px solid var(--border);
  }

  .cc-facility-grid {
    grid-template-columns: repeat(3,1fr);
  }
}

@media (max-width: 680px) {
  .cc-root {
    font-size: 15px;
  }

  .cc-wrap {
    padding: 0 18px;
  }

  .cc-section {
    padding: 58px 0;
  }

  .cc-hero {
    padding-top: 52px;
  }

  .cc-strip-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cc-hero-actions .cc-btn {
    width: 100%;
  }

  .cc-tools {
    grid-template-columns: 1fr;
  }

  .cc-grid {
    grid-template-columns: 1fr;
  }

  .cc-modal-content {
    padding: 20px;
  }

  .cc-modal-hero {
    height: 210px;
  }

  .cc-basic-grid,
  .cc-type-grid,
  .cc-admission-grid {
    grid-template-columns: 1fr;
  }

  .cc-course-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cc-course-item {
    border-right: 1px solid var(--border);
  }

  .cc-facility-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cc-modal-actions {
    flex-direction: column;
  }

  .cc-pagination {
    gap: 6px;
    flex-wrap: wrap;
  }

  .cc-page-numbers {
    gap: 5px;
  }

  .cc-page-btn {
    min-width: 38px;
    height: 38px;
    padding: 0 10px;
    font-size: .82rem;
  }

  .cc-page-arrow {
    min-width: 75px;
  }
}
`;

/* =========================================================
   OPENING REVEAL
========================================================= */

let openingPlayed = false;

function OpeningReveal() {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [visible, setVisible] = useState(() => {
    if (reduceMotion || openingPlayed) return false;
    openingPlayed = true;
    return true;
  });

  useEffect(() => {
    if (!visible) return undefined;
    const timer = setTimeout(() => setVisible(false), 1780);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="cc-open" role="presentation">
      <div className="cc-open-panel cc-open-left" />
      <div className="cc-open-panel cc-open-right" />
      <div className="cc-open-mark">
        <span className="cc-open-seal">SC</span>
        <strong>Campus Atlas</strong>
        <small>Opening your college path</small>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // every page is rendered on its own route
  const view = location.pathname.startsWith("/student/applications")
    ? "applications"
    : location.pathname.startsWith("/student/colleges")
      ? "colleges"
      : location.pathname.startsWith("/student/about")
        ? "about"
        : location.pathname.startsWith("/student/courses")
          ? "courses"
          : location.pathname.startsWith("/student/profile")
            ? "profile"
            : "home";

  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem("scp_session");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = (account) => {
    // never keep the password in the stored session
    const safeAccount = { ...account };
    delete safeAccount.password;

    try {
      localStorage.setItem("scp_session", JSON.stringify(safeAccount));
    } catch {
      // storage unavailable: the session lasts until the page is refreshed
    }
    setSession(safeAccount);
  };

  const logout = () => {
    try {
      localStorage.removeItem("scp_session");
    } catch {
      // storage unavailable
    }
    setSession(null);
  };

  const user = session;

  // navigate between pages and scroll to the matching anchor
  const handleNav = (event, item) => {
    event.preventDefault();

    if (item.route && item.route !== location.pathname) {
      navigate(item.route);
    }

    const anchor = (item.href || "").replace("#", "");
    if (anchor) {
      setTimeout(
        () => {
          document.getElementById(anchor)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
        item.route === location.pathname ? 60 : 250,
      );
    }
  };

  const userFirstName = user?.name?.trim().split(/\s+/)[0] || "Student";

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [healthSub, setHealthSub] = useState("Medical");
  const [sort, setSort] = useState("rating-desc");

  const [selected, setSelected] = useState(null);
  const [closing, setClosing] = useState(false);

  // animated close for the college details modal
  const closeDetails = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setSelected(null);
      setClosing(false);
    }, 240);
  };
  const closeDetailsRef = useRef(closeDetails);
  closeDetailsRef.current = closeDetails;

  // stop the page scrolling behind the open modal
  useEffect(() => {
    if (!selected) return undefined;
    document.body.classList.add("cc-lock");
    return () => document.body.classList.remove("cc-lock");
  }, [selected]);

  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  // close the details modal with Esc
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeDetailsRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ---------- apply now ----------
     applyTarget === null        -> form closed
     applyTarget === { college } -> form open (college is null when opened from the navbar) */

  const [applyTarget, setApplyTarget] = useState(null);
  const [applications, setApplications] = useState(readApplications);

  const userKey = (user?.email || user?.name || "").trim().toLowerCase();

  /* ---------- profile ---------- */
  const [profiles, setProfiles] = useState(readProfiles);

  const profile = profiles[userKey];
  const profileDone = isProfileComplete(profile);

  // navbar name + round initial + dropdown
  const displayName = (user?.name || profile?.fullName || "Student").trim();
  const navInitial = (displayName[0] || "S").toUpperCase();
  const navFirstName = displayName.split(/\s+/)[0];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // close the dropdown whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const persistProfile = (data) => {
    try {
      const next = { ...readProfiles(), [userKey]: data };
      localStorage.setItem(PROFILES_KEY, JSON.stringify(next));
      return true;
    } catch {
      return false;
    }
  };

  const profileSaved = (data) => {
    setProfiles((prev) => ({ ...prev, [userKey]: data }));
    if (!profileDone) navigate("/student/dashboard");
  };

  const myApplications = useMemo(
    () =>
      applications
        .filter((item) => item.userKey === userKey)
        .sort((a, b) => b.id - a.id),
    [applications, userKey],
  );

  // openApply()         -> blank form (navbar)
  // openApply(college)  -> college and category pre-selected (college page)
  const openApply = (college) => {
    setSelected(null);
    setApplyTarget({ college: college || null });
  };

  const closeApply = () => setApplyTarget(null);

  const viewMyApplications = () => {
    setApplyTarget(null);
    navigate("/student/applications");
  };

  /* ---------- category filters ---------- */

  const isHealthGroup = category === "Healthcare & Medical Sciences";

  // the concrete category used for filtering and headings
  const activeCategory = isHealthGroup
    ? HEALTH_SUB_TO_CATEGORY[healthSub] ?? "Medical"
    : category;

  // jump from the course page to the matching college tab
  const browseCategory = (id) => {
    const target = BROWSE_TARGET[id];
    if (!target) return;
    setSearch("");
    setCity("");
    setType("");
    setCategory(target.cat);
    if (target.sub) setHealthSub(target.sub);
    navigate("/student/colleges");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
  };

  /* ---------- filter + sort ---------- */

  const visibleColleges = useMemo(() => {
    const needle = search.trim().toLowerCase();

    const result = colleges.filter((college) => {
      if (city && getLocation(college) !== city) return false;
      if (type && getCollegeType(college) !== type) return false;
      if (activeCategory && getCategory(college) !== activeCategory) return false;
      return matchesCollege(college, courseIndex, needle);
    });

    if (sort === "rating-desc") {
      result.sort((a, b) => getRating(b) - getRating(a));
    }

    if (sort === "rating-asc") {
      result.sort((a, b) => getRating(a) - getRating(b));
    }

    if (sort === "fee-asc") {
      result.sort((a, b) => toNumber(getFee(a)) - toNumber(getFee(b)));
    }

    if (sort === "fee-desc") {
      result.sort((a, b) => toNumber(getFee(b)) - toNumber(getFee(a)));
    }

    if (sort === "name-asc") {
      result.sort((a, b) => getCollegeName(a).localeCompare(getCollegeName(b)));
    }

    return result;
  }, [search, city, type, activeCategory, sort]);

  /* ---------- pagination ---------- */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, city, type, activeCategory, sort]);

  const totalPages = Math.ceil(visibleColleges.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedColleges = visibleColleges.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      document.getElementById("colleges")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const filtersActive = Boolean(search || city || type || category);

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setType("");
    setCategory("Engineering");
    setHealthSub("Medical");
  };

  /* ---------- selected college ---------- */

  const selectedCourses = selected ? courseDetails(selected, courseIndex) : [];

  const selectedFacilities = selected ? getFacilities(selected) : {};

  const selectedFacilityList = selected ? getFacilityList(selected) : [];

  const selectedImage = selected
    ? resolveImage(selected.image || selected.basicDetails?.image)
    : "";

  /* ---------- auth gate ---------- */

  if (!session) {
    return <LoginView users={USERS} onSuccess={login} />;
  }

  /* ---------- profile gate: nothing else renders until the profile is complete ---------- */

  if (!profileDone) {
    return (
      <>
        <style>{STYLE}</style>
        <style>{USER_STYLE}</style>
        <style>{EXTRA_STYLE}</style>
        <style>{MOTION_STYLE}</style>
        <OpeningReveal />
        <div className="cc-root">
          <header className="cc-nav">
            <div className="cc-wrap cc-nav-inner">
              <span className="cc-logo">
                <span className="cc-logo-mark">
                  <Icon name="cap" size={24} />
                </span>
                <span className="cc-logo-text">
                  <strong>Student College</strong>
                  <small>Student-College Admission Platform</small>
                </span>
              </span>
              <div className="cc-nav-actions" style={{ marginLeft: "auto" }}>
                <span className="cc-user-name">{userFirstName}</span>
                <button type="button" className="cc-btn cc-btn-outline cc-btn-sm" onClick={logout}>
                  Sign out
                </button>
              </div>
            </div>
          </header>

          <ProfileForm
            mandatory
            initial={{ ...EMPTY_PROFILE, fullName: user?.name || "" }}
            onSave={persistProfile}
            onSaved={profileSaved}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{STYLE}</style>
      <style>{USER_STYLE}</style>
      <style>{EXTRA_STYLE}</style>
      <style>{MOTION_STYLE}</style>
      <style>{REDESIGN_STYLE}</style>
      <OpeningReveal />

      <div className="cc-root" id="home">
        {/* NAVBAR */}

        <header className={`cc-nav ${scrollPct > 2 ? "cc-nav-scrolled" : ""}`}>
          <input
            type="checkbox"
            id="cc-nav-toggle"
            className="cc-nav-toggle"
          />
          <span className="cc-nav-progress" style={{ width: `${scrollPct}%` }} />

          <div className="cc-wrap cc-nav-inner">
            <a
              href="#home"
              className="cc-logo"
              onClick={(event) =>
                handleNav(event, { href: "#home", route: "/student/dashboard" })
              }
            >
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
                <a
                  key={item.label}
                  href={item.href}
                  className={item.label.toLowerCase() === view ? "cc-menu-active" : ""}
                  onClick={(event) => handleNav(event, item)}
                >
                  {item.label}
                </a>
              ))}

              <button
                type="button"
                className="cc-btn cc-btn-primary cc-btn-sm cc-menu-apply cc-glow-btn"
                onClick={() => openApply()}
              >
                Apply Now
              </button>
            </nav>

            <div className="cc-nav-actions">
              {user ? (
                <div className="cc-profile-menu" ref={menuRef}>
                  <button
                    type="button"
                    className="cc-profile-trigger"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                  >
                    <span className="cc-nav-name">{navFirstName}</span>
                    <span className="cc-user-avatar">{navInitial}</span>
                  </button>

                  {menuOpen && (
                    <div className="cc-dropdown" role="menu">
                      <button
                        type="button"
                        role="menuitem"
                        className="cc-dropdown-item"
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/student/profile");
                        }}
                      >
                        Profile
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        className="cc-dropdown-item"
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/student/applications");
                        }}
                      >
                        My Applications
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        className="cc-dropdown-item cc-dropdown-danger"
                        onClick={() => {
                          setMenuOpen(false);
                          logout();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <a href="/login" className="cc-btn cc-btn-outline cc-btn-sm">
                    Login
                  </a>

                  <a href="/register" className="cc-btn cc-btn-primary cc-btn-sm">
                    Register
                  </a>
                </>
              )}

              <label htmlFor="cc-nav-toggle" className="cc-icon-btn cc-burger">
                <span className="cc-icon-burger">
                  <Icon name="menu" size={20} />
                </span>

                <span className="cc-icon-close">
                  <Icon name="close" size={20} />
                </span>
              </label>
            </div>
          </div>

          <nav className="cc-mobile">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={item.label.toLowerCase() === view ? "cc-menu-active" : ""}
                onClick={(event) => {
                  document.getElementById("cc-nav-toggle").checked = false;
                  handleNav(event, item);
                }}
              >
                {item.label}
              </a>
            ))}

            <button
              type="button"
              className="cc-btn cc-btn-primary cc-btn-block cc-apply-mobile cc-glow-btn"
              onClick={() => {
                document.getElementById("cc-nav-toggle").checked = false;
                openApply();
              }}
            >
              Apply Now
            </button>

            {!user && (
              <>
                <a href="/login" className="cc-btn cc-btn-outline cc-btn-block">
                  Login
                </a>

                <a href="/register" className="cc-btn cc-btn-primary cc-btn-block">
                  Register
                </a>
              </>
            )}
          </nav>
        </header>

        <main className={`cc-stage cc-stage-${view}`} key={view}>
          {/* HOME */}

          {view === "home" && (
            <section className="cc-hero">
              <div className="cc-aurora" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="cc-wrap cc-hero-grid">
                <div>
                  <span className="cc-pill">
                    <Icon name="sparkle" size={15} />
                    Tamil Nadu Engineering Colleges
                  </span>

                  <h1>
                    Find the Right College for <em>Your Future</em>
                  </h1>

                  <p className="cc-hero-text">
                    Explore engineering colleges in Coimbatore, Erode and Salem
                    with courses, fees, eligibility, facilities and important
                    college details in one place.
                  </p>

                  <div className="cc-hero-actions">
                    <a
                      href="#colleges"
                      className="cc-btn cc-btn-primary cc-btn-lg"
                      onClick={(event) =>
                        handleNav(event, { href: "#colleges", route: "/student/colleges" })
                      }
                    >
                      Explore Colleges
                      <Icon name="arrow" size={18} />
                    </a>

                    <a
                      href="#colleges"
                      className="cc-btn cc-btn-ghost cc-btn-lg"
                      onClick={(event) =>
                        handleNav(event, { href: "#colleges", route: "/student/colleges" })
                      }
                    >
                      Compare Colleges
                    </a>
                  </div>

                  <ul className="cc-points">
                    <li>
                      <Icon name="check" size={16} />
                      Courses & fees
                    </li>

                    <li>
                      <Icon name="check" size={16} />
                      College details
                    </li>

                    <li>
                      <Icon name="check" size={16} />
                      Facilities
                    </li>
                  </ul>
                </div>

                <div className="cc-hero-visual">
                  <div className="cc-hero-img">
                    <img
                      src={homeStudentImage}
                      alt="Students on a college campus"
                    />
                  </div>

                  <div className="cc-float cc-float-b">
                    <span className="cc-icon-circle">
                      <Icon name="building" size={22} />
                    </span>

                    <div>
                      <strong>{colleges.length || "10"}+</strong>
                      <small>Engineering Colleges</small>
                    </div>
                  </div>

                  <div className="cc-float cc-float-c">
                    <span className="cc-icon-circle">
                      <Icon name="book" size={22} />
                    </span>

                    <div>
                      <strong>{courses.length || "8"}+</strong>
                      <small>Courses Available</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cc-strip">
                <div className="cc-wrap cc-strip-grid">
                  {stats.map((item) => (
                    <div key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ABOUT */}

          {view === "about" && (
            <section className="cc-section cc-about-page" id="about">
              <div className="cc-wrap">
                <div className="cc-page-hero">
                  <span className="cc-eyebrow">About us</span>
                  <h2>Your path from school to the right college</h2>
                  <p>
                    The Student–College Admission Platform brings colleges,
                    courses, eligibility and applications into one simple place.
                  </p>
                </div>

                <div className="cc-about">
                  <div>
                    <h2>Our purpose</h2>
                    <p className="cc-about-text">
                      Choosing a college is confusing: details are scattered,
                      cutoffs are hard to compare and applications are
                      repetitive. We give every student one trusted place to
                      explore, compare and apply, without running between
                      websites.
                    </p>

                    <ul className="cc-about-list">
                      <li>
                        <Icon name="check" size={18} />
                        Search colleges by category, city and course
                      </li>
                      <li>
                        <Icon name="check" size={18} />
                        See fees, eligibility, facilities and placements
                      </li>
                      <li>
                        <Icon name="check" size={18} />
                        Auto-calculated cutoff marks for each stream
                      </li>
                      <li>
                        <Icon name="check" size={18} />
                        Apply in one form and track your status
                      </li>
                    </ul>
                  </div>

                  <div className="cc-about-img">
                    <img src={aboutStudentImage} alt="Students on campus" />
                  </div>
                </div>

                <div className="cc-journey">
                  {[
                    ["01", "Create profile", "Add your marks and interests once."],
                    ["02", "Explore colleges", "Filter by category, city and fees."],
                    ["03", "Apply online", "One form, auto-calculated cutoff."],
                    ["04", "Track status", "See approvals in My Applications."],
                  ].map(([num, title, text]) => (
                    <div className="cc-journey-step" key={num}>
                      <span>{num}</span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>

                <div className="cc-cx-grid" style={{ marginTop: 40 }}>
                  {[
                    ["🏫", "Explore", "Engineering, Arts & Science, Health, Law and more in one directory.", "linear-gradient(135deg,#dbeafe,#ede9fe)"],
                    ["📚", "Compare courses", "Duration, eligibility, entrance exams and fees side by side.", "linear-gradient(135deg,#ccfbf1,#dbeafe)"],
                    ["📝", "Apply easily", "Your profile pre-fills the form, so you can apply to several colleges quickly.", "linear-gradient(135deg,#fce7f3,#ede9fe)"],
                    ["📊", "Track progress", "Pending, approved or rejected, all visible in My Applications.", "linear-gradient(135deg,#fef3c7,#fce7f3)"],
                  ].map(([emoji, title, text, grad]) => (
                    <article
                      className="cc-cx-card"
                      key={title}
                      style={{ background: grad }}
                    >
                      <span className="cc-cx-icon">{emoji}</span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* COURSES */}

          {view === "courses" && (
            <CoursesView
              catalog={courseCatalog}
              counts={categoryCounts}
              onBrowse={browseCategory}
            />
          )}

          {/* MY APPLICATIONS */}

          {view === "applications" && (
            <MyApplicationsView
              applications={myApplications}
              onApply={() => openApply()}
              onBrowse={() => navigate("/student/colleges")}
            />
          )}

          {/* PROFILE */}

          {view === "profile" && (
            <ProfileView
              profile={profile}
              user={user}
              applications={myApplications}
              onSave={persistProfile}
              onSaved={profileSaved}
              onApply={() => openApply()}
            />
          )}

          {/* COLLEGES */}

          {view === "colleges" && (
            <section className="cc-section cc-colleges" id="colleges">
              <div className="cc-wrap">
                <div className="cc-col-hero">
                  <div className="cc-col-orbs" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="cc-col-hero-main">
                    <span className="cc-col-badge">
                      <Icon name="sparkle" size={14} /> College Directory
                    </span>

                    <h2>
                      Discover the best <em>{activeCategory}</em> colleges
                    </h2>

                    <p>
                      Compare fees, courses, eligibility and facilities in one
                      place, then apply to your top choice in a few clicks.
                    </p>

                    <div className="cc-col-stats">
                      {[
                        [colleges.length, "Colleges listed"],
                        [Object.keys(categoryCounts).length, "Categories"],
                        [cityOptions.length, "Cities covered"],
                        [visibleColleges.length, "Matching now"],
                      ].map(([value, label]) => (
                        <div className="cc-col-stat" key={label}>
                          <strong>{value}</strong>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(() => {
                    const picks = colleges
                      .filter((c) => getCategory(c) === activeCategory)
                      .sort((a, b) => getRating(b) - getRating(a))
                      .slice(0, 3);

                    if (picks.length === 0) return null;

                    return (
                      <aside className="cc-col-spot">
                        <h4>
                          <Icon name="star" size={16} /> Top picks in {activeCategory}
                        </h4>

                        {picks.map((college, index) => (
                          <button
                            type="button"
                            key={`${college._src}-${college.id}`}
                            className="cc-spot-item"
                            onClick={() => setSelected(college)}
                          >
                            <span className={`cc-spot-rank cc-rank-${index + 1}`}>
                              {index + 1}
                            </span>

                            <span className="cc-spot-text">
                              <strong>{getCollegeName(college)}</strong>
                              <small>
                                {getLocation(college)}
                                {getRating(college) > 0
                                  ? ` • ★ ${getRating(college).toFixed(1)}`
                                  : ""}
                              </small>
                            </span>

                            <Icon name="arrow" size={16} />
                          </button>
                        ))}
                      </aside>
                    );
                  })()}
                </div>

                {/* category tabs */}

                <div className="cc-categories cc-cat-tabs">
                  {COLLEGE_CATEGORIES.map((cat, index) => (
                    <button
                      type="button"
                      key={cat}
                      style={{ animationDelay: `${index * 70}ms`, ...themeVars(cat) }}
                      className={`cc-cat-btn ${category === cat ? "cc-cat-active" : ""}`}
                      onClick={() => {
                        setCategory(cat);
                        if (cat === "Healthcare & Medical Sciences") {
                          setHealthSub("Medical");
                        }
                      }}
                    >
                      <span className="cc-cat-emoji" aria-hidden="true">
                        <CatIcon name={cat} size={18} />
                      </span>
                      {cat}
                      <span className="cc-cat-count">
                        {cat === "Healthcare & Medical Sciences"
                          ? healthGroupCount
                          : categoryCounts[cat] ?? 0}
                      </span>
                    </button>
                  ))}
                </div>

                {/* sub-category dropdown (Healthcare & Medical Sciences) */}

                {isHealthGroup && (
                  <div className="cc-subcategory-bar">
                    <label className="cc-subcategory-label" htmlFor="cc-subcat">
                      Choose specialisation
                    </label>

                    <select
                      id="cc-subcat"
                      className="cc-select cc-subcategory-select"
                      value={healthSub}
                      onChange={(event) => setHealthSub(event.target.value)}
                    >
                      {HEALTH_SUBCATEGORIES.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub} ({categoryCounts[HEALTH_SUB_TO_CATEGORY[sub]] ?? 0})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* search and filters */}

                <div className="cc-tools">
                  <div className="cc-field">
                    <Icon name="search" size={18} />

                    <input
                      className="cc-input"
                      type="search"
                      placeholder="Search college, course, location..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>

                  <select
                    className="cc-select"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  >
                    <option value="">All locations</option>

                    {cityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    className="cc-select"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    <option value="">All institution types</option>

                    {typeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    className="cc-select"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="rating-desc">Rating: High to Low</option>
                    <option value="rating-asc">Rating: Low to High</option>
                    <option value="fee-asc">Fees: Low to High</option>
                    <option value="fee-desc">Fees: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                  </select>
                </div>

                <div className="cc-meta-row">
                  <span className="cc-count">
                    Showing {visibleColleges.length} of {colleges.length} colleges
                  </span>

                  {filtersActive && (
                    <button
                      type="button"
                      className="cc-link-btn"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                {/* empty state */}

                {visibleColleges.length === 0 && (
                  <div className="cc-state">
                    <Icon name="search" size={26} />

                    <strong>
                      {(categoryCounts[activeCategory] ?? 0) === 0
                        ? `${activeCategory} colleges are not added yet`
                        : "No colleges found"}
                    </strong>

                    {(categoryCounts[activeCategory] ?? 0) === 0 ? (
                      <span style={{ color: "#64748B", fontSize: ".9rem" }}>
                        {activeCategory} colleges will be added soon. Engineering
                        colleges are available now.
                      </span>
                    ) : (
                      <button className="cc-link-btn" onClick={clearFilters}>
                        Clear filters
                      </button>
                    )}
                  </div>
                )}

                {/* college cards */}

                {visibleColleges.length > 0 && (
                  <>
                    <div className="cc-grid">
                      {paginatedColleges.map((college, cardIndex) => {
                        const name = getCollegeName(college);
                        const location = getLocation(college);
                        const rating = getRating(college);
                        const image = resolveImage(college.image);
                        const names = courseNames(college, courseIndex);

                        return (
                          <article
                            className="cc-card cc-card-x"
                            key={`${college._src}-${college.id}`}
                            style={{
                              ...themeVars(getCategory(college)),
                              animationDelay: `${Math.min(cardIndex, 8) * 55}ms`,
                            }}
                            onPointerMove={tiltMove}
                            onPointerLeave={tiltLeave}
                          >
                            <div className="cc-card-media">
                              <span className="cc-card-fallback" aria-hidden="true">
                                <CatIcon name={getCategory(college)} size={56} />
                              </span>

                              {image && (
                                <img
                                  src={image}
                                  alt={`${name} campus`}
                                  loading="lazy"
                                  onError={hideBrokenImage}
                                />
                              )}

                              <span className="cc-card-type">
                                {getCollegeType(college)}
                              </span>

                              <span className="cc-card-cat">
                                <CatIcon name={getCategory(college)} size={14} />
                                {getCategory(college)}
                              </span>

                              {rating > 0 && (
                                <span className="cc-card-rating">
                                  <Icon name="star" size={14} />
                                  {rating.toFixed(1)}
                                </span>
                              )}
                            </div>

                            <div className="cc-card-body">
                              <h3 className="cc-card-title">{name}</h3>

                              {location && (
                                <p className="cc-card-loc">
                                  <Icon name="pin" size={15} />
                                  {location}, {getState(college)}
                                </p>
                              )}

                              {getDistrict(college) && getDistrict(college) !== location && (
                                <p className="cc-card-fact">
                                  <span>District</span>
                                  <strong>{getDistrict(college)}</strong>
                                </p>
                              )}

                              {formatFee(getFee(college)) && (
                                <p className="cc-card-fact">
                                  <span>Starting Fees</span>
                                  <strong>{formatFee(getFee(college))}</strong>
                                </p>
                              )}

                              <p className="cc-card-fact">
                                <span>Institution</span>
                                <strong>{getCollegeType(college)}</strong>
                              </p>

                              <div className="cc-card-tags">
                                {names.length === 0 ? (
                                  <span className="cc-tag">Courses available</span>
                                ) : (
                                  names.slice(0, 2).map((course, index) => (
                                    <span className="cc-tag" key={`${course}-${index}`}>
                                      {course}
                                    </span>
                                  ))
                                )}

                                {names.length > 2 && (
                                  <span className="cc-tag">+{names.length - 2} more</span>
                                )}
                              </div>
                            </div>

                            <div className="cc-card-foot">
                              <button
                                type="button"
                                className="cc-btn cc-btn-primary cc-btn-block"
                                onClick={() => setSelected(college)}
                              >
                                View Full Details
                                <Icon name="arrow" size={16} />
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>

                    {totalPages > 1 && (
                      <div className="cc-pagination" aria-label="College pages">
                        <button
                          type="button"
                          className="cc-page-btn cc-page-arrow"
                          disabled={currentPage === 1}
                          onClick={() => goToPage(currentPage - 1)}
                        >
                          Previous
                        </button>

                        <div className="cc-page-numbers">
                          {buildPages(currentPage, totalPages).map((page) =>
                            typeof page === "string" ? (
                              <span key={page} className="cc-page-dots">
                                …
                              </span>
                            ) : (
                              <button
                                key={page}
                                type="button"
                                className={`cc-page-btn ${currentPage === page ? "cc-page-active" : ""}`}
                                aria-current={currentPage === page ? "page" : undefined}
                                onClick={() => goToPage(page)}
                              >
                                {page}
                              </button>
                            ),
                          )}
                        </div>

                        <button
                          type="button"
                          className="cc-page-btn cc-page-arrow"
                          disabled={currentPage === totalPages}
                          onClick={() => goToPage(currentPage + 1)}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          )}
        </main>

        {/* APPLY NOW */}

        {applyTarget && (
          <ApplyNow
            college={applyTarget.college}
            colleges={colleges}
            courseIndex={courseIndex}
            helpers={APPLY_HELPERS}
            user={user}
            profile={profile}
            userKey={userKey}
            myApplications={myApplications}
            onClose={closeApply}
            onSubmitted={setApplications}
            onViewApplications={viewMyApplications}
          />
        )}

        {/* COLLEGE DETAILS MODAL */}

        {selected && (
          <div
            className={`cc-modal-backdrop cc-drawer-backdrop ${closing ? "is-closing" : ""}`}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeDetails();
              }
            }}
          >
            <div
              className="cc-modal cc-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={getCollegeName(selected)}
              style={themeVars(getCategory(selected))}
            >
              <button
                type="button"
                className="cc-modal-close"
                aria-label="Close details"
                onClick={closeDetails}
              >
                <Icon name="close" size={18} />
              </button>

              {!selectedImage && (
                <div className="cc-modal-hero cc-modal-hero-fallback">
                  <span className="cc-hero-icon" aria-hidden="true">
                    <CatIcon name={getCategory(selected)} size={96} />
                  </span>
                  <div className="cc-modal-hero-overlay">
                    <h2>{getCollegeName(selected)}</h2>
                  </div>
                </div>
              )}

              {selectedImage && (
                <div className="cc-modal-hero" style={themeVars(getCategory(selected))}>
                  <img
                    src={selectedImage}
                    alt={`${getCollegeName(selected)} campus`}
                    onError={hideBrokenImage}
                  />

                  <div className="cc-modal-hero-overlay">
                    <h2>{getCollegeName(selected)}</h2>
                  </div>
                </div>
              )}

              <div className="cc-modal-content">
                <div className="cc-modal-tags">
                  <span>
                    <CatIcon name={getCategory(selected)} size={14} />
                    {getCategory(selected)}
                  </span>
                  {getDistrict(selected) && (
                    <span>
                      <Icon name="pin" size={14} />
                      {getDistrict(selected)}
                    </span>
                  )}
                </div>

                <div className="cc-drawer-chips">
                  {[
                    ["⭐", "Rating", getRating(selected) > 0 ? getRating(selected).toFixed(1) : "N/A"],
                    ["💰", "Fees", formatFee(getFee(selected)) || "On request"],
                    ["🏛️", "Type", getCollegeType(selected) || "-"],
                    ["📍", "City", getLocation(selected) || "-"],
                  ].map(([emoji, label, value], index) => (
                    <div
                      className="cc-drawer-chip"
                      key={label}
                      style={{ animationDelay: `${0.25 + index * 0.08}s` }}
                    >
                      <span>{emoji}</span>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>

                <div className="cc-modal-apply-row">
                  <button
                    type="button"
                    className="cc-btn cc-btn-primary cc-glow-btn"
                    onClick={() => openApply(selected)}
                  >
                    Apply Now
                  </button>
                </div>

                {/* basic details */}

                <section className="cc-detail-section">
                  <div className="cc-detail-section-title">
                    <Icon name="building" size={19} />
                    <strong>Basic Details</strong>
                  </div>

                  <div className="cc-detail-section-content">
                    <div className="cc-basic-grid">
                      <div className="cc-info-box">
                        <span>Name</span>
                        <strong>{getCollegeName(selected) || "—"}</strong>
                      </div>

                      <div className="cc-info-box">
                        <span>Location</span>
                        <strong>{getLocation(selected) || "—"}</strong>
                      </div>

                      <div className="cc-info-box">
                        <span>State</span>
                        <strong>{getState(selected) || "—"}</strong>
                      </div>

                      <div className="cc-info-box">
                        <span>District</span>
                        <strong>{getDistrict(selected) || "—"}</strong>
                      </div>

                      {getWebsite(selected) && (
                        <div className="cc-info-box">
                          <span>Official Website</span>
                          <strong>{getWebsite(selected)}</strong>
                        </div>
                      )}

                      {getContact(selected) && (
                        <div className="cc-info-box">
                          <span>Contact</span>
                          <strong>{getContact(selected)}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* institution type */}

                <section className="cc-detail-section">
                  <div className="cc-detail-section-title">
                    <Icon name="grid" size={19} />
                    <strong>Institution Type</strong>
                  </div>

                  <div className="cc-detail-section-content">
                    <div className="cc-type-grid">
                      <div className="cc-type-item">
                        <span>Category</span>
                        <strong>{getCollegeType(selected)}</strong>
                      </div>

                      {getAffiliation(selected) && (
                        <div className="cc-type-item">
                          <span>Affiliation</span>
                          <strong>{getAffiliation(selected)}</strong>
                        </div>
                      )}

                      {typeof selected.autonomous === "boolean" && (
                        <div className="cc-type-item">
                          <span>Autonomous</span>
                          <strong>
                            {selected.autonomous ? "Yes" : "No"}
                            {toText(selected.autonomyNote)
                              ? ` · ${toText(selected.autonomyNote)}`
                              : ""}
                          </strong>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* courses */}

                {selectedCourses.length > 0 && (
                  <section className="cc-detail-section">
                    <div className="cc-detail-section-title">
                      <Icon name="book" size={19} />
                      <strong>Courses</strong>
                    </div>

                    <div className="cc-detail-section-content">
                      <div className="cc-course-list">
                        {selectedCourses.map((course, index) => {
                          const courseName =
                            getCourseName(course) || "Engineering Course";

                          const degree = toText(course.degree) || "B.E / B.Tech";
                          const duration = toText(course.duration) || "4 Years";
                          const eligibility =
                            toText(course.eligibility) ||
                            toText(selected.eligibility) ||
                            "12th with PCM";

                          const entranceExam =
                            toText(course.entranceExam) ||
                            toText(course.entrance) ||
                            "TNEA";

                          const feeValue = course.fees;
                          const feeText =
                            (typeof feeValue === "number" ||
                            (feeValue !== "" &&
                              feeValue != null &&
                              !Number.isNaN(Number(feeValue)))
                              ? formatFee(feeValue)
                              : toText(feeValue)) ||
                            formatFee(getFee(selected)) ||
                            "Contact college";

                          return (
                            <div
                              className="cc-course-card"
                              key={`${courseName}-${index}`}
                            >
                              <div className="cc-course-header">
                                <h4>{courseName}</h4>
                                <span className="cc-course-degree">{degree}</span>
                              </div>

                              <div className="cc-course-grid">
                                <div className="cc-course-item">
                                  <span>Degree</span>
                                  <strong>{degree}</strong>
                                </div>

                                <div className="cc-course-item">
                                  <span>Duration</span>
                                  <strong>{duration}</strong>
                                </div>

                                <div className="cc-course-item">
                                  <span>Eligibility</span>
                                  <strong>{eligibility}</strong>
                                </div>

                                <div className="cc-course-item">
                                  <span>Entrance Exam</span>
                                  <strong>{entranceExam}</strong>
                                </div>

                                <div className="cc-course-item">
                                  <span>Fees</span>
                                  <strong>{feeText}</strong>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                )}

                {/* facilities */}

                <section className="cc-detail-section">
                  <div className="cc-detail-section-title">
                    <Icon name="building" size={19} />
                    <strong>Facilities</strong>
                  </div>

                  <div className="cc-detail-section-content">
                    <div className="cc-facility-grid">
                      {selectedFacilityList.map((facility) => (
                        <div className="cc-facility" key={facility}>
                          <div className="cc-facility-icon">
                            <Icon name="check" size={19} />
                          </div>
                          <strong>{facility}</strong>
                        </div>
                      ))}

                      {toText(selectedFacilities.hostel) && (
                        <div className="cc-facility">
                          <div className="cc-facility-icon">
                            <Icon name="building" size={19} />
                          </div>
                          <strong>Hostel</strong>
                          <p>{toText(selectedFacilities.hostel)}</p>
                        </div>
                      )}

                      {toText(selectedFacilities.placement) && (
                        <div className="cc-facility">
                          <div className="cc-facility-icon">
                            <Icon name="star" size={19} />
                          </div>
                          <strong>Placement</strong>
                          <p>{toText(selectedFacilities.placement)}</p>
                        </div>
                      )}

                      {toText(selectedFacilities.scholarship) && (
                        <div className="cc-facility">
                          <div className="cc-facility-icon">
                            <Icon name="check" size={19} />
                          </div>
                          <strong>Scholarship</strong>
                          <p>{toText(selectedFacilities.scholarship)}</p>
                        </div>
                      )}

                      {toText(selectedFacilities.transport) && (
                        <div className="cc-facility">
                          <div className="cc-facility-icon">
                            <Icon name="pin" size={19} />
                          </div>
                          <strong>Transport</strong>
                          <p>{toText(selectedFacilities.transport)}</p>
                        </div>
                      )}

                      {toText(selectedFacilities.infrastructure) && (
                        <div className="cc-facility">
                          <div className="cc-facility-icon">
                            <Icon name="grid" size={19} />
                          </div>
                          <strong>Infrastructure</strong>
                          <p>{toText(selectedFacilities.infrastructure)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {toText(selected.about) && (
                  <div className="cc-detail-about">
                    <h4>About</h4>
                    <p>{toText(selected.about)}</p>
                  </div>
                )}

                <div className="cc-modal-actions">
                  <button
                    type="button"
                    className="cc-btn cc-btn-ghost"
                    onClick={closeDetails}
                  >
                    Back to colleges
                  </button>

                  <button
                    type="button"
                    className="cc-btn cc-btn-primary cc-glow-btn"
                    onClick={() => openApply(selected)}
                  >
                    Apply Now
                  </button>

                  {getWebsite(selected) && (
                    <a
                      href={
                        getWebsite(selected).startsWith("http")
                          ? getWebsite(selected)
                          : `https://${getWebsite(selected)}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="cc-btn cc-btn-primary"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const USER_STYLE = `
.cc-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 6px;
}

.cc-user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #0f766e, #e08a1e);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  overflow: hidden;
  flex: 0 0 auto;
}

.cc-user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cc-user-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-h, #08060d);
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cc-user-signout {
  margin-left: 2px;
}

.cc-mobile .cc-user {
  gap: 12px;
  margin-bottom: 4px;
}

.cc-mobile .cc-user-name {
  flex: 1;
  font-size: 15px;
}

.cc-menu-apply {
  margin-left: 8px;
}

.cc-menu a.cc-menu-active,
.cc-mobile a.cc-menu-active {
  color: var(--brand);
}

.cc-menu a.cc-menu-active {
  background: var(--blue-25);
}

.cc-profile-menu {
  position: relative;
}

.cc-profile-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
  border: 0;
  background: none;
  font: inherit;
  cursor: pointer;
}

.cc-nav-name {
  font-size: .95rem;
  font-weight: 700;
  color: var(--navy);
  max-width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cc-profile-trigger .cc-user-avatar {
  width: 38px;
  height: 38px;
  font-size: 15px;
}

.cc-profile-trigger:hover .cc-user-avatar,
.cc-profile-trigger[aria-expanded="true"] .cc-user-avatar {
  box-shadow: 0 0 0 4px rgba(124,58,237,.18);
}

.cc-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 80;
  min-width: 170px;
  padding: 6px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow-md);
}

.cc-dropdown-item {
  display: block;
  width: 100%;
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  background: none;
  font: inherit;
  font-size: .92rem;
  font-weight: 600;
  text-align: left;
  color: var(--navy);
  cursor: pointer;
}

.cc-dropdown-item:hover {
  background: var(--blue-25);
  color: var(--brand);
}

.cc-dropdown-danger:hover {
  background: #FEF2F2;
  color: #B91C1C;
}

@media (max-width: 680px) {
  .cc-nav-name {
    display: none;
  }
}

.cc-apply-hint {
  font-size: .78rem;
  color: var(--muted);
  padding-left: 6px;
}

.cc-modal-apply-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 18px;
}

.cc-apply-locked {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 18px;
  border-radius: var(--radius);
  background: var(--blue-25);
  border: 1px solid #d5e6fb;
}

.cc-apply-locked > div {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cc-apply-locked strong {
  color: var(--navy);
  font-size: 1.02rem;
}

.cc-apply-locked span {
  font-size: .85rem;
  color: var(--muted);
}

.cc-apply-locked .cc-apply-locked-label {
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--brand);
}

.cc-apply-link {
  flex: 0 0 auto;
  border: 0;
  background: none;
  color: var(--brand);
  font: inherit;
  font-size: .86rem;
  font-weight: 700;
  cursor: pointer;
}

.cc-apply-link:hover {
  text-decoration: underline;
}

.cc-apply-subjects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px 18px;
}

.cc-mobile .cc-apply-mobile {
  margin: 12px 0 4px;
}

.cc-apply-modal {
  width: min(680px, 100%);
}

.cc-apply-form {
  padding: 34px 34px 30px;
}

.cc-apply-form h2 {
  margin-top: 12px;
  font-size: 1.6rem;
}

.cc-apply-sub {
  margin: 6px 0 22px;
}

.cc-apply-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 18px;
}

.cc-apply-full {
  grid-column: 1 / -1;
}

.cc-apply-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.cc-apply-field label {
  font-size: .86rem;
  font-weight: 700;
  color: var(--navy);
}

.cc-apply-field label span {
  color: #DC2626;
}

.cc-apply-control {
  width: 100%;
  height: 48px;
  padding: 0 18px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: #fff;
  font: inherit;
  font-size: .92rem;
  color: var(--navy);
}

.cc-apply-control:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(36,120,252,.14);
}

.cc-apply-control:disabled {
  background: #F8FAFC;
  color: var(--muted);
  cursor: not-allowed;
}

.cc-apply-field.has-error .cc-apply-control {
  border-color: #DC2626;
}

.cc-apply-field.has-error .cc-apply-control:focus {
  box-shadow: 0 0 0 4px rgba(220,38,38,.14);
}

.cc-apply-error {
  font-size: .8rem;
  color: #DC2626;
  padding-left: 6px;
}

.cc-apply-alert {
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 14px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #B91C1C;
  font-size: .9rem;
}

.cc-apply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 26px;
}

.cc-apply-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 54px 34px 40px;
}

.cc-apply-success h2 {
  margin: 18px 0 8px;
}

.cc-apply-success-icon {
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #E6F6F0;
  color: var(--success);
}

.cc-apps {
  background: var(--blue-25);
}

.cc-apps h2 {
  margin-top: 12px;
}

.cc-apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 28px;
}

.cc-app-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 22px;
}

.cc-app-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.cc-app-head h3 {
  font-size: 1.02rem;
}

.cc-app-head p {
  font-size: .85rem;
}

.cc-app-status {
  flex: 0 0 auto;
  padding: 4px 12px;
  border-radius: 999px;
  background: #E6F6F0;
  color: var(--success);
  font-size: .76rem;
  font-weight: 700;
}

.cc-app-course {
  margin: 14px 0;
  padding: 8px 14px;
  border-radius: 12px;
  background: var(--blue-50);
  color: var(--deep);
  font-size: .9rem;
  font-weight: 700;
}

.cc-app-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;
  margin: 0;
}

.cc-app-facts dt {
  font-size: .74rem;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--muted);
}

.cc-app-facts dd {
  margin: 0;
  font-size: .92rem;
  font-weight: 600;
  color: var(--navy);
  overflow-wrap: anywhere;
}

@media (max-width: 680px) {
  .cc-apply-form {
    padding: 28px 20px 22px;
  }

  .cc-apply-grid {
    grid-template-columns: 1fr;
  }

  .cc-apply-actions {
    flex-direction: column-reverse;
  }

  .cc-apply-actions .cc-btn {
    width: 100%;
  }

  .cc-apps-grid {
    grid-template-columns: 1fr;
  }
}
/* ===== Apply Now animations ===== */

@keyframes ccGradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes ccTextShift {
  to { background-position: 200% center; }
}

@keyframes ccSheen {
  0% { transform: translateX(-130%) skewX(-20deg); }
  55%, 100% { transform: translateX(260%) skewX(-20deg); }
}

@keyframes ccGlowPulse {
  0%, 100% { box-shadow: 0 6px 18px rgba(124,58,237,.38); }
  50% { box-shadow: 0 8px 28px rgba(236,72,153,.55); }
}

@keyframes ccBackdropIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes ccModalIn {
  from { opacity: 0; transform: translateY(34px) scale(.93); }
  to { opacity: 1; transform: none; }
}

@keyframes ccFieldIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}

@keyframes ccShake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(3px); }
  30%, 50%, 70% { transform: translateX(-6px); }
  40%, 60% { transform: translateX(6px); }
}

@keyframes ccDot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: .6; }
}

@keyframes ccPop {
  0% { transform: scale(0) rotate(-40deg); }
  60% { transform: scale(1.2) rotate(8deg); }
  100% { transform: scale(1) rotate(0); }
}

@keyframes ccRing {
  0% { box-shadow: 0 0 0 0 rgba(16,185,129,.55); }
  100% { box-shadow: 0 0 0 30px rgba(16,185,129,0); }
}

@keyframes ccConfetti {
  0% { opacity: 1; transform: translate(0, 0) rotate(0) scale(1); }
  100% { opacity: 0; transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(.6); }
}

@keyframes ccCardIn {
  from { opacity: 0; transform: translateY(26px) scale(.96); }
  to { opacity: 1; transform: none; }
}

@keyframes ccBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: .35; }
}

/* colourful animated buttons */
.cc-btn.cc-glow-btn {
  position: relative;
  overflow: hidden;
  border-color: transparent;
  color: #fff;
  background: linear-gradient(120deg, #0f766e, #142033, #e08a1e, #0f766e);
  background-size: 300% 100%;
  animation: ccGradientShift 6s ease infinite, ccGlowPulse 2.6s ease-in-out infinite;
}

.cc-btn.cc-glow-btn::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 40%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent);
  animation: ccSheen 3.2s ease-in-out infinite;
  pointer-events: none;
}

.cc-btn.cc-glow-btn:hover {
  transform: translateY(-2px) scale(1.04);
  filter: saturate(1.2);
}

.cc-btn.cc-glow-btn:active {
  transform: scale(.97);
}

.cc-btn:disabled {
  opacity: .6;
  cursor: not-allowed;
}

/* modal */
.cc-apply-backdrop {
  backdrop-filter: blur(5px);
  background: radial-gradient(circle at 20% 15%, rgba(124,58,237,.45), transparent 55%),
              radial-gradient(circle at 85% 85%, rgba(236,72,153,.4), transparent 55%),
              rgba(6,31,58,.7);
  animation: ccBackdropIn .3s ease both;
}

.cc-apply-modal {
  animation: ccModalIn .5s cubic-bezier(.2,.9,.3,1.2) both;
}

.cc-apply-modal::before {
  content: "";
  display: block;
  position: sticky;
  top: 0;
  z-index: 3;
  height: 6px;
  margin-bottom: -6px;
  background: linear-gradient(90deg, #2478FC, #7C3AED, #EC4899, #F59E0B, #10B981, #2478FC);
  background-size: 300% 100%;
  animation: ccGradientShift 5s linear infinite;
}

.cc-apply-form h2,
.cc-apply-success h2,
.cc-apps h2,
.cc-profile-card h2 {
  background: linear-gradient(90deg, #2478FC, #7C3AED, #EC4899, #F59E0B, #2478FC);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: ccTextShift 5s linear infinite;
}

/* staggered fields with a different accent colour each */
.cc-apply-grid > * {
  --accent: #2478FC;
  animation: ccFieldIn .55s cubic-bezier(.2,.8,.3,1) both;
}

.cc-apply-grid > :nth-child(5n + 2) { --accent: #7C3AED; }
.cc-apply-grid > :nth-child(5n + 3) { --accent: #EC4899; }
.cc-apply-grid > :nth-child(5n + 4) { --accent: #F59E0B; }
.cc-apply-grid > :nth-child(5n + 5) { --accent: #10B981; }

.cc-apply-grid > :nth-child(1) { animation-delay: .05s; }
.cc-apply-grid > :nth-child(2) { animation-delay: .10s; }
.cc-apply-grid > :nth-child(3) { animation-delay: .15s; }
.cc-apply-grid > :nth-child(4) { animation-delay: .20s; }
.cc-apply-grid > :nth-child(5) { animation-delay: .25s; }
.cc-apply-grid > :nth-child(6) { animation-delay: .30s; }
.cc-apply-grid > :nth-child(7) { animation-delay: .35s; }
.cc-apply-grid > :nth-child(n + 8) { animation-delay: .40s; }

.cc-apply-field label::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--accent, #2478FC);
  animation: ccDot 2.2s ease-in-out infinite;
}

.cc-apply-control {
  transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease;
}

.cc-apply-control:hover:not(:disabled) {
  border-color: var(--accent, #2478FC);
}

.cc-apply-field .cc-apply-control:focus {
  border-color: var(--accent, #2478FC);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent, #2478FC) 24%, transparent);
  transform: translateY(-1px);
}

.cc-apply-field.has-error .cc-apply-control {
  animation: ccShake .5s ease both;
}

.cc-apply-error {
  animation: ccFieldIn .3s ease both;
}

/* college chosen from a college page */
.cc-apply-locked {
  border: 2px solid transparent;
  background:
    linear-gradient(var(--blue-25), var(--blue-25)) padding-box,
    linear-gradient(120deg, #2478FC, #7C3AED, #EC4899, #F59E0B, #2478FC) border-box;
  background-size: 100% 100%, 300% 100%;
  animation: ccFieldIn .55s cubic-bezier(.2,.8,.3,1) both, ccGradientShift 6s linear infinite;
}

/* success */
.cc-apply-success {
  position: relative;
  overflow: hidden;
}

.cc-apply-success-icon {
  background: linear-gradient(135deg, #10B981, #2478FC);
  color: #fff;
  animation: ccPop .7s cubic-bezier(.2,.9,.3,1.3) both, ccRing 1.6s ease-out .4s 2;
}

.cc-apply-success p {
  animation: ccFieldIn .6s ease .35s both;
}

.cc-apply-success .cc-apply-actions {
  animation: ccFieldIn .6s ease .55s both;
}

.cc-confetti {
  position: absolute;
  top: 88px;
  left: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
}

.cc-confetti i {
  position: absolute;
  width: 9px;
  height: 14px;
  border-radius: 2px;
  background: var(--c);
  opacity: 0;
  animation: ccConfetti 1.4s cubic-bezier(.15,.7,.3,1) forwards;
}

.cc-confetti i:nth-child(even) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* my applications */
.cc-app-card {
  position: relative;
  overflow: hidden;
  animation: ccCardIn .6s cubic-bezier(.2,.8,.3,1) both;
  transition: transform .3s ease, box-shadow .3s ease;
}

.cc-app-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #2478FC, #7C3AED, #EC4899, #F59E0B, #10B981, #2478FC);
  background-size: 300% 100%;
  animation: ccGradientShift 5s linear infinite;
}

.cc-app-card:nth-child(1) { animation-delay: .05s; }
.cc-app-card:nth-child(2) { animation-delay: .15s; }
.cc-app-card:nth-child(3) { animation-delay: .25s; }
.cc-app-card:nth-child(4) { animation-delay: .35s; }
.cc-app-card:nth-child(n + 5) { animation-delay: .45s; }

.cc-app-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(124,58,237,.22);
}

.cc-app-course {
  background: linear-gradient(90deg, #E0EDFF, #F3E8FF, #FCE7F3, #E0EDFF);
  background-size: 300% 100%;
  animation: ccGradientShift 8s ease infinite;
}

.cc-app-status::before {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 6px;
  border-radius: 50%;
  background: #10B981;
  animation: ccBlink 1.6s ease-in-out infinite;
}

/* ===== Profile + Courses pages ===== */

.cc-profile-card {
  max-width: 760px;
  margin: 0 auto;
  padding: 34px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.cc-profile-card h2 {
  margin-top: 12px;
  font-size: 1.6rem;
}

.cc-profile-title {
  font-size: .82rem !important;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--brand) !important;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}

.cc-profile-success {
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 14px;
  background: #E6F6F0;
  border: 1px solid #A7E3CC;
  color: var(--success);
  font-weight: 700;
  font-size: .9rem;
}

.cc-profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 18px;
  margin: 22px 0 0;
}

.cc-profile-grid dt {
  font-size: .74rem;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--muted);
}

.cc-profile-grid dd {
  margin: 2px 0 0;
  font-weight: 600;
  color: var(--navy);
  overflow-wrap: anywhere;
}

.cc-course-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.cc-course-tile {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  transition: .2s ease;
}

.cc-course-tile:hover {
  transform: translateY(-3px);
  border-color: #cfe2fb;
}

.cc-course-tile strong {
  color: var(--navy);
  font-size: .92rem;
  line-height: 1.35;
}

.cc-course-tile .cc-icon-circle {
  flex: 0 0 auto;
}

@media (max-width: 680px) {
  .cc-profile-card {
    padding: 26px 18px;
  }

  .cc-profile-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cc-btn.cc-glow-btn,
  .cc-btn.cc-glow-btn::after,
  .cc-apply-backdrop,
  .cc-apply-modal,
  .cc-apply-modal::before,
  .cc-apply-modal *,
  .cc-apply-modal *::before,
  .cc-confetti i,
  .cc-app-card,
  .cc-app-card *,
  .cc-app-card::before,
  .cc-apps h2 {
    animation: none !important;
    transition: none !important;
  }

  .cc-confetti {
    display: none;
  }
}

`;

/* =========================================================
   CATEGORY VISUAL IDENTITY (course page + college listing)
   One icon, colour pair and tagline per category.
========================================================= */

const CAT_THEME = {
  engineering: { c1: "#4f46e5", c2: "#8b5cf6", tag: "Design, build & innovate" },
  arts: { c1: "#c026d3", c2: "#f472b6", tag: "Think, create & lead" },
  medical: { c1: "#e11d48", c2: "#fb7185", tag: "Heal with science" },
  nursing: { c1: "#2563eb", c2: "#60a5fa", tag: "Care that counts" },
  allied: { c1: "#0891b2", c2: "#22d3ee", tag: "Diagnose & support" },
  physiotherapy: { c1: "#0d9488", c2: "#5eead4", tag: "Restore movement" },
  pharmacy: { c1: "#059669", c2: "#34d399", tag: "The science of medicine" },
  law: { c1: "#d97706", c2: "#fbbf24", tag: "Argue, advise, advocate" },
  agriculture: { c1: "#65a30d", c2: "#bef264", tag: "Grow what feeds the world" },
  veterinary: { c1: "#ea580c", c2: "#fdba74", tag: "Healing for every creature" },
  homeopathy: { c1: "#7c3aed", c2: "#c4b5fd", tag: "Gentle, holistic care" },
  dental: { c1: "#0369a1", c2: "#38bdf8", tag: "Smiles by design" },
  default: { c1: "#2563eb", c2: "#14b8a6", tag: "Explore programmes" },
};

const CAT_ALIASES = {
  artsandscience: "arts",
  artsscience: "arts",
  alliedhealth: "allied",
  alliedhealthsciences: "allied",
  healthcaremedicalsciences: "medical",
  healthandmedicalscience: "medical",
  veterinaryscience: "veterinary",
  homoeopathy: "homeopathy",
  dentalscience: "dental",
};

const catKey = (name) => {
  const k = String(name || "").toLowerCase().replace(/[^a-z]/g, "");
  const key = CAT_ALIASES[k] || k;
  return CAT_THEME[key] ? key : "default";
};

const themeVars = (name) => {
  const t = CAT_THEME[catKey(name)];
  return { "--c1": t.c1, "--c2": t.c2 };
};

const CAT_ICON_SHAPES = {
  engineering: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </>
  ),
  arts: (
    <>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.4-1-.3-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-4.9-4.5-9-10-9z" />
      <circle cx="13.5" cy="6.5" r="1" />
      <circle cx="17.5" cy="10.5" r="1" />
      <circle cx="8.5" cy="7.5" r="1" />
      <circle cx="6.5" cy="12.5" r="1" />
    </>
  ),
  medical: (
    <>
      <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
      <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </>
  ),
  nursing: (
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0016.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
  ),
  allied: (
    <>
      <path d="M10 2v7.5L4.5 19a2 2 0 001.7 3h11.6a2 2 0 001.7-3L14 9.5V2" />
      <path d="M8.5 2h7M7 16h10" />
    </>
  ),
  physiotherapy: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  pharmacy: (
    <>
      <path d="M10.5 20.5l10-10a4.95 4.95 0 10-7-7l-10 10a4.95 4.95 0 107 7z" />
      <path d="M8.5 8.5l7 7" />
    </>
  ),
  law: (
    <>
      <path d="M16 16l3-8 3 8c-.9.7-1.9 1-3 1s-2.1-.3-3-1zM2 16l3-8 3 8c-.9.7-1.9 1-3 1s-2.1-.3-3-1z" />
      <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </>
  ),
  agriculture: (
    <>
      <path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </>
  ),
  veterinary: (
    <>
      <circle cx="5" cy="11" r="1.8" />
      <circle cx="9" cy="6" r="1.8" />
      <circle cx="15" cy="6" r="1.8" />
      <circle cx="19" cy="11" r="1.8" />
      <path d="M12 12c-3 0-6 3.5-6 6 0 1.8 1.6 2.5 3 2.5 1.2 0 2-.5 3-.5s1.8.5 3 .5c1.4 0 3-.7 3-2.5 0-2.5-3-6-6-6z" />
    </>
  ),
  homeopathy: (
    <>
      <path d="M12 2.7l5.7 5.7a8 8 0 11-11.4 0z" />
      <path d="M12 18a4 4 0 004-4" />
    </>
  ),
  dental: (
    <path d="M12 5.5C10.5 4 8.8 3.5 7.5 3.5 5 3.5 3.5 5.5 3.5 8c0 2 .8 3.5 1.5 5.2.7 1.8.8 4.8 1.6 7 .4 1 1.7 1 2.2 0 .7-1.7 1-4.2 1.5-5.2.5-1 1-1 1.7-1s1.2 0 1.7 1c.5 1 .8 3.5 1.5 5.2.5 1 1.8 1 2.2 0 .8-2.2.9-5.2 1.6-7 .7-1.7 1.5-3.2 1.5-5.2 0-2.5-1.5-4.5-4-4.5-1.3 0-3 .5-4.5 2z" />
  ),
  default: <path d="M2 9l10-5 10 5-10 5L2 9zm4 3v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />,
};

function CatIcon({ name, size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {CAT_ICON_SHAPES[catKey(name)]}
    </svg>
  );
}

function ClockIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* subtle 3D tilt that follows the mouse (ignored on touch screens) */
const tiltMove = (event) => {
  if (event.pointerType && event.pointerType !== "mouse") return;
  const el = event.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (event.clientX - r.left) / r.width;
  const py = (event.clientY - r.top) / r.height;
  el.style.setProperty("--rx", `${((0.5 - py) * 7).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${((px - 0.5) * 9).toFixed(2)}deg`);
  el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
  el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
};

const tiltLeave = (event) => {
  const el = event.currentTarget;
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
};

/* course-catalogue id -> college `category` value used on the college records */
const CATALOG_TO_COLLEGE = {
  engineering: "Engineering",
  arts: "Arts",
  physiotherapy: "Physiotherapy",
  allied: "Allied",
  pharmacy: "Pharmacy",
  law: "Law",
  agriculture: "Agriculture",
  medical: "Medical",
  veterinary: "Veterinary",
  homeopathy: "Homeopathy",
  dental: "Dental",
};

/* course-catalogue id -> tab (and Healthcare sub-tab) on the college page */
const BROWSE_TARGET = {
  engineering: { cat: "Engineering" },
  arts: { cat: "Arts" },
  law: { cat: "Law" },
  agriculture: { cat: "Agriculture" },
  veterinary: { cat: "Veterinary" },
  homeopathy: { cat: "Homeopathy" },
  dental: { cat: "Dental" },
  medical: { cat: "Healthcare & Medical Sciences", sub: "Medical" },
  physiotherapy: { cat: "Healthcare & Medical Sciences", sub: "Physiotherapy" },
  allied: { cat: "Healthcare & Medical Sciences", sub: "Allied Health" },
  pharmacy: { cat: "Healthcare & Medical Sciences", sub: "Pharmacy" },
};

const shortCourse = (name) => (String(name).match(/\(([^)]{2,14})\)\s*$/) || [])[1] || name;

const CATEGORY_META = {
  engineering: { emoji: "⚙️", grad: "linear-gradient(135deg,#dbeafe,#ede9fe)", accent: "#4f46e5", duration: "4 Years", eligibility: "12th with Physics, Chemistry & Maths", desc: "Build technical expertise through labs, projects and industry internships." },
  arts: { emoji: "🎨", grad: "linear-gradient(135deg,#fce7f3,#ede9fe)", accent: "#c026d3", duration: "3 Years", eligibility: "12th pass in any relevant group", desc: "Strong academic foundation with flexible, career-focused electives." },
  physiotherapy: { emoji: "💪", grad: "linear-gradient(135deg,#ccfbf1,#dbeafe)", accent: "#0d9488", duration: "4.5 Years", eligibility: "12th with Physics, Chemistry & Biology", desc: "Learn rehabilitation, movement science and hands-on patient care." },
  allied: { emoji: "🧪", grad: "linear-gradient(135deg,#cffafe,#e0e7ff)", accent: "#0891b2", duration: "3–4 Years", eligibility: "12th with Physics, Chemistry & Biology", desc: "Support healthcare teams with diagnostic and technical skills." },
  pharmacy: { emoji: "💊", grad: "linear-gradient(135deg,#dcfce7,#ccfbf1)", accent: "#059669", duration: "4 Years", eligibility: "12th with Physics, Chemistry & Biology/Maths", desc: "Study drug science, formulation, pharmacology and clinical practice." },
  law: { emoji: "⚖️", grad: "linear-gradient(135deg,#fef3c7,#fce7f3)", accent: "#d97706", duration: "3–5 Years", eligibility: "12th pass (any group) / degree for LLB", desc: "Develop legal reasoning, advocacy and research skills." },
  agriculture: { emoji: "🌾", grad: "linear-gradient(135deg,#ecfccb,#ccfbf1)", accent: "#65a30d", duration: "4 Years", eligibility: "12th with Biology or Maths", desc: "Modern farming science, crop management and agri-business." },
  medical: { emoji: "🩺", grad: "linear-gradient(135deg,#fee2e2,#ede9fe)", accent: "#e11d48", duration: "4–5.5 Years", eligibility: "12th with PCB and NEET-UG qualification", desc: "Clinical training and patient care in recognised medical streams." },
  veterinary: { emoji: "🐾", grad: "linear-gradient(135deg,#ffedd5,#fef3c7)", accent: "#ea580c", duration: "4–5.5 Years", eligibility: "12th with Physics, Chemistry & Biology", desc: "Animal healthcare, livestock science and veterinary clinical practice." },
  homeopathy: { emoji: "🌿", grad: "linear-gradient(135deg,#ede9fe,#dcfce7)", accent: "#7c3aed", duration: "5.5 Years", eligibility: "12th PCB with NEET-UG", desc: "Holistic medicine, materia medica and patient-centred homoeopathic practice." },
  dental: { emoji: "🦷", grad: "linear-gradient(135deg,#e0f2fe,#ede9fe)", accent: "#0369a1", duration: "5 Years", eligibility: "12th PCB with NEET-UG", desc: "Oral healthcare, dental surgery and clinical dentistry training." },
};

const courseMeta = (catId, name) => {
  const base = CATEGORY_META[catId] || CATEGORY_META.engineering;
  let { duration, eligibility } = base;
  if (/^M\.?Pharm|^MPT|^Master of|^LLM/i.test(name)) {
    duration = /^LLM/i.test(name) ? "1–2 Years" : "2 Years";
    eligibility = "Relevant bachelor's degree";
  } else if (/^Diploma|D\.Pharm/i.test(name)) {
    duration = "2 Years";
    eligibility = "12th with Physics, Chemistry & Biology/Maths";
  } else if (/Pharm\.D/i.test(name)) duration = "6 Years";
  else if (/^(BA|B\.Com|B\.Sc) LLB|BBA LLB/i.test(name)) { duration = "5 Years"; eligibility = "12th pass (any group)"; }
  else if (/^LLB$/i.test(name)) { duration = "3 Years"; eligibility = "Any bachelor's degree"; }
  else if (/^MDS\b/i.test(name)) { duration = "3 Years"; eligibility = "BDS degree"; }
  else if (/^MD\b/i.test(name)) { duration = "3 Years"; eligibility = "BHMS degree"; }
  else if (/^M\.?V\.?Sc/i.test(name)) { duration = "2 Years"; eligibility = "B.V.Sc & A.H. degree"; }
  else if (/^B\.?V\.?Sc/i.test(name)) { duration = "5.5 Years"; eligibility = "12th with Physics, Chemistry & Biology"; }
  else if (catId === "veterinary" && /^B\.?Tech/i.test(name)) duration = "4 Years";
  else if (/^(MBBS)/i.test(name)) { duration = "5.5 Years"; eligibility = "12th PCB with NEET-UG"; }
  else if (/^(BDS)/i.test(name)) { duration = "5 Years"; eligibility = "12th PCB with NEET-UG"; }
  else if (/^B(AMS|HMS|SMS|UMS)/i.test(name)) { duration = "5.5 Years"; eligibility = "12th PCB with NEET-UG"; }
  else if (/Nursing/i.test(name)) { duration = "4 Years"; eligibility = "12th with Physics, Chemistry & Biology"; }
  else if (/^(BPT|Bachelor of Physio)/i.test(name)) duration = "4.5 Years";
  else if (catId === "arts") {
    if (/^B\.Sc|^BCA|^BBA|^B\.Com|^BA|^BSW/i.test(name)) duration = "3 Years";
    if (/Computer|Information Tech|BCA|Statistics|Mathematics|Physics|Chemistry/i.test(name)) eligibility = "12th with Maths / Science group";
    else if (/^B\.Com|BBA|Economics/i.test(name)) eligibility = "12th pass (Commerce preferred)";
  }
  return { ...base, duration, eligibility };
};

function CoursesView({ catalog, counts = {}, onBrowse }) {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog
      .filter((c) => cat === "all" || c.id === cat)
      .flatMap((c) => c.courses.map((name) => ({ catId: c.id, catLabel: c.label, name })))
      .filter((item) => !q || `${item.name} ${item.catLabel}`.toLowerCase().includes(q));
  }, [catalog, cat, query]);

  const total = catalog.reduce((n, c) => n + c.courses.length, 0);
  const collegeTotal = catalog.reduce(
    (n, c) => n + (counts[CATALOG_TO_COLLEGE[c.id]] || 0),
    0,
  );
  const active = catalog.find((c) => c.id === cat);
  const activeColleges = active ? counts[CATALOG_TO_COLLEGE[active.id]] || 0 : 0;

  // scroll-reveal: cards fade/slide in as they enter the viewport
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const nodes = Array.from(root.querySelectorAll("[data-reveal]:not(.is-in)"));
    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [items, catalog]);

  const pickCategory = (id) => {
    setCat((prev) => (prev === id ? "all" : id));
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <section className="cc-section cc-courses-page cc-cx2" id="courses" ref={rootRef}>
      <div className="cc-fx-bg" aria-hidden="true">
        <span className="cc-fx-blob b1" />
        <span className="cc-fx-blob b2" />
        <span className="cc-fx-blob b3" />
      </div>

      <div className="cc-wrap">
        <header className="cc-fx-hero" data-reveal>
          <div className="cc-fx-float" aria-hidden="true">
            {["engineering", "medical", "law", "agriculture", "dental", "veterinary", "arts", "pharmacy"].map(
              (k, i) => (
                <span key={k} style={{ "--i": i }}>
                  <CatIcon name={k} size={26} />
                </span>
              ),
            )}
          </div>

          <span className="cc-fx-eyebrow">
            <Icon name="sparkle" size={14} /> Course Catalogue
          </span>
          <h2>
            Find the course that <em>fits your future</em>
          </h2>
          <p>
            Explore {total}+ programmes across {catalog.length} fields. This is a general guide —
            check each college for the courses it actually offers.
          </p>

          <label className="cc-fx-search">
            <Icon name="search" size={18} />
            <input
              type="search"
              placeholder="Search courses (e.g. CSE, B.Pharm, BDS, LLB)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search courses"
            />
            {query && (
              <button type="button" className="cc-fx-clear" onClick={() => setQuery("")} aria-label="Clear search">
                <Icon name="close" size={14} />
              </button>
            )}
          </label>

          <ul className="cc-fx-stats">
            <li><strong>{catalog.length}</strong><span>Fields</span></li>
            <li><strong>{total}+</strong><span>Courses</span></li>
            <li><strong>{collegeTotal || "—"}</strong><span>Colleges</span></li>
          </ul>
        </header>

        <div className="cc-fx-sechead" data-reveal>
          <h3>Explore by field</h3>
          <p>Pick a field to filter the courses below, or jump straight to its colleges.</p>
        </div>

        <div className="cc-fx-showcase">
          {catalog.map((c, i) => {
            const t = CAT_THEME[catKey(c.id)];
            const n = counts[CATALOG_TO_COLLEGE[c.id]] ?? 0;
            return (
              <article
                key={c.id}
                className={`cc-fx-card ${cat === c.id ? "is-active" : ""} ${i === 0 ? "is-wide" : ""}`}
                data-reveal
                style={{ ...themeVars(c.id), "--i": i }}
                onPointerMove={tiltMove}
                onPointerLeave={tiltLeave}
              >
                <span className="cc-fx-ring" aria-hidden="true" />
                <span className="cc-fx-glow" aria-hidden="true" />
                <span className="cc-fx-bgicon" aria-hidden="true">
                  <CatIcon name={c.id} size={130} />
                </span>

                <button type="button" className="cc-fx-pick" aria-pressed={cat === c.id} onClick={() => pickCategory(c.id)}>
                  <span className="cc-fx-orb"><CatIcon name={c.id} size={26} /></span>
                  <span className="cc-fx-name">{c.label}</span>
                  <span className="cc-fx-tagline">{t.tag}</span>
                  <span className="cc-fx-counts">
                    <b>{c.courses.length}</b> courses <i aria-hidden="true" /> <b>{n}</b> colleges
                  </span>
                  <span className="cc-fx-tags">
                    {c.courses.slice(0, i === 0 ? 8 : 3).map((name) => (
                      <em key={name}>{shortCourse(name)}</em>
                    ))}
                  </span>
                </button>

                <button type="button" className="cc-fx-go" onClick={() => onBrowse && onBrowse(c.id)}>
                  Explore colleges <Icon name="arrow" size={15} />
                </button>
              </article>
            );
          })}
        </div>

        <div className="cc-fx-listhead" ref={listRef}>
          <div>
            <span className="cc-fx-kicker" style={active ? themeVars(active.id) : undefined}>
              {active ? active.label : "All fields"}
            </span>
            <h3>
              {items.length} course{items.length === 1 ? "" : "s"}
              {query.trim() ? ` matching “${query.trim()}”` : ""}
            </h3>
          </div>
          <div className="cc-fx-actions">
            {cat !== "all" && (
              <button type="button" className="cc-fx-chip" onClick={() => setCat("all")}>
                Show all fields
              </button>
            )}
            {active && (
              <button type="button" className="cc-fx-cta" style={themeVars(active.id)} onClick={() => onBrowse && onBrowse(active.id)}>
                Browse {activeColleges} college{activeColleges === 1 ? "" : "s"} <Icon name="arrow" size={15} />
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cc-state">
            <span className="cc-fx-empty-ico"><Icon name="search" size={28} /></span>
            <strong>No courses match your search</strong>
            <button type="button" className="cc-link-btn" onClick={() => { setQuery(""); setCat("all"); }}>
              Clear search
            </button>
          </div>
        ) : (
          <div className="cc-fx-courses">
            {items.map((item, i) => {
              const m = courseMeta(item.catId, item.name);
              return (
                <article
                  key={`${item.catId}-${item.name}`}
                  className="cc-fx-course"
                  data-reveal
                  style={{ ...themeVars(item.catId), "--i": i % 9 }}
                  onPointerMove={tiltMove}
                  onPointerLeave={tiltLeave}
                >
                  <span className="cc-fx-cbar" aria-hidden="true" />
                  <div className="cc-fx-ctop">
                    <span className="cc-fx-corb"><CatIcon name={item.catId} size={20} /></span>
                    <span className="cc-fx-cchip">{item.catLabel}</span>
                  </div>
                  <h4>{item.name}</h4>
                  <p>{m.desc}</p>
                  <dl>
                    <div>
                      <dt><ClockIcon /> Duration</dt>
                      <dd>{m.duration}</dd>
                    </div>
                    <div>
                      <dt><Icon name="cap" size={15} /> Eligibility</dt>
                      <dd>{m.eligibility}</dd>
                    </div>
                  </dl>
                  <button type="button" className="cc-fx-clink" onClick={() => onBrowse && onBrowse(item.catId)}>
                    Find colleges <Icon name="arrow" size={14} />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function MyApplicationsView({ applications, onApply, onBrowse }) {
  const [filter, setFilter] = useState("All");

  const list = applications.map((app) => ({ ...app, status: normalizeStatus(app.status) }));
  const counts = list.reduce(
    (acc, app) => ({ ...acc, [app.status]: (acc[app.status] || 0) + 1 }),
    {},
  );
  const shown = filter === "All" ? list : list.filter((app) => app.status === filter);

  if (list.length === 0) {
    return (
      <section className="cc-section cc-apps-page">
        <div className="cc-wrap">
          <div className="cc-empty">
            <div className="cc-empty-art" aria-hidden="true">📄✨</div>
            <h2>No applications yet</h2>
            <p>You haven't applied to any college. Start your journey by applying to your dream course.</p>
            <div className="cc-apply-actions" style={{ justifyContent: "center" }}>
              <button type="button" className="cc-btn cc-btn-ghost" onClick={onBrowse}>
                Browse colleges
              </button>
              <button type="button" className="cc-btn cc-btn-primary cc-glow-btn" onClick={onApply}>
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cc-section cc-apps-page">
      <div className="cc-wrap">
        <div className="cc-page-hero">
          <span className="cc-eyebrow">My Applications</span>
          <h2>Track your applications</h2>
          <p>All applications you have submitted, in one place.</p>
        </div>

        <div className="cc-categories">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              type="button"
              className={`cc-cat-btn ${filter === status ? "cc-cat-active" : ""}`}
              onClick={() => setFilter(status)}
            >
              {status}
              <span className="cc-cat-count">
                {status === "All" ? list.length : counts[status] || 0}
              </span>
            </button>
          ))}
          <button
            type="button"
            className="cc-btn cc-btn-primary cc-btn-sm cc-glow-btn"
            style={{ marginLeft: "auto" }}
            onClick={onApply}
          >
            + New application
          </button>
        </div>

        {shown.length === 0 ? (
          <div className="cc-state">
            <strong>No {filter.toLowerCase()} applications</strong>
          </div>
        ) : (
          <div className="cc-myapps">
            {shown.map((app, index) => {
              const status = STATUS_STYLE[app.status];
              return (
                <article
                  className="cc-myapp"
                  key={app.id}
                  style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
                >
                  <div className="cc-myapp-main">
                    <h3>{app.collegeName}</h3>
                    <p>{[app.city, app.categoryLabel].filter(Boolean).join(" · ")}</p>
                    <div className="cc-myapp-course">🎓 {app.courseName}</div>
                  </div>
                  <div className="cc-myapp-side">
                    <span className={`cc-badge cc-badge-${status.cls}`}>
                      {status.icon} {app.status}
                    </span>
                    <small>Applied on {formatAppDate(app.appliedOn)}</small>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   COURSE + COLLEGE REDESIGN
   Premium navy / lavender / teal. Scoped to the course page,
   the college page and the college-details modal only.
========================================================= */

const REDESIGN_STYLE = `
@property --ang { syntax:"<angle>"; initial-value:0deg; inherits:false; }

.cc-root .cc-cx2,
.cc-root section.cc-colleges {
  --x-navy:#0b1b3a; --x-navy2:#16295c; --x-lav:#ede9fe; --x-teal:#14b8a6;
  --x-ink:#0f1d3a; --x-mut:#5b6785; --x-line:#e3e6f4;
  position:relative; isolation:isolate; overflow-x:clip;
  font-family:"Plus Jakarta Sans","Outfit",Inter,"Segoe UI",system-ui,sans-serif;
  color:var(--x-ink);
  background:
    radial-gradient(900px 520px at 6% -4%,rgba(139,92,246,.16),transparent 60%),
    radial-gradient(800px 500px at 96% 4%,rgba(20,184,166,.16),transparent 60%),
    linear-gradient(180deg,#f6f4ff 0%,#f4f7fb 45%,#eef6f7 100%)!important;
  animation:xPage .55s cubic-bezier(.16,1,.3,1) both;
}
.cc-root section.cc-colleges::before,.cc-root section.cc-colleges::after { display:none; }
@keyframes xPage { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }

/* reveal on scroll */
.cc-cx2 [data-reveal] { opacity:0; translate:0 26px; scale:.98; transition:opacity .7s ease,translate .7s cubic-bezier(.16,1,.3,1),scale .7s cubic-bezier(.16,1,.3,1),transform .25s ease,box-shadow .35s ease,border-color .3s ease; transition-delay:calc(var(--i,0)*55ms),calc(var(--i,0)*55ms),calc(var(--i,0)*55ms),0s,0s,0s; }
.cc-cx2 [data-reveal].is-in { opacity:1; translate:0 0; scale:1; }

/* floating background */
.cc-fx-bg { position:absolute; inset:0; z-index:-1; pointer-events:none;
  background:radial-gradient(rgba(22,41,92,.09) 1px,transparent 1px) 0 0/26px 26px;
  mask-image:linear-gradient(180deg,#000,transparent 85%); }
.cc-fx-blob { position:absolute; border-radius:50%; filter:blur(50px); opacity:.45; animation:xFloat 14s ease-in-out infinite; }
.cc-fx-blob.b1 { width:340px;height:340px;background:#a78bfa;top:80px;left:-120px; }
.cc-fx-blob.b2 { width:300px;height:300px;background:#5eead4;top:520px;right:-110px;animation-delay:-5s; }
.cc-fx-blob.b3 { width:240px;height:240px;background:#fcd34d;bottom:120px;left:30%;opacity:.25;animation-delay:-9s; }
@keyframes xFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(26px,-34px)} }

/* hero */
.cc-fx-hero { position:relative; overflow:hidden; text-align:center; padding:56px 28px 36px; margin-bottom:44px; border-radius:32px; color:#fff;
  background:radial-gradient(600px 300px at 15% 0%,rgba(139,92,246,.55),transparent 65%),radial-gradient(500px 300px at 90% 100%,rgba(20,184,166,.5),transparent 65%),linear-gradient(135deg,#0b1b3a,#16295c);
  box-shadow:0 30px 70px rgba(11,27,58,.32); }
.cc-fx-hero::before { content:""; position:absolute; inset:0; background:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px) 0 0/36px 36px,linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px) 0 0/36px 36px; mask-image:radial-gradient(circle at 50% 40%,#000,transparent 75%); pointer-events:none; }
.cc-fx-hero > * { position:relative; z-index:1; }
.cc-fx-eyebrow { display:inline-flex; align-items:center; gap:7px; padding:7px 14px; border-radius:999px; font-size:.78rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.25); backdrop-filter:blur(8px); }
.cc-fx-hero h2 { margin:18px auto 12px; max-width:760px; font-size:clamp(1.9rem,4.4vw,3.2rem); line-height:1.1; font-weight:800; letter-spacing:-.02em; color:#fff; -webkit-text-fill-color:#fff; background:none; animation:none; }
.cc-fx-hero h2 em { font-style:normal; background:linear-gradient(90deg,#c4b5fd,#5eead4,#fde68a); background-size:200% 100%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; animation:xShimmer 6s linear infinite; }
@keyframes xShimmer { to{background-position:200% 0} }
.cc-fx-hero p { max-width:640px; margin:0 auto 26px; color:rgba(255,255,255,.82); font-size:1.02rem; line-height:1.6; }
.cc-fx-float span { position:absolute; z-index:0; display:grid; place-items:center; width:54px; height:54px; border-radius:18px; color:#fff; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); backdrop-filter:blur(6px); animation:xBob 7s ease-in-out infinite; animation-delay:calc(var(--i)*-.9s); }
.cc-fx-float span:nth-child(1){top:16%;left:5%} .cc-fx-float span:nth-child(2){top:58%;left:11%} .cc-fx-float span:nth-child(3){top:20%;left:19%}
.cc-fx-float span:nth-child(4){top:16%;right:6%} .cc-fx-float span:nth-child(5){top:60%;right:12%} .cc-fx-float span:nth-child(6){top:22%;right:20%}
.cc-fx-float span:nth-child(7){bottom:8%;left:28%} .cc-fx-float span:nth-child(8){bottom:10%;right:28%}
@keyframes xBob { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-16px) rotate(5deg)} }
.cc-fx-search { display:flex; align-items:center; gap:10px; max-width:560px; margin:0 auto 26px; padding:6px 8px 6px 18px; border-radius:999px; background:rgba(255,255,255,.96); color:var(--x-mut); box-shadow:0 14px 34px rgba(0,0,0,.25); transition:box-shadow .3s,transform .3s; }
.cc-fx-search:focus-within { transform:translateY(-2px); box-shadow:0 0 0 4px rgba(94,234,212,.45),0 18px 40px rgba(0,0,0,.3); }
.cc-fx-search input { flex:1; min-width:0; padding:12px 0; border:0; outline:0; background:transparent; font:inherit; font-size:.98rem; color:var(--x-ink); }
.cc-fx-clear { display:grid; place-items:center; width:32px; height:32px; border:0; border-radius:50%; background:#eef0fa; color:var(--x-navy); cursor:pointer; }
.cc-fx-stats { display:flex; justify-content:center; gap:14px; flex-wrap:wrap; margin:0; padding:0; list-style:none; }
.cc-fx-stats li { min-width:104px; padding:12px 20px; border-radius:18px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18); }
.cc-fx-stats strong { display:block; font-size:1.5rem; font-weight:800; }
.cc-fx-stats span { font-size:.76rem; letter-spacing:.06em; text-transform:uppercase; color:rgba(255,255,255,.7); }

/* section heads */
.cc-fx-sechead { margin-bottom:22px; }
.cc-fx-sechead h3 { margin:0 0 4px; font-size:clamp(1.3rem,2.6vw,1.8rem); font-weight:800; letter-spacing:-.01em; color:var(--x-navy); }
.cc-fx-sechead p { margin:0; color:var(--x-mut); }

/* category showcase (bento) */
.cc-fx-showcase { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); gap:18px; margin-bottom:52px; }
.cc-fx-card { --rx:0deg; --ry:0deg; --mx:50%; --my:50%; grid-column:span 3; position:relative; display:flex; flex-direction:column; min-width:0; border-radius:26px; padding:2px; background:#fff;
  box-shadow:0 10px 30px rgba(22,41,92,.09); transform:perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)); transition:transform .25s ease,box-shadow .35s ease; }
.cc-fx-card.is-wide { grid-column:span 6; }
.cc-fx-card:hover,.cc-fx-card.is-active { box-shadow:0 26px 54px color-mix(in srgb,var(--c1) 28%,transparent); transform:perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-6px); }
.cc-fx-ring { position:absolute; inset:0; border-radius:inherit; padding:2px; pointer-events:none; opacity:.35; transition:opacity .3s;
  background:conic-gradient(from var(--ang),var(--c1),var(--c2),#fff0,var(--c1)); -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; animation:xSpin 5s linear infinite; }
.cc-fx-card:hover .cc-fx-ring,.cc-fx-card.is-active .cc-fx-ring { opacity:1; }
@keyframes xSpin { to{--ang:360deg} }
.cc-fx-glow { position:absolute; inset:0; border-radius:inherit; pointer-events:none; opacity:0; transition:opacity .3s; background:radial-gradient(260px circle at var(--mx) var(--my),color-mix(in srgb,var(--c2) 38%,transparent),transparent 70%); }
.cc-fx-card:hover .cc-fx-glow { opacity:1; }
.cc-fx-bgicon { position:absolute; right:-14px; bottom:34px; color:var(--c1); opacity:.07; transition:transform .5s cubic-bezier(.16,1,.3,1),opacity .3s; pointer-events:none; }
.cc-fx-card:hover .cc-fx-bgicon { transform:rotate(-10deg) scale(1.15); opacity:.13; }
.cc-fx-pick { position:relative; z-index:1; flex:1; display:flex; flex-direction:column; align-items:flex-start; gap:6px; padding:22px 22px 8px; border:0; background:transparent; text-align:left; font:inherit; color:inherit; cursor:pointer; border-radius:24px 24px 0 0; }
.cc-fx-pick:focus-visible,.cc-fx-go:focus-visible,.cc-fx-cta:focus-visible,.cc-fx-clink:focus-visible { outline:3px solid var(--c1); outline-offset:2px; }
.cc-fx-orb { display:grid; place-items:center; width:56px; height:56px; margin-bottom:8px; border-radius:18px; color:#fff; background:linear-gradient(135deg,var(--c1),var(--c2)); box-shadow:0 12px 24px color-mix(in srgb,var(--c1) 40%,transparent); transition:transform .45s cubic-bezier(.34,1.56,.64,1); }
.cc-fx-card:hover .cc-fx-orb { transform:rotate(-8deg) scale(1.1); }
.cc-fx-card.is-active .cc-fx-orb { animation:xPulse 2s ease-in-out infinite; }
@keyframes xPulse { 50%{box-shadow:0 0 0 10px color-mix(in srgb,var(--c1) 16%,transparent),0 12px 24px color-mix(in srgb,var(--c1) 40%,transparent)} }
.cc-fx-name { font-size:1.12rem; font-weight:800; color:var(--x-navy); line-height:1.2; }
.cc-fx-tagline { font-size:.85rem; color:var(--x-mut); }
.cc-fx-counts { display:flex; align-items:center; gap:7px; flex-wrap:wrap; margin-top:6px; font-size:.8rem; color:var(--x-mut); }
.cc-fx-counts b { color:var(--c1); font-size:.95rem; }
.cc-fx-counts i { width:4px; height:4px; border-radius:50%; background:#c5cbe3; }
.cc-fx-tags { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }
.cc-fx-tags em { max-width:100%; padding:4px 10px; border-radius:999px; font-style:normal; font-size:.72rem; font-weight:600; color:var(--c1); background:color-mix(in srgb,var(--c1) 9%,#fff); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.cc-fx-go { position:relative; z-index:1; display:inline-flex; align-items:center; gap:6px; margin:4px 22px 18px; padding:9px 0; border:0; background:transparent; font:inherit; font-size:.86rem; font-weight:700; color:var(--c1); cursor:pointer; }
.cc-fx-go svg { transition:transform .3s; }
.cc-fx-go:hover svg { transform:translateX(5px); }

/* course list */
.cc-fx-listhead { display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:22px; scroll-margin-top:90px; }
.cc-fx-kicker { display:inline-block; padding:5px 12px; border-radius:999px; font-size:.74rem; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:var(--c1,#4f46e5); background:color-mix(in srgb,var(--c1,#4f46e5) 12%,#fff); }
.cc-fx-listhead h3 { margin:8px 0 0; font-size:clamp(1.25rem,2.4vw,1.7rem); font-weight:800; color:var(--x-navy); }
.cc-fx-actions { display:flex; gap:10px; flex-wrap:wrap; }
.cc-fx-chip,.cc-fx-cta { display:inline-flex; align-items:center; gap:7px; min-height:44px; padding:0 18px; border-radius:999px; font:inherit; font-size:.88rem; font-weight:700; cursor:pointer; transition:transform .25s,box-shadow .25s; }
.cc-fx-chip { border:1px solid var(--x-line); background:#fff; color:var(--x-navy); }
.cc-fx-cta { border:0; color:#fff; background:linear-gradient(135deg,var(--c1),var(--c2)); box-shadow:0 10px 22px color-mix(in srgb,var(--c1) 35%,transparent); }
.cc-fx-chip:hover,.cc-fx-cta:hover { transform:translateY(-2px); }
.cc-fx-courses { display:grid; grid-template-columns:repeat(auto-fill,minmax(285px,1fr)); gap:20px; padding-bottom:30px; }
.cc-fx-course { --rx:0deg; --ry:0deg; position:relative; display:flex; flex-direction:column; gap:10px; padding:22px 22px 18px; border-radius:22px; background:#fff; border:1px solid var(--x-line); overflow:hidden;
  transform:perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)); transition:transform .25s ease,box-shadow .3s,border-color .3s,opacity .7s; }
.cc-fx-course:hover { border-color:color-mix(in srgb,var(--c1) 45%,#fff); box-shadow:0 22px 44px color-mix(in srgb,var(--c1) 20%,transparent); transform:perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-5px); }
.cc-fx-cbar { position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,var(--c1),var(--c2),var(--c1)); background-size:200% 100%; animation:xShimmer 4s linear infinite; }
.cc-fx-ctop { display:flex; align-items:center; justify-content:space-between; gap:10px; }
.cc-fx-corb { display:grid; place-items:center; width:40px; height:40px; border-radius:13px; color:var(--c1); background:color-mix(in srgb,var(--c1) 11%,#fff); transition:transform .4s cubic-bezier(.34,1.56,.64,1); }
.cc-fx-course:hover .cc-fx-corb { transform:rotate(-10deg) scale(1.12); color:#fff; background:linear-gradient(135deg,var(--c1),var(--c2)); }
.cc-fx-cchip { padding:4px 10px; border-radius:999px; font-size:.7rem; font-weight:700; color:var(--x-mut); background:#f1f3fb; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.cc-fx-course h4 { margin:4px 0 0; font-size:1.05rem; font-weight:800; line-height:1.3; color:var(--x-navy); }
.cc-fx-course p { margin:0; font-size:.86rem; line-height:1.55; color:var(--x-mut); }
.cc-fx-course dl { display:grid; gap:8px; margin:6px 0 0; padding-top:12px; border-top:1px dashed var(--x-line); }
.cc-fx-course dl div { display:flex; justify-content:space-between; gap:12px; font-size:.82rem; }
.cc-fx-course dt { display:flex; align-items:center; gap:6px; color:var(--x-mut); white-space:nowrap; }
.cc-fx-course dd { margin:0; text-align:right; font-weight:700; color:var(--x-ink); }
.cc-fx-clink { align-self:flex-start; display:inline-flex; align-items:center; gap:6px; margin-top:4px; padding:8px 0; border:0; background:transparent; font:inherit; font-size:.84rem; font-weight:700; color:var(--c1); cursor:pointer; }
.cc-fx-clink svg { transition:transform .3s; } .cc-fx-clink:hover svg { transform:translateX(4px); }
.cc-fx-empty-ico { display:grid; place-items:center; width:64px; height:64px; border-radius:20px; background:var(--x-lav); color:#7c3aed; }

/* skeletons */
.cc-skel { display:block; border-radius:10px; background:linear-gradient(90deg,#eceff9 25%,#f7f8fd 45%,#eceff9 65%); background-size:240% 100%; animation:xSkel 1.3s ease-in-out infinite; }
@keyframes xSkel { from{background-position:120% 0} to{background-position:-120% 0} }
.cc-skel-orb { width:56px; height:56px; border-radius:18px; margin-bottom:14px; }
.cc-skel-line { height:12px; margin-top:10px; } .w50{width:50%} .w70{width:70%} .w90{width:90%}
.cc-fx-skel { padding:22px; grid-column:span 3; min-height:170px; } .cc-fx-skel.is-wide { grid-column:span 6; }
.cc-skel-card { border-radius:24px; background:#fff; padding:0 0 22px; overflow:hidden; border:1px solid var(--x-line); }
.cc-skel-card .cc-skel-line { margin-left:22px; } .cc-skel-media { height:190px; border-radius:0; }

/* ---------- college page ---------- */
.cc-root section.cc-colleges .cc-col-hero { border-radius:32px; background:radial-gradient(600px 320px at 12% 0%,rgba(139,92,246,.55),transparent 65%),radial-gradient(520px 320px at 95% 100%,rgba(20,184,166,.5),transparent 65%),linear-gradient(135deg,#0b1b3a,#16295c); box-shadow:0 30px 70px rgba(11,27,58,.3); }
.cc-root section.cc-colleges .cc-col-hero h2 em { font-style:normal; background:linear-gradient(90deg,#c4b5fd,#5eead4,#fde68a); background-size:200% 100%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; animation:xShimmer 6s linear infinite; }
.cc-root section.cc-colleges .cc-col-orbs span:nth-child(1){background:#8b5cf6} .cc-root section.cc-colleges .cc-col-orbs span:nth-child(2){background:#14b8a6} .cc-root section.cc-colleges .cc-col-orbs span:nth-child(3){background:#fbbf24}

.cc-cat-tabs { gap:10px; margin-bottom:20px; }
.cc-cat-tabs .cc-cat-btn { --c1:#4f46e5; --c2:#8b5cf6; position:relative; display:inline-flex; align-items:center; gap:9px; min-height:48px; padding:6px 16px 6px 7px; border-radius:999px; border:1px solid var(--x-line); background:#fff; color:var(--x-navy); font-weight:700; box-shadow:0 4px 14px rgba(22,41,92,.06);
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s,background .3s,color .3s,border-color .3s!important; animation:ccTilePop .55s cubic-bezier(.34,1.56,.64,1) both; }
.cc-cat-tabs .cc-cat-btn:hover { transform:translateY(-3px); border-color:var(--c1); box-shadow:0 12px 24px color-mix(in srgb,var(--c1) 22%,transparent); color:var(--c1); }
.cc-cat-tabs .cc-cat-emoji { display:grid; place-items:center; width:34px; height:34px; border-radius:50%; font-size:0; color:var(--c1); background:color-mix(in srgb,var(--c1) 12%,#fff); transition:transform .4s cubic-bezier(.34,1.56,.64,1); animation:none; }
.cc-cat-tabs .cc-cat-btn:hover .cc-cat-emoji { transform:rotate(-12deg) scale(1.15); }
.cc-cat-tabs .cc-cat-active { color:#fff!important; border-color:transparent!important; background:linear-gradient(135deg,var(--c1),var(--c2))!important; box-shadow:0 14px 28px color-mix(in srgb,var(--c1) 38%,transparent); transform:translateY(-2px); }
.cc-cat-tabs .cc-cat-active .cc-cat-emoji { color:#fff; background:rgba(255,255,255,.25); animation:none; }
.cc-cat-tabs .cc-cat-active .cc-cat-count { background:rgba(255,255,255,.28); color:#fff; }
.cc-cat-tabs .cc-cat-count { padding:2px 9px; border-radius:999px; font-size:.74rem; background:#f1f3fb; }

.cc-root section.cc-colleges .cc-tools { padding:12px; border-radius:22px; background:rgba(255,255,255,.75); backdrop-filter:blur(10px); border:1px solid var(--x-line); box-shadow:0 10px 30px rgba(22,41,92,.06); }
.cc-root section.cc-colleges .cc-input,.cc-root section.cc-colleges .cc-select { min-height:46px; border-radius:14px; }
.cc-root section.cc-colleges .cc-field:focus-within,.cc-root section.cc-colleges .cc-select:focus { box-shadow:0 0 0 4px rgba(124,58,237,.16); }

.cc-root .cc-grid { grid-template-columns:repeat(auto-fill,minmax(310px,1fr)); gap:26px; }
.cc-root .cc-card.cc-card-x { --rx:0deg; --ry:0deg; --mx:50%; --my:50%; position:relative; border:0!important; border-radius:26px; overflow:visible; background:#fff; box-shadow:0 12px 34px rgba(22,41,92,.1);
  transform:perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry)); transition:transform .25s ease,box-shadow .35s!important; }
.cc-root .cc-card.cc-card-x::before { inset:0; top:0; height:auto; z-index:0; pointer-events:none; border-radius:inherit; padding:2px; opacity:0; transition:opacity .3s;
  background:conic-gradient(from var(--ang),var(--c1),var(--c2),#fff0,var(--c1)); -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; animation:xSpin 5s linear infinite; }
.cc-root .cc-grid .cc-card.cc-card-x { animation:ccCardRise .6s cubic-bezier(.16,1,.3,1) backwards; }
.cc-root .cc-card.cc-card-x:hover { transform:perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-8px); box-shadow:0 28px 56px color-mix(in srgb,var(--c1) 26%,transparent)!important; }
.cc-root .cc-card.cc-card-x:hover::before { opacity:1; }
.cc-card-x .cc-card-media { height:190px; border-radius:24px 24px 0 0; overflow:hidden; background:linear-gradient(135deg,var(--c1),var(--c2)); }
.cc-card-x .cc-card-media img { position:relative; z-index:1; transition:transform .8s cubic-bezier(.16,1,.3,1); }
.cc-card-x:hover .cc-card-media img { transform:scale(1.09); }
.cc-card-fallback { position:absolute; inset:0; display:grid; place-items:center; color:rgba(255,255,255,.55); }
.cc-card-x .cc-card-media::after { content:""; position:absolute; inset:0; z-index:2; background:linear-gradient(180deg,transparent 45%,rgba(11,27,58,.55)); pointer-events:none; }
.cc-card-x .cc-card-type,.cc-card-x .cc-card-rating { z-index:3; }
.cc-card-cat { position:absolute; z-index:3; left:14px; bottom:12px; display:inline-flex; align-items:center; gap:6px; padding:5px 11px 5px 8px; border-radius:999px; font-size:.74rem; font-weight:700; color:#fff; background:rgba(255,255,255,.2); border:1px solid rgba(255,255,255,.35); backdrop-filter:blur(8px); }
.cc-card-x .cc-card-body,.cc-card-x .cc-card-foot { position:relative; z-index:1; }
.cc-card-x .cc-card-title { color:var(--x-navy); font-weight:800; letter-spacing:-.01em; }
.cc-card-x .cc-card-loc { color:var(--c1); font-weight:600; }
.cc-card-x .cc-tag { color:var(--c1); background:color-mix(in srgb,var(--c1) 10%,#fff); border:0; }
.cc-card-x .cc-card-foot .cc-btn { border:0; background:linear-gradient(135deg,var(--c1),var(--c2)); box-shadow:0 10px 22px color-mix(in srgb,var(--c1) 30%,transparent); transition:transform .3s,box-shadow .3s,filter .3s; }
.cc-card-x .cc-card-foot .cc-btn:hover { transform:translateY(-2px); filter:brightness(1.05); }
.cc-card-x .cc-card-foot .cc-btn svg { transition:transform .3s; } .cc-card-x .cc-card-foot .cc-btn:hover svg { transform:translateX(5px); }
.cc-skel-grid { margin-top:8px; }

/* ---------- college details: centred modal ---------- */
.cc-root .cc-drawer-backdrop { position:fixed; inset:0; z-index:200; display:grid!important; place-items:center!important; padding:20px!important; overflow-y:auto; overscroll-behavior:contain;
  background:radial-gradient(circle at 50% 30%,rgba(76,29,149,.35),transparent 60%),rgba(6,14,36,.66)!important; backdrop-filter:blur(8px); animation:ccFade .3s ease both; }
.cc-root .cc-drawer { width:min(980px,100%)!important; height:auto!important; max-height:min(90vh,900px)!important; margin:auto; border-radius:30px!important; background:#fff;
  box-shadow:0 40px 100px rgba(0,0,0,.45); animation:xModalIn .5s cubic-bezier(.16,1,.3,1) both!important; }
.cc-root .cc-drawer::before { content:""; position:absolute; inset:0; z-index:6; pointer-events:none; border-radius:inherit; padding:2px; background:conic-gradient(from var(--ang),#8b5cf6,#14b8a6,#fbbf24,#8b5cf6); -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; animation:xSpin 6s linear infinite; opacity:.9; }
@keyframes xModalIn { from{opacity:0;transform:translateY(34px) scale(.93)} to{opacity:1;transform:none} }
@keyframes xModalOut { to{opacity:0;transform:translateY(24px) scale(.95)} }
.cc-root .cc-drawer-backdrop.is-closing { animation:xFadeOut .24s ease both!important; }
.cc-root .cc-drawer-backdrop.is-closing .cc-drawer { animation:xModalOut .24s ease both!important; }
@keyframes xFadeOut { to{opacity:0} }
.cc-root .cc-drawer .cc-modal-close { position:sticky; top:14px; right:auto; float:none; display:grid; margin:14px 14px -56px auto; width:42px; height:42px; z-index:8; color:#fff; border:1px solid rgba(255,255,255,.4); background:rgba(11,27,58,.55); backdrop-filter:blur(8px); }
.cc-root .cc-drawer .cc-modal-close:hover { background:#e11d48; border-color:#e11d48; color:#fff; }
.cc-root .cc-drawer .cc-modal-hero { height:260px; background:linear-gradient(135deg,var(--c1,#4f46e5),var(--c2,#14b8a6)); border-radius:30px 30px 0 0; }
.cc-root .cc-drawer .cc-modal-hero::after { content:""; position:absolute; inset:0; background:linear-gradient(180deg,transparent 30%,rgba(11,27,58,.78)); pointer-events:none; }
.cc-root .cc-drawer .cc-modal-hero-overlay { z-index:2; }
.cc-hero-icon { position:absolute; inset:0; display:grid; place-items:center; color:rgba(255,255,255,.35); }
.cc-modal-tags { display:flex; flex-wrap:wrap; gap:8px; margin:20px 0 4px; }
.cc-modal-tags span { display:inline-flex; align-items:center; gap:6px; padding:6px 13px; border-radius:999px; font-size:.78rem; font-weight:700; color:var(--c1,#4f46e5); background:color-mix(in srgb,var(--c1,#4f46e5) 11%,#fff); }
.cc-root .cc-drawer-chips { margin:14px 0 12px!important; }
.cc-root .cc-drawer-chip { border-radius:18px; border:1px solid var(--x-line,#e3e6f4); }
.cc-root .cc-drawer .cc-modal-content { padding:6px 30px 28px; }
.cc-root .cc-drawer .cc-modal-actions { position:sticky; bottom:-1px; margin:22px -30px -28px; padding:16px 30px; background:rgba(255,255,255,.94); backdrop-filter:blur(10px); border-top:1px solid var(--x-line,#e3e6f4); border-radius:0 0 30px 30px; }
.cc-root .cc-drawer .cc-btn-primary { color:#fff; border:0; background:linear-gradient(135deg,var(--c1,#4f46e5),var(--c2,#14b8a6))!important; box-shadow:0 10px 24px color-mix(in srgb,var(--c1,#4f46e5) 35%,transparent); }
.cc-root .cc-drawer .cc-modal-actions { display:flex; flex-wrap:wrap; gap:10px; }
.cc-cx2 :is(h2,h3,h4),.cc-root section.cc-colleges :is(h2,h3,h4),.cc-root .cc-drawer :is(h2,h3,h4) { font-family:inherit; }
.cc-fx-card.is-wide .cc-fx-bgicon { right:34px; bottom:26px; opacity:.09; transform:scale(1.5); transform-origin:100% 100%; }
.cc-fx-card.is-wide:hover .cc-fx-bgicon { transform:scale(1.65) rotate(-8deg); }
body.cc-lock { overflow:hidden; }

/* ---------- responsive ---------- */
@media (max-width:1099px) {
  .cc-fx-card { grid-column:span 6; } .cc-fx-card.is-wide,.cc-fx-skel.is-wide { grid-column:span 12; } .cc-fx-skel { grid-column:span 6; }
  .cc-fx-float span:nth-child(n+5) { display:none; }
}
@media (max-width:700px) {
  .cc-fx-hero { padding:40px 18px 26px; border-radius:26px; } .cc-fx-float { display:none; }
  .cc-fx-showcase { gap:12px; } .cc-fx-card,.cc-fx-skel { grid-column:span 6; } .cc-fx-card.is-wide,.cc-fx-skel.is-wide { grid-column:span 12; }
  .cc-fx-pick { padding:16px 14px 4px; } .cc-fx-orb { width:46px;height:46px;border-radius:15px; } .cc-fx-name { font-size:1rem; }
  .cc-fx-tags,.cc-fx-tagline { display:none; } .cc-fx-card.is-wide .cc-fx-tagline { display:block; } .cc-fx-go { margin:2px 14px 12px; font-size:.8rem; }
  .cc-fx-courses { grid-template-columns:1fr; } .cc-fx-listhead { align-items:flex-start; } .cc-fx-actions { width:100%; } .cc-fx-cta,.cc-fx-chip { flex:1; justify-content:center; }
  .cc-cat-tabs { flex-wrap:nowrap; overflow-x:auto; padding:4px 2px 10px; margin-inline:-4px; scroll-snap-type:x proximity; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
  .cc-cat-tabs::-webkit-scrollbar { display:none; } .cc-cat-tabs .cc-cat-btn { flex:0 0 auto; scroll-snap-align:start; }
  .cc-root .cc-grid { grid-template-columns:1fr; gap:20px; }
  .cc-root .cc-drawer-backdrop { place-items:end center!important; padding:0!important; }
  .cc-root .cc-drawer { width:100%!important; max-height:94dvh!important; border-radius:26px 26px 0 0!important; animation:xSheetIn .45s cubic-bezier(.16,1,.3,1) both!important; }
  .cc-root .cc-drawer::after { content:""; position:absolute; top:8px; left:50%; width:44px; height:5px; margin-left:-22px; border-radius:9px; background:rgba(255,255,255,.7); z-index:9; }
  .cc-root .cc-drawer .cc-modal-hero { height:200px; border-radius:26px 26px 0 0; }
  .cc-root .cc-drawer .cc-modal-content { padding:4px 16px 24px; } .cc-root .cc-drawer .cc-modal-actions { margin:18px -16px -24px; padding:12px 16px calc(12px + env(safe-area-inset-bottom)); border-radius:0; }
  .cc-root .cc-drawer .cc-modal-actions .cc-btn { flex:1 1 40%; justify-content:center; }
  .cc-root .cc-drawer-backdrop.is-closing .cc-drawer { animation:xSheetOut .24s ease both!important; }
}
@keyframes xSheetIn { from{transform:translateY(100%)} to{transform:none} }
@keyframes xSheetOut { to{transform:translateY(100%)} }
@media (hover:none) {
  .cc-fx-card:hover,.cc-fx-course:hover,.cc-root .cc-card.cc-card-x:hover { transform:none; }
  .cc-fx-card:active,.cc-fx-course:active,.cc-root .cc-card.cc-card-x:active { transform:scale(.985); }
}
@media (prefers-reduced-motion:reduce) {
  .cc-cx2,.cc-root section.cc-colleges,.cc-fx-blob,.cc-fx-float span,.cc-fx-ring,.cc-fx-cbar,.cc-fx-hero h2 em,.cc-card-x::before,.cc-root .cc-drawer,.cc-root .cc-drawer::before,.cc-skel,.cc-fx-card.is-active .cc-fx-orb { animation:none!important; }
  .cc-cx2 [data-reveal] { opacity:1; translate:0 0; scale:1; transition:none; }
}
`;

const EXTRA_STYLE = `
.cc-root { --brand:#0f766e; --brand-dark:#115e59; --deep:#134e4a; --navy:#142033; --blue-25:#f4efe4; --blue-50:#efe6d4; --teal:#e08a1e; --shadow-brand:0 12px 28px rgba(15,118,110,.28); background:radial-gradient(circle at 0% 0%,rgba(224,138,30,.18),transparent 32%),radial-gradient(circle at 100% 8%,rgba(15,118,110,.16),transparent 36%),linear-gradient(180deg,#f7f3ea,#f3efe6); background-attachment:fixed; font-family:Outfit, Inter, "Segoe UI", sans-serif; }
.cc-root h1,.cc-root h2,.cc-root h3 { font-family:Fraunces, Georgia, serif; letter-spacing:-.03em; }
.cc-root > section { animation:ccPageIn .5s ease both; }
@keyframes ccPageIn { from {opacity:0;transform:translateY(14px)} to {opacity:1;transform:none} }
.cc-nav { background:rgba(255,255,255,.82); }
.cc-hero { background:transparent; }
.cc-hero h1 em { color:#c2410c; }
.cc-colleges { background:transparent;border-top:0; }
.cc-strip { background:linear-gradient(120deg,#142033,#0f766e 58%,#e08a1e); }
.cc-card,.cc-profile-card,.cc-course-tile { border-radius:22px;border-color:#eadfcd; }
.cc-card:hover { box-shadow:0 22px 44px rgba(20,32,51,.16); }
.cc-btn-primary { background:linear-gradient(135deg,#0f766e,#115e59); }
.cc-btn-primary:hover { background:linear-gradient(135deg,#115e59,#134e4a); }
.cc-dropdown { animation:ccDrop .18s ease both;transform-origin:top right; }
@keyframes ccDrop { from {opacity:0;transform:translateY(-6px) scale(.97)} to {opacity:1;transform:none} }
.cc-page-hero { text-align:center;max-width:720px;margin:0 auto 28px;padding:34px 20px;border-radius:26px;background:linear-gradient(135deg,#142033 0%,#0f766e 62%,#e08a1e 150%);box-shadow:0 18px 40px rgba(20,32,51,.22); }
.cc-page-hero h2 { color:#fff;-webkit-text-fill-color:#fff;background:none;animation:none;font-size:clamp(1.5rem,3vw,2.1rem); }
.cc-page-hero p { color:rgba(255,255,255,.88);margin-top:10px; }
.cc-page-hero .cc-eyebrow { background:rgba(255,255,255,.18);border-color:rgba(255,255,255,.35);color:#fff; }
.cc-course-search { display:flex;align-items:center;gap:10px;max-width:560px;margin:0 auto 20px;padding:0 18px;background:#fff;border:1px solid #e0e7ff;border-radius:999px;box-shadow:var(--shadow-md); }
.cc-course-search input { flex:1;height:50px;border:0;outline:0;background:transparent;font:inherit;font-size:.95rem;color:var(--navy); }
.cc-cx-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:20px; }
.cc-cx-card { border-radius:22px;padding:22px;border:1px solid rgba(255,255,255,.8);box-shadow:0 8px 22px rgba(49,46,129,.08);transition:transform .25s ease,box-shadow .25s ease;animation:ccPageIn .5s ease both; }
.cc-cx-card:hover { transform:translateY(-6px) scale(1.015);box-shadow:0 20px 40px rgba(49,46,129,.18); }
.cc-cx-top { display:flex;justify-content:space-between;align-items:center;gap:8px; }
.cc-cx-icon { display:grid;place-items:center;width:50px;height:50px;border-radius:16px;background:#fff;font-size:26px;box-shadow:0 6px 14px rgba(0,0,0,.08);transition:transform .3s ease; }
.cc-cx-card:hover .cc-cx-icon { transform:rotate(-8deg) scale(1.1); }
.cc-cx-chip { padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.75);color:var(--accent);font-size:.72rem;font-weight:700; }
.cc-cx-card h3 { margin:14px 0 6px;font-size:1.05rem;line-height:1.3; }
.cc-cx-card p { color:var(--muted-dark);font-size:.86rem; }
.cc-cx-card dl { display:grid;gap:8px;margin:14px 0 0; }
.cc-cx-card dl>div { padding:9px 12px;border-radius:12px;background:rgba(255,255,255,.7); }
.cc-cx-card dt { font-size:.72rem;font-weight:700;color:var(--muted); }
.cc-cx-card dd { margin:2px 0 0;font-size:.86rem;font-weight:600;color:var(--navy); }
.cc-myapps { display:grid;gap:16px;max-width:900px;margin:22px auto 0; }
.cc-myapp { display:flex;justify-content:space-between;align-items:center;gap:18px;padding:20px 24px;background:#fff;border:1px solid #e0e7ff;border-left:6px solid var(--brand);border-radius:20px;box-shadow:var(--shadow-md);animation:ccPageIn .5s ease both;transition:transform .25s ease,box-shadow .25s ease; }
.cc-myapp:hover { transform:translateY(-3px);box-shadow:0 18px 36px rgba(79,70,229,.18); }
.cc-myapp h3 { font-size:1.05rem; }
.cc-myapp p { font-size:.86rem; }
.cc-myapp-course { display:inline-block;margin-top:10px;padding:6px 14px;border-radius:999px;background:var(--blue-25);color:var(--deep);font-size:.85rem;font-weight:700; }
.cc-myapp-side { display:flex;flex-direction:column;align-items:flex-end;gap:8px;text-align:right; }
.cc-myapp-side small { color:var(--muted);font-size:.8rem; }
.cc-badge { padding:6px 14px;border-radius:999px;font-size:.8rem;font-weight:800;white-space:nowrap; }
.cc-badge-pending { background:#fef3c7;color:#b45309; }
.cc-badge-approved { background:#d1fae5;color:#047857; }
.cc-badge-rejected { background:#fee2e2;color:#b91c1c; }
.cc-empty { max-width:520px;margin:20px auto;padding:44px 28px;text-align:center;background:#fff;border:1px solid #e0e7ff;border-radius:28px;box-shadow:var(--shadow-lg); }
.cc-empty-art { font-size:64px;margin-bottom:12px;animation:ccFloat 3.5s ease-in-out infinite; }
@keyframes ccFloat { 50% {transform:translateY(-8px)} }
.cc-empty h2 { margin-bottom:8px; }
.cc-skeleton { border-radius:12px;background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);background-size:200% 100%;animation:ccShimmer 1.3s linear infinite; }
@keyframes ccShimmer { to {background-position:-200% 0} }
@media(max-width:680px) { .cc-myapp {flex-direction:column;align-items:flex-start}.cc-myapp-side {align-items:flex-start;text-align:left} }
@media(prefers-reduced-motion:reduce) { .cc-root>section,.cc-cx-card,.cc-myapp,.cc-empty-art,.cc-dropdown {animation:none!important;transition:none!important} }
`;

const MOTION_STYLE = `
.cc-open {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  pointer-events: auto;
}
.cc-open-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background:
    radial-gradient(circle at 30% 20%, rgba(224,138,30,.55), transparent 36%),
    linear-gradient(160deg, #142033, #0f766e);
}
.cc-open-left { left: 0; animation: ccPanelLeft .7s cubic-bezier(.7,0,.2,1) 1.05s forwards; }
.cc-open-right { right: 0; animation: ccPanelRight .7s cubic-bezier(.7,0,.2,1) 1.05s forwards; }
.cc-open-mark {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  animation: ccMarkIn .55s cubic-bezier(.16,1,.3,1) both, ccMarkOut .35s ease 1.05s forwards;
}
.cc-open-seal {
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  margin: 0 auto 14px;
  border-radius: 26px;
  background: rgba(255,255,255,.14);
  border: 1px solid rgba(255,255,255,.28);
  font-family: Fraunces, Georgia, serif;
  font-size: 32px;
  font-weight: 680;
  letter-spacing: -.04em;
}
.cc-open-mark strong {
  display: block;
  font-family: Fraunces, Georgia, serif;
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 680;
  letter-spacing: -.04em;
}
.cc-open-mark small {
  display: block;
  margin-top: 8px;
  letter-spacing: .16em;
  text-transform: uppercase;
  font-size: .72rem;
  opacity: .8;
}
@keyframes ccMarkIn {
  from { opacity: 0; transform: translateY(16px) scale(.96); }
  to { opacity: 1; transform: none; }
}
@keyframes ccMarkOut {
  to { opacity: 0; transform: translateY(-10px); }
}
@keyframes ccPanelLeft { to { transform: translateX(-105%); } }
@keyframes ccPanelRight { to { transform: translateX(105%); } }

.cc-stage { animation: ccStage .65s cubic-bezier(.16,1,.3,1) both; }
@keyframes ccStage {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: none; }
}
.cc-stage-home .cc-hero-grid > div:first-child > * {
  animation: ccRise .7s cubic-bezier(.16,1,.3,1) both;
}
.cc-stage-home .cc-hero-grid > div:first-child > *:nth-child(1) { animation-delay: .05s; }
.cc-stage-home .cc-hero-grid > div:first-child > *:nth-child(2) { animation-delay: .12s; }
.cc-stage-home .cc-hero-grid > div:first-child > *:nth-child(3) { animation-delay: .2s; }
.cc-stage-home .cc-hero-grid > div:first-child > *:nth-child(4) { animation-delay: .28s; }
.cc-stage-home .cc-hero-grid > div:first-child > *:nth-child(5) { animation-delay: .36s; }
@keyframes ccRise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}
.cc-aurora { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.cc-aurora span {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  opacity: .55;
  animation: ccBlob 9s ease-in-out infinite;
}
.cc-aurora span:nth-child(1) { width: 280px; height: 280px; background: #f6c56b; top: -90px; left: 6%; }
.cc-aurora span:nth-child(2) { width: 220px; height: 220px; background: #5eead4; top: 30px; right: 8%; animation-delay: -3s; }
.cc-aurora span:nth-child(3) { width: 150px; height: 150px; background: #fb7185; bottom: 70px; left: 42%; animation-delay: -5s; }
@keyframes ccBlob { 50% { transform: translate3d(18px, -22px, 0) scale(1.08); } }
.cc-hero-img { animation: ccPhoto .9s cubic-bezier(.16,1,.3,1) .12s both; }
@keyframes ccPhoto {
  from { opacity: 0; transform: scale(1.05); clip-path: inset(14% 14% 14% 14% round 32px); }
  to { opacity: 1; transform: none; clip-path: inset(0 round 22px); }
}
.cc-float-b { animation: ccPop .55s cubic-bezier(.16,1,.3,1) .35s both, ccDrift 4.6s ease-in-out 1s infinite; }
.cc-float-c { animation: ccPop .55s cubic-bezier(.16,1,.3,1) .5s both, ccDrift 5.2s ease-in-out 1.2s infinite; }
@keyframes ccDrift { 50% { transform: translateY(-8px); } }
.cc-logo-mark { animation: ccSeal .7s cubic-bezier(.16,1,.3,1) both; }
@keyframes ccSeal {
  from { opacity: 0; transform: rotate(-12deg) scale(.7); }
  to { opacity: 1; transform: none; }
}
.cc-strip-grid > div { animation: ccRise .6s cubic-bezier(.16,1,.3,1) both; }
.cc-strip-grid > div:nth-child(2) { animation-delay: .08s; }
.cc-strip-grid > div:nth-child(3) { animation-delay: .16s; }
.cc-strip-grid > div:nth-child(4) { animation-delay: .24s; }
.cc-page-hero { position: relative; overflow: hidden; }
.cc-page-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.32) 48%, transparent 64%);
  transform: translateX(-120%);
  animation: ccSweep 1.15s ease .15s both;
  pointer-events: none;
}
@keyframes ccSweep { to { transform: translateX(120%); } }
.cc-about-img { animation: ccPhoto .8s cubic-bezier(.16,1,.3,1) both; }
.cc-about-list li { animation: ccRise .55s cubic-bezier(.16,1,.3,1) both; }
.cc-about-list li:nth-child(2) { animation-delay: .08s; }
.cc-about-list li:nth-child(3) { animation-delay: .16s; }
.cc-about-list li:nth-child(4) { animation-delay: .24s; }
.cc-grid .cc-card { animation: ccCardRise .6s cubic-bezier(.16,1,.3,1) both; }
@keyframes ccCardRise {
  from { opacity: 0; transform: translateY(22px) scale(.98); }
  to { opacity: 1; transform: none; }
}
.cc-card:hover { transform: translateY(-6px); }
.cc-nav { box-shadow: 0 8px 24px rgba(20,32,51,.04); }
@media (prefers-reduced-motion: reduce) {
  .cc-open { display: none; }
  .cc-stage,
  .cc-stage-home .cc-hero-grid > div:first-child > *,
  .cc-aurora span,
  .cc-hero-img,
  .cc-float-b,
  .cc-float-c,
  .cc-logo-mark,
  .cc-strip-grid > div,
  .cc-page-hero::after,
  .cc-about-img,
  .cc-about-list li,
  .cc-grid .cc-card {
    animation: none !important;
  }
}

/* ===== COLLEGE + ABOUT REDESIGN ===== */
.cc-colleges { position:relative;background:
  radial-gradient(circle at 8% 0%,rgba(224,138,30,.16),transparent 30%),
  radial-gradient(circle at 96% 12%,rgba(15,118,110,.18),transparent 34%),
  radial-gradient(rgba(20,32,51,.07) 1px,transparent 1px) 0 0/22px 22px,
  linear-gradient(180deg,#f7f3ea,#eef6f4)!important; }
.cc-col-hero { position:relative;display:grid;grid-template-columns:1.5fr 1fr;gap:28px;align-items:center;overflow:hidden;margin-bottom:30px;padding:38px;border-radius:30px;color:#fff;background:linear-gradient(135deg,#0b1626 0%,#142033 40%,#0f766e 100%);box-shadow:0 26px 60px rgba(20,32,51,.28); }
.cc-col-hero::before { content:"";position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px) 0 0/34px 34px,linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px) 0 0/34px 34px;mask-image:linear-gradient(120deg,#000,transparent 80%);pointer-events:none; }
.cc-col-orbs span { position:absolute;border-radius:50%;filter:blur(6px);opacity:.5;animation:ccBlob 9s ease-in-out infinite; }
.cc-col-orbs span:nth-child(1) { width:240px;height:240px;background:#e08a1e;top:-90px;right:22%; }
.cc-col-orbs span:nth-child(2) { width:170px;height:170px;background:#2dd4bf;bottom:-70px;left:30%;animation-delay:-3s; }
.cc-col-orbs span:nth-child(3) { width:110px;height:110px;background:#fb7185;top:40%;right:-30px;animation-delay:-5s; }
.cc-col-hero-main,.cc-col-spot { position:relative;z-index:1; }
.cc-col-badge { display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase; }
.cc-col-hero h2 { margin:14px 0 10px;color:#fff;-webkit-text-fill-color:#fff;background:none;font-size:clamp(1.7rem,3.2vw,2.6rem);line-height:1.15; }
.cc-col-hero h2 em { font-style:italic;color:#f6c56b; }
.cc-col-hero p { max-width:560px;color:rgba(255,255,255,.86);font-size:1rem; }
.cc-col-stats { display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:24px; }
.cc-col-stat { padding:14px 12px;border-radius:16px;text-align:center;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(6px); }
.cc-col-stat strong { display:block;font-family:Fraunces,Georgia,serif;font-size:1.6rem;line-height:1.1; }
.cc-col-stat span { font-size:.72rem;letter-spacing:.04em;opacity:.85; }
.cc-col-spot { padding:18px;border-radius:22px;background:rgba(255,255,255,.95);color:#142033;box-shadow:0 18px 40px rgba(0,0,0,.25); }
.cc-col-spot h4 { display:flex;align-items:center;gap:8px;margin:0 0 12px;font-size:.92rem;color:#0f766e; }
.cc-spot-item { display:flex;align-items:center;gap:12px;width:100%;margin-bottom:8px;padding:10px 12px;border:1px solid #e6efec;border-radius:14px;background:#f8fbfa;color:inherit;font:inherit;text-align:left;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease; }
.cc-spot-item:last-child { margin-bottom:0; }
.cc-spot-item:hover { transform:translateX(4px);border-color:#0f766e;box-shadow:0 10px 22px rgba(15,118,110,.18); }
.cc-spot-rank { display:grid;place-items:center;flex:none;width:34px;height:34px;border-radius:50%;font-weight:800;color:#fff; }
.cc-rank-1 { background:linear-gradient(135deg,#f59e0b,#d97706); }
.cc-rank-2 { background:linear-gradient(135deg,#94a3b8,#64748b); }
.cc-rank-3 { background:linear-gradient(135deg,#c2410c,#9a3412); }
.cc-spot-text { flex:1;min-width:0; }
.cc-spot-text strong { display:block;font-size:.86rem;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.cc-spot-text small { color:#64748b;font-size:.74rem; }
.cc-card { position:relative;overflow:hidden;border:1px solid #e3ece9!important;background:#fff; }
.cc-card::before { content:"";position:absolute;top:0;left:0;right:0;height:4px;z-index:2;background:linear-gradient(90deg,#0f766e,#e08a1e,#fb7185); }
.cc-card:hover { box-shadow:0 26px 50px rgba(15,118,110,.22)!important; }
.cc-tools { padding:14px;border-radius:20px;background:rgba(255,255,255,.8);border:1px solid #e3ece9;box-shadow:0 10px 26px rgba(20,32,51,.06);backdrop-filter:blur(6px); }

.cc-about-page { background:
  radial-gradient(circle at 90% 0%,rgba(224,138,30,.18),transparent 32%),
  radial-gradient(circle at 0% 60%,rgba(15,118,110,.16),transparent 34%),
  radial-gradient(rgba(20,32,51,.07) 1px,transparent 1px) 0 0/22px 22px; }
.cc-about-page .cc-about { padding:28px;border-radius:28px;background:rgba(255,255,255,.88);border:1px solid #e3ece9;box-shadow:0 18px 44px rgba(20,32,51,.1); }
.cc-journey { position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
.cc-journey::before { content:"";position:absolute;top:34px;left:8%;right:8%;height:2px;background:repeating-linear-gradient(90deg,#0f766e 0 8px,transparent 8px 16px);opacity:.5; }
.cc-journey-step { position:relative;padding:18px 16px;border-radius:20px;text-align:center;background:#fff;border:1px solid #e3ece9;box-shadow:0 10px 24px rgba(20,32,51,.08);transition:transform .25s ease; }
.cc-journey-step:hover { transform:translateY(-6px); }
.cc-journey-step span { display:grid;place-items:center;width:46px;height:46px;margin:0 auto 10px;border-radius:50%;background:linear-gradient(135deg,#0f766e,#e08a1e);color:#fff;font-weight:800; }
.cc-journey-step h3 { font-size:1rem;margin:0 0 4px; }
.cc-journey-step p { font-size:.82rem;color:#64748b; }
@media(max-width:900px) { .cc-col-hero {grid-template-columns:1fr;padding:26px}.cc-col-stats {grid-template-columns:repeat(2,1fr)}.cc-journey {grid-template-columns:repeat(2,1fr)}.cc-journey::before {display:none} }

/* ===== ANIMATION PACK ===== */
/* navbar */
.cc-nav { transition:height .3s ease,box-shadow .3s ease,background .3s ease; }
.cc-nav-inner { transition:height .3s ease; }
.cc-nav-scrolled { background:rgba(255,255,255,.7)!important;box-shadow:0 12px 34px rgba(20,32,51,.14)!important; }
.cc-nav-scrolled .cc-nav-inner { height:62px; }
.cc-nav-progress { position:absolute;left:0;bottom:-1px;height:3px;z-index:3;background:linear-gradient(90deg,#0f766e,#e08a1e,#fb7185);border-radius:0 3px 3px 0;transition:width .12s linear; }
.cc-logo-mark { transition:transform .45s cubic-bezier(.34,1.56,.64,1); }
.cc-logo:hover .cc-logo-mark { transform:rotate(-10deg) scale(1.12); }
.cc-menu a { position:relative;transition:color .25s ease,background .25s ease,transform .25s ease; }
.cc-menu a:not(.cc-btn)::after { content:"";position:absolute;left:50%;bottom:3px;width:0;height:3px;border-radius:3px;background:linear-gradient(90deg,#0f766e,#e08a1e);transform:translateX(-50%);transition:width .3s cubic-bezier(.34,1.56,.64,1); }
.cc-menu a:not(.cc-btn):hover { transform:translateY(-2px); }
.cc-menu a:not(.cc-btn):hover::after { width:46%; }
.cc-menu-active::after { width:60%!important; }
.cc-menu-apply { position:relative;overflow:hidden; }
.cc-menu-apply::after { content:"";position:absolute;top:0;left:-70%;width:50%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);animation:ccShine 3.2s ease-in-out infinite; }
@keyframes ccShine { 0%,55% {left:-70%} 100% {left:130%} }

/* category tiles */
.cc-categories { gap:12px; }
.cc-cat-btn { position:relative;overflow:hidden;padding:11px 18px 11px 14px;animation:ccTilePop .55s cubic-bezier(.34,1.56,.64,1) both;transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease,border-color .25s ease,color .25s ease!important; }
@keyframes ccTilePop { from {opacity:0;transform:translateY(18px) scale(.85) rotate(-2deg)} to {opacity:1;transform:none} }
.cc-cat-emoji { display:grid;place-items:center;width:30px;height:30px;border-radius:10px;background:#f1f7f5;font-size:16px;transition:transform .4s cubic-bezier(.34,1.56,.64,1); }
.cc-cat-btn:hover { transform:translateY(-4px) scale(1.04);box-shadow:0 14px 26px rgba(15,118,110,.2); }
.cc-cat-btn:hover .cc-cat-emoji { transform:rotate(-14deg) scale(1.25); }
.cc-cat-active { background:linear-gradient(135deg,#0f766e,#115e59 60%,#e08a1e 160%)!important; }
.cc-cat-active .cc-cat-emoji { background:rgba(255,255,255,.22);animation:ccEmojiBounce 1.8s ease-in-out infinite; }
.cc-cat-active::after { content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-20deg);animation:ccShine 2.8s ease-in-out infinite; }
@keyframes ccEmojiBounce { 50% {transform:translateY(-3px) scale(1.12)} }

/* college details drawer */
.cc-drawer-backdrop { place-items:stretch end!important;padding:0!important;background:rgba(6,20,32,.55)!important;backdrop-filter:blur(6px);animation:ccFade .35s ease both; }
@keyframes ccFade { from {opacity:0} to {opacity:1} }
.cc-drawer { width:min(760px,100%)!important;max-height:100vh!important;height:100vh;border-radius:30px 0 0 30px!important;animation:ccDrawerIn .55s cubic-bezier(.16,1,.3,1) both; }
@keyframes ccDrawerIn { from {transform:translateX(100%)} to {transform:none} }
.cc-drawer .cc-modal-hero { height:300px;overflow:hidden; }
.cc-drawer .cc-modal-hero img { animation:ccKen 14s ease-in-out infinite alternate; }
@keyframes ccKen { from {transform:scale(1)} to {transform:scale(1.14)} }
.cc-drawer .cc-modal-hero-overlay h2 { animation:ccRise .7s cubic-bezier(.16,1,.3,1) .2s both; }
.cc-drawer .cc-modal-close { transition:transform .35s cubic-bezier(.34,1.56,.64,1); }
.cc-drawer .cc-modal-close:hover { transform:rotate(90deg) scale(1.1); }
.cc-drawer-chips { display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:-52px 0 8px;position:relative;z-index:2; }
.cc-drawer-chip { padding:12px 10px;border-radius:16px;text-align:center;background:#fff;border:1px solid #e3ece9;box-shadow:0 12px 26px rgba(20,32,51,.14);animation:ccChipPop .55s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes ccChipPop { from {opacity:0;transform:translateY(24px) scale(.8)} to {opacity:1;transform:none} }
.cc-drawer-chip span { font-size:20px; }
.cc-drawer-chip small { display:block;margin-top:2px;color:#64748b;font-size:.68rem;text-transform:uppercase;letter-spacing:.05em; }
.cc-drawer-chip strong { display:block;font-size:.88rem;color:#142033;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.cc-drawer .cc-detail-section { animation:ccRise .6s cubic-bezier(.16,1,.3,1) both; }
.cc-drawer .cc-detail-section:nth-of-type(1) { animation-delay:.35s; }
.cc-drawer .cc-detail-section:nth-of-type(2) { animation-delay:.45s; }
.cc-drawer .cc-detail-section:nth-of-type(3) { animation-delay:.55s; }
.cc-drawer .cc-detail-section:nth-of-type(n+4) { animation-delay:.65s; }
@media(max-width:700px) { .cc-drawer {border-radius:0!important}.cc-drawer-chips {grid-template-columns:repeat(2,1fr);margin-top:-30px} }
@media(prefers-reduced-motion:reduce) { .cc-cat-btn,.cc-drawer,.cc-drawer-backdrop,.cc-drawer-chip,.cc-drawer .cc-detail-section,.cc-drawer .cc-modal-hero img,.cc-menu-apply::after,.cc-cat-active::after,.cc-cat-active .cc-cat-emoji {animation:none!important} }
`;