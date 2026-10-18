import { qs, el, clear } from "../utils/dom.js";
import { organs } from "../data/organs.js";
import { systems } from "../data/systems.js";

function matches(text, term) {
  return text.toLowerCase().includes(term);
}

export function initSearch({ onOrgan, onSystem }) {
  const input = qs("#search-input");
  const list = qs("#search-results");

  function render(term) {
    clear(list);
    if (!term) return;

    const organHits = organs.filter((o) => matches(`${o.name} ${o.description} ${o.system}`, term));
    const systemHits = systems.filter((s) => matches(`${s.name} ${s.summary}`, term));

    if (!organHits.length && !systemHits.length) {
      list.append(el("li", { class: "empty", text: "No matches found." }));
      return;
    }

    organHits.forEach((organ) =>
      list.append(
        el("li", {}, [
          el("button", { type: "button", onclick: () => onOrgan(organ.id) }, [
            el("strong", { text: organ.name }),
            el("small", { text: "Organ" }),
          ]),
        ])
      )
    );

    systemHits.forEach((system) =>
      list.append(
        el("li", {}, [
          el("button", { type: "button", onclick: () => onSystem(system) }, [
            el("strong", { text: `${system.icon} ${system.name}` }),
            el("small", { text: "System" }),
          ]),
        ])
      )
    );
  }

  input.addEventListener("input", () => render(input.value.trim().toLowerCase()));
}