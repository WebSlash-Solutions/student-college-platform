import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/* COLLEGE PAYMENT PAGE  (route: /college/payment?plan=gold&period=6m)

   - Not logged in        -> sent to login, then brought back here.
   - Wrong / missing plan -> sent back to the plans page.
   - Checkout: order summary + UPI / Card (live card preview) / Net Banking.
   - UPI flow (collect request): enter UPI ID -> "Pay" -> request is sent -> phone screen with
     timer -> approve -> enter UPI PIN -> processing -> success + receipt.
   - Fixed: headings ("Complete your payment", "Order summary") were white on white. They now have
     an explicit dark colour / gradient, so the global h1/h2 colour cannot hide them.

   IMPORTANT: the payment below is a DEMO (no real money moves, any 6 digits work as PIN).
   For real money, replace finish() with:
     1. POST /api/payments/create-order  { plan, period }   (backend decides the amount, JWT required)
     2. open Razorpay / PayU / Cashfree checkout (UPI collect / intent) with the returned order id
     3. POST /api/payments/verify        (backend verifies the signature, then activates the plan)
   Never trust the amount or the "success" coming from the browser. */

const SESSION_KEY = "campusconnect_college_session";
const AFTER_LOGIN_KEY = "campusconnect_after_login";

const PLANS = {
  elite: { name: "Elite", icon: "🥈", accent: "#64748b", monthly: 999, features: ["College listing in search", "Browse all student lead previews", "Email support"] },
  gold: { name: "Gold", icon: "🥇", accent: "#f59e0b", monthly: 1999, features: ["Featured badge on college profile", "Priority in district search", "Lead export (CSV)"] },
  diamond: { name: "Diamond", icon: "💎", accent: "#8b5cf6", monthly: 3999, features: ["Top placement in search results", "Dedicated account manager", "Admission campaign support"] },
};
const PERIODS = { "1m": ["1 Month", 1, 0], "6m": ["6 Months", 6, 10], "12m": ["1 Year", 12, 20] };
const GST = 18;

const METHODS = [
  ["upi", "UPI", "⚡"],
  ["card", "Card", "💳"],
  ["net", "Net banking", "🏦"],
];
const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Indian Overseas Bank", "Canara Bank", "Bank of Baroda", "Kotak Mahindra Bank"];
const UPI_APPS = [["Google Pay", "@okaxis", "#1a73e8"], ["PhonePe", "@ybl", "#5f259f"], ["Paytm", "@paytm", "#00b9f1"], ["BHIM", "@upi", "#f26522"]];
const PROCESS_STEPS = ["Contacting your bank…", "Verifying payment securely…", "Activating your plan…"];
const CONFETTI_COLORS = ["#1558d6", "#19b3e6", "#10b981", "#f5b301", "#ff6b81", "#8b5cf6"];
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

const rupee = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const rupee2 = (n) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const mmss = (s) => `${String(Math.floor(Math.max(s, 0) / 60)).padStart(2, "0")}:${String(Math.max(s, 0) % 60).padStart(2, "0")}`;

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) || {};
    } catch {
      return {};
    }
  } catch {
    return null;
  }
}

