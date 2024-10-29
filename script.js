const words = [
  "apple",
  "banana",
  "computer",
  "subodh",
  "ocean",
  "elephant",
  "sunshine",
  "boss",
  "khwopa",
  "Dilasha"
  "Prakriti",
];
let currentWord = words[Math.floor(Math.random() * words.length)];
let hiddenWord =
  currentWord.slice(0, 3) + currentWord.slice(3).replace(/./g, "_"); // Display first 2-3 letters and replace the rest with underscores
let chancesRemaining = 5;

const toggle = document.getElementById("toggle");
const nav = document.getElementById("nav");
const hiddenWordElement = document.getElementById("hidden-word");
const chancesElement = document.getElementById("chances");
const feedbackElement = document.getElementById("feedback");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");
const textEl = document.getElementById("text");
const text = "GUESS  WORD";
const wordLengthElement = document.getElementById("word-length-value");

//navigation bar
toggle.addEventListener("click", () => nav.classList.toggle("active"));

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
        // feedbackElement.classList.add("correct");
        feedbackElement.textContent = "Correct letter! Keep guessing.";
      }
    } else {
      chancesRemaining--;
      chancesElement.textContent = `Chances remaining: ${chancesRemaining}`;
      // feedbackElement.classList.add("incorrect");
      feedbackElement.textContent = "Incorrect letter. Try again.";

      if (chancesRemaining === 0) {
        feedbackElement.innerHTML =
          "You ran out of chances !<br> The word was: " + "<b>" + currentWord;
        disableGame();
        showRetryButton();
      }
    }
    createCircleAnimation(guessBtn);
  }
}

//for making bottn unclickable after chance finish
function disableGame() {
  guessBtn.disabled = true;
  letterInput.disabled = true;
}

String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + 1);
};

hiddenWordElement.textContent = hiddenWord;
chancesElement.textContent = `Chances remaining: ${chancesRemaining}`;

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
var retryBtn = document.getElementById("retry-btn");

// retry
retryBtn.addEventListener("click", function () {
  location.reload();
});
