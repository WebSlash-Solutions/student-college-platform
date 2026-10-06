import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const handleAdminLogout = () => {
  sessionStorage.clear();
  localStorage.removeItem("isAdminLoggedIn");
  window.location.replace("/admin/login");
};

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    ["Dashboard", "⌂", "/admin/dashboard"],
    ["Students", "♙", "/admin/students"],
    ["Colleges", "▥", "/admin/colleges"],
    ["Courses", "▤", "/admin/courses"],
    ["Leads", "★", "/admin/leads"],
    ["Applications", "▣", "/admin/applications"],
    ["Transactions", "₹", "/admin/transactions"],
    ["Reports", "▥", "/admin/reports"],
    ["Notifications", "♢", "/admin/notifications"],
    ["Users", "♙", "/admin/users"],
    ["Settings", "⚙", "/admin/settings"],
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">🎓</div>
        <div>
          <h1>
            Student<span>College</span>
          </h1>
          <p>Admission Platform</p>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-title">MAIN MENU</p>
        {menuItems.map(([name, icon, path]) => (
          <button
            key={name}
            className={`sidebar-item ${location.pathname === path ? "active" : ""}`}
            onClick={() => {
              if (name === "Dashboard") {
                navigate("/admin/dashboard");
                return;
              }
              navigate(path);
            }}
          >
            <span className="sidebar-icon">{icon}</span>
            <span>{name}</span>
            {name === "Leads" && <span className="lead-star">★</span>}
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-admin-card">
          <div className="sidebar-avatar">A</div>
          <div>
            <strong>Admin</strong>
            <span>Super Admin</span>
          </div>
        </div>
        <button
          className="logout-button"
          onClick={handleAdminLogout}
        >
          ↪ <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

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
      {
        college: "ABC Engineering College",
        course: "B.Tech CSE",
        status: "Accepted",
      },
      {
        college: "PSG College",
        course: "B.Tech CSE",
        status: "Pending",
      },
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
      {
        college: "PSG College",
        course: "B.Tech Mechanical",
        status: "Pending",
      },
      {
        college: "City College",
        course: "B.Tech Mechanical",
        status: "Rejected",
      },
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
      {
        college: "City College",
        course: "BCA",
        status: "Accepted",
      },
      {
        college: "ABC Engineering College",
        course: "BCA",
        status: "Accepted",
      },
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
      {
        college: "St. Joseph's College",
        course: "B.Com",
        status: "Pending",
      },
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
      {
        college: "Medical College",
        course: "B.Sc Nursing",
        status: "Rejected",
      },
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
      {
        college: "Kongu College",
        course: "B.Tech IT",
        status: "Accepted",
      },
    ],
  },
];

const extraStudents = Array.from({ length: 44 }, (_, index) => {
  const number = 10922 - index;
  const names = [
    "Karthik S",
    "Priya V",
    "Mohamed A",
    "Divya K",
    "Harish R",
    "Nithya P",
    "Santhosh M",
    "Swetha R",
    "Dinesh K",
    "Pavithra S",
    "Lokesh B",
  ];
  const colleges = [
    "ABC Engineering College",
    "PSG College",
    "City College",
    "Kongu College",
    "St. Joseph's College",
    "Medical College",
    "XYZ Institute of Technology",
  ];
  const coursesList = [
    "B.Tech CSE",
    "B.Tech Mechanical",
    "BCA",
    "B.Com",
    "B.Sc Nursing",
    "B.Tech IT",
    "BBA",
  ];
  const name = names[index % names.length];
  const femaleNames = [
    "Priya V",
    "Divya K",
    "Nithya P",
    "Swetha R",
    "Pavithra S",
  ];
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
    dob: `${String((index % 27) + 1).padStart(2, "0")} ${["January", "February", "March", "April", "May", "June", "July"][index % 7]} 2005`,
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
        status:
          index % 3 === 0
            ? "Accepted"
            : index % 3 === 1
              ? "Pending"
              : "Rejected",
      },
    ],
  };
});

studentsData.push(...extraStudents);

// Academic marks used in the student details page.
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

  const cutoff = ["B.Tech CSE", "B.Tech IT", "B.Tech Mechanical"].includes(
    student.course,
  )
    ? ((twelfth.Mathematics + twelfth.Physics + twelfth.Chemistry) / 2).toFixed(
        2,
      )
    : ((twelfth.Mathematics + twelfth.English) / 2).toFixed(2);

  student.tenthMarks = tenth;
  student.twelfthMarks = twelfth;
  student.cutoff = cutoff;
};

studentsData.forEach(addAcademicDetails);

