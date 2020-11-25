function InvaderBang(posX, posY) {
    this.invaderBang = new createjs.Bitmap("assets/images/invaderBang.png");
    stage.addChild(this.invaderBang);
    this.invaderBang.x = posX;
    this.invaderBang.y = posY;
    this.invaderBang.regX = 19;
    this.invaderBang.regY = 0;

    var that = this;
    var t1 = setTimeout(function () {
        that.killInvaderBang();
    }, 250);
}

InvaderBang.prototype.killInvaderBang = function() {
    stage.removeChild(this.invaderBang);
}