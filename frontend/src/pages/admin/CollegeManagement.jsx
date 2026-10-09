import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* =========================================================
   COLLEGE DATA
   550 COLLEGES: ENGINEERING + ARTS & SCIENCE + MEDICAL + NURSING + ALLIED HEALTH + PHYSIOTHERAPY + AGRICULTURE + LAW
========================================================= */

const engineeringFacilities = [
  "Hostel",
  "Library",
  "Laboratories",
  "Transport",
  "Sports",
  "Canteen",
  "Wi-Fi",
  "Medical Centre",
];

const artsFacilities = [
  "Hostel",
  "Library",
  "Computer Lab",
  "Transport",
  "Sports",
  "Canteen",
  "Wi-Fi",
  "Auditorium",
];

const medicalFacilities = [
  "Hostel",
  "Central Library",
  "Clinical Labs",
  "Teaching Hospital",
  "Transport",
  "Sports",
  "Canteen",
  "Medical Services",
];

const engineeringCompanies = [
  {
    company: "TCS",
    industry: "IT Services",
    hiringFor: "CSE / IT / ECE",
    roles: "Software Developer, Analyst",
    status: "Active",
  },
  {
    company: "Infosys",
    industry: "IT Services",
    hiringFor: "CSE / IT / ECE",
    roles: "Software Engineer, Analyst",
    status: "Active",
  },
  {
    company: "Wipro",
    industry: "IT Services",
    hiringFor: "CSE / IT / ECE",
    roles: "Developer, Project Engineer",
    status: "Active",
  },
  {
    company: "Accenture",
    industry: "Consulting / IT",
    hiringFor: "CSE / IT / ECE",
    roles: "Associate Software Engineer",
    status: "Active",
  },
  {
    company: "Cognizant",
    industry: "IT Services",
    hiringFor: "CSE / IT / ECE",
    roles: "Programmer Analyst",
    status: "Active",
  },
  {
    company: "Deloitte",
    industry: "Consulting",
    hiringFor: "CSE / IT / Management",
    roles: "Analyst, Technology Consultant",
    status: "Active",
  },
  {
    company: "Zoho",
    industry: "Software",
    hiringFor: "CSE / IT",
    roles: "Member Technical Staff",
    status: "Active",
  },
  {
    company: "Amazon",
    industry: "Technology",
    hiringFor: "CSE / IT",
    roles: "Software Development",
    status: "Active",
  },
  {
    company: "Microsoft",
    industry: "Technology",
    hiringFor: "CSE / IT",
    roles: "Software Engineer",
    status: "Active",
  },
];

const artsCompanies = [
  {
    company: "TCS",
    industry: "IT Services",
    hiringFor: "BCA / B.Com / B.Sc",
    roles: "Associate, Analyst",
    status: "Active",
  },
  {
    company: "Infosys",
    industry: "IT Services",
    hiringFor: "BCA / B.Sc / B.Com",
    roles: "Process Executive, Analyst",
    status: "Active",
  },
  {
    company: "Wipro",
    industry: "IT Services",
    hiringFor: "BCA / B.Com / BBA",
    roles: "Process Associate",
    status: "Active",
  },
  {
    company: "Accenture",
    industry: "Consulting / IT",
    hiringFor: "BCA / B.Com / BBA",
    roles: "Associate",
    status: "Active",
  },
  {
    company: "Deloitte",
    industry: "Consulting",
    hiringFor: "B.Com / BBA",
    roles: "Analyst",
    status: "Active",
  },
  {
    company: "HDFC Bank",
    industry: "Banking",
    hiringFor: "B.Com / BBA",
    roles: "Relationship Executive",
    status: "Active",
  },
];

const medicalCompanies = [
  {
    company: "Apollo Hospitals",
    industry: "Healthcare",
    hiringFor: "Medical / Nursing / Allied Health",
    roles: "Clinical / Healthcare Roles",
    status: "Active",
  },
  {
    company: "Kauvery Hospital",
    industry: "Healthcare",
    hiringFor: "Nursing / Allied Health",
    roles: "Clinical Roles",
    status: "Active",
  },
  {
    company: "KMCH",
    industry: "Healthcare",
    hiringFor: "Medical / Nursing / Allied Health",
    roles: "Clinical Roles",
    status: "Active",
  },
  {
    company: "PSG Hospitals",
    industry: "Healthcare",
    hiringFor: "Medical / Nursing / Allied Health",
    roles: "Clinical Roles",
    status: "Active",
  },
  {
    company: "Fortis Healthcare",
    industry: "Healthcare",
    hiringFor: "Nursing / Allied Health",
    roles: "Clinical Roles",
    status: "Active",
  },
];

/* ---------- NURSING / ALLIED / PHYSIOTHERAPY / AGRICULTURE / LAW ---------- */

const nursingFacilities = [
  "Hostel",
  "Library",
  "Nursing Skills Lab",
  "Teaching Hospital",
  "Transport",
  "Sports",
  "Canteen",
  "Wi-Fi",
];

const alliedFacilities = [
  "Hostel",
  "Library",
  "Clinical Labs",
  "Teaching Hospital",
  "Transport",
  "Sports",
  "Canteen",
  "Wi-Fi",
];

const physioFacilities = [
  "Hostel",
  "Library",
  "Physiotherapy Lab",
  "Rehabilitation Centre",
  "Transport",
  "Sports",
  "Canteen",
  "Wi-Fi",
];

const agricultureFacilities = [
  "Hostel",
  "Library",
  "Demonstration Farm",
  "Research Labs",
  "Transport",
  "Sports",
  "Canteen",
  "Wi-Fi",
];

const lawFacilities = [
  "Hostel",
  "Law Library",
  "Moot Court",
  "Legal Aid Clinic",
  "Transport",
  "Sports",
  "Canteen",
  "Wi-Fi",
];

const nursingCompanies = [
  {
    company: "Apollo Hospitals",
    industry: "Healthcare",
    hiringFor: "B.Sc Nursing / GNM",
    roles: "Staff Nurse",
    status: "Active",
  },
  {
    company: "Kauvery Hospital",
    industry: "Healthcare",
    hiringFor: "B.Sc Nursing / GNM",
    roles: "Staff Nurse",
    status: "Active",
  },
  {
    company: "MIOT International",
    industry: "Healthcare",
    hiringFor: "B.Sc Nursing",
    roles: "Staff Nurse, ICU Nurse",
    status: "Active",
  },
  {
    company: "Fortis Healthcare",
    industry: "Healthcare",
    hiringFor: "B.Sc Nursing",
    roles: "Clinical Nurse",
    status: "Active",
  },
  {
    company: "Government Hospitals (TN Health)",
    industry: "Public Health",
    hiringFor: "B.Sc Nursing / GNM",
    roles: "Staff Nurse (MRB recruitment)",
    status: "Active",
  },
];

const alliedCompanies = [
  {
    company: "Apollo Hospitals",
    industry: "Healthcare",
    hiringFor: "MLT / Radiology / OT & Anaesthesia",
    roles: "Technologist",
    status: "Active",
  },
  {
    company: "Kauvery Hospital",
    industry: "Healthcare",
    hiringFor: "Allied Health",
    roles: "Technician, Technologist",
    status: "Active",
  },
  {
    company: "Dr. Lal PathLabs",
    industry: "Diagnostics",
    hiringFor: "MLT",
    roles: "Lab Technologist",
    status: "Active",
  },
  {
    company: "Metropolis Healthcare",
    industry: "Diagnostics",
    hiringFor: "MLT",
    roles: "Lab Technologist",
    status: "Active",
  },
  {
    company: "Fortis Healthcare",
    industry: "Healthcare",
    hiringFor: "Allied Health",
    roles: "Clinical Technologist",
    status: "Active",
  },
];

const physioCompanies = [
  {
    company: "Apollo Hospitals",
    industry: "Healthcare",
    hiringFor: "BPT / MPT",
    roles: "Physiotherapist",
    status: "Active",
  },
  {
    company: "Kauvery Hospital",
    industry: "Healthcare",
    hiringFor: "BPT / MPT",
    roles: "Physiotherapist",
    status: "Active",
  },
  {
    company: "KMCH",
    industry: "Healthcare",
    hiringFor: "BPT / MPT",
    roles: "Physiotherapist",
    status: "Active",
  },
  {
    company: "Sports Academies / Fitness Centres",
    industry: "Sports & Wellness",
    hiringFor: "BPT / MPT Sports",
    roles: "Sports Physiotherapist",
    status: "Active",
  },
  {
    company: "Rehabilitation Centres",
    industry: "Rehabilitation",
    hiringFor: "BPT / MPT",
    roles: "Rehab Therapist",
    status: "Active",
  },
];

const agricultureCompanies = [
  {
    company: "Coromandel International",
    industry: "Agri Inputs",
    hiringFor: "B.Sc Agriculture / Horticulture",
    roles: "Field Officer, Sales Officer",
    status: "Active",
  },
  {
    company: "UPL",
    industry: "Agri Inputs",
    hiringFor: "B.Sc Agriculture",
    roles: "Territory Manager",
    status: "Active",
  },
  {
    company: "Syngenta India",
    industry: "Agri Inputs / Seeds",
    hiringFor: "B.Sc Agriculture",
    roles: "Field Development Officer",
    status: "Active",
  },
  {
    company: "NABARD / Agri Banks",
    industry: "Banking",
    hiringFor: "B.Sc Agriculture",
    roles: "Agriculture Field Officer",
    status: "Active",
  },
  {
    company: "TN Agriculture Department",
    industry: "Government",
    hiringFor: "B.Sc Agriculture / Horticulture",
    roles: "Agricultural Officer (TNPSC)",
    status: "Active",
  },
];

const lawCompanies = [
  {
    company: "Cyril Amarchand Mangaldas",
    industry: "Law Firm",
    hiringFor: "B.A. LL.B / B.B.A. LL.B",
    roles: "Associate",
    status: "Active",
  },
  {
    company: "Lakshmikumaran & Sridharan",
    industry: "Law Firm",
    hiringFor: "LL.B / LL.M",
    roles: "Associate",
    status: "Active",
  },
  {
    company: "Madras High Court Chambers",
    industry: "Litigation",
    hiringFor: "LL.B",
    roles: "Junior Advocate",
    status: "Active",
  },
  {
    company: "Corporate Legal Teams",
    industry: "Corporate",
    hiringFor: "LL.B / LL.M",
    roles: "Legal Executive, Compliance",
    status: "Active",
  },
  {
    company: "Judiciary / Legal Services",
    industry: "Government",
    hiringFor: "LL.B",
    roles: "Civil Judge, Public Prosecutor",
    status: "Active",
  },
];

/* =========================================================
   HELPER
========================================================= */

const categoryEligibility = {
  Medical: "Course-specific eligibility / NEET where applicable",
  Nursing:
    "12th (PCB) with minimum marks / course-specific eligibility (INC norms)",
  "Allied Health": "12th (PCB / PCM) / course-specific eligibility",
  Physiotherapy: "12th (PCB) / course-specific eligibility",
  Agriculture: "12th (Agriculture / PCB / PCM) / course-specific eligibility",
  Law: "12th for 5-year integrated law; any UG degree for 3-year LL.B.; LL.B. for LL.M.",
  default: "12th completed / course-specific eligibility",
};

const categoryAdmission = {
  Nursing: "Counselling / Management / Applicable Admission Process",
  "Allied Health": "Counselling / Management / Applicable Admission Process",
  Physiotherapy: "Counselling / Management / Applicable Admission Process",
  Agriculture:
    "TNAU Online Counselling / Management / Applicable Admission Process",
  Law: "TNDALU Counselling / CLAT / Applicable Admission Process",
  default: "Counselling / Management / Applicable Admission Process",
};

function createCollege({
  id,
  short,
  name,
  category,
  location,
  type,
  ownership,
  grade,
  affiliation,
  established,
  status = "Verified",
  courses,
  facilities,
  companies,
  annualFee = "College Specific",
}) {
  return {
    id,
    short,
    name,
    category,
    location,
    state: "Tamil Nadu",
    type,
    ownership,
    grade,
    affiliation,
    established,
    status,
    accreditation: "College Specific",
    website: "Official College Website",
    phone: "Not publicly listed on official source",
    email: "Not publicly listed on official source",
    courses,
    facilities,
    companies,
    annualFee,
    managementFee: "College Specific",
    hostelFee: "College Specific",
    counsellingFee: "College Specific",
    otherFee: "College Specific",
    eligibility: categoryEligibility[category] || categoryEligibility.default,
    admission: categoryAdmission[category] || categoryAdmission.default,
    placementAvailable: "Yes",
    averagePackage: "College Specific",
    highestPackage: "College Specific",
    studentsPlaced: "College Specific",
    description:
      "College information shown in this admin module. Production values can be updated by the administrator.",
  };
}

/* =========================================================
   300 COLLEGES
========================================================= */

/* =========================================================
   COURSE FEES
   Demo values for UI display. Verify with each college before production.
========================================================= */

const engineeringCourseFees = {
  "Aerospace Engineering": "₹1,80,000 / year",
  "Aeronautical Engineering (Lateral)": "₹1,60,000 / year",
  "Agricultural Engineering": "₹1,20,000 / year",
  "Automobile Engineering": "₹1,30,000 / year",
  "Artificial Intelligence and Machine Learning": "₹2,00,000 / year",
  "Bio-Medical Engineering": "₹1,40,000 / year",
  "Civil Engineering": "₹1,20,000 / year",
  "Computer Science and Engineering": "₹2,00,000 / year",
  "Electrical & Electronics Engineering": "₹1,30,000 / year",
  "Electronics and Communication Engineering": "₹1,50,000 / year",
  "Electronics and Instrumentation Engineering": "₹1,35,000 / year",
  "Mechatronics Engineering": "₹1,45,000 / year",
  "Information Technology": "₹1,80,000 / year",
  "Mechanical Engineering": "₹1,25,000 / year",
  "Computer Science and Technology": "₹1,90,000 / year",
};

const artsCourseFees = {
  "B.A English": "₹35,000 / year",
  "B.A Economics": "₹35,000 / year",
  "B.Com": "₹45,000 / year",
  "B.Com Computer Applications": "₹50,000 / year",
  BBA: "₹55,000 / year",
  BCA: "₹60,000 / year",
  "B.Sc Computer Science": "₹55,000 / year",
  "B.Sc Mathematics": "₹35,000 / year",
  "B.Sc Physics": "₹35,000 / year",
  "B.Sc Chemistry": "₹40,000 / year",
  "B.Sc Biotechnology": "₹60,000 / year",
  "B.Sc Psychology": "₹45,000 / year",
  "B.Sc Data Science": "₹65,000 / year",
  "B.Sc Statistics": "₹40,000 / year",
  "B.Sc Visual Communication": "₹55,000 / year",
};

const medicalCourseFees = {
  MBBS: "₹1,50,000 / year",
  BDS: "₹2,50,000 / year",
  "B.Sc Nursing": "₹1,00,000 / year",
  "BPT / Physiotherapy": "₹90,000 / year",
  Pharmacy: "₹1,10,000 / year",
  "Allied Health Sciences": "₹80,000 / year",
  Nursing: "₹1,00,000 / year",
  "Postgraduate Medical Courses": "Course Specific",
};

const nursingCourseFees = {
  "B.Sc Nursing": "₹1,00,000 / year",
  "Post Basic B.Sc Nursing": "₹60,000 / year",
  "M.Sc Nursing": "₹1,20,000 / year",
  "GNM (General Nursing & Midwifery)": "₹55,000 / year",
  "Ph.D Nursing": "Course Specific",
};

const alliedCourseFees = {
  "B.Sc Medical Laboratory Technology": "₹80,000 / year",
  "B.Sc Radiology & Imaging Technology": "₹90,000 / year",
  "B.Sc Operation Theatre & Anaesthesia Technology": "₹85,000 / year",
  "B.Sc Cardiac Care Technology": "₹85,000 / year",
  "B.Sc Emergency Medicine Technology": "₹80,000 / year",
  "B.Sc Optometry": "₹85,000 / year",
  "B.Sc Dialysis Technology": "₹75,000 / year",
  "B.Sc Respiratory Therapy": "₹80,000 / year",
};

const physioCourseFees = {
  "BPT (Bachelor of Physiotherapy)": "₹90,000 / year",
  "MPT Musculoskeletal": "₹1,20,000 / year",
  "MPT Neurology": "₹1,20,000 / year",
  "MPT Cardiopulmonary": "₹1,20,000 / year",
  "MPT Sports Physiotherapy": "₹1,25,000 / year",
  "MPT Paediatrics": "₹1,20,000 / year",
  "Ph.D Physiotherapy": "Course Specific",
};

const agricultureCourseFees = {
  "B.Sc (Hons) Agriculture": "₹40,000 / year",
  "B.Sc (Hons) Horticulture": "₹40,000 / year",
  "B.Tech Agricultural Engineering": "₹60,000 / year",
  "B.Tech Food Technology": "₹65,000 / year",
  "B.Sc (Hons) Forestry": "₹40,000 / year",
  "M.Sc Agriculture": "₹30,000 / year",
  "Ph.D Agriculture": "Course Specific",
};

const lawCourseFees = {
  "B.A. LL.B. (Hons) - 5 Years": "₹60,000 / year",
  "B.B.A. LL.B. (Hons) - 5 Years": "₹65,000 / year",
  "B.Com. LL.B. (Hons) - 5 Years": "₹60,000 / year",
  "B.Sc. LL.B. (Hons) - 5 Years": "₹65,000 / year",
  "LL.B. - 3 Years": "₹30,000 / year",
  "LL.M.": "₹50,000 / year",
  "Ph.D Law": "Course Specific",
};

function getCourseFee(college, course) {
  const feeMaps = {
    Engineering: engineeringCourseFees,
    "Arts & Science": artsCourseFees,
    Medical: medicalCourseFees,
    Nursing: nursingCourseFees,
    "Allied Health": alliedCourseFees,
    Physiotherapy: physioCourseFees,
    Agriculture: agricultureCourseFees,
    Law: lawCourseFees,
  };
  const map = feeMaps[college.category] || medicalCourseFees;
  return map[course] || college.annualFee;
}

