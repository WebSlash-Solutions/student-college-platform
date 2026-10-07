import { useEffect, useMemo, useState } from "react";
import dbData from "./db.json";

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
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Colleges", href: "#colleges" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

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

const courseNamesFromOldData = (college, courseIndex) => {
  const ids = Array.isArray(college?.courseIds)
    ? college.courseIds
    : college?.courseIds !== undefined
      ? [college.courseIds]
      : [];

  return ids
    .map((id) => {
      const course = courseIndex[String(id)];

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
    .map((id) => courseIndex[String(id)])
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
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("rating-desc");

  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  /* =======================================================
     LOAD DATA FROM db.json (imported, no server)
  ======================================================= */

  useEffect(() => {
    setLoading(true);
    setError("");

    const collegeList = Array.isArray(dbData?.colleges) ? dbData.colleges : [];
    const courseList = Array.isArray(dbData?.courses) ? dbData.courses : [];
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

    setColleges(
      collegeList.map((college) => ({
        ...college,
        courseIds: [
          ...new Set([
            ...toList(college.courseIds),
            ...(byCollege[String(college.id)] || []),
          ]),
        ],
      })),
    );

    setCourses(courseList);
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
      }
    });

    return index;
  }, [courses]);

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
  }, [colleges, courseIndex, search, city, type, sort]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, city, type, sort]);

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

  const filtersActive = Boolean(search || city || type);

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setType("");
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
     RETURN
  ======================================================= */

  return (
    <>
      <style>{STYLE}</style>

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
            <a href="#home" className="cc-logo">
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
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="cc-nav-actions">
              <a
                href="#colleges"
                className="cc-icon-btn"
                aria-label="Search colleges"
              >
                <Icon name="search" size={18} />
              </a>

              <a href="/login" className="cc-btn cc-btn-outline cc-btn-sm">
                Login
              </a>

              <a href="/register" className="cc-btn cc-btn-primary cc-btn-sm">
                Register
              </a>

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
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}

            <a href="/login" className="cc-btn cc-btn-outline cc-btn-block">
              Login
            </a>

            <a href="/register" className="cc-btn cc-btn-primary cc-btn-block">
              Register
            </a>
          </nav>
        </header>

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
                <a href="#colleges" className="cc-btn cc-btn-primary cc-btn-lg">
                  Explore Colleges
                  <Icon name="arrow" size={18} />
                </a>

                <a href="#colleges" className="cc-btn cc-btn-ghost cc-btn-lg">
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
                  src="/src/assets/home student.png"
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

        {/* =================================================
            ABOUT
        ================================================= */}

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
              <img src="/src/assets/about student.jpg" alt="College campus" />
            </div>
          </div>
        </section>

        {/* =================================================
            COLLEGE SECTION
        ================================================= */}

        <section className="cc-section cc-colleges" id="colleges">
          <div className="cc-wrap">
            <div className="cc-col-head">
              <span className="cc-eyebrow">College Directory</span>

              <h2>Explore Engineering Colleges</h2>

              <p>
                Search colleges and view complete information including basic
                details, institution type, courses, fees, eligibility and
                facilities.
              </p>
            </div>

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

                <strong>No colleges found</strong>

                <button className="cc-link-btn" onClick={clearFilters}>
                  Clear filters
                </button>
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
