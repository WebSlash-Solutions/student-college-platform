import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
/* ───────────────────────── DATA ───────────────────────── */
// ⚠️ Change these paths to match the routes in your App.jsx / router file
const NAV = [
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
// Same logout as the Courses page: clear session and go to the admin login page
const handleAdminLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminLoggedIn");
    window.location.replace("/admin/login");
};
const STATS = [
    { label: "Total Students", value: 12450, trend: 2, tone: "blue", icon: "👥" },
    { label: "Total Colleges", value: 965, trend: 3, tone: "green", icon: "🏛" },
    { label: "Duplicate Students", value: 86, trend: -12, tone: "red", icon: "👤" },
    { label: "Duplicate Colleges", value: 24, trend: -8, tone: "orange", icon: "🏛" },
    { label: "Unique Students", value: 12364, trend: 2, tone: "indigo", icon: "👤" },
    { label: "Unique Colleges", value: 941, trend: 3, tone: "purple", icon: "🏛" },
];
const TABS = [
    { id: "students", label: "Duplicate Students", icon: "👥" },
    { id: "colleges", label: "Duplicate Colleges", icon: "🏛" },
    { id: "unique", label: "Unique Records", icon: "🛡" },
    { id: "history", label: "Search History", icon: "🕘" },
    { id: "activity", label: "Activity Monitoring", icon: "📊" },
];
const fmtDate = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtStamp = (d) => `${fmtDate(d)} ${d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
/* ── Duplicate records (editable from the ⋮ menu) ── */
const DUP_STUDENTS_SEED = [
    { kind: "student", group: "duplicate", name: "Priya S", id: "STU2025001", phone: "+91 98765 43210", email: "priya@gmail.com", aadhaar: "XXXX-XXXX-1234", city: "Chennai", match: "Phone + Email", status: "High Priority", prevStatus: "Under Review", date: "Oct 16, 2025", time: "10:24 AM", created: "Oct 10, 2025 09:15 AM", matched: "Oct 12, 2025 02:30 PM", modified: "Oct 16, 2025 10:24 AM", color: "#f9c5d1" },
    { kind: "student", group: "duplicate", name: "Rahul K", id: "STU2025098", phone: "+91 91234 56789", email: "rahul@gmail.com", aadhaar: "XXXX-XXXX-5678", city: "Coimbatore", match: "Email", status: "Under Review", prevStatus: "New", date: "Oct 15, 2025", time: "04:12 PM", created: "Oct 08, 2025 11:40 AM", matched: "Oct 11, 2025 01:05 PM", modified: "Oct 15, 2025 04:12 PM", color: "#c5d8f9" },
    { kind: "student", group: "duplicate", name: "Anitha M", id: "STU2025034", phone: "+91 98887 76655", email: "anitha@gmail.com", aadhaar: "XXXX-XXXX-9012", city: "Erode", match: "Phone", status: "Confirmed Duplicate", prevStatus: "Under Review", date: "Oct 14, 2025", time: "11:03 AM", created: "Oct 05, 2025 10:10 AM", matched: "Oct 09, 2025 03:20 PM", modified: "Oct 14, 2025 11:03 AM", color: "#f9d9c5" },
    { kind: "student", group: "duplicate", name: "Sneha R", id: "STU2025189", phone: "+91 93456 78901", email: "sneha@gmail.com", aadhaar: "XXXX-XXXX-3456", city: "Erode", match: "Phone + Email", status: "Under Review", prevStatus: "New", date: "Oct 13, 2025", time: "02:37 PM", created: "Oct 06, 2025 09:50 AM", matched: "Oct 10, 2025 12:15 PM", modified: "Oct 13, 2025 02:37 PM", color: "#c5f9e0" },
];
const DUP_COLLEGES_SEED = [
    { kind: "college", group: "duplicate", name: "Sri Ramakrishna College", id: "COL2024001", reg: "REG23456", phone: "+91 98422 11111", email: "info@src.edu.in", site: "www.src.edu.in", city: "Coimbatore", match: "Phone + Email", status: "High Priority", prevStatus: "Under Review", date: "Oct 16, 2025", time: "09:42 AM", created: "Oct 02, 2025 10:00 AM", matched: "Oct 12, 2025 11:30 AM", modified: "Oct 16, 2025 09:42 AM" },
    { kind: "college", group: "duplicate", name: "Government Arts College", id: "COL2024008", reg: "REG56789", phone: "+91 94431 22222", email: "gac@tn.gov.in", site: "www.gac.edu.in", city: "Tiruppur", match: "Email", status: "Under Review", prevStatus: "New", date: "Oct 15, 2025", time: "03:21 PM", created: "Oct 03, 2025 01:20 PM", matched: "Oct 11, 2025 10:45 AM", modified: "Oct 15, 2025 03:21 PM" },
    { kind: "college", group: "duplicate", name: "Kumaraguru College", id: "COL2024015", reg: "REG90123", phone: "+91 93677 33333", email: "contact@kumaraguru.edu.in", site: "www.kumaraguru.edu.in", city: "Coimbatore", match: "Website", status: "Under Review", prevStatus: "New", date: "Oct 14, 2025", time: "01:18 PM", created: "Oct 01, 2025 09:30 AM", matched: "Oct 10, 2025 04:10 PM", modified: "Oct 14, 2025 01:18 PM" },
];
/* ── Only these 4 districts are used in all sample data ── */
const DISTRICTS = ["Coimbatore", "Erode", "Tiruppur", "Chennai"];
const TYPES = ["Engineering College", "Arts & Science College", "Institute of Technology", "Polytechnic College", "Medical College"];
const TYPE_SHORT = ["eng", "asc", "iot", "poly", "med"];
const AVATARS = ["#f9c5d1", "#c5d8f9", "#f9d9c5", "#c5f9e0", "#e0d4fb"];
// unique students (20 first names x 5 surnames = 100 unique names)
const FIRST = ["Aarav", "Divya", "Karthik", "Meena", "Naveen", "Pooja", "Ramesh", "Sangeetha", "Vignesh", "Yamini", "Arun", "Bharathi", "Deepak", "Gayathri", "Harish", "Janani", "Lokesh", "Nithya", "Surya", "Kavya"];
const LAST = ["Kumar", "Raj", "Devi", "Selvam", "Murugan"];
// 20 more first names for the 100 added students (20 x 5 surnames = 100 more unique names)
const EXTRA_FIRST = ["Aadhira", "Bala", "Charan", "Deepika", "Eswar", "Gokul", "Hariharan", "Indhu", "Jagan", "Kamali", "Logesh", "Madhan", "Nirmala", "Oviya", "Praveen", "Rohini", "Sudha", "Tharun", "Usha", "Varun"];
// duplicate students (22 first names x 4 surname initials = 88 unique names)
const DUP_FIRST = ["Aishwarya", "Balaji", "Chitra", "Dinesh", "Elango", "Fathima", "Gowtham", "Hema", "Ilango", "Jeeva", "Keerthi", "Lavanya", "Mohan", "Nandini", "Prakash", "Revathi", "Saravanan", "Thenmozhi", "Udhaya", "Vimal", "Yuvaraj", "Abinaya"];
const DUP_LAST = ["Subramani", "Pillai", "Nair", "Iyer"];
// colleges
const COLLEGE_PREFIX = ["Sri Vidya", "Annai Teresa", "Bharathi", "Vivekananda", "Periyar", "Kamarajar", "Thiruvalluvar", "Gandhi", "Nehru", "Ambedkar", "Lakshmi", "Saraswathi", "Meenakshi", "Arul", "Selvam", "Nandha", "Vel", "Kalaivani", "Thamarai", "Pavai", "Mahalakshmi", "Valluvar", "Bharath", "Everest", "Sakthi"];
const DUP_COLLEGE_PREFIX = ["Akshaya", "Bhavani", "Cauvery", "Dhanalakshmi", "Eswari", "Gnanam", "Hari", "Indira", "Jayam", "Kalaimagal", "Latha", "Muthu", "Navarasam", "Oviya", "Palani", "Rathna", "Sri Shakthi", "Tamilselvi", "Uma", "Vasantham", "Yazhini"];
const mkPhone = (i, k) => {
    const n = String(6000000000 + (((i + 3) * k) % 4000000000));
    return `+91 ${n.slice(0, 5)} ${n.slice(5)}`;
};
const mkTime = (i) => {
    const h = 9 + (i % 9);
    const m = String((i * 7) % 60).padStart(2, "0");
    return `${String(h > 12 ? h - 12 : h).padStart(2, "0")}:${m} ${h >= 12 ? "PM" : "AM"}`;
};
const slugify = (s) => s.toLowerCase().replace(/[^a-z]/g, "");
/* 200 unique students (100 original + 100 added) — college info is attached further below */
const UNIQUE_STUDENTS_RAW = Array.from({ length: 200 }, (_, i) => {
    const first = i < 100 ? FIRST[i % 20] : EXTRA_FIRST[i % 20];
    const last = LAST[Math.floor(i / 20) % 5];
    const date = `Oct ${1 + (i % 16)}, 2025`;
    const time = mkTime(i);
    const created = `Sep ${1 + (i % 28)}, 2025 ${mkTime(i + 2)}`;
    return {
        kind: "student", group: "unique", name: `${first} ${last}`, id: `STU2025${201 + i}`,
        phone: mkPhone(i, 987654321), email: `${first}.${last}@gmail.com`.toLowerCase(),
        aadhaar: `XXXX-XXXX-${1000 + ((i * 7919) % 9000)}`, city: DISTRICTS[(i + Math.floor(i / 20)) % 4],
        match: "No Match", status: i % 9 === 4 ? "Under Review" : "Unique", prevStatus: "New",
        date, time, created, matched: created, modified: `${date} ${time}`, color: AVATARS[i % AVATARS.length],
    };
});
/* 100 unique colleges */
const UNIQUE_COLLEGES_RAW = Array.from({ length: 100 }, (_, i) => {
    const prefix = COLLEGE_PREFIX[i % 25];
    const t = Math.floor(i / 25) % 5;
    const city = DISTRICTS[i % 4];
    const slug = slugify(prefix) + TYPE_SHORT[t];
    const date = `Oct ${1 + (i % 16)}, 2025`;
    const time = mkTime(i + 1);
    const created = `Sep ${1 + (i % 28)}, 2025 ${mkTime(i + 4)}`;
    return {
        kind: "college", group: "unique", type: TYPES[t], name: `${prefix} ${TYPES[t]}, ${city}`, id: `COL2024${101 + i}`,
        reg: `REG${20000 + i * 37}`, phone: mkPhone(i, 876543219), email: `info@${slug}.edu.in`,
        site: `www.${slug}.edu.in`, city, match: "No Match", status: i % 11 === 5 ? "Under Review" : "Unique",
        prevStatus: "New", date, time, created, matched: created, modified: `${date} ${time}`,
    };
});
/* Duplicate students: 4 hand-written + 82 generated = 86 (matches the "Duplicate Students" card) */
const DUP_MATCH_S = ["Phone + Email", "Email", "Phone", "Name"];
const DUP_STATUS = ["Under Review", "High Priority", "Confirmed Duplicate", "Under Review"];
const DUP_STUDENTS_RAW = [
    ...DUP_STUDENTS_SEED,
    ...Array.from({ length: 82 }, (_, i) => {
        const first = DUP_FIRST[i % 22];
        const last = DUP_LAST[Math.floor(i / 22) % 4];
        const date = `Oct ${1 + (i % 16)}, 2025`;
        const time = mkTime(i + 3);
        return {
            kind: "student", group: "duplicate", name: `${first} ${last[0]}`, id: `STU2025${500 + i}`,
            phone: mkPhone(i + 300, 765432191), email: `${first}.${last}@gmail.com`.toLowerCase(),
            aadhaar: `XXXX-XXXX-${1000 + (((i + 40) * 6571) % 9000)}`, city: DISTRICTS[(i + 1) % 4],
            match: DUP_MATCH_S[i % 4], status: DUP_STATUS[i % 4], prevStatus: i % 3 === 0 ? "Under Review" : "New",
            date, time, created: `Sep ${1 + (i % 28)}, 2025 ${mkTime(i + 2)}`, matched: `Oct ${1 + (i % 12)}, 2025 ${mkTime(i + 5)}`,
            modified: `${date} ${time}`, color: AVATARS[i % AVATARS.length],
        };
    }),
];
/* Duplicate colleges: 3 hand-written + 21 generated = 24 (matches the "Duplicate Colleges" card) */
const DUP_MATCH_C = ["Phone + Email", "Email", "Phone", "Website"];
const DUP_COLLEGES_RAW = [
    ...DUP_COLLEGES_SEED,
    ...Array.from({ length: 21 }, (_, i) => {
        const prefix = DUP_COLLEGE_PREFIX[i % 21];
        const t = (i + 1) % 5;
        const city = DISTRICTS[(i + 2) % 4];
        const slug = slugify(prefix) + TYPE_SHORT[t];
        const date = `Oct ${1 + (i % 16)}, 2025`;
        const time = mkTime(i + 6);
        return {
            kind: "college", group: "duplicate", type: TYPES[t], name: `${prefix} ${TYPES[t]}, ${city}`, id: `COL2024${201 + i}`,
            reg: `REG${50000 + i * 41}`, phone: mkPhone(i + 500, 654321987), email: `info@${slug}.edu.in`,
            site: `www.${slug}.edu.in`, city, match: DUP_MATCH_C[i % 4], status: DUP_STATUS[i % 4], prevStatus: i % 3 === 0 ? "Under Review" : "New",
            date, time, created: `Sep ${1 + (i % 28)}, 2025 ${mkTime(i + 3)}`, matched: `Oct ${1 + (i % 12)}, 2025 ${mkTime(i + 7)}`,
            modified: `${date} ${time}`,
        };
    }),
];
/* ── Coimbatore college directory: 200 real Coimbatore-district institutions, each under the type(s) it actually offers ──
   (names/streams taken from public college listings; phone / e-mail / website are placeholders, student & search counts are sample numbers) */
const COIM_DIRECTORY = {
    "Engineering College": [
        "SNS College of Technology", "SNS College of Engineering", "PSG College of Technology", "PSG Institute of Technology and Applied Research",
        "Kumaraguru College of Technology", "Sri Krishna College of Engineering and Technology", "Sri Krishna College of Technology", "Kathir College of Engineering",
        "Coimbatore Institute of Technology", "Coimbatore Institute of Engineering and Technology", "Government College of Technology", "Dr. N.G.P. Institute of Technology",
        "Hindusthan College of Engineering and Technology", "Hindusthan Institute of Technology", "KPR Institute of Engineering and Technology", "Adithya Institute of Technology",
        "Amrita School of Engineering", "Info Institute of Engineering", "Kalaignar Karunanidhi Institute of Technology", "Karpagam College of Engineering",
        "Karpagam Institute of Technology", "KGiSL Institute of Technology", "KTVR Knowledge Park for Engineering and Technology", "Maharaja Institute of Technology",
        "Sri Eshwar College of Engineering", "Sri Shakthi Institute of Engineering and Technology", "Sri Ramakrishna Engineering College", "Sri Ramakrishna Institute of Technology",
        "VSB College of Engineering Technical Campus", "Akshaya College of Engineering and Technology", "Arjun College of Technology", "Asian College of Engineering and Technology",
        "ASL Pauls College of Engineering and Technology", "Anna University Regional Campus Coimbatore", "EASA College of Engineering and Technology", "Nehru Institute of Engineering and Technology",
        "Nehru Institute of Technology", "Nightingale Institute of Technology", "PA College of Engineering and Technology", "Park College of Engineering and Technology",
        "Park College of Technology", "Pollachi Institute of Engineering and Technology", "Dr. Mahalingam College of Engineering and Technology", "Rathinam Technical Campus",
        "RVS College of Engineering and Technology", "RVS Technical Campus", "Karunya Institute of Technology and Sciences", "Jansons Institute of Technology",
        "Tamilnadu College of Engineering", "United Institute of Technology", "Sri Sai Ranganathan Engineering College", "Sri Ranganathar Institute of Engineering and Technology",
        "Sri Guru Institute of Technology", "Park Maritime Academy", "Ambal Professional Group of Institutions",
    ],
    "Arts & Science College": [
        "PSG College of Arts and Science", "PSGR Krishnammal College for Women", "Sri Krishna Arts and Science College", "Sri Krishna Adithya College of Arts and Science",
        "Kathir College of Arts and Science", "KG College of Arts and Science", "KPR College of Arts, Science and Research", "Hindusthan College of Arts and Science",
        "Dr. N.G.P. Arts and Science College", "Dr. SNS Rajalakshmi College of Arts and Science", "Government Arts College", "Nirmala College for Women",
        "Kongunadu Arts and Science College", "Kovai Kalaimagal College of Arts and Science", "Kumaraguru College of Liberal Arts and Science", "CBM College",
        "Sree Narayana Guru College", "Sri Ramakrishna College of Arts and Science for Women", "Sri Ramakrishna Mission Vidyalaya College of Arts and Science", "Rathinam College of Arts and Science",
        "RVS College of Arts and Science", "PPG College of Arts and Science", "AJK College of Arts and Science", "Akshaya College of Arts and Science",
        "Angappa College of Arts and Science", "Bishop Ambrose College", "JCT College of Arts and Science", "Sankara College of Science and Commerce",
        "Shri Nehru Maha Vidyalaya College of Arts and Science", "SAN International College of Arts and Science", "NGM College", "Pioneer College of Arts and Science",
        "Pollachi College of Arts and Science", "Amrita School of Arts and Sciences", "Dr. G.R. Damodaran College of Science", "Avinashilingam Institute for Home Science and Higher Education for Women",
        "CMS College of Science and Commerce", "APEX Institute of Multimedia", "RVS College of Computer Application", "Clusters Institute of Media and Technology",
    ],
    "Medical College": [
        "Coimbatore Medical College", "PSG Institute of Medical Sciences and Research", "ESIC Medical College and PGIMSR", "KMCH Institute of Health Sciences and Research",
        "Karpagam Faculty of Medicine and Health Sciences", "Martin Homeopathy Medical College and Hospital", "RVS Homoeopathic Medical College and Hospital", "RVS Siddha Medical College",
        "Ayurveda College Coimbatore", "KG Hospital and Postgraduate Medical Institute",
    ],
    "Dental College": ["RVS Dental College and Hospital", "Sri Ramakrishna Dental College and Hospital"],
    "Nursing College": [
        "PPG College of Nursing", "AJK College of Nursing", "Annai Meenakshi College of Nursing", "Cheran College of Nursing", "Ellen College of Nursing", "FIMS College of Nursing",
        "Ganga College of Nursing", "GEM Institute of Nursing Education and Research", "KG College of Nursing", "KMCH College of Nursing", "Kongunadu College of Nursing",
        "Nightingale Institute of Nursing Education", "Royal College of Nursing", "RVS College of Nursing", "Sai Institute of Nursing Education", "Ganga School of Nursing",
        "KG School of Nursing", "SNS College of Nursing",
    ],
    "Physiotherapy College": [
        "PPG College of Physiotherapy", "Cheran College of Physiotherapy", "KG College of Physiotherapy", "Nightingale Institute of Physiotherapy",
        "RVS College of Physiotherapy", "SNS College of Physiotherapy",
    ],
    "Allied Health Science College": [
        "PPG Institute of Allied Health Sciences", "PPG Institute of Optometry", "PPG College of Occupational Therapy", "KMCH College of Occupational Therapy",
        "Kongunadu Institute of Allied Health Sciences", "NG Institute of Paramedical Science", "Ganga Institute of Health and Sciences",
        "Sri Ramakrishna Institute of Paramedical Sciences", "SNS College of Allied Health Science",
    ],
    "Pharmacy College": [
        "PPG College of Pharmacy", "Cheran College of Pharmacy", "KMCH College of Pharmacy", "Royal College of Pharmacy and Paramedical Sciences",
        "PSG College of Pharmacy", "Karpagam College of Pharmacy",
    ],
    "Agriculture College": [
        "Tamil Nadu Agricultural University", "Agricultural College and Research Institute", "Agricultural Engineering College and Research Institute",
        "Horticultural College and Research Institute", "Forest College and Research Institute Mettupalayam", "Amrita School of Agricultural Sciences",
    ],
    "Law College": ["Government Law College Coimbatore", "Amrita International School of Law"],
    "Polytechnic College": [
        "Government Polytechnic College", "Government Polytechnic College for Women", "GRG Polytechnic College", "Karpagam Polytechnic College", "KMG Polytechnic College",
        "Nyruthi Polytechnic College", "PA Polytechnic College", "Park AMC Polytechnic College", "PSG Polytechnic College", "RVS Polytechnic College",
        "Sankara Polytechnic College", "Nachimuthu Polytechnic College",
    ],
    "Management (MBA) College": [
        "Dr. G.R. Damodaran Institute of Management", "GR Damodaran Academy of Management", "GRG School of Management Studies", "Guruvayurappan Institute of Management",
        "PSG Institute of Management", "Karunya School of Management", "KCT Business School", "Amrita School of Business", "Nehru Institute of Information Technology and Management",
        "PPG Business School", "Park Global School of Business Excellence", "RVS Faculty of Management", "RVS Institute of Management Studies and Research",
        "Sankara Institute of Management Science", "SAN International Business School", "Coimbatore Institute of Management and Technology",
        "Firebird Institute of Research in Management", "KGiSL Institute of Information Management", "SVPISTM Textile Management School",
    ],
    "Education (B.Ed) College": [
        "PPG College of Education", "Dr. N.G.P. College of Education", "Dr. SNS College of Education", "Kasturi College of Education", "Kathir College of Education",
        "KMG College of Education", "Bharathi College of Education", "Government College of Education for Women", "RVS College of Education",
        "Sri Ramakrishna Mission Vidyalaya College of Education",
    ],
    "Architecture College": [
        "Nehru School of Architecture", "NR School of Architecture", "RVS School of Architecture", "San Academy of Architecture",
        "Sasi Creative School of Architecture", "Capital College of Architecture", "PSG Institute of Architecture and Planning",
    ],
};
const COIM_TYPES = Object.keys(COIM_DIRECTORY);
/* mix the types (round-robin) so the table doesn't show one type after another */
const COIM_LIST = (() => {
    const lists = COIM_TYPES.map((t) => COIM_DIRECTORY[t].map((name) => ({ name, type: t })));
    const out = [];
    for (let r = 0; out.length < 200 && r < 60; r++)
        lists.forEach((l) => {
            if (l[r])
                out.push(l[r]);
        });
    return out;
})();
const COIMBATORE_RAW = COIM_LIST.map(({ name, type }, i) => {
    const slug = slugify(name).slice(0, 30);
    const date = `Oct ${1 + (i % 16)}, 2026`;
    const time = mkTime(i + 2);
    const created = `Sep ${1 + (i % 28)}, 2026 ${mkTime(i + 5)}`;
    return {
        kind: "college", group: "unique", type, name,
        id: `COL2025${String(i + 1).padStart(3, "0")}`, reg: `REG${70000 + i * 29}`, phone: mkPhone(i + 700, 543219876),
        email: `info@${slug}.example`, site: `www.${slug}.example`, city: "Coimbatore", match: "No Match",
        status: i % 13 === 6 ? "Under Review" : "Unique", prevStatus: "New", date, time, created, matched: created, modified: `${date} ${time}`,
    };
});
/* every college gets a type, a student count and a "searched by" count */
const SEED_COLLEGE_TYPE = { COL2024001: "Engineering College", COL2024008: "Arts & Science College", COL2024015: "Engineering College" };
const TYPE_SIZE = {
    "Engineering College": [1200, 4200], "Arts & Science College": [800, 3500], "Medical College": [600, 1500], "Dental College": [300, 650],
    "Nursing College": [150, 500], "Physiotherapy College": [100, 400], "Allied Health Science College": [100, 500], "Pharmacy College": [200, 700],
    "Agriculture College": [800, 3000], "Law College": [300, 900], "Polytechnic College": [300, 1200], "Management (MBA) College": [150, 600],
    "Education (B.Ed) College": [100, 300], "Architecture College": [150, 450],
};
const withCollegeMeta = (list, offset) => list.map((c, i) => {
    const k = i + offset;
    const type = c.type || SEED_COLLEGE_TYPE[c.id] || "Arts & Science College";
    const [lo, hi] = TYPE_SIZE[type] || [250, 2900];
    return { ...c, type, students: lo + ((k * 137) % (hi - lo)), searches: 15 + ((k * 53) % 485) };
});
const COIMBATORE_COLLEGES = withCollegeMeta(COIMBATORE_RAW, 1000);
const DUP_COLLEGES = withCollegeMeta(DUP_COLLEGES_RAW, 500);
const UNIQUE_COLLEGES = [...withCollegeMeta(UNIQUE_COLLEGES_RAW, 0), ...COIMBATORE_COLLEGES]; // 100 + 200 = 300
/* every student gets the type of college they looked at + the colleges they viewed */
const COLLEGES_BY_TYPE = {};
COIMBATORE_COLLEGES.forEach((c) => { (COLLEGES_BY_TYPE[c.type] = COLLEGES_BY_TYPE[c.type] || []).push(c); });
const withStudentMeta = (list, offset) => list.map((s, i) => {
    const k = i + offset;
    const first = COIMBATORE_COLLEGES[(k * 37 + 11) % COIMBATORE_COLLEGES.length];
    const pool = COLLEGES_BY_TYPE[first.type];
    const n = Math.min(2 + (k % 3), pool.length);
    const at = pool.indexOf(first);
    const viewedColleges = Array.from({ length: n }, (_, j) => pool[(at + j) % pool.length]).map((c) => ({ id: c.id, name: c.name }));
    return { ...s, collegeType: first.type, viewedColleges };
});
const UNIQUE_STUDENTS = withStudentMeta(UNIQUE_STUDENTS_RAW, 0); // 200
const DUP_STUDENTS = withStudentMeta(DUP_STUDENTS_RAW, 300); // 86
const MATCH_TONE = { "Phone + Email": "red", Email: "purple", Phone: "blue", Website: "green", Name: "orange", "No Match": "blue" };
const STATUS_TONE = { "High Priority": "red", "Under Review": "orange", Review: "orange", "Confirmed Duplicate": "green", Unique: "green" };
const TIMELINE = [
    { title: "Previous Record", sub: "STU2025001 - Priya S", time: "Oct 10, 2025 09:15 AM", tone: "blue" },
    { title: "Match Detected", sub: "Phone + Email match", time: "Oct 12, 2025 02:30 PM", tone: "orange" },
    { title: "Latest Update", sub: "Status changed to High Priority", time: "Oct 16, 2025 10:24 AM", tone: "green" },
];
const ACTIVITY = [
    { id: "a1", name: "Priya S", suffix: "(Student)", note: "Last seen: Oct 16, 2025 10:24 AM", active: true },
    { id: "a2", name: "Sri Ramakrishna College", note: "Last updated: Oct 16, 2025 09:42 AM", active: true },
    { id: "a3", name: "Arul College", note: "Last seen: Oct 15, 2025 06:17 PM", active: false },
    { id: "a4", name: "Kumaraguru College", note: "Last updated: Oct 14, 2025 01:18 PM", active: true },
];
/* Full activity list for the Activity Monitoring tab: the 4 originals + every student & college record */
const ACTIVITY_META = { a1: ["student", "Chennai"], a2: ["college", "Coimbatore"], a3: ["college", "Erode"], a4: ["college", "Coimbatore"] };
const ACTIVITY_ALL = (() => {
    const skip = new Set(["STU2025001", "COL2024001", "COL2024015"]); // already covered by the originals
    const seeds = ACTIVITY.map((a) => ({ ...a, kind: ACTIVITY_META[a.id][0], city: ACTIVITY_META[a.id][1] }));
    const recs = [...DUP_STUDENTS, ...DUP_COLLEGES, ...UNIQUE_STUDENTS, ...UNIQUE_COLLEGES].filter((r) => !skip.has(r.id));
    return [
        ...seeds,
        ...recs.map((r, i) => ({
            id: r.id, name: r.name, suffix: r.kind === "student" ? "(Student)" : "(College)", kind: r.kind, city: r.city,
            note: `Last seen: ${r.date} ${r.time}`, active: i % 6 !== 5,
        })),
    ];
})();
const SEARCH_EXAMPLES = ["STU2025001", "Kumaraguru", "Sri Vidya", "Erode", "98765"];
/* ───────────────────────── HOOKS ───────────────────────── */
function useCountUp(target, duration = 900) {
    const [val, setVal] = useState(0);
    const from = useRef(0); // animate from the previous number, not from 0 every time
    useEffect(() => {
        let raf;
        const start = performance.now();
        const begin = from.current;
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const v = Math.round(begin + (target - begin) * (1 - Math.pow(1 - p, 3)));
            from.current = v;
            setVal(v);
            if (p < 1)
                raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);
    return val;
}
/* ───────────────────────── SMALL COMPONENTS ───────────────────────── */
const Badge = ({ tone, children }) => <span className={`dm-badge dm-badge--${tone}`}>{children}</span>;
function Switch({ checked, onChange, label }) {
    return (<button type="button" role="switch" aria-checked={checked} aria-label={label} className={`dm-switch ${checked ? "is-on" : ""}`} onClick={onChange}>
      <span />
    </button>);
}
function Sidebar({ open, onClose, active }) {
    const navigate = useNavigate();
    return (<>
      <div className={`dm-overlay ${open ? "is-open" : ""}`} onClick={onClose}/>
      <aside className={`dm-sidebar ${open ? "is-open" : ""}`}>
        <div className="dm-brand">
          <div className="dm-brand__logo">🎓</div>
          <div>
            <div className="dm-brand__name">Student<span>College</span></div>
            <div className="dm-brand__sub">Admission Platform</div>
          </div>
        </div>

        <p className="dm-menu-title">MAIN MENU</p>
        <nav className="dm-nav">
          {NAV.map((item, i) => (<button key={item.label} className={`dm-nav__item ${active === item.label ? "is-active" : ""}`} style={{ "--i": i }} onClick={() => { navigate(item.path); onClose(); }}>
              <span className="dm-nav__icon">{item.icon}</span>
              {item.label}
            </button>))}
        </nav>

        <div className="dm-sidebar__foot">
          <div className="dm-user">
            <div className="dm-user__avatar">A</div>
            <div>
              <div className="dm-user__name">Admin</div>
              <div className="dm-user__role">Super Admin</div>
            </div>
          </div>
          <button className="dm-logout" onClick={handleAdminLogout}>↪ <span>Logout</span></button>
        </div>
      </aside>
    </>);
}
function StatCard({ stat, index }) {
    const value = useCountUp(stat.value);
    const down = stat.trend < 0;
    return (<div className={`dm-stat dm-stat--${stat.tone}`} style={{ "--i": index }}>
      <div className="dm-stat__icon">{stat.icon}</div>
      <div>
        <div className="dm-stat__label">{stat.label}</div>
        <div className="dm-stat__value">{value.toLocaleString("en-IN")}</div>
        <div className={`dm-stat__trend ${down ? "is-down" : "is-up"}`}>
          {down ? "↓" : "↑"} {Math.abs(stat.trend)}% from last month
        </div>
      </div>
    </div>);
}
/* ── Generic responsive table (becomes cards on mobile) ── */
function DataTable({ columns, rows, pageSize, resetKey, onView, onMenu, empty }) {
    const [page, setPage] = useState(1);
    const pages = pageSize ? Math.max(1, Math.ceil(rows.length / pageSize)) : 1;
    useEffect(() => { setPage(1); }, [resetKey]);
    useEffect(() => {
        if (page > pages)
            setPage(pages);
    }, [pages, page]);
    const view = pageSize ? rows.slice((page - 1) * pageSize, page * pageSize) : rows;
    const start = Math.max(1, Math.min(page - 2, pages - 4));
    const nums = [];
    for (let p = start; p <= Math.min(pages, start + 4); p++)
        nums.push(p);
    return (<>
      <div className="dm-table-wrap">
        <table className="dm-table">
          <thead>
            <tr>
              {columns.map((c) => <th key={c.label}>{c.label}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {view.length === 0 && (<tr className="dm-empty-row"><td colSpan={columns.length + 1}>{empty || "No records found"}</td></tr>)}
            {view.map((r, i) => (<tr key={r.id} style={{ "--i": i }}>
                {columns.map((c) => <td key={c.label} data-label={c.label}>{c.render(r)}</td>)}
                <td data-label="Actions">
                  <div className="dm-actions">
                    <button className="dm-btn dm-btn--ghost" onClick={() => onView(r)}>👁 View</button>
                    <button className="dm-more" aria-label={`More actions for ${r.name}`} onClick={(e) => onMenu(r, e.currentTarget)}>⋮</button>
                  </div>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>

      {pageSize && rows.length > pageSize && (<div className="dm-pager">
          <span className="dm-pager__info">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, rows.length)} of {rows.length}
          </span>
          <div className="dm-pager__btns">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Previous page">‹</button>
            {nums.map((p) => (<button key={p} className={p === page ? "is-active" : ""} onClick={() => setPage(p)}>{p}</button>))}
            <button disabled={page === pages} onClick={() => setPage(page + 1)} aria-label="Next page">›</button>
          </div>
        </div>)}
    </>);
}
const personCell = (r) => (<div className="dm-person">
    {r.kind === "student"
        ? <span className="dm-person__avatar" style={{ background: r.color }}>{r.name[0]}</span>
        : <span className="dm-person__avatar dm-person__avatar--college">🏛</span>}
    <div><strong>{r.name}</strong><small>{r.id}</small></div>
  </div>);
const activityCell = (r) => <>{r.date}<small>{r.time}</small></>;
const matchCell = (r) => <Badge tone={MATCH_TONE[r.match] || "blue"}>{r.match}</Badge>;
const statusCell = (r) => <Badge tone={STATUS_TONE[r.status] || "blue"}>{r.status}</Badge>;
const COLS = {
    dupStudents: [
        { label: "Student Name / ID", render: personCell },
        { label: "Phone", render: (r) => r.phone },
        { label: "Email", render: (r) => <span className="dm-link">{r.email}</span> },
        { label: "Aadhaar (Masked)", render: (r) => r.aadhaar },
        { label: "District", render: (r) => r.city },
        { label: "Duplicate Match", render: matchCell },
        { label: "Record Status", render: statusCell },
        { label: "Last Activity", render: activityCell },
    ],
    dupColleges: [
        { label: "College Name / ID", render: personCell },
        { label: "College Type", render: (r) => <Badge tone="purple">{r.type}</Badge> },
        { label: "Registration ID", render: (r) => r.reg },
        { label: "Phone", render: (r) => r.phone },
        { label: "Email", render: (r) => <span className="dm-link">{r.email}</span> },
        { label: "Website", render: (r) => <span className="dm-link">{r.site}</span> },
        { label: "District", render: (r) => r.city },
        { label: "Duplicate Match", render: matchCell },
        { label: "Record Status", render: statusCell },
        { label: "Last Activity", render: activityCell },
    ],
    uniqStudents: [
        { label: "Student Name / ID", render: personCell },
        { label: "Phone", render: (r) => r.phone },
        { label: "Email", render: (r) => <span className="dm-link">{r.email}</span> },
        { label: "Aadhaar (Masked)", render: (r) => r.aadhaar },
        { label: "District", render: (r) => r.city },
        { label: "Record Status", render: statusCell },
        { label: "Added On", render: activityCell },
    ],
    uniqColleges: [
        { label: "College Name / ID", render: personCell },
        { label: "College Type", render: (r) => <Badge tone="purple">{r.type}</Badge> },
        { label: "Registration ID", render: (r) => r.reg },
        { label: "Phone", render: (r) => r.phone },
        { label: "Email", render: (r) => <span className="dm-link">{r.email}</span> },
        { label: "Website", render: (r) => <span className="dm-link">{r.site}</span> },
        { label: "District", render: (r) => r.city },
        { label: "Record Status", render: statusCell },
        { label: "Added On", render: activityCell },
    ],
};
const PREVIEW = 5;
/* Card with a table: optional "View All" expand, filter box, district filter, pagination */
function RecordsPanel({ title, noun, columns, rows, onView, onMenu, headRight, collapsible }) {
    const [expanded, setExpanded] = useState(!collapsible);
    const [q, setQ] = useState("");
    const [district, setDistrict] = useState("All");
    const [ctype, setCtype] = useState("All");
    const isCollege = rows[0]?.kind === "college";
    const typeOptions = useMemo(() => (isCollege ? [...new Set(rows.map((r) => r.type).filter(Boolean))].sort() : []), [rows, isCollege]);
    const filtered = useMemo(() => {
        const t = q.trim().toLowerCase();
        return rows.filter((r) => (district === "All" || r.city === district) &&
            (ctype === "All" || r.type === ctype) &&
            (!t || [r.name, r.id, r.phone, r.email, r.reg, r.site, r.type].filter(Boolean).join(" ").toLowerCase().includes(t)));
    }, [rows, q, district, ctype]);
    const shown = expanded ? filtered : rows.slice(0, PREVIEW);
    return (<section className="dm-card">
      <header className="dm-card__head">
        <h2>{title}</h2>
        {headRight}
        {collapsible && (<button className="dm-btn dm-btn--primary" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Show Less ↑" : `View All ${noun} (${rows.length}) →`}
          </button>)}
      </header>

      {expanded && (<div className="dm-toolbar">
          <input className="dm-search dm-search--sm" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Filter ${noun.toLowerCase()} by name, ID, phone, email...`} aria-label={`Filter ${noun}`}/>
          <select className="dm-select" value={district} onChange={(e) => setDistrict(e.target.value)} aria-label="Filter by district">
            <option value="All">All districts</option>
            {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {isCollege && (<select className="dm-select" value={ctype} onChange={(e) => setCtype(e.target.value)} aria-label="Filter by college type">
              <option value="All">All college types</option>
              {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>)}
          <span className="dm-count">{filtered.length} of {rows.length}</span>
        </div>)}

      <DataTable columns={columns} rows={shown} pageSize={expanded ? 10 : undefined} resetKey={`${q}|${district}|${ctype}|${expanded}`} onView={onView} onMenu={onMenu} empty={rows.length === 0 ? `No ${noun.toLowerCase()} 🎉` : "No matching records"}/>

      {!expanded && rows.length > PREVIEW && (<p className="dm-previewnote">
          Showing {PREVIEW} of {rows.length} {noun.toLowerCase()} ·{" "}
          <button onClick={() => setExpanded(true)}>View all {rows.length}</button>
        </p>)}
    </section>);
}
function UniqueRecords({ kind, setKind, students, colleges, onView, onMenu }) {
    const seg = (<div className="dm-seg" role="tablist">
      <button role="tab" aria-selected={kind === "student"} className={kind === "student" ? "is-active" : ""} onClick={() => setKind("student")}>👥 Students ({students.length})</button>
      <button role="tab" aria-selected={kind === "college"} className={kind === "college" ? "is-active" : ""} onClick={() => setKind("college")}>🏛 Colleges ({colleges.length})</button>
    </div>);
    return (<RecordsPanel key={kind} title="🛡 Unique Records" noun={kind === "student" ? "Students" : "Colleges"} columns={kind === "student" ? COLS.uniqStudents : COLS.uniqColleges} rows={kind === "student" ? students : colleges} headRight={seg} onView={onView} onMenu={onMenu}/>);
}
function UniqueCards({ studentCount, collegeCount, onOpen }) {
    const items = [["Unique Students", studentCount, "student"], ["Unique Colleges", collegeCount, "college"]];
    return (<div className="dm-unique-grid">
      {items.map(([label, num, kind], i) => (<div className="dm-unique" key={label} style={{ "--i": i }}>
          <span>{label}</span>
          <strong>{num}</strong>
          <small>No duplicate match</small>
          <button className="dm-btn dm-btn--primary dm-btn--block" onClick={() => onOpen(kind)}>View</button>
        </div>))}
    </div>);
}
function RecentList({ items, onToggle }) {
    return (<ul className="dm-recent">
      {items.map((r, i) => (<li key={r.id} style={{ "--i": i }}>
          <i className={`dm-dot dm-dot--${r.active ? "green" : "red"}`}/>
          <div>
            <strong>{r.name} {r.suffix}</strong>
            <small>{r.note}</small>
          </div>
          <span className="dm-recent__ctl">
            <Badge tone={r.active ? "green" : "red"}>{r.active ? "Active" : "Inactive"}</Badge>
            <Switch checked={r.active} onChange={() => onToggle(r.id)} label={`Toggle ${r.name} active or inactive`}/>
          </span>
        </li>))}
    </ul>);
}
function Pager({ page, pages, total, pageSize, onPage }) {
    const start = Math.max(1, Math.min(page - 2, pages - 4));
    const nums = [];
    for (let p = start; p <= Math.min(pages, start + 4); p++)
        nums.push(p);
    return (<div className="dm-pager">
      <span className="dm-pager__info">Showing {total === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}</span>
      <div className="dm-pager__btns">
        <button disabled={page === 1} onClick={() => onPage(page - 1)} aria-label="Previous page">‹</button>
        {nums.map((p) => <button key={p} className={p === page ? "is-active" : ""} onClick={() => onPage(p)}>{p}</button>)}
        <button disabled={page === pages} onClick={() => onPage(page + 1)} aria-label="Next page">›</button>
      </div>
    </div>);
}
/* Activity Monitoring tab: summary boxes + searchable, filterable, paged list of every record */
const ACT_PAGE = 10;
function ActivityPanel({ items, onToggle, counts }) {
    const [q, setQ] = useState("");
    const [state, setState] = useState("all");
    const [kind, setKind] = useState("all");
    const [page, setPage] = useState(1);
    const filtered = useMemo(() => {
        const t = q.trim().toLowerCase();
        return items.filter((a) => (state === "all" || (state === "active") === a.active) &&
            (kind === "all" || a.kind === kind) &&
            (!t || `${a.name} ${a.id} ${a.city}`.toLowerCase().includes(t)));
    }, [items, q, state, kind]);
    const pages = Math.max(1, Math.ceil(filtered.length / ACT_PAGE));
    useEffect(() => { setPage(1); }, [q, state, kind]);
    useEffect(() => {
        if (page > pages)
            setPage(pages);
    }, [pages, page]);
    const view = filtered.slice((page - 1) * ACT_PAGE, page * ACT_PAGE);
    return (<section className="dm-card dm-card--pad">
      <h2>📊 Activity Monitoring</h2>
      <p className="dm-help">Use the switch to mark a record Active or Inactive.</p>

      <div className="dm-mini dm-mini--lg">
        <div className="dm-mini__box dm-mini__box--green"><small>Active</small><b>{counts.active.toLocaleString("en-IN")}</b></div>
        <div className="dm-mini__box dm-mini__box--orange"><small>Inactive</small><b>{counts.inactive.toLocaleString("en-IN")}</b></div>
        <div className="dm-mini__box dm-mini__box--purple"><small>Pending Review</small><b>{counts.pending}</b></div>
      </div>

      <div className="dm-toolbar">
        <input className="dm-search dm-search--sm" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name, ID or district..." aria-label="Filter activity"/>
        <select className="dm-select" value={state} onChange={(e) => setState(e.target.value)} aria-label="Filter by status">
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select className="dm-select" value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Filter by record type">
          <option value="all">Students &amp; Colleges</option>
          <option value="student">Students</option>
          <option value="college">Colleges</option>
        </select>
        <span className="dm-count">{filtered.length} of {items.length}</span>
      </div>

      {view.length === 0 ? <p className="dm-empty dm-empty--soft">No matching activity.</p> : <RecentList items={view} onToggle={onToggle}/>}
      {filtered.length > ACT_PAGE && <Pager page={page} pages={pages} total={filtered.length} pageSize={ACT_PAGE} onPage={setPage}/>}
    </section>);
}
function DetailModal({ rec, onClose, onCopy, onOpen }) {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    const isStudent = rec.kind === "student";
    const fields = [
        ["Phone", rec.phone],
        ["Email", rec.email],
        ...(isStudent ? [["Aadhaar (Masked)", rec.aadhaar]] : [["Registration ID", rec.reg], ["Website", rec.site]]),
        ["City", rec.city],
        ["Duplicate Match", rec.group === "duplicate" ? rec.match : "No duplicate match"],
        ["Previous Status", rec.prevStatus],
        ["Record Created", rec.created],
        ["Last Modified", rec.modified],
    ];
    return (<div className="dm-modal-bg" onClick={onClose}>
      <div className="dm-modal" role="dialog" aria-modal="true" aria-label={`${rec.name} details`} onClick={(e) => e.stopPropagation()}>
        <div className="dm-modal__head">
          {personCell(rec)}
          <button className="dm-modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="dm-modal__badges">
          <Badge tone={rec.group === "duplicate" ? "red" : "green"}>{rec.group === "duplicate" ? "Duplicate" : "Unique"}</Badge>
          {statusCell(rec)}
          <Badge tone="blue">{isStudent ? "Student" : "College"}</Badge>
          {!isStudent && <Badge tone="purple">{rec.type}</Badge>}
        </div>

        {!isStudent && (<div className="dm-modal__stats">
            <div><small>🎓 Total Students</small><b>{rec.students.toLocaleString("en-IN")}</b></div>
            <div><small>🔍 Searched By</small><b>{rec.searches.toLocaleString("en-IN")} people</b></div>
          </div>)}

        <dl className="dm-modal__grid">
          {fields.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>

        {isStudent && (<div className="dm-modal__sec">
            <h4>🎓 College Interest</h4>
            <p className="dm-modal__lead">Looked for: <Badge tone="purple">{rec.collegeType}</Badge></p>
            <p className="dm-modal__lead">Colleges viewed ({rec.viewedColleges.length}):</p>
            <ul className="dm-viewed">
              {rec.viewedColleges.map((c) => (<li key={c.id}>
                  <button onClick={() => onOpen(c.id)}>
                    <span className="dm-person__avatar dm-person__avatar--college">🏛</span>
                    <span className="dm-results__txt"><strong>{c.name}</strong><small>{c.id}</small></span>
                    <span aria-hidden="true">→</span>
                  </button>
                </li>))}
            </ul>
          </div>)}

        <div className="dm-modal__foot">
          <button className="dm-btn dm-btn--outline" onClick={() => onCopy(rec.id)}>📋 Copy ID</button>
          <button className="dm-btn dm-btn--primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>);
}
/* ───────────────────────── SMART ALERTS ───────────────────────── */
const buildAlerts = (dupStudents, dupColleges) => {
    const all = [...dupStudents, ...dupColleges];
    const has = (r, word) => r.match.includes(word);
    const defs = [
        { id: "new", tone: "red", icon: "!", title: "New Duplicate Detected", noun: "new duplicate record", tail: "found", list: all.filter((r) => r.prevStatus === "New") },
        { id: "priority", tone: "orange", icon: "⏱", title: "High Priority Pending", noun: "high priority record", tail: "waiting for review", list: all.filter((r) => r.status === "High Priority") },
        { id: "phone", tone: "blue", icon: "📞", title: "Phone Match Alert", noun: "record", tail: "with repeated phone numbers", list: all.filter((r) => has(r, "Phone")) },
        { id: "email", tone: "purple", icon: "✉", title: "Email Match Alert", noun: "record", tail: "with repeated email addresses", list: all.filter((r) => has(r, "Email")) },
    ];
    return defs.map((d) => ({
        ...d,
        count: d.list.length,
        pct: all.length ? Math.round((d.list.length / all.length) * 100) : 0,
        text: `${d.list.length} ${d.noun}${d.list.length === 1 ? "" : "s"} ${d.tail}`,
        time: d.list.length ? `${d.list[0].date} ${d.list[0].time}` : "No records",
    }));
};
function SmartAlerts({ alerts, onView, onViewAll }) {
    return (<section className="dm-card dm-card--pad dm-alerts" aria-label="Smart Alerts">
      <div className="dm-alerts__head">
        <div className="dm-alerts__title">
          <span className="dm-alerts__bell" aria-hidden="true">🔔</span>
          <div>
            <h2>Smart Alerts</h2>
            <p>Stay informed about important updates and potential duplicate records.</p>
          </div>
        </div>
        <button className="dm-btn dm-btn--ghost dm-alerts__all" onClick={onViewAll}>View All Alerts</button>
      </div>
      <div className="dm-alerts__grid">
        {alerts.map((a) => (<article key={a.id} className={`dm-alert dm-alert--${a.tone}`}>
            <span className="dm-alert__icon" aria-hidden="true">{a.icon}</span>
            <div className="dm-alert__body">
              <strong>{a.title}</strong>
              <p>{a.text}</p>
              <small>🕑 {a.time}</small>
              <div className="dm-alert__foot">
                <span className="dm-alert__bar" aria-hidden="true"><i style={{ width: `${Math.max(a.pct, 4)}%` }}/></span>
                <button className="dm-alert__view" onClick={() => onView(a.id)} aria-label={`View ${a.title}`}>View</button>
              </div>
            </div>
          </article>))}
      </div>
    </section>);
}
function ConfirmModal({ rec, status, onCancel, onConfirm }) {
    const isUnique = status === "Unique";
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onCancel();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onCancel]);
    return (<div className="dm-modal-bg" onClick={onCancel}>
      <div className="dm-modal dm-confirm" role="alertdialog" aria-modal="true" aria-label={isUnique ? "Mark as unique" : "Confirm duplicate"} onClick={(e) => e.stopPropagation()}>
        <div className="dm-confirm__body">
          <span className="dm-confirm__icon" aria-hidden="true">{isUnique ? "🛡" : "✅"}</span>
          <h3>{isUnique ? "Mark as Unique?" : "Confirm this duplicate?"}</h3>
          <p>{isUnique
            ? <>Are you sure this {rec.kind} is not a duplicate and should be marked as <b>Unique</b>?</>
            : <>Are you sure you want to mark this {rec.kind} as a <b>Confirmed Duplicate</b>?</>}</p>
          <div className="dm-confirm__rec">
            {personCell(rec)}
            {statusCell(rec)}
          </div>
        </div>
        <div className="dm-confirm__foot">
          <button className="dm-btn dm-btn--outline" onClick={onCancel}>Cancel</button>
          <button className="dm-btn dm-btn--primary" onClick={onConfirm} autoFocus>{isUnique ? "Yes, Mark Unique" : "Yes, Confirm"}</button>
        </div>
      </div>
    </div>);
}
function AlertModal({ view, alerts, onClose, onPick, onOpenRecord }) {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    const alert = view === "all" ? null : alerts.find((a) => a.id === view);
    return (<div className="dm-modal-bg" onClick={onClose}>
      <div className="dm-modal dm-alertmodal" role="dialog" aria-modal="true" aria-label={alert ? alert.title : "All alerts"} onClick={(e) => e.stopPropagation()}>
        <div className="dm-modal__head">
          <div className="dm-alertmodal__title">
            <span className={`dm-alert__icon dm-alert__icon--${alert ? alert.tone : "blue"}`} aria-hidden="true">{alert ? alert.icon : "🔔"}</span>
            <div>
              <strong>{alert ? alert.title : "All Alerts"}</strong>
              <small>{alert ? alert.text : `${alerts.length} alerts need your attention`}</small>
            </div>
          </div>
          <button className="dm-modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="dm-alertmodal__body">
          {!alert && (<ul className="dm-results">
              {alerts.map((a) => (<li key={a.id}>
                  <button onClick={() => onPick(a.id)}>
                    <span className={`dm-alert__icon dm-alert__icon--${a.tone}`} aria-hidden="true">{a.icon}</span>
                    <span className="dm-results__txt"><strong>{a.title}</strong><small>{a.text}</small></span>
                    <Badge tone={a.tone}>{a.count}</Badge>
                  </button>
                </li>))}
            </ul>)}

          {alert && (alert.list.length === 0
            ? <p className="dm-empty dm-empty--soft">No records in this alert right now.</p>
            : (<ul className="dm-results">
                {alert.list.map((r) => (<li key={r.id}>
                    <button onClick={() => onOpenRecord(r)}>
                      <span className={`dm-person__avatar ${r.kind === "college" ? "dm-person__avatar--college" : ""}`} style={r.kind === "student" ? { background: r.color } : undefined}>
                        {r.kind === "student" ? r.name[0] : "🏛"}
                      </span>
                      <span className="dm-results__txt"><strong>{r.name}</strong><small>{r.id} · {r.city} · {r.match}</small></span>
                      {statusCell(r)}
                    </button>
                  </li>))}
              </ul>))}
        </div>

        <div className="dm-modal__foot">
          {alert && <button className="dm-btn dm-btn--outline" onClick={() => onPick("all")}>← All Alerts</button>}
          <button className="dm-btn dm-btn--primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>);
}
/* ───────────────────────── PAGE ───────────────────────── */
export default function DuplicateManagement() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [tab, setTab] = useState("students");
    const [uniqueKind, setUniqueKind] = useState("student");
    const [dupStudents, setDupStudents] = useState(DUP_STUDENTS);
    const [dupColleges, setDupColleges] = useState(DUP_COLLEGES);
    const [uniqStudents, setUniqStudents] = useState(UNIQUE_STUDENTS);
    const [uniqColleges, setUniqColleges] = useState(UNIQUE_COLLEGES);
    const [activity, setActivity] = useState(ACTIVITY_ALL);
    const [history, setHistory] = useState(TIMELINE);
    // right-hand "Record Lookup" search
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [selectedId, setSelectedId] = useState("STU2025001");
    // top-bar search
    const [topQuery, setTopQuery] = useState("");
    const [topOpen, setTopOpen] = useState(false);
    const [modalId, setModalId] = useState(null);
    const [alertView, setAlertView] = useState(null);
    const [confirmRec, setConfirmRec] = useState(null);
    const [menu, setMenu] = useState(null);
    const [toast, setToast] = useState("");
    const toastTimer = useRef(null);
    const lookupRef = useRef(null);
    const panelRef = useRef(null);
    const topRef = useRef(null);
    const profileRef = useRef(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const allRecords = useMemo(() => [...dupStudents, ...dupColleges, ...uniqStudents, ...uniqColleges], [dupStudents, dupColleges, uniqStudents, uniqColleges]);
    const alerts = useMemo(() => buildAlerts(dupStudents, dupColleges), [dupStudents, dupColleges]);
    const selected = selectedId ? allRecords.find((r) => r.id === selectedId) || null : null;
    const modalRec = modalId ? allRecords.find((r) => r.id === modalId) : null;
    // card numbers always match the real lists
    const counts = {
        "Total Students": dupStudents.length + uniqStudents.length,
        "Total Colleges": dupColleges.length + uniqColleges.length,
        "Duplicate Students": dupStudents.length,
        "Duplicate Colleges": dupColleges.length,
        "Unique Students": uniqStudents.length,
        "Unique Colleges": uniqColleges.length,
    };
    const stats = STATS.map((s) => ({ ...s, value: counts[s.label] }));
    // lock body scroll while drawer / modal is open
    useEffect(() => {
        document.body.style.overflow = menuOpen || modalId || alertView || confirmRec ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen, modalId, alertView, confirmRec]);
    // close top-bar suggestions when clicking elsewhere
    useEffect(() => {
        const h = (e) => {
            if (topRef.current && !topRef.current.contains(e.target))
                setTopOpen(false);
            if (profileRef.current && !profileRef.current.contains(e.target))
                setProfileOpen(false);
        };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);
    const showToast = useCallback((msg) => {
        setToast(msg);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(""), 2400);
    }, []);
    useEffect(() => () => clearTimeout(toastTimer.current), []);
    const closeMenu = useCallback(() => setMenu(null), []);
    /* ── record helpers ── */
    const setters = {
        "student:duplicate": setDupStudents, "college:duplicate": setDupColleges,
        "student:unique": setUniqStudents, "college:unique": setUniqColleges,
    };
    const setterFor = (rec) => setters[`${rec.kind}:${rec.group}`];
    const changeStatus = (rec, status) => {
        setterFor(rec)((list) => list.map((x) => (x.id === rec.id ? { ...x, status, prevStatus: x.status, modified: fmtStamp(new Date()) } : x)));
        setSelectedId(rec.id);
        showToast(`${rec.name} → ${status}`);
    };
    const removeRecord = (rec) => {
        setterFor(rec)((list) => list.filter((x) => x.id !== rec.id));
        showToast(`${rec.name} removed from duplicates`);
    };
    const copyId = (id) => {
        try {
            navigator.clipboard.writeText(id);
        }
        catch (e) { /* ignore */ }
        showToast(`Copied ${id}`);
    };
    const openView = (rec) => { setSelectedId(rec.id); setModalId(rec.id); };
    const openMenu = (rec, el) => {
        const r = el.getBoundingClientRect();
        const w = 214;
        const h = rec.group === "duplicate" ? 262 : rec.status === "Under Review" ? 196 : 150;
        const left = Math.min(Math.max(8, r.right - w), window.innerWidth - w - 8);
        let top = r.bottom + 6;
        if (top + h > window.innerHeight - 8)
            top = Math.max(8, r.top - h - 6);
        setMenu({ rec, top, left });
    };
    const menuItems = (rec) => {
        const base = [{ icon: "👁", label: "View details", run: () => openView(rec) }];
        const copy = { icon: "📋", label: "Copy ID", run: () => copyId(rec.id) };
        if (rec.group === "unique") {
            return [
                ...base,
                ...(rec.status === "Under Review" ? [{ icon: "🛡", label: "Mark as Unique", run: () => setConfirmRec({ rec, status: "Unique" }) }] : []),
                { icon: "🚩", label: "Flag for review", run: () => changeStatus(rec, "Under Review") },
                copy,
            ];
        }
        return [
            ...base,
            { icon: "🔥", label: "Mark High Priority", run: () => changeStatus(rec, "High Priority") },
            { icon: "🕑", label: "Mark Under Review", run: () => changeStatus(rec, "Under Review") },
            { icon: "✅", label: "Confirm Duplicate", run: () => setConfirmRec({ rec, status: "Confirmed Duplicate" }) },
            copy,
            { icon: "🚫", label: "Not a duplicate", danger: true, run: () => removeRecord(rec) },
        ];
    };
    /* ── search (used by both the top bar and the Record Lookup panel) ── */
    const findRecords = (term) => {
        const t = term.trim();
        if (!t)
            return [];
        const low = t.toLowerCase();
        const phoneLike = /^[+\d\s-]+$/.test(t);
        const digits = t.replace(/\D/g, "");
        const score = (r) => (r.id.toLowerCase() === low ? 3 : r.name.toLowerCase().startsWith(low) ? 2 : 0);
        return allRecords
            .filter((r) => {
            const text = [r.name, r.id, r.email, r.reg, r.site, r.city, r.type, r.collegeType].filter(Boolean).join(" ").toLowerCase();
            if (text.includes(low))
                return true;
            return phoneLike && digits.length >= 3 && r.phone.replace(/\D/g, "").includes(digits);
        })
            .sort((a, b) => score(b) - score(a));
    };
    const runSearch = (value = query, scroll = false) => {
        const t = value.trim();
        if (!t) {
            setResults(null);
            showToast("Type an ID, phone, email or name first");
            return;
        }
        const list = findRecords(t);
        setResults({ term: t, list });
        if (list.length)
            setSelectedId(list[0].id);
        setHistory((h) => [{ title: "Searched", sub: `"${t}" · ${list.length} result${list.length === 1 ? "" : "s"}`, time: fmtStamp(new Date()), tone: list.length ? "green" : "orange" }, ...h].slice(0, 12));
        if (scroll)
            lookupRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // Clear: wipes the typed text, results, recent match / details and the search history
    const clearSearch = () => {
        setQuery("");
        setTopQuery("");
        setTopOpen(false);
        setResults(null);
        setSelectedId(null);
        setHistory([]);
        showToast("Search cleared");
    };
    const applyExample = (ex) => { setQuery(ex); runSearch(ex); };
    const topList = topOpen && topQuery.trim() ? findRecords(topQuery) : [];
    const submitTop = () => {
        const t = topQuery.trim();
        if (!t) {
            showToast("Type a college or student name to search");
            return;
        }
        if (findRecords(t).length === 0) {
            setTopOpen(true);
            return;
        } // message stays visible in the dropdown
        setQuery(t);
        runSearch(t, true);
        setTopOpen(false);
    };
    const openUnique = (kind) => {
        setUniqueKind(kind);
        setTab("unique");
        setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    };
    /* ── activity ── */
    const toggleActivity = (id) => {
        const item = activity.find((a) => a.id === id);
        setActivity((list) => list.map((a) => (a.id === id ? { ...a, active: !a.active, note: `Status changed: ${fmtStamp(new Date())}` } : a)));
        showToast(`${item.name} is now ${item.active ? "Inactive" : "Active"}`);
    };
    const activeCount = activity.filter((a) => a.active).length;
    const inactiveCount = activity.length - activeCount;
    const pendingCount = dupStudents.filter((r) => r.status === "Under Review").length + dupColleges.filter((r) => r.status === "Under Review").length;
    const timeline = selected
        ? [
            { title: "Previous Record", sub: `${selected.id} - ${selected.name}`, time: selected.created, tone: "blue" },
            { title: "Match Detected", sub: selected.group === "duplicate" ? `${selected.match} match` : "No duplicate match", time: selected.matched, tone: "orange" },
            { title: "Latest Update", sub: `Status changed to ${selected.status}`, time: selected.modified, tone: "green" },
        ]
        : [];
    const renderTab = () => {
        if (tab === "students") {
            return <RecordsPanel title="👥 Duplicate Students" noun="Students" columns={COLS.dupStudents} rows={dupStudents} collapsible onView={openView} onMenu={openMenu}/>;
        }
        if (tab === "colleges") {
            return <RecordsPanel title="🏛 Duplicate Colleges" noun="Colleges" columns={COLS.dupColleges} rows={dupColleges} collapsible onView={openView} onMenu={openMenu}/>;
        }
        if (tab === "unique") {
            return <UniqueRecords kind={uniqueKind} setKind={setUniqueKind} students={uniqStudents} colleges={uniqColleges} onView={openView} onMenu={openMenu}/>;
        }
        if (tab === "history") {
            return (<section className="dm-card dm-card--pad">
          <h2>🕘 Search History</h2>
          {history.length === 0 ? (<p className="dm-empty dm-empty--soft">No searches yet. Records you search in “Record Lookup” will show up here.</p>) : (<ul className="dm-timeline">
              {history.map((t, i) => (<li key={`${t.title}-${t.time}-${i}`} style={{ "--i": i }}>
                  <i className={`dm-dot dm-dot--${t.tone}`}/>
                  <div><strong>{t.title}</strong><small>{t.sub}</small></div>
                  <time>{t.time}</time>
                </li>))}
            </ul>)}
        </section>);
        }
        return <ActivityPanel items={activity} onToggle={toggleActivity} counts={{ active: activeCount, inactive: inactiveCount, pending: pendingCount }}/>;
    };
    return (<div className="dm-app">
      <style>{CSS}</style>

      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active="Applications"/>

      <div className="dm-main">
        {/* Top bar */}
        <header className="dm-topbar">
          <button className="dm-burger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>☰</button>

          <div className="dm-topsearch" ref={topRef}>
            <input className="dm-search" placeholder="Search students, colleges, leads..." aria-label="Search colleges and students" value={topQuery} onChange={(e) => { setTopQuery(e.target.value); setTopOpen(true); }} onFocus={() => setTopOpen(true)} onKeyDown={(e) => {
            if (e.key === "Enter")
                submitTop();
            if (e.key === "Escape")
                setTopOpen(false);
        }}/>
            {topOpen && topQuery.trim() && (<div className="dm-suggest" role="listbox">
                {topList.length === 0 ? (<div className="dm-suggest__empty">
                    <span>⚠️</span>
                    <div>
                      <strong>No college or student found for “{topQuery.trim()}”.</strong>
                      <small>Type a valid college / student name, ID, phone or email.</small>
                    </div>
                  </div>) : (<>
                    {topList.slice(0, 6).map((r) => (<button key={r.id} role="option" className="dm-suggest__item" onClick={() => { openView(r); setTopOpen(false); }}>
                        <span className={`dm-person__avatar ${r.kind === "college" ? "dm-person__avatar--college" : ""}`} style={r.kind === "student" ? { background: r.color } : undefined}>
                          {r.kind === "student" ? r.name[0] : "🏛"}
                        </span>
                        <span className="dm-results__txt"><strong>{r.name}</strong><small>{r.id} · {r.city}</small></span>
                        <Badge tone={r.group === "duplicate" ? "red" : "green"}>{r.group === "duplicate" ? "Duplicate" : "Unique"}</Badge>
                      </button>))}
                    <button className="dm-suggest__all" onClick={submitTop}>
                      See all {topList.length} result{topList.length === 1 ? "" : "s"} in Record Lookup →
                    </button>
                  </>)}
              </div>)}
          </div>

          <button className="dm-bell" aria-label="Notifications">
            <svg className="dm-bell__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 3.5L18.5 10L12 16.5L5.5 10L12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle className="dm-bell__dot" cx="19.5" cy="4.5" r="3"/>
            </svg>
          </button>
          <div className="dm-profile-wrap" ref={profileRef}>
            <button type="button" className="dm-profile" aria-label="Admin account menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((o) => !o)}>
              <span className="dm-profile__icon">A</span>
              <span className="dm-profile__copy"><strong>Admin</strong><small>Super Admin</small></span>
              <span className="dm-profile__chev">⌄</span>
            </button>
            {profileOpen && (<div className="dm-profile__menu">
                <button type="button" onClick={handleAdminLogout}>↪ &nbsp; Logout</button>
              </div>)}
          </div>
        </header>

        <div className="dm-content">
          <div className="dm-left">
            <div className="dm-title">
              <div className="dm-title__icon">✉</div>
              <div>
                <h1>Applications</h1>
                <p>Manage student applications, review records, and monitor application activity.</p>
              </div>
            </div>

            <div className="dm-stats">
              {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i}/>)}
            </div>

            <div className="dm-tabs" role="tablist">
              {TABS.map((t) => (<button key={t.id} role="tab" aria-selected={tab === t.id} className={`dm-tab ${tab === t.id ? "is-active" : ""}`} onClick={() => setTab(t.id)}>
                  <span>{t.icon}</span> {t.label}
                </button>))}
            </div>

            <div className="dm-panel" key={tab} ref={panelRef}>{renderTab()}</div>

            <p className="dm-note">ⓘ Note: Aadhaar numbers are masked for security. Name-only matches require manual review by admin. Data covers Coimbatore, Erode, Tiruppur and Chennai districts.</p>

            <SmartAlerts alerts={alerts} onView={setAlertView} onViewAll={() => setAlertView("all")}/>
          </div>

          {/* Right column */}
          <aside className="dm-right">
            <section className="dm-card dm-card--pad" style={{ "--i": 0 }} ref={lookupRef}>
              <h3>🔍 Record Lookup &amp; History</h3>
              <input className="dm-search dm-search--sm" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch()} placeholder="Search student/college ID, phone, email..." aria-label="Search records"/>

              <div className="dm-hint">
                <b>How to search:</b> type a <b>Student ID</b> (STU2025001), <b>College ID</b> (COL2024008),
                <b> Reg ID</b> (REG23456), <b>phone number</b>, <b>email</b>, <b>name</b> or <b>district</b>, then press
                <b> Search</b> or <kbd>Enter</kbd>.
              </div>

              <div className="dm-row-btns">
                <button className="dm-btn dm-btn--search" onClick={() => runSearch()}>🔍 Search</button>
                <button className="dm-btn dm-btn--clear" onClick={clearSearch}>✕ Clear</button>
              </div>

              {!results && (<div className="dm-chips" aria-label="Search examples">
                  <span>Try:</span>
                  {SEARCH_EXAMPLES.map((ex) => <button key={ex} className="dm-chip" onClick={() => applyExample(ex)}>{ex}</button>)}
                </div>)}

              {results && (<>
                  <h4>Search Results ({results.list.length})</h4>
                  {results.list.length === 0 ? (<p className="dm-empty">No college or student found for “{results.term}”. Type a valid name, ID, phone or email and try again.</p>) : (<ul className="dm-results">
                      {results.list.slice(0, 6).map((r) => (<li key={r.id}>
                          <button onClick={() => openView(r)}>
                            <span className={`dm-person__avatar ${r.kind === "college" ? "dm-person__avatar--college" : ""}`} style={r.kind === "student" ? { background: r.color } : undefined}>
                              {r.kind === "student" ? r.name[0] : "🏛"}
                            </span>
                            <span className="dm-results__txt"><strong>{r.name}</strong><small>{r.id} · {r.city}</small></span>
                            {statusCell(r)}
                          </button>
                        </li>))}
                      {results.list.length > 6 && <li className="dm-results__more">+{results.list.length - 6} more — refine your search</li>}
                    </ul>)}
                </>)}

              <h4>Recent Match Result</h4>
              {selected ? (<ul className="dm-timeline">
                  {timeline.map((t) => (<li key={t.title}>
                      <i className={`dm-dot dm-dot--${t.tone}`}/>
                      <div><strong>{t.title}</strong><small>{t.sub}</small></div>
                      <time>{t.time}</time>
                    </li>))}
                </ul>) : (<p className="dm-empty dm-empty--soft">No recent search. Search a student or college to see its match result.</p>)}

              <h4>Record Details {selected && <span className="dm-sel">· {selected.name}</span>}</h4>
              <dl className="dm-details">
                <dt>Record Created</dt><dd>{selected ? selected.created : "—"}</dd>
                <dt>Last Modified</dt><dd>{selected ? selected.modified : "—"}</dd>
                <dt>Previous Status</dt><dd><b>{selected ? selected.prevStatus : "—"}</b></dd>
                <dt>Current Status</dt><dd className={selected && selected.status === "High Priority" ? "is-red" : ""}><b>{selected ? selected.status : "—"}</b></dd>
              </dl>
            </section>

            <section className="dm-card dm-card--pad" style={{ "--i": 1 }}>
              <h3>📈 Activity Monitoring</h3>
              <div className="dm-mini">
                <div className="dm-mini__box dm-mini__box--green"><small>Active</small><b>{activeCount.toLocaleString("en-IN")}</b></div>
                <div className="dm-mini__box dm-mini__box--orange"><small>Inactive</small><b>{inactiveCount.toLocaleString("en-IN")}</b></div>
                <div className="dm-mini__box dm-mini__box--purple"><small>Pending Review</small><b>{pendingCount}</b></div>
              </div>
              <h4>Recent Activity</h4>
              <RecentList items={activity.slice(0, 4)} onToggle={toggleActivity}/>
            </section>

            <section className="dm-card dm-card--pad" style={{ "--i": 2 }}>
              <h3>🛡 Unique Records</h3>
              <UniqueCards studentCount={uniqStudents.length} collegeCount={uniqColleges.length} onOpen={openUnique}/>
            </section>
          </aside>
        </div>
      </div>

      {/* ⋮ action menu */}
      {menu && (<>
          <div className="dm-menu-bg" onClick={closeMenu}/>
          <ActionMenu menu={menu} items={menuItems(menu.rec)} onClose={closeMenu}/>
        </>)}

      {/* View details modal */}
      {modalRec && <DetailModal rec={modalRec} onClose={() => setModalId(null)} onCopy={copyId} onOpen={(id) => { setSelectedId(id); setModalId(id); }}/>}

      {/* Smart Alerts modal */}
      {alertView && <AlertModal view={alertView} alerts={alerts} onClose={() => setAlertView(null)} onPick={setAlertView} onOpenRecord={(r) => { setAlertView(null); openView(r); }}/>}

      {/* Confirm Duplicate popup */}
      {confirmRec && <ConfirmModal rec={confirmRec.rec} status={confirmRec.status} onCancel={() => setConfirmRec(null)} onConfirm={() => { changeStatus(confirmRec.rec, confirmRec.status); setConfirmRec(null); }}/>}

      {toast && <div className="dm-toast" role="status">{toast}</div>}
    </div>);
}
function ActionMenu({ menu, items, onClose }) {
    useEffect(() => {
        const key = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", key);
        window.addEventListener("resize", onClose);
        window.addEventListener("scroll", onClose, true);
        return () => {
            window.removeEventListener("keydown", key);
            window.removeEventListener("resize", onClose);
            window.removeEventListener("scroll", onClose, true);
        };
    }, [onClose]);
    return (<div className="dm-menu" role="menu" style={{ top: menu.top, left: menu.left }}>
      {items.map((it) => (<button key={it.label} role="menuitem" className={it.danger ? "is-danger" : ""} onClick={() => { onClose(); it.run(); }}>
          <span>{it.icon}</span>{it.label}
        </button>))}
    </div>);
}
/* ───────────────────────── STYLES ───────────────────────── */
const CSS = `
/*── Reset global (Vite index.css / App.css) styles that leak in ──*/
#root {
  max-width: none !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: left !important;
}
body {
  display: block !important;
  min-width: 0 !important;
  margin: 0 !important;
}
.dm-app {
  --navy: #0f2744;
  --navy-2: #162f50;
  --navy-3: #1d3a5f;
  --blue: #2478f0;
  --blue-d: #1a5fd0;
  --bg: #eef3fb;
  --card: #fff;
  --ink: #14213d;
  --muted: #6b7a90;
  --line: #e4eaf3;
  --green: #16a36a;
  --orange: #f08c00;
  --red: #e5384b;
  --purple: #7c4dff;
  --indigo: #3b6ef0;
  --sw: 236px;
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
  background: var(--bg);
  color: var(--ink);
  color-scheme: light;
  text-align: left;
  font-family: "Inter","Segoe UI",system-ui,sans-serif;
  font-size: 14px;
}
.dm-app * {
  box-sizing: border-box;
}
/*:where keeps specificity at 0 so .dm-btn--* colours always win*/
:where(.dm-app) button {
  font: inherit;
  cursor: pointer;
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
}
.dm-app button:disabled {
  cursor: not-allowed;
  opacity: .45;
}
.dm-app small {
  display: block;
  color: var(--muted);
  font-size: 11.5px;
  margin-top: 2px;
}
.dm-app h1,.dm-app h2,.dm-app h3,.dm-app h4 {
  margin: 0;
  color: var(--ink);
}
.dm-app input[type=checkbox] {
  accent-color: var(--blue);
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.dm-app kbd {
  background: #e3eeff;
  border-radius: 4px;
  padding: 1px 6px;
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  color: var(--blue);
}
/*── Sidebar (same size / font / colours as the Courses page sidebar) ──*/
.dm-sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  height: 100vh;
  height: 100dvh;
  width: var(--sw);
  background: #112746;
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  z-index: 50;
  transition: transform .35s cubic-bezier(.4,0,.2,1);
}
.dm-brand {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-shrink: 0;
  height: 82px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.dm-brand__logo {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: rgba(255,255,255,.1);
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
}
.dm-brand__name {
  font-weight: 700;
  color: #fff;
  font-size: 16px;
  line-height: 1.2;
}
.dm-brand__name span {
  color: #58a1ff;
}
.dm-brand__sub {
  font-size: 9px;
  color: #91a5c2;
  margin-top: 3px;
}
.dm-menu-title {
  font-size: 9px;
  letter-spacing: 1px;
  color: #6f86a7;
  font-weight: 700;
  margin: 24px 0 10px;
  text-align: center;
  width: 100%;
}
/*nav scrolls, but its scrollbar is pushed outside the (clipped) sidebar*/
.dm-nav {
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
  -ms-overflow-style: none;
}
.dm-nav::-webkit-scrollbar,.dm-sidebar *::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}
.dm-nav__item {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 43px;
  padding: 0 13px;
  border-radius: 8px;
  text-align: left;
  color: #afbdd1;
  font-size: 12px;
  flex-shrink: 0;
  transition: background .2s,color .2s;
  animation: dm-slide-in .45s both;
  animation-delay: calc(var(--i)*45ms);
}
.dm-nav__icon {
  width: 20px;
  text-align: center;
  font-size: 16px;
}
.dm-nav__item:hover {
  background: rgba(255,255,255,.07);
  color: #fff;
}
.dm-nav__item.is-active {
  background: #2177e8;
  color: #fff;
  box-shadow: 0 6px 18px rgba(33,119,232,.2);
}
.dm-sidebar__foot {
  flex-shrink: 0;
  border-top: 1px solid rgba(255,255,255,.07);
  padding: 14px;
}
.dm-user {
  display: flex;
  gap: 10px;
  align-items: center;
  background: rgba(255,255,255,.055);
  padding: 12px;
  border-radius: 10px;
}
.dm-user__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #28558e;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}
.dm-user__name {
  color: #fff;
  font-weight: 700;
  font-size: 12px;
}
.dm-user__role {
  font-size: 9px;
  color: #8196b5;
  margin-top: 2px;
}
.dm-logout {
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
  transition: background .2s,color .2s;
}
.dm-logout:hover {
  background: rgba(255,255,255,.07);
  color: #fff;
}
.dm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8,18,35,.55);
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s;
  z-index: 40;
}
.dm-overlay.is-open {
  opacity: 1;
  pointer-events: auto;
}
/*── Main layout ──*/
.dm-main {
  flex: 1;
  margin-left: var(--sw);
  min-width: 0;
  width: calc(100% - var(--sw));
}
.dm-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 24px;
  background: rgba(255,255,255,.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.dm-burger {
  display: none;
  font-size: 22px;
  padding: 6px 10px;
  border-radius: 8px;
}
.dm-burger:hover {
  background: var(--bg);
}
.dm-search {
  flex: 1;
  min-width: 0;
  max-width: 520px;
  padding: 11px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #f4f8ff;
  color: var(--ink);
  font: inherit;
  outline: none;
  transition: border-color .2s,box-shadow .2s;
}
.dm-search:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(36,120,240,.15);
}
.dm-search--sm {
  width: 100%;
  max-width: none;
  background: #fff;
}
.dm-bell {
  position: relative;
  margin-left: auto;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  color: #64748b;
  transition: background .2s;
  flex-shrink: 0;
}
.dm-bell__icon {
  display: block;
  width: 24px;
  height: 24px;
}
.dm-bell__dot {
  fill: #f05260;
}
.dm-bell:hover {
  background: #eef3fb;
}
.dm-bell:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 2px;
}
.dm-profile-wrap {
  position: relative;
  flex-shrink: 0;
}
.dm-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 0 4px 8px;
  color: #17365f;
  text-align: left;
}
.dm-profile__icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #194781;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}
.dm-profile__copy strong,.dm-profile__copy small {
  display: block;
  white-space: nowrap;
}
.dm-profile__copy strong {
  color: #18385f;
  font-size: 12px;
}
.dm-profile__copy small {
  margin-top: 3px;
  color: #8294af;
  font-size: 10px;
}
.dm-profile__chev {
  color: #7186a6;
  font-size: 11px;
}
.dm-profile__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 100;
  min-width: 150px;
  padding: 6px;
  border: 1px solid #e1eaf6;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0 8px 24px #17365f1c;
  animation: dm-pop .18s both;
}
.dm-profile__menu button {
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  color: #d14343;
  text-align: left;
  font-size: 12px;
}
.dm-profile__menu button:hover {
  background: #fff0f0;
}
.dm-content {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(300px,340px);
  gap: 22px;
  padding: 24px;
  min-width: 0;
}
.dm-left,.dm-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}
/*── Title ──*/
.dm-title {
  display: flex;
  gap: 14px;
  align-items: center;
}
.dm-title__icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 26px;
  color: var(--blue);
  background: #e3eeff;
  flex-shrink: 0;
}
.dm-title h1 {
  font-size: 24px;
}
.dm-title p {
  margin: 4px 0 0;
  color: var(--blue);
  font-size: 13px;
}
/*── Stats ──*/
.dm-stats {
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: 14px;
}
.dm-stat {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px 14px;
  border-radius: 14px;
  border: 1px solid transparent;
  min-width: 0;
  animation: dm-pop .5s both;
  animation-delay: calc(var(--i)*70ms);
  transition: transform .25s,box-shadow .25s;
}
.dm-stat:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(20,33,61,.1);
}
.dm-stat__icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 18px;
  color: #fff;
  flex-shrink: 0;
}
.dm-stat__label {
  font-size: 12px;
  font-weight: 600;
}
.dm-stat__value {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
}
.dm-stat__trend {
  font-size: 11px;
  font-weight: 600;
}
.dm-stat__trend.is-up {
  color: var(--green);
}
.dm-stat__trend.is-down {
  color: var(--red);
}
.dm-stat--blue {
  background: #e8f1ff;
  border-color: #cfe0ff;
}
.dm-stat--blue .dm-stat__icon {
  background: var(--blue);
}
.dm-stat--green {
  background: #e6f8f1;
  border-color: #c5ecde;
}
.dm-stat--green .dm-stat__icon {
  background: var(--green);
}
.dm-stat--red {
  background: #fdeaec;
  border-color: #f7ccd2;
}
.dm-stat--red .dm-stat__icon {
  background: var(--red);
}
.dm-stat--orange {
  background: #fff3df;
  border-color: #fbdca8;
}
.dm-stat--orange .dm-stat__icon {
  background: var(--orange);
}
.dm-stat--indigo {
  background: #e9eefe;
  border-color: #cdd8fb;
}
.dm-stat--indigo .dm-stat__icon {
  background: var(--indigo);
}
.dm-stat--purple {
  background: #f0eaff;
  border-color: #dccfff;
}
.dm-stat--purple .dm-stat__icon {
  background: var(--purple);
}
/*── Tabs ──*/
.dm-tabs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  background: #fff;
  border-radius: 14px;
  padding: 0 10px;
  border: 1px solid var(--line);
  scrollbar-width: none;
}
.dm-tabs::-webkit-scrollbar {
  display: none;
}
.dm-tab {
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 16px 14px;
  white-space: nowrap;
  font-weight: 600;
  color: var(--muted);
  transition: color .2s;
}
.dm-tab::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 0;
  height: 3px;
  border-radius: 3px;
  background: var(--blue);
  transform: scaleX(0);
  transition: transform .3s;
}
.dm-tab:hover {
  color: var(--ink);
}
.dm-tab.is-active {
  color: var(--blue);
}
.dm-tab.is-active::after {
  transform: scaleX(1);
}
.dm-panel {
  animation: dm-fade .4s both;
  min-width: 0;
}
/*── Cards & tables ──*/
.dm-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(20,33,61,.04);
  animation: dm-fade .5s both;
  animation-delay: calc(var(--i,0)*90ms);
  min-width: 0;
}
.dm-card--pad {
  padding: 18px;
}
.dm-card__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 16px 18px;
}
.dm-card__head h2,.dm-card--pad h2 {
  font-size: 17px;
}
.dm-card--pad h3 {
  font-size: 15px;
  margin-bottom: 12px;
}
.dm-card--pad h4 {
  font-size: 12.5px;
  margin: 18px 0 10px;
}
.dm-help {
  margin: 6px 0 14px;
  color: var(--muted);
  font-size: 12px;
}
.dm-table-wrap {
  overflow-x: auto;
  padding: 0 12px 12px;
}
.dm-table {
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;
  font-size: 12.5px;
}
.dm-table th {
  text-align: left;
  padding: 10px;
  background: #f6f9fe;
  color: var(--muted);
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
}
.dm-table td {
  padding: 12px 10px;
  border-bottom: 1px solid var(--line);
  vertical-align: middle;
}
.dm-table tbody tr {
  animation: dm-row .45s both;
  animation-delay: calc(var(--i)*60ms);
  transition: background .2s;
}
.dm-table tbody tr:hover {
  background: #f5f9ff;
}
.dm-table tbody tr.is-selected {
  background: #eaf2ff;
}
.dm-empty-row td {
  text-align: center;
  color: var(--muted);
  padding: 28px 10px;
}
.dm-person {
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: left;
}
.dm-person strong {
  display: block;
}
.dm-person small {
  color: var(--blue);
}
.dm-person__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  flex-shrink: 0;
}
.dm-person__avatar--college {
  background: #dbe7fa;
  color: var(--navy);
}
.dm-link {
  color: var(--blue);
  word-break: break-word;
}
.dm-actions {
  display: flex;
  gap: 6px;
  align-items: center;
}
.dm-more {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--line);
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
}
.dm-more:hover {
  background: var(--bg);
  border-color: #cfe0ff;
}
.dm-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 0 18px 14px;
  flex-wrap: wrap;
}
.dm-toolbar .dm-search {
  flex: 1;
  min-width: 200px;
}
.dm-count {
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
}
.dm-seg {
  display: inline-flex;
  background: var(--bg);
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
}
.dm-seg button {
  padding: 7px 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12.5px;
  color: var(--muted);
  transition: background .2s,color .2s;
}
.dm-seg button.is-active {
  background: #fff;
  color: var(--blue);
  box-shadow: 0 2px 8px rgba(20,33,61,.1);
}
.dm-pager {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 4px 18px 16px;
}
.dm-pager__info {
  font-size: 12px;
  color: var(--muted);
}
.dm-pager__btns {
  display: flex;
  gap: 6px;
}
.dm-pager__btns button {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid var(--line);
  font-weight: 600;
  font-size: 12.5px;
  background: #fff;
}
.dm-pager__btns button:hover:not(:disabled) {
  background: #eef5ff;
  border-color: #cfe0ff;
}
.dm-pager__btns button.is-active {
  background: var(--blue);
  border-color: var(--blue);
  color: #fff;
}
/*── Buttons & badges ──*/
.dm-btn {
  padding: 9px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12.5px;
  transition: transform .15s,background .2s,box-shadow .2s;
  white-space: nowrap;
}
.dm-btn:active {
  transform: scale(.96);
}
.dm-btn--primary {
  background: var(--blue);
  color: #fff;
}
.dm-btn--primary:hover {
  background: var(--blue-d);
  box-shadow: 0 6px 14px rgba(36,120,240,.3);
}
.dm-btn--ghost {
  border: 1px solid #cfe0ff;
  color: var(--blue);
  background: #f5f9ff;
  padding: 7px 12px;
}
.dm-btn--ghost:hover {
  background: #e3eeff;
}
.dm-btn--outline {
  border: 1px solid var(--blue);
  color: var(--blue);
  background: #fff;
}
.dm-btn--outline:hover {
  background: #eef5ff;
}
.dm-btn--block {
  width: 100%;
  margin-top: 10px;
}
.dm-btn--search {
  background: linear-gradient(135deg,#2478f0,#6a5cff);
  color: #fff;
  padding: 11px 16px;
}
.dm-btn--search:hover {
  box-shadow: 0 8px 18px rgba(80,98,255,.4);
  transform: translateY(-1px);
}
.dm-btn--clear {
  background: #fdeaec;
  color: #c9243a;
  border: 1px solid #f7ccd2;
  padding: 11px 16px;
}
.dm-btn--clear:hover {
  background: #fbd3d8;
  box-shadow: 0 6px 14px rgba(229,56,75,.2);
}
.dm-badge {
  display: inline-block;
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
.dm-badge--red {
  background: #fde3e6;
  color: #c9243a;
}
.dm-badge--orange {
  background: #fff0d2;
  color: #c26f00;
}
.dm-badge--green {
  background: #d9f5e8;
  color: #0f8a58;
}
.dm-badge--blue {
  background: #e0ecff;
  color: #1a5fd0;
}
.dm-badge--purple {
  background: #ece4ff;
  color: #6535e0;
}
.dm-note {
  margin: 0;
  padding: 12px 16px;
  border-radius: 10px;
  background: #e8f1ff;
  color: var(--muted);
  font-size: 12px;
}
/*── Right column pieces ──*/
.dm-hint {
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f4f8ff;
  border: 1px dashed #b9d2ff;
  font-size: 11.5px;
  line-height: 1.6;
  color: var(--muted);
}
.dm-hint b {
  color: var(--ink);
}
.dm-row-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
}
.dm-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  margin-top: 12px;
  font-size: 11.5px;
  color: var(--muted);
}
.dm-chip {
  padding: 4px 10px;
  border-radius: 999px;
  background: #eef3fb;
  color: var(--blue);
  font-size: 11.5px;
  font-weight: 600;
  transition: background .2s;
}
.dm-chip:hover {
  background: #dbe9ff;
}
.dm-empty {
  margin: 0;
  padding: 12px;
  border-radius: 10px;
  background: #fff6e6;
  color: #a86100;
  font-size: 12.5px;
}
.dm-results {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dm-results button {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border: 1px solid var(--line);
  border-radius: 10px;
  transition: background .2s,border-color .2s;
}
.dm-results button:hover {
  background: #f3f8ff;
  border-color: #cfe0ff;
}
.dm-results__txt {
  flex: 1;
  min-width: 0;
}
.dm-results__txt strong,.dm-results__txt small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.dm-results__more {
  font-size: 11.5px;
  color: var(--muted);
  text-align: center;
}
.dm-sel {
  color: var(--blue);
  font-weight: 600;
}
.dm-timeline,.dm-recent {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.dm-timeline li,.dm-recent li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  animation: dm-row .45s both;
  animation-delay: calc(var(--i,0)*80ms);
}
.dm-timeline li div,.dm-recent li div {
  flex: 1;
  min-width: 0;
}
.dm-timeline time {
  font-size: 10.5px;
  color: var(--muted);
  text-align: right;
  max-width: 100px;
}
.dm-recent li {
  align-items: center;
}
.dm-recent__ctl {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}
.dm-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
}
.dm-recent .dm-dot {
  margin-top: 0;
}
.dm-dot--blue {
  background: var(--blue);
}
.dm-dot--orange {
  background: var(--orange);
}
.dm-dot--green {
  background: var(--green);
}
.dm-dot--red {
  background: var(--red);
}
.dm-details {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px 12px;
  margin: 0;
  font-size: 12px;
}
.dm-details dt {
  color: var(--muted);
}
.dm-details dd {
  margin: 0;
  text-align: right;
}
.dm-details .is-red {
  color: var(--red);
}
.dm-mini {
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: 8px;
}
.dm-mini__box {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: transform .2s;
}
.dm-mini__box:hover {
  transform: translateY(-3px);
}
.dm-mini__box b {
  display: block;
  font-size: 15px;
  margin-top: 2px;
  color: var(--ink);
}
.dm-mini__box--green {
  background: #e3f7ee;
  border-color: #bfe9d6;
  color: var(--green);
}
.dm-mini__box--orange {
  background: #fff1da;
  border-color: #f8d9a0;
  color: var(--orange);
}
.dm-mini__box--purple {
  background: #eee7ff;
  border-color: #d6c7ff;
  color: var(--purple);
}
.dm-mini__box small {
  color: inherit;
}
.dm-unique-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(130px,1fr));
  gap: 12px;
}
.dm-unique {
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  animation: dm-pop .5s both;
  animation-delay: calc(var(--i)*90ms);
}
.dm-unique span {
  font-size: 12px;
  color: var(--muted);
}
.dm-unique strong {
  display: block;
  font-size: 22px;
  margin: 4px 0;
}
/*── Active / Inactive switch ──*/
.dm-switch {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: #c9d3e3;
  flex-shrink: 0;
  transition: background .25s;
}
.dm-switch span {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.25);
  transition: transform .25s;
}
.dm-switch.is-on {
  background: var(--green);
}
.dm-switch.is-on span {
  transform: translateX(20px);
}
.dm-switch:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 2px;
}
/*── ⋮ menu ──*/
.dm-menu-bg {
  position: fixed;
  inset: 0;
  z-index: 79;
}
.dm-menu {
  position: fixed;
  z-index: 80;
  width: 214px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 14px 34px rgba(20,33,61,.2);
  padding: 6px;
  animation: dm-pop .18s both;
}
.dm-menu button {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 9px 10px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 600;
}
.dm-menu button:hover {
  background: var(--bg);
}
.dm-menu .is-danger {
  color: var(--red);
}
.dm-menu .is-danger:hover {
  background: #fdeaec;
}
/*── Detail modal ──*/
.dm-modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(8,18,35,.55);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 90;
  animation: dm-fadebg .2s both;
}
.dm-modal {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  max-height: 90dvh;
  overflow-y: auto;
  box-shadow: 0 24px 60px rgba(8,18,35,.35);
  animation: dm-pop .3s both;
}
.dm-modal__head {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--line);
}
.dm-modal__close {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  font-size: 16px;
  color: var(--muted);
  flex-shrink: 0;
}
.dm-modal__close:hover {
  background: var(--bg);
}
.dm-modal__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 20px 0;
}
.dm-modal__grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 14px 18px;
  margin: 0;
  padding: 18px 20px;
}
.dm-modal__grid dt {
  font-size: 11.5px;
  color: var(--muted);
}
.dm-modal__grid dd {
  margin: 2px 0 0;
  font-weight: 600;
  word-break: break-word;
}
.dm-modal__foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px 18px;
  border-top: 1px solid var(--line);
}
.dm-toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  background: var(--navy);
  color: #fff;
  padding: 11px 20px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(8,18,35,.35);
  max-width: calc(100vw - 32px);
  animation: dm-toast .25s both;
}
/*── Keyframes ──*/
@keyframes dm-slide-in {
  from {
    opacity: 0;
    transform: translateX(-18px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes dm-pop {
  from {
    opacity: 0;
    transform: translateY(14px) scale(.96);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes dm-fade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes dm-fadebg {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes dm-row {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes dm-toast {
  from {
    opacity: 0;
    transform: translate(-50%,10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%,0);
  }
}
/*── Responsive ──*/
@media (max-width:1180px) {
  .dm-content {
    grid-template-columns: minmax(0,1fr);
  }
  .dm-right {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
    align-items: start;
  }
}
@media (max-width:900px) {
  .dm-sidebar {
    transform: translateX(-100%);
  }
  .dm-sidebar.is-open {
    transform: none;
    box-shadow: 12px 0 40px rgba(0,0,0,.35);
  }
  .dm-main {
    margin-left: 0;
    width: 100%;
  }
  .dm-burger {
    display: block;
  }
  .dm-topbar {
    padding: 10px 14px;
  }
  .dm-content {
    padding: 16px;
    gap: 18px;
  }
}
@media (max-width:700px) {
  /*tables turn into stacked cards*/
  .dm-table {
    min-width: 0;
  }
  .dm-table thead {
    display: none;
  }
  .dm-table,.dm-table tbody,.dm-table tr,.dm-table td {
    display: block;
    width: 100%;
  }
  .dm-table tbody tr {
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 4px 14px;
    margin-bottom: 12px;
    background: #fff;
  }
  .dm-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    text-align: right;
    padding: 10px 0;
    border-bottom: 1px dashed var(--line);
  }
  .dm-table td:last-child {
    border-bottom: 0;
  }
  .dm-table td[data-label]::before {
    content: attr(data-label);
    color: var(--muted);
    font-size: 11.5px;
    font-weight: 600;
    text-align: left;
    flex-shrink: 0;
  }
  .dm-td-check {
    display: none !important;
  }
  .dm-empty-row td {
    display: block;
    text-align: center;
  }
  .dm-table-wrap {
    padding: 0 12px 4px;
  }
  .dm-actions {
    width: 100%;
    justify-content: flex-end;
  }
  .dm-toolbar {
    padding: 0 12px 12px;
  }
  .dm-pager {
    padding: 4px 12px 14px;
    justify-content: center;
  }
  /*modal becomes a bottom sheet*/
  .dm-modal-bg {
    place-items: end center;
    padding: 0;
  }
  .dm-modal {
    max-width: none;
    border-radius: 18px 18px 0 0;
  }
  .dm-modal__grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width:640px) {
  .dm-stats {
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 10px;
  }
  .dm-stat {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 14px;
  }
  .dm-stat__value {
    font-size: 20px;
  }
  .dm-profile__copy,.dm-profile__chev {
    display: none;
  }
  .dm-profile {
    padding-left: 0;
  }
  .dm-title h1 {
    font-size: 20px;
  }
  .dm-title p {
    font-size: 12px;
  }
  .dm-tab {
    padding: 14px 10px;
    font-size: 13px;
  }
  .dm-right {
    grid-template-columns: 1fr;
  }
  .dm-card__head {
    padding: 14px;
  }
  .dm-card--pad {
    padding: 14px;
  }
  .dm-seg {
    width: 100%;
  }
  .dm-seg button {
    flex: 1;
    padding: 8px 6px;
  }
  .dm-bell {
    margin-left: 0;
  }
}
@media (max-width:380px) {
  .dm-stats {
    grid-template-columns: 1fr;
  }
  .dm-row-btns {
    grid-template-columns: 1fr;
  }
}
@media (prefers-reduced-motion:reduce) {
  .dm-app *,.dm-app *::before,.dm-app *::after {
    animation: none !important;
    transition: none !important;
  }
}
/*── Activity tab, college stats, viewed colleges ──*/
.dm-mini--lg {
  margin-bottom: 18px;
}
.dm-mini--lg .dm-mini__box {
  padding: 14px;
}
.dm-mini--lg .dm-mini__box b {
  font-size: 22px;
}
.dm-card--pad .dm-toolbar {
  padding: 0 0 14px;
}
.dm-card--pad .dm-pager {
  padding: 14px 0 0;
}
.dm-recent li strong {
  overflow-wrap: anywhere;
}
.dm-modal__stats {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 12px;
  padding: 16px 20px 0;
}
.dm-modal__stats div {
  padding: 12px 14px;
  border-radius: 12px;
  background: #f4f8ff;
  border: 1px solid #dbe7fa;
}
.dm-modal__stats b {
  display: block;
  margin-top: 2px;
  font-size: 18px;
  color: var(--blue);
}
.dm-modal__sec {
  padding: 0 20px 18px;
}
.dm-modal__sec h4 {
  font-size: 13.5px;
  margin: 0 0 10px;
}
.dm-modal__lead {
  margin: 0 0 8px;
  font-size: 12.5px;
  color: var(--muted);
}
.dm-viewed {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dm-viewed button {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border: 1px solid var(--line);
  border-radius: 10px;
  transition: background .2s,border-color .2s;
}
.dm-viewed button:hover {
  background: #f3f8ff;
  border-color: #cfe0ff;
}
.dm-viewed .dm-results__txt strong,.dm-viewed .dm-results__txt small {
  white-space: normal;
  overflow-wrap: anywhere;
}
@media (max-width:640px) {
  .dm-mini--lg {
    gap: 6px;
  }
  .dm-mini--lg .dm-mini__box {
    padding: 10px 8px;
  }
  .dm-mini--lg .dm-mini__box b {
    font-size: 18px;
  }
  .dm-card--pad .dm-toolbar .dm-select {
    flex: 1;
    min-width: 0;
  }
  .dm-card--pad .dm-pager {
    justify-content: center;
  }
  .dm-modal__stats {
    padding: 14px 16px 0;
  }
  .dm-modal__sec {
    padding: 0 16px 16px;
  }
}
@media (max-width:380px) {
  .dm-modal__stats {
    grid-template-columns: 1fr;
  }
}
/*── Top-bar search suggestions ──*/
.dm-topsearch {
  position: relative;
  flex: 1;
  min-width: 0;
  max-width: 520px;
}
.dm-topsearch .dm-search {
  width: 100%;
  max-width: none;
}
.dm-suggest {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  min-width: min(380px,100%);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(20,33,61,.18);
  padding: 6px;
  z-index: 70;
  max-height: 70vh;
  overflow-y: auto;
  animation: dm-pop .18s both;
}
.dm-suggest__item {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border-radius: 8px;
}
.dm-suggest__item:hover {
  background: #f3f8ff;
}
.dm-suggest__empty {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 12px;
  border-radius: 8px;
  background: #fff6e6;
  color: #a86100;
  font-size: 12.5px;
}
.dm-suggest__empty small {
  color: #a86100;
  opacity: .85;
}
.dm-suggest__all {
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border-top: 1px solid var(--line);
  color: var(--blue);
  font-weight: 600;
  font-size: 12.5px;
  text-align: center;
}
.dm-suggest__all:hover {
  background: #f3f8ff;
}
/*── Filters / expand ──*/
.dm-select {
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fff;
  font: inherit;
  color: var(--ink);
  outline: none;
  cursor: pointer;
}
.dm-select:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(36,120,240,.15);
}
.dm-previewnote {
  margin: 0;
  padding: 2px 18px 16px;
  font-size: 12px;
  color: var(--muted);
}
.dm-previewnote button {
  color: var(--blue);
  font-weight: 600;
  text-decoration: underline;
}
.dm-empty--soft {
  background: #f4f8ff;
  color: var(--muted);
  border: 1px dashed #cfe0ff;
}
.dm-card--pad .dm-empty {
  margin-top: 12px;
}
@media (max-width:640px) {
  .dm-suggest {
    position: fixed;
    top: 66px;
    left: 10px;
    right: 10px;
    min-width: 0;
  }
  .dm-toolbar .dm-select {
    flex: 1;
  }
  .dm-card__head .dm-btn--primary {
    width: 100%;
  }
  .dm-previewnote {
    padding: 2px 14px 14px;
  }
}
/*── Smart Alerts ──*/
.dm-alerts {
  container-type: inline-size;
  container-name: dmalerts;
}
.dm-alerts__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.dm-alerts__title {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  min-width: 0;
  flex: 1 1 240px;
}
.dm-alerts__title h2 {
  margin: 0;
  font-size: 16px;
}
.dm-alerts__title p {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--muted);
}
.dm-alerts__bell {
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
}
.dm-alerts__all {
  flex-shrink: 0;
}
.dm-alerts__grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 12px;
}
@container dmalerts (max-width: 439px) {
  .dm-alerts__grid {
    grid-template-columns: minmax(0,1fr);
  }
}
@container dmalerts (min-width: 760px) {
  .dm-alerts__grid {
    grid-template-columns: repeat(4,minmax(0,1fr));
  }
}
.dm-alert {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 14px;
  border: 1px solid transparent;
  border-radius: 12px;
  min-width: 0;
  transition: transform .2s,box-shadow .2s;
}
.dm-alert:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(20,33,61,.08);
}
.dm-alert--red {
  background: #fdeaec;
  border-color: #f9ccd2;
  --tone: #e5384b;
}
.dm-alert--orange {
  background: #fff4de;
  border-color: #fbe0a8;
  --tone: #f08c00;
}
.dm-alert--blue {
  background: #e6f0ff;
  border-color: #c9dcfb;
  --tone: #2478f0;
}
.dm-alert--purple {
  background: #f0e9ff;
  border-color: #dccffb;
  --tone: #7c4dff;
}
.dm-alert__icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--tone,#2478f0);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}
.dm-alert__icon--red {
  --tone: #e5384b;
}
.dm-alert__icon--orange {
  --tone: #f08c00;
}
.dm-alert__icon--blue {
  --tone: #2478f0;
}
.dm-alert__icon--purple {
  --tone: #7c4dff;
}
.dm-alert__body {
  flex: 1;
  min-width: 0;
}
.dm-alert__body strong {
  display: block;
  font-size: 12.5px;
  color: var(--tone);
  overflow-wrap: anywhere;
}
.dm-alert__body p {
  margin: 4px 0 6px;
  font-size: 11.5px;
  color: var(--muted);
  overflow-wrap: anywhere;
}
.dm-alert__body small {
  display: block;
  font-size: 10.5px;
  color: var(--muted);
  overflow-wrap: anywhere;
}
.dm-alert__foot {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.dm-alert__bar {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: rgba(255,255,255,.85);
  overflow: hidden;
  min-width: 0;
}
.dm-alert__bar i {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--tone);
}
.dm-alert__view {
  padding: 5px 12px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid var(--tone);
  color: var(--tone);
  font-size: 11.5px;
  font-weight: 600;
  flex-shrink: 0;
  transition: background .2s,color .2s;
}
.dm-alert__view:hover {
  background: var(--tone);
  color: #fff;
}
.dm-alertmodal__title {
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;
}
.dm-alertmodal__title > div {
  min-width: 0;
}
.dm-alertmodal__title strong,.dm-alertmodal__title small {
  display: block;
  overflow-wrap: anywhere;
}
.dm-alertmodal__title small {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}
.dm-alertmodal__body {
  padding: 16px 20px;
  max-height: 52vh;
  max-height: 52dvh;
  overflow-y: auto;
}
@media (max-width:640px) {
  .dm-alertmodal__body {
    padding: 14px 16px;
    max-height: 58dvh;
  }
  .dm-alerts__all {
    width: 100%;
  }
}
/*── Confirm popup ──*/
.dm-confirm {
  max-width: 400px;
}
.dm-confirm__body {
  padding: 24px 22px 8px;
  text-align: center;
}
.dm-confirm__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: #d9f5e8;
  font-size: 24px;
}
.dm-confirm__body h3 {
  margin: 0 0 6px;
  font-size: 17px;
}
.dm-confirm__body p {
  margin: 0 0 14px;
  font-size: 13px;
  color: var(--muted);
}
.dm-confirm__rec {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #f7faff;
  text-align: left;
  flex-wrap: wrap;
}
.dm-confirm__foot {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 16px 22px 20px;
}
.dm-confirm__foot .dm-btn {
  flex: 1;
  padding: 11px 16px;
}
`;