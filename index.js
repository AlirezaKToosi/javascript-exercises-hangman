// secret words
const words = ['hangman', 'javascript', 'developer', 'programming', 'challenge'];

let secretWord;
let guessedWord;
let incorrectGuesses;
let usedLetters;
const incorrectGuessesThreshold=6;

// Initialization
function startGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(secretWord.length).fill('_');
    incorrectGuesses = 0;
    usedLetters = [];

    // Update UI
    updateHangmanSVG(0);
    updateWordDisplay();
    updateUsedLetters();
    updateNumberOfTry();
}


function updateWordDisplay() {
    document.getElementById('word-display').innerText = guessedWord.join(' ');
}

function updateUsedLetters() {
    document.getElementById('used-letters').innerText = 'Used Letters: ' + usedLetters.join(', ');
}
function updateNumberOfTry() {
    document.getElementById('number-of-try').innerText = 'Number of try: ' + incorrectGuesses+'/'+incorrectGuessesThreshold;
}

function updateHangmanSVG(incorrectGuesses) {
    const hangmanParts = ['head', 'body', 'arms', 'legs', 'scaffold'];
    const svgDocument = document.getElementById('hangman-svg').contentDocument;
    for (let i = 0; i < hangmanParts.length; i++) {
        const partId = hangmanParts[i];
        const opacity = i < incorrectGuesses ? 1 : 0;
        
        svgDocument.getElementById(partId).style.opacity = opacity;
    }
}

function guessLetter() {
    const letterInput = document.getElementById('letter-input').value.toLowerCase();

    if (usedLetters.includes(letterInput)) {
        alert('You have already guessed that letter. Try a different one.');
        return;
    }

    usedLetters.push(letterInput);

    if (secretWord.includes(letterInput)) {
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === letterInput) {
                guessedWord[i] = letterInput;
            }
        }
        updateWordDisplay();
        updateUsedLetters();

        if (!guessedWord.includes('_')) {
            alert('Congratulations! You guessed the word: ' + secretWord);
            startGame();
        }
    } else {
        incorrectGuesses++;

        updateHangmanSVG(incorrectGuesses);
        updateUsedLetters();
        updateNumberOfTry();

        if (incorrectGuesses === incorrectGuessesThreshold) {
            alert('Game over! The correct word was: ' + secretWord);
            startGame();
        }
    }

    document.getElementById('letter-input').value = '';
}

startGame();
