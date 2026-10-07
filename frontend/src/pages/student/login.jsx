import { useState } from "react";

export const LOGIN_STYLE = `
:root {
  --cc-login-bg1: #4f46e5;
  --cc-login-bg2: #7c3aed;
  --cc-login-ink: #111827;
  --cc-login-mut: #6b7280;
  --cc-login-line: #e5e7eb;
  --cc-login-brand-text: #ffffff;
  --cc-login-card: #ffffff;
}
.cc-login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f1f2f6;
  font-family: "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
  padding: 24px;
}
.cc-login-page *,
.cc-login-page *::before,
.cc-login-page *::after {
  box-sizing: border-box;
}
.cc-login-shell {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  width: 100%;
  max-width: 960px;
  min-height: 560px;
  background: var(--cc-login-card);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(17, 24, 39, 0.18);
}
.cc-login-brand {
  background: linear-gradient(150deg, var(--cc-login-bg1), var(--cc-login-bg2));
  color: var(--cc-login-brand-text);
  padding: 44px 40px;
  display: flex;
}
.cc-login-brand-inner {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
}
.cc-login-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.cc-login-logo-mark {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.18);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 20px;
}
.cc-login-logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.cc-login-logo-text strong {
  font-size: 16px;
  letter-spacing: 0.2px;
}
.cc-login-logo-text small {
  font-size: 11px;
  opacity: 0.75;
}
.cc-login-brand h1 {
  margin: 8px 0 0;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 700;
}
.cc-login-brand p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.85;
}
.cc-login-features {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: grid;
  gap: 14px;
}
.cc-login-features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13.5px;
  line-height: 1.45;
  opacity: 0.95;
}
.cc-login-features svg {
  flex: 0 0 auto;
  margin-top: 1px;
}
.cc-login-social {
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  opacity: 0.85;
}
.cc-login-avatars {
  display: flex;
}
.cc-login-avatars span {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.9);
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  margin-right: -8px;
}
.cc-login-card {
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cc-login-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 4px;
  background: #eef1f6;
  border-radius: 12px;
  margin-bottom: 22px;
}
.cc-login-tabs button {
  border: 0;
  background: transparent;
  padding: 9px 12px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  color: var(--cc-login-mut);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.cc-login-tabs button.active {
  background: var(--cc-login-card);
  color: var(--cc-login-ink);
  box-shadow: 0 2px 8px rgba(17, 24, 39, 0.1);
}
.cc-login-card h2 {
  margin: 0 0 6px;
  font-size: 26px;
  color: var(--cc-login-ink);
}
.cc-login-card-sub {
  margin: 0 0 22px;
  font-size: 14px;
  color: var(--cc-login-mut);
  line-height: 1.55;
}
.cc-login-field {
  margin-bottom: 14px;
}
.cc-login-field label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--cc-login-ink);
  margin-bottom: 6px;
}
.cc-login-input {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid var(--cc-login-line);
  border-radius: 10px;
  font-size: 14px;
  color: var(--cc-login-ink);
  background: #fff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.cc-login-input:focus {
  border-color: var(--cc-login-bg1);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}
.cc-login-pw-wrap {
  position: relative;
}
.cc-login-pw-toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: var(--cc-login-mut);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 6px;
}
.cc-login-submit {
  width: 100%;
  padding: 12px 14px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--cc-login-bg1), var(--cc-login-bg2));
  color: #fff;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.05s ease;
  margin-top: 4px;
}
.cc-login-submit:hover {
  opacity: 0.92;
}
.cc-login-submit:active {
  transform: translateY(1px);
}
.cc-login-error {
  margin-top: 16px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: 13px;
  line-height: 1.45;
}
.cc-login-switch {
  margin-top: 16px;
  text-align: center;
  font-size: 13px;
  color: var(--cc-login-mut);
}
.cc-login-switch button {
  border: 0;
  background: none;
  color: var(--cc-login-bg1);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
}
@media (max-width: 760px) {
  .cc-login-shell {
    grid-template-columns: 1fr;
    max-width: 440px;
  }
  .cc-login-brand {
    display: none;
  }
  .cc-login-card {
    padding: 36px 28px;
  }
}
`;

const STORED_USERS_KEY = "scp_auth_users";

