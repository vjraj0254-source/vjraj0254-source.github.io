// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Copy email
const copyBtn = document.getElementById("copyEmail");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = "vjraj0254@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy Email"), 1200);
    } catch {
      alert(email);
    }
  });
}

// Theme toggle (persist)
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

function updateThemeIcon() {
  if (!themeToggle) return;
  const t = document.documentElement.getAttribute("data-theme");
  themeToggle.textContent = t === "light" ? "🌞" : "🌙";
}
updateThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "" : "light";
    if (next) document.documentElement.setAttribute("data-theme", next);
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", next || "");
    updateThemeIcon();
  });
}

// Project filtering + search
const chips = Array.from(document.querySelectorAll(".chip"));
const projects = Array.from(document.querySelectorAll(".project"));
const search = document.getElementById("projectSearch");

let activeFilter = "all";

function matchesFilter(project) {
  if (activeFilter === "all") return true;
  return project.dataset.category === activeFilter;
}

function matchesSearch(project) {
  const q = (search?.value || "").toLowerCase().trim();
  if (!q) return true;
  const text = project.innerText.toLowerCase();
  const tags = (project.dataset.tags || "").toLowerCase();
  return text.includes(q) || tags.includes(q);
}

function applyProjectVisibility() {
  projects.forEach((p) => {
    const show = matchesFilter(p) && matchesSearch(p);
    p.style.display = show ? "" : "none";
  });
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    applyProjectVisibility();
  });
});

if (search) {
  search.addEventListener("input", applyProjectVisibility);
}

// Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

function openModal(title, body) {
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-modal-title]").forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.modalTitle, btn.dataset.modalBody || "");
  });
});

if (modalClose) modalClose.addEventListener("click", closeModal);

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target && e.target.dataset && e.target.dataset.close === "true") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

/* =========================
   Full-page “snap” + slide-in
   + active nav highlighting
   ========================= */
const sections = Array.from(document.querySelectorAll(".snap-section"));
const navLinks = Array.from(document.querySelectorAll(".nav a[data-nav]"));

function setActiveNav(id) {
  navLinks.forEach(a => a.classList.toggle("active", a.dataset.nav === id));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // reveal animation
      if (entry.isIntersecting) entry.target.classList.add("in-view");

      // nav highlight: only when most of the section is visible
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        setActiveNav(entry.target.id);
      }
    });
  },
  {
    threshold: [0.6],
    rootMargin: `-${Math.round(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--topbar-h")))}px 0px 0px 0px`
  }
);

sections.forEach((s) => observer.observe(s));
setActiveNav("home");
