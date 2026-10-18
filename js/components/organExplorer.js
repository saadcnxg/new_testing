import { qs } from "../utils/dom.js";
import { organs } from "../data/organs.js";
import { systems } from "../data/systems.js";
import { renderBodyMap } from "./bodyMap.js";
import { renderOrgan, renderPlaceholder } from "./organPanel.js";
import { renderChips } from "./filterChips.js";

export function initExplorer() {
  const panel = qs("#organ-panel");
  let map;

  function select(id) {
    const organ = organs.find((o) => o.id === id);
    if (!organ) return;
    map.setActive(id);
    renderOrgan(panel, organ);
  }

  map = renderBodyMap(qs("#body-map"), select);
  renderChips(systems, (systemId) => map.setFilter(systemId));
  renderPlaceholder(panel);

  return {
    focusOrgan(id) {
      select(id);
      qs("#explorer").scrollIntoView({ behavior: "smooth" });
    },
  };
}