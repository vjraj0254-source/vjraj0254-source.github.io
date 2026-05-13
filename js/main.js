/* ============================================
   VIJAY RAJ VENUGOPAL — PORTFOLIO JAVASCRIPT
   ============================================ */

'use strict';

// ── LOADER ──────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    // Trigger hero reveal after load
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 1400);
});

// ── CUSTOM CURSOR ────────────────────────────
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (dot)  { dot.style.left  = mouseX + 'px'; dot.style.top  = mouseY + 'px'; }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .timeline-card, .connect-card, .cert-badge').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── SCROLL PROGRESS ──────────────────────────
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop   = document.documentElement.scrollTop;
  const docHeight   = document.documentElement.scrollHeight - window.innerHeight;
  const progress    = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + '%';
});

// ── NAVBAR: SCROLL + ACTIVE LINKS ────────────
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── HAMBURGER MENU ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// ── DARK / LIGHT TOGGLE ───────────────────────
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  const savedTheme = localStorage.getItem('vrv-theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('vrv-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  });
}

// ── BLUEPRINT CANVAS ─────────────────────────
(function drawBlueprint() {
  const canvas = document.getElementById('blueprint-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let offsetX = 0;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gSize = 40;
    const color = document.body.classList.contains('light-mode')
      ? 'rgba(0, 119, 182, 0.6)' : 'rgba(0, 212, 255, 0.6)';

    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;

    const oX = offsetX % gSize;

    for (let x = oX; x < canvas.width + gSize; x += gSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
      ctx.globalAlpha = 0.25; ctx.stroke();
    }
    for (let y = 0; y < canvas.height + gSize; y += gSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
      ctx.globalAlpha = 0.25; ctx.stroke();
    }

    // Major grid lines every 5 cells
    for (let x = oX; x < canvas.width + gSize * 5; x += gSize * 5) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
      ctx.globalAlpha = 0.5; ctx.stroke();
    }
    for (let y = 0; y < canvas.height + gSize * 5; y += gSize * 5) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
      ctx.globalAlpha = 0.5; ctx.stroke();
    }

    ctx.globalAlpha = 1;
    offsetX += 0.2;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── HERO PARTICLES ────────────────────────────
(function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = Math.random() * 40 + 10;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
})();

// ── TYPING EFFECT ─────────────────────────────
(function typeWriter() {
  const target = document.getElementById('typed-text');
  if (!target) return;
  const phrases = [
    'Mechanical Engineer',
    'Pipeline & Field Engineer',
    'Robotics & ROS2 Developer',
    'Six Sigma Green Belt',
    'Systems Thinker'
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      target.textContent = current.slice(0, --charIndex);
    } else {
      target.textContent = current.slice(0, ++charIndex);
    }

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 1600);
})();

// ── INTERSECTION OBSERVER — REVEAL ────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 6) * 80;
  revealObserver.observe(el);
});

// ── SKILL BAR ANIMATION ────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      entry.target.querySelectorAll('.gpa-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category, .edu-card').forEach(el => skillObserver.observe(el));

// ── COUNTER ANIMATION ─────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, 40);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) counterObserver.observe(aboutStats);

// ── TIMELINE EXPAND / COLLAPSE ────────────────
document.querySelectorAll('.timeline-card').forEach(card => {
  card.addEventListener('click', () => {
    const body   = card.querySelector('.timeline-body');
    const toggle = card.querySelector('.timeline-toggle');
    const isOpen = card.classList.toggle('open');
    body.classList.toggle('open', isOpen);
    if (toggle) toggle.textContent = isOpen ? '−' : '+';
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });
});

