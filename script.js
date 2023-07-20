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
    if (event.keyCode === 1) { // 13 is the key code for "Enter" key
        form.dispatchEvent(new Event('submit'));
    }
});

// Button inicio
