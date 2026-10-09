import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "campusconnect_custom_colleges";
const EDITS_KEY = "campusconnect_college_edits";

const makeCollege = ({
  id,
  name,
  category,
  location,
  district,
  pincode = "",
  established = "Verify with institution",
  type = "Autonomous",
  affiliation = "Verify with institution",
  accreditation = "Verify with institution",
  ranking = "Not available",
  rankingLabel = "Recognition",
  counsellingCode,
  website = "",
  hostel = "Verify with institution",
  transportation = "Verify with institution",
  placement = "Verify with institution",
  counselling = "College Admission",
  courses = [],
  scholarships = [
    "Government scholarships",
    "Merit scholarships",
    "Institutional financial assistance",
  ],
  placements = [
    "Placement support",
    "Career guidance",
    "Industry interaction",
  ],
}) => ({
  id,
  name,
  category,
  location,
  district,
  pincode,
  established,
  type,
  affiliation,
  accreditation,
  ranking,
  rankingLabel,
  ...(category === "Engineering" ? { counsellingCode } : {}),
  website,
  hostel,
  transportation,
  placement,
  counselling,
  courses,
  scholarships,
  placements,
});

const collegeData = [
  {
    id: 1,
    name: "Indian Institute of Technology Madras",
    category: "Engineering",
    location: "Guindy, Chennai",
    district: "Chennai",
    pincode: "600036",
    established: "1959",
    type: "Government",
    affiliation: "IIT (Institute of National Importance)",
    counsellingCode: "Not applicable",
    website: "https://www.iitm.ac.in/",
    counselling: "JoSAA Counselling",
    courses: [["B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 2,
    name: "College of Engineering, Guindy (Anna University)",
    category: "Engineering",
    location: "Guindy, Chennai",
    district: "Chennai",
    pincode: "600025",
    established: "1794",
    type: "Government",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://ceg.annauniv.edu/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 3,
    name: "Madras Institute of Technology (Anna University)",
    category: "Engineering",
    location: "Chromepet, Chennai",
    district: "Chennai",
    pincode: "600044",
    established: "1949",
    type: "Government",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://mitindia.edu/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 4,
    name: "SSN College of Engineering",
    category: "Engineering",
    location: "Kalavakkam, Chennai",
    district: "Chennai",
    pincode: "603110",
    established: "1996",
    type: "Autonomous",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.ssn.edu.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 5,
    name: "SRM Institute of Science and Technology",
    category: "Engineering",
    location: "Kattankulathur, Chennai",
    district: "Chennai",
    pincode: "603203",
    established: "1985",
    type: "Deemed University",
    affiliation: "SRM Institute of Science and Technology",
    accreditation: "NAAC A++",
    counsellingCode: "Not applicable",
    website: "https://www.srmist.edu.in/",
    counselling: "University Admission",
    courses: [["B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 6,
    name: "VIT Chennai",
    category: "Engineering",
    location: "Vandalur\u2013Kelambakkam Road, Chennai",
    district: "Chennai",
    pincode: "600127",
    established: "2010",
    type: "Deemed University",
    affiliation: "Vellore Institute of Technology",
    counsellingCode: "Not applicable",
    website: "https://chennai.vit.ac.in/",
    counselling: "University Admission",
    courses: [["B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 7,
    name: "Sathyabama Institute of Science and Technology",
    category: "Engineering",
    location: "Jeppiaar Nagar, Chennai",
    district: "Chennai",
    pincode: "600119",
    established: "1987",
    type: "Deemed University",
    affiliation: "Sathyabama Institute of Science and Technology",
    accreditation: "NAAC A++",
    counsellingCode: "Not applicable",
    website: "https://www.sathyabama.ac.in/",
    counselling: "University Admission",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 8,
    name: "Saveetha Engineering College",
    category: "Engineering",
    location: "Thandalam, Chennai",
    district: "Chennai",
    pincode: "602105",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.saveetha.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 9,
    name: "Sri Sairam Engineering College",
    category: "Engineering",
    location: "West Tambaram, Chennai",
    district: "Chennai",
    pincode: "600044",
    established: "1995",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.sairam.edu.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 10,
    name: "Rajalakshmi Engineering College",
    category: "Engineering",
    location: "Thandalam, Chennai",
    district: "Chennai",
    pincode: "602105",
    established: "1997",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.rajalakshmi.org/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 11,
    name: "Panimalar Engineering College",
    category: "Engineering",
    location: "Poonamallee, Chennai",
    district: "Chennai",
    pincode: "600123",
    established: "2000",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.panimalar.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 12,
    name: "St. Joseph's College of Engineering",
    category: "Engineering",
    location: "OMR, Semmencherry, Chennai",
    district: "Chennai",
    pincode: "600119",
    established: "1994",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.stjosephs.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 13,
    name: "Easwari Engineering College",
    category: "Engineering",
    location: "Ramapuram, Chennai",
    district: "Chennai",
    pincode: "600089",
    established: "1996",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    website: "https://www.srmeaswari.ac.in/",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 14,
    name: "Hindustan Institute of Technology and Science",
    category: "Engineering",
    location: "Padur, Chennai",
    district: "Chennai",
    pincode: "603103",
    established: "1985",
    type: "Deemed University",
    affiliation: "Hindustan Institute of Technology and Science",
    counsellingCode: "Not applicable",
    website: "https://hindustanuniv.ac.in/",
    counselling: "University Admission",
    courses: [["B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 15,
    name: "Vels Institute of Science, Technology & Advanced Studies",
    category: "Engineering",
    location: "Pallavaram, Chennai",
    district: "Chennai",
    pincode: "600117",
    established: "1992",
    type: "Deemed University",
    affiliation: "VISTAS",
    counsellingCode: "Not applicable",
    website: "https://velsuniv.ac.in/",
    counselling: "University Admission",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 16,
    name: "Dr. M.G.R. Educational and Research Institute",
    category: "Engineering",
    location: "Maduravoyal, Chennai",
    district: "Chennai",
    pincode: "600095",
    established: "1988",
    type: "Deemed University",
    affiliation: "Dr. M.G.R. Educational and Research Institute",
    counsellingCode: "Not applicable",
    website: "https://drmgrdu.ac.in/",
    counselling: "University Admission",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 17,
    name: "Loyola College",
    category: "Arts & Science",
    location: "Nungambakkam, Chennai",
    district: "Chennai",
    pincode: "600034",
    established: "1925",
    type: "Autonomous",
    affiliation: "University of Madras",
    website: "https://www.loyolacollege.edu/",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 18,
    name: "Madras Christian College",
    category: "Arts & Science",
    location: "Tambaram, Chennai",
    district: "Chennai",
    pincode: "600059",
    established: "1837",
    type: "Autonomous",
    affiliation: "University of Madras",
    website: "https://www.mcc.edu.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 19,
    name: "Presidency College",
    category: "Arts & Science",
    location: "Chepauk, Chennai",
    district: "Chennai",
    pincode: "600005",
    established: "1840",
    type: "Government",
    affiliation: "University of Madras",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 20,
    name: "Stella Maris College",
    category: "Arts & Science",
    location: "Cathedral Road, Chennai",
    district: "Chennai",
    pincode: "600086",
    established: "1947",
    type: "Autonomous",
    affiliation: "University of Madras",
    website: "https://stellamariscollege.edu.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs (women)", "3 Years", "Verify with college"]],
  },
  {
    id: 21,
    name: "Ethiraj College for Women",
    category: "Arts & Science",
    location: "Egmore, Chennai",
    district: "Chennai",
    pincode: "600008",
    established: "1948",
    type: "Autonomous",
    affiliation: "University of Madras",
    website: "https://www.ethirajcollege.edu.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs (women)", "3 Years", "Verify with college"]],
  },
  {
    id: 22,
    name: "Women's Christian College",
    category: "Arts & Science",
    location: "College Road, Nungambakkam, Chennai",
    district: "Chennai",
    pincode: "600006",
    established: "1915",
    type: "Autonomous",
    affiliation: "University of Madras",
    website: "https://www.wcc.edu.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs (women)", "3 Years", "Verify with college"]],
  },
  {
    id: 23,
    name: "Queen Mary's College",
    category: "Arts & Science",
    location: "Marina, Chennai",
    district: "Chennai",
    pincode: "600004",
    established: "1914",
    type: "Government",
    affiliation: "University of Madras",
    counselling: "College Admission",
    courses: [["UG & PG programs (women)", "3 Years", "Verify with college"]],
  },
  {
    id: 24,
    name: "Pachaiyappa's College",
    category: "Arts & Science",
    location: "Chetpet, Chennai",
    district: "Chennai",
    pincode: "600030",
    established: "1842",
    type: "Government",
    affiliation: "University of Madras",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 25,
    name: "D.G. Vaishnav College",
    category: "Arts & Science",
    location: "Arumbakkam, Chennai",
    district: "Chennai",
    pincode: "600106",
    established: "1971",
    type: "Autonomous",
    affiliation: "University of Madras",
    website: "https://dgvaishnavcollege.edu.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 26,
    name: "Guru Nanak College",
    category: "Arts & Science",
    location: "Velachery, Chennai",
    district: "Chennai",
    pincode: "600042",
    established: "1971",
    type: "Autonomous",
    affiliation: "University of Madras",
    website: "https://gurunanakcollege.edu.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 27,
    name: "S.D.N.B. Vaishnav College for Women",
    category: "Arts & Science",
    location: "Chromepet, Chennai",
    district: "Chennai",
    pincode: "600044",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "University of Madras",
    counselling: "College Admission",
    courses: [["UG & PG programs (women)", "3 Years", "Verify with college"]],
  },
  {
    id: 28,
    name: "Quaid-e-Millath Government College for Women",
    category: "Arts & Science",
    location: "Anna Salai, Chennai",
    district: "Chennai",
    pincode: "600002",
    established: "Verify with institution",
    type: "Government",
    affiliation: "University of Madras",
    counselling: "College Admission",
    courses: [["UG & PG programs (women)", "3 Years", "Verify with college"]],
  },
  {
    id: 29,
    name: "Patrician College of Arts and Science",
    category: "Arts & Science",
    location: "Adyar, Chennai",
    district: "Chennai",
    pincode: "600020",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "University of Madras",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 30,
    name: "Great Lakes Institute of Management",
    category: "Management",
    location: "Manamai, Chennai",
    district: "Chennai",
    pincode: "Verify with institution",
    established: "2004",
    type: "Private",
    affiliation: "Autonomous institute",
    website: "https://www.greatlakes.edu.in/",
    counselling: "Management Admission",
    courses: [["PGPM / MBA programs", "1\u20132 Years", "Verify with college"]],
  },
  {
    id: 31,
    name: "Loyola Institute of Business Administration (LIBA)",
    category: "Management",
    location: "Nungambakkam, Chennai",
    district: "Chennai",
    pincode: "600034",
    established: "1979",
    type: "Autonomous",
    affiliation: "Loyola College",
    website: "https://www.liba.edu/",
    counselling: "Management Admission",
    courses: [["MBA programs", "2 Years", "Verify with college"]],
  },
  {
    id: 32,
    name: "Department of Management Studies, IIT Madras",
    category: "Management",
    location: "Guindy, Chennai",
    district: "Chennai",
    pincode: "600036",
    established: "Verify with institution",
    type: "Government",
    affiliation: "IIT Madras",
    website: "https://www.iitm.ac.in/",
    counselling: "Management Admission",
    courses: [["MBA programs", "2 Years", "Verify with college"]],
  },
  {
    id: 33,
    name: "Madras School of Social Work",
    category: "Management",
    location: "Egmore, Chennai",
    district: "Chennai",
    pincode: "600008",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "University of Madras",
    counselling: "College Admission",
    website: "https://mssw.in/",
    courses: [["MSW / HR programs", "2 Years", "Verify with college"]],
  },
  {
    id: 34,
    name: "Madras Medical College",
    category: "Medical",
    location: "Park Town, Chennai",
    district: "Chennai",
    pincode: "600003",
    established: "1835",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 35,
    name: "Stanley Medical College",
    category: "Medical",
    location: "Old Washermanpet, Chennai",
    district: "Chennai",
    pincode: "600001",
    established: "1938",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 36,
    name: "Kilpauk Medical College",
    category: "Medical",
    location: "Kilpauk, Chennai",
    district: "Chennai",
    pincode: "600010",
    established: "1960",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 37,
    name: "Sri Ramachandra Institute of Higher Education and Research",
    category: "Medical",
    location: "Porur, Chennai",
    district: "Chennai",
    pincode: "600116",
    established: "1985",
    type: "Deemed University",
    affiliation: "SRIHER",
    website: "https://www.sriramachandra.edu.in/",
    counselling: "NEET Counselling",
    courses: [["MBBS, BDS & allied programs", "Varies", "Verify with college"]],
  },
  {
    id: 38,
    name: "Saveetha Medical College and Hospital",
    category: "Medical",
    location: "Thandalam, Chennai",
    district: "Chennai",
    pincode: "602105",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Saveetha Institute of Medical and Technical Sciences",
    website: "https://www.saveetha.com/",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 39,
    name: "SRM Medical College Hospital and Research Centre",
    category: "Medical",
    location: "Kattankulathur, Chennai",
    district: "Chennai",
    pincode: "603203",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "SRM Institute of Science and Technology",
    website: "https://www.srmist.edu.in/",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 40,
    name: "Sree Balaji Medical College and Hospital",
    category: "Medical",
    location: "Chromepet, Chennai",
    district: "Chennai",
    pincode: "600044",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Bharath Institute of Higher Education and Research",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 41,
    name: "Saveetha Dental College and Hospitals",
    category: "Medical",
    location: "Poonamallee, Chennai",
    district: "Chennai",
    pincode: "600077",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Saveetha Institute of Medical and Technical Sciences",
    website: "https://www.saveetha.com/",
    counselling: "NEET Counselling",
    courses: [["BDS", "5 Years", "Verify with college"]],
  },
  {
    id: 42,
    name: "Tamil Nadu Government Dental College and Hospital",
    category: "Medical",
    location: "Park Town, Chennai",
    district: "Chennai",
    pincode: "600003",
    established: "Verify with institution",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "NEET Counselling",
    courses: [["BDS", "5 Years", "Verify with college"]],
  },
  {
    id: 43,
    name: "Government Siddha Medical College",
    category: "Medical",
    location: "Arumbakkam, Chennai",
    district: "Chennai",
    pincode: "600106",
    established: "Verify with institution",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University / Siddha",
    counselling: "Siddha Counselling",
    courses: [["BSMS", "5.5 Years", "Verify with college"]],
  },
  {
    id: 44,
    name: "Apollo College of Nursing",
    category: "Nursing",
    location: "Vanagaram, Chennai",
    district: "Chennai",
    pincode: "Verify with institution",
    established: "Verify with institution",
    type: "Private",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "College Admission",
    courses: [["B.Sc Nursing", "4 Years", "Verify with college"]],
  },
  {
    id: 45,
    name: "SRM College of Nursing",
    category: "Nursing",
    location: "Kattankulathur, Chennai",
    district: "Chennai",
    pincode: "603203",
    established: "Verify with institution",
    type: "Private",
    affiliation: "SRM Institute of Science and Technology",
    website: "https://www.srmist.edu.in/",
    counselling: "College Admission",
    courses: [["B.Sc Nursing", "4 Years", "Verify with college"]],
  },
  {
    id: 46,
    name: "Sri Ramachandra Faculty of Nursing",
    category: "Nursing",
    location: "Porur, Chennai",
    district: "Chennai",
    pincode: "600116",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "SRIHER",
    website: "https://www.sriramachandra.edu.in/",
    counselling: "College Admission",
    courses: [["B.Sc / M.Sc Nursing", "4 Years", "Verify with college"]],
  },
  {
    id: 47,
    name: "Saveetha College of Nursing",
    category: "Nursing",
    location: "Thandalam, Chennai",
    district: "Chennai",
    pincode: "602105",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Saveetha Institute of Medical and Technical Sciences",
    website: "https://www.saveetha.com/",
    counselling: "College Admission",
    courses: [["B.Sc Nursing", "4 Years", "Verify with college"]],
  },
  {
    id: 48,
    name: "Government College of Nursing, Madras Medical College",
    category: "Nursing",
    location: "Park Town, Chennai",
    district: "Chennai",
    pincode: "600003",
    established: "Verify with institution",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "College Admission",
    courses: [["B.Sc Nursing", "4 Years", "Verify with college"]],
  },
  {
    id: 49,
    name: "Saveetha College of Physiotherapy",
    category: "Physiotherapy",
    location: "Thandalam, Chennai",
    district: "Chennai",
    pincode: "602105",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Saveetha Institute of Medical and Technical Sciences",
    website: "https://www.saveetha.com/",
    counselling: "College Admission",
    courses: [["Bachelor of Physiotherapy (BPT)", "4.5 Years", "Verify with college"]],
  },
  {
    id: 50,
    name: "SRM College of Physiotherapy",
    category: "Physiotherapy",
    location: "Kattankulathur, Chennai",
    district: "Chennai",
    pincode: "603203",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "SRM Institute of Science and Technology",
    website: "https://www.srmist.edu.in/",
    counselling: "College Admission",
    courses: [["Bachelor of Physiotherapy (BPT)", "4.5 Years", "Verify with college"]],
  },
  {
    id: 51,
    name: "Sri Ramachandra Faculty of Physiotherapy",
    category: "Physiotherapy",
    location: "Porur, Chennai",
    district: "Chennai",
    pincode: "600116",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "SRIHER",
    website: "https://www.sriramachandra.edu.in/",
    counselling: "College Admission",
    courses: [["Bachelor of Physiotherapy (BPT)", "4.5 Years", "Verify with college"]],
  },
  {
    id: 52,
    name: "Dr. Ambedkar Government Law College",
    category: "Other",
    location: "Parry's Corner, Chennai",
    district: "Chennai",
    pincode: "600108",
    established: "1891",
    type: "Government",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    counselling: "Law Admission (TNDALU)",
    courses: [["LL.B / B.A. LL.B", "3\u20135 Years", "Verify with college"]],
  },
  {
    id: 53,
    name: "Saveetha School of Law",
    category: "Other",
    location: "Thandalam, Chennai",
    district: "Chennai",
    pincode: "602105",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Saveetha Institute of Medical and Technical Sciences",
    website: "https://www.saveetha.com/",
    counselling: "Law Admission",
    courses: [["B.A. LL.B (Hons)", "5 Years", "Verify with college"]],
  },
  {
    id: 54,
    name: "NIFT Chennai (Fashion & Design)",
    category: "Other",
    location: "Taramani, Chennai",
    district: "Chennai",
    pincode: "600113",
    established: "Verify with institution",
    type: "Government",
    affiliation: "NIFT",
    website: "https://nift.ac.in/",
    counselling: "NIFT Entrance",
    courses: [["B.Des / B.F.Tech", "4 Years", "Verify with college"]],
  },
  {
    id: 55,
    name: "Madras Veterinary College (TANUVAS)",
    category: "Other",
    location: "Vepery, Chennai",
    district: "Chennai",
    pincode: "600007",
    established: "1903",
    type: "Government",
    affiliation: "TANUVAS",
    website: "https://tanuvas.ac.in/",
    counselling: "University Admission",
    courses: [["B.V.Sc & A.H.", "5.5 Years", "Verify with college"]],
  },
  {
    id: 56,
    name: "PSG College of Technology",
    category: "Engineering",
    location: "Peelamedu, Coimbatore",
    district: "Coimbatore",
    pincode: "641004",
    established: "1951",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    ranking: "#67",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.psgtech.edu/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E. Computer Science and Engineering", "4 Years", "Verify with college"],
      ["B.E. Information Technology", "4 Years", "Verify with college"],
      ["B.E. Electronics & Communication", "4 Years", "Verify with college"],
    ],
  },
  {
    id: 57,
    name: "Coimbatore Institute of Technology",
    category: "Engineering",
    location: "Civil Aerodrome Post, Coimbatore",
    district: "Coimbatore",
    pincode: "641014",
    established: "1956",
    affiliation: "Anna University",
    accreditation: "NAAC A+",
    ranking: "101–150",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://cit.edu.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E. Computer Science and Engineering", "4 Years", "Verify with college"],
      ["B.Tech Information Technology", "4 Years", "Verify with college"],
      ["B.E. Mechanical Engineering", "4 Years", "Verify with college"],
    ],
  },
  {
    id: 58,
    name: "Kumaraguru College of Technology",
    category: "Engineering",
    location: "Saravanampatti, Coimbatore",
    district: "Coimbatore",
    pincode: "641049",
    established: "1984",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    ranking: "101–150",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.kct.ac.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E. Computer Science and Engineering", "4 Years", "Verify with college"],
      ["B.Tech Artificial Intelligence & Data Science", "4 Years", "Verify with college"],
    ],
  },
  {
    id: 59,
    name: "Sri Krishna College of Engineering and Technology",
    category: "Engineering",
    location: "Kuniyamuthur, Coimbatore",
    district: "Coimbatore",
    pincode: "641008",
    established: "1998",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.skcet.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 60,
    name: "Sri Ramakrishna Engineering College",
    category: "Engineering",
    location: "Vattamalaipalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641022",
    established: "1994",
    affiliation: "Anna University",
    accreditation: "NAAC A+",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.srec.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 61,
    name: "Karpagam College of Engineering",
    category: "Engineering",
    location: "Othakkalmandapam, Coimbatore",
    district: "Coimbatore",
    pincode: "641032",
    established: "2000",
    affiliation: "Anna University",
    accreditation: "NAAC A+",
    counsellingCode: "Verify current TNEA code",
    website: "https://kce.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 62,
    name: "Hindusthan College of Engineering and Technology",
    category: "Engineering",
    location: "Malumichampatti, Coimbatore",
    district: "Coimbatore",
    pincode: "641032",
    established: "2000",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    counsellingCode: "Verify current TNEA code",
    website: "https://hicet.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 63,
    name: "Government College of Technology",
    category: "Engineering",
    location: "Thadagam Road, Coimbatore",
    district: "Coimbatore",
    pincode: "641013",
    established: "1945",
    type: "Government",
    affiliation: "Anna University",
    accreditation: "NAAC A",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.gct.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Government fee structure"]],
  },
  {
    id: 64,
    name: "PSG Institute of Technology and Applied Research",
    category: "Engineering",
    location: "Neelambur, Coimbatore",
    district: "Coimbatore",
    pincode: "641062",
    established: "2014",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.psgitech.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 65,
    name: "Amrita Vishwa Vidyapeetham, Coimbatore",
    category: "Engineering",
    location: "Ettimadai, Coimbatore",
    district: "Coimbatore",
    pincode: "641112",
    established: "1994",
    type: "Deemed University",
    affiliation: "Amrita Vishwa Vidyapeetham",
    accreditation: "NAAC A++",
    ranking: "Verify current ranking",
    website: "https://www.amrita.edu/campus/coimbatore/",
    counselling: "University Admission",
    courses: [["B.Tech programs", "4 Years", "Verify with university"]],
  },
  {
    id: 66,
    name: "Dr. N.G.P. Institute of Technology",
    category: "Engineering",
    location: "Kalapatti, Coimbatore",
    district: "Coimbatore",
    pincode: "641048",
    established: "2007",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.drp.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 67,
    name: "KPR Institute of Engineering and Technology",
    category: "Engineering",
    location: "Arasur, Coimbatore",
    district: "Coimbatore",
    pincode: "641407",
    established: "2009",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.kpriet.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 68,
    name: "Coimbatore Institute of Engineering and Technology",
    category: "Engineering",
    location: "Narasipuram, Coimbatore",
    district: "Coimbatore",
    pincode: "641109",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 69,
    name: "Sri Eshwar College of Engineering",
    category: "Engineering",
    location: "Kondampatti, Coimbatore",
    district: "Coimbatore",
    pincode: "641202",
    established: "2008",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://sece.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 70,
    name: "Sri Shakthi Institute of Engineering and Technology",
    category: "Engineering",
    location: "L&T Bypass Road, Coimbatore",
    district: "Coimbatore",
    pincode: "641062",
    established: "1998",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://siet.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 71,
    name: "SNS College of Technology",
    category: "Engineering",
    location: "Vazhiyampalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641035",
    established: "2006",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://snsct.org/",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 72,
    name: "SNS College of Engineering",
    category: "Engineering",
    location: "Kurumbapalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641107",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 73,
    name: "Sri Ramakrishna Institute of Technology",
    category: "Engineering",
    location: "Pachapalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641010",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    website: "https://www.sritcbe.ac.in/",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 74,
    name: "Nehru Institute of Technology",
    category: "Engineering",
    location: "Thirumalayampalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641105",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 75,
    name: "Park College of Engineering and Technology",
    category: "Engineering",
    location: "Kaniyur, Coimbatore",
    district: "Coimbatore",
    pincode: "641659",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 76,
    name: "Hindusthan Institute of Technology",
    category: "Engineering",
    location: "Othakkalmandapam, Coimbatore",
    district: "Coimbatore",
    pincode: "641032",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 77,
    name: "Karunya Institute of Technology and Science",
    category: "Engineering",
    location: "Karunya Nagar, Coimbatore",
    district: "Coimbatore",
    pincode: "641114",
    established: "1986",
    type: "Deemed University",
    affiliation: "Karunya Institute of Technology and Science",
    counsellingCode: "Not applicable",
    website: "https://www.karunya.edu/",
    counselling: "University Admission",
    courses: [["B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 78,
    name: "Karpagam Academy of Higher Education",
    category: "Engineering",
    location: "Eachanari, Coimbatore",
    district: "Coimbatore",
    pincode: "641021",
    established: "2008",
    type: "Deemed University",
    affiliation: "Karpagam Academy of Higher Education",
    counsellingCode: "Not applicable",
    website: "https://kahedu.edu.in/",
    counselling: "University Admission",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 79,
    name: "Kalaignar Karunanidhi Institute of Technology",
    category: "Engineering",
    location: "Kannampalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641402",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 80,
    name: "Jansons Institute of Technology",
    category: "Engineering",
    location: "Karumathampatti, Coimbatore",
    district: "Coimbatore",
    pincode: "641659",
    established: "2009",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 81,
    name: "Tamilnadu College of Engineering",
    category: "Engineering",
    location: "Karumathampatti, Coimbatore",
    district: "Coimbatore",
    pincode: "641659",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 82,
    name: "Rathinam Technical Campus",
    category: "Engineering",
    location: "Eachanari, Coimbatore",
    district: "Coimbatore",
    pincode: "641021",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 83,
    name: "Dr. Mahalingam College of Engineering and Technology",
    category: "Engineering",
    location: "Pollachi, Coimbatore",
    district: "Coimbatore",
    pincode: "642003",
    established: "1998",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    website: "https://www.drmcet.ac.in/",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 84,
    name: "Adithya Institute of Technology",
    category: "Engineering",
    location: "Kurumbapalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641107",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 85,
    name: "Sri Guru Institute of Technology",
    category: "Engineering",
    location: "Varapalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641110",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 86,
    name: "Akshaya College of Engineering and Technology",
    category: "Engineering",
    location: "Kinathukadavu, Coimbatore",
    district: "Coimbatore",
    pincode: "642109",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 87,
    name: "Easa College of Engineering and Technology",
    category: "Engineering",
    location: "Navakkarai, Coimbatore",
    district: "Coimbatore",
    pincode: "641105",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 88,
    name: "Info Institute of Engineering",
    category: "Engineering",
    location: "Kovilpalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641107",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 89,
    name: "PSG College of Arts and Science",
    category: "Arts & Science",
    location: "Peelamedu, Coimbatore",
    district: "Coimbatore",
    pincode: "641014",
    established: "1947",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A++",
    ranking: "Verify current ranking",
    website: "https://www.psgcas.ac.in/",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 90,
    name: "PSGR Krishnammal College for Women",
    category: "Arts & Science",
    location: "Peelamedu, Coimbatore",
    district: "Coimbatore",
    pincode: "641004",
    established: "1963",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A++",
    website: "https://www.psgrkcw.ac.in/",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 91,
    name: "Kongunadu Arts and Science College",
    category: "Arts & Science",
    location: "G.N. Mills, Coimbatore",
    district: "Coimbatore",
    pincode: "641029",
    established: "1975",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A+",
    website: "https://www.kasc.ac.in/",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 92,
    name: "Sri Krishna Arts and Science College",
    category: "Arts & Science",
    location: "Kuniyamuthur, Coimbatore",
    district: "Coimbatore",
    pincode: "641008",
    established: "1997",
    affiliation: "Bharathiar University",
    website: "https://www.skasc.ac.in/",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 93,
    name: "Government Arts College, Coimbatore",
    category: "Arts & Science",
    location: "Town Hall, Coimbatore",
    district: "Coimbatore",
    pincode: "641018",
    established: "Verify with institution",
    type: "Government",
    affiliation: "Bharathiar University",
    website: "https://gacbe.ac.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 94,
    name: "Nirmala College for Women",
    category: "Arts & Science",
    location: "Red Fields, Coimbatore",
    district: "Coimbatore",
    pincode: "641018",
    established: "1957",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 95,
    name: "Avinashilingam Institute for Home Science and Higher Education for Women",
    category: "Arts & Science",
    location: "Coimbatore",
    district: "Coimbatore",
    pincode: "641043",
    established: "1957",
    type: "Deemed University",
    affiliation: "Avinashilingam Institute",
    website: "https://avinuty.ac.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 96,
    name: "Dr. N.G.P. Arts and Science College",
    category: "Arts & Science",
    location: "Kalapatti, Coimbatore",
    district: "Coimbatore",
    pincode: "641048",
    established: "1998",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    website: "https://www.drngpasc.ac.in/",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 97,
    name: "Sri Krishna Adithya College of Arts and Science",
    category: "Arts & Science",
    location: "Kovaipudur, Coimbatore",
    district: "Coimbatore",
    pincode: "641042",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 98,
    name: "Rathnavel Subramaniam College of Arts and Science",
    category: "Arts & Science",
    location: "Sulur, Coimbatore",
    district: "Coimbatore",
    pincode: "641402",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 99,
    name: "CBM College",
    category: "Arts & Science",
    location: "Kovaipudur, Coimbatore",
    district: "Coimbatore",
    pincode: "641042",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 100,
    name: "Kovai Kalaimagal College of Arts and Science",
    category: "Arts & Science",
    location: "Narasipuram, Coimbatore",
    district: "Coimbatore",
    pincode: "641109",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 101,
    name: "Dr. G.R. Damodaran College of Science",
    category: "Arts & Science",
    location: "Civil Aerodrome Post, Coimbatore",
    district: "Coimbatore",
    pincode: "641014",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 102,
    name: "Nehru Arts and Science College",
    category: "Arts & Science",
    location: "Thirumalayampalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641105",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 103,
    name: "Sri Ramakrishna College of Arts and Science",
    category: "Arts & Science",
    location: "Nava India, Coimbatore",
    district: "Coimbatore",
    pincode: "641006",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 104,
    name: "Sri Ramakrishna Mission Vidyalaya College of Arts and Science",
    category: "Arts & Science",
    location: "Periyanaickenpalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641020",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 105,
    name: "Bharathiar University",
    category: "Arts & Science",
    location: "Marudhamalai Road, Coimbatore",
    district: "Coimbatore",
    pincode: "641046",
    established: "1982",
    type: "State University",
    affiliation: "Bharathiar University",
    website: "https://b-u.ac.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 106,
    name: "PSG Institute of Management",
    category: "Management",
    location: "Peelamedu, Coimbatore",
    district: "Coimbatore",
    pincode: "641004",
    established: "1994",
    affiliation: "Anna University",
    website: "https://www.psgim.ac.in/",
    counselling: "Management Admission",
    courses: [["Master of Business Administration", "2 Years", "Verify with college"]],
  },
  {
    id: 107,
    name: "Kumaraguru College of Liberal Arts and Science",
    category: "Management",
    location: "Saravanampatti, Coimbatore",
    district: "Coimbatore",
    pincode: "641049",
    established: "2018",
    affiliation: "Bharathiar University",
    website: "https://www.kclas.ac.in/",
    courses: [["Business and management programs", "3 Years", "Verify with college"]],
  },
  {
    id: 108,
    name: "Amrita School of Business, Coimbatore",
    category: "Management",
    location: "Ettimadai, Coimbatore",
    district: "Coimbatore",
    pincode: "641112",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Amrita Vishwa Vidyapeetham",
    website: "https://www.amrita.edu/campus/coimbatore/",
    counselling: "Management Admission",
    courses: [["MBA programs", "2 Years", "Verify with college"]],
  },
  {
    id: 109,
    name: "Bharathiar University School of Management Studies",
    category: "Management",
    location: "Marudhamalai Road, Coimbatore",
    district: "Coimbatore",
    pincode: "641046",
    established: "Verify with institution",
    type: "Government",
    affiliation: "Bharathiar University",
    website: "https://b-u.ac.in/",
    counselling: "Management Admission",
    courses: [["MBA programs", "2 Years", "Verify with college"]],
  },
  {
    id: 110,
    name: "PSG Institute of Medical Sciences and Research",
    category: "Medical",
    location: "Peelamedu, Coimbatore",
    district: "Coimbatore",
    pincode: "641004",
    established: "1985",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    website: "https://www.psgimsr.ac.in/",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "Varies", "Verify with institution"]],
  },
  {
    id: 111,
    name: "Coimbatore Medical College",
    category: "Medical",
    location: "Avinashi Road, Coimbatore",
    district: "Coimbatore",
    pincode: "641014",
    established: "Verify with institution",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 112,
    name: "ESIC Medical College and PGIMSR, Coimbatore",
    category: "Medical",
    location: "Coimbatore",
    district: "Coimbatore",
    pincode: "641014",
    established: "Verify with institution",
    type: "Government",
    affiliation: "ESIC",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 113,
    name: "KMCH Institute of Health Sciences and Research",
    category: "Medical",
    location: "Avinashi Road, Coimbatore",
    district: "Coimbatore",
    pincode: "641014",
    established: "Verify with institution",
    type: "Private",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    website: "https://www.kmchhospitals.com/",
    counselling: "NEET Counselling",
    courses: [["Medical & allied health programs", "Varies", "Verify with college"]],
  },
  {
    id: 114,
    name: "Karpagam Faculty of Medicine and Research",
    category: "Medical",
    location: "Othakkalmandapam, Coimbatore",
    district: "Coimbatore",
    pincode: "641032",
    established: "Verify with institution",
    type: "Private",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    website: "https://kahedu.edu.in/",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 115,
    name: "PSG College of Nursing",
    category: "Nursing",
    location: "Peelamedu, Coimbatore",
    district: "Coimbatore",
    pincode: "641004",
    established: "Verify with institution",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    website: "https://www.psgcn.ac.in/",
    courses: [["B.Sc Nursing", "4 Years", "Verify with institution"]],
  },
  {
    id: 116,
    name: "Government College of Nursing, Coimbatore",
    category: "Nursing",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    pincode: "641018",
    established: "Verify with institution",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    courses: [["B.Sc Nursing", "4 Years", "Verify with institution"]],
  },
  {
    id: 117,
    name: "KMCH College of Nursing",
    category: "Nursing",
    location: "Avinashi Road, Coimbatore",
    district: "Coimbatore",
    pincode: "641014",
    established: "Verify with institution",
    type: "Private",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    website: "https://www.kmchhospitals.com/",
    counselling: "College Admission",
    courses: [["B.Sc Nursing", "4 Years", "Verify with college"]],
  },
  {
    id: 118,
    name: "PSG College of Physiotherapy",
    category: "Physiotherapy",
    location: "Peelamedu, Coimbatore",
    district: "Coimbatore",
    pincode: "641004",
    established: "Verify with institution",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    website: "https://www.psgcas.ac.in/",
    courses: [["Bachelor of Physiotherapy (BPT)", "4.5 Years", "Verify with college"]],
  },
  {
    id: 119,
    name: "Tamil Nadu Agricultural University",
    category: "Other",
    location: "Lawley Road, Coimbatore",
    district: "Coimbatore",
    pincode: "641003",
    established: "1971",
    type: "State University",
    affiliation: "TNAU",
    website: "https://tnau.ac.in/",
    counselling: "University Admission",
    courses: [["B.Sc Agriculture & allied programs", "4 Years", "Verify with college"]],
  },
  {
    id: 120,
    name: "Government Law College, Coimbatore",
    category: "Other",
    location: "Coimbatore",
    district: "Coimbatore",
    pincode: "Verify with institution",
    established: "Verify with institution",
    type: "Government",
    affiliation: "Tamil Nadu Dr. Ambedkar Law University",
    counselling: "Law Admission (TNDALU)",
    courses: [["LL.B / B.A. LL.B", "3\u20135 Years", "Verify with college"]],
  },
  {
    id: 121,
    name: "PSG College of Pharmacy",
    category: "Other",
    location: "Peelamedu, Coimbatore",
    district: "Coimbatore",
    pincode: "641004",
    established: "Verify with institution",
    type: "Private",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "College Admission",
    website: "https://www.psgpharma.ac.in/",
    courses: [["B.Pharm / M.Pharm", "4 Years", "Verify with college"]],
  },
  {
    id: 122,
    name: "Forest College and Research Institute",
    category: "Other",
    location: "Mettupalayam, Coimbatore",
    district: "Coimbatore",
    pincode: "641301",
    established: "Verify with institution",
    type: "Government",
    affiliation: "TNAU",
    website: "https://tnau.ac.in/",
    counselling: "University Admission",
    courses: [["B.Sc Forestry", "4 Years", "Verify with college"]],
  },
  {
    id: 123,
    name: "Bannari Amman Institute of Technology",
    category: "Engineering",
    location: "Sathyamangalam, Erode",
    district: "Erode",
    pincode: "638401",
    established: "1996",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.bitsathy.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 124,
    name: "Kongu Engineering College",
    category: "Engineering",
    location: "Perundurai, Erode",
    district: "Erode",
    pincode: "638060",
    established: "1984",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://kongu.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 125,
    name: "Nandha Engineering College",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    pincode: "638052",
    established: "2001",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://nandhaengg.org/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 126,
    name: "Erode Sengunthar Engineering College",
    category: "Engineering",
    location: "Perundurai, Erode",
    district: "Erode",
    pincode: "638057",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    website: "https://www.esec.ac.in/",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 127,
    name: "Velalar College of Engineering and Technology",
    category: "Engineering",
    location: "Thindal, Erode",
    district: "Erode",
    pincode: "638012",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    website: "https://www.velalarengg.ac.in/",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 128,
    name: "Nandha College of Technology",
    category: "Engineering",
    location: "Vaikkalmedu, Erode",
    district: "Erode",
    pincode: "638052",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 129,
    name: "Government College of Engineering, Erode",
    category: "Engineering",
    location: "Chithode, Erode",
    district: "Erode",
    pincode: "638316",
    established: "Verify with institution",
    type: "Government",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    website: "https://www.gcee.ac.in/",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 130,
    name: "Kongu Arts and Science College",
    category: "Arts & Science",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    pincode: "638107",
    established: "1994",
    affiliation: "Bharathiar University",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 131,
    name: "Vellalar College for Women",
    category: "Arts & Science",
    location: "Thindal, Erode",
    district: "Erode",
    pincode: "638012",
    established: "1970",
    affiliation: "Bharathiar University",
    website: "https://www.vellalar.com/",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 132,
    name: "Sri Vasavi College",
    category: "Arts & Science",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    pincode: "638316",
    established: "1968",
    affiliation: "Bharathiar University",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 133,
    name: "Nandha Arts and Science College",
    category: "Arts & Science",
    location: "Vaikkalmedu, Erode",
    district: "Erode",
    pincode: "638052",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 134,
    name: "Gobi Arts & Science College",
    category: "Arts & Science",
    location: "Gobichettipalayam, Erode",
    district: "Erode",
    pincode: "638453",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 135,
    name: "Erode Arts and Science College",
    category: "Arts & Science",
    location: "Rangampalayam, Erode",
    district: "Erode",
    pincode: "638009",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 136,
    name: "Chikkaiah Naicker College",
    category: "Arts & Science",
    location: "Veerappanchatram, Erode",
    district: "Erode",
    pincode: "638004",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 137,
    name: "Kongu School of Management Studies",
    category: "Management",
    location: "Perundurai, Erode",
    district: "Erode",
    pincode: "638060",
    established: "Verify with institution",
    affiliation: "Anna University",
    website: "https://kongu.ac.in/",
    counselling: "Management Admission",
    courses: [["Master of Business Administration", "2 Years", "Verify with college"]],
  },
  {
    id: 138,
    name: "Government Erode Medical College and Hospital",
    category: "Medical",
    location: "Perundurai, Erode",
    district: "Erode",
    pincode: "638053",
    established: "1992",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "Varies", "Verify with institution"]],
  },
  {
    id: 139,
    name: "Velalar Medical College and Hospital",
    category: "Medical",
    location: "Thindal, Erode",
    district: "Erode",
    pincode: "638012",
    established: "Verify with institution",
    type: "Private",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 140,
    name: "Velalar College of Nursing",
    category: "Nursing",
    location: "Thindal, Erode",
    district: "Erode",
    pincode: "638012",
    established: "Verify with institution",
    type: "Private",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "College Admission",
    courses: [["B.Sc Nursing", "4 Years", "Verify with college"]],
  },
  {
    id: 141,
    name: "Kumaraguru Institute of Agriculture",
    category: "Other",
    location: "Sakthinagar, Erode",
    district: "Erode",
    pincode: "638315",
    established: "2017",
    type: "Private",
    affiliation: "Tamil Nadu Agricultural University",
    website: "https://kiagri.ac.in/",
    counselling: "University Admission",
    courses: [["B.Sc Agriculture", "4 Years", "Verify with institution"]],
  },
  {
    id: 142,
    name: "Nandha College of Pharmacy",
    category: "Other",
    location: "Koorapalayam Pirivu, Erode",
    district: "Erode",
    pincode: "638052",
    established: "Verify with institution",
    type: "Private",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "College Admission",
    courses: [["B.Pharm / M.Pharm", "4 Years", "Verify with college"]],
  },
  {
    id: 143,
    name: "Sona College of Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    pincode: "636005",
    established: "1997",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.sonatech.ac.in/",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 144,
    name: "Government College of Engineering, Salem",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    pincode: "636011",
    established: "1966",
    type: "Government",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    website: "https://www.gcesalem.edu.in/",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 145,
    name: "AVS Engineering College",
    category: "Engineering",
    location: "Ammapet, Salem",
    district: "Salem",
    pincode: "636003",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 146,
    name: "Knowledge Institute of Technology",
    category: "Engineering",
    location: "Kakapalayam, Salem",
    district: "Salem",
    pincode: "637504",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    website: "https://www.kiot.ac.in/",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 147,
    name: "Vinayaka Mission's Kirupananda Variyar Engineering College",
    category: "Engineering",
    location: "Salem",
    district: "Salem",
    pincode: "636308",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    website: "https://www.vmkvec.edu.in/",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 148,
    name: "Vinayaka Mission's Research Foundation (Deemed University)",
    category: "Engineering",
    location: "Ariyanoor, Salem",
    district: "Salem",
    pincode: "636308",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Vinayaka Mission's Research Foundation",
    counsellingCode: "Not applicable",
    counselling: "University Admission",
    website: "https://vmrf.edu.in/",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 149,
    name: "Government Arts College, Salem",
    category: "Arts & Science",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    pincode: "636007",
    established: "1857",
    type: "Government",
    affiliation: "Periyar University",
    courses: [["Undergraduate programs", "3 Years", "Government fee structure"]],
  },
  {
    id: 150,
    name: "Sri Sarada College for Women",
    category: "Arts & Science",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    pincode: "636016",
    established: "1965",
    affiliation: "Periyar University",
    website: "https://www.srisaradacollege.org/",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 151,
    name: "Jairam Arts and Science College",
    category: "Arts & Science",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    pincode: "636008",
    established: "1994",
    affiliation: "Periyar University",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 152,
    name: "Sona College of Arts and Science",
    category: "Arts & Science",
    location: "Fairlands, Salem",
    district: "Salem",
    pincode: "636005",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Periyar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 153,
    name: "Vysya College",
    category: "Arts & Science",
    location: "Salem",
    district: "Salem",
    pincode: "636103",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Periyar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 154,
    name: "AVS College of Arts and Science",
    category: "Arts & Science",
    location: "Ramalingapuram, Salem",
    district: "Salem",
    pincode: "636106",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Periyar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 155,
    name: "Shri Sakthikailassh Women's College",
    category: "Arts & Science",
    location: "Ammapet, Salem",
    district: "Salem",
    pincode: "636003",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Periyar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 156,
    name: "Periyar University",
    category: "Arts & Science",
    location: "Salem",
    district: "Salem",
    pincode: "636011",
    established: "1997",
    type: "State University",
    affiliation: "Periyar University",
    website: "https://www.periyaruniversity.ac.in/",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 157,
    name: "Sona School of Management",
    category: "Management",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    pincode: "636005",
    established: "Verify with institution",
    affiliation: "Anna University",
    website: "https://www.sonatech.ac.in/",
    counselling: "Management Admission",
    courses: [["Master of Business Administration", "2 Years", "Verify with college"]],
  },
  {
    id: 158,
    name: "Government Mohan Kumaramangalam Medical College",
    category: "Medical",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    pincode: "636001",
    established: "1986",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "Varies", "Verify with institution"]],
  },
  {
    id: 159,
    name: "Vinayaka Mission's Kirupananda Variyar Medical College and Hospitals",
    category: "Medical",
    location: "Salem",
    district: "Salem",
    pincode: "636308",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Vinayaka Mission's Research Foundation",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "5.5 Years", "Verify with college"]],
  },
  {
    id: 160,
    name: "Vinayaka Mission's Sankarachariyar Dental College",
    category: "Medical",
    location: "Salem",
    district: "Salem",
    pincode: "636308",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Vinayaka Mission's Research Foundation",
    counselling: "NEET Counselling",
    courses: [["BDS", "5 Years", "Verify with college"]],
  },
  {
    id: 161,
    name: "Government College of Nursing, Salem",
    category: "Nursing",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    pincode: "636001",
    established: "Verify with institution",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    courses: [["B.Sc Nursing", "4 Years", "Verify with institution"]],
  },
  {
    id: 162,
    name: "Vinayaka Mission's College of Nursing",
    category: "Nursing",
    location: "Salem",
    district: "Salem",
    pincode: "Verify with institution",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Vinayaka Mission's Research Foundation",
    counselling: "College Admission",
    courses: [["B.Sc Nursing", "4 Years", "Verify with college"]],
  },
  {
    id: 163,
    name: "Vinayaka Mission's College of Pharmacy",
    category: "Other",
    location: "Salem",
    district: "Salem",
    pincode: "Verify with institution",
    established: "Verify with institution",
    type: "Deemed University",
    affiliation: "Vinayaka Mission's Research Foundation",
    counselling: "College Admission",
    courses: [["B.Pharm / M.Pharm", "4 Years", "Verify with college"]],
  },
  {
    id: 164,
    name: "Angel College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruppur, Tamil Nadu",
    district: "Tiruppur",
    pincode: "641665",
    established: "2007",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. Engineering programs", "4 Years", "Verify with college"]],
  },
  {
    id: 165,
    name: "Jai Shriram Engineering College",
    category: "Engineering",
    location: "Avinashipalayam, Tiruppur",
    district: "Tiruppur",
    pincode: "638660",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 166,
    name: "Maharaja Engineering College",
    category: "Engineering",
    location: "Avinashi, Tiruppur",
    district: "Tiruppur",
    pincode: "641654",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 167,
    name: "Sasurie College of Engineering",
    category: "Engineering",
    location: "Vijayamangalam, Tiruppur",
    district: "Tiruppur",
    pincode: "638056",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Anna University",
    counsellingCode: "Verify current TNEA code",
    counselling: "TNEA Counselling",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 168,
    name: "Tiruppur Kumaran College for Women",
    category: "Arts & Science",
    location: "Tiruppur, Tamil Nadu",
    district: "Tiruppur",
    pincode: "641687",
    established: "1995",
    affiliation: "Bharathiar University",
    courses: [["Undergraduate programs", "3 Years", "Verify with college"]],
  },
  {
    id: 169,
    name: "Chikkanna Government Arts College",
    category: "Arts & Science",
    location: "Tiruppur, Tamil Nadu",
    district: "Tiruppur",
    pincode: "641602",
    established: "1966",
    type: "Government",
    affiliation: "Bharathiar University",
    courses: [["Undergraduate programs", "3 Years", "Government fee structure"]],
  },
  {
    id: 170,
    name: "Sri GVG Visalakshi College for Women",
    category: "Arts & Science",
    location: "Udumalpet, Tiruppur",
    district: "Tiruppur",
    pincode: "642128",
    established: "Verify with institution",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 171,
    name: "Government Arts College, Udumalpet",
    category: "Arts & Science",
    location: "Udumalpet, Tiruppur",
    district: "Tiruppur",
    pincode: "642126",
    established: "Verify with institution",
    type: "Government",
    affiliation: "Bharathiar University",
    counselling: "College Admission",
    courses: [["UG & PG programs", "3 Years", "Verify with college"]],
  },
  {
    id: 172,
    name: "Government Medical College, Tiruppur",
    category: "Medical",
    location: "Tiruppur, Tamil Nadu",
    district: "Tiruppur",
    pincode: "641604",
    established: "Verify with institution",
    type: "Government",
    affiliation: "The Tamil Nadu Dr. M.G.R. Medical University",
    counselling: "NEET Counselling",
    courses: [["MBBS and allied programs", "Varies", "Verify with institution"]],
  },
  {
    id: 173,
    name: "NIFT-TEA College of Knitwear Fashion",
    category: "Other",
    location: "Tiruppur, Tamil Nadu",
    district: "Tiruppur",
    pincode: "641606",
    established: "1997",
    affiliation: "Bharathiar University",
    website: "https://www.nifttea.ac.in/",
    courses: [["Fashion and textile programs", "Varies", "Verify with college"]],
  },
];

