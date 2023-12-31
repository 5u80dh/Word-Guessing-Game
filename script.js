const words = ["apple", "banana", "computer", "subodh", "ocean", "elephant", "sunshine", "boss", "riya", "khwopa"];
let currentWord = words[Math.floor(Math.random() * words.length)];
let hiddenWord = currentWord.replace(/./g, "_");
let chancesRemaining = 5;

const hiddenWordElement = document.getElementById("hidden-word");
const chancesElement = document.getElementById("chances");
const feedbackElement = document.getElementById("feedback");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");
const textEl = document.getElementById('text');
const text = 'Word Guessing Game 😸';
const wordLengthElement = document.getElementById("word-length-value");

wordLengthElement.textContent = currentWord.length;
//for guess btn
guessBtn.addEventListener("click", processGuess);
letterInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    processGuess();
  }
});

//for print correct or nut
function processGuess() {
  const guess = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (guess) {
    if (currentWord.includes(guess)) {
      for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === guess) {
          hiddenWord = hiddenWord.replaceAt(i, guess);
        }
      }
      hiddenWordElement.textContent = hiddenWord;

      if (hiddenWord === currentWord) {
        feedbackElement.textContent = "You guessed it!";
        disableGame();
        showRetryButton();
      } else {
        feedbackElement.classList.add("correct");
        feedbackElement.textContent = "Correct letter! Keep guessing.";
      }
    } else {
      chancesRemaining--;
      chancesElement.textContent = `Chances remaining: ${chancesRemaining}`;
      feedbackElement.classList.add("incorrect");
      feedbackElement.textContent = "Incorrect letter. Try again.";

      if (chancesRemaining === 0) {
        feedbackElement.textContent = "You ran out of chances! The word was: " + currentWord;
        disableGame();
        showRetryButton();
      }
    }
    createCircleAnimation(guessBtn);
  }
}
//idk cpioed form chatgpt 
function disableGame() {
  guessBtn.disabled = true;
  letterInput.disabled = true;
}

String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + 1);
};

hiddenWordElement.textContent = hiddenWord;
chancesElement.textContent = `Chances remaining: ${chancesRemaining}`;

// auto text code below:
let idx = 0;

function writeText() {
    textEl.textContent = text.slice(0, idx);
    idx++;

    if (idx <= text.length) {
        setTimeout(writeText, 300);
    }
}

writeText();
 
// for retry 
var retryBtn = document.getElementById('retry-btn');

    // Add a click event listener to the button
    retryBtn.addEventListener('click', function() {
        // Refresh the page when the button is clicked
        location.reload();
    });