import { qs } from "../utils/dom.js";
import { load, save } from "../utils/storage.js";

function apply(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  save("theme", theme);
}

export function initTheme() {
  const preferred = "dark";
  apply(load("theme", preferred));
  qs("#theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    apply(current === "dark" ? "light" : "dark");
  });
}