function cardBrand(no) {
  const d = no.replace(/\s/g, "");
  if (d.startsWith("4")) return "VISA";
  if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return "Mastercard";
  if (/^(60|65|81|82|508)/.test(d)) return "RuPay";
  return "CARD";
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
  const [upiStep, setUpiStep] = useState("req"); // req | pin
  const [pin, setPin] = useState("");

  const confetti = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: Math.round(Math.random() * 100),
        delay: (Math.random() * 0.8).toFixed(2),
        dur: (2.4 + Math.random() * 1.8).toFixed(2),
        drift: Math.round(Math.random() * 140 - 70),
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    []
  );

  /* guards */
  useEffect(() => {
    if (!session) {
      try {
        sessionStorage.setItem(AFTER_LOGIN_KEY, `/college/payment?plan=${planId}&period=${periodId}`);
      } catch {
        /* ignore */
      }
      navigate("/college/register?mode=login", { replace: true });
    } else if (!valid) {
      navigate("/college/home?view=plans", { replace: true });
    }
  }, [session, valid, navigate, planId, periodId]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage === "done"]);

  /* processing steps animation (demo) */
  useEffect(() => {
    if (stage !== "processing") return undefined;
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [stage]);

  /* UPI collect request: 5 minute countdown */
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

  if (!session || !valid) return null;

  const plan = PLANS[planId];
  const [periodLabel, months, off] = PERIODS[periodId];
  const full = plan.monthly * months;
  const discount = (full * off) / 100;
  const total = full - discount;
  const taxable = total / (1 + GST / 100);
  const gstAmt = total - taxable;
  const collegeName = session.collegeName || session.name || "Your college";
  const email = session.email || "";
  const busy = stage !== "pay";
  const upiApp = UPI_APPS.find(([, h]) => upi.trim().endsWith(h));
  const upiOk = /^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upi.trim());

  /* ---------- validation ---------- */
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

  /* ---------- final step (DEMO) ---------- */
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
    if (method === "upi") setStage("upi"); // collect request goes to the UPI app first
    else finish();
  };

  const pressKey = (k) => {
    if (k === "del") {
      setPin((p) => p.slice(0, -1));
      return;
    }
    if (!k || pin.length >= 6) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 6) setTimeout(finish, 450);
  };

  const cancelUpi = () => {
    setStage("pay");
    setPin("");
  };

  const pickMethod = (id) => {
    if (busy) return;
    setMethod(id);
    setErrors({});
    setFlip(false);
  };

  const pickUpiApp = (handle) => {
    if (busy) return;
    setUpi((v) => `${v.split("@")[0]}${handle}`);
    setErrors({});
  };

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

  const onEnter = (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") payNow();
  };

  const steps = ["Choose plan", "Payment", "Done"];
  const cur = stage === "done" ? 2 : 1;
  const cardNoShown = (card.no + "•••• •••• •••• ••••".slice(card.no.length + Math.floor(card.no.length / 4))).slice(0, 19);
  const ringPct = Math.max(secs, 0) / 300;

  return (
    <div className="pay" style={{ "--accent": plan.accent }}>
      <style>{css}</style>

      <div className="pay-bg" aria-hidden="true">
        <i /><i /><i /><i />
      </div>

      <header className="pay-top">
        <div className="pay-wrap pay-top-in">
          <button className="pay-brand" onClick={() => navigate("/college/home")} aria-label="CampusConnect home" disabled={busy}>
            <span className="pay-logo">CC</span>
            <strong>CampusConnect</strong>
          </button>
          <ol className="pay-steps" aria-label="Checkout progress">
            {steps.map((t, i) => (
              <li key={t} className={i < cur ? "done" : i === cur ? "on" : ""}>
                <b>{i < cur ? "✓" : i + 1}</b>
                <span>{t}</span>
              </li>
            ))}
          </ol>
          <span className="pay-secure">🔒 256-bit secure</span>
        </div>
      </header>

      {stage === "done" ? (
        /* ================= SUCCESS + RECEIPT ================= */
        <main className="pay-wrap pay-done">
          <div className="pay-confetti" aria-hidden="true">
            {confetti.map((c, i) => (
              <i key={i} style={{ left: `${c.left}%`, background: c.color, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s`, "--dx": `${c.drift}px` }} />
            ))}
          </div>

          <div className="pay-tick" aria-hidden="true">
            <span className="pay-tick-ring" /><span className="pay-tick-ring r2" />
            <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M14 27l8 8 16-17" /></svg>
          </div>
          <h1>Payment <span className="pay-grad">successful</span></h1>
          <p className="pay-lead">
            Your {plan.name} plan for {periodLabel.toLowerCase()} is now active.
            {email && <> A receipt has been sent to <b>{email}</b>.</>}
          </p>

          <section className="pay-receipt" aria-label="Receipt">
            <div className="pay-rc-head">
              <div>
                <small>Receipt number</small>
                <b>{receipt.id}</b>
              </div>
              <div className="r">
                <small>Paid on</small>
                <b>{receipt.date}</b>
              </div>
            </div>
            <div className="pay-rc-plan">
              <span>{plan.icon}</span>
              <div>
                <b>{plan.name} plan · {periodLabel}</b>
                <small>Valid {receipt.valid}</small>
              </div>
              <em>PAID</em>
            </div>
            <dl>
              <div><dt>College</dt><dd>{collegeName}</dd></div>
              <div><dt>Payment method</dt><dd>{receipt.method}</dd></div>
              <div><dt>Amount (excl. GST)</dt><dd>{rupee2(taxable)}</dd></div>
              <div><dt>GST @ {GST}%</dt><dd>{rupee2(gstAmt)}</dd></div>
              <div className="tot"><dt>Total paid</dt><dd>{rupee2(total)}</dd></div>
            </dl>
          </section>

          <div className="pay-actions">
            <button className="pay-btn" onClick={() => navigate("/college/dashboard")}>Go to dashboard →</button>
            <button className="pay-btn ghost" onClick={() => window.print()}>Print / save receipt</button>
          </div>
        </main>
      ) : (
        /* ================= CHECKOUT ================= */
        <main className="pay-wrap pay-grid">
          <section className="pay-main" aria-label="Payment details" onKeyDown={onEnter}>
            <button className="pay-back" onClick={() => navigate("/college/home?view=plans")} disabled={busy}>
              ← Change plan
            </button>
            <h1>Complete your <span className="pay-grad">payment</span></h1>
            <p className="pay-lead">Choose how you want to pay. Your plan starts as soon as the payment is confirmed.</p>

            <div className="pay-tabs" role="tablist" aria-label="Payment method" style={{ "--i": METHODS.findIndex(([id]) => id === method) }}>
              {METHODS.map(([id, t, ic]) => (
                <button key={id} role="tab" aria-selected={method === id} className={method === id ? "on" : ""} onClick={() => pickMethod(id)} disabled={busy}>
                  <span aria-hidden="true">{ic}</span> {t}
                </button>
              ))}
            </div>

            <div className="pay-panel" role="tabpanel" key={method}>
              {method === "upi" && (
                <>
                  <p className="pay-mini">Pay with any UPI app</p>
                  <div className="pay-chips">
                    {UPI_APPS.map(([a, h, c]) => (
                      <button key={a} type="button" className={upi.endsWith(h) ? "on" : ""} onClick={() => pickUpiApp(h)} style={{ "--c": c }}>
                        <i>{a[0]}</i>{a}
                      </button>
                    ))}
                  </div>
                  <label className={`${errors.upi ? "bad" : ""} ${upiOk ? "good" : ""}`}>
                    UPI ID
                    <span className="pay-inwrap">
                      <input value={upi} onChange={(e) => { setUpi(e.target.value); setErrors({}); }} placeholder="name@okhdfcbank" autoComplete="off" inputMode="email" disabled={busy} />
                      {upiOk && <b className="pay-okmark" aria-hidden="true">✓</b>}
                    </span>
                    {errors.upi && <em>{errors.upi}</em>}
                    {upiOk && !errors.upi && <span className="pay-valid">✓ UPI ID looks good{upiApp ? ` · ${upiApp[0]}` : ""}</span>}
                  </label>
                  <div className="pay-flow">
                    <span><b>1</b>Click Pay</span><i />
                    <span><b>2</b>Request reaches your UPI app</span><i />
                    <span><b>3</b>Approve with UPI PIN</span>
                  </div>
                </>
              )}

              {method === "card" && (
                <>
                  <div className={`pay-card ${flip ? "flip" : ""}`} aria-hidden="true">
                    <div className="pay-card-in">
                      <div className="pay-face front">
                        <div className="pc-top"><span className="pc-chip" /><b>{cardBrand(card.no)}</b></div>
                        <div className="pc-no">{cardNoShown}</div>
                        <div className="pc-bot">
                          <div><small>Card holder</small><span>{card.name.trim() || "YOUR NAME"}</span></div>
                          <div><small>Expires</small><span>{card.exp || "MM/YY"}</span></div>
                        </div>
                      </div>
                      <div className="pay-face back">
                        <div className="pc-strip" />
                        <div className="pc-cvv"><small>CVV</small><span>{card.cvv ? "•".repeat(card.cvv.length) : "•••"}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="pay-fields">
                    <label className={`full ${errors.no ? "bad" : ""}`}>
                      Card number
                      <input value={card.no} onChange={setC("no")} placeholder="1234 5678 9012 3456" inputMode="numeric" autoComplete="cc-number" disabled={busy} />
                      {errors.no && <em>{errors.no}</em>}
                    </label>
                    <label className={`full ${errors.name ? "bad" : ""}`}>
                      Name on card
                      <input value={card.name} onChange={setC("name")} placeholder="As printed on the card" autoComplete="cc-name" disabled={busy} />
                      {errors.name && <em>{errors.name}</em>}
                    </label>
                    <label className={errors.exp ? "bad" : ""}>
                      Expiry
                      <input value={card.exp} onChange={setC("exp")} placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" disabled={busy} />
                      {errors.exp && <em>{errors.exp}</em>}
                    </label>
                    <label className={errors.cvv ? "bad" : ""}>
                      CVV
                      <input value={card.cvv} onChange={setC("cvv")} onFocus={() => setFlip(true)} onBlur={() => setFlip(false)} placeholder="•••" inputMode="numeric" type="password" autoComplete="cc-csc" disabled={busy} />
                      {errors.cvv && <em>{errors.cvv}</em>}
                    </label>
                  </div>
                </>
              )}

              {method === "net" && (
                <>
                  <div className="pay-banks">
                    {BANKS.map((b) => (
                      <button key={b} type="button" className={bank === b ? "on" : ""} onClick={() => { setBank(b); setErrors({}); }} disabled={busy}>
                        <i>{b[0]}</i>
                        {b}
                      </button>
                    ))}
                  </div>
                  {errors.bank && <em className="pay-err">{errors.bank}</em>}
                  <p className="pay-hint">You will be taken to your bank's secure page to finish the payment.</p>
                </>
              )}
            </div>

            <button className="pay-btn big" onClick={payNow} disabled={busy}>
              <span aria-hidden="true">🔒</span> Pay {rupee(total)} securely
            </button>

            <ul className="pay-trust" aria-label="Security assurances">
              <li>🔒 Encrypted payment</li>
              <li>🛡️ Server-verified</li>
              <li>🧾 Instant receipt</li>
            </ul>
            <p className="pay-safe">We never store your card details. Your plan is activated only after the payment is verified by our server.</p>
          </section>

          {/* ---------- order summary ---------- */}
          <aside className="pay-side" aria-label="Order summary">
            <h2>Order summary</h2>
            <div className="pay-plan">
              <span>{plan.icon}</span>
              <div>
                <b>{plan.name} plan</b>
                <small>{periodLabel} · {collegeName}</small>
              </div>
              {off > 0 && <em>Save {off}%</em>}
            </div>
            <ul className="pay-feat">
              {planId !== "elite" && <li>Everything in {planId === "gold" ? "Elite" : "Gold"}</li>}
              {plan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>

            <dl className="pay-lines">
              <div><dt>{plan.name} × {months} {months === 1 ? "month" : "months"}</dt><dd>{rupee(full)}</dd></div>
              {off > 0 && <div className="save"><dt>{off}% duration discount</dt><dd>− {rupee(discount)}</dd></div>}
              <div className="mut"><dt>Price excluding GST</dt><dd>{rupee2(taxable)}</dd></div>
              <div className="mut"><dt>GST @ {GST}%</dt><dd>{rupee2(gstAmt)}</dd></div>
            </dl>
            {discount > 0 && <div className="pay-saved">🎉 You are saving {rupee(discount)} on this plan</div>}
            <div className="pay-total">
              <span>Total to pay</span>
              <strong>{rupee(total)}</strong>
            </div>
            <p className="pay-note">Prices include GST. Student lead unlocks are charged separately at ₹100 per lead.</p>
          </aside>
        </main>
      )}

      {/* ---------- UPI request + approve (phone) ---------- */}
      {stage === "upi" && (
        <div className="pay-overlay" role="dialog" aria-modal="true" aria-label="Approve UPI payment">
          <div className="pay-ov-card upi">
            <div className="pay-upi-left">
              <span className="pay-upi-tag">⚡ UPI payment request</span>
              <h2>Approve on your <span className="pay-grad">UPI app</span></h2>
              <p>We sent a request of <b>{rupee(total)}</b> to <b>{upi.trim()}</b>. Open your UPI app and approve it.</p>

              <div className="pay-timer">
                <svg viewBox="0 0 80 80" aria-hidden="true">
                  <circle className="t" cx="40" cy="40" r="34" />
                  <circle className="b" cx="40" cy="40" r="34" style={{ strokeDasharray: 214, strokeDashoffset: 214 * (1 - ringPct) }} />
                </svg>
                <strong>{mmss(secs)}</strong>
                <span>Request valid for</span>
              </div>

              <ul className="pay-upi-steps">
                <li className="done"><b>✓</b>Request sent to your UPI app</li>
                <li className={upiStep === "req" ? "on" : "done"}><b>{upiStep === "req" ? "" : "✓"}</b>Open the request and tap Pay</li>
                <li className={upiStep === "pin" ? "on" : ""}><b></b>Enter your UPI PIN</li>
              </ul>
              <button className="pay-linkbtn" onClick={cancelUpi}>Cancel payment</button>
              <p className="pay-demo">DEMO · no real money moves. Any 6 digits work as PIN.</p>
            </div>

            <div className="pay-phone" aria-label="UPI app preview">
              <span className="pay-notch" />
              <div className="pay-screen" key={upiStep}>
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

      {/* ---------- processing overlay ---------- */}
      {stage === "processing" && (
        <div className="pay-overlay" role="status" aria-live="polite">
          <div className="pay-ov-card">
            <div className="pay-ring"><i /><span>🔒</span></div>
            <h2>Processing payment</h2>
            <p>Please don't close or refresh this page.</p>
            <ul>
              {PROCESS_STEPS.map((s, i) => (
                <li key={s} className={i < phase ? "done" : i === phase ? "on" : ""}>
                  <b>{i < phase ? "✓" : ""}</b>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");
@property --pang { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
body { margin:0!important; display:block!important; background:#f5f8ff!important; }
#root { width:100%!important; max-width:none!important; margin:0!important; padding:0!important; border:0!important; text-align:left!important; display:block!important; }
.pay { --ink:#0b1b3a; --blue:#1558d6; --sky:#19b3e6; --muted:#52698a; --line:#dce8f7; position:relative; min-height:100vh; overflow-x:hidden; color:var(--ink); font-family:"Plus Jakarta Sans",system-ui,sans-serif; font-size:16px; line-height:1.5; background:radial-gradient(900px 480px at 92% 0%,rgba(25,179,230,.2),transparent 70%),radial-gradient(800px 460px at 0% 12%,rgba(21,88,214,.15),transparent 70%),radial-gradient(700px 400px at 50% 100%,rgba(139,92,246,.12),transparent 70%),#f5f8ff; }
.pay * { box-sizing:border-box; }
.pay h1,.pay h2,.pay h3,.pay p { margin:0; }
/* FIX: explicit colour so a global white h1/h2 colour can never make the headings invisible */
.pay h1,.pay h2,.pay h3 { color:var(--ink)!important; -webkit-text-fill-color:currentColor; font-family:"Bricolage Grotesque","Plus Jakarta Sans",sans-serif; }
.pay strong { font-family:"Bricolage Grotesque","Plus Jakarta Sans",sans-serif; }
.pay .pay-grad { background:linear-gradient(90deg,#1349c2,#19b3e6,#8b5cf6,#1349c2); background-size:250% 100%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent!important; animation:payGrad 6s linear infinite; }
.pay button { font:inherit; cursor:pointer; }
.pay button:focus-visible,.pay input:focus-visible { outline:3px solid rgba(21,88,214,.45); outline-offset:2px; }
.pay-wrap { position:relative; z-index:1; width:100%; max-width:1180px; margin:0 auto; padding-inline:clamp(16px,3vw,32px); }

/* floating background */
.pay-bg { position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
.pay-bg i { position:absolute; border-radius:50%; filter:blur(60px); opacity:.5; animation:payFloat 14s ease-in-out infinite; }
.pay-bg i:nth-child(1) { width:360px; height:360px; top:8%; left:-90px; background:#bcd8ff; }
.pay-bg i:nth-child(2) { width:320px; height:320px; top:46%; right:-80px; background:#b6ecff; animation-delay:-5s; }
.pay-bg i:nth-child(3) { width:280px; height:280px; bottom:-60px; left:38%; background:#d9ccff; animation-delay:-9s; }
.pay-bg i:nth-child(4) { width:200px; height:200px; top:20%; left:48%; background:#ffe3b8; animation-delay:-3s; opacity:.35; }

/* header */
.pay-top { position:sticky; top:0; z-index:20; background:rgba(255,255,255,.88); backdrop-filter:blur(14px); border-bottom:1px solid var(--line); }
.pay-top-in { display:flex; align-items:center; justify-content:space-between; gap:16px; height:68px; }
.pay-brand { display:flex; align-items:center; gap:10px; border:0; background:none; padding:0; color:#0f2a5c; }
.pay-brand:disabled { cursor:not-allowed; }
.pay-brand strong { font-size:20px; font-weight:800; letter-spacing:-.3px; color:#0f2a5c; }
.pay-logo { display:grid; place-items:center; width:40px; height:40px; border-radius:50% 50% 50% 14%; color:#fff; font-weight:800; font-size:15px; background:linear-gradient(135deg,#1458d8,#19b3e6); box-shadow:0 8px 18px rgba(21,88,214,.3); }
.pay-steps { display:flex; align-items:center; gap:6px; margin:0; padding:0; list-style:none; }
.pay-steps li { display:flex; align-items:center; gap:8px; padding:6px 14px 6px 6px; border-radius:999px; font-size:14px; font-weight:700; color:#8196b3; transition:background .3s,color .3s; }
.pay-steps li + li::before { content:""; width:22px; height:2px; margin-right:6px; margin-left:-8px; background:#cfe0fb; }
.pay-steps b { display:grid; place-items:center; width:24px; height:24px; border-radius:50%; background:#e6eefb; font-size:12px; transition:background .3s,color .3s; }
.pay-steps li.on { color:var(--blue); background:#e6f0ff; }
.pay-steps li.on b { background:var(--blue); color:#fff; animation:payPulse 2s ease-out infinite; }
.pay-steps li.done { color:#0b7a4f; }
.pay-steps li.done b { background:#10b981; color:#fff; }
.pay-secure { font-size:14px; font-weight:700; color:#0b7a4f; white-space:nowrap; }

/* layout */
.pay-grid { display:grid; grid-template-columns:minmax(0,1.35fr) minmax(0,1fr); gap:clamp(20px,3vw,44px); align-items:start; padding-block:clamp(24px,4vw,48px) 64px; }
.pay-main,.pay-side { animation:payRise .6s cubic-bezier(.2,.8,.2,1) both; }
.pay-side { animation-delay:.12s; }
.pay-main { position:relative; overflow:hidden; padding:clamp(22px,3vw,38px); border-radius:36px 36px 36px 12px; background:rgba(255,255,255,.96); border:1px solid var(--line); box-shadow:0 30px 60px -30px rgba(21,60,140,.4); }
.pay-main::before { content:""; position:absolute; top:0; left:0; right:0; height:6px; background:linear-gradient(90deg,#1458d8,#19b3e6,#8b5cf6,#ffc83d,#1458d8); background-size:300% 100%; animation:payGrad 5s linear infinite; }
.pay-back { margin-bottom:14px; padding:0; border:0; background:none; color:var(--blue); font-weight:700; font-size:15px; transition:transform .2s; }
.pay-back:hover:not(:disabled) { transform:translateX(-4px); }
.pay-back:disabled { opacity:.5; cursor:not-allowed; }
.pay h1 { font-size:clamp(28px,3.2vw,40px); font-weight:800; letter-spacing:-.8px; line-height:1.1; }
.pay-lead { margin-top:8px; max-width:520px; color:var(--muted); }

/* tabs with sliding indicator */
.pay-tabs { position:relative; display:grid; grid-template-columns:repeat(3,1fr); margin:26px 0 22px; padding:6px; border-radius:999px; background:#eaf1fd; }
.pay-tabs::before { content:""; position:absolute; top:6px; bottom:6px; left:6px; width:calc((100% - 12px) / 3); border-radius:999px; background:#fff; box-shadow:0 8px 18px -8px rgba(21,60,140,.45); transform:translateX(calc(var(--i) * 100%)); transition:transform .35s cubic-bezier(.3,1.2,.4,1); }
.pay-tabs button { position:relative; min-height:46px; border:0; border-radius:999px; background:none; color:#47608a; font-weight:700; font-size:15px; transition:color .25s; }
.pay-tabs button.on { color:var(--blue); }
.pay-tabs button:disabled { cursor:not-allowed; }
.pay-panel { min-height:214px; animation:payFade .35s ease both; }
.pay-mini { margin-bottom:10px; font-size:13px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase; color:#6d86a6; }

/* UPI */
.pay-chips { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:18px; }
.pay-chips button { display:inline-flex; align-items:center; gap:8px; padding:6px 16px 6px 6px; border-radius:999px; background:#f1f6ff; border:2px solid var(--line); font-size:14px; font-weight:700; color:#35506c; transition:all .2s; }
.pay-chips button i { display:grid; place-items:center; width:28px; height:28px; border-radius:50%; background:var(--c); color:#fff; font-style:normal; font-size:13px; font-weight:800; }
.pay-chips button:hover { border-color:#9cc3f5; transform:translateY(-2px); }
.pay-chips button.on { background:#e6f0ff; border-color:var(--blue); color:var(--blue); box-shadow:0 8px 18px -10px rgba(21,88,214,.7); }
.pay-inwrap { position:relative; display:block; }
.pay-okmark { position:absolute; right:14px; top:50%; translate:0 -50%; display:grid; place-items:center; width:26px; height:26px; border-radius:50%; background:#10b981; color:#fff; font-size:13px; animation:payPop .35s cubic-bezier(.2,1.4,.4,1) both; }
.pay label.good input { border-color:#10b981; background:#f3fcf8; padding-right:52px; }
.pay-valid { font-size:13px; font-weight:700; color:#0b7a4f; }
.pay-flow { display:flex; align-items:center; gap:8px; margin-top:16px; padding:12px 14px; border-radius:18px; background:linear-gradient(100deg,#eef5ff,#e8f8ff); }
.pay-flow span { display:flex; align-items:center; gap:7px; font-size:12.5px; font-weight:700; color:#35506c; line-height:1.25; }
.pay-flow b { display:grid; place-items:center; flex:none; width:22px; height:22px; border-radius:50%; background:var(--blue); color:#fff; font-size:11px; }
.pay-flow i { flex:1; min-width:10px; height:2px; background:repeating-linear-gradient(90deg,#8fb4ee 0 6px,transparent 6px 12px); }

/* inputs */
.pay-fields { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.pay label { display:grid; gap:7px; font-size:14px; font-weight:700; color:#23406e; }
.pay label.full { grid-column:1/-1; }
.pay input { width:100%; min-height:54px; padding:0 18px; border:2px solid #d7e5f7; border-radius:16px; background:#f7faff; font:inherit; font-size:16px; font-weight:600; color:var(--ink); transition:border-color .2s,box-shadow .2s,background .2s; }
.pay input:focus { border-color:var(--blue); background:#fff; box-shadow:0 0 0 4px rgba(21,88,214,.13); outline:none; }
.pay input:disabled { opacity:.7; }
.pay label.bad input { border-color:#e5484d; background:#fff8f8; animation:payShake .4s; }
.pay label em,.pay-err { font-style:normal; font-size:13px; font-weight:600; color:#c9363b; }
.pay-hint { margin-top:12px; font-size:14px; color:var(--muted); }

/* live card preview */
.pay-card { width:min(340px,100%); height:200px; margin:0 auto 22px; perspective:1000px; }
.pay-card-in { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .7s cubic-bezier(.3,1.1,.4,1); }
.pay-card.flip .pay-card-in { transform:rotateY(180deg); }
.pay-face { position:absolute; inset:0; padding:20px 22px; border-radius:22px; color:#fff; backface-visibility:hidden; -webkit-backface-visibility:hidden; overflow:hidden; background:linear-gradient(135deg,#0c2a78,#1558d6 55%,#19b3e6); box-shadow:0 24px 40px -18px rgba(21,60,140,.7); }
.pay-face::after { content:""; position:absolute; top:-40%; left:-60%; width:50%; height:200%; background:linear-gradient(100deg,transparent,rgba(255,255,255,.22),transparent); transform:rotate(18deg); animation:paySheen 4.5s ease-in-out infinite; }
.pay-face.back { transform:rotateY(180deg); padding:0; }
.pc-top { display:flex; justify-content:space-between; align-items:center; }
.pc-top b { font-family:"Bricolage Grotesque",sans-serif; font-size:18px; font-style:italic; letter-spacing:.5px; }
.pc-chip { width:44px; height:32px; border-radius:8px; background:linear-gradient(135deg,#ffe39a,#e8b43c); }
.pc-no { margin-top:26px; font-size:clamp(17px,5vw,22px); font-weight:700; letter-spacing:2px; font-variant-numeric:tabular-nums; white-space:nowrap; }
.pc-bot { position:absolute; left:22px; right:22px; bottom:18px; display:flex; justify-content:space-between; gap:12px; }
.pc-bot small,.pc-cvv small { display:block; font-size:10px; letter-spacing:1px; text-transform:uppercase; opacity:.75; }
.pc-bot span { display:block; max-width:170px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:14px; font-weight:700; text-transform:uppercase; }
.pc-strip { height:42px; margin-top:26px; background:#06143a; }
.pc-cvv { margin:22px 22px 0; padding:8px 14px; border-radius:8px; background:#fff; color:#0b1b3a; text-align:right; }
.pc-cvv small { text-align:left; color:#52698a; }
.pc-cvv span { font-weight:800; letter-spacing:3px; }

/* net banking */
.pay-banks { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
.pay-banks button { display:flex; align-items:center; gap:12px; min-height:52px; padding:0 14px; border:2px solid #d7e5f7; border-radius:16px; background:#f7faff; font-weight:700; font-size:14.5px; color:#23406e; text-align:left; transition:border-color .2s,background .2s,transform .2s,color .2s; }
.pay-banks button:hover:not(:disabled) { border-color:#9cc3f5; transform:translateY(-2px); }
.pay-banks button.on { border-color:var(--blue); background:#eaf2ff; color:var(--blue); }
.pay-banks i { display:grid; place-items:center; flex:none; width:30px; height:30px; border-radius:50%; background:#fff; border:1px solid var(--line); font-style:normal; font-size:13px; font-weight:800; }
.pay-err { display:block; margin-top:10px; }

/* buttons */
.pay-btn { position:relative; overflow:hidden; display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:50px; padding:0 28px; border:0; border-radius:999px; color:#fff; font-weight:800; font-size:16px; background:linear-gradient(100deg,#0f48c2,#1558d6 50%,#19b3e6); box-shadow:0 16px 30px -12px rgba(21,88,214,.7); transition:transform .25s,filter .25s,box-shadow .25s; }
.pay-btn::after { content:""; position:absolute; top:0; left:-60%; width:40%; height:100%; background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent); transform:skewX(-20deg); animation:paySheenBtn 3.2s ease-in-out infinite; }
.pay-btn:hover:not(:disabled) { transform:translateY(-3px); filter:brightness(1.06); box-shadow:0 22px 36px -14px rgba(21,88,214,.8); }
.pay-btn:active:not(:disabled) { transform:translateY(0) scale(.98); }
.pay-btn:disabled { opacity:.85; cursor:progress; }
.pay-btn.big { width:100%; min-height:60px; margin-top:22px; font-size:18px; animation:payBtnGlow 2.6s ease-in-out infinite; }
.pay-btn.ghost { color:#1c5eb9; background:#fff; border:2px solid #cfe1fb; box-shadow:none; }
.pay-btn.ghost::after { display:none; }
.pay-trust { display:flex; flex-wrap:wrap; justify-content:center; gap:8px 18px; margin:18px 0 0; padding:0; list-style:none; font-size:13.5px; font-weight:700; color:#35506c; }
.pay-safe { margin-top:10px; text-align:center; font-size:13px; color:var(--muted); }

/* order summary */
.pay-side { position:sticky; top:92px; padding:clamp(22px,2.6vw,32px); border-radius:36px 36px 12px 36px; background:#fff; border:1px solid var(--line); box-shadow:0 30px 60px -30px rgba(21,60,140,.4); overflow:hidden; }
.pay-side::before { content:""; position:absolute; top:-70px; right:-70px; width:200px; height:200px; border-radius:50%; background:radial-gradient(circle,color-mix(in srgb,var(--accent) 35%,transparent),transparent 70%); pointer-events:none; }
.pay-side > * { position:relative; }
.pay-side h2 { margin-bottom:16px; font-size:24px; font-weight:800; }
.pay-plan { position:relative; display:flex; align-items:center; gap:14px; padding:16px 18px; border-radius:24px; color:#fff; background:linear-gradient(120deg,#0c2a78,#1558d6 60%,#19b3e6); box-shadow:0 18px 34px -16px rgba(21,88,214,.7); overflow:hidden; }
.pay-plan::after { content:""; position:absolute; top:0; left:-60%; width:40%; height:100%; background:linear-gradient(100deg,transparent,rgba(255,255,255,.3),transparent); transform:skewX(-20deg); animation:paySheenBtn 4s ease-in-out infinite; }
.pay-plan > span { display:grid; place-items:center; flex:none; width:54px; height:54px; border-radius:50%; background:#fff; font-size:30px; box-shadow:0 8px 18px -8px rgba(0,0,0,.4); animation:payBob 3s ease-in-out infinite; }
.pay-plan b { display:block; font-size:19px; color:#fff; }
.pay-plan small { color:rgba(255,255,255,.85); font-weight:600; font-size:13.5px; }
.pay-plan em { position:absolute; top:-10px; right:14px; z-index:2; padding:3px 12px; border-radius:999px; background:linear-gradient(100deg,#10b981,#34d399); color:#fff; font-style:normal; font-size:12px; font-weight:800; box-shadow:0 8px 14px -6px rgba(16,185,129,.7); }
.pay-feat { list-style:none; display:grid; gap:9px; margin:18px 0 4px; padding:0; }
.pay-feat li { display:flex; gap:10px; font-size:14.5px; font-weight:600; color:#35506c; }
.pay-feat li::before { content:"✓"; display:grid; place-items:center; flex:none; width:20px; height:20px; border-radius:50%; background:#dcf7e9; color:#0f9158; font-size:11px; font-weight:900; }
.pay-lines { margin:18px 0 0; padding-top:16px; border-top:1px dashed #cfe0fb; display:grid; gap:10px; }
.pay-lines div { display:flex; justify-content:space-between; gap:12px; font-weight:600; }
.pay-lines dt,.pay-lines dd { margin:0; }
.pay-lines .save { color:#0f9158; }
.pay-lines .mut { color:var(--muted); font-size:14px; }
.pay-saved { margin-top:14px; padding:10px 14px; border-radius:16px; background:linear-gradient(100deg,#e3fbef,#d6f6e6); color:#0b7a4f; font-size:14px; font-weight:800; text-align:center; }
.pay-total { display:flex; align-items:baseline; justify-content:space-between; margin-top:16px; padding-top:16px; border-top:2px solid var(--ink); }
.pay-total span { font-weight:800; }
.pay-total strong { font-size:36px; font-weight:800; letter-spacing:-.8px; background:linear-gradient(90deg,#1349c2,#19b3e6); -webkit-background-clip:text; background-clip:text; color:transparent; }
.pay-note { margin-top:12px; font-size:13px; color:var(--muted); }

/* overlays */
.pay-overlay { position:fixed; inset:0; z-index:50; display:grid; place-items:center; padding:20px; overflow-y:auto; background:rgba(11,27,58,.6); backdrop-filter:blur(8px); animation:payFade .25s both; }
.pay-ov-card { width:min(400px,100%); padding:34px 28px 28px; text-align:center; border-radius:36px 36px 36px 12px; background:#fff; box-shadow:0 40px 80px -20px rgba(0,0,0,.5); animation:payPop .4s cubic-bezier(.2,1.2,.4,1) both; }
.pay-ring { position:relative; display:grid; place-items:center; width:84px; height:84px; margin:0 auto 18px; }
.pay-ring i { position:absolute; inset:0; border-radius:50%; border:5px solid #e3eefc; border-top-color:var(--blue); border-right-color:var(--sky); animation:paySpin .9s linear infinite; }
.pay-ring span { font-size:30px; }
.pay-ov-card h2 { font-size:24px; font-weight:800; }
.pay-ov-card p { margin-top:4px; font-size:14px; color:var(--muted); }
.pay-ov-card ul { display:grid; gap:12px; margin:22px 0 0; padding:0; list-style:none; text-align:left; }
.pay-ov-card li { display:flex; align-items:center; gap:12px; font-size:15px; font-weight:600; color:#9fb1cb; transition:color .3s; }
.pay-ov-card li b { display:grid; place-items:center; flex:none; width:24px; height:24px; border-radius:50%; border:2px solid #d7e5f7; font-size:12px; color:#fff; transition:all .3s; }
.pay-ov-card li.on { color:var(--ink); }
.pay-ov-card li.on b { border-color:var(--blue); border-top-color:transparent; animation:paySpin .7s linear infinite; }
.pay-ov-card li.done { color:#0b7a4f; }
.pay-ov-card li.done b { background:#10b981; border-color:#10b981; }

/* UPI approve overlay */
.pay-ov-card.upi { display:grid; grid-template-columns:1fr 280px; align-items:center; gap:clamp(18px,3vw,40px); width:min(860px,100%); padding:clamp(24px,3vw,40px); text-align:left; border-radius:44px 44px 44px 14px; }
.pay-upi-tag { display:inline-block; padding:6px 14px; border-radius:999px; background:#e6f0ff; color:var(--blue); font-size:12.5px; font-weight:800; letter-spacing:.6px; }
.pay-upi-left h2 { margin:12px 0 8px; font-size:clamp(26px,3vw,36px); line-height:1.1; }
.pay-upi-left p { font-size:15px; color:var(--muted); }
.pay-upi-left p b { color:var(--ink); }
.pay-timer { position:relative; display:flex; align-items:center; gap:14px; margin:20px 0 6px; }
.pay-timer svg { width:78px; height:78px; rotate:-90deg; flex:none; }
.pay-timer circle { fill:none; stroke-width:7; }
.pay-timer .t { stroke:#e3eefc; }
.pay-timer .b { stroke:url(#none); stroke:#1558d6; stroke-linecap:round; transition:stroke-dashoffset 1s linear; }
.pay-timer strong { position:absolute; left:0; width:78px; text-align:center; font-size:19px; font-weight:800; }
.pay-timer span { font-size:13px; font-weight:700; color:var(--muted); }
.pay-ov-card.upi .pay-upi-steps { margin-top:14px; }
.pay-upi-steps li { padding:10px 14px; border-radius:16px; background:#f4f8ff; }
.pay-upi-steps li.on { background:#e6f0ff; }
.pay-linkbtn { margin-top:16px; padding:0; border:0; background:none; color:#c9363b; font-weight:800; text-decoration:underline; }
.pay-demo { margin-top:12px!important; font-size:12px!important; font-weight:700; color:#9a6b00!important; }

/* phone */
.pay-phone { position:relative; width:280px; height:540px; margin:auto; padding:12px; border-radius:42px; background:linear-gradient(160deg,#1c2b4a,#0b1b3a); box-shadow:0 30px 60px -20px rgba(11,27,58,.7),inset 0 0 0 2px #31456b; animation:payBob 5s ease-in-out infinite; }
.pay-notch { position:absolute; top:18px; left:50%; translate:-50% 0; z-index:3; width:84px; height:22px; border-radius:999px; background:#0b1b3a; }
.pay-screen { height:100%; overflow:hidden; display:flex; flex-direction:column; padding:44px 16px 16px; border-radius:32px; background:linear-gradient(#f5f9ff,#fff); animation:payFade .35s both; }
.ps-app { display:flex; align-items:center; gap:10px; font-weight:800; color:var(--c); }
.ps-app i { display:grid; place-items:center; width:32px; height:32px; border-radius:50%; background:var(--c); color:#fff; font-style:normal; font-size:14px; }
.ps-card { margin-top:18px; padding:18px 16px; border-radius:22px; text-align:center; background:#fff; border:1px solid var(--line); box-shadow:0 14px 28px -18px rgba(21,60,140,.5); }
.ps-card small { display:block; font-size:12px; color:#7389a8; font-weight:600; }
.ps-card b { display:block; margin:2px 0; font-size:17px; }
.ps-amt { margin:6px 0; font-family:"Bricolage Grotesque",sans-serif; font-size:36px; font-weight:800; color:var(--blue); }
.ps-row { display:flex; justify-content:space-between; gap:8px; margin-top:14px; font-size:12.5px; }
.ps-row span { color:#7389a8; font-weight:600; }
.ps-row b { max-width:150px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.ps-btns { display:grid; grid-template-columns:1fr 1.6fr; gap:10px; margin-top:auto; }
.ps-btns button { min-height:46px; border:0; border-radius:999px; font-weight:800; font-size:14px; }
.ps-btns .no { background:#eef2f9; color:#52698a; }
.ps-btns .yes { color:#fff; background:linear-gradient(100deg,#0f48c2,#19b3e6); box-shadow:0 12px 22px -10px rgba(21,88,214,.8); animation:payBtnGlow 1.8s ease-in-out infinite; }
.ps-pinhead { text-align:center; }
.ps-pinhead small { display:block; font-size:12px; color:#7389a8; font-weight:600; }
.ps-pinhead b { display:block; font-family:"Bricolage Grotesque",sans-serif; font-size:30px; font-weight:800; }
.ps-pinhead span { font-size:12.5px; font-weight:700; color:var(--muted); }
.ps-dots { display:flex; justify-content:center; gap:12px; margin:18px 0 14px; }
.ps-dots i { width:14px; height:14px; border-radius:50%; border:2px solid #b7cdee; transition:all .2s; }
.ps-dots i.on { background:var(--blue); border-color:var(--blue); transform:scale(1.15); }
.ps-keys { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:auto; }
.ps-keys button { min-height:44px; border:0; border-radius:14px; background:#eef4ff; color:var(--ink); font-size:20px; font-weight:700; transition:background .15s,transform .1s; }
.ps-keys button:active:not(:disabled) { background:#cfe0fb; transform:scale(.94); }
.ps-keys button:disabled { visibility:hidden; }
.ps-keys button.del { background:transparent; font-size:18px; }

/* success */
.pay-done { display:grid; justify-items:center; text-align:center; padding-block:clamp(34px,6vw,70px) 70px; }
.pay-confetti { position:fixed; inset:0; z-index:5; pointer-events:none; overflow:hidden; }
.pay-confetti i { position:absolute; top:-14px; width:10px; height:16px; border-radius:3px; opacity:0; animation:payConfetti linear forwards; }
.pay-tick { position:relative; width:96px; height:96px; margin-bottom:20px; animation:payPop .5s cubic-bezier(.2,1.3,.4,1) both; }
.pay-tick-ring { position:absolute; inset:0; border-radius:50%; border:3px solid rgba(16,185,129,.5); animation:payRing 2.4s ease-out infinite; }
.pay-tick-ring.r2 { animation-delay:1.2s; }
.pay-tick svg { position:relative; width:100%; height:100%; fill:none; stroke-width:3; stroke-linecap:round; stroke-linejoin:round; }
.pay-tick circle { stroke:#10b981; fill:#e3fbef; stroke-dasharray:152; stroke-dashoffset:152; animation:payDraw .7s ease forwards; }
.pay-tick path { stroke:#059669; stroke-dasharray:44; stroke-dashoffset:44; animation:payDraw .5s .6s ease forwards; }
.pay-done h1,.pay-done .pay-lead { animation:payRise .6s .35s both; }
.pay-done .pay-lead { margin-inline:auto; text-align:center; }
.pay-receipt { position:relative; width:min(560px,100%); margin-top:30px; overflow:hidden; text-align:left; border-radius:28px; background:#fff; border:1px solid var(--line); box-shadow:0 26px 54px -30px rgba(21,60,140,.4); animation:payRise .7s .5s both; }
.pay-rc-head { display:flex; justify-content:space-between; gap:14px; padding:18px 24px; background:linear-gradient(110deg,#0c2a78,#1558d6 70%,#19b3e6); color:#fff; }
.pay-rc-head small { display:block; font-size:12.5px; opacity:.85; }
.pay-rc-head b { font-size:15px; }
.pay-rc-head .r { text-align:right; }
.pay-rc-plan { display:flex; align-items:center; gap:14px; margin:18px 24px 0; padding:12px 16px; border-radius:18px; background:#f1f7ff; }
.pay-rc-plan > span { font-size:28px; }
.pay-rc-plan div { flex:1; min-width:0; }
.pay-rc-plan b { display:block; }
.pay-rc-plan small { color:var(--muted); font-weight:600; }
.pay-rc-plan em { padding:4px 12px; border-radius:999px; border:2px solid #10b981; color:#0f9158; font-style:normal; font-size:12px; font-weight:800; letter-spacing:1px; transform:rotate(-6deg); }
.pay-receipt dl { margin:0; padding:10px 24px 8px; }
.pay-receipt dl div { display:flex; justify-content:space-between; gap:16px; padding:12px 0; border-bottom:1px solid #edf2fa; font-weight:600; }
.pay-receipt dt { color:var(--muted); }
.pay-receipt dd { margin:0; text-align:right; }
.pay-receipt .tot { border-bottom:0; font-size:20px; font-weight:800; }
.pay-receipt .tot dd { color:var(--blue); }
.pay-actions { display:flex; flex-wrap:wrap; justify-content:center; gap:14px; margin-top:28px; animation:payRise .7s .65s both; }

@keyframes payGrad { to { background-position:250% 0; } }
@keyframes paySpin { to { transform:rotate(360deg); } }
@keyframes payFade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
@keyframes payRise { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
@keyframes payPop { from { opacity:0; transform:scale(.8); } to { opacity:1; transform:none; } }
@keyframes payDraw { to { stroke-dashoffset:0; } }
@keyframes payFloat { 0%,100% { transform:translate(0,0); } 50% { transform:translate(30px,-40px); } }
@keyframes payBob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
@keyframes payPulse { 0% { box-shadow:0 0 0 0 rgba(21,88,214,.45); } 100% { box-shadow:0 0 0 10px rgba(21,88,214,0); } }
@keyframes payShake { 0%,100% { transform:none; } 25% { transform:translateX(-5px); } 75% { transform:translateX(5px); } }
@keyframes paySheen { 0%,40% { left:-60%; } 100% { left:140%; } }
@keyframes paySheenBtn { 0%,45% { left:-60%; } 100% { left:140%; } }
@keyframes payBtnGlow { 0%,100% { box-shadow:0 16px 30px -12px rgba(21,88,214,.7),0 0 0 0 rgba(25,179,230,.5); } 50% { box-shadow:0 16px 30px -12px rgba(21,88,214,.7),0 0 0 10px rgba(25,179,230,0); } }
@keyframes payRing { 0% { transform:scale(.8); opacity:.9; } 100% { transform:scale(1.7); opacity:0; } }
@keyframes payConfetti { 0% { opacity:1; transform:translate(0,0) rotate(0); } 100% { opacity:0; transform:translate(var(--dx),105vh) rotate(720deg); } }

@media (max-width:900px) {
  .pay-grid { grid-template-columns:1fr; }
  .pay-side { position:static; order:-1; }
  .pay-secure { display:none; }
  .pay-ov-card.upi { grid-template-columns:1fr; }
  .pay-phone { order:-1; width:250px; height:480px; }
}
@media (max-width:600px) {
  .pay-top-in { height:62px; }
  .pay-steps li:not(.on) span { display:none; }
  .pay-steps li:not(.on) { padding:6px; }
  .pay-brand strong { display:none; }
  .pay-main { border-radius:28px 28px 28px 10px; }
  .pay-side { border-radius:28px 28px 10px 28px; }
  .pay-fields,.pay-banks { grid-template-columns:1fr; }
  .pay-tabs button { font-size:13px; padding:0 4px; }
  .pay-tabs button span { display:none; }
  .pay-flow { flex-direction:column; align-items:flex-start; }
  .pay-flow i { display:none; }
  .pay-rc-head { flex-direction:column; }
  .pay-rc-head .r { text-align:left; }
  .pay-rc-plan { flex-wrap:wrap; }
  .pay-btn { width:100%; }
}
@media print {
  .pay-top,.pay-bg,.pay-actions,.pay-tick,.pay-confetti,.pay-done h1,.pay-done .pay-lead { display:none!important; }
  .pay { background:#fff; }
  .pay-receipt { box-shadow:none; margin-top:0; animation:none; }
  .pay-rc-head { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
}
@media (prefers-reduced-motion:reduce) {
  .pay *,.pay *::before,.pay *::after { animation-duration:.001s!important; animation-iteration-count:1!important; transition-duration:.001s!important; }
  .pay-tick circle,.pay-tick path { stroke-dashoffset:0; }
  .pay-confetti { display:none; }
}
`;
