// SkillCraft Technology — Task 1: Responsive Landing Page
// Features: fixed navigation, scroll styling, hover states, active section links, mobile menu.

const header = document.querySelector(".site-header");
const navLinks = document.querySelector("#navLinks");
const menuToggle = document.querySelector("#menuToggle");
const navItems = [...document.querySelectorAll(".nav-link[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];
const year = document.querySelector("#year");

if (year) year.textContent = new Date().getFullYear();

function updateHeaderOnScroll() {
  const isScrolled = window.scrollY > 24;
  header?.classList.toggle("scrolled", isScrolled);
}
updateHeaderOnScroll();
window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

function closeMenu() {
  navLinks?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  document.body.classList.toggle("menu-open", isOpen);
});

navItems.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

// Update the highlighted navigation item to match the section in view.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = `#${entry.target.id}`;
      navItems.forEach((link) => {
        const active = link.getAttribute("href") === activeId;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}

// Close the mobile menu if the viewport becomes desktop-sized.
window.addEventListener("resize", () => {
  if (window.innerWidth > 680) closeMenu();
});

// Escape key makes the mobile menu easier to dismiss with a keyboard.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
