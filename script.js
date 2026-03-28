let usrSeq = [];
let gameSeq = [];
let color = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;


document.addEventListener("touchstart",startHandler);
document.addEventListener("keypress", startHandler);
function startHandler() {
  if (!started) {
    started = true;
    startGame();
  }
}

function startGame() {
  navigator.vibrate(50);
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

  navigator.vibrate(50);
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
  navigator.vibrate(100);
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
  navigator.vibrate([300,100,300]);
  console.log("game is over");
  new Audio("/sounds/wrong.mp3").play();
  started = false;
  gameSeq = [];
  usrSeq = [];
  level = 0;

}



function restartGame() {
  navigator.vibrate(50)
  reset();        // clear everything
  started = true; // allow game to start immediately
  startGame();    // start again
}


if ("serviceWorker" in navigator) {
  window.addEventListener("load",()=>{
    navigator.serviceWorker
    .register("/service-worker.js")
    .then(()=> console.log("Service Worker Registered"))
    .catch((e)=> console.log("Sw Error : ",e));
  });
}