import { qs, el } from "../utils/dom.js";

export function renderStats(items) {
  const list = qs("#stats");
  items.forEach(([value, label]) =>
    list.append(el("li", {}, [el("strong", { text: String(value) }), el("span", { text: label })]))
  );
}