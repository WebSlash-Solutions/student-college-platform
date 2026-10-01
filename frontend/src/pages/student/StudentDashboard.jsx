/*
 * CampusConnect — Home page (Navbar → Hero → About → End)
 * Single file. No imports required.
 * Hero image: use a direct src path to the asset file.
 * About image: use a direct src path to the asset file.
 */

/* -------------------------------------------------------------------- icons */
const paths = {
  cap: "M2 9l10-5 10 5-10 5L2 9zm4 3v5c0 1.5 3 3 6 3s6-1.5 6-3v-5",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  check: "M4.5 12.5l4.5 4.5L19.5 6.5",
  grid: "M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z",
  sparkle: "M12 3.5L13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
};

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

/* -------------------------------------------------------------------- data */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Colleges", href: "#colleges" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "12", label: "Colleges listed" },
  { value: "16", label: "Courses available" },
  { value: "60", label: "College-course options" },
  { value: "9", label: "Cities covered" },
];

const ABOUT_POINTS = [
  "College, course and fee data in one place",
  "Campus photo galleries for every college",
  "Application status with a clear timeline",
];

/* ------------------------------------------------------------------ styles */
const STYLE = `
html { scroll-behavior: smooth; }
#root { width: 100%; max-width: none; margin: 0; text-align: left; border-inline: 0; }

.cc-root {
  --brand: #2478FC;
  --brand-dark: #1b62d8;
  --deep: #01459A;
  --navy: #061F3A;
  --blue-25: #EEF7FE;
  --muted: #64748B;
  --muted-dark: #475569;
  --border: #E2E8F0;
  --success: #12805C;
  --radius: 16px;
  --radius-lg: 22px;
  --shadow-md: 0 10px 30px rgba(6,31,58,.10);
  --shadow-lg: 0 20px 45px rgba(6,31,58,.14);
  --shadow-brand: 0 12px 28px rgba(36,120,252,.28);
  --ease: cubic-bezier(.4,0,.2,1);

  color-scheme: light only;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  color: #0F1C33;
  background: #fff;
  text-align: left;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
.cc-root *, .cc-root *::before, .cc-root *::after { box-sizing: border-box; }
.cc-root h1, .cc-root h2, .cc-root h3 { font-family: inherit; color: var(--navy); font-weight: 700; line-height: 1.25; letter-spacing: -.02em; margin: 0; }
.cc-root p { margin: 0; color: var(--muted); }
.cc-root ul { margin: 0; padding: 0; list-style: none; }
.cc-root a { color: inherit; text-decoration: none; }
.cc-root img { display: block; max-width: 100%; }
.cc-root label { cursor: pointer; }
.cc-root [id] { scroll-margin-top: 84px; }

.cc-wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.cc-section { padding: 84px 0; }

.cc-eyebrow {
  display: inline-block; font-size: .78rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
  color: var(--brand); background: var(--blue-25); border: 1px solid #d5e6fb; padding: 6px 14px; border-radius: 999px; margin-bottom: 14px;
}

/* buttons */
.cc-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid transparent; border-radius: 999px;
  padding: 12px 24px; font-size: .95rem; font-weight: 700; cursor: pointer; white-space: nowrap;
  transition: transform .2s var(--ease), box-shadow .2s var(--ease), background .2s var(--ease), color .2s var(--ease);
}
.cc-btn:hover { transform: translateY(-2px); }
.cc-btn-primary { background: var(--brand); color: #fff; box-shadow: var(--shadow-brand); }
.cc-btn-primary:hover { background: var(--brand-dark); }
.cc-btn-ghost { background: #fff; color: var(--navy); border-color: var(--border); }
.cc-btn-ghost:hover { border-color: var(--brand); color: var(--brand); }
.cc-btn-outline { background: transparent; color: var(--brand); border-color: #bcd8fb; }
.cc-btn-outline:hover { background: var(--blue-25); }
.cc-btn-sm { padding: 9px 18px; font-size: .88rem; }
.cc-btn-lg { padding: 14px 30px; font-size: 1rem; }
.cc-btn-block { display: flex; width: 100%; }

/* navbar */
.cc-nav { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,.92); backdrop-filter: blur(14px); border-bottom: 1px solid var(--border); }
.cc-nav-toggle { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
.cc-nav-inner { display: flex; align-items: center; gap: 20px; height: 76px; }
.cc-logo { display: flex; align-items: center; gap: 11px; }
.cc-logo-mark { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 13px; background: linear-gradient(135deg, var(--brand), var(--deep)); color: #fff; flex-shrink: 0; }
.cc-logo-text { display: flex; flex-direction: column; line-height: 1.2; }
.cc-logo-text strong { font-size: 1.08rem; color: var(--navy); font-weight: 800; }
.cc-logo-text small { font-size: .68rem; color: var(--muted); }
.cc-menu { display: flex; align-items: center; gap: 2px; margin-left: auto; }
.cc-menu a { padding: 9px 15px; border-radius: 999px; font-size: .95rem; font-weight: 600; color: var(--muted-dark); transition: background .2s var(--ease), color .2s var(--ease); }
.cc-menu a:hover, .cc-menu a.is-active { color: var(--brand); background: var(--blue-25); }
.cc-nav-actions { display: flex; align-items: center; gap: 10px; }
.cc-icon-btn { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; border: 1px solid var(--border); background: #fff; color: var(--navy); }
.cc-icon-btn:hover { border-color: var(--brand); color: var(--brand); }
.cc-burger { display: none; }
.cc-icon-close { display: none; }
.cc-mobile { display: none; flex-direction: column; padding: 8px 24px 26px; border-top: 1px solid var(--border); background: #fff; }
.cc-mobile a { padding: 13px 4px; font-weight: 600; color: var(--navy); }
.cc-mobile .cc-btn { margin-top: 14px; }

/* hero */
.cc-hero { position: relative; background: linear-gradient(160deg, #f4f9ff 0%, #e9f2fe 46%, #fff 100%); padding: 76px 0 0; overflow: hidden; }
.cc-hero-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 48px; align-items: center; padding-bottom: 68px; }
.cc-pill { display: inline-flex; align-items: center; gap: 7px; padding: 7px 15px; border-radius: 999px; background: #fff; border: 1px solid #d5e6fb; color: var(--deep); font-size: .8rem; font-weight: 700; }
.cc-hero h1 { font-size: clamp(2.1rem, 4.6vw, 3.3rem); margin-top: 20px; }
.cc-hero h1 em { font-style: normal; color: var(--brand); }
.cc-hero-text { margin-top: 18px; font-size: 1.06rem; color: var(--muted-dark); max-width: 52ch; }
.cc-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.cc-points { display: flex; flex-wrap: wrap; gap: 10px 24px; margin-top: 26px; font-size: .9rem; color: var(--muted-dark); }
.cc-points li { display: flex; align-items: center; gap: 7px; }
.cc-points svg { color: var(--success); }
.cc-hero-visual { position: relative; }
.cc-hero-img { height: 430px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); background: linear-gradient(135deg, #0b3a6f, #2f7de1); }
.cc-hero-img img { width: 100%; height: 100%; object-fit: cover; }
.cc-float { position: absolute; display: flex; align-items: center; gap: 11px; padding: 12px 16px; border-radius: var(--radius); background: #fff; border: 1px solid var(--border); box-shadow: var(--shadow-md); animation: ccFloat 5.5s ease-in-out infinite; }
.cc-float strong { display: block; font-size: 1.1rem; color: var(--navy); line-height: 1.2; }
.cc-float small { font-size: .74rem; color: var(--muted); }
.cc-float-b { bottom: 56px; right: -16px; animation-delay: 1.2s; }
.cc-float-c { bottom: -20px; left: 30px; animation-delay: 2.4s; }
@keyframes ccFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
.cc-icon-circle { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 13px; background: var(--blue-25); color: var(--brand); flex-shrink: 0; }
.cc-strip { background: var(--navy); padding: 30px 0 24px; }
.cc-strip-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 20px; text-align: center; }
.cc-strip-grid strong { display: block; font-size: 2rem; color: #fff; line-height: 1.1; }
.cc-strip-grid span { font-size: .85rem; color: #9DB8D4; }
.cc-strip-note { text-align: center; margin-top: 18px; font-size: .78rem; color: #7F9BB8 !important; }

/* about */
.cc-about { display: grid; grid-template-columns: 1.05fr .95fr; gap: 56px; align-items: center; }
.cc-about h2 { font-size: clamp(1.5rem, 2.6vw, 2rem); }
.cc-about-text { margin-top: 16px; font-size: 1.02rem; color: var(--muted-dark); max-width: 60ch; }
.cc-about-list { display: grid; gap: 12px; margin-top: 24px; }
.cc-about-list li { display: flex; align-items: center; gap: 10px; font-size: .95rem; color: var(--navy); font-weight: 500; }
.cc-about-list svg { color: var(--success); flex-shrink: 0; }
.cc-about-img { height: 380px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); background: linear-gradient(135deg, #0b3a6f, #2f7de1); }
.cc-about-img img { width: 100%; height: 100%; object-fit: cover; }

/* responsive */
@media (max-width: 1024px) {
  .cc-menu { display: none; }
  .cc-nav-actions { margin-left: auto; }
  .cc-burger { display: grid; }
  .cc-nav-toggle:checked ~ .cc-nav-inner .cc-icon-burger { display: none; }
  .cc-nav-toggle:checked ~ .cc-nav-inner .cc-icon-close { display: block; }
  .cc-nav-toggle:checked ~ .cc-mobile { display: flex; }
  .cc-hero-grid, .cc-about { grid-template-columns: 1fr; }
  .cc-hero-img { height: 340px; }
  .cc-float-b { right: 0; }
}
@media (max-width: 680px) {
  .cc-root { font-size: 15px; }
  .cc-wrap { padding: 0 18px; }
  .cc-section { padding: 58px 0; }
  .cc-hero { padding-top: 52px; }
  .cc-strip-grid { grid-template-columns: 1fr 1fr; }
  .cc-hero-actions .cc-btn { width: 100%; }
  .cc-about-img { height: 280px; }
  .cc-nav-actions .cc-btn-outline { display: none; }
}
`;

