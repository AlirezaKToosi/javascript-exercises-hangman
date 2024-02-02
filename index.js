const words = ['hangman', 'javascript', 'developer', 'programming', 'challenge'];

// variables
let secretWord;
let guessedWord;
let incorrectGuesses;
let usedLetters;

function startGame() {
    // Reset game variables
    secretWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(secretWord.length).fill('_');
    incorrectGuesses = 0;
    usedLetters = [];

}