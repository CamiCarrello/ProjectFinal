const playersName1 = $(".playersName1")
const playersName2 = $(".playersName2")

$(".loginButton").on("click", function () {
    event.preventDefault();
    localStorage.setItem("playersName1", playersName1.val());
    localStorage.setItem("playersName2", playersName2.val());
    location.href = 'ConnectFour.html';
});
