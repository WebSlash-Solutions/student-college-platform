import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "campusconnect_custom_colleges";

const makeCollege = ({
  id,
  name,
  category,
  location,
  district = "Coimbatore",
  pincode = "641004",
  established,
  type = "Autonomous",
  affiliation,
  accreditation = "Verify with institution",
  ranking = "Not available",
  rankingLabel = "Recognition",
  counsellingCode,
  website = "",
  hostel = "Available",
  transportation = "Available",
  placement = "Available",
  counselling = "College Admission",
  courses,
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
  logo: website
    ? `https://www.google.com/s2/favicons?domain=${website.replace(
        /^https?:\/\//,
        ""
      )}&sz=128`
    : "",
  hostel,
  transportation,
  placement,
  counselling,
  courses,
  scholarships,
  placements,
});

const defaultColleges = [
  makeCollege({
    id: 1,
    name: "PSG College of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    pincode: "641004",
    established: "1951",
    type: "Autonomous",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    ranking: "#67",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "2006",
    website: "https://www.psgtech.edu/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E / B.Tech Computer Science and Engineering", "4 Years", "₹70K–₹1L / year"],
      ["B.E Information Technology", "4 Years", "₹70K–₹1L / year"],
      ["B.E Electronics & Communication", "4 Years", "₹70K–₹1L / year"],
      ["B.E Electrical & Electronics", "4 Years", "₹70K–₹1L / year"],
      ["B.E Mechanical Engineering", "4 Years", "₹70K–₹1L / year"],
      ["B.E Civil Engineering", "4 Years", "₹70K–₹1L / year"],
      ["B.E Production Engineering", "4 Years", "₹70K–₹1L / year"],
      ["B.E Metallurgical Engineering", "4 Years", "₹70K–₹1L / year"],
    ],
    scholarships: [
      "Government scholarships",
      "Merit scholarships",
      "First graduate scholarship",
      "Institutional financial assistance",
    ],
    placements: [
      "Strong campus placement support",
      "Technology and core engineering recruiters",
      "Training and placement cell",
      "Internship opportunities",
    ],
  }),
  makeCollege({
    id: 2,
    name: "Coimbatore Institute of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    pincode: "641014",
    established: "1956",
    type: "Autonomous",
    affiliation: "Anna University",
    accreditation: "NAAC A+",
    ranking: "101–150",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "2007",
    website: "https://cit.edu.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E Computer Science and Engineering", "4 Years", "₹33K–₹1L / year"],
      ["B.Tech Information Technology", "4 Years", "₹33K–₹1L / year"],
      ["B.Tech Artificial Intelligence & Data Science", "4 Years", "₹33K–₹1L / year"],
      ["B.E Electronics & Communication", "4 Years", "₹33K–₹1L / year"],
      ["B.E Electrical & Electronics", "4 Years", "₹33K–₹1L / year"],
      ["B.E Mechanical Engineering", "4 Years", "₹33K–₹1L / year"],
      ["B.E Civil Engineering", "4 Years", "₹33K–₹1L / year"],
      ["B.Tech Chemical Engineering", "4 Years", "₹33K–₹1L / year"],
    ],
    scholarships: [
      "Government scholarships",
      "Merit based assistance",
      "First graduate scholarship",
      "Community based scholarships",
    ],
    placements: [
      "Dedicated placement department",
      "IT and core engineering recruiters",
      "Industry training",
      "Internship opportunities",
    ],
  }),
  makeCollege({
    id: 3,
    name: "Kumaraguru College of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    pincode: "641049",
    established: "1984",
    type: "Autonomous",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    ranking: "101–150",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.kct.ac.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E Computer Science and Engineering", "4 Years", "₹80K–₹1.5L / year"],
      ["B.Tech Information Technology", "4 Years", "₹80K–₹1.5L / year"],
      ["B.Tech Artificial Intelligence & Data Science", "4 Years", "₹80K–₹1.5L / year"],
      ["B.E Electronics & Communication", "4 Years", "₹80K–₹1.5L / year"],
      ["B.E Electrical & Electronics", "4 Years", "₹80K–₹1.5L / year"],
      ["B.E Mechanical Engineering", "4 Years", "₹80K–₹1.5L / year"],
      ["B.E Civil Engineering", "4 Years", "₹80K–₹1.5L / year"],
    ],
    scholarships: [
      "Merit scholarships",
      "Government scholarships",
      "Institutional assistance",
      "First graduate scholarship",
    ],
    placements: [
      "Dedicated placement cell",
      "Technology and core recruiters",
      "Industry collaborations",
      "Internship and training programs",
    ],
  }),
  makeCollege({
    id: 4,
    name: "PSG College of Arts and Science",
    category: "Arts & Science",
    location: "Coimbatore, Tamil Nadu",
    pincode: "641014",
    established: "1947",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A++",
    ranking: "#10",
    rankingLabel: "NIRF College 2025",
    website: "https://www.psgcas.ac.in/",
    courses: [
      ["B.Sc Computer Science", "3 Years", "₹30K–₹1L / year"],
      ["BCA", "3 Years", "₹30K–₹1L / year"],
      ["B.Sc Data Science", "3 Years", "₹30K–₹1L / year"],
      ["B.Com", "3 Years", "₹30K–₹1L / year"],
      ["BBA", "3 Years", "₹30K–₹1L / year"],
      ["B.A English Literature", "3 Years", "₹30K–₹1L / year"],
      ["B.Sc Mathematics", "3 Years", "₹30K–₹1L / year"],
      ["B.Sc Biotechnology", "3 Years", "₹30K–₹1L / year"],
    ],
    scholarships: [
      "Government scholarships",
      "Merit scholarships",
      "Institutional scholarships",
      "Financial assistance schemes",
    ],
    placements: [
      "Dedicated placement support",
      "IT and business recruiters",
      "Career development programs",
      "Internship opportunities",
    ],
  }),
  makeCollege({
    id: 5,
    name: "PSGR Krishnammal College for Women",
    category: "Arts & Science",
    location: "Coimbatore, Tamil Nadu",
    pincode: "641004",
    established: "1963",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A++",
    ranking: "#9",
    rankingLabel: "NIRF College 2025",
    website: "https://www.psgrkcw.ac.in/",
    courses: [
      ["B.Sc Computer Science", "3 Years", "₹30K–₹90K / year"],
      ["BCA", "3 Years", "₹30K–₹90K / year"],
      ["B.Com", "3 Years", "₹30K–₹90K / year"],
      ["BBA", "3 Years", "₹30K–₹90K / year"],
      ["B.Sc Mathematics", "3 Years", "₹30K–₹90K / year"],
      ["B.A English Literature", "3 Years", "₹30K–₹90K / year"],
    ],
    scholarships: [
      "Government scholarships",
      "Merit scholarships",
      "Institutional scholarships",
      "Student financial support",
    ],
    placements: [
      "Dedicated placement cell",
      "Corporate recruitment drives",
      "Career guidance",
      "Internship support",
    ],
  }),
  makeCollege({
    id: 6,
    name: "Kongunadu Arts and Science College",
    category: "Arts & Science",
    location: "Coimbatore, Tamil Nadu",
    pincode: "641029",
    established: "1975",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A+",
    ranking: "151–200",
    rankingLabel: "NIRF College 2025",
    website: "https://www.kasc.ac.in/",
    courses: [
      ["B.Sc Computer Science", "3 Years", "₹30K–₹90K / year"],
      ["BCA", "3 Years", "₹30K–₹90K / year"],
      ["B.Com", "3 Years", "₹30K–₹90K / year"],
      ["BBA", "3 Years", "₹30K–₹90K / year"],
      ["B.Sc Mathematics", "3 Years", "₹30K–₹90K / year"],
      ["B.A English Literature", "3 Years", "₹30K–₹90K / year"],
    ],
    scholarships: [
      "Government scholarships",
      "Merit scholarships",
      "Institutional scholarships",
      "Student financial support",
    ],
    placements: [
      "Dedicated placement cell",
      "Corporate recruitment drives",
      "Career guidance",
      "Internship support",
    ],
  }),
];

