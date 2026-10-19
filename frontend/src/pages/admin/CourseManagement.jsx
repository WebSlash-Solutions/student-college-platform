import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collegesData, getCourseFee } from "./CollegeManagement";

/* =========================================================
   CONSTANTS + HELPERS
========================================================= */

const categories = [
  "Engineering",
  "Arts & Science",
  "Medical",
  "Nursing",
  "Allied Health",
  "Physiotherapy",
  "Agriculture",
  "Law",
];

const categoryIcons = {
  Engineering: "⚙",
  "Arts & Science": "▤",
  Medical: "✚",
  Nursing: "♙",
  "Allied Health": "⚕",
  Physiotherapy: "♧",
  Agriculture: "❧",
  Law: "⚖",
};

const LEVELS = ["UG", "PG", "Diploma", "Others"];
const LEVEL_COLORS = ["#3974ee", "#16bd91", "#ffb14a", "#8c50ed"];
const COLLEGE_PAGE_SIZE = 6;
const COURSE_PAGE_SIZE = 6;

const clean = (value) =>
  String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");

/*
  CollegeManagement.jsx stores courses in two ways:
  1) an array            -> courses: ["B.Com", "BBA", ...]
  2) a fee object        -> courses: engineeringCourseFees  (course name = key)
  Both are supported here, so EVERY college shows exactly the courses that are
  listed for it in CollegeManagement.jsx (no extra / duplicate names).
*/
const getSourceCourses = (college) => {
  const raw = Array.isArray(college?.courses)
    ? college.courses
    : college?.courses && typeof college.courses === "object"
      ? Object.keys(college.courses)
      : [];
  const seen = new Set();
  const list = [];
  raw.forEach((item) => {
    const name = clean(
      typeof item === "string" ? item : item?.name || item?.title,
    );
    const key = name.toLowerCase();
    if (name && !seen.has(key)) {
      seen.add(key);
      list.push(name);
    }
  });
  return list;
};

const levelFor = (name) => {
  const n = clean(name).toLowerCase().replace(/\./g, "");
  if (/(phd|doctoral|doctorate|fellowship|certificate)/.test(n))
    return "Others";
  if (/(diploma|polytechnic|\bgnm\b|\bdmlt\b)/.test(n)) return "Diploma";
  if (
    /^(me|mtech|msc|mcom|ma|mpharm|mphil|march|med|mba|mca|md|ms|mds|mch|dm|mpt|llm)\b/.test(
      n,
    ) ||
    /\b(master|masters|postgraduate|post graduate)\b/.test(n)
  )
    return "PG";
  return "UG";
};

const durationFor = (name, category) => {
  const raw = clean(name).toLowerCase();
  const n = raw.replace(/\./g, "");
  const inName = raw.match(/(\d+(?:\.\d+)?)\s*years?/);
  if (inName) return `${inName[1]} Years`;
  if (/lateral/.test(n)) return "3 Years (Lateral)";
  if (/phd|doctoral|doctorate/.test(n)) return "3–5 Years";
  if (/^llm\b/.test(n)) return "1 Year";
  if (/^(me|mtech|mba|mca|msc|mcom|ma|mpt|mpharm|march|med)\b/.test(n))
    return "2 Years";
  if (/post basic/.test(n)) return "2 Years";
  if (/\bgnm\b/.test(n)) return "3.5 Years";
  if (/diploma|polytechnic/.test(n)) return "3 Years";
  if (/^mbbs\b/.test(n)) return "5.5 Years";
  if (/^bds\b/.test(n)) return "5 Years";
  if (/^bpt\b/.test(n)) return "4.5 Years";
  if (/^barch\b|architecture/.test(n)) return "5 Years";
  if (/^llb\b/.test(n)) return "3 Years";
  if (/^(be|btech)\b/.test(n)) return "4 Years";
  if (/bsc nursing/.test(n)) return "4 Years";
  if (/^bsc \(hons\)|^bsc hons/.test(n)) return "4 Years";
  if (/^(ba|bcom|bsc|bca|bba)\b/.test(n))
    return category === "Allied Health" ? "4 Years" : "3 Years";
  if (category === "Engineering") return "4 Years";
  return "Course specific";
};

// Stable demo seat numbers (same college + course always gives the same value).
// 0 means "No seats available". Real data in college.courseSeats always wins.
const hashStr = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};
const seatsFor = (collegeId, course) => {
  const h = hashStr(`${collegeId}|${course}`);
  if (h % 100 < 18) return 0;
  return 20 + ((h >>> 8) % 25) * 6;
};
const seatLabel = (s) =>
  s === null || s === undefined || s === ""
    ? "Not published"
    : Number(s) === 0
      ? "No seats available"
      : s;

const COURSE_TYPES = ["Regular", "Distance", "Online"];

const draftFrom = (course) => ({
  name: course.name,
  level: course.level,
  duration: course.duration === "Course specific" ? "" : course.duration,
  fee: course.fee === "Not published" ? "" : course.fee,
  seats: course.seats ?? "",
  eligibility: course.eligibility,
  type: course.type || "Regular",
  affiliation: course.affiliation || "",
  status: course.status || "Active",
  verified: course.verified ? "Verified" : "Pending",
});

const emptyDraft = {
  name: "",
  level: "",
  duration: "",
  fee: "",
  seats: "",
  eligibility: "",
  type: "Regular",
  affiliation: "",
  status: "Active",
  verified: "Pending",
};

/* =========================================================
   SAVE CHANGES (kept after refresh + pushed into college data)
========================================================= */

const STORE_KEY = "cm_course_changes_v1";

const loadStore = () => {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveStore = (data) => {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch {
    /* storage full / blocked - UI still works for this session */
  }
};

// Writes every admin edit back into the college objects themselves
// (college.courseSeats / courseEligibility / courseOverrides), so any other
// page that reads collegesData sees the NEW value (134 -> 150) too.
const applyEditsToSource = (list, edits) => {
  Object.entries(edits || {}).forEach(([key, ov]) => {
    const i = key.indexOf(":");
    const cid = key.slice(0, i);
    const src = key.slice(i + 1);
    const college = list.find((c) => c.id === cid);
    if (!college) return;
    college.courseOverrides = {
      ...(college.courseOverrides || {}),
      [src]: { ...ov },
    };
    if (ov.seats !== undefined && ov.seats !== "")
      college.courseSeats = { ...(college.courseSeats || {}), [src]: ov.seats };
    if (ov.eligibility)
      college.courseEligibility = {
        ...(college.courseEligibility || {}),
        [src]: ov.eligibility,
      };
  });
};

// apply saved edits as soon as this module loads (works after page refresh)
if (typeof window !== "undefined" && Array.isArray(collegesData)) {
  applyEditsToSource(collegesData, loadStore().courseEdits);
}

/* =========================================================
   ADMIN SIDEBAR (same menu as Students / Colleges pages)
========================================================= */

const handleAdminLogout = () => {
  sessionStorage.clear();
  localStorage.removeItem("isAdminLoggedIn");
  localStorage.removeItem("adminLoggedIn");
  window.location.replace("/admin/login");
};

const SIDEBAR_MENU = [
  ["Dashboard", "⌂", "/admin/dashboard"],
  ["Students", "♙", "/admin/students"],
  ["Colleges", "▥", "/admin/colleges"],
  ["Courses", "▱", "/admin/courses"],
  ["Applications", "✉", "/admin/applications"],
  ["Transactions", "₹", "/admin/transactions"],
  ["Reports", "◑", "/admin/reports"],
  ["Users", "♧", "/admin/users"],
  ["Settings", "⚙", "/admin/settings"],
];

function CourseSidebar({ isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`cmx-sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="cmx-brand">
        <div className="cmx-brand-icon">🎓</div>
        <div>
          <h1>
            Student<span>College</span>
          </h1>
          <p>Admission Platform</p>
        </div>
      </div>

      <div className="cmx-menu">
        <p className="cmx-menu-title">MAIN MENU</p>
        {SIDEBAR_MENU.map(([name, icon, path]) => (
          <button
            key={name}
            type="button"
            className={`cmx-item ${location.pathname === path ? "active" : ""}`}
            onClick={() => {
              onClose();
              navigate(path);
            }}
          >
            <span className="cmx-item-icon">{icon}</span>
            <span>{name}</span>
          </button>
        ))}
      </div>

      <div className="cmx-bottom">
        <div className="cmx-admin-card">
          <div className="cmx-avatar">A</div>
          <div>
            <strong>Admin</strong>
            <span>Super Admin</span>
          </div>
        </div>
        <button
          type="button"
          className="cmx-logout"
          onClick={handleAdminLogout}
        >
          ↪ <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

const SHELL_CSS = `
/* ---------- page shell: sidebar + content ---------- */
html,
body {
  margin: 0;
  padding: 0;
  background: #f4f7fb;
  color-scheme: light;
}

body {
  display: block;
  place-items: initial;
  min-width: 0;
}

#root {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  text-align: left;
}

.cmx-shell,
.cmx-shell * {
  box-sizing: border-box;
}

.cmx-shell {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #f4f7fb;
  font-family: Inter, Arial, sans-serif;
}

.cmx-main {
  flex: 1;
  min-width: 0;
  padding: 24px 28px 40px;
  background: #f4f7fb;
  text-align: left;
}

.cmx-sidebar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  width: 236px;
  min-width: 236px;
  height: 100vh;
  background: #112746;
  color: #fff;
}

.cmx-brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 10px;
  height: 82px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, .07);
}

.cmx-brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: rgba(255, 255, 255, .1);
  font-size: 20px;
}

.cmx-brand h1 {
  margin: 0;
  color: #fff;
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: 0;
}

.cmx-brand h1 span {
  color: #58a1ff;
}

.cmx-brand p {
  margin: 3px 0 0;
  color: #91a5c2;
  font-size: 9px;
}

.cmx-menu {
  flex: 1;
  padding: 24px 12px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.cmx-menu::-webkit-scrollbar {
  display: none;
}


.cmx-menu-title {
  margin: 0 0 10px;
  width: 100%;
  text-align: center;
  color: #6f86a7;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  box-sizing: border-box;
}


.cmx-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 43px;
  margin-bottom: 4px;
  padding: 0 13px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #afbdd1;
  font-family: inherit;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}

.cmx-item:hover {
  background: rgba(255, 255, 255, .07);
  color: #fff;
}

.cmx-item.active {
  background: #2177e8;
  color: #fff;
  box-shadow: 0 6px 18px rgba(33, 119, 232, .2);
}

.cmx-item-icon {
  width: 20px;
  font-size: 16px;
  text-align: center;
}

.cmx-star {
  margin-left: auto;
  color: #f4c44f;
  font-size: 10px;
}

.cmx-bottom {
  flex-shrink: 0;
  padding: 14px;
  border-top: 1px solid rgba(255, 255, 255, .07);
}

.cmx-admin-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, .055);
}

.cmx-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #28558e;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.cmx-admin-card strong {
  display: block;
  color: #fff;
  font-size: 12px;
}

.cmx-admin-card span {
  display: block;
  margin-top: 2px;
  color: #8196b5;
  font-size: 9px;
}

.cmx-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 34px;
  margin-top: 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #93a6c0;
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;
}

.cmx-logout:hover {
  background: rgba(255, 255, 255, .07);
  color: #fff;
}

.cmx-mobilebar,
.cmx-overlay {
  display: none;
}

@media (max-width: 1100px) {
  .cmx-sidebar {
    width: 76px;
    min-width: 76px;
  }

  .cmx-brand {
    justify-content: center;
    padding: 0;
  }

  .cmx-brand > div:last-child,
  .cmx-menu-title,
  .cmx-item span:not(.cmx-item-icon),
  .cmx-admin-card > div:last-child,
  .cmx-logout span {
    display: none;
  }

  .cmx-item {
    justify-content: center;
    padding: 0;
  }

  .cmx-bottom {
    padding: 10px;
  }

  .cmx-admin-card {
    justify-content: center;
    padding: 9px;
  }
}