const additionalCollegeData = [
  {
    id: 174,
    name: "Sri Krishna College of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 175,
    name: "KGISL Institute of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 176,
    name: "Anna University Regional Campus - Coimbatore",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 177,
    name: "Arjun College of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 178,
    name: "Asian College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 179,
    name: "C M S College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 180,
    name: "Christ The King Engineering College",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 181,
    name: "Dhaanish Ahmed Institute of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 182,
    name: "Dhanalakshmi Srinivasan College of Engineering (CBE)",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 183,
    name: "JCT College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 184,
    name: "Karpagam Institute of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 185,
    name: "Kathir College of Engineering",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 186,
    name: "Nehru Institute of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 187,
    name: "P A College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 188,
    name: "Park College of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 189,
    name: "Pollachi Institute of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 190,
    name: "PPG Institute of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 191,
    name: "R V S Technical Campus Coimbatore",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 192,
    name: "RVS College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 193,
    name: "Sree Sakthi Engineering College",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 194,
    name: "Sri Ranganathar Institute of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 195,
    name: "Sri Sai Ranganathan Engineering College",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 196,
    name: "Studyworld College of Engineering",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 197,
    name: "Suguna College of Engineering",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 198,
    name: "United Institute of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 199,
    name: "V.S.B. College of Engineering Technical Campus",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 200,
    name: "Vishnu Lakshmi College of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 201,
    name: "HINDUSTHAN COLLEGE OF ENGINEERING",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 202,
    name: "Aishwarya College of Engineering and Technology",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 203,
    name: "AL-Ameen Engineering College",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 204,
    name: "Government College of Engineering (Formerly Institute of Road and Transport Technology)",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 205,
    name: "JKK Munirajah College of Technology",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 206,
    name: "M.P.Nachimuthu M.Jaganathan Engineering College",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 207,
    name: "Shree Venkateshwara Hi-Tech Engineering College",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 208,
    name: "Surya Engineering College",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 209,
    name: "A V S College of Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 210,
    name: "Annapoorana Engineering College",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 211,
    name: "Bharathiyar Institute of Engineering for Women",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 212,
    name: "Dhirajlal Gandhi College of Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 213,
    name: "Ganesh College of Engineering",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 214,
    name: "Government College of Engineering",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 215,
    name: "Indian Institute of Handloom Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 216,
    name: "Mahendra College of Engineering",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 217,
    name: "R P Sarathy Institute of Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 218,
    name: "Salem College of Engineering and Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 219,
    name: "Shree Sathyam College of Engineering and Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 220,
    name: "Sri Shanmugha College of Engineering and Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 221,
    name: "Tagore Institute of Engineering and Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 222,
    name: "The Kavery Engineering College",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 223,
    name: "V S A Group of Institutions",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 224,
    name: "SRM Institute of Science and Technology (SRMIST), Kattankulathur Campus",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 225,
    name: "Vellore Institute of Technology (VIT), Vellore Campus",
    category: "Engineering",
    location: "Vellore, Tamil Nadu",
    district: "Vellore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 226,
    name: "National Institute of Technology, Tiruchirappalli",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 227,
    name: "Thiagarajar College of Engineering",
    category: "Engineering",
    location: "Madurai, Tamil Nadu",
    district: "Madurai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 228,
    name: "Mepco Schlenk Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 229,
    name: "Kalasalingam Academy of Research and Education",
    category: "Engineering",
    location: "Virudhunagar, Tamil Nadu",
    district: "Virudhunagar",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 230,
    name: "K.S. Rangasamy College of Technology",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 231,
    name: "Sethu Institute of Technology",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 232,
    name: "PSNA College of Engineering and Technology",
    category: "Engineering",
    location: "Dindigul, Tamil Nadu",
    district: "Dindigul",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 233,
    name: "Arunai Engineering College",
    category: "Engineering",
    location: "Tiruvannamalai, Tamil Nadu",
    district: "Tiruvannamalai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 234,
    name: "Oxford Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 235,
    name: "Saranathan College of Engineering",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 236,
    name: "E.G.S. Pillay Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 237,
    name: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
    category: "Engineering",
    location: "Tiruvallur, Tamil Nadu",
    district: "Tiruvallur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 238,
    name: "Sri Venkateswara College of Engineering",
    category: "Engineering",
    location: "Kancheepuram, Tamil Nadu",
    district: "Kancheepuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 239,
    name: "KCG College of Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 240,
    name: "R.M.K. Engineering College",
    category: "Engineering",
    location: "Tiruvallur, Tamil Nadu",
    district: "Tiruvallur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 241,
    name: "Jerusalem College of Engineering",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 242,
    name: "Velammal Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 243,
    name: "Velammal Institute of Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 244,
    name: "Chennai Institute of Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 245,
    name: "Jeppiaar Engineering College",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 246,
    name: "St. Joseph's Institute of Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 247,
    name: "Loyola-ICAM College of Engineering and Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 248,
    name: "B.S. Abdur Rahman Crescent Institute of Science and Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 249,
    name: "Misrimal Navajee Munoth Jain Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 250,
    name: "Rajalakshmi Institute of Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 251,
    name: "Sri Sairam Institute of Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 252,
    name: "SRM Valliammai Engineering College",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 253,
    name: "Prathyusha Engineering College",
    category: "Engineering",
    location: "Tiruvallur, Tamil Nadu",
    district: "Tiruvallur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 254,
    name: "Sri Muthukumaran Institute of Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 255,
    name: "R.M.D. Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 256,
    name: "Aalim Muhammed Salegh College of Engineering",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 257,
    name: "S.K.R. Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 258,
    name: "Meenakshi Sundararajan Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 259,
    name: "S.A. Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 260,
    name: "Mohamed Sathak A.J. College of Engineering",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 261,
    name: "Adhiparasakthi Engineering College",
    category: "Engineering",
    location: "Ranipet, Tamil Nadu",
    district: "Ranipet",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 262,
    name: "Aarupadai Veedu Institute of Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 263,
    name: "University College of Engineering, Kanchipuram (Anna University)",
    category: "Engineering",
    location: "Kancheepuram, Tamil Nadu",
    district: "Kancheepuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 264,
    name: "Thanthai Periyar Government Institute of Technology",
    category: "Engineering",
    location: "Vellore, Tamil Nadu",
    district: "Vellore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 265,
    name: "Priyadarshini Engineering College",
    category: "Engineering",
    location: "Vellore, Tamil Nadu",
    district: "Vellore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 266,
    name: "Sri Narayana Engineering College",
    category: "Engineering",
    location: "Vellore, Tamil Nadu",
    district: "Vellore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 267,
    name: "M.A.M. College of Engineering",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 268,
    name: "K. Ramakrishnan College of Engineering",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 269,
    name: "Jayaram College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 270,
    name: "Kongunadu College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 271,
    name: "Anna University, Regional Campus - Tiruchirappalli",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 272,
    name: "University College of Engineering, Perambalur (Anna University)",
    category: "Engineering",
    location: "Perambalur, Tamil Nadu",
    district: "Perambalur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 273,
    name: "Vivekanandha College of Engineering",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 274,
    name: "Periyar Maniammai Institute of Science and Technology",
    category: "Engineering",
    location: "Thanjavur, Tamil Nadu",
    district: "Thanjavur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 275,
    name: "Kings College of Engineering",
    category: "Engineering",
    location: "Thanjavur, Tamil Nadu",
    district: "Thanjavur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 276,
    name: "A.V.C. College of Engineering",
    category: "Engineering",
    location: "Mayiladuthurai, Tamil Nadu",
    district: "Mayiladuthurai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 277,
    name: "K.L.N. College of Engineering",
    category: "Engineering",
    location: "Sivaganga, Tamil Nadu",
    district: "Sivaganga",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 278,
    name: "Velammal College of Engineering and Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 279,
    name: "Vaigai College of Engineering",
    category: "Engineering",
    location: "Madurai, Tamil Nadu",
    district: "Madurai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 280,
    name: "Kamaraj College of Engineering and Technology",
    category: "Engineering",
    location: "Virudhunagar, Tamil Nadu",
    district: "Virudhunagar",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 281,
    name: "P.S.R. Engineering College",
    category: "Engineering",
    location: "Virudhunagar, Tamil Nadu",
    district: "Virudhunagar",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 282,
    name: "Ramco Institute of Technology",
    category: "Engineering",
    location: "Virudhunagar, Tamil Nadu",
    district: "Virudhunagar",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 283,
    name: "Bharath Niketan Engineering College",
    category: "Engineering",
    location: "Theni, Tamil Nadu",
    district: "Theni",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 284,
    name: "National Engineering College",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 285,
    name: "St. Mother Theresa Engineering College",
    category: "Engineering",
    location: "Thoothukudi, Tamil Nadu",
    district: "Thoothukudi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 286,
    name: "Dr. G. U. Pope College of Engineering",
    category: "Engineering",
    location: "Thoothukudi, Tamil Nadu",
    district: "Thoothukudi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 287,
    name: "V.V. College of Engineering",
    category: "Engineering",
    location: "Thoothukudi, Tamil Nadu",
    district: "Thoothukudi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 288,
    name: "Francis Xavier Engineering College",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 289,
    name: "P.S.N. College of Engineering and Technology",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 290,
    name: "University V.O.C. College of Engineering",
    category: "Engineering",
    location: "Thoothukudi, Tamil Nadu",
    district: "Thoothukudi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 291,
    name: "Noorul Islam Centre for Higher Education",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 292,
    name: "St. Xavier's Catholic College of Engineering",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 293,
    name: "Cape Institute of Technology",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 294,
    name: "Ponjesly College of Engineering",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 295,
    name: "DMI College of Engineering",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 296,
    name: "Annie College of Engineering and Research Centre",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 297,
    name: "V.M.K.V. Engineering College",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 298,
    name: "Adhiyamaan College of Engineering",
    category: "Engineering",
    location: "Krishnagiri, Tamil Nadu",
    district: "Krishnagiri",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 299,
    name: "A.K. College of Engineering",
    category: "Engineering",
    location: "Krishnagiri, Tamil Nadu",
    district: "Krishnagiri",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 300,
    name: "University College of Engineering, Arni (Anna University)",
    category: "Engineering",
    location: "Tiruvannamalai, Tamil Nadu",
    district: "Tiruvannamalai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 301,
    name: "Sree Ayyappa Engineering College",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 302,
    name: "Builders Engineering College",
    category: "Engineering",
    location: "Tiruppur, Tamil Nadu",
    district: "Tiruppur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 303,
    name: "Cheran College of Engineering",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 304,
    name: "Park Global College of Engineering",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 305,
    name: "Sri Venkateswara Institute of Technology",
    category: "Engineering",
    location: "Krishnagiri, Tamil Nadu",
    district: "Krishnagiri",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 306,
    name: "Maharaja Institute of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 307,
    name: "SVS College of Engineering",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 308,
    name: "Excel College of Engineering and Technology",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 309,
    name: "Muthayammal College of Engineering",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 310,
    name: "K.S.R. College of Engineering",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 311,
    name: "Mahendra Institute of Engineering and Technology",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 312,
    name: "Kumarasamy College of Engineering",
    category: "Engineering",
    location: "Karur, Tamil Nadu",
    district: "Karur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 313,
    name: "Vivekanandha College of Engineering for Women",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 314,
    name: "N.P.R. College of Engineering and Technology",
    category: "Engineering",
    location: "Dindigul, Tamil Nadu",
    district: "Dindigul",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 315,
    name: "Mailam Engineering College",
    category: "Engineering",
    location: "Villupuram, Tamil Nadu",
    district: "Villupuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 316,
    name: "Idhaya Engineering College for Women",
    category: "Engineering",
    location: "Villupuram, Tamil Nadu",
    district: "Villupuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 317,
    name: "Anna University, Regional Campus - Villupuram",
    category: "Engineering",
    location: "Villupuram, Tamil Nadu",
    district: "Villupuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 318,
    name: "St. Anne's College of Engineering and Technology",
    category: "Engineering",
    location: "Cuddalore, Tamil Nadu",
    district: "Cuddalore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 319,
    name: "Ganesar College of Engineering",
    category: "Engineering",
    location: "Pudukkottai, Tamil Nadu",
    district: "Pudukkottai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 320,
    name: "Syed Ammal Engineering College",
    category: "Engineering",
    location: "Ramanathapuram, Tamil Nadu",
    district: "Ramanathapuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 321,
    name: "Mohamed Sathak Engineering College",
    category: "Engineering",
    location: "Ramanathapuram, Tamil Nadu",
    district: "Ramanathapuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 322,
    name: "Pandian Saraswathi Yadav Engineering College",
    category: "Engineering",
    location: "Virudhunagar, Tamil Nadu",
    district: "Virudhunagar",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 323,
    name: "University College of Engineering, Ariyalur (Anna University)",
    category: "Engineering",
    location: "Ariyalur, Tamil Nadu",
    district: "Ariyalur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 324,
    name: "University College of Engineering, Tiruvarur (Anna University)",
    category: "Engineering",
    location: "Tiruvarur, Tamil Nadu",
    district: "Tiruvarur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 325,
    name: "Madha College of Engineering",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 326,
    name: "Sir Issac Newton College of Engineering and Technology",
    category: "Engineering",
    location: "Nagapattinam, Tamil Nadu",
    district: "Nagapattinam",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 327,
    name: "Ultra College of Engineering and Technology for Women",
    category: "Engineering",
    location: "Madurai, Tamil Nadu",
    district: "Madurai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 328,
    name: "Sun College of Engineering and Technology",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 329,
    name: "Indian Engineering College",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 330,
    name: "Global Institute of Engineering and Technology",
    category: "Engineering",
    location: "Vellore, Tamil Nadu",
    district: "Vellore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 331,
    name: "C. Abdul Hakeem College of Engineering and Technology",
    category: "Engineering",
    location: "Ranipet, Tamil Nadu",
    district: "Ranipet",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 332,
    name: "Sri Ramanujar Engineering College",
    category: "Engineering",
    location: "Kanchipuram, Tamil Nadu",
    district: "Kanchipuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 333,
    name: "Meenakshi College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu, Tamil Nadu",
    district: "Tamil Nadu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 334,
    name: "Dhanalakshmi College of Engineering",
    category: "Engineering",
    location: "Tamil Nadu, Tamil Nadu",
    district: "Tamil Nadu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 335,
    name: "Bharath Institute of Higher Education and Research",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 336,
    name: "St. Peter's Institute of Higher Education and Research",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 337,
    name: "Jaya Sakthi Engineering College",
    category: "Engineering",
    location: "Kanchipuram, Tamil Nadu",
    district: "Kanchipuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 338,
    name: "Tagore Engineering College",
    category: "Engineering",
    location: "Tamil Nadu, Tamil Nadu",
    district: "Tamil Nadu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 339,
    name: "T.J. Institute of Technology",
    category: "Engineering",
    location: "Kanchipuram, Tamil Nadu",
    district: "Kanchipuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 340,
    name: "S.M.K. Fomra Institute of Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 341,
    name: "Sri Venkateswaraa College of Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 342,
    name: "Jeppiaar Institute of Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 343,
    name: "P.T. Lee Chengalvaraya Naicker College of Engineering and Technology",
    category: "Engineering",
    location: "Kancheepuram, Tamil Nadu",
    district: "Kancheepuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 344,
    name: "Sree Sastha Institute of Engineering and Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 345,
    name: "Panimalar Institute of Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 346,
    name: "G.K.M. College of Engineering and Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 347,
    name: "R.M.K. College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruvallur, Tamil Nadu",
    district: "Tiruvallur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 348,
    name: "Sri Chandrasekharendra Saraswathi Viswa Mahavidyalaya",
    category: "Engineering",
    location: "Kanchipuram, Tamil Nadu",
    district: "Kanchipuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 349,
    name: "Sri Balaji Chockalingam Engineering College",
    category: "Engineering",
    location: "Vellore, Tamil Nadu",
    district: "Vellore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 350,
    name: "Gnanamani College of Engineering",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 351,
    name: "Selvam College of Technology",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 352,
    name: "Pavai College of Technology",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 353,
    name: "Anna University, Regional Campus - Madurai",
    category: "Engineering",
    location: "Madurai, Tamil Nadu",
    district: "Madurai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 354,
    name: "Anand Institute of Higher Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 355,
    name: "Narayanaguru College of Engineering",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 356,
    name: "Mar Ephraem College of Engineering and Technology",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 357,
    name: "Arunachala College of Engineering for Women",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 358,
    name: "S.K.P. Engineering College",
    category: "Engineering",
    location: "Tiruvannamalai, Tamil Nadu",
    district: "Tiruvannamalai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 359,
    name: "Government College of Engineering, Dharmapuri",
    category: "Engineering",
    location: "Dharmapuri, Tamil Nadu",
    district: "Dharmapuri",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 360,
    name: "Government College of Engineering, Tenkasi",
    category: "Engineering",
    location: "Tenkasi, Tamil Nadu",
    district: "Tenkasi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 361,
    name: "University College of Engineering, Panruti (Anna University)",
    category: "Engineering",
    location: "Cuddalore, Tamil Nadu",
    district: "Cuddalore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 362,
    name: "University College of Engineering, Tenkasi (Anna University)",
    category: "Engineering",
    location: "Tenkasi, Tamil Nadu",
    district: "Tenkasi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 363,
    name: "University College of Engineering, Theni (Anna University)",
    category: "Engineering",
    location: "Theni, Tamil Nadu",
    district: "Theni",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 364,
    name: "University College of Engineering, Pattukkottai (Anna University)",
    category: "Engineering",
    location: "Thanjavur, Tamil Nadu",
    district: "Thanjavur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 365,
    name: "Anna University, Regional Campus - Konam (Nagercoil)",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 366,
    name: "Anna University, Regional Campus - Tirunelveli",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 367,
    name: "Anna University, Regional Campus - Ramanathapuram",
    category: "Engineering",
    location: "Ramanathapuram, Tamil Nadu",
    district: "Ramanathapuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 368,
    name: "Anna University, Regional Campus - Salem",
    category: "Engineering",
    location: "Salem, Tamil Nadu",
    district: "Salem",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 369,
    name: "University College of Engineering, Tindivanam (Anna University)",
    category: "Engineering",
    location: "Villupuram, Tamil Nadu",
    district: "Villupuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 370,
    name: "Indian Institute of Information Technology Design and Manufacturing, Kancheepuram",
    category: "Engineering",
    location: "Kancheepuram, Tamil Nadu",
    district: "Kancheepuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 371,
    name: "SASTRA Deemed University",
    category: "Engineering",
    location: "Thanjavur, Tamil Nadu",
    district: "Thanjavur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 372,
    name: "Annamalai University, Faculty of Engineering and Technology",
    category: "Engineering",
    location: "Cuddalore, Tamil Nadu",
    district: "Cuddalore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 373,
    name: "Government College of Engineering, Tirunelveli",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 374,
    name: "Government College of Engineering, Thanjavur",
    category: "Engineering",
    location: "Thanjavur, Tamil Nadu",
    district: "Thanjavur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 375,
    name: "Government College of Engineering, Dharapuram",
    category: "Engineering",
    location: "Tiruppur, Tamil Nadu",
    district: "Tiruppur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 376,
    name: "Government College of Engineering, Bargur",
    category: "Engineering",
    location: "Krishnagiri, Tamil Nadu",
    district: "Krishnagiri",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 377,
    name: "Government College of Engineering, Dindigul",
    category: "Engineering",
    location: "Dindigul, Tamil Nadu",
    district: "Dindigul",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 378,
    name: "Government College of Engineering, Karur",
    category: "Engineering",
    location: "Karur, Tamil Nadu",
    district: "Karur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 379,
    name: "University College of Engineering, Ramanathapuram (Anna University)",
    category: "Engineering",
    location: "Ramanathapuram, Tamil Nadu",
    district: "Ramanathapuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 380,
    name: "Sr. Mepco group college - Alagappa Chettiar Government College of Engineering and Technology",
    category: "Engineering",
    location: "Sivaganga, Tamil Nadu",
    district: "Sivaganga",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 381,
    name: "Sudharsan Engineering College",
    category: "Engineering",
    location: "Pudukkottai, Tamil Nadu",
    district: "Pudukkottai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 382,
    name: "Mother Terasa College of Engineering and Technology",
    category: "Engineering",
    location: "Pudukkottai, Tamil Nadu",
    district: "Pudukkottai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 383,
    name: "Sardar Raja College of Engineering",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 384,
    name: "SRM Institute of Science and Technology, Ramapuram Campus",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 385,
    name: "Latha Mathavan Engineering College",
    category: "Engineering",
    location: "Madurai, Tamil Nadu",
    district: "Madurai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 386,
    name: "New Prince Shri Bhavani College of Engineering and Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 387,
    name: "Prince Shri Venkateshwara Padmavathy Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 388,
    name: "AMET University",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 389,
    name: "Sri Subramanya College of Engineering and Technology",
    category: "Engineering",
    location: "Dindigul, Tamil Nadu",
    district: "Dindigul",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 390,
    name: "Jaya College of Engineering",
    category: "Engineering",
    location: "Kanchipuram, Tamil Nadu",
    district: "Kanchipuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 391,
    name: "Karpaga Vinayaga College of Engineering and Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 392,
    name: "Jeppiaar SRR Engineering College",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 393,
    name: "PGP College of Engineering and Technology",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 394,
    name: "Arasu Engineering College",
    category: "Engineering",
    location: "Thanjavur, Tamil Nadu",
    district: "Thanjavur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 395,
    name: "K.S.K. College of Engineering and Technology",
    category: "Engineering",
    location: "Thanjavur, Tamil Nadu",
    district: "Thanjavur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 396,
    name: "Vivekanandha College of Technology for Women",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 397,
    name: "Loyola Institute of Technology",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 398,
    name: "R.V.S. School of Engineering and Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 399,
    name: "Sree Sowdambika College of Engineering",
    category: "Engineering",
    location: "Virudhunagar, Tamil Nadu",
    district: "Virudhunagar",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 400,
    name: "A.K.T. Memorial College of Engineering and Technology",
    category: "Engineering",
    location: "Kallakurichi, Tamil Nadu",
    district: "Kallakurichi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 401,
    name: "KG College of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 402,
    name: "Angappa College of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 403,
    name: "Sasurie Academy of Engineering",
    category: "Engineering",
    location: "Tiruppur, Tamil Nadu",
    district: "Tiruppur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 404,
    name: "Sakthi Institute of Technology",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 405,
    name: "Sengunthar College of Engineering",
    category: "Engineering",
    location: "Namakkal, Tamil Nadu",
    district: "Namakkal",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 406,
    name: "Vetri Vinayaha College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 407,
    name: "J.J. College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 408,
    name: "M.I.E.T. Engineering College",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 409,
    name: "Imayam College of Engineering",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 410,
    name: "P.T.R. College of Engineering and Technology",
    category: "Engineering",
    location: "Madurai, Tamil Nadu",
    district: "Madurai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 411,
    name: "Madurai Institute of Engineering and Technology",
    category: "Engineering",
    location: "Madurai, Tamil Nadu",
    district: "Madurai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 412,
    name: "Ponnaiyah Ramajayam Institute of Science and Technology (PRIST)",
    category: "Engineering",
    location: "Thanjavur, Tamil Nadu",
    district: "Thanjavur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 413,
    name: "Chettinad College of Engineering and Technology",
    category: "Engineering",
    location: "Karur, Tamil Nadu",
    district: "Karur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 414,
    name: "Vidhyaa Vikas College of Engineering and Technology",
    category: "Engineering",
    location: "Tiruppur, Tamil Nadu",
    district: "Tiruppur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 415,
    name: "Bethlahem Institute of Engineering",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 416,
    name: "Einstein College of Engineering",
    category: "Engineering",
    location: "Tirunelveli, Tamil Nadu",
    district: "Tirunelveli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 417,
    name: "The Rajaas Engineering College",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 418,
    name: "Dr. Sivanthi Aditanar College of Engineering",
    category: "Engineering",
    location: "Thoothukudi, Tamil Nadu",
    district: "Thoothukudi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 419,
    name: "Unnamalai Institute of Technology",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 420,
    name: "Sri Vidya College of Engineering and Technology",
    category: "Engineering",
    location: "Virudhunagar, Tamil Nadu",
    district: "Virudhunagar",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 421,
    name: "V.P.M.M. Engineering College for Women",
    category: "Engineering",
    location: "Virudhunagar, Tamil Nadu",
    district: "Virudhunagar",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 422,
    name: "E.S. Engineering College",
    category: "Engineering",
    location: "Kallakurichi, Tamil Nadu",
    district: "Kallakurichi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 423,
    name: "Government College of Engineering, Villupuram",
    category: "Engineering",
    location: "Villupuram, Tamil Nadu",
    district: "Villupuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 424,
    name: "Dr. K.N.M. Engineering College",
    category: "Engineering",
    location: "Kallakurichi, Tamil Nadu",
    district: "Kallakurichi",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 425,
    name: "Vel Tech Multi Tech Engineering College",
    category: "Engineering",
    location: "Tiruvallur, Tamil Nadu",
    district: "Tiruvallur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 426,
    name: "Jaya Engineering College",
    category: "Engineering",
    location: "Tamil Nadu, Tamil Nadu",
    district: "Tamil Nadu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 427,
    name: "Dhanalakshmi Srinivasan College of Engineering, Perambalur",
    category: "Engineering",
    location: "Perambalur, Tamil Nadu",
    district: "Perambalur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 428,
    name: "Dhaanish Ahmed College of Engineering",
    category: "Engineering",
    location: "Kanchipuram, Tamil Nadu",
    district: "Kanchipuram",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 429,
    name: "Agni College of Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 430,
    name: "Valliammai Institute of Technology",
    category: "Engineering",
    location: "Chengalpattu, Tamil Nadu",
    district: "Chengalpattu",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 431,
    name: "Madha Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 432,
    name: "Alagappa College of Technology (ACT), Anna University",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 433,
    name: "Krishnasamy College of Engineering and Technology",
    category: "Engineering",
    location: "Cuddalore, Tamil Nadu",
    district: "Cuddalore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 434,
    name: "M.R.K. Institute of Technology",
    category: "Engineering",
    location: "Cuddalore, Tamil Nadu",
    district: "Cuddalore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 435,
    name: "K.S.R. Institute for Engineering and Technology",
    category: "Engineering",
    location: "Erode, Tamil Nadu",
    district: "Erode",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 436,
    name: "Shivani Engineering College",
    category: "Engineering",
    location: "Tiruchirappalli, Tamil Nadu",
    district: "Tiruchirappalli",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 437,
    name: "Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College",
    category: "Engineering",
    location: "Tiruvallur, Tamil Nadu",
    district: "Tiruvallur",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 438,
    name: "Sri Lakshmi Ammal Engineering College",
    category: "Engineering",
    location: "Chennai, Tamil Nadu",
    district: "Chennai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 439,
    name: "Jansi Engineering College",
    category: "Engineering",
    location: "Vellore, Tamil Nadu",
    district: "Vellore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 440,
    name: "Kingston Engineering College",
    category: "Engineering",
    location: "Vellore, Tamil Nadu",
    district: "Vellore",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 441,
    name: "Anjalai Ammal Mahalingam Engineering College",
    category: "Engineering",
    location: "Mayiladuthurai, Tamil Nadu",
    district: "Mayiladuthurai",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  },
  {
    id: 442,
    name: "T.S.M. Jain College of Technology",
    category: "Engineering",
    location: "Kanyakumari, Tamil Nadu",
    district: "Kanyakumari",
    type: "Verify with institution",
    affiliation: "Verify with institution",
    courses: [["B.E. / B.Tech programs", "4 Years", "Verify with college"]],
  }
];
/* =========================
   HELPERS
========================= */

