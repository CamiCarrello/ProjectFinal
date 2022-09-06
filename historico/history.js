const gameString = localStorage.getItem("storeObjString");
const gameArray = JSON.parse(gameString);

const historyId = $("#storage");

gameArray.forEach((game) => {
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
    alert("O JOGO NÃO EXISTE!");
  }
});
/*
)
for (let i = 0; i < gameArray.length; i++) {
    if (gameArray[i].gameNameKey === "Jogo Do Galo") {


        historyId.prepend(`<ul className="list-group mt-2 pt-2">
                                <li className="list-group-item">    
                                 ${gameArray[i].gameNameKey}:
                                 ${gameArray[i].resultKey} em 
                                 ${gameArray[i].currentDateKey} às 
                                 ${gameArray[i].currentTimeKey}. 
                                 Duração: ${gameArray[i].currentDurationKey}
                                 </li>
                                 </ul>`)

    } else if (gameArray[i].gameNameKey === "Quatro em Linha") {
        historyId.prepend(`<ul className="list-group mt-2 pt-2">
                                <li className="list-group-item">    
                                 ${gameArray[i].gameNameKey}:
                                 ${gameArray[i].winningPlayerKey} em 
                                 ${gameArray[i].dateKey} às 
                                 ${gameArray[i].timeKey}. 
                                 Duração: ${gameArray[i].timerKey}
                                 </li>
                                 </ul>`)
    } else if (gameArray[i].gameNameKey === "Jogo da Memória") {
        historyId.prepend(`<ul className="list-group mt-2 pt-2">
                                <li className="list-group-item">    
                                 ${gameArray[i].gameNameKey}:
                                 ${gameArray[i].jogador} em 
                                 ${gameArray[i].currentDate} às 
                                 ${gameArray[i].currentTime}. 
                                 Duração: ${gameArray[i].tempo}
                                 </li>
                                 </ul>`)
    } else {
        alert("O JOGO NÃO EXISTE!")
    }


}
*/
