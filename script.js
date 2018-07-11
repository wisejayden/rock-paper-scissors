//Game Select Buttons
const pvp = document.getElementsByClassName("pvp")[0];
const pvc = document.getElementsByClassName("pvc")[0];
const cvc = document.getElementsByClassName("cvc")[0];
const gameSelection = document.getElementsByClassName("game-selection")[0];
const playerVsComputerGame = document.getElementsByClassName("player-vs-computer-game")[0];
const computerVsComputerGame = document.getElementsByClassName("computer-vs-computer-game")[0];
const goBack = document.getElementsByClassName("go-back");
const rockLeftSide = document.getElementsByClassName("rock-1");
const paperLeftSide = document.getElementsByClassName("paper-1");
const scissorsLeftSide = document.getElementsByClassName("scissors-1");
const rockRightSide = document.getElementsByClassName("rock-2");
const paperRightSide = document.getElementsByClassName("paper-2");
const scissorsRightSide = document.getElementsByClassName("scissors-2");
const option = document.getElementsByClassName("option");

const rockPVC = document.getElementById('rock-pvc');
const paperPVC = document.getElementById('paper-pvc');
const scissorsPVC = document.getElementById('scissors-pvc');
const loser = document.getElementById('loser');

const winnerBox = document.getElementById('winner-container');
const winnerBoxBack = document.getElementById('winner-container-back');
const userWin = document.getElementById('win');
const userDraw = document.getElementById('draw');
const userLoss = document.getElementById('lose');
const closeBox = document.getElementById('close');
const cpu1win = document.getElementById('cpu1win');
const cpu2win = document.getElementById('cpu2win');
const victoryMessage = document.getElementById('victory-message');

const leftScoreElement = document.getElementById('left-score');
const rightScoreElement = document.getElementById('right-score');
const pvcComputerChoice =  document.getElementsByClassName("pvc-computer-choice");
const cvc1ComputerChoice = document.getElementsByClassName('cvc1-choice');
const cvc2ComputerChoice = document.getElementsByClassName('cvc2-choice');
const playerOption = document.getElementsByClassName('player-option');


//Start screen
const startButton = document.getElementById('start');
const openScreen = document.getElementById('open-screen');
const introImage = document.getElementById('intro-image');
const scoreboard = document.getElementsByClassName('scoreboard')[0];
const leftPlayerScoreboard = document.getElementById('left-player');
const rightPlayerScoreboard = document.getElementById('right-player');


// Weapon selection
const leftLargeRockPVC = document.getElementById('rock-selection-pvc-left');
const leftLargePaperPVC = document.getElementById('paper-selection-pvc-left');
const leftLargeScissorsPVC = document.getElementById('scissors-selection-pvc-left');
const rightLargeRockPVC = document.getElementById('rock-selection-pvc-right');
const rightLargePaperPVC = document.getElementById('paper-selection-pvc-right');
const rightLargeScissorsPVC = document.getElementById('scissors-selection-pvc-right');
const leftLargeRockCVC = document.getElementById('rock-selection-cvc-left');
const leftLargePaperCVC = document.getElementById('paper-selection-cvc-left');
const leftLargeScissorsCVC = document.getElementById('scissors-selection-cvc-left');
const rightLargeRockCVC = document.getElementById('rock-selection-cvc-right');
const rightLargePaperCVC = document.getElementById('paper-selection-cvc-right');
const rightLargeScissorsCVC = document.getElementById('scissors-selection-cvc-right');
const leftSideTurnPVC = document.getElementById('left-side-turn-pvc');
const rightSideTurnPVC = document.getElementById('right-side-turn-pvc');
const callToAction = document.getElementById('call-to-action');

const quoteData = data;




const cpuBattleButton = document.getElementById('cpu-battle-button');
let leftScore = 0;
let rightScore = 0;

//Change speed of computers turn in milliseconds.
const computerSpeed = 300;



/*                          EVENT LISTENERS                                  */

startButton.addEventListener('click', function() {
    gameSelection.classList.remove('hide');
    openScreen.classList.add('hide');
})


//Open Player Vs Computer game mode
pvc.addEventListener("click", function() {
    gameSelection.classList.add("hide");
    introImage.classList.add('hide');
    scoreboard.classList.remove('hide');
    leftPlayerScoreboard.innerHTML = "Player";
    rightPlayerScoreboard.innerHTML = "Computer";
    playerVsComputerGame.classList.remove("hide");

})
//Open Computer Vs Computer game mode

cvc.addEventListener("click", function() {
    gameSelection.classList.add("hide");
    introImage.classList.add('hide');
    scoreboard.classList.remove('hide');
    leftPlayerScoreboard.innerHTML = "Computer 1";
    rightPlayerScoreboard.innerHTML = "Computer 2";
    computerVsComputerGame.classList.remove("hide");
})

