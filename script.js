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


function game(usersChoice) {
    const computersChoiceValue = computersChoice();
    const winner = determineWinner(usersChoice.name, computersChoiceValue);
    console.log("Users choice - ", usersChoice.name );
    console.log("Computers choice - ", computersChoiceValue, );
    winnerBox.classList.remove("hide");
    winnerBoxBack.classList.remove("hide");
    if(usersChoice.name === winner) {
        userWin.classList.remove('hide');
        console.log("Player 1 wins");
    } else if (computersChoiceValue === winner) {
        userLoss.classList.remove('hide');

        console.log("Player 2 wins");
    } else if (winner === "Draw") {
        userDraw.classList.remove('hide');

        console.log("Draw");
    }
    // usersChoice.classList.remove("highlighted");
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
