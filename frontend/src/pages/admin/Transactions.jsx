import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* STYLES (CSS is kept inside this same file)                          */
/* ------------------------------------------------------------------ */
/*
  Responsive strategy
  - The page content uses a CSS *container query* (container name: tx), so the
    layout reacts to the space it really has. It looks right both full-page
    (own sidebar) and embedded inside AdminDashboard (sidebar already there).
  - Content width      layout
      < 520px          phone: 1 column, transaction cards
      520 - 839px      big phone / small tablet: 2-column stats + filters
      840 - 1239px     laptop: full table, 4 stat cards, plans row under table
      >= 1240px        desktop: table + plans sidebar side by side
*/

const CSS = `
/* ---------- 1. Tokens & resets ---------- */
.app {
  --navy: #0f2447;
  --navy-2: #16315f;
  --blue: #2563eb;
  --blue-dark: #1d4fd0;
  --blue-soft: #eaf1ff;
  --text: #0f1b33;
  --muted: #66758f;
  --line: #e6ebf3;
  --bg: #f4f7fc;
  --card: #ffffff;
  --green: #16a05b;
  --green-soft: #e4f7ec;
  --orange: #e8890c;
  --orange-soft: #fff2de;
  --red: #e0384a;
  --red-soft: #fde7ea;
  --radius: 14px;
  --shadow: 0 1px 2px rgba(15, 36, 71, 0.04), 0 4px 14px rgba(15, 36, 71, 0.05);
  --side-w: 236px;

  display: flex;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  color-scheme: light;
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  font-size: 14px;
  line-height: 1.45;
  text-align: left;
}

.app *,
.app *::before,
.app *::after { box-sizing: border-box; }

/* neutralise global styles (Vite index.css etc.) at the lowest specificity */
:where(.app) h1,
:where(.app) h2,
:where(.app) h3,
:where(.app) h4,
:where(.app) p { margin: 0; color: var(--text); }
:where(.app) button {
  padding: 0;
  border: 0;
  border-radius: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
:where(.app) button:focus-visible,
:where(.app) a:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }

.app small { display: block; margin-top: 2px; color: var(--muted); font-size: 12px; font-weight: 400; }
.muted { color: var(--muted); font-size: 12.5px; }
.mono { font-family: ui-monospace, "SF Mono", Consolas, monospace; font-size: 12.5px; }

/* ---------- 2. Sidebar (standalone mode only) ---------- */
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 50;
  width: var(--side-w);
  display: flex;
  flex-direction: column;
  background: var(--navy);
  color: #fff;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}
.sidebar.open { transform: translateX(0); box-shadow: 8px 0 30px rgba(0, 0, 0, 0.3); }

.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(10, 18, 36, 0.55);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.sidebar-overlay.show { opacity: 1; pointer-events: auto; }

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 82px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.brand-logo {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  font-size: 20px;
}
.brand strong { display: block; font-size: 16px; line-height: 1.2; }
.brand small { color: #9fb2d6; font-size: 9px; margin-top: 3px; }

.nav-title {
  margin: 24px 20px 10px;
  color: #8ea3cc;
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.nav { display: flex; flex-direction: column; gap: 4px; padding: 0 12px; overflow-y: auto; }
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 43px;
  padding: 0 13px;
  border-radius: 8px;
  color: #c6d3ee;
  font-size: 12px;
  text-align: left;
  transition: background 0.2s, color 0.2s;
}
.nav-item:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
.nav-item.active { background: var(--blue); color: #fff; font-weight: 600; }
.nav-icon { width: 20px; text-align: center; font-size: 16px; }

.sidebar-footer { margin-top: auto; padding: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
.profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: var(--navy-2);
}
.profile strong { display: block; font-size: 12px; }
.profile small { color: #9fb2d6; font-size: 9px; }
.profile .avatar { width: 34px; height: 34px; font-size: 12px; }
.logout { width: 100%; height: 34px; margin-top: 8px; padding: 0; color: #c6d3ee; font-size: 11px; }
.logout:hover { color: #fff; }

/* ---------- 3. Top bar & page shell ---------- */
.main { flex: 1; min-width: 0; display: flex; flex-direction: column; }

.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.icon-btn.menu-btn { display: none; }
.top-bell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  margin-left: auto;
  padding: 6px;
  border-radius: 8px;
  color: #64748b;
  transition: background 0.2s;
}
.top-bell:hover { background: #eef3fb; }
.top-bell svg { display: block; width: 24px; height: 24px; }
.top-bell .dot { fill: #f05260; }
.top-profile { display: flex; align-items: center; flex-shrink: 0; gap: 10px; padding: 4px 0 4px 8px; color: #17365f; text-align: left; }
.top-profile__icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #194781;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}
.top-profile__copy strong,
.top-profile__copy small { display: block; white-space: nowrap; }
.top-profile__copy strong { color: #18385f; font-size: 12px; }
.top-profile__copy small { margin-top: 3px; color: #8294af; font-size: 10px; }
.top-profile__chev { color: #7186a6; font-size: 11px; }
.icon-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg);
  font-size: 18px;
  transition: background 0.2s;
}
.icon-btn:hover { background: var(--blue-soft); }
.bell-dot {
  position: absolute;
  top: 8px;
  right: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--red);
  border: 2px solid var(--bg);
}
.user-chip { display: flex; align-items: center; gap: 10px; padding-left: 6px; font-weight: 600; }
.user-chip .caret { color: var(--muted); font-size: 11px; }
.user-chip .name { display: none; }
.avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--navy-2);
  color: #fff;
  font-weight: 700;
}

.content {
  container: tx / inline-size;
  padding: 18px 14px 48px;
}

/* ---------- 4. Layout (container-query driven) ---------- */
/* default = single column; wrappers dissolve so blocks can be re-ordered */
.tx-layout { display: flex; flex-direction: column; gap: 18px; }
.tx-main,
.tx-side { display: contents; }

.page-head { order: 1; }
.tx-stats { order: 2; }
.filters-panel { order: 3; }
.table-panel { order: 4; }
.plans-panel { order: 5; }
.rules-panel { order: 6; }
.tx-bottom { order: 7; }

.page-head h1 { font-size: 22px; line-height: 1.25; letter-spacing: -0.01em; }
.page-head p { margin-top: 6px; color: var(--muted); }

/* ---------- 5. Stat cards ---------- */
.tx-stats { display: grid; grid-template-columns: 1fr; gap: 12px; }
.tx-stat {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--card);
  box-shadow: var(--shadow);
  transition: transform 0.2s, box-shadow 0.2s;
}
.tx-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(15, 36, 71, 0.09); }
.tx-stat-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  color: #fff;
  font-size: 19px;
  font-weight: 700;
}
.tone-blue { background: var(--blue); }
.tone-green { background: var(--green); }
.tone-orange { background: var(--orange); }
.tone-red { background: var(--red); }
.stat-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.stat-label { color: var(--muted); font-size: 13px; }
.stat-value { font-size: 23px; line-height: 1.15; letter-spacing: -0.01em; }
.stat-note { color: var(--muted); font-size: 12px; }

/* Sea-wave animation for the 4 stat cards: they roll in one after another
   like a wave, then keep gently rising and falling. Uses the separate
   "translate" property for the bobbing so the hover lift still works. */
.tx-stats .tx-stat {
  animation:
    statWaveIn 1.1s cubic-bezier(0.22, 0.9, 0.3, 1) calc(var(--i, 0) * 0.14s) backwards,
    statWaveBob 4.2s ease-in-out calc(1.1s + var(--i, 0) * 0.45s) infinite;
}
.tx-stats .tx-stat:nth-child(1) { --i: 0; }
.tx-stats .tx-stat:nth-child(2) { --i: 1; }
.tx-stats .tx-stat:nth-child(3) { --i: 2; }
.tx-stats .tx-stat:nth-child(4) { --i: 3; }
.trend { position: absolute; top: 14px; right: 14px; font-size: 12px; font-weight: 600; }
.trend.up { color: var(--green); }
.trend.down { color: var(--red); }

/* ---------- 6. Panels & filters ---------- */
.panel {
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--card);
  box-shadow: var(--shadow);
}
.panel-head { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 14px; }
.panel-head h2 { font-size: 17px; }
.subs-panel .panel-head h2,
.act-panel .panel-head h2 { font-size: 17px; }
.panel-sub { margin-top: 2px; color: var(--muted); font-size: 12.5px; }
.count {
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--blue-soft);
  color: var(--blue);
  font-size: 12px;
  font-weight: 500;
}
.panel-head > .dl,
.panel-head > .btn-primary { margin-left: auto; }
.plan-pill { padding: 4px 10px; cursor: pointer; border: 0; transition: transform 0.15s; }
.plan-pill:hover { transform: scale(1.04); }

.filters { display: grid; grid-template-columns: 1fr; gap: 10px; }
.search-wrap { position: relative; }
.search-wrap .search-icon {
  position: absolute;
  top: 50%;
  left: 13px;
  transform: translateY(-50%);
  color: var(--muted);
  font-size: 16px;
  pointer-events: none;
}
.field {
  width: 100%;
  height: 42px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fff;
  color: var(--text);
  font: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-wrap .field { padding-left: 38px; }
.field::placeholder { color: #98a4ba; }
.field:focus { outline: 0; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.14); }

.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  --tone: var(--blue);
  --tone-rgb: 37, 99, 235;
  --smoke-rgb: var(--tone-rgb);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 12px 7px 14px;
  border: 1px solid rgba(var(--tone-rgb), 0.25);
  border-radius: 999px;
  background: rgba(var(--tone-rgb), 0.09);
  color: var(--tone);
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s;
}
.chip i { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
.chip:hover { border-color: var(--tone); transform: translateY(-1px); }
.chip:active { transform: scale(0.96); }
.chip-count {
  min-width: 20px;
  padding: 0 6px;
  border-radius: 99px;
  background: rgba(var(--tone-rgb), 0.15);
  font-size: 11px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
}
.chip-success { --tone: var(--green); --tone-rgb: 22, 160, 91; }
.chip-pending { --tone: var(--orange); --tone-rgb: 232, 137, 12; }
.chip-failed { --tone: var(--red); --tone-rgb: 224, 56, 74; }
.chip-refunded { --tone: #566380; --tone-rgb: 86, 99, 128; }
.chip.active {
  --smoke-rgb: 255, 255, 255;
  border-color: var(--tone);
  background: var(--tone);
  color: #fff;
  box-shadow: 0 6px 16px rgba(var(--tone-rgb), 0.35);
}
.chip.active .chip-count { background: rgba(255, 255, 255, 0.25); }

/* ---------- 7. Buttons, badges, plans ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  white-space: nowrap;
  transition: transform 0.15s, background 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.btn:active { transform: scale(0.97); }
.btn-primary { background: var(--blue); color: #fff; }
.btn-primary:hover { background: var(--blue-dark); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }
.btn-light { background: var(--bg); color: var(--text); }
.btn-light:hover { background: var(--line); }
.btn-outline { border-color: var(--line); background: #fff; color: var(--text); }
.btn-outline:hover { border-color: var(--blue); color: var(--blue); }
.btn-view { height: 32px; padding: 0 14px; border-color: var(--line); background: #fff; color: var(--blue); font-size: 13px; }
.btn-view:hover { background: var(--blue-soft); border-color: var(--blue); }
.btn-block { width: 100%; }

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.badge::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.badge-success,
.badge-active { background: var(--green-soft); color: var(--green); }
.badge-pending { background: var(--orange-soft); color: var(--orange); }
.badge-failed,
.badge-expired { background: var(--red-soft); color: var(--red); }
.badge-refunded { background: #eceff5; color: #566380; }

.plan {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
}
.plan-elite { background: #e8f0ff; color: #2f5fd0; }
.plan-gold { background: #fff0d1; color: #b87a00; }
.plan-diamond { background: #f0e6ff; color: #7b3fd0; }

/* ---------- 8. Transactions table (laptop+) ---------- */
.table-wrap { display: none; overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; }
.table { width: 100%; border-collapse: collapse; min-width: 860px; font-size: 13px; }
.table th {
  padding: 12px;
  background: #f8faff;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}
.table td { padding: 12px; border-top: 1px solid var(--line); vertical-align: middle; color: var(--text); font-size: 13px; white-space: normal; }
.table td strong { display: block; font-weight: 600; }
.table tbody tr { animation: rowIn 0.35s ease both; transition: background 0.2s; }
.table tbody tr:hover { background: #f8faff; }
.sort-btn { display: inline-flex; align-items: center; gap: 4px; color: inherit; font-weight: inherit; }
.sort-btn:hover { color: var(--blue); }
.method-cell { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
.method-cell span { color: var(--muted); }
.col-no { display: none; }

.empty { padding: 30px 10px; text-align: center; color: var(--muted); }

/* ---------- 9. Mobile transaction cards ---------- */
.tx-cards { display: flex; flex-direction: column; gap: 12px; }
.tx-card {
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  animation: rowIn 0.35s ease both;
}
.tx-card h3 { margin: 10px 0 2px; font-size: 15px; line-height: 1.35; }
.tx-card-top,
.tx-card-bottom { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.tx-card-mid {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 12px 0;
  padding: 10px 0;
  border-block: 1px dashed var(--line);
}
.tx-card-mid strong { font-size: 18px; }

/* ---------- 10. Pagination ---------- */
.pager { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 16px; }
.pager-btns { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 6px; }
.pager-btns button {
  min-width: 34px;
  height: 34px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  transition: all 0.2s;
}
.pager-btns button:hover:not(:disabled) { border-color: var(--blue); color: var(--blue); }
.pager-btns button.active { background: var(--blue); border-color: var(--blue); color: #fff; }
.pager-btns button:disabled { opacity: 0.4; cursor: not-allowed; }
.pager-gap { padding: 0 4px; color: var(--muted); }

/* ---------- 11. Subscription plans + rules ---------- */
.plans-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
.plan-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}
.plan-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15, 36, 71, 0.08); }
.plan-card-top { display: flex; align-items: center; gap: 12px; }
.plan-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 18px;
}
.plan-card h3 { font-size: 15px; }
.plan-price { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; }
.plan-price small { display: inline; margin: 0 0 0 2px; font-size: 13px; }
.plan-limit { color: var(--muted); font-size: 13px; }
.plan-features { display: flex; flex-direction: column; gap: 6px; margin: 4px 0 0; padding: 0; list-style: none; }
.plan-features li { display: flex; gap: 8px; color: #3b4a66; font-size: 13px; }
.plan-features li::before { content: "✓"; color: var(--green); font-weight: 700; }

.plan-card {
  --pc-rgb: 47, 95, 208;
  --smoke-rgb: 59, 130, 246;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s, box-shadow 0.25s, border-color 0.25s, background 0.25s;
}
.plan-card-elite { --pc-rgb: 47, 95, 208; --smoke-rgb: 59, 130, 246; }
.plan-card-gold { --pc-rgb: 201, 138, 0; --smoke-rgb: 245, 184, 61; }
.plan-card-diamond { --pc-rgb: 123, 63, 208; --smoke-rgb: 139, 92, 246; }
.plan-icon { background: rgba(var(--pc-rgb), 0.14); color: rgb(var(--pc-rgb)); transition: background 0.25s, color 0.25s; }
.plan-card:hover { border-color: rgba(var(--pc-rgb), 0.55); }
.plan-card.selected {
  border-color: rgb(var(--pc-rgb));
  background: rgba(var(--pc-rgb), 0.07);
  box-shadow: 0 0 0 2px rgba(var(--pc-rgb), 0.22), 0 12px 26px rgba(var(--pc-rgb), 0.2);
}
.plan-card.selected .plan-icon { background: rgb(var(--pc-rgb)); color: #fff; }
.plan-card.selected .plan-features li::before { color: rgb(var(--pc-rgb)); }
.plan-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  margin-top: 6px;
  border: 1px dashed rgba(var(--pc-rgb), 0.5);
  border-radius: 9px;
  color: rgb(var(--pc-rgb));
  font-size: 13px;
  font-weight: 600;
  transition: background 0.25s, color 0.25s;
}
.plan-card:hover .plan-cta { background: rgba(var(--pc-rgb), 0.1); }
.plan-card.selected .plan-cta { border-style: solid; background: rgb(var(--pc-rgb)); color: #fff; }

/* Subscription Plans animation:
   - cards rise in one after another (cascade)
   - plan icons float and send out a soft pulse ring in the plan colour
   - the "Recommended" badge glows
   - the button line shines across when the card is hovered / selected */
.plans-grid .plan-card {
  animation: planRise 0.8s cubic-bezier(0.22, 0.9, 0.3, 1) calc(var(--i, 0) * 0.16s) backwards;
}
.plans-grid .plan-card:nth-child(1) { --i: 0; }
.plans-grid .plan-card:nth-child(2) { --i: 1; }
.plans-grid .plan-card:nth-child(3) { --i: 2; }
.plans-grid .plan-card .plan-icon {
  animation:
    planIconFloat 3.2s ease-in-out calc(var(--i, 0) * 0.5s) infinite,
    planIconRing 2.4s ease-out calc(var(--i, 0) * 0.5s) infinite;
}
.plan-card:hover .plan-icon,
.plan-card.selected .plan-icon { transform: rotate(-8deg) scale(1.1); }
.plan-icon { transition: background 0.25s, color 0.25s, transform 0.3s; }
.recommended { animation: planBadgeGlow 2s ease-in-out infinite; }
.plan-cta { position: relative; overflow: hidden; }
.plan-cta::after {
  content: "";
  position: absolute;
  inset: 0 auto 0 -60%;
  width: 40%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.65), transparent);
  transform: skewX(-20deg);
  opacity: 0;
  pointer-events: none;
}
.plan-card:hover .plan-cta::after,
.plan-card.selected .plan-cta::after { opacity: 1; animation: planShine 1.6s ease-in-out infinite; }
.recommended {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 3px 9px;
  border-radius: 6px;
  background: var(--blue);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
}

.rules-list {
  counter-reset: rule;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0 14px;
  padding: 0;
  list-style: none;
}
.rules-list li {
  counter-increment: rule;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 10px;
  background: var(--bg);
  color: #3b4a66;
  font-size: 13px;
  animation: rowIn 0.3s ease both;
}
.rules-list li::before {
  content: counter(rule);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--blue-soft);
  color: var(--blue);
  font-size: 11px;
  font-weight: 700;
}
.rules-title .count { margin-left: auto; }
.btn-toggle .chev { display: inline-block; transition: transform 0.25s; }
.btn-toggle[aria-expanded="true"] .chev { transform: rotate(180deg); }
.rules-title { display: flex; align-items: center; gap: 8px; }
.info-dot {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

/* ---------- 12. Bottom row: recent subscriptions / usage / quick actions ---------- */
.tx-bottom { display: grid; grid-template-columns: minmax(0, 1fr); gap: 18px; }
.table-scroll { overflow-x: auto; border: 1px solid var(--line); border-radius: 12px; }
.sub-table { width: 100%; min-width: 700px; border-collapse: collapse; font-size: 13px; }
.sub-table th {
  padding: 10px 12px;
  background: #f8faff;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}
.sub-table td { padding: 11px 12px; border-top: 1px solid var(--line); vertical-align: middle; color: var(--text); font-size: 13px; white-space: normal; }
.sub-table td strong { font-weight: 600; }
.meter { width: 100%; max-width: 90px; height: 6px; margin-top: 5px; border-radius: 99px; background: var(--line); overflow: hidden; }
.meter i { display: block; height: 100%; border-radius: 99px; background: var(--blue); }

.usage { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.uo-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
.uo-head h2 { font-size: 17px; }
.uo-pill { flex-shrink: 0; padding: 3px 10px; border-radius: 999px; background: var(--blue-soft); color: var(--blue); font-size: 12px; font-weight: 600; }

.uo-donut { position: relative; flex-shrink: 0; width: 168px; height: 168px; animation: popIn 0.5s ease both; }
.uo-donut svg { display: block; width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; }
.uo-track { fill: none; stroke: var(--line); stroke-width: 14; }
.uo-seg { fill: none; stroke-width: 14; cursor: pointer; transition: stroke-width 0.25s, opacity 0.25s; }
.uo-seg.on { stroke-width: 19; }
.uo-seg.dim { opacity: 0.25; }
.uo-center { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; pointer-events: none; }
.uo-center strong { font-size: 22px; line-height: 1.1; letter-spacing: -0.01em; }
.uo-center > span { margin-top: 2px; color: var(--muted); font-size: 11.5px; }
.uo-center strong span { color: var(--muted); font-size: 13px; font-weight: 500; }
.uo-center b { margin-top: 4px; color: var(--c, var(--blue)); font-size: 12px; }

.uo-list { display: flex; flex-direction: column; gap: 8px; flex: 1; width: 100%; min-width: 0; }
.uo-row {
  --c: var(--blue);
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  cursor: default;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.uo-row:hover,
.uo-row.on { border-color: var(--c); box-shadow: 0 6px 16px rgba(15, 36, 71, 0.08); transform: translateX(2px); }
.uo-row:focus-visible { outline: 2px solid var(--c); outline-offset: 2px; }
.uo-row-top { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; }
.uo-row-top i { width: 10px; height: 10px; flex-shrink: 0; border-radius: 50%; background: var(--c); }
.uo-row-top em { color: var(--muted); font-size: 12px; font-style: normal; font-weight: 400; }
.uo-row-top b { margin-left: auto; font-weight: 700; white-space: nowrap; }
.uo-bar { height: 6px; margin-top: 8px; border-radius: 99px; background: var(--line); overflow: hidden; }
.uo-bar i { display: block; height: 100%; border-radius: 99px; background: var(--c); transform-origin: left; animation: barGrow 0.9s ease both; }
.uo-pct { display: block; margin-top: 4px; color: var(--muted); font-size: 11.5px; text-align: right; }

.uo-seg { -webkit-tap-highlight-color: transparent; }
.uo-row { cursor: pointer; }
.uo-pop {
  --c: var(--blue);
  margin-top: 14px;
  padding: 14px 16px;
  border: 1px solid var(--c);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(15, 36, 71, 0.12);
  animation: popIn 0.25s ease;
}
.uo-pop-head { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.uo-pop-head i { width: 10px; height: 10px; flex-shrink: 0; border-radius: 50%; background: var(--c); }
.uo-pop-x { margin-left: auto; width: 28px; height: 28px; border-radius: 8px; color: var(--muted); font-size: 13px; }
.uo-pop-x:hover { background: var(--bg); }
.uo-pop-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 12px 0 4px; }
.uo-pop-grid div { padding: 8px 10px; border-radius: 10px; background: var(--bg); }
.uo-pop-grid span { display: block; color: var(--muted); font-size: 11.5px; }
.uo-pop-grid b { display: block; margin-top: 2px; color: var(--c); font-size: 17px; }
@media (min-width: 640px) { .uo-pop-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }

.uo-rev { margin-top: 16px; padding: 16px; border-radius: 14px; background: linear-gradient(135deg, var(--navy), #1d4fd0); color: #fff; }
.uo-rev-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
.uo-rev-lbl { display: block; color: #b6c7ea; font-size: 12px; }
.uo-rev strong { display: block; margin-top: 2px; color: #fff; font-size: 24px; line-height: 1.15; }
.uo-rev .trend { position: static; padding: 3px 9px; border-radius: 99px; background: rgba(255, 255, 255, 0.14); color: #7ff0b4; white-space: nowrap; }
.uo-split { display: flex; gap: 2px; height: 8px; margin-top: 14px; border-radius: 99px; background: rgba(255, 255, 255, 0.15); overflow: hidden; }
.uo-split i { display: block; height: 100%; transform-origin: left; animation: barGrow 0.9s ease both; }
.uo-split-legend { display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 10px; color: #d5e1fa; font-size: 12px; }
.uo-split-legend span { display: inline-flex; align-items: center; gap: 6px; }
.uo-split-legend s { display: inline-block; width: 8px; height: 8px; border-radius: 50%; }

/* Monthly Revenue card: smoke is ALWAYS drifting. When the mouse moves over the card
   the smoke follows it and its colour changes (JS sets --mx / --my / --sh, see revSmoke()). */
@property --sh { syntax: "<number>"; inherits: true; initial-value: 200; }
.uo-rev {
  --sh: 200;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  transition: --sh 0.7s ease-out;
}
.uo-rev::before,
.uo-rev::after {
  content: "";
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(18px);
  mix-blend-mode: screen; /* adds light on the dark navy card = brighter smoke */
}
.uo-rev::before {
  width: 180px;
  height: 180px;
  margin: -90px 0 0 -90px;
  left: var(--mx, 24%);
  top: var(--my, 42%);
  background: radial-gradient(circle, hsl(var(--sh) 100% 68% / 0.95) 0%, hsl(var(--sh) 100% 62% / 0.5) 45%, transparent 72%);
  transition: left 0.5s ease-out, top 0.5s ease-out;
  animation: uoSmokeA 6s ease-in-out infinite alternate;
}
.uo-rev::after {
  width: 260px;
  height: 260px;
  margin: -130px 0 0 -130px;
  left: var(--mx2, 78%);
  top: var(--my2, 62%);
  background: radial-gradient(circle, hsl(calc(var(--sh) + 55) 100% 70% / 0.8) 0%, hsl(calc(var(--sh) + 55) 100% 64% / 0.4) 48%, transparent 74%);
  transition: left 1s ease-out, top 1s ease-out;
  animation: uoSmokeB 8s ease-in-out infinite alternate;
}

.quick-panel { align-self: stretch; } /* full column width, same as Recent Admin Activity */
.quick-panel .panel-head { margin-bottom: 12px; }
.quick-list { display: flex; flex-direction: column; gap: 8px; }
.qa {
  --smoke-rgb: 37, 99, 235;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 40px;
  padding: 0 12px 0 7px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  color: var(--text);
  font-size: 13.5px;
  font-weight: 600;
  text-align: left;
  transition: transform 0.15s, box-shadow 0.2s, border-color 0.2s;
}
.qa:hover { transform: translateY(-1px); border-color: rgba(var(--smoke-rgb), 0.6); box-shadow: 0 8px 18px rgba(15, 36, 71, 0.08); }
.qa:active { transform: scale(0.98); }
.qa-ico {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--blue-soft);
  color: var(--blue);
  font-size: 15px;
}
.qa-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.qa-arrow { color: var(--muted); font-size: 18px; line-height: 1; transition: transform 0.2s; }
.qa:hover .qa-arrow { transform: translateX(3px); }
.qa-primary { border-color: transparent; background: linear-gradient(135deg, var(--blue), #4f8bff); color: #fff; --smoke-rgb: 255, 255, 255; }
.qa-primary:hover { border-color: transparent; box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35); }
.qa-primary .qa-ico { background: rgba(255, 255, 255, 0.22); color: #fff; }
.qa-primary .qa-arrow { color: #fff; }
.qa-orange { --smoke-rgb: 232, 137, 12; }
.qa-orange .qa-ico { background: var(--orange-soft); color: var(--orange); }
.qa-green { --smoke-rgb: 22, 160, 91; }
.qa-green .qa-ico { background: var(--green-soft); color: var(--green); }

/* Quick Actions animation:
   - buttons slide in from the left one after another
   - icons give out a soft pulse ring and a little wiggle
   - the arrow keeps nudging to the right */
.quick-list > .qa,
.quick-list > .dl {
  animation: qaSlideIn 0.7s cubic-bezier(0.22, 0.9, 0.3, 1) calc(var(--i, 0) * 0.13s) backwards;
}
.quick-list > :nth-child(1) { --i: 0; }
.quick-list > :nth-child(2) { --i: 1; }
.quick-list > :nth-child(3) { --i: 2; }
.quick-list > :nth-child(4) { --i: 3; }
.quick-list .qa-ico {
  animation:
    qaIconRing 2.6s ease-out calc(var(--i, 0) * 0.35s) infinite,
    qaIconWiggle 4s ease-in-out calc(var(--i, 0) * 0.35s) infinite;
}
.quick-list > .dl .qa-ico { --i: 3; }
.quick-list .qa-arrow { animation: qaArrowNudge 1.6s ease-in-out calc(var(--i, 0) * 0.2s) infinite; }
.quick-list > .dl .qa-arrow { --i: 3; }

/* logout: the whole page fades out just before we go to the login page */
.app { transition: opacity 0.35s ease; }
.app.is-leaving { opacity: 0; pointer-events: none; }
.top-profile { border-radius: 10px; transition: background 0.2s; }
.top-profile:hover { background: #eef3fb; }
.top-profile:hover .top-profile__chev { color: #e0384a; }

/* ---------- 13. Details modal ---------- */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(10, 18, 36, 0.6);
  backdrop-filter: blur(3px);
  animation: fadeIn 0.25s ease;
}
.modal {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 92vh;
  border-radius: 20px 20px 0 0;
  background: #fff;
  animation: slideUp 0.3s ease;
}
.modal-head { display: flex; align-items: center; gap: 10px; padding: 18px; border-bottom: 1px solid var(--line); }
.modal-head > div { flex: 1; min-width: 0; }
.modal-head h2 { font-size: 17px; }
.modal-head p { margin-top: 4px; color: var(--muted); font-size: 12.5px; }
.modal-close { width: 34px; height: 34px; border-radius: 50%; background: var(--bg); }
.modal-close:hover { background: var(--line); }
.modal-body { display: flex; flex-direction: column; gap: 14px; padding: 18px; overflow-y: auto; }
.amount-box { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; padding: 16px; border-radius: 12px; background: var(--blue-soft); }
.amount-box span { color: var(--muted); }
.amount-box strong { font-size: 26px; color: var(--blue); }
.amount-box em { margin-left: auto; }
.detail-card { padding: 14px; border: 1px solid var(--line); border-radius: 12px; }
.detail-card h3 { margin: 0 0 8px; font-size: 14px; color: var(--blue); }
.detail-row { display: flex; justify-content: space-between; gap: 16px; padding: 8px 0; border-top: 1px dashed var(--line); }
.detail-row span { color: var(--muted); flex-shrink: 0; }
.detail-row strong { font-weight: 600; text-align: right; word-break: break-word; }
.modal-foot { display: flex; gap: 10px; justify-content: flex-end; padding: 14px 18px; border-top: 1px solid var(--line); }
.modal-foot .btn { flex: 1; }

/* ---------- 13b. Smoke hover effect ---------- */
/* JS (smoke()) writes the cursor position into --mx / --my.
   Two soft blurred blobs follow the cursor with different lag = "smoke trail". */
.smoke { position: relative; isolation: isolate; overflow: hidden; --smoke-rgb: 37, 99, 235; }
.smoke::before,
.smoke::after {
  content: "";
  position: absolute;
  z-index: -1;
  left: var(--mx, 50%);
  top: var(--my, 50%);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  filter: blur(14px);
  transform: scale(0.5);
}
.smoke::before {
  width: 120px;
  height: 120px;
  margin: -60px 0 0 -60px;
  background: radial-gradient(circle, rgba(var(--smoke-rgb), 0.5) 0%, rgba(var(--smoke-rgb), 0.2) 45%, transparent 70%);
  transition: left 0.45s ease-out, top 0.45s ease-out, opacity 0.35s, transform 0.45s;
}
.smoke::after {
  width: 190px;
  height: 190px;
  margin: -95px 0 0 -95px;
  background: radial-gradient(circle, rgba(var(--smoke-rgb), 0.3) 0%, rgba(var(--smoke-rgb), 0.1) 50%, transparent 72%);
  transition: left 0.95s ease-out, top 0.95s ease-out, opacity 0.5s, transform 0.7s;
}
/* .is-smoking is added by JS for touch / pen / device-emulation (Inspect mode), where :hover is unreliable */
.smoke:hover::before,
.smoke:hover::after,
.smoke.is-smoking::before,
.smoke.is-smoking::after { opacity: 1; transform: scale(1); animation: smokeDrift 2.6s ease-in-out infinite alternate; }
.smoke:hover::after,
.smoke.is-smoking::after { animation-duration: 3.4s; animation-direction: alternate-reverse; }
.st-blue { --smoke-rgb: 37, 99, 235; }
.st-green { --smoke-rgb: 22, 160, 91; }
.st-orange { --smoke-rgb: 232, 137, 12; }
.st-red { --smoke-rgb: 224, 56, 74; }
/* Subscription Plans: each plan card smokes in its own colour
   (.smoke above would otherwise override the plan colour with blue) */
.plan-card-elite.smoke { --smoke-rgb: 59, 130, 246; }
.plan-card-gold.smoke { --smoke-rgb: 245, 170, 30; }
.plan-card-diamond.smoke { --smoke-rgb: 139, 92, 246; }

/* ---------- 13c. Download menu (PDF / Excel) ---------- */
.dl { position: relative; display: inline-flex; }
.dl.block { display: flex; width: 100%; }
.dl.block > button { width: 100%; }
.dl-pop {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 60;
  width: 250px;
  max-width: calc(100vw - 32px);
  padding: 6px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 16px 40px rgba(15, 36, 71, 0.18);
  animation: popIn 0.18s ease both;
}
.dl-pop.up { top: auto; bottom: calc(100% + 8px); }
.dl-pop.block { left: 0; right: 0; width: auto; }
.dl-title { padding: 6px 8px 4px; color: var(--muted); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
.dl-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 9px 8px;
  border-radius: 10px;
  text-align: left;
  transition: background 0.15s;
}
.dl-item:hover { background: var(--bg); }
.dl-item strong { display: block; font-size: 13.5px; font-weight: 600; }
.dl-ico { display: grid; place-items: center; flex-shrink: 0; width: 38px; height: 38px; border-radius: 10px; font-size: 11px; font-weight: 800; letter-spacing: 0.02em; }
.dl-ico.pdf { background: var(--red-soft); color: var(--red); }
.dl-ico.xls { background: var(--green-soft); color: var(--green); }
.modal-foot .dl { flex: 1; }
.modal-foot .dl > button { width: 100%; }

/* ---------- 14. Animations ---------- */
@keyframes smokeDrift {
  0% { transform: scale(0.95) translate(0, 0); }
  50% { transform: scale(1.12) translate(10px, -6px); }
  100% { transform: scale(1) translate(-8px, 5px); }
}
@keyframes statWaveIn {
  0%   { opacity: 0; transform: translate(-46px, 44px) rotate(-4deg) scale(0.94); }
  45%  { opacity: 1; transform: translate(10px, -14px) rotate(1.5deg) scale(1.02); }
  70%  { transform: translate(-4px, 6px) rotate(-0.6deg); }
  100% { opacity: 1; transform: none; }
}
@keyframes statWaveBob {
  0%, 100% { translate: 0 0; }
  25%      { translate: 3px -4px; }
  50%      { translate: 0 -7px; }
  75%      { translate: -3px -3px; }
}
@keyframes uoSmokeA {
  0%   { transform: translate(-30px, 14px) scale(0.9); }
  50%  { transform: translate(34px, -18px) scale(1.15); }
  100% { transform: translate(8px, 24px) scale(1); }
}
@keyframes uoSmokeB {
  0%   { transform: translate(36px, -20px) scale(1.05); }
  50%  { transform: translate(-40px, 16px) scale(0.88); }
  100% { transform: translate(-6px, -26px) scale(1.12); }
}
@keyframes planRise {
  0%   { opacity: 0; transform: translateY(36px) scale(0.95); }
  60%  { opacity: 1; transform: translateY(-6px) scale(1.01); }
  100% { opacity: 1; transform: none; }
}
@keyframes planIconFloat {
  0%, 100% { translate: 0 0; }
  50%      { translate: 0 -4px; }
}
@keyframes planIconRing {
  0%   { box-shadow: 0 0 0 0 rgba(var(--pc-rgb), 0.45); }
  70%, 100% { box-shadow: 0 0 0 12px rgba(var(--pc-rgb), 0); }
}
@keyframes planBadgeGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.55); }
  50%      { box-shadow: 0 0 0 7px rgba(37, 99, 235, 0); }
}
@keyframes planShine {
  0%   { left: -60%; }
  100% { left: 130%; }
}
@keyframes qaSlideIn {
  0%   { opacity: 0; transform: translateX(-34px); }
  65%  { opacity: 1; transform: translateX(6px); }
  100% { opacity: 1; transform: none; }
}
@keyframes qaIconRing {
  0%   { box-shadow: 0 0 0 0 rgba(var(--smoke-rgb), 0.45); }
  70%, 100% { box-shadow: 0 0 0 9px rgba(var(--smoke-rgb), 0); }
}
@keyframes qaIconWiggle {
  0%, 82%, 100% { transform: rotate(0); }
  86% { transform: rotate(-12deg) scale(1.08); }
  91% { transform: rotate(10deg) scale(1.08); }
  96% { transform: rotate(-5deg); }
}
@keyframes qaArrowNudge {
  0%, 100% { translate: 0 0; }
  50%      { translate: 5px 0; }
}
@keyframes barGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes rowIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes popIn { from { transform: scale(0.94); opacity: 0; } to { transform: none; opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .app *, .app *::before, .app *::after { animation: none !important; transition: none !important; }
}

/* ---------- 9. Upcoming Renewals / Payment Alerts / Top Colleges / Admin Activity ---------- */
.tx-col { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
.side-extra { order: 8; display: grid; grid-template-columns: minmax(0, 1fr); gap: 18px; min-width: 0; }
.renew-panel, .alerts-panel, .top-panel, .act-panel { animation: rowIn 0.55s ease both; }
.alerts-panel { animation-delay: 0.08s; }
.act-panel { animation-delay: 0.12s; }

.renew-panel .panel-head > div:first-child,
.alerts-panel .panel-head > div:first-child,
.top-panel .panel-head > div:first-child,
.act-panel .panel-head > div:first-child { flex: 1 1 150px; min-width: 0; }

.link-btn {
  flex-shrink: 0;
  margin-left: auto;
  padding: 5px 11px;
  border-radius: 8px;
  color: var(--blue);
  font-size: 12px;
  font-weight: 600;
  transition: background 0.2s, transform 0.2s;
}
.link-btn:hover { background: var(--blue-soft); transform: translateX(2px); }

.chip { flex-shrink: 0; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.chip-soon { background: var(--orange-soft); color: var(--orange); animation: chipPulse 2s ease-in-out infinite; }
.chip-upcoming { background: var(--blue-soft); color: var(--blue); }
.chip-expired { background: var(--red-soft); color: var(--red); }

.soft-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.soft-list.is-scroll { max-height: 330px; overflow-y: auto; padding-right: 4px; }
.empty-note { padding: 16px; border-radius: 10px; background: #f6f9fd; color: var(--muted); font-size: 12.5px; text-align: center; }

/* --- Upcoming renewals --- */
.renew-tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
.renew-tile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
  padding: 12px;
  border: 1.5px solid transparent;
  border-radius: 12px;
  color: var(--muted);
  font-size: 12px;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.renew-tile b { font-size: 26px; line-height: 1; letter-spacing: -0.01em; }
.renew-tile:hover { transform: translateY(-2px); }
.renew-tile.soon { --smoke-rgb: 37, 99, 235; background: var(--blue-soft); }
.renew-tile.soon b { color: var(--blue); }
.renew-tile.soon.on { border-color: var(--blue); box-shadow: 0 6px 16px rgba(37, 99, 235, 0.16); }
.renew-tile.exp { --smoke-rgb: 224, 56, 74; background: var(--red-soft); }
.renew-tile.exp b { color: var(--red); }
.renew-tile.exp.on { border-color: var(--red); box-shadow: 0 6px 16px rgba(224, 56, 74, 0.16); }

.renew-item,
.al-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  animation: rowIn 0.4s ease calc(var(--i, 0) * 60ms) both;
}
.renew-item:last-child,
.al-item:last-child { border-bottom: 0; }
.renew-name {
  flex: 1;
  min-width: 0;
  margin: -3px -6px;
  padding: 3px 6px;
  border-radius: 8px;
  text-align: left;
  transition: background 0.2s;
}
.renew-name:hover { background: var(--blue-soft); }
.renew-name strong, .al-info strong { display: block; font-size: 13px; line-height: 1.3; overflow-wrap: anywhere; }
.renew-panel .btn-toggle { margin-top: 12px; }

/* --- Payment alerts --- */
.al-tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
.al-tile {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  padding: 12px;
  border: 1.5px solid transparent;
  border-radius: 12px;
  color: var(--muted);
  font-size: 11.5px;
  line-height: 1.3;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
  animation: rowIn 0.45s ease calc(var(--i, 0) * 70ms) both;
}
.al-tile b { color: var(--text); font-size: 22px; line-height: 1.1; }
.al-tile em { font-size: 12px; font-style: normal; font-weight: 600; }
button.al-tile:hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(15, 36, 71, 0.09); }
.al-red { --smoke-rgb: 224, 56, 74; background: var(--red-soft); } .al-red em { color: var(--red); }
.al-orange { --smoke-rgb: 232, 137, 12; background: var(--orange-soft); } .al-orange em { color: var(--orange); }
.al-purple { --smoke-rgb: 139, 92, 246; background: #f3ebff; } .al-purple em { color: #7b3fd0; }
.al-green { --smoke-rgb: 22, 160, 91; background: var(--green-soft); } .al-green em { color: var(--green); }
.al-red, .al-orange { animation: rowIn 0.45s ease calc(var(--i, 0) * 70ms) both, alertPulse 2.2s ease-in-out calc(0.6s + var(--i, 0) * 0.4s) infinite; }
.btn-remind:not(.sent) { animation: alertPulse 2s ease-in-out calc(var(--i, 0) * 0.3s) infinite; }
.al-subtitle { margin-bottom: 2px; font-size: 13px; font-weight: 700; }
.al-info { flex: 1; min-width: 0; }
.al-info small.late { color: var(--red); }
.btn-remind {
  flex-shrink: 0;
  height: 28px;
  padding: 0 12px;
  border-radius: 8px;
  background: var(--blue-soft);
  color: var(--blue);
  font-size: 12px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s, transform 0.15s;
}
.btn-remind:hover { --smoke-rgb: 255, 255, 255; background: var(--blue); color: #fff; transform: translateY(-1px); }
.btn-remind.sent { --smoke-rgb: 22, 160, 91; background: var(--green-soft); color: var(--green); cursor: default; transform: none; animation: popIn 0.3s ease; }
.btn-bulk {
  --smoke-rgb: 255, 255, 255;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  margin-top: 14px;
  overflow: hidden;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--blue), #4f8bff);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: box-shadow 0.2s, transform 0.2s, opacity 0.2s;
}
.btn-bulk:hover:not(:disabled) { box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35); transform: translateY(-1px); }
.btn-bulk:disabled { opacity: 0.75; cursor: default; }
.spin { width: 14px; height: 14px; border: 2px solid rgba(255, 255, 255, 0.45); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }

/* --- Recent admin activity --- */
.act-list { gap: 10px; }
.act-list > li { animation: rowIn 0.45s ease calc(var(--i, 0) * 70ms) both; }
.act-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.act-item:hover { transform: translateX(3px); border-color: #cfdcf5; box-shadow: 0 6px 16px rgba(15, 36, 71, 0.07); }
.act-ico { display: grid; place-items: center; flex-shrink: 0; width: 38px; height: 38px; border-radius: 50%; font-size: 16px; font-weight: 700; transition: transform 0.25s; }
.act-ico { animation: qaIconRing 2.6s ease-out calc(var(--i, 0) * 0.35s) infinite; }
.act-new { margin-left: 8px; padding: 1px 8px; font-size: 10px; vertical-align: middle; }
.act-item:hover .act-ico { transform: scale(1.12) rotate(-6deg); }
.ico-green { --smoke-rgb: 22, 160, 91; background: var(--green-soft); color: var(--green); }
.ico-blue { --smoke-rgb: 37, 99, 235; background: var(--blue-soft); color: var(--blue); }
.ico-purple { --smoke-rgb: 123, 63, 208; background: #f0e6ff; color: #7b3fd0; }
.ico-orange { --smoke-rgb: 232, 137, 12; background: var(--orange-soft); color: var(--orange); }
.ico-red { --smoke-rgb: 224, 56, 74; background: var(--red-soft); color: var(--red); }
.act-body { flex: 1; min-width: 0; }
.act-body strong { display: block; font-size: 13px; line-height: 1.3; }
.act-body small { overflow-wrap: anywhere; }
.act-body small.act-time { font-size: 11.5px; opacity: 0.85; }
.act-arrow { color: var(--muted); font-size: 18px; transition: transform 0.2s; }
.act-item:hover .act-arrow { transform: translateX(3px); }

/* --- Top paying colleges --- */
.top-panel { container: tp / inline-size; }
.tc-head { display: none; }
.tc-row {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  grid-template-areas: "rank name rev" "rank bar plan";
  align-items: center;
  gap: 6px 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  animation: rowIn 0.4s ease calc(var(--i, 0) * 60ms) both;
}
.tc-row:last-child { border-bottom: 0; }
.tc-rank { grid-area: rank; display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: #eef3fb; color: var(--muted); font-size: 12px; font-weight: 700; }
.tc-rank.r1 { background: linear-gradient(135deg, #f8c75a, #e8a40c); color: #fff; }
.tc-rank.r2 { background: linear-gradient(135deg, #cfd7e4, #9aa8bd); color: #fff; }
.tc-rank.r3 { background: linear-gradient(135deg, #e9b98c, #c78248); color: #fff; }
.tc-name { grid-area: name; min-width: 0; margin: -3px -6px; padding: 3px 6px; border-radius: 8px; text-align: left; transition: background 0.2s; }
.tc-name:hover { background: var(--blue-soft); }
.tc-name strong { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 13px; line-height: 1.3; }
.tc-rev { grid-area: rev; justify-self: end; font-size: 13px; font-weight: 700; white-space: nowrap; }
.tc-txn { grid-area: txn; display: none; justify-self: center; color: var(--muted); font-size: 12.5px; }
.tc-plan { grid-area: plan; justify-self: end; }
.tc-bar { grid-area: bar; height: 5px; border-radius: 99px; background: var(--line); overflow: hidden; }
.tc-bar i { display: block; width: var(--w); height: 100%; border-radius: 99px; background: var(--c, var(--blue)); transform-origin: left; animation: barGrow 0.9s cubic-bezier(0.22, 0.9, 0.3, 1) calc(var(--i, 0) * 80ms + 0.2s) both; }
@container tp (min-width: 440px) {
  .tc-head,
  .tc-row { grid-template-columns: 28px minmax(0, 1fr) 88px 48px 74px; }
  .tc-row { grid-template-areas: "rank name rev txn plan" ". bar bar bar bar"; }
  .tc-head { display: grid; gap: 10px; padding: 0 0 8px; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 11.5px; font-weight: 600; }
  .tc-head span:nth-child(3), .tc-head span:nth-child(5) { text-align: right; }
  .tc-head span:nth-child(4) { text-align: center; }
  .tc-txn { display: block; }
}

/* --- toast --- */
.toast {
  position: fixed;
  left: 50%;
  bottom: 22px;
  z-index: 120;
  max-width: calc(100vw - 32px);
  padding: 11px 18px;
  border-radius: 12px;
  background: var(--navy);
  color: #fff;
  font-size: 13px;
  box-shadow: 0 12px 30px rgba(10, 18, 36, 0.35);
  transform: translateX(-50%);
  animation: toastIn 0.3s ease;
}
@keyframes toastIn { from { opacity: 0; transform: translate(-50%, 14px); } to { opacity: 1; transform: translate(-50%, 0); } }
@keyframes alertPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(var(--smoke-rgb), 0.4); } 50% { box-shadow: 0 0 0 5px rgba(var(--smoke-rgb), 0); } }
@keyframes chipPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(232, 137, 12, 0.35); } 50% { box-shadow: 0 0 0 5px rgba(232, 137, 12, 0); } }
@keyframes bulkShine { 0%, 60% { left: -40%; } 100% { left: 130%; } }
@keyframes spin { to { transform: rotate(360deg); } }

/* ---------- 10. Create Subscription (custom plan) ---------- */
.modal-form { display: flex; flex-direction: column; flex: 1; min-height: 0; }
.fld { display: flex; flex-direction: column; gap: 6px; font-size: 13px; font-weight: 600; }
.fld-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
textarea.field { height: auto; min-height: 88px; padding: 10px 14px; line-height: 1.45; resize: vertical; }
.field.invalid { border-color: var(--red); }
.fld-err { color: var(--red); font-size: 12px; font-style: normal; font-weight: 500; }
.fld-hint { color: var(--muted); font-size: 12px; font-weight: 400; }
.swatches { display: flex; flex-wrap: wrap; gap: 10px; }
.swatch {
  width: 34px;
  height: 34px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: rgb(var(--c));
  box-shadow: 0 0 0 1.5px var(--line);
  transition: transform 0.2s, box-shadow 0.2s;
}
.swatch:hover { transform: scale(1.12); }
.swatch.on { box-shadow: 0 0 0 2.5px rgb(var(--c)); }
.custom-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(var(--pc-rgb), 0.14);
  color: rgb(var(--pc-rgb));
  font-size: 11px;
  font-weight: 700;
}
.plan-card-custom { cursor: default; }
button.plan-cta { width: 100%; background: transparent; }
button.plan-cta:hover { background: rgba(var(--pc-rgb), 0.1); }
@media (max-width: 420px) { .fld-row { grid-template-columns: 1fr; } }

/* ---------- 11. Quick Actions (card design) ---------- */
.qk-panel { container: qk / inline-size; padding: 14px; background: linear-gradient(180deg, #ffffff, #f8faff); }
.qk-head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 14px 64px 14px 14px;
  overflow: hidden;
  border-radius: 14px;
  background: linear-gradient(135deg, #f4f8ff, #e9f0ff);
  animation: qkRise 0.6s cubic-bezier(0.22, 0.9, 0.3, 1) both;
}
.qk-head::before,
.qk-head::after { content: ""; position: absolute; border-radius: 50%; background: rgba(37, 99, 235, 0.07); }
.qk-head::before { right: -26px; top: -34px; width: 130px; height: 130px; }
.qk-head::after { right: 46px; bottom: -44px; width: 90px; height: 90px; }
.qk-head-ico {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #dce9ff;
  color: var(--blue);
  animation: qkZap 2.6s ease-out infinite;
}
.qk-head-ico svg { width: 22px; height: 22px; }
.qk-head-text { position: relative; z-index: 1; min-width: 0; }
.qk-head-text h2 { font-size: 18px; line-height: 1.2; }
.qk-head-text p { margin-top: 3px; color: var(--muted); font-size: 12.5px; }
.qk-gear { position: absolute; z-index: 1; right: 18px; top: 50%; width: 34px; height: 34px; margin-top: -17px; color: #7da2f5; animation: qkSpin 14s linear infinite; }
.qk-gear svg { width: 100%; height: 100%; }

.qk-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; }
.qk-card {
  --smoke-rgb: 37, 99, 235;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 32px;
  grid-template-areas: "ico text go";
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 12px;
  border: 1.5px solid rgba(var(--smoke-rgb), 0.26);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(var(--smoke-rgb), 0.08), #ffffff 62%);
  color: var(--text);
  text-align: left;
  transition: transform 0.2s, box-shadow 0.25s, border-color 0.25s;
  animation: qkRise 0.6s cubic-bezier(0.22, 0.9, 0.3, 1) calc(0.1s + var(--i, 0) * 0.09s) backwards;
}
.qk-card.qk-blue { --smoke-rgb: 37, 99, 235; }
.qk-card.qk-green { --smoke-rgb: 22, 160, 91; }
.qk-card.qk-purple { --smoke-rgb: 124, 58, 237; }
.qk-card.qk-orange { --smoke-rgb: 232, 137, 12; }
.qk-card.qk-teal { --smoke-rgb: 20, 170, 160; }
.qk-card:hover { transform: translateY(-2px); border-color: rgba(var(--smoke-rgb), 0.6); box-shadow: 0 10px 22px rgba(var(--smoke-rgb), 0.16); }
.qk-card:active { transform: scale(0.985); }
.qk-ico {
  grid-area: ico;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(var(--smoke-rgb), 0.14);
  color: rgb(var(--smoke-rgb));
  animation: qkFloat 3.6s ease-in-out calc(var(--i, 0) * 0.4s) infinite;
}
.qk-ico svg { width: 24px; height: 24px; }
.qk-text { grid-area: text; min-width: 0; }
.qk-text strong { display: block; font-size: 14.5px; line-height: 1.25; }
.qk-text small { margin-top: 3px; font-size: 12px; line-height: 1.4; }
.qk-go {
  grid-area: go;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(var(--smoke-rgb), 0.14);
  color: rgb(var(--smoke-rgb));
  transition: background 0.2s, color 0.2s;
}
.qk-go svg { width: 16px; height: 16px; animation: qkNudge 1.6s ease-in-out calc(var(--i, 0) * 0.2s) infinite; }
.qk-card:hover .qk-go { background: rgb(var(--smoke-rgb)); color: #fff; }
@keyframes qkRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes qkFloat { 0%, 100% { translate: 0 0; } 50% { translate: 0 -3px; } }
@keyframes qkSpin { to { transform: rotate(360deg); } }
@keyframes qkNudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(3px); } }
@keyframes qkZap { 0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); } 70%, 100% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); } }
@container qk (max-width: 330px) { .qk-gear { display: none; } .qk-head { padding-right: 14px; } }
@container qk (min-width: 520px) {
  .qk-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .qk-card:last-child { grid-column: 1 / -1; }
}
@container qk (min-width: 720px) {
  .qk-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  .qk-card { grid-column: span 2; grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: "ico ." "text go"; align-items: end; gap: 14px 12px; min-height: 150px; padding: 16px; }
  .qk-card:nth-child(-n + 2) { grid-column: span 3; }
  .qk-card:last-child { grid-column: span 2; }
  .qk-ico { width: 54px; height: 54px; border-radius: 14px; }
  .qk-ico svg { width: 28px; height: 28px; }
  .qk-text strong { font-size: 16px; }
}

/* ---------- 12. Download Reports modal ---------- */
.modal.modal-wide { max-width: 860px; }
.rp-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.rp-stat { padding: 12px 14px; border-radius: 12px; background: var(--blue-soft); animation: rowIn 0.4s ease calc(var(--i, 0) * 70ms) both; }
.rp-stat span { display: block; color: var(--muted); font-size: 12px; }
.rp-stat b { display: block; margin-top: 2px; font-size: 20px; letter-spacing: -0.01em; }
.rp-stat:nth-child(2) { background: #f0e6ff; }
.rp-stat:nth-child(3) { background: var(--green-soft); }
.rp-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.rp-search { flex: 1 1 200px; min-width: 0; }
.rp-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.rp-chip { padding: 7px 13px; border-radius: 999px; background: var(--bg); color: var(--muted); font-size: 12.5px; font-weight: 600; transition: background 0.2s, color 0.2s, transform 0.15s; }
.rp-chip:hover { transform: translateY(-1px); color: var(--text); }
.rp-chip.on { background: var(--blue); color: #fff; }
.rp-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 13px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: #fff;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.2s, border-color 0.2s, transform 0.15s;
}
.rp-btn:hover:not(:disabled) { transform: translateY(-1px); }
.rp-btn:disabled { opacity: 0.5; cursor: default; }
.rp-btn.ghost { color: var(--blue); }
.rp-btn.ghost:hover { background: var(--blue-soft); border-color: var(--blue); }
.rp-btn.xls { color: var(--green); }
.rp-btn.xls:hover:not(:disabled) { background: var(--green-soft); border-color: var(--green); }
.rp-btn.pdf { color: var(--red); }
.rp-btn.pdf:hover:not(:disabled) { background: var(--red-soft); border-color: var(--red); }
.rp-btn.done { border-color: var(--green); background: var(--green-soft); color: var(--green); animation: popIn 0.3s ease; }
.rp-btn .chev { display: inline-block; transition: transform 0.25s; }
.rp-btn[aria-expanded="true"] .chev { transform: rotate(180deg); }
.rp-dl { display: flex; gap: 6px; margin-left: auto; }
.rp-list { display: flex; flex-direction: column; gap: 10px; margin: 0; padding: 0; list-style: none; }
.rp-item { padding: 14px; border: 1px solid var(--line); border-radius: 14px; background: #fff; transition: box-shadow 0.2s, border-color 0.2s; animation: rowIn 0.4s ease calc(var(--i, 0) * 50ms) both; }
.rp-item:hover { border-color: #cfdcf5; box-shadow: 0 8px 20px rgba(15, 36, 71, 0.07); }
.rp-top { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; }
.rp-info { flex: 1 1 220px; min-width: 0; }
.rp-info strong { display: block; font-size: 14px; line-height: 1.3; overflow-wrap: anywhere; }
.rp-meta { display: flex; gap: 20px; }
.rp-meta span { display: block; color: var(--muted); font-size: 11.5px; }
.rp-meta b { font-size: 14px; }
.rp-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--line); }
.rp-students { margin-top: 12px; overflow: hidden; border: 1px solid var(--line); border-radius: 10px; animation: rpOpen 0.3s ease both; }
.rp-tablewrap { max-height: 260px; overflow: auto; }
.rp-table { width: 100%; min-width: 560px; border-collapse: collapse; font-size: 12.5px; }
.rp-table th { position: sticky; top: 0; padding: 8px 10px; background: #f3f7fd; color: var(--muted); font-size: 11.5px; font-weight: 600; text-align: left; }
.rp-table td { padding: 8px 10px; border-top: 1px solid var(--line); }
@keyframes rpOpen { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@media (max-width: 520px) {
  .rp-stats { grid-template-columns: 1fr 1fr; }
  .rp-stat:last-child { grid-column: 1 / -1; }
  .rp-dl { margin-left: 0; }
}
.plans-panel .panel-head > div:first-child { flex: 1 1 150px; min-width: 0; }

/* ============================================================
   RESPONSIVE - viewport based (shell: sidebar, topbar, modal)
   ============================================================ */
@media (max-width: 380px) {
  .sidebar { width: 230px; }
  .page-head h1 { font-size: 20px; }
}

@media (max-width: 1023px) {
  .icon-btn.menu-btn { display: grid; flex-shrink: 0; }
  .topbar { padding: 10px 14px; }
}
@media (max-width: 700px) {
  .top-profile__copy,
  .top-profile__chev { display: none; }
  .top-profile { padding-left: 0; }
}

@media (min-width: 640px) {
  .content { padding: 22px 22px 48px; }
  .modal-backdrop { align-items: center; padding: 20px; }
  .modal { max-width: 640px; border-radius: 20px; animation: popIn 0.25s ease; }
  .modal-foot .btn { flex: 0 0 auto; }
  .modal-foot .dl { flex: 0 0 auto; }
  .modal-foot .dl > button { width: auto; }
}

@media (min-width: 1024px) {
  .sidebar { transform: none; box-shadow: none; }
  .sidebar-overlay { display: none; }
  .main { margin-left: var(--side-w); }
  .content { padding: 26px 28px 56px; }
}

/* ============================================================
   RESPONSIVE - container based (page content)
   ============================================================ */
@container tx (min-width: 520px) {
  .tx-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .filters { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto; }
  .filters .search-wrap,
  .filters .chips { grid-column: 1 / -1; }
  .pager { flex-direction: row; justify-content: space-between; }
}

@container tx (min-width: 760px) {
  .plans-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .tx-bottom { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); }
  .tx-bottom .subs-panel { grid-column: 1 / -1; }
}

@container tx (min-width: 980px) {
  .usage { flex-direction: row; align-items: center; }
}

@container tx (min-width: 840px) {
  .table-wrap { display: block; }
  .tx-cards { display: none; }
}

@container tx (min-width: 1000px) {
  .tx-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .filters { grid-template-columns: minmax(0, 2.2fr) minmax(0, 1fr) minmax(0, 1fr) auto; }
  .filters .search-wrap { grid-column: auto; }
  .page-head h1 { font-size: 26px; }
  .col-no { display: table-cell; }
}

/* desktop: table on the left, plans sidebar on the right */
@container tx (min-width: 1240px) {
  .tx-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 20px;
    align-items: start;
  }
  .tx-main,
  .tx-side { display: flex; flex-direction: column; gap: 18px; min-width: 0; }
  .tx-main > *,
  .tx-side > * { order: 0; }
  .plans-grid { grid-template-columns: 1fr; }
  .tx-bottom { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); }
  .usage { flex-direction: column; }
}

@container tx (min-width: 1500px) {
  .usage { flex-direction: row; }
}

@container tx (min-width: 760px) {
  .side-extra { grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; }
}
@container tx (min-width: 1240px) {
  .side-extra { grid-template-columns: minmax(0, 1fr); }
}


/* ---------- Reference dashboard layout: compact laptop / desktop ---------- */
@container tx (min-width: 840px) and (max-width: 1239px) {
  .tx-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(180px, 0.29fr);
    gap: 12px;
    align-items: start;
  }
  .tx-main,
  .tx-side {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
  }
  .tx-main > *,
  .tx-side > * { order: 0; }
  .content { padding: 12px 10px 28px; }
  .page-head h1 { font-size: 21px; }
  .tx-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
  .tx-stat { gap: 8px; padding: 10px 8px; border-radius: 10px; }
  .tx-stat-icon { width: 32px; height: 32px; font-size: 15px; }
  .stat-label { font-size: 10px; }
  .stat-value { font-size: 16px; }
  .stat-note { font-size: 9px; line-height: 1.3; }
  .trend { top: 7px; right: 7px; font-size: 9px; }
  .panel { padding: 10px; border-radius: 11px; }
  .panel-head { gap: 6px; margin-bottom: 9px; }
  .panel-head h2, .uo-head h2 { font-size: 13px; }
  .panel-sub { font-size: 10px; }
  .filters { grid-template-columns: minmax(0, 1.8fr) minmax(0, .9fr) minmax(0, .9fr) auto; gap: 6px; }
  .field { height: 32px; padding: 0 8px; font-size: 10px; border-radius: 7px; }
  .search-wrap .field { padding-left: 27px; }
  .search-wrap .search-icon { left: 8px; font-size: 12px; }
  .chips { gap: 5px; }
  .chip { padding: 4px 7px; gap: 4px; font-size: 10px; }
  .chip-count { min-width: 15px; padding: 0 4px; font-size: 9px; line-height: 14px; }
  .btn { height: 30px; padding: 0 9px; font-size: 10px; border-radius: 7px; }
  .table { min-width: 0; font-size: 9px; }
  .table th { padding: 7px 5px; font-size: 8px; }
  .table td { padding: 7px 5px; font-size: 8px; }
  .table td .badge, .table td .plan { font-size: 8px; padding: 3px 5px; }
  .btn-view { height: 24px; padding: 0 6px; font-size: 9px; }
  .tx-bottom { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 10px; }
  .tx-bottom .subs-panel { grid-column: 1 / -1; }
  .usage { flex-direction: column; align-items: stretch; gap: 10px; }
  .uo-donut { width: 112px; height: 112px; align-self: center; }
  .uo-center strong { font-size: 17px; }
  .uo-list { gap: 5px; }
  .uo-row { padding: 7px 8px; }
  .uo-row-top { font-size: 10px; }
  .uo-row-top em, .uo-pct { font-size: 9px; }
  .uo-rev { margin-top: 10px; padding: 10px; }
  .uo-rev strong { font-size: 19px; }
  .uo-split-legend { font-size: 9px; gap: 5px 8px; }
  .plans-grid { grid-template-columns: 1fr; gap: 8px; }
  .plan-card { gap: 6px; padding: 9px; }
  .plan-card-top { gap: 7px; }
  .plan-icon { width: 28px; height: 28px; font-size: 13px; }
  .plan-card h3 { font-size: 11px; }
  .plan-price { font-size: 16px; }
  .plan-price small, .plan-limit, .plan-features li { font-size: 9px; }
  .plan-features { gap: 4px; }
  .plan-cta { height: 27px; font-size: 10px; }
  .recommended { top: 7px; right: 7px; padding: 2px 5px; font-size: 8px; }
  .rules-list { gap: 5px; margin: 8px 0; }
  .rules-list li { gap: 6px; padding: 6px; font-size: 9px; }
  .rules-list li::before { width: 16px; height: 16px; font-size: 9px; }
  .side-extra { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .renew-panel, .alerts-panel { min-width: 0; }
}
@container tx (min-width: 1240px) {
  .tx-layout { gap: 14px; grid-template-columns: minmax(0, 1fr) 280px; }
  .tx-main, .tx-side { gap: 14px; }
  .content { padding: 14px 12px 36px; }
}

/* ---------- Readable desktop sizing (leave Quick Actions, Upcoming Renewals and Payment Alerts unchanged) ---------- */
@container tx (min-width: 840px) {
  .content { padding: 20px 18px 42px; }
  .tx-layout { gap: 18px; }
  .page-head h1 { font-size: 25px; line-height: 1.3; }
  .page-head p { font-size: 14px; margin-top: 7px; }
  .tx-stats { gap: 12px; }
  .tx-stat { gap: 12px; padding: 14px 12px; min-height: 76px; }
  .tx-stat-icon { width: 38px; height: 38px; font-size: 18px; }
  .stat-label { font-size: 12px; }
  .stat-value { font-size: 20px; }
  .stat-note { font-size: 11px; line-height: 1.35; }
  .trend { top: 10px; right: 10px; font-size: 10px; }
  .filters-panel, .table-panel, .subs-panel, .usage-panel, .top-panel, .act-panel, .rules-panel, .plans-panel { padding: 14px; }
  .panel-head { gap: 9px; margin-bottom: 12px; }
  .panel-head h2, .uo-head h2 { font-size: 15px; }
  .table-panel .panel-head h2, .subs-panel .panel-head h2 { font-size: 18px; }
  .panel-sub { font-size: 11.5px; }
  .count { font-size: 11.5px; padding: 4px 9px; }
  .field { height: 38px; padding: 0 11px; font-size: 12px; border-radius: 9px; }
  .search-wrap .field { padding-left: 32px; }
  .search-wrap .search-icon { left: 10px; font-size: 14px; }
  .chips { gap: 7px; }
  .chip { padding: 6px 10px; gap: 6px; font-size: 11.5px; }
  .chip-count { min-width: 18px; font-size: 10px; line-height: 17px; }
  .btn { height: 36px; padding: 0 12px; font-size: 12px; border-radius: 8px; }
  .table { min-width: 850px; font-size: 11.5px; }
  .table th { padding: 12px 10px; font-size: 12px; }
  .table td { padding: 12px 10px; font-size: 13px; line-height: 1.45; }
  .table td .badge, .table td .plan { font-size: 10px; padding: 4px 7px; }
  .btn-view { height: 29px; padding: 0 9px; font-size: 11px; }
  .pager { margin-top: 13px; }
  .pager-btns button { min-width: 31px; height: 31px; font-size: 11px; }
  .sub-table { min-width: 760px; font-size: 11.5px; }
  .sub-table th { padding: 12px 10px; font-size: 12px; }
  .sub-table td { padding: 12px 10px; font-size: 13px; line-height: 1.45; }
  .meter { max-width: 100px; height: 7px; }
  .uo-donut { width: 140px; height: 140px; }
  .uo-center strong { font-size: 21px; }
  .uo-center > span { font-size: 11px; }
  .uo-row { padding: 9px 10px; }
  .uo-row-top { font-size: 11.5px; }
  .uo-row-top em, .uo-pct { font-size: 10.5px; }
  .uo-rev { padding: 13px; }
  .uo-rev strong { font-size: 22px; }
  .uo-split-legend { font-size: 10.5px; }
  .plans-grid { gap: 10px; }
  .plan-card { gap: 9px; padding: 13px; }
  .plan-card-top { gap: 10px; }
  .plan-icon { width: 36px; height: 36px; font-size: 16px; }
  .plan-card h3 { font-size: 13px; }
  .plan-price { font-size: 20px; }
  .plan-price small, .plan-limit, .plan-features li { font-size: 11px; }
  .plan-features { gap: 5px; }
  .plan-cta { height: 32px; font-size: 11.5px; }
  .recommended { top: 10px; right: 10px; padding: 3px 7px; font-size: 9px; }
  .rules-list { gap: 7px; margin: 10px 0 12px; }
  .rules-list li { gap: 8px; padding: 8px; font-size: 11px; }
  .rules-list li::before { width: 19px; height: 19px; font-size: 10px; }
  .top-panel .panel-head, .act-panel .panel-head { margin-bottom: 12px; }
  .table-wrap, .table-scroll { border-radius: 10px; }
}
@container tx (min-width: 1240px) {
  .tx-layout { grid-template-columns: minmax(0, 1fr) 300px; gap: 18px; }
  .content { padding: 20px 18px 42px; }
  .tx-main, .tx-side { gap: 16px; }
  .table { min-width: 850px; }
}

/* ============================================================
   MODES
   ============================================================ */
/* embedded: rendered inside AdminDashboard (it already has sidebar + topbar) */
.app.app-embedded { display: block; min-height: 0; background: transparent; }
.app.app-embedded .main { margin-left: 0; }
.app.app-embedded .content { padding: 0; }

/* standalone: pinned to the whole browser window, so a parent such as
   #root { max-width; padding; text-align: center } can never squeeze it */
.app:not(.app-embedded) {
  position: fixed;
  inset: 0;
  z-index: 1;
  min-height: 0;
  align-items: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
}
`;

