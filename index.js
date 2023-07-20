import "./styles.css";

//
const topRod = document.getElementById("topRod");
const bottomRod = document.getElementById("bottomRod");
const ball = document.getElementById("ball");
// const game = document.querySelector(".game");

let ballX = 190;
let ballY = 90;
let ballSpeedX = 2;
let ballSpeedY = 2;

const rodSpeed = 4;
const rodWidth = 100;

let topRodX = 150;
let bottomRodX = 150;
let score = 0;

function updateRod(rod, x) {
  rod.style.left = x + "px";
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= 190) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX <= 0 || ballX >= 390) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX <= topRodX + rodWidth && ballX + 10 >= topRodX && ballY <= 20) {
    ballSpeedY = -ballSpeedY;
    score++;
    // alert('Score: ' + score);
  }

  if (
    ballX <= bottomRodX + rodWidth &&
    ballX + 10 >= bottomRodX &&
    ballY >= 170
  ) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY < 0 || ballY > 190) {
    ballX = 190;
    ballY = 90;
    ballSpeedX = 2;
    ballSpeedY = 2;
    topRodX = 150;
    bottomRodX = 150;
    alert("Round over!");
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

document.addEventListener("keydown", function (event) {
  if (event.key === "a" && topRodX > 0) {
    topRodX -= rodSpeed;
    bottomRodX -= rodSpeed;
    updateRod(topRod, topRodX);
    updateRod(bottomRod, bottomRodX);
  } else if (event.key === "d" && topRodX < 300) {
    topRodX += rodSpeed;
    bottomRodX += rodSpeed;
    updateRod(topRod, topRodX);
    updateRod(bottomRod, bottomRodX);
  } else if (event.key === "Enter") {
    if (ballY >= 170 && ballY <= 190) {
      // Attach the ball to the center of the bottom rod
      ballX = bottomRodX + rodWidth / 2 - 5;
      ballY = 170;
      ballSpeedX = 0;
      ballSpeedY = 0;

      if (score > 0) {
        alert("Your Score: " + score);
      } else {
        alert("Round starts now!");
      }
    }
  }
});

function gameLoop() {
  moveBall();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
