//Game Select Buttons
const pvp = document.getElementsByClassName("pvp")[0];
const pvc = document.getElementsByClassName("pvc")[0];
const cvc = document.getElementsByClassName("cvc")[0];
const gameMode = document.getElementsByClassName("game-selection")[0];
const playerVsPlayerGame = document.getElementsByClassName("player-vs-player-game")[0];
const playerVsComputerGame = document.getElementsByClassName("player-vs-computer-game")[0];
const computerVsComputerGame = document.getElementsByClassName("computer-vs-computer-game")[0];
const goBack = document.getElementsByClassName("go-back");


pvp.addEventListener("click", function() {
    console.log("pvp");
    gameMode.classList.add("hide");
    playerVsPlayerGame.classList.remove("hide");

})

pvc.addEventListener("click", function() {
    gameMode.classList.add("hide");
    playerVsComputerGame.classList.remove("hide");

})
cvc.addEventListener("click", function() {
    gameMode.classList.add("hide");
    computerVsComputerGame.classList.remove("hide");
})

for (var i = 0; i < goBack.length; i++) {
    goBack[i].addEventListener("click", function() {
        playerVsPlayerGame.classList.add("hide");
        playerVsComputerGame.classList.add("hide");
        computerVsComputerGame.classList.add("hide");
        gameMode.classList.remove("hide");
    })
}
