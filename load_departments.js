// Obtener el contenido del archivo "game.html" utilizando Fetch API
fetch("game.html")
  .then((response) => response.text())
  .then((data) => {
    // Crear un elemento div para almacenar temporalmente el contenido del archivo
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;

    // Obtener todos los elementos <path> dentro del contenido cargado
    const paths = tempDiv.querySelectorAll("path");

    // Obtener el select del formulario
    const departmentSelect = document.getElementById("department");

    // Agregar opciones al select con los nombres de los departamentos
    paths.forEach((path) => {
      const departmentName = path.getAttribute("data-department");
      if (departmentName) {
        const option = document.createElement("option");
        option.value = departmentName;
        option.textContent = departmentName;
        departmentSelect.appendChild(option);
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching and loading departments:", error);
  });