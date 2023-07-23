function reproducirAudio() {
    var audio = new Audio("O.K.mp3");
    audio.play();
    audio.onended = function () {
      window.location.href = "home.html";
    };
  }
  document.getElementById("start").addEventListener("click", reproducirAudio);