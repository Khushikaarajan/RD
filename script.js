// ==========================================
// Animated Rose Petals
// ==========================================
function createPetal() {
  const petalsContainer = document.getElementById("petalsContainer");
  const petal = document.createElement("div");
  petal.classList.add("petal");

  // Random starting position
  const startX = Math.random() * window.innerWidth;
  petal.style.left = `${startX}px`;

  // Random size variation
  const size = Math.random() * 15 + 10; // 10-25px
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;

  // Random animation duration
  const duration = Math.random() * 10 + 10; // 10-20 seconds
  petal.style.animationDuration = `${duration}s`;

  // Random delay
  const delay = Math.random() * 5;
  petal.style.animationDelay = `${delay}s`;

  // Random horizontal drift
  const drift = (Math.random() - 0.5) * 100;
  petal.style.setProperty("--drift", `${drift}px`);

  petalsContainer.appendChild(petal);

  // Remove petal after animation completes
  setTimeout(
    () => {
      petal.remove();
    },
    (duration + delay) * 1000,
  );
}

// Create initial petals
function initPetals() {
  // Detect mobile devices
  const isMobile = window.innerWidth <= 768;
  const petalCount = isMobile ? 15 : 30; // Fewer petals on mobile

  for (let i = 0; i < petalCount; i++) {
    setTimeout(() => {
      createPetal();
    }, i * 200);
  }
}

// Continuously create new petals
function continuousPetals() {
  // Detect mobile devices
  const isMobile = window.innerWidth <= 768;
  const interval = isMobile ? 1500 : 800; // Less frequent on mobile

  setInterval(() => {
    createPetal();
  }, interval);
}

// ==========================================
// Scroll Reveal Animation
// ==========================================
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

// ==========================================
// Smooth Scroll for Indicator
// ==========================================
function setupSmoothScroll() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const letterSection = document.getElementById("letter");

  if (scrollIndicator && letterSection) {
    scrollIndicator.addEventListener("click", () => {
      letterSection.scrollIntoView({ behavior: "smooth" });
    });
  }
}

// ==========================================
// Particle Effects on Mouse Move
// ==========================================
let particleTimeout;
function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.style.position = "fixed";
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.width = "5px";
  particle.style.height = "5px";
  particle.style.borderRadius = "50%";
  particle.style.background = "radial-gradient(circle, #ff4081, #ff1744)";
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "9999";
  particle.style.opacity = "0.8";
  particle.style.transition = "all 1s ease-out";

  document.body.appendChild(particle);

  // Animate particle
  setTimeout(() => {
    particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${Math.random() * 100 + 50}px)`;
    particle.style.opacity = "0";
  }, 10);

  // Remove particle
  setTimeout(() => {
    particle.remove();
  }, 1000);
}

function handleMouseMove(e) {
  clearTimeout(particleTimeout);
  particleTimeout = setTimeout(() => {
    if (Math.random() > 0.9) {
      // Only create particles occasionally
      createParticle(e.clientX, e.clientY);
    }
  }, 50);
}

// ==========================================
// Letter Animation on Scroll
// ==========================================
function animateLetterOnScroll() {
  const letterContainer = document.querySelector(".letter-container");
  if (!letterContainer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          letterContainer.style.animation = "fadeIn 1.5s ease-out forwards";

          // Animate paragraphs one by one
          const paragraphs = letterContainer.querySelectorAll(".letter-body p");
          paragraphs.forEach((p, index) => {
            p.classList.add("reveal");
            setTimeout(() => {
              p.classList.add("active");
            }, index * 200);
          });
        }
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(letterContainer);
}

// ==========================================
// Add Sparkle Effect to Rose Icon
// ==========================================
function addSparkleEffect() {
  const roseIcon = document.querySelector(".rose-icon");
  if (!roseIcon) return;

  setInterval(() => {
    const sparkle = document.createElement("span");
    sparkle.textContent = "✨";
    sparkle.style.position = "absolute";
    sparkle.style.fontSize = "1.5rem";
    sparkle.style.animation = "sparkle 1s ease-out forwards";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;

    roseIcon.style.position = "relative";
    roseIcon.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
  }, 2000);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Petal Blast Effect on Click/Touch
// ==========================================
function createPetalBlast(x, y) {
  const isMobile = window.innerWidth <= 768;
  const petalCount = isMobile ? 15 : 25; // Number of petals in the blast

  for (let i = 0; i < petalCount; i++) {
    const blastPetal = document.createElement("div");
    blastPetal.classList.add("blast-petal");

    // Random size for each petal
    const size = Math.random() * 15 + 10; // 10-25px
    blastPetal.style.width = `${size}px`;
    blastPetal.style.height = `${size}px`;

    // Position at click/touch point
    blastPetal.style.left = `${x}px`;
    blastPetal.style.top = `${y}px`;

    // Random angle for explosion
    const angle = (Math.PI * 2 * i) / petalCount;
    const velocity = Math.random() * 150 + 100; // 100-250px
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    // Random rotation
    const rotation = Math.random() * 720 - 360; // -360 to 360 degrees

    // Set CSS custom properties for animation
    blastPetal.style.setProperty("--tx", `${tx}px`);
    blastPetal.style.setProperty("--ty", `${ty}px`);
    blastPetal.style.setProperty("--rotation", `${rotation}deg`);

    // Random animation duration
    const duration = Math.random() * 0.5 + 1; // 1-1.5 seconds
    blastPetal.style.animationDuration = `${duration}s`;

    document.body.appendChild(blastPetal);

    // Remove petal after animation
    setTimeout(() => {
      blastPetal.remove();
    }, duration * 1000);
  }
}

// Handle click events (laptop)
function handleClick(e) {
  createPetalBlast(e.clientX, e.clientY);
}

// Handle touch events (mobile)
function handleTouch(e) {
  const touch = e.touches[0] || e.changedTouches[0];
  if (touch) {
    createPetalBlast(touch.clientX, touch.clientY);
  }
}

// ==========================================
// Initialize Everything
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize petals
  initPetals();
  continuousPetals();

  // Setup scroll animations
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Check on load

  // Setup smooth scroll
  setupSmoothScroll();

  // Add mouse move particle effect
  document.addEventListener("mousemove", handleMouseMove);

  // Animate letter on scroll
  animateLetterOnScroll();

  // Add sparkle effect
  addSparkleEffect();

  // Add petal blast on click/touch
  document.addEventListener("click", handleClick);
  document.addEventListener("touchstart", handleTouch, { passive: true });

  console.log("🌹 Rose Day website loaded successfully! 🌹");
  console.log("💥 Click or touch anywhere to create a petal blast! 💥");
});

// ==========================================
// Window Resize Handler
// ==========================================
window.addEventListener("resize", () => {
  // Adjust petals on resize if needed
  const petals = document.querySelectorAll(".petal");
  petals.forEach((petal) => {
    const currentLeft = parseFloat(petal.style.left);
    if (currentLeft > window.innerWidth) {
      petal.style.left = `${window.innerWidth - 50}px`;
    }
  });
});
