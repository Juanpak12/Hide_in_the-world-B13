const form = document.getElementById("start-form");
const playerInput = document.getElementById("player");
const playerNamesList = document.getElementById("player-names");
const chosenPlayerNamesList = document.getElementById("chosen-player-names");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const playerName = playerInput.value.trim();
    if (playerName !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = playerName;
        chosenPlayerNamesList.appendChild(listItem);
        playerInput.value = "";
    }
});

playerInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) { // 13 is the key code for "Enter" key
        form.dispatchEvent(new Event('submit'));
    }
});

// Button play

var playbutton = document.getElementById("playbutton");
var gamecontainer = document.getElementById("gamecontainer");

playbutton.addEventListener("click", function(event) {
    event.preventDefault();

    playbutton.style.display = "none";
    gamecontainer.style.display = "block";

    iniciarjuego();
});

function iniciarjuego() {
    console.log("El juego ha comenzado.");
}