for (var i = 0; i < goBack.length; i++) {
    goBack[i].addEventListener("click", function() {
        playerVsComputerGame.classList.add("hide");
        computerVsComputerGame.classList.add("hide");
        introImage.classList.remove('hide');
        scoreboard.classList.add('hide');
        gameSelection.classList.remove("hide");
        callToAction.classList.remove('hide');
        leftScore = 0;
        leftScoreElement.innerHTML = leftScore;
        rightScore = 0;
        rightScoreElement.innerHTML = rightScore;
    })
}

cpuBattleButton.addEventListener('click', function() {
    computerBattle();
    cpuBattleButton.classList.add('hide');
});

//When clicking on an option inside a PVC game, shows larger image of selection and then begins game.
for (var i = 0; i < playerOption.length; i++) {
    playerOption[i].addEventListener('click', function(e) {
        removeLargeSelection();
        leftSideTurnPVC.classList.add('hide');
        callToAction.classList.add('hide');
        e.target.classList.add("highlighted");
        if(e.target.name === 'rock') {
            leftLargeRockPVC.classList.remove('hide');
        }
        if(e.target.name === 'paper') {
            leftLargePaperPVC.classList.remove('hide');
        }
        if(e.target.name === 'scissors') {
            leftLargeScissorsPVC.classList.remove('hide');
        }
        game(e.target);
        rightSideTurnPVC.classList.remove('hide');

    })
}


        /*              GAME LOGIC                      */


//Depending on a win or a loss, and which hand won return a relevant quote to match.
function getQuote(winCondition, winningOption) {
    if (winCondition === false) {
        let randomDigit = Math.floor(Math.random() * quoteData.loss.length);
        return quoteData.loss[randomDigit];
    } else {
        let randomDigit = Math.floor(Math.random() * quoteData[winningOption].length);
        return quoteData[winningOption][randomDigit];
    }
}

//computersArsenal is equivalent to the  DOM elements (Rock, paper, scissors) of the selected computer.
function computersTurn (computersArsenal) {
    return new Promise(function(resolve, reject) {
        //Choose random number. Set starting conditions and then begin recursive function.
        const number = Math.floor(Math.random() * 15);
        let currentTarget = -1;
        let condition = 0;
        animateComputersChoice(computersArsenal);

        function animateComputersChoice (computersArsenal) {
           setTimeout(function () {

               //Function calls itself until condition meets the randomised number. Current target controls currently highlighted RPS object, while old target removes previous highlighting.
              if (condition < number) {
                  currentTarget++;
                  if(currentTarget === 3) {
                      currentTarget = 0;
                  }

                  let oldTarget;
                  if(currentTarget === 0) {
                      oldTarget = 2;
                  } else {
                      oldTarget = currentTarget - 1;
                  }

                  computersArsenal[currentTarget].classList.add('highlighted');
                  computersArsenal[oldTarget].classList.remove('highlighted');
                  condition++;
                 animateComputersChoice(computersArsenal);
             } else if (number === 0) {
                 //Edge case, if randomised number is 0. Set currentTarget to be highlighted as 0.
                 currentTarget = 0;
                 computersArsenal[currentTarget].classList.add('highlighted');
                 return resolve(computersArsenal[currentTarget].name);
             } else {
                 //Once condition has been fulfilled, resolve promise and then return value.
                 return resolve(computersArsenal[currentTarget].name);
             }
         }, computerSpeed)
        }
    })
}





//Creates a promise awaiting feedback from the computers turn.
function game(usersChoice) {
    const computersPromise = new Promise(function(resolve, reject) {
        const cpuTurn = computersTurn(pvcComputerChoice);
        if(cpuTurn) {
            resolve(cpuTurn);
        } else {
            reject(Error("It broke"));
        }
    })
    computersPromise
        .then(function(computerResponse) {
            rightSideTurnPVC.classList.add('hide');
            addRightLargeSelection(computerResponse);
            const winner = determineWinner(usersChoice.name, computerResponse);
            winnerBox.classList.remove("hide");
            winnerBoxBack.classList.remove("hide");
            if(usersChoice.name === winner) {
                const winnerQuote = getQuote(true, usersChoice.name);
                leftScore++;
                victoryMessage.innerHTML = winnerQuote;
                leftScoreElement.innerHTML = leftScore;
                userWin.classList.remove('hide');
            } else if (computerResponse === winner) {
                const loserQuote = getQuote(false);
                rightScore++;
                rightScoreElement.innerHTML = rightScore;
                userLoss.classList.remove('hide');
                victoryMessage.innerHTML = loserQuote;
            } else if (winner === "Draw") {
                userDraw.classList.remove('hide');
                victoryMessage.innerHTML = "Nobody wins";
            }
        })
        .catch(function(err) {
            console.log("err", err);
        })
}

