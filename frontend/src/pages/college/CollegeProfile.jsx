import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "campusconnect_custom_colleges";

const defaultColleges = [
  {
    id: 1,
    name: "PSG College of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    pincode: "641004",
    established: "1951",
    type: "Autonomous",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    ranking: "#67",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "2006",
    website: "https://www.psgtech.edu/",
    logo: "https://www.google.com/s2/favicons?domain=psgtech.edu&sz=128",
    hostel: "Available",
    transportation: "Available",
    placement: "Available",
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
  },
  {
    id: 2,
    name: "Coimbatore Institute of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    pincode: "641014",
    established: "1956",
    type: "Autonomous",
    affiliation: "Anna University",
    accreditation: "NAAC A+",
    ranking: "101–150",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "2007",
    website: "https://cit.edu.in/",
    logo: "https://www.google.com/s2/favicons?domain=cit.edu.in&sz=128",
    hostel: "Available",
    transportation: "Available",
    placement: "Available",
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
  },
  {
    id: 3,
    name: "Kumaraguru College of Technology",
    category: "Engineering",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    pincode: "641049",
    established: "1984",
    type: "Autonomous",
    affiliation: "Anna University",
    accreditation: "NAAC A++",
    ranking: "101–150",
    rankingLabel: "NIRF Engineering 2025",
    counsellingCode: "Verify current TNEA code",
    website: "https://www.kct.ac.in/",
    logo: "https://www.google.com/s2/favicons?domain=kct.ac.in&sz=128",
    hostel: "Available",
    transportation: "Available",
    placement: "Available",
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
  },
  {
    id: 4,
    name: "PSG College of Arts and Science",
    category: "Arts & Science",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    pincode: "641014",
    established: "1947",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A++",
    ranking: "#10",
    rankingLabel: "NIRF College 2025",
    website: "https://www.psgcas.ac.in/",
    logo: "https://www.google.com/s2/favicons?domain=psgcas.ac.in&sz=128",
    hostel: "Available",
    transportation: "Available",
    placement: "Available",
    counselling: "College Admission",
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
  },
  {
    id: 5,
    name: "PSGR Krishnammal College for Women",
    category: "Arts & Science",
    location: "Coimbatore, Tamil Nadu",
    district: "Coimbatore",
    pincode: "641004",
    established: "1963",
    type: "Autonomous",
    affiliation: "Bharathiar University",
    accreditation: "NAAC A++",
    ranking: "#9",
    rankingLabel: "NIRF College 2025",
    website: "https://www.psgrkcw.ac.in/",
    logo: "https://www.google.com/s2/favicons?domain=psgrkcw.ac.in&sz=128",
    hostel: "Available",
    transportation: "Available",
    placement: "Available",
    counselling: "College Admission",
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
  },
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

  const [colleges, setColleges] = useState(defaultColleges);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCollege, setSelectedCollege] = useState(null);

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
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (Array.isArray(saved) && saved.length) {
      setColleges([...saved, ...defaultColleges]);
    }
  }, []);

  const filteredColleges =
    activeCategory === "All"
      ? colleges
      : colleges.filter((college) => college.category === activeCategory);

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
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
      name: form.name,
      category: form.category,
      location: form.location,
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

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    const updatedSaved = [newCollege, ...saved];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedSaved)
    );

    setColleges([...updatedSaved, ...defaultColleges]);

    navigate("/college/profile");
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

            <p>
              Add complete institutional information to your college directory.
            </p>
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
                    value={form.name}
                    onChange={(e) =>
                      updateForm("name", e.target.value)
                    }
                    placeholder="Enter college name"
                  />
                </label>

                <label>
                  <span>College Type</span>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      updateForm("type", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateForm("category", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateForm("affiliation", e.target.value)
                    }
                    placeholder="e.g. Anna University"
                  />
                </label>

                <label className="cp-full">
                  <span>Address / Location *</span>

                  <input
                    value={form.location}
                    onChange={(e) =>
                      updateForm("location", e.target.value)
                    }
                    placeholder="College address / city / state"
                  />
                </label>

                <label>
                  <span>District</span>

                  <input
                    value={form.district}
                    onChange={(e) =>
                      updateForm("district", e.target.value)
                    }
                    placeholder="District"
                  />
                </label>

                <label>
                  <span>Pincode</span>

                  <input
                    value={form.pincode}
                    onChange={(e) =>
                      updateForm("pincode", e.target.value)
                    }
                    placeholder="Pincode"
                  />
                </label>

                <label>
                  <span>Established Year</span>

                  <input
                    value={form.established}
                    onChange={(e) =>
                      updateForm("established", e.target.value)
                    }
                    placeholder="e.g. 1951"
                  />
                </label>

                <label>
                  <span>Website</span>

                  <input
                    value={form.website}
                    onChange={(e) =>
                      updateForm("website", e.target.value)
                    }
                    placeholder="https://example.edu"
                  />
                </label>

                <label>
                  <span>Accreditation</span>

                  <input
                    value={form.accreditation}
                    onChange={(e) =>
                      updateForm("accreditation", e.target.value)
                    }
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

                  <p>
                    Add the ranking or recognition relevant to this college
                    category.
                  </p>
                </div>
              </div>

              <div className="cp-info-note">
                <strong>Important:</strong>

                <span>
                  Engineering colleges use NIRF Engineering. Arts & Science
                  colleges can use NIRF College. Other categories should use
                  their relevant ranking or recognition.
                </span>
              </div>

              <div className="cp-form-grid">
                <label>
                  <span>Ranking</span>

                  <input
                    value={form.ranking}
                    onChange={(e) =>
                      updateForm("ranking", e.target.value)
                    }
                    placeholder="e.g. #67 / 101–150"
                  />
                </label>

                <label>
                  <span>Ranking Category</span>

                  <input
                    value={form.rankingLabel}
                    onChange={(e) =>
                      updateForm("rankingLabel", e.target.value)
                    }
                    placeholder="e.g. NIRF Engineering 2025"
                  />
                </label>

                {form.category === "Engineering" && (
                  <label>
                    <span>TNEA Counselling Code</span>

                    <input
                      value={form.counsellingCode}
                      onChange={(e) =>
                        updateForm(
                          "counsellingCode",
                          e.target.value
                        )
                      }
                      placeholder="Engineering only"
                    />
                  </label>
                )}

                <label>
                  <span>Admission Process</span>

                  <select
                    value={form.counselling}
                    onChange={(e) =>
                      updateForm(
                        "counselling",
                        e.target.value
                      )
                    }
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

                  <p>
                    Add the main courses offered by the college.
                  </p>
                </div>
              </div>

              <div className="cp-form-grid">
                <label className="cp-full">
                  <span>Courses</span>

                  <textarea
                    value={form.courses}
                    onChange={(e) =>
                      updateForm("courses", e.target.value)
                    }
                    placeholder="B.Tech CSE, B.Tech IT, B.Tech ECE, B.Tech AI & DS"
                  />

                  <small>
                    Separate course names using commas.
                  </small>
                </label>

                <label>
                  <span>Indicative Annual Fee</span>

                  <input
                    value={form.fees}
                    onChange={(e) =>
                      updateForm("fees", e.target.value)
                    }
                    placeholder="e.g. ₹80,000 – ₹1,20,000"
                  />
                </label>

                <label>
                  <span>Hostel</span>

                  <select
                    value={form.hostel}
                    onChange={(e) =>
                      updateForm("hostel", e.target.value)
                    }
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
                      updateForm(
                        "transportation",
                        e.target.value
                      )
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
                    onChange={(e) =>
                      updateForm(
                        "placement",
                        e.target.value
                      )
                    }
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
                onClick={() =>
                  navigate("/college/profile")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cp-primary-btn"
              >
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
            onClick={() =>
              navigate("/college/dashboard")
            }
          >
            <CampusLogo />

            <div>
              <strong>CampusConnect</strong>
              <span>Student Leads · Better Admissions</span>
            </div>
          </button>

          <button
            className="cp-primary-btn cp-add-btn"
            onClick={() =>
              navigate("/college/profile/new")
            }
          >
            + Add New College
          </button>
        </div>
      </header>

      <main className="cp-main">
        <section className="cp-page-heading">
          <span>COLLEGE PORTAL</span>

          <h1>College Profiles</h1>

          <p>
            Explore colleges, rankings and complete institutional
            information.
          </p>
        </section>

        <section className="cp-saved-section">
          <div className="cp-section-heading">
            <div>
              <h2>Saved Colleges</h2>

              <p>
                Browse colleges by category and explore detailed
                information.
              </p>
            </div>

            <div className="cp-count">
              {filteredColleges.length} Colleges
            </div>
          </div>

          <div className="cp-tabs">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>

          <div className="cp-college-grid">
            {filteredColleges.map((college) => (
              <article
                className="cp-college-card"
                key={college.id}
              >
                <div className="cp-card-top">
                  <div className="cp-college-logo">
                    {college.logo ? (
                      <img
                        src={college.logo}
                        alt={`${college.name} logo`}
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";

                          e.currentTarget.parentElement.classList.add(
                            "fallback-logo"
                          );
                        }}
                      />
                    ) : (
                      <span>
                        {college.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="cp-rank">
                    {college.ranking || "N/A"}
                  </div>
                </div>

                <span className="cp-category">
                  {college.category}
                </span>

                <h3>{college.name}</h3>

                <p className="cp-location">
                  <span>◆</span>
                  {college.location}
                </p>

                <div className="cp-card-details">
                  <DetailItem
                    label="TYPE"
                    value={college.type}
                  />

                  <DetailItem
                    label="AFFILIATION"
                    value={college.affiliation}
                  />

                  <DetailItem
                    label="DISTRICT"
                    value={college.district}
                  />

                  <DetailItem
                    label="PINCODE"
                    value={college.pincode}
                  />

                  <DetailItem
                    label="ESTABLISHED"
                    value={college.established}
                  />

                  <DetailItem
                    label="ACCREDITATION"
                    value={college.accreditation}
                  />
                </div>

                <button
                  className="cp-learn-btn"
                  onClick={() =>
                    setSelectedCollege(college)
                  }
                >
                  Learn More
                  <span>→</span>
                </button>
              </article>
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="cp-empty">
              <h3>No colleges found</h3>

              <p>
                There are no colleges in this category yet.
              </p>

              <button
                className="cp-primary-btn"
                onClick={() =>
                  navigate("/college/profile/new")
                }
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
          onClick={() =>
            setSelectedCollege(null)
          }
        >
          <div
            className="cp-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="cp-modal-close"
              onClick={() =>
                setSelectedCollege(null)
              }
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
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />
                ) : (
                  <span>
                    {selectedCollege.name.charAt(0)}
                  </span>
                )}
              </div>

              <div>
                <span className="cp-category">
                  {selectedCollege.category}
                </span>

                <h2>{selectedCollege.name}</h2>

                <p>
                  {selectedCollege.location}
                </p>
              </div>
            </div>

            <div className="cp-detail-grid">
              <DetailItem
                label="RANKING"
                value={selectedCollege.ranking}
              />

              <DetailItem
                label="RANKING CATEGORY"
                value={selectedCollege.rankingLabel}
              />

              {selectedCollege.category ===
                "Engineering" && (
                <DetailItem
                  label="TNEA COUNSELLING CODE"
                  value={
                    selectedCollege.counsellingCode
                  }
                />
              )}

              <DetailItem
                label="AFFILIATION"
                value={selectedCollege.affiliation}
              />

              <DetailItem
                label="ACCREDITATION"
                value={
                  selectedCollege.accreditation
                }
              />

              <DetailItem
                label="COLLEGE TYPE"
                value={selectedCollege.type}
              />

              <DetailItem
                label="ESTABLISHED"
                value={
                  selectedCollege.established
                }
              />

              <DetailItem
                label="DISTRICT"
                value={selectedCollege.district}
              />

              <DetailItem
                label="PINCODE"
                value={selectedCollege.pincode}
              />

              <DetailItem
                label="HOSTEL"
                value={selectedCollege.hostel}
              />

              <DetailItem
                label="TRANSPORTATION"
                value={
                  selectedCollege.transportation
                }
              />

              <DetailItem
                label="PLACEMENT"
                value={
                  selectedCollege.placement
                }
              />
            </div>

            <section className="cp-modal-section">
              <div className="cp-modal-section-title">
                <h3>
                  Courses & Indicative Fees
                </h3>

                <span>Approximate</span>
              </div>

              <div className="cp-course-table">
                <div className="cp-course-head">
                  <span>Course</span>
                  <span>Duration</span>
                  <span>Annual Fee</span>
                </div>

                {selectedCollege.courses?.map(
                  (course, index) => (
                    <div
                      className="cp-course-row"
                      key={index}
                    >
                      <strong>
                        {course[0]}
                      </strong>

                      <span>
                        {course[1]}
                      </span>

                      <span>
                        {course[2]}
                      </span>
                    </div>
                  )
                )}
              </div>

              <p className="cp-fee-note">
                Fees shown here are indicative and
                should be verified with the college
                before admission.
              </p>
            </section>

            <div className="cp-info-columns">
              <section className="cp-info-box">
                <h3>Scholarships</h3>

                <ul>
                  {selectedCollege.scholarships?.map(
                    (item, index) => (
                      <li key={index}>
                        <span>✓</span>

                        <p>{item}</p>
                      </li>
                    )
                  )}
                </ul>
              </section>

              <section className="cp-info-box">
                <h3>
                  Placement & Career
                </h3>

                <ul>
                  {selectedCollege.placements?.map(
                    (item, index) => (
                      <li key={index}>
                        <span>✓</span>

                        <p>{item}</p>
                      </li>
                    )
                  )}
                </ul>
              </section>
            </div>

            <section className="cp-admission-box">
              <div>
                <span>ADMISSION</span>

                <h3>
                  {selectedCollege.counselling}
                </h3>
              </div>

              {selectedCollege.category ===
                "Engineering" && (
                <div>
                  <span>
                    COUNSELLING CODE
                  </span>

                  <h3>
                    {
                      selectedCollege.counsellingCode
                    }
                  </h3>
                </div>
              )}

              {selectedCollege.website && (
                <a
                  href={
                    selectedCollege.website
                  }
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

.cp-page {
  width: 100vw;
  max-width: none;
  min-width: 100vw;
  min-height: 100vh;
  margin-left: calc(50% - 50vw);
  margin-right: 0;
  padding: 0;
  position: relative;
  background: #f4f8fd;
  color: #12284a;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* header */

.cp-header {
  width: 100%;
  height: 78px;
  background: #ffffff;
  border-bottom: 1px solid #e0e9f3;
  box-shadow: 0 4px 18px rgba(26, 65, 112, 0.07);
  position: sticky;
  top: 0;
  z-index: 100;
}

.cp-header-inner {
  width: 100%;
  max-width: none;
  height: 100%;
  margin: 0;
  padding: 0 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
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
  letter-spacing: -0.3px;
}

.cp-brand span {
  display: block;
  margin-top: 4px;
  color: #7890ad;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2px;
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
  color: #ffffff;
  background: linear-gradient(
    100deg,
    #1458d8,
    #1673e8,
    #10a5df
  );
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

/* main */

.cp-main {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 48px 34px 75px;
  min-height: calc(100vh - 78px);
  box-sizing: border-box;
}

.cp-page-heading {
  width: 100%;
  text-align: center;
  margin-bottom: 42px;
}

.cp-page-heading span,
.cp-add-heading > span {
  color: #0878dc;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.cp-page-heading h1,
.cp-add-heading h1 {
  margin: 10px 0 9px;
  color: #153b68;
  font-size: 34px;
  line-height: 1.15;
  font-weight: 900;
  letter-spacing: -1px;
}

.cp-page-heading p,
.cp-add-heading p {
  margin: 0;
  color: #7086a2;
  font-size: 14px;
  line-height: 1.6;
}

/* section heading */

.cp-saved-section {
  width: 100%;
}

.cp-section-heading {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.cp-section-heading h2 {
  margin: 0 0 6px;
  color: #163c68;
  font-size: 23px;
  font-weight: 850;
}

.cp-section-heading p {
  margin: 0;
  color: #7890aa;
  font-size: 13px;
}

.cp-count {
  padding: 11px 17px;
  border-radius: 20px;
  background: #eaf3ff;
  color: #1169d0;
  font-size: 12px;
  font-weight: 850;
}

/* tabs */

.cp-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.cp-tabs button {
  min-height: 39px;
  padding: 0 19px;
  border-radius: 9px;
  border: 1px solid #d8e4f1;
  background: #ffffff;
  color: #526d8c;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease;
}

.cp-tabs button:hover {
  border-color: #9fc6f1;
  color: #1268cf;
}

.cp-tabs button.active {
  border-color: #1474df;
  color: #ffffff;
  background: linear-gradient(
    100deg,
    #135dd9,
    #1596e4
  );
  box-shadow: 0 5px 13px rgba(21, 105, 221, 0.2);
}

/* college cards */

.cp-college-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.cp-college-card {
  min-width: 0;
  min-height: 455px;
  background: #ffffff;
  border: 1px solid #dfe8f2;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 5px 20px rgba(42, 79, 119, 0.06);
  display: flex;
  flex-direction: column;
  transition: 0.25s ease;
}

.cp-college-card:hover {
  transform: translateY(-3px);
  border-color: #c7ddf5;
  box-shadow: 0 12px 30px rgba(42, 79, 119, 0.1);
}

.cp-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.cp-college-logo {
  width: 62px;
  height: 62px;
  border: 1px solid #dce6f1;
  background: #ffffff;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.cp-college-logo img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.cp-college-logo span {
  color: #176bd2;
  font-size: 24px;
  font-weight: 900;
}

.cp-college-logo.fallback-logo::after {
  content: "C";
  color: #176bd2;
  font-size: 24px;
  font-weight: 900;
}

.cp-rank {
  min-width: 65px;
  min-height: 38px;
  padding: 0 10px;
  border-radius: 9px;
  background: #edf5ff;
  color: #1267cf;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 900;
  text-align: center;
}

.cp-category {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  min-height: 29px;
  padding: 0 11px;
  border-radius: 7px;
  background: #edf5ff;
  color: #1467cb;
  font-size: 10px;
  font-weight: 900;
  margin-bottom: 10px;
}

.cp-college-card h3 {
  min-height: 48px;
  margin: 0;
  color: #123b69;
  font-size: 17px;
  line-height: 1.4;
  font-weight: 850;
}

.cp-location {
  min-height: 38px;
  margin: 8px 0 15px;
  color: #617b99;
  font-size: 12px;
  line-height: 1.5;
}

.cp-location span {
  color: #176bd3;
  margin-right: 6px;
  font-size: 8px;
}

.cp-card-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border: 1px solid #e1e9f2;
  border-radius: 9px;
  overflow: hidden;
  flex: 1;
}

.cp-detail-item {
  min-height: 75px;
  padding: 12px;
  background: #ffffff;
  border-right: 1px solid #e1e9f2;
  border-bottom: 1px solid #e1e9f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cp-detail-item:nth-child(2n) {
  border-right: 0;
}

.cp-detail-item:nth-last-child(-n + 2) {
  border-bottom: 0;
}

.cp-detail-item span {
  color: #8196ae;
  font-size: 9px;
  line-height: 1.3;
  font-weight: 900;
  letter-spacing: 0.7px;
  margin-bottom: 6px;
}

.cp-detail-item strong {
  color: #213f63;
  font-size: 11px;
  line-height: 1.4;
  font-weight: 850;
  word-break: break-word;
}

.cp-learn-btn {
  width: 100%;
  height: 44px;
  margin-top: 15px;
  border: 1px solid #d3e5fa;
  border-radius: 9px;
  background: #f3f8fe;
  color: #1469cf;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  transition: 0.2s ease;
}

.cp-learn-btn:hover {
  background: #e7f2ff;
  border-color: #bcd9f7;
}

.cp-learn-btn span {
  font-size: 17px;
}

/* empty */

.cp-empty {
  min-height: 260px;
  border: 1px dashed #cbdceb;
  border-radius: 14px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.cp-empty h3 {
  margin: 0 0 8px;
  color: #163c68;
  font-size: 20px;
}

.cp-empty p {
  margin: 0 0 20px;
  color: #7b90a8;
  font-size: 13px;
}

/* modal */

.cp-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  padding: 30px;
  background: rgba(8, 24, 44, 0.68);
  backdrop-filter: blur(5px);
  overflow-y: auto;
}

.cp-modal {
  width: min(1200px, 100%);
  margin: 0 auto;
  background: #ffffff;
  border-radius: 19px;
  box-shadow: 0 25px 70px rgba(4, 25, 50, 0.3);
  padding: 32px;
  position: relative;
}

.cp-modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 39px;
  height: 39px;
  border: 1px solid #dbe6f1;
  border-radius: 50%;
  background: #f5f8fc;
  color: #49647f;
  font-size: 25px;
  line-height: 1;
  cursor: pointer;
}

.cp-modal-head {
  display: flex;
  align-items: center;
  gap: 18px;
  padding-right: 55px;
  margin-bottom: 28px;
}

.cp-modal-logo {
  width: 78px;
  height: 78px;
  flex-shrink: 0;
  border: 1px solid #dce7f1;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cp-modal-logo img {
  width: 58px;
  height: 58px;
  object-fit: contain;
}

.cp-modal-logo span {
  color: #176bd3;
  font-size: 29px;
  font-weight: 900;
}

.cp-modal-head .cp-category {
  margin-bottom: 7px;
}

.cp-modal-head h2 {
  margin: 0 0 5px;
  color: #143c69;
  font-size: 25px;
  line-height: 1.3;
}

.cp-modal-head p {
  margin: 0;
  color: #7188a2;
  font-size: 13px;
}

.cp-detail-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid #e1e9f2;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 28px;
}

.cp-detail-grid .cp-detail-item {
  min-height: 88px;
  border-right: 1px solid #e1e9f2;
  border-bottom: 1px solid #e1e9f2;
}

.cp-detail-grid .cp-detail-item:nth-child(2n) {
  border-right: 1px solid #e1e9f2;
}

.cp-detail-grid .cp-detail-item:nth-child(4n) {
  border-right: 0;
}

/* courses */

.cp-modal-section {
  margin-bottom: 28px;
}

.cp-modal-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.cp-modal-section-title h3 {
  margin: 0;
  color: #173e69;
  font-size: 18px;
}

.cp-modal-section-title span {
  color: #7b8fa8;
  font-size: 11px;
  font-weight: 700;
}

.cp-course-table {
  width: 100%;
  border: 1px solid #e0e8f1;
  border-radius: 9px;
  overflow: hidden;
}

.cp-course-head,
.cp-course-row {
  display: grid;
  grid-template-columns:
    minmax(0, 1.8fr)
    minmax(120px, 0.7fr)
    minmax(160px, 0.8fr);
  gap: 15px;
  align-items: center;
  padding: 14px 16px;
}

.cp-course-head {
  background: #f1f6fc;
  color: #637c98;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.7px;
  text-transform: uppercase;
}

.cp-course-row {
  border-top: 1px solid #e6edf4;
  color: #617995;
  font-size: 12px;
}

.cp-course-row strong {
  color: #1d426a;
  font-size: 12px;
}

.cp-fee-note {
  margin: 9px 0 0;
  color: #8394a9;
  font-size: 10px;
}

/* info */

.cp-info-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 17px;
  margin-bottom: 24px;
}

.cp-info-box {
  min-height: 190px;
  padding: 20px;
  border: 1px solid #e1e9f2;
  border-radius: 11px;
  background: #fbfdff;
}

.cp-info-box h3 {
  margin: 0 0 16px;
  color: #183e69;
  font-size: 17px;
}

.cp-info-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cp-info-box li {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  align-items: start;
  gap: 7px;
}

.cp-info-box li span {
  color: #1482dd;
  font-size: 14px;
  font-weight: 900;
  line-height: 1.4;
}

.cp-info-box li p {
  margin: 0;
  color: #607894;
  font-size: 12px;
  line-height: 1.55;
}

/* admission */

.cp-admission-box {
  min-height: 88px;
  padding: 17px 20px;
  border-radius: 11px;
  background: linear-gradient(
    100deg,
    #eef6ff,
    #f3faff
  );
  border: 1px solid #d7e8fa;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 20px;
  align-items: center;
}

.cp-admission-box span {
  color: #6d88a5;
  display: block;
  margin-bottom: 5px;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.8px;
}

.cp-admission-box h3 {
  margin: 0;
  color: #184576;
  font-size: 14px;
}

.cp-admission-box a {
  color: #ffffff;
  background: #176bd7;
  border-radius: 8px;
  padding: 12px 17px;
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
}

/* add page */

.cp-add-page {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 48px 34px 75px;
  min-height: calc(100vh - 78px);
  box-sizing: border-box;
}

.cp-add-heading {
  width: 100%;
  text-align: center;
  margin-bottom: 34px;
}

.cp-form {
  width: 100%;
  max-width: 1450px;
  margin: 0 auto;
}

.cp-form-card {
  width: 100%;
  padding: 28px;
  margin-bottom: 19px;
  border: 1px solid #dfe8f2;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 5px 20px rgba(42, 79, 119, 0.05);
}

.cp-form-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 25px;
}

.cp-number {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #176bd5;
  background: #eaf3ff;
  font-size: 13px;
  font-weight: 900;
}

.cp-form-title h2 {
  margin: 0 0 4px;
  color: #183e69;
  font-size: 19px;
}

.cp-form-title p {
  margin: 0;
  color: #8194ab;
  font-size: 12px;
}

.cp-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 19px;
}

.cp-form-grid label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cp-form-grid label > span {
  color: #294a6d;
  font-size: 12px;
  font-weight: 800;
}

.cp-form-grid input,
.cp-form-grid select,
.cp-form-grid textarea {
  width: 100%;
  border: 1px solid #d8e3ee;
  border-radius: 9px;
  background: #f9fbfd;
  color: #203f61;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  transition: 0.2s ease;
}

.cp-form-grid input,
.cp-form-grid select {
  height: 46px;
  padding: 0 14px;
}

.cp-form-grid textarea {
  min-height: 110px;
  padding: 13px 14px;
  resize: vertical;
}

.cp-form-grid input::placeholder,
.cp-form-grid textarea::placeholder {
  color: #a0afc0;
}

.cp-form-grid input:focus,
.cp-form-grid select:focus,
.cp-form-grid textarea:focus {
  border-color: #4d9bea;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(55, 143, 232, 0.1);
}

.cp-form-grid small {
  color: #8a9caf;
  font-size: 10px;
}

.cp-full {
  grid-column: 1 / -1;
}

.cp-info-note {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 14px 16px;
  margin-bottom: 20px;
  border: 1px solid #d6e8fb;
  border-radius: 9px;
  background: #f0f7ff;
  color: #597591;
  font-size: 11px;
  line-height: 1.6;
}

.cp-info-note strong {
  color: #166bd2;
  white-space: nowrap;
}

.cp-form-actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.cp-cancel-btn {
  color: #58718e;
  background: #ffffff;
  border: 1px solid #d6e2ee;
}

.cp-cancel-btn:hover {
  background: #f2f6fa;
}

/* responsive */

@media (max-width: 1450px) {
  .cp-college-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1050px) {
  .cp-header-inner {
    padding: 0 24px;
  }

  .cp-main,
  .cp-add-page {
    padding-left: 24px;
    padding-right: 24px;
  }

  .cp-college-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cp-detail-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cp-detail-grid .cp-detail-item:nth-child(4n) {
    border-right: 1px solid #e1e9f2;
  }

  .cp-detail-grid .cp-detail-item:nth-child(2n) {
    border-right: 0;
  }

  .cp-info-columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .cp-header {
    height: 72px;
  }

  .cp-header-inner {
    padding: 0 16px;
  }

  .cp-brand {
    gap: 10px;
  }

  .cp-brand-logo {
    width: 42px;
    height: 42px;
  }

  .cp-brand strong {
    font-size: 16px;
  }

  .cp-brand span {
    font-size: 7px;
  }

  .cp-add-btn {
    min-width: auto;
    padding: 0 13px;
    font-size: 10px;
  }

  .cp-main,
  .cp-add-page {
    min-height: calc(100vh - 72px);
    padding: 32px 16px 50px;
  }

  .cp-page-heading {
    margin-bottom: 30px;
  }

  .cp-page-heading h1,
  .cp-add-heading h1 {
    font-size: 29px;
  }

  .cp-page-heading p,
  .cp-add-heading p {
    font-size: 12px;
  }

  .cp-section-heading {
    align-items: flex-start;
    gap: 12px;
  }

  .cp-section-heading h2 {
    font-size: 20px;
  }

  .cp-section-heading p {
    font-size: 11px;
  }

  .cp-college-grid {
    grid-template-columns: 1fr;
  }

  .cp-college-card {
    min-height: auto;
    padding: 19px;
  }

  .cp-college-card h3 {
    min-height: auto;
    font-size: 17px;
  }

  .cp-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 5px;
  }

  .cp-tabs button {
    flex-shrink: 0;
  }

  .cp-modal-overlay {
    padding: 12px;
  }

  .cp-modal {
    padding: 23px 17px;
    border-radius: 14px;
  }

  .cp-modal-head {
    align-items: flex-start;
  }

  .cp-modal-head h2 {
    font-size: 20px;
  }

  .cp-detail-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cp-course-table {
    overflow-x: auto;
  }

  .cp-course-head,
  .cp-course-row {
    min-width: 680px;
  }

  .cp-admission-box {
    grid-template-columns: 1fr;
  }

  .cp-admission-box a {
    width: fit-content;
  }

  .cp-form-card {
    padding: 20px;
  }

  .cp-form-grid {
    grid-template-columns: 1fr;
  }

  .cp-full {
    grid-column: auto;
  }

  .cp-form-actions {
    justify-content: stretch;
  }

  .cp-form-actions button {
    flex: 1;
  }
}

@media (max-width: 500px) {
  .cp-header-inner {
    gap: 8px;
  }

  .cp-brand {
    min-width: 0;
  }

  .cp-brand > div:last-child {
    min-width: 0;
  }

  .cp-brand strong {
    font-size: 14px;
  }

  .cp-brand span {
    display: none;
  }

  .cp-brand-logo {
    width: 39px;
    height: 39px;
  }

  .cp-add-btn {
    padding: 0 10px;
    font-size: 9px;
  }

  .cp-page-heading h1,
  .cp-add-heading h1 {
    font-size: 26px;
  }

  .cp-section-heading {
    flex-direction: column;
  }

  .cp-count {
    align-self: flex-start;
  }

  .cp-detail-grid {
    grid-template-columns: 1fr;
  }

  .cp-detail-grid .cp-detail-item,
  .cp-detail-grid .cp-detail-item:nth-child(2n),
  .cp-detail-grid .cp-detail-item:nth-child(4n) {
    border-right: 0;
  }

  .cp-info-columns {
    gap: 11px;
  }

  .cp-info-box {
    padding: 17px;
  }

  .cp-form-actions {
    flex-direction: column;
  }

  .cp-form-actions button {
    width: 100%;
  }

  .cp-secondary-btn {
    padding: 0 12px;
    font-size: 10px;
  }
}
`;

export default CollegeProfile;