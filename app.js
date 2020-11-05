let sq = document.querySelectorAll(".col");
let count = 1;
let message = document.getElementById("message");
let button = document.querySelector("#restart-btn");
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");

modal.style.display = "block";

btn.onclick = function (event) {};

let submitForm = document.getElementById("submit-form");
submitForm.addEventListener(
    "submit",
    (e) => {
        e.preventDefault();

        let playerX = document.getElementById("playerX").value;
        let playerO = document.getElementById("playerO").value;

        console.log(playerO);
        if (playerX == "" || playerO == "") {
            alert("Player name are compulsory fields!!!");
            return;
        }
        modal.style.display = "none";
        message.innerText = playerO + "'s turn, please input 'O'";
    },
    { once: true }
);

let board = ["", "", "", "", "", "", "", "", ""];

//Winning Conditions
const con = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function init() {
    for (let i = 0; i < sq.length; i++) {
        sq[i].addEventListener("click", drawBoard);
    }
}

function drawBoard(event) {
    let currentEL = event.target;

    if (win()) {
        alert("Game Over! Press the restart button!");
        message.innerText = "Please press restart button";
        button.style.display = "initial";
        return;
    }

    if (!checkValidMove(currentEL)) {
        alert("Error, this space is occupied");
        return;
    }

    draw(currentEL);
    win();
}

function checkValidMove(event) {
    if (event.innerText === "") {
        return true;
    } else {
        return false;
    }
}

function draw(currentEL) {
    if (count % 2 === 0) {
        currentEL.innerHTML = `<p>X</p>`;
        message.innerText = playerO.value + "'s turn, please input 'O'";
        board[currentEL.id] = "X";
    } else if (count % 2 === 1) {
        currentEL.innerHTML = `<p>O</p>`;
        message.innerText = playerX.value + "'s turn, please input 'X'";
        board[currentEL.id] = "O";
    }
    count++;
}

function win() {
    let winner = null;

    for (let i = 0; i < con.length; i++) {
        // let num1 = con[i][0];
        // let num2 = con[i][1];
        // let num3 = con[i][2];
        // let a = board[num1];
        // let b = board[num2];
        // let c = board[num3];
        let position = [];
        let keyArray = [];
        for (let j = 0; j < 3; j++) {
            position.push(con[i][j]);
            keyArray.push(board[position[j]]);
        }

        if (
            keyArray[0] !== "" &&
            keyArray[0] === keyArray[1] &&
            keyArray[1] === keyArray[2] &&
            keyArray[0] === keyArray[2]
        ) {
            document.getElementById(position[0]).style.background = "yellow";
            document.getElementById(position[1]).style.background = "yellow";
            document.getElementById(position[2]).style.background = "yellow";
            winner = keyArray[0];
        }
    }

    if (winner) {
        return (message.innerText =
            (winner === "x" ? playerX.value : playerO.value) +
            " win the game!");
    } else if (board.includes("")) {
        return null;
    } else {
        return (message.innerText = "Tie Game");
    }
}

init();

// Restart the game
function restart() {
    document.querySelectorAll(".col").forEach((item) => {
        item.innerText = "";
        item.style.background = "";
    });
    message.innerText = "Next round";
    board = ["", "", "", "", "", "", "", "", ""];
    count = 1;
    button.style.display = "none";
    init();
}

button.addEventListener("click", restart);