const normName = (name) => (name || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const orderedDefaultColleges = (() => {
  const seen = new Set();
  return [...collegeData, ...additionalCollegeData]
    .map((college) => makeCollege(college))
    .filter((college) => {
      const key = normName(college.name);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
})();

const readJSON = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

// Registered/saved colleges come first; default colleges with the same name are dropped (no duplicates).
const mergeColleges = (saved) => {
  const savedList = Array.isArray(saved) ? saved.filter((c) => c && c.name) : [];
  const seen = new Set();
  const result = [];
  [...savedList, ...orderedDefaultColleges].forEach((college) => {
    const key = normName(college.name);
    if (seen.has(key)) return;
    seen.add(key);
    result.push(college);
  });
  return result;
};

// Verified official contact details collected from the institutions' own websites / official institutional pages.
// Do not add guessed phone numbers, emails, websites, or logos here.
const verifiedCollegeContacts = {
  "Adithya Institute of Technology": {
    website: "https://www.adithyatech.edu.in/",
    email: "aitprincipal@adithyatech.edu.in",
    phone: "0422-2654545",
  },
  "Akshaya College of Engineering and Technology": {
    website: "https://www.acetcbe.edu.in/",
    email: "info@acetcbe.edu.in",
    phone: "04259-242570",
  },
  "Angel College of Engineering and Technology": {
    website: "https://angelengg.edu.in/",
    email: "info@angelengg.edu.in",
    phone: "0421-2357777",
  },
  "Apollo College of Nursing": {
    website: "https://apollonursingeducation.com/",
    email: "apollonursing@vsnl.net",
    phone: "044-26534383",
  },
  "AVS College of Arts and Science": {
    website: "https://www.avscollege.ac.in/",
    email: "principal@avscollege.ac.in",
    phone: "0427-2912435",
  },
  "AVS Engineering College": {
    website: "https://avsengg.ac.in/",
    email: "principal@avsengg.ac.in",
    phone: "0427-2442435",
  },
  "CBM College": {
    website: "https://cbmcollege.ac.in/",
    email: "cbmcollegecbe@gmail.com",
    phone: "0422-2578550",
  },
  "Chikkaiah Naicker College": {
    website: "https://cncollege.edu.in/",
    email: "cncerode@gmail.com",
    phone: "0424-2212726",
  },
  "Chikkanna Government Arts College": {
    website: "https://www.cgac.in/",
    email: "cgactpr@gmail.com",
    phone: "0421-2241103",
  },
  "Coimbatore Institute of Engineering and Technology": {
    website: "https://www.cietcbe.edu.in/",
    email: "info@cietcbe.edu.in",
    phone: "0422-2970703",
  },
  "Coimbatore Medical College": {
    website: "https://coimbatoremedicalcollege.tn.gov.in/",
    email: "deancmccbe@gmail.com",
    phone: "0422-2314518",
  },
  "College of Engineering, Guindy (Anna University)": {
    website: "https://ceg.annauniv.edu/",
    email: "dircmdsr@annauniv.edu",
    phone: "+91-44-22537993 / 7994 / 7995",
  },
  "Dr. Ambedkar Government Law College": {
    website: "https://draglc.ac.in/",
    email: "draglcchennai@gmail.com",
    phone: "044-25340905",
  },
  "Dr. G.R. Damodaran College of Science": {
    website: "https://www.grd.org/grdcs",
    email: "grdcs@grd.org",
    phone: "0422-2591863",
  },
  "Dr. M.G.R. Educational and Research Institute": {
    website: "https://drmgrdu.ac.in/",
    email: "contact@drmgrdu.ac.in",
    phone: "044-23782176 / 23782186",
  },
  "Easa College of Engineering and Technology": {
    website: "https://easacollege.com/",
    email: "easaecet@gmail.com",
    phone: "0422-2656871",
  },
  "Erode Arts and Science College": {
    website: "https://easc.ac.in/",
    email: "erodearts@gmail.com",
    phone: "0424-2258442",
  },
  "ESIC Medical College and PGIMSR, Coimbatore": {
    website: "https://www.esic.gov.in/",
    email: "deanmc-coimbatore@esic.nic.in",
    phone: "0422-2574323",
  },
  "Gobi Arts & Science College": {
    website: "https://gascgobi.org/",
    email: "gobiartscollege@gascgobi.org",
    phone: "04285-240147",
  },
  "Government Arts College, Salem": {
    website: "https://gacsalem7.ac.in/",
    email: "principalgacslm7@gmail.com",
    phone: "0427-2413273",
  },
  "Government Arts College, Udumalpet": {
    website: "https://www.gacudpt.in/",
    email: "principal@gacudpt.in",
    phone: "04252-241151",
  },
  "Government College of Nursing, Coimbatore": {
    website: "https://coimbatoremedicalcollege.tn.gov.in/",
    email: "deancmccbe@gmail.com",
    phone: "0422-2314518",
  },
  "Government College of Nursing, Madras Medical College": {
    website: "https://mmc.tn.gov.in/",
    email: "deanmmc@tn.gov.in",
    phone: "044-25305112",
  },
  "Government College of Nursing, Salem": {
    website: "https://gmkcmc.ac.in/",
    email: "deangmkcmc@gmail.com",
    phone: "0427-2383313",
  },
  "Government Erode Medical College and Hospital": {
    website: "https://gemch.edu.in/",
    email: "deanirtperundurai@gmail.com",
    phone: "04294-220252",
  },
  "Government Law College, Coimbatore": {
    website: "https://glccbe.ac.in/",
    email: "glccbe@yahoo.com",
    phone: "0422-2422454",
  },
  "Government Medical College, Tiruppur": {
    website: "https://gmctpr.edu.in/",
    email: "deangmctpr@gmail.com",
    phone: "0421-2234333",
  },
  "Government Mohan Kumaramangalam Medical College": {
    website: "https://gmkcmc.ac.in/",
    email: "deangmkcmc@gmail.com",
    phone: "0427-2383313",
  },
  "Government Siddha Medical College": {
    website: "https://gsmcchennai.com/",
    email: "gsmc.chennai@gmail.com",
    phone: "044-26211461",
  },
  "Great Lakes Institute of Management": {
    website: "https://www.greatlakes.edu.in/",
    email: "info@greatlakes.edu.in",
    phone: "+91-44-27489000",
  },
  "Guru Nanak College": {
    website: "https://gurunanakcollege.edu.in/",
    email: "principal@gurunanakcollege.edu.in",
    phone: "044-22451746 / 22444621",
  },
  "Hindusthan Institute of Technology": {
    website: "https://hit.edu.in/",
    email: "hitprincipal@hindusthan.net",
    phone: "0422-2610966",
  },
  "Indian Institute of Technology Madras": {
    website: "https://www.iitm.ac.in/",
    email: "registrar@iitm.ac.in",
    phone: "044-2257-8101",
  },
  "Info Institute of Engineering": {
    website: "https://infoengg.edu.in/",
    email: "info@infoengg.edu.in",
    phone: "0422-2654853",
  },
  "Jai Shriram Engineering College": {
    website: "https://www.jayshriram.edu.in/",
    email: "info@jayshriram.edu.in",
    phone: "0421-2313335",
  },
  "Jairam Arts and Science College": {
    website: "https://jairamcolleges.com/",
    email: "jairamarts019@gmail.com",
    phone: "0427-2480355",
  },
  "Jansons Institute of Technology": {
    website: "https://www.jit.ac.in/",
    email: "info@jit.ac.in",
    phone: "0421-2264900",
  },
  "Kalaignar Karunanidhi Institute of Technology": {
    website: "https://kitcbe.com/",
    email: "kitprincipal@kitcbe.com",
    phone: "0422-2367800",
  },
  "Kilpauk Medical College": {
    website: "https://gkmc.in/",
    email: "dean@gkmc.in",
    phone: "044-28364949",
  },
  "Kongu Arts and Science College": {
    website: "https://www.kasc.ac.in/",
    email: "principal@kasc.ac.in",
    phone: "0424-2242880",
  },
  "Kovai Kalaimagal College of Arts and Science": {
    website: "https://kkcas.edu.in/",
    email: "kkcas@kkcas.edu.in",
    phone: "0422-2970131",
  },
  "Madras Institute of Technology (Anna University)": {
    website: "https://mitindia.edu/",
    email: "cchead@mitindia.edu",
    phone: "044-22516008",
  },
  "Madras Medical College": {
    website: "https://mmc.tn.gov.in/",
    email: "deanmmc@tn.gov.in",
    phone: "044-25305112",
  },
  "Madras School of Social Work": {
    website: "https://mssw.in/",
    email: "principal@mssw.in",
    phone: "044-28194566 / 28195126",
  },
  "Maharaja Engineering College": {
    website: "https://www.maharaja.in/",
    email: "mec@maharaja.in",
    phone: "0421-2555541",
  },
  "Nandha Arts and Science College": {
    website: "https://www.nandhaarts.org/",
    email: "principal@nandhaarts.org",
    phone: "04294-222788",
  },
  "Nandha College of Pharmacy": {
    website: "https://www.nandhapharmacy.org/",
    email: "principal@nandhapharmacy.org",
    phone: "04294-224611",
  },
  "Nandha College of Technology": {
    website: "https://www.nandhatech.org/",
    email: "principal@nandhatech.org",
    phone: "04294-222116",
  },
  "Nehru Arts and Science College": {
    website: "https://www.nehrucolleges.org/",
    email: "nascprincipal@nehrucolleges.com",
    phone: "0422-2252405",
  },
  "Nehru Institute of Technology": {
    website: "https://nitcoimbatore.ac.in/",
    email: "nitprincipal@nehrucolleges.com",
    phone: "0422-2656541",
  },
  "Nirmala College for Women": {
    website: "https://nirmalacollegeonline.ac.in/",
    email: "nirmalacollege@rediffmail.com",
    phone: "0422-2223469",
  },
  "Pachaiyappa's College": {
    website: "https://pachaiyappascollege.edu.in/",
    email: "pachaiyappas@gmail.com",
    phone: "044-26412844",
  },
  "Panimalar Engineering College": {
    website: "https://www.panimalar.ac.in/",
    email: "info@panimalar.ac.in",
    phone: "+91-44-26490404 / 0505 / 0717",
  },
  "Park College of Engineering and Technology": {
    website: "https://pcet.ac.in/",
    email: "info@park.ac.in",
    phone: "0421-2905555",
  },
  "Patrician College of Arts and Science": {
    website: "https://www.patriciancollege.ac.in/",
    email: "director@patriciancollege.ac.in",
    phone: "044-24401362",
  },
  "Presidency College": {
    website: "https://www.pcc.ac.in/",
    email: "contactus@pcc.ac.in",
    phone: "044-28544894",
  },
  "Quaid-e-Millath Government College for Women": {
    website: "https://qmgcw.edu.in/",
    email: "qmgcwchennai@gmail.com",
    phone: "044-28520793",
  },
  "Queen Mary's College": {
    website: "https://queenmaryscollege.edu.in/",
    email: "qmcchennai@gmail.com",
    phone: "044-28444995",
  },
  "Rajalakshmi Engineering College": {
    website: "https://www.rajalakshmi.org/",
    email: "admin@rajalakshmi.edu.in",
    phone: "+91-44-67181111 / 67181112",
  },
  "Rathinam Technical Campus": {
    website: "https://www.rathinamtechnicalcampus.com/",
    email: "info@rathinam.in",
    phone: "0422-4040900",
  },
  "Rathnavel Subramaniam College of Arts and Science": {
    website: "https://www.rvscas.ac.in/",
    email: "info@rvsgroup.com",
    phone: "0422-2687603",
  },
  "S.D.N.B. Vaishnav College for Women": {
    website: "https://www.sdnbvc.edu.in/",
    email: "info@sdnbvc.edu.in",
    phone: "044-22655450",
  },
  "Sasurie College of Engineering": {
    website: "https://sasurie.com/",
    email: "principal.sce@sasurie.com",
    phone: "04256-256399",
  },
  "Sathyabama Institute of Science and Technology": {
    website: "https://www.sathyabama.ac.in/",
    email: "registrar@sathyabama.ac.in",
    phone: "044-2450-3150 / 51 / 52 / 54 / 55",
  },
  "Saveetha Engineering College": {
    website: "https://saveetha.ac.in/",
    email: "admission@saveetha.ac.in",
    phone: "+91-8939902737 / 044-66726690",
  },
  "Shri Sakthikailassh Women's College": {
    website: "https://sakthikailassh.org/",
    email: "principal@sakthikailassh.org",
    phone: "0427-2240555",
  },
  "SNS College of Engineering": {
    website: "https://snsce.ac.in/",
    email: "office@snsce.ac.in",
    phone: "0422-2666264",
  },
  "Sona College of Arts and Science": {
    website: "https://www.sonacas.edu.in/",
    email: "principal@sonacas.edu.in",
    phone: "0427-4099977",
  },
  "Sree Balaji Medical College and Hospital": {
    website: "https://www.sbmch.ac.in/",
    email: "info@sbmch.ac.in",
    phone: "044-22415600",
  },
  "Sri Guru Institute of Technology": {
    website: "https://sriguru.ac.in/",
    email: "info@sriguru.ac.in",
    phone: "0422-2656600",
  },
  "Sri GVG Visalakshi College for Women": {
    website: "https://gvgvc.ac.in/",
    email: "gvgprincipal@gmail.com",
    phone: "04252-223019",
  },
  "Sri Krishna Adithya College of Arts and Science": {
    website: "https://www.skacas.ac.in/",
    email: "info@skacas.ac.in",
    phone: "0422-2622437",
  },
  "Sri Ramakrishna College of Arts and Science": {
    website: "https://www.srcas.ac.in/",
    email: "principal@srcas.ac.in",
    phone: "0422-2562788",
  },
  "Sri Ramakrishna Mission Vidyalaya College of Arts and Science": {
    website: "https://srmvcas.org/",
    email: "srmvcascbe@gmail.com",
    phone: "0422-2692461",
  },
  "Sri Sairam Engineering College": {
    website: "https://sairam.edu.in/",
    email: "sairam@sairam.edu.in",
    phone: "+91-44-22512111 / 22512333 / 22512222 / 22512444",
  },
  "Sri Vasavi College": {
    website: "https://srivasavicollege.ac.in/",
    email: "svccollegeode@gmail.com",
    phone: "0424-2533542",
  },
  "SRM Medical College Hospital and Research Centre": {
    website: "https://medical.srmist.edu.in/",
    email: "dean.medical.ktr@srmist.edu.in",
    phone: "+91-7026472647 / 044-67000000",
  },
  "SSN College of Engineering": {
    website: "https://www.ssn.edu.in/",
    email: "info@ssn.edu.in",
    phone: "+91-44-2746-9700",
  },
  "St. Joseph's College of Engineering": {
    website: "https://www.stjosephs.ac.in/",
    email: "coe@stjosephs.ac.in",
    phone: "044-24500053",
  },
  "Stanley Medical College": {
    website: "https://www.stanleymedicalcollege.in/",
    email: "statepgadmissionsmc20@gmail.com",
    phone: "044-25287855",
  },
  "Stella Maris College": {
    website: "https://stellamariscollege.edu.in/",
    email: "smc@md3.vsnl.net.in",
    phone: "044-28111987 / 28111951",
  },
  "Tamil Nadu Government Dental College and Hospital": {
    website: "https://tngdc.ac.in/",
    email: "deantngdc@gmail.com",
    phone: "044-25340411",
  },
  "Tamilnadu College of Engineering": {
    website: "https://www.tnce.in/",
    email: "tnceprincipal@gmail.com",
    phone: "0421-2905051",
  },
  "Tiruppur Kumaran College for Women": {
    website: "https://tkcw.ac.in/",
    email: "tkcw_principal@yahoo.co.in",
    phone: "0421-2422234",
  },
  "Velalar College of Nursing": {
    website: "https://velalarnursing.com/",
    email: "vcon_erode@yahoo.com",
    phone: "0424-2244101",
  },
  "Velalar Medical College and Hospital": {
    website: "https://velalarmedical.com/",
    email: "info@velalarmedical.com",
    phone: "0424-2244102",
  },
  "Vels Institute of Science, Technology & Advanced Studies": {
    website: "https://vistas.ac.in/",
    email: "vels@vistas.ac.in",
    phone: "+91-44-22662503 / 2501 / 2502",
  },
  "Vinayaka Mission's College of Nursing": {
    website: "https://vinayakamission.com/",
    email: "vmrf@vmu.edu.in",
    phone: "0427-2520700",
  },
  "Vinayaka Mission's College of Pharmacy": {
    website: "https://vinayakamission.com/",
    email: "vmrf@vmu.edu.in",
    phone: "0427-2520700",
  },
  "Vinayaka Mission's Kirupananda Variyar Engineering College": {
    website: "https://vinayakamission.com/",
    email: "vmrf@vmu.edu.in",
    phone: "0427-2520700",
  },
  "Vinayaka Mission's Kirupananda Variyar Medical College and Hospitals": {
    website: "https://vinayakamission.com/",
    email: "vmrf@vmu.edu.in",
    phone: "0427-2520700",
  },
  "Vinayaka Mission's Research Foundation (Deemed University)": {
    website: "https://vinayakamission.com/",
    email: "vmrf@vmu.edu.in",
    phone: "0427-2520700",
  },
  "Vinayaka Mission's Sankarachariyar Dental College": {
    website: "https://vinayakamission.com/",
    email: "vmrf@vmu.edu.in",
    phone: "0427-2520700",
  },
  "VIT Chennai": {
    website: "https://chennai.vit.ac.in/",
    email: "admin.chennai@vit.ac.in",
    phone: "044-3993-1555",
  },
  "Vysya College": {
    website: "https://vysyacollege.ac.in/",
    email: "principal@vysyacollege.ac.in",
    phone: "0427-2240107",
  },
  "Government College of Engineering, Villupuram": {
    website: "https://www.aucev.edu.in/",
    email: "aucev_principal@yahoo.com",
    phone: "04146-224500",
  },
  "Government College of Engineering, Dharmapuri": {
    website: "https://gcedpi.edu.in/",
    email: "principalgcedpi@gmail.com",
    phone: "04342-290090",
  },
  "Government College of Engineering, Bargur": {
    website: "https://gcebargur.ac.in/",
    email: "principal@gcebargur.ac.in",
    phone: "04343-266067",
  },
  "Government College of Engineering, Dharapuram": {
    website: "https://gct.ac.in/",
    email: "principal@gct.ac.in",
    phone: "0422-2432221",
  },
  "Anna University Regional Campus - Coimbatore": {
    website: "",
    email: "deancoimbatore@annauniv.edu",
    phone: "0422-2984002",
  },
  "Arjun College of Technology": {
    website: "https://www.actechnology.in/",
    email: "info@actechnology.in",
    phone: "04259-200200",
  },
  "Asian College of Engineering and Technology": {
    website: "https://acetcbe.in/",
    email: "acetcoimbatore@gmail.com",
    phone: "0422-2654495",
  },
  "C M S College of Engineering and Technology": {
    website: "https://cmscollege.edu.in/cet/",
    email: "info.cmscet@cmscollege.edu.in",
    phone: "0422-2636050",
  },
  "Christ The King Engineering College": {
    website: "https://www.ckec.ac.in/",
    email: "contact@ckec.ac.in",
    phone: "+91-9445008362",
  },
  "Dhaanish Ahmed Institute of Technology": {
    website: "",
    email: "info@dait.edu.in",
    phone: "0422-7179000",
  },
  "JCT College of Engineering and Technology": {
    website: "https://jct.ac.in/",
    email: "info@jct.ac.in",
    phone: "0422-2636900",
  },
  "Karpagam Institute of Technology": {
    website: "https://karpagamtech.ac.in/",
    email: "info@karpagamtech.ac.in",
    phone: "0422-2635600",
  },
  "P A College of Engineering and Technology": {
    website: "",
    email: "pacetcoimbatore@gmail.com",
    phone: "04259-221387",
  },
  "Park College of Technology": {
    website: "https://www.pct.ac.in/",
    email: "pctprincipal@park.ac.in",
    phone: "0421-2910200",
  },
  "PPG Institute of Technology": {
    website: "",
    email: "ppgit@ppg.edu.in",
    phone: "0422-2252525",
  },
  "R V S Technical Campus Coimbatore": {
    website: "https://www.rvstcc.ac.in/",
    email: "rvsetgi@rvsgroup.com",
    phone: "0422-2681123",
  },
  "Sree Sakthi Engineering College": {
    website: "https://www.sreesakthi.edu.in/",
    email: "ceo@sreesakthi.edu.in",
    phone: "+91-9244504444",
  },
  "Sri Sai Ranganathan Engineering College": {
    website: "",
    email: "principal@ssrec.in",
    phone: "04259-200300",
  },
  "Studyworld College of Engineering": {
    website: "",
    email: "info@swech.edu.in",
    phone: "0422-2636250",
  },
  "United Institute of Technology": {
    website: "https://uit.ac.in/",
    email: "info@uit.ac.in",
    phone: "0422-2692020",
  },

};

// Details imported from all_colleges_comprehensive_profile.csv.
// These values are used only to fill fields that are missing or still marked as placeholders.
const csvCollegeDetails = {
  "presidencycollege": {
    "website": "www.pcc.ac.in",
    "email": "contactus@pcc.ac.in",
    "phone": "044-28544894",
    "established": "1840",
    "counsellingCode": "101"
  },
  "queenmaryscollege": {
    "website": "queenmaryscollege.edu.in",
    "email": "qmcchennai@gmail.com",
    "phone": "044-28444995",
    "established": "1914",
    "counsellingCode": "102"
  },
  "pachaiyappascollege": {
    "website": "pachaiyappascollege.edu.in",
    "email": "pachaiyappas@gmail.com",
    "phone": "044-26412844",
    "established": "1842",
    "counsellingCode": "105"
  },
  "sdnbvaishnavcollegeforwomen": {
    "website": "www.sdnbvc.edu.in",
    "email": "info@sdnbvc.edu.in",
    "phone": "044-22655450",
    "established": "1968",
    "counsellingCode": "133"
  },
  "quaidemillathgovernmentcollegeforwomen": {
    "website": "www.quaid-e-millath.edu.in",
    "email": "info@quaid-e-millath.edu.in",
    "phone": "0422-261005",
    "established": "1985",
    "counsellingCode": "1005"
  },
  "patriciancollegeofartsandscience": {
    "website": "www.patriciancolleg.edu.in",
    "email": "info@patriciancolleg.edu.in",
    "phone": "0422-261006",
    "established": "1986",
    "counsellingCode": "1006"
  },
  "madrasmedicalcollege": {
    "website": "mmc.tn.gov.in",
    "email": "deanmmc@tn.gov.in",
    "phone": "044-25305112",
    "established": "1835",
    "counsellingCode": "Medical-001"
  },
  "stanleymedicalcollege": {
    "website": "www.stanleymedicalcollege.in",
    "email": "statepgadmissionsmc20@gmail.com",
    "phone": "044-25287855",
    "established": "1938",
    "counsellingCode": "Medical-002"
  },
  "kilpaukmedicalcollege": {
    "website": "www.gkmc.in",
    "email": "dean@gkmc.in",
    "phone": "044-28364949",
    "established": "1960",
    "counsellingCode": "Medical-003"
  },
  "sreebalajimedicalcollegeandhospital": {
    "website": "www.sreebalajimedic.edu.in",
    "email": "info@sreebalajimedic.edu.in",
    "phone": "0422-261010",
    "established": "1990",
    "counsellingCode": "1010"
  },
  "tamilnadugovernmentdentalcollegeandhospital": {
    "website": "www.tamilnadugovern.edu.in",
    "email": "info@tamilnadugovern.edu.in",
    "phone": "0422-261011",
    "established": "1991",
    "counsellingCode": "1011"
  },
  "governmentsiddhamedicalcollege": {
    "website": "www.governmentsiddh.edu.in",
    "email": "info@governmentsiddh.edu.in",
    "phone": "0422-261012",
    "established": "1992",
    "counsellingCode": "1012"
  },
  "apollocollegeofnursing": {
    "website": "www.apollocollegeof.edu.in",
    "email": "info@apollocollegeof.edu.in",
    "phone": "0422-261013",
    "established": "1993",
    "counsellingCode": "1013"
  },
  "governmentcollegeofnursingmadrasmedicalcollege": {
    "website": "mmc.tn.gov.in",
    "email": "deanmmc@tn.gov.in",
    "phone": "044-25305112",
    "established": "1835",
    "counsellingCode": "Medical-001"
  },
  "drambedkargovernmentlawcollege": {
    "website": "www.dr.ambedkargove.edu.in",
    "email": "info@dr.ambedkargove.edu.in",
    "phone": "0422-261015",
    "established": "1995",
    "counsellingCode": "1015"
  },
  "coimbatoreinstituteofengineeringandtechnology": {
    "website": "www.cietcbe.edu.in",
    "email": "info@cietcbe.edu.in",
    "phone": "0422-2970703",
    "established": "2001",
    "counsellingCode": "2704"
  },
  "snscollegeofengineering": {
    "website": "snsce.ac.in",
    "email": "office@snsce.ac.in",
    "phone": "0422-2666264",
    "established": "2007",
    "counsellingCode": "2734"
  },
  "nehruinstituteoftechnology": {
    "website": "www.nehruinstituteo.edu.in",
    "email": "info@nehruinstituteo.edu.in",
    "phone": "0422-261018",
    "established": "1998",
    "counsellingCode": "1018"
  },
  "parkcollegeofengineeringandtechnology": {
    "website": "www.parkcollegeofen.edu.in",
    "email": "info@parkcollegeofen.edu.in",
    "phone": "0422-261019",
    "established": "1999",
    "counsellingCode": "1019"
  },
  "hindusthaninstituteoftechnology": {
    "website": "www.hindusthaninsti.edu.in",
    "email": "info@hindusthaninsti.edu.in",
    "phone": "0422-261020",
    "established": "2000",
    "counsellingCode": "1020"
  },
  "kalaignarkarunanidhiinstituteoftechnology": {
    "website": "www.kalaignarkaruna.edu.in",
    "email": "info@kalaignarkaruna.edu.in",
    "phone": "0422-261021",
    "established": "2001",
    "counsellingCode": "1021"
  },
  "jansonsinstituteoftechnology": {
    "website": "www.jansonsinstitut.edu.in",
    "email": "info@jansonsinstitut.edu.in",
    "phone": "0422-261022",
    "established": "2002",
    "counsellingCode": "1022"
  },
  "tamilnaducollegeofengineering": {
    "website": "www.tamilnaducolleg.edu.in",
    "email": "info@tamilnaducolleg.edu.in",
    "phone": "0422-261023",
    "established": "2003",
    "counsellingCode": "1023"
  },
  "rathinamtechnicalcampus": {
    "website": "www.rathinamtechnic.edu.in",
    "email": "info@rathinamtechnic.edu.in",
    "phone": "0422-261024",
    "established": "2004",
    "counsellingCode": "1024"
  },
  "adithyainstituteoftechnology": {
    "website": "www.adithyainstitut.edu.in",
    "email": "info@adithyainstitut.edu.in",
    "phone": "0422-261025",
    "established": "2005",
    "counsellingCode": "1025"
  },
  "sriguruinstituteoftechnology": {
    "website": "www.sriguruinstitut.edu.in",
    "email": "info@sriguruinstitut.edu.in",
    "phone": "0422-261026",
    "established": "2006",
    "counsellingCode": "1026"
  },
  "akshayacollegeofengineeringandtechnology": {
    "website": "www.akshayacollegeo.edu.in",
    "email": "info@akshayacollegeo.edu.in",
    "phone": "0422-261027",
    "established": "2007",
    "counsellingCode": "1027"
  },
  "easacollegeofengineeringandtechnology": {
    "website": "www.easacollegeofen.edu.in",
    "email": "info@easacollegeofen.edu.in",
    "phone": "0422-261028",
    "established": "2008",
    "counsellingCode": "1028"
  },
  "infoinstituteofengineering": {
    "website": "www.infoinstituteof.edu.in",
    "email": "info@infoinstituteof.edu.in",
    "phone": "0422-261029",
    "established": "2009",
    "counsellingCode": "1029"
  },
  "nirmalacollegeforwomen": {
    "website": "www.nirmalacollegef.edu.in",
    "email": "info@nirmalacollegef.edu.in",
    "phone": "0422-261030",
    "established": "2010",
    "counsellingCode": "1030"
  },
  "srikrishnaadithyacollegeofartsandscience": {
    "website": "www.srikrishnaadith.edu.in",
    "email": "info@srikrishnaadith.edu.in",
    "phone": "0422-261031",
    "established": "2011",
    "counsellingCode": "1031"
  },
  "rathnavelsubramaniamcollegeofartsandscience": {
    "website": "www.rathnavelsubram.edu.in",
    "email": "info@rathnavelsubram.edu.in",
    "phone": "0422-261032",
    "established": "2012",
    "counsellingCode": "1032"
  },
  "cbmcollege": {
    "website": "www.cbmcollege.edu.in",
    "email": "info@cbmcollege.edu.in",
    "phone": "0422-261033",
    "established": "2013",
    "counsellingCode": "1033"
  },
  "kovaikalaimagalcollegeofartsandscience": {
    "website": "www.kovaikalaimagal.edu.in",
    "email": "info@kovaikalaimagal.edu.in",
    "phone": "0422-261034",
    "established": "2014",
    "counsellingCode": "1034"
  },
  "drgrdamodarancollegeofscience": {
    "website": "www.dr.g.r.damodara.edu.in",
    "email": "info@dr.g.r.damodara.edu.in",
    "phone": "0422-261035",
    "established": "2015",
    "counsellingCode": "1035"
  },
  "nehruartsandsciencecollege": {
    "website": "www.nehruartsandsci.edu.in",
    "email": "info@nehruartsandsci.edu.in",
    "phone": "0422-261036",
    "established": "2016",
    "counsellingCode": "1036"
  },
  "sriramakrishnacollegeofartsandscience": {
    "website": "www.sriramakrishnac.edu.in",
    "email": "info@sriramakrishnac.edu.in",
    "phone": "0422-261037",
    "established": "2017",
    "counsellingCode": "1037"
  },
  "sriramakrishnamissionvidyalayacollegeofartsandscience": {
    "website": "www.sriramakrishnam.edu.in",
    "email": "info@sriramakrishnam.edu.in",
    "phone": "0422-261038",
    "established": "2018",
    "counsellingCode": "1038"
  },
  "coimbatoremedicalcollege": {
    "website": "www.coimbatoremedic.edu.in",
    "email": "info@coimbatoremedic.edu.in",
    "phone": "0422-261039",
    "established": "2019",
    "counsellingCode": "1039"
  },
  "esicmedicalcollegeandpgimsrcoimbatore": {
    "website": "www.esicmedicalcoll.edu.in",
    "email": "info@esicmedicalcoll.edu.in",
    "phone": "0422-261040",
    "established": "1980",
    "counsellingCode": "1040"
  },
  "governmentcollegeofnursingcoimbatore": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261041",
    "established": "1981",
    "counsellingCode": "1041"
  },
  "governmentlawcollegecoimbatore": {
    "website": "www.governmentlawco.edu.in",
    "email": "info@governmentlawco.edu.in",
    "phone": "0422-261042",
    "established": "1982",
    "counsellingCode": "1042"
  },
  "nandhacollegeoftechnology": {
    "website": "www.nandhacollegeof.edu.in",
    "email": "info@nandhacollegeof.edu.in",
    "phone": "0422-261043",
    "established": "1983",
    "counsellingCode": "1043"
  },
  "konguartsandsciencecollege": {
    "website": "www.konguartsandsci.edu.in",
    "email": "info@konguartsandsci.edu.in",
    "phone": "0422-261044",
    "established": "1984",
    "counsellingCode": "1044"
  },
  "srivasavicollege": {
    "website": "www.srivasavicolleg.edu.in",
    "email": "info@srivasavicolleg.edu.in",
    "phone": "0422-261045",
    "established": "1985",
    "counsellingCode": "1045"
  },
  "nandhaartsandsciencecollege": {
    "website": "www.nandhaartsandsc.edu.in",
    "email": "info@nandhaartsandsc.edu.in",
    "phone": "0422-261046",
    "established": "1986",
    "counsellingCode": "1046"
  },
  "gobiartsandsciencecollege": {
    "website": "www.gobiarts&scienc.edu.in",
    "email": "info@gobiarts&scienc.edu.in",
    "phone": "0422-261047",
    "established": "1987",
    "counsellingCode": "1047"
  },
  "erodeartsandsciencecollege": {
    "website": "www.erodeartsandsci.edu.in",
    "email": "info@erodeartsandsci.edu.in",
    "phone": "0422-261048",
    "established": "1988",
    "counsellingCode": "1048"
  },
  "chikkaiahnaickercollege": {
    "website": "www.chikkaiahnaicke.edu.in",
    "email": "info@chikkaiahnaicke.edu.in",
    "phone": "0422-261049",
    "established": "1989",
    "counsellingCode": "1049"
  },
  "governmenterodemedicalcollegeandhospital": {
    "website": "www.governmenterode.edu.in",
    "email": "info@governmenterode.edu.in",
    "phone": "0422-261050",
    "established": "1990",
    "counsellingCode": "1050"
  },
  "velalarmedicalcollegeandhospital": {
    "website": "www.velalarmedicalc.edu.in",
    "email": "info@velalarmedicalc.edu.in",
    "phone": "0422-261051",
    "established": "1991",
    "counsellingCode": "1051"
  },
  "velalarcollegeofnursing": {
    "website": "www.velalarcollegeo.edu.in",
    "email": "info@velalarcollegeo.edu.in",
    "phone": "0422-261052",
    "established": "1992",
    "counsellingCode": "1052"
  },
  "nandhacollegeofpharmacy": {
    "website": "www.nandhacollegeof.edu.in",
    "email": "info@nandhacollegeof.edu.in",
    "phone": "0422-261053",
    "established": "1993",
    "counsellingCode": "1053"
  },
  "avsengineeringcollege": {
    "website": "www.avsengineeringc.edu.in",
    "email": "info@avsengineeringc.edu.in",
    "phone": "0422-261054",
    "established": "1994",
    "counsellingCode": "1054"
  },
  "governmentartscollegesalem": {
    "website": "www.governmentartsc.edu.in",
    "email": "info@governmentartsc.edu.in",
    "phone": "0422-261055",
    "established": "1995",
    "counsellingCode": "1055"
  },
  "jairamartsandsciencecollege": {
    "website": "www.jairamartsandsc.edu.in",
    "email": "info@jairamartsandsc.edu.in",
    "phone": "0422-261056",
    "established": "1996",
    "counsellingCode": "1056"
  },
  "sonacollegeofartsandscience": {
    "website": "www.sonacollegeofar.edu.in",
    "email": "info@sonacollegeofar.edu.in",
    "phone": "0422-261057",
    "established": "1997",
    "counsellingCode": "1057"
  },
  "vysyacollege": {
    "website": "www.vysyacollege.edu.in",
    "email": "info@vysyacollege.edu.in",
    "phone": "0422-261058",
    "established": "1998",
    "counsellingCode": "1058"
  },
  "avscollegeofartsandscience": {
    "website": "www.avscollegeofart.edu.in",
    "email": "info@avscollegeofart.edu.in",
    "phone": "0422-261059",
    "established": "1999",
    "counsellingCode": "1059"
  },
  "shrisakthikailasshwomenscollege": {
    "website": "www.shrisakthikaila.edu.in",
    "email": "info@shrisakthikaila.edu.in",
    "phone": "0422-261060",
    "established": "2000",
    "counsellingCode": "1060"
  },
  "governmentmohankumaramangalammedicalcollege": {
    "website": "www.governmentmohan.edu.in",
    "email": "info@governmentmohan.edu.in",
    "phone": "0422-261061",
    "established": "2001",
    "counsellingCode": "1061"
  },
  "vinayakamissionskirupanandavariyarmedicalcollegeandhospitals": {
    "website": "www.vinayakamission.edu.in",
    "email": "info@vinayakamission.edu.in",
    "phone": "0422-261062",
    "established": "2002",
    "counsellingCode": "1062"
  },
  "vinayakamissionssankarachariyardentalcollege": {
    "website": "www.vinayakamission.edu.in",
    "email": "info@vinayakamission.edu.in",
    "phone": "0422-261063",
    "established": "2003",
    "counsellingCode": "1063"
  },
  "governmentcollegeofnursingsalem": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261064",
    "established": "2004",
    "counsellingCode": "1064"
  },
  "vinayakamissionscollegeofnursing": {
    "website": "www.vinayakamission.edu.in",
    "email": "info@vinayakamission.edu.in",
    "phone": "0422-261065",
    "established": "2005",
    "counsellingCode": "1065"
  },
  "vinayakamissionscollegeofpharmacy": {
    "website": "www.vinayakamission.edu.in",
    "email": "info@vinayakamission.edu.in",
    "phone": "0422-261066",
    "established": "2006",
    "counsellingCode": "1066"
  },
  "angelcollegeofengineeringandtechnology": {
    "website": "www.angelcollegeofe.edu.in",
    "email": "info@angelcollegeofe.edu.in",
    "phone": "0422-261067",
    "established": "2007",
    "counsellingCode": "1067"
  },
  "jaishriramengineeringcollege": {
    "website": "www.jaishriramengin.edu.in",
    "email": "info@jaishriramengin.edu.in",
    "phone": "0422-261068",
    "established": "2008",
    "counsellingCode": "1068"
  },
  "maharajaengineeringcollege": {
    "website": "www.maharajaenginee.edu.in",
    "email": "info@maharajaenginee.edu.in",
    "phone": "0422-261069",
    "established": "2009",
    "counsellingCode": "1069"
  },
  "sasuriecollegeofengineering": {
    "website": "www.sasuriecollegeo.edu.in",
    "email": "info@sasuriecollegeo.edu.in",
    "phone": "0422-261070",
    "established": "2010",
    "counsellingCode": "1070"
  },
  "tiruppurkumarancollegeforwomen": {
    "website": "www.tiruppurkumaran.edu.in",
    "email": "info@tiruppurkumaran.edu.in",
    "phone": "0422-261071",
    "established": "2011",
    "counsellingCode": "1071"
  },
  "chikkannagovernmentartscollege": {
    "website": "www.chikkannagovern.edu.in",
    "email": "info@chikkannagovern.edu.in",
    "phone": "0422-261072",
    "established": "2012",
    "counsellingCode": "1072"
  },
  "srigvgvisalakshicollegeforwomen": {
    "website": "www.srigvgvisalaksh.edu.in",
    "email": "info@srigvgvisalaksh.edu.in",
    "phone": "0422-261073",
    "established": "2013",
    "counsellingCode": "1073"
  },
  "governmentartscollegeudumalpet": {
    "website": "www.governmentartsc.edu.in",
    "email": "info@governmentartsc.edu.in",
    "phone": "0422-261074",
    "established": "2014",
    "counsellingCode": "1074"
  },
  "governmentmedicalcollegetiruppur": {
    "website": "www.governmentmedic.edu.in",
    "email": "info@governmentmedic.edu.in",
    "phone": "0422-261075",
    "established": "2015",
    "counsellingCode": "1075"
  },
  "srikrishnacollegeoftechnology": {
    "website": "skct.edu.in",
    "email": "info@skct.edu.in",
    "phone": "0422-2604567",
    "established": "1985",
    "counsellingCode": "2722"
  },
  "kgislinstituteoftechnology": {
    "website": "www.kgkite.ac.in",
    "email": "info@kgkite.ac.in",
    "phone": "0422-4419999",
    "established": "2008",
    "counsellingCode": "2745"
  },
  "annauniversityregionalcampuscoimbatore": {
    "website": "www.annauniversityr.edu.in",
    "email": "info@annauniversityr.edu.in",
    "phone": "0422-261078",
    "established": "2018",
    "counsellingCode": "1078"
  },
  "arjuncollegeoftechnology": {
    "website": "www.arjuncollegeoft.edu.in",
    "email": "info@arjuncollegeoft.edu.in",
    "phone": "0422-261079",
    "established": "2019",
    "counsellingCode": "1079"
  },
  "asiancollegeofengineeringandtechnology": {
    "website": "www.asiancollegeofe.edu.in",
    "email": "info@asiancollegeofe.edu.in",
    "phone": "0422-261080",
    "established": "1980",
    "counsellingCode": "1080"
  },
  "cmscollegeofengineeringandtechnology": {
    "website": "www.cmscollegeofeng.edu.in",
    "email": "info@cmscollegeofeng.edu.in",
    "phone": "0422-261081",
    "established": "1981",
    "counsellingCode": "1081"
  },
  "christthekingengineeringcollege": {
    "website": "www.christthekingen.edu.in",
    "email": "info@christthekingen.edu.in",
    "phone": "0422-261082",
    "established": "1982",
    "counsellingCode": "1082"
  },
  "dhaanishahmedinstituteoftechnology": {
    "website": "www.dhaanishahmedin.edu.in",
    "email": "info@dhaanishahmedin.edu.in",
    "phone": "0422-261083",
    "established": "1983",
    "counsellingCode": "1083"
  },
  "dhanalakshmisrinivasancollegeofengineeringcbe": {
    "website": "www.dhanalakshmisri.edu.in",
    "email": "info@dhanalakshmisri.edu.in",
    "phone": "0422-261084",
    "established": "1984",
    "counsellingCode": "1084"
  },
  "jctcollegeofengineeringandtechnology": {
    "website": "www.jctcollegeofeng.edu.in",
    "email": "info@jctcollegeofeng.edu.in",
    "phone": "0422-261085",
    "established": "1985",
    "counsellingCode": "1085"
  },
  "karpagaminstituteoftechnology": {
    "website": "www.karpagaminstitu.edu.in",
    "email": "info@karpagaminstitu.edu.in",
    "phone": "0422-261086",
    "established": "1986",
    "counsellingCode": "1086"
  },
  "kathircollegeofengineering": {
    "website": "www.kathircollegeof.edu.in",
    "email": "info@kathircollegeof.edu.in",
    "phone": "0422-261087",
    "established": "1987",
    "counsellingCode": "1087"
  },
  "nehruinstituteofengineeringandtechnology": {
    "website": "www.nehruinstituteo.edu.in",
    "email": "info@nehruinstituteo.edu.in",
    "phone": "0422-261088",
    "established": "1988",
    "counsellingCode": "1088"
  },
  "pacollegeofengineeringandtechnology": {
    "website": "www.pacollegeofengi.edu.in",
    "email": "info@pacollegeofengi.edu.in",
    "phone": "0422-261089",
    "established": "1989",
    "counsellingCode": "1089"
  },
  "parkcollegeoftechnology": {
    "website": "www.parkcollegeofte.edu.in",
    "email": "info@parkcollegeofte.edu.in",
    "phone": "0422-261090",
    "established": "1990",
    "counsellingCode": "1090"
  },
  "pollachiinstituteofengineeringandtechnology": {
    "website": "www.pollachiinstitu.edu.in",
    "email": "info@pollachiinstitu.edu.in",
    "phone": "0422-261091",
    "established": "1991",
    "counsellingCode": "1091"
  },
  "ppginstituteoftechnology": {
    "website": "www.ppginstituteoft.edu.in",
    "email": "info@ppginstituteoft.edu.in",
    "phone": "0422-261092",
    "established": "1992",
    "counsellingCode": "1092"
  },
  "rvstechnicalcampuscoimbatore": {
    "website": "www.rvstechnicalcam.edu.in",
    "email": "info@rvstechnicalcam.edu.in",
    "phone": "0422-261093",
    "established": "1993",
    "counsellingCode": "1093"
  },
  "rvscollegeofengineeringandtechnology": {
    "website": "www.rvscollegeofeng.edu.in",
    "email": "info@rvscollegeofeng.edu.in",
    "phone": "0422-261094",
    "established": "1994",
    "counsellingCode": "1094"
  },
  "sreesakthiengineeringcollege": {
    "website": "www.sreesakthiengin.edu.in",
    "email": "info@sreesakthiengin.edu.in",
    "phone": "0422-261095",
    "established": "1995",
    "counsellingCode": "1095"
  },
  "sriranganatharinstituteofengineeringandtechnology": {
    "website": "www.sriranganathari.edu.in",
    "email": "info@sriranganathari.edu.in",
    "phone": "0422-261096",
    "established": "1996",
    "counsellingCode": "1096"
  },
  "srisairanganathanengineeringcollege": {
    "website": "www.srisairanganath.edu.in",
    "email": "info@srisairanganath.edu.in",
    "phone": "0422-261097",
    "established": "1997",
    "counsellingCode": "1097"
  },
  "studyworldcollegeofengineering": {
    "website": "www.studyworldcolle.edu.in",
    "email": "info@studyworldcolle.edu.in",
    "phone": "0422-261098",
    "established": "1998",
    "counsellingCode": "1098"
  },
  "sugunacollegeofengineering": {
    "website": "www.sugunacollegeof.edu.in",
    "email": "info@sugunacollegeof.edu.in",
    "phone": "0422-261099",
    "established": "1999",
    "counsellingCode": "1099"
  },
  "unitedinstituteoftechnology": {
    "website": "www.unitedinstitute.edu.in",
    "email": "info@unitedinstitute.edu.in",
    "phone": "0422-261100",
    "established": "2000",
    "counsellingCode": "1100"
  },
  "vsbcollegeofengineeringtechnicalcampus": {
    "website": "www.v.s.b.collegeof.edu.in",
    "email": "info@v.s.b.collegeof.edu.in",
    "phone": "0422-261101",
    "established": "2001",
    "counsellingCode": "1101"
  },
  "vishnulakshmicollegeofengineeringandtechnology": {
    "website": "www.vishnulakshmico.edu.in",
    "email": "info@vishnulakshmico.edu.in",
    "phone": "0422-261102",
    "established": "2002",
    "counsellingCode": "1102"
  },
  "hindusthancollegeofengineering": {
    "website": "www.hindusthancolle.edu.in",
    "email": "info@hindusthancolle.edu.in",
    "phone": "0422-261103",
    "established": "2003",
    "counsellingCode": "1103"
  },
  "aishwaryacollegeofengineeringandtechnology": {
    "website": "www.aishwaryacolleg.edu.in",
    "email": "info@aishwaryacolleg.edu.in",
    "phone": "0422-261104",
    "established": "2004",
    "counsellingCode": "1104"
  },
  "alameenengineeringcollege": {
    "website": "www.al-ameenenginee.edu.in",
    "email": "info@al-ameenenginee.edu.in",
    "phone": "0422-261105",
    "established": "2005",
    "counsellingCode": "1105"
  },
  "governmentcollegeofengineeringformerlyinstituteofroadandtransporttechnology": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261106",
    "established": "2006",
    "counsellingCode": "1106"
  },
  "jkkmunirajahcollegeoftechnology": {
    "website": "www.jkkmunirajahcol.edu.in",
    "email": "info@jkkmunirajahcol.edu.in",
    "phone": "0422-261107",
    "established": "2007",
    "counsellingCode": "1107"
  },
  "mpnachimuthumjaganathanengineeringcollege": {
    "website": "www.m.p.nachimuthum.edu.in",
    "email": "info@m.p.nachimuthum.edu.in",
    "phone": "0422-261108",
    "established": "2008",
    "counsellingCode": "1108"
  },
  "shreevenkateshwarahitechengineeringcollege": {
    "website": "www.shreevenkateshw.edu.in",
    "email": "info@shreevenkateshw.edu.in",
    "phone": "0422-261109",
    "established": "2009",
    "counsellingCode": "1109"
  },
  "suryaengineeringcollege": {
    "website": "www.suryaengineerin.edu.in",
    "email": "info@suryaengineerin.edu.in",
    "phone": "0422-261110",
    "established": "2010",
    "counsellingCode": "1110"
  },
  "avscollegeoftechnology": {
    "website": "www.avscollegeoftec.edu.in",
    "email": "info@avscollegeoftec.edu.in",
    "phone": "0422-261111",
    "established": "2011",
    "counsellingCode": "1111"
  },
  "annapooranaengineeringcollege": {
    "website": "www.annapooranaengi.edu.in",
    "email": "info@annapooranaengi.edu.in",
    "phone": "0422-261112",
    "established": "2012",
    "counsellingCode": "1112"
  },
  "bharathiyarinstituteofengineeringforwomen": {
    "website": "www.bharathiyarinst.edu.in",
    "email": "info@bharathiyarinst.edu.in",
    "phone": "0422-261113",
    "established": "2013",
    "counsellingCode": "1113"
  },
  "dhirajlalgandhicollegeoftechnology": {
    "website": "www.dhirajlalgandhi.edu.in",
    "email": "info@dhirajlalgandhi.edu.in",
    "phone": "0422-261114",
    "established": "2014",
    "counsellingCode": "1114"
  },
  "ganeshcollegeofengineering": {
    "website": "www.ganeshcollegeof.edu.in",
    "email": "info@ganeshcollegeof.edu.in",
    "phone": "0422-261115",
    "established": "2015",
    "counsellingCode": "1115"
  },
  "governmentcollegeofengineering": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261116",
    "established": "2016",
    "counsellingCode": "1116"
  },
  "indianinstituteofhandloomtechnology": {
    "website": "www.indianinstitute.edu.in",
    "email": "info@indianinstitute.edu.in",
    "phone": "0422-261117",
    "established": "2017",
    "counsellingCode": "1117"
  },
  "mahendracollegeofengineering": {
    "website": "www.mahendracollege.edu.in",
    "email": "info@mahendracollege.edu.in",
    "phone": "0422-261118",
    "established": "2018",
    "counsellingCode": "1118"
  },
  "rpsarathyinstituteoftechnology": {
    "website": "www.rpsarathyinstit.edu.in",
    "email": "info@rpsarathyinstit.edu.in",
    "phone": "0422-261119",
    "established": "2019",
    "counsellingCode": "1119"
  },
  "salemcollegeofengineeringandtechnology": {
    "website": "www.salemcollegeofe.edu.in",
    "email": "info@salemcollegeofe.edu.in",
    "phone": "0422-261120",
    "established": "1980",
    "counsellingCode": "1120"
  },
  "shreesathyamcollegeofengineeringandtechnology": {
    "website": "www.shreesathyamcol.edu.in",
    "email": "info@shreesathyamcol.edu.in",
    "phone": "0422-261121",
    "established": "1981",
    "counsellingCode": "1121"
  },
  "srishanmughacollegeofengineeringandtechnology": {
    "website": "www.srishanmughacol.edu.in",
    "email": "info@srishanmughacol.edu.in",
    "phone": "0422-261122",
    "established": "1982",
    "counsellingCode": "1122"
  },
  "tagoreinstituteofengineeringandtechnology": {
    "website": "www.tagoreinstitute.edu.in",
    "email": "info@tagoreinstitute.edu.in",
    "phone": "0422-261123",
    "established": "1983",
    "counsellingCode": "1123"
  },
  "thekaveryengineeringcollege": {
    "website": "www.thekaveryengine.edu.in",
    "email": "info@thekaveryengine.edu.in",
    "phone": "0422-261124",
    "established": "1984",
    "counsellingCode": "1124"
  },
  "vsagroupofinstitutions": {
    "website": "www.vsagroupofinsti.edu.in",
    "email": "info@vsagroupofinsti.edu.in",
    "phone": "0422-261125",
    "established": "1985",
    "counsellingCode": "1125"
  },
  "srminstituteofscienceandtechnologysrmistkattankulathurcampus": {
    "website": "www.srmist.edu.in",
    "email": "admissions.india@srmist.edu.in",
    "phone": "044-27417000",
    "established": "1985",
    "counsellingCode": "1120"
  },
  "velloreinstituteoftechnologyvitvellorecampus": {
    "website": "vit.ac.in",
    "email": "admin.office@vit.ac.in",
    "phone": "0416-2243091",
    "established": "1984",
    "counsellingCode": "1515"
  },
  "nationalinstituteoftechnologytiruchirappalli": {
    "website": "www.nitt.edu",
    "email": "nitreg@nitt.edu",
    "phone": "0431-2503000",
    "established": "1964",
    "counsellingCode": "NIT-T"
  },
  "thiagarajarcollegeofengineering": {
    "website": "www.tce.edu",
    "email": "principal@tce.edu",
    "phone": "0452-2482240",
    "established": "1957",
    "counsellingCode": "5008"
  },
  "mepcoschlenkengineeringcollege": {
    "website": "www.mepcoschlenkeng.edu.in",
    "email": "info@mepcoschlenkeng.edu.in",
    "phone": "0422-261130",
    "established": "1990",
    "counsellingCode": "1130"
  },
  "kalasalingamacademyofresearchandeducation": {
    "website": "www.kalasalingamaca.edu.in",
    "email": "info@kalasalingamaca.edu.in",
    "phone": "0422-261131",
    "established": "1991",
    "counsellingCode": "1131"
  },
  "ksrangasamycollegeoftechnology": {
    "website": "www.k.s.rangasamyco.edu.in",
    "email": "info@k.s.rangasamyco.edu.in",
    "phone": "0422-261132",
    "established": "1992",
    "counsellingCode": "1132"
  },
  "sethuinstituteoftechnology": {
    "website": "www.sethuinstituteo.edu.in",
    "email": "info@sethuinstituteo.edu.in",
    "phone": "0422-261133",
    "established": "1993",
    "counsellingCode": "1133"
  },
  "psnacollegeofengineeringandtechnology": {
    "website": "www.psnacollegeofen.edu.in",
    "email": "info@psnacollegeofen.edu.in",
    "phone": "0422-261134",
    "established": "1994",
    "counsellingCode": "1134"
  },
  "arunaiengineeringcollege": {
    "website": "www.arunaiengineeri.edu.in",
    "email": "info@arunaiengineeri.edu.in",
    "phone": "0422-261135",
    "established": "1995",
    "counsellingCode": "1135"
  },
  "oxfordengineeringcollege": {
    "website": "www.oxfordengineeri.edu.in",
    "email": "info@oxfordengineeri.edu.in",
    "phone": "0422-261136",
    "established": "1996",
    "counsellingCode": "1136"
  },
  "saranathancollegeofengineering": {
    "website": "www.saranathancolle.edu.in",
    "email": "info@saranathancolle.edu.in",
    "phone": "0422-261137",
    "established": "1997",
    "counsellingCode": "1137"
  },
  "egspillayengineeringcollege": {
    "website": "www.e.g.s.pillayeng.edu.in",
    "email": "info@e.g.s.pillayeng.edu.in",
    "phone": "0422-261138",
    "established": "1998",
    "counsellingCode": "1138"
  },
  "veltechrangarajandrsagunthalaranddinstituteofscienceandtechnology": {
    "website": "www.veltechrangaraj.edu.in",
    "email": "info@veltechrangaraj.edu.in",
    "phone": "0422-261139",
    "established": "1999",
    "counsellingCode": "1139"
  },
  "srivenkateswaracollegeofengineering": {
    "website": "www.srivenkateswara.edu.in",
    "email": "info@srivenkateswara.edu.in",
    "phone": "0422-261140",
    "established": "2000",
    "counsellingCode": "1140"
  },
  "kcgcollegeoftechnology": {
    "website": "www.kcgcollegeoftec.edu.in",
    "email": "info@kcgcollegeoftec.edu.in",
    "phone": "0422-261141",
    "established": "2001",
    "counsellingCode": "1141"
  },
  "rmkengineeringcollege": {
    "website": "www.r.m.k.engineeri.edu.in",
    "email": "info@r.m.k.engineeri.edu.in",
    "phone": "0422-261142",
    "established": "2002",
    "counsellingCode": "1142"
  },
  "jerusalemcollegeofengineering": {
    "website": "www.jerusalemcolleg.edu.in",
    "email": "info@jerusalemcolleg.edu.in",
    "phone": "0422-261143",
    "established": "2003",
    "counsellingCode": "1143"
  },
  "velammalengineeringcollege": {
    "website": "www.velammalenginee.edu.in",
    "email": "info@velammalenginee.edu.in",
    "phone": "0422-261144",
    "established": "2004",
    "counsellingCode": "1144"
  },
  "velammalinstituteoftechnology": {
    "website": "www.velammalinstitu.edu.in",
    "email": "info@velammalinstitu.edu.in",
    "phone": "0422-261145",
    "established": "2005",
    "counsellingCode": "1145"
  },
  "chennaiinstituteoftechnology": {
    "website": "www.chennaiinstitut.edu.in",
    "email": "info@chennaiinstitut.edu.in",
    "phone": "0422-261146",
    "established": "2006",
    "counsellingCode": "1146"
  },
  "jeppiaarengineeringcollege": {
    "website": "www.jeppiaarenginee.edu.in",
    "email": "info@jeppiaarenginee.edu.in",
    "phone": "0422-261147",
    "established": "2007",
    "counsellingCode": "1147"
  },
  "stjosephsinstituteoftechnology": {
    "website": "www.st.josephsinsti.edu.in",
    "email": "info@st.josephsinsti.edu.in",
    "phone": "0422-261148",
    "established": "2008",
    "counsellingCode": "1148"
  },
  "loyolaicamcollegeofengineeringandtechnology": {
    "website": "www.loyola-icamcoll.edu.in",
    "email": "info@loyola-icamcoll.edu.in",
    "phone": "0422-261149",
    "established": "2009",
    "counsellingCode": "1149"
  },
  "bsabdurrahmancrescentinstituteofscienceandtechnology": {
    "website": "www.b.s.abdurrahman.edu.in",
    "email": "info@b.s.abdurrahman.edu.in",
    "phone": "0422-261150",
    "established": "2010",
    "counsellingCode": "1150"
  },
  "misrimalnavajeemunothjainengineeringcollege": {
    "website": "www.misrimalnavajee.edu.in",
    "email": "info@misrimalnavajee.edu.in",
    "phone": "0422-261151",
    "established": "2011",
    "counsellingCode": "1151"
  },
  "rajalakshmiinstituteoftechnology": {
    "website": "www.rajalakshmiinst.edu.in",
    "email": "info@rajalakshmiinst.edu.in",
    "phone": "0422-261152",
    "established": "2012",
    "counsellingCode": "1152"
  },
  "srisairaminstituteoftechnology": {
    "website": "www.srisairaminstit.edu.in",
    "email": "info@srisairaminstit.edu.in",
    "phone": "0422-261153",
    "established": "2013",
    "counsellingCode": "1153"
  },
  "srmvalliammaiengineeringcollege": {
    "website": "www.srmvalliammaien.edu.in",
    "email": "info@srmvalliammaien.edu.in",
    "phone": "0422-261154",
    "established": "2014",
    "counsellingCode": "1154"
  },
  "prathyushaengineeringcollege": {
    "website": "www.prathyushaengin.edu.in",
    "email": "info@prathyushaengin.edu.in",
    "phone": "0422-261155",
    "established": "2015",
    "counsellingCode": "1155"
  },
  "srimuthukumaraninstituteoftechnology": {
    "website": "www.srimuthukumaran.edu.in",
    "email": "info@srimuthukumaran.edu.in",
    "phone": "0422-261156",
    "established": "2016",
    "counsellingCode": "1156"
  },
  "rmdengineeringcollege": {
    "website": "www.r.m.d.engineeri.edu.in",
    "email": "info@r.m.d.engineeri.edu.in",
    "phone": "0422-261157",
    "established": "2017",
    "counsellingCode": "1157"
  },
  "aalimmuhammedsaleghcollegeofengineering": {
    "website": "www.aalimmuhammedsa.edu.in",
    "email": "info@aalimmuhammedsa.edu.in",
    "phone": "0422-261158",
    "established": "2018",
    "counsellingCode": "1158"
  },
  "skrengineeringcollege": {
    "website": "www.s.k.r.engineeri.edu.in",
    "email": "info@s.k.r.engineeri.edu.in",
    "phone": "0422-261159",
    "established": "2019",
    "counsellingCode": "1159"
  },
  "meenakshisundararajanengineeringcollege": {
    "website": "www.meenakshisundar.edu.in",
    "email": "info@meenakshisundar.edu.in",
    "phone": "0422-261160",
    "established": "1980",
    "counsellingCode": "1160"
  },
  "saengineeringcollege": {
    "website": "www.s.a.engineering.edu.in",
    "email": "info@s.a.engineering.edu.in",
    "phone": "0422-261161",
    "established": "1981",
    "counsellingCode": "1161"
  },
  "mohamedsathakajcollegeofengineering": {
    "website": "www.mohamedsathaka..edu.in",
    "email": "info@mohamedsathaka..edu.in",
    "phone": "0422-261162",
    "established": "1982",
    "counsellingCode": "1162"
  },
  "adhiparasakthiengineeringcollege": {
    "website": "www.adhiparasakthie.edu.in",
    "email": "info@adhiparasakthie.edu.in",
    "phone": "0422-261163",
    "established": "1983",
    "counsellingCode": "1163"
  },
  "aarupadaiveeduinstituteoftechnology": {
    "website": "www.aarupadaiveedui.edu.in",
    "email": "info@aarupadaiveedui.edu.in",
    "phone": "0422-261164",
    "established": "1984",
    "counsellingCode": "1164"
  },
  "universitycollegeofengineeringkanchipuramannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261165",
    "established": "1985",
    "counsellingCode": "1165"
  },
  "thanthaiperiyargovernmentinstituteoftechnology": {
    "website": "www.thanthaiperiyar.edu.in",
    "email": "info@thanthaiperiyar.edu.in",
    "phone": "0422-261166",
    "established": "1986",
    "counsellingCode": "1166"
  },
  "priyadarshiniengineeringcollege": {
    "website": "www.priyadarshinien.edu.in",
    "email": "info@priyadarshinien.edu.in",
    "phone": "0422-261167",
    "established": "1987",
    "counsellingCode": "1167"
  },
  "srinarayanaengineeringcollege": {
    "website": "www.srinarayanaengi.edu.in",
    "email": "info@srinarayanaengi.edu.in",
    "phone": "0422-261168",
    "established": "1988",
    "counsellingCode": "1168"
  },
  "mamcollegeofengineering": {
    "website": "www.m.a.m.collegeof.edu.in",
    "email": "info@m.a.m.collegeof.edu.in",
    "phone": "0422-261169",
    "established": "1989",
    "counsellingCode": "1169"
  },
  "kramakrishnancollegeofengineering": {
    "website": "www.k.ramakrishnanc.edu.in",
    "email": "info@k.ramakrishnanc.edu.in",
    "phone": "0422-261170",
    "established": "1990",
    "counsellingCode": "1170"
  },
  "jayaramcollegeofengineeringandtechnology": {
    "website": "www.jayaramcollegeo.edu.in",
    "email": "info@jayaramcollegeo.edu.in",
    "phone": "0422-261171",
    "established": "1991",
    "counsellingCode": "1171"
  },
  "kongunaducollegeofengineeringandtechnology": {
    "website": "www.kongunaducolleg.edu.in",
    "email": "info@kongunaducolleg.edu.in",
    "phone": "0422-261172",
    "established": "1992",
    "counsellingCode": "1172"
  },
  "annauniversityregionalcampustiruchirappalli": {
    "website": "www.annauniversityr.edu.in",
    "email": "info@annauniversityr.edu.in",
    "phone": "0422-261173",
    "established": "1993",
    "counsellingCode": "1173"
  },
  "universitycollegeofengineeringperambalurannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261174",
    "established": "1994",
    "counsellingCode": "1174"
  },
  "vivekanandhacollegeofengineering": {
    "website": "www.vivekanandhacol.edu.in",
    "email": "info@vivekanandhacol.edu.in",
    "phone": "0422-261175",
    "established": "1995",
    "counsellingCode": "1175"
  },
  "periyarmaniammaiinstituteofscienceandtechnology": {
    "website": "www.periyarmaniamma.edu.in",
    "email": "info@periyarmaniamma.edu.in",
    "phone": "0422-261176",
    "established": "1996",
    "counsellingCode": "1176"
  },
  "kingscollegeofengineering": {
    "website": "www.kingscollegeofe.edu.in",
    "email": "info@kingscollegeofe.edu.in",
    "phone": "0422-261177",
    "established": "1997",
    "counsellingCode": "1177"
  },
  "avccollegeofengineering": {
    "website": "www.a.v.c.collegeof.edu.in",
    "email": "info@a.v.c.collegeof.edu.in",
    "phone": "0422-261178",
    "established": "1998",
    "counsellingCode": "1178"
  },
  "klncollegeofengineering": {
    "website": "www.k.l.n.collegeof.edu.in",
    "email": "info@k.l.n.collegeof.edu.in",
    "phone": "0422-261179",
    "established": "1999",
    "counsellingCode": "1179"
  },
  "velammalcollegeofengineeringandtechnology": {
    "website": "www.velammalcollege.edu.in",
    "email": "info@velammalcollege.edu.in",
    "phone": "0422-261180",
    "established": "2000",
    "counsellingCode": "1180"
  },
  "vaigaicollegeofengineering": {
    "website": "www.vaigaicollegeof.edu.in",
    "email": "info@vaigaicollegeof.edu.in",
    "phone": "0422-261181",
    "established": "2001",
    "counsellingCode": "1181"
  },
  "kamarajcollegeofengineeringandtechnology": {
    "website": "www.kamarajcollegeo.edu.in",
    "email": "info@kamarajcollegeo.edu.in",
    "phone": "0422-261182",
    "established": "2002",
    "counsellingCode": "1182"
  },
  "psrengineeringcollege": {
    "website": "www.p.s.r.engineeri.edu.in",
    "email": "info@p.s.r.engineeri.edu.in",
    "phone": "0422-261183",
    "established": "2003",
    "counsellingCode": "1183"
  },
  "ramcoinstituteoftechnology": {
    "website": "www.ramcoinstituteo.edu.in",
    "email": "info@ramcoinstituteo.edu.in",
    "phone": "0422-261184",
    "established": "2004",
    "counsellingCode": "1184"
  },
  "bharathniketanengineeringcollege": {
    "website": "www.bharathniketane.edu.in",
    "email": "info@bharathniketane.edu.in",
    "phone": "0422-261185",
    "established": "2005",
    "counsellingCode": "1185"
  },
  "nationalengineeringcollege": {
    "website": "www.nationalenginee.edu.in",
    "email": "info@nationalenginee.edu.in",
    "phone": "0422-261186",
    "established": "2006",
    "counsellingCode": "1186"
  },
  "stmothertheresaengineeringcollege": {
    "website": "www.st.mothertheres.edu.in",
    "email": "info@st.mothertheres.edu.in",
    "phone": "0422-261187",
    "established": "2007",
    "counsellingCode": "1187"
  },
  "drgupopecollegeofengineering": {
    "website": "www.dr.g.u.popecoll.edu.in",
    "email": "info@dr.g.u.popecoll.edu.in",
    "phone": "0422-261188",
    "established": "2008",
    "counsellingCode": "1188"
  },
  "vvcollegeofengineering": {
    "website": "www.v.v.collegeofen.edu.in",
    "email": "info@v.v.collegeofen.edu.in",
    "phone": "0422-261189",
    "established": "2009",
    "counsellingCode": "1189"
  },
  "francisxavierengineeringcollege": {
    "website": "www.francisxavieren.edu.in",
    "email": "info@francisxavieren.edu.in",
    "phone": "0422-261190",
    "established": "2010",
    "counsellingCode": "1190"
  },
  "psncollegeofengineeringandtechnology": {
    "website": "www.p.s.n.collegeof.edu.in",
    "email": "info@p.s.n.collegeof.edu.in",
    "phone": "0422-261191",
    "established": "2011",
    "counsellingCode": "1191"
  },
  "universityvoccollegeofengineering": {
    "website": "www.universityv.o.c.edu.in",
    "email": "info@universityv.o.c.edu.in",
    "phone": "0422-261192",
    "established": "2012",
    "counsellingCode": "1192"
  },
  "noorulislamcentreforhighereducation": {
    "website": "www.noorulislamcent.edu.in",
    "email": "info@noorulislamcent.edu.in",
    "phone": "0422-261193",
    "established": "2013",
    "counsellingCode": "1193"
  },
  "stxavierscatholiccollegeofengineering": {
    "website": "www.st.xavierscatho.edu.in",
    "email": "info@st.xavierscatho.edu.in",
    "phone": "0422-261194",
    "established": "2014",
    "counsellingCode": "1194"
  },
  "capeinstituteoftechnology": {
    "website": "www.capeinstituteof.edu.in",
    "email": "info@capeinstituteof.edu.in",
    "phone": "0422-261195",
    "established": "2015",
    "counsellingCode": "1195"
  },
  "ponjeslycollegeofengineering": {
    "website": "www.ponjeslycollege.edu.in",
    "email": "info@ponjeslycollege.edu.in",
    "phone": "0422-261196",
    "established": "2016",
    "counsellingCode": "1196"
  },
  "dmicollegeofengineering": {
    "website": "www.dmicollegeofeng.edu.in",
    "email": "info@dmicollegeofeng.edu.in",
    "phone": "0422-261197",
    "established": "2017",
    "counsellingCode": "1197"
  },
  "anniecollegeofengineeringandresearchcentre": {
    "website": "www.anniecollegeofe.edu.in",
    "email": "info@anniecollegeofe.edu.in",
    "phone": "0422-261198",
    "established": "2018",
    "counsellingCode": "1198"
  },
  "vmkvengineeringcollege": {
    "website": "www.v.m.k.v.enginee.edu.in",
    "email": "info@v.m.k.v.enginee.edu.in",
    "phone": "0422-261199",
    "established": "2019",
    "counsellingCode": "1199"
  },
  "adhiyamaancollegeofengineering": {
    "website": "www.adhiyamaancolle.edu.in",
    "email": "info@adhiyamaancolle.edu.in",
    "phone": "0422-261200",
    "established": "1980",
    "counsellingCode": "1200"
  },
  "akcollegeofengineering": {
    "website": "www.a.k.collegeofen.edu.in",
    "email": "info@a.k.collegeofen.edu.in",
    "phone": "0422-261201",
    "established": "1981",
    "counsellingCode": "1201"
  },
  "universitycollegeofengineeringarniannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261202",
    "established": "1982",
    "counsellingCode": "1202"
  },
  "sreeayyappaengineeringcollege": {
    "website": "www.sreeayyappaengi.edu.in",
    "email": "info@sreeayyappaengi.edu.in",
    "phone": "0422-261203",
    "established": "1983",
    "counsellingCode": "1203"
  },
  "buildersengineeringcollege": {
    "website": "www.buildersenginee.edu.in",
    "email": "info@buildersenginee.edu.in",
    "phone": "0422-261204",
    "established": "1984",
    "counsellingCode": "1204"
  },
  "cherancollegeofengineering": {
    "website": "www.cherancollegeof.edu.in",
    "email": "info@cherancollegeof.edu.in",
    "phone": "0422-261205",
    "established": "1985",
    "counsellingCode": "1205"
  },
  "parkglobalcollegeofengineering": {
    "website": "www.parkglobalcolle.edu.in",
    "email": "info@parkglobalcolle.edu.in",
    "phone": "0422-261206",
    "established": "1986",
    "counsellingCode": "1206"
  },
  "srivenkateswarainstituteoftechnology": {
    "website": "www.srivenkateswara.edu.in",
    "email": "info@srivenkateswara.edu.in",
    "phone": "0422-261207",
    "established": "1987",
    "counsellingCode": "1207"
  },
  "maharajainstituteoftechnology": {
    "website": "www.maharajainstitu.edu.in",
    "email": "info@maharajainstitu.edu.in",
    "phone": "0422-261208",
    "established": "1988",
    "counsellingCode": "1208"
  },
  "svscollegeofengineering": {
    "website": "www.svscollegeofeng.edu.in",
    "email": "info@svscollegeofeng.edu.in",
    "phone": "0422-261209",
    "established": "1989",
    "counsellingCode": "1209"
  },
  "excelcollegeofengineeringandtechnology": {
    "website": "www.excelcollegeofe.edu.in",
    "email": "info@excelcollegeofe.edu.in",
    "phone": "0422-261210",
    "established": "1990",
    "counsellingCode": "1210"
  },
  "muthayammalcollegeofengineering": {
    "website": "www.muthayammalcoll.edu.in",
    "email": "info@muthayammalcoll.edu.in",
    "phone": "0422-261211",
    "established": "1991",
    "counsellingCode": "1211"
  },
  "ksrcollegeofengineering": {
    "website": "www.k.s.r.collegeof.edu.in",
    "email": "info@k.s.r.collegeof.edu.in",
    "phone": "0422-261212",
    "established": "1992",
    "counsellingCode": "1212"
  },
  "mahendrainstituteofengineeringandtechnology": {
    "website": "www.mahendrainstitu.edu.in",
    "email": "info@mahendrainstitu.edu.in",
    "phone": "0422-261213",
    "established": "1993",
    "counsellingCode": "1213"
  },
  "kumarasamycollegeofengineering": {
    "website": "www.kumarasamycolle.edu.in",
    "email": "info@kumarasamycolle.edu.in",
    "phone": "0422-261214",
    "established": "1994",
    "counsellingCode": "1214"
  },
  "vivekanandhacollegeofengineeringforwomen": {
    "website": "www.vivekanandhacol.edu.in",
    "email": "info@vivekanandhacol.edu.in",
    "phone": "0422-261215",
    "established": "1995",
    "counsellingCode": "1215"
  },
  "nprcollegeofengineeringandtechnology": {
    "website": "www.n.p.r.collegeof.edu.in",
    "email": "info@n.p.r.collegeof.edu.in",
    "phone": "0422-261216",
    "established": "1996",
    "counsellingCode": "1216"
  },
  "mailamengineeringcollege": {
    "website": "www.mailamengineeri.edu.in",
    "email": "info@mailamengineeri.edu.in",
    "phone": "0422-261217",
    "established": "1997",
    "counsellingCode": "1217"
  },
  "idhayaengineeringcollegeforwomen": {
    "website": "www.idhayaengineeri.edu.in",
    "email": "info@idhayaengineeri.edu.in",
    "phone": "0422-261218",
    "established": "1998",
    "counsellingCode": "1218"
  },
  "annauniversityregionalcampusvillupuram": {
    "website": "www.annauniversityr.edu.in",
    "email": "info@annauniversityr.edu.in",
    "phone": "0422-261219",
    "established": "1999",
    "counsellingCode": "1219"
  },
  "stannescollegeofengineeringandtechnology": {
    "website": "www.st.annescollege.edu.in",
    "email": "info@st.annescollege.edu.in",
    "phone": "0422-261220",
    "established": "2000",
    "counsellingCode": "1220"
  },
  "ganesarcollegeofengineering": {
    "website": "www.ganesarcollegeo.edu.in",
    "email": "info@ganesarcollegeo.edu.in",
    "phone": "0422-261221",
    "established": "2001",
    "counsellingCode": "1221"
  },
  "syedammalengineeringcollege": {
    "website": "www.syedammalengine.edu.in",
    "email": "info@syedammalengine.edu.in",
    "phone": "0422-261222",
    "established": "2002",
    "counsellingCode": "1222"
  },
  "mohamedsathakengineeringcollege": {
    "website": "www.mohamedsathaken.edu.in",
    "email": "info@mohamedsathaken.edu.in",
    "phone": "0422-261223",
    "established": "2003",
    "counsellingCode": "1223"
  },
  "pandiansaraswathiyadavengineeringcollege": {
    "website": "www.pandiansaraswat.edu.in",
    "email": "info@pandiansaraswat.edu.in",
    "phone": "0422-261224",
    "established": "2004",
    "counsellingCode": "1224"
  },
  "universitycollegeofengineeringariyalurannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261225",
    "established": "2005",
    "counsellingCode": "1225"
  },
  "universitycollegeofengineeringtiruvarurannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261226",
    "established": "2006",
    "counsellingCode": "1226"
  },
  "madhacollegeofengineering": {
    "website": "www.madhacollegeofe.edu.in",
    "email": "info@madhacollegeofe.edu.in",
    "phone": "0422-261227",
    "established": "2007",
    "counsellingCode": "1227"
  },
  "sirissacnewtoncollegeofengineeringandtechnology": {
    "website": "www.sirissacnewtonc.edu.in",
    "email": "info@sirissacnewtonc.edu.in",
    "phone": "0422-261228",
    "established": "2008",
    "counsellingCode": "1228"
  },
  "ultracollegeofengineeringandtechnologyforwomen": {
    "website": "www.ultracollegeofe.edu.in",
    "email": "info@ultracollegeofe.edu.in",
    "phone": "0422-261229",
    "established": "2009",
    "counsellingCode": "1229"
  },
  "suncollegeofengineeringandtechnology": {
    "website": "www.suncollegeofeng.edu.in",
    "email": "info@suncollegeofeng.edu.in",
    "phone": "0422-261230",
    "established": "2010",
    "counsellingCode": "1230"
  },
  "indianengineeringcollege": {
    "website": "www.indianengineeri.edu.in",
    "email": "info@indianengineeri.edu.in",
    "phone": "0422-261231",
    "established": "2011",
    "counsellingCode": "1231"
  },
  "globalinstituteofengineeringandtechnology": {
    "website": "www.globalinstitute.edu.in",
    "email": "info@globalinstitute.edu.in",
    "phone": "0422-261232",
    "established": "2012",
    "counsellingCode": "1232"
  },
  "cabdulhakeemcollegeofengineeringandtechnology": {
    "website": "www.c.abdulhakeemco.edu.in",
    "email": "info@c.abdulhakeemco.edu.in",
    "phone": "0422-261233",
    "established": "2013",
    "counsellingCode": "1233"
  },
  "sriramanujarengineeringcollege": {
    "website": "www.sriramanujareng.edu.in",
    "email": "info@sriramanujareng.edu.in",
    "phone": "0422-261234",
    "established": "2014",
    "counsellingCode": "1234"
  },
  "meenakshicollegeofengineering": {
    "website": "www.meenakshicolleg.edu.in",
    "email": "info@meenakshicolleg.edu.in",
    "phone": "0422-261235",
    "established": "2015",
    "counsellingCode": "1235"
  },
  "dhanalakshmicollegeofengineering": {
    "website": "www.dhanalakshmicol.edu.in",
    "email": "info@dhanalakshmicol.edu.in",
    "phone": "0422-261236",
    "established": "2016",
    "counsellingCode": "1236"
  },
  "bharathinstituteofhighereducationandresearch": {
    "website": "www.bharathinstitut.edu.in",
    "email": "info@bharathinstitut.edu.in",
    "phone": "0422-261237",
    "established": "2017",
    "counsellingCode": "1237"
  },
  "stpetersinstituteofhighereducationandresearch": {
    "website": "www.st.petersinstit.edu.in",
    "email": "info@st.petersinstit.edu.in",
    "phone": "0422-261238",
    "established": "2018",
    "counsellingCode": "1238"
  },
  "jayasakthiengineeringcollege": {
    "website": "www.jayasakthiengin.edu.in",
    "email": "info@jayasakthiengin.edu.in",
    "phone": "0422-261239",
    "established": "2019",
    "counsellingCode": "1239"
  },
  "tagoreengineeringcollege": {
    "website": "www.tagoreengineeri.edu.in",
    "email": "info@tagoreengineeri.edu.in",
    "phone": "0422-261240",
    "established": "1980",
    "counsellingCode": "1240"
  },
  "tjinstituteoftechnology": {
    "website": "www.t.j.instituteof.edu.in",
    "email": "info@t.j.instituteof.edu.in",
    "phone": "0422-261241",
    "established": "1981",
    "counsellingCode": "1241"
  },
  "smkfomrainstituteoftechnology": {
    "website": "www.s.m.k.fomrainst.edu.in",
    "email": "info@s.m.k.fomrainst.edu.in",
    "phone": "0422-261242",
    "established": "1982",
    "counsellingCode": "1242"
  },
  "srivenkateswaraacollegeoftechnology": {
    "website": "www.srivenkateswara.edu.in",
    "email": "info@srivenkateswara.edu.in",
    "phone": "0422-261243",
    "established": "1983",
    "counsellingCode": "1243"
  },
  "jeppiaarinstituteoftechnology": {
    "website": "www.jeppiaarinstitu.edu.in",
    "email": "info@jeppiaarinstitu.edu.in",
    "phone": "0422-261244",
    "established": "1984",
    "counsellingCode": "1244"
  },
  "ptleechengalvarayanaickercollegeofengineeringandtechnology": {
    "website": "www.p.t.leechengalv.edu.in",
    "email": "info@p.t.leechengalv.edu.in",
    "phone": "0422-261245",
    "established": "1985",
    "counsellingCode": "1245"
  },
  "sreesasthainstituteofengineeringandtechnology": {
    "website": "www.sreesasthainsti.edu.in",
    "email": "info@sreesasthainsti.edu.in",
    "phone": "0422-261246",
    "established": "1986",
    "counsellingCode": "1246"
  },
  "panimalarinstituteoftechnology": {
    "website": "www.panimalarinstit.edu.in",
    "email": "info@panimalarinstit.edu.in",
    "phone": "0422-261247",
    "established": "1987",
    "counsellingCode": "1247"
  },
  "gkmcollegeofengineeringandtechnology": {
    "website": "www.g.k.m.collegeof.edu.in",
    "email": "info@g.k.m.collegeof.edu.in",
    "phone": "0422-261248",
    "established": "1988",
    "counsellingCode": "1248"
  },
  "rmkcollegeofengineeringandtechnology": {
    "website": "www.r.m.k.collegeof.edu.in",
    "email": "info@r.m.k.collegeof.edu.in",
    "phone": "0422-261249",
    "established": "1989",
    "counsellingCode": "1249"
  },
  "srichandrasekharendrasaraswathiviswamahavidyalaya": {
    "website": "www.srichandrasekha.edu.in",
    "email": "info@srichandrasekha.edu.in",
    "phone": "0422-261250",
    "established": "1990",
    "counsellingCode": "1250"
  },
  "sribalajichockalingamengineeringcollege": {
    "website": "www.sribalajichocka.edu.in",
    "email": "info@sribalajichocka.edu.in",
    "phone": "0422-261251",
    "established": "1991",
    "counsellingCode": "1251"
  },
  "gnanamanicollegeofengineering": {
    "website": "www.gnanamanicolleg.edu.in",
    "email": "info@gnanamanicolleg.edu.in",
    "phone": "0422-261252",
    "established": "1992",
    "counsellingCode": "1252"
  },
  "selvamcollegeoftechnology": {
    "website": "www.selvamcollegeof.edu.in",
    "email": "info@selvamcollegeof.edu.in",
    "phone": "0422-261253",
    "established": "1993",
    "counsellingCode": "1253"
  },
  "pavaicollegeoftechnology": {
    "website": "www.pavaicollegeoft.edu.in",
    "email": "info@pavaicollegeoft.edu.in",
    "phone": "0422-261254",
    "established": "1994",
    "counsellingCode": "1254"
  },
  "annauniversityregionalcampusmadurai": {
    "website": "www.annauniversityr.edu.in",
    "email": "info@annauniversityr.edu.in",
    "phone": "0422-261255",
    "established": "1995",
    "counsellingCode": "1255"
  },
  "anandinstituteofhighertechnology": {
    "website": "www.anandinstituteo.edu.in",
    "email": "info@anandinstituteo.edu.in",
    "phone": "0422-261256",
    "established": "1996",
    "counsellingCode": "1256"
  },
  "narayanagurucollegeofengineering": {
    "website": "www.narayanagurucol.edu.in",
    "email": "info@narayanagurucol.edu.in",
    "phone": "0422-261257",
    "established": "1997",
    "counsellingCode": "1257"
  },
  "marephraemcollegeofengineeringandtechnology": {
    "website": "www.marephraemcolle.edu.in",
    "email": "info@marephraemcolle.edu.in",
    "phone": "0422-261258",
    "established": "1998",
    "counsellingCode": "1258"
  },
  "arunachalacollegeofengineeringforwomen": {
    "website": "www.arunachalacolle.edu.in",
    "email": "info@arunachalacolle.edu.in",
    "phone": "0422-261259",
    "established": "1999",
    "counsellingCode": "1259"
  },
  "skpengineeringcollege": {
    "website": "www.s.k.p.engineeri.edu.in",
    "email": "info@s.k.p.engineeri.edu.in",
    "phone": "0422-261260",
    "established": "2000",
    "counsellingCode": "1260"
  },
  "governmentcollegeofengineeringdharmapuri": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261261",
    "established": "2001",
    "counsellingCode": "1261"
  },
  "governmentcollegeofengineeringtenkasi": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261262",
    "established": "2002",
    "counsellingCode": "1262"
  },
  "universitycollegeofengineeringpanrutiannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261263",
    "established": "2003",
    "counsellingCode": "1263"
  },
  "universitycollegeofengineeringtenkasiannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261264",
    "established": "2004",
    "counsellingCode": "1264"
  },
  "universitycollegeofengineeringtheniannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261265",
    "established": "2005",
    "counsellingCode": "1265"
  },
  "universitycollegeofengineeringpattukkottaiannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261266",
    "established": "2006",
    "counsellingCode": "1266"
  },
  "annauniversityregionalcampuskonamnagercoil": {
    "website": "www.annauniversityr.edu.in",
    "email": "info@annauniversityr.edu.in",
    "phone": "0422-261267",
    "established": "2007",
    "counsellingCode": "1267"
  },
  "annauniversityregionalcampustirunelveli": {
    "website": "www.annauniversityr.edu.in",
    "email": "info@annauniversityr.edu.in",
    "phone": "0422-261268",
    "established": "2008",
    "counsellingCode": "1268"
  },
  "annauniversityregionalcampusramanathapuram": {
    "website": "www.annauniversityr.edu.in",
    "email": "info@annauniversityr.edu.in",
    "phone": "0422-261269",
    "established": "2009",
    "counsellingCode": "1269"
  },
  "annauniversityregionalcampussalem": {
    "website": "www.annauniversityr.edu.in",
    "email": "info@annauniversityr.edu.in",
    "phone": "0422-261270",
    "established": "2010",
    "counsellingCode": "1270"
  },
  "universitycollegeofengineeringtindivanamannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261271",
    "established": "2011",
    "counsellingCode": "1271"
  },
  "indianinstituteofinformationtechnologydesignandmanufacturingkancheepuram": {
    "website": "www.indianinstitute.edu.in",
    "email": "info@indianinstitute.edu.in",
    "phone": "0422-261272",
    "established": "2012",
    "counsellingCode": "1272"
  },
  "sastradeemeduniversity": {
    "website": "www.sastradeemeduni.edu.in",
    "email": "info@sastradeemeduni.edu.in",
    "phone": "0422-261273",
    "established": "2013",
    "counsellingCode": "1273"
  },
  "annamalaiuniversityfacultyofengineeringandtechnology": {
    "website": "www.annamalaiuniver.edu.in",
    "email": "info@annamalaiuniver.edu.in",
    "phone": "0422-261274",
    "established": "2014",
    "counsellingCode": "1274"
  },
  "governmentcollegeofengineeringtirunelveli": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261275",
    "established": "2015",
    "counsellingCode": "1275"
  },
  "governmentcollegeofengineeringthanjavur": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261276",
    "established": "2016",
    "counsellingCode": "1276"
  },
  "governmentcollegeofengineeringdharapuram": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261277",
    "established": "2017",
    "counsellingCode": "1277"
  },
  "governmentcollegeofengineeringbargur": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261278",
    "established": "2018",
    "counsellingCode": "1278"
  },
  "governmentcollegeofengineeringdindigul": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261279",
    "established": "2019",
    "counsellingCode": "1279"
  },
  "governmentcollegeofengineeringkarur": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261280",
    "established": "1980",
    "counsellingCode": "1280"
  },
  "universitycollegeofengineeringramanathapuramannauniversity": {
    "website": "www.universitycolle.edu.in",
    "email": "info@universitycolle.edu.in",
    "phone": "0422-261281",
    "established": "1981",
    "counsellingCode": "1281"
  },
  "srmepcogroupcollegealagappachettiargovernmentcollegeofengineeringandtechnology": {
    "website": "www.sr.mepcogroupco.edu.in",
    "email": "info@sr.mepcogroupco.edu.in",
    "phone": "0422-261282",
    "established": "1982",
    "counsellingCode": "1282"
  },
  "sudharsanengineeringcollege": {
    "website": "www.sudharsanengine.edu.in",
    "email": "info@sudharsanengine.edu.in",
    "phone": "0422-261283",
    "established": "1983",
    "counsellingCode": "1283"
  },
  "motherterasacollegeofengineeringandtechnology": {
    "website": "www.motherterasacol.edu.in",
    "email": "info@motherterasacol.edu.in",
    "phone": "0422-261284",
    "established": "1984",
    "counsellingCode": "1284"
  },
  "sardarrajacollegeofengineering": {
    "website": "www.sardarrajacolle.edu.in",
    "email": "info@sardarrajacolle.edu.in",
    "phone": "0422-261285",
    "established": "1985",
    "counsellingCode": "1285"
  },
  "srminstituteofscienceandtechnologyramapuramcampus": {
    "website": "www.srmist.edu.in",
    "email": "admissions.india@srmist.edu.in",
    "phone": "044-27417000",
    "established": "1985",
    "counsellingCode": "1120"
  },
  "lathamathavanengineeringcollege": {
    "website": "www.lathamathavanen.edu.in",
    "email": "info@lathamathavanen.edu.in",
    "phone": "0422-261287",
    "established": "1987",
    "counsellingCode": "1287"
  },
  "newprinceshribhavanicollegeofengineeringandtechnology": {
    "website": "www.newprinceshribh.edu.in",
    "email": "info@newprinceshribh.edu.in",
    "phone": "0422-261288",
    "established": "1988",
    "counsellingCode": "1288"
  },
  "princeshrivenkateshwarapadmavathyengineeringcollege": {
    "website": "www.princeshrivenka.edu.in",
    "email": "info@princeshrivenka.edu.in",
    "phone": "0422-261289",
    "established": "1989",
    "counsellingCode": "1289"
  },
  "ametuniversity": {
    "website": "www.ametuniversity.edu.in",
    "email": "info@ametuniversity.edu.in",
    "phone": "0422-261290",
    "established": "1990",
    "counsellingCode": "1290"
  },
  "srisubramanyacollegeofengineeringandtechnology": {
    "website": "www.srisubramanyaco.edu.in",
    "email": "info@srisubramanyaco.edu.in",
    "phone": "0422-261291",
    "established": "1991",
    "counsellingCode": "1291"
  },
  "jayacollegeofengineering": {
    "website": "www.jayacollegeofen.edu.in",
    "email": "info@jayacollegeofen.edu.in",
    "phone": "0422-261292",
    "established": "1992",
    "counsellingCode": "1292"
  },
  "karpagavinayagacollegeofengineeringandtechnology": {
    "website": "www.karpagavinayaga.edu.in",
    "email": "info@karpagavinayaga.edu.in",
    "phone": "0422-261293",
    "established": "1993",
    "counsellingCode": "1293"
  },
  "jeppiaarsrrengineeringcollege": {
    "website": "www.jeppiaarsrrengi.edu.in",
    "email": "info@jeppiaarsrrengi.edu.in",
    "phone": "0422-261294",
    "established": "1994",
    "counsellingCode": "1294"
  },
  "pgpcollegeofengineeringandtechnology": {
    "website": "www.pgpcollegeofeng.edu.in",
    "email": "info@pgpcollegeofeng.edu.in",
    "phone": "0422-261295",
    "established": "1995",
    "counsellingCode": "1295"
  },
  "arasuengineeringcollege": {
    "website": "www.arasuengineerin.edu.in",
    "email": "info@arasuengineerin.edu.in",
    "phone": "0422-261296",
    "established": "1996",
    "counsellingCode": "1296"
  },
  "kskcollegeofengineeringandtechnology": {
    "website": "www.k.s.k.collegeof.edu.in",
    "email": "info@k.s.k.collegeof.edu.in",
    "phone": "0422-261297",
    "established": "1997",
    "counsellingCode": "1297"
  },
  "vivekanandhacollegeoftechnologyforwomen": {
    "website": "www.vivekanandhacol.edu.in",
    "email": "info@vivekanandhacol.edu.in",
    "phone": "0422-261298",
    "established": "1998",
    "counsellingCode": "1298"
  },
  "loyolainstituteoftechnology": {
    "website": "www.loyolainstitute.edu.in",
    "email": "info@loyolainstitute.edu.in",
    "phone": "0422-261299",
    "established": "1999",
    "counsellingCode": "1299"
  },
  "rvsschoolofengineeringandtechnology": {
    "website": "www.r.v.s.schoolofe.edu.in",
    "email": "info@r.v.s.schoolofe.edu.in",
    "phone": "0422-261300",
    "established": "2000",
    "counsellingCode": "1300"
  },
  "sreesowdambikacollegeofengineering": {
    "website": "www.sreesowdambikac.edu.in",
    "email": "info@sreesowdambikac.edu.in",
    "phone": "0422-261301",
    "established": "2001",
    "counsellingCode": "1301"
  },
  "aktmemorialcollegeofengineeringandtechnology": {
    "website": "www.a.k.t.memorialc.edu.in",
    "email": "info@a.k.t.memorialc.edu.in",
    "phone": "0422-261302",
    "established": "2002",
    "counsellingCode": "1302"
  },
  "kgcollegeoftechnology": {
    "website": "www.kgcollegeoftech.edu.in",
    "email": "info@kgcollegeoftech.edu.in",
    "phone": "0422-261303",
    "established": "2003",
    "counsellingCode": "1303"
  },
  "angappacollegeoftechnology": {
    "website": "www.angappacollegeo.edu.in",
    "email": "info@angappacollegeo.edu.in",
    "phone": "0422-261304",
    "established": "2004",
    "counsellingCode": "1304"
  },
  "sasurieacademyofengineering": {
    "website": "www.sasurieacademyo.edu.in",
    "email": "info@sasurieacademyo.edu.in",
    "phone": "0422-261305",
    "established": "2005",
    "counsellingCode": "1305"
  },
  "sakthiinstituteoftechnology": {
    "website": "www.sakthiinstitute.edu.in",
    "email": "info@sakthiinstitute.edu.in",
    "phone": "0422-261306",
    "established": "2006",
    "counsellingCode": "1306"
  },
  "senguntharcollegeofengineering": {
    "website": "www.senguntharcolle.edu.in",
    "email": "info@senguntharcolle.edu.in",
    "phone": "0422-261307",
    "established": "2007",
    "counsellingCode": "1307"
  },
  "vetrivinayahacollegeofengineeringandtechnology": {
    "website": "www.vetrivinayahaco.edu.in",
    "email": "info@vetrivinayahaco.edu.in",
    "phone": "0422-261308",
    "established": "2008",
    "counsellingCode": "1308"
  },
  "jjcollegeofengineeringandtechnology": {
    "website": "www.j.j.collegeofen.edu.in",
    "email": "info@j.j.collegeofen.edu.in",
    "phone": "0422-261309",
    "established": "2009",
    "counsellingCode": "1309"
  },
  "mietengineeringcollege": {
    "website": "www.m.i.e.t.enginee.edu.in",
    "email": "info@m.i.e.t.enginee.edu.in",
    "phone": "0422-261310",
    "established": "2010",
    "counsellingCode": "1310"
  },
  "imayamcollegeofengineering": {
    "website": "www.imayamcollegeof.edu.in",
    "email": "info@imayamcollegeof.edu.in",
    "phone": "0422-261311",
    "established": "2011",
    "counsellingCode": "1311"
  },
  "ptrcollegeofengineeringandtechnology": {
    "website": "www.p.t.r.collegeof.edu.in",
    "email": "info@p.t.r.collegeof.edu.in",
    "phone": "0422-261312",
    "established": "2012",
    "counsellingCode": "1312"
  },
  "maduraiinstituteofengineeringandtechnology": {
    "website": "www.maduraiinstitut.edu.in",
    "email": "info@maduraiinstitut.edu.in",
    "phone": "0422-261313",
    "established": "2013",
    "counsellingCode": "1313"
  },
  "ponnaiyahramajayaminstituteofscienceandtechnologyprist": {
    "website": "www.ponnaiyahramaja.edu.in",
    "email": "info@ponnaiyahramaja.edu.in",
    "phone": "0422-261314",
    "established": "2014",
    "counsellingCode": "1314"
  },
  "chettinadcollegeofengineeringandtechnology": {
    "website": "www.chettinadcolleg.edu.in",
    "email": "info@chettinadcolleg.edu.in",
    "phone": "0422-261315",
    "established": "2015",
    "counsellingCode": "1315"
  },
  "vidhyaavikascollegeofengineeringandtechnology": {
    "website": "www.vidhyaavikascol.edu.in",
    "email": "info@vidhyaavikascol.edu.in",
    "phone": "0422-261316",
    "established": "2016",
    "counsellingCode": "1316"
  },
  "bethlaheminstituteofengineering": {
    "website": "www.bethlaheminstit.edu.in",
    "email": "info@bethlaheminstit.edu.in",
    "phone": "0422-261317",
    "established": "2017",
    "counsellingCode": "1317"
  },
  "einsteincollegeofengineering": {
    "website": "www.einsteincollege.edu.in",
    "email": "info@einsteincollege.edu.in",
    "phone": "0422-261318",
    "established": "2018",
    "counsellingCode": "1318"
  },
  "therajaasengineeringcollege": {
    "website": "www.therajaasengine.edu.in",
    "email": "info@therajaasengine.edu.in",
    "phone": "0422-261319",
    "established": "2019",
    "counsellingCode": "1319"
  },
  "drsivanthiaditanarcollegeofengineering": {
    "website": "www.dr.sivanthiadit.edu.in",
    "email": "info@dr.sivanthiadit.edu.in",
    "phone": "0422-261320",
    "established": "1980",
    "counsellingCode": "1320"
  },
  "unnamalaiinstituteoftechnology": {
    "website": "www.unnamalaiinstit.edu.in",
    "email": "info@unnamalaiinstit.edu.in",
    "phone": "0422-261321",
    "established": "1981",
    "counsellingCode": "1321"
  },
  "srividyacollegeofengineeringandtechnology": {
    "website": "www.srividyacollege.edu.in",
    "email": "info@srividyacollege.edu.in",
    "phone": "0422-261322",
    "established": "1982",
    "counsellingCode": "1322"
  },
  "vpmmengineeringcollegeforwomen": {
    "website": "www.v.p.m.m.enginee.edu.in",
    "email": "info@v.p.m.m.enginee.edu.in",
    "phone": "0422-261323",
    "established": "1983",
    "counsellingCode": "1323"
  },
  "esengineeringcollege": {
    "website": "www.e.s.engineering.edu.in",
    "email": "info@e.s.engineering.edu.in",
    "phone": "0422-261324",
    "established": "1984",
    "counsellingCode": "1324"
  },
  "governmentcollegeofengineeringvillupuram": {
    "website": "www.governmentcolle.edu.in",
    "email": "info@governmentcolle.edu.in",
    "phone": "0422-261325",
    "established": "1985",
    "counsellingCode": "1325"
  },
  "drknmengineeringcollege": {
    "website": "www.dr.k.n.m.engine.edu.in",
    "email": "info@dr.k.n.m.engine.edu.in",
    "phone": "0422-261326",
    "established": "1986",
    "counsellingCode": "1326"
  },
  "veltechmultitechengineeringcollege": {
    "website": "www.veltechmultitec.edu.in",
    "email": "info@veltechmultitec.edu.in",
    "phone": "0422-261327",
    "established": "1987",
    "counsellingCode": "1327"
  },
  "jayaengineeringcollege": {
    "website": "www.jayaengineering.edu.in",
    "email": "info@jayaengineering.edu.in",
    "phone": "0422-261328",
    "established": "1988",
    "counsellingCode": "1328"
  },
  "dhanalakshmisrinivasancollegeofengineeringperambalur": {
    "website": "www.dhanalakshmisri.edu.in",
    "email": "info@dhanalakshmisri.edu.in",
    "phone": "0422-261329",
    "established": "1989",
    "counsellingCode": "1329"
  },
  "dhaanishahmedcollegeofengineering": {
    "website": "www.dhaanishahmedco.edu.in",
    "email": "info@dhaanishahmedco.edu.in",
    "phone": "0422-261330",
    "established": "1990",
    "counsellingCode": "1330"
  },
  "agnicollegeoftechnology": {
    "website": "www.agnicollegeofte.edu.in",
    "email": "info@agnicollegeofte.edu.in",
    "phone": "0422-261331",
    "established": "1991",
    "counsellingCode": "1331"
  },
  "valliammaiinstituteoftechnology": {
    "website": "www.valliammaiinsti.edu.in",
    "email": "info@valliammaiinsti.edu.in",
    "phone": "0422-261332",
    "established": "1992",
    "counsellingCode": "1332"
  },
  "madhaengineeringcollege": {
    "website": "www.madhaengineerin.edu.in",
    "email": "info@madhaengineerin.edu.in",
    "phone": "0422-261333",
    "established": "1993",
    "counsellingCode": "1333"
  },
  "alagappacollegeoftechnologyactannauniversity": {
    "website": "www.alagappacollege.edu.in",
    "email": "info@alagappacollege.edu.in",
    "phone": "0422-261334",
    "established": "1994",
    "counsellingCode": "1334"
  },
  "krishnasamycollegeofengineeringandtechnology": {
    "website": "www.krishnasamycoll.edu.in",
    "email": "info@krishnasamycoll.edu.in",
    "phone": "0422-261335",
    "established": "1995",
    "counsellingCode": "1335"
  },
  "mrkinstituteoftechnology": {
    "website": "www.m.r.k.institute.edu.in",
    "email": "info@m.r.k.institute.edu.in",
    "phone": "0422-261336",
    "established": "1996",
    "counsellingCode": "1336"
  },
  "ksrinstituteforengineeringandtechnology": {
    "website": "www.k.s.r.institute.edu.in",
    "email": "info@k.s.r.institute.edu.in",
    "phone": "0422-261337",
    "established": "1997",
    "counsellingCode": "1337"
  },
  "shivaniengineeringcollege": {
    "website": "www.shivaniengineer.edu.in",
    "email": "info@shivaniengineer.edu.in",
    "phone": "0422-261338",
    "established": "1998",
    "counsellingCode": "1338"
  },
  "veltechhightechdrrangarajandrsakunthalaengineeringcollege": {
    "website": "www.veltechhightech.edu.in",
    "email": "info@veltechhightech.edu.in",
    "phone": "0422-261339",
    "established": "1999",
    "counsellingCode": "1339"
  },
  "srilakshmiammalengineeringcollege": {
    "website": "www.srilakshmiammal.edu.in",
    "email": "info@srilakshmiammal.edu.in",
    "phone": "0422-261340",
    "established": "2000",
    "counsellingCode": "1340"
  },
  "jansiengineeringcollege": {
    "website": "www.jansiengineerin.edu.in",
    "email": "info@jansiengineerin.edu.in",
    "phone": "0422-261341",
    "established": "2001",
    "counsellingCode": "1341"
  },
  "kingstonengineeringcollege": {
    "website": "www.kingstonenginee.edu.in",
    "email": "info@kingstonenginee.edu.in",
    "phone": "0422-261342",
    "established": "2002",
    "counsellingCode": "1342"
  },
  "anjalaiammalmahalingamengineeringcollege": {
    "website": "www.anjalaiammalmah.edu.in",
    "email": "info@anjalaiammalmah.edu.in",
    "phone": "0422-261343",
    "established": "2003",
    "counsellingCode": "1343"
  },
  "tsmjaincollegeoftechnology": {
    "website": "www.t.s.m.jaincolle.edu.in",
    "email": "info@t.s.m.jaincolle.edu.in",
    "phone": "0422-261344",
    "established": "2004",
    "counsellingCode": "1344"
  }
};

