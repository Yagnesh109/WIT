const header = document.querySelector("#siteHeader");
const navList = document.querySelector("#navList");
const menuToggle = document.querySelector("#menuToggle");
const megaMenu = document.querySelector("#megaMenu");
const heroTitle = document.querySelector("#heroTitle");
const announcementToggle = document.querySelector("#announcementToggle");
const announcementSidebar = document.querySelector("#announcementSidebar");
const announcementClose = document.querySelector("#announcementClose");
const announcementBackdrop = document.querySelector("#announcementBackdrop");

const departmentPages = {
  cse: "cse.html",
  it: "it.html",
  me: "me.html",
  ce: "ce.html",
  entc: "entc.html",
  ecs: "ecs.html",
  aiml: "aiml.html"
};

const pathPrefix = window.location.pathname.includes("/pages/") ? "" : "pages/";

const branchTitles = {
  cse: "Computer Science & Engineering",
  it: "Information Technology",
  me: "Mechanical Engineering",
  ce: "Civil Engineering",
  entc: "Electronics & Telecommunication",
  ecs: "Electronics & Computer Engineering",
  aiml: "Artificial Intelligence & Machine Learning"
};

const departmentSectionGroups = [
  ["Department Links", [
    ["HOD Desk", "#hod-desk"],
    ["About Department", "#about-department"],
    ["Vision & Mission", "#vision-mission"],
    ["CO · PO · PSO · PEO", "#co-po-pso"],
    ["Faculty", "#faculty"],
    ["Infrastructure", "#infrastructure"],
    ["Syllabus", "#syllabus"],
    ["Achievements", "#achievements"]
  ]]
];

const menus = {
  about: {
    label: "About",
    headline: "Institute identity, governance, values, reports, and public information.",
    groups: [
      ["Institute", ["Institute Information", "Management", "Vision & Mission", "Goals & Quality", "Core Values", "Governing Body", "Policies"]],
      ["Leadership & Reports", ["Secretary Desk", "Organization Chart", "Institute Development Plan", "Annual Reports", "Mandatory Disclosure", "RTI"]]
    ]
  },
  academics: {
    label: "Academics",
    headline: "Departments, programmes, academic resources, accreditation, and innovation.",
    groups: [
      ["Academic Links", ["Departments", "Academic Calendar", "Examination", "E-Learning", "Programmes Offered", "Accreditation", "Best Practices", "Innovation & IPR"]],
      ["Departments", [
        ["Computer Science & Engineering", "cse"],
        ["Information Technology", "it"],
        ["Mechanical Engineering", "me"],
        ["Civil Engineering", "ce"],
        ["Electronics & Telecommunication", "entc"],
        ["Artificial Intelligence & Machine Learning", "aiml"],
        ["Electronics & Computer Engineering", "ecs"]
      ]]
    ]
  },
  admissions: {
    label: "Admissions",
    headline: "Admission routes, eligibility, scholarships, hostel, fees, and course codes.",
    groups: [
      ["Admission Process", ["First Year Admission", "Direct Second Year Admission", "M.Tech Admission", "SY to Final Year Admission", "Eligibility & Admission Process", "Scholarships"]],
      ["Fees & Support", ["Hostel", "Fee Structure", "Fee Proposal", "Course Codes", "Fee Payment Guidelines"]]
    ]
  },
  research: {
    label: "Research",
    headline: "Research, innovation, quality assurance, rankings, approvals, and proceedings.",
    groups: [
      ["Research Ecosystem", ["Research Overview", "Innovation Entrepreneurship & IPR", "IQAC", "NAAC", "NBA"]],
      ["Approvals & Rankings", ["NIRF", "ARIIA", "AICTE Approvals", "Conference Proceedings"]]
    ]
  },
  campus: {
    label: "Campus Life",
    headline: "Events, clubs, placements, alumni, WITchar, e-store, and career opportunities.",
    groups: [
      ["Life at WIT", ["Events", "Training & Placements", "Alumni", "WITchar 2k26", "WIT E-Store", "Career"]],
      ["Clubs", ["Art Club", "Google Developers Group", "LOL Coding Club"]]
    ]
  },
  examination: {
    label: "Examination",
    headline: "Exam rules, re-examination rules, carry-on scheme, and exam sections.",
    groups: [
      ["Exam Cell", ["Exam Rule Book", "Re-Examination Rules", "Carry On Scheme", "Academic Year Exam Sections"]]
    ]
  },
  contact: {
    label: "Contact",
    headline: "Contact, grievance, tenders, important links, and scholarship schemes.",
    groups: [
      ["Connect", ["Contact Us", "Online Grievance", "Tenders", "Important Links", "AICTE Scholarship Schemes"]]
    ]
  }
};

