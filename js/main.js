import { organs } from "./data/organs.js";
import { systems } from "./data/systems.js";
import { questions } from "./data/quiz.js";
import { initTheme } from "./components/theme.js";
import { initNavbar } from "./components/navbar.js";
import { initModal } from "./components/modal.js";
import { renderStats } from "./components/stats.js";
import { renderSystems, showSystem } from "./components/systemCards.js";
import { initExplorer } from "./components/organExplorer.js";
import { initSearch } from "./components/search.js";
import { initQuiz } from "./components/quiz.js";
import { initFacts } from "./components/facts.js";

initTheme();
initNavbar();
initModal();

renderStats([
  [systems.length, "Body systems"],
  [organs.length, "Mapped organs"],
  [questions.length, "Quiz questions"],
  [206, "Adult bones"],
]);

renderSystems(systems);

const explorer = initExplorer();

initSearch({
  onOrgan: (id) => explorer.focusOrgan(id),
  onSystem: (system) => showSystem(system),
});

initQuiz();
initFacts();