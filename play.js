//funcionalidad de audio en boton inicio
function reproducirAudio() {
  var audio = new Audio("BOOM.mp3");
  audio.play();
  audio.onended = function () {
    window.location.href = "game.html";
  };
}
document.getElementById("play").addEventListener("click", reproducirAudio);
