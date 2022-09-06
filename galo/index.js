function startGame() {
    const playerOneName = $("#playerOneInput").val();
    const playerTwoName = $("#playerTwoInput").val();

    sessionStorage.setItem("playerOne", playerOneName)
    sessionStorage.setItem("playerTwo", playerTwoName)

    location.href = "game.html";
}

