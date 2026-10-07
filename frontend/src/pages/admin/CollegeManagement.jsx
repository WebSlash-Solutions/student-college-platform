import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* =========================================================
   COLLEGE DATA
   10 ENGINEERING + 10 ARTS & SCIENCE + 10 MEDICAL
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

/* =========================================================
   HELPER
========================================================= */

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
    courses,
    facilities,
    companies,
    annualFee,
    managementFee: "College Specific",
    hostelFee: "College Specific",
    counsellingFee: "College Specific",
    otherFee: "College Specific",
    eligibility:
      category === "Medical"
        ? "Course-specific eligibility / NEET where applicable"
        : "12th completed / course-specific eligibility",
    admission:
      category === "Medical"
        ? "Counselling / Management / Applicable Admission Process"
        : "Counselling / Management / Applicable Admission Process",
    placementAvailable: "Yes",
    averagePackage: "College Specific",
    highestPackage: "College Specific",
    studentsPlaced: "College Specific",
    description:
      "College information shown in this admin module. Production values can be updated by the administrator.",
  };
}

/* =========================================================
   30 COLLEGES
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

function getCourseFee(college, course) {
  if (college.category === "Engineering") {
    return engineeringCourseFees[course] || college.annualFee;
  }
  if (college.category === "Arts & Science") {
    return artsCourseFees[course] || college.annualFee;
  }
  return medicalCourseFees[course] || college.annualFee;
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
];

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
};

Object.entries(collegeContactData).forEach(([id, details]) => {
  const college = collegesData.find((item) => item.id === id);
  if (college) Object.assign(college, details);
});

/* =========================================================
   COLLEGE LIST
========================================================= */

function CollegeList({ onSelect, search, setSearch }) {
  const [activeCategory, setActiveCategory] = useState("All Colleges");
  const [locationFilter, setLocationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredColleges = useMemo(() => {
    return collegesData.filter((college) => {
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
  }, [activeCategory, search, locationFilter, statusFilter]);

  const total = collegesData.length;
  const verified = collegesData.filter(
    (college) => college.status === "Verified",
  ).length;
  const pending = collegesData.filter(
    (college) => college.status === "Pending",
  ).length;
  const suspended = collegesData.filter(
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
        {["All Colleges", "Engineering", "Arts & Science", "Medical"].map(
          (category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ),
        )}
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
          <option value="Chennai">Chennai</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Vellore">Vellore</option>
          <option value="Madurai">Madurai</option>
          <option value="Tiruchirappalli">Tiruchirappalli</option>
          <option value="Salem">Salem</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
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

      <div className="college-location">📍 {college.location}, Tamil Nadu</div>

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

function CollegeDetails({ college, onBack }) {
  const [activeSection, setActiveSection] = useState("overview");

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

              <p>📍 {college.location}, Tamil Nadu</p>

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
                value={`${college.location}, Tamil Nadu`}
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
              {college.courses.map((course, index) => (
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
                    {college.address || `${college.location}, Tamil Nadu`}
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
              <button className="edit">✏ Edit College</button>
              <button className="verify">✓ Verify College</button>
              <button className="suspend">⏸ Suspend College</button>
              <button className="reject">✕ Reject College</button>
            </div>
          </section>
        </div>
      </div>
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
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [search, setSearch] = useState("");

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
              />
            ) : (
              <CollegeList
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

`;