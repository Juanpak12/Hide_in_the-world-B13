document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("colombia");
    const modalContainer = document.getElementById("modal_container");
    const alertPlayerDeleted = document.getElementById("alertPlayerDeleted");
    const continueButton = document.getElementById("nextKill");
    const gameOverButton = document.getElementById("gameOverButton");
    const gameIsOver = document.getElementById("gameIsOver");
    const departments = document.querySelectorAll("path");
    const deadCodersList = document.getElementById("deadCodersList");
    let isGameOver = false;

    // Recuperar la lista de jugadores y departamentos del almacenamiento local
    const storedPlayerList = localStorage.getItem("playerList");
    const storedDepartmentList = localStorage.getItem("departmentList");
    let playerList = storedPlayerList ? JSON.parse(storedPlayerList) : [];
    let departmentList = storedDepartmentList ? JSON.parse(storedDepartmentList) : [];

    mapContainer.addEventListener("click", function (event) {
        if (isGameOver) return;

        const target = event.target;
        if (target.tagName === "path") {
            if (!target.classList.contains("killed")) {
                target.classList.add("killed");
                showModal(target.getAttribute("data-department"));
            }
        }
    });

    function showModal(departmentName) {
        modalContainer.style.display = "block";

        const coderIndex = departmentList.findIndex((department) => department === departmentName);
        if (coderIndex !== -1) {
            const playerName = playerList[coderIndex];
            alertPlayerDeleted.textContent = `¡El departamento ${departmentName} ha sido destruido! Ha muerto ${playerName}.`;
            const listItem = document.createElement("li");
            listItem.textContent = `${playerName}, ${departmentName}`;
            deadCodersList.appendChild(listItem);
            playerList.splice(coderIndex, 1);
            departmentList.splice(coderIndex, 1);
            updateLocalStorage();
        } else {
            alertPlayerDeleted.textContent = `No se encontraron coders en el departamento ${departmentName}.`;
        }

        const remainingDepartments = document.querySelectorAll("path:not(.killed)");
        if (remainingDepartments.length === 0) {
            isGameOver = true;
            showGameOver();
        }
    }

    function hideModal() {
        modalContainer.style.display = "none";
    }

    function showGameOver() {
        gameIsOver.style.display = "block";
        gameOverButton.style.display = "block";
        gameOverButton.addEventListener("click", restartGame);
    }

    function restartGame() {
        const killedDepartments = document.querySelectorAll(".killed");
        for (const department of killedDepartments) {
            department.classList.remove("killed");
        }
        isGameOver = false;
        gameIsOver.style.display = "none";
        gameOverButton.style.display = "none";
        deadCodersList.innerHTML = "";
        playerList = [];
        departmentList = [];
        updateLocalStorage();
    }

    function updateLocalStorage() {
        localStorage.setItem("playerList", JSON.stringify(playerList));
        localStorage.setItem("departmentList", JSON.stringify(departmentList));
    }

    function initGame() {
        continueButton.addEventListener("click", hideModal);
        gameIsOver.style.display = "none";
        gameOverButton.style.display = "none";
    }

    // Cargar los datos del almacenamiento local al cargar la página
    function loadLocalStorage() {
        const storedPlayerList = localStorage.getItem("playerList");
        const storedDepartmentList = localStorage.getItem("departmentList");
        if (storedPlayerList && storedDepartmentList) {
            playerList = JSON.parse(storedPlayerList);
            departmentList = JSON.parse(storedDepartmentList);
            playerList.forEach((playerName, index) => {
                const departmentName = departmentList[index];
                const listItem = document.createElement("li");
                listItem.textContent = `${playerName}, ${departmentName}`;
                deadCodersList.appendChild(listItem);
            });
        }
    }

    initGame();
    loadLocalStorage();
});