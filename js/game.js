var ship, invaders, torpedos, invaderShip, bunkers, greenLine, lives;
var canvas, canvasContext, soundEngine;
var score;
var score1;
var freezeBetweenLives;

var shipDirection = 0;

function initGame() {
    if(!canvas) initCanvas();
    if(!soundEngine) initSoundEngine();
    createGameElements();
    score = 0;
    score1 = document.getElementById("score-1");
    initInvaderWave();
}

function initCanvas() {
    console.log("INIT CANVAS");
    canvas = document.getElementById("canvas");
    canvas.width = 573;
    canvas.height = 593;
    canvasContext = canvas.getContext('2d');
    stage = new createjs.Stage("canvas");
}

function initSoundEngine() {
    soundEngine = new SoundEngine();
}

function initInvaderWave() {
    freezeBetweenLives = false;
    initTiming();
}

function createNewWave() {
    bunkers.removeExplosions();
}


function createGameElements() {
    greenLine = new GreenLine();
    ship = new Ship();
    invaders = new Invaders();
    invaders.initInvaders();
    torpedos = new Torpedos();
    torpedoModel = new TorpedoModel();
    invaderShip = new InvaderShip();
    bunkers = new Bunkers();
    lives = new Lives();
}

function gameOver() {
    torpedos.destroy();
    invaders.destroy();
    stage.removeAllChildren();
}

function initTiming() {
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.framerate = 60;
}

function destroyGame() {

}

function handleTick() {
    if(!freezeBetweenLives) {
        ship.manageShip(this.shipDirection);
    }
    stage.update();
}

function addToScore(scoreToAdd) {
    score += scoreToAdd;
    score1.innerHTML = score;
}