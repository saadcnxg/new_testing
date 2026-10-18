import { clear, el } from "../utils/dom.js";
import { systems } from "../data/systems.js";

export function renderPlaceholder(panel) {
  clear(panel);
  panel.append(
    el("h3", { text: "Select an organ" }),
    el("p", { class: "placeholder", text: "Click any point on the body map to see its role, system and a quick fact." })
  );
}

export function renderOrgan(panel, organ) {
  const system = systems.find((s) => s.id === organ.system);
  clear(panel);
  panel.append(
    el("span", { class: "tag", text: `${system.icon} ${system.name}` }),
    el("h3", { text: organ.name }),
    el("p", { text: organ.description }),
    el("div", { class: "fact-box" }, [el("strong", { text: "Did you know? " }), organ.fact])
  );
}