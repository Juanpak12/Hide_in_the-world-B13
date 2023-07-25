document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("start-form");
  const playerInput = document.getElementById("player");
  const chosenPlayerNamesList = document.getElementById("chosen-player-names");

  const playerList = []; // Array para almacenar los nombres de los jugadores
  let departments = []; // Array para almacenar los departamentos disponibles

  function updateInicioButtonState() {
      if (playerList.length >= 2) {
          // Habilitar el botón de inicio si se tienen al menos 2 jugadores
          document.getElementById("inicio").style.display = "";
      } else {
          // Deshabilitar el botón de inicio si no se tienen al menos 2 jugadores
          document.getElementById("inicio").style.display = "none";
      }
  }

  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evitar que el formulario se envíe automáticamente

      const playerName = playerInput.value.trim();

      if (playerName !== "" && playerList.length < 33) {
          const randomDepartmentIndex = Math.floor(Math.random() * departments.length);
          const selectedDepartment = departments[randomDepartmentIndex];

          playerList.push(playerName); // Agregar solo el nombre del jugador a la lista de jugadores

          // Mostrar solo el nombre del jugador en la lista, sin el departamento
          const playerItem = document.createElement("li");
          playerItem.textContent = playerName;
          // Agregar la clase "player-list-item" al elemento li
          playerItem.classList.add("player-list-item");
          chosenPlayerNamesList.appendChild(playerItem);
          updateInicioButtonState();
          playerInput.value = ""; // Limpiar el campo de entrada para el siguiente nombre
          if (playerList.length === 33) {
              // Desactivar el botón de agregar cuando se alcance el máximo de 33 jugadores
              document.getElementById("agregar").disabled = true;
              document.getElementById("agregar").style.display = "none";
          }
          updateLocalStorage(); // Guardar los datos actualizados en el almacenamiento local
          // Función para agregar un jugador con su departamento al array
      } else {
          alert("Por favor, ingresa un nombre y asegúrate de que no se exceda el máximo de 33 jugadores.");
      }
      updateInicioButtonState();
      // Aplicar la barra de desplazamiento después de agregar 4 jugadores
      if (playerList.length % 4 === 0 && playerList.length > 0) {
          chosenPlayerNamesList.style.maxHeight = "200px"; // Puedes ajustar el valor de altura
          chosenPlayerNamesList.style.overflowY = "auto";
      }
  });

  // Obtener el contenido del archivo "game.html" utilizando Fetch API
  fetch("game.html")
      .then((response) => response.text())
      .then((data) => {
          // Crear un elemento div para almacenar temporalmente el contenido del archivo
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = data;

          // Obtener todos los elementos con ID dentro del contenido cargado
          const departmentsContainer = tempDiv.querySelector("#colombia");
          // Obtener todos los elementos con ID de departamentos dentro del contenedor
          const elementsWithID = departmentsContainer.querySelectorAll("[id]");

          // Agregar IDs de elementos como departamentos a la lista "departments", excluyendo los que no se desean
          elementsWithID.forEach((element) => {
              const departmentID = element.id;
              if (departmentID !== "elemento1" && departmentID !== "elemento2") {
                  departments.push(departmentID);
              }
          });
      })
      .catch((error) => {
          console.error("Error fetching and loading departments:", error);
      });

  // Habilitar el botón de agregar si se quitaron jugadores de la lista
  playerInput.addEventListener("input", function () {
      document.getElementById("agregar").disabled = false;
  });

  function updateLocalStorage() {
      localStorage.setItem("playerList", JSON.stringify(playerList));
      localStorage.setItem("departmentList", JSON.stringify(departments));
  }
});

function agregarJugador(nombre, departamento) {
    playerList.push({ name: playerName, department: selectedDepartment });
}
    // Función para cargar el audio al iniciar la página
    function cargarAudio() {
        audio = new Audio("./Media/BOOM.mp3");
        audio.volume = 0.08;
      }
      cargarAudio();
        audio.onended = function () {
        window.location.href = "./game.html";
        };
        function reproducirAudio() {
            // Verificar si la variable "audio" está definida
            if (audio) {
              audio.play();
              audio.onended = function () {
                window.location.href = "./game.html";
              };
            }
          }
    
    document.getElementById("inicio").addEventListener("click", reproducirAudio);

    document.addEventListener('DOMContentLoaded', function () {
    // Crear el elemento de audio
    const musica = new Audio();

    // Lista de canciones en secuencia
    const songs = [
        "./Media/Castevania Order of Ecclesia ost 02 Oncomming Dread.mp3",
        "./Media/Castevania Order of Ecclesia ost 01.mp3",
        "./Media/Castevania Order of Ecclesia ost 03 Heroic Dawning.mp3",        
        "./",
        // Agrega más canciones si es necesario
    ];

    let songNow = 0; // Índice de la canción actual

    // Función para cargar y reproducir la siguiente canción
    function loadNextSong() {
        if (songNow < songs.length) {
            musica.src = songs[songNow];
            musica.load(); // Carga la nueva canción
            musica.play(); // Reproducir la canción
            songNow = ++songNow;
        } else {
            // Reiniciar el índice si se han reproducido todas las canciones
            songNow = 0;
            musica.src = songs[songNow]; // Cargar la primera canción nuevamente
            musica.load(); // Cargar la primera canción
            musica.play(); // Reproducir la primera canción
        }
    }

    // Evento para reproducir la siguiente canción cuando la anterior termina
    musica.addEventListener("ended", function () {
        loadNextSong(); // Inicia la reproducción de la siguiente canción
    });

    // Iniciar la reproducción de la primera canción
    loadNextSong();
        // Ajustar el volumen del audio de fondo al 18%
   // funcionalidad de audio de fondo en pagina//
   document.addEventListener('DOMContentLoaded', function () {
    let audio = document.getElementById("musica1");
    audio.oncanplaythrough = function () {
    audio.play();
    };
    })

    function reproducirAudio() {
        let audio = new Audio("./Media/O.K.mp3");
        audio.play();
        audio.onended = function () {
          window.location.href = "./home.html";
        };
      }
      document.getElementById("start").addEventListener("click", reproducirAudio);
        musica.volume = 0.18;
});
