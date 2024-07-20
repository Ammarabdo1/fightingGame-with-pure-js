class Player {
  constructor(name, power) {
    this.name = name;
    this.power = power;
  }
  Attack(damage) {
    return (this.power -= damage);
  }
  Heal(amount) {
    return (this.power += amount);
  }
}

const leftVideo = document.getElementById("leftVideo");
const rightVideo = document.getElementById("rightVideo");
const inputPlayer1 = document.getElementById("inputPlayer1");
const inputPlayer2 = document.getElementById("inputPlayer2");
const name1 = document.getElementById("name1");
const power1 = document.getElementById("power1");
const name2 = document.getElementById("name2");
const power2 = document.getElementById("power2");

const player1hit = document.getElementById("player1hit");
const player1heal = document.getElementById("player1heal");
const player2hit = document.getElementById("player2hit");
const player2heal = document.getElementById("player2heal");
const victory = document.getElementById("victory");
const error = document.getElementById("error");
const overlayWin = document.querySelector(".overlayWin");
const winner = document.getElementById("winner");

let player1;
inputPlayer1.addEventListener("keyup", () => {
  player1 = new Player(inputPlayer1.value, 100);
  name1.innerText = `${player1.name}👱‍♂️`;
  power1.innerText = `⚡${player1.power}`;
  if(inputPlayer1.value == '' ){
    name1.innerText = `Player 1`;
    power1.innerText = `---`;
  }
});
let player2;
inputPlayer2.addEventListener("keyup", () => {
  player2 = new Player(inputPlayer2.value, 100);
  name2.innerText = `${player2.name}🧑`;
  power2.innerText = `⚡${player2.power}`;
  if(inputPlayer2.value == '' ){
    name2.innerText = `Player 2`;
    power2.innerText = `---`;
  }
});

let randomDamage;
let randomHeal;

document.addEventListener("keyup", (e) => {
  if (player1.name != undefined && player2.name != undefined) {
    if (player1.power > 0 && player2.power > 0) {
      randomDamage = Math.floor(Math.random() * 8) + 5;
      randomHeal = Math.floor(Math.random() * 5) + 2;
      if (e.key == "q") {
        leftVideo.src = "videos/hit.mp4";
        leftVideo.playbackRate = 10;
        setTimeout(() => {
          leftVideo.src = "videos/Stay.mp4";
          leftVideo.playbackRate = 2;
        }, 500);
        player1hit.play();
        if (player2.power > 11) {
          power2.innerText = `⚡${player2.Attack(randomDamage)}`;
        } else power2.innerText = `⚡${player2.Attack(player2.power)}`;
      } else if (e.key == "a") {
        if (player1.power < 89) {
          power1.innerText = `⚡${player1.Heal(randomHeal)}`;
          player1heal.play();
        } else if (player1.power >= 89 && player1.power < 100) {
          player1.power = 100;
          power1.innerText = `⚡${player1.power}`;
          player1heal.play();
        } else if (player1.power == 100) {
          error.play();
        }
      } else if (e.key == "p") {
        rightVideo.src = "videos/hit.mp4";
        rightVideo.playbackRate = 10;
        setTimeout(() => {
          rightVideo.src = "videos/Stay.mp4";
          rightVideo.playbackRate = 2;
        }, 500);
        player2hit.play();
        if (player1.power > 11) {
          power1.innerText = `⚡${player1.Attack(randomDamage)}`;
        } else power1.innerText = `⚡${player1.Attack(player1.power)}`;
      } else if (e.key == "l") {
        if (player2.power < 89) {
          power2.innerText = `⚡${player2.Heal(randomHeal)}`;
          player2heal.play();
        } else if (player2.power >= 89 && player2.power < 100) {
          player2.power = 100;
          power2.innerText = `⚡${player2.power}`;
          player2heal.play();
        } else if (player2.power == 100) {
          error.play();
          console.log('full power')
        }
      } else {
        console.log("Error! Enter a valid letter");
      }
      if (player1.power <= 0) {
        leftVideo.src = "videos/death.mp4";
        leftVideo.removeAttribute("loop");
        victory.play();
        name1.innerText = `${player1.name}😓`;
        name2.innerText = `${player2.name}💪`;
        winner.innerText = `${player2.name} is win 🏆`;
        setTimeout(() => {
          overlayWin.style.display = "block";
        }, 1350);
      } else if (player2.power <= 0) {
        rightVideo.src = "videos/death.mp4";
        rightVideo.removeAttribute("loop");
        victory.play();
        name1.innerText = `${player1.name}💪`;
        name2.innerText = `${player2.name}😓`;
        winner.innerText = `${player1.name} is win 🏆`;
        setTimeout(() => {
          overlayWin.style.display = "block";
        }, 1350);
      }
    }
  }
});

function Again() {
  player1.power = 100;
  player2.power = 100;
  power1.innerText = player1.power;
  power2.innerText = player2.power;
  rightVideo.src = "videos/Stay.mp4";
  leftVideo.src = "videos/Stay.mp4";
  overlayWin.style.display = "none";
}

function reload() {
  location.reload();
}

// window.onload = function(){
//     leftVideo.src = "videos/Stay.mp4";
//     leftVideo.playbackRate = 2;
// }

// document.addEventListener('DOMContentLoaded', function() {
//     leftVideo.src = "videos/Stay.mp4";
//     leftVideo.playbackRate = 2;
//     console.log('run')
// });
