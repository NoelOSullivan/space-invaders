function InvaderShip() {
    this.container = new createjs.Container();
    this.target = new createjs.Shape();
    this.target.graphics.beginFill("#00FF00").drawRect(0, 0, 43, 16);
    this.target.alpha = 0;
    this.invaderShip = new createjs.Bitmap("assets/images/invaderShip.png");
    this.text = new createjs.Text("100", "18px typeWriter", "#FFFFFF");
    this.text.width = 43;
    this.container.addChild(this.target);
    this.container.addChild(this.invaderShip);
    this.container.addChild(this.text);
    this.invaderShip.scaleX = 0.14;
    this.invaderShip.scaleY = 0.14;
    this.text.alpha = 0;
    this.container.alpha = 0;
    this.container.y = 25;
    stage.addChild(this.container);
    this.alive = false;
    this.prepareInvaderShip();
}

InvaderShip.prototype.prepareInvaderShip = function () {
    this.text.text = [50,100,150][getRandomInteger(1, 3) - 1];
    var delay = getRandomInteger(5, 10) * 1000;
    var that = this;
    var invaderShipTimeout = setTimeout(function () {
        that.launchInvaderShip();
    }, delay);
}

InvaderShip.prototype.launchInvaderShip = function () {
    this.alive = true;
    this.invaderShip.alpha = 1;
    this.direction = [-1, 1][getRandomInteger(1, 2) - 1];
    switch (this.direction) {
        case -1:
            this.container.x = 573;
            break;
        case 1:
            this.container.x = -43;
            break;
    }
    this.container.alpha = 1;

    soundEngine.playSound("invaderShip");

    var that = this;
    this.invaderShipInterval = setInterval(function () {
        that.moveInvaderShip();
    }, 15);
}

InvaderShip.prototype.moveInvaderShip = function () {
    if (freezeBetweenLives) return;
    this.container.x += this.direction * 2;
    switch (this.direction) {
        case -1:
            if(this.container.x < -43) {
                clearInterval(this.invaderShipInterval);
                this.prepareInvaderShip();
            }
            break;
        case 1:
            if(this.container.x > 573) {
                clearInterval(this.invaderShipInterval);
                this.prepareInvaderShip();
            }
            break;
    }
}

InvaderShip.prototype.checkIfHit = function (torpedo) {
    var pt = this.target.globalToLocal(torpedo.torpedo.x, torpedo.torpedo.y);
    if (this.alive) {
        if (this.target.hitTest(pt.x, pt.y)) {
            torpedo.destroy();
            clearInterval(this.invaderShipInterval);
            this.prepareInvaderShip();
            this.text.alpha = 1;
            this.invaderShip.alpha = 0;
            this.alive = false;
            var that = this;
            addToScore(that.text.text);
            soundEngine.stopSound("invaderShip");
            soundEngine.playSound("explosion");
            var textTimeout = setTimeout(function() {
                that.text.alpha = 0;
            }, 1000);
        }
    }
}