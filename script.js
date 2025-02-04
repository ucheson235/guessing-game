// Get DOM elements
const colorBox = document.getElementById('colorBox');
const newGameButton = document.getElementById('newGameButton');
const resetButton = document.getElementById('resetButton');  // New reset button
const gameStatus = document.getElementById('gameStatus');
const scoreDisplay = document.getElementById('score');
const optionsContainer = document.getElementById('options');

// Initialize game variables
let targetColor;
let score = 0;

// Function to generate random color in RGB format
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to start a new game
function startGame() {
    // Generate target color
    targetColor = generateRandomColor();
    
    // Reset the colorBox to have a black background and be empty
    colorBox.style.backgroundColor = 'black'; // Initially black
    colorBox.innerHTML = '<i class="fas fa-question"></i>'; // Display the question mark icon
    
    // Update game status
    gameStatus.textContent = 'Guess the color!';
    
    // Generate options for color guessing
    const options = [];
    for (let i = 0; i < 6; i++) {
        options.push(generateRandomColor());
    }
    
    // Randomly set one of the options to the target color
    const randomIndex = Math.floor(Math.random() * 6);
    options[randomIndex] = targetColor;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create buttons for each option
    options.forEach(color => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option');
        optionButton.style.backgroundColor = color;
        optionButton.addEventListener('click', () => handleGuess(color));
        optionsContainer.appendChild(optionButton);
    });
    
    // Reset score display
    scoreDisplay.textContent = score;
}

// Function to handle a user's guess
function handleGuess(guessColor) {
    if (guessColor === targetColor) {
        gameStatus.textContent = 'Correct! Well done.';
        score++;
        colorBox.style.backgroundColor = targetColor; // Show the color when correct guess
    } else {
        gameStatus.textContent = 'Wrong! Try again.';
    }
    
    // Update score
    scoreDisplay.textContent = score;
}

// Event listener for the "Play Again" button
newGameButton.addEventListener('click', () => {
    startGame();
});

// Event listener for the "Reset" button (to reset the game completely)
resetButton.addEventListener('click', () => {
    score = 0;  // Reset the score
    scoreDisplay.textContent = score;  // Update the score display
    startGame();  // Start a new game
});

// Start the first game
startGame();
