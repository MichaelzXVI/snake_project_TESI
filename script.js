const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameOverScreen = document.getElementById("gameOverScreen");
const scoreDisplay = document.getElementById("score");
const playAgainBtn = document.getElementById("playAgainBtn");

const cellSize = 20;
const grid = canvas.width / cellSize;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 10 };
let dx = 1;
let dy = 0;
let score = 0;

function drawSnake() {
  ctx.fillStyle = "blue";
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * cellSize,
      segment.y * cellSize,
      cellSize,
      cellSize
    );
  });
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    score += 10;
    scoreDisplay.textContent = score;
    spawnApple();
  } else {
    snake.pop();
  }
}

function spawnApple() {
  apple.x = Math.floor(Math.random() * grid);
  apple.y = Math.floor(Math.random() * grid);
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= grid ||
    head.y < 0 ||
    head.y >= grid ||
    snake
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(gameLoop);
  gameOverScreen.classList.remove("hidden");
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  score = 0;
  scoreDisplay.textContent = score;
  spawnApple();
  gameOverScreen.classList.add("hidden");
  gameLoop = setInterval(updateGame, 100);
}

function handleKeyPress(event) {
  const keyPressed = event.key;
  if (keyPressed === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -1;
  } else if (keyPressed === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 1;
  } else if (keyPressed === "ArrowLeft" && dx === 0) {
    dx = -1;
    dy = 0;
  } else if (keyPressed === "ArrowRight" && dx === 0) {
    dx = 1;
    dy = 0;
  }
}

document.addEventListener("keydown", handleKeyPress);
playAgainBtn.addEventListener("click", resetGame);

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawApple();
  moveSnake();
  checkCollision();
}

let gameLoop = setInterval(updateGame, 100);
