import { useEffect, useMemo, useState } from "react";

const leads = [
  { id: "STU10234", name: "Keerthi", course: "B.Tech CSE", location: "Coimbatore", score: "82%", status: "New" },
  { id: "STU10241", name: "Rahul K", course: "B.Tech IT", location: "Chennai", score: "88%", status: "Interested" },
  { id: "STU10256", name: "Ananya R", course: "BCA", location: "Erode", score: "79%", status: "New" },
  { id: "STU10263", name: "Arun P", course: "B.Com", location: "Salem", score: "84%", status: "Contacted" },
  { id: "STU10271", name: "Priya S", course: "B.Sc CS", location: "Madurai", score: "91%", status: "New" },
];

const courses = [
  { name: "B.Tech Computer Science", short: "B.Tech CSE", leads: 42, seats: 120, progress: 82 },
  { name: "B.Tech Information Technology", short: "B.Tech IT", leads: 31, seats: 90, progress: 64 },
  { name: "BCA", short: "BCA", leads: 24, seats: 80, progress: 51 },
];

const activities = [
  ["New student lead received", "Keerthi showed interest in B.Tech CSE", "2 min ago"],
  ["Student profile unlocked", "₹100 payment completed for STU10231", "24 min ago"],
  ["Course updated", "B.Tech CSE seats updated to 120", "1 hour ago"],
  ["New enquiry received", "A student from Madurai is interested", "3 hours ago"],
];

function Icon({ name, size = 20 }) {
  const paths = {
    dashboard: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
    building: "M4 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M2 21h20M8 7h2m2 0h2M8 11h2m2 0h2M8 15h2m2 0h2M8 19h2m2 0h2",
    users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-3a4 4 0 0 1 0 8m4 5v-2a4 4 0 0 0-3-3.87",
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 1 4 19.5Z",
    card: "M3 6h18v12H3V6Zm0 4h18M7 15h3",
    profile: "M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    logout: "M10 17l5-5-5-5m5 5H3m9-9V3h9v18h-9v-2",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
    search: "m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Z",
    plus: "M12 5v14M5 12h14",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    wallet: "M3 7h18v13H3V7Zm0 0 2-3h14l2 3M16 13h5",
    chart: "M4 19V5m0 14h16M8 16v-5m4 5V7m4 9v-8",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "M6 6l12 12M18 6 6 18",
    chevron: "m9 18 6-6-6-6",
    check: "m5 12 4 4L19 6",
    location: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
    money: "M12 1v22M17 5.5C16.2 4.6 14.7 4 12.8 4 9.8 4 8 5.5 8 7.6c0 2.4 2.2 3.3 4.8 3.9 2.4.6 4.2 1.5 4.2 3.7 0 2.3-2 3.8-5 3.8-2.1 0-3.9-.7-5-2",
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.dashboard} />
    </svg>
  );
}

