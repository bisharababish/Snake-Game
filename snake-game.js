
// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const coinsLeftElement = document.getElementById('coinsLeft');
const startBtn = document.getElementById('startBtn');

const gridSize = 20;
const initialSnakeLength = 3;
const coinsPerLevel = 5;

let snake = [];
let direction = 'right';
let nextDirection = 'right';
let coin = { x: 0, y: 0 };
let score = 0;
let level = 1;
let coinsLeft = coinsPerLevel;
let gameSpeed = 150;
let gameInterval;
let gameRunning = false;

// Initialize game
function initGame() {
    // Reset variables
    snake = [];
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    level = 1;
    coinsLeft = coinsPerLevel;
    gameSpeed = 150;

    // Create initial snake
    for (let i = 0; i < initialSnakeLength; i++) {
        snake.push({
            x: Math.floor(canvas.width / (2 * gridSize)) * gridSize - i * gridSize,
            y: Math.floor(canvas.height / (2 * gridSize)) * gridSize
        });
    }

    // Place first coin
    placeCoin();

    // Update display
    updateScore();

    // Start game loop
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);
    gameRunning = true;

    // Hide start button
    startBtn.style.display = 'none';
}

// Place a new coin on the board
function placeCoin() {
    // Generate random position for coin
    let coinPlaced = false;

    while (!coinPlaced) {
        coin = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };

        // Check if coin is on snake
        let onSnake = false;
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === coin.x && snake[i].y === coin.y) {
                onSnake = true;
                break;
            }
        }

        if (!onSnake) {
            coinPlaced = true;
        }
    }
}

// Update score display
function updateScore() {
    scoreElement.textContent = score;
    levelElement.textContent = level;
    coinsLeftElement.textContent = coinsLeft;
}

// Main game loop
function gameLoop() {
    // Update snake position
    const head = { x: snake[0].x, y: snake[0].y };

    // Apply direction
    direction = nextDirection;

    switch (direction) {
        case 'up':
            head.y -= gridSize;
            break;
        case 'down':
            head.y += gridSize;
            break;
        case 'left':
            head.x -= gridSize;
            break;
        case 'right':
            head.x += gridSize;
            break;
    }

    // Check for wall collision (wrap around)
    if (head.x < 0) head.x = canvas.width - gridSize;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - gridSize;
    if (head.y >= canvas.height) head.y = 0;

    // Check for self collision
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver();
            return;
        }
    }

    // Add new head
    snake.unshift(head);

    // Check for coin collision
    if (head.x === coin.x && head.y === coin.y) {
        // Increase score
        score += 10;
        coinsLeft--;

        // Check if level complete
        if (coinsLeft === 0) {
            levelUp();
        } else {
            // Place new coin
            placeCoin();
        }

        // Update score display
        updateScore();
    } else {
        // Remove tail if no coin was eaten
        snake.pop();
    }

    // Draw everything
    draw();
}

// Level up
function levelUp() {
    level++;
    coinsLeft = coinsPerLevel;
    gameSpeed = Math.max(50, gameSpeed - 10);

    // Update interval
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);

    // Place new coin
    placeCoin();
}

// Game over
function gameOver() {
    clearInterval(gameInterval);
    gameRunning = false;

    // Draw game over screen
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText(`Level: ${level}`, canvas.width / 2, canvas.height / 2 + 50);

    // Show start button
    startBtn.style.display = 'block';
}

// Draw game state
function draw() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        // Head is a different color
        if (i === 0) {
            ctx.fillStyle = '#00ff00'; // Bright green for head
        } else {
            // Create gradient from green to darker green
            const greenValue = Math.max(100, 255 - (i * 10));
            ctx.fillStyle = `rgb(0, ${greenValue}, 0)`;
        }

        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);

        // Draw snake segment border
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }

    // Draw coin
    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.arc(coin.x + gridSize / 2, coin.y + gridSize / 2, gridSize / 2, 0, 2 * Math.PI);
    ctx.fill();

    // Shine effect on coin
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(coin.x + gridSize / 3, coin.y + gridSize / 3, gridSize / 6, 0, 2 * Math.PI);
    ctx.fill();
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    if (!gameRunning) return;

    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') nextDirection = 'right';
            break;
    }
});

// Start button event
startBtn.addEventListener('click', initGame);

// Initial screen
draw();
// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('snakeDarkMode', isDarkMode);
});

// Check for saved preference on load
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('snakeDarkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});