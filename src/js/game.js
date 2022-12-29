import imgAngular from "../img/angular.png";
import imgCss from "../img/css.png";
import imgHtml from "../img/html.png";
import imgJava from "../img/java.png";
import imgJs from "../img/js.png";
import imgPython from "../img/python.png";
import imgReact from "../img/react.png";
import imgCpp from "../img/cpp.png";

const gameCards = [
  { src: imgAngular, id: 1, type: 1 },
  { src: imgAngular, id: 2, type: 1 },
  { src: imgCpp, id: 3, type: 2 },
  { src: imgCpp, id: 4, type: 2 },
  { src: imgCss, id: 5, type: 3 },
  { src: imgCss, id: 6, type: 3 },
  { src: imgHtml, id: 7, type: 4 },
  { src: imgHtml, id: 8, type: 4 },
  { src: imgJava, id: 9, type: 5 },
  { src: imgJava, id: 10, type: 5 },
  { src: imgJs, id: 11, type: 6 },
  { src: imgJs, id: 12, type: 6 },
  { src: imgPython, id: 13, type: 7 },
  { src: imgPython, id: 14, type: 7 },
  { src: imgReact, id: 15, type: 8 },
  { src: imgReact, id: 16, type: 8 },
];

const actions = [];
const guessed = [];
let reversed = 0;
let best;

const renderCards = function () {
  gameCards.sort(() => Math.random() - 0.5);

  let markup = ``;
  gameCards.forEach((card) => {
    markup += `
        <div class="card" data-id="${card.id}" data-type="${card.type}">
          <div class="card__front card__front--unactive">
            <img src="${card.src}" alt="image" />
          </div>
          <div class="card__back card__back--active">
            <i>?</i>
          </div>
        </div>
        `;

    document.querySelector(".game").innerHTML = markup;
  });
};

const renderModal = function () {
  let markup = `
  <div class="modal">
    <h2 class="modal__heading">Game over!</h2>
    <p class="modal__text">Your score: <span>${actions.length}</span></p>
    <p class="modal__text">Best score: <span>${best}</span></p>
    <button class="modal__btn">Next game</button>
  </div>`;
  document.querySelector(".app").insertAdjacentHTML("beforeend", markup);
  document.querySelector(".game").classList.add("blur");
  document.querySelector(".modal__btn").addEventListener("click", () => {
    location.reload();
  });
};

const gameOver = function () {
  if (!localStorage.getItem("bestScore")) best = actions.length;
  else
    best =
      +localStorage.getItem("bestScore") > actions.length
        ? actions.length
        : +localStorage.getItem("bestScore");
  localStorage.setItem("bestScore", best);
  setTimeout(renderModal, 500);
};

const checkCardType = function (id) {
  return document.querySelector(`[data-id="${id}"]`).dataset.type;
};

const markAsGuessed = function () {
  guessed.push(actions[actions.length - 1].id);
  guessed.push(actions[actions.length - 2].id);
  const card1 = document.querySelector(
    `[data-id="${actions[actions.length - 1].id}"]`
  );
  const card2 = document.querySelector(
    `[data-id="${actions[actions.length - 2].id}"]`
  );
  setTimeout(() => {
    card1.style.opacity = 0;
    card2.style.opacity = 0;
  }, 500);
};

const reverseCard = function (id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  card.querySelector(".card__front").classList.toggle("card__front--active");
  card.querySelector(".card__front").classList.toggle("card__front--unactive");
  card.querySelector(".card__back").classList.toggle("card__back--active");
  card.querySelector(".card__back").classList.toggle("card__back--unactive");
};

const checkCard = function (id) {
  if (id === actions[actions.length - 1]?.id) return;
  const type = checkCardType(id);
  reversed++;
  if (reversed > 2) {
    reversed = 0;
    reverseCard(actions[actions.length - 1]?.id);
    reverseCard(actions[actions.length - 2]?.id);
    checkCard(id);
    return;
  }
  actions.push({ id, type });
  if (reversed === 2) {
    if (type === actions[actions.length - 2].type) markAsGuessed();
    reversed = 0;
    const c1 = actions[actions.length - 1]?.id;
    const c2 = actions[actions.length - 2]?.id;
    setTimeout(() => {
      reverseCard(c1);
      reverseCard(c2);
    }, 500);
    if (guessed.length >= 16) {
      gameOver();
    }
  }
  reverseCard(id);
};

const init = function () {
  renderCards();
};

init();

document.querySelector(".game").addEventListener("click", function (e) {
  if (!e.target.closest(".card")) return;
  const id = e.target.closest(".card").dataset.id;
  if (guessed.includes(id) || actions[actions - 1]?.id === id) return;
  checkCard(id);
});
