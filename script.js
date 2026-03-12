const starCanvas = document.getElementById("starfield");
const ctx = starCanvas.getContext("2d");

function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const STAR_COUNT = 60;
const stars = [];

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    radius: Math.random() * 1.4 + 0.4,
    speed: Math.random() * 0.4 + 0.1,
    alpha: Math.random() * 0.6 + 0.4,
  });
}

function drawStarfield() {
  ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);

  for (const star of stars) {
    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      star.x,
      star.y,
      0,
      star.x,
      star.y,
      star.radius * 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(96,165,250,0)");
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();

    star.y += star.speed;
    if (star.y > starCanvas.height) {
      star.y = -2;
      star.x = Math.random() * starCanvas.width;
    }
  }

  requestAnimationFrame(drawStarfield);
}

drawStarfield();

const heroSection = document.querySelector(".hero");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const intensity = scrollY * 0.02;
  heroSection.style.transform = `translateY(${intensity * -0.5}px)`;
});

const tiltElements = document.querySelectorAll("[data-tilt]");
const maxTilt = 10;

function handleTilt(event) {
  const rect = this.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const percentX = (x / rect.width - 0.5) * 2;
  const percentY = (y / rect.height - 0.5) * 2;

  const tiltX = percentY * maxTilt * -1;
  const tiltY = percentX * maxTilt;

  this.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
}

function resetTilt() {
  this.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
}

tiltElements.forEach((el) => {
  el.addEventListener("mousemove", handleTilt);
  el.addEventListener("mouseleave", resetTilt);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll("[data-reveal]").forEach((section) => {
  observer.observe(section);
});

const nameEl = document.getElementById("nameInteractive");

if (nameEl) {
  nameEl.classList.add("hero__name--floating");
}

const rolesContainer = document.querySelector("[data-roles]");

if (rolesContainer) {
  const roles = rolesContainer.querySelectorAll(".hero__role");
  const rolesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          roles.forEach((role) => role.classList.add("hero__role--visible"));
        } else {
          roles.forEach((role) => role.classList.remove("hero__role--visible"));
        }
      });
    },
    { threshold: 0.4 }
  );

  rolesObserver.observe(rolesContainer);
}

// Hero typing animation
const heroTypingEl = document.getElementById("heroTyping");
if (heroTypingEl) {
  const rolesTexts =
    rolesContainer && rolesContainer.querySelectorAll(".hero__role").length
      ? Array.from(rolesContainer.querySelectorAll(".hero__role")).map((el) =>
          el.textContent.replace("AI-enthusiast", "AI Enthusiast").trim()
        )
      : [
          "Java Full Stack Developer",
          "Frontend Developer",
          "AI Enthusiast",
        ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 90;
  const deleteSpeed = 55;
  const pauseAfterType = 1100;
  const pauseAfterDelete = 500;

  function tick() {
    const current = rolesTexts[roleIndex];
    if (!isDeleting) {
      charIndex++;
      heroTypingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      heroTypingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % rolesTexts.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
}

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Visitor counter (per-browser using localStorage)
const visitorCounterEl = document.getElementById("visitorCounter");
if (visitorCounterEl && typeof window !== "undefined" && window.localStorage) {
  const KEY = "venkatesh-portfolio-visit-count";
  const current = parseInt(window.localStorage.getItem(KEY) || "0", 10);
  const next = Number.isFinite(current) ? current + 1 : 1;
  window.localStorage.setItem(KEY, String(next));

  const formatted = next.toLocaleString("en-IN");
  visitorCounterEl.textContent = `Visitors (this browser): ${formatted}`;
}

const contactBtn = document.querySelector(".contact__btn");
const contactModal = document.getElementById("contactModal");
const contactCloseBtn = contactModal
  ? contactModal.querySelector(".contact-modal__close")
  : null;
const contactBackdrop = contactModal
  ? contactModal.querySelector(".contact-modal__backdrop")
  : null;

function openContactModal() {
  if (!contactModal) return;
  contactModal.classList.add("contact-modal--visible");
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove("contact-modal--visible");
}

if (contactBtn) {
  contactBtn.addEventListener("click", openContactModal);
}

if (contactCloseBtn) {
  contactCloseBtn.addEventListener("click", closeContactModal);
}

if (contactBackdrop) {
  contactBackdrop.addEventListener("click", closeContactModal);
}

const socialDock = document.getElementById("socialDock");
const socialItems = document.querySelectorAll(".social-dock__item");

if (socialDock) {
  let targetX = 0;
  let currentX = 0;

  window.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const ratio = (e.clientX - centerX) / centerX;
    targetX = Math.max(-1, Math.min(1, ratio));
  });

  function animateDock() {
    currentX += (targetX - currentX) * 0.04;
    const offsetX = currentX * 10;
    const tiltDeg = currentX * 4;
    socialDock.style.setProperty("--dock-offset-x", `${offsetX}px`);
    socialDock.style.setProperty("--dock-tilt-x", `${tiltDeg}deg`);
    requestAnimationFrame(animateDock);
  }

  animateDock();
}

socialItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.remove("is-rippling");
    void item.offsetWidth;
    item.classList.add("is-rippling");
  });
});

