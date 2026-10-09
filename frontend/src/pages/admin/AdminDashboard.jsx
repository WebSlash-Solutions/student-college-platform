import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentManagement from "./StudentManagement";


const adminStyles = String.raw`/* =========================================================
   GLOBAL ADMIN
========================================================= */

* {
  box-sizing: border-box;
}

/* =========================================================
   SUBTLE DASHBOARD ANIMATIONS
========================================================= */

@keyframes dashboardFadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iconPop {
  0% {
    transform: scale(0.88);
  }
  70% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes chartDraw {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes donutReveal {
  from {
    opacity: 0;
    transform: rotate(-35deg) scale(0.88);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
}

@keyframes notificationPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

@keyframes listReveal {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes loginReveal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.admin-login-page {
  animation: dashboardFadeUp 0.55s ease both;
}

.login-shell {
  animation: loginReveal 0.65s ease both;
}

.dashboard-home {
  animation: dashboardFadeUp 0.45s ease both;
}

.stat-card {
  animation: cardReveal 0.55s ease both;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.stat-card:nth-child(1) { animation-delay: 0.05s; }
.stat-card:nth-child(2) { animation-delay: 0.10s; }
.stat-card:nth-child(3) { animation-delay: 0.15s; }
.stat-card:nth-child(4) { animation-delay: 0.20s; }
.stat-card:nth-child(5) { animation-delay: 0.25s; }
.stat-card:nth-child(6) { animation-delay: 0.30s; }
.stat-card:nth-child(7) { animation-delay: 0.35s; }
.stat-card:nth-child(8) { animation-delay: 0.40s; }

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(33, 60, 91, 0.09);
}

.stat-card:hover .stat-icon {
  animation: iconPop 0.35s ease both;
}

.analytics-grid,
.recent-leads-card,
.activity-card,
.quick-actions-card {
  animation: cardReveal 0.6s ease both;
}

.analytics-grid {
  animation-delay: 0.28s;
}

.recent-leads-card,
.activity-card {
  animation-delay: 0.38s;
}

.quick-actions-card {
  animation-delay: 0.48s;
}

.dynamic-chart-svg {
  animation: chartDraw 0.9s ease both;
}

.donut-chart {
  animation: donutReveal 0.75s ease both;
}

.notification-button {
  transition: transform 0.2s ease, background 0.2s ease;
}

.notification-button:hover {
  transform: translateY(-1px);
  background: #f4f7fb;
}

.notification-dot {
  animation: notificationPulse 1.8s ease-in-out infinite;
}

.recent-leads-card tbody tr,
.activity-item {
  animation: listReveal 0.4s ease both;
}

.recent-leads-card tbody tr:nth-child(1),
.activity-item:nth-child(1) { animation-delay: 0.05s; }
.recent-leads-card tbody tr:nth-child(2),
.activity-item:nth-child(2) { animation-delay: 0.10s; }
.recent-leads-card tbody tr:nth-child(3),
.activity-item:nth-child(3) { animation-delay: 0.15s; }
.recent-leads-card tbody tr:nth-child(4),
.activity-item:nth-child(4) { animation-delay: 0.20s; }
.recent-leads-card tbody tr:nth-child(5),
.activity-item:nth-child(5) { animation-delay: 0.25s; }
.recent-leads-card tbody tr:nth-child(6),
.activity-item:nth-child(6) { animation-delay: 0.30s; }
.recent-leads-card tbody tr:nth-child(7),
.activity-item:nth-child(7) { animation-delay: 0.35s; }
.recent-leads-card tbody tr:nth-child(8),
.activity-item:nth-child(8) { animation-delay: 0.40s; }
.recent-leads-card tbody tr:nth-child(9),
.activity-item:nth-child(9) { animation-delay: 0.45s; }
.recent-leads-card tbody tr:nth-child(10),
.activity-item:nth-child(10) { animation-delay: 0.50s; }

.quick-actions button {
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.quick-actions button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(33, 60, 91, 0.08);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
.admin-app {
  width: 100vw;
  min-height: 100vh;
  margin-left: calc(50% - 50vw);
  display: flex;
  background: #f4f7fb;
  color: #16243d;
  font-family:
    Inter,
    "Segoe UI",
    Roboto,
    Arial,
    sans-serif;
}


/* =========================================================
   ADMIN LOGIN
========================================================= */

.admin-login-page {
  width: 100vw;
  min-height: 100vh;
  margin-left: calc(50% - 50vw);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 30px;
  background:
    radial-gradient(circle at top left, rgba(47, 128, 237, 0.13), transparent 32%),
    linear-gradient(135deg, #f6f9ff 0%, #eef4fb 100%);
}

/* white card that holds everything */
.login-shell {
  position: relative;
  width: 100%;
  max-width: 920px;
  height: 450px;
  display: flex;
  align-items: stretch;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(25, 52, 92, 0.12);
}

/* ---------- left rail (logo + Sign In tab) ---------- */

.login-rail {
  width: 150px;
  flex-shrink: 0;
  padding: 44px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.login-logo-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eaf3ff;
  font-size: 27px;
}

.login-tab {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #2478e5;
  font-size: 14px;
  font-weight: 600;
}

.login-tab::before {
  content: "";
  position: absolute;
  left: 0;
  top: -8px;
  bottom: -8px;
  width: 6px;
  border-radius: 0 6px 6px 0;
  background: #2478e5;
}

.login-tab svg {
  width: 24px;
  height: 24px;
}

.login-rail-spacer {
  height: 52px;
}

/* ---------- middle image panel (sticks out top & bottom) ---------- */

.login-visual {
  position: relative;
  z-index: 2;
  width: 320px;
  height: 530px;
  flex-shrink: 0;
  align-self: center;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 28px;
  color: #ffffff;
  box-shadow: 0 30px 60px rgba(10, 25, 45, 0.35);
  background:
    linear-gradient(180deg, rgba(8, 22, 40, 0.25) 0%, rgba(5, 12, 24, 0.55) 55%, rgba(0, 0, 0, 0.92) 100%),
    url("/login-bg.jpg") center / cover no-repeat,
    linear-gradient(160deg, #2a6f97 0%, #112746 70%);
}

.login-visual h2 {
  margin: 0 0 8px;
  font-size: 30px;
  font-weight: 700;
}

.login-visual p {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.login-brand-name {
  margin-top: 26px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.login-brand-name span {
  color: #7db8ff;
}

/* ---------- right form ---------- */

.login-form-area {
  flex: 1;
  min-width: 0;
  padding: 0 48px 0 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-field {
  margin-bottom: 18px;
}

.login-field label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #33445f;
}

.input-wrapper {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border: 2px solid transparent;
  border-radius: 14px;
  background: #f3f5f8;
  transition: 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: #2478e5;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(36, 120, 229, 0.1);
}

.input-wrapper input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #172b4d;
}

.input-wrapper input::placeholder {
  color: #a5afbe;
}

.input-icon {
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  color: #7b899f;
}

.password-toggle {
  display: flex;
  align-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: #5c6b82;
  cursor: pointer;
}

.password-toggle svg {
  width: 20px;
  height: 20px;
}

.login-error {
  padding: 11px 13px;
  margin-bottom: 14px;
  border-radius: 10px;
  background: #fff0f1;
  color: #d64550;
  font-size: 13px;
}

.login-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0 22px;
  font-size: 13px;
}

.login-options label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4a5a72;
  cursor: pointer;
}

.login-options input[type="checkbox"] {
  width: 17px;
  height: 17px;
  accent-color: #2478e5;
}

.login-options button {
  border: 0;
  background: transparent;
  color: #2478e5;
  cursor: pointer;
  font-size: 13px;
}

.admin-login-button {
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 14px;
  background: #1f2430;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.admin-login-button:hover {
  background: #2478e5;
  transform: translateY(-1px);
}

.login-demo {
  margin: 16px 0 0;
  text-align: center;
  color: #a1adbd;
  font-size: 11px;
}

/* ---------- responsive ---------- */

@media (max-width: 860px) {
  .admin-login-page {
    padding: 20px 15px;
  }

  .login-shell {
    height: auto;
    flex-direction: column;
    overflow: hidden;
  }

  .login-rail {
    display: none;
  }

  .login-visual {
    width: 100%;
    height: 220px;
    border-radius: 24px 24px 0 0;
    box-shadow: none;
  }

  .login-visual h2 {
    font-size: 26px;
  }

  .login-brand-name {
    margin-top: 14px;
  }

  .login-form-area {
    padding: 28px 22px 30px;
  }
}


/* =========================================================
   SIDEBAR
========================================================= */

.admin-sidebar {
  width: 236px;
  min-height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #112746;
  color: #ffffff;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-brand {
  height: 82px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 0 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  font-size: 21px;
}

.sidebar-brand h1 {
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  line-height: 1.2;
}

.sidebar-brand h1 span {
  color: #58a1ff;
}

.sidebar-brand p {
  margin: 3px 0 0;
  color: #91a5c2;
  font-size: 9px;
}

.sidebar-menu {
  flex: 1;
  padding: 24px 12px;
  overflow-y: auto;
}

.menu-title {
  margin: 0 12px 10px;
  color: #6f86a7;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
}

.sidebar-item {
  width: 100%;
  height: 43px;
  margin-bottom: 4px;
  padding: 0 13px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #afbdd1;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  font-size: 12px;
  transition: 0.2s ease;
}

.sidebar-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.07);
}

.sidebar-item.active {
  color: #ffffff;
  background: #2177e8;
  box-shadow:
    0 6px 18px rgba(33, 119, 232, 0.2);
}

.sidebar-icon {
  width: 20px;
  text-align: center;
  font-size: 16px;
}

.lead-star {
  margin-left: auto;
  color: #f4c44f;
  font-size: 10px;
}

.sidebar-bottom {
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.sidebar-admin-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.055);
}

.admin-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #28558e;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
}

.sidebar-admin-card strong {
  display: block;
  color: #ffffff;
  font-size: 12px;
}

.sidebar-admin-card span {
  display: block;
  margin-top: 2px;
  color: #8196b5;
  font-size: 9px;
}

.logout-button {
  width: 100%;
  margin-top: 9px;
  height: 36px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #93a6c0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
}

.logout-button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.07);
}


/* =========================================================
   MAIN AREA
========================================================= */

.admin-main {
  min-width: 0;
  flex: 1;
}

.admin-topbar {
  height: 72px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-bottom: 1px solid #e7ecf2;
}

.top-search-container {
  position: relative;
  width: 400px;
}

.top-search {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-radius: 9px;
  background: #f4f7fb;
  color: #7b8da7;
}

.top-search span {
  font-size: 20px;
}

.top-search input {
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: #253954;
  font-size: 12px;
}

.top-search input::placeholder {
  color: #99a7ba;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notification-button {
  position: relative;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #61738e;
  font-size: 20px;
  cursor: pointer;
}

.notification-dot {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f25f68;
}

.top-admin {
  display: flex;
  align-items: center;
  gap: 9px;
}

.top-admin-avatar {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #183f70;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
}

.top-admin-details strong {
  display: block;
  color: #233854;
  font-size: 12px;
}

.top-admin-details span {
  display: block;
  color: #8c9aae;
  font-size: 9px;
  margin-top: 2px;
}

.top-admin-menu {
  border: 0;
  background: transparent;
  color: #71839c;
  cursor: pointer;
  font-size: 16px;
}


/* =========================================================
   CONTENT
========================================================= */

.admin-content {
  padding: 27px 30px 40px;
}

.dashboard-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 22px;
}

.dashboard-heading h1 {
  margin: 0;
  color: #172d4d;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 750;
}

.dashboard-heading p {
  margin: 7px 0 0;
  color: #8492a7;
  font-size: 12px;
}

.dashboard-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7f8ea3;
  font-size: 11px;
}

.calendar-icon {
  color: #6381a6;
}


/* =========================================================
   STAT CARDS
========================================================= */

.stats-grid {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 15px;
  margin-bottom: 17px;
}

.stat-card {
  min-height: 126px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border: 1px solid #e5ebf2;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 3px 12px rgba(33, 60, 91, 0.035);
}

.stat-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
}

.stat-icon.blue {
  color: #2f80ed;
  background: #eaf3ff;
}

.stat-icon.green {
  color: #18b77c;
  background: #e5f9f1;
}

.stat-icon.purple {
  color: #8b5cf6;
  background: #f1eaff;
}

.stat-icon.orange {
  color: #e9992f;
  background: #fff2dc;
}

.stat-icon.cyan {
  color: #0b9bc1;
  background: #e4f8fd;
}

.stat-icon.gold {
  color: #b98922;
  background: #fff5d8;
}

.stat-icon.pink {
  color: #df5a8c;
  background: #ffeaf2;
}

.stat-icon.red {
  color: #e05b65;
  background: #ffeaed;
}

.stat-content {
  min-width: 0;
}

.stat-content p {
  margin: 0;
  color: #75869e;
  font-size: 11px;
  font-weight: 600;
}

.stat-content h3 {
  margin: 7px 0 6px;
  color: #193252;
  font-size: 24px;
  line-height: 1;
  font-weight: 750;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.stat-change span {
  color: #1eb581;
  font-size: 10px;
  font-weight: 700;
}

.stat-change small {
  color: #a0acba;
  font-size: 9px;
}


/* =========================================================
   COMMON CARD
========================================================= */

.dashboard-card {
  border: 1px solid #e5ebf2;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 3px 12px rgba(33, 60, 91, 0.035);
}

.card-header {
  min-height: 68px;
  padding: 17px 18px 13px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-header h2 {
  margin: 0;
  color: #1d3555;
  font-size: 17px;
  font-weight: 750;
}

.card-header p {
  margin: 4px 0 0;
  color: #97a4b4;
  font-size: 9px;
}

/* Recent Leads and Activity text size */
.recent-leads-card .card-header h2,
.activity-card .card-header h2 {
  font-size: 17px;
}

.recent-leads-card .card-header p,
.activity-card .card-header p {
  font-size: 12px;
}

/* =========================================================
   ANALYTICS
========================================================= */

.analytics-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 1.65fr)
    minmax(320px, 0.9fr);
  gap: 15px;
  margin-bottom: 17px;
}

.chart-card {
  min-height: 330px;
}

.chart-filters {
  display: flex;
  gap: 4px;
}

.chart-filters button {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #8090a5;
  border-radius: 6px;
  padding: 6px 8px;
  min-width: 32px;
  font-size: 9px;
  cursor: pointer;
  outline: none;
  transition: 0.2s ease;
}

.chart-filters button:hover {
  border-color: #267ce9;
  color: #267ce9;
  background: #f5f9ff;
}

.chart-filters button.selected {
  background: #267ce9;
  border-color: #267ce9;
  color: #ffffff;
}

.chart-filters button.selected:hover {
  background: #267ce9;
  border-color: #267ce9;
  color: #ffffff;
}

.dynamic-chart-svg {
  transition: opacity 0.2s ease;
}

.chart-x-axis span {
  min-width: 0;
  white-space: nowrap;
}

.chart-area {
  display: flex;
  height: 245px;
  padding: 0 18px 15px;
}

.chart-y-axis {
  width: 32px;
  padding: 5px 0 31px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #94a1b2;
  font-size: 9px;
  text-align: right;
}

.line-chart {
  position: relative;
  flex: 1;
  min-width: 0;
  margin-left: 9px;
}

.line-chart svg {
  position: absolute;
  inset: 8px 0 28px;
  width: 100%;
  height: calc(100% - 36px);
}

.chart-grid-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: #edf1f5;
}

.line-1 {
  top: 7%;
}

.line-2 {
  top: 28%;
}

.line-3 {
  top: 49%;
}

.line-4 {
  top: 70%;
}

.line-5 {
  top: 91%;
}

.chart-x-axis {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  color: #96a3b3;
  font-size: 8px;
}


/* =========================================================
   LEAD STATUS
========================================================= */

.status-card {
  min-height: 330px;
}

.status-content {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 18px 22px;
}

.donut-wrapper {
  width: 155px;
  display: flex;
  justify-content: center;
}

.donut-chart {
  width: 145px;
  height: 145px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    conic-gradient(
      #f3b436 0 34%,
      #2f80ed 34% 62%,
      #19bb7d 62% 86%,
      #ef626c 86% 100%
    );
  position: relative;
}

.donut-chart::after {
  content: "";
  position: absolute;
  width: 94px;
  height: 94px;
  border-radius: 50%;
  background: #ffffff;
}

.donut-center {
  position: relative;
  z-index: 2;
  text-align: center;
}

.donut-center strong {
  display: block;
  color: #1b3555;
  font-size: 19px;
}

.donut-center span {
  display: block;
  margin-top: 2px;
  color: #8b99aa;
  font-size: 9px;
}

.status-list {
  flex: 1;
}

.status-row {
  display: grid;
  grid-template-columns:
    10px minmax(65px, 1fr) auto auto;
  gap: 7px;
  align-items: center;
  margin-bottom: 15px;
  color: #687a92;
  font-size: 10px;
}

.status-row:last-child {
  margin-bottom: 0;
}

.status-row strong {
  color: #445872;
  font-size: 10px;
}

.status-row small {
  color: #8d9aac;
  font-size: 9px;
}

.status-color {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-color.pending {
  background: #f3b436;
}

.status-color.review {
  background: #2f80ed;
}

.status-color.accepted {
  background: #19bb7d;
}

.status-color.rejected {
  background: #ef626c;
}


/* =========================================================
   LOWER GRID
========================================================= */

.lower-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 1.65fr)
    minmax(320px, 0.9fr);
  gap: 15px;
  margin-bottom: 17px;
}

.recent-leads-card {
  min-width: 0;
}

.view-all-button {
  border: 0;
  background: transparent;
  color: #277ce8;
  font-size: 10px;
  font-weight: 650;
  cursor: pointer;
}

.table-wrapper {
  overflow-x: auto;
  padding: 0 10px 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 650px;
}

thead {
  background: #f7f9fc;
}

th {
  padding: 10px 8px;
  color: #8290a3;
  text-align: left;
font-size: 14px;
  font-weight: 650;
}

td {
  padding: 10px 8px;
  border-top: 1px solid #edf1f5;
  color: #60738e;
font-size: 14px;
  white-space: nowrap;
}

.student-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.student-avatar {
  width: 27px;
  height: 27px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaf3ff;
  color: #2f80ed;
  font-size: 10px;
  font-weight: 750;
}

.student-cell strong {
  display: block;
  color: #344c6b;
 font-size: 14px;
}

.student-cell span {
  display: block;
  color: #a0abba;
  font-size: 11px;
  margin-top: 2px;
}

.lead-status {
  display: inline-flex;
  padding: 5px 8px;
  border-radius: 20px;
 font-size: 12px;
  font-weight: 700;
}

.lead-status.new {
  color: #b47c14;
  background: #fff3d7;
}

.lead-status.purchased {
  color: #2776d9;
  background: #e9f3ff;
}

.lead-status.converted {
  color: #149d6a;
  background: #e4f9f0;
}

.lead-status.invalid {
  color: #d84c59;
  background: #ffecef;
}


/* =========================================================
   ACTIVITY
========================================================= */

.activity-card {
  min-height: 100%;
}

.activity-list {
  padding: 0 18px 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #edf1f5;
}

.activity-item:last-child {
  border-bottom: 0;
}

.activity-icon {
  width: 31px;
  height: 31px;
  flex-shrink: 0;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.activity-icon.green {
  background: #e5f9f0;
  color: #1aac75;
}

.activity-icon.blue {
  background: #eaf3ff;
  color: #2f80ed;
}

.activity-icon.purple {
  background: #f0eaff;
  color: #865cf1;
}

.activity-icon.orange {
  background: #fff2df;
  color: #e49327;
}

.activity-icon.red {
  background: #ffecef;
  color: #dc5862;
}

.activity-details {
  min-width: 0;
}

.activity-details strong {
  display: block;
  color: #4a5d77;
font-size: 14px;
  line-height: 1.4;
}

.activity-details span {
  display: block;
  margin-top: 3px;
  color: #9ba7b7;
 font-size: 11px;
}


/* =========================================================
   QUICK ACTIONS
========================================================= */

.quick-actions-card {
  padding-bottom: 18px;
}

.quick-actions {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 12px;
  padding: 0 18px;
}

.quick-actions button {
  min-height: 75px;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 13px;
  border: 1px solid #e7edf4;
  border-radius: 10px;
  background: #ffffff;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;
}

.quick-actions button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 7px 18px rgba(37, 70, 107, 0.07);
}

.quick-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
}

.quick-icon.blue {
  color: #2f80ed;
  background: #eaf3ff;
}

.quick-icon.green {
  color: #17aa73;
  background: #e5f9f0;
}

.quick-icon.purple {
  color: #885ef2;
  background: #f0eaff;
}

.quick-icon.orange {
  color: #df9025;
  background: #fff2dd;
}

.quick-actions strong {
  display: block;
  color: #435873;
  font-size: 14px;
}

.quick-actions small {
  display: block;
  margin-top: 4px;
  color: #99a6b7;
  font-size: 11px;
}

.quick-actions-card .card-header h2 {
  font-size: 17px;
}

.quick-actions-card .card-header p {
  font-size: 12px;
}

/* =========================================================
   PLACEHOLDER PAGES
========================================================= */

.admin-section-placeholder {
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.placeholder-icon {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaf3ff;
  color: #287bea;
  font-size: 28px;
  margin-bottom: 20px;
}

.admin-section-placeholder h1 {
  margin: 0;
  color: #193252;
  font-size: 28px;
}

.admin-section-placeholder p {
  margin: 8px 0;
  color: #8795a8;
  font-size: 13px;
}

.admin-section-placeholder span {
  color: #2f80ed;
  font-size: 11px;
}



/* =========================================================
   SEARCH RESULTS
========================================================= */

.search-clear {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border: 0;
  border-radius: 50%;
  background: #e8eef6;
  color: #61738e;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.2s ease;
}

.search-clear:hover {
  background: #dbe5f1;
  color: #183f70;
}

.search-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  max-height: 390px;
  overflow-y: auto;
  z-index: 1000;
  padding: 7px;
  background: #ffffff;
  border: 1px solid #e3eaf2;
  border-radius: 12px;
  box-shadow: 0 16px 35px rgba(24, 63, 112, 0.14);
  animation: searchDropIn 0.18s ease-out;
}

@keyframes searchDropIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-results-heading {
  padding: 7px 10px;
  color: #8a9ab0;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-result-item {
  width: 100%;
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) auto;
  align-items: center;
  gap: 9px;
  padding: 9px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-result-item:hover {
  background: #f4f7fb;
}

.search-result-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #edf4ff;
  color: #2f80ed;
  font-size: 15px;
}

.search-result-text {
  min-width: 0;
}

.search-result-text strong {
  display: block;
  overflow: hidden;
  color: #233854;
  font-size: 11px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-result-text small {
  display: block;
  margin-top: 3px;
  overflow: hidden;
  color: #8c9aae;
  font-size: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-result-type {
  flex-shrink: 0;
  padding: 4px 7px;
  border-radius: 20px;
  background: #f0f5fa;
  color: #71839c;
  font-size: 7px;
  font-weight: 700;
}

.search-no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 15px;
  text-align: center;
}

.search-no-results > span {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  border-radius: 50%;
  background: #f2f5f9;
  color: #8c9aae;
  font-size: 18px;
}

.search-no-results strong {
  color: #344a66;
  font-size: 11px;
}

.search-no-results small {
  max-width: 230px;
  margin-top: 4px;
  color: #9aa8b9;
  font-size: 8px;
  line-height: 1.5;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1250px) {

  .stats-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .analytics-grid,
  .lower-grid {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}


@media (max-width: 900px) {

  .admin-sidebar {
    width: 76px;
  }

  .sidebar-brand {
    justify-content: center;
    padding: 0;
  }

  .sidebar-brand > div:last-child,
  .menu-title,
  .sidebar-item span:not(.sidebar-icon),
  .sidebar-admin-card > div:last-child,
  .logout-button span:last-child {
    display: none;
  }

  .sidebar-item {
    justify-content: center;
    padding: 0;
  }

  .sidebar-icon {
    font-size: 18px;
  }

  .sidebar-bottom {
    padding: 10px;
  }

  .sidebar-admin-card {
    justify-content: center;
    padding: 9px;
  }

  .logout-button {
    font-size: 0;
  }

  .logout-button::after {
    content: "↪";
    font-size: 18px;
  }

  .admin-topbar {
    padding: 0 20px;
  }

  .top-search {
    width: 320px;
  }

  .admin-content {
    padding: 22px 20px 35px;
  }

}


@media (max-width: 650px) {

  .top-search-container {
    width: 40px;
  }

  .admin-topbar {
    height: 65px;
  }

  .top-search {
    width: 45px;
    padding: 0;
    justify-content: center;
  }

  .top-search input {
    display: none;
  }


  .search-results {
    position: fixed;
    top: 70px;
    left: 8px;
    right: 8px;
    width: auto;
    max-height: 60vh;
    border-radius: 12px;
  }

  .search-result-item {
    grid-template-columns: 30px minmax(0, 1fr);
  }

  .search-result-type {
    display: none;
  }

  .topbar-right {
    gap: 8px;
  }

  .top-admin-details,
  .top-admin-menu {
    display: none;
  }

  .dashboard-heading {
    display: block;
  }

  .dashboard-date {
    margin-top: 10px;
  }

  .dashboard-heading h1 {
    font-size: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .status-content {
    flex-direction: column;
  }

  .donut-wrapper {
    width: 100%;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .admin-content {
    padding: 18px 12px 30px;
  }

}

/* =========================================================
   VIEW ALL + CHART MOBILE FIX
   Added without changing the existing dashboard layout.
========================================================= */

.view-all-button {
  white-space: nowrap;
  min-width: max-content;
  padding: 3px 0;
  -webkit-tap-highlight-color: transparent;
}

.view-all-button:focus-visible {
  outline: 2px solid #267ce9;
  outline-offset: 3px;
  border-radius: 4px;
}

.chart-filters button {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.dynamic-chart-svg {
  display: block;
}

@media (max-width: 650px) {

  .chart-card .card-header {
    flex-wrap: wrap;
    gap: 10px;
  }

  .chart-card .card-header > div:first-child {
    width: 100%;
  }

  .chart-filters {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .chart-filters::-webkit-scrollbar {
    display: none;
  }

  .chart-filters button {
    flex: 0 0 auto;
    min-width: 42px;
    min-height: 32px;
    padding: 7px 9px;
    font-size: 10px;
  }

  .chart-area {
    min-width: 0;
    padding-left: 10px;
    padding-right: 10px;
  }

  .chart-y-axis {
    width: 25px;
    font-size: 8px;
  }

  .line-chart {
    margin-left: 6px;
    min-width: 0;
  }

  .line-chart svg {
    inset: 8px 0 32px;
    height: calc(100% - 40px);
  }

  .chart-x-axis {
    font-size: 7px;
    gap: 3px;
  }

  .chart-x-axis span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lower-grid {
    min-width: 0;
  }

  .recent-leads-card,
  .activity-card {
    min-width: 0;
  }

  .recent-leads-card .card-header,
  .activity-card .card-header {
    gap: 8px;
  }

  .view-all-button {
    font-size: 10px;
    flex-shrink: 0;
  }

  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
`;

