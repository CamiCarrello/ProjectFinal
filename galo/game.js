// creating timerInterval

const timerInterval = setInterval(() => {
  const timer = $("#timer");
  let minutes = parseInt(timer.text().split(":")[0]);
  let seconds = parseInt(timer.text().split(":")[1]);

  if (seconds === 59) {
    minutes = minutes + 1;
    seconds = 0;
  } else {
    seconds = seconds + 1;
  }

  timer.text(`${minutes}:${seconds.toString().padStart(2, "0")}`);
}, 1000);

let playerOneTurn = true;
let round = 1;
const maxRounds = 5;

const playerOneName = sessionStorage.getItem("playerOne");
const playerTwoName = sessionStorage.getItem("playerTwo");

$("#playerOneName").html(playerOneName);
$("#playerTwoName").html(playerTwoName);

const playerOneSymbol = "X";
const playerTwoSymbol = "O";
let playerOneScore = 0;
let playerTwoScore = 0;

const board = [...Array(3)].map((_) => Array(3));

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const id = `#element${i}${j}`;
    $(id).click(() => {
      updateBoard(i, j, id);
    });
  }
}

function updateBoard(posX, posY, elementId) {
  if (board[posX][posY] !== undefined) {
    showError();
    return;
  }

  const htmlElement = $(elementId);

  if (playerOneTurn) {
    htmlElement.html("<img class='board-img' src='imgAna/cross.png'>");
    board[posX][posY] = playerOneSymbol;
  } else {
    htmlElement.html("<img class='board-img' src='imgAna/circle.png'>");
    board[posX][posY] = playerTwoSymbol;
  }

  playerOneTurn = !playerOneTurn;
  const winner = checkBoardForWinner(board);

  if (winner === playerOneSymbol) {
    const winnerName = $("#playerOneName").text();
    showRoundWinner(winnerName);
    goToNextRound(playerOneSymbol);
  } else if (winner === playerTwoSymbol) {
    const winnerName = $("#playerTwoName").text();
    showRoundWinner(winnerName);
    goToNextRound(playerTwoSymbol);
  } else {
    const isDraw = checkBoardForDraw(board);

    if (isDraw) {
      showRoundDraw();
      goToNextRound();
    }
  }

  drawBorderOnPlayerSections();
}

function showRoundWinner(winnerName) {
  const winnerRound = $("#winnerRound");
  winnerRound.text(winnerName);
  const toast = new bootstrap.Toast($("#winnerRoundToast"));
  toast.show();
}

function showError() {
  const toast = new bootstrap.Toast($("#errorToast"));
  toast.show();
}

function showRoundDraw() {
  const toast = new bootstrap.Toast($("#drawRoundToast"));
  toast.show();
}

function finishGame() {
  clearInterval(timerInterval);
  let timerContent = $("#timer").text();

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let id = `element${i}${j}`;
      $(`#${id}`).off();
    }
  }

  if (playerOneScore > playerTwoScore) {
    const winnerName = $("#playerOneName").text();
    const winner = $("#winner");
    winner.text(winnerName);
    const toast = new bootstrap.Toast($("#winnerToast"));
    toast.show();
  } else if (playerTwoScore > playerOneScore) {
    const winnerName = $("#playerTwoName").text();
    const winner = $("#winner");
    winner.text(winnerName);
    const toast = new bootstrap.Toast($("#winnerToast"));
    toast.show();
  } else {
    const toast = new bootstrap.Toast($("#drawToast"));
    toast.show();
  }

  const result = getResult();
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;
  const currentTime =
    String(today.getHours()).padStart(2, "0") +
    ":" +
    String(today.getMinutes()).padStart(2, "0");
  const gameName = "Jogo Do Galo";

  let objectStorage = {
    gameNameKey: gameName,
    resultKey: result,
    currentDateKey: date,
    currentTimeKey: currentTime,
    currentDurationKey: timerContent,
  };
  let stringObj = localStorage.getItem("storeObjectAsString");
  let arrayStorage = [];
  if (stringObj !== null) {
    const storeAsArray = JSON.parse(stringObj);
    arrayStorage = storeAsArray;
  }
  arrayStorage.push(objectStorage);
  const storeObjectAsString = JSON.stringify(arrayStorage);
  localStorage.setItem("storeObjectAsString", storeObjectAsString);
}

function getResult() {
  if (playerOneScore > playerTwoScore) {
    const winnerName = $("#playerOneName").text();
    return `${winnerName} ganhou`;
  } else if (playerTwoScore > playerOneScore) {
    const winnerName = $("#playerTwoName").text();
    return `${winnerName} ganhou`;
  } else {
    return "Empate";
  }
}

function checkBoardForWinner(board) {
  let winner = undefined;

  // Checking rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      winner = board[i][0];
      break;
    }
  }

  // Checking columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      winner = board[0][i];
      break;
    }
  }
  // Checking diagonal
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    winner = board[0][0];
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    winner = board[0][2];
  }

  return winner;
}

function checkBoardForDraw(board) {
  let isDraw = true;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === undefined) {
        isDraw = false;
        break;
      }
    }
  }

  return isDraw;
}

function drawBorderOnPlayerSections() {
  const playerOneSection = $("#playerOneSection");
  const playerTwoSection = $("#playerTwoSection");

  playerOneSection.removeClass("border");
  playerOneSection.removeClass("border-success");
  playerOneSection.removeClass("rounded-4");

  playerTwoSection.removeClass("border");
  playerTwoSection.removeClass("border-success");
  playerTwoSection.removeClass("rounded-4");

  if (playerOneTurn) {
    playerOneSection.addClass("border");
    playerOneSection.addClass("border-success");
    playerOneSection.addClass("rounded-4");
  } else {
    playerTwoSection.addClass("border");
    playerTwoSection.addClass("border-success");
    playerTwoSection.addClass("rounded-4");
  }
}

function goToNextRound(winnerSymbol) {
  if (winnerSymbol === playerOneSymbol) {
    playerOneScore = playerOneScore + 1;
    let playerOneScoreHtml = $("#scorePlayerOne");
    playerOneScoreHtml.text(playerOneScore);
  } else if (winnerSymbol === playerTwoSymbol) {
    playerTwoScore = playerTwoScore + 1;
    let playerTwoScoreHtml = $("#scorePlayerTwo");
    playerTwoScoreHtml.text(playerTwoScore);
  }

  if (round === maxRounds) {
    finishGame();
    return;
  }

  round = round + 1;
  let roundHtml = $("#round");
  roundHtml.text(`${round}/${maxRounds}`);

  playerOneTurn = true;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const id = `element${i}${j}`;
      const element = document.getElementById(id);
      element.innerText = "";
      board[i][j] = undefined;
    }
  }
}
