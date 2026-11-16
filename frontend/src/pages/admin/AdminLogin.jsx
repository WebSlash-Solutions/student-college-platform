import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Change this to your college registration route
const REGISTER_ROUTE = "/register";

const CapIcon = ({ size = 30, color = "#111" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3 1.5 8.5 12 14l8.5-4.45V15h2V8.5L12 3Z" fill={color} />
    <path d="M5.5 12.2V16c0 1.6 3 3.2 6.5 3.2s6.5-1.6 6.5-3.2v-3.8L12 15.6l-6.5-3.4Z" fill={color} />
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v.3l-9 5.6-9-5.6v-.3Z" />
    <path d="M3 9.2V17.5A2.5 2.5 0 0 0 5.5 20h13a2.5 2.5 0 0 0 2.5-2.5V9.2l-8.5 5.3a1 1 0 0 1-1 0L3 9.2Z" />
  </svg>
);

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 10V7.5a5 5 0 0 1 10 0V10h.5A2.5 2.5 0 0 1 20 12.5v6a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-6A2.5 2.5 0 0 1 6.5 10H7Zm2 0h6V7.5a3 3 0 0 0-6 0V10Z" />
  </svg>
);

const EyeIcon = ({ off }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5Z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5Z" />
    <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1Z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48Z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#111" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path fill="#fff" d="M16.67 15.47 17.2 12h-3.33V9.75c0-.95.47-1.87 1.96-1.87h1.52V4.93s-1.38-.23-2.69-.23c-2.75 0-4.54 1.66-4.54 4.67V12H6.5v3.47h3.02V24h4.35v-8.53h2.8Z" />
  </svg>
);

const PROVIDERS = {
  google: { label: "Google", Icon: GoogleIcon, placeholder: "Email", type: "email" },
  github: { label: "GitHub", Icon: GithubIcon, placeholder: "Email or username", type: "text" },
  facebook: { label: "Facebook", Icon: FacebookIcon, placeholder: "Email or phone", type: "text" },
};

