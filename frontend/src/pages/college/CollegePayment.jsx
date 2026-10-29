import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/* COLLEGE PAYMENT PAGE  (route: /college/payment?plan=gold&period=6m)
   Design: full-height split screen.
     left  = deep teal "total" panel (huge animated amount + order lines with dotted leaders)
     right = cream checkout with accordion payment methods (radio rows that expand inline)
   Mobile: panel becomes a compact header (details collapse), Pay button sticks to the bottom.
   Receipt = thermal paper slip with torn edge.
   Same logic as before: login guard, plan guard, UPI collect flow, card preview, net banking, receipt.
   DEMO payment only - for real money create the order on your backend (Razorpay / PayU / Cashfree)
   and activate the plan only after server-side signature verification. */

const SESSION_KEY = "campusconnect_college_session";
const AFTER_LOGIN_KEY = "campusconnect_after_login";

const PLANS = {
  elite: { name: "Elite", icon: "🥈", accent: "#cbd5e1", monthly: 999, features: ["College listing in search", "Browse all student lead previews", "Email support"] },
  gold: { name: "Gold", icon: "🥇", accent: "#fbbf24", monthly: 1999, features: ["Featured badge on college profile", "Priority in district search", "Lead export (CSV)"] },
  diamond: { name: "Diamond", icon: "💎", accent: "#a78bfa", monthly: 3999, features: ["Top placement in search results", "Dedicated account manager", "Admission campaign support"] },
};
const PERIODS = { "1m": ["1 Month", 1, 0], "6m": ["6 Months", 6, 10], "12m": ["1 Year", 12, 20] };
const GST = 18;
const METHODS = [
  ["upi", "UPI", "⚡", "Google Pay, PhonePe, Paytm, BHIM"],
  ["card", "Debit / Credit card", "💳", "Visa, Mastercard, RuPay"],
  ["net", "Net banking", "🏦", "All major Indian banks"],
];
const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Indian Overseas Bank", "Canara Bank", "Bank of Baroda", "Kotak Mahindra Bank"];
const UPI_APPS = [["Google Pay", "@okaxis", "#1a73e8"], ["PhonePe", "@ybl", "#5f259f"], ["Paytm", "@paytm", "#00b9f1"], ["BHIM", "@upi", "#f26522"]];
const PROCESS_STEPS = ["Contacting your bank…", "Verifying payment securely…", "Activating your plan…"];
const CONFETTI = ["#1558d6", "#19b3e6", "#fb7185", "#fbbf24", "#10b981", "#a78bfa"];
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

const rupee = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const rupee2 = (n) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const mmss = (s) => `${String(Math.floor(Math.max(s, 0) / 60)).padStart(2, "0")}:${String(Math.max(s, 0) % 60).padStart(2, "0")}`;

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) || {}; } catch { return {}; }
  } catch { return null; }
}

/* real college name of whoever is logged in (checks the common session shapes) */
function pickCollegeName(s) {
  const str = (v) => (typeof v === "string" && v.trim() ? v.trim() : "");
  const keys = ["collegeName", "college_name", "instituteName", "institutionName", "institution", "institute"];
  const scan = (o) => {
    if (!o || typeof o !== "object") return "";
    for (const k of keys) if (str(o[k])) return str(o[k]);
    return "";
  };
  let n = scan(s);
  if (n) return n;
  for (const k of ["college", "institute", "institution", "user", "profile", "data"]) {
    const v = s && s[k];
    n = str(v) || scan(v) || (v && typeof v === "object" ? str(v.name) : "");
    if (n) return n;
  }
  return str(s && s.name);
}

/* the registered college record (matched by the login email) is the most reliable source of the real college name */
function findRegisteredName(s) {
  const email = String((s && (s.email || (s.user && s.user.email))) || "").trim().toLowerCase();
  if (!email) return "";
  const keys = ["collegeName", "college_name", "instituteName", "institutionName", "institution", "institute"];
  const str = (v) => (typeof v === "string" && v.trim() ? v.trim() : "");
  const nameOf = (o) => {
    for (const k of keys) if (str(o[k])) return str(o[k]);
    return o.college && typeof o.college === "object" ? str(o.college.name) : "";
  };
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || key === SESSION_KEY) continue;
      let v;
      try { v = JSON.parse(localStorage.getItem(key)); } catch { continue; }
      const list = Array.isArray(v) ? v : v && typeof v === "object" ? [v, ...Object.values(v)] : [];
      for (const o of list) {
        if (o && typeof o === "object" && String(o.email || "").trim().toLowerCase() === email) {
          const n = nameOf(o);
          if (n) return n;
        }
      }
    }
  } catch { /* ignore */ }
  return "";
}

function cardBrand(no) {
  const d = no.replace(/\s/g, "");
  if (d.startsWith("4")) return "VISA";
  if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return "Mastercard";
  if (/^(60|65|81|82|508)/.test(d)) return "RuPay";
  return "CARD";
}

/* animated rupee counter: rolls from the old value to the new one */
function Amount({ value }) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / 1000, 1);
      setV(a + (value - a) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <strong>{rupee(v)}</strong>;
}

function Logo() {
  return (
    <span className="cp-logo" aria-hidden="true">
      <svg viewBox="0 0 32 32"><path d="M16 6 3 12.5 16 19l13-6.5L16 6Z" /><path d="M9 16.5V22c0 1.7 3.1 3.5 7 3.5s7-1.8 7-3.5v-5.5l-7 3.5-7-3.5Z" /><path d="M29 13v7" fill="none" /></svg>
    </span>
  );
}

