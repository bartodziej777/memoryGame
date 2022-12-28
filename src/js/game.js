import imgAngular from "../img/angular.png";
import imgCss from "../img/css.png";
import imgHtml from "../img/html.png";
import imgJava from "../img/java.png";
import imgJs from "../img/js.png";
import imgPython from "../img/python.png";
import imgReact from "../img/react.png";
import imgCpp from "../img/cpp.png";
import { render } from "sass";

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

const reverseCard = function (id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  card.querySelector(".card__front").classList.toggle("card__front--active");
  card.querySelector(".card__front").classList.toggle("card__front--unactive");
  card.querySelector(".card__back").classList.toggle("card__back--active");
  card.querySelector(".card__back").classList.toggle("card__back--unactive");
};

const init = function () {
  renderCards();
};

init();

document.querySelector(".game").addEventListener("click", function (e) {
  if (!e.target.closest(".card")) return;
  reverseCard(e.target.closest(".card").dataset.id);
});
