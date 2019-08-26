'use strict';
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let roundScore, globalScore, activePlayer, gameActive, diceDOM;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(gameActive) {
        let roll = Math.round(Math.random() * 5 + 1);
    
        diceDOM.src = `dice-${roll}.png`;
        diceDOM.style.display = 'block';

        if(roll !== 1){
            roundScore += roll;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        } else {
            next();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gameActive){
        globalScore[activePlayer] += roundScore;
        document.querySelector(`#score-${activePlayer}`).textContent = globalScore[activePlayer];

        if(globalScore[activePlayer] >= 20) {
            roundScore = 0;
            diceDOM.style.display = 'none';
            document.getElementById(`current-0`).textContent = '0';
            document.getElementById(`current-1`).textContent = '0';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            gameActive = false;
        } else {
            next();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    roundScore = 0;
    globalScore = [0, 0];
    activePlayer = 0;
    gameActive = true;

    diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'none';

    document.getElementById(`score-0`).textContent = '0';
    document.getElementById(`current-0`).textContent = '0';

    document.getElementById(`score-1`).textContent = '0';
    document.getElementById(`current-1`).textContent = '0';

    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');

    document.getElementById(`name-0`).textContent = 'Player 1';
    document.getElementById(`name-1`).textContent = 'Player 2';
};

function next() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    diceDOM.style.display = 'none';
    document.getElementById(`current-0`).textContent = '0';
    document.getElementById(`current-1`).textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}