export default function AdminLogin() {
  const navigate = useNavigate();

  // Always start with an empty login ID so the previous college is not prefilled.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  // Social account chooser (React-only, no redirect)
  const [provider, setProvider] = useState(null); // "google" | "github" | "facebook" | null
  const [socialStep, setSocialStep] = useState("list"); // "list" | "add"
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [socialError, setSocialError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const loginId = email.trim().toLowerCase();
    const enteredPassword = password;

    if (!loginId || !enteredPassword) {
      setError("Please enter your official email / college ID and password.");
      return;
    }

    let savedColleges = [];
    try {
      const stored = localStorage.getItem("registeredCollegeLogins");
      savedColleges = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(savedColleges)) savedColleges = [];
    } catch {
      savedColleges = [];
    }

    const college = savedColleges.find((item) => {
      const ids = [
        item.userId,
        item.username,
        item.email,
        item.collegeEmail,
        item.officialEmail,
      ];
      const matchingId = ids.some(
        (id) => String(id || "").trim().toLowerCase() === loginId
      );
      const matchingPassword =
        String(item.password ?? item.pass ?? "") === enteredPassword;
      return matchingId && matchingPassword;
    });

    if (!college) {
      setError("Invalid college ID/email or password. Please check your registered college login details.");
      return;
    }

    const collegeDetails = {
      id: college.id,
      name: college.name || college.collegeName || "Registered College",
      type: college.type || college.collegeType || "College",
      city: college.city || college.district || "",
      userId:
        college.userId ||
        college.username ||
        college.email ||
        college.collegeEmail ||
        college.officialEmail ||
        loginId,
    };

    try {
      if (remember) localStorage.setItem("collegeRememberedId", email.trim());
      else localStorage.removeItem("collegeRememberedId");
    } catch {
      /* ignore storage errors */
    }

    sessionStorage.setItem("collegeUser", JSON.stringify(collegeDetails));
    sessionStorage.removeItem("collegeToken");
    sessionStorage.setItem("collegeLoggedIn", "true");
    navigate("/institution/dashboard", { replace: true });
  };

  const openProvider = (name) => {
    let saved = [];
    try {
      const stored = JSON.parse(localStorage.getItem(`${name}SavedAccounts`) || "[]");
      saved = Array.isArray(stored) ? stored : [];
    } catch {
      saved = [];
    }
    setAccounts(saved);
    setAccountId("");
    setSocialError("");
    setSocialStep(saved.length ? "list" : "add");
    setProvider(name);
  };

  const closeSocial = () => setProvider(null);

  const nameFromEmail = (mail) =>
    mail
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const loginWithAccount = (mail) => {
    const loginId = mail.trim().toLowerCase();
    let savedColleges = [];
    try {
      const stored = localStorage.getItem("registeredCollegeLogins");
      savedColleges = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(savedColleges)) savedColleges = [];
    } catch {
      savedColleges = [];
    }

    const college = savedColleges.find((item) =>
      [item.userId, item.username, item.email, item.collegeEmail, item.officialEmail].some(
        (id) => String(id || "").trim().toLowerCase() === loginId
      )
    );

    if (!college) {
      setSocialError("No registered college account found for this account.");
      return;
    }

    const collegeDetails = {
      id: college.id,
      name: college.name || college.collegeName || "Registered College",
      type: college.type || college.collegeType || "College",
      city: college.city || college.district || "",
      userId:
        college.userId ||
        college.username ||
        college.email ||
        college.collegeEmail ||
        college.officialEmail ||
        loginId,
    };

    sessionStorage.setItem("collegeUser", JSON.stringify(collegeDetails));
    sessionStorage.removeItem("collegeToken");
    sessionStorage.setItem("collegeLoggedIn", "true");
    navigate("/institution/dashboard", { replace: true });
  };

  const handleAddNext = (e) => {
    e.preventDefault();
    const mail = accountId.trim().toLowerCase();
    if (!mail) {
      setSocialError("Please enter your account details.");
      return;
    }
    if (provider === "google" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setSocialError("Enter a valid email address.");
      return;
    }
    const updated = accounts.some((a) => a.email === mail)
      ? accounts
      : [...accounts, { email: mail, name: nameFromEmail(mail) }];
    setAccounts(updated);
    try {
      localStorage.setItem(`${provider}SavedAccounts`, JSON.stringify(updated));
    } catch {
      /* ignore storage errors */
    }
    setSocialError("");
    loginWithAccount(mail);
  };

  const handleForgotPassword = () => {
    window.alert(
      "Please contact your platform administrator to verify or reset your college login credentials."
    );
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .cc-login-page {
          position: fixed;
          inset: 0;
          z-index: 1000;
          width: 100vw;
          height: 100vh;
          overflow: auto;
          display: flex;
          padding: 32px 24px;
          margin: 0;
          text-align: left;
          background: linear-gradient(135deg, #eaf3ff 0%, #f8fbff 52%, #e7f0ff 100%);
          font-family: Inter, "Segoe UI", Arial, sans-serif;
          color: #1b1b1f;
        }
        .cc-login-card {
          width: 100%;
          max-width: 880px;
          min-height: 500px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          padding: 10px;
          border: 1px solid #e6ebf5;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 24px 70px rgba(40, 60, 120, .16);
        }

        /* LEFT: FORM */
        .cc-login-form-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px clamp(24px, 5vw, 48px);
        }
        .cc-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -.3px;
          color: #111;
        }
        .cc-brand b { color: #1769e8; font-weight: 700; }
        .cc-form-title {
          margin: 0 0 22px;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -.6px;
          color: #1b1b1f;
        }
        .cc-field { margin-bottom: 15px; }
        .cc-field label {
          display: block;
          margin-bottom: 7px;
          font-size: 12.5px;
          font-weight: 700;
          color: #1b1b1f;
        }
        .cc-input-wrap { position: relative; }
        .cc-field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          display: grid;
          place-items: center;
          color: #9a9ca5;
          pointer-events: none;
        }
        .cc-field-icon svg { width: 17px; height: 17px; }
        .cc-input {
          width: 100%;
          height: 44px;
          border: 1.5px solid #d9e2ef;
          border-radius: 8px;
          padding: 0 42px 0 42px;
          outline: none;
          color: #1b1b1f;
          background: #fff;
          font-size: 13px;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .cc-input::placeholder { color: #aeb0b8; }
        .cc-input:focus {
          background: #fff;
          border-color: #1769e8;
          box-shadow: 0 0 0 4px rgba(23,105,232,.12);
        }
        .cc-password-toggle {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          display: grid;
          place-items: center;
          border: 0;
          padding: 4px;
          color: #9a9ca5;
          background: transparent;
          cursor: pointer;
        }
        .cc-password-toggle svg { width: 17px; height: 17px; }
        .cc-password-toggle:hover { color: #1b1b1f; }
        .cc-remember {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 14px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          color: #1b1b1f;
          user-select: none;
        }
        .cc-remember input { position: absolute; opacity: 0; pointer-events: none; }
        .cc-checkbox {
          display: grid;
          place-items: center;
          width: 19px;
          height: 19px;
          border-radius: 6px;
          border: 1.5px solid #cfd1d8;
          background: #fff;
          transition: background .15s, border-color .15s;
        }
        .cc-remember input:checked + .cc-checkbox { background: #1769e8; border-color: #1769e8; }
        .cc-remember input:not(:checked) + .cc-checkbox svg { display: none; }
        .cc-remember input:focus-visible + .cc-checkbox { box-shadow: 0 0 0 4px rgba(23,105,232,.20); }
        .cc-checkbox svg { width: 12px; height: 12px; }
        .cc-forgot-row { margin-bottom: 18px; }
        .cc-forgot {
          border: 0;
          padding: 0;
          color: #a3a5ad;
          background: transparent;
          font-size: 13px;
          cursor: pointer;
        }
        .cc-forgot:hover { color: #1769e8; }
        .cc-error {
          margin: 0 0 16px;
          padding: 12px 14px;
          border: 1px solid #ffd4d4;
          border-radius: 12px;
          color: #b42318;
          background: #fff4f4;
          font-size: 13px;
          line-height: 1.5;
        }
        .cc-login-submit {
          width: 100%;
          height: 44px;
          border: 0;
          border-radius: 8px;
          color: #fff;
          background: #1769e8;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background .18s, transform .18s, box-shadow .18s;
        }
        .cc-login-submit:hover {
          background: #1255c4;
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(23,105,232,.24);
        }
        .cc-social-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 18px;
        }
        .cc-social-btn {
          text-decoration: none;
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          border: 0;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 14px rgba(40, 60, 120, .14);
          cursor: pointer;
          transition: transform .18s, box-shadow .18s;
        }
        .cc-social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(40, 60, 120, .22);
        }
        .cc-social-btn:focus-visible { outline: 3px solid rgba(23,105,232,.35); outline-offset: 2px; }
        .cc-gmodal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1100;
          display: grid;
          place-items: center;
          padding: 16px;
          background: rgba(20, 24, 40, .45);
        }
        .cc-gmodal {
          width: 100%;
          max-width: 400px;
          padding: 32px 28px 24px;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 24px 70px rgba(20, 30, 70, .35);
        }
        .cc-gmodal-head { text-align: center; margin-bottom: 18px; }
        .cc-gmodal-head h3 { margin: 10px 0 4px; font-size: 22px; font-weight: 500; color: #1b1b1f; }
        .cc-gmodal-head p { margin: 0; font-size: 14px; color: #5f6368; }
        .cc-gaccount {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 11px 8px;
          border: 0;
          border-top: 1px solid #e6e8ee;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }
        .cc-gaccount:hover { background: #f5f7fb; }
        .cc-gavatar {
          display: grid;
          place-items: center;
          flex: none;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          color: #fff;
          background: #1769e8;
          font-size: 15px;
          font-weight: 600;
        }
        .cc-gavatar.plain { color: #5f6368; background: #fff; border: 1.5px solid #dadce0; font-size: 20px; font-weight: 400; }
        .cc-ginfo { min-width: 0; display: flex; flex-direction: column; }
        .cc-ginfo b { font-size: 14px; font-weight: 500; color: #1b1b1f; }
        .cc-ginfo span { font-size: 12.5px; color: #5f6368; overflow: hidden; text-overflow: ellipsis; }
        .cc-gmodal .cc-input { padding: 0 14px; }
        .cc-gactions { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; }
        .cc-glink { border: 0; padding: 8px 4px; color: #1769e8; background: transparent; font-size: 14px; font-weight: 600; cursor: pointer; }
        .cc-gnext {
          height: 38px;
          padding: 0 22px;
          border: 0;
          border-radius: 8px;
          color: #fff;
          background: #1769e8;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .cc-gnext:hover { background: #1255c4; }
        .cc-gerror { margin: 10px 0 0; font-size: 13px; color: #b42318; }
        .cc-verified-note {
          margin: 14px 0 0;
          font-size: 11.5px;
          color: #9a9ca5;
        }

        /* RIGHT: SPACE PANEL */
        .cc-login-visual {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 32px 26px;
          text-align: center;
          color: #fff;
          border-radius: 16px;
          background:
            radial-gradient(ellipse 65% 45% at 85% 85%, rgba(48,132,255,.48), transparent 70%),
            radial-gradient(ellipse 55% 40% at 8% 15%, rgba(8,45,112,.58), transparent 70%),
            linear-gradient(145deg, #2467c9 0%, #12458f 52%, #0b2f68 100%);
        }
        .cc-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(1.4px 1.4px at 12% 22%, #fff, transparent 60%),
            radial-gradient(1px 1px at 28% 62%, #cfd4ff, transparent 60%),
            radial-gradient(1.6px 1.6px at 44% 14%, #fff, transparent 60%),
            radial-gradient(1px 1px at 61% 38%, #d9ccff, transparent 60%),
            radial-gradient(1.4px 1.4px at 77% 76%, #fff, transparent 60%),
            radial-gradient(1px 1px at 90% 28%, #fff, transparent 60%),
            radial-gradient(1.2px 1.2px at 18% 86%, #cfd4ff, transparent 60%),
            radial-gradient(1px 1px at 52% 90%, #fff, transparent 60%),
            radial-gradient(1.3px 1.3px at 84% 52%, #e4dcff, transparent 60%),
            radial-gradient(1px 1px at 6% 52%, #fff, transparent 60%);
          opacity: .85;
        }
        .cc-watermark {
          position: absolute;
          top: 6%;
          left: 50%;
          transform: translateX(-50%);
          width: min(70%, 380px);
          opacity: .16;
          pointer-events: none;
        }
        .cc-streak {
          position: absolute;
          top: 8%;
          right: -12%;
          width: 62%;
          height: 14px;
          transform: rotate(-38deg);
          border-radius: 8px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.28));
          pointer-events: none;
        }
        .cc-visual-title {
          position: relative;
          margin: 70px 0 12px;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -.5px;
        }
        .cc-visual-copy {
          position: relative;
          max-width: 280px;
          margin: 0 0 22px;
          color: #e8f1ff;
          font-size: 13px;
          line-height: 1.65;
        }
        .cc-visual-btn {
          position: relative;
          min-width: 150px;
          height: 42px;
          padding: 0 28px;
          border: 0;
          border-radius: 999px;
          color: #fff;
          background: rgba(255,255,255,.16);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background .18s, transform .18s;
        }
        .cc-visual-btn:hover { background: rgba(255,255,255,.28); transform: translateY(-1px); }

        @media (max-width: 860px) {
          .cc-login-page { padding: 16px; }
          .cc-login-card { grid-template-columns: 1fr; padding: 10px; border-radius: 22px; }
          .cc-login-form-panel { padding: 28px 18px; }
          .cc-form-title { font-size: 24px; }
          .cc-login-visual { min-height: 320px; }
          .cc-visual-title { margin-top: 56px; font-size: 24px; }
        }
      `}</style>

      <main className="cc-login-page">
        <div className="cc-login-card">
          <section className="cc-login-form-panel">
            <div className="cc-brand">
              <CapIcon />
              <span>Campus<b>Connect</b></span>
            </div>

            <h1 className="cc-form-title">College Login</h1>

            <form onSubmit={handleLogin}>
              <div className="cc-field">
                <label htmlFor="college-login-id">Official Email / College ID</label>
                <div className="cc-input-wrap">
                  <span className="cc-field-icon"><MailIcon /></span>
                  <input
                    id="college-login-id"
                    className="cc-input"
                    type="text"
                    placeholder="Enter official email or college ID"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="cc-field">
                <label htmlFor="college-login-password">Password</label>
                <div className="cc-input-wrap">
                  <span className="cc-field-icon"><LockIcon /></span>
                  <input
                    id="college-login-password"
                    className="cc-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    className="cc-password-toggle"
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon off={showPassword} />
                  </button>
                </div>
              </div>

              <label className="cc-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="cc-checkbox"><CheckIcon /></span>
                Remember me
              </label>

              <div className="cc-forgot-row">
                <button
                  type="button"
                  className="cc-forgot"
                  onClick={handleForgotPassword}
                >
                  Forgot your password?
                </button>
              </div>

              {error && <div className="cc-error" role="alert">{error}</div>}

              <button className="cc-login-submit" type="submit">
                Login
              </button>
            </form>

            <div className="cc-social-row">
              <button
                type="button"
                className="cc-social-btn"
                onClick={() => openProvider("google")}
                aria-label="Continue with Google"
                title="Continue with Google"
              >
                <GoogleIcon />
              </button>
              <button
                type="button"
                className="cc-social-btn"
                onClick={() => openProvider("github")}
                aria-label="Continue with GitHub"
                title="Continue with GitHub"
              >
                <GithubIcon />
              </button>
              <button
                type="button"
                className="cc-social-btn"
                onClick={() => openProvider("facebook")}
                aria-label="Continue with Facebook"
                title="Continue with Facebook"
              >
                <FacebookIcon />
              </button>
            </div>

            <p className="cc-verified-note">
              Only verified college accounts can log in.
            </p>
          </section>

          <section className="cc-login-visual">
            <div className="cc-stars" aria-hidden="true" />
            <div className="cc-streak" aria-hidden="true" />
            <div className="cc-watermark" aria-hidden="true">
              <CapIcon size="100%" color="#fff" />
            </div>

            <h2 className="cc-visual-title">Get started</h2>
            <p className="cc-visual-copy">
              Register your college and manage student profiles, plans and
              payments from one dashboard.
            </p>

          </section>
        </div>
        {provider && (
          <div className="cc-gmodal-overlay" onClick={closeSocial}>
            <div
              className="cc-gmodal"
              role="dialog"
              aria-modal="true"
              aria-label={`Sign in with ${PROVIDERS[provider].label}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cc-gmodal-head">
                {(() => {
                  const ProviderIcon = PROVIDERS[provider].Icon;
                  return <ProviderIcon />;
                })()}
                <h3>
                  {socialStep === "list"
                    ? "Choose an account"
                    : `Sign in with ${PROVIDERS[provider].label}`}
                </h3>
                <p>to continue to CampusConnect</p>
              </div>

              {socialStep === "list" ? (
                <>
                  {accounts.map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      className="cc-gaccount"
                      onClick={() => loginWithAccount(acc.email)}
                    >
                      <span className="cc-gavatar">{acc.name.charAt(0).toUpperCase()}</span>
                      <span className="cc-ginfo">
                        <b>{acc.name}</b>
                        <span>{acc.email}</span>
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="cc-gaccount"
                    onClick={() => {
                      setSocialError("");
                      setSocialStep("add");
                    }}
                  >
                    <span className="cc-gavatar plain">+</span>
                    <span className="cc-ginfo"><b>Use another account</b></span>
                  </button>
                  {socialError && <p className="cc-gerror">{socialError}</p>}
                </>
              ) : (
                <form onSubmit={handleAddNext}>
                  <input
                    className="cc-input"
                    type={PROVIDERS[provider].type}
                    placeholder={PROVIDERS[provider].placeholder}
                    value={accountId}
                    onChange={(e) => {
                      setAccountId(e.target.value);
                      setSocialError("");
                    }}
                    autoFocus
                    required
                  />
                  {socialError && <p className="cc-gerror">{socialError}</p>}
                  <div className="cc-gactions">
                    {accounts.length > 0 ? (
                      <button
                        type="button"
                        className="cc-glink"
                        onClick={() => {
                          setSocialError("");
                          setSocialStep("list");
                        }}
                      >
                        Back
                      </button>
                    ) : (
                      <button type="button" className="cc-glink" onClick={closeSocial}>
                        Cancel
                      </button>
                    )}
                    <button type="submit" className="cc-gnext">Next</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}