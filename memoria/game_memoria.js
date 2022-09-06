function startGame1() {
  const playerName = $("#playerInput").val();

  sessionStorage.setItem("player", playerName);

  location.href = "game_play.html";
}

function startGame2() {
  const playerName = $("#playerInput").val();

  sessionStorage.setItem("player", playerName);

  location.href = "game_play2.html";
}

function startGame3() {
  const playerName = $("#playerInput").val();

  sessionStorage.setItem("player", playerName);
  location.href = "game_play3.html";
}

$("#playerInput").keypress(function (e) {
  if (!checkChar(e)) {
    e.preventDefault();
  }
});
function checkChar(e) {
  let char = String.fromCharCode(e.keyCode);

  console.log(char);
  let pattern = "[a-zA-Z0-9]";
  if (char.match(pattern)) {
    return true;
  }
}
