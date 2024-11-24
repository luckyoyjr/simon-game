const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Start the game on keydown or screen tap
document.addEventListener("keydown", startGame, { once: true });
document.addEventListener("touchstart", startGame, { once: true });

function startGame() {
    if (!started) {
        document.querySelector("h1").textContent = `Level ${level}`;
        nextSequence();
        started = true;
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("h1").textContent = `Level ${level}`;
    
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    const button = document.querySelector(`#${randomChosenColor}`);
    button.style.opacity = 0.1;
    setTimeout(() => button.style.opacity = 1, 100);
    playSound(randomChosenColor);
}

document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", (e) => {
        const userChosenColor = e.target.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    const button = document.querySelector(`#${currentColor}`);
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        const gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        document.querySelector("body").classList.add("game-over");
        setTimeout(() => document.querySelector("body").classList.remove("game-over"), 200);
        document.querySelector("h1").textContent = "Game Over, Tap or Press Any Key to Restart";
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    document.addEventListener("keydown", startGame, { once: true });
    document.addEventListener("touchstart", startGame, { once: true });
}