/* =========================================================
   ADMIN LOGIN
========================================================= */

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    // Temporary frontend login
    // Backend authentication can be connected later.
    if (email === "admin@studentcollege.com" && password === "admin123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid admin email or password.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-shell">
        {/* LEFT RAIL */}
        <div className="login-rail">
          <div className="login-logo-icon">🎓</div>

          <div className="login-tab">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-1a6 6 0 0 1 6-6h1.5" />
              <path d="m15 18 2 2 4-4" />
            </svg>
            Sign In
          </div>

          <div className="login-rail-spacer" />
        </div>

        {/* MIDDLE IMAGE PANEL */}
        <div className="login-visual">
          <h2>Welcome back</h2>
          <p>Please enter your credentials</p>

          <div className="login-brand-name">
            Student<span>College</span> · Admin
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="login-form-area">
          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label>Email</label>

              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="admin@studentcollege.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </div>
            </div>

            <div className="login-field">
              <label>Password</label>

              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                    {!showPassword && <path d="M4 4l16 16" />}
                  </svg>
                </button>
              </div>
            </div>

            {error && <div className="login-error">{error}</div>}

            <div className="login-options">
              <label>
                <input type="checkbox" defaultChecked />
                Remember
              </label>

              <button type="button">Forgot password?</button>
            </div>

            <button className="admin-login-button" type="submit">
              Sign In
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN SIDEBAR
========================================================= */

function AdminSidebar({ activePage, setActivePage, onLogout, navigate }) {
  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Students", icon: "♙" },
    { name: "Colleges", icon: "▥" },
    { name: "Courses", icon: "▤" },
    { name: "Leads", icon: "★", important: true },
    { name: "Applications", icon: "▣" },
    { name: "Transactions", icon: "₹" },
    { name: "Reports", icon: "▥" },
    { name: "Notifications", icon: "♢" },
    { name: "Users", icon: "♙" },
    { name: "Settings", icon: "⚙" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">🎓</div>

        <div>
          <h1>
            Student<span>College</span>
          </h1>

          <p>Admission Platform</p>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`sidebar-item ${
              activePage === item.name ? "active" : ""
            }`}
            onClick={() => {
              if (item.name === "Students") {
                navigate("/admin/students");
              } else if (item.name === "Colleges") {
                navigate("/admin/colleges");
              } else {
                setActivePage(item.name);
              }
            }}
          >
            <span className="sidebar-icon">{item.icon}</span>

            <span>{item.name}</span>

            {item.important && <span className="lead-star">★</span>}
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-admin-card">
          <div className="admin-avatar">A</div>

          <div>
            <strong>Admin</strong>
            <span>Super Admin</span>
          </div>
        </div>

        <button className="logout-button" onClick={onLogout}>
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

/* =========================================================
   ADMIN SEARCH DATA
========================================================= */

const adminSearchData = [
  {
    title: "Keerthana",
    subtitle: "STU10928 • B.Tech CSE • ABC Engineering College",
    type: "Student Lead",
    page: "Leads",
  },
  {
    title: "Rahul K",
    subtitle: "STU10927 • B.Tech Mechanical • PSG College",
    type: "Student Lead",
    page: "Leads",
  },
  {
    title: "Ananya R",
    subtitle: "STU10926 • BCA • City College",
    type: "Student Lead",
    page: "Leads",
  },
  {
    title: "Arjun P",
    subtitle: "STU10925 • B.Com • St. Joseph's College",
    type: "Student Lead",
    page: "Leads",
  },
  {
    title: "Sneha M",
    subtitle: "STU10924 • B.Sc Nursing • Medical College",
    type: "Student Lead",
    page: "Leads",
  },
  {
    title: "ABC Engineering College",
    subtitle: "College verification and lead management",
    type: "College",
    page: "Colleges",
  },
  {
    title: "PSG College",
    subtitle: "College lead purchases and transactions",
    type: "College",
    page: "Colleges",
  },
  {
    title: "City College",
    subtitle: "BCA applications and student leads",
    type: "College",
    page: "Colleges",
  },
  {
    title: "B.Tech CSE",
    subtitle: "Computer Science and Engineering",
    type: "Course",
    page: "Courses",
  },
  {
    title: "B.Tech Mechanical",
    subtitle: "Mechanical Engineering",
    type: "Course",
    page: "Courses",
  },
  {
    title: "BCA",
    subtitle: "Bachelor of Computer Applications",
    type: "Course",
    page: "Courses",
  },
  {
    title: "B.Com",
    subtitle: "Bachelor of Commerce",
    type: "Course",
    page: "Courses",
  },
  {
    title: "B.Sc Nursing",
    subtitle: "Nursing course and applications",
    type: "Course",
    page: "Courses",
  },
  {
    title: "₹100 Payment",
    subtitle: "Lead purchase transaction",
    type: "Transaction",
    page: "Transactions",
  },
  {
    title: "Lead Reports",
    subtitle: "Student lead and purchase analytics",
    type: "Report",
    page: "Reports",
  },
  {
    title: "Applications",
    subtitle: "Student application management",
    type: "Application",
    page: "Applications",
  },
  {
    title: "Active Users",
    subtitle: "Currently active platform users",
    type: "User",
    page: "Users",
  },
  {
    title: "Total Students",
    subtitle: "25,430 registered students",
    type: "Dashboard",
    page: "Dashboard",
  },
  {
    title: "Total Colleges",
    subtitle: "325 registered colleges",
    type: "Dashboard",
    page: "Dashboard",
  },
  {
    title: "Total Leads",
    subtitle: "18,250 student leads",
    type: "Dashboard",
    page: "Dashboard",
  },
  {
    title: "Purchased Leads",
    subtitle: "12,450 purchased leads",
    type: "Dashboard",
    page: "Dashboard",
  },
  {
    title: "Total Revenue",
    subtitle: "₹12,45,000 platform revenue",
    type: "Dashboard",
    page: "Dashboard",
  },
];

/* =========================================================
   SEARCH RESULT
========================================================= */

function SearchResult({ item, onSelect }) {
  return (
    <button
      type="button"
      className="search-result-item"
      onClick={() => onSelect(item)}
    >
      <span className="search-result-icon">⌕</span>

      <span className="search-result-text">
        <strong>{item.title}</strong>
        <small>{item.subtitle}</small>
      </span>

      <span className="search-result-type">{item.type}</span>
    </button>
  );
}

/* =========================================================
   TOP HEADER
========================================================= */

function AdminTopbar({ onLogout, searchQuery, setSearchQuery, setActivePage }) {
  const navigate = useNavigate();
  const [showSearchResults, setShowSearchResults] = useState(false);

  const filteredResults = adminSearchData.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return false;
    }

    return (
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.page.toLowerCase().includes(query)
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const handleSearchSelect = (item) => {
    setSearchQuery(item.title);
    setShowSearchResults(false);

    if (item.page === "Colleges") {
      navigate("/admin/colleges");
      return;
    }

    setActivePage(item.page);
  };

  return (
    <header className="admin-topbar">
      <div className="top-search-container">
        <div className="top-search">
          <span>⌕</span>

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowSearchResults(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowSearchResults(false);
              }
            }}
            placeholder="Search students, colleges, leads..."
            aria-label="Search dashboard"
          />

          {searchQuery && (
            <button
              type="button"
              className="search-clear"
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {showSearchResults && searchQuery.trim() && (
          <div className="search-results">
            {filteredResults.length > 0 ? (
              <>
                <div className="search-results-heading">
                  {filteredResults.length} result
                  {filteredResults.length > 1 ? "s" : ""} found
                </div>

                {filteredResults.slice(0, 8).map((item, index) => (
                  <SearchResult
                    key={`${item.title}-${item.type}-${index}`}
                    item={item}
                    onSelect={handleSearchSelect}
                  />
                ))}
              </>
            ) : (
              <div className="search-no-results">
                <span>⌕</span>
                <strong>No results found</strong>
                <small>
                  Try student name, college, course, lead or application.
                </small>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="topbar-right">
        <button className="notification-button">
          ♢<span className="notification-dot"></span>
        </button>

        <div className="top-admin">
          <div className="top-admin-avatar">A</div>

          <div className="top-admin-details">
            <strong>Admin</strong>
            <span>Super Admin</span>
          </div>

          <button className="top-admin-menu" onClick={onLogout} title="Logout">
            ⌄
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ icon, title, value, change, description, iconClass }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconClass}`}>{icon}</div>

      <div className="stat-content">
        <p>{title}</p>

        <h3>{value}</h3>

        <div className="stat-change">
          <span>↑ {change}</span>
          <small>{description}</small>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD HOME
========================================================= */

function DashboardHome() {
  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning, Admin"
      : currentHour < 17
        ? "Good Afternoon, Admin"
        : "Good Evening, Admin";

  const [showAllLeads, setShowAllLeads] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  /* =========================================================
     LEADS & APPLICATIONS CHART DATA
  ========================================================= */

  const [chartPeriod, setChartPeriod] = useState("30D");

  const chartData = {
    "7D": {
      values: [120, 210, 180, 360, 310, 470, 540],
      labels: [
        "Sep 23",
        "Sep 24",
        "Sep 25",
        "Sep 26",
        "Sep 27",
        "Sep 28",
        "Sep 29",
      ],
    },

    "30D": {
      values: [
        80, 150, 320, 240, 420, 370, 480, 430, 610, 500, 660, 550, 720, 680,
        810,
      ],
      labels: [
        "Aug 25",
        "Aug 27",
        "Aug 29",
        "Sep 01",
        "Sep 04",
        "Sep 07",
        "Sep 09",
        "Sep 12",
        "Sep 14",
        "Sep 17",
        "Sep 19",
        "Sep 22",
        "Sep 24",
        "Sep 27",
        "Sep 29",
      ],
    },

    "3M": {
      values: [180, 260, 220, 390, 340, 480, 430, 560, 510, 640, 590, 710],
      labels: [
        "Jul",
        "Jul 08",
        "Jul 16",
        "Jul 24",
        "Aug",
        "Aug 08",
        "Aug 16",
        "Aug 24",
        "Sep",
        "Sep 08",
        "Sep 18",
        "Sep 29",
      ],
    },

    "6M": {
      values: [120, 180, 250, 220, 340, 300, 430, 390, 510, 470, 620, 580],
      labels: [
        "Apr",
        "Apr 15",
        "May",
        "May 15",
        "Jun",
        "Jun 15",
        "Jul",
        "Jul 15",
        "Aug",
        "Aug 15",
        "Sep",
        "Sep 29",
      ],
    },

    "1Y": {
      values: [100, 180, 150, 240, 300, 270, 390, 450, 420, 560, 650, 810],
      labels: [
        "Oct 2025",
        "Nov",
        "Dec",
        "Jan 2026",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  const activeChart = chartData[chartPeriod];

  const chartPoints = activeChart.values
    .map((value, index) => {
      const x = (index / (activeChart.values.length - 1)) * 700;
      const y = 260 - (value / 800) * 250;
      return `${x},${y}`;
    })
    .join(" ");

  const chartAreaPath = `
    M0 260
    ${activeChart.values
      .map((value, index) => {
        const x = (index / (activeChart.values.length - 1)) * 700;
        const y = 260 - (value / 800) * 250;
        return `L${x} ${y}`;
      })
      .join(" ")}
    L700 260
    Z
  `;

  const recentLeads = [
    {
      id: "STU10928",
      student: "Keerthana",
      college: "ABC Engineering College",
      course: "B.Tech CSE",
      status: "New",
      date: "29 Sep 2026",
    },
    {
      id: "STU10927",
      student: "Rahul K",
      college: "PSG College",
      course: "B.Tech Mechanical",
      status: "Purchased",
      date: "29 Sep 2026",
    },
    {
      id: "STU10926",
      student: "Ananya R",
      college: "City College",
      course: "BCA",
      status: "Converted",
      date: "28 Sep 2026",
    },
    {
      id: "STU10925",
      student: "Arjun P",
      college: "St. Joseph's College",
      course: "B.Com",
      status: "New",
      date: "28 Sep 2026",
    },
    {
      id: "STU10924",
      student: "Sneha M",
      college: "Medical College",
      course: "B.Sc Nursing",
      status: "Invalid",
      date: "27 Sep 2026",
    },
    {
      id: "STU10923",
      student: "Vignesh R",
      college: "Kumaraguru College",
      course: "B.Tech IT",
      status: "Purchased",
      date: "27 Sep 2026",
    },
    {
      id: "STU10922",
      student: "Priya S",
      college: "PSG College",
      course: "BCA",
      status: "Converted",
      date: "26 Sep 2026",
    },
    {
      id: "STU10921",
      student: "Karthik M",
      college: "City College",
      course: "B.Tech ECE",
      status: "New",
      date: "26 Sep 2026",
    },
    {
      id: "STU10920",
      student: "Divya P",
      college: "St. Joseph's College",
      course: "B.Com",
      status: "Purchased",
      date: "25 Sep 2026",
    },
    {
      id: "STU10919",
      student: "Arun K",
      college: "ABC Engineering College",
      course: "B.Tech CSE",
      status: "Converted",
      date: "25 Sep 2026",
    },
  ];

  const activities = [
    {
      icon: "✓",
      title: "ABC Engineering College approved",
      time: "10 minutes ago",
      type: "green",
    },
    {
      icon: "₹",
      title: "PSG College purchased a student lead",
      time: "25 minutes ago",
      type: "blue",
    },
    {
      icon: "♙",
      title: "New student STU10928 registered",
      time: "40 minutes ago",
      type: "purple",
    },
    {
      icon: "✓",
      title: "College verification completed",
      time: "1 hour ago",
      type: "orange",
    },
    {
      icon: "₹",
      title: "Payment of ₹100 completed",
      time: "2 hours ago",
      type: "red",
    },
    {
      icon: "✓",
      title: "New college profile verified",
      time: "3 hours ago",
      type: "green",
    },
    {
      icon: "♙",
      title: "New student STU10927 registered",
      time: "4 hours ago",
      type: "purple",
    },
    {
      icon: "₹",
      title: "Student lead purchased by PSG College",
      time: "5 hours ago",
      type: "blue",
    },
    {
      icon: "✓",
      title: "Application status updated",
      time: "6 hours ago",
      type: "orange",
    },
    {
      icon: "₹",
      title: "Payment of ₹100 completed",
      time: "7 hours ago",
      type: "red",
    },
  ];

  return (
    <div className="dashboard-home">
      {/* PAGE HEADER */}

      <div className="dashboard-heading">
        <div>
          <h1>{greeting}</h1>

          <p>
            Manage students, colleges, leads, applications and platform activity
            in one place.
          </p>
        </div>

        <div className="dashboard-date">
          <span>Wednesday, 29 Sep 2026</span>
          <span className="calendar-icon">▣</span>
        </div>
      </div>

      {/* STAT CARDS */}

      <div className="stats-grid">
        <StatCard
          icon="♙"
          title="Total Students"
          value="25,430"
          change="+12%"
          description="vs last month"
          iconClass="blue"
        />

        <StatCard
          icon="▥"
          title="Total Colleges"
          value="325"
          change="+5%"
          description="vs last month"
          iconClass="green"
        />

        <StatCard
          icon="★"
          title="Total Leads"
          value="18,250"
          change="+18%"
          description="vs last month"
          iconClass="purple"
        />

        <StatCard
          icon="▣"
          title="Applications"
          value="3,642"
          change="+8%"
          description="vs last month"
          iconClass="orange"
        />

        <StatCard
          icon="🔓"
          title="Purchased Leads"
          value="12,450"
          change="+15%"
          description="vs last month"
          iconClass="cyan"
        />

        <StatCard
          icon="₹"
          title="Total Revenue"
          value="₹12,45,000"
          change="+20%"
          description="vs last month"
          iconClass="gold"
        />

        <StatCard
          icon="♙"
          title="Active Users"
          value="152"
          change="+8%"
          description="vs last month"
          iconClass="pink"
        />

        <StatCard
          icon="⚡"
          title="Recent Activity"
          value="24"
          change="+6"
          description="today"
          iconClass="red"
        />
      </div>

      {/* ANALYTICS ROW */}

      <div className="analytics-grid">
        {/* GRAPH */}

        <div className="dashboard-card chart-card">
          <div className="card-header">
            <div>
              <h2>Leads & Applications Overview</h2>
              <p>Platform activity over the selected period</p>
            </div>

            <div className="chart-filters">
              {["7D", "30D", "3M", "6M", "1Y"].map((period) => (
                <button
                  key={period}
                  type="button"
                  className={chartPeriod === period ? "selected" : ""}
                  onClick={() => setChartPeriod(period)}
                  aria-pressed={chartPeriod === period}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-area">
            <div className="chart-y-axis">
              <span>800</span>
              <span>600</span>
              <span>400</span>
              <span>200</span>
              <span>0</span>
            </div>

            <div className="line-chart">
              <div className="chart-grid-line line-1"></div>
              <div className="chart-grid-line line-2"></div>
              <div className="chart-grid-line line-3"></div>
              <div className="chart-grid-line line-4"></div>
              <div className="chart-grid-line line-5"></div>

              <svg
                viewBox="0 0 700 260"
                preserveAspectRatio="none"
                key={chartPeriod}
                className="dynamic-chart-svg"
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2f80ed" stopOpacity="0.25" />

                    <stop
                      offset="100%"
                      stopColor="#2f80ed"
                      stopOpacity="0.02"
                    />
                  </linearGradient>
                </defs>

                <path d={chartAreaPath} fill="url(#areaGradient)" />

                <polyline
                  points={chartPoints}
                  fill="none"
                  stroke="#2f80ed"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {activeChart.values.map((value, index) => {
                  const x = (index / (activeChart.values.length - 1)) * 700;
                  const y = 260 - (value / 800) * 250;

                  return (
                    <circle
                      key={`${chartPeriod}-${index}`}
                      cx={x}
                      cy={y}
                      r={index === activeChart.values.length - 1 ? "5" : "4"}
                      fill="#2f80ed"
                    />
                  );
                })}
              </svg>

              <div className="chart-x-axis">
                {activeChart.labels.map((label, index) => (
                  <span key={`${chartPeriod}-label-${index}`}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LEAD STATUS */}

        <div className="dashboard-card status-card">
          <div className="card-header">
            <div>
              <h2>Lead Status</h2>
              <p>Current lead distribution</p>
            </div>
          </div>

          <div className="status-content">
            <div className="donut-wrapper">
              <div className="donut-chart">
                <div className="donut-center">
                  <strong>18,250</strong>
                  <span>Total Leads</span>
                </div>
              </div>
            </div>

            <div className="status-list">
              <div className="status-row">
                <span className="status-color pending"></span>
                <span>New</span>
                <strong>6,205</strong>
                <small>34%</small>
              </div>

              <div className="status-row">
                <span className="status-color review"></span>
                <span>Purchased</span>
                <strong>5,110</strong>
                <small>28%</small>
              </div>

              <div className="status-row">
                <span className="status-color accepted"></span>
                <span>Converted</span>
                <strong>4,380</strong>
                <small>24%</small>
              </div>

              <div className="status-row">
                <span className="status-color rejected"></span>
                <span>Invalid</span>
                <strong>2,555</strong>
                <small>14%</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER CONTENT */}

      <div className="lower-grid">
        {/* RECENT LEADS */}

        <div className="dashboard-card recent-leads-card">
          <div className="card-header">
            <div>
              <h2>Recent Student Leads</h2>
              <p>Latest student leads received by the platform</p>
            </div>

            <button
              type="button"
              className="view-all-button"
              onClick={() => setShowAllLeads((previous) => !previous)}
              aria-expanded={showAllLeads}
            >
              {showAllLeads ? "Show Less ←" : "View All →"}
            </button>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>College</th>
                  <th>Course</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentLeads
                  .slice(0, showAllLeads ? recentLeads.length : 5)
                  .map((lead, index) => (
                    <tr key={lead.id}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="student-cell">
                          <div className="student-avatar">
                            {lead.student.charAt(0)}
                          </div>

                          <div>
                            <strong>{lead.student}</strong>
                            <span>{lead.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>{lead.college}</td>

                      <td>{lead.course}</td>

                      <td>{lead.date}</td>

                      <td>
                        <span
                          className={`lead-status ${lead.status.toLowerCase()}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT ACTIVITY */}

        <div className="dashboard-card activity-card">
          <div className="card-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest admin and platform activities</p>
            </div>

            <button
              type="button"
              className="view-all-button"
              onClick={() => setShowAllActivities((previous) => !previous)}
              aria-expanded={showAllActivities}
            >
              {showAllActivities ? "Show Less ←" : "View All →"}
            </button>
          </div>

          <div className="activity-list">
            {activities
              .slice(0, showAllActivities ? activities.length : 5)
              .map((activity, index) => (
                <div className="activity-item" key={index}>
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.icon}
                  </div>

                  <div className="activity-details">
                    <strong>{activity.title}</strong>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}

      <div className="dashboard-card quick-actions-card">
        <div className="card-header">
          <div>
            <h2>Quick Actions</h2>
            <p>Frequently used admin actions</p>
          </div>
        </div>

        <div className="quick-actions">
          <button>
            <span className="quick-icon blue">✓</span>
            <span>
              <strong>Verify Colleges</strong>
              <small>Review pending colleges</small>
            </span>
          </button>

          <button>
            <span className="quick-icon green">★</span>
            <span>
              <strong>View New Leads</strong>
              <small>Check recent student leads</small>
            </span>
          </button>

          <button>
            <span className="quick-icon purple">₹</span>
            <span>
              <strong>Transactions</strong>
              <small>Monitor ₹100 purchases</small>
            </span>
          </button>

          <button>
            <span className="quick-icon orange">▥</span>
            <span>
              <strong>Generate Report</strong>
              <small>Download analytics report</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PLACEHOLDER FOR OTHER ADMIN PAGES
========================================================= */

function AdminSection({ title }) {
  return (
    <div className="admin-section-placeholder">
      <div className="placeholder-icon">⚙</div>

      <h1>{title}</h1>

      <p>{title} management page will be connected here.</p>

      <span>Dashboard UI is ready.</span>
    </div>
  );
}

/* =========================================================
   MAIN ADMIN DASHBOARD
========================================================= */
function AdminDashboard() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("adminLoggedIn") === "true";
  });

  const [activePage, setActivePage] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => {
    sessionStorage.setItem("adminLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
    setActivePage("Dashboard");
    setSearchQuery("");
    navigate("/admin/dashboard", { replace: true });
  };

  if (!isLoggedIn) {
    return (
      <>
        <style>{adminStyles}</style>
        <AdminLogin onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-app">
        <AdminSidebar
          activePage={activePage}
          setActivePage={setActivePage}
          onLogout={handleLogout}
          navigate={navigate}
        />

        <div className="admin-main">
          <AdminTopbar
            onLogout={handleLogout}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActivePage={setActivePage}
          />

          <main className="admin-content">
            {activePage === "Dashboard" ? (
              <DashboardHome />
            ) : (
              <AdminSection title={activePage} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;