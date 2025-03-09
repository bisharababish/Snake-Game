const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const coinsLeftElement = document.getElementById('coinsLeft');
const startBtn = document.getElementById('startBtn');
const highScoreElement = document.getElementById('highScore');

const gridSize = 20;
const initialSnakeLength = 3;
const coinsPerLevel = 5;

let snake = [];
let direction = 'right';
let nextDirection = 'right';
let coin = { x: 0, y: 0 };
let specialCoin = { x: -1, y: -1, active: false, timer: 0 };
let score = 0;
let level = 1;
let coinsLeft = coinsPerLevel;
let gameSpeed = 150;
let gameInterval;
let animationFrame;
let gameRunning = false;
let particles = [];
let lastFrameTime = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let powerUp = { active: false, type: null, x: -1, y: -1, duration: 0 };

const sounds = {
    eat: new Audio('https://assets.mixkit.co/active_storage/sfx/2253/2253-preview.mp3'),
    levelUp: new Audio('https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3'),
    gameOver: new Audio('https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3'),
    powerUp: new Audio('https://assets.mixkit.co/active_storage/sfx/2041/2041-preview.mp3')
};

Object.values(sounds).forEach(sound => {
    sound.volume = 0.3;
});


function initGame() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }

    snake = [];
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    level = 1;
    coinsLeft = coinsPerLevel;
    isPaused = false;
    const difficulty = difficultySelect.value;
    switch (difficulty) {
        case 'easy':
            gameSpeed = 170;
            break;
        case 'normal':
            gameSpeed = 150;
            break;
        case 'hard':
            gameSpeed = 130;
            break;
    }

    particles = [];
    specialCoin = { x: -1, y: -1, active: false, timer: 0 };
    powerUp = { active: false, type: null, x: -1, y: -1, duration: 0 };

    for (let i = 0; i < initialSnakeLength; i++) {
        snake.push({
            x: Math.floor(canvas.width / (2 * gridSize)) * gridSize - i * gridSize,
            y: Math.floor(canvas.height / (2 * gridSize)) * gridSize
        });
    }

    placeCoin();

    updateScore();

    draw();

    gameRunning = true;

    lastFrameTime = performance.now();
    animationFrame = requestAnimationFrame(animateGame);

    startBtn.style.display = 'none';
}

function placeCoin() {
    let coinPlaced = false;

    while (!coinPlaced) {
        coin = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };

        let onObject = false;
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === coin.x && snake[i].y === coin.y) {
                onObject = true;
                break;
            }
        }

        if (specialCoin.active && coin.x === specialCoin.x && coin.y === specialCoin.y) {
            onObject = true;
        }

        if (powerUp.active && coin.x === powerUp.x && coin.y === powerUp.y) {
            onObject = true;
        }

        if (!onObject) {
            coinPlaced = true;
        }
    }
}

function placeSpecialCoin() {
    if (specialCoin.active) return;

    if (Math.random() < 0.333) {
        specialCoin.active = true;
        specialCoin.timer = 150;

        let coinPlaced = false;
        while (!coinPlaced) {
            specialCoin.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
            specialCoin.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

            let onObject = false;
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === specialCoin.x && snake[i].y === specialCoin.y) {
                    onObject = true;
                    break;
                }
            }

            if (coin.x === specialCoin.x && coin.y === specialCoin.y) {
                onObject = true;
            }

            if (powerUp.active && specialCoin.x === powerUp.x && specialCoin.y === powerUp.y) {
                onObject = true;
            }

            if (!onObject) {
                coinPlaced = true;
            }
        }
    }
}

function placePowerUp() {
    if (powerUp.active || level < 2) return;

    if (Math.random() < 0.2) {
        powerUp.active = true;
        powerUp.duration = 0;

        const types = ['speed', 'slowdown', 'shield'];
        powerUp.type = types[Math.floor(Math.random() * types.length)];

        let powerUpPlaced = false;
        while (!powerUpPlaced) {
            powerUp.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
            powerUp.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

            let onObject = false;
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === powerUp.x && snake[i].y === powerUp.y) {
                    onObject = true;
                    break;
                }
            }

            if (coin.x === powerUp.x && coin.y === powerUp.y) {
                onObject = true;
            }

            if (specialCoin.active && powerUp.x === specialCoin.x && powerUp.y === specialCoin.y) {
                onObject = true;
            }

            if (!onObject) {
                powerUpPlaced = true;
            }
        }
    }
}