/* --------------------------------------------------------------------- page */
export default function Home() {
  return (
    <>
      <style>{STYLE}</style>

      <div className="cc-root" id="home">
        {/* NAVBAR: Home | About | Colleges | Courses | Contact | Search | Login | Register */}
        <header className="cc-nav">
          <input type="checkbox" id="cc-nav-toggle" className="cc-nav-toggle" />

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
                <a key={item.label} href={item.href} className={item.label === "Home" ? "is-active" : ""}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="cc-nav-actions">
              <a href="#colleges" className="cc-icon-btn" aria-label="Search colleges">
                <Icon name="search" size={18} />
              </a>
              <a href="/login" className="cc-btn cc-btn-outline cc-btn-sm">Login</a>
              <a href="/register" className="cc-btn cc-btn-primary cc-btn-sm">Register</a>
              <label htmlFor="cc-nav-toggle" className="cc-icon-btn cc-burger" aria-label="Toggle menu">
                <span className="cc-icon-burger"><Icon name="menu" size={20} /></span>
                <span className="cc-icon-close"><Icon name="close" size={20} /></span>
              </label>
            </div>
          </div>

          <nav className="cc-mobile">
            {NAV.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
            <a href="/login" className="cc-btn cc-btn-outline cc-btn-block">Login</a>
            <a href="/register" className="cc-btn cc-btn-primary cc-btn-block">Register</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="cc-hero">
          <div className="cc-wrap cc-hero-grid">
            <div>
              <span className="cc-pill">
                <Icon name="sparkle" size={15} /> Admissions open
              </span>

              <h1>
                Find the Right College for <em>Your Future</em>
              </h1>

              <p className="cc-hero-text">
                Explore colleges, discover courses, compare fees and eligibility, and submit your
                applications from a single platform built for students.
              </p>

              <div className="cc-hero-actions">
                <a href="#colleges" className="cc-btn cc-btn-primary cc-btn-lg">
                  Explore Colleges <Icon name="arrow" size={18} />
                </a>
                <a href="#courses" className="cc-btn cc-btn-ghost cc-btn-lg">Explore Courses</a>
              </div>

              <ul className="cc-points">
                <li><Icon name="check" size={16} /> Compare courses, fees and eligibility</li>
                <li><Icon name="check" size={16} /> Apply online and track status</li>
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
                <span className="cc-icon-circle"><Icon name="grid" size={22} /></span>
                <div>
                  <strong>{STATS[1].value}+</strong>
                  <small>Courses (demo)</small>
                </div>
              </div>

              <div className="cc-float cc-float-c">
                <span className="cc-icon-circle"><Icon name="check" size={22} /></span>
                <div>
                  <strong>Easy</strong>
                  <small>Applications</small>
                </div>
              </div>
            </div>
          </div>

          <div className="cc-strip">
            <div className="cc-wrap cc-strip-grid">
              {STATS.map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            
          </div>
        </section>

        {/* ABOUT (last section) */}
        <section className="cc-section" id="about">
          <div className="cc-wrap cc-about">
            <div>
              <span className="cc-eyebrow">About us</span>
              <h2>Built for students planning their next step</h2>
              <p className="cc-about-text">
                CampusConnect is a Student-College Admission Platform. Students can explore colleges,
                compare courses, check eligibility and fees, and submit applications without
                repeating the same information for every college.
              </p>
              <p className="cc-about-text">
                College information is maintained in a single database, so course lists, fees,
                facilities and campus photos stay consistent across the whole site.
              </p>

              <ul className="cc-about-list">
                {ABOUT_POINTS.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={18} /> {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cc-about-img">
  <img
    src="/src/assets/about student.jpg"
    alt="College campus"
  />
</div>
          </div>
        </section>
      </div>
    </>
  );
}