const pageDepartment = document.body.dataset.department || "";
if (pageDepartment && branchTitles[pageDepartment]) {
  menus.department = {
    label: branchTitles[pageDepartment],
    headline: `${branchTitles[pageDepartment]} department quick links.`,
    groups: departmentSectionGroups
  };
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 28);
}

function createMenuLinks(items) {
  return items.map((item) => {
    let label;
    let href = "#";

    if (Array.isArray(item)) {
      label = item[0];
      const link = item[1] ?? "#";

      if (link.startsWith("#")) {
        href = link;
      } else if (departmentPages[link]) {
        href = `${pathPrefix}${departmentPages[link]}`;
      } else {
        href = link;
      }
    } else {
      label = item;
    }

    return `<a href="${href}">${label}</a>`;
  }).join("");
}

function renderMegaMenu(key) {
  const menu = menus[key];
  if (!menu) return;

  const groups = menu.groups.map(([title, items]) => `
    <div class="mega-group">
      <h4>${title}</h4>
      ${createMenuLinks(items)}
    </div>
  `).join("");

  megaMenu.innerHTML = `<div class="mega-inner"><div class="mega-groups">${groups}</div></div>`;
}

function openMegaMenu(key, trigger) {
  if (window.matchMedia("(max-width: 1160px)").matches) return;
  renderMegaMenu(key);
  document.querySelectorAll(".menu-trigger").forEach((button) => button.classList.remove("active"));
  trigger.classList.add("active");
  megaMenu.classList.add("open");
  megaMenu.setAttribute("aria-hidden", "false");
}

function closeMegaMenu() {
  document.querySelectorAll(".menu-trigger").forEach((button) => button.classList.remove("active"));
  megaMenu.classList.remove("open");
  megaMenu.setAttribute("aria-hidden", "true");
}

function buildMobilePanels() {
  document.querySelectorAll(".menu-trigger").forEach((trigger) => {
    const menu = menus[trigger.dataset.menu];
    const panel = document.createElement("div");
    panel.className = "mobile-panel";

    menu.groups.forEach(([, items]) => {
      panel.insertAdjacentHTML("beforeend", createMenuLinks(items));
    });

    trigger.closest("li").appendChild(panel);
  });
}

function toggleMobileNav() {
  const isOpen = navList.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
}

function setupAnnouncements() {
  if (!announcementToggle || !announcementSidebar || !announcementClose || !announcementBackdrop) return;

  function openAnnouncements() {
    announcementSidebar.classList.add("open");
    announcementSidebar.setAttribute("aria-hidden", "false");
    announcementToggle.setAttribute("aria-expanded", "true");
    announcementBackdrop.hidden = false;
    announcementClose.focus();
  }

  function closeAnnouncements() {
    announcementSidebar.classList.remove("open");
    announcementSidebar.setAttribute("aria-hidden", "true");
    announcementToggle.setAttribute("aria-expanded", "false");
    announcementBackdrop.hidden = true;
  }

  announcementToggle.addEventListener("click", () => {
    if (announcementSidebar.classList.contains("open")) {
      closeAnnouncements();
    } else {
      openAnnouncements();
    }
  });

  announcementClose.addEventListener("click", closeAnnouncements);
  announcementBackdrop.addEventListener("click", closeAnnouncements);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAnnouncements();
  });
}

function typeHeroTitle() {
  const kicker = "S. A. P. D. Jain Pathashala's";
  const title = "Walchand Institute of Technology, Solapur";
  const subtitle = "An Autonomous Institute";
  const caret = '<span class="caret" aria-hidden="true"></span>';
  
  const kickerEl = document.querySelector("#heroKicker");
  const titleEl = document.querySelector("#heroTitle");
  const subtitleEl = document.querySelector("#heroSubtitle");

  if (!kickerEl || !titleEl || !subtitleEl) return;
  
  // Display kicker
  kickerEl.textContent = kicker;
  
  // Type out main title
  let index = 0;
  function typeTitle() {
    titleEl.innerHTML = `${title.slice(0, index)}${caret}`;
    index += 1;

    if (index <= title.length) {
      window.setTimeout(typeTitle, 34);
    } else {
      window.setTimeout(() => {
        titleEl.textContent = title;
        typeSubtitle();
      }, 300);
    }
  }

  // Type out subtitle
  let subIndex = 0;
  function typeSubtitle() {
    subtitleEl.innerHTML = `${subtitle.slice(0, subIndex)}${caret}`;
    subIndex += 1;

    if (subIndex <= subtitle.length) {
      window.setTimeout(typeSubtitle, 34);
    } else {
      window.setTimeout(() => {
        subtitleEl.textContent = subtitle;
      }, 300);
    }
  }

  typeTitle();
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  items.forEach((item) => observer.observe(item));
}

