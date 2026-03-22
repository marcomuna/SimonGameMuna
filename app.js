let usrSeq = [];
let gameSeq = [];
let color = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;


document.addEventListener("touchstart", startHandler);
document.addEventListener("keypress", startHandler);
function startHandler() {
  if (!started) {
    started = true;
    startGame();
  }
}

function startGame() {
  console.log("Game started");
  level = 0;
  gameSeq = [];
  usrSeq = [];
  document.querySelector("h3").innerText = `Level ${level}`;
  gamePressed();
}

let btns = document.querySelectorAll(".btn");
function userPressed() {
  for (let btn of btns) {
    btn.addEventListener("click", btnPressedHandeler);
  }
}

userPressed();
function btnPressedHandeler() {
  if (!started) return;

  let btn = this;
  let id = btn.getAttribute("id");
  usrSeq.push(id);
  console.log(usrSeq);

  flashBtn(btn, id);
  check(usrSeq.length - 1);
}
function gamePressed() {
  usrSeq = [];
  level++;
  document.querySelector("h3").innerText = `Level ${level}`;
  let random = Math.floor(Math.random() * 4);
  let randColor = color[random];
  gameSeq.push(randColor);

  let randBtn = document.querySelector(`.${randColor}`);
  flashBtn(randBtn);
  console.log(gameSeq);
  new Audio("/sounds/" + randColor + ".mp3").play();
}

function flashBtn(btn, id) {
  btn.classList.add("flashBtn");
  setTimeout(() => {
    btn.classList.remove("flashBtn");
  }, 200);
}

function check(idx) {
  if (gameSeq[idx] === usrSeq[idx]) {
    if (gameSeq.length == usrSeq.length) {
      setTimeout(() => {
        gamePressed();
      }, 1000);
    }
  } else {
    document.querySelector("h3").innerHTML =
      `Game over ! Score = ${level - 1} </br>Press any key or touch the screen to start the Game.`;
    document.querySelector("body").classList.add("gameOver");
    setTimeout(() => {
      document.querySelector("body").classList.remove("gameOver");
    }, 200);
    reset();
  }
}

function reset() {
  console.log("game is over");
  new Audio("/sounds/wrong.mp3").play();
  started = false;
  gameSeq = [];
  usrSeq = [];
  level = 0;

}



function restartGame() {
  reset();        // clear everything
  started = true; // allow game to start immediately
  startGame();    // start again
}