function StudentManagement() {
  const [students, setStudents] = useState(studentsData);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [openMoreId, setOpenMoreId] = useState(null);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const studentsPerPage = 5;

  const courses = [
    "All Courses",
    ...new Set(students.map((student) => student.course)),
  ];

  const filteredStudents = students.filter((student) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      !searchValue ||
      student.name?.toLowerCase().includes(searchValue) ||
      student.id?.toLowerCase().includes(searchValue) ||
      student.email?.toLowerCase().includes(searchValue) ||
      student.phone?.toLowerCase().includes(searchValue) ||
      student.college?.toLowerCase().includes(searchValue) ||
      student.course?.toLowerCase().includes(searchValue) ||
      student.status?.toLowerCase().includes(searchValue) ||
      student.city?.toLowerCase().includes(searchValue) ||
      student.leadStatus?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All Status" || student.status === statusFilter;

    const matchesCourse =
      courseFilter === "All Courses" || student.course === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const startIndex = (currentPage - 1) * studentsPerPage;

  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage,
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatus = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleCourse = (value) => {
    setCourseFilter(value);
    setCurrentPage(1);
  };

  const openStudent = (student) => {
    setOpenMoreId(null);
    setSelectedStudent(student);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goBack = () => {
    setSelectedStudent(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "status-active";

      case "Blocked":
        return "status-blocked";

      case "Accepted":
        return "status-accepted";

      case "Pending":
        return "status-pending";

      case "Rejected":
        return "status-rejected";

      default:
        return "";
    }
  };

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f4f7fb;
          color: #17345d;
        }

        button,
        input,
        select {
          font-family: inherit;
        }

        .student-page {
          min-height: 100vh;
          background: #f4f7fb;
        }

        .app-shell {
          min-height: 100vh;
          display: flex;
          width: 100%;
        }

        .admin-sidebar {
          width: 236px;
          min-width: 236px;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          background: #112746;
          color: #fff;
          z-index: 50;
        }

        .sidebar-brand {
          height: 82px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(255,255,255,.07);
          flex-shrink: 0;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: rgba(255,255,255,.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .sidebar-brand h1 { margin: 0; font-size: 16px; line-height: 1.2; color: #fff; }
        .sidebar-brand h1 span { color: #58a1ff; }
        .sidebar-brand p { margin: 3px 0 0; color: #91a5c2; font-size: 9px; }
        .sidebar-menu { flex: 1; padding: 24px 12px; overflow-y: auto; }
        .menu-title { margin: 0 12px 10px; color: #6f86a7; font-size: 9px; font-weight: 700; letter-spacing: 1px; }
        .sidebar-item { width: 100%; height: 43px; margin-bottom: 4px; padding: 0 13px; border: 0; border-radius: 8px; background: transparent; color: #afbdd1; display: flex; align-items: center; gap: 12px; text-align: left; cursor: pointer; font-size: 12px; }
        .sidebar-item:hover { color: #fff; background: rgba(255,255,255,.07); }
        .sidebar-item.active { color: #fff; background: #2177e8; box-shadow: 0 6px 18px rgba(33,119,232,.2); }
        .sidebar-icon { width: 20px; text-align: center; font-size: 16px; }
        .lead-star { margin-left: auto; color: #f4c44f; font-size: 10px; }
        .sidebar-bottom { padding: 14px; border-top: 1px solid rgba(255,255,255,.07); flex-shrink: 0; }
        .sidebar-admin-card { display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 10px; background: rgba(255,255,255,.055); }
        .sidebar-avatar { width: 34px; height: 34px; border-radius: 50%; background: #28558e; color: #fff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; }
        .sidebar-admin-card strong { display:block; color:#fff; font-size:12px; }
        .sidebar-admin-card span { display:block; margin-top:2px; color:#8196b5; font-size:9px; }
        .logout-button { width:100%; margin-top:8px; height:34px; border:0; border-radius:8px; background:transparent; color:#93a6c0; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; font-size:11px; }
        .logout-button:hover { color:#fff; background:rgba(255,255,255,.07); }

        .student-main-area {
          flex: 1;
          min-width: 0;
          min-height: 100vh;
          background: #f4f7fb;
        }


        /* ==============================
           TOP NAVBAR
        ============================== */

        .top-navbar {
          height: 64px;
          background: #ffffff;
          border-bottom: 1px solid #e7edf5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .search-box {
          width: 300px;
          height: 38px;
          background: #f4f7fb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          padding: 0 13px;
          color: #91a0b5;
        }

        .search-box span {
          font-size: 14px;
          margin-right: 10px;
        }

        .search-box input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #17345d;
          font-size: 12px;
        }

        .search-box input::placeholder {
          color: #91a0b5;
        }

        .admin-area {
          display: flex;
          align-items: center;
          gap: 13px;
          position: relative;
        }

        .admin-profile-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 0;
          background: transparent;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          font-family: inherit;
        }

        .admin-profile-toggle:hover {
          background: #f4f7fb;
        }

        .admin-dropdown {
          position: absolute;
          top: 48px;
          right: 0;
          width: 150px;
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(23, 52, 93, 0.15);
          padding: 6px;
          z-index: 100;
        }

        .admin-dropdown button {
          width: 100%;
          padding: 10px 12px;
          border: 0;
          border-radius: 6px;
          background: transparent;
          color: #d94848;
          text-align: left;
          font-size: 12px;
          cursor: pointer;
        }

        .admin-dropdown button:hover {
          background: #fff1f1;
        }

        .notification {
          width: 34px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          color: #526984;
        }

        .notification-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef5350;
          top: 7px;
          right: 7px;
        }

        .admin-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #173f70;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .admin-info {
          line-height: 1.2;
        }

        .admin-name {
          font-size: 12px;
          font-weight: 700;
          color: #18375d;
        }

        .admin-role {
          font-size: 9px;
          color: #93a1b4;
          margin-top: 3px;
        }

        .admin-arrow {
          font-size: 10px;
          color: #75869d;
        }

        /* ==============================
           PAGE
        ============================== */

        .student-content {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 30px 28px 50px;
        }

        .page-heading {
          margin-bottom: 22px;
        }

        .page-heading h1 {
          margin: 0;
          color: #17375f;
          font-size: 26px;
          font-weight: 700;
        }

        .page-heading p {
          margin: 8px 0 0;
          color: #8091a8;
          font-size: 13px;
        }

        /* ==============================
           FILTER BAR
        ============================== */

        .filter-card {
          background: #ffffff;
          border: 1px solid #e4ebf3;
          border-radius: 9px;
          padding: 13px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

     
.filter-search {
  flex: 1;
  min-width: 0;
  height: 42px;
  border: 1px solid #dce5f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filter-search:focus-within {
  border-color: #287ddd;
  box-shadow: 0 0 0 3px rgba(40, 125, 221, 0.10);
}

.filter-search-icon {
  color: #8a9bb1;
  margin-right: 12px;
  font-size: 15px;
  flex-shrink: 0;
}

.filter-search input {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent !important;
  box-shadow: none;
  font-size: 14px;
  color: #17375f;
  -webkit-text-fill-color: #17375f;
}

.filter-search input::placeholder {
  color: #9aa9bb;
  opacity: 1;
}


        .filter-select {
          height: 38px;
          min-width: 125px;
          padding: 0 10px;
          border: 1px solid #e3eaf2;
          border-radius: 7px;
          background: #fff;
          color: #60748d;
          font-size: 13px;
          outline: none;
          cursor: pointer;
        }

        .refresh-btn {
          height: 38px;
          width: 40px;
          border: 1px solid #e3eaf2;
          border-radius: 7px;
          background: #ffffff;
          color: #6f839c;
          cursor: pointer;
          font-size: 14px;
        }

        .refresh-btn:hover {
          background: #f4f8fc;
        }

        /* ==============================
           STAT CARDS
        ============================== */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 18px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 9px;
          padding: 17px 18px;
          min-height: 105px;
        }

        .stat-title {
          color: #8192a8;
          font-size: 10px;
          margin-bottom: 9px;
        }

        .stat-number {
          font-size: 26px;
          color: #17375f;
          font-weight: 700;
        }

        .stat-sub {
          margin-top: 6px;
          font-size: 9px;
          color: #8a9aae;
        }

        .stat-sub span {
          color: #20ad79;
          font-weight: 600;
        }

        /* ==============================
           TABLE
        ============================== */

        .table-card {
          background: #ffffff;
          border: 1px solid #e2e9f2;
          border-radius: 9px;
          overflow: hidden;
        }

        .table-header {
          padding: 18px 18px 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title h2 {
          margin: 0;
          color: #17375f;
          font-size: 14px;
        }

        .table-title p {
          margin: 5px 0 0;
          color: #91a0b3;
          font-size: 9px;
        }

        .student-count {
          font-size: 10px;
          color: #7d8fa7;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .student-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 850px;
        }

        .student-table thead {
          background: #f6f8fb;
        }

        .student-table th {
          padding: 12px 14px;
          text-align: left;
          color: #71859e;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .student-table td {
          padding: 14px;
          border-top: 1px solid #edf1f5;
          font-size: 12px;
          color: #526b87;
          vertical-align: middle;
        }

        .student-table tbody tr:hover {
          background: #fafcff;
        }

        .number-cell {
          width: 35px;
          color: #8797aa !important;
        }

        .student-name {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 145px;
        }

        .student-avatar {
          width: 31px;
          height: 31px;
          border-radius: 50%;
          background: #edf4ff;
          color: #2879db;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .student-name strong {
          display: block;
          color: #29496e;
          font-size: 12px;
        }

        .student-id {
          display: block;
          margin-top: 3px;
          color: #9aa8b9;
          font-size: 10px;
        }

        .application-number {
          text-align: center;
          font-weight: 700;
          color: #345675 !important;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border-radius: 14px;
          font-size: 8px;
          font-weight: 700;
          white-space: nowrap;
        }

        .status-active {
          background: #e5f8f0;
          color: #13a66e;
        }

        .status-blocked {
          background: #ffeaec;
          color: #e34e5c;
        }

        .status-accepted {
          background: #e5f8f0;
          color: #13a66e;
        }

        .status-pending {
          background: #fff3d9;
          color: #e7a322;
        }

        .status-rejected {
          background: #ffe8eb;
          color: #e14e5b;
        }

        .action-buttons {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .action-btn {
          width: 29px;
          height: 29px;
          border-radius: 6px;
          border: 1px solid #e1e8f0;
          background: #ffffff;
          color: #627890;
          cursor: pointer;
          font-size: 11px;
        }

        .action-btn:hover {
          background: #edf5ff;
          color: #2678d7;
          border-color: #cfe2f9;
        }

        .more-btn {
          font-size: 15px;
        }

        /* ==============================
           PAGINATION
        ============================== */

        .pagination {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          padding: 15px 18px;
          border-top: 1px solid #edf1f5;
        }

        .page-btn {
          width: 29px;
          height: 29px;
          border-radius: 6px;
          border: 1px solid #e2e8ef;
          background: #ffffff;
          color: #74879d;
          cursor: pointer;
          font-size: 10px;
        }

        .page-btn:hover {
          background: #f1f6fc;
        }

        .page-btn.active {
          background: #287ddd;
          border-color: #287ddd;
          color: white;
        }

        .page-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        /* ==============================
           STUDENT DETAILS
        ============================== */

        .details-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .back-button {
          border: none;
          background: transparent;
          color: #2879d7;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }

        .back-button:hover {
          text-decoration: underline;
        }

        .details-id {
          font-size: 13px;
          color: #7e91a8;
        }

        .profile-card {
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 9px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .profile-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .large-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #edf4ff;
          color: #2879db;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          font-weight: 700;
        }

        .profile-name {
          margin: 0;
          color: #17375f;
          font-size: 18px;
        }

        .profile-student-id {
          margin: 5px 0 0;
          font-size: 13px;
          color: #8b9caf;
        }

        .registered-date {
          margin-top: 5px;
          color: #9ba8b7;
          font-size: 12px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .details-card {
          background: #ffffff;
          border: 1px solid #e3eaf2;
          border-radius: 9px;
          padding: 20px;
        }

        .details-card.full-width {
          margin-bottom: 15px;
        }

        .details-card-title {
          margin: 0 0 17px;
          font-size: 15px;
          font-weight: 700;
          color: #294c72;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .details-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px 25px;
        }

        .detail-item label {
          display: block;
          font-size: 12px;
          color: #97a5b6;
          margin-bottom: 5px;
        }

        .detail-item span {
          font-size: 14px;
          color: #365473;
          font-weight: 600;
        }

        .education-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .education-item label {
          display: block;
          color: #97a5b6;
          font-size: 12px;
          margin-bottom: 6px;
        }

        .education-item strong {
          color: #365473;
          font-size: 14px;
        }

        .applications-list {
          display: flex;
          flex-direction: column;
        }

        .application-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 120px;
          align-items: center;
          padding: 13px 0;
          border-top: 1px solid #edf1f5;
        }

        .application-row:first-child {
          border-top: none;
        }

        .application-col {
          font-size: 13px;
          color: #536d88;
        }

        .application-col strong {
          color: #365473;
        }

        .lead-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .lead-item label {
          display: block;
          font-size: 12px;
          color: #97a5b6;
          margin-bottom: 6px;
        }

        .lead-item strong {
          color: #365473;
          font-size: 14px;
        }

        .details-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .edit-button,
        .block-button {
          border: none;
          border-radius: 6px;
          padding: 10px 18px;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .edit-button {
          background: #287ddd;
          color: white;
        }

        .block-button {
          background: #ffe8ea;
          color: #df4d5a;
        }

        .edit-button:hover {
          background: #1f6fc8;
        }

        .block-button:hover {
          background: #ffdadd;
        }


        .more-action-wrap { position: relative; }
        .more-menu {
          position: absolute;
          top: 34px;
          right: 0;
          width: 145px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(26,52,82,.14);
          padding: 5px;
          z-index: 30;
        }
        .more-menu button {
          width: 100%;
          border: 0;
          background: transparent;
          padding: 9px 10px;
          text-align: left;
          border-radius: 6px;
          color: #46617d;
          font-size: 10px;
          cursor: pointer;
        }
        .more-menu button:hover { background: #f2f6fb; color: #287ddd; }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(13,31,54,.42);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 100;
        }
        .edit-modal {
          width: min(520px, 100%);
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e1e8f0;
          box-shadow: 0 20px 50px rgba(20,45,75,.2);
          padding: 22px;
        }
        .edit-modal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
        .edit-modal-header h3 { margin:0; color:#17375f; font-size:16px; }
        .modal-close { border:0; background:#f2f5f8; width:30px; height:30px; border-radius:7px; cursor:pointer; color:#647a92; }
        .edit-form { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
        .edit-field label { display:block; margin-bottom:5px; color:#8192a6; font-size:9px; }
        .edit-field input, .edit-field select { width:100%; height:36px; border:1px solid #dfe7ef; border-radius:7px; padding:0 10px; outline:none; color:#38536f; font-size:10px; }
        .edit-field input:focus, .edit-field select:focus { border-color:#72a9e8; }
        .edit-modal-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:18px; }
        .modal-cancel, .modal-save { border:0; border-radius:7px; padding:9px 16px; font-size:10px; cursor:pointer; }
        .modal-cancel { background:#eef2f6; color:#63788f; }
        .modal-save { background:#287ddd; color:#fff; }

        /* ==============================
           EMPTY STATE
        ============================== */

        .empty-state {
          text-align: center;
          padding: 55px 20px;
          color: #8494a8;
        }

        .empty-icon {
          font-size: 30px;
          margin-bottom: 10px;
        }

        .empty-state h3 {
          margin: 0;
          color: #3c5875;
          font-size: 13px;
        }

        .empty-state p {
          font-size: 10px;
          margin-top: 6px;
        }

        .app-shell {
          width: 100vw;
          max-width: none;
          margin-left: calc(50% - 50vw);
        }

        .academic-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        .marks-table {
          width: 100%;
          border-collapse: collapse;
        }
        .marks-table th, .marks-table td {
          padding: 11px 10px;
          border-bottom: 1px solid #edf1f5;
          text-align: left;
          font-size: 13px;
        }
        .marks-table th { color: #7f91a7; font-weight: 600; }
        .marks-table td { color: #365473; font-weight: 600; }
        .cutoff-box {
          margin-top: 14px;
          padding: 12px 14px;
          border-radius: 8px;
          background: #edf6ff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cutoff-box span { color:#71859c; font-size:13px; }
        .cutoff-box strong { color:#1670d2; font-size:16px; }
        .edit-modal-subtitle { margin: 4px 0 0; color:#8a9aae; font-size:11px; }
        .edit-field input, .edit-field select {
          background: #ffffff !important;
          color: #284a6e !important;
          -webkit-text-fill-color: #284a6e !important;
          font-size: 13px !important;
        }
        .edit-field input::placeholder { color:#9aa8b8 !important; opacity:1; }

        /* ==============================
           RESPONSIVE
        ============================== */


        @media (max-width: 1100px) {
          .admin-sidebar { width: 76px; min-width: 76px; }
          .sidebar-brand { justify-content:center; padding:0; }
          .sidebar-brand > div:last-child, .menu-title, .sidebar-item span:not(.sidebar-icon), .sidebar-admin-card > div:last-child, .logout-button span { display:none; }
          .sidebar-item { justify-content:center; padding:0; }
          .sidebar-icon { font-size:18px; }
          .sidebar-bottom { padding:10px; }
          .sidebar-admin-card { justify-content:center; padding:9px; }
        }

        @media (max-width: 1000px) {

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .details-grid {
            grid-template-columns: 1fr;
          }
          .academic-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 700px) {
          .admin-sidebar { width: 58px; min-width: 58px; }
          .sidebar-brand { height: 64px; }
          .brand-icon { width: 34px; height: 34px; font-size: 17px; }

          .top-navbar {
            padding: 0 14px;
          }

          .search-box {
            width: 190px;
          }

          .admin-info,
          .admin-arrow {
            display: none;
          }

          .student-content {
            padding: 22px 14px 40px;
          }

          .page-heading h1 {
            font-size: 19px;
          }

          .filter-card {
            flex-wrap: wrap;
          }

          .filter-search {
            flex-basis: 100%;
          }

          .filter-select {
            flex: 1;
            min-width: 0;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card {
            min-height: 95px;
            padding: 14px;
          }

          .stat-number {
            font-size: 18px;
          }

          .table-header {
            padding: 15px;
          }

          .profile-card {
            align-items: flex-start;
            gap: 15px;
          }

          .profile-left {
            align-items: flex-start;
          }

          .details-list {
            grid-template-columns: 1fr;
          }

          .education-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .lead-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .application-row {
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .details-actions {
            justify-content: stretch;
          }

          .edit-button,
          .block-button {
            flex: 1;
          }

        }

        @media (max-width: 450px) {

          .search-box {
            width: 145px;
          }

          .notification {
            display: none;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .admin-area {
            gap: 7px;
          }

          .filter-select {
            flex-basis: calc(50% - 5px);
          }

          .refresh-btn {
            width: 100%;
          }

          .details-topbar {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .edit-form { grid-template-columns: 1fr; }
          .edit-modal { padding: 18px; }

        }

      `}</style>

      <div className="app-shell">
        <AdminSidebar />
        <div className="student-main-area student-page">
          {/* ==============================
            TOP NAVBAR
        ============================== */}

          <div className="top-navbar">
            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search students, colleges, leads..."
              />
            </div>

            <div className="admin-area">
              <div className="notification">
                ♢<span className="notification-dot"></span>
              </div>

              <button
                type="button"
                className="admin-profile-toggle"
                aria-expanded={showAdminMenu}
                onClick={() => setShowAdminMenu((prev) => !prev)}
              >
                <div className="admin-avatar">A</div>
                <div className="admin-info">
                  <div className="admin-name">Admin</div>
                  <div className="admin-role">Super Admin</div>
                </div>
                <div className="admin-arrow">˅</div>
              </button>

              {showAdminMenu && (
                <div className="admin-dropdown">
                  <button type="button" onClick={handleAdminLogout}>
                    ↪ Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <main className="student-content">
            {/* =================================================
              STUDENT TABLE VIEW
          ================================================= */}

            {!selectedStudent && (
              <>
                <div className="page-heading">
                  <h1>Student Management</h1>

                  <p>
                    Manage registered students and their applications, leads and
                    account status
                  </p>
                </div>

                {/* FILTER */}

                <div className="filter-card">
                  <div className="filter-search">
                    <span className="filter-search-icon">🔍</span>

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search students..."
                    />
                  </div>

                  <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => handleStatus(e.target.value)}
                  >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Blocked</option>
                  </select>

                  <select
                    className="filter-select"
                    value={courseFilter}
                    onChange={(e) => handleCourse(e.target.value)}
                  >
                    {courses.map((course) => (
                      <option key={course}>{course}</option>
                    ))}
                  </select>

                  <button
                    className="refresh-btn"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All Status");
                      setCourseFilter("All Courses");
                      setCurrentPage(1);
                    }}
                  >
                    ⟳
                  </button>
                </div>

                {/* STATISTICS */}

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-title">Total Students</div>

                    <div className="stat-number">25,430</div>

                    <div className="stat-sub">
                      <span>↑ 12%</span> vs last month
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-title">Active Students</div>

                    <div className="stat-number">24,850</div>

                    <div className="stat-sub">
                      <span>↑ 8%</span> vs last month
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-title">Applications</div>

                    <div className="stat-number">8,240</div>

                    <div className="stat-sub">
                      <span>↑ 14%</span> vs last month
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-title">Blocked Students</div>

                    <div className="stat-number">580</div>

                    <div className="stat-sub">
                      <span>↓ 3%</span> vs last month
                    </div>
                  </div>
                </div>

                {/* TABLE */}

                <div className="table-card">
                  <div className="table-header">
                    <div className="table-title">
                      <h2>Registered Students</h2>

                      <p>All students registered on the platform</p>
                    </div>

                    <div className="student-count">
                      {filteredStudents.length} Students
                    </div>
                  </div>

                  {currentStudents.length > 0 ? (
                    <div className="table-wrapper">
                      <table className="student-table">
                        <thead>
                          <tr>
                            <th>#</th>

                            <th>Student</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>College</th>

                            <th>Applications</th>

                            <th>Status</th>

                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentStudents.map((student, index) => (
                            <tr key={student.id}>
                              <td className="number-cell">
                                {startIndex + index + 1}
                              </td>

                              <td>
                                <div className="student-name">
                                  <div className="student-avatar">
                                    {student.name.charAt(0).toUpperCase()}
                                  </div>

                                  <div>
                                    <strong>{student.name}</strong>

                                    <span className="student-id">
                                      {student.id}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              <td>{student.email}</td>

                              <td>{student.phone}</td>

                              <td>{student.college}</td>

                              <td className="application-number">
                                {student.applications}
                              </td>

                              <td>
                                <span
                                  className={`status-badge ${getStatusClass(
                                    student.status,
                                  )}`}
                                >
                                  {student.status}
                                </span>
                              </td>

                              <td>
                                <div className="action-buttons">
                                  <button
                                    className="action-btn"
                                    title="View Student"
                                    onClick={() => openStudent(student)}
                                  >
                                    👁
                                  </button>

                                  <button
                                    className="action-btn"
                                    title="Edit Student"
                                    onClick={() => {
                                      setOpenMoreId(null);
                                      setEditingStudent(student);
                                      setEditForm({ ...student });
                                    }}
                                  >
                                    ✏
                                  </button>

                                  <div className="more-action-wrap">
                                    <button
                                      className="action-btn more-btn"
                                      title="More"
                                      onClick={() =>
                                        setOpenMoreId(
                                          openMoreId === student.id
                                            ? null
                                            : student.id,
                                        )
                                      }
                                    >
                                      ⋮
                                    </button>

                                    {openMoreId === student.id && (
                                      <div className="more-menu">
                                        <button
                                          onClick={() => openStudent(student)}
                                        >
                                          View Details
                                        </button>
                                        <button
                                          onClick={() => {
                                            setOpenMoreId(null);
                                            setEditingStudent(student);
                                            setEditForm({ ...student });
                                          }}
                                        >
                                          Edit Student
                                        </button>
                                        <button
                                          onClick={() => {
                                            const nextStatus =
                                              student.status === "Blocked"
                                                ? "Active"
                                                : "Blocked";
                                            setStudents((prev) =>
                                              prev.map((item) =>
                                                item.id === student.id
                                                  ? {
                                                      ...item,
                                                      status: nextStatus,
                                                    }
                                                  : item,
                                              ),
                                            );
                                            if (
                                              selectedStudent?.id === student.id
                                            )
                                              setSelectedStudent({
                                                ...student,
                                                status: nextStatus,
                                              });
                                            setOpenMoreId(null);
                                          }}
                                        >
                                          {student.status === "Blocked"
                                            ? "Activate Student"
                                            : "Block Student"}
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">🔍</div>

                      <h3>No students found</h3>

                      <p>Try changing your search or filters.</p>
                    </div>
                  )}

                  {/* PAGINATION */}

                  {filteredStudents.length > 0 && (
                    <div className="pagination">
                      <button
                        className="page-btn"
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage((page) => Math.max(page - 1, 1))
                        }
                      >
                        ‹
                      </button>

                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1,
                      ).map((page) => (
                        <button
                          key={page}
                          className={`page-btn ${
                            currentPage === page ? "active" : ""
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        className="page-btn"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                          setCurrentPage((page) =>
                            Math.min(page + 1, totalPages),
                          )
                        }
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* =================================================
              STUDENT DETAILS VIEW
          ================================================= */}

            {selectedStudent && (
              <>
                {/* TOP */}

                <div className="details-topbar">
                  <button className="back-button" onClick={goBack}>
                    ← Back to Students
                  </button>

                  <div className="details-id">
                    Student ID: <strong>{selectedStudent.id}</strong>
                  </div>
                </div>

                {/* PROFILE */}

                <div className="profile-card">
                  <div className="profile-left">
                    <div className="large-avatar">
                      {selectedStudent.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h2 className="profile-name">{selectedStudent.name}</h2>

                      <div className="profile-student-id">
                        {selectedStudent.id}
                      </div>

                      <div className="registered-date">
                        Registered: {selectedStudent.registered}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`status-badge ${getStatusClass(
                      selectedStudent.status,
                    )}`}
                  >
                    🟢 {selectedStudent.status}
                  </span>
                </div>

                {/* PERSONAL + CONTACT */}

                <div className="details-grid">
                  <div className="details-card">
                    <h3 className="details-card-title">Personal Details</h3>

                    <div className="details-list">
                      <div className="detail-item">
                        <label>Name</label>
                        <span>{selectedStudent.name}</span>
                      </div>

                      <div className="detail-item">
                        <label>Date of Birth</label>
                        <span>{selectedStudent.dob}</span>
                      </div>

                      <div className="detail-item">
                        <label>Gender</label>
                        <span>{selectedStudent.gender}</span>
                      </div>

                      <div className="detail-item">
                        <label>Student ID</label>
                        <span>{selectedStudent.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="details-card">
                    <h3 className="details-card-title">Contact Information</h3>

                    <div className="details-list">
                      <div className="detail-item">
                        <label>Email</label>
                        <span>{selectedStudent.email}</span>
                      </div>

                      <div className="detail-item">
                        <label>Phone</label>
                        <span>{selectedStudent.phone}</span>
                      </div>

                      <div className="detail-item">
                        <label>Address</label>
                        <span>{selectedStudent.address}</span>
                      </div>

                      <div className="detail-item">
                        <label>City</label>
                        <span>{selectedStudent.city}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* EDUCATION */}

                <div className="details-card full-width">
                  <h3 className="details-card-title">Education</h3>

                  <div className="education-row">
                    <div className="education-item">
                      <label>College</label>

                      <strong>{selectedStudent.college}</strong>
                    </div>

                    <div className="education-item">
                      <label>Course</label>

                      <strong>{selectedStudent.course}</strong>
                    </div>
                  </div>
                </div>

                {/* ACADEMIC MARKS */}

                <div className="academic-grid">
                  <div className="details-card">
                    <h3 className="details-card-title">10th Standard Marks</h3>
                    <table className="marks-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Tamil</td>
                          <td>{selectedStudent.tenthMarks?.Tamil}</td>
                        </tr>
                        <tr>
                          <td>English</td>
                          <td>{selectedStudent.tenthMarks?.English}</td>
                        </tr>
                        <tr>
                          <td>Mathematics</td>
                          <td>{selectedStudent.tenthMarks?.Mathematics}</td>
                        </tr>
                        <tr>
                          <td>Science</td>
                          <td>{selectedStudent.tenthMarks?.Science}</td>
                        </tr>
                        <tr>
                          <td>Social Science</td>
                          <td>{selectedStudent.tenthMarks?.SocialScience}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Total / Percentage</strong>
                          </td>
                          <td>
                            <strong>
                              {selectedStudent.tenthMarks?.Total} /{" "}
                              {selectedStudent.tenthMarks?.Percentage}%
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="details-card">
                    <h3 className="details-card-title">12th Standard Marks</h3>
                    <table className="marks-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedStudent.twelfthMarks?.Subjects || []).map(
                          (subject) => (
                            <tr key={subject}>
                              <td>
                                {subject === "ComputerScience"
                                  ? "Computer Science"
                                  : subject}
                              </td>
                              <td>{selectedStudent.twelfthMarks?.[subject]}</td>
                            </tr>
                          ),
                        )}
                        <tr>
                          <td>
                            <strong>Total / Percentage</strong>
                          </td>
                          <td>
                            <strong>
                              {selectedStudent.twelfthMarks?.Total} /{" "}
                              {selectedStudent.twelfthMarks?.Percentage}%
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="cutoff-box">
                      <span>Calculated Cut-off</span>
                      <strong>{selectedStudent.cutoff}</strong>
                    </div>
                  </div>
                </div>

                {/* APPLICATIONS */}

                <div className="details-card full-width">
                  <h3 className="details-card-title">Applications</h3>

                  <div className="applications-list">
                    {selectedStudent.applicationList.map(
                      (application, index) => (
                        <div className="application-row" key={index}>
                          <div className="application-col">
                            <strong>{application.college}</strong>
                          </div>

                          <div className="application-col">
                            {application.course}
                          </div>

                          <div>
                            <span
                              className={`status-badge ${getStatusClass(
                                application.status,
                              )}`}
                            >
                              {application.status}
                            </span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* LEAD INFORMATION */}

                <div className="details-card full-width">
                  <h3 className="details-card-title">Lead Information</h3>

                  <div className="lead-grid">
                    <div className="lead-item">
                      <label>Lead Status</label>

                      <strong>{selectedStudent.leadStatus}</strong>
                    </div>

                    <div className="lead-item">
                      <label>Purchased By</label>

                      <strong>{selectedStudent.purchasedBy}</strong>
                    </div>

                    <div className="lead-item">
                      <label>Lead Price</label>

                      <strong>{selectedStudent.leadPrice}</strong>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="details-actions">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditingStudent(selectedStudent);
                      setEditForm({ ...selectedStudent });
                    }}
                  >
                    Edit Student
                  </button>

                  <button
                    className="block-button"
                    onClick={() => {
                      const nextStatus =
                        selectedStudent.status === "Blocked"
                          ? "Active"
                          : "Blocked";
                      const updated = {
                        ...selectedStudent,
                        status: nextStatus,
                      };
                      setStudents((prev) =>
                        prev.map((item) =>
                          item.id === selectedStudent.id ? updated : item,
                        ),
                      );
                      setSelectedStudent(updated);
                    }}
                  >
                    {selectedStudent.status === "Blocked"
                      ? "Activate Account"
                      : "Block Account"}
                  </button>
                </div>
              </>
            )}
          </main>

          {editingStudent && editForm && (
            <div
              className="modal-overlay"
              onClick={() => {
                setEditingStudent(null);
                setEditForm(null);
              }}
            >
              <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
                <div className="edit-modal-header">
                  <div>
                    <h3>Edit Student</h3>
                    <p className="edit-modal-subtitle">
                      Update student account information
                    </p>
                  </div>
                  <button
                    className="modal-close"
                    onClick={() => {
                      setEditingStudent(null);
                      setEditForm(null);
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div className="edit-form">
                  {[
                    ["name", "Name"],
                    ["email", "Email"],
                    ["phone", "Phone"],
                    ["college", "College"],
                    ["course", "Course"],
                  ].map(([key, label]) => (
                    <div className="edit-field" key={key}>
                      <label>{label}</label>
                      <input
                        value={editForm[key] || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, [key]: e.target.value })
                        }
                      />
                    </div>
                  ))}
                  <div className="edit-field">
                    <label>Status</label>
                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                    >
                      <option>Active</option>
                      <option>Blocked</option>
                    </select>
                  </div>
                </div>
                <div className="edit-modal-actions">
                  <button
                    className="modal-cancel"
                    onClick={() => {
                      setEditingStudent(null);
                      setEditForm(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-save"
                    onClick={() => {
                      setStudents((prev) =>
                        prev.map((item) =>
                          item.id === editForm.id
                            ? { ...item, ...editForm }
                            : item,
                        ),
                      );
                      if (selectedStudent?.id === editForm.id)
                        setSelectedStudent({ ...selectedStudent, ...editForm });
                      setEditingStudent(null);
                      setEditForm(null);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentManagement;
