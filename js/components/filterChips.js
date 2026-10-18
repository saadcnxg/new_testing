import { qs, qsa, el } from "../utils/dom.js";

export function renderChips(systems, onChange) {
  const container = qs("#filter-chips");
  const entries = [{ id: "all", name: "All systems" }, ...systems];

  entries.forEach((entry) => {
    const chip = el("button", {
      class: "chip" + (entry.id === "all" ? " active" : ""),
      type: "button",
      "data-id": entry.id,
      text: entry.name.replace(" System", ""),
      onclick: () => {
        qsa(".chip", container).forEach((c) => c.classList.toggle("active", c === chip));
        onChange(entry.id);
      },
    });
    container.append(chip);
  });
}