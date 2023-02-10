const wrongLetters = document.getElementById('wrong-letters');
const wordToDisplayed = document.getElementById('word');
const figureParts = document.querySelectorAll('.figure-part');
const popup = document.getElementById('wrong-letter-popup');
const goodAnswerAudio = new Audio('sounds/good-answer.mp3');
const badAnswerAudio = new Audio('sounds/wrong-answer.mp3');
const winModal = document.getElementById('modal-win');
const loseModal = document.getElementById('modal-lose');
const finalWord = document.getElementById('final-word');
const playAgainBtns = document.querySelectorAll('.play-again-btn');
const overlay = document.getElementById('overlay');

const words = [
    "programming", "algorithms", "javascript", "python", "java", "c++", "c#", "php", "ruby",
    "swift", "kotlin", "go", "rust", "html", "css", "sass", "less", "bootstrap", "jquery", "react",
    "angular", "vue", "node", "express", "django", "flask", "laravel", "symfony", "wordpress", "drupal",
    "joomla", "magento", "prestashop", "opencart", "shopify", "bigcommerce", "wix", "squarespace", "github",
    "gitlab", "bitbucket", "git", "svn", "docker", "kubernetes", "aws", "azure", "google cloud", "heroku",
    "digital ocean", "vps", "server", "database", "mysql", "postgresql", "mongodb", "redis", "nosql", "sql",
    "api", "json", "xml", "csv", "yaml", "toml", "markdown", "text", "pdf", "excel", "word", "powerpoint",
    "photoshop", "illustrator", "indesign", "adobe", "microsoft", "apple", "linux", "windows", "macos",
    "ubuntu", "debian", "fedora", "arch", "gentoo", "slackware", "suse", "redhat", "centos", "raspbian",
    "android", "ios", "iphone", "ipad", "blackberry", "samsung", "htc", "nokia", "sony", "motorola", "lg",
    "asus", "huawei", "lenovo", "oneplus", "xiaomi", "oppo", "vivo", "realme", "meizu", "nubia", "zte",
    "alcatel", "tcl", "google", "facebook", "twitter", "instagram", "youtube", "twitch", "tiktok", "snapchat",
    "linkedin", "pinterest", "reddit", "tumblr", "flickr", "vimeo", "dailymotion", "blogger", "wordpress",
    "wikipedia", "github", "gitlab", "bitbucket", "stackoverflow", "quora", "medium", "dev.to", "hackerrank",
    "hackerearth"
];


class Game {
    constructor() {
        this.gameOn = true;
        this.attemptsRemained = 6;
        this.listOfWords = words;
        this.currentWord = this.listOfWords[Math.floor(Math.random() * this.listOfWords.length)];
        this.currentWordLetters = this.currentWord.split('');
        this.availableLetters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        this.usedLetters = [];
        this.wrongLetters = [];
    }
    displayWord() {
        wordToDisplayed.innerHTML = '';
        this.currentWordLetters.forEach(letter => {
            if (this.usedLetters.includes(letter)) {
                wordToDisplayed.innerHTML += `<div class="letter">${letter}</div>`;
            }
            else if (letter === ' ') {
                wordToDisplayed.innerHTML += `<div class="letter">-</div>`;
            }
            else {
                wordToDisplayed.innerHTML += `<div class="letter">&#160</div>`;
            }
        });
    }
    addLetterToUsed(letter) {
        this.usedLetters.push(letter);
    }
    addLetterToWrongLetters(letter) {
        this.wrongLetters.push(letter);
    }
    displayWrongLetters() {
        wrongLetters.innerHTML = '';
        let wrongLettersHTML = '';
        this.wrongLetters.forEach(letter => {
            wrongLettersHTML += `${letter}  `;
        });
        wrongLetters.innerHTML = wrongLettersHTML;
    }
    displayNextFigurePart() {
        let indexOfFigurePart = 6 - this.attemptsRemained;
        figureParts[indexOfFigurePart].classList.remove('figure-part__hidden');
    }
    displayPopup(letter) {
        popup.classList.remove('hidden');
        popup.innerHTML = `<p>You have already entered: ${letter}</p>`;
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 2000);
    }
    checkIfWon() {
        let won = true;
        this.currentWordLetters.forEach(letter => {
            if (!this.usedLetters.includes(letter) && letter !== ' ') {
                won = false;
                return;
            }
        });
        return won;
    }
    displayWinModal() {
        overlay.classList.remove('hidden-modal');
        winModal.classList.remove('hidden-modal');
    }
    displayLoseModal() {
        overlay.classList.remove('hidden-modal');
        loseModal.classList.remove('hidden-modal');
        finalWord.innerHTML = this.currentWord;
    }
    newGame() {
        this.attemptsRemained = 6;
        this.currentWord = this.listOfWords[Math.floor(Math.random() * this.listOfWords.length)];
        this.currentWordLetters = this.currentWord.split('');
        this.usedLetters = [];
        this.wrongLetters = [];
        this.displayWord();
        this.displayWrongLetters();
        figureParts.forEach(figurePart => {
            figurePart.classList.add('figure-part__hidden');
        });
        overlay.classList.add('hidden-modal');
        winModal.classList.add('hidden-modal');
        loseModal.classList.add('hidden-modal');
        this.gameOn = true;
    }
}


// Game initialization
let game = new Game();
game.displayWord();

document.addEventListener("keydown", function (e) {
    if (!game.gameOn) {
        return;
    }
    let guessedLetter = (e.key).toLowerCase();
    if (!game.availableLetters.includes(guessedLetter)) {
        return;
    }

    if (game.usedLetters.includes(guessedLetter)) {
        game.displayPopup(guessedLetter);
    }
    else if (game.currentWordLetters.includes(guessedLetter)) {
        goodAnswerAudio.play();
        game.addLetterToUsed(guessedLetter);
        game.displayWord();
        if (game.checkIfWon()) {
            game.gameOn = false;
            game.displayWinModal();
        }
    }
    else {
        badAnswerAudio.play();
        game.addLetterToUsed(guessedLetter);
        game.addLetterToWrongLetters(guessedLetter);
        game.displayWord();
        game.displayWrongLetters();
        game.displayNextFigurePart();
        game.attemptsRemained -= 1;
        if (game.attemptsRemained === 0) {
            game.gameOn = false;
            setTimeout(() => { game.displayLoseModal(); }, 500);
        }
    }

});

playAgainBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        game.newGame();
    });
});