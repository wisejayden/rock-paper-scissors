//Game Select Buttons
const pvp = document.getElementsByClassName("pvp")[0];
const pvc = document.getElementsByClassName("pvc")[0];
const cvc = document.getElementsByClassName("cvc")[0];
const gameSelection = document.getElementsByClassName("game-selection")[0];
// const playerVsPlayerGame = document.getElementsByClassName("player-vs-player-game")[0];
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
const leftScoreElement = document.getElementById('left-score');
const rightScoreElement = document.getElementById('right-score');
const pvcComputerChoice =  document.getElementsByClassName("pvc-computer-choice");
let leftScore = 0;
let rightScore = 0;




// pvp.addEventListener("click", function() {
//     console.log("pvp");
//     gameSelection.classList.add("hide");
//     playerVsPlayerGame.classList.remove("hide");
//     gameStart("pvp");
//
//
// })

pvc.addEventListener("click", function() {
    gameSelection.classList.add("hide");
    playerVsComputerGame.classList.remove("hide");
    gameStart("pvc");

})
cvc.addEventListener("click", function() {
    gameSelection.classList.add("hide");
    computerVsComputerGame.classList.remove("hide");
    gameStart("cvc");
})

for (var i = 0; i < goBack.length; i++) {
    goBack[i].addEventListener("click", function() {
        // playerVsPlayerGame.classList.add("hide");
        playerVsComputerGame.classList.add("hide");
        computerVsComputerGame.classList.add("hide");
        gameSelection.classList.remove("hide");
        leftScore = 0;
        leftScoreElement.innerHTML = leftScore;
        rightScore = 0;
        rightScoreElement.innerHTML = rightScore;
    })
}

for (var i = 0; i < option.length; i++) {
    option[i].addEventListener('click', function(e) {
        e.target.classList.add("highlighted");
        game(e.target);

    })
}

function computersChoice() {
    const options = ["rock", "paper", "scissors"];
    const choice = Math.floor(Math.random() * 3);
    return options[choice];
}

function computersTurn () {
    return new Promise(function(resolve, reject) {
        console.log("Computers Turn");
        const number = Math.floor(Math.random() * 10);
        let currentTarget = -1;
        let condition = 0;
        animateComputersChoice();

        function animateComputersChoice () {
           setTimeout(function () {
              // currentTarget++;
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
                  pvcComputerChoice[currentTarget].classList.add('highlighted');
                  pvcComputerChoice[oldTarget].classList.remove('highlighted');

                  condition++;
                 animateComputersChoice();
             } else if (number === 0) {
                 currentTarget = 0;
                 pvcComputerChoice[currentTarget].classList.add('highlighted');
                 console.log("Log the printed out option else if", pvcComputerChoice[currentTarget].name);
                 return resolve(pvcComputerChoice[currentTarget].name);
             } else {
                 console.log("Log the printed out option else", pvcComputerChoice[currentTarget].name);
                 return resolve(pvcComputerChoice[currentTarget].name);
             }

         }, 500)
        }
    })
}





// function animateComputersChoice() {
//     const number = Math.floor(Math.random() * 20);
//     let currentTarget = 0;
//     let condition = 0;
//
//     while(condition < number) {
//         if(currentTarget === 3) {
//             currentTarget = 0;
//         }
//         let oldTarget;
//         if(currentTarget === 0) {
//             oldTarget = 2;
//         } else {
//             oldTarget = currentTarget - 1;
//         }
//         console.log("oldTarget", oldTarget);
//
//         console.log("currentTarget", currentTarget);
//
//         pvcComputerChoice[currentTarget].classList.add('highlighted');
//         pvcComputerChoice[oldTarget].classList.remove('highlighted');
//         currentTarget++;
//         condition++;
//         myLoop();
//     }
// }


function game(usersChoice) {
    // const computersChoiceValue = computersChoice();
    // animateComputersChoice();
    const computersPromise = new Promise(function(resolve, reject) {
        const cpuTurn = computersTurn();
        if(cpuTurn) {
            resolve(cpuTurn);
        } else {
            reject(Error("It broke"));
        }

    })
    console.log(computersPromise);
    computersPromise
        .then(function(response) {
            console.log("heelllooo");
            console.log("response", response);
            const winner = determineWinner(usersChoice.name, response);
            console.log("Users choice - ", usersChoice.name );
            console.log("Computers choice - ", response, );
            winnerBox.classList.remove("hide");
            winnerBoxBack.classList.remove("hide");
            if(usersChoice.name === winner) {
                leftScore++;
                leftScoreElement.innerHTML = leftScore;
                userWin.classList.remove('hide');
                console.log("Player 1 wins");
            } else if (response === winner) {
                rightScore++;
                rightScoreElement.innerHTML = rightScore;
                userLoss.classList.remove('hide');

                console.log("Player 2 wins");
            } else if (winner === "Draw") {
                userDraw.classList.remove('hide');

                console.log("Draw");
            }
            usersChoice.classList.remove("highlighted");
        })
        .catch(function(err) {
            console.log("err", err);
        })
        console.log("computersPromise 2", computersPromise);


}

closeWinnerBox();
function closeWinnerBox() {
    closeBox.addEventListener("click", function() {
        console.log("closing");
        resetGame();
    })
    winnerBoxBack.addEventListener("click", function() {
        resetGame();
    })
    document.addEventListener('keypress', function (e) {
        if (e.keyCode == 27) {
            resetGame();
        }
    })
}


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

    for (var i = 0; i < option.length; i++) {
        option[i].classList.remove("highlighted");
    }

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



function gameStart(gameMode) {
    let rock = document.getElementById('rock-pvc');
    console.log(rock);
    if (gameMode === "pvc") {
        console.log("single player");
    }
    if(gameMode === "pvp") {
        console.log("multiplayer");
    }
    if(gameMode === "cvc") {
        console.log("cpu battle");
    }
}
