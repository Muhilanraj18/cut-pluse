// ==========================
// Scroll Reveal for animate-up
// ==========================
const animateElements = document.querySelectorAll('.animate-up');

function reveal() {
  animateElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ==========================
// Counter Animation on scroll
// ==========================
const counters = document.querySelectorAll('.stat h3');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const top = statsSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let current = 0;
      const updateCounter = () => {
        current += Math.ceil(target / 100);
        if (current < target) {
          counter.innerText = current;
          setTimeout(updateCounter, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
    countersStarted = true;
  }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ==========================
// Hero Section: Gradient + Particles
// ==========================
const hero = document.querySelector('.hero');
if (hero) {
  // Gradient animation
  let hue = 0;
  function animateHeroBackground() {
    hue += 0.5;
    hero.style.background = `linear-gradient(135deg, hsl(${hue}, 80%, 30%), hsl(${(hue + 60) % 360}, 80%, 30%))`;
    requestAnimationFrame(animateHeroBackground);
  }
  animateHeroBackground();

  // Particle effect
  const canvas = document.createElement('canvas');
  hero.appendChild(canvas);
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
  const ctx = canvas.getContext('2d');

  let particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) / 2,
      dy: (Math.random() - 0.5) / 2
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,47,91,0.6)';
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  window.addEventListener('resize', () => {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  });
}

// ==========================
// Projects Auto Horizontal Scroll
// ==========================
const projectContainer = document.querySelector('.project-horizontal');
let scrollAmount = 0;

function autoScrollProjects() {
  if (!projectContainer) return;
  scrollAmount += 2;
  if (scrollAmount >= projectContainer.scrollWidth - projectContainer.clientWidth) {
    scrollAmount = 0;
  }
  projectContainer.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

setInterval(autoScrollProjects, 20);

// ==========================
// Projects Slider (manual + auto)
// ==========================
const slider = document.querySelector('.project-list');
const slides = document.querySelectorAll('.project-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;
let slideInterval;

function showSlide(i) {
  if (!slider || slides.length === 0) return;
  if (i < 0) index = slides.length - 1;
  else if (i >= slides.length) index = 0;
  else index = i;

  slider.style.transform = `translateX(-${index * 100}%)`;
}

// Auto slide every 2s
function startSlide() {
  if (!slider) return;
  slideInterval = setInterval(() => {
    showSlide(index + 1);
  }, 2000);
}

// Stop auto slide on hover
if (slider) {
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', startSlide);
}

// Manual buttons
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    showSlide(index - 1);
  });
  nextBtn.addEventListener('click', () => {
    showSlide(index + 1);
  });
}

// Start auto slide
startSlide();