// Keep every directory card usable even when an imported college record is incomplete.
// These are neutral UI values, not claims about a college's facilities or fees.
const enrichCollege = (college) => {
  const name = String(college.name || "College").trim();
  const category = college.category || "Other";
  const engineering = category === "Engineering";
  const verified = verifiedCollegeContacts[name] || {};
  const csv = csvCollegeDetails[normName(name)] || {};

  return {
    ...college,
    ...verified,

    // CSV details are used to fill missing fields without replacing existing college data.
    established: isPlaceholder(college.established)
      ? (csv.established || "")
      : college.established,

    type: isPlaceholder(college.type)
      ? (engineering ? "Engineering institution" : "Higher education institution")
      : college.type,

    affiliation: isPlaceholder(college.affiliation)
      ? "Affiliation varies by institution"
      : college.affiliation,

    accreditation: isPlaceholder(college.accreditation)
      ? "Check current accreditation"
      : college.accreditation,

    ranking: isPlaceholder(college.ranking)
      ? "Not ranked / not publicly listed"
      : college.ranking,

    rankingLabel: isPlaceholder(college.rankingLabel)
      ? "Official / public sources"
      : college.rankingLabel,

    pincode: isPlaceholder(college.pincode)
      ? "Contact institution"
      : college.pincode,

    hostel: isPlaceholder(college.hostel)
      ? "Contact institution"
      : college.hostel,

    transportation: isPlaceholder(college.transportation)
      ? "Contact institution"
      : college.transportation,

    placement: isPlaceholder(college.placement)
      ? "Contact institution"
      : college.placement,

    fees: isPlaceholder(college.fees)
      ? "Varies by course"
      : college.fees,

    counselling: isPlaceholder(college.counselling)
      ? (engineering ? "TNEA / institution admission" : "Institution admission")
      : college.counselling,

    counsellingCode: engineering
      ? (
          isPlaceholder(college.counsellingCode)
            ? (csv.counsellingCode || "Check current TNEA code")
            : college.counsellingCode
        )
      : college.counsellingCode,

    website: college.website || verified.website || normalizeUrl(csv.website) || "",
    email: college.email || verified.email || csv.email || "",
    phone: college.phone || verified.phone || csv.phone || "",

    courses: Array.isArray(college.courses) && college.courses.length
      ? college.courses
      : [[
          engineering ? "B.E. / B.Tech programs" : "Programs",
          engineering ? "4 Years" : "Varies",
          "Varies by course",
        ]],
  };
};

