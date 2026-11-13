import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   HELPERS
========================================================= */

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#2f80ed,#56ccf2)",
  "linear-gradient(135deg,#9b51e0,#c084fc)",
  "linear-gradient(135deg,#11998e,#38ef7d)",
  "linear-gradient(135deg,#f2994a,#f2c94c)",
  "linear-gradient(135deg,#eb5757,#f08a8a)",
  "linear-gradient(135deg,#1e3c72,#2a5298)",
];

const gradientFor = (id = "") =>
  AVATAR_GRADIENTS[
    id.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0) %
      AVATAR_GRADIENTS.length
  ];

const getPageList = (current, total) => {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "…a", total];
  if (current >= total - 2) return [1, "…b", total - 2, total - 1, total];
  return [1, "…a", current, "…b", total];
};

/* =========================================================
   DATA
========================================================= */

const studentsData = [
  {
    id: "STU10928",
    name: "Keerthana",
    email: "keerthana@gmail.com",
    phone: "+91 98765 43210",
    college: "ABC Engineering College",
    course: "B.Tech CSE",
    applications: 3,
    status: "Active",
    registered: "29 Sep 2026",
    dob: "15 May 2005",
    gender: "Female",
    address: "12, Anna Nagar",
    city: "Chennai",
    leadStatus: "Purchased",
    purchasedBy: "ABC Engineering College",
    leadPrice: "₹100",
    applicationList: [
      { college: "ABC Engineering College", course: "B.Tech CSE", status: "Accepted" },
      { college: "PSG College", course: "B.Tech CSE", status: "Pending" },
    ],
  },
  {
    id: "STU10927",
    name: "Rahul K",
    email: "rahulk@gmail.com",
    phone: "+91 98765 12345",
    college: "PSG College",
    course: "B.Tech Mechanical",
    applications: 2,
    status: "Active",
    registered: "29 Sep 2026",
    dob: "10 March 2004",
    gender: "Male",
    address: "45, RS Puram",
    city: "Coimbatore",
    leadStatus: "Purchased",
    purchasedBy: "PSG College",
    leadPrice: "₹100",
    applicationList: [
      { college: "PSG College", course: "B.Tech Mechanical", status: "Pending" },
      { college: "City College", course: "B.Tech Mechanical", status: "Rejected" },
    ],
  },
  {
    id: "STU10926",
    name: "Ananya R",
    email: "ananya@gmail.com",
    phone: "+91 98765 11111",
    college: "City College",
    course: "BCA",
    applications: 4,
    status: "Active",
    registered: "28 Sep 2026",
    dob: "21 July 2005",
    gender: "Female",
    address: "23, MG Road",
    city: "Bangalore",
    leadStatus: "Converted",
    purchasedBy: "City College",
    leadPrice: "₹100",
    applicationList: [
      { college: "City College", course: "BCA", status: "Accepted" },
      { college: "ABC Engineering College", course: "BCA", status: "Accepted" },
    ],
  },
  {
    id: "STU10925",
    name: "Arjun P",
    email: "arjunp@gmail.com",
    phone: "+91 98765 22222",
    college: "St. Joseph's College",
    course: "B.Com",
    applications: 1,
    status: "Active",
    registered: "28 Sep 2026",
    dob: "18 January 2005",
    gender: "Male",
    address: "8, Church Street",
    city: "Chennai",
    leadStatus: "New",
    purchasedBy: "—",
    leadPrice: "₹100",
    applicationList: [
      { college: "St. Joseph's College", course: "B.Com", status: "Pending" },
    ],
  },
  {
    id: "STU10924",
    name: "Sneha M",
    email: "sneham@gmail.com",
    phone: "+91 98765 33333",
    college: "Medical College",
    course: "B.Sc Nursing",
    applications: 2,
    status: "Blocked",
    registered: "27 Sep 2026",
    dob: "05 February 2005",
    gender: "Female",
    address: "19, Lake View",
    city: "Madurai",
    leadStatus: "Invalid",
    purchasedBy: "Medical College",
    leadPrice: "₹100",
    applicationList: [
      { college: "Medical College", course: "B.Sc Nursing", status: "Rejected" },
    ],
  },
  {
    id: "STU10923",
    name: "Vignesh S",
    email: "vignesh@gmail.com",
    phone: "+91 98765 44444",
    college: "Kongu College",
    course: "B.Tech IT",
    applications: 2,
    status: "Active",
    registered: "27 Sep 2026",
    dob: "12 June 2004",
    gender: "Male",
    address: "22, Gandhi Road",
    city: "Erode",
    leadStatus: "Purchased",
    purchasedBy: "Kongu College",
    leadPrice: "₹100",
    applicationList: [
      { college: "Kongu College", course: "B.Tech IT", status: "Accepted" },
    ],
  },
];

