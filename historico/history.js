const gameString = localStorage.getItem("storeObjectAsString");
const gameArray = JSON.parse(gameString);
const historyId = $("#storage");

function toSliceGameArray() {
  if (gameArray === null) {
    return [];
  }

  if (gameArray.length > 10) {
    return gameArray.slice(-10);
  } else {
    return gameArray;
  }
}

function createHtmlStorage() {
  toSliceGameArray().forEach((game) => {
    if (game.gameNameKey === "Jogo Do Galo") {
      historyId.prepend(`<ul className="list-group mt-2 pt-2">
                             ${game.gameNameKey}:
                             ${game.resultKey} em
                             ${game.currentDateKey} às
                             ${game.currentTimeKey}.
                             Duração: ${game.currentDurationKey}

                             </ul>`);
      console.log(game.gameNameKey);
    } else if (game.gameNameKey === "Quatro em Linha") {
      console.log("GAME", game);
      historyId.prepend(`<ul className="list-group mt-2 pt-2">
                             ${game.gameNameKey}:
                             ${game.winningPlayerKey} em
                             ${game.dateKey} às
                             ${game.timeKey}.
                             Duração: ${game.timerKey}

                             </ul>`);
    } else if (game.gameNameKey === "Jogo da Memória") {
      historyId.prepend(`<ul className="list-group mt-2 pt-2">
                             ${game.gameNameKey}:
                             ${game.jogador} jogou em
                             ${game.currentDate} às
                             ${game.currentTime}.
                             Duração: ${game.tempo}

                             </ul>`);
    } else {
    }
  });
}

createHtmlStorage();
