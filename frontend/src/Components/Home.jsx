import React from "react";

function Home() {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Segoe UI", sans-serif;
          background: #ffffff;
          color: #172033;
        }

        .home-page {
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 7%;
          background: #fff;
          box-shadow: 0 2px 15px rgba(0,0,0,0.04);
        }

        .logo {
          font-size: 25px;
          font-weight: 800;
          color: #2457d6;
          white-space: nowrap;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-links a {
          text-decoration: none;
          color: #334155;
          font-size: 15px;
          font-weight: 500;
          transition: 0.3s;
        }

        .nav-links a:hover {
          color: #2457d6;
        }

        .nav-buttons {
          display: flex;
          gap: 12px;
        }

        .nav-buttons button {
          padding: 13px 25px;
          border-radius: 9px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .login-btn {
          background: white;
          border: 1px solid #dbe2ef;
          color: #172033;
        }

        .signup-btn {
          background: #2457d6;
          border: 1px solid #2457d6;
          color: white;
        }

        .login-btn:hover {
          background: #f3f7ff;
        }

        .signup-btn:hover {
          background: #1743b5;
        }

        /* Home Hero */
        .hero {
          min-height: 650px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          padding: 90px 9%;
          background: linear-gradient(120deg, #f3f7ff, #ffffff);
        }

        .hero-content {
          flex: 1;
          max-width: 650px;
        }

        .hero-tag {
          display: inline-block;
          color: #2457d6;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 25px;
        }

        .hero h1 {
          font-size: clamp(45px, 5.5vw, 68px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -1.5px;
          color: #14213d;
          margin-bottom: 25px;
        }

        .hero h1 span {
          color: #2860df;
        }

        .hero-description {
          max-width: 650px;
          color: #64748b;
          font-size: 17px;
          line-height: 1.8;
          margin-bottom: 32px;
        }

        /* Buttons */
        .hero-buttons {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .primary-btn,
        .secondary-btn {
          padding: 16px 25px;
          border-radius: 9px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .primary-btn {
          background: #2457d6;
          border: 1px solid #2457d6;
          color: white;
        }

        .primary-btn:hover {
          background: #1743b5;
          transform: translateY(-2px);
        }

        .secondary-btn {
          background: white;
          border: 1px solid #cbd5e1;
          color: #172033;
        }

        .secondary-btn:hover {
          background: #eff4ff;
          border-color: #2457d6;
        }

        /* Right Card */
        .hero-visual {
          width: 420px;
          height: 420px;
          flex-shrink: 0;
          border-radius: 32px;
          background: linear-gradient(135deg, #2457d6, #82a8ff);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 25px 60px rgba(36,87,214,0.18);
        }

        .hero-card {
          width: 80%;
          min-height: 290px;
          padding: 45px 25px;
          border-radius: 22px;
          background: #f8faff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .hero-card-icon {
          font-size: 65px;
          margin-bottom: 30px;
        }

        .hero-card h2 {
          font-size: 25px;
          font-weight: 500;
          color: #172033;
          margin-bottom: 15px;
        }

        .hero-card p {
          font-size: 16px;
          color: #64748b;
        }

        /* Responsive */
        @media (max-width: 1000px) {
          .hero {
            padding: 70px 6%;
            gap: 35px;
          }

          .hero-visual {
            width: 340px;
            height: 340px;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 18px;
            padding: 18px 5%;
          }

          .nav-links {
            order: 3;
            width: 100%;
            justify-content: center;
            gap: 22px;
            flex-wrap: wrap;
          }

          .nav-buttons {
            margin-left: auto;
          }

          .hero {
            flex-direction: column;
            text-align: center;
            padding: 65px 6%;
          }

          .hero-content {
            width: 100%;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons {
            justify-content: center;
            flex-wrap: wrap;
          }

          .hero-visual {
            width: min(100%, 380px);
            height: 340px;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            justify-content: center;
          }

          .logo {
            width: 100%;
            text-align: center;
          }

          .nav-buttons {
            margin: 0;
          }

          .nav-links {
            gap: 15px;
          }

          .nav-links a {
            font-size: 13px;
          }

          .nav-buttons button {
            padding: 11px 18px;
            font-size: 13px;
          }

          .hero {
            padding: 55px 6%;
          }

          .hero h1 {
            font-size: 40px;
          }

          .hero-description {
            font-size: 15px;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .hero-buttons button {
            width: 100%;
          }

          .hero-visual {
            height: 310px;
          }

          .hero-card {
            min-height: 240px;
          }
        }
      `}</style>

      <div className="home-page">

        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">
            🎓 CollegeConnect
          </div>

          <div className="nav-links">
            <a href="/">Home</a>
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-buttons">
            <button className="login-btn">
              Login
            </button>

            <button className="signup-btn">
              Get Started
            </button>
          </div>
        </nav>

        {/* Home Hero Section */}
        <section className="hero">

          <div className="hero-content">

            <span className="hero-tag">
              WELCOME TO COLLEGECONNECT
            </span>

            <h1>
              Your College
              <br />
              Journey, <span>All in One</span>
              <br />
              <span>Place.</span>
            </h1>

            <p className="hero-description">
              Connect with your college community, explore opportunities,
              manage academic activities, and stay updated with everything
              happening on campus.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn">
                Explore Platform →
              </button>

              <button className="secondary-btn">
                Learn More
              </button>
            </div>

          </div>

          <div className="hero-visual">
            <div className="hero-card">

              <div className="hero-card-icon">
                🎓
              </div>

              <h2>Shape Your Future</h2>

              <p>Learn. Connect. Grow.</p>

            </div>
          </div>

        </section>

      </div>
    </>
  );
}

export default Home;