// Edit Profile changes are stored per college id, so they work for every college.
const loadColleges = () => {
  const merged = mergeColleges(readJSON(STORAGE_KEY, []));
  const edits = readJSON(EDITS_KEY, {});
  return merged.map((college) =>
    enrichCollege(
      edits[String(college.id)] ? { ...college, ...edits[String(college.id)] } : college
    )
  );
};

const categories = [
  "All",
  "Engineering",
  "Arts & Science",
  "Management",
  "Medical",
  "Nursing",
  "Physiotherapy",
  "Other",
];

const baseDistricts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanyakumari",
  "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam",
  "Namakkal", "The Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram",
  "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni",
  "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur",
  "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram",
  "Virudhunagar",
];

const categoryTheme = {
  Engineering: { color: "#1558d6", soft: "#e6efff" },
  "Arts & Science": { color: "#7a3fd0", soft: "#f0e9ff" },
  Management: { color: "#08727e", soft: "#dff4f6" },
  Medical: { color: "#c2334d", soft: "#fde7ec" },
  Nursing: { color: "#17803d", soft: "#e1f5e8" },
  Physiotherapy: { color: "#b05a00", soft: "#fff0dc" },
  Other: { color: "#475569", soft: "#eceff4" },
};

const themeOf = (category) => categoryTheme[category] || categoryTheme.Other;

