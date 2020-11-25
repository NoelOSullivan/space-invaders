function Invader(row, column) {
    this.type = [30, 20, 20, 10, 10][row];
    this.scale = [0.65, 0.60, 0.60, 0.65, 0.65][row];
    this.regX = [16, 24, 24, 25, 25][row];
    this.delay = [600, 450, 300, 150, 0][row];
    this.container = new createjs.Container();
    this.invader1 = new createjs.Bitmap("assets/images/invader" + this.type + "-1.png");
    this.invader2 = new createjs.Bitmap("assets/images/invader" + this.type + "-2.png");
    this.container.addChild(this.invader1);
    this.container.addChild(this.invader2);
    this.invader2.alpha = 0;
    this.invaders = [this.invader1, this.invader2];
    setTimeout(this.stageInvader, this.delay, this.container);
    // setTimeout(this.stageInvader, this.delay, this.invader2);
    this.invader1.scaleX = this.invader2.scaleX = this.scale;
    this.invader1.scaleY = this.invader2.scaleY = this.scale;
    this.invader1.regX = this.invader2.regX = this.regX;
    this.container.x = 85 + ((column) * 41);
    this.container.y = 80 + ((row) * 41);
    this.pixelsToMoveX = 2;
    this.pixelsToMoveY = 25;
    this.alive = true;
}

Invader.prototype.stageInvader = function (container) {
    stage.addChild(container);
}

Invader.prototype.moveInvaderX = function (direction) {
    this.container.x += (this.pixelsToMoveX * direction);
    if(this.alive) {
        this.invaders[0].alpha = !this.invaders[0].alpha;
        this.invaders[1].alpha = !this.invaders[1].alpha;
    }
}

Invader.prototype.moveInvaderY = function (direction) {
    this.container.y += this.pixelsToMoveY;
}

Invader.prototype.getX = function () {
    return this.container.x;
}

Invader.prototype.checkIfHit = function (torpedo) {
    var pt = this.container.globalToLocal(torpedo.torpedo.x, torpedo.torpedo.y);
    if (this.alive) {
        if (this.container.hitTest(pt.x, pt.y)) {
            this.invader1.alpha = 0;
            this.invader2.alpha = 0;
            soundEngine.playSound("invaderKilled");
            this.alive = false;
            torpedo.destroy();
            addToScore(this.type);
            var invaderBang = new InvaderBang(this.container.x, this.container.y);
            return true;
        }
    }
}

Invader.prototype.destroy = function() {
    stage.removeChild(this.container);
}