$(document).ready(function () {
    $("#popUp").hide();
    createGrid();
    createStuff()
});

function createGrid() {
    for (let row = 0; row < 6; row++) {
        const $tableRow = $('<tr>').addClass('tableRow ');
        for (let data = 0; data < 7; data++) {
            const $button = $('<button>').addClass('circles');
            const $tableData = $('<td>');
            $tableRow.append($tableData);
            $tableData.append($button);
        }
        $(".table").append($tableRow);
    }
}

function createStuff() {

    let player1 = localStorage.getItem("playersName1")

    let player2 = localStorage.getItem("playersName2")

    $("#playerOneNome").text(player1);

    $("#playerTwoNome").text(player2);

    const circle = $(".circles");

    circle.attr("disabled", false);

// timer

    let [seconds, minutes, hours] = [0, 0, 0];

    const timer = $("#timer");

    let int = null;

    $(document).ready(function () {
        if (int !== null) {
            clearInterval(int);
        }
        int = setInterval(displayTimer, 1000);
    });

    function clear() {
        clearInterval(int);
    }


    $("#playagain").click(function () {
        clearInterval(int);
        timer.text('00 : 00 : 00');
    });

    function displayTimer() {
        seconds += 1;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }

        let h = hours < 10 ? "0" + hours : hours;
        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;

        timer.text(`${h} : ${m} : ${s}`);
    }


// verde
    const player1Color = 'rgb(143,212,203)';

//roxo
    const player2Color = 'rgb(183, 173, 245)';

    function equalColor(one, two, three, four) {
        return (one === two && two === three && three === four && four !== 'rgb(255, 255, 255)' && four !== null && four !== undefined);
    }

    const rows = $(".tableRow ");

    function colorChanges(rowIndex, dataIndex, cor) {
        return rows.eq(rowIndex).find("td").eq(dataIndex).find(".circles").css("background-color", cor);
    }

    function colorStamp(rowIndex, dataIndex) {
        return rows.eq(rowIndex).find("td").eq(dataIndex).find(".circles").css("background-color");
    }


// horizontal

    function horizontal() {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                if (equalColor(colorStamp(row, col), colorStamp(row, col + 1), colorStamp(row, col + 2), colorStamp(row, col + 3))) {
                    return true;
                }
            }
        }
    }

// vertical

    function vertical() {
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 3; row++) {
                if (equalColor(colorStamp(row, col), colorStamp(row + 1, col), colorStamp(row + 2, col), colorStamp(row + 3, col))) {
                    return true;
                }
            }
        }
    }

// duas diagonais

    function diagonal() {
        for (let col = 0; col < 5; col++) {
            for (let row = 0; row < 7; row++) {
                if (equalColor(colorStamp(row, col), colorStamp(row + 1, col + 1), colorStamp(row + 2, col + 2), colorStamp(row + 3, col + 3))) {
                    return true;
                } else if (equalColor(colorStamp(row, col), colorStamp(row - 1, col + 1), colorStamp(row - 2, col + 2), colorStamp(row - 3, col + 3))) {
                    return true;
                }
            }
        }

    }

    function startAtBottom(dataIndex) {
        let colorReport = colorStamp(5, dataIndex);
        for (let row = 5; row >= 0; row--) {
            colorReport = colorStamp(row, dataIndex);
            if (colorReport === 'rgb(255, 255, 255)') {
                return row;
            }
        }
    }

    function winner(winningPlayer) {
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 7; row++) {
                $("h2").text(winningPlayer + " venceu!");
            }
        }
            {
                clear();
            }
            {
                circle.attr("disabled", true);
            }
            {
                $("h3").hide();
            }
            {
                $("#popUp").fadeIn("slow");
            }

            const today = new Date();

            const day = String(today.getDate()).padStart(2, '0');

            const month = String(today.getMonth() + 1).padStart(2, '0');

            const year = today.getFullYear();

            const date = `${day}/${month}/${year}`;

            const time = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0');

            const gameName = "Quatro em Linha";

            let objects = {
                "gameNameKey": gameName,
                "winningPlayerKey": winningPlayer,
                "timerKey": timer.text(),
                "dateKey": date,
                "timeKey": time
            }

            let getObject = localStorage.getItem("storeObjString");

            let arrayStorage = [];

            if(getObject !== null) {
                const arrayOfObjects = JSON.parse(getObject);
                arrayStorage = arrayOfObjects;
            }

            arrayStorage.push(objects)

            const storeObjString = JSON.stringify(arrayStorage);

            localStorage.setItem("storeObjString", storeObjString);
    }

    let player = 1;

    let playersName = player1;

    let color = player1Color;

    circle.on("click", function () {

        let col = $(this).closest("td").index();

        let bottomAvail = startAtBottom(col);

        colorChanges(bottomAvail, col, color);

        if (horizontal() || vertical() || diagonal()) {
            winner(playersName);
        }

        player = player * -1;

        if (player === 1) {
            playersName = player1;
            $("h3").text(playersName + ", é a tua vez!");
            color = player1Color;
        } else {
            playersName = player2;
            $("h3").text(playersName + ", é a tua vez!");
            color = player2Color;
        }
    });

}

