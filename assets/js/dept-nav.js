const DEPT_TITLES = {
  cse: "Computer Science & Engineering",
  ce: "Civil Engineering",
  entc: "Electronics & Telecommunication",
  ecs: "Electronics & Computer Engineering",
  me: "Mechanical Engineering",
  it: "Information Technology",
  aiml: "Artificial Intelligence & Machine Learning"
};

const DEPT_NAV_LINKS = [
  { label: "HOD Desk", emoji: "🧑‍💼", section: "hod-desk" },
  { label: "About Department", emoji: "💻", section: "about-department" },
  { label: "Vision & Mission", emoji: "👁️", section: "vision-mission" },
  { label: "CO · PO · PSO", emoji: "📋", section: "co-po-pso" },
  { label: "Faculty", emoji: "👨‍🏫", section: "faculty" },
  { label: "Infrastructure", emoji: "🏢", section: "infrastructure" },
  { label: "Syllabus", emoji: "📖", section: "syllabus" },
  { label: "Achievements", emoji: "🏆", section: "achievements" }
];

function ensureFontAwesome() {
  if (document.querySelector('link[href*="font-awesome"]')) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
  document.head.appendChild(link);
}

function buildSidebarMarkup(title) {
  const links = DEPT_NAV_LINKS.map((item) => `
    <a href="#${item.section}" class="dept-sidebar__link sidebar-link" data-section="${item.section}">
      <span class="dept-sidebar__emoji" aria-hidden="true">${item.emoji}</span>
      <span class="dept-sidebar__label">${item.label}</span>
    </a>
  `).join("");

  return `
    <aside class="dept-sidebar" id="deptSidebar" aria-label="${title} navigation">
      <button class="dept-sidebar__collapse" id="collapseSidebar" type="button" aria-label="Collapse sidebar" aria-expanded="true">
        <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
      </button>
      <nav class="dept-sidebar__nav">
        ${links}
      </nav>
    </aside>
    <div class="dept-sidebar-overlay" id="sidebarOverlay" aria-hidden="true"></div>
    <button class="dept-sidebar-mobile-btn" id="deptNavToggle" type="button" aria-label="Open department menu" aria-expanded="false" aria-controls="deptSidebar">
      <i class="fa-solid fa-bars" aria-hidden="true"></i>
      <span>Menu</span>
    </button>
  `;
}

function initDepartmentSidebar() {
  const dept = document.body.dataset.department;
  if (!dept || !DEPT_TITLES[dept]) return;

  ensureFontAwesome();

  const layout = document.querySelector(".dept-layout");
  if (!layout || document.getElementById("deptSidebar")) return;

  const mount = document.createElement("div");
  mount.innerHTML = buildSidebarMarkup(DEPT_TITLES[dept]);

  const sidebar = mount.querySelector("#deptSidebar");
  const overlay = mount.querySelector("#sidebarOverlay");
  const mobileBtn = mount.querySelector("#deptNavToggle");

  layout.parentNode.insertBefore(sidebar, layout);
  layout.parentNode.insertBefore(overlay, layout);
  document.body.appendChild(mobileBtn);

  const collapseBtn = sidebar.querySelector("#collapseSidebar");
  const sidebarLinks = sidebar.querySelectorAll(".dept-sidebar__link");
  const siteHeader = document.getElementById("siteHeader");

  const isMobile = () => window.matchMedia("(max-width: 1024px)").matches;

  function updateHeader() {
    if (siteHeader) {
      siteHeader.classList.toggle("scrolled", window.scrollY > 28);
    }
  }

  function openMobileSidebar() {
    sidebar.classList.add("is-open");
    overlay.classList.add("active");
    document.body.classList.add("dept-sidebar-open");
    mobileBtn.setAttribute("aria-expanded", "true");
  }

  function closeMobileSidebar() {
    sidebar.classList.remove("is-open");
    overlay.classList.remove("active");
    document.body.classList.remove("dept-sidebar-open");
    mobileBtn.setAttribute("aria-expanded", "false");
  }

  function toggleCollapse() {
    if (isMobile()) {
      closeMobileSidebar();
      return;
    }
    const collapsed = document.body.classList.toggle("dept-sidebar-collapsed");
    collapseBtn.setAttribute("aria-expanded", String(!collapsed));
    collapseBtn.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
  }

  collapseBtn.addEventListener("click", toggleCollapse);
  mobileBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("is-open")) closeMobileSidebar();
    else openMobileSidebar();
  });
  overlay.addEventListener("click", closeMobileSidebar);

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobile()) closeMobileSidebar();
    });
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) closeMobileSidebar();
  });

  window.addEventListener("scroll", () => {
    updateHeader();

    let current = "";
    document.querySelectorAll(".content-section").forEach((section) => {
      if (window.scrollY >= section.offsetTop - 140) {
        current = section.getAttribute("id");
      }
    });

    sidebarLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === current);
    });
  }, { passive: true });

  updateHeader();
}

const outcomeTabs = document.querySelectorAll(".outcome-tab");
const outcomePanels = document.querySelectorAll(".outcome-panel");

outcomeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetPanel = document.getElementById(tab.dataset.target);
    if (!targetPanel) return;

    outcomeTabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    outcomePanels.forEach((panel) => panel.classList.remove("active"));

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    targetPanel.classList.add("active");
  });
});

initDepartmentSidebar();
