import { qs, el } from "../utils/dom.js";
import { openModal } from "./modal.js";
import { organs } from "../data/organs.js";

export function showSystem(system) {
  const related = organs.filter((organ) => organ.system === system.id);
  const nodes = [
    el("p", { text: system.summary }),
    el("h4", { text: "Main functions" }),
    el("ul", {}, system.functions.map((fn) => el("li", { text: fn }))),
    el("h4", { text: "Organs on the map" }),
    el(
      "div",
      {},
      related.length
        ? related.map((organ) => el("span", { class: "tag", text: organ.name }))
        : [el("p", { text: "No organs mapped for this system." })]
    ),
  ];
  openModal(`${system.icon} ${system.name}`, nodes);
}

export function renderSystems(systems) {
  const grid = qs("#system-grid");
  systems.forEach((system) => {
    const card = el(
      "button",
      { class: "card", type: "button", onclick: () => showSystem(system) },
      [
        el("span", { class: "icon", text: system.icon }),
        el("h3", { text: system.name }),
        el("p", { text: system.summary }),
      ]
    );
    grid.append(card);
  });
}