function duplicateMarqueeItems(track) {
  if (!track || track.dataset.loopReady === "true") return;

  const items = [...track.children];
  items.forEach((item) => {
    track.appendChild(item.cloneNode(true));
  });

  track.dataset.loopReady = "true";
}

function initHomeMarquees() {
  const announcementTrack = document.querySelector(".announcement-track");
  if (announcementTrack) {
    duplicateMarqueeItems(announcementTrack);
  }

  document.querySelectorAll(".marquee-track").forEach(duplicateMarqueeItems);

  const newsTrack = document.querySelector(".news-ticker-track");
  if (newsTrack && newsTrack.dataset.loopReady !== "true") {
    const items = [...newsTrack.querySelectorAll(".news-item")];
    const uniqueItems = items.slice(0, 10);

    newsTrack.innerHTML = "";
    uniqueItems.forEach((item) => newsTrack.appendChild(item));
    uniqueItems.forEach((item) => newsTrack.appendChild(item.cloneNode(true)));
    newsTrack.dataset.loopReady = "true";
  }
}

document.querySelectorAll(".menu-trigger").forEach((trigger) => {
  trigger.addEventListener("mouseenter", () => openMegaMenu(trigger.dataset.menu, trigger));
  trigger.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 1160px)").matches) {
      const panel = trigger.closest("li").querySelector(".mobile-panel");
      panel.classList.toggle("open");
      trigger.classList.toggle("active", panel.classList.contains("open"));
      return;
    }

    if (megaMenu.classList.contains("open") && trigger.classList.contains("active")) {
      closeMegaMenu();
    } else {
      openMegaMenu(trigger.dataset.menu, trigger);
    }
  });
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (link) {
    if (event.target.closest(".mega-menu")) {
      closeMegaMenu();
    }
    if (event.target.closest(".mobile-panel") && navList.classList.contains("open")) {
      toggleMobileNav();
    }
  }

  if (!event.target.closest(".site-header")) {
    closeMegaMenu();
  }
});

const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    alert("Thank you for subscribing.");
  });
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileNav);
}
megaMenu.addEventListener("mouseleave", closeMegaMenu);
megaMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMegaMenu();
});
header.addEventListener("mouseleave", closeMegaMenu);
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (!window.matchMedia("(max-width: 1160px)").matches) {
    navList.classList.remove("open");
    menuToggle.classList.remove("open");
    document.body.classList.remove("menu-open");
  }
});

const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
setupAnnouncements();
buildMobilePanels();
updateHeader();
typeHeroTitle();
setupRevealAnimations();
initHomeMarquees();

function setupFirstVisitPopup() {
  const modal = document.querySelector("#firstVisitModal");
  const closeBtn = document.querySelector("#firstVisitClose");

  if (!modal || !closeBtn) return;

  window.addEventListener("load", () => {
    modal.hidden = false;
    document.body.classList.add("modal-open");
  });

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}

setupFirstVisitPopup();

// Slideshow Controller
function initSlideshow() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".slideshow-btn.prev");
  const nextBtn = document.querySelector(".slideshow-btn.next");
  
  let currentSlide = 0;
  let autoplayTimer = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (dots[i]) dots[i].classList.remove("active");

      const img = slide.querySelector("img");
      if (img) {
        img.style.animation = "none";
        void img.offsetWidth;
        img.style.animation = "";
      }
    });

    slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    resetAutoplay();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    resetAutoplay();
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 4000);
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideIndex = parseInt(e.target.dataset.slide);
      showSlide(slideIndex);
      resetAutoplay();
    });
  });

  showSlide(0);
  startAutoplay();
}

if (document.querySelector(".slideshow-container")) {
  initSlideshow();
}