const additionalColleges = [
  makeCollege({
    id: 7,
    name: "Sri Krishna College of Engineering and Technology",
    category: "Engineering",
    location: "Kuniyamuthur, Coimbatore, Tamil Nadu",
    pincode: "641008",
    established: "1998",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    ranking: "101–150",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.skcet.ac.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E Computer Science and Engineering", "4 Years", "₹80K–₹1.5L / year"],
      ["B.Tech Information Technology", "4 Years", "₹80K–₹1.5L / year"],
      ["B.Tech Artificial Intelligence & Data Science", "4 Years", "₹80K–₹1.5L / year"],
      ["B.E Electronics & Communication", "4 Years", "₹80K–₹1.5L / year"],
    ],
  }),
  makeCollege({
    id: 8,
    name: "Sri Krishna Arts and Science College",
    category: "Arts & Science",
    location: "Kuniyamuthur, Coimbatore, Tamil Nadu",
    pincode: "641008",
    established: "1997",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A++",
    ranking: "151–200",
    rankingLabel: "NIRF College 2025",
    website: "https://www.skasc.ac.in/",
    courses: [
      ["B.Sc Computer Science", "3 Years", "₹35K–₹1L / year"],
      ["BCA", "3 Years", "₹35K–₹1L / year"],
      ["B.Com", "3 Years", "₹35K–₹1L / year"],
      ["B.Sc Data Science", "3 Years", "₹35K–₹1L / year"],
    ],
  }),
  makeCollege({
    id: 9,
    name: "Dr. N.G.P. Institute of Technology",
    category: "Engineering",
    location: "Kalapatti, Coimbatore, Tamil Nadu",
    pincode: "641048",
    established: "2007",
    affiliation: "Anna University",
    accreditation: "NAAC A+",
    ranking: "201–300",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.drp.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E Computer Science and Engineering", "4 Years", "₹70K–₹1.3L / year"],
      ["B.Tech Information Technology", "4 Years", "₹70K–₹1.3L / year"],
      ["B.E Biomedical Engineering", "4 Years", "₹70K–₹1.3L / year"],
      ["B.E Mechanical Engineering", "4 Years", "₹70K–₹1.3L / year"],
    ],
  }),
  makeCollege({
    id: 10,
    name: "Sri Ramakrishna Engineering College",
    category: "Engineering",
    location: "Vattamalaipalayam, Coimbatore, Tamil Nadu",
    pincode: "641022",
    established: "1994",
    affiliation: "Anna University",
    accreditation: "NAAC A+",
    ranking: "201–300",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.srec.ac.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E Computer Science and Engineering", "4 Years", "₹70K–₹1.2L / year"],
      ["B.Tech Artificial Intelligence & Data Science", "4 Years", "₹70K–₹1.2L / year"],
      ["B.E Electronics & Communication", "4 Years", "₹70K–₹1.2L / year"],
      ["B.E Mechanical Engineering", "4 Years", "₹70K–₹1.2L / year"],
    ],
  }),
  makeCollege({
    id: 11,
    name: "Karpagam College of Engineering",
    category: "Engineering",
    location: "Othakkalmandapam, Coimbatore, Tamil Nadu",
    pincode: "641032",
    established: "2000",
    affiliation: "Anna University",
    accreditation: "NAAC A+",
    ranking: "201–300",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://kce.ac.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E Computer Science and Engineering", "4 Years", "₹75K–₹1.4L / year"],
      ["B.Tech Information Technology", "4 Years", "₹75K–₹1.4L / year"],
      ["B.Tech Cyber Security", "4 Years", "₹75K–₹1.4L / year"],
      ["B.E Civil Engineering", "4 Years", "₹75K–₹1.4L / year"],
    ],
  }),
  makeCollege({
    id: 12,
    name: "Hindusthan College of Engineering and Technology",
    category: "Engineering",
    location: "Malumichampatti, Coimbatore, Tamil Nadu",
    pincode: "641032",
    established: "2000",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    ranking: "201–300",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://hicet.ac.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E Computer Science and Engineering", "4 Years", "₹70K–₹1.3L / year"],
      ["B.Tech Artificial Intelligence & Data Science", "4 Years", "₹70K–₹1.3L / year"],
      ["B.E Electronics & Communication", "4 Years", "₹70K–₹1.3L / year"],
      ["B.E Mechanical Engineering", "4 Years", "₹70K–₹1.3L / year"],
    ],
  }),
  makeCollege({
    id: 13,
    name: "Government College of Technology",
    category: "Engineering",
    location: "Thadagam Road, Coimbatore, Tamil Nadu",
    pincode: "641013",
    established: "1945",
    type: "Government",
    affiliation: "Anna University",
    accreditation: "NAAC A",
    ranking: "101–150",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.gct.ac.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E Computer Science and Engineering", "4 Years", "Government fee structure"],
      ["B.E Electronics & Communication", "4 Years", "Government fee structure"],
      ["B.E Mechanical Engineering", "4 Years", "Government fee structure"],
      ["B.E Civil Engineering", "4 Years", "Government fee structure"],
    ],
  }),
  makeCollege({
    id: 14,
    name: "PSG Institute of Technology and Applied Research",
    category: "Engineering",
    location: "Neelambur, Coimbatore, Tamil Nadu",
    pincode: "641062",
    established: "2014",
    affiliation: "Anna University",
    accreditation: "NAAC A",
    ranking: "201–300",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.psgitech.ac.in/",
    counselling: "TNEA Counselling",
    courses: [
      ["B.E Computer Science and Engineering", "4 Years", "₹80K–₹1.5L / year"],
      ["B.Tech Artificial Intelligence & Data Science", "4 Years", "₹80K–₹1.5L / year"],
      ["B.E Electronics & Communication", "4 Years", "₹80K–₹1.5L / year"],
      ["B.E Mechanical Engineering", "4 Years", "₹80K–₹1.5L / year"],
    ],
  }),
  makeCollege({
    id: 15,
    name: "Amrita Vishwa Vidyapeetham, Coimbatore",
    category: "Engineering",
    location: "Ettimadai, Coimbatore, Tamil Nadu",
    pincode: "641112",
    established: "1994",
    type: "Deemed University",
    affiliation: "Amrita Vishwa Vidyapeetham",
    accreditation: "NAAC A++",
    ranking: "#23",
    rankingLabel: "NIRF Engineering 2025",
    website: "https://www.amrita.edu/campus/coimbatore/",
    counselling: "University Admission",
    courses: [
      ["B.Tech Computer Science and Engineering", "4 Years", "₹2L–₹6L / year"],
      ["B.Tech Artificial Intelligence", "4 Years", "₹2L–₹6L / year"],
      ["B.Tech Electronics & Communication", "4 Years", "₹2L–₹6L / year"],
      ["B.Tech Mechanical Engineering", "4 Years", "₹2L–₹6L / year"],
    ],
  }),
  makeCollege({
    id: 16,
    name: "PSG Institute of Management",
    category: "Management",
    location: "Peelamedu, Coimbatore, Tamil Nadu",
    pincode: "641004",
    established: "1994",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    ranking: "Recognized",
    rankingLabel: "Management Institution",
    website: "https://www.psgim.ac.in/",
    counselling: "Management Admission",
    courses: [
      ["Master of Business Administration", "2 Years", "Verify with college"],
      ["Executive Management Programs", "Varies", "Verify with college"],
    ],
  }),
  makeCollege({
    id: 17,
    name: "Kumaraguru Institute of Agriculture",
    category: "Other",
    location: "Sakthinagar, Erode, Tamil Nadu",
    district: "Erode",
    pincode: "638315",
    established: "2017",
    type: "Private",
    affiliation: "Tamil Nadu Agricultural University",
    accreditation: "Verify with institution",
    ranking: "Not available",
    rankingLabel: "Institutional recognition",
    website: "https://kiagri.ac.in/",
    counselling: "University Admission",
    courses: [
      ["B.Sc Agriculture", "4 Years", "Verify with college"],
      ["Agriculture and allied programs", "Varies", "Verify with college"],
    ],
  }),
  makeCollege({
    id: 18,
    name: "Karpagam Academy of Higher Education",
    category: "Engineering",
    location: "Eachanari, Coimbatore, Tamil Nadu",
    pincode: "641021",
    established: "2008",
    type: "Deemed University",
    affiliation: "Karpagam Academy of Higher Education",
    accreditation: "NAAC A+",
    ranking: "Recognized",
    rankingLabel: "University recognition",
    website: "https://kahedu.edu.in/",
    counselling: "University Admission",
    courses: [
      ["B.Tech Computer Science and Engineering", "4 Years", "Verify with university"],
      ["B.Tech Information Technology", "4 Years", "Verify with university"],
      ["B.Tech Electronics & Communication", "4 Years", "Verify with university"],
    ],
  }),
  makeCollege({
    id: 19,
    name: "Avinashilingam Institute for Home Science and Higher Education for Women",
    category: "Arts & Science",
    location: "Bharathi Park Road, Coimbatore, Tamil Nadu",
    pincode: "641043",
    established: "1957",
    type: "Deemed University",
    affiliation: "Avinashilingam Institute",
    accreditation: "NAAC A++",
    ranking: "Recognized",
    rankingLabel: "University recognition",
    website: "https://avinuty.ac.in/",
    counselling: "University Admission",
    courses: [
      ["B.Sc Computer Science", "3 Years", "Verify with university"],
      ["B.Com", "3 Years", "Verify with university"],
      ["B.Sc Nutrition and Dietetics", "3 Years", "Verify with university"],
      ["B.A English", "3 Years", "Verify with university"],
    ],
  }),
  makeCollege({
    id: 20,
    name: "Nehru Arts and Science College",
    category: "Arts & Science",
    location: "Thirumalayampalayam, Coimbatore, Tamil Nadu",
    pincode: "641105",
    established: "1998",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A+",
    ranking: "Not available",
    rankingLabel: "Recognition",
    website: "https://www.nehrucolleges.com/",
    courses: [
      ["B.Sc Computer Science", "3 Years", "₹30K–₹90K / year"],
      ["BCA", "3 Years", "₹30K–₹90K / year"],
      ["B.Com", "3 Years", "₹30K–₹90K / year"],
      ["BBA", "3 Years", "₹30K–₹90K / year"],
    ],
  }),
  makeCollege({
    id: 21,
    name: "CMS College of Science and Commerce",
    category: "Arts & Science",
    location: "Chinnavedampatti, Coimbatore, Tamil Nadu",
    pincode: "641049",
    established: "1988",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A+",
    ranking: "Not available",
    rankingLabel: "Recognition",
    website: "https://www.cmscollege.edu.in/",
    courses: [
      ["B.Sc Computer Science", "3 Years", "₹30K–₹1L / year"],
      ["BCA", "3 Years", "₹30K–₹1L / year"],
      ["B.Com", "3 Years", "₹30K–₹1L / year"],
      ["B.Sc Psychology", "3 Years", "₹30K–₹1L / year"],
    ],
  }),
];

