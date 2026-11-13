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
import LoginView from "./login.jsx";
import homeStudentImage from "../../assets/home student.png";
import aboutStudentImage from "../../assets/about student.jpg";

function InlineLogin({ users, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    setError("");

    const match = users.find(
      (user) =>
        String(user?.email || "").trim().toLowerCase() ===
        email.trim().toLowerCase(),
    );

    if (!match) {
      setError("No account found with this email.");
      return;
    }

    if (String(match?.password || "") !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    onSuccess({ ...match, provider: "email" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f1f2f6",
        fontFamily: "Segoe UI, system-ui, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 18px 40px rgba(17,24,39,.15)",
        }}
      >
        <h2 style={{ margin: "0 0 6px" }}>Sign in</h2>
        <p style={{ margin: "0 0 16px", color: "#6b7280", fontSize: 14 }}>
          Enter your registered email to continue.
        </p>
        <form
          onSubmit={submit}
          style={{ display: "grid", gap: 12 }}
        >
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "11px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              fontSize: 14,
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "11px 12px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              fontSize: 14,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              border: 0,
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>
        {error ? (
          <p style={{ color: "#b91c1c", fontSize: 13, marginTop: 12 }}>
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

const API_ORIGIN = window.location.origin;

/* =========================================================
   ICONS
========================================================= */

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
  globe:
    "M12 21a9 9 0 100-18 9 9 0 000 18zm0-18c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21M12 3c-2.2 2.4-3.3 5.4-3.3 9S9.8 18.6 12 21M3 12h18",
  phone:
    "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .3 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.4 1.8.6 2.8.7A2 2 0 0122 16.9z",
  book:
    "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 016.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z",
  building:
    "M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2",
  calendar:
    "M6 2v4M18 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
};

/* =========================================================
   ICON COMPONENT
========================================================= */

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

/* =========================================================
   NAVIGATION
========================================================= */

const NAV = [
  { label: "Home", href: "#home", route: "/student/dashboard" },
  { label: "Colleges", href: "#colleges", route: "/student/colleges" },
  { label: "Courses", href: "#courses", route: "/student/courses" },
  { label: "About", href: "#about", route: "/student/about" },
];

/* =========================================================
   APPLY NOW  (applications are stored in localStorage)
   Moved out of StudentDashboard.jsx. Logic is unchanged.
========================================================= */

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

// Each category lists the `category` values used in the existing college data
// and which cutoff rule applies to it. Colleges are never hardcoded: a category
// fills up automatically as soon as colleges with that category exist.
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

// Cutoff is shown only for Engineering, Health and Medical Science and
// Agriculture. weights: how much each mark counts; max: highest possible value.
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

// the cutoff rule depends on the category and, for health, on the course
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

// fields whose change can alter the auto-calculated cutoff
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
  "#2478FC",
  "#7C3AED",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#EF4444",
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

// returns the calculated cutoff, or null while any needed mark is missing/invalid
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

// also used by the Profile form in StudentDashboard.jsx
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

// also used by the Profile form in StudentDashboard.jsx
function ApplyField({ id, label, error, full, children }) {
  return (
    <div
      className={`cc-apply-field${full ? " cc-apply-full" : ""}${error ? " has-error" : ""}`}
    >
      <label htmlFor={id}>
        {label} <span aria-hidden="true">*</span>
      </label>
      {children}
      {error && (
        <small className="cc-apply-error" id={`${id}-error`} role="alert">
          {error}
        </small>
      )}
    </div>
  );
}

/* =========================================================
   STYLES  (card layout; reuses the existing .cc-apply-* rules)
========================================================= */

const APPLY_STYLE = `
.cc-apply-modal.cc-ap-modal {
  width: min(940px, 100%);
  background: #F4F7FB;
}

.cc-ap-modal .cc-apply-success {
  background: #fff;
}

.cc-apply-form.cc-ap-form {
  padding: 30px 28px 26px;
}

.cc-ap-head {
  margin-bottom: 18px;
  padding-right: 44px;
}

.cc-ap-head .cc-apply-sub {
  margin-bottom: 0;
}

.cc-ap-body {
  display: grid;
  gap: 16px;
}

.cc-ap-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px 24px 24px;
  box-shadow: 0 2px 10px rgba(6,31,58,.05);
}

.cc-ap-card .cc-ap-card-title {
  margin: 0 0 18px;
  text-align: center;
  font-size: .95rem;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: var(--navy);
}

.cc-ap-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 20px;
}

.cc-ap-card .cc-apply-control {
  border-radius: 12px;
  background: #fff;
}

.cc-ap-card .cc-apply-control:disabled {
  background: #F8FAFC;
}

.cc-ap-note {
  grid-column: 1 / -1;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--blue-25);
  border: 1px solid #d5e6fb;
  color: var(--muted-dark);
  font-size: .88rem;
  text-align: center;
}

.cc-ap-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 20px;
  margin: 0;
  text-align: center;
}

.cc-ap-summary dt {
  font-size: .78rem;
  color: var(--muted);
}

.cc-ap-summary dd {
  margin: 4px 0 0;
  font-weight: 700;
  color: var(--navy);
  overflow-wrap: anywhere;
}

.cc-ap-actions {
  margin-top: 20px;
}

@media (max-width: 680px) {
  .cc-apply-form.cc-ap-form {
    padding: 24px 14px 18px;
  }

  .cc-ap-card {
    padding: 18px 16px 20px;
  }

  .cc-ap-grid,
  .cc-ap-summary {
    grid-template-columns: 1fr;
  }
}
`;

/* =========================================================
   COMPONENT

   props
   - college            college opened from a college page (or null)
   - colleges           all loaded colleges
   - courseIndex        course lookup built by the dashboard
   - helpers            { getCategory, getCollegeName, getLocation,
                          courseDetails, toText } from the dashboard
   - user, profile      logged-in user + saved profile (used to pre-fill)
   - userKey            key used to store/find this user's applications
   - myApplications     this user's saved applications (duplicate check)
   - onClose            close the form
   - onSubmitted(list)  called with the full saved applications list
   - onViewApplications go to "My applications" after success
========================================================= */

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
  // every loaded college tagged with its apply category. A college that
  // appears in two files (e.g. Medical and Allied) is merged into one entry
  // with the combined course list.
  const applyColleges = useMemo(() => {
    const { getCategory, getCollegeName, getLocation, courseDetails, toText } =
      helpers;
    const merged = new Map();

    colleges.forEach((item) => {
      const raw = getCategory(item);
      const category = APPLY_CATEGORIES.find((entry) =>
        entry.match.includes(raw),
      );
      if (!category) return;

      const name = getCollegeName(item);
      const place = getLocation(item);
      const key = applyKeyFor(category.id, name, place);

      const names = courseDetails(item, courseIndex)
        .map((course) => toText(course.courseName))
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
          label: item.courses.length ? label : `${label} (courses not listed)`,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [colleges, courseIndex, helpers]);

  // college opened from a college page -> category + college pre-selected
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
  const calculatedCutoff = cutoffRule
    ? computeCutoff(cutoffRule, applyForm)
    : null;
  // shows the auto-calculated value unless the student typed their own
  const cutoffValue =
    applyForm.cutoff !== ""
      ? applyForm.cutoff
      : calculatedCutoff !== null
        ? String(calculatedCutoff)
        : "";

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const updateApplyField = (name, value) => {
    setApplyForm((prev) => {
      if (name === "categoryId") {
        return { ...prev, categoryId: value, collegeKey: "", course: "", cutoff: "" };
      }
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
      status: "Submitted",
      appliedOn: new Date().toISOString(),
    };

    const next = [record, ...readApplications()];

    try {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
    } catch {
      setApplyErrors({
        form: "Could not save your application. Please enable browser storage and try again.",
      });
      return;
    }

    onSubmitted(next);
    setApplyErrors({});
    setApplySubmitted(true);
  };

  /* ---------- small field helpers ---------- */

  const textField = (name, label, props, full) => (
    <ApplyField
      id={`apply-${name}`}
      label={label}
      error={applyErrors[name]}
      full={full}
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

  const markField = (name, label, placeholder, full) => (
    <ApplyField
      key={name}
      id={`apply-${name}`}
      label={label}
      error={applyErrors[name]}
      full={full}
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

  return (
    <>
      <style>{APPLY_STYLE}</style>

      <div
        className="cc-modal-backdrop cc-apply-backdrop"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div
          className="cc-modal cc-apply-modal cc-ap-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-title"
        >
          <button
            type="button"
            className="cc-modal-close"
            aria-label="Close application form"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {applySubmitted ? (
            <div className="cc-apply-success" role="status">
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
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
                </svg>
              </span>
              <h2 id="apply-title">Application submitted</h2>
              <p>Your application has been submitted successfully!</p>

              <div className="cc-apply-actions">
                <button
                  type="button"
                  className="cc-btn cc-btn-ghost"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="cc-btn cc-btn-primary cc-glow-btn"
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
                  Fill in each section below and submit your application.
                </p>
              </div>

              {applyErrors.form && (
                <div className="cc-apply-alert" role="alert">
                  {applyErrors.form}
                </div>
              )}

              <div className="cc-ap-body">
                {/* A. PERSONAL DETAILS */}
                <section className="cc-ap-card">
                  <h3 className="cc-ap-card-title">Personal Details</h3>

                  <div className="cc-ap-grid">
                    {textField(
                      "studentName",
                      "Student Name",
                      {
                        input: {
                          type: "text",
                          autoComplete: "name",
                          placeholder: "Full name",
                        },
                      },
                      true,
                    )}

                    {textField("mobile", "Mobile Number", {
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
                      input: {
                        type: "email",
                        autoComplete: "email",
                        placeholder: "you@example.com",
                      },
                    })}
                  </div>
                </section>

                {/* B. EDUCATION DETAILS */}
                <section className="cc-ap-card">
                  <h3 className="cc-ap-card-title">Education Details</h3>

                  <div className="cc-ap-grid">
                    <ApplyField
                      id="apply-categoryId"
                      label="College Category"
                      error={applyErrors.categoryId}
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

                    <ApplyField
                      id="apply-stream"
                      label="Group"
                      error={applyErrors.stream}
                    >
                      <select
                        id="apply-stream"
                        className="cc-apply-control"
                        value={applyForm.stream}
                        aria-invalid={Boolean(applyErrors.stream)}
                        onChange={(event) =>
                          updateApplyField("stream", event.target.value)
                        }
                      >
                        <option value="">Select your group</option>
                        {APPLY_STREAMS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </ApplyField>

                    {applyLocked && applyCollege && applyCategory ? (
                      <div className="cc-apply-full cc-apply-locked">
                        <div>
                          <span className="cc-apply-locked-label">
                            Applying to
                          </span>
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
                        label="College Name"
                        error={applyErrors.collegeKey}
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
                      label="Course Name"
                      error={applyErrors.course}
                      full
                    >
                      <select
                        id="apply-course"
                        className="cc-apply-control"
                        value={applyForm.course}
                        disabled={!applyCollege}
                        aria-invalid={Boolean(applyErrors.course)}
                        onChange={(event) =>
                          updateApplyField("course", event.target.value)
                        }
                      >
                        <option value="">
                          {!applyCollege
                            ? "Select a college first"
                            : applyCollege.courses.length === 0
                              ? "No courses listed for this college"
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
                          {applyCollege.courses.length === 1 ? "" : "s"}{" "}
                          available at this college
                        </small>
                      )}
                    </ApplyField>
                  </div>
                </section>

                {/* C. 10TH STANDARD MARKS */}
                <section className="cc-ap-card">
                  <h3 className="cc-ap-card-title">10th Standard Marks</h3>

                  <div className="cc-ap-grid">
                    {markField("mark10", "10th Standard Mark (%)", "e.g. 90", true)}
                  </div>
                </section>

                {/* D. 12TH STANDARD MARKS */}
                <section className="cc-ap-card">
                  <h3 className="cc-ap-card-title">12th Standard Marks</h3>

                  <div className="cc-ap-grid">
                    {markField(
                      "mark12",
                      "12th Standard Mark (%)",
                      "e.g. 85.5",
                      !cutoffRule || cutoffRule.fields.length === 0,
                    )}

                    {cutoffRule &&
                      cutoffRule.fields.map((key) =>
                        markField(
                          key,
                          `${SUBJECT_FIELDS[key]} Mark`,
                          "out of 100",
                        ),
                      )}

                    {cutoffRule ? (
                      <ApplyField
                        id="apply-cutoff"
                        label={cutoffRule.label || "Cutoff Mark"}
                        error={applyErrors.cutoff}
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
                    ) : (
                      <ApplyField
                        id="apply-cutoff"
                        label="Cutoff Mark"
                        full
                      >
                        <input
                          id="apply-cutoff"
                          type="number"
                          className="cc-apply-control"
                          placeholder={
                            applyCategory
                              ? "Not required for this category"
                              : "Select a category first"
                          }
                          value=""
                          disabled
                          readOnly
                        />
                      </ApplyField>
                    )}
                  </div>
                </section>

                <div className="cc-apply-actions cc-ap-actions">
                  <button
                    type="button"
                    className="cc-btn cc-btn-ghost"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cc-btn cc-btn-primary cc-btn-lg cc-glow-btn"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   COURSE CATALOGUE (general list, NOT per-college availability)
========================================================= */

const COURSE_CATALOG = [
  {
    id: "engineering", label: "Engineering", icon: "grid",
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
    id: "arts", label: "Arts and Science", icon: "book",
    courses: [
      "B.Sc Computer Science", "B.Sc Information Technology", "B.Sc Mathematics",
      "B.Sc Physics", "B.Sc Chemistry", "B.Sc Biotechnology", "B.Sc Microbiology",
      "B.Sc Biochemistry", "B.Sc Psychology", "B.Sc Visual Communication",
      "B.Sc Statistics", "BCA", "B.Com", "B.Com Computer Applications", "BBA",
      "BA English", "BA Tamil", "BA Economics", "BA History", "BA Political Science", "BSW",
    ],
  },
  {
    id: "physiotherapy", label: "Physiotherapy", icon: "check",
    courses: [
      "Bachelor of Physiotherapy (BPT)", "Master of Physiotherapy (MPT)",
      "MPT Orthopaedics", "MPT Neurology", "MPT Sports Physiotherapy",
      "MPT Cardiopulmonary", "MPT Paediatrics", "MPT Community Physiotherapy",
    ],
  },
  {
    id: "allied", label: "Allied Health Sciences", icon: "building",
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
    id: "pharmacy", label: "Pharmacy", icon: "sparkle",
    courses: [
      "Bachelor of Pharmacy (B.Pharm)", "Diploma in Pharmacy (D.Pharm)",
      "Doctor of Pharmacy (Pharm.D)", "Master of Pharmacy (M.Pharm)",
      "M.Pharm Pharmaceutics", "M.Pharm Pharmacology",
      "M.Pharm Pharmaceutical Chemistry", "M.Pharm Pharmacognosy",
      "M.Pharm Pharmacy Practice",
    ],
  },
  {
    id: "law", label: "Law", icon: "cap",
    courses: ["BA LLB", "BBA LLB", "B.Com LLB", "B.Sc LLB", "LLB", "LLM", "BBA LLB (Hons.)"],
  },
  {
    id: "agriculture", label: "Agriculture", icon: "globe",
    courses: [
      "B.Sc Agriculture", "B.Sc Horticulture", "B.Sc Forestry",
      "B.Tech Agricultural Engineering", "B.Sc Sericulture",
      "B.Sc Agribusiness Management", "B.Sc Food Science and Technology",
      "B.Sc Fisheries Science", "B.Sc Seed Science and Technology",
    ],
  },
  {
    id: "medical", label: "Medical", icon: "star",
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

// cutoff applies only to these types (value = max). Others hide the field.
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

const isProfileComplete = (p) =>
  Boolean(
    p && p.isProfileCompleted === true && Object.keys(validateProfile(p)).length === 0,
  );

function ProfileForm({ initial, mandatory, onSave, onSaved, onCancel }) {
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

  return (
    <section className="cc-section">
      <div className="cc-wrap">
        <form className="cc-profile-card" onSubmit={submit} noValidate>
          <span className="cc-eyebrow">
            {mandatory ? "Step required" : "My profile"}
          </span>
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
            {field("fullName", { input: { type: "text", placeholder: "Your full name", autoComplete: "name" } }, true)}
            {field("nativePlace", { input: { type: "text", placeholder: "Town / village / city" } })}
            {field("schoolName", { input: { type: "text", placeholder: "Your school name" } })}
            {field("mobileNumber", {
              clean: (v) => v.replace(/\D/g, "").slice(0, 10),
              input: { type: "tel", inputMode: "numeric", maxLength: 10, placeholder: "10-digit mobile number", autoComplete: "tel-national" },
            }, true)}

            <h3 className="cc-apply-full cc-profile-title">Education Details</h3>
            <ApplyField id="profile-interestedCollegeType" label={PROFILE_LABELS.interestedCollegeType} error={errors.interestedCollegeType}>
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

            <ApplyField id="profile-interestedLocation" label={PROFILE_LABELS.interestedLocation} error={errors.interestedLocation}>
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
              <ApplyField id="profile-cutoffMark" label={form.interestedCollegeType === "Medical" ? "NEET-UG Score (Cutoff)" : "Cutoff Mark"} error={errors.cutoffMark} full>
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
              {saving ? "Saving…" : mandatory ? "Save Profile" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ProfileView({ profile, onSave, onSaved }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <ProfileForm
        initial={profile}
        mandatory={false}
        onSave={onSave}
        onSaved={(data) => { onSaved(data); setEditing(false); }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  const rows = PROFILE_FIELD_ORDER.filter(
    (k) => k !== "cutoffMark" || profile.cutoffMark !== null,
  ).map((k) => [
    k === "cutoffMark" && profile.interestedCollegeType === "Medical"
      ? "NEET-UG Score (Cutoff)"
      : PROFILE_LABELS[k],
    profile[k],
  ]);

  return (
    <section className="cc-section">
      <div className="cc-wrap">
        <div className="cc-profile-card">
          <span className="cc-eyebrow">My profile</span>
          <h2>{profile.fullName}</h2>
          <dl className="cc-profile-grid">
            {rows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{String(value)}</dd>
              </div>
            ))}
          </dl>
          <div className="cc-apply-actions">
            <button type="button" className="cc-btn cc-btn-primary cc-glow-btn" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HELPERS
========================================================= */

const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const toList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);

  if (value === undefined || value === null || value === "") {
    return [];
  }

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
  if (Array.isArray(college?.courses)) {
    return college.courses;
  }

  if (Array.isArray(college?.courseDetails)) {
    return college.courseDetails;
  }

  return [];
};

/* facilities can be an object ({hostel, placement...}) or an array of strings */
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

// Course ids repeat across the data files (Pharmacy and Law both use 701-706),
// so a course is looked up by its college's category first.
const findCourse = (courseIndex, college, id) =>
  courseIndex[`${getCategory(college)}:${id}`] || courseIndex[String(id)];

const courseNamesFromOldData = (college, courseIndex) => {
  const ids = Array.isArray(college?.courseIds)
    ? college.courseIds
    : college?.courseIds !== undefined
      ? [college.courseIds]
      : [];

  return ids
    .map((id) => {
      const course = findCourse(courseIndex, college, id);

      if (!course) return "";

      return toText(
        course.name ||
          course.title ||
          course.courseName ||
          course.basicDetails?.courseName,
      );
    })
    .filter(Boolean);
};

const courseNames = (college, courseIndex) => {
  const nestedCourses = getCourses(college);

  if (nestedCourses.length > 0) {
    return nestedCourses
      .map((course) =>
        toText(
          course.courseName ||
            course.name ||
            course.title ||
            course.basicDetails?.courseName,
        ),
      )
      .filter(Boolean);
  }

  return courseNamesFromOldData(college, courseIndex);
};

const courseDetails = (college, courseIndex) => {
  const nestedCourses = getCourses(college);

  if (nestedCourses.length > 0) {
    return nestedCourses;
  }

  const ids = toList(college?.courseIds);

  return ids
    .map((id) => findCourse(courseIndex, college, id))
    .filter(Boolean)
    .map((course) => ({
      courseName: toText(
        course.name ||
          course.title ||
          course.courseName ||
          course.basicDetails?.courseName,
      ),
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

// helpers handed to ApplyNow.jsx so it reads college data the same way
const APPLY_HELPERS = {
  getCategory,
  getCollegeName,
  getLocation,
  courseDetails,
  toText,
};

const matchesCollege = (college, courseIndex, search) => {
  if (!search) return true;

  const courses = courseNames(college, courseIndex);

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
    ...courses,
    ...getFacilityList(college),
    toText(admission.admissionProcess),
    toText(admission.cutoff),
    toText(admission.counselling),
    toText(admission.importantDates),
    toText(facilities.hostel),
    toText(facilities.placement),
    toText(facilities.scholarship),
    toText(facilities.transport),
    toText(facilities.infrastructure),
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

/* LOADING */

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
   MAIN COMPONENT
========================================================= */

export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // every page is rendered on its own route
  const view = location.pathname.startsWith("/student/colleges")
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

  const login = (profile) => {
    try {
      localStorage.setItem("scp_session", JSON.stringify(profile));
    } catch {
      /* storage unavailable */
    }
    setSession(profile);
  };

  const logout = () => {
    try {
      localStorage.removeItem("scp_session");
    } catch {
      /* storage unavailable */
    }
    setSession(null);
  };

  const user = session;

  // navigate between the Home page and the separate Colleges page
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

  const userInitials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";
  const userFirstName = user?.name?.trim().split(/\s+/)[0] || "Student";
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [healthSub, setHealthSub] = useState("Medical");
  const [sort, setSort] = useState("rating-desc");

  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  /* =======================================================
     LOAD DATA FROM JSON FILES (imported, no server)
  ======================================================= */

  useEffect(() => {
    setLoading(true);
    setError("");

    // sources: engineering (db.json) + arts + healthcare + law
    const engList = Array.isArray(dbData?.colleges) ? dbData.colleges : [];
    const artsList = Array.isArray(artsData?.colleges) ? artsData.colleges : [];
    const engCourses = Array.isArray(dbData?.courses) ? dbData.courses : [];
    const artsCourses = Array.isArray(artsData?.courses)
      ? artsData.courses
      : [];
    const medicalList = Array.isArray(medicalData?.colleges)
      ? medicalData.colleges
      : [];
    const medicalCourses = Array.isArray(medicalData?.courses)
      ? medicalData.courses
      : [];
    const nursingList = Array.isArray(nursingData?.colleges)
      ? nursingData.colleges
      : [];
    const nursingCourses = Array.isArray(nursingData?.courses)
      ? nursingData.courses
      : [];
    const alliedList = Array.isArray(alliedData?.colleges)
      ? alliedData.colleges
      : [];
    const alliedCourses = Array.isArray(alliedData?.courses)
      ? alliedData.courses
      : [];
    const physiotherapyList = Array.isArray(physiotherapyData?.colleges)
      ? physiotherapyData.colleges
      : [];
    const physiotherapyCourses = Array.isArray(physiotherapyData?.courses)
      ? physiotherapyData.courses
      : [];
    const pharmacyList = Array.isArray(pharmacyData?.colleges)
      ? pharmacyData.colleges
      : [];
    const pharmacyCourses = Array.isArray(pharmacyData?.courses)
      ? pharmacyData.courses
      : [];
    const lawList = Array.isArray(lawData?.colleges)
      ? lawData.colleges
      : [];
    const lawCourses = Array.isArray(lawData?.courses)
      ? lawData.courses
      : [];
    const links = Array.isArray(dbData?.collegeCourses)
      ? dbData.collegeCourses
      : [];

    // build course ids per college from the collegeCourses join table
    const byCollege = {};

    links.forEach((link) => {
      const collegeId = link.collegeId ?? link.college_id;
      const courseId = link.courseId ?? link.course_id;

      if (collegeId == null || courseId == null) return;

      const key = String(collegeId);
      if (!byCollege[key]) byCollege[key] = [];
      byCollege[key].push(courseId);
    });

    // The collegeCourses join table only maps engineering colleges, so it must
    // not be applied to arts colleges (their ids overlap with engineering ids).
    const decorate = (college, withLinks) => ({
      ...college,
      courseIds: [
        ...new Set([
          ...toList(college.courseIds),
          ...(withLinks ? byCollege[String(college.id)] || [] : []),
        ]),
      ],
    });

    setColleges([
      ...engList.map((college) => decorate(college, true)),
      ...artsList.map((college) => decorate(college, false)),
      ...medicalList.map((college) => decorate(college, false)),
      ...nursingList.map((college) => decorate(college, false)),
      ...alliedList.map((college) => decorate(college, false)),
      ...physiotherapyList.map((college) => decorate(college, false)),
      ...pharmacyList.map((college) => decorate(college, false)),
      ...lawList.map((college) => decorate(college, false)),
    ]);
    setCourses([
      ...engCourses,
      ...artsCourses,
      ...medicalCourses,
      ...nursingCourses,
      ...alliedCourses,
      ...physiotherapyCourses,
      ...pharmacyCourses,
      ...lawCourses,
    ]);
    setLoading(false);
  }, []);

  /* =======================================================
     CLOSE MODAL WITH ESC
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* =======================================================
     COURSE INDEX
  ======================================================= */

  const courseIndex = useMemo(() => {
    const index = {};

    courses.forEach((course) => {
      if (course?.id !== undefined) {
        index[String(course.id)] = course;

        if (course.category) {
          index[`${course.category}:${course.id}`] = course;
        }
      }
    });

    return index;
  }, [courses]);

  /* =======================================================
     APPLY NOW  (the form itself lives in ApplyNow.jsx)
     applyTarget === null          -> form closed
     applyTarget === { college }   -> form open
                                      (college is null when opened from navbar)
  ======================================================= */

  const [applyTarget, setApplyTarget] = useState(null);
  const [applications, setApplications] = useState(readApplications);

  const userKey = (user?.email || user?.name || "").trim().toLowerCase();

  /* ---------- profile + course category state ---------- */
  const [profiles, setProfiles] = useState(readProfiles);
  const [courseCat, setCourseCat] = useState("engineering");

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

    if (location.pathname !== "/student/dashboard") {
      navigate("/student/dashboard");
    }

    setTimeout(() => {
      document.getElementById("applications")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  };

  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const cityOptions = useMemo(() => {
    return [
      ...new Set(
        colleges.map((college) => getLocation(college)).filter(Boolean),
      ),
    ].sort();
  }, [colleges]);

  const typeOptions = useMemo(() => {
    return [
      ...new Set(
        colleges.map((college) => getCollegeType(college)).filter(Boolean),
      ),
    ].sort();
  }, [colleges]);

  const COLLEGE_CATEGORIES = ["Engineering", "Arts", "Healthcare & Medical Sciences", "Law"];

  // subcategories shown under the "Healthcare & Medical Sciences" umbrella
  const HEALTH_SUBCATEGORIES = [
    "Medical",
    "Nursing",
    "Allied Health",
    "Physiotherapy",
    "Pharmacy",
  ];

  // maps a subcategory tab to the `category` value stored on the colleges
  const HEALTH_SUB_TO_CATEGORY = {
    Medical: "Medical",
    Nursing: "Nursing",
    "Allied Health": "Allied",
    Physiotherapy: "Physiotherapy",
    Pharmacy: "Pharmacy",
  };

  const isHealthGroup = category === "Healthcare & Medical Sciences";

  // the concrete category used for filtering/headings
  const activeCategory = isHealthGroup
    ? HEALTH_SUB_TO_CATEGORY[healthSub] ?? "Medical"
    : category;

  const categoryCounts = useMemo(() => {
    const counts = {};
    colleges.forEach((college) => {
      const cat = getCategory(college);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [colleges]);

  // count of all healthcare colleges combined (for the umbrella tab)
  const healthGroupCount =
    (categoryCounts.Medical ?? 0) +
    (categoryCounts.Nursing ?? 0) +
    (categoryCounts.Allied ?? 0) +
    (categoryCounts.Physiotherapy ?? 0) +
    (categoryCounts.Pharmacy ?? 0);

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const visibleColleges = useMemo(() => {
    const needle = search.trim().toLowerCase();

    let result = colleges.filter((college) => {
      if (city && getLocation(college) !== city) {
        return false;
      }

      if (type && getCollegeType(college) !== type) {
        return false;
      }

      if (activeCategory && getCategory(college) !== activeCategory) {
        return false;
      }

      return matchesCollege(college, courseIndex, needle);
    });

    result = [...result];

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
      result.sort((a, b) =>
        getCollegeName(a).localeCompare(getCollegeName(b)),
      );
    }

    return result;
  }, [colleges, courseIndex, search, city, type, activeCategory, sort]);

  /* =======================================================
     PAGINATION
  ======================================================= */

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

  /* =======================================================
     STATS
  ======================================================= */

  const totalCourseOptions = colleges.reduce((total, college) => {
    const nested = getCourses(college);

    if (nested.length > 0) {
      return total + nested.length;
    }

    return total + toList(college?.courseIds).length;
  }, 0);

  const stats = [
    {
      value: colleges.length,
      label: "Colleges listed",
    },
    {
      value: courses.length || "8+",
      label: "Courses available",
    },
    {
      value: totalCourseOptions || "80+",
      label: "Course options",
    },
    {
      value: new Set(
        colleges.map((college) => getLocation(college)).filter(Boolean),
      ).size,
      label: "Cities covered",
    },
  ];

  /* =======================================================
     FILTER RESET
  ======================================================= */

  const filtersActive = Boolean(search || city || type || category);

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setType("");
    setCategory("Engineering");
    setHealthSub("Medical");
  };

  /* =======================================================
     SELECTED COLLEGE
  ======================================================= */

  const selectedCourses = selected ? courseDetails(selected, courseIndex) : [];

  const selectedFacilities = selected ? getFacilities(selected) : {};

  const selectedFacilityList = selected ? getFacilityList(selected) : [];

  const selectedImage = selected
    ? resolveImage(selected.image || selected.basicDetails?.image)
    : "";

  /* =======================================================
     AUTH GATE
  ======================================================= */

  if (!session) {
    return (
      <>
        {LoginView ? (
          <LoginView
            users={Array.isArray(dbData?.users) ? dbData.users : []}
            onSuccess={login}
          />
        ) : (
          <InlineLogin
            users={Array.isArray(dbData?.users) ? dbData.users : []}
            onSuccess={login}
          />
        )}
      </>
    );
  }

  /* =======================================================
     PROFILE GATE: nothing else renders until profile is complete
  ======================================================= */

  if (!profileDone) {
    return (
      <>
        <style>{STYLE}</style>
        <style>{USER_STYLE}</style>
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

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <>
      <style>{STYLE}</style>
      <style>{USER_STYLE}</style>

      <div className="cc-root" id="home">
        {/* =================================================
            NAVBAR
        ================================================= */}

        <header className="cc-nav">
          <input
            type="checkbox"
            id="cc-nav-toggle"
            className="cc-nav-toggle"
          />

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

        {/* =================================================
            HERO + ABOUT  (Home page only)
        ================================================= */}

        {view === "home" && (
          <>
        {/* =================================================
            HERO
        ================================================= */}

        <section className="cc-hero">
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

        {myApplications.length > 0 && (
          <section className="cc-section cc-apps" id="applications">
            <div className="cc-wrap">
              <span className="cc-eyebrow">My applications</span>
              <h2>Your submitted applications</h2>

              <div className="cc-apps-grid">
                {myApplications.map((app) => (
                  <article className="cc-app-card" key={app.id}>
                    <div className="cc-app-head">
                      <div>
                        <h3>{app.collegeName}</h3>
                        <p>
                          {[app.city, app.categoryLabel]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <span className="cc-app-status">{app.status}</span>
                    </div>

                    <div className="cc-app-course">{app.courseName}</div>

                    <dl className="cc-app-facts">
                      <div>
                        <dt>Student</dt>
                        <dd>{app.studentName}</dd>
                      </div>
                      <div>
                        <dt>Mobile</dt>
                        <dd>{app.mobile}</dd>
                      </div>
                      {app.email && (
                        <div>
                          <dt>Email</dt>
                          <dd>{app.email}</dd>
                        </div>
                      )}
                      <div>
                        <dt>12th mark</dt>
                        <dd>{app.mark12}%</dd>
                      </div>
                      <div>
                        <dt>10th mark</dt>
                        <dd>{app.mark10}%</dd>
                      </div>
                      <div>
                        <dt>Stream</dt>
                        <dd>{app.stream}</dd>
                      </div>
                      {app.cutoff != null && (
                        <div>
                          <dt>Cutoff</dt>
                          <dd>
                            {app.cutoff} / {app.cutoffMax}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt>Applied on</dt>
                        <dd>
                          {new Date(app.appliedOn).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
          </>
        )}

        {/* =================================================
            ABOUT  (separate page)
        ================================================= */}

        {view === "about" && (
          <>
        <section className="cc-section" id="about">
          <div className="cc-wrap cc-about">
            <div>
              <span className="cc-eyebrow">About us</span>

              <h2>Everything you need to choose your college</h2>

              <p className="cc-about-text">
                Students can explore colleges and view their basic details,
                institution type, courses, admission information and
                facilities.
              </p>

              <p className="cc-about-text">
                The college information is fetched from the database, making
                it easier to search and compare colleges without manually
                entering information into the frontend.
              </p>

              <ul className="cc-about-list">
                <li>
                  <Icon name="check" size={18} />
                  Basic college information
                </li>

                <li>
                  <Icon name="check" size={18} />
                  Course, eligibility and fee details
                </li>

                <li>
                  <Icon name="check" size={18} />
                  College information and facilities
                </li>

                <li>
                  <Icon name="check" size={18} />
                  Hostel, placement and campus facilities
                </li>
              </ul>
            </div>

            <div className="cc-about-img">
              <img src={aboutStudentImage} alt="College campus" />
            </div>
          </div>
        </section>
          </>
        )}

        {/* =================================================
            COURSES  (separate page)
        ================================================= */}

        {view === "courses" && (() => {
          const active =
            COURSE_CATALOG.find((c) => c.id === courseCat) || COURSE_CATALOG[0];

          return (
            <section className="cc-section cc-colleges" id="courses">
              <div className="cc-wrap">
                <div className="cc-col-head">
                  <span className="cc-eyebrow">Course Catalogue</span>
                  <h2>{active.label} Courses</h2>
                  <p>
                    This is the general course catalogue. Not every college
                    offers every course, so check each college's details for
                    what it actually offers.
                  </p>
                </div>

                <div className="cc-categories" role="tablist">
                  {COURSE_CATALOG.map((cat) => (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={cat.id === active.id}
                      key={cat.id}
                      className={`cc-cat-btn ${
                        cat.id === active.id ? "cc-cat-active" : ""
                      }`}
                      onClick={() => setCourseCat(cat.id)}
                    >
                      <Icon name={cat.icon} size={16} />
                      {cat.label}
                      <span className="cc-cat-count">{cat.courses.length}</span>
                    </button>
                  ))}
                </div>

                <div className="cc-course-cards">
                  {active.courses.map((course) => (
                    <div className="cc-course-tile" key={course}>
                      <span className="cc-icon-circle">
                        <Icon name={active.icon} size={20} />
                      </span>
                      <strong>{course}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* =================================================
            PROFILE  (separate page)
        ================================================= */}

        {view === "profile" && (
          <ProfileView
            profile={profile}
            onSave={persistProfile}
            onSaved={profileSaved}
          />
        )}

        {/* =================================================
            COLLEGE SECTION  (separate page)
        ================================================= */}

        {view === "colleges" && (
          <>
        <section className="cc-section cc-colleges" id="colleges">
          <div className="cc-wrap">
            <div className="cc-col-head">
              <span className="cc-eyebrow">College Directory</span>

              <h2>Explore {activeCategory} Colleges</h2>

              <p>
                Search colleges and view complete information including basic
                details, institution type, courses, fees, eligibility and
                facilities.
              </p>
            </div>

            {/* CATEGORY TABS */}

            <div className="cc-categories">
              {COLLEGE_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  className={`cc-cat-btn ${
                    category === cat ? "cc-cat-active" : ""
                  }`}
                  onClick={() => {
                    setCategory(cat);
                    if (cat === "Healthcare & Medical Sciences") {
                      setHealthSub("Medical");
                    }
                  }}
                >
                  {cat}
                  <span className="cc-cat-count">
                    {cat === "Healthcare & Medical Sciences"
                      ? healthGroupCount
                      : categoryCounts[cat] ?? 0}
                  </span>
                </button>
              ))}
            </div>

            {/* SUB-CATEGORY DROPDOWN (Healthcare & Medical Sciences) */}

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

            {/* SEARCH/FILTER */}

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

            {/* RESULT COUNT */}

            {!loading && !error && (
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
            )}

            {/* LOADING */}

            {loading && (
              <div className="cc-state">
                <span className="cc-spinner" />
                <strong>Loading colleges...</strong>
              </div>
            )}

            {/* ERROR */}

            {!loading && error && (
              <div className="cc-state">
                <Icon name="close" size={26} />

                <strong>{error}</strong>

                <button
                  className="cc-btn cc-btn-primary cc-btn-sm"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* EMPTY */}

            {!loading && !error && visibleColleges.length === 0 && (
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

            {/* COLLEGE CARDS */}

            {!loading && !error && visibleColleges.length > 0 && (
              <>
                <div className="cc-grid">
                  {paginatedColleges.map((college) => {
                    const name = getCollegeName(college);
                    const location = getLocation(college);
                    const rating = getRating(college);
                    const image = resolveImage(college.image);
                    const names = courseNames(college, courseIndex);

                    return (
                      <article className="cc-card" key={college.id}>
                        <div className="cc-card-media">
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
                                <span
                                  className="cc-tag"
                                  key={`${course}-${index}`}
                                >
                                  {course}
                                </span>
                              ))
                            )}

                            {names.length > 2 && (
                              <span className="cc-tag">
                                +{names.length - 2} more
                              </span>
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
                            className={`cc-page-btn ${
                              currentPage === page ? "cc-page-active" : ""
                            }`}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
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
          </>
        )}

        {/* =================================================
            APPLY NOW  (component lives in ApplyNow.jsx)
        ================================================= */}

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

        {/* =================================================
            COLLEGE DETAILS MODAL
        ================================================= */}

        {selected && (
          <div
            className="cc-modal-backdrop"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setSelected(null);
              }
            }}
          >
            <div className="cc-modal" role="dialog" aria-modal="true">
              {/* CLOSE */}

              <button
                type="button"
                className="cc-modal-close"
                aria-label="Close details"
                onClick={() => setSelected(null)}
              >
                <Icon name="close" size={18} />
              </button>

              {/* IMAGE */}

              {selectedImage && (
                <div className="cc-modal-hero">
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

              {/* CONTENT */}

              <div className="cc-modal-content">
                {!selectedImage && <h2>{getCollegeName(selected)}</h2>}

                <div className="cc-modal-apply-row">
                  <button
                    type="button"
                    className="cc-btn cc-btn-primary cc-glow-btn"
                    onClick={() => openApply(selected)}
                  >
                    Apply Now
                  </button>
                </div>

                {/* BASIC DETAILS */}

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

                {/* INSTITUTION TYPE */}

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

                {/* COURSES */}

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
                            toText(
                              course.courseName || course.name || course.title,
                            ) || "Engineering Course";

                          const degree =
                            toText(course.degree) || "B.E / B.Tech";
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
                                <span className="cc-course-degree">
                                  {degree}
                                </span>
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

                {/* FACILITIES */}

                <section className="cc-detail-section">
                  <div className="cc-detail-section-title">
                    <Icon name="building" size={19} />
                    <strong>Facilities</strong>
                  </div>

                  <div className="cc-detail-section-content">
                    <div className="cc-facility-grid">
                      {/* facilities stored as a list: ["Library", "Hostels", ...] */}
                      {selectedFacilityList.map((facility) => (
                        <div className="cc-facility" key={facility}>
                          <div className="cc-facility-icon">
                            <Icon name="check" size={19} />
                          </div>
                          <strong>{facility}</strong>
                        </div>
                      ))}

                      {/* facilities stored as an object: {hostel, placement, ...} */}
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
                    onClick={() => setSelected(null)}
                  >
                    Close
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
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
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
  background: linear-gradient(120deg, #2478FC, #7C3AED, #EC4899, #F59E0B, #2478FC);
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
