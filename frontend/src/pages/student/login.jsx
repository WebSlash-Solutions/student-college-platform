import { createElement as h, useState } from "react";

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
  box-sizing: border-box;
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
.cc-login-card h2 {
  margin: 0 0 6px;
  font-size: 26px;
  color: var(--cc-login-ink);
}
.cc-login-card-sub {
  margin: 0 0 24px;
  font-size: 14px;
  color: var(--cc-login-mut);
  line-height: 1.55;
}
.cc-google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid var(--cc-login-line);
  border-radius: 12px;
  background: #fff;
  color: var(--cc-login-ink);
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.05s ease;
}
.cc-google-btn:hover {
  box-shadow: 0 4px 16px rgba(17, 24, 39, 0.12);
}
.cc-google-btn:active {
  transform: translateY(1px);
}
.cc-google-btn:disabled {
  opacity: 0.6;
  cursor: default;
}
.cc-login-demo {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #7c3aed;
}
.cc-login-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 22px 0;
  color: var(--cc-login-mut);
  font-size: 12px;
}
.cc-login-divider::before,
.cc-login-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--cc-login-line);
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
}
.cc-login-submit:hover {
  opacity: 0.92;
}
.cc-login-submit:active {
  transform: translateY(1px);
}
.cc-login-submit:disabled {
  opacity: 0.6;
  cursor: default;
}
.cc-login-forgot {
  margin-top: 10px;
  text-align: center;
  font-size: 12.5px;
  color: var(--cc-login-mut);
}
.cc-login-forgot a {
  color: var(--cc-login-bg1);
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}
.cc-login-error {
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: 13px;
  line-height: 1.45;
}
.cc-login-tip {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  color: #3730a3;
  font-size: 12.5px;
  line-height: 1.55;
}
.cc-login-tip strong {
  display: block;
  margin-bottom: 4px;
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

const GOOGLE_CLIENT_ID = "";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* "harini.k_2004@gmail.com" -> "Harini K" */
const nameFromEmail = (value) =>
  String(value || "")
    .split("@")[0]
    .replace(/[0-9]+/g, " ")
    .replace(/[._-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ") || "Student";

const checkIcon = h(
  "svg",
  {
    key: "chk",
    viewBox: "0 0 24 24",
    width: 16,
    height: 16,
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  h("path", { d: "M4.5 12.5l4.5 4.5L19.5 6.5" }),
);

const googleIcon = h(
  "svg",
  { viewBox: "0 0 48 48", width: 19, height: 19, "aria-hidden": "true" },
  h("path", {
    fill: "#EA4335",
    d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z",
  }),
  h("path", {
    fill: "#4285F4",
    d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z",
  }),
  h("path", {
    fill: "#FBBC05",
    d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z",
  }),
  h("path", {
    fill: "#34A853",
    d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z",
  }),
);

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join(""),
    );
    return JSON.parse(json);
  } catch {
    return {};
  }
}

let gsiPromise = null;

function loadGsi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.google?.accounts?.id) {
    return Promise.resolve(window.google.accounts.id);
  }
  if (gsiPromise) {
    return gsiPromise;
  }
  gsiPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.accounts?.id) {
        resolve(window.google.accounts.id);
      } else {
        reject(new Error("google identity not available"));
      }
    };
    script.onerror = () => reject(new Error("failed to load google identity"));
    document.head.appendChild(script);
  });
  return gsiPromise;
}

