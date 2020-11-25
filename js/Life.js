function Life(xPos) {
    this.container = new createjs.Container();
    this.initLife(xPos);
}

Life.prototype.initLife = function (xPos) {
    var bitmap = new createjs.Bitmap("assets/images/ship.png");
    bitmap.scaleX = 0.60;
    bitmap.scaleY = 0.60;
    this.container.addChild(bitmap);
    stage.addChild(this.container);
    this.container.x = xPos;
    this.container.y = 540; 
}

Life.prototype.kill = function() {
    stage.removeChild(this.container);
}