// ── PROJECT MODALS ────────────────────────────
const modalData = {
  robot: {
    title: 'Autonomous Indoor Robot System',
    badge: 'Robotics · Master\'s Capstone',
    body: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>Designed and built a fully autonomous mobile robot capable of real-time indoor mapping and self-directed navigation — my Master's capstone project at Old Dominion University.</p>
      </div>
      <div class="modal-section">
        <h4>What I Built</h4>
        <ul>
          <li>Integrated a LiDAR sensor and camera systems with a physical mobile robot platform</li>
          <li>Configured and tuned SLAM (Simultaneous Localization and Mapping) using Google Cartographer in ROS2</li>
          <li>Deployed Navigation2 (Nav2) for autonomous path execution, obstacle avoidance, and goal-directed movement</li>
          <li>Implemented path planning algorithms including A* and Dijkstra for optimal route computation</li>
          <li>Built real-time data processing pipelines to fuse sensor inputs and maintain a live occupancy grid map</li>
          <li>Visualized all system data and robot state in RViz2 during development and testing</li>
          <li>Tested and validated the system in real physical indoor environments</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>Outcome</h4>
        <p>Successfully demonstrated a robot that could autonomously map an unknown environment and navigate to designated waypoints — with real-time obstacle detection and dynamic rerouting.</p>
      </div>
      <div class="modal-tags"><span>ROS2</span><span>SLAM</span><span>Cartographer</span><span>Navigation2</span><span>LiDAR</span><span>Python</span><span>Linux</span><span>RViz2</span><span>Gazebo</span></div>
    `
  },
  solar: {
    title: 'Solar-Assisted Heat Pump Water Heater',
    badge: 'Thermal Engineering · Undergraduate Capstone',
    body: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>Designed a hybrid water heating system that combines two renewable and waste energy sources — waste heat recovery from air conditioning condensers and active solar thermal collection — to dramatically reduce energy consumption for domestic hot water.</p>
      </div>
      <div class="modal-section">
        <h4>Engineering Approach</h4>
        <ul>
          <li>Performed comprehensive thermal analysis of the combined system under varying load and climate conditions</li>
          <li>Sized solar thermal collectors based on local solar irradiance data and domestic hot water demand profiles</li>
          <li>Designed the heat recovery integration with existing HVAC condenser units to harvest otherwise-wasted heat</li>
          <li>Conducted energy balance calculations to validate system performance and COP (Coefficient of Performance)</li>
          <li>Compared system efficiency against conventional electric water heaters and standalone heat pump units</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>Outcome</h4>
        <p>Demonstrated through thermal modeling that the hybrid system achieves significant energy efficiency gains over conventional water heating — providing a viable design for sustainable building systems in tropical and subtropical climates.</p>
      </div>
      <div class="modal-tags"><span>Thermal Analysis</span><span>System Sizing</span><span>HVAC</span><span>Heat Transfer</span><span>Solar Energy</span><span>Energy Efficiency</span></div>
    `
  },
  qc: {
    title: 'Pipeline QC Documentation System',
    badge: 'Pipeline Engineering · Field Operations',
    body: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>During my time at STRIA Constructions, I identified a significant inefficiency: QC documentation for gas pipeline construction was fragmented, manual, and prone to delays during client handover. I developed a structured system to address this.</p>
      </div>
      <div class="modal-section">
        <h4>What I Built</h4>
        <ul>
          <li>Created standardized templates for joint inspection logs, weld records, and material traceability sheets</li>
          <li>Developed a milestone-based tracking framework aligned with ASME B31.3 compliance checkpoints</li>
          <li>Built Excel-based dashboards to track inspection progress, identify gaps, and generate handover-ready summaries</li>
          <li>Organized QC packages for client submissions, incorporating photographic records, test results, and certifications</li>
          <li>Reduced handover preparation time by centralizing all documentation into a single structured package format</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>Outcome</h4>
        <p>Streamlined QC documentation from a manual, per-item process to a systematic, auditable system — improving client confidence, reducing rework requests, and ensuring full ASME code traceability throughout construction.</p>
      </div>
      <div class="modal-tags"><span>ASME B31.3</span><span>QC Management</span><span>Excel</span><span>Field Engineering</span><span>Pipeline Construction</span></div>
    `
  },
  facilities: {
    title: 'Facility Work Order Optimization',
    badge: 'Operations Engineering · Six Sigma',
    body: `
      <div class="modal-section">
        <h4>Overview</h4>
        <p>Applied Six Sigma DMAIC methodology to analyze the facility work order management process at Old Dominion University, identifying root causes of delays and implementing process improvements.</p>
      </div>
      <div class="modal-section">
        <h4>DMAIC Approach</h4>
        <ul>
          <li><strong>Define:</strong> Mapped the end-to-end work order lifecycle from submission to closure; identified key pain points including triage delays and miscommunication between trades</li>
          <li><strong>Measure:</strong> Collected and analyzed work order cycle time data across 20+ weekly orders over multiple months</li>
          <li><strong>Analyze:</strong> Applied FMEA to identify highest-impact failure modes; used root cause analysis to pinpoint systemic issues</li>
          <li><strong>Improve:</strong> Proposed and implemented triage prioritization criteria, improved cross-team communication protocols, and documentation standards</li>
          <li><strong>Control:</strong> Established monitoring checkpoints to sustain improvements and track KPIs over time</li>
        </ul>
      </div>
      <div class="modal-section">
        <h4>Outcome</h4>
        <p>Demonstrated measurable reduction in average work order resolution time and improved cross-functional coordination across HVAC, plumbing, and structural maintenance teams.</p>
      </div>
      <div class="modal-tags"><span>Six Sigma</span><span>DMAIC</span><span>FMEA</span><span>Process Analysis</span><span>Facilities Management</span></div>
    `
  }
};

window.openModal = function(key) {
  const data    = modalData[key];
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!data || !overlay || !content) return;

  content.innerHTML = `
    <h2>${data.title}</h2>
    <span class="project-badge modal-badge">${data.badge}</span>
    ${data.body}
  `;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
};

document.getElementById('modal-overlay')?.addEventListener('click', function(e) {
  if (e.target === this) window.closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') window.closeModal();
});

// ── EMAIL COPY ────────────────────────────────
window.copyEmail = function(e) {
  e.preventDefault();
  const email   = 'vjraj0254@gmail.com';
  const tooltip = document.getElementById('copied-tooltip');

  navigator.clipboard.writeText(email).then(() => {
    if (tooltip) {
      tooltip.classList.add('show');
      setTimeout(() => tooltip.classList.remove('show'), 2500);
    }
  }).catch(() => {
    // Fallback: open mail client if clipboard fails
    window.location.href = 'mailto:' + email;
  });

  // Also open mail client after a brief delay
  setTimeout(() => { window.location.href = 'mailto:' + email; }, 300);
};

// ── PRINT RESUME ──────────────────────────────
window.printResume = function() {
  const iframe = document.getElementById('resume-iframe');
  if (iframe && iframe.contentWindow) {
    try {
      iframe.contentWindow.print();
    } catch(e) {
      window.open('assets/resume/Vijay_Raj_Venugopal_Resume.pdf', '_blank');
    }
  } else {
    window.open('assets/resume/Vijay_Raj_Venugopal_Resume.pdf', '_blank');
  }
};

// ── BACK TO TOP ───────────────────────────────
window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ── CONTACT FORM ──────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn     = contactForm.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');
    const original = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactForm.style.display = 'none';
        if (success) success.classList.add('show');
      } else {
        btn.textContent = '⚠ Try Again';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = original; }, 3000);
      }
    } catch(err) {
      btn.textContent = '⚠ Network Error';
      btn.disabled = false;
      setTimeout(() => { btn.textContent = original; }, 3000);
    }
  });
}

// ── 3D TILT ON PROJECT CARDS ─────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotX   = ((y - cy) / cy) * -6;
    const rotY   = ((x - cx) / cx) *  6;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── SMOOTH ANCHOR SCROLLING ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href   = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── PARALLAX HERO ─────────────────────────────
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  if (heroContent && window.scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  }
}, { passive: true });

// ── CONNECT CARD HOVER ACCENT ─────────────────
document.querySelectorAll('.connect-card').forEach(card => {
  const accent = card.dataset.accent;
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = accent;
    card.style.boxShadow   = `0 16px 40px rgba(0,0,0,0.4), 0 0 20px ${accent}22`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = '';
    card.style.boxShadow   = '';
  });
});

// ── MOBILE RESUME DETECT ──────────────────────
function checkMobile() {
  const isMobile = window.innerWidth < 768;
  const desktop  = document.getElementById('resume-desktop');
  const mobile   = document.getElementById('resume-mobile');
  if (desktop && mobile) {
    desktop.style.display = isMobile ? 'none' : 'block';
    mobile.style.display  = isMobile ? 'block' : 'none';
  }
}
checkMobile();
window.addEventListener('resize', checkMobile);
