import { qs } from "../utils/dom.js";
import { facts } from "../data/facts.js";
import { pick } from "../utils/random.js";

export function initFacts() {
  const text = qs("#fact-text");
  let current = null;

  function show() {
    current = pick(facts, current);
    text.textContent = current;
  }

  qs("#fact-btn").addEventListener("click", show);
  show();
}