function SoundEngine() {
    this.shoot = new Audio("assets/sounds/shoot.mp3");
    this.invaderKilled = new Audio("assets/sounds/invaderKilled.mp3");
    this.invader1 = new Audio("assets/sounds/invader1.mp3");
    this.invader2 = new Audio("assets/sounds/invader2.mp3");
    this.invader3 = new Audio("assets/sounds/invader3.mp3");
    this.invader4 = new Audio("assets/sounds/invader4.mp3");
    this.explosion = new Audio("assets/sounds/explosion.mp3");
    this.invaderShip = new Audio("assets/sounds/invaderShip.mp3");
}

SoundEngine.prototype.playSound = function (soundName) {
    switch (soundName) {
        case "shoot":
            this.shoot.play();
            break;
        case "invaderKilled":
            this.invaderKilled.play();
            break;
        case "invader1":
            this.invader1.play();
            break;
        case "invader2":
            this.invader2.play();
            break;
        case "invader3":
            this.invader3.play();
            break;
        case "invader4":
            this.invader4.play();
            break;
        case "explosion":
            this.explosion.play();
            break;
        case "invaderShip":
            this.invaderShip.currentTime = 0;
            this.invaderShip.play();
            break;
    }
}

SoundEngine.prototype.stopSound = function (soundName) {
    switch (soundName) {
        case "invaderShip":
            this.invaderShip.pause();
            break;
    }
}