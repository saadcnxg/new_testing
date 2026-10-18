import { qs, clear } from "../utils/dom.js";

export function initModal() {
  const dialog = qs("#modal");
  qs("#modal-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

export function openModal(title, nodes) {
  const dialog = qs("#modal");
  qs("#modal-title").textContent = title;
  const body = qs("#modal-body");
  clear(body);
  [].concat(nodes).forEach((node) => body.append(node));
  dialog.showModal();
}