let scoreUpdateCounter = 0;
function updateScore() {
    scoreUpdateCounter++;
    if (scoreUpdateCounter % 3 !== 0 && gameRunning) return;

    scoreElement.textContent = score;
    levelElement.textContent = level;
    coinsLeftElement.textContent = coinsLeft;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
}
function createParticles(x, y, color, count = 15) {
    const isLowPerformance = window.performance &&
        window.performance.now &&
        performance.now() - lastFrameTime > 20;

    const actualCount = isLowPerformance ? Math.floor(count / 3) : count;

    if (particles.length > 100) {
        count = Math.min(5, count);
    }

    for (let i = 0; i < actualCount; i++) {
        particles.push({
            x: x + gridSize / 2,
            y: y + gridSize / 2,
            size: Math.random() * 3 + 2,
            color: color,
            vx: Math.random() * 6 - 3,
            vy: Math.random() * 6 - 3,
            life: Math.random() * 30 + 10
        });
    }
}

function updateParticles() {
    if (window.performance && performance.now() - lastFrameTime > 30) {
        particles = particles.filter(p => p.life > 0);
        return;
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        particles[i].life--;

        particles[i].vy += 0.05;
        particles[i].vx *= 0.99;
        particles[i].vy *= 0.99;

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
}


function animateGame(timestamp = 0) {
    if (!gameRunning || isPaused) return;

    animationFrame = requestAnimationFrame(animateGame);

    const deltaTime = timestamp - lastFrameTime;

    const FRAME_STEP = gameSpeed;

    if (deltaTime >= FRAME_STEP) {
        const updateSteps = Math.min(Math.floor(deltaTime / FRAME_STEP), 3);

        for (let i = 0; i < updateSteps; i++) {
            updateGame();
        }

        lastFrameTime = timestamp - (deltaTime % FRAME_STEP);
    }

    draw();
}
function updateGame() {
    if (isPaused) return;

    const head = { x: snake[0].x, y: snake[0].y };

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

    if (head.x < 0) head.x = canvas.width - gridSize;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - gridSize;
    if (head.y >= canvas.height) head.y = 0;

    if (!powerUp.active || powerUp.type !== 'shield') {
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                gameOver();
                return;
            }
        }
    }

    snake.unshift(head);

    let coinEaten = false;
    if (head.x === coin.x && head.y === coin.y) {
        score += 10;
        coinsLeft--;
        coinEaten = true;

        if (!isMuted) sounds.eat.play().catch(e => console.log('Sound play failed:', e));

        createParticles(coin.x, coin.y, 'gold');

        if (coinsLeft === 0) {
            levelUp();
        } else {
            placeCoin();

            placeSpecialCoin();

            placePowerUp();
        }
    }

    if (specialCoin.active && head.x === specialCoin.x && head.y === specialCoin.y) {
        score += 50;
        specialCoin.active = false;
        coinEaten = true;

        if (!isMuted) sounds.eat.play().catch(e => console.log('Sound play failed:', e));

        createParticles(specialCoin.x, specialCoin.y, 'magenta', 25);
    }

    if (powerUp.active && head.x === powerUp.x && head.y === powerUp.y) {
        powerUp.active = true;
        powerUp.duration = 300;

        if (!isMuted) sounds.powerUp.play().catch(e => console.log('Sound play failed:', e));

        if (powerUp.type === 'speed') {
            gameSpeed = Math.max(30, gameSpeed - 50);
        } else if (powerUp.type === 'slowdown') {
            gameSpeed = gameSpeed + 50;
        }

        let color = powerUp.type === 'speed' ? 'cyan' :
            (powerUp.type === 'slowdown' ? 'orange' : 'teal');
        createParticles(powerUp.x, powerUp.y, color, 20);

        powerUp.x = -1;
        powerUp.y = -1;
    }

    if (!coinEaten) {
        snake.pop();
    }

    if (specialCoin.active) {
        specialCoin.timer--;
        if (specialCoin.timer <= 0) {
            specialCoin.active = false;
        }
    }

    if (powerUp.duration > 0) {
        powerUp.duration--;

        if (powerUp.duration <= 0) {
            if (powerUp.type === 'speed' || powerUp.type === 'slowdown') {
                gameSpeed = Math.max(50, 150 - ((level - 1) * 10));
            }
            powerUp.active = false;
            powerUp.type = null;
        }
    }

    updateParticles();

    updateScore();
}


