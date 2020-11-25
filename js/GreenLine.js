function GreenLine() {

    this.container = new createjs.Container();

    var shape = new createjs.Shape();
    shape.graphics.beginFill("#0cb916").drawRect(0, 0, 573, 2);

    this.container.addChild(shape);

    stage.addChild(this.container);
    this.container.y = 530;
}

GreenLine.prototype.checkIfHit = function (torpedo) {

    if(torpedo == undefined) return;

    var pX = torpedo.torpedo.x;
    var pY = torpedo.torpedo.y + 21;

    var point = this.container.globalToLocal(pX, pY);
    if (this.container.hitTest(point.x, point.y)) {
        // torpedo.destroy();
        this.pixelExplosion(point.x, point.y);
    }
}

GreenLine.prototype.pixelExplosion = function (pX) {
    var bitmap = new createjs.Bitmap("assets/images/splatter-2.png");
    bitmap.x = pX;
    bitmap.regX = 8;
    this.container.addChild(bitmap);
}