const extraStudents = Array.from({ length: 44 }, (_, index) => {
  const number = 10922 - index;
  const names = [
    "Karthik S", "Priya V", "Mohamed A", "Divya K", "Harish R", "Nithya P",
    "Santhosh M", "Swetha R", "Dinesh K", "Pavithra S", "Lokesh B",
  ];
  const colleges = [
    "ABC Engineering College", "PSG College", "City College", "Kongu College",
    "St. Joseph's College", "Medical College", "XYZ Institute of Technology",
  ];
  const coursesList = [
    "B.Tech CSE", "B.Tech Mechanical", "BCA", "B.Com", "B.Sc Nursing",
    "B.Tech IT", "BBA",
  ];
  const femaleNames = ["Priya V", "Divya K", "Nithya P", "Swetha R", "Pavithra S"];
  const name = names[index % names.length];
  const college = colleges[index % colleges.length];
  const course = coursesList[index % coursesList.length];
  const blocked = index % 11 === 0;
  return {
    id: `STU${number}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
    phone: `+91 98765 ${String(50000 + index).slice(-5)}`,
    college,
    course,
    applications: (index % 4) + 1,
    status: blocked ? "Blocked" : "Active",
    registered: `${27 - (index % 20)} Sep 2026`,
    dob: `${String((index % 27) + 1).padStart(2, "0")} ${
      ["January", "February", "March", "April", "May", "June", "July"][index % 7]
    } 2005`,
    gender: femaleNames.includes(name) ? "Female" : "Male",
    address: `${index + 10}, Main Road`,
    city: ["Chennai", "Coimbatore", "Bangalore", "Madurai", "Erode"][index % 5],
    leadStatus: ["New", "Purchased", "Converted", "Invalid"][index % 4],
    purchasedBy: index % 4 === 0 ? "—" : college,
    leadPrice: "₹100",
    applicationList: [
      {
        college,
        course,
        status: index % 3 === 0 ? "Accepted" : index % 3 === 1 ? "Pending" : "Rejected",
      },
    ],
  };
});

studentsData.push(...extraStudents);

const addAcademicDetails = (student, index) => {
  const tenth = {
    Tamil: 78 + (index % 17),
    English: 81 + (index % 15),
    Mathematics: 84 + (index % 13),
    Science: 79 + (index % 16),
    SocialScience: 82 + (index % 14),
  };
  tenth.Total = Object.values(tenth).reduce((sum, mark) => sum + mark, 0);
  tenth.Percentage = (tenth.Total / 5).toFixed(2);

  const base = index % 11;
  const twelfth = {
    English: 78 + ((base + 2) % 18),
    Physics: 72 + ((base + 5) % 23),
    Chemistry: 74 + ((base + 3) % 22),
    Mathematics: 76 + ((base + 7) % 21),
    ComputerScience: 80 + ((base + 1) % 18),
    Biology: 75 + ((base + 4) % 20),
    Accountancy: 77 + ((base + 6) % 19),
    Economics: 79 + ((base + 8) % 17),
    Commerce: 81 + ((base + 9) % 16),
  };

  const relevantSubjects = student.course.includes("Nursing")
    ? ["English", "Physics", "Chemistry", "Mathematics", "Biology"]
    : student.course.includes("CSE") ||
        student.course.includes("IT") ||
        student.course.includes("Mechanical")
      ? ["English", "Physics", "Chemistry", "Mathematics", "ComputerScience"]
      : student.course.includes("B.Com") || student.course.includes("BBA")
        ? ["English", "Accountancy", "Economics", "Commerce", "Mathematics"]
        : ["English", "Physics", "Chemistry", "Mathematics", "ComputerScience"];

  twelfth.Total = relevantSubjects.reduce((sum, key) => sum + twelfth[key], 0);
  twelfth.Percentage = (twelfth.Total / relevantSubjects.length).toFixed(2);
  twelfth.Subjects = relevantSubjects;

  const cutoff = ["B.Tech CSE", "B.Tech IT", "B.Tech Mechanical"].includes(student.course)
    ? ((twelfth.Mathematics + twelfth.Physics + twelfth.Chemistry) / 2).toFixed(2)
    : ((twelfth.Mathematics + twelfth.English) / 2).toFixed(2);

  student.tenthMarks = tenth;
  student.twelfthMarks = twelfth;
  student.cutoff = cutoff;
};

studentsData.forEach(addAcademicDetails);

// Shared with StudentDashboard.jsx -> Apply Now.
const APPLICATIONS_KEY = "scp_applications";
const readSubmittedApplications = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const mergeSubmittedApplications = (currentStudents, submittedApplications) => {
  let nextStudents = [...currentStudents];

  submittedApplications.forEach((application) => {
    if (!application || !application.email) return;

    const email = String(application.email).trim().toLowerCase();
    const applicationId = String(application.id || "");
    const existingIndex = nextStudents.findIndex(
      (student) => String(student.email || "").trim().toLowerCase() === email,
    );

    const applicationItem = {
      college: application.collegeName || "—",
      course: application.courseName || "—",
      status: application.status || "Submitted",
      appliedOn: application.appliedOn || "",
    };

    if (existingIndex >= 0) {
      const existing = nextStudents[existingIndex];
      const existingApplications = existing.applicationList || [];
      if (
        applicationId &&
        existingApplications.some((item) => String(item.applicationId || "") === applicationId)
      ) {
        return;
      }

      nextStudents[existingIndex] = {
        ...existing,
        name: application.studentName || existing.name,
        phone: application.mobile ? `+91 ${application.mobile}` : existing.phone,
        college: application.collegeName || existing.college,
        course: application.courseName || existing.course,
        city: application.city || existing.city,
        applications: (Number(existing.applications) || existingApplications.length) + 1,
        applicationList: [
          ...existingApplications,
          { ...applicationItem, applicationId },
        ],
        leadStatus: existing.leadStatus || "New",
        cutoff: application.cutoff ?? existing.cutoff,
        tenthMarks: {
          ...(existing.tenthMarks || {}),
          Percentage: Number(application.mark10 || 0),
        },
        twelfthMarks: {
          ...(existing.twelfthMarks || {}),
          Percentage: Number(application.mark12 || 0),
          ...(application.subjects || {}),
          Subjects: [
            ...new Set([
              ...(existing.twelfthMarks?.Subjects || []),
              ...Object.keys(application.subjects || {}),
            ]),
          ],
        },
      };
      return;
    }

    const maxNumber = nextStudents.reduce((max, student) => {
      const number = parseInt(String(student.id || "").replace("STU", ""), 10);
      return Number.isFinite(number) ? Math.max(max, number) : max;
    }, 10928);

    const newStudent = {
      id: `STU${maxNumber + 1}`,
      name: application.studentName || "—",
      email: application.email,
      phone: application.mobile ? `+91 ${application.mobile}` : "—",
      college: application.collegeName || "—",
      course: application.courseName || "—",
      applications: 1,
      status: "Pending", // new submission -> waits in "New Requests" until approved/blocked
      registered: application.appliedOn
        ? new Date(application.appliedOn).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      dob: "—",
      gender: "—",
      address: "—",
      city: application.city || "—",
      leadStatus: "New",
      purchasedBy: "—",
      leadPrice: "₹100",
      applicationList: [{ ...applicationItem, applicationId }],
    };

    const mark10 = Number(application.mark10 || 0);
    const mark12 = Number(application.mark12 || 0);
    const submittedSubjects = Object.fromEntries(
      Object.entries(application.subjects || {}).map(([key, value]) => [key, Number(value)]),
    );
    newStudent.tenthMarks = {
      Tamil: "—",
      English: "—",
      Mathematics: "—",
      Science: "—",
      SocialScience: "—",
      Total: mark10 * 5,
      Percentage: mark10,
    };
    newStudent.twelfthMarks = {
      ...submittedSubjects,
      Total: mark12 * 5,
      Percentage: mark12,
      Subjects: Object.keys(submittedSubjects),
    };
    newStudent.cutoff = application.cutoff ?? "—";
    nextStudents.unshift(newStudent);
  });

  return nextStudents;
};

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  college: "",
  course: "",
  city: "",
  address: "",
  status: "Active",
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Avatar({ student, size = "md" }) {
  return (
    <div
      className={`avatar avatar-${size}`}
      style={{ background: gradientFor(student.id) }}
    >
      {initials(student.name)}
      {student.status === "Active" && <span className="online-dot" />}
    </div>
  );
}

const statusClass = (status) =>
  ({
    Active: "pill-green",
    Accepted: "pill-green",
    Pending: "pill-orange",
    Blocked: "pill-red",
    Rejected: "pill-red",
  })[status] || "";

/* =========================================================
   MAIN PAGE
========================================================= */

function StudentManagementContent({ topSearch = "" }) {
  const [students, setStudents] = useState(() =>
    mergeSubmittedApplications(studentsData, readSubmittedApplications()),
  );
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const syncApplications = (event) => {
      const submitted = Array.isArray(event?.detail)
        ? event.detail
        : readSubmittedApplications();

      setStudents((current) =>
        mergeSubmittedApplications(current, submitted),
      );
    };

    window.addEventListener("scp:applications-updated", syncApplications);
    window.addEventListener("storage", syncApplications);

    return () => {
      window.removeEventListener("scp:applications-updated", syncApplications);
      window.removeEventListener("storage", syncApplications);
    };
  }, []);

  useEffect(() => {
    setSearch(topSearch);
    setCurrentPage(1);
  }, [topSearch]);
  const [collegeFilter, setCollegeFilter] = useState("All Colleges");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(null); // { mode: 'add' | 'edit', form }
  const [formError, setFormError] = useState("");
  const [tab, setTab] = useState("accepted"); // 'new' | 'accepted' | 'blocked'

  const studentsPerPage = 5;

  const selectedStudent = students.find((s) => s.id === selectedId) || null;

  const colleges = ["All Colleges", ...new Set(students.map((s) => s.college))];
  const courses = ["All Courses", ...new Set(students.map((s) => s.course))];

  const filteredStudents = students.filter((s) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      [s.name, s.id, s.email, s.phone, s.college, s.course, s.status, s.city, s.leadStatus]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
    const matchesCollege = collegeFilter === "All Colleges" || s.college === collegeFilter;
    const matchesCourse = courseFilter === "All Courses" || s.course === courseFilter;
    const matchesStatus = statusFilter === "All Status" || s.status === statusFilter;
    const matchesTab =
      tab === "new"
        ? s.status === "Pending"
        : tab === "blocked"
          ? s.status === "Blocked"
          : s.status === "Active";
    return matchesSearch && matchesCollege && matchesCourse && matchesStatus && matchesTab;
  });

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

  const totalApplications = students.reduce((sum, s) => sum + s.applications, 0);
  const activeCount = students.filter((s) => s.status === "Active").length;
  const blockedCount = students.filter((s) => s.status === "Blocked").length;
  const newCount = students.filter((s) => s.status === "Pending").length;

  // jump to top whenever a profile page opens / closes
  useEffect(() => {
    const area = document.querySelector(".student-layout-main, .admin-main");
    if (area) area.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setModal(null);
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const updateFilter = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setCollegeFilter("All Colleges");
    setCourseFilter("All Courses");
    setStatusFilter("All Status");
    setCurrentPage(1);
  };

  const toggleBlock = (student) => {
    const next = student.status === "Blocked" ? "Active" : "Blocked";
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, status: next } : s)),
    );
  };

  // Accept / Block a new request: moves it out of "New Requests"
  const decideRequest = (student, decision) => {
    const nextStatus = decision === "accept" ? "Active" : "Blocked";
    const appStatus = decision === "accept" ? "Accepted" : "Rejected";
    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id
          ? {
              ...s,
              status: nextStatus,
              applicationList: (s.applicationList || []).map((a) =>
                a.status === "Submitted" ? { ...a, status: appStatus } : a,
              ),
            }
          : s,
      ),
    );
  };

  const openEdit = (student) => {
    setFormError("");
    setModal({ mode: "edit", form: { ...student } });
  };

  const openAdd = () => {
    setFormError("");
    setModal({ mode: "add", form: { ...EMPTY_FORM } });
  };

  const closeModal = () => setModal(null);

  const saveModal = () => {
    const form = modal.form;
    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Name and Email are required.");
      return;
    }

    if (modal.mode === "edit") {
      setStudents((prev) =>
        prev.map((s) => (s.id === form.id ? { ...s, ...form } : s)),
      );
    } else {
      const maxNumber = Math.max(
        ...students.map((s) => parseInt(s.id.replace("STU", ""), 10)),
      );
      const today = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const newStudent = {
        ...form,
        id: `STU${maxNumber + 1}`,
        applications: 0,
        registered: today,
        dob: "—",
        gender: "—",
        leadStatus: "New",
        purchasedBy: "—",
        leadPrice: "₹100",
        applicationList: [],
      };
      addAcademicDetails(newStudent, students.length);
      setStudents((prev) => [newStudent, ...prev]);
      setSelectedId(newStudent.id);
      setCurrentPage(1);
    }
    setModal(null);
  };

  const handleSmoke = (e) => {
    const btn = e.target.closest && e.target.closest("button");
    if (!btn || btn.disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = btn.getBoundingClientRect();
    const cs = window.getComputedStyle(btn);
    const rgbOf = (str) => {
      const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(str || "");
      if (!m || (m[4] !== undefined && parseFloat(m[4]) === 0)) return null;
      return [Number(m[1]), Number(m[2]), Number(m[3])];
    };
    const isLight = (c) => c && c[0] > 235 && c[1] > 235 && c[2] > 235;
    let color = rgbOf(cs.backgroundColor) || rgbOf(cs.backgroundImage);
    if (!color || isLight(color)) color = rgbOf(cs.borderTopColor) || rgbOf(cs.color);
    if (!color || isLight(color)) color = [45, 125, 240];
    const colorVar = color.join(",");
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    for (let i = 0; i < 9; i += 1) {
      const puff = document.createElement("span");
      puff.className = "sm-smoke";
      puff.style.setProperty("--c", colorVar);
      puff.style.left = `${x + (Math.random() - 0.5) * 18}px`;
      puff.style.top = `${y + (Math.random() - 0.5) * 10}px`;
      puff.style.setProperty("--dx", `${(Math.random() - 0.5) * 70}px`);
      puff.style.setProperty("--dy", `${-30 - Math.random() * 55}px`);
      puff.style.setProperty("--s", `${1.6 + Math.random() * 1.6}`);
      puff.style.setProperty("--t", `${0.7 + Math.random() * 0.5}s`);
      document.body.appendChild(puff);
      setTimeout(() => puff.remove(), 1400);
    }
  };

  return (
    <>
      <style>{`
.sm-page, .sm-page * { box-sizing: border-box; }
.sm-page { font-family: "Inter", "Segoe UI", Arial, Helvetica, sans-serif; color: #14325c; line-height: 1.4; text-align: left; }
.sm-page h1, .sm-page h2, .sm-page h3, .sm-page p { letter-spacing: normal; }
.sm-page button, .sm-page input, .sm-page select { font-family: inherit; }
.sm-page .sm-content { max-width: 1400px; margin: 0 auto; }
.sm-page .hero {
          position: relative;
          overflow: hidden;
          min-height: 96px;
          padding: 16px 22px;
          margin-bottom: 16px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 16px;
          background:
            radial-gradient(circle at 12% 30%, rgba(255,255,255,.9), transparent 38%),
            linear-gradient(100deg, #eaf2ff 0%, #d9e8ff 55%, #c5dcff 100%);
          border: 1px solid #dbe8fb;
        }
.sm-page .hero-icon {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 10px 24px rgba(45,125,240,.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          position: relative;
          z-index: 1;
        }
.sm-page .hero-text { position: relative; z-index: 1; min-width: 0; }
.sm-page .hero-text h1 { margin: 0; font-size: 22px; color: #0f2a52; font-weight: 800; }
.sm-page .hero-text p { margin: 4px 0 0; font-size: 13px; color: #3b5578; }
.sm-page .hero-art {
          position: absolute;
          right: 18px;
          bottom: -22px;
          font-size: 110px;
          line-height: 1;
          opacity: .2;
          pointer-events: none;
          user-select: none;
        }
.sm-page .sm-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 16px;
        }
.sm-page .sm-stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid transparent;
          box-shadow: 0 4px 14px rgba(20,50,92,.05);
          min-width: 0;
        }
.sm-page .sm-stat-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          flex-shrink: 0;
        }
.sm-page .stat-body { min-width: 0; flex: 1; }
.sm-page .stat-title { font-size: 12px; font-weight: 600; color: #34506f; }
.sm-page .stat-row { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.sm-page .stat-number { font-size: 24px; font-weight: 800; color: #0f2a52; line-height: 1.2; }
.sm-page .stat-trend { font-size: 11px; font-weight: 700; white-space: nowrap; }
.sm-page .stat-blue { background: linear-gradient(135deg,#eaf3ff,#f6faff); border-color: #d3e5fb; }
.sm-page .stat-blue .sm-stat-icon { background: #d6e8ff; color: #2d7df0; }
.sm-page .stat-blue .stat-trend { color: #1f9d6a; }
.sm-page .stat-green { background: linear-gradient(135deg,#e6f8ee,#f4fcf8); border-color: #c8ecd8; }
.sm-page .stat-green .sm-stat-icon { background: #1fb36d; color: #fff; }
.sm-page .stat-green .stat-trend { color: #1f9d6a; }
.sm-page .stat-purple { background: linear-gradient(135deg,#f0ebff,#f9f7ff); border-color: #ddd2fa; }
.sm-page .stat-purple .sm-stat-icon { background: #7a5af0; color: #fff; }
.sm-page .stat-purple .stat-trend { color: #1f9d6a; }
.sm-page .stat-red { background: linear-gradient(135deg,#ffecee,#fff7f8); border-color: #fbd0d5; }
.sm-page .stat-red .sm-stat-icon { background: #fde0e3; color: #e5484d; }
.sm-page .stat-red .stat-trend { color: #e5484d; }
.sm-page .filter-bar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 14px;
        }
.sm-page .filter-search {
          flex: 1 1 260px;
          min-width: 0;
          height: 40px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #dbe5f2;
          border-radius: 10px;
          background: #fff;
          color: #7a8ca6;
        }
.sm-page .filter-search:focus-within { border-color: #2d7df0; box-shadow: 0 0 0 3px rgba(45,125,240,.12); }
.sm-page .filter-search input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          font-size: 13px;
          color: #14325c;
        }
.sm-page .filter-select {
          height: 40px;
          padding: 0 10px;
          border: 1px solid #dbe5f2;
          border-radius: 10px;
          background: #fff;
          color: #28466b;
          font-size: 13px;
          cursor: pointer;
          outline: none;
          max-width: 100%;
        }
.sm-page .filter-select:focus { border-color: #2d7df0; }
.sm-page .reset-btn {
          height: 40px;
          width: 40px;
          border: 1px solid #dbe5f2;
          border-radius: 10px;
          background: #fff;
          color: #5b7190;
          font-size: 16px;
          cursor: pointer;
        }
.sm-page .reset-btn:hover { background: #eef4fd; }
.sm-page .add-btn {
          height: 40px;
          padding: 0 18px;
          border: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, #2d7df0, #1d63d6);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(45,125,240,.25);
          white-space: nowrap;
        }
.sm-page .add-btn:hover { filter: brightness(1.06); }
.sm-page .content-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 20px; align-items: start; }
.sm-page .list-count { margin: 0 0 10px; font-size: 12px; color: #6a7f9c; }
.sm-page .student-list { display: flex; flex-direction: column; gap: 10px; }
.sm-page .student-card {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px 16px;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #e4ebf5;
          border-radius: 12px;
          cursor: pointer;
          transition: border-color .15s, box-shadow .15s, background .15s;
        }
.sm-page .student-card:hover { border-color: #b9d3f7; box-shadow: 0 6px 18px rgba(45,125,240,.10); }
.sm-page .student-card.selected { background: #eaf3ff; border-color: #2d7df0; box-shadow: 0 6px 20px rgba(45,125,240,.16); }
.sm-page .sc-info { flex: 1 1 220px; min-width: 0; }
.sm-page .sc-name { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 700; color: #0f2a52; }
.sm-page .verified {
          width: 15px; height: 15px; border-radius: 50%;
          background: #2d7df0; color: #fff; font-size: 9px;
          display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
.sm-page .sc-meta { margin-top: 3px; font-size: 12px; color: #34506f; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sm-page .sc-meta2 { margin-top: 2px; font-size: 12px; color: #5d7ea6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sm-page .sc-right { display: flex; align-items: center; flex-wrap: wrap; gap: 10px 14px; margin-left: auto; }
.sm-page .sc-apps {
          display: flex; align-items: center; gap: 6px;
          padding-left: 16px; border-left: 1px solid #d5dfee;
          font-size: 12px; color: #34506f; white-space: nowrap;
        }
.sm-page .pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border-radius: 20px;
          font-size: 11px; font-weight: 700; white-space: nowrap;
        }
.sm-page .pill-green { background: #dff6e9; color: #14935f; }
.sm-page .pill-orange { background: #fff0cf; color: #d98d00; }
.sm-page .pill-red { background: #ffe3e6; color: #dc3f4d; }
.sm-page .view-btn {
          height: 34px; padding: 0 14px;
          border: 1px solid #bcd4f6; border-radius: 9px;
          background: #fff; color: #2166cc;
          font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;
        }
.sm-page .view-btn:hover, .sm-page .student-card.selected .view-btn { background: #2d7df0; border-color: #2d7df0; color: #fff; }
.sm-page .avatar {
          position: relative; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; border-radius: 50%;
          box-shadow: 0 0 0 3px #fff, 0 2px 8px rgba(20,50,92,.18);
        }
.sm-page .avatar-md { width: 46px; height: 46px; font-size: 16px; }
.sm-page .avatar-lg { width: 68px; height: 68px; font-size: 24px; }
.sm-page .online-dot {
          position: absolute; right: 2px; bottom: 2px;
          width: 12px; height: 12px; border-radius: 50%;
          background: #22c55e; border: 2px solid #fff;
        }
.sm-page .empty-state { padding: 60px 20px; text-align: center; background: #fff; border: 1.5px dashed #cfdcee; border-radius: 14px; color: #6a7f9c; }
.sm-page .empty-state .empty-icon { font-size: 34px; margin-bottom: 8px; }
.sm-page .empty-state h3 { margin: 0; color: #28466b; font-size: 16px; }
.sm-page .empty-state p { margin: 6px 0 0; font-size: 13px; }
.sm-page .pagination { display: flex; align-items: center; gap: 8px; margin-top: 18px; flex-wrap: wrap; }
.sm-page .page-btn {
          min-width: 36px; height: 36px; padding: 0 8px;
          border: 1px solid #dbe5f2; border-radius: 9px;
          background: #fff; color: #4b6586; font-size: 13px; font-weight: 600; cursor: pointer;
        }
.sm-page .page-btn:hover:not(:disabled) { background: #eef4fd; }
.sm-page .page-btn.active { background: #2d7df0; border-color: #2d7df0; color: #fff; }
.sm-page .page-btn:disabled { opacity: .4; cursor: not-allowed; }
.sm-page .page-dots { color: #8ea0b9; padding: 0 2px; }
.sm-page .profile-panel {
          width: 100%;
          background: #fff;
          border: 1px solid #e1e9f5;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(20,50,92,.08);
          overflow: hidden;
        }
.sm-page .panel-head {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
          padding: 10px 16px;
          background: #fff;
          border-bottom: 1px solid #edf2f9;
        }
.sm-page .back-button {
          height: 32px; padding: 0 12px;
          border: 1px solid #bcd4f6; border-radius: 8px;
          background: #fff; color: #2166cc;
          font-size: 12px; font-weight: 600; cursor: pointer;
        }
.sm-page .back-button:hover { background: #eaf3ff; }
.sm-page .panel-head-id { font-size: 12px; color: #6a7f9c; }
.sm-page .panel-head-id strong { color: #0f2a52; }
.sm-page .panel-head h2 { margin: 0; display: flex; align-items: center; gap: 10px; font-size: 18px; color: #0f2a52; }
.sm-page .panel-head h2 span.icon {
          width: 32px; height: 32px; border-radius: 9px; background: #e3efff; color: #2d7df0;
          display: inline-flex; align-items: center; justify-content: center; font-size: 17px;
        }
.sm-page .panel-close {
          width: 32px; height: 32px; border: 0; border-radius: 9px;
          background: #f1f5fa; color: #4b6586; font-size: 14px; cursor: pointer;
        }
.sm-page .panel-close:hover { background: #e3ebf6; }
.sm-page .panel-body {
          padding: 14px 16px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          align-items: start;
        }
.sm-page .panel-body > .panel-profile, .sm-page .panel-body > .panel-actions { grid-column: 1 / -1; }
.sm-page .panel-profile {
          display: flex; align-items: center; gap: 16px;
          padding: 14px; border-radius: 12px;
          background: linear-gradient(100deg, #eaf2ff, #f6faff);
          border: 1px solid #dbe8fb;
        }
.sm-page .panel-profile .avatar-lg { width: 68px; height: 68px; font-size: 24px; }
.sm-page .panel-profile-info { flex: 1; min-width: 0; }
.sm-page .panel-name-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.sm-page .panel-name { display: flex; align-items: center; gap: 6px; margin: 0; font-size: 16px; font-weight: 800; color: #0f2a52; }
.sm-page .panel-id { margin: 2px 0 6px; font-size: 12px; font-weight: 600; color: #34506f; }
.sm-page .panel-contact { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: #34506f; }
.sm-page .panel-contact div { display: flex; align-items: flex-start; gap: 10px; word-break: break-word; }
.sm-page .panel-contact .ci { width: 18px; text-align: center; color: #5d7ea6; flex-shrink: 0; }
.sm-page .section-box { border-radius: 12px; overflow: hidden; border: 1px solid #e3ebf6; }
.sm-page .section-title {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px;
          background: #e6f0ff;
          font-size: 12px; font-weight: 700; color: #0f2a52;
        }
.sm-page .section-box.purple .section-title { background: #efe9ff; }
.sm-page .metrics { display: grid; grid-template-columns: repeat(3, 1fr); background: #f3f8ff; }
.sm-page .metric { padding: 10px 6px; text-align: center; border-left: 1px solid #d9e6f8; }
.sm-page .metric:first-child { border-left: 0; }
.sm-page .metric label { display: block; font-size: 10.5px; color: #4b6586; margin-bottom: 3px; }
.sm-page .metric strong { font-size: 15px; color: #0f2a52; }
.sm-page .marks-details { padding: 0 14px 12px; background: #f3f8ff; }
.sm-page .marks-details summary { cursor: pointer; padding: 4px 0 8px; font-size: 13px; font-weight: 600; color: #2166cc; list-style: none; }
.sm-page .marks-details summary::-webkit-details-marker { display: none; }
.sm-page .marks-table { width: 100%; min-width: 0; table-layout: fixed; border-collapse: collapse; margin-bottom: 10px; }
.sm-page .marks-table caption { text-align: left; font-size: 12px; font-weight: 700; color: #5d7ea6; padding: 6px 0; text-transform: uppercase; letter-spacing: .4px; }
.sm-page .marks-table th, .sm-page .marks-table td { padding: 5px 4px; border-bottom: 1px solid #dde8f7; font-size: 11.5px; text-align: left; color: #28466b; }
.sm-page .marks-table th { color: #6a7f9c; font-weight: 600; }
.sm-page .marks-table th { width: 55%; }
.sm-page .marks-table td { width: 45%; text-align: right; font-weight: 700; color: #0f2a52; border-top: 0; white-space: normal; }
.sm-page .app-list { background: #faf8ff; padding: 4px 14px; }
.sm-page .app-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 0; border-top: 1px solid #ece7fa; font-size: 12px; }
.sm-page .app-row:first-child { border-top: 0; }
.sm-page .app-row .app-name { min-width: 0; color: #0f2a52; font-weight: 600; }
.sm-page .app-row .app-name small { display: block; margin-top: 2px; color: #5d7ea6; font-weight: 500; font-size: 11px; }
.sm-page .app-empty { padding: 14px 0; color: #7a8ca6; font-size: 13px; }
.sm-page .lead-box { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 14px; background: #fafcff; }
.sm-page .lead-box label { display: block; font-size: 11px; color: #7a8ca6; margin-bottom: 3px; }
.sm-page .lead-box strong { font-size: 12px; color: #0f2a52; }
/* Personal details box */
.sm-page .section-box.teal .section-title { background: #e0f5f1; }
.sm-page .info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 14px; padding: 14px; background: #fafcff; }
.sm-page .info-grid > div { min-width: 0; }
.sm-page .info-grid label { display: block; font-size: 11px; color: #7a8ca6; margin-bottom: 3px; }
.sm-page .info-grid strong { display: block; font-size: 12px; color: #0f2a52; word-break: break-word; }
.sm-page .panel-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.sm-page .panel-btn {
          height: 38px; border: 0; border-radius: 9px;
          font-size: 13px; font-weight: 700; cursor: pointer; color: #fff;
        }
.sm-page .panel-btn.edit { background: linear-gradient(135deg,#2d7df0,#1d63d6); box-shadow: 0 8px 18px rgba(45,125,240,.25); }
.sm-page .panel-btn.block { background: linear-gradient(135deg,#f0525e,#dc3545); box-shadow: 0 8px 18px rgba(220,53,69,.22); }
.sm-page .panel-btn.activate { background: linear-gradient(135deg,#22b573,#139a5c); box-shadow: 0 8px 18px rgba(19,154,92,.22); }
.sm-page .panel-btn:hover { filter: brightness(1.06); }
.sm-page .panel-actions.three { grid-template-columns: 1fr 1fr 1fr; }
/* New / Accepted / Blocked sections */
.sm-page .sm-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
.sm-page .sm-tab {
          height: 38px; padding: 0 16px;
          border: 1px solid #dbe5f2; border-radius: 10px;
          background: #fff; color: #4b6586;
          font-size: 13px; font-weight: 600; cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
        }
.sm-page .sm-tab:hover { background: #eef4fd; }
.sm-page .sm-tab.active { background: #2d7df0; border-color: #2d7df0; color: #fff; }
.sm-page .sm-tab.active.sm-tab-accepted { background: #1fb36d; border-color: #1fb36d; }
.sm-page .sm-tab.active.sm-tab-blocked { background: #e5484d; border-color: #e5484d; }
.sm-page .sm-tab-count { padding: 1px 8px; border-radius: 20px; background: rgba(20,50,92,.08); font-size: 11px; font-weight: 700; }
.sm-page .sm-tab.active .sm-tab-count { background: rgba(255,255,255,.25); }
.sm-page .decide-btn {
          height: 34px; padding: 0 14px; border: 0; border-radius: 9px;
          color: #fff; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;
        }
.sm-page .decide-btn.accept { background: linear-gradient(135deg,#22b573,#139a5c); }
.sm-page .decide-btn.block { background: linear-gradient(135deg,#f0525e,#dc3545); }
.sm-page .decide-btn:hover { filter: brightness(1.06); }
.sm-page .modal-overlay {
          position: fixed; inset: 0; z-index: 400;
          display: flex; align-items: center; justify-content: center;
          padding: 16px; background: rgba(10,25,50,.5);
        }
.sm-page .modal-box {
          width: min(560px, 100%); max-height: 94vh; overflow-y: auto;
          padding: 22px; background: #fff; border-radius: 16px;
          box-shadow: 0 24px 60px rgba(10,25,50,.28);
        }
.sm-page .modal-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; }
.sm-page .modal-header h3 { margin: 0; font-size: 17px; color: #0f2a52; }
.sm-page .modal-header p { margin: 4px 0 0; font-size: 13px; color: #7a8ca6; }
.sm-page .modal-form { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.sm-page .modal-field.full { grid-column: 1 / -1; }
.sm-page .modal-field label { display: block; margin-bottom: 6px; font-size: 12px; font-weight: 600; color: #5d7ea6; }
.sm-page .modal-field input, .sm-page .modal-field select {
          width: 100%; height: 38px; padding: 0 12px;
          border: 1px solid #d9e3f1; border-radius: 10px; outline: none;
          font-size: 13px; color: #14325c; background: #fff;
        }
.sm-page .modal-field input:focus, .sm-page .modal-field select:focus { border-color: #2d7df0; box-shadow: 0 0 0 3px rgba(45,125,240,.12); }
.sm-page .form-error { margin-top: 12px; padding: 9px 12px; border-radius: 8px; background: #ffecee; color: #d23a49; font-size: 13px; }
.sm-page .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.sm-page .modal-cancel, .sm-page .modal-save { height: 38px; padding: 0 22px; border: 0; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
.sm-page .modal-cancel { background: #eef2f8; color: #4b6586; }
.sm-page .modal-save { background: linear-gradient(135deg,#2d7df0,#1d63d6); color: #fff; }
@media (max-width: 1100px) {
.sm-page .sm-stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }


}
@media (max-width: 900px) {
.sm-page .panel-body { grid-template-columns: minmax(0, 1fr); padding: 16px; }
.sm-page .panel-head { padding: 12px 16px; }


}
@media (max-width: 700px) {
.sm-page .hero { padding: 14px; min-height: 84px; gap: 12px; border-radius: 12px; }
.sm-page .hero-icon { width: 46px; height: 46px; font-size: 24px; border-radius: 13px; }
.sm-page .hero-text h1 { font-size: 19px; }
.sm-page .hero-text p { font-size: 12px; }
.sm-page .hero-art { font-size: 80px; }
.sm-page .sm-stats-grid { gap: 10px; }
.sm-page .sm-stat-card { padding: 12px; gap: 10px; flex-direction: column; align-items: flex-start; }
.sm-page .sm-stat-icon { width: 36px; height: 36px; font-size: 17px; }
.sm-page .stat-body { width: 100%; }
.sm-page .stat-number { font-size: 21px; }
.sm-page .filter-bar { gap: 8px; }
.sm-page .filter-search { flex-basis: 100%; }
.sm-page .filter-select { flex: 1 1 calc(50% - 8px); min-width: 0; }
.sm-page .reset-btn { flex: 0 0 40px; }
.sm-page .add-btn { flex: 1; }
.sm-page .student-card { padding: 12px; gap: 12px; }
.sm-page .sc-info { flex-basis: calc(100% - 70px); }
.sm-page .sc-right { width: 100%; margin-left: 0; justify-content: space-between; }
.sm-page .sc-apps { padding-left: 0; border-left: 0; }
.sm-page .view-btn { flex: 1 1 100%; }
.sm-page .avatar-md { width: 42px; height: 42px; font-size: 15px; }
.sm-page .profile-panel { border-radius: 12px; }
.sm-page .panel-body { padding: 12px; gap: 12px; }
.sm-page .panel-profile { flex-direction: column; align-items: center; text-align: center; padding: 14px; gap: 12px; }
.sm-page .panel-head { padding: 10px 12px; }
.sm-page .panel-name-row { justify-content: center; }
.sm-page .panel-contact div { justify-content: center; }
.sm-page .lead-box { grid-template-columns: 1fr 1fr; }
.sm-page .modal-form { grid-template-columns: 1fr; }
.sm-page .modal-box { padding: 16px; }


}
@media (max-width: 420px) {
.sm-page .filter-select { flex-basis: 100%; }
.sm-page .panel-actions, .sm-page .panel-actions.three { grid-template-columns: 1fr; }
.sm-page .metric strong { font-size: 15px; }


}


/* ---------- sea-wave floating stat cards ---------- */
@keyframes smWave {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-9px); }
  100% { transform: translateY(0); }
}
.sm-page .sm-stats-grid { padding-top: 10px; padding-bottom: 6px; }
.sm-page .sm-stat-card {
  animation: smWave 3.6s ease-in-out infinite;
  will-change: transform;
}
.sm-page .sm-stat-card:nth-child(1) { animation-delay: 0s; }
.sm-page .sm-stat-card:nth-child(2) { animation-delay: -0.9s; }
.sm-page .sm-stat-card:nth-child(3) { animation-delay: -1.8s; }
.sm-page .sm-stat-card:nth-child(4) { animation-delay: -2.7s; }
.sm-page .sm-stat-card:hover { box-shadow: 0 14px 28px rgba(20,50,92,.14); }

/* ---------- smoke on hover for the 4 stat cards ---------- */
.sm-page .sm-stat-card { position: relative; overflow: hidden; }
.sm-page .sm-stat-card .sm-stat-icon,
.sm-page .sm-stat-card .stat-body { position: relative; z-index: 1; }
.sm-page .sm-stat-card::before,
.sm-page .sm-stat-card::after {
  content: "";
  position: absolute;
  left: -15%;
  right: -15%;
  bottom: -45%;
  height: 130%;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  filter: blur(13px);
  will-change: transform, opacity;
}
.sm-page .sm-stat-card { --sm-rgb: 45,125,240; }
.sm-page .sm-stat-card.stat-blue   { --sm-rgb: 45,125,240; }
.sm-page .sm-stat-card.stat-green  { --sm-rgb: 31,179,109; }
.sm-page .sm-stat-card.stat-purple { --sm-rgb: 122,90,240; }
.sm-page .sm-stat-card.stat-red    { --sm-rgb: 229,72,77; }
.sm-page .sm-stat-card::before {
  background:
    radial-gradient(circle at 18% 78%, rgba(var(--sm-rgb),.55) 0 14%, transparent 42%),
    radial-gradient(circle at 52% 88%, rgba(var(--sm-rgb),.45) 0 16%, transparent 46%),
    radial-gradient(circle at 84% 74%, rgba(var(--sm-rgb),.50) 0 13%, transparent 40%);
}
.sm-page .sm-stat-card::after {
  background:
    radial-gradient(circle at 32% 85%, rgba(var(--sm-rgb),.50) 0 15%, transparent 44%),
    radial-gradient(circle at 68% 80%, rgba(var(--sm-rgb),.40) 0 14%, transparent 42%),
    radial-gradient(circle at 92% 90%, rgba(var(--sm-rgb),.45) 0 12%, transparent 38%);
}
.sm-page .sm-stat-card:hover::before { animation: smSmokeA 2.4s ease-out infinite; }
.sm-page .sm-stat-card:hover::after  { animation: smSmokeB 3.1s ease-out infinite; animation-delay: .7s; }
@keyframes smSmokeA {
  0%   { opacity: 0;   transform: translateY(35%) translateX(0) scale(.8); }
  25%  { opacity: .85; }
  100% { opacity: 0;   transform: translateY(-48%) translateX(7%) scale(1.35); }
}
@keyframes smSmokeB {
  0%   { opacity: 0;   transform: translateY(40%) translateX(0) scale(.85); }
  30%  { opacity: .75; }
  100% { opacity: 0;   transform: translateY(-55%) translateX(-8%) scale(1.45); }
}

/* ---------- smoke puffs on button click ---------- */
@keyframes smSmoke {
  0%   { opacity: .75; transform: translate(-50%, -50%) scale(.3); }
  100% { opacity: 0;   transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(var(--s)); }
}
.sm-smoke {
  position: fixed;
  z-index: 9999;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(var(--c, 200,210,226),.9) 0%, rgba(var(--c, 200,210,226),.55) 45%, rgba(var(--c, 200,210,226),0) 72%);
  filter: blur(3px);
  animation: smSmoke var(--t) ease-out forwards;
}
@media (prefers-reduced-motion: reduce) {
  .sm-page .sm-stat-card { animation: none; }
  .sm-smoke { display: none; }
}

      `}</style>

      <div className="sm-page" onClick={handleSmoke}>
        <div className="sm-content">
            {!selectedStudent && (
              <>
            {/* ---------- HERO ---------- */}
            <section className="hero">
              <div className="hero-icon">🎓</div>
              <div className="hero-text">
                <h1>Student Management</h1>
                <p>Manage student records and academic profiles</p>
              </div>
              <div className="hero-art">🏛️</div>
            </section>

            {/* ---------- STATS ---------- */}
            <section className="sm-stats-grid">
              <div className="sm-stat-card stat-blue">
                <div className="sm-stat-icon">👥</div>
                <div className="stat-body">
                  <div className="stat-title">Total Students</div>
                  <div className="stat-row">
                    <span className="stat-number">{students.length}</span>
                    <span className="stat-trend">↑ +12%</span>
                  </div>
                </div>
              </div>

              <div className="sm-stat-card stat-green">
                <div className="sm-stat-icon">✔</div>
                <div className="stat-body">
                  <div className="stat-title">Active Students</div>
                  <div className="stat-row">
                    <span className="stat-number">{activeCount}</span>
                    <span className="stat-trend">↑ +8%</span>
                  </div>
                </div>
              </div>

              <div className="sm-stat-card stat-purple">
                <div className="sm-stat-icon">📄</div>
                <div className="stat-body">
                  <div className="stat-title">Applications</div>
                  <div className="stat-row">
                    <span className="stat-number">{totalApplications}</span>
                    <span className="stat-trend">↑ +15%</span>
                  </div>
                </div>
              </div>

              <div className="sm-stat-card stat-red">
                <div className="sm-stat-icon">🚫</div>
                <div className="stat-body">
                  <div className="stat-title">Blocked Students</div>
                  <div className="stat-row">
                    <span className="stat-number">{blockedCount}</span>
                    <span className="stat-trend">↓ -2%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ---------- FILTERS ---------- */}
            <section className="filter-bar">
              <label className="filter-search">
                <span>🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => updateFilter(setSearch)(e.target.value)}
                  placeholder="Search students by name, email..."
                />
              </label>

              <select
                className="filter-select"
                value={collegeFilter}
                onChange={(e) => updateFilter(setCollegeFilter)(e.target.value)}
              >
                {colleges.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                className="filter-select"
                value={courseFilter}
                onChange={(e) => updateFilter(setCourseFilter)(e.target.value)}
              >
                {courses.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => updateFilter(setStatusFilter)(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Blocked</option>
              </select>

              <button className="reset-btn" title="Reset filters" onClick={resetFilters}>
                ⟳
              </button>

              <button className="add-btn" onClick={openAdd}>
                👤＋ Add Student
              </button>
            </section>

            {/* ---------- SECTIONS: New / Accepted / Blocked ---------- */}
            <section className="sm-tabs">
              {[
                ["new", "🆕 New Requests", newCount],
                ["accepted", "✔ Accepted", activeCount],
                ["blocked", "🚫 Blocked", blockedCount],
              ].map(([key, label, count]) => (
                <button
                  key={key}
                  className={`sm-tab ${tab === key ? "active" : ""} sm-tab-${key}`}
                  onClick={() => {
                    setTab(key);
                    setCurrentPage(1);
                  }}
                >
                  {label} <span className="sm-tab-count">{count}</span>
                </button>
              ))}
            </section>
              </>
            )}

            {/* ---------- LIST + FULL PROFILE PAGE ---------- */}
            <section className="content-grid">
              {!selectedStudent && (
              <div>
                <p className="list-count">{filteredStudents.length} students found</p>

                {currentStudents.length > 0 ? (
                  <div className="student-list">
                    {currentStudents.map((student) => (
                      <div
                        key={student.id}
                        className={`student-card ${selectedId === student.id ? "selected" : ""}`}
                        onClick={() => setSelectedId(student.id)}
                      >
                        <Avatar student={student} />

                        <div className="sc-info">
                          <div className="sc-name">
                            {student.name}
                            <span className="verified">✓</span>
                          </div>
                          <div className="sc-meta">
                            {student.id} • {student.college}
                          </div>
                          <div className="sc-meta2">
                            {student.course} • {student.city}
                          </div>
                        </div>

                        <div className="sc-right">
                          <span className={`pill ${statusClass(student.status)}`}>
                            ● {student.status}
                          </span>

                          <div className="sc-apps">
                            📄 {student.applications}{" "}
                            {student.applications === 1 ? "Application" : "Applications"}
                          </div>

                          {student.status === "Pending" && (
                            <>
                              <button
                                className="decide-btn accept"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  decideRequest(student, "accept");
                                }}
                              >
                                ✔ Accept
                              </button>
                              <button
                                className="decide-btn block"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  decideRequest(student, "block");
                                }}
                              >
                                ⊘ Block
                              </button>
                            </>
                          )}

                          <button
                            className="view-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedId(student.id);
                            }}
                          >
                            View Profile →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3>No students found</h3>
                    <p>Try changing your search or filters.</p>
                  </div>
                )}

                {filteredStudents.length > 0 && (
                  <div className="pagination">
                    <button
                      className="page-btn"
                      disabled={safePage === 1}
                      onClick={() => setCurrentPage(safePage - 1)}
                    >
                      ‹
                    </button>

                    {getPageList(safePage, totalPages).map((page) =>
                      typeof page === "string" ? (
                        <span key={page} className="page-dots">
                          …
                        </span>
                      ) : (
                        <button
                          key={page}
                          className={`page-btn ${safePage === page ? "active" : ""}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      className="page-btn"
                      disabled={safePage === totalPages}
                      onClick={() => setCurrentPage(safePage + 1)}
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
              )}

              {/* ---------- FULL PROFILE PAGE ---------- */}
              {selectedStudent && (
                <>
                  <aside className="profile-panel">
                    <div className="panel-head">
                      <button
                        className="back-button"
                        onClick={() => setSelectedId(null)}
                      >
                        ← Back to Students
                      </button>
                      <div className="panel-head-id">
                        Student ID: <strong>{selectedStudent.id}</strong>
                      </div>
                    </div>

                    <div className="panel-body">
                      <div className="panel-profile">
                        <Avatar student={selectedStudent} size="lg" />

                        <div className="panel-profile-info">
                          <div className="panel-name-row">
                            <h3 className="panel-name">
                              {selectedStudent.name}
                              <span className="verified">✓</span>
                            </h3>
                            <span className={`pill ${statusClass(selectedStudent.status)}`}>
                              ● {selectedStudent.status}
                            </span>
                          </div>
                          <div className="panel-id">{selectedStudent.id}</div>

                          <div className="panel-contact">
                            <div>
                              <span className="ci">✉</span>
                              {selectedStudent.email}
                            </div>
                            <div>
                              <span className="ci">☎</span>
                              {selectedStudent.phone}
                            </div>
                            <div>
                              <span className="ci">📍</span>
                              {selectedStudent.address}, {selectedStudent.city}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Academic */}
                      <div className="section-box">
                        <div className="section-title">🎓 Academic Details</div>
                        <div className="metrics">
                          <div className="metric">
                            <label>10th Percentage</label>
                            <strong>{Math.round(selectedStudent.tenthMarks?.Percentage)}%</strong>
                          </div>
                          <div className="metric">
                            <label>12th Percentage</label>
                            <strong>{Math.round(selectedStudent.twelfthMarks?.Percentage)}%</strong>
                          </div>
                          <div className="metric">
                            <label>Cutoff Score</label>
                            <strong>{selectedStudent.cutoff}</strong>
                          </div>
                        </div>

                        <details className="marks-details">
                          <summary>View full marks ▾</summary>

                          <table className="marks-table">
                            <caption>10th Standard</caption>
                            <tbody>
                              {[
                                ["Tamil", "Tamil"],
                                ["English", "English"],
                                ["Mathematics", "Mathematics"],
                                ["Science", "Science"],
                                ["Social Science", "SocialScience"],
                              ].map(([label, key]) => (
                                <tr key={key}>
                                  <th>{label}</th>
                                  <td>{selectedStudent.tenthMarks?.[key]}</td>
                                </tr>
                              ))}
                              <tr>
                                <th>Total</th>
                                <td>
                                  {selectedStudent.tenthMarks?.Total} /{" "}
                                  {selectedStudent.tenthMarks?.Percentage}%
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table className="marks-table">
                            <caption>12th Standard</caption>
                            <tbody>
                              {(selectedStudent.twelfthMarks?.Subjects || []).map((subject) => (
                                <tr key={subject}>
                                  <th>
                                    {subject === "ComputerScience" ? "Computer Science" : subject}
                                  </th>
                                  <td>{selectedStudent.twelfthMarks?.[subject]}</td>
                                </tr>
                              ))}
                              <tr>
                                <th>Total</th>
                                <td>
                                  {selectedStudent.twelfthMarks?.Total} /{" "}
                                  {selectedStudent.twelfthMarks?.Percentage}%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </details>
                      </div>

                      {/* Applications */}
                      <div className="section-box purple">
                        <div className="section-title">
                          📋 Applications ({selectedStudent.applicationList.length})
                        </div>
                        <div className="app-list">
                          {selectedStudent.applicationList.length === 0 ? (
                            <div className="app-empty">No applications yet.</div>
                          ) : (
                            selectedStudent.applicationList.map((app, i) => (
                              <div className="app-row" key={i}>
                                <div className="app-name">
                                  {app.college}
                                  <small>{app.course}</small>
                                </div>
                                <span className={`pill ${statusClass(app.status)}`}>
                                  {app.status}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Lead */}
                      <div className="section-box">
                        <div className="section-title">💼 Lead Information</div>
                        <div className="lead-box">
                          <div>
                            <label>Lead Status</label>
                            <strong>{selectedStudent.leadStatus}</strong>
                          </div>
                          <div>
                            <label>Purchased By</label>
                            <strong>{selectedStudent.purchasedBy}</strong>
                          </div>
                          <div>
                            <label>Lead Price</label>
                            <strong>{selectedStudent.leadPrice}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Personal Details (fills the empty space beside Lead Information) */}
                      <div className="section-box teal">
                        <div className="section-title">🪪 Personal Details</div>
                        <div className="info-grid">
                          <div>
                            <label>Date of Birth</label>
                            <strong>{selectedStudent.dob || "—"}</strong>
                          </div>
                          <div>
                            <label>Gender</label>
                            <strong>{selectedStudent.gender || "—"}</strong>
                          </div>
                          <div>
                            <label>Registered On</label>
                            <strong>{selectedStudent.registered || "—"}</strong>
                          </div>
                          <div>
                            <label>City</label>
                            <strong>{selectedStudent.city || "—"}</strong>
                          </div>
                          <div>
                            <label>Preferred College</label>
                            <strong>{selectedStudent.college || "—"}</strong>
                          </div>
                          <div>
                            <label>Preferred Course</label>
                            <strong>{selectedStudent.course || "—"}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div
                        className={`panel-actions ${
                          selectedStudent.status === "Pending" ? "three" : ""
                        }`}
                      >
                        <button className="panel-btn edit" onClick={() => openEdit(selectedStudent)}>
                          ✏ Edit Details
                        </button>
                        {selectedStudent.status === "Pending" ? (
                          <>
                            <button
                              className="panel-btn activate"
                              onClick={() => decideRequest(selectedStudent, "accept")}
                            >
                              ✔ Accept Student
                            </button>
                            <button
                              className="panel-btn block"
                              onClick={() => decideRequest(selectedStudent, "block")}
                            >
                              ⊘ Block Student
                            </button>
                          </>
                        ) : (
                          <button
                            className={`panel-btn ${
                              selectedStudent.status === "Blocked" ? "activate" : "block"
                            }`}
                            onClick={() => toggleBlock(selectedStudent)}
                          >
                            {selectedStudent.status === "Blocked" ? "✔ Activate Student" : "⊘ Block Student"}
                          </button>
                        )}
                      </div>
                    </div>
                  </aside>
                </>
              )}
            </section>
        </div>

      {/* ---------- ADD / EDIT MODAL ---------- */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>{modal.mode === "add" ? "Add Student" : "Edit Student"}</h3>
                <p>
                  {modal.mode === "add"
                    ? "Create a new student account"
                    : "Update student account information"}
                </p>
              </div>
              <button className="panel-close" onClick={closeModal} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="modal-form">
              {[
                ["name", "Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["city", "City"],
                ["college", "College"],
                ["course", "Course"],
              ].map(([key, label]) => (
                <div className="modal-field" key={key}>
                  <label>{label}</label>
                  <input
                    value={modal.form[key] || ""}
                    onChange={(e) =>
                      setModal({ ...modal, form: { ...modal.form, [key]: e.target.value } })
                    }
                  />
                </div>
              ))}

              <div className="modal-field full">
                <label>Address</label>
                <input
                  value={modal.form.address || ""}
                  onChange={(e) =>
                    setModal({ ...modal, form: { ...modal.form, address: e.target.value } })
                  }
                />
              </div>

              <div className="modal-field full">
                <label>Status</label>
                <select
                  value={modal.form.status}
                  onChange={(e) =>
                    setModal({ ...modal, form: { ...modal.form, status: e.target.value } })
                  }
                >
                  {modal.form.status === "Pending" && <option>Pending</option>}
                  <option>Active</option>
                  <option>Blocked</option>
                </select>
              </div>
            </div>

            {formError && <div className="form-error">{formError}</div>}

            <div className="modal-actions">
              <button className="modal-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button className="modal-save" onClick={saveModal}>
                {modal.mode === "add" ? "Add Student" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

/* =========================================================
   STUDENT PAGE - INDEPENDENT LAYOUT
   Dimensions match the Admin sidebar and topbar, but this
   markup and styling belong only to the Student page.
========================================================= */

const studentLayoutStyles = String.raw`
.student-layout,
.student-layout * { box-sizing: border-box; }

.student-layout {
  position: fixed;
  inset: 0;
  z-index: 999;
  width: 100vw;
  max-width: none;
  min-height: 100vh;
  height: 100vh;
  height: 100dvh;
  display: flex;
  overflow: hidden;
  margin: 0;
  background: #f4f7fb;
  color: #16243d;
  font-family: Inter, "Segoe UI", Roboto, Arial, sans-serif;
}

.student-layout-sidebar {
  width: 236px;
  min-width: 236px;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #112746;
  color: #fff;
}

.student-layout-brand {
  height: 82px;
  min-height: 82px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}

.student-layout-brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.1);
  font-size: 21px;
}

.student-layout-brand h1 {
  margin: 0;
  color: #fff;
  font-size: 16px;
  line-height: 1.2;
}

.student-layout-brand h1 span { color: #58a1ff; }

.student-layout-brand p {
  margin: 3px 0 0;
  color: #91a5c2;
  font-size: 9px;
}

.student-layout-menu {
  flex: 1;
  padding: 24px 12px;
  overflow-y: auto;
  scrollbar-width: none;
}

.student-layout-menu::-webkit-scrollbar { display: none; }

.student-layout-menu-title {
  margin: 0 0 10px;
  text-align: center;
  color: #6f86a7;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
}

.student-layout-nav-item {
  width: 100%;
  height: 43px;
  margin-bottom: 4px;
  padding: 0 13px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #afbdd1;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  font-size: 12px;
  transition: .2s ease;
}

.student-layout-nav-item:hover {
  color: #fff;
  background: rgba(255,255,255,.07);
}

.student-layout-nav-item.active {
  color: #fff;
  background: #2177e8;
  box-shadow: 0 6px 18px rgba(33,119,232,.2);
}

.student-layout-nav-icon {
  width: 20px;
  text-align: center;
  font-size: 16px;
}

.student-layout-sidebar-bottom {
  padding: 15px;
  border-top: 1px solid rgba(255,255,255,.07);
}

.student-layout-user-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255,255,255,.055);
}

.student-layout-user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #28558e;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.student-layout-user-card strong {
  display: block;
  color: #fff;
  font-size: 12px;
}

.student-layout-user-card span {
  display: block;
  margin-top: 2px;
  color: #8196b5;
  font-size: 9px;
}

.student-layout-main {
  min-width: 0;
  width: calc(100vw - 236px);
  flex: 1 1 auto;
  height: 100vh;
  height: 100dvh;
  overflow-y: auto;
}

.student-layout-topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 65px;
  min-height: 65px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  background: #fff;
  border-bottom: 1px solid #e7ecf2;
}

.student-layout-search-wrap {
  position: relative;
  width: 520px;
  max-width: 520px;
  min-width: 0;
}

.student-layout-search {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-radius: 9px;
  background: #f4f7fb;
  color: #7b8da7;
}

.student-layout-search-icon { font-size: 20px; }

.student-layout-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: #253954;
  font-size: 12px;
}

.student-layout-search input::placeholder { color: #99a7ba; }

.student-layout-search-clear {
  border: 0;
  background: transparent;
  color: #71839c;
  font-size: 18px;
  cursor: pointer;
}

.student-layout-topbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}

.student-layout-notification {
  position: relative;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #61738e;
  font-size: 20px;
  cursor: pointer;
}

.student-layout-notification-dot {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f25f68;
}

.student-layout-profile {
  display: flex;
  align-items: center;
  gap: 9px;
}

.student-layout-profile-avatar {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #183f70;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.student-layout-profile-details strong {
  display: block;
  color: #233854;
  font-size: 12px;
}

.student-layout-profile-details span {
  display: block;
  margin-top: 2px;
  color: #8c9aae;
  font-size: 9px;
}

/* ===== LOGOUT (same behaviour as Admin page) ===== */
.student-layout-logout {
  width: 100%;
  height: 36px;
  margin-top: 9px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #93a6c0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
}

.student-layout-logout:hover {
  color: #fff;
  background: rgba(255,255,255,.07);
}

.student-layout-topbar-logout {
  border: 0;
  background: transparent;
  color: #71839c;
  cursor: pointer;
  font-size: 16px;
}

.student-layout-mobile-toggle { display: none; }

.student-layout-content {
  min-width: 0;
  padding: 27px 30px 40px;
}

@media (max-width: 900px) {
  .student-layout-main {
    width: 100vw;
  }
  .student-layout-sidebar {
    position: fixed;
    z-index: 220;
    top: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform .25s ease;
  }
  .student-layout-sidebar.is-open { transform: translateX(0); }
  .student-layout-overlay {
    position: fixed;
    inset: 0;
    z-index: 210;
    border: 0;
    background: rgba(10,25,50,.42);
  }
  .student-layout-mobile-toggle {
    display: inline-flex;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #61738e;
    font-size: 19px;
    cursor: pointer;
  }
  .student-layout-search-wrap { flex: 1; width: auto; }
  .student-layout-topbar { padding: 0 14px; }
}

@media (max-width: 560px) {
  .student-layout-topbar { gap: 8px; }
  .student-layout-topbar-right { gap: 8px; }
  .student-layout-profile-details { display: none; }
  .student-layout-topbar-logout { display: none; }
  .student-layout-search { padding: 0 10px; }
}
`;

function StudentManagement({ embedded = false }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topSearch, setTopSearch] = useState("");

  // Same logout as Admin page: clear session and go back to the admin login.
  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin/dashboard", { replace: true });
  };

  // Preserve the original content-only rendering when used inside AdminDashboard.
  if (embedded) return <StudentManagementContent />;

  const menuItems = [
    { name: "Dashboard", icon: "⌂", path: "/admin/dashboard" },
    { name: "Students", icon: "♙", path: "/admin/students" },
    { name: "Colleges", icon: "▥", path: "/admin/colleges" },
    { name: "Courses", icon: "▱", path: "/admin/courses" },
    { name: "Applications", icon: "✉", path: "/admin/applications" },
    { name: "Transactions", icon: "₹", path: "/admin/transactions" },
    { name: "Reports", icon: "◑", path: "/admin/reports" },
    { name: "Users", icon: "♧", path: "/admin/users" },
    { name: "Settings", icon: "⚙", path: "/admin/settings" },
  ];

  return (
    <>
      <style>{studentLayoutStyles}</style>
      <div className="student-layout">
        {sidebarOpen && (
          <button
            type="button"
            className="student-layout-overlay"
            aria-label="Close navigation menu"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`student-layout-sidebar ${sidebarOpen ? "is-open" : ""}`}>
          <div className="student-layout-brand">
            <div className="student-layout-brand-icon">🎓</div>
            <div>
              <h1>Student<span>College</span></h1>
              <p>Admission Platform</p>
            </div>
          </div>

          <nav className="student-layout-menu">
            <p className="student-layout-menu-title">MAIN MENU</p>
            {menuItems.map((item) => (
              <button
                type="button"
                key={item.name}
                className={`student-layout-nav-item ${item.name === "Students" ? "active" : ""}`}
                onClick={() => {
                  setSidebarOpen(false);
                  navigate(item.path);
                }}
              >
                <span className="student-layout-nav-icon">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="student-layout-sidebar-bottom">
            <div className="student-layout-user-card">
              <div className="student-layout-user-avatar">A</div>
              <div>
                <strong>Admin</strong>
                <span>Super Admin</span>
              </div>
            </div>
            <button
              type="button"
              className="student-layout-logout"
              onClick={handleLogout}
            >
              <span>↪</span>
              Logout
            </button>
          </div>
        </aside>

        <div className="student-layout-main">
          <header className="student-layout-topbar">
            <button
              type="button"
              className="student-layout-mobile-toggle"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>

            <div className="student-layout-search-wrap">
              <div className="student-layout-search">
                <span className="student-layout-search-icon">⌕</span>
                <input
                  type="text"
                  value={topSearch}
                  onChange={(event) => setTopSearch(event.target.value)}
                  placeholder="Search students, colleges, leads..."
                  aria-label="Search students"
                />
                {topSearch && (
                  <button
                    type="button"
                    className="student-layout-search-clear"
                    onClick={() => setTopSearch("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="student-layout-topbar-right">
              <button
                type="button"
                className="student-layout-notification"
                aria-label="Notifications"
              >
                ♢<span className="student-layout-notification-dot" />
              </button>
              <div className="student-layout-profile">
                <div className="student-layout-profile-avatar">A</div>
                <div className="student-layout-profile-details">
                  <strong>Admin</strong>
                  <span>Super Admin</span>
                </div>
                <button
                  type="button"
                  className="student-layout-topbar-logout"
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                >
                  ⌄
                </button>
              </div>
            </div>
          </header>

          <main className="student-layout-content">
            <StudentManagementContent topSearch={topSearch} />
          </main>
        </div>
      </div>
    </>
  );
}

export default StudentManagement;