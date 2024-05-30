"use strict";

// Elements
const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const current0Element = document.querySelector("#current--0");
const current1Element = document.querySelector("#current--1");
const diceImageElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

// Game initial conditions

let totalScores, currentScore, activePlayer, isPlaying;

const initGame = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player0Element.classList.remove("player--active");
  player1Element.classList.remove("player--active");
  player0Element.classList.add("player--active");
  diceImageElement.classList.add("hidden");
};

initGame();

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

// Roll the dice
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    // Generate number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display number on the dice
    diceImageElement.classList.remove("hidden");
    diceImageElement.src = `./images/dice${diceNumber}.png`;

    // If number is 1, switch players
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    // Add current score to active player total score
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // If total score of active playe is >= 100, active player won, if no, switch player
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceImageElement.classList.add("hidden");
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener("click", initGame);
