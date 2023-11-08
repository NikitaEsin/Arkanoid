const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let score = 0;

const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let col = 0; col < brickColumnCount; col++) {
  bricks[col] = [];
  for (let row = 0; row < brickRowCount; row++) {
    bricks[col][row] = { x: 0, y: 0, status: 1, color: getRandomColor()};
  }
}

function getRandomColor() {
  const colors = ["blue", "red", "green"];
  return colors[Math.floor(Math.random() * colors.length)];
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function drawBall() {
  c.beginPath();
  c.arc(x, y, ballRadius, 0, Math.PI * 2);
  c.fillStyle = "gray";
  c.fill();
  c.closePath();
}

function drawPaddle() {
  c.beginPath();
  c.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  c.fillStyle = "black";
  c.fill();
  c.closePath();
}

function drawBricks() {
  for (let col = 0; col < brickColumnCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      if (bricks[col][row].status === 1) {
        const brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[col][row].x = brickX;
        bricks[col][row].y = brickY;
        c.beginPath();
        c.rect(brickX, brickY, brickWidth, brickHeight);
        c.fillStyle = bricks[col][row].color;
        c.fill();
        c.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let col = 0; col < brickColumnCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      const b = bricks[col][row];
      if (
        b.status === 1 &&
        x > b.x &&
        x < b.x + brickWidth &&
        y > b.y &&
        y < b.y + brickHeight
      ) {
        dy = -dy;
        b.status = 0;
        score += getScoreByColor(b.color);
        document.getElementById("score").innerText = score;
      }
    }
  }
}

function getScoreByColor(color) {
  switch (color) {
    case "blue": return 1;
    case "red": return 2;
    case "green": return 3;
    default: return 0;
  }
}

function showLosePopup() {
  const losePopup = document.getElementById("losePopup");
  losePopup.style.display = "flex";
  document.getElementById("finalScore").innerText = score;
}

function showWinPopup() {
  const winPopup = document.getElementById("winPopup");
  winPopup.style.display = "flex";
  document.getElementById("finalScoreWin").innerText = score;
}

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  }

  if (
    y + dy > canvas.height - ballRadius - paddleHeight &&
    x > paddleX &&
    x < paddleX + paddleWidth
  ) {
    dy = -dy;
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  let bricksLeft = 0;
  for (let col = 0; col < brickColumnCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      if (bricks[col][row].status === 1) {
        bricksLeft++;
      }
    }
  }

  if (bricksLeft === 0) {
    // All bricks are destroyed - Player Wins
    showWinPopup();
    clearInterval(gameInterval);
  }

  if (y + dy > canvas.height - ballRadius) {
    showLosePopup();
    clearInterval(gameInterval);
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

// Function to start the game
function startGame() {
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;
    showLeaderboard(); // Display leaderboard even if there are no scores
    gameInterval = setInterval(draw, 10);
  }

  // Function to start the game again
  function startAgain() {
    // Reset ball and paddle position
    x = canvas.width / 2;
    y = canvas.height - 30;
    paddleX = (canvas.width - paddleWidth) / 2;

    // Reset ball speed and direction
    dx = 2;
    dy = -2;

    // Reset brick statuses
    for (let col = 0; col < brickColumnCount; col++) {
      for (let row = 0; row < brickRowCount; row++) {
        bricks[col][row].status = 1;
      }
    }

    // Hide popups
    document.getElementById("losePopup").style.display = "none";
    document.getElementById("winPopup").style.display = "none";

  // Restart the game loop
  startGame();
}

draw();