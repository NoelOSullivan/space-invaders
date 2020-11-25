function Lives() {
    this.lives = [];
    this.initLives();

    this.livesLeft = 3;
    
    this.text = new createjs.Text(this.livesLeft, "24px typeWriter", "#FFFFFF");
    this.text.x = 30 ;
    this.text.y = 540;

    stage.addChild(this.text);
}

Lives.prototype.initLives = function () {
    var offsetLeft = 70;
    for (var i = 0; i < 2; i++) {
        var x = offsetLeft + (i * 50);
        this.lives.push(new Life(x));
    }
}

Lives.prototype.getLivesLeft = function() {
    return this.livesLeft;
}

Lives.prototype.loseLife = function() {
    this.livesLeft -= 1;
    this.text.text = this.livesLeft;
    this.lives[this.lives.length -  1].kill();
    this.lives.pop();
}