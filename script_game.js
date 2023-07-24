document.addEventListener("DOMContentLoaded", function () {
    //variables para el juego//
    const mapContainer = document.getElementById("colombia");
    const modalContainer = document.getElementById("modal_container");
    const alertPlayerDeleted = document.getElementById("alertPlayerDeleted");
    const continueButton = document.getElementById("nextKill");
    const gameOverButton = document.getElementById("gameOverButton");
    const gameIsOver = document.getElementById("gameIsOver");
    const departments = document.querySelectorAll("path");
    const deadCodersList = document.getElementById("deadCodersList");
    const resetButton = document.getElementById("reset-game");
    // Obtener el contenedor de la explosión y el elemento del GIF de explosión
    const explosionContainer = document.getElementById("explosion-container");
    const explosionGif = document.getElementById("explosion-gif");

    let isGameOver = false;
    // Recuperar la lista de jugadores y departamentos del almacenamiento local
    const storedPlayerList = localStorage.getItem("playerList");
    const storedDepartmentList = localStorage.getItem("departmentList");
    let playerList = storedPlayerList ? JSON.parse(storedPlayerList) : [];
    let departmentList = storedDepartmentList ? JSON.parse(storedDepartmentList) : [];
   
    // Obtener el contenedor de la explosión y el elemento del GIF de explosión
    const explosionContainer = document.getElementById("explosion-container");
    const explosionGif = document.getElementById("explosion-gif");

    // Crear el elemento de audio
    const music = new Audio();

    // Lista de canciones en secuencia
    const canciones = [
        "./Media/Castevania Order of Ecclesia ost 06 Deliberate Blink.mp3",
        "./Media/Castevania Order of Ecclesia ost 03 Heroic Dawning.mp3",
        "./Media/Castevania Order of Ecclesia ost 05 Vanishing.mp3",
        "./Media/Europe  The Final Countdown.mp3",
        // Agrega más canciones si es necesario
    ];

    let songNow = 0; // Índice de la canción actual

    // Función para cargar y reproducir la siguiente canción
    function loadNextSong() {
        if (songNow < canciones.length) {
            music.src = canciones[songNow];
            music.load(); // Carga la nueva canción
            music.play(); // Reproducir la canción
            songNow = (songNow + 1) % canciones.length;// Avanzar al siguiente índice de canción//
        } else {
            // Reiniciar el índice si se han reproducido todas las canciones
            songNow = 0;
            music.src = canciones[songNow]; // Cargar la primera canción nuevamente
            music.load(); // Cargar la primera canción
            music.play(); // Reproducir la primera canción
        }
    }

    // Evento para reproducir la siguiente canción cuando la anterior termina
    music.addEventListener("ended", function () {
        loadNextSong(); // Inicia la reproducción de la siguiente canción
    });

    // Iniciar la reproducción de la primera canción
    loadNextSong();
    // Ajustar el volumen del audio de fondo al 40%
    music.volume = 0.18;

    mapContainer.addEventListener("click", function (event) {
        if (isGameOver) return;

        const target = event.target;
        if (target.tagName === "path") {
            if (!target.classList.contains("killed")) {
                target.classList.add("killed");
                showModal(target.getAttribute("data-department"));
            }
        }

        // Mostrar la explosión justo sobre el departamento clickeado
        const explosionSize = 400; // Tamaño de la explosión (ajusta según tus necesidades)
        const x = event.clientX - explosionSize / 2;
        const y = event.clientY - explosionSize / 2;
        showExplosion(x, y);
    });

    // Función para mostrar la explosión en las coordenadas especificadas
    function showExplosion(x, y) {
        const explosionContainer = document.getElementById("explosion-container");
        explosionContainer.style.display = "flex";
        explosionContainer.style.left = x + "0";
        explosionContainer.style.top = y + "0";

        // Crear un nuevo elemento de audio para la explosión
        const explosionAudio = new Audio("./Media/sonidoBomba.mp3");

        // Agregar un evento para reanudar la música cuando la explosión termine
        explosionAudio.addEventListener("ended", function () {
            // Reanudar la música cuando la explosión termine
            music.play();
        });

        // Pausar la música o bajar el volumen
        music.volume = 0.4; // para bajar el volumen al 20%

        // Reproducir el audio de la explosión
        explosionAudio.play();

        // Ocultar la explosión después de 1 segundo (1000 milisegundos)
        setTimeout(function () {
            hideExplosion();
        }, 4300); // Ajusta el tiempo para que coincida con la duración del gif de la explosión
    }

    function hideExplosion() {
        explosionContainer.style.display = "none";
    }

    // Evento de clic para reiniciar el juego y redirigir a home
    resetButton.addEventListener("click", function () {
        // Limpiar el almacenamiento local y redirigir a home
        localStorage.clear();
        window.location.href = "./home.html";
    });
    // Agregar esta variable para almacenar los nombres de los jugadores eliminados
    
    function showModal(departmentName) {
        modalContainer.classList.add("show");
    
        const coderIndex = departmentList.findIndex((department) => department === departmentName);
    
        if (coderIndex !== -1) {
            const playerName = playerList[coderIndex]?.name;
            alertPlayerDeleted.textContent = playerName
                ? `¡El departamento ${departmentName} ha sido destruido! Ha muerto ${playerName}.`
                : `No se encontraron coders en el departamento ${departmentName}.`;
    
            if (playerName) {
                const listItem = document.createElement("li");
                listItem.textContent = `${playerName}, ${departmentName}`;
                deadCodersList.appendChild(listItem);
    
                // Filtra la lista de jugadores para mantener solo aquellos que no corresponden al departamento destruido
                playerList = playerList.filter((player) => player.department !== departmentName);
                departmentList = departmentList.filter((department) => department !== departmentName);
                updateLocalStorage();
            }
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
        modalContainer.classList.remove("show");
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
        deadCodersList.innerHTML = ""; // Vaciar la lista de coders muertos
        playerList = [];
        departments = [];
        loadLocalStorage(); // Cargar los datos actualizados del almacenamiento local
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
            playerList = JSON.parse(storedPlayerList).map(playerName => ({ name: playerName }));
            departmentList = JSON.parse(storedDepartmentList);
            console.log("Loaded playerList:", playerList);
            console.log("Loaded departmentList:", departmentList);
    
            // Limpiamos la lista de jugadores muertos al cargar el almacenamiento local
            deadCodersList.innerHTML = "";
    
            // Recorremos los departamentos para verificar si hay jugadores en ellos
            departmentList.forEach((departmentName) => {
                const player = playerList.find(player => player.department === departmentName);
                if (player) {
                    const playerName = player.name;
                    const listItem = document.createElement("li");
                    listItem.textContent = `${playerName}, ${departmentName}`;
                    deadCodersList.appendChild(listItem);
                }
            });
        }
    }
    loadLocalStorage(); // Cargar los datos al iniciar la página
    initGame(); // Iniciar el juego

});