// year
document.getElementById("year").textContent = new Date().getFullYear();

// Snap toggle
const snapRoot = document.getElementById("snapRoot");
const snapToggle = document.getElementById("snapToggle");

function setSnap(on) {
  if (on) {
    snapRoot.classList.add("snap");
    snapToggle.textContent = "Snap: ON";
    localStorage.setItem("snap", "on");
  } else {
    snapRoot.classList.remove("snap");
    snapToggle.textContent = "Snap: OFF";
    localStorage.setItem("snap", "off");
  }
}

const storedSnap = localStorage.getItem("snap");
setSnap(storedSnap !== "off");

snapToggle.addEventListener("click", () => {
  setSnap(!snapRoot.classList.contains("snap"));
});

// Reveal on section enter (works great with snap)
const reveals = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.25 }
);
reveals.forEach((el) => io.observe(el));

// Copy email
const copyEmailBtn = document.getElementById("copyEmail");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    const email = "vjraj0254@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      copyEmailBtn.textContent = "Copied!";
      setTimeout(() => (copyEmailBtn.textContent = "Copy Email"), 1200);
    } catch {
      alert(email);
    }
  });
}

// Project filter + search
const chips = Array.from(document.querySelectorAll(".chip"));
const projects = Array.from(document.querySelectorAll(".project"));
const search = document.getElementById("projectSearch");
let activeFilter = "all";

function applyProjects() {
  const q = (search?.value || "").toLowerCase().trim();
  projects.forEach((p) => {
    const matchesFilter = activeFilter === "all" || p.dataset.category === activeFilter;
    const text = p.innerText.toLowerCase();
    const tags = (p.dataset.tags || "").toLowerCase();
    const matchesSearch = !q || text.includes(q) || tags.includes(q);
    p.style.display = matchesFilter && matchesSearch ? "" : "none";
  });
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    applyProjects();
  });
});

if (search) search.addEventListener("input", applyProjects);

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
  btn.addEventListener("click", () => openModal(btn.dataset.modalTitle, btn.dataset.modalBody || ""));
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});