function levelUp() {
    level++;
    coinsLeft = coinsPerLevel;
    gameSpeed = Math.max(50, gameSpeed - 10);
    sounds.levelUp.play();

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const colors = ['gold', 'green', 'cyan', 'magenta'];
        createParticles(x, y, colors[Math.floor(Math.random() * colors.length)], 1);
    }

    placeCoin();

    if (level > 2) {
        placeSpecialCoin();
    }

    if (level > 3) {
        placePowerUp();
    }
}

function gameOver() {
    cancelAnimationFrame(animationFrame);
    gameRunning = false;
    sounds.gameOver.play();

    createParticles(snake[0].x, snake[0].y, 'red', 30);

    let fadeIn = 0;
    const fadeInterval = setInterval(() => {
        fadeIn += 0.05;
        if (fadeIn >= 0.75) {
            clearInterval(fadeInterval);
        }

        ctx.fillStyle = `rgba(0, 0, 0, ${fadeIn})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawSnake();

        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 40);

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`Level: ${level}`, canvas.width / 2, canvas.height / 2 + 30);

        if (score >= highScore) {
            ctx.fillStyle = 'gold';
            ctx.fillText(`New High Score!`, canvas.width / 2, canvas.height / 2 + 60);
        } else {
            ctx.fillStyle = 'silver';
            ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 60);
        }

        updateParticles();
        drawParticles();
    }, 50);

    startBtn.style.display = 'block';
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        let greenValue = Math.max(100, 255 - (i * 5));

        if (powerUp.active && powerUp.type === 'shield') {
            const pulseIntensity = Math.sin(Date.now() * 0.01) * 30 + 170;
            ctx.fillStyle = i === 0 ?
                `rgb(100, ${greenValue}, 255)` :
                `rgb(50, ${greenValue - 50}, ${pulseIntensity})`;
        } else if (powerUp.active && powerUp.type === 'speed') {
            ctx.fillStyle = i === 0 ?
                `rgb(0, ${greenValue}, 255)` :
                `rgb(0, ${greenValue}, ${Math.max(150, 220 - i * 15)})`;
        } else if (powerUp.active && powerUp.type === 'slowdown') {
            ctx.fillStyle = i === 0 ?
                `rgb(${greenValue}, ${greenValue}, 0)` :
                `rgb(${Math.max(100, greenValue - 50)}, ${greenValue - 100}, 0)`;
        } else {
            ctx.fillStyle = i === 0 ?
                `rgb(50, 255, 50)` :
                `rgb(0, ${greenValue}, 0)`;
        }

        roundRect(
            ctx,
            snake[i].x,
            snake[i].y,
            gridSize,
            gridSize,
            i === 0 ? 8 : 4,
            true,
            false
        );

        if (i === 0) {
            ctx.fillStyle = 'white';

            let eyePositions = [];
            if (direction === 'right') {
                eyePositions = [
                    { x: snake[i].x + gridSize - 6, y: snake[i].y + 5 },
                    { x: snake[i].x + gridSize - 6, y: snake[i].y + gridSize - 8 }
                ];
            } else if (direction === 'left') {
                eyePositions = [
                    { x: snake[i].x + 5, y: snake[i].y + 5 },
                    { x: snake[i].x + 5, y: snake[i].y + gridSize - 8 }
                ];
            } else if (direction === 'up') {
                eyePositions = [
                    { x: snake[i].x + 5, y: snake[i].y + 5 },
                    { x: snake[i].x + gridSize - 8, y: snake[i].y + 5 }
                ];
            } else if (direction === 'down') {
                eyePositions = [
                    { x: snake[i].x + 5, y: snake[i].y + gridSize - 8 },
                    { x: snake[i].x + gridSize - 8, y: snake[i].y + gridSize - 8 }
                ];
            }

            ctx.beginPath();
            ctx.arc(eyePositions[0].x, eyePositions[0].y, 2, 0, 2 * Math.PI);
            ctx.arc(eyePositions[1].x, eyePositions[1].y, 2, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(eyePositions[0].x, eyePositions[0].y, 1, 0, 2 * Math.PI);
            ctx.arc(eyePositions[1].x, eyePositions[1].y, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

function drawCoin() {
    const pulse = Math.sin(Date.now() * 0.01) * 0.2 + 0.8;
    const coinSize = gridSize * pulse;

    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.arc(
        coin.x + gridSize / 2,
        coin.y + gridSize / 2,
        coinSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(
        coin.x + gridSize / 3,
        coin.y + gridSize / 3,
        coinSize / 6,
        0,
        2 * Math.PI
    );
    ctx.fill();
}

function drawSpecialCoin() {
    if (!specialCoin.active) return;

    const pulse = Math.sin(Date.now() * 0.02) * 0.3 + 1.0;
    const coinSize = gridSize * pulse;

    let coinColor = 'magenta';
    if (specialCoin.timer < 50 && Math.sin(Date.now() * 0.1) > 0) {
        coinColor = 'white';
    }

    ctx.fillStyle = coinColor;
    ctx.beginPath();
    ctx.arc(
        specialCoin.x + gridSize / 2,
        specialCoin.y + gridSize / 2,
        coinSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();

    ctx.fillStyle = 'yellow';
    drawStar(
        specialCoin.x + gridSize / 2,
        specialCoin.y + gridSize / 2,
        5,
        coinSize / 4,
        coinSize / 8
    );
}

function drawPowerUp() {
    if (!powerUp.active || powerUp.x < 0 || powerUp.y < 0) return;

    let powerUpColor = powerUp.type === 'speed' ? 'cyan' :
        (powerUp.type === 'slowdown' ? 'orange' : 'teal');

    const pulse = Math.sin(Date.now() * 0.015) * 0.2 + 0.9;
    const powerUpSize = gridSize * pulse;

    ctx.fillStyle = powerUpColor;
    ctx.beginPath();

    if (powerUp.type === 'speed') {
        drawLightning(powerUp.x, powerUp.y);
    } else if (powerUp.type === 'slowdown') {
        drawClock(powerUp.x, powerUp.y);
    } else if (powerUp.type === 'shield') {
        drawShield(powerUp.x, powerUp.y);
    }
}

function drawLightning(x, y) {
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.moveTo(x + 8, y);
    ctx.lineTo(x + 14, y);
    ctx.lineTo(x + 10, y + 8);
    ctx.lineTo(x + 14, y + 8);
    ctx.lineTo(x + 6, y + 20);
    ctx.lineTo(x + 8, y + 10);
    ctx.lineTo(x + 4, y + 10);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawClock(x, y) {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(x + 10, y + 10, 8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 10);
    ctx.lineTo(x + 10, y + 5);
    ctx.moveTo(x + 10, y + 10);
    ctx.lineTo(x + 14, y + 12);
    ctx.stroke();
}

function drawShield(x, y) {
    ctx.fillStyle = 'teal';
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 18, y + 4);
    ctx.lineTo(x + 18, y + 12);
    ctx.lineTo(x + 10, y + 20);
    ctx.lineTo(x + 2, y + 12);
    ctx.lineTo(x + 2, y + 4);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.strokeStyle = 'lightblue';
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 4);
    ctx.lineTo(x + 10, y + 16);
    ctx.moveTo(x + 6, y + 8);
    ctx.lineTo(x + 14, y + 8);
    ctx.stroke();
}

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}

function drawParticles() {
    for (let i = 0; i < particles.length; i++) {
        ctx.globalAlpha = particles[i].life / 40;
        ctx.fillStyle = particles[i].color;
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function drawPowerUpEffects() {
    if (!powerUp.active || powerUp.duration <= 0) return;

    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';

    let effectText = '';
    if (powerUp.type === 'speed') {
        effectText = 'Speed Boost';
        ctx.fillStyle = 'cyan';
    } else if (powerUp.type === 'slowdown') {
        effectText = 'Slowdown';
        ctx.fillStyle = 'orange';
    } else if (powerUp.type === 'shield') {
        effectText = 'Shield';
        ctx.fillStyle = 'teal';
    }

    ctx.fillText(`${effectText}: ${Math.ceil(powerUp.duration / 30)}s`, 10, canvas.height - 10);

    const maxWidth = 100;
    const width = (powerUp.duration / 300) * maxWidth;
    ctx.fillRect(10, canvas.height - 5, width, 3);

    if (powerUp.type === 'shield') {
        ctx.strokeStyle = 'teal';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.arc(snake[0].x + gridSize / 2, snake[0].y + gridSize / 2, gridSize + 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(50, 50, 50, 0.2)';
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showGrid) {
        drawGrid();
    }

    drawParticles();

    drawSnake();

    drawCoin();
    drawSpecialCoin();

    drawPowerUp();

    drawPowerUpEffects();

    ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('keydown', (event) => {
    if (!gameRunning) {
        if (event.key === 'Enter' || event.code === 'Space') {
            initGame();
            return;
        }
    }

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.key)) {
        event.preventDefault();
    }

    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction !== 'left') nextDirection = 'right';
            break;
        case 'p':
        case 'P':
            togglePause();
            break;
    }
});

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
});

canvas.addEventListener('touchend', (e) => {
    if (!gameRunning) {
        initGame();
        return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 20 && direction !== 'left') {
            nextDirection = 'right';
        } else if (deltaX < -20 && direction !== 'right') {
            nextDirection = 'left';
        }
    } else {
        if (deltaY > 20 && direction !== 'up') {
            nextDirection = 'down';
        } else if (deltaY < -20 && direction !== 'down') {
            nextDirection = 'up';
        }
    }

    e.preventDefault();
});

let isPaused = false;
function togglePause() {
    if (!gameRunning) return;

    isPaused = !isPaused;

    if (isPaused) {
        cancelAnimationFrame(animationFrame);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2 - 20);

        ctx.font = '16px Arial';
        ctx.fillText('Press P to resume', canvas.width / 2, canvas.height / 2 + 20);
    } else {
        lastFrameTime = performance.now();
        animationFrame = requestAnimationFrame(animateGame);
    }
}

startBtn.addEventListener('click', initGame);

document.addEventListener('keydown', (e) => {
    if (!gameRunning && (e.code === 'Space' || e.code === 'Enter')) {
        initGame();
    }
});

const muteBtn = document.getElementById('muteBtn');
let isMuted = localStorage.getItem('snakeMuted') === 'true';

function updateMuteState() {
    Object.values(sounds).forEach(sound => {
        sound.muted = isMuted;
    });

    muteBtn.textContent = isMuted ? '🔇 Unmute' : '🔊 Mute';
    localStorage.setItem('snakeMuted', isMuted);
}

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    updateMuteState();
});

updateMuteState();

const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('snakeDarkMode', isDarkMode);
});

const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('settings-open');
});

document.addEventListener('click', (e) => {
    if (settingsPanel.classList.contains('settings-open') &&
        !settingsPanel.contains(e.target) &&
        e.target !== settingsBtn) {
        settingsPanel.classList.remove('settings-open');
    }
});

const difficultySelect = document.getElementById('difficulty');
difficultySelect.addEventListener('change', () => {
    const difficulty = difficultySelect.value;
    localStorage.setItem('snakeDifficulty', difficulty);

    if (gameRunning) {
        switch (difficulty) {
            case 'easy':
                gameSpeed = 170 - ((level - 1) * 5);
                break;
            case 'normal':
                gameSpeed = 150 - ((level - 1) * 10);
                break;
            case 'hard':
                gameSpeed = 130 - ((level - 1) * 15);
                break;
        }
    }
});

const savedDifficulty = localStorage.getItem('snakeDifficulty') || 'normal';
difficultySelect.value = savedDifficulty;

const gridToggle = document.getElementById('gridToggle');
let showGrid = localStorage.getItem('snakeShowGrid') === 'true';
gridToggle.checked = showGrid;

gridToggle.addEventListener('change', () => {
    showGrid = gridToggle.checked;
    localStorage.setItem('snakeShowGrid', showGrid);
});

function drawGrid() {
    if (!showGrid) return;

    ctx.strokeStyle = 'rgba(50, 50, 50, 0.2)';
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function resizeCanvas() {
    const gameContainer = document.querySelector('.game-container');
    const containerWidth = gameContainer.clientWidth;

    const newSize = Math.min(containerWidth - 20, 500);
    const adjustedSize = Math.floor(newSize / gridSize) * gridSize;

    canvas.width = adjustedSize;
    canvas.height = adjustedSize;

    if (!gameRunning) {
        draw();
    }
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('snakeDarkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }

    draw();
});