/* ------------------------------------------------------------------ */
/* 1. DATA                                                             */
/* ------------------------------------------------------------------ */

// [college name, type, district]
const COLLEGE_LIST = [
  // Coimbatore (1-20)
  ["PSG College of Technology", "Engineering", "Coimbatore"],
  ["Coimbatore Institute of Technology (CIT)", "Engineering", "Coimbatore"],
  ["Government College of Technology (GCT)", "Engineering", "Coimbatore"],
  ["Kumaraguru College of Technology", "Engineering", "Coimbatore"],
  ["SNS College of Technology", "Engineering", "Coimbatore"],
  ["PSG College of Arts and Science", "Arts & Science", "Coimbatore"],
  ["Hindusthan College of Arts and Science", "Arts & Science", "Coimbatore"],
  ["Sri Krishna Arts and Science College", "Arts & Science", "Coimbatore"],
  [
    "Sri Ramakrishna College of Arts and Science",
    "Arts & Science",
    "Coimbatore",
  ],
  [
    "Government Arts and Science College, Mettupalayam",
    "Arts & Science",
    "Coimbatore",
  ],
  ["Coimbatore Medical College", "Medical", "Coimbatore"],
  ["PSG Institute of Medical Sciences and Research", "Medical", "Coimbatore"],
  [
    "KMCH Institute of Health Sciences and Research",
    "Medical / Allied Health",
    "Coimbatore",
  ],
  ["PSG College of Nursing", "Nursing", "Coimbatore"],
  ["Sri Ramakrishna College of Nursing", "Nursing", "Coimbatore"],
  ["PSG College of Pharmacy", "Pharmacy", "Coimbatore"],
  ["Karpagam College of Pharmacy", "Pharmacy", "Coimbatore"],
  ["Tamil Nadu Agricultural University (TNAU)", "Agriculture", "Coimbatore"],
  ["Government Law College, Coimbatore", "Law", "Coimbatore"],
  [
    "Karpagam Academy of Higher Education",
    "Engineering / Multidisciplinary",
    "Coimbatore",
  ],
  // Chennai (21-32)
  [
    "Indian Institute of Technology Madras (IIT Madras)",
    "Engineering",
    "Chennai",
  ],
  ["College of Engineering, Guindy (CEG)", "Engineering", "Chennai"],
  [
    "Madras Institute of Technology (MIT), Anna University",
    "Engineering",
    "Chennai",
  ],
  ["SSN College of Engineering", "Engineering", "Chennai"],
  ["Loyola College", "Arts & Science", "Chennai"],
  ["Presidency College, Chennai", "Arts & Science", "Chennai"],
  ["Women's Christian College, Chennai", "Arts & Science", "Chennai"],
  ["Madras Medical College", "Medical", "Chennai"],
  ["Stanley Medical College", "Medical", "Chennai"],
  ["College of Nursing, Madras Medical College", "Nursing", "Chennai"],
  [
    "Tamil Nadu Dr. M.G.R. Medical University",
    "Medical / Health Sciences",
    "Chennai",
  ],
  ["Tamil Nadu Dr. Ambedkar Law University", "Law", "Chennai"],
  // Erode (33-40)
  ["Government College of Engineering, Erode", "Engineering", "Erode"],
  ["Institute of Road and Transport Technology (IRTT)", "Engineering", "Erode"],
  ["Erode Arts and Science College", "Arts & Science", "Erode"],
  ["Gobi Arts and Science College", "Arts & Science", "Erode"],
  ["Chikkaiah Government Arts and Science College", "Arts & Science", "Erode"],
  ["IRT Perundurai Medical College", "Medical", "Erode"],
  ["The Erode College of Pharmacy", "Pharmacy", "Erode"],
  ["Nandha College of Nursing", "Nursing", "Erode"],
];

