//opcoes de cartas
const cardArray = [
  {
    name: "cereja",
    img: "imgs/cereja.jpg",
  }, //7
  {
    name: "bolo",
    img: "imgs/bolo.jpg",
  }, //1
  {
    name: "rocambole",
    img: "imgs/rocambole.jpg",
  }, // 2
  {
    name: "croissant",
    img: "imgs/croissant.jpg",
  }, // 3

  {
    name: "morango",
    img: "imgs/morango.jpg",
  }, // 4
  {
    name: "cupcake",
    img: "imgs/cupcake.jpg",
  }, // 5
  {
    name: "morango",
    img: "imgs/morango.jpg",
  },

  {
    name: "bolo",
    img: "imgs/bolo.jpg",
  },

  {
    name: "cupcake",
    img: "imgs/cupcake.jpg",
  },
  {
    name: "rocambole",
    img: "imgs/rocambole.jpg",
  },
  {
    name: "croissant",
    img: "imgs/croissant.jpg",
  },
  {
    name: "cereja",
    img: "imgs/cereja.jpg",
  },
];

// ordenar e misturar cartas.
cardArray.sort(() => 0.5 - Math.random());

const grid = $(".board");
const resultDisplay = $("#result");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
//creat your board
function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = $("<img>");
    card.attr("src", "imgs/red.png");
    card.attr("data-id", i);
    card.on("click", flipCards);
    $(grid).append(card);
  }
}

//ver se há pares
function matches() {
  const cards = $("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];
  const red = "imgs/red.png";
  const pink = "imgs/pink.png";
  
  if (optionOneId == optionTwoId) {
    $(cards[optionOneId]).attr("src", red);
    $(cards[optionTwoId]).attr("src", red);
    alert("You have clicked the same image!");
  } else if (cardsChosen[0] === cardsChosen[1]) {
    $(cards[optionOneId]).attr("src", pink);
    $(cards[optionTwoId]).attr("src", pink);
    $(cards[optionOneId]).off("click", flipCards);
    $(cards[optionTwoId]).off("click", flipCards);
    cardsWon.push(cardsChosen);
  } else {
    $(cards[optionOneId]).attr("src", red);
    $(cards[optionTwoId]).attr("src", red);
  }
  cardsChosen = [];
  cardsChosenId = [];

  console.log("cardsWon: ", cardsWon);
  $(resultDisplay).text(cardsWon.length);
  if (cardsWon.length === cardArray.length / 2) {
    $(resultDisplay).hide();
    const toast = new bootstrap.Toast($("#winnerToast"));
    toast.show();
    clearInterval(timerInterval);
    const timing = $("#timer").text();
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const date = `${day}/${month}/${year}`;
    const currentTime =
      String(today.getHours()).padStart(2, "0") +
      ":" +
      String(today.getMinutes()).padStart(2, "0");

    //LocalStorage
    const playerName = sessionStorage.getItem("player");
    console.log(playerName);

    let objectGameStorage = {
      gameNameKey: "Jogo da Memória",
      jogador: playerName,
      currentDate: date,
      currentTime: currentTime,
      tempo: timing,
    };
    let objectGame = localStorage.getItem("storeObjString");
    let arrayStorage = [];
    if (objectGame !== null) {
      const storeAsArray = JSON.parse(objectGame);
      console.log(storeAsArray);
      arrayStorage = storeAsArray;
    }
    arrayStorage.push(objectGameStorage);
    const storeObjString = JSON.stringify(arrayStorage);
    localStorage.setItem("storeObjString", storeObjString);
  }
}

//virar a carta
function flipCards() {
  let cardId = $(this).attr("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);

  $(this).attr("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(matches, 500);
  }
}
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

createBoard();