export default function LoginView({ users = [], onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const finish = (profile) => {
    if (typeof onSuccess === "function") {
      onSuccess(profile);
    }
  };

  const handleGoogle = () => {
    setBusy(true);
    setError("");

    if (!GOOGLE_CLIENT_ID) {
      const isDev =
        typeof window !== "undefined" &&
        ["localhost", "127.0.0.1"].includes(window.location.hostname);

      if (isDev) {
        // demo mode: works even when there are no saved users
        const localUser = users[0] || {};
        window.setTimeout(() => {
          setBusy(false);
          finish({
            name: localUser?.name || "Demo Student",
            email: localUser?.email || "demo@student.com",
            picture: "",
            provider: "google",
          });
        }, 500);
      } else {
        setBusy(false);
        setError(
          "Google sign-in is not configured yet. Please sign in with your email.",
        );
      }
      return;
    }

    const googleUnavailable = () => {
      setBusy(false);
      setError(
        "Google sign-in is unavailable right now. Please sign in with your email.",
      );
    };

    loadGsi()
      .then((gsi) => {
        gsi.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            setBusy(false);
            if (!response?.credential) {
              setError("Google sign-in was cancelled. Please try again.");
              return;
            }
            const parsed = decodeJwt(response.credential);
            finish({
              name: parsed.name || "Google Student",
              email: parsed.email || "",
              picture: parsed.picture || "",
              provider: "google",
            });
          },
        });
        gsi.prompt();
      })
      .catch(googleUnavailable);
  };

  /* Any valid email can sign in. If it matches a saved user, that
     user's name is used; otherwise the name is taken from the email. */
  const handleEmail = (event) => {
    event.preventDefault();
    setError("");

    const value = (email || "").trim();

    if (!value) {
      setError("Please enter your email address.");
      return;
    }

    if (!EMAIL_PATTERN.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    const saved = users.find(
      (user) =>
        String(user?.email || "").trim().toLowerCase() === value.toLowerCase(),
    );

    // never keep the password in the saved session
    const { password: _ignored, ...savedProfile } = saved || {};

    finish({
      ...savedProfile,
      name: savedProfile.name || nameFromEmail(value),
      email: value,
      picture: savedProfile.picture || "",
      provider: "email",
    });
  };

  return h(
    "div",
    { className: "cc-login-page" },
    h("style", { key: "style" }, LOGIN_STYLE),
    h(
      "div",
      { className: "cc-login-shell", key: "shell" },
      h(
        "aside",
        { className: "cc-login-brand", key: "brand" },
        h(
          "div",
          { className: "cc-login-brand-inner" },
          h(
            "div",
            { className: "cc-login-logo", key: "logo" },
            h("span", { className: "cc-login-logo-mark" }, "SC"),
            h(
              "span",
              { className: "cc-login-logo-text" },
              h("strong", null, "Student College"),
              h("small", null, "Student-College Admission Platform"),
            ),
          ),
          h("h1", { key: "title" }, "Find the Right College for Your Future"),
          h(
            "p",
            { key: "tag" },
            "Compare engineering colleges across Coimbatore, Erode and Salem — courses, fees, eligibility and facilities in one place.",
          ),
          h(
            "ul",
            { className: "cc-login-features", key: "feat" },
            h("li", null, checkIcon, "Browse 90+ verified engineering colleges"),
            h("li", null, checkIcon, "Compare courses, fees & eligibility side-by-side"),
            h("li", null, checkIcon, "Save favourites and revisit anytime"),
          ),
          h(
            "div",
            { className: "cc-login-social", key: "social" },
            h(
              "div",
              { className: "cc-login-avatars" },
              h("span", { style: { background: "#f59e0b" } }, "RK"),
              h("span", { style: { background: "#10b981" } }, "PM"),
              h("span", { style: { background: "#3b82f6" } }, "AV"),
            ),
            h("span", null, "Trusted by 12,000+ students"),
          ),
        ),
      ),
      h(
        "main",
        { className: "cc-login-card", key: "card" },
        h("h2", null, "Welcome back"),
        h(
          "p",
          { className: "cc-login-card-sub" },
          "Sign in to continue to the admission platform.",
        ),

        h(
          "button",
          {
            type: "button",
            className: "cc-google-btn",
            onClick: handleGoogle,
            disabled: busy,
          },
          googleIcon,
          h("span", null, "Continue with Google"),
        ),

        h(
          "div",
          { className: "cc-login-divider" },
          h("span", null, "or continue with email"),
        ),

        h(
          "form",
          { onSubmit: handleEmail },
          h(
            "div",
            { className: "cc-login-field" },
            h("label", { htmlFor: "cc-login-email" }, "Email address"),
            h("input", {
              id: "cc-login-email",
              className: "cc-login-input",
              type: "email",
              placeholder: "you@example.com",
              value: email,
              autoComplete: "email",
              onChange: (event) => setEmail(event.target.value),
            }),
          ),
          h(
            "div",
            { className: "cc-login-field" },
            h("label", { htmlFor: "cc-login-password" }, "Password"),
            h(
              "div",
              { className: "cc-login-pw-wrap" },
              h("input", {
                id: "cc-login-password",
                className: "cc-login-input",
                type: showPassword ? "text" : "password",
                placeholder: "Your password",
                value: password,
                autoComplete: "current-password",
                onChange: (event) => setPassword(event.target.value),
              }),
              h(
                "button",
                {
                  type: "button",
                  className: "cc-login-pw-toggle",
                  onClick: () => setShowPassword((visible) => !visible),
                },
                showPassword ? "Hide" : "Show",
              ),
            ),
          ),
          h(
            "button",
            {
              type: "submit",
              className: "cc-login-submit",
              disabled: busy,
            },
            busy ? "Please wait…" : "Sign In",
          ),
        ),

        error ? h("div", { className: "cc-login-error" }, error) : null,
      ),
    ),
  );
}
