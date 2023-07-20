// Obtener elementos del DOM
const form = document.getElementById("start-form");
const playerInput = document.getElementById("player");
const departmentSelect = document.getElementById("department");
const chosenPlayerNamesList = document.getElementById("chosen-player-names");
const chosenPlayersWithDepartmentList = document.getElementById("chosen-players-with-department");

// Función para resaltar el departamento seleccionado en el mapa
function highlightDepartment(selectedDepartment) {
    const selectedDepartmentElement = document.getElementById(selectedDepartment.toLowerCase());
    if (selectedDepartmentElement) {
        // Cambiar el color de relleno del departamento seleccionado
        selectedDepartmentElement.style.fill = "red";

        // Esperar unos segundos y luego quitar el resaltado
        setTimeout(() => {
            selectedDepartmentElement.style.fill = "#7c7c7c"; // Cambiar el color de relleno original
        }, 3000); // 3000 milisegundos (3 segundos)
    }
}

// Evento al enviar el formulario
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const playerName = playerInput.value.trim();
    const selectedDepartment = departmentSelect.value;

    if (playerName !== "" && selectedDepartment !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = playerName;
        chosenPlayerNamesList.appendChild(listItem);

        const playerWithDepartmentItem = document.createElement("li");
        playerWithDepartmentItem.textContent = `${playerName}, ${selectedDepartment}`;
        chosenPlayersWithDepartmentList.appendChild(playerWithDepartmentItem);

        playerInput.value = "";

        // Resaltar el departamento seleccionado en el mapa
        highlightDepartment(selectedDepartment);
    }
});

playerInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) { // 13 is the key code for "Enter" key
        form.dispatchEvent(new Event('submit'));
    }
});
