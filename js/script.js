const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuesesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//Add placeholders for each letter in the word
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("•");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//Add event listener for when player click Guess button
guessButton.addEventListener('click', function(e) {
    //Avoid form submitting and page reload
    e.preventDefault();
    //Clear message field
    message.innerText = "";
    //Capture input value and validate
    const guess = inputLetter.value;
    const validGuess = validateInput(guess);
    console.log(validGuess);
    
    if (validGuess) {
        makeGuess(guess);
    }

    inputLetter.value = "";
});

const validateInput = function (input) {
    //Regex to check if input is a letter
    const acceptedLetter = /[a-zA-Z]/;
    //Check to see if input is a single letter
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter.";
    } else {
        return input;
    }
};

//Accept or deny confirmed letter guess
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
    }
    
};

//Show the guessed letters
const showGuessedLetters = function () {
    //Clear the guessed letters list
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};