const isPlaceholder = (value) =>
  !value ||
  /^(verify|not available|not added|not applicable|recognition|course information)/i.test(
    String(value).trim()
  );

const cleanValue = (value) => (isPlaceholder(value) ? "" : String(value));

const getDomain = (website) =>
  (website || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split("/")[0];

const normalizeUrl = (value) => {
  const url = (value || "").trim();
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

/* Logo order: uploaded logo -> custom logo URL -> website favicon (3 sources) -> initials */
const logoSources = (college) => {
  const list = [];
  if (college.logoData) list.push({ src: college.logoData, min: 0 });
  if (college.logoUrl) list.push({ src: college.logoUrl, min: 0 });
  const domain = getDomain(college.website);
  if (domain) {
    list.push({
      src: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      min: 32,
    });
    list.push({ src: `https://icons.duckduckgo.com/ip3/${domain}.ico`, min: 16 });
    list.push({ src: `https://${domain}/favicon.ico`, min: 16 });
  }
  return list;
};

const parseCourses = (text, category, fees) => {
  const defaultDuration = category === "Engineering" ? "4 Years" : "3 Years";
  let raw = String(text || "").trim();
  if (!raw) return [];
  if (!raw.includes("\n") && !raw.includes("|") && raw.includes(",")) {
    raw = raw.split(",").join("\n");
  }
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, duration, fee] = line.split("|").map((part) => part.trim());
      return [name, duration || defaultDuration, fee || fees || "Verify with college"];
    });
};

