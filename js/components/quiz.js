import { qs, el, clear } from "../utils/dom.js";
import { questions } from "../data/quiz.js";
import { shuffle } from "../utils/random.js";
import { load, save } from "../utils/storage.js";

export function initQuiz() {
  const box = qs("#quiz-box");
  let deck = [];
  let index = 0;
  let score = 0;

  function start() {
    deck = shuffle(questions);
    index = 0;
    score = 0;
    showQuestion();
  }

  function showQuestion() {
    clear(box);
    const current = deck[index];
    const feedback = el("p", { class: "quiz-feedback" });
    const next = el("button", { class: "btn", type: "button", style: "display:none", text: index === deck.length - 1 ? "See result" : "Next question" });
    const buttons = [];

    current.options.forEach((text, i) => {
      const btn = el("button", {
        class: "option",
        type: "button",
        text,
        onclick: () => {
          buttons.forEach((b) => (b.disabled = true));
          const correct = i === current.answer;
          if (correct) score++;
          btn.classList.add(correct ? "correct" : "wrong");
          buttons[current.answer].classList.add("correct");
          feedback.textContent = (correct ? "Correct! " : "Not quite. ") + current.why;
          next.style.display = "inline-block";
        },
      });
      buttons.push(btn);
    });

    next.addEventListener("click", () => {
      index++;
      if (index < deck.length) showQuestion();
      else showResult();
    });

    box.append(
      el("div", { class: "quiz-meta" }, [
        el("span", { text: `Question ${index + 1} of ${deck.length}` }),
        el("span", { text: `Score: ${score}` }),
      ]),
      el("div", { class: "progress" }, [el("div", { style: `width:${(index / deck.length) * 100}%` })]),
      el("h3", { class: "quiz-question", text: current.q }),
      el("div", { class: "options" }, buttons),
      feedback,
      next
    );
  }

  function showResult() {
    const best = Math.max(load("best", 0), score);
    save("best", best);
    clear(box);
    box.append(
      el("div", { class: "quiz-result" }, [
        el("p", { text: "Your score" }),
        el("div", { class: "score", text: `${score} / ${deck.length}` }),
        el("p", { text: `Best score: ${best} / ${deck.length}` }),
        el("button", { class: "btn", type: "button", text: "Play again", onclick: start }),
      ])
    );
  }

  start();
}