//When starting a computer battle create a promise for each side, passing both details to the computersTurn function. Once both have been finished determine a winner.
function computerBattle() {
    const computersFirstPromise = new Promise(function(resolve, reject) {
        const cpuTurn = computersTurn(cvc1ComputerChoice);
        if(cpuTurn) {
            resolve(cpuTurn);
        } else {
            reject(Error("It broke"));
        }
    })
    const computersSecondPromise = new Promise(function(resolve, reject) {
        const cpuSecondTurn = computersTurn(cvc2ComputerChoice);
        if(cpuSecondTurn) {
            resolve(cpuSecondTurn);
        } else {
            reject(Error("It broke"));
        }
    })
    Promise.all([computersFirstPromise, computersSecondPromise])
        .then(function(responses) {
            addComputerBattleLargeSelections(responses);
            const winner = determineWinner(responses[0], responses[1]);
            let randomDigit = Math.floor(Math.random() * quoteData.computer.length);
            winnerBox.classList.remove("hide");
            winnerBoxBack.classList.remove("hide");
            if(responses[0] === winner) {
                leftScore++;
                leftScoreElement.innerHTML = leftScore;
                cpu1win.classList.remove('hide');
                victoryMessage.innerHTML = quoteData.computer[randomDigit];
            } else if (responses[1] === winner) {
                rightScore++;
                cpu2win.classList.remove('hide');
                victoryMessage.innerHTML =  quoteData.computer[randomDigit];
                rightScoreElement.innerHTML = rightScore;
            } else if (winner === "Draw") {
                userDraw.classList.remove('hide')
                victoryMessage.innerHTML = "Nobody Wins";
            }
        })
}


closeWinnerBox();
function closeWinnerBox() {
    closeBox.addEventListener("click", function() {
        resetGame();
    })
    winnerBoxBack.addEventListener("click", function() {
        resetGame();
    })
    document.addEventListener('keydown', function (e) {
        if (e.keyCode == 27) {
            resetGame();
        }
    })
}

//Stop propagation to allow user to click outside of modal in order to close it.
stopPropagation();
function stopPropagation(e) {
    winnerBox.addEventListener("click", function(e) {
        e.stopPropagation(e);
    })
}

function resetGame() {
    winnerBox.classList.add('hide');
    winnerBoxBack.classList.add('hide');
    userWin.classList.add('hide');
    userLoss.classList.add('hide');
    userDraw.classList.add('hide');
    cpu1win.classList.add('hide');
    cpu2win.classList.add('hide');
    leftSideTurnPVC.classList.remove('hide');
    removeLargeSelection();
    victoryMessage.innerHTML = '';
    cpuBattleButton.classList.remove('hide');
    for (var i = 0; i < option.length; i++) {
        option[i].classList.remove("highlighted");
    }
}

//For Computer Vs Computer battles
function addComputerBattleLargeSelections(arrayOfChoices) {
    if(arrayOfChoices[0] === 'rock') {
        leftLargeRockCVC.classList.remove('hide');
    }
    if(arrayOfChoices[0] === 'paper') {
        leftLargePaperCVC.classList.remove('hide');
    }
    if(arrayOfChoices[0] === 'scissors') {
        leftLargeScissorsCVC.classList.remove('hide');
    }
    if(arrayOfChoices[1] === 'rock') {
        rightLargeRockCVC.classList.remove('hide');
    }
    if(arrayOfChoices[1] === 'paper') {
        rightLargePaperCVC.classList.remove('hide');
    }
    if(arrayOfChoices[1] === 'scissors') {
        rightLargeScissorsCVC.classList.remove('hide');
    }
}

//For the computers pick in the Player Vs Computer game
function addRightLargeSelection(computersPick) {
    if(computersPick === 'rock') {
        rightLargeRockPVC.classList.remove('hide');
    }
    if(computersPick === 'paper') {
        rightLargePaperPVC.classList.remove('hide');
    }
    if(computersPick === 'scissors') {
        rightLargeScissorsPVC.classList.remove('hide');
    }
}


function removeLargeSelection () {
    leftLargeRockPVC.classList.add('hide');
    leftLargePaperPVC.classList.add('hide');
    leftLargeScissorsPVC.classList.add('hide');
    rightLargeRockPVC.classList.add('hide');
    rightLargePaperPVC.classList.add('hide');
    rightLargeScissorsPVC.classList.add('hide');
    leftLargeRockCVC.classList.add('hide');
    leftLargePaperCVC.classList.add('hide');
    leftLargeScissorsCVC.classList.add('hide');
    rightLargeRockCVC.classList.add('hide');
    rightLargePaperCVC.classList.add('hide');
    rightLargeScissorsCVC.classList.add('hide');
}



function determineWinner(player1, player2) {
    if(player1 == 'rock' && player2 == 'paper') {
        return player2;
    }
    if(player1 == 'paper' && player2 == 'scissors') {
        return player2;
    }
    if(player1 == 'scissors' && player2 == 'rock') {
        return player2;
    }
    if(player1 == 'paper' && player2 == 'rock') {
        return player1;
    }
    if(player1 == 'scissors' && player2 == 'paper') {
        return player1;
    }
    if(player1 == 'rock' && player2 == 'scissors') {
        return player1;
    }
    if(player1 == 'rock' && player2 == 'rock') {
        return "Draw";
    }
    if(player1 == 'paper' && player2 == 'paper') {
        return "Draw";
    }
    if(player1 == 'scissors' && player2 == 'scissors') {
        return "Draw";
    }
}
