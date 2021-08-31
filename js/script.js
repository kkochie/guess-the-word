const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuesesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

//add placeholders for each letter in the word
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("•");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//add event listener for when player click Guess button
guessButton.addEventListener('click', function(e) {
    //avoid form submitting and page reload
    e.preventDefault();
    //capture input value and then clear field
    const guess = inputLetter.value;
    console.log(guess);
    inputLetter.value = "";
});