const skills = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "DSA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "OOPS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
];

function buildSkillsGrid() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  skills.forEach((skill) => {
    const card = document.createElement("div");
    card.className = "skill-card glass tilt";
    card.setAttribute("data-tilt", "");

    const header = document.createElement("div");
    header.className = "skill-card__header";

    const iconWrap = document.createElement("div");
    iconWrap.className = "skill-card__icon";
    const img = document.createElement("img");
    img.src = skill.icon;
    img.alt = `${skill.name} logo`;
    img.loading = "lazy";
    iconWrap.appendChild(img);

    const name = document.createElement("div");
    name.className = "skill-card__name";
    name.textContent = skill.name;

    header.appendChild(iconWrap);
    header.appendChild(name);
    card.appendChild(header);
    grid.appendChild(card);
  });

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          grid.classList.add("skills-grid--visible");
        } else {
          grid.classList.remove("skills-grid--visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  skillsObserver.observe(grid);
}

buildSkillsGrid();

/* Certificate viewer modal */
const certificateModal = document.getElementById("certificateModal");
const certificateIframe = document.getElementById("certificateIframe");
const certificateImg = document.getElementById("certificateImg");
const certificateCloseBtn = certificateModal
  ? certificateModal.querySelector(".certificate-modal__close")
  : null;
const certificateBackdrop = certificateModal
  ? certificateModal.querySelector(".certificate-modal__backdrop")
  : null;

function isImagePath(path) {
  if (!path) return false;
  const p = path.toLowerCase();
  return p.endsWith(".jpg") || p.endsWith(".jpeg") || p.endsWith(".png") || p.endsWith(".webp");
}

function openCertificateModal(path) {
  if (!certificateModal) return;
  const encodedPath = path.split("/").map(segment => encodeURIComponent(segment)).join("/");

  if (isImagePath(path)) {
    if (certificateImg) {
      certificateImg.src = encodedPath;
      certificateImg.style.display = "block";
      certificateImg.classList.add("certificate-modal__img--visible");
      if (path.indexOf("Hackthon-Certificate") !== -1) {
        certificateImg.classList.add("certificate-modal__img--rotate-left");
      } else {
        certificateImg.classList.remove("certificate-modal__img--rotate-left");
      }
    }
    if (certificateIframe) {
      certificateIframe.src = "";
      certificateIframe.classList.add("certificate-modal__iframe--hidden");
    }
  } else {
    if (certificateIframe) {
      certificateIframe.src = encodedPath;
      certificateIframe.classList.remove("certificate-modal__iframe--hidden");
    }
    if (certificateImg) {
      certificateImg.src = "";
      certificateImg.style.display = "none";
      certificateImg.classList.remove("certificate-modal__img--visible");
      certificateImg.classList.remove("certificate-modal__img--rotate-left");
    }
  }

  certificateModal.classList.add("certificate-modal--visible");
  certificateModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCertificateModal() {
  if (!certificateModal) return;
  certificateModal.classList.remove("certificate-modal--visible");
  certificateModal.setAttribute("aria-hidden", "true");
  if (certificateIframe) {
    certificateIframe.src = "";
    certificateIframe.classList.add("certificate-modal__iframe--hidden");
  }
  if (certificateImg) {
    certificateImg.src = "";
    certificateImg.style.display = "none";
    certificateImg.classList.remove("certificate-modal__img--visible");
  }
  document.body.style.overflow = "";
}

if (certificateBackdrop) {
  certificateBackdrop.addEventListener("click", closeCertificateModal);
}
if (certificateCloseBtn) {
  certificateCloseBtn.addEventListener("click", closeCertificateModal);
}

document.querySelectorAll(".certificate-card__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".certificate-card");
    const path = card ? card.getAttribute("data-certificate") : null;
    if (path) openCertificateModal(path);
  });
});

