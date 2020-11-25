function Ship() {
    this.container = new createjs.Container();
    this.ship = new createjs.Bitmap("assets/images/ship.png");
    this.shipExplose1 = new createjs.Bitmap("assets/images/shipExplose-1.png");
    this.shipExplose2 = new createjs.Bitmap("assets/images/shipExplose-2.png");
    this.container.addChild(this.ship);
    this.container.addChild(this.shipExplose1);
    this.container.addChild(this.shipExplose2);
    this.shipExplose1.alpha = 0;
    this.shipExplose2.alpha = 0;
    this.ship.scaleX = 0.60;
    this.ship.scaleY = 0.60;
    this.container.regX = 19;
    this.container.x = 40;
    this.container.y = 480;
    this.pixelsToMove = 5;
    this.alive = true;
    stage.addChild(this.container);
}

Ship.prototype.manageShip = function (direction) {
    if (direction != 0) {
        var nextPosition = this.container.x + (direction * this.pixelsToMove);
        if (nextPosition > 20 && nextPosition < (screenWidth - 20)) {
            this.container.x = nextPosition;
        }
    }
}

Ship.prototype.checkIfHit = function (torpedo) {

    var pt = this.container.globalToLocal(torpedo.torpedo.x, torpedo.torpedo.y);

    if (this.alive) {
        if (this.container.hitTest(pt.x, pt.y)) {
            torpedo.destroy();
            this.explode();
            return true;
        }
    }
}

Ship.prototype.explode = function () {
    this.ship.alpha = 0;
    this.shipExplose1.alpha = 1;

    freezeBetweenLives = true;

    soundEngine.playSound("explosion");

    var that = this;
    this.counter = 0;
    this.explodeInterval = setInterval(function(){
        that.invertExplosion();
    }, 75);
}

Ship.prototype.invertExplosion = function () {
    this.counter += 1;
    this.shipExplose1.alpha = !this.shipExplose1.alpha;
    this.shipExplose2.alpha = !this.shipExplose2.alpha;
    if(this.counter == 10) {
        clearInterval(this.explodeInterval);
        if(lives.getLivesLeft() > 1) {
            this.ship.alpha = 1;
            this.shipExplose1.alpha = 0;
            this.shipExplose2.alpha = 0;
            
            lives.loseLife();
            this.container.x = 40;
            var restartTimeout = setTimeout(function(){
                freezeBetweenLives = false;
            
            },1000);
        } else {
            gameOver();
            showScreen(1);
        }
    }
}