const orderedDefaultColleges = [
  defaultColleges[0],
  defaultColleges[1],
  defaultColleges[2],
  defaultColleges[4],
  defaultColleges[3],
  defaultColleges[5],
  ...additionalColleges,
];

const categories = [
  "All",
  "Engineering",
  "Arts & Science",
  "Management",
  "Medical",
  "Other",
];

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
        <path
          d="M36 19v8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="cp-detail-item">
      <span>{label}</span>
      <strong>{value || "Not available"}</strong>
    </div>
  );
}

function CollegeProfile() {
  const navigate = useNavigate();
  const isAddPage = window.location.pathname.endsWith("/new");

  const [colleges, setColleges] = useState(orderedDefaultColleges);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showAllColleges, setShowAllColleges] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "Engineering",
    location: "",
    district: "",
    pincode: "",
    established: "",
    type: "Autonomous",
    affiliation: "",
    accreditation: "",
    ranking: "",
    rankingLabel: "",
    counsellingCode: "",
    website: "",
    hostel: "Available",
    transportation: "Available",
    placement: "Available",
    counselling: "College Admission",
    courses: "",
    fees: "",
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const validSaved = Array.isArray(saved)
        ? saved.filter(
            (college) =>
              college?.name !== "Hindusthan College of Arts and Science" &&
              !orderedDefaultColleges.some(
                (defaultCollege) => defaultCollege.name === college?.name
              )
          )
        : [];

      setColleges([...validSaved, ...orderedDefaultColleges]);
    } catch {
      setColleges(orderedDefaultColleges);
    }
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredColleges = colleges.filter((college) => {
    const matchesCategory =
      activeCategory === "All" || college.category === activeCategory;

    if (!normalizedSearch) return matchesCategory;

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

    return matchesCategory && searchableText.includes(normalizedSearch);
  });

  const shouldShowAll =
    showAllColleges || Boolean(normalizedSearch) || activeCategory !== "All";

  const visibleColleges = shouldShowAll
    ? filteredColleges
    : filteredColleges.slice(0, 9);

  const updateForm = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const saveCollege = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter the college name.");
      return;
    }

    if (!form.location.trim()) {
      alert("Please enter the college location.");
      return;
    }

    const courseList = form.courses
      .split(",")
      .map((course) => course.trim())
      .filter(Boolean)
      .map((course) => [
        course,
        form.category === "Engineering" ? "4 Years" : "3 Years",
        form.fees || "Indicative fee",
      ]);

    const newCollege = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      location: form.location.trim(),
      district: form.district,
      pincode: form.pincode,
      established: form.established,
      type: form.type,
      affiliation: form.affiliation,
      accreditation: form.accreditation,
      ranking: form.ranking || "Not available",
      rankingLabel:
        form.rankingLabel ||
        (form.category === "Engineering"
          ? "NIRF Engineering"
          : form.category === "Arts & Science"
          ? "NIRF College"
          : "Recognition"),
      counsellingCode:
        form.category === "Engineering"
          ? form.counsellingCode || "Not available"
          : "",
      website: form.website,
      logo: form.website
        ? `https://www.google.com/s2/favicons?domain=${form.website.replace(
            /^https?:\/\//,
            ""
          )}&sz=128`
        : "",
      hostel: form.hostel,
      transportation: form.transportation,
      placement: form.placement,
      counselling: form.counselling,
      courses:
        courseList.length > 0
          ? courseList
          : [["Course information not added", "-", form.fees || "Indicative"]],
      scholarships: [
        "Government scholarships",
        "Merit scholarships",
        "Institutional financial assistance",
      ],
      placements: [
        "Placement support",
        "Career guidance",
        "Industry interaction",
      ],
    };

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const validSaved = Array.isArray(saved)
        ? saved.filter(
            (college) =>
              college?.name !== "Hindusthan College of Arts and Science" &&
              !orderedDefaultColleges.some(
                (defaultCollege) => defaultCollege.name === college?.name
              )
          )
        : [];

      const updatedSaved = [newCollege, ...validSaved];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSaved));
      setColleges([...updatedSaved, ...orderedDefaultColleges]);
      navigate("/college/profile");
    } catch {
      alert("Could not save this college. Please check your browser storage.");
    }
  };

  if (isAddPage) {
    return (
      <div className="cp-page">
        <style>{styles}</style>

        <header className="cp-header">
          <div className="cp-header-inner">
            <button
              className="cp-brand"
              onClick={() => navigate("/college/profile")}
            >
              <CampusLogo />
              <div>
                <strong>CampusConnect</strong>
                <span>Student Leads · Better Admissions</span>
              </div>
            </button>

            <button
              className="cp-secondary-btn"
              onClick={() => navigate("/college/profile")}
            >
              ← Back to Colleges
            </button>
          </div>
        </header>

        <main className="cp-add-page">
          <div className="cp-add-heading">
            <span>COLLEGE PORTAL</span>
            <h1>Add New College</h1>
            <p>Add complete institutional information to your college directory.</p>
          </div>

          <form className="cp-form" onSubmit={saveCollege}>
            <section className="cp-form-card">
              <div className="cp-form-title">
                <div className="cp-number">01</div>
                <div>
                  <h2>College Information</h2>
                  <p>Basic information about the institution</p>
                </div>
              </div>

              <div className="cp-form-grid">
                <label>
                  <span>College Name *</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder="Enter college name"
                  />
                </label>

                <label>
                  <span>College Type</span>
                  <select
                    value={form.type}
                    onChange={(e) => updateForm("type", e.target.value)}
                  >
                    <option>Autonomous</option>
                    <option>Affiliated</option>
                    <option>Deemed University</option>
                    <option>Private</option>
                    <option>Government</option>
                  </select>
                </label>

                <label>
                  <span>Category *</span>
                  <select
                    value={form.category}
                    onChange={(e) => updateForm("category", e.target.value)}
                  >
                    <option>Engineering</option>
                    <option>Arts & Science</option>
                    <option>Management</option>
                    <option>Medical</option>
                    <option>Other</option>
                  </select>
                </label>

                <label>
                  <span>Affiliation</span>
                  <input
                    value={form.affiliation}
                    onChange={(e) => updateForm("affiliation", e.target.value)}
                    placeholder="e.g. Anna University"
                  />
                </label>

                <label className="cp-full">
                  <span>Address / Location *</span>
                  <input
                    required
                    value={form.location}
                    onChange={(e) => updateForm("location", e.target.value)}
                    placeholder="College address / city / state"
                  />
                </label>

                <label>
                  <span>District</span>
                  <input
                    value={form.district}
                    onChange={(e) => updateForm("district", e.target.value)}
                    placeholder="District"
                  />
                </label>

                <label>
                  <span>Pincode</span>
                  <input
                    value={form.pincode}
                    onChange={(e) => updateForm("pincode", e.target.value)}
                    placeholder="Pincode"
                  />
                </label>

                <label>
                  <span>Established Year</span>
                  <input
                    value={form.established}
                    onChange={(e) => updateForm("established", e.target.value)}
                    placeholder="e.g. 1951"
                  />
                </label>

                <label>
                  <span>Website</span>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => updateForm("website", e.target.value)}
                    placeholder="https://example.edu"
                  />
                </label>

                <label>
                  <span>Accreditation</span>
                  <input
                    value={form.accreditation}
                    onChange={(e) => updateForm("accreditation", e.target.value)}
                    placeholder="e.g. NAAC A++"
                  />
                </label>
              </div>
            </section>

            <section className="cp-form-card">
              <div className="cp-form-title">
                <div className="cp-number">02</div>
                <div>
                  <h2>Ranking & Admission</h2>
                  <p>Add the ranking or recognition relevant to this college category.</p>
                </div>
              </div>

              <div className="cp-info-note">
                <strong>Important:</strong>
                <span>
                  Verify rankings and counselling information with official sources before publishing.
                </span>
              </div>

              <div className="cp-form-grid">
                <label>
                  <span>Ranking</span>
                  <input
                    value={form.ranking}
                    onChange={(e) => updateForm("ranking", e.target.value)}
                    placeholder="e.g. #67 / 101–150"
                  />
                </label>

                <label>
                  <span>Ranking Category</span>
                  <input
                    value={form.rankingLabel}
                    onChange={(e) => updateForm("rankingLabel", e.target.value)}
                    placeholder="e.g. NIRF Engineering 2025"
                  />
                </label>

                {form.category === "Engineering" && (
                  <label>
                    <span>TNEA Counselling Code</span>
                    <input
                      value={form.counsellingCode}
                      onChange={(e) =>
                        updateForm("counsellingCode", e.target.value)
                      }
                      placeholder="Engineering only"
                    />
                  </label>
                )}

                <label>
                  <span>Admission Process</span>
                  <select
                    value={form.counselling}
                    onChange={(e) => updateForm("counselling", e.target.value)}
                  >
                    <option>College Admission</option>
                    <option>TNEA Counselling</option>
                    <option>NEET Counselling</option>
                    <option>Management Admission</option>
                    <option>University Admission</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="cp-form-card">
              <div className="cp-form-title">
                <div className="cp-number">03</div>
                <div>
                  <h2>Courses & Fees</h2>
                  <p>Add the main courses offered by the college.</p>
                </div>
              </div>

              <div className="cp-form-grid">
                <label className="cp-full">
                  <span>Courses</span>
                  <textarea
                    value={form.courses}
                    onChange={(e) => updateForm("courses", e.target.value)}
                    placeholder="B.Tech CSE, B.Tech IT, B.Tech ECE"
                  />
                  <small>Separate course names using commas.</small>
                </label>

                <label>
                  <span>Indicative Annual Fee</span>
                  <input
                    value={form.fees}
                    onChange={(e) => updateForm("fees", e.target.value)}
                    placeholder="e.g. ₹80,000 – ₹1,20,000"
                  />
                </label>

                <label>
                  <span>Hostel</span>
                  <select
                    value={form.hostel}
                    onChange={(e) => updateForm("hostel", e.target.value)}
                  >
                    <option>Available</option>
                    <option>Not Available</option>
                  </select>
                </label>

                <label>
                  <span>Transportation</span>
                  <select
                    value={form.transportation}
                    onChange={(e) =>
                      updateForm("transportation", e.target.value)
                    }
                  >
                    <option>Available</option>
                    <option>Not Available</option>
                  </select>
                </label>

                <label>
                  <span>Placement</span>
                  <select
                    value={form.placement}
                    onChange={(e) => updateForm("placement", e.target.value)}
                  >
                    <option>Available</option>
                    <option>Not Available</option>
                  </select>
                </label>
              </div>
            </section>

            <div className="cp-form-actions">
              <button
                type="button"
                className="cp-cancel-btn"
                onClick={() => navigate("/college/profile")}
              >
                Cancel
              </button>
              <button type="submit" className="cp-primary-btn">
                + Register College
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="cp-page">
      <style>{styles}</style>

      <header className="cp-header">
        <div className="cp-header-inner">
          <button
            className="cp-brand"
            onClick={() => navigate("/college/dashboard")}
          >
            <CampusLogo />
            <div>
              <strong>CampusConnect</strong>
              <span>Student Leads · Better Admissions</span>
            </div>
          </button>

          <button
            className="cp-primary-btn cp-add-btn"
            onClick={() => navigate("/college/register")}
          >
            + Add New College
          </button>
        </div>
      </header>

      <main className="cp-main">
        <section className="cp-saved-section">
          <div className="cp-section-heading">
            <div>
              <h2>Saved Colleges</h2>
              <p>Browse colleges by category and explore detailed information.</p>
            </div>
            <div className="cp-count">{filteredColleges.length} Colleges</div>
          </div>

          <div className="cp-search-wrap">
            <span className="cp-search-icon" aria-hidden="true">⌕</span>
            <input
              className="cp-search-input"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search college name, location, category or affiliation..."
              aria-label="Search colleges"
            />
            {searchTerm && (
              <button
                type="button"
                className="cp-search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="cp-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="cp-college-grid">
            {visibleColleges.map((college) => {
              const initials = college.name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((word) => word[0])
                .join("")
                .toUpperCase();

              return (
                <article className="cp-college-card" key={college.id}>
                  <div className="cp-card-top">
                    <div className="cp-college-logo">
                      {college.logo ? (
                        <img
                          src={college.logo}
                          alt={`${college.name} logo`}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <span style={{ display: college.logo ? "none" : "flex" }}>
                        {initials || "CL"}
                      </span>
                    </div>

                    <div className="cp-card-heading">
                      <div className="cp-card-category-row">
                        <span className="cp-category">{college.category}</span>
                      </div>
                      <h3>{college.name}</h3>
                      <p className="cp-location">
                        <span aria-hidden="true">♦</span>
                        {college.location}
                      </p>
                    </div>
                  </div>

                  <div className="cp-card-divider" />

                  <div className="cp-card-details">
                    <DetailItem label="TYPE" value={college.type} />
                    <DetailItem label="AFFILIATION" value={college.affiliation} />
                    <DetailItem label="DISTRICT" value={college.district} />
                    <DetailItem label="PINCODE" value={college.pincode} />
                  </div>

                  <div className="cp-card-footer">
                    <span className="cp-established">
                      Est. {college.established || "—"}
                    </span>
                    <button
                      type="button"
                      className="cp-learn-btn"
                      onClick={() => setSelectedCollege(college)}
                    >
                      Learn More <span>→</span>
                    </button>
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
                Explore More Colleges <span>→</span>
              </button>
              <p>Showing 9 colleges · Explore to view all colleges</p>
            </div>
          )}

          {shouldShowAll &&
            filteredColleges.length > 9 &&
            !normalizedSearch &&
            activeCategory === "All" && (
              <div className="cp-explore-more-wrap">
                <button
                  type="button"
                  className="cp-explore-more-btn secondary"
                  onClick={() => setShowAllColleges(false)}
                >
                  Show Less <span>↑</span>
                </button>
              </div>
            )}

          {filteredColleges.length === 0 && (
            <div className="cp-empty">
              <h3>No colleges found</h3>
              <p>There are no colleges matching your search or category.</p>
              <button
                className="cp-primary-btn"
                onClick={() => navigate("/college/register")}
              >
                + Add New College
              </button>
            </div>
          )}
        </section>
      </main>

      {selectedCollege && (
        <div
          className="cp-modal-overlay"
          onClick={() => setSelectedCollege(null)}
        >
          <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cp-modal-close"
              onClick={() => setSelectedCollege(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <div className="cp-modal-head">
              <div className="cp-modal-logo">
                {selectedCollege.logo ? (
                  <img
                    src={selectedCollege.logo}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span>{selectedCollege.name.slice(0, 2).toUpperCase()}</span>
                )}
              </div>

              <div className="cp-modal-title-wrap">
                <span className="cp-category">{selectedCollege.category}</span>
                <h2>{selectedCollege.name}</h2>
                <p>
                  <span aria-hidden="true">♦</span> {selectedCollege.location}
                </p>
              </div>
            </div>

            <div className="cp-modal-summary">
              <div>
                <span>ESTABLISHED</span>
                <strong>{selectedCollege.established || "—"}</strong>
              </div>
              <div>
                <span>TYPE</span>
                <strong>{selectedCollege.type || "—"}</strong>
              </div>
              <div>
                <span>AFFILIATION</span>
                <strong>{selectedCollege.affiliation || "—"}</strong>
              </div>
              <div>
                <span>ADMISSION</span>
                <strong>{selectedCollege.counselling || "—"}</strong>
              </div>
            </div>

            <div className="cp-detail-grid">
              <DetailItem label="RANKING" value={selectedCollege.ranking} />
              <DetailItem
                label="RANKING CATEGORY"
                value={selectedCollege.rankingLabel}
              />
              {selectedCollege.category === "Engineering" && (
                <DetailItem
                  label="TNEA COUNSELLING CODE"
                  value={selectedCollege.counsellingCode}
                />
              )}
              <DetailItem label="AFFILIATION" value={selectedCollege.affiliation} />
              <DetailItem
                label="ACCREDITATION"
                value={selectedCollege.accreditation}
              />
              <DetailItem label="COLLEGE TYPE" value={selectedCollege.type} />
              <DetailItem
                label="ESTABLISHED"
                value={selectedCollege.established}
              />
              <DetailItem label="DISTRICT" value={selectedCollege.district} />
              <DetailItem label="PINCODE" value={selectedCollege.pincode} />
              <DetailItem label="HOSTEL" value={selectedCollege.hostel} />
              <DetailItem
                label="TRANSPORTATION"
                value={selectedCollege.transportation}
              />
              <DetailItem label="PLACEMENT" value={selectedCollege.placement} />
            </div>

            <section className="cp-modal-section">
              <div className="cp-modal-section-title">
                <h3>Courses & Indicative Fees</h3>
                <span>Approximate</span>
              </div>

              <div className="cp-course-table">
                <div className="cp-course-head">
                  <span>Course</span>
                  <span>Duration</span>
                  <span>Annual Fee</span>
                </div>

                {selectedCollege.courses?.map((course, index) => (
                  <div className="cp-course-row" key={index}>
                    <strong>{course[0]}</strong>
                    <span>{course[1]}</span>
                    <span>{course[2]}</span>
                  </div>
                ))}
              </div>

              <p className="cp-fee-note">
                Fees shown here are indicative and should be verified with the
                college before admission.
              </p>
            </section>

            <div className="cp-info-columns">
              <section className="cp-info-box">
                <h3>Scholarships</h3>
                <ul>
                  {selectedCollege.scholarships?.map((item, index) => (
                    <li key={index}>
                      <span>✓</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="cp-info-box">
                <h3>Placement & Career</h3>
                <ul>
                  {selectedCollege.placements?.map((item, index) => (
                    <li key={index}>
                      <span>✓</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="cp-admission-box">
              <div>
                <span>ADMISSION</span>
                <h3>{selectedCollege.counselling || "—"}</h3>
              </div>

              {selectedCollege.category === "Engineering" && (
                <div>
                  <span>COUNSELLING CODE</span>
                  <h3>{selectedCollege.counsellingCode || "—"}</h3>
                </div>
              )}

              {selectedCollege.website && (
                <a
                  href={selectedCollege.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Official Website →
                </a>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  min-height: 100%;
  margin: 0;
}

body {
  overflow-x: hidden;
}

.cp-page {
  width: 100%;
  min-height: 100vh;
  background: #f4f8fd;
  color: #12284a;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  overflow-x: hidden;
  font-size: 16px;
}

.cp-header {
  width: 100%;
  height: 78px;
  background: #fff;
  border-bottom: 1px solid #e0e9f3;
  box-shadow: 0 4px 18px rgba(26, 65, 112, 0.07);
  position: sticky;
  top: 0;
  z-index: 100;
}

.cp-header-inner {
  width: 100%;
  height: 100%;
  padding: 0 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
}

.cp-brand-logo {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.cp-brand-logo svg {
  width: 100%;
  height: 100%;
}

.cp-brand-logo svg rect {
  fill: #1769e0;
}

.cp-brand strong {
  display: block;
  color: #173d6b;
  font-size: 19px;
  font-weight: 850;
}

.cp-brand span {
  display: block;
  margin-top: 4px;
  color: #7890ad;
  font-size: 9px;
  font-weight: 700;
}

.cp-primary-btn,
.cp-secondary-btn,
.cp-cancel-btn {
  border: 0;
  min-height: 44px;
  padding: 0 21px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.25s ease;
}

.cp-primary-btn {
  color: #fff;
  background: linear-gradient(100deg, #1458d8, #1673e8, #10a5df);
  box-shadow: 0 7px 18px rgba(22, 103, 224, 0.22);
}

.cp-primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(22, 103, 224, 0.28);
}

.cp-secondary-btn {
  color: #1c5eb9;
  background: #edf5ff;
  border: 1px solid #d7e8fb;
}

.cp-secondary-btn:hover {
  background: #e1efff;
}

.cp-add-btn {
  min-width: 155px;
}

.cp-main {
  width: min(100% - 64px, 1600px);
  margin: 0 auto;
  padding: 28px 0 70px;
  min-height: calc(100vh - 78px);
}

.cp-saved-section {
  width: 100%;
  padding: 28px;
  background: #f8fbff;
  border: 1px solid #e2eaf3;
  border-radius: 22px;
  box-shadow: 0 12px 35px rgba(31, 71, 116, 0.06);
}

.cp-section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 14px;
}

.cp-section-heading h2 {
  margin: 0 0 5px;
  color: #102b4d;
  font-size: 27px;
  line-height: 1.2;
  font-weight: 900;
}

.cp-section-heading p {
  margin: 0;
  color: #7890aa;
  font-size: 16px;
  line-height: 1.4;
}

.cp-count {
  padding: 9px 14px;
  border-radius: 20px;
  background: #eaf3ff;
  color: #1169d0;
  font-size: 14px;
  font-weight: 850;
  white-space: nowrap;
}

.cp-search-wrap {
  position: relative;
  width: 100%;
  min-height: 58px;
  margin: 22px 0 16px;
  border: 1px solid #cbd9e8;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 7px 20px rgba(38, 75, 113, 0.07);
}

.cp-search-input {
  width: 100%;
  height: 56px;
  padding: 0 52px 0 50px;
  border: 0;
  border-radius: 14px;
  background: transparent;
  color: #173452;
  outline: none;
  font-size: 16px;
  font-weight: 600;
}

.cp-search-input:focus {
  box-shadow: 0 0 0 3px rgba(47, 102, 208, 0.1);
}

.cp-search-input::placeholder {
  color: #77869a;
  font-size: 15px;
}

.cp-search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-52%);
  font-size: 26px;
  color: #66758b;
  pointer-events: none;
}

.cp-search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #eef3f9;
  color: #42516a;
  font-size: 22px;
  cursor: pointer;
}

.cp-tabs {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 7px;
  margin: 0 0 20px;
}

.cp-tabs button {
  min-height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid #d8e4f1;
  background: #fff;
  color: #526d8c;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease;
}

.cp-tabs button:hover {
  border-color: #9fc6f1;
  color: #1268cf;
}

.cp-tabs button.active {
  border-color: #1767c9;
  color: #fff;
  background: #1767c9;
  box-shadow: 0 5px 13px rgba(21, 105, 221, 0.2);
}

.cp-college-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 22px;
}

.cp-college-card {
  width: 100%;
  min-width: 0;
  min-height: 350px;
  padding: 22px;
  border-radius: 20px;
  border: 1px solid #dce6f1;
  box-shadow: 0 9px 25px rgba(34, 74, 117, 0.08);
  background: #fff;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.cp-college-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 38px rgba(34, 74, 117, 0.14);
  border-color: #bcd5ee;
}

.cp-card-top {
  width: 100%;
  min-height: 104px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  column-gap: 16px;
  align-items: start;
}

.cp-college-logo {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: #f5f8fc;
  border: 1px solid #dce6f1;
  box-shadow: 0 7px 16px rgba(27, 66, 108, 0.09);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cp-college-logo img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  display: block;
}

.cp-college-logo span {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(145deg, #173d82, #2d63c2);
  font-size: 20px;
  font-weight: 900;
}

.cp-card-heading {
  min-width: 0;
  text-align: left;
}

.cp-card-category-row {
  width: 100%;
  min-height: 31px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.cp-category {
  width: fit-content;
  min-height: 31px;
  padding: 0 11px;
  border-radius: 7px;
  background: #edf5ff;
  color: #2165b4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
}

.cp-card-heading h3 {
  margin: 8px 0 0;
  color: #122b4b;
  text-align: left;
  font-size: 20px;
  line-height: 1.3;
  font-weight: 900;
  overflow-wrap: anywhere;
}

.cp-location {
  margin: 7px 0 0;
  color: #667d98;
  text-align: left;
  font-size: 14px;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.cp-location span {
  margin-right: 6px;
  color: #617994;
  font-size: 8px;
}

.cp-card-divider {
  width: 100%;
  height: 1px;
  flex: 0 0 auto;
  background: #e8edf3;
  margin: 0 0 17px;
}

.cp-card-details {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.cp-card-details .cp-detail-item {
  min-width: 0;
  min-height: 70px;
  padding: 12px 10px;
  border: 1px solid #edf1f5;
  border-radius: 10px;
  background: #f7f9fc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.cp-detail-item span {
  display: block;
  margin-bottom: 8px;
  color: #7a8799;
  font-size: 10px;
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: 0.7px;
}

.cp-detail-item strong {
  display: block;
  max-width: 100%;
  color: #1a304d;
  font-size: 13px;
  line-height: 1.4;
  font-weight: 850;
  overflow-wrap: anywhere;
}

.cp-card-footer {
  margin-top: auto;
  padding-top: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.cp-established {
  min-width: 0;
  color: #6f8195;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.cp-learn-btn {
  min-height: 42px;
  flex: 0 0 auto;
  padding: 0 16px;
  border: 0;
  border-radius: 10px;
  background: #122a4a;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  white-space: nowrap;
  transition: 0.2s ease;
}

.cp-learn-btn span {
  font-size: 17px;
  line-height: 1;
}

.cp-learn-btn:hover {
  background: #1a4b87;
  transform: translateY(-1px);
}

.cp-empty {
  padding: 60px 20px;
  text-align: center;
}

.cp-empty h3 {
  margin: 0 0 8px;
  color: #173b65;
}

.cp-empty p {
  margin: 0 0 20px;
  color: #71859e;
}

.cp-explore-more-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 30px 0 4px;
}

.cp-explore-more-btn {
  min-height: 48px;
  padding: 0 24px;
  border: 1px solid #1767c9;
  border-radius: 12px;
  background: #1767c9;
  color: #fff;
  font-size: 15px;
  font-weight: 850;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 9px 20px rgba(23, 103, 201, 0.2);
  transition: 0.2s ease;
}

.cp-explore-more-btn:hover {
  transform: translateY(-2px);
  background: #0f55ab;
}

.cp-explore-more-btn span {
  font-size: 19px;
}

.cp-explore-more-btn.secondary {
  background: #fff;
  color: #1767c9;
  box-shadow: none;
}

.cp-explore-more-wrap p {
  margin: 0;
  color: #70839a;
  font-size: 13px;
  font-weight: 600;
}

/* Details modal */
.cp-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  padding: 24px 16px;
  background: rgba(8, 25, 48, 0.62);
  backdrop-filter: blur(5px);
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.cp-modal {
  width: min(100%, 980px);
  margin: 12px auto;
  position: relative;
  padding: 28px 30px 30px;
  border: 1px solid #e1e8f0;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.25);
  color: #17314f;
}

.cp-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border: 1px solid #dce6ef;
  border-radius: 50%;
  background: #f5f8fb;
  color: #34516f;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.cp-modal-head {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  padding-right: 48px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8edf3;
}

.cp-modal-logo {
  width: 70px;
  height: 70px;
  border-radius: 15px;
  background: linear-gradient(145deg, #173d82, #2d63c2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 7px 16px rgba(23, 72, 145, 0.18);
}

.cp-modal-logo img {
  width: 54px;
  height: 54px;
  object-fit: contain;
}

.cp-modal-logo span {
  color: #fff;
  font-size: 21px;
  font-weight: 900;
}

.cp-modal-title-wrap {
  min-width: 0;
  text-align: left;
}

.cp-modal-title-wrap .cp-category {
  margin-bottom: 5px;
}

.cp-modal-head h2 {
  margin: 0;
  color: #122e51;
  font-size: 27px;
  line-height: 1.25;
  font-weight: 900;
  overflow-wrap: anywhere;
}

.cp-modal-head p {
  margin: 6px 0 0;
  color: #71859d;
  font-size: 15px;
  line-height: 1.4;
}

.cp-modal-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 9px;
  margin: 18px 0 10px;
}

.cp-modal-summary > div {
  min-width: 0;
  min-height: 64px;
  padding: 16px;
  border: 1px solid #e5ebf1;
  border-radius: 9px;
  background: #f7f9fc;
}

.cp-modal-summary span {
  display: block;
  margin-bottom: 7px;
  color: #7b8ba0;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.8px;
}

.cp-modal-summary strong {
  display: block;
  color: #203953;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 850;
  overflow-wrap: anywhere;
}

.cp-detail-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
  margin: 10px 0 24px;
}

.cp-detail-grid .cp-detail-item {
  min-width: 0;
  min-height: 78px;
  padding: 14px;
  border: 1px solid #e5ebf1;
  border-radius: 9px;
  background: #fff;
  text-align: left;
}

.cp-detail-grid .cp-detail-item span {
  font-size: 11px;
}

.cp-detail-grid .cp-detail-item strong {
  font-size: 15px;
}

.cp-modal-section {
  margin-top: 20px;
}

.cp-modal-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 10px;
}

.cp-modal-section-title h3,
.cp-info-box h3 {
  margin: 0;
  color: #173b64;
  font-size: 19px;
  line-height: 1.3;
  font-weight: 900;
}

.cp-modal-section-title span {
  color: #71869f;
  font-size: 12px;
}

.cp-course-table {
  overflow: hidden;
  border: 1px solid #e2e9f0;
  border-radius: 10px;
}

.cp-course-head,
.cp-course-row {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) 120px 150px;
  gap: 14px;
  padding: 11px 14px;
  align-items: center;
  text-align: left;
}

.cp-course-head {
  background: #f3f7fb;
  color: #6c7f95;
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.cp-course-row {
  min-height: 48px;
  border-top: 1px solid #e8eef4;
  color: #526b84;
  font-size: 14px;
  line-height: 1.4;
}

.cp-course-row strong {
  color: #173b62;
  font-size: 15px;
  line-height: 1.4;
  font-weight: 850;
}

.cp-course-row span {
  font-size: 14px;
}

.cp-fee-note {
  margin: 9px 0 0;
  color: #7a8da2;
  font-size: 12px;
  line-height: 1.45;
}

.cp-info-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.cp-info-box {
  padding: 17px;
  border: 1px solid #e2e9f0;
  border-radius: 12px;
  background: #f8fafc;
}

.cp-info-box ul {
  margin: 13px 0 0;
  padding: 0;
  list-style: none;
}

.cp-info-box li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin-bottom: 9px;
  color: #435d79;
  font-size: 13px;
  line-height: 1.45;
}

.cp-info-box li span {
  flex: 0 0 auto;
  color: #1672d3;
  font-weight: 900;
}

.cp-info-box li p {
  margin: 0;
}

.cp-admission-box {
  margin-top: 18px;
  padding: 17px;
  border-radius: 12px;
  background: #102b4b;
  color: #fff;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
}

.cp-admission-box span {
  color: #91b8e7;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
}

.cp-admission-box h3 {
  margin: 5px 0 0;
  color: #fff;
  font-size: 14px;
  line-height: 1.35;
}

.cp-admission-box a {
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

/* Add college form */
.cp-add-page {
  width: min(100%, 1050px);
  margin: 0 auto;
  padding: 42px 24px 70px;
}

.cp-add-heading {
  margin-bottom: 30px;
}

.cp-add-heading > span {
  color: #1769d2;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
}

.cp-add-heading h1 {
  margin: 8px 0;
  color: #173b65;
  font-size: 36px;
}

.cp-add-heading p {
  margin: 0;
  color: #7890aa;
}

.cp-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cp-form-card {
  padding: 24px;
  border: 1px solid #dfe8f1;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 6px 22px rgba(42, 79, 119, 0.06);
}

.cp-form-title {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 22px;
}

.cp-number {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #eaf3ff;
  color: #1268cf;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 900;
}

.cp-form-title h2 {
  margin: 0 0 4px;
  color: #173b65;
  font-size: 18px;
}

.cp-form-title p {
  margin: 0;
  color: #7890aa;
  font-size: 11px;
}

.cp-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
}

.cp-form-grid label {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.cp-form-grid label > span {
  color: #344f6d;
  font-size: 11px;
  font-weight: 850;
}

.cp-form-grid input,
.cp-form-grid select,
.cp-form-grid textarea {
  width: 100%;
  border: 1px solid #d9e4ee;
  border-radius: 9px;
  background: #fbfdff;
  color: #193653;
  outline: none;
  font: inherit;
  font-size: 12px;
  padding: 11px 12px;
}

.cp-form-grid input,
.cp-form-grid select {
  height: 43px;
}

.cp-form-grid textarea {
  min-height: 105px;
  resize: vertical;
}

.cp-form-grid input:focus,
.cp-form-grid select:focus,
.cp-form-grid textarea:focus {
  border-color: #6ba8e9;
  box-shadow: 0 0 0 3px rgba(45, 126, 214, 0.1);
}

.cp-full {
  grid-column: 1 / -1;
}

.cp-form-grid small {
  color: #8193a8;
  font-size: 9px;
}

.cp-info-note {
  display: flex;
  gap: 7px;
  margin-bottom: 17px;
  padding: 11px 13px;
  border-radius: 9px;
  background: #f2f7fd;
  color: #607994;
  font-size: 10px;
  line-height: 1.5;
}

.cp-info-note strong {
  color: #185fae;
  white-space: nowrap;
}

.cp-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 2px;
}

.cp-cancel-btn {
  color: #526c87;
  background: #fff;
  border: 1px solid #d8e3ed;
}

@media (max-width: 1100px) {
  .cp-main {
    width: calc(100% - 36px);
  }

  .cp-saved-section {
    padding: 24px;
  }

  .cp-college-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 720px) {
  .cp-header {
    height: auto;
    min-height: 70px;
  }

  .cp-header-inner {
    min-height: 70px;
    padding: 10px 16px;
    gap: 12px;
  }

  .cp-brand-logo {
    width: 40px;
    height: 40px;
  }

  .cp-brand strong {
    font-size: 16px;
  }

  .cp-brand span {
    display: none;
  }

  .cp-add-btn {
    min-width: auto;
    padding: 0 12px;
    font-size: 11px;
  }

  .cp-main {
    width: calc(100% - 24px);
    padding: 18px 0 45px;
  }

  .cp-saved-section {
    padding: 18px;
    border-radius: 17px;
  }

  .cp-section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .cp-section-heading h2 {
    font-size: 23px;
  }

  .cp-tabs {
    justify-content: flex-start;
  }

  .cp-college-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .cp-college-card {
    min-height: 350px;
    height: auto;
    padding: 19px;
  }

  .cp-card-heading h3 {
    font-size: 19px;
  }

  .cp-modal-overlay {
    padding: 10px;
  }

  .cp-modal {
    margin: 5px auto;
    padding: 20px 16px 22px;
    border-radius: 15px;
  }

  .cp-modal-head {
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 12px;
    align-items: flex-start;
    padding-right: 38px;
  }

  .cp-modal-logo {
    width: 58px;
    height: 58px;
    border-radius: 12px;
  }

  .cp-modal-logo img {
    width: 45px;
    height: 45px;
  }

  .cp-modal-head h2 {
    font-size: 21px;
  }

  .cp-modal-summary,
  .cp-detail-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cp-info-columns,
  .cp-admission-box {
    grid-template-columns: 1fr;
  }

  .cp-course-table {
    overflow-x: auto;
  }

  .cp-course-head,
  .cp-course-row {
    min-width: 600px;
  }

  .cp-add-page {
    padding: 28px 14px 50px;
  }

  .cp-form-card {
    padding: 18px 15px;
  }

  .cp-form-grid {
    grid-template-columns: 1fr;
  }

  .cp-full {
    grid-column: auto;
  }

  .cp-form-actions {
    flex-direction: column-reverse;
  }

  .cp-form-actions button {
    width: 100%;
  }
}

@media (max-width: 430px) {
  .cp-header-inner {
    padding-left: 12px;
    padding-right: 12px;
  }

  .cp-brand {
    gap: 8px;
  }

  .cp-brand strong {
    font-size: 14px;
  }

  .cp-add-btn {
    padding: 0 9px;
  }

  .cp-college-card {
    padding: 15px;
  }

  .cp-card-top {
    grid-template-columns: 58px minmax(0, 1fr);
    column-gap: 12px;
  }

  .cp-college-logo {
    width: 58px;
    height: 58px;
  }

  .cp-college-logo img {
    width: 46px;
    height: 46px;
  }

  .cp-card-footer {
    gap: 8px;
  }

  .cp-learn-btn {
    padding: 0 12px;
    font-size: 13px;
  }

  .cp-modal-summary,
  .cp-detail-grid {
    grid-template-columns: 1fr;
  }

  .cp-modal-section-title {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }
}
`;

export default CollegeProfile;