const collegesData = [
  /* ================= ENGINEERING 10 ================= */

  createCollege({
    id: "ENG001",
    short: "IIT",
    name: "Indian Institute of Technology Madras",
    category: "Engineering",
    location: "Chennai",
    type: "Institute",
    ownership: "Government",
    grade: "A++",
    affiliation: "Autonomous / Institute of National Importance",
    established: "1959",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG002",
    short: "NIT",
    name: "National Institute of Technology Tiruchirappalli",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Institute",
    ownership: "Government",
    grade: "A++",
    affiliation: "Institute of National Importance",
    established: "1964",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG003",
    short: "AU",
    name: "Anna University",
    category: "Engineering",
    location: "Chennai",
    type: "University",
    ownership: "Government",
    grade: "A+",
    affiliation: "Anna University",
    established: "1978",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG004",
    short: "VIT",
    name: "Vellore Institute of Technology",
    category: "Engineering",
    location: "Vellore",
    type: "Deemed University",
    ownership: "Private / Deemed",
    grade: "A++",
    affiliation: "VIT",
    established: "1984",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG005",
    short: "SRM",
    name: "SRM Institute of Science and Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private / Deemed",
    grade: "A++",
    affiliation: "SRMIST",
    established: "1985",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG006",
    short: "AMR",
    name: "Amrita Vishwa Vidyapeetham",
    category: "Engineering",
    location: "Coimbatore",
    type: "Deemed University",
    ownership: "Private / Deemed",
    grade: "A++",
    affiliation: "Amrita Vishwa Vidyapeetham",
    established: "1994",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG007",
    short: "PT",
    name: "PSG College of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A++",
    affiliation: "Anna University",
    established: "1951",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG008",
    short: "CIT",
    name: "Coimbatore Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "1956",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG009",
    short: "KCT",
    name: "Kumaraguru College of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "1984",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG010",
    short: "SNS",
    name: "SNS College of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2002",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  /* ================= ARTS & SCIENCE 10 ================= */

  createCollege({
    id: "ART001",
    short: "PKW",
    name: "PSGR Krishnammal College for Women",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A++",
    affiliation: "Bharathiar University",
    established: "1963",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART002",
    short: "LOY",
    name: "Loyola College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A++",
    affiliation: "University of Madras",
    established: "1925",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART003",
    short: "PCS",
    name: "PSG College of Arts and Science",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A++",
    affiliation: "Bharathiar University",
    established: "1947",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART004",
    short: "MCC",
    name: "Madras Christian College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "University of Madras",
    established: "1837",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART005",
    short: "PC",
    name: "Presidency College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Government",
    ownership: "Government",
    grade: "A+",
    affiliation: "University of Madras",
    established: "1840",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART006",
    short: "TC",
    name: "Thiagarajar College",
    category: "Arts & Science",
    location: "Madurai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Madurai Kamaraj University",
    established: "1949",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART007",
    short: "SMC",
    name: "Stella Maris College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "University of Madras",
    established: "1947",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART008",
    short: "ECW",
    name: "Ethiraj College for Women",
    category: "Arts & Science",
    location: "Chennai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "University of Madras",
    established: "1948",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART009",
    short: "KAS",
    name: "Kongunadu Arts and Science College",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1973",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART010",
    short: "HAS",
    name: "Hindusthan College of Arts and Science",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1995",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  /* ================= MEDICAL 10 ================= */

  createCollege({
    id: "MED001",
    short: "MMC",
    name: "Madras Medical College",
    category: "Medical",
    location: "Chennai",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A++",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1835",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED002",
    short: "SMC",
    name: "Stanley Medical College",
    category: "Medical",
    location: "Chennai",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A+",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1938",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED003",
    short: "KMC",
    name: "Government Kilpauk Medical College",
    category: "Medical",
    location: "Chennai",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A+",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1924",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED004",
    short: "CMC",
    name: "Coimbatore Medical College",
    category: "Medical",
    location: "Coimbatore",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A+",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1966",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED005",
    short: "MMC-M",
    name: "Madurai Medical College",
    category: "Medical",
    location: "Madurai",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A+",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1954",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED006",
    short: "GMC-T",
    name: "Tiruchirappalli Government Medical College",
    category: "Medical",
    location: "Tiruchirappalli",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1990",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED007",
    short: "GMC-S",
    name: "Government Mohan Kumaramangalam Medical College",
    category: "Medical",
    location: "Salem",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1980",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED008",
    short: "PSG-M",
    name: "PSG Institute of Medical Sciences & Research",
    category: "Medical",
    location: "Coimbatore",
    type: "Medical College",
    ownership: "Private",
    grade: "A+",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1985",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED009",
    short: "SRI",
    name: "Sri Ramachandra Institute of Higher Education and Research",
    category: "Medical",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private / Deemed",
    grade: "A++",
    affiliation: "Sri Ramachandra Institute",
    established: "1985",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED010",
    short: "SAVE",
    name: "Saveetha Institute of Medical and Technical Sciences",
    category: "Medical",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private / Deemed",
    grade: "A+",
    affiliation: "Saveetha Institute",
    established: "1988",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  /* ================= EXTRA ENGINEERING (14) ================= */

  createCollege({
    id: "ENG011",
    short: "KPR",
    name: "KPR Institute of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "2009",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG012",
    short: "SRE",
    name: "Sri Ramakrishna Engineering College",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "1994",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG013",
    short: "GCT",
    name: "Government College of Technology Coimbatore",
    category: "Engineering",
    location: "Coimbatore",
    type: "Government College",
    ownership: "Government",
    grade: "A+",
    affiliation: "Anna University",
    established: "1945",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG014",
    short: "KGI",
    name: "KGiSL Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2008",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG015",
    short: "SKC",
    name: "Sri Krishna College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "1998",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG016",
    short: "BIT",
    name: "Bannari Amman Institute of Technology",
    category: "Engineering",
    location: "Erode",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "1996",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG017",
    short: "KEC",
    name: "Kongu Engineering College",
    category: "Engineering",
    location: "Erode",
    type: "Autonomous",
    ownership: "Private",
    grade: "A++",
    affiliation: "Anna University",
    established: "1984",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG018",
    short: "ERD",
    name: "Erode Sengunthar Engineering College",
    category: "Engineering",
    location: "Erode",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "1984",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG019",
    short: "IRT",
    name: "Institute of Road and Transport Technology",
    category: "Engineering",
    location: "Erode",
    type: "Government Aided",
    ownership: "Government",
    grade: "A",
    affiliation: "Anna University",
    established: "1984",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG020",
    short: "NCE",
    name: "Nandha Engineering College",
    category: "Engineering",
    location: "Erode",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2001",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG021",
    short: "TCE",
    name: "Tiruppur Kumaran College of Engineering",
    category: "Engineering",
    location: "Tiruppur",
    type: "Private College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2008",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG022",
    short: "DGC",
    name: "Dr. Mahalingam College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruppur",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "1998",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG023",
    short: "GEC",
    name: "Government College of Engineering Bargur",
    category: "Engineering",
    location: "Tiruppur",
    type: "Government College",
    ownership: "Government",
    grade: "A",
    affiliation: "Anna University",
    established: "1994",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG024",
    short: "NGC",
    name: "Nilgiri College of Engineering",
    category: "Engineering",
    location: "Nilgiris",
    type: "Private College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2000",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  /* ================= EXTRA ARTS & SCIENCE (13) ================= */

  createCollege({
    id: "ART011",
    short: "GRG",
    name: "G.R.G. College of Arts and Science",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1965",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART012",
    short: "CCW",
    name: "Chikkanna Government Arts College",
    category: "Arts & Science",
    location: "Tiruppur",
    type: "Government College",
    ownership: "Government",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1966",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART013",
    short: "NAC",
    name: "Nehru Arts and Science College",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1985",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART014",
    short: "SRK",
    name: "Sri Krishna Arts and Science College",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Bharathiar University",
    established: "1996",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART015",
    short: "KEA",
    name: "Kongu Arts and Science College",
    category: "Arts & Science",
    location: "Erode",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1999",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART016",
    short: "CAC",
    name: "Chikkaiah Naicker College",
    category: "Arts & Science",
    location: "Erode",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1966",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART017",
    short: "EAC",
    name: "Erode Arts and Science College",
    category: "Arts & Science",
    location: "Erode",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1969",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART018",
    short: "VCW",
    name: "Vellalar College for Women",
    category: "Arts & Science",
    location: "Erode",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Bharathiar University",
    established: "1969",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART019",
    short: "NGA",
    name: "Nallamuthu Gounder Mahalingam College",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Bharathiar University",
    established: "1957",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART020",
    short: "GAC",
    name: "Government Arts College Udhagamandalam",
    category: "Arts & Science",
    location: "Nilgiris",
    type: "Government College",
    ownership: "Government",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1955",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART021",
    short: "SAC",
    name: "St. Joseph's College of Arts and Science",
    category: "Arts & Science",
    location: "Nilgiris",
    type: "Private College",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "1998",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART022",
    short: "VAC",
    name: "Vivekanandha College of Arts and Sciences for Women",
    category: "Arts & Science",
    location: "Tiruppur",
    type: "Private College",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "2000",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART023",
    short: "KAC",
    name: "Karpagam Academy of Higher Education",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Deemed University",
    ownership: "Private / Deemed",
    grade: "A+",
    affiliation: "Karpagam Academy",
    established: "2008",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  /* ================= EXTRA MEDICAL (13) ================= */

  createCollege({
    id: "MED011",
    short: "ESI",
    name: "ESIC Medical College and PGIMSR Coimbatore",
    category: "Medical",
    location: "Coimbatore",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2016",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED012",
    short: "KMC",
    name: "Kovai Medical Center and Hospital (KMCH)",
    category: "Medical",
    location: "Coimbatore",
    type: "Private Medical Institute",
    ownership: "Private",
    grade: "A+",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1992",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED013",
    short: "KFM",
    name: "Karpagam Faculty of Medical Sciences and Research",
    category: "Medical",
    location: "Coimbatore",
    type: "Private Medical College",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2012",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED014",
    short: "SRP",
    name: "Sri Ramakrishna Institute of Paramedical Sciences",
    category: "Medical",
    location: "Coimbatore",
    type: "Private Institute",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1998",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED015",
    short: "AVN",
    name: "Amrita School of Nursing and Allied Health Coimbatore",
    category: "Medical",
    location: "Coimbatore",
    type: "Private Institute",
    ownership: "Private",
    grade: "A+",
    affiliation: "Amrita Vishwa Vidyapeetham",
    established: "2003",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED016",
    short: "EGM",
    name: "Erode Government Medical College and Hospital",
    category: "Medical",
    location: "Erode",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2015",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED017",
    short: "KNC",
    name: "Kongu Nursing College",
    category: "Medical",
    location: "Erode",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2005",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED018",
    short: "VMC",
    name: "Vivekanandha College of Allied Health Sciences",
    category: "Medical",
    location: "Erode",
    type: "Private Institute",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2008",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED019",
    short: "TGM",
    name: "Tiruppur Government Medical College and Hospital",
    category: "Medical",
    location: "Tiruppur",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2021",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED020",
    short: "TNC",
    name: "Tiruppur College of Nursing and Allied Health",
    category: "Medical",
    location: "Tiruppur",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2010",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED021",
    short: "NGM",
    name: "Government Medical College Nilgiris",
    category: "Medical",
    location: "Nilgiris",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2021",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED022",
    short: "NNC",
    name: "Nilgiris College of Nursing",
    category: "Medical",
    location: "Nilgiris",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2007",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED023",
    short: "NAH",
    name: "Nilgiris Allied Health and Pharmacy College",
    category: "Medical",
    location: "Nilgiris",
    type: "Private Institute",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2012",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  /* ================= VELLORE / TIRUCHIRAPPALLI / MADURAI / SALEM (30 NEW) ================= */

  createCollege({
    id: "ENG025",
    short: "TPG",
    name: "Thanthai Periyar Government Institute of Technology",
    category: "Engineering",
    location: "Vellore",
    type: "Government College",
    ownership: "Government",
    grade: "A",
    affiliation: "Anna University",
    established: "1985",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG026",
    short: "SCE",
    name: "Saranathan College of Engineering",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "2001",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG028",
    short: "MAM",
    name: "M.A.M. College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Private College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2001",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG029",
    short: "TCE",
    name: "Thiagarajar College of Engineering",
    category: "Engineering",
    location: "Madurai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A++",
    affiliation: "Anna University",
    established: "1957",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG030",
    short: "VCE",
    name: "Velammal College of Engineering and Technology",
    category: "Engineering",
    location: "Madurai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "1995",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG031",
    short: "FMC",
    name: "Fatima Michael College of Engineering and Technology",
    category: "Engineering",
    location: "Madurai",
    type: "Private College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2008",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG032",
    short: "GCS",
    name: "Government College of Engineering Salem",
    category: "Engineering",
    location: "Salem",
    type: "Government College",
    ownership: "Government",
    grade: "A+",
    affiliation: "Anna University",
    established: "1966",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG033",
    short: "SCT",
    name: "Sona College of Technology",
    category: "Engineering",
    location: "Salem",
    type: "Autonomous",
    ownership: "Private",
    grade: "A++",
    affiliation: "Anna University",
    established: "1997",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG034",
    short: "VMK",
    name: "Vinayaka Mission's Kirupananda Variyar Engineering College",
    category: "Engineering",
    location: "Salem",
    type: "Private College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "1985",
    courses: [
      "Aerospace Engineering",
      "Aeronautical Engineering (Lateral)",
      "Agricultural Engineering",
      "Automobile Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Electronics and Instrumentation Engineering",
      "Mechatronics Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Computer Science and Technology",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ART024",
    short: "VRC",
    name: "Voorhees College",
    category: "Arts & Science",
    location: "Vellore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Thiruvalluvar University",
    established: "1898",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART025",
    short: "AUX",
    name: "Auxilium College",
    category: "Arts & Science",
    location: "Vellore",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Thiruvalluvar University",
    established: "1957",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART026",
    short: "SJT",
    name: "St. Joseph's College Tiruchirappalli",
    category: "Arts & Science",
    location: "Tiruchirappalli",
    type: "Autonomous",
    ownership: "Private",
    grade: "A++",
    affiliation: "Bharathidasan University",
    established: "1844",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART027",
    short: "BHC",
    name: "Bishop Heber College",
    category: "Arts & Science",
    location: "Tiruchirappalli",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathidasan University",
    established: "1966",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART028",
    short: "JMC",
    name: "Jamal Mohamed College",
    category: "Arts & Science",
    location: "Tiruchirappalli",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathidasan University",
    established: "1951",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART029",
    short: "AMC",
    name: "The American College",
    category: "Arts & Science",
    location: "Madurai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Madurai Kamaraj University",
    established: "1881",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART030",
    short: "LDC",
    name: "Lady Doak College",
    category: "Arts & Science",
    location: "Madurai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A+",
    affiliation: "Madurai Kamaraj University",
    established: "1948",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART031",
    short: "MDC",
    name: "The Madura College",
    category: "Arts & Science",
    location: "Madurai",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Madurai Kamaraj University",
    established: "1889",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART032",
    short: "GAS",
    name: "Government Arts College Salem",
    category: "Arts & Science",
    location: "Salem",
    type: "Government College",
    ownership: "Government",
    grade: "A",
    affiliation: "Periyar University",
    established: "1857",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART033",
    short: "SSC",
    name: "Sri Sarada College for Women",
    category: "Arts & Science",
    location: "Salem",
    type: "Autonomous",
    ownership: "Private",
    grade: "A",
    affiliation: "Periyar University",
    established: "1970",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "MED024",
    short: "CMC",
    name: "Christian Medical College Vellore",
    category: "Medical",
    location: "Vellore",
    type: "Private Medical College",
    ownership: "Private",
    grade: "A++",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1900",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED025",
    short: "GVM",
    name: "Government Vellore Medical College",
    category: "Medical",
    location: "Vellore",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2008",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED026",
    short: "CNV",
    name: "College of Nursing, Christian Medical College Vellore",
    category: "Medical",
    location: "Vellore",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "A+",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1946",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED027",
    short: "KAP",
    name: "K.A.P. Viswanatham Government Medical College Tiruchirappalli",
    category: "Medical",
    location: "Tiruchirappalli",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1997",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED028",
    short: "TSM",
    name: "Trichy SRM Medical College Hospital and Research Centre",
    category: "Medical",
    location: "Tiruchirappalli",
    type: "Private Medical College",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2008",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),


  createCollege({
    id: "MED030",
    short: "VMH",
    name: "Velammal Medical College Hospital and Research Institute",
    category: "Medical",
    location: "Madurai",
    type: "Private Medical College",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2013",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED031",
    short: "GMK",
    name: "Government Mohan Kumaramangalam Medical College Salem",
    category: "Medical",
    location: "Salem",
    type: "Government Medical College",
    ownership: "Government",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1986",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED032",
    short: "VKM",
    name: "Vinayaka Mission's Kirupananda Variyar Medical College and Hospitals",
    category: "Medical",
    location: "Salem",
    type: "Private Medical College",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1995",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED033",
    short: "VSD",
    name: "Vinayaka Mission's Sankarachariyar Dental College",
    category: "Medical",
    location: "Salem",
    type: "Private Medical Institute",
    ownership: "Private",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1999",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  /* ================= AGRICULTURE ================= */

  createCollege({
    id: "AGR001",
    short: "ACRI",
    name: "Agricultural College and Research Institute, Coimbatore (TNAU)",
    category: "Agriculture",
    location: "Coimbatore",
    type: "Government Agricultural College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Agricultural University",
    established: "1906",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "B.Sc (Hons) Forestry",
      "M.Sc Agriculture",
      "Ph.D Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR002",
    short: "AEC",
    name: "Agricultural Engineering College and Research Institute, Coimbatore (TNAU)",
    category: "Agriculture",
    location: "Coimbatore",
    type: "Government Agricultural College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Agricultural University",
    established: "1972",
    status: "Verified",
    courses: [
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "M.Sc Agriculture",
      "Ph.D Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR003",
    short: "HCRI",
    name: "Horticultural College and Research Institute, Coimbatore (TNAU)",
    category: "Agriculture",
    location: "Coimbatore",
    type: "Government Agricultural College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Agricultural University",
    established: "1972",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Horticulture",
      "B.Sc (Hons) Forestry",
      "M.Sc Agriculture",
      "Ph.D Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR004",
    short: "ACRM",
    name: "Agricultural College and Research Institute, Madurai (TNAU)",
    category: "Agriculture",
    location: "Madurai",
    type: "Government Agricultural College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Agricultural University",
    established: "1965",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "B.Sc (Hons) Forestry",
      "M.Sc Agriculture",
      "Ph.D Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR005",
    short: "ACRK",
    name: "Agricultural College and Research Institute, Killikulam (TNAU)",
    category: "Agriculture",
    location: "Thoothukudi",
    type: "Government Agricultural College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Agricultural University",
    established: "1984",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "B.Sc (Hons) Forestry",
      "M.Sc Agriculture",
      "Ph.D Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR006",
    short: "ADAC",
    name: "Anbil Dharmalingam Agricultural College and Research Institute, Tiruchirappalli (TNAU)",
    category: "Agriculture",
    location: "Tiruchirappalli",
    type: "Government Agricultural College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Agricultural University",
    established: "1989",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "B.Sc (Hons) Forestry",
      "M.Sc Agriculture",
      "Ph.D Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR007",
    short: "AUA",
    name: "Faculty of Agriculture, Annamalai University",
    category: "Agriculture",
    location: "Chidambaram",
    type: "State University Faculty",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Annamalai University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "B.Sc (Hons) Forestry",
      "M.Sc Agriculture",
      "Ph.D Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR008",
    short: "KSAH",
    name: "Kalasalingam School of Agriculture and Horticulture",
    category: "Agriculture",
    location: "Virudhunagar",
    type: "Private University School",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Kalasalingam Academy of Research and Education",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "B.Sc (Hons) Forestry",
      "M.Sc Agriculture",
      "Ph.D Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  /* ================= LAW ================= */

  createCollege({
    id: "LAW001",
    short: "SOEL",
    name: "School of Excellence in Law, Tamil Nadu Dr. Ambedkar Law University",
    category: "Law",
    location: "Chennai",
    type: "State Law University",
    ownership: "Government",
    grade: "B++",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "2002",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "B.Com. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
      "Ph.D Law",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  createCollege({
    id: "LAW002",
    short: "TNNLU",
    name: "Tamil Nadu National Law University",
    category: "Law",
    location: "Tiruchirappalli",
    type: "National Law University",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu National Law University",
    established: "2012",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "B.Com. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
      "Ph.D Law",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  createCollege({
    id: "LAW003",
    short: "AGLC",
    name: "Dr. Ambedkar Government Law College, Chennai",
    category: "Law",
    location: "Chennai",
    type: "Government Law College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "1891",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "B.Com. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  createCollege({
    id: "LAW004",
    short: "GLCM",
    name: "Government Law College, Madurai",
    category: "Law",
    location: "Madurai",
    type: "Government Law College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "1974",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "B.Com. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  createCollege({
    id: "LAW005",
    short: "GLCT",
    name: "Government Law College, Tiruchirappalli",
    category: "Law",
    location: "Tiruchirappalli",
    type: "Government Law College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "1979",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "B.Com. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  createCollege({
    id: "LAW006",
    short: "GLCC",
    name: "Government Law College, Coimbatore",
    category: "Law",
    location: "Coimbatore",
    type: "Government Law College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "1979",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "B.Com. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  createCollege({
    id: "LAW007",
    short: "SRL",
    name: "SRM School of Law",
    category: "Law",
    location: "Chennai",
    type: "Private University School",
    ownership: "Private",
    grade: "N/A",
    affiliation: "SRM Institute of Science and Technology",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "B.Com. LL.B. (Hons) - 5 Years",
      "B.Sc. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
      "Ph.D Law",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  createCollege({
    id: "LAW008",
    short: "SSL",
    name: "Saveetha School of Law",
    category: "Law",
    location: "Chennai",
    type: "Private University School",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Saveetha Institute of Medical and Technical Sciences",
    established: "2009",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "B.Com. LL.B. (Hons) - 5 Years",
      "B.Sc. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
      "Ph.D Law",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  /* ================= NURSING ================= */

  createCollege({
    id: "NUR001",
    short: "GCN",
    name: "Government College of Nursing, Madras Medical College",
    category: "Nursing",
    location: "Chennai",
    type: "Government Nursing College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
      "Ph.D Nursing",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR002",
    short: "GCNM",
    name: "Government College of Nursing, Madurai Medical College",
    category: "Nursing",
    location: "Madurai",
    type: "Government Nursing College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
      "Ph.D Nursing",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR003",
    short: "SCN",
    name: "Saveetha College of Nursing",
    category: "Nursing",
    location: "Chennai",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Saveetha Institute of Medical and Technical Sciences",
    established: "1992",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
      "Ph.D Nursing",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR004",
    short: "SRCN",
    name: "SRM College of Nursing",
    category: "Nursing",
    location: "Chennai",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "SRM Institute of Science and Technology",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
      "Ph.D Nursing",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR005",
    short: "SRFN",
    name: "Sri Ramachandra Faculty of Nursing",
    category: "Nursing",
    location: "Chennai",
    type: "Deemed University Faculty",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Sri Ramachandra Institute of Higher Education and Research",
    established: "1993",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
      "Ph.D Nursing",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR006",
    short: "MCN",
    name: "Meenakshi College of Nursing",
    category: "Nursing",
    location: "Chennai",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Meenakshi Academy of Higher Education and Research",
    established: "1998",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
      "Ph.D Nursing",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR007",
    short: "SBCN",
    name: "Sree Balaji College of Nursing",
    category: "Nursing",
    location: "Chennai",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Bharath Institute of Higher Education and Research",
    established: "1992",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
      "Ph.D Nursing",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR008",
    short: "PCN",
    name: "PSG College of Nursing",
    category: "Nursing",
    location: "Coimbatore",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "1994",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
      "Ph.D Nursing",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  /* ================= ALLIED HEALTH ================= */

  createCollege({
    id: "AHS001",
    short: "SRAH",
    name: "Sri Ramachandra Faculty of Allied Health Sciences",
    category: "Allied Health",
    location: "Chennai",
    type: "Deemed University Faculty",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Sri Ramachandra Institute of Higher Education and Research",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Emergency Medicine Technology",
      "B.Sc Optometry",
      "B.Sc Dialysis Technology",
      "B.Sc Respiratory Therapy",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS002",
    short: "MAH",
    name: "Meenakshi Faculty of Allied Health Sciences",
    category: "Allied Health",
    location: "Chennai",
    type: "Deemed University Faculty",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Meenakshi Academy of Higher Education and Research",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Emergency Medicine Technology",
      "B.Sc Optometry",
      "B.Sc Dialysis Technology",
      "B.Sc Respiratory Therapy",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS003",
    short: "SRMH",
    name: "SRM College of Health Sciences",
    category: "Allied Health",
    location: "Chennai",
    type: "Private University College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "SRM Institute of Science and Technology",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Emergency Medicine Technology",
      "B.Sc Optometry",
      "B.Sc Dialysis Technology",
      "B.Sc Respiratory Therapy",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS004",
    short: "SBAH",
    name: "Sree Balaji College of Allied Health Sciences",
    category: "Allied Health",
    location: "Chennai",
    type: "Private Allied Health College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Bharath Institute of Higher Education and Research",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Emergency Medicine Technology",
      "B.Sc Optometry",
      "B.Sc Dialysis Technology",
      "B.Sc Respiratory Therapy",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS005",
    short: "CAH",
    name: "Chettinad School of Allied Health Sciences",
    category: "Allied Health",
    location: "Chennai",
    type: "Private University School",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Chettinad Academy of Research and Education",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Emergency Medicine Technology",
      "B.Sc Optometry",
      "B.Sc Dialysis Technology",
      "B.Sc Respiratory Therapy",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS006",
    short: "KIHS",
    name: "KMCH Institute of Health Sciences and Research",
    category: "Allied Health",
    location: "Coimbatore",
    type: "Private Allied Health Institute",
    ownership: "Private",
    grade: "N/A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Emergency Medicine Technology",
      "B.Sc Optometry",
      "B.Sc Dialysis Technology",
      "B.Sc Respiratory Therapy",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  /* ================= PHYSIOTHERAPY ================= */

  createCollege({
    id: "PHY001",
    short: "SCP",
    name: "Saveetha College of Physiotherapy",
    category: "Physiotherapy",
    location: "Chennai",
    type: "Private Physiotherapy College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Saveetha Institute of Medical and Technical Sciences",
    established: "1993",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Cardiopulmonary",
      "MPT Sports Physiotherapy",
      "MPT Paediatrics",
      "Ph.D Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "PHY002",
    short: "SRCP",
    name: "SRM College of Physiotherapy",
    category: "Physiotherapy",
    location: "Chennai",
    type: "Private Physiotherapy College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "SRM Institute of Science and Technology",
    established: "College Specific",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Cardiopulmonary",
      "MPT Sports Physiotherapy",
      "MPT Paediatrics",
      "Ph.D Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "PHY003",
    short: "SRFP",
    name: "Sri Ramachandra Faculty of Physiotherapy",
    category: "Physiotherapy",
    location: "Chennai",
    type: "Deemed University Faculty",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Sri Ramachandra Institute of Higher Education and Research",
    established: "1993",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Cardiopulmonary",
      "MPT Sports Physiotherapy",
      "MPT Paediatrics",
      "Ph.D Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "PHY004",
    short: "MCP",
    name: "Meenakshi College of Physiotherapy",
    category: "Physiotherapy",
    location: "Chennai",
    type: "Private Physiotherapy College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Meenakshi Academy of Higher Education and Research",
    established: "1998",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Cardiopulmonary",
      "MPT Sports Physiotherapy",
      "MPT Paediatrics",
      "Ph.D Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "PHY005",
    short: "SBCP",
    name: "Sree Balaji College of Physiotherapy",
    category: "Physiotherapy",
    location: "Chennai",
    type: "Private Physiotherapy College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Bharath Institute of Higher Education and Research",
    established: "College Specific",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Cardiopulmonary",
      "MPT Sports Physiotherapy",
      "MPT Paediatrics",
      "Ph.D Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "PHY006",
    short: "VMCP",
    name: "Vinayaka Mission's College of Physiotherapy",
    category: "Physiotherapy",
    location: "Salem",
    type: "Private Physiotherapy College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "Vinayaka Mission's Research Foundation",
    established: "1993",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Cardiopulmonary",
      "MPT Sports Physiotherapy",
      "MPT Paediatrics",
      "Ph.D Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "PHY007",
    short: "PCP",
    name: "PSG College of Physiotherapy",
    category: "Physiotherapy",
    location: "Coimbatore",
    type: "Private Physiotherapy College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Cardiopulmonary",
      "MPT Sports Physiotherapy",
      "MPT Paediatrics",
      "Ph.D Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "PHY008",
    short: "KCP",
    name: "KMCH College of Physiotherapy",
    category: "Physiotherapy",
    location: "Coimbatore",
    type: "Private Physiotherapy College",
    ownership: "Private",
    grade: "N/A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Cardiopulmonary",
      "MPT Sports Physiotherapy",
      "MPT Paediatrics",
      "Ph.D Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "ENG035",
    short: "KARE",
    name: "Kalasalingam Academy of Research and Education",
    category: "Engineering",
    location: "Virudhunagar",
    type: "Deemed University",
    ownership: "Private",
    grade: "A",
    affiliation: "Deemed to be University (UGC)",
    established: "1984",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
      "Bio-Medical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG036",
    short: "KNCET",
    name: "Kongunadu College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Autonomous",
    ownership: "Private",
    grade: "B++",
    affiliation: "Anna University, Chennai",
    established: "2007",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ART034",
    short: "AU",
    name: "Annamalai University",
    category: "Arts & Science",
    location: "Chidambaram",
    type: "State University",
    ownership: "Government",
    grade: "A",
    affiliation: "Annamalai University (State University)",
    established: "1929",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Statistics",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "MED034",
    short: "RMMC",
    name: "Rajah Muthiah Medical College and Hospital (Annamalai University)",
    category: "Medical",
    location: "Chidambaram",
    type: "University Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Annamalai University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "MBBS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "ENG037",
    short: "AU-FET",
    name: "Annamalai University Faculty of Engineering and Technology",
    category: "Engineering",
    location: "Chidambaram",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A+",
    affiliation: "Anna University",
    established: "1945",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG038",
    short: "KCET",
    name: "Kamaraj College of Engineering and Technology",
    category: "Engineering",
    location: "Madurai",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A",
    affiliation: "Anna University",
    established: "1998",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG039",
    short: "SCE",
    name: "Solamalai College of Engineering",
    category: "Engineering",
    location: "Madurai",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A",
    affiliation: "Anna University",
    established: "1995",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG040",
    short: "IGCE",
    name: "Indra Ganesan College of Engineering",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "B++",
    affiliation: "Anna University",
    established: "2008",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG041",
    short: "MIET",
    name: "M.I.E.T. Engineering College",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A+",
    affiliation: "Anna University",
    established: "1998",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG042",
    short: "KRCT",
    name: "K.Ramakrishnan College of Technology",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A+",
    affiliation: "Anna University",
    established: "2010",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG043",
    short: "JJCET",
    name: "J.J College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A",
    affiliation: "Anna University",
    established: "1994–95",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG045",
    short: "MSEC",
    name: "Mepco Schlenk Engineering College",
    category: "Engineering",
    location: "Virudhunagar",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A",
    affiliation: "Anna University",
    established: "1984",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG046",
    short: "PSR",
    name: "P.S.R Engineering College",
    category: "Engineering",
    location: "Virudhunagar",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A+",
    affiliation: "Anna University",
    established: "1998",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG047",
    short: "RIT",
    name: "Ramco Institute of Technology",
    category: "Engineering",
    location: "Virudhunagar",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A+",
    affiliation: "Anna University",
    established: "2013",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG048",
    short: "GTEC",
    name: "Ganadipathy Tulsi's Jain Engineering College",
    category: "Engineering",
    location: "Vellore",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "B",
    affiliation: "Anna University",
    established: "2000",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG049",
    short: "KEC",
    name: "Kingston Engineering College",
    category: "Engineering",
    location: "Vellore",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "A",
    affiliation: "Anna University",
    established: "2008",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG050",
    short: "SCET",
    name: "Sri Shanmugha College of Engineering and Technology",
    category: "Engineering",
    location: "Salem",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG051",
    short: "SCE",
    name: "Salem College of Engineering and Technology",
    category: "Engineering",
    location: "Salem",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG052",
    short: "SECE",
    name: "Sri Eshwar College of Engineering",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "2001",
    status: "Verified",
    courses: [
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG053",
    short: "KCET",
    name: "Kurinji College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG054",
    short: "SUREYA",
    name: "Sureya College of Engineering",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ENG055",
    short: "SACET",
    name: "Shri Angalamman College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Engineering College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Aerospace Engineering",
      "Artificial Intelligence and Machine Learning",
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),
  createCollege({
    id: "ART035",
    short: "AAS",
    name: "Ambiga College of Arts & Science",
    category: "Arts & Science",
    location: "Madurai",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART036",
    short: "CSI",
    name: "C.S.I. College of Arts & Science for Women",
    category: "Arts & Science",
    location: "Madurai",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART037",
    short: "MACW",
    name: "Mangayarkarasi Arts & Science College for Women",
    category: "Arts & Science",
    location: "Madurai",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART038",
    short: "SSC",
    name: "Salem Sowdeswari College",
    category: "Arts & Science",
    location: "Salem",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART039",
    short: "VYSYA",
    name: "Vysya College",
    category: "Arts & Science",
    location: "Salem",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART040",
    short: "JAC",
    name: "Jairam Arts & Science College",
    category: "Arts & Science",
    location: "Salem",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART041",
    short: "SBAS",
    name: "Sri Balamurugan College of Arts & Science",
    category: "Arts & Science",
    location: "Salem",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART042",
    short: "SGAS",
    name: "Sri Ganesh College of Arts & Science",
    category: "Arts & Science",
    location: "Salem",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART043",
    short: "SSKWC",
    name: "Sri Sakthikailash Women's College",
    category: "Arts & Science",
    location: "Salem",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART044",
    short: "PCAS",
    name: "Paavendhar College of Arts & Science",
    category: "Arts & Science",
    location: "Salem",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART045",
    short: "AET",
    name: "AET Arts & Science College",
    category: "Arts & Science",
    location: "Salem",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART046",
    short: "DKM",
    name: "D.K.M. College for Women",
    category: "Arts & Science",
    location: "Vellore",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART047",
    short: "MUC",
    name: "Mazharul Uloom College",
    category: "Arts & Science",
    location: "Vellore",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART048",
    short: "GTMC",
    name: "Government Thirumagal Mills College",
    category: "Arts & Science",
    location: "Vellore",
    type: "Arts & Science College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART049",
    short: "MGAC",
    name: "Muthurangam Government Arts College",
    category: "Arts & Science",
    location: "Vellore",
    type: "Arts & Science College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "ART050",
    short: "SCW",
    name: "Sourashtra College for Women",
    category: "Arts & Science",
    location: "Madurai",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  createCollege({
    id: "MED035",
    short: "GMCV",
    name: "Government Medical College Virudhunagar",
    category: "Medical",
    location: "Virudhunagar",
    type: "Medical / Health Sciences Institution",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),
  createCollege({
    id: "MED036",
    short: "GMCT",
    name: "Government Thoothukudi Medical College",
    category: "Medical",
    location: "Thoothukudi",
    type: "Medical / Health Sciences Institution",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),
  createCollege({
    id: "MED037",
    short: "GHCH",
    name: "Government Homeopathy College Hospital, Madurai",
    category: "Medical",
    location: "Madurai",
    type: "Medical / Health Sciences Institution",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),
  createCollege({
    id: "MED038",
    short: "SIMSR",
    name: "Sri Shanmugha Institute of Medical Sciences and Research",
    category: "Medical",
    location: "Salem",
    type: "Medical / Health Sciences Institution",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),
  createCollege({
    id: "MED039",
    short: "GDCH",
    name: "Government Dental College & Hospital, Chidambaram",
    category: "Medical",
    location: "Chidambaram",
    type: "Medical / Health Sciences Institution",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),
  createCollege({
    id: "NUR009",
    short: "SNSN",
    name: "SNS College of Nursing",
    category: "Nursing",
    location: "Coimbatore",
    type: "Nursing College",
    ownership: "Private / Autonomous",
    grade: "A",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2020",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),
  createCollege({
    id: "NUR011",
    short: "SNCN",
    name: "Sri Narayani College of Nursing",
    category: "Nursing",
    location: "Vellore",
    type: "Nursing College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),
  createCollege({
    id: "NUR012",
    short: "BPR",
    name: "BPR School and College of Nursing",
    category: "Nursing",
    location: "Vellore",
    type: "Nursing College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),
  createCollege({
    id: "NUR013",
    short: "TCN",
    name: "Tagore College of Nursing",
    category: "Nursing",
    location: "Salem",
    type: "Nursing College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),
  createCollege({
    id: "NUR014",
    short: "VCN",
    name: "Vikram College of Nursing",
    category: "Nursing",
    location: "Madurai",
    type: "Nursing College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),
  createCollege({
    id: "AHS007",
    short: "SNCAHS",
    name: "SNS College of Allied Health Science",
    category: "Allied Health",
    location: "Coimbatore",
    type: "Allied Health Sciences College",
    ownership: "Private / Autonomous",
    grade: "NAAC",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2019",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Optometry",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),
  createCollege({
    id: "AHS008",
    short: "SNCPHS",
    name: "SNS College of Pharmacy and Health Sciences",
    category: "Allied Health",
    location: "Coimbatore",
    type: "Allied Health Sciences College",
    ownership: "Private / Autonomous",
    grade: "NAAC",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2019",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Optometry",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),
  createCollege({
    id: "AHS009",
    short: "SCAHS",
    name: "Sri Shanmugha College of Allied Health Sciences",
    category: "Allied Health",
    location: "Salem",
    type: "Allied Health Sciences College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Optometry",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),
  createCollege({
    id: "AHS010",
    short: "C M C",
    name: "Christian Medical College Faculty of Allied Health Sciences",
    category: "Allied Health",
    location: "Vellore",
    type: "Allied Health Sciences College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Optometry",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),
  createCollege({
    id: "PHY009",
    short: "SNSP",
    name: "SNS College of Physiotherapy",
    category: "Physiotherapy",
    location: "Coimbatore",
    type: "Physiotherapy College",
    ownership: "Private / Autonomous",
    grade: "CCPA",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2020",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Sports Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),
  createCollege({
    id: "PHY011",
    short: "SCP",
    name: "Santosh College of Physiotherapy",
    category: "Physiotherapy",
    location: "Madurai",
    type: "Physiotherapy College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Sports Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),
  createCollege({
    id: "PHY012",
    short: "SSCP",
    name: "Sri Shanmugha College of Physiotherapy",
    category: "Physiotherapy",
    location: "Salem",
    type: "Physiotherapy College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Sports Physiotherapy",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),
  createCollege({
    id: "AGR009",
    short: "ACRI",
    name: "Agricultural College & Research Institute, Madurai",
    category: "Agriculture",
    location: "Madurai",
    type: "Agriculture College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "Tamil Nadu Agricultural University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "M.Sc Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),
  createCollege({
    id: "AGR010",
    short: "ADACRI",
    name: "Anbil Dharmalingam Agricultural College and Research Institute",
    category: "Agriculture",
    location: "Tiruchirappalli",
    type: "Agriculture College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "Tamil Nadu Agricultural University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "M.Sc Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),
  createCollege({
    id: "AGR011",
    short: "AUFA",
    name: "Annamalai University Faculty of Agriculture",
    category: "Agriculture",
    location: "Chidambaram",
    type: "Agriculture College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "Tamil Nadu Agricultural University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "M.Sc Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),
  createCollege({
    id: "LAW009",
    short: "GLCV",
    name: "Government Law College, Vellore",
    category: "Law",
    location: "Vellore",
    type: "Law College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),
  createCollege({
    id: "LAW010",
    short: "GLCS",
    name: "Government Law College, Salem",
    category: "Law",
    location: "Salem",
    type: "Law College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),
  createCollege({
    id: "LAW011",
    short: "CLC",
    name: "Central Law College, Salem",
    category: "Law",
    location: "Salem",
    type: "Law College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),
  createCollege({
    id: "ART051",
    short: "VCW",
    name: "Vivekanandha College for Women",
    category: "Arts & Science",
    location: "Salem",
    type: "Arts & Science College",
    ownership: "Private / Autonomous",
    grade: "College Specific",
    affiliation: "College/University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),
  /* ================= 50 ADDITIONAL COLLEGES: 201-250 ================= */

  createCollege({
    id: "ENG056",
    short: "RTC",
    name: "Rathinam Technical Campus",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "2001",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG057",
    short: "HiCET",
    name: "Hindusthan College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A++",
    affiliation: "Anna University",
    established: "2000",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG058",
    short: "NGPIT",
    name: "Dr. N.G.P. Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "2007",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG059",
    short: "RVSCET",
    name: "RVS College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "2007",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG060",
    short: "ACE",
    name: "Adhiyamaan College of Engineering",
    category: "Engineering",
    location: "Hosur",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "1985",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG061",
    short: "REC",
    name: "Rajalakshmi Engineering College",
    category: "Engineering",
    location: "Chennai",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A++",
    affiliation: "Anna University",
    established: "1997",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG062",
    short: "RMKEC",
    name: "RMK Engineering College",
    category: "Engineering",
    location: "Tiruvallur",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "1995",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG063",
    short: "VEC",
    name: "Velammal Engineering College",
    category: "Engineering",
    location: "Chennai",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "1995",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG064",
    short: "SJCE",
    name: "St. Joseph's College of Engineering",
    category: "Engineering",
    location: "Chennai",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "1994",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG065",
    short: "JEC",
    name: "Jeppiaar Engineering College",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2001",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG066",
    short: "PEC",
    name: "Panimalar Engineering College",
    category: "Engineering",
    location: "Chennai",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2000",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG067",
    short: "BIHER",
    name: "Bharath Institute of Higher Education and Research",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private / Deemed",
    grade: "A",
    affiliation: "Deemed to be University",
    established: "1984",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG068",
    short: "GCE-DPI",
    name: "Government College of Engineering, Dharmapuri",
    category: "Engineering",
    location: "Dharmapuri",
    type: "Government Engineering College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "2013",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG069",
    short: "UCE-A",
    name: "University College of Engineering, Ariyalur",
    category: "Engineering",
    location: "Ariyalur",
    type: "Constituent Engineering College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "2008",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG070",
    short: "NIUCE",
    name: "Noorul Islam College of Engineering",
    category: "Engineering",
    location: "Kanyakumari",
    type: "Deemed University Constituent College",
    ownership: "Private / Deemed",
    grade: "College Specific",
    affiliation: "Noorul Islam Centre for Higher Education",
    established: "1989",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG071",
    short: "FXEC",
    name: "Francis Xavier Engineering College",
    category: "Engineering",
    location: "Tirunelveli",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "2000",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG072",
    short: "DSEC",
    name: "Dhanalakshmi Srinivasan Engineering College",
    category: "Engineering",
    location: "Perambalur",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2001",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG074",
    short: "KCE",
    name: "Karpagam College of Engineering",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A+",
    affiliation: "Anna University",
    established: "2000",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG075",
    short: "SKCT",
    name: "Sri Krishna College of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1985",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ART052",
    short: "NGPASC",
    name: "Dr. N.G.P. Arts and Science College",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous Arts & Science College",
    ownership: "Private",
    grade: "A++",
    affiliation: "Bharathiar University",
    established: "1997",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART053",
    short: "GAC-DPI",
    name: "Government Arts College, Dharmapuri",
    category: "Arts & Science",
    location: "Dharmapuri",
    type: "Government Arts College",
    ownership: "Government",
    grade: "B++",
    affiliation: "Periyar University",
    established: "1965",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART054",
    short: "HCC",
    name: "Holy Cross College, Tiruchirappalli",
    category: "Arts & Science",
    location: "Tiruchirappalli",
    type: "Autonomous Arts & Science College",
    ownership: "Private",
    grade: "A++",
    affiliation: "Bharathidasan University",
    established: "1923",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART055",
    short: "SSCWS",
    name: "Sri Sarada College for Women, Salem",
    category: "Arts & Science",
    location: "Salem",
    type: "Autonomous Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Periyar University",
    established: "1961",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART056",
    short: "NCW",
    name: "Nirmala College for Women",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous Arts & Science College",
    ownership: "Private",
    grade: "A++",
    affiliation: "Bharathiar University",
    established: "1948",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART057",
    short: "KCLAS",
    name: "Kumaraguru College of Liberal Arts and Science",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Bharathiar University",
    established: "2018",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART058",
    short: "SNRS",
    name: "SNR Sons College",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Bharathiar University",
    established: "1997",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART059",
    short: "SRMV",
    name: "Sri Ramakrishna Mission Vidyalaya College of Arts and Science",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous Arts & Science College",
    ownership: "Private",
    grade: "A+",
    affiliation: "Bharathiar University",
    established: "1964",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),


  createCollege({
    id: "MED040",
    short: "GMC-DPI",
    name: "Government Medical College, Dharmapuri",
    category: "Medical",
    location: "Dharmapuri",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2008",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED041",
    short: "GMC-PDK",
    name: "Government Medical College, Pudukottai",
    category: "Medical",
    location: "Pudukottai",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2017",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED042",
    short: "GMC-KAR",
    name: "Government Medical College, Karur",
    category: "Medical",
    location: "Karur",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2019",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED043",
    short: "GMC-NAM",
    name: "Government Medical College, Namakkal",
    category: "Medical",
    location: "Namakkal",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2021",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED044",
    short: "GMC-KLK",
    name: "Government Medical College, Kallakurichi",
    category: "Medical",
    location: "Kallakurichi",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2021",
    status: "Verified",
    courses: [
      "MBBS",
      "BDS",
      "B.Sc Nursing",
      "BPT / Physiotherapy",
      "Pharmacy",
      "Allied Health Sciences",
      "Nursing",
      "Postgraduate Medical Courses",
    ],
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "NUR015",
    short: "ACN",
    name: "Apollo College of Nursing",
    category: "Nursing",
    location: "Chennai",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2006",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR016",
    short: "SRCN",
    name: "Sri Ramachandra College of Nursing",
    category: "Nursing",
    location: "Chennai",
    type: "Deemed University Nursing College",
    ownership: "Private / Deemed",
    grade: "College Specific",
    affiliation: "Sri Ramachandra Institute of Higher Education and Research",
    established: "1988",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR017",
    short: "CCN",
    name: "Chettinad College of Nursing",
    category: "Nursing",
    location: "Kanchipuram",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2008",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR018",
    short: "SACN",
    name: "Sree Abirami College of Nursing",
    category: "Nursing",
    location: "Coimbatore",
    type: "Private Nursing College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.Sc Nursing",
      "Post Basic B.Sc Nursing",
      "M.Sc Nursing",
      "GNM (General Nursing & Midwifery)",
    ],
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "AHS011",
    short: "KMCH-AHS",
    name: "KMCH Institute of Allied Health Sciences",
    category: "Allied Health",
    location: "Coimbatore",
    type: "Private Allied Health College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2011",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Optometry",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS012",
    short: "PSG-AHS",
    name: "PSG College of Allied Health Sciences",
    category: "Allied Health",
    location: "Coimbatore",
    type: "Private Allied Health College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2016",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Optometry",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS013",
    short: "RATH-AHS",
    name: "Rathinam College of Allied Health Sciences",
    category: "Allied Health",
    location: "Coimbatore",
    type: "Private Allied Health College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2019",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Optometry",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS014",
    short: "CHRI-AHS",
    name: "Chettinad Hospital and Research Institute - Allied Health Sciences",
    category: "Allied Health",
    location: "Kanchipuram",
    type: "Private Allied Health College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2006",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Optometry",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS015",
    short: "SRFAHS",
    name: "Sri Ramachandra Institute of Allied Health Sciences",
    category: "Allied Health",
    location: "Chennai",
    type: "Deemed University Allied Health Faculty",
    ownership: "Private / Deemed",
    grade: "College Specific",
    affiliation: "Sri Ramachandra Institute of Higher Education and Research",
    established: "1995",
    status: "Verified",
    courses: [
      "B.Sc Medical Laboratory Technology",
      "B.Sc Radiology & Imaging Technology",
      "B.Sc Operation Theatre & Anaesthesia Technology",
      "B.Sc Cardiac Care Technology",
      "B.Sc Optometry",
    ],
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AGR012",
    short: "GCA-TRY",
    name: "Government College of Agriculture, Tiruchirappalli",
    category: "Agriculture",
    location: "Tiruchirappalli",
    type: "Government Agriculture College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Tamil Nadu Agricultural University",
    established: "1989",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "M.Sc Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR013",
    short: "HCRI-CBE",
    name: "Horticultural College and Research Institute, Coimbatore",
    category: "Agriculture",
    location: "Coimbatore",
    type: "Agriculture Research Institute",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Tamil Nadu Agricultural University",
    established: "1979",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "M.Sc Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR014",
    short: "AECRI-K",
    name: "Agricultural Engineering College and Research Institute, Kumulur",
    category: "Agriculture",
    location: "Tiruchirappalli",
    type: "Agricultural Engineering Research Institute",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Tamil Nadu Agricultural University",
    established: "1972",
    status: "Verified",
    courses: [
      "B.Sc (Hons) Agriculture",
      "B.Sc (Hons) Horticulture",
      "B.Tech Agricultural Engineering",
      "B.Tech Food Technology",
      "M.Sc Agriculture",
    ],
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "LAW012",
    short: "GLC-DPI",
    name: "Government Law College, Dharmapuri",
    category: "Law",
    location: "Dharmapuri",
    type: "Government Law College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "2017",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  createCollege({
    id: "LAW013",
    short: "GLC-TVL",
    name: "Government Law College, Tirunelveli",
    category: "Law",
    location: "Tirunelveli",
    type: "Government Law College",
    ownership: "Government",
    grade: "N/A",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    established: "1996",
    status: "Verified",
    courses: [
      "B.A. LL.B. (Hons) - 5 Years",
      "B.B.A. LL.B. (Hons) - 5 Years",
      "LL.B. - 3 Years",
      "LL.M.",
    ],
    facilities: lawFacilities,
    companies: lawCompanies,
  }),


  createCollege({
    id: "PHY014",
    short: "KMCH-PT",
    name: "KMCH Institute of Physiotherapy",
    category: "Physiotherapy",
    location: "Coimbatore",
    type: "Private Physiotherapy College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2010",
    status: "Verified",
    courses: [
      "BPT (Bachelor of Physiotherapy)",
      "MPT Musculoskeletal",
      "MPT Neurology",
      "MPT Sports Physiotherapy",
      "MPT Paediatrics",
    ],
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  /* ================= 50 ADDITIONAL COLLEGES: 251-300 ================= */

  createCollege({
    id: "ENG076",
    short: "EEC",
    name: "Easwari Engineering College",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG077",
    short: "SAIRAM",
    name: "Sri Sai Ram Engineering College",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG078",
    short: "SEC",
    name: "Saveetha Engineering College",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG079",
    short: "SJIT",
    name: "St. Joseph's Institute of Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG080",
    short: "LICET",
    name: "Loyola-ICAM College of Engineering and Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG081",
    short: "CIT",
    name: "Chennai Institute of Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG082",
    short: "KCG",
    name: "KCG College of Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG083",
    short: "ACT",
    name: "Agni College of Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG084",
    short: "KVCET",
    name: "Karpaga Vinayaga College of Engineering and Technology",
    category: "Engineering",
    location: "Chengalpattu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG085",
    short: "PSV",
    name: "Prince Shri Venkateshwara Padmavathy Engineering College",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG086",
    short: "DMICE",
    name: "DMI College of Engineering",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG087",
    short: "RIT",
    name: "Rajalakshmi Institute of Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG088",
    short: "PEC",
    name: "PSG Institute of Technology and Applied Research",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "2014",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG089",
    short: "AIHT",
    name: "Anand Institute of Higher Technology",
    category: "Engineering",
    location: "Chengalpattu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG090",
    short: "MSEC",
    name: "Sri Sivasubramaniya Nadar College of Engineering",
    category: "Engineering",
    location: "Chengalpattu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: engineeringCourseFees,
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ART061",
    short: "WCC",
    name: "Women's Christian College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART062",
    short: "QMC",
    name: "Quaid-E-Millath Government College for Women",
    category: "Arts & Science",
    location: "Chennai",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART063",
    short: "GNC",
    name: "Guru Nanak College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART064",
    short: "MOP",
    name: "M.O.P. Vaishnav College for Women",
    category: "Arts & Science",
    location: "Chennai",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART065",
    short: "AMJ",
    name: "A.M. Jain College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART066",
    short: "DDGDVC",
    name: "Dwaraka Doss Goverdhan Doss Vaishnav College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART067",
    short: "RMVC",
    name: "Ramakrishna Mission Vivekananda College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART068",
    short: "NC",
    name: "National College",
    category: "Arts & Science",
    location: "Tiruchirappalli",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART069",
    short: "SJCA",
    name: "Shri Shankarlal Sundarbai Shasun Jain College for Women",
    category: "Arts & Science",
    location: "Chennai",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ART070",
    short: "QMCW",
    name: "Queen Mary's College",
    category: "Arts & Science",
    location: "Chennai",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "MED045",
    short: "GMC-DGL",
    name: "Government Medical College, Dindigul",
    category: "Medical",
    location: "Dindigul",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: medicalCourseFees,
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED046",
    short: "GMC-ARI",
    name: "Government Medical College, Ariyalur",
    category: "Medical",
    location: "Ariyalur",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: medicalCourseFees,
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED047",
    short: "GMC-TPR",
    name: "Government Medical College, Tiruppur",
    category: "Medical",
    location: "Tiruppur",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: medicalCourseFees,
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED048",
    short: "GMC-KGI",
    name: "Government Medical College, Krishnagiri",
    category: "Medical",
    location: "Krishnagiri",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: medicalCourseFees,
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED049",
    short: "GMC-TVL",
    name: "Government Medical College, Thiruvallur",
    category: "Medical",
    location: "Thiruvallur",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: medicalCourseFees,
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "MED050",
    short: "GMC-CDL",
    name: "Government Medical College, Cuddalore",
    category: "Medical",
    location: "Cuddalore",
    type: "Government Medical College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: medicalCourseFees,
    facilities: medicalFacilities,
    companies: medicalCompanies,
  }),

  createCollege({
    id: "NUR019",
    short: "CMC-N",
    name: "Christian Medical College College of Nursing",
    category: "Nursing",
    location: "Vellore",
    type: "Nursing College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: nursingCourseFees,
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR020",
    short: "CHERAN-N",
    name: "Cheran College of Nursing",
    category: "Nursing",
    location: "Coimbatore",
    type: "Nursing College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: nursingCourseFees,
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR021",
    short: "JKK-N",
    name: "J.K.K. Munirajah College of Nursing",
    category: "Nursing",
    location: "Erode",
    type: "Nursing College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: nursingCourseFees,
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR022",
    short: "VM-N",
    name: "Vinayaka Mission's College of Nursing",
    category: "Nursing",
    location: "Salem",
    type: "Nursing College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: nursingCourseFees,
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR023",
    short: "VCN",
    name: "Velammal College of Nursing",
    category: "Nursing",
    location: "Madurai",
    type: "Nursing College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: nursingCourseFees,
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "NUR024",
    short: "KVCN",
    name: "Karpaga Vinayaga College of Nursing",
    category: "Nursing",
    location: "Chengalpattu",
    type: "Nursing College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: nursingCourseFees,
    facilities: nursingFacilities,
    companies: nursingCompanies,
  }),

  createCollege({
    id: "AHS016",
    short: "CMC-AHS",
    name: "Christian Medical College, Faculty of Allied Health Sciences",
    category: "Allied Health",
    location: "Vellore",
    type: "Allied Health College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: alliedCourseFees,
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS017",
    short: "SNS-AHS",
    name: "SNS College of Health Sciences",
    category: "Allied Health",
    location: "Coimbatore",
    type: "Allied Health College",
    ownership: "Private",
    grade: "NAAC A++",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "2019",
    status: "Verified",
    courses: alliedCourseFees,
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS018",
    short: "SS-AHS",
    name: "Sri Shanmugha Institute of Allied Health Sciences",
    category: "Allied Health",
    location: "Salem",
    type: "Allied Health College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: alliedCourseFees,
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS019",
    short: "VCAHS",
    name: "Velammal College of Allied Health Sciences",
    category: "Allied Health",
    location: "Madurai",
    type: "Allied Health College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: alliedCourseFees,
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "AHS020",
    short: "CHERAN-AHS",
    name: "Cheran College of Allied Health Sciences",
    category: "Allied Health",
    location: "Coimbatore",
    type: "Allied Health College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: alliedCourseFees,
    facilities: alliedFacilities,
    companies: alliedCompanies,
  }),

  createCollege({
    id: "PHY015",
    short: "CHERAN-PT",
    name: "Cheran College of Physiotherapy",
    category: "Physiotherapy",
    location: "Coimbatore",
    type: "Physiotherapy College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: physioCourseFees,
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "ART071",
    short: "SNSRCAS",
    name: "Dr. SNS Rajalakshmi College of Arts and Science",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Autonomous Arts & Science College",
    ownership: "Private",
    grade: "A+",
    affiliation: "Bharathiar University",
    established: "1999",
    status: "Verified",
    courses: artsCourseFees,
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "PHY017",
    short: "SS-PT",
    name: "Sri Shanmugha Institute of Physiotherapy",
    category: "Physiotherapy",
    location: "Salem",
    type: "Physiotherapy College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    established: "College Specific",
    status: "Verified",
    courses: physioCourseFees,
    facilities: physioFacilities,
    companies: physioCompanies,
  }),

  createCollege({
    id: "AGR015",
    short: "ACRI-CBE",
    name: "Agricultural College and Research Institute, Vazhavachanur",
    category: "Agriculture",
    location: "Coimbatore",
    type: "Agriculture College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Tamil Nadu Agricultural University",
    established: "College Specific",
    status: "Verified",
    courses: agricultureCourseFees,
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR016",
    short: "ACRI-MDU",
    name: "Agricultural College and Research Institute, Killikulam",
    category: "Agriculture",
    location: "Madurai",
    type: "Agriculture College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Tamil Nadu Agricultural University",
    established: "College Specific",
    status: "Verified",
    courses: agricultureCourseFees,
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "AGR017",
    short: "ADACRI",
    name: "Anbil Dharmalingam Agricultural College and Research Institute, Tiruchirappalli",
    category: "Agriculture",
    location: "Tiruchirappalli",
    type: "Agriculture College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Tamil Nadu Agricultural University",
    established: "College Specific",
    status: "Verified",
    courses: agricultureCourseFees,
    facilities: agricultureFacilities,
    companies: agricultureCompanies,
  }),

  createCollege({
    id: "LAW014",
    short: "SATHY-LAW",
    name: "Sathyabama School of Law",
    category: "Law",
    location: "Chennai",
    type: "Law School",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Bar Council of India / University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: lawCourseFees,
    facilities: lawFacilities,
    companies: lawCompanies,
  }),

  createCollege({
    id: "LAW015",
    short: "VIT-LAW",
    name: "VIT School of Law",
    category: "Law",
    location: "Vellore",
    type: "Law School",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Bar Council of India / University Affiliated",
    established: "College Specific",
    status: "Verified",
    courses: lawCourseFees,
    facilities: lawFacilities,
    companies: lawCompanies,
  }),
  /* ================= REPLACEMENT COLLEGES ================= */

  createCollege({
    id: "ENG091",
    short: "AIT",
    name: "Adithya Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2008",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG092",
    short: "INFO",
    name: "INFO Institute of Engineering",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2007",
    status: "Verified",
    courses: [
      "Computer Science and Engineering",
      "Electronics and Communication Engineering",
      "Electrical & Electronics Engineering",
      "Mechanical Engineering",
      "Information Technology",
      "Artificial Intelligence and Data Science",
      "M.B.A Master of Business Administration",
      "M.E. Computer Science and Engineering",
      "M.E. VLSI Design",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ART072",
    short: "KASC",
    name: "Kadhir Arts and Science College",
    category: "Arts & Science",
    location: "Coimbatore",
    type: "Arts & Science College",
    ownership: "Private",
    grade: "A",
    affiliation: "Bharathiar University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "B.A English",
      "B.A Economics",
      "B.Com",
      "B.Com Computer Applications",
      "BBA",
      "BCA",
      "B.Sc Computer Science",
      "B.Sc Mathematics",
      "B.Sc Physics",
      "B.Sc Chemistry",
      "B.Sc Biotechnology",
      "B.Sc Psychology",
      "B.Sc Data Science",
      "B.Sc Statistics",
      "B.Sc Visual Communication",
    ],
    facilities: artsFacilities,
    companies: artsCompanies,
  }),

  createCollege({
    id: "ENG093",
    short: "KCE",
    name: "Kathir College of Engineering",
    category: "Engineering",
    location: "Coimbatore",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "A",
    affiliation: "Anna University",
    established: "2008",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),


  /* ================= ENGINEERING - ADDED LIST (251) ================= */

  createCollege({
    id: "ENG094",
    short: "SRIT",
    name: "Sri Ramakrishna Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG095",
    short: "KITS",
    name: "Karunya Institute of Technology and Sciences",
    category: "Engineering",
    location: "Coimbatore",
    type: "Deemed University",
    ownership: "Private",
    grade: "A++",
    affiliation: "Deemed to be University (UGC)",
    established: "1986",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG096",
    short: "SNSCE",
    name: "S N S College of Engineering",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "NAAC A",
    affiliation: "Anna University",
    established: "2007",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG097",
    short: "CIET",
    name: "Coimbatore Institute of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG098",
    short: "SSIET",
    name: "Sri Shakthi Institute of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG099",
    short: "ACET",
    name: "Akshaya College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG100",
    short: "AURCC",
    name: "Anna University Regional Campus - Coimbatore",
    category: "Engineering",
    location: "Coimbatore",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG101",
    short: "ACT",
    name: "Arjun College of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG102",
    short: "ACET",
    name: "Asian College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG103",
    short: "CMSCET",
    name: "C M S College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG104",
    short: "CKEC",
    name: "Christ The King Engineering College",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG105",
    short: "DAIT",
    name: "Dhaanish Ahmed Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG106",
    short: "DSCE",
    name: "Dhanalakshmi Srinivasan College of Engineering (CBE)",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG107",
    short: "ECET",
    name: "Easa College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG108",
    short: "HIT",
    name: "Hindusthan Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG109",
    short: "JIT",
    name: "Jansons Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG110",
    short: "JCET",
    name: "JCT College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG111",
    short: "KIT",
    name: "Karpagam Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG112",
    short: "KKIT",
    name: "KIT - Kalaignarkarunanidhi Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG113",
    short: "NIET",
    name: "Nehru Institute of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG114",
    short: "NIT",
    name: "Nehru Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG115",
    short: "PACET",
    name: "P A College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG116",
    short: "PCET",
    name: "Park College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG117",
    short: "PCT",
    name: "Park College of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG118",
    short: "PIET",
    name: "Pollachi Institute of Engineering and Technology",
    category: "Engineering",
    location: "Pollachi",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG119",
    short: "PIT",
    name: "PPG Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG120",
    short: "RVSTCC",
    name: "R V S Technical Campus Coimbatore",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG121",
    short: "SSEC",
    name: "Sree Sakthi Engineering College",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG122",
    short: "SRIET",
    name: "Sri Ranganathar Institute of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG123",
    short: "SSREC",
    name: "Sri Sai Ranganathan Engineering College",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG124",
    short: "SCE",
    name: "Studyworld College of Engineering",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG125",
    short: "SCE",
    name: "Suguna College of Engineering",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG126",
    short: "TCE",
    name: "Tamilnadu College of Engineering",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG127",
    short: "UIT",
    name: "United Institute of Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG128",
    short: "VSBCET",
    name: "V.S.B. College of Engineering Technical Campus",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG129",
    short: "VLCET",
    name: "Vishnu Lakshmi College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG130",
    short: "HCE",
    name: "HINDUSTHAN COLLEGE OF ENGINEERING",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG131",
    short: "ACET",
    name: "Aishwarya College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG132",
    short: "AAEC",
    name: "AL-Ameen Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG133",
    short: "JMCT",
    name: "JKK Munirajah College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG134",
    short: "MPNMJE",
    name: "M.P.Nachimuthu M.Jaganathan Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG135",
    short: "NCT",
    name: "Nandha College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG136",
    short: "SVHTEC",
    name: "Shree Venkateshwara Hi-Tech Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG137",
    short: "SEC",
    name: "Surya Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG138",
    short: "VCET",
    name: "Velalar College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG139",
    short: "AVSCT",
    name: "A V S College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG140",
    short: "AEC",
    name: "Annapoorana Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG141",
    short: "AEC",
    name: "AVS Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG142",
    short: "BIEW",
    name: "Bharathiyar Institute of Engineering for Women",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG143",
    short: "DGCT",
    name: "Dhirajlal Gandhi College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG144",
    short: "GCE",
    name: "Ganesh College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG145",
    short: "IIHT",
    name: "Indian Institute of Handloom Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG146",
    short: "KIT",
    name: "Knowledge Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG147",
    short: "MCE",
    name: "Mahendra College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG148",
    short: "RPSIT",
    name: "R P Sarathy Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG149",
    short: "SSCET",
    name: "Shree Sathyam College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG150",
    short: "TIET",
    name: "Tagore Institute of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG151",
    short: "KEC",
    name: "The Kavery Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG152",
    short: "VSAGI",
    name: "V S A Group of Institutions",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG153",
    short: "CEG",
    name: "College of Engineering Guindy (Anna University)",
    category: "Engineering",
    location: "Chennai",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1794",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG154",
    short: "MITAU",
    name: "Madras Institute of Technology (MIT), Anna University",
    category: "Engineering",
    location: "Chennai",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1949",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG155",
    short: "KSRCT",
    name: "K.S. Rangasamy College of Technology",
    category: "Engineering",
    location: "Namakkal",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1994",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG156",
    short: "SIT",
    name: "Sethu Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG157",
    short: "PCET",
    name: "PSNA College of Engineering and Technology",
    category: "Engineering",
    location: "Dindigul",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1984",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG158",
    short: "AEC",
    name: "Arunai Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG159",
    short: "OEC",
    name: "Oxford Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG160",
    short: "EGSPEC",
    name: "E.G.S. Pillay Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG161",
    short: "HITS",
    name: "Hindustan Institute of Technology and Science",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private",
    grade: "A",
    affiliation: "Deemed to be University (UGC)",
    established: "1985",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG162",
    short: "SIST",
    name: "Sathyabama Institute of Science and Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private",
    grade: "A++",
    affiliation: "Deemed to be University (UGC)",
    established: "1987",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG163",
    short: "VTRDSR",
    name: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private",
    grade: "A",
    affiliation: "Deemed to be University (UGC)",
    established: "1997",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG164",
    short: "SVCE",
    name: "Sri Venkateswara College of Engineering",
    category: "Engineering",
    location: "Sriperumbudur",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1985",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG165",
    short: "DMGRER",
    name: "Dr. M.G.R. Educational and Research Institute",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private",
    grade: "A",
    affiliation: "Deemed to be University (UGC)",
    established: "1988",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG166",
    short: "JCE",
    name: "Jerusalem College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG167",
    short: "VIT",
    name: "Velammal Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG168",
    short: "BSARCI",
    name: "B.S. Abdur Rahman Crescent Institute of Science and Technology",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private",
    grade: "A",
    affiliation: "Deemed to be University (UGC)",
    established: "1984",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG169",
    short: "MNMJEC",
    name: "Misrimal Navajee Munoth Jain Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG170",
    short: "SSIT",
    name: "Sri Sairam Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG171",
    short: "SVEC",
    name: "SRM Valliammai Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG172",
    short: "PEC",
    name: "Prathyusha Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG173",
    short: "SMIT",
    name: "Sri Muthukumaran Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG174",
    short: "RMDEC",
    name: "R.M.D. Engineering College",
    category: "Engineering",
    location: "Thiruvallur",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1995",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG175",
    short: "AMSCE",
    name: "Aalim Muhammed Salegh College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG176",
    short: "SKREC",
    name: "S.K.R. Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG177",
    short: "MSEC",
    name: "Meenakshi Sundararajan Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG178",
    short: "SAEC",
    name: "S.A. Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG179",
    short: "MSAJCE",
    name: "Mohamed Sathak A.J. College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG180",
    short: "AEC",
    name: "Adhiparasakthi Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG181",
    short: "AVIT",
    name: "Aarupadai Veedu Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG182",
    short: "UCEK",
    name: "University College of Engineering, Kanchipuram (Anna University)",
    category: "Engineering",
    location: "Kanchipuram",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG183",
    short: "PEC",
    name: "Priyadarshini Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG184",
    short: "SNEC",
    name: "Sri Narayana Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG185",
    short: "MAMCE",
    name: "M.A.M. College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG186",
    short: "KRCE",
    name: "K. Ramakrishnan College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG187",
    short: "JCET",
    name: "Jayaram College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG188",
    short: "AURCT",
    name: "Anna University, Regional Campus - Tiruchirappalli",
    category: "Engineering",
    location: "Tiruchirappalli",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG189",
    short: "UCEP",
    name: "University College of Engineering, Perambalur (Anna University)",
    category: "Engineering",
    location: "Perambalur",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG190",
    short: "VCE",
    name: "Vivekanandha College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG191",
    short: "PMIST",
    name: "Periyar Maniammai Institute of Science and Technology",
    category: "Engineering",
    location: "Thanjavur",
    type: "Deemed University",
    ownership: "Private",
    grade: "A",
    affiliation: "Deemed to be University (UGC)",
    established: "1988",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG192",
    short: "KCE",
    name: "Kings College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG193",
    short: "AVCCE",
    name: "A.V.C. College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG194",
    short: "KLNCE",
    name: "K.L.N. College of Engineering",
    category: "Engineering",
    location: "Sivagangai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1994",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG195",
    short: "VCE",
    name: "Vaigai College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG196",
    short: "BNEC",
    name: "Bharath Niketan Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG197",
    short: "NEC",
    name: "National Engineering College",
    category: "Engineering",
    location: "Thoothukudi",
    type: "Autonomous Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1984",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG198",
    short: "SMTEC",
    name: "St. Mother Theresa Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG199",
    short: "DGUPCE",
    name: "Dr. G. U. Pope College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG200",
    short: "VVCE",
    name: "V.V. College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG201",
    short: "PSNCET",
    name: "P.S.N. College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG202",
    short: "UVOCCE",
    name: "University V.O.C. College of Engineering",
    category: "Engineering",
    location: "Thoothukudi",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG203",
    short: "SXSCCE",
    name: "St. Xavier’s Catholic College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG204",
    short: "CIT",
    name: "Cape Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG205",
    short: "PCE",
    name: "Ponjesly College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG206",
    short: "ACERC",
    name: "Annie College of Engineering and Research Centre",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG207",
    short: "VMKVEC",
    name: "V.M.K.V. Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG208",
    short: "AKCE",
    name: "A.K. College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG209",
    short: "UCEA",
    name: "University College of Engineering, Arni (Anna University)",
    category: "Engineering",
    location: "Arni",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG210",
    short: "SAEC",
    name: "Sree Ayyappa Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG211",
    short: "MEC",
    name: "Maharaja Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG212",
    short: "BEC",
    name: "Builders Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG213",
    short: "CCE",
    name: "Cheran College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG214",
    short: "PGCE",
    name: "Park Global College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG215",
    short: "SVIT",
    name: "Sri Venkateswara Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG216",
    short: "MIT",
    name: "Maharaja Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG217",
    short: "SCE",
    name: "SVS College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG218",
    short: "ECET",
    name: "Excel College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG219",
    short: "MCE",
    name: "Muthayammal College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG220",
    short: "KSRCE",
    name: "K.S.R. College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG221",
    short: "MIET",
    name: "Mahendra Institute of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG222",
    short: "KCE",
    name: "Kumarasamy College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG223",
    short: "VCEW",
    name: "Vivekanandha College of Engineering for Women",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG224",
    short: "NPRCET",
    name: "N.P.R. College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG225",
    short: "MEC",
    name: "Mailam Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG226",
    short: "IECW",
    name: "Idhaya Engineering College for Women",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG227",
    short: "AURCV",
    name: "Anna University, Regional Campus - Villupuram",
    category: "Engineering",
    location: "Villupuram",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG228",
    short: "SASCET",
    name: "St. Anne’s College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG229",
    short: "GCE",
    name: "Ganesar College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG230",
    short: "SAEC",
    name: "Syed Ammal Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG231",
    short: "MSEC",
    name: "Mohamed Sathak Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG232",
    short: "PSYEC",
    name: "Pandian Saraswathi Yadav Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG233",
    short: "UCET",
    name: "University College of Engineering, Tiruvarur (Anna University)",
    category: "Engineering",
    location: "Tiruvarur",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG234",
    short: "MCE",
    name: "Madha College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG235",
    short: "SINCET",
    name: "Sir Issac Newton College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG236",
    short: "UCETW",
    name: "Ultra College of Engineering and Technology for Women",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG237",
    short: "SCET",
    name: "Sun College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG238",
    short: "IEC",
    name: "Indian Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG239",
    short: "GIET",
    name: "Global Institute of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG240",
    short: "CAHCET",
    name: "C. Abdul Hakeem College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG241",
    short: "SREC",
    name: "Sri Ramanujar Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG242",
    short: "MCE",
    name: "Meenakshi College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG243",
    short: "DCE",
    name: "Dhanalakshmi College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG244",
    short: "VISTAS",
    name: "Vels Institute of Science, Technology and Advanced Studies",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private",
    grade: "A+",
    affiliation: "Deemed to be University (UGC)",
    established: "1992",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG245",
    short: "SPSIHE",
    name: "St. Peter’s Institute of Higher Education and Research",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG246",
    short: "JSEC",
    name: "Jaya Sakthi Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG247",
    short: "TEC",
    name: "Tagore Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG248",
    short: "TJIT",
    name: "T.J. Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG249",
    short: "SMKFIT",
    name: "S.M.K. Fomra Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG250",
    short: "SVCT",
    name: "Sri Venkateswaraa College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG251",
    short: "JIT",
    name: "Jeppiaar Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG252",
    short: "PTLCNC",
    name: "P.T. Lee Chengalvaraya Naicker College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG253",
    short: "SSIET",
    name: "Sree Sastha Institute of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG254",
    short: "PIT",
    name: "Panimalar Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG255",
    short: "GKMCET",
    name: "G.K.M. College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG256",
    short: "RMKCET",
    name: "R.M.K. College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG257",
    short: "SCSVM",
    name: "Sri Chandrasekharendra Saraswathi Viswa Mahavidyalaya",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG258",
    short: "SBCEC",
    name: "Sri Balaji Chockalingam Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG259",
    short: "GCE",
    name: "Gnanamani College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG260",
    short: "SCT",
    name: "Selvam College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG261",
    short: "PCT",
    name: "Pavai College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG262",
    short: "AURCM",
    name: "Anna University, Regional Campus - Madurai",
    category: "Engineering",
    location: "Madurai",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG263",
    short: "NCE",
    name: "Narayanaguru College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG264",
    short: "MECET",
    name: "Mar Ephraem College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG265",
    short: "ACEW",
    name: "Arunachala College of Engineering for Women",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG266",
    short: "SKPEC",
    name: "S.K.P. Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG267",
    short: "GCET",
    name: "Government College of Engineering, Tenkasi",
    category: "Engineering",
    location: "Tenkasi",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG268",
    short: "UCEP",
    name: "University College of Engineering, Panruti (Anna University)",
    category: "Engineering",
    location: "Panruti",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG269",
    short: "UCET",
    name: "University College of Engineering, Tenkasi (Anna University)",
    category: "Engineering",
    location: "Tenkasi",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG270",
    short: "UCET",
    name: "University College of Engineering, Theni (Anna University)",
    category: "Engineering",
    location: "Theni",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG271",
    short: "UCEP",
    name: "University College of Engineering, Pattukkottai (Anna University)",
    category: "Engineering",
    location: "Pattukkottai",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG272",
    short: "AURCK",
    name: "Anna University, Regional Campus - Konam (Nagercoil)",
    category: "Engineering",
    location: "Nagercoil",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG273",
    short: "AURCT",
    name: "Anna University, Regional Campus - Tirunelveli",
    category: "Engineering",
    location: "Tirunelveli",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG274",
    short: "AURCR",
    name: "Anna University, Regional Campus - Ramanathapuram",
    category: "Engineering",
    location: "Ramanathapuram",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG275",
    short: "AURCS",
    name: "Anna University, Regional Campus - Salem",
    category: "Engineering",
    location: "Salem",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG276",
    short: "UCET",
    name: "University College of Engineering, Tindivanam (Anna University)",
    category: "Engineering",
    location: "Tindivanam",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG277",
    short: "IIITDM",
    name: "Indian Institute of Information Technology Design and Manufacturing, Kancheepuram",
    category: "Engineering",
    location: "Chennai",
    type: "Institute",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Institute of National Importance",
    established: "2007",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG278",
    short: "SDU",
    name: "SASTRA Deemed University",
    category: "Engineering",
    location: "Thanjavur",
    type: "Deemed University",
    ownership: "Private",
    grade: "A++",
    affiliation: "Deemed to be University (UGC)",
    established: "1984",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG279",
    short: "GCET",
    name: "Government College of Engineering, Tirunelveli",
    category: "Engineering",
    location: "Tirunelveli",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG280",
    short: "GCET",
    name: "Government College of Engineering, Thanjavur",
    category: "Engineering",
    location: "Thanjavur",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG281",
    short: "GCED",
    name: "Government College of Engineering, Dharapuram",
    category: "Engineering",
    location: "Dharapuram",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG282",
    short: "GCED",
    name: "Government College of Engineering, Dindigul",
    category: "Engineering",
    location: "Dindigul",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG283",
    short: "GCEK",
    name: "Government College of Engineering, Karur",
    category: "Engineering",
    location: "Karur",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG284",
    short: "UCER",
    name: "University College of Engineering, Ramanathapuram (Anna University)",
    category: "Engineering",
    location: "Ramanathapuram",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG285",
    short: "SMGCAC",
    name: "Sr. Mepco group college - Alagappa Chettiar Government College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG286",
    short: "SEC",
    name: "Sudharsan Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG287",
    short: "MTCET",
    name: "Mother Terasa College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG288",
    short: "SRCE",
    name: "Sardar Raja College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG289",
    short: "SISTRC",
    name: "SRM Institute of Science and Technology, Ramapuram Campus",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private",
    grade: "A++",
    affiliation: "Deemed to be University (UGC)",
    established: "1996",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG290",
    short: "LMEC",
    name: "Latha Mathavan Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG291",
    short: "NPSBCE",
    name: "New Prince Shri Bhavani College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG292",
    short: "AU",
    name: "AMET University",
    category: "Engineering",
    location: "Chennai",
    type: "Deemed University",
    ownership: "Private",
    grade: "A",
    affiliation: "Deemed to be University (UGC)",
    established: "1993",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG293",
    short: "SSCET",
    name: "Sri Subramanya College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG294",
    short: "JCE",
    name: "Jaya College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG295",
    short: "JSEC",
    name: "Jeppiaar SRR Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG296",
    short: "PCET",
    name: "PGP College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG297",
    short: "AEC",
    name: "Arasu Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG298",
    short: "KSKCET",
    name: "K.S.K. College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG299",
    short: "VCTW",
    name: "Vivekanandha College of Technology for Women",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG300",
    short: "LIT",
    name: "Loyola Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG301",
    short: "RVSSET",
    name: "R.V.S. School of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG302",
    short: "SSCE",
    name: "Sree Sowdambika College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG303",
    short: "AKTMCE",
    name: "A.K.T. Memorial College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG304",
    short: "KCT",
    name: "KG College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG305",
    short: "ACT",
    name: "Angappa College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG306",
    short: "SIT",
    name: "Sriguru Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG307",
    short: "SAE",
    name: "Sasurie Academy of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG308",
    short: "SCE",
    name: "Sasurie College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG309",
    short: "SIT",
    name: "Sakthi Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG310",
    short: "SCE",
    name: "Sengunthar College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG311",
    short: "VVCET",
    name: "Vetri Vinayaha College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG312",
    short: "ICE",
    name: "Imayam College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG313",
    short: "PTRCET",
    name: "P.T.R. College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG314",
    short: "MIET",
    name: "Madurai Institute of Engineering and Technology",
    category: "Engineering",
    location: "Madurai",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG315",
    short: "PRIST",
    name: "Ponnaiyah Ramajayam Institute of Science and Technology (PRIST)",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG316",
    short: "CCET",
    name: "Chettinad College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG317",
    short: "VVCET",
    name: "Vidhyaa Vikas College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG318",
    short: "BIE",
    name: "Bethlahem Institute of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG319",
    short: "ECE",
    name: "Einstein College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG320",
    short: "REC",
    name: "The Rajaas Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG321",
    short: "DSACE",
    name: "Dr. Sivanthi Aditanar College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG322",
    short: "UIT",
    name: "Unnamalai Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG323",
    short: "SVCET",
    name: "Sri Vidya College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG324",
    short: "VPMMEC",
    name: "V.P.M.M. Engineering College for Women",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG325",
    short: "ESEC",
    name: "E.S. Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG326",
    short: "GCEV",
    name: "Government College of Engineering, Villupuram",
    category: "Engineering",
    location: "Villupuram",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG327",
    short: "DKNMEC",
    name: "Dr. K.N.M. Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG328",
    short: "VTMTEC",
    name: "Vel Tech Multi Tech Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG329",
    short: "JEC",
    name: "Jaya Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG330",
    short: "DACE",
    name: "Dhaanish Ahmed College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG331",
    short: "VIT",
    name: "Valliammai Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG332",
    short: "AUCEG",
    name: "Anna University, College of Engineering (CEG), Guindy",
    category: "Engineering",
    location: "Chennai",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1794",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG333",
    short: "MITC",
    name: "Madras Institute of Technology (MIT), Chromepet",
    category: "Engineering",
    location: "Chennai",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1949",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG334",
    short: "MEC",
    name: "Madha Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG335",
    short: "ACTAU",
    name: "Alagappa College of Technology (ACT), Anna University",
    category: "Engineering",
    location: "Chennai",
    type: "Constituent College",
    ownership: "Government",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "1944",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG336",
    short: "KCET",
    name: "Krishnasamy College of Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG337",
    short: "MRKIT",
    name: "M.R.K. Institute of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG338",
    short: "KSRIET",
    name: "K.S.R. Institute for Engineering and Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG339",
    short: "SEC",
    name: "Shivani Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG340",
    short: "VTHTDR",
    name: "Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG341",
    short: "SLAEC",
    name: "Sri Lakshmi Ammal Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG342",
    short: "JEC",
    name: "Jansi Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG343",
    short: "AAMEC",
    name: "Anjalai Ammal Mahalingam Engineering College",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

  createCollege({
    id: "ENG344",
    short: "TSMJCT",
    name: "T.S.M. Jain College of Technology",
    category: "Engineering",
    location: "Tamil Nadu",
    type: "Engineering College",
    ownership: "Private",
    grade: "College Specific",
    affiliation: "Anna University",
    established: "College Specific",
    status: "Verified",
    courses: [
      "Civil Engineering",
      "Computer Science and Engineering",
      "Electrical & Electronics Engineering",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    facilities: engineeringFacilities,
    companies: engineeringCompanies,
  }),

];
/* =========================================================
   ACCREDITATION / RECOGNITION
========================================================= */

const accreditationOverrides = {
  ENG052: "NAAC A+",
  ENG056: "NAAC A+ / NBA Accredited",
  ENG057: "NAAC A++ / NBA Accredited",
  ENG058: "NAAC A+ / NBA Accredited",
  ENG059: "NAAC A+",
  ENG060: "NAAC A",
  ENG061: "NAAC A++ / NBA Accredited",
  ENG062: "NBA Accredited Programmes",
  ENG063: "NAAC A+",
  ENG064: "NAAC A+",
  ENG066: "NBA Accredited",
  ENG067: "NAAC A",
  ENG070: "NAAC Accredited",
  ENG071: "NBA Accredited Programmes",
  ENG072: "NAAC A / NBA Accredited",
  ENG074: "NAAC A+ / NBA Accredited",
  ART052: "NAAC A++",
  ART053: "NAAC B++",
  ART054: "NAAC A++",
  ART056: "NAAC A++",
  ART059: "NAAC A+",
  MED040: "NMC Recognized",
  MED041: "NMC Recognized",
  MED042: "NMC Recognized",
  MED043: "NMC Recognized",
  MED044: "NMC Recognized",
  NUR015: "INC / TNNMC Recognized",
  NUR016: "University / Nursing Regulatory Recognition",
  NUR017: "INC / TNNMC / University Recognition",
  NUR018: "INC / TNNMC / University Recognition",
  AHS011: "University / NCAHP-aligned Recognition",
  AHS015: "University / NCAHP-aligned Recognition",
  AGR014: "TNAU / Agricultural Regulatory Recognition",
  LAW012: "BCI / TNDALU Recognition",
  LAW013: "BCI / TNDALU Recognition",
  PHY013: "University / NCAHP-aligned Recognition",
};

const accreditationByCategory = {
  Engineering: "AICTE Approved / University Affiliated",
  "Arts & Science":
    "NAAC status not publicly listed in the available official source",
  Medical: "NMC Recognized",
  Nursing: "INC / State Nursing Council / University Recognition",
  "Allied Health": "University / NCAHP-aligned Recognition",
  Physiotherapy: "University / NCAHP-aligned Recognition",
  Agriculture: "TNAU / Agricultural Regulatory Recognition",
  Law: "BCI / TNDALU Recognition",
};

collegesData.forEach((college) => {
  if (accreditationOverrides[college.id]) {
    college.accreditation = accreditationOverrides[college.id];
  } else if (/^A(\+{0,2})$/.test(String(college.grade || ""))) {
    college.accreditation = `NAAC ${college.grade}`;
  } else {
    college.accreditation =
      accreditationByCategory[college.category] ||
      "Official accreditation/recognition not publicly listed";
  }
});

/* =========================================================
   ADMIN SIDEBAR
========================================================= */

function AdminSidebar({ onCollegesClick }) {
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

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("isAdminLoggedIn");
    sessionStorage.clear();
    window.location.replace("/admin/login");
  };

  return (
    <aside className="college-sidebar">
      <div className="college-brand">
        <div className="brand-icon">🎓</div>

        <div>
          <h1>
            Student<span>College</span>
          </h1>
          <p>Admission Platform</p>
        </div>
      </div>

      <div className="sidebar-scroll">
        <p className="menu-title">MAIN MENU</p>

        {menuItems.map(([name, icon, path]) => (
          <button
            key={name}
            className={`college-sidebar-item ${
              location.pathname === path ||
              (name === "Colleges" &&
                location.pathname.startsWith("/admin/colleges"))
                ? "active"
                : ""
            }`}
            onClick={() => {
              if (name === "Colleges") onCollegesClick?.();
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

        <button className="logout-button" onClick={handleLogout}>
          ↪ <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

/* =========================================================
   TOP BAR
========================================================= */

function TopBar({ search, onSearchChange }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("isAdminLoggedIn");
    sessionStorage.clear();
    window.location.replace("/admin/login");
  };

  return (
    <header className="college-topbar">
      <div className="global-search">
        <span>⌕</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search students, colleges, leads..."
        />
      </div>

      <div className="top-admin">
        <button className="notification-button">
          ♢<span className="notification-dot"></span>
        </button>

        <button className="top-admin-profile" onClick={handleLogout}>
          <span className="top-avatar">A</span>

          <span className="top-admin-text">
            <strong>Admin</strong>
            <small>Super Admin</small>
          </span>

          <span>⌄</span>
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   OFFICIAL COLLEGE CONTACT / ABOUT DATA
   These values are shown in the college detail page.
========================================================= */

const collegeContactData = {
  ENG095: {
    website: "https://www.karunya.edu/",
  },
  ENG153: {
    phone: "044-22358491",
    email: "dean@ceg.annauniv.edu",
    website: "https://www.annauniv.edu/",
  },
  ENG154: {
    phone: "044-22516002",
    email: "dean@mit.annauniv.edu",
    website: "https://www.mitindia.edu/",
  },
  ENG155: {
    website: "https://www.ksrct.ac.in/",
  },
  ENG157: {
    website: "https://www.psnacet.edu.in/",
  },
  ENG161: {
    website: "https://hindustanuniv.ac.in/",
  },
  ENG162: {
    website: "https://www.sathyabama.ac.in/",
  },
  ENG163: {
    website: "https://www.veltech.edu.in/",
  },
  ENG164: {
    website: "https://svce.ac.in/",
  },
  ENG165: {
    website: "https://www.drmgrdu.ac.in/",
  },
  ENG168: {
    website: "https://crescent.education/",
  },
  ENG174: {
    website: "https://rmd.ac.in/",
  },
  ENG191: {
    website: "https://www.pmu.edu/",
  },
  ENG194: {
    website: "https://www.klnce.edu/",
  },
  ENG197: {
    website: "https://www.nec.edu.in/",
  },
  ENG244: {
    website: "https://velsuniv.ac.in/",
  },
  ENG277: {
    website: "https://www.iiitdm.ac.in/",
  },
  ENG278: {
    website: "https://www.sastra.edu/",
  },
  ENG289: {
    website: "https://www.srmist.edu.in/",
  },
  ENG292: {
    website: "https://ametuniv.ac.in/",
  },
  ENG332: {
    phone: "044-22358491",
    email: "dean@ceg.annauniv.edu",
    website: "https://www.annauniv.edu/",
  },
  ENG333: {
    phone: "044-22516002",
    email: "dean@mit.annauniv.edu",
    website: "https://www.mitindia.edu/",
  },
  ENG091: {
    phone: "0422-2654504",
    email: "info@adithyatech.edu.in",
    website: "https://adithyatech.edu.in/",
    address: "Sathy Main Road, Kurumbapalayam, Coimbatore - 641107, Tamil Nadu, India",
    about:
      "Adithya Institute of Technology is an autonomous engineering institution affiliated to Anna University, offering undergraduate and postgraduate technical programmes.",
  },
  ENG092: {
    phone: "0422-2363700",
    email: "info@infoengg.com",
    website: "https://www.infoengg.com/",
    address: "NH-209, Sathy Road, Kovilpalayam, Coimbatore - 641107, Tamil Nadu, India",
    about:
      "INFO Institute of Engineering is an engineering institution in Coimbatore offering undergraduate and postgraduate technical programmes.",
  },
  ART072: {
    phone: "Contact details not publicly verified",
    email: "Contact details not publicly verified",
    website: "Official College Website",
    address: "Neelambur, Sulur Taluk, Coimbatore District, Tamil Nadu, India",
    about:
      "Kadhir Arts and Science College (Co-Ed) is an arts and science college located at Neelambur, Sulur Taluk, Coimbatore District.",
  },
  ENG093: {
    phone: "0422-2203778 / 0422-2203787",
    email: "kathirce@gmail.com",
    website: "https://kathir.ac.in/",
    address: "Wisdom Tree, Avinashi Road, Neelambur, Coimbatore - 641062, Tamil Nadu, India",
    about:
      "Kathir College of Engineering is an autonomous engineering institution in Coimbatore, affiliated to Anna University.",
  },
  ENG001: {
    phone: "+91-44-2257-8000",
    email: "webmaster@iitm.ac.in",
    website: "https://www.iitm.ac.in/",
    address: "Sardar Patel Road, Chennai - 600036, Tamil Nadu, India",
    about:
      "IIT Madras is an Institute of National Importance known for engineering, science, technology, research and innovation. It offers undergraduate, postgraduate and doctoral education with a strong research ecosystem.",
  },
  ENG002: {
    phone: "+91-431-2503000",
    email: "deanap@nitt.edu",
    website: "https://www.nitt.edu/",
    address:
      "National Institute of Technology, Tiruchirappalli - 620015, Tamil Nadu, India",
    about:
      "NIT Tiruchirappalli is an Institute of National Importance offering engineering, science, technology, management and research programmes with a strong academic and industry-oriented environment.",
  },
  ENG003: {
    phone: "044-2235-8314",
    email: "registrar@annauniv.edu",
    website: "https://www.annauniv.edu/",
    address:
      "Sardar Patel Road, Anna University, Chennai - 600025, Tamil Nadu, India",
    about:
      "Anna University is a major public technical university in Chennai offering engineering, technology, architecture, science, management and research programmes.",
  },
  ENG004: {
    phone: "+91-416-2243091",
    email: "admin.chennai@vit.ac.in",
    website: "https://vit.ac.in/",
    address: "VIT Vellore Campus, Vellore - 632014, Tamil Nadu, India",
    about:
      "VIT is a private university known for engineering, technology, science, management and research programmes with a large academic and international ecosystem.",
  },
  ENG005: {
    phone: "+91-44-27417400",
    email: "admissions@srmist.edu.in",
    website: "https://www.srmist.edu.in/",
    address:
      "SRM Nagar, Kattankulathur, Chengalpattu - 603203, Tamil Nadu, India",
    about:
      "SRM Institute of Science and Technology is a multidisciplinary institution offering engineering, science, medicine, management and other professional programmes.",
  },
  ENG006: {
    phone: "+91-422-2685000",
    email: "info@av.amrita.edu",
    website: "https://www.amrita.edu/",
    address: "Amritanagar, Coimbatore - 641112, Tamil Nadu, India",
    about:
      "Amrita Vishwa Vidyapeetham is a multidisciplinary university with strong academic, research, healthcare and innovation activities across its campuses.",
  },
  ENG007: {
    phone: "0422-2572177",
    email: "principal@psgtech.ac.in",
    website: "https://www.psgtech.ac.in/",
    address: "Avinashi Road, Peelamedu, Coimbatore - 641004, Tamil Nadu, India",
    about:
      "PSG College of Technology is a well-established autonomous engineering institution in Coimbatore with programmes across engineering, technology, science and management.",
  },
  ENG008: {
    phone: "94868 37757",
    email: "principal.citoffice@cit.edu.in",
    website: "https://cit.edu.in/",
    address: "Civil Aerodrome Post, Coimbatore - 641014, Tamil Nadu, India",
    about:
      "Coimbatore Institute of Technology is an autonomous engineering institution focused on quality education, innovation, research and industry-oriented learning.",
  },
  ENG009: {
    phone: "+91-99-9430-0600",
    email: "info@kct.ac.in",
    website: "https://kct.ac.in/",
    address:
      "Kumaraguru Campus, Saravanampatti, Coimbatore - 641049, Tamil Nadu, India",
    about:
      "Kumaraguru College of Technology is an autonomous engineering institution emphasizing technology education, research, entrepreneurship and industry collaboration.",
  },
  ENG009: {
    phone: "0422-2661100",
    email: "info@kct.ac.in",
    website: "https://kct.ac.in/",
    address:
      "Kumaraguru Campus, Chinnavedampatti, Coimbatore - 641049, Tamil Nadu, India",
    about:
      "Kumaraguru College of Technology is an autonomous engineering institution in Coimbatore offering undergraduate, postgraduate and research programmes.",
  },
  ENG010: {
    phone: "+91-75503-16701",
    email: "snsct@snsgroups.com",
    website: "https://snsct.org/",
    address:
      "SNS Kalvi Nagar, Sathy Main Road, Saravanampatti, Coimbatore - 641035, Tamil Nadu, India",
    about:
      "SNS College of Technology is an autonomous engineering institution focused on design thinking, innovation, technology education and career development.",
  },
  ART001: {
    email: "principal@psgrkcw.ac.in",
    phone: "0422-429-5959",
    website: "https://www.psgrkcw.ac.in/",
    address: "Avinashi Road, Peelamedu, Coimbatore - 641004, Tamil Nadu, India",
    about:
      "PSGR Krishnammal College for Women is an autonomous women's college in Coimbatore, affiliated to Bharathiar University, offering undergraduate, postgraduate and research programmes in arts, science, commerce and management.",
  },
  ART003: {
    phone: "0422-4303300",
    email: "principal@psgcas.ac.in",
    website: "https://www.psgcas.ac.in/",
    address: "Civil Aerodrome Post, Coimbatore - 641014, Tamil Nadu, India",
    about:
      "PSG College of Arts & Science is an autonomous institution offering undergraduate and postgraduate programmes across arts, commerce, science and technology-related disciplines.",
  },
  ART002: {
    phone: "+91-44-28178200",
    email: "enquiry.adm@loyolacollege.edu",
    website: "https://www.loyolacollege.edu/",
    address:
      "PB 3301, 01 Sterling Road, Nungambakkam, Chennai - 600034, Tamil Nadu, India",
    about:
      "Loyola College is an autonomous institution in Chennai known for undergraduate, postgraduate and research education across arts, science, commerce and related disciplines.",
  },
  ART004: {
    phone: "044-22390675",
    email: "principal@mcc.edu.in",
    website: "https://mcc.edu.in/",
    address: "Tambaram, Chennai - 600059, Tamil Nadu, India",
    about:
      "Madras Christian College is a historic autonomous institution offering multidisciplinary higher education with a strong emphasis on academic excellence, service and holistic development.",
  },
  ART005: {
    phone: "+91-44-2854-4819",
    email: "principal@presidencycollege.ac.in",
    website: "https://www.presidencycollege.ac.in/",
    address: "Kamarajar Salai, Chepauk, Chennai - 600005, Tamil Nadu, India",
    about:
      "Presidency College, Chennai is a historic government institution offering undergraduate and postgraduate education across arts, science and related disciplines.",
  },
  ART006: {
    phone: "+91-452-2311875",
    email: "principaltcarts@gmail.com",
    website: "https://www.tcarts.in/",
    address: "139-140 Kamarajar Salai, Madurai - 625009, Tamil Nadu, India",
    about:
      "Thiagarajar College is an autonomous institution in Madurai offering multidisciplinary arts, science and commerce education with research and student development activities.",
  },
  ART007: {
    phone: "+91-44-28111987",
    email: "principal@stellamariscollege.edu.in",
    website: "https://stellamariscollege.edu.in/",
    address: "17 Cathedral Road, Chennai - 600086, Tamil Nadu, India",
    about:
      "Stella Maris College is an autonomous women's institution offering multidisciplinary undergraduate, postgraduate and research programmes in Chennai.",
  },
  ART008: {
    phone: "044-28279189",
    email: "principal@ethirajcollege.edu.in",
    website: "https://ethirajcollege.edu.in/",
    address:
      "No. 70, Ethiraj Salai, Egmore, Chennai - 600008, Tamil Nadu, India",
    about:
      "Ethiraj College for Women is an autonomous women's institution offering a broad range of arts, science, commerce and professional-oriented programmes.",
  },
  ART009: {
    phone: "+91-422-2642095",
    email: "info@kongunaducollege.ac.in",
    website: "https://kongunaducollege.ac.in/",
    address: "GN Mills, Coimbatore - 641029, Tamil Nadu, India",
    about:
      "Kongunadu Arts and Science College is an autonomous institution in Coimbatore offering multidisciplinary higher education and research programmes.",
  },
  ART010: {
    phone: "+91-98431-33333",
    email: "info@hindusthan.net",
    website: "https://hicas.ac.in/",
    address:
      "Avinashi Road, behind Nava India, Udayampalayam, Coimbatore - 641028, Tamil Nadu, India",
    about:
      "Hindusthan College of Arts and Science offers multidisciplinary undergraduate and postgraduate programmes with a focus on academic and professional development.",
  },
  MED001: {
    phone: "+91-44-25305000",
    email: "dean@mmc.ac.in",
    website: "https://mmc.ac.in/",
    address: "Park Town, Chennai - 600003, Tamil Nadu, India",
    about:
      "Madras Medical College is a premier government medical institution in Chennai with undergraduate, postgraduate and advanced medical education and clinical training.",
  },
  MED002: {
    phone: "+91-44-25281347",
    email: "stanleymedicalcollege@gmail.com",
    website: "https://stanley.edu.in/",
    address: "Old Jail Road, Chennai - 600001, Tamil Nadu, India",
    about:
      "Stanley Medical College is a government medical institution in Chennai known for medical education, clinical training, healthcare and research.",
  },
  MED003: {
    phone: "+91-44-26413600",
    email: "dean@gkmc.in",
    website: "https://kmc.edu.in/",
    address: "Kilpauk, Chennai - 600010, Tamil Nadu, India",
    about:
      "Government Kilpauk Medical College is a government medical institution offering medical education and clinical training with an associated teaching hospital.",
  },
  MED004: {
    phone: "+91-422-2570170",
    email: "cmc@tn.gov.in",
    website: "https://www.cmchospital.co.in/",
    address: "Avinashi Road, Coimbatore - 641018, Tamil Nadu, India",
    about:
      "Coimbatore Medical College is a government medical institution providing undergraduate and postgraduate medical education and clinical services.",
  },
  MED005: {
    phone: "+91-452-2532535",
    email: "maduraimedicalcollege@gmail.com",
    website: "https://maduraimedicalcollege.org/",
    address: "Alwarpuram, Madurai - 625020, Tamil Nadu, India",
    about:
      "Madurai Medical College is a government medical institution serving southern Tamil Nadu through medical education, training, research and healthcare services.",
  },
  MED006: {
    phone: "+91-431-2776000",
    email: "gmctry@gmail.com",
    website: "https://www.gmctry.edu.in/",
    address:
      "K.A.P. Viswanatham Government Medical College campus, Tiruchirappalli, Tamil Nadu, India",
    about:
      "The Tiruchirappalli government medical college provides medical education, clinical training and healthcare services to the region.",
  },
  MED007: {
    phone: "+91-427-2210000",
    email: "gmkmch@tn.gov.in",
    website: "https://www.gmkmch.edu.in/",
    address: "Salem, Tamil Nadu, India",
    about:
      "Government Mohan Kumaramangalam Medical College is a government medical institution in Salem providing medical education, clinical training and healthcare services.",
  },
  MED008: {
    phone: "+91-422-2570170",
    email: "psgmedschool@psgimsr.ac.in",
    website: "https://psgimsr.ac.in/",
    address:
      "Post Box 1674, Off Avanashi Road, Peelamedu, Coimbatore - 641004, Tamil Nadu, India",
    about:
      "PSG Institute of Medical Sciences & Research is a private medical institution with medical education, research, clinical training and a teaching hospital ecosystem.",
  },
  MED009: {
    phone: "+91-7010101510",
    email: "admissions@sriramachandra.edu.in",
    website: "https://www.sriramachandra.edu.in/",
    address:
      "No. 1 Ramachandra Nagar, Porur, Chennai - 600116, Tamil Nadu, India",
    about:
      "Sri Ramachandra Institute of Higher Education and Research is a multidisciplinary deemed university with strong healthcare, medical education, research and allied academic programmes.",
  },
  MED010: {
    phone: "+91-8939902737",
    email: "admission@saveetha.ac.in",
    website: "https://saveetha.ac.in/",
    address: "Saveetha Nagar, Thandalam, Chennai - 602105, Tamil Nadu, India",
    about:
      "Saveetha Institute of Medical and Technical Sciences is a multidisciplinary deemed university with healthcare, medical, engineering, technology and research programmes.",
  },
  ENG011: {
    phone: "0422-2635600",
    email: "principal@kpriet.ac.in",
    website: "https://kpriet.ac.in/",
    address: "Avinashi Road, Arasur, Coimbatore - 641407, Tamil Nadu, India",
    about:
      "KPR Institute of Engineering and Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG012: {
    phone: "0422-2460088",
    email: "principal@srec.ac.in",
    website: "https://srec.ac.in/",
    address:
      "Vattamalaipalayam, N.G.G.O. Colony, Coimbatore - 641022, Tamil Nadu, India",
    about:
      "Sri Ramakrishna Engineering College is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG013: {
    phone: "0422-2432221",
    email: "gctcbe@gct.ac.in",
    website: "https://gct.ac.in/",
    address: "Thadagam Road, Coimbatore - 641013, Tamil Nadu, India",
    about:
      "Government College of Technology Coimbatore is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG014: {
    phone: "+91-9095244488 / +91-9095222222 / 0422-4419999",
    email: "admission@kgkite.ac.in",
    website: "https://kgkite.ac.in/",
    address: "Saravanampatti, Coimbatore - 641035, Tamil Nadu, India",
    about:
      "KGiSL Institute of Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG015: {
    phone: "0422-267 8001 / 0422-267 8012",
    email: "principal@skcet.ac.in",
    website: "https://skcet.ac.in/",
    address: "Kuniamuthur, Coimbatore - 641008, Tamil Nadu, India",
    about:
      "Sri Krishna College of Engineering and Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG016: {
    phone: "04295-226000",
    email: "principal@bitsathy.ac.in",
    website: "https://bitsathy.ac.in/",
    address: "Alathukombai, Sathyamangalam, Erode - 638401, Tamil Nadu, India",
    about:
      "Bannari Amman Institute of Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG017: {
    phone: "04294-226555 / 226666 / 226500",
    email: "principal@kongu.ac.in",
    website: "https://kongu.ac.in/",
    address: "Perundurai, Erode - 638060, Tamil Nadu, India",
    about:
      "Kongu Engineering College is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG018: {
    phone: "04294-232701 / 232702 / 232703",
    email: "contact@esec.ac.in",
    website: "https://esec.ac.in/",
    address: "Thudupathi, Perundurai, Erode - 638057, Tamil Nadu, India",
    about:
      "Erode Sengunthar Engineering College is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG019: {
    phone: "0424-2533279",
    email: "irttprincipal@yahoo.com",
    website: "https://irttnet.ac.in/",
    address: "Vaikkalmedu, Erode - 638316, Tamil Nadu, India",
    about:
      "Institute of Road and Transport Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG020: {
    phone: "04294-225585 / 226393",
    email: "info@nandhaengg.org",
    website: "https://nandhaengg.org/",
    address: "Vaikkalmedu, Erode - 638052, Tamil Nadu, India",
    about:
      "Nandha Engineering College is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG021: {
    phone: "0421-2260290 / 2261990",
    email: "principal@drmcet.ac.in",
    website: "https://tkce.ac.in/",
    address: "Tiruppur, Tamil Nadu, India",
    about:
      "Tiruppur Kumaran College of Engineering is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG022: {
    phone: "+91-4259-236030 / 236040 / 236050",
    email: "principal@drmcet.ac.in",
    website: "https://mcet.in/",
    address: "NA Mills Post, Pollachi, Coimbatore - 642003, Tamil Nadu, India",
    about:
      "Dr. Mahalingam College of Engineering and Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG023: {
    phone: "04343-292511",
    email: "principal503@gmail.com",
    website: "https://www.gcebargur.ac.in/",
    address: "Bargur, Krishnagiri, Tamil Nadu, India",
    about:
      "Government College of Engineering Bargur is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG024: {
    phone: "8075314942",
    email: "principal503@gmail.com",
    website: "https://www.nilgiricollege.ac.in/",
    address: "Udhagamandalam, The Nilgiris, Tamil Nadu, India",
    about:
      "Nilgiri College of Engineering is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ART011: {
    phone: "0421-2242152 / 2246600",
    email: "cgactpr@gmail.com",
    website: "https://grgcas.ac.in/",
    address: "Peelamedu, Coimbatore - 641004, Tamil Nadu, India",
    about:
      "G.R.G. College of Arts and Science is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART012: {
    phone: "0421-2242152 / 2246600",
    email: "cgactpr@gmail.com",
    website: "https://cgacollege.edu.in/",
    address: "Tiruppur - 641602, Tamil Nadu, India",
    about:
      "Chikkanna Government Arts College is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART013: {
    phone: "(0422) 262 3055",
    email: "nascoffice@nehrucolleges.com",
    website: "https://nehrucolleges.com/",
    address: "Thirumalayampalayam, Coimbatore - 641105, Tamil Nadu, India",
    about:
      "Nehru Arts and Science College is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART014: {
    phone: "0422-2678400",
    email: "info@skasc.ac.in",
    website: "https://skasc.ac.in/",
    address: "Kuniamuthur, Coimbatore - 641008, Tamil Nadu, India",
    about:
      "Sri Krishna Arts and Science College is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART015: {
    phone: "0424-2339933 / 98427 26267",
    email: "konguarts@kasc.ac.in",
    website: "https://kasc.ac.in/",
    address: "Nanjanapuram, Erode - 638107, Tamil Nadu, India",
    about:
      "Kongu Arts and Science College is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART016: {
    phone: "0424-2291271",
    email: "principal@cncollege.net",
    website: "https://cnc.edu.in/",
    address: "Veerappanchatram, Erode - 638004, Tamil Nadu, India",
    about:
      "Chikkaiah Naicker College is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART017: {
    phone: "0424-2430004",
    email: "info@eascit.in",
    website: "https://easc.ac.in/",
    address: "Rangampalayam, Erode - 638009, Tamil Nadu, India",
    about:
      "Erode Arts and Science College is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART018: {
    phone: "0424-2244101 / 2244102",
    email: "principalvcw@gmail.com",
    website: "https://vcw.ac.in/",
    address: "Thindal, Erode - 638012, Tamil Nadu, India",
    about:
      "Vellalar College for Women is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART019: {
    phone: "+91-9942906687 / 04259-234868 / 234870",
    email: "principal@ngmc.org",
    website: "https://ngmc.org/",
    address: "Pollachi, Coimbatore - 642001, Tamil Nadu, India",
    about:
      "Nallamuthu Gounder Mahalingam College is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART020: {
    phone: "0423-2443981",
    email: "gacooty@gmail.com",
    website: "https://gacudhagai.ac.in/",
    address: "Udhagamandalam, The Nilgiris - 643002, Tamil Nadu, India",
    about:
      "Government Arts College Udhagamandalam is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART021: {
    phone: "04142-286311 / 286312 / 286315",
    email: "josecol27998@gmail.com",
    website: "https://www.sjcas.ac.in/",
    address: "Coonoor, The Nilgiris, Tamil Nadu, India",
    about:
      "St. Joseph's College of Arts and Science is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART022: {
    phone: "+91-94433-16500",
    email: "principal@vicas.org",
    website: "https://www.vcasw.ac.in/",
    address: "Tiruppur, Tamil Nadu, India",
    about:
      "Vivekanandha College of Arts and Sciences for Women is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  ART023: {
    phone: "+91-422-2980011 / 14",
    email: "info@kahedu.edu.in",
    website: "https://kahedu.edu.in/",
    address: "Eachanari, Coimbatore - 641021, Tamil Nadu, India",
    about:
      "Karpagam Academy of Higher Education is an arts and science institution offering undergraduate and postgraduate programmes in humanities, commerce, computer applications and sciences. Verify phone, email and fee details on the official website.",
  },
  MED011: {
    phone: " 0422-2574300",
    email: "deangmcesiccbe@gmail.com",
    website: "https://esic.gov.in/",
    address: "Peelamedu, Coimbatore - 641004, Tamil Nadu, India",
    about:
      "ESIC Medical College and PGIMSR Coimbatore is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED012: {
    phone: "0422-2627784 / 0422-2627782",
    email: "support@kmchrf.org",
    website: "https://kmchhospitals.com/",
    address: "Avinashi Road, Coimbatore - 641014, Tamil Nadu, India",
    about:
      "Kovai Medical Center and Hospital (KMCH) is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED013: {
    phone: "0422-2904453",
    email: "info@karpagam.com",
    website: "https://kfmsr.in/",
    address: "Othakkalmandapam, Coimbatore - 641032, Tamil Nadu, India",
    about:
      "Karpagam Faculty of Medical Sciences and Research is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED014: {
    phone: "0422-4500164",
    email: "info@sripmscop.com",
    website: "https://www.sriramakrishnahospital.com/",
    address: "Trichy Road, Coimbatore - 641044, Tamil Nadu, India",
    about:
      "Sri Ramakrishna Institute of Paramedical Sciences is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED015: {
    phone: "+91-422-2685000",
    email: "info@amrita.edu",
    website: "https://www.amrita.edu/",
    address: "Ettimadai, Coimbatore - 641112, Tamil Nadu, India",
    about:
      "Amrita School of Nursing and Allied Health Coimbatore is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED016: {
    phone: "+04294-220910",
    email: "deangemcerode@gmail.com",
    website: "https://www.erodegmch.edu.in/",
    address: "Perundurai, Erode - 638053, Tamil Nadu, India",
    about:
      "Erode Government Medical College and Hospital is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED017: {
    phone: "0422-2618222",
    email: "kongueducations@gmail.com",
    website: "https://kongu.ac.in/",
    address: "Perundurai, Erode - 638060, Tamil Nadu, India",
    about:
      "Kongu Nursing College is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED018: {
    phone: "+91-9965534670",
    email: "vivekanadhamedicalcare@gmail.com",
    website: "https://vivekanandha.ac.in/",
    address: "Elayampalayam, Tiruchengode, Namakkal, Tamil Nadu, India",
    about:
      "Vivekanandha College of Allied Health Sciences is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED019: {
    phone: "0421-2999274",
    email: "deangmctpr@gmail.com",
    website: "https://www.tiruppurgmc.edu.in/",
    address: "Tiruppur, Tamil Nadu, India",
    about:
      "Tiruppur Government Medical College and Hospital is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED020: {
    phone: "+91-98422 02288",
    email: "info@rmchospital.in",
    website: "https://www.tn.gov.in/",
    address: "Tiruppur, Tamil Nadu, India",
    about:
      "Tiruppur College of Nursing and Allied Health is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED021: {
    phone: "0423-2952195 / 0423-2442712",
    email: "gmchnilgiris@gmail.com",
    website: "https://www.gmcnilgiris.edu.in/",
    address: "Udhagamandalam, The Nilgiris - 643001, Tamil Nadu, India",
    about:
      "Government Medical College Nilgiris is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED022: {
    phone: "04266-277940",
    email: " devamathacollegeofnursing@gmail.com",
    website: "https://www.tn.gov.in/",
    address: "Udhagamandalam, The Nilgiris, Tamil Nadu, India",
    about:
      "Nilgiris College of Nursing is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED023: {
    phone: "0423-2442712",
    email: "gmcnilgiris@gmail.com",
    website: "https://www.tn.gov.in/",
    address: "Coonoor, The Nilgiris, Tamil Nadu, India",
    about:
      "Nilgiris Allied Health and Pharmacy College is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  ENG025: {
    phone: "0416-2907762",
    email: "principaltpgit@gmail.com",
    website: "https://www.tpgit.edu.in/",
    address: "Bagayam, Vellore - 632002, Tamil Nadu, India",
    about:
      "Thanthai Periyar Government Institute of Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG026: {
    phone: "8489915204",
    email: "sce@saranathan.ac.in",
    website: "https://www.saranathan.ac.in/",
    address: "Panjappur, Tiruchirappalli - 620012, Tamil Nadu, India",
    about:
      "Saranathan College of Engineering is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG028: {
    phone: "0431-2670799",
    email: "director@mamcet.com",
    website: "https://www.tn.gov.in/",
    address: "Siruganur, Tiruchirappalli - 621105, Tamil Nadu, India",
    about:
      "M.A.M. College of Engineering and Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG029: {
    phone: "+91-452-2482240 / 2482241 / 2482242",
    email: "principal@tce.edu",
    website: "https://www.tce.edu/",
    address: "Thiruparankundram, Madurai - 625015, Tamil Nadu, India",
    about:
      "Thiagarajar College of Engineering is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG030: {
    email: "principal@vcet.ac.in",
    phone: "+91-452-2465285 / 2465289",
    website: "https://www.vcet.ac.in/",
    address: "Viraganoor, Madurai - 625009, Tamil Nadu, India",
    about:
      "Velammal College of Engineering and Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG031: {
    phone: "+91-9942982322 / +91-9942982321 / +91-9942982311",
    email: "principal@fmcet.ac.in",
    website: "https://www.tn.gov.in/",
    address:
      "Madurai - Thirumangalam Road, Veerapanjan, Madurai - 625020, Tamil Nadu, India",
    about:
      "Fatima Michael College of Engineering and Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG032: {
    phone: "0427-2346102 / 2346157",
    email: "adminoffice@gcesalem.edu.in",
    website: "https://www.gcesalem.edu.in/",
    address: "Sankari Main Road, Salem - 636011, Tamil Nadu, India",
    about:
      "Government College of Engineering Salem is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG033: {
    phone: "+91-427-4099999",
    email: "info@sonatech.ac.in",
    website: "https://www.sonatech.ac.in/",
    address: "Junction Main Road, Salem - 636005, Tamil Nadu, India",
    about:
      "Sona College of Technology is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ENG034: {
    phone: "9952613055",
    email: "thangavel@vmkvec.edu.in",
    website: "https://www.tn.gov.in/",
    address: "Ariyanoor, Salem - 636308, Tamil Nadu, India",
    about:
      "Vinayaka Mission's Kirupananda Variyar Engineering College is an engineering institution offering undergraduate and postgraduate technical programmes with laboratories, industry training and placement support. Verify phone, email and fee details on the official website.",
  },
  ART024: {
    phone: "0416-2220317",
    email: "voorhees1898@gmail.com",
    website: "https://www.tn.gov.in/",
    address: "Vellore - 632001, Tamil Nadu, India",
    about:
      "Voorhees College is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  ART025: {
    phone: "0416-2241774 / +91-7598598809",
    email: "office@auxiliumcollege.edu.in",
    website: "https://www.tn.gov.in/",
    address: "Gandhi Nagar, Vellore - 632006, Tamil Nadu, India",
    about:
      "Auxilium College is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  ART026: {
    phone: "04142-286311",
    email: "office@sjctnc.edu.in",
    website: "https://www.sjctni.edu/",
    address: "Race Course Road, Tiruchirappalli - 620002, Tamil Nadu, India",
    about:
      "St. Joseph's College Tiruchirappalli is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  ART027: {
    phone: "+91-431-2770136",
    email: "enquiry@bhc.edu.in",
    website: "https://www.bhc.edu.in/",
    address: "Tiruchirappalli - 620017, Tamil Nadu, India",
    about:
      "Bishop Heber College is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  ART028: {
    phone: "0431-2331135 / +91-9360963012",
    email: "principal@jmc.edu",
    website: "https://www.jmc.edu/",
    address: "Khajanagar, Tiruchirappalli - 620020, Tamil Nadu, India",
    about:
      "Jamal Mohamed College is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  ART029: {
    phone: "0452-2530070 / 0452-2530973",
    email: "principal@americancollege.edu.in",
    website: "https://www.americancollege.edu.in/",
    address: "Gokhale Road, Tallakulam, Madurai - 625002, Tamil Nadu, India",
    about:
      "The American College is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  ART030: {
    phone: "0452-2530527 / 2524575",
    email: "principal@ldc.edu.in",
    website: "https://www.ladydoakcollege.edu.in/",
    address: "Thallakulam, Madurai - 625002, Tamil Nadu, India",
    about:
      "Lady Doak College is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  ART031: {
    phone: "0452-2673354",
    email: "helpdesk@maduracollege.edu.in",
    website: "https://www.maduracollege.edu.in/",
    address: "Vidya Nagar, Madurai - 625011, Tamil Nadu, India",
    about:
      "The Madura College is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  ART032: {
    phone: "0427-2413273",
    email: "principalgacslm7@yahoo.co.in",
    website: "https://www.tn.gov.in/",
    address: "Salem - 636007, Tamil Nadu, India",
    about:
      "Government Arts College Salem is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  ART033: {
    phone: "+91-427-3519079",
    email: "guham8@yahoo.co.in",
    website: "https://www.tn.gov.in/",
    address: "Fairlands, Salem - 636016, Tamil Nadu, India",
    about:
      "Sri Sarada College for Women is an arts and science institution offering undergraduate, postgraduate and research programmes across humanities, commerce, science and management. Verify phone, email and fee details on the official website.",
  },
  MED024: {
    phone: "+91-8000338855",
    email: "callcentre@cmcvellore.ac.in",
    website: "https://www.cmch-vellore.edu/",
    address: "Ida Scudder Road, Vellore - 632004, Tamil Nadu, India",
    about:
      "Christian Medical College Vellore is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED025: {
    phone: "0416-2260900",
    email: "dean.tnvlr@nic.in",
    website: "https://www.tn.gov.in/",
    address: "Adukkamparai, Vellore - 632011, Tamil Nadu, India",
    about:
      "Government Vellore Medical College is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED026: {
    phone: "0416-2287012 / 0416-2287013",
    email: "registrarcon@cmcvellore.ac.in",
    website: "https://www.cmch-vellore.edu/",
    address: "Ida Scudder Road, Vellore - 632004, Tamil Nadu, India",
    about:
      "College of Nursing, Christian Medical College Vellore is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED027: {
    phone: "0431-2401011 / 2771465 / 2771466",
    email: "deantrichy@gmail.com",
    website: "https://www.tn.gov.in/",
    address: "Tiruchirappalli - 620001, Tamil Nadu, India",
    about:
      "K.A.P. Viswanatham Government Medical College Tiruchirappalli is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED028: {
    phone: "0431-2255555 / 0431-2258956",
    email: "info@mc.srmtrichy.edu.in",
    website: "https://www.tn.gov.in/",
    address: "Irungalur, Tiruchirappalli - 621105, Tamil Nadu, India",
    about:
      "Trichy SRM Medical College Hospital and Research Centre is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED029: {
    phone: "0452-2532535",
    email: "deanmdumc@gmail.com",
    website: "https://www.tn.gov.in/",
    address: "Panagal Road, Madurai - 625020, Tamil Nadu, India",
    about:
      "Madurai Medical College is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED030: {
    phone: "0452-7113333",
    email: "info@velammalmedicalcollege.edu.in",
    website: "https://www.tn.gov.in/",
    address: "Anuppanadi, Madurai - 625009, Tamil Nadu, India",
    about:
      "Velammal Medical College Hospital and Research Institute is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED031: {
    phone: "0427-2383313",
    email: "deangmkmcslm@gmail.com",
    website: "https://www.tn.gov.in/",
    address: "Salem - 636030, Tamil Nadu, India",
    about:
      "Government Mohan Kumaramangalam Medical College Salem is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED032: {
    phone: "0427-3500800 / 0427-3500803",
    email: "dean.vmkvmc@vmu.edu.in",
    website: "https://www.tn.gov.in/",
    address: "Ariyanoor, Salem - 636308, Tamil Nadu, India",
    about:
      "Vinayaka Mission's Kirupananda Variyar Medical College and Hospitals is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  MED033: {
    phone: "0427-2477723",
    email: "dean@vmsdc.edu.in",
    website: "https://www.tn.gov.in/",
    address: "Ariyanoor, Salem - 636308, Tamil Nadu, India",
    about:
      "Vinayaka Mission's Sankarachariyar Dental College is a healthcare education institution offering medical, nursing, pharmacy and allied health programmes with clinical training. Verify phone, email and fee details on the official website.",
  },
  AGR001: {
    phone: "0422-6611210",
    email: "deanagri@tnau.ac.in",
    website: "https://tnau.ac.in/",
    address:
      "Tamil Nadu Agricultural University, Lawley Road, Coimbatore - 641003, Tamil Nadu, India",
    about:
      "AC&RI Coimbatore is the flagship agricultural college of Tamil Nadu Agricultural University offering B.Sc (Hons) Agriculture along with postgraduate and doctoral programmes.",
  },
  AGR002: {
    phone: "0422-6611255",
    email: "registrar@tnau.ac.in",
    website: "https://tnau.ac.in/",
    address:
      "Tamil Nadu Agricultural University, Lawley Road, Coimbatore - 641003, Tamil Nadu, India",
    about:
      "The Agricultural Engineering College and Research Institute is a constituent college of TNAU offering agricultural engineering and food technology programmes. Email shown is the TNAU registrar office.",
  },
  AGR003: {
    phone: "0422-6611270",
    email: "registrar@tnau.ac.in",
    website: "https://tnau.ac.in/",
    address:
      "Tamil Nadu Agricultural University, Lawley Road, Coimbatore - 641003, Tamil Nadu, India",
    about:
      "The Horticultural College and Research Institute is a constituent college of TNAU offering horticulture and forestry programmes. Email shown is the TNAU registrar office.",
  },
  AGR004: {
    phone: "0422-6611201",
    email: "registrar@tnau.ac.in",
    website: "https://tnau.ac.in/",
    address:
      "Agricultural College and Research Institute, Madurai, Tamil Nadu, India",
    about:
      "AC&RI Madurai is a constituent college of TNAU serving southern Tamil Nadu with agriculture degree and research programmes. Phone and email shown are the TNAU registrar office.",
  },
  AGR005: {
    phone: "0422-6611201",
    email: "registrar@tnau.ac.in",
    website: "https://tnau.ac.in/",
    address: "Killikulam, Vallanadu, Thoothukudi, Tamil Nadu, India",
    about:
      "AC&RI Killikulam is a constituent college of TNAU in Thoothukudi district offering agriculture programmes. Phone and email shown are the TNAU registrar office.",
  },
  AGR006: {
    phone: "0422-6611201",
    email: "registrar@tnau.ac.in",
    website: "https://tnau.ac.in/",
    address: "Kumulur, Tiruchirappalli, Tamil Nadu, India",
    about:
      "Anbil Dharmalingam Agricultural College and Research Institute is a TNAU constituent college at Kumulur near Tiruchirappalli. Phone and email shown are the TNAU registrar office.",
  },
  AGR007: {
    phone: "04144-238259",
    email: "au_regr@ymail.com",
    website: "https://annamalaiuniversity.ac.in/",
    address: "Annamalai Nagar, Chidambaram - 608002, Tamil Nadu, India",
    about:
      "The Faculty of Agriculture of Annamalai University offers agriculture and allied degree programmes in Chidambaram. Verify phone, email and fee details on the official website.",
  },
  AGR008: {
    phone: "04563-289042 / 289043 / 289044",
    email: "info@kalasalingam.ac.in",
    website: "https://kalasalingam.ac.in/",
    address:
      "Anand Nagar, Krishnankoil - 626126, Virudhunagar, Tamil Nadu, India",
    about:
      "Kalasalingam School of Agriculture and Horticulture offers agriculture and horticulture programmes at Kalasalingam Academy of Research and Education. Verify phone, email and fee details on the official website.",
  },
  LAW001: {
    phone: "044-2464-1919",
    email: "registrar@tndalu.ac.in",
    website: "https://www.tndalu.ac.in/",
    address:
      "Perungudi Campus, Dr. M.G.R. Salai, Chennai - 600113 (University office: Poompozhil, 5 Dr. D.G.S. Dinakaran Salai, Chennai - 600028)",
    about:
      "The School of Excellence in Law is the flagship law school of Tamil Nadu Dr. Ambedkar Law University, offering 5-year integrated honours law degrees and LL.M. programmes.",
  },
  LAW002: {
    phone: "+91-431-2692101",
    email: "adminoffice@tnnlu.ac.in",
    website: "https://tnnlu.ac.in/",
    address:
      "Dindigul Main Road, Navalurkuttappattu, Tiruchirappalli - 620027, Tamil Nadu, India",
    about:
      "TNNLU is a fully residential national law university in Tiruchirappalli offering integrated law degrees, LL.M. and research programmes.",
  },
  LAW003: {
    phone: "044-2464-1919",
    email: "registrar@tndalu.ac.in",
    website: "https://www.tndalu.ac.in/",
    address:
      "Pattaraiperumbudur, Thiruvallur District - 631203, Tamil Nadu, India",
    about:
      "Dr. Ambedkar Government Law College is a government law college affiliated to Tamil Nadu Dr. Ambedkar Law University. Phone and email shown are the university admissions and registrar offices.",
  },
  LAW004: {
    phone: "044-2464-1919",
    email: "registrar@tndalu.ac.in",
    website: "https://www.tndalu.ac.in/",
    address: "Madurai - 625020, Tamil Nadu, India",
    about:
      "Government Law College Madurai is a government law college affiliated to Tamil Nadu Dr. Ambedkar Law University. Phone and email shown are the university admissions and registrar offices.",
  },
  LAW005: {
    phone: "044-2464-1919",
    email: "registrar@tndalu.ac.in",
    website: "https://www.tndalu.ac.in/",
    address: "Tiruchirappalli, Tamil Nadu, India",
    about:
      "Government Law College Tiruchirappalli is a government law college affiliated to Tamil Nadu Dr. Ambedkar Law University. Phone and email shown are the university admissions and registrar offices.",
  },
  LAW006: {
    phone: "044-2464-1919",
    email: "registrar@tndalu.ac.in",
    website: "https://www.tndalu.ac.in/",
    address: "Coimbatore, Tamil Nadu, India",
    about:
      "Government Law College Coimbatore is a government law college affiliated to Tamil Nadu Dr. Ambedkar Law University. Phone and email shown are the university admissions and registrar offices.",
  },
  LAW007: {
    phone: "+91-44-27417400",
    email: "admissions@srmist.edu.in",
    website: "https://www.srmist.edu.in/",
    address:
      "SRM Nagar, Kattankulathur, Chengalpattu - 603203, Tamil Nadu, India",
    about:
      "SRM School of Law is part of SRM Institute of Science and Technology and offers integrated law programmes. Phone and email shown are the SRM admissions office.",
  },
  LAW008: {
    email: "admissions.simats@saveetha.com",
    phone: "1800-123-746287 / +91-7092180202",
    website: "https://www.saveetha.com/",
    address: "Saveetha Nagar, Thandalam, Chennai - 602105, Tamil Nadu, India",
    about:
      "Saveetha School of Law offers integrated and postgraduate law programmes under Saveetha Institute of Medical and Technical Sciences. Verify phone, email and fee details on the official website.",
  },
  NUR001: {
    phone: "+91-44-25305000",
    email: "dean@mmc.ac.in",
    website: "https://mmc.ac.in/",
    address: "Park Town, Chennai - 600003, Tamil Nadu, India",
    about:
      "Government College of Nursing is attached to Madras Medical College and Rajiv Gandhi Government General Hospital, Chennai. Phone and email shown are the Madras Medical College office.",
  },
  NUR002: {
    phone: "+91-452-2532535",
    email: "maduraimedicalcollege@gmail.com",
    website: "https://maduraimedicalcollege.org/",
    address: "Alwarpuram, Madurai - 625020, Tamil Nadu, India",
    about:
      "Government College of Nursing is attached to Madurai Medical College and the Government Rajaji Hospital. Phone and email shown are the Madurai Medical College office.",
  },
  NUR003: {
    phone: "044-26801580",
    email: "admission.scon@saveetha.com",
    website: "https://www.scon.saveetha.com/",
    address:
      "Saveetha Nagar, Thandalam, Kanchipuram - Chennai Road, Chennai - 602105, Tamil Nadu, India",
    about:
      "Saveetha College of Nursing offers B.Sc, Post Basic B.Sc and M.Sc Nursing programmes with clinical training at Saveetha Medical College Hospital. Verify phone, email and fee details on the official website.",
  },
  NUR004: {
    phone: "+91-44-27417400",
    email: "admissions@srmist.edu.in",
    website: "https://www.srmist.edu.in/",
    address:
      "SRM Nagar, Kattankulathur, Chengalpattu - 603203, Tamil Nadu, India",
    about:
      "SRM College of Nursing offers nursing programmes under SRM Institute of Science and Technology with clinical training at SRM Medical College Hospital. Phone and email shown are the SRM admissions office.",
  },
  NUR005: {
    phone: "044-2476 8027 / 044-2476 5512",
    email: "registrar@sriramachandra.edu.in",
    website: "https://www.sriramachandra.edu.in/",
    address:
      "No.1, Ramachandra Nagar, Porur, Chennai - 600116, Tamil Nadu, India",
    about:
      "Sri Ramachandra Faculty of Nursing offers nursing programmes with clinical training at Sri Ramachandra Medical Centre. Verify phone, email and fee details on the official website.",
  },
  NUR006: {
    phone: "+91 44 2481 5824",
    email: "info@meenakshicn.edu.in",
    website: "https://www.maher.ac.in/",
    address:
      "Meenakshi Academy of Higher Education and Research, West K.K. Nagar, Chennai - 600078, Tamil Nadu, India",
    about:
      "Meenakshi College of Nursing offers nursing programmes under Meenakshi Academy of Higher Education and Research. Verify phone, email and fee details on the official website.",
  },
  NUR007: {
    email: "sbcnchennai@gmail.com",
    phone: "+91 44 4287 7081",
    website: "https://bharathuniv.ac.in/",
    address:
      "Bharath Institute of Higher Education and Research, Selaiyur, Chennai - 600073, Tamil Nadu, India",
    about:
      "Sree Balaji College of Nursing offers nursing programmes with clinical training at Sree Balaji Medical College and Hospital. Verify phone, email and fee details on the official website.",
  },
  NUR008: {
    email: "principal@psgnursing.ac.in",
    phone: "+91-422-4345862 / 2570170",
    website: "https://www.psgimsr.ac.in/",
    address: "Peelamedu, Coimbatore - 641004, Tamil Nadu, India",
    about:
      "PSG College of Nursing offers nursing programmes with clinical training at PSG Hospitals, Coimbatore. Verify phone, email and fee details on the official website.",
  },
  AHS001: {
    phone: "044-2476 8027 / 044-2476 5512",
    email: "registrar@sriramachandra.edu.in",
    website: "https://www.sriramachandra.edu.in/",
    address:
      "No.1, Ramachandra Nagar, Porur, Chennai - 600116, Tamil Nadu, India",
    about:
      "The Faculty of Allied Health Sciences offers laboratory, imaging, anaesthesia and other allied health programmes with clinical exposure at Sri Ramachandra Medical Centre. Verify phone, email and fee details on the official website.",
  },
  AHS002: {
    phone: "+91-44-23643955 / 23643956 / 9094006333",
    email: "principal@maherfahs.ac.in",
    website: "https://www.maher.ac.in/",
    address:
      "Meenakshi Academy of Higher Education and Research, West K.K. Nagar, Chennai - 600078, Tamil Nadu, India",
    about:
      "The Faculty of Allied Health Sciences offers allied health degree programmes under Meenakshi Academy of Higher Education and Research. Verify phone, email and fee details on the official website.",
  },
  AHS003: {
    phone: "+91-44-27417400",
    email: "admissions@srmist.edu.in",
    website: "https://www.srmist.edu.in/",
    address:
      "SRM Nagar, Kattankulathur, Chengalpattu - 603203, Tamil Nadu, India",
    about:
      "SRM College of Health Sciences offers allied health programmes under SRM Institute of Science and Technology. Phone and email shown are the SRM admissions office.",
  },
  AHS004: {
    email: "sbcahs@bharathuniv.ac.in",
    phone: "+91 44 2241 5603",
    website: "https://bharathuniv.ac.in/",
    address:
      "Bharath Institute of Higher Education and Research, Selaiyur, Chennai - 600073, Tamil Nadu, India",
    about:
      "Sree Balaji College of Allied Health Sciences offers allied health programmes with hospital training at Sree Balaji Medical College and Hospital. Verify phone, email and fee details on the official website.",
  },
  AHS005: {
    email: "principalfahs@care.edu.in",
    phone: "044-47429200",
    website: "https://www.care.edu.in/",
    address:
      "Rajiv Gandhi Salai, Kelambakkam, Chengalpattu - 603103, Tamil Nadu, India",
    about:
      "Chettinad School of Allied Health Sciences offers allied health programmes with clinical training at Chettinad Hospital and Research Institute. Verify phone, email and fee details on the official website.",
  },
  AHS006: {
    email: "info@kmchihsr.edu.in",
    phone: "0422-6806840 / 0422-6806162",
    website: "https://www.kmchhospitals.com/",
    address: "Avinashi Road, Coimbatore - 641014, Tamil Nadu, India",
    about:
      "KMCH Institute of Health Sciences and Research offers allied health and nursing programmes with clinical training at Kovai Medical Center and Hospital. Verify phone, email and fee details on the official website.",
  },
  PHY001: {
    email: "principalphysiotherapy@saveetha.com",
    phone: "044-66726630",
    website: "https://www.saveetha.com/",
    address: "Saveetha Nagar, Thandalam, Chennai - 602105, Tamil Nadu, India",
    about:
      "Saveetha College of Physiotherapy offers BPT, MPT and doctoral programmes with clinical exposure at Saveetha Medical College Hospital. Verify phone, email and fee details on the official website.",
  },
  PHY002: {
    phone: "+91-44-27417400",
    email: "admissions@srmist.edu.in",
    website: "https://www.srmist.edu.in/",
    address:
      "SRM Nagar, Kattankulathur, Chengalpattu - 603203, Tamil Nadu, India",
    about:
      "SRM College of Physiotherapy offers BPT and MPT programmes under SRM Institute of Science and Technology. Phone and email shown are the SRM admissions office.",
  },
  PHY003: {
    phone: "044-2476 8027 / 044-2476 5512",
    email: "registrar@sriramachandra.edu.in",
    website: "https://www.sriramachandra.edu.in/",
    address:
      "No.1, Ramachandra Nagar, Porur, Chennai - 600116, Tamil Nadu, India",
    about:
      "Sri Ramachandra Faculty of Physiotherapy offers BPT and MPT programmes with clinical training at Sri Ramachandra Medical Centre. Verify phone, email and fee details on the official website.",
  },
  PHY004: {
    phone: "044-23643955 / 044-23643956 / 044-23649400",
    email: "fpt@maher.ac.in",
    website: "https://www.maher.ac.in/",
    address:
      "Meenakshi Academy of Higher Education and Research, West K.K. Nagar, Chennai - 600078, Tamil Nadu, India",
    about:
      "Meenakshi College of Physiotherapy offers BPT and MPT programmes under Meenakshi Academy of Higher Education and Research. Verify phone, email and fee details on the official website.",
  },
  PHY005: {
    email: "s.s.subramanian@hotmail.com",
    phone: "044-22462179 / 044-22461883 / +91-99400 47137",
    website: "https://bharathuniv.ac.in/",
    address:
      "Bharath Institute of Higher Education and Research, Selaiyur, Chennai - 600073, Tamil Nadu, India",
    about:
      "Sree Balaji College of Physiotherapy offers BPT and MPT programmes with clinical training at Sree Balaji Medical College and Hospital. Verify phone, email and fee details on the official website.",
  },
  PHY006: {
    email: "principal.vmcpt@vmu.edu.in",
    phone: "+91-427-3012009 / +91-90035 20999",
    website: "https://vmu.edu.in/",
    address: "Ariyanoor, Salem - 636308, Tamil Nadu, India",
    about:
      "Vinayaka Mission's College of Physiotherapy offers BPT and MPT programmes with clinical training in Salem. Verify phone, email and fee details on the official website.",
  },
  PHY007: {
    email: "psgphysio@yahoo.co.in",
    phone: "+91-422-4345871 / 0422-2570170",
    website: "https://www.psgimsr.ac.in/",
    address: "Peelamedu, Coimbatore - 641004, Tamil Nadu, India",
    about:
      "PSG College of Physiotherapy offers BPT and MPT programmes with clinical training at PSG Hospitals, Coimbatore. Verify phone, email and fee details on the official website.",
  },
  PHY008: {
    email: "pt@kmch.ac.in / office@kmchphysiotherapy.ac.in",
    phone: "+91-422-2369422 / +91-422-2369426",
    website: "https://www.kmchhospitals.com/",
    address: "Avinashi Road, Coimbatore - 641014, Tamil Nadu, India",
    about:
      "KMCH College of Physiotherapy offers BPT and MPT programmes with clinical training at Kovai Medical Center and Hospital. Verify phone, email and fee details on the official website.",
  },
  ENG035: {
    phone: "04563-289042 / 289043 / 289044",
    email: "info@kalasalingam.ac.in",
    website: "https://kalasalingam.ac.in/",
    address:
      "Anand Nagar, Krishnankoil - 626126, Srivilliputhur, Virudhunagar, Tamil Nadu, India",
    about:
      "Kalasalingam Academy of Research and Education (KARE) is a deemed-to-be university at Krishnankoil, Virudhunagar district, offering engineering, science, architecture, pharmacy, medicine and research programmes.",
  },
  ENG036: {
    phone: "04326-277571",
    email: "principalkncet@gmail.com",
    website: "https://kongunadu.ac.in/",
    address: "Thottiam, Tiruchirappalli, Tamil Nadu, India",
    about:
      "Kongunadu College of Engineering and Technology is an autonomous engineering institution affiliated to Anna University, Chennai, in the Thottiam area of Tiruchirappalli district. Verify fee and admission details on the official website.",
  },
  ART034: {
    phone: "04144-238259",
    email: "au_regr@ymail.com",
    website: "https://annamalaiuniversity.ac.in/",
    address: "Annamalai Nagar, Chidambaram - 608002, Tamil Nadu, India",
    about:
      "Annamalai University, established in 1929 at Chidambaram, is one of the largest residential universities in South India with faculties across arts, science, engineering, agriculture, medicine and more. Contact shown is the Registrar's office.",
  },
  MED034: {
    phone: "04144-238259",
    email: "au_regr@ymail.com",
    website: "https://annamalaiuniversity.ac.in/",
    address: "Annamalai Nagar, Chidambaram - 608002, Tamil Nadu, India",
    about:
      "Rajah Muthiah Medical College and Hospital is the medical faculty of Annamalai University, Chidambaram. Contact shown is the university Registrar's office; verify medical college contacts on the official website.",
  },
  ENG037: {
    phone: "+91-4144-238275",
    email: "aufeatdean@gmail.com",
    website: "https://annamalaiuniversity.ac.in/",
    address: "Annamalai Nagar, Chidambaram, Tamil Nadu, India",
    about:
      "Annamalai University Faculty of Engineering and Technology is an institution in Chidambaram, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG038: {
    phone: "04549-278791",
    email: "principal@kamarajengg.edu.in",
    website: "https://kamarajengg.edu.in/",
    address: "K.Vellakulam, Madurai District, Tamil Nadu, India",
    about:
      "Kamaraj College of Engineering and Technology is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG039: {
    phone: "0452-2429346",
    email: "principal.scemdu@gmail.com",
    website: "https://www.solamalaice.ac.in/",
    address: "Veerapanjan, Madurai, Tamil Nadu, India",
    about:
      "Solamalai College of Engineering is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG040: {
    phone: "+91-9952767994",
    email: "sarananu94@gmail.com",
    website: "https://igceng.com/",
    address: "Manikandam, Tiruchirappalli, Tamil Nadu, India",
    about:
      "Indra Ganesan College of Engineering is an institution in Tiruchirappalli, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG041: {
    phone: "0431-2660922",
    email: "principalengg@miet.edu",
    website: "https://miet.edu/",
    address: "Gundur, Tiruchirappalli, Tamil Nadu, India",
    about:
      "M.I.E.T. Engineering College is an institution in Tiruchirappalli, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG042: {
    phone: "0431-2670799",
    email: "principal@krct.ac.in",
    website: "https://krct.ac.in/",
    address: "Samayapuram, Tiruchirappalli, Tamil Nadu, India",
    about:
      "K.Ramakrishnan College of Technology is an institution in Tiruchirappalli, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG043: {
    phone: "0431-2695607",
    email: "principal@jjcet.ac.in",
    website: "https://jjcet.ac.in/",
    address: "Poolangulathuppatti, Tiruchirappalli, Tamil Nadu, India",
    about:
      "J.J College of Engineering and Technology is an institution in Tiruchirappalli, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG045: {
    phone: "04562-235600",
    email: "principal@mepcoeng.ac.in",
    website: "https://mepcoeng.ac.in/",
    address: "Sivakasi, Virudhunagar, Tamil Nadu, India",
    about:
      "Mepco Schlenk Engineering College is an institution in Virudhunagar, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG046: {
    phone: "04562-239600",
    email: "pmarichamy@psr.edu.in",
    website: "https://psr.edu.in/",
    address: "Sivakasi, Virudhunagar, Tamil Nadu, India",
    about:
      "P.S.R Engineering College is an institution in Virudhunagar, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG047: {
    phone: "04563-233404",
    email: "principal@ritrjpm.ac.in",
    website: "https://ritrjpm.ac.in/",
    address: "Rajapalayam, Virudhunagar, Tamil Nadu, India",
    about:
      "Ramco Institute of Technology is an institution in Virudhunagar, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG048: {
    phone: "+91-416-2230900",
    email: "principal@gtec.ac.in",
    website: "https://www.gtec.ac.in/",
    address: "Kaniyambadi, Vellore, Tamil Nadu, India",
    about:
      "Ganadipathy Tulsi's Jain Engineering College is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG049: {
    phone: "+91-416-2298300",
    email: "info@kingston.ac.in",
    website: "https://engineering.kingston.ac.in/",
    address: "Katpadi, Vellore, Tamil Nadu, India",
    about:
      "Kingston Engineering College is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG050: {
    phone: "+91-4283-359999",
    email: "info@shanmugha.edu.in",
    website: "https://engineering.shanmugha.edu.in/",
    address: "Sankari, Salem, Tamil Nadu, India",
    about:
      "Sri Shanmugha College of Engineering and Technology is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG051: {
    phone: "+91-9384816697",
    email: "info@salemcollege.ac.in",
    website: "https://www.salemcollege.ac.in/",
    address: "Mettupatty Perumapalayam, Salem, Tamil Nadu, India",
    about:
      "Salem College of Engineering and Technology is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG053: {
    phone: "04332-292338",
    email: "kcet@kurinjiengg.org",
    website: "https://kurinjiengg.org/",
    address: "Manapparai, Tiruchirappalli, Tamil Nadu, India",
    about:
      "Kurinji College of Engineering and Technology is an institution in Tiruchirappalli, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG054: {
    phone: "0431-2908072",
    email: "sureyacollegecoffice@gmail.com",
    website: "Official College Website",
    address: "Konalai, Tiruchirappalli, Tamil Nadu, India",
    about:
      "Sureya College of Engineering is an institution in Tiruchirappalli, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG055: {
    phone: "0431-2650336",
    email: "admissions@sacet.edu.in",
    website: "https://www.sacet.edu.in/",
    address: "Siruganoor, Tiruchirappalli, Tamil Nadu, India",
    about:
      "Shri Angalamman College of Engineering and Technology is an institution in Tiruchirappalli, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART035: {
    phone: "0452-2533751",
    email: "ambiga.madurai@hotmail.com",
    website: "Official College Website",
    address: "Madurai, Tamil Nadu, India",
    about:
      "Ambiga College of Arts & Science is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART036: {
    phone: "0452-2561443",
    email: "csi_arts_college@yahoo.co.in",
    website: "Official College Website",
    address: "K. Pudur, Madurai, Tamil Nadu, India",
    about:
      "C.S.I. College of Arts & Science for Women is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART037: {
    phone: "0452-2669936",
    email: "mangaiarts1997@gmail.com",
    website: "Official College Website",
    address: "Paravai, Madurai, Tamil Nadu, India",
    about:
      "Mangayarkarasi Arts & Science College for Women is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART038: {
    phone: "0427-2270522 / 2270545 / 270537",
    email: "ssc.sfcw2010@gmail.com",
    website: "Official College Website",
    address: "Salem, Tamil Nadu, India",
    about:
      "Salem Sowdeswari College is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART039: {
    phone: "0427-2241429 / 2240107 / 9994415730",
    email: "principal@vysyacollege.org",
    website: "Official College Website",
    address: "Ayodhiyapattinam, Salem, Tamil Nadu, India",
    about:
      "Vysya College is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART040: {
    phone: "0427-2421919 / 6991612 / 2210499",
    email: "principal@jac.ac.in",
    website: "Official College Website",
    address: "Chinnathirupathy, Salem, Tamil Nadu, India",
    about:
      "Jairam Arts & Science College is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART041: {
    phone: "04298-262933 / 262680",
    email: "sbmcollege_slmm@yahoo.co.in",
    website: "Official College Website",
    address: "Mechery, Salem District, Tamil Nadu, India",
    about:
      "Sri Balamurugan College of Arts & Science is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART042: {
    phone: "0427-2242999 / 6532244 / 9842724299",
    email: "principal.ganeshcollege@gmail.com",
    website: "Official College Website",
    address: "Ammapet, Salem, Tamil Nadu, India",
    about:
      "Sri Ganesh College of Arts & Science is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART043: {
    phone: "0427-2295666 / 6547990 / 2296646",
    email: "swcprincipal@gmail.com",
    website: "Official College Website",
    address: "Ammapet, Salem, Tamil Nadu, India",
    about:
      "Sri Sakthikailash Women's College is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART044: {
    phone: "04282-231736 / 9585510746",
    email: "paavendharartscollege@gmail.com",
    website: "Official College Website",
    address: "Attur, Salem District, Tamil Nadu, India",
    about:
      "Paavendhar College of Arts & Science is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART045: {
    phone: "04282-281691",
    email: "aetcollege@gmail.com",
    website: "Official College Website",
    address: "Attur, Salem District, Tamil Nadu, India",
    about:
      "AET Arts & Science College is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART046: {
    phone: "0416-2266051",
    email: "nfo@dkmcollege.org",
    website: "Official College Website",
    address: "Sainathapuram, Vellore, Tamil Nadu, India",
    about:
      "D.K.M. College for Women is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART047: {
    phone: "04174-243723",
    email: "principalmuc@gmail.com",
    website: "Official College Website",
    address: "Ambur, Vellore District, Tamil Nadu, India",
    about:
      "Mazharul Uloom College is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART048: {
    phone: "04171-220162",
    email: "gtmc.gudiyattam@gmail.com",
    website: "Official College Website",
    address: "Gudiyatham, Vellore District, Tamil Nadu, India",
    about:
      "Government Thirumagal Mills College is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART049: {
    phone: "0416-2262068",
    email: "mgacvlr@gmail.com",
    website: "Official College Website",
    address: "Vellore, Tamil Nadu, India",
    about:
      "Muthurangam Government Arts College is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART050: {
    phone: "0452-2372172",
    email: "soucolwomen@yahoo.co.in",
    website: "Official College Website",
    address: "Pasumalai, Madurai, Tamil Nadu, India",
    about:
      "Sourashtra College for Women is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  MED035: {
    phone: "04562-299930",
    email: "deangmcvnr@gmail.com",
    website: "https://gmcvnr.ac.in/",
    address: "Kooraikundu Village, Virudhunagar, Tamil Nadu, India",
    about:
      "Government Medical College Virudhunagar is an institution in Virudhunagar, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  MED036: {
    phone: "0461-2330094",
    email: "deantut@tn.gov.in",
    website: "https://thoothukudi.nic.in/medical-college/",
    address: "Kamaraj Nagar, Thoothukudi, Tamil Nadu, India",
    about:
      "Government Thoothukudi Medical College is an institution in Thoothukudi, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  MED037: {
    phone: "+91 452 248 2201",
    email: "ghmchmdu@gmail.com",
    website: "Official College Website",
    address: "Tirumangalam, Madurai, Tamil Nadu, India",
    about:
      "Government Homeopathy College Hospital, Madurai is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  MED038: {
    phone: "04283-359999",
    email: "info@shanmugha.edu.in",
    website: "Official College Website",
    address: "Sankari, Salem District, Tamil Nadu, India",
    about:
      "Sri Shanmugha Institute of Medical Sciences and Research is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  MED039: {
    phone: "04144-238071",
    email: "rmdentalcollege@gmail.com",
    website: "https://www.cmch-vellore.edu/",
    address: "Annamalai Nagar, Chidambaram, Tamil Nadu, India",
    about:
      "Government Dental College & Hospital, Chidambaram is an institution in Chidambaram, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  NUR009: {
    phone: "+91-90036-55855",
    email: "principal@snscnursing.org",
    website: "https://snscnursing.org/",
    address: "SNS Kalvi Nagar, Saravanampatti, Coimbatore, Tamil Nadu, India",
    about:
      "SNS College of Nursing is an institution in Coimbatore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  NUR011: {
    phone: "+91-90039-17325",
    email: "sncon@snhrc.org",
    website: "https://www.sncon.edu.in/",
    address: "Thirumalaikodi, Vellore, Tamil Nadu, India",
    about:
      "Sri Narayani College of Nursing is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  NUR012: {
    phone: "+91-9486946403",
    email: "info@bprcollegeofnursing.edu.in",
    website: "https://bprcollegeofnursing.edu.in/",
    address: "Filterbed Road, Vellore, Tamil Nadu, India",
    about:
      "BPR School and College of Nursing is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  NUR013: {
    phone: "+91-9442700456",
    email: "tagorecollegeofnursingsalem@gmail.com",
    website: "https://tagorecollegeofnursing.com/",
    address: "Deviyakurichi, Thalaivasal, Salem District, Tamil Nadu, India",
    about:
      "Tagore College of Nursing is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  NUR014: {
    phone: "0452-2582000 / 2588001",
    email: "vikramnursing@gmail.com",
    website: "https://www.vikramcollegeofnursing.com/",
    address: "Madurai, Tamil Nadu, India",
    about:
      "Vikram College of Nursing is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  AHS007: {
    phone: "+91-90036-55855",
    email: "office@snscahs.org",
    website: "https://main.snsgroups.com/",
    address: "SNS Kalvi Nagar, Coimbatore, Tamil Nadu, India",
    about:
      "SNS College of Allied Health Science is an institution in Coimbatore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  AHS008: {
    phone: "+91-90036-55855",
    email: "office@snscphs.org",
    website: "https://main.snsgroups.com/",
    address: "SNS Kalvi Nagar, Coimbatore, Tamil Nadu, India",
    about:
      "SNS College of Pharmacy and Health Sciences is an institution in Coimbatore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  AHS009: {
    phone: "+91-4283-359999",
    email: "principal.ahs@shanmugha.edu.in",
    website: "https://shanmugha.edu.in/",
    address: "Sankari, Salem District, Tamil Nadu, India",
    about:
      "Sri Shanmugha College of Allied Health Sciences is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  AHS010: {
    phone: "+91-416-2284255",
    email: "registrar@cmcvellore.ac.in",
    website: "https://www.cmcvellore.ac.in/",
    address: "Vellore, Tamil Nadu, India",
    about:
      "Christian Medical College Faculty of Allied Health Sciences is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  PHY009: {
    phone: "+91-90036-55855",
    email: "principal@snscphysio.org",
    website: "https://snscphysio.org/",
    address: "SNS Kalvi Nagar, Coimbatore, Tamil Nadu, India",
    about:
      "SNS College of Physiotherapy is an institution in Coimbatore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  PHY011: {
    phone: "0452-2484024",
    email: "scpmadurai@gmail.com",
    website: "https://www.santoshphysiocollege.org/",
    address: "Thirunagar, Madurai, Tamil Nadu, India",
    about:
      "Santosh College of Physiotherapy is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  PHY012: {
    phone: "+91-4283-359999",
    email: "info@shanmugha.edu.in",
    website: "Official College Website",
    address: "Sankari, Salem District, Tamil Nadu, India",
    about:
      "Sri Shanmugha College of Physiotherapy is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  AGR009: {
    phone: "+91 452 242 2956",
    email: "deanagrimdu@tnau.ac.in",
    website: "Official College Website",
    address: "Tamil Nadu Agricultural University, Madurai, Tamil Nadu, India",
    about:
      "Agricultural College & Research Institute, Madurai is an institution in Madurai, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  AGR010: {
    phone: "0431-2690162",
    email: "deanagritry@tnau.ac.in",
    website: "https://tnau.ac.in/",
    address: "Navalurkuttapattu, Tiruchirappalli, Tamil Nadu, India",
    about:
      "Anbil Dharmalingam Agricultural College and Research Institute is an institution in Tiruchirappalli, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  AGR011: {
    phone: "04144-238259",
    email: "au_regr@ymail.com",
    website: "https://annamalaiuniversity.ac.in/",
    address: "Annamalai Nagar, Chidambaram, Tamil Nadu, India",
    about:
      "Annamalai University Faculty of Agriculture is an institution in Chidambaram, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  LAW009: {
    phone: "0416-2241744",
    email: "law.college.vellore@gmail.com",
    website: "https://glcvellore.ac.in/",
    address: "Katpadi, Vellore, Tamil Nadu, India",
    about:
      "Government Law College, Vellore is an institution in Vellore, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  LAW010: {
    phone: "0427-2272434",
    email: "glcslm@tn.gov.in",
    website: "https://glcsalem.ac.in/",
    address: "Salem, Tamil Nadu, India",
    about:
      "Government Law College, Salem is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  LAW011: {
    phone: "0427-2272434",
    email: "glcslm@tn.gov.in",
    website: "Official College Website",
    address: "Salem, Tamil Nadu, India",
    about:
      "Central Law College, Salem is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ART051: {
    phone: "04288-294239",
    email: "principalviaas@yahoo.com",
    website: "Official College Website",
    address: "Sankagiri, Salem District, Tamil Nadu, India",
    about:
      "Vivekanandha College for Women is an institution in Salem, Tamil Nadu. Contact details are taken from an official institution, university or government listing where available.",
  },
  ENG052: {
    phone: "+91 73736 17171 / +91 97153 17171",
    email: "director@sece.ac.in",
    website: "https://sece.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG056: {
    phone: "+91 844 844 8909",
    email: "admission@rathinam.in",
    website: "https://rathinamcollege.edu.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG057: {
    phone: "0422-4242424 / +91 80983 33333",
    email: "principal@hicet.ac.in",
    website: "https://new.hicet.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG058: {
    phone: "0422-2369105 / +91 90252 86806",
    email: "info@drngpit.ac.in",
    website: "https://www.drngpit.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG059: {
    phone: "+91-8778128060",
    email: "principalcet@rvsgroup.com",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG060: {
    phone: "+91 4344 260570",
    email: "principal@adhiyamaan.ac.in",
    website: "https://adhiyamaan.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG061: {
    phone: "+91 44 6718 1111",
    email: "admin@rajalakshmi.edu.in",
    website: "https://pages.rajalakshmi.org/profile-accreditations.php",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG062: {
    phone: "044-6790 6790",
    email: "principal@rmkec.ac.in",
    website: "https://www.rmkec.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG063: {
    phone: "+91 44 3966 6005",
    email: "velammal@velammal.edu.in",
    website: "https://velammal.edu.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG064: {
    phone: "044-24500053",
    email: "coe@stjosephs.ac.in",
    website: "https://www.stjosephs.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG065: {
    phone: "044-2450 2818 / 1800 425 2220",
    email: "sdc@jeppiaarcollege.org",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG066: {
    phone: "+91-90438 91272 / 90438 90983; 044-26490404 / 0505 / 0717",
    email: "info@panimalar.ac.in",
    website: "https://panimalar.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG067: {
    phone: "+91-44-2229 0742 / 2229 0125",
    email: "admission@bharathuniv.ac.in",
    website: "https://www.bharathuniv.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG068: {
    phone: "04342-290090 / 8300424565",
    email: "principalgcedpi@gmail.com",
    website: "https://gcedpi.edu.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG069: {
    phone: "04329-2917278",
    email: "ucea@auucea.edu.in",
    website: "http://www.aucea.edu.in",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG070: {
    phone: "+91-4651-250566 / +91-94868-56101",
    email: "info@niuniv.com",
    website: "https://www.niuniv.com/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG071: {
    phone: "+91-462-2502283 / 2502157",
    email: "principal@francisxavier.ac.in",
    website: "https://www.francisxavier.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG072: {
    phone: "+91-70944-33186 / 04328-220554",
    email: "dsec.office@dsengg.ac.in",
    website: "https://www.dsengg.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG074: {
    phone: "+91-422-2619005",
    email: "info@kce.ac.in",
    website: "https://kce.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG075: {
    phone: "0422-2984567 / 0422-2984568",
    email: "info@skct.edu.in",
    website: "https://skct.edu.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ART052: {
    phone: "0422-2369221 / 2369253",
    email: "principal@drngpasc.ac.in",
    website: "https://www.drngpasc.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ART053: {
    phone: "04342-230008 / +91-9345329369",
    email: "principal.gacdharmapuri@gmail.com",
    website: "https://www.gacdpi.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ART054: {
    phone: "0431-2700637",
    email: "office@hcctrichy.ac.in",
    website: "https://www.hcctrichy.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ART055: {
    phone: "+91-427-3519079",
    email: "guham8@yahoo.co.in",
    website: "https://srisaradacollege.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ART056: {
    phone: "+91 422 222 3469",
    email: "nirmalacollege@rediffmail.com",
    website: "https://nirmalacollegeonline.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ART057: {
    phone: "+91-99 9430 0600 / 0422-2661100",
    email: "admissions@kumaraguru.edu.in",
    website: "https://kclas.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ART058: {
    phone: "0422-2562783 / +91-73730 86666",
    email: "chief@snrsons.ac.in",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ART059: {
    phone: "+91-7373033911",
    email: "srmvcascbe@gmail.com",
    website: "https://www.srmvcas.edu.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ART060: {
    phone: "+91-98431 33333 / +91-80983 33333",
    email: "info@hindusthan.net",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  MED040: {
    phone: "04342-233600 / 04342-233033",
    email: "gdmchdpi@gmail.com",
    website: "https://dharmapurimedicalcollege.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  MED041: {
    phone: "04322-270233 / 04322-271030",
    email: "deanpdktmc@gmail.com",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  MED042: {
    phone: "04324-242280 / Hospital Helpline 80567 31034",
    email: "deangmchkarur@gmail.com",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  MED043: {
    phone: "04286-294939 / 04286-294940",
    email: "gmchnkl@gmail.com",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  MED044: {
    phone: "04151-291176 / 04151-294961",
    email: "deankallakurichi@gmail.com",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  NUR015: {
    phone: "044-2956 5923 / +91-74018 41761",
    email: "apollocollegeofnursing@gmail.com",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  NUR016: {
    phone: "044-4592 8500 Ext. 8786",
    email: "principal.nursing@sriramachandra.edu.in",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  NUR017: {
    phone: "044-47429020 / +91-8447892022",
    email: "principalccn@care.edu.in",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  NUR018: {
    phone: "0422-2466698 / 0422-2466699 / +91 97509 72964",
    email: "nursing@abiramiedu.in",
    website: "https://abiraminursing.edu.in/",
    address: "L & T Bypass, Eachanari, Coimbatore - 641021, Tamil Nadu, India",
    about:
      "Sree Abirami College of Nursing states on its official website that its nursing programmes are approved by INC, TNNMC and the Government of Tamil Nadu and affiliated to The Tamil Nadu Dr. M.G.R. Medical University.",
  },
  AHS011: {
    phone: "+91-422-4324566",
    email: "ahskmch@gmail.com",
    website: "https://www.kmchahs.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  AHS012: {
    phone: "0422-4345888 / 0422-4345683 / 0422-4345848",
    email: "psgparamedicaladmission@gmail.com",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  AHS013: {
    phone: "0422-4040906 / +91-9585865101",
    email: "principal@rathinam.in",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  AHS014: {
    phone: "044-47429200 / +91-8447892022",
    email: "principalfahs@care.edu.in",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  AHS015: {
    phone: "044-4592-8500 Ext. 8636",
    email: "principal.ahs@sriramachandra.edu.in",
    website: "https://srfahs.sriramachandra.edu/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  AGR012: {
    phone: "0431-2690162",
    email: "deanagritry@tnau.ac.in",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  AGR013: {
    phone: "0422-6611270 / 0422-6611371",
    email: "deanhortcbe@tnau.ac.in",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  AGR014: {
    phone: "0431-250001",
    email: "deancaekum@tnau.ac.in",
    website: "https://tnau.ac.in/site/aecri-kumulur/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  LAW012: {
    phone: "+91 4342 233300",
    email: "glcdharmapuri@gmail.com",
    website: "https://glcdpi.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  LAW013: {
    phone: "0462-2578382",
    email: "glc.tvl.2010@gmail.com",
    website: "https://www.glctvl.ac.in/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  PHY013: {
    phone: "044-24768032 Ext. 8273 / 8271",
    email: "principal.physiotherapy@sriramachandra.edu.in",
    website: "https://sriramachandra.edu/",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  PHY014: {
    phone: "+91 422 236 9321",
    email: "physiotherapy@kmch.ac.in",
    website: "Official College Website",
    address: "Tamil Nadu, India",
    about:
      "Contact details are included from an official institution or government source where publicly available. If marked not publicly listed, no official public phone/email was found during verification.",
  },
  ENG076: {
    phone: "+91 44 4392 3041",
    email: "principal@easwari.srmrmp.edu.in",
  },
  ENG077: {
    phone: "+91 44 2251 2222",
    email: "sairam@sairam.edu.in",
  },
  ENG078: {
    phone: "+91 44 6672 6672",
    email: "mail@saveetha.ac.in",
  },
  ENG079: {
    phone: "+91 44 2450 3132",
    email: "stjosephsit@stjosephs.ac.in",
  },
  ENG080: {
    phone: "+91 44 2817 8490",
    email: "admission@licet.ac.in",
  },
  ENG081: {
    phone: "+91 44 7111 9111",
    email: "info@citchennai.net",
  },
  ENG082: {
    phone: "+91 44 2234 1389",
    email: "info@kcgcollege.com",
  },
  ENG083: {
    phone: "+91 44 6740 2555",
    email: "admission@act.edu.in",
  },
  ENG084: {
    phone: "+91 44 7156 5100",
    email: "kvcet@kveg.in",
  },
  ENG085: {
    phone: "+91 44 2742 1444",
    email: "prince@princeengg.com",
  },
  ENG086: {
    phone: "+91 44 2681 0641",
    email: "marketing@dmice.ac.in",
  },
  ENG087: {
    phone: "+91 44 6718 1600",
    email: "mail@ritchennai.edu.in",
  },
  ENG088: {
    website: "https://psgitech.ac.in/",
    phone: "+91 422 393 3555",
    email: "pgitopsg@psgitech.ac.in",
  },
  ENG089: {
    phone: "+91 44 2747 1320",
    email: "aiht_anand@yahoo.co.in",
  },
  ENG090: {
    phone: "+91 44 2746 9700",
    email: "info@ssn.edu.in",
  },
  ART061: {
    phone: "+91 44 2827 5926",
    email: "info@wcc.edu.in",
  },
  ART062: {
    phone: "+91 44 2852 0793",
    email: "qmgcw@yahoo.com",
  },
  ART063: {
    phone: "+91 44 2245 1746",
    email: "principal@gurunanakcollege.edu.in",
  },
  ART064: {
    phone: "+91 44 2833 0262",
    email: "mopvaishnav@mopvc.edu.in",
  },
  ART065: {
    phone: "+91 44 2224 8603",
    email: "amjaincollegemee@gmail.com",
  },
  ART066: {
    phone: "+91 44 2363 5101",
    email: "principal@dgvaishnavcollege.edu.in",
  },
  ART067: {
    phone: "+91 44 2499 3057",
    email: "rkmvcchennai@gmail.com",
  },
  ART068: {
    phone: "+91 431 248 2995",
    email: "principal@nationalcollege.ac.in",
  },
  ART069: {
    phone: "+91 44 2432 8506",
    email: "info@shasuncollege.edu.in",
  },
  ART070: {
    phone: "+91 44 2844 4995",
    email: "qmcchennai@gmail.com",
  },
  MED045: {
    phone: "+91 451 246 0141",
    email: "gmcdgl@tn.gov.in",
  },
  MED046: {
    phone: "+91 4329 221200",
    email: "gmcariyalur@gmail.com",
  },
  MED047: {
    phone: "+91 421 224 0555",
    email: "gmctiruppur@gmail.com",
  },
  MED048: {
    phone: "+91 4343 223500",
    email: "gmckrishnagiri@gmail.com",
  },
  MED049: {
    phone: "+91 44 2766 2200",
    email: "gmcthirlv@gmail.com",
  },
  MED050: {
    phone: "+91 4144 238008",
    email: "dean@rmc.edu.in",
  },
  NUR019: {
    phone: "+91 416 228 7000",
    email: "nursing@cmcvellore.ac.in",
  },
  NUR020: {
    phone: "+91 422 257 4335",
    email: "cherancollegeofnursing@gmail.com",
  },
  NUR021: {
    phone: "+91 4288 265793",
    email: "info@jkkm.org",
  },
  NUR022: {
    phone: "+91 427 221 1133",
    email: "vmcon@vmrf.edu.in",
  },
  NUR023: {
    phone: "+91 452 711 3333",
    email: "info@velammalmedicalcollege.edu.in",
  },
  NUR024: {
    phone: "+91 44 7156 5283",
    email: "kvcn2007@gmail.com",
  },
  AHS016: {
    phone: "+91 416 2281000",
    email: "princi.ahs@cmcvellore.ac.in",
  },
  AHS017: {
    phone: "+91 90036 55855",
    email: "principal@snscahs.org",
    website: "https://main.snsgroups.com/",
  },
  AHS018: {
    phone: "+91 73391 98999",
    email: "principal.ahs@shanmugha.edu.in",
  },
  AHS019: {
    phone: "0452-7114270",
    email: "vcahs@velammalmedicalcollege.edu.in",
  },
  AHS020: {
    phone: "+91 77084 41116",
    email: "cheran.allied@cherancolleges.org",
  },
  PHY015: {
    phone: "+91 77084 41116",
    email: "cheran.physiotherapy@cherancolleges.org",
  },
  ART071: {
    phone: "+91 90036 55855",
    email: "principal@drsnsrcas.ac.in",
    website: "https://drsnsrcas.ac.in/",
  },
  PHY017: {
    phone: "+91 4283 359999",
    email: "info@shanmugha.edu.in",
  },
  AGR015: {
    phone: "04188 299013",
    email: "deanagrithm@tnau.ac.in",
  },
  AGR016: {
    phone: "04630-290762",
    email: "deanagrikkm@tnau.ac.in",
  },
  AGR017: {
    phone: "0431-2690162",
    email: "deanagritry@tnau.ac.in",
  },
  LAW014: {
    phone: "+91 9849000331",
    email: "deanlaw@sathyabama.ac.in",
  },
  LAW015: {
    phone: "044-3993-1555",
    email: "admissions.chennai@vit.ac.in",
  },

  ENG094: {
    phone: "0422-2605577",
    email: "principal@srit.org",
    website: "https://www.srit.org/",
  },
  ENG096: {
    phone: "0422-2666264",
    email: "snsce@snsgroups.com",
    website: "https://snsce.ac.in/",
  },
  ENG097: {
    phone: "0422-2970703",
    email: "info@cietcbe.edu.in",
    website: "https://www.cietcbe.edu.in",
  },
  ENG098: {
    phone: "0422-2369900",
    email: "principal@siet.ac.in",
    website: "https://www.siet.ac.in/",
  },
  ENG099: {
    phone: "04259-242570",
    email: "info@acetcbe.edu.in",
  },
  ENG100: {
    phone: "0422-2984002",
    email: "deancoimbatore@annauniv.edu",
  },
  ENG101: {
    phone: "04259-200200",
    email: "info@actechnology.in",
    website: "https://www.actechnology.in/",
  },
  ENG102: {
    phone: "0422-2654495",
    email: "acetcoimbatore@gmail.com",
    website: "https://acetcbe.in/",
  },
  ENG103: {
    phone: "0422-2636050",
    email: "info.cmscet@cmscollege.edu.in",
    website: "https://cmscollege.edu.in/cet/",
  },
  ENG104: {
    phone: "+91-9445008362",
    email: "contact@ckec.ac.in",
    website: "https://www.ckec.ac.in/",
  },
  ENG105: {
    phone: "0422-7179000",
    email: "info@dait.edu.in",
  },
  ENG106: {
    phone: "0422-2635422",
    email: "dsceprincipalcbe@gmail.com",
  },
  ENG107: {
    phone: "0422-2656888",
    email: "easacollege@gmail.com",
    website: "https://www.easacollege.com",
  },
  ENG108: {
    phone: "0422-4242424",
    email: "hitprincipal@hindusthan.net",
    website: "https://www.hit.edu.in",
  },
  ENG109: {
    phone: "0421-2269401",
    email: "info@jit.ac.in",
    website: "https://www.jit.ac.in",
  },
  ENG110: {
    phone: "0422-2636900",
    email: "info@jct.ac.in",
    website: "https://jct.ac.in/",
  },
  ENG111: {
    phone: "0422-2635600",
    email: "info@karpagamtech.ac.in",
    website: "https://karpagamtech.ac.in/",
  },
  ENG112: {
    phone: "0422-2367890",
    email: "kitprincipal@kitcbe.com",
    website: "https://www.kitcbe.com",
  },
  ENG113: {
    phone: "0422-2622007",
    email: "nietprincipal@nehrucolleges.com",
  },
  ENG114: {
    phone: "0422-2656671",
    email: "nit@nehrucolleges.com",
    website: "https://www.nitcbe.ac.in",
  },
  ENG115: {
    phone: "04259-221387",
    email: "pacetcoimbatore@gmail.com",
  },
  ENG116: {
    phone: "0421-2911100",
    email: "info@pcet.ac.in",
    website: "https://www.pcet.ac.in",
  },
  ENG117: {
    phone: "0421-2910200",
    email: "pctprincipal@park.ac.in",
    website: "https://www.pct.ac.in/",
  },
  ENG118: {
    phone: "04259-266966",
    email: "principal@pietech.edu.in",
    website: "http://www.pietech.edu.in/",
  },
  ENG119: {
    phone: "0422-2252525",
    email: "ppgit@ppg.edu.in",
  },
  ENG120: {
    phone: "0422-2681123",
    email: "rvsetgi@rvsgroup.com",
    website: "https://www.rvstcc.ac.in/",
  },
  ENG121: {
    phone: "+91-9244504444",
    email: "ceo@sreesakthi.edu.in",
    website: "https://www.sreesakthi.edu.in/",
  },
  ENG122: {
    phone: "0422-2698941",
    email: "sriet@sriet.edu.in",
  },
  ENG123: {
    phone: "04259-200300",
    email: "principal@ssrec.in",
  },
  ENG124: {
    phone: "0422-2636250",
    email: "info@swech.edu.in",
  },
  ENG126: {
    phone: "0421-2332577",
    email: "tncecbe@gmail.com",
    website: "https://www.tnce.in/",
  },
  ENG127: {
    phone: "0422-2692020",
    email: "info@uit.ac.in",
    website: "https://uit.ac.in/",
  },
  ENG145: {
    phone: "0427-2240106",
    email: "iiht.slm-tn@nic.in",
    website: "http://www.iihtsalem.edu.in",
  },
  ENG182: {
    phone: "044-27277322",
    email: "aucek.principal@gmail.com",
    website: "http://www.aucek.in",
  },
  ENG202: {
    phone: "0461-2310044",
    email: "ucevoc_principal@yahoo.co.in",
    website: "http://www.ucevoc.edu.in",
  },
  ENG209: {
    phone: "04173-244400",
    email: "aucearni@gmail.com",
    website: "http://aucearni.edu.in",
  },
  ENG211: {
    phone: "0421-2332466",
    email: "mec@maharaja.in",
    website: "http://www.maharaja.in/",
  },
  ENG268: {
    phone: "04142-243222",
    email: "aucepanruti@gmail.com",
    website: "http://www.aucepanruti.org",
  },
  ENG271: {
    phone: "04373-293301",
    email: "auptk2009@gmail.com",
    website: "http://www.auptk.edu.in",
  },
  ENG272: {
    phone: "04652-260511",
    email: "aucenprincipal@gmail.com",
    website: "https://aucen.ac.in",
  },
  ENG279: {
    phone: "0462-2552450",
    email: "principal@gcetly.ac.in",
    website: "https://gcetly.ac.in",
  },
  ENG280: {
    phone: "04362-221113",
    email: "principal@gcetj.edu.in",
    website: "https://gcetj.edu.in",
  },
  ENG283: {
    phone: "04324-290660",
    email: "principalgcekarur@gmail.com",
    website: "https://gcekarur.ac.in",
  },
  ENG284: {
    phone: "04567-260262",
    email: "aucernd@gmail.com",
    website: "http://www.auceramnad.edu.in",
  },
  ENG285: {
    phone: "04565-224528",
    email: "accet.principal@gmail.com",
    website: "http://www.accetedu.in",
  },
  ENG326: {
    phone: "04146-224500",
    email: "aucev_principal@yahoo.com",
    website: "https://www.aucev.edu.in/",
  },
  ENG335: {
    phone: "044-22359100",
    email: "deanact@annauniv.edu",
    website: "https://act.annauniv.edu",
  },
};

Object.entries(collegeContactData).forEach(([id, details]) => {
  const college = collegesData.find((item) => item.id === id);
  if (college) Object.assign(college, details);
});

/* =========================================================
   COLLEGE LIST
========================================================= */

const placeLabel = (location) =>
  !location || location === "Tamil Nadu" ? "Tamil Nadu" : `${location}, Tamil Nadu`;

function CollegeList({ colleges, onSelect, search, setSearch }) {
  const [activeCategory, setActiveCategory] = useState("All Colleges");
  const [locationFilter, setLocationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesCategory =
        activeCategory === "All Colleges" ||
        college.category === activeCategory;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        query === "" ||
        [
          college.name,
          college.short,
          college.id,
          college.location,
          college.category,
          college.type,
          college.affiliation,
          college.ownership,
        ].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(query),
        );

      const matchesLocation =
        locationFilter === "All" || college.location === locationFilter;

      const matchesStatus =
        statusFilter === "All" || college.status === statusFilter;

      return (
        matchesCategory && matchesSearch && matchesLocation && matchesStatus
      );
    });
  }, [colleges, activeCategory, search, locationFilter, statusFilter]);

  const locationOptions = useMemo(
    () => [...new Set(colleges.map((college) => college.location))].sort(),
    [colleges],
  );

  const total = colleges.length;
  const verified = colleges.filter(
    (college) => college.status === "Verified",
  ).length;
  const pending = colleges.filter(
    (college) => college.status === "Pending",
  ).length;
  const suspended = colleges.filter(
    (college) => college.status === "Suspended",
  ).length;

  const resetFilters = () => {
    setActiveCategory("All Colleges");
    setSearch("");
    setLocationFilter("All");
    setStatusFilter("All");
  };

  return (
    <div className="college-page">
      <div className="college-page-heading">
        <div>
          <h2>College Management</h2>
          <p>Manage registered colleges, courses, fees and status</p>
        </div>
      </div>

      {/* CATEGORY TABS */}

      <div className="college-tabs">
        {[
          "All Colleges",
          "Engineering",
          "Arts & Science",
          "Medical",
          "Nursing",
          "Allied Health",
          "Physiotherapy",
          "Agriculture",
          "Law",
        ].map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FILTER */}

      <div className="college-filter">
        <div className="college-search">
          <span>🔍</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search colleges..."
          />
        </div>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="All">Location</option>
          {locationOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button className="reset-button" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* STATS */}

      <div className="college-stats">
        <div className="college-stat-card">
          <span className="stat-icon blue">🏫</span>
          <div>
            <small>Total Colleges</small>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="college-stat-card">
          <span className="stat-icon green">✓</span>
          <div>
            <small>Verified Colleges</small>
            <strong>{verified}</strong>
          </div>
        </div>

        <div className="college-stat-card">
          <span className="stat-icon orange">◷</span>
          <div>
            <small>Pending Colleges</small>
            <strong>{pending}</strong>
          </div>
        </div>

        <div className="college-stat-card">
          <span className="stat-icon red">!</span>
          <div>
            <small>Suspended Colleges</small>
            <strong>{suspended}</strong>
          </div>
        </div>
      </div>

      {/* REGISTERED COLLEGES */}

      <div className="registered-heading">
        <div>
          <h3>REGISTERED COLLEGES</h3>
          <p>All colleges registered on the platform</p>
        </div>

        <span>{filteredColleges.length} colleges</span>
      </div>

      <div className="college-grid">
        {filteredColleges.map((college) => (
          <CollegeCard key={college.id} college={college} onSelect={onSelect} />
        ))}
      </div>

      {filteredColleges.length === 0 && (
        <div className="empty-colleges">
          <div>🏫</div>
          <h3>No colleges found</h3>
          <p>Try another search or filter.</p>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   COLLEGE CARD
========================================================= */

function CollegeCard({ college, onSelect }) {
  return (
    <div className="college-card">
      <div className="college-card-top">
        <div className="college-short">{college.short}</div>

        <span
          className={`college-status ${
            college.status === "Verified"
              ? "verified"
              : college.status === "Pending"
                ? "pending"
                : "suspended"
          }`}
        >
          {college.status === "Verified" ? "✓" : "●"} {college.status}
        </span>
      </div>

      <span className="college-category">{college.category}</span>

      <h3>{college.name}</h3>

      <div className="college-location">📍 {placeLabel(college.location)}</div>

      <div className="college-info-row">
        <span>Type</span>
        <strong>{college.type}</strong>
      </div>

      <div className="college-info-row">
        <span>Affiliation</span>
        <strong>{college.affiliation}</strong>
      </div>

      <div className="college-info-row">
        <span>Established</span>
        <strong>{college.established}</strong>
      </div>

      <button className="view-details-button" onClick={() => onSelect(college)}>
        View Details →
      </button>
    </div>
  );
}

/* =========================================================
   COLLEGE DETAILS
========================================================= */

function CollegeDetails({ college, onBack, onUpdate }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [notice, setNotice] = useState("");

  const showNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 3500);
  };

  const openEdit = () => {
    setEditForm({
      short: college.short || "",
      name: college.name || "",
      location: college.location || "",
      type: college.type || "",
      ownership: college.ownership || "",
      grade: college.grade || "",
      affiliation: college.affiliation || "",
      established: college.established || "",
      phone: college.phone || "",
      email: college.email || "",
      website: college.website || "",
      address: college.address || "",
      about: college.about || "",
    });
    setEditOpen(true);
  };

  const saveEdit = () => {
    if (!String(editForm.name).trim()) {
      showNotice("College name cannot be empty.");
      return;
    }
    const cleaned = {};
    Object.keys(editForm).forEach((key) => {
      cleaned[key] = String(editForm[key]).trim();
    });
    onUpdate(college.id, cleaned);
    setEditOpen(false);
    showNotice("✓ College details updated successfully.");
  };

  const changeStatus = (status, question, doneMessage) => {
    if (college.status === status) return;
    if (!window.confirm(question)) return;
    onUpdate(college.id, { status });
    showNotice(doneMessage);
  };

  const sectionItems = [
    ["overview", "▣", "Overview"],
    ["courses", "▤", "Courses"],
    ["facilities", "▦", "Facilities"],
    ["placement", "💼", "Placement"],
    ["admission", "📝", "Admission"],
    ["contact", "☎", "Contact"],
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);

    setTimeout(() => {
      document.getElementById(`college-${id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <div className="college-details-page">
      <button className="back-colleges" onClick={onBack}>
        ← Back to Colleges
      </button>

      {/* COLLEGE HEADER */}

      <div className="college-detail-header">
        <div className="detail-logo">{college.short}</div>

        <div className="detail-header-content">
          <div className="detail-title-row">
            <div>
              <span className="detail-category">{college.category}</span>

              <h1>{college.name}</h1>

              <p>📍 {placeLabel(college.location)}</p>

              {college.website && college.website.startsWith("http") && (
                <a
                  className="detail-official-link"
                  href={college.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  🌐 Official Website:{" "}
                  {college.website
                    .replace(/^https?:\/\//, "")
                    .replace(/\/$/, "")}{" "}
                  ↗
                </a>
              )}
            </div>

            <span
              className={`detail-status ${
                college.status === "Verified"
                  ? "verified"
                  : college.status === "Pending"
                    ? "pending"
                    : "suspended"
              }`}
            >
              {college.status === "Verified" ? "✓" : "●"}{" "}
              {college.status.toUpperCase()}
            </span>
          </div>

          <div className="detail-tags">
            <span>{college.type}</span>
            <span>{college.ownership}</span>
            <span>{college.grade} Grade</span>
            <span>{college.affiliation}</span>
            <span>Est. {college.established}</span>
          </div>
        </div>
      </div>

      {/* DETAILS BODY */}

      <div className="detail-layout">
        {/* INTERNAL NAV */}

        <aside className="detail-side-nav">
          <p>COLLEGE DETAILS</p>

          {sectionItems.map(([id, icon, label]) => (
            <button
              key={id}
              className={activeSection === id ? "active" : ""}
              onClick={() => scrollToSection(id)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </aside>

        {/* CONTENT */}

        <div className="detail-content">
          {/* OVERVIEW */}

          <section id="college-overview" className="detail-section">
            <SectionTitle title="COLLEGE INFORMATION" />

            <div className="info-table">
              <InfoItem label="College Name" value={college.name} />
              <InfoItem
                label="Location"
                value={placeLabel(college.location)}
              />
              <InfoItem label="Established Year" value={college.established} />
              <InfoItem label="College Type" value={college.type} />
              <InfoItem label="Ownership" value={college.ownership} />
              <InfoItem label="College Grade" value={college.grade} />
              <InfoItem label="Affiliation" value={college.affiliation} />
              <InfoItem label="Accreditation" value={college.accreditation} />
              <InfoItem label="Website" value={college.website} />
              <InfoItem label="State" value="Tamil Nadu" />
            </div>

            <div className="description-box">
              <h4>About College</h4>
              <p>{college.about || college.description}</p>
            </div>
          </section>

          {/* COURSES */}

          <section id="college-courses" className="detail-section">
            <SectionTitle title="COURSES OFFERED" />

            <div className="course-detail-grid">
              {(Array.isArray(college.courses)
                ? college.courses
                : Object.keys(college.courses || {})).map((course, index) => (
                <div className="course-detail-card" key={index}>
                  <div className="course-icon">📚</div>

                  <div>
                    <h4>{course}</h4>
                    <p>Duration: College / Course Specific</p>
                    <span>Annual Fee: {getCourseFee(college, course)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FACILITIES */}

          <section id="college-facilities" className="detail-section">
            <SectionTitle title="FACILITIES" />

            <div className="facility-grid">
              {college.facilities.map((facility, index) => (
                <div className="facility-card" key={index}>
                  <span>
                    {
                      ["🏠", "📚", "🧪", "🚌", "⚽", "🍴", "💻", "🏥"][
                        index % 8
                      ]
                    }
                  </span>

                  <strong>{facility}</strong>
                </div>
              ))}
            </div>
          </section>

          {/* PLACEMENT */}

          <section id="college-placement" className="detail-section">
            <SectionTitle title="PLACEMENT" />

            <div className="placement-summary">
              <div>
                <small>Placement Available</small>
                <strong>✓ {college.placementAvailable}</strong>
              </div>

              <div>
                <small>Average Package</small>
                <strong>{college.averagePackage}</strong>
              </div>

              <div>
                <small>Highest Package</small>
                <strong>{college.highestPackage}</strong>
              </div>

              <div>
                <small>Students Placed</small>
                <strong>{college.studentsPlaced}</strong>
              </div>
            </div>

            <h3 className="placement-company-heading">
              TOP RECRUITING COMPANIES
            </h3>

            <div className="company-table-wrapper">
              <table className="company-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Hiring For</th>
                    <th>Job Roles</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {college.companies.map((company, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{company.company}</strong>
                      </td>

                      <td>{company.industry}</td>

                      <td>{company.hiringFor}</td>

                      <td>{company.roles}</td>

                      <td>
                        <span className="company-active">
                          ✓ {company.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ADMISSION */}

          <section id="college-admission" className="detail-section">
            <SectionTitle title="ADMISSION" />

            <div className="admission-grid">
              <div className="admission-card">
                <h4>Admission Process</h4>
                <p>{college.admission}</p>
              </div>

              <div className="admission-card">
                <h4>Eligibility</h4>
                <p>{college.eligibility}</p>
              </div>

              <div className="admission-card">
                <h4>Required Documents</h4>
                <ul>
                  <li>10th Mark Sheet</li>
                  <li>12th Mark Sheet</li>
                  <li>Transfer Certificate</li>
                  <li>Community Certificate</li>
                  <li>Government ID</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CONTACT */}

          <section id="college-contact" className="detail-section">
            <SectionTitle title="CONTACT & LOCATION" />

            <div className="contact-grid">
              <div>
                <span>📍</span>
                <div>
                  <small>Address</small>
                  <strong>
                    {college.address || placeLabel(college.location)}
                  </strong>
                </div>
              </div>

              <div>
                <span>☎</span>
                <div>
                  <small>Phone</small>
                  <strong>
                    {college.phone || "Official contact available on website"}
                  </strong>
                </div>
              </div>

              <div>
                <span>✉</span>
                <div>
                  <small>Email</small>
                  <strong>
                    {college.email || "Official email available on website"}
                  </strong>
                </div>
              </div>

              <div>
                <span>🌐</span>
                <div>
                  <small>Website</small>
                  <strong>
                    {college.website && college.website.startsWith("http") ? (
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {college.website}
                      </a>
                    ) : (
                      "Official website available on request"
                    )}
                  </strong>
                </div>
              </div>
            </div>

            {college.website && college.website.startsWith("http") && (
              <a
                className="visit-website-button"
                href={college.website}
                target="_blank"
                rel="noreferrer"
              >
                🌐 Visit Official Website ↗
              </a>
            )}
          </section>

          {/* ADMIN ACTION */}

          <section className="admin-actions-section">
            <h3>ADMIN ACTIONS</h3>

            <div className="admin-actions">
              <button className="edit" onClick={openEdit}>
                ✏ Edit College
              </button>

              <button
                className="verify"
                onClick={() =>
                  college.status === "Verified"
                    ? changeStatus(
                        "Pending",
                        `Remove verification for ${college.name}?`,
                        "● Verification removed. College is now Pending.",
                      )
                    : changeStatus(
                        "Verified",
                        `Verify ${college.name}?`,
                        "✓ College verified successfully.",
                      )
                }
              >
                ✓{" "}
                {college.status === "Verified" ? "Verified" : "Verify College"}
              </button>

              <button
                className="suspend"
                disabled={college.status === "Suspended"}
                onClick={() =>
                  changeStatus(
                    "Suspended",
                    `Suspend ${college.name}?`,
                    "⏸ College suspended.",
                  )
                }
              >
                ⏸{" "}
                {college.status === "Suspended"
                  ? "Suspended"
                  : "Suspend College"}
              </button>

              <button
                className="reject"
                disabled={college.status === "Rejected"}
                onClick={() =>
                  changeStatus(
                    "Rejected",
                    `Reject ${college.name}?`,
                    "✕ College rejected.",
                  )
                }
              >
                ✕{" "}
                {college.status === "Rejected" ? "Rejected" : "Reject College"}
              </button>
            </div>

            {notice && <div className="admin-notice">{notice}</div>}
          </section>
        </div>
      </div>

      {editOpen && (
        <div className="edit-overlay" onClick={() => setEditOpen(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-head">
              <h3>Edit College</h3>
              <button onClick={() => setEditOpen(false)}>✕</button>
            </div>

            <div className="edit-modal-body">
              {[
                ["name", "College Name", "full"],
                ["short", "Short Name"],
                ["location", "Location"],
                ["type", "Type"],
                ["ownership", "Ownership"],
                ["grade", "Grade"],
                ["affiliation", "Affiliation"],
                ["established", "Established"],
                ["phone", "Phone"],
                ["email", "Email"],
                ["website", "Website", "full"],
                ["address", "Address", "full"],
              ].map(([key, label, size]) => (
                <label
                  key={key}
                  className={size === "full" ? "edit-field full" : "edit-field"}
                >
                  <span>{label}</span>
                  <input
                    value={editForm[key] || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, [key]: e.target.value })
                    }
                  />
                </label>
              ))}

              <label className="edit-field full">
                <span>About</span>
                <textarea
                  rows={4}
                  value={editForm.about || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, about: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="edit-modal-actions">
              <button className="cancel" onClick={() => setEditOpen(false)}>
                Cancel
              </button>
              <button className="save" onClick={saveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionTitle({ title }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FeeItem({ label, value }) {
  return (
    <div className="fee-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CollegeManagement() {
  const [colleges, setColleges] = useState(collegesData);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  const selectedCollege =
    colleges.find((college) => college.id === selectedId) || null;

  const setSelectedCollege = (college) =>
    setSelectedId(college ? college.id : null);

  const updateCollege = (id, patch) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.id === id ? { ...college, ...patch } : college,
      ),
    );
  };

  const navigate = useNavigate();

  // Typing in the top search bar always shows the college list results
  const handleSearchChange = (value) => {
    setSearch(value);
    setSelectedCollege(null);
  };

  return (
    <>
      <style>{collegeStyles}</style>

      <div className="college-admin-app">
        <AdminSidebar onCollegesClick={() => setSelectedCollege(null)} />

        <div className="college-main">
          <TopBar search={search} onSearchChange={handleSearchChange} />

          <main>
            {selectedCollege ? (
              <CollegeDetails
                college={selectedCollege}
                onBack={() => setSelectedCollege(null)}
                onUpdate={updateCollege}
              />
            ) : (
              <CollegeList
                colleges={colleges}
                onSelect={setSelectedCollege}
                search={search}
                setSearch={setSearch}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CSS
========================================================= */

const collegeStyles = String.raw`

* {
  box-sizing: border-box;
}

/* Full-width reset (removes centered/narrow wrapper from default Vite styles) */
html,
body,
#root {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: left !important;
  border: 0 !important;
}

body {
  display: block !important;
  place-items: initial !important;
  min-width: 0 !important;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Inter, Arial, Helvetica, sans-serif;
  background: #f5f8fc;
  color: #17375f;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

/* =========================================================
   MAIN APP
========================================================= */

.college-admin-app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: #f5f8fc;
}

.college-main {
  min-width: 0;
  flex: 1 1 auto;
  width: calc(100% - 230px);
  margin-left: 230px;
  overflow-x: hidden;
}

/* =========================================================
   SIDEBAR
========================================================= */

.college-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 228px;
  background: linear-gradient(180deg, #102f55 0%, #102b4d 100%);
  color: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
}

.college-brand {
  height: 82px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255,255,255,.08);
}

.brand-icon {
  width: 39px;
  height: 39px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.1);
  font-size: 22px;
}

.college-brand h1 {
  margin: 0;
  color: white;
  font-family: Inter, Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.2;
}

.college-brand h1 span {
  color: #62a8ff;
}

.college-brand p {
  margin: 4px 0 0;
  color: #9fb2ca;
  font-size: 9.5px;
}

.sidebar-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 28px 12px 18px 4px;
    scrollbar-width: none;
}

.menu-title {
  margin: 0 10px 11px;
  color: #7e96b3;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .8px;
  text-align: center;
}

.college-sidebar-item {
  width: 100%;
  min-height: 43px;
  border: 0;
  background: transparent;
  color: #b8c9dc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 13px;
  margin-bottom: 4px;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  transition: .2s;
}

.college-sidebar-item:hover {
  background: rgba(255,255,255,.07);
  color: white;
}

.college-sidebar-item.active {
  background: #287fe8;
  color: white;
  box-shadow: 0 5px 14px rgba(25,107,211,.2);
}

.sidebar-icon {
  width: 20px;
  text-align: center;
  font-size: 14px;
}

.lead-star {
  margin-left: auto;
  color: #ffd24a;
  font-size: 10px;
}

.sidebar-bottom {
  flex-shrink: 0;
  padding: 16px 6px 8px;
  border-top: 1px solid rgba(255,255,255,.08);
}

.sidebar-admin-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 12px;
  margin-bottom: 9px;
  background: rgba(255,255,255,.07);
  border-radius: 10px;
}

.sidebar-admin-card > div:last-child {
  text-align: center;
}

.sidebar-avatar,
.top-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #2d5c9a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
}

.sidebar-admin-card strong {
  display: block;
  color: white;
  font-size: 12px;
}

.sidebar-admin-card span {
  display: block;
  color: #8da4be;
  font-size: 9px;
  margin-top: 5px;
}

.logout-button {
  width: 100%;
  height: 36px;
  border: 0;
  background: transparent;
  color: #bdccdd;
  border-radius: 7px;
  text-align: center;
  padding: 0 12px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
}

.logout-button:hover {
  background: rgba(255,255,255,.08);
  color: white;
}
/* =========================================================
   TOP BAR
========================================================= */

.college-topbar {
  width: 100%;
  height: 64px;
  background: white;
  border-bottom: 1px solid #e5ebf2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  position: sticky;
  top: 0;
  z-index: 50;
  font-family: Arial, Helvetica, sans-serif;
}

.global-search {
  width: 300px;
  height: 38px;
  background: #f4f7fb;
  border: 1px solid #edf1f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  gap: 10px;
}

.global-search span {
  font-size: 12px;
  color: #8fa0b5;
}

.global-search input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent !important;
  color: #29496e;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}

.global-search input::placeholder {
  color: #91a0b5;
}

.top-admin {
  display: flex;
  align-items: center;
  gap: 18px;
}

.notification-button {
  position: relative;
  border: 0;
  background: transparent;
  color: #17375f;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding: 4px 8px;
}

.notification-dot {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f0454d;
}

.top-admin-profile {
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #62758e;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 9px;
}

.top-avatar {
  width: 32px;
  height: 32px;
  background: #17407a;
  font-size: 13px;
}

.top-admin-text {
  text-align: center;
}

.top-admin-text strong {
  display: block;
  color: #244363;
  font-size: 12px;
  line-height: 1.2;
}

.top-admin-text small {
  display: block;
  color: #8a9bb0;
  font-size: 9px;
  line-height: 1.2;
  margin-top: 3px;
}

/* =========================================================
   PAGE
========================================================= */


.college-page,
.college-details-page {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 32px 32px 55px;
  overflow-x: hidden;
}

.college-page-heading {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
}

.college-page-heading h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  line-height: 1.2;
  color: #17375f;
  letter-spacing: -0.08em;
}

.college-page-heading p {
  margin: 8px 0 0;
  color: #8091a8;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13.5px;
}

/* =========================================================
   TABS
========================================================= */

.college-tabs {
  display: flex;
  gap: 7px;
  margin-bottom: 16px;
  overflow-x: auto;
}

.college-tabs button {
  border: 1px solid #dfe7f0;
  background: white;
  color: #60748e;
  border-radius: 8px;
  padding: 10px 17px;
  font-size: 13px;
  white-space: nowrap;
}

.college-tabs button.active {
  background: #247de8;
  border-color: #247de8;
  color: white;
  box-shadow: 0 5px 14px rgba(36,125,232,.16);
}

/* =========================================================
   FILTER
========================================================= */

.college-filter {
  background: white;
  border: 1px solid #e2e9f1;
  border-radius: 10px;
  padding: 14px;
  display: grid;
  grid-template-columns: minmax(250px, 1fr) 190px 190px 100px;
  gap: 9px;
  margin-bottom: 17px;
}

.college-search {
  height: 46px;
  border: 1px solid #e1e8f0;
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding: 0 11px;
  gap: 8px;
}

.college-search input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent !important;
  color: #29496e !important;
  -webkit-text-fill-color: #29496e;
  caret-color: #29496e;
  font-size: 13px;
  color: #29496e;
}

.college-filter select,
.reset-button {
  height: 46px;
  border: 1px solid #e1e8f0;
  border-radius: 7px;
  background: white;
  color: #60748e;
  padding: 0 10px;
  font-size: 13px;
}

.reset-button:hover {
  background: #f1f6fc;
}

/* =========================================================
   STATS
========================================================= */

.college-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 25px;
}

.college-stat-card {
  background: white;
  border: 1px solid #e3eaf2;
  border-radius: 10px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.stat-icon {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.stat-icon.blue {
  background: #e9f2ff;
  color: #247de8;
}

.stat-icon.green {
  background: #e6f8f0;
  color: #13aa72;
}

.stat-icon.orange {
  background: #fff3df;
  color: #e9a329;
}

.stat-icon.red {
  background: #ffe9eb;
  color: #e75a65;
}

.college-stat-card small {
  display: block;
  color: #8495aa;
  font-size: 12px;
}

.college-stat-card strong {
  display: block;
  color: #25486d;
  font-size: 28px;
  margin-top: 3px;
}

/* =========================================================
   REGISTERED
========================================================= */

.registered-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 13px;
}

.registered-heading h3 {
  margin: 0;
  color: #244668;
  font-size: 16px;
}

.registered-heading p {
  margin: 5px 0 0;
  color: #91a0b3;
  font-size: 13px;
}

.registered-heading > span {
  color: #72869e;
  font-size: 13px;
}

/* =========================================================
   COLLEGE GRID
========================================================= */

.college-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.college-card {
  background: white;
  border: 1px solid #e2e9f1;
  border-radius: 11px;
  padding: 17px;
  transition: .2s;
  min-width: 0;
}

.college-card:hover {
  transform: translateY(-2px);
  border-color: #c8dcf5;
  box-shadow: 0 9px 25px rgba(31,75,120,.08);
}

.college-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.college-short {
  width: 39px;
  height: 39px;
  border-radius: 9px;
  background: #edf5ff;
  color: #247de8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 13px;
}

.college-status {
  border-radius: 20px;
  padding: 5px 8px;
  font-size: 11px;
  font-weight: 800;
}

.college-status.verified {
  background: #e6f8f0;
  color: #13a96e;
}

.college-status.pending {
  background: #fff4df;
  color: #d99a21;
}

.college-status.suspended {
  background: #ffe8ea;
  color: #df5561;
}

.college-category {
  display: inline-block;
  margin-top: 11px;
  color: #287ce0;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.college-card h3 {
  color: #27496c;
  font-size: 16px;
  line-height: 1.35;
  min-height: 38px;
  margin: 7px 0;
}

.college-location {
  color: #8092a8;
  font-size: 13px;
  margin-bottom: 12px;
}

.college-info-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-top: 1px solid #edf1f5;
  padding: 9px 0;
  font-size: 12px;
}

.college-info-row span {
  color: #91a0b2;
}

.college-info-row strong {
  color: #4f6885;
  text-align: right;
}

.view-details-button {
  width: 100%;
  height: 42px;
  border: 0;
  border-radius: 7px;
  background: #247de8;
  color: white;
  font-size: 13px;
  font-weight: 800;
  margin-top: 7px;
}

.view-details-button:hover {
  background: #176dce;
}

/* =========================================================
   EMPTY
========================================================= */

.empty-colleges {
  background: white;
  border: 1px solid #e2e9f1;
  border-radius: 10px;
  text-align: center;
  padding: 60px 20px;
}

.empty-colleges div {
  font-size: 35px;
}

.empty-colleges h3 {
  color: #29496e;
}

.empty-colleges p {
  color: #8a9bae;
  font-size: 14px;
}

/* =========================================================
   DETAILS HEADER
========================================================= */

.back-colleges {
  border: 0;
  background: transparent;
  color: #247de8;
  font-size: 13px;
  font-weight: 700;
  padding: 0;
  margin-bottom: 15px;
}

.college-detail-header {
  background: white;
  border: 1px solid #e0e8f1;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.detail-logo {
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  border-radius: 13px;
  background: linear-gradient(135deg,#247de8,#1457aa);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 900;
}

.detail-header-content {
  width: 100%;
  min-width: 0;
}

.detail-title-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.detail-category {
  color: #287de2;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.detail-title-row h1 {
  margin: 5px 0;
  color: #193b60;
  font-size: 26px;
}

.detail-title-row p {
  margin: 0;
  color: #8495a9;
  font-size: 13px;
}

.detail-status {
  height: fit-content;
  border-radius: 20px;
  padding: 7px 11px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.detail-status.verified {
  background: #e4f8ef;
  color: #12a56b;
}

.detail-status.pending {
  background: #fff2dc;
  color: #d79a25;
}

.detail-status.suspended {
  background: #ffe8ea;
  color: #df5661;
}

.detail-tags {
  display: flex;
  gap: 7px;
  margin-top: 11px;
  flex-wrap: wrap;
}

.detail-tags span {
  background: #f1f6fc;
  border: 1px solid #e0e9f3;
  color: #647991;
  border-radius: 5px;
  padding: 5px 8px;
  font-size: 11px;
}

/* =========================================================
   DETAIL LAYOUT
========================================================= */

.detail-layout {
  display: grid;
  grid-template-columns: 185px minmax(0, 1fr);
  gap: 15px;
  align-items: start;
}

.detail-side-nav {
  background: white;
  border: 1px solid #e0e8f1;
  border-radius: 10px;
  padding: 11px;
  position: sticky;
  top: 82px;
}

.detail-side-nav p {
  color: #91a0b2;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .8px;
  margin: 4px 8px 9px;
}

.detail-side-nav button {
  width: 100%;
  height: 37px;
  border: 0;
  background: transparent;
  color: #6e8199;
  border-radius: 7px;
  text-align: left;
  padding: 0 9px;
  display: flex;
  gap: 9px;
  align-items: center;
  font-size: 13px;
  margin-bottom: 3px;
}

.detail-side-nav button:hover {
  background: #f2f7fd;
  color: #247de8;
}

.detail-side-nav button.active {
  background: #eaf3ff;
  color: #247de8;
  font-weight: 800;
}

/* =========================================================
   DETAIL SECTION
========================================================= */

.detail-section {
  background: white;
  border: 1px solid #e0e8f1;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  scroll-margin-top: 85px;
}

.section-title {
  border-bottom: 1px solid #edf1f5;
  padding-bottom: 12px;
  margin-bottom: 15px;
}

.section-title h2 {
  margin: 0;
  color: #244768;
  font-size: 16px;
}

/* =========================================================
   INFO
========================================================= */

.info-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #e6edf4;
  border-radius: 8px;
  overflow: hidden;
}

.info-item {
  min-height: 49px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 9px 12px;
  border-bottom: 1px solid #edf1f5;
}

.info-item:nth-child(odd) {
  border-right: 1px solid #edf1f5;
}

.info-item span {
  color: #91a0b3;
  font-size: 12px;
}

.info-item strong {
  color: #4b6480;
  font-size: 13px;
  margin-top: 4px;
}

.description-box {
  margin-top: 14px;
  background: #f7faff;
  border: 1px solid #e6eef7;
  border-radius: 8px;
  padding: 13px;
}

.description-box h4 {
  margin: 0 0 6px;
  color: #294b70;
  font-size: 13px;
}

.description-box p {
  margin: 0;
  color: #74879e;
  font-size: 13px;
  line-height: 1.6;
}

/* =========================================================
   COURSES
========================================================= */

.course-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.course-detail-card {
  border: 1px solid #e5ebf2;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 10px;
}

.course-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #edf5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.course-detail-card h4 {
  margin: 0;
  color: #365573;
  font-size: 13px;
  line-height: 1.4;
}

.course-detail-card p {
  margin: 5px 0;
  color: #8a9bad;
  font-size: 11px;
}

.course-detail-card span {
  color: #287de1;
  font-size: 11px;
  font-weight: 700;
}

/* =========================================================
   FEES
========================================================= */

.fees-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #e5ebf2;
  border-radius: 8px;
  overflow: hidden;
}

.fee-item {
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 10px 13px;
  border-bottom: 1px solid #edf1f5;
}

.fee-item:nth-child(odd) {
  border-right: 1px solid #edf1f5;
}

.fee-item span {
  color: #8596aa;
  font-size: 12px;
}

.fee-item strong {
  color: #46617d;
  font-size: 12px;
  text-align: right;
}


/* =========================================================
   FACILITIES
========================================================= */

.facility-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.facility-card {
  min-height: 80px;
  border: 1px solid #e5ebf2;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.facility-card span {
  font-size: 22px;
}

.facility-card strong {
  color: #59708b;
  font-size: 12px;
  text-align: center;
}

/* =========================================================
   PLACEMENT
========================================================= */

.placement-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.placement-summary > div {
  background: #f7faff;
  border: 1px solid #e3ebf4;
  border-radius: 8px;
  padding: 13px;
}

.placement-summary small {
  display: block;
  color: #8999ac;
  font-size: 11px;
}

.placement-summary strong {
  display: block;
  color: #315574;
  font-size: 14px;
  margin-top: 7px;
}

.placement-company-heading {
  color: #385672;
  font-size: 14px;
  margin: 0 0 10px;
}

.company-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e3eaf2;
  border-radius: 8px;
}

.company-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
}

.company-table th {
  background: #f6f9fc;
  color: #8293a7;
  text-align: left;
  font-size: 11px;
  padding: 11px;
}

.company-table td {
  border-top: 1px solid #edf1f5;
  color: #647991;
  font-size: 12px;
  padding: 12px 11px;
  vertical-align: middle;
}

.company-table td strong {
  color: #385875;
}

.company-active {
  background: #e5f8ef;
  color: #12a76d;
  padding: 5px 7px;
  border-radius: 12px;
  font-size: 11px;
  white-space: nowrap;
}

/* =========================================================
   ADMISSION
========================================================= */

.admission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.admission-card {
  border: 1px solid #e4ebf2;
  border-radius: 8px;
  padding: 13px;
}

.admission-card h4 {
  color: #385875;
  margin: 0 0 8px;
  font-size: 13px;
}

.admission-card p {
  color: #74879d;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

.admission-card ul {
  margin: 0;
  padding-left: 16px;
  color: #74879d;
  font-size: 12px;
  line-height: 1.8;
}

/* =========================================================
   CONTACT
========================================================= */

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.contact-grid > div {
  border: 1px solid #e5ebf2;
  border-radius: 8px;
  padding: 13px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.contact-grid > div > span {
  font-size: 20px;
}

.contact-grid small {
  display: block;
  color: #8c9bad;
  font-size: 11px;
}

.contact-grid strong {
  display: block;
  color: #4d6681;
  font-size: 12px;
  margin-top: 4px;
}

/* =========================================================
   ADMIN ACTIONS
========================================================= */

.admin-actions-section {
  background: white;
  border: 1px solid #e0e8f1;
  border-radius: 10px;
  padding: 18px;
}

.admin-actions-section h3 {
  color: #385875;
  font-size: 14px;
  margin: 0 0 12px;
}

.admin-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 9px;
}

.admin-actions button {
  height: 39px;
  border: 0;
  border-radius: 7px;
  color: white;
  font-size: 12px;
  font-weight: 800;
}

.admin-actions .edit {
  background: #277ee7;
}

.admin-actions .verify {
  background: #18ae75;
}

.admin-actions .suspend {
  background: #eda72a;
}

.admin-actions .reject {
  background: #e75863;
}

/* =========================================================
   OFFICIAL WEBSITE LINKS
========================================================= */

.detail-official-link {
  display: inline-block;
  margin-top: 10px;
  padding: 7px 12px;
  border-radius: 7px;
  background: #eaf3ff;
  border: 1px solid #cfe2fb;
  color: #1f6fd6;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.detail-official-link:hover {
  background: #dcebff;
}

.contact-grid a {
  color: #247de8;
  text-decoration: none;
  word-break: break-all;
}

.contact-grid a:hover {
  text-decoration: underline;
}

.visit-website-button {
  display: inline-block;
  margin-top: 14px;
  padding: 11px 18px;
  border-radius: 8px;
  background: #247de8;
  color: white;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
}

.visit-website-button:hover {
  background: #176dce;
}



/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1100px) {

  .college-sidebar {
    width: 215px;
  }

  .college-main {
    margin-left: 215px;
    width: calc(100% - 215px);
  }

  .college-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .college-filter {
    grid-template-columns: 1fr 150px 150px;
  }

  .reset-button {
    width: 100%;
  }

  .college-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .detail-layout {
    grid-template-columns: 160px minmax(0,1fr);
  }

  .placement-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .facility-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 768px) {

  .college-admin-app {
    display: block;
  }

  .college-sidebar {
    position: fixed;
    left: -220px;
    width: 220px;
    transition: .25s;
  }

  .college-main {
    margin-left: 0;
    width: 100%;
  }

  .college-topbar {
    height: 60px;
    padding: 0 13px;
  }

  .global-search {
    width: 52%;
  }

  .global-search input {
    font-size: 12px;
  }

  .top-admin-text {
    display: none;
  }

  .college-page,
  .college-details-page {
    padding: 20px 13px 40px;
  }

  .college-page-heading h2 {
    font-size: 22px;
  }

  .college-tabs {
    padding-bottom: 3px;
  }

  .college-filter {
    grid-template-columns: 1fr;
  }

  .college-stats {
    grid-template-columns: 1fr 1fr;
  }

  .college-grid {
    grid-template-columns: 1fr;
  }

  .college-card h3 {
    min-height: auto;
  }

  .college-detail-header {
    padding: 14px;
  }

  .detail-title-row {
    flex-direction: column;
    gap: 9px;
  }

  .detail-title-row h1 {
    font-size: 20px;
  }

  .detail-layout {
    grid-template-columns: 1fr;
  }

  .detail-side-nav {
    position: sticky;
    top: 60px;
    z-index: 10;
    display: flex;
    overflow-x: auto;
    gap: 4px;
    padding: 8px;
  }

  .detail-side-nav p {
    display: none;
  }

  .detail-side-nav button {
    width: auto;
    flex-shrink: 0;
    white-space: nowrap;
    padding: 0 11px;
  }

  .info-table,
  .fees-grid {
    grid-template-columns: 1fr;
  }

  .info-item:nth-child(odd),
  .fee-item:nth-child(odd) {
    border-right: 0;
  }

  .course-detail-grid {
    grid-template-columns: 1fr;
  }

  .facility-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .placement-summary {
    grid-template-columns: 1fr 1fr;
  }

  .admission-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .admin-actions {
    grid-template-columns: 1fr 1fr;
  }
}

/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 480px) {

  .global-search {
    width: 48%;
  }

  .global-search span {
    font-size: 13px;
  }

  .global-search input::placeholder {
    font-size: 11px;
  }

  .college-stats {
    grid-template-columns: 1fr;
  }

  .college-stat-card {
    padding: 13px;
  }

  .college-detail-header {
    flex-direction: column;
  }

  .detail-logo {
    width: 55px;
    height: 55px;
  }

  .detail-tags span {
    font-size: 10px;
  }

  .detail-section {
    padding: 14px;
  }

  .facility-grid {
    grid-template-columns: 1fr 1fr;
  }

  .placement-summary {
    grid-template-columns: 1fr;
  }

  .admin-actions {
    grid-template-columns: 1fr;
  }

  .registered-heading {
    align-items: flex-start;
    gap: 8px;
    flex-direction: column;
  }
}


/* =========================================================
   ADMIN ACTIONS - RESPONSIVE FIX + EDIT MODAL
========================================================= */

.college-details-page,
.detail-content,
.admin-actions-section,
.detail-section {
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

.detail-content {
  min-width: 0;
}

.contact-grid strong,
.contact-grid a,
.info-item strong {
  overflow-wrap: anywhere;
  word-break: break-word;
}

.admin-actions button {
  min-width: 0;
  min-height: 42px;
  height: auto;
  padding: 8px 10px;
  white-space: normal;
  line-height: 1.25;
  cursor: pointer;
  transition: .2s;
}

.admin-actions button:hover:not(:disabled) {
  filter: brightness(.93);
}

.admin-actions button:disabled {
  opacity: .45;
  cursor: not-allowed;
}

.admin-notice {
  margin-top: 12px;
  padding: 10px 13px;
  border-radius: 8px;
  background: #eaf3ff;
  color: #1f6fd1;
  font-size: 12px;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.edit-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(20, 35, 55, .55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.edit-modal {
  width: 100%;
  max-width: 680px;
  max-height: 92vh;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .25);
}

.edit-modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 18px;
  border-bottom: 1px solid #edf1f5;
}

.edit-modal-head h3 {
  margin: 0;
  color: #244768;
  font-size: 16px;
}

.edit-modal-head button {
  border: 0;
  background: #f1f5f9;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  cursor: pointer;
  color: #5b708a;
}

.edit-modal-body {
  padding: 16px 18px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.edit-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.edit-field.full {
  grid-column: 1 / -1;
}

.edit-field span {
  color: #7d8fa5;
  font-size: 11px;
  font-weight: 800;
}

.edit-field input,
.edit-field textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dbe4ee;
  border-radius: 7px;
  padding: 9px 10px;
  font-size: 13px;
  font-family: inherit;
  color: #ffffff;
  background: #3a3a3a;
  caret-color: #ffffff;
  outline: 0;
  resize: vertical;
}

.edit-field input::placeholder,
.edit-field textarea::placeholder {
  color: #b5bcc6;
}

.edit-field input:focus,
.edit-field textarea:focus {
  border-color: #247de8;
}

.edit-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 13px 18px;
  border-top: 1px solid #edf1f5;
}

.edit-modal-actions button {
  height: 40px;
  padding: 0 18px;
  border-radius: 7px;
  border: 0;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.edit-modal-actions .cancel {
  background: #eef2f7;
  color: #5b708a;
}

.edit-modal-actions .save {
  background: #247de8;
  color: white;
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .admin-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 480px) {
  .admin-actions {
    grid-template-columns: minmax(0, 1fr);
  }

  .edit-modal-body {
    grid-template-columns: 1fr;
  }

  .edit-modal-actions button {
    flex: 1;
  }
}
`;