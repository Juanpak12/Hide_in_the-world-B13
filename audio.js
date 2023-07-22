// funcionalidad de audio de fondo en pagina home
var audio = document.getElementById("musica");
audio.oncanplaythrough = function () {
  audio.play();
};
