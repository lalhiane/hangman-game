const letters = "abcdefghijklmnopqrstuvwxyz";

const lettersList = Array.from(letters);

const lettersContainer = document.querySelector(".letters");

lettersList.forEach((letter) => {

  const spanEl = document.createElement("span");

  spanEl.className = "letter-box";

  const letterText = document.createTextNode(letter);

  spanEl.appendChild(letterText);

  lettersContainer.appendChild(spanEl);

});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "mysql",
    "r",
    "python",
  ],
  movies: [
    "prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "mysql",
    "memonto",
    "coco",
    "up",
  ],
  countries: [
    "syria",
    "palestine",
    "yemen",
    "egypt",
    "bahrain",
    "qatar",
    "morocco",
  ],
  people: [
    "albert einstein",
    "hitchcock",
    "alexander",
    "cleopatra",
    "mahatma ghandi",
  ],
};

const keys = Object.keys(words);

const randomKey = keys[Math.floor(Math.random() * keys.length)];

const randomVal = words[randomKey];

const randomWord = randomVal[Math.floor(Math.random() * randomVal.length)];

document.querySelector(".game-info span").innerHTML = randomKey;

const randomWordLetters = [...randomWord];

randomWordLetters.forEach((char) => {

  const spanEl = document.createElement("span");

  if (char === " ") spanEl.className = "space";

  document.querySelector(".letters-guess").appendChild(spanEl);

});

let theStatus = false,
  sucssesAttempts = 0,
  wrongAttempts = 0;

const spansGuess = document.querySelectorAll(".letters-guess span");

const hangmanDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", function (e) {

  if (e.target.classList.contains("letter-box")) {

    theStatus = false;

    e.target.classList.add("clicked");

    randomWordLetters.forEach((letter, index) => {

      if (e.target.innerHTML === letter) {

        theStatus = true;

        spansGuess[index].innerHTML = letter;

        sucssesAttempts++;

      }

    });

    if (!theStatus) {

      wrongAttempts++;

      hangmanDraw.classList.add(`wrong-${wrongAttempts}`);

      document.getElementById("fail-sound-effect").play();

      if (wrongAttempts === 8) {
        
        endGame(`Game Over, The Word Is: \`${randomWord}\``);

        lettersContainer.classList.add("finished");

      }

    } else {

      document.getElementById("success-sound-effect").play();

      if (sucssesAttempts === randomWord.length) {
    
        endGame(`Congratulation, You Have ${wrongAttempts} Wrongs!`);

      }

    }

  }
  
});

function endGame(msg) {

    const popupContainer = document.createElement("div");

    popupContainer.className = "popup-container";

    const popupEl = document.createElement("div");

    popupEl.className = "popup";

    popupEl.innerHTML = msg;

    popupContainer.appendChild(popupEl);

    document.body.appendChild(popupContainer);

}
