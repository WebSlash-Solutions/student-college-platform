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

.quick-panel { align-self: start; } /* panel is only as tall as its buttons */
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
export default function TransactionsPage({ embedded = false }) {
  const logout = useLogout();
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

                <UsageOverview revenue={stats.revenue} planSel={planSel} planHover={planHover} />

                <section className="panel quick-panel">
                  <div className="panel-head">
                    <div>
                      <h2>Quick Actions</h2>
                      <p className="panel-sub">Shortcuts for common tasks</p>
                    </div>
                  </div>
                  <div className="quick-list">
                    <button type="button" className="qa qa-primary smoke" {...smokeProps}>
                      <span className="qa-ico">＋</span>
                      <span className="qa-label">Create Subscription</span>
                      <span className="qa-arrow">›</span>
                    </button>
                    <button
                      type="button"
                      className="qa smoke"
                      {...smokeProps}
                      onClick={() => {
                        resetFilters();
                        scrollToTable();
                      }}
                    >
                      <span className="qa-ico">◷</span>
                      <span className="qa-label">View Transaction History</span>
                      <span className="qa-arrow">›</span>
                    </button>
                    <button
                      type="button"
                      className="qa qa-orange smoke"
                      {...smokeProps}
                      onClick={() => {
                        setStatus("Refunded");
                        setPage(1);
                        scrollToTable();
                      }}
                    >
                      <span className="qa-ico">↺</span>
                      <span className="qa-label">Manage Refunds</span>
                      <span className="qa-arrow">›</span>
                    </button>
                    <DownloadMenu
                      block
                      up
                      triggerClass="qa qa-green smoke"
                      triggerProps={smokeProps}
                      onPick={(format) => exportTransactions(TRANSACTIONS, format)}
                    >
                      <span className="qa-ico">⬇</span>
                      <span className="qa-label">Download Report</span>
                      <span className="qa-arrow">›</span>
                    </DownloadMenu>
                  </div>
                </section>
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
            </aside>
          </div>
        </main>
      </div>

      {selected && (
        <DetailsModal tx={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}