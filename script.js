"use strict";
// Selecting elements 
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");

const diceEl = document.querySelector(".dice");

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let activePlayer, scores, currentScore, playing;
// Starting conditions
const init = function () {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
    if (playing) {
        // 1- Generating a rondom dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2- display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;
        // check for rolled 1
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else { // switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        // 1- add current score to the active player
        scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        // 2- check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);