// District STD codes. Phone numbers below are SAMPLE numbers - replace with real ones.
const STD_CODE = { Coimbatore: "0422", Chennai: "044", Erode: "0424" };

const PLANS = {
  Elite: {
    price: 899,
    limit: 10,
    features: [
      "Basic student lead access",
      "Contact details for purchased profiles",
      "Email & phone verification",
    ],
  },
  Gold: {
    price: 1799,
    limit: 25,
    features: [
      "All Elite features",
      "More student leads & profile history",
      "Priority support",
    ],
  },
  Diamond: {
    price: 3599,
    limit: 60,
    features: [
      "All Gold features",
      "Higher profile limit",
      "Detailed usage reports",
      "Dedicated support",
    ],
  },
};
const PLAN_NAMES = Object.keys(PLANS);

const STUDENTS = [
  "Arun Kumar",
  "Divya Bharathi",
  "Karthik Raja",
  "Meena Lakshmi",
  "Suresh Babu",
  "Priya Dharshini",
  "Vignesh Waran",
  "Anitha Selvam",
  "Hari Prasad",
  "Nandhini Devi",
];
const BANKS = ["SBI", "HDFC Bank", "ICICI Bank", "Indian Bank", "Canara Bank"];
const UPI_HANDLES = ["@okhdfcbank", "@oksbi", "@ybl", "@paytm", "@okicici"];
const CARD_NETWORKS = ["Visa", "Mastercard", "RuPay"];
const STATUS_CYCLE = [
  "Success",
  "Success",
  "Pending",
  "Success",
  "Failed",
  "Success",
  "Refunded",
  "Success",
];
const METHODS = ["UPI", "Card", "Net Banking"];
const FAIL_REASONS = [
  ["Insufficient balance in account", "ERR_INSUFFICIENT_FUNDS"],
  ["Bank server timeout", "ERR_BANK_TIMEOUT"],
  ["Payment declined by the bank", "ERR_BANK_DECLINED"],
  ["Incorrect UPI PIN / OTP entered", "ERR_AUTH_FAILED"],
  ["Card expired or blocked", "ERR_CARD_INVALID"],
  ["Cancelled by the user", "ERR_USER_CANCELLED"],
];
const PENDING_REASONS = [
  "Waiting for confirmation from the bank",
  "Payment gateway is still processing",
  "UPI request not yet approved by the user",
];
const REFUND_REASONS = [
  "Duplicate payment received",
  "Plan cancelled within 24 hours",
  "Profiles were not activated (technical issue)",
  "Plan changed - amount returned",
];

