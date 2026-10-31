import { createContext, useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

/* =====================================================================
   SETTINGS  -  single file (JSX + CSS)
   Usage:  import Settings from "./Settings";   <Route path="/admin/settings" element={<Settings />} />
   - Every row opens a panel; toggles work inline; cards collapse on header click
   - Language (English / தமிழ்), date format, timezone, 12/24h and theme apply live
   - Profile (top right) and sidebar Logout clear the session and go to /login
   ===================================================================== */

/* ---------- 1. ICONS ---------- */
const P = {
  home: "M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6",
  users:
    "M16 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M9.5 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7M21 20v-1a4 4 0 00-3-3.9M16 4.1a3.5 3.5 0 010 6.8",
  user: "M20 21v-1a5 5 0 00-5-5H9a5 5 0 00-5 5v1M12 11a4 4 0 100-8 4 4 0 000 8",
  building: "M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6M9 11h.01M15 11h.01",
  courses: "M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 19a2 2 0 012-2h13M9 7h6",
  file: "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8zM14 3v5h5M9 13h6M9 17h4",
  copy: "M9 9h10v12H9zM5 15V3h10",
  money: "M12 2v20M17 6H9.5a3 3 0 000 6h5a3 3 0 010 6H6",
  chart: "M4 3v18h16M8 17v-5M12 17V8M16 17v-8",
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  bell: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0",
  diamond: "M6 3h12l4 6-10 12L2 9zM2 9h20M6 3l6 18 6-18M2 9l4-6M22 9l-4-6",
  chev: "M9 6l6 6-6 6",
  globe:
    "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18",
  cal: "M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zM3 10h18M8 3v4M16 3v4",
  palette:
    "M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.3-.5-.8-.5-1.2 0-1.1.9-2 2-2h2.3A3.7 3.7 0 0021 11c0-4-4-8-9-8z",
  layout: "M3 3h8v8H3zM13 3h8v5h-8zM13 11h8v10h-8zM3 14h8v7H3z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  shieldok: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  lock: "M6 11h12v10H6zM8 11V7a4 4 0 018 0v4",
  pulse: "M3 12h4l3-8 4 16 3-8h4",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  pencil: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  eyeoff:
    "M3 3l18 18M10.6 6.1A9 9 0 0121 12a13 13 0 01-3 3.9M6.6 6.6A13 13 0 003 12s3 7 9 7a9 9 0 004-1M9.9 9.9a3 3 0 004.2 4.2",
  db: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  server: "M3 5h18v6H3zM3 13h18v6H3zM7 8h.01M7 16h.01",
  hdd: "M3 14h18v6H3zM3 14l3-9h12l3 9M7 17h.01",
  logout: "M9 21H5V3h4M16 17l5-5-5-5M21 12H9",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 6l12 12M18 6L6 18",
  check: "M5 12l5 5 10-10",
  cap: "M2 9l10-5 10 5-10 5zM6 11v5c0 1 3 3 6 3s6-2 6-3v-5",
};
const Icon = ({ n, size = 20 }) => (
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
    <path d={P[n]} />
  </svg>
);

/* ---------- 2. DATA ---------- */
const MENU = [
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

/* row = [id, icon, title, subtitle] */
const SEC = [
  {
    id: "profile",
    span: 3,
    tone: "blue",
    icon: "user",
    title: "Admin Profile & Organization",
    sub: "Manage your profile, organization details and admin information.",
    rows: [
      ["profile", "user", "Profile Information", "Name, email, phone, role"],
      [
        "org",
        "building",
        "Organization Details",
        "College platform information",
      ],
      ["edit", "pencil", "Edit Profile", "Update your profile details"],
    ],
  },
  {
    id: "prefs",
    span: 3,
    tone: "green",
    icon: "gear",
    title: "System Preferences",
    sub: "Configure platform behavior, language, time and appearance.",
    rows: [
      ["lang", "globe", "Language & Region", "Choose language and region"],
      ["datetime", "cal", "Date & Time Format", "Set timezone and date format"],
      ["theme", "palette", "Theme", "Light / Dark mode"],
      ["dash", "layout", "Dashboard Preferences", "Set default dashboard view"],
    ],
  },
  {
    id: "notif",
    span: 3,
    tone: "violet",
    icon: "bell",
    title: "Notification Settings",
    sub: "Manage email and system notifications.",
    rows: [
      ["n-reg", "users", "Student Registrations", "New student account alerts"],
      [
        "n-col",
        "building",
        "College Approvals",
        "College verification requests",
      ],
      ["n-app", "file", "Applications", "New applications and status updates"],
      ["n-txn", "money", "Transactions", "Payment and lead purchase alerts"],
      ["n-sys", "shield", "System Updates", "Maintenance and platform updates"],
    ],
  },
  {
    id: "security",
    span: 3,
    tone: "red",
    icon: "shield",
    title: "Security & Access Control",
    sub: "Keep your account and data secure.",
    rows: [
      ["password", "lock", "Change Password", "Update your password"],
      [
        "twofa",
        "shieldok",
        "Two-Factor Authentication",
        "Add an extra layer of security",
      ],
      ["logins", "pulse", "Login Activity", "View recent login activity"],
      ["sessions", "monitor", "Session Management", "Manage active sessions"],
      ["roles", "users", "Role & Permission", "Control admin access levels"],
    ],
  },
  {
    id: "audit",
    span: 2,
    tone: "cyan",
    icon: "clock",
    title: "Account Activity & Audit Logs",
    sub: "Track admin actions and system activities.",
    rows: [
      ["l-admin", "user", "Admin Actions", "View all admin activities"],
      ["l-col", "building", "College Actions", "Approval / rejection history"],
      ["l-txn", "money", "Transaction Logs", "Payment and lead details"],
      ["l-sys", "server", "System Logs", "System events and changes"],
    ],
  },
  {
    id: "privacy",
    span: 2,
    tone: "purple",
    icon: "shield",
    title: "Data Privacy & Compliance",
    sub: "Manage data access and privacy controls.",
    rows: [
      [
        "p-access",
        "users",
        "Student Data Access",
        "View and manage data permissions",
      ],
      [
        "p-mask",
        "eyeoff",
        "Contact Information Masking",
        "Hide sensitive information",
      ],
      ["p-ret", "clock", "Data Retention", "Set data storage duration"],
      ["p-policy", "file", "Privacy Policy", "Manage privacy settings"],
    ],
  },
  {
    id: "maint",
    span: 2,
    tone: "navy",
    icon: "db",
    title: "System Maintenance",
    sub: "Monitor system health and manage backups.",
    rows: [
      ["m-backup", "db", "Database Backup", ""],
      ["m-health", "server", "System Health", "Server and application status"],
      ["m-storage", "hdd", "Storage Usage", "Used: 42% of total storage"],
      ["m-mode", "gear", "Maintenance Mode", "Enable/disable maintenance mode"],
    ],
  },
];
const TITLES = Object.fromEntries(
  SEC.flatMap((s) => s.rows.map((r) => [r[0], r[2]])),
);

const TZ = [
  ["Asia/Kolkata", "India Standard Time", "UTC+5:30"],
  ["UTC", "UTC", "UTC+0"],
  ["Europe/London", "London", "UTC+0 / +1"],
  ["America/New_York", "New York", "UTC-5 / -4"],
  ["Asia/Dubai", "Dubai", "UTC+4"],
];
const DF = ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD", "DD MMM YYYY"];
const LOGS = {
  "l-admin": [
    ["Updated profile details", 2],
    ["Approved SNS College", 5],
    ["Changed notification settings", 28],
    ["Exported student report", 50],
  ],
  "l-col": [
    ["SNS College approved", 5],
    ["ABC Arts & Science rejected - documents missing", 30],
    ["KG College approved", 53],
    ["PSG College approved", 80],
  ],
  "l-txn": [
    ["PSG College - 50 profiles purchased, Rs.3,500", 8],
    ["KG College - Diamond plan, Rs.12,000", 26],
    ["SNS College - 100 profiles, Rs.5,000", 55],
  ],
  "l-sys": [
    ["Database backup completed", 9],
    ["Platform updated to v2.4.1", 40],
    ["Maintenance window ended", 96],
    ["Scheduled cleanup finished", 120],
  ],
};
const DEVICES = [
  ["Chrome on Windows", "Chennai, IN - This device", 0],
  ["Safari on iPhone", "Coimbatore, IN", 26],
  ["Edge on Windows", "Madurai, IN", 74],
];
const ALERTS = [
  ["New college verification request", 1],
  ["Payment received from PSG College", 3],
  ["Database backup completed", 9],
];

const KEY = "sc_settings";
const DEF = {
  lang: "en",
  theme: "light",
  dateFmt: "DD-MM-YYYY",
  tz: "Asia/Kolkata",
  hour12: true,
  dash: "Overview",
  notifs: { reg: true, col: true, app: true, txn: true, sys: true },
  maint: false,
  twofa: false,
  method: "Authenticator app",
  mask: true,
  access: { contact: true, marks: true, pay: false },
  retention: "12 months",
  roles: {
    "Super Admin": "Full access",
    Admin: "Read & write",
    Viewer: "Read only",
  },
  profile: {
    name: "Admin",
    email: "admin@studentconnect.in",
    phone: "+91 98765 43210",
    role: "Administrator",
  },
  org: {
    name: "StudentConnect Education",
    type: "College platform",
    city: "Chennai",
    website: "www.studentconnect.in",
  },
  backup: "2025-08-26T05:00:00Z",
};
const load = () => {
  try {
    return { ...DEF, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return DEF;
  }
};

/* ---------- 3. TAMIL (English text is the key; anything missing stays English) ---------- */
const TA = {
  Dashboard: "டாஷ்போர்டு",
  Students: "மாணவர்கள்",
  Colleges: "கல்லூரிகள்",
  Courses: "படிப்புகள்",
  Applications: "விண்ணப்பங்கள்",
  Duplicates: "நகல்கள்",
  Transactions: "பரிவர்த்தனைகள்",
  Reports: "அறிக்கைகள்",
  Users: "பயனர்கள்",
  Settings: "அமைப்புகள்",
  Logout: "வெளியேறு",
  "Search students, colleges, leads...": "மாணவர்கள், கல்லூரிகள் தேடுங்கள்...",
  "Manage your platform settings, preferences and system configurations":
    "உங்கள் தள அமைப்புகள், விருப்பங்கள் மற்றும் கணினி கட்டமைப்புகளை நிர்வகிக்கவும்",
  "Admin Profile & Organization": "நிர்வாகி சுயவிவரம் & நிறுவனம்",
  "Manage your profile, organization details and admin information.":
    "உங்கள் சுயவிவரம், நிறுவன விவரங்களை நிர்வகிக்கவும்.",
  "Profile Information": "சுயவிவரத் தகவல்",
  "Name, email, phone, role": "பெயர், மின்னஞ்சல், தொலைபேசி, பங்கு",
  "Organization Details": "நிறுவன விவரங்கள்",
  "College platform information": "கல்லூரி தளத் தகவல்",
  "Edit Profile": "சுயவிவரத்தைத் திருத்து",
  "Update your profile details": "உங்கள் சுயவிவர விவரங்களைப் புதுப்பிக்கவும்",
  Administrator: "நிர்வாகி",
  "System Preferences": "கணினி விருப்பங்கள்",
  "Configure platform behavior, language, time and appearance.":
    "மொழி, நேரம், தோற்றத்தை அமைக்கவும்.",
  "Language & Region": "மொழி & பிராந்தியம்",
  "Choose language and region": "மொழியைத் தேர்ந்தெடுக்கவும்",
  "Date & Time Format": "தேதி & நேர வடிவம்",
  "Set timezone and date format": "நேர மண்டலம், தேதி வடிவம்",
  Theme: "தீம்",
  "Light / Dark mode": "ஒளி / இருள் பயன்முறை",
  "Dashboard Preferences": "டாஷ்போர்டு விருப்பங்கள்",
  "Set default dashboard view": "இயல்புநிலை டாஷ்போர்டு காட்சி",
  "Notification Settings": "அறிவிப்பு அமைப்புகள்",
  "Manage email and system notifications.":
    "மின்னஞ்சல், கணினி அறிவிப்புகளை நிர்வகிக்கவும்.",
  "Student Registrations": "மாணவர் பதிவுகள்",
  "New student account alerts": "புதிய மாணவர் கணக்கு அறிவிப்புகள்",
  "College Approvals": "கல்லூரி ஒப்புதல்கள்",
  "College verification requests": "கல்லூரி சரிபார்ப்பு கோரிக்கைகள்",
  "New applications and status updates": "புதிய விண்ணப்பங்கள், நிலை மாற்றங்கள்",
  "Payment and lead purchase alerts": "கட்டணம், லீட் வாங்கல் அறிவிப்புகள்",
  "System Updates": "கணினி புதுப்பிப்புகள்",
  "Maintenance and platform updates": "பராமரிப்பு, தள புதுப்பிப்புகள்",
  "Security & Access Control": "பாதுகாப்பு & அணுகல் கட்டுப்பாடு",
  "Keep your account and data secure.":
    "உங்கள் கணக்கையும் தரவையும் பாதுகாக்கவும்.",
  "Change Password": "கடவுச்சொல் மாற்று",
  "Update your password": "கடவுச்சொல்லைப் புதுப்பிக்கவும்",
  "Two-Factor Authentication": "இரு-காரணி அங்கீகாரம்",
  "Add an extra layer of security": "கூடுதல் பாதுகாப்பு அடுக்கு",
  "Login Activity": "உள்நுழைவு செயல்பாடு",
  "View recent login activity": "சமீபத்திய உள்நுழைவுகள்",
  "Session Management": "அமர்வு மேலாண்மை",
  "Manage active sessions": "செயலில் உள்ள அமர்வுகள்",
  "Role & Permission": "பங்கு & அனுமதி",
  "Control admin access levels": "நிர்வாகி அணுகல் நிலைகள்",
  "Account Activity & Audit Logs": "கணக்கு செயல்பாடு & தணிக்கை பதிவுகள்",
  "Track admin actions and system activities.":
    "நிர்வாகி, கணினி செயல்பாடுகளைக் கண்காணிக்கவும்.",
  "Admin Actions": "நிர்வாகி செயல்கள்",
  "View all admin activities": "அனைத்து நிர்வாகி செயல்பாடுகள்",
  "College Actions": "கல்லூரி செயல்கள்",
  "Approval / rejection history": "ஒப்புதல் / நிராகரிப்பு வரலாறு",
  "Transaction Logs": "பரிவர்த்தனை பதிவுகள்",
  "Payment and lead details": "கட்டணம், லீட் விவரங்கள்",
  "System Logs": "கணினி பதிவுகள்",
  "System events and changes": "கணினி நிகழ்வுகள், மாற்றங்கள்",
  "Data Privacy & Compliance": "தரவு தனியுரிமை & இணக்கம்",
  "Manage data access and privacy controls.":
    "தரவு அணுகல், தனியுரிமை கட்டுப்பாடுகள்.",
  "Student Data Access": "மாணவர் தரவு அணுகல்",
  "View and manage data permissions": "தரவு அனுமதிகளை நிர்வகிக்கவும்",
  "Contact Information Masking": "தொடர்பு தகவல் மறைப்பு",
  "Hide sensitive information": "முக்கிய தகவலை மறைக்கவும்",
  "Data Retention": "தரவு தக்கவைப்பு",
  "Set data storage duration": "தரவு சேமிப்பு காலம்",
  "Privacy Policy": "தனியுரிமைக் கொள்கை",
  "Manage privacy settings": "தனியுரிமை அமைப்புகள்",
  "System Maintenance": "கணினி பராமரிப்பு",
  "Monitor system health and manage backups.":
    "கணினி நிலை, காப்புப்பிரதிகளை நிர்வகிக்கவும்.",
  "Database Backup": "தரவுத்தள காப்புப்பிரதி",
  "Last backup": "கடைசி காப்புப்பிரதி",
  "System Health": "கணினி நிலை",
  "Server and application status": "சர்வர், செயலி நிலை",
  "Storage Usage": "சேமிப்பு பயன்பாடு",
  "Used: 42% of total storage": "பயன்பாடு: மொத்தத்தில் 42%",
  "Maintenance Mode": "பராமரிப்புப் பயன்முறை",
  "Enable/disable maintenance mode": "பராமரிப்புப் பயன்முறையை இயக்கு/நிறுத்து",
  Success: "வெற்றி",
  Healthy: "நலம்",
  Saved: "சேமிக்கப்பட்டது",
  "Save changes": "மாற்றங்களைச் சேமி",
  Close: "மூடு",
  Cancel: "ரத்து",
  "No settings match your search.": "தேடலுக்குப் பொருந்தும் அமைப்புகள் இல்லை.",
  Timezone: "நேர மண்டலம்",
  "Date format": "தேதி வடிவம்",
  "12-hour clock": "12 மணி நேர கடிகாரம்",
  Light: "ஒளி",
  Dark: "இருள்",
  System: "கணினி",
  Notifications: "அறிவிப்புகள்",
  "Back up now": "இப்போது காப்புப்பிரதி எடு",
  Revoke: "நீக்கு",
};

/* ---------- 3b. HINDI ---------- */
const HI = {
  Dashboard: "डैशबोर्ड",
  Students: "छात्र",
  Colleges: "कॉलेज",
  Courses: "पाठ्यक्रम",
  Applications: "आवेदन",
  Duplicates: "डुप्लिकेट",
  Transactions: "लेनदेन",
  Reports: "रिपोर्ट",
  Users: "उपयोगकर्ता",
  Settings: "सेटिंग्स",
  Logout: "लॉग आउट",
  "Search students, colleges, leads...": "छात्र, कॉलेज, लीड खोजें...",
  "Manage your platform settings, preferences and system configurations":
    "अपने प्लेटफ़ॉर्म की सेटिंग्स, पसंद और सिस्टम कॉन्फ़िगरेशन प्रबंधित करें",
  "Admin Profile & Organization": "एडमिन प्रोफ़ाइल और संगठन",
  "Manage your profile, organization details and admin information.":
    "अपनी प्रोफ़ाइल, संगठन विवरण और एडमिन जानकारी प्रबंधित करें।",
  "Profile Information": "प्रोफ़ाइल जानकारी",
  "Name, email, phone, role": "नाम, ईमेल, फ़ोन, भूमिका",
  "Organization Details": "संगठन विवरण",
  "College platform information": "कॉलेज प्लेटफ़ॉर्म की जानकारी",
  "Edit Profile": "प्रोफ़ाइल संपादित करें",
  "Update your profile details": "अपनी प्रोफ़ाइल का विवरण अपडेट करें",
  Administrator: "प्रशासक",
  "System Preferences": "सिस्टम पसंद",
  "Configure platform behavior, language, time and appearance.":
    "भाषा, समय और रूप-रंग सेट करें।",
  "Language & Region": "भाषा और क्षेत्र",
  "Choose language and region": "भाषा चुनें",
  "Date & Time Format": "तारीख़ और समय प्रारूप",
  "Set timezone and date format": "समय क्षेत्र और तारीख़ प्रारूप",
  Theme: "थीम",
  "Light / Dark mode": "लाइट / डार्क मोड",
  "Dashboard Preferences": "डैशबोर्ड पसंद",
  "Set default dashboard view": "डिफ़ॉल्ट डैशबोर्ड दृश्य",
  "Notification Settings": "सूचना सेटिंग्स",
  "Manage email and system notifications.":
    "ईमेल और सिस्टम सूचनाएँ प्रबंधित करें।",
  "Student Registrations": "छात्र पंजीकरण",
  "New student account alerts": "नए छात्र खाते की सूचनाएँ",
  "College Approvals": "कॉलेज अनुमोदन",
  "College verification requests": "कॉलेज सत्यापन अनुरोध",
  "New applications and status updates": "नए आवेदन और स्थिति अपडेट",
  "Payment and lead purchase alerts": "भुगतान और लीड खरीद सूचनाएँ",
  "System Updates": "सिस्टम अपडेट",
  "Maintenance and platform updates": "रखरखाव और प्लेटफ़ॉर्म अपडेट",
  "Security & Access Control": "सुरक्षा और एक्सेस नियंत्रण",
  "Keep your account and data secure.": "अपने खाते और डेटा को सुरक्षित रखें।",
  "Change Password": "पासवर्ड बदलें",
  "Update your password": "अपना पासवर्ड अपडेट करें",
  "Two-Factor Authentication": "दो-चरणीय प्रमाणीकरण",
  "Add an extra layer of security": "सुरक्षा की एक अतिरिक्त परत जोड़ें",
  "Login Activity": "लॉगिन गतिविधि",
  "View recent login activity": "हाल की लॉगिन गतिविधि देखें",
  "Session Management": "सत्र प्रबंधन",
  "Manage active sessions": "सक्रिय सत्र प्रबंधित करें",
  "Role & Permission": "भूमिका और अनुमति",
  "Control admin access levels": "एडमिन एक्सेस स्तर नियंत्रित करें",
  "Account Activity & Audit Logs": "खाता गतिविधि और ऑडिट लॉग",
  "Track admin actions and system activities.":
    "एडमिन और सिस्टम गतिविधियों को ट्रैक करें।",
  "Admin Actions": "एडमिन कार्य",
  "View all admin activities": "सभी एडमिन गतिविधियाँ देखें",
  "College Actions": "कॉलेज कार्य",
  "Approval / rejection history": "अनुमोदन / अस्वीकृति इतिहास",
  "Transaction Logs": "लेनदेन लॉग",
  "Payment and lead details": "भुगतान और लीड विवरण",
  "System Logs": "सिस्टम लॉग",
  "System events and changes": "सिस्टम घटनाएँ और बदलाव",
  "Data Privacy & Compliance": "डेटा गोपनीयता और अनुपालन",
  "Manage data access and privacy controls.":
    "डेटा एक्सेस और गोपनीयता नियंत्रण प्रबंधित करें।",
  "Student Data Access": "छात्र डेटा एक्सेस",
  "View and manage data permissions": "डेटा अनुमतियाँ देखें और प्रबंधित करें",
  "Contact Information Masking": "संपर्क जानकारी मास्किंग",
  "Hide sensitive information": "संवेदनशील जानकारी छिपाएँ",
  "Data Retention": "डेटा प्रतिधारण",
  "Set data storage duration": "डेटा भंडारण अवधि सेट करें",
  "Privacy Policy": "गोपनीयता नीति",
  "Manage privacy settings": "गोपनीयता सेटिंग्स प्रबंधित करें",
  "System Maintenance": "सिस्टम रखरखाव",
  "Monitor system health and manage backups.":
    "सिस्टम की स्थिति देखें और बैकअप प्रबंधित करें।",
  "Database Backup": "डेटाबेस बैकअप",
  "Last backup": "पिछला बैकअप",
  "System Health": "सिस्टम स्वास्थ्य",
  "Server and application status": "सर्वर और एप्लिकेशन की स्थिति",
  "Storage Usage": "स्टोरेज उपयोग",
  "Used: 42% of total storage": "उपयोग: कुल स्टोरेज का 42%",
  "Maintenance Mode": "रखरखाव मोड",
  "Enable/disable maintenance mode": "रखरखाव मोड चालू/बंद करें",
  Success: "सफल",
  Healthy: "स्वस्थ",
  Saved: "सहेजा गया",
  "Save changes": "बदलाव सहेजें",
  Close: "बंद करें",
  Cancel: "रद्द करें",
  "No settings match your search.": "आपकी खोज से कोई सेटिंग मेल नहीं खाती।",
  Timezone: "समय क्षेत्र",
  "Date format": "तारीख़ प्रारूप",
  "12-hour clock": "12 घंटे की घड़ी",
  Light: "लाइट",
  Dark: "डार्क",
  System: "सिस्टम",
  Notifications: "सूचनाएँ",
  "Back up now": "अभी बैकअप लें",
  Revoke: "रद्द करें",
};

/* ---------- 3c. TELUGU ---------- */
const TE = {
  Dashboard: "డ్యాష్‌బోర్డ్",
  Students: "విద్యార్థులు",
  Colleges: "కళాశాలలు",
  Courses: "కోర్సులు",
  Applications: "దరఖాస్తులు",
  Duplicates: "నకిలీలు",
  Transactions: "లావాదేవీలు",
  Reports: "నివేదికలు",
  Users: "వినియోగదారులు",
  Settings: "సెట్టింగ్‌లు",
  Logout: "లాగ్ అవుట్",
  "Search students, colleges, leads...":
    "విద్యార్థులు, కళాశాలలు, లీడ్‌లు వెతకండి...",
  "Manage your platform settings, preferences and system configurations":
    "మీ ప్లాట్‌ఫారమ్ సెట్టింగ్‌లు, ప్రాధాన్యతలు, సిస్టమ్ కాన్ఫిగరేషన్‌లను నిర్వహించండి",
  "Admin Profile & Organization": "అడ్మిన్ ప్రొఫైల్ & సంస్థ",
  "Manage your profile, organization details and admin information.":
    "మీ ప్రొఫైల్, సంస్థ వివరాలు, అడ్మిన్ సమాచారాన్ని నిర్వహించండి.",
  "Profile Information": "ప్రొఫైల్ సమాచారం",
  "Name, email, phone, role": "పేరు, ఇమెయిల్, ఫోన్, పాత్ర",
  "Organization Details": "సంస్థ వివరాలు",
  "College platform information": "కళాశాల ప్లాట్‌ఫారమ్ సమాచారం",
  "Edit Profile": "ప్రొఫైల్ సవరించండి",
  "Update your profile details": "మీ ప్రొఫైల్ వివరాలను నవీకరించండి",
  Administrator: "నిర్వాహకుడు",
  "System Preferences": "సిస్టమ్ ప్రాధాన్యతలు",
  "Configure platform behavior, language, time and appearance.":
    "భాష, సమయం, రూపాన్ని సెట్ చేయండి.",
  "Language & Region": "భాష & ప్రాంతం",
  "Choose language and region": "భాషను ఎంచుకోండి",
  "Date & Time Format": "తేదీ & సమయ ఫార్మాట్",
  "Set timezone and date format": "టైమ్‌జోన్, తేదీ ఫార్మాట్",
  Theme: "థీమ్",
  "Light / Dark mode": "లైట్ / డార్క్ మోడ్",
  "Dashboard Preferences": "డ్యాష్‌బోర్డ్ ప్రాధాన్యతలు",
  "Set default dashboard view": "డిఫాల్ట్ డ్యాష్‌బోర్డ్ వీక్షణ",
  "Notification Settings": "నోటిఫికేషన్ సెట్టింగ్‌లు",
  "Manage email and system notifications.":
    "ఇమెయిల్, సిస్టమ్ నోటిఫికేషన్‌లను నిర్వహించండి.",
  "Student Registrations": "విద్యార్థి నమోదులు",
  "New student account alerts": "కొత్త విద్యార్థి ఖాతా అలర్ట్‌లు",
  "College Approvals": "కళాశాల ఆమోదాలు",
  "College verification requests": "కళాశాల ధృవీకరణ అభ్యర్థనలు",
  "New applications and status updates": "కొత్త దరఖాస్తులు, స్థితి నవీకరణలు",
  "Payment and lead purchase alerts": "చెల్లింపు, లీడ్ కొనుగోలు అలర్ట్‌లు",
  "System Updates": "సిస్టమ్ నవీకరణలు",
  "Maintenance and platform updates": "నిర్వహణ, ప్లాట్‌ఫారమ్ నవీకరణలు",
  "Security & Access Control": "భద్రత & యాక్సెస్ నియంత్రణ",
  "Keep your account and data secure.": "మీ ఖాతా, డేటాను సురక్షితంగా ఉంచండి.",
  "Change Password": "పాస్‌వర్డ్ మార్చండి",
  "Update your password": "మీ పాస్‌వర్డ్‌ను నవీకరించండి",
  "Two-Factor Authentication": "రెండు-దశల ధృవీకరణ",
  "Add an extra layer of security": "అదనపు భద్రతా పొరను జోడించండి",
  "Login Activity": "లాగిన్ కార్యకలాపం",
  "View recent login activity": "ఇటీవలి లాగిన్‌లను చూడండి",
  "Session Management": "సెషన్ నిర్వహణ",
  "Manage active sessions": "యాక్టివ్ సెషన్‌లను నిర్వహించండి",
  "Role & Permission": "పాత్ర & అనుమతి",
  "Control admin access levels": "అడ్మిన్ యాక్సెస్ స్థాయిలను నియంత్రించండి",
  "Account Activity & Audit Logs": "ఖాతా కార్యకలాపం & ఆడిట్ లాగ్‌లు",
  "Track admin actions and system activities.":
    "అడ్మిన్, సిస్టమ్ కార్యకలాపాలను ట్రాక్ చేయండి.",
  "Admin Actions": "అడ్మిన్ చర్యలు",
  "View all admin activities": "అన్ని అడ్మిన్ కార్యకలాపాలను చూడండి",
  "College Actions": "కళాశాల చర్యలు",
  "Approval / rejection history": "ఆమోదం / తిరస్కరణ చరిత్ర",
  "Transaction Logs": "లావాదేవీ లాగ్‌లు",
  "Payment and lead details": "చెల్లింపు, లీడ్ వివరాలు",
  "System Logs": "సిస్టమ్ లాగ్‌లు",
  "System events and changes": "సిస్టమ్ ఈవెంట్‌లు, మార్పులు",
  "Data Privacy & Compliance": "డేటా గోప్యత & సమ్మతి",
  "Manage data access and privacy controls.":
    "డేటా యాక్సెస్, గోప్యతా నియంత్రణలను నిర్వహించండి.",
  "Student Data Access": "విద్యార్థి డేటా యాక్సెస్",
  "View and manage data permissions": "డేటా అనుమతులను చూడండి, నిర్వహించండి",
  "Contact Information Masking": "సంప్రదింపు సమాచార మాస్కింగ్",
  "Hide sensitive information": "సున్నితమైన సమాచారాన్ని దాచండి",
  "Data Retention": "డేటా నిలుపుదల",
  "Set data storage duration": "డేటా నిల్వ వ్యవధిని సెట్ చేయండి",
  "Privacy Policy": "గోప్యతా విధానం",
  "Manage privacy settings": "గోప్యతా సెట్టింగ్‌లను నిర్వహించండి",
  "System Maintenance": "సిస్టమ్ నిర్వహణ",
  "Monitor system health and manage backups.":
    "సిస్టమ్ స్థితిని, బ్యాకప్‌లను నిర్వహించండి.",
  "Database Backup": "డేటాబేస్ బ్యాకప్",
  "Last backup": "చివరి బ్యాకప్",
  "System Health": "సిస్టమ్ ఆరోగ్యం",
  "Server and application status": "సర్వర్, అప్లికేషన్ స్థితి",
  "Storage Usage": "నిల్వ వినియోగం",
  "Used: 42% of total storage": "వినియోగం: మొత్తం నిల్వలో 42%",
  "Maintenance Mode": "నిర్వహణ మోడ్",
  "Enable/disable maintenance mode": "నిర్వహణ మోడ్ ఆన్/ఆఫ్ చేయండి",
  Success: "విజయం",
  Healthy: "ఆరోగ్యకరం",
  Saved: "సేవ్ అయింది",
  "Save changes": "మార్పులను సేవ్ చేయండి",
  Close: "మూసివేయి",
  Cancel: "రద్దు",
  "No settings match your search.": "మీ శోధనకు సరిపడే సెట్టింగ్‌లు లేవు.",
  Timezone: "టైమ్‌జోన్",
  "Date format": "తేదీ ఫార్మాట్",
  "12-hour clock": "12 గంటల గడియారం",
  Light: "లైట్",
  Dark: "డార్క్",
  System: "సిస్టమ్",
  Notifications: "నోటిఫికేషన్‌లు",
  "Back up now": "ఇప్పుడే బ్యాకప్ తీసుకోండి",
  Revoke: "రద్దు చేయి",
};

/* ---------- 3d. 21 MORE LANGUAGES (menu + page title; remaining text stays English until you add more keys) ---------- */
const NAV = [
  "Dashboard",
  "Students",
  "Colleges",
  "Courses",
  "Applications",
  "Transactions",
  "Reports",
  "Users",
  "Settings",
  "Logout",
];
const XL = Object.fromEntries(
  Object.entries({
    es: [
      "Panel",
      "Estudiantes",
      "Universidades",
      "Cursos",
      "Solicitudes",
      "Transacciones",
      "Informes",
      "Usuarios",
      "Configuración",
      "Cerrar sesión",
    ],
    fr: [
      "Tableau de bord",
      "Étudiants",
      "Universités",
      "Cours",
      "Candidatures",
      "Transactions",
      "Rapports",
      "Utilisateurs",
      "Paramètres",
      "Déconnexion",
    ],
    de: [
      "Übersicht",
      "Studierende",
      "Hochschulen",
      "Kurse",
      "Bewerbungen",
      "Transaktionen",
      "Berichte",
      "Benutzer",
      "Einstellungen",
      "Abmelden",
    ],
    pt: [
      "Painel",
      "Estudantes",
      "Faculdades",
      "Cursos",
      "Candidaturas",
      "Transações",
      "Relatórios",
      "Usuários",
      "Configurações",
      "Sair",
    ],
    it: [
      "Pannello",
      "Studenti",
      "Università",
      "Corsi",
      "Candidature",
      "Transazioni",
      "Report",
      "Utenti",
      "Impostazioni",
      "Esci",
    ],
    ru: [
      "Панель",
      "Студенты",
      "Колледжи",
      "Курсы",
      "Заявки",
      "Транзакции",
      "Отчёты",
      "Пользователи",
      "Настройки",
      "Выйти",
    ],
    ar: [
      "لوحة التحكم",
      "الطلاب",
      "الكليات",
      "الدورات",
      "الطلبات",
      "المعاملات",
      "التقارير",
      "المستخدمون",
      "الإعدادات",
      "تسجيل الخروج",
    ],
    zh: [
      "仪表盘",
      "学生",
      "学院",
      "课程",
      "申请",
      "交易",
      "报告",
      "用户",
      "设置",
      "退出登录",
    ],
    ja: [
      "ダッシュボード",
      "学生",
      "大学",
      "コース",
      "申請",
      "取引",
      "レポート",
      "ユーザー",
      "設定",
      "ログアウト",
    ],
    ko: [
      "대시보드",
      "학생",
      "대학",
      "과정",
      "지원서",
      "거래",
      "보고서",
      "사용자",
      "설정",
      "로그아웃",
    ],
    id: [
      "Dasbor",
      "Mahasiswa",
      "Perguruan Tinggi",
      "Kursus",
      "Pendaftaran",
      "Transaksi",
      "Laporan",
      "Pengguna",
      "Pengaturan",
      "Keluar",
    ],
    ml: [
      "ഡാഷ്ബോർഡ്",
      "വിദ്യാർത്ഥികൾ",
      "കോളേജുകൾ",
      "കോഴ്സുകൾ",
      "അപേക്ഷകൾ",
      "ഇടപാടുകൾ",
      "റിപ്പോർട്ടുകൾ",
      "ഉപയോക്താക്കൾ",
      "ക്രമീകരണങ്ങൾ",
      "ലോഗ് ഔട്ട്",
    ],
    kn: [
      "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      "ವಿದ್ಯಾರ್ಥಿಗಳು",
      "ಕಾಲೇಜುಗಳು",
      "ಕೋರ್ಸ್‌ಗಳು",
      "ಅರ್ಜಿಗಳು",
      "ವಹಿವಾಟುಗಳು",
      "ವರದಿಗಳು",
      "ಬಳಕೆದಾರರು",
      "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      "ಲಾಗ್ ಔಟ್",
    ],
    bn: [
      "ড্যাশবোর্ড",
      "শিক্ষার্থী",
      "কলেজ",
      "কোর্স",
      "আবেদন",
      "লেনদেন",
      "রিপোর্ট",
      "ব্যবহারকারী",
      "সেটিংস",
      "লগ আউট",
    ],
    mr: [
      "डॅशबोर्ड",
      "विद्यार्थी",
      "महाविद्यालये",
      "अभ्यासक्रम",
      "अर्ज",
      "व्यवहार",
      "अहवाल",
      "वापरकर्ते",
      "सेटिंग्ज",
      "लॉग आउट",
    ],
    gu: [
      "ડેશબોર્ડ",
      "વિદ્યાર્થીઓ",
      "કોલેજો",
      "અભ્યાસક્રમો",
      "અરજીઓ",
      "વ્યવહારો",
      "અહેવાલો",
      "વપરાશકર્તાઓ",
      "સેટિંગ્સ",
      "લોગ આઉટ",
    ],
    pa: [
      "ਡੈਸ਼ਬੋਰਡ",
      "ਵਿਦਿਆਰਥੀ",
      "ਕਾਲਜ",
      "ਕੋਰਸ",
      "ਅਰਜ਼ੀਆਂ",
      "ਲੈਣ-ਦੇਣ",
      "ਰਿਪੋਰਟਾਂ",
      "ਉਪਭੋਗਤਾ",
      "ਸੈਟਿੰਗਾਂ",
      "ਲੌਗ ਆਉਟ",
    ],
    or: [
      "ଡ୍ୟାସବୋର୍ଡ",
      "ଛାତ୍ରଛାତ୍ରୀ",
      "କଲେଜ",
      "ପାଠ୍ୟକ୍ରମ",
      "ଆବେଦନ",
      "କାରବାର",
      "ରିପୋର୍ଟ",
      "ବ୍ୟବହାରକାରୀ",
      "ସେଟିଂସ",
      "ଲଗ୍ ଆଉଟ",
    ],
    ur: [
      "ڈیش بورڈ",
      "طلبہ",
      "کالجز",
      "کورسز",
      "درخواستیں",
      "لین دین",
      "رپورٹس",
      "صارفین",
      "ترتیبات",
      "لاگ آؤٹ",
    ],
    as: [
      "ডেছব'ৰ্ড",
      "ছাত্ৰ-ছাত্ৰী",
      "মহাবিদ্যালয়",
      "পাঠ্যক্ৰম",
      "আবেদন",
      "লেনদেন",
      "প্ৰতিবেদন",
      "ব্যৱহাৰকাৰী",
      "ছেটিংছ",
      "লগ আউট",
    ],
    ne: [
      "ड्यासबोर्ड",
      "विद्यार्थीहरू",
      "कलेजहरू",
      "पाठ्यक्रमहरू",
      "आवेदनहरू",
      "कारोबारहरू",
      "प्रतिवेदनहरू",
      "प्रयोगकर्ताहरू",
      "सेटिङहरू",
      "लग आउट",
    ],
  }).map(([k, v]) => [k, Object.fromEntries(NAV.map((n, i) => [n, v[i]]))]),
);
const DICT = { ta: TA, hi: HI, te: TE, ...XL };
const LOCALE = { en: "en-IN", ta: "ta-IN", hi: "hi-IN", te: "te-IN" };
Object.assign(LOCALE, {
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  pt: "pt-BR",
  it: "it-IT",
  ru: "ru-RU",
  ar: "ar-SA",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  id: "id-ID",
  ml: "ml-IN",
  kn: "kn-IN",
  bn: "bn-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  pa: "pa-IN",
  or: "or-IN",
  ur: "ur-IN",
  as: "as-IN",
  ne: "ne-NP",
});

/* ---------- 4. CONTEXT + SMALL PARTS ---------- */
const Ctx = createContext(null);
const useS = () => useContext(Ctx);

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`sc-tg ${on ? "on" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!on);
      }}
    >
      <i />
    </button>
  );
}

function Choices({ opts, value, onPick }) {
  return (
    <div className="sc-choices">
      {opts.map(([v, label, hint]) => (
        <button
          type="button"
          key={v}
          className={`sc-choice ${v === value ? "on" : ""}`}
          onClick={() => onPick(v)}
        >
          <span>
            <b>{label}</b>
            {hint && <small>{hint}</small>}
          </span>
          <em>
            <Icon n="check" size={14} />
          </em>
        </button>
      ))}
    </div>
  );
}

function Form({ fields, init, onSave, validate }) {
  const { t } = useS();
  const [v, setV] = useState(init);
  const [er, setEr] = useState({});
  const submit = (e) => {
    e.preventDefault();
    const bad = Object.fromEntries(
      Object.entries(validate ? validate(v) : {}).filter(([, m]) => m),
    );
    setEr(bad);
    if (!Object.keys(bad).length) onSave(v);
  };
  return (
    <form className="sc-form" onSubmit={submit} noValidate>
      {fields.map(([k, label, type = "text", ro]) => (
        <label key={k}>
          <span>{t(label)}</span>
          <input
            type={type}
            value={v[k]}
            readOnly={ro}
            className={er[k] ? "bad" : ""}
            onChange={(e) => setV({ ...v, [k]: e.target.value })}
          />
          {er[k] && <small>{t(er[k])}</small>}
        </label>
      ))}
      <button className="sc-btn" type="submit">
        {t("Save changes")}
      </button>
    </form>
  );
}

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="sc-ov" onClick={onClose}>
      <div
        className="sc-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <h3>{title}</h3>
          <button
            type="button"
            className="sc-x"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon n="x" size={18} />
          </button>
        </header>
        <div className="sc-mb">{children}</div>
      </div>
    </div>
  );
}

/* ---------- 5. PANELS (what opens when a row is clicked) ---------- */
function Panel({ id, close }) {
  const { t, s, set, fmt, toast } = useS();
  const [gone, setGone] = useState([]);
  const [prog, setProg] = useState(null);
  const done = (m = "Saved") => {
    toast(t(m));
    close();
  };
  const logList = (rows) => (
    <ul className="sc-list">
      {rows.map(([a, h], i) => (
        <li key={i}>
          <b>{a}</b>
          <small>{fmt(new Date(Date.now() - h * 36e5))}</small>
        </li>
      ))}
    </ul>
  );

  const backup = () => {
    setProg(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 8 + Math.random() * 10;
      if (p >= 100) {
        clearInterval(iv);
        setProg(100);
        set({ backup: new Date().toISOString() });
        toast(t("Saved"));
      } else setProg(p);
    }, 160);
  };

  switch (id) {
    case "profile":
    case "edit":
      return (
        <Form
          init={s.profile}
          onSave={(v) => {
            set({ profile: v });
            done();
          }}
          fields={[
            ["name", "Full name"],
            ["email", "Email", "email"],
            ["phone", "Phone", "tel"],
            ["role", "Role", "text", true],
          ]}
        />
      );
    case "org":
      return (
        <Form
          init={s.org}
          onSave={(v) => {
            set({ org: v });
            done();
          }}
          fields={[
            ["name", "Organization name"],
            ["type", "Type"],
            ["city", "City"],
            ["website", "Website"],
          ]}
        />
      );
    case "password":
      return (
        <Form
          init={{ cur: "", nw: "", cf: "" }}
          onSave={() => done("Password updated")}
          fields={[
            ["cur", "Current password", "password"],
            ["nw", "New password", "password"],
            ["cf", "Confirm new password", "password"],
          ]}
          validate={(v) => ({
            ...(!v.cur && { cur: "Enter your current password" }),
            ...(v.nw.length < 8 && { nw: "Use at least 8 characters" }),
            ...(v.cf !== v.nw && { cf: "Passwords do not match" }),
          })}
        />
      );
    case "lang":
      return (
        <Choices
          value={s.lang}
          onPick={(v) => set({ lang: v })}
          opts={[
            ["en", "English", "Default"],
            ["ta", "தமிழ்", "Tamil"],
            ["hi", "हिन्दी", "Hindi"],
            ["te", "తెలుగు", "Telugu"],
          ]}
        />
      );
    case "datetime":
      return (
        <>
          <h4>{t("Timezone")}</h4>
          <Choices value={s.tz} onPick={(v) => set({ tz: v })} opts={TZ} />
          <h4>{t("Date format")}</h4>
          <Choices
            value={s.dateFmt}
            onPick={(v) => set({ dateFmt: v })}
            opts={DF.map((f) => [f, f, fmt(new Date(), false, f)])}
          />
          <div className="sc-line">
            <span>{t("12-hour clock")}</span>
            <Toggle
              on={s.hour12}
              onChange={(v) => set({ hour12: v })}
              label="12h"
            />
          </div>
        </>
      );
    case "theme":
      return (
        <Choices
          value={s.theme}
          onPick={(v) => set({ theme: v })}
          opts={[
            ["light", t("Light"), "White and bright"],
            ["dark", t("Dark"), "Easy on the eyes"],
            ["system", t("System"), "Follow device setting"],
          ]}
        />
      );
    case "dash":
      return (
        <Choices
          value={s.dash}
          onPick={(v) => {
            set({ dash: v });
            toast(t("Saved"));
          }}
          opts={["Overview", "Students", "Colleges", "Transactions"].map(
            (x) => [x, t(x)],
          )}
        />
      );
    case "twofa":
      return (
        <>
          <div className="sc-line">
            <span>{t("Two-Factor Authentication")}</span>
            <Toggle
              on={s.twofa}
              onChange={(v) => set({ twofa: v })}
              label="2FA"
            />
          </div>
          {s.twofa && (
            <div className="sc-reveal">
              <Choices
                value={s.method}
                onPick={(v) => set({ method: v })}
                opts={[
                  ["Authenticator app", "Authenticator app", "Recommended"],
                  ["SMS code", "SMS code", s.profile.phone],
                  ["Email code", "Email code", s.profile.email],
                ]}
              />
            </div>
          )}
        </>
      );
    case "logins":
      return (
        <ul className="sc-list">
          {DEVICES.map(([a, b, h]) => (
            <li key={a}>
              <b>{a}</b>
              <small>
                {b} - {h ? fmt(new Date(Date.now() - h * 36e5)) : "Now"}
              </small>
            </li>
          ))}
        </ul>
      );
    case "sessions":
      return (
        <ul className="sc-list">
          {DEVICES.filter(([a]) => !gone.includes(a)).map(([a, b, h]) => (
            <li key={a}>
              <span>
                <b>{a}</b>
                <small>{b}</small>
              </span>
              {h ? (
                <button
                  type="button"
                  className="sc-link"
                  onClick={() => {
                    setGone([...gone, a]);
                    toast(t("Saved"));
                  }}
                >
                  {t("Revoke")}
                </button>
              ) : (
                <em className="sc-pill">Active</em>
              )}
            </li>
          ))}
        </ul>
      );
    case "roles":
      return (
        <ul className="sc-list">
          {Object.entries(s.roles).map(([r, lv]) => (
            <li key={r}>
              <b>{r}</b>
              <select
                value={lv}
                onChange={(e) =>
                  set({ roles: { ...s.roles, [r]: e.target.value } })
                }
              >
                {["Full access", "Read & write", "Read only"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      );
    case "p-access":
      return (
        <ul className="sc-list">
          {[
            ["contact", "Contact details"],
            ["marks", "Marks & documents"],
            ["pay", "Payment details"],
          ].map(([k, l]) => (
            <li key={k}>
              <b>{l}</b>
              <Toggle
                on={s.access[k]}
                label={l}
                onChange={(v) => set({ access: { ...s.access, [k]: v } })}
              />
            </li>
          ))}
        </ul>
      );
    case "p-mask":
      return (
        <>
          <div className="sc-line">
            <span>{t("Contact Information Masking")}</span>
            <Toggle
              on={s.mask}
              onChange={(v) => set({ mask: v })}
              label="mask"
            />
          </div>
          <div className="sc-preview">
            <small>Preview</small>
            <b>{s.mask ? "+91 98••• ••210" : s.profile.phone}</b>
            <b>{s.mask ? "ra••••@gmail.com" : "rahul@gmail.com"}</b>
          </div>
        </>
      );
    case "p-ret":
      return (
        <Choices
          value={s.retention}
          onPick={(v) => {
            set({ retention: v });
            toast(t("Saved"));
          }}
          opts={["3 months", "6 months", "12 months", "24 months"].map((x) => [
            x,
            x,
          ])}
        />
      );
    case "p-policy":
      return (
        <>
          <p className="sc-text">
            We store student and college data only to run admissions on
            StudentConnect. Contact details are shared with a college only after
            a lead is purchased, and you can ask for deletion at any time.
          </p>
          <div className="sc-line">
            <span>Share anonymized usage data</span>
            <Toggle
              on={!!s.anon}
              onChange={(v) => set({ anon: v })}
              label="anon"
            />
          </div>
        </>
      );
    case "m-backup":
      return (
        <>
          <p className="sc-text">
            {t("Last backup")}: <b>{fmt(new Date(s.backup))}</b>
          </p>
          {prog !== null && (
            <div className="sc-bar big">
              <i style={{ width: `${prog}%` }} />
            </div>
          )}
          <button
            type="button"
            className="sc-btn"
            disabled={prog !== null && prog < 100}
            onClick={backup}
          >
            {prog === 100 ? "Backup complete" : t("Back up now")}
          </button>
        </>
      );
    case "m-health":
      return (
        <ul className="sc-list">
          {["Web server", "Database", "Payment gateway", "Email service"].map(
            (x) => (
              <li key={x}>
                <b>{x}</b>
                <em className="sc-pill">{t("Healthy")}</em>
              </li>
            ),
          )}
        </ul>
      );
    case "m-storage":
      return (
        <>
          <div className="sc-bar big">
            <i style={{ width: "42%" }} />
          </div>
          <ul className="sc-list">
            {[
              ["Documents", "18%"],
              ["Images", "14%"],
              ["Logs", "6%"],
              ["Other", "4%"],
            ].map(([a, b]) => (
              <li key={a}>
                <b>{a}</b>
                <small>{b}</small>
              </li>
            ))}
          </ul>
        </>
      );
    default:
      return LOGS[id] ? logList(LOGS[id]) : null;
  }
}

/* ---------- 6. ROW + CARD ---------- */
function Row({ r, onOpen }) {
  const { t, s, set, fmt } = useS();
  const [id, icon, title, sub] = r;
  let tg = null;
  if (id.startsWith("n-")) {
    const k = id.slice(2);
    tg = [s.notifs[k], (v) => set({ notifs: { ...s.notifs, [k]: v } })];
  }
  if (id === "m-mode") tg = [s.maint, (v) => set({ maint: v })];
  let right = (
    <span className="sc-chev">
      <Icon n="chev" size={16} />
    </span>
  );
  if (tg) right = <Toggle on={tg[0]} onChange={tg[1]} label={t(title)} />;
  if (id === "profile")
    right = <span className="sc-badge">{t("Administrator")}</span>;
  if (id === "m-backup")
    right = <span className="sc-pill">{t("Success")}</span>;
  if (id === "m-health")
    right = <span className="sc-pill">{t("Healthy")}</span>;
  if (id === "m-storage")
    right = (
      <span className="sc-store">
        <span className="sc-bar">
          <i />
        </span>
        42%
      </span>
    );
  return (
    <div
      className={`sc-row${tg ? " has-toggle" : ""}`}
      role={tg ? undefined : "button"}
      tabIndex={tg ? undefined : 0}
      onClick={() => {
        if (!tg) onOpen(id);
      }}
      onKeyDown={(e) => {
        if (!tg && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onOpen(id);
        }
      }}
    >
      <span className="sc-ico">
        <Icon n={icon} size={17} />
      </span>
      <span className="sc-rt">
        <b>{t(title)}</b>
        <small>
          {id === "m-backup"
            ? `${t("Last backup")}: ${fmt(new Date(s.backup))}`
            : t(sub)}
        </small>
      </span>
      {right}
    </div>
  );
}

function Card({ sec, rows, shut, toggle, onOpen, i }) {
  const { t } = useS();
  return (
    <section
      className={`sc-card span${sec.span} t-${sec.tone}`}
      style={{ "--d": `${i * 60}ms` }}
    >
      <button
        type="button"
        className="sc-head"
        onClick={toggle}
        aria-expanded={!shut}
      >
        <span className="sc-hico">
          <Icon n={sec.icon} size={22} />
        </span>
        <span className="sc-ht">
          <h2>{t(sec.title)}</h2>
          <p>{t(sec.sub)}</p>
        </span>
        <span className={`sc-chev ${shut ? "shut" : ""}`}>
          <Icon n="chev" size={18} />
        </span>
      </button>
      <div className={`sc-collapse ${shut ? "shut" : ""}`}>
        <div className="sc-rows">
          {rows.map((r) => (
            <Row key={r[0]} r={r} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. LAYOUT ---------- */
function logout() {
  let keep = null;
  try {
    keep = localStorage.getItem(KEY);
    localStorage.clear();
    sessionStorage.clear();
    if (keep) localStorage.setItem(KEY, keep);
  } catch {
    /* storage unavailable */
  }
  document.querySelector(".um-app")?.classList.add("is-leaving");
  setTimeout(() => window.location.replace("/login"), 350);
}

function Sidebar({ open, onClose }) {
  const { t, s } = useS();
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
          {MENU.map(([label, icon, path], i) => (
            <NavLink
              key={label}
              to={path}
              style={{ "--i": i }}
              onClick={onClose}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span>{icon}</span>
              {t(label)}
            </NavLink>
          ))}
        </nav>
        <div className="um-sidebar-foot">
          <div className="um-user">
            <span className="um-avatar">
              {s.profile.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <strong>{s.profile.name}</strong>
              <small>Super Admin</small>
            </div>
          </div>
          <button type="button" className="um-logout" onClick={logout}>
            ↪ {t("Logout")}
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ q, setQ, onMenu }) {
  const { t, s, fmt } = useS();
  const [bell, setBell] = useState(false);
  const [seen, setSeen] = useState(false);
  return (
    <header className="um-topbar">
      <button
        type="button"
        className="um-burger"
        onClick={onMenu}
        aria-label="Open navigation menu"
      >
        <Icon n="menu" size={18} />
      </button>
      <label className="um-search top">
        <Icon n="search" size={16} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Search students, colleges, leads...")}
        />
      </label>
      <div className="um-bellwrap">
        <button
          type="button"
          className="um-bell"
          aria-label={t("Notifications")}
          onClick={() => {
            setBell(!bell);
            setSeen(true);
          }}
        >
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
            {!seen && <circle className="dot" cx="19.5" cy="4.5" r="3" />}
          </svg>
        </button>
        {bell && (
          <div className="sc-drop" onMouseLeave={() => setBell(false)}>
            <h4>{t("Notifications")}</h4>
            {ALERTS.map(([a, h]) => (
              <p key={a}>
                <b>{a}</b>
                <small>{fmt(new Date(Date.now() - h * 36e5))}</small>
              </p>
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        className="um-profile"
        title={t("Logout")}
        aria-label="Admin - click to logout"
        onClick={logout}
      >
        <span className="um-profile-icon">
          {s.profile.name.charAt(0).toUpperCase()}
        </span>
        <span className="um-profile-copy">
          <strong>{s.profile.name}</strong>
          <small>Super Admin</small>
        </span>
        <span className="um-profile-chev">⌄</span>
      </button>
    </header>
  );
}

/* ---------- 7b. SPOTLIGHT (animated control-center strip + LIVE backend data) ---------- */
/* BACKEND: set VITE_API_URL in .env (e.g. http://localhost:5000/api) or edit API_BASE / EP below to match your server */
const API_BASE = (
  import.meta.env?.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");
const EP = {
  health: "/health",
  students: "/students",
  colleges: "/colleges",
  applications: "/applications",
  transactions: "/transactions",
  activity: "/activity",
};
const REFRESH_MS = 30000;
/* shown while the backend is not reachable; replaced by live numbers automatically once it connects */
const DEMO = {
  students: 12480,
  colleges: 342,
  applications: 3920,
  transactions: 1865,
};
const DEMO_FEED = [
  "SNS College approved",
  "PSG College - 50 profiles purchased",
  "New college verification request",
  "KG College - Diamond plan activated",
  "Database backup completed",
];

const listOf = (d) => {
  if (Array.isArray(d)) return d;
  const x = d?.data ?? d?.items ?? d?.results ?? d?.rows;
  return Array.isArray(x) ? x : null;
};
const countOf = (d) => {
  const l = listOf(d);
  if (l) return l.length;
  const n = Number(
    d?.count ?? d?.total ?? d?.totalCount ?? d?.data?.count ?? d?.data?.total,
  );
  return Number.isFinite(n) ? n : null;
};
const textOf = (x) =>
  typeof x === "string"
    ? x
    : x?.message || x?.title || x?.action || x?.description || x?.text || "";

async function api(path, signal) {
  let token = null;
  try {
    token =
      sessionStorage.getItem("adminToken") ||
      sessionStorage.getItem("token") ||
      localStorage.getItem("token");
  } catch {
    /* storage unavailable */
  }
  const res = await fetch(`${API_BASE}${path}`, {
    signal,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json().catch(() => ({}));
}

function useLive() {
  const [st, setSt] = useState({
    state: "loading",
    busy: true,
    ms: null,
    at: null,
    n: {},
    feed: [],
  });
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setTick((x) => x + 1), REFRESH_MS);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    let dead = false;
    const ac = new AbortController();
    const kill = setTimeout(() => ac.abort(), 8000);
    const t0 = performance.now();
    const keys = ["students", "colleges", "applications", "transactions"];
    setSt((p) => ({ ...p, busy: true }));
    Promise.allSettled([
      api(EP.health, ac.signal).then(() => Math.round(performance.now() - t0)),
      ...keys.map((k) => api(EP[k], ac.signal)),
      api(EP.activity, ac.signal),
    ]).then(([h, ...rest]) => {
      clearTimeout(kill);
      if (dead) return;
      let ok = h.status === "fulfilled";
      const n = {};
      keys.forEach((k, i) => {
        const r = rest[i];
        n[k] = r.status === "fulfilled" ? countOf(r.value) : null;
        if (r.status === "fulfilled") ok = true;
      });
      const act = rest[keys.length];
      const feed =
        act.status === "fulfilled"
          ? (listOf(act.value) || []).slice(0, 6).map(textOf).filter(Boolean)
          : [];
      setSt((p) => ({
        state: ok ? "live" : "offline",
        busy: false,
        ms: h.status === "fulfilled" ? h.value : null,
        at: new Date(),
        n: ok ? n : p.n,
        feed: ok ? feed : p.feed,
      }));
    });
    return () => {
      dead = true;
      clearTimeout(kill);
      ac.abort();
    };
  }, [tick]);
  return { ...st, refresh: () => setTick((x) => x + 1) };
}

function useCount(to, ms = 1100) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    let raf;
    let t0;
    const a = from.current;
    const step = (ts) => {
      t0 = t0 ?? ts;
      const p = Math.min((ts - t0) / ms, 1);
      const val = Math.round(a + (to - a) * (1 - Math.pow(1 - p, 3)));
      from.current = val;
      setV(val);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return v;
}

const glow = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

function Tile({ icon, label, to, note, i }) {
  const v = useCount(to ?? 0);
  return (
    <div className="sx-tile" style={{ "--i": i }} onMouseMove={glow}>
      <span className="sx-tico">
        <Icon n={icon} size={18} />
      </span>
      <b>{to == null ? "—" : v.toLocaleString("en-IN")}</b>
      <span>{label}</span>
      <small>{note}</small>
    </div>
  );
}

function Spotlight() {
  const { s, set, toast, fmt } = useS();
  const live = useLive();
  const isDark =
    s.theme === "dark" ||
    (s.theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  const score =
    40 +
    (s.twofa ? 30 : 0) +
    (s.mask ? 15 : 0) +
    (s.access.pay ? 0 : 10) +
    (s.maint ? 0 : 5);
  const hr = +new Intl.DateTimeFormat("en-GB", {
    timeZone: s.tz,
    hour: "2-digit",
    hour12: false,
  }).format(new Date());
  const hello =
    hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";
  const C = 2 * Math.PI * 52;
  const score_v = useCount(score);
  const chips = [
    [
      "palette",
      isDark ? "Dark mode" : "Light mode",
      isDark,
      () => {
        set({ theme: isDark ? "light" : "dark" });
        toast("Theme switched");
      },
    ],
    [
      "shieldok",
      "Two-factor",
      s.twofa,
      () => {
        set({ twofa: !s.twofa });
        toast(s.twofa ? "2FA turned off" : "2FA turned on");
      },
    ],
    [
      "eyeoff",
      "Mask contacts",
      s.mask,
      () => {
        set({ mask: !s.mask });
        toast(s.mask ? "Masking off" : "Masking on");
      },
    ],
    [
      "gear",
      "Maintenance",
      s.maint,
      () => {
        set({ maint: !s.maint });
        toast(s.maint ? "Maintenance off" : "Maintenance on");
      },
    ],
  ];
  const have = Object.values(live.n).some((v) => v != null);
  const isLive = live.state === "live";
  const demo = live.state === "offline" && !have;
  const N = demo ? DEMO : live.n;
  const lines = [];
  if (demo) lines.push(...DEMO_FEED);
  else if (live.feed.length) lines.push(...live.feed);
  else {
    if (N.students != null) lines.push(`${N.students} students registered`);
    if (N.colleges != null)
      lines.push(`${N.colleges} colleges on the platform`);
    if (N.applications != null)
      lines.push(`${N.applications} applications received`);
    if (N.transactions != null)
      lines.push(`${N.transactions} transactions recorded`);
  }
  if (!lines.length) lines.push("Connecting to the server…");
  const base = [...lines, ...lines];
  const feed = [...base, ...base];
  const note = isLive
    ? "Live from server"
    : demo
      ? "Sample data"
      : live.state === "loading"
        ? "Connecting…"
        : "Last synced data";
  const badge = isLive
    ? "Live"
    : demo
      ? "Demo"
      : live.state === "loading"
        ? "Sync"
        : "Offline";
  return (
    <div className="sx-wrap">
      <section className="sx-hero" onMouseMove={glow}>
        <i className="sx-orb o1" />
        <i className="sx-orb o2" />
        <i className="sx-orb o3" />
        {[8, 22, 38, 55, 72, 88].map((x, k) => (
          <i
            key={x}
            className="sx-spark"
            style={{
              left: `${x}%`,
              animationDelay: `${k * 1.1}s`,
              animationDuration: `${6 + (k % 3) * 2}s`,
            }}
          />
        ))}
        <div className="sx-copy">
          <span className="sx-kick">
            <em /> Control Center
          </span>
          <h2>
            {hello}, {s.profile.name}
          </h2>
          <p>
            {score >= 90
              ? "Everything looks great — your platform is fully secured."
              : "Turn on a few more safeguards to reach a perfect score."}
          </p>
          <div className="sx-chips">
            {chips.map(([ic, lb, st, fn]) => (
              <button
                key={lb}
                type="button"
                className={`sx-chip${st ? " on" : ""}`}
                onClick={fn}
                aria-pressed={st}
              >
                <Icon n={ic} size={15} />
                {lb}
                <i />
              </button>
            ))}
          </div>
        </div>
        <div className="sx-ring" aria-label={`Security score ${score}%`}>
          <svg viewBox="0 0 120 120">
            <defs>
              <linearGradient id="sxg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7dd3fc" />
                <stop offset="1" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="52" className="sx-trk" />
            <circle
              cx="60"
              cy="60"
              r="52"
              className="sx-arc"
              style={{
                strokeDasharray: C,
                "--c": C,
                "--off": C * (1 - score / 100),
              }}
            />
          </svg>
          <span className="sx-orbit">
            <i />
          </span>
          <div className="sx-num">
            <b>{score_v}</b>
            <small>Security</small>
          </div>
        </div>
      </section>
      <div className="sx-tiles">
        <Tile i={0} icon="users" label="Students" to={N.students} note={note} />
        <Tile
          i={1}
          icon="building"
          label="Colleges"
          to={N.colleges}
          note={note}
        />
        <Tile
          i={2}
          icon="file"
          label="Applications"
          to={N.applications}
          note={note}
        />
        <Tile
          i={3}
          icon="money"
          label="Transactions"
          to={N.transactions}
          note={note}
        />
      </div>
      <div className="sx-feed" aria-label="Live activity">
        <span
          className={`sx-live${isLive ? "" : demo ? " demo" : " off"}`}
          title={
            demo
              ? `Backend not reachable at ${API_BASE} - showing sample data`
              : ""
          }
        >
          <i /> {badge}
        </span>
        <div className="sx-roll">
          <div className="sx-track">
            {feed.map((a, k) => (
              <span key={k}>
                <Icon n="bell" size={13} />
                {a}
              </span>
            ))}
          </div>
        </div>
        <span className="sx-sync">
          {live.at && (
            <span>
              {isLive && live.ms != null ? `${live.ms} ms · ` : ""}
              {fmt(live.at)}
            </span>
          )}
          <button
            type="button"
            className={`sx-rf${live.busy ? " spin" : ""}`}
            onClick={live.refresh}
            aria-label="Refresh live data"
            title="Refresh"
          >
            <Icon n="pulse" size={15} />
          </button>
        </span>
      </div>
      <Extras live={live} demo={demo} />
    </div>
  );
}

const LANGS = [
  ["en", "English", "English", "A", 1],
  ["ta", "தமிழ்", "Tamil", "அ", 1],
  ["hi", "हिन्दी", "Hindi", "अ", 1],
  ["te", "తెలుగు", "Telugu", "అ", 1],
  ["ml", "മലയാളം", "Malayalam", "മ"],
  ["kn", "ಕನ್ನಡ", "Kannada", "ಕ"],
  ["bn", "বাংলা", "Bengali", "ব"],
  ["mr", "मराठी", "Marathi", "म"],
  ["gu", "ગુજરાતી", "Gujarati", "ગ"],
  ["pa", "ਪੰਜਾਬੀ", "Punjabi", "ਪ"],
  ["or", "ଓଡ଼ିଆ", "Odia", "ଓ"],
  ["as", "অসমীয়া", "Assamese", "অ"],
  ["ur", "اردو", "Urdu", "ا"],
  ["ne", "नेपाली", "Nepali", "न"],
  ["es", "Español", "Spanish", "E"],
  ["fr", "Français", "French", "F"],
  ["de", "Deutsch", "German", "D"],
  ["pt", "Português", "Portuguese", "P"],
  ["it", "Italiano", "Italian", "I"],
  ["ru", "Русский", "Russian", "Р"],
  ["ar", "العربية", "Arabic", "ع"],
  ["zh", "中文", "Chinese", "中"],
  ["ja", "日本語", "Japanese", "日"],
  ["ko", "한국어", "Korean", "한"],
  ["id", "Bahasa Indonesia", "Indonesian", "B"],
];

function LangPick({ i }) {
  const { s, set, toast } = useS();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const box = useRef(null);
  const inp = useRef(null);
  useEffect(() => {
    if (!open) return;
    inp.current?.focus({ preventScroll: true });
    const off = (e) => {
      if (!box.current?.contains(e.target)) {
        setOpen(false);
        setQ("");
      }
    };
    const esc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQ("");
      }
    };
    document.addEventListener("mousedown", off);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", off);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  const cur = LANGS.find((l) => l[0] === s.lang) || LANGS[0];
  const needle = q.trim().toLowerCase();
  const list = LANGS.filter(
    (l) => !needle || `${l[1]} ${l[2]}`.toLowerCase().includes(needle),
  );
  return (
    <div
      className={`sx-lang${open ? " open" : ""}`}
      ref={box}
      style={{ "--i": i }}
    >
      <button
        type="button"
        className="sx-act"
        onMouseMove={glow}
        onClick={() => {
          setOpen((o) => !o);
          setQ("");
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>
          <Icon n="globe" size={20} />
        </span>
        <b>Switch language</b>
        <small key={cur[0]} className="sx-swap">
          Now: {cur[1]}
        </small>
        <i className="sx-caret">
          <Icon n="chev" size={14} />
        </i>
      </button>
      {open && (
        <div className="sx-menu">
          <label className="sx-find">
            <Icon n="search" size={15} />
            <input
              ref={inp}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search languages…"
              aria-label="Search languages"
            />
          </label>
          <ul className="sx-opts" role="listbox">
            {list.map(([code, native, en, glyph], k) => (
              <li
                key={code}
                role="option"
                aria-selected={code === s.lang}
                style={{ "--k": Math.min(k, 8) }}
              >
                <button
                  type="button"
                  className={code === s.lang ? "on" : ""}
                  onClick={() => {
                    set({ lang: code });
                    toast(native);
                    setOpen(false);
                    setQ("");
                  }}
                >
                  <span className="sx-gl">{glyph}</span>
                  <span className="sx-ln">
                    <b>{native}</b>
                    <small>{en}</small>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5 10-10" />
                  </svg>
                </button>
              </li>
            ))}
            {!list.length && <li className="sx-none">No language found</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

function Extras({ live, demo }) {
  const { s, set, toast } = useS();
  const allOn = Object.values(s.notifs).every(Boolean);
  const todo = [
    ["Two-factor authentication", s.twofa, () => set({ twofa: !s.twofa })],
    ["Contact masking enabled", s.mask, () => set({ mask: !s.mask })],
    [
      "All alert channels on",
      allOn,
      () =>
        set({
          notifs: {
            reg: !allOn,
            col: !allOn,
            app: !allOn,
            txn: !allOn,
            sys: !allOn,
          },
        }),
    ],
    ["Maintenance mode off", !s.maint, () => set({ maint: !s.maint })],
    [
      "Payment data restricted",
      !s.access.pay,
      () => set({ access: { ...s.access, pay: !s.access.pay } }),
    ],
  ];
  const done = todo.filter((x) => x[1]).length;
  const days = Math.max(
    0,
    Math.floor((new Date().getTime() - new Date(s.backup).getTime()) / 864e5),
  );
  const isLive = live.state === "live";
  const fields = [
    s.profile.name,
    s.profile.email,
    s.profile.phone,
    s.profile.role,
    s.org.name,
    s.org.type,
    s.org.city,
    s.org.website,
  ];
  const prof = Math.round(
    (fields.filter((x) => String(x || "").trim()).length / fields.length) * 100,
  );
  const bars = [
    ["hdd", "Storage used", 42, "42%"],
    ["user", "Profile completeness", prof, `${prof}%`],
    [
      "server",
      "Server connection",
      isLive ? Math.max(20, 100 - Math.round((live.ms ?? 50) / 10)) : 0,
      isLive
        ? live.ms != null
          ? `${live.ms} ms`
          : "Online"
        : demo
          ? "Not connected"
          : "Checking…",
    ],
    [
      "db",
      "Last backup",
      Math.max(8, 100 - days * 4),
      days === 0 ? "Just now" : `${days} day${days === 1 ? "" : "s"} ago`,
    ],
  ];
  const tone = (v) => (v >= 70 ? "g" : v >= 40 ? "a" : "r");
  return (
    <>
      <div className="sx-duo">
        <section className="sx-box" style={{ "--i": 0 }}>
          <div className="sx-bh">
            <h3>Security checklist</h3>
            <span className={`sx-pct${done === todo.length ? " full" : ""}`}>
              {done}/{todo.length}
            </span>
          </div>
          <div className="sx-meter g">
            <i style={{ "--w": `${(done / todo.length) * 100}%` }} />
          </div>
          <div className="sx-todos">
            {todo.map(([label, ok, fn], k) => (
              <button
                key={label}
                type="button"
                className={`sx-todo${ok ? " ok" : ""}`}
                style={{ "--k": k }}
                onClick={fn}
              >
                <span className="sx-tick">
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5 10-10" />
                  </svg>
                </span>
                <span className="sx-tl">{label}</span>
                <em>{ok ? "Done" : "Fix"}</em>
              </button>
            ))}
          </div>
        </section>
        <section className="sx-box" style={{ "--i": 1 }}>
          <div className="sx-bh">
            <h3>System pulse</h3>
            <span className={`sx-pulse${isLive ? " on" : ""}`}>
              <i /> {isLive ? "Connected" : demo ? "Demo mode" : "Checking"}
            </span>
          </div>
          <div className="sx-bars">
            {bars.map(([ic, label, pct, val], k) => (
              <div className="sx-bar" key={label} style={{ "--k": k }}>
                <div className="sx-bt">
                  <span>
                    <Icon n={ic} size={15} />
                    {label}
                  </span>
                  <b>{val}</b>
                </div>
                <div className={`sx-meter ${tone(pct)}`}>
                  <i style={{ "--w": `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="sx-acts">
        <button
          type="button"
          className="sx-act"
          style={{ "--i": 0 }}
          onMouseMove={glow}
          onClick={() => {
            set({ backup: new Date().toISOString() });
            toast("Backup completed");
          }}
        >
          <span>
            <Icon n="db" size={20} />
          </span>
          <b>Back up now</b>
          <small>Create a fresh database backup</small>
        </button>
        <button
          type="button"
          className="sx-act"
          style={{ "--i": 1 }}
          onMouseMove={glow}
          onClick={() => {
            set({
              notifs: {
                reg: !allOn,
                col: !allOn,
                app: !allOn,
                txn: !allOn,
                sys: !allOn,
              },
            });
            toast(allOn ? "All alerts muted" : "All alerts enabled");
          }}
        >
          <span>
            <Icon n="bell" size={20} />
          </span>
          <b>{allOn ? "Mute all alerts" : "Enable all alerts"}</b>
          <small>Control every notification channel</small>
        </button>
        <LangPick i={2} />
        <NavLink
          to="/admin/colleges"
          className="sx-act"
          style={{ "--i": 3 }}
          onMouseMove={glow}
        >
          <span>
            <Icon n="building" size={20} />
          </span>
          <b>Review colleges</b>
          <small>Open college management</small>
        </NavLink>
      </div>
    </>
  );
}

/* ---------- 8. PAGE ---------- */
export default function Settings() {
  const [s, setS] = useState(load);
  const [open, setOpen] = useState(null);
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);
  const [shut, setShut] = useState({});
  const [msg, setMsg] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    if (!msg) return;
    const x = setTimeout(() => setMsg(""), 2200);
    return () => clearTimeout(x);
  }, [msg]);

  const set = (patch) => setS((p) => ({ ...p, ...patch }));
  const t = (x) => DICT[s.lang]?.[x] || x;
  const fmt = (d, time = true, f = s.dateFmt) => {
    const p = {};
    new Intl.DateTimeFormat("en-GB", {
      timeZone: s.tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(d)
      .forEach((x) => {
        p[x.type] = x.value;
      });
    const mon = new Intl.DateTimeFormat(LOCALE[s.lang] || "en-IN", {
      timeZone: s.tz,
      month: "short",
    }).format(d);
    const date = {
      "DD-MM-YYYY": `${p.day}-${p.month}-${p.year}`,
      "MM-DD-YYYY": `${p.month}-${p.day}-${p.year}`,
      "YYYY-MM-DD": `${p.year}-${p.month}-${p.day}`,
      "DD MMM YYYY": `${p.day} ${mon} ${p.year}`,
    }[f];
    if (!time) return date;
    return `${date}, ${new Intl.DateTimeFormat("en-US", { timeZone: s.tz, hour: "2-digit", minute: "2-digit", hour12: s.hour12 }).format(d)}`;
  };

  const dark =
    s.theme === "dark" ||
    (s.theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  const needle = q.trim().toLowerCase();
  const view = SEC.map((sec) => ({
    sec,
    rows: sec.rows.filter(
      (r) =>
        !needle ||
        `${t(r[2])} ${t(r[3])} ${t(sec.title)}`.toLowerCase().includes(needle),
    ),
  })).filter((x) => x.rows.length);

  return (
    <Ctx.Provider value={{ t, s, set, fmt, toast: setMsg }}>
      <style>{CSS}</style>
      <div
        className={`um-app ${open ? "um-paused" : ""}`}
        data-theme={dark ? "dark" : "light"}
      >
        <Sidebar open={menu} onClose={() => setMenu(false)} />
        <main className="um-main">
          <Topbar q={q} setQ={setQ} onMenu={() => setMenu(true)} />
          <div className="um-content">
            <div className="um-header">
              <div className="um-title">
                <span className="sc-gear">
                  <Icon n="gear" size={34} />
                </span>
                <div>
                  <h1>{t("Settings")}</h1>
                  <p>
                    {t(
                      "Manage your platform settings, preferences and system configurations",
                    )}
                  </p>
                </div>
              </div>
              <time className="sc-clock">
                <Icon n="clock" size={15} />
                {fmt(now)}
              </time>
            </div>
            <Spotlight />
            <div className="sc-grid">
              {view.map(({ sec, rows }, i) => (
                <Card
                  key={sec.id}
                  sec={sec}
                  rows={rows}
                  i={i}
                  shut={shut[sec.id] && !needle}
                  toggle={() => setShut({ ...shut, [sec.id]: !shut[sec.id] })}
                  onOpen={setOpen}
                />
              ))}
            </div>
            {!view.length && (
              <p className="sc-empty">{t("No settings match your search.")}</p>
            )}
          </div>
        </main>
        {open && (
          <Modal title={t(TITLES[open])} onClose={() => setOpen(null)}>
            <Panel id={open} close={() => setOpen(null)} />
          </Modal>
        )}
        {msg && (
          <div className="sc-toast" role="status">
            <Icon n="check" size={16} />
            {msg}
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}

/* ---------- 9. CSS ---------- */
const CSS = `
.um-app {
  --navy:#112746;
  --pr:#2177e8;
  --bg:#f4f7fc;
  --card:#fff;
  --line:#e6ebf3;
  --tx:#0f1b33;
  --mu:#66758f;
  --hov:#f1f5fd;
  position:fixed;
  inset:0;
  z-index:1;
  overflow-x:hidden;
  overflow-y:auto;
  display:flex;
  align-items:flex-start;
  text-align:left;
  font-size:14px;
  line-height:1.45;
  color-scheme:light;
  background:var(--bg);
  color:var(--tx);
  font-family:"Inter","Segoe UI",system-ui,sans-serif;
  transition:opacity .35s ease,background .3s
}
.um-app[data-theme=dark] {
  --bg:#0a1125;
  --card:#121b36;
  --line:#223055;
  --tx:#e8edff;
  --mu:#93a0c4;
  --hov:#18244a;
  color-scheme:dark
}
.um-app.is-leaving {
  opacity:0;
  pointer-events:none
}
.um-app *,.um-app *::before,.um-app *::after {
  box-sizing:border-box
}
.um-app h1,.um-app h2,.um-app h3,.um-app h4,.um-app p,.um-app ul {
  margin:0;
  padding:0;
  color:inherit;
  font-family:inherit;
  line-height:1.3
}
.um-app h1,.um-app h2,.um-app h3 {
  letter-spacing:0
}
.um-app ul {
  list-style:none
}
.um-app small {
  color:var(--mu)
}
:where(.um-app) button {
  font-family:inherit;
  font-size:inherit;
  cursor:pointer;
  border:0;
  padding:0;
  background:none;
  color:inherit;
  text-align:left;
  border-radius:0;
  line-height:inherit
}
.um-app :focus-visible {
  outline:2px solid var(--pr);
  outline-offset:2px
}
.um-app a {
  text-decoration:none
}
@keyframes scIn {
  from {
    opacity:0
  }
  to {
    opacity:1
  }
}
@keyframes scUp {
  from {
    opacity:0;
    transform:translateY(14px)
  }
  to {
    opacity:1;
    transform:none
  }
}
@keyframes scPop {
  from {
    opacity:0;
    transform:translateY(16px) scale(.96)
  }
  to {
    opacity:1;
    transform:none
  }
}
@keyframes umNavIn {
  from {
    opacity:0;
    transform:translateX(-18px)
  }
  to {
    opacity:1;
    transform:none
  }
}
@keyframes umBlink {
  0%,100% {
    opacity:1
  }
  50% {
    opacity:.25
  }
}
/* sidebar — exactly the same as the Users page */
.um-sidebar {
  position:sticky;
  top:0;
  width:236px;
  height:100vh;
  height:100dvh;
  flex-shrink:0;
  display:flex;
  flex-direction:column;
  background:#112746;
  color:#fff;
  overflow:hidden;
  z-index:60;
  transition:transform .35s cubic-bezier(.4,0,.2,1)
}
.um-app[data-theme=dark] .um-sidebar {
  background:#070d20
}
.um-brand {
  display:flex;
  align-items:center;
  gap:10px;
  flex-shrink:0;
  height:82px;
  padding:0 20px;
  border-bottom:1px solid rgba(255,255,255,.07)
}
.um-logo {
  display:grid;
  place-items:center;
  flex-shrink:0;
  width:40px;
  height:40px;
  font-size:20px;
  background:rgba(255,255,255,.1);
  border-radius:11px
}
.um-sidebar .um-brand strong {
  display:block;
  color:#fff;
  font-size:16px;
  font-weight:700;
  line-height:1.2
}
.um-sidebar .um-brand strong span {
  color:#58a1ff
}
.um-sidebar .um-brand small {
  display:block;
  margin-top:3px;
  color:#91a5c2;
  font-size:9px
}
.um-sidebar .um-menu-title {
  width:100%;
  margin:24px 0 10px;
  color:#6f86a7;
  font-size:9px;
  font-weight:700;
  letter-spacing:1px;
  text-align:center;
  text-transform:uppercase
}
.um-sidebar nav {
  display:flex;
  flex-direction:column;
  gap:4px;
  flex:1;
  min-height:0;
  overflow-y:scroll;
  width:calc(100% + 40px);
  margin-right:-40px;
  padding:0 52px 0 12px;
  scrollbar-width:none
}
.um-sidebar nav::-webkit-scrollbar {
  display:none
}
.um-sidebar nav a {
  display:flex;
  align-items:center;
  gap:12px;
  flex-shrink:0;
  height:43px;
  padding:0 13px;
  border-radius:8px;
  color:#afbdd1;
  text-decoration:none;
  font-size:12px;
  transition:background .2s,color .2s;
  animation:umNavIn .45s both;
  animation-delay:calc(var(--i,0) * 45ms)
}
.um-sidebar nav a span {
  width:20px;
  text-align:center;
  font-size:16px
}
.um-sidebar nav a:hover {
  background:rgba(255,255,255,.07);
  color:#fff
}
.um-sidebar nav a.active {
  background:#2177e8;
  color:#fff;
  box-shadow:0 6px 18px rgba(33,119,232,.2)
}
.um-sidebar-foot {
  flex-shrink:0;
  padding:14px;
  border-top:1px solid rgba(255,255,255,.07)
}
.um-user {
  display:flex;
  align-items:center;
  gap:10px;
  padding:12px;
  background:rgba(255,255,255,.055);
  border-radius:10px
}
.um-sidebar .um-user strong {
  display:block;
  color:#fff;
  font-size:12px;
  font-weight:700
}
.um-sidebar .um-user small {
  display:block;
  margin-top:2px;
  color:#8196b5;
  font-size:9px
}
.um-avatar {
  display:grid;
  place-items:center;
  flex-shrink:0;
  width:34px;
  height:34px;
  color:#fff;
  font-size:12px;
  font-weight:700;
  background:#28558e;
  border-radius:50%
}
.um-logout {
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  width:100%;
  height:34px;
  margin-top:8px;
  color:#93a6c0!important;
  font-size:11px;
  border-radius:8px;
  transition:background .2s,color .2s
}
.um-logout:hover {
  background:rgba(255,255,255,.07);
  color:#fff!important
}
.um-overlay {
  display:none
}
/* main + topbar (same as Users) */
.um-main {
  position:relative;
  flex:1;
  min-width:0;
  overflow:clip
}
.um-content {
  position:relative;
  z-index:1;
  padding:24px 28px 32px;
  max-width:1500px;
  margin:0 auto
}
.um-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 65px;
  box-sizing:border-box;
  padding:0 24px;
  background:rgba(255,255,255,.97);
  border-bottom:1px solid var(--line)
}
.um-burger {
  display:none;
  flex-shrink:0;
  width:40px;
  height:40px;
  place-items:center;
  color:var(--tx);
  background:var(--bg);
  border-radius:10px
}
.um-bellwrap {
  position:relative;
  margin-left:auto;
  flex-shrink:0
}
.um-bell {
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  width:36px;
  height:36px;
  padding:6px;
  color:#64748b!important;
  border-radius:8px;
  transition:background .2s
}
.um-bell svg {
  display:block;
  width:20px;
  height:20px
}
.um-bell:hover {
  background:var(--hov)
}
.um-bell .dot {
  fill:#f05260;
  animation:umBlink 1.2s ease-in-out infinite
}
.um-bell em {
  position:absolute;
  top:2px;
  right:1px;
  min-width:15px;
  height:15px;
  border-radius:8px;
  background:#f05260;
  color:#fff;
  font:700 9px/15px inherit;
  font-style:normal;
  text-align:center;
  animation:umBlink 1.2s ease-in-out infinite
}
.um-profile {
  display:flex;
  align-items:center;
  flex-shrink:0;
  gap:10px;
  padding:4px 0 4px 8px;
  color:var(--tx);
  border-radius:10px;
  transition:background .2s
}
.um-profile:hover {
  background:var(--hov)
}
.um-profile:hover .um-profile-chev {
  color:#e0384a
}
.um-profile-icon {
  display:grid;
  place-items:center;
  width:34px;
  height:34px;
  color:#fff;
  font-size:12px;
  font-weight:700;
  background:#194781;
  border-radius:50%
}
.um-profile-copy strong,.um-profile-copy small {
  display:block;
  white-space:nowrap
}
.um-profile-copy strong {
  font-size:12px;
  color:var(--tx)
}
.um-profile-copy small {
  margin-top:3px;
  font-size:10px
}
.um-profile-chev {
  color:#7186a6;
  font-size:11px
}
.um-search {
  display:flex;
  align-items:center;
  gap:8px;
  min-width:0;
  height:40px;
  padding:0 12px;
  color:#8294af;
  background:var(--bg);
  border:1px solid var(--line);
  border-radius:10px;
  transition:border-color .2s,box-shadow .2s
}
.um-search.top {
  flex: 1 1 auto;
  width: 100%;
  max-width: 520px
}
.um-search:focus-within {
  border-color:#2d8cff;
  box-shadow:0 0 0 3px rgba(45,140,255,.12)
}
.um-search svg {
  flex-shrink:0
}
.um-search input {
  flex:1;
  min-width:0;
  height:100%;
  font:inherit;
  font-size:13px;
  color:var(--tx);
  background:transparent;
  border:0;
  outline:0;
  padding:0;
  margin:0
}
.um-header {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  flex-wrap:wrap;
  margin-bottom:22px;
  animation:scUp .6s .1s both
}
.um-title {
  display:flex;
  align-items:center;
  gap:14px
}
.um-title h1 {
  font-size:26px;
  font-weight:800;
  color:#1d1a63
}
.um-app[data-theme=dark] .um-title h1 {
  color:#fff
}
.um-title p {
  margin-top:4px;
  font-size:14px;
  color:var(--mu)
}
.sc-gear {
  display:grid;
  color:var(--navy)
}
.sc-gear svg {
  animation:scSpin 6s linear infinite
}
@keyframes scSpin {
  to {
    transform:rotate(360deg)
  }
}
.um-app[data-theme=dark] .sc-gear {
  color:#9fb2ff
}
.sc-clock {
  display:flex;
  align-items:center;
  gap:7px;
  padding:7px 13px;
  border-radius:20px;
  background:var(--card);
  border:1px solid var(--line);
  font-size:12.5px;
  font-weight:600;
  color:var(--mu);
  font-variant-numeric:tabular-nums;
  white-space:nowrap
}
.sc-grid {
  display:grid;
  grid-template-columns:repeat(6,1fr);
  gap:16px;
  align-items:stretch
}
.span3 {
  grid-column:span 3
}
.span2 {
  grid-column:span 2
}
.sc-empty {
  text-align:center;
  color:var(--mu);
  padding:50px 0
}
.sc-drop {
  position:absolute;
  right:-8px;
  top:42px;
  width:290px;
  padding:12px;
  background:var(--card);
  border:1px solid var(--line);
  border-radius:14px;
  box-shadow:0 18px 40px rgba(15,26,58,.16);
  animation:scPop .22s;
  z-index:40
}
.sc-drop h4 {
  margin:2px 6px 8px;
  font-size:13px
}
.sc-drop p {
  padding:9px 8px;
  border-radius:10px;
  display:grid;
  gap:2px
}
.sc-drop p:hover {
  background:var(--hov)
}
.sc-drop b {
  font-size:12.5px;
  font-weight:600
}
.sc-drop small {
  font-size:11px
}
/* cards */
.t-blue {
  --c:#3556f5
}
.t-green {
  --c:#16b88a
}
.t-violet {
  --c:#7c4dff
}
.t-red {
  --c:#ef4455
}
.t-cyan {
  --c:#10aec2
}
.t-purple {
  --c:#8a4fe8
}
.t-navy {
  --c:#33508f
}
.sc-card {
  background:var(--card);
  border:1px solid var(--line);
  border-radius:14px;
  padding:16px 18px 10px;
  animation:scUp .55s both;
  animation-delay:var(--d);
  transition:box-shadow .25s,border-color .25s
}
.sc-card:hover {
  box-shadow:0 10px 28px rgba(30,50,120,.08);
  border-color:color-mix(in srgb,var(--c) 30%,var(--line))
}
.sc-head {
  width:100%;
  display:flex;
  align-items:center;
  gap:14px;
  padding:0 0 12px
}
.sc-hico,.sc-ico {
  display:grid;
  place-items:center;
  border-radius:50%;
  color:var(--c);
  background:color-mix(in srgb,var(--c) 13%,transparent);
  flex-shrink:0;
  transition:transform .3s
}
.sc-hico {
  width:48px;
  height:48px
}
.sc-ico {
  width:36px;
  height:36px
}
.sc-head:hover .sc-hico {
  transform:scale(1.08) rotate(-6deg)
}
.sc-ht {
  flex:1;
  min-width:0
}
.sc-ht h2 {
  margin:0;
  font-size:15.5px;
  font-weight:700
}
.sc-ht p {
  margin:3px 0 0;
  font-size:12.5px;
  color:var(--mu)
}
.sc-chev {
  display:grid;
  color:var(--mu);
  transition:transform .3s,color .2s
}
.sc-chev.shut {
  transform:rotate(90deg)
}
.sc-head:hover .sc-chev {
  color:var(--c)
}
.sc-collapse {
  display:grid;
  grid-template-rows:1fr;
  transition:grid-template-rows .35s ease
}
.sc-collapse.shut {
  grid-template-rows:0fr
}
.sc-rows {
  overflow:hidden;
  border-top:1px solid var(--line);
  padding:6px 0 4px
}
.sc-row {
  width:100%;
  display:flex;
  align-items:center;
  gap:12px;
  padding:8px 8px;
  margin:1px 0;
  border-radius:10px;
  transition:background .2s,transform .2s;
  text-align:left;
  color:inherit;
  font:inherit
}
.sc-row[role="button"] {
  cursor:pointer
}
.sc-row.has-toggle {
  cursor:default
}
.sc-row:hover {
  background:var(--hov);
  transform:translateX(3px)
}
.sc-row:hover .sc-ico {
  background:var(--c);
  color:#fff
}
.sc-rt {
  flex:1;
  min-width:0;
  display:grid;
  gap:1px
}
.sc-rt b {
  font-size:13px;
  font-weight:600
}
.sc-rt small {
  font-size:11.5px;
  color:var(--mu)
}
.sc-row .sc-chev {
  opacity:.55
}
.sc-row:hover .sc-chev {
  opacity:1;
  transform:translateX(3px)
}
.sc-badge,.sc-pill {
  padding:4px 12px;
  border-radius:14px;
  font-size:11.5px;
  font-weight:600;
  font-style:normal;
  white-space:nowrap
}
.sc-badge {
  background:#e7edff;
  color:var(--pr)
}
.sc-pill {
  background:#dcf8ee;
  color:#0b9b73
}
.um-app[data-theme=dark] .sc-badge {
  background:#1f2f66;
  color:#9fb2ff
}
.um-app[data-theme=dark] .sc-pill {
  background:#0f3a33
}
.sc-store {
  display:flex;
  align-items:center;
  gap:10px;
  font-size:12px;
  font-weight:600;
  color:var(--mu)
}
.sc-bar {
  display:block;
  width:92px;
  height:5px;
  border-radius:3px;
  background:var(--line);
  overflow:hidden
}
.sc-bar i {
  display:block;
  height:100%;
  width:42%;
  border-radius:3px;
  background:var(--pr);
  animation:scFill 1.1s .4s both cubic-bezier(.3,.8,.3,1)
}
.sc-bar.big {
  width:100%;
  height:9px;
  margin:10px 0 16px
}
.sc-bar.big i {
  animation:none;
  transition:width .2s linear
}
@keyframes scFill {
  from {
    width:0
  }
}
/* toggle */
.sc-tg {
  position:relative;
  width:40px;
  height:22px;
  border-radius:11px;
  background:#c9d1e6;
  flex-shrink:0;
  transition:background .25s
}
.sc-tg i {
  position:absolute;
  top:3px;
  left:3px;
  width:16px;
  height:16px;
  border-radius:50%;
  background:#fff;
  box-shadow:0 1px 3px rgba(0,0,0,.25);
  transition:transform .25s cubic-bezier(.4,1.4,.5,1)
}
.sc-tg.on {
  background:var(--pr)
}
.sc-tg.on i {
  transform:translateX(18px)
}
.um-app[data-theme=dark] .sc-tg:not(.on) {
  background:#334172
}
/* modal */
.sc-ov {
  position:fixed;
  inset:0;
  z-index:100;
  display:grid;
  place-items:center;
  padding:20px;
  background:rgba(8,15,40,.5);
  backdrop-filter:blur(3px);
  animation:scIn .2s
}
.sc-modal {
  width:min(480px,100%);
  max-height:86vh;
  display:flex;
  flex-direction:column;
  background:var(--card);
  color:var(--tx);
  border-radius:18px;
  box-shadow:0 30px 70px rgba(8,15,40,.35);
  animation:scPop .3s cubic-bezier(.3,1.2,.5,1)
}
.sc-modal header {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:18px 20px 14px;
  border-bottom:1px solid var(--line)
}
.sc-modal h3 {
  margin:0;
  font-size:17px;
  font-weight:700
}
.sc-x {
  display:grid;
  place-items:center;
  width:32px;
  height:32px;
  border-radius:50%;
  color:var(--mu);
  transition:background .2s,transform .25s
}
.sc-x:hover {
  background:var(--hov);
  transform:rotate(90deg)
}
.sc-mb {
  padding:16px 20px 20px;
  overflow:auto
}
.sc-mb h4 {
  margin:14px 0 8px;
  font-size:12.5px;
  color:var(--mu);
  font-weight:600
}
.sc-mb h4:first-child {
  margin-top:0
}
.sc-choices {
  display:grid;
  gap:8px
}
.sc-choice {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:11px 14px;
  border:1.5px solid var(--line);
  border-radius:12px;
  transition:border-color .2s,background .2s,transform .15s
}
.sc-choice:hover {
  border-color:var(--pr);
  transform:translateY(-1px)
}
.sc-choice b {
  display:block;
  font-size:13.5px;
  font-weight:600
}
.sc-choice small {
  font-size:11.5px;
  color:var(--mu)
}
.sc-choice em {
  width:20px;
  height:20px;
  border-radius:50%;
  display:grid;
  place-items:center;
  border:1.5px solid var(--line);
  color:transparent;
  transition:.2s
}
.sc-choice.on {
  border-color:var(--pr);
  background:color-mix(in srgb,var(--pr) 8%,transparent)
}
.sc-choice.on em {
  background:var(--pr);
  border-color:var(--pr);
  color:#fff
}
.sc-form {
  display:grid;
  gap:14px
}
.sc-form label {
  display:grid;
  gap:6px
}
.sc-form span {
  font-size:12.5px;
  font-weight:600;
  color:var(--mu)
}
.sc-form input,.sc-mb select {
  height:42px;
  padding:0 13px;
  border-radius:10px;
  border:1.5px solid var(--line);
  background:var(--bg);
  color:var(--tx);
  font:inherit;
  font-size:13.5px;
  outline:0;
  transition:border-color .2s,box-shadow .2s
}
.sc-form input:focus,.sc-mb select:focus {
  border-color:var(--pr);
  box-shadow:0 0 0 3px rgba(53,86,245,.14)
}
.sc-form input[readonly] {
  opacity:.65
}
.sc-form input.bad {
  border-color:#ef4455;
  animation:scShake .3s
}
.sc-form small {
  color:#ef4455;
  font-size:11.5px
}
@keyframes scShake {
  25% {
    transform:translateX(-4px)
  }
  75% {
    transform:translateX(4px)
  }
}
.sc-btn {
  height:44px;
  padding:0 22px;
  border-radius:11px;
  background:var(--pr);
  color:#fff!important;
  font-weight:600;
  text-align:center!important;
  box-shadow:0 8px 18px rgba(53,86,245,.3);
  transition:transform .2s,box-shadow .2s,opacity .2s
}
.sc-btn:hover:not(:disabled) {
  transform:translateY(-2px);
  box-shadow:0 12px 24px rgba(53,86,245,.38)
}
.sc-btn:disabled {
  opacity:.6;
  cursor:default
}
.sc-list {
  list-style:none;
  margin:0;
  padding:0;
  display:grid;
  gap:4px
}
.sc-list li {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding:11px 12px;
  border-radius:10px;
  background:var(--bg)
}
.sc-list li span,.sc-list li b {
  font-size:13px;
  font-weight:600
}
.sc-list li span {
  display:grid
}
.sc-list small {
  font-size:11.5px;
  color:var(--mu)
}
.sc-link {
  color:#ef4455!important;
  font-size:12.5px;
  font-weight:600;
  transition:opacity .2s
}
.sc-link:hover {
  opacity:.7
}
.sc-line {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-top:14px;
  padding:12px 14px;
  border-radius:12px;
  background:var(--bg);
  font-size:13.5px;
  font-weight:600
}
.sc-line:first-child {
  margin-top:0
}
.sc-reveal {
  margin-top:12px;
  animation:scUp .3s
}
.sc-text {
  margin:0 0 6px;
  font-size:13px;
  line-height:1.6;
  color:var(--mu)
}
.sc-text b {
  color:var(--tx)
}
.sc-preview {
  margin-top:12px;
  display:grid;
  gap:4px;
  padding:12px 14px;
  border-radius:12px;
  border:1.5px dashed var(--line)
}
.sc-preview small {
  color:var(--mu);
  font-size:11px
}
.sc-preview b {
  font-size:14px
}
.sc-toast {
  position:fixed;
  left:50%;
  bottom:28px;
  z-index:120;
  transform:translateX(-50%);
  display:flex;
  align-items:center;
  gap:8px;
  padding:11px 18px;
  border-radius:24px;
  background:#0f1a3a;
  color:#fff;
  font-size:13px;
  font-weight:600;
  box-shadow:0 14px 30px rgba(0,0,0,.25);
  animation:scPop .3s
}
.sc-toast svg {
  color:#38e0a8
}
/* responsive */
@media (max-width:1180px) {
  .span2 {
    grid-column:span 3
  }
  .span2:last-child:nth-child(odd) {
    grid-column:span 6
  }
}
@media (max-width:980px) {
  .um-burger {
    display:grid
  }
  .um-sidebar {
    position:fixed;
    left:0;
    top:0;
    transform:translateX(-100%)
  }
  .um-sidebar.open {
    transform:none;
    box-shadow:12px 0 40px rgba(0,0,0,.35)
  }
  .um-overlay {
    display:block;
    position:fixed;
    inset:0;
    z-index:55;
    background:rgba(10,20,50,.5);
    opacity:0;
    pointer-events:none;
    transition:opacity .3s
  }
  .um-overlay.show {
    opacity:1;
    pointer-events:auto
  }
  .span3,.span2,.span2:last-child:nth-child(odd) {
    grid-column:span 6
  }
}
@media (max-width:760px) {
  .um-topbar {
    padding:0 14px;
    gap:10px
  }
  .um-title h1 {
    font-size:22px
  }
  .sc-clock {
    display:none
  }
  .um-content {
    padding:18px 14px 28px
  }
}
@media (max-width:520px) {
  .um-profile-copy,.um-profile-chev {
    display:none
  }
  .um-title .sc-gear {
    display:none
  }
}
@media (prefers-reduced-motion:reduce) {
  .um-app * {
    animation:none!important;
    transition:none!important
  }
}

/* ===== SPOTLIGHT (additive - new elements only) ===== */
.sx-wrap{margin-bottom:18px;display:grid;grid-template-columns:minmax(0,1fr);gap:14px;width:100%;max-width:100%;min-width:0;box-sizing:border-box}.sx-wrap>*{min-width:0;max-width:100%;box-sizing:border-box}
.sx-hero{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;padding:26px 30px;border-radius:20px;color:#fff;background:linear-gradient(120deg,#0d2145,#1b4fae 55%,#5a3fc9);background-size:200% 200%;animation:sxFlow 14s ease-in-out infinite,sxRise .7s .15s both;box-shadow:0 18px 40px -18px rgba(33,119,232,.55)}
.sx-hero:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(260px circle at var(--mx,70%) var(--my,0%),rgba(255,255,255,.22),transparent 70%);transition:background .2s}
.sx-hero:after{content:"";position:absolute;top:0;bottom:0;width:90px;left:-120px;pointer-events:none;background:linear-gradient(100deg,transparent,rgba(255,255,255,.18),transparent);transform:skewX(-18deg);animation:sxSweep 6s 1.2s ease-in-out infinite}
.sx-orb{position:absolute;border-radius:50%;filter:blur(38px);opacity:.55;pointer-events:none}
.sx-orb.o1{width:220px;height:220px;background:#38bdf8;top:-90px;left:8%;animation:sxDrift 11s ease-in-out infinite}
.sx-orb.o2{width:180px;height:180px;background:#a78bfa;bottom:-80px;right:22%;animation:sxDrift 13s -4s ease-in-out infinite reverse}
.sx-orb.o3{width:120px;height:120px;background:#f472b6;top:30%;right:-40px;animation:sxDrift 9s -2s ease-in-out infinite}
.sx-copy{position:relative;z-index:1;min-width:0;flex:1 1 320px}
.sx-kick{display:inline-flex;align-items:center;gap:8px;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:5px 12px;border-radius:99px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25)}
.sx-kick em{width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 0 rgba(74,222,128,.7);animation:sxPing 1.8s infinite}
.sx-copy h2{margin:12px 0 4px;font-size:28px;font-weight:800;letter-spacing:-.02em;color:#fff}
.sx-copy p{margin:0 0 16px;color:rgba(255,255,255,.82);font-size:14.5px}
.sx-chips{display:flex;flex-wrap:wrap;gap:9px}
.sx-chip{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:99px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.1);color:#fff;font:inherit;font-size:13px;font-weight:600;cursor:pointer;backdrop-filter:blur(6px);transition:transform .2s,background .2s,border-color .2s}
.sx-chip:hover{transform:translateY(-3px);background:rgba(255,255,255,.2)}
.sx-chip:active{transform:scale(.95)}
.sx-chip i{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.35);transition:background .25s,box-shadow .25s}
.sx-chip.on{background:rgba(255,255,255,.22);border-color:rgba(255,255,255,.55)}
.sx-chip.on i{background:#4ade80;box-shadow:0 0 10px #4ade80}
.sx-ring{position:relative;z-index:1;width:150px;height:150px;flex:none;margin-inline:auto}
.sx-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.sx-trk{fill:none;stroke:rgba(255,255,255,.18);stroke-width:9}
.sx-arc{fill:none;stroke:url(#sxg);stroke-width:9;stroke-linecap:round;stroke-dashoffset:var(--off);animation:sxDraw 1.5s .4s cubic-bezier(.2,.8,.2,1) both;filter:drop-shadow(0 0 6px rgba(167,139,250,.8))}
.sx-orbit{position:absolute;inset:0;animation:sxSpin 5s linear infinite}
.sx-orbit i{position:absolute;top:-3px;left:50%;width:9px;height:9px;margin-left:-4.5px;border-radius:50%;background:#fff;box-shadow:0 0 12px 3px rgba(255,255,255,.8)}
.sx-num{position:absolute;inset:0;display:grid;place-content:center;text-align:center}
.sx-num b{font-size:38px;line-height:1;font-weight:800}
.sx-num small{font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.8;margin-top:4px}
.sx-tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.sx-tile{position:relative;overflow:hidden;display:grid;gap:2px;padding:16px 18px;border-radius:16px;background:var(--card);border:1px solid var(--line);animation:sxRise .6s calc(.3s + var(--i)*90ms) both;transition:transform .25s,box-shadow .25s,border-color .25s}
.sx-tile:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .25s;background:radial-gradient(180px circle at var(--mx,50%) var(--my,50%),rgba(33,119,232,.16),transparent 70%)}
.sx-tile:hover{transform:translateY(-4px);border-color:var(--pr);box-shadow:0 14px 28px -16px rgba(33,119,232,.5)}
.sx-tile:hover:before{opacity:1}
.sx-tico{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--pr),#7c5cf0);margin-bottom:8px;transition:transform .35s}
.sx-tile:hover .sx-tico{transform:rotate(-8deg) scale(1.1)}
.sx-tile b{font-size:26px;font-weight:800;letter-spacing:-.02em;color:var(--tx)}
.sx-tile span:not(.sx-tico){font-weight:600;color:var(--tx);font-size:13.5px}
.sx-tile small{color:var(--mu);font-size:12px}
.sx-feed{overflow:hidden;display:flex;align-items:center;gap:12px;padding:9px 14px;border-radius:14px;background:var(--card);border:1px solid var(--line);animation:sxRise .6s .7s both}
.sx-live{display:inline-flex;align-items:center;gap:7px;flex:none;font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#e11d48}
.sx-live i{width:8px;height:8px;border-radius:50%;background:#e11d48;animation:sxPing2 1.6s infinite}
.sx-roll{overflow:hidden;flex:1;min-width:0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.sx-track{display:flex;gap:34px;width:max-content;animation:sxMarq 26s linear infinite}
.sx-roll:hover .sx-track{animation-play-state:paused}
.sx-track span{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;color:var(--mu);font-size:13px}
.sx-track svg{color:var(--pr)}
@keyframes sxRise{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:none}}
@keyframes sxFlow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes sxSweep{0%{left:-120px}55%,100%{left:110%}}
@keyframes sxDrift{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,26px) scale(1.2)}}
@keyframes sxPing{70%{box-shadow:0 0 0 8px rgba(74,222,128,0)}100%{box-shadow:0 0 0 0 rgba(74,222,128,0)}}
@keyframes sxPing2{0%{box-shadow:0 0 0 0 rgba(225,29,72,.6)}70%,100%{box-shadow:0 0 0 8px rgba(225,29,72,0)}}
@keyframes sxDraw{from{stroke-dashoffset:var(--c)}}
@keyframes sxSpin{to{transform:rotate(360deg)}}
@keyframes sxMarq{to{transform:translateX(-50%)}}
@media (max-width:980px){.sx-tiles{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:520px){.sx-hero{padding:20px 18px}.sx-copy h2{font-size:23px}.sx-tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.sx-tile{padding:13px}.sx-tile b{font-size:22px}.sx-feed{padding:8px 10px}}

/* ===== LIVE feed controls + light/dark fixes (additive) ===== */
.sx-live.off{color:#64748b}
.sx-live.off i{background:#94a3b8;animation:none}
.sx-sync{display:inline-flex;align-items:center;gap:10px;flex:none}
.sx-sync>span{font-size:12px;color:var(--mu);font-variant-numeric:tabular-nums;white-space:nowrap}
.sx-rf{width:30px;height:30px;border-radius:9px;border:1px solid var(--line);background:var(--bg);color:var(--mu);display:grid;place-items:center;cursor:pointer;transition:color .2s,border-color .2s,transform .2s}
.sx-rf:hover{color:var(--pr);border-color:var(--pr);transform:translateY(-2px)}
.sx-rf.spin svg{animation:sxSpin .8s linear infinite}
.um-app{background-color:var(--bg);transition:opacity .35s ease}
.um-main{background:var(--bg)}
.um-app[data-theme=light]{--bg:#f4f7fc;--card:#fff;--line:#e6ebf3;--tx:#0f1b33;--mu:#66758f;--hov:#f1f5fd}
.um-app[data-theme=dark] .um-topbar{background:rgba(10,17,37,.96);border-bottom-color:var(--line)}
.um-app[data-theme=dark] .um-search{background:var(--card)}
.um-app[data-theme=dark] .um-bell{color:#9fb2ff!important}
.um-app[data-theme=dark] .um-profile-chev{color:#9fb2ff}
.um-app[data-theme=dark] .sc-drop{background:var(--card);border-color:var(--line)}
@media (max-width:760px){.sx-sync>span{display:none}}

/* ===== EXTRAS: checklist, pulse, quick actions + responsive (additive) ===== */
.sx-live.demo{color:#d97706}
.sx-live.demo i{background:#f59e0b;animation:none}
.sx-duo{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.sx-box{position:relative;overflow:hidden;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px 20px;animation:sxRise .6s calc(.8s + var(--i)*100ms) both;transition:box-shadow .25s,border-color .25s}
.sx-box:hover{box-shadow:0 14px 28px -18px rgba(33,119,232,.5);border-color:var(--pr)}
.sx-bh{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
.sx-bh h3{margin:0;font-size:16px;font-weight:800;color:var(--tx)}
.sx-pct{font-weight:800;font-size:13px;color:var(--pr);background:color-mix(in srgb,var(--pr) 12%,transparent);padding:3px 10px;border-radius:99px}
.sx-pulse{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:700;color:#d97706}
.sx-pulse i{width:8px;height:8px;border-radius:50%;background:#f59e0b}
.sx-pulse.on{color:#16a34a}
.sx-pulse.on i{background:#22c55e;animation:sxPing3 1.8s infinite}
.sx-meter{height:8px;border-radius:99px;background:color-mix(in srgb,var(--mu) 18%,transparent);overflow:hidden}
.sx-meter i{display:block;height:100%;width:var(--w);border-radius:99px;transform-origin:left;background:linear-gradient(90deg,var(--b1),var(--b2),var(--b1));background-size:200% 100%;animation:sxFill 1.3s 1s cubic-bezier(.2,.8,.2,1) both,sxShine 2.4s 2.3s linear infinite}
.sx-meter.g{--b1:#22c55e;--b2:#86efac}
.sx-meter.a{--b1:#f59e0b;--b2:#fcd34d}
.sx-meter.r{--b1:#ef4444;--b2:#fca5a5}
.sx-todos,.sx-bars{display:grid;gap:8px;margin-top:14px}
.sx-bars{gap:14px}
.sx-todo{display:flex;align-items:center;gap:11px;width:100%;padding:9px 12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--tx);font:inherit;font-size:13.5px;font-weight:600;text-align:left;cursor:pointer;animation:sxSlide .5s calc(1s + var(--k)*80ms) both;transition:transform .2s,border-color .2s,background .2s}
.sx-todo:hover{transform:translateX(5px);border-color:var(--pr)}
.sx-todo:active{transform:scale(.98)}
.sx-tl{flex:1;min-width:0}
.sx-tick{flex:none;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;border:2px solid var(--line);color:transparent;transition:background .25s,border-color .25s}
.sx-tick path{stroke-dasharray:24;stroke-dashoffset:24}
.sx-todo.ok .sx-tick{background:#22c55e;border-color:#22c55e;color:#fff}
.sx-todo.ok .sx-tick path{animation:sxCheck .5s .15s ease forwards}
.sx-todo em{flex:none;font-style:normal;font-size:11.5px;font-weight:700;padding:2px 9px;border-radius:99px;color:#d97706;background:rgba(245,158,11,.14)}
.sx-todo.ok em{color:#16a34a;background:rgba(34,197,94,.14)}
.sx-bt{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:6px;font-size:13px}
.sx-bt span{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--tx)}
.sx-bt svg{color:var(--pr)}
.sx-bt b{color:var(--mu);font-weight:700;font-variant-numeric:tabular-nums}
.sx-acts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.sx-act{position:relative;overflow:hidden;display:grid;gap:3px;justify-items:start;padding:16px 18px;border-radius:16px;border:1px solid var(--line);background:var(--card);color:var(--tx);font:inherit;text-align:left;text-decoration:none;cursor:pointer;animation:sxRise .6s calc(1.1s + var(--i)*90ms) both;transition:transform .25s,box-shadow .25s,border-color .25s}
.sx-act:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .25s;background:radial-gradient(160px circle at var(--mx,50%) var(--my,50%),rgba(124,92,240,.18),transparent 70%)}
.sx-act:hover{transform:translateY(-4px);border-color:#7c5cf0;box-shadow:0 14px 28px -16px rgba(124,92,240,.55)}
.sx-act:hover:before{opacity:1}
.sx-act:active{transform:scale(.97)}
.sx-act>span{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#2177e8,#7c5cf0);margin-bottom:8px;transition:transform .4s cubic-bezier(.3,1.6,.5,1)}
.sx-act:hover>span{transform:rotate(-10deg) scale(1.15)}
.sx-act b{font-size:14.5px;font-weight:800;position:relative}
.sx-act small{color:var(--mu);font-size:12px;position:relative}
@keyframes sxFill{from{transform:scaleX(0)}}
@keyframes sxShine{to{background-position:-200% 0}}
@keyframes sxSlide{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}
@keyframes sxCheck{to{stroke-dashoffset:0}}
@keyframes sxPing3{0%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}70%,100%{box-shadow:0 0 0 8px rgba(34,197,94,0)}}
@media (max-width:1180px){.sx-act{padding:14px}}
@media (max-width:980px){.sx-duo{grid-template-columns:minmax(0,1fr)}.sx-acts{grid-template-columns:repeat(2,minmax(0,1fr))}.sx-hero{padding:22px 24px}}
@media (max-width:760px){.sx-ring{width:124px;height:124px}.sx-num b{font-size:30px}.sx-copy h2{font-size:24px}.sx-copy p{font-size:13.5px}.sx-chip{padding:7px 12px;font-size:12.5px}.sx-box{padding:15px}}
@media (max-width:520px){.sx-hero{flex-direction:column-reverse;align-items:flex-start;gap:14px}.sx-ring{margin:0 auto;width:112px;height:112px}.sx-copy{flex-basis:auto;width:100%}.sx-acts{gap:10px}.sx-act{padding:12px}.sx-act small{display:none}.sx-act>span{width:34px;height:34px;margin-bottom:4px}.sx-todo{padding:8px 10px;font-size:13px}.sx-wrap,.sx-duo{gap:10px}}

/* ===== FINAL POLISH: ring contrast, equal-height cards, extra animations (additive) ===== */
.sx-ring,.sx-chips,.sx-kick,.sx-num{user-select:none;-webkit-user-select:none}
.sx-ring{transition:transform .4s cubic-bezier(.3,1.4,.5,1)}
.sx-hero:hover .sx-ring{transform:scale(1.05)}
.sx-ring:before{content:"";position:absolute;inset:23px;border-radius:50%;background:radial-gradient(circle,rgba(6,16,40,.62),rgba(6,16,40,.38));box-shadow:inset 0 0 18px rgba(0,0,0,.25)}
.sx-ring:after{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(167,139,250,.5);pointer-events:none;animation:sxHalo 2.8s ease-out infinite}
.sx-num b{color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.4)}
.sx-num small{color:#fff;opacity:1;font-weight:700;letter-spacing:.14em;text-shadow:0 1px 6px rgba(0,0,0,.5)}
.sx-spark{position:absolute;bottom:-10px;width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.75);box-shadow:0 0 8px rgba(255,255,255,.8);pointer-events:none;opacity:0;animation:sxFloat 7s linear infinite}
.sx-tico svg{animation:sxBob 3.2s calc(var(--i,0)*.4s) ease-in-out infinite}
.sx-duo{align-items:stretch}
.sx-box{display:flex;flex-direction:column}
.sx-todos,.sx-bars{flex:1;align-content:space-between}
.sx-bh h3{position:relative}
.sx-bh h3:after{content:"";display:block;height:3px;width:30px;margin-top:5px;border-radius:3px;background:linear-gradient(90deg,var(--pr),#7c5cf0);animation:sxGrow .8s 1s both}
.sx-pct.full{color:#fff;background:#22c55e;animation:sxPop .7s both}
@keyframes sxHalo{0%{transform:scale(.92);opacity:.9}100%{transform:scale(1.28);opacity:0}}
@keyframes sxFloat{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:.9}100%{transform:translateY(-230px) scale(1.2);opacity:0}}
@keyframes sxBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}}
@keyframes sxGrow{from{width:0}}
@keyframes sxPop{0%{transform:scale(.6)}60%{transform:scale(1.25)}100%{transform:scale(1)}}
@media (max-width:980px){.sx-todos,.sx-bars{flex:none}}
@media (max-width:520px){.sx-ring:before{inset:19px}.sx-ring:after{inset:-4px}}
@media (prefers-reduced-motion:reduce){.sx-todo.ok .sx-tick path{stroke-dashoffset:0}.sx-spark{display:none}}

/* ===== LANGUAGE DROPDOWN (additive) ===== */
.sx-lang{position:relative;min-width:0}
.sx-lang.open{z-index:60}
.sx-lang .sx-act{width:100%;height:100%;box-sizing:border-box}
.sx-lang.open .sx-act{border-color:#7c5cf0;box-shadow:0 0 0 4px rgba(124,92,240,.15)}
.sx-caret{position:absolute;top:16px;right:14px;display:grid;color:var(--mu);transform:rotate(90deg);transition:transform .35s cubic-bezier(.3,1.5,.5,1),color .2s}
.sx-lang.open .sx-caret{transform:rotate(-90deg);color:#7c5cf0}
.sx-menu{position:absolute;top:calc(100% + 8px);left:0;z-index:60;min-width:100%;width:max-content;max-width:min(300px,86vw);box-sizing:border-box;margin:0;padding:6px;list-style:none;background:var(--card);border:1px solid var(--line);border-radius:16px;box-shadow:0 24px 46px -14px rgba(20,30,80,.4);transform-origin:24% 0;animation:sxMenuIn .34s cubic-bezier(.2,1.2,.4,1) both}
.sx-menu li{margin:0;animation:sxSlide .38s calc(var(--k)*70ms + .05s) both}
.sx-menu button{position:relative;display:flex;align-items:center;gap:12px;width:100%;padding:9px 10px;border-radius:11px;color:var(--tx);font:inherit;text-align:left;cursor:pointer;background:transparent;transition:background .2s,transform .2s}
.sx-menu button:hover{background:var(--hov);transform:translateX(4px)}
.sx-menu button:active{transform:scale(.97)}
.sx-menu button.on{background:color-mix(in srgb,#7c5cf0 12%,transparent)}
.sx-gl{flex:none;width:38px;height:38px;border-radius:12px;display:grid;place-items:center;font-size:19px;font-weight:800;color:#fff;background:linear-gradient(135deg,#2177e8,#7c5cf0);transition:transform .4s cubic-bezier(.3,1.6,.5,1)}
.sx-menu button:hover .sx-gl{transform:rotate(-8deg) scale(1.12)}
.sx-menu button.on .sx-gl{box-shadow:0 0 0 3px rgba(124,92,240,.25),0 6px 14px -4px rgba(124,92,240,.6)}
.sx-ln{flex:1;min-width:0;display:grid}
.sx-ln b{font-size:14.5px;font-weight:700;line-height:1.25}
.sx-ln small{font-size:11.5px;color:var(--mu)}
.sx-menu svg{flex:none;color:#22c55e;stroke-dasharray:24;stroke-dashoffset:24;opacity:0}
.sx-menu .on svg{opacity:1;animation:sxCheck .5s .2s ease forwards}
.sx-swap{animation:sxSwap .45s both}
@keyframes sxMenuIn{from{opacity:0;transform:translateY(-12px) scale(.9)}to{opacity:1;transform:none}}
@keyframes sxSwap{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
@media (max-width:520px){.sx-menu{max-width:calc(100vw - 48px)}.sx-caret{top:12px;right:10px}}
@media (prefers-reduced-motion:reduce){.sx-menu .on svg{stroke-dashoffset:0}}

/* ===== 25-LANGUAGE PICKER (additive) ===== */
.sx-menu{width:300px;min-width:270px;max-width:min(320px,calc(100vw - 48px));padding:8px}
.sx-find{display:flex;align-items:center;gap:8px;height:38px;padding:0 11px;margin:0 0 8px;border-radius:11px;border:1px solid var(--line);background:var(--bg);color:var(--mu);transition:border-color .2s,box-shadow .2s}
.sx-find:focus-within{border-color:#7c5cf0;box-shadow:0 0 0 3px rgba(124,92,240,.15)}
.sx-find input{flex:1;min-width:0;height:100%;border:0;outline:0;background:transparent;color:var(--tx);font:inherit;font-size:13px;padding:0}
.sx-menu .sx-find svg{color:var(--mu);stroke-dasharray:none;stroke-dashoffset:0;opacity:1;animation:none}
.sx-opts{list-style:none;margin:0;padding:0 2px 0 0;max-height:min(300px,50vh);overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}
.sx-tag{flex:none;font-style:normal;font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:99px;color:#16a34a;background:rgba(34,197,94,.14)}
.sx-tag.b{color:#d97706;background:rgba(245,158,11,.14)}
.sx-none{padding:16px 8px;text-align:center;color:var(--mu);font-size:13px}

/* ===== picker clean-up (additive) ===== */
.sx-find input,.sx-find input:focus,.sx-find input:focus-visible{outline:none!important;box-shadow:none!important;border:0!important;background:transparent!important;border-radius:0}
.sx-opts{overflow-x:hidden}
.sx-menu button{box-sizing:border-box}
`;
