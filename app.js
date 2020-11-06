let frontEndBoard = document.getElementById("board");
let count = 1;
let message = document.getElementById("message");
let button = document.querySelector("#restart-btn");
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var sq = null;
modal.style.display = "block";

btn.onclick = function (event) {};

let submitForm = document.getElementById("submit-form");
submitForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();

    let playerX = document.getElementById("playerX").value;
    let playerO = document.getElementById("playerO").value;

    if (playerX == "" || playerO == "") {
      alert("Player name are compulsory fields!!!");
      return;
    }
    let mode = document.getElementById("factor-mode").value;
    if (mode < 3) {
      alert("Please key at least 3");
      return;
    }
    genFrontEnd(parseInt(mode));
    sq = document.querySelectorAll(".col");
    modal.style.display = "none";
    message.innerText = playerO + "'s turn, please input 'O'";
    init();
  },
  { once: true }
);

function genBoard(num) {
  let arrayBoard = [];
  for (let i = 0; i < num * num; i++) {
    arrayBoard.push("");
  }
  return arrayBoard;
}

var getNum = 0;
var arrayBoard = [];
function genFrontEnd(num) {
  getNum = num;
  arrayBoard = genBoard(getNum);
  con = genCondition(num);
  for (let i = 0; i < num * num; i = i + num) {
    let div = document.createElement("div");
    for (let j = 0; j < num; j++) {
      let innerDiv = document.createElement("div");
      innerDiv.setAttribute("class", "col");
      innerDiv.setAttribute("id", i + j);
      innerDiv.style.maxWidth = 750 / num + "px";
      innerDiv.style.height = 750 / num + "px";

      div.appendChild(innerDiv);
    }
    div.setAttribute("class", "row justify-content-center");
    frontEndBoard.appendChild(div);
  }
}

//Winning Conditions
let con = [];

function genCondition(num) {
  let condition = [];
  let rowCon = []; //row condition
  let rowCon2 = []; //row condition
  let rowCon3 = []; //row condition
  let colCon = []; // col condition
  let colCon2 = []; // col condition
  let colCon3 = []; // col condition
  let upCon = []; // / condition
  let downCon = []; // \ condition
  let incBase = 2;
  let downBase = 0;
  for (let i = 0; i < 3; i++) {
    rowCon.push(i);
    rowCon2.push(i + num);
    rowCon3.push(i + num * 2);
    colCon.push(num * i);
    colCon2.push(num * i + 1);
    colCon3.push(num * i + 2);
    upCon.push(incBase);
    incBase = incBase + num - 1;
    downCon.push(downBase);
    downBase = downBase + num + 1;
  }
  condition.push(
    rowCon,
    rowCon2,
    rowCon3,
    colCon,
    colCon2,
    colCon3,
    upCon,
    downCon
  );
  return condition;
}

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
    currentEL.innerHTML = `<h6>X</h6>`;
    message.innerText = playerO.value + "'s turn, please input 'O'";
    arrayBoard[currentEL.id] = "X";
  } else if (count % 2 === 1) {
    currentEL.innerHTML = `<h6>O</h6>`;
    message.innerText = playerX.value + "'s turn, please input 'X'";
    arrayBoard[currentEL.id] = "O";
  }

  count++;
}

function win() {
  let winner = null;
  // will take 8 condition loop entire board to check win
  for (let l = 0; l < getNum * getNum - getNum * 2; l = l + getNum) {
    let k = 0;
    while (k < getNum - 2) {
      for (let i = 0; i < con.length; i++) {
        let position = [];
        let keyArray = [];
        for (let j = 0; j < 3; j++) {
          position.push(con[i][j] + k + l);
          keyArray.push(arrayBoard[position[j]]);
        }
        const check = (element) => element == null || element == "";
        if (
          !keyArray.some(check) &&
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
      k++;
    }
  }

  if (winner) {
    button.style.display = "initial";
    return (message.innerText =
      (winner === "x" ? playerX.value : playerO.value) + " win the game!");
  } else if (arrayBoard.includes("")) {
    return null;
  } else {
    button.style.display = "initial";
    return (message.innerText = "Tie Game");
  }
}

// Restart the game
function restart() {
  document.querySelectorAll(".col").forEach((item) => {
    item.innerText = "";
    item.style.background = "";
  });
  message.innerText = "Next round";
  arrayBoard = genBoard(getNum);
  count = 1;
  button.style.display = "none";
  init();
}

button.addEventListener("click", restart);
