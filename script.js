const wrongLetters = document.getElementById('wrong-letters');
const wordToDisplayed = document.getElementById('word');
const popup = document.getElementById('wrong-letter-popup');
const goodAnswerAudio = new Audio('sounds/good-answer.mp3');
const badAnswerAudio = new Audio('sounds/wrong-answer.mp3');

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
        this.tries = 7;
        this.words = words;
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.wordLetters = this.currentWord.split('');
        this.availableLetters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        this.usedLetters = [];
    }
    displayWord() {
        wordToDisplayed.innerHTML = '';
        this.wordLetters.forEach(letter => {
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
    displayPopup(letter) {
        popup.classList.remove('hidden');
        popup.innerHTML = `<p>You have already entered: ${letter}</p>`;
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 2000);
    }
}

let game = new Game();
console.log(game.currentWord);
game.displayWord();

document.addEventListener("keydown", function (e) {
    let guessedLetter = (e.key).toLowerCase();
    if (game.gameOn) {
        if (game.usedLetters.includes(guessedLetter)) {
            console.log("Już zgadłeś tą literę");
            game.displayPopup(guessedLetter);
        }
        else if (game.wordLetters.includes(guessedLetter)) {
            console.log("Poprawna litera");
            goodAnswerAudio.play();
            game.addLetterToUsed(guessedLetter);
            game.displayWord();
        }
        else {
            console.log("Niepoprawna litera");
            badAnswerAudio.play();
            game.addLetterToUsed(guessedLetter);
            game.displayWord();
        }
    }
});