document.querySelectorAll(".certificate-card").forEach((card) => {
  const path = card.getAttribute("data-certificate");
  if (!path) return;
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openCertificateModal(path);
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certificateModal && certificateModal.classList.contains("certificate-modal--visible")) {
    closeCertificateModal();
  }
});

/* Mini Robot Assistant */
const assistantBot = document.getElementById("assistantBot");
const assistantHead = assistantBot
  ? assistantBot.querySelector(".assistant-bot__head")
  : null;
const assistantBubble = document.getElementById("assistantBubble");
const assistantHint = document.getElementById("assistantHint");

if (assistantBot) {
  // Welcome bubble on load
  if (assistantBubble) {
    let bubbleShown = false;
    const showBubble = () => {
      if (bubbleShown) return;
      bubbleShown = true;
      assistantBubble.classList.add("assistant-bot__bubble--visible");
      setTimeout(() => {
        assistantBubble.classList.remove("assistant-bot__bubble--visible");
      }, 6500);
    };
    window.setTimeout(showBubble, 900);
  }

  // Cursor tracking: gently tilt the head toward cursor
  window.addEventListener("mousemove", (event) => {
    if (!assistantHead) return;
    const rect = assistantHead.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const maxTilt = 10;
    const tiltY = Math.max(-maxTilt, Math.min(maxTilt, (dx / rect.width) * maxTilt));
    const tiltX = Math.max(-maxTilt, Math.min(maxTilt, (-dy / rect.height) * maxTilt));
    assistantHead.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  // Hover interaction: trigger wave + typing accent
  const triggerWave = () => {
    assistantBot.classList.add("assistant-bot--wave", "assistant-bot--typing");
    window.setTimeout(() => {
      assistantBot.classList.remove("assistant-bot--wave");
    }, 900);
    window.setTimeout(() => {
      assistantBot.classList.remove("assistant-bot--typing");
    }, 2200);
  };

  assistantBot.addEventListener("mouseenter", () => {
    triggerWave();
  });

  // Simple click also triggers wave (for touch devices)
  assistantBot.addEventListener("click", () => {
    triggerWave();
  });

  // Portfolio guide hints
  const assistantHints = [
    { text: "Want to see my projects?", targetId: "projects" },
    { text: "Curious about my skills?", targetId: "skills" },
    { text: "Want to get in touch?", targetId: "contact" },
  ];

  let currentHintIndex = 0;
  let hintTimeoutId = null;

  const scheduleNextHint = (delayMs) => {
    if (!assistantHint) return;
    if (hintTimeoutId) window.clearTimeout(hintTimeoutId);
    hintTimeoutId = window.setTimeout(() => {
      const hint = assistantHints[currentHintIndex];
      assistantHint.textContent = hint.text;
      assistantHint.dataset.targetId = hint.targetId;
      assistantHint.classList.add("assistant-bot__hint--visible");
      currentHintIndex = (currentHintIndex + 1) % assistantHints.length;
    }, delayMs);
  };

  if (assistantHint) {
    assistantHint.addEventListener("click", () => {
      const targetId = assistantHint.dataset.targetId;
      if (targetId) {
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
      assistantHint.classList.remove("assistant-bot__hint--visible");
      scheduleNextHint(9000);
    });

    // First hint a bit after the welcome message
    scheduleNextHint(8000);
  }
}