@media (max-width: 700px) {
  .cmx-mobilebar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .cmx-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 0;
    border-radius: 8px;
    background: #fff;
    color: #17345d;
    font-size: 22px;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(23, 52, 93, .12);
  }

  .cmx-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(10, 20, 40, .5);
    opacity: 0;
    pointer-events: none;
    transition: opacity .25s ease;
    z-index: 190;
  }

  .cmx-overlay.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  .cmx-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 236px;
    min-width: 236px;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform .25s ease;
  }

  .cmx-sidebar.is-open {
    transform: translateX(0);
  }

  .cmx-brand {
    justify-content: flex-start;
    padding: 0 20px;
  }

  .cmx-brand > div:last-child,
  .cmx-menu-title,
  .cmx-admin-card > div:last-child {
    display: block;
  }

  .cmx-item span:not(.cmx-item-icon),
  .cmx-logout span {
    display: inline;
  }

  .cmx-item {
    justify-content: flex-start;
    padding: 0 13px;
  }

  .cmx-bottom {
    padding: 14px;
  }

  .cmx-admin-card {
    justify-content: flex-start;
    padding: 12px;
  }

  .cmx-main {
    padding: 14px 10px 30px;
  }
}
`;

// Page layout for /admin/courses: sidebar on the left + course page on the right.
function StandaloneShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="cmx-shell">
      <style>{SHELL_CSS}</style>
      <div
        className={`cmx-overlay ${sidebarOpen ? "is-open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <CourseSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="cmx-main">
        <div className="cmx-mobilebar">
          <button
            type="button"
            className="cmx-menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CourseManagement() {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const onCoursesRoute = routeLocation.pathname.startsWith("/admin/courses");
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  // Opened from inside the Dashboard? Go to the real /admin/courses page,
  // so Dashboard / Students / Colleges all show the same sidebar.
  useEffect(() => {
    if (!onCoursesRoute) navigate("/admin/courses", { replace: true });
  }, [onCoursesRoute, navigate]);
  const colleges = Array.isArray(collegesData) ? collegesData : [];

  // college side
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("All districts");
  const [category, setCategory] = useState("All categories");
  const [collegePage, setCollegePage] = useState(1);
  const [selectedId, setSelectedId] = useState("");

  // course side
  const [courseQuery, setCourseQuery] = useState("");
  const [level, setLevel] = useState("All");
  const [courseStatus, setCourseStatus] = useState("All");
  const [courseType, setCourseType] = useState("All");
  const [activeTab, setActiveTab] = useState("Courses");
  const [page, setPage] = useState(1);
  const [selectedKey, setSelectedKey] = useState(null);
  const [bulkSelected, setBulkSelected] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [feeMin, setFeeMin] = useState("");
  const [feeMax, setFeeMax] = useState("");
  const [seatFilter, setSeatFilter] = useState("All");
  const [courseHistory, setCourseHistory] = useState([]);

  // local (UI) changes made by the admin
  const [saved] = useState(loadStore);
  const [extraCourses, setExtraCourses] = useState(saved.extraCourses || {});
  const [courseEdits, setCourseEdits] = useState(saved.courseEdits || {});
  const [deletedKeys, setDeletedKeys] = useState(saved.deletedKeys || []);
  const [hiddenKeys, setHiddenKeys] = useState(saved.hiddenKeys || []);
  const [verifiedKeys, setVerifiedKeys] = useState(saved.verifiedKeys || []);

  // every change is saved + written into the college data
  useEffect(() => {
    saveStore({
      extraCourses,
      courseEdits,
      deletedKeys,
      hiddenKeys,
      verifiedKeys,
    });
    applyEditsToSource(colleges, courseEdits);
  }, [
    extraCourses,
    courseEdits,
    deletedKeys,
    hiddenKeys,
    verifiedKeys,
    colleges,
  ]);

  // popups
  const [modal, setModal] = useState(null); // {type, action?}
  const [draft, setDraft] = useState(emptyDraft);
  const [pickKey, setPickKey] = useState("");
  const [notice, setNotice] = useState("");

  /* ---------- colleges ---------- */

  const districts = useMemo(
    () => [
      "All districts",
      ...[...new Set(colleges.map((c) => c.location).filter(Boolean))].sort(),
    ],
    [colleges],
  );

  const filteredColleges = useMemo(() => {
    const q = query.trim().toLowerCase();
    return colleges.filter((c) => {
      const text =
        `${c.name || ""} ${c.short || ""} ${c.location || ""} ${c.category || ""}`.toLowerCase();
      return (
        text.includes(q) &&
        (district === "All districts" || c.location === district) &&
        (category === "All categories" || c.category === category)
      );
    });
  }, [colleges, query, district, category]);

  const collegePages = Math.max(
    1,
    Math.ceil(filteredColleges.length / COLLEGE_PAGE_SIZE),
  );
  const safeCollegePage = Math.min(collegePage, collegePages);
  const visibleColleges = filteredColleges.slice(
    (safeCollegePage - 1) * COLLEGE_PAGE_SIZE,
    safeCollegePage * COLLEGE_PAGE_SIZE,
  );

  // no college is selected until the admin clicks one
  const selectedCollege = colleges.find((c) => c.id === selectedId) || null;

  /* ---------- courses of the selected college ---------- */

  const courses = useMemo(() => {
    if (!selectedCollege) return [];
    const cid = selectedCollege.id;
    const names = [
      ...new Set([
        ...getSourceCourses(selectedCollege),
        ...(extraCourses[cid] || []),
      ]),
    ].filter((srcName) => !deletedKeys.includes(`${cid}:${srcName}`));

    // Distribute default Pending courses across colleges and course names.
    // A stable hash keeps the sample data consistent across renders while
    // allowing some colleges to have no Pending courses and others to have 1–2.
    let collegeHash = 0;
    for (const char of String(cid))
      collegeHash = (collegeHash * 31 + char.charCodeAt(0)) >>> 0;
    const pendingCount =
      names.length === 0 || collegeHash % 5 === 0
        ? 0
        : Math.min(names.length, 1 + (collegeHash % 2));
    const pendingIndexes = new Set();
    let seed = (collegeHash ^ 0x9e3779b9) >>> 0;
    while (pendingIndexes.size < pendingCount) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      pendingIndexes.add(seed % names.length);
    }

    return names.map((srcName, i) => {
      const key = `${cid}:${srcName}`;
      const ov = courseEdits[key] || {};
      const name = ov.name || srcName;

      let fee = ov.fee;
      if (!fee) {
        const value =
          typeof getCourseFee === "function"
            ? getCourseFee(selectedCollege, srcName)
            : selectedCollege.annualFee;
        fee =
          value && !/^(college|course) specific$/i.test(String(value))
            ? value
            : "Not published";
      }

      return {
        key,
        srcName,
        id: `${cid}-CRS-${String(i + 1).padStart(2, "0")}`,
        name,
        level: ov.level || levelFor(name),
        duration: ov.duration || durationFor(name, selectedCollege.category),
        fee,
        seats:
          ov.seats ??
          selectedCollege.courseSeats?.[srcName] ??
          selectedCollege.seatsByCourse?.[srcName] ??
          seatsFor(cid, srcName),
        eligibility:
          ov.eligibility ||
          selectedCollege.courseEligibility?.[srcName] ||
          selectedCollege.eligibility ||
          "College-specific eligibility; verify with college",
        type: ov.type || "Regular",
        affiliation: ov.affiliation || selectedCollege.affiliation || "",
        status: hiddenKeys.includes(key)
          ? "Inactive"
          : ov.status === "Pending" || ov.status === "Active"
            ? ov.status
            : pendingIndexes.has(i)
              ? "Pending"
              : "Active",
        verified: verifiedKeys.includes(key),
      };
    });
  }, [
    selectedCollege,
    extraCourses,
    courseEdits,
    deletedKeys,
    hiddenKeys,
    verifiedKeys,
  ]);

  const selectedCourse = courses.find((c) => c.key === selectedKey) || null;

  const parseFee = (fee) => {
    const match = String(fee || "")
      .replace(/,/g, "")
      .match(/[0-9]+(?:\.[0-9]+)?/);
    return match ? Number(match[0]) : null;
  };
  const departments = [
    "All Departments",
    ...new Set(
      courses.map((c) => {
        const name = c.name.toLowerCase();
        if (
          /computer|artificial intelligence|information technology|data science|cyber|software/.test(
            name,
          )
        )
          return "Computer / IT";
        if (/electrical|electronics|communication|ece|eee|vlsi/.test(name))
          return "Electrical / Electronics";
        if (
          /mechanical|automobile|mechatronics|aeronautical|manufacturing/.test(
            name,
          )
        )
          return "Mechanical";
        if (/civil|construction|structural/.test(name)) return "Civil";
        if (/medical|nursing|pharmacy|physiotherapy|health/.test(name))
          return "Health Sciences";
        return "Other Departments";
      }),
    ),
  ];
  const courseDepartment = (name) => {
    const n = String(name || "").toLowerCase();
    if (
      /computer|artificial intelligence|information technology|data science|cyber|software/.test(
        n,
      )
    )
      return "Computer / IT";
    if (/electrical|electronics|communication|ece|eee|vlsi/.test(n))
      return "Electrical / Electronics";
    if (/mechanical|automobile|mechatronics|aeronautical|manufacturing/.test(n))
      return "Mechanical";
    if (/civil|construction|structural/.test(n)) return "Civil";
    if (/medical|nursing|pharmacy|physiotherapy|health/.test(n))
      return "Health Sciences";
    return "Other Departments";
  };
  const filteredCourses = courses.filter((c) => {
    const fee = parseFee(c.fee);
    const seats = Number(c.seats);
    return (
      c.name.toLowerCase().includes(courseQuery.toLowerCase()) &&
      (level === "All" || c.level === level) &&
      (courseStatus === "All" || c.status === courseStatus) &&
      (courseType === "All" || c.type === courseType) &&
      (departmentFilter === "All Departments" ||
        courseDepartment(c.name) === departmentFilter) &&
      (!feeMin || fee === null || fee >= Number(feeMin)) &&
      (!feeMax || fee === null || fee <= Number(feeMax)) &&
      (seatFilter === "All" ||
        (seatFilter === "Available" && seats > 0) ||
        (seatFilter === "No seats" && seats === 0))
    );
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCourses.length / COURSE_PAGE_SIZE),
  );
  const safePage = Math.min(page, totalPages);
  const visibleCourses = filteredCourses.slice(
    (safePage - 1) * COURSE_PAGE_SIZE,
    safePage * COURSE_PAGE_SIZE,
  );

  const levelCounts = LEVELS.map((l) => ({
    label: l,
    count: courses.filter((c) => c.level === l).length,
  }));

  const donutBackground = (() => {
    if (!courses.length) return "#e5edf8";
    let acc = 0;
    const stops = levelCounts
      .map((x, i) => {
        const start = acc;
        acc += (x.count / courses.length) * 100;
        return `${LEVEL_COLORS[i]} ${start}% ${acc}%`;
      })
      .join(",");
    return `conic-gradient(${stops})`;
  })();

  /* ---------- handlers ---------- */

  const resetCourseView = () => {
    setPage(1);
    setCourseQuery("");
    setSelectedKey(null);
    setActiveTab("Courses");
  };

  const chooseCollege = (c) => {
    setSelectedId(c.id);
    resetCourseView();
  };

  const resetCollegeFilters = () => {
    setQuery("");
    setDistrict("All districts");
    setCategory("All categories");
    setCollegePage(1);
    setSelectedId("");
    resetCourseView();
    setModal(null);
  };

  const resetCourseFilters = () => {
    setLevel("All");
    setCourseStatus("All");
    setCourseType("All");
    setCourseQuery("");
    setDepartmentFilter("All Departments");
    setFeeMin("");
    setFeeMax("");
    setSeatFilter("All");
    setBulkSelected([]);
    setPage(1);
  };

  const recordCourseActivity = (action, courseName, details = "") => {
    setCourseHistory((prev) =>
      [
        {
          id: `${Date.now()}-${Math.random()}`,
          date: new Date().toLocaleString(),
          action,
          courseName,
          by: "Admin",
          details: details || `${action} successfully`,
        },
        ...prev,
      ].slice(0, 20),
    );
  };

  const toggleBulkCourse = (key) =>
    setBulkSelected((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  const exportSelectedCourses = () => {
    const selected = courses.filter((c) => bulkSelected.includes(c.key));
    if (!selected.length) {
      setNotice("Select one or more courses to export.");
      return;
    }
    const rows = [
      [
        "Course ID",
        "Course Name",
        "Level",
        "Duration",
        "Fees / Year",
        "Seats",
        "Status",
      ],
      ...selected.map((c) => [
        c.id,
        c.name,
        c.level,
        c.duration,
        c.fee,
        c.seats,
        c.status,
      ]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedCollege?.name || "college"}-selected-courses.csv`;
    link.click();
    URL.revokeObjectURL(url);
    recordCourseActivity(
      "Exported",
      `${selected.length} selected courses`,
      "Course list exported as CSV",
    );
    setNotice(`${selected.length} selected course(s) exported.`);
  };
  const compareSelectedCourses = () => {
    const selected = courses.filter((c) => bulkSelected.includes(c.key));
    if (selected.length < 2 || selected.length > 4) {
      setNotice("Select 2 to 4 courses to compare.");
      return;
    }
    setModal({ type: "compare", compareCourses: selected });
    recordCourseActivity(
      "Compared",
      selected.map((course) => course.name).join(" vs "),
      `${selected.length} courses compared: ${selected.map((course) => course.name).join(", ")}`,
    );
  };

  const closeModal = () => setModal(null);

  const setField = (field) => (e) =>
    setDraft((d) => ({ ...d, [field]: e.target.value }));

  const nameTaken = (name, exceptKey) =>
    courses.some(
      (c) =>
        c.key !== exceptKey &&
        c.name.toLowerCase() === clean(name).toLowerCase(),
    );

  const togglePublish = (course) => {
    recordCourseActivity(
      course.status === "Active" ? "Hidden" : "Published",
      course.name,
      course.status === "Active"
        ? "Course hidden from student listings"
        : "Course published successfully",
    );
    setHiddenKeys((prev) =>
      prev.includes(course.key)
        ? prev.filter((k) => k !== course.key)
        : [...prev, course.key],
    );
    setNotice(
      course.status === "Active"
        ? `${course.name} is now hidden (Inactive).`
        : `${course.name} is now published (Active).`,
    );
  };

  const verifyCourse = (course) => {
    recordCourseActivity("Verified", course.name, "Course marked as verified");
    setVerifiedKeys((prev) =>
      prev.includes(course.key) ? prev : [...prev, course.key],
    );
    setNotice(
      `${course.name} marked as verified. Confirm fee, seats and eligibility with the college.`,
    );
  };

  // Admin can change the selected course between Pending and Active.
  // Save the status in the existing local store so it remains after refresh.
  const changeCourseStatus = (status) => {
    if (!selectedCourse) {
      setNotice("Select a course first, then choose Pending or Active.");
      return;
    }
    recordCourseActivity(
      "Status changed",
      selectedCourse.name,
      `Status set to ${status}`,
    );
    setCourseEdits((prev) => ({
      ...prev,
      [selectedCourse.key]: { ...(prev[selectedCourse.key] || {}), status },
    }));
    setHiddenKeys((prev) => prev.filter((key) => key !== selectedCourse.key));
    setCourseStatus("All");
    setPage(1);
    setNotice(`${selectedCourse.name} status changed to ${status}.`);
  };

  const openAction = (action, course) => {
    setSelectedKey(course.key);
    if (action === "view") setModal({ type: "view" });
    else if (action === "edit") {
      setDraft(draftFrom(course));
      setModal({ type: "edit" });
    } else if (action === "publish") togglePublish(course);
    else if (action === "verify") verifyCourse(course);
    else if (action === "delete") setModal({ type: "delete" });
  };

  // used by ALL 5 admin-control buttons (+ lifecycle buttons)
  const runAction = (action) => {
    if (!selectedCollege) {
      setNotice("Select a college first.");
      return;
    }
    if (action === "pending") {
      setCourseStatus("Pending");
      setPage(1);
      setActiveTab("Courses");
      setNotice("Showing pending courses for the selected college.");
      return;
    }
    if (action === "add") {
      setDraft(emptyDraft);
      setModal({ type: "add" });
      return;
    }
    if (!courses.length) {
      setNotice("This college has no courses. Add a course first.");
      return;
    }
    // Edit always shows the college's course list first, then opens the edit form
    if (selectedCourse && action !== "edit") {
      openAction(action, selectedCourse);
      return;
    }
    setPickKey(selectedCourse?.key || courses[0].key);
    setModal({ type: "pick", action });
  };

  const buildOverride = () => {
    const o = { name: clean(draft.name) };
    if (draft.level) o.level = draft.level;
    if (clean(draft.duration)) o.duration = clean(draft.duration);
    if (clean(draft.fee)) o.fee = clean(draft.fee);
    if (clean(draft.seats) !== "") o.seats = clean(draft.seats);
    if (clean(draft.eligibility)) o.eligibility = clean(draft.eligibility);
    return o;
  };

  const saveAdd = () => {
    const name = clean(draft.name);
    if (!name || !selectedCollege) return;
    if (nameTaken(name)) {
      setNotice(`"${name}" already exists in this college.`);
      return;
    }
    const cid = selectedCollege.id;
    const key = `${cid}:${name}`;
    setDeletedKeys((prev) => prev.filter((k) => k !== key));
    setExtraCourses((prev) =>
      (prev[cid] || []).includes(name) ||
      getSourceCourses(selectedCollege).includes(name)
        ? prev
        : { ...prev, [cid]: [...(prev[cid] || []), name] },
    );
    setCourseEdits((prev) => ({ ...prev, [key]: buildOverride() }));
    recordCourseActivity(
      "Created",
      name,
      `New course added to ${selectedCollege.name}`,
    );
    setSelectedKey(key);
    setModal(null);
    setPage(1);
    setNotice(`Course "${name}" added to ${selectedCollege.name}.`);
  };

  const saveEdit = () => {
    if (!selectedCourse) return;
    const name = clean(draft.name);
    if (!name) {
      setNotice("Course name is required.");
      return;
    }
    if (nameTaken(name, selectedCourse.key)) {
      setNotice(`"${name}" already exists in this college.`);
      return;
    }
    if (!/^\d+$/.test(clean(draft.seats))) {
      setNotice(
        "Available Seats must be a whole number (0 = no seats available).",
      );
      return;
    }
    if (!clean(draft.eligibility)) {
      setNotice("Eligibility cannot be empty.");
      return;
    }

    // only the fields the admin actually changed are saved
    const base = draftFrom(selectedCourse);
    const next = { ...(courseEdits[selectedCourse.key] || {}) };
    const labels = {
      name: "Course Name",
      level: "Degree Level",
      duration: "Duration",
      fee: "Annual Fee",
      seats: "Available Seats",
      eligibility: "Eligibility",
      type: "Course Type",
      affiliation: "Affiliation",
    };
    const changes = [];
    Object.keys(labels).forEach((f) => {
      const value = clean(draft[f]);
      if (value === clean(base[f])) return;
      changes.push(`${labels[f]}: ${clean(base[f]) || "-"} → ${value || "-"}`);
      if (value === "") delete next[f];
      else next[f] = f === "seats" ? parseInt(value, 10) : value;
    });

    const key = selectedCourse.key;
    if (draft.status !== base.status) {
      changes.push(`Status: ${base.status} → ${draft.status}`);
      setHiddenKeys((prev) =>
        draft.status === "Inactive"
          ? prev.includes(key)
            ? prev
            : [...prev, key]
          : prev.filter((k) => k !== key),
      );
    }
    if (draft.verified !== base.verified) {
      changes.push(`Verification: ${base.verified} → ${draft.verified}`);
      setVerifiedKeys((prev) =>
        draft.verified === "Verified"
          ? prev.includes(key)
            ? prev
            : [...prev, key]
          : prev.filter((k) => k !== key),
      );
    }

    if (!changes.length) {
      setModal(null);
      setNotice("No changes made.");
      return;
    }
    setCourseEdits((prev) => ({ ...prev, [key]: next }));
    recordCourseActivity("Updated", name, changes.join("; "));
    setModal(null);
    setNotice(
      `Saved – ${name} (${selectedCollege.name}) → ${changes.join(" | ")}`,
    );
  };

  const confirmDelete = () => {
    if (!selectedCourse) return;
    setDeletedKeys((prev) => [...prev, selectedCourse.key]);
    recordCourseActivity(
      "Deleted",
      selectedCourse.name,
      "Course removed from this college list",
    );
    setNotice(`Course "${selectedCourse.name}" deleted.`);
    setSelectedKey(null);
    setModal(null);
  };

  const detailsRows = selectedCollege
    ? [
        ["Category", selectedCollege.category],
        ["Type", selectedCollege.type],
        ["Ownership", selectedCollege.ownership],
        ["Established", selectedCollege.established],
        ["Grade", selectedCollege.grade],
        ["Affiliation", selectedCollege.affiliation],
        ["Accreditation", selectedCollege.accreditation],
        ["Website", selectedCollege.website],
        ["Phone", selectedCollege.phone],
        ["Email", selectedCollege.email],
      ]
    : [];

  const adminButtons = [
    ["add", "＋ Add Course", "add"],
    ["edit", "✎ Edit Course", "edit"],
    ["publish", "⇅ Publish / Hide", "publish"],
    ["delete", "🗑 Delete Course", "delete"],
  ];

  const lifecycle = [
    ["＋", "Add Course", "Create new course", "add"],
    ["◷", "Pending Courses", "Review pending course status", "pending"],
    ["➤", "Publish Course", "Make it live / hide", "publish"],
    ["▥", "Monitor Course", "View course status", "view"],
    ["▤", "Archive / Remove", "Manage old courses", "delete"],
  ];

  const courseForm = (
    <div className="cm-form">
      <label className="cm-span2">
        Course name *
        <input
          value={draft.name}
          onChange={setField("name")}
          placeholder="Enter course name"
          autoFocus
        />
      </label>
      <label>
        Level
        <select value={draft.level} onChange={setField("level")}>
          <option value="">Auto detect</option>
          {LEVELS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </label>
      <label>
        Duration
        <input
          value={draft.duration}
          onChange={setField("duration")}
          placeholder="e.g. 4 Years"
        />
      </label>
      <label>
        Fees / Year
        <input
          value={draft.fee}
          onChange={setField("fee")}
          placeholder="e.g. ₹1,20,000 / year"
        />
      </label>
      <label>
        Seats
        <input
          value={draft.seats}
          onChange={setField("seats")}
          placeholder="e.g. 60 (0 = no seats available)"
        />
      </label>
      <label className="cm-span2">
        Eligibility
        <input
          value={draft.eligibility}
          onChange={setField("eligibility")}
          placeholder="e.g. 10+2 with PCM"
        />
      </label>
    </div>
  );

  /* ---------- render ---------- */

  if (!onCoursesRoute) return null;

  return (
    <StandaloneShell>
      <div className="cm-app">
        <style>{`
.cm-app,
.cm-app * {
  box-sizing: border-box;
}

.cm-app {
  --blue: #287be8;
  --line: #e1eaf6;
  --muted: #7186a6;
  width: 100%;
  max-width: 100%;
  color: #17365f;
  font-family: Inter, Arial, sans-serif;
  font-size: 13px;
  overflow-x: hidden;
}

.cm-app button {
  font-family: inherit;
}

/* top-right admin profile */
.cm-heading-right { display:flex; align-items:center; justify-content:flex-end; gap:16px; margin-left:auto; min-width:0; }
.cm-admin-notification { position:relative; display:grid; place-items:center; width:30px; height:34px; flex-shrink:0; color:#194781; font-size:18px; line-height:1; }
.cm-admin-notification::after { content:""; position:absolute; top:4px; right:4px; width:6px; height:6px; border-radius:50%; background:#f04452; border:1px solid #fff; }
.cm-admin-profile-wrap { position:relative; flex-shrink:0; }
.cm-admin-profile { display:flex; align-items:center; gap:10px; padding:4px 0 4px 8px; border:0; background:transparent; color:#17365f; text-align:left; cursor:pointer; font:inherit; }
.cm-admin-profile-icon { display:grid; place-items:center; width:36px; height:36px; border-radius:50%; background:#194781; color:#fff; font-size:14px; font-weight:700; }
.cm-admin-profile-copy strong,.cm-admin-profile-copy small { display:block; white-space:nowrap; }
.cm-admin-profile-copy strong { color:#18385f; font-size:12px; }
.cm-admin-profile-copy small { margin-top:3px; color:#8294af; font-size:10px; }
.cm-admin-profile-chevron { color:#7186a6; font-size:11px; }
.cm-admin-dropdown { position:absolute; top:calc(100% + 8px); right:0; z-index:100; min-width:150px; padding:6px; border:1px solid #e1eaf6; border-radius:9px; background:#fff; box-shadow:0 8px 24px #17365f1c; }
.cm-admin-dropdown button { width:100%; padding:10px 12px; border:0; border-radius:6px; background:transparent; color:#d14343; text-align:left; font:inherit; font-size:12px; cursor:pointer; }
.cm-admin-dropdown button:hover { background:#fff0f0; }

/* heading */
.cm-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 2px 16px;
  flex-wrap: wrap;
}

.cm-heading-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.cm-heading-icon {
  display: grid;
  place-items: center;
  flex: 0 0 43px;
  width: 43px;
  height: 43px;
  border-radius: 12px;
  background: #e3efff;
  color: #2777e9;
  font-size: 24px;
}

.cm-heading h1 {
  margin: 0;
  font-size: 22px;
  color: #142f58;
  letter-spacing: -.5px;
}

.cm-heading p {
  margin: 4px 0 0;
  color: #7287a6;
  font-size: 12px;
}

.cm-crumbs {
  color: #7b8eaa;
  font-size: 12px;
}

.cm-crumbs button {
  border: 0;
  background: transparent;
  color: #4f6e9c;
  cursor: pointer;
  font-size: 12px;
  padding: 0;
}

.cm-crumbs button:hover {
  text-decoration: underline;
}

/* layout */
.cm-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 280px;
  gap: 14px;
  align-items: start;
}

.cm-panel {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  box-shadow: 0 2px 7px #193f6b08;
  min-width: 0;
}

.cm-panel > h3,
.cm-panel > .cm-h3 {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  color: #14325e;
  margin: 0;
  padding: 16px 16px 13px;
}

.cm-panel h3 > span {
  color: #2c75e8;
  font-size: 19px;
}

.cm-h3-btn {
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 700;
  color: #14325e;
  padding: 0;
}

.cm-h3-btn > span:first-child {
  color: #2c75e8;
  font-size: 19px;
}

.cm-h3-btn .cm-chev {
  margin-left: auto;
  color: #7892b4;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.cm-h3-btn:hover .cm-chev {
  color: #287be8;
}

/* notice */
.cm-notice {
  position: sticky;
  top: 8px;
  z-index: 20;
  box-shadow: 0 4px 14px #10294b22;
  margin: 0 0 12px;
  padding: 10px 14px;
  border: 1px solid #cdebdc;
  background: #f0fff7;
  border-radius: 8px;
  color: #167a56;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}

.cm-notice button {
  border: 0;
  background: transparent;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
}

/* college panel */
.cm-college-panel {
  padding-bottom: 12px;
}

.cm-search {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 12px 10px;
  height: 37px;
  padding: 0 10px;
  border: 1px solid #dce6f4;
  border-radius: 7px;
  color: #6784ad;
  font-size: 16px;
  background: #fff;
}

.cm-search input {
  border: 0;
  outline: 0;
  background: transparent;
  width: 100%;
  min-width: 0;
  color: #18385f;
  font: inherit;
  font-size: 12px;
}

.cm-college-results {
  margin: 0 12px 8px;
  border: 1px solid #e4ebf5;
  border-radius: 8px;
  overflow: hidden;
}

.cm-college-option {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) 12px;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 8px;
  text-align: left;
  border: 0;
  border-bottom: 1px solid #edf2f9;
  background: #fff;
  color: #17375f;
  cursor: pointer;
}

.cm-college-option:last-child {
  border-bottom: 0;
}

.cm-college-option:hover,
.cm-college-option.chosen {
  background: #edf4ff;
}

.cm-college-symbol {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #e4efff;
  color: #287be8;
  display: grid;
  place-items: center;
  font-size: 16px;
}

.cm-college-option b {
  display: block;
  font-size: 11px;
  line-height: 1.35;
  font-weight: 700;
}

.cm-college-option small {
  display: block;
  font-size: 10px;
  color: #8294af;
  margin-top: 3px;
}

.cm-college-option > strong {
  font-size: 19px;
  color: #5b7da9;
}

.cm-pager {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 12px 8px;
  font-size: 10px;
  color: #758aa8;
  gap: 6px;
}

.cm-pager div {
  display: flex;
  gap: 5px;
  align-items: center;
}

.cm-pager button,
.cm-pager b {
  border: 1px solid #dce6f5;
  background: #fff;
  border-radius: 6px;
  padding: 5px 9px;
  color: #386fc5;
  cursor: pointer;
  font-size: 11px;
}

.cm-pager b {
  background: #4e55e9;
  color: #fff;
  border-color: #4e55e9;
  cursor: default;
}

.cm-pager button:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.cm-filter-btn,
.cm-view {
  border: 1px solid #dce7f6;
  background: #fff;
  color: #356fc8;
  border-radius: 7px;
  padding: 8px 10px;
  cursor: pointer;
  font-size: 11px;
  white-space: nowrap;
}

.cm-filter-btn:hover,
.cm-view:hover {
  background: #edf4ff;
}

.cm-reset-college {
  width: calc(100% - 24px);
  margin: 0 12px;
}

.cm-select-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 12px;
  padding: 0 10px;
  height: 36px;
  border: 1px solid #dfe8f4;
  border-radius: 7px;
  color: #6a85ab;
}

.cm-select-label select {
  border: 0;
  outline: 0;
  background: #fff;
  width: 100%;
  color: #617a9c;
  font: inherit;
  font-size: 12px;
}

.cm-section-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 12px 7px;
  font-weight: 800;
  font-size: 11px;
}

.cm-section-caption span {
  background: #edf3fc;
  border-radius: 12px;
  padding: 4px 9px;
  color: #55749f;
}

.cm-category {
  display: flex;
  align-items: center;
  gap: 9px;
  width: calc(100% - 24px);
  margin: 3px 12px;
  padding: 7px 8px;
  border: 0;
  border-radius: 7px;
  background: #fff;
  text-align: left;
  color: #29496f;
  cursor: pointer;
}

.cm-category:hover,
.cm-category.cat-active {
  background: #edf4ff;
}

.cm-category > span {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  border-radius: 8px;
  background: #eef4ff;
  color: #367de3;
  font-size: 15px;
}

.cm-category b {
  font-size: 11px;
  font-weight: 600;
  flex: 1;
}

.cm-category small {
  background: #edf3fb;
  color: #5d7ca6;
  padding: 3px 7px;
  border-radius: 12px;
  font-size: 10px;
}

/* overview panel */
.cm-overview-panel {
  padding-bottom: 14px;
}

.cm-hint {
  margin: 0 12px;
  padding: 13px 14px;
  border: 1px dashed #c9dbf3;
  border-radius: 9px;
  background: #f8fbff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  cursor: pointer;
  text-align: left;
  width: calc(100% - 24px);
}

.cm-hint b {
  font-size: 14px;
  color: #17345d;
  line-height: 1.4;
}

.cm-hint small {
  display: block;
  color: #7a8fae;
  margin-top: 3px;
  font-size: 11px;
}

.cm-hint span {
  color: #287be8;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.cm-college-overview {
  margin: 0 12px;
  padding: 14px;
  border: 1px solid #e5edf8;
  border-radius: 9px;
  background: linear-gradient(120deg, #fbfdff, #f7faff);
}

.cm-overview-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.cm-overview-title h2 {
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
  color: #17345d;
}

.cm-verified {
  white-space: nowrap;
  background: #dcf8eb;
  color: #119968;
  border-radius: 20px;
  padding: 5px 9px;
  font-size: 10px;
  font-weight: 800;
}

.cm-place {
  color: #6d83a5;
  font-size: 12px;
  margin: 8px 0;
}

.cm-tags {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}

.cm-tags span {
  padding: 5px 9px;
  border-radius: 15px;
  background: #e7f0ff;
  color: #316fc9;
  font-size: 10px;
  font-weight: 700;
}

.cm-tags span + span {
  background: #dcf8eb;
  color: #159b69;
}

.cm-mini-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 13px;
}

.cm-mini-stats > div {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  column-gap: 8px;
  align-items: center;
  padding: 9px 8px;
  border: 1px solid #e6edf7;
  border-radius: 8px;
  background: #fff;
}

.cm-mini-stats > div > span {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background: #e8f1ff;
  color: #3076df;
  font-size: 15px;
}

.cm-mini-stats small {
  font-size: 10px;
  color: #7890b1;
}

.cm-mini-stats b {
  font-size: 12px;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.cm-info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 16px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #e8eef8;
}

.cm-info-grid p {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.cm-info-grid b {
  font-size: 10px;
  color: #7b8eaa;
  font-weight: 700;
}

.cm-info-grid span {
  font-size: 12px;
  color: #24466f;
  overflow-wrap: anywhere;
}

.cm-tabs {
  display: flex;
  gap: 18px;
  border-bottom: 1px solid #e6edf7;
  margin: 14px 12px 0;
  overflow-x: auto;
}

.cm-tabs button {
  white-space: nowrap;
  border: 0;
  border-bottom: 3px solid transparent;
  padding: 11px 6px 10px;
  background: #fff;
  color: #7286a5;
  cursor: pointer;
  font-size: 12px;
}

.cm-tabs button.selected {
  border-bottom-color: #6652f2;
  color: #5548e8;
  font-weight: 800;
}

.cm-tab-content {
  margin: 14px 12px 0;
  border: 1px solid #dce7f6;
  border-radius: 9px;
  padding: 14px;
  background: #fbfdff;
}

.cm-tab-content h3 {
  margin: 0 0 10px;
  font-size: 14px;
  padding: 0;
}

.cm-tab-content h4 {
  margin: 14px 0 6px;
  font-size: 12px;
}

.cm-tab-content ul {
  margin: 0;
  padding-left: 18px;
  columns: 2;
  font-size: 12px;
  line-height: 1.7;
}

.cm-tab-content p {
  font-size: 12px;
  color: #637c9f;
}

.cm-course-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 12px 10px;
  flex-wrap: wrap;
}

.cm-course-toolbar > b {
  font-size: 13px;
  white-space: nowrap;
  margin-right: auto;
}

.cm-course-search {
  margin: 0;
  width: 230px;
  max-width: 100%;
  height: 33px;
}

.cm-selected-bar {
  margin: 0 12px 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #eef4ff;
  color: #2c5fae;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
}

.cm-selected-bar button {
  border: 0;
  background: transparent;
  color: #2c6fd1;
  cursor: pointer;
  font-weight: 700;
  font-size: 12px;
}

.cm-table-wrap {
  width: calc(100% - 24px);
  margin: 0 12px;
  overflow-x: auto;
  border: 1px solid #e5edf7;
  border-radius: 7px;
}

.cm-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.cm-table th {
  background: #f6f9fe;
  color: #647d9f;
  text-align: left;
  font-weight: 700;
  padding: 11px 10px;
  white-space: nowrap;
}

.cm-table td {
  border-top: 1px solid #edf2f8;
  padding: 11px 10px;
  color: #476385;
  vertical-align: middle;
}

.cm-table tbody tr {
  cursor: pointer;
}

.cm-table tbody tr:hover {
  background: #f7faff;
}

.cm-table tbody tr.sel {
  background: #e9f1ff;
  box-shadow: inset 3px 0 0 #287be8;
}

.cm-table .cm-course-name {
  color: #1d3c65;
  font-weight: 600;
  min-width: 160px;
  max-width: 260px;
}

.cm-table td.nw {
  white-space: nowrap;
}

.cm-level {
  display: inline-block;
  border-radius: 5px;
  padding: 5px 8px;
  font-size: 10px;
  font-weight: 800;
  background: #e1edff;
  color: #2b70dc;
}

.level-pg {
  background: #efe4ff;
  color: #8a49df;
}

.level-diploma {
  background: #fff0d9;
  color: #bc7a17;
}

.level-others {
  background: #f0e8ff;
  color: #8451cb;
}

.cm-status {
  display: inline-block;
  border-radius: 15px;
  padding: 5px 9px;
  font-size: 10px;
  font-weight: 800;
}

.cm-status.on {
  background: #d9f7e9;
  color: #129668;
}

.cm-status.off {
  background: #ffe4e6;
  color: #cc3e55;
}

.cm-status.pending {
  background: #fff1c9;
  color: #a96700;
}

.cm-empty {
  padding: 18px;
  text-align: center;
  color: #8194ae;
  font-size: 12px;
}

.cm-table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 12px 14px 0;
  color: #758aa8;
  font-size: 11px;
  flex-wrap: wrap;
}

.cm-table-footer > div {
  display: flex;
  align-items: center;
  gap: 5px;
}

.cm-table-footer button,
.cm-table-footer b {
  border: 1px solid #dce6f5;
  background: #fff;
  border-radius: 6px;
  padding: 6px 11px;
  color: #386fc5;
  cursor: pointer;
}

.cm-table-footer b {
  background: #4e55e9;
  color: #fff;
  border-color: #4e55e9;
  cursor: default;
}

.cm-table-footer button:disabled {
  opacity: .4;
  cursor: not-allowed;
}

/* right column */
.cm-right-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.cm-insights,
.cm-filters,
.cm-popular {
  padding-bottom: 12px;
}

.cm-chart-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 12px;
  padding: 6px 14px 14px;
  flex-wrap: wrap;
}

.cm-donut {
  width: 124px;
  height: 124px;
  flex: 0 0 124px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;
}

.cm-donut:before {
  content: "";
  position: absolute;
  inset: 17px;
  background: #fff;
  border-radius: 50%;
}

.cm-donut > div {
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cm-donut small {
  font-size: 10px;
  color: #7186a6;
}

.cm-donut b {
  font-size: 18px;
  color: #193b68;
}

.cm-legend {
  flex: 1;
  min-width: 110px;
}

.cm-legend > div {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  margin: 11px 0;
  color: #536f95;
  font-size: 12px;
}

.cm-legend b {
  font-weight: 700;
  color: #47648b;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: block;
}

.cm-filters > b {
  display: block;
  margin: 8px 13px 0;
  color: #29486f;
  font-size: 12px;
}

.cm-chip-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin: 8px 12px 13px;
}

.cm-chip-row button {
  flex: 1 1 auto;
  border: 1px solid #dfe8f5;
  background: #fff;
  color: #657d9f;
  border-radius: 6px;
  padding: 8px 8px;
  font-size: 11px;
  cursor: pointer;
}

.cm-chip-row button.active {
  background: #3b70ed;
  color: #fff;
  border-color: #3b70ed;
}

.cm-chip-row button.active.green {
  background: #18bd91;
  border-color: #18bd91;
}

.cm-popular-item {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) 10px;
  gap: 8px;
  align-items: center;
  width: calc(100% - 24px);
  margin: 5px 12px;
  padding: 7px 3px;
  border: 0;
  background: #fff;
  text-align: left;
  color: #24466e;
  cursor: pointer;
  border-radius: 6px;
}

.cm-popular-item:hover {
  background: #f3f7ff;
}

.cm-rank {
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background: #e2edff;
  color: #2c73dd;
  font-size: 12px;
  font-weight: 800;
}

.cm-rank.rank-0 {
  background: #e0ebff;
  color: #3478f6;
}

.cm-rank.rank-1 {
  background: #d9f7e9;
  color: #149b6b;
}

.cm-rank.rank-2 {
  background: #fff0d9;
  color: #c47d19;
}

.cm-rank.rank-3 {
  background: #eee4ff;
  color: #8950d6;
}

.cm-rank.rank-4 {
  background: #ffe0e6;
  color: #e34268;
}

.cm-rank.rank-5 {
  background: #d9f3ff;
  color: #0784b5;
}

.cm-rank.rank-6 {
  background: #fce7d6;
  color: #c65d18;
}

.cm-rank.rank-7 {
  background: #e5f5cc;
  color: #548b16;
}

.cm-rank.rank-8 {
  background: #f3e1ff;
  color: #a13bd1;
}

.cm-rank.rank-9 {
  background: #ffe4c7;
  color: #b45309;
}

.cm-popular-item b {
  display: block;
  font-size: 11px;
  line-height: 1.4;
}

.cm-popular-item small {
  display: block;
  color: #8194af;
  font-size: 10px;
  margin-top: 3px;
  line-height: 1.4;
}

.cm-popular-item > strong {
  color: #7892b4;
  font-size: 18px;
}

/* Requested course bulk tools, advanced filters, summary and history */
.cm-bulk-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 12px 9px;padding:8px 10px;border:1px solid #e2ebf8;border-radius:8px;background:#fbfdff;color:#31547f;font-size:11px}
.cm-bulk-toolbar button,.cm-history-heading button{border:1px solid #dce7f7;background:#fff;color:#315b9d;border-radius:6px;padding:7px 9px;font-size:11px;font-weight:700;cursor:pointer}
.cm-select-all{display:flex;align-items:center;gap:6px;font-weight:700}.cm-bulk-count{margin-right:auto;color:#6b83a4}.cm-bulk-toolbar .cm-clear-bulk{color:#6c7f98}
.cm-advanced-filters{display:grid;grid-template-columns:1fr 1.3fr .8fr auto;gap:10px;align-items:end;margin:0 12px 10px;padding:10px;border:1px solid #dce8fa;border-radius:8px;background:#f7faff}
.cm-advanced-filters>b{grid-column:1/-1;color:#3472d8;font-size:12px}.cm-advanced-filters label{display:flex;flex-direction:column;gap:5px;min-width:0;color:#7287a4;font-size:10px}.cm-advanced-filters select,.cm-advanced-filters input{width:100%;min-width:0;height:31px;border:1px solid #dce6f4;border-radius:6px;background:#fff;padding:5px 7px;color:#38577f;font-size:11px}.cm-fee-range{display:flex;gap:5px}.cm-advanced-filters>button{height:31px;border:1px solid #dce6f4;border-radius:6px;background:#fff;color:#346bd0;padding:0 10px;font-size:11px;cursor:pointer}
.cm-course-summary{margin:0 12px 2px;padding-top:10px;border-top:1px solid #e8eff8}.cm-course-summary h4{margin:0 0 8px;color:#28476f;font-size:12px}.cm-summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}.cm-summary-item{display:flex;align-items:center;gap:7px;min-width:0;padding:8px;border:1px solid #e4edf9;border-radius:8px;background:#fbfdff}.cm-summary-icon{width:25px;height:25px;flex:0 0 25px;border-radius:8px;display:grid;place-items:center;font-size:12px;font-weight:800}.cm-summary-item>span:nth-child(2){min-width:0;flex:1}.cm-summary-item b,.cm-summary-item small{display:block;font-size:10px}.cm-summary-item small{margin-top:3px;color:#8194ae}.cm-summary-item strong{font-size:11px;color:#365c91}
.cm-history-panel{margin-top:14px;padding-bottom:12px}.cm-history-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 14px}.cm-history-heading h3{margin:0}.cm-history-heading button:disabled{opacity:.45;cursor:not-allowed}.cm-history-table-wrap,.cm-compare-wrap{overflow-x:auto;margin:10px 12px;border:1px solid #e5edf7;border-radius:7px}.cm-history-table,.cm-compare-table{width:100%;border-collapse:collapse;font-size:11px}.cm-history-table th,.cm-history-table td,.cm-compare-table th,.cm-compare-table td{padding:9px 10px;text-align:left;border-bottom:1px solid #edf2f9;white-space:nowrap}.cm-history-table th,.cm-compare-table th{background:#f6f9fe;color:#647d9f}.cm-history-empty{padding:4px 14px;color:#8194ae;font-size:11px}
.cm-table input[type="checkbox"],.cm-bulk-toolbar input[type="checkbox"]{accent-color:#3b70ed;cursor:pointer}

/* lifecycle + admin control */
.cm-lifecycle,
.cm-admin-controls {
  margin-top: 14px;
  padding-bottom: 14px;
}

.cm-lifecycle-steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  padding: 0 14px;
}

.cm-lifecycle-steps > button {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: center;
  column-gap: 8px;
  min-width: 0;
  border: 1px solid #e4ecf7;
  border-radius: 9px;
  background: #fbfdff;
  text-align: left;
  padding: 10px;
  cursor: pointer;
}

.cm-lifecycle-steps > button:hover {
  border-color: #b8d4ff;
  background: #f3f8ff;
}

.cm-lifecycle-steps > button > span {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5efff;
  color: #3477e1;
  font-size: 17px;
}

.cm-lifecycle-steps > button:nth-child(2) > span {
  background: #f0e5ff;
  color: #8a4ee4;
}

.cm-lifecycle-steps > button:nth-child(3) > span {
  background: #dcf8eb;
  color: #16a16f;
}

.cm-lifecycle-steps > button:nth-child(4) > span {
  background: #eee5ff;
  color: #8a4ee4;
}

.cm-lifecycle-steps > button:nth-child(5) > span {
  background: #ffe5e7;
  color: #d74d5d;
}

.cm-lifecycle-steps b {
  font-size: 11px;
  color: #24466d;
}

.cm-lifecycle-steps small {
  font-size: 10px;
  color: #8395ae;
  margin-top: 3px;
  line-height: 1.3;
}

.cm-admin-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding-right: 16px;
}

.cm-admin-head small {
  color: #7b8eaa;
  font-size: 11px;
  max-width: 100%;
  overflow-wrap: anywhere;
}

.cm-admin-buttons {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  padding: 0 14px;
}

.cm-admin-buttons button {
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 12px 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .1s;
}

.cm-admin-buttons button:hover {
  transform: translateY(-1px);
}

.cm-admin-buttons .add {
  background: #18bd91;
  color: #fff;
}

.cm-admin-buttons .view {
  background: #dceaff;
  color: #2c6fd1;
  border-color: #b8d4ff;
}

.cm-admin-buttons .edit {
  background: #fff0d7;
  color: #b97813;
  border-color: #ffdda0;
}

.cm-admin-buttons .publish {
  background: #eee4ff;
  color: #7b43d6;
  border-color: #d6c0ff;
}

.cm-admin-buttons .delete {
  background: #ffe7e8;
  color: #c83b4e;
  border-color: #ffc6cb;
}

.cm-noseat {
  color: #cc3e55;
  font-weight: 700;
}

.cm-placeholder {
  margin: 6px 12px 6px;
  padding: 40px 20px;
  border: 1px dashed #c9dbf3;
  border-radius: 10px;
  background: #f8fbff;
  text-align: center;
  color: #637c9f;
}

.cm-placeholder-icon {
  width: 52px;
  height: 52px;
  margin: 0 auto 12px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #e3efff;
  color: #287be8;
  font-size: 26px;
}

.cm-placeholder b {
  display: block;
  font-size: 15px;
  color: #17345d;
  margin-bottom: 6px;
}

.cm-placeholder p {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
}

.cm-pick-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: min(50vh, 340px);
  overflow-y: auto;
  margin-top: 12px;
  padding: 2px;
}

.cm-pick-list button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  text-align: left;
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #dbe6f5;
  border-radius: 8px;
  background: #fff;
  color: #1d3c65;
  cursor: pointer;
  font-size: 13px;
}

.cm-pick-list button small {
  color: #7b8eaa;
  font-size: 11px;
  white-space: nowrap;
}

.cm-pick-list button:hover {
  background: #f3f8ff;
}

.cm-pick-list button.on {
  border-color: #287be8;
  background: #e9f1ff;
  color: #1b57b8;
  font-weight: 700;
}

/* modal */
.cm-modal-backdrop {
  position: fixed;
  inset: 0;
  background: #0d234b66;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 14px;
  overflow-y: auto;
}

.cm-modal {
  position: relative;
  background: #fff;
  width: min(520px, 100%);
  max-height: calc(100vh - 28px);
  overflow-y: auto;
  padding: 22px;
  border-radius: 14px;
  box-shadow: 0 20px 70px #10294b40;
}

.cm-modal h2 {
  margin: 0 28px 10px 0;
  color: #18385f;
  font-size: 18px;
}

.cm-modal > p {
  font-size: 12px;
  color: #637c9f;
  line-height: 1.5;
  margin: 0 0 10px;
}

.cm-close {
  position: absolute;
  right: 12px;
  top: 10px;
  border: 0;
  background: transparent;
  font-size: 24px;
  color: #7a8ba5;
  cursor: pointer;
  line-height: 1;
}

.cm-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 12px;
  margin-top: 12px;
}

.cm-form label,
.cm-modal > label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  min-width: 0;
}

.cm-span2 {
  grid-column: 1/-1;
}

.cm-form input,
.cm-form select,
.cm-modal > label select {
  height: 40px;
  border: 1px solid #dbe6f5;
  border-radius: 7px;
  padding: 0 10px;
  font: inherit;
  font-weight: 400;
  background: #fff;
  min-width: 0;
  width: 100%;
}

.cm-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 16px;
  margin-top: 8px;
}

.cm-detail-grid p {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cm-detail-grid b {
  font-size: 10px;
  color: #7b8eaa;
}

.cm-detail-grid span {
  font-size: 12px;
  color: #24466f;
  overflow-wrap: anywhere;
}

.cm-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.cm-modal-actions button {
  padding: 10px 16px;
  border-radius: 7px;
  border: 1px solid #dce6f4;
  background: #fff;
  color: #526f96;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.cm-modal-actions .primary {
  background: #287be8;
  border-color: #287be8;
  color: #fff;
}

.cm-modal-actions .danger {
  background: #d9475a;
  border-color: #d9475a;
  color: #fff;
}

.cm-modal-actions button:disabled {
  opacity: .5;
  cursor: not-allowed;
}

/* Course View modal: styled to match the requested reference and stay responsive */
.cm-modal.course-view {
  width: min(580px, 100%);
  padding: 24px 24px 20px;
  border: 1px solid #e5edf8;
  border-radius: 13px;
}

.cm-view-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 32px 18px 0;
}
.cm-view-book, .cm-view-college-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  color: #287be8;
  background: #eaf2ff;
  font-size: 20px;
}
.cm-view-title { min-width: 0; }
.cm-modal.course-view .cm-view-title h2 {
  margin: 0 0 4px;
  color: #153965;
  font-size: 18px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}
.cm-modal.course-view .cm-view-title p {
  margin: 0;
  color: #7890b2;
  font-size: 12px;
}
.cm-view-college {
  display: grid;
  grid-template-columns: 28px auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 13px 14px;
  margin-bottom: 18px;
  border: 1px solid #cfe0ff;
  border-radius: 8px;
  background: #edf4ff;
  color: #204b83;
  min-width: 0;
}
.cm-view-college-icon {
  width: 28px;
  height: 28px;
  flex-basis: 28px;
  font-size: 16px;
  background: #dceaff;
}
.cm-view-college b {
  font-size: 11px;
  color: #5477a4;
  white-space: nowrap;
}
.cm-view-college strong {
  min-width: 0;
  font-size: 12px;
  color: #17447f;
  overflow-wrap: anywhere;
}
.cm-modal.course-view .cm-detail-grid {
  gap: 17px 20px;
  margin-top: 0;
}
.cm-modal.course-view .cm-detail-grid p { gap: 6px; min-width: 0; }
.cm-modal.course-view .cm-detail-grid p.cm-view-detail {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: start;
  gap: 10px;
  min-width: 0;
}
.cm-view-detail-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eaf2ff;
  color: #287be8;
  font-size: 15px;
  font-weight: 700;
}
.cm-view-detail-copy {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}
.cm-view-detail-copy > span {
  overflow-wrap: anywhere;
}

.cm-modal.course-view .cm-detail-grid b { font-size: 11px; color: #7790b4; }
.cm-modal.course-view .cm-detail-grid span { font-size: 12px; line-height: 1.55; color: #214a7c; }
.cm-view-badge {
  display: inline-flex;
  width: fit-content;
  padding: 5px 11px;
  border-radius: 20px;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
}
.cm-view-badge.good { color: #07865f; background: #d7f8e9; }
.cm-view-badge.pending { color: #a96700; background: #fff1c9; }
.cm-view-badge.muted { color: #64748b; background: #eef2f7; }
.cm-modal.course-view .cm-modal-actions {
  border-top: 1px solid #e7eef8;
  padding-top: 15px;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .cm-modal-backdrop { padding: 8px; align-items: center; }
  .cm-modal.course-view { width: 100%; max-height: calc(100dvh - 16px); padding: 18px 15px 15px; border-radius: 12px; }
  .cm-modal.course-view .cm-detail-grid { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .cm-modal.course-view .cm-view-college { grid-template-columns: 32px minmax(0, 1fr); gap: 6px 9px; padding: 10px; }
  .cm-modal.course-view .cm-view-college b { grid-column: 2; grid-row: 1; }
  .cm-modal.course-view .cm-view-college strong { grid-column: 2; grid-row: 2; }
  .cm-modal.course-view .cm-view-college-icon { grid-column: 1; grid-row: 1 / span 2; }
  .cm-modal.course-view .cm-modal-actions { justify-content: stretch; }
  .cm-modal.course-view .cm-modal-actions button { flex: 1; }
}

.cm-modal.wide {
  width: min(680px, 100%);
}

.cm-sub {
  font-size: 12px;
  color: #637c9f;
  line-height: 1.6;
  margin: 0 0 6px;
}

.cm-edit-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 16px;
  margin-top: 14px;
}

.cm-edit-grid label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.cm-edit-grid label > b {
  font-size: 10px;
  color: #7b8eaa;
  text-transform: uppercase;
  letter-spacing: .5px;
}

.cm-edit-grid input,
.cm-edit-grid select {
  height: 40px;
  border: 1px solid #dbe6f5;
  border-radius: 7px;
  padding: 0 10px;
  font: inherit;
  font-size: 13px;
  color: #17365f;
  background: #fff;
  min-width: 0;
  width: 100%;
}

.cm-edit-grid input:disabled {
  background: #f4f7fb;
  color: #7b8eaa;
}

.cm-edit-grid input:focus,
.cm-edit-grid select:focus {
  outline: 2px solid #b8d4ff;
  border-color: #287be8;
}

.cm-edit-grid .cm-changed input,
.cm-edit-grid .cm-changed select {
  border-color: #287be8;
  background: #f3f8ff;
  font-weight: 700;
}

.cm-edit-grid .cm-changed > b {
  color: #287be8;
}


.cm-status-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 14px 14px 2px;
  padding: 13px 14px;
  border: 1px solid #dce7f6;
  border-radius: 10px;
  background: #f8fbff;
}
.cm-status-control-copy { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.cm-status-control-copy b { color: #163b70; font-size: 12px; }
.cm-status-control-copy small { color: #7185a3; font-size: 11px; overflow-wrap: anywhere; }
.cm-status-control-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.cm-status-control-actions button { border-radius: 7px; padding: 9px 13px; font-size: 12px; font-weight: 700; cursor: pointer; }
.cm-status-control-actions button:disabled { opacity: .48; cursor: not-allowed; }
.cm-status-control-actions .cm-set-pending { color: #a76600; background: #fff2d2; border: 1px solid #f4d58b; }
.cm-status-control-actions .cm-set-active { color: #087d60; background: #dcf8ee; border: 1px solid #a8e8d3; }

/* ---------- responsive ---------- */
@media (max-width: 1280px) {
  .cm-layout {
    grid-template-columns: 250px minmax(0, 1fr);
  }

  .cm-right-column {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: start;
  }

  .cm-lifecycle-steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .cm-advanced-filters{grid-template-columns:repeat(2,minmax(0,1fr));}
  .cm-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .cm-right-column {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cm-popular {
    grid-column: 1/-1;
  }

  .cm-admin-buttons {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .cm-college-results {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cm-college-results .cm-college-option {
    border-right: 1px solid #edf2f9;
  }
}

@media (max-width: 640px) {
  .cm-heading { align-items:flex-start; }
  .cm-heading-right { width:100%; justify-content:space-between; }
  .cm-admin-profile { gap:7px; }
  .cm-admin-profile-icon { width:32px; height:32px; }
  .cm-admin-profile-copy strong { font-size:11px; }
  .cm-admin-profile-copy small { font-size:9px; }
  .cm-advanced-filters{grid-template-columns:minmax(0,1fr);}
  .cm-advanced-filters>b{grid-column:auto;}
  .cm-bulk-toolbar{align-items:stretch;}
  .cm-bulk-count{width:100%;margin-right:0;}
  .cm-bulk-toolbar button{flex:1 1 auto;}
  .cm-summary-grid{grid-template-columns:minmax(0,1fr);}
  .cm-heading h1 {
    font-size: 19px;
  }

  .cm-right-column {
    grid-template-columns: minmax(0, 1fr);
  }

  .cm-college-results {
    display: block;
  }

  .cm-mini-stats {
    grid-template-columns: 1fr;
  }

  .cm-info-grid {
    grid-template-columns: 1fr;
  }

  .cm-tab-content ul {
    columns: 1;
  }

  .cm-lifecycle-steps {
    grid-template-columns: 1fr 1fr;
    padding: 0 10px;
  }

  .cm-lifecycle-steps > button:last-child {
    grid-column: 1/-1;
  }

  .cm-admin-buttons {
    grid-template-columns: 1fr 1fr;
    padding: 0 10px;
  }

  .cm-status-control { margin: 12px 10px 2px; align-items: stretch; flex-direction: column; }
  .cm-status-control-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cm-status-control-actions button { width: 100%; }


  .cm-course-search {
    width: 100%;
    flex: 1 1 100%;
  }

  .cm-course-toolbar > b {
    width: 100%;
  }

  .cm-form {
    grid-template-columns: 1fr;
  }

  .cm-detail-grid {
    grid-template-columns: 1fr;
  }

  .cm-edit-grid {
    grid-template-columns: 1fr;
  }

  .cm-modal-actions button {
    flex: 1 1 auto;
  }

  .cm-category {
    display: inline-flex;
    width: calc(50% - 18px);
    margin: 3px 6px 3px 12px;
    vertical-align: top;
  }

  .cm-category:nth-of-type(even) {
    margin-left: 0;
  }

  /* table -> cards on phones */
  .cm-layout > *,
  .cm-panel {
    min-width: 0;
    max-width: 100%;
  }

  .cm-table-wrap {
    border: 0;
    overflow: visible;
    width: calc(100% - 20px);
    max-width: 100%;
    margin: 0 10px;
  }

  .cm-table,
  .cm-table tbody,
  .cm-table tr,
  .cm-table td {
    display: block;
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .cm-table thead {
    display: none;
  }

  .cm-table tbody tr {
    border: 1px solid #e3ebf6;
    border-radius: 9px;
    margin-bottom: 10px;
    padding: 6px 10px;
    background: #fff;
  }

  .cm-table tbody tr.sel {
    background: #e9f1ff;
  }

  .cm-table td {
    border: 0;
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    text-align: right;
  }

  .cm-table td > * {
    min-width: 0;
    max-width: 100%;
  }

  .cm-table td:before {
    content: attr(data-label);
    font-weight: 700;
    color: #7b8eaa;
    font-size: 11px;
    text-align: left;
    flex: 0 0 auto;
  }

  .cm-table td.cm-course-name {
    max-width: 100%;
    min-width: 0;
    font-size: 13px;
    word-break: break-word;
  }

  .cm-table td.nw {
    white-space: normal;
  }

  .cm-modal {
    padding: 18px;
  }

  .cm-modal.course-view {
    width: min(100%, 520px);
    max-height: calc(100dvh - 20px);
    padding: 18px 16px 14px;
    border-radius: 12px;
  }

  .cm-view-college {
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 7px 9px;
    padding: 11px;
  }
  .cm-view-college strong {
    grid-column: 2;
  }
  .cm-modal.course-view .cm-detail-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 12px;
  }
  .cm-modal.course-view .cm-detail-grid b { font-size: 10px; }
  .cm-modal.course-view .cm-detail-grid span { font-size: 11px; }
  .cm-modal.course-view .cm-view-title h2 { font-size: 16px; }
  .cm-modal.course-view .cm-modal-actions button { flex: 1 1 110px; }

}

@media (max-width: 380px) {
  .cm-modal.course-view .cm-detail-grid { grid-template-columns: 1fr; }
  .cm-view-heading { gap: 9px; }
  .cm-view-college { grid-template-columns: 26px minmax(0, 1fr); }
}
`}</style>

        {/* ===== HEADING ===== */}
        <section className="cm-heading">
          <div className="cm-heading-left">
            <div className="cm-heading-icon">▥</div>
            <div>
              <h1>Course Management</h1>
              <p>College-wise Course Management System</p>
            </div>
          </div>
          <div className="cm-heading-right">
            <div className="cm-crumbs">
              <button onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </button>
              {"  ›  "}Courses
            </div>
            <div className="cm-admin-notification" aria-hidden="true">♢</div>
            <div className="cm-admin-profile-wrap">
              <button type="button" className="cm-admin-profile" aria-label="Admin account menu" aria-expanded={adminMenuOpen} onClick={() => setAdminMenuOpen((open) => !open)}>
                <span className="cm-admin-profile-icon">A</span>
                <span className="cm-admin-profile-copy"><strong>Admin</strong><small>Super Admin</small></span>
                <span className="cm-admin-profile-chevron">⌄</span>
              </button>
              {adminMenuOpen && <div className="cm-admin-dropdown"><button type="button" onClick={handleAdminLogout}>↪ &nbsp; Logout</button></div>}
            </div>
          </div>
        </section>

        {notice && (
          <div className="cm-notice">
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Close">
              ×
            </button>
          </div>
        )}

        <div className="cm-layout">
          {/* ===== 01 SELECT COLLEGE ===== */}
          <section className="cm-panel cm-college-panel">
            <h3>
              <span>♜</span> 01. Select College
            </h3>
            <label className="cm-search">
              ⌕
              <input
                placeholder="Search colleges..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCollegePage(1);
                }}
              />
            </label>
            <div className="cm-college-results">
              {visibleColleges.map((c) => (
                <button
                  key={c.id}
                  onClick={() => chooseCollege(c)}
                  className={`cm-college-option ${selectedCollege?.id === c.id ? "chosen" : ""}`}
                >
                  <span className="cm-college-symbol">▦</span>
                  <span>
                    <b>{c.name}</b>
                    <small>{c.location || "Location not listed"}</small>
                  </span>
                  <strong>›</strong>
                </button>
              ))}
              {filteredColleges.length === 0 && (
                <div className="cm-empty">No colleges found</div>
              )}
            </div>
            {filteredColleges.length > COLLEGE_PAGE_SIZE && (
              <div className="cm-pager">
                <span>{filteredColleges.length} colleges</span>
                <div>
                  <button
                    disabled={safeCollegePage <= 1}
                    onClick={() => setCollegePage((p) => Math.max(1, p - 1))}
                  >
                    ‹
                  </button>
                  <b>
                    {safeCollegePage}/{collegePages}
                  </b>
                  <button
                    disabled={safeCollegePage >= collegePages}
                    onClick={() =>
                      setCollegePage((p) => Math.min(collegePages, p + 1))
                    }
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
            <button
              className="cm-filter-btn cm-reset-college"
              onClick={resetCollegeFilters}
            >
              ↺ Reset college filters
            </button>
            <label className="cm-select-label">
              ⌖
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setCollegePage(1);
                }}
              >
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
            <label className="cm-select-label">
              ▦
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCollegePage(1);
                }}
              >
                <option>All categories</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <div className="cm-section-caption">
              College Categories <span>{colleges.length}</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cm-category ${category === cat ? "cat-active" : ""}`}
                onClick={() => {
                  setCategory(category === cat ? "All categories" : cat);
                  setCollegePage(1);
                }}
              >
                <span>{categoryIcons[cat]}</span>
                <b>{cat}</b>
                <small>
                  {colleges.filter((c) => c.category === cat).length}
                </small>
              </button>
            ))}
          </section>

          {/* ===== 02 COURSE OVERVIEW ===== */}
          <section className="cm-panel cm-overview-panel">
            <h3>
              <span>▥</span> 02. Course Overview
            </h3>

            {selectedCollege ? (
              <>
                <div className="cm-college-overview">
                  <div className="cm-overview-title">
                    <h2>{selectedCollege.name}</h2>
                    <span className="cm-verified">
                      ✓ {selectedCollege.status || "Listed"}
                    </span>
                  </div>
                  <p className="cm-place">
                    ⌖ {selectedCollege.location || "Location not listed"}, Tamil
                    Nadu
                  </p>
                  <div className="cm-tags">
                    <span>
                      {selectedCollege.ownership ||
                        selectedCollege.type ||
                        "College"}
                    </span>
                    <span>
                      Grade: {selectedCollege.grade || "Not available"}
                    </span>
                  </div>
                  <div className="cm-mini-stats">
                    <div>
                      <span>▣</span>
                      <small>Total Courses</small>
                      <b>{courses.length}</b>
                    </div>
                    <div>
                      <span>♙</span>
                      <small>Established</small>
                      <b>{selectedCollege.established || "Not listed"}</b>
                    </div>
                    <div>
                      <span>✓</span>
                      <small>Affiliation</small>
                      <b>{selectedCollege.affiliation || "Not listed"}</b>
                    </div>
                  </div>
                  <div className="cm-info-grid">
                    {detailsRows.map(([label, value]) => (
                      <p key={label}>
                        <b>{label}</b>
                        <span>{value || "Not listed"}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="cm-tabs">
                  {["Courses", "Overview", "Facilities", "Placements"].map(
                    (tab) => (
                      <button
                        key={tab}
                        className={activeTab === tab ? "selected" : ""}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </button>
                    ),
                  )}
                </div>

                {activeTab === "Overview" && (
                  <div className="cm-tab-content">
                    <h3>{selectedCollege.name} — Overview</h3>
                    <div
                      className="cm-info-grid"
                      style={{ border: 0, margin: 0, padding: 0 }}
                    >
                      {detailsRows.map(([label, value]) => (
                        <p key={label}>
                          <b>{label}</b>
                          <span>{value || "Not listed"}</span>
                        </p>
                      ))}
                    </div>
                    {(selectedCollege.about || selectedCollege.description) && (
                      <p>
                        {selectedCollege.about || selectedCollege.description}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "Facilities" && (
                  <div className="cm-tab-content">
                    <h3>Facilities</h3>
                    {Array.isArray(selectedCollege.facilities) &&
                    selectedCollege.facilities.length ? (
                      <ul>
                        {selectedCollege.facilities.map((item, i) => (
                          <li
                            key={`${i}-${typeof item === "string" ? item : item.name}`}
                          >
                            {typeof item === "string"
                              ? item
                              : item.name || item.title || "Facility"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        Facility details have not been provided for this
                        college.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "Placements" && (
                  <div className="cm-tab-content">
                    <h3>Placement Information</h3>
                    <div
                      className="cm-info-grid"
                      style={{ border: 0, margin: 0, padding: 0 }}
                    >
                      <p>
                        <b>Placement Support</b>
                        <span>
                          {selectedCollege.placementAvailable || "Not listed"}
                        </span>
                      </p>
                      <p>
                        <b>Average Package</b>
                        <span>
                          {selectedCollege.averagePackage || "Not published"}
                        </span>
                      </p>
                      <p>
                        <b>Highest Package</b>
                        <span>
                          {selectedCollege.highestPackage || "Not published"}
                        </span>
                      </p>
                      <p>
                        <b>Students Placed</b>
                        <span>
                          {selectedCollege.studentsPlaced || "Not published"}
                        </span>
                      </p>
                    </div>
                    <h4>Recruiters / Companies</h4>
                    {Array.isArray(selectedCollege.companies) &&
                    selectedCollege.companies.length ? (
                      <ul>
                        {selectedCollege.companies.map((item, i) => (
                          <li key={i}>
                            {typeof item === "string"
                              ? item
                              : item.company || item.name || "Company"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Placement company data has not been provided.</p>
                    )}
                  </div>
                )}

                {activeTab === "Courses" && (
                  <>
                    <div className="cm-course-toolbar">
                      <b>Courses Offered ({filteredCourses.length})</b>
                      <label className="cm-search cm-course-search">
                        ⌕
                        <input
                          placeholder="Search courses..."
                          value={courseQuery}
                          onChange={(e) => {
                            setCourseQuery(e.target.value);
                            setPage(1);
                          }}
                        />
                      </label>
                      <button
                        className="cm-filter-btn"
                        onClick={resetCourseFilters}
                      >
                        ↧ Reset
                      </button>
                    </div>

                    {selectedCourse && (
                      <div className="cm-selected-bar">
                        <span>
                          Selected: <b>{selectedCourse.name}</b> — use Admin
                          Control below
                        </span>
                        <button onClick={() => setSelectedKey(null)}>
                          Clear
                        </button>
                      </div>
                    )}

                    <div className="cm-bulk-toolbar">
                      <label className="cm-select-all">
                        <input
                          type="checkbox"
                          checked={
                            visibleCourses.length > 0 &&
                            visibleCourses.every((c) =>
                              bulkSelected.includes(c.key),
                            )
                          }
                          onChange={(e) =>
                            setBulkSelected((prev) =>
                              e.target.checked
                                ? [
                                    ...new Set([
                                      ...prev,
                                      ...visibleCourses.map((c) => c.key),
                                    ]),
                                  ]
                                : prev.filter(
                                    (key) =>
                                      !visibleCourses.some(
                                        (c) => c.key === key,
                                      ),
                                  ),
                            )
                          }
                        />{" "}
                        Select All
                      </label>
                      <span className="cm-bulk-count">
                        {bulkSelected.length} selected
                      </span>
                      <button onClick={exportSelectedCourses}>
                        ⇩ Export Selected
                      </button>
                      <button onClick={compareSelectedCourses}>
                        ⇄ Compare Selected
                      </button>
                      {bulkSelected.length > 0 && (
                        <button
                          className="cm-clear-bulk"
                          onClick={() => setBulkSelected([])}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="cm-advanced-filters">
                      <b>⚑ Advanced Filters</b>
                      <label>
                        <span>Department</span>
                        <select
                          value={departmentFilter}
                          onChange={(e) => {
                            setDepartmentFilter(e.target.value);
                            setPage(1);
                          }}
                        >
                          {departments.map((d) => (
                            <option key={d}>{d}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Fee Range</span>
                        <div className="cm-fee-range">
                          <input
                            type="number"
                            min="0"
                            placeholder="Min"
                            value={feeMin}
                            onChange={(e) => {
                              setFeeMin(e.target.value);
                              setPage(1);
                            }}
                          />
                          <input
                            type="number"
                            min="0"
                            placeholder="Max"
                            value={feeMax}
                            onChange={(e) => {
                              setFeeMax(e.target.value);
                              setPage(1);
                            }}
                          />
                        </div>
                      </label>
                      <label>
                        <span>Seats</span>
                        <select
                          value={seatFilter}
                          onChange={(e) => {
                            setSeatFilter(e.target.value);
                            setPage(1);
                          }}
                        >
                          <option>All</option>
                          <option>Available</option>
                          <option>No seats</option>
                        </select>
                      </label>
                      <button onClick={resetCourseFilters}>↺ Reset</button>
                    </div>
                    <div className="cm-table-wrap">
                      <table className="cm-table">
                        <thead>
                          <tr>
                            <th>
                              <input
                                aria-label="Select all visible courses"
                                type="checkbox"
                                checked={
                                  visibleCourses.length > 0 &&
                                  visibleCourses.every((c) =>
                                    bulkSelected.includes(c.key),
                                  )
                                }
                                onChange={(e) =>
                                  setBulkSelected((prev) =>
                                    e.target.checked
                                      ? [
                                          ...new Set([
                                            ...prev,
                                            ...visibleCourses.map((c) => c.key),
                                          ]),
                                        ]
                                      : prev.filter(
                                          (key) =>
                                            !visibleCourses.some(
                                              (c) => c.key === key,
                                            ),
                                        ),
                                  )
                                }
                              />
                            </th>
                            <th>#</th>
                            <th>Course Name</th>
                            <th>Level</th>
                            <th>Duration</th>
                            <th>Fees / Year</th>
                            <th>Seats</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleCourses.map((c, i) => (
                            <tr
                              key={c.key}
                              className={selectedKey === c.key ? "sel" : ""}
                              onClick={() =>
                                setSelectedKey((k) =>
                                  k === c.key ? null : c.key,
                                )
                              }
                            >
                              <td data-label="Select">
                                <input
                                  type="checkbox"
                                  aria-label={`Select ${c.name}`}
                                  checked={bulkSelected.includes(c.key)}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={() => toggleBulkCourse(c.key)}
                                />
                              </td>
                              <td data-label="#">
                                {(safePage - 1) * COURSE_PAGE_SIZE + i + 1}
                              </td>
                              <td
                                data-label="Course"
                                className="cm-course-name"
                              >
                                {c.name}
                              </td>
                              <td data-label="Level" className="nw">
                                <span
                                  className={`cm-level level-${c.level.toLowerCase()}`}
                                >
                                  {c.level}
                                </span>
                              </td>
                              <td data-label="Duration" className="nw">
                                {c.duration}
                              </td>
                              <td data-label="Fees / Year" className="nw">
                                {c.fee}
                              </td>
                              <td data-label="Seats" className="nw">
                                <span
                                  className={
                                    Number(c.seats) === 0 && c.seats !== null
                                      ? "cm-noseat"
                                      : ""
                                  }
                                >
                                  {seatLabel(c.seats)}
                                </span>
                              </td>
                              <td data-label="Status" className="nw">
                                <span
                                  className={`cm-status ${c.status === "Active" ? "on" : c.status === "Pending" ? "pending" : "off"}`}
                                >
                                  {c.status}
                                </span>
                              </td>
                              <td data-label="Action" className="nw">
                                <button
                                  className="cm-view"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedKey(c.key);
                                    setModal({ type: "view" });
                                  }}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {visibleCourses.length === 0 && (
                        <div className="cm-empty">
                          {courses.length === 0
                            ? "No courses are listed for this college."
                            : "No courses match these filters."}
                        </div>
                      )}
                    </div>

                    <div className="cm-table-footer">
                      <span>
                        Showing{" "}
                        {filteredCourses.length
                          ? (safePage - 1) * COURSE_PAGE_SIZE + 1
                          : 0}
                        –
                        {Math.min(
                          safePage * COURSE_PAGE_SIZE,
                          filteredCourses.length,
                        )}{" "}
                        of {filteredCourses.length} courses
                      </span>
                      <div>
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={safePage <= 1}
                        >
                          ‹
                        </button>
                        <b>{safePage}</b>
                        <button
                          onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={safePage >= totalPages}
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="cm-placeholder">
                <div className="cm-placeholder-icon">▦</div>
                <b>No college selected</b>
                <p>
                  Select a college from <strong>01. Select College</strong> to
                  see its details and courses here.
                </p>
              </div>
            )}
          </section>

          {/* ===== 03 INSIGHTS ===== */}
          <aside className="cm-right-column">
            <section className="cm-panel cm-insights">
              <h3>
                <span>▥</span> 03. Course Insights
              </h3>
              <div className="cm-chart-row">
                <div
                  className="cm-donut"
                  style={{ background: donutBackground }}
                >
                  <div>
                    <small>Total Courses</small>
                    <b>{courses.length}</b>
                  </div>
                </div>
                <div className="cm-legend">
                  {levelCounts.map((x, i) => (
                    <div key={x.label}>
                      <i
                        className="dot"
                        style={{ background: LEVEL_COLORS[i] }}
                      />
                      {x.label}
                      <b>{x.count}</b>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cm-course-summary">
                <h4>Course-wise Summary</h4>
                <div className="cm-summary-grid">
                  {levelCounts.map((item, i) => (
                    <div className="cm-summary-item" key={item.label}>
                      <span
                        className="cm-summary-icon"
                        style={{
                          background: `${LEVEL_COLORS[i]}20`,
                          color: LEVEL_COLORS[i],
                        }}
                      >
                        {item.label === "UG"
                          ? "U"
                          : item.label === "PG"
                            ? "P"
                            : item.label === "Diploma"
                              ? "D"
                              : "O"}
                      </span>
                      <span>
                        <b>{item.label}</b>
                        <small>
                          {item.count} course{item.count === 1 ? "" : "s"}
                        </small>
                      </span>
                      <strong>
                        {courses.length
                          ? Math.round((item.count / courses.length) * 100)
                          : 0}
                        %
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="cm-panel cm-filters">
              <h3>
                <span>▽</span> Quick Filters
              </h3>
              <b>Course Level</b>
              <div className="cm-chip-row">
                {["All", ...LEVELS].map((v) => (
                  <button
                    key={v}
                    className={level === v ? "active" : ""}
                    onClick={() => {
                      setLevel(v);
                      setPage(1);
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <b>Course Type</b>
              <div className="cm-chip-row">
                {["All", "Regular", "Distance", "Online"].map((v) => (
                  <button
                    key={v}
                    className={courseType === v ? "active" : ""}
                    onClick={() => {
                      setCourseType(v);
                      setPage(1);
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <b>Course Status</b>
              <div className="cm-chip-row">
                {["Active", "Pending", "Inactive", "All"].map((v) => (
                  <button
                    key={v}
                    className={courseStatus === v ? "active green" : ""}
                    onClick={() => {
                      setCourseStatus(v);
                      setPage(1);
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </section>

            <section className="cm-panel cm-popular">
              <h3>
                <span>★</span> Popular Courses
              </h3>
              {[
                {
                  name: "Computer Science Engineering",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,80,000 / year",
                },
                {
                  name: "Information Technology",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,60,000 / year",
                },
                {
                  name: "Agricultural Engineering",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,20,000 / year",
                },
                {
                  name: "Electronics and Communication Engineering",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,50,000 / year",
                },
                {
                  name: "Electrical and Electronics Engineering",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,40,000 / year",
                },
                {
                  name: "Computer Science and Business Systems",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,60,000 / year",
                },
                {
                  name: "Cyber Security",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,80,000 / year",
                },
                {
                  name: "Data Science",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,90,000 / year",
                },
                {
                  name: "Cloud Computing",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,70,000 / year",
                },
                {
                  name: "Internet of Things (IoT)",
                  level: "UG",
                  duration: "4 Years",
                  fee: "₹1,60,000 / year",
                },
              ].map((popular, i) => {
                const matchingCourse = courses.find(
                  (course) =>
                    course.name.toLowerCase() === popular.name.toLowerCase(),
                );
                return (
                  <button
                    key={popular.name}
                    className="cm-popular-item"
                    onClick={() => {
                      if (matchingCourse) {
                        setSelectedKey(matchingCourse.key);
                        setModal({ type: "view" });
                      }
                    }}
                  >
                    <span className={`cm-rank rank-${i}`}>{i + 1}</span>
                    <span>
                      <b>{popular.name}</b>
                      <small>
                        {popular.level} · {popular.duration} · {popular.fee}
                      </small>
                    </span>
                    <strong>›</strong>
                  </button>
                );
              })}
            </section>
          </aside>
        </div>

        {/* ===== LIFECYCLE ===== */}
        <section className="cm-panel cm-lifecycle">
          <h3>⚙ Course Lifecycle</h3>
          <div className="cm-lifecycle-steps">
            {lifecycle.map(([icon, title, sub, action]) => (
              <button key={title} onClick={() => runAction(action)}>
                <span>{icon}</span>
                <b>{title}</b>
                <small>{sub}</small>
              </button>
            ))}
          </div>
        </section>

        {/* ===== ADMIN CONTROL ===== */}
        <section className="cm-panel cm-admin-controls">
          <div className="cm-admin-head">
            <h3>⚙ Admin Control</h3>
            <small>
              {selectedCourse
                ? `Selected: ${selectedCourse.name}`
                : "Tip: click a course row to select it, or pick one when asked"}
            </small>
          </div>
          <div className="cm-admin-buttons">
            {adminButtons.map(([cls, label, action]) => (
              <button
                key={cls}
                className={cls}
                onClick={() => runAction(action)}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            className="cm-status-control"
            aria-label="Change selected course status"
          >
            <div className="cm-status-control-copy">
              <b>Course Status</b>
              <small>
                {selectedCourse
                  ? `Current status: ${selectedCourse.status}`
                  : "Select a course above to change its status"}
              </small>
            </div>
            <div className="cm-status-control-actions">
              <button
                type="button"
                className="cm-set-pending"
                disabled={
                  !selectedCourse || selectedCourse.status === "Pending"
                }
                onClick={() => changeCourseStatus("Pending")}
              >
                Set Pending
              </button>
              <button
                type="button"
                className="cm-set-active"
                disabled={!selectedCourse || selectedCourse.status === "Active"}
                onClick={() => changeCourseStatus("Active")}
              >
                Set Active
              </button>
            </div>
          </div>
        </section>

        <section className="cm-panel cm-history-panel">
          <div className="cm-history-heading">
            <h3>◷ Course Activity History</h3>
            <button
              onClick={() => setCourseHistory([])}
              disabled={!courseHistory.length}
            >
              Clear History
            </button>
          </div>
          {courseHistory.length ? (
            <div className="cm-history-table-wrap">
              <table className="cm-history-table">
                <thead>
                  <tr>
                    <th>Date &amp; Time</th>
                    <th>Action</th>
                    <th>Course</th>
                    <th>Performed By</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {courseHistory.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.action}</td>
                      <td>{item.courseName}</td>
                      <td>{item.by}</td>
                      <td>{item.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="cm-history-empty">
              Course changes made during this session will appear here.
            </p>
          )}
        </section>

        {/* ===== MODALS ===== */}
        {modal && (
          <div className="cm-modal-backdrop" onClick={closeModal}>
            <div
              className={`cm-modal ${modal.type === "edit" ? "wide" : ""} ${modal.type === "view" ? "course-view" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cm-close"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>

              {modal.type === "add" && (
                <>
                  <h2>Add Course</h2>
                  <p>
                    College: <b>{selectedCollege?.name}</b>
                  </p>
                  {courseForm}
                  <div className="cm-modal-actions">
                    <button onClick={closeModal}>Cancel</button>
                    <button
                      className="primary"
                      onClick={saveAdd}
                      disabled={!clean(draft.name)}
                    >
                      Add Course
                    </button>
                  </div>
                </>
              )}

              {modal.type === "edit" &&
                selectedCourse &&
                (() => {
                  const base = draftFrom(selectedCourse);
                  const dirty = (f) =>
                    clean(draft[f]) !== clean(base[f]) ? "cm-changed" : "";
                  return (
                    <>
                      <h2>Edit Course</h2>
                      <p className="cm-sub">
                        {selectedCollege?.name}
                        <br />
                        Change only what you need, then press{" "}
                        <b>Save Changes</b>. Edited fields are highlighted.
                      </p>
                      <div className="cm-edit-grid">
                        <label className={`cm-span2 ${dirty("name")}`}>
                          <b>Course Name</b>
                          <input
                            value={draft.name}
                            onChange={setField("name")}
                          />
                        </label>
                        <label>
                          <b>Course ID</b>
                          <input value={selectedCourse.id} disabled readOnly />
                        </label>
                        <label className={dirty("level")}>
                          <b>Degree Level</b>
                          <select
                            value={draft.level}
                            onChange={setField("level")}
                          >
                            {LEVELS.map((l) => (
                              <option key={l}>{l}</option>
                            ))}
                          </select>
                        </label>
                        <label className={dirty("duration")}>
                          <b>Duration</b>
                          <input
                            value={draft.duration}
                            onChange={setField("duration")}
                            placeholder="e.g. 4 Years"
                          />
                        </label>
                        <label className={dirty("fee")}>
                          <b>Annual Fee</b>
                          <input
                            value={draft.fee}
                            onChange={setField("fee")}
                            placeholder="e.g. ₹1,20,000 / year"
                          />
                        </label>
                        <label className={dirty("seats")}>
                          <b>Available Seats</b>
                          <input
                            type="number"
                            min="0"
                            inputMode="numeric"
                            value={draft.seats}
                            onChange={setField("seats")}
                            placeholder="e.g. 150 (0 = no seats)"
                          />
                        </label>
                        <label className={dirty("type")}>
                          <b>Course Type</b>
                          <select
                            value={draft.type}
                            onChange={setField("type")}
                          >
                            {COURSE_TYPES.map((t) => (
                              <option key={t}>{t}</option>
                            ))}
                          </select>
                        </label>
                        <label className={dirty("status")}>
                          <b>Status</b>
                          <select
                            value={draft.status}
                            onChange={setField("status")}
                          >
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </label>
                        <label className={dirty("affiliation")}>
                          <b>Affiliation</b>
                          <input
                            value={draft.affiliation}
                            onChange={setField("affiliation")}
                            placeholder="e.g. Anna University"
                          />
                        </label>
                        <label className={`cm-span2 ${dirty("eligibility")}`}>
                          <b>Eligibility</b>
                          <input
                            value={draft.eligibility}
                            onChange={setField("eligibility")}
                          />
                        </label>
                      </div>
                      <div className="cm-modal-actions">
                        <button
                          onClick={() => {
                            setPickKey(selectedCourse.key);
                            setModal({ type: "pick", action: "edit" });
                          }}
                        >
                          ← Course List
                        </button>
                        <button onClick={closeModal}>Cancel</button>
                        <button
                          className="primary"
                          onClick={saveEdit}
                          disabled={!clean(draft.name)}
                        >
                          Save Changes
                        </button>
                      </div>
                    </>
                  );
                })()}

              {modal.type === "view" && selectedCourse && (
                <>
                  <div className="cm-view-heading">
                    <span className="cm-view-book" aria-hidden="true">
                      ▣
                    </span>
                    <div className="cm-view-title">
                      <h2>{selectedCourse.name}</h2>
                      <p>Course details and information</p>
                    </div>
                  </div>
                  <div className="cm-view-college">
                    <span className="cm-view-college-icon" aria-hidden="true">
                      ▥
                    </span>
                    <b>College Name</b>
                    <strong>
                      {selectedCollege?.name || "College not selected"}
                    </strong>
                  </div>
                  <div className="cm-detail-grid">
                    <p className="cm-view-detail">
                      <span className="cm-view-detail-icon" aria-hidden="true">
                        #
                      </span>
                      <span className="cm-view-detail-copy">
                        <b>Course ID</b>
                        <span>{selectedCourse.id}</span>
                      </span>
                    </p>
                    <p className="cm-view-detail">
                      <span className="cm-view-detail-icon" aria-hidden="true">
                        🎓
                      </span>
                      <span className="cm-view-detail-copy">
                        <b>Degree Level</b>
                        <span>{selectedCourse.level}</span>
                      </span>
                    </p>
                    <p className="cm-view-detail">
                      <span className="cm-view-detail-icon" aria-hidden="true">
                        ◷
                      </span>
                      <span className="cm-view-detail-copy">
                        <b>Duration</b>
                        <span>{selectedCourse.duration}</span>
                      </span>
                    </p>
                    <p className="cm-view-detail">
                      <span className="cm-view-detail-icon" aria-hidden="true">
                        ₹
                      </span>
                      <span className="cm-view-detail-copy">
                        <b>Annual Fee</b>
                        <span>{selectedCourse.fee} / year</span>
                      </span>
                    </p>
                    <p className="cm-view-detail">
                      <span className="cm-view-detail-icon" aria-hidden="true">
                        ♟
                      </span>
                      <span className="cm-view-detail-copy">
                        <b>Available Seats</b>
                        <span>{seatLabel(selectedCourse.seats)}</span>
                      </span>
                    </p>
                    <p className="cm-view-detail">
                      <span className="cm-view-detail-icon" aria-hidden="true">
                        ◆
                      </span>
                      <span className="cm-view-detail-copy">
                        <b>Course Type</b>
                        <span>{selectedCourse.type}</span>
                      </span>
                    </p>
                    <p className="cm-view-detail">
                      <span className="cm-view-detail-icon" aria-hidden="true">
                        ◉
                      </span>
                      <span className="cm-view-detail-copy">
                        <b>Status</b>
                        <span>
                          <i
                            className={`cm-view-badge ${selectedCourse.status === "Active" ? "good" : selectedCourse.status === "Pending" ? "pending" : "muted"}`}
                          >
                            {selectedCourse.status}
                          </i>
                        </span>
                      </span>
                    </p>
                    <p className="cm-view-detail">
                      <span className="cm-view-detail-icon" aria-hidden="true">
                        ↗
                      </span>
                      <span className="cm-view-detail-copy">
                        <b>Affiliation</b>
                        <span>
                          {selectedCourse.affiliation || "Not listed"}
                        </span>
                      </span>
                    </p>
                    <p className="cm-view-detail cm-span2">
                      <span className="cm-view-detail-icon" aria-hidden="true">
                        ♙
                      </span>
                      <span className="cm-view-detail-copy">
                        <b>Eligibility</b>
                        <span>{selectedCourse.eligibility}</span>
                      </span>
                    </p>
                  </div>
                  <div className="cm-modal-actions">
                    <button onClick={closeModal}>Close</button>
                    <button
                      className="primary"
                      onClick={() => {
                        setPickKey(selectedCourse.key);
                        setModal({ type: "pick", action: "view" });
                      }}
                    >
                      ☰ Course List
                    </button>
                  </div>
                </>
              )}

              {modal.type === "compare" && modal.compareCourses && (
                <>
                  <h2>Compare Courses</h2>
                  <p>Compare key details for the selected courses.</p>
                  <div className="cm-compare-wrap">
                    <table className="cm-compare-table">
                      <thead>
                        <tr>
                          <th>Detail</th>
                          {modal.compareCourses.map((c) => (
                            <th key={c.key}>{c.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Level", "level"],
                          ["Duration", "duration"],
                          ["Fees / Year", "fee"],
                          ["Available Seats", "seats"],
                          ["Status", "status"],
                          ["Eligibility", "eligibility"],
                        ].map(([label, field]) => (
                          <tr key={field}>
                            <th>{label}</th>
                            {modal.compareCourses.map((c) => (
                              <td key={c.key}>
                                {field === "seats"
                                  ? seatLabel(c[field])
                                  : c[field] || "Not listed"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="cm-modal-actions">
                    <button onClick={closeModal}>Close</button>
                  </div>
                </>
              )}

              {modal.type === "delete" && selectedCourse && (
                <>
                  <h2>Delete Course</h2>
                  <p>
                    Delete <b>{selectedCourse.name}</b> from{" "}
                    <b>{selectedCollege?.name}</b>? This only changes this admin
                    screen and cannot be undone here.
                  </p>
                  <div className="cm-modal-actions">
                    <button onClick={closeModal}>Cancel</button>
                    <button className="danger" onClick={confirmDelete}>
                      Delete
                    </button>
                  </div>
                </>
              )}

              {modal.type === "pick" && (
                <>
                  <h2>Choose a course</h2>
                  <p>
                    Select the course of <b>{selectedCollege?.name}</b> you want
                    to{" "}
                    {modal.action === "view"
                      ? "view"
                      : modal.action === "edit"
                        ? "edit"
                        : modal.action === "publish"
                          ? "publish / hide"
                          : modal.action === "verify"
                            ? "verify"
                            : "delete"}
                    .
                    {modal.action === "edit" &&
                      " Click a course to see its details."}
                  </p>
                  <div className="cm-pick-list" role="listbox">
                    {courses.map((cr) => (
                      <button
                        key={cr.key}
                        role="option"
                        aria-selected={pickKey === cr.key}
                        className={pickKey === cr.key ? "on" : ""}
                        onClick={() => {
                          if (modal.action === "edit") {
                            openAction("edit", cr);
                          } else setPickKey(cr.key);
                        }}
                      >
                        <span>{cr.name}</span>
                        <small>
                          {cr.level} · {cr.duration} · Seats:{" "}
                          {seatLabel(cr.seats)}
                        </small>
                      </button>
                    ))}
                  </div>
                  <div className="cm-modal-actions">
                    <button onClick={closeModal}>Cancel</button>
                    <button
                      className="primary"
                      style={
                        modal.action === "edit"
                          ? { display: "none" }
                          : undefined
                      }
                      onClick={() => {
                        const course = courses.find((c) => c.key === pickKey);
                        const action = modal.action;
                        setModal(null);
                        if (course) openAction(action, course);
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </StandaloneShell>
  );
}