// Build 40 transactions (one per college) with predictable demo values
const TRANSACTIONS = COLLEGE_LIST.map(([college, type, district], i) => {
  const plan = PLAN_NAMES[i % 3];
  const student = STUDENTS[i % STUDENTS.length];
  const method = METHODS[(i + Math.floor(i / 3)) % 3];
  const status = STATUS_CYCLE[i % STATUS_CYCLE.length];
  const date = new Date(2025, 3, 30 - (i % 30), 9 + (i % 10), (i * 7) % 60);
  const last4 = String(1000 + ((i * 7919) % 9000));
  const slug = student.toLowerCase().replace(/\s+/g, ".");

  let payment;
  if (method === "UPI") {
    payment = { label: "UPI ID", value: slug + UPI_HANDLES[i % 5] };
  } else if (method === "Card") {
    payment = {
      label: "Card Number",
      value: `•••• •••• •••• ${last4}`,
      extra: CARD_NETWORKS[i % 3] + " Credit/Debit",
    };
  } else {
    payment = {
      label: "Account Number",
      value: `•••••••• ${last4}`,
      extra: BANKS[i % 5],
    };
  }

  // Why a transaction is Pending / Failed / Refunded
  let statusInfo = null;
  if (status === "Failed") {
    const [reason, code] = FAIL_REASONS[i % FAIL_REASONS.length];
    statusInfo = { title: "Failure details", rows: [["Failure reason", reason], ["Error code", code], ["Amount debited", "No - nothing was deducted"]] };
  } else if (status === "Pending") {
    statusInfo = { title: "Pending details", rows: [["Pending reason", PENDING_REASONS[i % PENDING_REASONS.length]], ["Amount status", "Held - will be confirmed shortly"]] };
  } else if (status === "Refunded") {
    const refundDate = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
    statusInfo = { title: "Refund details", rows: [["Refund reason", REFUND_REASONS[i % REFUND_REASONS.length]], ["Refund ID", `RFD${String(500000 + i * 211)}`], ["Refund date", refundDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })], ["Refunded to", method === "UPI" ? "Same UPI ID" : method === "Card" ? "Same card" : "Same bank account"], ["Credit time", "5-7 working days"]] };
  }

  return {
    id: `TXN${String(1001 + i)}`,
    no: i + 1,
    college,
    type,
    district,
    phone: `+91 ${STD_CODE[district]} ${String(2200000 + i * 13579).slice(0, 7)}`,
    email: `admissions@college${i + 1}.edu.in`,
    studentId: `STU${1023 + i * 3}`,
    student,
    studentPhone: `+91 9${String(400000000 + i * 7654321).slice(0, 9)}`,
    plan,
    amount: PLANS[plan].price,
    method,
    payment,
    status,
    date,
    refId: `REF${String(900000 + i * 137)}`,
    statusInfo,
  };
});