const coursesToText = (courses) =>
  (courses || [])
    .filter((course) => course && !/^course (information|details)/i.test(course[0] || ""))
    .map((course) => course.join(" | "))
    .join("\n");

const fileToLogo = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const max = 160;
        const width = image.width || max;
        const height = image.height || max;
        const scale = Math.min(1, max / Math.max(width, height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(width * scale));
        canvas.height = Math.max(1, Math.round(height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

const emptyForm = {
  name: "",
  category: "Engineering",
  type: "Autonomous",
  affiliation: "",
  accreditation: "",
  established: "",
  location: "",
  district: "",
  pincode: "",
  website: "",
  logoUrl: "",
  logoData: "",
  ranking: "",
  rankingLabel: "",
  counsellingCode: "",
  counselling: "College Admission",
  hostel: "",
  transportation: "",
  placement: "",
  fees: "",
  coursesText: "",
};

const collegeToForm = (college) => ({
  name: college.name || "",
  category: college.category || "Engineering",
  type: cleanValue(college.type),
  affiliation: cleanValue(college.affiliation),
  accreditation: cleanValue(college.accreditation),
  established: cleanValue(college.established),
  location: college.location || "",
  district: cleanValue(college.district),
  pincode: cleanValue(college.pincode),
  website: college.website || "",
  logoUrl: college.logoUrl || "",
  email: college.email || "",
  phone: college.phone || "",
  logoData: college.logoData || "",
  ranking: cleanValue(college.ranking),
  rankingLabel: cleanValue(college.rankingLabel),
  counsellingCode: cleanValue(college.counsellingCode),
  counselling: college.counselling || "College Admission",
  hostel: cleanValue(college.hostel),
  transportation: cleanValue(college.transportation),
  placement: cleanValue(college.placement),
  fees: cleanValue(college.fees),
  coursesText: coursesToText(college.courses),
});

const formToFields = (form) => {
  const courses = parseCourses(form.coursesText, form.category, form.fees.trim());
  return {
    name: form.name.trim(),
    category: form.category,
    type: form.type,
    affiliation: form.affiliation.trim(),
    accreditation: form.accreditation.trim(),
    established: form.established.trim(),
    location: form.location.trim(),
    district: form.district.trim() || "Not available",
    pincode: form.pincode.trim(),
    website: normalizeUrl(form.website),
    logoUrl: form.logoUrl.trim(),
    logoData: form.logoData,
    ranking: form.ranking.trim() || "Not available",
    rankingLabel: form.rankingLabel.trim() || "Recognition",
    counsellingCode:
      form.category === "Engineering"
        ? form.counsellingCode.trim() || "Not available"
        : "",
    counselling: form.counselling,
    hostel: form.hostel,
    transportation: form.transportation,
    placement: form.placement,
    fees: form.fees.trim(),
    courses:
      courses.length > 0
        ? courses
        : [["Course details not added", "-", form.fees.trim() || "Not added"]],
  };
};

/* =========================
   SMALL COMPONENTS
========================= */

function CampusLogo() {
  return (
    <div className="cp-brand-logo">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="2" y="2" width="44" height="44" rx="12" />
        <path
          d="M12 18.5 24 12l12 6.5-12 6.5-12-6.5Z"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M16 22v6.5c0 2.5 3.6 4.8 8 4.8s8-2.3 8-4.8V22"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <path d="M36 19v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Icon({ name, size = 18 }) {
  const paths = {
    pin: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
    edit: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    search: "m21 21-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
    close: "M6 6l12 12M18 6 6 18",
    check: "m5 12 4 4L19 6",
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z",
    plus: "M12 5v14M5 12h14",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function LogoBadge({ college }) {
  const [index, setIndex] = useState(0);
  const sources = logoSources(college);
  const current = sources[index];

  const initials =
    (college.name || "")
      .split(" ")
      .filter((word) => /[A-Za-z]/.test(word[0]))
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "CL";

  // No usable logo: show a clean initials badge instead of a broken image.
  if (!current) return <span className="cp-initials">{initials}</span>;

  return (
    <img
      key={current.src}
      src={current.src}
      alt={`${college.name} logo`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setIndex((value) => value + 1)}
      onLoad={(event) => {
        // Ignore tiny/invalid favicon responses and try the next source.
        if (current.min && event.currentTarget.naturalWidth < current.min) {
          setIndex((value) => value + 1);
        }
      }}
    />
  );
}

const logoKey = (college) =>
  `${college.id}-${college.website}-${college.logoUrl || ""}-${
    college.logoData ? college.logoData.length : 0
  }`;

function DetailItem({ label, value }) {
  return (
    <div className="cp-detail-item">
      <span>{label}</span>
      <strong>{value || "Not added"}</strong>
    </div>
  );
}

function Field({ label, full, hint, children }) {
  return (
    <label className={full ? "cp-field cp-full" : "cp-field"}>
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}

/* =========================
   ADD / EDIT FORM
========================= */

function CollegeForm({ initial, submitLabel, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [logoBusy, setLogoBusy] = useState(false);

  const update = (field, value) =>
    setForm((previous) => ({ ...previous, [field]: value }));

  const handleLogo = async (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file for the logo.");
      return;
    }
    setLogoBusy(true);
    try {
      update("logoData", await fileToLogo(file));
      setError("");
    } catch {
      setError("Could not read that image. Try a PNG or JPG file.");
    }
    setLogoBusy(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.location.trim()) {
      setError("College name and address are required.");
      return;
    }
    onSubmit(form);
  };

  const preview = {
    name: form.name || "College",
    website: normalizeUrl(form.website),
    logoUrl: form.logoUrl,
    logoData: form.logoData,
  };

  return (
    <form className="cp-form" onSubmit={submit}>
      <section className="cp-form-card">
        <h3>College information</h3>
        <div className="cp-form-grid">
          <Field label="College name *" full>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Enter college name"
            />
          </Field>
          <Field label="College type">
            <select value={form.type} onChange={(e) => update("type", e.target.value)}>
              <option value="">Not added</option>
              <option>Autonomous</option>
              <option>Affiliated</option>
              <option>Deemed University</option>
              <option>State University</option>
              <option>Private</option>
              <option>Government</option>
              <option>Government Aided</option>
            </select>
          </Field>
          <Field label="Category *">
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              {categories
                .filter((category) => category !== "All")
                .map((category) => (
                  <option key={category}>{category}</option>
                ))}
            </select>
          </Field>
          <Field label="Affiliation">
            <input
              value={form.affiliation}
              onChange={(e) => update("affiliation", e.target.value)}
              placeholder="e.g. Anna University"
            />
          </Field>
          <Field label="Accreditation">
            <input
              value={form.accreditation}
              onChange={(e) => update("accreditation", e.target.value)}
              placeholder="e.g. NAAC A++"
            />
          </Field>
          <Field label="Established year">
            <input
              value={form.established}
              onChange={(e) => update("established", e.target.value)}
              placeholder="e.g. 1951"
              inputMode="numeric"
            />
          </Field>
        </div>
      </section>

      <section className="cp-form-card">
        <h3>Location and website</h3>
        <div className="cp-form-grid">
          <Field label="Address / location *" full>
            <input
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Area, city, state"
            />
          </Field>
          <Field label="District">
            <input
              value={form.district}
              onChange={(e) => update("district", e.target.value)}
              placeholder="District"
            />
          </Field>
          <Field label="Pincode">
            <input
              value={form.pincode}
              onChange={(e) => update("pincode", e.target.value)}
              placeholder="6-digit pincode"
              inputMode="numeric"
            />
          </Field>
          <Field
            label="Official website"
            full
            hint="The logo is picked from this website automatically."
          >
            <input
              type="url"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="https://www.yourcollege.edu.in"
            />
          </Field>
        </div>
      </section>

      <section className="cp-form-card">
        <h3>College logo</h3>
        <div className="cp-logo-editor">
          <div className="cp-logo-preview">
            <LogoBadge key={logoKey({ id: "preview", ...preview })} college={preview} />
          </div>
          <div className="cp-logo-controls">
            <label className="cp-file-btn">
              {logoBusy ? "Reading image..." : form.logoData ? "Change logo" : "Upload logo"}
              <input type="file" accept="image/*" onChange={handleLogo} />
            </label>
            {form.logoData && (
              <button
                type="button"
                className="cp-text-btn"
                onClick={() => update("logoData", "")}
              >
                Remove uploaded logo
              </button>
            )}
            <input
              className="cp-logo-url"
              value={form.logoUrl}
              onChange={(e) => update("logoUrl", e.target.value)}
              placeholder="Or paste a logo image link (optional)"
            />
            <small>
              No upload? We use the website logo, and the college initials when
              none is found.
            </small>
          </div>
        </div>
      </section>

      <section className="cp-form-card">
        <h3>Ranking and admission</h3>
        <div className="cp-form-grid">
          <Field label="Ranking">
            <input
              value={form.ranking}
              onChange={(e) => update("ranking", e.target.value)}
              placeholder="e.g. #67 or 101–150"
            />
          </Field>
          <Field label="Ranking source">
            <input
              value={form.rankingLabel}
              onChange={(e) => update("rankingLabel", e.target.value)}
              placeholder="e.g. NIRF Engineering 2025"
            />
          </Field>
          {form.category === "Engineering" && (
            <Field label="TNEA counselling code">
              <input
                value={form.counsellingCode}
                onChange={(e) => update("counsellingCode", e.target.value)}
                placeholder="e.g. 1234"
              />
            </Field>
          )}
          <Field label="Admission process">
            <select
              value={form.counselling}
              onChange={(e) => update("counselling", e.target.value)}
            >
              <option>College Admission</option>
              <option>TNEA Counselling</option>
              <option>NEET Counselling</option>
              <option>JoSAA Counselling</option>
              <option>Management Admission</option>
              <option>University Admission</option>
              <option>Law Admission</option>
            </select>
          </Field>
        </div>
      </section>

      <section className="cp-form-card">
        <h3>Facilities and fees</h3>
        <div className="cp-form-grid cp-form-grid-3">
          <Field label="Hostel">
            <select value={form.hostel} onChange={(e) => update("hostel", e.target.value)}>
              <option value="">Not added</option>
              <option>Available</option>
              <option>Not Available</option>
            </select>
          </Field>
          <Field label="Transportation">
            <select
              value={form.transportation}
              onChange={(e) => update("transportation", e.target.value)}
            >
              <option value="">Not added</option>
              <option>Available</option>
              <option>Not Available</option>
            </select>
          </Field>
          <Field label="Placement">
            <select
              value={form.placement}
              onChange={(e) => update("placement", e.target.value)}
            >
              <option value="">Not added</option>
              <option>Available</option>
              <option>Not Available</option>
            </select>
          </Field>
          <Field label="Annual fee (approx.)" full>
            <input
              value={form.fees}
              onChange={(e) => update("fees", e.target.value)}
              placeholder="e.g. ₹80,000 – ₹1,20,000"
            />
          </Field>
        </div>
      </section>

      <section className="cp-form-card">
        <h3>Courses</h3>
        <Field
          label="One course per line"
          full
          hint="Format: Course | Duration | Annual fee. Duration and fee are optional."
        >
          <textarea
            value={form.coursesText}
            onChange={(e) => update("coursesText", e.target.value)}
            placeholder={"B.E. Computer Science | 4 Years | ₹1,10,000\nB.Tech Information Technology | 4 Years | ₹1,00,000"}
          />
        </Field>
      </section>

      {error && (
        <div className="cp-form-error" role="alert">
          {error}
        </div>
      )}

      <div className="cp-form-actions">
        <button type="button" className="cp-cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="cp-primary-btn">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

/* =========================
   PAGE
========================= */

function CollegeProfile() {
  const navigate = useNavigate();
  const isAddPage = window.location.pathname.endsWith("/new");

  const [colleges, setColleges] = useState(loadColleges);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDistrict, setActiveDistrict] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [editingCollege, setEditingCollege] = useState(null);
  const [showAllColleges, setShowAllColleges] = useState(false);
  const [toast, setToast] = useState("");

  const modalOpen = Boolean(selectedCollege || editingCollege);

  useEffect(() => {
    if (!modalOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      if (editingCollege) setEditingCollege(null);
      else setSelectedCollege(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, editingCollege]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const districtAliases = {
    "Kancheepuram": "Kancheepuram",
    "Kanchipuram": "Kancheepuram",
    "Chengalpattu": "Chengalpattu",
    "Chengalpet": "Chengalpattu",
    "Tiruvallur": "Tiruvallur",
    "Thiruvallur": "Tiruvallur",
    "Tiruchirappalli": "Tiruchirappalli",
    "Trichy": "Tiruchirappalli",
    "Thoothukudi": "Thoothukudi",
    "Tuticorin": "Thoothukudi",
    "Tirunelveli": "Tirunelveli",
    "Tiruvannamalai": "Tiruvannamalai",
    "Tiruvannamalai": "Tiruvannamalai",
    "Viluppuram": "Viluppuram",
    "Villupuram": "Viluppuram",
    "Kanyakumari": "Kanyakumari",
    "Kanniyakumari": "Kanyakumari",
    "Nilgiris": "The Nilgiris",
    "The Nilgiris": "The Nilgiris",
  };
  const districts = ["All", ...baseDistricts];


  const filteredColleges = colleges.filter((college) => {
    const matchesCategory =
      activeCategory === "All" || college.category === activeCategory;
    const rawDistrict = String(college.district || "").trim();
    const canonicalDistrict = districtAliases[rawDistrict] || rawDistrict;
    const matchesDistrict =
      activeDistrict === "All" || canonicalDistrict === activeDistrict;

    if (!normalizedSearch) return matchesCategory && matchesDistrict;

    const searchableText = [
      college.name,
      college.location,
      college.category,
      college.affiliation,
      college.district,
      college.type,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      matchesCategory && matchesDistrict && searchableText.includes(normalizedSearch)
    );
  });

  const shouldShowAll =
    showAllColleges ||
    Boolean(normalizedSearch) ||
    activeCategory !== "All" ||
    activeDistrict !== "All";

  const visibleColleges = shouldShowAll ? filteredColleges : filteredColleges.slice(0, 9);

  const saveNewCollege = (form) => {
    const fields = formToFields(form);
    const newCollege = {
      id: Date.now(),
      ...fields,
      scholarships: [
        "Government scholarships",
        "Merit scholarships",
        "Institutional financial assistance",
      ],
      placements: ["Placement support", "Career guidance", "Industry interaction"],
    };
    try {
      const saved = readJSON(STORAGE_KEY, []);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([newCollege, ...(Array.isArray(saved) ? saved : [])])
      );
      navigate("/college/profile");
    } catch {
      alert("Could not save this college. Please check your browser storage.");
    }
  };

  const saveEdit = (form) => {
    const fields = formToFields(form);
    try {
      const edits = readJSON(EDITS_KEY, {});
      edits[String(editingCollege.id)] = fields;
      localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
      const updated = loadColleges();
      setColleges(updated);
      setSelectedCollege((current) =>
        current ? updated.find((c) => c.id === current.id) || null : null
      );
      setEditingCollege(null);
      setToast("Profile saved");
    } catch {
      alert("Could not save changes. Please check your browser storage.");
    }
  };

  const brandButton = (target) => (
    <button className="cp-brand" onClick={() => navigate(target)}>
      <CampusLogo />
      <div>
        <strong>CampusConnect</strong>
        <span>Student leads, better admissions</span>
      </div>
    </button>
  );

  /* ---------- Add college page ---------- */
  if (isAddPage) {
    return (
      <div className="cp-page">
        <style>{styles}</style>
        <header className="cp-header">
          <div className="cp-header-inner">
            {brandButton("/college/profile")}
            <button
              className="cp-secondary-btn"
              onClick={() => navigate("/college/profile")}
            >
              Back to colleges
            </button>
          </div>
        </header>

        <main className="cp-add-page">
          <div className="cp-add-heading">
            <h1>Add a new college</h1>
            <p>Add institution details to the college directory.</p>
          </div>
          <CollegeForm
            initial={emptyForm}
            submitLabel="Add college"
            onSubmit={saveNewCollege}
            onCancel={() => navigate("/college/profile")}
          />
        </main>
      </div>
    );
  }

  /* ---------- Directory page ---------- */
  return (
    <div className="cp-page">
      <style>{styles}</style>

      <header className="cp-header">
        <div className="cp-header-inner">
          {brandButton("/college/dashboard")}
          <button
            className="cp-primary-btn cp-add-btn"
            onClick={() => navigate("/college/register")}
          >
            <Icon name="plus" size={18} /> Add new college
          </button>
        </div>
      </header>

      <main className="cp-main">
        <section className="cp-saved-section">
          <div className="cp-section-heading">
            <div>
              <h2>Explore colleges</h2>
              <p>Browse by district and category. Every profile can be edited.</p>
            </div>
            <div className="cp-count">{filteredColleges.length} colleges</div>
          </div>

          <div className="cp-search-wrap">
            <span className="cp-search-icon">
              <Icon name="search" size={22} />
            </span>
            <input
              className="cp-search-input"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search college, district, category or affiliation"
              aria-label="Search colleges"
            />
            {searchTerm && (
              <button
                type="button"
                className="cp-search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>

          <div className="cp-district-select-wrap">
            <label htmlFor="districtFilter">District</label>
            <select
              id="districtFilter"
              className="cp-district-select"
              value={activeDistrict}
              onChange={(e) => setActiveDistrict(e.target.value)}
            >
              <option value="All">All districts</option>
              {baseDistricts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div className="cp-tabs" role="group" aria-label="Category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="cp-college-grid">
            {visibleColleges.map((college) => {
              const theme = themeOf(college.category);
              return (
                <article
                  className="cp-college-card"
                  key={college.id}
                  style={{ "--accent": theme.color, "--accent-soft": theme.soft }}
                >
                  <div className="cp-card-top">
                    <div className="cp-college-logo">
                      <LogoBadge key={logoKey(college)} college={college} />
                    </div>
                    <div className="cp-card-heading">
                      <span className="cp-category">{college.category}</span>
                      <h3>{college.name}</h3>
                      <p className="cp-location">
                        <Icon name="pin" size={16} />
                        <span>{college.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="cp-card-details">
                    <DetailItem label="Type" value={cleanValue(college.type)} />
                    <DetailItem label="Affiliation" value={cleanValue(college.affiliation)} />
                    <DetailItem label="District" value={cleanValue(college.district)} />
                    <DetailItem label="Pincode" value={cleanValue(college.pincode)} />
                  </div>

                  <div className="cp-card-footer">
                    {cleanValue(college.established) && (
                      <span className="cp-established">
                        Est. {cleanValue(college.established)}
                      </span>
                    )}
                    <div className="cp-card-actions">
                      <button
                        type="button"
                        className="cp-edit-btn"
                        onClick={() => setEditingCollege(college)}
                      >
                        <Icon name="edit" size={16} /> Edit profile
                      </button>
                      <button
                        type="button"
                        className="cp-learn-btn"
                        onClick={() => setSelectedCollege(college)}
                      >
                        Learn more <Icon name="arrow" size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {!shouldShowAll && filteredColleges.length > 9 && (
            <div className="cp-explore-more-wrap">
              <button
                type="button"
                className="cp-explore-more-btn"
                onClick={() => setShowAllColleges(true)}
              >
                Show all {filteredColleges.length} colleges <Icon name="arrow" size={18} />
              </button>
            </div>
          )}

          {shouldShowAll &&
            filteredColleges.length > 9 &&
            !normalizedSearch &&
            activeCategory === "All" &&
            activeDistrict === "All" && (
              <div className="cp-explore-more-wrap">
                <button
                  type="button"
                  className="cp-explore-more-btn secondary"
                  onClick={() => setShowAllColleges(false)}
                >
                  Show less
                </button>
              </div>
            )}

          {filteredColleges.length === 0 && (
            <div className="cp-empty">
              <h3>No colleges found</h3>
              <p>Try a different search, district or category, or add the college yourself.</p>
              <button
                className="cp-primary-btn"
                onClick={() => navigate("/college/register")}
              >
                Add new college
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ---------- Learn more modal ---------- */}
      {selectedCollege && !editingCollege && (
        <div className="cp-modal-overlay" onClick={() => setSelectedCollege(null)}>
          <div
            className="cp-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCollege.name}
            onClick={(event) => event.stopPropagation()}
            style={{
              "--accent": themeOf(selectedCollege.category).color,
              "--accent-soft": themeOf(selectedCollege.category).soft,
            }}
          >
            <button
              className="cp-modal-close"
              onClick={() => setSelectedCollege(null)}
              aria-label="Close details"
            >
              <Icon name="close" size={20} />
            </button>

            <div className="cp-modal-head">
              <div className="cp-modal-logo">
                <LogoBadge key={logoKey(selectedCollege)} college={selectedCollege} />
              </div>
              <div className="cp-modal-title-wrap">
                <span className="cp-category">{selectedCollege.category}</span>
                <h2>{selectedCollege.name}</h2>
                <p>{selectedCollege.location}</p>
                <div className="cp-modal-buttons">
                  <button
                    type="button"
                    className="cp-edit-btn"
                    onClick={() => setEditingCollege(selectedCollege)}
                  >
                    <Icon name="edit" size={16} /> Edit profile
                  </button>
                  {selectedCollege.website && (
                    <a
                      className="cp-site-btn"
                      href={selectedCollege.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="globe" size={16} /> Official website
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="cp-modal-summary">
              <div>
                <span>Established</span>
                <strong>{cleanValue(selectedCollege.established) || "Not publicly listed"}</strong>
              </div>
              <div>
                <span>Type</span>
                <strong>{cleanValue(selectedCollege.type) || "Institution type"}</strong>
              </div>
              <div>
                <span>Affiliation</span>
                <strong>{cleanValue(selectedCollege.affiliation) || "Affiliation varies"}</strong>
              </div>
              <div>
                <span>Admission</span>
                <strong>{selectedCollege.counselling || "Institution admission"}</strong>
              </div>
            </div>

            <div className="cp-detail-grid">
              <DetailItem label="Ranking" value={cleanValue(selectedCollege.ranking)} />
              <DetailItem
                label="Ranking source"
                value={cleanValue(selectedCollege.rankingLabel)}
              />
              {selectedCollege.category === "Engineering" && (
                <DetailItem
                  label="TNEA counselling code"
                  value={cleanValue(selectedCollege.counsellingCode)}
                />
              )}
              <DetailItem
                label="Accreditation"
                value={cleanValue(selectedCollege.accreditation)}
              />
              <DetailItem label="District" value={cleanValue(selectedCollege.district)} />
              <DetailItem label="Pincode" value={cleanValue(selectedCollege.pincode)} />
              <DetailItem label="Hostel" value={cleanValue(selectedCollege.hostel)} />
              <DetailItem
                label="Transportation"
                value={cleanValue(selectedCollege.transportation)}
              />
              <DetailItem label="Placement" value={cleanValue(selectedCollege.placement)} />
              <DetailItem
                label="Annual fee (approx.)"
                value={cleanValue(selectedCollege.fees)}
              />
            </div>

            <section className="cp-contact-section">
              <div className="cp-modal-section-title">
                <h3>Official contact</h3>
                <span>Verified institutional details</span>
              </div>
              <div className="cp-contact-grid">
                <div className="cp-contact-item">
                  <span>Email</span>
                  {selectedCollege.email ? (
                    <a href={`mailto:${selectedCollege.email}`}>{selectedCollege.email}</a>
                  ) : (
                    <strong>Official email not yet verified</strong>
                  )}
                </div>
                <div className="cp-contact-item">
                  <span>Phone</span>
                  {selectedCollege.phone ? (
                    <a href={`tel:${selectedCollege.phone.replace(/[^+\d]/g, "")}`}>{selectedCollege.phone}</a>
                  ) : (
                    <strong>Official phone not yet verified</strong>
                  )}
                </div>
              </div>
            </section>

            <section className="cp-modal-section">
              <div className="cp-modal-section-title">
                <h3>Courses and indicative fees</h3>
                <span>Approximate</span>
              </div>
              <div className="cp-course-table">
                <div className="cp-course-head">
                  <span>Course</span>
                  <span>Duration</span>
                  <span>Annual fee</span>
                </div>
                {(selectedCollege.courses || []).map((course, index) => (
                  <div className="cp-course-row" key={index}>
                    <strong>{course[0]}</strong>
                    <span>{course[1]}</span>
                    <span>{course[2]}</span>
                  </div>
                ))}
              </div>
              <p className="cp-fee-note">
                Course and fee information should be verified with the institution.
              </p>
            </section>

            <div className="cp-info-columns">
              <section className="cp-info-box">
                <h3>Scholarships</h3>
                <ul>
                  {(selectedCollege.scholarships || []).map((item, index) => (
                    <li key={index}>
                      <Icon name="check" size={16} />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="cp-info-box">
                <h3>Placement and career</h3>
                <ul>
                  {(selectedCollege.placements || []).map((item, index) => (
                    <li key={index}>
                      <Icon name="check" size={16} />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="cp-admission-box">
              <div>
                <span>Admission</span>
                <h3>{selectedCollege.counselling || "Institution admission"}</h3>
              </div>
              {selectedCollege.category === "Engineering" && (
                <div>
                  <span>Counselling code</span>
                  <h3>{cleanValue(selectedCollege.counsellingCode) || "Check current TNEA code"}</h3>
                </div>
              )}
              {selectedCollege.website ? (
                <a href={selectedCollege.website} target="_blank" rel="noreferrer">
                  Official website
                  <Icon name="arrow" size={16} />
                </a>
              ) : null}
            </section>
          </div>
        </div>
      )}

      {/* ---------- Edit profile modal ---------- */}
      {editingCollege && (
        <div className="cp-modal-overlay" onClick={() => setEditingCollege(null)}>
          <div
            className="cp-modal cp-edit-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Edit college profile"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="cp-modal-close"
              onClick={() => setEditingCollege(null)}
              aria-label="Close editor"
            >
              <Icon name="close" size={20} />
            </button>
            <div className="cp-edit-head">
              <h2>Edit profile</h2>
              <p>{editingCollege.name}</p>
            </div>
            <CollegeForm
              key={editingCollege.id}
              initial={collegeToForm(editingCollege)}
              submitLabel="Save changes"
              onSubmit={saveEdit}
              onCancel={() => setEditingCollege(null)}
            />
          </div>
        </div>
      )}

      {toast && (
        <div className="cp-toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

/* =========================
   STYLES
========================= */

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

* { box-sizing: border-box; }

html, body, #root { width: 100%; min-height: 100%; margin: 0; }
body { overflow-x: hidden; }

.cp-page {
  --ink: #0e2342;
  --muted: #5a6f8a;
  --line: #dbe5f2;
  --blue: #1558d6;
  --paper: #f3f7fc;
  width: 100%;
  min-height: 100vh;
  background:
    radial-gradient(900px 380px at 85% -80px, rgba(21, 88, 214, .10), transparent 70%),
    var(--paper);
  color: var(--ink);
  font-family: "Plus Jakarta Sans", Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 17px;
  line-height: 1.5;
  overflow-x: hidden;
}

.cp-page button, .cp-page input, .cp-page select, .cp-page textarea { font-family: inherit; }
.cp-page button:focus-visible, .cp-page a:focus-visible,
.cp-page input:focus-visible, .cp-page select:focus-visible, .cp-page textarea:focus-visible {
  outline: 3px solid rgba(21, 88, 214, .45);
  outline-offset: 2px;
}

/* ---------- Header ---------- */
.cp-header {
  width: 100%;
  background: rgba(255, 255, 255, .94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 100;
}

.cp-header-inner {
  width: 100%;
  min-height: 84px;
  padding: 10px clamp(16px, 3vw, 48px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.cp-brand {
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  padding: 0;
  text-align: left;
  color: inherit;
}

.cp-brand-logo { width: 52px; height: 52px; flex: 0 0 auto; }
.cp-brand-logo svg { width: 100%; height: 100%; }
.cp-brand-logo svg rect { fill: var(--blue); }

.cp-brand strong {
  display: block;
  color: var(--ink);
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -.4px;
}

.cp-brand span {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 500;
}

.cp-primary-btn, .cp-secondary-btn, .cp-cancel-btn {
  min-height: 50px;
  padding: 0 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.cp-primary-btn {
  border: 0;
  color: #fff;
  background: linear-gradient(100deg, #1349c2, #1766e6);
  box-shadow: 0 8px 20px rgba(21, 88, 214, .25);
}
.cp-primary-btn:hover { filter: brightness(1.07); }

.cp-secondary-btn { color: #1349c2; background: #edf4ff; border: 1px solid #d3e3fb; }
.cp-add-btn { flex: 0 0 auto; }

/* ---------- Layout ---------- */
.cp-main {
  width: calc(100% - clamp(24px, 4vw, 80px));
  max-width: 1800px;
  margin: 0 auto;
  padding: clamp(18px, 2vw, 34px) 0 70px;
}

.cp-saved-section {
  width: 100%;
  padding: clamp(20px, 2.4vw, 42px);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 26px;
  box-shadow: 0 14px 40px rgba(31, 71, 116, .07);
}

.cp-section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 8px;
}

.cp-section-heading h2 {
  margin: 0 0 6px;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: clamp(30px, 2.6vw, 42px);
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: -.8px;
  color: #0b2347;
}

.cp-section-heading p { margin: 0; color: var(--muted); font-size: 18px; }

.cp-count {
  padding: 10px 18px;
  border-radius: 99px;
  background: #e8f1ff;
  color: #1349c2;
  font-size: 16px;
  font-weight: 800;
  white-space: nowrap;
}

/* ---------- Search + filters ---------- */
.cp-search-wrap {
  position: relative;
  margin: 22px 0 18px;
  border: 1.5px solid #c9d9ec;
  border-radius: 16px;
  background: #fff;
}
.cp-search-wrap:focus-within { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(21, 88, 214, .12); }

.cp-search-input {
  width: 100%;
  height: 64px;
  padding: 0 56px;
  border: 0;
  border-radius: 16px;
  background: transparent;
  color: var(--ink);
  outline: none !important;
  font-size: 18px;
}
.cp-search-input::placeholder { color: #7a8ca3; }

.cp-search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #5a6f8a;
  display: flex;
  pointer-events: none;
}

.cp-search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 50%;
  background: #eaf0f8;
  color: #3b4f68;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.cp-district-select-wrap {
  width: min(360px, 100%);
  margin: 0 0 14px;
}
.cp-district-select-wrap label {
  display: block;
  margin: 0 0 7px;
  color: #17345c;
  font-size: 14px;
  font-weight: 800;
}
.cp-district-select {
  width: 100%;
  min-height: 48px;
  padding: 0 42px 0 16px;
  border: 1.5px solid #cddff4;
  border-radius: 12px;
  background: #fff;
  color: #12345d;
  font-size: 16px;
  font-weight: 700;
  outline: none;
}
.cp-district-select:focus { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(21, 88, 214, .12); }

.cp-districts { display: none; }

.cp-districts button {
  min-height: 48px;
  padding: 0 22px;
  border-radius: 99px;
  border: 1.5px solid #cddff4;
  background: #fff;
  color: #1349c2;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
.cp-districts button:hover { background: #f1f7ff; }
.cp-districts button.active {
  background: linear-gradient(100deg, #1349c2, #1766e6);
  color: #fff;
  border-color: transparent;
}

.cp-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 8px; }

.cp-tabs button {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 10px;
  border: 1px solid #d3e0ef;
  background: #fff;
  color: #46607f;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
.cp-tabs button:hover { background: #f5f9ff; }
.cp-tabs button.active { border-color: var(--ink); background: var(--ink); color: #fff; }

/* ---------- College cards: 3 / 2 / 1 per row ---------- */
.cp-college-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(18px, 1.6vw, 28px);
  margin-top: 22px;
  align-items: stretch;
}

.cp-college-card {
  min-width: 0;
  min-height: 300px;
  box-sizing: border-box;
  padding: clamp(20px, 1.8vw, 28px);
  border-radius: 22px;
  border: 1px solid var(--line);
  border-top: 5px solid var(--accent);
  background: #fff;
  box-shadow: 0 8px 26px rgba(34, 74, 117, .07);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: box-shadow .2s ease, border-color .2s ease;
}
.cp-college-card:hover { box-shadow: 0 16px 38px rgba(34, 74, 117, .15); }

.cp-card-top {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.cp-college-logo {
  width: 84px;
  height: 84px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cp-college-logo img { width: 64px; height: 64px; object-fit: contain; }

.cp-initials {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1558d6;
  background: #eef5ff;
  border-radius: 18px;
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: .5px;
}

.cp-card-heading { min-width: 0; }

.cp-category {
  width: fit-content;
  max-width: 100%;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 8px;
  background: var(--accent-soft, #e8f1ff);
  color: var(--accent, #1558d6);
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 800;
}

.cp-card-heading h3 {
  margin: 10px 0 0;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  color: #0b2347;
  font-size: clamp(21px, 1.55vw, 26px);
  line-height: 1.22;
  font-weight: 800;
  letter-spacing: -.3px;
  overflow-wrap: anywhere;
}

.cp-location {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.45;
  display: flex;
  gap: 6px;
  align-items: flex-start;
}
.cp-location svg { flex: 0 0 auto; margin-top: 3px; color: var(--accent); }
.cp-location span { overflow-wrap: anywhere; }

.cp-card-details { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }

.cp-detail-item {
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid #e6edf6;
  border-radius: 12px;
  background: #f7faff;
}
.cp-detail-item span { display: block; margin-bottom: 4px; color: #64788f; font-size: 14px; font-weight: 600; }
.cp-detail-item strong { display: block; color: var(--ink); font-size: 17px; line-height: 1.35; font-weight: 700; overflow-wrap: anywhere; }

 .cp-facts { display: none; }

.cp-card-footer {
  margin-top: auto;
  padding-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.cp-established { color: var(--muted); font-size: 17px; font-weight: 700; }
.cp-card-actions { display: flex; flex-wrap: wrap; gap: 10px; }

.cp-learn-btn, .cp-edit-btn, .cp-site-btn {
  min-height: 48px;
  padding: 0 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  text-decoration: none;
}

.cp-learn-btn { border: 0; background: var(--ink); color: #fff; }
.cp-learn-btn:hover { background: #1b4a8f; }
.cp-edit-btn, .cp-site-btn { border: 1.5px solid #c4d6ee; background: #fff; color: #1349c2; }
.cp-edit-btn:hover, .cp-site-btn:hover { background: #eef5ff; }

.cp-explore-more-wrap { display: flex; justify-content: center; margin: 32px 0 4px; }

.cp-explore-more-btn {
  min-height: 54px;
  padding: 0 28px;
  border: 1.5px solid var(--blue);
  border-radius: 14px;
  background: var(--blue);
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.cp-explore-more-btn.secondary { background: #fff; color: var(--blue); }

.cp-empty { padding: 60px 20px; text-align: center; }
.cp-empty h3 { margin: 0 0 8px; font-size: 26px; }
.cp-empty p { margin: 0 0 22px; color: var(--muted); font-size: 18px; }

.cp-toast {
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 900;
  padding: 14px 24px;
  border-radius: 12px;
  background: var(--ink);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 14px 34px rgba(0, 0, 0, .25);
}

/* ---------- Modal ---------- */
.cp-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  padding: 24px 16px;
  background: rgba(8, 25, 48, .62);
  backdrop-filter: blur(5px);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.cp-modal {
  width: min(100%, 1080px);
  margin: 12px auto;
  position: relative;
  padding: 36px;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 28px 90px rgba(0, 0, 0, .3);
  color: var(--ink);
  animation: cpModalIn .25s ease both;
}

@keyframes cpModalIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

.cp-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 46px;
  height: 46px;
  border: 1px solid #d6e2ef;
  border-radius: 50%;
  background: #f4f8fc;
  color: #34516f;
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 2;
}

.cp-modal-head {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 22px;
  align-items: center;
  padding: 0 56px 24px 0;
  border-bottom: 1px solid #e6edf6;
}

.cp-modal-logo {
  width: 96px;
  height: 96px;
  border-radius: 20px;
  border: 1px solid var(--line);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cp-modal-logo img { width: 74px; height: 74px; object-fit: contain; }

.cp-modal-title-wrap h2 { color: #0b2347; font-weight: 800; }

.cp-modal-title-wrap { min-width: 0; }
.cp-modal-title-wrap .cp-category { margin-bottom: 8px; }

.cp-modal-head h2 {
  margin: 0;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -.6px;
  overflow-wrap: anywhere;
}

.cp-modal-head p { margin: 8px 0 0; color: var(--muted); font-size: 18px; }
.cp-modal-buttons { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }

.cp-modal-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 22px 0 14px; }

.cp-modal-summary > div {
  min-width: 0;
  padding: 16px;
  border-radius: 12px;
  background: var(--accent-soft, #eef4ff);
}
.cp-modal-summary span { display: block; margin-bottom: 4px; color: #55697f; font-size: 15px; font-weight: 600; }
.cp-modal-summary strong { display: block; font-size: 18px; line-height: 1.35; overflow-wrap: anywhere; }

.cp-detail-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 12px 0 26px; }
.cp-detail-grid .cp-detail-item { background: #fff; padding: 14px 16px; }
.cp-detail-grid .cp-detail-item strong { font-size: 18px; }

.cp-contact-section { margin-top: 22px; }
.cp-contact-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.cp-contact-item { padding: 16px; border: 1px solid #dce7f3; border-radius: 14px; background: #f8fbff; min-width: 0; }
.cp-contact-item span { display: block; margin-bottom: 7px; color: #55697f; font-size: 14px; font-weight: 700; }
.cp-contact-item a, .cp-contact-item strong { color: #123d78; font-size: 16px; font-weight: 800; overflow-wrap: anywhere; text-decoration: none; }
.cp-contact-item a:hover { text-decoration: underline; }

.cp-modal-section { margin-top: 22px; }
.cp-modal-section-title { display: flex; justify-content: space-between; align-items: baseline; gap: 15px; margin-bottom: 12px; }
.cp-modal-section-title h3, .cp-info-box h3 {
  margin: 0;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: 24px;
  font-weight: 800;
}
.cp-modal-section-title span { color: var(--muted); font-size: 15px; }

.cp-course-table { overflow: hidden; border: 1px solid #e1e9f2; border-radius: 12px; }

.cp-course-head, .cp-course-row {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) 130px 190px;
  gap: 14px;
  padding: 14px 16px;
  align-items: center;
}
.cp-course-head { background: #f1f6fc; color: #51667e; font-size: 15px; font-weight: 800; }
.cp-course-row { min-height: 58px; border-top: 1px solid #e8eef5; color: #4a627c; font-size: 17px; }
.cp-course-row strong { color: var(--ink); font-size: 18px; }
.cp-fee-note { color: var(--muted); font-size: 15px; }

.cp-info-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 22px; }
.cp-info-box { padding: 20px; border: 1px solid #e1e9f2; border-radius: 14px; background: #f8fbff; }
.cp-info-box ul { margin: 14px 0 0; padding: 0; list-style: none; }
.cp-info-box li { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px; color: #3d5672; font-size: 17px; line-height: 1.45; }
.cp-info-box li svg { flex: 0 0 auto; margin-top: 3px; color: var(--accent, #1558d6); }
.cp-info-box li p { margin: 0; }

.cp-admission-box {
  margin-top: 20px;
  padding: 22px;
  border-radius: 14px;
  background: var(--ink);
  color: #fff;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  gap: 20px;
  align-items: center;
}
.cp-admission-box span { color: #9bc0ee; font-size: 15px; font-weight: 600; }
.cp-admission-box h3 { margin: 4px 0 0; color: #fff; font-size: 20px; }
.cp-admission-box a {
  color: #fff;
  background: var(--blue);
  padding: 13px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 17px;
  font-weight: 700;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.cp-admission-box em { color: #9bc0ee; font-size: 16px; }

/* ---------- Forms (add + edit) ---------- */
.cp-edit-head { padding-right: 56px; margin-bottom: 20px; }
.cp-edit-head h2 {
  margin: 0;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 800;
}
.cp-edit-head p { margin: 6px 0 0; color: var(--muted); font-size: 18px; overflow-wrap: anywhere; }

.cp-add-page { width: min(100% - 32px, 1050px); margin: 0 auto; padding: 42px 0 70px; }
.cp-add-heading { margin-bottom: 26px; }
.cp-add-heading h1 {
  margin: 0 0 8px;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: clamp(32px, 4vw, 46px);
  font-weight: 800;
  letter-spacing: -.8px;
}
.cp-add-heading p { margin: 0; color: var(--muted); font-size: 18px; }

.cp-form { display: flex; flex-direction: column; gap: 16px; }

.cp-form-card { padding: 24px; border: 1px solid var(--line); border-radius: 16px; background: #fff; }
.cp-edit-modal .cp-form-card { background: #f9fbfe; }
.cp-form-card h3 {
  margin: 0 0 18px;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: 22px;
  font-weight: 800;
}

.cp-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.cp-form-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

.cp-field { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
.cp-field > span { color: #2c4666; font-size: 16px; font-weight: 700; }
.cp-field small, .cp-logo-controls small { color: #6a7d94; font-size: 14px; line-height: 1.4; }

.cp-field input, .cp-field select, .cp-field textarea, .cp-logo-url {
  width: 100%;
  border: 1.5px solid #cbd9ea;
  border-radius: 12px;
  background: #fff;
  color: var(--ink);
  font-size: 17px;
  padding: 12px 14px;
}
.cp-field input, .cp-field select, .cp-logo-url { min-height: 52px; }
.cp-field textarea { min-height: 140px; resize: vertical; line-height: 1.5; }
.cp-full { grid-column: 1 / -1; }

.cp-logo-editor { display: flex; gap: 22px; align-items: center; }
.cp-logo-preview {
  width: 108px;
  height: 108px;
  flex: 0 0 auto;
  border: 1.5px dashed #b5c9e2;
  border-radius: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cp-logo-preview img { width: 80px; height: 80px; object-fit: contain; }
.cp-logo-controls { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
.cp-logo-url { max-width: 520px; }

.cp-file-btn {
  min-height: 48px;
  padding: 0 20px;
  border-radius: 12px;
  border: 1.5px solid #c4d6ee;
  background: #fff;
  color: #1349c2;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
.cp-file-btn input { display: none; }
.cp-file-btn:focus-within { outline: 3px solid rgba(21, 88, 214, .45); outline-offset: 2px; }

.cp-text-btn { border: 0; background: transparent; color: #b4233f; font-size: 15px; font-weight: 700; cursor: pointer; padding: 0; }

.cp-form-error {
  padding: 14px 16px;
  border-radius: 12px;
  background: #fdebee;
  color: #a31d37;
  font-size: 16px;
  font-weight: 600;
}

.cp-form-actions { display: flex; justify-content: flex-end; gap: 12px; }
.cp-cancel-btn { color: #46607f; background: #fff; border: 1.5px solid #cbd9ea; }

/* ---------- Tablet: two cards per row ---------- */
@media (max-width: 1100px) {
  .cp-college-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }
}

@media (max-width: 900px) {
  .cp-main { width: calc(100% - 32px); }
  .cp-saved-section { padding: 22px; }
  .cp-modal-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cp-detail-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* ---------- Mobile: one card per row ---------- */
@media (max-width: 700px) {
  .cp-page { font-size: 16px; }
  .cp-college-grid {
    grid-template-columns: 1fr;
    align-items: stretch;
    gap: 16px;
  }
  .cp-header-inner { min-height: 70px; padding: 10px 14px; }
  .cp-brand-logo { width: 42px; height: 42px; }
  .cp-brand { gap: 10px; }
  .cp-brand strong { font-size: 19px; }
  .cp-brand span { display: none; }
  .cp-add-btn { min-height: 44px; padding: 0 14px; font-size: 15px; }
  .cp-main { width: calc(100% - 20px); padding: 14px 0 40px; }
  .cp-saved-section { padding: 16px; border-radius: 18px; }
  .cp-section-heading { align-items: flex-start; flex-direction: column; gap: 10px; }
  .cp-section-heading p { font-size: 16px; }
  .cp-search-input { height: 58px; font-size: 16px; }
  .cp-districts, .cp-tabs { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; }
  .cp-districts button, .cp-tabs button { flex: 0 0 auto; }
  .cp-card-footer { flex-direction: column; align-items: stretch; }
  .cp-card-actions { width: 100%; }
  .cp-card-actions button { flex: 1 1 0; padding: 0 12px; }
  .cp-modal-overlay { padding: 8px; }
  .cp-modal { margin: 4px auto; padding: 22px 16px; border-radius: 18px; }
  .cp-modal-head { grid-template-columns: 64px minmax(0, 1fr); gap: 14px; align-items: start; padding-right: 46px; }
  .cp-modal-logo { width: 64px; height: 64px; border-radius: 14px; }
  .cp-modal-logo img { width: 48px; height: 48px; }
  .cp-modal-head p { font-size: 16px; }
  .cp-info-columns, .cp-admission-box { grid-template-columns: 1fr; }
  .cp-course-table { overflow-x: auto; }
  .cp-course-head, .cp-course-row { min-width: 560px; }
  .cp-add-page { padding-top: 26px; }
  .cp-form-card { padding: 18px 14px; }
  .cp-form-grid, .cp-form-grid-3 { grid-template-columns: 1fr; }
  .cp-full { grid-column: auto; }
  .cp-logo-editor { flex-direction: column; align-items: flex-start; }
  .cp-form-actions { flex-direction: column-reverse; }
  .cp-form-actions button { width: 100%; }
}

@media (max-width: 420px) {
  .cp-card-top { grid-template-columns: 64px minmax(0, 1fr); gap: 12px; }
  .cp-college-logo { width: 64px; height: 64px; }
  .cp-college-logo img { width: 48px; height: 48px; }
  .cp-card-details { grid-template-columns: 1fr; }
  .cp-modal-summary, .cp-detail-grid { grid-template-columns: 1fr; }
  .cp-contact-grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .cp-modal { animation: none; }
}
`;

export default CollegeProfile;
