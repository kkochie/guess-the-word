const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

//Fetch words and put into array then choose random word
const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    console.log(data);
    const wordArray = data.split("\n");
    console.log(wordArray);
    const randomWordIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWordIndex].trim();
    placeholder(word);
};

getWord(); 


//Add placeholders for each letter in the word
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};



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
        updateRemainingGuesses(guess);
        showGuessedLetters();
        correctLetters(guessedLetters);
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

//Update word in progress
const correctLetters = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    //console.log(showWord);
    wordInProgress.innerText = showWord.join("");
    playerWon();
};

//Count remaining guesses
const updateRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (upperWord.includes(guess)) {
        message.innerText = `Nice job! The letter ${guess} is in the word.`;
    } else {
        remainingGuesses -= 1;
        message.innerText = `Sorry! The letter ${guess} is not in the word.`;
    }

    if (remainingGuesses === 0) {
        message.innerText = `No more guesses left! The word was ${word}. Game over.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = "one more guess";
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//Check to see if correct word guessed
const playerWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class = "highlight">You guessed the correct word! Congrats!</p>`;
    }
};