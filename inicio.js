//funcionalidad de audio en boton start
function reproducirAudio() {
  var audio = new Audio("ok.mp3");
  audio.play();
  audio.onended = function () {
    window.location.href = "home.html";
  };
}
document.getElementById("start").addEventListener("click", reproducirAudio);
