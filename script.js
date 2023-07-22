document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("start-form");
    const playerInput = document.getElementById("player");
    const departmentSelect = document.getElementById("department");
    const chosenPlayerNamesList = document.getElementById("chosen-player-names");
    const agregarButton = document.getElementById("agregar"); // Obtener el botón para agregar jugadores
    const startGameButton = document.getElementById("start-game"); // Obtener el botón para iniciar el juego

    // Lista para almacenar los nombres de los jugadores y departamentos
    let playerList = [];
    let departmentList = [];

    function updateLocalStorage() {
        localStorage.setItem("playerList", JSON.stringify(playerList));
        localStorage.setItem("departmentList", JSON.stringify(departmentList));
    }

    function loadLocalStorage() {
        const storedPlayerList = localStorage.getItem("playerList");
        const storedDepartmentList = localStorage.getItem("departmentList");
        if (storedPlayerList && storedDepartmentList) {
            playerList = JSON.parse(storedPlayerList);
            departmentList = JSON.parse(storedDepartmentList);
            playerList.forEach((playerName, index) => {
                const departmentName = departmentList[index];
                const playerWithDepartmentItem = document.createElement("li");
                playerWithDepartmentItem.textContent = `${playerName}, ${departmentName}`;
                chosenPlayerNamesList.appendChild(playerWithDepartmentItem);
            });
        }
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const playerName = playerInput.value.trim();
        const selectedDepartment = departmentSelect.value;

        if (playerName !== "" && selectedDepartment !== "") {
            const coderInfo = `${playerName}, ${selectedDepartment}`;
            playerList.push(playerName);
            departmentList.push(selectedDepartment);
            updateLocalStorage();

            const playerWithDepartmentItem = document.createElement("li");
            playerWithDepartmentItem.textContent = coderInfo;
            chosenPlayerNamesList.appendChild(playerWithDepartmentItem);

            playerInput.value = "";
        } else {
            alert("Por favor, ingresa un nombre y selecciona un departamento antes de agregar.");
        }
    });

    agregarButton.addEventListener("click", function () {
        form.dispatchEvent(new Event("submit"));
    });

    // Evento de clic para iniciar el juego después de agregar jugadores y departamentos
    startGameButton.addEventListener("click", () => {
        if (playerList.length > 0 && departmentList.length > 0) {
            // Redirigir a la página de juego solo si hay jugadores y departamentos agregados
            window.location.href = "./game.html";
        } else {
            // Mostrar un mensaje de alerta si no hay jugadores o departamentos agregados
            alert("Agrega al menos un jugador y selecciona al menos un departamento antes de iniciar el juego.");
        }
    });

    // Cargar los datos del almacenamiento local al cargar la página
    loadLocalStorage();
});