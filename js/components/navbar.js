import { qs, qsa } from "../utils/dom.js";

export function initNavbar() {
  const toggle = qs("#nav-toggle");
  const links = qs("#nav-links");

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  qsa("a", links).forEach((link) =>
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        qsa("a", links).forEach((link) =>
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  qsa("main section[id]").forEach((section) => observer.observe(section));
}