/* ------------------------------------------------------------------ */
/* 2. HELPERS                                                          */
/* ------------------------------------------------------------------ */

const PAGE_SIZE = 6;
const rupee = (n) => "₹" + n.toLocaleString("en-IN");
const fmtDate = (d) =>
  d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const fmtTime = (d) =>
  d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
const statusClass = (s) => `badge badge-${s.toLowerCase()}`;

const NAV_ITEMS = [
  ["Dashboard", "⌂", "/admin/dashboard"],
  ["Students", "☺", "/admin/students"],
  ["Colleges", "▦", "/admin/colleges"],
  ["Courses", "▭", "/admin/courses"],
  ["Applications", "✉", "/admin/applications"],
  ["Transactions", "₹", "/admin/transactions"],
  ["Reports", "◑", "/admin/reports"],
  ["Users", "♙", "/admin/users"],
  ["Settings", "⚙", "/admin/settings"],
];

const STATUS_FILTERS = ["All", "Success", "Pending", "Failed", "Refunded"];
const METHOD_ICON = { UPI: "◈", Card: "▭", "Net Banking": "⌂" };
const PLAN_COLOR = { Elite: "#3b82f6", Gold: "#f5b83d", Diamond: "#8b5cf6" };
const PLAN_ICON = { Elite: "♛", Gold: "♛", Diamond: "◆" };

const PLAN_RULES = [
  "Limit type: new profiles each month",
  "Unused profiles: reset at month end",
  "A profile is counted only once per college",
  "Access to contact details after successful payment",
  "Each subscription is valid for one month from the payment date",
  "Failed or pending payments do not unlock any profiles",
  "Refunded payments remove access to the purchased profiles",
  "Plan upgrades take effect after the new payment succeeds",
];
const RULES_PREVIEW = 4;

// Page numbers with "…" gaps, e.g. 1 2 3 … 10
function pageList(total, current) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = new Set([1, total, current - 1, current, current + 1]);
  const nums = [...keep].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push(`gap-${n}`);
    out.push(n);
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* 2a. DOWNLOADS  (PDF + Excel, no extra libraries needed)             */
/* ------------------------------------------------------------------ */
// PDF   -> opens the browser print dialog with a clean layout: choose "Save as PDF".
// Excel -> downloads an .xls file that opens directly in Microsoft Excel.
//          (If you want a real .xlsx later, run `npm i xlsx` and swap saveExcel().)

const EXPORT_HEAD = [
  "Transaction ID",
  "College",
  "District",
  "Student ID",
  "Student",
  "Plan",
  "Amount (INR)",
  "Method",
  "Date & Time",
  "Status",
];
const exportRow = (t) => [
  t.id,
  t.college,
  t.district,
  t.studentId,
  t.student,
  t.plan,
  t.amount,
  t.method,
  `${fmtDate(t.date)} ${fmtTime(t.date)}`,
  t.status,
];
const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const stamp = () => new Date().toISOString().slice(0, 10);

const PRINT_CSS = `
@page { size: A4; margin: 14mm; }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; color: #0f1b33; font: 12px/1.5 "Segoe UI", Arial, sans-serif; }
.hd { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 3px solid #2563eb; }
h1 { margin: 0; font-size: 22px; }
h2 { margin: 18px 0 6px; color: #2563eb; font-size: 13px; letter-spacing: .06em; text-transform: uppercase; }
p { margin: 4px 0 0; color: #66758f; }
.tot { text-align: right; }
.tot span { display: block; color: #66758f; }
.tot strong { color: #2563eb; font-size: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 7px 8px; border: 1px solid #e1e7f2; text-align: left; vertical-align: top; }
thead th { background: #0f2447; color: #fff; font-size: 11px; }
tbody tr:nth-child(even) td { background: #f6f8fd; }
tr { page-break-inside: avoid; }
.kv th { width: 36%; background: #f1f5fd; color: #46546f; font-weight: 600; }
.b { display: inline-block; padding: 2px 10px; border-radius: 99px; font-size: 11px; font-weight: 700; }
.b.success, .b.active { background: #e4f7ec; color: #16a05b; }
.b.pending { background: #fff2de; color: #e8890c; }
.b.failed, .b.expired { background: #fde7ea; color: #e0384a; }
.b.refunded { background: #eceff5; color: #566380; }
.amt { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #eaf1ff; }
.amt span { color: #66758f; }
.amt strong { color: #2563eb; font-size: 26px; }
.amt em { margin-left: auto; color: #0f2447; font-style: normal; font-weight: 700; }
.foot { margin-top: 22px; font-size: 11px; text-align: center; }
`;

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function saveExcel(fileName, sheetName, tableHtml) {
  const html =
    `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">` +
    `<head><meta charset="utf-8" />` +
    `<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${esc(sheetName)}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->` +
    `<style>td,th{border:1px solid #cbd5e1;padding:4px 8px;font-family:Calibri,Arial,sans-serif}th{background:#0f2447;color:#ffffff;font-weight:bold;text-align:left}</style>` +
    `</head><body>${tableHtml}</body></html>`;
  saveBlob(
    new Blob(["\ufeff", html], { type: "application/vnd.ms-excel;charset=utf-8" }),
    `${fileName}.xls`,
  );
}

function printPdf(title, bodyHtml) {
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText =
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;";
  document.body.appendChild(frame);
  const doc = frame.contentWindow.document;
  doc.open();
  doc.write(
    `<!doctype html><html><head><meta charset="utf-8" /><title>${esc(title)}</title><style>${PRINT_CSS}</style></head><body>${bodyHtml}</body></html>`,
  );
  doc.close();
  frame.contentWindow.onafterprint = () => setTimeout(() => frame.remove(), 500);
  setTimeout(() => {
    frame.contentWindow.focus();
    frame.contentWindow.print();
  }, 300);
  setTimeout(() => frame.remove(), 120000); // safety clean-up
}

// All / filtered transactions -> PDF or Excel
function exportTransactions(list, format) {
  const name = `transactions-${stamp()}`;
  if (format === "excel") {
    const head = EXPORT_HEAD.map((h) => `<th>${esc(h)}</th>`).join("");
    const body = list
      .map(
        (t) =>
          `<tr>${exportRow(t)
            .map((c) => `<td>${esc(c)}</td>`)
            .join("")}</tr>`,
      )
      .join("");
    saveExcel(name, "Transactions", `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`);
    return;
  }
  const revenue = list
    .filter((t) => t.status === "Success")
    .reduce((s, t) => s + t.amount, 0);
  const rowsHtml = list
    .map(
      (t) =>
        `<tr><td>${esc(t.id)}</td><td>${esc(t.college)}<br/>${esc(t.district)}</td><td>${esc(t.studentId)}<br/>${esc(t.student)}</td><td>${esc(t.plan)}</td><td>${esc(rupee(t.amount))}</td><td>${esc(t.method)}</td><td>${esc(fmtDate(t.date))}<br/>${esc(fmtTime(t.date))}</td><td><span class="b ${t.status.toLowerCase()}">${esc(t.status)}</span></td></tr>`,
    )
    .join("");
  printPdf(
    name,
    `<div class="hd"><div><h1>Transactions Report</h1><p>StudentCollege Admission Platform · ${esc(fmtDate(new Date()))} · ${list.length} transactions</p></div><div class="tot"><span>Successful revenue</span><strong>${esc(rupee(revenue))}</strong></div></div>` +
      `<table><thead><tr><th>Transaction ID</th><th>College</th><th>Student</th><th>Plan</th><th>Amount</th><th>Method</th><th>Date &amp; Time</th><th>Status</th></tr></thead><tbody>${rowsHtml}</tbody></table>`,
  );
}

// One transaction receipt -> PDF or Excel
function receiptSections(tx) {
  return [
    [
      "Transaction",
      [
        ["Transaction ID", tx.id],
        ["Date & Time", `${fmtDate(tx.date)} · ${fmtTime(tx.date)}`],
        ["Status", tx.status],
        ["Plan", `${tx.plan} (${PLANS[tx.plan].limit} profiles / month)`],
        ["Amount", rupee(tx.amount)],
      ],
    ],
    [
      "Student details",
      [
        ["Name", tx.student],
        ["Student ID", tx.studentId],
        ["Phone", tx.studentPhone],
      ],
    ],
    [
      "College details",
      [
        ["College", tx.college],
        ["Type", tx.type],
        ["District", tx.district],
        ["Phone", tx.phone],
        ["Email", tx.email],
      ],
    ],
    [
      "Payment details",
      [
        ["Method", tx.method],
        [tx.payment.label, tx.payment.value],
        ...(tx.payment.extra
          ? [[tx.method === "Card" ? "Card type" : "Bank", tx.payment.extra]]
          : []),
        ["Reference ID", tx.refId],
      ],
    ],
  ];
}

