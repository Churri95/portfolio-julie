/* =========================================
   1) Halo lumineux qui suit la souris
========================================= */
(function () {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;

  // On limite le rafraîchissement pour que ce soit fluide
  let rafId = null;
  let targetX = 0;
  let targetY = 0;

  // Petit "lissage" (inertie)
  let currentX = 0;
  let currentY = 0;
  const ease = 0.18;

  function animate() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    rafId = requestAnimationFrame(animate);
  }

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!rafId) rafId = requestAnimationFrame(animate);
  });

  // Support tactile : on cache le halo sur mobile (meilleure UX)
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) {
    glow.style.display = "none";
  }
})();


/* =========================================
   2) Burger menu (optionnel)
   -> ne fait rien si tu n’as pas ajouté
      le bouton + les classes
========================================= */
(function () {
  const burger = document.querySelector(".nav-burger");
  const navLinks = document.querySelector(".nav-links");
  if (!burger || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }

  burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  // Fermer si clic en dehors
  document.addEventListener("click", (e) => {
    const clickedInside =
      navLinks.contains(e.target) || burger.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  // Fermer quand on clique sur un lien
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // Fermer à l’ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();


/* =========================================
   3) Animation au scroll (optionnel, discret)
   -> Ajoute une classe "reveal" aux cards
========================================= */
(function () {
  const elements = document.querySelectorAll(
    ".skill-block, .project-card, .experience-card, .passion-card, .contact-card, .about-card"
  );
  if (!elements.length) return;

  // On prépare l’état initial via JS (sans modifier ton CSS de base)
  elements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
})();


/* =========================================
4) Carroussel photos défilement fluide
========================================= */

const track = document.querySelector(".gallery-track");
const slides = document.querySelectorAll(".gallery-track img");
const prevBtn = document.querySelector(".gallery-btn.prev");
const nextBtn = document.querySelector(".gallery-btn.next");

let index = 0;

function updateGallery(){
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateGallery();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateGallery();
});


