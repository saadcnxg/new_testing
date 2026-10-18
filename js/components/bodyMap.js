import { organs } from "../data/organs.js";
import { qsa } from "../utils/dom.js";

export function renderBodyMap(container, onSelect) {
  const spots = organs
    .map(
      (o) =>
        `<circle class="hotspot" data-id="${o.id}" cx="${o.x}" cy="${o.y}" r="7" tabindex="0" role="button" aria-label="${o.name}"><title>${o.name}</title></circle>`
    )
    .join("");

  container.innerHTML = `<svg viewBox="0 0 200 400" role="img" aria-label="Human body map">
    <g class="silhouette">
      <circle cx="100" cy="35" r="26"/>
      <rect x="88" y="58" width="24" height="14" rx="6"/>
      <rect x="62" y="70" width="76" height="170" rx="30"/>
      <rect x="38" y="76" width="22" height="130" rx="11"/>
      <rect x="140" y="76" width="22" height="130" rx="11"/>
      <rect x="66" y="236" width="30" height="150" rx="14"/>
      <rect x="104" y="236" width="30" height="150" rx="14"/>
    </g>
    ${spots}
  </svg>`;

  const hotspots = qsa(".hotspot", container);

  hotspots.forEach((spot) => {
    spot.addEventListener("click", () => onSelect(spot.dataset.id));
    spot.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect(spot.dataset.id);
      }
    });
  });

  return {
    setActive(id) {
      hotspots.forEach((spot) => spot.classList.toggle("active", spot.dataset.id === id));
    },
    setFilter(systemId) {
      hotspots.forEach((spot) => {
        const organ = organs.find((o) => o.id === spot.dataset.id);
        spot.classList.toggle("dim", systemId !== "all" && organ.system !== systemId);
      });
    },
  };
}