function exportReceipt(tx, format) {
  const name = `receipt-${tx.id}`;
  const sections = receiptSections(tx);
  if (format === "excel") {
    const body = sections
      .map(
        ([title, rows]) =>
          `<tr><th colspan="2">${esc(title)}</th></tr>` +
          rows.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join(""),
      )
      .join("");
    saveExcel(name, tx.id, `<table>${body}</table>`);
    return;
  }
  printPdf(
    name,
    `<div class="hd"><div><h1>Payment Receipt</h1><p>StudentCollege Admission Platform · ${esc(tx.id)}</p></div><span class="b ${tx.status.toLowerCase()}">${esc(tx.status)}</span></div>` +
      `<div class="amt"><span>Amount</span><strong>${esc(rupee(tx.amount))}</strong><em>${esc(tx.plan)} plan</em></div>` +
      sections
        .map(
          ([title, rows]) =>
            `<h2>${esc(title)}</h2><table class="kv">${rows
              .map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`)
              .join("")}</table>`,
        )
        .join("") +
      `<p class="foot">This is a system generated receipt.</p>`,
  );
}

/* ------------------------------------------------------------------ */
/* 2b. SUBSCRIPTIONS (derived from successful payments)                */
/* ------------------------------------------------------------------ */
// NOTE: "profiles used" is demo data. Replace it with the real value from
// your API when the backend is ready.

const AS_OF = new Date(Math.max(...TRANSACTIONS.map((t) => t.date.getTime())));

const SUBSCRIPTIONS = TRANSACTIONS.filter((t) => t.status === "Success")
  .map((t) => {
    const end = new Date(t.date);
    end.setMonth(end.getMonth() + 1);
    end.setDate(end.getDate() - 1);
    const total = PLANS[t.plan].limit;
    const used = Math.min(total, 2 + ((t.no * 7) % total));
    return {
      tx: t,
      college: t.college,
      plan: t.plan,
      amount: t.amount,
      start: t.date,
      end,
      used,
      total,
      status: end >= AS_OF ? "Active" : "Expired",
    };
  })
  .sort((a, b) => b.start - a.start);

const RECENT_SUBS = SUBSCRIPTIONS.slice(0, 5);

const USAGE = PLAN_NAMES.map((plan) => {
  const list = SUBSCRIPTIONS.filter((s) => s.plan === plan);
  return {
    plan,
    colleges: list.length,
    used: list.reduce((n, s) => n + s.used, 0),
    total: list.reduce((n, s) => n + s.total, 0),
  };
});
const USAGE_USED = USAGE.reduce((n, u) => n + u.used, 0);
const USAGE_TOTAL = USAGE.reduce((n, u) => n + u.total, 0);

// Successful revenue split per plan (used in the usage overview card)
const REV_BY_PLAN = PLAN_NAMES.map((plan) => ({
  plan,
  amount: TRANSACTIONS.filter((t) => t.status === "Success" && t.plan === plan).reduce(
    (s, t) => s + t.amount,
    0,
  ),
}));

// How many transactions per status chip (All / Success / ...)
const STATUS_COUNT = Object.fromEntries(
  STATUS_FILTERS.map((s) => [
    s,
    s === "All" ? TRANSACTIONS.length : TRANSACTIONS.filter((t) => t.status === s).length,
  ]),
);

/* ------------------------------------------------------------------ */
/* 2c. RENEWALS / PAYMENT ALERTS / TOP COLLEGES / ADMIN ACTIVITY       */
/* ------------------------------------------------------------------ */
// NOTE: all of this is derived from the demo data above. Swap these
// constants for real API data when the backend is ready.

const DAY_MS = 24 * 60 * 60 * 1000;
const daysFromNow = (d) => Math.ceil((d - AS_OF) / DAY_MS);
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
const pad2 = (n) => String(n).padStart(2, "0");

// Upcoming renewals
const RENEW_ACTIVE = SUBSCRIPTIONS.filter((s) => s.status === "Active").sort((a, b) => a.end - b.end);
const RENEW_SOON = RENEW_ACTIVE.filter((s) => daysFromNow(s.end) <= 7);
const RENEW_EXPIRED = SUBSCRIPTIONS.filter((s) => s.status === "Expired").sort((a, b) => b.end - a.end);
const RENEW_ALL = [...RENEW_ACTIVE, ...RENEW_EXPIRED];
const RENEW_PREVIEW = 3;

const renewLabel = (s) => {
  const n = daysFromNow(s.end);
  if (s.status === "Expired") return n < 0 ? `Expired ${plural(-n, "day")} ago` : "Expired today";
  return n <= 0 ? "Expires today" : `Expires in ${plural(n, "day")}`;
};
const renewChip = (s) =>
  s.status === "Expired" ? ["Expired", "expired"] : daysFromNow(s.end) <= 3 ? ["Soon", "soon"] : ["Upcoming", "upcoming"];

// Payment alerts
const sumAmt = (list) => list.reduce((n, t) => n + t.amount, 0);
const PENDING_TX = TRANSACTIONS.filter((t) => t.status === "Pending")
  .map((t) => ({ tx: t, due: new Date(t.date.getTime() + 7 * DAY_MS) }))
  .sort((a, b) => a.due - b.due);
const FAILED_TX = TRANSACTIONS.filter((t) => t.status === "Failed");
const REFUNDED_TX = TRANSACTIONS.filter((t) => t.status === "Refunded");
const ALERT_PREVIEW = 3;
const dueLabel = (due) => {
  const n = daysFromNow(due);
  return n < 0 ? "Overdue" : n === 0 ? "Due today" : `Due in ${plural(n, "day")}`;
};

// Recent admin activity
const ACT_SRC = [
  ["↺", "green", "Refund approved", REFUNDED_TX[0], (t) => `${t.id} - ${t.college}`, 15],
  ["＋", "blue", "Subscription created", SUBSCRIPTIONS[1]?.tx, (t) => t.college, 165],
  ["▲", "purple", "Plan upgraded", SUBSCRIPTIONS[2]?.tx, (t) => t.college, 400],
  ["₹", "green", "Payment received", SUBSCRIPTIONS[0]?.tx, (t) => t.college, 1500],
  ["✉", "orange", "Reminder sent", PENDING_TX[0]?.tx, (t) => `${t.college} - ${rupee(t.amount)}`, 2000],
  ["✕", "red", "Payment failed", FAILED_TX[0], (t) => `${t.id} - ${t.college}`, 2900],
  ["↺", "green", "Refund approved", REFUNDED_TX[1], (t) => `${t.id} - ${t.college}`, 4300],
  ["⟳", "blue", "Subscription renewed", SUBSCRIPTIONS[3]?.tx, (t) => t.college, 5800],
];
const ACTIVITY = ACT_SRC.filter((r) => r[3]).map(([icon, tone, title, tx, fn, mins], i) => ({
  key: `${title}-${tx.id}-${i}`,
  icon,
  tone,
  title,
  tx,
  text: fn(tx),
  when: new Date(AS_OF.getTime() - mins * 60000),
}));
const ACT_PREVIEW = 4;

// Top paying colleges (successful payments only)
const TOP_COLLEGES = (() => {
  const map = new Map();
  TRANSACTIONS.filter((t) => t.status === "Success").forEach((t) => {
    const e = map.get(t.college) || { college: t.college, district: t.district, revenue: 0, count: 0, plans: {}, tx: t };
    e.revenue += t.amount;
    e.count += 1;
    e.plans[t.plan] = (e.plans[t.plan] || 0) + t.amount;
    map.set(t.college, e);
  });
  return [...map.values()]
    .map((e) => ({ ...e, plan: Object.entries(e.plans).sort((a, b) => b[1] - a[1])[0][0] }))
    .sort((a, b) => b.revenue - a.revenue || a.college.localeCompare(b.college));
})();
const TOP_MAX = TOP_COLLEGES[0]?.revenue || 1;
const TOP_PREVIEW = 5;
const TOP_LIMIT = 10;

/* ------------------------------------------------------------------ */
/* 3. SMALL COMPONENTS                                                 */
/* ------------------------------------------------------------------ */

// Where the login page lives in your router. Change this to your real login URL
// (the address you see in the browser when the login page is open, e.g. "/" or "/admin/login").
const LOGIN_PATH = "/login";

// Logout: wipe EVERYTHING that says "this admin is logged in", fade the page out,
// then do a full reload on the login page so no saved login state can send us back to the dashboard.
function useLogout() {
  return () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0].trim();
        if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });
    } catch {
      /* storage not available - ignore */
    }
    document.querySelector(".app")?.classList.add("is-leaving");
    setTimeout(() => window.location.replace(LOGIN_PATH), 350);
  };
}

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logout = useLogout();

  // Go to the page, then close the mobile menu
  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        className={`sidebar-overlay ${open ? "show" : ""}`}
        aria-label="Close navigation menu"
        onClick={onClose}
      />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-logo">🎓</div>
          <div>
            <strong>StudentCollege</strong>
            <small>Admission Platform</small>
          </div>
        </div>

        <p className="nav-title">Main Menu</p>
        <nav className="nav">
          {NAV_ITEMS.map(([name, icon, path]) => (
            <button
              key={name}
              type="button"
              className={`nav-item ${pathname === path ? "active" : ""}`}
              onClick={() => goTo(path)}
            >
              <span className="nav-icon">{icon}</span>
              {name}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <strong>Admin</strong>
              <small>Super Admin</small>
            </div>
          </div>
          <button type="button" className="logout" onClick={logout}>
            ↪ Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function StatCard({ icon, tone, label, value, note, trend }) {
  const down = trend.startsWith("-");
  return (
    <div className={`tx-stat smoke st-${tone}`} {...smokeProps}>
      <div className={`tx-stat-icon tone-${tone}`}>{icon}</div>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <strong className="stat-value">{value}</strong>
        <span className="stat-note">{note}</span>
      </div>
      <span className={`trend ${down ? "down" : "up"}`}>
        {down ? "↓" : "↑"} {trend.replace("-", "")}
      </span>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PageButtons({ total, current, onChange }) {
  return (
    <div className="pager-btns">
      <button
        type="button"
        aria-label="Previous page"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        ‹
      </button>
      {pageList(total, current).map((n) =>
        typeof n === "number" ? (
          <button
            key={n}
            type="button"
            className={n === current ? "active" : ""}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ) : (
          <span key={n} className="pager-gap">
            …
          </span>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        ›
      </button>
    </div>
  );
}

// Smoke hover effect: remember where the cursor is inside the element (CSS does the rest)
function smoke(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
  // mouse: CSS :hover does the job. touch / pen / Inspect-mode emulation: switch the smoke on with a class
  if (e.pointerType && e.pointerType !== "mouse") {
    el.classList.add("is-smoking");
    clearTimeout(el._smokeTimer);
    el._smokeTimer = setTimeout(() => el.classList.remove("is-smoking"), 1200);
  }
}
const smokeProps = { onPointerMove: smoke, onPointerEnter: smoke, onPointerDown: smoke };

// Monthly Revenue smoke: smoke follows the cursor and its colour (hue) changes with the cursor position
function revSmoke(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  const hue = Math.round(140 + (x / r.width) * 200 + (y / r.height) * 30); // green > blue > purple > pink > red
  el.style.setProperty("--mx", `${x}px`);
  el.style.setProperty("--my", `${y}px`);
  el.style.setProperty("--mx2", `${r.width - x * 0.6}px`);
  el.style.setProperty("--my2", `${r.height - y * 0.6}px`);
  el.style.setProperty("--sh", hue);
}
function revSmokeReset(e) {
  const el = e.currentTarget;
  ["--mx", "--my", "--mx2", "--my2", "--sh"].forEach((v) => el.style.removeProperty(v));
}
const revSmokeProps = {
  onPointerMove: revSmoke,
  onPointerDown: revSmoke,
  onPointerLeave: revSmokeReset,
  onPointerCancel: revSmokeReset,
};

// Button that opens a small "Download as PDF / Excel" menu
function DownloadMenu({
  onPick,
  children,
  triggerClass = "btn btn-primary",
  triggerProps,
  up = false,
  block = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation(); // close only the menu, not the modal behind it
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", away, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("pointerdown", away, true);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const pick = (format) => {
    setOpen(false);
    onPick(format);
  };

  return (
    <div className={`dl ${block ? "block" : ""}`} ref={ref}>
      <button
        type="button"
        className={triggerClass}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        {...triggerProps}
      >
        {children}
      </button>
      {open && (
        <div className={`dl-pop ${up ? "up" : ""} ${block ? "block" : ""}`} role="menu">
          <p className="dl-title">Download as</p>
          <button type="button" role="menuitem" className="dl-item" onClick={() => pick("pdf")}>
            <span className="dl-ico pdf">PDF</span>
            <span>
              <strong>PDF document</strong>
              <small>Choose “Save as PDF” in the dialog</small>
            </span>
          </button>
          <button type="button" role="menuitem" className="dl-item" onClick={() => pick("excel")}>
            <span className="dl-ico xls">XLS</span>
            <span>
              <strong>Excel sheet</strong>
              <small>Opens directly in Excel</small>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

// Subscription Usage Overview: interactive donut + plan bars + revenue split
function UsageOverview({ revenue, planSel, planHover }) {
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null); // tapped / clicked plan (works on touch & Inspect mode)
  const popRef = useRef(null);
  const toggleSel = (plan) => setSelected((cur) => (cur === plan ? null : plan));
  const shown = hover || planHover || selected || planSel; // donut/row hover > plan-card hover > clicked > plan filter
  const R = 56;
  const C = 2 * Math.PI * R;
  const GAP = 3;
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

  let acc = 0;
  const segs = USAGE.map((u) => {
    const len = (u.used / (USAGE_USED || 1)) * C;
    const seg = { ...u, len, offset: acc };
    acc += len;
    return seg;
  });
  const active = USAGE.find((u) => u.plan === shown);
  // once the usage popup is open (click), it follows whichever plan the mouse is on
  const picked = selected ? USAGE.find((u) => u.plan === (hover || planHover || selected)) : null;
  const revTotal = REV_BY_PLAN.reduce((s, r) => s + r.amount, 0) || 1;

  // bring the usage popup into view when a colour is tapped (phones / Inspect mode)
  useEffect(() => {
    if (selected && popRef.current) {
      popRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selected]);

  return (
    <section className="panel">
      <div className="uo-head">
        <div>
          <h2>Subscription Usage Overview</h2>
          <p className="panel-sub">Current month profile usage across all colleges</p>
        </div>
        <span className="uo-pill">This month</span>
      </div>

      <div className="usage">
        <div className="uo-donut">
          <svg viewBox="0 0 140 140" role="img" aria-label="Profile usage by plan">
            <circle className="uo-track" cx="70" cy="70" r={R} />
            {segs.map((s) => (
              <circle
                key={s.plan}
                className={`uo-seg ${shown === s.plan ? "on" : ""} ${shown && shown !== s.plan ? "dim" : ""}`}
                cx="70"
                cy="70"
                r={R}
                stroke={PLAN_COLOR[s.plan]}
                strokeDasharray={`${Math.max(s.len - GAP, 0)} ${C}`}
                strokeDashoffset={-s.offset}
                onMouseEnter={() => setHover(s.plan)}
                onMouseLeave={() => setHover(null)}
                onClick={() => toggleSel(s.plan)}
              />
            ))}
          </svg>
          <div className="uo-center" style={active ? { "--c": PLAN_COLOR[active.plan] } : undefined}>
            <strong>
              {active ? active.used : USAGE_USED}
              <span> / {active ? active.total : USAGE_TOTAL}</span>
            </strong>
            <span>{active ? `${active.plan} profiles` : "profiles used"}</span>
            <b>
              {active
                ? `${pct(active.used, active.total)}% used`
                : `${pct(USAGE_USED, USAGE_TOTAL)}% overall`}
            </b>
          </div>
        </div>

        <div className="uo-list">
          {USAGE.map((u) => (
            <div
              key={u.plan}
              className={`uo-row ${shown === u.plan ? "on" : ""}`}
              style={{ "--c": PLAN_COLOR[u.plan] }}
              tabIndex={0}
              onMouseEnter={() => setHover(u.plan)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(u.plan)}
              onBlur={() => setHover(null)}
              onClick={() => toggleSel(u.plan)}
            >
              <div className="uo-row-top">
                <i />
                {u.plan}
                <em>
                  {u.colleges} {u.colleges === 1 ? "college" : "colleges"}
                </em>
                <b>
                  {u.used} / {u.total}
                </b>
              </div>
              <div className="uo-bar">
                <i style={{ width: `${pct(u.used, u.total)}%` }} />
              </div>
              <span className="uo-pct">{pct(u.used, u.total)}% used</span>
            </div>
          ))}
        </div>
      </div>

      {picked && (
        <div className="uo-pop" ref={popRef} style={{ "--c": PLAN_COLOR[picked.plan] }} role="status">
          <div className="uo-pop-head">
            <i />
            <strong>{picked.plan} plan usage</strong>
            <button type="button" className="uo-pop-x" aria-label="Close usage details" onClick={() => setSelected(null)}>
              ✕
            </button>
          </div>
          <div className="uo-pop-grid">
            <div>
              <span>Used</span>
              <b>{picked.used}</b>
            </div>
            <div>
              <span>Remaining</span>
              <b>{Math.max(picked.total - picked.used, 0)}</b>
            </div>
            <div>
              <span>Total</span>
              <b>{picked.total}</b>
            </div>
            <div>
              <span>Colleges</span>
              <b>{picked.colleges}</b>
            </div>
          </div>
          <div className="uo-bar">
            <i style={{ width: `${pct(picked.used, picked.total)}%` }} />
          </div>
          <span className="uo-pct">{pct(picked.used, picked.total)}% used</span>
        </div>
      )}

      <div className="uo-rev" {...revSmokeProps}>
        <div className="uo-rev-top">
          <div>
            <span className="uo-rev-lbl">Monthly Revenue</span>
            <strong>{rupee(revenue)}</strong>
            <span className="uo-rev-lbl">This month (successful only)</span>
          </div>
          <span className="trend up">↑ 12%</span>
        </div>
        <div className="uo-split" aria-hidden="true">
          {REV_BY_PLAN.map((r) => (
            <i
              key={r.plan}
              style={{ width: `${(r.amount / revTotal) * 100}%`, background: PLAN_COLOR[r.plan] }}
            />
          ))}
        </div>
        <div className="uo-split-legend">
          {REV_BY_PLAN.map((r) => (
            <span key={r.plan}>
              <s style={{ background: PLAN_COLOR[r.plan] }} />
              {r.plan} {rupee(r.amount)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailsModal({ tx, onClose }) {
  // Close on Escape key and lock page scroll while open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Transaction details"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-head">
          <div>
            <h2>Transaction {tx.id}</h2>
            <p>
              {fmtDate(tx.date)} · {fmtTime(tx.date)}
            </p>
          </div>
          <span className={statusClass(tx.status)}>{tx.status}</span>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <div className="modal-body">
          <div className="amount-box">
            <span>Amount</span>
            <strong>{rupee(tx.amount)}</strong>
            <em className={`plan plan-${tx.plan.toLowerCase()}`}>
              {tx.plan} plan
            </em>
          </div>

          <section className="detail-card">
            <h3>Student details</h3>
            <Row label="Name" value={tx.student} />
            <Row label="Student ID" value={tx.studentId} />
            <Row label="Phone" value={tx.studentPhone} />
          </section>

          <section className="detail-card">
            <h3>College details</h3>
            <Row label="College" value={tx.college} />
            <Row label="Type" value={tx.type} />
            <Row label="District" value={tx.district} />
            <Row label="Phone" value={tx.phone} />
            <Row label="Email" value={tx.email} />
          </section>

          <section className="detail-card">
            <h3>Payment details</h3>
            <Row label="Method" value={tx.method} />
            <Row label={tx.payment.label} value={tx.payment.value} />
            {tx.payment.extra && (
              <Row
                label={tx.method === "Card" ? "Card type" : "Bank"}
                value={tx.payment.extra}
              />
            )}
            <Row label="Reference ID" value={tx.refId} />
            <Row
              label="Profiles included"
              value={`${PLANS[tx.plan].limit} / month`}
            />
          </section>

          {tx.statusInfo && (
            <section className="detail-card">
              <h3>{tx.statusInfo.title}</h3>
              {tx.statusInfo.rows.map(([label, value]) => (
                <Row key={label} label={label} value={value} />
              ))}
            </section>
          )}
        </div>

        <footer className="modal-foot">
          <button type="button" className="btn btn-light" onClick={onClose}>
            Close
          </button>
          <DownloadMenu
            up
            triggerClass="btn btn-primary smoke"
            triggerProps={smokeProps}
            onPick={(format) => exportReceipt(tx, format)}
          >
            ⬇ Download
          </DownloadMenu>
        </footer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. PAGE                                                             */
/* ------------------------------------------------------------------ */

// embedded=true  -> only the page content (use inside your existing admin layout)
// embedded=false -> full page with its own sidebar + top bar
/* ---------- Download Reports: paid colleges + the students they bought ---------- */
const FIRST_NAMES = ["Arun", "Divya", "Karthik", "Meena", "Suresh", "Priya", "Vignesh", "Anitha", "Hari", "Nandhini", "Ravi", "Kavya", "Mohan", "Sandhya"];
const LAST_NAMES = ["Kumar", "Bharathi", "Raja", "Lakshmi", "Babu", "Dharshini", "Waran", "Selvam", "Prasad", "Devi", "Murugan", "Priya"];
const COURSES = ["B.E. CSE", "B.Tech IT", "B.E. ECE", "B.E. Mechanical", "MBA", "B.Sc Computer Science", "B.Com", "B.E. EEE"];
const slug = (v) => String(v).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);

// Students whose details a college bought (demo data - replace with your API)
function reportStudents(sub) {
  return Array.from({ length: sub.used }, (_, k) => {
    const n = sub.tx.no * 7 + k;
    return {
      no: k + 1,
      id: `STU${1000 + ((sub.tx.no * 53 + k * 17) % 9000)}`,
      name: `${FIRST_NAMES[(n * 3) % FIRST_NAMES.length]} ${LAST_NAMES[(n * 5 + k) % LAST_NAMES.length]}`,
      phone: `+91 9${String(100000000 + ((n * 7654321) % 800000000))}`,
      course: COURSES[n % COURSES.length],
      date: new Date(sub.start.getTime() + k * 37 * 60000),
    };
  });
}

const STUDENT_HEAD = ["#", "Student ID", "Student name", "Phone", "Course interest", "Purchased on"];
const studentCells = (st) => [st.no, st.id, st.name, st.phone, st.course, `${fmtDate(st.date)} ${fmtTime(st.date)}`];

// One college: payment details + purchased students -> Excel or PDF
function exportCollegeReport(sub, format) {
  const tx = sub.tx;
  const students = reportStudents(sub);
  const name = `${slug(sub.college)}-report-${stamp()}`;
  const rows = [
    ["Transaction ID", tx.id],
    ["College", sub.college],
    ["District", tx.district],
    ["College email", tx.email],
    ["College phone", tx.phone],
    ["Plan", `${sub.plan} (${sub.total} profiles / month)`],
    ["Amount paid", rupee(sub.amount)],
    ["Payment method", tx.method],
    ["Paid on", `${fmtDate(sub.start)} ${fmtTime(sub.start)}`],
    ["Valid till", fmtDate(sub.end)],
    ["Subscription status", sub.status],
    ["Students purchased", `${sub.used} of ${sub.total}`],
  ];
  const kv = rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("");
  if (format === "excel") {
    const head = STUDENT_HEAD.map((h) => `<th>${esc(h)}</th>`).join("");
    const body = students.map((st) => `<tr>${studentCells(st).map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("");
    saveExcel(name, "College Report", `<table>${kv}</table><br/><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`);
    return;
  }
  const body = students.map((st) => `<tr>${studentCells(st).map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("");
  printPdf(
    name,
    `<div class="hd"><div><h1>College Report</h1><p>${esc(sub.college)} · ${esc(tx.district)} · ${esc(fmtDate(new Date()))}</p></div><div class="tot"><span>Amount paid</span><strong>${esc(rupee(sub.amount))}</strong></div></div>` +
      `<h2>Payment details</h2><table class="kv"><tbody>${kv}</tbody></table>` +
      `<h2>Students purchased (${students.length})</h2><table><thead><tr>${STUDENT_HEAD.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table>` +
      `<p class="foot">StudentCollege Admission Platform</p>`,
  );
}

// All paid colleges (current filter) -> Excel or PDF
function exportAllReports(list, format) {
  const name = `paid-colleges-report-${stamp()}`;
  const head = ["College", "District", "Plan", "Amount (INR)", "Paid on", "Valid till", "Students purchased", "Profile limit", "Status"];
  const cells = (s) => [s.college, s.tx.district, s.plan, s.amount, fmtDate(s.start), fmtDate(s.end), s.used, s.total, s.status];
  if (format === "excel") {
    const body = list.map((s) => `<tr>${cells(s).map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("");
    saveExcel(name, "Paid Colleges", `<table><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table>`);
    return;
  }
  const revenue = list.reduce((n, s) => n + s.amount, 0);
  const body = list
    .map((s) => `<tr><td>${esc(s.college)}<br/>${esc(s.tx.district)}</td><td>${esc(s.plan)}</td><td>${esc(rupee(s.amount))}</td><td>${esc(fmtDate(s.start))}</td><td>${esc(s.used)} / ${esc(s.total)}</td><td><span class="b ${s.status.toLowerCase()}">${esc(s.status)}</span></td></tr>`)
    .join("");
  printPdf(
    name,
    `<div class="hd"><div><h1>Paid Colleges Report</h1><p>StudentCollege Admission Platform · ${esc(fmtDate(new Date()))} · ${list.length} colleges</p></div><div class="tot"><span>Total paid</span><strong>${esc(rupee(revenue))}</strong></div></div>` +
      `<table><thead><tr><th>College</th><th>Plan</th><th>Amount</th><th>Paid on</th><th>Students</th><th>Status</th></tr></thead><tbody>${body}</tbody></table>`,
  );
}

function QkIcon({ name }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  switch (name) {
    case "bolt":
      return (<svg {...common} fill="currentColor" stroke="none"><path d="M13.5 2 5 13.5h6L10 22l9-12h-6z" /></svg>);
    case "gear":
      return (<svg {...common} strokeWidth="2.2"><circle cx="12" cy="12" r="3.2" /><circle cx="12" cy="12" r="6.6" /><path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3M4.8 4.8l2.1 2.1M17.1 17.1l2.1 2.1M4.8 19.2l2.1-2.1M17.1 6.9l2.1-2.1" /></svg>);
    case "history":
      return (<svg {...common}><path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" /><path d="M13 3l5 5v2" /><path d="M8 11h4M8 15h2" /><circle cx="17" cy="17" r="4" /><path d="M17 15v2l1.4 1" /></svg>);
    case "refund":
      return (<svg {...common}><path d="M4 12a8 8 0 1 0 2.6-5.9" /><path d="M4 3.5v4.2h4.2" /><path d="M9.5 9.5h5M9.5 12h5M10 9.5c3.4 0 3.4 4.2 0 4.2l3.5 3" /></svg>);
    case "report":
      return (<svg {...common}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 18v-3M12 18v-5M15 18v-2" /></svg>);
    case "users":
      return (<svg {...common}><circle cx="9" cy="8" r="3.2" /><path d="M3 19.5c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2" /><circle cx="17" cy="9" r="2.5" /><path d="M17.2 14.2c2.4 0 4.3 1.6 4.3 4.3" /></svg>);
    case "shield":
      return (<svg {...common}><path d="M12 3l7 3v5.3c0 4.4-3 7.9-7 9.7-4-1.8-7-5.3-7-9.7V6z" /><path d="M9 12l2.2 2.2L15.5 10" /></svg>);
    default:
      return (<svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
  }
}

const QK_ITEMS = [
  ["history", "blue", "history", "Transaction History", "View payments, invoices and transaction details."],
  ["refunds", "green", "refund", "Manage Refunds", "Review refund requests and process refunds."],
  ["reports", "purple", "report", "Download Reports", "Get college payment and purchased student reports."],
  ["users", "orange", "users", "Manage Users", "View, edit and manage admin and user accounts."],
  ["audit", "teal", "shield", "Audit Logs", "Track admin activities and system changes."],
];

function ReportsModal({ onClose, onDone }) {
  const [q, setQ] = useState("");
  const [plan, setPlan] = useState("All");
  const [open, setOpen] = useState(null);
  const [done, setDone] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return SUBSCRIPTIONS.filter(
      (s) => (plan === "All" || s.plan === plan) && (!t || s.college.toLowerCase().includes(t) || s.tx.district.toLowerCase().includes(t)),
    );
  }, [q, plan]);

  const flag = (key) => {
    setDone(key);
    setTimeout(() => setDone((d) => (d === key ? "" : d)), 1600);
  };
  const label = (f) => (f === "excel" ? "Excel" : "PDF");
  const run = (s, f) => {
    exportCollegeReport(s, f);
    flag(`${s.tx.id}-${f}`);
    onDone(f === "excel" ? `Excel report downloaded - ${s.college}` : `PDF report ready - ${s.college}`);
  };
  const runAll = (f) => {
    exportAllReports(list, f);
    flag(`all-${f}`);
    onDone(f === "excel" ? "Excel report downloaded" : "PDF report ready");
  };
  const btn = (key, f, onClick, disabled) => (
    <button type="button" className={`rp-btn ${f === "excel" ? "xls" : "pdf"} ${done === key ? "done" : ""}`} disabled={disabled} onClick={onClick}>
      {done === key ? "✓" : "⬇"} {label(f)}
    </button>
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-wide" role="dialog" aria-modal="true" aria-label="Download reports" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <h2>Download Reports</h2>
            <p>Colleges that paid and the student details they bought</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="modal-body">
          <div className="rp-stats">
            <div className="rp-stat" style={{ "--i": 0 }}>
              <span>Paid colleges</span>
              <b>{list.length}</b>
            </div>
            <div className="rp-stat" style={{ "--i": 1 }}>
              <span>Students purchased</span>
              <b>{list.reduce((n, s) => n + s.used, 0)}</b>
            </div>
            <div className="rp-stat" style={{ "--i": 2 }}>
              <span>Total paid</span>
              <b>{rupee(list.reduce((n, s) => n + s.amount, 0))}</b>
            </div>
          </div>

          <div className="rp-tools">
            <input className="field rp-search" placeholder="Search college or district" value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="rp-chips">
              {["All", ...PLAN_NAMES].map((p) => (
                <button key={p} type="button" className={`rp-chip ${plan === p ? "on" : ""}`} aria-pressed={plan === p} onClick={() => setPlan(p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="rp-tools">
            <span className="muted">All listed colleges:</span>
            <div className="rp-dl" style={{ marginLeft: 0 }}>
              {btn("all-excel", "excel", () => runAll("excel"), !list.length)}
              {btn("all-pdf", "pdf", () => runAll("pdf"), !list.length)}
            </div>
          </div>

          {list.length === 0 ? (
            <p className="empty-note">No paid colleges match your search.</p>
          ) : (
            <ul className="rp-list">
              {list.map((s, i) => {
                const isOpen = open === s.tx.id;
                return (
                  <li key={s.tx.id} className="rp-item" style={{ "--i": Math.min(i, 10) }}>
                    <div className="rp-top">
                      <div className="rp-info">
                        <strong>{s.college}</strong>
                        <small>
                          {s.tx.district} · Paid {fmtDate(s.start)}
                        </small>
                      </div>
                      <span className={`plan plan-${s.plan.toLowerCase()}`}>{s.plan}</span>
                      <div className="rp-meta">
                        <div>
                          <span>Amount paid</span>
                          <b>{rupee(s.amount)}</b>
                        </div>
                        <div>
                          <span>Students</span>
                          <b>
                            {s.used} / {s.total}
                          </b>
                        </div>
                      </div>
                    </div>
                    <div className="rp-actions">
                      <button type="button" className="rp-btn ghost" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : s.tx.id)}>
                        {isOpen ? "Hide students" : "View students"} <span className="chev" aria-hidden="true">▾</span>
                      </button>
                      <div className="rp-dl">
                        {btn(`${s.tx.id}-excel`, "excel", () => run(s, "excel"))}
                        {btn(`${s.tx.id}-pdf`, "pdf", () => run(s, "pdf"))}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="rp-students">
                        <div className="rp-tablewrap">
                          <table className="rp-table">
                            <thead>
                              <tr>
                                {STUDENT_HEAD.map((h) => (
                                  <th key={h}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {reportStudents(s).map((st) => (
                                <tr key={st.id}>
                                  {studentCells(st).map((c, k) => (
                                    <td key={k}>{c}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const PLAN_SWATCHES = [
  ["Teal", "20, 184, 166"],
  ["Pink", "236, 72, 153"],
  ["Green", "34, 160, 90"],
  ["Orange", "234, 120, 40"],
];

// Create Subscription: lets the admin add a brand-new plan next to Elite / Gold / Diamond
function CreatePlanModal({ taken, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [limit, setLimit] = useState("");
  const [features, setFeatures] = useState("");
  const [swatch, setSwatch] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    const n = name.trim();
    if (n.length < 2 || n.length > 20) err.name = "Enter a plan name (2-20 characters)";
    else if (taken.some((t) => t.toLowerCase() === n.toLowerCase())) err.name = "A plan with this name already exists";
    const pr = Number(price);
    if (!Number.isInteger(pr) || pr < 1) err.price = "Enter the price in whole rupees";
    const lm = Number(limit);
    if (!Number.isInteger(lm) || lm < 1) err.limit = "Enter 1 or more profiles";
    setErrors(err);
    if (Object.keys(err).length) return;
    const list = features.split("\n").map((f) => f.trim()).filter(Boolean).slice(0, 6);
    onCreate({
      name: n,
      price: pr,
      limit: lm,
      features: list.length ? list : ["Custom plan benefits"],
      rgb: PLAN_SWATCHES[swatch][1],
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Create subscription plan"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-head">
          <div>
            <h2>Create Subscription</h2>
            <p>Add a new plan next to Elite, Gold and Diamond</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <form className="modal-form" onSubmit={submit} noValidate>
          <div className="modal-body">
            <label className="fld">
              <span>Plan name</span>
              <input
                className={`field ${errors.name ? "invalid" : ""}`}
                value={name}
                maxLength={20}
                placeholder="e.g. Platinum"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <em className="fld-err">{errors.name}</em>}
            </label>

            <div className="fld-row">
              <label className="fld">
                <span>Price (₹ / month)</span>
                <input
                  className={`field ${errors.price ? "invalid" : ""}`}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={price}
                  placeholder="e.g. 5999"
                  onChange={(e) => setPrice(e.target.value)}
                />
                {errors.price && <em className="fld-err">{errors.price}</em>}
              </label>
              <label className="fld">
                <span>Profiles / month</span>
                <input
                  className={`field ${errors.limit ? "invalid" : ""}`}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={limit}
                  placeholder="e.g. 100"
                  onChange={(e) => setLimit(e.target.value)}
                />
                {errors.limit && <em className="fld-err">{errors.limit}</em>}
              </label>
            </div>

            <label className="fld">
              <span>Features</span>
              <textarea
                className="field"
                value={features}
                placeholder={"One feature per line\nAll Diamond features\nAccount manager"}
                onChange={(e) => setFeatures(e.target.value)}
              />
              <span className="fld-hint">Optional, up to 6 lines.</span>
            </label>

            <div className="fld">
              <span>Plan colour</span>
              <div className="swatches" role="radiogroup" aria-label="Plan colour">
                {PLAN_SWATCHES.map(([label, rgb], i) => (
                  <button
                    key={label}
                    type="button"
                    role="radio"
                    aria-checked={swatch === i}
                    aria-label={label}
                    title={label}
                    className={`swatch ${swatch === i ? "on" : ""}`}
                    style={{ "--c": rgb }}
                    onClick={() => setSwatch(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          <footer className="modal-foot">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create plan
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default function TransactionsPage({ embedded = false }) {
  const logout = useLogout();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [method, setMethod] = useState("All");
  const [district, setDistrict] = useState("All");
  const [newestFirst, setNewestFirst] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [planSel, setPlanSel] = useState(null); // clicked subscription plan
  const [planHover, setPlanHover] = useState(null); // plan card under the mouse
  const [showAllRules, setShowAllRules] = useState(false);
  const [renewTab, setRenewTab] = useState("soon"); // soon | expired
  const [renewAll, setRenewAll] = useState(false);
  const [alertsAll, setAlertsAll] = useState(false);
  const [actAll, setActAll] = useState(false);
  const [topAll, setTopAll] = useState(false);
  const [sentIds, setSentIds] = useState([]); // reminders already sent
  const [bulkBusy, setBulkBusy] = useState(false);
  const [toast, setToast] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [customPlans, setCustomPlans] = useState([]); // plans created from Quick Actions

  // Filtering + sorting
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TRANSACTIONS.filter((t) => {
      const matchSearch =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.college.toLowerCase().includes(q) ||
        t.studentId.toLowerCase().includes(q) ||
        t.student.toLowerCase().includes(q);
      return (
        matchSearch &&
        (status === "All" || t.status === status) &&
        (method === "All" || t.method === method) &&
        (district === "All" || t.district === district) &&
        (!planSel || t.plan === planSel)
      );
    }).sort((a, b) => (newestFirst ? b.date - a.date : a.date - b.date));
  }, [search, status, method, district, planSel, newestFirst]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const rows = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  // Stats (always from all data)
  const stats = useMemo(() => {
    const ok = TRANSACTIONS.filter((t) => t.status === "Success");
    const refunded = TRANSACTIONS.filter((t) => t.status === "Refunded");
    return {
      revenue: ok.reduce((s, t) => s + t.amount, 0),
      success: ok.length,
      pending: TRANSACTIONS.filter((t) => t.status === "Pending").length,
      refunds: refunded.length,
      refundAmount: refunded.reduce((s, t) => s + t.amount, 0),
    };
  }, []);

  const changeFilter = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setMethod("All");
    setDistrict("All");
    setPlanSel(null);
    setPage(1);
  };

  const scrollToTable = () =>
    document
      .getElementById("tx-table")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Click a subscription plan: highlight it + filter the table by that plan (click again to clear)
  const togglePlan = (p) => {
    setPlanSel((cur) => (cur === p ? null : p));
    setPage(1);
    // on phones / tablets the plans sit below the table, so bring the table into view
    const layout = document.querySelector(".tx-layout");
    if (layout && getComputedStyle(layout).display !== "grid") scrollToTable();
  };

  // Auto-hide the small toast message
  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  const notify = (msg) => setToast({ msg, k: Date.now() });

  // Reminders (demo). Replace the body with your real API call.
  const sendReminder = (tx) => {
    if (sentIds.includes(tx.id)) return;
    setSentIds((s) => [...s, tx.id]);
    notify(`Reminder sent to ${tx.college}`);
  };
  const sendBulk = () => {
    const targets = PENDING_TX.filter((p) => !sentIds.includes(p.tx.id));
    if (bulkBusy) return;
    if (!targets.length) {
      notify("All reminders are already sent");
      return;
    }
    setBulkBusy(true);
    setTimeout(() => {
      setSentIds((s) => [...s, ...targets.map((p) => p.tx.id)]);
      setBulkBusy(false);
      notify(`Reminders sent to ${plural(targets.length, "college")}`);
    }, 900);
  };
  // Demo only: replace with your real "create plan" API call
  const createPlan = (plan) => {
    setCustomPlans((list) => [...list, plan]);
    setCreateOpen(false);
    notify(`${plan.name} plan created`);
    setTimeout(
      () => document.querySelector(".plans-panel")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80,
    );
  };
  const removePlan = (name) => {
    setCustomPlans((list) => list.filter((c) => c.name !== name));
    notify(`${name} plan removed`);
  };
  // Audit Logs: open the full admin activity list
  const openAudit = () => {
    setActAll(true);
    notify("Showing the full admin activity log");
    setTimeout(
      () => document.querySelector(".act-panel")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80,
    );
  };
  const qkActions = {
    history: () => {
      resetFilters();
      scrollToTable();
    },
    refunds: () => {
      setStatus("Refunded");
      setPage(1);
      scrollToTable();
    },
    reports: () => setReportsOpen(true),
    users: () => navigate("/admin/users"),
    audit: openAudit,
  };
  const filterTable = (st) => {
    resetFilters();
    setStatus(st);
    scrollToTable();
  };

  const renewList = renewAll ? RENEW_ALL : (renewTab === "soon" ? RENEW_SOON : RENEW_EXPIRED).slice(0, RENEW_PREVIEW);
  const pickRenewTab = (t) => {
    setRenewAll(false);
    setRenewTab(t);
  };
  const alertList = alertsAll ? PENDING_TX : PENDING_TX.slice(0, ALERT_PREVIEW);
  const allSent = PENDING_TX.every((p) => sentIds.includes(p.tx.id));
  const topList = TOP_COLLEGES.slice(0, topAll ? TOP_LIMIT : TOP_PREVIEW);
  const actList = actAll ? ACTIVITY : ACTIVITY.slice(0, ACT_PREVIEW);

  return (
    <div className={`app ${embedded ? "app-embedded" : ""}`}>
      <style>{CSS}</style>
      {!embedded && (
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}

      <div className="main">
        {/* Top bar */}
        {!embedded && (
          <header className="topbar">
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
            <button type="button" className="top-bell" aria-label="Notifications">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 3.5L18.5 10L12 16.5L5.5 10L12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <circle className="dot" cx="19.5" cy="4.5" r="3" />
              </svg>
            </button>
            <button
              type="button"
              className="top-profile"
              title="Logout"
              aria-label="Admin - click to logout"
              onClick={logout}
            >
              <span className="top-profile__icon">A</span>
              <span className="top-profile__copy">
                <strong>Admin</strong>
                <small>Super Admin</small>
              </span>
              <span className="top-profile__chev">⌄</span>
            </button>
          </header>
        )}

        <main className="content">
          <div className="tx-layout">
            {/* ================= MAIN COLUMN ================= */}
            <div className="tx-main">
              <div className="page-head">
                <h1>Transactions &amp; Subscription Management</h1>
                <p>
                  Monitor payments, manage subscriptions and track student
                  profile access.
                </p>
              </div>

              {/* Stat cards */}
              <div className="tx-stats">
                <StatCard
                  icon="₹"
                  tone="blue"
                  label="Total Revenue"
                  value={rupee(stats.revenue)}
                  note="Successful payments only"
                  trend="12%"
                />
                <StatCard
                  icon="✓"
                  tone="green"
                  label="Successful"
                  value={stats.success}
                  note="Completed this month"
                  trend="8%"
                />
                <StatCard
                  icon="◷"
                  tone="orange"
                  label="Pending"
                  value={stats.pending}
                  note="Awaiting confirmation"
                  trend="-3%"
                />
                <StatCard
                  icon="↺"
                  tone="red"
                  label="Refunds"
                  value={stats.refunds}
                  note={`Refunded amount: ${rupee(stats.refundAmount)}`}
                  trend="-1%"
                />
              </div>

              {/* Filters */}
              <section className="panel filters-panel">
                <div className="filters">
                  <div className="search-wrap">
                    <span className="search-icon" aria-hidden="true">
                      ⌕
                    </span>
                    <input
                      className="field search"
                      type="search"
                      placeholder="Search by transaction ID, college, student…"
                      value={search}
                      onChange={changeFilter(setSearch)}
                    />
                  </div>
                  <select
                    className="field"
                    aria-label="District"
                    value={district}
                    onChange={changeFilter(setDistrict)}
                  >
                    <option value="All">All districts</option>
                    <option>Coimbatore</option>
                    <option>Chennai</option>
                    <option>Erode</option>
                  </select>
                  <select
                    className="field"
                    aria-label="Payment method"
                    value={method}
                    onChange={changeFilter(setMethod)}
                  >
                    <option value="All">All methods</option>
                    <option>UPI</option>
                    <option>Card</option>
                    <option>Net Banking</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={resetFilters}
                  >
                    ⟲ Reset
                  </button>

                  <div className="chips">
                    {STATUS_FILTERS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={status === s}
                        className={`chip chip-${s.toLowerCase()} smoke ${status === s ? "active" : ""}`}
                        onClick={() => {
                          setStatus(s);
                          setPage(1);
                        }}
                        {...smokeProps}
                      >
                        <i />
                        {s}
                        <b className="chip-count">{STATUS_COUNT[s]}</b>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Transactions table */}
              <section className="panel table-panel" id="tx-table">
                <div className="panel-head">
                  <h2>All Transactions</h2>
                  <span className="count">{filtered.length} transactions</span>
                  {planSel && (
                    <button
                      type="button"
                      className={`plan plan-${planSel.toLowerCase()} plan-pill`}
                      title="Clear plan filter"
                      onClick={() => {
                        setPlanSel(null);
                        setPage(1);
                      }}
                    >
                      {planSel} plan ✕
                    </button>
                  )}
                  <DownloadMenu
                    triggerClass="btn btn-primary smoke"
                    triggerProps={smokeProps}
                    onPick={(format) => exportTransactions(filtered, format)}
                  >
                    ⬇ Export
                  </DownloadMenu>
                </div>

                {rows.length === 0 ? (
                  <p className="empty">
                    No transactions match these filters. Clear a filter to see
                    more.
                  </p>
                ) : (
                  <>
                    {/* Laptop / desktop table */}
                    <div className="table-wrap">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="col-no">#</th>
                            <th>Transaction ID</th>
                            <th>College</th>
                            <th>Student ID</th>
                            <th>Plan</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>
                              <button
                                type="button"
                                className="sort-btn"
                                onClick={() => setNewestFirst((v) => !v)}
                                title={
                                  newestFirst
                                    ? "Newest first (click to reverse)"
                                    : "Oldest first (click to reverse)"
                                }
                              >
                                Date &amp; Time {newestFirst ? "↓" : "↑"}
                              </button>
                            </th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((t, i) => (
                            <tr
                              key={t.id}
                              style={{ animationDelay: `${i * 40}ms` }}
                            >
                              <td className="col-no">{startIndex + i + 1}</td>
                              <td className="mono">{t.id}</td>
                              <td>
                                <strong>{t.college}</strong>
                                <small>{t.district}</small>
                              </td>
                              <td>
                                {t.studentId}
                                <small>{t.student}</small>
                              </td>
                              <td>
                                <span
                                  className={`plan plan-${t.plan.toLowerCase()}`}
                                >
                                  {t.plan}
                                </span>
                              </td>
                              <td>
                                <strong>{rupee(t.amount)}</strong>
                              </td>
                              <td>
                                <span className="method-cell">
                                  <span aria-hidden="true">
                                    {METHOD_ICON[t.method]}
                                  </span>
                                  {t.method}
                                </span>
                              </td>
                              <td>
                                {fmtDate(t.date)}
                                <small>{fmtTime(t.date)}</small>
                              </td>
                              <td>
                                <span className={statusClass(t.status)}>
                                  {t.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-view"
                                  onClick={() => setSelected(t)}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="tx-cards">
                      {rows.map((t, i) => (
                        <article
                          key={t.id}
                          className="tx-card"
                          style={{ animationDelay: `${i * 40}ms` }}
                        >
                          <div className="tx-card-top">
                            <span className="mono">{t.id}</span>
                            <span className={statusClass(t.status)}>
                              {t.status}
                            </span>
                          </div>
                          <h3>{t.college}</h3>
                          <p className="muted">
                            {t.district} · {t.student} ({t.studentId})
                          </p>
                          <div className="tx-card-mid">
                            <strong>{rupee(t.amount)}</strong>
                            <span
                              className={`plan plan-${t.plan.toLowerCase()}`}
                            >
                              {t.plan}
                            </span>
                            <span className="muted">{t.method}</span>
                          </div>
                          <div className="tx-card-bottom">
                            <span className="muted">
                              {fmtDate(t.date)} · {fmtTime(t.date)}
                            </span>
                            <button
                              type="button"
                              className="btn btn-view"
                              onClick={() => setSelected(t)}
                            >
                              View
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                )}

                {/* Pagination */}
                <div className="pager">
                  <span className="muted">
                    Showing {filtered.length ? startIndex + 1 : 0}–
                    {Math.min(startIndex + PAGE_SIZE, filtered.length)} of{" "}
                    {filtered.length} transactions
                  </span>
                  <PageButtons
                    total={totalPages}
                    current={safePage}
                    onChange={setPage}
                  />
                </div>
              </section>

              {/* Recent subscriptions / usage / quick actions */}
              <div className="tx-bottom">
                <section className="panel subs-panel">
                  <div className="panel-head">
                    <div>
                      <h2>Recent Subscriptions</h2>
                      <p className="panel-sub">Latest college subscription details</p>
                    </div>
                  </div>
                  <div className="table-scroll">
                    <table className="sub-table">
                      <thead>
                        <tr>
                          <th>College</th>
                          <th>Plan</th>
                          <th>Amount</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Profiles</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_SUBS.map((s) => (
                          <tr key={s.tx.id}>
                            <td>
                              <strong>{s.college}</strong>
                            </td>
                            <td>
                              <span
                                className={`plan plan-${s.plan.toLowerCase()}`}
                              >
                                {s.plan}
                              </span>
                            </td>
                            <td>{rupee(s.amount)}</td>
                            <td>{fmtDate(s.start)}</td>
                            <td>{fmtDate(s.end)}</td>
                            <td>
                              {s.used} / {s.total}
                              <div className="meter">
                                <i
                                  style={{
                                    width: `${(s.used / s.total) * 100}%`,
                                  }}
                                />
                              </div>
                            </td>
                            <td>
                              <span className={statusClass(s.status)}>
                                {s.status}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-view"
                                onClick={() => setSelected(s.tx)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <div className="tx-col">
                <UsageOverview revenue={stats.revenue} planSel={planSel} planHover={planHover} />

                <section className="panel top-panel">
                  <div className="panel-head">
                    <div>
                      <h2>Top Paying Colleges</h2>
                      <p className="panel-sub">College-wise revenue overview</p>
                    </div>
                    <button
                      type="button"
                      className="link-btn"
                      aria-expanded={topAll}
                      onClick={() => setTopAll((v) => !v)}
                    >
                      {topAll ? "Show Less" : "View All"}
                    </button>
                  </div>
                  <div className="tc-head" aria-hidden="true">
                    <span>#</span>
                    <span>College</span>
                    <span>Revenue</span>
                    <span>Txns</span>
                    <span>Top Plan</span>
                  </div>
                  <ul className="soft-list">
                    {topList.map((c, i) => (
                      <li
                        key={c.college}
                        className="tc-row"
                        style={{
                          "--i": i,
                          "--w": `${Math.max(4, (c.revenue / TOP_MAX) * 100)}%`,
                          "--c": PLAN_COLOR[c.plan],
                        }}
                      >
                        <span className={`tc-rank r${i + 1}`}>{i + 1}</span>
                        <button
                          type="button"
                          className="tc-name"
                          title={c.college}
                          onClick={() => setSelected(c.tx)}
                        >
                          <strong>{c.college}</strong>
                          <small>{c.district}</small>
                        </button>
                        <span className="tc-rev">{rupee(c.revenue)}</span>
                        <span className="tc-txn">{c.count}</span>
                        <span className={`plan plan-${c.plan.toLowerCase()} tc-plan`}>
                          {c.plan}
                        </span>
                        <span className="tc-bar">
                          <i />
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
                </div>

                <div className="tx-col">

                <section className="panel quick-panel qk-panel">
                  <div className="qk-head">
                    <span className="qk-head-ico">
                      <QkIcon name="bolt" />
                    </span>
                    <div className="qk-head-text">
                      <h2>Quick Actions</h2>
                      <p>Access key admin tools to manage the platform efficiently.</p>
                    </div>
                    <span className="qk-gear">
                      <QkIcon name="gear" />
                    </span>
                  </div>
                  <div className="qk-grid">
                    {QK_ITEMS.map(([key, tone, icon, title, desc], i) => (
                      <button
                        key={key}
                        type="button"
                        className={`qk-card qk-${tone} smoke`}
                        style={{ "--i": i }}
                        {...smokeProps}
                        onClick={qkActions[key]}
                      >
                        <span className="qk-ico">
                          <QkIcon name={icon} />
                        </span>
                        <span className="qk-text">
                          <strong>{title}</strong>
                          <small>{desc}</small>
                        </span>
                        <span className="qk-go">
                          <QkIcon name="arrow" />
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="panel act-panel">
                  <div className="panel-head">
                    <div>
                      <h2>Recent Admin Activity</h2>
                      <p className="panel-sub">Latest actions and updates</p>
                    </div>
                    <button
                      type="button"
                      className="link-btn"
                      aria-expanded={actAll}
                      onClick={() => setActAll((v) => !v)}
                    >
                      {actAll ? "Show Less" : "View All"}
                    </button>
                  </div>
                  <ul className="soft-list act-list">
                    {actList.map((a, i) => (
                      <li key={a.key} style={{ "--i": i }}>
                        <button type="button" className="act-item" onClick={() => setSelected(a.tx)}>
                          <span className={`act-ico ico-${a.tone}`} aria-hidden="true">
                            {a.icon}
                          </span>
                          <span className="act-body">
                            <strong>
                              {a.title}
                              {i === 0 && <span className="chip chip-soon act-new">New</span>}
                            </strong>
                            <small>{a.text}</small>
                            <small className="act-time">
                              {fmtDate(a.when)} · {fmtTime(a.when)}
                            </small>
                          </span>
                          <span className="act-arrow" aria-hidden="true">
                            ›
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
                </div>


              </div>
            </div>

            {/* ================= SIDE COLUMN ================= */}
            <aside className="tx-side">
              <section className="panel plans-panel">
                <div className="panel-head">
                  <div>
                    <h2>Subscription Plans</h2>
                    <p className="panel-sub">
                      Choose a plan to get student profile access
                    </p>
                  </div>
                  <button
                    type="button"
                    className="link-btn smoke"
                    {...smokeProps}
                    onClick={() => setCreateOpen(true)}
                  >
                    ＋ Create
                  </button>
                </div>
                <div className="plans-grid">
                  {PLAN_NAMES.map((p) => {
                    const on = planSel === p;
                    return (
                      <div
                        key={p}
                        role="button"
                        tabIndex={0}
                        aria-pressed={on}
                        className={`plan-card plan-card-${p.toLowerCase()} smoke ${on ? "selected" : ""}`}
                        onClick={() => togglePlan(p)}
                        onMouseEnter={() => setPlanHover(p)}
                        onMouseLeave={() => setPlanHover(null)}
                        onFocus={() => setPlanHover(p)}
                        onBlur={() => setPlanHover(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            togglePlan(p);
                          }
                        }}
                        {...smokeProps}
                      >
                        {p === "Gold" && (
                          <span className="recommended">Recommended</span>
                        )}
                        <div className="plan-card-top">
                          <span className="plan-icon">{PLAN_ICON[p]}</span>
                          <div>
                            <h3>{p}</h3>
                            <div className="plan-price">
                              {rupee(PLANS[p].price)}
                              <small>/month</small>
                            </div>
                          </div>
                        </div>
                        <span className="plan-limit">
                          {PLANS[p].limit} profiles / month
                        </span>
                        <ul className="plan-features">
                          {PLANS[p].features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                        <span className="plan-cta">
                          {on ? "✓ Selected · tap to clear" : "Select plan"}
                        </span>
                      </div>
                    );
                  })}
                  {customPlans.map((c, k) => (
                    <div
                      key={c.name}
                      className="plan-card plan-card-custom smoke"
                      style={{ "--i": PLAN_NAMES.length + k, "--pc-rgb": c.rgb, "--smoke-rgb": c.rgb }}
                      {...smokeProps}
                    >
                      <span className="custom-badge">Custom</span>
                      <div className="plan-card-top">
                        <span className="plan-icon">✦</span>
                        <div>
                          <h3>{c.name}</h3>
                          <div className="plan-price">
                            {rupee(c.price)}
                            <small>/month</small>
                          </div>
                        </div>
                      </div>
                      <span className="plan-limit">{c.limit} profiles / month</span>
                      <ul className="plan-features">
                        {c.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <button type="button" className="plan-cta" onClick={() => removePlan(c.name)}>
                        Remove plan
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="panel rules-panel">
                <h2 className="rules-title">
                  <span className="info-dot">i</span> Plan Rules
                  <span className="count">{PLAN_RULES.length} rules</span>
                </h2>
                <ol className="rules-list">
                  {(showAllRules ? PLAN_RULES : PLAN_RULES.slice(0, RULES_PREVIEW)).map(
                    (r, i) => (
                      <li
                        key={r}
                        style={{
                          animationDelay: `${Math.max(0, i - RULES_PREVIEW) * 50}ms`,
                        }}
                      >
                        {r}
                      </li>
                    ),
                  )}
                </ol>
                <button
                  type="button"
                  className="btn btn-outline btn-block btn-toggle"
                  aria-expanded={showAllRules}
                  onClick={() => setShowAllRules((v) => !v)}
                >
                  {showAllRules ? "Show Less" : "View Full Details"}
                  <span className="chev" aria-hidden="true">
                    ▾
                  </span>
                </button>
              </section>

              <div className="side-extra">
                <section className="panel renew-panel">
                  <div className="panel-head">
                    <div>
                      <h2>Upcoming Renewals</h2>
                      <p className="panel-sub">
                        {plural(RENEW_SOON.length, "subscription")} expiring soon
                      </p>
                    </div>
                    <button
                      type="button"
                      {...smokeProps}
                      className="link-btn smoke"
                      aria-expanded={renewAll}
                      onClick={() => setRenewAll((v) => !v)}
                    >
                      {renewAll ? "Show Less" : "View All"}
                    </button>
                  </div>
                  <div className="renew-tiles">
                    <button
                      type="button"
                      {...smokeProps}
                      className={`renew-tile soon smoke ${!renewAll && renewTab === "soon" ? "on" : ""}`}
                      aria-pressed={!renewAll && renewTab === "soon"}
                      onClick={() => pickRenewTab("soon")}
                    >
                      <span>Expiring in 7 days</span>
                      <b>{pad2(RENEW_SOON.length)}</b>
                    </button>
                    <button
                      type="button"
                      {...smokeProps}
                      className={`renew-tile exp smoke ${!renewAll && renewTab === "expired" ? "on" : ""}`}
                      aria-pressed={!renewAll && renewTab === "expired"}
                      onClick={() => pickRenewTab("expired")}
                    >
                      <span>Expired</span>
                      <b>{pad2(RENEW_EXPIRED.length)}</b>
                    </button>
                  </div>
                  {renewList.length === 0 ? (
                    <p className="empty-note">No subscriptions here right now.</p>
                  ) : (
                    <ul className={`soft-list ${renewAll ? "is-scroll" : ""}`}>
                      {renewList.map((s, i) => {
                        const [chipText, chipTone] = renewChip(s);
                        return (
                          <li key={s.tx.id} className="renew-item" style={{ "--i": i }}>
                            <button type="button" className="renew-name smoke" {...smokeProps} onClick={() => setSelected(s.tx)}>
                              <strong>{s.college}</strong>
                              <small>
                                {s.plan} - {renewLabel(s)}
                              </small>
                            </button>
                            <span className={`chip chip-${chipTone}`}>{chipText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <button
                    type="button"
                    {...smokeProps}
                    className="btn btn-outline btn-block btn-toggle smoke"
                    aria-expanded={renewAll}
                    onClick={() => setRenewAll((v) => !v)}
                  >
                    {renewAll ? "Show Less" : "View All Renewals"}
                    <span className="chev" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                </section>

                <section className="panel alerts-panel">
                  <div className="panel-head">
                    <div>
                      <h2>Payment Alerts &amp; Follow-ups</h2>
                      <p className="panel-sub">Manage pending payments and send reminders</p>
                    </div>
                    <button
                      type="button"
                      {...smokeProps}
                      className="link-btn smoke"
                      aria-expanded={alertsAll}
                      onClick={() => setAlertsAll((v) => !v)}
                    >
                      {alertsAll ? "Show Less" : "View All"}
                    </button>
                  </div>
                  <div className="al-tiles">
                    <button
                      type="button"
                      {...smokeProps}
                      className="al-tile al-red smoke"
                      style={{ "--i": 0 }}
                      onClick={() => filterTable("Pending")}
                    >
                      <span>Pending Payments</span>
                      <b>{PENDING_TX.length}</b>
                      <em>{rupee(sumAmt(PENDING_TX.map((p) => p.tx)))}</em>
                    </button>
                    <button
                      type="button"
                      {...smokeProps}
                      className="al-tile al-orange smoke"
                      style={{ "--i": 1 }}
                      onClick={() => filterTable("Failed")}
                    >
                      <span>Failed Transactions</span>
                      <b>{FAILED_TX.length}</b>
                      <em>{rupee(sumAmt(FAILED_TX))}</em>
                    </button>
                    <div className="al-tile al-purple smoke" {...smokeProps} style={{ "--i": 2 }}>
                      <span>Unpaid Subscriptions</span>
                      <b>{RENEW_EXPIRED.length}</b>
                      <em>{rupee(sumAmt(RENEW_EXPIRED))}</em>
                    </div>
                    <div className="al-tile al-green smoke" {...smokeProps} style={{ "--i": 3 }}>
                      <span>Follow-ups Sent</span>
                      <b>{sentIds.length}</b>
                      <em>Today</em>
                    </div>
                  </div>

                  <h3 className="al-subtitle">Recent Pending Payments</h3>
                  {alertList.length === 0 ? (
                    <p className="empty-note">No pending payments. All clear!</p>
                  ) : (
                    <ul className={`soft-list ${alertsAll ? "is-scroll" : ""}`}>
                      {alertList.map((p, i) => {
                        const sent = sentIds.includes(p.tx.id);
                        const late = daysFromNow(p.due) < 0;
                        return (
                          <li key={p.tx.id} className="al-item" style={{ "--i": i }}>
                            <div className="al-info">
                              <strong>{p.tx.college}</strong>
                              <small className={late ? "late" : ""}>
                                {rupee(p.tx.amount)} · {dueLabel(p.due)}
                              </small>
                            </div>
                            <button
                              type="button"
                              {...smokeProps}
                              className={`btn-remind smoke ${sent ? "sent" : ""}`}
                              disabled={sent}
                              onClick={() => sendReminder(p.tx)}
                            >
                              {sent ? "Sent ✓" : "Reminder"}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <button
                    type="button"
                    {...smokeProps}
                    className="btn-bulk smoke"
                    disabled={bulkBusy || PENDING_TX.length === 0}
                    onClick={sendBulk}
                  >
                    {bulkBusy ? (
                      <>
                        <span className="spin" aria-hidden="true" /> Sending...
                      </>
                    ) : allSent && PENDING_TX.length > 0 ? (
                      "All Reminders Sent ✓"
                    ) : (
                      "➤ Send Bulk Reminders"
                    )}
                  </button>
                </section>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {selected && (
        <DetailsModal tx={selected} onClose={() => setSelected(null)} />
      )}

      {reportsOpen && (
        <ReportsModal onClose={() => setReportsOpen(false)} onDone={notify} />
      )}

      {createOpen && (
        <CreatePlanModal
          taken={[...PLAN_NAMES, ...customPlans.map((c) => c.name)]}
          onClose={() => setCreateOpen(false)}
          onCreate={createPlan}
        />
      )}

      {toast && (
        <div key={toast.k} className="toast" role="status">
          {toast.msg}
        </div>
      )}
    </div>
  );
}