'use strict';
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
const diceImg = document.querySelector('.dice');

score0.textContent = 0;
score1.textContent = 0;
diceImg.classList.add('hidden');

const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

//who is currently playing
let flag = 0;
let current = document.querySelector(`#current--${flag}`);
let score = document.querySelector(`#score--${flag}`);
let gameOver = false;

// function to change the current player
function changeFlag() {
  if (flag === 0) flag = 1;
  else flag = 0;
  current.textContent = 0;
  current = document.querySelector(`#current--${flag}`);
  score = document.querySelector(`#score--${flag}`);
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
}

//function to roll the dice and add it to the current score
function roll() {
  if (gameOver) return;
  const singleRoll = Math.trunc(Math.random() * 6 + 1);
  diceImg.classList.remove('hidden');
  diceImg.src = `dice-${singleRoll}.png`;

  if (singleRoll === 1) {
    changeFlag();
  } else {
    current.textContent = Number(current.textContent) + singleRoll;
  }
}

// on clicking hold, add the current value to the score of the current player
function add() {
  if (gameOver) return;
  score.textContent = Number(score.textContent) + Number(current.textContent);
  current.textContent = 0;
  if (score.textContent >= 100) {
    //current player wins
    document.querySelector(`.player--${flag}`).classList.add('player--winner');
    gameOver = true;
  } else {
    changeFlag();
  }
}

function reset() {
  gameOver = false;
  document.querySelector(`.player--${flag}`).classList.remove('player--winner');
  flag = 1;
  changeFlag();
  score0.textContent = 0;
  score1.textContent = 0;
  diceImg.classList.add('hidden');
}
//user clicks
rollDice.addEventListener('click', roll);
hold.addEventListener('click', add);
newGame.addEventListener('click', reset);
