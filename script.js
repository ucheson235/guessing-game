// Get DOM elements
const colorBox = document.getElementById('colorBox');
const newGameButton = document.getElementById('newGameButton');
const resetButton = document.getElementById('resetButton'); // Reset button
const gameStatus = document.getElementById('gameStatus');
const scoreDisplay = document.getElementById('score');
const optionsContainer = document.getElementById('options');

// Initialize game variables
let targetColor;
let score = 0;

// Function to generate a random RGB color
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to start a new round of the game
function startGame() {
    // Generate a new target color
    targetColor = generateRandomColor();

    // Reset the colorBox to black and empty at the beginning of the round
    colorBox.style.backgroundColor = 'black';
    colorBox.innerHTML = '<i class="fas fa-question"></i>'; // Display question mark

    // Update game status
    gameStatus.textContent = 'Guess the color!';

    // Generate multiple color options
    const options = [];
    for (let i = 0; i < 6; i++) {
        options.push(generateRandomColor());
    }

    // Replace a random option with the correct color
    const randomIndex = Math.floor(Math.random() * 6);
    options[randomIndex] = targetColor;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Create buttons for each color option
    options.forEach(color => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option');
        optionButton.style.backgroundColor = color;
        optionButton.addEventListener('click', () => handleGuess(color));
        optionsContainer.appendChild(optionButton);
    });

    // Update score display
    scoreDisplay.textContent = score;
}

// Function to handle user's guess
function handleGuess(guessColor) {
    if (guessColor === targetColor) {
        // Player guessed correctly
        gameStatus.textContent = 'Correct! Keep going!';
        score++;
        colorBox.style.backgroundColor = targetColor; // Show correct color in colorBox
        
        // Delay and start a new round automatically
        setTimeout(startGame, 1000);
    } else {
        // Player guessed wrong
        gameStatus.textContent = 'Wrong! Try again.';
    }

    // Update score display
    scoreDisplay.textContent = score;
}

// Event listener for "Play Again" button
newGameButton.addEventListener('click', () => {
    startGame();
});

// Event listener for "Reset Game" button
resetButton.addEventListener('click', () => {
    score = 0;  // Reset score to 0
    scoreDisplay.textContent = score;
    startGame();
});

// Start the first game when the page loads
startGame();