export default function CollegeDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [toast, setToast] = useState("");
  const [animated, setAnimated] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    const clock = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => {
      clearTimeout(timer);
      clearInterval(clock);
    };
  }, []);

  const greeting = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 16) return "Good afternoon";
    if (hour < 20) return "Good evening";
    return "Good night";
  }, [currentTime]);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return leads;
    return leads.filter((lead) =>
      `${lead.name} ${lead.id} ${lead.course} ${lead.location} ${lead.status}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  };

  const navigate = (item) => {
    setActive(item);
    setMobileOpen(false);
    if (item !== "Dashboard") {
      notify(`${item} section selected`);
    }
  };

  const menu = [
    ["Dashboard", "dashboard"],
    ["Student Leads", "users"],
    ["Courses", "book"],
    ["Purchased Profiles", "users"],
    ["Transactions", "card"],
    ["College Profile", "profile"],
  ];

  return (
    <div className={`college-dashboard ${animated ? "is-ready" : ""}`}>
      <style>{`
        *{box-sizing:border-box}
        html,body,#root{width:100%;min-width:0;margin:0;padding:0}
        body{background:#f4f8fd}
        button,input{font:inherit}
        button{cursor:pointer}
        .college-dashboard{
          width:100%;
          min-height:100vh;
          background:
            radial-gradient(circle at 80% 0%,rgba(24,119,242,.08),transparent 25%),
            linear-gradient(180deg,#f7faff 0%,#f3f7fc 100%);
          color:#12345e;
          font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
          overflow-x:hidden;
        }

        /* layout */
        .college-shell{display:flex;width:100%;min-height:100vh}
        .college-sidebar{
          position:fixed;
          z-index:60;
          inset:0 auto 0 0;
          width:290px;
          height:100vh;
          padding:26px 18px 20px;
          display:flex;
          flex-direction:column;
          color:#fff;
          background:linear-gradient(180deg,#073b8f 0%,#0759c7 58%,#0876ed 100%);
          box-shadow:10px 0 35px rgba(10,51,105,.10);
          transition:transform .28s ease;
        }
        .college-main{
          width:calc(100% - 290px);
          min-width:0;
          margin-left:290px;
        }

        /* brand */
        .college-brand{display:flex;align-items:center;gap:12px;padding:2px 9px 27px}
        .college-brand-mark{
          width:48px;height:48px;border-radius:12px;background:#fff;color:#0866d4;
          display:grid;place-items:center;font-weight:900;font-size:14px;
          box-shadow:0 8px 22px rgba(0,0,0,.12)
        }
        .college-brand-name{font-size:23px;font-weight:850;letter-spacing:-.5px}
        .college-brand-sub{font-size:11px;color:#cfe2ff;margin-top:3px;letter-spacing:.1px}

        /* sidebar */
        .college-nav-label{font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#a9c8f4;padding:0 12px 10px}
        .college-nav{display:flex;flex-direction:column;gap:5px}
        .college-nav-item{
          width:100%;min-height:52px;border:0;border-radius:13px;padding:0 15px;
          display:flex;align-items:center;gap:12px;background:transparent;color:#dceaff;
          text-align:left;font-size:15px;font-weight:650;transition:.22s ease;
        }
        .college-nav-item:hover{background:rgba(255,255,255,.10);color:#fff;transform:translateX(2px)}
        .college-nav-item.active{
          color:#0864d1;background:#fff;
          box-shadow:0 10px 25px rgba(0,0,0,.13)
        }
        .college-sidebar-spacer{flex:1}
        .college-side-user{
          padding:15px 9px;border-top:1px solid rgba(255,255,255,.15);
          display:flex;align-items:center;gap:10px
        }
        .college-avatar{
          width:40px;height:40px;border-radius:50%;display:grid;place-items:center;
          flex:none;background:#e5f0ff;color:#075ebf;font-size:13px;font-weight:850;
          border:1px solid rgba(8,103,214,.12)
        }
        .college-side-user strong{display:block;font-size:13px}
        .college-side-user span{display:block;font-size:10px;color:#c0d7f7;margin-top:3px}
        .college-logout{margin-top:4px}

        /* topbar */
        .college-topbar{
          width:100%;height:84px;padding:0 40px;background:rgba(255,255,255,.92);
          border-bottom:1px solid #e3eaf3;display:flex;align-items:center;
          justify-content:space-between;gap:20px;position:sticky;top:0;z-index:40;
          backdrop-filter:blur(14px)
        }
        .college-top-left{display:flex;align-items:center;gap:12px;min-width:0}
        .college-mobile-menu{
          display:none;width:48px;height:48px;border:1px solid #dfe8f3;border-radius:11px;
          background:#fff;color:#0967d4
        }
         .college-top-title{font-size:23px;font-weight:850;color:#102b4d;letter-spacing:-.35px}
        .college-top-sub{font-size:11px;color:#8494aa;margin-top:4px}
        .college-top-actions{display:flex;align-items:center;gap:14px}
        .college-search{
          width:360px;height:50px;border:1px solid #dfe7f1;background:#f7f9fc;
          border-radius:13px;display:flex;align-items:center;padding:0 15px;color:#8191a8
        }
         .college-search input{width:100%;border:0;outline:0;background:transparent;color:#172f4f;font-size:16px;margin-left:10px}
        .college-search input::placeholder{color:#65758a}
        .college-icon-btn{
          width:48px;height:48px;border:1px solid #dfe7f1;border-radius:11px;
          background:#fff;color:#5e7492;display:grid;place-items:center;position:relative
        }
        .college-icon-btn:hover{color:#0967d4;border-color:#b9d5f6}
        .college-notification-dot{position:absolute;right:8px;top:8px;width:7px;height:7px;border-radius:50%;background:#ef4444;border:2px solid #fff}
        .college-user{display:flex;align-items:center;gap:9px}
        .college-user strong{display:block;font-size:13px;color:#234263}
        .college-user span{display:block;font-size:10px;color:#8b99ab;margin-top:3px}

        /* notification */
        .college-notification{
          position:absolute;right:32px;top:65px;width:280px;background:#fff;border:1px solid #e1e8f2;
          border-radius:14px;box-shadow:0 20px 45px rgba(24,55,95,.16);padding:15px;z-index:80;
          animation:dropIn .22s ease
        }
        .college-notification strong{font-size:12px}
        .college-notification p{font-size:12px;color:#53667d;line-height:1.5;margin:7px 0 0}

        /* content */
        .college-content{width:100%;padding:42px 46px 55px}
        .college-welcome{
          display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:25px
        }
        .college-welcome h1{margin:0;font-size:38px;line-height:1.18;letter-spacing:-1px;color:#102f59}
        .college-welcome p{margin:9px 0 0;font-size:16px;color:#52657d}
        .college-primary{
          display:flex;align-items:center;gap:7px;border:0;border-radius:10px;
          padding:14px 20px;background:linear-gradient(135deg,#086ce1,#0754bd);color:#fff;
          font-size:13px;font-weight:800;box-shadow:0 10px 24px rgba(8,103,214,.20);
          transition:.22s ease
        }
        .college-primary:hover{transform:translateY(-2px);box-shadow:0 14px 28px rgba(8,103,214,.28)}

        /* stats */
        .college-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px;margin-bottom:26px}
        .college-stat{
          position:relative;overflow:hidden;background:#fff;border:1px solid #e1e9f3;border-radius:17px;
          padding:23px 24px;min-height:158px;box-shadow:0 7px 25px rgba(30,66,110,.045);
          opacity:0;transform:translateY(18px);animation:rise .6s ease forwards
        }
        .college-stat:nth-child(2){animation-delay:.08s}.college-stat:nth-child(3){animation-delay:.16s}.college-stat:nth-child(4){animation-delay:.24s}
        .college-stat:after{
          content:"";position:absolute;width:90px;height:90px;border-radius:50%;right:-35px;bottom:-45px;
          background:rgba(24,119,242,.06)
        }
        .college-stat-head{display:flex;align-items:center;justify-content:space-between}
        .college-stat-icon{
          width:48px;height:48px;border-radius:12px;background:#eaf3ff;color:#0869db;display:grid;place-items:center
        }
        .college-stat-change{font-size:11px;font-weight:800;color:#087a50;background:#eafaf3;padding:6px 8px;border-radius:99px}
        .college-stat-value{font-size:36px;font-weight:850;letter-spacing:-.7px;color:#112f5a;margin-top:15px}
        .college-stat-label{font-size:15px;color:#40566f;margin-top:4px}

        /* main grid */
        .college-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(320px,1fr);gap:24px;align-items:start}
        .college-card{
          background:#fff;border:1px solid #e1e9f3;border-radius:17px;overflow:hidden;
          box-shadow:0 7px 25px rgba(30,66,110,.045)
        }
        .college-card-header{
          padding:23px 25px;border-bottom:1px solid #edf1f6;display:flex;align-items:center;
          justify-content:space-between;gap:14px
        }
        .college-card-header h2{margin:0;font-size:20px;color:#17365e;letter-spacing:-.2px}
        .college-card-header p{margin:6px 0 0;color:#5f7187;font-size:13px}
        .college-link{
          border:0;background:transparent;color:#0869d8;font-size:12px;font-weight:800;
          display:flex;align-items:center;gap:5px;white-space:nowrap
        }

        /* table */
        .college-table-wrap{overflow-x:auto}
        .college-table{width:100%;border-collapse:collapse;min-width:720px}
        .college-table th{
          padding:17px 20px;background:#fbfcfe;color:#52657a;font-size:12px;
          font-weight:800;text-transform:uppercase;letter-spacing:.4px;text-align:left
        }
        .college-table td{
          padding:18px 20px;border-top:1px solid #edf1f5;color:#263f5c;font-size:14px;white-space:nowrap
        }
        .college-table tbody tr{transition:.2s ease}
        .college-table tbody tr:hover{background:#f8fbff}
        .college-student{display:flex;align-items:center;gap:10px}
        .college-student-avatar{
          width:33px;height:33px;border-radius:10px;background:#e9f2ff;color:#0869d8;
          display:grid;place-items:center;font-size:11px;font-weight:850
        }
        .college-student strong{display:block;font-size:14px;color:#172f4d}
        .college-student span{display:block;font-size:12px;color:#62748a;margin-top:3px}
        .college-status{display:inline-flex;padding:7px 11px;border-radius:99px;font-size:11px;font-weight:800}
        .college-status.new{background:#e9f7ff;color:#0870d7}
        .college-status.interested{background:#fff4df;color:#ca8209}
        .college-status.contacted{background:#eaf8f1;color:#15905b}
        .college-unlock{
          border:1px solid #b8d8fa;background:#eff7ff;color:#0869d8;
          padding:10px 14px;border-radius:8px;font-size:12px;font-weight:850;transition:.2s
        }
        .college-unlock:hover{background:#0869d8;color:#fff;transform:translateY(-1px)}

        /* side cards */
        .college-side-stack{display:flex;flex-direction:column;gap:20px}
        .college-balance{
          padding:25px;color:#fff;border:0;
          background:linear-gradient(135deg,#0752ad 0%,#0877ed 100%);
          box-shadow:0 14px 32px rgba(8,99,207,.18);position:relative;overflow:hidden
        }
        .college-balance:after{
          content:"";position:absolute;width:150px;height:150px;border:28px solid rgba(255,255,255,.06);
          border-radius:50%;right:-70px;top:-70px
        }
        .college-balance small{font-size:11px;color:#cfe3ff;letter-spacing:.8px}
        .college-balance h3{font-size:36px;margin:15px 0 5px;letter-spacing:-1px}
        .college-balance-row{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:15px}
        .college-balance-row span{font-size:12px;color:#e4f0ff}
        .college-add-money{
          border:0;background:#fff;color:#075bb8;border-radius:8px;padding:11px 16px;font-size:12px;font-weight:850
        }
        .college-quick-list{padding:5px 20px 12px}
        .college-quick{
          width:100%;border:0;border-bottom:1px solid #edf1f5;background:#fff;padding:18px 0;
          display:flex;align-items:center;gap:11px;text-align:left
        }
        .college-quick:last-child{border-bottom:0}
        .college-quick:hover .college-quick-icon{transform:scale(1.06);background:#ddecff}
        .college-quick-icon{
          width:42px;height:42px;border-radius:10px;background:#edf5ff;color:#0869d8;
          display:grid;place-items:center;transition:.2s;flex:none
        }
        .college-quick strong{display:block;color:#173652;font-size:14px}
        .college-quick span{display:block;color:#5d7087;font-size:12px;margin-top:5px}
        .college-quick-arrow{margin-left:auto;color:#a1afbf}

        /* lower cards */
        .college-bottom-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:20px;margin-top:20px}
        .college-course-list{padding:5px 21px 17px}
        .college-course-row{padding:15px 0;border-bottom:1px solid #edf1f5}
        .college-course-row:last-child{border-bottom:0}
        .college-course-top{display:flex;align-items:center;justify-content:space-between;gap:15px}
        .college-course-top strong{font-size:13px;color:#1b3b5a}
        .college-course-top span{font-size:13px;color:#5d7087;white-space:nowrap}
        .college-progress{height:7px;background:#edf2f7;border-radius:99px;overflow:hidden;margin-top:9px}
        .college-progress i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#0877ed,#3da1ff);transform-origin:left;animation:grow 1s ease both}
        .college-activity{padding:7px 21px 16px}
        .college-activity-item{display:flex;gap:12px;padding:13px 0;border-bottom:1px solid #edf1f5}
        .college-activity-item:last-child{border-bottom:0}
        .college-activity-dot{
          width:9px;height:9px;border-radius:50%;background:#1b7bea;margin-top:4px;
          box-shadow:0 0 0 5px #eaf3ff;flex:none
        }
        .college-activity strong{font-size:14px;color:#173652}
        .college-activity p{font-size:12px;color:#52677f;margin:5px 0 0;line-height:1.55}
        .college-activity time{display:block;font-size:11px;color:#64778d;margin-top:5px}

        .college-footer{text-align:center;color:#64758a;font-size:12px;margin-top:32px}
        .college-toast{
          position:fixed;z-index:100;right:25px;bottom:25px;background:#113d78;color:#fff;
          padding:12px 16px;border-radius:10px;font-size:10px;box-shadow:0 14px 30px rgba(0,0,0,.18);
          animation:toastIn .25s ease
        }
        .college-overlay{display:none}

        /* readability */
        .college-table th,.college-table td{letter-spacing:.05px}
        .college-table th{font-weight:850}
        .college-stat-label,.college-card-header p,.college-welcome p{line-height:1.5}
        .college-search input{min-width:0}

        /* animations */
        @keyframes rise{to{opacity:1;transform:translateY(0)}}
        @keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes dropIn{from{opacity:0;transform:translateY(-7px)}to{opacity:1;transform:translateY(0)}}
        @keyframes toastIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

        /* large tablets */
        @media(max-width:1200px){
          .college-sidebar{width:250px}
          .college-main{width:calc(100% - 250px);margin-left:250px}
          .college-content{padding:34px 32px 48px}
          .college-topbar{padding:0 30px}
          .college-search{width:340px}
          .college-grid{grid-template-columns:minmax(0,1.65fr) minmax(285px,.85fr)}
          .college-welcome h1{font-size:34px}
        }

        /* tablet */
        @media(max-width:980px){
          .college-sidebar{width:235px}
          .college-main{width:calc(100% - 235px);margin-left:235px}
          .college-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
          .college-grid,.college-bottom-grid{grid-template-columns:1fr}
          .college-side-stack{display:grid;grid-template-columns:1fr 1fr}
          .college-top-actions .college-search{width:300px}
          .college-user>div:not(.college-avatar){display:none}
        }

        /* mobile */
        @media(max-width:760px){
          .college-sidebar{
            width:290px;transform:translateX(-105%);box-shadow:15px 0 40px rgba(0,0,0,.22)
          }
          .college-sidebar.open{transform:translateX(0)}
          .college-overlay{
            display:block;position:fixed;z-index:55;inset:0;background:rgba(4,24,52,.48);
            opacity:0;pointer-events:none;transition:.22s
          }
          .college-overlay.show{opacity:1;pointer-events:auto}
          .college-main{width:100%;margin-left:0}
          .college-topbar{height:70px;padding:0 15px}
          .college-mobile-menu{display:grid;place-items:center}
          .college-top-title{font-size:16px}
          .college-top-sub{font-size:9px}
          .college-top-actions{margin-left:auto}
          .college-search{
            display:flex;position:absolute;left:15px;right:15px;top:78px;width:auto;height:46px;
            background:#fff;border:1px solid #dce6f2;border-radius:12px;box-shadow:0 8px 22px rgba(31,68,110,.08);
          }
          .college-top-actions .college-icon-btn{width:39px;height:39px}
          .college-user>div:not(.college-avatar){display:none}
          .college-user .college-avatar{width:37px;height:37px}
          .college-content{padding:78px 15px 35px}
          .college-welcome{align-items:flex-start;display:block;margin-bottom:20px}
          .college-welcome h1{font-size:30px;line-height:1.25}
          .college-welcome p{font-size:14px;line-height:1.6}
          .college-primary{margin-top:15px;width:100%;justify-content:center}
          .college-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
          .college-stat{min-height:130px;padding:15px}
          .college-stat-value{font-size:29px}
          .college-stat-label{font-size:12px}
          .college-grid,.college-bottom-grid{gap:14px}
          .college-side-stack{display:flex}
          .college-card-header{padding:16px}
          .college-card-header h2{font-size:17px}
          .college-card-header p{font-size:12px}
          .college-table{min-width:690px}
          .college-balance{padding:19px}
          .college-balance h3{font-size:34px}

          .college-activity strong{font-size:13px;color:#173652}
          .college-activity p{font-size:12px;color:#52677f;line-height:1.55}
          .college-activity time{font-size:11px;color:#64778d}
          .college-quick strong{font-size:13px;color:#173652}
          .college-quick span{font-size:11px;color:#5d7087}
          .college-notification{right:15px;left:15px;width:auto}
        }

        /* small phones */
        @media(max-width:430px){
          .college-content{padding:78px 12px 30px}
          .college-topbar{padding:0 12px}
          .college-top-title{font-size:16px}
          .college-top-sub{display:none}
          .college-stats{gap:9px}
          .college-stat{min-height:122px;padding:13px}
          .college-stat-icon{width:37px;height:37px}
          .college-stat-change{font-size:9px;padding:5px 7px}
          .college-stat-value{font-size:26px;margin-top:12px}
          .college-stat-label{font-size:11px}
          .college-welcome h1{font-size:28px}
          .college-primary{font-size:13px}
        }
      `}</style>

      <div className={`college-overlay ${mobileOpen ? "show" : ""}`} onClick={() => setMobileOpen(false)} />

      <aside className={`college-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="college-brand">
          <div className="college-brand-mark"><Icon name="building" size={21} /></div>
          <div>
            <div className="college-brand-name">CollegeConnect</div>
            <div className="college-brand-sub">Student Leads • Better Admissions</div>
          </div>
        </div>

        <div className="college-nav-label">College Portal</div>

        <nav className="college-nav">
          {menu.map(([label, icon]) => (
            <button
              key={label}
              className={`college-nav-item ${active === label ? "active" : ""}`}
              onClick={() => navigate(label)}
            >
              <Icon name={icon} size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="college-sidebar-spacer" />

        <div className="college-side-user">
          <div className="college-avatar"><Icon name="building" size={19} /></div>
          <div>
            <strong>Your College</strong>
            <span>Verified College</span>
          </div>
        </div>

        <button className="college-nav-item college-logout" onClick={() => notify("Logout will be connected to authentication")}>
          <Icon name="logout" size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="college-main">
        <header className="college-topbar">
          <div className="college-top-left">
            <button className="college-mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Icon name="menu" size={20} />
            </button>
            <div>
              <div className="college-top-title">{active}</div>
              <div className="college-top-sub">Manage leads, courses and student enquiries</div>
            </div>
          </div>

          <div className="college-top-actions">
            <label className="college-search">
              <Icon name="search" size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students, courses..."
              />
            </label>

            <button
              className="college-icon-btn"
              aria-label="Notifications"
              onClick={() => setShowNotification((value) => !value)}
            >
              <Icon name="bell" size={18} />
              <span className="college-notification-dot" />
            </button>

            <div className="college-user">
              <div className="college-avatar"><Icon name="building" size={19} /></div>
              <div>
                <strong>Your College</strong>
                <span>Verified College</span>
              </div>
            </div>
          </div>

          {showNotification && (
            <div className="college-notification">
              <strong>Notifications</strong>
              <p>You have 8 new student leads waiting to be reviewed.</p>
              <p>One student profile was unlocked recently.</p>
            </div>
          )}
        </header>

        <section className="college-content">
          <div className="college-welcome">
            <div>
              <h1>{greeting}, Admissions Partner 👋</h1>
              <p>Here’s what is happening with your student leads today.</p>
            </div>
            <button className="college-primary" onClick={() => navigate("Courses")}>
              <Icon name="plus" size={15} />
              Add New Course
            </button>
          </div>

          <div className="college-stats">
            <article className="college-stat">
              <div className="college-stat-head">
                <div className="college-stat-icon"><Icon name="users" size={18} /></div>
                <span className="college-stat-change">+12.5%</span>
              </div>
              <div className="college-stat-value">125</div>
              <div className="college-stat-label">Students Interested</div>
            </article>

            <article className="college-stat">
              <div className="college-stat-head">
                <div className="college-stat-icon"><Icon name="users" size={18} /></div>
                <span className="college-stat-change">+8.2%</span>
              </div>
              <div className="college-stat-value">23</div>
              <div className="college-stat-label">New Student Leads</div>
            </article>

            <article className="college-stat">
              <div className="college-stat-head">
                <div className="college-stat-icon"><Icon name="profile" size={18} /></div>
                <span className="college-stat-change">+5.4%</span>
              </div>
              <div className="college-stat-value">18</div>
              <div className="college-stat-label">Profiles Purchased</div>
            </article>

            <article className="college-stat">
              <div className="college-stat-head">
                <div className="college-stat-icon"><Icon name="money" size={18} /></div>
                <span className="college-stat-change">This month</span>
              </div>
              <div className="college-stat-value">₹1,800</div>
              <div className="college-stat-label">Total Amount Spent</div>
            </article>
          </div>

          <div className="college-grid">
            <section className="college-card">
              <div className="college-card-header">
                <div>
                  <h2>Recent Student Leads</h2>
                  <p>Students who showed interest in your courses</p>
                </div>
                <button className="college-link" onClick={() => navigate("Student Leads")}>
                  View all <Icon name="arrow" size={12} />
                </button>
              </div>

              <div className="college-table-wrap">
                <table className="college-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Location</th>
                      <th>12th %</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <div className="college-student">
                            <div className="college-student-avatar">{lead.name.charAt(0)}</div>
                            <div>
                              <strong>{lead.name}</strong>
                              <span>{lead.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>{lead.course}</td>
                        <td>{lead.location}</td>
                        <td><strong>{lead.score}</strong></td>
                        <td><span className={`college-status ${lead.status.toLowerCase()}`}>{lead.status}</span></td>
                        <td>
                          <button className="college-unlock" onClick={() => notify(`Unlock request started for ${lead.id} • ₹100`)}>
                            Unlock ₹100
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="college-side-stack">
              <section className="college-card college-balance">
                <small>AVAILABLE LEAD BALANCE</small>
                <h3>₹2,500</h3>
                <div className="college-balance-row">
                  <span>25 student profile unlocks</span>
                  <button className="college-add-money" onClick={() => notify("Add Money will connect to the payment gateway")}>
                    Add Money
                  </button>
                </div>
              </section>

              <section className="college-card">
                <div className="college-card-header">
                  <div>
                    <h2>Quick Actions</h2>
                    <p>Frequently used tools</p>
                  </div>
                </div>

                <div className="college-quick-list">
                  <button className="college-quick" onClick={() => navigate("Student Leads")}>
                    <div className="college-quick-icon"><Icon name="users" size={17} /></div>
                    <div><strong>Browse Student Leads</strong><span>Find interested students</span></div>
                    <div className="college-quick-arrow"><Icon name="chevron" size={16} /></div>
                  </button>

                  <button className="college-quick" onClick={() => navigate("Courses")}>
                    <div className="college-quick-icon"><Icon name="book" size={17} /></div>
                    <div><strong>Manage Courses</strong><span>Update courses and seats</span></div>
                    <div className="college-quick-arrow"><Icon name="chevron" size={16} /></div>
                  </button>

                  <button className="college-quick" onClick={() => navigate("Transactions")}>
                    <div className="college-quick-icon"><Icon name="card" size={17} /></div>
                    <div><strong>View Transactions</strong><span>Check payment history</span></div>
                    <div className="college-quick-arrow"><Icon name="chevron" size={16} /></div>
                  </button>
                </div>
              </section>
            </div>
          </div>

          <div className="college-bottom-grid">
            <section className="college-card">
              <div className="college-card-header">
                <div>
                  <h2>Course Performance</h2>
                  <p>Interest received for your active courses</p>
                </div>
                <Icon name="chart" size={19} />
              </div>

              <div className="college-course-list">
                {courses.map((course) => (
                  <div className="college-course-row" key={course.name}>
                    <div className="college-course-top">
                      <strong>{course.name}</strong>
                      <span>{course.leads} leads • {course.seats} seats</span>
                    </div>
                    <div className="college-progress">
                      <i style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="college-card">
              <div className="college-card-header">
                <div>
                  <h2>Recent Activity</h2>
                  <p>Your latest dashboard activity</p>
                </div>
              </div>

              <div className="college-activity">
                {activities.map(([title, description, time]) => (
                  <div className="college-activity-item" key={title}>
                    <div className="college-activity-dot" />
                    <div>
                      <strong>{title}</strong>
                      <p>{description}</p>
                      <time>{time}</time>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="college-footer">
            CollegeConnect • Student Lead Management Platform
          </div>
        </section>
      </main>

      {toast && <div className="college-toast">{toast}</div>}
    </div>
  );
}