export default function CollegePayment() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const planId = params.get("plan");
  const periodId = params.get("period");
  const session = useMemo(readSession, []);
  const valid = Boolean(PLANS[planId] && PERIODS[periodId]);

  const [method, setMethod] = useState("upi");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ no: "", name: "", exp: "", cvv: "" });
  const [flip, setFlip] = useState(false);
  const [bank, setBank] = useState("");
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState("pay"); // pay | upi | processing | done
  const [phase, setPhase] = useState(0);
  const [receipt, setReceipt] = useState(null);
  const [secs, setSecs] = useState(300);
  const [upiStep, setUpiStep] = useState("req");
  const [pin, setPin] = useState("");
  const [showDet, setShowDet] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrMessage, setQrMessage] = useState("");
  const qrVideoRef = useRef(null);

  const confetti = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({
      left: Math.round(Math.random() * 100),
      delay: (Math.random() * 0.8).toFixed(2),
      dur: (2.4 + Math.random() * 1.8).toFixed(2),
      drift: Math.round(Math.random() * 160 - 80),
      color: CONFETTI[i % CONFETTI.length],
    })),
    []
  );

  /* guards */
  useEffect(() => {
    if (!session) {
      try { sessionStorage.setItem(AFTER_LOGIN_KEY, `/college/payment?plan=${planId}&period=${periodId}`); } catch { /* ignore */ }
      navigate("/college/register?mode=login", { replace: true });
    } else if (!valid) {
      navigate("/college/home?view=plans", { replace: true });
    }
  }, [session, valid, navigate, planId, periodId]);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [stage === "done"]);

  useEffect(() => {
    if (stage !== "processing") return undefined;
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [stage]);

  useEffect(() => {
    if (stage !== "upi") return undefined;
    setSecs(300);
    setUpiStep("req");
    setPin("");
    const t = setInterval(() => setSecs((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [stage]);

  useEffect(() => {
    if (stage === "upi" && secs <= 0) {
      setStage("pay");
      setErrors({ upi: "Payment request expired. Please try again." });
    }
  }, [secs, stage]);

  /* QR scanner: reads UPI payment QR codes using the device camera. */
  useEffect(() => {
    if (!qrOpen) return undefined;
    let stopped = false;
    let stream;
    let timer;
    const scan = async () => {
      if (stopped || !qrVideoRef.current || !("BarcodeDetector" in window)) return;
      try {
        const detector = scan.detector;
        const video = qrVideoRef.current;
        if (video.readyState >= 2) {
          const codes = await detector.detect(video);
          if (codes.length && !stopped) {
            const raw = codes[0].rawValue || "";
            let scannedUpi = "";
            try {
              const query = raw.includes("?") ? raw.slice(raw.indexOf("?") + 1).split("#")[0] : "";
              scannedUpi = new URLSearchParams(query).get("pa") || "";
            } catch { /* invalid QR payload */ }
            if (!scannedUpi && /^[\\w.-]{2,}@[a-zA-Z]{2,}$/.test(raw.trim())) scannedUpi = raw.trim();
            if (scannedUpi) {
              setUpi(scannedUpi);
              setErrors({});
              setQrOpen(false);
              return;
            }
            setQrMessage("This QR doesn't contain a valid UPI ID. Try another UPI payment QR.");
          }
        }
      } catch { /* wait for the next camera frame */ }
      if (!stopped) timer = setTimeout(scan, 250);
    };
    (async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error("Camera access isn't available in this browser.");
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
        if (stopped) { stream.getTracks().forEach((track) => track.stop()); return; }
        if (!("BarcodeDetector" in window)) {
          setQrMessage("QR scanning isn't supported in this browser. Open this page in the latest Chrome on Android, or enter your UPI ID manually.");
          return;
        }
        scan.detector = new window.BarcodeDetector({ formats: ["qr_code"] });
        if (qrVideoRef.current) {
          qrVideoRef.current.srcObject = stream;
          await qrVideoRef.current.play();
          scan();
        }
      } catch {
        setQrMessage("Camera permission is required to scan a QR code. Allow camera access and try again.");
      }
    })();
    return () => {
      stopped = true;
      clearTimeout(timer);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [qrOpen]);

  if (!session || !valid) return null;

  const plan = PLANS[planId];
  const [periodLabel, months, off] = PERIODS[periodId];
  const full = plan.monthly * months;
  const discount = (full * off) / 100;
  const total = full - discount;
  const taxable = total / (1 + GST / 100);
  const gstAmt = total - taxable;
  const collegeName = findRegisteredName(session) || pickCollegeName(session) || "Your college";
  const email = session.email || "";
  const startD = new Date();
  const endD = new Date(startD);
  endD.setMonth(endD.getMonth() + months);
  const initials = collegeName.split(/\s+/).filter((w) => /[A-Za-z]/.test(w)).slice(0, 2).map((w) => w.replace(/[^A-Za-z]/g, "")[0]).join("").toUpperCase() || "C";
  const busy = stage !== "pay";
  const upiApp = UPI_APPS.find(([, h]) => upi.trim().endsWith(h));
  const upiOk = /^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upi.trim());

  const validate = () => {
    const e = {};
    if (method === "upi") {
      if (!upiOk) e.upi = "Enter a valid UPI ID, for example name@okhdfcbank";
    } else if (method === "card") {
      if (card.no.replace(/\s/g, "").length !== 16) e.no = "Card number must have 16 digits";
      if (card.name.trim().length < 3) e.name = "Enter the name on the card";
      const m = /^(\d{2})\/(\d{2})$/.exec(card.exp);
      if (!m || +m[1] < 1 || +m[1] > 12) e.exp = "Use MM/YY";
      else if (new Date(2000 + +m[2], +m[1], 0, 23, 59) < new Date()) e.exp = "This card has expired";
      if (!/^\d{3,4}$/.test(card.cvv)) e.cvv = "3 or 4 digits";
    } else if (!bank) {
      e.bank = "Choose your bank";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* DEMO final step - replace with backend order + gateway + server verification */
  const finish = () => {
    setStage("processing");
    setTimeout(() => {
      const now = new Date();
      const end = new Date(now);
      end.setMonth(end.getMonth() + months);
      setReceipt({
        id: `CC${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${Math.floor(100000 + Math.random() * 900000)}`,
        date: now.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        valid: `${fmtDate(now)} – ${fmtDate(end)}`,
        method: method === "upi" ? `UPI · ${upi.trim()}` : method === "card" ? `Card ending ${card.no.replace(/\s/g, "").slice(-4)}` : `Net Banking · ${bank}`,
      });
      setStage("done");
    }, 3000);
  };

  const payNow = () => {
    if (stage !== "pay" || !validate()) return;
    if (method === "upi") setStage("upi");
    else finish();
  };

  const pressKey = (k) => {
    if (k === "del") { setPin((p) => p.slice(0, -1)); return; }
    if (!k || pin.length >= 6) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 6) setTimeout(finish, 450);
  };

  const cancelUpi = () => { setStage("pay"); setPin(""); };
  const pickMethod = (id) => { if (busy) return; setMethod(id); setErrors({}); setFlip(false); };
  const pickUpiApp = (handle) => { if (busy) return; setUpi((v) => `${v.split("@")[0]}${handle}`); setErrors({}); };

  const setC = (k) => (e) => {
    let v = e.target.value;
    if (k === "no") v = v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (k === "exp") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    if (k === "cvv") v = v.replace(/\D/g, "").slice(0, 4);
    setCard((c) => ({ ...c, [k]: v }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const onEnter = (e) => { if (e.key === "Enter" && e.target.tagName === "INPUT") payNow(); };

  const steps = ["Plan", "Payment", "Done"];
  const cur = stage === "done" ? 2 : 1;
  const cardNoShown = (card.no + "•••• •••• •••• ••••".slice(card.no.length + Math.floor(card.no.length / 4))).slice(0, 19);
  const ringPct = Math.max(secs, 0) / 300;

  const renderPanel = (id) => {
    if (id === "upi") {
      return (
        <>
          <div className="cp-chips">
            {UPI_APPS.map(([a, h, c]) => (
              <button key={a} type="button" className={upi.endsWith(h) ? "on" : ""} onClick={() => pickUpiApp(h)} disabled={busy} style={{ "--c": c }}>
                <i>{a[0]}</i>{a}
              </button>
            ))}
          </div>
          <label className={`${errors.upi ? "bad" : ""} ${upiOk ? "good" : ""}`}>
            <span className="cp-lb">UPI ID</span>
            <span className="cp-inwrap cp-upi-inputwrap">
              <input value={upi} onChange={(e) => { setUpi(e.target.value); setErrors({}); }} placeholder="name@okhdfcbank" autoComplete="off" inputMode="email" disabled={busy} />
              {upiOk && <b className="cp-okmark" aria-hidden="true">✓</b>}
              <button type="button" className="cp-qr-btn" onClick={() => { setQrMessage(""); setQrOpen(true); }} disabled={busy} aria-label="Scan UPI QR code" title="Scan UPI QR code">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M8 8h3v3H8zM14 8h2v2h-2zM14 14h3v3h-3zM8 14h2v2H8zM11 14v2M14 11h2M17 8v2M8 11v1M11 17h1M18 14h2" /></svg>
              </button>
            </span>
            {errors.upi && <em>{errors.upi}</em>}
            {upiOk && !errors.upi && <span className="cp-okt">UPI ID looks good{upiApp ? ` · ${upiApp[0]}` : ""}</span>}
          </label>
          <ol className="cp-flow">
            <li><b>1</b>Tap Pay</li>
            <li><b>2</b>Request reaches your UPI app</li>
            <li><b>3</b>Approve with UPI PIN</li>
          </ol>
        </>
      );
    }
    if (id === "card") {
      return (
        <>
          <div className={`cp-card ${flip ? "flip" : ""}`} aria-hidden="true">
            <div className="cp-card-in">
              <div className="cp-face front">
                <div className="pc-top"><span className="pc-chip" /><b>{cardBrand(card.no)}</b></div>
                <div className="pc-no">{cardNoShown}</div>
                <div className="pc-bot">
                  <div><small>Card holder</small><span>{card.name.trim() || "YOUR NAME"}</span></div>
                  <div><small>Expires</small><span>{card.exp || "MM/YY"}</span></div>
                </div>
              </div>
              <div className="cp-face back">
                <div className="pc-strip" />
                <div className="pc-cvv"><small>CVV</small><span>{card.cvv ? "•".repeat(card.cvv.length) : "•••"}</span></div>
              </div>
            </div>
          </div>
          <div className="cp-fields">
            <label className={`full ${errors.no ? "bad" : ""}`}>
              <span className="cp-lb">Card number</span>
              <input value={card.no} onChange={setC("no")} placeholder="1234 5678 9012 3456" inputMode="numeric" autoComplete="cc-number" disabled={busy} />
              {errors.no && <em>{errors.no}</em>}
            </label>
            <label className={`full ${errors.name ? "bad" : ""}`}>
              <span className="cp-lb">Name on card</span>
              <input value={card.name} onChange={setC("name")} placeholder="As printed on the card" autoComplete="cc-name" disabled={busy} />
              {errors.name && <em>{errors.name}</em>}
            </label>
            <label className={errors.exp ? "bad" : ""}>
              <span className="cp-lb">Expiry</span>
              <input value={card.exp} onChange={setC("exp")} placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" disabled={busy} />
              {errors.exp && <em>{errors.exp}</em>}
            </label>
            <label className={errors.cvv ? "bad" : ""}>
              <span className="cp-lb">CVV</span>
              <input value={card.cvv} onChange={setC("cvv")} onFocus={() => setFlip(true)} onBlur={() => setFlip(false)} placeholder="•••" inputMode="numeric" type="password" autoComplete="cc-csc" disabled={busy} />
              {errors.cvv && <em>{errors.cvv}</em>}
            </label>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="cp-banks">
          {BANKS.map((b) => (
            <button key={b} type="button" className={bank === b ? "on" : ""} onClick={() => { setBank(b); setErrors({}); }} disabled={busy}>
              <i>{b[0]}</i>{b}
            </button>
          ))}
        </div>
        {errors.bank && <em className="cp-err">{errors.bank}</em>}
        <p className="cp-hint">You will be taken to your bank’s secure page to finish the payment.</p>
      </>
    );
  };

  return (
    <div className="cp" style={{ "--accent": plan.accent }}>
      <style>{css}</style>

      {stage === "done" ? (
        /* ============ SUCCESS ============ */
        <main className="cp-done">
          <div className="cp-confetti" aria-hidden="true">
            {confetti.map((c, i) => (
              <i key={i} style={{ left: `${c.left}%`, background: c.color, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s`, "--dx": `${c.drift}px` }} />
            ))}
          </div>

          <button className="cp-brand dark" onClick={() => navigate("/college/home")} aria-label="CampusConnect home"><Logo /><b>CampusConnect</b></button>

          <div className="cp-tick" aria-hidden="true">
            <span /><span className="r2" />
            <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg>
          </div>
          <h1>Payment successful</h1>
          <p className="cp-lead">
            Your {plan.name} plan for {periodLabel.toLowerCase()} is now active.
            {email && <> Receipt sent to <b>{email}</b>.</>}
          </p>

          <section className="cp-receipt" aria-label="Receipt">
            <div className="cp-rc-top">
              <b>CAMPUSCONNECT</b>
              <small>GST RECEIPT</small>
            </div>
            <div className="cp-stamp" aria-hidden="true">PAID</div>
            <div className="cp-dash" />
            <dl>
              <div><dt>Receipt no.</dt><dd>{receipt.id}</dd></div>
              <div><dt>Date</dt><dd>{receipt.date}</dd></div>
              <div><dt>College</dt><dd>{collegeName}</dd></div>
              <div><dt>Plan</dt><dd>{plan.icon} {plan.name} · {periodLabel}</dd></div>
              <div><dt>Valid</dt><dd>{receipt.valid}</dd></div>
              <div><dt>Method</dt><dd>{receipt.method}</dd></div>
            </dl>
            <div className="cp-dash" />
            <dl>
              <div><dt>Amount (excl. GST)</dt><dd>{rupee2(taxable)}</dd></div>
              <div><dt>GST @ {GST}%</dt><dd>{rupee2(gstAmt)}</dd></div>
              <div className="tot"><dt>TOTAL PAID</dt><dd>{rupee2(total)}</dd></div>
            </dl>
            <div className="cp-dash" />
            <p className="cp-thanks">✦ Thank you for choosing CampusConnect ✦</p>
          </section>

          <div className="cp-actions">
            <button className="cp-pay slim" onClick={() => navigate("/college/dashboard")}><span>Go to dashboard</span><i aria-hidden="true">→</i></button>
            <button className="cp-ghost" onClick={() => window.print()}>Print / save receipt</button>
          </div>
        </main>
      ) : (
        /* ============ CHECKOUT ============ */
        <div className="cp-split">
          {/* ---- left: total panel ---- */}
          <aside className="cp-side">
            <span className="cp-mark" aria-hidden="true">{plan.icon}</span>
            <div className="cp-side-in">
              <div className="cp-side-top">
                <button className="cp-brand" onClick={() => navigate("/college/home")} disabled={busy} aria-label="CampusConnect home"><Logo /><b>CampusConnect</b></button>
                <button className="cp-back" onClick={() => navigate("/college/home?view=plans")} disabled={busy}>← Change plan</button>
              </div>

              <p className="cp-eyebrow"><span aria-hidden="true">{plan.icon}</span> {plan.name} plan · {periodLabel}</p>
              <div className="cp-big">
                <small>Total to pay</small>
                <Amount value={total} />
                <span className="cp-big-sub">incl. {GST}% GST{off > 0 && <em>You save {rupee(discount)}</em>}</span>
              </div>

              <button className="cp-det-toggle" aria-expanded={showDet} onClick={() => setShowDet((v) => !v)}>
                Order details <span aria-hidden="true">▾</span>
              </button>

              <div className={`cp-det ${showDet ? "open" : ""}`}>
                <div className="cp-who">
                  <span className="cp-avatar" aria-hidden="true">{initials}</span>
                  <div><small>Plan for</small><b>{collegeName}</b></div>
                </div>

                <dl className="cp-lines">
                  <div><dt>{plan.name} × {months} {months === 1 ? "month" : "months"}</dt><i /><dd>{rupee(full)}</dd></div>
                  {off > 0 && <div className="save"><dt>{off}% duration discount</dt><i /><dd>− {rupee(discount)}</dd></div>}
                  <div className="mut"><dt>Price excl. GST</dt><i /><dd>{rupee2(taxable)}</dd></div>
                  <div className="mut"><dt>GST @ {GST}%</dt><i /><dd>{rupee2(gstAmt)}</dd></div>
                </dl>

                <ul className="cp-feat">
                  {planId !== "elite" && <li>Everything in {planId === "gold" ? "Elite" : "Gold"}</li>}
                  {plan.features.map((f) => <li key={f}>{f}</li>)}
                </ul>

                <p className="cp-valid">📅 Valid <b>{fmtDate(startD)}</b> → <b>{fmtDate(endD)}</b></p>
                <p className="cp-note">Student lead unlocks are charged separately at ₹100 per lead.</p>
              </div>
            </div>
          </aside>

          {/* ---- right: payment ---- */}
          <main className="cp-main" onKeyDown={onEnter}>
            <div className="cp-bg" aria-hidden="true"><i /><i /><s>₹</s><s>🎓</s><s>₹</s></div>
            <div className="cp-main-in">
              <ol className="cp-prog" aria-label="Checkout progress">
                {steps.map((t, i) => (
                  <li key={t} className={i < cur ? "done" : i === cur ? "on" : ""}><i /><span>{i < cur ? "✓ " : ""}{t}</span></li>
                ))}
              </ol>

              <h1>Choose how to pay</h1>
              <p className="cp-sub">Your plan starts the moment the payment is confirmed.</p>

              <div className="cp-acc" role="radiogroup" aria-label="Payment method">
                {METHODS.map(([id, t, ic, sub]) => (
                  <section key={id} className={`cp-opt ${method === id ? "open" : ""}`}>
                    <button type="button" role="radio" aria-checked={method === id} className="cp-opt-h" onClick={() => pickMethod(id)} disabled={busy}>
                      <span className="cp-radio" aria-hidden="true" />
                      <span className="cp-opt-ic" aria-hidden="true">{ic}</span>
                      <span className="cp-opt-t"><b>{t}</b><small>{sub}</small></span>
                      <span className="cp-chev" aria-hidden="true">⌄</span>
                    </button>
                    <div className="cp-opt-b">
                      <div><div className="cp-pad">{method === id && renderPanel(id)}</div></div>
                    </div>
                  </section>
                ))}
              </div>

              <div className="cp-paywrap">
                <button className="cp-pay" onClick={payNow} disabled={busy}>
                  <span><b aria-hidden="true">🔒</b> Pay {rupee(total)}</span><i aria-hidden="true">→</i>
                </button>
                <ul className="cp-trust" aria-label="Security assurances">
                  <li>Encrypted</li><li>Server-verified</li><li>Instant GST receipt</li>
                </ul>
              </div>

              <p className="cp-safe">We never store your card details. Your plan is activated only after our server verifies the payment.{email && <> Receipt goes to <b>{email}</b>.</>}</p>
            </div>
          </main>
        </div>
      )}

      {/* ---- UPI request + approve ---- */}
      {stage === "upi" && (
        <div className="cp-overlay" role="dialog" aria-modal="true" aria-label="Approve UPI payment">
          <div className="cp-ov upi">
            <div className="cp-upi-left">
              <span className="cp-tag">UPI payment request</span>
              <h2>Approve on your UPI app</h2>
              <p>We sent a request of <b>{rupee(total)}</b> to <b>{upi.trim()}</b>. Open your UPI app and approve it.</p>

              <div className="cp-timer">
                <svg viewBox="0 0 80 80" aria-hidden="true">
                  <circle className="t" cx="40" cy="40" r="34" />
                  <circle className="b" cx="40" cy="40" r="34" style={{ strokeDasharray: 214, strokeDashoffset: 214 * (1 - ringPct) }} />
                </svg>
                <strong>{mmss(secs)}</strong>
                <span>Request valid for</span>
              </div>

              <ul className="cp-upi-steps">
                <li className="done"><b>✓</b>Request sent to your UPI app</li>
                <li className={upiStep === "req" ? "on" : "done"}><b>{upiStep === "req" ? "" : "✓"}</b>Open the request and tap Pay</li>
                <li className={upiStep === "pin" ? "on" : ""}><b></b>Enter your UPI PIN</li>
              </ul>
              <button className="cp-link" onClick={cancelUpi}>Cancel payment</button>
              <p className="cp-demo">DEMO · no real money moves. Any 6 digits work as PIN.</p>
            </div>

            <div className="cp-phone" aria-label="UPI app preview">
              <span className="cp-notch" />
              <div className="cp-screen" key={upiStep}>
                {upiStep === "req" ? (
                  <>
                    <div className="ps-app" style={{ "--c": upiApp ? upiApp[2] : "#1558d6" }}>
                      <i>{(upiApp ? upiApp[0] : "UPI")[0]}</i>{upiApp ? upiApp[0] : "UPI App"}
                    </div>
                    <div className="ps-card">
                      <small>Collect request from</small>
                      <b>CampusConnect</b>
                      <div className="ps-amt">{rupee(total)}</div>
                      <small>{plan.name} plan · {periodLabel}</small>
                    </div>
                    <div className="ps-row"><span>Paying from</span><b>{upi.trim()}</b></div>
                    <div className="ps-row"><span>Expires in</span><b>{mmss(secs)}</b></div>
                    <div className="ps-btns">
                      <button className="no" onClick={cancelUpi}>Decline</button>
                      <button className="yes" onClick={() => setUpiStep("pin")}>Pay {rupee(total)}</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="ps-pinhead">
                      <small>Paying CampusConnect</small>
                      <b>{rupee(total)}</b>
                      <span>Enter 6-digit UPI PIN</span>
                    </div>
                    <div className="ps-dots" aria-label={`${pin.length} of 6 digits entered`}>
                      {Array.from({ length: 6 }, (_, i) => <i key={i} className={i < pin.length ? "on" : ""} />)}
                    </div>
                    <div className="ps-keys">
                      {KEYS.map((k, i) => (
                        <button key={i} onClick={() => pressKey(k)} disabled={!k} className={k === "del" ? "del" : ""} aria-label={k === "del" ? "Delete" : k || "blank"}>
                          {k === "del" ? "⌫" : k}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- UPI QR scanner ---- */}
      {qrOpen && (
        <div className="cp-qr-overlay" role="dialog" aria-modal="true" aria-label="Scan UPI QR code">
          <div className="cp-qr-modal">
            <button type="button" className="cp-qr-close" onClick={() => setQrOpen(false)} aria-label="Close QR scanner">×</button>
            <div className="cp-qr-symbol" aria-hidden="true">▦</div>
            <h2>Scan UPI QR Code</h2>
            <p>Place the UPI payment QR code inside the frame.</p>
            <div className="cp-qr-camera">
              <video ref={qrVideoRef} autoPlay muted playsInline />
              <span className="cp-qr-frame" aria-hidden="true" />
            </div>
            {qrMessage && <p className="cp-qr-message" role="alert">{qrMessage}</p>}
            <button type="button" className="cp-qr-cancel" onClick={() => setQrOpen(false)}>Cancel scanning</button>
            <small>Camera scanning only reads the UPI ID. Payment remains in demo mode.</small>
          </div>
        </div>
      )}

      {/* ---- processing ---- */}
      {stage === "processing" && (
        <div className="cp-overlay" role="status" aria-live="polite">
          <div className="cp-ov">
            <div className="cp-ring"><i /><span>🔒</span></div>
            <h2>Processing payment</h2>
            <p>Please don’t close or refresh this page.</p>
            <ul>
              {PROCESS_STEPS.map((s, i) => (
                <li key={s} className={i < phase ? "done" : i === phase ? "on" : ""}><b>{i < phase ? "✓" : ""}</b>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap");
body { margin:0!important; display:block!important; background:#f3f8ff!important; }
#root { width:100%!important; max-width:none!important; margin:0!important; padding:0!important; border:0!important; text-align:left!important; display:block!important; }

.cp { --ink:#0b1b3a; --teal:#0b2a78; --teal2:#1558d6; --brand:#1558d6; --cream:#f3f8ff; --line:#dce8f7; --muted:#52698a; --lime:#8fe3ff; --mint:#10b981; --bad:#d6384a;
  position:relative; min-height:100vh; overflow-x:hidden; color:var(--ink); font-family:"Plus Jakarta Sans",system-ui,sans-serif; font-size:14.5px; line-height:1.5; background:var(--cream); }
.cp * { box-sizing:border-box; }
.cp h1,.cp h2,.cp p,.cp ul,.cp ol,.cp dl { margin:0; }
.cp h1,.cp h2 { font-family:"Bricolage Grotesque","Plus Jakarta Sans",sans-serif; letter-spacing:-.6px; }
.cp strong { font-family:"Bricolage Grotesque","Plus Jakarta Sans",sans-serif; font-weight:800; }
.cp b { font-weight:700; }
.cp button { font:inherit; cursor:pointer; }
.cp button:focus-visible,.cp input:focus-visible { outline:3px solid rgba(21,88,214,.45); outline-offset:2px; }

/* brand */
.cp-brand { display:flex; align-items:center; gap:9px; padding:0; border:0; background:none; color:#fff; }
.cp-brand b { font-family:"Bricolage Grotesque",sans-serif; font-size:16px; letter-spacing:-.3px; font-weight:700; }
.cp-brand.dark { color:var(--ink); }
.cp-brand:disabled { cursor:not-allowed; }
.cp-logo { display:grid; place-items:center; width:34px; height:34px; border-radius:11px; background:var(--lime); }
.cp-logo svg { width:20px; height:20px; fill:var(--teal); stroke:var(--teal); stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }

/* ===== split layout ===== */
.cp-split { display:grid; grid-template-columns:minmax(0,5fr) minmax(0,6fr); min-height:100vh; }

/* ---- left panel ---- */
.cp-side { position:sticky; top:0; height:100vh; overflow:hidden; color:#fff;
  background:radial-gradient(520px 420px at 100% 0%,color-mix(in srgb,var(--accent) 34%,transparent),transparent 70%),radial-gradient(520px 480px at 0% 100%,rgba(212,245,90,.14),transparent 70%),linear-gradient(160deg,var(--teal2),var(--teal) 55%,#0b1b3a); }
.cp-side::before,.cp-side::after { content:""; position:absolute; border-radius:50%; border:1.5px solid rgba(255,255,255,.09); pointer-events:none; }
.cp-side::before { width:620px; height:620px; right:-260px; bottom:-260px; }
.cp-side::after { width:400px; height:400px; right:-150px; bottom:-150px; }
.cp-mark { position:absolute; right:-24px; bottom:-34px; font-size:210px; line-height:1; opacity:.1; filter:grayscale(.3); pointer-events:none; }
.cp-side-in { position:relative; z-index:1; display:flex; flex-direction:column; height:100%; max-width:520px; margin-left:auto; padding:clamp(26px,4vw,52px); overflow-y:auto; scrollbar-width:none; }
.cp-side-in::-webkit-scrollbar { display:none; }
.cp-side-top { display:flex; align-items:center; justify-content:space-between; gap:12px; }
.cp-back { padding:7px 14px; border:1px solid rgba(255,255,255,.25); border-radius:999px; background:rgba(255,255,255,.07); color:#fff; font-weight:600; font-size:12.5px; transition:background .2s,transform .2s; }
.cp-back:hover:not(:disabled) { background:rgba(255,255,255,.16); transform:translateX(-2px); }
.cp-back:disabled { opacity:.5; cursor:not-allowed; }
.cp-eyebrow { margin-top:clamp(28px,6vh,64px); display:inline-flex; align-items:center; gap:8px; align-self:flex-start; padding:6px 14px 6px 10px; border-radius:999px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.16); font-weight:700; font-size:13px; }
.cp-big { margin-top:16px; }
.cp-big small { display:block; font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,.6); }
.cp-big strong { display:block; margin-top:4px; font-size:clamp(46px,6.2vw,84px); line-height:1; letter-spacing:-2.5px; font-variant-numeric:tabular-nums; color:#fff; }
.cp-big strong::after { content:""; display:block; width:64px; height:5px; margin-top:14px; border-radius:5px; background:var(--accent); }
.cp-big-sub { display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin-top:12px; font-size:13.5px; font-weight:500; color:rgba(255,255,255,.72); }
.cp-big-sub em { padding:3px 11px; border-radius:999px; background:var(--lime); color:var(--teal); font-style:normal; font-weight:700; font-size:12px; }

.cp-det-toggle { display:none; }
.cp-det { margin-top:clamp(22px,4vh,38px); }
.cp-who { display:flex; align-items:center; gap:12px; padding:12px 14px; border-radius:16px; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.12); }
.cp-avatar { display:grid; place-items:center; flex:none; width:40px; height:40px; border-radius:12px; background:var(--accent); color:var(--teal); font-family:"Bricolage Grotesque",sans-serif; font-weight:800; font-size:15px; }
.cp-who small { display:block; font-size:11.5px; font-weight:500; color:rgba(255,255,255,.6); }
.cp-who b { display:block; font-size:14.5px; line-height:1.3; overflow-wrap:anywhere; }
.cp-lines { display:grid; gap:11px; margin-top:20px; }
.cp-lines div { display:flex; align-items:baseline; gap:8px; font-size:13.5px; font-weight:600; }
.cp-lines dt,.cp-lines dd { margin:0; flex:none; }
.cp-lines dd { font-variant-numeric:tabular-nums; }
.cp-lines i { flex:1; min-width:12px; border-bottom:2px dotted rgba(255,255,255,.25); transform:translateY(-3px); }
.cp-lines .save { color:var(--lime); }
.cp-lines .mut { font-size:12.5px; font-weight:500; color:rgba(255,255,255,.62); }
.cp-feat { display:flex; flex-wrap:wrap; gap:8px; margin:22px 0 0; padding:0; list-style:none; }
.cp-feat li { padding:6px 12px; border-radius:999px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.14); font-size:12.5px; font-weight:600; color:rgba(255,255,255,.92); }
.cp-feat li::before { content:"✓ "; color:var(--lime); font-weight:800; }
.cp-valid { margin-top:20px; font-size:13px; color:rgba(255,255,255,.8); }
.cp-valid b { color:#fff; }
.cp-note { margin-top:8px; font-size:12px; color:rgba(255,255,255,.5); }

/* ---- right: checkout ---- */
.cp-main { display:flex; justify-content:flex-start; padding:clamp(24px,4vw,56px) clamp(18px,4vw,64px) 40px; }
.cp-main-in { width:100%; max-width:560px; animation:cpRise .6s both; }
.cp-prog { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin:0 0 clamp(22px,4vh,40px); padding:0; list-style:none; }
.cp-prog li { display:grid; gap:7px; font-size:12px; font-weight:700; color:#8196b3; }
.cp-prog i { display:block; height:5px; border-radius:5px; background:#dce8f7; overflow:hidden; position:relative; }
.cp-prog li.done { color:var(--mint); }
.cp-prog li.done i { background:var(--mint); }
.cp-prog li.on { color:var(--ink); }
.cp-prog li.on i::after { content:""; position:absolute; inset:0 auto 0 0; width:55%; border-radius:5px; background:var(--brand); animation:cpTrack 2.4s ease-in-out infinite; }
.cp-main h1 { font-size:clamp(26px,3.2vw,36px); font-weight:800; line-height:1.1; }
.cp-sub { margin-top:6px; color:var(--muted); }

/* accordion */
.cp-acc { display:grid; gap:12px; margin-top:24px; }
.cp-opt { border-radius:20px; background:#fff; border:2px solid var(--line); transition:border-color .25s,box-shadow .25s; }
.cp-opt.open { border-color:var(--brand); box-shadow:0 22px 40px -28px rgba(21,88,214,.5); }
.cp-opt-h { display:flex; align-items:center; gap:13px; width:100%; padding:16px 18px; border:0; background:none; color:inherit; text-align:left; border-radius:18px; }
.cp-opt-h:disabled { cursor:not-allowed; }
.cp-radio { flex:none; position:relative; width:22px; height:22px; border-radius:50%; border:2px solid #b8c9e6; transition:border-color .2s; }
.cp-radio::after { content:""; position:absolute; inset:4px; border-radius:50%; background:var(--brand); transform:scale(0); transition:transform .25s cubic-bezier(.3,1.5,.5,1); }
.cp-opt.open .cp-radio { border-color:var(--brand); }
.cp-opt.open .cp-radio::after { transform:scale(1); }
.cp-opt-ic { display:grid; place-items:center; flex:none; width:42px; height:42px; border-radius:13px; background:#eaf1fd; font-size:20px; }
.cp-opt.open .cp-opt-ic { background:#e3eeff; }
.cp-opt-t { flex:1; min-width:0; display:grid; }
.cp-opt-t b { font-size:15px; }
.cp-opt-t small { font-size:12.5px; color:var(--muted); font-weight:500; }
.cp-chev { font-size:18px; color:#8196b3; transition:transform .3s; }
.cp-opt.open .cp-chev { transform:rotate(180deg); color:var(--brand); }
.cp-opt-b { display:grid; grid-template-rows:0fr; transition:grid-template-rows .4s cubic-bezier(.3,1,.4,1); }
.cp-opt.open .cp-opt-b { grid-template-rows:1fr; }
.cp-opt-b > div { min-height:0; overflow:hidden; }
.cp-pad { padding:4px 18px 20px; }
.cp-opt.open .cp-pad { animation:cpFade .4s .1s both; }

.cp-chips { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; }
.cp-chips button { display:inline-flex; align-items:center; gap:7px; padding:5px 13px 5px 5px; border-radius:999px; background:#f3f8ff; border:2px solid var(--line); font-size:13px; font-weight:600; color:#35506c; transition:all .2s; }
.cp-chips i { display:grid; place-items:center; width:24px; height:24px; border-radius:50%; background:var(--c); color:#fff; font-style:normal; font-size:11.5px; font-weight:800; }
.cp-chips button:hover:not(:disabled) { border-color:#a9c6f5; transform:translateY(-2px); }
.cp-chips button.on { background:#e3eeff; border-color:var(--brand); color:var(--teal2); }

.cp label { display:grid; gap:6px; }
.cp label.full { grid-column:1/-1; }
.cp-lb { font-size:11.5px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:#6d86a6; }
.cp input { width:100%; min-height:48px; padding:0 15px; border:2px solid var(--line); border-radius:13px; background:#f7faff; font:inherit; font-size:15px; font-weight:600; color:var(--ink); transition:border-color .2s,box-shadow .2s,background .2s; }
.cp input::placeholder { color:#a3b3cc; font-weight:500; }
.cp input:focus { border-color:var(--brand); background:#fff; box-shadow:0 0 0 4px rgba(21,88,214,.14); outline:none; }
.cp input:disabled { opacity:.7; }
.cp label.bad input { border-color:var(--bad); background:#fff7f8; animation:cpShake .4s; }
.cp label.good input { border-color:var(--mint); background:#f4fcf9; padding-right:46px; }
.cp label em,.cp-err { font-style:normal; font-size:12.5px; font-weight:600; color:var(--bad); }
.cp-err { display:block; margin-top:8px; }
.cp-inwrap { position:relative; display:block; }
.cp-okmark { position:absolute; right:13px; top:50%; translate:0 -50%; display:grid; place-items:center; width:22px; height:22px; border-radius:50%; background:var(--mint); color:#fff; font-size:11px; animation:cpPop .35s cubic-bezier(.2,1.4,.4,1) both; }
.cp-okt { font-size:12.5px; font-weight:700; color:#0b7d60; }
.cp-hint { margin-top:12px; font-size:13px; color:var(--muted); }
.cp-flow { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:14px; padding:0; list-style:none; }
.cp-flow li { display:flex; align-items:center; gap:8px; padding:9px 11px; border-radius:12px; background:#eef4ff; font-size:12px; font-weight:600; color:#35506c; line-height:1.25; }
.cp-flow b { display:grid; place-items:center; flex:none; width:20px; height:20px; border-radius:50%; background:var(--teal2); color:#fff; font-size:10.5px; }
.cp-fields { display:grid; grid-template-columns:1fr 1fr; gap:14px; }

/* card preview */
.cp-card { width:min(300px,100%); height:178px; margin:0 auto 18px; perspective:1000px; }
.cp-card-in { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .7s cubic-bezier(.3,1.1,.4,1); }
.cp-card.flip .cp-card-in { transform:rotateY(180deg); }
.cp-face { position:absolute; inset:0; padding:17px 19px; border-radius:18px; color:#fff; backface-visibility:hidden; -webkit-backface-visibility:hidden; overflow:hidden; background:linear-gradient(135deg,#0b1b3a,var(--teal2) 60%,color-mix(in srgb,var(--accent) 55%,#1558d6)); box-shadow:0 22px 36px -18px rgba(11,27,58,.8); }
.cp-face::after { content:""; position:absolute; top:-40%; left:-60%; width:50%; height:200%; background:linear-gradient(100deg,transparent,rgba(255,255,255,.2),transparent); transform:rotate(18deg); animation:cpSheen 4.5s ease-in-out infinite; }
.cp-face.back { transform:rotateY(180deg); padding:0; }
.pc-top { display:flex; justify-content:space-between; align-items:center; }
.pc-top b { font-family:"Bricolage Grotesque",sans-serif; font-size:14px; font-style:italic; }
.pc-chip { width:38px; height:28px; border-radius:7px; background:linear-gradient(135deg,#ffe39a,#e8b43c); }
.pc-no { margin-top:22px; font-family:"DM Mono",monospace; font-size:clamp(15px,4.6vw,18px); font-weight:500; letter-spacing:1.5px; white-space:nowrap; }
.pc-bot { position:absolute; left:19px; right:19px; bottom:15px; display:flex; justify-content:space-between; gap:10px; }
.pc-bot small,.pc-cvv small { display:block; font-size:9.5px; letter-spacing:1px; text-transform:uppercase; opacity:.75; }
.pc-bot span { display:block; max-width:150px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:12.5px; font-weight:700; text-transform:uppercase; }
.pc-strip { height:36px; margin-top:22px; background:#06143a; }
.pc-cvv { margin:18px 19px 0; padding:7px 12px; border-radius:7px; background:#fff; color:var(--ink); text-align:right; }
.pc-cvv small { text-align:left; color:var(--muted); }
.pc-cvv span { font-weight:800; letter-spacing:3px; }

.cp-banks { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
.cp-banks button { display:flex; align-items:center; gap:10px; min-height:48px; padding:0 12px 0 9px; border:2px solid var(--line); border-radius:13px; background:#f7faff; font-weight:600; font-size:13px; color:#23406e; text-align:left; transition:all .2s; }
.cp-banks button:hover:not(:disabled) { border-color:#a9c6f5; transform:translateY(-2px); }
.cp-banks button.on { border-color:var(--brand); background:#e3eeff; color:var(--teal2); }
.cp-banks i { display:grid; place-items:center; flex:none; width:28px; height:28px; border-radius:9px; background:#fff; border:1px solid var(--line); font-style:normal; font-size:12px; font-weight:800; }

/* pay button */
.cp-paywrap { margin-top:22px; }
.cp-pay { position:relative; overflow:hidden; display:flex; align-items:center; justify-content:space-between; gap:12px; width:100%; min-height:60px; padding:0 10px 0 26px; border:0; border-radius:999px; background:var(--ink); color:#fff; font-weight:700; font-size:16.5px; box-shadow:0 20px 34px -18px rgba(11,27,58,.8); transition:transform .25s,box-shadow .25s; }
.cp-pay span { display:inline-flex; align-items:center; gap:10px; }
.cp-pay span b { font-weight:400; }
.cp-pay i { display:grid; place-items:center; flex:none; width:42px; height:42px; border-radius:50%; background:var(--lime); color:var(--teal); font-style:normal; font-size:20px; font-weight:800; transition:transform .3s; }
.cp-pay::after { content:""; position:absolute; top:0; left:-60%; width:35%; height:100%; background:linear-gradient(100deg,transparent,rgba(255,255,255,.2),transparent); transform:skewX(-20deg); animation:cpSheenBtn 3.6s ease-in-out infinite; }
.cp-pay:hover:not(:disabled) { transform:translateY(-3px); box-shadow:0 26px 40px -18px rgba(11,27,58,.85); }
.cp-pay:hover:not(:disabled) i { transform:translateX(4px); }
.cp-pay:active:not(:disabled) { transform:scale(.99); }
.cp-pay:disabled { opacity:.85; cursor:progress; }
.cp-pay.slim { width:auto; min-height:52px; font-size:15px; }
.cp-ghost { min-height:52px; padding:0 24px; border:2px solid var(--line); border-radius:999px; background:#fff; color:var(--ink); font-weight:700; transition:border-color .2s; }
.cp-ghost:hover { border-color:var(--brand); }
.cp-trust { display:flex; flex-wrap:wrap; justify-content:center; gap:4px 16px; margin:14px 0 0; padding:0; list-style:none; font-size:12.5px; font-weight:600; color:#35506c; }
.cp-trust li::before { content:"✓ "; color:var(--mint); font-weight:800; }
.cp-safe { margin-top:10px; text-align:center; font-size:12px; color:var(--muted); }

/* ===== overlays ===== */
.cp-overlay { position:fixed; inset:0; z-index:50; display:grid; place-items:center; padding:16px; overflow-y:auto; background:rgba(11,27,58,.62); backdrop-filter:blur(8px); animation:cpFade .25s both; }
.cp-ov { width:min(360px,100%); padding:28px 24px 24px; text-align:center; border-radius:28px; background:#fff; box-shadow:0 40px 80px -20px rgba(0,0,0,.5); animation:cpPop .4s cubic-bezier(.2,1.2,.4,1) both; }
.cp-ring { position:relative; display:grid; place-items:center; width:70px; height:70px; margin:0 auto 14px; }
.cp-ring i { position:absolute; inset:0; border-radius:50%; border:5px solid #e3eefc; border-top-color:var(--brand); border-right-color:var(--lime); animation:cpSpin .9s linear infinite; }
.cp-ring span { font-size:26px; }
.cp-ov h2 { font-size:21px; font-weight:800; }
.cp-ov p { margin-top:4px; font-size:13px; color:var(--muted); }
.cp-ov ul { display:grid; gap:10px; margin:18px 0 0; padding:0; list-style:none; text-align:left; }
.cp-ov li { display:flex; align-items:center; gap:10px; font-size:13.5px; font-weight:600; color:#9fb1cb; transition:color .3s; }
.cp-ov li b { display:grid; place-items:center; flex:none; width:22px; height:22px; border-radius:50%; border:2px solid #d7e5f7; font-size:11px; color:#fff; transition:all .3s; }
.cp-ov li.on { color:var(--ink); }
.cp-ov li.on b { border-color:var(--brand); border-top-color:transparent; animation:cpSpin .7s linear infinite; }
.cp-ov li.done { color:#0b7d60; }
.cp-ov li.done b { background:var(--mint); border-color:var(--mint); }

.cp-ov.upi { display:grid; grid-template-columns:1fr 250px; align-items:center; gap:clamp(16px,3vw,32px); width:min(760px,100%); padding:clamp(20px,3vw,32px); text-align:left; }
.cp-tag { display:inline-block; padding:5px 12px; border-radius:999px; background:#e3eeff; color:var(--teal2); font-size:12px; font-weight:700; }
.cp-upi-left h2 { margin:10px 0 6px; font-size:clamp(22px,2.6vw,28px); line-height:1.1; }
.cp-upi-left p { font-size:13.5px; }
.cp-upi-left p b { color:var(--ink); }
.cp-timer { position:relative; display:flex; align-items:center; gap:12px; margin:16px 0 6px; }
.cp-timer svg { width:66px; height:66px; rotate:-90deg; flex:none; }
.cp-timer circle { fill:none; stroke-width:7; }
.cp-timer .t { stroke:#e3eefc; }
.cp-timer .b { stroke:var(--brand); stroke-linecap:round; transition:stroke-dashoffset 1s linear; }
.cp-timer strong { position:absolute; left:0; width:66px; text-align:center; font-size:16px; }
.cp-timer span { font-size:12.5px; font-weight:700; color:var(--muted); }
.cp-ov.upi .cp-upi-steps { margin-top:12px; }
.cp-upi-steps li { padding:8px 12px; border-radius:12px; background:#eef4ff; }
.cp-upi-steps li.on { background:#e3eeff; }
.cp-link { margin-top:14px; padding:0; border:0; background:none; color:var(--bad); font-weight:700; text-decoration:underline; }
.cp-demo { margin-top:10px!important; font-size:11.5px!important; font-weight:700; color:#9a6b00!important; }

.cp-phone { position:relative; width:250px; height:480px; margin:auto; padding:10px; border-radius:38px; background:linear-gradient(160deg,#1c2b4a,#0b1b3a); box-shadow:0 26px 50px -20px rgba(11,27,58,.7),inset 0 0 0 2px #31456b; }
.cp-notch { position:absolute; top:15px; left:50%; translate:-50% 0; z-index:3; width:74px; height:19px; border-radius:999px; background:#0b1b3a; }
.cp-screen { height:100%; overflow:hidden; display:flex; flex-direction:column; padding:38px 14px 14px; border-radius:29px; background:linear-gradient(#f3f8ff,#fff); animation:cpFade .35s both; }
.ps-app { display:flex; align-items:center; gap:9px; font-weight:800; font-size:13.5px; color:var(--c); }
.ps-app i { display:grid; place-items:center; width:28px; height:28px; border-radius:50%; background:var(--c); color:#fff; font-style:normal; font-size:12.5px; }
.ps-card { margin-top:14px; padding:15px 13px; border-radius:20px; text-align:center; background:#fff; border:1px solid var(--line); box-shadow:0 12px 24px -16px rgba(11,27,58,.5); }
.ps-card small { display:block; font-size:11.5px; color:#7389a8; font-weight:500; }
.ps-card b { display:block; margin:2px 0; font-size:15px; }
.ps-amt { margin:4px 0; font-family:"Bricolage Grotesque",sans-serif; font-size:29px; font-weight:800; color:var(--teal2); }
.ps-row { display:flex; justify-content:space-between; gap:8px; margin-top:12px; font-size:12px; }
.ps-row span { color:#7389a8; font-weight:500; }
.ps-row b { max-width:130px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.ps-btns { display:grid; grid-template-columns:1fr 1.6fr; gap:8px; margin-top:auto; }
.ps-btns button { min-height:42px; border:0; border-radius:999px; font-weight:700; font-size:13px; }
.ps-btns .no { background:#eaf0fb; color:#5a6c69; }
.ps-btns .yes { color:#fff; background:var(--ink); }
.ps-pinhead { text-align:center; }
.ps-pinhead small { display:block; font-size:11.5px; color:#7389a8; font-weight:500; }
.ps-pinhead b { display:block; font-family:"Bricolage Grotesque",sans-serif; font-size:26px; font-weight:800; }
.ps-pinhead span { font-size:12px; font-weight:700; color:var(--muted); }
.ps-dots { display:flex; justify-content:center; gap:10px; margin:14px 0 10px; }
.ps-dots i { width:12px; height:12px; border-radius:50%; border:2px solid #b7cdee; transition:all .2s; }
.ps-dots i.on { background:var(--brand); border-color:var(--brand); transform:scale(1.15); }
.ps-keys { display:grid; grid-template-columns:repeat(3,1fr); gap:7px; margin-top:auto; }
.ps-keys button { min-height:40px; border:0; border-radius:12px; background:#eaf0fb; color:var(--ink); font-size:18px; font-weight:600; transition:background .15s,transform .1s; }
.ps-keys button:active:not(:disabled) { background:#cfe0fb; transform:scale(.94); }
.ps-keys button:disabled { visibility:hidden; }
.ps-keys button.del { background:transparent; font-size:16px; }

/* ===== success + thermal receipt ===== */
.cp-done { display:grid; justify-items:center; text-align:center; padding:clamp(20px,4vw,40px) clamp(14px,4vw,24px) 56px; min-height:100vh; background:radial-gradient(600px 360px at 50% 0%,#e3eeff,transparent 70%),var(--cream); }
.cp-done .cp-brand { margin-bottom:clamp(20px,4vw,36px); }
.cp-confetti { position:fixed; inset:0; z-index:5; pointer-events:none; overflow:hidden; }
.cp-confetti i { position:absolute; top:-14px; width:9px; height:14px; border-radius:3px; opacity:0; animation:cpConfetti linear forwards; }
.cp-tick { position:relative; width:80px; height:80px; margin-bottom:16px; animation:cpPop .5s cubic-bezier(.2,1.3,.4,1) both; }
.cp-tick > span { position:absolute; inset:0; border-radius:50%; border:3px solid rgba(18,163,127,.5); animation:cpRing 2.4s ease-out infinite; }
.cp-tick > span.r2 { animation-delay:1.2s; }
.cp-tick svg { position:relative; width:100%; height:100%; fill:none; stroke-width:3; stroke-linecap:round; stroke-linejoin:round; }
.cp-tick circle { stroke:var(--mint); fill:#e0f7ef; stroke-dasharray:152; stroke-dashoffset:152; animation:cpDraw .7s ease forwards; }
.cp-tick path { stroke:#0b7d60; stroke-dasharray:44; stroke-dashoffset:44; animation:cpDraw .5s .6s ease forwards; }
.cp-done h1 { font-size:clamp(26px,4vw,38px); font-weight:800; animation:cpRise .6s .35s both; }
.cp-lead { margin:6px auto 0; max-width:480px; color:var(--muted); font-size:14.5px; animation:cpRise .6s .4s both; }

.cp-receipt { position:relative; width:min(400px,100%); margin:26px auto 14px; padding:22px 22px 18px; text-align:left; background:#fff; font-family:"DM Mono",ui-monospace,monospace; font-size:12.5px; color:#1b2a4a; filter:drop-shadow(0 24px 24px rgba(11,27,58,.16)); transform-origin:50% 0; animation:cpPrint 1s .5s cubic-bezier(.2,1,.3,1) both; }
.cp-receipt::after { content:""; position:absolute; left:0; right:0; top:100%; height:8px; background:conic-gradient(from 135deg at top,#fff 90deg,#0000 0) 0/16px 8px; }
.cp-rc-top { display:grid; justify-items:center; gap:2px; text-align:center; }
.cp-rc-top b { font-family:"Bricolage Grotesque",sans-serif; font-size:17px; letter-spacing:3px; }
.cp-rc-top small { font-size:11px; letter-spacing:3px; color:#7389a8; }
.cp-stamp { position:absolute; top:58px; right:18px; padding:2px 10px; border:3px solid var(--mint); border-radius:8px; color:var(--mint); font-family:"Bricolage Grotesque",sans-serif; font-weight:800; font-size:17px; letter-spacing:2px; opacity:.85; animation:cpStamp .5s 1.4s cubic-bezier(.2,1.6,.4,1) both; }
.cp-dash { margin:14px 0; border-top:2px dashed #cfdcee; }
.cp-receipt dl { display:grid; gap:7px; margin:0; }
.cp-receipt dl div { display:flex; justify-content:space-between; gap:14px; }
.cp-receipt dt { color:#7389a8; flex:none; }
.cp-receipt dd { margin:0; text-align:right; overflow-wrap:anywhere; font-weight:500; }
.cp-receipt .tot { margin-top:4px; padding-top:9px; border-top:2px solid #1b2a4a; font-size:15px; font-weight:500; }
.cp-receipt .tot dt { color:#1b2a4a; font-weight:500; }
.cp-receipt .tot dd { font-weight:500; }
.cp-thanks { text-align:center; font-size:11.5px; letter-spacing:.5px; color:#7389a8; }
.cp-actions { display:flex; flex-wrap:wrap; justify-content:center; gap:12px; margin-top:26px; animation:cpRise .7s .9s both; }

@keyframes cpPrint { 0% { opacity:0; transform:translateY(-60px) scaleY(.6); } 100% { opacity:1; transform:none; } }
@keyframes cpRise { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
@keyframes cpFade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
@keyframes cpPop { from { opacity:0; transform:scale(.85); } to { opacity:1; transform:none; } }
@keyframes cpStamp { from { opacity:0; transform:scale(2.4) rotate(-14deg); } to { opacity:.85; transform:rotate(-8deg); } }
@keyframes cpSpin { to { transform:rotate(360deg); } }
@keyframes cpDraw { to { stroke-dashoffset:0; } }
@keyframes cpShake { 0%,100% { transform:none; } 25% { transform:translateX(-5px); } 75% { transform:translateX(5px); } }
@keyframes cpSheen { 0%,40% { left:-60%; } 100% { left:140%; } }
@keyframes cpSheenBtn { 0%,50% { left:-60%; } 100% { left:140%; } }
@keyframes cpRing { 0% { transform:scale(.8); opacity:.9; } 100% { transform:scale(1.7); opacity:0; } }
@keyframes cpTrack { 0% { transform:translateX(-100%); } 100% { transform:translateX(190%); } }
@keyframes cpConfetti { 0% { opacity:1; transform:translate(0,0) rotate(0); } 100% { opacity:0; transform:translate(var(--dx),105vh) rotate(720deg); } }

/* ===== responsive ===== */
@media (max-width:980px) {
  .cp-split { grid-template-columns:1fr; }
  .cp-side { position:relative; height:auto; }
  .cp-side-in { max-width:none; height:auto; margin:0; padding:20px clamp(16px,4vw,32px) 26px; overflow:visible; }
  .cp-mark { font-size:150px; right:-10px; bottom:-20px; }
  .cp-eyebrow { margin-top:22px; }
  .cp-big strong { font-size:clamp(42px,11vw,64px); letter-spacing:-1.5px; }
  .cp-big strong::after { margin-top:10px; }
  .cp-det-toggle { display:inline-flex; align-items:center; gap:8px; margin-top:16px; padding:8px 16px; border:1px solid rgba(255,255,255,.25); border-radius:999px; background:rgba(255,255,255,.08); color:#fff; font-weight:600; font-size:13px; align-self:flex-start; }
  .cp-det-toggle span { transition:transform .3s; }
  .cp-det-toggle[aria-expanded="true"] span { transform:rotate(180deg); }
  .cp-det { display:none; margin-top:18px; }
  .cp-det.open { display:block; animation:cpFade .3s both; }
  .cp-main { justify-content:center; padding:24px clamp(14px,4vw,32px) 0; }
  .cp-main-in { max-width:640px; }
  .cp-paywrap { position:sticky; bottom:0; z-index:10; margin:22px calc(-1 * clamp(14px,4vw,32px)) 0; padding:14px clamp(14px,4vw,32px) max(12px,env(safe-area-inset-bottom)); background:linear-gradient(to top,var(--cream) 78%,rgba(243,248,255,0)); }
  .cp-trust { margin-top:10px; }
  .cp-safe { padding-bottom:22px; }
  .cp-ov.upi { grid-template-columns:1fr; }
  .cp-phone { order:-1; width:230px; height:440px; }
}
@media (max-width:600px) {
  .cp-brand b { display:none; }
  .cp-main h1 { font-size:26px; }
  .cp-opt-h { padding:14px; gap:10px; }
  .cp-opt-ic { width:38px; height:38px; font-size:18px; }
  .cp-opt-t small { display:none; }
  .cp-pad { padding:2px 14px 18px; }
  .cp-fields,.cp-banks,.cp-flow { grid-template-columns:1fr; }
  .cp-pay { min-height:56px; font-size:15.5px; }
  .cp-stamp { top:54px; right:12px; font-size:15px; }
  .cp-actions .cp-pay,.cp-actions .cp-ghost { width:100%; }
}
@media (min-width:981px) and (max-height:700px) {
  .cp-eyebrow { margin-top:24px; }
  .cp-det { margin-top:18px; }
}

@media print {
  .cp-brand,.cp-actions,.cp-tick,.cp-confetti,.cp-done h1,.cp-done .cp-lead { display:none!important; }
  .cp-done { background:#fff; min-height:0; }
  .cp-receipt { filter:none; animation:none; box-shadow:none; border:1px solid #ccc; }
}
@media (prefers-reduced-motion:reduce) {
  .cp *,.cp *::before,.cp *::after { animation-duration:.001s!important; animation-iteration-count:1!important; transition-duration:.001s!important; }
  .cp-tick circle,.cp-tick path { stroke-dashoffset:0; }
  .cp-confetti { display:none; }
}

/* ===== website theme + left panel alignment ===== */
.cp { background:radial-gradient(800px 420px at 95% 0%,rgba(25,179,230,.22),transparent 70%),radial-gradient(700px 420px at 0% 30%,rgba(21,88,214,.14),transparent 70%),#f3f8ff; }
.cp-side { background:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.5px) 0 0/20px 20px,radial-gradient(520px 320px at 100% 0%,color-mix(in srgb,var(--accent) 42%,transparent),transparent 70%),linear-gradient(145deg,#0b2a78,#1558d6 58%,#19b3e6); }
.cp-logo { background:#fff; }
.cp-big-sub em { color:#0b2a78; }
.cp-pay { background:linear-gradient(100deg,#0f48c2,#1558d6 55%,#19b3e6); box-shadow:0 18px 32px -14px rgba(21,88,214,.8); }
.cp-pay:hover:not(:disabled) { box-shadow:0 24px 38px -14px rgba(21,88,214,.85); }
.cp-pay i { background:#fff; color:var(--brand); }
.cp-main { position:relative; overflow:hidden; }
.cp-main-in { position:relative; z-index:1; }
.cp-bg { position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
.cp-bg i { position:absolute; border-radius:50%; filter:blur(60px); opacity:.45; animation:cpFloat 16s ease-in-out infinite; }
.cp-bg i:nth-child(1) { width:300px; height:300px; top:6%; right:-80px; background:#bcd8ff; }
.cp-bg i:nth-child(2) { width:260px; height:260px; bottom:4%; left:-60px; background:#b6ecff; animation-delay:-6s; }
.cp-bg s { position:absolute; bottom:-70px; display:grid; place-items:center; width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,.75); border:1px solid #cfe0fb; color:var(--brand); font-weight:800; font-size:15px; text-decoration:none; animation:cpUp 16s linear infinite; }
.cp-bg s:nth-child(3) { left:8%; }
.cp-bg s:nth-child(4) { left:55%; width:30px; height:30px; animation-delay:-6s; animation-duration:19s; }
.cp-bg s:nth-child(5) { left:88%; animation-delay:-11s; animation-duration:21s; }
@keyframes cpFloat { 0%,100% { transform:translate(0,0); } 50% { transform:translate(26px,-36px); } }
@keyframes cpUp { 0% { transform:translateY(0) rotate(0); opacity:0; } 10% { opacity:1; } 90% { opacity:1; } 100% { transform:translateY(-115vh) rotate(180deg); opacity:0; } }

/* left panel: one column, every block left-aligned on the same edge */
.cp-side-in { width:100%; max-width:540px; margin-inline:auto; padding:clamp(26px,4vw,48px) clamp(24px,4vw,44px); align-items:stretch; }
.cp-eyebrow { margin-top:auto; }
.cp-big { margin-top:18px; }
.cp-det { display:grid; gap:22px; margin:30px 0 auto; }
.cp-who { margin:0; }
.cp-lines { margin:0; padding-top:22px; border-top:1px solid rgba(255,255,255,.16); }
.cp-feat { display:grid; gap:10px; margin:0; padding-top:22px; border-top:1px solid rgba(255,255,255,.16); }
.cp-feat li { display:flex; align-items:flex-start; gap:10px; padding:0; border:0; background:none; font-size:13.5px; }
.cp-feat li::before { content:"✓"; display:grid; place-items:center; flex:none; width:20px; height:20px; margin-top:1px; border-radius:50%; background:rgba(255,255,255,.2); color:#fff; font-size:10px; font-weight:900; }
.cp-valid { margin:0; padding-top:22px; border-top:1px solid rgba(255,255,255,.16); }
.cp-note { margin:-8px 0 0; }
.cp-done { background:radial-gradient(800px 420px at 95% 0%,rgba(25,179,230,.22),transparent 70%),radial-gradient(700px 420px at 0% 30%,rgba(21,88,214,.14),transparent 70%),#f3f8ff; }
@media (max-width:980px) {
  .cp-side-in { max-width:none; padding:20px clamp(16px,4vw,32px) 26px; }
  .cp-eyebrow { margin-top:22px; }
  .cp-det { display:none; margin:18px 0 0; }
  .cp-det.open { display:grid; }
}

/* UPI QR scan button and camera modal */
.cp-upi-inputwrap { position:relative; }
.cp-upi-inputwrap input { padding-right:48px!important; }
.cp-qr-btn { position:absolute; right:8px; top:50%; transform:translateY(-50%); display:grid; place-items:center; width:34px; height:34px; border:0; border-radius:8px; background:transparent; color:#1558d6; cursor:pointer; }
.cp-qr-btn:hover { background:#eaf3ff; }
.cp-qr-btn:disabled { opacity:.45; cursor:not-allowed; }
.cp-qr-btn svg { width:21px; height:21px; fill:none; stroke:currentColor; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
.cp-qr-overlay { position:fixed; inset:0; z-index:9999; display:grid; place-items:center; padding:20px; background:rgba(3,20,43,.72); backdrop-filter:blur(8px); }
.cp-qr-modal { position:relative; width:min(100%,420px); padding:28px; border:1px solid #dce8f7; border-radius:22px; background:#fff; box-shadow:0 24px 80px rgba(0,0,0,.28); text-align:center; }
.cp-qr-modal h2 { margin:8px 0!important; font-size:24px; }
.cp-qr-modal p { color:#52698a; font-size:13px; }
.cp-qr-close { position:absolute; top:12px; right:14px; width:34px; height:34px; border:0; border-radius:50%; background:#f1f6fc; color:#153b63; font-size:25px; cursor:pointer; }
.cp-qr-symbol { display:grid; place-items:center; width:48px; height:48px; margin:0 auto; border-radius:14px; background:#eaf3ff; color:#1558d6; font-size:30px; }
.cp-qr-camera { position:relative; overflow:hidden; width:100%; aspect-ratio:1; margin:20px auto 14px; border-radius:16px; background:#071b2d; }
.cp-qr-camera video { display:block; width:100%; height:100%; object-fit:cover; }
.cp-qr-frame { position:absolute; inset:18%; border:3px solid #54d6ff; border-radius:18px; box-shadow:0 0 0 999px rgba(0,0,0,.12); pointer-events:none; }
.cp-qr-message { margin:10px 0!important; color:#c6283d!important; }
.cp-qr-cancel { width:100%; padding:12px 16px; border:0; border-radius:12px; background:#1558d6; color:white; font:inherit; font-weight:800; cursor:pointer; }
.cp-qr-modal small { display:block; margin-top:12px; color:#71829a; font-size:11px; }
@media (max-width:480px) { .cp-qr-modal { padding:22px 18px; } }
`;