function readStoredUsers() {
  try {
    const raw = localStorage.getItem(STORED_USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveStoredUser(user) {
  const list = readStoredUsers();
  list.push(user);
  try {
    localStorage.setItem(STORED_USERS_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable */
  }
}

export default function LoginView({ users = [], onSuccess }) {
  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const finish = (profile) => {
    if (typeof onSuccess === "function") {
      onSuccess(profile);
    }
  };

  const storedUsers = readStoredUsers();
  const allUsers = [...users, ...storedUsers];

  const switchMode = (next) => {
    setMode(next);
    setError("");
    setConfirmPassword("");
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    setError("");

    const value = (email || "").trim().toLowerCase();
    const match = allUsers.find((user) => {
      return String(user?.email || "").trim().toLowerCase() === value;
    });

    if (!match) {
      setError("No account found with this email. Create an account first.");
      return;
    }

    if (String(match?.password || "") !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    finish({ ...match, provider: "email" });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setError("");

    const value = (email || "").trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a valid email address.");
      return;
    }

    if ((password || "").length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if ((password || "") !== (confirmPassword || "")) {
      setError("Passwords do not match.");
      return;
    }

    const exists = allUsers.some((user) => {
      return String(user?.email || "").trim().toLowerCase() === value;
    });

    if (exists) {
      setError("An account with this email already exists. Please sign in.");
      return;
    }

    const newUser = {
      id: `u${Date.now()}`,
      name: (name || "").trim() || value.split("@")[0],
      email: value,
      password,
      role: "student",
    };

    saveStoredUser(newUser);
    finish({ ...newUser, provider: "email" });
  };

  const checkIcon = (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
    </svg>
  );

  return (
    <div className="cc-login-page">
      <style>{LOGIN_STYLE}</style>

      <div className="cc-login-shell">
        <aside className="cc-login-brand">
          <div className="cc-login-brand-inner">
            <div className="cc-login-logo">
              <span className="cc-login-logo-mark">SC</span>
              <span className="cc-login-logo-text">
                <strong>Student College</strong>
                <small>Student-College Admission Platform</small>
              </span>
            </div>

            <h1>Find the Right College for Your Future</h1>
            <p>
              Compare engineering colleges across Coimbatore, Erode and Salem —
              courses, fees, eligibility and facilities in one place.
            </p>

            <ul className="cc-login-features">
              <li>{checkIcon} Browse 90+ verified engineering colleges</li>
              <li>{checkIcon} Compare courses, fees &amp; eligibility side-by-side</li>
              <li>{checkIcon} Save favourites and revisit anytime</li>
            </ul>

            <div className="cc-login-social">
              <div className="cc-login-avatars">
                <span style={{ background: "#f59e0b" }}>RK</span>
                <span style={{ background: "#10b981" }}>PM</span>
                <span style={{ background: "#3b82f6" }}>AV</span>
              </div>
              <span>Trusted by 12,000+ students</span>
            </div>
          </div>
        </aside>

        <main className="cc-login-card">
          <div className="cc-login-tabs">
            <button
              type="button"
              className={mode === "signin" ? "active" : ""}
              onClick={() => switchMode("signin")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => switchMode("signup")}
            >
              Create Account
            </button>
          </div>

          {mode === "signin" ? (
            <form onSubmit={handleSignIn}>
              <h2>Welcome back</h2>
              <p className="cc-login-card-sub">
                Sign in with your email and password to open the platform.
              </p>

              <div className="cc-login-field">
                <label htmlFor="cc-login-email">Email address</label>
                <input
                  id="cc-login-email"
                  className="cc-login-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="cc-login-field">
                <label htmlFor="cc-login-password">Password</label>
                <div className="cc-login-pw-wrap">
                  <input
                    id="cc-login-password"
                    className="cc-login-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="cc-login-pw-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="cc-login-submit">
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <h2>Create your account</h2>
              <p className="cc-login-card-sub">
                Register in a few seconds and start exploring colleges.
              </p>

              <div className="cc-login-field">
                <label htmlFor="cc-login-name">Full name</label>
                <input
                  id="cc-login-name"
                  className="cc-login-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="cc-login-field">
                <label htmlFor="cc-login-email">Email address</label>
                <input
                  id="cc-login-email"
                  className="cc-login-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="cc-login-field">
                <label htmlFor="cc-login-password">Password</label>
                <div className="cc-login-pw-wrap">
                  <input
                    id="cc-login-password"
                    className="cc-login-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="cc-login-pw-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="cc-login-field">
                <label htmlFor="cc-login-confirm">Confirm password</label>
                <input
                  id="cc-login-confirm"
                  className="cc-login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="cc-login-submit">
                Create Account &amp; Sign In
              </button>
            </form>
          )}

          {error ? <div className="cc-login-error">{error}</div> : null}

          <p className="cc-login-switch">
            {mode === "signin" ? (
              <>
                New here?{" "}
                <button type="button" onClick={() => switchMode("signup")}>
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => switchMode("signin")}>
                  Sign In
                </button>
              </>
            )}
          </p>
        </main>
      </div>
    </div>
  );
}