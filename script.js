//Game Select Buttons
const pvp = document.getElementsByClassName("pvp")[0];
const pvc = document.getElementsByClassName("pvc")[0];
const cvc = document.getElementsByClassName("cvc")[0];
const gameSelection = document.getElementsByClassName("game-selection")[0];
const playerVsPlayerGame = document.getElementsByClassName("player-vs-player-game")[0];
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


pvp.addEventListener("click", function() {
    console.log("pvp");
    gameSelection.classList.add("hide");
    playerVsPlayerGame.classList.remove("hide");
    gameStart("pvp");


})

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
        playerVsPlayerGame.classList.add("hide");
        playerVsComputerGame.classList.add("hide");
        computerVsComputerGame.classList.add("hide");
        gameSelection.classList.remove("hide");
    })
}

for (var i = 0; i < option.length; i++) {
    option[i].addEventListener('click', function(e) {
        console.log("Option clicked", e.target);
        e.target.classList.add("highlighted");

    })
}

function computersChoice() {
    const options = ["rock", "paper", "scissors"];
    const choice = Math.floor(Math.random() * 3);
    return options[choice];
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
