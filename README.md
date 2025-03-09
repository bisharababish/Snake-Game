# 🐍  Snake Game

An advanced, feature-rich implementation of the classic Snake game with modern graphics, power-ups, and progression mechanics.

## 🎮 Features

- **Progressive Difficulty**: Speed increases as you level up
- **Power-up System**:
  - ⚡ Speed Boost - Move faster temporarily
  - 🕒 Slowdown - Reduce game speed for precision control
  - 🛡️ Shield - Protects against self-collision
- **Special Coins**: Collect special coins for extra points
- **Level Progression**: Complete levels by collecting all required coins
- **Particle Effects**: Visual feedback for game events
- **Responsive Design**: Playable on both desktop and mobile devices
- **Local Storage**: Saves high scores and settings
- **Customization Options**:
  - Dark/Light mode toggle
  - Sound controls
  - Difficulty settings
  - Grid visibility toggle

## 🕹️ How to Play

### Desktop Controls
- **Arrow Keys** or **WASD**: Change snake direction
- **P**: Pause/Resume game
- **Enter/Space**: Start a new game

### Mobile Controls
- **Swipe**: Change snake direction
- **Virtual D-pad**: On-screen directional buttons
- **Tap**: Start a new game when on game over screen

## 🚀 Game Mechanics

1. **Snake Movement**: The snake moves continuously in the current direction
2. **Coin Collection**: Eating coins increases your score and snake length
3. **Level Progression**: Collect the required number of coins to advance to the next level
4. **Special Coins**: Gold star coins appear temporarily for bonus points
5. **Power-ups**: Different power-ups provide special abilities for a limited time
6. **Game Over**: Occurs when the snake collides with itself
7. **Wall Behavior**: Snake wraps around the screen when hitting a wall

## 💻 Technical Implementation

### Core Technologies
- **HTML5 Canvas**: For rendering game graphics
- **JavaScript ES6+**: For game logic and interactivity
- **CSS3**: For styling and responsive design
- **Local Storage API**: For persistent game data

### Performance Optimizations
- **Request Animation Frame**: For smooth rendering
- **Delta Time**: For consistent game speed across different devices
- **Responsive Canvas Scaling**: Automatically adjusts to screen size
